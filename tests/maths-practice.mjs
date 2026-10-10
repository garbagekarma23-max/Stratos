// Maths Practice in v2: the start screen, the order of questions, the combo on lines, altitude on answers,
// Practice answers counting toward proven, the Done moment with and without reduced motion, the clock and best time.
// Opened at iPhone size with touch. Every answer is typed with keypad taps. The test reads each question from the
// screen and works out its answer with the Maths Lab's own solver, so it never looks at the answers the app stored.
import fs from 'fs';
import { open, saved, tab, check } from './lib.mjs';
const R = [];
const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8');
const LM = new Function(read('lab/maths.js') + '; return LabMaths;')();
const MATHS = new Function(read('src/maths-content.js') + '; return MATHS;')();
const TITLE = {};
MATHS.chapters.forEach(c => c.points.forEach(p => { TITLE[p.id] = p.title; }));
const errsAll = [];

// Whatever has focus, looking inside MathLive's shadow DOM. It must never be something that opens the phone keyboard.
const focusSafe = p => p.evaluate(() => {
  let el = document.activeElement;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) el = el.shadowRoot.activeElement;
  if (!el) return true;
  const tag = el.tagName.toLowerCase(), typing = tag === 'input' || tag === 'textarea' || el.isContentEditable;
  return !typing || el.getAttribute('inputmode') === 'none';
});
let taps = 0, unsafe = 0;
async function tap(p, sel) {
  await p.locator(sel).last().tap();
  await p.waitForTimeout(25);
  taps++;
  if (!(await focusSafe(p))) unsafe++;
}
const NAME = {x: 't0', '±': 't1', or: 't2', '=': 'equals', '+': 'plus', '-': 'minus', '.': 'point', '>': 'right', F: 'frac', E: 'enter', D: 'delete'};
async function keys(p, seq) { for (const k of seq.split(' ')) if (k) await tap(p, '#mKeys .key[data-key="' + (NAME[k] || k) + '"]'); }
const WAIT = '#feed .slide.mq:not(.done)';
const working = p => p.evaluate(() => document.querySelector('#app').dataset.work !== undefined);
const text = (p, sel) => p.locator(sel).first().textContent();

function exact(v) {
  for (let q = 1; q <= 12; q++) { const n = v * q; if (Math.abs(n - Math.round(n)) < 1e-7) return {n: Math.round(n), q: q}; }
  throw new Error('not a simple number: ' + v);
}
function numberKeys(v) {
  const {n, q} = exact(v), sign = n < 0 ? '- ' : '', top = String(Math.abs(n)).split('').join(' ');
  return q === 1 ? sign + top : sign + 'F ' + top + ' > ' + String(q).split('').join(' ') + ' >';
}
// The answer line for the question on screen, as keypad taps. wrong adds 1000 to make a line that is wrong.
async function answerKeys(p, wrong) {
  const latex = await p.locator(WAIT + ' .mq-q math-span').last().textContent();
  const s = LM.solve(LM.read(latex));
  if (s.all || !s.some.length) throw new Error('could not solve ' + latex);
  const xs = s.some.slice().sort((a, b) => b - a), vals = wrong ? [xs[0] + 1000] : xs;
  return vals.map(v => 'x = ' + numberKeys(v)).join(' or ');
}
// Wait until the keypad is up on a question.
async function ready(p) {
  await p.waitForFunction(() => document.querySelector('#app').dataset.work !== undefined && document.querySelector('#launch').hidden, null, {timeout: 8000});
  await p.waitForTimeout(80);
}
const title = p => p.locator(WAIT + ' .meta span').nth(1).textContent();
const combo = p => text(p, '#comboNum');
const alt = async p => (await text(p, '#altNum')) + ' ' + (await text(p, '#altUnit'));
// Answer the question on screen right at Done, then wait for the next one.
async function right(p) {
  await keys(p, await answerKeys(p));
  await tap(p, '#mDone');
  await p.waitForTimeout(120);
}
async function startFlight(p, len) {
  await tab(p, 'practice');
  if (len !== undefined) { await p.locator('#pracStart .seg3 [data-v="' + len + '"]').tap(); await p.waitForTimeout(60); }
  await p.locator('#pracStart [data-act="start"]').tap();
  await ready(p);
}

const T = Date.now();
const h = (ok, q, ago, src) => Object.assign({ok: ok, day: '2026-10-01', q: q, t: T - ago}, src ? {src: 'p'} : {});
// m1p2 is weak, m1p3 was never practised, m1p4 and m1p1 were practised right, m1p4 longest ago.
// m1p1 has two right answers in a row, so one more right answer in Practice proves it.
const SEED = {subject: 'maths', m: {cur: 'm1', h: {
  m1p1: [h(true, 'x+1=2', 60000, true), h(true, 'x+2=3', 50000, true)],
  m1p2: [h(false, '2(x+1)=4', 40000)],
  m1p3: [h(true, '3x=x+4', 30000)],
  m1p4: [h(true, '\\frac{x}{2}=3', 90000, true)]
}}};
async function openPractice(o = {}) {
  const r = await open(Object.assign({seed: SEED}, o));
  await r.p.waitForFunction(() => !!window.MathfieldElement && document.fonts.status === 'loaded');
  await r.p.waitForTimeout(150);
  return r;
}

// ---------- 1. the start screen ----------
{
  const {b, p, errs} = await openPractice();
  await tab(p, 'practice');
  const s = await p.locator('#pracStart').textContent();
  check(s.includes('Start flight') && !s.includes('comes next'), 'the maths Practice tab offers a flight', R);
  check(s.includes('This flight: 8 questions on 1 weak point, 1 not practised yet, 2 for review.'), 'the start screen says what the flight holds: ' + s.match(/This flight[^.]*\./), R);
  check((await p.locator('#pracStart .seg3 button').allTextContents()).join('|') === '8|16|All 4', 'lengths are 8, 16 and all the points once', R);
  check((await text(p, '#bestT')) === 'None yet', 'no best time yet', R);
  check(s.includes('Best combo') && s.includes('Day streak') && s.includes('Best altitude'), 'the start screen shows the same stats as Economics, plus best time', R);
  await p.locator('#pracStart .seg3 [data-v="0"]').tap(); await p.waitForTimeout(60);
  check((await p.locator('#pracStart .mix').textContent()) === 'This flight: 4 questions on 1 weak point, 1 not practised yet, 2 for review.', 'All asks each point once', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 2. a flight: order, combo, altitude, proven, the result (reduced motion) ----------
{
  const {b, p, errs} = await openPractice();
  await startFlight(p, 8);
  check((await saved(p)).subject === 'maths', 'a maths flight stays on maths', R);
  check(await p.locator('#mPad').isVisible() && await p.evaluate(() => document.querySelector('#mPad').parentNode.id === 'run'), 'the keypad sits in the flight', R);
  check(await p.locator('#fSegs .seg').count() === 8 && await p.locator('#fSegs .seg.cur').count() === 1, 'one segment per question, the first one current', R);
  check(/^\d+:\d\d$/.test(await text(p, '#fClock')) && await p.locator('#fClock').isVisible(), 'the clock shows', R);
  const order = [];
  order.push(await title(p));

  // Question 1: lines build the combo, a wrong line resets it, then Done.
  const good = await answerKeys(p), bad = await answerKeys(p, true);
  await keys(p, good + ' E'); await p.waitForTimeout(40);
  check((await combo(p)) === '×1', 'a right line builds the combo to 1', R);
  await keys(p, good + ' E'); await p.waitForTimeout(40);
  check((await combo(p)) === '×2', 'a second right line builds it to 2', R);
  await keys(p, bad + ' E'); await p.waitForTimeout(40);
  check((await combo(p)) === '×0', 'a wrong line puts the combo back to 0', R);
  check((await alt(p)) === '0 km', 'lines do not change altitude', R);
  await keys(p, good);
  await tap(p, '#mDone'); await p.waitForTimeout(120);
  check((await combo(p)) === '×1', 'the answer line at Done builds the combo again', R);
  check((await alt(p)) === '4 km', 'a right answer lifts off: 2 x 1 in a row x difficulty 2 = 4 km', R);
  check(await p.locator('#fSegs .seg.fin').count() === 1, 'the first segment fills blue', R);
  await ready(p);

  // Question 2: right, the second in a row.
  order.push(await title(p));
  await right(p);
  check((await alt(p)) === '32 km', 'the second right answer in a row multiplies by 2 x 2 x 2: 32 km', R);
  await ready(p);

  // Question 3: wrong at Done, then Answer.
  order.push(await title(p));
  const before = await saved(p);
  await keys(p, await answerKeys(p, true));
  await tap(p, '#mDone'); await p.waitForTimeout(100);
  let s = await saved(p);
  const pid3 = Object.keys(TITLE).find(k => TITLE[k] === order[2]);
  const h3 = s.m.h[pid3];
  check(h3.length === before.m.h[pid3].length + 1 && h3[h3.length - 1].ok === false && h3[h3.length - 1].src === 'p', 'a wrong answer in Practice is saved against the point, marked as Practice', R);
  check((await combo(p)) === '×0' && (await alt(p)) === '32 km', 'a wrong answer resets the combo and keeps the altitude', R);
  check(await p.locator('#fSegs .seg').count() === 9, 'a wrong answer brings a question on the point back at the end', R);
  await tap(p, WAIT + ' [data-act="mpreveal"]'); await p.waitForTimeout(100);
  check((await p.locator('#feed .slide.mq.done').last().locator('.note').textContent()).includes('Worked solution'), 'Answer shows the worked solution', R);
  check(!(await working(p)), 'the keypad steps aside to show the solution', R);
  check(await p.locator('#fSegs .seg.miss').count() === 1, 'the missed question’s segment takes the weak-point colour', R);
  await tap(p, '#feed .slide.mq.done .next'); await p.waitForTimeout(300);
  await ready(p);

  // Question 4: right, a new run of 1. m1p1 now has three right in a row with different numbers.
  order.push(await title(p));
  await right(p);
  check((await alt(p)) === '128 km', 'after a miss the run starts again: 32 x 4 = 128 km', R);
  s = await saved(p);
  const h1 = s.m.h.m1p1;
  check(h1.length === 3 && h1.every(r => r.ok) && h1[2].src === 'p', 'a right answer in Practice is saved against the point', R);
  check(order.join(', ') === ['m1p2', 'm1p3', 'm1p4', 'm1p1'].map(k => TITLE[k]).join(', '), 'questions come weak first, then not practised, then right longest ago: ' + order.join(', '), R);
  await ready(p);

  // The rest, right. The cycle comes round again, then the one brought back.
  for (let i = 4; i < 9; i++) {
    order.push(await title(p));
    await right(p);
    if (i < 8) await ready(p);
  }
  check(order.slice(4, 8).join(', ') === order.slice(0, 4).join(', ') && order[8] === order[2], 'eight questions go round the points twice, then the missed point comes back', R);
  await p.waitForSelector('#feed .slide.summary', {timeout: 4000});
  await p.waitForTimeout(200);
  const sum = await p.locator('#feed .slide.summary').textContent();
  check(sum.includes('Flight complete') && sum.includes('First try') && sum.includes('Best combo'), 'the result has what Economics has', R);
  const lines = await p.locator('#feed .slide.summary .stats').nth(1).locator('dd').allTextContents();
  check(/^\d+:\d\d$/.test(lines[0]) && +lines[1] === 12 && +lines[2] === 2, 'the result shows the time, lines written (12) and wrong lines (2): ' + lines.join(' / '), R);
  check(sum.includes('A best time needs every question answered'), 'a flight with an answer shown sets no best time', R);
  check(!(await working(p)) && !(await p.locator('#mPad').isVisible()), 'the keypad goes at the result', R);
  s = await saved(p);
  check(!s.m.best || !Object.keys(s.m.best).length, 'no best time is saved', R);
  check((s.bestCombo || 0) === 0 && s.m.bestCombo >= 3, 'the maths best combo is kept apart from Economics', R);
  await tab(p, 'home');
  check((await p.locator('.pt[data-p="m1p1"] .lab').textContent()) === 'Proven', 'Practice answers count toward proven: m1p1 is proven', R);
  check(unsafe === 0, 'focus never lands on anything that opens the phone keyboard (' + taps + ' taps)', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 3. a clean flight sets a best time, and the start screen shows it ----------
{
  const {b, p, errs} = await openPractice();
  await startFlight(p, 0);
  for (let i = 0; i < 4; i++) { await right(p); if (i < 3) await ready(p); }
  await p.waitForSelector('#feed .slide.summary', {timeout: 4000});
  await p.waitForTimeout(200);
  const sum = await p.locator('#feed .slide.summary').textContent();
  const s = await saved(p);
  check(s.m.best && s.m.best['all:4'] > 0, 'a finished flight with every answer right saves a best time for everything, 4 questions', R);
  check(sum.includes('New best time') && sum.includes('Best time for everything, 4 questions:'), 'the result says it is a new best time', R);
  await p.locator('#feed .slide.summary [data-act="home"]').tap(); await p.waitForTimeout(150);
  await tab(p, 'practice');
  await p.locator('#pracStart .seg3 [data-v="0"]').tap(); await p.waitForTimeout(60);
  check(/^\d+:\d\d$/.test(await text(p, '#bestT')), 'the start screen shows the best time for that set', R);
  await p.locator('#pracStart .seg3 [data-v="8"]').tap(); await p.waitForTimeout(60);
  check((await text(p, '#bestT')) === 'None yet', 'a different length has its own best time', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 4. the Done moment, with and without reduced motion ----------
for (const motion of [false, true]) {
  const {b, p, errs} = await openPractice({motion: motion});
  await startFlight(p, 8);
  const good = await answerKeys(p);
  await keys(p, good + ' E ' + good + ' E ' + good);
  await p.locator('#mDone').tap();
  await p.waitForTimeout(30);
  const early = await p.locator('#feed .slide').count();
  const busy = await p.evaluate(() => document.querySelector('#app').dataset.work !== undefined && document.querySelector('#mKeys').getAttribute('aria-disabled') === 'true');
  if (motion) {
    check(early === 1 && busy, 'with motion: the next question waits while the lines tick, keys locked', R);
    await p.waitForTimeout(3 * 110 + 300);
    check(await p.locator('#feed .slide').count() === 2 && await p.locator('#feed .slide.arrive').count() === 1, 'with motion: then the next question comes in', R);
  } else {
    check(early === 2 && await p.locator('#feed .slide.arrive').count() === 0, 'reduced motion: the next question is there at once, with no movement', R);
  }
  await ready(p);
  check((await p.locator(WAIT).getAttribute('data-i')) === '1', (motion ? 'with motion' : 'reduced motion') + ': the keypad is on question 2', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 5. ending a flight early, and Economics still flies ----------
{
  const {b, p, errs} = await openPractice();
  await startFlight(p, 8);
  await right(p); await ready(p);
  await p.locator('#endBtn').tap(); await p.waitForTimeout(60);
  await p.locator('#endBtn').tap(); await p.waitForTimeout(250);
  const sum = await p.locator('#feed .slide.summary').textContent();
  check(sum.includes('Flight ended early') && !(await working(p)), 'the cross ends a maths flight early', R);
  await p.locator('#feed .slide.summary [data-act="home"]').tap(); await p.waitForTimeout(150);
  check(!(await p.locator('#fSegs').isVisible()) && !(await p.locator('#fClock').isVisible()), 'the segments and clock go with the flight', R);
  await p.locator('.subject').tap(); await p.waitForTimeout(80);
  await p.locator('.pick[data-sub="eco"]').tap(); await p.waitForTimeout(150);
  await p.evaluate(() => { const s = JSON.parse(localStorage.getItem('stratos2.v1')); s.ans = {c1p1a: {ok: true, n: 1, t: 1}}; localStorage.setItem('stratos2.v1', JSON.stringify(s)); });
  await p.reload(); await p.waitForTimeout(300);
  await tab(p, 'practice');
  await p.locator('#pracStart [data-act="start"]').tap(); await p.waitForTimeout(900);
  check(await p.locator('#feed .slide.q').count() === 1 && !(await p.locator('#fClock').isVisible()) && !(await p.locator('#fSegs').isVisible()), 'an Economics flight has no clock or segments', R);
  errsAll.push(...errs); await b.close();
}

console.log(R.join('\n'));
if (errsAll.length) { console.log('ERRORS after maths practice tests:', errsAll); process.exitCode = 1; }
