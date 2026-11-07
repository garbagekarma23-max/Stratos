// Pictures and charts (src/06-figure.js): the figure kinds after graphs.
// With no browser: charts (bar, histogram, box, dot, stem) passing, and the content check working out again what their
// data gives (a box plot's five-number summary, a histogram's class widths and total, a mean, median or mode) and
// holding the chart's stats and the text beside it to it; a slope field and a curve said to solve it; a diagram's SVG
// held to what a diagram may hold (no script, link, event handler, outside address or colour of its own, real text
// large enough on a phone and inside the edge); an image's record (creator, an allowed licence, source, why) and file
// (there, under the size limits, its size as recorded); every picture file recorded and shown, and nothing else in
// pictures/; check_content.mjs --json naming a picture's problems; and the pilot pictures all passing.
// In v2, built with a test course of the pilot points and a point whose options are pictures (tests/pictures/, as
// v2-pictures.html): a diagram fetched only when Learn opens and put in as SVG in the text colour, light and dark;
// an image loaded lazily with its credit and licence links under it; a chart; every description read by screen
// readers; pictures as options, answered by keyboard and by tap, with the image's credit under the options; no
// sideways scroll at 360 px; and the site build carrying pictures/.
// Run: node pictures.mjs     node pictures.mjs shots   saves pic-chart, pic-cells, pic-circuit, pic-source, pic-map and
// pic-options, light and dark, at 360 by 760.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { open, check, shot, waiting } from './lib.mjs';
import { pictureEnv, folderProblems, imageSize } from '../content/pictures.mjs';
import { loadContent, allBankPoints } from '../content/load.mjs';
const R = [], ROOT = fileURLToPath(new URL('../', import.meta.url)), SHOTS = process.argv[2] === 'shots';
const src = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const FIG = new Function(src('lab/maths.js') + '\n' + src('src/06-figure.js') + '; return FIG;')();
const ENV = pictureEnv();
FIG.use(ENV.records);
const copy = o => JSON.parse(JSON.stringify(o));
const has = (list, bit) => list.some(m => m.includes(bit));
const bad = (f, change, opt = false, env) => { const g = copy(f); change(g); return FIG.problems(g, opt, env); };

// ---------- charts ----------
const BOX = {kind: 'chart', chart: 'box', alt: 'A box plot of eleven values with one outlier at 35.', x: {min: 0, max: 40, step: 5, label: 'Value'}, outliers: true,
  sets: [{data: [5, 8, 12, 13, 14, 16, 18, 19, 20, 23, 35]}], stats: {min: 5, q1: 12, median: 16, q3: 20, max: 35, iqr: 8, range: 30}};
const HIST = {kind: 'chart', chart: 'histogram', alt: 'The masses of 30 parcels, in classes 10 kg wide.', x: {min: 0, max: 50, step: 10, label: 'Mass (kg)'},
  y: {min: 0, max: 12, step: 2, label: 'Frequency'}, classes: [[0, 10, 3], [10, 20, 7], [20, 30, 11], [30, 40, 6], [40, 50, 3]], stats: {n: 30, mean: 24.7}};
const BAR = {kind: 'chart', chart: 'bar', alt: 'The favourite sports of a class of 24.', x: {label: 'Sport'}, y: {min: 0, max: 10, step: 2, label: 'Students'},
  bars: [['Soccer', 8], ['Netball', 6], ['Swimming', 4], ['Cricket', 6]], stats: {total: 24, mode: 'Soccer'}};
const DOT = {kind: 'chart', chart: 'dot', alt: 'Goals scored in 12 games, as a dot plot.', x: {min: 0, max: 6, step: 1, label: 'Goals'}, data: [0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 4, 5], stats: {median: 2, mode: 2, mean: 2.17}};
const STEM = {kind: 'chart', chart: 'stem', alt: 'Ten test marks as a stem-and-leaf plot.', data: [23, 25, 31, 34, 34, 38, 42, 45, 47, 51], key: '2 | 3 means 23', stats: {median: 36, range: 28, mode: 34}};
const BACK = {kind: 'chart', chart: 'stem', alt: 'Heights of boys and girls, back to back.', sets: [{label: 'Boys', data: [152, 155, 161, 163, 168, 171]}, {label: 'Girls', data: [149, 151, 156, 158, 162, 165]}], key: '15 | 2 means 152'};
check([BOX, HIST, BAR, DOT, STEM, BACK].every(f => !FIG.problems(f).length), 'a bar chart, a histogram, a box plot, a dot plot, a stem plot and a back-to-back stem plot pass', R);
const five = FIG.chartStats(BOX);
check([five.min, five.q1, five.median, five.q3, five.max].join() === '5,12,16,20,35' && five.iqr === 8 &&
  FIG.chartStats({chart: 'dot', data: [1, 2, 3, 4, 5, 6, 7, 8]}).q1 === 2.5 && FIG.chartStats({chart: 'dot', data: [1, 2, 3, 4, 5, 6, 7, 8]}).q3 === 6.5,
  'the five-number summary takes the quartiles as the medians of each half, leaving out the median for an odd count', R);
check(has(bad(BOX, f => { f.stats.q1 = 13; }), 'states the q1 is 13, but the q1 of its data is 12') && has(bad(BOX, f => { f.stats.median = 17; }), 'the median of its data is 16') &&
  has(bad(BOX, f => { f.sets = [{five: [5, 12, 16, 20, 35]}, {label: 'Two', five: [1, 2, 3, 4, 5]}]; delete f.outliers; }), 'needs a label') &&
  has(bad(BOX, f => { f.sets = [{five: [5, 16, 12, 20, 35]}]; delete f.outliers; delete f.stats; }), 'in order') &&
  has(bad(BOX, f => { f.sets = [{five: [5, 12, 16, 20, 35]}]; }), 'every set needs its data') && has(bad(BOX, f => { f.x.max = 30; }), 'outside its x-axis'),
  'a box plot: a wrong stated quartile or median, a missing label with two boxes, a five-number summary out of order, outliers with no data, a value off the axis', R);
check(has(bad(HIST, f => { f.classes[1] = [10, 25, 7]; }), 'different widths') && has(bad(HIST, f => { f.classes[2] = [21, 30, 11]; }), 'do not touch') &&
  has(bad(HIST, f => { f.stats.n = 31; }), 'the n of its data is 30') && has(bad(HIST, f => { f.stats.mean = 22; }), 'the mean of its data is 24.6667') &&
  has(bad(HIST, f => { f.y.max = 10; }), 'taller than its y-axis') && has(bad(HIST, f => { f.classes[0][2] = 2.5; }), 'whole number'),
  'a histogram: classes of different widths or not touching, a wrong total or grouped mean, a bar off the axis, a count that is not whole', R);
check(has(bad(BAR, f => { f.y.min = 2; }), 'does not start at 0') && !bad(BAR, f => { f.y.min = 2; f.truncated = true; }).length && has(bad(BAR, f => { f.truncated = true; }), 'starts above 0') &&
  has(bad(BAR, f => { f.stats.total = 25; }), 'total of its data is 24') && has(bad(BAR, f => { f.stats.mode = 'Cricket'; }), 'is soccer') && has(bad(BAR, f => { f.bars[1][0] = 'Soccer'; }), 'same label'),
  'a bar chart: starting above 0 only when truncated, a wrong total or mode, two bars with one label', R);
check(has(bad(DOT, f => { f.stats.mean = 2.1; }), 'the mean of its data is 2.1667') && !bad(DOT, f => { f.stats.mean = 2.2; }).length && has(bad(DOT, f => { f.stats.mode = 1; }), 'is 2'),
  'a dot plot: a mean is held to its written rounding (2.17 and 2.2 pass, 2.1 does not), and a wrong mode is caught', R);
check(has(bad(STEM, f => { f.key = '2 | 3 means 2.3'; }), '2 | 3 means 23') && has(bad(STEM, f => { f.leaf = 0.1; }), 'means 2.3') && has(bad(STEM, f => { f.data.push(2.5); }), 'whole number of leaves') &&
  has(bad(STEM, f => { delete f.key; }), 'needs a key') && has(bad(BACK, f => { f.stats = {median: 160}; }), 'more than one set'),
  'a stem plot: a key that does not match its leaf, a value that is not a whole leaf, no key, and stats on a back-to-back plot', R);
check(has(bad(BAR, f => { f.chart = 'pie'; }), 'needs chart: one of') && has(bad(BAR, f => { delete f.alt; }), 'needs an alt') && has(bad(BAR, f => {}, true), 'Take out its alt') &&
  !bad(BAR, f => { delete f.alt; delete f.x.label; delete f.y.label; f.bars = [['A', 8], ['B', 6], ['C', 4]]; delete f.stats; }, true).length && has(bad(BAR, f => { f.stats.average = 6; }), 'does not know: average'),
  'the shape: an unknown chart, a description (none on an option), and only known stats', R);
const near = (text, fig) => FIG.pointProblems({title: 'T', card: ['One.', 'Two.', 'Three.', text], cardFigs: {4: fig}, a: {q: 'Q', opts: ['a', 'b', 'c', 'd'], why: 'W', clue: 'C'}, b: {q: 'Q', opts: ['a', 'b', 'c', 'd'], why: 'W', clue: 'C', d: 2}});
const PLAIN = copy(BOX); delete PLAIN.stats;
check(!near('Example: \\(Q_{1} = 12\\) and \\(Q_{3} = 20\\). \\(\\text{IQR} = 8\\), and the median is 16.', PLAIN).length &&
  has(near('The median is 17 here.', PLAIN), 'the text says the median is 17, but the median of the chart\'s data is 16') &&
  has(near('Here \\(Q_{3} = 21\\).', PLAIN), 'the text says the q3 is 21') && !near('The median is about 17.', PLAIN).length,
  'the text beside a chart (its card line) is held to the data: Q1, Q3, IQR and the median as written, with "about" left as an estimate', R);
check(JSON.stringify(FIG.statedIn('The mean is 4.5, the range was 12 and the lower quartile = 3.')) === JSON.stringify([['mean', '4.5'], ['range', '12'], ['q1', '3']]),
  'statedIn reads the mean, the range and the lower quartile', R);

// ---------- slope fields ----------
const SLOPE = {kind: 'graph', alt: 'The slope field of dy/dx = x, with the solution through (0, -2).', x: {min: -3, max: 3, step: 1, label: '\\(x\\)', nums: false}, y: {min: -3, max: 3, step: 1, label: '\\(y\\)', nums: false},
  items: [{type: 'slope', id: 's', expr: 'x'}, {type: 'fn', expr: '\\frac{x^{2}}{2} - 2', solves: 's', domain: [-2.4, 2.4]}]};
check(!FIG.problems(SLOPE).length && has(bad(SLOPE, f => { f.items[1].expr = 'x - 2'; }), 'is said to solve the slope field s') &&
  has(bad(SLOPE, f => { f.items[0].expr = 'x + z'; }), 'cannot be read as dy/dx') && has(bad(SLOPE, f => { f.items[1].solves = 't'; }), 'not the id of a slope field') &&
  !FIG.problems(copy(Object.assign(copy(SLOPE), {items: [{type: 'slope', id: 's', expr: 'x - y'}]}))).length,
  'a slope field in x and y, and a curve that solves it, are checked; a curve that does not follow the field is caught', R);

// ---------- diagrams: what an SVG may hold ----------
const GOOD_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="10" y="10" width="100" height="60"/></g>' +
  '<circle cx="200" cy="40" r="20" style="fill:var(--accent-soft);stroke:currentColor"/><text x="120" y="100" font-size="14" fill="currentColor">A label</text></svg>';
const svg = (t, w = 296) => FIG.svgProblems(t, w).bad;
check(!svg(GOOD_SVG).length, 'a diagram in currentColor and the app\'s colours, with real text, passes', R);
check(has(svg(GOOD_SVG.replace('</svg>', '<script>alert(1)</script></svg>')), 'has a <script>') && has(svg(GOOD_SVG.replace('<rect ', '<rect onclick="x()" ')), 'event handler') &&
  has(svg(GOOD_SVG.replace('<rect ', '<rect href="https://example.com/" ')), 'links to something') &&
  has(svg(GOOD_SVG.replace('stroke-width="2"', 'stroke-width="2" style="fill:url(https://example.com/x)"')), 'outside itself') &&
  has(svg(GOOD_SVG.replace('</svg>', '<image href="x.png"/></svg>')), 'has a <image>') && has(svg(GOOD_SVG.replace('</svg>', '<foreignObject></foreignObject></svg>')), 'foreignObject') &&
  has(svg(GOOD_SVG.replace('<svg ', '<!DOCTYPE svg [<!ENTITY x "y">]><svg ')), 'a part it may not') && has(svg(GOOD_SVG.replace('</g>', '')), 'not well formed'),
  'a script, an event handler, a link, an outside address, a picture or foreign object inside it, a doctype and a broken tag are all refused', R);
check(has(svg(GOOD_SVG.replace('stroke="currentColor" stroke-width', 'stroke="#ff0000" stroke-width')), 'a colour of its own') && has(svg(GOOD_SVG.replace('fill:var(--accent-soft)', 'fill:red')), 'a colour of its own') &&
  has(svg(GOOD_SVG.replace('font-size="14"', 'font-size="9"')), 'at least 11') && has(svg(GOOD_SVG.replace(/<text[^]*<\/text>/, '')), 'has no <text>') &&
  has(svg(GOOD_SVG.replace('x="120" y="100"', 'x="300" y="100"')), 'runs off its edge') && has(svg(GOOD_SVG.replace(' viewBox="0 0 320 120"', '')), 'no viewBox') &&
  has(svg(GOOD_SVG.replace('<text ', '<g transform="scale(2)"><text ').replace('</text>', '</text></g>')), 'scale'),
  'a colour of its own (an attribute or a style), text too small on a 360 px phone, no text, a label off the edge, no viewBox and text in a scale are caught', R);
const cleaned = FIG.cleanSvg ? 'the app cleans again' : '';
check(!!cleaned, 'the app has its own second look as it puts a diagram in (cleanSvg)', R);

// ---------- images and their records ----------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-pictures-'));
fs.mkdirSync(path.join(tmp, 'pictures', 'images'), {recursive: true}); fs.mkdirSync(path.join(tmp, 'pictures', 'diagrams'));
const png = (w, h, extra = 0) => { const b = Buffer.alloc(33 + extra); b.writeUInt32BE(0x89504e47, 0); b.writeUInt32BE(0x0d0a1a0a, 4); b.writeUInt32BE(13, 8); b.write('IHDR', 12); b.writeUInt32BE(w, 16); b.writeUInt32BE(h, 20); return b; };
fs.writeFileSync(path.join(tmp, 'pictures/images/good.png'), png(800, 600));
fs.writeFileSync(path.join(tmp, 'pictures/images/huge.png'), png(2400, 1600));
fs.writeFileSync(path.join(tmp, 'pictures/images/heavy.png'), png(800, 600, 210 * 1024));
fs.writeFileSync(path.join(tmp, 'pictures/images/stray.png'), png(800, 600));
fs.writeFileSync(path.join(tmp, 'pictures/diagrams/d.svg'), GOOD_SVG);
const REC = {title: 'A test picture', creator: 'A. Person', licence: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Test.png', size: [800, 600], changes: 'Resized', why: 'Its Commons page gives this licence.'};
const recs = {images: {'pictures/images/good.png': REC, 'pictures/images/huge.png': Object.assign(copy(REC), {size: [2400, 1600]}), 'pictures/images/heavy.png': REC, 'pictures/images/gone.png': REC},
  diagrams: {'pictures/diagrams/d.svg': {title: 'A test diagram', made: 'Drawn for Stratos', size: [320, 120]}}};
fs.writeFileSync(path.join(tmp, 'pictures/licences.json'), JSON.stringify(recs));
const env = pictureEnv(tmp);
const IMG = {kind: 'image', src: 'pictures/images/good.png', alt: 'A test picture of something real.'};
const recBad = change => { const e = pictureEnv(tmp); change(e.records.images['pictures/images/good.png'] = copy(REC)); return FIG.problems(IMG, false, e); };
check(!FIG.problems(IMG, false, env).length && !FIG.problems({kind: 'diagram', src: 'pictures/diagrams/d.svg', alt: 'A test diagram with a label.'}, false, env).length,
  'an image with its record and file, and a diagram with its record and file, pass', R);
check(has(recBad(r => { r.licence = 'CC BY-NC 4.0'; }), 'Only Public domain') && has(recBad(r => { r.licence = 'All rights reserved'; }), 'Only Public domain') &&
  has(recBad(r => { delete r.creator; }), 'no creator') && has(recBad(r => { r.source = 'textbook page 4'; }), 'no source') && has(recBad(r => { delete r.why; }), 'no why') &&
  has(recBad(r => { r.size = [640, 480]; }), 'but the file is 800 by 600') && FIG.LICENCES.length === 10,
  'a licence not on the list (NC or all rights reserved), no creator, no source address, no why and a size that is not the file\'s are caught', R);
check(has(FIG.problems({kind: 'image', src: 'pictures/images/gone.png', alt: 'A picture whose file is missing.'}, false, env), 'has no file') &&
  has(FIG.problems({kind: 'image', src: 'pictures/images/nobody.png', alt: 'A picture with no record at all.'}, false, env), 'has no record') &&
  has(FIG.problems({kind: 'image', src: 'pictures/images/huge.png', alt: 'A picture that is far too large.'}, false, env), 'at most 1200 px') &&
  has(FIG.problems({kind: 'image', src: 'pictures/images/heavy.png', alt: 'A picture that weighs too much.'}, false, env), 'The most is 200 KB') &&
  has(FIG.problems({kind: 'image', src: 'https://upload.wikimedia.org/x.png', alt: 'A picture from another site.'}, false, env), 'needs a src in this repository') &&
  has(FIG.problems({kind: 'image', src: 'pictures/images/../../x.png', alt: 'A picture outside the folder.'}, false, env), 'needs a src in this repository') &&
  has(FIG.problems({kind: 'image', src: 'pictures/images/good.png'}, false, env), 'needs an alt') && !FIG.problems({kind: 'image', src: 'pictures/images/good.png'}, true, env).length,
  'a missing file or record, an image too large or too heavy, a picture from another site or outside pictures/, and a missing description are caught; an option needs none', R);
const folder = folderProblems(new Set(['pictures/images/good.png', 'pictures/images/huge.png', 'pictures/images/heavy.png', 'pictures/diagrams/d.svg']), tmp);
check(has(folder, 'stray.png has no record') && has(folder, 'gone.png, but there is no such file') && has(folder, 'gone.png is in pictures/licences.json, but no point shows it'),
  'the folder: a file with no record, a record with no file, and a record no point shows', R);
check(imageSize(fs.readFileSync(path.join(ROOT, 'pictures/images/the-blood-vote-1916.webp'))).join() === '760,1001', 'a WebP picture\'s size is read from its file', R);

// ---------- check_content.mjs --json, and the pilot ----------
const C = loadContent(), BANK = allBankPoints(C);
const pilot = ['mat-five-number-summary-boxplots', 'bio-plant-animal-cells-compared-2', 'phys-series-circuits', 'his-conscription-referendums', 'geo-water-use-murray-darling'];
const shownPilot = pilot.filter(id => FIG.of(BANK[id]).length);
check(shownPilot.length >= 4 && shownPilot.every(id => !FIG.pointProblems(BANK[id], ENV).length), 'the pilot points have their pictures, and all pass: ' + shownPilot.join(', '), R);
check(['pictures/diagrams/series-circuit.svg', 'pictures/diagrams/plant-and-animal-cells.svg', 'pictures/images/the-blood-vote-1916.webp'].every(s => ENV.records[s.includes('/images/') ? 'images' : 'diagrams'][s] && fs.existsSync(path.join(ROOT, s))) &&
  ENV.records.images['pictures/images/the-blood-vote-1916.webp'].licence === 'Public domain',
  'each pilot picture has its file and its record', R);
{
  const p = copy(BANK['phys-series-circuits']);
  p.cardFigs['1'].src = 'pictures/diagrams/not-there.svg';
  p.a.fig = {kind: 'image', src: 'pictures/images/the-blood-vote-1916.webp'};
  const file = path.join(tmp, 'in.json');
  fs.writeFileSync(file, JSON.stringify({kind: 'standard', subject: 'Physics', points: {'phys-series-circuits': p}}));
  const out = spawnSync('node', ['check_content.mjs', '--json', file], {cwd: ROOT, encoding: 'utf8'});
  const got = JSON.parse(out.stdout)['phys-series-circuits'] || [];
  check(has(got, 'card line 1 has no record in pictures/licences.json') && has(got, 'a question needs an alt'),
    'check_content.mjs --json names where a picture\'s problem is: ' + got.join(' | '), R);
}
fs.rmSync(tmp, {recursive: true, force: true});

// ---------- in v2 ----------
const build = spawnSync(process.platform === 'win32' ? 'py' : 'python3', ['build.py', '--extra', 'tests/pictures', '--out', 'v2-pictures.html'], {cwd: ROOT, encoding: 'utf8'});
check(build.status === 0, 'build.py adds the picture test course and writes v2-pictures.html', R);
const fetched = [];
const watch = ctx => ctx.on('request', r => { if (/\/pictures\//.test(r.url())) fetched.push(r.url().replace(/^.*\/pictures\//, 'pictures/')); });
const learnOne = async p => { const card = p.locator('#learnFeed .card:not(.endslide)').last(); return card; };
for (const scheme of ['light', 'dark']) {
  fetched.length = 0;
  const {b, p, errs} = await open({page: 'v2-pictures.html', w: 360, h: 760, scheme, route: watch, seed: {subject: 'tpc-course', picked: 1}});
  const ink = await p.evaluate(() => getComputedStyle(document.body).color);
  check(!fetched.length, scheme + ': Home fetches no picture', R);
  await p.click('.hero .primary'); await p.waitForTimeout(300);
  // the box plot under the five-number summary's example
  let card = await learnOne(p);
  await card.locator('.fig').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(150);
  check(await card.locator('.fig[role="img"] > svg path.fb').count() === 1 && await card.locator('.fig[role="img"] > svg circle.fo').count() === 1 &&
    (await card.locator('.fig[role="img"]').getAttribute('aria-label')).startsWith('A boxplot on a number line from 0 to 40'),
    scheme + ': the box plot is drawn from its data, with the outlier as a dot, and its description for screen readers', R);
  if (SHOTS) await shot(p, 'pic-chart-' + scheme);
  await card.locator('.next').click(); await p.waitForTimeout(80);
  await answerFirst(p);
  // the cells
  card = await learnOne(p);
  await card.locator('.fig').first().scrollIntoViewIfNeeded();
  await p.waitForSelector('#learnFeed .card:not(.endslide) .fdg svg text', {timeout: 5000}).catch(() => {});
  const dg = card.locator('.fig.fdiagram');
  const look = await dg.evaluate(el => { const t = el.querySelector('svg text'); return {svg: !!el.querySelector('.fdg > svg'), texts: el.querySelectorAll('svg text').length, fill: t && getComputedStyle(t).fill, scripts: el.querySelectorAll('script').length, w: el.getBoundingClientRect().width}; });
  check(look.svg && look.texts === 11 && look.fill === ink && !look.scripts && look.w <= 330 && fetched.includes('pictures/diagrams/plant-and-animal-cells.svg'),
    scheme + ': the cell diagram is fetched when Learn reaches it, put in as SVG with its 11 labels as text in the text colour (' + look.fill + ')', R);
  check((await dg.getAttribute('role')) === 'img' && (await dg.getAttribute('aria-label')).startsWith('Two cells. The plant cell is box-shaped') && (await dg.locator('svg').getAttribute('aria-hidden')) === 'true',
    scheme + ': the diagram is one image for screen readers, read by its description', R);
  if (SHOTS) await shot(p, 'pic-cells-' + scheme);
  check(!fetched.includes('pictures/images/the-blood-vote-1916.webp'), scheme + ': the image further on is not loaded yet', R);
  await card.locator('.next').click(); await p.waitForTimeout(80);
  await answerFirst(p);
  // the circuit
  card = await learnOne(p);
  await card.locator('.fig').first().scrollIntoViewIfNeeded();
  await p.waitForSelector('#learnFeed .card:not(.endslide) .fdg svg path', {timeout: 5000}).catch(() => {});
  const head = await card.locator('.fdg svg > path').last().evaluate(el => getComputedStyle(el).fill);
  check(head === ink, scheme + ': the circuit\'s arrowhead is filled in the text colour, not left empty by the graph styles', R);
  if (SHOTS) await shot(p, 'pic-circuit-' + scheme);
  await card.locator('.next').click(); await p.waitForTimeout(80);
  await answerFirst(p);
  // the 1916 leaflet, with its credit
  card = await learnOne(p);
  await card.locator('.fwrap').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(300);
  const img = card.locator('.fig.fimage img');
  await p.waitForFunction(() => { const i = document.querySelector('#learnFeed .card:not(.endslide) .fimage img'); return i && i.complete && i.naturalWidth > 0; }, null, {timeout: 5000}).catch(() => {});
  const cr = card.locator('.fcr');
  const links = await cr.locator('a').evaluateAll(as => as.map(a => [a.textContent, a.href, a.target, a.rel]));
  check((await img.getAttribute('loading')) === 'lazy' && (await img.getAttribute('alt')) === '' && (await img.evaluate(i => i.naturalWidth)) === 760 &&
    (await card.locator('.fig.fimage').getAttribute('aria-label')).startsWith('The Blood Vote'),
    scheme + ': the image loads lazily, from this site, with its description on the figure for screen readers', R);
  check((await cr.textContent()).startsWith('W. R. Winspear (words) and Claude Marquet (drawing), public domain, resized and compressed.') &&
    links.length === 1 && links[0][0] === 'Wikimedia Commons' && links[0][1].startsWith('https://commons.wikimedia.org/wiki/File:The_Blood_Vote') && links[0][2] === '_blank' && links[0][3] === 'noopener',
    scheme + ': its credit is under it: the creator, public domain, what was changed, and a link to its Commons page', R);
  if (SHOTS) await shot(p, 'pic-source-' + scheme);
  await card.locator('.next').click(); await p.waitForTimeout(80);
  await answerFirst(p);
  // the map, when the pilot has it
  card = await learnOne(p);
  if (await card.locator('.fimage').count()) {
    await card.locator('.fwrap').first().scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
    const lic = await card.locator('.fcr a').first().evaluate(a => [a.textContent, a.href]);
    check(/^CC BY/.test(lic[0]) && lic[1].startsWith('https://creativecommons.org/licenses/'), scheme + ': the map\'s credit links its licence: ' + lic.join(' '), R);
    if (SHOTS) await shot(p, 'pic-map-' + scheme);
  }
  check(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth && [...document.querySelectorAll('.fig')].every(f => f.getBoundingClientRect().right <= innerWidth + 0.5)),
    scheme + ': at 360 px nothing scrolls sideways and every picture fits', R);
  check(!errs.length, scheme + ': no script errors: ' + errs.join(' | '), R);
  await b.close();
}
async function answerFirst(p) {
  const s = waiting(p, '#learnFeed');
  await s.locator('.opt').first().click(); await p.waitForTimeout(60);
  await p.locator('#learnFeed .slide.q.done .next').last().click(); await p.waitForTimeout(80);
}

// ---------- pictures as options, by keyboard and by tap ----------
for (const scheme of ['light', 'dark']) {
  const {b, p, errs} = await open({page: 'v2-pictures.html', w: 360, h: 760, scheme, seed: {subject: 'tpc-course', picked: 1, c: {'tpc-course': {cur: 'tpc-course-1-2'}}}});
  check((await p.locator('.hero .h1').textContent()) === 'Pictures as options', scheme + ': Home opens on the chapter with pictures as options', R);
  await p.click('.hero .primary'); await p.waitForTimeout(200);
  const card = p.locator('#learnFeed .card:not(.endslide)').last();
  await card.locator('.next').click(); await p.waitForTimeout(150);
  const q = p.locator('#learnFeed .slide.q').last();
  await q.scrollIntoViewIfNeeded();
  const opts = q.locator('.opt.fopt');
  check(await opts.count() === 4 && await q.locator('.opt.fopt .fig.fpic').count() === 3 && await q.locator('.opt.fopt .fig:not(.fpic)').count() === 1,
    scheme + ': a question\'s options can be pictures: two diagrams, an image and a chart, two by two', R);
  const texts = await opts.locator('.txt.sr').allTextContents();
  check(texts.length === 4 && texts.includes('A series circuit with a cell and two resistors') && await q.locator('.opt.fopt .fig[aria-hidden="true"]').count() === 4,
    scheme + ': each option is named by its text for screen readers, and its picture is hidden from them', R);
  const credit = await q.locator('.fcr-opts').textContent();
  const letter = 'ABCD'.charAt(texts.indexOf('A leaflet from 1916'));
  check(credit === letter + ': W. R. Winspear (words) and Claude Marquet (drawing), public domain, resized and compressed. Wikimedia Commons.' && await q.locator('.opt .fcr').count() === 0,
    scheme + ': the image\'s credit is under the options, with its letter, never inside a button', R);
  await p.waitForSelector('#learnFeed .slide.q .fopt .fdg svg', {timeout: 5000}).catch(() => {});
  if (SHOTS) await shot(p, 'pic-options-' + scheme);
  // by keyboard: the letter of the right option
  const right = texts.indexOf('A series circuit with a cell and two resistors');
  await p.keyboard.press('ABCD'.charAt(right).toLowerCase()); await p.waitForTimeout(150);
  check(await opts.nth(right).evaluate(el => el.classList.contains('is-right')), scheme + ': answered by keyboard, ' + 'ABCD'.charAt(right) + ' marks the right picture', R);
  check(!errs.length, scheme + ': no script errors: ' + errs.join(' | '), R);
  await b.close();
}
{
  // by tap, on a phone with touch: a wrong picture first.
  const {b, p, errs} = await open({page: 'v2-pictures.html', w: 360, h: 760, seed: {subject: 'tpc-course', picked: 1, c: {'tpc-course': {cur: 'tpc-course-1-2'}}}});
  await p.click('.hero .primary'); await p.waitForTimeout(200);
  await p.locator('#learnFeed .card:not(.endslide)').last().locator('.next').click(); await p.waitForTimeout(150);
  const q = p.locator('#learnFeed .slide.q').last();
  const texts = await q.locator('.opt.fopt .txt.sr').allTextContents();
  const wrong = texts.indexOf('A box plot with one outlier'), right = texts.indexOf('A series circuit with a cell and two resistors');
  await q.locator('.opt.fopt').nth(wrong).tap(); await p.waitForTimeout(200);
  check(await q.locator('.opt.fopt').nth(wrong).evaluate(el => el.classList.contains('is-wrong')) && await q.locator('.opt.fopt').nth(right).evaluate(el => el.classList.contains('is-right')),
    'tapped, a wrong picture is marked wrong and the right picture is shown', R);
  check(!errs.length, 'no script errors: ' + errs.join(' | '), R);
  await b.close();
}

// ---------- the site carries the pictures ----------
{
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-site-pictures-'));
  fs.rmSync(out, {recursive: true});
  const site = spawnSync(process.platform === 'win32' ? 'py' : 'python3', ['build.py', '--site', out], {cwd: ROOT, encoding: 'utf8'});
  const all = Object.keys(ENV.records.images).concat(Object.keys(ENV.records.diagrams));
  check(site.status === 0 && fs.existsSync(path.join(out, 'pictures', 'licences.json')) && all.every(s => fs.existsSync(path.join(out, s))),
    'build.py --site copies pictures/ with every picture and its record', R);
  fs.rmSync(out, {recursive: true, force: true});
}
console.log(R.join('\n'));
