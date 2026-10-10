// Maths in v2: the subject switch, Learn with the keypad, and the rule for proven. Opened at iPhone size with touch.
// Every answer is typed with keypad taps. The test reads each question from the screen and works out its answer with
// the Maths Lab's own solver, so it never looks at the answers the app stored.
import fs from 'fs';
import { open, saved, tab, check } from './lib.mjs';
const R = [];
const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8');
const LM = new Function(read('lab/maths.js') + '; return LabMaths;')();
const errsAll = [];

// Whatever has focus, looking inside MathLive's shadow DOM. It must never be something that opens the phone keyboard.
const focusSafe = p => p.evaluate(() => {
  let el = document.activeElement;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) el = el.shadowRoot.activeElement;
  if (!el) return true;
  const tag = el.tagName.toLowerCase(), typing = tag === 'input' || tag === 'textarea' || el.isContentEditable;
  return !typing || el.getAttribute('inputmode') === 'none';
});
let taps = 0, unsafe = 0;
async function tap(p, sel) {
  await p.locator(sel).last().tap();
  await p.waitForTimeout(25);
  taps++;
  if (!(await focusSafe(p))) unsafe++;
}
const NAME = {x: 't0', '±': 't1', or: 't2', '=': 'equals', '+': 'plus', '-': 'minus', '.': 'point', '>': 'right', F: 'frac', E: 'enter', D: 'delete'};
async function keys(p, seq) { for (const k of seq.split(' ')) if (k) await tap(p, '#mKeys .key[data-key="' + (NAME[k] || k) + '"]'); }
const WAIT = '#learnFeed .slide.mq:not(.done)';
const working = p => p.evaluate(() => document.querySelector('#app').dataset.work !== undefined);
const mathsLoaded = p => p.evaluate(() => !!window.MathfieldElement);

// The answer to the question on screen, as keypad taps: x = 4, x = -4, x = 5/2, or x = 7 or x = -7.
function exact(v) {
  for (let q = 1; q <= 12; q++) { const n = v * q; if (Math.abs(n - Math.round(n)) < 1e-7) return {n: Math.round(n), q: q}; }
  throw new Error('not a simple number: ' + v);
}
function numberKeys(v) {
  const {n, q} = exact(v), sign = n < 0 ? '- ' : '', top = String(Math.abs(n)).split('').join(' ');
  return q === 1 ? sign + top : sign + 'F ' + top + ' > ' + String(q).split('').join(' ') + ' >';
}
async function solveOnScreen(p) {
  const latex = await p.locator(WAIT + ' .mq-q math-span').textContent();
  const s = LM.solve(LM.read(latex));
  if (s.all || !s.some.length) throw new Error('could not solve ' + latex);
  return {latex: latex, xs: s.some.slice().sort((a, b) => b - a)};
}
async function answer(p, right) {
  const {latex, xs} = await solveOnScreen(p);
  const vals = right ? xs : [xs[0] + 1000];
  await keys(p, vals.map(v => 'x = ' + numberKeys(v)).join(' or '));
  await tap(p, '#mDone');
  await p.waitForTimeout(60);
  return latex;
}
// Finish the maths slide waiting now, then tap Next.
async function finishSlide(p, right) {
  const latex = await answer(p, right);
  if (!right) { await tap(p, WAIT + ' .mq-head .act'); await p.waitForTimeout(60); }
  const done = p.locator('#learnFeed .slide.mq.done').last();
  const end = await done.locator('.end').textContent();
  await tap(p, '#learnFeed .slide.mq.done .next');
  await p.waitForTimeout(80);
  return {latex: latex, end: end};
}
async function openMaths(o = {}) {
  const day = o.day || Date.parse('2026-10-05T10:00:00');
  const seed = Object.assign({subject: 'maths'}, o.seed || {});
  const r = await open({seed: seed, init: o.init});
  if (o.fixed !== false) await r.p.clock.setFixedTime(day);
  await r.p.waitForFunction(() => !!window.MathfieldElement && document.fonts.status === 'loaded');
  await r.p.waitForTimeout(150);
  return r;
}
const sheetText = p => p.locator('#sheetBody').textContent();
async function home(p) { if (await p.isVisible('#sheet')) await p.locator('#sheetClose').tap(); await tab(p, 'home'); }
async function pointSheet(p, pid) { await home(p); await p.locator('.pt[data-p="' + pid + '"]').tap(); await p.waitForTimeout(120); }

// ---------- 1. Economics stays as it was: no MathLive ----------
{
  const {b, p, errs} = await open();
  await tab(p, 'learn'); await tab(p, 'search'); await tab(p, 'home');
  const ml = await p.evaluate(() => performance.getEntriesByType('resource').filter(e => /mathlive/.test(e.name)).length);
  check(!(await mathsLoaded(p)) && ml === 0, 'Economics never loads MathLive', R);
  check((await p.locator('.subject').textContent()) === 'Economics, Year 12', 'Economics is the subject at first', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 2. switching subjects keeps each subject's progress apart ----------
{
  const eco = {c1p1a: {ok: true, n: 1, t: Date.parse('2026-10-01T09:00:00')}, c1p2a: {ok: false, n: 1, t: Date.parse('2026-10-01T09:01:00')}};
  const {b, p, errs} = await open({seed: {ans: eco, cur: 'c1'}});
  await p.locator('.subject').tap(); await p.waitForTimeout(100);
  const rows = await p.locator('#sheetBody .pick').allTextContents();
  check(rows.some(r => r.startsWith('EquationsMaths, Year 11')) && !rows.some(r => /^Maths.*Soon/.test(r)), 'the subject sheet offers Maths: Equations, Year 11', R);
  await p.locator('.pick[data-sub="maths"]').tap();
  await p.waitForFunction(() => !!window.MathfieldElement);
  await p.waitForTimeout(200);
  check((await p.locator('.subject').textContent()) === 'Maths, Year 11' && (await p.locator('.hero .h1').textContent()) === 'Linear equations', 'picking Maths switches Home to Linear equations', R);
  check((await p.locator('.legend').textContent()).includes('0 of 5 learned') && (await p.locator('.pt').count()) === 5, 'maths starts with nothing learned, five points in chapter 1', R);
  await tab(p, 'search');
  await p.fill('#q', 'brackets'); await p.waitForTimeout(80);
  check((await p.locator('#qOut .res .t').first().textContent()) === 'Brackets' && (await p.getAttribute('#q', 'placeholder')) === 'Search Equations', 'Search looks through maths', R);
  await tab(p, 'practice');
  const ps0 = await p.locator('#pracStart').textContent();
  check(ps0.includes('Learn your first point to start') && !ps0.includes('comes next'), 'maths Practice with nothing learned asks you to learn a point first', R);
  // Learn the first point, right.
  await tab(p, 'home');
  await p.locator('.hero .primary').tap(); await p.waitForTimeout(150);
  await tap(p, '#learnFeed .slide.wex .next'); await p.waitForTimeout(150);
  await finishSlide(p, true); await finishSlide(p, true);
  let s = await saved(p);
  check(JSON.stringify(s.ans) === JSON.stringify(eco), 'maths answers leave Economics progress exactly as it was', R);
  check(s.m && s.m.h && s.m.h.m1p1 && s.m.h.m1p1.length === 1 && s.m.h.m1p1[0].ok, 'maths progress is saved apart, under m', R);
  check(s.subject === 'maths', 'the subject is remembered', R);
  // Back to Economics.
  await tab(p, 'home');
  await p.locator('.subject').tap(); await p.waitForTimeout(80);
  await p.locator('.pick[data-sub="eco"]').tap(); await p.waitForTimeout(150);
  check((await p.locator('.hero .h1').textContent()) === 'International economic integration', 'switching back shows Economics', R);
  const st = await p.locator('.pt').evaluateAll(els => els.slice(0, 2).map(e => e.querySelector('.lab').textContent));
  check(st[0] === 'Learned' && st[1] === 'Weak', 'Economics statuses are as they were', R);
  check((await p.getAttribute('#q', 'placeholder')) === 'Search The Global Economy', 'Search is back on Economics', R);
  await p.reload(); await p.waitForTimeout(300);
  check((await p.locator('.subject').textContent()) === 'Economics, Year 12', 'after a reload the last subject picked is still picked', R);
  await p.locator('.subject').tap(); await p.waitForTimeout(80);
  await p.locator('.pick[data-sub="maths"]').tap(); await p.waitForTimeout(200);
  check((await p.locator('.pt[data-p="m1p1"] .lab').textContent()) === 'Learned', 'maths progress is still there after switching away and back', R);
  // The maths Practice tab now offers a maths flight, and stays on maths.
  await tab(p, 'practice');
  const ps1 = await p.locator('#pracStart').textContent();
  check((await saved(p)).subject === 'maths' && ps1.includes('Start flight') && ps1.includes('1 point') && !ps1.includes('comes next'), 'the maths Practice tab offers a maths flight on the point learned', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 3. a point goes new, learned, proven, then weak ----------
{
  const {b, p, errs} = await openMaths();
  await pointSheet(p, 'm1p2');
  check((await sheetText(p)).includes('New. Not started yet.') && (await sheetText(p)).includes('Proven means three right answers in a row on this point, each with different numbers. One right answer does not show you can do the type. A wrong answer makes the point weak and starts the count again.'), 'the point sheet says New and explains the rule for proven', R);
  check(await p.locator('#sheetBody .wsteps li').count() === 4, 'the point sheet shows the worked example', R);
  await p.locator('#sheetBody [data-act="learnpoint"]').tap(); await p.waitForTimeout(150);
  check(await p.locator('#learnFeed .slide.wex').count() === 1, 'a new point starts with its worked example', R);
  await tap(p, '#learnFeed .slide.wex .next'); await p.waitForTimeout(120);
  const g = await finishSlide(p, true), c1 = await finishSlide(p, true);
  check(g.end.startsWith('Right') && c1.end.startsWith('RightFirst try'), 'guided and check questions finish with Right', R);
  let s = await saved(p);
  check(s.m.h.m1p2.length === 1, 'only the check question counts, not the guided one', R);
  await pointSheet(p, 'm1p2');
  check((await sheetText(p)).includes('Learned. 1 right answer in a row so far.'), 'after one right answer the point is learned', R);
  const qs = [c1.latex];
  for (let n = 2; n <= 3; n++) {
    await p.locator('#sheetBody [data-act="learnpoint"]').tap(); await p.waitForTimeout(150);
    check(await p.locator('#learnFeed .slide.wex').count() === 0 && await p.locator('#learnFeed .slide.mq').count() === 1, 'checking a learned point again goes straight to a check question (' + n + ')', R);
    qs.push((await finishSlide(p, true)).latex);
    await pointSheet(p, 'm1p2');
    if (n === 2) check((await sheetText(p)).includes('Learned. 2 right answers in a row so far. Three in a row proves it.'), 'after two right answers the point is still learned', R);
  }
  check((await sheetText(p)).includes('Proven. Three right in a row, each with different numbers.'), 'three right in a row on the same day proves the point: there is no day rule', R);
  check(new Set(qs).size === qs.length, 'every check question had different numbers (' + qs.join(', ') + ')', R);
  s = await saved(p);
  check(s.m.h.m1p2.slice(-3).every(r => r.ok) && s.m.h.m1p2.every(r => r.q && r.day), 'the history keeps the result, the numbers and the day of each answer', R);
  await home(p);
  check((await p.locator('.legend').textContent()).includes('1 of 5 proven'), 'the chapter bar moves when a point is proven', R);
  // One wrong answer makes it weak.
  await pointSheet(p, 'm1p2');
  await p.locator('#sheetBody [data-act="learnpoint"]').tap(); await p.waitForTimeout(150);
  await answer(p, false);
  check((await p.locator(WAIT + ' .line.active .say').textContent()).includes('The point is marked weak'), 'a wrong answer on a check question says the point is marked weak', R);
  await tap(p, WAIT + ' .mq-head .act'); await p.waitForTimeout(80);
  check((await p.locator('#learnFeed .slide.mq.done .note').last().textContent()).includes('Worked solution'), 'Answer shows the worked solution', R);
  await pointSheet(p, 'm1p2');
  check((await sheetText(p)).startsWith('Weak.'), 'a wrong answer makes a proven point weak', R);
  await home(p);
  check((await p.locator('.weakrow').textContent()).includes('Brackets'), 'Home lists the weak point', R);
  // A weak point is taught again in full.
  await p.locator('.weakrow').tap(); await p.waitForTimeout(150);
  check(await p.locator('#learnFeed .slide.wex').count() === 1, 'fixing a weak point starts with its worked example again', R);
  // Answer on a check question before Done counts as wrong.
  await pointSheet(p, 'm1p1');
  await p.locator('#sheetBody [data-act="learnpoint"]').tap(); await p.waitForTimeout(150);
  await tap(p, '#learnFeed .slide.wex .next'); await p.waitForTimeout(120);
  await finishSlide(p, true);
  await tap(p, WAIT + ' .mq-head .act'); await p.waitForTimeout(80);
  s = await saved(p);
  check(s.m.h.m1p1.length === 1 && !s.m.h.m1p1[0].ok, 'Answer on a check question counts as wrong', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 4. Learn both chapters start to finish, keypad taps only ----------
{
  const {b, p, errs} = await openMaths();
  await p.locator('.hero .primary').tap(); await p.waitForTimeout(150);
  for (const [ci, n] of [[0, 5], [1, 2]]) {
    const ticks = {lines: 0}, seen = [];
    for (let i = 0; i < n; i++) {
      check((await p.locator('#learnFeed .slide.wex .ctitle').last().textContent()).length > 3, 'chapter ' + (ci + 1) + ', point ' + (i + 1) + ': the worked example shows', R);
      const ex = await p.locator('#learnFeed .slide.wex .wex-q math-span').last().textContent();
      check(!(await working(p)), 'the tab bar stays while reading the worked example', R);
      await tap(p, '#learnFeed .slide.wex .next'); await p.waitForTimeout(150);
      check(await working(p) && !(await p.isVisible('#tabs')) && await p.isVisible('#mPad'), 'the keypad replaces the tab bar on the guided question', R);
      const given = await p.locator(WAIT + ' .line.given').count();
      check(given >= 1, 'the guided question has its first lines written in (' + given + ')', R);
      if (i === 0) {
        // The written lines are locked: tapping one does not open it, and Delete on the first empty line keeps them.
        await p.locator(WAIT + ' .line.given').first().tap(); await p.waitForTimeout(40);
        await keys(p, 'D D');
        check(await p.locator(WAIT + ' .line.given').count() === given && await p.locator(WAIT + ' .line:not(.given)').count() === 1, 'the written lines cannot be changed or removed', R);
        const before = await p.evaluate(() => document.querySelector('#learnFeed').scrollTop);
        await p.mouse.wheel(0, 600); await p.waitForTimeout(150);
        check(await p.evaluate(() => document.querySelector('#learnFeed').scrollTop) === before, 'the cards do not move while working', R);
      }
      const g = await finishSlide(p, true);
      const c = await finishSlide(p, true);
      check(g.end.startsWith('Right') && c.end.startsWith('Right'), 'chapter ' + (ci + 1) + ', point ' + (i + 1) + ': guided and check done with the keypad (' + g.latex + ', then ' + c.latex + ')', R);
      check(new Set([ex, g.latex, c.latex]).size === 3, 'the guided and check questions have new numbers', R);
      seen.push(c.latex);
    }
    check((await p.locator('#learnFeed .endslide .ctitle').textContent()) === 'Chapter learned', 'chapter ' + (ci + 1) + ' ends with Chapter learned', R);
    const s = await saved(p);
    const ids = ci === 0 ? ['m1p1', 'm1p2', 'm1p3', 'm1p4', 'm1p5'] : ['m2p1', 'm2p2'];
    check(ids.every(id => s.m.h[id] && s.m.h[id].length === 1 && s.m.h[id][0].ok), 'chapter ' + (ci + 1) + ': every point has one right check answer', R);
    if (ci === 0) { await tap(p, '#learnFeed .endslide [data-act="learnch"]'); await p.waitForTimeout(150); }
  }
  await tab(p, 'home');
  check((await p.locator('.legend').textContent()).includes('2 of 2 learned') || (await p.locator('.legend').textContent()).includes('5 of 5 learned'), 'Home shows the chapter learned', R);
  check((await p.locator('.hero .primary').textContent()) === 'Prove this chapter', 'Home asks to prove the chapter next', R);
  errsAll.push(...errs); await b.close();
}
check(taps > 150 && unsafe === 0, 'focus never landed on anything that opens the phone keyboard (' + taps + ' taps checked)', R);

// ---------- 4b. chapter rows show learning and proving as stages ----------
{
  const today = '2026-10-05', P1 = ['m1p1', 'm1p2', 'm1p3', 'm1p4', 'm1p5'];
  const right = q => ({ok: true, day: today, q: q, t: Date.parse(today + 'T09:00:00')});
  const hist = (n, ids) => ({h: Object.fromEntries((ids || P1).map(id => [id, Array.from({length: n}, (_, i) => right(id + i))]))});
  const rows = async m => {
    const r = await openMaths({seed: {m: m}});
    const t = await r.p.locator('.ch-head .stage').allTextContents(), legend = await r.p.locator('.legend').textContent();
    errsAll.push(...r.errs); await r.b.close();
    return {t: t, legend: legend};
  };
  let v = await rows({h: {}});
  check(v.t[0] === 'Not started' && v.legend.includes('0 of 5 proven') && v.legend.includes('0 of 5 learned'), 'nothing done: Not started, and the bar reads 0 of 5 proven, 0 of 5 learned', R);
  v = await rows(hist(1, ['m1p1', 'm1p2', 'm1p3']));
  check(v.t[0] === '3 of 5 learned' && v.legend.includes('3 of 5 learned'), 'three of five learned: 3 of 5 learned, on the row and the bar', R);
  v = await rows(hist(1));
  check(v.t[0] === 'Learned, 0 of 5 proven' && v.t[1] === 'Not started', 'every point learned: Learned, 0 of 5 proven', R);
  const m = hist(1); m.h.m1p1 = hist(3).h.m1p1; m.h.m1p2 = hist(3).h.m1p2;
  v = await rows(m);
  check(v.t[0] === 'Learned, 2 of 5 proven' && v.legend.includes('2 of 5 proven'), 'two proven: Learned, 2 of 5 proven, on the row and the bar', R);
  v = await rows(hist(3));
  check(v.t[0] === 'Proven' && v.t[1] === 'Not started', 'every point proven: Proven (Home then moves on to chapter 2)', R);
  check(!v.t.concat([v.legend]).some(t => t.includes('%')), 'no percentage anywhere on the rows or the bar labels', R);
  // Economics rows use the same words.
  const ans = {};
  ['c1p1', 'c1p2', 'c1p3', 'c1p4', 'c1p5', 'c1p6', 'c1p7'].forEach((id, i) => { ans[id + 'a'] = {ok: true, n: 1, t: Date.now() - 1000 + i}; });
  const e = await open({seed: {ans: ans}});
  await e.p.waitForTimeout(150);
  const et = await e.p.locator('.ch-head .stage').allTextContents();
  check(et[0] === 'Learned, 0 of 7 proven' && et[1] === 'Not started' && (await e.p.locator('.legend').textContent()).includes('0 of 7 proven'), 'Economics: a learned chapter reads Learned, 0 of 7 proven, not 50%', R);
  errsAll.push(...e.errs); await e.b.close();
}

// ---------- 4c. proving a whole chapter in one sitting, straight after Learn ----------
{
  const {b, p, errs} = await openMaths();
  const status = s => ['m1p1', 'm1p2', 'm1p3', 'm1p4', 'm1p5'].map(id => {
    const h = (s.m.h[id] || []), last = h.slice(-3);
    return !h.length ? 'new' : !h[h.length - 1].ok ? 'weak' : (last.length === 3 && last.every(r => r.ok) && new Set(last.map(r => r.q)).size === 3) ? 'proven' : 'learned';
  });
  // Learn chapter 1.
  await p.locator('.hero .primary').tap(); await p.waitForTimeout(200);
  for (let k = 0; k < 30 && !(await p.locator('#learnFeed .endslide').count()); k++) {
    await p.waitForTimeout(300);                       /* the keypad comes up once the scroll has settled */
    if (await working(p)) await finishSlide(p, true);
    else { await tap(p, '#learnFeed .slide.wex .next'); await p.waitForTimeout(150); }
  }
  await home(p);
  check((await p.locator('.hero .primary').textContent()) === 'Prove this chapter', 'straight after Learn, Home offers Prove this chapter', R);
  await p.locator('.hero .primary').tap(); await p.waitForTimeout(200);
  // Answer every question right, except one wrong in the middle.
  const asked = [];
  let wrongAt = -1, wrongPoint = null;
  for (let k = 0; k < 40 && !(await p.locator('#learnFeed .endslide').count()); k++) {
    const title = await p.locator(WAIT + ' .meta span').nth(1).textContent();
    asked.push(title);
    const bad = k === 4;
    if (bad) { wrongAt = k; wrongPoint = title; }
    await finishSlide(p, !bad);
    if (bad) {
      const s = await saved(p);
      check(status(s).includes('weak'), 'a wrong answer mid-sitting makes that point weak', R);
      check(!(await p.locator('#learnFeed .endslide').count()) && await p.locator(WAIT).count() === 1, 'and the sitting carries on with the next question', R);
    }
  }
  const s = await saved(p);
  check(status(s).every(x => x === 'proven'), 'the sitting ran until every point in the chapter was proven (' + asked.length + ' questions)', R);
  check(asked.length === 4 * 2 + 1 + 3, 'four points needed two more right after Learn, and the missed point its wrong answer plus three right (' + asked.length + ' questions)', R);
  check(asked.slice(0, 5).length === new Set(asked.slice(0, 5)).size, 'the questions mix the points: the first five were five different points', R);
  check(asked.every((t, i) => i === 0 || t !== asked[i - 1] || asked.slice(i - 1).every(x => x === t)), 'never the same point twice in a row while another point is still to prove', R);
  const back = asked.indexOf(wrongPoint, wrongAt + 1);
  check(back > wrongAt + 1, 'the missed point came back later in the same sitting, after other points (' + (back - wrongAt) + ' questions later)', R);
  check((await p.locator('#learnFeed .endslide .ctitle').textContent()) === 'Chapter proven', 'the sitting ends with Chapter proven', R);
  check((await p.locator('#learnFeed .endslide .primary').textContent()) === 'Go to chapter 2', 'and offers the next chapter first', R);
  await home(p);
  check((await p.locator('.ch-head .stage').first().textContent()) === 'Proven', 'Home shows chapter 1 as Proven', R);
  check(!(await p.locator('#app').textContent()).match(/tomorrow|come back|another day/i), 'nothing on Home says to come back later', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 4d. the bar at the top of Learn fills as each question is finished ----------
{
  const {b, p, errs} = await openMaths();
  await p.locator('.hero .primary').tap(); await p.waitForTimeout(200);
  const segs = () => p.locator('#segs .seg').evaluateAll(els => els.map(e => e.className.replace('seg', '').trim() || '-'));
  let s = await segs();
  check(s.length === 10 && s.every(c => c === '-' || c === 'cur'), 'chapter 1 has one segment for each of its 10 questions, none filled yet (' + s.join(' ') + ')', R);
  await tap(p, '#learnFeed .slide.wex .next'); await p.waitForTimeout(150);
  check((await segs())[0] === 'cur', 'the segment for the question on screen is marked', R);
  await finishSlide(p, true);
  await p.waitForTimeout(300);
  s = await segs();
  check(s[0] === 'fin' && s[1] === 'cur', 'the guided question fills its segment when it is right, though the point is still new (' + s.join(' ') + ')', R);
  await finishSlide(p, false);
  await p.waitForTimeout(300);
  s = await segs();
  check(s[1] === 'miss', 'a check question answered wrong fills its segment in the weak-point colour', R);
  const look = await p.locator('#segs .seg.cur').evaluate(e => { const c = getComputedStyle(e); return {h: e.getBoundingClientRect().height, shadow: c.boxShadow, outline: c.outlineStyle}; }).catch(() => null);
  check(!look || (look.h <= 4 && look.shadow === 'none' && look.outline === 'none'), 'the current segment is a plain thin bar with no outline at any number of points', R);
  errsAll.push(...errs); await b.close();
  // Chapter 2 has two points: the same thin segments.
  const r = await openMaths({seed: {m: {cur: 'm2', h: {}}}});
  await r.p.locator('.hero .primary').tap(); await r.p.waitForTimeout(200);
  await r.p.locator('#learnFeed .slide.wex .next').last().tap(); await r.p.waitForTimeout(150);
  const cur = await r.p.locator('#segs .seg.cur').evaluate(e => { const c = getComputedStyle(e); return {h: e.getBoundingClientRect().height, shadow: c.boxShadow}; });
  check((await r.p.locator('#segs .seg').count()) === 4 && cur.h <= 4 && cur.shadow === 'none', 'a chapter with 2 points shows 4 thin segments, the current one with no outline', R);
  errsAll.push(...r.errs); await r.b.close();
}

// ---------- 5. a computer keyboard, small screens and dark mode ----------
{
  const {b, p, errs} = await openMaths();
  await p.locator('.hero .primary').click(); await p.waitForTimeout(150);
  await p.locator('#learnFeed .slide.wex .next').click(); await p.waitForTimeout(200);
  await p.keyboard.type('xa1');
  const v = await p.locator(WAIT + ' .line.active math-field').evaluate(m => m.value);
  check(v === 'x1' || v === 'xa1', 'typing on a maths slide goes into the line, not to the answer letters (' + v + ')', R);
  check(await p.locator('#learnFeed .slide.q').count() === 0, 'no Economics question appears in maths Learn', R);
  errsAll.push(...errs); await b.close();
}
for (const scheme of ['light', 'dark']) {
  const r = await open({seed: {subject: 'maths'}, w: 360, h: 640, scheme: scheme});
  const p = r.p;
  await p.waitForFunction(() => !!window.MathfieldElement);
  await p.locator('.hero .primary').tap(); await p.waitForTimeout(150);
  await p.locator('#learnFeed .slide.wex .next').tap(); await p.waitForTimeout(250);
  const wide = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth || [...document.querySelectorAll('.view.on, .slide')].some(e => e.scrollWidth > e.clientWidth + 1));
  check(!wide, scheme + ': nothing scrolls sideways at 360 px wide', R);
  const fits = await p.evaluate(() => { const k = document.querySelector('#mKeys').getBoundingClientRect(), a = document.querySelector('#app').getBoundingClientRect(); return k.bottom <= a.bottom + 1 && k.right <= a.right; });
  check(fits, scheme + ': the keypad fits on a 360 by 640 screen', R);
  errsAll.push(...r.errs); await r.b.close();
}

console.log(R.join('\n'));
if (errsAll.length) { console.log('ERRORS after maths tests:', errsAll); process.exitCode = 1; }
