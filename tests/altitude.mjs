// Altitude in words: every place altitude shows writes the big-number words in full ("2 billion km",
// "4.1 billion light years"), never short forms like "2 B km" or "4.1 B ly". Only km stays short.
// A long Economics flight climbs to billions of light years, at 360 and 390 px wide, and the flight screen is
// checked for fit: the words sit beside the number when they fit, and on the line under it when they do not.
// At 360 px every real case fits beside the number, so the line under it is checked at 280 px,
// the folded screen of a Galaxy Fold.
// Run with: node altitude.mjs. Pass "shots" to also save the flight screen to tests/shots/ (altitude-360.png and so on).
import { open, tab, check, pick, toLast, TOPIC, SHOTS } from './lib.mjs';
const R = [], errsAll = [], shots = process.argv[2] === 'shots';
const SHORT = /\d\s*(K|M|B|T|Q|ly)\b|\bly\b/;
const ans = {};
TOPIC.chapters.forEach(c => c.points.forEach(p => { ans[p.id + 'a'] = {ok: true, n: 1, t: 1}; }));
// The record on You and the start screen, and a friend's flight in messages, both big.
const seed = {ans: ans, bestKm: 3.9e22, bestCombo: 20, th: {aisha: [], noah: [{id: 2, from: 'them', kind: 'result', km: 1.65e8, combo: 9, first: 7, total: 8, t: Date.now()}], mia: [], tom: []}, unread: {}, mid: 10};

// Does the altitude line fit? Nothing spills past the HUD, and the slide below starts under the HUD.
const layout = p => p.evaluate(() => {
  const run = document.querySelector('#run'), box = document.querySelector('.alt'), u = document.querySelector('#altUnit'), n = document.querySelector('#altNum');
  const hud = document.querySelector('#hud').getBoundingClientRect(), slide = document.querySelector('#feed .slide:last-child');
  const q = slide.querySelector('.meta') || slide.firstElementChild;
  return {two: run.classList.contains('alt2'), spill: box.scrollWidth > box.clientWidth + 1, under: u.getBoundingClientRect().top > n.getBoundingClientRect().bottom - 2,
    clear: q.getBoundingClientRect().top >= hud.bottom, unit: u.textContent, num: n.textContent, layer: document.querySelector('#altLayer').textContent};
});

for (const w of [360, 390]) {
  const {b, p, errs} = await open({seed: seed, w: w, h: w === 360 ? 640 : 844});
  if (w === 360) {
    await tab(p, 'practice');
    const st = await p.locator('#pracStart .stats').textContent();
    check(st.includes('4.1 billion light years') && !SHORT.test(st), 'the start screen writes the best altitude in full: ' + st.match(/Best altitude(.*?)Best combo/)[1], R);
    await tab(p, 'you');
    const you = await p.locator('#v-you .stats').textContent();
    check(you.includes('4.1 billion light years') && !SHORT.test(you), 'You writes the best altitude in full', R);
    await p.locator('#v-you .row[data-page="friends"]').click(); await p.waitForTimeout(200);
    const fr = await p.locator('#pages').textContent();
    check(fr.includes('Sent a flight: 165 million km') && !SHORT.test(fr), 'a friend’s flight in messages is written in full', R);
    await p.locator('[data-page="thread"][data-f="noah"]').click(); await p.waitForTimeout(200);
    const th = await p.locator('#pages').textContent();
    check(th.includes('165 million km') && !SHORT.test(th), 'the flight card in a thread is written in full', R);
    await p.goto(p.url()); await p.waitForTimeout(300);
  }
  await tab(p, 'practice');
  await p.locator('#pracStart .seg3 [data-v="0"]').click(); await p.waitForTimeout(60);
  await p.locator('#pracStart [data-act="start"]').click(); await p.waitForTimeout(900);
  const seen = new Set();
  let wrongFit = 0, spill = 0, clash = 0, lastLy = null, shot1 = false, wrapped = null;
  for (let i = 0; i < 26; i++) {
    // A maths flight also shows its clock on the altitude line, which makes it the tightest. Show one from here.
    if (i === 21) await p.evaluate(() => { const c = document.querySelector('#fClock'); c.hidden = false; c.textContent = '12:34'; });
    await pick(p, '#feed', true);
    await p.waitForTimeout(80);
    await toLast(p, '#feed');
    const L = await layout(p);
    seen.add(L.unit);
    if (L.spill) spill++;
    if (L.two !== L.under) wrongFit++;
    if (!L.clear) clash++;
    if (/light years/.test(L.unit) && /illion/.test(L.unit)) lastLy = L;
    if (i >= 21 && L.two && !wrapped) wrapped = L;
    if (shots && i < 21 && !shot1 && /billion light years/.test(L.unit)) { shot1 = true; await p.screenshot({path: SHOTS + 'altitude-' + w + '.png'}); }
  }
  if (shots) await p.screenshot({path: SHOTS + 'altitude-' + w + '-clock.png'});
  const units = [...seen];
  check(units.some(u => /^(million|billion|trillion) km$/.test(u)) && units.some(u => /illion light years$/.test(u)), w + ' px: the flight climbs through km words to light-year words: ' + units.join(', '), R);
  check(!units.some(u => SHORT.test('1 ' + u)), w + ' px: no short forms on the flight screen', R);
  check(spill === 0, w + ' px: the altitude line never spills past the screen', R);
  check(wrongFit === 0, w + ' px: when the words move, they sit on the line under the number', R);
  check(clash === 0, w + ' px: the question always starts below the altitude', R);
  check(!!lastLy, w + ' px: reached ' + (lastLy ? lastLy.num + ' ' + lastLy.unit + (lastLy.two ? ', on its own line' : ', beside the number') : 'no light years'), R);
  check(!wrapped, w + ' px, with a clock as in a maths flight: the words still fit beside the number', R);
  if (w === 360) {
    // A narrower phone than the app is designed for. Here the words do not fit, so they go under the number.
    await p.setViewportSize({width: 280, height: 653}); await p.waitForTimeout(200);
    const L = await layout(p);
    check(L.two && L.under && !L.spill && L.clear, '280 px (a folded Galaxy Fold) with a clock: ' + L.num + ' ' + L.unit + ' moves to the line under the number, and the question starts below it', R);
    if (shots) await p.screenshot({path: SHOTS + 'altitude-280-clock.png'});
    await p.setViewportSize({width: 360, height: 640}); await p.waitForTimeout(200);
    check(!(await layout(p)).two, 'back at 360 px the words return beside the number', R);
  }
  await p.locator('#endBtn').click(); await p.waitForTimeout(60);
  await p.locator('#endBtn').click(); await p.waitForTimeout(300);
  const sum = await p.locator('#feed .slide.summary').textContent();
  check(/light years/.test(sum) && !SHORT.test(sum), w + ' px: the result writes the altitude in full', R);
  if (shots) await p.screenshot({path: SHOTS + 'altitude-result-' + w + '.png'});
  const wide = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  check(!wide, w + ' px: nothing scrolls sideways', R);
  errsAll.push(...errs); await b.close();
}
console.log(R.join('\n'));
if (errsAll.length) { console.log('ERRORS after altitude tests:', errsAll); process.exitCode = 1; }
process.exit();
