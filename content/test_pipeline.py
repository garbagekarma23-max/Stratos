"""Tests for the content pipeline, with a stand-in for the Anthropic API. Nothing is sent anywhere and no key is needed.

  python3 content/test_pipeline.py                  runs the tests (tests/run.mjs runs them through tests/pipeline.mjs)
  python3 content/test_pipeline.py --write-fixture  also writes tests/made/, the made course tests/made.mjs opens

What it checks: the outline rules (Years 7 to 12, the bank, briefs, the colon hint), ids written into the outline
with its comments kept, the estimate, --max-dollars, a full run (match, write, the content check and one rewrite,
check, fix, a refusal, an API error tried again, an expired request sent again), a stop just after a batch was
sent carrying on without sending it twice, the API key never printed or saved, the review page (its token, its
Host check, approve, the fix, edit with the content check, reject with a note, reuse), and publishing into a copy
of the repository: the bank and course files, a chapter held back as Coming soon, the SQL lines, and that
check_content.mjs and build.py pass on the result.
"""
import contextlib, io, json, os, re, shutil, subprocess, sys, tempfile, threading, urllib.request
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

class FakeAPI:
    def __init__(self):
        self.batches, self.created, self.stop_after_create, self.seen = {}, 0, False, {}
        self.messages = NS(batches=FakeBatches(self), count_tokens=lambda **p: NS(input_tokens=len(json.dumps(p)) // 4))
    def answer(self, req):
        stage = {'m': 'match', 'w': 'write', 'c': 'check', 'f': 'fix'}[req['custom_id'][0]]
        text = req['params']['messages'][0]['content']
        title = re.search(r'^Point: (.*)$', text, re.M).group(1) if stage != 'check' else re.search(r'^Title: (.*)$', text, re.M).group(1)
        n = self.seen[(title, stage)] = self.seen.get((title, stage), 0) + 1
        ok = lambda data, stop='end_turn': NS(custom_id=req['custom_id'], result=NS(type='succeeded', message=NS(
            stop_reason=stop, content=[NS(type='thinking', thinking=''), NS(type='text', text=json.dumps(data))],
            usage=NS(input_tokens=3000, output_tokens=2000, cache_creation_input_tokens=0, cache_read_input_tokens=0), stop_details=None)))
        if 'Error' in title and n == 1:
            return NS(custom_id=req['custom_id'], result=NS(type='errored', error=NS(type='error', error=NS(type='api_error', message='overloaded'))))
        if 'Expire' in title and n == 1:
            return NS(custom_id=req['custom_id'], result=NS(type='expired'))
        if stage == 'match':
            same = re.search(r'^- (e-[a-z]+):', text, re.M).group(1) if 'Same' in title else ''
            return ok({'same': same, 'reason': 'It teaches the same idea.' if same else 'No point in the bank is the same.'})
        if stage in ('write', 'fix'):
            if 'Refuse' in title and 'owner\'s note' not in text:
                r = ok({}, 'refusal'); r.result.message.content = []; return r
            return ok(fake_point(title, dash=('Dash' in title and n == 1)))
        # The checker: the right answer is the option that starts with Right.
        def pick(k):
            block = text.split('Question ' + k + ': ')[1]
            opts = re.findall(r'^- (.*)$', block.split('Clue:')[0], re.M)
            best = next(o for o in opts if o.startswith('Right'))
            return {'best': best, 'also_right': [o for o in opts if o == 'Wrong one'] if 'Flag' in title and k == 'a' else []}
        probs = [{'part': 'card', 'kind': 'fact', 'detail': 'The second line is not quite right.'}] if 'Flag' in title else []
        return ok({'a': pick('a'), 'b': pick('b'), 'problems': probs, 'sure': 'low' if 'Unsure' in title else 'high',
                   'sensitive': 'none', 'summary': 'Problems found.' if probs else 'No problems found.'})


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


def main():
    tmp = tempfile.mkdtemp(prefix='stratos-pipeline-')
    repo, work = os.path.join(tmp, 'repo'), os.path.join(tmp, 'work')
    copy_repo(repo)
    outline = os.path.join(tmp, 'tst-course.yaml')
    base = ['--repo', repo, '--work', work]
    api = FakeAPI()
    pipeline.make_client = lambda: api
    pipeline.POLL_SECONDS = 0
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
    code, out = go('run', outline, '--max-dollars', '0.01')
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

    # ---------- the key ----------
    saved = ''.join(open(os.path.join(r_, f), encoding='utf-8').read() for r_, _, fs in os.walk(tmp) for f in fs if f.endswith(('.json', '.js', '.sql', '.yaml')))
    check(KEY not in ''.join(printed) and KEY not in saved, 'the API key is never printed or written to a file')
    check(pipeline.scrub('the key ' + KEY + ' leaked') == 'the key [key] leaked', 'and anything printed has it taken out')

    # ---------- the fixture for tests/made.mjs ----------
    fixture = os.path.join(REPO, 'tests', 'made')
    made = {os.path.join(d, f): open(os.path.join(repo, 'src', d, f), encoding='utf-8').read() for d in ['bank', 'courses'] for f in os.listdir(os.path.join(repo, 'src', d))}
    if '--write-fixture' in sys.argv:
        shutil.rmtree(fixture, ignore_errors=True)
        for rel, text in made.items(): pipeline.write_text(os.path.join(fixture, rel), text)
        print('wrote tests/made/')
    have = {os.path.join(d, f): open(os.path.join(fixture, d, f), encoding='utf-8').read() for d in ['bank', 'courses'] for f in os.listdir(os.path.join(fixture, d))} if os.path.isdir(fixture) else {}
    check(have == made, 'tests/made/ is what publish writes now (python3 content/test_pipeline.py --write-fixture updates it)')
    shutil.rmtree(tmp, ignore_errors=True)
    print(sum(results), 'of', len(results), 'checks ok')
    return 0 if all(results) else 1

if __name__ == '__main__':
    sys.exit(main())
