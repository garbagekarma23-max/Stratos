"""The Stratos content pipeline: turns a course outline into study content for the app.

Run it from the repository folder. On Windows, type py where this says python3.
  python3 content/pipeline.py estimate content/outlines/nsw-bus-11.yaml   what the rest of the course will cost
  python3 content/pipeline.py run content/outlines/nsw-bus-11.yaml --max-dollars 5
  python3 content/pipeline.py status content/outlines/nsw-bus-11.yaml     where each point is, with no API calls
  python3 content/pipeline.py review                                      the review page, at http://localhost:8765
  python3 content/pipeline.py publish content/outlines/nsw-bus-11.yaml    writes the cleared points into src/
content/README.md walks through each step.

How a point goes through it:
  match    if the bank already has points in the same subject, Claude says whether one is the same idea. A match
           waits for you in the review page: reuse it, or have a new point written.
  write    Claude writes the point: card, remember line, check question and practice question.
           node check_content.mjs --json checks it. If it fails, Claude rewrites it once with the problems.
  check    a separate call checks it. It is not told the right answer: it picks one itself, and says if another
           option could also be right, if any fact is wrong, and how sure it is.
  fix      a point the checker flagged gets a suggested fix.
  review   you approve it, use the fix, edit it, or reject it with a note (it is then written again).
  cleared  ready to publish. A point the checker passed is cleared at once.
Each step is one Message Batch for every point that needs it, which costs half the normal price.

Everything is saved as it arrives, in content/work/<course id>/: state.json (the batches sent and the money spent)
and points/<point id>.json (each point's drafts, the checker's answer and your decisions). Running the same
command again carries on from there. Nothing is sent twice unless it failed.

The API key is read from the ANTHROPIC_API_KEY environment variable and never written anywhere or printed.
"""
import argparse, hashlib, http.server, json, os, random, re, secrets, subprocess, sys, time, urllib.parse
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)

# ---------- settings ----------
MODEL = 'claude-opus-5-5'
# How hard Claude thinks at each step. Thinking is billed as output, so this is the main thing that sets the cost.
EFFORT = {'match': 'low', 'write': 'medium', 'check': 'high', 'fix': 'medium'}
MAX_TOKENS = {'match': 8000, 'write': 32000, 'check': 32000, 'fix': 32000}
# Message Batches prices for Claude Opus 5.5, in US dollars per million tokens: half the normal $4 in and $20 out.
# Cache reads are counted at $0.20, the normal price, to be safe.
PRICE = {'in': 2.00, 'out': 10.00, 'cache_write': 2.50, 'cache_read': 0.20}
# The output tokens (thinking included) a request is expected to use, low and high, for estimates before sending.
OUT_LOW = {'match': 500, 'write': 2000, 'check': 2500, 'fix': 2000}
OUT_HIGH = {'match': 1500, 'write': 4500, 'check': 5500, 'fix': 4500}
# Shares of points expected to need a second writing (the content check failed) and a fix (the checker flagged it).
REDO_SHARE, FIX_SHARE = 0.1, 0.25
POLL_SECONDS = int(os.environ.get('STRATOS_POLL', '60'))
TRIES = 3
KINDS = ['standard', 'english', 'maths', 'theory']
EXAMPLES = ['e-positive', 'e-ped', 'e-externality']
WAITING = ('match', 'write', 'check', 'fix')


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

def check_points(points, kind, repo, work_dir):
    """Runs check_content.mjs on some points. Returns {id: [problems]}."""
    if not points: return {}
    path = os.path.join(work_dir, 'check-input.json')
    write_json(path, {'kind': kind, 'points': points})
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
SCHEMAS = {'match': MATCH_SCHEMA, 'write': POINT_SCHEMA, 'fix': POINT_SCHEMA, 'check': CHECK_SCHEMA}

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

def write_user(course, pt, rec):
    parts = [context(course, pt), '', 'Write this point.', brief(pt)]
    if rec.get('rejected'):
        parts += ['', 'The owner rejected this earlier version:', pjson(rec['rejected'])]
    if rec.get('note'):
        parts += ['', 'The owner\'s note: ' + rec['note']]
    if rec.get('redo'):
        parts += ['', 'Your last version failed the content check. Write it again and fix these:', '- ' + '\n- '.join(rec['redo']),
                  '', 'Your last version:', pjson(rec['draft'])]
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

def request(stage, course, pt, rec, d, custom_id, cands=None):
    if stage == 'match': system, user = prompt('matcher.md'), match_user(course, pt, cands, d)
    elif stage == 'check': system, user = prompt('checker.md'), check_user(course, pt, rec)
    elif stage == 'fix': system, user = writer_system(course, d), fix_user(course, pt, rec)
    else: system, user = writer_system(course, d), write_user(course, pt, rec)
    return {'custom_id': custom_id, 'params': {
        'model': MODEL, 'max_tokens': MAX_TOKENS[stage],
        'system': [{'type': 'text', 'text': system, 'cache_control': {'type': 'ephemeral'}}],
        'messages': [{'role': 'user', 'content': user}],
        'output_config': {'effort': EFFORT[stage], 'format': {'type': 'json_schema', 'schema': SCHEMAS[stage]}}}}


# ---------- where each point is ----------
class Work:
    """The saved state of one course: content/work/<course id>/."""
    def __init__(self, root, cid):
        self.dir = os.path.join(root, cid)
        self.state_path = os.path.join(self.dir, 'state.json')
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

def fresh(rec, course, d, pt):
    """Puts a point at its first step: reuse, match or write."""
    for k in ['draft', 'redo', 'redone', 'local', 'check', 'flags', 'sensitive', 'proposal', 'proposal_problems', 'final', 'match', 'error', 'reuse', 'tries', 'rejected', 'note', 'cleared_by']:
        rec.pop(k, None)
    if pt['reuse']:
        rec.update(stage='reuse', reuse=pt['reuse'])
    elif candidates(course, d, pt) and not rec.get('match_rejected'):
        rec['stage'] = 'match'
    else:
        rec['stage'] = 'write'

def sync(work, course, d):
    """Makes a record for each point in the outline, and starts again any point whose title or brief changed."""
    write_json(os.path.join(work.dir, 'course.json'), {k: course[k] for k in ['id', 'subject', 'name', 'about', 'kind', 'years', 'units']})
    for pt in course['points']:
        rec, h = work.load(pt['id']), brief_hash(pt)
        if rec is None:
            rec = {'id': pt['id'], 'title': pt['title'], 'brief': h}
            fresh(rec, course, d, pt); log(rec, 'new, ' + rec['stage']); work.put(rec)
        elif rec['brief'] != h:
            rec.update(title=pt['title'], brief=h); rec.pop('match_rejected', None)
            fresh(rec, course, d, pt); log(rec, 'the outline changed, so it starts again at ' + rec['stage']); work.put(rec)

def next_requests(work, course, d):
    """One request for each point that is waiting on Claude."""
    out, items = [], {}
    for pt in course['points']:
        rec = work.load(pt['id'])
        if rec['stage'] not in WAITING: continue
        stage = rec['stage']
        n = rec.setdefault('sent', {}).get(stage, 0)
        cid = stage[0] + '_' + hashlib.sha1((course['id'] + pt['id'] + stage + str(n) + str(len(work.state['batches']))).encode()).hexdigest()[:24]
        out.append(request(stage, course, pt, rec, d, cid, candidates(course, d, pt) if stage == 'match' else None))
        items[cid] = {'pid': pt['id'], 'stage': stage}
    return out, items

def flags_for(rec):
    """What the owner sees about a checked point. concrete is False when the only flags are 'not sure' or a topic."""
    p, c, out, concrete = rec['draft'], rec['check'], [], False
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

def collect(work, course, d, batch, results, repo):
    """Saves what came back for a batch, and moves each point to its next step."""
    written = {}
    for r in results:
        item = batch['items'].get(r.custom_id)
        if not item: continue
        rec, stage = work.load(item['pid']), item['stage']
        if rec is None or rec['stage'] != stage: continue
        kind = r.result.type
        if kind == 'succeeded':
            m = r.result.message
            add_usage(work, m.usage)
            if m.stop_reason == 'refusal':
                det = getattr(m, 'stop_details', None)
                rec.update(stage='failed', error='Claude declined to write this' + (' (' + str(det.category) + ')' if det and getattr(det, 'category', None) else '') + '. Edit it by hand, or reject it with a note to try again.')
                log(rec, stage + ': declined'); work.put(rec); continue
            text = next((b.text for b in m.content if getattr(b, 'type', '') == 'text'), '')
            try:
                data = json.loads(text) if m.stop_reason != 'max_tokens' else None
            except ValueError:
                data = None
            if data is None:
                retry(rec, stage, 'the answer was cut off or not JSON'); work.put(rec); continue
            if stage == 'match':
                rec['match'] = data
                if data['same'] in candidates(course, d, next(p for p in course['points'] if p['id'] == rec['id'])):
                    rec['stage'] = 'match-review'; log(rec, 'match: the bank may have it as ' + data['same'])
                else:
                    rec['stage'] = 'write'; log(rec, 'match: none')
            elif stage in ('write', 'fix'):
                try:
                    written[rec['id']] = (to_bank(data), stage)
                except (KeyError, TypeError, AttributeError):
                    retry(rec, stage, 'the answer was not in the right shape')
            else:
                rec['check'] = data
                rec['sensitive'] = data['sensitive']
                rec['flags'], concrete = flags_for(rec)
                if not rec['flags'] and data['sensitive'] == 'none':
                    rec.update(stage='cleared', final=rec['draft'], cleared_by='checker'); log(rec, 'check: passed, cleared')
                elif concrete:
                    rec['stage'] = 'fix'; log(rec, 'check: flagged')
                else:
                    rec['stage'] = 'review'; log(rec, 'check: for review (' + ('not sure' if data['sure'] == 'low' else data['sensitive']) + ')')
            work.put(rec)
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
    # The content check, for everything written in this batch at once.
    problems = check_points({pid: p for pid, (p, _) in written.items()}, course['kind'], repo, work.dir)
    for pid, (p, stage) in written.items():
        rec, probs = work.load(pid), problems.get(pid, [])
        if stage == 'fix':
            rec.update(stage='review', proposal=p, proposal_problems=probs); log(rec, 'fix: suggested')
        elif probs and not rec.get('redone'):
            rec.update(draft=p, redo=probs, redone=True); log(rec, 'write: failed the content check, writing again')
        else:
            rec.update(stage='check', draft=p, local=probs); rec.pop('redo', None); log(rec, 'write: done' + (' (still fails the content check)' if probs else ''))
        work.put(rec)

def retry(rec, stage, why):
    t = rec.setdefault('tries', {})
    t[stage] = t.get(stage, 0) + 1
    if t[stage] >= TRIES:
        rec.update(stage='failed', error=stage + ' failed ' + str(TRIES) + ' times: ' + why + '. Reject it with a note to try again, or edit it by hand.')
        log(rec, stage + ': gave up, ' + why)
    else:
        log(rec, stage + ': ' + why + ', will try again')

def add_usage(work, u):
    s = work.state['spent']
    get = lambda k: getattr(u, k, 0) or 0
    s['in'] += get('input_tokens') + get('cache_creation_input_tokens') + get('cache_read_input_tokens')
    s['out'] += get('output_tokens')
    s['usd'] = round(s['usd'] + (get('input_tokens') * PRICE['in'] + get('cache_creation_input_tokens') * PRICE['cache_write'] +
                                 get('cache_read_input_tokens') * PRICE['cache_read'] + get('output_tokens') * PRICE['out']) / 1e6, 4)


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
    else: text = 'The API said no' + (' (' + str(status) + ')' if status else '') + ': ' + msg
    return Stop(text + (' Request id: ' + rid if rid else ''))

def count_tokens(client, reqs):
    """Input tokens for the requests, counted by the API for free. Counts up to 12 and scales up from them."""
    if not reqs: return 0
    sample = reqs[:12]
    total = 0
    for r in sample:
        p = {k: v for k, v in r['params'].items() if k != 'max_tokens'}
        total += client.messages.count_tokens(**p).input_tokens
    return round(total * len(reqs) / len(sample))

def rough_tokens(reqs):
    """Without a key, about 3.5 characters a token."""
    return round(sum(len(json.dumps(r['params'], ensure_ascii=False)) for r in reqs) / 3.5)

def cost_range(tokens_in, stages):
    """Low and high cost in dollars for requests with these input tokens, given how many are at each step."""
    lo = tokens_in * PRICE['in'] / 1e6 + sum(n * OUT_LOW[s] for s, n in stages.items()) * PRICE['out'] / 1e6
    hi = tokens_in * PRICE['in'] / 1e6 + sum(n * OUT_HIGH[s] for s, n in stages.items()) * PRICE['out'] / 1e6
    return lo, hi

def find_sent(client, sending):
    """After a stop between sending a batch and saving it: the batch, if the API has it."""
    try:
        for b in client.messages.batches.list(limit=20):
            created = b.created_at if isinstance(b.created_at, str) else b.created_at.strftime('%Y-%m-%dT%H:%M:%SZ')
            total = sum(getattr(b.request_counts, k) for k in ['processing', 'succeeded', 'errored', 'canceled', 'expired'])
            if created >= sending['before'] and total == len(sending['items']): return b.id
    except Exception as e:
        raise api_error(e)
    return None


# ---------- the commands ----------
def setup(args):
    repo = args.repo or REPO
    d = dump(repo)
    course = read_outline(args.outline, d)
    assign_ids(args.outline, course, d)
    work = Work(args.work or os.path.join(repo, 'content', 'work'), course['id'])
    sync(work, course, d)
    return repo, d, course, work

def counts(work, course):
    c = {}
    for pt in course['points']:
        s = work.load(pt['id'])['stage']
        c[s] = c.get(s, 0) + 1
    return c

STAGE_WORDS = {'match': 'waiting to be matched', 'match-review': 'a possible match, for you to review', 'write': 'waiting to be written',
               'check': 'waiting to be checked', 'fix': 'waiting for a fix', 'review': 'for you to review', 'failed': 'could not be written, for you to review',
               'cleared': 'cleared', 'reuse': 'reusing a bank point'}

def cmd_status(args):
    repo, d, course, work = setup(args)
    say(course['name'] + ':', len(course['points']), 'points')
    for s, n in counts(work, course).items(): say(' ', n, STAGE_WORDS[s])
    open_b = [b for b in work.state['batches'] if not b.get('collected')]
    if open_b: say(' ', len(open_b), 'batch sent and not collected yet. Run the run command again to collect it.')
    say('Spent so far on this course:', money(work.state['spent']['usd']))

def cmd_estimate(args):
    repo, d, course, work = setup(args)
    left = {'match': 0, 'write': 0, 'check': 0, 'fix': 0}
    samples = {}
    ex = d['banks']['e'][EXAMPLES[1]]
    for pt in course['points']:
        rec = work.load(pt['id'])
        s = rec['stage']
        if s not in WAITING: continue
        steps = {'match': ['match', 'write', 'check'], 'write': ['write', 'check'], 'check': ['check'], 'fix': ['fix']}[s]
        for st in steps:
            left[st] += 1
            if st not in samples:
                stand_in = dict(rec, draft=rec.get('draft') or ex, flags=rec.get('flags') or ['A problem the checker found.'])
                samples[st] = request(st, course, pt, stand_in, d, 'x', candidates(course, d, pt) if st == 'match' else None)
    if 'write' in samples or 'check' in samples:
        left['fix'] += round((left['write'] or left['check']) * FIX_SHARE)
        left['write'] += round(left['write'] * REDO_SHARE)
        if 'fix' not in samples:
            pt = course['points'][0]
            samples['fix'] = request('fix', course, pt, {'id': pt['id'], 'draft': ex, 'flags': ['A problem the checker found.']}, d, 'x')
    if not any(left.values()):
        say('Nothing is left to send for', course['name'] + '. Spent so far:', money(work.state['spent']['usd'])); return
    exact = bool(os.environ.get('ANTHROPIC_API_KEY'))
    api = client() if exact else None
    tokens = 0
    for st, n in left.items():
        if not n: continue
        try:
            per = count_tokens(api, [samples[st]]) if exact else rough_tokens([samples[st]])
        except Exception as e:
            raise api_error(e)
        tokens += per * n
        say(' ', st + ':', n, 'requests, about', format(per, ','), 'tokens in each')
    lo, hi = cost_range(tokens, left)
    say('Estimate for the rest of', course['name'] + ':', money(lo), 'to', money(hi) + ('' if exact else ' (rough: set the API key for an exact count of the prompts)'))
    say('Spent so far:', money(work.state['spent']['usd']) + '. Thinking is billed as output and is the uncertain part, so plan for the high number.')

def cmd_run(args):
    if args.max_dollars is None:
        raise Stop('Add --max-dollars, the most this course may cost in total, counting what earlier runs spent. For example: --max-dollars 5')
    repo, d, course, work = setup(args)
    api = client()
    try:
        while True:
            st = work.state
            if st.get('sending'):
                bid = find_sent(api, st['sending'])
                if bid:
                    st['batches'].append({'id': bid, 'items': st['sending']['items'], 'sent': st['sending']['before']})
                    say('Found the batch sent before the stop:', bid)
                st['sending'] = None; work.save()
            for b in [b for b in st['batches'] if not b.get('collected')]:
                try:
                    info = api.messages.batches.retrieve(b['id'])
                    if info.processing_status != 'ended': continue
                    results = list(api.messages.batches.results(b['id']))
                except Exception as e:
                    raise api_error(e)
                collect(work, course, d, b, results, repo)
                b['collected'] = True; work.save()
                say('Collected', len(results), 'answers. Spent so far:', money(st['spent']['usd']))
            waiting = [b for b in st['batches'] if not b.get('collected')]
            if waiting:
                if args.no_wait:
                    say('A batch is still running. Batches usually take under an hour, at most 24. Run the same command again later to collect it.')
                    return
                say('Waiting for the batch (checking every', POLL_SECONDS, 'seconds). You can stop with Ctrl+C and run the same command later.')
                time.sleep(POLL_SECONDS); continue
            reqs, items = next_requests(work, course, d)
            if not reqs:
                say('Done for now.')
                for s, n in counts(work, course).items(): say(' ', n, STAGE_WORDS[s])
                say('Spent on this course:', money(st['spent']['usd']) + '. Next: py content\\pipeline.py review')
                return
            stages = {}
            for it in items.values(): stages[it['stage']] = stages.get(it['stage'], 0) + 1
            try:
                tokens = count_tokens(api, reqs)
            except Exception as e:
                raise api_error(e)
            lo, hi = cost_range(tokens, stages)
            if st['spent']['usd'] + hi > args.max_dollars:
                raise Stop('Not sent: this batch could cost up to ' + money(hi) + ', and ' + money(st['spent']['usd']) + ' is spent already, which would pass --max-dollars ' +
                           money(args.max_dollars) + '. Raise --max-dollars to go on.')
            st['sending'] = {'before': now(), 'items': items}; work.save()
            try:
                b = api.messages.batches.create(requests=reqs)
            except Exception as e:
                st['sending'] = None; work.save()
                raise api_error(e)
            st['batches'].append({'id': b.id, 'items': items, 'sent': now()}); st['sending'] = None; work.save()
            for pid in {it['pid'] for it in items.values()}:
                rec = work.load(pid); sent = rec.setdefault('sent', {}); sent[rec['stage']] = sent.get(rec['stage'], 0) + 1; work.put(rec)
            say('Sent', len(reqs), 'requests (' + ', '.join(str(n) + ' ' + s for s, n in stages.items()) + '), expected', money(lo), 'to', money(hi) + '. Batch', b.id)
    except KeyboardInterrupt:
        say('\nStopped. Everything so far is saved. Run the same command again to carry on.')
        sys.exit(130)


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
    repo, d, course, work = setup(args)
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


# ---------- the review page ----------
def review_items(root, repo):
    """Every point waiting for the owner, in every course in the work folder."""
    d = dump(repo)
    courses, items = [], []
    for cid in sorted(os.listdir(root)) if os.path.isdir(root) else []:
        meta = read_json(os.path.join(root, cid, 'course.json'))
        if not meta: continue
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
                                  'match': dict(match, point=bank_point(d, match['same'])) if match.get('same') else None})
        courses.append({'id': cid, 'name': meta['name'], 'counts': tally})
    return {'courses': courses, 'items': items}

def decide(root, repo, body):
    """Saves one decision from the review page. Returns {ok, message, problems}."""
    cid, pid, action = body.get('course'), body.get('id'), body.get('action')
    if not cid or cid not in os.listdir(root) or not re.fullmatch(r'[a-z0-9-]+', pid or ''): return {'ok': False, 'message': 'Unknown point.'}
    work = Work(root, cid)
    rec = work.load(pid)
    if not rec or rec['stage'] not in ('review', 'match-review', 'failed'): return {'ok': False, 'message': 'This point is not waiting for review.'}
    meta = read_json(os.path.join(root, cid, 'course.json'))
    def done(text):
        log(rec, 'review: ' + text); work.put(rec); return {'ok': True, 'message': text}
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
        probs = check_points({pid: p}, meta['kind'], repo, work.dir).get(pid, [])
        if probs: return {'ok': False, 'message': 'The content check found problems. Fix them and save again.', 'problems': probs}
        rec.update(stage='cleared', final=p, cleared_by='owner', edited=True); return done('edited and approved')
    if action == 'reject':
        note = (body.get('note') or '').strip()[:1000]
        rejected = rec.get('draft')
        for k in ['draft', 'redo', 'redone', 'local', 'check', 'flags', 'sensitive', 'proposal', 'proposal_problems', 'error', 'tries']: rec.pop(k, None)
        rec.update(stage='write', note=note, rejected=rejected)
        return done('rejected, to be written again' + (' with a note' if note else ''))
    return {'ok': False, 'message': 'Unknown action.'}

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
            if path == '/api/items':
                if self.headers.get('X-Review-Token') != token: return self.send(403, {'ok': False})
                try: return self.send(200, review_items(root, repo))
                except Stop as e: return self.send(500, {'ok': False, 'message': str(e)})
            self.send(404, {'ok': False})
        def do_POST(self):
            if not self.allowed() or self.headers.get('X-Review-Token') != token: return self.send(403, {'ok': False, 'message': 'Refused.'})
            if urllib.parse.urlparse(self.path).path != '/api/decide': return self.send(404, {'ok': False})
            try:
                body = json.loads(self.rfile.read(min(int(self.headers.get('Content-Length') or 0), 200000)).decode('utf-8'))
                return self.send(200, decide(root, repo, body))
            except (ValueError, Stop) as e:
                return self.send(400, {'ok': False, 'message': str(e)})
    return http.server.HTTPServer(('127.0.0.1', port), Handler)

def cmd_review(args):
    repo = args.repo or REPO
    root = args.work or os.path.join(repo, 'content', 'work')
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
    for name, text in [('estimate', 'what the rest of a course will cost'), ('status', 'where each point is, with no API calls'),
                       ('run', 'write and check the points'), ('publish', 'write the cleared points into src/')]:
        s = sub.add_parser(name, help=text)
        s.add_argument('outline')
        if name == 'run':
            s.add_argument('--max-dollars', type=float, help='the most this course may cost in total, counting earlier runs')
            s.add_argument('--no-wait', action='store_true', help='send or collect once, then stop instead of waiting for a batch')
    r = sub.add_parser('review', help='the review page, on this computer only')
    r.add_argument('--port', type=int, default=8765)
    r.add_argument('--no-browser', action='store_true')
    args = ap.parse_args(argv)
    try:
        {'estimate': cmd_estimate, 'status': cmd_status, 'run': cmd_run, 'publish': cmd_publish, 'review': cmd_review}[args.cmd](args)
    except Stop as e:
        say(str(e))
        return 1
    return 0

if __name__ == '__main__':
    sys.exit(main())
