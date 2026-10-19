// Full screen from the Home Screen: v2.html and maths-lab.html with no browser bars, on phones with safe areas.
// Chromium is told the safe areas a real phone has (the status bar at the top, the home indicator at the bottom),
// then each screen with a keypad is checked: nothing scrolls, nothing sits under the status bar, every key and button
// is above the home indicator, and the bottom pieces (tab bar, keypad) reach the bottom edge in their own colour.
// Also: the status bar colour (theme-color) follows Light or Dark picked in You.
// Saves screenshots to tests/shots/: fs-v2-<phone>-<screen>.png and fs-lab-<phone>.png.
import { chromium } from 'playwright';
import fs from 'fs';
import { serve } from './serve.mjs';
import { SHOTS, check } from './lib.mjs';
const R = [], errs = [];
const EXE = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const server = await serve();
const b = await chromium.launch(EXE ? {executablePath: EXE} : {});

// iPhone 14 from the Home Screen: the page starts under the status bar (the default style), with the home indicator
// at the bottom. Then the same phone with the page reaching under the status bar too, in case a phone does that.
// Then an Android phone, which has no safe areas in a standalone app. And a small iPhone (SE), which has none either.
const PHONES = [
  {name: 'iphone', w: 390, h: 797, top: 0, bottom: 34},
  {name: 'iphone-top', w: 390, h: 844, top: 47, bottom: 34},
  {name: 'android', w: 412, h: 891, top: 0, bottom: 0},
  {name: 'iphone-se', w: 375, h: 647, top: 0, bottom: 0}
];
const T = Date.now(), h = q => ({ok: true, day: '2026-10-01', q: q, t: T - 1e6});
const SEED = {subject: 'maths', m: {cur: 'm1', h: {m1p1: [h('a')], m1p2: [h('b')]}}};

async function page(ph, file, o = {}) {
  const ctx = await b.newContext({viewport: {width: ph.w, height: ph.h}, deviceScaleFactor: 2, hasTouch: true, colorScheme: o.scheme || 'light', reducedMotion: 'reduce'});
  if (o.seed) await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('stratos2.v1', JSON.stringify(s)); sessionStorage.setItem('seeded', '1'); } }, o.seed);
  await ctx.addInitScript(() => { window.stratosIntro = false; });   // skip the intro (tests/intro.mjs tests it)
  await ctx.addInitScript(() => { window.stratosWelcome = false; }); // and the welcome screen (tests/welcome.mjs tests it)
  await ctx.addInitScript(() => { window.stratosSetup = false; });   // and the first-open course steps (tests/first-open.mjs)
  const p = await ctx.newPage();
  p.on('pageerror', e => errs.push(ph.name + ' ' + file + ': ' + e.message));
  const cdp = await ctx.newCDPSession(p);
  await cdp.send('Emulation.setSafeAreaInsetsOverride', {insets: {top: ph.top, bottom: ph.bottom, left: 0, right: 0}});
  await p.goto(server.url + file);
  await p.waitForTimeout(300);
  return {ctx, p};
}
// Where things are on screen. A missing or hidden element gives null.
const boxes = (p, sels) => p.evaluate(sels => {
  const out = {ih: innerHeight, iw: innerWidth, sh: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth};
  for (const k in sels) {
    const all = Array.from(document.querySelectorAll(sels[k])).filter(e => e.offsetParent || getComputedStyle(e).position === 'fixed');
    if (!all.length) { out[k] = null; continue; }
    const rs = all.map(e => e.getBoundingClientRect());
    out[k] = {top: Math.min(...rs.map(r => r.top)), bottom: Math.max(...rs.map(r => r.bottom)), h: Math.min(...rs.map(r => r.height))};
  }
  return out;
}, sels);
const fits = (m, ph) => m.sh <= m.ih && m.sw <= m.iw;
const above = (box, m, ph) => !!box && box.bottom <= m.ih - ph.bottom + 0.5;
const below = (box, ph) => !!box && box.top >= ph.top - 0.5;
const ready = p => p.waitForFunction(() => document.querySelector('#app').dataset.work !== undefined && document.querySelector('#launch').hidden, null, {timeout: 8000}).then(() => p.waitForTimeout(250));

// ---------- v2.html ----------
for (const ph of PHONES) {
  const n = 'fs-v2-' + ph.name;
  const {ctx, p} = await page(ph, 'v2.html', {seed: SEED});
  await p.waitForFunction(() => !!window.MathfieldElement, null, {timeout: 8000});
  // Home: the tab bar reaches the bottom edge, its buttons sit above the home indicator.
  let m = await boxes(p, {top: '.top', tabs: '#tabs', tab: '.tab'});
  check(fits(m, ph) && below(m.top, ph), ph.name + ': Home fits with no scroll, below the status bar', R);
  check(Math.abs(m.tabs.bottom - m.ih) < 1 && above(m.tab, m, ph) && m.tab.h >= 44, ph.name + ': the tab bar reaches the bottom edge and its buttons (' + Math.round(m.tab.h) + ' px) are above the home indicator', R);
  await p.screenshot({path: SHOTS + n + '-home.png'});

  // A maths Practice flight on the keypad.
  await p.locator('.tab[data-tab="practice"]').tap(); await p.waitForTimeout(200);
  await p.locator('#pracStart [data-act="start"]').tap();
  await ready(p);
  const KEYS = {hud: '#hud', q: '#feed .slide.mq:not(.done) .mq-q', pad: '#mPad', keys: '#mPad .key', done: '#mDone', enter: '#mPad .key[data-key="enter"]'};
  m = await boxes(p, KEYS);
  check(fits(m, ph) && below(m.hud, ph), ph.name + ': the Practice flight fits with no scroll, below the status bar', R);
  check(Math.abs(m.pad.bottom - m.ih) < 1 && above(m.keys, m, ph) && above(m.enter, m, ph) && above(m.done, m, ph), ph.name + ': the keypad reaches the bottom edge, and Enter, Done and every key are above the home indicator', R);
  check(m.keys.h >= 36 && m.q.bottom <= m.pad.top && m.q.top >= m.hud.bottom - 0.5, ph.name + ': keys are ' + Math.round(m.keys.h) + ' px, and the question shows between the altitude and the keypad', R);
  await p.screenshot({path: SHOTS + n + '-flight.png'});

  // A maths question in Learn, on the keypad.
  await p.locator('#endBtn').tap(); await p.waitForTimeout(150);
  await p.locator('.tab[data-tab="learn"]').tap(); await p.waitForTimeout(300);
  await p.locator('#learnFeed .slide.wex .next').tap();
  await ready(p);
  m = await boxes(p, {bar: '#learnBar', q: '#learnFeed .slide.mq:not(.done) .mq-q', pad: '#mPad', keys: '#mPad .key', done: '#mDone', enter: '#mPad .key[data-key="enter"]'});
  check(fits(m, ph) && below(m.bar, ph) && Math.abs(m.pad.bottom - m.ih) < 1 && above(m.keys, m, ph) && above(m.done, m, ph), ph.name + ': a Learn question fits, below the status bar, with every key above the home indicator', R);
  check(m.q.bottom <= m.pad.top && m.q.top >= m.bar.bottom - 0.5, ph.name + ': the Learn question shows between the bar and the keypad', R);
  await p.screenshot({path: SHOTS + n + '-learn.png'});

  // A sheet and a message thread: their buttons are above the home indicator.
  await p.locator('#mClose').tap(); await p.waitForTimeout(200);
  await p.locator('[data-act="page"][data-page="friends"]').tap(); await p.waitForTimeout(200);
  await p.locator('.thr[data-f="tom"]').tap(); await p.waitForTimeout(200);
  m = await boxes(p, {chips: '.composer .chip', acts: '.composer .acts button', head: '.page .p-head, .page header'});
  check(fits(m, ph) && above(m.chips, m, ph) && above(m.acts, m, ph) && below(m.head, ph), ph.name + ': a thread fits, with the message buttons above the home indicator', R);
  await p.locator('[data-act="pickch"][data-kind="race"]').tap(); await p.waitForTimeout(250);
  m = await boxes(p, {pick: '#sheetBody .pick'});
  check(above(m.pick, m, ph), ph.name + ': the last button on a sheet is above the home indicator', R);
  await p.screenshot({path: SHOTS + n + '-sheet.png'});
  await ctx.close();
}

// The Sky background: the keypad's dark blue reaches the bottom edge, with no band of another colour under it.
{
  const ph = PHONES[0];
  const {ctx, p} = await page(ph, 'v2.html', {seed: Object.assign({}, SEED, {bg: 'sky'}), scheme: 'dark'});
  await p.waitForFunction(() => !!window.MathfieldElement, null, {timeout: 8000});
  await p.locator('.tab[data-tab="practice"]').tap(); await p.waitForTimeout(200);
  await p.locator('#pracStart [data-act="start"]').tap();
  await ready(p);
  const shot = await p.screenshot({clip: {x: 0, y: ph.h - 20, width: ph.w, height: 20}});
  const col = await p.evaluate(src => new Promise(ok => { const i = new Image(); i.onload = () => { const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const x = c.getContext('2d'); x.drawImage(i, 0, 0); ok(Array.from(x.getImageData(i.width / 2, i.height - 2, 1, 1).data.slice(0, 3))); }; i.src = src; }), 'data:image/png;base64,' + shot.toString('base64'));
  const pad = await p.evaluate(() => getComputedStyle(document.querySelector('#mPad')).backgroundColor);
  check('rgb(' + col.join(', ') + ')' === pad, 'with the Sky background, the strip under the keypad is the keypad\'s own colour (' + pad + ')', R);
  await p.screenshot({path: SHOTS + 'fs-v2-iphone-sky.png'});
  await ctx.close();
}

// The status bar colour: the phone's setting, unless Light or Dark is picked in You.
{
  const ph = PHONES[0];
  const {ctx, p} = await page(ph, 'v2.html', {});
  const colours = () => p.evaluate(() => Array.from(document.querySelectorAll('meta[name="theme-color"]')).map(m => m.media + ' ' + m.content).join(' | '));
  check((await colours()) === '(prefers-color-scheme: light) #ffffff | (prefers-color-scheme: dark) #15161a', 'with System picked, the status bar is white in light mode and dark in dark mode', R);
  await p.locator('.tab[data-tab="you"]').tap(); await p.waitForTimeout(150);
  await p.locator('[data-act="theme"][data-v="dark"]').tap(); await p.waitForTimeout(100);
  check((await colours()) === '(prefers-color-scheme: light) #15161a | (prefers-color-scheme: dark) #15161a', 'with Dark picked in You, the status bar is dark whatever the phone is set to', R);
  await p.locator('[data-act="theme"][data-v="light"]').tap(); await p.waitForTimeout(100);
  check((await colours()) === '(prefers-color-scheme: light) #ffffff | (prefers-color-scheme: dark) #ffffff', 'with Light picked, it is white', R);
  await p.locator('[data-act="theme"][data-v="system"]').tap(); await p.waitForTimeout(100);
  check((await colours()) === '(prefers-color-scheme: light) #ffffff | (prefers-color-scheme: dark) #15161a', 'and System puts both back', R);
  await ctx.close();
}

// ---------- maths-lab.html ----------
for (const ph of PHONES) {
  for (const scheme of ['light', 'dark']) {
    const {ctx, p} = await page(ph, 'maths-lab.html', {scheme});
    await p.locator('#start').tap(); await p.waitForTimeout(600);
    const m = await boxes(p, {top: '.top', keys: '#keys .key', done: '#done, .keypad .done', enter: '.key[data-key="enter"]', pad: '.keypad'});
    if (scheme === 'light') {
      check(fits(m, ph) && below(m.top, ph), ph.name + ': the Maths Lab fits with no scroll, below the status bar', R);
      check(above(m.keys, m, ph) && above(m.enter, m, ph) && above(m.done, m, ph) && m.keys.h >= 36, ph.name + ': in the lab, Enter, Done and every key (' + Math.round(m.keys.h) + ' px) are above the home indicator', R);
    }
    await p.screenshot({path: SHOTS + 'fs-lab-' + ph.name + '-' + scheme + '.png'});
    await ctx.close();
  }
}

check(!errs.length, 'no script errors: ' + errs.join(' | '), R);
await b.close();
console.log(R.join('\n'));
console.log('errors:', errs);
process.exit(process.exitCode || 0);
