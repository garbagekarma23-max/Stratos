"""Tests for the content pipeline, with a stand-in for the Anthropic API. Nothing is sent anywhere and no key is needed.

  python3 content/test_pipeline.py                  runs the tests (tests/run.mjs runs them through tests/pipeline.mjs)
  python3 content/test_pipeline.py --write-fixture  also writes tests/made/, the made course tests/made.mjs opens

What it checks: the outline rules (Years 7 to 12, the bank, briefs, the colon hint), ids written into the outline
with its comments kept, the estimate, --max-dollars, a full run on the original settings (match, write, the content
check and one rewrite, check, fix, a refusal, an API error tried again, an expired request sent again), a stop just
after a batch was sent carrying on without sending it twice, the review page (its token, its Host check, approve,
the fix, edit with the content check, reject with a note, reuse), and publishing into a copy of the repository: the
bank and course files, a chapter held back as Coming soon, the SQL lines, and that check_content.mjs and build.py
pass on the result.

Then: a run saved by the pipeline from before settings (tests/pipeline-old-run/) finished on the original settings;
the cheaper settings, a new course's default (chapter writing on Sonnet, and Opus checking every point with no
Haiku screen); the screened settings, asked for by name (the Haiku screen, the Opus check, spot checks, sensitive
words, points written on their own, each point's cost, the numbers after a run); a trial with --now and the Compare
tab; run-many with shared batches and each course's share of --max-dollars; autoreview (what it clears with the fix and
what stays, the word guard, the dry run, spot checks and their warning, undo, the replay); recheck (which fixes it sends
and which never, the checker seeing only the fix, the estimate, --max-dollars, what it clears and keeps, its spot checks,
undo, nothing decided twice); autoreject (who it rejects and who stays, the rejection, the count of rewrites, the dry run,
undo, the summary, and the whole loop up to the owner); rebalance (the questions whose right option is clearly the longest, the estimate on Sonnet,
--max-dollars and --max-new-dollars, new wrong options with the question and right option kept, the check of each
rewrite on Opus, what it keeps and why, nothing sent twice, and check_content's warning before and after); reuse, adapt and new
across states (the shortlist with no API call, the split and estimate before sending, Haiku's match, Opus only for a
reuse Haiku names and for an adapt it is not sure of, never told Haiku's answer, a sure Haiku reuse Opus turns down written
new, a reuse with nothing written, a bank point reused twice, an
adapt with only the changes, a question kept word for word caught and adapted again, the adapted point checked and
flagged like any other, a possible match adapted from the review page, a reuse that fails the content check adapted,
a sensitive or English reuse sent to the owner, and two Victorian courses published with their units, written to
tests/units/); the Claude Code steps (rewrites exported with exactly the API writer's prompt, the shape and content
checks on import, a failure written once more, run leaving the points Claude Code wrote, checks with exactly the API
checker's prompt and nothing about the rewrite, picks that are not options refused, a check recorded as an Opus check
with autoreview, recheck and the fix carrying on, and the reviewer: what it may decide and what always stays, only highly
sure decisions applied as the review page would, cleared_by claude-code, spot check answers, the dry run, nothing twice,
and undo); and the API key never printed or saved.
"""
import _thread, contextlib, io, json, os, re, shutil, subprocess, sys, tempfile, threading, urllib.request
from types import SimpleNamespace as NS

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import pipeline  # noqa: E402

KEY = 'sk-ant-test-' + 'X7Q2' * 6
results = []
def check(ok, what):
    ok = bool(ok)
    results.append(ok)
    print(('ok   ' if ok else 'FAIL ') + what, flush=True)


# ---------- the stand-in API ----------
def fake_point(title, dash=False):
    words = ' '.join(title.lower().split()[:3])
    return {'title': title,
            'card': [{'label': '', 'text': 'The first line teaches ' + title.lower() + '.'},
                     {'label': 'Part', 'text': 'The second line is about ' + words + '.'},
                     {'label': '', 'text': 'The third line ends the card.'}],
            'remember': 'Hold on to ' + words + ('— always' if dash else '.'),
            'a': {'q': 'Which is true of ' + title.lower() + '?', 'opts': ['Right: ' + words, 'Wrong one', 'Wrong two', 'Wrong three'],
                  'why': 'The first option is right.', 'clue': 'Read the card.'},
            'b': {'d': 2, 'q': 'In a new case, what shows ' + title.lower() + '?', 'opts': ['Right: ' + words + ' again', 'Wrong four', 'Wrong five', 'Wrong six'],
                  'why': 'The first option is right again.', 'clue': 'Think of the case.'}}

class FakeBatches:
    def __init__(self, api): self.api = api
    def create(self, requests):
        self.api.created += 1
        bid = 'msgbatch_' + str(self.api.created)
        self.api.batches[bid] = {'requests': list(requests), 'polls': 0, 'created': pipeline.now()}
        if self.api.stop_after_create:
            self.api.stop_after_create = False
            raise KeyboardInterrupt
        return NS(id=bid, processing_status='in_progress')
    def retrieve(self, bid):
        b = self.api.batches[bid]
        b['polls'] += 1
        return NS(id=bid, processing_status='ended' if b['polls'] > 1 else 'in_progress')
    def results(self, bid):
        return [self.api.answer(r) for r in self.api.batches[bid]['requests']]
    def list(self, limit=20):
        out = []
        for bid, b in self.api.batches.items():
            out.append(NS(id=bid, created_at=b['created'], request_counts=NS(processing=len(b['requests']), succeeded=0, errored=0, canceled=0, expired=0)))
        return out

class FakeError(Exception):
    """An error from the stand-in API, shaped like the library's: a status code and a message."""
    def __init__(self, status, message):
        super().__init__(message); self.status_code, self.message = status, message

def stage_of(params):
    """Which step a request is for, read from the request as the API would get it."""
    system, user = params['system'][0]['text'], params['messages'][0]['content']
    if system.startswith('Stratos keeps a bank'): return 'match' if params['model'] == pipeline.HAIKU else 'confirm'
    if system.startswith('You adapt study content'): return 'adapt'
    if system.startswith('You check'): return 'screen' if params['model'] == pipeline.HAIKU else 'check'
    if system.startswith('You rewrite the wrong options'): return 'rebalance'
    if 'This point was flagged in checking' in user: return 'fix'
    return 'chapter' if re.search(r'^Write these \d+ points from this chapter', user, re.M) else 'write'

class FakeAPI:
    """Stands in for the Anthropic API. What it answers depends on words in each point's title:
    Error and Expire fail the first time, Same is in the bank, Refuse is declined until there is a note, Dash fails the
    content check once, Lost is left out of a chapter answer once, Flag is flagged by both checkers, Haiku flag only by
    Haiku, Miss only by Opus, Doubt makes Haiku not sure, Topic makes Haiku name a sensitive topic, and Unsure makes Opus
    not sure. For rebalance: Short keeps the wrong options short, Banned puts a banned word in one, Twin repeats one,
    Stubborn is declined and Glitch has an error the first time. The checker finds a problem in Picky once it has new options."""
    def __init__(self):
        self.batches, self.created, self.stop_after_create, self.seen = {}, 0, False, {}
        self.streamed, self.interrupt_on, self.release, self.limit_once, self.billed = [], None, threading.Event(), False, 0
        self.messages = NS(batches=FakeBatches(self), count_tokens=lambda **p: NS(input_tokens=len(json.dumps(p)) // 4), stream=self.stream)
    def count(self, title, stage):
        n = self.seen[(title, stage)] = self.seen.get((title, stage), 0) + 1
        return n
    def reply(self, params):
        """(kind, data): kind is ok, refusal, error or expired."""
        stage, text = stage_of(params), params['messages'][0]['content']
        if stage == 'chapter':
            pts = re.findall(r'^Id: (\S+)\nPoint: (.*)$', text, re.M)
            if any('Refuse' in t for _, t in pts): return 'refusal', None
            out = {}
            for pid, title in pts:
                n = self.count(title, 'write')
                if 'Lost' in title and n == 1: continue
                out[pid] = fake_point(title, dash=('Dash' in title and n == 1))
            return 'ok', out
        title = re.search(r'^Point: (.*)$', text, re.M).group(1) if stage not in ('check', 'screen', 'rebalance') else re.search(r'^Title: (.*)$', text, re.M).group(1)
        n = self.count(title, stage)
        if stage == 'rebalance':
            if 'Stubborn' in title: return 'refusal', None
            if 'Glitch' in title and n == 1: return 'error', None
            out = {}
            for k, right in re.findall(r'^Question ([ab]): .*\nRight option, \d+ characters \(keep it as it is\): (.*)$', text, re.M):
                n_ = len(right)
                # Wrong options of the right option's length, 2 shorter and 2 longer, so it is no longer the longest.
                wrong = [('Wrong idea ' + k + str(i) + ' ' + 'z' * 60)[:size] for i, size in enumerate([n_ - 2, n_, min(60, n_ + 2)])]
                if 'Short' in title: wrong = ['Wrong x1', 'Wrong x2', 'Wrong x3']
                if 'Banned' in title: wrong[0] = 'Crucial ' + wrong[0]
                if 'Twin' in title: wrong[1] = right
                out[k] = {'wrong': wrong}
            return 'ok', out
        if 'Error' in title and n == 1: return 'error', None
        if 'Expire' in title and n == 1: return 'expired', None
        if stage in ('match', 'confirm'):
            # The first bank point listed is the one the shortlist scored highest.
            first, opus = re.search(r'^Id: (\S+)$', text, re.M).group(1), stage == 'confirm'
            def said(verdict, sure, changes=()):
                return 'ok', {'verdict': verdict, 'same': '' if verdict == 'new' else first, 'changes': list(changes), 'sure': sure,
                              'reason': ('Opus' if opus else 'Haiku') + (' found no bank point the same.' if verdict == 'new' else ' says it teaches the same idea.')}
            if 'Same' in title: return said('reuse', 'medium')
            if 'Reuse' in title or 'Twice' in title: return said('reuse', 'high')
            if 'Mirage' in title: return said('new', 'high') if opus else said('reuse', 'high')
            if 'Adapt' in title or 'Rough' in title: return said('adapt', 'high', ['Use the term this state uses.'])
            if 'Maybe' in title: return said('reuse', 'high') if opus else said('adapt', 'medium', ['A change Haiku guessed.'])
            if 'Doubtful' in title: return said('adapt', 'medium', ['A change Haiku guessed.'])
            return said('new', 'high')
        if stage == 'adapt':
            # Only the changes: both questions reworded and one card line. Rough keeps question a word for word the
            # first time, so the content check finds a copy of the bank point's question and it is adapted again.
            aq, bq = (re.search('^' + k + r'\.q: (.*)$', text, re.M).group(1) for k in 'ab')
            redo = 'failed the content check' in text
            name = re.search(r'^title: (.*)$', text, re.M).group(1)
            ch = [{'part': 'title', 'text': 'Adapted ' + name},
                  {'part': 'a.q', 'text': aq if 'Rough' in title and not redo else 'In this state, ' + aq[0].lower() + aq[1:]},
                  {'part': 'b.q', 'text': 'Here, ' + bq[0].lower() + bq[1:]},
                  {'part': 'card2', 'text': 'This state uses its own term for it.'}]
            # The stand-in checker finds the right option by its first word, so an Economics bank point's gets one.
            for k in 'ab':
                right = re.search('^' + k + r'\.opt1: (.*) \(right\)$', text, re.M).group(1)
                if not right.startswith('Right'): ch.append({'part': k + '.opt1', 'text': ('Right: ' + right)[:60].rstrip()})
            return 'ok', {'changes': ch}
        if stage in ('write', 'fix'):
            if 'Refuse' in title and 'owner\'s note' not in text: return 'refusal', None
            return 'ok', fake_point(title, dash=('Dash' in title and n == 1))
        # The checkers: the right answer is the option that starts with Right.
        haiku = stage == 'screen'
        flag = 'Flag' in title or (haiku and 'Haiku flag' in title) or (not haiku and 'Miss' in title)
        def pick(k):
            block = text.split('Question ' + k + ': ')[1]
            opts = re.findall(r'^- (.*)$', block.split('Clue:')[0], re.M)
            best = next(o for o in opts if o.startswith('Right'))
            return {'best': best, 'also_right': [o for o in opts if o == 'Wrong one'] if 'Flag' in title and k == 'a' else []}
        probs = [{'part': 'card', 'kind': 'fact', 'detail': 'The second line is not quite right.'}] if flag else []
        if 'Picky' in title and 'Wrong idea' in text: probs = [{'part': 'a', 'kind': 'wording', 'detail': 'A new option could mislead.'}]
        sure = 'low' if not haiku and 'Unsure' in title else 'medium' if haiku and 'Doubt' in title else 'high'
        return 'ok', {'a': pick('a'), 'b': pick('b'), 'problems': probs, 'sure': sure,
                      'sensitive': 'drugs' if haiku and 'Topic' in title else 'none', 'summary': 'Problems found.' if probs else 'No problems found.'}
    def message(self, kind, data):
        self.billed += 1
        return NS(stop_reason='refusal' if kind == 'refusal' else 'end_turn', stop_details=None,
                  content=[] if kind == 'refusal' else [NS(type='thinking', thinking=''), NS(type='text', text=json.dumps(data))],
                  usage=NS(input_tokens=3000, output_tokens=2000, cache_creation_input_tokens=0, cache_read_input_tokens=0))
    def answer(self, req):
        """A batch result for one request."""
        kind, data = self.reply(req['params'])
        if kind == 'error':
            return NS(custom_id=req['custom_id'], result=NS(type='errored', error=NS(type='error', error=NS(type='api_error', message='overloaded'))))
        if kind == 'expired':
            return NS(custom_id=req['custom_id'], result=NS(type='expired'))
        return NS(custom_id=req['custom_id'], result=NS(type='succeeded', message=self.message(kind, data)))
    @contextlib.contextmanager
    def stream(self, **params):
        """The normal Messages API, for --now."""
        self.streamed.append(params)
        if self.interrupt_on and self.interrupt_on(params):
            # Ctrl+C while this request is running: it never comes back.
            self.interrupt_on = None
            _thread.interrupt_main()
            self.release.wait(5)
            raise FakeError(529, 'overloaded')
        if self.limit_once:
            self.limit_once = False
            raise FakeError(429, 'rate_limit_error')
        kind, data = self.reply(params)
        if kind in ('error', 'expired'): raise FakeError(529, 'overloaded')
        yield NS(get_final_message=lambda: self.message(kind, data))


OUTLINE = """# A test course. This comment must survive the ids being written in.
id: tst-course
subject: Testing
bank: tst
name: Testing, Year 9
about: NSW, Test topic
short: Testing
years: [9]
place: nsw
kind: standard
note: A made course for the tests. It is not real study content.
also_match: [e]
units:
  - title: Testing unit
    chapters:
      - title: First chapter   # a comment on a title
        points:
          - title: Plain one
            brief: A plain point.
          - title: Dash one
            brief: Its first version has a dash, so the content check sends it back once.
          - title: Flag one
            brief: The checker flags it, so it gets a fix.
          - title: Error one
            brief: The API has an error the first time.
          - title: Expire one
            brief: The request expires the first time.
          - title: Same one
            brief: "The matcher finds it in the bank: the nature of economics, a social science whose models change one thing and hold everything else still."
          - title: Price elasticity
            reuse: e-ped
      - title: Second chapter
        points:
          - title: Refuse one
            brief: Claude declines to write it until the owner adds a note.
          - title: Unsure one
            brief: The checker is not sure of it.
"""

CHEAP = """id: tst-cheap
subject: Testing
bank: tsc
name: Testing Cheap, Year 9
about: NSW, Cheap topic
years: [9]
place: nsw
kind: standard
note: A made course for the tests of the cheaper settings.
units:
  - title: Cheap unit
    chapters:
      - title: Screened chapter
        points:
          - title: Plain two
            brief: Haiku passes it, so it is cleared without Opus.
          - title: Haiku flag two
            brief: Haiku flags it and Opus passes it.
          - title: Flag two
            brief: Both checkers flag it, so it gets a fix.
          - title: Doubt two
            brief: Haiku is not sure of it.
          - title: Topic two
            brief: Haiku names a topic that always comes to the owner.
          - title: Lost two
            brief: The chapter answer leaves it out once, so it is written on its own.
          - title: Dash two
            brief: Its first version fails the content check, so it is written again on its own.
      - title: Refused chapter
        points:
          - title: Refuse two
            brief: The chapter request is declined because of this point.
          - title: Partner two
            brief: Written on its own after the chapter request was declined.
      - title: Words chapter
        points:
          - title: Wellbeing two
            brief: How mental health affects work, so the word list sends it straight to Opus.
          - title: Spot two
            brief: Haiku passes it, and it is picked for a spot check.
"""

# Two courses for Victoria, which names its years by units. They reuse, adapt and write points against the test
# course's bank (published by then) and the Economics bank. What the stand-in answers depends on words in each title:
# Reuse and Twice are the same as a bank point, Mirage is a reuse Haiku is sure of that Opus turns down, Adapt and Rough need changes (Rough's first changes keep a question word
# for word), Maybe is an adapt Haiku is not sure of that Opus says is a reuse, Doubtful is an adapt neither is sure of,
# and Fresh has a bank point close by that is not the same. Lonely is like nothing in any bank.
UNITS12 = """id: tsv-units-12
subject: Testing
bank: tsv
name: Testing, Units 1 and 2
about: VCE, Test units
short: Testing
years: [11]
level: Units 1 and 2
place: vic
kind: standard
note: A made course for the tests of reuse across states. It is not real study content.
units:
  - title: Testing across states
    chapters:
      - title: Matched chapter
        points:
          - title: Reuse plain one
            brief: "Plain one: the same plain point as the first course, whose first line teaches plain one."
          - title: Twice plain one
            brief: "Plain one again: the same plain point, whose first line teaches plain one."
          - title: Adapt dash one
            brief: "Dash one, with this state's term: its first line teaches dash one."
          - title: Rough flag one
            brief: "Flag one, with this state's term: its first line teaches flag one."
      - title: Looked chapter
        points:
          - title: Maybe price elasticity
            brief: Price elasticity of demand, how much the quantity demanded responds to a change in price.
          - title: Doubtful nature
            brief: "The nature of economics: a social science whose models change one thing and hold everything else still."
          - title: Fresh scarcity
            brief: "Scarcity: wants are unlimited and resources are limited, the basic economic problem."
          - title: Lonely tide pools
            brief: Rock platforms between the tides, which no bank has a point on.
          - title: Mirage supply curve
            brief: "The supply curve: it slopes up as the price rises, the good's own price moves along the curve, and costs shift it."
"""
UNITS34 = """id: tsv-units-34
subject: Testing
bank: tsv
name: Testing, Units 3 and 4
about: VCE, Later test units
short: Testing
years: [12]
level: Units 3 and 4
place: vic
kind: standard
note: A made course for the tests of the Units headings. It is not real study content.
units:
  - title: Testing later
    chapters:
      - title: Later chapter
        points:
          - title: Later ripples
            brief: Ripples spreading across a pond, a point written new.
          - title: Later echoes
            brief: Echoes coming back from a cliff, another point written new.
"""

def course_text(cid, bank, word):
    """A small course of three plain points in two chapters, for run-many."""
    return """id: """ + cid + """
subject: Testing
bank: """ + bank + """
name: Testing """ + word + """, Year 9
about: NSW, """ + word + """ topic
years: [9]
place: nsw
kind: standard
note: A made course for the run-many tests.
units:
  - title: """ + word + """ unit
    chapters:
      - title: """ + word + """ first chapter
        points:
          - title: """ + word + """ one
            brief: A plain point.
          - title: """ + word + """ two
            brief: Another plain point.
      - title: """ + word + """ second chapter
        points:
          - title: """ + word + """ three
            brief: A point on its own.
"""

def run(argv):
    """Runs the pipeline and returns (exit code, what it printed)."""
    out = io.StringIO()
    with contextlib.redirect_stdout(out):
        try:
            code = pipeline.main(argv)
        except SystemExit as e:
            code = e.code
    return code, out.getvalue()

def copy_repo(dst):
    """The parts of the repository that publish, check_content.mjs and build.py need."""
    for d in ['src', 'supabase']: shutil.copytree(os.path.join(REPO, d), os.path.join(dst, d), ignore=shutil.ignore_patterns('bank', 'courses'))
    os.makedirs(os.path.join(dst, 'lab')); os.makedirs(os.path.join(dst, 'content'))
    for f in ['topics.js', 'maths.js', 'keypad.js', 'sheet.js', 'keys.css']: shutil.copy(os.path.join(REPO, 'lab', f), os.path.join(dst, 'lab', f))
    for f in ['load.mjs', 'dump.mjs', 'latex.mjs']: shutil.copy(os.path.join(HERE, f), os.path.join(dst, 'content', f))
    # MathLive's build for Node, which the content check uses to parse LaTeX (content/latex.mjs).
    os.makedirs(os.path.join(dst, 'lab', 'mathlive'))
    shutil.copy(os.path.join(REPO, 'lab', 'mathlive', 'mathlive-ssr.min.mjs'), os.path.join(dst, 'lab', 'mathlive'))
    for f in ['build.py', 'check_content.mjs']: shutil.copy(os.path.join(REPO, f), os.path.join(dst, f))


def auto_tests(tmp, repo, printed):
    """autoreview, on a work folder of flagged points made here: what it clears, what stays, spot checks, undo."""
    work = os.path.join(tmp, 'work-auto')
    def go(*argv):
        code, out = run(['--repo', repo, '--work', work, 'autoreview'] + list(argv)); printed.append(out); return code, out
    def prob(part, kind, detail='A clearer word would help here.'):
        return {'part': part, 'kind': kind, 'detail': detail}
    def point(pid, problems=(), sure='high', sensitive='none', also=False, best_wrong=False, fix=True, new_answer=False, bad_fix=False,
              local=None, stage='review', owner=None):
        draft = pipeline.to_bank(fake_point(pid.replace('-', ' ').capitalize()))
        best = lambda k: draft[k]['opts'][1 if best_wrong and k == 'a' else 0]
        check_ = {'a': {'best': best('a'), 'also_right': [draft['a']['opts'][2]] if also else []}, 'b': {'best': best('b'), 'also_right': []},
                  'problems': list(problems), 'sure': sure, 'sensitive': sensitive, 'summary': 'Problems found.'}
        rec = {'id': pid, 'title': draft['title'], 'brief': 'x', 'stage': stage, 'draft': draft, 'check': check_, 'sensitive': sensitive, 'local': local or [], 'log': []}
        rec['flags'], _ = pipeline.flags_for(rec)
        if fix:
            p = json.loads(json.dumps(draft)); p['remember'] = 'A clearer remember line.'
            if new_answer: p['a']['opts'][0] = 'A different right answer'
            if bad_fix: p['remember'] = 'A dash — in the fix'
            rec.update(proposal=p, proposal_problems=[])
        if owner: rec.update(final=rec['proposal'] if owner == 'fix' else draft, cleared_by='owner')
        return rec
    safe = ['tau-wording', 'tau-other', 'tau-local'] + ['tau-safe-' + str(i) for i in range(1, 13)]
    recs = [point('tau-wording', [prob('card', 'wording')]), point('tau-other', [prob('remember', 'other', 'This term belongs to point 2.')]),
            point('tau-local', local=['tau-local banned word in: a key idea'])] + [point(i, [prob('a', 'wording')]) for i in safe[3:]]
    unsafe = {'tau-fact': (point('tau-fact', [prob('card', 'fact')]), 'a possible factual error'),
              'tau-level': (point('tau-level', [prob('b', 'level')]), 'a problem with the level'),
              'tau-words': (point('tau-words', [prob('card', 'wording', 'The date in this line is incorrect.')]), 'a problem uses a word like wrong or error'),
              'tau-medium': (point('tau-medium', [prob('card', 'wording')], sure='medium'), 'the checker was not highly sure'),
              'tau-topic': (point('tau-topic', [prob('card', 'wording')], sensitive='drugs'), 'a sensitive topic'),
              'tau-best': (point('tau-best', [], best_wrong=True), 'the checker picked another answer'),
              'tau-also': (point('tau-also', [], also=True), 'another option could also be right'),
              'tau-nofix': (point('tau-nofix', [prob('card', 'wording')], fix=False), 'no fix'),
              'tau-badfix': (point('tau-badfix', [prob('card', 'wording')], bad_fix=True), 'the fix fails the content check'),
              'tau-answer': (point('tau-answer', [prob('a', 'wording')], new_answer=True), 'the fix changes a right answer')}
    recs += [r for r, _ in unsafe.values()]
    recs += [point('tau-failed', stage='failed'), point('tau-owner', [prob('card', 'other')], stage='cleared', owner='fix'),
             point('tau-owner-fact', [prob('card', 'fact')], stage='cleared', owner='draft')]
    W = pipeline.Work(work, 'tst-auto')
    for r in recs: W.put(r)
    pts = [{'id': r['id'], 'title': r['title'], 'brief': 'x'} for r in recs]
    pipeline.write_json(os.path.join(W.dir, 'course.json'), {'id': 'tst-auto', 'subject': 'Testing', 'name': 'Testing Auto, Year 9', 'about': 'x', 'kind': 'standard',
                        'years': [9], 'units': [{'title': 'U', 'chapters': [{'id': 'c1', 'title': 'C', 'points': pts}]}]})
    trial = pipeline.Work(work, 'tst-auto-trial')
    trial.put(dict(point('tau-wording', [prob('card', 'wording')]), id='tau-trial'))
    pipeline.write_json(os.path.join(trial.dir, 'course.json'), {'id': 'tst-auto-trial', 'name': 'Trial', 'kind': 'standard', 'trial_of': 'tst-auto',
                        'units': [{'title': 'U', 'chapters': [{'id': 'c1', 'title': 'C', 'points': [{'id': 'tau-trial', 'title': 'T', 'brief': 'x'}]}]}]})
    files = lambda: {os.path.join(r_, f): open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(work) for f in fs}
    st = lambda pid: W.load(pid)['stage']

    g = pipeline.AUTO_UNSAFE_WORDS.search
    check(all(g(t) for t in ['It is incorrect.', 'This is wrong.', 'a false split', 'Inaccurate figure', 'not true in Australia', 'an error', 'a mistake']) and
          not any(g(t) for t in ['The card correctly says may.', 'Reword it.', 'the terror of debt']), 'the word guard catches its words, and not words that only contain them')
    check(pipeline.AUTO_SPOT_EVERY == 10 and pipeline.AUTO_SAFE_KINDS == ('wording', 'other'), 'spot checks are 1 in 10, and only wording and other are safe kinds')

    before = files()
    code, out = go('--dry-run')
    check(code == 0 and 'Dry run: nothing is changed.' in out and files() == before, 'the dry run changes no file')
    check('Would clear automatically with the checker\'s fix: 13.' in out and 'Would keep for you as spot checks (1 in 10): 2.' in out,
          'it says how many it would clear and keep as spot checks')
    check('Left for you in the review list after this: 13.' in out and all('    ' + w + ': 1' in out for _, w in unsafe.values()) and 'not written: 1' in out and 'a spot check: 2' in out,
          'and how many are left for you, with each reason')
    check('Trial' not in out, 'trials are left out')
    check('tau-owner: would clear (card other). You used the fix.' in out and 'tau-owner-fact: would stay for you (a possible factual error). You approved as written.' in out,
          'it replays the rules on points you already reviewed, next to what you chose')

    code, out = go()
    spots = [safe[0], safe[10]]
    check(code == 0 and 'Cleared automatically with the checker\'s fix: 13.' in out and all(st(i) == 'cleared' for i in safe if i not in spots),
          'autoreview clears the safe points')
    a = W.load('tau-wording')
    c = W.load('tau-other')
    check(c['cleared_by'] == 'auto' and c['final'] == c['proposal'] and c['auto']['decision'] == 'used the fix' and c['auto']['problems'] == c['check']['problems'] and
          c['auto']['flags'] == c['flags'] and c['auto']['rules'] == pipeline.AUTO_RULES and any('autoreview: cleared with the fix (remember other)' in l for l in c['log']),
          'each point records what was flagged and that the fix was used automatically, and keeps its first draft')
    check(st('tau-local') == 'cleared', 'a draft that only failed the content check is cleared when the fix passes it')
    check(all(st(i) == 'review' and W.load(i)['auto']['spot'] for i in spots) and a.get('final') is None and pipeline.read_json(pipeline.auto_path(W))['decided'] == 15,
          'the 1st and 11th automatic decisions stay for you as spot checks')
    check(all(st(i) == 'review' and not W.load(i).get('auto') for i in unsafe) and st('tau-failed') == 'failed', 'every unsafe point stays for you')
    check(W.load('tau-badfix')['proposal_problems'] and pipeline.auto_problems(W.load('tau-badfix')) == ['the fix fails the content check'],
          'a fix that fails the content check now has its problems saved for the review page')
    s = pipeline.stats(W, pts)
    check(s['flagged'] >= 13 + 2, 'points cleared automatically still count as flagged in the numbers after a run')
    code, out = go()
    check('Cleared automatically with the checker\'s fix: 0.' in out and pipeline.read_json(pipeline.auto_path(W))['decided'] == 15 and all(st(i) == 'review' for i in spots),
          'running it again decides nothing twice')

    items = [i for i in pipeline.review_items(work, repo)['items'] if i['course'] == 'tst-auto']
    check(sorted(i['id'] for i in items if i['spot']) == sorted(spots) and not any(i['id'] == 'tau-trial' for i in pipeline.review_items(work, repo)['items']),
          'the review page lists the spot checks, marked as spot checks')
    r1 = pipeline.decide(work, repo, {'course': 'tst-auto', 'id': spots[0], 'action': 'fix'})
    r2 = pipeline.decide(work, repo, {'course': 'tst-auto', 'id': spots[1], 'action': 'reject', 'note': 'The fix is worse.'})
    ans = pipeline.read_json(pipeline.auto_path(W))['spot_answers']
    check(r1['ok'] and r2['ok'] and [(x['id'], x['action']) for x in ans] == [(spots[0], 'fix'), (spots[1], 'reject')] and W.load(spots[0])['auto']['owner'] == 'fix',
          'your decision on each spot check is saved')
    code, out = go()
    check('Spot checks you decided: 2 (used the fix 1, rejected 1).' in out and 'Warning: you rejected 1 spot check (' + spots[1] + ')' in out,
          'rejecting a spot check shows a warning in the summary')
    check(any('Warning: you rejected 1 spot check' in l for l in pipeline.auto_lines(W, pipeline.meta_recs(W, pipeline.read_json(os.path.join(W.dir, 'course.json'))))),
          'and the same lines go in the summary after a run and in status')

    before = files()
    code, out = go('--undo', '--dry-run')
    check(code == 0 and 'Testing Auto, Year 9 (tst-auto): 13 would go back to the review list.' in out and files() == before,
          'undo with no outline looks at every course, and its dry run changes nothing')
    code, out = go('--point', 'tau-other')
    check(code == 1 and 'works with --undo' in out, '--point works only with --undo')
    outline = os.path.join(tmp, 'tst-auto.yaml')
    with open(outline, 'w', encoding='utf-8') as f: f.write('id: tst-auto\nsubject: Testing\n')
    before = files()
    code, out = go(outline, '--undo', '--point', 'tau-other', '--dry-run')
    check(code == 0 and 'would go back' in out and files() == before, 'undo has a dry run too')
    code, out = go(outline, '--undo', '--point', 'tau-other')
    c = W.load('tau-other')
    check(code == 0 and c['stage'] == 'review' and not c.get('final') and not c.get('cleared_by') and c['auto_undone']['undone'] and c['proposal'] and c['draft'],
          'undo with --point sends one point back to the review list, keeping the record of its decision')
    code, out = go(outline)
    check(st('tau-other') == 'review' and pipeline.auto_problems(W.load('tau-other')) == ['you undid its automatic decision'], 'and it is never cleared automatically again')
    code, out = go(outline, '--undo')
    check(code == 0 and not any(W.load(i).get('cleared_by') == 'auto' for i in safe) and 'run publish again' in out, 'undo sends back every point it cleared')
    with open(os.path.join(tmp, 'tst-none.yaml'), 'w', encoding='utf-8') as f: f.write('id: tst-none\n')
    code, out = go(os.path.join(tmp, 'tst-none.yaml'))
    check(code == 0 and 'no work folder yet' in out, 'an outline with no work folder yet says so')

def recheck_tests(tmp, repo, printed, api):
    """recheck, on a work folder of held points made here: which fixes it sends, that the checker sees only the fix, what
    it clears and keeps, spot checks, money, undo, and never deciding a point twice."""
    work = os.path.join(tmp, 'work-recheck')
    def go(*argv):
        code, out = run(['--repo', repo, '--work', work, 'recheck'] + list(argv)); printed.append(out); return code, out
    fact = {'part': 'card', 'kind': 'fact', 'detail': 'OLDPROBLEM: the second line may not be right.'}
    pts = []
    def point(title, problems=(fact,), sensitive='none', fix=True, answer=None, bad_fix=False, undone=False, sure='high'):
        pid = 'trc-' + '-'.join(title.lower().split()[1:])
        draft = pipeline.to_bank(fake_point(title))
        check_ = {'a': {'best': draft['a']['opts'][0], 'also_right': []}, 'b': {'best': draft['b']['opts'][0], 'also_right': []},
                  'problems': list(problems), 'sure': sure, 'sensitive': sensitive, 'summary': 'Problems found.'}
        rec = {'id': pid, 'title': title, 'brief': 'x', 'stage': 'review', 'draft': draft, 'check': check_, 'sensitive': sensitive, 'local': [], 'log': []}
        rec['flags'], _ = pipeline.flags_for(rec)
        if fix:
            f = json.loads(json.dumps(draft)); f['remember'] = 'A clearer remember line.'
            if answer: f['a']['opts'] = answer
            if bad_fix: f['remember'] = 'A dash — in the fix'
            rec.update(proposal=f, proposal_problems=[])
        if undone: rec['auto_undone'] = {'by': 'recheck', 'undone': pipeline.now()}
        pts.append({'id': pid, 'title': title, 'brief': 'The brief of ' + title.lower() + '.', 'codes': [], 'reuse': None, 'unit': 0, 'chapter': 0})
        return rec
    # Eleven fixes the fresh check agrees with. The second changed a right answer, which autoreview never clears.
    oks = [point('Recheck ok newanswer', answer=['Right: a new answer', 'Wrong one', 'Wrong two', 'Wrong three']) if i == 2 else point('Recheck ok ' + str(i))
           for i in range(1, 12)]
    kept = [point('Recheck Flag'), point('Recheck Unsure'), point('Recheck picks', answer=['Not this one', 'Right: this one', 'Wrong two', 'Wrong three'])]
    err = point('Recheck Error')
    never = {'trc-topic': (point('Recheck topic', sensitive='drugs'), 'a sensitive topic'),
             'trc-undone': (point('Recheck undone', undone=True), 'you undid its automatic decision'),
             'trc-badfix': (point('Recheck badfix', bad_fix=True), 'the fix fails the content check'),
             'trc-wording': (point('Recheck wording', problems=[{'part': 'card', 'kind': 'wording', 'detail': 'Reword it.'}]), 'autoreview can clear it, with no API call'),
             'trc-nofix': (point('Recheck nofix', fix=False, sure='low'), 'no fix')}
    W = pipeline.Work(work, 'tst-recheck')
    for r in oks + kept + [err] + [r for r, _ in never.values()]: W.put(r)
    # A course.json from before the syllabus line was saved in it: the syllabus comes from the outline.
    pipeline.write_json(os.path.join(W.dir, 'course.json'), {'id': 'tst-recheck', 'subject': 'Testing', 'name': 'Testing Recheck, Year 9', 'about': 'NSW, Recheck topic',
                        'kind': 'standard', 'years': [9], 'units': [{'title': 'Recheck unit', 'chapters': [{'id': 'tst-recheck-1-1', 'title': 'Recheck chapter', 'points': pts}]}]})
    outline = os.path.join(tmp, 'tst-recheck.yaml')
    with open(outline, 'w', encoding='utf-8') as f: f.write('id: tst-recheck\nsubject: Testing\nsyllabus: The recheck syllabus, Year 9\n')
    files = lambda: {os.path.join(r_, f): open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(work) for f in fs}
    st = lambda pid: W.load(pid)['stage']

    code, out = go(outline)
    check(code == 1 and '--max-dollars' in out, 'recheck needs --max-dollars')
    del os.environ['ANTHROPIC_API_KEY']
    before, first = files(), api.created
    code, out = go(outline, '--dry-run')
    check(code == 0 and 'rough' in out and files() == before and api.created == first, 'its dry run works without a key, and sends and changes nothing')
    os.environ['ANTHROPIC_API_KEY'] = KEY
    code, out = go(outline, '--dry-run')
    check(code == 0 and 'Fixes to recheck: 15.' in out and 'rough' not in out and re.search(r'Estimate: US\$\d+\.\d\d to US\$\d+\.\d\d, in one batch, Claude Opus 5.5, high effort', out) and
          'Spent on this course so far: US$0.00.' in out and files() == before and api.created == first,
          'the dry run shows the fixes it would send and the estimate, with the money spent so far')
    check(all('    ' + w + ': 1' in out for _, w in never.values()), 'and why each other point stays with you: a sensitive topic, undone, a fix that fails the content check, autoreview, no fix')
    code, out = go(outline, '--max-dollars', '0.0001')
    check(code == 1 and 'Not sent' in out and api.created == first, 'it sends nothing that could pass --max-dollars')

    code, out = go(outline, '--max-dollars', '5')
    reqs = [r for bid, b in api.batches.items() if int(bid.split('_')[1]) > first for r in b['requests']]
    check(code == 0 and 'Done for now' in out and api.created == first + 2 and len(reqs) == 16, 'recheck sends the fixes in a batch, and sends an errored one again')
    user = lambda r: r['params']['messages'][0]['content']
    check(all(stage_of(r['params']) == 'check' and r['params']['model'] == pipeline.OPUS and r['params']['output_config']['effort'] == 'high' for r in reqs),
          'each fix goes to the Opus checker, at high effort')
    check(all('A clearer remember line.' in user(r) and 'Hold on to' not in user(r) and 'OLDPROBLEM' not in user(r) and 'flagged' not in user(r) for r in reqs),
          'the checker sees the fix as a new point: never the first draft or the first check\'s problems')
    check(all('Syllabus: The recheck syllabus, Year 9' in user(r) and 'Chapter 1: Recheck chapter' in user(r) for r in reqs), 'and is told the course, its syllabus and the chapter, as in the first check')
    check(not any(nid in json.dumps(reqs) for nid in never), 'sensitive, undone, failing, autoreview and fix-less points are never sent')
    spots = [oks[0]['id'], oks[10]['id']]
    agreed = [r['id'] for r in oks + [err] if r['id'] not in spots]
    check(all(st(i) == 'cleared' and W.load(i)['cleared_by'] == 'recheck' and W.load(i)['final'] == W.load(i)['proposal'] for i in agreed),
          'a fix the fresh check agrees with is cleared with the fix, marked cleared_by recheck')
    nw = W.load('trc-ok-newanswer')
    check(nw['stage'] == 'cleared' and nw['final']['a']['opts'][0] == 'Right: a new answer' and nw['auto']['by'] == 'recheck' and
          any('recheck: the fresh check agreed with the fix' in l for l in nw['log']), 'including a fix that changed a right answer, with the decision recorded')
    check(all(st(i) == 'review' and W.load(i)['auto']['spot'] and W.load(i)['auto']['by'] == 'recheck' for i in spots) and
          pipeline.read_json(pipeline.auto_path(W))['rechecked'] == 12, 'the 1st and 11th recheck clears stay for you as spot checks')
    why = {r['id']: W.load(r['id'])['recheck'] for r in kept}
    check(all(st(i) == 'review' and why[i]['result'] == 'kept' for i in why) and
          set(why['trc-flag']['why']) == {'the fresh check found a problem', 'the fresh check says another option could also be right'} and
          why['trc-unsure']['why'] == ['the fresh check was not highly sure'] and why['trc-picks']['why'] == ['the fresh check picked another answer'],
          'a fresh check that finds a problem, another right option, doubt or another answer keeps the point, with the reasons')
    check(all(st(i) == 'review' and not W.load(i).get('recheck') for i in never) and W.load('trc-badfix')['proposal_problems'], 'the points never sent stay as they were')
    check(pipeline.Work(work, 'tst-recheck').state['spent']['usd'] > 0 and all(W.load(i)['usd']['recheck'] > 0 for i in agreed), 'the money is counted for the course and each point')
    check('Fixes rechecked: 15. Cleared with the fix: 10. Spot checks waiting for you: 2. Kept for you: 3.' in out and 'Kept for you because' in out,
          'the summary at the end says what the fresh checks decided, for the course')
    items = {i['id']: i for i in pipeline.review_items(work, repo)['items'] if i['course'] == 'tst-recheck'}
    check(all(items[i]['spot'] and items[i]['spotBy'] == 'recheck' for i in spots) and items['trc-flag']['recheck']['result'] == 'kept' and items['trc-flag']['recheck']['flags'],
          'the review page shows the recheck\'s spot checks and the fresh check of a kept fix')

    first = api.created
    code, out = go(outline, '--max-dollars', '5')
    check(code == 0 and 'Fixes to recheck: 0.' in out and 'rechecked already: 3' in out and 'Nothing to recheck.' in out and api.created == first, 'running it again decides nothing twice')
    r = pipeline.decide(work, repo, {'course': 'tst-recheck', 'id': spots[1], 'action': 'reject', 'note': 'No.'})
    check(r['ok'] and any('Warning: you rejected 1 spot check (' + spots[1] + ')' in l for l in pipeline.auto_lines(W, pipeline.meta_recs(W, pipeline.read_json(os.path.join(W.dir, 'course.json'))))),
          'rejecting a recheck spot check shows the warning')
    code, out = run(['--repo', repo, '--work', work, 'autoreview', outline, '--undo', '--point', agreed[0]]); printed.append(out)
    u = W.load(agreed[0])
    check(code == 0 and u['stage'] == 'review' and u['auto_undone']['by'] == 'recheck' and not u.get('cleared_by'), 'autoreview --undo sends a recheck clear back to you')
    code, out = go(outline, '--max-dollars', '5')
    check(st(agreed[0]) == 'review' and 'you undid its automatic decision: 2' in out and api.created == first, 'and it is never rechecked or cleared that way again')
    W = pipeline.Work(work, 'tst-recheck')
    W.state['batches'].append({'id': 'msgbatch_open', 'items': {'c_x': {'pid': 'trc-flag', 'stage': 'check', 'model': pipeline.OPUS}}}); W.save()
    code, out = go(outline, '--dry-run')
    check('A run\'s batch is still open' in out, 'a course with a run\'s batch still open is left until the run collects it')

AUTOREJECT = """id: tst-rej
subject: Testing
bank: tsj
name: Testing Autoreject, Year 9
about: NSW, Autoreject topic
years: [9]
place: nsw
kind: standard
note: A made course for the autoreject tests.
units:
  - title: Autoreject unit
    chapters:
      - title: Rewrites chapter
        points:
          - title: Plain Miss
            brief: The checker finds a problem in every version of it.
          - title: Plain Clean
            brief: The checker passes it.
"""

def autoreject_tests(tmp, repo, printed, api):
    """autoreject, on a work folder of held points made here (who it rejects and who stays, the rejection itself, the dry
    run, undo), then a full loop on a course run here: recheck, autoreject and a rewrite, until the point reaches the owner."""
    work = os.path.join(tmp, 'work-autoreject')
    def go(*argv):
        code, out = run(['--repo', repo, '--work', work, 'autoreject'] + list(argv)); printed.append(out); return code, out
    P = pipeline.RECHECK_PROBLEM
    pts = []
    def point(title, why=(P,), brief=None, **extra):
        pid = 'tar-' + '-'.join(title.lower().split())
        draft = pipeline.to_bank(fake_point(title))
        fix = json.loads(json.dumps(draft)); fix['remember'] = 'THEFIX: a clearer remember line.'
        first = {'a': {'best': draft['a']['opts'][0], 'also_right': []}, 'b': {'best': draft['b']['opts'][0], 'also_right': []}, 'sure': 'high', 'sensitive': 'none', 'summary': 'Problems found.',
                 'problems': [{'part': 'card', 'kind': 'fact', 'detail': 'OLDPROBLEM: the second line may not be right.'}]}
        again = dict(first, problems=[{'part': 'a', 'kind': 'fact', 'detail': 'NEWPROBLEM: the fix names another year.'}])
        rec = {'id': pid, 'title': title, 'brief': 'x', 'stage': 'review', 'draft': draft, 'proposal': fix, 'proposal_problems': [], 'check': first, 'sensitive': 'none',
               'flags': ['Card, fact: OLDPROBLEM: the second line may not be right.'], 'local': [], 'log': [], 'note': 'An older note.',
               'recheck': {'at': pipeline.now(), 'result': 'kept', 'why': list(why), 'check': again, 'flags': ['Question a, fact: NEWPROBLEM: the fix names another year.']}}
        rec.update(extra)
        pts.append({'id': pid, 'title': title, 'brief': brief or 'The brief of ' + title.lower() + '.', 'codes': [], 'reuse': None, 'unit': 0, 'chapter': 0})
        return rec
    rejected_line, changed_line = '2026-10-28T11:49:12Z review: rejected, to be written again', '2026-10-29T11:49:12Z the outline changed, so it starts again at write'
    ready = [point('Ready one'), point('Ready two'), point('Second go', rewrites=1), point('Old log', log=[rejected_line]), point('Log reset', log=[rejected_line, rejected_line, changed_line])]
    sure = point('Topic first check'); sure['check'] = dict(sure['check'], sensitive='drugs')
    unsent = point('Not rechecked'); del unsent['recheck']
    never = {'tar-topic-named': (point('Topic named', sensitive='drugs'), 'a sensitive topic'),
             sure['id']: (sure, 'a sensitive topic'),
             'tar-topic-screen': (point('Topic screen', screen_sensitive='drugs'), 'a sensitive topic'),
             'tar-topic-word': (point('Topic word', brief='How vaping harms the lungs.'), 'a word that may mean a sensitive topic'),
             'tar-topic-fresh': (point('Topic fresh', why=['the fresh check named a sensitive topic', P]), 'the fresh check kept it for another reason'),
             'tar-possible-match': (point('Possible match', stage='match-review'), 'a possible match in the bank'),
             'tar-spot-check': (point('Spot check', auto={'spot': True, 'by': 'recheck'}), 'a spot check'),
             'tar-undone-one': (point('Undone one', auto_undone={'by': 'recheck', 'undone': pipeline.now()}), 'you undid its automatic decision'),
             'tar-also-unsure': (point('Also unsure', why=['the fresh check was not highly sure', P]), 'the fresh check kept it for another reason'),
             'tar-another-answer': (point('Another answer', why=['the fresh check picked another answer']), 'the fresh check kept it for another reason'),
             'tar-bad-fix': (point('Bad fix', proposal_problems=['A banned word.']), 'the fix fails the content check'),
             'tar-twice-counted': (point('Twice counted', rewrites=2), 'rewritten 2 times already'),
             'tar-twice-in-log': (point('Twice in log', log=[rejected_line, rejected_line]), 'rewritten 2 times already'),
             unsent['id']: (unsent, 'not rechecked')}
    done = point('Decided already', stage='cleared', cleared_by='owner')
    twin = point('Owner twin')
    W = pipeline.Work(work, 'tst-autoreject')
    for r in ready + [r for r, _ in never.values()] + [done, twin]: W.put(r)
    pipeline.write_json(os.path.join(W.dir, 'course.json'), {'id': 'tst-autoreject', 'subject': 'Testing', 'name': 'Testing Autoreject, Year 9', 'about': 'NSW', 'kind': 'standard', 'years': [9],
                        'syllabus': 'The syllabus', 'units': [{'title': 'A unit', 'chapters': [{'id': 'tar-1-1', 'title': 'A chapter', 'points': pts}]}]})
    outline = os.path.join(tmp, 'tst-autoreject.yaml')
    with open(outline, 'w', encoding='utf-8') as f: f.write('id: tst-autoreject\nsubject: Testing\n')
    files = lambda: {os.path.join(r_, f): open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(work) for f in fs}
    course = lambda: pipeline.meta_recs(W, pipeline.read_json(os.path.join(W.dir, 'course.json')))
    ids = [r['id'] for r in ready]
    pipeline.decide(work, repo, {'course': 'tst-autoreject', 'id': twin['id'], 'action': 'reject', 'note': 'No.'})
    check(W.load(twin['id'])['rewrites'] == 1 and any(' review: rejected, to be written again' in l for l in W.load(twin['id'])['log']), 'a rejection on the review page counts as a rewrite')

    del os.environ['ANTHROPIC_API_KEY']
    before, first = files(), api.created
    code, out = go(outline, '--dry-run')
    os.environ['ANTHROPIC_API_KEY'] = KEY
    check(code == 0 and 'Would reject and send for a rewrite: 5.' in out and all('    ' + i + ' (a fact)' in out for i in ids) and files() == before and api.created == first,
          'the dry run needs no key, names the points it would reject, and changes nothing')
    check(not any(i in out.split('Left for you')[0] for i in never), 'it would reject only points kept for a problem alone')
    tally = {}
    for _, w in never.values(): tally[w] = tally.get(w, 0) + 1
    check(all('    ' + w + ': ' + str(n) in out for w, n in tally.items()) and 'Left for you in the review list: ' + str(len(never)) + '.' in out,
          'and says why each other point stays: a sensitive topic, a possible match, a spot check, undone, another reason, a failing fix, rewritten twice')
    code, out = go(outline, '--point', ids[0])
    check(code == 1 and '--point works with --undo' in out and files() == before, '--point works only with --undo')

    code, out = go(outline)
    recs = {i: W.load(i) for i in ids}
    check(code == 0 and 'Rejected and send for a rewrite: 5.' in out and 'Next: in the key window' in out and api.created == first, 'autoreject rejects them, with no API call')
    check(all(r['stage'] == 'write' and r['cleared_by'] == 'autoreject' for r in recs.values()), 'each goes to be written again, marked cleared_by autoreject')
    check(all(not any(k in r for k in ['draft', 'proposal', 'check', 'flags', 'recheck']) for r in recs.values()) and
          set(recs[ids[0]]) - {'cleared_by', 'autoreject', 'note', 'rejected'} == set(W.load(twin['id'])) - {'note', 'rejected'}, 'as a rejection from the owner leaves it')
    check(all(r['rejected']['remember'] == 'THEFIX: a clearer remember line.' and 'NEWPROBLEM' in r['note'] and 'OLDPROBLEM' not in r['note'] for r in recs.values()),
          'the writer gets the fix, the version the fresh check read, with the fresh check\'s problems')
    us = pipeline.write_user({'units': [{'title': 'U', 'chapters': [{'title': 'C', 'points': pts}]}], 'subject': 'S', 'about': 'A', 'years': [9], 'place': 'nsw', 'placeName': 'NSW'}, pts[0], recs[ids[0]])
    check('The owner rejected this earlier version' in us and 'THEFIX' in us and 'NEWPROBLEM' in us and 'Hold on to' not in us, 'and the writing request shows them')
    check([recs[i]['rewrites'] for i in ids] == [1, 1, 2, 2, 1], 'the count of rewrites carries on, also from a point rejected before it was kept, and starts again when the outline changed')
    a = recs[ids[0]]['autoreject'][0]
    check(a['flags'] and a['rules'] == pipeline.AUTO_RULES and a['rewrites'] == 1 and a['saved']['proposal'] == ready[0]['proposal'] and any('autoreject: rejected, to be written again (a fact)' in l for l in recs[ids[0]]['log']),
          'the decision is recorded in the point\'s file and its log')
    check(all(W.load(i) == r for i, (r, _) in never.items()) and W.load(done['id']) == done, 'the others stay exactly as they were')
    check(not pipeline.read_json(pipeline.auto_path(W)), 'it counts as no spot check, and shows no warning')
    summary = 'Rejected automatically and sent for a rewrite: 5. Waiting to be rewritten: 5. Left for you after 2 rewrites: 2.'
    check(summary in out and any(summary in l for l in pipeline.auto_lines(W, course())), 'the summary shows the counts, here and in every other summary')
    saved = files()
    code, out = go(outline)
    check(code == 0 and 'Rejected and send for a rewrite: 0.' in out and files() == saved, 'running it again decides nothing twice')

    # Undo.
    code, out = go(outline, '--undo', '--dry-run')
    check(code == 0 and '5 would go back' in out and files() == saved, 'undo\'s dry run says what would go back, and changes nothing')
    W.state['batches'].append({'id': 'msgbatch_open', 'items': {'w_x': {'pid': ids[0], 'stage': 'write', 'model': pipeline.OPUS}}}); W.save()
    code, out = go(outline, '--undo')
    check(code == 0 and 'batch is still open' in out and W.load(ids[0])['stage'] == 'write', 'undo waits while a run\'s batch is open, in case a rewrite is in it')
    W.state['batches'] = []; W.save()
    code, out = go(outline, '--undo', '--point', ids[0])
    u = W.load(ids[0])
    check(code == 0 and '1 went back' in out and u['stage'] == 'review' and 'cleared_by' not in u and 'rejected' not in u and u['note'] == 'An older note.' and u['rewrites'] == 0, 'undo for one point puts it back in the review list')
    check(all(u[k] == ready[0][k] for k in ['draft', 'proposal', 'check', 'flags', 'recheck']) and u['autoreject'][0]['undone'] and 'saved' not in u['autoreject'][0], 'as it was, with the fresh check of the fix')
    check(u['auto_undone']['by'] == 'autoreject' and any('autoreject: undone' in l for l in u['log']), 'and the undo is recorded')
    code, out = go(outline)
    check(W.load(ids[0])['stage'] == 'review' and 'you undid its automatic decision: 2' in out, 'it is never rejected automatically again')
    check(pipeline.recheck_skip(W.load(ids[0])) and pipeline.auto_problems(W.load(ids[0])) == ['you undid its automatic decision'], 'or cleared automatically')
    code, out = go(outline, '--undo', '--point', ids[0])
    check(code == 1 and 'no automatic rejection to undo' in out, 'and there is nothing left to undo on it')

    # A rewrite something else has decided stands.
    r = W.load(ids[1]); r.update(stage='cleared', final=r['rejected'], cleared_by='checker'); W.put(r)
    r = W.load(ids[2]); r.update(stage='review', draft=r['rejected'], flags=[]); W.put(r)
    check(pipeline.side(r)['clearedBy'] is None, 'the Compare tab never calls a point cleared until it is')
    pipeline.decide(work, repo, {'course': 'tst-autoreject', 'id': ids[2], 'action': 'reject', 'note': 'Not this either.'})
    code, out = go(outline, '--undo')
    check(code == 0 and '2 went back' in out and W.load(ids[1])['cleared_by'] == 'checker' and W.load(ids[2])['stage'] == 'write', 'undo leaves a rewrite that was cleared, and one the owner rejected')
    check(W.load(ids[3])['stage'] == 'review' and W.load(ids[4])['stage'] == 'review', 'and with no outline names, sends back every other point it rejected')
    check(any('Rejected automatically and sent for a rewrite: 2. Waiting to be rewritten: 0.' in l for l in pipeline.auto_lines(W, course())),
          'the summary keeps a rewrite that stands, drops one undone, and does not count one the owner rejected as waiting for autoreject')
    code, out = go(outline, '--undo', '--point', ids[1])
    check(code == 1, 'and undo has nothing to do for a rewrite that was cleared')
    trial = os.path.join(work, 'tst-autoreject-t'); shutil.copytree(W.dir, trial)
    meta = pipeline.read_json(os.path.join(trial, 'course.json')); meta.update(id='tst-autoreject-t', trial_of='tst-autoreject'); pipeline.write_json(os.path.join(trial, 'course.json'), meta)
    r = pipeline.read_json(os.path.join(trial, 'points', 'tar-log-reset.json')); r.pop('auto_undone'); r.pop('rewrites'); pipeline.write_json(os.path.join(trial, 'points', 'tar-log-reset.json'), r)
    code, out = go('--dry-run')
    check('tst-autoreject-t' not in out, 'with no outline it looks at every course, and trials are left out')

    # The whole loop, on a course run here. The checker finds a problem in every version of Plain Miss.
    repo_r, work_r = os.path.join(tmp, 'repo-rej'), os.path.join(tmp, 'work-rej')
    copy_repo(repo_r)
    course_file = os.path.join(tmp, 'tst-rej.yaml')
    with open(course_file, 'w', encoding='utf-8') as f: f.write(AUTOREJECT)
    def on(*argv):
        code, out = run(['--repo', repo_r, '--work', work_r] + list(argv)); printed.append(out); return code, out
    on('run', course_file, '--max-dollars', '5')
    R = pipeline.Work(work_r, 'tst-rej')
    pid = 'tsj-plain-miss'
    rec = R.load(pid)
    check(rec['stage'] == 'review' and R.load('tsj-plain-clean')['stage'] == 'cleared', 'a course for the loop is written and checked')
    for n in [1, 2]:
        on('recheck', course_file, '--max-dollars', '5')
        check(R.load(pid)['recheck']['why'] == [P], 'round ' + str(n) + ': recheck keeps the fix for a problem alone')
        code, out = on('autoreject', course_file)
        check(R.load(pid)['stage'] == 'write' and R.load(pid)['rewrites'] == n, 'autoreject sends it for rewrite ' + str(n))
        seen = len([r for b in api.batches.values() for r in b['requests']])
        code, out = on('run', course_file, '--max-dollars', '5')
        new = [r for b in api.batches.values() for r in b['requests']][seen:]
        ask = [r for r in new if stage_of(r['params']) == 'write']
        check(R.load(pid)['stage'] == 'review' and len(ask) == 1 and 'The owner\'s note: A fresh check found these problems' in ask[0]['params']['messages'][0]['content'], 'the next run writes it again, with the note, and checks it')
    on('recheck', course_file, '--max-dollars', '5')
    code, out = on('autoreject', course_file)
    rec = R.load(pid)
    check(code == 0 and rec['stage'] == 'review' and rec['rewrites'] == 2 and 'Rejected and send for a rewrite: 0.' in out and 'rewritten 2 times already: 1' in out, 'after two rewrites the point goes to the owner instead')
    code, out = on('status', course_file)
    check('Rejected automatically and sent for a rewrite: 2. Waiting to be rewritten: 0. Left for you after 2 rewrites: 1.' in out, 'status shows the counts')
    check(rec['id'] in [i['id'] for i in pipeline.review_items(work_r, repo_r)['items']], 'and the point is on the review page')
    written = rec['draft']
    code, out = on('autoreject', course_file, '--undo', '--point', pid)
    rec = R.load(pid)
    check(code == 0 and rec['stage'] == 'review' and rec['autoreject'][-1]['replaced']['draft'] == written and rec['rewrites'] == 2, 'undo after a rewrite brings back the rejected version, and keeps the rewrite in the file')

REBAL = """id: tst-rebal
subject: Testing
bank: tsr
name: Testing Rebalance, Year 9
about: NSW, Rebalance topic
years: [9]
place: nsw
kind: standard
note: A made course for the rebalance tests.
units:
  - title: Rebalance unit
    chapters:
      - title: Long answers chapter
        points:
""" + ''.join('          - title: Plain ' + w + '\n            brief: Its right options are the longest.\n'
              for w in ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliet', 'balanced',
                        'Short', 'Banned', 'Twin', 'Stubborn', 'Glitch', 'Picky']) + """      - title: Waiting chapter
        points:
          - title: Plain Flag
            brief: The checker flags it, so it waits for the owner.
"""

def rebalance_tests(tmp, printed, api):
    """rebalance, on a course run here: the questions it picks, the estimate with its checks, --max-dollars and
    --max-new-dollars, the new wrong options and their check, what it keeps, nothing sent twice, and check_content's
    warning before and after."""
    repo, work = os.path.join(tmp, 'repo-rebal'), os.path.join(tmp, 'work-rebal')
    copy_repo(repo)
    outline = os.path.join(tmp, 'tst-rebal.yaml')
    with open(outline, 'w', encoding='utf-8') as f: f.write(REBAL)
    def go(*argv):
        code, out = run(['--repo', repo, '--work', work] + list(argv)); printed.append(out); return code, out
    code, out = go('run', outline, '--max-dollars', '5')
    W = pipeline.Work(work, 'tst-rebal')
    pid = lambda w: 'tsr-plain-' + w.lower()
    words = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliet', 'balanced', 'Short', 'Banned', 'Twin', 'Stubborn', 'Glitch', 'Picky']
    check(code == 0 and W.load(pid('Flag'))['stage'] == 'review' and all(W.load(pid(w))['stage'] == 'cleared' for w in words), 'a course for rebalance is written and checked')
    # balanced has no question to rebalance, alpha only its check question, and india is about a sensitive topic you approved.
    r = W.load(pid('balanced'))
    for k in ['a', 'b']: r['final'][k]['opts'] = ['Right: plain balanced', 'Wrong: plain balancer', 'Wrong: plain unbalance', 'Wrong: not so balanced']
    W.put(r)
    r = W.load(pid('alpha')); r['final']['b']['opts'] = ['Right: plain alpha', 'Wrong: plain omega', 'Wrong: plain gamma', 'Wrong: plain sigma']; W.put(r)
    r = W.load(pid('india')); r['sensitive'] = 'drugs'; W.put(r)
    before = {pid(w): W.load(pid(w))['final'] for w in words}
    picked = sum(len(pipeline.rebalance_qs(before[pid(w)])) for w in words)
    code, out = go('publish', outline)
    cc = subprocess.run(['node', 'check_content.mjs'], cwd=repo, capture_output=True, text=True, encoding='utf-8')
    warn = re.search(r'Testing, Year 9 \(tst-rebal\): the correct option is the longest in (\d+) of 34 questions, well above chance \(about 9\)\. (\d+) are clearly the longest\.', cc.stdout)
    check(code == 0 and cc.returncode == 0 and warn and 'py content/pipeline.py rebalance content/outlines/tst-rebal.yaml --dry-run' in cc.stdout and 'no problems found' in cc.stdout,
          'check_content warns when a course\'s right option is the longest well above chance, and does not fail')
    check(warn and int(warn.group(2)) == picked == 31, 'and counts the questions clearly the longest the same way rebalance does')
    files = lambda: {os.path.join(r_, f): open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(work) for f in fs}

    code, out = go('rebalance', outline)
    check(code == 1 and '--max-new-dollars' in out and '--max-dollars' in out, 'rebalance needs --max-new-dollars or --max-dollars')
    code, out = go('rebalance', outline, '--max-dollars', '5', '--max-new-dollars', '1')
    check(code == 2, 'and refuses both at once')
    del os.environ['ANTHROPIC_API_KEY']
    first, saved = api.created, files()
    code, out = go('rebalance', outline, '--dry-run')
    check(code == 0 and 'rough' in out and files() == saved and api.created == first, 'its dry run works without a key, and sends and changes nothing')
    os.environ['ANTHROPIC_API_KEY'] = KEY
    code, out = go('rebalance', outline, '--dry-run')
    check(code == 0 and 'Questions where the right option is clearly the longest: 29, in 15 points.' in out and '    tsr-plain-alpha (question a)\n' in out and
          '    tsr-plain-bravo (question a and b)' in out and 'tsr-plain-balanced' not in out and 'tsr-plain-india' not in out and files() == saved and api.created == first,
          'the dry run lists each question whose right option is clearly the longest, and sends and changes nothing')
    check(re.search(r'Rewrites: US\$\d+\.\d\d to US\$\d+\.\d\d, Claude Sonnet 5.5, medium effort', out) and
          re.search(r'Checks: US\$\d+\.\d\d to US\$\d+\.\d\d, Claude Opus 5.5, high effort', out) and 'Spent on this course so far: US$' in out and
          'not cleared yet, so it is decided on the review page first: 1' in out and 'a sensitive topic: 1' in out,
          'with the estimate for the rewrites on Sonnet and their checks on Opus, the money spent so far, and the points waiting for you or sensitive left out')
    spent = W.state['spent']['usd']
    hint = re.search(r'pass --max-new-dollars (\d+\.\d\d), which is the same as --max-dollars (\d+\.\d\d)\.', out)
    check(hint and abs(float(hint.group(2)) - spent - float(hint.group(1))) < 0.011, 'and the number to pass for either limit, --max-dollars counting what is spent already')
    W.state['batches'].append({'id': 'msgbatch_open', 'items': {'x': {'pid': pid('alpha'), 'stage': 'check'}}}); W.save()
    code, out = go('rebalance', outline, '--max-new-dollars', '5')
    check(code == 0 and 'A run\'s batch is still open' in out and api.created == first, 'a course with a run\'s batch open is left alone')
    W.state['batches'].pop(); W.save()
    code, out = go('rebalance', outline, '--max-new-dollars', '0.0001')
    check(code == 1 and 'Not sent' in out and api.created == first, 'a new spend limit too low sends nothing')
    code, out = go('rebalance', outline, '--max-dollars', format(spent + 0.0001, '.4f'))
    check(code == 1 and 'Not sent' in out and api.created == first, 'and so does --max-dollars with almost nothing over what is spent already')

    code, out = go('rebalance', outline, '--max-new-dollars', '3')
    W = pipeline.Work(work, 'tst-rebal')
    sent = [q for b in list(api.batches.values())[-3:] for q in b['requests']]
    reqs, checks = [q for q in sent if q['custom_id'].startswith('b_')], [q for q in sent if q['custom_id'].startswith('k_')]
    check(code == 0 and api.created == first + 3 and len(reqs) == 16 and len(checks) == 11,
          'rebalance sends a rewrite a point in a batch, then a check of each rewrite that passed the content check, and sends an errored one again')
    check(0 < W.state['spent']['usd'] - spent <= 3, 'and spends no more than --max-new-dollars on top of what was spent')
    check(all(q['params']['model'] == pipeline.SONNET and q['params']['output_config']['effort'] == 'medium' for q in reqs), 'the rewrites on Sonnet at medium effort')
    check(all(q['params']['model'] == pipeline.OPUS and q['params']['output_config']['effort'] == 'high' and q['params']['system'][0]['text'].startswith('You check') for q in checks),
          'the checks on the course\'s checker, Opus at high effort')
    bravo_check = next(q for q in checks if 'Title: Plain bravo' in q['params']['messages'][0]['content'])['params']['messages'][0]['content']
    check('Wrong idea a0' in bravo_check and 'Wrong one' not in bravo_check and 'rewr' not in bravo_check.lower(),
          'the checker sees the point with its new options, as a new point: never the old options or that anything was rewritten')
    alpha_req = next(q for q in reqs if 'Title: Plain alpha' in q['params']['messages'][0]['content'])['params']
    check(list(alpha_req['output_config']['format']['schema']['properties']) == ['a'] and 'Question b' not in alpha_req['messages'][0]['content'] and
          'Right option, 18 characters (keep it as it is): Right: plain alpha' in alpha_req['messages'][0]['content'], 'a rewrite asks only for the questions that need it, with the right option\'s length')
    a, b = W.load(pid('alpha')), W.load(pid('bravo'))
    same = lambda old, new, k: old[k]['q'] == new[k]['q'] and old[k]['opts'][0] == new[k]['opts'][0] and old[k]['why'] == new[k]['why'] and old[k]['clue'] == new[k]['clue']
    check(a['stage'] == 'cleared' and a['final']['a']['opts'][1:] != before[pid('alpha')]['a']['opts'][1:] and a['final']['b'] == before[pid('alpha')]['b'] and
          same(before[pid('alpha')], a['final'], 'a') and not pipeline.clearly_longest(a['final']['a']['opts']), 'a question gets new wrong options, and the question, right option, why and clue stay')
    check(all(same(before[pid('bravo')], b['final'], k) and not pipeline.clearly_longest(b['final'][k]['opts']) for k in 'ab') and b['rebalance']['result'] == 'changed' and
          b['rebalance']['old'] == {k: before[pid('bravo')][k]['opts'] for k in 'ab'} and b['rebalance']['check']['problems'] == [] and
          b['usd']['rebalance'] > 0 and b['usd']['rebalance-check'] > 0, 'both questions of a point, with the old options, the check and the cost of each step kept')
    kept = {w: W.load(pid(w)) for w in ['Short', 'Banned', 'Twin', 'Stubborn', 'Picky']}
    check(all(r['final'] == before[r['id']] and r['rebalance']['result'] == 'kept' for r in kept.values()), 'a rewrite that is not used leaves the point as it was')
    check('still clearly the longest' in kept['Short']['rebalance']['why'][0] and 'content check' in kept['Banned']['rebalance']['why'][0] and
          'two options were the same' in kept['Twin']['rebalance']['why'][0] and 'declined' in kept['Stubborn']['rebalance']['why'][0],
          'with the reason: still the longest, the content check, two the same, or declined')
    pk = kept['Picky']['rebalance']
    check(pk['why'] == ['the check found a problem'] and pk['check']['problems'] and pk['tried']['a']['opts'][1].startswith('Wrong idea'),
          'a rewrite the check finds a problem in keeps the old options, with the reason, the check and the rewrite it turned down')
    check(W.load(pid('Glitch'))['rebalance']['result'] == 'changed' and W.load(pid('balanced'))['final'] == before[pid('balanced')] and
          not W.load(pid('balanced')).get('rebalance') and not W.load(pid('india')).get('rebalance') and W.load(pid('india'))['final'] == before[pid('india')] and
          not W.load(pid('Flag')).get('rebalance'), 'an errored request is sent again, and the others are never sent')
    check('Rebalanced: 19 questions in 10 points. Kept their old options: 5.' in out and 'the check found a problem: 1' in out and 'Next: publish each course again' in out,
          'the summary says what changed, what was kept and why, and what to do next')
    first = api.created
    code, out = go('rebalance', outline, '--max-new-dollars', '3')
    check(code == 0 and 'clearly the longest: 0, in 0 points.' in out and 'rebalanced already: 5' in out and 'Nothing to rebalance.' in out and api.created == first,
          'running it again rebalances nothing twice')
    code, out = go('publish', outline)
    cc = subprocess.run(['node', 'check_content.mjs'], cwd=repo, capture_output=True, text=True, encoding='utf-8')
    check(code == 0 and cc.returncode == 0 and 'tst-rebal' not in cc.stdout.split('WARNINGS')[-1] and 'Testing, Year 9: 17 points, 34 questions' in cc.stdout,
          'published again, the course no longer gets the warning')


def states_tests(tmp, repo, printed, api):
    """Reuse, adapt and new, in two Victorian courses with units for years, in their own copy of the repository with the
    test course published. Returns the made files publish wrote, for tests/units/."""
    repo_s, work = os.path.join(tmp, 'repo-states'), os.path.join(tmp, 'work-states')
    shutil.copytree(repo, repo_s)
    def go(*argv):
        code, out = run(['--repo', repo_s, '--work', work] + list(argv)); printed.append(out); return code, out
    u12, u34 = os.path.join(tmp, 'tsv-units-12.yaml'), os.path.join(tmp, 'tsv-units-34.yaml')
    for path, text in [(u12, UNITS12), (u34, UNITS34)]:
        with open(path, 'w', encoding='utf-8') as f: f.write(text)
    W = pipeline.Work(work, 'tsv-units-12')
    R = W.load
    d = pipeline.dump(repo_s)
    bank = lambda i: pipeline.bank_point(d, i)

    # ---------- the shortlist and the split, before anything is sent ----------
    code, out = go('estimate', u12)
    sl = {p_: (R(p_).get('shortlist') or []) for p_ in ['tsv-reuse-plain-one', 'tsv-adapt-dash-one', 'tsv-rough-flag-one', 'tsv-maybe-price-elasticity',
                                                         'tsv-doubtful-nature', 'tsv-fresh-scarcity', 'tsv-lonely-tide-pools', 'tsv-mirage-supply-curve']}
    top = {k: v[0][0] if v else None for k, v in sl.items()}
    check(top == {'tsv-reuse-plain-one': 'tst-plain-one', 'tsv-adapt-dash-one': 'tst-dash-one', 'tsv-rough-flag-one': 'tst-flag-one',
                  'tsv-maybe-price-elasticity': 'e-ped', 'tsv-doubtful-nature': 'e-nature', 'tsv-fresh-scarcity': 'e-scarcity', 'tsv-lonely-tide-pools': None,
                  'tsv-mirage-supply-curve': 'e-supply'},
          'with no API call, the shortlist finds the likely bank point in another course\'s bank and in the Economics bank, best first: ' + json.dumps(top))
    check(all(len(v) <= pipeline.MATCH_MOST and all(x[1] >= pipeline.MATCH_MIN for x in v) for v in sl.values()) and R('tsv-lonely-tide-pools')['stage'] == 'write',
          'each shortlist has at most ' + str(pipeline.MATCH_MOST) + ' points above the lowest score, and a point like nothing in any bank goes straight to writing')
    check(code == 0 and 'Reuse 0, adapt 0, new 1. Still to match: 8, against ' in out and 'match: 8 requests, Claude Haiku 5.5, medium effort' in out and
          'match check: 8 requests, Claude Opus 5.5, medium effort' in out,
          'the estimate shows the split and the match steps before anything is sent, with an Opus match check for each point at both ends, since every reuse has one')
    lo, hi = (float(x) for x in re.search(r'With batches \(the default\): US\$(\d+\.\d\d) to US\$(\d+\.\d\d)', out).groups())
    check(hi > lo, 'and its low end counts the points being matched as reused, with only the match check, its high end as new: US$' + format(lo, '.2f') + ' to US$' + format(hi, '.2f'))
    code, out = go('status', u12.replace('12.yaml', 'x.yaml'))
    bad_level = UNITS12.replace('level: Units 1 and 2', 'level: units 1 and 2')
    with open(os.path.join(tmp, 'bad-level.yaml'), 'w', encoding='utf-8') as f: f.write(bad_level)
    code, out = go('status', os.path.join(tmp, 'bad-level.yaml'))
    check(code == 1 and 'level must be a short heading in sentence case' in out, 'a level line must be a heading in sentence case')

    # ---------- the run ----------
    first = api.created
    code, out = go('run', u12, '--max-dollars', '5')
    reqs = [r for bid, b in api.batches.items() if int(bid.split('_')[1]) > first for r in b['requests']]
    of = lambda st: [r for r in reqs if stage_of(r['params']) == st]
    user = lambda r: r['params']['messages'][0]['content']
    check(code == 0 and out.index('Still to match: 8') < out.index('Sent ') and 'Reuse 2, adapt 2, new 4. Possible matches for you to review: 1.' in out,
          'run shows the split before sending, and again once matching has decided')
    check(len(of('match')) == 8 and all(r['params']['model'] == pipeline.HAIKU and r['params']['output_config']['effort'] == 'medium' for r in of('match')) and
          all(user(r).count('\nId: ') <= pipeline.MATCH_MOST for r in of('match')) and not any('Lonely' in user(r) for r in of('match')),
          'Haiku judges each point with a shortlist, against only those bank points, and never the point with none')
    check(any('Id: tst-plain-one\nUsed in: Testing, Year 9 (New South Wales)' in user(r) for r in of('match')) and
          all('for students in Victoria, Australia' in user(r) for r in of('match')), 'each bank point comes with the courses it is used in, and the new course with its state')
    conf = of('confirm')
    check(sorted(re.search(r'^Point: (.*)$', user(r), re.M).group(1) for r in conf) ==
          ['Doubtful nature', 'Maybe price elasticity', 'Mirage supply curve', 'Reuse plain one', 'Twice plain one'] and
          all(r['params']['model'] == pipeline.OPUS for r in conf) and not any('Haiku' in user(r) or 'guessed' in user(r) for r in conf),
          'Opus checks every reuse Haiku names, however sure, and an adapt Haiku is not highly sure of, and is never told Haiku\'s answer')
    check(not any('Adapt dash one' in user(r) or 'Rough flag one' in user(r) or 'Fresh scarcity' in user(r) for r in conf),
          'an adapt Haiku is highly sure of, and a point it says is new, never go to Opus')
    reuse = R('tsv-reuse-plain-one')
    check(reuse['stage'] == 'reuse' and reuse['reuse'] == 'tst-plain-one' and reuse['confirm']['verdict'] == 'reuse' and set(reuse['usd']) == {'match', 'confirm'} and
          not any(t == 'Reuse plain one' and st not in ('match', 'confirm') for t, st in api.seen),
          'reuse: once Opus confirms it, the bank point goes in as it is, with no writing, checking or review')
    mirage = R('tsv-mirage-supply-curve')
    check(mirage['match']['verdict'] == 'reuse' and mirage['match']['sure'] == 'high' and mirage['confirm']['verdict'] == 'new' and
          mirage['stage'] == 'cleared' and 'write' in mirage['usd'] and not mirage.get('reuse'),
          'a reuse Haiku is highly sure of but Opus turns down is written new')
    maybe = R('tsv-maybe-price-elasticity')
    check(maybe['stage'] == 'reuse' and maybe['reuse'] == 'e-ped' and maybe['match']['verdict'] == 'adapt' and maybe['confirm']['verdict'] == 'reuse' and
          set(maybe['usd']) == {'match', 'confirm'}, 'a reuse Opus is highly sure of is taken, whatever Haiku said')
    twice = R('tsv-twice-plain-one')
    check(twice['stage'] == 'cleared' and any('is in this course already' in l for l in twice['log']) and twice.get('final'),
          'a point matched to a bank point another point in the course reuses is written new')
    ad, src = R('tsv-adapt-dash-one'), bank('tst-dash-one')
    adapt_reqs = [r for r in of('adapt') if 'Point: Adapt dash one' in user(r)]
    fin = ad.get('final') or {}
    check(ad['stage'] == 'cleared' and ad['adapt']['from'] == 'tst-dash-one' and ad['adapt']['changes'] == ['Use the term this state uses.'] and
          adapt_reqs and adapt_reqs[0]['params']['model'] == pipeline.SONNET and adapt_reqs[0]['params']['output_config']['effort'] == 'low' and
          list(adapt_reqs[0]['params']['output_config']['format']['schema']['properties']) == ['changes'],
          'adapt: the point is adapted from the bank point by the cheaper writer, which answers with only the changes')
    check(fin.get('title') == 'Adapted Dash one' and fin['card'][0] == src['card'][0] and fin['card'][2] == src['card'][2] and fin['card'][1] != src['card'][1] and
          fin['a']['q'] != src['a']['q'] and fin['a']['opts'] == src['a']['opts'] and fin['remember'] == src['remember'],
          'every part it did not change stays word for word, and both questions are worded afresh')
    check(ad.get('check') and ad['cleared_by'] == 'checker' and set(ad['usd']) == {'match', 'adapt', 'check'},
          'the adapted point is checked by Opus like any other, and costs a match, an adapt and a check, never a writing')
    rough = R('tsv-rough-flag-one')
    check(any('adapt: failed the content check' in l for l in rough['log']) and api.seen[('Rough flag one', 'adapt')] == 2,
          'an adapt that keeps a question word for word fails the content check, and is adapted again')
    check(rough['stage'] == 'review' and rough.get('proposal') and rough['flags'], 'an adapted point the checker flags gets a fix and waits for review, like any other')
    fresh_ = R('tsv-fresh-scarcity')
    check(fresh_['match']['verdict'] == 'new' and not fresh_.get('confirm') and fresh_['stage'] == 'cleared' and 'write' in fresh_['usd'],
          'new: a point Haiku says no bank point is the same as is written from scratch, with no Opus match check')
    lonely = R('tsv-lonely-tide-pools')
    check(not lonely.get('match') and 'match' not in lonely['usd'] and lonely['stage'] == 'cleared', 'and so is a point with no shortlist, with no match request at all')

    # ---------- a possible match for the owner, and adapt from the review page ----------
    items = [i for i in pipeline.review_items(work, repo_s)['items'] if i['course'] == 'tsv-units-12']
    doubt = next(i for i in items if i['id'] == 'tsv-doubtful-nature')
    check(doubt['stage'] == 'match-review' and doubt['match']['same'] == 'e-nature' and doubt['match']['verdict'] == 'adapt' and
          doubt['match']['changes'] == ['A change Haiku guessed.'] and doubt['match']['by'] == 'Claude Opus 5.5' and 'Economics, AS (international)' in doubt['match']['usedIn'],
          'an adapt neither model is highly sure of waits for the owner, with the Opus answer, its changes and where the bank point is used')
    r = pipeline.decide(work, repo_s, {'course': 'tsv-units-12', 'id': 'tsv-doubtful-nature', 'action': 'adapt'})
    check(r['ok'] and R('tsv-doubtful-nature')['stage'] == 'adapt' and R('tsv-doubtful-nature')['adapt']['by'] == 'owner', 'Adapt it on the review page sends it to be adapted')
    page = open(os.path.join(HERE, 'review', 'index.html'), encoding='utf-8').read()
    check('data-act="adapt">Adapt it</button>' in page, 'and the review page has the button')
    code, out = run(['--repo', repo_s, '--work', work, 'autoreview', u12, '--dry-run']); printed.append(out)
    check('tsv-rough-flag-one' not in out.split('Left for you')[0] and 'a possible factual error: 1' in out, 'autoreview looks at an adapted point like any other')
    code, out = run(['--repo', repo_s, '--work', work, 'recheck', u12, '--dry-run']); printed.append(out)
    check('Fixes to recheck: 1.\n    tsv-rough-flag-one' in out, 'and so does recheck')
    code, out = go('run', u12, '--max-dollars', '5')
    doubt = R('tsv-doubtful-nature')
    check(code == 0 and doubt['stage'] == 'cleared' and doubt['final']['title'] == 'Adapted The nature of economics' and 'Reuse 2, adapt 3, new 4.' in out,
          'the next run adapts it, checks it and clears it')
    r = pipeline.decide(work, repo_s, {'course': 'tsv-units-12', 'id': 'tsv-rough-flag-one', 'action': 'fix'})

    # ---------- the content check on a reuse ----------
    # A bank point that fails the content check for this course (here, landscape outside Geography) is adapted instead.
    wx = pipeline.Work(work, 'tsx'); os.makedirs(os.path.join(wx.dir, 'points'), exist_ok=True)
    geo = pipeline.to_bank(fake_point('Glaciers')); geo['card'][2] = 'Glaciers carved the landscape of the valley.'
    dx = {'banks': {'geo': {'geo-glaciers': geo}}, 'used': {}}
    pt = {'id': 'tsx-ice', 'title': 'Ice', 'brief': 'Ice', 'reuse': None, 'unit': 0, 'chapter': 0}
    cx = {'subject': 'Testing', 'kind': 'standard', 'points': [pt]}
    wx.put({'id': 'tsx-ice', 'stage': 'match', 'log': []})
    pipeline.reuse_finish(wx, {'tsx-ice': ('geo-glaciers', 'Claude Haiku 5.5')}, cx, dx, repo_s)
    x = wx.load('tsx-ice')
    check(x['stage'] == 'adapt' and any('banned word' in c for c in x['adapt']['changes']), 'a reuse that fails the content check for its new course is adapted, with the problem as its change')
    # A reuse is never checked again, so a sensitive one, or one for an English course, goes to the owner.
    drink = pipeline.to_bank(fake_point('Drinking')); drink['card'][2] = 'Alcohol slows reaction times.'
    dx['banks']['hms'] = {'hms-drinking': drink, 'hms-plain': pipeline.to_bank(fake_point('Plain hms'))}
    for pid in ['tsx-ice', 'tsx-two']: wx.put({'id': pid, 'stage': 'match', 'log': []})
    cx['points'] = [pt, dict(pt, id='tsx-two')]
    pipeline.reuse_finish(wx, {'tsx-ice': ('hms-drinking', 'Claude Haiku 5.5')}, cx, dx, repo_s)
    pipeline.reuse_finish(wx, {'tsx-two': ('hms-plain', 'Claude Haiku 5.5')}, dict(cx, kind='english'), dx, repo_s)
    check(wx.load('tsx-ice')['stage'] == 'match-review' and wx.load('tsx-two')['stage'] == 'match-review',
          'a reuse about a sensitive topic, or for an English course, comes to the owner instead of going in by itself')

    # ---------- publish: the level, the reused points and a new state ----------
    code, out = go('publish', u12)
    code2, out2 = go('run', u34, '--max-dollars', '5')
    code3, out3 = go('publish', u34)
    C = json.loads(subprocess.run(['node', 'content/dump.mjs'], cwd=repo_s, capture_output=True, text=True).stdout)
    k12 = next(c for c in C['courses'] if c['id'] == 'tsv-units-12')
    k34 = next(c for c in C['courses'] if c['id'] == 'tsv-units-34')
    check(code == 0 and code2 == 0 and code3 == 0 and 'Held back' not in out + out3 and 'vic' in C['places'], 'both courses publish, for Victoria')
    check(k12['level'] == 'Units 1 and 2' and k12['year'] == 'Units 1 and 2' and k12['years'] == [11] and k34['level'] == 'Units 3 and 4' and k34['year'] == 'Units 3 and 4',
          'each course carries its level, as its heading too')
    ch1, ch2 = k12['units'][0]['chapters']
    check(ch1['points'] == ['tst-plain-one', 'tsv-twice-plain-one', 'tsv-adapt-dash-one', 'tsv-rough-flag-one'] and
          ch2['points'] == ['e-ped', 'tsv-doubtful-nature', 'tsv-fresh-scarcity', 'tsv-lonely-tide-pools', 'tsv-mirage-supply-curve'],
          'a chapter lists a reused point by its bank id, and an adapted point by its own')
    check('tst-plain-one' not in C['banks']['tsv'] and C['banks']['tsv']['tsv-adapt-dash-one']['title'] == 'Adapted Dash one' and
          [u['course'] for u in C['used']['tst-plain-one']] == ['tst-course', 'tsv-units-12'], 'the reused point stays in its own bank, now used by both courses')
    st = subprocess.run(['node', 'check_content.mjs'], cwd=repo_s, capture_output=True, text=True)
    check(st.returncode == 0, 'check_content.mjs passes with the courses from both states')
    return {os.path.join(dd, f): open(os.path.join(repo_s, 'src', dd, f), encoding='utf-8').read()
            for dd, f in [('bank', 'tst.js'), ('bank', 'tsv.js'), ('courses', 'tsv-units-12.js'), ('courses', 'tsv-units-34.js')]}

CLAUDE_CODE = """id: tst-cc
subject: Testing
bank: tcc
name: Testing Claude Code, Year 9
about: NSW, Handover topic
years: [9]
place: nsw
kind: standard
note: A made course for the tests of the Claude Code steps.
units:
  - title: Handover unit
    chapters:
      - title: Rewrites chapter
        points:
          - title: Flag cc one
            brief: The checker flags it, and the owner rejects it.
          - title: Flag cc two
            brief: The checker flags it, and the owner rejects it too.
          - title: Flag cc three
            brief: The checker flags it, and the owner rejects it once more.
          - title: Plain cc four
            brief: The checker passes it.
"""

def claude_code_tests(tmp, printed, api):
    """The Claude Code steps on a course run here: rewrites exported with the writer's prompt and imported through the
    content check, the check of each by a separate subagent with only the checker's prompt, recorded as an Opus check,
    and the rest of the flow carrying on. No API call and no key."""
    repo_c, work_c = os.path.join(tmp, 'repo-cc'), os.path.join(tmp, 'work-cc')
    copy_repo(repo_c)
    outline = os.path.join(tmp, 'tst-cc.yaml')
    with open(outline, 'w', encoding='utf-8') as f: f.write(CLAUDE_CODE)
    def go(*argv):
        code, out = run(['--repo', repo_c, '--work', work_c] + list(argv)); printed.append(out); return code, out
    go('run', outline, '--max-dollars', '5')
    W = pipeline.Work(work_c, 'tst-cc')
    ids = ['tcc-flag-cc-one', 'tcc-flag-cc-two', 'tcc-flag-cc-three']
    check(all(W.load(i)['stage'] == 'review' for i in ids) and W.load('tcc-plain-cc-four')['stage'] == 'cleared', 'a course for the Claude Code steps is written and checked')
    for n, i in enumerate(ids):
        pipeline.decide(work_c, repo_c, {'course': 'tst-cc', 'id': i, 'action': 'reject', 'note': 'NOTE' + str(n) + ': say it more plainly.'})
    folder = os.path.join(work_c, pipeline.CC_DIR, 'write')
    files = lambda: {os.path.join(r_, f): open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(work_c) for f in fs}
    answer = lambda pid, data, step='write': pipeline.write_json(os.path.join(work_c, pipeline.CC_DIR, step, 'tst-cc', pid + '.json'), data)
    task = lambda pid, step='write': open(os.path.join(work_c, pipeline.CC_DIR, step, 'tst-cc', pid + '.md'), encoding='utf-8').read()
    calls = lambda: (api.created, len(api.streamed), api.billed)
    def mine(title, n, dash=False):
        # A version of the session's own: none of the rejected version's words.
        p = fake_point(title); p['remember'] = 'A new line for point ' + n + ('— always' if dash else '.'); return p
    del os.environ['ANTHROPIC_API_KEY']
    first = calls()

    code, out = go('cc-write', 'import')
    check(code == 0 and 'Nothing to import' in out, 'import before an export says there is nothing to import')
    code, out = go('cc-write')
    check(code == 1 and 'Say export or import' in out, 'a Claude Code step needs export or import')
    code, out = go('cc-write', 'export', '--dry-run')
    check(code == 1 and '--dry-run works with import' in out, 'and --dry-run goes with import')

    # ---------- write ----------
    code, out = go('cc-write', 'export')
    check(code == 0 and 'Exported 3 tasks for Claude Code (rewrites)' in out and calls() == first, 'cc-write exports the 3 rejected points, with no key and no API call')
    job = pipeline.setup(NS(repo=repo_c, work=work_c, outline=outline))
    reqs, items = pipeline.next_requests(job.work, job.course, job.d, job.cfg)
    sent = {items[r['custom_id']]['pid']: r['params'] for r in reqs if items[r['custom_id']]['stage'] == 'write'}
    writer = open(os.path.join(folder, 'tst-cc', '_writer.md'), encoding='utf-8').read()
    check(sorted(sent) == sorted(ids) and all(writer.strip() == p['system'][0]['text'].strip() and p['messages'][0]['content'] in task(i) for i, p in sent.items()),
          'each task has exactly what the API writer would get: the writer\'s rules and examples, and the request')
    check(all('NOTE' + str(n) in task(i) and 'The owner rejected this earlier version' in task(i) and 'Hold on to flag cc' in task(i) for n, i in enumerate(ids)),
          'which shows the rejected version and the owner\'s note')
    check(all(os.path.join(work_c, pipeline.CC_DIR, 'write', 'tst-cc', i + '.json').replace(os.sep, '/') in task(i).replace(os.sep, '/') for i in ids), 'and names the answer file')
    good = fake_point('Clean cc one'); good['remember'] = 'A new remember line for the first point.'
    answer(ids[0], good)
    answer(ids[1], mine('Flag cc two', 'two', dash=True))
    bad = mine('Flag cc three', 'three'); del bad['remember']
    answer(ids[2], bad)
    code, out = go('cc-write', 'export')
    check(code == 1 and 'waiting to be imported' in out, 'export again refuses while answers wait to be imported, so none is lost')
    before = files()
    code, out = go('cc-write', 'import', '--dry-run')
    check(code == 0 and 'Dry run' in out and 'would import 2 rewrites' in out and files() == before, 'the import\'s dry run changes nothing')
    code, out = go('cc-write', 'import')
    a, b, c = (W.load(i) for i in ids)
    check(code == 0 and a['stage'] == 'cc-check' and a['written_by'] == 'claude-code' and a['draft'] == pipeline.to_bank(good) and
          a['claude_code'][-1]['version'] == a['draft'] and any('claude-code write: done, waiting for the Claude Code check' in l for l in a['log']),
          'a rewrite that passes the content check is recorded as written by claude-code, and waits for the Claude Code check')
    check(b['stage'] == 'write' and b['redo'] and b['written_by'] == 'claude-code' and 'Failed the content check, to be written once more: ' + ids[1] in out,
          'one that fails the content check is to be written once more, as the API writer\'s is')
    check(c['stage'] == 'write' and 'is missing remember' in out and os.path.exists(os.path.join(folder, 'tst-cc', ids[2] + '.json')) and
          not os.path.exists(os.path.join(folder, 'tst-cc', ids[0] + '.json')), 'an answer not in the point\'s shape stays in the folder with what is wrong, and the others are taken out')
    reqs, items = pipeline.next_requests(W, job.course, job.d, job.cfg)
    code, out = go('status', outline)
    check(ids[0] not in [it.get('pid') for it in items.values()] and 'waiting for the Claude Code check' in out and 'Claude Code wrote 2 versions' in out,
          'run never sends a point Claude Code wrote to the API checker, and status says where it is')
    answer(ids[2], mine('Flag cc three', 'three'))
    code, out = go('cc-write', 'import')
    check(W.load(ids[2])['stage'] == 'cc-check' and not os.path.exists(os.path.join(folder, 'tasks.json')), 'the fixed answer goes in, and the folder is emptied')
    code, out = go('cc-write', 'export')
    check('Exported 1 task' in out and 'Your last version failed the content check' in task(ids[1]) and 'A new line for point two— always' in task(ids[1]),
          'export again gives the point that failed the content check, with the problems')
    answer(ids[1], mine('Flag cc two', 'two', dash=True))
    go('cc-write', 'import')
    b = W.load(ids[1])
    check(b['stage'] == 'cc-check' and b['local'] and any('(still fails the content check)' in l for l in b['log']), 'a second failure goes on to the check, as the API writer\'s does')
    code, out = go('cc-write', 'export')
    check('Nothing to rewrite' in out and calls() == first, 'then there is nothing left to rewrite, and still no API call')

    # ---------- check ----------
    code, out = go('cc-check', 'export')
    check('Exported 3 tasks for Claude Code (checks)' in out, 'cc-check exports each point Claude Code wrote')
    checker = pipeline.prompt('checker.md')
    users = {i: pipeline.check_user(job.course, pipeline.point_of(job.course, i), W.load(i)) for i in ids}
    check(all(checker in task(i, 'check') and users[i] in task(i, 'check') for i in ids), 'each check task has exactly what the API checker gets, with the options in a random order')
    # The answer file's path names the folder, _claude-code, which says nothing about who wrote the point.
    told = lambda i: task(i, 'check').replace(os.path.join(work_c, pipeline.CC_DIR, 'check', 'tst-cc', i + '.json').replace(os.sep, '/'), '')
    check(not any(w in told(i) for i in ids for w in ['NOTE', 'Hold on to flag cc', 'rejected', 'rewrit', 'Claude Code', 'claude-code', 'failed the content check']),
          'and nothing more: not the note, the rejected version, the content check\'s problems, or that it was rewritten or by whom')
    def reply(i):
        return api.reply({'model': pipeline.OPUS, 'system': [{'text': checker}], 'messages': [{'content': users[i]}]})[1]
    wrong = reply(ids[0]); wrong['a']['best'] = 'Right: not one of them'
    answer(ids[0], wrong, 'check')
    for i in ids[1:]: answer(i, reply(i), 'check')
    code, out = go('cc-check', 'import')
    check(W.load(ids[0])['stage'] == 'cc-check' and 'is not one of its options' in out and 'fresh subagent' in out, 'a check whose pick is not one of the options is kept, to be checked again')
    answer(ids[0], reply(ids[0]), 'check')
    code, out = go('cc-check', 'import')
    a, b = W.load(ids[0]), W.load(ids[1])
    check(a['stage'] == 'cleared' and a['cleared_by'] == 'checker' and a['checked_by'] == 'claude-code' and a['final'] == a['draft'] and a['check'] == reply(ids[0]),
          'a check that passes clears the point, recorded as an Opus check is, marked checked by claude-code')
    check(b['stage'] == 'fix' and b['flags'] and b['claude_code'][-1]['check'] == b['check'] and any('claude-code check: answered by a separate subagent' in l for l in b['log']),
          'a flagged one goes to the fix, with its flags')
    seen = len([r for bb in api.batches.values() for r in bb['requests']])
    os.environ['ANTHROPIC_API_KEY'] = KEY
    code, out = go('run', outline, '--max-dollars', '5')
    new = [r for bb in api.batches.values() for r in bb['requests']][seen:]
    check(new and all(stage_of(r['params']) == 'fix' for r in new) and W.load(ids[1])['stage'] == 'review' and W.load(ids[1])['proposal'],
          'the next run sends only the fixes, and the flagged points reach the review list')
    check('Claude Code wrote 4 versions and checked 3 points.' in out and 'Sent to the Opus checker: 1 of 4 points checked' in out,
          'the summary counts what Claude Code wrote and checked, apart from the Opus checker')
    code, out = go('autoreview', outline, '--dry-run')
    check('Left for you in the review list after this: 2.' in out and 'a possible factual error: 2' in out, 'autoreview reads a Claude Code check as it reads an Opus one')
    code, out = go('recheck', outline, '--dry-run')
    check('Fixes to recheck: 2.' in out, 'and recheck sends the fixes of points Claude Code checked')
    items_ = {i['id']: i for i in pipeline.review_items(work_c, repo_c)['items']}
    check(items_[ids[1]]['writtenBy'] == 'claude-code' and items_[ids[1]]['checkedBy'] == 'claude-code', 'the review page says who wrote and checked it')
    r = W.load(ids[1]); pipeline.decide(work_c, repo_c, {'course': 'tst-cc', 'id': ids[1], 'action': 'reject', 'note': 'Again.'})
    check('written_by' not in W.load(ids[1]) and 'checked_by' not in W.load(ids[1]), 'a rejection clears who wrote and checked the last version')

CCR_COURSE = {'id': 'tst-ccr', 'subject': 'Testing', 'name': 'Testing Review, Year 9', 'about': 'NSW, Review topic', 'kind': 'standard', 'years': [9]}

def cc_review_tests(tmp, repo, printed, api):
    """The Claude Code reviewer, on a work folder of points waiting for the owner made here: which points it may decide
    and which stay, highly sure decisions only, cleared_by claude-code, the dry run, undo, and never twice."""
    work = os.path.join(tmp, 'work-ccr')
    def go(*argv):
        code, out = run(['--repo', repo, '--work', work, 'cc-review'] + list(argv)); printed.append(out); return code, out
    pts = []
    def point(name, stage='review', fix=True, brief=None, **extra):
        pid = 'tcr-' + name
        draft = pipeline.to_bank(fake_point('Review ' + name))
        c = {'a': {'best': draft['a']['opts'][0], 'also_right': []}, 'b': {'best': draft['b']['opts'][0], 'also_right': []}, 'sure': 'high', 'sensitive': 'none',
             'summary': 'Problems found.', 'problems': [{'part': 'card', 'kind': 'wording', 'detail': 'CHECKERSAID: say it more plainly.'}]}
        rec = {'id': pid, 'title': draft['title'], 'brief': 'x', 'stage': stage, 'log': []}
        if stage in ('review', 'failed'):
            rec.update(draft=draft, check=c, sensitive='none', local=[])
            rec['flags'], _ = pipeline.flags_for(rec)
            if fix:
                p = json.loads(json.dumps(draft)); p['remember'] = 'THEFIX: a clearer remember line.'
                rec.update(proposal=p, proposal_problems=[])
        else:
            rec.update(match={'verdict': 'adapt', 'same': 'e-scarcity', 'changes': ['A change Haiku named.'], 'sure': 'medium', 'reason': 'MATCHREASON', 'model': pipeline.HAIKU},
                       shortlist=[['e-scarcity', 0.5]])
        rec.update(extra)
        pts.append({'id': pid, 'title': draft['title'], 'brief': brief or 'The brief of ' + name + '.', 'codes': [], 'reuse': None, 'unit': 0, 'chapter': 0})
        return rec
    decide = {'tcr-spot': ('fix', 'high'), 'tcr-fix': ('fix', 'high'), 'tcr-unsure': ('approve', 'medium'), 'tcr-reject': ('reject', 'high'), 'tcr-leave': ('leave', 'high'),
              'tcr-reuse': ('reuse', 'high'), 'tcr-adapt': ('adapt', 'high'), 'tcr-new': ('new', 'high'), 'tcr-wrongkind': ('reuse', 'high'), 'tcr-nonote': ('reject', 'high'),
              'tcr-stale': ('fix', 'high')}
    recs = [point('spot', auto={'spot': True, 'by': 'autoreview', 'n': 1}), point('fix'), point('unsure'), point('reject'), point('leave'), point('wrongkind'), point('nonote'),
            point('stale'), point('reuse', 'match-review'), point('adapt', 'match-review'), point('new', 'match-review')]
    stay = {'tcr-nofix': (point('nofix', fix=False), 'no fix'), 'tcr-topic': (point('topic', sensitive='drugs'), 'a sensitive topic'),
            'tcr-word': (point('word', brief='How vaping harms the lungs.'), 'a word that may mean a sensitive topic'),
            'tcr-undone': (point('undone', auto_undone={'by': 'autoreview', 'undone': pipeline.now()}), 'you undid an automatic decision on it'),
            'tcr-failed': (point('failed', 'failed'), 'not written')}
    bad = point('badfix'); bad['proposal']['remember'] = 'A dash — in the fix'
    stay['tcr-badfix'] = (bad, 'the fix fails the content check')
    W = pipeline.Work(work, 'tst-ccr')
    for r in recs + [r for r, _ in stay.values()]: W.put(r)
    pipeline.write_json(os.path.join(W.dir, 'course.json'), dict(CCR_COURSE, units=[{'title': 'A unit', 'chapters': [{'id': 'tcr-1-1', 'title': 'A chapter', 'points': pts}]}]))
    E = pipeline.Work(work, 'tst-ccr-eng')
    eng = point('english'); pts_e = [pts.pop()]
    E.put(eng)
    pipeline.write_json(os.path.join(E.dir, 'course.json'), dict(CCR_COURSE, id='tst-ccr-eng', name='Testing English', kind='english',
                        units=[{'title': 'A unit', 'chapters': [{'id': 'tcr-e-1', 'title': 'A chapter', 'points': pts_e}]}]))
    T = pipeline.Work(work, 'tst-ccr-t')
    T.put(point('trial')); pts.pop()
    pipeline.write_json(os.path.join(T.dir, 'course.json'), dict(CCR_COURSE, id='tst-ccr-t', name='Trial', trial_of='tst-ccr',
                        units=[{'title': 'A unit', 'chapters': [{'id': 'tcr-t-1', 'title': 'A chapter', 'points': [{'id': 'tcr-trial', 'title': 'T', 'brief': 'x', 'unit': 0, 'chapter': 0}]}]}]))
    outline = os.path.join(tmp, 'tst-ccr.yaml')
    with open(outline, 'w', encoding='utf-8') as f: f.write('id: tst-ccr\nsubject: Testing\n')
    folder = os.path.join(work, pipeline.CC_DIR, 'review')
    files = lambda: {os.path.join(r_, f): open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(work) for f in fs}
    task = lambda pid: open(os.path.join(folder, 'tst-ccr', pid + '.md'), encoding='utf-8').read()
    def answer(pid, decision, sure='high', note='', changes=()):
        pipeline.write_json(os.path.join(folder, 'tst-ccr', pid + '.json'), {'decision': decision, 'sure': sure, 'reason': 'REASON for ' + pid + '.',
                            'note': note, 'changes': list(changes)})
    st = lambda pid: W.load(pid)['stage']
    calls = (api.created, len(api.streamed), api.billed)
    del os.environ['ANTHROPIC_API_KEY']

    code, out = go('export')
    exported = sorted(r['id'] for r in recs)
    listed = sorted(t['id'] for t in pipeline.read_json(os.path.join(folder, 'tasks.json'))['tasks'])
    check(code == 0 and listed == exported, 'cc-review exports spot checks, possible matches and flagged points with a fix')
    check(all('    ' + w + ': 1' in out.replace('  ' + w, '    ' + w) or w + ': 1' in out for _, w in stay.values()) and 'an English course, whose points always come to you: 1' in out and
          'tst-ccr-t' not in out and not os.path.exists(os.path.join(folder, 'tst-ccr-t')), 'and leaves the rest for you, with each reason, and trials out')
    check(W.load('tcr-badfix')['proposal_problems'], 'a fix that fails the content check has its problems saved, as autoreview does')
    rules = open(os.path.join(folder, '_reviewer.md'), encoding='utf-8').read()
    check(rules.strip() == pipeline.prompt('reviewer.md') and 'Always leave for the owner' in rules, 'the reviewer\'s rules are in the folder')
    check('CHECKERSAID' in task('tcr-fix') and 'THEFIX' in task('tcr-fix') and 'You may answer: fix, approve, reject, leave.' in task('tcr-fix') and
          'autoreview would have cleared this point with the fix' in task('tcr-spot'), 'a flagged point\'s task has the point, the checker\'s flags, the fix and its choices')
    check('MATCHREASON' in task('tcr-reuse') and 'The bank point e-scarcity' in task('tcr-reuse') and 'You may answer: reuse, adapt, new, leave.' in task('tcr-reuse'),
          'a possible match\'s task has the bank point, what the matcher said and its choices')
    for pid, (dec, sure) in decide.items():
        answer(pid, dec, sure, note='WRITERNOTE: fix the card.' if pid == 'tcr-reject' else '', changes=['Use this state\'s term.'] if dec == 'adapt' else ())
    r = W.load('tcr-stale'); r['proposal']['remember'] = 'Changed since the export.'; W.put(r)
    before = files()
    code, out = go('import', '--dry-run')
    check(code == 0 and 'Testing Review, Year 9 (tst-ccr): would decide 6 and would leave 2 for you.' in out and files() == before, 'the dry run says what it would decide, and changes nothing')
    code, out = go('import')
    check(code == 0 and 'decided 6 and left 2 for you' in out and (api.created, len(api.streamed), api.billed) == calls, 'import decides them, with no key and no API call')
    s = W.load('tcr-spot'); f = W.load('tcr-fix')
    check(all(x['stage'] == 'cleared' and x['cleared_by'] == 'claude-code' and x['final'] == x['proposal'] for x in [s, f]) and
          any('claude-code review: approved with the fix' in l for l in f['log']), 'a highly sure fix is used, marked cleared_by claude-code')
    ans = pipeline.read_json(pipeline.auto_path(W))['spot_answers']
    check(s['auto']['claude_code'] == 'fix' and ans == [dict(ans[0], id='tcr-spot', action='fix', by='claude-code')], 'a spot check it decides is recorded as Claude Code\'s answer')
    j = W.load('tcr-reject')
    check(j['stage'] == 'write' and j['cleared_by'] == 'claude-code' and j['note'] == 'WRITERNOTE: fix the card.' and j['rewrites'] == 1 and pipeline.cc_rewrite(j),
          'a rejection sends it to be written again with the note, ready for cc-write')
    u, v, n_ = W.load('tcr-reuse'), W.load('tcr-adapt'), W.load('tcr-new')
    check(u['stage'] == 'reuse' and u['reuse'] == 'e-scarcity' and u['matched']['by'] == 'claude-code' and v['stage'] == 'adapt' and
          v['adapt']['changes'] == ['Use this state\'s term.'] and n_['stage'] == 'write' and n_['match_rejected'], 'a possible match is reused, adapted with its changes, or written new')
    check(st('tcr-unsure') == 'review' and st('tcr-leave') == 'review' and W.load('tcr-unsure')['claude_code'][-1]['result'] == 'left', 'anything it is not highly sure of stays with you')
    item = {i['id']: i for i in pipeline.review_items(work, repo)['items']}['tcr-unsure']
    check(item['claudeCode'] == {'decision': 'approve', 'sure': 'medium', 'reason': 'REASON for tcr-unsure.', 'why': None}, 'and the review page says what it would have done')
    check(st('tcr-wrongkind') == 'review' and st('tcr-nonote') == 'review' and 'decision reuse is not one of fix, approve, reject, leave' in out and
          'a reject needs a note' in out, 'an answer it may not give is kept, with what is wrong')
    check('changed since the export: tcr-stale' in out and st('tcr-stale') == 'review', 'a point that changed since the export is dropped, not decided')
    check(all(W.load(i) == r for i, (r, _) in stay.items() if i != 'tcr-badfix') and E.load('tcr-english') == eng, 'the others are not touched')
    answer('tcr-wrongkind', 'leave'); answer('tcr-nonote', 'reject', note='Say what is wrong.')
    go('import')
    code, out = go('export')
    listed = [t['id'] for t in pipeline.read_json(os.path.join(folder, 'tasks.json'))['tasks']]
    check(listed == ['tcr-stale'] and 'Claude Code left it for you already: 3' in out, 'running it again decides nothing twice: only the changed point is new')
    shutil.rmtree(os.path.join(work, pipeline.CC_DIR))
    lines = pipeline.auto_lines(W, pipeline.meta_recs(W, pipeline.read_json(os.path.join(W.dir, 'course.json'))))
    check('Decided by Claude Code in review: 7 (used the fix 2, rejected, to be written again 2, reused the bank point 1, adapted the bank point 1, wrote a new point 1). Left for you after its look: 3.' in lines and
          'Spot checks Claude Code decided: 1 (used the fix 1).' in lines, 'the summary counts its decisions, apart from yours')
    pipeline.decide(work, repo, {'course': 'tst-ccr', 'id': 'tcr-leave', 'action': 'reject', 'note': 'x'})
    check(W.load('tcr-leave')['stage'] == 'write' and 'cleared_by' not in W.load('tcr-leave'), 'your own decision on a point it left is yours, as before')

    # Undo.
    before = files()
    code, out = go('--undo', '--dry-run')
    check(code == 0 and 'would go back' in out and files() == before, 'undo has a dry run that changes nothing')
    code, out = go('--point', 'tcr-fix')
    check(code == 1 and '--point works with --undo' in out, '--point works only with --undo')
    code, out = go(outline, '--undo', '--point', 'tcr-fix')
    f = W.load('tcr-fix')
    check(code == 0 and f['stage'] == 'review' and 'final' not in f and 'cleared_by' not in f and f['auto_undone']['by'] == 'claude-code' and f['proposal'] and
          f['claude_code'][-1]['undone'] and 'saved' not in f['claude_code'][-1], 'undo for one point puts it back in the review list as it was')
    check(pipeline.auto_problems(f) == ['you undid its automatic decision'] and pipeline.cc_review_skip(f, pts[1], dict(CCR_COURSE), pipeline.dump(repo)) == 'you undid an automatic decision on it',
          'and it is never cleared automatically again, by autoreview, recheck or Claude Code')
    r = W.load('tcr-new'); r.update(stage='cc-check', draft=pipeline.to_bank(fake_point('Review new'))); W.put(r)
    code, out = go(outline, '--undo')
    check(st('tcr-spot') == 'review' and W.load('tcr-spot')['auto']['spot'] and st('tcr-reuse') == 'match-review' and st('tcr-adapt') == 'match-review' and
          'reuse' not in W.load('tcr-reuse') and st('tcr-reject') == 'review' and W.load('tcr-reject')['draft'] and pipeline.rewrites(W.load('tcr-reject')) == 0,
          'undo sends back the spot check, the reuse, the adapt and the rejection, as they were')
    check(st('tcr-new') == 'cc-check' and 'Moved on since' in out and 'tcr-new' in out.split('Moved on since')[1], 'a point that has moved on since stands')
    lines = pipeline.auto_lines(W, pipeline.meta_recs(W, pipeline.read_json(os.path.join(W.dir, 'course.json'))))
    check(not any('Spot checks Claude Code decided' in l for l in lines), 'and an undone spot check answer no longer counts')
    code, out = go(outline, '--undo', '--point', 'tcr-fix')
    check(code == 1 and 'no Claude Code review decision to undo' in out, 'and there is nothing left to undo on it')
    os.environ['ANTHROPIC_API_KEY'] = KEY


def main():
    tmp = tempfile.mkdtemp(prefix='stratos-pipeline-')
    repo, work = os.path.join(tmp, 'repo'), os.path.join(tmp, 'work')
    copy_repo(repo)
    outline = os.path.join(tmp, 'tst-course.yaml')
    base = ['--repo', repo, '--work', work]
    api = FakeAPI()
    pipeline.make_client = lambda: api
    pipeline.POLL_SECONDS = 0
    spot_check = pipeline.spot_check
    os.environ['ANTHROPIC_API_KEY'] = KEY
    printed = []
    def go(*argv):
        code, out = run(base + list(argv)); printed.append(out); return code, out

    # ---------- the outline ----------
    def bad(text, what, find):
        with open(outline, 'w', encoding='utf-8') as f: f.write(text)
        code, out = go('status', outline)
        check(code == 1 and find in out, what)
    bad(OUTLINE.replace('years: [9]', 'years: [6]'), 'an outline for Year 6 is refused', 'Years 7 to 12')
    bad(OUTLINE.replace('years: [9]', 'years: [9, 13]'), 'and one for Year 13', 'Years 7 to 12')
    bad(OUTLINE.replace('bank: tst', 'bank: e'), 'new points can never go in the Economics bank', 'bank must be')
    bad(OUTLINE.replace('            brief: A plain point.\n', ''), 'a point needs a brief or reuse', 'Plain one needs a brief')
    bad(OUTLINE.replace('brief: A plain point.', 'brief: Two kinds: goods and services.'), 'a colon in a brief gets the hint about quote marks', 'needs quote marks')
    bad(OUTLINE.replace('reuse: e-ped', 'reuse: e-nothing'), 'reusing a point that is not in a bank is refused', 'not in any bank')
    # One outline can name several states that teach the same curriculum, such as the Australian Curriculum.
    for places, what in [('[qld]', 'a list of places needs two or more states'), ('[qld, international]', 'and only states'),
                         ('[qld, qld]', 'and different ones'), ('[qld, nowhere]', 'and states that exist')]:
        bad(OUTLINE.replace('place: nsw', 'place: ' + places), what, 'two or more different states')
    with open(outline, 'w', encoding='utf-8') as f: f.write(OUTLINE.replace('place: nsw', 'place: [qld, tas, nt]'))
    code, out = go('status', outline)
    names = {'placeNames': {'qld': 'Queensland', 'tas': 'Tasmania', 'nt': 'Northern Territory'}}
    many = pipeline.read_outline(outline, dict(pipeline.dump(repo), **names))
    check(code == 0 and many['place'] == ['qld', 'tas', 'nt'] and pipeline.where_text(many) == 'Queensland, Tasmania and Northern Territory, Australia',
          'a list of states is accepted, and the writer is told every one of them')
    check(pipeline.used_text({'used': {'x': [{'course': 'k', 'subject': 'Science', 'years': [7], 'place': ['qld', 'tas']}]}, **names}, 'x') == 'Science, Year 7 (Queensland and Tasmania)' and
          pipeline.place_name('international', names, 'international') == 'international', 'and the matcher is told where a bank point is used')

    # ---------- the content check is told the course's subject ----------
    geo = pipeline.to_bank(fake_point('Glaciers'))
    geo['card'][2] = 'Glaciers carved the landscape of the valley.'
    check(pipeline.check_points({'tst-geo': geo}, 'standard', repo, tmp, 'Geography') == {'tst-geo': []}, 'the content check is told the subject, so landscape passes in Geography')
    check(any('banned word' in p for p in pipeline.check_points({'tst-geo': geo}, 'standard', repo, tmp, 'Business Studies')['tst-geo']), 'and landscape is still caught in another subject')

    with open(outline, 'w', encoding='utf-8') as f: f.write(OUTLINE)
    code, out = go('status', outline)
    text = open(outline, encoding='utf-8').read()
    check(code == 0 and 'id: tst-plain-one' in text and 'id: tst-course-1-1' in text and 'id: tst-course-1-2' in text, 'ids are written into the outline under each title')
    check('# A test course. This comment must survive' in text and '# a comment on a title' in text, 'and the comments in it are kept')
    check(text.index('- title: Plain one') < text.index('id: tst-plain-one') < text.index('brief: A plain point.'), 'each id sits under its title')
    go('status', outline)
    check(open(outline, encoding='utf-8').read() == text, 'running again changes nothing in the outline')

    # ---------- the estimate and the money limit ----------
    del os.environ['ANTHROPIC_API_KEY']
    code, out = go('estimate', outline)
    check(code == 0 and 'rough' in out and 'US$' in out, 'the estimate works without a key, from the length of the prompts')
    code, out = go('run', outline, '--max-dollars', '5')
    check(code == 1 and 'ANTHROPIC_API_KEY is not set' in out, 'run needs the key, and says where to set it')
    os.environ['ANTHROPIC_API_KEY'] = KEY
    code, out = go('estimate', outline)
    check(code == 0 and 'rough' not in out and 'match:' in out, 'with a key, the estimate counts the prompts with the API')
    code, out = go('run', outline)
    check(code == 1 and '--max-dollars' in out and api.created == 0, 'run refuses to start without --max-dollars')
    code, out = go('run', outline, '--max-dollars', '0.01', '--settings', 'original')
    check(code == 1 and 'Not sent' in out and api.created == 0, 'and sends nothing that could pass it')

    # ---------- a stop just after sending ----------
    api.stop_after_create = True
    code, out = go('run', outline, '--max-dollars', '5')
    check(code == 130 and 'Stopped' in out and api.created == 1, 'Ctrl+C just after a batch is sent stops the run')
    code, out = go('run', outline, '--max-dollars', '5', '--no-wait')
    check('Found the batch sent before the stop' in out and api.created == 1, 'running again finds that batch instead of sending it twice')
    code, out = go('run', outline, '--max-dollars', '5')
    check(code == 0 and 'Done for now' in out, 'and the run carries on to the end')

    W = pipeline.Work(work, 'tst-course')
    st = lambda pid: W.load(pid)['stage']
    check(st('tst-plain-one') == 'cleared' and W.load('tst-plain-one')['cleared_by'] == 'checker', 'a point the checker passes is cleared')
    dash = W.load('tst-dash-one')
    check(dash['stage'] == 'cleared' and api.seen[('Dash one', 'write')] == 2 and any('failed the content check' in l for l in dash['log']), 'a point that fails the content check is written again once, then passes')
    flag = W.load('tst-flag-one')
    check(flag['stage'] == 'review' and flag.get('proposal') and any('could also be right' in f for f in flag['flags']) and any('fact' in f for f in flag['flags']), 'a flagged point waits for review with the reasons and a fix')
    check(st('tst-error-one') == 'cleared' and st('tst-expire-one') == 'cleared', 'an API error and an expired request are sent again')
    check(st('tst-refuse-one') == 'failed' and 'declined' in W.load('tst-refuse-one')['error'], 'a refusal waits for review as not written')
    unsure = W.load('tst-unsure-one')
    check(unsure['stage'] == 'review' and not unsure.get('proposal') and 'not sure' in ' '.join(unsure['flags']), 'a point the checker is not sure of waits for review, with no fix')
    check(st('tst-same-one') == 'match-review' and W.load('tst-same-one')['match']['same'].startswith('e-'), 'a possible match in the bank waits for review')
    check(st('tst-price-elasticity') == 'reuse', 'a reuse in the outline needs nothing written')
    spent = W.state['spent']['usd']
    check(0 < spent < 1, 'the money spent is added up from each answer: ' + pipeline.money(spent))

    # ---------- the review page ----------
    server = pipeline.review_server(work, repo, 0)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    port = server.server_address[1]
    page = urllib.request.urlopen('http://127.0.0.1:' + str(port) + '/').read().decode()
    token = re.search(r"const TOKEN = '([^']+)'", page).group(1)
    def call(path, body=None, tok=token, host=None):
        req = urllib.request.Request('http://127.0.0.1:' + str(port) + path, data=json.dumps(body).encode() if body is not None else None,
                                     headers=dict({'Content-Type': 'application/json'}, **({'X-Review-Token': tok} if tok else {}), **({'Host': host} if host else {})))
        try:
            return json.loads(urllib.request.urlopen(req).read())
        except urllib.error.HTTPError as e:
            return {'status': e.code}
    items = call('/api/items')
    check(sorted(i['id'] for i in items['items']) == ['tst-flag-one', 'tst-refuse-one', 'tst-same-one', 'tst-unsure-one'], 'the review page lists only the points waiting for review')
    check(call('/api/items', tok=None).get('status') == 403 and call('/api/decide', {'course': 'tst-course', 'id': 'tst-flag-one', 'action': 'fix'}, tok='wrong').get('status') == 403,
          'without the page\'s token, nothing can be read or changed')
    check(call('/api/items', host='evil.example.com').get('status') == 403, 'and a request for another website\'s name is refused')
    # The page draws maths with MathLive from the app's own copy: only its script and its fonts, by name.
    def raw(path):
        try:
            r = urllib.request.urlopen('http://127.0.0.1:' + str(port) + path); return r.status, r.headers.get('Content-Type')
        except urllib.error.HTTPError as e:
            return e.code, None
    shutil.copy(os.path.join(REPO, 'lab', 'mathlive', 'mathlive.min.js'), os.path.join(repo, 'lab', 'mathlive'))
    check(raw('/mathlive/mathlive.min.js') == (200, 'text/javascript') and raw('/mathlive/mathlive-ssr.min.mjs')[0] == 404 and
          raw('/mathlive/../check_content.mjs')[0] == 404 and raw('/mathlive/fonts/none.woff2')[0] == 404 and raw('/mathlive/fonts/../../build.py')[0] == 404,
          'the review page gets MathLive\'s script for the maths in a point, and no other file')
    check(pipeline.shown_len('\\(x = -\\frac{b}{2a}\\)') == 7 and pipeline.shown_len('Centre \\((-1, 4)\\)') == 14 and
          not pipeline.clearly_longest(['\\(\\frac{1200}{5}\\)', '2400', '1205', '240']) and pipeline.clearly_longest(['\\(x = 120\\) and \\(y = 5\\)', '1', '2', '3']),
          'rebalance measures maths as it looks: a fraction is as wide as its wider part')
    check(call('/api/decide', {'course': '../x', 'id': 'tst-flag-one', 'action': 'fix'}).get('ok') is False, 'an unknown course is refused')
    r = call('/api/decide', {'course': 'tst-course', 'id': 'tst-flag-one', 'action': 'fix'})
    check(r['ok'] and st('tst-flag-one') == 'cleared' and W.load('tst-flag-one')['final'] == W.load('tst-flag-one')['proposal'], 'Use the fix clears the point with the fix')
    r = call('/api/decide', {'course': 'tst-course', 'id': 'tst-same-one', 'action': 'reuse'})
    check(r['ok'] and st('tst-same-one') == 'reuse', 'Reuse takes the bank point')

    # ---------- publish, with the second chapter held back ----------
    code, out = go('publish', outline)
    check(code == 0 and 'Held back as Coming soon: Second chapter' in out, 'publish puts in the ready chapter and holds back the other')
    C = json.loads(subprocess.run(['node', 'content/dump.mjs'], cwd=repo, capture_output=True, text=True).stdout)
    course = C['courses'][0]
    ch1, ch2 = course['units'][0]['chapters']
    check(ch1['points'][-2:] == [W.load('tst-same-one')['reuse'], 'e-ped'] and ch2['points'] == [], 'the chapter lists reused points by their bank ids, and the held one has none')
    check(set(C['banks']['tst']) == {'tst-plain-one', 'tst-dash-one', 'tst-flag-one', 'tst-error-one', 'tst-expire-one'}, 'the bank gets only the new points of the ready chapter')
    check(C['banks']['tst']['tst-dash-one']['card'][1] == ['Part', 'The second line is about dash one.'], 'a labelled card line is written as [label, text]')
    week = open(os.path.join(repo, 'supabase', 'week.sql'), encoding='utf-8').read()
    chal = open(os.path.join(repo, 'supabase', 'challenges.sql'), encoding='utf-8').read()
    check("('tst-plain-one', false)" in week and "('tst-course-1-1', 'tst-course', 8, 1500)" in chal and 'tst-course-1-2' not in chal, 'week.sql and challenges.sql get the new points and the ready chapter')

    # ---------- the second chapter ----------
    good = pipeline.to_bank(fake_point('Unsure one'))
    bad_point = dict(good, remember='A dash — here')
    r = call('/api/decide', {'course': 'tst-course', 'id': 'tst-unsure-one', 'action': 'edit', 'point': bad_point})
    check(not r['ok'] and any('dash' in p for p in r['problems']) and st('tst-unsure-one') == 'review', 'an edit that fails the content check is not saved, and says why')
    r = call('/api/decide', {'course': 'tst-course', 'id': 'tst-unsure-one', 'action': 'edit', 'point': good})
    check(r['ok'] and st('tst-unsure-one') == 'cleared' and W.load('tst-unsure-one')['edited'], 'a good edit is saved and clears the point')
    r = call('/api/decide', {'course': 'tst-course', 'id': 'tst-refuse-one', 'action': 'reject', 'note': 'Keep it to the business side.'})
    check(r['ok'] and st('tst-refuse-one') == 'write' and W.load('tst-refuse-one')['note'], 'Reject and rewrite sends it back with the note')
    server.shutdown()
    code, out = go('run', outline, '--max-dollars', '5')
    check(code == 0 and st('tst-refuse-one') == 'cleared' and 'owner\'s note: Keep it to the business side.' in json.dumps([b['requests'] for b in api.batches.values()]), 'the next run writes it again with the note')
    code, out = go('publish', outline)
    C = json.loads(subprocess.run(['node', 'content/dump.mjs'], cwd=repo, capture_output=True, text=True).stdout)
    check(code == 0 and 'Held back' not in out and C['courses'][0]['units'][0]['chapters'][1]['points'] == ['tst-refuse-one', 'tst-unsure-one'], 'publishing again puts in the second chapter')
    b = subprocess.run([sys.executable, 'build.py'], cwd=repo, capture_output=True, text=True)
    page = open(os.path.join(repo, 'v2.html'), encoding='utf-8').read() if b.returncode == 0 else ''
    check(b.returncode == 0 and 'MADE_COURSES.push(' in page and 'tst-unsure-one' in page, 'build.py puts the made course into v2.html')

    # ---------- the fixture for tests/made.mjs ----------
    fixture = os.path.join(REPO, 'tests', 'made')
    made = {os.path.join(d, f): open(os.path.join(repo, 'src', d, f), encoding='utf-8').read() for d in ['bank', 'courses'] for f in os.listdir(os.path.join(repo, 'src', d))}
    if '--write-fixture' in sys.argv:
        shutil.rmtree(fixture, ignore_errors=True)
        for rel, text in made.items(): pipeline.write_text(os.path.join(fixture, rel), text)
        print('wrote tests/made/')
    have = {os.path.join(d, f): open(os.path.join(fixture, d, f), encoding='utf-8').read() for d in ['bank', 'courses'] for f in os.listdir(os.path.join(fixture, d))} if os.path.isdir(fixture) else {}
    check(have == made, 'tests/made/ is what publish writes now (python3 content/test_pipeline.py --write-fixture updates it)')

    # ---------- reuse, adapt and new across states, and the fixture for tests/units.mjs ----------
    units = states_tests(tmp, repo, printed, api)
    ufix = os.path.join(REPO, 'tests', 'units')
    if '--write-fixture' in sys.argv:
        shutil.rmtree(ufix, ignore_errors=True)
        for rel, text in units.items(): pipeline.write_text(os.path.join(ufix, rel), text)
        print('wrote tests/units/')
    have = {os.path.join(d_, f): open(os.path.join(ufix, d_, f), encoding='utf-8').read() for d_ in ['bank', 'courses'] for f in os.listdir(os.path.join(ufix, d_))} if os.path.isdir(ufix) else {}
    check(have == units, 'tests/units/ is what publish writes now (python3 content/test_pipeline.py --write-fixture updates it)')
    # ---------- a run started before settings carries on ----------
    # tests/pipeline-old-run/ was made by the pipeline as it was before settings: a run stopped with a batch open.
    repo2 = os.path.join(tmp, 'repo2'); copy_repo(repo2)
    old = os.path.join(REPO, 'tests', 'pipeline-old-run')
    work2 = os.path.join(tmp, 'work-old')
    shutil.copytree(os.path.join(old, 'work'), work2)
    outline2 = os.path.join(tmp, 'old.yaml'); shutil.copy(os.path.join(old, 'tst-course.yaml'), outline2)
    ob = json.load(open(os.path.join(old, 'open-batch.json'), encoding='utf-8'))
    api2 = FakeAPI(); api2.created = ob['batches']
    api2.batches[ob['id']] = {'requests': ob['requests'], 'polls': 1, 'created': ob['created']}
    for t, s_, n in ob['seen']: api2.seen[(t, s_)] = n
    pipeline.make_client = lambda: api2
    O = pipeline.Work(work2, 'tst-course')
    spent_before = O.state['spent']['usd']
    check('settings' not in O.state, 'the old run has no settings saved')
    code, out = run(['--repo', repo2, '--work', work2, 'run', outline2, '--max-dollars', '5']); printed.append(out)
    O = pipeline.Work(work2, 'tst-course')
    sent = [r for bid, b in api2.batches.items() if bid != ob['id'] for r in b['requests']]
    check(code == 0 and 'Done for now' in out and O.state['settings'] == 'original' and 'original settings' in out, 'a run saved before settings carries on to the end, on the original settings')
    check(sent and all(r['params']['model'] == pipeline.OPUS for r in sent) and not any(stage_of(r['params']) in ('chapter', 'screen') for r in sent),
          'every request it sends goes to Opus, one point at a time, with no Haiku screen')
    effort = {'write': 'medium', 'check': 'high', 'fix': 'medium', 'match': 'low'}
    check(all(r['params']['output_config']['effort'] == effort[stage_of(r['params'])] for r in sent) and
          all('Already written in this chapter' not in r['params']['messages'][0]['content'] for r in sent), 'with the same effort and prompts as before')
    check(abs(O.state['spent']['usd'] - (spent_before + api2.billed * (3000 * 2 + 2000 * 10) / 1e6)) < 0.001, 'its answers are priced as Opus batches, as before')
    check(O.load('tst-plain-one')['cleared_by'] == 'checker' and O.load('tst-flag-one')['stage'] == 'review' and O.load('tst-unsure-one')['stage'] == 'review' and
          O.load('tst-dash-one')['stage'] == 'cleared', 'and its points end where they would have before')
    items = pipeline.review_items(work2, repo2)['items']
    check(sorted(i['id'] for i in items) == ['tst-flag-one', 'tst-refuse-one', 'tst-same-one', 'tst-unsure-one'], 'the review page lists its points as before')
    ok = [pipeline.decide(work2, repo2, {'course': 'tst-course', 'id': 'tst-flag-one', 'action': 'fix'})['ok'],
          pipeline.decide(work2, repo2, {'course': 'tst-course', 'id': 'tst-same-one', 'action': 'reuse'})['ok']]
    code, out = run(['--repo', repo2, '--work', work2, 'publish', outline2]); printed.append(out)
    check(all(ok) and code == 0 and 'Held back as Coming soon: Second chapter' in out, 'and it publishes as before')
    pipeline.make_client = lambda: api

    # ---------- the cheaper settings, and the screened settings, with batches ----------
    # In a copy of the repository with only the Economics bank: its points have the same titles as the test course's,
    # which is published in repo now, so the shortlist would find them there and send them to the match step.
    cheap = os.path.join(tmp, 'tst-cheap.yaml')
    with open(cheap, 'w', encoding='utf-8') as f: f.write(CHEAP)
    repo_c = os.path.join(tmp, 'repo-cheap'); copy_repo(repo_c)
    go_main = go
    def go(*argv):
        code, out = run(['--repo', repo_c, '--work', work] + list(argv)); printed.append(out); return code, out
    code, out = go('estimate', cheap)
    check(code == 0 and 'cheaper settings' in out and 'write, a chapter at a time: 3 requests for 11 points' in out and 'Claude Sonnet 5.5, low effort' in out and
          'screen' not in out and 'check: 11 requests, Claude Opus 5.5, high effort' in out,
          'a new course is estimated on the cheaper settings: a request per chapter on Sonnet, and Opus checking every point with no Haiku screen')
    code, out = go('estimate', cheap, '--settings', 'screened')
    nums = lambda label, text: [float(x) for x in re.search(label + r'.*?US\$(\d+\.\d\d) to US\$(\d+\.\d\d)', text).groups()]
    b_, n_ = nums('With batches', out), nums('With --now', out)
    check(code == 0 and 'screened settings' in out and 'write, a chapter at a time: 3 requests for 11 points' in out and
          'screen: 10 requests, Claude Haiku 5.5, medium effort' in out, 'with --settings screened it shows the Haiku screen too')
    check(abs(n_[0] - 2 * b_[0]) < 0.02 and abs(n_[1] - 2 * b_[1]) < 0.02 and b_[1] > 0, 'and the cost with batches and with --now, which is twice as much')
    code, out = go('estimate', cheap, '--settings', 'original')
    check(code == 0 and 'write, one point at a time: 12 requests' in out and 'screen' not in out and 'Claude Opus 5.5, medium effort' in out, 'with --settings original it shows the first run\'s settings')
    check(not os.path.exists(os.path.join(work, 'tst-cheap', 'state.json')), 'and an estimate saves no settings')
    pipeline.spot_check = lambda pid: pid == 'tsc-spot-two'
    first = api.created
    code, out = go('run', cheap, '--max-dollars', '5', '--settings', 'screened')
    C2 = pipeline.Work(work, 'tst-cheap')
    reqs = [r for bid, b in api.batches.items() if int(bid.split('_')[1]) > first for r in b['requests']]
    chap = [r for r in reqs if stage_of(r['params']) == 'chapter']
    check(code == 0 and 'Done for now' in out and C2.state['settings'] == 'screened', 'a course asked to run on the screened settings keeps them')
    check(len(chap) == 3 and all(r['params']['model'] == pipeline.SONNET and r['params']['output_config']['effort'] == 'low' for r in chap) and
          sorted(chap[0]['params']['output_config']['format']['schema']['required']) == sorted(p for p in chap[0]['params']['output_config']['format']['schema']['properties']),
          'each chapter is written in one request to Sonnet, low effort, with an entry for each point')
    sys_of = lambda r: r['params']['system'][0]['text']
    check(all('Never add filler about the course' in sys_of(r) and 'Keep the card\'s strength' in sys_of(r) for r in chap) and
          all('filler about the course or the chapter itself' in sys_of(r) and 'defined or explained here instead of only mentioned' in sys_of(r)
              for r in reqs if stage_of(r['params']) in ('screen', 'check')),
          'the writer is given the rules from the first course\'s review, and both checkers look for them')
    check(all(r['params']['model'] == pipeline.HAIKU and r['params']['output_config']['effort'] == 'medium' for r in reqs if stage_of(r['params']) == 'screen') and
          all(r['params']['model'] == pipeline.OPUS and r['params']['output_config']['effort'] == 'high' for r in reqs if stage_of(r['params']) == 'check'),
          'Haiku screens at medium effort, and Opus checks at high')
    R = C2.load
    check(R('tsc-plain-two')['cleared_by'] == 'screen' and not R('tsc-plain-two').get('check'), 'a point Haiku passes cleanly is cleared without Opus')
    check(R('tsc-haiku-flag-two')['cleared_by'] == 'checker' and R('tsc-haiku-flag-two')['to_opus'] == 'flagged at the screen', 'a point Haiku flags goes to Opus, which can clear it')
    check(R('tsc-flag-two')['stage'] == 'review' and R('tsc-flag-two').get('proposal'), 'a point both flag gets a fix and waits for review')
    check(R('tsc-doubt-two')['to_opus'] == 'not sure at the screen' and R('tsc-doubt-two')['cleared_by'] == 'checker', 'a point Haiku is not sure of goes to Opus')
    check(R('tsc-topic-two')['stage'] == 'review' and R('tsc-topic-two')['sensitive'] == 'drugs' and R('tsc-topic-two')['check']['sensitive'] == 'none',
          'a topic Haiku names comes to the owner even when Opus names none')
    check(R('tsc-wellbeing-two').get('screen') is None and R('tsc-wellbeing-two')['to_opus'] == 'the word mental health', 'a point with a sensitive word skips Haiku and goes to Opus')
    check(R('tsc-spot-two')['to_opus'] == 'spot check' and R('tsc-spot-two')['screen_passed'] and R('tsc-spot-two').get('check'), 'a spot check sends a point Haiku passed to Opus too')
    lost = R('tsc-lost-two')
    alone = [r for r in reqs if stage_of(r['params']) == 'write' and 'Point: Lost two' in r['params']['messages'][0]['content']]
    check(lost['stage'] == 'cleared' and any('written on its own' in l for l in lost['log']) and alone and 'Already written in this chapter' in alone[0]['params']['messages'][0]['content'],
          'a point missing from the chapter answer is written on its own, told what the chapter has already')
    check(R('tsc-dash-two')['stage'] == 'cleared' and R('tsc-dash-two').get('redone'), 'a point that fails the content check is written again on its own')
    check(R('tsc-refuse-two')['stage'] == 'failed' and R('tsc-partner-two')['stage'] == 'cleared', 'a declined chapter request is sent again one point at a time, so only the refused point fails')
    plain = R('tsc-plain-two')['usd']
    check(abs(plain['write'] - (3000 * 1 + 2000 * 5) / 1e6 / 7) < 1e-5 and abs(plain['screen'] - (3000 * 0.05 + 2000 * 0.25) / 1e6) < 1e-5,
          'each point\'s cost is saved, with a chapter request shared between its points, at batch prices')
    check('Flagged for you:' in out and 'Sent to the Opus checker:' in out and 'cents for each of 10 points written' in out and 'spot check' in out,
          'after the run it prints the cost per point, the flag rate and the points sent to Opus')
    code, out = go('status', cheap)
    check(code == 0 and 'screened settings' in out and 'Sent to the Opus checker:' in out, 'status shows the settings and the same numbers')
    pipeline.spot_check = spot_check
    go = go_main

    # ---------- a trial with --now, and the Compare tab ----------
    batches_before = api.created
    code, out = go('run', outline, '--as', 'tst-course', '--max-dollars', '5')
    check(code == 1 and '--as needs a new name' in out, 'a trial needs a name of its own')
    code, out = go('run', outline, '--as', 'tst-course-screened', '--settings', 'screened', '--now', '--max-dollars', '0.001')
    check(code == 1 and 'Not sent' in out and not api.streamed, '--now keeps to --max-dollars, at its own prices')
    pipeline.NOW_MOST = 3
    code, out = go('run', outline, '--as', 'tst-course-screened', '--settings', 'screened', '--now', '--max-dollars', '5')
    check(code == 1 and 'more than 3 for --now' in out and not api.streamed, '--now refuses a run bigger than NOW_MOST')
    pipeline.NOW_MOST = 50
    api.limit_once = True
    code, out = go('run', outline, '--as', 'tst-course-screened', '--settings', 'screened', '--now', '--max-dollars', '5')
    check(code == 1 and 'rate limit' in out, 'a rate limit stops a --now run with a message')
    api.interrupt_on = lambda p: stage_of(p) == 'screen'
    code, out = go('run', outline, '--as', 'tst-course-screened', '--settings', 'screened', '--now', '--max-dollars', '5')
    T = pipeline.Work(work, 'tst-course-screened')
    check(code == 130 and 'Stopped' in out and T.state.get('pending', 0) > 0, 'Ctrl+C during --now stops it, with the running requests\' high cost counted')
    spent_at_stop = T.state['spent']['usd'] + T.state['pending']
    code, out = go('run', outline, '--as', 'tst-course-screened', '--settings', 'screened', '--now', '--max-dollars', '5')
    api.release.set()
    T = pipeline.Work(work, 'tst-course-screened')
    check(code == 0 and 'counted US$' in out and 'Done for now' in out and T.state['spent']['usd'] >= spent_at_stop and not T.state.get('pending'),
          'running again counts that money as spent and carries on to the end')
    check(api.created == batches_before and api.streamed, 'with --now nothing goes through batches')
    meta = json.load(open(os.path.join(work, 'tst-course-screened', 'course.json'), encoding='utf-8'))
    check(meta['trial_of'] == 'tst-course' and T.state['trial_of'] == 'tst-course' and T.state['settings'] == 'screened', 'the trial has its own folder, marked as a trial of the course')
    trecs = [T.load(p) for p in ['tst-plain-one', 'tst-unsure-one', 'tst-error-one']]
    check(all(r.get('screen_passed') and r.get('check') and r['to_opus'] == 'trial' for r in trecs[:2]), 'in a trial, Opus checks every point Haiku passed too')
    check(abs(T.load('tst-plain-one')['usd']['screen'] - (3000 * 0.10 + 2000 * 0.50) / 1e6) < 1e-5, 'and --now answers are priced at the normal price')
    check(re.search(r'Trial: Haiku passed \d+ points, and Opus flagged [1-9]\d* of them', out) and 'Without the extra Opus checks' in out,
          'the trial says how many points Haiku passed that Opus flagged')
    check(T.load('tst-error-one')['to_opus'] == 'the screen did not answer', 'a screen that fails sends the point to Opus')
    code, out = go('publish', outline)
    check('tst-course-screened' not in json.dumps(pipeline.review_items(work, repo)) and
          pipeline.decide(work, repo, {'course': 'tst-course-screened', 'id': 'tst-unsure-one', 'action': 'approve'})['ok'] is False,
          'a trial never shows in the review list and nothing in it can be approved')
    server = pipeline.review_server(work, repo, 0)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    port = server.server_address[1]
    page = urllib.request.urlopen('http://127.0.0.1:' + str(port) + '/').read().decode()
    token2 = re.search(r"const TOKEN = '([^']+)'", page).group(1)
    call = lambda path, body=None, tok=token2, _call=call: _call(path, body, tok)
    comp = call('/api/compare')
    tr = comp['trials'][0] if comp.get('trials') else {}
    pair = next((p for p in tr.get('pairs', []) if p['id'] == 'tst-plain-one'), {})
    check(tr.get('trial') == 'tst-course-screened' and tr['a']['settings'] == 'original' and tr['b']['settings'] == 'screened' and
          pair.get('a', {}).get('point') and pair.get('b', {}).get('point') and pair['b']['usd'], 'the Compare tab gets both versions of each point, with each run\'s numbers')
    check('data-tab="compare"' in page, 'and the page has a Compare tab')
    r = call('/api/pick', {'trial': 'tst-course-screened', 'id': 'tst-plain-one', 'pick': 'b'})
    check(r.get('ok') and call('/api/compare')['trials'][0]['pairs'][0]['pick'] == 'b', 'a pick on the Compare tab is saved')
    check(not call('/api/pick', {'trial': 'tst-course', 'id': 'tst-plain-one', 'pick': 'b'}).get('ok') and
          not call('/api/pick', {'trial': 'tst-course-screened', 'id': '../x', 'pick': 'b'}).get('ok') and
          call('/api/compare', tok=None).get('status') == 403, 'an unknown trial or point is refused, and so is a call without the token')
    server.shutdown()

    # ---------- run-many ----------
    many = os.path.join(tmp, 'many'); os.makedirs(many)
    for name, text in [('tst-a', course_text('tst-a', 'tsa', 'Alpha')), ('tst-b', course_text('tst-b', 'tsb', 'Beta')), ('bad', course_text('tst-z', 'tsz', 'Zed').replace('years: [9]', 'years: [6]'))]:
        with open(os.path.join(many, name + '.yaml'), 'w', encoding='utf-8') as f: f.write(text)
    pipeline.BATCH_MOST = 3
    first = api.created
    code, out = go('run-many', many, '--max-dollars', '5')
    A, B = pipeline.Work(work, 'tst-a'), pipeline.Work(work, 'tst-b')
    new = {bid: b for bid, b in api.batches.items() if int(bid.split('_')[1]) > first}
    check(code == 0 and 'bad.yaml' in out and 'Years 7 to 12' in out and 'The other courses carry on' in out, 'run-many sets aside an outline with problems and carries on')
    check(out.index('The combined estimate, before anything is sent') < out.index('Sent ') and 'Estimate for the rest of all 2 courses' in out and "its share of --max-dollars" in out,
          'it shows the combined estimate and each course\'s share before sending anything')
    shared = [bid for bid, b in new.items() if any(r['custom_id'] in a['items'] for a in A.state['batches'] if a['id'] == bid for r in b['requests']) and
              any(r['custom_id'] in x['items'] for x in B.state['batches'] if x['id'] == bid for r in b['requests'])]
    check(shared and all(len(b['requests']) <= 3 for b in new.values()), 'both courses\' requests share each batch, split when a batch would be too big')
    check(all(A.load(p)['stage'] == 'cleared' for p in ['tsa-alpha-one', 'tsa-alpha-two', 'tsa-alpha-three']) and all(B.load(p)['stage'] == 'cleared' for p in ['tsb-beta-one', 'tsb-beta-two', 'tsb-beta-three']),
          'each course\'s points are written and checked in its own folder')
    check(A.state['spent']['usd'] > 0 and B.state['spent']['usd'] > 0 and out.rindex('Testing Alpha, Year 9 (cheaper settings)') > out.index('Done for now') and
          out.rindex('Testing Beta, Year 9 (cheaper settings)') > out.index('Done for now'), 'each course keeps its own costs, with a summary for each at the end')
    check(not any(stage_of(r['params']) == 'screen' for b in new.values() for r in b['requests']) and
          all(A.load(p).get('check') and not A.load(p).get('screen') for p in ['tsa-alpha-one', 'tsa-alpha-two', 'tsa-alpha-three']),
          'new courses run on the cheaper settings: nothing goes to Haiku, and Opus checks every point')
    pipeline.BATCH_MOST = 5000
    jobs = [NS(work=NS(state={'spent': {'usd': 1}})), NS(work=NS(state={'spent': {'usd': 0}}))]
    check([round(x, 4) for x in pipeline.shares(jobs, [2, 6], 5)] == [2, 3], 'each course\'s share is what it spent plus the rest split by what it could still cost')
    many2 = os.path.join(tmp, 'many2'); os.makedirs(many2)
    for name, text in [('tst-c', course_text('tst-c', 'tsc', 'Gamma')), ('tst-d', course_text('tst-d', 'tsd', 'Delta'))]:
        with open(os.path.join(many2, name + '.yaml'), 'w', encoding='utf-8') as f: f.write(text)
    shares = pipeline.shares
    pipeline.shares = lambda jobs, highs, limit: [5 if j.course['id'] == 'tst-c' else 0.000001 for j in jobs]
    code, out = go('run-many', many2, '--max-dollars', '5')
    pipeline.shares = shares
    D = pipeline.Work(work, 'tst-d')
    check(code == 0 and 'Held back: Not sent' in out and D.state['spent']['usd'] == 0 and pipeline.Work(work, 'tst-c').load('tsc-gamma-one')['stage'] == 'cleared',
          'a course over its share is held back, and the others carry on')

    # ---------- autoreview ----------
    auto_tests(tmp, repo, printed)
    recheck_tests(tmp, repo, printed, api)
    autoreject_tests(tmp, repo, printed, api)
    rebalance_tests(tmp, printed, api)

    # ---------- Claude Code instead of the API ----------
    claude_code_tests(tmp, printed, api)
    cc_review_tests(tmp, repo, printed, api)

    # ---------- the key ----------
    saved =''.join(open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(tmp) for f in fs if f.endswith(('.json', '.js', '.sql', '.yaml')))
    check(KEY not in ''.join(printed) and KEY not in saved, 'the API key is never printed or written to a file')
    check(pipeline.scrub('the key ' + KEY + ' leaked') == 'the key [key] leaked', 'and anything printed has it taken out')

    shutil.rmtree(tmp, ignore_errors=True)
    print(sum(results), 'of', len(results), 'checks ok')
    return 0 if all(results) else 1

if __name__ == '__main__':
    sys.exit(main())
