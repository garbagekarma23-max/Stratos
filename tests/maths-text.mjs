// Maths written in LaTeX inside a point's text (src/05-maths-text.js), drawn by MathLive in v2, on the pilot chapter:
// Mathematics Advanced, Year 11, Families of graphs (nsw-mat-adv-11-1-2).
// With no browser: speak() reads each kind of maths in words, tx() makes a <math-span> with a role and a label for maths
// and only escapes text with none, and plainTx() gives Search plain characters.
// In v2: Economics never loads MathLive; a maths course starts loading it as soon as it is picked; until it arrives the
// maths stays hidden, so no LaTeX shows, and the words around it do not wait; then every piece is drawn, with its
// reading as its label and nothing of the LaTeX in the text on screen; the maths takes the colour of the words around
// it, in light and dark; the card, the question, the options and the Why fit at 360 px with no sideways scroll, and a
// long expression scrolls inside its own option; the screen reader's line reads the maths in words; Learn through the
// chapter, then a Practice flight on it, both with maths in every question; Search finds points by their words and
// draws the maths in the line it shows, and finds nothing for a LaTeX command; and the point sheet draws the card.
// speak() also reads a matrix by its size and rows ("the 2 by 2 matrix with rows 1, 2 and 3, 4").
// node maths-text.mjs shots also saves maths-text-question and maths-text-solution, light and dark, at 360 by 760.
import fs from 'fs';
import vm from 'vm';
import { open, tab, pick, check, course, waiting, SHOTS } from './lib.mjs';
const R = [], SHOTS_ONLY = process.argv[2] === 'shots';
const CH = 'nsw-mat-adv-11-1-2';

// ---------- no browser ----------
{
  const ctx = {esc: s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c])), window: {}, loads: 0};
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(new URL('../src/05-maths-text.js', import.meta.url), 'utf8') + ';loadMathLive = () => { loads++; return Promise.resolve(); };' +
    'this.speak = speak; this.tx = tx; this.plainTx = plainTx; this.spoken = spoken;', ctx);
  const reads = [
    ['x = -\\frac{b}{2a}', 'x equals negative b over 2 a'],
    ['x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}', 'x equals the fraction negative b plus or minus the square root of b squared minus 4 a c, end root over 2 a, end fraction'],
    ['(3, -4)', 'open bracket 3, negative 4 close bracket'],
    ['a \\ne 0', 'a is not equal to 0'],
    ['x \\ge 0', 'x is greater than or equal to 0'],
    ['|x - 3| = 4', 'the absolute value of x minus 3, end absolute value equals 4'],
    ['\\Delta = b^{2} - 4ac', 'delta equals b squared minus 4 a c'],
    ['(x - 2)^{3}', 'open bracket x minus 2 close bracket cubed'],
    ['e^{3x}', 'e to the power of 3 x'],
    ['\\log_{e} x', 'log base e of x'],
    ['\\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}', 'the limit as h approaches 0 of the fraction f open bracket x plus h close bracket minus f open bracket x close bracket over h, end fraction'],
    ['{}^{n}C_{r}', 'n choose r'],
    ['\\binom{5}{2} = 10', '5 choose 2 equals 10'],
    ['\\int_{0}^{1} x^{2} \\, dx', 'the integral from 0 to 1 of x squared d x'],
    ['\\sum_{k=1}^{n} k', 'the sum from k equals 1 to n of k'],
    ['30^{\\circ}', '30 degrees'],
    ['\\$12.50 \\div 5', '$12.50 divided by 5'],
    ['\\pi r^{2}', 'pi r squared'],
    ['X \\sim \\text{Bin}(n, p)', 'X is distributed as Bin open bracket n, p close bracket'],
    ['-', 'minus'],
    ['{} - \\$600', 'minus $600'],
    ['\\text{UTC}{-}5', 'UTC minus 5'],
    ['\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}', 'the 2 by 2 matrix with rows 1, 2 and 3, 4'],
    ['P = \\begin{bmatrix} 10 & 20 \\end{bmatrix}', 'P equals the 1 by 2 matrix with row 10, 20'],
    ['\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}', 'the 3 by 3 matrix with rows 1, 0, 0; 0, negative 1, 0 and 0, 0, 1'],
    ['\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} + B', 'the 2 by 1 matrix with rows 3 and 4, plus B'],
  ];
  for (const [t, words] of reads) { const got = ctx.speak(t); check(got === words, 'reads ' + t + ' as "' + words + '"' + (got === words ? '' : ' (got "' + got + '")'), R); }
  const html = ctx.tx('The axis is \\(x = -\\frac{b}{2a}\\), so <b> stays text.');
  check(html === 'The axis is <span class="mxw"><math-span class="mx" role="img" aria-label="x equals negative b over 2 a">x = -\\frac{b}{2a}</math-span>,</span> so &lt;b&gt; stays text.' && ctx.loads === 1,
    'tx() makes a <math-span> with a role and its reading, keeps the comma after it on its line, escapes the words, and asks for MathLive', R);
  check(ctx.tx('No maths here, 2 < 3.') === 'No maths here, 2 &lt; 3.' && ctx.loads === 1, 'text with no maths is only escaped, and never asks for MathLive', R);
  // A \text{} word goes to MathLive in braces, so it gets a space before = (MathLive gives it none otherwise), while its
  // reading, Search and the spoken line still read the LaTeX as written.
  const word = 'Daily rate \\(\\text{Daily rate} = \\text{annual rate} \\div 365\\) here.';
  check(ctx.tx(word) === 'Daily rate <math-span class="mx" role="img" aria-label="Daily rate equals annual rate divided by 365">{\\text{Daily rate}} = {\\text{annual rate}} \\div 365</math-span> here.' &&
    ctx.plainTx(word) === 'Daily rate Daily rate = annual rate ÷ 365 here.' && ctx.spoken(word) === 'Daily rate Daily rate equals annual rate divided by 365 here.',
    'tx() gives MathLive each \\text{} word in braces, and the reading, Search and the spoken line are unchanged', R);
  check(ctx.plainTx('The axis is \\(x = -\\frac{b}{2a}\\).') === 'The axis is x = −(b)/(2a).' && ctx.spoken('So \\(y = 0\\).') === 'So y equals 0.', 'Search and the screen reader\'s line get plain words', R);
}

// MathLive held back for a moment, to see the page while it loads.
const slow = ctx => ctx.route(/mathlive\.min\.js$/, async r => { await new Promise(ok => setTimeout(ok, 1500)); await r.continue(); });
const mathsReady = p => p.waitForFunction(() => !!(window.customElements && customElements.get('math-span')), null, {timeout: 10000});
const openChapter = async p => {
  await p.locator('.ch-head').nth(1).click(); await p.waitForTimeout(150);
  await p.locator('[data-act="learnch"][data-ch="' + CH + '"]').click(); await p.waitForTimeout(300);
};
// What a slide shows as text, with every piece of maths drawn (or hidden): never any LaTeX.
const shownText = loc => loc.evaluate(el => el.innerText);
// Each <math-span> in a slide: its label, role, whether MathLive has drawn it, and its colour next to its parent's.
const spans = loc => loc.evaluate(el => [...el.querySelectorAll('math-span')].map(m => ({
  tex: m.textContent, label: m.getAttribute('aria-label'), role: m.getAttribute('role'), vis: getComputedStyle(m).visibility,
  drawn: !!(m.shadowRoot && m.shadowRoot.querySelector('[part="render"]') && m.shadowRoot.querySelector('[part="render"]').innerHTML.length),
  colour: getComputedStyle(m).color, around: getComputedStyle(m.parentElement).color})));
const wide = p => p.evaluate(() => document.scrollingElement.scrollWidth);
// MathLive draws a piece only once it comes near the screen, so a part below the fold is scrolled to first.
const seen = async loc => { await loc.evaluate(el => el.scrollIntoView({block: 'center'})); await loc.page().waitForTimeout(600); return spans(loc); };

if (!SHOTS_ONLY) {
  // ---------- Economics never loads MathLive; a maths course does ----------
  const {b, p, errs} = await open({w: 360, h: 760, route: slow});
  await tab(p, 'learn'); await p.waitForTimeout(200);
  const loaded = () => p.evaluate(() => !!window.MathLive || !!document.querySelector('script[src*="mathlive"]'));
  check(!(await loaded()) && !(await p.locator('math-span').count()), 'Economics Learn has no maths and never loads MathLive', R);
  await tab(p, 'home');
  await course(p, 'nsw-mat-adv-11'); await p.waitForTimeout(100);
  check(await p.evaluate(() => !!document.querySelector('script[src*="mathlive"]')), 'picking a maths course starts loading MathLive at once', R);
  await openChapter(p);
  const card = p.locator('#learnFeed .slide.card').first();
  const before = await spans(card);
  check(!(await p.evaluate(() => !!(window.customElements && customElements.get('math-span')))) && before.length > 5 && before.every(s => s.vis === 'hidden'),
    'while MathLive loads, every piece of maths on the card is hidden', R);
  check(!/\\|frac|\^\{/.test(await shownText(card)) && /A quadratic function is/.test(await shownText(card)), 'so no LaTeX shows, and the words are there already', R);
  await mathsReady(p); await p.waitForTimeout(600);
  const after = await spans(card);
  check(after.every(s => s.vis === 'visible' && s.drawn), 'once MathLive is here, every piece on the card is drawn', R);
  const axis = after.find(s => s.tex === 'x = -\\frac{b}{2a}');
  check(axis && axis.role === 'img' && axis.label === 'x equals negative b over 2 a', 'each piece has its reading as its label, for screen readers: x equals negative b over 2 a', R);
  check(after.every(s => s.label && !/\\/.test(s.label)), 'and every label is words, with no LaTeX', R);
  check(after.every(s => s.colour === s.around), 'the maths is the colour of the words around it', R);
  check(!/\\/.test(await shownText(card)) && (await wide(p)) <= 360, 'the card shows no LaTeX and fits at 360 px with no sideways scroll', R);

  // ---------- the question, its options and the Why ----------
  await card.locator('.next').click(); await p.waitForTimeout(500);
  const q = p.locator('#learnFeed .slide.q').first();
  const qs = await spans(q);
  check(qs.length >= 5 && qs.every(s => s.drawn && s.label), 'the question and its four options are drawn as maths', R);
  const fits = await q.locator('.opt').evaluateAll(els => els.every(e => e.getBoundingClientRect().right <= 360 && e.getBoundingClientRect().left >= 0));
  check(fits && (await wide(p)) <= 360, 'the options fit at 360 px', R);
  const key = await pick(p, '#learnFeed', true); await p.waitForTimeout(400);
  const live = await p.locator('#live').textContent();
  check(/^Correct\. The axis is x equals negative the fraction negative 8 over 2 times 1, end fraction equals 4\./.test(live) && !/\\/.test(live), 'the screen reader hears the Why with its maths in words', R);
  const why = await seen(q.locator('.note'));
  check(why.length >= 4 && why.every(s => s.drawn), 'the Why is drawn as maths', R);
  check(key.id === 'mat-quadratic-functionsa', 'the right answer is found by its question, with its LaTeX', R);

  // ---------- Learn through the chapter, then Practice ----------
  for (let n = 1; n < 6; n++) {
    await p.locator('#learnFeed .slide.card').last().locator('.next').click(); await p.waitForTimeout(400);
    await pick(p, '#learnFeed', true); await p.waitForTimeout(300);
  }
  const allQs = await p.locator('#learnFeed .slide.q').evaluateAll(els => els.map(e => e.querySelectorAll('math-span').length));
  check(allQs.length === 6 && allQs.filter(n => n > 0).length >= 5 && !(await p.locator('#learnFeed .slide.q:not(.done)').count()), 'Learn goes through all 6 points, with maths in the questions', R);
  await p.locator('#learnFeed [data-act="pracch"][data-ch="' + CH + '"]').click(); await p.waitForTimeout(600);
  let drawnQs = 0, asked = 0;
  for (let n = 0; n < 4; n++) {
    const s = waiting(p, '#feed');
    if (!(await s.count())) break;
    await p.waitForTimeout(400);
    const ss = await spans(s);
    asked++; if (ss.length && ss.every(x => x.drawn)) drawnQs++;
    await pick(p, '#feed', n !== 1); await p.waitForTimeout(n === 1 ? 1600 : 500);      /* after a wrong answer the next question comes 1.3 s later */
    if (n === 1) {
      const w = await seen(p.locator('#feed .slide.q.done').last().locator('.note'));
      check(w.length > 0 && w.every(x => x.drawn), 'a wrong answer in Practice shows the Why with its maths drawn', R);
    }
    const next = p.locator('#feed .slide.q.done').last().locator('.next');
    if (await next.isVisible()) { await next.click(); await p.waitForTimeout(300); }
  }
  check(asked >= 3 && drawnQs >= 3 && (await wide(p)) <= 360, 'a Practice flight on the chapter draws the maths in its questions, at 360 px', R);
  await p.locator('[data-act="endrun"], [data-act="quit"]').first().click().catch(() => {});

  // ---------- Search and the point sheet ----------
  await p.goto(p.url()); await p.waitForTimeout(400);
  await tab(p, 'search');
  await p.fill('#q', 'vertex'); await p.waitForTimeout(400);
  const hit = p.locator('.res[data-p="mat-quadratic-functions"]');
  check(await hit.count() === 1, 'Search finds the quadratic point by its words', R);
  await mathsReady(p); await p.waitForTimeout(400);
  check(!/\\/.test(await shownText(p.locator('#qOut'))), 'and its result shows no LaTeX', R);
  await p.fill('#q', 'circle centre'); await p.waitForTimeout(500);
  const snip = await spans(p.locator('.res[data-p="mat-circles"] .snip'));
  check(snip.length > 0 && snip.every(s => s.drawn), 'a result\'s line draws its maths', R);
  await p.fill('#q', 'frac{b}'); await p.waitForTimeout(300);
  check(await p.locator('.res').count() === 0, 'LaTeX as written, such as frac{b}, finds nothing', R);
  await p.fill('#q', 'vertex'); await p.waitForTimeout(300);
  await p.locator('.res[data-p="mat-quadratic-functions"]').click(); await p.waitForTimeout(600);
  const sheetMaths = await spans(p.locator('#sheetBody'));
  check(sheetMaths.length > 5 && sheetMaths.every(s => s.drawn && s.label) && !/\\/.test(await shownText(p.locator('#sheetBody'))), 'the point sheet draws the card\'s maths', R);
  check(!errs.length, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

if (!SHOTS_ONLY) {
  // ---------- a long expression scrolls inside its option, in dark mode ----------
  const long = '\\\\(x^{2} + 2x + 1 + x^{2} + 2x + 1 + x^{2} + 2x + 1 + x^{2} + 2x + 1 + x^{2} + 2x + 1\\\\)';
  const route = ctx => ctx.route(/\/v2\.html/, async r => {
    const res = await r.fetch(), body = await res.text();
    const out = body.replace('"\\\\((8, 7)\\\\)"', '"' + long + '"');
    if (out === body) throw new Error('the option to make long was not found');
    await r.fulfill({response: res, body: out});
  });
  const {b, p, errs} = await open({w: 360, h: 760, scheme: 'dark', route});
  await course(p, 'nsw-mat-adv-11'); await openChapter(p); await mathsReady(p);
  await p.locator('#learnFeed .slide.card .next').first().click(); await p.waitForTimeout(800);
  const q = waiting(p, '#learnFeed');
  const box = await q.locator('.opt math-span').evaluateAll(els => els.map(e => ({scroll: e.scrollWidth, client: e.clientWidth, right: e.getBoundingClientRect().right})));
  const longOne = box.find(x => x.scroll > x.client);
  check(longOne && longOne.right <= 360 && (await wide(p)) <= 360, 'a long expression scrolls inside its own option, and the page never scrolls sideways', R);
  const dark = await spans(q);
  check(dark.every(s => s.colour === s.around) && dark[0].colour !== 'rgb(0, 0, 0)', 'in dark mode the maths is the colour of the words around it', R);
  check(!errs.length, 'no script errors' + (errs.length ? ': ' + errs.join(' | ') : ''), R);
  await b.close();
}

if (SHOTS_ONLY) {
  // A converted question, then its worked solution (the Why after a wrong answer), at 360 px, light and dark.
  for (const scheme of ['light', 'dark']) {
    const {b, p} = await open({w: 360, h: 760, scheme});
    await course(p, 'nsw-mat-adv-11'); await openChapter(p); await mathsReady(p);
    await p.locator('#learnFeed .slide.card .next').first().click(); await p.waitForTimeout(3000);      /* the course's toast goes first */
    await p.screenshot({path: SHOTS + 'maths-text-question-' + scheme + '.png'});
    await pick(p, '#learnFeed', false); await p.waitForTimeout(1000);
    const q = p.locator('#learnFeed .slide.q').first();
    await q.locator('.note').evaluate(el => el.scrollIntoView({block: 'center'})); await p.waitForTimeout(800);
    await q.screenshot({path: SHOTS + 'maths-text-solution-' + scheme + '.png'});
    await b.close();
  }
  R.push('ok   saved maths-text-question and maths-text-solution, light and dark');
}
console.log(R.join('\n'));
process.exit();
