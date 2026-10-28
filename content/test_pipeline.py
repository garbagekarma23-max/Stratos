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
what stays, the word guard, the dry run, spot checks and their warning, undo, the replay); and the API key never printed
or saved.
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
    if system.startswith('Stratos keeps a bank'): return 'match'
    if system.startswith('You check'): return 'screen' if params['model'] == pipeline.HAIKU else 'check'
    if 'This point was flagged in checking' in user: return 'fix'
    return 'chapter' if re.search(r'^Write these \d+ points from this chapter', user, re.M) else 'write'

class FakeAPI:
    """Stands in for the Anthropic API. What it answers depends on words in each point's title:
    Error and Expire fail the first time, Same is in the bank, Refuse is declined until there is a note, Dash fails the
    content check once, Lost is left out of a chapter answer once, Flag is flagged by both checkers, Haiku flag only by
    Haiku, Miss only by Opus, Doubt makes Haiku not sure, Topic makes Haiku name a sensitive topic, and Unsure makes Opus
    not sure."""
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
        title = re.search(r'^Point: (.*)$', text, re.M).group(1) if stage not in ('check', 'screen') else re.search(r'^Title: (.*)$', text, re.M).group(1)
        n = self.count(title, stage)
        if 'Error' in title and n == 1: return 'error', None
        if 'Expire' in title and n == 1: return 'expired', None
        if stage == 'match':
            same = re.search(r'^- (e-[a-z]+):', text, re.M).group(1) if 'Same' in title else ''
            return 'ok', {'same': same, 'reason': 'It teaches the same idea.' if same else 'No point in the bank is the same.'}
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
            brief: The matcher finds it in the bank.
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
    for f in ['load.mjs', 'dump.mjs']: shutil.copy(os.path.join(HERE, f), os.path.join(dst, 'content', f))
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
    cheap = os.path.join(tmp, 'tst-cheap.yaml')
    with open(cheap, 'w', encoding='utf-8') as f: f.write(CHEAP)
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

    # ---------- the key ----------
    saved =''.join(open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(tmp) for f in fs if f.endswith(('.json', '.js', '.sql', '.yaml')))
    check(KEY not in ''.join(printed) and KEY not in saved, 'the API key is never printed or written to a file')
    check(pipeline.scrub('the key ' + KEY + ' leaked') == 'the key [key] leaked', 'and anything printed has it taken out')

    shutil.rmtree(tmp, ignore_errors=True)
    print(sum(results), 'of', len(results), 'checks ok')
    return 0 if all(results) else 1

if __name__ == '__main__':
    sys.exit(main())
