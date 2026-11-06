// Maths in point text, with no browser: the rules in content/latex.mjs, run through check_content.mjs --json the way
// content/pipeline.py runs them, and the safe swaps in content/convert_maths.py.
// Checks: LaTeX between \( and \) that parses passes; \( and \) that do not pair, braces that do not match, \frac or
// \sqrt without braces, a power with nothing after it, an unknown command, \left with no \right, a dollar sign inside
// maths and maths in a title each fail; each kind of plain-text maths fails in a maths point (a slash as a fraction, a
// caret, log_, sqrt, <= and >=, ² and the like, = outside maths, a hyphen as a minus sign, a sum written as text),
// while the allowed plain text passes (numbers, money, percentages, coordinates, degrees, km/h, and/or, x-axis); the
// same plain text passes in a course that is not maths; options are measured as they look; the copy check sees x^{2}
// and x^2 as the same question; the full check on src/ passes with no maths point left in plain text; and convert_maths.py makes the safe swaps and leaves
// what it cannot be sure of (-b/2a, $100 000, L/100 km, A-B-C, Pr(A)) for a person. Matrices: \begin{bmatrix} passes,
// and a pmatrix, rows of different lengths, an empty entry, a row break with no space after it or outside a matrix,
// & outside a matrix and \begin with no \end each fail; a matrix is measured as wide as its widest row.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { check } from './lib.mjs';
const R = [];
const ROOT = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-latex-'));

// A maths point that passes every check, with parts changed by o.
const point = (o = {}) => Object.assign({
  title: 'Gradient of a line', remember: 'Rise over run gives the gradient \\(m\\).',
  card: ['The gradient is \\(m = \\frac{\\text{rise}}{\\text{run}}\\).', 'A line through \\((0, 1)\\) and \\((2, 5)\\) has \\(m = \\frac{4}{2} = 2\\).', 'A falling line has \\(m < 0\\).'],
  a: {q: 'What is the gradient of the line through \\((0, 0)\\) and \\((3, 6)\\)?', opts: ['\\(2\\)', '\\(\\frac{1}{2}\\)', '\\(3\\)', '\\(6\\)'], why: 'The rise is 6 and the run is 3, so \\(m = \\frac{6}{3} = 2\\).', clue: 'Divide the rise by the run.'},
  b: {d: 2, q: 'A line falls 4 units for each 2 across. What is its gradient?', opts: ['\\(-2\\)', '\\(2\\)', '\\(-\\frac{1}{2}\\)', '\\(\\frac{1}{2}\\)'], why: 'It falls, so \\(m < 0\\), and \\(\\frac{4}{2} = 2\\), so \\(m = -2\\).', clue: 'A falling line has a negative gradient.'}
}, o);
// The problems check_content.mjs --json finds in some points, as a course of this kind.
function run(points, kind = 'maths', subject = 'Mathematics') {
  const f = path.join(dir, 'in.json');
  fs.writeFileSync(f, JSON.stringify({kind, subject, points}));
  const out = spawnSync('node', ['check_content.mjs', '--json', f], {cwd: ROOT, encoding: 'utf8'});
  return JSON.parse(out.stdout);
}
const probs = (p, kind, subject) => run({'tst-one': p}, kind, subject)['tst-one'];
// A point with one card line set to this text.
const line = (t, kind, subject) => probs(point({card: ['The gradient is \\(m\\).', t, 'A falling line has \\(m < 0\\).']}), kind, subject);
const has = (list, word) => list.some(x => x.includes(word));

check(probs(point()).length === 0, 'a maths point with its maths in LaTeX passes', R);

// ---------- every piece of LaTeX must parse ----------
const bad = [
  ['The line is \\(y = 2x + 1.', 'with no \\)', 'a \\( with no \\) fails'],
  ['The line is y = 2x + 1\\).', 'with no \\(', 'a \\) with no \\( fails'],
  ['The gradient is \\(\\frac{4}{2\\).', 'braces', 'braces that do not match fail'],
  ['The gradient is \\(\\frac42\\).', 'both parts in braces', '\\frac without braces fails'],
  ['The root is \\(\\sqrt2\\).', 'its part in braces', '\\sqrt without braces fails'],
  ['The square is \\(x^\\).', 'nothing after it', 'a power with nothing after it fails'],
  ['The gradient is \\(\\grad{y}\\).', 'not on the list', 'a command not on the list fails'],
  ['The bracket is \\(\\left( x + 1\\).', 'pair up', '\\left with no \\right fails'],
  ['It costs \\($5 + x\\).', 'dollar sign', 'a bare dollar sign inside maths fails'],
  ['It is \\(\\).', 'empty', 'an empty piece of maths fails'],
  ['Write \\[x = 1\\] here.', '\\[', 'display maths \\[ \\] fails'],
];
for (const [t, word, what] of bad) check(has(line(t), word), what, R);
check(has(line('The angle is \\(\\left| x \\right\\).', 'standard', 'Physics'), 'parse') || has(line('The angle is \\(\\left| x \\right\\).', 'standard', 'Physics'), 'MathLive'),
  'MathLive\'s own parser catches what the other rules miss, in any course', R);
check(has(line('The line is \\(y = 2x + 1.', 'standard', 'Physics'), 'with no \\)'), 'LaTeX is checked in a course that is not maths too', R);
check(has(probs(point({title: 'Gradient \\(m\\)'})), 'title'), 'maths in a title fails', R);

// ---------- matrices: \begin{bmatrix} with & between entries and \\ between rows ----------
check(line('So \\(A = \\begin{bmatrix} 1 & 2 \\\\ 3 & -4 \\end{bmatrix}\\) and \\(\\begin{bmatrix} 10 & 20 \\end{bmatrix}\\) are matrices.').length === 0,
  'a matrix in \\begin{bmatrix}, and a row matrix, pass', R);
const badMatrix = [
  ['So \\(\\begin{pmatrix} 1 & 2 \\end{pmatrix}\\) here.', 'other than {bmatrix}', 'a matrix in round brackets (pmatrix) fails'],
  ['So \\(\\begin{bmatrix} 1 & 2 \\\\ 3 \\end{bmatrix}\\) here.', 'different numbers of entries', 'a matrix whose rows differ in length fails'],
  ['So \\(\\begin{bmatrix} 1 & \\\\ 3 & 4 \\end{bmatrix}\\) here.', 'empty entry', 'a matrix with an empty entry fails'],
  ['So \\(\\begin{bmatrix} 1 & 2 \\\\3 & 4 \\end{bmatrix}\\) here.', 'space after', 'a row break with no space after it fails'],
  ['So \\(\\begin{bmatrix} 1 & 2\\) here.', 'pair up', '\\begin with no \\end fails'],
  ['So \\(x = 1 \\\\ y = 2\\) here.', 'outside a matrix', 'a row break outside a matrix fails'],
  ['So \\(a & b\\) here.', 'outside a matrix', '& outside a matrix fails'],
];
for (const [t, word, what] of badMatrix) check(has(line(t), word), what, R);
const mOpts = ['\\(\\begin{bmatrix} 12 & 0 \\\\ 0 & 12 \\end{bmatrix}\\)', '\\(\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\)', '\\(\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}\\)', '\\(\\begin{bmatrix} 3 & 0 \\\\ 0 & 3 \\end{bmatrix}\\)'];
const shownM = spawnSync('node', ['-e', 'import("./content/latex.mjs").then(L => console.log(JSON.stringify(process.argv.slice(1).map(L.shown))))', ...mOpts], {cwd: ROOT, encoding: 'utf8'});
check(JSON.parse(shownM.stdout)[0] === '[12 0]', 'a matrix is measured as wide as its widest row, in square brackets', R);

// ---------- plain-text maths fails in a maths point ----------
const plain = [
  ['The axis is x = -b/2a here.', 'slash', 'a slash as a fraction'],
  ['The power is written x^2 in words.', 'caret', 'a caret'],
  ['Use log_e of the number.', 'log_', 'log_ as text'],
  ['Take the sqrt of the number.', 'sqrt', 'sqrt as a word'],
  ['The answer holds when the value is <= 5.', '<=', '<= written as text'],
  ['The square of the side is 3² here.', 'maths symbol', '² outside maths'],
  ['The root is √9 here.', 'maths symbol', '√ outside maths'],
  ['The answer is 5 × 3 here.', 'maths symbol', '× outside maths'],
  ['The point is (3, −4) here.', 'maths symbol', 'a real minus sign outside maths'],
  ['The point is (3, -4) here.', 'hyphen', 'a hyphen used as a minus sign'],
  ['So the gradient m = 2 here.', 'equals', 'an equals sign outside maths'],
  ['Add them: 9 - 4 gives the answer.', 'sum', 'a sum written as text'],
  ['Add them: \\(x\\) + \\(1\\) gives the answer.', 'sum', 'a plus sign between two pieces of maths'],
];
for (const [t, word, what] of plain) {
  check(has(line(t), word), what + ' fails in a maths point', R);
  check(line(t, 'standard', 'Business Studies').length === 0, '  and passes in a course that is not maths', R);
}
const allowed = ['It costs $20, or 50% more, at 3:45 pm.', 'Plot (3, 4) and (0, 1) on the x-axis and y-axis.', 'The angle is 30°, and the speed is 60 km/h.',
  'Use either and/or both, a two-step method, and 1,250 people.', 'The y-intercept is where the line meets the y-axis.'];
for (const t of allowed) check(line(t).length === 0, 'allowed in a maths point: ' + t, R);
check(line('A line with \\(m = 2\\) and a plain 2/3 here.').some(x => x.includes('slash')), 'a point with some LaTeX still fails for its plain maths', R);

// ---------- options are measured as they look ----------
const longSource = '\\(\\frac{\\sqrt{b^{2} - 4ac}}{2a} + \\frac{\\sqrt{b^{2} - 4ac}}{2a}\\)';
check(longSource.length > 60 && !has(probs(point({a: Object.assign({}, point().a, {opts: [longSource, '\\(2\\)', '\\(3\\)', '\\(6\\)']})})), 'characters'),
  'an option longer than 60 characters of LaTeX but shorter on screen passes', R);
check(has(probs(point({a: Object.assign({}, point().a, {opts: ['\\(' + 'x + '.repeat(16) + 'x\\)', '\\(2\\)', '\\(3\\)', '\\(6\\)']})})), 'characters as shown'),
  'an option longer than 60 characters on screen fails, measured as shown', R);

// ---------- the copy check ignores how the LaTeX is spaced and braced ----------
const twin = point({title: 'Gradient again', a: Object.assign({}, point().a, {q: 'What is the gradient of the line through \\( (0,0) \\) and \\((3,6)\\)?'}),
  b: Object.assign({}, point().b, {q: 'Another question about \\(x^{2}\\)?'})});
const both = run({'tst-one': point({b: Object.assign({}, point().b, {q: 'Another question about \\(x^2\\)?'})}), 'tst-two': twin});
check(has(both['tst-two'], 'same question'), 'two questions that differ only in LaTeX spacing and braces are the same question', R);

// ---------- the whole of src/ ----------
const full = spawnSync('node', ['check_content.mjs'], {cwd: ROOT, encoding: 'utf8'});
check(full.status === 0 && /no problems found/.test(full.stdout), 'the full check passes on src/', R);
check(!/plain text/.test(full.stdout), 'and every maths point in src/ writes its maths in LaTeX, with no warning left', R);

// ---------- the safe swaps in content/convert_maths.py ----------
const py = process.platform === 'win32' ? 'py' : 'python3';
const conv = texts => {
  const out = spawnSync(py, ['-c', 'import json, sys\nsys.path.insert(0, "content")\nimport convert_maths as C\nout = []\nfor t in json.load(sys.stdin):\n    try: out.append(C.convert_text(t))\n    except C.Unsafe as e: out.append("UNSAFE " + str(e))\nprint(json.dumps(out))'],
    {cwd: ROOT, encoding: 'utf8', input: JSON.stringify(texts)});
  if (out.status !== 0) throw new Error(out.stderr);
  return JSON.parse(out.stdout);
};
const swaps = [
  ['The roots are x = 1 and x = −3.', 'The roots are \\(x = 1\\) and \\(x = -3\\).'],
  ['So y = x² − 6x + 5, with a ≠ 0.', 'So \\(y = x^{2} - 6x + 5\\), with \\(a \\ne 0\\).'],
  ['A reciprocal has the form y = k/x.', 'A reciprocal has the form \\(y = \\frac{k}{x}\\).'],
  ['Here √(x² − 4) is the root.', 'Here \\(\\sqrt{x^{2} - 4}\\) is the root.'],
  ['The centre is (3, −2), on the x-axis.', 'The centre is \\((3, -2)\\), on the x-axis.'],
  ['It costs $12.50 ÷ 5 = $2.50 each.', 'It costs \\(\\$12.50 \\div 5 = \\$2.50\\) each.'],
  ['The words alone stay as they are.', 'The words alone stay as they are.'],
];
const got = conv(swaps.map(s => s[0]));
swaps.forEach(([from, to], i) => check(got[i] === to, 'convert_maths.py: ' + from + ' becomes ' + to + (got[i] === to ? '' : ' (got ' + got[i] + ')'), R));
const unsafe = [['The axis is x = -b/2a.', 'slash'], ['The mean is $100 000 ÷ 5 here.', 'space'], ['It is written as L/100 km of fuel.', 'unit'],
  ['The path A-B-C-D has three edges.', 'hyphen'], ['Pr(A) = 0.4 for this event.', 'bracket'], ['The derivative of xⁿ is nxⁿ⁻¹.', 'base'],
  ['Cost = price × number.', 'sign'], ['The slope is b and the intercept is a.', 'lone a'], ['So sin x = 0.5 at that angle.', 'function']];
const left = conv(unsafe.map(u => u[0]));
unsafe.forEach(([t, why], i) => check(left[i].startsWith('UNSAFE') && left[i].includes(why), 'convert_maths.py leaves for a person: ' + t + ' (' + why + ')', R));

fs.rmSync(dir, {recursive: true, force: true});
console.log(R.join('\n'));
