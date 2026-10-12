// The intro: the word Stratos with the rocket flying round it, each time v2.html is opened.
// It checks the intro plays on opening, a tap or a key skips it, reduced motion keeps it still, it never blocks the
// app for more than 2 seconds, switching tabs never plays it, and its chords are no louder than the ping.
// Every other test skips the intro (open() in lib.mjs). This one passes intro: true.
// node intro.mjs shots  also saves frames: intro-light.png and intro-dark.png, five moments side by side.
import { open, check, tab, pick, SHOTS } from './lib.mjs';
const R = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const gone = p => p.evaluate(() => !document.querySelector('#intro'));
// True when a tap in the middle of the screen would reach the app, not the intro.
const reaches = p => p.evaluate(() => { const e = document.elementFromPoint(innerWidth / 2, innerHeight / 2); return !!e && !e.closest('#intro'); });
// Times are counted from when the intro starts. The intro starts as the page's script runs, which can be a while after
// loading began (the typeface links hold the script back), so the test notes the moment the script has run.
const START = "document.addEventListener('DOMContentLoaded', () => { window.__t0 = performance.now(); });";
const started = fn => START + (fn ? '\n(' + fn + ')();' : '');
const since = p => p.evaluate(() => performance.now() - window.__t0);
const until = (p, ms) => p.waitForFunction(ms => performance.now() - window.__t0 >= ms, ms, {polling: 20, timeout: 10000});

// Holds the intro still so a test can draw any moment of it: requestAnimationFrame waits until __step(ms) runs the
// frames, performance.now stays at 0, and the intro's own timers and safety fade are switched off.
const HOLD = () => {
  const q = [];
  window.requestAnimationFrame = cb => { q.push(cb); return q.length; };
  window.cancelAnimationFrame = () => {};
  performance.now = () => 0;
  const st = window.setTimeout;
  window.setTimeout = (f, ms, ...a) => (ms >= 1000 && ms <= 1800 ? 0 : st(f, ms, ...a));
  window.__step = ms => { const now = q.splice(0); now.forEach(cb => cb(ms)); };
  document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = '#intro{animation:none!important}'; document.head.appendChild(s); });
};
// What is on each canvas: dark pixels are the rocket's hull, blue ones the trail. x and y are the middle of the hull.
const look = p => p.evaluate(() => {
  const stats = c => {
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data, w = c.width;
    let dark = 0, blue = 0, sx = 0, sy = 0;
    for (let i = 0; i < d.length; i += 4) {
      const a = d[i + 3]; if (a < 60) continue;
      const r = d[i], g = d[i + 1], b = d[i + 2], k = i / 4;
      if (r < 90 && g < 90 && b < 90 && a > 100) { dark++; sx += k % w; sy += (k / w) | 0; } else if (b > r + 60) blue++;
    }
    return {dark: dark, blue: blue, x: dark ? sx / dark : null, y: dark ? sy / dark : null};
  };
  const el = document.querySelector('#intro');
  if (!el) return null;
  const r = el.querySelector('.i-text').getBoundingClientRect();
  return {back: stats(el.querySelector('.i-back')), front: stats(el.querySelector('.i-front')), wx: r.left + r.width / 2, wy: r.top + r.height / 2, ww: r.width};
});

// ---------- 1. it plays on opening, then fades into Home ----------
{
  const {b, p, errs} = await open({intro: true, waitUntil: 'domcontentloaded', motion: true, init: started()});
  const t = await since(p);
  const on = await p.evaluate(() => { const e = document.querySelector('#intro'); return !!e && getComputedStyle(e).visibility === 'visible'; });
  check(on && t < 1400, 'the intro is on screen when the app opens (' + Math.round(t) + ' ms)', R);
  const word = await p.evaluate(() => { const w = document.querySelector('#intro .i-text'); return w && w.textContent + '|' + getComputedStyle(w).fontFamily; });
  check(/^Stratos\|.*Archivo/.test(word || ''), 'it shows the word Stratos in the logo typeface', R);
  check(!(await reaches(p)), 'while it plays, a tap goes to the intro, not the app', R);
  await p.waitForFunction(() => !document.querySelector('#intro'), null, {polling: 10, timeout: 4000});
  const end = await since(p);
  check(end >= 1450 && end <= 1900, 'it ends after about 1.5 seconds and a quick fade (' + Math.round(end) + ' ms)', R);
  check(await p.locator('.hero .primary').isVisible(), 'then Home is there', R);
  await p.click('.hero .primary'); await wait(150);
  check(await p.locator('#v-learn.on').count() === 1, 'and Home works: its button opens Learn', R);
  check(errs.length === 0, 'no script errors: ' + errs.join(' | '), R);
  await b.close();
}

// ---------- 2. the path, drawn a moment at a time (light, so the hull is dark) ----------
{
  const {b, p, errs} = await open({intro: true, waitUntil: 'domcontentloaded', motion: true, dpr: 1, init: HOLD});
  const frames = [];
  for (let ms = 10; ms <= 1500; ms += 20) { await p.evaluate(ms => window.__step(ms), ms); frames.push(Object.assign({ms: ms}, await look(p))); }
  const f0 = frames[0];
  check(f0.front.dark > 0 && f0.back.dark === 0 && f0.front.y > f0.wy, 'it starts at the bottom of the ring, in front of the word', R);
  const off = frames.find(f => f.front.x !== null && Math.abs(f.front.x - f.wx) > 40);
  check(!!off && off.front.x > off.wx, 'it goes round right side first', R);
  const behind = frames.filter(f => f.ms <= 1100 && f.back.dark > 0 && f.front.dark === 0);
  const overTop = behind.filter(f => Math.abs(f.back.x - f.wx) < f.ww / 4);   // the ring is tilted, so only its middle is plainly above the word
  check(overTop.length > 0 && overTop.every(f => f.back.y < f.wy), 'on the upper half it is behind the word', R);
  const big = Math.max(...frames.map(f => f.front.dark)), small = Math.max(...frames.map(f => f.back.dark));
  check(big > small * 1.15, 'it is larger in front than behind (' + big + ' against ' + small + ' hull pixels)', R);
  check(frames.some(f => f.front.blue > 0) && frames.some(f => f.back.blue > 0), 'its blue trail passes in front of and behind the word', R);
  const ringW = f => Math.abs(f.front.x === null ? f.back.x - f.wx : f.front.x - f.wx);
  const orbiting = frames.filter(f => f.ms <= 1100 && (f.front.dark || f.back.dark));
  check(orbiting.every(f => ringW(f) <= f.ww / 2 + 28 + 6), 'during the orbit it stays on the ring, 28 px past the word', R);
  const last = frames.filter(f => f.front.dark || f.back.dark).pop();
  check(last.ms > 1100 && last.ms < 1480, 'after the orbit it spirals out and has left the frame by 1.5 seconds (last seen at ' + last.ms + ' ms)', R);
  const after = frames.filter(f => f.ms > last.ms);
  check(after.length > 0 && after.every(f => f.front.dark === 0 && f.back.dark === 0), 'once it has left the frame it is not drawn again', R);
  let same = 0;
  for (let i = 1; i < frames.length; i++) if (JSON.stringify(frames[i]) === JSON.stringify(Object.assign({}, frames[i - 1], {ms: frames[i].ms}))) same++;
  check(same < 6, 'it moves from frame to frame', R);
  check(errs.length === 0, 'no script errors: ' + errs.join(' | '), R);
  await b.close();
}

// ---------- 3. a tap, a click or a key skips it, and does not press anything underneath ----------
for (const how of ['tap', 'click', 'key']) {
  const {b, p, errs} = await open({intro: true, waitUntil: 'domcontentloaded', motion: true, w: how === 'click' ? 1000 : 390, init: started()});
  const btn = await p.locator('.hero .primary').boundingBox();
  const x = btn.x + btn.width / 2, y = btn.y + btn.height / 2;
  const at = await p.evaluate(() => performance.now());
  check(await since(p) < 1000, 'the ' + how + ' comes while the intro plays', R);
  if (how === 'tap') await p.touchscreen.tap(x, y);
  else if (how === 'click') await p.mouse.click(x, y);
  else await p.keyboard.press('Enter');
  await p.waitForFunction(() => !document.querySelector('#intro'), null, {polling: 10, timeout: 2000}).catch(() => {});
  const took = await p.evaluate(at => performance.now() - at, at);
  check(await gone(p) && took < 300, 'a ' + how + ' skips the intro (gone in ' + Math.round(took) + ' ms)', R);
  await wait(200);
  check(await p.locator('#v-home.on').count() === 1 && await p.locator('#sheet').isHidden() && await p.locator('#pages .page').count() === 0,
    'the ' + how + ' that skipped it did not press the button underneath', R);
  if (how === 'tap') await p.touchscreen.tap(x, y); else await p.mouse.click(x, y);
  await wait(150);
  check(await p.locator('#v-learn.on').count() === 1, 'after a ' + how + ' skip, Home works', R);
  check(errs.length === 0, 'no script errors: ' + errs.join(' | '), R);
  await b.close();
}

// ---------- 4. reduced motion: the word with the rocket parked in front, still, then Home ----------
{
  const {b, p, errs} = await open({intro: true, waitUntil: 'domcontentloaded', init: started()});
  const one = await look(p), pic = () => p.evaluate(() => [...document.querySelectorAll('#intro canvas')].map(c => c.toDataURL()).join());
  check(!!one && one.front.dark > 0 && one.back.dark === 0 && one.front.y > one.wy, 'reduced motion: the rocket is parked in front of the word', R);
  check(!!one && one.front.blue === 0 && one.back.blue === 0, 'reduced motion: no trail', R);
  await p.evaluate(() => document.fonts.ready);              // the ring is fitted again once the typeface arrives
  const a = await pic(); await wait(400); const c = await pic();
  check(a === c, 'reduced motion: nothing moves', R);
  await until(p, 1800);
  check(await gone(p), 'reduced motion: it fades into Home by 1.8 seconds', R);
  check(errs.length === 0, 'no script errors: ' + errs.join(' | '), R);
  await b.close();
}

// ---------- 5. it never blocks the app for more than 2 seconds ----------
const BROKEN = {
  'with motion': {motion: true, init: started()},
  'with reduced motion': {init: started()},
  'when animation frames never come': {motion: true, init: started(() => { window.requestAnimationFrame = () => 0; })},
  'when drawing the rocket fails': {motion: true, init: started(() => { window.Path2D = function () { throw new Error('made to fail by the test'); }; })},
  'when the page script stops with an error': {motion: true, init: started(() => { HTMLCanvasElement.prototype.getContext = () => { throw new Error('made to fail by the test'); }; }), dead: true}
};
for (const name in BROKEN) {
  const o = BROKEN[name];
  const {b, p, errs} = await open(Object.assign({intro: true, waitUntil: 'domcontentloaded'}, o));
  await until(p, 2000);
  check(await reaches(p), name + ': after 2 seconds a tap reaches the app', R);
  if (!o.dead) {
    check(await gone(p), name + ': the intro is gone', R);
    check(errs.length === 0, name + ': no script errors: ' + errs.join(' | '), R);
  }
  await b.close();
}

// ---------- 6. switching tabs never plays it ----------
{
  const {b, p, errs} = await open({intro: true, waitUntil: 'domcontentloaded', motion: true, init: () => {
    window.__shown = 0;
    document.addEventListener('DOMContentLoaded', () => new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) if (n.id === 'intro') window.__shown++; }).observe(document, {childList: true, subtree: true}));
  }});
  await p.waitForFunction(() => !document.querySelector('#intro'), null, {timeout: 4000});
  let never = true;
  for (const t of ['learn', 'practice', 'search', 'you', 'home', 'practice', 'home']) {
    await tab(p, t);
    if (!(await gone(p))) never = false;
  }
  await p.click('[data-act="page"][data-page="friends"]'); await wait(250);
  const paged = await p.locator('#pages .page').count() === 1;
  if (!(await gone(p))) never = false;
  await p.keyboard.press('Escape'); await wait(150);
  check(paged && never && await p.evaluate(() => window.__shown) === 0, 'switching tabs and opening a page never plays the intro', R);
  check(errs.length === 0, 'no script errors: ' + errs.join(' | '), R);
  await b.close();
}

// ---------- 7. the chords are no louder than the ping ----------
// The page's AudioContext is swapped for an offline one that keeps real time, so the app's own sound chain
// (its volume, compressor and ceiling) is recorded instead of played.
const RECORD = () => {
  const SR = 44100, Real = window.OfflineAudioContext;
  window.__rec = [];
  class Rec extends Real {
    constructor() { super(2, SR * 6, SR); this.t0 = performance.now(); window.__rec.push(this); }
    get currentTime() { return (performance.now() - this.t0) / 1000; }
    get state() { return 'running'; }
    resume() { return Promise.resolve(); }
  }
  window.AudioContext = Rec; window.webkitAudioContext = Rec;
};
// The peak, and the loudest 50 ms, of what was recorded, plus the level in three windows (one per chord).
const measure = p => p.evaluate(async () => {
  if (!window.__rec.length) return null;
  const buf = await window.__rec[0].startRendering(), sr = buf.sampleRate, ch = [buf.getChannelData(0), buf.getChannelData(1)];
  let peak = 0;
  for (const d of ch) for (let i = 0; i < d.length; i++) peak = Math.max(peak, Math.abs(d[i]));
  const rms = (a, z) => { let s = 0, n = 0; for (const d of ch) for (let i = Math.floor(a * sr); i < Math.min(d.length, z * sr); i++) { s += d[i] * d[i]; n++; } return Math.sqrt(s / Math.max(1, n)); };
  let loud = 0;
  for (let t = 0; t < buf.duration - 0.05; t += 0.01) loud = Math.max(loud, rms(t, t + 0.05));
  return {peak: peak, loud: loud, parts: [rms(0, 0.45), rms(0.5, 0.95), rms(1, 1.45)]};
});
{
  const one = await open({intro: true, waitUntil: 'domcontentloaded', motion: true, init: started(RECORD)});
  await until(one.p, 2600);
  const chords = await measure(one.p);
  check(one.errs.length === 0, 'no script errors with the intro chords: ' + one.errs.join(' | '), R);
  await one.b.close();

  const two = await open({init: RECORD});
  await two.p.click('.hero .primary'); await wait(150);
  await two.p.locator('#learnFeed .card .next').last().click(); await wait(80);
  await pick(two.p, '#learnFeed', true);
  await wait(800);
  const ping = await measure(two.p);
  check(two.errs.length === 0, 'no script errors with the ping: ' + two.errs.join(' | '), R);
  await two.b.close();

  const f = n => n.toFixed(3);
  check(!!chords && !!ping, 'the chords and the ping were both recorded', R);
  if (chords && ping) {
    check(chords.parts.every(v => v > ping.loud * 0.05), 'there are three chords, at 0, 0.5 and 1 seconds (' + chords.parts.map(f).join(', ') + ')', R);
    check(chords.peak <= ping.peak, 'the chords peak no higher than the ping (' + f(chords.peak) + ' against ' + f(ping.peak) + ')', R);
    check(chords.loud <= ping.loud, 'the loudest 50 ms of the chords is no louder than the ping\'s (' + f(chords.loud) + ' against ' + f(ping.loud) + ')', R);
  }

  const off = await open({intro: true, waitUntil: 'domcontentloaded', motion: true, init: started(RECORD), seed: {sound: false}});
  await until(off.p, 1000);
  check(await off.p.evaluate(() => window.__rec.length) === 0, 'with sound off in You, the intro is silent', R);
  await off.b.close();
}

// ---------- screenshots: five moments side by side, light and dark ----------
if (process.argv[2] === 'shots') {
  for (const scheme of ['light', 'dark']) {
    const {b, p} = await open({intro: true, waitUntil: 'domcontentloaded', motion: true, scheme: scheme, init: HOLD});
    const shots = [];
    for (let ms = 10; ms <= 1300; ms += 10) {
      await p.evaluate(ms => window.__step(ms), ms);
      if ([100, 400, 700, 1000, 1300].includes(ms)) shots.push((await p.screenshot({clip: {x: 0, y: 300, width: 390, height: 244}})).toString('base64'));
    }
    const page = await b.newPage({viewport: {width: 390 * 5 + 40, height: 244}, deviceScaleFactor: 2});
    await page.setContent('<body style="margin:0;display:flex;gap:10px;background:#888">' + shots.map(s => '<img style="width:390px" src="data:image/png;base64,' + s + '">').join('') + '</body>');
    await page.screenshot({path: SHOTS + 'intro-' + scheme + '.png'});
    await b.close();
  }
  console.log('saved intro-light.png and intro-dark.png in tests/shots');
}

console.log(R.join('\n'));
process.exit(process.exitCode || 0);
