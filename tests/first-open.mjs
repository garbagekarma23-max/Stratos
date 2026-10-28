// The first open: the intro, then where you study (the country, and the state for Australia), then the course, then
// the welcome screen, then Home. The steps are the subject sheet's (places.mjs tests the sheet from Home's button),
// full screen. They show only on a device with no course and no answers, not while signed in and not from a sign-in
// link, and never again once a course is picked. Every other test skips them: open() in lib.mjs sets
// window.stratosSetup = false unless a test passes setup: true.
// node first-open.mjs shots also saves first-intro, first-country, first-state, first-course, first-welcome and
// first-home, light and dark, at 390 by 844.
import fs from 'fs';
import { open, saved, shot, check } from './lib.mjs';
import { loadContent } from '../content/load.mjs';
// What goes to an account (src/84-merge.js), to check the place and the pick stay on the device.
const {syncPart} = new Function(fs.readFileSync(new URL('../src/84-merge.js', import.meta.url), 'utf8') + '; return {syncPart};')();
const R = [], SHOOT = process.argv[2] === 'shots', errsAll = [];
const SIGNED = () => { localStorage.setItem('stratos2.sync', JSON.stringify({uid: '00000000-0000-0000-0000-000000000001', email: 'a@example.com', rev: 1, hash: ''})); };
const shown = (p, sel) => p.locator(sel).isVisible();
const title = p => p.locator('#setupTitle').textContent();
const checked = p => p.locator('#setup .choice[aria-checked="true"]').allTextContents();
const tap = async (p, sel, ms = 120) => { await p.locator(sel).click(); await p.waitForTimeout(ms); };
const toastText = p => p.evaluate(() => { const t = document.querySelector('#toast'); return t.classList.contains('show') ? t.textContent : ''; });
const GUESS = 'Pick your country to see its courses. We guessed from your phone\'s language and region settings.';
const FINE = 'You can switch courses any time from Home. Each course keeps its own progress, saved on this device only.';
const NONE = 'My course isn’t here yet';
const TRY = 'Try this one while we add yours.';
async function close(d) { errsAll.push(...d.errs); await d.b.close(); }
// Every request the page makes beyond the test server, so a test can check nothing is sent.
function watch(d) { const seen = []; d.p.on('request', r => { if (!/^http:\/\/(127\.0\.0\.1|localhost)/.test(r.url()) && !/fonts\.(googleapis|gstatic)\.com/.test(r.url())) seen.push(r.url()); }); return seen; }

// ---------- the whole flow on an Australian phone: intro, country, state, course, welcome, Home ----------
{
  const d = await open({intro: true, welcome: true, setup: true, waitUntil: 'domcontentloaded'});
  const sent = watch(d);
  check(await d.p.locator('#intro').count() === 1 && await d.p.evaluate(() => !document.querySelector('#setup').hidden), 'the intro plays over the first step', R);
  await d.p.waitForFunction(() => !document.querySelector('#intro'), null, {timeout: 4000});
  await d.p.waitForTimeout(100);
  check(await shown(d.p, '#setup') && !(await shown(d.p, '#welcome')) && !(await shown(d.p, '#sheet')), 'the intro fades into the country step, full screen, not the sheet', R);
  check((await title(d.p)) === 'Where do you study?' && (await d.p.locator('#setup .rule').textContent()) === GUESS, 'Where do you study?, with the line about the guess', R);
  check((await checked(d.p))[0].startsWith('Australia') && (await d.p.locator('#setup .places .choice').first().textContent()).startsWith('Australia'), 'Australia is guessed, picked and first', R);
  check((await d.p.locator('#setup .places .choice').first().locator('small').textContent()) === 'NSW courses and international courses', 'with its line under it', R);
  check((await d.p.locator('#placeIn').getAttribute('placeholder')) === 'Search countries' && await d.p.evaluate(() => document.activeElement.id !== 'placeIn'), 'the search box is there, but not focused, so no keyboard comes up', R);
  check((await d.p.locator('#setup .fine').textContent()) === 'This uses no location, and nothing is sent anywhere.', 'and the line that nothing is sent', R);
  check((await d.p.locator('#setup [data-act="placenext"]').textContent()) === 'Next', 'the button says Next, for a country with states', R);
  check(await d.p.locator('#setup .p-head .icon-btn').count() === 0, 'there is no × to close the steps', R);
  check(await d.p.evaluate(() => document.querySelector('#v-home').inert && document.querySelector('#tabs').inert), 'Home and the tabs cannot be reached behind it', R);
  await d.p.keyboard.press('Escape'); await d.p.waitForTimeout(80);
  check(await shown(d.p, '#setup'), 'Escape does not close the steps', R);
  await tap(d.p, '#setup [data-act="placenext"]');
  check((await title(d.p)) === 'Which state or territory?' && (await d.p.locator('#setup .rule').textContent()) === 'Pick yours to see its courses.', 'Next shows Which state or territory?', R);
  const states = await d.p.locator('#setup .choice').allTextContents();
  check(states.length === 8 && states[0] === 'New South WalesHSC' && states.slice(1).every(t => t.endsWith('Courses coming')), 'the eight, with NSW saying HSC and the others Courses coming', R);
  check((await checked(d.p))[0] === 'New South WalesHSC', 'NSW is picked, from the time zone', R);
  check((await d.p.locator('#setup .cta .primary').textContent()) === 'Show courses' && (await d.p.locator('#setup .cta .ghost').textContent()) === 'Back', 'with Show courses and Back', R);
  await tap(d.p, '#setup [data-act="placeback"]');
  check((await title(d.p)) === 'Where do you study?' && (await checked(d.p))[0].startsWith('Australia'), 'Back goes to the country, still on Australia', R);
  check((await saved(d.p)).place === undefined, 'nothing is saved before Show courses', R);
  await tap(d.p, '#setup [data-act="placenext"]');
  await tap(d.p, '#setup [data-act="placedone"]');
  check((await title(d.p)) === 'Pick your course', 'Show courses shows Pick your course', R);
  check((await d.p.locator('#setup .pick.place').textContent()) === 'New South Wales, AustraliaChange', 'the place at the top, with Change', R);
  check(JSON.stringify(await d.p.locator('#setup .unit').allTextContents()) === JSON.stringify(['New South Wales', 'International courses']), 'New South Wales, then International courses, and no Open now', R);
  // The made courses are read from the content files, so a new course needs no change here.
  const MADE = loadContent().MADE_COURSES, madeIn = place => MADE.filter(c => c.place === place).map(c => c.id);
  const rows = ['eco', 'maths'].concat(madeIn('nsw'), ['edexcel'], madeIn('international'));
  check(madeIn('nsw').includes('nsw-bus-11') && JSON.stringify(await d.p.locator('#setup .pick[data-sub]').evaluateAll(b => b.map(x => x.dataset.sub))) === JSON.stringify(rows), 'NSW Economics, Maths and Business Studies, then the Edexcel course', R);
  const subs = await d.p.locator('#setup .p-in > .sub').allTextContents();
  check(subs[0] === 'More NSW subjects are coming.' && subs[1] === 'Taught in schools around the world.', 'with the line under each group', R);
  check(await d.p.locator('#setup .pick[data-sub] .v').count() === 0 && await d.p.locator('#setup .pick[data-sub] .ic').count() === rows.length && await d.p.locator('#setup [aria-current]').count() === 0, 'each row has an arrow, not Open or Switch, and none is marked open', R);
  check((await d.p.locator('#setup .fine').textContent()) === FINE, 'the line that courses can be switched from Home', R);
  check((await d.p.locator('#setup .p-in > :last-child').textContent()) === NONE && await d.p.locator('#setup .p-in > :last-child').evaluate(b => b.classList.contains('textbtn')), 'and My course isn’t here yet, a text button, at the bottom', R);
  let s = await saved(d.p);
  check(s.place && s.place.country === 'AU' && s.place.state === 'nsw' && s.picked === 0, 'the place is saved, and the course is not picked yet', R);
  await tap(d.p, '#setup .pick[data-sub="maths"]', 200);
  check(!(await shown(d.p, '#setup')) && await shown(d.p, '#welcome'), 'one tap on Maths goes on to the welcome screen', R);
  s = await saved(d.p);
  check(s.subject === 'maths' && s.picked === 1, 'the course is saved', R);
  check(await d.p.evaluate(() => document.querySelector('#v-home').inert), 'Home is still out of reach behind the welcome screen', R);
  await tap(d.p, '#welcome [data-act="wtry"]', 200);
  check(!(await shown(d.p, '#welcome')) && await d.p.locator('#v-home.on .hero').isVisible(), 'Try it first goes to Home', R);
  check((await d.p.locator('.subject').textContent()) === 'Maths, Year 11', 'Home is on Maths', R);
  check((await toastText(d.p)) === '', 'with no Switched to toast', R);
  check(!(await d.p.evaluate(() => document.querySelector('#v-home').inert || document.querySelector('#tabs').inert)), 'Home and the tabs work', R);
  await tap(d.p, '.top [data-act="subject"]');
  check(await shown(d.p, '#sheet') && (await d.p.locator('#sheetTitle').textContent()) === 'Courses' && !(await shown(d.p, '#setup')), 'the courses button opens the Courses sheet, as before', R);
  check((await d.p.locator('#sheet .pick[data-sub="maths"] .v').textContent()) === 'Open' && (await d.p.locator('#sheet .pick[data-sub="eco"] .v').textContent()) === 'Switch', 'with Open and Switch', R);
  await tap(d.p, '#sheet .pick[data-sub="eco"]', 200);
  check((await d.p.locator('.subject').textContent()) === 'Economics, Year 12' && (await toastText(d.p)) === 'Switched to Economics: The Global Economy', 'and switching from it works as before', R);
  const part = syncPart(await saved(d.p));
  check(!('picked' in part) && !('place' in part), 'the place and the pick stay on the device: neither goes to an account', R);
  check(sent.length === 0, 'nothing is sent anywhere (' + sent.join(', ') + ')', R);
  await d.p.reload(); await d.p.waitForTimeout(300);
  check(!(await shown(d.p, '#setup')) && !(await shown(d.p, '#welcome')) && await d.p.locator('#v-home.on .hero').isVisible(), 'the next open goes straight to Home', R);
  await close(d);
}

// ---------- Create an account at the end ----------
{
  const d = await open({welcome: true, setup: true});
  await tap(d.p, '#setup [data-act="placenext"]');
  await tap(d.p, '#setup [data-act="placedone"]');
  await tap(d.p, '#setup .pick[data-sub="eco"]', 200);
  await tap(d.p, '#welcome [data-act="wcreate"]', 200);
  check(!(await shown(d.p, '#welcome')) && (await d.p.locator('#sheetTitle').textContent()) === 'Create an account' && await shown(d.p, '#emailIn'), 'Create an account on the welcome screen opens the email sheet', R);
  check((await saved(d.p)).subject === 'eco' && (await saved(d.p)).picked === 1, 'with the course saved', R);
  await close(d);
}

// ---------- the tap that skips the intro does not press a country underneath ----------
{
  const d = await open({intro: true, setup: true, motion: true, waitUntil: 'domcontentloaded'});
  await d.p.waitForSelector('#setup .places .choice');
  const r = await d.p.locator('#setup .places .choice').nth(2).boundingBox();
  await d.p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2);
  await d.p.waitForFunction(() => !document.querySelector('#intro'), null, {timeout: 2000});
  await d.p.waitForTimeout(200);
  check((await checked(d.p))[0].startsWith('Australia') && (await title(d.p)) === 'Where do you study?', 'the tap that skips the intro leaves Australia picked', R);
  await d.p.touchscreen.tap(r.x + r.width / 2, r.y + r.height / 2); await d.p.waitForTimeout(120);
  check(!(await checked(d.p))[0].startsWith('Australia'), 'and the next tap picks a country', R);
  await close(d);
}

// ---------- My course isn’t here yet ----------
{
  // NSW has its own courses: the first, NSW Economics.
  const d = await open({setup: true});
  await tap(d.p, '#setup [data-act="placenext"]');
  await tap(d.p, '#setup [data-act="placedone"]');
  await tap(d.p, '#setup [data-act="firstnone"]', 200);
  check(!(await shown(d.p, '#setup')) && await d.p.locator('#v-home.on .hero').isVisible() && (await d.p.locator('.subject').textContent()) === 'Economics, Year 12', 'in NSW, My course isn’t here yet opens Home on NSW Economics', R);
  check((await toastText(d.p)) === TRY, 'with the toast: ' + TRY, R);
  const s = await saved(d.p);
  check(s.subject === 'eco' && s.picked === 1 && s.place.country === 'AU' && s.place.state === 'nsw', 'and saves the course, the pick and the place', R);
  await d.p.reload(); await d.p.waitForTimeout(300);
  check(!(await shown(d.p, '#setup')), 'and the steps do not come back', R);
  await close(d);
}
{
  // Victoria has no courses of its own yet: the first international course.
  const d = await open({setup: true, tz: 'Australia/Melbourne'});
  await tap(d.p, '#setup [data-act="placenext"]');
  check((await checked(d.p))[0] === 'VictoriaCourses coming', 'a Melbourne phone guesses Victoria', R);
  await tap(d.p, '#setup [data-act="placedone"]');
  check((await d.p.locator('#setup .p-in > .sub').first().textContent()) === 'Courses for Victoria are coming. The international courses below work anywhere.', 'Victoria says its courses are coming', R);
  check(JSON.stringify(await d.p.locator('#setup .pick[data-sub]').evaluateAll(b => b.map(x => x.dataset.sub))) === JSON.stringify(['edexcel']), 'and lists only the international course', R);
  await tap(d.p, '#setup [data-act="firstnone"]', 200);
  check((await d.p.locator('.subject').textContent()) === 'Economics, International A Level (Edexcel)' && (await toastText(d.p)) === TRY, 'My course isn’t here yet opens Home on the international course, with the toast', R);
  await close(d);
}
{
  // A French phone: no state step. With the welcome screen on, the toast waits until Home is in view.
  const d = await open({setup: true, welcome: true, locale: 'fr-FR', tz: 'Europe/Paris'});
  check((await checked(d.p))[0] === 'France' && (await d.p.locator('#setup [data-act="placenext"]').textContent()) === 'Show courses', 'a French phone: France picked, and the button says Show courses', R);
  await tap(d.p, '#setup [data-act="placenext"]');
  check((await title(d.p)) === 'Pick your course' && (await d.p.locator('#setup .p-in > .sub').first().textContent()) === 'Courses for France are coming. The international courses below work anywhere.', 'it goes straight to the courses, with no state step', R);
  await tap(d.p, '#setup [data-act="firstnone"]', 200);
  check(await shown(d.p, '#welcome') && (await toastText(d.p)) === '', 'My course isn’t here yet goes on to the welcome screen, with no toast over it', R);
  await tap(d.p, '#welcome [data-act="wtry"]', 200);
  check((await d.p.locator('.subject').textContent()) === 'Economics, International A Level (Edexcel)' && (await toastText(d.p)) === TRY, 'then Try it first opens Home on the international course, with the toast', R);
  const s = await saved(d.p);
  check(s.place.country === 'FR' && s.place.state === null && s.subject === 'edexcel' && s.picked === 1, 'France, the course and the pick are saved', R);
  await close(d);
}

// ---------- a phone that names no country, Change, and reloads part way ----------
{
  const d = await open({setup: true, locale: 'en', tz: 'UTC'});
  check((await d.p.locator('#setup .rule').textContent()) === 'Pick your country to see its courses.' && (await checked(d.p)).length === 0, 'with no guess, no country is picked and the line says nothing about one', R);
  check(await d.p.locator('#setup [data-act="placenext"]').isDisabled(), 'and the button stays greyed out', R);
  await d.p.locator('#placeIn').fill('new zea'); await d.p.waitForTimeout(80);
  await tap(d.p, '#setup .places .choice:not([hidden])');
  check(!(await d.p.locator('#setup [data-act="placenext"]').isDisabled()) && (await checked(d.p))[0] === 'New Zealand', 'search finds New Zealand, and picking it lets the button work', R);
  await tap(d.p, '#setup [data-act="placenext"]');
  await tap(d.p, '#setup [data-act="placechange"]');
  check((await title(d.p)) === 'Where do you study?' && (await checked(d.p))[0] === 'New Zealand', 'Change on the courses goes back to the country, still on New Zealand', R);
  await close(d);
}
{
  const d = await open({setup: true});
  await tap(d.p, '#setup [data-act="placenext"]');
  await d.p.reload(); await d.p.waitForTimeout(300);
  check(await shown(d.p, '#setup') && (await title(d.p)) === 'Where do you study?', 'a reload on the state step starts again at the country', R);
  await tap(d.p, '#setup [data-act="placenext"]');
  await tap(d.p, '#setup [data-act="placedone"]');
  await d.p.reload(); await d.p.waitForTimeout(300);
  check(await shown(d.p, '#setup') && (await title(d.p)) === 'Pick your course', 'a reload on the courses, once the place is saved, opens on the courses', R);
  await close(d);
}

// ---------- who never sees the steps ----------
{
  const d = await open({setup: true, welcome: true, seed: {ans: {c1p1a: {ok: true, n: 1, t: Date.now() - 36e5}}}});
  check(!(await shown(d.p, '#setup')) && !(await shown(d.p, '#welcome')), 'a device with answers sees no steps', R);
  await close(d);
}
{
  const d = await open({setup: true, seed: {subject: 'maths'}});
  check(!(await shown(d.p, '#setup')) && (await d.p.locator('.subject').textContent()) === 'Maths, Year 11', 'a device with a course saved sees no steps, and stays on its course', R);
  check((await saved(d.p)).picked === undefined || (await saved(d.p)).picked === 1, 'it counts as picked', R);
  await close(d);
}
{
  const d = await open({setup: true, welcome: true, init: SIGNED});
  check(!(await shown(d.p, '#setup')), 'a device that is signed in sees no steps', R);
  await close(d);
}
{
  const d = await open({setup: true, welcome: true, query: '#error_description=Email+link+is+invalid+or+has+expired'});
  check(!(await shown(d.p, '#setup')), 'a page opened from a sign-in link sees no steps', R);
  await close(d);
}
{
  const d = await open({setup: true, welcome: true, accounts: false});
  check(await shown(d.p, '#setup'), 'with accounts switched off, the steps still show', R);
  await tap(d.p, '#setup [data-act="placenext"]');
  await tap(d.p, '#setup [data-act="placedone"]');
  await tap(d.p, '#setup .pick[data-sub="eco"]', 200);
  check(!(await shown(d.p, '#welcome')) && await d.p.locator('#v-home.on .hero').isVisible() && await d.p.locator('.top .signin').count() === 0, 'then go straight to Home, with no welcome screen and no Sign in', R);
  check(!(await d.p.evaluate(() => document.querySelector('#v-home').inert)), 'and Home works', R);
  await close(d);
}

// ---------- it fits: no sideways scroll, and the buttons in reach ----------
for (const [w, h] of [[390, 844], [360, 640], [320, 480]]) {
  for (const scheme of ['light', 'dark']) {
    const d = await open({setup: true, w: w, h: h, scheme: scheme});
    const fits = async step => {
      const r = await d.p.evaluate(() => {
        const panel = document.querySelector('#setup .panel'), btn = document.querySelector('#setup .stick button, #setup .cta .primary, #setup .textbtn');
        /* The country step's button stays at the bottom. The others are at the end of the step, reached by scrolling. */
        if (!btn.closest('.stick')) panel.scrollTop = panel.scrollHeight;
        const b = btn.getBoundingClientRect();
        return {side: document.documentElement.scrollWidth > innerWidth || panel.scrollWidth > panel.clientWidth, inside: b.top >= 0 && b.bottom <= innerHeight && b.right <= innerWidth};
      });
      check(!r.side && r.inside, w + ' by ' + h + ', ' + scheme + ', ' + step + ': no sideways scroll, and its button is in reach', R);
    };
    await fits('country');
    await tap(d.p, '#setup [data-act="placenext"]'); await fits('state');
    await tap(d.p, '#setup [data-act="placedone"]'); await fits('course');
    await close(d);
  }
}

// ---------- screenshots: each screen of the first open, light and dark, at 390 by 844 ----------
// The intro is held at 0.7 s: animation frames wait until the test runs them, and the clock stays at 0.
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
if (SHOOT) {
  for (const scheme of ['light', 'dark']) {
    {
      const d = await open({intro: true, setup: true, welcome: true, motion: true, scheme: scheme, init: HOLD, waitUntil: 'domcontentloaded'});
      await d.p.waitForTimeout(400);
      for (let ms = 10; ms <= 700; ms += 10) await d.p.evaluate(ms => window.__step(ms), ms);
      await shot(d.p, 'first-intro-' + scheme);
      await d.b.close();
    }
    const d = await open({setup: true, welcome: true, scheme: scheme});
    await shot(d.p, 'first-country-' + scheme);
    await tap(d.p, '#setup [data-act="placenext"]'); await shot(d.p, 'first-state-' + scheme);
    await tap(d.p, '#setup [data-act="placedone"]'); await shot(d.p, 'first-course-' + scheme);
    await tap(d.p, '#setup .pick[data-sub="eco"]', 200); await shot(d.p, 'first-welcome-' + scheme);
    await tap(d.p, '#welcome [data-act="wtry"]', 300); await shot(d.p, 'first-home-' + scheme);
    await close(d);
  }
  console.log('saved first-intro, first-country, first-state, first-course, first-welcome and first-home, light and dark, in tests/shots');
}

console.log(R.join('\n'));
if (errsAll.length) { console.log('errors: ' + JSON.stringify(errsAll)); process.exitCode = 1; }
