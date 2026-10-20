// Asking a student who is not signed in to make an account: the welcome screen on a device's first open, the offer
// after the first chapter learned, and Home's top bar (Sign in while signed out, and the store). Every other test
// skips the welcome screen and the offer: open() sets window.stratosWelcome = false unless a test passes welcome: true.
// node welcome.mjs shots also saves welcome, save-offer, home-top-signedout and home-top-signedin, light and dark,
// at 390 by 844.
import fs from 'fs';
import { open, saved, tab, pick, shot, check } from './lib.mjs';
const R = [], SHOTS = process.argv[2] === 'shots', errsAll = [];
const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8');
const LM = new Function(read('lab/maths.js') + '; return LabMaths;')();
const T = Date.now() - 36e5, DAY = new Date().toISOString().slice(0, 10);
const LINE = 'Your syllabus in short cards. Race your friends on it.';
const FINE = 'An account keeps your progress on every device. Trying it first keeps it on this device, and you can sign in later from Home.';
const OFFER = 'Save your progress so you don’t lose it';
// Economics answers, right, on the points given: each one makes its point learned.
const ans = ids => Object.fromEntries(ids.map((id, i) => [id + 'a', {ok: true, n: 1, t: T + i}]));
const pts = (ch, n) => Array.from({length: n}, (_, i) => ch + 'p' + (i + 1));
// A device that is signed in, as far as the page can tell: stratos2.sync names an account. Nothing reaches Supabase.
const SIGNED = () => { localStorage.setItem('stratos2.sync', JSON.stringify({uid: '00000000-0000-0000-0000-000000000001', email: 'a@example.com', rev: 1, hash: ''})); };
const shown = (p, sel) => p.locator(sel).isVisible();
const title = p => p.locator('#sheetTitle').textContent();
// Every request the page makes for the Supabase library or a supabase.co address.
function watch(d) { const seen = []; d.p.on('request', r => { if (/supabase/.test(r.url())) seen.push(r.url()); }); return seen; }
async function close(d) { errsAll.push(...d.errs); await d.b.close(); }

// ---------- the welcome screen ----------
{
  const d = await open({welcome: true});
  const asked = watch(d);
  check(await shown(d.p, '#welcome'), 'a first open shows the welcome screen', R);
  check((await d.p.locator('#welcome .word').textContent()) === 'Stratos' && (await d.p.locator('#welcome .w-line').textContent()) === LINE, 'with the word and its one line', R);
  check((await d.p.locator('#welcome .primary').textContent()) === 'Create an account' && (await d.p.locator('#welcome .textbtn').textContent()) === 'Try it first', 'a large Create an account, and Try it first under it', R);
  check((await d.p.locator('#welcome .fine').textContent()) === FINE, 'and the small print', R);
  const big = await d.p.locator('#welcome .primary').boundingBox(), small = await d.p.locator('#welcome .textbtn').boundingBox();
  check(big.width > 340 && big.height >= 54 && small.y > big.y + big.height, 'Create an account is the full width, with Try it first below it', R);
  check(await d.p.evaluate(() => document.querySelector('#v-home').inert && document.querySelector('#tabs').inert), 'Home and the tabs cannot be reached behind it', R);
  // Tab moves only between the welcome screen's two buttons. After the last one, focus leaves the page for the
  // browser's own controls (the body is focused), then comes back to the first.
  const stops = [];
  for (let i = 0; i < 5; i++) { await d.p.keyboard.press('Tab'); stops.push(await d.p.evaluate(() => { const a = document.activeElement; return a === document.body ? 'browser' : a.closest('#welcome') ? a.dataset.act : 'behind'; })); }
  check(stops.indexOf('behind') < 0 && stops.indexOf('wcreate') >= 0 && stops.indexOf('wtry') >= 0, 'the keyboard stays on the welcome screen (' + stops.join(', ') + ')', R);
  if (SHOTS) await shot(d.p, 'welcome-light');
  await d.p.locator('#welcome .textbtn').click(); await d.p.waitForTimeout(150);
  check(!(await shown(d.p, '#welcome')) && await d.p.locator('#v-home.on .hero').isVisible(), 'Try it first goes to Home', R);
  check(!(await d.p.evaluate(() => document.querySelector('#v-home').inert || document.querySelector('#tabs').inert)), 'and Home and the tabs work again', R);
  check((await saved(d.p)).welcomed === 1, 'the device remembers the welcome was seen', R);
  await tab(d.p, 'learn'); await tab(d.p, 'home');
  check(!(await shown(d.p, '#sheet')) && !(await shown(d.p, '#welcome')), 'the app works with no account', R);
  check(asked.length === 0, 'and nothing asked of Supabase, not even the library', R);
  await d.p.reload(); await d.p.waitForTimeout(300);
  check(!(await shown(d.p, '#welcome')), 'the second open goes straight to Home', R);
  await close(d);
}
{
  const d = await open({welcome: true});
  const asked = watch(d);
  await d.p.locator('#welcome .primary').click(); await d.p.waitForTimeout(200);
  check(!(await shown(d.p, '#welcome')) && (await title(d.p)) === 'Create an account' && await shown(d.p, '#emailIn'), 'Create an account opens the email sheet, named Create an account', R);
  check((await d.p.locator('#sheetBody .sub').first().textContent()) === 'We’ll email you a 6-digit code. It makes your account, or signs you in if you have one.', 'which says one email makes the account or signs in', R);
  check(asked.some(u => u.includes('vendor/supabase/supabase.js')), 'and only then loads the Supabase library', R);
  check((await saved(d.p)).welcomed === 1, 'the welcome counts as seen', R);
  await d.p.locator('#sheetClose').click(); await d.p.waitForTimeout(100);
  check(await shown(d.p, '.top .signin'), 'closing the sheet leaves Home, with Sign in in the top bar', R);
  await close(d);
}
{
  const d = await open({welcome: true, accounts: false});
  check(!(await shown(d.p, '#welcome')) && await d.p.locator('.top .signin').count() === 0, 'with accounts switched off: no welcome screen and no Sign in', R);
  await close(d);
}
{
  const d = await open({welcome: true, seed: {ans: ans(['c1p1'])}});
  check(!(await shown(d.p, '#welcome')), 'a device that already has progress gets no welcome screen', R);
  await close(d);
}
{
  const d = await open({welcome: true, init: SIGNED});
  check(!(await shown(d.p, '#welcome')), 'a device that is signed in gets no welcome screen', R);
  await close(d);
}
{
  const d = await open({welcome: true, query: '#error_description=Email+link+is+invalid+or+has+expired'});
  check(!(await shown(d.p, '#welcome')), 'a page opened from a sign-in link gets no welcome screen', R);
  await close(d);
}
// With the intro: the welcome screen waits under it, and the tap that skips the intro does not press Create an account.
{
  const d = await open({welcome: true, intro: true, motion: true});
  check(await d.p.locator('#intro').count() === 1 && await d.p.evaluate(() => !document.querySelector('#welcome').hidden), 'the welcome screen waits under the intro', R);
  const b = await d.p.locator('#welcome .primary').boundingBox();
  await d.p.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2); await d.p.waitForTimeout(500);
  check(await d.p.locator('#intro').count() === 0 && await shown(d.p, '#welcome') && !(await shown(d.p, '#sheet')), 'a tap on the intro skips it into the welcome screen without pressing its button', R);
  await close(d);
}
{
  const d = await open({welcome: true, intro: true, motion: true});
  await d.p.waitForTimeout(2200);
  check(await d.p.locator('#intro').count() === 0 && await shown(d.p, '#welcome'), 'left to play, the intro ends on the welcome screen', R);
  await close(d);
}
// Small phones: the line and the buttons never overlap, and nothing is cut off.
for (const [w, h] of [[360, 640], [360, 520], [320, 480]]) {
  const d = await open({welcome: true, w: w, h: h});
  const r = await d.p.evaluate(() => {
    const box = s => document.querySelector(s).getBoundingClientRect(), mid = box('#welcome .w-mid'), end = box('#welcome .w-end'), wel = document.querySelector('#welcome');
    return {gap: end.top - mid.bottom, wide: Math.max(mid.right, end.right) <= innerWidth && document.documentElement.scrollWidth <= innerWidth,
      reach: wel.scrollHeight <= wel.clientHeight || getComputedStyle(wel).overflowY === 'auto'};
  });
  check(r.gap > 8 && r.wide && r.reach, 'at ' + w + ' by ' + h + ', the welcome screen fits with no overlap (' + Math.round(r.gap) + ' px between)', R);
  await close(d);
}

// ---------- the offer after the first chapter learned ----------
// Learn the one point left in the chapter on Home, then go to the end slide.
async function learnLast(p) {
  await tab(p, 'home');
  await p.locator('.hero .primary').click(); await p.waitForTimeout(150);
  await p.locator('#learnFeed .card .next').last().click(); await p.waitForTimeout(60);
  await pick(p, '#learnFeed', true);
  await p.locator('#learnFeed .slide.q.done .next').last().click(); await p.waitForTimeout(450);
}
{
  const d = await open({welcome: true, seed: {ans: ans(pts('c1', 6)), welcomed: 1}});
  await learnLast(d.p);
  check((await d.p.locator('#learnFeed .endslide .ctitle').textContent()) === 'Chapter learned', 'Economics: the last point learned ends on Chapter learned', R);
  check(await shown(d.p, '#sheet') && (await title(d.p)) === OFFER, 'and the offer opens: ' + OFFER, R);
  check((await d.p.locator('#sheetBody .sub').textContent()) === 'Your progress is on this device only. An account keeps it if you lose or change your phone.', 'it says where the progress is now', R);
  check((await d.p.locator('#sheetBody .cta button').allTextContents()).join(', ') === 'Create an account, Not now', 'with Create an account and Not now', R);
  if (SHOTS) await shot(d.p, 'save-offer-light');
  await d.p.locator('#sheetBody .cta .primary').click(); await d.p.waitForTimeout(150);
  check((await title(d.p)) === 'Create an account' && await shown(d.p, '#emailIn'), 'Create an account opens the email sheet', R);
  check((await saved(d.p)).offered === 1, 'the offer is remembered as made', R);
  await close(d);
}
{
  const d = await open({welcome: true, seed: {ans: ans(pts('c1', 6).concat(pts('c2', 6))), welcomed: 1}});
  await learnLast(d.p);
  await d.p.locator('#sheetBody [data-act="sheetclose"]').click(); await d.p.waitForTimeout(100);
  check(!(await shown(d.p, '#sheet')) && (await saved(d.p)).offered === 1, 'Not now closes the offer, and the device remembers it', R);
  await d.p.evaluate(() => { const el = document.querySelector('#learnFeed'); el.scrollTop = 0; }); await d.p.waitForTimeout(250);
  await d.p.evaluate(() => { const el = document.querySelector('#learnFeed'); el.scrollTop = el.lastElementChild.offsetTop; }); await d.p.waitForTimeout(400);
  check(!(await shown(d.p, '#sheet')), 'scrolling back to the end slide does not ask again', R);
  await d.p.locator('#learnFeed .endslide [data-act="learnch"]').click(); await d.p.waitForTimeout(150);
  await d.p.locator('#learnFeed .card .next').last().click(); await d.p.waitForTimeout(60);
  await pick(d.p, '#learnFeed', true);
  await d.p.locator('#learnFeed .slide.q.done .next').last().click(); await d.p.waitForTimeout(450);
  check((await d.p.locator('#learnFeed .endslide .ctitle').textContent()) === 'Chapter learned' && !(await shown(d.p, '#sheet')), 'the next chapter learned does not ask again', R);
  await tab(d.p, 'home');
  await d.p.locator('.top .signin').click(); await d.p.waitForTimeout(150);
  check((await title(d.p)) === 'Sign in' && await shown(d.p, '#emailIn'), 'after Not now, Home\'s Sign in still opens the email sheet', R);
  await close(d);
}
{
  const d = await open({welcome: true, seed: {ans: ans(pts('c1', 6)), welcomed: 1}});
  await learnLast(d.p);
  await d.p.locator('#sheetClose').click(); await d.p.waitForTimeout(100);
  check((await saved(d.p)).offered === 1, 'closing the offer with its × counts as Not now', R);
  await close(d);
}
{
  const d = await open({welcome: true, seed: {ans: ans(pts('c1', 6))}, init: SIGNED});
  await learnLast(d.p);
  check((await d.p.locator('#learnFeed .endslide .ctitle').textContent()) === 'Chapter learned' && !(await shown(d.p, '#sheet')), 'signed in, a chapter learned brings no offer', R);
  await close(d);
}
{
  const d = await open({welcome: true, seed: {ans: ans(pts('c1', 4)), welcomed: 1}});
  await d.p.locator('.pt[data-p="c1p6"]').click(); await d.p.waitForTimeout(120);
  await d.p.locator('#sheetBody [data-act="learnpoint"]').click(); await d.p.waitForTimeout(150);
  await pick(d.p, '#learnFeed', true);
  await d.p.locator('#learnFeed .slide.q.done .next').last().click(); await d.p.waitForTimeout(450);
  check((await d.p.locator('#learnFeed .endslide .ctitle').textContent()) === 'Point checked' && !(await shown(d.p, '#sheet')), 'a session that leaves the chapter unlearned brings no offer', R);
  await close(d);
}
{
  const d = await open({welcome: true, accounts: false, seed: {ans: ans(pts('c1', 6))}});
  await learnLast(d.p);
  check(!(await shown(d.p, '#sheet')), 'with accounts switched off, no offer', R);
  await close(d);
}
// Maths: the same offer once a maths chapter is learned. Chapter 2 has two points; the first is learned already.
{
  const d = await open({welcome: true, seed: {subject: 'maths', welcomed: 1, m: {cur: 'm2', h: {m2p1: [{ok: true, day: DAY, q: 'x^2=49', t: T}]}}}});
  await d.p.waitForFunction(() => !!window.MathfieldElement && document.fonts.status === 'loaded'); await d.p.waitForTimeout(150);
  const WAIT = '#learnFeed .slide.mq:not(.done)';
  const NAME = {x: 't0', or: 't2', '=': 'equals', '-': 'minus', F: 'frac', '>': 'right'};
  const keys = async seq => { for (const k of seq.split(' ')) if (k) { await d.p.locator('#mKeys .key[data-key="' + (NAME[k] || k) + '"]').last().tap(); await d.p.waitForTimeout(25); } };
  const num = v => { for (let q = 1; q <= 12; q++) { const n = Math.round(v * q); if (Math.abs(v * q - n) < 1e-7) { const top = String(Math.abs(n)).split('').join(' '); return (n < 0 ? '- ' : '') + (q === 1 ? top : 'F ' + top + ' > ' + q + ' >'); } } };
  async function solveOne() {
    const s = LM.solve(LM.read(await d.p.locator(WAIT + ' .mq-q math-span').textContent()));
    await keys(s.some.slice().sort((a, b) => b - a).map(v => 'x = ' + num(v)).join(' or '));
    await d.p.locator('#mDone').tap(); await d.p.waitForTimeout(80);
    await d.p.locator('#learnFeed .slide.mq.done .next').last().tap(); await d.p.waitForTimeout(150);
  }
  await d.p.locator('.hero .primary').tap(); await d.p.waitForTimeout(200);
  await d.p.locator('#learnFeed .slide.wex .next').last().tap(); await d.p.waitForTimeout(150);
  await solveOne();                 // the guided question
  await solveOne();                 // the check question
  await d.p.waitForTimeout(400);
  check((await d.p.locator('#learnFeed .endslide .ctitle').textContent()) === 'Chapter learned', 'Maths: the last point learned ends on Chapter learned', R);
  check(await shown(d.p, '#sheet') && (await title(d.p)) === OFFER, 'and the same offer opens', R);
  await close(d);
}

// ---------- Home's top bar ----------
const bar = p => p.evaluate(() => {
  const box = s => { const e = document.querySelector(s); return e ? e.getBoundingClientRect() : null; };
  const tl = [...document.querySelectorAll('.top .tl > *')].map(e => e.getBoundingClientRect()), tr = [...document.querySelectorAll('.top .tr > *')].map(e => e.getBoundingClientRect());
  const word = box('.top .word'), left = Math.max(...tl.map(r => r.right)), right = Math.min(...tr.map(r => r.left));
  return {apart: left <= word.left && word.right <= right, inside: tl[0].left >= 0 && tr[tr.length - 1].right <= innerWidth, same: tl.concat(tr).every(r => Math.abs(r.top + r.height / 2 - (word.top + word.height / 2)) < 2),
    gaps: [Math.round(word.left - left), Math.round(right - word.right)]};
});
for (const scheme of ['light', 'dark']) for (const w of [360, 390]) {
  const d = await open({w: w, scheme: scheme});
  const b = await bar(d.p);
  check(b.apart && b.inside && b.same, scheme + ', ' + w + ' px, signed out: courses, Sign in, the word, the store and friends in one line with no overlap (' + b.gaps.join(' and ') + ' px either side of the word)', R);
  if (SHOTS && w === 390) await shot(d.p, 'home-top-signedout-' + scheme);
  await close(d);
  const s = await open({w: w, scheme: scheme, init: SIGNED});
  const c = await bar(s.p);
  check(await s.p.locator('.top .signin').count() === 0 && c.apart && c.inside && c.same, scheme + ', ' + w + ' px, signed in: no Sign in, and the rest in one line', R);
  if (SHOTS && w === 390) await shot(s.p, 'home-top-signedin-' + scheme);
  await close(s);
}
{
  const d = await open({welcome: true, seed: {welcomed: 1}});
  const asked = watch(d);
  check((await d.p.locator('.top .tl > *').evaluateAll(es => es.map(e => e.dataset.act + ':' + (e.getAttribute('aria-label') || e.textContent)))).join(' ') === 'subject:Courses signin:Sign in', 'the left of the top bar is the courses button, then Sign in', R);
  check((await d.p.locator('.top .tr > *').evaluateAll(es => es.map(e => e.getAttribute('aria-label')))).join(', ') === 'Store, Friends and messages, 2 new', 'the right is the store, then friends', R);
  check(asked.length === 0, 'Sign in on Home asks nothing of Supabase until it is tapped', R);
  await d.p.locator('.top .signin').click(); await d.p.waitForTimeout(150);
  check((await title(d.p)) === 'Sign in' && await shown(d.p, '#emailIn'), 'Sign in opens the email sheet, named Sign in', R);
  await d.p.locator('#emailIn').fill('a@example.com');
  await d.p.locator('#sheetClose').click(); await d.p.waitForTimeout(100);
  await d.p.locator('.top [aria-label="Store"]').click(); await d.p.waitForTimeout(250);
  check((await d.p.locator('.page .p-bar h2').textContent()) === 'Store' && await d.p.locator('.page .tile').count() > 8, 'the store icon opens the Store page', R);
  await d.p.locator('.page [data-act="back"]').click(); await d.p.waitForTimeout(250);
  check(await d.p.locator('.page').count() === 0 && await d.p.locator('#v-home.on .hero').isVisible(), 'Back from the Store goes to Home', R);
  await tab(d.p, 'you');
  check(await d.p.locator('#v-you [data-act="page"][data-page="store"]').count() === 1, 'You still has its Store row', R);
  await d.p.locator('#v-you [data-act="page"][data-page="store"]').click(); await d.p.waitForTimeout(250);
  check((await d.p.locator('.page .p-bar h2').textContent()) === 'Store', 'and it opens the same Store page', R);
  await d.p.locator('.page [data-act="back"]').click(); await d.p.waitForTimeout(250);
  check(await d.p.locator('#v-you [data-act="signin"] .t').textContent() === 'Save progress to an account', 'You keeps its account row', R);
  await d.p.locator('#v-you [data-act="signin"]').click(); await d.p.waitForTimeout(150);
  check((await title(d.p)) === 'Save your progress', 'which opens the email sheet named Save your progress', R);
  check((await d.p.locator('.tab span').allTextContents()).join(' ') === 'Home Learn Practice Search You', 'the tab bar is unchanged: Home, Learn, Practice, Search, You', R);
  await close(d);
}
if (SHOTS) {
  for (const scheme of ['light', 'dark']) {
    const d = await open({welcome: true, scheme: scheme});
    await shot(d.p, 'welcome-' + scheme);
    await close(d);
    if (scheme === 'dark') {
      const o = await open({welcome: true, scheme: scheme, seed: {ans: ans(pts('c1', 6)), welcomed: 1}});
      await learnLast(o.p);
      await shot(o.p, 'save-offer-dark');
      await close(o);
    }
  }
}

console.log(R.join('\n'));
const errs = errsAll.filter(e => !/supabase|Failed to fetch|ERR_FAILED/i.test(e));
if (errs.length) { console.log('ERRORS after welcome.mjs:', errs); process.exitCode = 1; }
console.log('errors: []');
process.exit(process.exitCode || 0);
