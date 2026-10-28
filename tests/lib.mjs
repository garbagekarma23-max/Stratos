// Shared test helpers: open the test page, answer questions by looking up the right answer in the content file.
// The page is opened through a small local web server (serve.mjs), the way GitHub Pages serves it, because MathLive
// (loaded when maths is opened) cannot load its fonts from a plain file path.
import { chromium } from 'playwright';
import { serve } from './serve.mjs';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { loadContent } from '../content/load.mjs';
export const SHOTS = fileURLToPath(new URL('./shots/', import.meta.url));
let server = null;
// Use the Chromium already on the machine if there is one.
const EXE = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
fs.mkdirSync(SHOTS, {recursive: true});
const src = fs.readFileSync(new URL('../src/content.js', import.meta.url), 'utf8');
export const TOPIC = new Function(src + '; return TOPIC;')();
// The Economics point bank and the Edexcel course that lists its points (econ-points.js, edexcel-content.js).
export const BANK = new Function(fs.readFileSync(new URL('../src/econ-points.js', import.meta.url), 'utf8') + '; return ECON_POINTS;')();
export const EDEXCEL = new Function(fs.readFileSync(new URL('../src/edexcel-content.js', import.meta.url), 'utf8') + '; return EDEXCEL;')();
// Every multiple-choice question, by its text, so pick() can find the right answer in any course with options.
// The made banks (src/bank) are added too. keyBank adds another bank, such as the made course in tests/made.
export const KEYED = new Map();
export function keyBank(bank) {
  for (const id of Object.keys(bank)) for (const k of ['a', 'b']) {
    const p = Object.assign({id: id}, bank[id]);
    if (KEYED.has(p[k].q)) throw new Error('two questions share the text: ' + p[k].q);
    KEYED.set(p[k].q, {right: p[k].opts[0], id: p.id + k, p: p, k: k});
  }
}
keyBank(Object.fromEntries(TOPIC.chapters.flatMap(ch => ch.points).map(p => [p.id, p])));
keyBank(BANK);
Object.values(loadContent().MADE_BANKS).forEach(keyBank);
export async function open(o = {}) {
  const b = await chromium.launch(EXE ? {executablePath: EXE} : {});
  // The phone's language and time zone. The subject sheet guesses the country from them. Tests are an Australian
  // phone unless they say otherwise.
  const ctx = await b.newContext({viewport: {width: o.w || 390, height: o.h || 844}, deviceScaleFactor: o.dpr || 2, hasTouch: (o.w || 390) < 500, colorScheme: o.scheme || 'light', reducedMotion: o.motion ? 'no-preference' : 'reduce',
    locale: o.locale || 'en-AU', timezoneId: o.tz || 'Australia/Sydney'});
  if (o.seed) await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('stratos2.v1', JSON.stringify(s)); sessionStorage.setItem('seeded', '1'); } }, o.seed);
  // The intro plays each time v2.html opens. Tests skip it unless they pass intro: true (tests/intro.mjs does).
  if (!o.intro) await ctx.addInitScript(() => { window.stratosIntro = false; });
  // The welcome screen on first open, and the offer to save progress after the first chapter, ask a student who is
  // not signed in to make an account. Tests skip both unless they pass welcome: true (tests/welcome.mjs does).
  if (!o.welcome) await ctx.addInitScript(() => { window.stratosWelcome = false; });
  // The course steps on first open (where you study, then the course) come before the welcome screen. Tests skip
  // them unless they pass setup: true (tests/first-open.mjs does).
  if (!o.setup) await ctx.addInitScript(() => { window.stratosSetup = false; });
  // The first time a course is opened, a sheet asks where the class is up to. Tests skip it unless they pass start: true
  // (tests/start.mjs does).
  if (!o.start) await ctx.addInitScript(() => { window.stratosStart = false; });
  if (o.init) await ctx.addInitScript(o.init);
  // Tests never reach a real Supabase project: every supabase.co address is blocked, including the one in the build.
  // tests/account.mjs passes supabase: a fake from fake-supabase.mjs,
  // which the page is pointed at instead. Its route is added last, so it wins over the block.
  await ctx.route(/^https:\/\/[^/]*\.supabase\.co\//, r => r.abort());
  await ctx.routeWebSocket(/^wss:\/\/[^/]*\.supabase\.co\//, ws => ws.close());
  // accounts: false empties the project values, the way the build is with none filled in.
  if (o.accounts === false) await ctx.addInitScript(() => { window.stratosSupabase = {url: '', key: ''}; });
  if (o.supabase) {
    await ctx.addInitScript(c => { window.stratosSupabase = c; }, {url: o.supabase.url, key: o.supabase.key});
    await o.supabase.route(ctx);
  }
  if (o.clock) await ctx.clock.install();
  if (o.route) await o.route(ctx);           // lets a test hold back or change a file the page loads
  const p = await ctx.newPage();
  const errs = [];
  p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource|net::ERR/.test(m.text())) errs.push(m.text()); });
  // STACK=1 node <test>.mjs also prints where in v2.html a script error happened.
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message + (process.env.STACK ? '\n' + e.stack : '')));
  if (!server) server = await serve();
  // page opens another build of v2, such as v2-made.html (tests/made.mjs).
  await p.goto(server.url + (o.page || 'v2.html') + (o.query || ''), {waitUntil: o.waitUntil || 'load'});
  await p.waitForTimeout(300);
  return {b, ctx, p, errs};
}
export const shot = (p, name) => p.screenshot({path: SHOTS + name + '.png'});
export const tab = async (p, t) => { await p.click('.tab[data-tab="' + t + '"]'); await p.waitForTimeout(150); };
export const saved = p => p.evaluate(() => JSON.parse(localStorage.getItem('stratos2.v1') || '{}'));
// The question waiting in a feed (#learnFeed or #feed).
export const waiting = (p, feed) => p.locator(feed + ' .slide.q:not(.done)').last();
export async function pick(p, feed, wantRight) {
  const s = waiting(p, feed), q = await s.locator('.qtext').textContent(), key = KEYED.get(q);
  if (!key) throw new Error('unknown question: ' + q);
  const texts = await s.locator('.opt .txt').allTextContents();
  const n = wantRight ? texts.indexOf(key.right) : texts.findIndex(t => t !== key.right);
  if (n < 0) throw new Error('right answer not on screen for: ' + q);
  await s.locator('.opt').nth(n).click();
  await p.waitForTimeout(80);
  return key;
}
// Scroll a feed to its last slide, the way the Next button does.
export async function toLast(p, feed) { await p.evaluate(f => { const el = document.querySelector(f); el.scrollTop = el.lastElementChild.offsetTop; }, feed); await p.waitForTimeout(60); }
export const check = (ok, what, results) => { results.push((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) process.exitCode = 1; };
// Switch to a course from Home's subject sheet. The first time, the sheet asks where you study, with the phone's guess
// picked: this takes the guess, then the state if there is a state step.
export async function course(p, id) {
  await p.locator('.subject').click(); await p.waitForTimeout(100);
  if (await p.locator('#placeIn').count()) {
    await p.locator('[data-act="placenext"]').click(); await p.waitForTimeout(80);
    if (await p.locator('[data-act="placedone"]').count()) { await p.locator('[data-act="placedone"]').click(); await p.waitForTimeout(80); }
  }
  await p.locator('.pick[data-sub="' + id + '"]').click(); await p.waitForTimeout(200);
}
