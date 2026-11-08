/* ---------- figures: graphs, charts, diagrams and images ----------
   A point can carry figures in three places:
     cardFigs   on the point: {"2": figure} puts a figure under card line 2 (counting from 1).
     q.fig      on a question: one figure under the question text.
     q.optFigs  on a question: four figures, one for each option, in the same order as opts, for "Which graph shows ...?".
                Each option's text is then its description for screen readers, and the student sees only the figures.
   Every figure has a kind:
     graph      axes with functions, curves, points and shading, drawn from data (below).
     chart      a bar chart, histogram, box plot, dot plot or stem-and-leaf plot, drawn from data (see charts, further down).
     diagram    an SVG drawn for Stratos, stored in pictures/diagrams/ (see pictures, further down).
     image      a photo, artwork, source or map with an open licence, stored in pictures/images/, with a credit under it.

   A graph:
     {"kind": "graph",
      "alt": "What the graph shows, in words, for screen readers. Required, except on an option, where the option's text is it.",
      "x": {"min": -2, "max": 6, "label": "\\(x\\)", "step": 1},       step: a tick every step, with a number at each.
      "y": {"min": -5, "max": 6, "label": "\\(y\\)", "step": 1},       No step: no ticks and no numbers, as economics draws.
                                                                       "nums": false keeps the ticks without numbers.
      "grid": true,                                                     grid lines at each step (needs a step)
      "equal": true,                                                    one unit is as long on both axes (a circle stays round)
      "items": [...]}                                                    drawn in order, so shading goes first
   Items, each with a "type":
     fn         a function of x as LaTeX, as in a point's maths but with no \( \) or "y =": "expr": "x^{2} - 6x + 5".
                "domain": [a, b] limits it. "breaks": [2] stops the line at x = 2, at an asymptote. "id" names it for
                points, shading and checks. "label" (maths markup allowed), "labelAt" (the x where the label sits),
                "pos" (where the label sits from that spot) and "style" ("solid", "dash" or "dot").
     curve      a line or curve through given points, for economics: "points": [[0, 9], [9, 0]]. "smooth": true bends
                it through them (x must rise from point to point). Also id, label, labelAt, pos, style.
     circle     "centre": [3, -2], "r": 5, with id, label, pos and style. Use "equal": true so it stays round. Its label
                sits at its top.
     point      a dot: "at": [3, -4], "label", "pos", "open": true for an open dot. "on": ["f"] names the fn, curve or circle
                it lies on, and "is" says what it is: "x-intercept", "y-intercept", "turning point" or "intersection".
                The content check works out both.
     guide      dashed lines from a point to the axes: "at": [5, 4], "xLabel": "\\(Q^{*}\\)" at the x-axis and
                "yLabel": "\\(P^{*}\\)" at the y-axis. "" draws the line with no label. Leave one out for no line that way.
     shade      a shaded region: "poly": [[x, y], ...]; or "under": "f" (between it and the x-axis) or
                "between": ["d", "s"], each with "span": [a, b]. "label" sits at "at" (or the middle of the region).
                "hatch": true draws lines instead of a tint, to tell two regions apart.
     arrow      a shift: "from": [x, y], "to": [x, y], "label", "pos".
     asymptote  a dashed line: "x": 2 or "y": 1, with an optional "label" ("\\(x = 2\\)") and "pos".
     text       a short label anywhere: "at", "label", "pos".
     slope      a slope field: a short line at each grid point with the gradient dy/dx = "expr", LaTeX in x and y
                ("x - y", "\\frac{x}{y}"). "every": [dx, dy] spaces the lines (the axes' steps by default). "id" names
                it, and a fn with "solves": that id is checked to follow the field (its gradient at each x is expr there).
   pos is one of above, below, left, right, above-left, above-right, below-left, below-right.
   Curves are told apart by their labels, line style and position, never by colour: every graph is drawn in the ink
   colour, and a graph with two or more fns or curves must label each one.

   FIG.html() draws one: an SVG for the lines and HTML on top for the words and numbers, so maths in a label is drawn
   by MathLive (tx in 05-maths-text.js) and stays sharp. The SVG keeps its line widths at any size. FIG.problems() is
   the content check's part: check_content.mjs, the review page and the tests use this same file. Nothing here runs for
   a point with no figure. Functions are read by LabMaths.func (lab/maths.js), never by eval. */
const FIG = (() => {
  'use strict';
  /* The size each figure is laid out at, in CSS pixels. A card or question figure is up to 340 px wide on screen, and
     an option's graph about 140 px, so each is drawn close to the size it shows at. font is the label size. */
  const SIZE = {card: {w: 320, h: 232, font: 12, r: 3.5, n: 260}, opt: {w: 132, h: 110, font: 11, r: 3, n: 140}};
  const POS = ['above', 'below', 'left', 'right', 'above-left', 'above-right', 'below-left', 'below-right'];
  const IS = ['x-intercept', 'y-intercept', 'turning point', 'intersection'];
  const STYLE = ['solid', 'dash', 'dot'];
  const KEYS = {
    fn: ['type', 'id', 'expr', 'domain', 'breaks', 'label', 'labelAt', 'pos', 'style', 'solves'],
    curve: ['type', 'id', 'points', 'smooth', 'label', 'labelAt', 'pos', 'style'],
    circle: ['type', 'id', 'centre', 'r', 'label', 'pos', 'style'],
    point: ['type', 'at', 'label', 'pos', 'open', 'on', 'is'],
    guide: ['type', 'at', 'xLabel', 'yLabel'],
    shade: ['type', 'poly', 'under', 'between', 'span', 'label', 'at', 'hatch'],
    arrow: ['type', 'from', 'to', 'label', 'pos'],
    asymptote: ['type', 'x', 'y', 'label', 'pos'],
    text: ['type', 'at', 'label', 'pos'],
    slope: ['type', 'id', 'expr', 'every']
  };
  const FIGKEYS = ['kind', 'alt', 'x', 'y', 'grid', 'equal', 'items'];
  const AXISKEYS = ['min', 'max', 'label', 'step', 'nums'];
  const num = v => typeof v === 'number' && isFinite(v);
  const pair = v => Array.isArray(v) && v.length === 2 && v.every(num);
  const str = v => typeof v === 'string';

  /* ---------- reading ---------- */
  /* The figures of a point, each with where it is, for the checks: [{at: 'card 2', fig, opt}]. */
  function of(p) {
    const out = [];
    if (!p || typeof p !== 'object') return out;
    const line = l => Array.isArray(l) ? l.join(' ') : String(l || '');
    if (p.cardFigs && typeof p.cardFigs === 'object') for (const [k, f] of Object.entries(p.cardFigs)) out.push({at: 'card line ' + k, fig: f, opt: false, near: line((p.card || [])[k - 1])});
    for (const k of ['a', 'b']) {
      const q = p[k];
      if (!q || typeof q !== 'object') continue;
      if (q.fig !== undefined) out.push({at: k + ' question', fig: q.fig, opt: false, near: String(q.q || '') + ' ' + String(q.why || '')});
      if (Array.isArray(q.optFigs)) q.optFigs.forEach((f, i) => out.push({at: k + ' option ' + (i + 1), fig: f, opt: true, text: (q.opts || [])[i]}));
    }
    return out;
  }
  /* Every piece of text in a figure, for the word and maths checks. */
  function texts(f) {
    if (!f || typeof f !== 'object') return [];
    const out = [f.alt, f.x && f.x.label, f.y && f.y.label, f.key];
    for (const it of Array.isArray(f.items) ? f.items : []) if (it && typeof it === 'object') out.push(it.label, it.xLabel, it.yLabel);
    for (const b of Array.isArray(f.bars) ? f.bars : []) if (Array.isArray(b)) out.push(b[0]);
    for (const s of Array.isArray(f.sets) ? f.sets : []) if (s && typeof s === 'object') out.push(s.label);
    return out.filter(t => str(t) && t !== '');
  }
  /* The same text for the same figure, whatever order its keys were written in: two questions with the same words and
     different graphs are different questions. */
  function key(v) {
    if (Array.isArray(v)) return '[' + v.map(key).join(',') + ']';
    if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + key(v[k])).join(',') + '}';
    return JSON.stringify(v);
  }

  /* ---------- the shape ---------- */
  function shape(f, opt) {
    const bad = [];
    if (!f || typeof f !== 'object' || Array.isArray(f)) return ['is not a figure object'];
    if (f.unreadable !== undefined) return ['could not be read as JSON (' + f.unreadable + '). Write the figure as JSON text, or "" for none'];
    if (f.kind === 'chart') return chartShape(f, opt);
    if (f.kind === 'diagram' || f.kind === 'image') return picShape(f, opt);
    if (f.kind !== 'graph') return ['has kind ' + JSON.stringify(f.kind) + '. Use graph, chart, diagram or image'];
    for (const k of Object.keys(f)) if (!FIGKEYS.includes(k)) bad.push('has a part this format does not have: ' + k);
    if (opt) { if (f.alt !== undefined) bad.push('is an option\'s graph, so the option\'s text is its description. Take out its alt'); }
    else if (!str(f.alt) || f.alt.trim().split(/\s+/).length < 4) bad.push('needs an alt: a description in words of what the graph shows, for screen readers');
    for (const a of ['x', 'y']) {
      const ax = f[a];
      if (!ax || typeof ax !== 'object') { bad.push('has no ' + a + '-axis'); continue; }
      for (const k of Object.keys(ax)) if (!AXISKEYS.includes(k)) bad.push('has a part its ' + a + '-axis does not have: ' + k);
      if (!num(ax.min) || !num(ax.max) || ax.min >= ax.max) bad.push('needs a ' + a + '-axis min smaller than its max');
      if (ax.label !== undefined && !str(ax.label)) bad.push('has a ' + a + '-axis label that is not text');
      if (ax.step !== undefined && !(num(ax.step) && ax.step > 0)) bad.push('needs a ' + a + '-axis step above 0, or none');
      if (ax.nums !== undefined && typeof ax.nums !== 'boolean') bad.push('needs nums to be true or false');
      if (num(ax.step) && num(ax.min) && num(ax.max) && (ax.max - ax.min) / ax.step > 40) bad.push('has more than 40 ticks on its ' + a + '-axis. Use a larger step');
    }
    if (f.grid !== undefined && typeof f.grid !== 'boolean') bad.push('needs grid to be true or false');
    if (f.grid && !(f.x && f.x.step) && !(f.y && f.y.step)) bad.push('has a grid but no step on either axis');
    if (f.equal !== undefined && typeof f.equal !== 'boolean') bad.push('needs equal to be true or false');
    if (!Array.isArray(f.items) || !f.items.length) { bad.push('has no items to draw'); return bad; }
    f.items.forEach((it, n) => {
      const w = 'item ' + (n + 1) + ' ';
      if (!it || typeof it !== 'object' || !KEYS[it.type]) { bad.push(w + 'has no type, or one this format does not have: ' + (it && it.type)); return; }
      for (const k of Object.keys(it)) if (!KEYS[it.type].includes(k)) bad.push(w + '(' + it.type + ') has a part it does not take: ' + k);
      for (const k of ['label', 'xLabel', 'yLabel']) if (it[k] !== undefined && !str(it[k])) bad.push(w + 'has a ' + k + ' that is not text');
      if (it.pos !== undefined && !POS.includes(it.pos)) bad.push(w + 'has pos ' + JSON.stringify(it.pos) + '. Use one of ' + POS.join(', '));
      if (it.style !== undefined && !STYLE.includes(it.style)) bad.push(w + 'has style ' + JSON.stringify(it.style) + '. Use solid, dash or dot');
      if (it.id !== undefined && !(str(it.id) && /^[A-Za-z][\w-]*$/.test(it.id))) bad.push(w + 'has an id that is not a short name');
      if (it.labelAt !== undefined && !num(it.labelAt)) bad.push(w + 'has a labelAt that is not a number');
      for (const k of ['open', 'smooth', 'hatch']) if (it[k] !== undefined && typeof it[k] !== 'boolean') bad.push(w + 'needs ' + k + ' to be true or false');
      const t = it.type;
      if (t === 'fn') {
        if (!str(it.expr)) bad.push(w + 'needs an expr');
        if (it.domain !== undefined && !(pair(it.domain) && it.domain[0] < it.domain[1])) bad.push(w + 'needs a domain of [from, to], from smaller');
        if (it.breaks !== undefined && !(Array.isArray(it.breaks) && it.breaks.every(num))) bad.push(w + 'needs breaks to be a list of numbers');
      }
      if (t === 'slope') {
        if (!str(it.expr)) bad.push(w + 'needs an expr: dy/dx in x and y');
        if (it.every !== undefined && !(pair(it.every) && it.every[0] > 0 && it.every[1] > 0)) bad.push(w + 'needs every to be [dx, dy], both above 0');
        if (it.every === undefined && !(f.x && f.x.step && f.y && f.y.step)) bad.push(w + 'needs every: [dx, dy], or a step on both axes');
      }
      if (t === 'fn' && it.solves !== undefined && !str(it.solves)) bad.push(w + 'needs solves to be the id of a slope field');
      if (t === 'circle' && !(pair(it.centre) && num(it.r) && it.r > 0)) bad.push(w + 'needs a centre [x, y] and a radius r above 0');
      if (t === 'curve' && !(Array.isArray(it.points) && it.points.length >= 2 && it.points.every(pair))) bad.push(w + 'needs at least two points, each [x, y]');
      if (['point', 'guide', 'text'].includes(t) && !pair(it.at)) bad.push(w + 'needs at: [x, y]');
      if (t === 'shade' && it.at !== undefined && !pair(it.at)) bad.push(w + 'needs at: [x, y] for its label');
      if (t === 'text' && !str(it.label)) bad.push(w + 'needs a label');
      if (t === 'point') {
        if (it.on !== undefined && !(Array.isArray(it.on) && it.on.length && it.on.every(str))) bad.push(w + 'needs on to be a list of fn or curve ids');
        if (it.is !== undefined && !IS.includes(it.is)) bad.push(w + 'has is ' + JSON.stringify(it.is) + '. Use one of ' + IS.join(', '));
      }
      if (t === 'guide' && it.xLabel === undefined && it.yLabel === undefined) bad.push(w + 'needs an xLabel or a yLabel ("" for a line with no label)');
      if (t === 'arrow' && !(pair(it.from) && pair(it.to))) bad.push(w + 'needs from and to, each [x, y]');
      if (t === 'asymptote' && (num(it.x) === num(it.y))) bad.push(w + 'needs either x or y');
      if (t === 'shade') {
        const ways = [it.poly !== undefined, it.under !== undefined, it.between !== undefined].filter(Boolean).length;
        if (ways !== 1) bad.push(w + 'needs exactly one of poly, under and between');
        if (it.poly !== undefined && !(Array.isArray(it.poly) && it.poly.length >= 3 && it.poly.every(pair))) bad.push(w + 'needs poly to be at least three points, each [x, y]');
        if (it.under !== undefined && !str(it.under)) bad.push(w + 'needs under to be a fn or curve id');
        if (it.between !== undefined && !(Array.isArray(it.between) && it.between.length === 2 && it.between.every(str))) bad.push(w + 'needs between to be two fn or curve ids');
        if ((it.under !== undefined || it.between !== undefined) && !(pair(it.span) && it.span[0] < it.span[1])) bad.push(w + 'needs a span of [from, to], from smaller');
      }
    });
    return bad;
  }

  /* ---------- the maths behind a graph ---------- */
  /* Each fn or curve as a function of x: y, or NaN outside where it is drawn. A curve whose x does not rise from point to
     point (a vertical supply curve) has none, and is only drawn. */
  function lines(f) {
    const out = {};
    for (const it of f.items) {
      if (it.type === 'fn') {
        const g = typeof LabMaths !== 'undefined' ? LabMaths.func(it.expr) : null;
        const d = it.domain || [-Infinity, Infinity];
        out[it.id || '#' + f.items.indexOf(it)] = {it: it, y: g ? (x => x < d[0] - 1e-9 || x > d[1] + 1e-9 ? NaN : g(x)) : null, ok: !!g};
      } else if (it.type === 'curve') {
        const ps = it.points, rising = ps.every((q, i) => !i || q[0] > ps[i - 1][0]);
        out[it.id || '#' + f.items.indexOf(it)] = {it: it, y: rising ? curveY(ps, it.smooth) : null, ok: true, pts: ps};
      } else if (it.type === 'circle') out[it.id || '#' + f.items.indexOf(it)] = {it: it, y: null, ok: true, circle: true};
    }
    return out;
  }
  /* y on a curve through points: straight between them, or a smooth curve that never overshoots (Fritsch and Carlson's
     monotone cubic), so a smooth demand curve keeps falling. */
  function curveY(ps, smooth) {
    const n = ps.length, xs = ps.map(q => q[0]), ys = ps.map(q => q[1]);
    let m = null;
    if (smooth && n > 2) {
      const d = xs.slice(1).map((x, i) => (ys[i + 1] - ys[i]) / (x - xs[i]));
      m = ys.map((_, i) => i === 0 ? d[0] : i === n - 1 ? d[n - 2] : d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2);
      for (let i = 0; i < n - 1; i++) {
        if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
        const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
        if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
      }
    }
    return x => {
      if (x < xs[0] - 1e-9 || x > xs[n - 1] + 1e-9) return NaN;
      let i = 0;
      while (i < n - 2 && x > xs[i + 1]) i++;
      const h = xs[i + 1] - xs[i], t = Math.min(1, Math.max(0, (x - xs[i]) / h));
      if (!m) return ys[i] + t * (ys[i + 1] - ys[i]);
      const t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * ys[i + 1] + (t3 - t2) * h * m[i + 1];
    };
  }
  /* A slope field's gradient dy/dx at (x, y), from LaTeX in x and y. y is put in as a number in brackets, and the Maths
     Lab's reader reads what is left as a function of x, so nothing is run as code. Null when it cannot be read. */
  function slopeFn(expr) {
    if (typeof LabMaths === 'undefined' || !str(expr) || /[a-wzA-Z]/.test(expr.replace(/\\[a-zA-Z]+/g, ''))) return null;
    const cache = new Map();
    const at = y => {
      const k = (Math.abs(y) < 1e-12 ? 0 : y).toFixed(9);
      if (!cache.has(k)) { if (cache.size > 400) cache.clear(); cache.set(k, LabMaths.func(expr.replace(/\\[a-zA-Z]+|y/g, m => m === 'y' ? '(' + k + ')' : m))); }
      return cache.get(k);
    };
    if (!at(1) || !at(-0.5)) return null;
    return (x, y) => { const g = at(y); return g ? g(x) : NaN; };
  }
  /* A number written in a label, such as 3, -4, 2.5 or \frac{1}{2}, as a number, or NaN. */
  function labelNum(s) {
    s = String(s).replace(/\\\(|\\\)/g, '').replace(/\\left|\\right/g, '').replace(/\{,\}/g, '').replace(/−/g, '-').trim();
    if (!s || /[a-wyzA-Z]/.test(s.replace(/\\(frac|sqrt|dfrac)/g, ''))) return NaN;
    return typeof LabMaths !== 'undefined' ? LabMaths.number(s) : NaN;
  }
  /* The coordinates written in a label, such as \((3, -4)\) or A\((0, 5)\), or null. */
  function labelPair(s) {
    const t = String(s).replace(/\\\(|\\\)/g, '').replace(/\\left|\\right/g, '');
    const m = /\(\s*([^(),]+?)\s*,\s*([^(),]+?)\s*\)/.exec(t);
    if (!m) return null;
    const p = [labelNum(m[1]), labelNum(m[2])];
    return p.every(isFinite) ? p : null;
  }
  /* How far off a written number may be: half its last decimal place, at least a little. */
  const roundTol = (s, v) => { const d = /\.(\d+)/.exec(String(s)); return Math.max(d ? 0.5 * Math.pow(10, -d[1].length) : 0, 1e-6 * Math.max(1, Math.abs(v))) + 1e-9; };

  /* ---------- laying it out ---------- */
  const cw = font => font * 0.62;          /* a character's width, near enough, for Hanken Grotesk */
  /* A label's width as shown: maths markup counts its letters, not its commands. */
  const shownLen = s => String(s).replace(/\\\(|\\\)/g, '').replace(/\\(frac|dfrac)\{([^{}]*)\}\{([^{}]*)\}/g, '$2$3').replace(/\\[a-zA-Z]+/g, 'x').replace(/[{}^_]/g, '').length;
  const fmt = v => { const r = Math.round(v * 1000) / 1000; return (r < 0 ? '−' : '') + String(Math.abs(r)); };
  function ticks(ax) {
    if (!ax.step) return [];
    const out = [], k0 = Math.ceil(ax.min / ax.step - 1e-9), k1 = Math.floor(ax.max / ax.step + 1e-9);
    for (let k = k0; k <= k1; k++) out.push(Math.round(k * ax.step * 1e9) / 1e9);
    return out;
  }
  function layout(f, size) {
    const S = SIZE[size], x = f.x, y = f.y, fw = S.font;
    const axX = x.min <= 0 && x.max >= 0 ? 0 : x.min > 0 ? x.min : x.max;      /* where the y-axis stands */
    const axY = y.min <= 0 && y.max >= 0 ? 0 : y.min > 0 ? y.min : y.max;      /* where the x-axis lies */
    const guides = f.items.filter(it => it.type === 'guide');
    const yNums = y.step && y.nums !== false, xNums = x.step && x.nums !== false;
    const leftWords = [].concat(yNums ? ticks(y).map(fmt) : [], guides.map(g => g.yLabel || ''));
    const left = axX === x.min && leftWords.some(Boolean) ? Math.max(...leftWords.map(s => shownLen(s) * cw(fw))) + 9 : 10;
    const below = axY === y.min && (xNums || guides.some(g => g.xLabel) || x.label) ? fw + 9 : 10;
    const top = y.label ? fw + 11 : 10, right = 12;
    const W = S.w;
    let H = S.h;
    if (f.equal) H = Math.round(top + below + (W - left - right) * (y.max - y.min) / (x.max - x.min));
    const pw = W - left - right, ph = H - top - below;
    return {S, W, H, left, top, pw, ph, axX, axY, fw,
      px: v => left + (v - x.min) / (x.max - x.min) * pw,
      py: v => top + (y.max - v) / (y.max - y.min) * ph};
  }
  /* Where a label sits from its spot, as a move in its own width and height, and a gap in pixels. */
  const PLACE = {centre: [-0.5, -0.5, 0, 0], above: [-0.5, -1, 0, -1], below: [-0.5, 0, 0, 1], left: [-1, -0.5, -1, 0], right: [0, -0.5, 1, 0],
    'above-left': [-1, -1, -1, -1], 'above-right': [0, -1, 1, -1], 'below-left': [-1, 0, -1, 1], 'below-right': [0, 0, 1, 1]};
  /* A label's box in layout pixels, from its estimated size, to check it fits. */
  function box(L, wd) {
    const fw = wd.cls === 'fn' ? L.fw - 1 : L.fw, w = shownLen(wd.text) * cw(fw), h = fw * 1.25, g = PLACE[wd.pos];
    const l = wd.sx + g[0] * w + g[2] * wd.gap, t = wd.sy + g[1] * h + g[3] * wd.gap;
    return {l, t, r: l + w, b: t + h};
  }

  /* Everything to draw: lines for the SVG and words for the HTML on top, in layout pixels. */
  function plan(f, size) {
    const L = layout(f, size), {px, py, S} = L, x = f.x, y = f.y;
    const F = lines(f), svg = [], words = [];
    /* a word on top, at a spot given in the graph's numbers, in layout pixels */
    const word = (vx, vy, text, pos, cls) => words.push({sx: px(vx), sy: py(vy), text: text, pos: pos || 'above-right', cls: cls || '', gap: 4});
    const xs = (x.max - x.min), ys = (y.max - y.min);
    const P = (vx, vy) => [px(vx), py(vy)];
    const d = pts => pts.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join('');
    /* A function's line in pieces: it stops at breaks, where it has no value, and where it jumps off the top and back
       in at the bottom (an asymptote that has no break written). Values far off the graph are held just off it. */
    function trace(fy, a, b, breaks) {
      const cuts = [a].concat((breaks || []).filter(c => c > a && c < b).sort((p, q) => p - q), [b]), parts = [];
      const lo = y.min - ys, hi = y.max + ys;
      for (let k = 0; k + 1 < cuts.length; k++) {
        const e = (cuts[k + 1] - cuts[k]) * 1e-6, from = cuts[k] + (k ? e : 0), to = cuts[k + 1] - (k + 2 < cuts.length ? e : 0);
        let cur = [], prev = null;
        for (let i = 0; i <= S.n; i++) {
          const vx = from + (to - from) * i / S.n, vy = fy(vx);
          if (!isFinite(vy)) { if (cur.length > 1) parts.push(cur); cur = []; prev = null; continue; }
          if (prev !== null && ((prev > hi && vy < lo) || (prev < lo && vy > hi))) { if (cur.length > 1) parts.push(cur); cur = []; }
          cur.push([vx, Math.max(lo, Math.min(hi, vy))]); prev = vy;
        }
        if (cur.length > 1) parts.push(cur);
      }
      return parts;
    }
    const traced = {};
    for (const [id, c] of Object.entries(F)) {
      if (c.it.type === 'fn') {
        const dm = c.it.domain || [x.min, x.max];
        traced[id] = c.ok ? trace(c.y, Math.max(x.min, dm[0]), Math.min(x.max, dm[1]), c.it.breaks) : [];
      } else if (c.circle) {
        const [h, k] = c.it.centre, r = c.it.r, n = S.n;
        traced[id] = [Array.from({length: n + 1}, (_, i) => [h + r * Math.cos(2 * Math.PI * i / n), k + r * Math.sin(2 * Math.PI * i / n)])];
      } else traced[id] = c.y && c.it.smooth ? trace(c.y, c.pts[0][0], c.pts[c.pts.length - 1][0]) : [c.pts];
    }
    /* the region of a shade, as points */
    function region(it) {
      if (it.poly) return it.poly;
      /* along the first curve, then back along the second, or along the x-axis for under */
      const [a, b] = it.span, n = 80, out = [];
      const ids = it.under ? [it.under] : it.between, f1 = F[ids[0]] && F[ids[0]].y, f2 = it.under ? (() => Math.max(y.min, Math.min(y.max, 0))) : F[ids[1]] && F[ids[1]].y;
      if (!f1 || !f2) return [];
      for (let i = 0; i <= n; i++) { const v = a + (b - a) * i / n; out.push([v, f1(v)]); }
      for (let i = n; i >= 0; i--) { const v = a + (b - a) * i / n; out.push([v, f2(v)]); }
      return out.filter(q => isFinite(q[1])).map(q => [q[0], Math.max(y.min - ys, Math.min(y.max + ys, q[1]))]);
    }
    /* grid, then axes */
    if (f.grid) {
      for (const t of ticks(x)) svg.push(['path', 'fg', 'M' + px(t).toFixed(1) + ' ' + L.top + 'V' + (L.top + L.ph).toFixed(1)]);
      for (const t of ticks(y)) svg.push(['path', 'fg', 'M' + L.left + ' ' + py(t).toFixed(1) + 'H' + (L.left + L.pw).toFixed(1)]);
    }
    const ax = px(L.axX), ay = py(L.axY), tk = 4;
    for (const it of f.items) if (it.type === 'shade') {
      const r = region(it);
      if (r.length > 2) svg.push(['path', it.hatch ? 'fh' : 'fs', d(r.map(q => P(q[0], q[1]))) + 'Z', true]);
    }
    svg.push(['path', 'fa', 'M' + L.left + ' ' + ay.toFixed(1) + 'H' + (L.left + L.pw + 6).toFixed(1)]);
    svg.push(['path', 'fa', 'M' + ax.toFixed(1) + ' ' + (L.top + L.ph).toFixed(1) + 'V' + (L.top - 6).toFixed(1)]);
    svg.push(['path', 'fk', 'M' + (L.left + L.pw + 6).toFixed(1) + ' ' + ay.toFixed(1) + 'l-6 -3.2v6.4z']);
    svg.push(['path', 'fk', 'M' + ax.toFixed(1) + ' ' + (L.top - 6).toFixed(1) + 'l-3.2 6h6.4z']);
    const crossX = L.axX === 0 && x.min < 0, crossY = L.axY === 0 && y.min < 0, xNums = x.step && x.nums !== false, yNums = y.step && y.nums !== false;
    const xLabW = x.label ? shownLen(x.label) * cw(L.fw) + 6 : 0;
    for (const t of ticks(x)) {
      if (Math.abs(t - L.axX) < 1e-9 && (crossX || crossY || L.axX === x.min)) continue;
      svg.push(['path', 'fa', 'M' + px(t).toFixed(1) + ' ' + (ay - tk / 2).toFixed(1) + 'v' + tk]);
      if (x.nums !== false && px(t) + cw(L.fw - 1) * fmt(t).length / 2 < L.left + L.pw - xLabW) word(t, L.axY, fmt(t), 'below', 'fn');
    }
    for (const t of ticks(y)) {
      if (Math.abs(t - L.axY) < 1e-9 && (crossX || crossY || L.axY === y.min)) continue;
      svg.push(['path', 'fa', 'M' + (ax - tk / 2).toFixed(1) + ' ' + py(t).toFixed(1) + 'h' + tk]);
      if (y.nums !== false) word(L.axX, t, fmt(t), 'left', 'fn');
    }
    /* O marks the origin, unless numbers on the axes would run into it. A small graph, an option's, has none. */
    if (size === 'card' && L.axX === 0 && L.axY === 0 && !(xNums && crossX) && !(yNums && crossY)) word(0, 0, 'O', 'below-left', 'fn');
    /* the x-axis's name under its end, and the y-axis's name above its top, beside the arrow */
    if (x.label) words.push({sx: L.left + L.pw + 6, sy: ay, text: x.label, pos: 'below-left', cls: 'fx', gap: 4});
    if (y.label) words.push({sx: ax + 6, sy: L.top - 4, text: y.label, pos: 'above-right', cls: 'fx', gap: 0});
    /* guides, asymptotes, lines and curves */
    for (const it of f.items) {
      if (it.type === 'guide') {
        const [gx, gy] = it.at;
        if (it.xLabel !== undefined) { svg.push(['path', 'fd', 'M' + px(gx).toFixed(1) + ' ' + py(gy).toFixed(1) + 'V' + ay.toFixed(1)]); if (it.xLabel) word(gx, L.axY, it.xLabel, 'below'); }
        if (it.yLabel !== undefined) { svg.push(['path', 'fd', 'M' + px(gx).toFixed(1) + ' ' + py(gy).toFixed(1) + 'H' + ax.toFixed(1)]); if (it.yLabel) word(L.axX, gy, it.yLabel, 'left'); }
      } else if (it.type === 'asymptote') {
        if (num(it.x)) { svg.push(['path', 'fy', 'M' + px(it.x).toFixed(1) + ' ' + L.top + 'V' + (L.top + L.ph).toFixed(1)]); if (it.label) word(it.x, y.max, it.label, it.pos || 'below-right'); }
        else { svg.push(['path', 'fy', 'M' + L.left + ' ' + py(it.y).toFixed(1) + 'H' + (L.left + L.pw).toFixed(1)]); if (it.label) word(x.max, it.y, it.label, it.pos || 'above-left'); }
      }
    }
    /* slope fields: a short line through each grid point, at the gradient there */
    for (const it of f.items) if (it.type === 'slope') {
      const g = slopeFn(it.expr), [ex, ey] = it.every || [x.step, y.step];
      if (!g || !ex || !ey) continue;
      const kx = L.pw / xs, ky = L.ph / ys, len = Math.min(ex * kx, ey * ky) * 0.62;
      for (let i = Math.ceil(x.min / ex - 1e-9); i * ex <= x.max + 1e-9; i++) for (let j = Math.ceil(y.min / ey - 1e-9); j * ey <= y.max + 1e-9; j++) {
        const vx = i * ex, vy = j * ey, m = g(vx, vy);
        if (Number.isNaN(m)) continue;
        let ux = kx, uy = -m * ky;
        if (!isFinite(m)) { ux = 0; uy = 1; }
        const n = Math.hypot(ux, uy) || 1, hx = ux / n * len / 2, hy = uy / n * len / 2, [cx, cy] = P(vx, vy);
        svg.push(['path', 'fsl', 'M' + (cx - hx).toFixed(1) + ' ' + (cy - hy).toFixed(1) + 'L' + (cx + hx).toFixed(1) + ' ' + (cy + hy).toFixed(1), true]);
      }
    }
    const curvePx = [];
    for (const [id, c] of Object.entries(F)) {
      const it = c.it, parts = traced[id], cls = 'fc' + (it.style === 'dash' ? ' dash' : it.style === 'dot' ? ' dot' : '');
      for (const part of parts) { const pts = part.map(q => P(q[0], q[1])); curvePx.push(pts); svg.push(['path', cls, d(pts)]); }
      if (it.label) {
        let spot = null;
        if (num(it.labelAt) && c.y) { const v = c.y(it.labelAt); if (isFinite(v)) spot = [it.labelAt, v]; }
        if (c.circle) spot = [it.centre[0], it.centre[1] + it.r];
        if (!spot) {
          const vis = parts.flat().filter(q => q[0] >= x.min && q[0] <= x.max && q[1] >= y.min && q[1] <= y.max);
          if (vis.length) spot = vis[vis.length - 1];
        }
        if (spot) word(spot[0], spot[1], it.label, it.pos || (c.circle ? 'above' : 'above-left'));
      }
    }
    /* shade labels, arrows, points and text on top */
    for (const it of f.items) {
      if (it.type === 'shade' && it.label) {
        let at = it.at;
        if (!at) { const r = region(it); if (r.length) at = [r.reduce((s, q) => s + q[0], 0) / r.length, r.reduce((s, q) => s + q[1], 0) / r.length]; }
        if (at) words.push({sx: px(at[0]), sy: py(at[1]), text: it.label, pos: 'centre', cls: 'fr', gap: 0});
      } else if (it.type === 'arrow') {
        const [a, b] = [P(...it.from), P(...it.to)], len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len, h = 7, w = 3.6;
        svg.push(['path', 'fw', 'M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + 'L' + (b[0] - ux * h).toFixed(1) + ' ' + (b[1] - uy * h).toFixed(1)]);
        svg.push(['path', 'fk', 'M' + b[0].toFixed(1) + ' ' + b[1].toFixed(1) + 'L' + (b[0] - ux * h - uy * w).toFixed(1) + ' ' + (b[1] - uy * h + ux * w).toFixed(1) + 'L' + (b[0] - ux * h + uy * w).toFixed(1) + ' ' + (b[1] - uy * h - ux * w).toFixed(1) + 'Z']);
        if (it.label) word((it.from[0] + it.to[0]) / 2, (it.from[1] + it.to[1]) / 2, it.label, it.pos || 'above');
      } else if (it.type === 'point') {
        svg.push(['circle', it.open ? 'fo' : 'fp', P(...it.at)]);
        if (it.label) word(it.at[0], it.at[1], it.label, it.pos || 'above-right');
      } else if (it.type === 'text') word(it.at[0], it.at[1], it.label, it.pos || 'above-right');
    }
    return {L, svg, words, curves: curvePx};
  }

  /* ---------- charts ----------
     A chart is drawn from data, like a graph, and the content check works out again everything the data fixes.
     {"kind": "chart", "chart": "bar", "alt": "...", ...}, where chart is one of:
       bar        "bars": [["Soccer", 7], ["Tennis", 3]], a label and a value each. "y" is an axis as a graph's, with a step,
                  starting at 0 ("truncated": true lets it start higher, for a point about misleading graphs). "x" takes only
                  a label: {"label": "Sport"}. Stats: total, mode (the label of the tallest bar).
       histogram  "classes": [[0, 10, 3], [10, 20, 7]], from, to and count each, touching and of equal width, on "x" and "y"
                  axes with steps. Stats: n, mean (worked out from the middle of each class).
       box        "sets": [{"label": "Route 1", "data": [...]}], or {"label": ..., "five": [min, Q1, median, Q3, max]}, one to
                  three, drawn across an "x" axis with a step. "outliers": true shows values more than 1.5 IQR beyond the
                  box as dots, with the whiskers stopping at the last value inside (it needs data). Stats (one set): min, q1,
                  median, q3, max, iqr, range, and n and mean when it has data.
       dot        "data": [...] on an "x" axis with a step, one dot for each value, stacked. Stats: n, mean, median, mode,
                  range, min, max, q1, q3, iqr.
       stem       "data": [...], or "sets": two {"label", "data"} for a back-to-back plot. "leaf": the place value of a leaf
                  (1 by default, 0.1 for one decimal place) and "key": "2 | 3 means 23". Stats as a dot plot (one set).
     "stats": {"median": 23, ...} lists values the point's text states, and each must match the data. The check also reads
     the text beside the chart (its card line, or its question and why) for "the median is 23", "Q1 = 12", "IQR = 8" and
     the like, and holds each to the data. Quartiles are the medians of the lower and upper halves, leaving out the median
     when there is an odd number of values, as the point on the five-number summary says. */
  const CHART_KEYS = {
    bar: ['kind', 'chart', 'alt', 'x', 'y', 'bars', 'truncated', 'stats'],
    histogram: ['kind', 'chart', 'alt', 'x', 'y', 'classes', 'stats'],
    box: ['kind', 'chart', 'alt', 'x', 'sets', 'outliers', 'stats'],
    dot: ['kind', 'chart', 'alt', 'x', 'data', 'stats'],
    stem: ['kind', 'chart', 'alt', 'data', 'sets', 'leaf', 'key', 'stats']
  };
  const STAT_NAMES = ['n', 'total', 'mean', 'median', 'mode', 'range', 'min', 'max', 'q1', 'q3', 'iqr'];
  const LEAVES = [10, 1, 0.1, 0.01];
  const nums = (v, least) => Array.isArray(v) && v.length >= least && v.every(num);
  const sorted = a => a.slice().sort((p, q) => p - q);
  const med = a => { const n = a.length, m = n >> 1; return !n ? NaN : n % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
  /* Everything a list of numbers fixes: the five-number summary, the mean, the mode or modes (none when no value repeats). */
  function summary(data) {
    const a = sorted(data), n = a.length, h = n >> 1, total = a.reduce((s, v) => s + v, 0);
    const q1 = med(a.slice(0, h)), q3 = med(a.slice(n % 2 ? h + 1 : h));
    const count = new Map();
    for (const v of a) count.set(v, (count.get(v) || 0) + 1);
    const most = Math.max(...count.values());
    return {n, total, mean: total / n, median: med(a), mode: most > 1 ? [...count].filter(e => e[1] === most).map(e => e[0]) : [],
      min: a[0], max: a[n - 1], range: a[n - 1] - a[0], q1, q3, iqr: q3 - q1};
  }
  /* The five numbers a box plot draws for one set, with the outliers and the whisker ends. */
  function boxOf(s, outliers) {
    if (s.five) return {five: s.five, lo: s.five[0], hi: s.five[4], out: []};
    const m = summary(s.data), fence = [m.q1 - 1.5 * m.iqr, m.q3 + 1.5 * m.iqr];
    const inside = outliers ? s.data.filter(v => v >= fence[0] && v <= fence[1]) : s.data;
    return {five: [m.min, m.q1, m.median, m.q3, m.max], lo: Math.min(...inside), hi: Math.max(...inside), out: outliers ? s.data.filter(v => v < fence[0] || v > fence[1]) : []};
  }
  /* The values a chart's data fixes, by stat name, for a chart with one set of data. */
  function chartStats(f) {
    if (f.chart === 'bar') { const most = Math.max(...f.bars.map(b => b[1])); return {total: f.bars.reduce((s, b) => s + b[1], 0), mode: f.bars.filter(b => b[1] === most).map(b => b[0])}; }
    if (f.chart === 'histogram') { const n = f.classes.reduce((s, c) => s + c[2], 0); return {n, mean: f.classes.reduce((s, c) => s + (c[0] + c[1]) / 2 * c[2], 0) / n}; }
    if (f.chart === 'box') {
      if (f.sets.length !== 1) return null;
      const s = f.sets[0];
      if (s.data) return summary(s.data);
      const [a, q1, m, q3, b] = s.five;
      return {min: a, q1, median: m, q3, max: b, iqr: q3 - q1, range: b - a};
    }
    if (f.chart === 'stem' && f.sets) return null;
    return summary(f.data);
  }
  /* A stated value against the one the data fixes. Words are matched ignoring capitals. */
  function statWrong(name, said, real) {
    if (real === undefined) return 'cannot be worked out from this chart';
    if (name === 'mode') {
      const want = (Array.isArray(real) ? real : [real]).map(v => String(v).toLowerCase()).sort();
      const got = (Array.isArray(said) ? said : [said]).map(v => String(v).toLowerCase()).sort();
      if (!want.length) return 'has no mode: no value comes up more than once';
      return got.join(', ') === want.join(', ') ? '' : 'is ' + want.join(' and ') + (want.length > 1 ? ' (every mode)' : '');
    }
    return typeof said === 'number' && Math.abs(said - real) <= roundTol(String(said), real) ? '' : 'is ' + +real.toFixed(4);
  }
  /* Values a piece of text states about data, such as "the median is 23", "\(Q_{1} = 12\)" or "IQR = 8", as
     [stat name, the number as written]. "about" before the number leaves it out, as an estimate. */
  const STAT_WORDS = {'interquartile range': 'iqr', iqr: 'iqr', 'lower quartile': 'q1', 'upper quartile': 'q3', q1: 'q1', q3: 'q3', median: 'median', mean: 'mean', average: 'mean', mode: 'mode', range: 'range', minimum: 'min', maximum: 'max'};
  function statedIn(text) {
    const t = String(text || '').replace(/\\\(|\\\)/g, ' ').replace(/Q_\{?([13])\}?/g, 'Q$1').replace(/\\text\{([^{}]*)\}/g, '$1').replace(/[{}]/g, '').toLowerCase();
    const out = [], re = /\b(interquartile range|iqr|lower quartile|upper quartile|q1|q3|median|mean|average|mode|range|minimum|maximum)\s+(?:is|was|=|equals|of)\s+(about\s+|approximately\s+)?(−?-?\d+(?:,\d{3})*(?:\.\d+)?)\b/g;
    let m;
    while ((m = re.exec(t))) if (!m[2]) out.push([STAT_WORDS[m[1]], m[3].replace(/,/g, '').replace('−', '-')]);
    return out;
  }
  function axisShape(ax, a, numeric) {
    const bad = [];
    if (!ax || typeof ax !== 'object') return ['has no ' + a + '-axis'];
    if (!numeric) {
      for (const k of Object.keys(ax)) if (k !== 'label') bad.push('has a part its ' + a + '-axis does not take here: ' + k + '. This axis has only a label');
      if (ax.label !== undefined && !str(ax.label)) bad.push('has a ' + a + '-axis label that is not text');
      return bad;
    }
    for (const k of Object.keys(ax)) if (!AXISKEYS.includes(k)) bad.push('has a part its ' + a + '-axis does not have: ' + k);
    if (!num(ax.min) || !num(ax.max) || ax.min >= ax.max) bad.push('needs a ' + a + '-axis min smaller than its max');
    if (!(num(ax.step) && ax.step > 0)) bad.push('needs a ' + a + '-axis step above 0');
    else if (num(ax.min) && num(ax.max) && (ax.max - ax.min) / ax.step > 30) bad.push('has more than 30 ticks on its ' + a + '-axis. Use a larger step');
    if (ax.label !== undefined && !str(ax.label)) bad.push('has a ' + a + '-axis label that is not text');
    if (ax.nums !== undefined && typeof ax.nums !== 'boolean') bad.push('needs nums to be true or false');
    return bad;
  }
  function chartShape(f, opt) {
    const c = f.chart, keys = CHART_KEYS[c];
    if (!keys) return ['is a chart, so it needs chart: one of ' + Object.keys(CHART_KEYS).join(', ')];
    const bad = [];
    for (const k of Object.keys(f)) if (!keys.includes(k)) bad.push('has a part a ' + c + ' chart does not have: ' + k);
    if (opt) { if (f.alt !== undefined) bad.push('is an option\'s chart, so the option\'s text is its description. Take out its alt'); }
    else if (!str(f.alt) || f.alt.trim().split(/\s+/).length < 4) bad.push('needs an alt: a description in words of what the chart shows, for screen readers');
    if (c === 'bar') {
      bad.push(...axisShape(f.x, 'x', false), ...axisShape(f.y, 'y', true));
      if (!Array.isArray(f.bars) || f.bars.length < 2 || f.bars.length > 12 || !f.bars.every(b => Array.isArray(b) && b.length === 2 && str(b[0]) && b[0].trim() && num(b[1]) && b[1] >= 0)) bad.push('needs bars: 2 to 12 of [label, value], each value 0 or more');
      else if (new Set(f.bars.map(b => b[0])).size !== f.bars.length) bad.push('has two bars with the same label');
      if (f.truncated !== undefined && typeof f.truncated !== 'boolean') bad.push('needs truncated to be true or false');
    }
    if (c === 'histogram') {
      bad.push(...axisShape(f.x, 'x', true), ...axisShape(f.y, 'y', true));
      if (!Array.isArray(f.classes) || f.classes.length < 2 || f.classes.length > 20 || !f.classes.every(k => nums(k, 3) && k.length === 3 && k[0] < k[1] && Number.isInteger(k[2]) && k[2] >= 0)) bad.push('needs classes: 2 to 20 of [from, to, count], from smaller, each count a whole number');
    }
    if (c === 'box') {
      bad.push(...axisShape(f.x, 'x', true));
      if (!Array.isArray(f.sets) || f.sets.length < 1 || f.sets.length > 3) bad.push('needs sets: one to three of {"label", "data"} or {"label", "five"}');
      else f.sets.forEach((s, i) => {
        const w = 'set ' + (i + 1) + ' ';
        if (!s || typeof s !== 'object') { bad.push(w + 'is not an object'); return; }
        for (const k of Object.keys(s)) if (!['label', 'data', 'five'].includes(k)) bad.push(w + 'has a part it does not take: ' + k);
        if ((s.data !== undefined) === (s.five !== undefined)) bad.push(w + 'needs exactly one of data and five');
        if (s.data !== undefined && !nums(s.data, 4)) bad.push(w + 'needs data: at least 4 numbers');
        if (s.five !== undefined && !(nums(s.five, 5) && s.five.length === 5 && s.five.every((v, j) => !j || v >= s.five[j - 1]))) bad.push(w + 'needs five: [min, Q1, median, Q3, max], in order');
        if (s.label !== undefined && !str(s.label)) bad.push(w + 'has a label that is not text');
        if (f.sets.length > 1 && !s.label) bad.push(w + 'needs a label, as the chart has more than one box');
      });
      if (f.outliers !== undefined && typeof f.outliers !== 'boolean') bad.push('needs outliers to be true or false');
      if (f.outliers && Array.isArray(f.sets) && f.sets.some(s => s && !s.data)) bad.push('shows outliers, so every set needs its data');
    }
    if (c === 'dot') {
      bad.push(...axisShape(f.x, 'x', true));
      if (!nums(f.data, 3) || f.data.length > 60) bad.push('needs data: 3 to 60 numbers');
    }
    if (c === 'stem') {
      if ((f.data !== undefined) === (f.sets !== undefined)) bad.push('needs exactly one of data and sets');
      const okData = d => nums(d, 3) && d.length <= 60 && d.every(v => v >= 0);
      if (f.data !== undefined && !okData(f.data)) bad.push('needs data: 3 to 60 numbers, each 0 or more');
      if (f.sets !== undefined && !(Array.isArray(f.sets) && f.sets.length === 2 && f.sets.every(s => s && typeof s === 'object' && str(s.label) && s.label && okData(s.data) && Object.keys(s).every(k => k === 'label' || k === 'data'))))
        bad.push('needs sets: two of {"label", "data"}, for a back-to-back stem plot');
      if (f.leaf !== undefined && !LEAVES.includes(f.leaf)) bad.push('needs leaf to be one of ' + LEAVES.join(', '));
      if (!str(f.key) || !f.key.trim()) bad.push('needs a key, such as "2 | 3 means 23"');
    }
    if (f.stats !== undefined) {
      if (!f.stats || typeof f.stats !== 'object' || Array.isArray(f.stats)) bad.push('needs stats to be an object such as {"median": 23}');
      else for (const [k, v] of Object.entries(f.stats)) {
        if (!STAT_NAMES.includes(k)) bad.push('has a stat this format does not know: ' + k + '. Use ' + STAT_NAMES.join(', '));
        else if (k === 'mode' ? !(num(v) || str(v) || (Array.isArray(v) && v.length && v.every(u => num(u) || str(u)))) : !num(v)) bad.push('has a stat ' + k + ' that is not a number');
      }
    }
    return bad;
  }
  /* Problems with a chart's data: what it draws must make sense, and what it states must be what its data gives. */
  function chartData(f) {
    const bad = [], x = f.x, y = f.y, inX = v => v >= x.min - 1e-9 && v <= x.max + 1e-9;
    if (f.chart === 'bar') {
      if (f.truncated && !(y.min > 0)) bad.push('is truncated, so its y-axis starts above 0');
      if (!f.truncated && y.min !== 0) bad.push('has a y-axis that does not start at 0. A bar chart starts at 0, unless it is truncated: true to show how that misleads');
      for (const [lab, v] of f.bars) {
        if (v > y.max + 1e-9) bad.push('has the bar ' + lab + ' (' + v + ') taller than its y-axis');
        if (v < y.min - 1e-9) bad.push('has the bar ' + lab + ' (' + v + ') below where its y-axis starts');
      }
    }
    if (f.chart === 'histogram') {
      const cl = f.classes, w = cl[0][1] - cl[0][0];
      cl.forEach((k, i) => {
        if (i && Math.abs(k[0] - cl[i - 1][1]) > 1e-9) bad.push('has classes that do not touch: ' + cl[i - 1][1] + ' then ' + k[0] + '. A histogram\'s bars meet');
        if (Math.abs(k[1] - k[0] - w) > 1e-9) bad.push('has classes of different widths (' + w + ' and ' + (k[1] - k[0]) + '). Use equal widths, so each bar\'s height is its count');
        if (!inX(k[0]) || !inX(k[1])) bad.push('has the class ' + k[0] + ' to ' + k[1] + ' outside its x-axis');
        if (k[2] > y.max + 1e-9) bad.push('has the class ' + k[0] + ' to ' + k[1] + ' (' + k[2] + ') taller than its y-axis');
      });
      if (y.min !== 0) bad.push('has a y-axis that does not start at 0');
    }
    if (f.chart === 'box') for (const s of f.sets) for (const v of s.data || s.five) if (!inX(v)) bad.push('has the value ' + v + (s.label ? ' in ' + s.label : '') + ' outside its x-axis');
    if (f.chart === 'dot') for (const v of f.data) if (!inX(v)) bad.push('has the value ' + v + ' outside its x-axis');
    if (f.chart === 'stem') {
      const leaf = f.leaf || 1;
      for (const s of f.sets || [{data: f.data}]) for (const v of s.data) if (Math.abs(v / leaf - Math.round(v / leaf)) > 1e-6) bad.push('has the value ' + v + ', which is not a whole number of leaves of ' + leaf + '. Change leaf');
      const k = /(\d+)\s*(?:\||\\mid|\\vert)\s*(\d)\s*(?:\\\))?\s*(?:means|=|represents)\s*(?:\\\(\s*)?(\d+(?:\.\d+)?)/.exec(f.key);
      if (!k) bad.push('has a key this check cannot read. Write it as "2 | 3 means 23"');
      else if (Math.abs((+k[1] * 10 + +k[2]) * leaf - +k[3]) > 1e-9) bad.push('has the key ' + f.key + ', but with leaf ' + leaf + ', ' + k[1] + ' | ' + k[2] + ' means ' + +((+k[1] * 10 + +k[2]) * leaf).toFixed(4));
    }
    const real = chartStats(f);
    if (f.stats) for (const [k, v] of Object.entries(f.stats)) {
      if (!real) { bad.push('states its stats, but has more than one set of data, so they cannot be checked. Take out stats'); break; }
      const w = statWrong(k, v, real[k]);
      if (w) bad.push('states the ' + k + ' is ' + (Array.isArray(v) ? v.join(' and ') : v) + ', but the ' + k + ' of its data ' + w);
    }
    return bad;
  }

  /* Everything a chart draws, in layout pixels, in the same shape as plan() gives for a graph. */
  function chartPlan(f, size) {
    const S = SIZE[size], fw = S.font, W = S.w, svg = [], words = [], c = f.chart, x = f.x || {}, y = f.y || {};
    const at = (sx, sy, text, pos, cls, gap) => words.push({sx, sy, text: String(text), pos, cls: cls || '', gap: gap === undefined ? 4 : gap});
    const path = (cls, dd) => svg.push(['path', cls, dd]);
    const seg = (cls, a, b) => path(cls, 'M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + 'L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1));
    const rect = (cls, l, t, r, b) => path(cls, 'M' + l.toFixed(1) + ' ' + t.toFixed(1) + 'H' + r.toFixed(1) + 'V' + b.toFixed(1) + 'H' + l.toFixed(1) + 'Z');
    if (c === 'stem') {
      const leaf = f.leaf || 1, two = !!f.sets, sets = two ? f.sets : [{data: f.data}];
      const split = v => { const k = Math.round(v / leaf); return [Math.floor(k / 10), k % 10]; };
      const all = sets.flatMap(s => s.data.map(v => split(v)[0])), lo = Math.min(...all), hi = Math.max(...all);
      const rowH = Math.round(fw * 1.6), dw = cw(fw) * 1.5, stemW = Math.max(String(lo).length, String(hi).length) * cw(fw);
      const top = two ? fw + 14 : 6, rows = hi - lo + 1, H = top + rows * rowH + fw + 16;
      const L = {S, W, H, left: 0, top: 0, pw: W, ph: H, fw};
      const leaves = sets.map(s => { const m = {}; for (const v of sorted(s.data)) { const [st, lf] = split(v); (m[st] = m[st] || []).push(lf); } return m; });
      const cx = two ? W / 2 : 12 + stemW, rx = two ? cx + stemW / 2 + 7 : cx + 7, lx = cx - stemW / 2 - 7;
      for (let r = 0; r < rows; r++) {
        const st = lo + r, cy = top + (r + 0.5) * rowH;
        at(two ? cx : cx, cy, st, two ? 'centre' : 'left', 'fs2', two ? 0 : 0);
        (leaves[two ? 1 : 0][st] || []).forEach((lf, i) => at(rx + 6 + (i + 0.5) * dw, cy, lf, 'centre', '', 0));
        if (two) (leaves[0][st] || []).forEach((lf, i) => at(lx - 6 - (i + 0.5) * dw, cy, lf, 'centre', '', 0));
      }
      path('fa', 'M' + rx.toFixed(1) + ' ' + (top - 2) + 'V' + (top + rows * rowH + 2));
      if (two) {
        path('fa', 'M' + lx.toFixed(1) + ' ' + (top - 2) + 'V' + (top + rows * rowH + 2));
        at(lx - 6, top - 4, sets[0].label, 'above-left', 'fx', 0);
        at(rx + 6, top - 4, sets[1].label, 'above-right', 'fx', 0);
      }
      at(two ? W / 2 : 12, H - 4, f.key, two ? 'above' : 'above-right', 'fn', 0);
      return {L, svg, words, curves: []};
    }
    const below = fw + 9 + (x.label ? fw + 7 : 0), yAxis = c === 'bar' || c === 'histogram';
    let top = y.label ? fw + 11 : 10, left = 10, H = S.h;
    const right = 12;
    if (yAxis) left = Math.max(0, ...ticks(y).map(t => fmt(t).length * cw(fw - 1))) + 10;
    if (c === 'box') {
      const lw = Math.max(0, ...f.sets.map(s => s.label ? shownLen(s.label) * cw(fw) : 0));
      left = lw ? lw + 14 : 10; top = 6; H = top + f.sets.length * (size === 'opt' ? 28 : 40) + below;
    }
    let stacks = null;
    if (c === 'dot') {
      stacks = new Map();
      for (const v of f.data) stacks.set(v, (stacks.get(v) || 0) + 1);
      top = 6; H = top + Math.max(3, ...stacks.values()) * (2 * S.r + 3) + 8 + below;
    }
    const pw = W - left - right, ph = H - top - below, bottom = top + ph;
    const L = {S, W, H, left, top, pw, ph, fw};
    const px = v => left + (v - x.min) / (x.max - x.min) * pw, py = v => top + (y.max - Math.max(y.min, Math.min(y.max, v))) / (y.max - y.min) * ph;
    if (yAxis) {
      for (const t of ticks(y)) {
        if (Math.abs(t - y.min) > 1e-9) path('fg', 'M' + left + ' ' + py(t).toFixed(1) + 'H' + (left + pw));
        seg('fa', [left - 4, py(t)], [left, py(t)]);
        if (y.nums !== false) at(left - 2, py(t), fmt(t), 'left', 'fn');
      }
      seg('fa', [left, bottom], [left, top]);
      if (y.label) at(left, top - 6, y.label, 'above-right', 'fx', 0);
    }
    if (c === 'bar') {
      const n = f.bars.length, slot = pw / n, bw = Math.min(slot * 0.62, 46);
      f.bars.forEach(([lab, v], i) => {
        const mid = left + slot * (i + 0.5);
        if (v > y.min) rect('fb', mid - bw / 2, py(v), mid + bw / 2, bottom);
        at(mid, bottom, lab, 'below', 'fn');
      });
    } else {
      if (c === 'histogram') for (const k of f.classes) if (k[2] > 0) rect('fb', px(k[0]), py(k[2]), px(k[1]), bottom);
      if (c === 'box') f.sets.forEach((s, i) => {
        const b = boxOf(s, f.outliers), cy = top + (i + 0.5) * (ph / f.sets.length), bh = Math.min(18, ph / f.sets.length * 0.5);
        const [mn, q1, m, q3, mx] = b.five;
        seg('fe', [px(b.lo), cy], [px(q1), cy]); seg('fe', [px(q3), cy], [px(b.hi), cy]);
        seg('fe', [px(b.lo), cy - bh * 0.35], [px(b.lo), cy + bh * 0.35]); seg('fe', [px(b.hi), cy - bh * 0.35], [px(b.hi), cy + bh * 0.35]);
        rect('fb', px(q1), cy - bh / 2, px(q3), cy + bh / 2);
        seg('fm', [px(m), cy - bh / 2], [px(m), cy + bh / 2]);
        for (const v of b.out) svg.push(['circle', 'fo', [px(v), cy]]);
        if (s.label) at(left - 6, cy, s.label, 'left', '');
        void mn; void mx;
      });
      if (c === 'dot') for (const [v, k] of stacks) for (let j = 0; j < k; j++) svg.push(['circle', 'fp', [px(v), bottom - 6 - S.r - j * (2 * S.r + 3)]]);
      for (const t of ticks(x)) {
        seg('fa', [px(t), bottom], [px(t), bottom + 4]);
        if (x.nums !== false) at(px(t), bottom + 2, fmt(t), 'below', 'fn');
      }
    }
    seg('fa', [left, bottom], [left + pw, bottom]);
    if (x.label) at(left + pw / 2, H - 2, x.label, 'above', 'fx', 0);
    return {L, svg, words, curves: []};
  }
  function chartProblems(f, opt) {
    const bad = chartData(f);
    for (const size of opt ? ['opt'] : ['card']) {
      const {L, words} = chartPlan(f, size);
      bad.push(...fitProblems(L, words, [], 'chart'));
      if (f.x && f.x.step && f.chart !== 'bar' && f.x.nums !== false && (L.pw / (f.x.max - f.x.min)) * f.x.step < Math.max(...ticks(f.x).map(t => fmt(t).length)) * cw(L.fw - 1) + 5)
        bad.push('has x-axis numbers that run into each other at this size. Use a larger step, or nums: false');
      if (f.y && f.y.step && f.chart !== 'stem' && f.y.nums !== false && (L.ph / (f.y.max - f.y.min)) * f.y.step < L.fw + 2) bad.push('has y-axis numbers that run into each other at this size. Use a larger step, or nums: false');
      if (L.H > L.W * 1.6) bad.push('is too tall for a phone. Use fewer values, or a wider class');
      const long = [f.x && f.x.label, f.y && f.y.label].filter(Boolean).find(t => shownLen(t) * cw(L.fw) > L.pw);
      if (long) bad.push('has an axis label too long for the chart: ' + long);
    }
    return [...new Set(bad)];
  }

  /* ---------- pictures: diagrams and images ----------
     A picture is a file in the repository, never loaded from another site:
       {"kind": "diagram", "src": "pictures/diagrams/plant-and-animal-cells.svg", "alt": "..."}
       {"kind": "image", "src": "pictures/images/the-blood-vote-1916.webp", "alt": "..."}
     alt is required, except on an option, whose text is its description. Every picture has a record in
     pictures/licences.json, under "diagrams" or "images" by its src: its title and its size in pixels ([width, height],
     the viewBox for a diagram), its creator and its licence; for an image also the page it came from, what was changed
     (such as "resized") and why the licence applies. A diagram drawn for Stratos is CC BY 4.0, credited to Stratos.
     build.py puts that file into the page as PICS, and the app shows each picture's credit under it from there. Only
     public domain, CC0, CC BY and CC BY-SA are allowed (LICENCES).
     A diagram is drawn for Stratos as SVG. It is put into the page itself, not shown as a picture file, so its lines and
     words take the app's colours: it may use only currentColor and the app's colour names (var(--ink) and the others in
     COLOURS), never a colour of its own, and its labels are real text, large enough to read on a 360 px phone. It may have
     no scripts, no links, no event handlers and nothing from outside the file (svgProblems). The app checks it again as
     it puts it in (cleanSvg).
     A diagram is fetched, and an image loaded, only when it comes near the screen. */
  let PICS = /*PICS*/{"images": {}, "diagrams": {}}/*PICS-END*/;
  const LICENCES = ['Public domain', 'CC0 1.0', 'CC BY 2.0', 'CC BY 2.5', 'CC BY 3.0', 'CC BY 4.0', 'CC BY-SA 2.0', 'CC BY-SA 2.5', 'CC BY-SA 3.0', 'CC BY-SA 4.0'];
  const LIMIT = {image: 200 * 1024, diagram: 30 * 1024, side: 1200, least: 300};
  /* The width a card's figure has on a 360 px phone, and the smallest a label may be drawn at there. */
  const PHONE = {card: 296, opt: 128, font: 11};
  const SRC = {diagram: /^pictures\/diagrams\/[a-z0-9]+(-[a-z0-9]+)*\.svg$/, image: /^pictures\/images\/[a-z0-9]+(-[a-z0-9]+)*\.(jpg|png|webp)$/};
  const licenceUrl = l => l === 'CC0 1.0' ? 'https://creativecommons.org/publicdomain/zero/1.0/' : /^CC BY/.test(l) ? 'https://creativecommons.org/licenses/' + (/-SA/.test(l) ? 'by-sa' : 'by') + '/' + l.split(' ').pop() + '/' : '';
  const record = f => ((PICS || {})[f.kind === 'image' ? 'images' : 'diagrams'] || {})[f.src];
  function picShape(f, opt) {
    const bad = [];
    for (const k of Object.keys(f)) if (!['kind', 'src', 'alt'].includes(k)) bad.push('has a part a ' + f.kind + ' does not have: ' + k);
    if (!str(f.src) || !SRC[f.kind].test(f.src)) bad.push('needs a src in this repository: ' + (f.kind === 'image' ? 'pictures/images/<name>.jpg, .png or .webp' : 'pictures/diagrams/<name>.svg') + ', the name in lower-case words joined by dashes');
    if (opt) { if (f.alt !== undefined) bad.push('is an option\'s ' + f.kind + ', so the option\'s text is its description. Take out its alt'); }
    else if (!str(f.alt) || f.alt.trim().split(/\s+/).length < 4) bad.push('needs an alt: a description in words of what the ' + f.kind + ' shows, for screen readers');
    return bad;
  }
  /* Problems with a picture's record and its file. env, from check_content.mjs, gives the records (pictures/licences.json)
     and reads a file: env.read(src) is {bytes, size: [w, h], text} or null. In the app and the review page there is no env,
     and only the record is checked. */
  function picProblems(f, opt, env) {
    const bad = [], recs = env ? env.records : PICS, rec = ((recs || {})[f.kind === 'image' ? 'images' : 'diagrams'] || {})[f.src];
    if (!rec) return ['has no record in pictures/licences.json, under "' + (f.kind === 'image' ? 'images' : 'diagrams') + '": ' + f.src];
    bad.push(...recordProblems(f.kind, f.src, rec));
    if (!env) return bad;
    const file = env.read(f.src);
    if (!file) return bad.concat(['has no file at ' + f.src]);
    bad.push(...fileProblems(f.kind, f.src, rec, file, opt));
    return bad;
  }
  /* The record must say what the picture is and, for an image, who made it, under which licence, and where it came from. */
  function recordProblems(kind, src, rec) {
    const bad = [], w = 'has a record for ' + src + ' ';
    const keys = kind === 'image' ? ['title', 'creator', 'licence', 'source', 'size', 'changes', 'why'] : ['title', 'made', 'creator', 'licence', 'size'];
    for (const k of Object.keys(rec)) if (!keys.includes(k)) bad.push(w + 'with a part it does not take: ' + k);
    if (!str(rec.title) || !rec.title.trim()) bad.push(w + 'with no title');
    if (!(Array.isArray(rec.size) && rec.size.length === 2 && rec.size.every(v => Number.isInteger(v) && v > 0))) bad.push(w + 'with no size: [width, height] in pixels');
    if (!str(rec.creator) || !rec.creator.trim()) bad.push(w + 'with no creator, for the credit');
    if (!LICENCES.includes(rec.licence)) bad.push(w + 'with the licence ' + JSON.stringify(rec.licence) + '. Only ' + LICENCES.join(', ') + ' are allowed');
    if (kind === 'diagram') { if (!str(rec.made) || !rec.made.trim()) bad.push(w + 'that does not say who drew it (made)'); return bad; }
    if (!str(rec.source) || !/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}\//i.test(rec.source)) bad.push(w + 'with no source: the https address of the page it came from');
    if (!str(rec.why) || rec.why.trim().split(/\s+/).length < 4) bad.push(w + 'with no why: why the licence applies, as the source page says');
    if (rec.changes !== undefined && !str(rec.changes)) bad.push(w + 'with changes that are not text');
    return bad;
  }
  function fileProblems(kind, src, rec, file, opt) {
    const bad = [];
    if (file.bytes > LIMIT[kind]) bad.push('has a file of ' + Math.round(file.bytes / 1024) + ' KB at ' + src + '. The most is ' + LIMIT[kind] / 1024 + ' KB');
    if (kind === 'image') {
      if (!file.size) return bad.concat(['has a file at ' + src + ' that is not a JPEG, PNG or WebP picture']);
      const [w, h] = file.size;
      if (Math.max(w, h) > LIMIT.side) bad.push('has a picture ' + w + ' by ' + h + ' px at ' + src + '. Resize it to at most ' + LIMIT.side + ' px on its longer side');
      if (w < LIMIT.least) bad.push('has a picture only ' + w + ' px wide at ' + src + '. Use one at least ' + LIMIT.least + ' px wide');
      if (rec.size && (rec.size[0] !== w || rec.size[1] !== h)) bad.push('has a record size of ' + rec.size.join(' by ') + ' for ' + src + ', but the file is ' + w + ' by ' + h);
      return bad;
    }
    const s = svgProblems(file.text || '', opt ? PHONE.opt : PHONE.card);
    bad.push(...s.bad.map(m => 'has a diagram at ' + src + ' that ' + m));
    if (s.box && rec.size && (Math.abs(s.box[2] - rec.size[0]) > 0.5 || Math.abs(s.box[3] - rec.size[1]) > 0.5)) bad.push('has a record size of ' + rec.size.join(' by ') + ' for ' + src + ', but its viewBox is ' + s.box[2] + ' by ' + s.box[3]);
    return bad;
  }

  /* ---------- what an SVG diagram may hold ---------- */
  const SVG_TAGS = ['svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'tspan', 'title', 'desc', 'defs', 'marker'];
  const SVG_ATTRS = ['xmlns', 'viewBox', 'version', 'id', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'd', 'points', 'width', 'height', 'transform',
    'fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'fill-rule', 'opacity', 'fill-opacity', 'stroke-opacity',
    'font-size', 'font-weight', 'font-style', 'text-anchor', 'dominant-baseline', 'dx', 'dy', 'style', 'markerWidth', 'markerHeight', 'refX', 'refY', 'orient',
    'markerUnits', 'marker-start', 'marker-mid', 'marker-end', 'aria-hidden', 'role', 'vector-effect', 'paint-order', 'letter-spacing'];
  /* The colours a diagram may use: the colour of the words around it, or one of the app's own, so it follows light, dark
     and Sky. */
  const COLOURS = ['none', 'currentColor', 'transparent', 'var(--ink)', 'var(--ink-2)', 'var(--ink-3)', 'var(--line)', 'var(--line-2)', 'var(--paper)',
    'var(--wash)', 'var(--wash-2)', 'var(--accent)', 'var(--accent-soft)'];
  const STYLE_PROPS = ['fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'stroke-linejoin', 'opacity', 'fill-opacity', 'stroke-opacity',
    'font-size', 'font-weight', 'font-style', 'text-anchor', 'dominant-baseline', 'paint-order', 'letter-spacing'];
  /* Why an attribute may not stay, or '' when it may. */
  function attrBad(name, v) {
    const n = name.toLowerCase();
    if (/^on/.test(n)) return 'has an event handler: ' + name;
    if (n === 'href' || n === 'xlink:href' || n === 'src') return 'links to something: ' + name;
    if (!SVG_ATTRS.includes(name)) return 'has an attribute it may not: ' + name;
    if (n === 'xmlns') return v === 'http://www.w3.org/2000/svg' ? '' : 'has an xmlns other than SVG\'s own: ' + v;
    if (/javascript:|data:|https?:|\/\/|@import|expression\(|\\/i.test(v)) return 'reaches outside itself in ' + name + '="' + v + '"';
    if (/url\(/i.test(v) && !(/^marker-(start|mid|end)$/.test(n) && /^url\(#[\w-]+\)$/.test(v.trim()))) return 'uses url() in ' + name + ', which only a marker may, as url(#id)';
    if ((n === 'fill' || n === 'stroke') && !['none', 'currentColor', 'transparent'].includes(v.trim())) return 'uses a colour of its own: ' + name + '="' + v + '". Use currentColor, or style="' + name + ':var(--ink-2)" with one of the app\'s colours';
    if (n === 'style') for (const decl of v.split(';').map(x => x.trim()).filter(Boolean)) {
      const m = /^([a-z-]+)\s*:\s*(.+)$/.exec(decl);
      if (!m || !STYLE_PROPS.includes(m[1])) return 'has a style it may not: ' + decl;
      if ((m[1] === 'fill' || m[1] === 'stroke') && !COLOURS.includes(m[2].trim())) return 'uses a colour of its own: ' + decl + '. Use currentColor or one of ' + COLOURS.slice(3).join(', ');
      if (m[1] !== 'fill' && m[1] !== 'stroke' && !/^[\w.\s%,-]+$/.test(m[2])) return 'has a style it may not: ' + decl;
    }
    return '';
  }
  const ENTITY = /&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i;
  /* Reads an SVG as text, with no browser, and lists what it may not hold. width is how wide it is drawn on a 360 px
     phone, to check its labels are large enough there. Returns {bad, box}: box is the viewBox as [x, y, w, h]. */
  function svgProblems(text, width) {
    const bad = [], add = m => { if (!bad.includes(m)) bad.push(m); };
    const re = /<!--[\s\S]*?-->|<\?xml[^>]*\?>|<!\[CDATA\[|<![^>]*>|<\?[^>]*>|<\/\s*([A-Za-z][\w:.-]*)\s*>|<([A-Za-z][\w:.-]*)((?:\s+[A-Za-z_:][\w:.-]*\s*=\s*(?:"[^"<]*"|'[^'<]*'))*)\s*(\/?)>|[^<]+|</g;
    const stack = [], lines = [];
    let m, box = null, texts = 0, root = 0, cur = null;
    while ((m = re.exec(text))) {
      const t = m[0];
      if (t.startsWith('<!--') || t.startsWith('<?xml')) continue;
      if (t === '<![CDATA[' || t.startsWith('<!') || t.startsWith('<?')) { add('has a part it may not: ' + t.slice(0, 20)); continue; }
      if (t === '<') { add('is not well formed: a < that does not start a tag'); continue; }
      if (m[1]) {
        const top = stack.pop();
        if (!top || top.tag !== m[1]) add('is not well formed: </' + m[1] + '> does not close the tag open there');
        if (m[1] === 'text' && cur) { lines.push(...cur.lines); cur = null; }
        continue;
      }
      if (!m[2]) {
        if (ENTITY.test(t)) add('has an & that is not a known entity');
        if (t.trim() && cur) cur.lines[cur.lines.length - 1].chars += t.trim().replace(/&[^;]+;/g, 'x').length;
        else if (t.trim() && !stack.some(s => ['title', 'desc'].includes(s.tag))) add('has text outside a <text>: ' + t.trim().slice(0, 30));
        continue;
      }
      const tag = m[2], attrs = {}, are = /([A-Za-z_:][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
      let a;
      while ((a = are.exec(m[3]))) attrs[a[1]] = a[2] !== undefined ? a[2] : a[3];
      if (!SVG_TAGS.includes(tag)) add('has a <' + tag + '>, which a diagram may not hold' + (tag === 'script' ? '' : '. It may hold ' + SVG_TAGS.join(', ')));
      for (const [k, v] of Object.entries(attrs)) { const w = attrBad(k, v); if (w) add(w); if (ENTITY.test(v)) add('has an & that is not a known entity'); }
      if (tag === 'svg') {
        if (stack.length) add('has an <svg> inside another');
        root++;
        const vb = String(attrs.viewBox || '').trim().split(/[\s,]+/).map(Number);
        if (vb.length === 4 && vb.every(isFinite) && vb[2] > 0 && vb[3] > 0) box = vb; else add('has no viewBox of four numbers');
      } else if (!stack.length) add('does not start with <svg>');
      const parent = stack[stack.length - 1] || {}, styleOf = k => { const s = /(?:^|;)\s*([a-z-]+)\s*:\s*([^;]+)/g; let q, v; while ((q = s.exec(attrs.style || ''))) if (q[1] === k) v = q[2].trim(); return v !== undefined ? v : attrs[k]; };
      const fs = styleOf('font-size'), node = {tag, size: fs !== undefined ? parseFloat(fs) : parent.size, anchor: styleOf('text-anchor') || parent.anchor || 'start',
        scaled: parent.scaled || /scale|matrix|skew/.test(attrs.transform || ''), x: attrs.x !== undefined ? parseFloat(attrs.x) : parent.x};
      if (fs !== undefined && !/^\d+(\.\d+)?(px)?$/.test(String(fs).trim())) add('has a font-size that is not a number of pixels: ' + fs);
      if (tag === 'text') {
        texts++;
        if (stack.some(s => s.tag === 'text')) add('has a <text> inside a <text>');
        cur = {lines: [{x: node.x, size: node.size, anchor: node.anchor, chars: 0, scaled: node.scaled}]};
      }
      if (tag === 'tspan' && cur && attrs.x !== undefined) cur.lines.push({x: node.x, size: node.size, anchor: node.anchor, chars: 0, scaled: node.scaled});
      if (!m[4]) stack.push(node);
      else if (tag === 'text') { lines.push(...cur.lines); cur = null; }
    }
    if (stack.length) add('is not well formed: <' + stack[stack.length - 1].tag + '> is never closed');
    if (root !== 1) add('needs exactly one <svg>');
    if (!texts) add('has no <text>. Its labels must be real text, not shapes');
    if (box) for (const l of lines) {
      if (!l.chars) continue;
      if (!isFinite(l.size)) { add('has text with no font-size. Give each <text> or the <g> round it a font-size'); continue; }
      if (l.scaled) { add('has text inside a scale or matrix transform, so its size cannot be checked. Use translate or rotate only'); continue; }
      const shown = l.size * Math.min(width, box[2] * 1.25) / box[2];
      if (shown < PHONE.font - 0.05) add('has text in font-size ' + l.size + ', which is ' + +shown.toFixed(1) + ' px on a 360 px phone. Make it at least ' + +(PHONE.font * box[2] / Math.min(width, box[2] * 1.25)).toFixed(1));
      if (isFinite(l.x)) {
        const w = l.chars * l.size * 0.56, from = l.anchor === 'middle' ? l.x - w / 2 : l.anchor === 'end' ? l.x - w : l.x;
        if (from < box[0] - 1 || from + w > box[0] + box[2] + 1) add('has a label that runs off its edge, about ' + l.chars + ' characters at x = ' + l.x + '. Move it in, or widen the viewBox');
      }
    }
    return {bad, box};
  }
  /* The app's own second look at a diagram, as it puts it into the page: anything the check above would refuse is taken
     out. Returns the <svg> element, or null. */
  function cleanSvg(text) {
    if (typeof DOMParser === 'undefined') return null;
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml'), svg = doc.documentElement;
    if (!svg || svg.nodeName !== 'svg' || doc.getElementsByTagName('parsererror').length) return null;
    (function walk(el) {
      for (const child of [...el.children]) {
        if (!SVG_TAGS.includes(child.nodeName)) { child.remove(); continue; }
        for (const at of [...child.attributes]) if (attrBad(at.name, at.value)) child.removeAttribute(at.name);
        walk(child);
      }
    })(svg);
    for (const at of [...svg.attributes]) if (attrBad(at.name, at.value) || at.name === 'width' || at.name === 'height') svg.removeAttribute(at.name);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    return svg;
  }
  /* Diagrams are fetched when they come near the screen, once each, and put in. */
  const svgCache = {};
  function wake(el) {
    if (el.dataset.on) return;
    el.dataset.on = '1';
    const src = el.dataset.src, put = text => { const svg = text && cleanSvg(text); if (svg) el.appendChild(document.importNode(svg, true)); else el.classList.add('fail'); };
    const go = () => { svgCache[src] = svgCache[src] || fetch(src).then(r => r.ok ? r.text() : '').catch(() => ''); svgCache[src].then(put); };
    if (typeof IntersectionObserver === 'undefined') return go();
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); go(); } }, {rootMargin: '600px'});
    io.observe(el);
  }
  function watch() {
    if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
    const scan = root => { if (root.querySelectorAll) for (const el of root.querySelectorAll('.fdg[data-src]:not([data-on])')) wake(el); };
    new MutationObserver(ms => { for (const m of ms) for (const n of m.addedNodes) if (n.nodeType === 1) { if (n.matches('.fdg[data-src]')) wake(n); scan(n); } })
      .observe(document.documentElement, {childList: true, subtree: true});
    scan(document);
  }
  /* A picture's credit, as HTML: the creator, the licence (a link to it), and for an image what was changed and the page
     it came from. A diagram drawn for Stratos reads "Stratos, CC BY 4.0." */
  function credit(f) {
    const r = record(f);
    if (!r || !r.creator) return '';
    const lic = licenceUrl(r.licence), from = f.kind === 'image' && str(r.source) ? r.source : '';
    const host = /commons\.wikimedia\.org/.test(from) ? 'Wikimedia Commons' : 'source';
    return ESC(r.creator) + ', ' + (lic ? '<a href="' + ESC(lic) + '" target="_blank" rel="noopener">' + ESC(r.licence) + '</a>' : 'public domain') +
      (r.changes ? ', ' + ESC(r.changes.charAt(0).toLowerCase() + r.changes.slice(1)) : '') + '.' + (from ? ' <a href="' + ESC(from) + '" target="_blank" rel="noopener">' + host + '</a>' : '');
  }
  /* One picture as HTML. An option's picture has no description of its own and no credit: the button's text says what it
     is, and the credits go under the options (optCredits). */
  function picHtml(f, size, o) {
    const r = record(f) || {}, [w, h] = r.size || [4, 3], opt = size === 'opt';
    const label = opt ? ' aria-hidden="true"' : ' role="img" aria-label="' + ESC(o.say ? o.say(f.alt) : f.alt) + '"';
    const inner = f.kind === 'image'
      ? '<img src="' + ESC(f.src) + '" alt="" width="' + w + '" height="' + h + '" loading="lazy" decoding="async">'
      : '<div class="fdg" data-src="' + ESC(f.src) + '"></div>';
    const fig = '<div class="fig fpic fig-' + size + ' f' + f.kind + '"' + label + ' style="max-width:' + (opt ? 'none' : Math.round(w * 1.25) + 'px') + ';aspect-ratio:' + w + '/' + h + '">' + inner + '</div>';
    const cr = opt ? '' : credit(f);
    return cr ? '<div class="fwrap">' + fig + '<p class="fcr">' + cr + '</p></div>' : fig;
  }
  /* The credits for pictures used as options, in the order the options are shown: "A: ... B: ...". */
  function optCredits(figs, order) {
    const out = order.map((oi, n) => figs[oi] && /^(image|diagram)$/.test(figs[oi].kind) && credit(figs[oi]) ? 'ABCD'.charAt(n) + ': ' + credit(figs[oi]).replace(/\.$/, '') + '.' : '').filter(Boolean);
    return out.length ? '<p class="fcr fcr-opts">' + out.join(' ') + '</p>' : '';
  }

  /* ---------- drawing ---------- */
  let made = 0;
  const STYLE_CSS =
    '.fig{position:relative;width:100%;margin:10px auto 2px;color:var(--ink)}' +
    '.fig>svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}' +
    '.fig>svg path,.fig>svg circle{vector-effect:non-scaling-stroke;fill:none}' +
    '.fig .fg{stroke:var(--line);stroke-width:1}' +
    '.fig .fa{stroke:var(--ink-3);stroke-width:1.2}' +
    '.fig .fk{fill:var(--ink-3);stroke:none}' +
    '.fig .fw+.fk,.fig .fw{stroke:var(--ink-2)}.fig .fw{stroke-width:1.6}.fig .fw+.fk{fill:var(--ink-2)}' +
    '.fig .fc{stroke:currentColor;stroke-width:2.2;stroke-linejoin:round;stroke-linecap:round}' +
    '.fig .fc.dash{stroke-dasharray:7 5}.fig .fc.dot{stroke-dasharray:1 5}' +
    '.fig .fsl{stroke:var(--ink-2);stroke-width:1.3;stroke-linecap:round}' +
    '.fig .fd{stroke:var(--ink-3);stroke-width:1.2;stroke-dasharray:4 4}' +
    '.fig .fy{stroke:var(--ink-3);stroke-width:1.4;stroke-dasharray:6 5}' +
    '.fig .fs{fill:var(--accent-soft);stroke:none;opacity:.85}' +
    '.fig .fh{stroke:none}' +
    '.fig .fp{fill:currentColor;stroke:currentColor;stroke-width:1}' +
    '.fig .fo{fill:var(--halo);stroke:currentColor;stroke-width:1.8}' +
    /* a halo in the paper colour keeps a word readable where it crosses a line */
    '.fig{--halo:var(--paper)}.opt .fig{--halo:var(--opt-bg,var(--paper))}.opt.is-right .fig,.opt.is-wrong .fig{--halo:transparent}' +
    '.fig .fl{position:absolute;white-space:nowrap;line-height:1.25;font-weight:500;pointer-events:none;text-shadow:0 0 2px var(--halo),0 0 2px var(--halo),0 0 3px var(--halo),0 0 4px var(--halo)}' +
    '.fig .fl.fn{color:var(--ink-2);font-weight:400}' +
    '.fig .fl.fx{color:var(--ink-2)}' +
    '.fig .fl.fr{font-weight:700}' +
    '.fig .fl math-span{font-size:1em;vertical-align:baseline}' +
    /* charts: bars and boxes in the soft blue with an ink edge, whiskers and the median in ink */
    '.fig .fb{fill:var(--accent-soft);stroke:currentColor;stroke-width:1.3}' +
    '.fig .fe{stroke:currentColor;stroke-width:1.5}.fig .fm{stroke:currentColor;stroke-width:2.6}' +
    '.fig .fl.fs2{font-weight:600}' +
    /* pictures: a diagram is put in as SVG and takes the colours of the page; an image keeps its own, with a credit */
    '.fig.fpic{color:var(--ink)}.fig.fpic img,.fig.fpic .fdg,.fig.fpic .fdg svg{display:block;width:100%;height:100%}' +
    '.fig.fpic .fdg svg{overflow:visible;font-family:inherit}' +
    '.fig.fimage img{object-fit:contain;border-radius:8px;outline:1px solid var(--line);outline-offset:-1px}' +
    '.fig.fdiagram .fdg:empty{border-radius:8px;background:var(--wash)}' +
    '.fwrap{margin:10px auto 2px}.fwrap .fig{margin:0 auto}' +
    '.fcr{margin:6px 0 0;font-size:12px;line-height:1.4;color:var(--ink-3);text-align:center}.fcr a{color:inherit;text-decoration:underline;text-underline-offset:2px}' +
    '.fcr-opts{text-align:left;margin-top:8px}' +
    '.opt .fig.fpic{margin:0}';
  function style() {
    if (typeof document === 'undefined' || document.getElementById('figStyle')) return;
    const s = document.createElement('style');
    s.id = 'figStyle'; s.textContent = STYLE_CSS;
    document.head.appendChild(s);
    watch();
  }
  const ESC = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
  /* One figure as HTML. size is 'card' (cards and questions) or 'opt' (an option's graph). o.tx draws a label's text
     (tx in the app, which draws maths), and o.say reads the description aloud (spoken in the app). An option's graph
     has no description of its own: the button's text says it. */
  function html(f, size, o) {
    o = o || {};
    style();
    if (f.kind === 'diagram' || f.kind === 'image') return picHtml(f, size, o);
    const t = o.tx || ESC, {L, svg, words} = f.kind === 'chart' ? chartPlan(f, size) : plan(f, size), id = 'fg' + (++made), W = L.W, H = L.H;
    const pct = (v, of) => (v / of * 100).toFixed(2) + '%';
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true" focusable="false">' +
      '<defs><clipPath id="' + id + 'c"><rect x="' + L.left + '" y="' + L.top + '" width="' + L.pw + '" height="' + L.ph + '"/></clipPath>' +
      '<pattern id="' + id + 'h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V6" style="stroke:var(--ink-3);stroke-width:1.2"/></pattern></defs>';
    for (const [tag, cls, v, clip] of svg) {
      /* lines, curves and shading stay inside the axes; points, arrows and the axes themselves do not need to */
      const cp = clip || cls === 'fc' || cls.startsWith('fc ') ? ' clip-path="url(#' + id + 'c)"' : '';
      if (tag === 'circle') s += '<circle class="' + cls + '" cx="' + v[0].toFixed(1) + '" cy="' + v[1].toFixed(1) + '" r="' + L.S.r + '"/>';
      else s += '<path class="' + cls + '"' + (cls === 'fh' ? ' style="fill:url(#' + id + 'h)"' : '') + cp + ' d="' + v + '"/>';
    }
    s += '</svg>';
    for (const w of words) {
      const g = PLACE[w.pos], tr = 'translate(calc(' + (g[0] * 100) + '% + ' + (g[2] * w.gap) + 'px),calc(' + (g[1] * 100) + '% + ' + (g[3] * w.gap) + 'px))';
      s += '<span class="fl ' + w.cls + '" style="left:' + pct(w.sx, W) + ';top:' + pct(w.sy, H) + ';transform:' + tr + '">' + t(w.text) + '</span>';
    }
    const label = size === 'opt' ? ' aria-hidden="true"' : ' role="img" aria-label="' + ESC(o.say ? o.say(f.alt) : f.alt) + '"';
    return '<div class="fig fig-' + size + '"' + label + ' style="max-width:' + (size === 'opt' ? 'none' : Math.round(W * 1.12) + 'px') + ';aspect-ratio:' + W + '/' + H + ';font-size:' + L.fw + 'px">' + s + '</div>';
  }

  /* ---------- the content check ---------- */
  /* Words that fit: each label inside the figure, no two on top of each other, and none sitting on a curve. A word over
     a curve is hard to read even with its halo, and the curve looks broken where it passes, so the axis numbers and
     every label must sit clear of the curves (lines: each curve as points in layout pixels). */
  function fitProblems(L, words, lines, what) {
    const bad = [];
    for (const wd of words) {
      const b = box(L, wd);
      if (b.l < -2 || b.t < -2 || b.r > L.W + 2 || b.b > L.H + 2) bad.push('has a label that does not fit inside the ' + what + ': ' + wd.text + '. Move it with pos or labelAt, or widen the axes');
    }
    /* two words on top of each other: an axis's name on a number, a label on a label */
    const boxes = words.map(wd => ({wd, b: box(L, wd)}));
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const [p, q] = [boxes[i].b, boxes[j].b], ox = Math.min(p.r, q.r) - Math.max(p.l, q.l), oy = Math.min(p.b, q.b) - Math.max(p.t, q.t);
      if (ox > 2 && oy > 2) bad.push('has labels that run into each other: ' + boxes[i].wd.text + ' and ' + boxes[j].wd.text + '. Move one with pos or labelAt');
    }
    /* a word on a curve: any piece of a curve that crosses the word's box, with a pixel round it for its halo */
    for (const {wd, b} of boxes) {
      const r = {l: b.l, t: b.t, r: b.r, b: b.b};
      const hit = (lines || []).some(pts => pts.some((q, i) => i && segBox(pts[i - 1], q, r)));
      if (hit) bad.push((wd.cls === 'fn' ? 'has the axis number ' : 'has the label ') + wd.text + ' on a curve. Move it with pos or labelAt, ' + (wd.cls === 'fn' ? 'change the axes or the step, or use nums: false' : 'or move the curve'));
    }
    return bad;
  }
  /* True when the line from a to b passes through the box r (Liang and Barsky's clipping). */
  function segBox(a, b, r) {
    let t0 = 0, t1 = 1;
    const dx = b[0] - a[0], dy = b[1] - a[1];
    for (const [p, q] of [[-dx, a[0] - r.l], [dx, r.r - a[0]], [-dy, a[1] - r.t], [dy, r.b - a[1]]]) {
      if (p === 0) { if (q < 0) return false; continue; }
      const t = q / p;
      if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
    }
    return t0 <= t1;
  }
  /* Problems with one figure, as sentences. opt is true for an option's figure. env lets the content check read the
     picture files (picProblems). */
  function problems(f, opt, env) {
    const bad = shape(f, opt);
    if (bad.length) return bad;
    if (f.kind === 'chart') return chartProblems(f, opt);
    if (f.kind === 'diagram' || f.kind === 'image') return picProblems(f, opt, env);
    const x = f.x, y = f.y, xs = x.max - x.min, ys = y.max - y.min;
    const F = lines(f), ids = new Set(), curves = f.items.filter(it => it.type === 'fn' || it.type === 'curve' || it.type === 'circle');
    f.items.forEach((it, n) => {
      if (it.id === undefined) return;
      if (ids.has(it.id)) bad.push('uses the id ' + it.id + ' twice');
      ids.add(it.id);
      if (!['fn', 'curve', 'circle', 'slope'].includes(it.type)) bad.push('item ' + (n + 1) + ' has an id, but only a fn, curve, circle or slope field takes one');
    });
    const slopes = {};
    f.items.forEach((it, n) => { if (it.type === 'slope') { const g = slopeFn(it.expr); if (!g) bad.push('item ' + (n + 1) + ' (slope) has an expr that cannot be read as dy/dx in x and y: ' + it.expr + '. Write it in LaTeX, with x and y as the only letters'); else slopes[it.id || '#' + n] = g; } });
    f.items.forEach((it, n) => {
      if (it.type !== 'fn' || it.solves === undefined) return;
      const g = slopes[it.solves], c = F[it.id || '#' + n];
      if (!g) { bad.push('item ' + (n + 1) + ' (fn) solves ' + it.solves + ', which is not the id of a slope field'); return; }
      if (!c || !c.ok) return;
      const dm = it.domain || [x.min, x.max], a = Math.max(x.min, dm[0]), b = Math.min(x.max, dm[1]), h = xs * 1e-5;
      for (let k = 1; k < 24; k++) {
        const vx = a + (b - a) * k / 24, vy = c.y(vx);
        if (!isFinite(vy) || vy < y.min - ys || vy > y.max + ys) continue;
        const want = g(vx, vy), got = (c.y(vx + h) - c.y(vx - h)) / (2 * h);
        if (!isFinite(want) || !isFinite(got)) continue;
        if (Math.abs(want - got) > 0.01 * Math.max(1, Math.abs(want))) { bad.push('item ' + (n + 1) + ' (fn ' + it.expr + ') is said to solve the slope field ' + it.solves + ', but at x = ' + +vx.toFixed(3) + ' its gradient is ' + +got.toFixed(3) + ', not ' + +want.toFixed(3)); break; }
      }
    });
    for (const it of f.items) if (it.type === 'fn' && !LabMaths.func(it.expr)) bad.push('has an expr that cannot be read as a function of x: ' + it.expr + '. Write only the right side, in LaTeX, with x as the only letter (no y =)');
    if (curves.length > 1) for (const it of curves) if (!it.label) bad.push('has ' + curves.length + ' lines or curves, so each needs a label. Curves are told apart by labels, never by colour');
    const inX = v => v >= x.min - xs * 1e-6 && v <= x.max + xs * 1e-6, inY = v => v >= y.min - ys * 1e-6 && v <= y.max + ys * 1e-6;
    const inside = (q, what) => { if (!inX(q[0]) || !inY(q[1])) bad.push(what + ' at (' + q.join(', ') + ') is outside the axes'); };
    const pick = (ref, what) => {
      const c = F[ref];
      if (!c) { bad.push(what + ' names ' + ref + ', which is not the id of a fn or curve'); return null; }
      return c;
    };
    /* y on a line near x: the closest it comes to the point within the rounding of x. */
    const near = (c, q) => {
      if (c.circle) return Math.abs(Math.hypot(q[0] - c.it.centre[0], q[1] - c.it.centre[1]) - c.it.r) <= Math.max(roundTol(q[0], q[0]), roundTol(q[1], q[1])) * 2 + 1e-3 * c.it.r;
      if (!c.y) {      /* a curve whose x does not rise: the distance to its straight pieces */
        let best = Infinity;
        for (let i = 0; i + 1 < c.pts.length; i++) {
          const [a, b] = [c.pts[i], c.pts[i + 1]], dx = (b[0] - a[0]) / xs, dy = (b[1] - a[1]) / ys, ex = (q[0] - a[0]) / xs, ey = (q[1] - a[1]) / ys;
          const t = Math.max(0, Math.min(1, (ex * dx + ey * dy) / (dx * dx + dy * dy || 1)));
          best = Math.min(best, Math.hypot(ex - t * dx, ey - t * dy));
        }
        return best <= 0.004;
      }
      const tx = Math.max(roundTol(q[0], q[0]), xs * 1e-4), ty = Math.max(0.006 + 0.002 * Math.abs(q[1]), ys * 0.002);
      for (let k = -20; k <= 20; k++) { const v = c.y(q[0] + tx * k / 20); if (isFinite(v) && Math.abs(v - q[1]) <= ty) return true; }
      return false;
    };
    f.items.forEach((it, n) => {
      const w = 'item ' + (n + 1) + ' (' + it.type + (it.label ? ' ' + it.label : '') + ')';
      if (it.type === 'curve') it.points.forEach(q => inside(q, w + ' has a point'));
      if (it.type === 'circle') [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => inside([it.centre[0] + a * it.r, it.centre[1] + b * it.r], w + ' reaches'));
      if (it.type === 'curve' && it.smooth && !F[it.id || '#' + n].y) bad.push(w + ' is smooth, so its x must rise from point to point');
      if (['point', 'guide', 'text'].includes(it.type)) inside(it.at, w);
      if (it.type === 'shade') {
        if (it.poly) it.poly.forEach(q => inside(q, w + ' has a corner'));
        if (it.at) inside(it.at, w + '\'s label');
        for (const ref of it.under ? [it.under] : it.between || []) { const c = pick(ref, w); if (c && !c.y) bad.push(w + ' shades by ' + ref + ', whose x does not rise from point to point. Use poly'); }
        if (it.span && (!inX(it.span[0]) || !inX(it.span[1]))) bad.push(w + ' has a span outside the x-axis');
      }
      if (it.type === 'arrow') { inside(it.from, w + ' starts'); inside(it.to, w + ' ends'); }
      if (it.type === 'asymptote') {
        if (num(it.x) && !inX(it.x)) bad.push(w + ' is outside the x-axis');
        if (num(it.y) && !inY(it.y)) bad.push(w + ' is outside the y-axis');
        const said = it.label && /=\s*(.+)$/.exec(it.label.replace(/\\\)\s*$/, ''));
        const which = num(it.x) ? 'x' : 'y', at = num(it.x) ? it.x : it.y;
        if (said && Math.abs(labelNum(said[1]) - at) > roundTol(said[1], at)) bad.push(w + ' is labelled ' + it.label + ' but is drawn at ' + which + ' = ' + at);
        const fns = Object.values(F).filter(c => c.it.type === 'fn' && c.ok);
        if (fns.length && which === 'x' && !fns.some(c => [-1, 1].some(s => Math.abs(c.y(at + s * xs * 1e-7)) > ys * 50))) bad.push(w + ': no fn goes off to infinity at x = ' + at);
        if (fns.length && which === 'y' && !fns.some(c => [-1, 1].some(s => Math.abs(c.y(s * 1e7) - at) < ys * 1e-3))) bad.push(w + ': no fn gets close to y = ' + at + ' far out');
      }
      if (it.type === 'fn' && num(it.labelAt) && !inX(it.labelAt)) bad.push(w + ' has its label outside the x-axis');
      if (it.type === 'guide') {
        for (const [k, v] of [['xLabel', it.at[0]], ['yLabel', it.at[1]]]) {
          const s = it[k], said = s ? labelNum(s) : NaN;
          if (isFinite(said) && Math.abs(said - v) > roundTol(s, v)) bad.push(w + ' has ' + k + ' ' + s + ', but its point is at ' + v);
        }
      }
      if (it.type !== 'point') return;
      const q = it.at, written = it.label && labelPair(it.label);
      if (written && (Math.abs(written[0] - q[0]) > roundTol(it.label, q[0]) * 2 || Math.abs(written[1] - q[1]) > roundTol(it.label, q[1]) * 2)) bad.push(w + ' is labelled ' + it.label + ' but is drawn at (' + q.join(', ') + ')');
      let on = (it.on || []).map(r => pick(r, w)).filter(Boolean);
      if (it.is && !it.on) {
        if (curves.length === 1) on = Object.values(F);
        else bad.push(w + ' says it is a ' + it.is + ', so it needs on: the fn or curve it is on');
      }
      for (const c of on) if (c.ok && !near(c, q)) bad.push(w + ' is said to be on ' + (c.it.id || 'the line') + ', but is not: at x = ' + q[0] + ' it is at ' + (c.y ? +c.y(q[0]).toFixed(4) : 'another place'));
      if (it.is === 'x-intercept' && Math.abs(q[1]) > 1e-9) bad.push(w + ' is an x-intercept, so its y must be 0');
      if (it.is === 'y-intercept' && Math.abs(q[0]) > 1e-9) bad.push(w + ' is a y-intercept, so its x must be 0');
      if (it.is === 'intersection' && on.length < 2) bad.push(w + ' is an intersection, so on must name two lines or curves');
      if (it.is === 'turning point') for (const c of on) {
        if (!c.y) continue;
        const h = xs * 1e-3, l = c.y(q[0] - h), r = c.y(q[0] + h), m = c.y(q[0]);
        const slope = (r - l) / (2 * h), turn = (l - m) * (r - m) > 0;
        if (!turn || Math.abs(slope) > ys * 0.02) bad.push(w + ' is said to be a turning point of ' + (c.it.id || 'the line') + ', but the line does not turn there');
      }
    });
    /* It fits: numbers that do not run into each other, labels inside the figure, a shape that suits a phone. */
    for (const size of opt ? ['opt'] : ['card']) {
      const L = layout(f, size), {words, curves: lines} = plan(f, size), gap = (L.pw / xs) * (x.step || xs);
      const widest = Math.max(0, ...ticks(x).map(t => fmt(t).length)) * cw(L.fw - 1);
      if (x.step && x.nums !== false && gap < widest + 5) bad.push('has x-axis numbers that run into each other at this size. Use a larger step, or nums: false');
      if (y.step && y.nums !== false && (L.ph / ys) * y.step < L.fw + 2) bad.push('has y-axis numbers that run into each other at this size. Use a larger step, or nums: false');
      if (f.equal && (L.H < L.W * 0.45 || L.H > L.W * 1.3)) bad.push('is too ' + (L.H > L.W ? 'tall' : 'wide') + ' with equal scales. Change the axes so the ranges are closer in size');
      bad.push(...fitProblems(L, words, lines, 'graph'));
      const lw = shownLen(x.label || '') * cw(L.fw), yl = shownLen(y.label || '') * cw(L.fw);
      if (lw > L.pw * 0.6 || yl > L.pw * 0.6) bad.push('has an axis label too long for the graph. Keep it to a word or two');
      for (const it of f.items) for (const k of ['label', 'xLabel', 'yLabel']) if (it[k] && shownLen(it[k]) > (opt ? 12 : 26)) bad.push('has a label too long to read on a graph: ' + it[k]);
    }
    return [...new Set(bad)];
  }
  /* Problems with every figure in a point, each starting with where it is. */
  function pointProblems(p, env) {
    const out = [];
    if (p.cardFigs !== undefined) {
      if (!p.cardFigs || typeof p.cardFigs !== 'object' || Array.isArray(p.cardFigs)) out.push('cardFigs must be an object such as {"2": figure}');
      else for (const k of Object.keys(p.cardFigs)) if (!/^[1-4]$/.test(k) || +k > (p.card || []).length) out.push('cardFigs has a figure under card line ' + k + ', which the card does not have');
    }
    for (const k of ['a', 'b']) {
      const q = p[k];
      if (!q) continue;
      if (q.optFigs !== undefined) {
        if (!Array.isArray(q.optFigs) || q.optFigs.length !== 4) out.push(k + ' needs four optFigs, one for each option, in the order of opts');
        else if (new Set(q.optFigs.map(key)).size !== 4) out.push(k + ' has two option graphs that are the same');
        if (q.fig !== undefined && Array.isArray(q.optFigs)) out.push(k + ' has graphs on its options and on the question. Use one or the other');
      }
    }
    for (const w of of(p)) {
      const ms = problems(w.fig, w.opt, env);
      for (const m of ms) out.push('the figure on ' + w.at + ' ' + m);
      /* the text beside a chart states only what its data gives */
      if (!ms.length && w.fig.kind === 'chart' && w.near) {
        const real = chartStats(w.fig);
        if (real) for (const [k, v] of statedIn(w.near)) {
          const wrong = statWrong(k, k === 'mode' ? +v : +v, real[k]);
          if (wrong && real[k] !== undefined) out.push('the figure on ' + w.at + ': the text says the ' + k + ' is ' + v + ', but the ' + k + ' of the chart\'s data ' + wrong);
        }
      }
    }
    return out;
  }
  /* For the tests and the content check: what a chart's data gives, and what a piece of text states. */
  const use = recs => { PICS = recs; };
  return {html, problems, pointProblems, of, texts, key, layout, plan, chartPlan, chartStats, statedIn, svgProblems, cleanSvg, optCredits, credit, use, LICENCES, LIMIT, COLOURS, STYLE_CSS};
})();
