// Screenshots for looking at: dark, the Sky background, a small phone and a desktop window. Motion is left on.
import { open, shot, tab, pick, toLast, TOPIC } from './lib.mjs';
const now = Date.now();
const day = (() => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })();
function seedFor(chapters, o = {}) {
  const ans = {};
  TOPIC.chapters.forEach(c => { if (chapters.includes(c.id)) c.points.forEach((p, i) => { ans[p.id + 'a'] = {ok: !(o.weak || []).includes(p.id), n: 1, t: now - 1e6 + i}; }); });
  return Object.assign({ans, streak: 4, lastDay: day, bestKm: 5.2e8, bestCombo: 9, name: 'James'}, o.extra || {});
}
const which = process.argv[2] || 'all';
const errsAll = [];

if (which === 'all' || which === 'dark') {
  const {b, p, errs} = await open({scheme: 'dark', motion: true, seed: seedFor(['c1'], {weak: ['c1p3']})});
  await shot(p, 'vis-dark-home');
  await tab(p, 'learn'); await p.waitForTimeout(300);
  await p.click('#chPick'); await p.waitForTimeout(350); await shot(p, 'vis-dark-chapters');
  await p.click('#sheetBody [data-ch="c2"]'); await p.waitForTimeout(500); await shot(p, 'vis-dark-card');
  await tab(p, 'practice'); await p.waitForTimeout(200);
  await p.click('[data-act="start"]'); await p.waitForTimeout(250); await shot(p, 'vis-dark-launch');
  await p.waitForTimeout(1300);
  for (let i = 0; i < 3; i++) { await pick(p, '#feed', true); if (i < 2) { await p.waitForTimeout(250); await toLast(p, '#feed'); await p.waitForTimeout(450); } }
  await p.waitForTimeout(140); await shot(p, 'vis-dark-flight');
  errsAll.push(...errs); await b.close();
}
if (which === 'all' || which === 'sky') {
  const {b, p, errs} = await open({motion: true, seed: seedFor(['c1', 'c2'], {extra: {bg: 'sky', exhaust: 'plasma', rocket: 'needle'}})});
  await tab(p, 'practice'); await p.waitForTimeout(200);
  await p.click('[data-act="len"][data-v="16"]'); await p.waitForTimeout(100);
  await p.click('[data-act="start"]'); await p.waitForTimeout(650); await shot(p, 'vis-sky-launch');
  await p.waitForTimeout(1000);
  await shot(p, 'vis-sky-q1');
  for (let i = 0; i < 9; i++) {
    await pick(p, '#feed', true);
    if (i === 4) { await p.waitForTimeout(160); await shot(p, 'vis-sky-burn'); }
    if (i < 8) { await p.waitForTimeout(250); await toLast(p, '#feed'); await p.waitForTimeout(450); }
  }
  await p.waitForTimeout(160); await shot(p, 'vis-sky-afterburner');
  await p.waitForTimeout(900); await toLast(p, '#feed'); await p.waitForTimeout(500);
  await pick(p, '#feed', false); await p.waitForTimeout(1500); await shot(p, 'vis-sky-wrong');
  errsAll.push(...errs); await b.close();
}
if (which === 'all' || which === 'small') {
  const {b, p, errs} = await open({w: 360, h: 640, seed: seedFor(['c1', 'c2'], {weak: ['c1p3', 'c2p2']})});
  await shot(p, 'vis-small-home');
  await p.evaluate(() => { document.querySelector('#v-home').scrollTop = 99999; }); await p.waitForTimeout(80); await shot(p, 'vis-small-home-end');
  await tab(p, 'learn'); await p.waitForTimeout(150);
  await p.click('#chPick'); await p.waitForTimeout(100);
  await p.click('#sheetBody [data-ch="c2"]'); await p.waitForTimeout(100);
  await p.click('#learnFeed .endslide [data-act="review"]'); await p.waitForTimeout(150);
  // walk to the longest card, Trade agreements (point 6)
  for (let i = 0; i < 5; i++) { await p.locator('#learnFeed .card .next').last().click(); await p.waitForTimeout(40); await pick(p, '#learnFeed', true); await p.locator('#learnFeed .slide.q.done .next').last().click(); await p.waitForTimeout(60); }
  await shot(p, 'vis-small-card-long');
  await p.locator('#learnFeed .card .next').last().click(); await p.waitForTimeout(60); await shot(p, 'vis-small-check');
  await pick(p, '#learnFeed', false); await p.waitForTimeout(200); await shot(p, 'vis-small-check-wrong');
  await tab(p, 'practice'); await p.waitForTimeout(100);
  await p.click('[data-act="scope"][data-v="chapter"]'); await p.waitForTimeout(60); await shot(p, 'vis-small-start');
  await p.click('[data-act="scopech"]'); await p.waitForTimeout(80);
  await p.click('#sheetBody [data-ch="c2"]'); await p.waitForTimeout(80);
  await p.click('[data-act="len"][data-v="0"]'); await p.waitForTimeout(60);
  await p.click('[data-act="start"]'); await p.waitForTimeout(600);
  // answer until the long trading bloc question is on screen
  for (let i = 0; i < 14; i++) {
    const q = await p.locator('#feed .slide.q:not(.done) .qtext').last().textContent();
    if (q.startsWith('After joining a trading bloc')) break;
    await pick(p, '#feed', true); await toLast(p, '#feed');
  }
  await shot(p, 'vis-small-long-q');
  await pick(p, '#feed', false); await p.waitForTimeout(1500); await shot(p, 'vis-small-long-q-wrong');
  await p.evaluate(() => { const f = document.querySelector('#feed'); f.scrollTop = f.scrollHeight; }); await p.waitForTimeout(100); await shot(p, 'vis-small-long-q-foot');
  console.log('small: sideways scroll', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  errsAll.push(...errs); await b.close();
}
if (which === 'all' || which === 'desk') {
  const {b, p, errs} = await open({w: 1280, h: 800, dpr: 1, seed: seedFor(['c1'], {weak: ['c1p3']})});
  await shot(p, 'vis-desk-home');
  await tab(p, 'practice'); await p.click('[data-act="start"]'); await p.waitForTimeout(700);
  await pick(p, '#feed', true); await p.waitForTimeout(100);
  await shot(p, 'vis-desk-flight');
  errsAll.push(...errs); await b.close();
}
console.log('errors:', errsAll);
if (which === 'light') {
  const {b, p, errs} = await open({motion: true, seed: seedFor(['c1', 'c2'])});
  await p.click('[data-act="subject"]'); await p.waitForTimeout(350); await shot(p, 'vis-light-subjects'); await p.click('#sheetClose');
  await tab(p, 'practice'); await p.waitForTimeout(200);
  await p.click('[data-act="len"][data-v="0"]'); await p.waitForTimeout(100);
  await p.click('[data-act="start"]'); await p.waitForTimeout(800); await shot(p, 'vis-light-launch');
  await p.waitForTimeout(900);
  for (let i = 0; i < 12; i++) {
    await pick(p, '#feed', true);
    if (i === 0) { await p.waitForTimeout(140); await shot(p, 'vis-light-liftoff'); }
    if (i === 7) { await p.waitForTimeout(140); await shot(p, 'vis-light-afterburner'); }
    if (i < 11) { await p.waitForTimeout(250); await toLast(p, '#feed'); await p.waitForTimeout(450); }
  }
  await p.waitForTimeout(160); await shot(p, 'vis-light-whitehot');
  await p.waitForTimeout(600); await p.click('#feed .slide.q.done:last-of-type .whybtn').catch(() => {});
  await p.locator('#feed .whybtn').last().click(); await p.waitForTimeout(200); await shot(p, 'vis-light-why');
  // a race countdown
  await tab(p, 'home'); await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(300);
  await p.click('.thr[data-f="aisha"]'); await p.waitForTimeout(300);
  await p.click('.mcard [data-act="play"]'); await p.waitForTimeout(1250); await shot(p, 'vis-light-count');
  errsAll.push(...errs); await b.close();
  console.log('errors:', errsAll);
}
