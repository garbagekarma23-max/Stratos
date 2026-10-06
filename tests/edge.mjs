// Edge cases: ending early, leaving mid-flight, the keyboard, review and single-point sessions, finishing everything, no storage.
import { open, shot, tab, saved, pick, toLast, waiting, check, TOPIC } from './lib.mjs';
const R = [];
const now = Date.now();
const today = (() => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })();
function seedFor(chapters, both) {
  const ans = {};
  TOPIC.chapters.forEach(c => { if (chapters.includes(c.id)) c.points.forEach((p, i) => { ans[p.id + 'a'] = {ok: true, n: 1, t: now - 1e6 + i}; if (both) ans[p.id + 'b'] = {ok: true, n: 1, t: now - 9e5 + i}; }); });
  return {ans, streak: 2, lastDay: today};
}
const text = (p, sel) => p.locator(sel).first().textContent();

// ---------- 1. ending early, and leaving a flight part way through
{
  const {b, ctx, p, errs} = await open({clock: true, seed: seedFor(['c1'])});
  const ff = async ms => { await ctx.clock.runFor(ms); await p.waitForTimeout(50); };
  await tab(p, 'practice'); await p.click('[data-act="start"]'); await ff(1500);
  await p.click('#endBtn'); await p.waitForTimeout(60);
  check(await p.locator('#pracStart:not([hidden])').count() === 1, 'the cross closes a flight that has no answers yet', R);
  await p.click('[data-act="start"]'); await ff(1500);
  await pick(p, '#feed', true); await toLast(p, '#feed'); await pick(p, '#feed', true); await toLast(p, '#feed');
  const top = await p.evaluate(() => document.querySelector('#feed').scrollTop);
  await tab(p, 'home'); await tab(p, 'you'); await tab(p, 'practice');
  check(await p.locator('#run:not([hidden])').count() === 1 && await p.evaluate(() => document.querySelector('#feed').scrollTop) === top, 'leaving and coming back keeps the flight and its place', R);
  check((await text(p, '#comboNum')) === '×2', 'the combo is still ×2', R);
  await p.click('#endBtn'); await p.waitForTimeout(60);
  check((await text(p, '#toast')).startsWith('Tap the cross again') && await p.locator('#feed .summary').count() === 0, 'one tap on the cross only warns', R);
  await p.click('#endBtn'); await p.waitForTimeout(100);
  const sum = await text(p, '#feed .summary');
  check(sum.includes('Flight ended early') && sum.includes('2 of 2'), 'the second tap ends it: 2 of 2 first try', R);
  check(await p.locator('#feed .slide.q:not(.done)').count() === 0, 'the unanswered question is removed', R);
  await p.click('#endBtn'); await p.waitForTimeout(60);
  check(await p.locator('#pracStart:not([hidden])').count() === 1, 'the cross on a finished flight goes back to the start screen', R);
  // a race, left early
  await tab(p, 'home'); await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(80);
  await p.click('.thr[data-f="aisha"]'); await p.waitForTimeout(80);
  await p.click('.mcard [data-act="play"]'); await ff(4500);
  await pick(p, '#feed', true); await toLast(p, '#feed');
  await p.click('#endBtn'); await p.click('#endBtn'); await p.waitForTimeout(100);
  check((await text(p, '#feed .summary')).includes('You left the race.'), 'leaving a race is recorded as leaving', R);
  const s = await saved(p);
  check(s.th.aisha[0].left === true && s.th.aisha[0].state === 'done', 'and the card in the thread says so', R);
  await ff(60000);
  check(await p.locator('#feed .summary').count() === 1, 'the friend\'s timer does nothing after the race is over', R);
  console.log('part 1 errors:', errs); await b.close();
}

// ---------- 2. the keyboard, on a desktop window
{
  const {b, p, errs} = await open({w: 1100, h: 800, dpr: 1, seed: seedFor(['c1'])});
  await tab(p, 'practice'); await p.click('[data-act="start"]'); await p.waitForTimeout(700);
  const q = await waiting(p, '#feed').locator('.qtext').textContent();
  await p.keyboard.press('h'); await p.waitForTimeout(40);
  check((await waiting(p, '#feed').locator('.note').textContent()).startsWith('Clue'), 'H shows the clue', R);
  await p.keyboard.press('s'); await p.waitForTimeout(100);
  check(await p.locator('#feed .slide.q.done').count() === 1, 'S skips', R);
  await p.keyboard.press('a'); await p.waitForTimeout(1500);
  check(await p.locator('#feed .slide.q.done').count() === 2, 'A answers the question on screen', R);
  await p.keyboard.press('Enter'); await p.waitForTimeout(150);
  await p.keyboard.press('r'); await p.waitForTimeout(1500);
  check(await p.locator('#feed .slide.q.done').count() === 3, 'Enter moves on and R shows the answer', R);
  await tab(p, 'you'); await p.click('[data-act="page"][data-page="store"]'); await p.waitForTimeout(80);
  await p.click('.tile[data-id="dusk"]'); await p.waitForTimeout(60);
  await p.keyboard.press('Escape'); await p.waitForTimeout(40);
  check(await p.locator('#sheet[hidden]').count() === 1 && await p.locator('.page').count() === 1, 'Escape closes the sheet first', R);
  await p.keyboard.press('Escape'); await p.waitForTimeout(40);
  check(await p.locator('.page').count() === 0, 'then the page', R);
  await p.keyboard.press('Tab');
  const focusOk = await p.evaluate(() => { const el = document.activeElement; return !!el && el !== document.body && getComputedStyle(el).outlineStyle !== 'none'; });
  check(focusOk, 'Tab gives a visible focus ring', R);
  await shot(p, 'edge-focus');
  console.log('part 2 errors:', errs); await b.close();
}

// ---------- 3. Learn: chapter picker, review, one point
{
  const {b, p, errs} = await open({seed: seedFor(['c1'])});
  await tab(p, 'learn'); await p.waitForTimeout(100);
  check((await text(p, '#learnFeed .endslide .ctitle')).startsWith('You have learned every point'), 'a learned chapter opens on its summary, not on a card', R);
  await shot(p, 'edge-learn-all-learned');
  await p.click('#learnFeed [data-act="review"]'); await p.waitForTimeout(100);
  check(await p.locator('#learnFeed .card').count() === 1 && (await text(p, '#learnFeed .ctitle')) === 'The global economy', 'Read the cards again starts from the first card', R);
  await p.click('#chPick'); await p.waitForTimeout(80);
  await shot(p, 'edge-chapter-sheet');
  await p.click('#sheetBody [data-ch="c3"]'); await p.waitForTimeout(100);
  check((await text(p, '#chPickT')) === '3. Protection' && (await text(p, '#learnFeed .ctitle')) === 'Why countries protect', 'the picker switches to chapter 3', R);
  await tab(p, 'home'); await p.waitForTimeout(80);
  check((await text(p, '.hero .h1')) === 'Protection', 'and Home follows to chapter 3', R);
  // a single point from the chapter list
  await p.click('.ch-head[data-ch="c1"]'); await p.waitForTimeout(60);
  await p.click('.pt[data-p="c1p2"]'); await p.waitForTimeout(80);
  check((await text(p, '#sheetBody .statusline')).includes('Learned. One of its two questions is right so far.'), 'the point sheet explains Learned', R);
  await p.click('#sheetBody [data-act="learnpoint"]'); await p.waitForTimeout(100);
  check(await p.locator('#learnFeed .card').count() === 1 && (await text(p, '#learnFeed .ctitle')) === 'Gross World Product', 'Check this point again opens that one card', R);
  await p.locator('#learnFeed .card .next').click(); await p.waitForTimeout(40);
  await pick(p, '#learnFeed', true);
  check((await text(p, '#learnFeed .endslide .ctitle')) === 'Point checked', 'one point ends with Point checked', R);
  console.log('part 3 errors:', errs); await b.close();
}

// ---------- 4. everything proven
{
  const {b, p, errs} = await open({seed: seedFor(['c1', 'c2', 'c3', 'c4'], true)});
  check((await text(p, '.hero .primary')) === 'Keep it sharp' && (await text(p, '.legend')).includes('Proven 100%'), 'with every point proven, Home says Keep it sharp', R);
  await shot(p, 'edge-all-proven');
  await p.click('.hero .primary'); await p.waitForTimeout(700);
  check((await text(p, '#feed .meta')).startsWith('Question 1 of 8'), 'and it starts a mixed flight of 8', R);
  await tab(p, 'learn'); await p.waitForTimeout(80);
  check((await text(p, '#learnFeed .endslide .lede')).startsWith('Every question is right.'), 'Learn says every question is right', R);
  console.log('part 4 errors:', errs); await b.close();
}

// ---------- 5. storage that refuses to work
{
  const {b, p, errs} = await open({init: () => { const bad = () => { throw new Error('blocked'); }; Storage.prototype.getItem = bad; Storage.prototype.setItem = bad; Storage.prototype.removeItem = bad; }});
  check((await text(p, '.hero .primary')) === 'Start this chapter', 'the page still starts when storage is blocked', R);
  await p.click('.hero .primary'); await p.waitForTimeout(100);
  await p.locator('#learnFeed .card .next').click(); await pick(p, '#learnFeed', true);
  await tab(p, 'home'); await p.waitForTimeout(100);
  check((await text(p, '.legend')).includes('Learned 1 of 7'), 'and progress is kept for the visit', R);
  console.log('part 5 errors:', errs); await b.close();
}
console.log(R.join('\n'));
