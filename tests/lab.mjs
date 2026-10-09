// Maths Lab: browser tests. They open maths-lab.html through a small local web server, at iPhone size, with touch.
// Every key press is a tap on the keypad, as on a phone. A computer keyboard is tested separately at the end.
import { chromium } from 'playwright';
import fs from 'fs';
import { serve } from './serve.mjs';
const EXE = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const results = [];
const check = (ok, what) => { results.push((ok ? 'ok   ' : 'FAIL ') + what); if (!ok) process.exitCode = 1; };
const server = await serve();
const browser = await chromium.launch(EXE ? {executablePath: EXE} : {});
const errs = [];

async function open(o = {}) {
  const ctx = await browser.newContext({viewport: {width: o.w || 390, height: o.h || 844}, deviceScaleFactor: 1, hasTouch: !o.desk, isMobile: !o.desk, colorScheme: o.scheme || 'light', reducedMotion: 'reduce'});
  if (o.seed) await ctx.addInitScript(s => { if (!sessionStorage.getItem('seeded')) { localStorage.setItem('stratos-lab.v1', JSON.stringify(s)); sessionStorage.setItem('seeded', '1'); } }, o.seed);
  const p = await ctx.newPage();
  p.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await p.goto(server.url + 'maths-lab.html');
  await p.waitForFunction(() => document.fonts && document.fonts.status === 'loaded');
  await p.waitForTimeout(150);
  return {ctx, p};
}
// Whatever has focus, looking inside MathLive's shadow DOM. It must never be something that opens the phone keyboard.
const focusSafe = p => p.evaluate(() => {
  let el = document.activeElement;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) el = el.shadowRoot.activeElement;
  if (!el) return true;
  const tag = el.tagName.toLowerCase(), typing = tag === 'input' || tag === 'textarea' || el.isContentEditable;
  return !typing || el.getAttribute('inputmode') === 'none';
});
let focusChecks = 0, focusBad = 0;
async function tap(p, sel) {
  await p.tap(sel);
  await p.waitForTimeout(15);
  focusChecks++;
  if (!(await focusSafe(p))) { focusBad++; if (focusBad < 4) console.log('unsafe focus after tapping ' + sel); }
}
const key = (p, k) => tap(p, '.key[data-key="' + k + '"]');
// Keys by what they type. x, ± and "or" are the topic's keys t0, t1, t2.
const NAME = {x: 't0', '±': 't1', or: 't2', '=': 'equals', '+': 'plus', '-': 'minus', '*': 'times', '/': 'divide', '.': 'point', '>': 'right', '<': 'left', F: 'frac', R: 'sqrt', S: 'square', P: 'power', B: 'brackets', E: 'enter', D: 'delete', U: 'undo'};
async function type(p, keys) { for (const k of keys.split(' ')) if (k) await key(p, NAME[k] || k); }
// Hold a key down with a real touch, for long presses.
async function hold(p, sel, ms) {
  const box = await p.locator(sel).boundingBox(), cdp = await p.context().newCDPSession(p);
  const pt = {x: box.x + box.width / 2, y: box.y + box.height / 2};
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [pt]});
  await p.waitForTimeout(ms);
  await cdp.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  await p.waitForTimeout(40);
}
const lines = p => p.$$eval('.line', ls => ls.map(l => ({v: l.querySelector('math-field').value, cls: l.className, say: l.querySelector('.say').textContent})));
const active = p => p.$eval('.line.active math-field', m => m.value).catch(() => null);
const calcText = p => p.$eval('#calc', b => b.disabled ? (b.classList.contains('err') ? 'error' : '') : b.getAttribute('aria-label'));
const saved = p => p.evaluate(() => JSON.parse(localStorage.getItem('stratos-lab.v1') || '{}'));
const qText = p => p.textContent('#qnum');

// ---------- 1. all ten questions, keypad taps only ----------
// Each question's working, line by line. E is Enter. The last line is left for Done.
const WORK = [
  ['3 x = 1 2 E', 'x = 4'],
  ['- 2 x = 8 E', 'x = - 4'],
  ['4 x - 1 2 = 2 0 E', '4 x = 3 2 E', 'x = 8'],
  ['3 x = 1 5 E', 'x = 5'],
  ['F x > 3 > = 4 E', 'x = 1 2'],
  ['2 x + 3 = 1 5 E', '2 x = 1 2 E', 'x = 6'],
  ['4 x = 1 0 E', 'x = F 5 > 2'],
  ['2 . 4 x = 7 . 2 E', 'x = 3'],
  ['x S = 4 9 E', 'x = ± 7'],
  ['B x - 1 > S = 1 6 E', 'x - 1 = ± 4 E', 'x = 5 or x = - 3']
];
{
  const {ctx, p} = await open();
  check(await p.isVisible('#intro'), 'the start screen shows first');
  check(await p.$$eval('input, textarea, [contenteditable="true"]', els => els.length) === 0, 'the page has no text boxes of its own');
  await tap(p, '#start');
  check(await p.isVisible('#lab') && (await qText(p)).startsWith('Question 1 of 10'), 'Start opens question 1');
  let ticks = 0, wrongs = 0, allDone = true;
  for (let i = 0; i < WORK.length; i++) {
    for (const l of WORK[i]) await type(p, l);
    const ls = await lines(p);
    ticks += ls.filter(l => l.cls.includes('right')).length;
    wrongs += ls.filter(l => l.cls.includes('wrong')).length;
    await tap(p, '#done');
    await p.waitForTimeout(30);
    const end = await p.textContent('.end').catch(() => '');
    if (!end.startsWith('Right')) { allDone = false; console.log('question ' + (i + 1) + ' not accepted', JSON.stringify(ls), await p.textContent('.line:last-child .say')); }
    if (i < 9) { check(await p.textContent('#done') === 'Next question', 'question ' + (i + 1) + ': Done turns into Next question'); await tap(p, '#done'); }
  }
  check(allDone, 'all ten questions solved start to finish with keypad taps only');
  check(ticks === WORK.reduce((n, w) => n + w.length - 1, 0) && wrongs === 0, 'every working line ticked (' + ticks + ' ticks, ' + wrongs + ' wrong)');
  check(await p.textContent('#done') === 'See results', 'the last question offers the results');
  await tap(p, '#done');
  check(await p.isVisible('#results'), 'the results show after question 10');
  const s = await saved(p);
  check(s.run && s.run.complete && s.run.per.length === 10 && s.run.per.every(q => q.ms > 0 && q.lines >= 2 && !q.skipped), 'results are saved on the device for all ten questions');
  check((await p.$$('.qrow')).length === 10, 'the summary lists each question');
  const stats = await p.$$eval('.stats6 dt', d => d.map(x => x.textContent));
  check(['Time', 'Lines', 'Wrong lines', 'Deletes', 'Undos', 'Skips'].every(k => stats.includes(k)), 'the summary shows time, lines, wrong lines, deletes, undos and skips');
  check(s.past && s.past.length === 1, 'the finished run is kept');
  // Copy
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], {origin: server.url.replace(/\/$/, '')});
  await tap(p, '#copy');
  await p.waitForTimeout(100);
  const clip = await p.evaluate(() => navigator.clipboard.readText()).catch(e => 'ERR ' + e.message);
  check(/^Stratos Maths Lab results/.test(clip) && clip.split('\n').length === 13 && clip.includes('10. (x − 1)² = 16:'), 'Copy results puts the summary on the clipboard as text');
  check((await p.textContent('#toast')) === 'Copied', 'Copy says Copied');
  await tap(p, '#again');
  check(await p.isVisible('#intro'), 'Start again goes back to the start screen');
  await ctx.close();
}
check(focusChecks > 120 && focusBad === 0, 'focus never landed on anything that opens the phone keyboard (' + focusChecks + ' taps checked)');

// ---------- 2. lines: ticks, marks, Enter, long press, delete, undo, the display ----------
{
  const {ctx, p} = await open();
  await tap(p, '#start');
  await type(p, '3 x = 1 3 E');
  await type(p, '3 x = 1 2 E');
  await type(p, 'x = 4 E');
  let ls = await lines(p);
  check(ls[0].cls.includes('wrong') && ls[0].say === 'This line changes the answer.', 'a wrong line is marked with one plain sentence');
  check(ls[1].cls.includes('right') && ls[2].cls.includes('right'), 'one wrong line does not mark later right lines');
  check(await p.$eval('.line.wrong .mk i', i => { const t = document.createElement('i'); t.style.color = 'var(--warn-dot)'; document.body.append(t); const want = getComputedStyle(t).color; t.remove(); return getComputedStyle(i).backgroundColor === want; }), 'the wrong mark uses the weak-point colour');
  const n = ls.length;
  await key(p, 'enter');
  check((await lines(p)).length === n && (await active(p)) === '', 'Enter on an empty line does nothing');
  // Tap the wrong line, fix it, check it again.
  await tap(p, '.line:nth-child(1)');
  check(await p.$eval('.line:nth-child(1)', l => l.classList.contains('active')), 'tapping a line makes it the one being written');
  await type(p, 'D 2 E');
  ls = await lines(p);
  check(ls[0].v === '3x=12' && ls[0].cls.includes('right'), 'a fixed line ticks when Enter checks it again');
  check((await active(p)) === '' && (await lines(p)).length === n, 'Enter on an earlier line goes back to the empty line at the bottom');
  // Long press Enter copies the line.
  await type(p, '4 x = 1 6');
  await hold(p, '.key[data-key="enter"]', 650);
  ls = await lines(p);
  check(ls.length === n + 1 && ls[n - 1].v === '4x=16' && ls[n - 1].cls.includes('right') && ls[n].v === '4x=16' && ls[n].cls.includes('active'), 'holding Enter checks the line and starts the next as a copy');
  // Delete, hold delete, undo.
  await key(p, 'delete');
  check((await active(p)) === '4x=1', 'Delete removes one thing');
  await hold(p, '.key[data-key="delete"]', 650);
  check((await active(p)) === '', 'holding Delete clears the line');
  await key(p, 'undo');
  check((await active(p)) === '4x=1', 'one Undo brings the cleared line back');
  await type(p, 'U');
  check((await active(p)) === '4x=16', 'Undo steps back through edits');
  await p.waitForTimeout(700);
  const st = (await saved(p)).run;
  check(st && st.per[0].deletes === 3 && st.per[0].undos === 2 && st.per[0].wrong === 1, 'deletes, undos and wrong lines are counted (' + JSON.stringify(st && st.per[0]) + ')');
  await hold(p, '.key[data-key="delete"]', 650);
  // A line with no = sign gets a hint, not a mark.
  await type(p, '3 x + 5 E');
  ls = await lines(p);
  const hint = ls[ls.length - 2];
  check(hint.cls.includes('hint') && !hint.cls.includes('wrong') && hint.say === 'A working line needs an = sign.', 'a line with no = sign gets a hint, not a wrong mark');
  // The display.
  await type(p, '3 x = 1 7 - 5');
  check((await calcText(p)) === 'Use 12', 'the display works out 17 − 5');
  await tap(p, '#calc');
  check((await active(p)) === '3x=12', 'tapping the display puts the value in place of the arithmetic');
  check((await calcText(p)) === '', 'the display is empty once the line has a plain number');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, '3 x + 5');
  check((await calcText(p)) === '', 'the display shows nothing for 3x + 5');
  await type(p, '= x + 2');
  check((await calcText(p)) === '', 'the display shows nothing when x comes after the last = sign');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, '1 / 0');
  check((await calcText(p)) === 'error', 'dividing by 0 shows Math error');
  await hold(p, '.key[data-key="delete"]', 650);
  // Shapes: fraction, root, square and power drop empty boxes with the cursor in the first.
  await type(p, 'F 1 > 2 >');
  check((await active(p)) === '\\frac12', 'the fraction key drops a fraction and > moves from box to box');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'S');
  check(/^\\placeholder\{\}\^\{?2\}?$/.test(await active(p)), 'square on an empty line drops an empty box');
  await type(p, '3');
  check(/^3\^\{?2\}?$/.test(await active(p)), 'the cursor goes into that box first');
  await type(p, '> > > +');
  check(/^3\^\{?2\}?\+$/.test(await active(p)), 'the right arrow steps through the power and out of it');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'x P 3');
  check(/^x\^\{?3\}?$/.test(await active(p)), 'power goes on what is before the cursor');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'R 4 9');
  check((await calcText(p)) === 'Use 7', 'the root key works and the display works it out');
  await hold(p, '.key[data-key="delete"]', 650);
  // Arrows and the strip move the cursor.
  await type(p, 'x = 4 < < 3');
  check((await active(p)) === 'x3=4', 'the left arrow moves the cursor');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, '1 2 3 4');
  {
    const box = await p.locator('#strip').boundingBox(), cdp = await ctx.newCDPSession(p), y = box.y + box.height / 2;
    await cdp.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x: box.x + 200, y}]});
    for (let k = 1; k <= 4; k++) { await cdp.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: [{x: box.x + 200 - k * 7.5, y}]}); await p.waitForTimeout(10); }
    await cdp.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  }
  await type(p, '0');
  check((await active(p)) === '12034', 'dragging along the strip moves the cursor');
  check(await focusSafe(p), 'focus is still safe after dragging the strip');
  await ctx.close();
}

// ---------- 3. Done and Skip ----------
{
  const {ctx, p} = await open({seed: {sound: true, run: {topic: 'equations', at: Date.now(), qi: 8, per: [], sheet: null, state: 'open'}}});
  check((await qText(p)).startsWith('Question 9 of 10'), 'a saved run carries on at its question');
  await type(p, 'x = 7');
  await tap(p, '#done');
  check(await p.textContent('.line.active .say') === 'There is a second answer.' && !(await p.$('.end')), 'Done rejects a missing second answer');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'x = 6');
  await tap(p, '#done');
  check(await p.textContent('.line.active .say') === 'This isn’t the answer.' && !(await p.$('.end')), 'Done rejects a wrong answer');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'x S = 4 9');
  await tap(p, '#done');
  check(await p.textContent('.line.active .say') === 'Finish with x on its own, like x = 4.', 'Done asks for x on its own');
  await type(p, 'E x = 7 or x = - 7');
  await tap(p, '#done');
  check((await p.textContent('.end')).startsWith('Right'), 'Done accepts x = 7 or x = −7');
  // Reload in the middle of a question: the lines come back.
  await tap(p, '#done');
  await type(p, 'x - 1 = ± 4 E');
  await p.waitForTimeout(700);
  await p.reload(); await p.waitForTimeout(400);
  const ls = await lines(p);
  check((await qText(p)).startsWith('Question 10 of 10') && ls[0].v === 'x-1=\\pm4' && ls[0].cls.includes('right'), 'after a reload the question and its lines come back');
  await tap(p, '#skip');
  await p.waitForTimeout(700);
  check((await p.textContent('.end')).startsWith('Answer') && await p.$eval('.end math-span', m => m.textContent.includes('5')), 'Skip shows the answer');
  check(!(await p.isVisible('#skip')), 'Skip hides once the question is over');
  const st = (await saved(p)).run;
  check(st.per[9].skipped === true && st.per[8].tries === 4, 'skips and Done tries are saved');
  await tap(p, '#done');
  check(await p.isVisible('#results') && (await p.textContent('#results')).includes('Skipped.'), 'the summary marks the skipped question');
  await ctx.close();
}

// ---------- 4. a computer keyboard ----------
{
  const {ctx, p} = await open({desk: true, w: 1280, h: 800});
  await p.click('#start');
  await p.keyboard.type('3x=12');
  await p.keyboard.press('Enter');
  let ls = await lines(p);
  check(ls[0].v === '3x=12' && ls[0].cls.includes('right') && ls.length === 2, 'typing on a computer keyboard works, and Enter checks the line');
  await p.keyboard.type('x=4');
  await p.keyboard.press('Shift+Enter');
  ls = await lines(p);
  check(ls.length === 3 && ls[2].v === 'x=4', 'Shift and Enter copies the line down');
  await p.keyboard.press('Control+Enter');
  check((await p.textContent('.end')).startsWith('Right'), 'Control and Enter is Done');
  await ctx.close();
}

// ---------- 6. fixes from the first tests on a phone ----------
{
  const {ctx, p} = await open();
  await tap(p, '#start');
  // Bug 1: Delete on an empty line removes it and goes to the end of the line above. The first line stays.
  await key(p, 'delete');
  check((await lines(p)).length === 1, 'Delete on an empty first line keeps it');
  await type(p, '3 x = 1 2 E');
  check((await lines(p)).length === 2, 'Enter opened a second line');
  await key(p, 'delete');
  let ls = await lines(p);
  const atEnd = await p.$eval('.line.active math-field', m => m.position === m.lastOffset);
  check(ls.length === 1 && ls[0].cls.includes('active') && atEnd, 'Delete on an empty line removes it and puts the cursor at the end of the line above');
  await key(p, 'delete');
  check((await active(p)) === '3x=1', 'the next Delete works on the line above');
  await type(p, '2 E');
  await hold(p, '.key[data-key="delete"]', 650);
  check((await lines(p)).length === 1 && (await active(p)) === '3x=12', 'holding Delete on an empty line removes only that line');
  await hold(p, '.key[data-key="delete"]', 650);
  // Bug 4: = steps out of a power or fraction, and a box from square or power takes the next number.
  await type(p, '7 P 2 = 4 9');
  check((await active(p)) === '7^2=49', '= steps out of a power first (7, power, 2, = 49 gives 7² = 49)');
  await type(p, 'E');
  ls = await lines(p);
  check(ls[ls.length - 2].say === 'This line has no x in it.', '7² = 49 says it has no x in it');
  await type(p, 'F x > 3 = 4');
  check((await active(p)) === '\\frac{x}{3}=4', '= steps out of a fraction first');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'S 7 = 4 9');
  check((await active(p)) === '7^2=49', 'square on an empty line, then 7 = 49, gives 7² = 49');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'S 1 2 + 1');
  check((await active(p)) === '12^2+1', 'the box takes a whole number, then the next key goes after the square');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'S x >');
  await type(p, '=');
  check((await active(p)) === 'x^2=', 'the right arrow leaves the square in one press');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'S 1 2 D D D 5 = 4 9');
  check((await active(p)) === '5=49', 'Delete in the box takes back the numbers, then the empty box, then the square');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'S 7 U 8 = 6 4');
  check((await active(p)) === '8^2=64', 'Undo in the box brings the empty box back, ready to fill');
  await hold(p, '.key[data-key="delete"]', 650);
  await type(p, 'P 7 > 3 = 4 9');
  check(/^7\^\{?3\}?=49$/.test(await active(p)), 'power on an empty line: base, then the right arrow into the power, then = steps out');
  await hold(p, '.key[data-key="delete"]', 650);
  // Bug 3: an empty box left in a line is named, so a line that looks finished says why it is not.
  await type(p, 'P 7 S = 4 9 E');
  ls = await lines(p);
  const boxed = ls[ls.length - 2];
  check(boxed.v.includes('\\placeholder') && boxed.say === 'This line has an empty box. Fill it in or delete it.', 'a line with an empty box left in it says so (' + boxed.v + ')');
  // Bug 5: a line that keeps one answer and drops the other.
  await ctx.close();
}
{
  const {ctx, p} = await open({seed: {sound: true, run: {topic: 'equations', at: Date.now(), qi: 8, per: [], sheet: null, state: 'open'}}});
  await type(p, 'x = 7 E');
  check((await lines(p))[0].say === 'This works, but there is another answer.', 'a line that drops one of two answers says: This works, but there is another answer.');
  await ctx.close();
}
{
  // Bugs 1 and 2 on a computer keyboard.
  const {ctx, p} = await open({desk: true, w: 1280, h: 800});
  await p.click('#start');
  await p.keyboard.type('x=7');
  await p.keyboard.press('Enter');
  await p.keyboard.type('x=+-7');
  check((await active(p)) === 'x=\\pm7', '+ then − typed straight after Enter makes ±');
  await p.keyboard.press('Enter');
  for (const d of [0, 15, 80]) {
    await p.keyboard.type('x=+-7', {delay: d});
    check((await active(p)) === 'x=\\pm7', '+ then − makes ± at ' + d + ' ms between keys');
    for (let i = 0; i < 4; i++) await p.keyboard.press('Backspace');   // x, =, ± and 7
  }
  await p.keyboard.type('x=7or');
  check((await active(p)) === 'x=7\\or', 'o then r makes the word or');
  for (let i = 0; i < 4; i++) await p.keyboard.press('Backspace');   // x, =, 7 and or
  const n = (await lines(p)).length;
  await p.keyboard.press('Backspace');
  await p.waitForTimeout(150);
  check((await lines(p)).length === n - 1 && (await active(p)) === 'x=\\pm7', 'Backspace on an empty line removes it and goes to the line above');
  await ctx.close();
}
{
  // Some browsers (Safari) run a listener on the line itself only after MathLive has handled the key. This copies that:
  // a listener on the page stops Backspace and Enter before they reach the line. The lab must still get them first.
  const {ctx, p} = await open({desk: true, w: 1280, h: 800});
  await p.evaluate(() => document.addEventListener('keydown', ev => { if (ev.key === 'Backspace' || ev.key === 'Enter') ev.stopPropagation(); }, true));
  await p.click('#start');
  await p.keyboard.type('3x=12');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(150);
  check((await lines(p)).length === 2, 'Enter on a computer keyboard opens a new line in any browser');
  await p.keyboard.press('Backspace');
  await p.waitForTimeout(150);
  check((await lines(p)).length === 1 && (await active(p)) === '3x=12', 'Backspace on a computer keyboard removes an empty line in any browser');
  await p.keyboard.press('Backspace');
  check((await active(p)) === '3x=1', 'the next Backspace deletes in the line above');
  await ctx.close();
}

// ---------- 5. looks: tokens, widths, dark mode, sound ----------
{
  const css = fs.readFileSync(new URL('../lab/lab.css', import.meta.url), 'utf8'), v2 = fs.readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
  const block = s => s.slice(s.indexOf(':root{'), s.indexOf('}', s.indexOf(':root[data-theme="dark"]{')) + 1);
  check(block(css) === block(v2), 'the lab uses v2’s colour values, light and dark, under the same names');
  check(!/linear-gradient|radial-gradient|box-shadow/.test(css.replace(/\/\*[\s\S]*?\*\//g, '')), 'the lab has no gradients and no shadows');
}
for (const scheme of ['light', 'dark']) {
  const {ctx, p} = await open({w: 360, h: 640, scheme});
  await tap(p, '#start');
  await type(p, 'F 2 x + 3 > 5 > = 3 E');
  await type(p, '2 x + 3 = 1 5 E');
  const wide = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth || document.querySelector('#app').scrollWidth > document.querySelector('#app').clientWidth);
  check(!wide, scheme + ': nothing scrolls sideways at 360 px wide');
  const fits = await p.evaluate(() => { const k = document.querySelector('#keys').getBoundingClientRect(); return k.bottom <= innerHeight + 1 && k.right <= innerWidth; });
  check(fits, scheme + ': the keypad fits on a 360 by 640 screen');
  const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  check(scheme === 'dark' ? bg === 'rgb(21, 22, 26)' : bg === 'rgb(255, 255, 255)', scheme + ': the page uses v2’s paper colour');
  await ctx.close();
}
{
  const {ctx, p} = await open();
  await tap(p, '#start');
  const kh = await p.$eval('.key[data-key="7"]', k => k.getBoundingClientRect().height);
  const pad = await p.evaluate(() => { const s = document.querySelector('#strip').getBoundingClientRect(), k = document.querySelector('#keys').getBoundingClientRect(); return k.bottom - s.top; });
  check(kh >= 42 && pad >= 290 && pad <= 345, 'at iPhone size the strip and keys are about the height of the iPhone keyboard (' + Math.round(pad) + ' px, keys ' + Math.round(kh) + ' px)');
  const loud = await p.evaluate(async () => ({click: await labSound.measure('click'), ping: await labSound.measure('ping')}));
  check(loud.click.peak > 0.01 && loud.click.peak < loud.ping.peak / 2 && loud.click.energy < loud.ping.energy / 4, 'the key click is quieter than the ping (click energy ' + loud.click.energy.toExponential(2) + ', ping ' + loud.ping.energy.toExponential(2) + ')');
  // The sound switch is saved.
  await tap(p, '#mute');
  check((await saved(p)).sound === false && await p.getAttribute('#mute', 'aria-pressed') === 'false', 'the sound switch turns sound off and is saved');
  await ctx.close();
}

await browser.close();
server.close();
console.log(results.join('\n'));
if (errs.length) { console.log('ERRORS after lab tests:', errs); process.exitCode = 1; }
