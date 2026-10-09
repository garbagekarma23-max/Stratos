/* Stratos Maths Lab: the maths behind the page.
   It reads a typed line, works out its value for any x, checks working lines and final answers,
   and runs the small calculator display. There is no screen code here, so the tests can run it on its own.

   MathLive hands over each line as LaTeX, the text form of maths: 3x+5=17 is "3x+5=17" and
   x/3 is "\frac{x}{3}". read() turns that text into a tree. value() works the tree out for one x. */
const LabMaths = (() => {
  'use strict';

  /* ---------- reading LaTeX into small pieces (tokens) ---------- */
  /* Commands we understand, and what each one becomes. Spacing commands are dropped. */
  const CMD = {
    times: 'times', cdot: 'times', ast: 'times', div: 'div',
    pm: 'pm', mp: 'mp', or: 'or', lor: 'or',
    frac: 'frac', dfrac: 'frac', tfrac: 'frac', cfrac: 'frac', sqrt: 'sqrt',
    placeholder: 'ph', lparen: '(', rparen: ')', lbrack: '[', rbrack: ']'
  };
  const SPACE = new Set([';', ',', '!', ':', '>', ' ', 'quad', 'qquad', 'enspace', 'thinspace', 'medspace', 'thickspace', 'displaystyle', 'textstyle']);
  const WORD = new Set(['mathrm', 'text', 'textrm', 'operatorname', 'mathit', 'textit']);
  const SIGN = {'+': '+', '-': '-', '−': '-', '*': 'times', '×': 'times', '·': 'times', '/': 'div', '÷': 'div', '±': 'pm', '=': 'eq', '(': '(', ')': ')', '[': '[', ']': ']', '{': '{', '}': '}', '^': '^'};

  class Stop extends Error { constructor(why) { super(why); this.why = why; } }

  /* Each token has a type (t), sometimes a value (v), and where it starts and ends in the text (a, b).
     Digits come out one at a time, because \frac12 means 1 over 2. The reader joins them back into numbers. */
  function tokens(src) {
    const out = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i], a = i;
      if (/\s|~|&/.test(c)) { i++; continue; }
      if (c === '\\') {
        let j = i + 1;
        if (/[a-zA-Z]/.test(src[j] || '')) { while (/[a-zA-Z]/.test(src[j] || '')) j++; } else j++;
        const name = src.slice(i + 1, j);
        i = j;
        if (SPACE.has(name)) continue;
        if (name === 'left' || name === 'right' || name === 'mleft' || name === 'mright' || name === 'bigl' || name === 'bigr') {
          while (src[i] === ' ') i++;
          let d = src[i];
          if (d === '\\') {        /* \left\lbrack and friends */
            let j2 = i + 1; while (/[a-zA-Z]/.test(src[j2] || '')) j2++;
            const dn = src.slice(i + 1, j2); i = j2;
            d = dn === 'lbrack' ? '[' : dn === 'rbrack' ? ']' : dn === 'lparen' ? '(' : dn === 'rparen' ? ')' : '?';
          } else i++;
          const open = /left|bigl/.test(name);
          if (d === '.') out.push({t: open ? '(' : ')', a: a, b: i, quiet: true});
          else if (d === '(' || d === '[') out.push({t: d, a: a, b: i});
          else if (d === ')' || d === ']') out.push({t: d, a: a, b: i});
          else throw new Stop('sign');
          continue;
        }
        if (WORD.has(name)) {        /* \mathrm{or} and \text{ or } are the word "or". Anything else in words cannot be checked. */
          const m = /^\s*\{\s*(?:\\[;, ]\s*)*([^{}]*?)\s*(?:\\[;, ]\s*)*\}/.exec(src.slice(i));
          if (!m) throw new Stop('sign');
          i += m[0].length;
          const w = m[1].replace(/\\[;, ]/g, '').trim();
          if (w === 'or') out.push({t: 'or', a: a, b: i});
          else if (w === '') continue;
          else throw new Stop('sign');
          continue;
        }
        const t = CMD[name];
        if (!t) throw new Stop('sign');
        if (t === 'ph') {             /* \placeholder{} is an empty box */
          out.push({t: 'ph', a: a, b: i});
          if (src[i] === '[') { const k = src.indexOf(']', i); i = k < 0 ? src.length : k + 1; }
          if (src[i] === '{') { const k = src.indexOf('}', i); i = k < 0 ? src.length : k + 1; }
          continue;
        }
        out.push({t: t, a: a, b: i});
        continue;
      }
      if (/[0-9.]/.test(c)) { out.push({t: 'd', v: c, a: a, b: i + 1}); i++; continue; }
      if (c === 'x') { out.push({t: 'x', a: a, b: i + 1}); i++; continue; }
      if (/[a-zA-Z]/.test(c)) throw new Stop('letter');
      if (c === '▢' || c === '⬚') { out.push({t: 'ph', a: a, b: i + 1}); i++; continue; }
      const s = SIGN[c];
      if (!s) throw new Stop('sign');
      out.push({t: s, a: a, b: i + 1});
      i++;
    }
    return out;
  }

  /* ---------- the tree ----------
     Kinds of node: n (a number), x, add, sub, mul, div, neg, pow, root, pm (plus or minus).
     A pm node has a number (k) so the checker can try it as + and as -. */
  function reader(toks) {
    let i = 0, pmCount = 0;
    const peek = () => toks[i], take = () => toks[i++];
    const want = t => { const k = take(); if (!k) throw new Stop('unfinished'); if (k.t !== t) throw new Stop(k.t === 'ph' ? 'unfinished' : 'unfinished'); return k; };
    const startsAtom = k => !!k && (k.t === 'd' || k.t === 'x' || k.t === '(' || k.t === '[' || k.t === '{' || k.t === 'frac' || k.t === 'sqrt' || k.t === 'ph');
    function expr() {
      let left = term();
      for (;;) {
        const k = peek();
        if (!k) return left;
        if (k.t === '+') { take(); left = {t: 'add', a: left, b: term()}; }
        else if (k.t === '-') { take(); left = {t: 'sub', a: left, b: term()}; }
        else if (k.t === 'pm' || k.t === 'mp') { take(); left = {t: 'pm', a: left, b: term(), k: pmCount++, flip: k.t === 'mp'}; }
        else return left;
      }
    }
    function term() {
      let left = factor();
      for (;;) {
        const k = peek();
        if (!k) return left;
        if (k.t === 'times') { take(); left = {t: 'mul', a: left, b: factor()}; }
        else if (k.t === 'div') { take(); left = {t: 'div', a: left, b: factor()}; }
        else if (startsAtom(k)) left = {t: 'mul', a: left, b: factor(), implied: true};
        else return left;
      }
    }
    function factor() {
      const k = peek();
      if (!k) throw new Stop('unfinished');
      if (k.t === '-') { take(); return {t: 'neg', a: factor()}; }
      if (k.t === '+') { take(); return factor(); }
      if (k.t === 'pm' || k.t === 'mp') { take(); return {t: 'pm', a: null, b: factor(), k: pmCount++, flip: k.t === 'mp'}; }
      return power();
    }
    function power() {
      let base = atom();
      while (peek() && peek().t === '^') { take(); base = {t: 'pow', a: base, b: arg()}; }
      return base;
    }
    /* What follows \frac, \sqrt or ^: a {group}, or a single digit, x or box. */
    function arg() {
      const k = peek();
      if (!k) throw new Stop('unfinished');
      if (k.t === '{') { take(); if (peek() && peek().t === '}') throw new Stop('unfinished'); const e = expr(); want('}'); return e; }
      if (k.t === 'd') { take(); if (k.v === '.') throw new Stop('unfinished'); return {t: 'n', v: +k.v, s: k.v}; }
      if (k.t === 'x') { take(); return {t: 'x'}; }
      if (k.t === 'ph') throw new Stop('unfinished');
      return atom();
    }
    function atom() {
      const k = take();
      if (!k) throw new Stop('unfinished');
      if (k.t === 'd') {
        let s = k.v;
        while (peek() && peek().t === 'd') s += take().v;
        if (s === '.' || (s.match(/\./g) || []).length > 1) throw new Stop('unfinished');
        return {t: 'n', v: parseFloat(s), s: s};
      }
      if (k.t === 'x') return {t: 'x'};
      if (k.t === 'ph') throw new Stop('unfinished');
      if (k.t === '(' || k.t === '[' || k.t === '{') {
        const close = k.t === '(' ? ')' : k.t === '[' ? ']' : '}';
        if (peek() && (peek().t === close || peek().t === ')' || peek().t === ']')) throw new Stop('unfinished');
        const e = expr();
        const c = take();
        if (!c || (c.t !== close && !((c.t === ')' || c.t === ']') && close !== '}'))) throw new Stop('unfinished');
        return k.t === '{' ? e : {t: 'br', a: e};
      }
      if (k.t === 'frac') { const top = arg(), bottom = arg(); return {t: 'div', a: top, b: bottom, frac: true}; }
      if (k.t === 'sqrt') {
        let index = null;
        if (peek() && peek().t === '[') { take(); index = expr(); want(']'); }
        return {t: 'root', a: arg(), n: index};
      }
      throw new Stop('unfinished');
    }
    return {
      side() { const e = expr(); return e; },
      at: () => i, peek: peek, take: take,
      pms: () => pmCount, resetPm: () => { pmCount = 0; }
    };
  }

  /* Read a whole line. A line is one or more parts joined by "or". Each part is sides joined by = signs.
     Returns {parts: [{sides, pms}], hasEq, hasX, eqAt} or {stop: reason}. */
  function read(latex) {
    let toks;
    try { toks = tokens(String(latex || '')); } catch (e) { if (e instanceof Stop) return {stop: e.why}; throw e; }
    if (!toks.length) return {stop: 'empty'};
    /* An empty box anywhere (from the fraction, root, power or square keys) is named on its own. Some boxes are
       small and easy to miss, such as an empty power left after 49, which makes a line look finished when it is not. */
    if (toks.some(k => k.t === 'ph')) return {stop: 'box'};
    const hasX = toks.some(k => k.t === 'x');
    const r = reader(toks), parts = [];
    let sides = [], eqAt = -1;
    try {
      for (;;) {
        if (!r.peek()) throw new Stop('unfinished');
        if (r.peek().t === 'eq' || r.peek().t === 'or') throw new Stop('unfinished');
        sides.push(r.side());
        const k = r.take();
        if (!k) break;
        if (k.t === 'eq') { eqAt = k.b; continue; }
        if (k.t === 'or') { parts.push({sides: sides, pms: r.pms()}); r.resetPm(); sides = []; continue; }
        throw new Stop(k.t === ')' || k.t === ']' || k.t === '}' ? 'unfinished' : 'unfinished');
      }
      parts.push({sides: sides, pms: r.pms()});
    } catch (e) { if (e instanceof Stop) return {stop: e.why}; throw e; }
    return {parts: parts, hasEq: parts.some(p => p.sides.length > 1), allEq: parts.every(p => p.sides.length > 1), hasX: hasX, eqAt: eqAt};
  }

  /* ---------- working out a value ---------- */
  function value(n, x, signs) {
    switch (n.t) {
      case 'n': return n.v;
      case 'x': return x;
      case 'br': return value(n.a, x, signs);
      case 'add': return value(n.a, x, signs) + value(n.b, x, signs);
      case 'sub': return value(n.a, x, signs) - value(n.b, x, signs);
      case 'mul': return value(n.a, x, signs) * value(n.b, x, signs);
      case 'div': { const d = value(n.b, x, signs); return d === 0 ? NaN : value(n.a, x, signs) / d; }
      case 'neg': return -value(n.a, x, signs);
      case 'pm': { const s = (signs ? signs[n.k] : 1) * (n.flip ? -1 : 1), b = value(n.b, x, signs); return (n.a ? value(n.a, x, signs) : 0) + s * b; }
      case 'pow': {
        const a = value(n.a, x, signs), b = value(n.b, x, signs);
        if (a < 0 && !Number.isInteger(b)) return NaN;
        return Math.pow(a, b);
      }
      case 'root': {
        const a = value(n.a, x, signs), k = n.n ? value(n.n, x, signs) : 2;
        if (!Number.isInteger(k) || k < 2) return NaN;
        if (a < 0) return k % 2 ? -Math.pow(-a, 1 / k) : NaN;
        return k === 2 ? Math.sqrt(a) : Math.pow(a, 1 / k);
      }
    }
    return NaN;
  }
  const hasX = n => !!n && (n.t === 'x' || hasX(n.a) || hasX(n.b) || hasX(n.n));

  /* Every way of choosing + or - for the ± signs in one part. x = ±7 becomes x = 7 and x = -7. */
  function variants(part) {
    const k = Math.min(part.pms, 6), out = [];
    for (let m = 0; m < (1 << k); m++) {
      const signs = [];
      for (let j = 0; j < part.pms; j++) signs.push(j < k && (m >> j) & 1 ? -1 : 1);
      out.push({sides: part.sides, signs: signs});
    }
    return out;
  }
  /* Two numbers are equal when they differ by less than a billionth of their size.
     That lets 2.4 × 3 + 1.3 equal 8.5, which computers get very slightly wrong. */
  const same = (p, q, tol) => isFinite(p) && isFinite(q) && Math.abs(p - q) <= tol * Math.max(1, Math.abs(p), Math.abs(q));
  function holdsVariant(v, x, tol) {
    let prev = value(v.sides[0], x, v.signs);
    if (!isFinite(prev)) return false;
    for (let j = 1; j < v.sides.length; j++) {
      const cur = value(v.sides[j], x, v.signs);
      if (!same(prev, cur, tol)) return false;
      prev = cur;
    }
    return true;
  }
  const holdsLine = (vs, x, tol) => vs.some(v => holdsVariant(v, x, tol));
  const definedLine = (vs, x) => vs.some(v => v.sides.every(s => isFinite(value(s, x, v.signs))));

  /* The x values the search tries: close together near 0, further apart further out, up to a million.
     They are nudged off whole numbers so a solution never sits exactly on one. */
  const GRID = (() => {
    const g = [], nudge = 0.000731;
    const add = (from, to, step) => { for (let x = from; x < to - step / 2; x += step) g.push(x + nudge); };
    add(-1000, -200, 1); add(-200, -20, 0.1); add(-20, 20, 0.01); add(20, 200, 0.1); add(200, 1000, 1);
    const far = []; for (let x = 1000; x < 1e6; x *= 1.02) far.push(x + nudge);
    return far.map(v => -v).reverse().concat(g, far);
  })();
  /* Spread-out values for finding lines that are true for every x. */
  const SPREAD = Array.from({length: 40}, (_, k) => -61.37 + k * 3.1415926 + 0.0123 * k * k);

  function bisect(f, lo, hi, flo) {
    for (let n = 0; n < 200; n++) {
      const mid = (lo + hi) / 2;
      if (mid === lo || mid === hi) break;
      const fm = f(mid);
      if (!isFinite(fm)) return null;
      if (fm === 0) return mid;
      if ((fm < 0) === (flo < 0)) { lo = mid; flo = fm; } else hi = mid;
    }
    return (lo + hi) / 2;
  }
  function lowest(f, lo, hi) {        /* where |f| is smallest between lo and hi, for solutions that touch 0 without crossing */
    const r = (Math.sqrt(5) - 1) / 2;
    let a = lo, b = hi, c = b - r * (b - a), d = a + r * (b - a), fc = Math.abs(f(c)), fd = Math.abs(f(d));
    for (let n = 0; n < 160; n++) {
      if (fc < fd) { b = d; d = c; fd = fc; c = b - r * (b - a); fc = Math.abs(f(c)); }
      else { a = c; c = d; fc = fd; d = a + r * (b - a); fd = Math.abs(f(d)); }
    }
    return (a + b) / 2;
  }
  /* Places where the two sides of one = sign meet. */
  function meets(f) {
    const out = [];
    let x0 = GRID[0], f0 = f(x0), xm = NaN, fm = NaN;
    for (let i = 1; i < GRID.length; i++) {
      const x1 = GRID[i], f1 = f(x1);
      if (isFinite(f0) && isFinite(f1)) {
        if ((f0 < 0) !== (f1 < 0)) { const r = bisect(f, x0, x1, f0); if (r !== null) out.push(r); }
        else if (isFinite(fm) && (fm < 0) === (f0 < 0) && Math.abs(f0) < Math.abs(fm) && Math.abs(f0) <= Math.abs(f1)) out.push(lowest(f, xm, x1));
      }
      xm = x0; fm = f0; x0 = x1; f0 = f1;
    }
    return out;
  }
  const near = (p, q) => Math.abs(p - q) <= 1e-6 * Math.max(1, Math.abs(q));

  /* All the solutions of a line: {all: true} if it is true for every x tried,
     otherwise {some: [x values], spread: true if it is true on a stretch of x}. */
  function solve(line) {
    const vs = [];
    line.parts.forEach(p => variants(p).forEach(v => vs.push(v)));
    let defined = 0, hits = 0;
    SPREAD.forEach(x => { if (definedLine(vs, x)) { defined++; if (holdsLine(vs, x, 1e-9)) hits++; } });
    if (defined >= 8 && hits === defined) return {all: true, vs: vs};
    const found = [];
    vs.forEach(v => {
      for (let j = 0; j + 1 < v.sides.length; j++) {
        const A = v.sides[j], B = v.sides[j + 1];
        meets(x => value(A, x, v.signs) - value(B, x, v.signs)).forEach(r => { if (holdsVariant(v, r, 1e-7) && !found.some(q => near(r, q))) found.push(r); });
      }
    });
    return {all: false, some: found, spread: hits > 0, vs: vs};
  }

  /* ---------- checking a working line against the question ----------
     answers is the list of the question's solutions, as numbers.
     Returns {kind: 'right' | 'wrong' | 'hint', say: one plain sentence}, or null for an empty line. */
  const HINT = {
    unfinished: 'Finish this line first.',
    box: 'This line has an empty box. Fill it in or delete it.',
    letter: 'Use x for the unknown.',
    sign: 'This line has a sign that can’t be checked.',
    noEq: 'A working line needs an = sign.',
    partEq: 'Give each part its own = sign, like x = 7 or x = −7.'
  };
  function checkLine(latex, answers) {
    const line = read(latex);
    if (line.stop === 'empty') return null;
    if (line.stop) return {kind: 'hint', say: HINT[line.stop] || HINT.unfinished};
    if (!line.hasEq) return {kind: 'hint', say: HINT.noEq};
    if (!line.allEq) return {kind: 'hint', say: HINT.partEq};
    if (!line.hasX) return {kind: 'wrong', say: 'This line has no x in it.'};
    if (checkAnswer(latex, answers).ok) return {kind: 'right', say: ''};
    const sol = solve(line);
    if (sol.all) return {kind: 'wrong', say: 'This line is true for every x.'};
    const fit = answers.filter(a => holdsLine(sol.vs, a, 1e-9));
    const extra = sol.some.filter(r => !answers.some(a => near(r, a)));
    const more = extra.length > 0 || sol.spread;
    if (fit.length === answers.length && !more) return {kind: 'right', say: ''};
    if (fit.length === 0 && !more) return {kind: 'wrong', say: 'This line has no solution.'};
    if (fit.length === answers.length) return {kind: 'wrong', say: 'This line adds a solution.'};
    if (fit.length > 0 && !more) return {kind: 'wrong', say: 'This works, but there is another answer.'};
    return {kind: 'wrong', say: 'This line changes the answer.'};
  }

  /* ---------- checking the final answer (Done) ----------
     The line must be x on its own: x = 4, x = 5/2, x = ±7, x = 7 or x = -7.
     A value passes if it is exactly an answer, or a decimal with at least 2 places that rounds to one. */
  function places(n) {           /* a typed decimal such as 2.50 or -2.33: how many places it has */
    if (n.t === 'neg') return places(n.a);
    if (n.t === 'br') return places(n.a);
    if (n.t !== 'n') return 0;
    const m = /\.(\d+)$/.exec(n.s);
    return m ? m[1].length : 0;
  }
  /* A final answer is worked out: x = 5, not x = 4 + 1. Fractions, roots and ± stay, so 10/4, -3 and ±√49 are fine,
     and so is a sum with a root in it, such as 1 ± √5, because that is how an exact answer with a root is written. */
  const sums = n => !!n && ((n.t === 'add' || n.t === 'sub' || n.t === 'mul' || (n.t === 'div' && !n.frac) || (n.t === 'pm' && n.a)) || sums(n.a) || sums(n.b) || sums(n.n));
  const roots = n => !!n && (n.t === 'root' || roots(n.a) || roots(n.b));
  function checkAnswer(latex, answers) {
    const line = read(latex);
    if (line.stop === 'empty') return {ok: false, say: 'Write the answer first, like x = 4.'};
    if (line.stop) return {ok: false, say: HINT[line.stop] || HINT.unfinished};
    const got = [];
    for (const p of line.parts) {
      const s = p.sides;
      if (s.length < 2) return {ok: false, say: line.hasEq ? HINT.partEq : 'Finish with x on its own, like x = 4.'};
      const xi = s[0].t === 'x' ? 0 : s[s.length - 1].t === 'x' ? s.length - 1 : -1;
      if (xi < 0 || s.some((n, j) => j !== xi && hasX(n))) return {ok: false, say: 'Finish with x on its own, like x = 4.'};
      const rest = s.filter((n, j) => j !== xi);
      if (rest.some(n => sums(n) && !roots(n))) return {ok: false, say: 'Work this out to one number first.', unfinished: true};
      for (const v of variants(p)) {
        const vals = rest.map(n => value(n, 0, v.signs));
        if (!vals.every(q => same(q, vals[0], 1e-9))) { got.push({v: NaN, dp: 0}); continue; }
        got.push({v: vals[0], dp: Math.max.apply(null, rest.map(places))});
      }
    }
    const hit = new Set();
    let wrong = 0, rough = 0;
    got.forEach(g => {
      const k = answers.findIndex(a => same(g.v, a, 1e-9) || (g.dp >= 2 && Math.abs(g.v - a) <= 0.5 * Math.pow(10, -g.dp) + 1e-12));
      if (k >= 0) { hit.add(k); return; }
      wrong++;
      if (g.dp > 0 && answers.some(a => Math.abs(g.v - a) <= 0.5 * Math.pow(10, -g.dp) + 1e-12)) rough++;
    });
    if (wrong) {
      if (rough === wrong) return {ok: false, say: 'Give the answer exactly, or to 2 decimal places.'};
      return {ok: false, say: hit.size ? 'One of these isn’t an answer.' : 'This isn’t the answer.'};
    }
    if (hit.size < answers.length) return {ok: false, say: answers.length - hit.size === 1 ? (answers.length === 2 ? 'There is a second answer.' : 'There is one more answer.') : 'There are more answers.'};
    return {ok: true, say: 'Right'};
  }

  /* ---------- the calculator display ----------
     It works out the part of the line after the last = sign, only if that part is plain arithmetic:
     numbers, + - × ÷, fractions, powers, roots and brackets. Like an HSC calculator, it never touches x.
     Exact values are kept as fractions (top and bottom as whole numbers), the way the Casio does. */
  const B = v => BigInt(v);
  function gcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }
  function frac(n, d) { if (d === 0n) throw new Stop('zero'); if (d < 0n) { n = -n; d = -d; } const g = gcd(n, d) || 1n; return {n: n / g, d: d / g}; }
  const BIG = 10n ** 40n;
  function tooBig(q) { return q.n > BIG || q.n < -BIG || q.d > BIG; }
  function iroot(v, k) {          /* the whole-number k-th root of v, or null if there is none */
    if (v < 0n) return null;
    let r = B(Math.round(Math.pow(Number(v), 1 / k)));
    for (let t = r - 2n; t <= r + 2n; t++) if (t >= 0n && t ** B(k) === v) return t;
    return null;
  }
  /* A value here is either exact {n, d} or rounded {f}. dec is true if the line used a decimal point. */
  function exact(node) {
    switch (node.t) {
      case 'n': {
        const s = node.s, k = s.indexOf('.');
        if (k < 0) return frac(B(s), 1n);
        const digits = (s.slice(0, k) + s.slice(k + 1)) || '0';
        return frac(B(digits), 10n ** B(s.length - k - 1));
      }
      case 'br': return exact(node.a);
      case 'neg': { const a = exact(node.a); return a.f !== undefined ? {f: -a.f} : {n: -a.n, d: a.d}; }
      case 'add': case 'sub': case 'mul': case 'div': {
        const a = exact(node.a), b = exact(node.b);
        if (a.f !== undefined || b.f !== undefined) {
          const p = a.f !== undefined ? a.f : Number(a.n) / Number(a.d), q = b.f !== undefined ? b.f : Number(b.n) / Number(b.d);
          if (node.t === 'div' && q === 0) throw new Stop('zero');
          return {f: node.t === 'add' ? p + q : node.t === 'sub' ? p - q : node.t === 'mul' ? p * q : p / q};
        }
        let r;
        if (node.t === 'add') r = frac(a.n * b.d + b.n * a.d, a.d * b.d);
        else if (node.t === 'sub') r = frac(a.n * b.d - b.n * a.d, a.d * b.d);
        else if (node.t === 'mul') r = frac(a.n * b.n, a.d * b.d);
        else { if (b.n === 0n) throw new Stop('zero'); r = frac(a.n * b.d, a.d * b.n); }
        return tooBig(r) ? {f: Number(r.n) / Number(r.d)} : r;
      }
      case 'pow': {
        const a = exact(node.a), b = exact(node.b);
        if (a.f === undefined && b.f === undefined && b.d === 1n && b.n <= 200n && b.n >= -200n) {
          if (b.n < 0n && a.n === 0n) throw new Stop('zero');
          const e = b.n < 0n ? -b.n : b.n;
          const r = b.n < 0n ? frac(a.d ** e, a.n ** e) : frac(a.n ** e, a.d ** e);
          return tooBig(r) ? {f: Math.pow(Number(a.n) / Number(a.d), Number(b.n))} : r;
        }
        const p = a.f !== undefined ? a.f : Number(a.n) / Number(a.d), q = b.f !== undefined ? b.f : Number(b.n) / Number(b.d);
        if (p < 0 && !Number.isInteger(q)) throw new Stop('domain');
        return {f: Math.pow(p, q)};
      }
      case 'root': {
        const a = exact(node.a), k = node.n ? exact(node.n) : {n: 2n, d: 1n};
        if (k.f !== undefined || k.d !== 1n || k.n < 2n || k.n > 50n) throw new Stop('domain');
        const kk = Number(k.n);
        if (a.f === undefined) {
          const neg = a.n < 0n;
          if (neg && kk % 2 === 0) throw new Stop('domain');
          const top = iroot(neg ? -a.n : a.n, kk), bottom = iroot(a.d, kk);
          if (top !== null && bottom !== null) return frac(neg ? -top : top, bottom);
        }
        const p = a.f !== undefined ? a.f : Number(a.n) / Number(a.d);
        if (p < 0 && kk % 2 === 0) throw new Stop('domain');
        return {f: p < 0 ? -Math.pow(-p, 1 / kk) : Math.pow(p, 1 / kk)};
      }
    }
    throw new Stop('sign');
  }
  /* Up to 10 digits, like the Casio screen. Very big or very small numbers get a power of ten. */
  function decimal(v) {
    if (!isFinite(v)) return null;
    if (v === 0) return {latex: '0', text: '0'};
    const a = Math.abs(v);
    if (a >= 1e10 || a < 1e-9) {
      const [m, e] = v.toExponential(9).split('e');
      const mm = String(parseFloat(m)), ee = String(parseInt(e, 10));
      return {latex: mm + '\\times10^{' + ee + '}', text: mm + ' × 10^' + ee};
    }
    const s = String(parseFloat(v.toPrecision(10)));
    return {latex: s, text: s.replace('-', '−')};
  }
  /* A plain number, a negative number or a fraction already in its lowest terms: nothing to work out. */
  function bare(n) {
    if (n.t === 'n') return true;
    if (n.t === 'neg' || n.t === 'br') return bare(n.a);
    if (n.t === 'div' && n.frac && n.a.t === 'n' && n.b.t === 'n' && !/\./.test(n.a.s + n.b.s)) {
      const p = B(n.a.s), q = B(n.b.s);
      return q > 1n && gcd(p, q) === 1n;
    }
    return false;
  }
  /* Returns null (show nothing), {error: true}, or {latex, text, from} where from is where in the line the arithmetic starts. */
  function calc(latex) {
    let toks;
    const src = String(latex || '');
    try { toks = tokens(src); } catch (e) { return null; }
    let k = -1;
    toks.forEach((t, j) => { if (t.t === 'eq' || t.t === 'or') k = j; });
    if (k >= 0 && toks[k].t === 'or') return null;
    const part = toks.slice(k + 1);
    if (!part.length || part.some(t => t.t === 'x' || t.t === 'pm' || t.t === 'mp' || t.t === 'or' || t.t === 'eq' || t.t === 'ph')) return null;
    let tree;
    try {
      const r = reader(part);
      tree = r.side();
      if (r.peek()) return null;
    } catch (e) { return null; }
    if (bare(tree)) return null;
    const dec = part.some(t => t.t === 'd' && t.v === '.');
    let v;
    try { v = exact(tree); } catch (e) { if (e instanceof Stop && (e.why === 'zero' || e.why === 'domain')) return {error: true}; return null; }
    let out;
    if (v.f !== undefined) out = decimal(v.f);
    else if (v.d === 1n) out = v.n > 10n ** 15n || v.n < -(10n ** 15n) ? decimal(Number(v.n)) : {latex: String(v.n), text: String(v.n).replace('-', '−')};
    else if (dec) out = decimal(Number(v.n) / Number(v.d));
    else {
      const neg = v.n < 0n, top = neg ? -v.n : v.n;
      out = {latex: (neg ? '-' : '') + '\\frac{' + top + '}{' + v.d + '}', text: (neg ? '−' : '') + top + '/' + v.d};
    }
    if (!out) return {error: true};
    out.from = k >= 0 ? toks[k].b : 0;
    return out;
  }

  /* The value of a piece of LaTeX with no x in it, such as an answer stored in the topic. */
  function number(latex) {
    const line = read(latex);
    if (line.stop || line.parts.length !== 1 || line.parts[0].sides.length !== 1) return NaN;
    return value(line.parts[0].sides[0], 0, []);
  }

  return {read: read, checkLine: checkLine, checkAnswer: checkAnswer, calc: calc, number: number, solve: solve};
})();
if (typeof module !== 'undefined') module.exports = LabMaths;
