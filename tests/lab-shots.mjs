// Maths Lab screenshots, for looking at. iPhone size (390 by 844), light and dark, with v2's Home and a
// practice question at the same size. Each set is also joined into one side-by-side picture, so the two
// prototypes can be compared at a glance. Writes PNGs to tests/shots/.  Run: node lab-shots.mjs [light|dark]
import { chromium } from 'playwright';
import fs from 'fs';
import { serve } from './serve.mjs';
import { open as openV2, shot, tab, TOPIC, SHOTS } from './lib.mjs';
const EXE = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const which = process.argv[2] || 'all';
const server = await serve();
const browser = await chromium.launch(EXE ? {executablePath: EXE} : {});
const errs = [];
const now = Date.now();
const day = (() => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); })();
const ans = {};
TOPIC.chapters[0].points.forEach((p, i) => { ans[p.id + 'a'] = {ok: i !== 2, n: 1, t: now - 1e6 + i}; });
const V2SEED = {ans, streak: 4, lastDay: day, bestKm: 5.2e8, bestCombo: 9, name: 'James'};

async function lab(scheme, seed) {
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}, deviceScaleFactor: 2, hasTouch: true, isMobile: true, colorScheme: scheme, reducedMotion: 'reduce'});
  if (seed) await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('stratos-lab.v1', JSON.stringify(s)); sessionStorage.setItem('seeded', '1'); } }, seed);
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await p.goto(server.url + 'maths-lab.html');
  await p.waitForFunction(() => document.fonts.status === 'loaded');
  await p.waitForTimeout(300);
  return {ctx, p};
}
const keys = async (p, list) => { for (const k of list.split(' ')) { await p.tap('.key[data-key="' + k + '"]'); await p.waitForTimeout(20); } };
// Join pictures side by side with a caption under each.
async function join(name, files, captions) {
  const imgs = files.map(f => 'data:image/png;base64,' + fs.readFileSync(SHOTS + f + '.png').toString('base64'));
  const ctx = await browser.newContext({viewport: {width: files.length * 410 + 20, height: 900}, deviceScaleFactor: 1});
  const p = await ctx.newPage();
  await p.setContent('<body style="margin:0;padding:10px;background:#8a8f9b;display:flex;gap:20px;font:14px system-ui;color:#fff">' +
    imgs.map((src, i) => '<figure style="margin:0;width:390px"><img src="' + src + '" style="width:390px;height:844px;display:block;border-radius:8px"><figcaption style="margin-top:6px">' + captions[i] + '</figcaption></figure>').join('') + '</body>');
  await p.waitForTimeout(100);
  await p.screenshot({path: SHOTS + name + '.png', fullPage: true});
  await ctx.close();
}

for (const scheme of ['light', 'dark']) {
  if (which !== 'all' && which !== scheme) continue;
  // v2: Home and a practice question.
  {
    const {b, p, errs: e} = await openV2({scheme, seed: V2SEED});
    await shot(p, 'cmp-' + scheme + '-v2-home');
    await tab(p, 'practice'); await p.waitForTimeout(200);
    await p.click('[data-act="start"]'); await p.waitForTimeout(1600);
    await shot(p, 'cmp-' + scheme + '-v2-question');
    errs.push(...e); await b.close();
  }
  // The lab: the start screen, a question part-way through, a finished question, and the results.
  {
    const {ctx, p} = await lab(scheme);
    await p.screenshot({path: SHOTS + 'cmp-' + scheme + '-lab-start.png'});
    await p.tap('#start'); await p.waitForTimeout(200);
    await keys(p, 't0 square equals 4 9 enter');
    await keys(p, 't0 equals 7 enter');
    await keys(p, 't0 equals t1 7 0 minus 6 3');
    await p.waitForTimeout(150);
    await p.screenshot({path: SHOTS + 'lab-' + scheme + '-q1-blank.png'});
    errs.push(...[]); await ctx.close();
  }
  {
    const {ctx, p} = await lab(scheme, {sound: true, run: {topic: 'equations', at: now, qi: 9, per: [], sheet: null, state: 'open'}});
    await keys(p, 'brackets t0 minus 1 right square equals 1 6 enter');
    await keys(p, 't0 minus 1 equals t1 1 6 enter');
    await keys(p, 't0 minus 1 equals t1 4 enter');
    await keys(p, 't0 equals 4 plus 1 t2 t0 equals 1 minus 4');
    await p.waitForTimeout(150);
    await p.screenshot({path: SHOTS + 'cmp-' + scheme + '-lab-working.png'});
    await p.tap('#calc'); await p.waitForTimeout(50);
    await p.tap('#done'); await p.waitForTimeout(200);
    await p.screenshot({path: SHOTS + 'cmp-' + scheme + '-lab-wrong-done.png'});
    // Hold Delete to clear the line (tapping Delete on an empty line would remove the line).
    { const box = await p.locator('.key[data-key="delete"]').boundingBox(), cdp = await ctx.newCDPSession(p), pt = {x: box.x + box.width / 2, y: box.y + box.height / 2};
      await cdp.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [pt]}); await p.waitForTimeout(650); await cdp.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []}); await p.waitForTimeout(50); }
    await keys(p, 't0 equals 5 t2 t0 equals minus 3');
    await p.tap('#done'); await p.waitForTimeout(250);
    await p.screenshot({path: SHOTS + 'cmp-' + scheme + '-lab-right.png'});
    await p.tap('#done'); await p.waitForTimeout(250);
    await p.screenshot({path: SHOTS + 'cmp-' + scheme + '-lab-results.png'});
    await ctx.close();
  }
  await join('compare-' + scheme, ['cmp-' + scheme + '-v2-home', 'cmp-' + scheme + '-v2-question', 'cmp-' + scheme + '-lab-start', 'cmp-' + scheme + '-lab-working'],
    ['v2 Home', 'v2 practice question', 'Maths Lab start', 'Maths Lab working']);
  await join('compare-' + scheme + '-lab', ['cmp-' + scheme + '-lab-wrong-done', 'cmp-' + scheme + '-lab-right', 'cmp-' + scheme + '-lab-results'],
    ['A wrong line, and Done on an unfinished answer', 'Right', 'Results']);
}
await browser.close();
server.close();
console.log('wrote lab screenshots to tests/shots/', errs.length ? errs : '');
