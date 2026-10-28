// A course made by the content pipeline, in v2. tests/made/ holds the bank and course files that
// content/pipeline.py publish wrote for its test course (content/test_pipeline.py checks they are still what it
// writes). This builds v2-made.html with them added (python3 build.py --extra tests/made --out v2-made.html) and
// checks: the course row on the subject sheet under New South Wales, with its note; Home with its unit, chapters and
// note; Learn through the first chapter, which reuses two Economics bank points (e-nature and e-ped); progress on a
// shared point counting in the Edexcel course too, with each course naming its own chapter for it; Search and its
// words to try; a chapter with no points showing as Coming soon; and the challenge sheet leaving the course out.
// Run: node made.mjs
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { open, tab, saved, pick, check, course, keyBank, BANK } from './lib.mjs';
import { loadContent } from '../content/load.mjs';
const R = [], ROOT = fileURLToPath(new URL('..', import.meta.url));
const build = spawnSync(process.platform === 'win32' ? 'py' : 'python3', ['build.py', '--extra', 'tests/made', '--out', 'v2-made.html'], {cwd: ROOT, encoding: 'utf8'});
check(build.status === 0, 'build.py adds the made course from tests/made and writes v2-made.html', R);
const C = loadContent(ROOT + 'tests/made'), TST = C.MADE_BANKS.tst, COURSE = C.MADE_COURSES.find(c => c.id === 'tst-course');
// The made courses for NSW: the ones in src/courses, and the test course.
const NSW_MADE = C.MADE_COURSES.filter(c => c.place === 'nsw').map(c => c.id);
keyBank(TST);
const IDS = COURSE.units[0].chapters[0].points, point = id => TST[id] || BANK[id];
const text = (p, sel) => p.locator(sel).first().textContent();

{
  const {b, p, errs} = await open({page: 'v2-made.html'});
  // ---------- the subject sheet and Home ----------
  await p.click('.subject'); await p.waitForTimeout(100);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(80);
  const row = p.locator('.pick[data-sub="tst-course"]');
  // The courses are grouped by year from their data. The test course is Year 9, so it has the first group to itself.
  const firstYr = await p.locator('#sheetBody .yr').first().textContent();
  const nsw = await p.locator('#sheetBody .picks').first().locator('.pick').evaluateAll(els => els.map(e => e.dataset.sub));
  const allNsw = await p.locator('#sheetBody .unit').first().evaluate(h => { const ids = []; for (let el = h.nextElementSibling; el && !el.classList.contains('unit'); el = el.nextElementSibling) el.querySelectorAll('.pick').forEach(b => ids.push(b.dataset.sub)); return ids; });
  check(firstYr === 'Year 9' && nsw.join(',') === 'tst-course' && allNsw.length === NSW_MADE.length + 2 && ['eco', 'maths'].concat(NSW_MADE).every(id => allNsw.includes(id)), 'the made course is listed under New South Wales, under Year 9 from its data', R);
  check((await row.locator('.t').textContent()) === 'Testing, Year 9NSW, Test topic' + COURSE.note, 'its row has its name, its line and its note', R);
  await row.click(); await p.waitForTimeout(200);
  check((await text(p, '.subject')) === 'Testing, Year 9' && (await text(p, '.cnote')) === COURSE.note, 'Home names the course, with its note under it', R);
  check((await text(p, '.hero .h1')) === 'First chapter' && (await text(p, '.hero .kicker')) === 'Unit 1, chapter 1 of 2', 'the hero opens on Unit 1, chapter 1 of 2', R);
  check((await p.locator('#v-home .unit').allTextContents()).join('|') === 'Unit 1: Testing unit', 'Home lists the unit', R);
  check((await p.locator('#v-home .ch-head .t').allTextContents()).join('|') === 'First chapter|Second chapter' && (await p.locator('#v-home .ch.soon').count()) === 0, 'and both chapters, ready', R);
  check((await p.locator('#v-home .ch').first().locator('.pt .t').allTextContents()).join('|') === IDS.map(id => point(id).title).join('|'), 'the first chapter lists its points, the reused bank points among them', R);
  check((await text(p, '#v-home .fine')).startsWith('This course has 2 chapters. Challenges and races use the other subjects for now.'), 'the note at the bottom of Home counts the chapters', R);

  // ---------- Learn through the first chapter ----------
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  check((await p.locator('#segs .seg').count()) === IDS.length, 'Learn opens with one segment per point', R);
  const titles = [];
  for (let i = 0; i < IDS.length; i++) {
    const card = p.locator('#learnFeed .card:not(.endslide)').last();
    titles.push(await card.locator('.ctitle').textContent());
    if (i === 0) check((await card.locator('.lines').innerHTML()).includes('<b>Part:</b>'), 'a labelled card line shows its label in bold', R);
    await card.locator('.next').click(); await p.waitForTimeout(60);
    await pick(p, '#learnFeed', true);
    await p.locator('#learnFeed .slide.q.done .next').last().click(); await p.waitForTimeout(60);
  }
  check(titles.join('|') === IDS.map(id => point(id).title).join('|'), 'each card is the next point, in order', R);
  check((await text(p, '#learnFeed .endslide .ctitle')) === 'Chapter learned', 'the end slide says Chapter learned', R);
  const s = await saved(p);
  check(IDS.every(id => s.ans[id + 'a'] && s.ans[id + 'a'].ok) && s.subject === 'tst-course' && s.c['tst-course'].cur === 'tst-course-1-1', 'answers are saved by point id, and the course keeps its own chapter', R);

  // ---------- a shared point counts in both courses, and each names its own chapter ----------
  await tab(p, 'home');
  check((await text(p, '#v-home .ch .stage')) === 'Learned, 0 of 7 proven', 'the chapter row says Learned, 0 of 7 proven', R);
  await p.locator('#v-home .ch').first().locator('.pt').nth(6).click(); await p.waitForTimeout(150);
  check((await text(p, '#sheetTitle')) === BANK['e-ped'].title && (await text(p, '#sheetBody')).includes('Unit 1, chapter 1: First chapter'), 'in the made course, the shared point names the made course\'s chapter', R);
  await p.click('#sheetClose'); await p.waitForTimeout(150);
  await course(p, 'edexcel');
  const ch2 = p.locator('#v-home .ch').nth(1);
  await ch2.locator('.ch-head').click(); await p.waitForTimeout(80);
  const labs = await ch2.locator('.pt').evaluateAll(els => els.map(e => e.querySelector('.t').textContent + ':' + e.querySelector('.lab').textContent));
  check(labs.includes(BANK['e-ped'].title + ':Learned') && labs.filter(l => l.endsWith(':Learned')).length === 1, 'in the Edexcel course, the shared point is learned too, and nothing else is', R);
  await ch2.locator('.pt').nth(2).click(); await p.waitForTimeout(150);
  check((await text(p, '#sheetTitle')) === BANK['e-ped'].title && (await text(p, '#sheetBody')).includes('Unit 1, chapter 2: Consumer behaviour and demand'), 'and its point sheet names the Edexcel chapter', R);
  await p.click('#sheetClose'); await p.waitForTimeout(150);
  await course(p, 'tst-course');

  // ---------- Search ----------
  await tab(p, 'search');
  check((await p.getAttribute('#q', 'placeholder')) === 'Search Testing', 'Search looks through the made course', R);
  check((await p.locator('#qChips .chip').allTextContents()).join('|') === COURSE.chips.join('|'), 'with the course\'s own words to try', R);
  await p.fill('#q', 'plain'); await p.waitForTimeout(80);
  const hits = await p.locator('#qOut .res .t').allTextContents();
  check(hits.includes('Plain one') && hits.every(h => IDS.concat(COURSE.units[0].chapters[1].points).some(id => point(id).title === h)), 'it finds a made point, and only the course\'s points', R);
  await p.fill('#q', 'multiplier'); await p.waitForTimeout(80);
  check((await text(p, '#qOut')).startsWith('Nothing in this topic matches'), 'and not an Edexcel point the course does not list', R);
  await tab(p, 'home');

  // ---------- challenges leave the made course out for now ----------
  await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(120);
  await p.click('.thr[data-f="tom"]'); await p.waitForTimeout(120);
  await p.click('[data-act="pickch"][data-kind="challenge"]'); await p.waitForTimeout(100);
  const subs = await p.locator('#sheetBody .subsw button').evaluateAll(els => els.map(e => e.dataset.sub));
  check(subs.join(',') === 'eco,maths,edexcel' && (await p.getAttribute('#sheetBody .subsw [aria-pressed="true"]', 'data-sub')) === 'eco', 'the challenge sheet leaves out the made course and opens on NSW Economics', R);
  await p.click('#sheetClose'); await p.waitForTimeout(100);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

// ---------- a chapter still in review shows as Coming soon ----------
{
  const held = async ctx => ctx.route(/v2-made\.html$/, async r => {
    const res = await r.fetch(), body = await res.text();
    await r.fulfill({response: res, body: body.replace('"points": ["tst-refuse-one", "tst-unsure-one"]', '"points": []')});
  });
  const {b, p, errs} = await open({page: 'v2-made.html', route: held, seed: {subject: 'tst-course', picked: 1}});
  check((await text(p, '.subject')) === 'Testing, Year 9' && (await p.locator('#v-home .ch.soon').count()) === 1, 'a chapter published with no points shows on Home as Coming soon', R);
  check((await p.locator('#v-home .ch.soon .ch-head').textContent()).includes('Second chapter'), 'and it is the second chapter', R);
  check(errs.length === 0, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}
console.log(R.join('\n'));
