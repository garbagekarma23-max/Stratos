// Checks the study content: shape, option lengths, banned words and punctuation.
// Maths is checked for words and punctuation here. tests/maths-content.mjs checks its maths.
import fs from 'fs';
const read = f => fs.readFileSync(new URL('./' + f, import.meta.url), 'utf8');
const TOPIC = new Function(read('src/content.js') + '; return TOPIC;')();
const {MATHS, MAKE} = new Function(read('src/maths-content.js') + read('src/15-maths-make.js') + '; return {MATHS, MAKE};')();
const BANNED = /\b(crucial|delve|enhance|foster|garner|highlight|interplay|intricate|key|landscape|meticulous|pivotal|showcase|tapestry|testament|underscore|valuable|vibrant|groundbreaking|renowned)\w*/i;
let pts = 0, qs = 0, longest = 0, problems = [];
const margins = [];
for (const ch of TOPIC.chapters) for (const p of ch.points) {
  pts++;
  if (!Array.isArray(p.card) || p.card.length < 3 || p.card.length > 4) problems.push(p.id + ' card has ' + (p.card || []).length + ' lines');
  if (!p.remember) problems.push(p.id + ' has no remember line');
  const texts = [p.title, p.remember, ...p.card.flat()];
  for (const k of ['a', 'b']) {
    const q = p[k]; qs++;
    if (!q || !q.q || !q.why || !q.clue) { problems.push(p.id + k + ' is missing a part'); continue; }
    if (!Array.isArray(q.opts) || q.opts.length !== 4 || new Set(q.opts).size !== 4) problems.push(p.id + k + ' needs four different options');
    if (k === 'b' && ![2, 3].includes(q.d)) problems.push(p.id + k + ' has no difficulty');
    const len = q.opts.map(o => o.length), rest = Math.max(...len.slice(1));
    if (len[0] > rest) longest++;
    margins.push([p.id + k, len[0] - rest, len.join('/')]);
    q.opts.forEach(o => { if (o.length > 60) problems.push(p.id + k + ' option is ' + o.length + ' characters: ' + o); if (/[.]$/.test(o)) problems.push(p.id + k + ' option ends with a full stop: ' + o); });
    texts.push(q.q, q.why, q.clue, ...q.opts);
  }
  for (const t of texts) {
    if (BANNED.test(t)) problems.push(p.id + ' banned word in: ' + t);
    if (/[—–]/.test(t)) problems.push(p.id + ' dash in: ' + t);
    if (/\s{2,}/.test(t)) problems.push(p.id + ' double space in: ' + t);
  }
}
let mpts = 0, mforms = 0;
for (const ch of MATHS.chapters) for (const p of ch.points) {
  mpts++; mforms += p.forms.length;
  const texts = [ch.title, p.title, p.intro, p.remember, ...p.forms.flatMap((f, i) => MAKE.question(p, {form: i, vals: f.ex}).steps.map(s => s.note))];
  for (const t of texts) {
    if (BANNED.test(t)) problems.push(p.id + ' banned word in: ' + t);
    if (/[—–]/.test(t)) problems.push(p.id + ' dash in: ' + t);
    if (/\s{2,}/.test(t)) problems.push(p.id + ' double space in: ' + t);
  }
}
console.log(pts, 'points,', qs, 'questions');
console.log('maths:', mpts, 'points,', mforms, 'question templates');
console.log('correct option is the longest in', longest, 'of', qs, '(chance is about', Math.round(qs / 4) + ')');
console.log('largest margins:', margins.sort((a, b) => b[1] - a[1]).slice(0, 8).map(m => m[0] + ' +' + m[1] + ' [' + m[2] + ']').join('\n  '));
console.log(problems.length ? 'PROBLEMS:\n  ' + problems.join('\n  ') : 'no problems found');
