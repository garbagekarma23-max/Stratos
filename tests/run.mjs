// Runs every test file in turn and says how many checks passed. Build v2.html first: python3 build.py
// The Maths Lab tests (lab-maths.mjs, lab.mjs) need no build: maths-lab.html is the page itself.
// maths-content.mjs checks the maths worked examples and templates without a browser. maths.mjs runs maths in v2,
// and maths-practice.mjs runs a maths Practice flight.
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
const runs = [['flow.mjs'], ['social.mjs'], ['edge.mjs'], ['monkey.mjs', '1500', '7'], ['monkey.mjs', '1500', '4242'], ['lab-maths.mjs'], ['lab.mjs'], ['maths-content.mjs'], ['maths.mjs'], ['maths-practice.mjs']];
let ok = 0, bad = 0;
for (const r of runs) {
  const out = spawnSync('node', r, {cwd: fileURLToPath(new URL('.', import.meta.url)), encoding: 'utf8'});
  const text = (out.stdout || '') + (out.stderr || '');
  const pass = (text.match(/^ok /gm) || []).length, fail = (text.match(/^FAIL /gm) || []).length;
  const broke = out.status !== 0 || /ERRORS after|PAGEERROR|errors: \[[^\]]/.test(text);
  ok += pass; bad += fail + (broke && !fail ? 1 : 0);
  console.log((broke ? 'FAILED ' : 'passed ') + r.join(' ') + ': ' + pass + ' checks ok' + (fail ? ', ' + fail + ' failed' : ''));
  if (broke) console.log(text.split('\n').filter(l => !l.startsWith('ok ')).join('\n'));
}
console.log(bad ? 'SOME TESTS FAILED' : 'all tests passed (' + ok + ' checks)');
process.exit(bad ? 1 : 0);
