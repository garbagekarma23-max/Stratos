// Courses named by units instead of years. Victoria and Queensland call Year 11 Units 1 and 2, and Year 12 Units 3
// and 4 (South Australia says Stage 1 and Stage 2), and an outline can set its own level line for this. tests/units/ holds the files that
// content/pipeline.py publish wrote for two test courses for Victoria (content/test_pipeline.py checks they are still
// what it writes): Units 1 and 2 (Year 11) and Units 3 and 4 (Year 12), the first reusing a point from the test course's
// bank and one from the Economics bank. This builds v2-units.html with them added (python3 build.py --extra tests/units
// --out v2-units.html) and checks: Australia's line naming NSW and VIC; Victoria saying VCE on the state step now it
// has courses, while the states with none still say Courses coming; the courses for Victoria under Units 1 and 2, then
// Units 3 and 4, then the international courses; Home naming a course by its units; New South Wales still grouped by
// year, with no Victorian course; the first-open course step grouped the same way; and the courses step at 360 px in
// light and dark with no sideways scroll.
// Run: node units.mjs. Pass "shots" to also save the courses for Victoria at 390 by 844, light and dark, to tests/shots/.
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { open, shot, check, saved } from './lib.mjs';
import { loadContent } from '../content/load.mjs';
const R = [], ROOT = fileURLToPath(new URL('..', import.meta.url)), shots = process.argv[2] === 'shots';
const build = spawnSync(process.platform === 'win32' ? 'py' : 'python3', ['build.py', '--extra', 'tests/units', '--out', 'v2-units.html'], {cwd: ROOT, encoding: 'utf8'});
check(build.status === 0, 'build.py adds the Victorian test courses from tests/units and writes v2-units.html', R);
const C = loadContent(ROOT + 'tests/units');
const VIC = C.MADE_COURSES.filter(c => c.place === 'vic').map(c => c.id);
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

// ---------- the subject sheet on a phone in Melbourne ----------
{
  check(VIC.join(',') === 'tsv-units-12,tsv-units-34', 'the fixture has two courses for Victoria', R);
  const {b, p, errs} = await open({page: 'v2-units.html', tz: 'Australia/Melbourne'});
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await text(p, '#sheetBody .choice[data-v="AU"] small')) === 'NSW and VIC courses and international courses', 'Australia\'s line names both states with courses', R);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  const states = await p.locator('#sheetBody .choice .t').allTextContents();
  check(states[0] === 'New South WalesHSC' && states[1] === 'VictoriaVCE' && states.slice(2).every(s => s.endsWith('Courses coming')),
    'Victoria says VCE now it has courses, and the states with none still say Courses coming', R);
  check((await p.locator('#sheetBody [aria-checked="true"]').textContent()).startsWith('Victoria'), 'a phone in Melbourne has Victoria picked', R);
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(100);
  const g = await grouped(p, '#sheetBody');
  check(JSON.stringify(g[0]) === JSON.stringify(['Victoria', [['Units 1 and 2', ['tsv-units-12']], ['Units 3 and 4', ['tsv-units-34']]]]),
    'Victoria\'s courses are grouped by units, Units 1 and 2 before Units 3 and 4: ' + JSON.stringify(g[0]), R);
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
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

// ---------- the first open, in Melbourne ----------
{
  const {b, p, errs} = await open({page: 'v2-units.html', tz: 'Australia/Melbourne', setup: true});
  await p.click('#setup [data-act="placenext"]'); await p.waitForTimeout(80);
  await p.click('#setup [data-act="placedone"]'); await p.waitForTimeout(100);
  const g = await grouped(p, '#setup');
  check((await text(p, '#setupTitle')) === 'Pick your course' && JSON.stringify(g[0][1].map(x => x[0])) === JSON.stringify(['Units 1 and 2', 'Units 3 and 4']),
    'the first open\'s course step groups Victoria\'s courses by units too', R);
  await p.click('#setup .pick[data-sub="tsv-units-12"]'); await p.waitForTimeout(250);
  check((await text(p, '.subject')) === 'Testing, Units 1 and 2', 'and one tap opens Home on the course', R);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

// ---------- 360 px, light and dark ----------
for (const scheme of ['light', 'dark']) {
  const {b, p, errs} = await open({page: 'v2-units.html', tz: 'Australia/Melbourne', w: 360, h: 740, scheme, seed: {place: {country: 'AU', state: 'vic'}, subject: 'tsv-units-12', picked: 1}});
  await p.click('.subject'); await p.waitForTimeout(150);
  const heads = await p.locator('#sheetBody .yr').allTextContents();
  const fits = await p.evaluate(() => Array.from(document.querySelectorAll('#sheetBody .yr, #sheetBody .pick')).every(el => el.getBoundingClientRect().right <= window.innerWidth));
  check(heads.slice(0, 2).join(',') === 'Units 1 and 2,Units 3 and 4' && fits && await wide(p) <= 0, 'at 360 px in ' + scheme + ', the units headings and rows fit with no sideways scroll', R);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}
console.log(R.join('\n'));
process.exit(process.exitCode || 0);
