// Maths inside a point's text: how it is marked, how it is checked, and how long it looks on screen.
//
// A point writes its maths as LaTeX between \( and \), the usual LaTeX marks for maths inside a sentence:
//   "The axis of symmetry is \(x = -\frac{b}{2a}\)."
// In a JSON file each backslash is written twice: "\\(x = -\\frac{b}{2a}\\)". The dollar sign is not used to mark
// maths, because money amounts ($20) appear in maths and business points. Inside maths, a dollar sign is written \$.
// v2 draws each piece with MathLive (tx in src/10-core.js), and so does the review page.
//
// check_content.mjs uses this file for three things:
//   latexProblems(text)    every piece of LaTeX must parse: \( and \) in pairs, braces that match, \frac with two
//                          parts, a power or a subscript with something after it, \left and \right in pairs, only the
//                          commands in COMMANDS, and MathLive's own parser finding nothing wrong.
//   plainMaths(text)       maths written as plain text outside \( \), which fails in a maths point (see PLAIN).
//   shown(text)            the text as it looks on screen, roughly, for measuring options: \frac{12}{5} is as wide as 12.
//   sameMaths(text)        a piece of LaTeX written one standard way, so the copy check sees x^{2} and x^2 as the same.
// content/pipeline.py has the same shown() as shown_text, for rebalance.
import fs from 'fs';

export const MX = /\\\((.*?)\\\)/g;
export const hasMaths = t => typeof t === 'string' && t.includes('\\(');

/* MathLive's build for Node (lab/mathlive/mathlive-ssr.min.mjs, copied by lab/copy-mathlive.mjs). It parses LaTeX the
   way the app draws it. Loaded only when some text has maths in it. */
let ML = null;
const SSR = new URL('../lab/mathlive/mathlive-ssr.min.mjs', import.meta.url);
async function mathLive() {
  if (!ML && fs.existsSync(SSR)) ML = await import(SSR.href);
  return ML;
}
export async function ready() { await mathLive(); }

/* The commands a piece of maths may use. Each is drawn well by MathLive and read aloud by it. A command outside this
   list fails, so the content keeps to notation students meet in class. */
export const COMMANDS = new Set(`frac dfrac tfrac sqrt binom times div pm mp cdot le leq ge geq ne neq approx equiv lt gt
  pi theta alpha beta gamma delta Delta epsilon varepsilon lambda mu sigma Sigma phi varphi omega Omega rho tau
  infty to rightarrow Rightarrow leftarrow Leftarrow leftrightarrow iff implies in notin subset subseteq cup cap emptyset varnothing
  mathbb mathrm text left right lim int sum prod log ln sin cos tan sec csc cot arcsin arccos arctan exp min max
  circ angle triangle parallel perp quad qquad ldots cdots dots overline vec hat bar prime mid colon therefore because
  lvert rvert vert langle rangle lfloor rfloor lceil rceil cup forall exists neg land lor sim`.split(/\s+/));
/* \, \; \! \  (spaces) and the escaped characters \{ \} \$ \% \& \# \_ \| are fine too. */
const ESCAPED = /^\\[,;:! {}$%&#_|]/;
/* Commands that take two parts in braces, and one. */
const TWO = new Set(['frac', 'dfrac', 'tfrac', 'binom']), ONE = new Set(['sqrt', 'text', 'mathrm', 'mathbb', 'overline', 'vec', 'hat', 'bar']);

/* Splits text into words and maths: [{maths: false, t}, {maths: true, t}, ...]. bad is set when \( and \) do not pair up. */
export function split(text) {
  const out = [];
  let rest = String(text), bad = null;
  while (rest.length) {
    const a = rest.indexOf('\\(');
    const close = rest.indexOf('\\)');
    if (close >= 0 && (a < 0 || close < a)) { bad = 'has \\) with no \\( before it'; break; }
    if (a < 0) { out.push({maths: false, t: rest}); break; }
    if (a > 0) out.push({maths: false, t: rest.slice(0, a)});
    const b = rest.indexOf('\\)', a + 2);
    if (b < 0) { bad = 'has \\( with no \\) after it'; break; }
    const inner = rest.slice(a + 2, b);
    if (inner.includes('\\(')) { bad = 'has \\( inside another piece of maths'; break; }
    out.push({maths: true, t: inner});
    rest = rest.slice(b + 2);
  }
  return {parts: out, bad};
}

/* The end of the group that starts at i (a { or a single character, or a command), or -1. */
function groupEnd(s, i) {
  while (s[i] === ' ') i++;
  if (i >= s.length) return -1;
  if (s[i] === '{') {
    let depth = 0;
    for (let j = i; j < s.length; j++) {
      if (s[j] === '\\') { j++; continue; }
      if (s[j] === '{') depth++;
      else if (s[j] === '}' && --depth === 0) return j + 1;
    }
    return -1;
  }
  if (s[i] === '}') return -1;
  if (s[i] === '\\') { const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i)); return m ? i + m[0].length : -1; }
  return i + 1;
}

/* What is wrong with one piece of LaTeX (the text between \( and \)). */
export function pieceProblems(s) {
  const out = [], show = '\\(' + s + '\\)';
  if (!s.trim()) return ['has an empty piece of maths: \\(\\)'];
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\') { i++; continue; }
    if (s[i] === '{') depth++;
    else if (s[i] === '}' && --depth < 0) break;
  }
  if (depth !== 0) out.push('has braces { } that do not match in ' + show);
  if (/(^|[^\\])\$/.test(s)) out.push('has a dollar sign inside maths: write \\$ for money, in ' + show);
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') {
      const m = /^\\([a-zA-Z]+)/.exec(s.slice(i));
      if (!m) { if (!ESCAPED.test(s.slice(i, i + 2))) out.push('has a backslash that starts no command in ' + show); i++; continue; }
      const name = m[1];
      if (!COMMANDS.has(name)) out.push('uses \\' + name + ', which is not on the list of maths commands, in ' + show);
      let j = i + m[0].length;
      if (TWO.has(name)) {
        for (let n = 0; n < 2; n++) {
          while (s[j] === ' ') j++;
          if (s[j] !== '{') { out.push('needs \\' + name + '{...}{...} with both parts in braces, in ' + show); break; }
          j = groupEnd(s, j);
          if (j < 0) break;
        }
      } else if (ONE.has(name)) {
        while (s[j] === ' ') j++;
        if (name === 'sqrt' && s[j] === '[') { const k = s.indexOf(']', j); j = k < 0 ? s.length : k + 1; }
        if (s[j] !== '{') out.push('needs \\' + name + '{...} with its part in braces, in ' + show);
      }
      i += m[0].length - 1;
    } else if (c === '^' || c === '_') {
      if (groupEnd(s, i + 1) < 0) out.push('has a ' + (c === '^' ? 'power ^' : 'subscript _') + ' with nothing after it in ' + show);
      else if (s[i + 1] === c) out.push('has ' + c + c + ' in ' + show);
    }
  }
  const lefts = (s.match(/\\left\b/g) || []).length, rights = (s.match(/\\right\b/g) || []).length;
  if (lefts !== rights) out.push('has \\left and \\right that do not pair up in ' + show);
  if (ML && !out.length) {
    const errs = ML.validateLatex(s) || [];
    if (errs.length) out.push('does not parse (MathLive: ' + errs.map(e => e.code + (e.arg ? ' ' + e.arg : '')).join(', ') + ') in ' + show);
  }
  return [...new Set(out)];
}

/* Every problem with the LaTeX in a piece of text. */
export function latexProblems(text) {
  if (typeof text !== 'string' || !text.includes('\\')) return [];
  const {parts, bad} = split(text);
  if (bad) return [bad + ': ' + text];
  if (/\\\[|\\\]/.test(parts.filter(p => !p.maths).map(p => p.t).join(''))) return ['uses \\[ \\]: write maths between \\( and \\) inside the sentence: ' + text];
  return parts.filter(p => p.maths).flatMap(p => pieceProblems(p.t));
}

/* Plain-text maths: what fails in a maths point when it is written outside \( \). Each has a name for the message.
   Allowed outside \( \), on purpose:
     - numbers, money ($20), percentages (50%), coordinates and lists such as (3, 4) and 1, 2 and 3, degrees (30°),
       and times, because they read the same as words and are drawn the same either way;
     - and/or, and the units km/h, m/s, cm/s, mm/s, m/min, L/min, L/h, mL/min, kg/m, g/mL, $/kg, $/h and the like: a slash
       there is part of a unit's name, not a fraction;
     - a hyphen inside a word, such as x-axis, y-intercept or two-step. */
const UNIT_SLASH = /\b(?:and\/or|either\/or|(?:km|m|cm|mm|L|mL|kg|g|t|\$|people|students|words)\/(?:h|hr|s|min|day|week|year|L|mL|kg|g|m|m2|m²|cm|km|person|unit))\b/gi;
export const PLAIN = [
  ['a slash used as a fraction or division (write \\frac{a}{b})', /[A-Za-z0-9)\]]\s*\/\s*[A-Za-z0-9(√-]/],
  ['a caret used as a power (write x^{2} inside \\( \\))', /\^/],
  ['log_ written as text (write \\log_{e} x inside \\( \\))', /\blog_/i],
  ['sqrt written as a word (write \\sqrt{x})', /\bsqrt\b/i],
  ['<= or >= (write \\le or \\ge)', /<=|>=|=<|=>/],
  ['!= or +- (write \\ne or \\pm)', /!=|\+-|\+\/-/],
  ['a maths symbol outside \\( \\) (² ³ √ ≤ ≥ ≠ ± × ÷ − π θ ∞ ∫ Σ Δ and the like)', /[²³¹⁰⁴-⁹ⁿˣ√∛≤≥≠±×÷−π∞∫∑ΣΔθ≈∠∈∪∩→⇒]/],
  ['an equals sign or < > outside \\( \\)', /[=<>]/],
  ['a hyphen used as a minus sign (write −4 inside \\( \\) as -4)', /(^|[\s(\[{,:;])-(?=\s?[\d.(]|[a-zA-Z](?![a-zA-Z]))/],
  ['a sum written as text, such as x + 1 or 9 - 4 (put it inside \\( \\))', /[A-Za-z0-9)\u2063]\s+[+\-]\s+[A-Za-z0-9(\u2063]|[A-Za-z0-9)]\+[A-Za-z0-9(]/],
];
/* The plain-text maths in some text, outside its \( \) pieces: a list of [name, the text it was found in]. */
export function plainMaths(text) {
  if (typeof text !== 'string') return [];
  const {parts} = split(text);
  const words = parts.filter(p => !p.maths).map(p => p.t).join(' ⁣ ').replace(UNIT_SLASH, 'unit');
  return PLAIN.filter(([, re]) => re.test(words)).map(([name]) => name);
}

/* LaTeX as it looks, roughly, one character for each character drawn: a fraction is as wide as its wider part, a
   command such as \pi or \le is one character, a function name such as \sin keeps its letters. */
export function shownMaths(s) {
  s = s.replace(/\\(?:left|right)\b|\\[,;:!]|\\q?quad\b/g, '').replace(/\\(?:text|mathrm|mathbb)\{([^{}]*)\}/g, '$1');
  for (let n = 0; n < 8; n++) {
    const t = s.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => (a.length >= b.length ? a : b))
      .replace(/\\binom\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => '(' + (a.length >= b.length ? a : b) + ')')
      .replace(/\\sqrt(?:\[[^\]]*\])?\{([^{}]*)\}/g, '√$1');
    if (t === s) break;
    s = t;
  }
  return s.replace(/\\(log|ln|sin|cos|tan|sec|csc|cot|lim|max|min|exp)(?![a-zA-Z])/g, '$1').replace(/\\[a-zA-Z]+/g, '#').replace(/\\./g, '#')
    .replace(/[{}^_]/g, '').replace(/\s+/g, ' ').trim();
}
export const shown = t => typeof t === 'string' && t.includes('\\(') ? t.replace(MX, (m, s) => shownMaths(s)) : t;

/* A piece of LaTeX written one standard way: no spaces or braces, \dfrac as \frac, \leq as \le and the like. */
export function sameMaths(t) {
  return t.replace(MX, (m, s) => s.replace(/\\[dt]frac/g, '\\frac').replace(/\\leq\b/g, '\\le').replace(/\\geq\b/g, '\\ge').replace(/\\neq\b/g, '\\ne')
    .replace(/\\(?:left|right)\b|\\[,;:!]/g, '').replace(/[{}\s]/g, ''));
}
