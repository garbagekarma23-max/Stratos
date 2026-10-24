// Prints the study content as JSON for content/pipeline.py, which cannot read JavaScript itself.
//   node content/dump.mjs [extra folder]
// banks: every bank by name (e is the Economics bank in econ-points.js, the others are in src/bank).
// courses: the made courses (src/courses). used: for each point id, the courses that list it and their years.
// chapterIds and courseIds: every id already taken, so a new course never reuses one. places: the curricula a
// made course can name, and international.
import { loadContent, unitCourses } from './load.mjs';
const C = loadContent(process.argv[2]);
const used = {};
for (const k of unitCourses(C)) for (const u of k.units) for (const ch of u.chapters) for (const id of ch.points) (used[id] = used[id] || []).push({course: k.id, years: k.years || null});
console.log(JSON.stringify({
  banks: Object.assign({e: C.ECON_POINTS}, C.MADE_BANKS),
  courses: C.MADE_COURSES,
  used: used,
  chapterIds: C.TOPIC.chapters.map(c => c.id).concat(C.MATHS.chapters.map(c => c.id), unitCourses(C).flatMap(k => k.units.flatMap(u => u.chapters.map(c => c.id)))),
  courseIds: C.COURSE_LIST.map(c => c.id),
  places: Object.keys(C.CURRICULA).concat(['international'])
}));
