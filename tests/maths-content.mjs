// Maths content: checks the worked examples and the templates with the Maths Lab's own line checker. No browser.
// Every worked example line must tick. Every template, run 200 times for each of its forms, must make questions whose
// stored answers are right and clean, with every step of the worked solution ticking too.
import fs from 'fs';
const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8');
const {LabMaths, MATHS, MAKE, TOPIC} = new Function(read('lab/maths.js') + read('src/maths-content.js') + read('src/15-maths-make.js') + read('src/content.js') +
  '; return {LabMaths, MATHS, MAKE, TOPIC};')();
const results = [];
const check = (ok, what) => { results.push((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) process.exitCode = 1; };
const RUNS = 200;
const BANNED = /\b(crucial|delve|enhance|foster|garner|highlight|interplay|intricate|key|landscape|meticulous|pivotal|showcase|tapestry|testament|underscore|valuable|vibrant|groundbreaking|renowned)\w*/i;

// A clean answer is a whole number. The x on both sides point may also give a simple fraction (halves or thirds).
const FRACTION_POINT = 'm1p3';
function clean(pid, latex) {
  if (/^-?\d+$/.test(latex)) return true;
  const m = /^-?\\frac\{(\d+)\}\{(\d+)\}$/.exec(latex);
  return pid === FRACTION_POINT && !!m && +m[2] <= 3 && +m[1] % +m[2] !== 0;
}
// One question, checked in full. Returns the first problem found, or ''.
function problem(p, q) {
  const ans = q.answers.map(LabMaths.number);
  if (ans.some(a => !isFinite(a))) return 'an answer is not a number: ' + q.answers;
  if (new Set(ans).size !== ans.length) return 'two answers are the same: ' + q.answers;
  if (!q.answers.every(a => clean(p.id, a))) return 'an answer is not clean: ' + q.answers;
  if (/\+-|--|-\+|(^|[^0-9.])1x/.test(q.eq)) return 'untidy signs in ' + q.eq;
  if (/\.\d{2,}/.test(q.eq)) return 'a number with more than one decimal place in ' + q.eq;
  // The stored answers are exactly the solutions of the question: the checker finds no others and misses none.
  const self = LabMaths.checkLine(q.eq, ans);
  if (!self || self.kind !== 'right') return 'the answers ' + q.answers + ' do not solve ' + q.eq + ' (' + (self && self.say) + ')';
  for (const s of q.steps) {
    const r = LabMaths.checkLine(s.latex, ans);
    if (!r || r.kind !== 'right') return 'the step ' + s.latex + ' does not tick for ' + q.eq + ' (' + (r && r.say) + ')';
    if (!s.note || /[[\]]/.test(s.note)) return 'the step ' + s.latex + ' has no proper note';
  }
  const last = q.steps[q.steps.length - 1].latex, fin = LabMaths.checkAnswer(last, ans);
  if (!fin.ok) return 'the last step ' + last + ' is not accepted as the final answer (' + fin.say + ')';
  if (!LabMaths.checkAnswer(q.show, ans).ok) return 'the shown answer ' + q.show + ' is not accepted';
  if (!(q.give >= 1 && q.give < q.steps.length)) return 'a guided question would write in ' + q.give + ' of ' + q.steps.length + ' steps';
  return '';
}

// ---------- the shape of the content ----------
const ids = new Set(), ecoIds = new Set();
TOPIC.chapters.forEach(c => { ecoIds.add(c.id); c.points.forEach(p => ecoIds.add(p.id)); });
let points = 0, forms = 0;
const titles = [];
for (const ch of MATHS.chapters) {
  check(/^m\d+$/.test(ch.id) && !ids.has(ch.id) && !ecoIds.has(ch.id), 'chapter id ' + ch.id + ' is new and starts with m');
  ids.add(ch.id);
  for (const p of ch.points) {
    points++; forms += p.forms.length;
    titles.push(p.title);
    check(/^m\d+p\d+$/.test(p.id) && !ids.has(p.id) && !ecoIds.has(p.id), p.id + ': its id starts with m and clashes with nothing in Economics');
    ids.add(p.id);
    const text = [p.title, p.intro, p.remember];
    check(text.every(t => typeof t === 'string' && t.length > 3), p.id + ': has a title, an intro and a remember line');
    // Words: banned words, dashes and double spaces, in everything a student reads.
    const ex = MAKE.example(p);
    ex.steps.forEach(s => text.push(s.note));
    const bad = text.filter(t => BANNED.test(t) || /[—–]/.test(t) || /\s{2,}/.test(t));
    check(!bad.length, p.id + ': no banned words, dashes or double spaces' + (bad.length ? ' (' + bad.join(' / ') + ')' : ''));
  }
}
check(JSON.stringify(MATHS.chapters.map(c => c.title)) === JSON.stringify(['Linear equations', 'Equations with squares']), 'two chapters: Linear equations, then Equations with squares');
check(JSON.stringify(titles) === JSON.stringify(['One and two steps', 'Brackets', 'x on both sides', 'Fractions', 'Decimals', 'x² equals a number', 'A squared bracket']), 'the seven points, in order');

// ---------- worked examples ----------
for (const ch of MATHS.chapters) for (const p of ch.points) {
  const ex = MAKE.example(p), ans = ex.answers.map(LabMaths.number);
  const ticks = ex.steps.map(s => LabMaths.checkLine(s.latex, ans)).filter(r => r && r.kind === 'right').length;
  check(ticks === ex.steps.length, p.id + ': every line of the worked example passes the line checker (' + ex.text + ', ' + ticks + ' of ' + ex.steps.length + ')');
  check(!problem(p, ex), p.id + ': the worked example is right and clean ' + problem(p, ex));
}
// The worked examples are the Maths Lab's questions.
const LAB = ['3x + 5 = 17', '7 − 2x = 15', '4(x − 3) = 20', '5x − 4 = 2x + 11', 'x/3 + 2 = 6', '2.4x + 1.3 = 8.5', 'x² + 3 = 52', '(x − 1)² = 16'];
const exTexts = MATHS.chapters.flatMap(c => c.points.flatMap(p => p.forms.map((f, i) => MAKE.question(p, {form: i, vals: f.ex}).text)));
check(LAB.every(t => exTexts.includes(t)), 'the worked examples include the Maths Lab questions (' + LAB.filter(t => !exTexts.includes(t)).join(', ') + ')');
check(exTexts.includes('6x − 1 = 2x + 9'), 'x on both sides has an example with a fraction answer, 6x − 1 = 2x + 9');

// ---------- templates, 200 runs of each form ----------
let made = 0, fractions = 0;
for (const ch of MATHS.chapters) for (const p of ch.points) {
  p.forms.forEach((f, fi) => {
    const seen = new Set();
    let first = '';
    for (let i = 0; i < RUNS; i++) {
      const q = MAKE.question(p, {form: fi});
      made++; seen.add(q.eq);
      if (q.answers.some(a => a.includes('frac'))) fractions++;
      if (!first) first = problem(p, q);
    }
    check(!first, p.id + ' form ' + (fi + 1) + ': ' + RUNS + ' questions, every stored answer right and clean, every step ticks' + (first ? ' (' + first + ')' : ''));
    check(seen.size >= 15, p.id + ' form ' + (fi + 1) + ': the template makes many different questions (' + seen.size + ' different in ' + RUNS + ')');
  });
  // Questions with avoid never repeat the ones to avoid.
  const ex = MAKE.example(p), avoid = [ex.eq];
  for (let i = 0; i < 5; i++) avoid.push(MAKE.question(p, {avoid: avoid}).eq);
  check(new Set(avoid).size === avoid.length, p.id + ': a new question never repeats the worked example or the questions just asked');
}
check(fractions > RUNS * 0.5, 'x on both sides sometimes gives a fraction answer (' + fractions + ' of ' + made + ' questions)');
check(made === forms * RUNS && points === 7, made + ' questions made from ' + forms + ' templates in ' + points + ' points');

// ---------- challenge sets: the same seed always gives the same questions ----------
{
  const eqs = (ch, seed) => MAKE.set(ch.points, seed, 5).map(q => q.eq);
  const [c1, c2] = MATHS.chapters, PT_OF = {};
  MATHS.chapters.forEach(c => c.points.forEach(p => { PT_OF[p.id] = p; }));
  let same = true, differ = 0, cleanSets = true, allPoints = true, firstBad = '';
  for (let seed = 1; seed <= 300; seed++) {
    for (const ch of [c1, c2]) {
      const a = MAKE.set(ch.points, seed * 7919, 5), b = eqs(ch, seed * 7919);
      if (JSON.stringify(a.map(q => q.eq)) !== JSON.stringify(b)) same = false;
      if (new Set(b).size !== 5 || a.some(q => q.eq === MAKE.example(PT_OF[q.p]).eq)) { cleanSets = false; firstBad = firstBad || ch.id + ' seed ' + seed + ': ' + b.join(' | '); }
      a.forEach(q => { const bad = problem(PT_OF[q.p], q); if (bad) { cleanSets = false; firstBad = firstBad || bad; } });
      if (ch === c1 && new Set(a.map(q => q.p)).size !== 5) allPoints = false;
      if (eqs(ch, seed * 7919 + 1).join() !== b.join()) differ++;
    }
  }
  check(same, 'the same seed gives the same five questions every time, in both chapters');
  check(differ === 600, 'a different seed gives a different set (' + differ + ' of 600)');
  check(cleanSets, 'every challenge set has five different, clean questions and never the worked example' + (firstBad ? ': ' + firstBad : ''));
  check(allPoints, 'a chapter 1 challenge asks one question on each of its five points');
  check(eqs(c1, 12345).join(' | ') === eqs(c1, 12345).join(' | ') && MAKE.seeded(42)() === MAKE.seeded(42)() && MAKE.seeded(42)() !== MAKE.seeded(43)(), 'the seeded numbers repeat for a seed and change with it');
  const before = Math.random;
  Math.random = () => 0.5;
  const fixed = eqs(c1, 999).join();
  Math.random = before;
  check(fixed === eqs(c1, 999).join(), 'a challenge set does not use Math.random at all');
}

// ---------- words for screen readers ----------
check(MAKE.words('\\left(x+2\\right)^2=9') === '(x + 2)² = 9' && MAKE.words('7-2x=-15') === '7 − 2x = −15' && MAKE.words('x=1\\pm4') === 'x = 1 ± 4', 'maths reads as words with proper minus signs');

console.log(results.join('\n'));
