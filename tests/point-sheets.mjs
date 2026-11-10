// Point sheets never scroll sideways: every point in the maths bank (the only bank with maths in its text) opened at
// 360 px wide, with every piece of maths drawn by MathLive, on three pages at once to keep it quick. Light and dark
// lay text out the same, so it runs in light. A piece of maths at the
// end of a line reaches 3 px past its words (math-span.mx in src/style.css), and a card line is a grid item that would
// grow to its widest piece of maths, so without the rule for point text the sheet scrolled sideways. The test also
// opens the page with that rule taken out, to show it would catch a sheet that scrolls.
// Run: node point-sheets.mjs
import { open, check } from './lib.mjs';
import { loadContent } from '../content/load.mjs';
const R = [], errsAll = [];
const C = loadContent(), MAT = C.MADE_BANKS.mat;
// Each maths point once, from the first course that lists it.
const byCourse = new Map(), seen = new Set();
for (const cr of C.MADE_COURSES) for (const u of cr.units) for (const ch of u.chapters) for (const id of ch.points) {
  if (!MAT[id] || seen.has(id)) continue;
  seen.add(id);
  if (!byCourse.has(cr.id)) byCourse.set(cr.id, []);
  byCourse.get(cr.id).push(id);
}
const RULE = /\.lines > p,\.rem,\.qtext,\.opt \.txt,\.note p,\.res \.snip\{min-width:0;overflow-x:clip\}/;
const noRule = ctx => ctx.route(/\/v2\.html/, async r => {
  const res = await r.fetch(), body = await res.text();
  if (!RULE.test(body)) throw new Error('the rule for point text is not in v2.html');
  await r.fulfill({response: res, body: body.replace(RULE, '')});
});

// Opens a course's points one at a time and gives the ones whose sheet scrolls sideways, with by how much.
async function wideSheets(p, cid, ids) {
  await p.evaluate(c => { localStorage.setItem('stratos2.v1', JSON.stringify({subject: c, picked: 1})); }, cid);
  await p.reload(); await p.waitForTimeout(300);
  const wide = [];
  for (const id of ids) {
    await p.evaluate(i => { const x = document.createElement('button'); x.dataset.act = 'point'; x.dataset.p = i; document.querySelector('#v-home').append(x); x.click(); x.remove(); }, id);
    // Wait until every piece of maths on the sheet is drawn, since a drawn piece has its real width.
    await p.waitForFunction(() => [...document.querySelectorAll('#sheetBody math-span')].every(m => m.shadowRoot && m.shadowRoot.querySelector('[part="render"]') && m.shadowRoot.querySelector('[part="render"]').innerHTML.length), null, {timeout: 10000}).catch(() => {});
    await p.waitForTimeout(40);
    const over = await p.evaluate(() => Math.max(...['#sheet .panel', '#sheetBody'].map(s => { const e = document.querySelector(s); return e.scrollWidth - e.clientWidth; }), document.scrollingElement.scrollWidth - innerWidth));
    if (over > 0) wide.push(id + ' (' + over + ' px)');
    await p.click('#sheetClose'); await p.waitForTimeout(60);
  }
  return wide;
}

{
  const groups = [[], [], []];
  [...byCourse].sort((a, b) => b[1].length - a[1].length).forEach(c => groups.reduce((m, g) => g.reduce((n, x) => n + x[1].length, 0) < m.reduce((n, x) => n + x[1].length, 0) ? g : m).push(c));
  const runs = await Promise.all(groups.map(async g => {
    const {b, p, errs} = await open({w: 360, h: 3000});
    const wide = [];
    for (const [cid, ids] of g) wide.push(...await wideSheets(p, cid, ids));
    await b.close();
    return {wide, errs, n: g.reduce((n, x) => n + x[1].length, 0)};
  }));
  const wide = runs.flatMap(r => r.wide), n = runs.reduce((k, r) => k + r.n, 0);
  runs.forEach(r => errsAll.push(...r.errs));
  check(n === Object.keys(MAT).length && !wide.length,
    'every maths point\'s sheet (' + n + ') stays inside 360 px, with its maths drawn' + (wide.length ? ': ' + wide.join(', ') : ''), R);
}

// Without the rule for point text, the test catches the sheets that scroll sideways.
{
  const {b, p, errs} = await open({w: 360, h: 3000, route: noRule});
  const wide = await wideSheets(p, 'nsw-mat-adv-12', ['mat-sigma-notation', 'mat-trapezoidal-rule', 'mat-compound-interest']);
  check(wide.length === 3, 'with the rule for point text taken out, the test finds sheets that scroll sideways (' + wide.join(', ') + ')', R);
  errsAll.push(...errs); await b.close();
}
check(!errsAll.length, 'no script errors' + (errsAll.length ? ': ' + errsAll.join(' | ') : ''), R);
console.log(R.join('\n'));
process.exit(process.exitCode || 0);
