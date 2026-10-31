// No two questions may ask the same thing word for word, in any bank or in NSW Economics. The tests find each answer
// by its question's text, and a student in two courses would meet one question with two right answers. Checked with
// no browser: check_content.mjs --json (the way content/pipeline.py checks each point it writes or adapts) and the
// full check on a copy of src/ with a copied question added.
// Run: node questions.mjs
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { check, BANK } from './lib.mjs';
const R = [];
const ROOT = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-questions-'));
const PED = BANK['e-ped'].a.q;

// A point that passes every other check, with its two questions given.
const point = (qa, qb) => ({
  title: 'A plain point', remember: 'One line to remember.',
  card: ['The first line of the card.', 'The second line of the card.', 'The third line of the card.'],
  a: {q: qa, opts: ['The right one', 'A wrong one', 'Another wrong one', 'A third wrong one'], why: 'Because it is right.', clue: 'Read the card.'},
  b: {d: 2, q: qb, opts: ['The right one', 'A wrong one', 'Another wrong one', 'A third wrong one'], why: 'Because it is right.', clue: 'Read the card.'}
});
function problems(points) {
  const f = path.join(dir, 'in.json');
  fs.writeFileSync(f, JSON.stringify({kind: 'standard', subject: 'Testing', points}));
  return JSON.parse(spawnSync('node', ['check_content.mjs', '--json', f], {cwd: ROOT, encoding: 'utf8'}).stdout);
}
const copies = list => list.filter(p => p.includes('asks the same question'));

check(copies(problems({'tst-one': point('Which option is right?', 'Which option is right here?')})['tst-one']).length === 0, 'a point with questions of its own passes', R);
const one = copies(problems({'tst-one': point(PED, 'Which option is right here?')})['tst-one']);
check(one.length === 1 && one[0].includes('e-peda') && one[0].includes('Word it differently'), 'a question copied from a bank point is caught, naming the point it copies', R);
const loose = copies(problems({'tst-one': point('  ' + PED.toUpperCase().replace(/ /g, '  ').replace(/\?$/, '') + '.', 'Which option is right here?')})['tst-one']);
check(loose.length === 1, 'and so is one that differs only in capitals, spaces or the mark at the end', R);
const two = problems({'tst-one': point('Which option is right?', 'A question in both?'), 'tst-two': point('Which is the other one?', 'A question in both?')});
check(copies(two['tst-one']).length === 1 && copies(two['tst-two']).length === 1, 'two points checked together that share a question are both caught', R);
check(copies(problems({'tst-one': point('The same question?', 'The same question?')})['tst-one']).length === 2, 'a point whose two questions are the same is caught, on each', R);
// A rewrite of a bank point (rebalance, an edit on the review page) is checked under its own id, so it is never its own copy.
check(copies(problems({'e-ped': BANK['e-ped']})['e-ped']).length === 0, 'a point checked under its own id is not a copy of itself', R);

// The full check, on a copy of src/ with a made course whose point copies an Economics bank question.
const copy = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-questions-src-'));
fs.cpSync(path.join(ROOT, 'src'), path.join(copy, 'src'), {recursive: true});
fs.mkdirSync(path.join(copy, 'content'));
fs.copyFileSync(path.join(ROOT, 'content', 'load.mjs'), path.join(copy, 'content', 'load.mjs'));
fs.copyFileSync(path.join(ROOT, 'check_content.mjs'), path.join(copy, 'check_content.mjs'));
const full = () => spawnSync('node', ['check_content.mjs'], {cwd: copy, encoding: 'utf8'});
check(full().status === 0, 'the full check passes on src/ as it is', R);
fs.mkdirSync(path.join(copy, 'src', 'bank'), {recursive: true}); fs.mkdirSync(path.join(copy, 'src', 'courses'), {recursive: true});
fs.writeFileSync(path.join(copy, 'src', 'bank', 'zzq.js'), 'MADE_BANKS.zzq = ' + JSON.stringify({'zzq-copy': point(PED, 'Which option is right here?')}) + ';\n');
fs.writeFileSync(path.join(copy, 'src', 'courses', 'zzq-course.js'), 'MADE_COURSES.push(' + JSON.stringify({
  id: 'zzq-course', course: 'Testing', year: 'Year 9', name: 'Testing, Year 9', short: 'Testing', note: 'A course for this test only.', place: 'nsw', kind: 'standard',
  years: [9], chips: [], row: {name: 'Testing, Year 9', about: 'NSW, Test topic'},
  units: [{title: 'A unit', chapters: [{id: 'zzq-course-1-1', title: 'A chapter', check: 'checked', points: ['zzq-copy']}]}]}) + ');\n');
const out = full();
check(out.status === 1 && /PROBLEMS:[^]*e-peda and zzq-copya ask the same question, word for word/.test(out.stdout),
  'the full check fails when a made bank copies a question from another bank, and names both', R);
fs.rmSync(dir, {recursive: true, force: true}); fs.rmSync(copy, {recursive: true, force: true});
console.log(R.join('\n'));
