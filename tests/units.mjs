// Courses named by units instead of years. Victoria and Queensland call Year 11 Units 1 and 2, and Year 12 Units 3
// and 4 (South Australia says Stage 1 and Stage 2), and an outline can set its own level line for this. tests/units/ holds the files that
// content/pipeline.py publish wrote for two test courses for Victoria (content/test_pipeline.py checks they are still
// what it writes): Units 1 and 2 (Year 11) and Units 3 and 4 (Year 12), the first reusing a point from the test course's
// bank and one from the Economics bank. This builds v2-units.html with them added (python3 build.py --extra tests/units
// --out v2-units.html) and checks: Australia's line naming every state with courses; Victoria saying VCE on the state
// step now it has courses, while a state with none (Queensland, served with its courses taken out) says Courses coming; the courses for Victoria in
// order (VIC_ORDER: each year's own courses, then the course that spans two years, Level 10A after Year 10, then Units 1
// and 2 and Units 3 and 4), then the international courses; Home naming a course by its units; New South Wales still
// grouped by year, with no Victorian course; Queensland's Australian Curriculum courses still Year 7 to Year 10; the
// first-open course step in the same order; and the courses step at 360 px in light and dark with no sideways scroll.
// Run: node units.mjs. Pass "shots" to also save the courses for Victoria at 390 by 844, light and dark, to tests/shots/.
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { open, shot, check, saved, noCoursesIn } from './lib.mjs';
import { loadContent } from '../content/load.mjs';
const R = [], ROOT = fileURLToPath(new URL('..', import.meta.url)), shots = process.argv[2] === 'shots';
const build = spawnSync(process.platform === 'win32' ? 'py' : 'python3', ['build.py', '--extra', 'tests/units', '--out', 'v2-units.html'], {cwd: ROOT, encoding: 'utf8'});
check(build.status === 0, 'build.py adds the Victorian test courses from tests/units and writes v2-units.html', R);
const C = loadContent(ROOT + 'tests/units');
// The Victorian courses in the fixture, apart from the VCE courses the repository has published itself.
const OWN = new Set(loadContent().MADE_COURSES.map(c => c.id));
const VIC = C.MADE_COURSES.filter(c => c.place === 'vic' && !OWN.has(c.id)).map(c => c.id);
// The headings Victoria's courses go under, in the sheet's order.
const VIC_ORDER = ['Year 7', 'Year 8', 'Levels 7 and 8', 'Year 9', 'Year 10', 'Level 10A', 'Levels 9 and 10', 'Units 1 and 2', 'Units 3 and 4'];
// Every Victorian course under a heading, test or real, in the sheet's order: A to Z by subject, then by name.
const atLevel = lv => C.MADE_COURSES.filter(c => c.place === 'vic' && (c.level || c.year) === lv)
  .sort((a, b) => a.course.localeCompare(b.course, 'en') || a.name.localeCompare(b.name, 'en')).map(c => c.id);
// What Victoria's part of the sheet should hold: each heading and its courses.
const VIC_WANT = VIC_ORDER.map(h => [h, atLevel(h)]);
const NSW = C.MADE_COURSES.filter(c => c.place === 'nsw').map(c => c.id).concat(['eco', 'maths']);
const text = (p, sel) => p.locator(sel).first().textContent();
// The courses on a step, by place and then by heading: [[place, [[heading, [course ids]], ...]], ...].
const grouped = (p, root) => p.evaluate(r => {
  const out = [];
  document.querySelectorAll(r + ' .unit, ' + r + ' .yr').forEach(h => {
    if (h.classList.contains('unit')) { out.push([h.textContent, []]); return; }
    out[out.length - 1][1].push([h.textContent, Array.from(h.nextElementSibling.querySelectorAll('.pick')).map(b => b.dataset.sub)]);
  });
  return out;
}, root);
const wide = p => p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);

// ---------- a state with no courses still says Courses coming ----------
// No real state is without courses now, so this serves v2-units.html with Queensland taken out of the Australian
// Curriculum courses' places.
{
  const {b, p, errs} = await open({page: 'v2-units.html', tz: 'Australia/Melbourne', route: noCoursesIn('qld')});
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await text(p, '#sheetBody .choice[data-v="AU"] small')) === 'NSW, VIC, WA, SA, TAS, ACT and NT courses and international courses', 'with Queensland\'s courses taken out, Australia\'s line leaves QLD out', R);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  const states = await p.locator('#sheetBody .choice .t').allTextContents();
  check(states[0] === 'New South WalesHSC' && states[1] === 'VictoriaVCE' && states[2] === 'QueenslandCourses coming' && states.filter(s => s.endsWith('Courses coming')).length === 1,
    'Victoria says VCE, and Queensland, with none, says Courses coming', R);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

// ---------- the subject sheet on a phone in Melbourne ----------
{
  check(VIC.join(',') === 'tsv-units-12,tsv-units-34', 'the fixture has two courses for Victoria', R);
  const {b, p, errs} = await open({page: 'v2-units.html', tz: 'Australia/Melbourne'});
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await text(p, '#sheetBody .choice[data-v="AU"] small')) === 'NSW, VIC, QLD, WA, SA, TAS, ACT and NT courses and international courses', 'Australia\'s line names every state with courses', R);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  const states = await p.locator('#sheetBody .choice .t').allTextContents();
  check(JSON.stringify(states) === JSON.stringify(['New South WalesHSC', 'VictoriaVCE', 'QueenslandYears 7 to 10', 'Western AustraliaYears 7 to 10', 'South AustraliaYears 7 to 10', 'TasmaniaYears 7 to 10', 'Australian Capital TerritoryYears 7 to 10', 'Northern TerritoryYears 7 to 10']),
    'Victoria says VCE now it has Units courses, and the six with only Years 7 to 10 courses say so', R);
  check((await p.locator('#sheetBody [aria-checked="true"]').textContent()).startsWith('Victoria'), 'a phone in Melbourne has Victoria picked', R);
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(100);
  const g = await grouped(p, '#sheetBody');
  const vicAll = C.MADE_COURSES.filter(c => c.place === 'vic').map(c => c.id);
  check(VIC_WANT.every(x => x[1].length) && VIC_WANT.flatMap(x => x[1]).length === vicAll.length,
    'every Victorian course, Years 7 to 10 and VCE, is under one of the nine headings', R);
  check(atLevel('Units 1 and 2').includes('tsv-units-12') && atLevel('Units 3 and 4').includes('tsv-units-34') &&
    JSON.stringify(g[0]) === JSON.stringify(['Victoria', VIC_WANT]),
    'Victoria\'s courses go Year 7, Year 8, Levels 7 and 8, Year 9, Year 10, Level 10A, Levels 9 and 10, Units 1 and 2, Units 3 and 4, A to Z within each: ' + g[0][1].map(x => x[0]).join(', '), R);
  check(g[1][0] === 'International courses' && g[1][1].map(x => x[0]).join(',') === 'AS', 'then the international courses, under AS', R);
  check((await p.locator('#sheetBody .sub').first().textContent()) === 'More Victorian subjects are coming.', 'with Victoria\'s line under its courses', R);
  check((await text(p, '.pick[data-sub="tsv-units-34"] .t')).startsWith('Testing, Units 3 and 4VCE, Later test units'), 'each row has its name and its line', R);
  check(await wide(p) <= 0, 'nothing scrolls sideways at 390 px', R);
  if (shots) for (const scheme of ['light', 'dark']) {
    await p.emulateMedia({colorScheme: scheme}); await p.waitForTimeout(100); await shot(p, 'units-courses-' + scheme);
  }
  await p.emulateMedia({colorScheme: 'light'});
  await p.click('.pick[data-sub="tsv-units-34"]'); await p.waitForTimeout(200);
  check((await text(p, '.subject')) === 'Testing, Units 3 and 4' && (await saved(p)).subject === 'tsv-units-34', 'Home names the course by its units', R);
  check((await text(p, '.hero .h1')) === 'Later chapter', 'and opens on its chapter', R);

  // ---------- New South Wales is still grouped by year ----------
  await p.click('.subject'); await p.waitForTimeout(100);
  await p.click('[data-act="placechange"]'); await p.waitForTimeout(80);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  await p.click('[data-act="state"][data-v="nsw"]'); await p.waitForTimeout(40);
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(100);
  const n = await grouped(p, '#sheetBody');
  const nswIds = n[0][1].flatMap(x => x[1]);
  check(n[0][0] === 'New South Wales' && n[0][1].every(x => /^Year \d+$/.test(x[0])) && n[0][1].map(x => x[0]).join(',') === 'Year 11,Year 12' &&
    nswIds.length === NSW.length && NSW.every(id => nswIds.includes(id)), 'New South Wales is still grouped by year, Year 11 then Year 12, with no Victorian course: ' + n[0][1].map(x => x[0]).join(','), R);
  check(n[n.length - 1][0] === 'Open now' && n[n.length - 1][1][0][0] === 'Units 3 and 4', 'the Victorian course open now shows under Open now, under its units', R);

  // ---------- Queensland's Australian Curriculum courses are still by year ----------
  await p.click('[data-act="placechange"]'); await p.waitForTimeout(80);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  await p.click('[data-act="state"][data-v="qld"]'); await p.waitForTimeout(40);
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(100);
  const q = await grouped(p, '#sheetBody');
  check(q[0][0] === 'Queensland' && q[0][1].map(x => x[0]).join(',') === 'Year 7,Year 8,Year 9,Year 10',
    'Queensland\'s courses are still Year 7, Year 8, Year 9, Year 10: ' + q[0][1].map(x => x[0]).join(','), R);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

// ---------- the first open, in Melbourne ----------
{
  const {b, p, errs} = await open({page: 'v2-units.html', tz: 'Australia/Melbourne', setup: true});
  await p.click('#setup [data-act="placenext"]'); await p.waitForTimeout(80);
  await p.click('#setup [data-act="placedone"]'); await p.waitForTimeout(100);
  const g = await grouped(p, '#setup');
  check((await text(p, '#setupTitle')) === 'Pick your course' && JSON.stringify(g[0][1]) === JSON.stringify(VIC_WANT),
    'the first open\'s course step has Victoria\'s courses in the same order: ' + g[0][1].map(x => x[0]).join(', '), R);
  await p.click('#setup .pick[data-sub="tsv-units-12"]'); await p.waitForTimeout(250);
  check((await text(p, '.subject')) === 'Testing, Units 1 and 2', 'and one tap opens Home on the course', R);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

// ---------- 360 px, light and dark ----------
for (const scheme of ['light', 'dark']) {
  const {b, p, errs} = await open({page: 'v2-units.html', tz: 'Australia/Melbourne', w: 360, h: 740, scheme, seed: {place: {country: 'AU', state: 'vic'}, subject: 'tsv-units-12', picked: 1}});
  await p.click('.subject'); await p.waitForTimeout(150);
  const g = await grouped(p, '#sheetBody');
  const fits = await p.evaluate(() => Array.from(document.querySelectorAll('#sheetBody .yr, #sheetBody .pick')).every(el => el.getBoundingClientRect().right <= window.innerWidth));
  check(g[0][0] === 'Victoria' && JSON.stringify(g[0][1]) === JSON.stringify(VIC_WANT), 'at 360 px in ' + scheme + ', Victoria\'s headings are in order from Year 7 to Units 3 and 4', R);
  check(fits && await wide(p) <= 0, 'at 360 px in ' + scheme + ', every heading and row, Years 7 to 10 included, fits with no sideways scroll', R);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}
console.log(R.join('\n'));
process.exit(process.exitCode || 0);
