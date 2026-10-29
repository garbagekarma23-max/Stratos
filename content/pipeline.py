"""The Stratos content pipeline: turns a course outline into study content for the app.

Run it from the repository folder. On Windows, type py where this says python3.
  python3 content/pipeline.py estimate content/outlines/nsw-bus-11.yaml   what the rest of the course will cost
  python3 content/pipeline.py run content/outlines/nsw-bus-11.yaml --max-dollars 5
  python3 content/pipeline.py run-many content/outlines --max-dollars 20  several courses, sharing each batch
  python3 content/pipeline.py status content/outlines/nsw-bus-11.yaml     where each point is, with no API calls
  python3 content/pipeline.py autoreview --dry-run                         which flagged points it would clear with the fix
  python3 content/pipeline.py autoreview                                  clears them, with no API calls
  python3 content/pipeline.py recheck --dry-run                           which fixes it would check again, and the cost
  python3 content/pipeline.py recheck --max-dollars 5                     a fresh Opus check of each fix waiting for you
  python3 content/pipeline.py rebalance --dry-run                         which questions have a right option that stands out by length
  python3 content/pipeline.py rebalance --max-new-dollars 3               rewrites their wrong options to match it, and checks them
  python3 content/pipeline.py review                                      the review page, at http://localhost:8765
  python3 content/pipeline.py publish content/outlines/nsw-bus-11.yaml    writes the cleared points into src/
content/README.md walks through each step.

How a point goes through it:
  match    if the bank already has points in the same subject, Claude says whether one is the same idea. A match
           waits for you in the review page: reuse it, or have a new point written.
  write    Claude writes the point: card, remember line, check question and practice question. With the cheaper
           settings, one request writes every point of a chapter. node check_content.mjs --json checks each point.
           If one fails, Claude rewrites that point on its own, once, with the problems.
  screen   only with the screened settings, which a course gets only by asking: Claude Haiku checks it first. A point
           it passes cleanly is cleared. Anything it flags or is not sure of goes on to the check.
  check    a separate call checks it. It is not told the right answer: it picks one itself, and says if another
           option could also be right, if any fact is wrong, and how sure it is.
  fix      a point the checker flagged gets a suggested fix.
  auto     only when you run autoreview: a flagged point whose problems are all wording or other, with the checker highly
           sure and a fix that passes the content check, is cleared with the fix. 1 in 10 stay for you as spot checks.
  recheck  only when you run recheck: the fix of a point still waiting for you goes to the Opus checker as a new point,
           with nothing about the first draft or its problems. If the check picks the fix's answers, finds nothing
           else right, no problems and no topic, and is highly sure, the point is cleared with the fix. 1 in 10 stay
           for you as spot checks. A sensitive topic and a point you sent back with --undo are never sent.
  rebalance only when you run rebalance: in a cleared point, a question whose right option is clearly the longest gets
           its three wrong options rewritten to match it in length and detail. The question and the right option never
           change. A rewrite that passes the content check and no longer has the right option clearly the longest
           goes to the course's checker (Opus) as a new point. Only if the check agrees with it on every count are the
           new options used. Otherwise the point keeps its old options.
  review   you approve it, use the fix, edit it, or reject it with a note (it is then written again).
  cleared  ready to publish. A point the checker passed is cleared at once.
Each step is one Message Batch for every point that needs it, which costs half the normal price. With --now, the
requests go one by one to the normal API instead: done in minutes, at the full price.

Everything is saved as it arrives, in content/work/<course id>/: state.json (the settings, the batches sent and the
money spent) and points/<point id>.json (each point's drafts, the checkers' answers, its cost and your decisions).
Running the same command again carries on from there. Nothing is sent twice unless it failed.

The API key is read from the ANTHROPIC_API_KEY environment variable and never written anywhere or printed.
"""
import argparse, hashlib, http.server, json, os, queue, random, re, secrets, subprocess, sys, threading, time, urllib.parse
from datetime import datetime, timezone
from types import SimpleNamespace as NS

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

# ---------- settings ----------
OPUS, SONNET, HAIKU = 'claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'
MODEL_NAMES = {OPUS: 'Claude Opus 5.5', SONNET: 'Claude Sonnet 5.5', HAIKU: 'Claude Haiku 5.5'}
# Each step has a model, how hard it thinks (effort), and the output tokens one point is expected to use there, low
# and high, for estimates before sending. Thinking is billed as output, so effort is the main thing that sets the cost.
# The output numbers are set so the estimate matches what the first run and the cheaper trial of nsw-bus-11 cost.
# A course keeps the settings it started with (saved in its state.json). run --settings original, cheaper or screened
# changes them.
SETTINGS = {
    # The settings of the first run (nsw-bus-11): Claude Opus 5.5 at every step, and one writing request per point.
    # It cost about 3.7 cents a point with batches.
    'original': {
        'match': {'model': OPUS, 'effort': 'low', 'out': (500, 1500)},
        'write': {'model': OPUS, 'effort': 'medium', 'out': (1100, 1400)},
        'screen': None,
        'check': {'model': OPUS, 'effort': 'high', 'out': (550, 750)},
        'fix': {'model': OPUS, 'effort': 'medium', 'out': (1100, 1400)},
        'chapters': False},
    # Cheaper, for a new course: Claude Sonnet 5.5 writes a chapter at a time, and Claude Opus 5.5 checks every point
    # and writes the fixes. A trial of nsw-bus-11 matched the original's quality and flag rate at about 2 cents a point.
    'cheaper': {
        'match': {'model': OPUS, 'effort': 'low', 'out': (500, 1500)},
        'write': {'model': SONNET, 'effort': 'low', 'out': (600, 900)},
        'screen': None,
        'check': {'model': OPUS, 'effort': 'high', 'out': (550, 750)},
        'fix': {'model': OPUS, 'effort': 'medium', 'out': (1100, 1400)},
        'chapters': True},
    # Cheaper with a Claude Haiku 5.5 screen first: only the points it flags or is not sure of go to the Opus checker.
    # In the nsw-bus-11 trial Haiku sent all 20 points on, so it saved nothing. Kept for a later Haiku, only by asking
    # for it with --settings screened.
    'screened': {
        'match': {'model': OPUS, 'effort': 'low', 'out': (500, 1500)},
        'write': {'model': SONNET, 'effort': 'low', 'out': (600, 900)},
        'screen': {'model': HAIKU, 'effort': 'medium', 'out': (550, 750)},
        'check': {'model': OPUS, 'effort': 'high', 'out': (550, 750)},
        'fix': {'model': OPUS, 'effort': 'medium', 'out': (1100, 1400)},
        'chapters': True},
}
NEW_COURSE = 'cheaper'    # the settings a new course starts on
OLD_COURSE = 'original'   # a course whose state.json has no settings in it started before there were settings
MAX_TOKENS = {'match': 8000, 'write': 32000, 'chapter': 64000, 'screen': 32000, 'check': 32000, 'fix': 32000, 'rebalance': 16000}
# rebalance, for courses already written: the cheaper writer, Claude Sonnet 5.5, rewrites the wrong options of a question
# whose right option is clearly the longest. One request a point, in a batch.
REBALANCE = {'model': SONNET, 'effort': 'medium', 'out': (400, 900)}
# The right option is clearly the longest when it is longer than every wrong option and at least this many characters
# longer than their average. check_content.mjs uses the same rule.
LONG_MARGIN = 5
# Normal prices in US dollars per million tokens. Message Batches cost half (BATCH). A cache write costs 1.25 times the
# input price. Cache reads are counted at the normal price, to be safe.
PRICES = {OPUS: {'in': 4.00, 'out': 20.00, 'cache_read': 0.20},
          SONNET: {'in': 2.00, 'out': 10.00, 'cache_read': 0.20},
          HAIKU: {'in': 0.10, 'out': 0.50, 'cache_read': 0.01}}
BATCH = 0.5
# Shares used by the estimate: points written a second time (the content check failed), points that get a fix, and
# points the Haiku screen sends on to the Opus checker. Once a course has screened 5 points, its own share is used.
REDO_SHARE, FIX_SHARE, TO_OPUS = 0.1, (0.25, 0.35), (0.3, 0.6)
# One in 10 of the points Haiku passes goes to the Opus checker anyway, so its misses keep being measured.
SPOT_SHARE = 0.1
# autoreview: one in this many automatic decisions stays in the review list as a spot check, so the owner can see
# whether they hold up. 10 is 1 in 10. Make it bigger (20 is 1 in 20) for fewer spot checks once they keep agreeing.
AUTO_SPOT_EVERY = 10
# The kinds of checker problem autoreview may clear with the fix: wording, and other (overlap with another point, a
# remember line that splits ideas more neatly than the card, a clue that gives the answer away, a why that contradicts
# the card). fact and level always stay with the owner.
AUTO_SAFE_KINDS = ('wording', 'other')
# A problem whose explanation uses one of these words stays with the owner whatever its kind, in case the checker
# labelled a wrong fact as wording or other.
AUTO_UNSAFE_WORDS = re.compile(r'\b(incorrect\w*|wrong\w*|false\w*|inaccura\w*|not true|errors?|erroneous\w*|mistake\w*|mistaken\w*)\b', re.I)
# Saved with each automatic decision, so decisions made under older rules can be told apart.
AUTO_RULES = 1
# --now sends 4 requests at a time, and only for a run of at most 50 points. Bigger runs use batches.
NOW_PARALLEL, NOW_MOST = 4, 50
# A batch holds at most this many requests and bytes. More are split into several batches. The API allows 100,000
# requests and 256 MB in one batch; the account's queue limit depends on its tier, so stay well under both.
BATCH_MOST, BATCH_BYTES = 5000, 100_000_000
POLL_SECONDS = int(os.environ.get('STRATOS_POLL', '60'))
TRIES = 3
KINDS = ['standard', 'english', 'maths', 'theory']
EXAMPLES = ['e-positive', 'e-ped', 'e-externality']
WAITING = ('match', 'write', 'screen', 'check', 'fix')
# Words in a brief or a draft that send a point to the Opus checker without Haiku, so a sensitive topic Haiku misses is
# still judged by Opus. A word that turns up in another sense (an economic depression) only costs a check.
SENSITIVE = re.compile(r'\b(mental (health|illness)|suicid\w*|self[- ]harm\w*|depress\w*|anxiety|eating disorders?|drugs?|'
                       r'alcohol\w*|vap(e|es|ing)|smok\w*|cannabis|sex\w*|contracept\w*|aboriginal|torres strait|first nations|'
                       r'indigenous|stolen generations?|racis\w*|violen\w*|abus\w*)\b', re.I)


# ---------- printing, and keeping the key out of it ----------
def scrub(text):
    """Text with the API key taken out, in case it ever turns up in a message."""
    key = os.environ.get('ANTHROPIC_API_KEY') or ''
    return text.replace(key, '[key]') if len(key) > 8 else text

def say(*parts):
    print(scrub(' '.join(str(p) for p in parts)), flush=True)

class Stop(Exception):
    """Stops a command with a message for the owner, and no stack trace."""

def now():
    return datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

def money(usd):
    return 'US$' + format(usd, '.2f')

def cents(usd):
    return format(usd * 100, '.1f') + ' cents'

def many_of(n, word):
    return str(n) + ' ' + word + ('' if n == 1 else 's')


# ---------- files ----------
def read_json(path, default=None):
    if not os.path.exists(path): return default
    with open(path, encoding='utf-8') as f: return json.load(f)

def write_json(path, data):
    """Writes a file whole, through a temporary file, so a stop part way never leaves half a file."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, ensure_ascii=False, indent=1, sort_keys=False)
        f.write('\n')
    os.replace(tmp, path)

def write_text(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='\n') as f: f.write(text)

def node(args, repo):
    """Runs node with the repository as the folder, and returns what it printed."""
    try:
        out = subprocess.run(['node'] + args, cwd=repo, capture_output=True, text=True, encoding='utf-8')
    except FileNotFoundError:
        raise Stop('Node.js is not installed, or not on the PATH. See content/README.md, step 1.')
    if out.returncode != 0:
        raise Stop('node ' + ' '.join(args) + ' failed:\n' + (out.stdout + out.stderr).strip())
    return out.stdout

def dump(repo):
    """The content in src/ as it stands: the banks, the made courses, and the ids already taken (content/dump.mjs)."""
    return json.loads(node([os.path.join('content', 'dump.mjs')], repo))

def check_points(points, kind, repo, work_dir, subject=None):
    """Runs check_content.mjs on some points. Returns {id: [problems]}. The subject lets through its own terms that
    share a word with a banned one, such as landscape in Geography."""
    if not points: return {}
    path = os.path.join(work_dir, 'check-input.json')
    write_json(path, {'kind': kind, 'subject': subject, 'points': points})
    try:
        return json.loads(node(['check_content.mjs', '--json', path], repo))
    finally:
        os.remove(path)


# ---------- the outline ----------
def year_text(years):
    ys = sorted(years)
    if len(ys) == 1: return 'Year ' + str(ys[0])
    if len(ys) == 2: return 'Years ' + str(ys[0]) + ' and ' + str(ys[1])
    return 'Years ' + str(ys[0]) + ' to ' + str(ys[-1])

STOP_WORDS = {'a', 'an', 'the', 'of', 'and', 'in', 'to', 'for', 'is', 'on', 'its', 'what', 'how', 'why'}

def slug(title, most=4):
    words = [w for w in re.sub(r'[^a-z0-9]+', ' ', title.lower()).split() if w not in STOP_WORDS] or ['point']
    return '-'.join(words[:most])

def load_yaml(path):
    try:
        import yaml
    except ImportError:
        raise Stop('PyYAML is not installed. Run: py -m pip install -r content\\requirements.txt (content/README.md, step 3).')
    with open(path, encoding='utf-8') as f: text = f.read()
    return yaml, text

def read_outline(path, d):
    """Reads and checks an outline. Returns the course as a dict, with its points in order."""
    if not os.path.exists(path): raise Stop('No outline at ' + path)
    yaml, text = load_yaml(path)
    try:
        o = yaml.safe_load(text)
    except yaml.YAMLError as e:
        hint = ('\nA brief or title with a colon and a space in it needs quote marks around it, like brief: "Two kinds: goods and services."'
                if 'mapping values are not allowed' in str(e) else '')
        raise Stop('The outline is not valid YAML: ' + str(e) + hint)
    bad = []
    need = lambda k: o.get(k) if isinstance(o.get(k), str) and o.get(k).strip() else bad.append('the outline needs ' + k)
    if not isinstance(o, dict): raise Stop('The outline must start with id, subject and the other course lines.')
    for k in ['id', 'subject', 'bank', 'name', 'about', 'place', 'kind', 'note']: need(k)
    if bad: raise Stop('\n'.join(bad))
    if not re.fullmatch(r'[a-z0-9]+(-[a-z0-9]+)*', o['id']): bad.append('id must be lower-case letters and numbers joined by dashes, like nsw-bus-11')
    if not re.fullmatch(r'[a-z]{2,4}', o['bank']) or o['bank'] == 'e': bad.append('bank must be 2 to 4 lower-case letters, and not e (the Economics bank takes no new points)')
    years = o.get('years')
    if not isinstance(years, list) or not years or any(not isinstance(y, int) or y < 7 or y > 12 for y in years):
        bad.append('years must be a list of years from 7 to 12, like [11]. Stratos is for Years 7 to 12 only')
    if o['kind'] not in KINDS: bad.append('kind must be one of ' + ', '.join(KINDS))
    if o['place'] not in d['places']: bad.append('place must be one of ' + ', '.join(d['places']))
    also = o.get('also_match') or []
    if not isinstance(also, list) or any(b not in d['banks'] for b in also): bad.append('also_match must list banks that exist: ' + ', '.join(sorted(d['banks'])))
    course = {k: o.get(k) for k in ['id', 'subject', 'bank', 'name', 'about', 'place', 'kind', 'note', 'syllabus', 'short']}
    course.update({'years': years, 'also_match': also, 'chips': o.get('chips') or [], 'units': [], 'points': []})
    titles = set()
    for ui, u in enumerate(o.get('units') or []):
        if not isinstance(u, dict) or not u.get('title'): bad.append('unit ' + str(ui + 1) + ' needs a title'); continue
        unit = {'title': u['title'], 'chapters': []}
        for ci, c in enumerate(u.get('chapters') or []):
            where = 'unit ' + str(ui + 1) + ', chapter ' + str(ci + 1)
            if not isinstance(c, dict) or not c.get('title'): bad.append(where + ' needs a title'); continue
            ch = {'id': c.get('id'), 'title': c['title'], 'points': []}
            for p in c.get('points') or []:
                if not isinstance(p, dict) or not p.get('title'): bad.append(where + ' has a point with no title'); continue
                if p['title'] in titles: bad.append('two points are called ' + p['title'])
                titles.add(p['title'])
                reuse = p.get('reuse')
                if reuse and not any(reuse in b for b in d['banks'].values()): bad.append(p['title'] + ' reuses ' + reuse + ', which is not in any bank')
                if not reuse and not (isinstance(p.get('brief'), str) and p['brief'].strip()): bad.append(p['title'] + ' needs a brief, or reuse')
                pt = {'id': p.get('id'), 'title': p['title'], 'brief': (p.get('brief') or '').strip(), 'codes': p.get('codes') or [],
                      'reuse': reuse, 'unit': ui, 'chapter': ci}
                ch['points'].append(pt); course['points'].append(pt)
            unit['chapters'].append(ch)
        course['units'].append(unit)
    if not course['points']: bad.append('the outline has no points')
    if bad: raise Stop('The outline has problems:\n  ' + '\n  '.join(bad))
    return course

def assign_ids(path, course, d):
    """Gives every chapter and point without an id one, and writes the ids into the outline file under each title,
    keeping the rest of the file (and its comments) as it was. Ids never change after this."""
    yaml, text = load_yaml(path)
    taken_points = {i for b in d['banks'].values() for i in b} | {p['id'] for p in course['points'] if p['id']}
    taken_chapters = set(d['chapterIds']) | {c['id'] for u in course['units'] for c in u['chapters'] if c['id']}
    new = {}
    for ui, u in enumerate(course['units']):
        for ci, c in enumerate(u['chapters']):
            if not c['id']:
                cid, n = course['id'] + '-' + str(ui + 1) + '-' + str(ci + 1), 2
                while cid in taken_chapters: cid, n = course['id'] + '-' + str(ui + 1) + '-' + str(ci + 1) + '-' + str(n), n + 1
                c['id'] = cid; taken_chapters.add(cid); new[('c', ui, ci, None)] = cid
            for pi, p in enumerate(c['points']):
                if not p['id']:
                    base = course['bank'] + '-' + slug(p['title'])
                    pid, n = base, 2
                    while pid in taken_points: pid, n = base + '-' + str(n), n + 1
                    p['id'] = pid; taken_points.add(pid); new[('p', ui, ci, pi)] = pid
    for p in course['points']:
        if not re.fullmatch(course['bank'] + r'-[a-z0-9]+(-[a-z0-9]+)*', p['id']):
            raise Stop(p['title'] + ': its id ' + p['id'] + ' must start with ' + course['bank'] + '- and use lower-case words joined by dashes')
    if not new: return
    # Find where each title is in the file, then add an id line under it, from the bottom up so line numbers hold.
    root = yaml.compose(text)
    def get(node, key):
        for k, v in node.value:
            if k.value == key: return k, v
        return None, None
    # The line after a title's value: the next line for a one-line title, or the line where a longer one ends.
    after = lambda v: v.end_mark.line + (1 if v.end_mark.column > 0 else 0)
    inserts = []
    _, units = get(root, 'units')
    for ui, un in enumerate(units.value):
        _, chs = get(un, 'chapters')
        for ci, cn in enumerate(chs.value if chs else []):
            k, v = get(cn, 'title')
            if ('c', ui, ci, None) in new: inserts.append((after(v), k.start_mark.column, new[('c', ui, ci, None)]))
            _, pts = get(cn, 'points')
            for pi, pn in enumerate(pts.value if pts else []):
                k, v = get(pn, 'title')
                if ('p', ui, ci, pi) in new: inserts.append((after(v), k.start_mark.column, new[('p', ui, ci, pi)]))
    lines = text.splitlines(keepends=True)
    end = '\r\n' if '\r\n' in text else '\n'
    if lines and not lines[-1].endswith('\n'): lines[-1] += end
    for at, col, ident in sorted(inserts, reverse=True):
        lines.insert(min(at, len(lines)), ' ' * col + 'id: ' + ident + end)
    with open(path, 'w', encoding='utf-8', newline='') as f: f.write(''.join(lines))
    say('Gave', len(new), 'new ids, written into', os.path.relpath(path, REPO) if path.startswith(REPO) else path)

def outline_paths(items):
    """Outline files from a list of files and folders. A folder gives every .yaml file in it, A to Z."""
    out = []
    for it in items:
        if os.path.isdir(it): out += [os.path.join(it, f) for f in sorted(os.listdir(it)) if f.endswith(('.yaml', '.yml'))]
        else: out.append(it)
    seen, keep = set(), []
    for p in out:
        if os.path.abspath(p) not in seen: seen.add(os.path.abspath(p)); keep.append(p)
    if not keep: raise Stop('No outlines found in ' + ', '.join(items))
    return keep


# ---------- the JSON shapes Claude answers in ----------
def obj(props, required=None):
    return {'type': 'object', 'properties': props, 'required': required or list(props), 'additionalProperties': False}

STR = {'type': 'string'}
QUESTION = obj({'q': STR, 'opts': {'type': 'array', 'items': STR}, 'why': STR, 'clue': STR})
PRACTICE = obj({'d': {'type': 'integer', 'enum': [2, 3]}, 'q': STR, 'opts': {'type': 'array', 'items': STR}, 'why': STR, 'clue': STR})
POINT_SCHEMA = obj({'title': STR, 'card': {'type': 'array', 'items': obj({'label': STR, 'text': STR})}, 'remember': STR, 'a': QUESTION, 'b': PRACTICE})
PICK = obj({'best': STR, 'also_right': {'type': 'array', 'items': STR}})
CHECK_SCHEMA = obj({
    'a': PICK, 'b': PICK,
    'problems': {'type': 'array', 'items': obj({'part': {'type': 'string', 'enum': ['title', 'card', 'remember', 'a', 'b']},
                                                 'kind': {'type': 'string', 'enum': ['fact', 'wording', 'level', 'other']}, 'detail': STR})},
    'sure': {'type': 'string', 'enum': ['high', 'medium', 'low']},
    'sensitive': {'type': 'string', 'enum': ['none', 'mental-health', 'drugs', 'sexual-health', 'first-nations', 'set-text', 'other-sensitive']},
    'summary': STR})
MATCH_SCHEMA = obj({'same': STR, 'reason': STR})
WRONG = obj({'wrong': {'type': 'array', 'items': STR}})
SCHEMAS = {'match': MATCH_SCHEMA, 'write': POINT_SCHEMA, 'fix': POINT_SCHEMA, 'check': CHECK_SCHEMA, 'screen': CHECK_SCHEMA}

def to_bank(p):
    """A point as Claude writes it (card lines with labels) to the bank's shape (a label line is [label, text])."""
    card = [[l['label'].strip(), l['text'].strip()] if l['label'].strip() else l['text'].strip() for l in p['card']]
    q = lambda x, d=False: dict(({'d': x['d']} if d else {}), q=x['q'].strip(), opts=[o.strip() for o in x['opts']], why=x['why'].strip(), clue=x['clue'].strip())
    return {'title': p['title'].strip(), 'card': card, 'remember': p['remember'].strip(), 'a': q(p['a']), 'b': q(p['b'], True)}

def to_claude(p):
    """A bank point back to the shape Claude writes in."""
    card = [{'label': l[0], 'text': l[1]} if isinstance(l, list) else {'label': '', 'text': l} for l in p['card']]
    return {'title': p['title'], 'card': card, 'remember': p['remember'], 'a': p['a'], 'b': p['b']}


# ---------- prompts ----------
def prompt(name):
    with open(os.path.join(HERE, 'prompts', name), encoding='utf-8') as f: return f.read().strip()

def writer_system(course, d):
    examples = '\n\n'.join(json.dumps(to_claude(d['banks']['e'][i]), ensure_ascii=False, indent=1) for i in EXAMPLES)
    return prompt('writer.md').replace('{kind_rules}', prompt(os.path.join('kinds', course['kind'] + '.md'))).replace('{examples}', examples)

def context(course, pt):
    """The course, the chapter and its other points, so Claude writes this point to fit them."""
    unit = course['units'][pt['unit']]; ch = unit['chapters'][pt['chapter']]
    lines = ['Course: ' + course['subject'] + ', ' + year_text(course['years']) + ' (' + course['about'] + ').',
             'Students: ' + year_text(course['years']) + ', in Australia.']
    if course.get('syllabus'): lines.append('Syllabus: ' + course['syllabus'] + '.')
    lines += ['Unit ' + str(pt['unit'] + 1) + ': ' + unit['title'], 'Chapter ' + str(pt['chapter'] + 1) + ': ' + ch['title'],
              'The points in this chapter, in order. Each teaches its own idea: do not teach or ask about the others in this point.']
    for i, p in enumerate(ch['points']):
        lines.append(str(i + 1) + '. ' + p['title'] + (': ' + p['brief'] if p['brief'] else ''))
    return '\n'.join(lines)

def brief(pt):
    return 'Point: ' + pt['title'] + '\nBrief: ' + pt['brief'] + ('\nSyllabus codes: ' + ', '.join(map(str, pt['codes'])) if pt['codes'] else '')

def pjson(p):
    return json.dumps(to_claude(p), ensure_ascii=False, indent=1)

def write_user(course, pt, rec, siblings=None):
    parts = [context(course, pt), '', 'Write this point.', brief(pt)]
    if siblings:
        parts += ['', 'Already written in this chapter. Do not teach their ideas or reuse their examples:'] + siblings
    if rec.get('rejected'):
        parts += ['', 'The owner rejected this earlier version:', pjson(rec['rejected'])]
    if rec.get('note'):
        parts += ['', 'The owner\'s note: ' + rec['note']]
    if rec.get('redo'):
        parts += ['', 'Your last version failed the content check. Write it again and fix these:', '- ' + '\n- '.join(rec['redo']),
                  '', 'Your last version:', pjson(rec['draft'])]
    return '\n'.join(parts)

def chapter_user(course, pts):
    parts = [context(course, pts[0]), '', 'Write these ' + str(len(pts)) + ' points from this chapter. Answer with one entry for each id below. '
             'Follow every rule above for each point, as if it were written on its own: each teaches only its own idea, and a student '
             'may meet any of them alone. Give each point its own examples and scenarios, so no two questions in the chapter feel the same.']
    for pt in pts: parts += ['', 'Id: ' + pt['id'], brief(pt)]
    return '\n'.join(parts)

def fix_user(course, pt, rec):
    return '\n'.join([context(course, pt), '', brief(pt), '', 'This point was flagged in checking. Write it again: fix every problem below, and keep everything that is right.',
                      '- ' + '\n- '.join(rec['flags']), '', 'The flagged version:', pjson(rec['draft'])])

def shuffled(pid, k, opts):
    out = list(opts)
    random.Random(pid + k).shuffle(out)
    return out

def check_user(course, pt, rec):
    p = rec['draft']
    card = '\n'.join('- ' + (l[0] + ': ' + l[1] if isinstance(l, list) else l) for l in p['card'])
    q = lambda k: '\n'.join(['Question ' + k + ': ' + p[k]['q']] + ['- ' + o for o in shuffled(rec['id'], k, p[k]['opts'])] + ['Clue: ' + p[k]['clue']])
    return '\n'.join([context(course, pt), '', 'Check this point.', '', 'Title: ' + p['title'], 'Card:', card, 'Remember: ' + p['remember'], '', q('a'), '', q('b'),
                      '', 'The writer\'s explanations, which name the intended answers. Decide best and also_right before you read them.',
                      'Why (a): ' + p['a']['why'], 'Why (b): ' + p['b']['why']])

def match_user(course, pt, cands, d):
    lines = ['New course: ' + course['subject'] + ', ' + year_text(course['years']) + '.', '', 'The new point:', brief(pt), '', 'Points already in the bank:']
    for i in cands:
        p = bank_point(d, i)
        years = sorted({y for u in d['used'].get(i, []) for y in (u['years'] or [])})
        lines.append('- ' + i + ': ' + p['title'] + '. ' + p['remember'] + (' (used in ' + year_text(years) + ')' if years else ''))
    return '\n'.join(lines)

def bank_point(d, pid):
    for b in d['banks'].values():
        if pid in b: return b[pid]
    return None

def params(step, cfg, system, user, schema, max_tokens):
    s = cfg[step]
    return {'model': s['model'], 'max_tokens': max_tokens,
            'system': [{'type': 'text', 'text': system, 'cache_control': {'type': 'ephemeral'}}],
            'messages': [{'role': 'user', 'content': user}],
            'output_config': {'effort': s['effort'], 'format': {'type': 'json_schema', 'schema': schema}}}

def request(stage, course, pt, rec, d, custom_id, cfg, cands=None, siblings=None):
    """One request for one point at one step."""
    if stage == 'match': system, user = prompt('matcher.md'), match_user(course, pt, cands, d)
    elif stage in ('check', 'screen'): system, user = prompt('checker.md'), check_user(course, pt, rec)
    elif stage == 'fix': system, user = writer_system(course, d), fix_user(course, pt, rec)
    else: system, user = writer_system(course, d), write_user(course, pt, rec, siblings)
    return {'custom_id': custom_id, 'params': params(stage, cfg, system, user, SCHEMAS[stage], MAX_TOKENS[stage])}

def chapter_request(course, pts, d, custom_id, cfg):
    """One request that writes several points of a chapter at once. The answer has one entry for each point id."""
    schema = obj({pt['id']: POINT_SCHEMA for pt in pts})
    return {'custom_id': custom_id, 'params': params('write', cfg, writer_system(course, d), chapter_user(course, pts), schema, MAX_TOKENS['chapter'])}


# ---------- where each point is ----------
class Work:
    """The saved state of one course: content/work/<course id>/."""
    def __init__(self, root, cid):
        self.dir = os.path.join(root, cid)
        self.state_path = os.path.join(self.dir, 'state.json')
        self.existed = os.path.exists(self.state_path)
        self.state = read_json(self.state_path, {'batches': [], 'sending': None, 'spent': {'usd': 0, 'in': 0, 'out': 0}})
    def save(self): write_json(self.state_path, self.state)
    def point_path(self, pid): return os.path.join(self.dir, 'points', pid + '.json')
    def load(self, pid): return read_json(self.point_path(pid))
    def put(self, rec): write_json(self.point_path(rec['id']), rec)

def brief_hash(pt):
    return hashlib.sha1(json.dumps([pt['title'], pt['brief'], pt['codes'], pt['reuse']], ensure_ascii=False).encode('utf-8')).hexdigest()[:12]

def log(rec, text):
    rec.setdefault('log', []).append(now() + ' ' + text)

def candidates(course, d, pt):
    """Bank points that could be the same idea: from the course's bank and the banks in also_match."""
    mine = {p['id'] for p in course['points']}
    out = []
    for b in [course['bank']] + course['also_match']:
        out += [i for i in d['banks'].get(b, {}) if i not in mine]
    return out

# What a point's record holds from its last writing and checking. A fresh start or a rejection clears these.
DRAFT_KEYS = ['draft', 'redo', 'redone', 'local', 'check', 'flags', 'sensitive', 'proposal', 'proposal_problems', 'error', 'tries',
              'screen', 'screen_passed', 'screen_sensitive', 'screen_missed', 'to_opus', 'alone', 'auto', 'auto_undone', 'recheck', 'recheck_tries',
              'rebalance', 'rebalance_tries']

def fresh(rec, course, d, pt):
    """Puts a point at its first step: reuse, match or write."""
    for k in DRAFT_KEYS + ['final', 'match', 'reuse', 'rejected', 'note', 'cleared_by']:
        rec.pop(k, None)
    if pt['reuse']:
        rec.update(stage='reuse', reuse=pt['reuse'])
    elif candidates(course, d, pt) and not rec.get('match_rejected'):
        rec['stage'] = 'match'
    else:
        rec['stage'] = 'write'

def sync(work, course, d, trial_of=None):
    """Makes a record for each point in the outline, and starts again any point whose title or brief changed."""
    meta = {k: course[k] for k in ['id', 'subject', 'name', 'about', 'kind', 'years', 'syllabus', 'units']}
    if trial_of: meta.update(id=os.path.basename(work.dir), name=course['name'] + ' (trial ' + os.path.basename(work.dir) + ')', trial_of=trial_of)
    write_json(os.path.join(work.dir, 'course.json'), meta)
    for pt in course['points']:
        rec, h = work.load(pt['id']), brief_hash(pt)
        if rec is None:
            rec = {'id': pt['id'], 'title': pt['title'], 'brief': h}
            fresh(rec, course, d, pt); log(rec, 'new, ' + rec['stage']); work.put(rec)
        elif rec['brief'] != h:
            rec.update(title=pt['title'], brief=h); rec.pop('match_rejected', None)
            fresh(rec, course, d, pt); log(rec, 'the outline changed, so it starts again at ' + rec['stage']); work.put(rec)

def point_of(course, pid):
    return next(p for p in course['points'] if p['id'] == pid)

def first_writing(rec):
    """True for a point that can be written with the rest of its chapter: not a rewrite, a rejection or a retry alone."""
    return not (rec.get('redo') or rec.get('note') or rec.get('rejected') or rec.get('alone'))

def siblings(course, work, pt):
    """The chapter's points already written, as lines for a point written on its own."""
    ch = course['units'][pt['unit']]['chapters'][pt['chapter']]
    out = []
    for p in ch['points']:
        if p['id'] == pt['id']: continue
        r = work.load(p['id']) or {}
        v = r.get('final') or r.get('draft')
        if v: out.append('- ' + v['title'] + ': ' + v['remember'])
    return out

def next_requests(work, course, d, cfg):
    """The requests for every point that is waiting on Claude: one per point, or one per chapter for first writing."""
    out, items, groups = [], {}, {}
    nb = len(work.state['batches'])
    def one(pt, rec, stage):
        n = rec.setdefault('sent', {}).get(stage, 0)
        cid = stage[0] + '_' + hashlib.sha1((course['id'] + pt['id'] + stage + str(n) + str(nb)).encode()).hexdigest()[:24]
        sib = siblings(course, work, pt) if stage == 'write' and cfg['chapters'] else None
        out.append(request(stage, course, pt, rec, d, cid, cfg, candidates(course, d, pt) if stage == 'match' else None, sib))
        items[cid] = {'pid': pt['id'], 'stage': stage, 'model': cfg[stage]['model']}
    for pt in course['points']:
        rec = work.load(pt['id'])
        stage = rec['stage']
        if stage not in WAITING: continue
        if stage == 'write' and cfg['chapters'] and first_writing(rec):
            groups.setdefault((pt['unit'], pt['chapter']), []).append((pt, rec)); continue
        one(pt, rec, stage)
    for group in groups.values():
        if len(group) == 1: one(*group[0], 'write'); continue
        pts = [pt for pt, _ in group]
        n = sum(rec.get('sent', {}).get('write', 0) for _, rec in group)
        cid = 'w_' + hashlib.sha1((course['id'] + ','.join(p['id'] for p in pts) + 'chapter' + str(n) + str(nb)).encode()).hexdigest()[:24]
        out.append(chapter_request(course, pts, d, cid, cfg))
        items[cid] = {'pids': [p['id'] for p in pts], 'stage': 'write', 'model': cfg['write']['model']}
    return out, items

def flags_for(rec, c=None):
    """What the owner sees about a checked point. concrete is False when the only flags are 'not sure' or a topic."""
    p, c, out, concrete = rec['draft'], c or rec['check'], [], False
    norm = lambda s: re.sub(r'\s+', ' ', s.strip().lower())
    for k in ['a', 'b']:
        right, best = p[k]['opts'][0], c[k]['best']
        if norm(best) != norm(right):
            out.append('Question ' + k + ': the checker picked “' + best + '”, not the writer’s answer “' + right + '”.'); concrete = True
        for o in c[k]['also_right']:
            if norm(o) != norm(best):
                out.append('Question ' + k + ': the checker says “' + o + '” could also be right.'); concrete = True
    for pr in c['problems']:
        out.append({'a': 'Question a', 'b': 'Question b'}.get(pr['part'], pr['part'].capitalize()) + ', ' + pr['kind'] + ': ' + pr['detail']); concrete = True
    for pr in rec.get('local') or []:
        out.append('Content check: ' + pr); concrete = True
    if c['sure'] == 'low': out.append('The checker was not sure of this point.')
    return out, concrete

def spot_check(pid):
    """True for about SPOT_SHARE of points, picked by the point id, so a run picks the same ones again."""
    return int(hashlib.sha1(pid.encode()).hexdigest()[:8], 16) / 0xffffffff < SPOT_SHARE

def after_write(rec, course, cfg, pt):
    """The step after writing: Haiku's screen, or straight to the Opus checker."""
    if not cfg.get('screen'): return 'check'
    if course['kind'] == 'english':
        rec['to_opus'] = 'English course'; return 'check'
    m = SENSITIVE.search(pt['title'] + ' ' + pt['brief'] + ' ' + json.dumps(rec['draft'], ensure_ascii=False))
    if m:
        rec['to_opus'] = 'the word ' + m.group(0).lower(); return 'check'
    return 'screen'

def charge(work, recs, u, item, at_now):
    """Adds what one answer cost to the course's total and, shared evenly, to each point it was for."""
    rate = rates(item.get('model', OPUS), at_now)
    get = lambda k: getattr(u, k, 0) or 0
    usd = (get('input_tokens') * rate['in'] + get('cache_creation_input_tokens') * rate['cache_write'] +
           get('cache_read_input_tokens') * rate['cache_read'] + get('output_tokens') * rate['out']) / 1e6
    s = work.state['spent']
    s['in'] += get('input_tokens') + get('cache_creation_input_tokens') + get('cache_read_input_tokens')
    s['out'] += get('output_tokens')
    s['usd'] = round(s['usd'] + usd, 4)
    for rec in recs:
        c = rec.setdefault('usd', {})
        c[item['stage']] = round(c.get(item['stage'], 0) + usd / len(recs), 5)

def answer_text(m):
    """The JSON Claude answered with, or None if it was cut off or not JSON."""
    text = next((b.text for b in m.content if getattr(b, 'type', '') == 'text'), '')
    try:
        return json.loads(text) if m.stop_reason != 'max_tokens' else None
    except ValueError:
        return None

def collect(work, course, d, batch, results, repo, cfg, at_now=False):
    """Saves what came back, and moves each point to its next step."""
    written, rebalanced = {}, {}
    for r in results:
        item = batch['items'].get(r.custom_id)
        if not item: continue
        if item['stage'] == 'recheck':
            recheck_collect(work, item, r, at_now); continue
        if item['stage'] == 'rebalance':
            rebalance_collect(work, item, r, at_now, rebalanced); continue
        if item['stage'] == 'rebalance-check':
            rebalance_check_collect(work, item, r, at_now); continue
        if 'pids' in item:
            collect_chapter(work, item, r, written, at_now); continue
        rec, stage = work.load(item['pid']), item['stage']
        if rec is None or rec['stage'] != stage: continue
        kind = r.result.type
        if kind == 'succeeded':
            m = r.result.message
            charge(work, [rec], m.usage, item, at_now)
            data = None if m.stop_reason == 'refusal' else answer_text(m)
            if stage == 'screen' and data is None:
                rec.update(stage='check', to_opus='the screen did not answer'); log(rec, 'screen: no answer, so to the check'); work.put(rec); continue
            if m.stop_reason == 'refusal':
                det = getattr(m, 'stop_details', None)
                rec.update(stage='failed', error='Claude declined to write this' + (' (' + str(det.category) + ')' if det and getattr(det, 'category', None) else '') + '. Edit it by hand, or reject it with a note to try again.')
                log(rec, stage + ': declined'); work.put(rec); continue
            if data is None:
                retry(rec, stage, 'the answer was cut off or not JSON'); work.put(rec); continue
            if stage == 'match':
                rec['match'] = data
                if data['same'] in candidates(course, d, point_of(course, rec['id'])):
                    rec['stage'] = 'match-review'; log(rec, 'match: the bank may have it as ' + data['same'])
                else:
                    rec['stage'] = 'write'; log(rec, 'match: none')
            elif stage in ('write', 'fix'):
                try:
                    written[rec['id']] = (to_bank(data), stage)
                except (KeyError, TypeError, AttributeError):
                    retry(rec, stage, 'the answer was not in the right shape')
            elif stage == 'screen':
                screened(rec, data, cfg)
            else:
                checked(rec, data)
            work.put(rec)
        elif stage == 'screen':
            rec.update(stage='check', to_opus='the screen did not answer'); log(rec, 'screen: ' + kind + ', so to the check'); work.put(rec)
        elif kind == 'errored':
            err = r.result.error
            inner = getattr(err, 'error', err)
            if getattr(inner, 'type', '') == 'invalid_request_error':
                rec.update(stage='failed', error='The API refused the request: ' + str(getattr(inner, 'message', ''))); log(rec, stage + ': refused by the API')
            else:
                retry(rec, stage, 'the API had an error')
            work.put(rec)
        else:
            retry(rec, stage, 'the batch ' + kind); work.put(rec)
    # The content check, for everything written here at once.
    problems = check_points({pid: p for pid, (p, _) in written.items()}, course['kind'], repo, work.dir, course['subject'])
    for pid, (p, stage) in written.items():
        rec, probs = work.load(pid), problems.get(pid, [])
        if stage == 'fix':
            rec.update(stage='review', proposal=p, proposal_problems=probs); log(rec, 'fix: suggested')
        elif probs and not rec.get('redone'):
            rec.update(draft=p, redo=probs, redone=True); log(rec, 'write: failed the content check, writing again')
        else:
            rec.update(draft=p, local=probs); rec.pop('redo', None)
            rec['stage'] = after_write(rec, course, cfg, point_of(course, pid))
            log(rec, 'write: done' + (' (still fails the content check)' if probs else '') + (', to the screen' if rec['stage'] == 'screen' else ''))
        work.put(rec)
    if rebalanced: rebalance_finish(work, rebalanced, course, repo)

def collect_chapter(work, item, r, written, at_now):
    """Saves the answer to a chapter's writing request. A point that is missing or wrong is written on its own next."""
    recs = [rec for rec in (work.load(pid) for pid in item['pids']) if rec and rec['stage'] == 'write']
    if not recs: return
    kind = r.result.type
    def alone(why, count=True):
        for rec in recs:
            if count: retry(rec, 'write', why)
            if rec['stage'] == 'write':
                rec['alone'] = True; log(rec, 'write: ' + why + ' in the chapter request, so it is written on its own next')
            work.put(rec)
    if kind != 'succeeded':
        inner = getattr(getattr(r.result, 'error', None), 'error', None)
        if kind == 'errored' and getattr(inner, 'type', '') == 'invalid_request_error': return alone('the API refused it', count=False)
        for rec in recs: retry(rec, 'write', 'the API had an error' if kind == 'errored' else 'the batch ' + kind); work.put(rec)
        return
    m = r.result.message
    charge(work, recs, m.usage, item, at_now)
    if m.stop_reason == 'refusal': return alone('Claude declined', count=False)
    data = answer_text(m)
    if data is None: return alone('the answer was cut off or not JSON')
    for rec in recs:
        try:
            written[rec['id']] = (to_bank(data[rec['id']]), 'write')
        except (KeyError, TypeError, AttributeError):
            retry(rec, 'write', 'its part of the chapter answer was missing or not in the right shape')
            if rec['stage'] == 'write':
                rec['alone'] = True; log(rec, 'write: it is written on its own next')
        work.put(rec)

def screened(rec, data, cfg):
    """Haiku's answer. A clean pass is cleared. Anything else goes to the Opus checker."""
    rec['screen'] = data
    flags, _ = flags_for(rec, data)
    if data['sensitive'] != 'none': rec['screen_sensitive'] = data['sensitive']
    if not flags and data['sure'] == 'high' and data['sensitive'] == 'none':
        rec['screen_passed'] = True
        if cfg.get('trial'):
            rec.update(stage='check', to_opus='trial'); log(rec, 'screen: passed, and checked again in this trial')
        elif spot_check(rec['id']):
            rec.update(stage='check', to_opus='spot check'); log(rec, 'screen: passed, and picked for a spot check')
        else:
            rec.update(stage='cleared', final=rec['draft'], cleared_by='screen'); log(rec, 'screen: passed, cleared')
        return
    why = 'a topic' if data['sensitive'] != 'none' else 'flagged' if flags else 'not sure'
    rec.update(stage='check', to_opus=why + ' at the screen'); log(rec, 'screen: ' + why + ', so to the check')

def checked(rec, data):
    """The Opus checker's answer."""
    rec['check'] = data
    sensitive = data['sensitive'] if data['sensitive'] != 'none' else rec.get('screen_sensitive', 'none')
    rec['sensitive'] = sensitive
    rec['flags'], concrete = flags_for(rec)
    if rec.get('screen_passed') and (rec['flags'] or data['sensitive'] != 'none'): rec['screen_missed'] = True
    if not rec['flags'] and sensitive == 'none':
        rec.update(stage='cleared', final=rec['draft'], cleared_by='checker'); log(rec, 'check: passed, cleared')
    elif concrete:
        rec['stage'] = 'fix'; log(rec, 'check: flagged')
    else:
        rec['stage'] = 'review'; log(rec, 'check: for review (' + ('not sure' if data['sure'] == 'low' else sensitive) + ')')

def retry(rec, stage, why):
    t = rec.setdefault('tries', {})
    t[stage] = t.get(stage, 0) + 1
    if t[stage] >= TRIES:
        rec.update(stage='failed', error=stage + ' failed ' + str(TRIES) + ' times: ' + why + '. Reject it with a note to try again, or edit it by hand.')
        log(rec, stage + ': gave up, ' + why)
    else:
        log(rec, stage + ': ' + why + ', will try again')


# ---------- money ----------
def rates(model, at_now):
    """Dollars per million tokens for a model: the normal price with --now, half that in a batch."""
    p, share = PRICES.get(model, PRICES[OPUS]), 1 if at_now else BATCH
    return {'in': p['in'] * share, 'out': p['out'] * share, 'cache_write': p['in'] * 1.25 * share, 'cache_read': p['cache_read']}

def points_in(item):
    return len(item.get('pids') or [item.get('pid')])

def request_tokens(api, reqs, items):
    """Input tokens for each request. With a key, the API counts up to 12 of each kind for free and the rest are
    scaled from their length. Without one, about 3.5 characters a token."""
    size = [len(json.dumps(r['params'], ensure_ascii=False)) for r in reqs]
    if api is None: return [round(s / 3.5) for s in size]
    groups = {}
    for i, r in enumerate(reqs):
        it = items[r['custom_id']]
        groups.setdefault((it['stage'], 'pids' in it, r['params']['model']), []).append(i)
    out = [0] * len(reqs)
    for idx in groups.values():
        sample = idx[:12]
        counted = 0
        for i in sample:
            p = {k: v for k, v in reqs[i]['params'].items() if k != 'max_tokens'}
            try:
                counted += api.messages.count_tokens(**p).input_tokens
            except Exception as e:
                raise api_error(e)
        per_char = counted / max(1, sum(size[i] for i in sample))
        for i in idx: out[i] = round(size[i] * per_char)
    return out

def request_costs(tokens, reqs, items, cfg, at_now):
    """Low and high cost of each request, from its input tokens and the output its step is expected to use."""
    out = []
    for t, r in zip(tokens, reqs):
        it = items[r['custom_id']]
        rate, (lo, hi) = rates(r['params']['model'], at_now), cfg[it['stage']]['out']
        n = points_in(it)
        out.append(((t * rate['in'] + n * lo * rate['out']) / 1e6, (t * rate['in'] + n * hi * rate['out']) / 1e6))
    return out


# ---------- the API ----------
def client():
    """The Anthropic client. The key comes only from the ANTHROPIC_API_KEY environment variable."""
    if not os.environ.get('ANTHROPIC_API_KEY'):
        raise Stop('ANTHROPIC_API_KEY is not set in this window. See content/README.md, step 5.')
    return make_client()

def make_client():
    try:
        import anthropic
    except ImportError:
        raise Stop('The anthropic library is not installed. Run: py -m pip install -r content\\requirements.txt (content/README.md, step 3).')
    return anthropic.Anthropic(max_retries=4)

def api_error(e):
    """A plain message for an API error, with its request id, and never the key."""
    status, msg = getattr(e, 'status_code', None), str(getattr(e, 'message', '') or e)
    rid = getattr(e, 'request_id', None)
    if status == 401: text = 'The API key was not accepted. Check it, and set it again (content/README.md, step 5).'
    elif 'usage limits' in msg: text = 'A spending limit was reached, so the API stopped. Raise the limit in the Console, or wait until it resets: ' + msg
    elif status == 429: text = ('The API\'s rate limit or batch queue is full. Everything sent so far is saved. Wait a while and run the same command again'
                                ', or lower BATCH_MOST at the top of content/pipeline.py: ' + msg)
    else: text = 'The API said no' + (' (' + str(status) + ')' if status else '') + ': ' + msg
    return Stop(scrub(text + (' Request id: ' + rid if rid else '')))

def find_sent(client, sending):
    """After a stop between sending a batch and saving it: the batch, if the API has it."""
    want = sending.get('total', len(sending['items']))
    try:
        for b in client.messages.batches.list(limit=20):
            created = b.created_at if isinstance(b.created_at, str) else b.created_at.strftime('%Y-%m-%dT%H:%M:%SZ')
            total = sum(getattr(b.request_counts, k) for k in ['processing', 'succeeded', 'errored', 'canceled', 'expired'])
            if created >= sending['before'] and total == want: return b.id
    except Exception as e:
        raise api_error(e)
    return None

def now_one(api, req):
    """Sends one request to the normal Messages API and returns its answer in the same shape as a batch result."""
    try:
        with api.messages.stream(**req['params']) as s:
            m = s.get_final_message()
        return NS(custom_id=req['custom_id'], result=NS(type='succeeded', message=m))
    except Exception as e:
        status, msg = getattr(e, 'status_code', None), str(getattr(e, 'message', '') or e)
        if status in (401, 403, 429) or 'usage limits' in msg: return e
        kind = 'invalid_request_error' if status == 400 else 'api_error'
        return NS(custom_id=req['custom_id'], result=NS(type='errored', error=NS(type='error', error=NS(type=kind, message=scrub(msg)))))


# ---------- running courses ----------
class Job:
    """One course in a run: its outline, its work folder, its settings and the most it may cost."""
    def __init__(self, repo, d, course, work, cfg, name, trial_of=None):
        self.repo, self.d, self.course, self.work, self.cfg, self.settings, self.trial_of = repo, d, course, work, cfg, name, trial_of
        self.limit, self.held, self.failed, self.start = None, None, None, work.state['spent']['usd']
        self.requests = None   # what to send in each round, if not the next steps of the run (recheck sends its own)
    @property
    def label(self): return self.course['name'] + (', trial ' + os.path.basename(self.work.dir) if self.trial_of else '')

def work_root(args, repo):
    return args.work or os.path.join(repo, 'content', 'work')

def setup(args, outline=None, as_name=None, wanted=None, repo=None, d=None):
    """Reads an outline, gives it ids, and makes its work folder and records. Returns a Job."""
    repo = repo or args.repo or REPO
    d = d or dump(repo)
    outline = outline or args.outline
    course = read_outline(outline, d)
    assign_ids(outline, course, d)
    root = work_root(args, repo)
    trial_of = None
    if as_name:
        if not re.fullmatch(r'[a-z0-9]+(-[a-z0-9]+)*', as_name) or as_name == course['id']:
            raise Stop('--as needs a new name for the trial, in lower-case words joined by dashes, such as ' + course['id'] + '-cheaper')
        trial_of = course['id']
    work = Work(root, as_name or course['id'])
    if work.existed and work.state.get('trial_of') != trial_of:
        raise Stop(('content/work/' + as_name + ' is ' + ('a trial of ' + work.state['trial_of'] if work.state.get('trial_of') else 'a course of its own') +
                    '. Pick another name for --as.') if as_name else ('content/work/' + course['id'] + ' is a trial. Run it with --as ' + course['id'] + '.'))
    saved = work.state.get('settings') or (OLD_COURSE if work.existed else None)
    name = wanted or saved or NEW_COURSE
    if name not in SETTINGS: raise Stop('--settings must be one of ' + ', '.join(SETTINGS))
    cfg = dict(SETTINGS[name], trial=bool(trial_of))
    sync(work, course, d, trial_of)
    job = Job(repo, d, course, work, cfg, name, trial_of)
    job.saved = saved
    return job

def counts(work, course):
    c = {}
    for pt in course['points']:
        s = work.load(pt['id'])['stage']
        c[s] = c.get(s, 0) + 1
    return c

STAGE_WORDS = {'match': 'waiting to be matched', 'match-review': 'a possible match, for you to review', 'write': 'waiting to be written',
               'screen': 'waiting for the Haiku screen', 'check': 'waiting to be checked', 'fix': 'waiting for a fix', 'review': 'for you to review',
               'failed': 'could not be written, for you to review', 'cleared': 'cleared', 'reuse': 'reusing a bank point'}

def stats(work, points):
    """The numbers after a run: what was written and checked, flagged, sent to the Opus checker, and what it cost."""
    recs = [r for r in (work.load(p['id']) for p in points) if r]
    written = [r for r in recs if r['stage'] != 'reuse' and (r.get('draft') or r.get('final'))]
    checked = [r for r in written if r.get('check') or r.get('screen') or r.get('cleared_by') in ('checker', 'screen')]
    opus = [r for r in written if r.get('check')]
    flagged = [r for r in checked if r.get('flags') or (r.get('sensitive') or 'none') != 'none' or r['stage'] in ('fix', 'review') or r.get('cleared_by') in ('owner', 'auto', 'recheck')]
    why = {}
    for r in opus:
        k = r.get('to_opus') or 'every point'
        k = 'flagged or not sure at the Haiku screen' if k.endswith('at the screen') or k == 'the screen did not answer' else \
            'by topic' if k == 'English course' or k.startswith('the word ') else 'checked again in the trial' if k == 'trial' else k
        why[k] = why.get(k, 0) + 1
    passed = [r for r in written if r.get('screen_passed')]
    trial_checks = sum((r.get('usd') or {}).get('check', 0) for r in written if r.get('to_opus') == 'trial')
    return {'usd': work.state['spent']['usd'], 'written': len(written), 'checked': len(checked), 'opus': len(opus), 'flagged': len(flagged), 'why': why,
            'passed': len(passed), 'missed': len([r for r in passed if r.get('screen_missed')]), 'trialChecks': round(trial_checks, 4),
            'pointUsd': {r['id']: round(sum((r.get('usd') or {}).values()), 4) for r in written if r.get('usd')}}

def share(n, of):
    return str(n) + ' of ' + str(of) + ' points checked' + (' (' + str(round(100 * n / of)) + '%)' if of else '')

def summary(job, after_run=True, stages=True):
    """Prints where each point is and the numbers for one course, after a run or for status."""
    s, w = stats(job.work, job.course['points']), job.work
    say(job.label + ' (' + job.settings + ' settings)' + (':' if stages else ''))
    if stages:
        for st, n in counts(w, job.course).items(): say('  ' + str(n), STAGE_WORDS[st])
    say('  ' + ('This run: ' + money(s['usd'] - job.start) + '. ' if after_run else '') + 'The course so far: ' + money(s['usd']) +
        (', ' + cents(s['usd'] / s['written']) + ' for each of ' + str(s['written']) + ' points written.' if s['written'] else '.'))
    if s['checked']:
        say('  Flagged for you: ' + share(s['flagged'], s['checked']) + '.')
        say('  Sent to the Opus checker: ' + share(s['opus'], s['checked']) +
            (': ' + ', '.join(str(n) + ' ' + k for k, n in sorted(s['why'].items(), key=lambda x: -x[1])) if job.cfg.get('screen') and s['why'] else '') + '.')
    for line in auto_lines(w, [r for r in (w.load(p['id']) for p in job.course['points']) if r]): say('  ' + line)
    if job.trial_of and s['passed']:
        say('  Trial: Haiku passed ' + str(s['passed']) + ' points, and Opus flagged ' + str(s['missed']) + ' of them.')
        if s['trialChecks'] and s['written']:
            plain = s['usd'] - s['trialChecks']
            say('  Without the extra Opus checks, the course so far would have cost about ' + money(plain) + ', ' + cents(plain / s['written']) + ' a point.')
    if w.state.get('pending'):
        say('  ' + money(w.state['pending']) + ' is counted as spent for requests that were still running when the run stopped.')

def settle(job):
    """Money held for --now requests still running when a run stopped counts as spent, since they may be billed."""
    st = job.work.state
    if st.get('pending'):
        say(job.label + ': counted ' + money(st['pending']) + ' as spent for requests that were still running when the last run stopped.')
        st['spent']['usd'] = round(st['spent']['usd'] + st['pending'], 4); st['pending'] = 0; job.work.save()

def guard(job, many, fn):
    """Runs one course's part. In run-many, a course that stops is set aside and the others carry on."""
    try:
        return fn()
    except Stop as e:
        if not many: raise
        job.failed = str(e)
        say(job.label + ': ' + str(e) + '\nThe other courses carry on.')

def drive(api, jobs, args, many=False):
    """Sends and collects for every course until nothing is left to send. One batch (or several, if they would be too
    big) holds every course's requests for the same round."""
    for j in jobs:
        settle(j)
        if j.saved and j.saved != j.settings: say(j.label + ': the settings change from ' + j.saved + ' to ' + j.settings + '.')
        j.work.state['settings'] = j.settings
        if j.trial_of: j.work.state['trial_of'] = j.trial_of
        j.work.save()
    try:
        while True:
            live = [j for j in jobs if not j.failed]
            for j in live:
                st = j.work.state
                if st.get('sending'):
                    bid = find_sent(api, st['sending'])
                    if bid:
                        st['batches'].append({'id': bid, 'items': st['sending']['items'], 'sent': st['sending']['before']})
                        say('Found the batch sent before the stop:', bid)
                    st['sending'] = None; j.work.save()
            if not collect_open(api, live, args, many): continue
            if any(not b.get('collected') for j in live if not j.failed for b in j.work.state['batches']):
                say('A batch is still running. Batches usually take under an hour, at most 24. Run the same command again later to collect it.')
                return finish(jobs)
            plan = []
            for j in [j for j in live if not j.held and not j.failed]:
                got = guard(j, many, j.requests or (lambda: next_requests(j.work, j.course, j.d, j.cfg)))
                if got and got[0]: plan.append((j, got[0], got[1]))
            if not plan:
                return finish(jobs, done=True)
            if args.now:
                waiting = sum(1 for j, _, _ in plan for pt in j.course['points'] if j.work.load(pt['id'])['stage'] in WAITING)
                if waiting > NOW_MOST:
                    raise Stop(str(waiting) + ' points are waiting, more than ' + str(NOW_MOST) + ' for --now. Run without --now to use batches, at half the price.')
            costed = []
            for j, reqs, items in plan:
                tokens = request_tokens(api, reqs, items)
                cost = request_costs(tokens, reqs, items, j.cfg, args.now)
                lo, hi = sum(c[0] for c in cost), sum(c[1] for c in cost)
                spent = j.work.state['spent']['usd'] + (j.work.state.get('pending') or 0)
                if spent + hi > j.limit:
                    j.held = ('Not sent: this round could cost up to ' + money(hi) + ', and ' + money(spent) + ' is spent already, which would pass ' +
                              ('its share of --max-dollars, ' if many else '--max-dollars ') + money(j.limit) + '. Raise --max-dollars to go on.')
                    if not many: raise Stop(j.held)
                    say(j.label + ': ' + j.held + ' The other courses carry on.')
                    continue
                costed.append((j, reqs, items, cost, lo, hi))
            if not costed:
                raise Stop('Nothing was sent: every course would pass its share of --max-dollars.')
            if args.now: send_now(api, costed, many)
            else: send_batches(api, costed, many)
    except KeyboardInterrupt:
        say('\nStopped. Everything so far is saved. Run the same command again to carry on.')
        finish(jobs, quiet=True)
        sys.exit(130)
    except Stop:
        if any(j.work.state['spent']['usd'] > j.start for j in jobs): finish(jobs, quiet=True)
        raise

def collect_open(api, jobs, args, many):
    """Collects every batch that has ended. Returns False after waiting, so the loop looks again."""
    open_ids = []
    for j in jobs:
        for b in j.work.state['batches']:
            if not b.get('collected') and b['id'] not in open_ids: open_ids.append(b['id'])
    running = False
    for bid in open_ids:
        try:
            info = api.messages.batches.retrieve(bid)
            if info.processing_status != 'ended': running = True; continue
            results = list(api.messages.batches.results(bid))
        except Exception as e:
            raise api_error(e)
        for j in jobs:
            for b in j.work.state['batches']:
                if b['id'] != bid or b.get('collected'): continue
                mine = [r for r in results if r.custom_id in b['items']]
                def go():
                    collect(j.work, j.course, j.d, b, mine, j.repo, j.cfg)
                    b['collected'] = True; j.work.save()
                    say('Collected', many_of(len(mine), 'answer') + (' for ' + j.label if many else '') + '. Spent so far' + (' on it' if many else '') + ':', money(j.work.state['spent']['usd']))
                guard(j, many, go)
    if running and not args.no_wait:
        say('Waiting for the batch (checking every', POLL_SECONDS, 'seconds). You can stop with Ctrl+C and run the same command later.')
        time.sleep(POLL_SECONDS)
        return False
    return True

def sent_counts(work, items):
    for it in items.values():
        for pid in it.get('pids') or [it['pid']]:
            rec = work.load(pid); s = rec.setdefault('sent', {}); s[it['stage']] = s.get(it['stage'], 0) + 1; work.put(rec)

def stage_words(items):
    stages = {}
    for it in items.values():
        k = 'chapter write' if 'pids' in it else it['stage']
        stages[k] = stages.get(k, 0) + 1
    return ', '.join(str(n) + ' ' + s for s, n in stages.items())

def send_batches(api, costed, many):
    """Sends the round as batches: every course's requests together, split when a batch would be too big."""
    queue_ = [(j, r) for j, reqs, _, _, _, _ in costed for r in reqs]
    chunks, cur, size = [], [], 0
    for j, r in queue_:
        n = len(json.dumps(r, ensure_ascii=False).encode('utf-8'))
        if cur and (len(cur) >= BATCH_MOST or size + n > BATCH_BYTES): chunks.append(cur); cur, size = [], 0
        cur.append((j, r)); size += n
    if cur: chunks.append(cur)
    for j, reqs, items, cost, lo, hi in costed:
        j.round, j.items = (lo, hi), items
    for chunk in chunks:
        mine = {}
        for j, r in chunk: mine.setdefault(id(j), (j, {}))[1][r['custom_id']] = j.items[r['custom_id']]
        for j, its in mine.values():
            j.work.state['sending'] = {'before': now(), 'items': its, 'total': len(chunk)}; j.work.save()
        try:
            b = api.messages.batches.create(requests=[r for _, r in chunk])
        except Exception as e:
            for j, _ in mine.values(): j.work.state['sending'] = None; j.work.save()
            raise api_error(e)
        for j, its in mine.values():
            entry = {'id': b.id, 'items': its, 'sent': now()}
            if len(mine) > 1: entry['shared'] = len(mine)
            j.work.state['batches'].append(entry); j.work.state['sending'] = None; j.work.save()
            sent_counts(j.work, its)
        if many:
            say('Sent', many_of(len(chunk), 'request'), 'for', many_of(len(mine), 'course'), 'in batch', b.id + ':')
            for j, its in mine.values(): say(' ', j.label + ':', stage_words(its))
        else:
            j, its = next(iter(mine.values()))
            say('Sent', many_of(len(chunk), 'request'), '(' + stage_words(its) + '), expected', money(j.round[0]), 'to', money(j.round[1]) + '. Batch', b.id)
    if many:
        lo, hi = sum(c[4] for c in costed), sum(c[5] for c in costed)
        say('Expected for this round:', money(lo), 'to', money(hi) + '.')

def send_now(api, costed, many):
    """Sends the round to the normal Messages API, NOW_PARALLEL at a time, and saves each answer as it arrives. While a
    request runs, its high cost counts as spent, so --max-dollars holds even if the run stops part way."""
    jobs_in, todo, done = queue.Queue(), [], queue.Queue()
    for j, reqs, items, cost, lo, hi in costed:
        j.work.state['pending'] = round((j.work.state.get('pending') or 0) + hi, 4); j.work.save()
        sent_counts(j.work, items)
        for r, c in zip(reqs, cost): todo.append((j, r, items[r['custom_id']], c[1]))
        say('Sending', many_of(len(reqs), 'request') + (' for ' + j.label if many else '') + ' (' + stage_words(items) + ') with --now, expected', money(lo), 'to', money(hi) + '.')
    for t in todo: jobs_in.put(t)
    def worker():
        while True:
            try: t = jobs_in.get_nowait()
            except queue.Empty: return
            done.put((t, now_one(api, t[1])))
    def unsent():
        # Takes back the requests no worker has started, so they are not counted as spent. Returns how many.
        n = 0
        while True:
            try: jj, _, _, h = jobs_in.get_nowait()
            except queue.Empty: return n
            jj.work.state['pending'] = max(0, round(jj.work.state['pending'] - h, 4)); jj.work.save(); n += 1
    for _ in range(min(NOW_PARALLEL, len(todo))): threading.Thread(target=worker, daemon=True).start()
    expected, got, stop = len(todo), 0, None
    try:
        while got < expected:
            try: (j, r, item, hi), res = done.get(timeout=0.5)
            except queue.Empty: continue
            got += 1
            j.work.state['pending'] = max(0, round(j.work.state['pending'] - hi, 4))
            if isinstance(res, Exception):
                # Stop sending more, but keep the answers to requests already running, since they are billed.
                stop = stop or res
                expected -= unsent(); j.work.save()
                continue
            guard(j, many, lambda: collect(j.work, j.course, j.d, {'items': {r['custom_id']: item}}, [res], j.repo, j.cfg, at_now=True))
            j.work.save()
    except KeyboardInterrupt:
        unsent()
        raise
    if stop: raise api_error(stop)
    for j, *_ in costed:
        j.work.state['pending'] = 0; j.work.save()
        say('Collected the answers' + (' for ' + j.label if many else '') + '. Spent so far:', money(j.work.state['spent']['usd']))

def finish(jobs, done=False, quiet=False):
    """The end of a run: where each point is, and the numbers, for each course."""
    if done: say('Done for now.')
    for j in jobs:
        if len(jobs) > 1: say('')
        summary(j, stages=not quiet)
        if j.failed: say('  Stopped: ' + j.failed)
        elif j.held: say('  Held back: ' + j.held)
    if done and not quiet:
        say('Next: py content\\pipeline.py review' + (' (a trial shows on its Compare tab)' if any(j.trial_of for j in jobs) else ''))


# ---------- the estimate ----------
def plan_left(job):
    """What is left to send for a course: {step: ([requests low, high, points low, high], a sample request)}."""
    course, d, cfg, work = job.course, job.d, job.cfg, job.work
    ex = d['banks']['e'][EXAMPLES[1]]
    reqs, items = next_requests(work, course, d, cfg)
    in_chapter = {pid for it in items.values() for pid in it.get('pids', [])}
    stand = lambda rec: dict(rec, draft=rec.get('draft') or ex, flags=rec.get('flags') or ['A problem the checker found.'])
    left, samples = {}, {}
    def add(step, n_lo, n_hi=None, pts=1):
        a = left.setdefault(step, [0, 0, 0, 0]); n_hi = n_lo if n_hi is None else n_hi
        a[0] += n_lo; a[1] += n_hi; a[2] += n_lo * pts; a[3] += n_hi * pts
    for r in reqs:
        it = items[r['custom_id']]
        if 'pids' in it:
            add('chapter', 1, pts=len(it['pids'])); samples.setdefault('chapter', r)
    written, ahead, screened = 0, 0, 0
    for pt in course['points']:
        rec = work.load(pt['id']); s = rec['stage']
        if s not in WAITING: continue
        if s == 'match':
            add('match', 1)
            if 'match' not in samples: samples['match'] = request('match', course, pt, rec, d, 'x', cfg, candidates(course, d, pt))
        if s in ('match', 'write'):
            written += 1
            if s == 'match' or pt['id'] not in in_chapter:
                add('write', 1)
                if 'write' not in samples: samples['write'] = request('write', course, pt, stand(rec), d, 'x', cfg)
        if s in ('match', 'write', 'screen', 'check'): ahead += 1
        if s in ('match', 'write', 'screen'):
            if cfg.get('screen') and course['kind'] != 'english' and not SENSITIVE.search(pt['title'] + ' ' + pt['brief']): screened += 1
            else: add('check', 1)
        if s == 'check': add('check', 1)
        if s == 'fix': add('fix', 1)
        for st in ('screen', 'check', 'fix'):
            if st not in samples and cfg.get(st): samples[st] = request(st, course, pt, stand(rec), d, 'x', cfg)
    if 'write' not in samples:
        pt = course['points'][0]; samples['write'] = request('write', course, pt, {'id': pt['id']}, d, 'x', cfg)
    if round(written * REDO_SHARE): add('write', round(written * REDO_SHARE))
    if screened:
        add('screen', screened)
        st = stats(work, course['points'])
        if cfg.get('trial'): lo = hi = screened
        elif st['checked'] >= 5: lo = hi = round(screened * st['opus'] / st['checked'])
        else: lo, hi = round(screened * TO_OPUS[0]), round(screened * TO_OPUS[1])
        add('check', lo, hi)
    if ahead: add('fix', round(ahead * FIX_SHARE[0]), round(ahead * FIX_SHARE[1]))
    return {k: (left[k], samples[k]) for k in STEP_NAMES if k in left and left[k][1]}

STEP_NAMES = {'match': 'match', 'chapter': 'write, a chapter at a time', 'write': 'write, one point at a time', 'screen': 'screen', 'check': 'check', 'fix': 'fix'}

def estimate(job, api, quiet=False):
    """Low and high cost of the rest of a course, with batches and with --now. Prints each step unless quiet."""
    left = plan_left(job)
    if not left:
        if not quiet: say('Nothing is left to send for', job.label + '. Spent so far:', money(job.work.state['spent']['usd']))
        return (0, 0, 0, 0)
    if not quiet: say(job.label + ' (' + job.settings + ' settings):')
    tot = [0, 0, 0, 0]
    for step, ((n_lo, n_hi, p_lo, p_hi), sample) in left.items():
        key = 'write' if step == 'chapter' else step
        s = job.cfg[key]
        item = {'stage': key}
        if step == 'chapter': item['pids'] = ['x'] * max(1, round(p_hi / max(1, n_hi)))
        per = request_tokens(api, [sample], {sample['custom_id']: item})[0]
        for i, at_now in enumerate([False, True]):
            r = rates(s['model'], at_now)
            tot[2 * i] += (n_lo * per * r['in'] + p_lo * s['out'][0] * r['out']) / 1e6
            tot[2 * i + 1] += (n_hi * per * r['in'] + p_hi * s['out'][1] * r['out']) / 1e6
        if not quiet:
            n = str(n_lo) if n_lo == n_hi else str(n_lo) + ' to ' + str(n_hi)
            say('  ' + STEP_NAMES[step] + ':', n, ('request' if n == '1' else 'requests') + (' for ' + str(p_hi) + ' points' if step == 'chapter' else '') + ',',
                MODEL_NAMES.get(s['model'], s['model']) + ', ' + s['effort'] + ' effort, about', format(per, ','), 'tokens in each')
    return tuple(tot)

def say_totals(name, tot, exact, spent=None):
    say('Estimate for the rest of', name + ':' + ('' if exact else ' (rough: set the API key for an exact count of the prompts)'))
    say('  With batches (the default):', money(tot[0]), 'to', money(tot[1]) + '. Each step is one batch, usually under an hour, at most 24.')
    say('  With --now:', money(tot[2]), 'to', money(tot[3]) + '. Usually a few minutes for a small course (at most ' + str(NOW_MOST) + ' points).')
    if spent is not None:
        say('Spent so far:', money(spent) + '. Thinking is billed as output and is the uncertain part, so plan for the high number.')


# ---------- the commands ----------
def cmd_status(args):
    job = setup(args, as_name=args.as_name)
    say(job.label + ':', len(job.course['points']), 'points, on the', job.settings, 'settings' + (' (not saved until the first run)' if not job.work.existed else '') + '.')
    summary(job, after_run=False)
    open_b = [b for b in job.work.state['batches'] if not b.get('collected')]
    if open_b: say(' ', many_of(len(open_b), 'batch'), 'sent and not collected yet. Run the run command again to collect it.')

def cmd_estimate(args):
    paths = outline_paths(args.outline)
    if args.as_name and len(paths) > 1: raise Stop('--as works with one outline only.')
    exact = bool(os.environ.get('ANTHROPIC_API_KEY'))
    api = client() if exact else None
    repo = args.repo or REPO; d = dump(repo)
    total, spent = [0, 0, 0, 0], 0
    for p in paths:
        job = setup(args, p, args.as_name, args.settings, repo, d)
        tot = estimate(job, api)
        if any(tot):
            if len(paths) == 1: say_totals(job.label, tot, exact, job.work.state['spent']['usd'])
            else: say('  With batches:', money(tot[0]), 'to', money(tot[1]) + '. With --now:', money(tot[2]), 'to', money(tot[3]) + '.')
        total = [a + b for a, b in zip(total, tot)]; spent += job.work.state['spent']['usd']
    if len(paths) > 1: say_totals('all ' + str(len(paths)) + ' courses', total, exact, spent)

def cmd_run(args):
    if args.max_dollars is None:
        raise Stop('Add --max-dollars, the most this course may cost in total, counting what earlier runs spent. For example: --max-dollars 5')
    job = setup(args, as_name=args.as_name, wanted=args.settings)
    api = client()
    job.limit = args.max_dollars
    drive(api, [job], args)

def shares(jobs, highs, limit):
    """Each course's share of --max-dollars: what it has spent, plus the rest of the money split by how much each
    course could still cost at most."""
    spent = sum(j.work.state['spent']['usd'] for j in jobs)
    rest, need = max(0, limit - spent), sum(highs)
    return [j.work.state['spent']['usd'] + (rest * h / need if need else 0) for j, h in zip(jobs, highs)]

def cmd_run_many(args):
    if args.max_dollars is None:
        raise Stop('Add --max-dollars, the most all these courses may cost together in total, counting what earlier runs spent. For example: --max-dollars 20')
    repo = args.repo or REPO; d = dump(repo)
    api = client()
    jobs = []
    for p in outline_paths(args.outline):
        try:
            jobs.append(setup(args, p, None, args.settings, repo, d))
        except Stop as e:
            say(p + ': ' + str(e) + '\nThe other courses carry on.')
    if not jobs: raise Stop('No course could be read.')
    ids = [j.course['id'] for j in jobs]
    for i in set(x for x in ids if ids.count(x) > 1): raise Stop('Two outlines have the id ' + i + '.')
    say('The combined estimate, before anything is sent:')
    highs, total = [], [0, 0, 0, 0]
    for j in jobs:
        tot = estimate(j, api)
        if any(tot): say('  With batches:', money(tot[0]), 'to', money(tot[1]) + '. With --now:', money(tot[2]), 'to', money(tot[3]) + '.')
        highs.append(tot[3] if args.now else tot[1]); total = [a + b for a, b in zip(total, tot)]
    say_totals('all ' + str(len(jobs)) + ' courses', total, True, sum(j.work.state['spent']['usd'] for j in jobs))
    for j, s in zip(jobs, shares(jobs, highs, args.max_dollars)):
        j.limit = s
        say('  ' + j.label + ': its share of --max-dollars is ' + money(s) + ', counting the ' + money(j.work.state['spent']['usd']) + ' spent already.')
    drive(api, jobs, args, many=True)


# ---------- publishing ----------
def js(data, indent=0, width=118):
    """Data as JavaScript, readable: a list or object that fits on one line stays on one line."""
    flat = json.dumps(data, ensure_ascii=False, separators=(', ', ': '))
    if not isinstance(data, (list, dict)) or len(flat) + indent <= width: return flat
    pad = ' ' * (indent + 2)
    if isinstance(data, list): parts = [pad + js(v, indent + 2, width) for v in data]
    else: parts = [pad + json.dumps(k, ensure_ascii=False) + ': ' + js(v, indent + 2, width) for k, v in data.items()]
    return ('[' if isinstance(data, list) else '{') + '\n' + ',\n'.join(parts) + '\n' + ' ' * indent + (']' if isinstance(data, list) else '}')

def replace_block(text, start, end, body, path):
    a, b = text.find(start), text.find(end)
    if a < 0 or b < a: raise Stop(path + ' has lost its markers: ' + start + ' and ' + end)
    return text[:a + len(start)] + '\n' + body + text[b:]

def sql_blocks(repo):
    """Writes the made courses' lines into week.sql and challenges.sql, from what is in src/ now."""
    d = dump(repo)
    pts = [i for name in sorted(d['banks']) if name != 'e' for i in d['banks'][name]]
    rows = [(c['id'], ch['id'], min(8, 2 * len(ch['points']))) for c in d['courses'] for u in c['units'] for ch in u['chapters'] if ch['points']]
    week = ''
    if pts:
        week = ('insert into public.week_points (pid, maths) values\n' + ',\n'.join('  (\'' + i + '\', false)' for i in pts) +
                '\non conflict (pid) do nothing;\n')
    chal = ''
    if rows:
        chal = ('insert into public.challenge_chapters (ch, course, total, per_q_ms) values\n' +
                ',\n'.join('  (\'' + ch + '\', \'' + cid + '\', ' + str(n) + ', 1500)' for cid, ch, n in rows) +
                '\non conflict (ch) do update set course = excluded.course, total = excluded.total, per_q_ms = excluded.per_q_ms;\n')
    for name, start, end, body in [('week.sql', '-- made points start', '-- made points end', week),
                                   ('challenges.sql', '-- made chapters start', '-- made chapters end', chal)]:
        path = os.path.join(repo, 'supabase', name)
        with open(path, encoding='utf-8') as f: text = f.read()
        write_text(path, replace_block(text, start, end, body, path))

def cmd_publish(args):
    job = setup(args)
    repo, d, course, work = job.repo, job.d, job.course, job.work
    recs = {pt['id']: work.load(pt['id']) for pt in course['points']}
    units, ready, held = [], 0, []
    for u in course['units']:
        chs = []
        for c in u['chapters']:
            done = all(recs[p['id']]['stage'] in ('cleared', 'reuse') for p in c['points'])
            ids = [recs[p['id']].get('reuse') or p['id'] for p in c['points']] if done else []
            if done and ids: ready += 1
            elif c['points']: held.append(c['title'])
            chs.append({'id': c['id'], 'title': c['title'], 'check': 'checked', 'points': ids})
        units.append({'title': u['title'], 'chapters': chs})
    if not ready:
        raise Stop('No chapter is ready: every point in a chapter must be cleared before it goes in. Run the run command, then review.')
    bank_name = course['bank']
    bank = dict(d['banks'].get(bank_name, {}))
    # A point this course published before but no longer lists (its chapter is held back again) leaves the bank,
    # unless another course lists it.
    listed = {pid for u in units for c in u['chapters'] for pid in c['points']}
    for pid in [p['id'] for p in course['points']]:
        if pid in bank and pid not in listed and not [x for x in d['used'].get(pid, []) if x['course'] != course['id']]: del bank[pid]
    for u in units:
        for c in u['chapters']:
            for pid in c['points']:
                if recs.get(pid) and recs[pid]['stage'] == 'cleared': bank[pid] = recs[pid]['final']
    chips = course['chips'] or [p['title'].lower() for p in course['points'] if recs[p['id']]['stage'] == 'cleared'][:5]
    data = {'id': course['id'], 'course': course['subject'], 'year': year_text(course['years']), 'name': course['name'], 'short': course['short'] or course['subject'],
            'note': course['note'], 'place': course['place'], 'kind': course['kind'], 'years': course['years'], 'chips': chips,
            'row': {'name': course['name'], 'about': course['about']}, 'units': units}
    write_text(os.path.join(repo, 'src', 'bank', bank_name + '.js'),
               '/* The ' + bank_name + ' bank: points made by the content pipeline. Written by python3 content/pipeline.py publish.\n'
               '   Do not edit it by hand: change a point through the review page and publish again (content/README.md).\n'
               '   Each point has the same parts as in econ-points.js. In every question the correct answer is opts[0]. */\n'
               'MADE_BANKS.' + bank_name + ' = ' + js(bank) + ';\n')
    write_text(os.path.join(repo, 'src', 'courses', course['id'] + '.js'),
               '/* ' + course['name'] + ' (' + course['about'] + '). Made by the content pipeline from content/outlines/' + course['id'] + '.yaml.\n'
               '   Written by python3 content/pipeline.py publish. Do not edit it by hand. A chapter with no points is still\n'
               '   being reviewed, and shows on Home as Coming soon. */\n'
               'MADE_COURSES.push(' + js(data) + ');\n')
    sql_blocks(repo)
    out = subprocess.run(['node', 'check_content.mjs'], cwd=repo, capture_output=True, text=True, encoding='utf-8')
    say('Published', course['name'] + ':', ready, 'chapters ready' + ('. Held back as Coming soon: ' + ', '.join(held) if held else '') + '.')
    say('Wrote src/bank/' + bank_name + '.js, src/courses/' + course['id'] + '.js, and the made lines in supabase/week.sql and supabase/challenges.sql.')
    if out.returncode != 0:
        raise Stop('node check_content.mjs found problems:\n' + out.stdout[-3000:] + out.stderr[-2000:])
    say('node check_content.mjs: no problems found. Next: python3 build.py, the tests, then a pull request (content/README.md, step 9).')
    work.state['published'] = now(); work.save()




# ---------- autoreview: clearing safe flagged points with the checker's fix ----------
def auto_path(work):
    return os.path.join(work.dir, 'autoreview.json')

def auto_state(work):
    """autoreview.json: how many automatic decisions the course has had, which picks the spot checks, and the owner's
    answer to each spot check. It is kept apart from state.json, so a run and the review page never write over each other."""
    return read_json(auto_path(work), {'decided': 0, 'spot_answers': []})

def auto_answer(work, pid, action):
    """Saves the owner's decision on a spot check."""
    st = auto_state(work)
    st['spot_answers'].append({'id': pid, 'action': action, 'at': now()})
    write_json(auto_path(work), st)

def auto_problems(rec):
    """Why a flagged point must stay with the owner. An empty list means autoreview may clear it with the checker's fix,
    once the fix passes the content check again."""
    if rec.get('auto_undone'): return ['you undid its automatic decision']
    c, p, draft = rec.get('check'), rec.get('proposal'), rec.get('draft')
    if not c or not draft: return ['not checked']
    norm = lambda s: re.sub(r'\s+', ' ', s.strip().lower())
    why = []
    if (rec.get('sensitive') or 'none') != 'none': why.append('a sensitive topic')
    if c['sure'] != 'high': why.append('the checker was not highly sure')
    for k in ['a', 'b']:
        if norm(c[k]['best']) != norm(draft[k]['opts'][0]): why.append('the checker picked another answer')
        if any(norm(o) != norm(c[k]['best']) for o in c[k]['also_right']): why.append('another option could also be right')
    for pr in c['problems']:
        if pr['kind'] not in AUTO_SAFE_KINDS: why.append({'fact': 'a possible factual error', 'level': 'a problem with the level'}.get(pr['kind'], 'a ' + pr['kind'] + ' problem'))
        elif AUTO_UNSAFE_WORDS.search(pr['detail']): why.append('a problem uses a word like wrong or error')
    if not p: why.append('no fix')
    else:
        if rec.get('proposal_problems'): why.append('the fix fails the content check')
        if any(norm(p[k]['opts'][0]) != norm(draft[k]['opts'][0]) for k in ['a', 'b']): why.append('the fix changes a right answer')
    return list(dict.fromkeys(why))

def auto_parts(rec):
    """The problems a decision was made on, in a few words: card wording, remember other."""
    return ', '.join(pr['part'] + ' ' + pr['kind'] for pr in rec['check']['problems']) or 'the content check'

def auto_courses(args, root):
    """The work folders autoreview looks at: the outlines named, or every course in the work folder. Trials are left out."""
    if args.outline:
        ids = []
        for path in outline_paths(args.outline):
            if not os.path.exists(path): raise Stop('No outline at ' + path)
            yaml, text = load_yaml(path)
            try:
                o = yaml.safe_load(text)
            except yaml.YAMLError:
                o = None
            if not isinstance(o, dict) or not isinstance(o.get('id'), str): raise Stop(path + ' has no id line, so its work folder cannot be found.')
            ids.append(o['id'])
    else:
        ids = sorted(os.listdir(root)) if os.path.isdir(root) else []
    out = []
    for cid in ids:
        meta = read_json(os.path.join(root, cid, 'course.json'))
        if not meta:
            if args.outline: say(cid + ': no work folder yet, so nothing to review. Run the run command first.')
            continue
        if meta.get('trial_of'): continue
        out.append((Work(root, cid), meta))
    return out

def meta_recs(work, meta):
    """Every point's record in a course, in the outline's order."""
    return [r for r in (work.load(pt['id']) for u in meta['units'] for c in u['chapters'] for pt in c['points']) if r]

def auto_lines(work, recs):
    """Lines for a course's summary: what autoreview cleared, the spot checks, and a warning if the owner rejected one."""
    out = []
    by = lambda r: (r.get('auto') or {}).get('by', 'autoreview')
    done = [r for r in recs if r.get('cleared_by') == 'auto']
    spots = [r for r in recs if r['stage'] == 'review' and (r.get('auto') or {}).get('spot') and by(r) == 'autoreview']
    if done or spots:
        out.append('Cleared automatically with the checker\'s fix: ' + str(len(done)) + '. Spot checks waiting for you: ' + str(len(spots)) + '.')
    out += recheck_lines(recs)
    out += rebalance_lines(recs)
    answers = auto_state(work)['spot_answers']
    if answers:
        words = {'fix': 'used the fix', 'approve': 'approved as written', 'edit': 'edited', 'reject': 'rejected'}
        tally = {}
        for a in answers: tally[a['action']] = tally.get(a['action'], 0) + 1
        out.append('Spot checks you decided: ' + str(len(answers)) + ' (' + ', '.join(words.get(k, k) + ' ' + str(n) for k, n in tally.items()) + ').')
        rejected = list(dict.fromkeys(a['id'] for a in answers if a['action'] == 'reject'))
        if rejected:
            out.append('Warning: you rejected ' + many_of(len(rejected), 'spot check') + ' (' + ', '.join(rejected) + '), so the automatic decisions '
                       'may not hold up. Look over the points cleared automatically, or send them all back to you with autoreview --undo.')
    return out

def auto_replay(recs):
    """For the dry run: how these rules would have decided the points the owner already reviewed with a fix to pick."""
    seen = [r for r in recs if r.get('cleared_by') == 'owner' and r.get('check') and r.get('proposal') and not r.get('auto')]
    if not seen: return []
    choice = lambda r: 'edited' if r.get('edited') else 'used the fix' if r['final'] == r['proposal'] else 'approved as written'
    would = [r for r in seen if not auto_problems(r)]
    out = ['Points you already reviewed that had a fix: ' + str(len(seen)) + '. These rules would have cleared ' + str(len(would)) + ' of them.']
    if would:
        tally = {}
        for r in would: tally[choice(r)] = tally.get(choice(r), 0) + 1
        out.append('  Of those ' + str(len(would)) + ', you ' + ', '.join(k + ' on ' + str(n) for k, n in tally.items()) + '.')
    for r in seen:
        if r in would: out.append('  ' + r['id'] + ': would clear (' + auto_parts(r) + '). You ' + choice(r) + '.')
        else: out.append('  ' + r['id'] + ': would stay for you (' + '; '.join(auto_problems(r)) + '). You ' + choice(r) + '.')
    return out

def autoreview(work, meta, repo, dry):
    """Clears the safe flagged points of one course with the checker's fix, keeping 1 in AUTO_SPOT_EVERY as spot checks."""
    recs = meta_recs(work, meta)
    waiting = [r for r in recs if r['stage'] == 'review' and not (r.get('auto') or {}).get('spot')]
    held = {r['id']: auto_problems(r) for r in waiting}
    ok = [r for r in waiting if not held[r['id']]]
    # The fix passed the content check when it was written. It runs again, in case the check has changed since.
    probs = check_points({r['id']: r['proposal'] for r in ok}, meta['kind'], repo, work.dir, meta.get('subject'))
    st = auto_state(work)
    n, cleared, spots = st['decided'], [], []
    for r in ok:
        if probs.get(r['id']):
            held[r['id']] = ['the fix fails the content check']
            if not dry: r['proposal_problems'] = probs[r['id']]; work.put(r)
            continue
        n += 1
        spot = (n - 1) % AUTO_SPOT_EVERY == 0
        (spots if spot else cleared).append(r)
        if dry: continue
        r['auto'] = {'at': now(), 'rules': AUTO_RULES, 'n': n, 'decision': 'used the fix', 'spot': spot, 'sure': r['check']['sure'],
                     'problems': r['check']['problems'], 'flags': r.get('flags') or []}
        if spot:
            log(r, 'autoreview: picked as a spot check. It would have been cleared with the fix (' + auto_parts(r) + ')')
        else:
            r.update(stage='cleared', final=r['proposal'], cleared_by='auto'); log(r, 'autoreview: cleared with the fix (' + auto_parts(r) + ')')
        work.put(r)
    if not dry and (cleared or spots):
        st['decided'] = n; write_json(auto_path(work), st)
    say(meta['name'] + ' (' + meta['id'] + '):')
    say('  ' + ('Would clear' if dry else 'Cleared') + ' automatically with the checker\'s fix: ' + str(len(cleared)) + '.')
    for r in cleared: say('    ' + r['id'] + ' (' + auto_parts(r) + ')')
    say('  ' + ('Would keep' if dry else 'Kept') + ' for you as spot checks (1 in ' + str(AUTO_SPOT_EVERY) + '): ' + str(len(spots)) + '.')
    for r in spots: say('    ' + r['id'] + ' (' + auto_parts(r) + ')')
    reasons, left = {}, 0
    for r in recs:
        if r in spots or r['stage'] == 'review' and (r.get('auto') or {}).get('spot'): why = ['a spot check']
        elif r['stage'] == 'review' and held.get(r['id']): why = held[r['id']]
        elif r['stage'] == 'failed': why = ['not written']
        elif r['stage'] == 'match-review': why = ['a possible match in the bank']
        else: continue
        left += 1
        for w in why: reasons[w] = reasons.get(w, 0) + 1
    say('  Left for you in the review list' + (' after this' if dry else '') + ': ' + str(left) + '.' + (' Why (a point can have more than one reason):' if reasons else ''))
    for w, k in sorted(reasons.items(), key=lambda x: -x[1]): say('    ' + w + ': ' + str(k))
    later = len([r for r in recs if r['stage'] in WAITING])
    if later: say('  Not checked yet: ' + str(later) + '. Run autoreview again after the run finishes.')
    for line in auto_lines(work, recs): say('  ' + line)
    if dry:
        for line in auto_replay(recs): say('  ' + line)

def auto_undo(work, meta, point, dry):
    """Sends points autoreview or recheck cleared back to the review list. They are never cleared automatically again."""
    recs = [r for r in meta_recs(work, meta) if r.get('cleared_by') in ('auto', 'recheck') and (not point or r['id'] == point)]
    if point and not recs: raise Stop(point + ' was not cleared automatically in ' + meta['name'] + '.')
    say(meta['name'] + ' (' + meta['id'] + '): ' + str(len(recs)) + (' would go' if dry else ' went') + ' back to the review list.')
    for r in recs:
        say('    ' + r['id'])
        if dry: continue
        r['auto_undone'] = dict(r.pop('auto'), undone=now())
        r['stage'] = 'review'; r.pop('final', None); r.pop('cleared_by', None)
        log(r, 'autoreview: undone, back to the review list')
        work.put(r)
    if recs and not dry:
        say('  If this course was published, run publish again: a chapter with a point waiting for you shows as Coming soon until you clear it.')

def cmd_autoreview(args):
    repo = args.repo or REPO
    root = work_root(args, repo)
    if args.point and not args.undo: raise Stop('--point works with --undo.')
    courses = auto_courses(args, root)
    if args.point and len(courses) != 1: raise Stop('--point needs the one outline its point is in.')
    if not courses:
        say('No courses to review in ' + root + '. Run the run command first.'); return
    if args.dry_run: say('Dry run: nothing is changed.')
    for i, (work, meta) in enumerate(courses):
        if i: say('')
        if args.undo: auto_undo(work, meta, args.point, args.dry_run)
        else: autoreview(work, meta, repo, args.dry_run)
    if not args.dry_run and not args.undo: say('\nNext: py content\\pipeline.py review')


# ---------- recheck: a fresh Opus check of each fix waiting for the owner ----------
def recheck_skip(rec):
    """Why a point waiting for the owner is not rechecked, or None if its fix can be sent for a fresh check."""
    if rec['stage'] != 'review': return 'not waiting for you'
    if (rec.get('auto') or {}).get('spot'): return 'a spot check'
    if rec.get('auto_undone'): return 'you undid its automatic decision'
    if any(s and s != 'none' for s in [rec.get('sensitive'), (rec.get('check') or {}).get('sensitive'), rec.get('screen_sensitive')]): return 'a sensitive topic'
    if rec.get('recheck'): return 'rechecked already'
    if not rec.get('check') or not rec.get('proposal'): return 'no fix'
    if rec.get('proposal_problems'): return 'the fix fails the content check'
    if not auto_problems(rec): return 'autoreview can clear it, with no API call'
    return None

def recheck_why(p, c):
    """Why a fresh check of the fix p keeps it with the owner. An empty list means the check agrees with the fix on every count."""
    norm = lambda s: re.sub(r'\s+', ' ', s.strip().lower())
    why = []
    if c['sensitive'] != 'none': why.append('the fresh check named a sensitive topic')
    if c['sure'] != 'high': why.append('the fresh check was not highly sure')
    for k in ['a', 'b']:
        if norm(c[k]['best']) != norm(p[k]['opts'][0]): why.append('the fresh check picked another answer')
        if any(norm(o) != norm(c[k]['best']) for o in c[k]['also_right']): why.append('the fresh check says another option could also be right')
    if c['problems']: why.append('the fresh check found a problem')
    return list(dict.fromkeys(why))

def recheck_requests(job):
    """A check request for the fix of every point that can be rechecked. The checker gets the fix as if it were a
    new point: never the first draft, the first check's problems or the right answers."""
    out, items = [], {}
    nb = len(job.work.state['batches'])
    for pt in job.course['points']:
        rec = job.work.load(pt['id'])
        if not rec or recheck_skip(rec): continue
        n = rec.get('sent', {}).get('recheck', 0)
        cid = 'r_' + hashlib.sha1((job.course['id'] + pt['id'] + 'recheck' + str(n) + str(nb)).encode()).hexdigest()[:24]
        out.append(request('check', job.course, pt, {'id': rec['id'], 'draft': rec['proposal']}, None, cid, job.cfg))
        items[cid] = {'pid': pt['id'], 'stage': 'recheck', 'model': job.cfg['check']['model']}
    return out, items

def recheck_collect(work, item, r, at_now):
    """Saves the fresh check of one fix. If it agrees with the fix on every count, the point is cleared with the fix,
    apart from 1 in AUTO_SPOT_EVERY, which stays with the owner as a spot check."""
    rec = work.load(item['pid'])
    if rec is None: return
    kind = r.result.type
    if kind == 'succeeded': charge(work, [rec], r.result.message.usage, item, at_now)
    # Decided while the batch ran: the money counts, but the answer is not used.
    if rec['stage'] != 'review' or not rec.get('proposal') or rec.get('recheck'): return work.put(rec)
    def keep(why, data=None):
        rec['recheck'] = {'at': now(), 'result': 'kept', 'why': why}
        if data: rec['recheck'].update(check=data, flags=flags_for({'draft': rec['proposal']}, data)[0])
        log(rec, 'recheck: kept for you (' + '; '.join(why) + ')'); work.put(rec)
    m = r.result.message if kind == 'succeeded' else None
    if m and m.stop_reason == 'refusal': return keep(['the fresh check declined to answer'])
    data = answer_text(m) if m else None
    if data is None:
        t = rec['recheck_tries'] = rec.get('recheck_tries', 0) + 1
        if t >= TRIES: return keep(['the fresh check failed ' + str(TRIES) + ' times'])
        log(rec, 'recheck: ' + ('the answer was cut off or not JSON' if m else 'the API had an error' if kind == 'errored' else 'the batch ' + kind) + ', will try again')
        return work.put(rec)
    why = recheck_why(rec['proposal'], data)
    if why: return keep(why, data)
    st = auto_state(work)
    n = st['rechecked'] = st.get('rechecked', 0) + 1
    spot = (n - 1) % AUTO_SPOT_EVERY == 0
    write_json(auto_path(work), st)
    rec['recheck'] = {'at': now(), 'result': 'spot check' if spot else 'cleared', 'why': [], 'check': data, 'flags': []}
    rec['auto'] = {'at': now(), 'rules': AUTO_RULES, 'by': 'recheck', 'n': n, 'decision': 'used the fix', 'spot': spot, 'sure': data['sure'],
                   'problems': rec['check']['problems'], 'flags': rec.get('flags') or []}
    if spot:
        log(rec, 'recheck: the fresh check agreed with the fix, and it was picked as a spot check')
    else:
        rec.update(stage='cleared', final=rec['proposal'], cleared_by='recheck'); log(rec, 'recheck: the fresh check agreed with the fix, cleared with the fix')
    work.put(rec)

def recheck_lines(recs):
    """Lines for a course's summary: what the fresh checks of the fixes decided."""
    done = [r for r in recs if r.get('recheck')]
    if not done: return []
    tally = lambda res: len([r for r in done if r['recheck']['result'] == res])
    spots = [r for r in done if r['stage'] == 'review' and (r.get('auto') or {}).get('spot')]
    out = ['Fixes rechecked: ' + str(len(done)) + '. Cleared with the fix: ' + str(tally('cleared')) + '. Spot checks waiting for you: ' + str(len(spots)) +
           '. Kept for you: ' + str(tally('kept')) + '.']
    why = {}
    for r in done:
        for w in r['recheck']['why']: why[w] = why.get(w, 0) + 1
    if why: out.append('Kept for you because (a point can have more than one reason):')
    out += ['  ' + w + ': ' + str(n) for w, n in sorted(why.items(), key=lambda x: -x[1])]
    return out

def run_open(work):
    """True while a run's batch, not a recheck's or a rebalance's, is sent and not collected yet."""
    open_ = [b['items'] for b in work.state['batches'] if not b.get('collected')] + ([work.state['sending']['items']] if work.state.get('sending') else [])
    return any(it['stage'] not in ('recheck', 'rebalance', 'rebalance-check') for its in open_ for it in its.values())

def outline_syllabus(cid, args, repo):
    """The syllabus line from a course's outline, for a work folder whose course.json is from before it was saved there."""
    paths = (outline_paths(args.outline) if args.outline else []) + [os.path.join(repo, 'content', 'outlines', cid + '.yaml')]
    for path in paths:
        if not os.path.exists(path): continue
        yaml, text = load_yaml(path)
        try:
            o = yaml.safe_load(text)
        except yaml.YAMLError:
            continue
        if isinstance(o, dict) and o.get('id') == cid: return o.get('syllabus')
    return None

def recheck_job(work, meta, args, repo):
    """A Job for one course's recheck, from its work folder: the checker is told the course and chapter as before."""
    course = dict(meta, points=[pt for u in meta['units'] for c in u['chapters'] for pt in c['points']])
    if 'syllabus' not in meta: course['syllabus'] = outline_syllabus(meta['id'], args, repo)
    name = work.state.get('settings') or OLD_COURSE
    cfg = dict(SETTINGS[name], trial=False)
    cfg['recheck'] = cfg['check']
    job = Job(repo, None, course, work, cfg, name)
    job.saved, job.requests = name, lambda: recheck_requests(job)
    return job

def cmd_recheck(args):
    if args.max_dollars is None and not args.dry_run:
        raise Stop('Add --max-dollars, the most these courses may cost in total, counting what earlier runs spent. '
                   'Run it with --dry-run first to see what is spent so far and what the recheck would cost.')
    repo = args.repo or REPO
    root = work_root(args, repo)
    courses = auto_courses(args, root)
    if not courses:
        say('No courses to recheck in ' + root + '. Run the run command first.'); return
    if args.dry_run: say('Dry run: nothing is sent or changed.')
    exact = bool(os.environ.get('ANTHROPIC_API_KEY'))
    api = client() if exact or not args.dry_run else None
    jobs, highs, total = [], [], [0, 0]
    for i, (work, meta) in enumerate(courses):
        if i: say('')
        say(meta['name'] + ' (' + meta['id'] + '):')
        if run_open(work):
            say('  A run\'s batch is still open. Run the run command to collect it, then recheck.'); continue
        job = recheck_job(work, meta, args, repo)
        # The fix passed the content check when it was written. It runs again, in case the check has changed since.
        recs = [work.load(pt['id']) for pt in job.course['points']]
        ready = [r for r in recs if r and not recheck_skip(r)]
        probs = check_points({r['id']: r['proposal'] for r in ready}, meta['kind'], repo, work.dir, meta.get('subject'))
        for r in ready:
            if probs.get(r['id']) and not args.dry_run: r['proposal_problems'] = probs[r['id']]; work.put(r)
        reqs, items = job.requests()
        if args.dry_run: reqs = [q for q in reqs if not probs.get(items[q['custom_id']]['pid'])]
        skipped = {}
        for r in recs:
            why = 'the fix fails the content check' if r and probs.get(r['id']) else recheck_skip(r) if r else None
            if r and r['stage'] == 'review' and why: skipped[why] = skipped.get(why, 0) + 1
        say('  Fixes to recheck: ' + str(len(reqs)) + '.')
        for q in reqs: say('    ' + items[q['custom_id']]['pid'])
        if skipped:
            say('  Not rechecked, and left for you:')
            for w, n in sorted(skipped.items(), key=lambda x: -x[1]): say('    ' + w + ': ' + str(n))
        open_ = any(not b.get('collected') for b in work.state['batches']) or work.state.get('sending')
        if open_: say('  A recheck batch sent before is still open. It is collected first.')
        if not reqs and not open_: continue
        lo = hi = 0
        if reqs:
            cost = request_costs(request_tokens(api, reqs, items), reqs, items, job.cfg, False)
            lo, hi = sum(c[0] for c in cost), sum(c[1] for c in cost)
            say('  Estimate' + ('' if exact else ' (rough: set the API key for an exact count of the prompts)') + ': ' + money(lo) + ' to ' + money(hi) +
                ', in one batch, ' + MODEL_NAMES.get(job.cfg['check']['model'], job.cfg['check']['model']) + ', ' + job.cfg['check']['effort'] + ' effort.')
        say('  Spent on this course so far: ' + money(work.state['spent']['usd']) + '.')
        jobs.append(job); highs.append(hi); total = [total[0] + lo, total[1] + hi]
    if len(jobs) > 1: say('\nEstimate for all ' + str(len(jobs)) + ' courses: ' + money(total[0]) + ' to ' + money(total[1]) + '.')
    if not jobs:
        say('\nNothing to recheck.'); return
    if args.dry_run: return
    if len(jobs) == 1: jobs[0].limit = args.max_dollars
    else:
        for j, s_ in zip(jobs, shares(jobs, highs, args.max_dollars)):
            j.limit = s_
            say('  ' + j.label + ': its share of --max-dollars is ' + money(s_) + ', counting the ' + money(j.work.state['spent']['usd']) + ' spent already.')
    say('')
    drive(api, jobs, args, many=len(jobs) > 1)


# ---------- rebalance: wrong options as long and detailed as the right one ----------
def clearly_longest(opts):
    """True when the right option (the first) is longer than every wrong option and at least LONG_MARGIN characters
    longer than their average, so a student could pick it by its length alone."""
    n, rest = len(opts[0]), [len(o) for o in opts[1:]]
    return n > max(rest) and n - sum(rest) / len(rest) >= LONG_MARGIN

def rebalance_qs(p):
    """The questions of a point whose right option is clearly the longest: a, b, both or neither."""
    return [k for k in ('a', 'b') if clearly_longest(p[k]['opts'])]

def rebalance_skip(rec):
    """Why a point is not rebalanced, or None if it can be (or its rewrite is waiting for the check). Only a point with a
    question that needs it is asked about."""
    if rec['stage'] != 'cleared' or not rec.get('final'): return 'not cleared yet, so it is decided on the review page first'
    rb = rec.get('rebalance')
    if rb and rb['result'] == 'checking': return None
    if rb: return 'rebalanced already'
    # You approved a sensitive point as written, so its options are not changed without you.
    if (rec.get('sensitive') or 'none') != 'none': return 'a sensitive topic'
    return None

def rebalance_needs(rec):
    """The questions of a point that need rebalancing, from the version students get (or will get, once it is cleared)."""
    p = rec.get('final') or rec.get('proposal') or rec.get('draft')
    return rebalance_qs(p) if p and rec['stage'] != 'reuse' else []

def rebalance_range(right):
    """The lengths a new wrong option may have: from 4 characters shorter than the right option to 4 longer, at most 60.
    Three wrong options in it are never clearly shorter on average. The request also asks for one at least as long as the
    right option, so across a course the right option stops being the longest more often than chance."""
    n = len(right)
    return max(1, n - 4), min(60, n + 4)

def rebalance_user(course, pt, p, ks):
    card = '\n'.join('- ' + (l[0] + ': ' + l[1] if isinstance(l, list) else l) for l in p['card'])
    parts = [context(course, pt), '', 'Rewrite the wrong options of ' + ('question ' + ks[0] if len(ks) == 1 else 'both questions') + ' of this point.',
             '', 'Title: ' + p['title'], 'Card:', card, 'Remember: ' + p['remember']]
    for k in ks:
        q = p[k]
        lo, hi = rebalance_range(q['opts'][0])
        parts += ['', 'Question ' + k + ': ' + q['q'], 'Right option, ' + str(len(q['opts'][0])) + ' characters (keep it as it is): ' + q['opts'][0], 'Wrong options now:']
        parts += ['- ' + o + ' (' + str(len(o)) + ' characters)' for o in q['opts'][1:]]
        parts += ['Why: ' + q['why'], 'Clue: ' + q['clue'], 'Write each new wrong option in ' + str(lo) + ' to ' + str(hi) + ' characters. '
                  'Make at least one of them as long as the right option or longer.']
    return '\n'.join(parts)

def rebalance_check_request(job, pt, rec, draft, n, nb):
    """A check of a point with its new options, sent to the course's checker as if it were a new point: never told the
    old options or that anything was rewritten."""
    cid = 'k_' + hashlib.sha1((job.course['id'] + pt['id'] + 'rebalance-check' + str(n) + str(nb)).encode()).hexdigest()[:24]
    req = request('check', job.course, pt, {'id': rec['id'], 'draft': draft}, None, cid, job.cfg)
    return req, {'pid': pt['id'], 'stage': 'rebalance-check', 'model': job.cfg['check']['model']}

def rebalance_requests(job, guess=False):
    """A rewrite for every cleared point with a question whose right option is clearly the longest, and a check for every
    rewrite that passed the content check. With guess, for the estimate: also the check each rewrite will need, made
    from the point as it is now, which is about the same size."""
    out, items = [], {}
    nb = len(job.work.state['batches'])
    for pt in job.course['points']:
        rec = job.work.load(pt['id'])
        if not rec or rebalance_skip(rec): continue
        rb = rec.get('rebalance')
        if rb:
            req, it = rebalance_check_request(job, pt, rec, rb['new'], rec.get('sent', {}).get('rebalance-check', 0), nb)
            out.append(req); items[req['custom_id']] = it
            continue
        ks = rebalance_qs(rec['final'])
        if not ks: continue
        n = rec.get('sent', {}).get('rebalance', 0)
        cid = 'b_' + hashlib.sha1((job.course['id'] + pt['id'] + 'rebalance' + str(n) + str(nb)).encode()).hexdigest()[:24]
        user = rebalance_user(job.course, pt, rec['final'], ks)
        out.append({'custom_id': cid, 'params': params('rebalance', job.cfg, prompt('rebalance.md'), user, obj({k: WRONG for k in ks}), MAX_TOKENS['rebalance'])})
        items[cid] = {'pid': pt['id'], 'stage': 'rebalance', 'model': job.cfg['rebalance']['model'], 'ks': ks}
        if guess:
            req, it = rebalance_check_request(job, pt, rec, rec['final'], 0, nb)
            out.append(req); items[req['custom_id']] = it
    return out, items

def rebalance_keep(work, rec, why, check=None):
    """The point keeps its old options, with the reason. A rewrite the check turned down is kept in the file too."""
    rb = rec.get('rebalance') or {}
    rec['rebalance'] = {'at': now(), 'result': 'kept', 'changed': [], 'why': rb.get('why', []) + why}
    if rb.get('new'): rec['rebalance'].update(tried=rb['new'], check=check)
    log(rec, 'rebalance: kept its old options (' + '; '.join(why) + ')'); work.put(rec)

def rebalance_collect(work, item, r, at_now, rebalanced):
    """Reads the new wrong options for one point. Each question takes them only if they are three different options
    and the right option is no longer clearly the longest. The content check then runs on every point at once, in
    rebalance_finish."""
    rec = work.load(item['pid'])
    if rec is None: return
    kind = r.result.type
    if kind == 'succeeded': charge(work, [rec], r.result.message.usage, item, at_now)
    if rebalance_skip(rec) or rec.get('rebalance'): return work.put(rec)
    m = r.result.message if kind == 'succeeded' else None
    if m and m.stop_reason == 'refusal': return rebalance_keep(work, rec, ['Claude declined to rewrite them'])
    data = answer_text(m) if m else None
    if not isinstance(data, dict):
        t = rec['rebalance_tries'] = rec.get('rebalance_tries', 0) + 1
        if t >= TRIES: return rebalance_keep(work, rec, ['the rewrite failed ' + str(TRIES) + ' times'])
        log(rec, 'rebalance: ' + ('the answer was cut off or not JSON' if m else 'the API had an error' if kind == 'errored' else 'the batch ' + kind) + ', will try again')
        return work.put(rec)
    norm = lambda s: re.sub(r'\s+', ' ', s.strip().lower())
    old, new, changed, why = rec['final'], json.loads(json.dumps(rec['final'])), [], []
    for k in item['ks']:
        wrong = (data.get(k) or {}).get('wrong') if isinstance(data.get(k), dict) else None
        if not isinstance(wrong, list) or len(wrong) != 3 or not all(isinstance(w, str) and w.strip() for w in wrong):
            why.append('question ' + k + ': the answer was not three wrong options'); continue
        # The question and the right option are copied from the old version, so they can never change.
        opts = [old[k]['opts'][0]] + [w.strip() for w in wrong]
        if len({norm(o) for o in opts}) < 4:
            why.append('question ' + k + ': two options were the same'); continue
        if clearly_longest(opts):
            why.append('question ' + k + ': the right option was still clearly the longest'); continue
        new[k]['opts'] = opts; changed.append(k)
    rebalanced[rec['id']] = (new, changed, why)
    work.put(rec)

def rebalance_finish(work, rebalanced, course, repo):
    """Runs the content check on the rebalanced points. A point that fails keeps its old options. One that passes waits
    for the checker (rebalance_check_collect), which decides whether it gets the new ones."""
    probs = check_points({pid: new for pid, (new, changed, _) in rebalanced.items() if changed}, course['kind'], repo, work.dir, course.get('subject'))
    for pid, (new, changed, why) in rebalanced.items():
        rec = work.load(pid)
        if changed and probs.get(pid):
            why, changed = why + ['the new options failed the content check: ' + '; '.join(probs[pid])], []
        if not changed:
            rebalance_keep(work, rec, why); continue
        rec['rebalance'] = {'at': now(), 'result': 'checking', 'changed': changed, 'why': why, 'new': new}
        log(rec, 'rebalance: new wrong options for question ' + ' and '.join(changed) + ', waiting for the check' + (' (' + '; '.join(why) + ')' if why else ''))
        work.put(rec)

def rebalance_check_collect(work, item, r, at_now):
    """The checker's answer on a point with its new options. They are used only if the check picks the right answer to
    both questions, finds nothing else right, no problems and no sensitive topic, and is highly sure. Anything else keeps
    the old options, with the reason."""
    rec = work.load(item['pid'])
    if rec is None: return
    kind = r.result.type
    if kind == 'succeeded': charge(work, [rec], r.result.message.usage, item, at_now)
    rb = rec.get('rebalance')
    if rec['stage'] != 'cleared' or not rb or rb['result'] != 'checking': return work.put(rec)
    m = r.result.message if kind == 'succeeded' else None
    if m and m.stop_reason == 'refusal': return rebalance_keep(work, rec, ['the check declined to answer'])
    data = answer_text(m) if m else None
    if data is None:
        t = rec['rebalance_tries'] = rec.get('rebalance_tries', 0) + 1
        if t >= TRIES: return rebalance_keep(work, rec, ['the check failed ' + str(TRIES) + ' times'])
        log(rec, 'rebalance check: ' + ('the answer was cut off or not JSON' if m else 'the API had an error' if kind == 'errored' else 'the batch ' + kind) + ', will try again')
        return work.put(rec)
    why = [w.replace('the fresh check', 'the check') for w in recheck_why(rb['new'], data)]
    if why: return rebalance_keep(work, rec, why, data)
    rec['rebalance'] = {'at': now(), 'result': 'changed', 'changed': rb['changed'], 'why': rb['why'], 'check': data,
                        'old': {k: rec['final'][k]['opts'] for k in rb['changed']}}
    rec['final'] = rb['new']
    log(rec, 'rebalance: the check agreed, new wrong options used for question ' + ' and '.join(rb['changed']))
    work.put(rec)

def rebalance_lines(recs):
    """Lines for a course's summary: what rebalance changed and what it left as it was."""
    done = [r for r in recs if r.get('rebalance')]
    if not done: return []
    changed = [r for r in done if r['rebalance']['result'] == 'changed']
    waiting = len([r for r in done if r['rebalance']['result'] == 'checking'])
    out = ['Rebalanced: ' + many_of(sum(len(r['rebalance']['changed']) for r in changed), 'question') + ' in ' + many_of(len(changed), 'point') +
           '. Kept their old options: ' + str(len(done) - len(changed) - waiting) + '.' + (' Waiting for the check: ' + str(waiting) + '.' if waiting else '')]
    why = {}
    for r in done:
        if r['rebalance']['result'] == 'checking': continue
        for w in r['rebalance']['why']:
            w = re.sub(r'^question [ab]: ', '', w); w = w.split(': ')[0] if w.startswith('the new options failed') else w
            why[w] = why.get(w, 0) + 1
    if why: out.append('Not rebalanced because (a point can have more than one reason):')
    out += ['  ' + w + ': ' + str(n) for w, n in sorted(why.items(), key=lambda x: -x[1])]
    return out

def rebalance_job(work, meta, args, repo):
    """A Job for one course's rebalance, from its work folder."""
    course = dict(meta, points=[pt for u in meta['units'] for c in u['chapters'] for pt in c['points']])
    if 'syllabus' not in meta: course['syllabus'] = outline_syllabus(meta['id'], args, repo)
    name = work.state.get('settings') or OLD_COURSE
    cfg = dict(SETTINGS[name], trial=False, rebalance=REBALANCE)
    cfg['rebalance-check'] = cfg['check']
    job = Job(repo, None, course, work, cfg, name)
    job.saved, job.requests = name, lambda: rebalance_requests(job)
    return job

def up_cents(usd):
    """Dollars rounded up to the cent, for a number to pass to --max-dollars."""
    return '{:.2f}'.format(-(-round(usd * 1e6) // 10000) / 100)

def cmd_rebalance(args):
    if args.max_dollars is None and args.max_new_dollars is None and not args.dry_run:
        raise Stop('Add --max-new-dollars, the most this rebalance may spend, or --max-dollars, the most these courses may cost in total, '
                   'counting what earlier runs spent. Run it with --dry-run first to see the estimate.')
    repo = args.repo or REPO
    root = work_root(args, repo)
    courses = auto_courses(args, root)
    if not courses:
        say('No courses to rebalance in ' + root + '. Run the run command first.'); return
    if args.dry_run: say('Dry run: nothing is sent or changed.')
    exact = bool(os.environ.get('ANTHROPIC_API_KEY'))
    api = client() if exact or not args.dry_run else None
    jobs, highs, total = [], [], [0, 0]
    for i, (work, meta) in enumerate(courses):
        if i: say('')
        say(meta['name'] + ' (' + meta['id'] + '):')
        if run_open(work):
            say('  A run\'s batch is still open. Run the run command to collect it, then rebalance.'); continue
        job = rebalance_job(work, meta, args, repo)
        recs = [r for r in (work.load(pt['id']) for pt in job.course['points']) if r]
        reqs, items = rebalance_requests(job, guess=True)
        rewrites = [items[q['custom_id']] for q in reqs if items[q['custom_id']]['stage'] == 'rebalance']
        waiting = [r['id'] for r in recs if (r.get('rebalance') or {}).get('result') == 'checking']
        say('  Questions where the right option is clearly the longest: ' + str(sum(len(it['ks']) for it in rewrites)) + ', in ' + many_of(len(rewrites), 'point') + '.')
        for it in rewrites: say('    ' + it['pid'] + ' (question ' + ' and '.join(it['ks']) + ')')
        if waiting:
            say('  Rewritten already, waiting for the check: ' + str(len(waiting)) + '.')
            for pid in waiting: say('    ' + pid)
        skipped = {}
        for r in recs:
            why = rebalance_skip(r) if rebalance_needs(r) else None
            if why: skipped[why] = skipped.get(why, 0) + 1
        if skipped:
            say('  Not rebalanced:')
            for w, n in sorted(skipped.items(), key=lambda x: -x[1]): say('    ' + w + ': ' + str(n))
        open_ = any(not b.get('collected') for b in work.state['batches']) or work.state.get('sending')
        if open_: say('  A batch sent before is still open. It is collected first.')
        if not reqs and not open_: continue
        lo = hi = 0
        if reqs:
            cost = request_costs(request_tokens(api, reqs, items), reqs, items, job.cfg, False)
            part = lambda stage: [c for q, c in zip(reqs, cost) if items[q['custom_id']]['stage'] == stage]
            lo, hi = sum(c[0] for c in cost), sum(c[1] for c in cost)
            say('  Estimate' + ('' if exact else ' (rough: set the API key for an exact count of the prompts)') + ': ' + money(lo) + ' to ' + money(hi) + ', in batches.')
            rw, ck = part('rebalance'), part('rebalance-check')
            if rw: say('    Rewrites: ' + money(sum(c[0] for c in rw)) + ' to ' + money(sum(c[1] for c in rw)) + ', ' +
                       MODEL_NAMES[REBALANCE['model']] + ', ' + REBALANCE['effort'] + ' effort.')
            say('    Checks: ' + money(sum(c[0] for c in ck)) + ' to ' + money(sum(c[1] for c in ck)) + ', ' + MODEL_NAMES[job.cfg['check']['model']] + ', ' +
                job.cfg['check']['effort'] + ' effort, at most one for each point' + (' (counted as if every rewrite passes the content check)' if rw else '') + '.')
        say('  Spent on this course so far: ' + money(work.state['spent']['usd']) + '.')
        jobs.append(job); highs.append(hi); total = [total[0] + lo, total[1] + hi]
    if len(jobs) > 1: say('\nEstimate for all ' + str(len(jobs)) + ' courses: ' + money(total[0]) + ' to ' + money(total[1]) + '.')
    if not jobs:
        say('\nNothing to rebalance.'); return
    spent = sum(j.work.state['spent']['usd'] for j in jobs)
    say(('\n' if len(jobs) > 1 else '') + 'Spent on ' + ('these courses' if len(jobs) > 1 else 'this course') + ' so far: ' + money(spent) +
        '. --max-dollars counts that. To allow up to the highest estimate, pass --max-new-dollars ' + up_cents(total[1]) +
        ', which is the same as --max-dollars ' + up_cents(spent + total[1]) + '.')
    if args.dry_run: return
    limit = args.max_dollars if args.max_dollars is not None else spent + args.max_new_dollars
    if spent + total[1] > limit:
        raise Stop('Not sent: the rewrites and their checks could cost up to ' + money(total[1]) + ', and only ' + money(max(0, limit - spent)) +
                   ' is left under the limit. Raise it to go on, so no rewrite is paid for without its check.')
    if len(jobs) == 1: jobs[0].limit = limit
    else:
        for j, s_ in zip(jobs, shares(jobs, highs, limit)):
            j.limit = s_
            say('  ' + j.label + ': it may spend up to ' + money(s_ - j.work.state['spent']['usd']) + ' more.')
    say('')
    drive(api, jobs, args, many=len(jobs) > 1)
    if any((r.get('rebalance') or {}).get('result') == 'changed' for j in jobs for r in (j.work.load(pt['id']) for pt in j.course['points']) if r):
        say('Next: publish each course again, so the new options go into src/ (content/README.md, step 9).')


# ---------- the review page ----------
def review_items(root, repo):
    """Every point waiting for the owner, in every course in the work folder. Trials are left out: they never publish."""
    d = dump(repo)
    courses, items = [], []
    for cid in sorted(os.listdir(root)) if os.path.isdir(root) else []:
        meta = read_json(os.path.join(root, cid, 'course.json'))
        if not meta or meta.get('trial_of'): continue
        work = Work(root, cid)
        tally = {}
        for ui, u in enumerate(meta['units']):
            for ci, c in enumerate(u['chapters']):
                for pt in c['points']:
                    rec = work.load(pt['id'])
                    if not rec: continue
                    tally[rec['stage']] = tally.get(rec['stage'], 0) + 1
                    if rec['stage'] not in ('review', 'match-review', 'failed'): continue
                    match = rec.get('match') or {}
                    items.append({'course': cid, 'courseName': meta['name'], 'unit': 'Unit ' + str(ui + 1) + ': ' + u['title'],
                                  'chapter': 'Chapter ' + str(ci + 1) + ': ' + c['title'], 'id': rec['id'], 'title': pt['title'], 'brief': pt['brief'],
                                  'stage': rec['stage'], 'draft': rec.get('draft'), 'proposal': rec.get('proposal'),
                                  'proposalProblems': rec.get('proposal_problems') or [], 'flags': rec.get('flags') or [],
                                  'summary': (rec.get('check') or {}).get('summary'), 'sure': (rec.get('check') or {}).get('sure'),
                                  'sensitive': rec.get('sensitive'), 'local': rec.get('local') or [], 'error': rec.get('error'),
                                  'spot': bool(rec['stage'] == 'review' and (rec.get('auto') or {}).get('spot')),
                                  'spotBy': (rec.get('auto') or {}).get('by', 'autoreview'),
                                  'recheck': recheck_item(rec.get('recheck')),
                                  'match': dict(match, point=bank_point(d, match['same'])) if match.get('same') else None})
        courses.append({'id': cid, 'name': meta['name'], 'counts': tally})
    return {'courses': courses, 'items': items, 'trials': len(trials(root))}

def recheck_item(rc):
    """What the review page shows of a fresh check of the fix."""
    if not rc: return None
    c = rc.get('check') or {}
    return {'result': rc['result'], 'why': rc['why'], 'flags': rc.get('flags') or [], 'summary': c.get('summary'), 'sure': c.get('sure')}

def decide(root, repo, body):
    """Saves one decision from the review page. Returns {ok, message, problems}."""
    cid, pid, action = body.get('course'), body.get('id'), body.get('action')
    if not cid or cid not in os.listdir(root) or not re.fullmatch(r'[a-z0-9-]+', pid or ''): return {'ok': False, 'message': 'Unknown point.'}
    meta = read_json(os.path.join(root, cid, 'course.json'))
    if not meta or meta.get('trial_of'): return {'ok': False, 'message': 'A trial is for comparing only. Nothing in it is reviewed or published.'}
    work = Work(root, cid)
    rec = work.load(pid)
    if not rec or rec['stage'] not in ('review', 'match-review', 'failed'): return {'ok': False, 'message': 'This point is not waiting for review.'}
    spot = rec['stage'] == 'review' and (rec.get('auto') or {}).get('spot')
    def done(text):
        if spot and rec.get('auto'): rec['auto']['owner'] = action
        log(rec, 'review: ' + text + (' (a spot check)' if spot else '')); work.put(rec)
        if spot: auto_answer(work, pid, action)
        return {'ok': True, 'message': text}
    if rec['stage'] == 'match-review':
        if action == 'reuse':
            rec.update(stage='reuse', reuse=rec['match']['same']); return done('reusing ' + rec['match']['same'])
        if action == 'reject':
            rec.update(stage='write', match_rejected=True); return done('match rejected, to be written')
        return {'ok': False, 'message': 'Reuse or reject this match.'}
    if action == 'approve':
        if not rec.get('draft'): return {'ok': False, 'message': 'There is nothing written to approve. Edit it, or reject it with a note.'}
        if rec.get('local'): return {'ok': False, 'message': 'This version fails the content check. Use Edit to fix it first.', 'problems': rec['local']}
        rec.update(stage='cleared', final=rec['draft'], cleared_by='owner'); return done('approved as written')
    if action == 'fix':
        if not rec.get('proposal'): return {'ok': False, 'message': 'There is no suggested fix.'}
        if rec.get('proposal_problems'): return {'ok': False, 'message': 'The fix fails the content check. Use Edit to fix it first.', 'problems': rec['proposal_problems']}
        rec.update(stage='cleared', final=rec['proposal'], cleared_by='owner'); return done('approved with the fix')
    if action == 'edit':
        p = body.get('point')
        try:
            p = {'title': p['title'], 'card': p['card'], 'remember': p['remember'], 'a': {k: p['a'][k] for k in ['q', 'opts', 'why', 'clue']},
                 'b': {k: p['b'][k] for k in ['d', 'q', 'opts', 'why', 'clue']}}
        except (KeyError, TypeError):
            return {'ok': False, 'message': 'The edited point is missing a part.'}
        probs = check_points({pid: p}, meta['kind'], repo, work.dir, meta.get('subject')).get(pid, [])
        if probs: return {'ok': False, 'message': 'The content check found problems. Fix them and save again.', 'problems': probs}
        rec.update(stage='cleared', final=p, cleared_by='owner', edited=True); return done('edited and approved')
    if action == 'reject':
        note = (body.get('note') or '').strip()[:1000]
        rejected = rec.get('draft')
        for k in DRAFT_KEYS: rec.pop(k, None)
        rec.update(stage='write', note=note, rejected=rejected)
        return done('rejected, to be written again' + (' with a note' if note else ''))
    return {'ok': False, 'message': 'Unknown action.'}

def trials(root):
    """The trial folders whose course has a work folder too: [(trial name, its course.json, the course's course.json)]."""
    out = []
    for name in sorted(os.listdir(root)) if os.path.isdir(root) else []:
        meta = read_json(os.path.join(root, name, 'course.json'))
        if not meta or not meta.get('trial_of'): continue
        base = read_json(os.path.join(root, meta['trial_of'], 'course.json'))
        if base and not base.get('trial_of'): out.append((name, meta, base))
    return out

def side(rec):
    """One run's version of a point, for the Compare tab."""
    if not rec or rec['stage'] == 'reuse': return None
    p = rec.get('final') or rec.get('proposal') or rec.get('draft')
    return {'point': p, 'which': 'final' if rec.get('final') else 'the fix' if rec.get('proposal') else 'draft', 'stage': STAGE_WORDS.get(rec['stage'], rec['stage']),
            'clearedBy': rec.get('cleared_by'), 'flags': rec.get('flags') or [], 'summary': (rec.get('check') or {}).get('summary'),
            'screen': (rec.get('screen') or {}).get('summary'), 'screenPassed': bool(rec.get('screen_passed')), 'toOpus': rec.get('to_opus'),
            'usd': round(sum((rec.get('usd') or {}).values()), 4) if rec.get('usd') else None}

def compare_items(root):
    """Every trial next to its course: each point's two versions, the numbers for both runs, and the owner's picks."""
    out = []
    for name, meta, base in trials(root):
        A, B = Work(root, meta['trial_of']), Work(root, name)
        picks = read_json(os.path.join(B.dir, 'compare.json'), {})
        pts = [dict(pt, chapter='Chapter ' + str(ci + 1) + ': ' + c['title']) for u in meta['units'] for ci, c in enumerate(u['chapters']) for pt in c['points']]
        pairs = [{'id': pt['id'], 'title': pt['title'], 'chapter': pt['chapter'], 'a': side(A.load(pt['id'])), 'b': side(B.load(pt['id'])), 'pick': picks.get(pt['id'])}
                 for pt in pts]
        num = lambda w, s: dict({k: v for k, v in stats(w, pts).items() if k != 'pointUsd'}, settings=w.state.get('settings') or (OLD_COURSE if w.existed else NEW_COURSE))
        out.append({'trial': name, 'base': meta['trial_of'], 'name': base['name'], 'a': num(A, 'a'), 'b': num(B, 'b'), 'pairs': pairs})
    return {'trials': out}

def pick(root, body):
    """Saves the owner's pick for one point on the Compare tab: a (the course), b (the trial), same, or none."""
    name, pid, choice = body.get('trial'), body.get('id'), body.get('pick')
    found = [t for t in trials(root) if t[0] == name]
    if not found or choice not in ('a', 'b', 'same', None): return {'ok': False, 'message': 'Unknown trial or pick.'}
    if pid not in {pt['id'] for u in found[0][1]['units'] for c in u['chapters'] for pt in c['points']}: return {'ok': False, 'message': 'Unknown point.'}
    path = os.path.join(root, name, 'compare.json')
    picks = read_json(path, {})
    if choice: picks[pid] = choice
    else: picks.pop(pid, None)
    write_json(path, picks)
    return {'ok': True}

def review_server(root, repo, port):
    token = secrets.token_urlsafe(24)
    with open(os.path.join(HERE, 'review', 'index.html'), encoding='utf-8') as f: page = f.read().replace('{{TOKEN}}', token)
    class Handler(http.server.BaseHTTPRequestHandler):
        def log_message(self, *a): pass
        def allowed(self):
            # Only this computer, and only this page: the Host must be this server, and each change carries the
            # page's token, so another website open in the browser cannot change anything.
            host = (self.headers.get('Host') or '').split(':')[0]
            return host in ('127.0.0.1', 'localhost')
        def send(self, code, body, kind='application/json'):
            data = body.encode('utf-8') if isinstance(body, str) else json.dumps(body, ensure_ascii=False).encode('utf-8')
            self.send_response(code)
            self.send_header('Content-Type', kind + '; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.end_headers(); self.wfile.write(data)
        def do_GET(self):
            if not self.allowed(): return self.send(403, {'ok': False})
            path = urllib.parse.urlparse(self.path).path
            if path == '/': return self.send(200, page, 'text/html')
            if path in ('/api/items', '/api/compare'):
                if self.headers.get('X-Review-Token') != token: return self.send(403, {'ok': False})
                try: return self.send(200, review_items(root, repo) if path == '/api/items' else compare_items(root))
                except Stop as e: return self.send(500, {'ok': False, 'message': str(e)})
            self.send(404, {'ok': False})
        def do_POST(self):
            if not self.allowed() or self.headers.get('X-Review-Token') != token: return self.send(403, {'ok': False, 'message': 'Refused.'})
            path = urllib.parse.urlparse(self.path).path
            if path not in ('/api/decide', '/api/pick'): return self.send(404, {'ok': False})
            try:
                body = json.loads(self.rfile.read(min(int(self.headers.get('Content-Length') or 0), 200000)).decode('utf-8'))
                return self.send(200, decide(root, repo, body) if path == '/api/decide' else pick(root, body))
            except (ValueError, Stop) as e:
                return self.send(400, {'ok': False, 'message': str(e)})
    return http.server.HTTPServer(('127.0.0.1', port), Handler)

def cmd_review(args):
    repo = args.repo or REPO
    root = work_root(args, repo)
    server = review_server(root, repo, args.port)
    url = 'http://localhost:' + str(server.server_address[1]) + '/'
    say('The review page is at', url, '(only on this computer). Leave this window open while you review, and press Ctrl+C to stop.')
    if not args.no_browser:
        import webbrowser
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        say('\nStopped the review page. Your decisions are saved.')


def main(argv=None):
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    ap = argparse.ArgumentParser(prog='pipeline.py', description='The Stratos content pipeline. See content/README.md.')
    ap.add_argument('--work', help=argparse.SUPPRESS)
    ap.add_argument('--repo', help=argparse.SUPPRESS)
    sub = ap.add_subparsers(dest='cmd', required=True)
    settings = 'which settings to use: ' + ', '.join(SETTINGS) + '. A course keeps the ones it started with unless you name others'
    for name, text in [('estimate', 'what the rest of a course (or several) will cost'), ('status', 'where each point is, with no API calls'),
                       ('run', 'write and check the points'), ('run-many', 'write and check several courses, sharing each batch'),
                       ('publish', 'write the cleared points into src/')]:
        s = sub.add_parser(name, help=text)
        s.add_argument('outline', nargs='+' if name in ('estimate', 'run-many') else None,
                       help='outline files, or folders of them' if name in ('estimate', 'run-many') else 'the outline file')
        if name in ('estimate', 'run', 'status'):
            s.add_argument('--as', dest='as_name', help='a trial: run the outline again under this name, to compare on the review page')
        if name in ('estimate', 'run', 'run-many'):
            s.add_argument('--settings', choices=list(SETTINGS), help=settings)
        if name in ('run', 'run-many'):
            s.add_argument('--max-dollars', type=float, help='the most this course (with run-many, all of them together) may cost in total, counting earlier runs')
            s.add_argument('--now', action='store_true', help='send to the normal API instead of batches: done in minutes, at twice the price')
            s.add_argument('--no-wait', action='store_true', help='send or collect once, then stop instead of waiting for a batch')
    a = sub.add_parser('autoreview', help='clear safe flagged points with the checker\'s fix, with no API calls')
    a.add_argument('outline', nargs='*', help='outline files, or folders of them. With none, every course in content/work')
    a.add_argument('--dry-run', action='store_true', help='show what it would do, and change nothing')
    a.add_argument('--undo', action='store_true', help='send the points it cleared back to the review list')
    a.add_argument('--point', help='with --undo, only this point id')
    rc = sub.add_parser('recheck', help='send each fix waiting for you to the Opus checker as a fresh check, and clear it if the check agrees')
    rc.add_argument('outline', nargs='*', help='outline files, or folders of them. With none, every course in content/work')
    rc.add_argument('--max-dollars', type=float, help='the most these courses may cost in total, counting earlier runs')
    rc.add_argument('--dry-run', action='store_true', help='show what it would recheck and the estimate, and send nothing')
    rc.add_argument('--no-wait', action='store_true', help='send or collect once, then stop instead of waiting for the batch')
    rc.set_defaults(now=False)
    rb = sub.add_parser('rebalance', help='rewrite the wrong options of questions whose right option is clearly the longest')
    rb.add_argument('outline', nargs='*', help='outline files, or folders of them. With none, every course in content/work')
    lim = rb.add_mutually_exclusive_group()
    lim.add_argument('--max-new-dollars', type=float, help='the most this rebalance may spend, not counting earlier runs')
    lim.add_argument('--max-dollars', type=float, help='the most these courses may cost in total, counting earlier runs')
    rb.add_argument('--dry-run', action='store_true', help='show which questions it would rewrite and the estimate, and send nothing')
    rb.add_argument('--no-wait', action='store_true', help='send or collect once, then stop instead of waiting for the batch')
    rb.set_defaults(now=False)
    r = sub.add_parser('review', help='the review page, on this computer only')
    r.add_argument('--port', type=int, default=8765)
    r.add_argument('--no-browser', action='store_true')
    args = ap.parse_args(argv)
    try:
        {'estimate': cmd_estimate, 'status': cmd_status, 'run': cmd_run, 'run-many': cmd_run_many, 'publish': cmd_publish, 'review': cmd_review,
         'autoreview': cmd_autoreview, 'recheck': cmd_recheck, 'rebalance': cmd_rebalance}[args.cmd](args)
    except Stop as e:
        say(str(e))
        return 1
    return 0

if __name__ == '__main__':
    sys.exit(main())
