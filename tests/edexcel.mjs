// The Edexcel International A Level Economics course in v2: picking it on the subject sheet, its own progress kept
// apart from NSW Economics and Maths, the six Unit 1 chapters with points, the six Unit 2 chapters that are Coming soon,
// the Draft label, Learn through Chapter 1,
// a Practice flight on it, and the friend sheet staying on the other subjects.
// Run: node edexcel.mjs. Pass "shots" to also save Home and a Chapter 1 card at 390 by 844, light and dark, to tests/shots/.
import { open, shot, tab, saved, pick, toLast, waiting, check, BANK, EDEXCEL } from './lib.mjs';
const R = [], errsAll = [], shots = process.argv[2] === 'shots';
const IDS = EDEXCEL.units[0].chapters[0].points, ALLIDS = EDEXCEL.units.flatMap(u => u.chapters.flatMap(c => c.points));
const NOTE = 'Covers Pearson Edexcel International A Level Economics. Not affiliated with or endorsed by Pearson.';
const NAME = 'Economics, International A Level (Edexcel)';
// Progress already made in the other two subjects, which this course must leave exactly as it is.
const ECO = {c1p1a: {ok: true, n: 1, t: Date.parse('2026-10-01T09:00:00')}, c1p2a: {ok: false, n: 1, t: Date.parse('2026-10-01T09:01:00')}};
const MATHS = {cur: 'm1', h: {m1p1: [{ok: true, day: '2026-10-01', q: 'a', t: 1}]}};
const SEED = {ans: ECO, cur: 'c1', m: MATHS};

async function toEdexcel(p) {
  await p.click('.subject'); await p.waitForTimeout(100);
  await p.click('.pick[data-sub="edexcel"]'); await p.waitForTimeout(200);
}
const text = (p, sel) => p.locator(sel).first().textContent();

// ---------- 1. the subject sheet, switching, and Home ----------
{
  const {b, p, errs} = await open({seed: SEED});
  check((await p.locator('.tag').count()) === 0, 'NSW Economics shows no Draft label', R);
  await p.click('.subject'); await p.waitForTimeout(100);
  const row = p.locator('.pick[data-sub="edexcel"]');
  check((await row.count()) === 1 && (await row.locator('.t').textContent()) === NAME + NOTE, 'the subject sheet has the course, with the Pearson line under its name', R);
  check((await row.locator('.v').textContent()) === 'Switch' && !(await row.isDisabled()), 'the course can be picked', R);
  await row.click(); await p.waitForTimeout(200);
  check((await text(p, '.subject')) === NAME, 'Home shows the course name', R);
  check((await text(p, '.cnote')) === NOTE, 'the Pearson line sits under the course name on Home', R);
  check((await text(p, '#toast')) === 'Switched to ' + NAME, 'a toast says which course is open', R);
  check((await text(p, '.hero .h1')) === 'Introductory concepts', 'Home opens on Unit 1, Chapter 1: Introductory concepts', R);
  check((await text(p, '.hero .kicker')) === 'Unit 1, chapter 1 of 6 Draft', 'the hero says Unit 1, chapter 1 of 6, with a Draft label', R);
  check((await text(p, '.legend')).includes('0 of 6 proven') && (await text(p, '.legend')).includes('0 of 6 learned'), 'the bar starts at 0 of 6', R);
  check((await text(p, '.hero .primary')) === 'Start this chapter', 'the button says Start this chapter', R);
  // Pearson is named only in the line under the course name. No logos: the page has no images of any kind for it.
  const pearson = await p.evaluate(() => { const t = document.querySelector('#v-home').innerText; return t.split('Pearson').length - 1; });
  check(pearson === 2, 'Home names Pearson only in the one line under the course name', R);

  // ---------- 2. the shape of the AS year: two units, 12 chapters, Unit 1 ready, Unit 2 Coming soon ----------
  const units = await p.locator('#v-home .unit').allTextContents();
  check(units.join('|') === 'Unit 1: Markets in action|Unit 2: Macroeconomic performance and policy', 'Home lists Unit 1 and Unit 2', R);
  const titles = await p.locator('#v-home .ch-head .t').allTextContents();
  const want = EDEXCEL.units.flatMap(u => u.chapters.map(c => c.title));
  check(titles.length === 12 && titles.map(t => t.replace(/ Draft$/, '')).join('|') === want.join('|'), 'all 12 chapters show, in order', R);
  const nums = await p.locator('#v-home .ch-head .n').allTextContents();
  check(nums.join('') === '123456123456', 'chapters are numbered within each unit', R);
  const soon = p.locator('#v-home .ch.soon');
  check((await soon.count()) === 6 && (await p.locator('#v-home .ch-list').nth(1).locator('.ch.soon').count()) === 6, 'the six Unit 2 chapters are Coming soon', R);
  const soonStages = await soon.locator('.stage').allTextContents();
  check(soonStages.every(s => s === 'Coming soon'), 'each says Coming soon', R);
  check((await soon.locator('.ch-head:disabled').count()) === 6, 'each Coming soon row is disabled', R);
  await soon.nth(0).locator('.ch-head').click({force: true}); await p.waitForTimeout(100);
  check((await p.locator('#v-home .ch.soon.open, #v-home .ch.soon .pts').count()) === 0 && (await text(p, '.hero .h1')) === 'Introductory concepts', 'tapping a Coming soon chapter opens nothing', R);
  const ready = p.locator('#v-home .ch:not(.soon)');
  check((await ready.count()) === 6 && (await p.locator('#v-home .ch-list').nth(0).locator('.ch:not(.soon)').count()) === 6, 'the six Unit 1 chapters are ready', R);
  check((await ready.locator('.ch-head .t .tag').allTextContents()).join('|') === 'Draft|Draft|Draft|Draft|Draft|Draft', 'each ready chapter is labelled Draft', R);
  check((await ready.locator('.stage').allTextContents()).every(s => s === 'Not started'), 'each ready chapter says Not started', R);
  // Open chapters 2 to 6 in turn: each lists its points from the bank, in order, then Chapter 1 opens again.
  const lists = [];
  for (let i = 1; i < 6; i++) {
    await ready.nth(i).locator('.ch-head').click(); await p.waitForTimeout(80);
    lists.push((await ready.nth(i).locator('.pt .t').allTextContents()).join('|') === EDEXCEL.units[0].chapters[i].points.map(id => BANK[id].title).join('|'));
  }
  check(lists.every(Boolean) && EDEXCEL.units[0].chapters.map(c => c.points.length).join('') === '652454', 'chapters 2 to 6 open to their 5, 2, 4, 5 and 4 points, in order', R);
  await ready.nth(0).locator('.ch-head').click(); await p.waitForTimeout(80);
  const ch1 = ready.first();
  check((await ch1.locator('.pt').count()) === 6 && (await ch1.locator('.pt .t').allTextContents()).join('|') === IDS.map(id => BANK[id].title).join('|'), 'Chapter 1 has its six points, in order', R);
  check((await ready.locator('.pt .lab').allTextContents()).every(s => s === 'New'), 'every point starts New', R);
  check((await p.locator('#v-home .fine').textContent()).includes('Unit 1 is a draft until a teacher has checked it. Unit 2 is coming soon.'), 'the note at the bottom of Home says Unit 1 is a draft and Unit 2 is coming soon', R);

  // The point sheet says the chapter is a draft.
  await ch1.locator('.pt').nth(2).click(); await p.waitForTimeout(150);
  const sh = await text(p, '#sheetBody');
  check((await text(p, '#sheetTitle')) === 'Scarcity' && sh.includes('Unit 1, chapter 1: Introductory concepts') && sh.includes('Draft This chapter has not been checked by a teacher yet.'), 'the point sheet names the chapter and says it is a draft', R);
  await p.click('#sheetClose'); await p.waitForTimeout(150);

  // ---------- 3. Search and Practice follow the course ----------
  await tab(p, 'search');
  check((await p.getAttribute('#q', 'placeholder')) === 'Search AS Economics', 'Search looks through AS Economics', R);
  await p.fill('#q', 'opportunity'); await p.waitForTimeout(80);
  const hits = await p.locator('#qOut .res .t').allTextContents();
  check(hits.includes('Scarcity') && hits.every(h => ALLIDS.some(id => BANK[id].title === h)), 'Search finds Scarcity and only this course\'s points', R);
  check((await text(p, '#qOut .res .c')).startsWith('Unit 1, chapter 1'), 'a search result names Unit 1, chapter 1', R);
  await p.fill('#q', 'tariff'); await p.waitForTimeout(80);
  check((await text(p, '#qOut')).startsWith('Nothing in this topic matches'), 'NSW points are not found', R);
  await tab(p, 'practice');
  check((await text(p, '#pracStart')).includes('Learn your first point'), 'Practice asks you to learn a point first', R);

  // ---------- 4. Learn through Chapter 1: six cards, the fourth answered wrong ----------
  await tab(p, 'home');
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  check((await p.locator('#v-learn.on').count()) === 1 && (await p.locator('#segs .seg').count()) === 6, 'Learn opens with six segments', R);
  check((await text(p, '#chPickT')) === '1. Introductory concepts', 'the Learn bar names the chapter', R);
  for (let i = 0; i < 6; i++) {
    const card = p.locator('#learnFeed .card:not(.endslide)').last();
    check((await card.locator('.ctitle').textContent()) === BANK[IDS[i]].title, 'card ' + (i + 1) + ' is ' + BANK[IDS[i]].title, R);
    check((await card.locator('.meta').textContent()) === 'Point ' + (i + 1) + ' of 6Draft', 'card ' + (i + 1) + ' says Point ' + (i + 1) + ' of 6, Draft', R);
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
  check((await text(p, '.hero .h1')) === 'Consumer behaviour and demand' && (await text(p, '.hero .kicker')) === 'Unit 1, chapter 2 of 6 Draft', 'with Chapter 1 proven, Home moves on to Unit 1, chapter 2', R);
  await p.reload(); await p.waitForTimeout(300);
  check((await text(p, '.subject')) === NAME, 'after a reload the course is still picked', R);

  // ---------- 7. challenges and races stay on the other subjects ----------
  await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(120);
  await p.click('.thr[data-f="tom"]'); await p.waitForTimeout(120);
  await p.click('[data-act="pickch"][data-kind="challenge"]'); await p.waitForTimeout(100);
  check((await p.getAttribute('#sheetBody .subsw [aria-pressed="true"]', 'data-sub')) === 'eco', 'the friend sheet opens on NSW Economics', R);
  const games = await p.locator('#sheetBody [data-act="startwith"] .t').allTextContents();
  check(games.length === 4 && !games.some(g => g.includes('Introductory concepts')), 'it lists the NSW chapters only', R);
  await p.click('#sheetClose'); await p.waitForTimeout(100);
  await p.click('[data-act="reply"][data-text="Rematch?"]'); await p.waitForTimeout(3600);
  s = await saved(p);
  const re = s.th.tom[s.th.tom.length - 1];
  check(re.kind === 'challenge' && /^c\d$/.test(re.ch), 'a rematch with no game yet uses an NSW chapter', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 8. screenshots at 390 by 844, light and dark ----------
if (shots) for (const scheme of ['light', 'dark']) {
  const {b, p, errs} = await open({seed: Object.assign({}, SEED, {subject: 'edexcel'}), scheme: scheme, w: 390, h: 844});
  await shot(p, 'edexcel-home-' + scheme);
  await p.evaluate(() => { const v = document.querySelector('#v-home'); v.scrollTop = document.querySelector('#v-home .sec').offsetTop - 16; });
  await p.waitForTimeout(100);
  await shot(p, 'edexcel-chapters-' + scheme);
  await p.click('.hero .primary'); await p.waitForTimeout(300);
  await shot(p, 'edexcel-card-' + scheme);
  errsAll.push(...errs); await b.close();
}

console.log(R.join('\n'));
console.log('errors:', errsAll.length ? errsAll : 'none');
if (errsAll.length) { console.log('ERRORS after', R.length, 'checks'); process.exitCode = 1; }
process.exit();
