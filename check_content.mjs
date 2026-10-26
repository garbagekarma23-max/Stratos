// Checks the study content: shape, option lengths, banned words and punctuation.
// Maths is checked for words and punctuation here. tests/maths-content.mjs checks its maths.
// The Economics point bank (econ-points.js) gets the same checks as content.js, and each course that lists its
// points (edexcel-content.js) is checked too: every id it lists is in the bank, every bank point is used,
// and every chapter is marked draft or checked.
// The courses the content pipeline made (src/bank and src/courses, see src/made.js) get the same checks, and more:
// each bank's ids start with its name, each course is for Years 7 to 12 and names a place, and an English course
// never quotes more than 10 words in a row.
//   node check_content.mjs                 checks everything in src/
//   node check_content.mjs --json FILE     checks only the points in FILE ({"kind": ..., "subject": ..., "points": {id: point}})
//                                          and prints the problems for each as JSON. content/pipeline.py uses this.
import fs from 'fs';
import { loadContent, allBankPoints, unitCourses } from './content/load.mjs';
const C = loadContent();
const {TOPIC, MATHS, ECON_POINTS} = C;
const MAKE = new Function(fs.readFileSync(new URL('./src/15-maths-make.js', import.meta.url), 'utf8') + '; return MAKE;')();
const BANK = allBankPoints(C);
const COURSES = unitCourses(C);
// key(?!nes) lets the economist Keynes through, as the ban is on the word key.
const BANNED = /\b(crucial|delve|enhance|foster|garner|highlight|interplay|intricate|key(?!nes)|landscape|meticulous|pivotal|showcase|tapestry|testament|underscore|valuable|vibrant|groundbreaking|renowned)\w*/i;
/* The banned words are a style rule, not a ban on subject vocabulary. These names and terms are taken out of the
   text before the check, so every other use is still caught: "testament" on its own, or "landscape" outside Geography.
   ALLOWED holds proper nouns, allowed in any subject. ALLOWED_IN holds a subject's literal terms, by the subject's name
   (a made course's course line, or the subject in a --json file). */
const ALLOWED = [/\b(?:New|Old) Testaments?\b/g];
const ALLOWED_IN = {Geography: [/\blandscapes?\b/gi]};
const banned = (t, subject) => BANNED.test([...ALLOWED, ...(ALLOWED_IN[subject] || [])].reduce((s, r) => s.replace(r, ''), t));
let problems = [];
const wordCheck = (id, t, subject) => {
  if (typeof t !== 'string') { problems.push(id + ' has a part that is not text'); return; }
  if (banned(t, subject)) problems.push(id + ' banned word in: ' + t);
  if (/[—–]/.test(t)) problems.push(id + ' dash in: ' + t);
  if (/\s{2,}/.test(t)) problems.push(id + ' double space in: ' + t);
};
/* A quote of more than 10 words, in straight or curly quote marks. English courses must not quote set texts at length. */
const longQuote = t => (t.match(/"[^"]*"|“[^”]*”|‘[^’]*’/g) || []).find(q => q.split(/\s+/).filter(Boolean).length > 10);
/* One point with a card and two questions. tally counts its questions and how often the right answer is longest.
   kind is the made course's kind (english, maths, theory or standard), for the rules that only some subjects have.
   subject is the course's subject, for the subject terms the banned words let through (ALLOWED_IN). */
function checkPoint(id, p, tally, kind, subject) {
  tally.pts++;
  if (!p.title) problems.push(id + ' has no title');
  if (!Array.isArray(p.card) || p.card.length < 3 || p.card.length > 4) { problems.push(id + ' card has ' + (p.card || []).length + ' lines'); if (!Array.isArray(p.card)) return; }
  if (!p.remember) problems.push(id + ' has no remember line');
  p.card.forEach(l => { if (Array.isArray(l) && (l.length !== 2 || !l[0] || !l[1])) problems.push(id + ' has a card line with a label that is not [label, text]'); });
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
  for (const t of texts) wordCheck(id, t, subject);
  if (kind === 'english') for (const t of texts) { const q = typeof t === 'string' && longQuote(t); if (q) problems.push(id + ' quotes more than 10 words: ' + q); }
}
const report = (name, t) => {
  console.log(name + ':', t.pts, 'points,', t.qs, 'questions');
  console.log('  correct option is the longest in', t.longest, 'of', t.qs, '(chance is about', Math.round(t.qs / 4) + ')');
  console.log('  largest margins:', t.margins.sort((a, b) => b[1] - a[1]).slice(0, 8).map(m => m[0] + ' +' + m[1] + ' [' + m[2] + ']').join('\n    '));
};
const tally = () => ({pts: 0, qs: 0, longest: 0, margins: []});

/* --json FILE: check only the points in it, for content/pipeline.py, and print each point's problems. */
if (process.argv[2] === '--json') {
  const input = JSON.parse(fs.readFileSync(process.argv[3], 'utf8')), out = {};
  for (const [id, p] of Object.entries(input.points)) {
    problems = [];
    try { checkPoint(id, p, tally(), input.kind, input.subject); } catch (e) { problems.push(id + ' could not be checked: ' + e.message); }
    out[id] = problems;
  }
  console.log(JSON.stringify(out));
  process.exit(0);
}

const nsw = tally();
for (const ch of TOPIC.chapters) for (const p of ch.points) checkPoint(p.id, p, nsw);
report('NSW Economics', nsw);

const bank = tally(), used = new Set(), ids = new Set(), seen = new Set();
for (const id of Object.keys(ECON_POINTS)) {
  if (!/^e-[a-z]+$/.test(id)) problems.push(id + ' is not a bank id: e- then lower-case letters');
  seen.add(id);
  checkPoint(id, BANK[id], bank);
}
/* A made bank's ids start with its name and a dash, then lower-case words joined by dashes (bus-sole-trader). */
for (const [name, points] of Object.entries(C.MADE_BANKS)) {
  if (!/^[a-z]{2,4}$/.test(name) || name === 'e') problems.push(name + ' is not a bank name: 2 to 4 lower-case letters, not e');
  for (const id of Object.keys(points)) {
    if (!new RegExp('^' + name + '-[a-z0-9]+(-[a-z0-9]+)*$').test(id)) problems.push(id + ' is not a ' + name + ' bank id: ' + name + '- then lower-case words joined by dashes');
    if (seen.has(id)) problems.push(id + ' is in two banks');
    seen.add(id);
  }
}
const courseIds = new Set();
for (const c of COURSES) {
  const t = tally(), isMade = c !== C.EDEXCEL;
  if (!c.id || !c.course || !c.year || !c.name || !c.note) problems.push((c.id || 'a course') + ' is missing its id, course, year, name or note');
  if (courseIds.has(c.id) || ['eco', 'maths'].includes(c.id)) problems.push(c.id + ' is used by two courses');
  courseIds.add(c.id);
  if (isMade) {
    if (!c.row || !c.row.name || !c.row.about) problems.push(c.id + ' has no row name and line for the subject sheet');
    if (c.place !== 'international' && !C.CURRICULA[c.place]) problems.push(c.id + ' names a place with no curriculum: ' + c.place);
    if (!Array.isArray(c.years) || !c.years.length || c.years.some(y => !(y >= 7 && y <= 12))) problems.push(c.id + ' must be for Years 7 to 12, not ' + c.years);
    if (!['standard', 'english', 'maths', 'theory'].includes(c.kind)) problems.push(c.id + ' has no kind: standard, english, maths or theory');
    if (!c.units.some(u => u.chapters.some(ch => ch.points.length))) problems.push(c.id + ' has no chapter with points');
    for (const t of [c.course, c.year, c.name, c.note, c.short, ...(c.row ? [c.row.name, c.row.about] : [])]) wordCheck(c.id, t, c.course);
  }
  for (const u of c.units) {
    if (!u.title) problems.push(c.id + ' has a unit with no title');
    wordCheck(c.id, u.title, c.course);
    for (const ch of u.chapters) {
      if (ids.has(ch.id)) problems.push(ch.id + ' is used by two chapters');
      ids.add(ch.id);
      if (ch.check !== 'draft' && ch.check !== 'checked') problems.push(ch.id + ' check must be draft or checked, not ' + ch.check);
      if (!Array.isArray(ch.points)) problems.push(ch.id + ' has no list of points');
      wordCheck(ch.id, ch.title, c.course);
      for (const pid of ch.points || []) {
        if (!BANK[pid]) { problems.push(ch.id + ' lists ' + pid + ', which is not in the bank'); continue; }
        if (ch.points.indexOf(pid) !== ch.points.lastIndexOf(pid)) problems.push(ch.id + ' lists ' + pid + ' twice');
        used.add(pid);
        checkPoint(pid, BANK[pid], t, c.kind, c.course);
      }
    }
  }
  report(c.course + ', ' + c.year, t);
}
for (const id of Object.keys(BANK)) if (!used.has(id)) problems.push(id + ' is in the bank but no course lists it');
for (const id of [...TOPIC.chapters.map(c => c.id), ...MATHS.chapters.map(c => c.id)]) if (ids.has(id)) problems.push(id + ' clashes with a course chapter id');
for (const id of ids) if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) problems.push(id + ' is not a chapter id: lower-case letters and numbers joined by dashes');

let mpts = 0, mforms = 0;
for (const ch of MATHS.chapters) for (const p of ch.points) {
  mpts++; mforms += p.forms.length;
  const texts = [ch.title, p.title, p.intro, p.remember, ...p.forms.flatMap((f, i) => MAKE.question(p, {form: i, vals: f.ex}).steps.map(s => s.note))];
  for (const t of texts) wordCheck(p.id, t);
}
console.log('maths:', mpts, 'points,', mforms, 'question templates');
console.log(problems.length ? 'PROBLEMS:\n  ' + problems.join('\n  ') : 'no problems found');
process.exitCode = problems.length ? 1 : 0;
