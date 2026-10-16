/* A course: Pearson Edexcel International A Level Economics, the AS year (Units 1 and 2).
   Stratos is not affiliated with or endorsed by Pearson. No Pearson logos or branding are used.

   A course holds no study content of its own. Each chapter lists the ids of its points, which live in the bank
   in econ-points.js, so a point can later belong to more than one course.
   A chapter with no points shows on Home as Coming soon and cannot be opened.
   check is 'draft' until a teacher has checked the chapter, then 'checked'. A draft chapter with points shows a
   Draft label in the app. Chapter ids start with x so they never clash with NSW (c1) or Maths (m1). */
const EDEXCEL = {
  id: 'edexcel', course: 'Economics', year: 'International A Level (Edexcel)', name: 'AS year', short: 'AS Economics',
  note: 'Covers Pearson Edexcel International A Level Economics. Not affiliated with or endorsed by Pearson.',
  units: [
    {title: 'Markets in action', chapters: [
      {id: 'x1c1', title: 'Introductory concepts', check: 'draft',
        points: ['e-nature', 'e-positive', 'e-scarcity', 'e-ppf', 'e-special', 'e-systems']},
      {id: 'x1c2', title: 'Consumer behaviour and demand', check: 'draft',
        points: ['e-rational', 'e-demand', 'e-ped', 'e-yed', 'e-xed']},
      {id: 'x1c3', title: 'Supply', check: 'draft',
        points: ['e-supply', 'e-pes']},
      {id: 'x1c4', title: 'Price determination', check: 'draft',
        points: ['e-equilibrium', 'e-surplus', 'e-pricemech', 'e-taxsub']},
      {id: 'x1c5', title: 'Market failure', check: 'draft',
        points: ['e-failure', 'e-externality', 'e-public', 'e-info', 'e-bubbles']},
      {id: 'x1c6', title: 'Government intervention', check: 'draft',
        points: ['e-correct', 'e-maxmin', 'e-permits', 'e-govfail']}
    ]},
    {title: 'Macroeconomic performance and policy', chapters: [
      {id: 'x2c1', title: 'Measures of economic performance', check: 'draft', points: []},
      {id: 'x2c2', title: 'Aggregate demand', check: 'draft', points: []},
      {id: 'x2c3', title: 'Aggregate supply', check: 'draft', points: []},
      {id: 'x2c4', title: 'National income', check: 'draft', points: []},
      {id: 'x2c5', title: 'Economic growth', check: 'draft', points: []},
      {id: 'x2c6', title: 'Macroeconomic objectives and policies', check: 'draft', points: []}
    ]}
  ]
};
