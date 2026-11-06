/* ---------- maths inside a point's text ----------
   A made maths point writes its maths as LaTeX between \( and \), such as "The axis is \(x = -\frac{b}{2a}\)."
   (content/latex.mjs has the rules, and check_content.mjs checks them.)
   tx() turns a point's text into HTML: the words are escaped as usual, and each piece of maths becomes a <math-span>,
   which MathLive draws as real maths. MathLive is big, so it loads from lab/mathlive only the first time some text has
   maths in it, and a course with maths starts loading it as soon as it is picked (setSubject in 10-core.js). Text with
   no maths is only escaped. Until MathLive is ready, a <math-span> is kept invisible (lab/keys.css), so the LaTeX itself
   never shows.
   Screen readers read each piece from its label, which speak() writes in words: "x equals negative b over 2 a".
   This file comes before 10-core.js, which uses hasMx while it loads, and has no screen code of its own, so
   tests/maths-text.mjs can run it with no browser. */
const MX_SPLIT = /\\\((.+?)\\\)/;
const hasMx = s => typeof s === 'string' && s.indexOf('\\(') >= 0;
let mathLiveLoad = null;
function loadMathLive() {
  if (!mathLiveLoad) mathLiveLoad = new Promise((ok, fail) => {
    if (window.MathLive) { ok(); return; }
    const s = document.createElement('script');
    s.src = 'lab/mathlive/mathlive.min.js';
    s.onload = ok;
    s.onerror = () => { mathLiveLoad = null; fail(new Error('MathLive did not load')); };
    document.head.appendChild(s);
  });
  return mathLiveLoad;
}
function tx(s) {
  s = String(s);
  if (!hasMx(s)) return esc(s);
  loadMathLive().catch(() => {});
  const parts = s.split(MX_SPLIT);
  /* A bracket just before a piece of maths, and the marks just after it (a comma, a full stop, a closing bracket), are
     kept on the same line as the maths, so a line never starts with a comma. */
  for (let i = 1; i < parts.length; i += 2) {
    const before = /[(\[‘“"]+$/.exec(parts[i - 1]), after = /^[.,;:?!)\]’”"]+/.exec(parts[i + 1]);
    const open = before ? before[0] : '', close = after ? after[0] : '';
    parts[i - 1] = esc(parts[i - 1].slice(0, parts[i - 1].length - open.length));
    parts[i + 1] = parts[i + 1].slice(close.length);
    const m = '<math-span class="mx" role="img" aria-label="' + esc(speak(parts[i])) + '">' + esc(parts[i]) + '</math-span>';
    parts[i] = open || close ? '<span class="mxw">' + esc(open) + m + esc(close) + '</span>' : m;
  }
  parts[parts.length - 1] = esc(parts[parts.length - 1]);
  return parts.join('');
}
/* The same text as words, for the screen reader's live line (say in 30-shell.js). */
const spoken = s => hasMx(s) ? String(s).split(MX_SPLIT).map((part, i) => i % 2 ? speak(part) : part).join('') : String(s);

/* A piece of LaTeX read aloud, the way a teacher in Australia would say it. It knows the commands content/latex.mjs
   allows (COMMANDS there), so every piece the content check passes has a reading. */
const SPEAK = {le: 'is less than or equal to', leq: 'is less than or equal to', ge: 'is greater than or equal to', geq: 'is greater than or equal to',
  ne: 'is not equal to', neq: 'is not equal to', approx: 'is approximately equal to', equiv: 'is equivalent to', lt: 'is less than', gt: 'is greater than',
  pm: 'plus or minus', mp: 'minus or plus', times: 'times', cdot: 'times', div: 'divided by', to: 'approaches', rightarrow: 'gives', Rightarrow: 'implies',
  implies: 'implies', iff: 'if and only if', leftarrow: 'from', Leftarrow: 'is implied by', leftrightarrow: 'if and only if', in: 'is in', notin: 'is not in',
  subset: 'is a subset of', subseteq: 'is a subset of', cup: 'union', cap: 'intersection', emptyset: 'the empty set', varnothing: 'the empty set',
  infty: 'infinity', circ: 'degrees', angle: 'angle', triangle: 'triangle', parallel: 'is parallel to', perp: 'is perpendicular to', ldots: 'dot dot dot',
  cdots: 'dot dot dot', dots: 'dot dot dot', prime: 'prime', mid: 'given', colon: ':', therefore: 'therefore', because: 'because', forall: 'for all',
  exists: 'there exists', neg: 'not', land: 'and', lor: 'or', sin: 'sine', cos: 'cos', tan: 'tan', sec: 'sec', csc: 'cosec', cot: 'cot',
  arcsin: 'inverse sine', arccos: 'inverse cos', arctan: 'inverse tan', exp: 'exp', min: 'min', max: 'max', ln: 'natural log', log: 'log',
  langle: 'open angle bracket', rangle: 'close angle bracket', lfloor: 'floor', rfloor: 'end floor', lceil: 'ceiling', rceil: 'end ceiling',
  lvert: 'the absolute value of', rvert: 'end absolute value', vert: 'bar', varepsilon: 'epsilon', varphi: 'phi', Delta: 'delta', Sigma: 'sigma', Omega: 'omega'};
const SAY_CHAR = {'+': 'plus', '=': 'equals', '<': 'is less than', '>': 'is greater than', '(': 'open bracket', ')': 'close bracket', '[': 'open square bracket',
  ']': 'close square bracket', ',': ',', '!': 'factorial', "'": 'prime', '/': 'over', '*': 'times', ':': ':', ';': ';'};
function speak(tex) {
  /* nCr written as {}^{n}C_{r} is read as n choose r, and a number's thousands comma {,} is part of the number. */
  tex = tex.replace(/\{\}\^\{([^{}]+)\}C_\{([^{}]+)\}/g, '\\binom{$1}{$2}').replace(/(\d)\{,\}(?=\d)/g, '$1,');
  let i = 0;
  const sp = () => { while (tex[i] === ' ') i++; };
  const raw = () => { sp(); if (tex[i] !== '{') return ''; const j = tex.indexOf('}', i); const t = tex.slice(i + 1, j); i = j + 1; return t; };
  /* One argument: a group in braces, or a single token. Returns [words, simple], simple when it is one word. */
  const arg = () => { sp(); let w; if (tex[i] === '{') { i++; w = run('}'); i++; } else w = item(false).w; return w; };
  /* A part is short when it is one term with no signs, such as 2 a, so "b over 2 a" needs no "end fraction". */
  const one = w => w.length === 1 || (w.length <= 3 && w.every(x => /^([\d.,$]+|[a-zA-Z]|pi|theta|delta)$/.test(x)));
  const end = (w, e) => one(w) ? w : w.concat(e);
  /* A ^ or _ after something, read with it. */
  function post(w) {
    for (;;) {
      sp();
      if (tex[i] === '^') {
        i++; const e = arg();
        if (e.length === 1 && e[0] === '2') w = w.concat('squared');
        else if (e.length === 1 && e[0] === '3') w = w.concat('cubed');
        else if (e.length === 1 && e[0] === 'degrees') w = w.concat('degrees');
        else w = w.concat('to the power of', e, one(e) ? [] : [',']);
      } else if (tex[i] === '_') { i++; w = w.concat('sub', arg()); }
      else return w;
    }
  }
  /* Limits under and over \lim, \int and \sum: _{...} and ^{...} in either order. */
  function limits() {
    let lo = null, hi = null;
    for (;;) { sp(); if (tex[i] === '_') { i++; lo = arg(); } else if (tex[i] === '^') { i++; hi = arg(); } else return [lo, hi]; }
  }
  /* One token and what follows it. operand says whether the token before was a number or letter, which tells a minus
     sign (x minus 2) from a negative number (negative 2). */
  function item(operand) {
    sp();
    const c = tex[i];
    let m = /^\d+(?:,\d{3})*(?:\.\d+)?/.exec(tex.slice(i));
    if (m) { i += m[0].length; return {w: post([m[0]]), operand: true}; }
    if (/[a-zA-Z]/.test(c)) { i++; return {w: post([c]), operand: true}; }
    if (c === '{') { i++; const w = run('}'); i++; return {w: post(w), operand: w.length > 0}; }
    if (c === '-') { i++; return {w: [operand ? 'minus' : 'negative'], operand: false}; }
    if (c === '|') { i++; const w = run('|'); i++; return {w: post(['the absolute value of', ...end(w, ', end absolute value')]), operand: true}; }
    if (c === ')' || c === ']') { i++; return {w: post([SAY_CHAR[c]]), operand: true}; }
    if (c !== '\\') { i++; return {w: [SAY_CHAR[c] || c], operand: false}; }
    m = /^\\([a-zA-Z]+|.)/.exec(tex.slice(i));
    i += m[0].length;
    const n = m[1];
    if (n === 'frac' || n === 'dfrac' || n === 'tfrac') {
      const a = arg(), b = arg();
      return {w: post(one(a) && one(b) ? [...a, 'over', ...b] : ['the fraction', ...a, 'over', ...b, ', end fraction']), operand: true};
    }
    if (n === 'sqrt') {
      sp(); let k = null;
      if (tex[i] === '[') { const j = tex.indexOf(']', i); k = tex.slice(i + 1, j); i = j + 1; }
      const a = arg(), root = k === null ? 'the square root of' : k === '3' ? 'the cube root of' : 'the ' + k + 'th root of';
      return {w: post([root, ...end(a, ', end root')]), operand: true};
    }
    if (n === 'binom') { const a = arg(), b = arg(); return {w: post([...a, 'choose', ...b]), operand: true}; }
    if (n === 'text' || n === 'mathrm' || n === 'mathbb') return {w: post([raw()]), operand: true};
    if (n === 'overline' || n === 'bar') return {w: post([...arg(), 'bar']), operand: true};
    if (n === 'hat') return {w: post([...arg(), 'hat']), operand: true};
    if (n === 'vec') return {w: post(['vector', ...arg()]), operand: true};
    if (n === 'left' || n === 'right' || n === 'quad' || n === 'qquad' || /^[,;:! ]$/.test(n)) return {w: [], operand: operand};
    if (n === 'lim') { const [lo] = limits(); return {w: lo ? ['the limit as', ...lo, 'of'] : ['the limit of'], operand: false}; }
    if (n === 'int' || n === 'sum' || n === 'prod') {
      const [lo, hi] = limits(), name = n === 'int' ? 'the integral' : n === 'sum' ? 'the sum' : 'the product';
      return {w: [name, ...(lo ? ['from', ...lo] : []), ...(hi ? ['to', ...hi] : []), 'of'], operand: false};
    }
    if (n === 'log') { sp(); if (tex[i] === '_') { i++; return {w: ['log base', ...arg(), 'of'], operand: false}; } return {w: ['log'], operand: false}; }
    if (n === '$') { const k = /^\d+(?:,\d{3})*(?:\.\d+)?/.exec(tex.slice(i)); if (k) { i += k[0].length; return {w: post(['$' + k[0]]), operand: true}; } return {w: ['dollars'], operand: true}; }
    if (n === '%') return {w: ['percent'], operand: true};
    if (n === '{' || n === '}') return {w: [n === '{' ? 'open curly bracket' : 'close curly bracket'], operand: n === '}'};
    if (n === '&') return {w: ['and'], operand: false};
    const word = SPEAK[n] || n;
    const isSymbol = /^(pi|theta|alpha|beta|gamma|delta|Delta|epsilon|varepsilon|lambda|mu|sigma|Sigma|phi|varphi|omega|Omega|rho|tau|infty|emptyset|varnothing|circ|prime)$/.test(n);
    return {w: isSymbol ? post([word]) : [word], operand: isSymbol};
  }
  function run(stop) {
    const w = [];
    let operand = false;
    while (i < tex.length && tex[i] !== stop) { const r = item(operand); w.push(...r.w); operand = r.operand; }
    return w;
  }
  return run(null).join(' ').replace(/ ([,;:])/g, '$1').replace(/,(,| ,)+/g, ',').replace(/\s+/g, ' ').replace(/[,\s]+$/, '').trim();
}

/* LaTeX as plain characters, for Search: \frac{-b}{2a} becomes (−b)/(2a), x^{2} becomes x^2. */
function mxPlain(t) {
  const SYM = {le: '≤', ge: '≥', ne: '≠', pm: '±', times: '×', div: '÷', pi: 'π', theta: 'θ', infty: '∞', to: '→', cdot: '·', circ: '°', approx: '≈', int: '∫', sum: 'Σ', Delta: 'Δ'};
  let out = t.replace(/\\left|\\right|\\[,;!]|\\quad/g, ' ').replace(/\\(?:text|mathrm)\{([^{}]*)\}/g, '$1');
  for (let n = 0; n < 6; n++) out = out.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)').replace(/\\sqrt\{([^{}]*)\}/g, '√($1)');
  return out.replace(/\\([a-zA-Z]+)/g, (m, w) => SYM[w] || w).replace(/\\(.)/g, '$1').replace(/[{}]/g, '').replace(/-/g, '−').replace(/\s+/g, ' ').trim();
}
/* Text with its maths as plain characters. */
const plainTx = s => hasMx(s) ? String(s).split(MX_SPLIT).map((part, i) => i % 2 ? mxPlain(part) : part).join('') : String(s);
