// Looking back from a maths question in v2. In work mode the slides stay still, so a swipe never moves them while the
// student writes. Previous question (Previous card in Learn) at the top of the question lets the student look at the
// slides above anyway, and Back to question N brings them back with their working as it was.
// Checked: a Practice flight (two questions answered, back to the first, read only, back again, the working kept, the
// question then finished), the same by keyboard, a challenge keeping its one try, and Learn (Previous card to the
// worked example, Next on it coming back, Previous question to the guided question, scrolling back down).
// Every answer is typed with keypad taps, worked out with the Maths Lab's own solver.
// node maths-back.mjs shots also saves maths-back-working and maths-back-looking, light and dark, at 390 by 844.
import fs from 'fs';
import { open, tab, check, shot } from './lib.mjs';
const R = [];
const SHOTS = process.argv[2] === 'shots';
const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8');
const LM = new Function(read('lab/maths.js') + '; return LabMaths;')();
const errsAll = [];

const NAME = {x: 't0', or: 't2', '=': 'equals', '-': 'minus', '>': 'right', F: 'frac', E: 'enter', D: 'delete'};
const tap = async (p, sel) => { await p.locator(sel).last().tap(); await p.waitForTimeout(25); };
async function keys(p, seq) { for (const k of seq.split(' ')) if (k) await tap(p, '#mKeys .key[data-key="' + (NAME[k] || k) + '"]'); }
function numberKeys(v) {
  for (let q = 1; q <= 12; q++) {
    const n = Math.round(v * q);
    if (Math.abs(v * q - n) > 1e-7) continue;
    const sign = n < 0 ? '- ' : '', top = String(Math.abs(n)).split('').join(' ');
    return q === 1 ? sign + top : sign + 'F ' + top + ' > ' + String(q).split('').join(' ') + ' >';
  }
  throw new Error('not a simple number: ' + v);
}
// The answer line for the maths question waiting in a feed, as keypad taps. wrong makes it wrong by 1000.
async function answerKeys(p, feed, wrong) {
  const latex = await p.locator(feed + ' .slide.mq:not(.done) .mq-q math-span').last().textContent();
  const xs = LM.solve(LM.read(latex)).some.slice().sort((a, b) => b - a), vals = wrong ? [xs[0] + 1000] : xs;
  return vals.map(v => 'x = ' + numberKeys(v)).join(' or ');
}
const working = p => p.evaluate(() => document.querySelector('#app').dataset.work !== undefined);
async function ready(p) {
  await p.waitForFunction(() => document.querySelector('#app').dataset.work !== undefined && document.querySelector('#launch').hidden, null, {timeout: 8000});
  await p.waitForTimeout(80);
}
// What a slide's working holds: each line's maths and how it was marked.
const lines = (p, feed, i) => p.evaluate(([f, i]) => [...document.querySelectorAll(f + ' .slide[data-i="' + i + '"] .work li.line')].map(li => {
  const mf = li.querySelector('math-field');
  return (mf ? mf.value : 'given') + '|' + (li.className.replace(/\b(line|active)\b/g, '').trim());
}).join(' / '), [feed, i]);
// The slide the feed shows now, and whether the feed can scroll.
// The same rule as viewing() in 50-feed.js: the last slide whose top is at or above the top of the feed.
const viewingI = (p, feed) => p.evaluate(f => {
  const el = document.querySelector(f), top = el.scrollTop + 12;
  let s = el.firstElementChild;
  for (const c of el.children) { if (c.offsetTop <= top) s = c; else break; }
  return s && s.dataset.i !== undefined ? +s.dataset.i : (s ? s.className : null); }, feed);
const overflow = (p, feed) => p.evaluate(f => getComputedStyle(document.querySelector(f)).overflowY, feed);
const live = p => p.locator('#live').textContent();
// Every working line on a slide is read only.
const readOnly = (p, feed, i) => p.evaluate(([f, i]) => [...document.querySelectorAll(f + ' .slide[data-i="' + i + '"] .work math-field')].every(m => m.readOnly), [feed, i]);
const inert = (p, feed, i) => p.evaluate(([f, i]) => document.querySelector(f + ' .slide[data-i="' + i + '"]').inert, [feed, i]);
const focusId = p => p.evaluate(() => document.activeElement ? document.activeElement.id || document.activeElement.className : '');
// A swipe on the feed, as a mouse wheel: up (negative) or down.
async function wheel(p, feed, dy) {
  const box = await p.locator(feed).boundingBox();
  await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await p.mouse.wheel(0, dy);
  await p.waitForTimeout(400);
}

const T = Date.now();
const h = q => ({ok: true, day: '2026-10-01', q: q, t: T - 1e6});
// Every chapter 1 point has one right answer, so a flight has questions and nothing stops a challenge.
const SEED = {subject: 'maths', m: {cur: 'm1', h: {m1p1: [h('a')], m1p2: [h('b')], m1p3: [h('c')], m1p4: [h('d')], m1p5: [h('e')]}},
  th: {aisha: [], noah: [], mia: [{id: 3, from: 'them', kind: 'challenge', ch: 'm1', seed: 12345, them: 3, themMs: 150000, me: null, total: 5, state: 'open', t: T - 3e6}], tom: []},
  unread: {}, mid: 10};
async function openMaths(o = {}) {
  const r = await open(Object.assign({seed: SEED}, o));
  await r.p.waitForFunction(() => !!window.MathfieldElement && document.fonts.status === 'loaded');
  await r.p.waitForTimeout(150);
  return r;
}

// ---------- 1. a Practice flight: back to the first question, read only, and back with the working kept ----------
{
  const {b, p, errs} = await openMaths();
  await tab(p, 'practice');
  await p.locator('#pracStart [data-act="start"]').tap();
  await ready(p);
  const F = '#feed';
  check(!(await p.locator(F + ' .slide[data-i="0"] .look').isVisible()), 'the first question has no Previous question: nothing is above it', R);
  // Questions 1 and 2, right at Done.
  const q1 = await answerKeys(p, F);
  await keys(p, q1); await tap(p, '#mDone'); await p.waitForTimeout(150); await ready(p);
  await keys(p, await answerKeys(p, F)); await tap(p, '#mDone'); await p.waitForTimeout(150); await ready(p);
  check(await viewingI(p, F) === 2 && await overflow(p, F) === 'hidden', 'question 3 is on screen, and the slides are held still while it is worked', R);
  const q1Lines = await lines(p, F, 0);
  // Question 3: a right line checked, and a second line started.
  const a3 = await answerKeys(p, F);
  await keys(p, a3 + ' E x');
  const before = await lines(p, F, 2);
  check(/right/.test(before) && before.split(' / ').length === 2, 'question 3 has working: a right line and a line being written (' + before + ')', R);
  const look = p.locator(F + ' .slide[data-i="2"] .look');
  check(await look.isVisible() && (await look.textContent()) === 'Previous question', 'Previous question shows at the top of question 3', R);
  if (SHOTS) await shot(p, 'maths-back-working-light');

  await look.tap(); await p.waitForTimeout(200);
  check(!(await working(p)) && !(await p.isVisible('#mPad')), 'Previous question hides the keypad and leaves work mode', R);
  check(await overflow(p, F) !== 'hidden', 'the slides scroll again while looking back', R);
  check(await viewingI(p, F) === 1, 'it shows question 2, the one above', R);
  check(await p.isVisible('#mBack') && (await p.locator('#mBack').textContent()) === 'Back to question 3', 'Back to question 3 shows', R);
  check((await live(p)).startsWith('Looking back. Question 3 waits with your working as it is.'), 'screen readers hear that the student is looking back: ' + await live(p), R);
  check(await focusId(p) === 'mBack', 'focus moves to Back to question 3', R);
  check(await inert(p, F, 2), 'question 3 cannot be touched while looking back', R);
  if (SHOTS) await shot(p, 'maths-back-looking-light');

  // Up to question 1 by swiping.
  await wheel(p, F, -500);
  check(await viewingI(p, F) === 0, 'a swipe up reaches question 1', R);
  check(!(await working(p)) && await p.isVisible('#mBack'), 'still looking back on question 1', R);
  const s1 = p.locator(F + ' .slide[data-i="0"]');
  check(await s1.evaluate(s => s.classList.contains('done')) && (await s1.locator('.end').textContent()).startsWith('Right'), 'question 1 shows its result as it was', R);
  check(await readOnly(p, F, 0), 'question 1\'s lines are read only', R);
  check(!(await s1.locator('.mq-head .actions').isVisible()), 'question 1 has no Skip or Answer', R);
  // Try to change question 1: tap its line and type on a computer keyboard.
  await s1.locator('.work li.line').first().tap(); await p.waitForTimeout(60);
  await p.keyboard.type('99'); await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace'); await p.keyboard.press('Backspace');
  await p.keyboard.press('Enter'); await p.waitForTimeout(100);
  check(await lines(p, F, 0) === q1Lines, 'tapping and typing does not change question 1', R);
  check(await lines(p, F, 2) === before, 'nor question 3\'s working', R);
  // Control and Enter is Done on a computer keyboard. While looking back it does nothing.
  await p.keyboard.press('Control+Enter'); await p.waitForTimeout(150);
  check(await p.locator(F + ' .slide.mq.done').count() === 2 && await lines(p, F, 2) === before, 'Done does nothing while looking back', R);

  // Back to question 3.
  await p.locator('#mBack').tap(); await p.waitForTimeout(200);
  check(await working(p) && await p.isVisible('#mPad') && !(await p.isVisible('#mBack')), 'Back to question 3 turns work mode on again', R);
  check(await viewingI(p, F) === 2 && await overflow(p, F) === 'hidden', 'question 3 is on screen and held still again', R);
  check(!(await inert(p, F, 2)), 'question 3 can be worked again', R);
  check(await lines(p, F, 2) === before, 'the working on question 3 is still there: ' + await lines(p, F, 2), R);
  check((await live(p)) === 'Back to question 3. Your working is as you left it.', 'screen readers hear it: ' + await live(p), R);
  // Carry on from where the student was: delete the x, then Done answers with the right line.
  await keys(p, 'D');
  check((await lines(p, F, 2)).split(' / ')[1].startsWith('|'), 'the keypad writes on question 3\'s working: Delete took the x away', R);
  await tap(p, '#mDone'); await p.waitForTimeout(150);
  check((await p.locator(F + ' .slide[data-i="2"] .end').textContent()).startsWith('Right'), 'question 3 is finished with the working kept', R);
  await ready(p);

  // ---------- 2. the same by keyboard ----------
  await keys(p, (await answerKeys(p, F)) + ' E');
  const k4 = await lines(p, F, 3);
  await p.locator(F + ' .slide[data-i="3"] .look').focus();
  await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  check(!(await working(p)) && await viewingI(p, F) === 2 && await focusId(p) === 'mBack', 'Enter on Previous question looks back, with focus on Back to question 4', R);
  await p.keyboard.press('ArrowUp'); await p.waitForTimeout(300);
  check(await viewingI(p, F) === 1, 'the up arrow goes on up the slides', R);
  await p.locator('#mBack').focus();
  await p.keyboard.press('Enter'); await p.waitForTimeout(200);
  check(await working(p) && await viewingI(p, F) === 3 && await lines(p, F, 3) === k4, 'Enter on Back to question 4 comes back with the working kept', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 3. a challenge keeps its one try ----------
{
  const {b, p, errs} = await openMaths();
  await tab(p, 'home');
  await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(100);
  await p.click('.thr[data-f="mia"]'); await p.waitForTimeout(100);
  await p.locator('.mcard [data-act="play"]').tap();
  await ready(p);
  const F = '#feed';
  // Question 1 wrong: one try, so it ends with the worked solution.
  await keys(p, await answerKeys(p, F, true)); await tap(p, '#mDone'); await p.waitForTimeout(150);
  const q1 = await lines(p, F, 0), end1 = await p.locator(F + ' .slide[data-i="0"] .end').textContent();
  check(end1.startsWith('Not this time'), 'a wrong answer in a challenge ends the question', R);
  await tap(p, F + ' .slide[data-i="0"] .next'); await p.waitForTimeout(300);
  await ready(p);
  await keys(p, 'x = 1');
  const q2 = await lines(p, F, 1);
  await p.locator(F + ' .slide[data-i="1"] .look').tap(); await p.waitForTimeout(200);
  check(await viewingI(p, F) === 0 && !(await working(p)), 'Previous question shows question 1 in a challenge too', R);
  const s1 = p.locator(F + ' .slide[data-i="0"]');
  check(await readOnly(p, F, 0) && !(await s1.locator('.mq-head .actions').isVisible()), 'question 1 is read only, with no Answer to tap', R);
  check(await s1.locator('.note').isVisible() && (await s1.locator('.note').textContent()).includes('Worked solution'), 'its worked solution is still there', R);
  await s1.locator('.work li.line').first().tap(); await p.waitForTimeout(60);
  await p.keyboard.type('5'); await p.keyboard.press('Enter'); await p.waitForTimeout(100);
  await p.keyboard.press('Control+Enter'); await p.waitForTimeout(150);
  check(await lines(p, F, 0) === q1 && (await s1.locator('.end').textContent()) === end1 && await p.locator(F + ' .slide.mq.done').count() === 1 && await p.locator('#fSegs .seg.miss').count() === 1 && await p.locator('#fSegs .seg.fin').count() === 0,
    'looking back cannot change the answer to question 1, or answer question 2', R);
  // Next on question 1 goes back to question 2, which is the question being worked.
  await tap(p, F + ' .slide[data-i="0"] .next'); await p.waitForTimeout(250);
  check(await working(p) && await viewingI(p, F) === 1 && await lines(p, F, 1) === q2, 'Next on question 1 comes back to question 2 with its working', R);
  check(await p.locator(F + ' .slide[data-i="1"] [data-act="mpskip"]').count() === 0, 'and the challenge still has no Skip', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 4. Learn: back to the worked example, and to the guided question ----------
{
  const {b, p, errs} = await openMaths({seed: {subject: 'maths', m: {cur: 'm1', h: {}}}});
  await tab(p, 'home');
  await p.locator('.pt[data-p="m1p2"]').tap(); await p.waitForTimeout(120);
  await p.locator('#sheetBody [data-act="learnpoint"]').tap(); await p.waitForTimeout(150);
  const F = '#learnFeed';
  await tap(p, F + ' .slide.wex .next'); await p.waitForTimeout(200);
  await ready(p);
  const g = await p.evaluate(() => +document.querySelector('#learnFeed .slide.mq').dataset.i);
  const look = p.locator(F + ' .slide[data-i="' + g + '"] .look');
  check(await overflow(p, F) === 'hidden' && (await look.textContent()) === 'Previous card', 'the guided question offers Previous card, back to the worked example', R);
  await keys(p, 'x = 1');
  const gl = await lines(p, F, g);
  await look.tap(); await p.waitForTimeout(200);
  check(await viewingI(p, F) === g - 1 && await p.locator(F + ' .slide[data-i="' + (g - 1) + '"]').evaluate(s => s.classList.contains('wex')) && !(await working(p)) && !(await p.isVisible('#mPad')), 'Previous card shows the worked example, with the keypad gone', R);
  check(await overflow(p, F) !== 'hidden' && (await p.locator('#mBack').textContent()) === 'Back to question 1', 'the slides scroll, and Back to question 1 shows', R);
  check(await p.evaluate(() => document.querySelector('#mBack').parentNode.id === 'v-learn'), 'Back to question 1 is in Learn', R);
  // The worked example's own button goes back to the question.
  await tap(p, F + ' .slide.wex .next'); await p.waitForTimeout(250);
  check(await working(p) && await viewingI(p, F) === g && await lines(p, F, g) === gl, 'Try one on the worked example comes back to the guided question with its working', R);
  // Finish the guided question, then look back at it from the check question.
  await keys(p, 'D D D D D'); await keys(p, await answerKeys(p, F)); await tap(p, '#mDone'); await p.waitForTimeout(150);
  await tap(p, F + ' .slide.mq.done .next'); await p.waitForTimeout(250);
  await ready(p);
  const c = g + 1, gDone = await lines(p, F, g);
  await keys(p, 'x = 2');
  const cl = await lines(p, F, c);
  await p.locator(F + ' .slide[data-i="' + c + '"] .look').tap(); await p.waitForTimeout(200);
  check(await viewingI(p, F) === g && (await p.locator('#mBack').textContent()) === 'Back to question 2', 'Previous question shows the guided question, with Back to question 2', R);
  check(await readOnly(p, F, g) && await lines(p, F, g) === gDone, 'the guided question is read only, as it was', R);
  // Scrolling back down onto the check question turns work mode on again.
  await wheel(p, F, 500);
  check(await working(p) && await viewingI(p, F) === c && await lines(p, F, c) === cl && !(await p.isVisible('#mBack')), 'scrolling down onto the check question carries on with its working', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 5. dark mode, for the screenshots ----------
if (SHOTS) {
  const {b, p} = await openMaths({scheme: 'dark'});
  await tab(p, 'practice');
  await p.locator('#pracStart [data-act="start"]').tap();
  await ready(p);
  await keys(p, await answerKeys(p, '#feed')); await tap(p, '#mDone'); await p.waitForTimeout(150); await ready(p);
  await keys(p, 'x = 1 E');
  await shot(p, 'maths-back-working-dark');
  await p.locator('#feed .slide[data-i="1"] .look').tap(); await p.waitForTimeout(200);
  await shot(p, 'maths-back-looking-dark');
  await b.close();
}

R.forEach(r => console.log(r));
check(errsAll.length === 0, 'no script errors' + (errsAll.length ? ': ' + errsAll.join(' | ') : ''), R);
console.log(R[R.length - 1]);
