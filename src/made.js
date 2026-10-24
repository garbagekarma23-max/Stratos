/* Courses made by the content pipeline (content/pipeline.py), and the banks their points live in.
   Never edit the files in src/bank or src/courses by hand: content/pipeline.py publish writes them.

   MADE_BANKS   one bank per subject, by its short name (bus for Business Studies). Each file in src/bank adds its
                points here, by id. Ids start with the bank's name and a dash (bus-sole-trader), so they never clash
                with NSW (c1p1), Maths (m1p1) or the Economics bank (e-ped).
   MADE_COURSES each file in src/courses adds one course here. A course has the same shape as edexcel-content.js:
                units, chapters, and in each chapter a list of point ids. A chapter whose points are still waiting for
                review is published with no points, so it shows on Home as Coming soon.
   build.py puts this file first, then every file in src/bank, then every file in src/courses. */
const MADE_BANKS = {};
const MADE_COURSES = [];
