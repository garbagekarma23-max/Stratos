// Where is your class up to? The first time a course is opened, a sheet asks which chapter the class is on, with
// Chapter 1 picked. A later chapter starts Home there. The chapters before it stay open to go back to, but nothing in
// them counts as done: no answers, altitude, streak or proven points. Home's Starting point row changes it later. The
// choice is kept with the course's chapter (start), so it goes to the account. A course with answers in it never asks.
// On a device's first open it is a full-screen step after the course. Every other test skips the question: open() in
// lib.mjs sets window.stratosStart = false unless a test passes start: true.
// node start.mjs shots also saves start-sheet, start-home and start-first, light and dark, at 390 by 844.
import fs from 'fs';
import { open, saved, shot, check, EDEXCEL, TOPIC } from './lib.mjs';
const {syncPart} = new Function(fs.readFileSync(new URL('../src/84-merge.js', import.meta.url), 'utf8') + '; return {syncPart};')();
const R = [], errsAll = [], SHOOT = process.argv[2] === 'shots';
const NSW = {country: 'AU', state: 'nsw'};
const RULE = 'Pick the chapter your class is on. Home starts there. Earlier chapters stay open to go back to, but they don’t count as done.';
const text = (p, sel) => p.locator(sel).first().textContent();
const tap = async (p, sel, ms = 150) => { await p.locator(sel).first().click(); await p.waitForTimeout(ms); };
const picked = p => p.locator('#sheetBody [data-act="startpick"][aria-checked="true"]').getAttribute('data-v');
const sheetUp = p => p.locator('#sheet').isVisible();
// Switch course from the subject sheet, the way a student does.
const switchTo = async (p, id) => { await tap(p, '.subject', 120); await tap(p, '#sheetBody .pick[data-sub="' + id + '"]', 300); };
const CHS = EDEXCEL.units.flatMap((u, ui) => u.chapters.filter(c => c.points.length).map((c, i) => ({id: c.id, title: c.title, name: 'Unit ' + (ui + 1) + ', chapter ' + (i + 1)})));
async function close(d) { errsAll.push(...d.errs); await d.b.close(); }

// ---------- the question, the first time a course is opened ----------
{
  const d = await open({start: true, seed: {place: NSW}}), p = d.p;
  await switchTo(p, 'edexcel');
  check(await sheetUp(p) && (await text(p, '#sheetTitle')) === 'Where is your class up to?' && (await text(p, '#sheetBody .rule')) === RULE, 'opening the Edexcel course for the first time asks Where is your class up to?', R);
  const rows = await p.locator('#sheetBody [data-act="startpick"]').evaluateAll(b => b.map(x => x.dataset.v + '|' + x.textContent));
  check(JSON.stringify(rows) === JSON.stringify(CHS.map(c => c.id + '|' + c.title + c.name)), 'it lists every chapter in order, each with its title and where it sits', R);
  check((await picked(p)) === CHS[0].id && (await p.locator('#sheetBody [aria-checked="true"]').count()) === 1, 'Chapter 1 is picked', R);
  check((await text(p, '#sheetBody [data-act="startset"]')) === 'Start here', 'with Start here', R);
  check((await saved(p)).c.edexcel.start === CHS[0].id, 'Chapter 1 is saved straight away, so closing the sheet keeps it', R);
  await tap(p, '#sheetBody [data-v="' + CHS[6].id + '"]', 80);
  check((await picked(p)) === CHS[6].id && (await saved(p)).c.edexcel.start === CHS[0].id, 'tapping Unit 2, chapter 1 moves the dot, and saves nothing yet', R);
  await tap(p, '[data-act="startset"]', 250);
  check(!(await sheetUp(p)) && (await text(p, '.hero .h1')) === CHS[6].title && (await text(p, '.hero .kicker')) === 'Unit 2, chapter 1 of 6', 'Start here opens Home on Unit 2, chapter 1', R);
  check((await text(p, '.startat span')) === 'Starting point: Unit 2, chapter 1' && (await text(p, '.startat button')) === 'Change', 'Home says the starting point, with Change', R);
  let s = await saved(p);
  check(s.c.edexcel.start === CHS[6].id && s.c.edexcel.cur === CHS[6].id, 'the start and the chapter open are saved with the course', R);
  check(syncPart(s).c.edexcel.start === CHS[6].id, 'the start goes to the account with the rest of the course', R);

  // The chapters before it stay open, and none of them is done.
  const earlier = CHS.slice(0, 6);
  const stages = await p.locator('#v-home .ch-head').evaluateAll(b => b.map(x => x.dataset.ch + '|' + x.disabled + '|' + x.querySelector('.stage').textContent));
  check(earlier.every(c => stages.includes(c.id + '|false|Not started')), 'every chapter before it can be opened, and says Not started', R);
  check(Object.keys(s.ans).length === 0 && !s.streak && !s.week && !s.day && !s.c.edexcel.bestKm, 'skipping gives no answers, no streak, no count for the week and no altitude', R);
  check((await text(p, '.hero .primary')) === 'Start this chapter' && (await p.locator('.legend').textContent()) === '0 of 7 proven0 of 7 learned', 'Home starts the chapter with nothing learned or proven', R);
  await tap(p, '#v-home .ch-head[data-ch="' + CHS[0].id + '"]', 120);
  check((await p.locator('#v-home .ch.open .pt').count()) === 6 && (await p.locator('#v-home .ch.open .pt.is-new').count()) === 6, 'an earlier chapter opens on Home with its points, all New', R);
  await tap(p, '#v-home .ch.open [data-act="learnch"]', 250);
  check(await p.locator('#v-learn').isVisible() && (await p.locator('#segs .seg').count()) === 6, 'Learn this chapter opens an earlier chapter in Learn', R);
  await tap(p, '.tab[data-tab="home"]', 120);
  // Practice only asks about points learned, so the skipped chapters give it nothing to ask.
  await tap(p, '.tab[data-tab="practice"]', 150);
  check((await text(p, '#v-practice .empty .lede')) === 'Practice asks about points you have learned. Learn your first point to start.', 'Practice counts nothing in the skipped chapters as learned', R);
  await tap(p, '.tab[data-tab="home"]', 120);
  await p.goto(p.url()); await p.waitForTimeout(300);
  await tap(p, '.tab[data-tab="home"]', 120);
  check(!(await sheetUp(p)) && (await text(p, '.startat span')) === 'Starting point: Unit 2, chapter 1', 'after a reload nothing is asked again, and the starting point is kept', R);
  check((await text(p, '.hero .h1')) === CHS[0].title, 'Home shows the chapter opened last, as always: the earlier one opened in Learn', R);

  // Change, from Home.
  await tap(p, '[data-act="startch"]');
  check(await sheetUp(p) && (await text(p, '#sheetTitle')) === 'Where is your class up to?' && (await picked(p)) === CHS[6].id, 'Change opens the same sheet, on the start saved', R);
  await tap(p, '#sheetBody [data-v="' + CHS[2].id + '"]', 80);
  await tap(p, '[data-act="startset"]', 250);
  s = await saved(p);
  check((await text(p, '.hero .h1')) === CHS[2].title && (await text(p, '.startat span')) === 'Starting point: Unit 1, chapter 3' && s.c.edexcel.start === CHS[2].id, 'picking Unit 1, chapter 3 moves Home and the starting point there', R);
  check(Object.keys(s.ans).length === 0, 'changing it gives no answers either', R);

  // Another course asks once too. Closing the sheet keeps Chapter 1.
  await switchTo(p, 'maths');
  check(await sheetUp(p) && (await text(p, '#sheetTitle')) === 'Where is your class up to?' && (await picked(p)) === 'm1', 'Maths asks too, the first time, with Chapter 1 picked', R);
  await tap(p, '#sheetClose', 150);
  check((await saved(p)).m.start === 'm1' && (await text(p, '.hero .h1')) === 'Linear equations' && (await text(p, '.startat span')) === 'Starting point: Chapter 1', 'closing it keeps Chapter 1', R);
  await switchTo(p, 'edexcel');
  check(!(await sheetUp(p)) && (await text(p, '.hero .h1')) === CHS[2].title, 'back in the Edexcel course nothing is asked, and its own start is kept', R);
  await switchTo(p, 'maths');
  check(!(await sheetUp(p)), 'nor in Maths, the second time', R);
  await switchTo(p, 'eco');
  check(await sheetUp(p) && (await picked(p)) === 'c1', 'NSW Economics asks the first time it is opened from the sheet', R);
  await tap(p, '#sheetBody [data-v="c3"]', 80); await tap(p, '[data-act="startset"]', 250);
  s = await saved(p);
  check(s.start === 'c3' && syncPart(s).start === 'c3' && (await text(p, '.hero .kicker')).endsWith('chapter 3 of 4'), 'its start is kept at the top of the save, and goes to the account', R);
  if (SHOOT) {
    for (const scheme of ['light', 'dark']) {
      await p.emulateMedia({colorScheme: scheme}); await p.waitForTimeout(100);
      await shot(p, 'start-home-' + scheme);
      await tap(p, '[data-act="startch"]'); await shot(p, 'start-sheet-' + scheme); await tap(p, '#sheetClose', 120);
    }
  }
  await close(d);
}

// ---------- once the student has finished from the start on, Home goes back to the chapters before it ----------
{
  const t = Date.parse('2026-10-01T09:00:00'), ans = {};
  ['c3', 'c4'].forEach(id => TOPIC.chapters.find(c => c.id === id).points.forEach(p => { ans[p.id + 'a'] = ans[p.id + 'b'] = {ok: true, n: 1, t: t}; }));
  const d = await open({start: true, seed: {place: NSW, start: 'c3', ans: ans}}), p = d.p;
  check((await text(p, '.hero .h1')) === TOPIC.chapters[0].title && (await text(p, '.startat span')) === 'Starting point: Chapter 3', 'with chapters 3 and 4 proven, Home goes to chapter 1, which is still not done', R);
  check((await text(p, '.hero .primary')) === 'Start this chapter', 'and it is not counted as done', R);
  await close(d);
}

// ---------- a course with progress in it never asks ----------
{
  const t = Date.parse('2026-10-01T09:00:00');
  const d = await open({start: true, seed: {place: NSW, ans: {'e-naturea': {ok: true, n: 1, t: t}}, m: {h: {m1p1: [{ok: true, day: '2026-10-01', q: 'a', t: t}]}}}}), p = d.p;
  await switchTo(p, 'edexcel');
  check(!(await sheetUp(p)) && (await text(p, '.hero .h1')) === CHS[0].title, 'the Edexcel course with an answer in it opens on Home, with no question', R);
  check((await text(p, '.startat span')) === 'Starting point: Unit 1, chapter 1' && (await saved(p)).c.edexcel.start === undefined, 'its starting point is Chapter 1, and nothing is saved for it', R);
  await switchTo(p, 'maths');
  check(!(await sheetUp(p)), 'nor does Maths with an answer in it', R);
  const s = await saved(p);
  check(s.ans['e-naturea'].ok && s.m.h.m1p1.length === 1, 'the progress is kept as it was', R);
  await close(d);
}

// ---------- the first open: the question is a full-screen step after the course ----------
{
  const d = await open({setup: true, start: true}), p = d.p;
  await tap(p, '#setup [data-act="placenext"]');
  await tap(p, '#setup [data-act="placedone"]');
  await tap(p, '#setup .pick[data-sub="edexcel"]');
  check(await p.locator('#setup').isVisible() && (await text(p, '#setupTitle')) === 'Where is your class up to?' && (await text(p, '#setup .rule')) === RULE, 'after picking a course, the question is the next full-screen step', R);
  check((await p.locator('#setup [data-act="startpick"][aria-checked="true"]').getAttribute('data-v')) === CHS[0].id && (await text(p, '#setup .cta .primary')) === 'Start here' && (await text(p, '#setup .cta .ghost')) === 'Back', 'with Chapter 1 picked, Start here and Back', R);
  check((await saved(p)).c.edexcel.start === undefined && !(await saved(p)).picked, 'nothing is saved yet', R);
  if (SHOOT) for (const scheme of ['light', 'dark']) { await p.emulateMedia({colorScheme: scheme}); await p.waitForTimeout(100); await shot(p, 'start-first-' + scheme); }
  await p.emulateMedia({colorScheme: 'light'});
  await tap(p, '#setup [data-act="startback"]');
  check((await text(p, '#setupTitle')) === 'Pick your course', 'Back goes to the courses', R);
  await tap(p, '#setup .pick[data-sub="edexcel"]');
  await tap(p, '#setup [data-v="' + CHS[7].id + '"]', 80);
  await tap(p, '#setup [data-act="startset"]', 300);
  const s = await saved(p);
  check(!(await p.locator('#setup').isVisible()) && (await text(p, '.hero .h1')) === CHS[7].title, 'Start here closes the steps and opens Home on the chapter picked', R);
  check(s.picked === 1 && s.subject === 'edexcel' && s.c.edexcel.start === CHS[7].id && s.c.edexcel.cur === CHS[7].id, 'the course and its start are saved', R);
  await p.goto(p.url()); await p.waitForTimeout(300);
  check(!(await p.locator('#setup').isVisible()) && !(await sheetUp(p)) && (await text(p, '.hero .h1')) === CHS[7].title, 'a reload asks nothing again', R);
  await close(d);
}

// ---------- it fits on a small phone, light and dark ----------
for (const scheme of ['light', 'dark']) {
  const d = await open({start: true, w: 360, h: 640, scheme: scheme, seed: {place: NSW}}), p = d.p;
  await switchTo(p, 'edexcel');
  const wide = () => p.evaluate(() => [document.querySelector('#sheet .panel'), document.querySelector('#v-home')].some(el => el && el.scrollWidth > el.clientWidth + 1));
  const btn = await p.locator('#sheetBody [data-act="startset"]').boundingBox();
  check(!(await wide()) && btn && btn.y + btn.height <= 640, '360 px, ' + scheme + ': the sheet has no sideways scroll and Start here is on screen', R);
  await tap(p, '[data-act="startset"]', 250);
  const ch = await p.locator('.startat button').boundingBox();
  check(!(await wide()) && ch && ch.x + ch.width <= 360, '360 px, ' + scheme + ': Home\'s starting point row fits', R);
  await close(d);
}

check(errsAll.length === 0, 'no script errors' + (errsAll.length ? ': ' + errsAll.join(' / ') : ''), R);
console.log(R.join('\n'));
process.exit(0);
