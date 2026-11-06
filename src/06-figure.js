/* ---------- figures: graphs stored as data and drawn as SVG ----------
   A point can carry figures in three places:
     cardFigs   on the point: {"2": figure} puts a figure under card line 2 (counting from 1).
     q.fig      on a question: one figure under the question text.
     q.optFigs  on a question: four figures, one for each option, in the same order as opts, for "Which graph shows ...?".
                Each option's text is then its description for screen readers, and the student sees only the graphs.
   Every figure has a kind. "graph" is the only kind for now. A picture could be another kind later.

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
    fn: ['type', 'id', 'expr', 'domain', 'breaks', 'label', 'labelAt', 'pos', 'style'],
    curve: ['type', 'id', 'points', 'smooth', 'label', 'labelAt', 'pos', 'style'],
    circle: ['type', 'id', 'centre', 'r', 'label', 'pos', 'style'],
    point: ['type', 'at', 'label', 'pos', 'open', 'on', 'is'],
    guide: ['type', 'at', 'xLabel', 'yLabel'],
    shade: ['type', 'poly', 'under', 'between', 'span', 'label', 'at', 'hatch'],
    arrow: ['type', 'from', 'to', 'label', 'pos'],
    asymptote: ['type', 'x', 'y', 'label', 'pos'],
    text: ['type', 'at', 'label', 'pos']
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
    if (p.cardFigs && typeof p.cardFigs === 'object') for (const [k, f] of Object.entries(p.cardFigs)) out.push({at: 'card line ' + k, fig: f, opt: false});
    for (const k of ['a', 'b']) {
      const q = p[k];
      if (!q || typeof q !== 'object') continue;
      if (q.fig !== undefined) out.push({at: k + ' question', fig: q.fig, opt: false});
      if (Array.isArray(q.optFigs)) q.optFigs.forEach((f, i) => out.push({at: k + ' option ' + (i + 1), fig: f, opt: true, text: (q.opts || [])[i]}));
    }
    return out;
  }
  /* Every piece of text in a figure, for the word and maths checks. */
  function texts(f) {
    if (!f || typeof f !== 'object') return [];
    const out = [f.alt, f.x && f.x.label, f.y && f.y.label];
    for (const it of Array.isArray(f.items) ? f.items : []) if (it && typeof it === 'object') out.push(it.label, it.xLabel, it.yLabel);
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
    if (f.kind !== 'graph') return ['has kind ' + JSON.stringify(f.kind) + '. The only kind is "graph"'];
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
    for (const [id, c] of Object.entries(F)) {
      const it = c.it, parts = traced[id], cls = 'fc' + (it.style === 'dash' ? ' dash' : it.style === 'dot' ? ' dot' : '');
      for (const part of parts) svg.push(['path', cls, d(part.map(q => P(q[0], q[1])))]);
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
    return {L, svg, words};
  }

  /* ---------- drawing ---------- */
  let made = 0;
  const STYLE_CSS =
    '.fig{position:relative;width:100%;margin:10px auto 2px;color:var(--ink)}' +
    '.fig svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}' +
    '.fig path,.fig circle{vector-effect:non-scaling-stroke;fill:none}' +
    '.fig .fg{stroke:var(--line);stroke-width:1}' +
    '.fig .fa{stroke:var(--ink-3);stroke-width:1.2}' +
    '.fig .fk{fill:var(--ink-3);stroke:none}' +
    '.fig .fw+.fk,.fig .fw{stroke:var(--ink-2)}.fig .fw{stroke-width:1.6}.fig .fw+.fk{fill:var(--ink-2)}' +
    '.fig .fc{stroke:currentColor;stroke-width:2.2;stroke-linejoin:round;stroke-linecap:round}' +
    '.fig .fc.dash{stroke-dasharray:7 5}.fig .fc.dot{stroke-dasharray:1 5}' +
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
    '.fig .fl math-span{font-size:1em;vertical-align:baseline}';
  function style() {
    if (typeof document === 'undefined' || document.getElementById('figStyle')) return;
    const s = document.createElement('style');
    s.id = 'figStyle'; s.textContent = STYLE_CSS;
    document.head.appendChild(s);
  }
  const ESC = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
  /* One figure as HTML. size is 'card' (cards and questions) or 'opt' (an option's graph). o.tx draws a label's text
     (tx in the app, which draws maths), and o.say reads the description aloud (spoken in the app). An option's graph
     has no description of its own: the button's text says it. */
  function html(f, size, o) {
    o = o || {};
    style();
    const t = o.tx || ESC, {L, svg, words} = plan(f, size), id = 'fg' + (++made), W = L.W, H = L.H;
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
  /* Problems with one figure, as sentences. opt is true for an option's graph. */
  function problems(f, opt) {
    const bad = shape(f, opt);
    if (bad.length) return bad;
    const x = f.x, y = f.y, xs = x.max - x.min, ys = y.max - y.min;
    const F = lines(f), ids = new Set(), curves = f.items.filter(it => it.type === 'fn' || it.type === 'curve' || it.type === 'circle');
    f.items.forEach((it, n) => {
      if (it.id === undefined) return;
      if (ids.has(it.id)) bad.push('uses the id ' + it.id + ' twice');
      ids.add(it.id);
      if (!['fn', 'curve', 'circle'].includes(it.type)) bad.push('item ' + (n + 1) + ' has an id, but only a fn, curve or circle takes one');
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
      const L = layout(f, size), {words} = plan(f, size), gap = (L.pw / xs) * (x.step || xs);
      const widest = Math.max(0, ...ticks(x).map(t => fmt(t).length)) * cw(L.fw - 1);
      if (x.step && x.nums !== false && gap < widest + 5) bad.push('has x-axis numbers that run into each other at this size. Use a larger step, or nums: false');
      if (y.step && y.nums !== false && (L.ph / ys) * y.step < L.fw + 2) bad.push('has y-axis numbers that run into each other at this size. Use a larger step, or nums: false');
      if (f.equal && (L.H < L.W * 0.45 || L.H > L.W * 1.3)) bad.push('is too ' + (L.H > L.W ? 'tall' : 'wide') + ' with equal scales. Change the axes so the ranges are closer in size');
      for (const wd of words) {
        const b = box(L, wd);
        if (b.l < -2 || b.t < -2 || b.r > L.W + 2 || b.b > L.H + 2) bad.push('has a label that does not fit inside the graph: ' + wd.text + '. Move it with pos or labelAt, or widen the axes');
      }
      /* two words on top of each other: an axis's name on a number, a label on a label */
      const boxes = words.map(wd => ({wd, b: box(L, wd)}));
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const [p, q] = [boxes[i].b, boxes[j].b], ox = Math.min(p.r, q.r) - Math.max(p.l, q.l), oy = Math.min(p.b, q.b) - Math.max(p.t, q.t);
        if (ox > 2 && oy > 2) bad.push('has labels that run into each other: ' + boxes[i].wd.text + ' and ' + boxes[j].wd.text + '. Move one with pos or labelAt');
      }
      const lw = shownLen(x.label || '') * cw(L.fw), yl = shownLen(y.label || '') * cw(L.fw);
      if (lw > L.pw * 0.6 || yl > L.pw * 0.6) bad.push('has an axis label too long for the graph. Keep it to a word or two');
      for (const it of f.items) for (const k of ['label', 'xLabel', 'yLabel']) if (it[k] && shownLen(it[k]) > (opt ? 12 : 26)) bad.push('has a label too long to read on a graph: ' + it[k]);
    }
    return [...new Set(bad)];
  }
  /* Problems with every figure in a point, each starting with where it is. */
  function pointProblems(p) {
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
    for (const w of of(p)) for (const m of problems(w.fig, w.opt)) out.push('the figure on ' + w.at + ' ' + m);
    return out;
  }
  return {html, problems, pointProblems, of, texts, key, layout, plan, STYLE_CSS};
})();
