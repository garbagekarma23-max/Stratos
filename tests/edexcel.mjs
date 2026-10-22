// The Edexcel International A Level Economics course in v2: picking it on the subject sheet, its own progress kept
// apart from NSW Economics and Maths, the 12 chapters of Units 1 and 2 and their points, a chapter with no points
// showing as Coming soon, no Draft label now that every chapter is checked (and the label still working for a chapter
// marked draft), Learn through Chapter 1, Learn from the end of Unit 1 into Unit 2,
// a Practice flight on it, and the friend sheet staying on the other subjects.
// Run: node edexcel.mjs. Pass "shots" to also save Home, the chapter list, a Unit 1 card and a Unit 2 card at 390 by 844,
// light and dark, to tests/shots/.
import { open, shot, tab, saved, pick, toLast, waiting, check, course, BANK, EDEXCEL } from './lib.mjs';
const R = [], errsAll = [], shots = process.argv[2] === 'shots';
const IDS = EDEXCEL.units[0].chapters[0].points, ALLIDS = EDEXCEL.units.flatMap(u => u.chapters.flatMap(c => c.points));
const NOTE = 'Covers Pearson Edexcel International A Level Economics. Not affiliated with or endorsed by Pearson.';
const NAME = 'Economics, International A Level (Edexcel)';
// Progress already made in the other two subjects, which this course must leave exactly as it is.
const ECO = {c1p1a: {ok: true, n: 1, t: Date.parse('2026-10-01T09:00:00')}, c1p2a: {ok: false, n: 1, t: Date.parse('2026-10-01T09:01:00')}};
const MATHS = {cur: 'm1', h: {m1p1: [{ok: true, day: '2026-10-01', q: 'a', t: 1}]}};
const SEED = {ans: ECO, cur: 'c1', m: MATHS};

const toEdexcel = p => course(p, 'edexcel');
const text = (p, sel) => p.locator(sel).first().textContent();

// ---------- 1. the subject sheet, switching, and Home ----------
{
  const {b, p, errs} = await open({seed: SEED});
  check((await p.locator('.tag').count()) === 0, 'NSW Economics shows no Draft label', R);
  await p.click('.subject'); await p.waitForTimeout(100);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(80);
  const row = p.locator('.pick[data-sub="edexcel"]');
  check((await row.count()) === 1 && (await row.locator('.t').textContent()) === 'Economics, AS yearInternational A Level (Edexcel)' + NOTE, 'the subject sheet has the course, named with its exam, with the Pearson line under it', R);
  check((await row.locator('.v').textContent()) === 'Switch' && !(await row.isDisabled()), 'the course can be picked', R);
  await row.click(); await p.waitForTimeout(200);
  check((await text(p, '.subject')) === NAME, 'Home shows the course name', R);
  check((await text(p, '.cnote')) === NOTE, 'the Pearson line sits under the course name on Home', R);
  check((await text(p, '#toast')) === 'Switched to ' + NAME, 'a toast says which course is open', R);
  check((await text(p, '.hero .h1')) === 'Introductory concepts', 'Home opens on Unit 1, Chapter 1: Introductory concepts', R);
  check((await text(p, '.hero .kicker')) === 'Unit 1, chapter 1 of 6', 'the hero says Unit 1, chapter 1 of 6, with no Draft label', R);
  check((await text(p, '.legend')).includes('0 of 6 proven') && (await text(p, '.legend')).includes('0 of 6 learned'), 'the bar starts at 0 of 6', R);
  check((await text(p, '.hero .primary')) === 'Start this chapter', 'the button says Start this chapter', R);
  // Pearson is named only in the line under the course name. No logos: the page has no images of any kind for it.
  const pearson = await p.evaluate(() => { const t = document.querySelector('#v-home').innerText; return t.split('Pearson').length - 1; });
  check(pearson === 2, 'Home names Pearson only in the one line under the course name', R);

  // ---------- 2. the shape of the AS year: two units, 12 chapters, every one ready and checked ----------
  const units = await p.locator('#v-home .unit').allTextContents();
  check(units.join('|') === 'Unit 1: Markets in action|Unit 2: Macroeconomic performance and policy', 'Home lists Unit 1 and Unit 2', R);
  const titles = await p.locator('#v-home .ch-head .t').allTextContents();
  const want = EDEXCEL.units.flatMap(u => u.chapters.map(c => c.title));
  check(titles.length === 12 && titles.join('|') === want.join('|'), 'all 12 chapters show, in order', R);
  const nums = await p.locator('#v-home .ch-head .n').allTextContents();
  check(nums.join('') === '123456123456', 'chapters are numbered within each unit', R);
  check((await p.locator('#v-home .ch.soon').count()) === 0, 'no chapter is Coming soon', R);
  const ready = p.locator('#v-home .ch:not(.soon)');
  check((await ready.count()) === 12 && (await p.locator('#v-home .ch-list').nth(1).locator('.ch:not(.soon)').count()) === 6, 'all 12 chapters are ready, six in each unit', R);
  check((await p.locator('#v-home .tag').count()) === 0, 'no chapter is labelled Draft', R);
  check((await ready.locator('.stage').allTextContents()).every(s => s === 'Not started'), 'each chapter says Not started', R);
  // Open chapters 2 to 12 in turn: each lists its points from the bank, in order, then Chapter 1 opens again.
  const chapters = EDEXCEL.units.flatMap(u => u.chapters), lists = [];
  for (let i = 1; i < 12; i++) {
    await ready.nth(i).locator('.ch-head').click(); await p.waitForTimeout(80);
    lists.push((await ready.nth(i).locator('.pt .t').allTextContents()).join('|') === chapters[i].points.map(id => BANK[id].title).join('|'));
  }
  check(lists.every(Boolean) && chapters.map(c => c.points.length).join('') === '652454743445', 'chapters 2 to 12 open to their points, in order: Unit 1 has 5, 2, 4, 5 and 4 after Chapter 1, Unit 2 has 7, 4, 3, 4, 4 and 5', R);
  check(ALLIDS.length === 53 && new Set(ALLIDS).size === 53, 'the course has 53 points, none listed twice', R);
  await ready.nth(0).locator('.ch-head').click(); await p.waitForTimeout(80);
  const ch1 = ready.first();
  check((await ch1.locator('.pt').count()) === 6 && (await ch1.locator('.pt .t').allTextContents()).join('|') === IDS.map(id => BANK[id].title).join('|'), 'Chapter 1 has its six points, in order', R);
  check((await ready.locator('.pt .lab').allTextContents()).every(s => s === 'New'), 'every point starts New', R);
  const fine = await p.locator('#v-home .fine').textContent();
  check(fine.startsWith('The AS year has 12 chapters. Challenges and races') && !/draft|checked/i.test(fine) && !fine.includes('coming soon'), 'the note at the bottom of Home says nothing about drafts', R);

  // The point sheet names the chapter, and no longer says it is a draft.
  await ch1.locator('.pt').nth(2).click(); await p.waitForTimeout(150);
  const sh = await text(p, '#sheetBody');
  check((await text(p, '#sheetTitle')) === 'Scarcity' && sh.includes('Unit 1, chapter 1: Introductory concepts') && !sh.includes('Draft') && !sh.includes('not been checked'), 'the point sheet names the chapter, with no draft line', R);
  await p.click('#sheetClose'); await p.waitForTimeout(150);

  // ---------- 3. Search and Practice follow the course ----------
  await tab(p, 'search');
  check((await p.getAttribute('#q', 'placeholder')) === 'Search AS Economics', 'Search looks through AS Economics', R);
  await p.fill('#q', 'opportunity'); await p.waitForTimeout(80);
  const hits = await p.locator('#qOut .res .t').allTextContents();
  check(hits.includes('Scarcity') && hits.every(h => ALLIDS.some(id => BANK[id].title === h)), 'Search finds Scarcity and only this course\'s points', R);
  check((await text(p, '#qOut .res .c')).startsWith('Unit 1, chapter 1'), 'a search result names Unit 1, chapter 1', R);
  await p.fill('#q', 'multiplier'); await p.waitForTimeout(80);
  check((await text(p, '#qOut .res .t')) === 'The multiplier' && (await text(p, '#qOut .res .c')).startsWith('Unit 2, chapter 4'), 'Search finds a Unit 2 point and names Unit 2, chapter 4', R);
  await p.fill('#q', 'WTO'); await p.waitForTimeout(80);
  check((await text(p, '#qOut')).startsWith('Nothing in this topic matches'), 'NSW points are not found', R);
  await tab(p, 'practice');
  check((await text(p, '#pracStart')).includes('Learn your first point'), 'Practice asks you to learn a point first', R);

  // ---------- 4. Learn through Chapter 1: six cards, the fourth answered wrong ----------
  await tab(p, 'home');
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  check((await p.locator('#v-learn.on').count()) === 1 && (await p.locator('#segs .seg').count()) === 6, 'Learn opens with six segments', R);
  check((await text(p, '#chPickT')) === '1. Introductory concepts', 'the Learn bar names the chapter', R);
  // The chapter sheet puts each unit's name above its chapters, as both units number theirs from 1.
  await p.click('[data-act="chpick"]'); await p.waitForTimeout(150);
  check((await p.locator('#sheetBody .unit').allTextContents()).join('|') === 'Unit 1: Markets in action|Unit 2: Macroeconomic performance and policy' && (await p.locator('#sheetBody .picks').nth(1).locator('.pick').count()) === 6, 'the Learn chapter sheet lists each unit under its name', R);
  await p.click('#sheetClose'); await p.waitForTimeout(150);
  for (let i = 0; i < 6; i++) {
    const card = p.locator('#learnFeed .card:not(.endslide)').last();
    check((await card.locator('.ctitle').textContent()) === BANK[IDS[i]].title, 'card ' + (i + 1) + ' is ' + BANK[IDS[i]].title, R);
    check((await card.locator('.meta').textContent()) === 'Point ' + (i + 1) + ' of 6', 'card ' + (i + 1) + ' says Point ' + (i + 1) + ' of 6, with no Draft label', R);
    if (i === 0 && shots) await card.locator('.ctitle').waitFor();
    await card.locator('.next').click(); await p.waitForTimeout(60);
    await pick(p, '#learnFeed', i !== 3);
    const nb = p.locator('#learnFeed .slide.q.done .next').last();
    check((await nb.textContent()) === (i < 5 ? 'Next point' : 'Finish'), 'the button after check ' + (i + 1) + ' reads ' + (i < 5 ? 'Next point' : 'Finish'), R);
    await nb.click(); await p.waitForTimeout(60);
  }
  check((await text(p, '#learnFeed .endslide .ctitle')) === 'Chapter learned', 'the end slide says Chapter learned', R);
  check((await text(p, '#learnFeed .endslide .lede')).startsWith('5 of 6 checks right first time. 1 weak point'), 'it counts 5 of 6 and one weak point', R);
  check((await text(p, '#learnFeed .endslide .meta')).startsWith('Unit 1, chapter 1'), 'it names Unit 1, chapter 1', R);
  const next = p.locator('#learnFeed .endslide [data-act="learnch"]');
  check((await next.count()) === 1 && (await next.textContent()) === 'Go to Unit 1, chapter 2' && (await next.getAttribute('data-ch')) === 'x1c2', 'it offers Unit 1, chapter 2 next', R);
  let s = await saved(p);
  const mine = Object.keys(s.ans).filter(k => k.startsWith('e-'));
  check(mine.length === 6 && IDS.every(id => s.ans[id + 'a']) && s.ans['e-ppfa'].ok === false && s.ans['e-naturea'].ok === true, 'six answers are saved under the point ids, the fourth wrong', R);
  check(JSON.stringify(Object.fromEntries(Object.entries(s.ans).filter(([k]) => !k.startsWith('e-')))) === JSON.stringify(ECO), 'NSW Economics answers are exactly as they were', R);
  check(JSON.stringify(s.m.h) === JSON.stringify(MATHS.h) && s.m.cur === 'm1', 'Maths progress is exactly as it was', R);
  check(s.subject === 'edexcel' && s.c.edexcel.cur === 'x1c1' && s.cur === 'c1', 'the course keeps its own chapter, apart from NSW', R);

  await tab(p, 'home'); await p.waitForTimeout(150);
  check((await text(p, '.legend')).includes('6 of 6 learned') && (await text(p, '.hero .primary')) === 'Fix 1 weak point', 'Home shows 6 of 6 learned and one weak point', R);
  check((await text(p, '#v-home .ch:not(.soon) .stage')) === 'Learned, 0 of 6 proven', 'the chapter row says Learned, 0 of 6 proven', R);

  // ---------- 5. a Practice flight on Chapter 1 ----------
  await tab(p, 'practice');
  const st = await text(p, '#pracStart');
  check(st.includes('6 points') && st.includes('12 questions') && st.includes('Best altitude0 km'), 'the start screen counts 6 points, 12 questions, and the course has no best yet', R);
  await p.click('[data-act="start"]'); await p.waitForTimeout(700);
  check((await text(p, '#modeT')) === 'Mixed flight', 'a mixed flight starts', R);
  const first = await waiting(p, '#feed').locator('.qtext').textContent();
  check(first === BANK['e-ppf'].a.q, 'the weak question comes first', R);
  check((await waiting(p, '#feed').locator('.meta').textContent()).includes('Unit 1, chapter 1'), 'a flight question names Unit 1, chapter 1', R);
  for (let i = 0; i < 8; i++) { await pick(p, '#feed', true); await toLast(p, '#feed'); }
  check((await p.locator('#feed .summary').count()) === 1 && (await text(p, '#feed .summary')).includes('8 of 8'), 'the flight ends with 8 of 8 first try', R);
  s = await saved(p);
  check(s.c.edexcel.bestKm > 0 && s.c.edexcel.bestCombo === 8, 'the course keeps its own best altitude and combo', R);
  check(s.bestKm === undefined && s.bestCombo === undefined && s.m.bestKm === undefined, 'NSW and Maths records are untouched', R);
  check(s.ans['e-ppfa'].ok === true, 'the weak question is now right', R);

  // ---------- 6. switching back and forth keeps each subject's progress ----------
  await p.click('[data-act="home"]'); await p.waitForTimeout(200);
  await p.click('.subject'); await p.waitForTimeout(100);
  await p.click('.pick[data-sub="eco"]'); await p.waitForTimeout(200);
  check((await text(p, '.subject')) === 'Economics, Year 12' && (await p.locator('.cnote').count()) === 0, 'NSW Economics is back, with no Pearson line', R);
  const lab = await p.locator('.pt .lab').evaluateAll(els => els.slice(0, 2).map(e => e.textContent));
  check(lab[0] === 'Learned' && lab[1] === 'Weak', 'NSW statuses are as they were', R);
  await tab(p, 'practice');
  check((await text(p, '#pracStart')).includes('Best altitude0 km'), 'NSW Practice shows its own record, not the course\'s', R);
  await tab(p, 'home');
  await toEdexcel(p);
  check((await text(p, '#v-home .ch:not(.soon) .stage')) === 'Proven' && (await p.locator('#v-home .pt.is-weak').count()) === 0, 'the course\'s progress is still there: Chapter 1 is proven', R);
  check((await text(p, '.hero .h1')) === 'Consumer behaviour and demand' && (await text(p, '.hero .kicker')) === 'Unit 1, chapter 2 of 6', 'with Chapter 1 proven, Home moves on to Unit 1, chapter 2', R);
  await p.reload(); await p.waitForTimeout(300);
  check((await text(p, '.subject')) === NAME, 'after a reload the course is still picked', R);

  // ---------- 7. challenges work in the course; races stay on the other subjects ----------
  await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(120);
  await p.click('.thr[data-f="tom"]'); await p.waitForTimeout(120);
  await p.click('[data-act="pickch"][data-kind="challenge"]'); await p.waitForTimeout(100);
  check((await p.getAttribute('#sheetBody .subsw [aria-pressed="true"]', 'data-sub')) === 'edexcel' && (await p.locator('#sheetBody .subsw button').count()) === 3, 'the challenge sheet opens on the course, with all three courses on its switch', R);
  const games = await p.locator('#sheetBody [data-act="startwith"] .t').allTextContents();
  check(games.length === 12 && games[0].startsWith('1. Introductory concepts') && (await p.locator('#sheetBody h3.unit').count()) === 2, 'it lists the 12 course chapters under their units', R);
  check((await text(p, '#sheetBody .sub')).includes('You play up to 8 questions first'), 'and says a course challenge has up to 8 questions', R);
  await p.click('#sheetClose'); await p.waitForTimeout(100);
  await p.click('[data-act="pickch"][data-kind="race"]'); await p.waitForTimeout(100);
  check((await p.getAttribute('#sheetBody .subsw [aria-pressed="true"]', 'data-sub')) === 'eco' && (await p.locator('#sheetBody .subsw button').count()) === 2, 'the race sheet has only NSW Economics and Maths, and opens on NSW Economics', R);
  await p.click('#sheetClose'); await p.waitForTimeout(100);
  await p.click('[data-act="reply"][data-text="Rematch?"]'); await p.waitForTimeout(3600);
  s = await saved(p);
  const re = s.th.tom[s.th.tom.length - 1];
  check(re.kind === 'challenge' && /^x\dc\d$/.test(re.ch), 'a rematch with no game yet uses the course chapter Home shows', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 8. from the end of Unit 1 into Unit 2 ----------
{
  const {b, p, errs} = await open({seed: Object.assign({}, SEED, {subject: 'edexcel', c: {edexcel: {cur: 'x1c6'}}})});
  check((await text(p, '.hero .h1')) === 'Government intervention' && (await text(p, '.hero .kicker')) === 'Unit 1, chapter 6 of 6', 'Home opens on Unit 1, chapter 6', R);
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  const ids6 = EDEXCEL.units[0].chapters[5].points;
  for (let i = 0; i < ids6.length; i++) {
    await p.locator('#learnFeed .card:not(.endslide)').last().locator('.next').click(); await p.waitForTimeout(60);
    await pick(p, '#learnFeed', true);
    await p.locator('#learnFeed .slide.q.done .next').last().click(); await p.waitForTimeout(60);
  }
  const next = p.locator('#learnFeed .endslide [data-act="learnch"]');
  check((await next.textContent()) === 'Go to Unit 2, chapter 1' && (await next.getAttribute('data-ch')) === 'x2c1', 'the end of Unit 1 offers Unit 2, chapter 1', R);
  await next.click(); await p.waitForTimeout(200);
  const ids21 = EDEXCEL.units[1].chapters[0].points;
  check((await text(p, '#chPickT')) === '1. Measures of economic performance' && (await p.locator('#segs .seg').count()) === ids21.length, 'Learn opens Unit 2, chapter 1 with a segment for each of its 7 points', R);
  const card = p.locator('#learnFeed .card:not(.endslide)').last();
  check((await card.locator('.ctitle').textContent()) === BANK[ids21[0]].title && (await card.locator('.meta').textContent()) === 'Point 1 of 7', 'its first card is ' + BANK[ids21[0]].title + ', Point 1 of 7', R);
  await card.locator('.next').click(); await p.waitForTimeout(60);
  await pick(p, '#learnFeed', true);
  const s = await saved(p);
  check(s.ans[ids21[0] + 'a'] && s.ans[ids21[0] + 'a'].ok === true && s.c.edexcel.cur === 'x2c1', 'the answer is saved under the point id, and the course is now on Unit 2, chapter 1', R);
  await tab(p, 'practice');
  await p.click('[data-act="scope"][data-v="chapter"]'); await p.waitForTimeout(100);
  await p.click('[data-act="scopech"]'); await p.waitForTimeout(150);
  check((await p.locator('#sheetBody .unit').count()) === 2 && !(await p.locator('#sheetBody .picks').nth(1).locator('.pick').first().isDisabled()) && (await p.locator('#sheetBody .picks').nth(1).locator('.pick').nth(1).isDisabled()), 'the Practice chapter sheet lists both units, with Unit 2, chapter 1 open to pick', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 9. a chapter with no points is Coming soon ----------
// Every chapter has points now, so this opens the page with Unit 2, chapter 6 emptied, as a later unit would start.
{
  const route = ctx => ctx.route(/v2\.html/, async r => {
    const res = await r.fetch(), body = await res.text();
    const out = body.replace(/(id: 'x2c6', title: '[^']+', check: 'checked',\s*points: )\[[^\]]*\]/, '$1[]');
    await r.fulfill({response: res, body: out});
  });
  const {b, p, errs} = await open({seed: Object.assign({}, SEED, {subject: 'edexcel'}), route: route});
  const soon = p.locator('#v-home .ch.soon');
  check((await soon.count()) === 1 && (await soon.locator('.t').textContent()) === 'Macroeconomic objectives and policies' && (await soon.locator('.stage').textContent()) === 'Coming soon', 'an empty chapter shows as Coming soon', R);
  check((await soon.locator('.ch-head:disabled').count()) === 1, 'the Coming soon row is disabled', R);
  await soon.locator('.ch-head').click({force: true}); await p.waitForTimeout(100);
  check((await p.locator('#v-home .ch.soon.open, #v-home .ch.soon .pts').count()) === 0 && (await text(p, '.hero .h1')) === 'Introductory concepts', 'tapping a Coming soon chapter opens nothing', R);
  check((await p.locator('#v-home .ch:not(.soon)').count()) === 11, 'the other 11 chapters are ready', R);
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  await p.click('[data-act="chpick"]'); await p.waitForTimeout(150);
  check((await p.locator('#sheetBody .pick').count()) === 11, 'the Learn chapter sheet leaves the Coming soon chapter out', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 10. the Draft label still works ----------
// Every chapter is checked now, so this opens the page with Unit 1, chapter 1 marked draft again, as a later course's
// chapters would start.
{
  const route = ctx => ctx.route(/v2\.html/, async r => {
    const res = await r.fetch(), body = await res.text();
    await r.fulfill({response: res, body: body.replace("id: 'x1c1', title: 'Introductory concepts', check: 'checked'", "id: 'x1c1', title: 'Introductory concepts', check: 'draft'")});
  });
  const {b, p, errs} = await open({seed: Object.assign({}, SEED, {subject: 'edexcel'}), route: route});
  check((await text(p, '.hero .kicker')) === 'Unit 1, chapter 1 of 6 Draft', 'a chapter marked draft shows the Draft label on the hero', R);
  check((await p.locator('#v-home .ch-head .t .tag').count()) === 1 && (await p.locator('#v-home .ch-head .t').first().textContent()) === 'Introductory concepts Draft', 'and on its chapter row only', R);
  check((await p.locator('#v-home .fine').textContent()).includes('Chapters marked Draft have not been checked by a teacher yet.'), 'the note at the bottom of Home explains the label', R);
  await p.locator('#v-home .pt').first().click(); await p.waitForTimeout(150);
  check((await text(p, '#sheetBody')).includes('Draft This chapter has not been checked by a teacher yet.'), 'the point sheet says the chapter is a draft', R);
  await p.click('#sheetClose'); await p.waitForTimeout(150);
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  check((await p.locator('#learnFeed .card:not(.endslide)').last().locator('.meta').textContent()) === 'Point 1 of 6Draft', 'each Learn card says Draft', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 11. screenshots at 390 by 844, light and dark ----------
if (shots) for (const scheme of ['light', 'dark']) {
  const {b, p, errs} = await open({seed: Object.assign({}, SEED, {subject: 'edexcel'}), scheme: scheme, w: 390, h: 844});
  await shot(p, 'edexcel-home-' + scheme);
  await p.evaluate(() => { const v = document.querySelector('#v-home'); v.scrollTop = document.querySelector('#v-home .sec').offsetTop - 16; });
  await p.waitForTimeout(100);
  await shot(p, 'edexcel-chapters-' + scheme);
  await p.click('.hero .primary'); await p.waitForTimeout(300);
  await shot(p, 'edexcel-card-' + scheme);
  await p.click('[data-act="chpick"]'); await p.waitForTimeout(250);
  await shot(p, 'edexcel-picker-' + scheme);
  await p.click('#sheetBody [data-ch="x2c4"]'); await p.waitForTimeout(300);
  for (let i = 0; i < 3; i++) {
    await p.locator('#learnFeed .card:not(.endslide)').last().locator('.next').click(); await p.waitForTimeout(60);
    await pick(p, '#learnFeed', true);
    await p.locator('#learnFeed .slide.q.done .next').last().click(); await p.waitForTimeout(60);
  }
  await p.waitForTimeout(300);
  await shot(p, 'edexcel-unit2-card-' + scheme);
  errsAll.push(...errs); await b.close();
}

console.log(R.join('\n'));
console.log('errors:', errsAll.length ? errsAll : 'none');
if (errsAll.length) { console.log('ERRORS after', R.length, 'checks'); process.exitCode = 1; }
process.exit();
