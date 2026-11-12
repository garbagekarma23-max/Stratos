// Figures: graphs stored as data with a point and drawn by the app as SVG (src/06-figure.js).
// With no browser: the format, and the content check's maths on it (a point said to be on a function is on it, intercepts
// and turning points where they are said to be, coordinates in a label matching the dot, a description, everything
// inside the axes and fitting at the size the app draws it); check_content.mjs --json reporting a figure's problems,
// its words and its maths; two questions with the same words and different graphs counting as different questions; the
// Maths Lab's reader for functions (with |x|), never eval; and the pilot chapters having their graphs, all passing.
// In v2: Edexcel's Price determination chapter in Learn at 360 px, light and dark (the card graphs, their description
// for screen readers, every label inside its graph, the graph in the ink colour, the four graph options two by two,
// each named by its text, and answering one by keyboard); a maths Practice flight with a "Which graph shows ...?"
// question answered by tapping; the point sheet with its maths labels drawn; and no figure work for points with none.
// Run: node figures.mjs        node figures.mjs shots   saves fig-card, fig-options and fig-maths, light and dark, at 390 by 844.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { open, check, course, pick, waiting, shot, tab, BANK } from './lib.mjs';
import { loadContent } from '../content/load.mjs';
const R = [], ROOT = fileURLToPath(new URL('../', import.meta.url)), SHOTS = process.argv[2] === 'shots';
const src = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const FIG = new Function(src('lab/maths.js') + '\n' + src('src/06-figure.js') + '; return FIG;')();
const LabMaths = new Function(src('lab/maths.js') + '; return LabMaths;')();
const C = loadContent(), MAT = C.MADE_BANKS.mat;
const copy = o => JSON.parse(JSON.stringify(o));
const has = (list, bit) => list.some(m => m.includes(bit));

// ---------- the format and its checks, with no browser ----------
const GOOD = {kind: 'graph', alt: 'The parabola \\(y = x^{2} - 4\\), with roots at \\(x = -2\\) and \\(x = 2\\) and its vertex at \\((0, -4)\\).',
  x: {min: -4, max: 4, label: '\\(x\\)', step: 1, nums: false}, y: {min: -5, max: 6, label: '\\(y\\)', step: 1, nums: false}, grid: true, items: [
    {type: 'fn', id: 'f', expr: 'x^{2} - 4', label: '\\(y = x^{2} - 4\\)', labelAt: 3, pos: 'left'},
    {type: 'point', at: [-2, 0], on: ['f'], is: 'x-intercept'},
    {type: 'point', at: [2, 0], on: ['f'], is: 'x-intercept', label: '\\((2, 0)\\)', pos: 'above-left'},
    {type: 'point', at: [0, -4], on: ['f'], is: 'turning point', label: '\\((0, -4)\\)', pos: 'below'}]};
const bad = (change, f = GOOD, opt = false) => { const g = copy(f); change(g); return FIG.problems(g, opt); };
check(FIG.problems(GOOD).length === 0, 'a good graph passes', R);
check(has(bad(g => { g.kind = 'picture'; }), 'Use graph, chart, diagram or image') && has(bad(g => { g.alt = ''; }), 'needs an alt') &&
  has(bad(g => { g.colour = 'red'; }), 'does not have: colour') && has(bad(g => { g.x.min = 5; }), 'min smaller than its max') &&
  has(bad(g => { g.items[1].type = 'blob'; }), 'no type') && has(bad(g => { g.items[0].wobble = 1; }), 'does not take: wobble') &&
  has(bad(g => { g.items[2].pos = 'up'; }), 'has pos "up"') && has(bad(g => { g.items = []; }), 'no items'),
  'the shape: the kind, a description, no parts the format does not have, the axes, item types, and pos', R);
check(has(bad(g => { delete g.alt; }, GOOD, true), 'needs an alt') === false && has(bad(g => {}, GOOD, true), 'Take out its alt'),
  'an option\'s graph has no alt of its own: the option\'s text is its description', R);
check(has(bad(g => { g.items[0].expr = 'y = x^{2}'; }), 'cannot be read as a function') && has(bad(g => { g.items[0].expr = 'Math.random()'; }), 'cannot be read'),
  'a function must be LaTeX in x only: "y =" and anything that looks like code are refused', R);
check(has(bad(g => { g.items[3].at = [0, -3]; g.items[3].label = '\\((0, -3)\\)'; }), 'is said to be on f, but is not'),
  'a point said to be on a function that is not on it is caught', R);
check(!bad(g => { g.x.step = 2; g.y.step = 2; g.items[0].expr = 'x^{2} - 2'; g.items[0].label = '\\(y = x^{2} - 2\\)'; g.items[0].labelAt = 2.5; g.items[2].at = [1.41, 0]; g.items[2].label = '\\((1.41, 0)\\)'; g.items[1].at = [-1.41, 0]; g.items[3].at = [0, -2]; g.items[3].label = '\\((0, -2)\\)'; }).length,
  'and a point within rounding of it passes (1.41 for the root of 2)', R);
check(has(bad(g => { g.items[2].at = [2, 0.5]; g.items[2].label = ''; }), 'x-intercept, so its y must be 0') &&
  has(bad(g => { g.items.push({type: 'point', at: [1, -3], on: ['f'], is: 'y-intercept'}); }), 'y-intercept, so its x must be 0') &&
  has(bad(g => { g.items.push({type: 'point', at: [1, -3], on: ['f'], is: 'turning point'}); }), 'does not turn there'),
  'intercepts and turning points must be where they are said to be', R);
check(has(bad(g => { g.items[2].label = '\\((3, 0)\\)'; }), 'is labelled \\((3, 0)\\) but is drawn at (2, 0)') && !bad(g => { g.items[2].label = '\\(\\left(2, 0\\right)\\)'; }).length,
  'coordinates written in a label must match the dot', R);
check(has(bad(g => { g.items.push({type: 'guide', at: [2, 0], xLabel: '3'}); }), 'has xLabel 3, but its point is at 2'),
  'a number on a guide must match its point', R);
const recip = {kind: 'graph', alt: 'The hyperbola y = 1 over x minus 2, with asymptotes x = 2 and y = 0.', x: {min: -2, max: 6, step: 1, nums: false}, y: {min: -5, max: 5, step: 1},
  items: [{type: 'fn', id: 'h', expr: '\\frac{1}{x - 2}', breaks: [2]}, {type: 'asymptote', x: 2, label: '\\(x = 2\\)', pos: 'below-left'}]};
check(!FIG.problems(recip).length && has(bad(g => { g.items[1].label = '\\(x = 3\\)'; }, recip), 'labelled \\(x = 3\\) but is drawn at x = 2') &&
  has(bad(g => { g.items[1].x = 3; g.items[1].label = '\\(x = 3\\)'; }, recip), 'no fn goes off to infinity at x = 3'),
  'an asymptote must match its label, and a function must really go off to infinity there', R);
/* A word on a curve: the quadratic in Families of graphs as it was, whose curve ran through the y-axis numbers 6 and 7
   and the x-axis numbers at its roots. */
const OLDQ = {kind: 'graph', alt: 'The parabola y = x squared minus 6x plus 5, before its numbers were moved.', x: {min: -1, max: 7, label: '\\(x\\)', step: 1}, y: {min: -5, max: 7, label: '\\(y\\)', step: 1}, grid: true,
  items: [{type: 'fn', id: 'f', expr: 'x^{2} - 6x + 5'}]};
const oldq = FIG.problems(OLDQ);
check(['6', '7', '1', '5'].every(n => has(oldq, 'has the axis number ' + n + ' on a curve')) && !has(oldq, 'axis number 4 on') &&
  has(bad(g => { g.items.push({type: 'text', at: [3, -4], label: 'the lowest point', pos: 'above'}); }, OLDQ), 'has the label the lowest point on a curve') &&
  !FIG.problems(Object.assign(copy(OLDQ), {x: Object.assign(copy(OLDQ.x), {step: 2}), y: Object.assign(copy(OLDQ.y), {max: 5.5})})).length,
  'an axis number or a label a curve runs through is caught (the old quadratic\'s 6 and 7, and its roots 1 and 5), and the fixed axes pass', R);
check(has(bad(g => { g.items[3].at = [0, -7]; }), 'outside the axes') && has(bad(g => { g.items.push({type: 'arrow', from: [0, 0], to: [9, 0]}); }), 'ends at (9, 0) is outside the axes'),
  'everything must be inside the axes', R);
check(has(bad(g => { g.x = {min: -20, max: 20, step: 1}; }), 'numbers that run into each other') && has(bad(g => { g.items[0].labelAt = -3.9; g.items[0].pos = 'left'; }), 'does not fit inside the graph'),
  'numbers must not run into each other, and labels must fit, at the size the app draws it', R);
check(has(bad(g => { g.items.push({type: 'text', at: [2, 0], label: 'here', pos: 'above-left'}); }), 'labels that run into each other: \\((2, 0)\\) and here'),
  'two labels on top of each other are caught', R);
check(has(bad(g => { g.items.push({type: 'fn', id: 'g', expr: 'x'}); }), 'each needs a label'),
  'with two or more curves, each needs a label: curves are never told apart by colour', R);
check(has(bad(g => { g.equal = true; g.y = {min: -40, max: 40}; }), 'too tall'), 'equal scales that make a graph too tall for a phone are caught', R);
const circle = {kind: 'graph', alt: 'A circle with centre (1, 1) and radius 2.', equal: true, x: {min: -2, max: 4, step: 1}, y: {min: -2, max: 4, step: 1},
  items: [{type: 'circle', id: 'c', centre: [1, 1], r: 2}, {type: 'point', at: [3, 1], on: ['c']}]};
check(!FIG.problems(circle).length && has(bad(g => { g.items[1].at = [3, 2]; }, circle), 'is said to be on c'), 'a circle, and a point on it', R);
check(LabMaths.func('2|x - 1| + 3')(4) === 9 && LabMaths.func('\\left|x\\right|')(-3) === 3 && LabMaths.func('\\frac{6}{x}')(2) === 3 &&
  LabMaths.func('y = x') === null && LabMaths.func('alert(1)') === null && !/\beval\(|new Function/.test(src('src/06-figure.js')),
  'functions are read by the Maths Lab\'s reader (with |x| now), never run as code', R);
{
  const wave = {kind: 'graph', alt: 'The graph of y = sin x from 0 to 2 pi, with its maximum at pi/2.', x: {min: 0, max: 6.5, step: 1, nums: false}, y: {min: -1.5, max: 1.5, step: 1},
    items: [{type: 'fn', id: 'f', expr: '\\sin x', domain: [0, 6.3]}, {type: 'point', at: [Math.PI / 2, 1], on: ['f'], is: 'turning point'}]};
  const grow = {kind: 'graph', alt: 'The graphs of y = e^x and y = ln x.', equal: true, x: {min: -3, max: 4, step: 2}, y: {min: -3, max: 4, step: 2},
    items: [{type: 'fn', id: 'e', expr: 'e^{x}', domain: [-3, 1.35], label: '\\(y = e^{x}\\)', labelAt: 1.2, pos: 'left'},
      {type: 'fn', id: 'l', expr: '\\ln x', domain: [0.05, 4], label: '\\(y = \\ln x\\)', labelAt: 3, pos: 'below-right'},
      {type: 'point', at: [0, 1], on: ['e'], is: 'y-intercept'}, {type: 'point', at: [1, 0], on: ['l'], is: 'x-intercept'}]};
  check(!FIG.problems(wave).length && !FIG.problems(grow).length &&
    has(bad(g => { g.items[1].at = [Math.PI / 2, 0.8]; }, wave), 'is said to be on f') && has(bad(g => { g.items[3].at = [1.5, 0]; }, grow), 'on l'),
    'trig, exponential and log functions are read and checked: a point on them, an intercept, a turning point', R);
}
{
  // A label is measured at its full drawn height: a fraction is about twice as tall as a word, so a fraction at an edge
  // whose bottom (or top, or end) would be cut off is caught, where a word in the same place fits.
  const edge = (label, at, pos) => FIG.problems({kind: 'graph', alt: 'A label near an edge.', x: {min: 1, max: 11, step: 1, nums: false}, y: {min: 1, max: 11, step: 1, nums: false},
    items: [{type: 'text', at, label, pos}]}).some(m => m.includes('does not fit'));
  const frac = '\\(\\frac{5\\pi}{6}\\)';
  check(edge(frac, [6, 1.6], 'below') && !edge('6 m', [6, 1.6], 'below'), 'a fraction cut off at the bottom edge is caught, and a word in its place fits', R);
  check(edge(frac, [6, 10.4], 'above') && !edge('6 m', [6, 10.4], 'above'), 'a fraction cut off at the top edge is caught, and a word in its place fits', R);
  check(edge(frac, [1.2, 6], 'left') && !edge(frac, [1.8, 6], 'left') && edge(frac, [10.8, 6], 'right') && !edge(frac, [10.2, 6], 'right'),
    'a fraction cut off at the left or right edge is caught, and one a little further in fits', R);
  check(edge('\\(\\int_{0}^{1} f(x)\\)', [6, 10], 'above') && !edge('\\(x^{2}\\)', [6, 10], 'above'), 'an integral with limits is measured taller too', R);
}

{
  // Axes that run from high to low ("reverse"), the name under the numbers ("labelUnder") and words in place of numbers
  // ("names"), for the IR spectrum, the decay series and the climate graph.
  const IR = {kind: 'graph', alt: 'An IR spectrum with one sharp peak at 1715 per centimetre.', x: {min: 500, max: 4000, step: 500, label: 'Wavenumber (cm⁻¹)', reverse: true},
    y: {min: 0, max: 100, step: 20, label: 'Transmittance (%)'}, items: [{type: 'curve', id: 's', smooth: true, points: [[500, 90], [1690, 90], [1715, 10], [1740, 90], [4000, 90]]},
      {type: 'text', at: [1715, 10], label: 'C=O', pos: 'right'}]};
  check(!FIG.problems(IR).length, 'a graph whose x-axis runs from high to low passes', R);
  const L = FIG.layout(IR, 'card'), {words, svg} = FIG.plan(IR, 'card'), nums = words.filter(w => w.cls === 'fn' && w.sy >= L.top + L.ph - 1e-6).sort((p, q) => p.sx - q.sx);
  check(Math.abs(L.px(4000) - L.left) < 1e-9 && Math.abs(L.px(500) - (L.left + L.pw)) < 1e-9 && L.px(1715) > L.px(2970),
    'a reversed x-axis puts its max at the left and its min at the right', R);
  check(nums.map(w => w.text).join(' ') === '4000 3500 3000 2500 2000 1500 1000 500' && Math.abs(nums[0].sx - L.left) < 1e-9,
    'its numbers fall from left to right, with 4000 kept at the corner, where the scale starts, and 500 at the far end', R);
  const name = words.find(w => w.text === IR.x.label);
  check(name && Math.abs(name.sx - (L.left + L.pw / 2)) < 1e-9 && name.sy > Math.max(...nums.map(w => w.sy)) && svg.filter(e => e[1] === 'fk').length === 1,
    'its name is centred under its numbers, and only the y-axis has an arrow', R);
  check(!words.some(w => w.text === '0') && has(bad(g => { g.items[1].at = [300, 50]; }, IR), 'outside the axes') && has(bad(g => { g.x.reverse = 'yes'; }, IR), 'reverse to be true or false'),
    'the y-axis still leaves out its 0 at the corner, everything is still held inside the axes, and reverse must be true or false', R);
  const down = copy(IR); down.y.reverse = true; delete down.items[1];
  down.items = down.items.filter(Boolean);
  const LD = FIG.layout(down, 'card');
  check(!FIG.problems(down).length && Math.abs(LD.py(100) - (LD.top + LD.ph)) < 1e-9 && Math.abs(LD.py(0) - LD.top) < 1e-9 && !FIG.plan(down, 'card').svg.some(e => e[1] === 'fk'),
    'a reversed y-axis runs from max at the bottom to min at the top, and with both reversed neither axis has an arrow', R);
  const DECAY = {kind: 'graph', alt: 'U-238 decays to Th-234 by alpha decay.', x: {min: 89, max: 93, step: 1, label: 'Atomic number, Z'}, y: {min: 232.5, max: 239.5, step: 2, label: 'Mass number, A'},
    items: [{type: 'arrow', from: [91.88, 237.76], to: [90.12, 234.24], label: 'α', pos: 'above-left'}, {type: 'point', at: [92, 238], label: 'U-238', pos: 'right'}, {type: 'point', at: [90, 234], label: 'Th-234', pos: 'left'}]};
  const shown = f => FIG.plan(f, 'card').words.filter(w => w.cls === 'fn' && /^9/.test(w.text)).map(w => w.text).join(' ');
  check(shown(DECAY) === '90 91' && shown(Object.assign(copy(DECAY), {x: Object.assign(copy(DECAY.x), {labelUnder: true})})) === '90 91 92 93',
    'a long x-axis name at the end of its axis hides the numbers under it (92 and 93), and labelUnder puts it under them so every number shows', R);
  check(has(bad(g => { g.y.labelUnder = true; }, DECAY), 'labelUnder only on the x-axis') && has(bad(g => { g.x.labelUnder = true; delete g.x.label; }, DECAY), 'with a label'),
    'labelUnder is only for an x-axis with a name', R);
  const M = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  const CLIMATE = {kind: 'graph', alt: 'The average temperature each month, highest in summer.', x: {min: 0.5, max: 12.5, step: 1, label: 'Month', labelUnder: true, names: M},
    y: {min: 0, max: 30, step: 5, label: 'Temperature (°C)'}, items: [{type: 'curve', id: 't', points: M.map((_, i) => [i + 1, 19 + 6 * Math.cos((i - 1) * Math.PI / 6)])}]};
  check(!FIG.problems(CLIMATE).length && FIG.plan(CLIMATE, 'card').words.filter(w => w.cls === 'fn' && /[A-Z]/.test(w.text)).map(w => w.text).join('') === M.join(''),
    'names puts words in place of the x-axis numbers, one at each tick: the months as J F M A M J J A S O N D', R);
  check(has(bad(g => { g.x.names = M.slice(1); }, CLIMATE), 'has 11 names on its x-axis but 12 ticks') && has(bad(g => { delete g.x.step; }, CLIMATE), 'no step') &&
    has(bad(g => { g.x.nums = false; }, CLIMATE), 'names on its x-axis and nums: false') && has(bad(g => { g.y.names = ['a']; }, CLIMATE), 'names only on the x-axis') &&
    has(bad(g => { g.x.names = M.map(m => m + 'anuary'); }, CLIMATE), 'names that run into each other') && FIG.texts(CLIMATE).includes('J'),
    'one name for each tick, needing a step and numbers on, only on the x-axis, short enough not to run into each other, and checked as words', R);
}

// ---------- check_content.mjs --json ----------
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-figures-'));
function problems(points, kind = 'maths', subject = 'Mathematics') {
  const f = path.join(dir, 'in.json');
  fs.writeFileSync(f, JSON.stringify({kind, subject, points}));
  return JSON.parse(spawnSync('node', ['check_content.mjs', '--json', f], {cwd: ROOT, encoding: 'utf8'}).stdout);
}
const point = () => ({title: 'A graph point', remember: 'One line to remember.',
  card: ['The first line of the card.', 'The second line of the card.', 'The third line of the card.'], cardFigs: {2: copy(GOOD)},
  a: {q: 'Which graph is this one?', opts: ['The right one', 'A wrong one', 'Another wrong one', 'A third wrong one'], why: 'Because it is right.', clue: 'Read the card.', fig: copy(GOOD)},
  b: {d: 2, q: 'Which graph shows it?', opts: ['The right one', 'A wrong one', 'Another wrong one', 'A third wrong one'], why: 'Because it is right.', clue: 'Read the card.',
    optFigs: ['x^{2} - 4', 'x^{2} + 4', '4 - x^{2}', 'x^{2}'].map(e => ({kind: 'graph', x: {min: -4, max: 4, step: 2, nums: false}, y: {min: -5, max: 6}, items: [{type: 'fn', expr: e}]}))}});
check(problems({'tst-fig': point()})['tst-fig'].length === 0, 'a point with a card graph, a question graph and graph options passes check_content.mjs --json', R);
const p1 = point(); p1.cardFigs[2].items[3].at = [0, -3];
const p2 = point(); p2.cardFigs = {7: copy(GOOD)}; p2.b.optFigs.pop();
const p3 = point(); p3.b.optFigs[1] = p3.b.optFigs[0];
const p4 = point(); p4.cardFigs[2].items[0].label = 'A crucial curve'; p4.a.fig.alt = 'The parabola y = x^2 - 4, with its vertex at the bottom.';
const out = problems({'tst-a': p1, 'tst-b': p2, 'tst-c': p3, 'tst-d': p4});
check(has(out['tst-a'], 'the figure on card line 2 item 4') && has(out['tst-a'], 'is said to be on f'), 'a figure\'s problem names where it is', R);
check(has(out['tst-b'], 'under card line 7, which the card does not have') && has(out['tst-b'], 'needs four optFigs'), 'cardFigs must name a card line, and optFigs must have four', R);
check(has(out['tst-c'], 'two option graphs that are the same'), 'four option graphs must differ', R);
check(has(out['tst-d'], 'banned word in: A crucial curve') && has(out['tst-d'], 'writes maths as plain text'), 'a figure\'s words go through the word and maths checks', R);
// Two questions with the same words and different graphs are different questions; with the same graphs they are copies.
const twin = (fig) => { const p = point(); p.a.q = 'What does this graph show?'; p.a.fig = fig; p.b.q = 'Another question here?'; return p; };
const other = copy(GOOD); other.items[0].expr = 'x^{2} - 1'; other.items = other.items.slice(0, 1); other.alt = 'The parabola y = x squared minus 1, concave up.';
const differ = problems({'tst-one': twin(copy(GOOD)), 'tst-two': Object.assign(twin(other), {b: Object.assign(point().b, {q: 'A third question here?'})})});
const same = problems({'tst-one': twin(copy(GOOD)), 'tst-two': Object.assign(twin(copy(GOOD)), {b: Object.assign(point().b, {q: 'A third question here?'})})});
check(!has(differ['tst-one'], 'asks the same question') && has(same['tst-one'], 'asks the same question') && has(same['tst-two'], 'asks the same question'),
  'two questions with the same words and different graphs are different; with the same graphs they are copies', R);
check(has(problems({'tst-x': Object.assign(point(), {cardFigs: {2: {kind: 'graph', unreadable: 'Unexpected end of JSON input'}}})})['tst-x'], 'could not be read as JSON'),
  'a figure the writer wrote that is not JSON is named as one', R);
fs.rmSync(dir, {recursive: true, force: true});

// ---------- the pilot chapters ----------
const families = C.MADE_COURSES.find(c => c.id === 'nsw-mat-adv-11').units[0].chapters.find(c => c.id === 'nsw-mat-adv-11-1-2').points;
const price = C.EDEXCEL.units[0].chapters.find(c => c.id === 'x1c4').points;
const figsOf = id => FIG.of(MAT[id] || BANK[id]);
check(families.every(id => figsOf(id).some(w => !w.opt)) && families.some(id => figsOf(id).filter(w => w.opt).length === 4),
  'every point in Families of graphs has a graph, and one question has four graph options', R);
check(price.filter(id => figsOf(id).length).length >= 3 && price.some(id => figsOf(id).filter(w => w.opt).length === 4),
  'Price determination has graphs on three points, and one question has four graph options', R);
check([...families, ...price].every(id => !FIG.pointProblems(MAT[id] || BANK[id]).length), 'every pilot graph passes the check', R);
const surplus = BANK['e-surplus'].a, quad = MAT['mat-quadratic-functions'].b;

// ---------- in v2 ----------
const errsAll = [];
/* Each figure on screen: inside its slide, its labels inside it, and its curves drawn in the text colour. */
const figInfo = (p, sel) => p.locator(sel + ' .fig').evaluateAll(els => els.map(f => {
  const r = f.getBoundingClientRect(), out = [...f.querySelectorAll('.fl')].map(s => s.getBoundingClientRect()).filter(s => s.width)
    .filter(s => s.left < r.left - 2 || s.right > r.right + 2 || s.top < r.top - 2 || s.bottom > r.bottom + 2).length;
  const c = f.querySelector('.fc');
  const outs = [...f.querySelectorAll('.fl')].filter(e => { const s = e.getBoundingClientRect(); return s.width && (s.left < r.left - 2 || s.right > r.right + 2 || s.top < r.top - 2 || s.bottom > r.bottom + 2); }).map(e => e.textContent);
  return {w: r.width, h: r.height, out, outs, role: f.getAttribute('role'), label: f.getAttribute('aria-label'), hidden: f.getAttribute('aria-hidden'),
    paths: f.querySelectorAll('path').length, stroke: c && getComputedStyle(c).stroke, ink: getComputedStyle(f).color, opt: !!f.closest('.opt')};
}));
const noScroll = p => p.evaluate(() => [...document.querySelectorAll('.view, #learnFeed, #feed')].every(e => e.scrollWidth <= e.clientWidth + 1));

for (const scheme of ['light', 'dark']) {
  const {b, p, errs} = await open({w: 360, h: 760, scheme});
  // A point with no graph does no figure work: no figure, and the figure styles never added.
  await tab(p, 'learn');
  check(await p.locator('#learnFeed .fig').count() === 0 && await p.evaluate(() => !document.getElementById('figStyle')),
    'NSW Economics Learn has no graphs and does no figure work (' + scheme + ')', R);
  await b.close();
}
for (const scheme of ['light', 'dark']) {
  // Edexcel, on Price determination (Unit 1, chapter 4): Learn starts there.
  const {b, p, errs} = await open({w: 360, h: 760, scheme, seed: {subject: 'edexcel', picked: 1, c: {edexcel: {cur: 'x1c4', start: 'x1c1'}}}});
  await tab(p, 'learn'); await p.waitForTimeout(200);
  const card = p.locator('#learnFeed .card:not(.endslide)').last();
  check((await card.locator('.ctitle').textContent()) === BANK['e-equilibrium'].title, 'Learn opens Price determination on its first point (' + scheme + ')', R);
  const f1 = await figInfo(p, '#learnFeed .card:not(.endslide)');
  check(f1.length === 2 && f1.every(f => f.role === 'img' && f.paths > 5 && !f.out && f.w > 300) && f1[0].label === BANK['e-equilibrium'].cardFigs[1].alt,
    'its card shows both graphs, each read out by its description, with every label inside it, at 360 px (' + scheme + ')', R);
  check(f1.every(f => f.stroke === f.ink), 'the curves are drawn in the text colour (' + scheme + ')', R);
  check(await noScroll(p), 'nothing scrolls sideways (' + scheme + ')', R);
  if (SHOTS) { await card.locator('.fig').first().scrollIntoViewIfNeeded(); await p.setViewportSize({width: 390, height: 844}); await p.waitForTimeout(200); await shot(p, 'fig-card-' + scheme); await p.setViewportSize({width: 360, height: 760}); }
  await card.locator('.next').click(); await p.waitForTimeout(80);
  await pick(p, '#learnFeed', true);
  await p.locator('#learnFeed .slide.q.done .next').last().click(); await p.waitForTimeout(80);
  // e-surplus: its card's graph, then "Which diagram ...?" with four graphs as options.
  const card2 = p.locator('#learnFeed .card:not(.endslide)').last();
  check((await card2.locator('.ctitle').textContent()) === BANK['e-surplus'].title && await card2.locator('.fig').count() === 1, 'the consumer surplus card has its graph', R);
  await card2.locator('.next').click(); await p.waitForTimeout(150);
  const q = p.locator('#learnFeed .slide.q[data-i="' + await waiting(p, '#learnFeed').getAttribute('data-i') + '"]');
  const opts = await q.locator('.opt').evaluateAll(els => els.map(b => ({r: b.getBoundingClientRect().toJSON(), txt: b.querySelector('.txt').textContent, sr: b.querySelector('.txt').classList.contains('sr'), fig: !!b.querySelector('.fig svg'), hidden: b.querySelector('.fig').getAttribute('aria-hidden')})));
  const cols = new Set(opts.map(o => Math.round(o.r.left))), rows = new Set(opts.map(o => Math.round(o.r.top)));
  check(opts.length === 4 && opts.every(o => o.fig && o.sr && o.hidden === 'true') && cols.size === 2 && rows.size === 2 && opts.every(o => o.r.width > 140),
    'the four options are graphs, two by two, each over 140 px wide at 360 px, with its text kept for screen readers (' + scheme + ')', R);
  check(opts.map(o => o.txt).sort().join('|') === surplus.opts.slice().sort().join('|'), 'each option is named by its text', R);
  const fo = await figInfo(p, '#learnFeed .slide.q:not(.done)');
  check(fo.filter(f => f.opt).every(f => !f.out), 'every label on an option\'s graph fits inside it (' + scheme + ')', R);
  if (SHOTS) { await q.scrollIntoViewIfNeeded(); await p.setViewportSize({width: 390, height: 844}); await p.waitForTimeout(200); await shot(p, 'fig-options-' + scheme); await p.setViewportSize({width: 360, height: 760}); }
  // Answer it by keyboard: the letter of the right graph.
  const n = opts.findIndex(o => o.txt === surplus.opts[0]);
  await p.keyboard.press('abcd'[n]); await p.waitForTimeout(150);
  check(await q.locator('.opt').nth(n).evaluate(b => b.classList.contains('is-right')) && (await q.locator('.note').textContent()).includes('Consumer surplus is what buyers'),
    'pressing the right graph\'s letter answers it, marks it right and shows why (' + scheme + ')', R);
  check(await noScroll(p), 'nothing scrolls sideways with graph options (' + scheme + ')', R);
  errsAll.push(...errs); await b.close();
}

// ---------- maths: a Practice flight with "Which graph shows ...?", tapped; and the point sheet ----------
{
  const ans = Object.fromEntries(families.map(id => [id + 'a', {ok: true, n: 1, t: Date.now() - 86400000}]));
  const seed = {ans, subject: 'nsw-mat-adv-11', picked: 1, c: {'nsw-mat-adv-11': {cur: 'nsw-mat-adv-11-1-2', start: 'nsw-mat-adv-11-1-1'}}};
  for (const scheme of ['light', 'dark']) {
    const {b, p, errs} = await open({w: 360, h: 760, scheme, seed});
    await tab(p, 'practice');
    await p.click('[data-act="start"]'); await p.waitForTimeout(800);
    let found = false;
    for (let i = 0; i < 10 && !found; i++) {
      const s = waiting(p, '#feed');
      if (!(await s.count())) break;
      if (await s.locator('.opts.fopts').count()) { found = true; break; }
      await pick(p, '#feed', true); await p.waitForTimeout(150);
      const nx = p.locator('#feed .slide.q.done .next:visible').last(); if (await nx.count()) { await nx.click(); await p.waitForTimeout(150); }
    }
    check(found, 'a maths Practice flight reaches "Which graph shows ...?" (' + scheme + ')', R);
    if (found) {
      const s = p.locator('#feed .slide.q[data-i="' + await waiting(p, '#feed').getAttribute('data-i') + '"]');
      await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(2500);
      const info = await figInfo(p, '#feed .slide.q:not(.done)');
      if (!(info.length === 4 && info.every(f => f.opt && !f.out && f.w >= 120))) console.log(info);
      check(info.length === 4 && info.every(f => f.opt && !f.out && f.w >= 120), 'its four graphs fit their buttons at 360 px, every label inside (' + scheme + ')', R);
      const drawn = await s.locator('.fig .fl math-span').evaluateAll(els => els.length && els.every(e => !!e.shadowRoot && getComputedStyle(e).visibility === 'visible'));
      check(drawn, 'the roots on each graph are drawn as maths (' + scheme + ')', R);
      const clear = await s.locator('.fig .fl math-span').evaluateAll(els => els.every(e => { const c = getComputedStyle(e); return c.overflowX === 'visible' && c.overflowY === 'visible'; }));
      check(clear, 'maths in a graph\'s label never scrolls or clips, so the bottom of a fraction shows (' + scheme + ')', R);
      if (SHOTS) { await p.setViewportSize({width: 390, height: 844}); await p.waitForTimeout(300); await shot(p, 'fig-maths-' + scheme); await p.setViewportSize({width: 360, height: 760}); }
      const texts = await s.locator('.opt .txt').allTextContents();
      const k = await pick(p, '#feed', true);
      check(k.id === 'mat-quadratic-functionsb' && texts.length === 4, 'tapping the right graph answers it', R);
      check(await s.locator('.opt.is-right').count() === 1 && await s.locator('.opt.is-wrong').count() === 0, 'and marks it right (' + scheme + ')', R);
    }
    // The point sheet shows the card's graph with its labels drawn as maths.
    await p.click('#runX').catch(() => {});
    await tab(p, 'home');
    await p.evaluate(() => { const el = [...document.querySelectorAll('#v-home .ch')].find(c => c.textContent.includes('Families of graphs')); if (el && !el.querySelector('.pt')) el.querySelector('.ch-head').click(); });
    await p.waitForTimeout(100);
    await p.locator('#v-home .ch').filter({hasText: 'Families of graphs'}).locator('.pt').nth(4).click(); await p.waitForTimeout(2500);
    const sheet = await figInfo(p, '#sheetBody');
    const labels = await p.locator('#sheetBody .fig .fl math-span').count();
    if (!(sheet.length === 1 && !sheet[0].out && labels >= 4)) console.log(sheet, labels, await p.locator('#sheetTitle').textContent());
    check(sheet.length === 1 && !sheet[0].out && /^The V-shaped graph y equals the absolute value of x minus 3/.test(sheet[0].label) && !sheet[0].label.includes('\\') && labels >= 4,
      'the point sheet shows the card\'s graph, read out in words, its maths labels drawn, every one inside (' + scheme + ')', R);
    errsAll.push(...errs); await b.close();
  }
}

// ---------- the review page draws graphs as the app does ----------
{
  // The page, its figure code and MathLive, served the way pipeline.py review serves them, with one point to review.
  const {chromium} = await import('playwright');
  const exe = fs.existsSync('/opt/pw-browsers/chromium') ? {executablePath: '/opt/pw-browsers/chromium'} : {};
  const b = await chromium.launch(exe), p = await b.newPage({viewport: {width: 1300, height: 1000}}), errs = [];
  p.on('pageerror', e => errs.push(e.message));
  const page = src('content/review/index.html').replace('{{TOKEN}}', 't'), pt = MAT['mat-quadratic-functions'];
  const item = {course: 'c', id: 'mat-quadratic-functions', courseName: 'Mathematics Advanced, Year 11', unit: 'Functions', chapter: 'Families of graphs', title: pt.title,
    brief: 'Quadratics.', stage: 'review', draft: pt, flags: ['A flag.'], proposalProblems: [], local: []};
  await p.route('http://review.test/**', r => {
    const u = new URL(r.request().url()).pathname;
    if (u === '/') return r.fulfill({body: page, contentType: 'text/html'});
    if (u === '/figure.js') return r.fulfill({body: src('lab/maths.js') + '\n' + src('src/06-figure.js'), contentType: 'text/javascript'});
    if (u.startsWith('/mathlive/')) return r.fulfill({body: fs.readFileSync(path.join(ROOT, 'lab', u.slice(1))), contentType: u.endsWith('.js') ? 'text/javascript' : 'font/woff2'});
    if (u === '/api/items') return r.fulfill({json: {courses: [{counts: {}}], items: [item]}});
    return r.fulfill({json: {}});
  });
  await p.goto('http://review.test/'); await p.waitForTimeout(1500);
  const figs = await p.locator('.fig svg').count(), opts = await p.locator('.optfig .fig').count();
  await p.click('[data-act="edit"]'); await p.waitForTimeout(200);
  const form = await p.evaluate(() => readForm());
  check(figs === 5 && opts === 4 && JSON.stringify(form.cardFigs) === JSON.stringify(pt.cardFigs) && JSON.stringify(form.b.optFigs) === JSON.stringify(pt.b.optFigs) && !errs.length,
    'the review page draws the card graph and each option\'s graph, and its edit form keeps them', R);
  errsAll.push(...errs); await b.close();
}

console.log(R.join('\n'));
console.log('errors:', errsAll.length ? errsAll : 'none');
if (errsAll.length) { console.log('ERRORS after', R.length, 'checks'); process.exitCode = 1; }
process.exit();
