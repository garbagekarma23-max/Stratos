// The banned words in check_content.mjs, with no browser. They are a style rule, not a ban on subject vocabulary:
// the names New Testament and Old Testament pass in any subject, and landscape passes in Geography only. Every other
// use is still caught. Each case runs check_content.mjs --json, the way content/pipeline.py does.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import { check } from './lib.mjs';
const R = [];
const ROOT = fileURLToPath(new URL('../', import.meta.url));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-words-'));

// A point that passes every check, with one card line set to the text being tried.
const point = line => ({
  title: 'A plain point', remember: 'One line to remember.',
  card: ['The first line of the card.', line, 'The third line of the card.'],
  a: {q: 'Which option is right?', opts: ['The right one', 'A wrong one', 'Another wrong one', 'A third wrong one'], why: 'Because it is right.', clue: 'Read the card.'},
  b: {d: 2, q: 'Which option is right here?', opts: ['The right one', 'A wrong one', 'Another wrong one', 'A third wrong one'], why: 'Because it is right.', clue: 'Read the card.'}
});
// The problems the content check finds in one card line, for a course of this subject.
function problems(line, subject, kind = 'standard') {
  const f = path.join(dir, 'in.json');
  fs.writeFileSync(f, JSON.stringify({kind, subject, points: {'tst-one': point(line)}}));
  const out = spawnSync('node', ['check_content.mjs', '--json', f], {cwd: ROOT, encoding: 'utf8'});
  return JSON.parse(out.stdout)['tst-one'];
}
const passes = (line, subject, kind) => problems(line, subject, kind).length === 0;
const caught = (line, subject, kind) => problems(line, subject, kind).some(p => p.includes('banned word'));

check(passes('A plain line about nothing in particular.', 'Biology'), 'a plain line passes', R);

// The New Testament and the Old Testament are names, so they pass in any course.
check(passes('The Christian Bible has the Old Testament and the New Testament.', 'Studies of Religion'), 'Old Testament and New Testament pass in Studies of Religion', R);
check(passes('Paul wrote many of the letters in the New Testament.', 'Ancient History'), 'New Testament passes in another subject too', R);
check(passes('The four Gospels open the New Testament.', 'English', 'english'), 'New Testament passes in an English course', R);
check(passes('Some books of the Old Testament are poetry.', undefined), 'New and Old Testament pass with no subject given', R);
check(caught('Her recovery is a testament to her hard work.', 'Studies of Religion'), 'testament on its own is still caught, even in Studies of Religion', R);
check(caught('The result stands as a testament to good planning.', 'Business Studies'), 'testament as filler is still caught in another subject', R);
check(caught('The Old Testament is long, and the ending is a testament to its age.', 'Studies of Religion'), 'a banned testament is caught next to an allowed one', R);
check(caught('The new testament of the will was signed.', 'Legal Studies'), 'a lower-case new testament (a will) is not the name, so it is caught', R);

// landscape is a Geography term in its literal sense, so it passes there and nowhere else.
check(passes('Glaciers carved the landscape of the Snowy Mountains.', 'Geography'), 'landscape passes in Geography', R);
check(passes('Weathering and erosion shape landscapes over time.', 'Geography'), 'landscapes passes in Geography', R);
check(passes('Landscape features include valleys, ridges and plains.', 'Geography'), 'Landscape with a capital passes in Geography', R);
check(caught('The competitive landscape changed after the merger.', 'Business Studies'), 'landscape is still caught in Business Studies', R);
check(caught('The political landscape shifted in 1933.', 'Modern History'), 'landscape is still caught in Modern History', R);
check(caught('The poem paints a landscape of grief.', 'English', 'english'), 'landscape is still caught in English', R);
check(caught('The landscape of the plain was flat.', undefined), 'landscape is caught when no subject is given', R);
check(caught('The council landscaped the park.', 'Geography'), 'landscaped (the verb) is still caught in Geography', R);

// The rest of the list is unchanged, Geography and Studies of Religion included.
check(caught('This is a crucial step in erosion.', 'Geography'), 'other banned words are still caught in Geography', R);
check(caught('The key idea in the New Testament is love.', 'Studies of Religion'), 'key is still caught next to New Testament', R);
check(passes('Keynes argued for government spending.', 'Economics'), 'Keynes still passes', R);

// The whole content in src/ still passes, now that the check knows each course's subject.
const all = spawnSync('node', ['check_content.mjs'], {cwd: ROOT, encoding: 'utf8'});
check(all.status === 0 && /no problems found/.test(all.stdout), 'node check_content.mjs passes on everything in src/', R);

fs.rmSync(dir, {recursive: true, force: true});
console.log(R.join('\n'));
