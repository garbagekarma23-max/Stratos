/* Where each course is taught. The subject sheet reads this to show a student the courses for their country.
   Adding a country, a state or a course here needs no new code.

   COURSE_LIST  every course the app has. id is how progress is saved, data is the course's content (from content.js,
                maths-content.js, edexcel-content.js or src/courses), name is the plain name on its row, and about is
                the line under it: the exam it leads to, then the topic loaded. The courses the content pipeline made
                (made.js) come after the others. Each course also gets its group and rank (see yearGroup below).
   CURRICULA    a country's or a state's own courses, by id. more is a line under them. about is the certificate a
                state's row names on the sheet. A state's curriculum shows only once it has a course (see the end).
   INTERNATIONAL the courses that show in every country, under International courses.
   COUNTRY_CODES every country, by its two-letter code. The browser names each one (Intl.DisplayNames), so no names are
                stored here. Uninhabited places (Antarctica, Bouvet Island, South Georgia, Heard Island, the French
                Southern Territories and the US Outlying Islands) are left out.
   PLACES       what is known about a country beyond its name: its own curriculum, or its states, and the time zones
                that guess it. A zone ending in / matches every zone that starts with it. A country not in PLACES
                still shows in the list, with only the international courses.
   A state with no curriculum yet can still be picked: the sheet says its courses are coming. */
const COURSE_LIST = [
  {id: 'eco', data: TOPIC, name: 'Economics, Year 12: The Global Economy', about: 'HSC, The Global Economy'},
  {id: 'maths', data: MATHS, name: 'Maths, Year 11', about: 'HSC, Equations'},
  {id: 'edexcel', data: EDEXCEL, name: 'Economics, AS year', about: 'International A Level (Edexcel)'}
].concat(MADE_COURSES.map(c => ({id: c.id, data: c, name: c.row.name, about: c.row.about})));
/* The heading a course is listed under on the subject sheet, and where that heading sorts. It comes from the course's
   data, never its name: level if it has one, otherwise year (Year 11 before Year 12). The content pipeline writes
   years and year into every course it makes, from the outline's years line, and level from its level line, such as
   Units 1 and 2 for Victoria and Queensland, or Stage 1 for South Australia. A level sorts by its years (Units 1 and 2 are Year 11,
   so they come before Units 3 and 4), and a level with no years after every year, AS before A level. Headings with
   the same rank go in number order, so Units 1 and 2 comes before Units 3 and 4. */
const LEVELS = ['AS', 'A level'];
function yearGroup(d) {
  const ys = (d.years || []).slice().sort((a, b) => a - b);
  if (d.level) return {group: d.level, rank: ys.length ? ys[0] : 100 + Math.max(0, LEVELS.indexOf(d.level))};
  return {group: d.year, rank: ys.length ? ys[0] : 99};
}
COURSE_LIST.forEach(c => Object.assign(c, yearGroup(c.data)));
const CURRICULA = {
  nsw: {name: 'New South Wales', about: 'HSC', courses: ['eco', 'maths'], more: 'More NSW subjects are coming.'},
  vic: {name: 'Victoria', about: 'VCE', courses: [], more: 'More Victorian subjects are coming.'},
  qld: {name: 'Queensland', about: 'QCE', courses: [], more: 'More Queensland subjects are coming.'},
  wa: {name: 'Western Australia', about: 'WACE', courses: [], more: 'More Western Australian subjects are coming.'},
  sa: {name: 'South Australia', about: 'SACE', courses: [], more: 'More South Australian subjects are coming.'},
  tas: {name: 'Tasmania', about: 'TCE', courses: [], more: 'More Tasmanian subjects are coming.'},
  act: {name: 'Australian Capital Territory', about: 'ACT Senior Secondary Certificate', courses: [], more: 'More ACT subjects are coming.'},
  nt: {name: 'Northern Territory', about: 'NTCET', courses: [], more: 'More Northern Territory subjects are coming.'}
};
const INTERNATIONAL = {name: 'International courses', courses: ['edexcel'], more: 'Taught in schools around the world.'};
/* A made course (made.js) names where it is taught: a curriculum here, or international. */
MADE_COURSES.forEach(c => (c.place === 'international' ? INTERNATIONAL : CURRICULA[c.place]).courses.push(c.id));
const COUNTRY_CODES = ('AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT ' +
  'BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM ' +
  'FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP ' +
  'KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT ' +
  'MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW ' +
  'SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG US ' +
  'UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW').split(' ');
const PLACES = {
  AU: {zones: ['Australia/'], about: 'NSW courses and international courses', states: [
    {id: 'nsw', name: 'New South Wales', curriculum: 'nsw', about: 'HSC',
      zones: ['Australia/Sydney', 'Australia/NSW', 'Australia/Broken_Hill', 'Australia/Yancowinna', 'Australia/Lord_Howe', 'Australia/LHI']},
    {id: 'vic', name: 'Victoria', zones: ['Australia/Melbourne', 'Australia/Victoria']},
    {id: 'qld', name: 'Queensland', zones: ['Australia/Brisbane', 'Australia/Lindeman', 'Australia/Queensland']},
    {id: 'wa', name: 'Western Australia', zones: ['Australia/Perth', 'Australia/West', 'Australia/Eucla']},
    {id: 'sa', name: 'South Australia', zones: ['Australia/Adelaide', 'Australia/South']},
    {id: 'tas', name: 'Tasmania', zones: ['Australia/Hobart', 'Australia/Tasmania', 'Australia/Currie']},
    {id: 'act', name: 'Australian Capital Territory', zones: ['Australia/ACT', 'Australia/Canberra']},
    {id: 'nt', name: 'Northern Territory', zones: ['Australia/Darwin', 'Australia/North']}
  ]}
};
/* A state's own curriculum (CURRICULA, by the state's id) shows once it has a course. Until then the state says
   "Courses coming" on the sheet, and its students see the international courses. Australia's line on the country
   list names every state with courses: "NSW courses and international courses", then "NSW and VIC courses and ...". */
PLACES.AU.states.forEach(s => {
  const c = CURRICULA[s.id];
  if (!s.curriculum && c && c.courses.length) Object.assign(s, {curriculum: s.id, about: c.about});
});
(own => { PLACES.AU.about = own.length > 1 ? own.slice(0, -1).join(', ') + ' and ' + own[own.length - 1] + ' courses and international courses' : PLACES.AU.about; })(
  PLACES.AU.states.filter(s => s.curriculum).map(s => s.id.toUpperCase()));
