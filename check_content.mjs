// Checks the study content: shape, option lengths, banned words and punctuation.
// Maths is checked for words and punctuation here. tests/maths-content.mjs checks its maths.
// The Economics point bank (econ-points.js) gets the same checks as content.js, and each course that lists its
// points (edexcel-content.js) is checked too: every id it lists is in the bank, every bank point is used,
// and every chapter is marked draft or checked.
import fs from 'fs';
const read = f => fs.readFileSync(new URL('./' + f, import.meta.url), 'utf8');
const TOPIC = new Function(read('src/content.js') + '; return TOPIC;')();
const {MATHS, MAKE} = new Function(read('src/maths-content.js') + read('src/15-maths-make.js') + '; return {MATHS, MAKE};')();
const BANK = new Function(read('src/econ-points.js') + '; return ECON_POINTS;')();
const COURSES = [new Function(read('src/edexcel-content.js') + '; return EDEXCEL;')()];
const BANNED = /\b(crucial|delve|enhance|foster|garner|highlight|interplay|intricate|key|landscape|meticulous|pivotal|showcase|tapestry|testament|underscore|valuable|vibrant|groundbreaking|renowned)\w*/i;
const problems = [];
const wordCheck = (id, t) => {
  if (BANNED.test(t)) problems.push(id + ' banned word in: ' + t);
  if (/[—–]/.test(t)) problems.push(id + ' dash in: ' + t);
  if (/\s{2,}/.test(t)) problems.push(id + ' double space in: ' + t);
};
/* One point with a card and two questions. tally counts its questions and how often the right answer is longest. */
function checkPoint(id, p, tally) {
  tally.pts++;
  if (!p.title) problems.push(id + ' has no title');
  if (!Array.isArray(p.card) || p.card.length < 3 || p.card.length > 4) problems.push(id + ' card has ' + (p.card || []).length + ' lines');
  if (!p.remember) problems.push(id + ' has no remember line');
  const texts = [p.title, p.remember, ...p.card.flat()];
  for (const k of ['a', 'b']) {
    const q = p[k]; tally.qs++;
    if (!q || !q.q || !q.why || !q.clue) { problems.push(id + k + ' is missing a part'); continue; }
    if (!Array.isArray(q.opts) || q.opts.length !== 4 || new Set(q.opts).size !== 4) problems.push(id + k + ' needs four different options');
    if (k === 'b' && ![2, 3].includes(q.d)) problems.push(id + k + ' has no difficulty');
    const len = q.opts.map(o => o.length), rest = Math.max(...len.slice(1));
    if (len[0] > rest) tally.longest++;
    tally.margins.push([id + k, len[0] - rest, len.join('/')]);
    q.opts.forEach(o => { if (o.length > 60) problems.push(id + k + ' option is ' + o.length + ' characters: ' + o); if (/[.]$/.test(o)) problems.push(id + k + ' option ends with a full stop: ' + o); });
    texts.push(q.q, q.why, q.clue, ...q.opts);
  }
  for (const t of texts) wordCheck(id, t);
}
const report = (name, t) => {
  console.log(name + ':', t.pts, 'points,', t.qs, 'questions');
  console.log('  correct option is the longest in', t.longest, 'of', t.qs, '(chance is about', Math.round(t.qs / 4) + ')');
  console.log('  largest margins:', t.margins.sort((a, b) => b[1] - a[1]).slice(0, 8).map(m => m[0] + ' +' + m[1] + ' [' + m[2] + ']').join('\n    '));
};
const tally = () => ({pts: 0, qs: 0, longest: 0, margins: []});

const nsw = tally();
for (const ch of TOPIC.chapters) for (const p of ch.points) checkPoint(p.id, p, nsw);
report('NSW Economics', nsw);

const bank = tally(), used = new Set(), ids = new Set();
for (const id of Object.keys(BANK)) {
  if (!/^e-[a-z]+$/.test(id)) problems.push(id + ' is not a bank id: e- then lower-case letters');
  checkPoint(id, BANK[id], bank);
}
for (const c of COURSES) {
  const t = tally();
  if (!c.id || !c.course || !c.year || !c.name || !c.note) problems.push((c.id || 'a course') + ' is missing its id, course, year, name or note');
  for (const u of c.units) {
    if (!u.title) problems.push(c.id + ' has a unit with no title');
    wordCheck(c.id, u.title);
    for (const ch of u.chapters) {
      if (ids.has(ch.id)) problems.push(ch.id + ' is used by two chapters');
      ids.add(ch.id);
      if (ch.check !== 'draft' && ch.check !== 'checked') problems.push(ch.id + ' check must be draft or checked, not ' + ch.check);
      if (!Array.isArray(ch.points)) problems.push(ch.id + ' has no list of points');
      wordCheck(ch.id, ch.title);
      for (const pid of ch.points || []) {
        if (!BANK[pid]) { problems.push(ch.id + ' lists ' + pid + ', which is not in the bank'); continue; }
        if (ch.points.indexOf(pid) !== ch.points.lastIndexOf(pid)) problems.push(ch.id + ' lists ' + pid + ' twice');
        used.add(pid);
        checkPoint(pid, BANK[pid], t);
      }
    }
  }
  report(c.course + ', ' + c.year, t);
}
for (const id of Object.keys(BANK)) if (!used.has(id)) problems.push(id + ' is in the bank but no course lists it');
for (const id of [...TOPIC.chapters.map(c => c.id), ...MATHS.chapters.map(c => c.id)]) if (ids.has(id)) problems.push(id + ' clashes with a course chapter id');

let mpts = 0, mforms = 0;
for (const ch of MATHS.chapters) for (const p of ch.points) {
  mpts++; mforms += p.forms.length;
  const texts = [ch.title, p.title, p.intro, p.remember, ...p.forms.flatMap((f, i) => MAKE.question(p, {form: i, vals: f.ex}).steps.map(s => s.note))];
  for (const t of texts) wordCheck(p.id, t);
}
console.log('maths:', mpts, 'points,', mforms, 'question templates');
console.log(problems.length ? 'PROBLEMS:\n  ' + problems.join('\n  ') : 'no problems found');
process.exitCode = problems.length ? 1 : 0;
