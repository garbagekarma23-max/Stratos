// Plays through the main paths: Home, Learn a chapter, Practice a flight, then checks the numbers on Home.
import { open, shot, tab, saved, pick, toLast, waiting, check, TOPIC } from './lib.mjs';
const R = [];
const {b, p, errs} = await open();
const text = sel => p.locator(sel).first().textContent();

// --- Home, first run
check((await text('.hero .h1')) === 'International economic integration', 'Home shows chapter 1', R);
check((await text('.hero .primary')) === 'Start this chapter', 'first button says Start this chapter', R);
check((await text('.legend')).includes('0 of 7 proven') && (await text('.legend')).includes('0 of 7 learned'), 'bar legend starts at zero', R);
check(await p.locator('.icon-btn .dot').count() === 1, 'unread dot shows on the messages button', R);

// --- Practice is locked until something is learned
await tab(p, 'practice');
check((await text('#pracStart')).includes('Learn your first point'), 'Practice asks you to learn first', R);
await tab(p, 'home');

// --- Learn chapter 1: seven points, the third answered wrong
await p.click('.hero .primary');
await p.waitForTimeout(150);
check(await p.locator('#v-learn.on').count() === 1, 'the button opens Learn', R);
check((await text('#learnFeed .card .ctitle')) === 'The global economy', 'first card is the first point', R);
check(await p.locator('#segs .seg').count() === 7, 'seven segments in the bar', R);
for (let i = 0; i < 7; i++) {
  const cards = await p.locator('#learnFeed .card:not(.endslide)').count();
  check(cards === i + 1, 'card ' + (i + 1) + ' is on the feed', R);
  await p.locator('#learnFeed .card .next').last().click();          // Check it
  await p.waitForTimeout(60);
  const k = await pick(p, '#learnFeed', i !== 2);
  if (i === 2) {
    check((await p.locator('#learnFeed .slide.q.done').last().locator('.note').textContent()).includes('Marked as a weak point'), 'a wrong check says it is marked weak', R);
    await shot(p, 'flow-learn-wrong');
  }
  if (i === 0) await shot(p, 'flow-learn-right');
  const nb = p.locator('#learnFeed .slide.q.done .next').last();
  check(await nb.isVisible(), 'Next shows after check ' + (i + 1), R);
  if (i < 6) check((await nb.textContent()) === 'Next point', 'button reads Next point', R); else check((await nb.textContent()) === 'Finish', 'last button reads Finish', R);
  await nb.click(); await p.waitForTimeout(60);
}
check((await text('#learnFeed .endslide .ctitle')) === 'Chapter learned', 'end slide says Chapter learned', R);
check((await text('#learnFeed .endslide .lede')).startsWith('6 of 7 checks right first time. 1 weak point'), 'end slide counts 6 of 7 and one weak point', R);
await shot(p, 'flow-learn-end');
let s = await saved(p);
check(Object.keys(s.ans).length === 7 && s.ans.c1p3a.ok === false && s.ans.c1p1a.ok === true, 'seven answers saved, the third one wrong', R);
check(s.streak === 1, 'five answers started a day streak', R);

// --- Home after learning
await tab(p, 'home');
await p.waitForTimeout(200);
const legend = await text('.legend');
check(legend.includes('0 of 7 proven') && legend.includes('7 of 7 learned'), 'legend reads 0 of 7 proven, 7 of 7 learned: ' + legend.trim(), R);
check((await text('.hero .primary')) === 'Fix 1 weak point', 'button now says Fix 1 weak point', R);
check((await text('.hero .sub')) === 'Globalisation', 'and names the weak point', R);
check(await p.locator('.pt.is-weak').count() === 1 && await p.locator('.pt.is-learned').count() === 6, 'chapter list shows 1 weak and 6 learned', R);
check((await text('.streak')) === '1-day streak', 'streak shows on Home', R);
const logo = await p.evaluate(() => { const w = document.querySelector('.top .word'), r = w.getBoundingClientRect(), t = document.querySelector('.top').getBoundingClientRect(); return {off: Math.abs((r.left + r.right) / 2 - (t.left + t.right) / 2), font: getComputedStyle(w).fontFamily}; });
check(logo.off < 1 && logo.font.startsWith('Archivo'), 'the logo is in the middle of the top bar, in Archivo', R);
await p.click('.top [aria-label="Syllabus"]'); await p.waitForTimeout(150);
check((await text('#sheetTitle')) === 'Subjects and topics', 'the book button at the top left opens the syllabus', R);
await p.click('#sheetClose'); await p.waitForTimeout(150);
await shot(p, 'flow-home-after-learn');

// --- Practice start screen
await tab(p, 'practice');
const st = await text('#pracStart');
check(st.includes('Everything I have learned') && st.includes('7 points') && st.includes('14 questions'), 'start screen counts 7 points and 14 questions', R);
check(st.includes('This flight: 1 weak question, 7 you have not tried.'), 'it says what the flight holds: ' + (await text('.mix')), R);
check(await p.locator('#pracStart .seg3 button').count() === 2, 'length choices are 8 and All', R);
await shot(p, 'flow-practice-start');

// --- A flight of 8: the weak one first by difficulty, one wrong, one skipped, one with a clue
await p.click('[data-act="start"]');
await p.waitForTimeout(700);
check(await p.locator('#run:not([hidden])').count() === 1 && await p.locator('#launch[hidden]').count() === 1, 'flight is on screen and the launch card has gone', R);
check((await text('#modeT')) === 'Mixed flight', 'mode label reads Mixed flight', R);
const first = await waiting(p, '#feed').locator('.qtext').textContent();
check(first === 'What is globalisation?', 'the weak question comes first: ' + first, R);
check((await text('#feed .meta')).startsWith('Question 1 of 8'), 'meta reads Question 1 of 8', R);
const asked = [];
for (let i = 0; i < 8; i++) {
  if (i === 3) { await waiting(p, '#feed').locator('[data-act="clue"]').click(); await p.waitForTimeout(40); check((await waiting(p, '#feed').locator('.note').textContent()).startsWith('Clue'), 'clue shows', R); }
  if (i === 5) {
    await waiting(p, '#feed').locator('[data-act="skip"]').click(); await p.waitForTimeout(80);
    asked.push('skip');
  } else {
    const k = await pick(p, '#feed', i !== 4);
    asked.push(k.id + (i === 4 ? ' wrong' : ''));
    if (i === 2) { check((await text('#comboNum')) === '×3' && (await text('#comboTier')) === 'Ignition', 'combo reaches ×3, Ignition', R); await shot(p, 'flow-practice-combo3'); }
    if (i === 4) { await p.waitForTimeout(1400); check((await text('#comboNum')) === '×0', 'a wrong answer resets the combo', R); await shot(p, 'flow-practice-wrong'); }
  }
  await toLast(p, '#feed');
}
// two came back: the wrong one and the skipped one
check(await p.locator('#feed .slide.q:not(.done) .back').count() === 1, 'a missed question comes back, marked Back again', R);
await pick(p, '#feed', true); await toLast(p, '#feed');
await pick(p, '#feed', true); await p.waitForTimeout(100); await toLast(p, '#feed');
check(await p.locator('#feed .summary').count() === 1, 'the result slide is added', R);
const sum = await text('#feed .summary');
check(sum.includes('Flight complete') && sum.includes('First try') && sum.includes('6 of 8'), 'result shows 6 of 8 first try', R);
check(sum.includes('No weak points left from this flight.'), 'no weak points left after the second tries', R);
check(sum.includes('Chapter 1 is proven.'), 'the result says chapter 1 is proven', R);
await shot(p, 'flow-practice-summary');
s = await saved(p);
check(s.bestKm > 0 && s.bestCombo === 4, 'best altitude and best combo saved: ' + s.bestKm + ' km, combo ' + s.bestCombo, R);
check(s.ans.c1p3a.ok === true, 'the weak question is now right', R);

// --- send the result to a friend
await p.click('[data-act="sendres"]'); await p.waitForTimeout(80);
await shot(p, 'flow-send-sheet');
await p.click('[data-act="sendto"][data-f="tom"]'); await p.waitForTimeout(80);
check((await text('[data-act="sendres"]')) === 'Sent to Tom' && await p.locator('[data-act="sendres"]').isDisabled(), 'button reads Sent to Tom', R);
s = await saved(p);
check(s.th.tom.length === 1 && s.th.tom[0].kind === 'result' && s.th.tom[0].total === 8, 'the result is in the thread with Tom', R);

// --- back to Home: the bar moved
await p.click('[data-act="home"]'); await p.waitForTimeout(250);
const legend2 = await text('.legend');
check((await text('.hero .kicker')).includes('chapter 2 of 4') && legend2.includes('0 of ') && legend2.includes(' proven'), 'chapter 1 is finished, so Home moves on to chapter 2', R);
check((await p.locator('.ch-head .stage').first().textContent()) === 'Proven', 'the chapter list shows chapter 1 as Proven', R);
await shot(p, 'flow-home-after-practice');
await tab(p, 'practice');
check(await p.locator('#pracStart:not([hidden])').count() === 1, 'Practice is back at its start screen', R);

console.log(R.join('\n'));
console.log('questions asked:', asked.join(', '));
console.log('errors:', errs);
await b.close();
