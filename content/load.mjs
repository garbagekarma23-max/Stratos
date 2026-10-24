// Reads the study content the way build.py puts it in v2.html, with no browser: content.js, maths-content.js,
// econ-points.js, edexcel-content.js, then made.js and every file in src/bank and src/courses (the courses the
// content pipeline made), then places.js. extra is another folder with bank/ and courses/ in it, as build.py --extra takes.
// check_content.mjs, the tests and content/pipeline.py (through dump.mjs) all read the content through this file.
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
export const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = path.join(ROOT, 'src');
// The made files, in the order build.py puts them: every bank, then every course, each in name order.
export function madeFiles(extra) {
  const out = [];
  for (const folder of ['bank', 'courses']) {
    for (const root of [SRC].concat(extra ? [path.resolve(extra)] : [])) {
      const dir = path.join(root, folder);
      if (fs.existsSync(dir)) out.push(...fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort().map(f => path.join(dir, f)));
    }
  }
  return out;
}
export function loadContent(extra) {
  const files = ['content.js', 'maths-content.js', 'econ-points.js', 'edexcel-content.js', 'made.js'].map(f => path.join(SRC, f)).concat(madeFiles(extra), [path.join(SRC, 'places.js')]);
  const code = files.map(f => fs.readFileSync(f, 'utf8')).join('\n;\n');
  return vm.runInNewContext(code + '\n;({TOPIC, MATHS, ECON_POINTS, EDEXCEL, MADE_BANKS, MADE_COURSES, COURSE_LIST, CURRICULA, INTERNATIONAL})');
}
// Every bank point, from the Economics bank and the made banks, by id.
export const allBankPoints = C => Object.assign({}, C.ECON_POINTS, ...Object.values(C.MADE_BANKS));
// Every course with units: Edexcel, then the made courses.
export const unitCourses = C => [C.EDEXCEL].concat(C.MADE_COURSES);
