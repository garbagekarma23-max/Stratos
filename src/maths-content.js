/* Study content: Maths, Year 11, Equations.
   Two chapters that follow the Maths Lab's ten questions: linear equations, then equations with squares.

   How a point is stored:
     intro     one sentence on the method, shown above the worked example.
     remember  one line to hold on to.
     forms     the kinds of question the point asks. Each new question picks one form at random,
               then picks its numbers, so a point can be practised with endless different questions.

   How a form is stored:
     pick      the numbers to choose: name: [lowest, highest], whole numbers and never 0.
               name: [lowest, highest, step] counts up in that step instead, such as 0.1 for decimals.
     calc      numbers worked out from the picked ones, in order. Plain arithmetic: + - * / and brackets.
     keep      rules the numbers must pass, or they are picked again. whole(c) means c is a whole number.
     dec       true if numbers that are not whole are written as decimals, not fractions.
     eq        the question, as LaTeX (the text form of maths that MathLive reads).
     answers   the solutions, as LaTeX. Left out, it is the single answer [x].
     show      the final line when the answer is shown. Left out, it is x=[x].
     steps     the worked solution, one line at a time: [line, note]. A third part is a rule: the step is only
               written when it passes, such as a fraction that only needs simplifying sometimes.
     give      how many steps a guided question writes in for the student.
     ex        the numbers for the worked example.
   Anything in [square brackets] is worked out from the numbers: [a] is a picked number, [c-b] is c take b.
   In the notes, 1x is written x, and -3 is written with a proper minus sign. */
const MATHS = {
  id: 'eq', course: 'Maths', year: 'Year 11', name: 'Equations', ask: 'Solve for x.',
  chapters: [

    {id: 'm1', title: 'Linear equations', points: [
      {id: 'm1p1', title: 'One and two steps',
        intro: 'Get x on its own. Undo each step with its opposite, and do the same to both sides.',
        remember: 'Whatever you do to one side, do to the other.',
        forms: [
          {pick: {x: [-9, 9], a: [2, 9], b: [1, 15]}, calc: {c: 'a*x+b'}, keep: ['c != 0'],
            eq: '[a]x+[b]=[c]',
            steps: [
              ['[a]x=[c]-[b]', 'Take [b] from both sides'],
              ['[a]x=[c-b]', 'Work out the right side'],
              ['x=[x]', 'Divide both sides by [a]']],
            give: 1, ex: {x: 4, a: 3, b: 5}},
          {pick: {x: [-9, 9], a: [2, 9], b: [1, 15]}, calc: {c: 'b-a*x'}, keep: ['c != 0'],
            eq: '[b]-[a]x=[c]',
            steps: [
              ['-[a]x=[c]-[b]', 'Take [b] from both sides'],
              ['-[a]x=[c-b]', 'Work out the right side'],
              ['x=[x]', 'Divide both sides by [-a]']],
            give: 1, ex: {x: -4, a: 2, b: 7}}
        ]},

      {id: 'm1p2', title: 'Brackets',
        intro: 'Expand the brackets first: multiply each term inside by the number outside.',
        remember: '4(x − 3) is 4x − 12.',
        forms: [
          {pick: {x: [-6, 12], a: [2, 9], b: [1, 9]}, calc: {c: 'a*(x-b)'}, keep: ['x != b'],
            eq: '[a]\\left(x-[b]\\right)=[c]',
            steps: [
              ['[a]x-[a*b]=[c]', 'Expand the brackets'],
              ['[a]x=[c]+[a*b]', 'Add [a*b] to both sides'],
              ['[a]x=[c+a*b]', 'Work out the right side'],
              ['x=[x]', 'Divide both sides by [a]']],
            give: 1, ex: {x: 8, a: 4, b: 3}},
          {pick: {x: [-9, 9], a: [2, 9], b: [1, 9]}, calc: {c: 'a*(x+b)'}, keep: ['x != -b'],
            eq: '[a]\\left(x+[b]\\right)=[c]',
            steps: [
              ['[a]x+[a*b]=[c]', 'Expand the brackets'],
              ['[a]x=[c]-[a*b]', 'Take [a*b] from both sides'],
              ['[a]x=[c-a*b]', 'Work out the right side'],
              ['x=[x]', 'Divide both sides by [a]']],
            give: 1, ex: {x: 2, a: 3, b: 4}}
        ]},

      {id: 'm1p3', title: 'x on both sides',
        intro: 'Move the x terms to one side and the numbers to the other.',
        remember: 'Take the smaller x term from both sides first.',
        forms: [
          {pick: {x: [-9, 9], a: [3, 9], c: [1, 8], b: [1, 15]}, calc: {d: '(a-c)*x-b'}, keep: ['a-c > 1', 'd > 0'],
            eq: '[a]x-[b]=[c]x+[d]',
            steps: [
              ['[a-c]x-[b]=[d]', 'Take [c]x from both sides'],
              ['[a-c]x=[d]+[b]', 'Add [b] to both sides'],
              ['[a-c]x=[d+b]', 'Work out the right side'],
              ['x=[x]', 'Divide both sides by [a-c]']],
            give: 1, ex: {x: 5, a: 5, c: 2, b: 4}},
          /* The answer here is a fraction, as it often is in real questions: 6x − 1 = 2x + 9 gives x = 5/2. */
          {pick: {p: [1, 11], q: [2, 3], k: [1, 2], c: [1, 5], b: [1, 12]}, calc: {x: 'p/q', m: 'k*q', a: 'c+m', d: 'k*p-b'},
            keep: ['p % q != 0', 'd > 0'],
            eq: '[a]x-[b]=[c]x+[d]',
            steps: [
              ['[m]x-[b]=[d]', 'Take [c]x from both sides'],
              ['[m]x=[d+b]', 'Add [b] to both sides'],
              ['x=\\frac{[d+b]}{[m]}', 'Divide both sides by [m]'],
              ['x=[x]', 'Simplify the fraction', 'k > 1']],
            give: 1, ex: {p: 5, q: 2, k: 2, c: 2, b: 1}}
        ]},

      {id: 'm1p4', title: 'Fractions',
        intro: 'Clear the fraction by multiplying both sides by the number underneath.',
        remember: 'Undo dividing by multiplying.',
        forms: [
          {pick: {m: [-6, 9], a: [2, 6], b: [1, 9]}, calc: {x: 'a*m', c: 'm+b'}, keep: ['c != 0'],
            eq: '\\frac{x}{[a]}+[b]=[c]',
            steps: [
              ['\\frac{x}{[a]}=[c]-[b]', 'Take [b] from both sides'],
              ['\\frac{x}{[a]}=[m]', 'Work out the right side'],
              ['x=[m]\\times[a]', 'Multiply both sides by [a]'],
              ['x=[x]', 'Work it out']],
            give: 1, ex: {m: 4, a: 3, b: 2}},
          {pick: {x: [-6, 9], a: [2, 5], b: [1, 9], d: [2, 7]}, calc: {c: '(a*x+b)/d'}, keep: ['whole(c)', 'c != 0', 'a != d'],
            eq: '\\frac{[a]x+[b]}{[d]}=[c]',
            steps: [
              ['[a]x+[b]=[c]\\times[d]', 'Multiply both sides by [d]'],
              ['[a]x+[b]=[c*d]', 'Work out the right side'],
              ['[a]x=[c*d-b]', 'Take [b] from both sides'],
              ['x=[x]', 'Divide both sides by [a]']],
            give: 1, ex: {x: 6, a: 2, b: 3, d: 5}}
        ]},

      {id: 'm1p5', title: 'Decimals',
        intro: 'Decimals take the same steps. The calculator display works out each sum for you.',
        remember: 'Treat a decimal like any other number.',
        forms: [
          {pick: {x: [1, 9], a: [1.1, 3.9, 0.1], b: [0.1, 9.9, 0.1]}, calc: {c: 'a*x+b'}, keep: ['!whole(a)', '!whole(b)'], dec: true,
            eq: '[a]x+[b]=[c]',
            steps: [
              ['[a]x=[c]-[b]', 'Take [b] from both sides'],
              ['[a]x=[c-b]', 'Work out the right side'],
              ['x=[c-b]\\div[a]', 'Divide both sides by [a]'],
              ['x=[x]', 'Work it out']],
            give: 1, ex: {x: 3, a: 2.4, b: 1.3}},
          {pick: {x: [2, 9], a: [1.1, 3.9, 0.1], b: [0.1, 4.9, 0.1]}, calc: {c: 'a*x-b'}, keep: ['!whole(a)', '!whole(b)', 'c > 0'], dec: true,
            eq: '[a]x-[b]=[c]',
            steps: [
              ['[a]x=[c]+[b]', 'Add [b] to both sides'],
              ['[a]x=[c+b]', 'Work out the right side'],
              ['x=[c+b]\\div[a]', 'Divide both sides by [a]'],
              ['x=[x]', 'Work it out']],
            give: 1, ex: {x: 4, a: 1.5, b: 2.5}}
        ]}
    ]},

    {id: 'm2', title: 'Equations with squares', points: [
      {id: 'm2p1', title: 'x² equals a number',
        intro: 'Get x² on its own, then take the square root. A positive number has two square roots, so there are two answers.',
        remember: 'x² = 49 means x = 7 or x = −7.',
        forms: [
          {pick: {n: [2, 12], b: [1, 20]}, calc: {s: 'n*n', c: 'n*n+b'},
            eq: 'x^2+[b]=[c]', answers: ['[n]', '[-n]'], show: 'x=[n]\\or x=[-n]',
            steps: [
              ['x^2=[c]-[b]', 'Take [b] from both sides'],
              ['x^2=[s]', 'Work out the right side'],
              ['x=\\pm\\sqrt{[s]}', 'Take the square root. There are two answers'],
              ['x=\\pm[n]', 'Work out the root']],
            give: 2, ex: {n: 7, b: 3}},
          {pick: {n: [2, 10], a: [2, 5]}, calc: {s: 'n*n', c: 'a*n*n'},
            eq: '[a]x^2=[c]', answers: ['[n]', '[-n]'], show: 'x=[n]\\or x=[-n]',
            steps: [
              ['x^2=[c]\\div[a]', 'Divide both sides by [a]'],
              ['x^2=[s]', 'Work out the right side'],
              ['x=\\pm\\sqrt{[s]}', 'Take the square root. There are two answers'],
              ['x=\\pm[n]', 'Work out the root']],
            give: 2, ex: {n: 5, a: 2}}
        ]},

      {id: 'm2p2', title: 'A squared bracket',
        intro: 'Take the square root of both sides first. The bracket stays whole until then, and the ± gives two answers.',
        remember: '(x − 1)² = 16 means x − 1 = 4 or x − 1 = −4.',
        forms: [
          {pick: {n: [2, 9], b: [1, 9]}, calc: {s: 'n*n'}, keep: ['b != n'],
            eq: '\\left(x-[b]\\right)^2=[s]', answers: ['[b+n]', '[b-n]'], show: 'x=[b+n]\\or x=[b-n]',
            steps: [
              ['x-[b]=\\pm\\sqrt{[s]}', 'Take the square root of both sides'],
              ['x-[b]=\\pm[n]', 'Work out the root'],
              ['x=[b]\\pm[n]', 'Add [b] to both sides'],
              ['x=[b+n]\\or x=[b-n]', 'Work out the two answers']],
            give: 2, ex: {n: 4, b: 1}},
          {pick: {n: [2, 9], b: [1, 9]}, calc: {s: 'n*n'}, keep: ['b != n'],
            eq: '\\left(x+[b]\\right)^2=[s]', answers: ['[n-b]', '[-n-b]'], show: 'x=[n-b]\\or x=[-n-b]',
            steps: [
              ['x+[b]=\\pm\\sqrt{[s]}', 'Take the square root of both sides'],
              ['x+[b]=\\pm[n]', 'Work out the root'],
              ['x=-[b]\\pm[n]', 'Take [b] from both sides'],
              ['x=[n-b]\\or x=[-n-b]', 'Work out the two answers']],
            give: 2, ex: {n: 3, b: 2}}
        ]}
    ]}
  ]
};
