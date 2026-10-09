/* ---------- maths: making a question from a template ----------
   Each maths point in maths-content.js has forms: templates that pick numbers and write the question,
   its answers and its worked solution from them. Nothing here touches the screen, so the tests can run it on its own. */
const MAKE = (() => {
  const whole = v => Math.abs(v - Math.round(v)) < 1e-9;
  /* A small rule or sum from the content, such as 'a*x+b' or 'c != 0', turned into a function of the numbers.
     The content is ours and lives in this file, so this never runs anything a user typed. */
  const made = {};
  function fn(expr, names) {
    const k = names.join(',') + '|' + expr;
    if (!made[k]) made[k] = new Function(...names, 'whole', '"use strict"; return (' + expr + ');');
    return made[k];
  }
  const run = (expr, v) => { const names = Object.keys(v); return fn(expr, names)(...names.map(n => v[n]), whole); };

  /* A number as LaTeX: 4, -4, 2.5 (in a form with decimals) or \frac{5}{2}. */
  function texNum(v, dec) {
    if (whole(v)) return String(Math.round(v));
    if (dec) return String(parseFloat(v.toFixed(6)));
    for (let q = 2; q <= 1000; q++) if (whole(v * q)) { const p = Math.round(Math.abs(v) * q); return (v < 0 ? '-' : '') + '\\frac{' + p + '}{' + q + '}'; }
    return String(parseFloat(v.toFixed(6)));
  }
  /* A number as words show it: a proper minus sign, and 5/2 for a fraction. */
  function textNum(v, dec) { return texNum(v, dec).replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2').replace('-', '−'); }

  /* Fill in every [sum] in a line, then tidy the signs: + -3 is - 3, - -3 is + 3, and 1x is x. */
  function fill(s, v, dec, words) {
    let out = s.replace(/\[([^\[\]]+)\]/g, (m, e) => (words ? textNum : texNum)(run(e, v), dec));
    if (!words) out = out.replace(/\+-/g, '-').replace(/--/g, '+').replace(/-\+/g, '-');
    out = out.replace(/(^|[^0-9.])1x/g, '$1x');
    return out;
  }
  /* Choose one number for each name in pick: whole numbers from lowest to highest and never 0, or steps of a set size. */
  function choose(pick) {
    const v = {};
    Object.keys(pick).forEach(n => {
      const r = pick[n];
      if (r.length > 2) {
        const steps = Math.round((r[1] - r[0]) / r[2]);
        v[n] = parseFloat((r[0] + Math.floor(Math.random() * (steps + 1)) * r[2]).toFixed(6));
      } else {
        do v[n] = r[0] + Math.floor(Math.random() * (r[1] - r[0] + 1)); while (v[n] === 0);
      }
    });
    return v;
  }
  /* Work out the calc numbers from the picked ones, in order. */
  function complete(f, picked) {
    const v = Object.assign({}, picked);
    Object.keys(f.calc || {}).forEach(n => { v[n] = run(f.calc[n], v); });
    return v;
  }

  /* One question from a point.
     o.form  which form to use (otherwise one at random)
     o.vals  the numbers to use (otherwise picked at random, until they pass the form's rules)
     o.avoid questions (as LaTeX) not to make again, such as the worked example and the questions just asked
     Returns the question: eq (LaTeX), text (in words), answers (LaTeX), show, and steps as {latex, note}. */
  function question(p, o) {
    o = o || {};
    const fi = o.form !== undefined ? o.form : Math.floor(Math.random() * p.forms.length), f = p.forms[fi];
    let v = null, eq = '';
    for (let tries = 0; tries < 2000 && !v; tries++) {
      const c = complete(f, o.vals || choose(f.pick));
      eq = fill(f.eq, c, f.dec);
      if (o.vals || ((f.keep || []).every(k => run(k, c)) && (o.avoid || []).indexOf(eq) < 0)) v = c;
    }
    if (!v) throw new Error('no numbers fit the rules for ' + p.id);
    const steps = f.steps.filter(s => !s[2] || run(s[2], v)).map(s => ({latex: fill(s[0], v, f.dec), note: fill(s[1], v, f.dec, true)}));
    return {
      p: p.id, form: fi, eq: eq, text: words(eq),
      answers: (f.answers || ['[x]']).map(a => fill(a, v, f.dec)),
      show: fill(f.show || 'x=[x]', v, f.dec),
      steps: steps, give: Math.min(f.give || 1, steps.length - 1)
    };
  }
  /* The worked example: the first form, with its own numbers. */
  const example = p => question(p, {form: 0, vals: p.forms[0].ex});

  /* Maths as words, for screen readers and search: (x − 1)² = 16. */
  function words(latex) {
    return String(latex)
      .replace(/\\left\(/g, '(').replace(/\\right\)/g, ')')
      .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => (a.length > 1 ? '(' + a + ')' : a) + '/' + b)
      .replace(/\\sqrt\{([^{}]*)\}/g, '√$1')
      .replace(/\^\{?2\}?/g, '²').replace(/\\pm/g, '±').replace(/\\times/g, '×').replace(/\\div/g, '÷').replace(/\\or/g, ' or ')
      .replace(/([0-9x)²])-/g, '$1 − ').replace(/-/g, '−').replace(/([0-9x)²])±/g, '$1 ± ')
      .replace(/\s*([+=×÷])\s*/g, ' $1 ').replace(/\s+/g, ' ').trim();
  }
  return {question: question, example: example, words: words, texNum: texNum};
})();
