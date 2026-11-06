"""Writes the maths in made maths points as LaTeX, between \\( and \\) (see content/latex.mjs).

The first maths courses were written with maths as plain text: fractions with a slash (2/3, and -b/2a, which reads as
(-b/2)a), powers with ² or a caret, roots with √. This converts them, one point file at a time, in content/work/.
It never touches src/: publish each course afterwards, as for any change to a point.

  py content/convert_maths.py                      reports, for every maths point, whether it needs converting, and
                                                   whether this script can do it safely on its own. Changes nothing.
  py content/convert_maths.py --show ID            shows one point before and after the safe swaps. Changes nothing.
  py content/convert_maths.py --write [IDS]        makes the safe swaps in those points (or every point it can do).
  py content/convert_maths.py --apply FILE         writes points converted by hand: FILE is JSON, {id: point}, each in
                                                   the bank's shape. Each must pass the content check.
  py content/convert_maths.py --undo ID            puts a converted point back as it was.
  py content/convert_maths.py --dry-run ...        with --write, --apply or --undo: says what it would do.

A converted point keeps the version before in its file, under latex.before, with who converted it (script or hand),
so --undo can put it back. After --write, --apply or --undo, it lists the courses that use the points it changed:
publish each of them (py content/pipeline.py publish content/outlines/ID.yaml), then build and test.

The safe swaps. The script finds each run of maths in a sentence (numbers, single letters, signs, brackets, ² and the
like, between words) and writes it in LaTeX: − as -, × as \\times, ÷ as \\div, ≤ ≥ ≠ ± as \\le \\ge \\ne \\pm, π θ Δ as
\\pi \\theta \\Delta, x² as x^{2}, √(...) and √5 as \\sqrt{...}, a/b and 6/2 as \\frac{a}{b} when each side is one
number or one letter, and coordinates such as (3, -4). A lone letter between words, such as x in "the value of x", is
put in maths too, except a, which may be a word. A capital letter on its own (an event A, a vertex B, a matrix M)
stays as it is. It leaves a point for a person to read when it meets anything
it cannot be sure of:
  - a slash with more than one number or letter on a side, such as -b/2a, 1/2x or (x + 1)/2, which needs brackets
    decided by someone who knows what was meant;
  - a hyphen between two letters or two numbers with no spaces, such as A-B-C in a network or 2008-2009;
  - a function or calculus word next to the maths: sin, cos, tan, log, ln, lim, dy/dx, sqrt, e^ and the like;
  - a caret power it cannot read, a power whose base is a word (nxⁿ⁻¹), a fraction with a power on it (1/x²), brackets
    that do not match, a √ with no brackets before a sum, a recurring decimal (0.333...) or a unit after ° (°C);
  - two numbers or letters with only a space between them ($100 000, 20 L, a 2 × 3 matrix), because LaTeX drops it;
  - a sign with a word on one side (cost = price × number), or a lone a that is a letter of the maths;
  - a point in an Advanced, Extension, Methods or Specialist course with an everyday word where the syllabus has a
    term (opens up for concave up, turns back for a turning point, corner for vertex), since the script never changes
    words;
  - and any point that still fails the content check after the swaps.
Each run it writes is read back into plain text and must match the original, so a swap can only change how the maths
looks, not what it says.
"""
import argparse, copy, glob, json, os, re, subprocess, sys, time

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
WORK = os.path.join(HERE, 'work')


class Unsafe(Exception):
    """A run of maths the script cannot be sure of. The point is left for a person to read."""


# ---------- finding the runs of maths in a sentence ----------
SUPER = {'⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', 'ⁿ': 'n', 'ˣ': 'x', '⁻': '-'}
SYMBOL = {'−': '-', '–': '-', '×': ' \\times ', '÷': ' \\div ', '≤': ' \\le ', '≥': ' \\ge ', '≠': ' \\ne ', '±': ' \\pm ', '≈': ' \\approx ',
          'π': '\\pi ', 'θ': '\\theta ', 'Δ': '\\Delta ', '∞': '\\infty ', '°': '^{\\circ}'}
SIGNAL = re.compile(r'[=<>+\-−×÷≤≥≠±≈^²³⁰¹⁴-⁹ⁿˣ√/πθΔ∞|]|\d\s*[a-zA-Z]\b')
# Words next to maths that mean a person should look: functions, calculus and the like.
FUNCTION_WORDS = re.compile(r'\b(sin|cos|tan|sec|cosec|cot|log|ln|lim|exp|sqrt|dx|dy|dt|du|d²y|cis|arg|mod|max|min|nCr|nPr)\b|\b[a-z]{1,2}/d[a-z]\b', re.I)
UNIT_SLASH = re.compile(r'\b(?:and/or|either/or|(?:km|m|cm|mm|L|mL|kg|g|t|people|students|words)/(?:h|hr|s|min|day|week|year|L|mL|kg|g|m|m2|m²|cm|km|person|unit))\b|\$/(?:kg|h|hr|L|m|unit|person)\b', re.I)
COMPOUND = re.compile(r"\b[a-zA-Z]-(?:[a-zA-Z]{2,}|\d+)\b|\b[a-zA-Z]{2,}-[a-zA-Z]+\b|\b\d+s\b")
WORD = re.compile(r"[A-Za-z][a-z]*'?[a-z]+|[A-Za-z]{2,}")


def words_and_gaps(text):
    """Splits a sentence into words (two or more letters, compound words such as x-axis, unit names such as km/h) and the
    gaps between them, where maths may be. Returns a list of (is_word, text)."""
    keep = []
    for m in list(UNIT_SLASH.finditer(text)) + list(COMPOUND.finditer(text)):
        keep.append((m.start(), m.end()))
    for m in WORD.finditer(text):
        keep.append((m.start(), m.end()))
    keep.sort()
    spans, end = [], 0
    for a, b in keep:
        if a < end: end = max(end, b); spans[-1] = (spans[-1][0], end); continue
        spans.append((a, b)); end = b
    out, at = [], 0
    for a, b in spans:
        if a > at: out.append((False, text[at:a]))
        out.append((True, text[a:b])); at = b
    if at < len(text): out.append((False, text[at:]))
    return out


def balanced(s, o='(', c=')'):
    depth = 0
    for ch in s:
        if ch == o: depth += 1
        elif ch == c:
            depth -= 1
            if depth < 0: return False
    return depth == 0


def pieces_of(gap):
    """The runs of maths in a gap between words, each with the text around it. Returns [(before, run, after), ...], or
    the gap unchanged as [(gap, '', '')] when it holds no maths."""
    # Sentence marks at either end stay outside the maths.
    m = re.match(r'^([\s,.;:?!"“”]*)(.*?)([\s,.;:?!"“”]*)$', gap, re.S)
    lead, core, tail = m.group(1), m.group(2), m.group(3)
    if not core: return [(gap, '', '')]
    # An opening bracket at the start whose match is not in the run belongs to the sentence, and so does a closing one.
    while core.startswith('(') and not balanced(core): lead += '('; core = core[1:].lstrip();
    while core.endswith(')') and not balanced(core): tail = ')' + tail; core = core[:-1].rstrip()
    if not core: return [(gap, '', '')]
    # A list such as "x = 1, −2" is two runs. A comma inside brackets, as in (3, −4), stays.
    parts, depth, cur = [], 0, ''
    for i, ch in enumerate(core):
        depth += ch == '(' or ch == '['
        depth -= ch == ')' or ch == ']'
        if ch in ',.;:?' and depth == 0 and core[i + 1:i + 2] == ' ':
            parts.append(cur); parts.append(ch)
            cur = ''
        else: cur += ch
    parts.append(cur)
    out, first = [], True
    for p in parts:
        if p in (',', '.', ';', ':', '?'): out.append((p, '', '')); continue
        lsp = p[:len(p) - len(p.lstrip())]; rsp = p[len(p.rstrip()):]
        run = p.strip()
        is_maths = bool(run) and (SIGNAL.search(run) or re.fullmatch(r'\(\s*-?(?:[\d.]+|[a-z])\s*,\s*-?(?:[\d.]+|[a-z])\s*\)', run) or
                                  re.fullmatch(r'[b-z]', run) or re.fullmatch(r'[b-z](\s*,\s*[b-z])+', run))
        if not is_maths: out.append((lsp + run + rsp, '', ''))
        else: out.append((lsp, run, rsp))
    out[0] = (lead + out[0][0], out[0][1], out[0][2])
    last = out[-1]
    out[-1] = (last[0], last[1], last[2] + tail)
    return out


# ---------- writing one run as LaTeX ----------
def to_latex(run):
    """One run of plain maths as LaTeX. Raises Unsafe when it cannot be sure what the run means."""
    if not balanced(run) or not balanced(run, '[', ']'): raise Unsafe('brackets that do not match: ' + run)
    if re.search(r'[a-zA-Z]-[a-zA-Z]|\d-\d', run): raise Unsafe('a hyphen with no spaces between two letters or numbers: ' + run)
    if re.search(r'[a-zA-Z]{2,}', run): raise Unsafe('a word inside the maths: ' + run)
    if not re.search(r'[\w$√πθΔ]', run): raise Unsafe('signs with no numbers or letters, such as = or × between words: ' + run)
    if re.match(r'\s*[=+×÷<>≤≥≠±*/]', run) or re.search(r'[=+\-−×÷<>≤≥≠±*/]\s*$', run):
        raise Unsafe('maths that starts or ends with a sign, so a word is part of it: ' + run)
    # Two numbers or letters with only a space between them: a number written with spaces ($100 000), a unit (20 L), or a
    # word such as a. LaTeX drops the space, so this would change what it says.
    if re.search(r'[\w)\]²³⁰¹⁴-⁹]\s+[\w(\[$√]', run): raise Unsafe('two numbers or letters with only a space between them: ' + run)
    if re.match(r'[⁰¹²³⁴-⁹ⁿˣ⁻^]', run): raise Unsafe('a power with its base outside the maths, such as nxⁿ⁻¹: ' + run)
    if '..' in run or '…' in run: raise Unsafe('a recurring decimal or dots: ' + run)
    if re.search(r'°\s*[A-Za-z]', run): raise Unsafe('a degree sign before a unit, such as °C: ' + run)
    if '$' in run and not re.fullmatch(r'[^$]*(\$\d[\d,.]*[^$]*)+', run): raise Unsafe('a dollar sign: ' + run)
    s = run
    # Thousands, such as 1,250,000: the comma is part of the number.
    s = re.sub(r'\d{1,3}(?:,\d{3})+(?![\d])', lambda m: m.group(0).replace(',', '{,}'), s)
    s = s.replace('$', '\\$').replace('%', '\\%')
    s = s.replace('<=', ' \\le ').replace('>=', ' \\ge ').replace('!=', ' \\ne ')
    # Powers written with ², ³ and the like.
    s = re.sub('[⁰¹²³⁴-⁹ⁿˣ⁻]+', lambda m: '^{' + ''.join(SUPER[c] for c in m.group(0)) + '}', s)
    # Powers written with a caret: x^2, x^-1, e^(3x).
    def caret(m):
        arg = m.group(1)
        if arg.startswith('('):
            if not balanced(arg): raise Unsafe('a caret power it cannot read: ' + run)
            arg = arg[1:-1]
        return '^{' + arg + '}'
    if '^' in s.replace('^{', ''):
        s = re.sub(r'\^(?!\{)(\([^()]*\)|-?\d+|[a-zA-Z])', caret, s)
        if re.search(r'\^(?!\{)', s): raise Unsafe('a caret power it cannot read: ' + run)
    # Roots: √(...) and √5 or √x. Anything else is for a person.
    def root(m):
        return '\\sqrt{' + (m.group(1)[1:-1] if m.group(1).startswith('(') else m.group(1)) + '}'
    if '√' in s:
        s = re.sub(r'√(\([^()]*(?:\([^()]*\)[^()]*)*\)|\d+(?:\.\d+)?|[a-zA-Z](?![a-zA-Z0-9(]))', root, s)
        if '√' in s: raise Unsafe('a root it cannot read: ' + run)
    # Fractions: one number or one letter on each side of the slash.
    if '/' in s:
        if re.search(r'(?<![a-zA-Z])[LmsghtkK]\s*/|/\s*[LmsghtkK](?![a-zA-Z])', s) and re.search(r'\d', s):
            raise Unsafe('a slash next to a letter that may be a unit, such as L/100: ' + run)
        s = re.sub(r'(?<![\w.)}])(\d+(?:\.\d+)?|[a-zA-Z])\s*/\s*(\d+(?:\.\d+)?|[a-zA-Z])(?![\w.(\\{^])', r'\\frac{\1}{\2}', s)
        if '/' in s: raise Unsafe('a slash with more than one number or letter on a side: ' + run)
    for k, v in SYMBOL.items(): s = s.replace(k, v)
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r' ([,)])', r'\1', s).replace('( ', '(')
    if plain_of(s) != plain_norm(run): raise Unsafe('the LaTeX does not read back as the same maths: ' + run + ' became ' + s)
    return s


def plain_norm(t):
    """Plain maths written one way, to compare: no spaces, − as -, ² as ^2 and the like."""
    t = t.replace('<=', '≤').replace('>=', '≥').replace('!=', '≠')
    t = re.sub('[⁰¹²³⁴-⁹ⁿˣ⁻]+', lambda m: '^' + ''.join(SUPER[c] for c in m.group(0)), t)
    t = re.sub(r'\^\(([^()]*)\)', r'^\1', t)
    t = re.sub(r'√\(([^()]*(?:\([^()]*\)[^()]*)*)\)', r'√\1', t)
    t = t.replace('−', '-').replace('–', '-')
    return re.sub(r'\s+', '', t)


BACK = {'\\times': '×', '\\div': '÷', '\\le': '≤', '\\ge': '≥', '\\ne': '≠', '\\pm': '±', '\\approx': '≈', '\\pi': 'π', '\\theta': 'θ', '\\Delta': 'Δ', '\\infty': '∞'}


def plain_of(latex):
    """LaTeX the script wrote, read back into plain maths in plain_norm's form."""
    t = latex.replace('^{\\circ}', '°').replace('{,}', ',').replace('\\$', '$').replace('\\%', '%')
    for _ in range(4):
        t = re.sub(r'\^\{([^{}]*)\}', r'^\1', t)
        t = re.sub(r'\\frac\{([^{}]*)\}\{([^{}]*)\}', r'\1/\2', t)
        t = re.sub(r'\\sqrt\{([^{}]*)\}', r'√\1', t)
    for k, v in sorted(BACK.items(), key=lambda kv: -len(kv[0])): t = t.replace(k, v)
    return plain_norm(t)


def convert_text(text):
    """A sentence with its plain maths written in LaTeX. Raises Unsafe."""
    if '\\(' in text: return text      # written in LaTeX already
    if FUNCTION_WORDS.search(text) and SIGNAL.search(text): raise Unsafe('a function or calculus word next to maths: ' + text)
    if re.search(r'[A-Za-z]{2,}\(', text): raise Unsafe('a word right before a bracket, such as Pr(A): ' + text)
    # a, as in "between a and b" or "the intercept is a.", is a letter of the maths that also reads as a word, so the
    # script cannot tell which a's to put in maths.
    if re.search(r'\ba\s+(and|or|to)\s+[b-z]\b|\b[b-z]\s+(and|or|to)\s+a\b|\ba[.,;:?)](?!\w)|\b(is|of|and|by|than|with)\s+a\s+(is|and|or|are)\b', text):
        raise Unsafe('a lone a that is a letter of the maths, not a word: ' + text)
    out = ''
    for is_word, t in words_and_gaps(text):
        if is_word: out += t; continue
        for before, run, after in pieces_of(t):
            out += before + ('\\(' + to_latex(run) + '\\)' if run else '') + after
    return out


def texts_of(p):
    """Every text in a point, as (path, text), in the order the point shows them. The title is left as it is."""
    out = []
    for i, l in enumerate(p['card']):
        if isinstance(l, list): out += [(('card', i, 0), l[0]), (('card', i, 1), l[1])]
        else: out.append((('card', i), l))
    out.append((('remember',), p['remember']))
    for k in 'ab':
        out.append(((k, 'q'), p[k]['q']))
        out += [((k, 'opts', j), o) for j, o in enumerate(p[k]['opts'])]
        out += [((k, 'why'), p[k]['why']), ((k, 'clue'), p[k]['clue'])]
    return out


def put(p, path, value):
    at = p
    for key in path[:-1]: at = at[key]
    at[path[-1]] = value


def convert_point(p):
    """A point with the safe swaps made. Raises Unsafe with the first thing it could not be sure of."""
    q = copy.deepcopy(p)
    for path, t in texts_of(p):
        if path[0] == 'card' and len(path) == 3 and path[2] == 0: continue     # a card label stays words
        put(q, path, convert_text(t))
    return q


# Courses that must use the syllabus's terms (concave up, turning point), and the everyday words that stand in for them.
SENIOR = re.compile(r'-(adv|ext\d?|meth|spec)-')
EVERYDAY = re.compile(r'\bU[- ]shaped?\b|\bn[- ]shaped?\b|\bopens? (up|down)(wards?)?\b|\bturns? back\b|\bcorner\b|\bhill\b|\bvalley\b', re.I)


# ---------- the point files ----------
def maths_points():
    """Every cleared point of every maths course, as {id: (course id, path, record)}. A point lives in the work folder
    of the course that wrote it. Trials are left out."""
    out = {}
    for course_path in sorted(glob.glob(os.path.join(WORK, '*', 'course.json'))):
        folder = os.path.dirname(course_path)
        state = read(os.path.join(folder, 'state.json')) or {}
        if state.get('trial_of') or os.path.basename(folder).startswith('_'): continue
        course = read(course_path)
        if course.get('kind') != 'maths': continue
        for path in sorted(glob.glob(os.path.join(folder, 'points', '*.json'))):
            rec = read(path)
            if rec.get('stage') == 'cleared' and rec.get('final'): out[rec['id']] = (course['id'], path, rec)
    return out


def read(path):
    try:
        with open(path, encoding='utf-8') as f: return json.load(f)
    except FileNotFoundError: return None


def write(path, data):
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8', newline='\n') as f: json.dump(data, f, ensure_ascii=False, indent=1); f.write('\n')
    os.replace(tmp, path)


def content_check(points):
    """check_content.mjs --json on some points, as a maths course: {id: [problems]}."""
    path = os.path.join(WORK, 'convert-check.json')
    write(path, {'kind': 'maths', 'subject': 'Mathematics', 'points': points})
    try:
        out = subprocess.run(['node', 'check_content.mjs', '--json', path], cwd=REPO, capture_output=True, text=True, encoding='utf-8')
        if out.returncode != 0: sys.exit('node check_content.mjs failed:\n' + out.stdout + out.stderr)
        return json.loads(out.stdout)
    finally:
        os.remove(path)


def used_by(ids):
    """The courses in src/courses that list any of these points."""
    out = []
    for path in sorted(glob.glob(os.path.join(REPO, 'src', 'courses', '*.js'))):
        with open(path, encoding='utf-8') as f: text = f.read()
        if any('"' + i + '"' in text for i in ids): out.append(os.path.basename(path)[:-3])
    return out


def now():
    return time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())


def survey(points):
    """For each maths point: done already, nothing to convert, safe for the script, or for a person (with why)."""
    plain = content_check({pid: rec['final'] for pid, (_, _, rec) in points.items()})
    result, tries = {}, {}
    for pid, (cid, _, rec) in points.items():
        p = rec['final']
        if any('\\(' in t for _, t in texts_of(p)): result[pid] = ('done', None); continue
        if not any('writes maths as plain text' in x for x in plain.get(pid, [])):
            result[pid] = ('clean', None); continue
        words = SENIOR.search(cid) and EVERYDAY.search(json.dumps(p, ensure_ascii=False))
        if words: result[pid] = ('hand', 'an everyday word where the syllabus has a term: ' + words.group(0)); continue
        try: tries[pid] = convert_point(p)
        except Unsafe as e: result[pid] = ('hand', str(e))
    checked = content_check(tries) if tries else {}
    for pid, q in tries.items():
        probs = checked.get(pid, [])
        result[pid] = ('safe', q) if not probs else ('hand', 'still fails the content check after the swaps: ' + probs[0])
    return result


def main(argv=None):
    if hasattr(sys.stdout, 'reconfigure'): sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    ap = argparse.ArgumentParser(prog='convert_maths.py', description=__doc__.split('\n')[0])
    ap.add_argument('--write', nargs='*', metavar='ID', help='make the safe swaps in these points, or every point the script can do')
    ap.add_argument('--apply', metavar='FILE', help='write points converted by hand, from a JSON file {id: point}')
    ap.add_argument('--undo', nargs='+', metavar='ID', help='put converted points back as they were')
    ap.add_argument('--show', metavar='ID', help='show one point before and after the safe swaps')
    ap.add_argument('--dry-run', action='store_true', help='say what it would do, and change nothing')
    ap.add_argument('--why', action='store_true', help='with the report, list each point left for a person and why')
    args = ap.parse_args(argv)
    points = maths_points()
    changed = []

    if args.show:
        _, _, rec = points[args.show]
        try: q = convert_point(rec['final'])
        except Unsafe as e: print('For a person to read:', e); return
        for (path, a), (_, b) in zip(texts_of(rec['final']), texts_of(q)):
            if a != b: print('  ' + a + '\n  ' + b + '\n')
        return

    if args.apply:
        with open(args.apply, encoding='utf-8') as f: given = json.load(f)
        missing = [pid for pid in given if pid not in points]
        if missing: sys.exit('Not a cleared maths point in content/work: ' + ', '.join(missing))
        probs = content_check(given)
        bad = {pid: x for pid, x in probs.items() if x}
        if bad: sys.exit('These fail the content check, so nothing was written:\n' + '\n'.join(pid + ': ' + '\n  '.join(x) for pid, x in bad.items()))
        for pid, p in given.items():
            _, path, rec = points[pid]
            if rec['final'] == p: continue
            if not args.dry_run: save(path, rec, p, 'hand')
            changed.append(pid)
        print(('Would write ' if args.dry_run else 'Wrote ') + str(len(changed)) + ' points converted by hand: ' + ', '.join(changed))

    elif args.undo:
        for pid in args.undo:
            if pid not in points: sys.exit(pid + ' is not a cleared maths point in content/work.')
            _, path, rec = points[pid]
            if not rec.get('latex'): print(pid + ' was never converted. Nothing to undo.'); continue
            if not args.dry_run:
                rec['final'] = rec['latex']['before']
                rec.pop('latex')
                rec['log'].append(now() + ' maths: put back as plain text (convert_maths.py --undo)')
                write(path, rec)
            changed.append(pid)
        print(('Would put back ' if args.dry_run else 'Put back ') + str(len(changed)) + ' points: ' + ', '.join(changed))

    elif args.write is not None:
        result = survey({pid: v for pid, v in points.items() if not args.write or pid in args.write})
        for pid, (kind, q) in result.items():
            if kind != 'safe': continue
            _, path, rec = points[pid]
            if not args.dry_run: save(path, rec, q, 'script')
            changed.append(pid)
        print(('Would make ' if args.dry_run else 'Made ') + 'the safe swaps in ' + str(len(changed)) + ' points.')

    else:
        result = survey(points)
        n = lambda k: sum(1 for kind, _ in result.values() if kind == k)
        need = n('safe') + n('hand')
        print('Maths points in content/work:', len(result))
        print('  written in LaTeX already:', n('done'))
        print('  no maths written as plain text:', n('clean'))
        print('  to convert:', need)
        print('    the script can do safely on its own:', n('safe'))
        print('    for a person to read and convert:', n('hand'))
        reasons = {}
        for kind, why in result.values():
            if kind == 'hand': reasons[why.split(':')[0]] = reasons.get(why.split(':')[0], 0) + 1
        for why, k in sorted(reasons.items(), key=lambda kv: -kv[1]): print('      ' + str(k) + ', ' + why)
        if args.why:
            for pid, (kind, why) in sorted(result.items()):
                if kind == 'hand': print(pid + ': ' + why)
        return

    if changed and not args.dry_run:
        print('Publish the courses that use them, then build and test: ' + ', '.join(used_by(changed)))


def save(path, rec, p, by):
    # A point converted before keeps its first version as before, so --undo still puts back the plain text.
    again = bool(rec.get('latex'))
    rec['latex'] = {'at': now(), 'by': by, 'before': rec['latex']['before'] if again else rec['final']}
    rec['final'] = p
    rec['log'].append(now() + ' maths: ' + ('LaTeX changed by hand' if again else 'written in LaTeX (' + ('by hand' if by == 'hand' else 'convert_maths.py, the safe swaps') + ')'))
    write(path, rec)


if __name__ == '__main__':
    main()
