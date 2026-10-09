// Screenshots of maths in v2 at iPhone size (390 by 844), light and dark, next to the same Economics screens,
// so the two subjects can be compared at a glance. Writes PNGs to tests/shots/.  Run: node maths-shots.mjs [light|dark]
// The question numbers are random in the app. Here Math.random is fixed, so the pictures are the same each run.
import fs from 'fs';
import { open, SHOTS } from './lib.mjs';
const schemes = process.argv[2] ? [process.argv[2]] : ['light', 'dark'];
const errs = [];
const day = 864e5, now = Date.parse('2026-10-08T10:00:00');
const at = (d, h) => ({day: new Date(now - d * day).toISOString().slice(0, 10), t: now - d * day});
// Some progress, so Home shows a bar with both colours and all four statuses.
const MSEED = {subject: 'maths', m: {h: {
  m1p1: [Object.assign({ok: true, q: '2x+3=11'}, at(2)), Object.assign({ok: true, q: '5x+1=21'}, at(1)), Object.assign({ok: true, q: '4x+2=26'}, at(0))],
  m1p2: [Object.assign({ok: true, q: '3\\left(x-2\\right)=9'}, at(1))],
  m1p3: [Object.assign({ok: false, q: '7x-2=3x+10'}, at(1))]
}}};
const ESEED = {ans: {c1p1a: {ok: true, n: 1, t: now}, c1p1b: {ok: true, n: 1, t: now}, c1p2a: {ok: true, n: 1, t: now}, c1p3a: {ok: false, n: 1, t: now}}};
const fixRandom = () => { let s = 7; Math.random = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296; };

async function page(scheme, seed) {
  const r = await open({seed: seed, scheme: scheme, init: fixRandom});
  await r.p.clock.setFixedTime(now);
  return r;
}
const shot = (p, name) => p.screenshot({path: SHOTS + name + '.png'});
async function ready(p) { await p.waitForFunction(() => !!window.MathfieldElement && document.fonts.status === 'loaded'); await p.waitForTimeout(300); }
async function join(name, files, captions) {
  const imgs = files.map(f => 'data:image/png;base64,' + fs.readFileSync(SHOTS + f + '.png').toString('base64'));
  const {b, p} = await open({w: 1700, h: 940, dpr: 1});
  await p.setContent('<body style="margin:0;padding:10px;background:#8a8f9b;display:flex;gap:20px;font:14px system-ui;color:#fff">' +
    imgs.map((src, i) => '<figure style="margin:0;width:390px"><img src="' + src + '" style="width:390px;height:844px;display:block;border-radius:8px"><figcaption style="margin-top:6px">' + captions[i] + '</figcaption></figure>').join('') + '</body>');
  await p.screenshot({path: SHOTS + name + '.png'});
  await b.close();
}

for (const scheme of schemes) {
  const n = s => 'maths-' + scheme + '-' + s;
  // Maths: Home and the point sheet, with some progress.
  {
    const {b, p, errs: e} = await page(scheme, MSEED);
    await ready(p);
    await shot(p, n('home'));
    await p.locator('.pt[data-p="m1p2"]').click(); await p.waitForTimeout(400);
    await shot(p, n('sheet'));
    errs.push(...e); await b.close();
  }
  // Maths: the worked example, then the guided question with one line written and a second on its way.
  {
    const {b, p, errs: e} = await page(scheme, {subject: 'maths'});
    await ready(p);
    await p.locator('.hero .primary').click(); await p.waitForTimeout(400);
    await shot(p, n('worked'));
    await p.locator('#learnFeed .slide.wex .next').click(); await p.waitForTimeout(400);
    const k = name => p.locator('#mKeys .key[data-key="' + name + '"]').click();
    const latex = await p.locator('#learnFeed .slide.mq .mq-q math-span').textContent();
    // Write the right side worked out, then start the last line.
    const m = /^(\d+)-(\d+)x=(-?\d+)$/.exec(latex) || /^(\d+)x\+(\d+)=(-?\d+)$/.exec(latex);
    if (m) {
      const given = await p.locator('#learnFeed .slide.mq .line.given math-span').first().textContent();
      const lhs = given.split('=')[0], rhs = latex.startsWith(m[1] + '-') ? +m[3] - +m[1] : +m[3] - +m[2];
      for (const ch of (lhs + '=' + rhs).split('')) await k(ch === 'x' ? 't0' : ch === '=' ? 'equals' : ch === '-' ? 'minus' : ch);
      await k('enter');
      await k('t0'); await k('equals');
    }
    await p.waitForTimeout(250);
    await shot(p, n('guided'));
    errs.push(...e); await b.close();
  }
  // Economics: the same screens.
  {
    const {b, p, errs: e} = await page(scheme, ESEED);
    await shot(p, n('eco-home'));
    await p.locator('.pt[data-p="c1p1"]').click(); await p.waitForTimeout(400);
    await shot(p, n('eco-sheet'));
    await p.locator('#sheetClose').click(); await p.waitForTimeout(100);
    await p.locator('.hero .primary').click(); await p.waitForTimeout(400);
    await shot(p, n('eco-card'));
    await p.locator('#learnFeed .card .next').last().click(); await p.waitForTimeout(500);
    await shot(p, n('eco-question'));
    errs.push(...e); await b.close();
  }
  await join('maths-compare-' + scheme + '-1', [n('home'), n('eco-home'), n('worked'), n('eco-card')], ['Maths Home', 'Economics Home', 'Maths worked example', 'Economics card']);
  await join('maths-compare-' + scheme + '-2', [n('guided'), n('eco-question'), n('sheet'), n('eco-sheet')], ['Maths guided question', 'Economics check question', 'Maths point sheet', 'Economics point sheet']);
}
console.log('wrote maths screenshots to tests/shots/', errs.length ? errs : '');
