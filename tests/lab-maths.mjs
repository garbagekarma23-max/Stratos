// Maths Lab: checks the line checker, the answer check and the calculator display without a browser.
// It also checks the topic data: every stored answer must solve its question, and every Skip line must pass Done.
import fs from 'fs';
const load = (file, name) => new Function(fs.readFileSync(new URL('../lab/' + file, import.meta.url), 'utf8') + '; return ' + name + ';')();
const M = load('maths.js', 'LabMaths');
const TOPICS = load('topics.js', 'TOPICS');
const results = [];
const check = (ok, what) => { results.push((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) process.exitCode = 1; };

// ---------- the topic data ----------
for (const t of TOPICS) {
  check(Array.isArray(t.keys) && t.keys.length >= 1 && t.keys.length <= 3, t.id + ': the topic row has 1 to 3 keys, leaving room for the arrows');
  t.questions.forEach((q, i) => {
    const ans = q.answers.map(M.number);
    check(ans.every(Number.isFinite), t.id + ' q' + (i + 1) + ': answers are numbers');
    const r = M.checkLine(q.eq, ans);
    check(r && r.kind === 'right', t.id + ' q' + (i + 1) + ': the question itself checks as right (' + q.text + ')');
    check(M.checkAnswer(q.show, ans).ok, t.id + ' q' + (i + 1) + ': the Skip line passes Done (' + q.show + ')');
    check(typeof q.text === 'string' && q.text.length > 0 && !/[a-wyzA-Z]/.test(q.text.replace(/x/g, '')), t.id + ' q' + (i + 1) + ': has plain text for copied results');
  });
}
check(TOPICS[0].questions.length === 10, 'the equations topic has ten questions');

// ---------- working lines ----------
// [line, answers, what it should be, the sentence if it matters]
const LINES = [
  ['3x+5=17', [4], 'right'], ['3x=12', [4], 'right'], ['3x=17-5', [4], 'right'], ['x=4', [4], 'right'], ['4=x', [4], 'right'],
  ['3x=13', [4], 'wrong', 'This line changes the answer.'],
  ['3x+5', [4], 'hint', 'A working line needs an = sign.'],
  ['x=x', [4], 'wrong', 'This line is true for every x.'],
  ['2x+2=2\\left(x+1\\right)', [4], 'wrong', 'This line is true for every x.'],
  ['12=12', [4], 'wrong', 'This line has no x in it.'],
  ['x+1=x+2', [4], 'wrong', 'This line has no solution.'],
  ['x^2=16', [4], 'wrong', 'This line adds a solution.'],
  ['x\\left(x-4\\right)=0', [4], 'wrong', 'This line adds a solution.'],
  ['\\left(x-5\\right)^2=0', [5], 'right'],
  ['x^2=49', [7, -7], 'right'], ['x=\\pm7', [7, -7], 'right'], ['x=7\\or x=-7', [7, -7], 'right'], ['x=-7\\or x=7', [7, -7], 'right'],
  ['x=\\pm\\sqrt{49}', [7, -7], 'right'], ['x=7\\;\\mathrm{or}\\;x=-7', [7, -7], 'right'],
  ['x=7', [7, -7], 'wrong', 'This works, but there is another answer.'],
  ['x=\\pm6', [7, -7], 'wrong', 'This line changes the answer.'],
  ['\\left(x-1\\right)^2=16', [5, -3], 'right'], ['x-1=\\pm4', [5, -3], 'right'], ['x=1\\pm4', [5, -3], 'right'],
  ['x-1=4\\or x-1=-4', [5, -3], 'right'], ['x=5\\or x=-3', [5, -3], 'right'],
  ['x-1=4', [5, -3], 'wrong', 'This works, but there is another answer.'],
  ['x-1=\\pm16', [5, -3], 'wrong', 'This line changes the answer.'],
  ['4\\left(x-3\\right)=20', [8], 'right'], ['4x-12=20', [8], 'right'], ['x-3=5', [8], 'right'],
  ['4x-3=20', [8], 'wrong', 'This line changes the answer.'],
  ['\\frac{x}{3}=4', [12], 'right'], ['\\frac x3=4', [12], 'right'], ['x=4\\times3', [12], 'right'], ['x=4\\cdot3', [12], 'right'],
  ['\\frac{x}{3}+2=6', [12], 'right'], ['x\\div3=4', [12], 'right'],
  ['2x+3=15', [6], 'right'], ['\\frac{2x+3}{5}=3', [6], 'right'], ['2x+3=3', [6], 'wrong'],
  ['4x=10', [2.5], 'right'], ['x=\\frac{10}{4}', [2.5], 'right'], ['x=\\frac{5}{2}', [2.5], 'right'], ['x=2.5', [2.5], 'right'],
  ['2.4x=7.2', [3], 'right'], ['2.4x=8.5-1.3', [3], 'right'], ['24x=72', [3], 'right'], ['2.4x+1.3=8.5', [3], 'right'],
  ['-2x=8', [-4], 'right'], ['7-2x=15', [-4], 'right'], ['2x=8', [-4], 'wrong'], ['x=\\frac{8}{-2}', [-4], 'right'],
  ['3x=12=12', [4], 'right'], ['3x=12=13', [4], 'wrong', 'This line has no solution.'],
  ['\\frac{1}{x}=\\frac{1}{4}', [4], 'right'],
  ['x=\\placeholder{}', [4], 'hint', 'This line has an empty box. Fill it in or delete it.'],
  ['7^2=49^{\\placeholder{}}', [7, -7], 'hint', 'This line has an empty box. Fill it in or delete it.'],
  ['7^2=49', [7, -7], 'wrong', 'This line has no x in it.'],
  ['3x+=12', [4], 'hint', 'Finish this line first.'],
  ['\\frac{\\placeholder{}}{3}=4', [12], 'hint', 'This line has an empty box. Fill it in or delete it.'],
  ['7^{2=49}', [7, -7], 'hint', 'Finish this line first.'],
  ['3y=12', [4], 'hint', 'Use x for the unknown.'],
  ['x=7\\or-7', [7, -7], 'hint'],
  ['x=\\sin3', [4], 'hint']
];
for (const [line, ans, kind, sentence] of LINES) {
  const r = M.checkLine(line, ans);
  check(r && r.kind === kind && (!sentence || r.say === sentence), 'line ' + line + ' for x = ' + ans.join(' or ') + ' is ' + kind + (sentence ? ': ' + sentence : '') + (r && (r.kind !== kind || (sentence && r.say !== sentence)) ? '  [got ' + r.kind + ': ' + r.say + ']' : ''));
}
check(M.checkLine('', [4]) === null, 'an empty line gives nothing');
// Speed: the search must feel instant.
{
  const t0 = performance.now();
  for (let i = 0; i < 20; i++) M.checkLine('\\left(x-1\\right)^2=16', [5, -3]);
  const each = (performance.now() - t0) / 20;
  check(each < 40, 'checking a line takes under 40 ms (' + each.toFixed(1) + ' ms)');
}

// ---------- the final answer ----------
const DONE = [
  ['x=4', [4], true], ['4=x', [4], true], ['x=2.5', [2.5], true], ['x=2.50', [2.5], true], ['x=\\frac{5}{2}', [2.5], true], ['x=\\frac{10}{4}', [2.5], true],
  ['x=2.33', [7 / 3], true], ['x=2.333', [7 / 3], true], ['x=2.3', [7 / 3], false, 'Give the answer exactly, or to 2 decimal places.'], ['x=2.34', [7 / 3], false],
  ['x=\\pm7', [7, -7], true], ['x=7\\or x=-7', [7, -7], true], ['x=-7\\or x=7', [7, -7], true],
  ['x=7', [7, -7], false, 'There is a second answer.'], ['x=7\\or x=7', [7, -7], false, 'There is a second answer.'],
  ['x=7\\or x=6', [7, -7], false, 'One of these isn’t an answer.'],
  ['x=5\\or x=-3', [5, -3], true], ['x=1\\pm4', [5, -3], false, 'Work this out to one number first.'],
  ['x=4+1\\or x=-3', [5, -3], false, 'Work this out to one number first.'], ['x=4\\times3', [12], false, 'Work this out to one number first.'],
  ['x=\\pm\\sqrt{49}', [7, -7], true], ['x=1\\pm\\sqrt{16}', [5, -3], true], ['x=-\\frac{8}{2}', [-4], true],
  ['x=5', [4], false, 'This isn’t the answer.'],
  ['3x=12', [4], false, 'Finish with x on its own, like x = 4.'], ['x', [4], false], ['', [4], false, 'Write the answer first, like x = 4.'],
  ['x=4+x', [4], false, 'Finish with x on its own, like x = 4.']
];
for (const [line, ans, ok, sentence] of DONE) {
  const r = M.checkAnswer(line, ans);
  check(r.ok === ok && (!sentence || r.say === sentence), 'Done with ' + (line || '(empty)') + ' for x = ' + ans.map(a => +a.toFixed(4)).join(' or ') + (ok ? ' passes' : ' does not pass') + (sentence ? ': ' + sentence : '') + (r.ok !== ok || (sentence && r.say !== sentence) ? '  [got ' + r.say + ']' : ''));
}

// ---------- the calculator display ----------
// [line, what it shows: a value's LaTeX, null for nothing, or 'error']
const CALC = [
  ['3x=17-5', '12'], ['4x=20+12', '32'], ['17-5', '12'], ['x=\\frac{10}{4}', '\\frac{5}{2}'], ['2.4x=8.5-1.3', '7.2'], ['x=\\frac{7.2}{2.4}', '3'],
  ['x=\\sqrt{49}', '7'], ['x=\\sqrt{2}', '1.414213562'], ['x=2^{10}', '1024'], ['x=\\left(2+3\\right)^2', '25'], ['x=1\\div3', '\\frac{1}{3}'],
  ['x=5-8', '-3'], ['x=\\frac{1}{3}+\\frac{1}{6}', '\\frac{1}{2}'], ['x=4\\times3', '12'], ['x=-3\\times-2', '6'],
  ['x=4\\div0', 'error'], ['x=\\sqrt{-4}', 'error'],
  ['x=8', null], ['x=-7', null], ['x=\\frac{5}{2}', null], ['x+1', null], ['3x+5', null], ['x=4+x', null], ['x=2x', null], ['3x=x\\times2', null],
  ['x=\\pm\\sqrt{49}', null], ['x=7\\or 3', null], ['x=3+', null], ['x=\\frac{\\placeholder{}}{2}', null], ['', null], ['x=', null]
];
for (const [line, want] of CALC) {
  const r = M.calc(line), got = r === null ? null : r.error ? 'error' : r.latex;
  check(got === want, 'the display for ' + (line || '(empty)') + ' shows ' + (want === null ? 'nothing' : want) + (got !== want ? '  [got ' + got + ']' : ''));
}
{
  const r = M.calc('3x=17-5');
  check(r && '3x=17-5'.slice(0, r.from) + r.latex === '3x=12', 'using the display swaps the arithmetic after the last = sign for its value');
  const r2 = M.calc('20+12');
  check(r2 && '20+12'.slice(0, r2.from) + r2.latex === '32', 'with no = sign, the display swaps the whole line');
}

console.log(results.join('\n'));
