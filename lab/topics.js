/* Stratos Maths Lab: the topics. Each topic is data only, so a new topic needs no new code.

   For each topic:
     keys       the topic row of the keypad. face is what the key shows, or icon is a line drawing for it.
                put is the LaTeX it types, name is what a screen reader says. maths: true draws the face in the maths font.
     macros     short names the topic's keys type. "\or" draws as the word "or" and is deleted as one piece.
     questions  in order. eq is the equation as LaTeX, text is the same thing as plain text (for copied results),
                answers are the solutions as LaTeX, and show is the line Skip writes in.
   The keypad's other rows are the same for every topic. They are set in keypad.js. */
const TOPICS = [
  {
    id: 'equations',
    name: 'Equations',
    ask: 'Solve for x.',
    keys: [
      {face: 'x', put: 'x', name: 'x', maths: true},
      {icon: '<path d="M12 4.5v9M7 9h10M7 18.5h10"/>', put: '\\pm', name: 'Plus or minus'},
      {face: 'or', put: '\\or', name: 'or'}
    ],
    macros: {or: '\\;\\mathrm{or}\\;'},
    questions: [
      {eq: '3x+5=17', text: '3x + 5 = 17', answers: ['4'], show: 'x=4'},
      {eq: '7-2x=15', text: '7 − 2x = 15', answers: ['-4'], show: 'x=-4'},
      {eq: '4\\left(x-3\\right)=20', text: '4(x − 3) = 20', answers: ['8'], show: 'x=8'},
      {eq: '5x-4=2x+11', text: '5x − 4 = 2x + 11', answers: ['5'], show: 'x=5'},
      {eq: '\\frac{x}{3}+2=6', text: 'x/3 + 2 = 6', answers: ['12'], show: 'x=12'},
      {eq: '\\frac{2x+3}{5}=3', text: '(2x + 3)/5 = 3', answers: ['6'], show: 'x=6'},
      {eq: '6x-1=2x+9', text: '6x − 1 = 2x + 9', answers: ['\\frac{5}{2}'], show: 'x=\\frac{5}{2}'},
      {eq: '2.4x+1.3=8.5', text: '2.4x + 1.3 = 8.5', answers: ['3'], show: 'x=3'},
      {eq: 'x^2+3=52', text: 'x² + 3 = 52', answers: ['7', '-7'], show: 'x=7\\or x=-7'},
      {eq: '\\left(x-1\\right)^2=16', text: '(x − 1)² = 16', answers: ['5', '-3'], show: 'x=5\\or x=-3'}
    ]
  }
];
