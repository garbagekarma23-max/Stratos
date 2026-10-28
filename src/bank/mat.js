/* The mat bank: points made by the content pipeline. Written by python3 content/pipeline.py publish.
   Do not edit it by hand: change a point through the review page and publish again (content/README.md).
   Each point has the same parts as in econ-points.js. In every question the correct answer is opts[0]. */
MADE_BANKS.mat = {
  "mat-functions-relations": {
    "title": "Functions and relations",
    "card": [
      [
        "Relation",
        "A relation is any rule or set of pairs that links inputs (x values) to outputs (y values). Example: {(1, 2), (1, 5), (3, 4)}."
      ],
      [
        "Function",
        "A function is a relation where each input has exactly one output. Two different inputs may share the same output."
      ],
      "To check a set of pairs, look for an x value that appears twice with different y values. In the example above, x = 1 gives both 2 and 5, so it is a relation but not a function.",
      [
        "Vertical line test",
        "Draw vertical lines on a graph. If some vertical line cuts the graph more than once, it is not a function. If every vertical line cuts it at most once, it is a function."
      ]
    ],
    "remember": "A function never gives two different outputs for one input.",
    "a": {
      "q": "Which set of pairs is a function?",
      "opts": ["{(1, 4), (2, 4), (3, 7)}", "{(1, 4), (1, 7), (2, 5)}", "{(2, 3), (5, 1), (2, 6)}", "{(0, 1), (3, 2), (0, 2)}"],
      "why": "In {(1, 4), (2, 4), (3, 7)}, each x value (1, 2 and 3) has one output. Sharing the output 4 is allowed. Each other set repeats an x value with different y values, so that input has two outputs.",
      "clue": "Look for an x value that is repeated with different y values."
    },
    "b": {
      "d": 2,
      "q": "A circle on a graph is cut twice by the vertical line x = 0. What does this tell you?",
      "opts": [
        "The circle is not the graph of a function",
        "The circle is the graph of a function",
        "The circle is a function only for x > 0",
        "The circle is not a relation"
      ],
      "why": "A vertical line that cuts the graph twice means one x value has two y values. So it fails the vertical line test and is not a function. It is still a relation, because it pairs x values with y values.",
      "clue": "One vertical line cutting twice means one input has two outputs."
    }
  },
  "mat-domain-range": {
    "title": "Domain and range",
    "card": [
      ["Domain", "the set of x values a function can accept. The range is the set of y values it produces."],
      [
        "Square roots",
        "You cannot take the square root of a negative number. So the expression under √ must be 0 or more. For y = √(x − 2), x − 2 ≥ 0, so the domain is x ≥ 2."
      ],
      [
        "Fractions",
        "You cannot divide by zero. So any x that makes the denominator 0 is left out. For y = 1/(x − 3), the domain is all real x except x = 3."
      ],
      [
        "Range",
        "Look at the smallest and largest y values the graph reaches. A square root is never negative, so y = √(x − 2) has range y ≥ 0."
      ]
    ],
    "remember": "Domain is the x values that work. Range is the y values that come out.",
    "a": {
      "q": "What is the domain of y = √(x + 5)?",
      "opts": ["x ≥ −5", "x ≥ 5", "x ≤ −5", "x > −5"],
      "why": "The expression under the root must be 0 or more, so x + 5 ≥ 0, which gives x ≥ −5. The option x ≥ 5 comes from ignoring the sign when moving 5 across. The option x > −5 leaves out x = −5, but √0 = 0 is allowed.",
      "clue": "Make the expression under the root 0 or more, then solve."
    },
    "b": {
      "d": 3,
      "q": "What is the domain of y = 4/(2x − 6)?",
      "opts": ["All real x except x = 3", "All real x except x = −3", "All real x except x = 6", "All real x except x = 0"],
      "why": "The denominator is 0 when 2x − 6 = 0, so 2x = 6 and x = 3. Only x = 3 is excluded. Choosing x = 6 forgets to divide by 2.",
      "clue": "Find the x value that makes the bottom equal 0."
    }
  },
  "mat-function-notation": {
    "title": "Function notation",
    "card": [
      "f(x) is the output of the function f when the input is x. It is read as \"f of x\". It does not mean f multiplied by x.",
      "To evaluate f(3), replace every x in the rule with 3. If f(x) = 2x² − 5, then f(3) = 2 × 3² − 5 = 2 × 9 − 5 = 13.",
      "The input can be an expression. To find f(a + 1), put the whole bracket (a + 1) in place of x. For f(x) = 3x − 2, f(a + 1) = 3(a + 1) − 2 = 3a + 1.",
      "A rule can be written in words and then in notation. \"Double the input and add 4\" is f(x) = 2x + 4."
    ],
    "remember": "To find f of something, put that something in place of every x.",
    "a": {
      "q": "If f(x) = 4x − 7, what is f(5)?",
      "opts": ["13", "−13", "20", "−3"],
      "why": "Replace x with 5: f(5) = 4 × 5 − 7 = 20 − 7 = 13. The answer 20 comes from forgetting to subtract 7.",
      "clue": "Put 5 in place of x, then follow the order of operations."
    },
    "b": {
      "d": 3,
      "q": "If f(x) = x² + 2x, what is f(a + 1)?",
      "opts": ["a² + 4a + 3", "a² + 2a + 3", "a² + 2a + 1", "a² + 4a + 1"],
      "why": "f(a + 1) = (a + 1)² + 2(a + 1) = a² + 2a + 1 + 2a + 2 = a² + 4a + 3. The option a² + 2a + 3 comes from writing (a + 1)² as a² + 1, which skips the middle term.",
      "clue": "Put the whole bracket in place of x, then expand (a + 1)² fully."
    }
  },
  "mat-odd-even-functions": {
    "title": "Odd and even functions",
    "card": [
      [
        "Even",
        "f(-x) = f(x) for every x in the domain. The graph is symmetric in the y-axis, so the left side mirrors the right side."
      ],
      [
        "Odd",
        "f(-x) = -f(x) for every x in the domain. The graph has point symmetry about the origin, so turning it half a turn about the origin leaves it unchanged."
      ],
      "To test a function, replace x with -x and simplify. Compare the result with f(x) and with -f(x). If it matches neither, the function is neither odd nor even.",
      "Example: f(x) = x³ + x. Then f(-x) = (-x)³ + (-x) = -x³ - x = -(x³ + x) = -f(x), so f is odd."
    ],
    "remember": "Put in -x. Equal to f(x) means even, equal to -f(x) means odd, and matching neither means neither.",
    "a": {
      "q": "f(x) = x² + 5. What is f(-x) in simplest form, and what type of function is f?",
      "opts": ["x² + 5, so f is even", "-x² - 5, so f is odd", "x² - 5, so f is neither odd nor even", "-x² + 5, so f is odd"],
      "why": "f(-x) = (-x)² + 5 = x² + 5, which equals f(x), so f is even. A common slip is to think the minus sign makes the whole rule negative, but squaring removes it.",
      "clue": "Replace x with -x, then square it."
    },
    "b": {
      "d": 3,
      "q": "f(x) = x³ + 2. Which statement is correct?",
      "opts": [
        "f is neither odd nor even",
        "f is odd, because x³ is odd",
        "f is even, because 2 is a constant",
        "f is both odd and even"
      ],
      "why": "f(-x) = (-x)³ + 2 = -x³ + 2. This is not equal to f(x) = x³ + 2, and it is not equal to -f(x) = -x³ - 2. So f is neither. The tempting answer is odd, but the constant 2 breaks the test.",
      "clue": "Find f(-x), then compare it with both f(x) and -f(x)."
    }
  },
  "mat-linear-functions": {
    "title": "Linear functions",
    "card": [
      "The gradient m of a line is rise ÷ run. For points (x₁, y₁) and (x₂, y₂), m = (y₂ − y₁) ÷ (x₂ − x₁).",
      ["y = mx + c", "m is the gradient and c is the y-intercept, where the line crosses the y-axis."],
      [
        "y − y₁ = m(x − x₁)",
        "use this when you know the gradient m and one point (x₁, y₁) on the line. Example: m = 2 through (3, 1) gives y − 1 = 2(x − 3), so y = 2x − 5."
      ],
      "Parallel lines have equal gradients. Perpendicular lines have gradients that multiply to −1, so a line with gradient 2 is perpendicular to a line with gradient −1/2."
    ],
    "remember": "Gradient is rise over run. Parallel: same m. Perpendicular: m₁ × m₂ = −1.",
    "a": {
      "q": "What is the gradient of the line through (1, 2) and (4, 11)?",
      "opts": ["3", "1/3", "−3", "9"],
      "why": "m = (11 − 2) ÷ (4 − 1) = 9 ÷ 3 = 3. The option 1/3 comes from putting run over rise, which is the wrong way round.",
      "clue": "Rise goes on top, run goes on the bottom."
    },
    "b": {
      "d": 3,
      "q": "A line has gradient 2/3 and passes through (6, 1). Which line through the same point is perpendicular to it?",
      "opts": ["y − 1 = −3/2(x − 6)", "y − 1 = 3/2(x − 6)", "y − 1 = −2/3(x − 6)", "y − 6 = −3/2(x − 1)"],
      "why": "The perpendicular gradient m satisfies 2/3 × m = −1, so m = −3/2. Using the point (6, 1) gives y − 1 = −3/2(x − 6). The option with 3/2 only flips the fraction and does not change the sign, so the product is 1, not −1.",
      "clue": "Flip the fraction and change the sign."
    }
  },
  "mat-quadratic-functions": {
    "title": "Quadratic functions",
    "card": [
      "A quadratic function is y = ax² + bx + c, with a ≠ 0. Its graph is a parabola. If a > 0 it opens up. If a < 0 it opens down. The y-intercept is c.",
      "The axis of symmetry is the line x = -b/2a. The vertex lies on this line. Put this x-value into the function to get the y-value of the vertex.",
      "The x-intercepts are the roots, where y = 0. Find them by factorising, by completing the square, or by the quadratic formula x = (-b ± √(b² - 4ac)) ÷ 2a.",
      "Example: y = x² - 6x + 5. The axis is x = 6/2 = 3. At x = 3, y = 9 - 18 + 5 = -4, so the vertex is (3, -4). Factorising gives (x - 1)(x - 5) = 0, so the roots are x = 1 and x = 5."
    ],
    "remember": "Axis x = -b/2a gives the vertex. Roots are where y = 0. The sign of a sets the direction.",
    "a": {
      "q": "What is the vertex of y = x² - 8x + 7?",
      "opts": ["(4, -9)", "(-4, -9)", "(4, 7)", "(8, 7)"],
      "why": "The axis is x = -(-8)/(2×1) = 4. Then y = 16 - 32 + 7 = -9, so the vertex is (4, -9). (-4, -9) comes from a sign error in -b/2a.",
      "clue": "Find x = -b/2a first, then put it back into the function."
    },
    "b": {
      "d": 3,
      "q": "Mia studies y = -x² + 2x + 8. Which statement is correct?",
      "opts": [
        "It opens down and has roots x = -2 and x = 4",
        "It opens down and has roots x = 2 and x = -4",
        "It opens up and has roots x = -2 and x = 4",
        "It opens up and has a y-intercept of -8"
      ],
      "why": "Here a = -1, so it opens down. Multiply by -1: x² - 2x - 8 = 0, which gives (x - 4)(x + 2) = 0, so x = 4 or x = -2. Check: -16 + 8 + 8 = 0. The option with roots 2 and -4 has the signs swapped, and -4 gives -16 - 8 + 8 = -16, not 0.",
      "clue": "Check the sign of a, then set y = 0 and factorise."
    }
  },
  "mat-discriminant": {
    "title": "The discriminant",
    "card": [
      "For a quadratic ax² + bx + c = 0, the discriminant is Δ = b² − 4ac. It is the part under the square root in the quadratic formula.",
      "If Δ > 0, there are two real roots. If Δ = 0, there is one real root. If Δ < 0, there are no real roots, so the parabola does not meet the x-axis.",
      "Example: x² + 4x + 5 = 0 has a = 1, b = 4, c = 5. Δ = 4² − 4×1×5 = 16 − 20 = −4, which is negative, so there are no real roots.",
      "To test a line and a parabola, set their equations equal and rearrange to a quadratic. Find Δ: positive means the line cuts the parabola twice, zero means it touches once, negative means it misses."
    ],
    "remember": "Δ = b² − 4ac: positive gives two roots, zero gives one, negative gives none.",
    "a": {
      "q": "What is the discriminant of 2x² − 3x − 5 = 0, and how many real roots does it have?",
      "opts": ["49, so two real roots", "−31, so no real roots", "19, so two real roots", "49, so one real root"],
      "why": "a = 2, b = −3, c = −5, so Δ = (−3)² − 4×2×(−5) = 9 + 40 = 49. This is positive, so there are two real roots. Forgetting that −4ac becomes +40 gives 9 − 40 = −31, which is the tempting wrong answer.",
      "clue": "Take care with the signs when c is negative."
    },
    "b": {
      "d": 3,
      "q": "The line y = 2x − 5 and the parabola y = x² − 2x − 1 are drawn on the same axes. What happens?",
      "opts": [
        "The line touches the parabola at one point",
        "The line cuts the parabola at two points",
        "The line does not meet the parabola",
        "The line meets the parabola at the vertex only"
      ],
      "why": "Setting them equal: x² − 2x − 1 = 2x − 5, so x² − 4x + 4 = 0. Then Δ = 16 − 16 = 0, so the line meets the parabola at exactly one point and touches it. Two points would need Δ to be positive.",
      "clue": "Make one side zero, then find Δ."
    }
  },
  "mat-cubic-polynomial-graphs": {
    "title": "Cubic and polynomial graphs",
    "card": [
      "A cubic such as y = (x − 1)(x + 2)(x − 3) has roots where each factor is zero: x = 1, −2 and 3. The graph crosses the x-axis at each of these single roots.",
      "For the y-intercept, put x = 0. Here y = (−1)(2)(−3) = 6, so the graph meets the y-axis at (0, 6).",
      "Look at the sign of the x³ term. If it is positive, the graph rises on the right and falls on the left. If it is negative, it falls on the right and rises on the left.",
      "A squared factor, such as (x − 2)², gives a double root. The graph touches the x-axis there and turns back. A cubed factor, such as (x − 2)³, still crosses, but flattens as it passes through."
    ],
    "remember": "Single roots cross, a double (squared) root touches, x = 0 gives the y-intercept and the x³ sign sets the ends.",
    "a": {
      "q": "The graph of y = (x − 2)²(x + 1) is sketched. What happens at x = 2?",
      "opts": [
        "It touches the x-axis and turns back",
        "It crosses the x-axis",
        "It crosses, flattening as it passes through",
        "It has a gap in the graph"
      ],
      "why": "The factor (x − 2) is squared, so x = 2 is a double root and the graph touches the axis there and turns back. Crossing with a flat point happens for a cubed factor, not a squared one. The graph crosses only at the single root x = −1.",
      "clue": "What power is the factor (x − 2) raised to?"
    },
    "b": {
      "d": 3,
      "q": "What is the y-intercept of y = −(x − 1)(x + 4)(x − 2)?",
      "opts": ["−8", "8", "−2", "2"],
      "why": "Put x = 0: y = −(−1)(4)(−2) = −8. Here (−1)(4)(−2) = 8, and the minus sign in front makes it −8. Dropping that sign gives 8, which is wrong.",
      "clue": "Put x = 0 and keep the minus sign at the front."
    }
  },
  "mat-reciprocal-functions": {
    "title": "Reciprocal functions",
    "card": [
      "A reciprocal function has the form y = k/x, where k is a number that is not zero. Its graph is a hyperbola, made of two separate curves.",
      "x = 0 makes the fraction undefined, so the curve never meets the y-axis. A large x makes y very small, so the curve gets close to the x-axis but never touches it. These lines, x = 0 and y = 0, are the asymptotes.",
      "If k is positive, x and y have the same sign. The curves lie in quadrants 1 and 3. If k is negative, x and y have opposite signs. The curves lie in quadrants 2 and 4.",
      "Example: y = 6/x has k = 6. At x = 2, y = 3. At x = −2, y = −3. The points are in quadrants 1 and 3, as expected."
    ],
    "remember": "y = k/x has both axes as asymptotes. The sign of k decides which quadrants hold the curves.",
    "a": {
      "q": "The graph of y = −4/x is drawn. In which quadrants do its two curves lie?",
      "opts": ["Quadrants 2 and 4", "Quadrants 1 and 3", "Quadrants 1 and 2", "Quadrants 3 and 4"],
      "why": "k = −4 is negative, so x and y have opposite signs. For example, x = 1 gives y = −4, which is in quadrant 4, and x = −1 gives y = 4, which is in quadrant 2. Quadrants 1 and 3 are for a positive k.",
      "clue": "Try x = 1 and see the sign of y."
    },
    "b": {
      "d": 2,
      "q": "Which statement about the graph of y = 5/x is correct?",
      "opts": [
        "It has no point with x = 0",
        "It crosses the x-axis at x = 5",
        "It crosses the y-axis at y = 5",
        "It lies in quadrants 2 and 4"
      ],
      "why": "x = 0 would need division by zero, so no point has x = 0 and the curve never meets the y-axis. The curve never meets the x-axis either, since 5/x is never 0. The tempting y = 5 is just the numerator and is not an intercept.",
      "clue": "What happens to 5/x if x is 0?"
    }
  },
  "mat-absolute-value-functions": {
    "title": "Absolute value functions",
    "card": [
      "The absolute value |x| is the distance of x from zero on the number line. It is never negative. So |5| = 5 and |−5| = 5.",
      "The graph of y = |x| is a V shape with its corner at the origin. For x ≥ 0 it is the line y = x. For x < 0 it is the line y = −x.",
      "|x − a| is the distance of x from a. So |x − a| = b asks for the points that are b units from a. If b > 0, there are two: x = a + b and x = a − b.",
      "Example: solve |x − 3| = 4. The points 4 units from 3 are 3 + 4 = 7 and 3 − 4 = −1. Check: |7 − 3| = 4 and |−1 − 3| = |−4| = 4."
    ],
    "remember": "If b > 0, |x − a| = b means x is b units from a, so x = a + b or x = a − b.",
    "a": {
      "q": "What are the solutions of |x − 2| = 5?",
      "opts": ["x = 7 and x = −3", "x = 7 only", "x = 3 and x = −3", "x = −7 and x = 3"],
      "why": "The points 5 units from 2 are 2 + 5 = 7 and 2 − 5 = −3. Giving x = 7 only is tempting, but a distance can be measured in either direction from 2.",
      "clue": "Which numbers are 5 units from 2 on the number line?"
    },
    "b": {
      "d": 3,
      "q": "Which equation has the solutions x = −1 and x = 9?",
      "opts": ["|x − 4| = 5", "|x + 4| = 5", "|x − 5| = 4", "|x − 4| = 9"],
      "why": "The midpoint of −1 and 9 is 4, and each is 5 units from 4, so |x − 4| = 5. |x + 4| = 5 is tempting, but it is centred at −4 and gives x = 1 and x = −9.",
      "clue": "Find the number halfway between −1 and 9, then the distance to each."
    }
  },
  "mat-circles": {
    "title": "Circles",
    "card": [
      "A circle with centre (h, k) and radius r has the equation (x − h)² + (y − k)² = r². The right side is r², not r.",
      "Read the centre from the brackets and flip the signs. In (x − 3)² + (y + 2)² = 25, the centre is (3, −2) and r² = 25, so r = 5.",
      "A general equation such as x² + y² − 6x + 4y − 12 = 0 can be rewritten by completing the square. Add half the x coefficient, squared, and the same for y, to both sides.",
      "Worked example: x² − 6x + 9 + y² + 4y + 4 = 12 + 9 + 4. This gives (x − 3)² + (y + 2)² = 25, so the centre is (3, −2) and the radius is 5."
    ],
    "remember": "Flip the signs inside the brackets for the centre. The right side is r², so take a square root for the radius.",
    "a": {
      "q": "What are the centre and radius of the circle (x + 1)² + (y − 4)² = 49?",
      "opts": [
        "Centre (−1, 4), radius 7",
        "Centre (1, −4), radius 7",
        "Centre (−1, 4), radius 49",
        "Centre (1, −4), radius 49"
      ],
      "why": "The brackets show x + 1 = x − (−1) and y − 4, so the centre is (−1, 4). The right side is r² = 49, so r = 7. Choosing (1, −4) copies the signs instead of flipping them.",
      "clue": "Flip the signs for the centre, then take a square root."
    },
    "b": {
      "d": 3,
      "q": "The circle x² + y² − 8x + 2y − 8 = 0 is rewritten by completing the square. What are its centre and radius?",
      "opts": [
        "Centre (4, −1), radius 5",
        "Centre (4, −1), radius 25",
        "Centre (−4, 1), radius 5",
        "Centre (8, −2), radius 5"
      ],
      "why": "Add 16 and 1 to both sides: (x − 4)² + (y + 1)² = 8 + 16 + 1 = 25. The centre is (4, −1) and r = 5. Radius 25 forgets that the right side is r², not r.",
      "clue": "Move the constant across, then add 16 and 1 to both sides."
    }
  },
  "mat-vertical-translations": {
    "title": "Vertical translations",
    "card": [
      "A translation slides a graph without changing its shape or size. In y = f(x) + c, the number c is added to every y value.",
      "If c is positive, the graph moves up by c units. If c is negative, it moves down by that many units. For example, y = x² + 3 is y = x² moved up 3.",
      "Every point (x, y) on y = f(x) moves to (x, y + c). The x value stays the same.",
      "Worked example: y = x² has its vertex at (0, 0). For y = x² − 2, the vertex moves to (0, −2), which is 2 units down."
    ],
    "remember": "Adding c outside f(x) moves every point up c units, or down if c is negative.",
    "a": {
      "q": "The graph of y = f(x) is moved to y = f(x) − 4. What happens to the graph?",
      "opts": ["It moves down 4 units", "It moves up 4 units", "It moves left 4 units", "It moves right 4 units"],
      "why": "Subtracting 4 from every y value lowers each point by 4 units, so the graph moves down. Up is wrong because that would need +4. Left and right are wrong because the x values do not change.",
      "clue": "Look at what happens to each y value."
    },
    "b": {
      "d": 2,
      "q": "The graph of y = x² has its vertex at (0, 0). Where is the vertex of y = x² + 5?",
      "opts": ["(0, 5)", "(0, −5)", "(5, 0)", "(−5, 0)"],
      "why": "Adding 5 to every y value moves the graph up 5 units, so the vertex moves from (0, 0) to (0, 5). (0, −5) is tempting but it is a move down, which needs −5. The x value stays 0.",
      "clue": "Only the y value of each point changes."
    }
  },
  "mat-horizontal-translations": {
    "title": "Horizontal translations",
    "card": [
      "The graph of y = f(x + b) is the graph of y = f(x) moved sideways by b units. The shape does not change, and only the position does.",
      "The shift goes the opposite way to the sign. y = f(x + b) with b positive moves the graph left by b. y = f(x − b) moves it right by b.",
      "Why: in y = f(x + 3), the input x + 3 reaches the old value of x when x is 3 less. So each point appears 3 units further left.",
      "Example: y = x² has its vertex at (0, 0). For y = (x − 5)², the vertex is at (5, 0), so the graph has moved 5 units right."
    ],
    "remember": "Inside the brackets, the shift is the opposite of the sign: +b moves left, −b moves right.",
    "a": {
      "q": "The graph of y = f(x) is moved 4 units to the left. What is the equation of the new graph?",
      "opts": ["y = f(x + 4)", "y = f(x − 4)", "y = f(x) + 4", "y = f(x) − 4"],
      "why": "A move of 4 units left is written f(x + 4), because the shift is opposite to the sign. f(x − 4) is the tempting choice, but it moves the graph right. The options with +4 or −4 outside the brackets move the graph up or down.",
      "clue": "The sideways shift goes inside the brackets, and its sign is opposite to the direction."
    },
    "b": {
      "d": 2,
      "q": "The graph of y = x² has its vertex at (0, 0). Where is the vertex of y = (x + 2)²?",
      "opts": ["(−2, 0)", "(2, 0)", "(0, 2)", "(0, −2)"],
      "why": "y = (x + 2)² is y = x² moved 2 units left, so the vertex goes from (0, 0) to (−2, 0). (2, 0) is the tempting wrong answer, as it follows the sign instead of reversing it. The points with x = 0 would come from adding or subtracting outside the brackets.",
      "clue": "Find the x value that makes the bracket equal 0."
    }
  },
  "mat-vertical-dilations": {
    "title": "Vertical dilations",
    "card": [
      "The graph of y = kf(x) is the graph of y = f(x) with every y value multiplied by k. The graph is stretched away from the x-axis, or squashed towards it, in the vertical direction.",
      "If k is greater than 1, the graph stretches away from the x-axis. If k is between 0 and 1, it is squashed towards the x-axis. The x values do not change.",
      "Points on the x-axis stay where they are, because 0 × k = 0. So the x-intercepts do not move. The y-intercept is multiplied by k.",
      "Example: f(x) = x² − 4 has the point (3, 5). For y = 2f(x), the point becomes (3, 10). The x-intercepts at x = −2 and x = 2 stay the same."
    ],
    "remember": "In y = kf(x), multiply every y value by k. The x values and x-intercepts stay put.",
    "a": {
      "q": "The graph of y = f(x) passes through (4, 6). Which point must lie on y = 3f(x)?",
      "opts": ["(4, 18)", "(12, 6)", "(4, 2)", "(4, 9)"],
      "why": "Multiplying the y value by 3 gives 6 × 3 = 18, and x stays at 4. The point (12, 6) is tempting, but that multiplies x, which a vertical dilation does not do.",
      "clue": "Only the y value is multiplied by k."
    },
    "b": {
      "d": 2,
      "q": "The graph of y = f(x) has x-intercepts at x = 1 and x = 5, and a y-intercept at (0, 10). What are the intercepts of y = 2f(x)?",
      "opts": [
        "x-intercepts 1 and 5, y-intercept (0, 20)",
        "x-intercepts 2 and 10, y-intercept (0, 20)",
        "x-intercepts 1 and 5, y-intercept (0, 10)",
        "x-intercepts 2 and 10, y-intercept (0, 10)"
      ],
      "why": "On the x-axis y = 0, and 2 × 0 = 0, so the x-intercepts stay at 1 and 5. The y-intercept is multiplied by 2, giving (0, 20). Doubling the x-intercepts is wrong, as x values do not change.",
      "clue": "Which values does k multiply, and what is 0 × k?"
    }
  },
  "mat-horizontal-dilations": {
    "title": "Horizontal dilations",
    "card": [
      "The graph of y = f(ax) is the graph of y = f(x) squeezed or stretched sideways, towards or away from the y-axis. Every x value on the graph is divided by a. The y values do not change.",
      "If a is greater than 1, the graph is compressed towards the y-axis. If a is between 0 and 1, the graph is stretched away from it.",
      "Points on the y-axis stay where they are, because dividing 0 by a gives 0.",
      "Example: (6, 4) is on y = f(x). On y = f(2x), the point is (6 ÷ 2, 4) = (3, 4). Check: f(2 × 3) = f(6) = 4."
    ],
    "remember": "In y = f(ax), the x values are divided by a and the y values stay the same.",
    "a": {
      "q": "The point (8, 5) is on y = f(x). Which point must be on y = f(2x)?",
      "opts": ["(4, 5)", "(16, 5)", "(8, 10)", "(8, 2.5)"],
      "why": "Every x value is divided by 2, so 8 becomes 4 and y stays 5. Check: f(2 × 4) = f(8) = 5. (16, 5) multiplies x by 2, which is the tempting mistake.",
      "clue": "Divide x by a. Leave y alone."
    },
    "b": {
      "d": 3,
      "q": "The point (12, −3) is on y = f(x). Which point must be on y = f(3x)?",
      "opts": ["(4, −3)", "(36, −3)", "(12, −1)", "(4, −9)"],
      "why": "The x value is divided by 3, so 12 becomes 4 and y stays −3. Check: f(3 × 4) = f(12) = −3. (36, −3) multiplies x by 3 instead, and the other two change y, which a horizontal dilation does not do.",
      "clue": "Find the x that makes 3x equal 12."
    }
  },
  "mat-reflections": {
    "title": "Reflections",
    "card": [
      "A reflection flips a graph over a line, like a mirror. The flipped graph has the same shape and size.",
      [
        "x-axis",
        "y = -f(x) reflects the graph in the x-axis. Every y value changes sign, so the point (x, y) moves to (x, -y)."
      ],
      [
        "y-axis",
        "y = f(-x) reflects the graph in the y-axis. Every x value changes sign, so the point (x, y) moves to (-x, y)."
      ],
      "Example: the point (2, 5) is on y = f(x). Then (2, -5) is on y = -f(x), and (-2, 5) is on y = f(-x)."
    ],
    "remember": "A minus outside f flips up and down. A minus inside f flips left and right.",
    "a": {
      "q": "The point (3, 4) is on y = f(x). Which point must be on y = -f(x)?",
      "opts": ["(3, -4)", "(-3, 4)", "(-3, -4)", "(4, 3)"],
      "why": "A minus outside f changes the sign of every y value, so (3, 4) moves to (3, -4). The point (-3, 4) is on y = f(-x), because that changes the sign of x instead.",
      "clue": "The minus is outside f, so it acts on the output."
    },
    "b": {
      "d": 3,
      "q": "The point (-6, 2) is on y = f(x). Which point must be on y = f(-x)?",
      "opts": ["(6, 2)", "(6, -2)", "(-6, -2)", "(-2, 6)"],
      "why": "A minus inside f changes the sign of every x value, so (-6, 2) moves to (6, 2). The point (-6, -2) is tempting, but it is on y = -f(x), which changes the sign of y.",
      "clue": "The minus is inside the brackets, so it acts on x."
    }
  },
  "mat-solving-equations-with-graphs": {
    "title": "Solving equations with graphs",
    "card": [
      "To solve f(x) = g(x), draw y = f(x) and y = g(x) on the same axes. At a point where the graphs meet, both functions give the same y value for that x.",
      "The solutions are the x values of the intersection points. The y values are not the solutions.",
      "The number of intersection points is the number of solutions. Two crossing points mean two solutions, one touching point means one, and no meeting means none.",
      "Example: y = x² and y = 4 meet at (−2, 4) and (2, 4). So x² = 4 has two solutions, x = −2 and x = 2."
    ],
    "remember": "Solutions of f(x) = g(x) are the x values where the graphs meet, one for each meeting point.",
    "a": {
      "q": "The graphs of y = f(x) and y = g(x) meet at (1, 5) and (3, 5). What are the solutions of f(x) = g(x)?",
      "opts": ["x = 1 and x = 3", "x = 5", "x = 1, x = 3 and x = 5", "x = 5 only, found twice"],
      "why": "Solutions are the x values of the meeting points, which are 1 and 3. The y value 5 is tempting, but it is the common height of the graphs, not a solution for x.",
      "clue": "Which coordinate of each meeting point is the solution?"
    },
    "b": {
      "d": 3,
      "q": "The line y = 2 and the parabola y = x² + 3 are drawn on the same axes. The parabola never goes below y = 3. How many solutions does x² + 3 = 2 have?",
      "opts": [
        "None, because the graphs never meet",
        "One, because the line is horizontal",
        "Two, because a parabola is a quadratic",
        "Three, because there are three terms"
      ],
      "why": "The parabola's lowest point is y = 3, which is above the line y = 2, so the graphs never meet. No intersections means no solutions. A quadratic does not always have two solutions, as the graphs may not meet.",
      "clue": "Compare the height of the line with the lowest point of the parabola."
    }
  },
  "mat-right-angled-trigonometry": {
    "title": "Right-angled trigonometry",
    "card": [
      "In a right-angled triangle, the hypotenuse is the longest side, opposite the right angle. For a chosen angle θ, the opposite side is across from θ. The adjacent side is the side next to θ that is not the hypotenuse.",
      "sin θ = opposite ÷ hypotenuse. cos θ = adjacent ÷ hypotenuse. tan θ = opposite ÷ adjacent.",
      "To find a side, write the ratio that has the known side and the unknown side, then solve. To find an angle, use the inverse button: if sin θ = 0.5, then θ = sin⁻¹(0.5) = 30°.",
      "Worked example: the hypotenuse is 10 and θ = 30°. The side opposite θ is x. sin 30° = x ÷ 10, so x = 10 × sin 30° = 10 × 0.5 = 5."
    ],
    "remember": "Choose the ratio that links the side you know to the side you want.",
    "a": {
      "q": "In a right-angled triangle, the side opposite angle θ is 6 and the hypotenuse is 10. What is sin θ?",
      "opts": ["6/10", "10/6", "6/8", "8/10"],
      "why": "sin θ = opposite ÷ hypotenuse = 6/10. The option 6/8 is tempting, but it is opposite ÷ adjacent, which is tan θ rather than sin θ.",
      "clue": "Sine uses the opposite side and the hypotenuse."
    },
    "b": {
      "d": 2,
      "q": "A ladder 5 m long leans against a wall and makes an angle of 60° with the ground. The ladder is the hypotenuse. Which expression gives how far up the wall it reaches?",
      "opts": ["5 × sin 60°", "5 × cos 60°", "5 ÷ sin 60°", "5 × tan 60°"],
      "why": "The height up the wall is opposite the 60° angle at the ground, and the ladder is the hypotenuse. So sin 60° = height ÷ 5, giving height = 5 × sin 60°. Using cos 60° would find the distance from the wall to the foot of the ladder, which is the adjacent side.",
      "clue": "Is the height opposite or adjacent to the angle at the ground?"
    }
  },
  "mat-exact-values": {
    "title": "Exact values",
    "card": [
      [
        "45° triangle",
        "Half a square with side 1 has angles 45°, 45° and 90°. By Pythagoras the hypotenuse is √2. So sin 45° = 1/√2, cos 45° = 1/√2 and tan 45° = 1."
      ],
      [
        "30° and 60° triangle",
        "Half an equilateral triangle with side 2 has angles 30°, 60° and 90°. Its short side is 1 and its other side is √3, by Pythagoras."
      ],
      [
        "Reading it off",
        "Opposite 30° is 1, so sin 30° = 1/2, cos 30° = √3/2 and tan 30° = 1/√3. Opposite 60° is √3, so sin 60° = √3/2, cos 60° = 1/2 and tan 60° = √3."
      ],
      "Leave answers as surds, not decimals. Example: sin 60° × cos 30° = (√3/2) × (√3/2) = 3/4."
    ],
    "remember": "Draw the special triangle, then read the ratio from its sides.",
    "a": {
      "q": "What is the exact value of cos 60°?",
      "opts": ["1/2", "√3/2", "1/√2", "√3"],
      "why": "In the 30°, 60° and 90° triangle, the side next to 60° is 1 and the hypotenuse is 2, so cos 60° = 1/2. The value √3/2 is tempting, but that is sin 60° and cos 30°.",
      "clue": "Which side is next to the 60° angle?"
    },
    "b": {
      "d": 3,
      "q": "What is the exact value of sin 30° + tan 45°?",
      "opts": ["3/2", "1/2", "√3/2 + 1", "1 + 1/√2"],
      "why": "sin 30° = 1/2 and tan 45° = 1, so the sum is 1/2 + 1 = 3/2. The option 1/2 is tempting, but it leaves out the tan 45° term.",
      "clue": "Find each value from its triangle, then add."
    }
  },
  "mat-bearings-elevation": {
    "title": "Bearings and elevation",
    "card": [
      [
        "True bearing",
        "A true bearing is an angle measured clockwise from north, written with three digits. East is 090°, south is 180°, west is 270° and a bearing of 45° is written 045°."
      ],
      [
        "Elevation",
        "An angle of elevation is measured up from the horizontal to the line of sight. An angle of depression is measured down from the horizontal. The depression from A to B equals the elevation from B to A."
      ],
      [
        "Two steps",
        "Use sin, cos or tan in one right-angled triangle to find a shared side, then use it in the next. Example: 30 m from a tower the elevation is 40°, so height = 30 × tan 40° ≈ 25.2 m. Where the elevation is 25°, distance = 25.2 ÷ tan 25° ≈ 54.0 m."
      ],
      [
        "Back bearing",
        "To find the bearing of A from B, add 180° to the bearing of B from A, or subtract 180° if it is 180° or more. Bearings run from 000° up to 359°, and 360° is written 000°."
      ]
    ],
    "remember": "Bearings turn clockwise from north. Elevation and depression both start at the horizontal.",
    "a": {
      "q": "A plane flies south-west. What is its true bearing?",
      "opts": ["225°", "135°", "045°", "315°"],
      "why": "South is 180° and west is 270°, so south-west lies halfway between them at 225°. The answer 135° comes from turning anticlockwise from north, but bearings always turn clockwise.",
      "clue": "Turn clockwise from north past south, but not as far as west."
    },
    "b": {
      "d": 3,
      "q": "From the top of a 60 m lighthouse, the angle of depression to a boat is 15°. Later it is 25°. How far has the boat moved toward the lighthouse?",
      "opts": ["95.3 m", "11.9 m", "89.9 m", "352.6 m"],
      "why": "The depression angle equals the elevation angle at the boat, so each distance is 60 ÷ tan of the angle: 60 ÷ tan 15° ≈ 223.9 m and 60 ÷ tan 25° ≈ 128.7 m. The boat moved 223.9 − 128.7 ≈ 95.3 m. Multiplying by tan instead of dividing gives 11.9 m, which treats the height as the side next to the angle.",
      "clue": "The height is opposite the angle at the boat in both triangles."
    }
  },
  "mat-radians": {
    "title": "Radians",
    "card": [
      "One radian is the size of the angle at the centre of a circle when the arc length equals the radius. Radians are a way to measure angles, like degrees.",
      "The circumference is 2πr, so a full turn is 2π radians. This means π radians = 180°.",
      ["To radians", "multiply the degrees by π/180. Example: 60° × π/180 = π/3."],
      ["To degrees", "multiply the radians by 180/π. Example: 3π/4 × 180/π = 135°."]
    ],
    "remember": "π radians is 180°. Use π/180 to go to radians and 180/π to go to degrees.",
    "a": {
      "q": "What is 150° in radians?",
      "opts": ["5π/6", "6π/5", "5π/3", "3π/4"],
      "why": "150 × π/180 = 150π/180 = 5π/6. The option 6π/5 turns the fraction upside down, which would come from using 180/150 instead of 150/180.",
      "clue": "Multiply by π/180, then simplify the fraction."
    },
    "b": {
      "d": 2,
      "q": "Mia turns a dial through 5π/4 radians. How many degrees is this?",
      "opts": ["225°", "240°", "150°", "200°"],
      "why": "5π/4 × 180/π = 5 × 45 = 225°. The option 150° comes from using 5π/6, a different fraction, and 240° is 4π/3, so neither fits 5π/4.",
      "clue": "Multiply by 180/π so that π cancels."
    }
  },
  "mat-arcs-sectors": {
    "title": "Arcs and sectors",
    "card": [
      "An arc is part of the edge of a circle. A sector is the slice of the circle between two radii and an arc. The angle θ at the centre must be in radians.",
      ["Arc length", "l = rθ. The length is the radius times the angle in radians."],
      ["Sector area", "A = ½r²θ. Square the radius, multiply by θ, then halve."],
      [
        "Example",
        "A sector has r = 6 cm and θ = 2 radians. Arc length = 6 × 2 = 12 cm. Area = ½ × 6² × 2 = ½ × 36 × 2 = 36 cm²."
      ]
    ],
    "remember": "With θ in radians: arc length is rθ, and sector area is ½r²θ.",
    "a": {
      "q": "A sector has radius 5 cm and angle 3 radians. What is its arc length?",
      "opts": ["15 cm", "7.5 cm", "37.5 cm", "75 cm"],
      "why": "Arc length l = rθ = 5 × 3 = 15 cm. The answer 37.5 comes from the area formula ½r²θ, which gives an area in cm², not a length.",
      "clue": "Use the radius times the angle."
    },
    "b": {
      "d": 3,
      "q": "Mia cuts a slice of pizza shaped as a sector with radius 10 cm and angle 0.8 radians. What is the area of the slice?",
      "opts": ["40 cm²", "80 cm²", "8 cm²", "4 cm²"],
      "why": "A = ½r²θ = ½ × 10² × 0.8 = ½ × 100 × 0.8 = 40 cm². Forgetting the ½ gives 80 cm². Using rθ gives 8, which is the arc length.",
      "clue": "Square the radius first, then halve."
    }
  },
  "mat-sine-rule": {
    "title": "The sine rule",
    "card": [
      "In any triangle, a/sin A = b/sin B = c/sin C. Each side is opposite the angle with the same letter.",
      "Use it when you know an angle and the side opposite it, plus one more side or angle. Write two of the ratios, then solve for the unknown. Example: A = 30°, a = 5, B = 90° gives b = 5 × sin 90° ÷ sin 30° = 10.",
      "To find an angle, flip the rule: sin B = b sin A ÷ a. A calculator gives only an acute angle for B, but an obtuse angle 180° − B has the same sine.",
      "Ambiguous case: when you know two sides and an angle opposite one of them, two triangles can fit. The second angle 180° − B works if it still leaves room for the given angle, so the two angles add to less than 180°."
    ],
    "remember": "Match each side with its opposite angle. A sine can come from an acute angle or its obtuse partner.",
    "a": {
      "q": "In triangle PQR, angle P = 40°, angle Q = 70° and QR = 10 cm. What is the length of PR, to 1 decimal place?",
      "opts": ["14.6 cm", "6.8 cm", "4.5 cm", "9.4 cm"],
      "why": "QR is opposite P and PR is opposite Q. So PR = 10 × sin 70° ÷ sin 40° = 14.6 cm. Putting the sines the wrong way round gives 6.8 cm.",
      "clue": "Pair each side with the angle opposite it."
    },
    "b": {
      "d": 3,
      "q": "In triangle ABC, angle A = 30°, a = 8 cm and b = 12 cm. Using the sine rule, a calculator gives B = 48.6°. What is the other possible size of angle B?",
      "opts": ["131.4°", "41.4°", "101.4°", "228.6°"],
      "why": "Two triangles fit, because sin B = 12 × sin 30° ÷ 8 = 0.75 has an acute and an obtuse answer. The other angle is 180° − 48.6° = 131.4°, and 30° + 131.4° is less than 180°, so it works. 101.4° is the third angle of the first triangle, not another B.",
      "clue": "An obtuse angle shares its sine with an acute one."
    }
  },
  "mat-cosine-rule": {
    "title": "The cosine rule",
    "card": [
      "In any triangle, c² = a² + b² − 2ab cos C. Angle C is the angle between sides a and b, and c is the side opposite it.",
      "Use it to find the third side when you know two sides and the angle between them. Example: a = 5, b = 7, C = 60° gives c² = 25 + 49 − 70 × 0.5 = 39, so c = 6.2.",
      "Use it to find an angle when you know all three sides. Rearrange it: cos C = (a² + b² − c²) ÷ 2ab. Side c is the one opposite the angle you want.",
      "Work out 2ab cos C as one amount, subtract it from a² + b², and take the square root last."
    ],
    "remember": "Two sides and the angle between, or three sides: use the cosine rule.",
    "a": {
      "q": "Two trails leave a campsite at an angle of 60°. One is 6 km long and the other is 10 km long. How far apart are their ends, to 1 decimal place?",
      "opts": ["8.7 km", "14.0 km", "76.0 km", "2.8 km"],
      "why": "c² = 6² + 10² − 2 × 6 × 10 × cos 60° = 136 − 60 = 76, so c = 8.7 km. Stopping at 76 forgets the square root.",
      "clue": "The 60° angle sits between the two known sides."
    },
    "b": {
      "d": 3,
      "q": "A garden bed is a triangle with sides 5 m, 6 m and 7 m. What is the angle opposite the 7 m side, to 1 decimal place?",
      "opts": ["78.5°", "101.5°", "44.4°", "11.5°"],
      "why": "cos C = (5² + 6² − 7²) ÷ (2 × 5 × 6) = 12 ÷ 60 = 0.2, so C = 78.5°. The 7 m side must be c, the side opposite the angle. Using 101.5° comes from a sign error that makes cos C negative.",
      "clue": "The side opposite the wanted angle is the one that is subtracted."
    }
  },
  "mat-area-any-triangle": {
    "title": "Area of any triangle",
    "card": [
      "Area = ½ab sin C. Here a and b are two sides, and C is the angle between them.",
      "It works for any triangle, because a sin C acts as the height. You do not need to measure the height.",
      "Example: sides 8 cm and 5 cm with 30° between them. Area = ½ × 8 × 5 × sin 30° = 20 × 0.5 = 10 cm².",
      "To find an angle from a known area, rearrange to sin C = 2 × Area ÷ ab and take the inverse sine. As sin C = sin(180° − C), the obtuse angle 180° − C may also fit."
    ],
    "remember": "Half the product of two sides, times the sine of the angle between them.",
    "a": {
      "q": "A triangular paddock has two fences of 9 m and 12 m meeting at an angle of 40°. What is its area, to 1 decimal place?",
      "opts": ["34.7 m²", "41.4 m²", "69.4 m²", "108.0 m²"],
      "why": "Area = ½ × 9 × 12 × sin 40° = 54 × 0.6428 = 34.7 m². Using cos 40° gives 41.4 m², which uses the wrong ratio.",
      "clue": "Half, times both sides, times the sine."
    },
    "b": {
      "d": 3,
      "q": "A triangle has an area of 20 cm². Two of its sides are 8 cm and 10 cm, and the acute angle between them is C. What is C?",
      "opts": ["30°", "14.5°", "60°", "7.2°"],
      "why": "20 = ½ × 8 × 10 × sin C = 40 sin C, so sin C = 0.5 and C = 30°. The angle 150° also has a sine of 0.5, but it is not acute. Forgetting the ½ gives sin C = 0.25, which is 14.5°.",
      "clue": "Write the area formula, then solve for sin C."
    }
  },
  "mat-unit-circle": {
    "title": "The unit circle",
    "card": [
      "The unit circle has its centre at the origin and radius 1. Start at the point (1, 0) and turn anticlockwise by an angle θ. You land on a point P on the circle.",
      "The x-coordinate of P is cos θ. The y-coordinate of P is sin θ. So P = (cos θ, sin θ).",
      "Signs follow from the coordinates. In quadrant 1, x and y are both positive. In quadrant 2, x is negative and y is positive. In quadrant 3, both are negative. In quadrant 4, x is positive and y is negative.",
      "Example: at θ = 90°, P = (0, 1), so cos 90° = 0 and sin 90° = 1. At θ = 180°, P = (−1, 0), so cos 180° = −1 and sin 180° = 0."
    ],
    "remember": "On the unit circle, P = (cos θ, sin θ), so the signs of x and y give the signs of cos θ and sin θ.",
    "a": {
      "q": "What is the value of sin 180°?",
      "opts": ["0", "−1", "1", "180"],
      "why": "At 180° the point on the unit circle is (−1, 0). Sin is the y-coordinate, so sin 180° = 0. The value −1 is the x-coordinate, which is cos 180°.",
      "clue": "Sin is one of the two coordinates. Which one?"
    },
    "b": {
      "d": 3,
      "q": "An angle θ has its point P on the unit circle in quadrant 3. Which pair of signs is correct?",
      "opts": [
        "cos θ is negative and sin θ is negative",
        "cos θ is negative and sin θ is positive",
        "cos θ is positive and sin θ is negative",
        "cos θ is positive and sin θ is positive"
      ],
      "why": "In quadrant 3, P is to the left of the y-axis and below the x-axis, so x and y are both negative. Cos θ is x and sin θ is y, so both are negative. Quadrant 2 is the one where only cos θ is negative.",
      "clue": "Think about which side of each axis quadrant 3 lies on."
    }
  },
  "mat-angles-any-size": {
    "title": "Angles of any size",
    "card": [
      "For an angle beyond 90°, find its related acute angle: the acute angle it makes with the x-axis. The trig ratio has the same size as the ratio of that acute angle.",
      "The quadrant gives the sign. In quadrant 1 all ratios are positive. In quadrant 2 only sin is positive. In quadrant 3 only tan is positive. In quadrant 4 only cos is positive.",
      "Related acute angle: in quadrant 2 it is 180° − θ. In quadrant 3 it is θ − 180°. In quadrant 4 it is 360° − θ. In radians, use π in place of 180° and 2π in place of 360°.",
      "Example: sin 150°. It is in quadrant 2, so the related angle is 180° − 150° = 30° and sin is positive. So sin 150° = sin 30° = 1/2."
    ],
    "remember": "Find the related acute angle for the size, then use the quadrant for the sign.",
    "a": {
      "q": "What is the value of cos 120°?",
      "opts": ["−1/2", "1/2", "−√3/2", "√3/2"],
      "why": "120° is in quadrant 2, so the related angle is 180° − 120° = 60°. Cos is negative in quadrant 2, so cos 120° = −cos 60° = −1/2. The option 1/2 has the right size but ignores the sign.",
      "clue": "Find the related angle, then check the sign in quadrant 2."
    },
    "b": {
      "d": 3,
      "q": "What is the value of tan (5π/4)?",
      "opts": ["1", "−1", "√3", "−√3"],
      "why": "5π/4 is between π and 3π/2, so it is in quadrant 3. The related angle is 5π/4 − π = π/4, and tan (π/4) = 1. Tan is positive in quadrant 3, so the answer is 1. The option −1 comes from wrongly treating tan as negative here.",
      "clue": "Subtract π to get the related angle, then check the sign in quadrant 3."
    }
  },
  "mat-graphs-sine-cosine-tangent": {
    "title": "Graphs of sine, cosine and tangent",
    "card": [
      [
        "Sine and cosine",
        "y = sin x and y = cos x are smooth waves between −1 and 1. The amplitude is 1 and the period is 360° (2π radians), so the pattern then repeats."
      ],
      [
        "Starting points",
        "sin x starts at 0 and rises: sin 0° = 0. cos x starts at its maximum: cos 0° = 1. The cosine graph is the sine graph shifted left by 90°."
      ],
      [
        "Tangent",
        "y = tan x has no maximum, so it has no amplitude. Its period is 180° (π radians). It has vertical asymptotes at x = ±90°, ±270° and so on, where cos x = 0."
      ],
      [
        "Example",
        "tan 0° = 0 and tan 45° = 1. Between the asymptotes at −90° and 90°, the graph rises through the origin. It falls without limit as x nears −90° and climbs without limit as x nears 90°."
      ]
    ],
    "remember": "Sine and cosine repeat every 360° with amplitude 1. Tangent repeats every 180° and has asymptotes.",
    "a": {
      "q": "What is the period of y = tan x?",
      "opts": ["180°", "360°", "90°", "1"],
      "why": "The tangent graph repeats every 180°, or π radians. 360° is the period of sine and cosine, which is the tempting mistake.",
      "clue": "Tangent repeats twice as often as sine."
    },
    "b": {
      "d": 3,
      "q": "Which statement about the graph of y = tan x is correct?",
      "opts": [
        "It has an asymptote at x = 90°",
        "It has an amplitude of 1",
        "It passes through the point (90°, 1)",
        "It has a maximum value of 1"
      ],
      "why": "At x = 90°, cos x = 0, so the graph has a vertical asymptote there. Tangent has no maximum, so it has no amplitude. The values of 1 belong to sine and cosine, and tan 90° is undefined.",
      "clue": "Where does cos x equal 0?"
    }
  },
  "mat-reciprocal-ratios": {
    "title": "Reciprocal ratios",
    "card": [
      "Three more trig ratios are the reciprocals (1 divided by the ratio) of the ones you know. They are cosecant, secant and cotangent.",
      [
        "Cosec",
        "cosec θ = 1/sin θ, so sin 30° = 1/2 gives cosec 30° = 2. It is undefined when sin θ = 0, such as at 0°, 180° and 360°."
      ],
      ["Sec", "sec θ = 1/cos θ. It is undefined when cos θ = 0, such as at 90° and 270°."],
      ["Cot", "cot θ = 1/tan θ = cos θ/sin θ. It is undefined when sin θ = 0, such as at 0° and 180°."]
    ],
    "remember": "Each reciprocal ratio is 1 over its partner, and it is undefined where that partner equals 0.",
    "a": {
      "q": "Which of these is equal to sec θ?",
      "opts": ["1/cos θ", "1/sin θ", "1/tan θ", "cos θ/sin θ"],
      "why": "Secant is the reciprocal of cosine, so sec θ = 1/cos θ. The tempting mix-up is 1/sin θ, but that is cosec θ. Cosec pairs with sin, and sec pairs with cos.",
      "clue": "Sec θ is undefined at 90°. Which ratio is 0 there?"
    },
    "b": {
      "d": 3,
      "q": "For which angle is cosec θ undefined?",
      "opts": ["180°", "90°", "270°", "60°"],
      "why": "cosec θ = 1/sin θ, and sin 180° = 0, so the division is impossible. At 90° and 270° it is sec θ that is undefined, because cos θ = 0 there. At 60° sin θ is not 0, so cosec 60° is defined.",
      "clue": "Find where sin θ = 0, not cos θ = 0."
    }
  },
  "mat-pythagorean-identity": {
    "title": "The Pythagorean identity",
    "card": [
      "For any angle θ, sin²θ + cos²θ = 1. It comes from the unit circle: the point (cos θ, sin θ) lies on a circle of radius 1, so x² + y² = 1.",
      "Rearranged, it gives sin²θ = 1 − cos²θ and cos²θ = 1 − sin²θ. If you take a square root, use the quadrant to choose the sign.",
      "Dividing every term by cos²θ gives tan²θ + 1 = sec²θ, using tan θ = sin θ ÷ cos θ. You cannot divide by zero, so this form holds only where cos θ ≠ 0.",
      "Example: simplify 1 − cos²θ. By the identity it equals sin²θ. To prove an identity, work on one side only until it matches the other."
    ],
    "remember": "Swap sin²θ and cos²θ using sin²θ + cos²θ = 1. The tan and sec form needs cos θ ≠ 0.",
    "a": {
      "q": "If sin θ = 3/5 and θ is acute, what is the value of cos θ?",
      "opts": ["4/5", "2/5", "16/25", "−4/5"],
      "why": "cos²θ = 1 − sin²θ = 1 − 9/25 = 16/25, so cos θ = 4/5. Since θ is acute, cos θ is positive. The value 16/25 is cos²θ, so the square root step is still needed.",
      "clue": "Find cos²θ first, then take the square root."
    },
    "b": {
      "d": 3,
      "q": "Which expression is equal to (1 − cos²θ) ÷ sin θ, for sin θ ≠ 0?",
      "opts": ["sin θ", "cos θ", "sin²θ", "1/sin θ"],
      "why": "1 − cos²θ = sin²θ, so the expression is sin²θ ÷ sin θ = sin θ. The option sin²θ is tempting, but it is only the top rewritten: you still have to divide by sin θ.",
      "clue": "Rewrite the top using sin²θ + cos²θ = 1, then divide."
    }
  },
  "mat-solving-trigonometric-equations": {
    "title": "Solving trigonometric equations",
    "card": [
      "First rearrange to get one trig ratio alone. For 2 sin x = 1, divide by 2 to get sin x = 1/2.",
      "Find the related acute angle by ignoring the sign. Here sin 30° = 1/2, so the related angle is 30°.",
      "Use the signs in each quadrant to place the angle. Sin is positive in quadrants 1 and 2, so x = 30° and x = 180° − 30° = 150°. Cos is positive in quadrants 1 and 4. Tan is positive in quadrants 1 and 3.",
      "To find every solution in a larger domain, add or subtract the period: 360° for sin and cos, 180° for tan. For 0° ≤ x ≤ 360°, the solutions of sin x = 1/2 are 30° and 150°."
    ],
    "remember": "Find the related angle, place it using the quadrants, then use the period for the rest of the domain.",
    "a": {
      "q": "What are the solutions of 2 cos x = 1 for 0° ≤ x ≤ 360°?",
      "opts": ["60° and 300°", "60° and 120°", "30° and 330°", "60° and 240°"],
      "why": "cos x = 1/2, so the related angle is 60°. Cos is positive in quadrants 1 and 4, giving 60° and 360° − 60° = 300°. The pair 60° and 120° uses the quadrants where sin is positive, which is the wrong ratio.",
      "clue": "Cos is positive in quadrants 1 and 4."
    },
    "b": {
      "d": 3,
      "q": "How many solutions does tan x = 1 have for 0° ≤ x ≤ 720°?",
      "opts": ["4", "2", "3", "8"],
      "why": "The related angle is 45°, and tan has a period of 180°. The solutions are 45°, 225°, 405° and 585°, so there are 4. Using a period of 360° gives only 2, which is the tempting mistake.",
      "clue": "Tan repeats every 180°, not 360°."
    }
  },
  "mat-average-rate-change": {
    "title": "Average rate of change",
    "card": [
      "The average rate of change of f(x) from x = a to x = b is how much f changes for each 1 unit of x, on average. It equals (f(b) − f(a)) ÷ (b − a).",
      "This is the gradient of the secant, the straight line through the points (a, f(a)) and (b, f(b)) on the curve.",
      "Worked example: for f(x) = x², find the average rate of change from x = 1 to x = 3. f(3) = 9 and f(1) = 1, so the rate is (9 − 1) ÷ (3 − 1) = 8 ÷ 2 = 4.",
      "The answer is an average over the whole interval. The curve can be steeper or flatter at points inside it. If x and f(x) have units, the rate is in units of f per unit of x."
    ],
    "remember": "Average rate of change is the change in f divided by the change in x, which is the secant gradient.",
    "a": {
      "q": "For f(x) = x² + 2x, what is the average rate of change from x = 1 to x = 4?",
      "opts": ["7", "8", "21", "3"],
      "why": "f(4) = 24 and f(1) = 3, so the rate is (24 − 3) ÷ (4 − 1) = 21 ÷ 3 = 7. The answer 21 is wrong because it skips dividing by the change in x.",
      "clue": "Divide the change in f by the change in x."
    },
    "b": {
      "d": 3,
      "q": "A drone's height is h(t) = 2t² metres after t seconds. What is its average rate of change of height from t = 2 to t = 5, and what is it measured in?",
      "opts": ["14 metres per second", "42 metres per second", "14 metres", "6 metres per second"],
      "why": "h(5) = 50 and h(2) = 8, so the rate is (50 − 8) ÷ (5 − 2) = 42 ÷ 3 = 14. It is height per time, so the unit is metres per second. Answering 42 is tempting, but that is only the change in height and skips dividing by 3.",
      "clue": "Find both heights, then divide by the time taken."
    }
  },
  "mat-derivative-from-first-principles": {
    "title": "The derivative from first principles",
    "card": [
      "The gradient of a secant through (x, f(x)) and (x + h, f(x + h)) is (f(x + h) − f(x))/h. Here h is the gap in x between the two points.",
      "As h gets closer to 0, the second point slides towards the first. The secant turns into the tangent at that point.",
      "The derivative is that limit: f'(x) = lim (f(x + h) − f(x))/h as h approaches 0. It gives the gradient of the tangent at x.",
      "Example: f(x) = x². Then (f(x + h) − f(x))/h = (2xh + h²)/h = 2x + h. As h approaches 0, this approaches 2x, so f'(x) = 2x."
    ],
    "remember": "Find the secant gradient, simplify it, then let h approach 0.",
    "a": {
      "q": "What does f'(x) = lim (f(x + h) − f(x))/h as h approaches 0 give?",
      "opts": [
        "The gradient of the tangent at x",
        "The gradient of the secant between two fixed points",
        "The average rate of change over an interval",
        "The value of the function at x"
      ],
      "why": "As h approaches 0, the secant becomes the tangent, so the limit is the tangent's gradient. A secant gradient needs two separate points, so it is not the limit.",
      "clue": "What does the secant turn into as h shrinks?"
    },
    "b": {
      "d": 3,
      "q": "Using first principles, what is f'(x) for f(x) = x² + 3x?",
      "opts": ["2x + 3", "2x + 3h", "x² + 3", "2x"],
      "why": "The secant gradient is ((x + h)² + 3(x + h) − x² − 3x)/h = (2xh + h² + 3h)/h = 2x + h + 3. As h approaches 0, this approaches 2x + 3. The option 2x + 3h keeps h, which has gone to 0 in the limit.",
      "clue": "Expand, cancel the h in the denominator, then let h approach 0."
    }
  },
  "mat-power-rule": {
    "title": "The power rule",
    "card": [
      "The derivative of xⁿ is nxⁿ⁻¹. Bring the power down in front, then reduce the power by 1. For example, the derivative of x⁵ is 5x⁴.",
      "The rule works for negative and fractional powers too. Write roots and reciprocals as powers first: √x = x^(1/2) and 1/x² = x^(−2).",
      "A constant multiple stays in front: the derivative of 3x⁴ is 3 × 4x³ = 12x³. A constant on its own has derivative 0.",
      "For a sum or difference, differentiate each term separately. The derivative of x³ − 6x + 5 is 3x² − 6."
    ],
    "remember": "Bring the power down, then take 1 off the power. Do this term by term.",
    "a": {
      "q": "What is the derivative of 4x³ + 2x?",
      "opts": ["12x² + 2", "12x² + 2x", "4x² + 2", "3x² + 2"],
      "why": "Differentiate each term. 4x³ gives 4 × 3x² = 12x², and 2x gives 2. The option 12x² + 2x is tempting, but it leaves the power on the second term, so 2x was not differentiated.",
      "clue": "Differentiate each term separately, and keep the constant multiple."
    },
    "b": {
      "d": 3,
      "q": "What is the derivative of 6√x, written as 6x^(1/2)?",
      "opts": ["3x^(−1/2)", "6x^(−1/2)", "3x^(1/2)", "12x^(3/2)"],
      "why": "Bring down 1/2 and multiply by 6 to get 3. Then subtract 1 from 1/2 to get −1/2, so the answer is 3x^(−1/2). The option 6x^(−1/2) lowers the power but forgets to multiply 6 by 1/2.",
      "clue": "Multiply 6 by the power, then subtract 1 from 1/2."
    }
  },
  "mat-tangents-normals": {
    "title": "Tangents and normals",
    "card": [
      [
        "Tangent",
        "The gradient of the tangent at x = a is f'(a). Find f(a) for the point, then use y − y₁ = m(x − x₁) with m = f'(a)."
      ],
      [
        "Normal",
        "The normal is the line through the same point, perpendicular to the tangent. Its gradient is the negative reciprocal: −1/f'(a), when f'(a) is not 0."
      ],
      "Example: f(x) = x², at x = 3. The point is (3, 9) and f'(x) = 2x, so the tangent gradient is 6. Tangent: y − 9 = 6(x − 3), so y = 6x − 9.",
      "The normal gradient is −1/6, so the normal is y − 9 = −(1/6)(x − 3), which gives y = −x/6 + 19/2."
    ],
    "remember": "Use f'(a) for the tangent gradient, then flip it and change the sign for the normal.",
    "a": {
      "q": "The tangent to a curve at a point has gradient 4. What is the gradient of the normal at that point?",
      "opts": ["−1/4", "1/4", "−4", "4"],
      "why": "The normal is perpendicular to the tangent, so its gradient is the negative reciprocal of 4, which is −1/4. The option 1/4 flips the gradient but keeps the sign, so 4 × 1/4 = 1, not −1, and the lines are not perpendicular.",
      "clue": "Flip the number, then change the sign."
    },
    "b": {
      "d": 3,
      "q": "What is the equation of the tangent to f(x) = x² + 2x at x = 1?",
      "opts": ["y = 4x − 1", "y = 4x + 3", "y = 2x + 1", "y = −x/4 + 13/4"],
      "why": "f(1) = 3, so the point is (1, 3). f'(x) = 2x + 2, so the gradient is 4. Then y − 3 = 4(x − 1), giving y = 4x − 1. The option y = 4x + 3 uses the right gradient but wrongly takes the y-value as the intercept.",
      "clue": "Find the point and f'(1) first, then use y − y₁ = m(x − x₁)."
    }
  },
  "mat-where-function-not-differentiable": {
    "title": "Where a function is not differentiable",
    "card": [
      "A derivative at a point is the gradient of the tangent there. If no single tangent gradient exists, the function is not differentiable at that point.",
      [
        "Sharp corner",
        "the left and right sides have different gradients. For f(x) = |x| at x = 0, the gradient is −1 on the left and 1 on the right, so there is no derivative."
      ],
      [
        "Jump",
        "the graph breaks, so it is not continuous there. A function that is not continuous at a point cannot be differentiable there."
      ],
      [
        "Vertical tangent",
        "the tangent is a vertical line, which has no gradient. For f(x) = ∛x at x = 0, the curve is continuous but the gradient grows without limit. So a function can be continuous at a point and still not differentiable there."
      ]
    ],
    "remember": "No derivative where the graph has a corner, a jump or a vertical tangent.",
    "a": {
      "q": "Which function is continuous at x = 0 but has no derivative there?",
      "opts": ["f(x) = |x|", "f(x) = x²", "f(x) = 3x + 1", "f(x) = x³"],
      "why": "The graph of |x| has no break at x = 0, but the gradient changes from −1 to 1 at the corner, so there is no derivative. The graph of x² is smooth at x = 0, with gradient 0, so it is differentiable.",
      "clue": "Look for the function whose graph has a sharp point at the origin."
    },
    "b": {
      "d": 3,
      "q": "A function has gradient 2 for x < 3 and gradient 2 for x > 3, but its graph jumps up by 4 units at x = 3. What is true at x = 3?",
      "opts": [
        "It is not differentiable, because it is not continuous",
        "It is differentiable, because both gradients equal 2",
        "It is not differentiable, because of a sharp corner",
        "It is not differentiable, because the tangent is vertical"
      ],
      "why": "A jump means the function is not continuous at x = 3, so it cannot be differentiable there. Equal gradients on each side are tempting, but the two pieces do not meet, so there is no single tangent at that point.",
      "clue": "Check whether the graph is joined at x = 3 before comparing gradients."
    }
  },
  "mat-product-rule": {
    "title": "The product rule",
    "card": [
      "Use the product rule when a function is two factors multiplied together, such as x²(4x − 1). Call the factors u and v.",
      "The rule: if y = uv, then dy/dx = u'v + uv'. Differentiate one factor at a time and leave the other alone, then add.",
      "Example: y = x³(2x + 5). Let u = x³ and v = 2x + 5, so u' = 3x² and v' = 2.",
      "dy/dx = 3x²(2x + 5) + x³ × 2 = 6x³ + 15x² + 2x³ = 8x³ + 15x². Check by expanding first: y = 2x⁴ + 5x³, which gives 8x³ + 15x²."
    ],
    "remember": "Product rule: derivative of the first times the second, plus the first times the derivative of the second.",
    "a": {
      "q": "For y = x²(3x − 1), let u = x² and v = 3x − 1. Which expression is dy/dx?",
      "opts": ["2x(3x − 1) + x² × 3", "2x × 3", "2x(3x − 1) − x² × 3", "2x × 3 + x² × 3"],
      "why": "The product rule adds u'v and uv', so dy/dx = 2x(3x − 1) + 3x². Multiplying the two derivatives, 2x × 3, is the tempting mistake: the rule never multiplies u' by v'.",
      "clue": "Differentiate one factor at a time, keep the other, then add."
    },
    "b": {
      "d": 2,
      "q": "What is the derivative of y = x⁴(x + 2) at x = 1?",
      "opts": ["13", "12", "11", "4"],
      "why": "With u = x⁴ and v = x + 2, dy/dx = 4x³(x + 2) + x⁴ × 1, which is 4 × 3 + 1 = 13 at x = 1. Expanding first gives y = x⁵ + 2x⁴, so dy/dx = 5x⁴ + 8x³, also 13. The answer 12 comes from leaving out the uv' term.",
      "clue": "Find dy/dx with the product rule, then substitute x = 1."
    }
  },
  "mat-quotient-rule": {
    "title": "The quotient rule",
    "card": [
      "Use the quotient rule to differentiate a fraction y = u/v, where u and v are both functions of x and v is not zero.",
      "The rule is dy/dx = (u'v − uv') ÷ v². Here u' and v' are the derivatives of u and v.",
      "The order on top matters. Start with u'v (the derivative of the top times the bottom), then subtract uv'. Swapping them flips the sign of the answer.",
      "Example: y = x²/(x + 1). Take u = x² and v = x + 1, so u' = 2x and v' = 1. Then dy/dx = (2x(x + 1) − x² × 1) ÷ (x + 1)² = (x² + 2x) ÷ (x + 1)²."
    ],
    "remember": "Top: u'v − uv'. Bottom: v². The derivative of the top comes first.",
    "a": {
      "q": "Which expression is the derivative of u/v by the quotient rule?",
      "opts": ["(u'v − uv') ÷ v²", "(uv' − u'v) ÷ v²", "(u'v + uv') ÷ v²", "(u'v − uv') ÷ v"],
      "why": "The top is u'v − uv', with the derivative of the top function first, and the bottom is v squared. The expression (uv' − u'v) ÷ v² has the terms on top in the wrong order, so it gives the answer with the wrong sign.",
      "clue": "Start the top line with u', the derivative of the top function."
    },
    "b": {
      "d": 2,
      "q": "Using the quotient rule, what is the derivative of y = x/(x + 2)?",
      "opts": ["2 ÷ (x + 2)²", "−2 ÷ (x + 2)²", "(2x + 2) ÷ (x + 2)²", "1 ÷ (x + 2)²"],
      "why": "Let u = x and v = x + 2, so u' = 1 and v' = 1. The top is 1 × (x + 2) − x × 1 = 2, so dy/dx = 2 ÷ (x + 2)². Putting the terms in the wrong order would give −2, which is the most tempting mistake.",
      "clue": "Find u' and v' first, then work out u'v − uv'."
    }
  },
  "mat-chain-rule": {
    "title": "The chain rule",
    "card": [
      "A composite function has one function inside another, such as (3x + 1)⁵. The inner function is 3x + 1 and the outer function is the fifth power.",
      "The chain rule says: if y = f(g(x)), then dy/dx = f'(g(x)) × g'(x). Differentiate the outer function and leave the inside alone, then multiply by the derivative of the inside.",
      "Example: y = (3x + 1)⁵. The outer derivative is 5(3x + 1)⁴. The inner derivative is 3. So dy/dx = 5(3x + 1)⁴ × 3 = 15(3x + 1)⁴.",
      "A common mistake is to leave out the derivative of the inside. To find the gradient at a point, find dy/dx first, then substitute the x value."
    ],
    "remember": "Differentiate the outside, keep the inside, then multiply by the derivative of the inside.",
    "a": {
      "q": "What is the derivative of y = (2x + 7)⁴?",
      "opts": ["8(2x + 7)³", "4(2x + 7)³", "4(2x + 7)³ + 2", "2(2x + 7)⁴"],
      "why": "The outer derivative is 4(2x + 7)³ and the inner derivative is 2, so dy/dx = 4(2x + 7)³ × 2 = 8(2x + 7)³. The option 4(2x + 7)³ is tempting, but it leaves out the multiplication by the derivative of the inside.",
      "clue": "Multiply by the derivative of 2x + 7."
    },
    "b": {
      "d": 3,
      "q": "Find the gradient of y = (x² − 3)³ at x = 2.",
      "opts": ["12", "3", "6", "1"],
      "why": "dy/dx = 3(x² − 3)² × 2x = 6x(x² − 3)². At x = 2 this is 6 × 2 × (4 − 3)² = 12. The answer 6 uses 2 as the inner derivative instead of 2x, 3 leaves out the inner derivative, and 1 is the value of y, not the gradient.",
      "clue": "Find the derivative of x² − 3 before you substitute."
    }
  },
  "mat-derivatives-as-rates-context": {
    "title": "Derivatives as rates in context",
    "card": [
      "The derivative dy/dx is the rate of change of y with respect to x. Its units are the units of y per unit of x.",
      "If x(t) is displacement in metres at time t seconds, then x'(t) is velocity in metres per second. A positive value means moving in the positive direction, and a negative value means moving the other way.",
      "To find a rate at a given time, differentiate first, then substitute the value of t. Example: V = 4t² + 10 litres at t minutes. V' = 8t, so at t = 3 the rate is 8 × 3 = 24 litres per minute.",
      "The same idea works in any setting: if C(n) is cost in dollars for n items, then C'(n) is the rate of change of cost in dollars per item."
    ],
    "remember": "Differentiate, then substitute. The units are y units per x unit.",
    "a": {
      "q": "The volume of water in a tank is V = 5t² + 20 litres after t minutes. What is the rate of change of volume at t = 2?",
      "opts": ["20 litres per minute", "40 litres per minute", "40 litres", "20 litres"],
      "why": "V' = 10t, so at t = 2 the rate is 10 × 2 = 20 litres per minute. Substituting t = 2 into V gives 40 litres, which is the volume itself and not the rate.",
      "clue": "Differentiate before you substitute."
    },
    "b": {
      "d": 3,
      "q": "A cyclist's displacement from home is x = 2t³ − 12t metres after t seconds. What is her velocity at t = 2?",
      "opts": ["12 metres per second", "−8 metres per second", "4 metres per second", "12 metres"],
      "why": "x' = 6t² − 12, so at t = 2 the velocity is 6 × 4 − 12 = 12 metres per second. Substituting into x gives 16 − 24 = −8, which is her displacement in metres and not her velocity.",
      "clue": "Velocity is the derivative of displacement."
    }
  },
  "mat-exponential-functions": {
    "title": "Exponential functions",
    "card": [
      "An exponential function has the form y = aˣ, where the base a is a positive number and a ≠ 1. The variable x is the power.",
      [
        "a > 1",
        "the graph rises from left to right. It is growth: y gets bigger as x increases, and y gets closer to 0 as x becomes very negative."
      ],
      [
        "0 < a < 1",
        "the graph falls from left to right. It is decay: y gets smaller as x increases, and y gets very large as x becomes very negative."
      ],
      "Both graphs pass through (0, 1), because a⁰ = 1. Both stay above the x-axis and get closer to the line y = 0 on one side without touching it. This line is the horizontal asymptote. Example: y = 2ˣ has points (0, 1), (1, 2) and (3, 8)."
    ],
    "remember": "Every y = aˣ passes through (0, 1), stays above the x-axis and has y = 0 as its asymptote.",
    "a": {
      "q": "Which statement is true for the graph of y = (1/2)ˣ?",
      "opts": [
        "It falls from left to right and passes through (0, 1)",
        "It rises from left to right and passes through (0, 1)",
        "It falls from left to right and passes through (0, 0)",
        "It rises from left to right and passes through (1, 0)"
      ],
      "why": "The base 1/2 is between 0 and 1, so the graph falls. Any base to the power 0 is 1, so it passes through (0, 1). Through (0, 0) is wrong because aˣ is never 0.",
      "clue": "Is the base more than 1 or between 0 and 1? What is a⁰?"
    },
    "b": {
      "d": 3,
      "q": "Mia graphs y = 3ˣ and y = (1/3)ˣ on the same axes. Which statement is true for both graphs?",
      "opts": [
        "Both have the horizontal asymptote y = 0",
        "Both rise from left to right",
        "Both cross the x-axis at x = 1",
        "Both have the y-intercept 3"
      ],
      "why": "Both have positive bases not equal to 1, so both have y-intercept 1 and get closer to y = 0 without touching it. The graph of y = 3ˣ rises but y = (1/3)ˣ falls, so rising is not true for both.",
      "clue": "Think about what both graphs share, whatever the base."
    }
  },
  "mat-number-e": {
    "title": "The number e",
    "card": [
      "e is a special number, about 2.718. It is irrational, so its decimal never ends or repeats.",
      "y = eˣ is an exponential function with base e. Like other exponentials with base above 1, it is always positive and rises as x increases.",
      "What makes eˣ special is its gradient. At every point on the curve, the gradient equals the y-value at that point.",
      "So the derivative of eˣ is eˣ. Example: at x = 0, y = e⁰ = 1, so the gradient there is 1. At x = 2, the gradient is e², about 7.39."
    ],
    "remember": "The gradient of y = eˣ equals its height, so the derivative of eˣ is eˣ.",
    "a": {
      "q": "What is the derivative of y = eˣ?",
      "opts": ["eˣ", "x eˣ⁻¹", "eˣ⁺¹", "e"],
      "why": "The gradient of y = eˣ equals its y-value at every point, so the derivative is eˣ again. The rule x eˣ⁻¹ copies the power rule for xⁿ, but eˣ has the variable in the power, so that rule does not apply.",
      "clue": "The gradient matches the y-value at every point."
    },
    "b": {
      "d": 2,
      "q": "Mia studies the curve y = eˣ. At the point where x = 3, what is the exact gradient of the curve?",
      "opts": ["e³", "3e²", "3", "e"],
      "why": "The gradient equals the y-value at each point. At x = 3, y = e³, so the gradient is e³. The answer 3e² comes from wrongly using the power rule, and 3 is just the x-value.",
      "clue": "Find the y-value at x = 3 first."
    }
  },
  "mat-logarithm": {
    "title": "What a logarithm is",
    "card": [
      "log_a(x) is the power that a must be raised to, to give x. The number a is called the base.",
      "Example: 2³ = 8, so log₂ 8 = 3. Read it as: 2 to what power gives 8? The answer is 3.",
      "To work one out, ask the question in words. For log₃ 81, ask: 3 to what power gives 81? Since 3⁴ = 81, log₃ 81 = 4.",
      "Logarithms undo exponentials. The statements a^y = x and log_a(x) = y say the same thing, so you can swap between the two forms."
    ],
    "remember": "A logarithm is a power: log_a(x) asks what power of a gives x.",
    "a": {
      "q": "What is the value of log₅ 25?",
      "opts": ["2", "5", "20", "25/5"],
      "why": "5² = 25, so 5 must be raised to the power 2. The answer 5 is tempting because it is the base, but the logarithm is the power, not the base.",
      "clue": "5 to what power gives 25?"
    },
    "b": {
      "d": 3,
      "q": "Which exponential statement is the same as log₄ x = 3?",
      "opts": ["4³ = x", "3⁴ = x", "x³ = 4", "4x = 3"],
      "why": "log₄ x = 3 means 4 raised to the power 3 gives x, so 4³ = x. The option 3⁴ = x swaps the base and the power, which is a common mistake.",
      "clue": "The base of the logarithm stays the base of the power."
    }
  },
  "mat-logarithm-laws": {
    "title": "Logarithm laws",
    "card": [
      [
        "Product law",
        "log(xy) = log x + log y. Multiplying inside the log becomes adding the logs. All logs here share the same base."
      ],
      ["Quotient law", "log(x/y) = log x − log y. Dividing inside the log becomes subtracting the logs."],
      [
        "Power law",
        "log(xⁿ) = n log x. The power comes down to the front as a multiplier. For example, log₂ 32 = log₂ (2⁵) = 5 log₂ 2 = 5."
      ],
      ["Special values", "log_a(1) = 0, because a⁰ = 1. log_a(a) = 1, because a¹ = a."]
    ],
    "remember": "Logs turn multiplying into adding, dividing into subtracting, and powers into multipliers.",
    "a": {
      "q": "What is log₃ 6 + log₃ 1.5 equal to?",
      "opts": ["2", "7.5", "log₃ 4", "log₃ 7.5"],
      "why": "Adding logs with the same base means multiplying inside: log₃ (6 × 1.5) = log₃ 9. Since 3² = 9, this equals 2. The option log₃ 7.5 comes from adding the numbers inside, which the product law does not do.",
      "clue": "Adding logs means multiplying what is inside them."
    },
    "b": {
      "d": 3,
      "q": "What is the value of log₅ 50 − log₅ 2 + log₅ 5?",
      "opts": ["3", "2", "4", "log₅ 53"],
      "why": "log₅ 50 − log₅ 2 = log₅ 25 = 2, using the quotient law. Then log₅ 5 = 1, so the total is 3. The answer 2 comes from forgetting that log₅ 5 = 1.",
      "clue": "Combine the first two terms into one log, then find the special value."
    }
  },
  "mat-change-base": {
    "title": "Change of base",
    "card": [
      "Many calculators mainly offer two log buttons: log for base 10 and ln for base e. To find a log in another base, you can change it to one of these.",
      "The rule: log_a(x) = log_b(x) ÷ log_b(a). The new base b can be any valid base, such as 10 or e. The base a goes in the bottom.",
      "Example: find log₂ 20. log₂ 20 = log 20 ÷ log 2 = 1.3010 ÷ 0.3010 = 4.32 (to 2 decimal places).",
      "Check: 2⁴ = 16 and 2⁵ = 32, and 20 lies between them, so an answer between 4 and 5 makes sense."
    ],
    "remember": "Log of the number on top, log of the old base on the bottom, both in the same new base.",
    "a": {
      "q": "Which expression gives log₅ 40, using base 10 logs?",
      "opts": ["log 40 ÷ log 5", "log 5 ÷ log 40", "log 40 − log 5", "log 40 × log 5"],
      "why": "The number goes on top and the old base goes on the bottom: log₅ 40 = log 40 ÷ log 5. Flipping the fraction is the tempting mistake, and it gives the reciprocal of the right value.",
      "clue": "The base of the original log goes in the bottom."
    },
    "b": {
      "d": 2,
      "q": "Mia uses a calculator to find log₃ 50. What is the value, to 2 decimal places?",
      "opts": ["3.56", "0.28", "1.70", "16.67"],
      "why": "log₃ 50 = log 50 ÷ log 3 = 1.6990 ÷ 0.4771 = 3.56. The value 0.28 comes from dividing the wrong way round. Check: 3³ = 27 and 3⁴ = 81, and 50 lies between them.",
      "clue": "Which log goes on top, and which goes in the bottom?"
    }
  },
  "mat-solving-exponential-equations": {
    "title": "Solving exponential equations",
    "card": [
      "To solve an equation with x in the power, take logarithms of both sides. This brings the power down: 3ˣ = 20 becomes x log 3 = log 20.",
      "Then divide: x = log 20 ÷ log 3 ≈ 2.73. Use the same base on both sides. A calculator's log or ln button both work.",
      "When the base is e, use the natural log ln, because ln undoes eˣ. So eˣ = 5 gives x = ln 5 ≈ 1.61.",
      "Get the power on its own first. For 2 × 3ˣ = 40, divide both sides by 2 to get 3ˣ = 20, then take logarithms."
    ],
    "remember": "Isolate the power, take logs of both sides, then divide. Use ln for base e.",
    "a": {
      "q": "Solve 5ˣ = 40. Give x to 2 decimal places.",
      "opts": ["2.29", "8.00", "0.44", "3.69"],
      "why": "Taking logs gives x log 5 = log 40, so x = log 40 ÷ log 5 ≈ 2.29. Dividing 40 by 5 to get 8 is tempting, but that treats 5ˣ as 5 × x, and it is not.",
      "clue": "Bring the power down with logs, then divide the two log values."
    },
    "b": {
      "d": 2,
      "q": "Solve 2eˣ = 14. Give x to 2 decimal places.",
      "opts": ["1.95", "2.64", "1.32", "2.48"],
      "why": "Divide both sides by 2 to get eˣ = 7, so x = ln 7 ≈ 1.95. Taking ln 14 straight away gives 2.64, which skips the step of getting eˣ alone, so it is wrong.",
      "clue": "Get eˣ on its own before you use ln."
    }
  },
  "mat-graphs-logarithmic-functions": {
    "title": "Graphs of logarithmic functions",
    "card": [
      "The graph of y = log_a(x) is the reflection of y = aˣ in the line y = x. Swapping x and y turns each point (p, q) on one graph into (q, p) on the other.",
      "The y-intercept of y = aˣ is (0, 1), so y = log_a(x) passes through (1, 0). It has no y-intercept.",
      "The horizontal asymptote y = 0 of y = aˣ becomes a vertical asymptote x = 0. The graph only exists for x > 0, because a positive base raised to any power never gives zero or a negative number.",
      "Example: 2³ = 8 puts (3, 8) on y = 2ˣ, so (8, 3) is on y = log₂(x). For a > 1 the graph rises. Its gradient is steep near x = 0 and flattens as x grows."
    ],
    "remember": "Swap the coordinates of y = aˣ to get the log graph: through (1, 0), with a vertical asymptote at x = 0.",
    "a": {
      "q": "Which point lies on the graph of y = log₃(x)?",
      "opts": ["(9, 2)", "(2, 9)", "(0, 1)", "(3, 0)"],
      "why": "3² = 9, so log₃ 9 = 2 and (9, 2) is on the graph. (2, 9) lies on y = 3ˣ itself. Reflecting it in y = x swaps the coordinates and gives (9, 2) on y = log₃(x).",
      "clue": "Find a point on y = 3ˣ, then swap its coordinates."
    },
    "b": {
      "d": 3,
      "q": "Which statement about the graph of y = log₂(x) is correct?",
      "opts": [
        "It has a vertical asymptote at x = 0",
        "It has a horizontal asymptote at y = 0",
        "It has a y-intercept at (0, 1)",
        "It is defined for all real values of x"
      ],
      "why": "The horizontal asymptote y = 0 of y = 2ˣ reflects into the vertical line x = 0. A horizontal asymptote at y = 0 and a y-intercept at (0, 1) are features of y = 2ˣ, not of the log graph, which passes through (1, 0) and exists only for x > 0.",
      "clue": "Reflecting in y = x swaps x and y, so a horizontal line becomes a vertical line."
    }
  },
  "mat-sample-spaces-probability": {
    "title": "Sample spaces and probability",
    "card": [
      "A sample space is the list of all possible outcomes of an experiment. Rolling one die gives {1, 2, 3, 4, 5, 6}.",
      "An event is a set of outcomes we care about, such as rolling an even number: {2, 4, 6}.",
      "If all outcomes are equally likely, P(event) = number of favourable outcomes ÷ total number of outcomes. For an even number, P = 3/6 = 1/2.",
      "Every probability is between 0 and 1. An impossible event has probability 0 and a certain event has probability 1."
    ],
    "remember": "List equally likely outcomes, count the ones you want, then divide by the total.",
    "a": {
      "q": "A fair die is rolled once. What is the probability of rolling a number greater than 4?",
      "opts": ["1/3", "1/6", "2/3", "5/6"],
      "why": "The favourable outcomes are 5 and 6, so there are 2 out of 6 outcomes, and 2/6 = 1/3. The option 1/6 is tempting, but it counts only one outcome, forgetting that 6 is also greater than 4.",
      "clue": "Count the outcomes that are above 4, not including 4."
    },
    "b": {
      "d": 3,
      "q": "Two fair coins are tossed. What is the probability of getting exactly one head?",
      "opts": ["1/2", "1/3", "1/4", "3/4"],
      "why": "The sample space is {HH, HT, TH, TT}, which has 4 equally likely outcomes. Exactly one head happens in HT and TH, so P = 2/4 = 1/2. The answer 1/3 comes from wrongly listing only 3 outcomes: 2 heads, 1 head, 0 heads. These are not equally likely.",
      "clue": "List the outcomes in order, so HT and TH are different."
    }
  },
  "mat-venn-diagrams-set-notation": {
    "title": "Venn diagrams and set notation",
    "card": [
      ["Union", "A ∪ B means in A, or in B, or in both. On a Venn diagram it is everything inside either circle."],
      ["Intersection", "A ∩ B means in both A and B. On a Venn diagram it is the overlap of the two circles."],
      ["Complement", "A′ means not in A. On a Venn diagram it is everything outside the circle for A."],
      "Adding P(A) and P(B) counts the overlap twice, so subtract it once: P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Example: P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.2 give P(A ∪ B) = 0.5 + 0.4 − 0.2 = 0.7."
    ],
    "remember": "Union is either or both. Subtract the overlap once so it is not counted twice.",
    "a": {
      "q": "In a Year 11 class, P(A) = 0.6, P(B) = 0.3 and P(A ∩ B) = 0.1. What is P(A ∪ B)?",
      "opts": ["0.8", "0.9", "0.7", "0.6"],
      "why": "P(A ∪ B) = 0.6 + 0.3 − 0.1 = 0.8. The answer 0.9 comes from adding without subtracting the overlap, which counts the overlap twice.",
      "clue": "Subtract the overlap once."
    },
    "b": {
      "d": 3,
      "q": "At a school, 40% of students play netball (N) and 25% play tennis (T). 10% play both. What is the probability a student plays neither sport?",
      "opts": ["0.45", "0.55", "0.35", "0.65"],
      "why": "P(N ∪ T) = 0.40 + 0.25 − 0.10 = 0.55. Neither is the complement of the union, so 1 − 0.55 = 0.45. The answer 0.55 is wrong because it is the probability of playing at least one sport.",
      "clue": "Find the union first, then take its complement."
    }
  },
  "mat-conditional-probability": {
    "title": "Conditional probability",
    "card": [
      "P(A | B) is the probability of A given that B has happened. Knowing B has happened shrinks the sample space to just the outcomes in B.",
      "Formula: P(A | B) = P(A ∩ B)/P(B). The bottom is the event we are given. The top is the part of it that is also A.",
      "From a table, P(A | B) = (number in both A and B) ÷ (number in B). Use only the row or column for B as the total.",
      "Example: in a class of 30, 12 play netball, and 8 of those 12 also play tennis. P(tennis | netball) = 8/12 = 2/3. The total is 12, not 30."
    ],
    "remember": "Given B means B is the new total. Divide by P(B), not by everything.",
    "a": {
      "q": "In a group, P(A ∩ B) = 0.2 and P(B) = 0.5. What is P(A | B)?",
      "opts": ["0.4", "0.1", "0.7", "2.5"],
      "why": "P(A | B) = P(A ∩ B) ÷ P(B) = 0.2 ÷ 0.5 = 0.4. Multiplying gives 0.1, but the formula divides by the probability of the given event.",
      "clue": "The event after the bar goes on the bottom."
    },
    "b": {
      "d": 3,
      "q": "Of 40 students at a school camp, 25 chose kayaking and 10 of those also chose archery. 5 chose only archery. A student who chose archery is picked. What is the probability they also chose kayaking?",
      "opts": ["2/3", "1/4", "2/5", "3/8"],
      "why": "Archery has 10 + 5 = 15 students, and 10 of them chose kayaking, so the probability is 10/15 = 2/3. The option 2/5 is 10/25, which divides by the kayakers and so reverses the condition. The given event is archery, so it goes on the bottom.",
      "clue": "Find the total number who chose archery first."
    }
  },
  "mat-independent-events": {
    "title": "Independent events",
    "card": [
      "Two events are independent if knowing that one happened does not change the probability of the other. Flipping a coin and rolling a die are independent.",
      "For independent events A and B, P(A ∩ B) = P(A) × P(B). This means both happen.",
      "Example: P(heads) = 1/2 and P(roll a 6) = 1/6. P(heads and a 6) = 1/2 × 1/6 = 1/12.",
      "To test for independence, check whether P(A ∩ B) equals P(A) × P(B). If it does, the events are independent. If it does not, they are not."
    ],
    "remember": "Independent events: multiply the probabilities to find P(A ∩ B).",
    "a": {
      "q": "A and B are independent events with P(A) = 0.4 and P(B) = 0.5. What is P(A ∩ B)?",
      "opts": ["0.2", "0.9", "0.1", "0.8"],
      "why": "For independent events, P(A ∩ B) = 0.4 × 0.5 = 0.2. Adding gives 0.9, which is the mistake of using the wrong operation and would not be a probability of both happening.",
      "clue": "Both events happen, and the events are independent."
    },
    "b": {
      "d": 3,
      "q": "For events A and B, P(A) = 0.5, P(B) = 0.4 and P(A ∩ B) = 0.3. Which statement is correct?",
      "opts": [
        "Not independent, as 0.5 × 0.4 = 0.2, not 0.3",
        "Independent, as 0.3 is between 0 and 1",
        "Independent, as 0.5 + 0.4 is more than 0.3",
        "Not independent, as 0.3 is less than P(A)"
      ],
      "why": "Independent events need P(A ∩ B) = P(A) × P(B). Here 0.5 × 0.4 = 0.2, which is not 0.3, so the events are not independent. Being a valid probability between 0 and 1 does not test independence.",
      "clue": "Multiply P(A) and P(B), then compare with P(A ∩ B)."
    }
  },
  "mat-multi-stage-experiments": {
    "title": "Multi-stage experiments",
    "card": [
      "A multi-stage experiment has two or more steps, such as drawing two counters or rolling a die twice. A tree diagram shows each stage as a set of branches, with the probability written on each branch.",
      "To find the probability of one path, multiply along its branches. To find the probability of an outcome that can happen by more than one path, add the path probabilities.",
      ["With replacement", "the item is put back, so the second stage has the same probabilities as the first."],
      [
        "Without replacement",
        "the item is kept out, so the total and possibly the favourable count drop by 1 at the second stage. Example: a bag has 3 red and 2 blue counters. Two are drawn without replacement. P(both red) = 3/5 × 2/4 = 6/20 = 3/10."
      ]
    ],
    "remember": "Multiply along a path, add across paths, and check whether the second stage has changed.",
    "a": {
      "q": "A bag has 4 red and 6 blue counters. Two are drawn without replacement. What is P(both red)?",
      "opts": ["2/15", "4/25", "2/5", "1/3"],
      "why": "The first draw gives 4/10. With one red gone, the second gives 3/9. So P = 4/10 × 3/9 = 12/90 = 2/15. The option 4/25 comes from 4/10 × 4/10, which wrongly puts the counter back.",
      "clue": "After the first draw, both the reds and the total change."
    },
    "b": {
      "d": 3,
      "q": "A box has 3 green and 2 yellow balls. Two are drawn without replacement. What is P(exactly one green)?",
      "opts": ["3/5", "3/10", "12/25", "6/25"],
      "why": "Two paths work: green then yellow is 3/5 × 2/4 = 3/10, and yellow then green is 2/5 × 3/4 = 3/10. Add them: 3/10 + 3/10 = 3/5. The option 12/25 comes from using replacement, where the answer is 2 × 3/5 × 2/5.",
      "clue": "Find both orders, then add them."
    }
  },
  "mat-types-data": {
    "title": "Types of data",
    "card": [
      [
        "Categorical",
        "data sorted into groups or labels. Nominal data has no natural order, such as eye colour. Ordinal data has a natural order, such as shirt size (small, medium, large)."
      ],
      [
        "Numerical",
        "data that is a count or a measurement. Discrete data is counted and takes separate values, such as the number of pets. Continuous data is measured and can take any value in a range, such as height."
      ],
      "A quick test: if you can do sensible arithmetic with the values, the data is numerical. Postcodes are numbers, but adding them means nothing, so they are categorical.",
      "Categorical data suits a bar chart or sector graph. Numerical data suits a histogram or dot plot. A histogram is best for continuous data."
    ],
    "remember": "Categories name groups. Numbers count or measure. Work out the type before you choose a display.",
    "a": {
      "q": "Students in a Year 11 class record the number of siblings each of them has. What type of data is this?",
      "opts": ["Numerical, discrete", "Numerical, continuous", "Categorical, nominal", "Categorical, ordinal"],
      "why": "Siblings are counted, so the data is numerical and takes separate values: discrete. It is not continuous, because nobody has 1.5 siblings.",
      "clue": "Is it counted or measured?"
    },
    "b": {
      "d": 3,
      "q": "A café in Orange asks customers to rate its service as poor, fair, good or excellent. What type of data is this, and which display suits it?",
      "opts": [
        "Ordinal, and a bar chart",
        "Nominal, and a bar chart",
        "Ordinal, and a histogram",
        "Discrete, and a histogram"
      ],
      "why": "The ratings are labels with a natural order, so the data is categorical and ordinal. Categorical data suits a bar chart. Nominal is wrong because the order of the ratings matters.",
      "clue": "Could you do sensible arithmetic with these ratings?"
    }
  },
  "mat-measures-centre": {
    "title": "Measures of centre",
    "card": [
      ["Mean", "Add all the values, then divide by how many there are. Every value affects the mean."],
      [
        "Median",
        "The middle value when the data is in order. With an even number of values, it is the mean of the two middle values."
      ],
      ["Mode", "The value that occurs most often. If no value repeats, there is no mode."],
      [
        "Outliers",
        "An outlier is a value far from the rest. It pulls the mean towards it, but the median barely moves. So the median is a better centre for skewed data or data with outliers. Example: 2, 3, 4, 5, 36 has mean 10 and median 4."
      ]
    ],
    "remember": "Extreme values pull the mean but barely move the median, so the median suits skewed data.",
    "a": {
      "q": "What is the median of the data set 7, 3, 9, 4, 12, 5?",
      "opts": ["6", "6.5", "6.7", "5"],
      "why": "In order the data is 3, 4, 5, 7, 9, 12. There are six values, so the median is the mean of 5 and 7, which is 6. Taking 9 and 4 from the unordered list gives 6.5, which is wrong because the values were not put in order first.",
      "clue": "Put the values in order first."
    },
    "b": {
      "d": 3,
      "q": "Five workers at a small firm in Ballarat earn $50 000, $52 000, $54 000, $56 000 and $288 000. Which statement is correct?",
      "opts": [
        "The median of $54 000 describes a typical worker better",
        "The mean of $100 000 describes a typical worker better",
        "The mean and median are equal, so either one works",
        "The mode of $50 000 is the best centre, as it is lowest"
      ],
      "why": "The $288 000 value is an outlier. It pulls the mean up to $100 000 (500 000 ÷ 5), which is more than four of the five workers earn. The median of $54 000 barely moves because of the outlier, so it is a better centre, and no value repeats, so there is no mode.",
      "clue": "Which value is far from the rest, and which measure does it pull?"
    }
  },
  "mat-measures-spread": {
    "title": "Measures of spread",
    "card": [
      ["Range", "Highest value − lowest value. It uses only two values, so one extreme value can change it a lot."],
      [
        "IQR",
        "The interquartile range is Q3 − Q1. It is the spread of the middle half of the data. Q1 is the median of the lower half and Q3 is the median of the upper half. For 2, 4, 5, 7, 8, 10, 12, 15: Q1 = 4.5, Q3 = 11, so IQR = 6.5."
      ],
      [
        "Standard deviation",
        "This is the typical distance of the values from the mean. It uses every value, so an extreme value affects it. A calculator finds it."
      ],
      "For all three, a larger number means the data is more spread out. An extreme value changes the range and standard deviation more than it changes the IQR."
    ],
    "remember": "Bigger spread number, more spread out data. The IQR looks only at the middle half.",
    "a": {
      "q": "What is the IQR of 4, 6, 7, 9, 10, 12, 15, 18?",
      "opts": ["7", "14", "13.5", "6.5"],
      "why": "The lower half is 4, 6, 7, 9, so Q1 = 6.5. The upper half is 10, 12, 15, 18, so Q3 = 13.5. IQR = 13.5 − 6.5 = 7. The value 14 is tempting, but that is the range, not the IQR.",
      "clue": "Find Q1 and Q3 first, then subtract."
    },
    "b": {
      "d": 3,
      "q": "Mia records the daily customers at her stall for a month. One day a festival brings in a huge crowd. Which measure of spread changes least because of that day?",
      "opts": ["The interquartile range", "The range", "The standard deviation", "All three change by the same amount"],
      "why": "The IQR looks only at the middle half of the data, so one very large value changes it little. The range depends on the highest value, so it jumps. The standard deviation uses every value, so it rises too.",
      "clue": "Think about which values each measure actually uses."
    }
  },
  "mat-shape-distribution": {
    "title": "Shape of a distribution",
    "card": [
      ["Symmetric", "The two sides of the display mirror each other, with the mean and median close together."],
      [
        "Positively skewed",
        "The tail stretches to the right, towards the larger values. Most data sits at the low end."
      ],
      [
        "Negatively skewed",
        "The tail stretches to the left, towards the smaller values. Most data sits at the high end."
      ],
      [
        "1.5 × IQR rule",
        "Fences: lower = Q1 − 1.5 × IQR and upper = Q3 + 1.5 × IQR. A value outside the fences is an outlier. Example: Q1 = 10 and Q3 = 18, so IQR = 8 and 1.5 × 8 = 12. The fences are 10 − 12 = −2 and 18 + 12 = 30, so a value of 34 is an outlier."
      ]
    ],
    "remember": "The tail names the skew. Outliers lie more than 1.5 × IQR beyond Q1 or Q3.",
    "a": {
      "q": "A histogram of house prices has most values at the low end and a long tail stretching to the right. How is it described?",
      "opts": ["Positively skewed", "Negatively skewed", "Symmetric", "Uniform with no outliers"],
      "why": "The tail points towards the larger values, so the data is positively skewed. Negatively skewed is tempting because most values are at the low end, but skew is named by the direction of the tail, not by where most data sits.",
      "clue": "Skew is named by the direction of the tail."
    },
    "b": {
      "d": 3,
      "q": "A data set has Q1 = 22 and Q3 = 30. Which value is an outlier by the 1.5 × IQR rule?",
      "opts": ["43", "41", "12", "11"],
      "why": "IQR = 30 − 22 = 8, and 1.5 × 8 = 12, so the fences are 22 − 12 = 10 and 30 + 12 = 42. Only 43 lies outside the fences. 41 is tempting, but it is below the upper fence of 42, and 11 and 12 are both above the lower fence of 10.",
      "clue": "Find both fences, then check which value lies outside them."
    }
  },
  "mat-combining-transformations": {
    "title": "Combining transformations",
    "card": [
      "In y = kf(a(x + b)) + c, the numbers a and b change x. The numbers k and c change y. A negative a reflects in the y-axis. A negative k reflects in the x-axis.",
      "Do dilations and reflections first, then translations. A point (x, y) on y = f(x) moves to (x/a − b, ky + c).",
      "The x-coordinate is divided by a, not multiplied. Then b is taken away, so x + b shifts the graph left by b.",
      "Example: (6, 3) is on y = f(x). On y = 2f(3(x − 1)) + 4, x becomes 6 ÷ 3 = 2, then 2 + 1 = 3. y becomes 2 × 3 = 6, then 6 + 4 = 10. The new point is (3, 10)."
    ],
    "remember": "Dilate and reflect first, then translate. The x-coordinate is divided by a.",
    "a": {
      "q": "The point (4, −2) is on y = f(x). What is its image on y = −f(2x) + 1?",
      "opts": ["(2, 3)", "(8, 3)", "(2, −1)", "(2, 1)"],
      "why": "x becomes 4 ÷ 2 = 2. For y, reflect first to get 2, then add 1 to get 3. (2, 1) is wrong because it adds 1 before reflecting, which is the wrong order.",
      "clue": "Reflect and dilate before you translate."
    },
    "b": {
      "d": 3,
      "q": "The point (6, 2) is on y = f(x). What is its image on y = 3f(½(x + 1)) − 4?",
      "opts": ["(11, 2)", "(13, 2)", "(2, 2)", "(11, −6)"],
      "why": "Dividing x by ½ gives 12. Then x + 1 shifts the graph left by 1, so x becomes 11. For y, 3 × 2 = 6, then 6 − 4 = 2. (13, 2) is wrong because it shifts right instead of left.",
      "clue": "Dividing by ½ is the same as doubling, and + 1 inside the bracket moves left."
    }
  },
  "mat-transforming-trigonometric-graphs": {
    "title": "Transforming trigonometric graphs",
    "card": [
      "In y = k sin(a(x + b)) + c, each letter changes the graph of y = sin x in one way. Use the form with a(x + b) so that b is read straight off.",
      [
        "Amplitude and period",
        "The amplitude is |k|, the distance from the centre line to a peak. The period is 2π/a (with a > 0), the length of one full cycle."
      ],
      [
        "Shift and centre line",
        "b is the horizontal shift: the graph moves left by b, so x + b with b = π/6 means a shift left by π/6. c is the vertical shift, and the centre line is y = c."
      ],
      [
        "Example",
        "y = 3 sin(2(x − π/4)) + 1 has amplitude 3, period 2π/2 = π, a shift right by π/4 and centre line y = 1. Its maximum is 1 + 3 = 4 and its minimum is 1 − 3 = −2."
      ]
    ],
    "remember": "Amplitude |k| is centre line to peak, period is 2π/a, x + b moves the graph left by b, and y = c is the centre line.",
    "a": {
      "q": "What is the period of y = 5 sin(4x) + 2?",
      "opts": ["π/2", "8π", "2/π", "π/4"],
      "why": "The period is 2π/a with a = 4, so 2π/4 = π/2. The 5 changes the amplitude and the 2 moves the centre line, so neither changes the period. Multiplying 2π by 4 gives 8π, and dividing 4 by 2π gives 2/π, which both use the formula the wrong way.",
      "clue": "Use 2π divided by the number multiplying x."
    },
    "b": {
      "d": 3,
      "q": "What are the maximum and minimum values of y = 2 sin(3(x + π/6)) − 4?",
      "opts": ["Maximum −2, minimum −6", "Maximum −1, minimum −7", "Maximum 2, minimum −2", "Maximum 6, minimum 2"],
      "why": "The amplitude is 2 and the centre line is y = −4, so the maximum is −4 + 2 = −2 and the minimum is −4 − 2 = −6. Using 3 as the amplitude gives −1 and −7, but 3 only sets the period, and the shift does not change the heights. Ignoring the −4 gives 2 and −2.",
      "clue": "Go up and down from the centre line by the amplitude."
    }
  },
  "mat-modelling-with-functions": {
    "title": "Modelling with functions",
    "card": [
      [
        "Linear",
        "y = mx + c. The value changes by the same amount each step. m is the rate of change and c is the starting value."
      ],
      [
        "Quadratic",
        "y = ax² + bx + c. The graph has one turning point, so it suits a rise then a fall, such as a ball thrown in the air."
      ],
      [
        "Exponential",
        "y = A × rˣ: A is the starting value and each step multiplies by r, so r > 1 grows and 0 < r < 1 decays. In P = 300 × 0.9ᵗ, each step keeps 90%, so 10% is lost."
      ],
      [
        "Trigonometric",
        "A sine or cosine model repeats the same cycle over and over, so it suits things that rise and fall regularly, such as tides or daylight hours."
      ]
    ],
    "remember": "Same amount added: linear. Same factor multiplied: exponential. One turning point: quadratic. Repeating cycle: trigonometric.",
    "a": {
      "q": "A town has 2000 people. Its population grows by 5% each year. Which model suits this best?",
      "opts": [
        "Exponential, P = 2000 × 1.05ᵗ",
        "Linear, P = 2000 + 5t",
        "Quadratic, P = 2000 + 5t²",
        "Trigonometric, P = 2000 sin(5t)"
      ],
      "why": "A 5% rise each year means multiplying by the same factor, 1.05, every year. That is exponential. A linear model adds the same number of people each year, which is not what a percentage rise does.",
      "clue": "Is the same amount added, or the same factor multiplied?"
    },
    "b": {
      "d": 3,
      "q": "A car's value is V = 30000 × 0.85ᵗ dollars, where t is years. What does 0.85 tell you?",
      "opts": [
        "It loses 15% of its value each year",
        "It loses 85% of its value each year",
        "It loses $0.85 of its value each year",
        "It keeps 15% of its value each year"
      ],
      "why": "Multiplying by 0.85 means the car keeps 85% of its value each year, so it loses 100% − 85% = 15%. Losing 85% each year would need a factor of 0.15, not 0.85.",
      "clue": "Multiplying by 0.85 keeps what share of the value?"
    }
  },
  "mat-finding-rule-from-graph": {
    "title": "Finding a rule from a graph",
    "card": [
      "Match the graph to a family first: a U or upside-down U shape is a quadratic, and a wave is a sine or cosine. Then use the graph's features to find each number.",
      [
        "Quadratic",
        "With turning point (h, k), use y = a(x − h)² + k, then put one other point in to find a. A negative a gives an upside-down U."
      ],
      [
        "Sine wave",
        "In y = A sin(nx) + c, the centre line is c = (max + min) ÷ 2 and the amplitude is A = (max − min) ÷ 2. The period is 2π/n, so n = 2π ÷ period."
      ],
      "Example: a parabola has turning point (2, −3) and passes through (0, 1). Then y = a(x − 2)² − 3. Put in x = 0, y = 1: 1 = 4a − 3, so a = 1. The rule is y = (x − 2)² − 3."
    ],
    "remember": "Read the turning point or the max, min and period off the graph, then use one more point to finish the rule.",
    "a": {
      "q": "A parabola has turning point (1, 5) and passes through (3, 1). Which rule fits it?",
      "opts": ["y = −(x − 1)² + 5", "y = (x − 1)² + 5", "y = −(x + 1)² + 5", "y = −(x − 1)² − 5"],
      "why": "Start with y = a(x − 1)² + 5. Put in (3, 1): 1 = 4a + 5, so a = −1. The option with (x + 1) has the sign of the horizontal shift wrong, because the turning point is at x = 1.",
      "clue": "Use the turning point first, then put in the other point to find a."
    },
    "b": {
      "d": 3,
      "q": "A sine wave has a maximum of 7, a minimum of −1 and a period of π. Which rule fits it?",
      "opts": ["y = 4 sin(2x) + 3", "y = 4 sin(x) + 3", "y = 8 sin(2x) + 3", "y = 4 sin(2x) + 7"],
      "why": "Amplitude = (7 − (−1)) ÷ 2 = 4 and centre line = (7 + (−1)) ÷ 2 = 3. Also n = 2π ÷ π = 2. The option with 8 uses the full height from min to max, which is double the amplitude.",
      "clue": "Half the gap between max and min is the amplitude. Midway between them is the centre line."
    }
  },
  "mat-arithmetic-sequences": {
    "title": "Arithmetic sequences",
    "card": [
      "An arithmetic sequence goes up or down by the same amount each time. That amount is the common difference, d. Find it by subtracting a term from the next one.",
      "d is positive when the terms rise and negative when they fall. In 20, 17, 14, 11, d = 17 − 20 = −3.",
      "Call the first term a. The nth term is Tₙ = a + (n − 1)d. To reach term n, start at a and add d a total of (n − 1) times.",
      "Example: for 5, 9, 13, ... we have a = 5 and d = 4. The 10th term is 5 + (10 − 1) × 4 = 5 + 36 = 41."
    ],
    "remember": "Tₙ = a + (n − 1)d: term n is (n − 1) steps of d away from a.",
    "a": {
      "q": "What is the 8th term of the sequence 3, 7, 11, 15, ...?",
      "opts": ["31", "35", "32", "27"],
      "why": "Here a = 3 and d = 4, so T₈ = 3 + (8 − 1) × 4 = 3 + 28 = 31. The tempting answer 35 comes from adding d eight times instead of seven, which is 3 + 8 × 4 = 35.",
      "clue": "From the first term, d is added one fewer time than the term number."
    },
    "b": {
      "d": 3,
      "q": "Priya has $90 set aside for a trip in week 1. Each week after that, the amount falls by $6 as she pays bus fares. How much does she have in week 12?",
      "opts": ["$24", "$18", "$30", "$156"],
      "why": "This is arithmetic with a = 90 and d = −6, so T₁₂ = 90 + (12 − 1) × (−6) = 90 − 66 = 24. The answer $18 comes from using 12 differences instead of 11. The answer $156 comes from using +6 instead of −6.",
      "clue": "The amount falls, so d is negative. Count the steps from week 1 to week 12."
    }
  },
  "mat-arithmetic-series": {
    "title": "Arithmetic series",
    "card": [
      "An arithmetic series is the sum of the terms of an arithmetic sequence. Here a is the first term, d is the common difference and n is the number of terms.",
      ["Formula 1", "Sₙ = n/2 × (2a + (n − 1)d). Use it when you know a, d and n."],
      ["Formula 2", "Sₙ = n/2 × (first + last). Use it when you know the first and last terms and n."],
      [
        "Example",
        "Add 3 + 7 + 11 + ... for 10 terms. Here a = 3, d = 4 and n = 10. S₁₀ = 10/2 × (2×3 + 9×4) = 5 × 42 = 210."
      ]
    ],
    "remember": "Sum = half the number of terms × (first + last), and the last term is a + (n − 1)d.",
    "a": {
      "q": "What is the sum of the first 8 terms of 5 + 8 + 11 + ...?",
      "opts": ["124", "136", "248", "26"],
      "why": "Here a = 5, d = 3 and n = 8. S₈ = 8/2 × (2×5 + 7×3) = 4 × 31 = 124. The answer 248 comes from forgetting to halve n, which is the tempting mistake.",
      "clue": "Find 2a + (n − 1)d first, then multiply by n/2."
    },
    "b": {
      "d": 3,
      "q": "Mia saves $10 in week 1, then $14 in week 2, and so on, adding $4 more each week. She does this for 12 weeks. How much has she saved in total?",
      "opts": ["$384", "$408", "$768", "$330"],
      "why": "Here a = 10, d = 4 and n = 12. The last term is 10 + 11×4 = 54, so S₁₂ = 12/2 × (10 + 54) = 6 × 64 = 384. The answer $408 uses 12×4 for the last term, giving 58 instead of 54.",
      "clue": "Count the weeks as n, then find the last week's saving first."
    }
  },
  "mat-geometric-sequences": {
    "title": "Geometric sequences",
    "card": [
      "In a geometric sequence, each term is found by multiplying the one before it by the same number. That number is the common ratio, r.",
      "To find r, divide any term by the term before it. For 3, 6, 12, 24, r = 6 ÷ 3 = 2. The ratio can be negative or a fraction.",
      "The first term is a. The nth term is Tₙ = arⁿ⁻¹. The power is n − 1, because the first term has not been multiplied by r yet.",
      "For example, in 5, 10, 20, ..., a = 5 and r = 2. The 6th term is 5 × 2⁵ = 5 × 32 = 160."
    ],
    "remember": "Divide to find r, then use Tₙ = arⁿ⁻¹ with the power n − 1.",
    "a": {
      "q": "A geometric sequence is 2, 6, 18, 54, ... What is the 7th term?",
      "opts": ["1458", "4374", "729", "12"],
      "why": "Here a = 2 and r = 6 ÷ 2 = 3. T₇ = 2 × 3⁶ = 2 × 729 = 1458. Using 3⁷ gives 4374, which is the 8th term, because the power must be n − 1.",
      "clue": "Find r first, then check the power on r."
    },
    "b": {
      "d": 3,
      "q": "A geometric sequence is 400, −200, 100, ... What is the 5th term?",
      "opts": ["25", "−25", "−50", "12.5"],
      "why": "Here a = 400 and r = −200 ÷ 400 = −1/2. T₅ = 400 × (−1/2)⁴ = 400 × 1/16 = 25. Treating it as −(1/2)⁴ gives −25, but the negative sign is part of r, so it is raised to the power too. The value −50 is only the 4th term.",
      "clue": "Count how many times r has been applied by the 5th term."
    }
  },
  "mat-geometric-series": {
    "title": "Geometric series",
    "card": [
      "A geometric series is the sum of the terms of a geometric sequence. Each term is the one before it multiplied by a common ratio r.",
      "The sum of the first n terms is Sₙ = a(rⁿ − 1)/(r − 1), where a is the first term. This works for any r except 1.",
      "Steps: find a and r, count the terms n, then put them in the formula. Work out rⁿ before you subtract 1.",
      "Example: 3 + 6 + 12 + 24 + 48 has a = 3, r = 2 and n = 5. S₅ = 3(2⁵ − 1)/(2 − 1) = 3 × 31 ÷ 1 = 93."
    ],
    "remember": "Find a, r and n, then use Sₙ = a(rⁿ − 1)/(r − 1).",
    "a": {
      "q": "What is the sum of the first 4 terms of the geometric series 2 + 6 + 18 + ...?",
      "opts": ["80", "728", "26", "160"],
      "why": "Here a = 2, r = 3 and n = 4. S₄ = 2(3⁴ − 1)/(3 − 1) = 2 × 80 ÷ 2 = 80. The option 160 comes from forgetting to divide by r − 1.",
      "clue": "Find r by dividing a term by the one before it."
    },
    "b": {
      "d": 3,
      "q": "Mia saves $5 in week 1. Each week after that she saves double the week before. How much has she saved in total after 6 weeks?",
      "opts": ["$315", "$630", "$160", "$310"],
      "why": "The savings form a geometric series with a = 5, r = 2 and n = 6. S₆ = 5(2⁶ − 1)/(2 − 1) = 5 × 63 = 315. The option $160 is only the amount saved in week 6, not the total.",
      "clue": "The total is a sum of 6 terms, not the 6th term."
    }
  },
  "mat-limiting-sums": {
    "title": "Limiting sums",
    "card": [
      "A geometric series adds terms that multiply by a common ratio r each time. If r is between -1 and 1, the terms shrink towards 0.",
      "When -1 < r < 1, the sum of the first n terms gets closer and closer to one number as n grows. This number is the limiting sum: S = a/(1 - r), where a is the first term.",
      "If r is 1 or more, or -1 or less, the terms do not shrink to 0. The sum does not settle on a number, so there is no limiting sum.",
      "Example: 12 + 6 + 3 + ... has a = 12 and r = 6/12 = 1/2. This is between -1 and 1, so S = 12 ÷ (1 - 1/2) = 12 ÷ 1/2 = 24."
    ],
    "remember": "Check r first. If -1 < r < 1, use S = a/(1 - r). If not, there is no limiting sum.",
    "a": {
      "q": "A geometric series has first term 18 and common ratio 1/3. What is its limiting sum?",
      "opts": ["27", "54", "6", "13.5"],
      "why": "Here -1 < r < 1, so S = 18 ÷ (1 - 1/3) = 18 ÷ 2/3 = 27. Using 18 ÷ 1/3 = 54 is tempting, but it forgets to subtract r from 1 first.",
      "clue": "Work out 1 - r before you divide."
    },
    "b": {
      "d": 3,
      "q": "Which of these geometric series has a limiting sum?",
      "opts": [
        "8 - 4 + 2 - 1 + ... (r = -1/2)",
        "3 + 6 + 12 + 24 + ... (r = 2)",
        "5 - 5 + 5 - 5 + ... (r = -1)",
        "2 + 2.2 + 2.42 + ... (r = 1.1)"
      ],
      "why": "8 - 4 + 2 - 1 has r = -4/8 = -1/2, which is between -1 and 1, so it has a limiting sum (16/3). The negative sign does not stop it. The others have r = 2, r = -1 and r = 1.1, and none of these is between -1 and 1.",
      "clue": "Check each r. A negative r can still work."
    }
  },
  "mat-sigma-notation": {
    "title": "Sigma notation",
    "card": [
      "The symbol Σ means \"add up\". It is a short way to write a sum of many terms.",
      "The counter, such as k, is written below Σ with its first value, like k = 1. The last value is written above Σ. The first value does not have to be 1.",
      "The rule to the right of Σ gives each term. Put in each value of the counter, from first to last, then add. The number of terms is last − first + 1.",
      "Example: the sum from k = 1 to 4 of (2k + 1) = (2×1 + 1) + (2×2 + 1) + (2×3 + 1) + (2×4 + 1) = 3 + 5 + 7 + 9 = 24."
    ],
    "remember": "Put in each counter value from first to last, then add the terms.",
    "a": {
      "q": "What is the sum from k = 1 to 3 of (k² + 1)?",
      "opts": ["17", "14", "15", "9"],
      "why": "The terms are (1 + 1) + (4 + 1) + (9 + 1) = 2 + 5 + 10 = 17. The answer 14 comes from adding 1² + 2² + 3² and forgetting the + 1 in each term.",
      "clue": "Put k = 1, 2 and 3 into the rule, then add."
    },
    "b": {
      "d": 3,
      "q": "What is the sum from n = 2 to 5 of (3n − 1)?",
      "opts": ["38", "40", "26", "33"],
      "why": "Start at n = 2 and stop at n = 5: 5 + 8 + 11 + 14 = 38, which is 4 terms. The answer 40 comes from starting at n = 1, which adds an extra term of 2 that is not in the sum.",
      "clue": "Check where the counter starts, and count the terms."
    }
  },
  "mat-derivatives-trigonometric-functions": {
    "title": "Derivatives of trigonometric functions",
    "card": [
      "With x in radians: the derivative of sin x is cos x, of cos x is −sin x, and of tan x is sec²x. Here sec x means 1/cos x.",
      "If the angle is a function, use the chain rule. Differentiate the trig function, keep the inside the same, then multiply by the derivative of the inside.",
      "So d/dx [sin(f(x))] = f'(x) cos(f(x)), and d/dx [cos(f(x))] = −f'(x) sin(f(x)). For tan, d/dx [tan(f(x))] = f'(x) sec²(f(x)).",
      ["Example", "y = sin(3x). The inside is 3x, and its derivative is 3. So dy/dx = 3cos(3x)."]
    ],
    "remember": "Differentiate the trig function, keep the inside, then multiply by the derivative of the inside.",
    "a": {
      "q": "What is the derivative of cos(5x)?",
      "opts": ["−5sin(5x)", "5sin(5x)", "−sin(5x)", "−5cos(5x)"],
      "why": "The derivative of cos is −sin, and the inside 5x has derivative 5. So the answer is −5sin(5x). Leaving out the minus sign gives 5sin(5x), which is a common sign error.",
      "clue": "The derivative of cos has a minus sign, and the inside also adds a factor."
    },
    "b": {
      "d": 3,
      "q": "What is the gradient of y = tan(2x) at x = 0?",
      "opts": ["2", "0", "1", "1/2"],
      "why": "dy/dx = 2sec²(2x). At x = 0, sec²(0) = 1/cos²(0) = 1, so the gradient is 2 × 1 = 2. The answer 1 comes from forgetting to multiply by the derivative of 2x.",
      "clue": "Use the chain rule first, then put x = 0 into sec²."
    }
  },
  "mat-derivatives-exponentials-logarithms": {
    "title": "Derivatives of exponentials and logarithms",
    "card": [
      "The derivative of eˣ is eˣ. For a general power, use the chain rule: the derivative of e^f(x) is f'(x) × e^f(x).",
      "The derivative of ln x is 1/x. In general, the derivative of ln f(x) is f'(x)/f(x), which is the derivative of the inside divided by the inside.",
      "Example: for y = e^(3x²), the inside is 3x², with derivative 6x. So dy/dx = 6x × e^(3x²).",
      "Example: for y = ln(x² + 1), the inside is x² + 1, with derivative 2x. So dy/dx = 2x/(x² + 1)."
    ],
    "remember": "Find the derivative of the inside. Multiply it by e^f(x), or put it over f(x) for ln.",
    "a": {
      "q": "What is the derivative of e^(5x)?",
      "opts": ["5e^(5x)", "e^(5x)", "5x e^(5x−1)", "e^(5x)/5"],
      "why": "The inside is 5x, with derivative 5. So the derivative is 5 × e^(5x). Leaving out the 5 is tempting because eˣ is its own derivative, but the chain rule needs the derivative of the inside.",
      "clue": "Multiply by the derivative of the power."
    },
    "b": {
      "d": 3,
      "q": "Mia is given y = ln(x³ + 4x). What is dy/dx?",
      "opts": ["(3x² + 4)/(x³ + 4x)", "1/(x³ + 4x)", "(x³ + 4x)/(3x² + 4)", "(3x² + 4) ln(x³ + 4x)"],
      "why": "The inside is x³ + 4x, with derivative 3x² + 4. The derivative of ln f(x) is f'(x)/f(x), so the answer is (3x² + 4)/(x³ + 4x). Writing only 1/(x³ + 4x) skips the derivative of the inside.",
      "clue": "Put the derivative of the inside on top."
    }
  },
  "mat-stationary-points": {
    "title": "Stationary points",
    "card": [
      "A stationary point is where the gradient of the curve is zero. To find one, solve f'(x) = 0, then put each x value into f(x) to get the y value.",
      "To find its type, check the sign of f'(x) just before and just after the point, and record it in a table of gradients. Positive to zero to negative is a maximum. Negative to zero to positive is a minimum.",
      "If the gradient has the same sign on both sides, such as positive, zero, positive, the point is a horizontal point of inflection.",
      "Example: f(x) = x³ − 3x², so f'(x) = 3x² − 6x = 3x(x − 2) = 0 at x = 0 or 2. At x = −1, 1 and 3, f' is 9, −3 and 9, so (0, 0) is a maximum and (2, −4) is a minimum."
    ],
    "remember": "Solve f'(x) = 0, then test the gradient on each side to name the type.",
    "a": {
      "q": "A curve has f'(x) = 0 at x = 4. The gradient is negative just before x = 4 and positive just after. What type of stationary point is it?",
      "opts": ["A minimum", "A maximum", "A horizontal point of inflection", "Not a stationary point"],
      "why": "The gradient goes from negative to zero to positive, so the curve falls and then rises. That is a minimum. It is not a maximum, because a maximum has the gradient going from positive to negative.",
      "clue": "Picture the curve going down and then up."
    },
    "b": {
      "d": 3,
      "q": "For f(x) = x³ − 6x² + 9x, what is the stationary point at x = 3?",
      "opts": ["A minimum at (3, 0)", "A maximum at (3, 0)", "A minimum at (3, 9)", "A horizontal inflection at (3, 0)"],
      "why": "f'(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3), so f'(x) = 0 at x = 3. At x = 2, f' = −3, and at x = 4, f' = 9, so the gradient goes from negative to positive: a minimum. f(3) = 27 − 54 + 27 = 0, so the point is (3, 0), not (3, 9), which mixes up a gradient value with the y value.",
      "clue": "Test the gradient at x = 2 and x = 4, then find f(3)."
    }
  },
  "mat-second-derivative-concavity": {
    "title": "The second derivative and concavity",
    "card": [
      "The second derivative f''(x) is the derivative of f'(x). It tells you how the gradient is changing.",
      ["Concave up", "f''(x) > 0. The gradient is increasing and the curve bends upwards like a cup."],
      ["Concave down", "f''(x) < 0. The gradient is decreasing and the curve bends downwards like a cap."],
      "A point of inflection is where concavity changes, so f''(x) changes sign there. Example: f(x) = x³ has f'(x) = 3x² and f''(x) = 6x. This is negative for x < 0 and positive for x > 0, so the concavity changes at x = 0."
    ],
    "remember": "Sign of f''(x) gives the concavity. A change of sign gives a point of inflection.",
    "a": {
      "q": "For f(x) = x³ − 3x², f''(x) = 6x − 6. Where is the curve concave up?",
      "opts": ["x > 1", "x < 1", "x > 0", "x > 2"],
      "why": "The curve is concave up where 6x − 6 > 0, which gives x > 1. The option x < 1 is tempting, but there f''(x) is negative, so the curve is concave down.",
      "clue": "Solve f''(x) > 0."
    },
    "b": {
      "d": 3,
      "q": "f(x) = x⁴ has f''(x) = 12x². Which statement about the point (0, 0) is true?",
      "opts": [
        "Not an inflection point, as f''(x) does not change sign",
        "An inflection point, as f''(0) = 0",
        "An inflection point, as the curve is concave up",
        "Not an inflection point, as f''(x) is negative there"
      ],
      "why": "f''(x) = 12x² is positive on both sides of x = 0, so the concavity does not change and there is no point of inflection. The tempting option says f''(0) = 0 is enough, but the sign of f''(x) must change.",
      "clue": "Check the sign of f''(x) on each side of x = 0."
    }
  },
  "mat-curve-sketching-with-calculus": {
    "title": "Curve sketching with calculus",
    "card": [
      ["Intercepts", "Put x = 0 to find the y-intercept. Solve f(x) = 0 to find the x-intercepts."],
      [
        "Stationary points",
        "Solve f'(x) = 0 and find each y-value. The gradient either side shows whether each is a maximum, a minimum or a horizontal point of inflection. Also mark any other points of inflection."
      ],
      [
        "Edges",
        "Check what f(x) does for very large positive and negative x. For a polynomial, the term with the highest power decides this."
      ],
      [
        "Example",
        "f(x) = x³ − 3x² = x²(x − 3) cuts the axes at (0, 0) and (3, 0). f'(x) = 3x(x − 2) gives stationary points (0, 0), a maximum, and (2, −4), a minimum. There is a point of inflection at (1, −2). As x → ∞, f(x) → ∞, and as x → −∞, f(x) → −∞."
      ]
    ],
    "remember": "Plot the intercepts, stationary points and inflections, then join them to match the edge behaviour.",
    "a": {
      "q": "What does the graph of y = x³ − 3x² do as x gets very large and negative?",
      "opts": ["It falls without bound", "It rises without bound", "It levels off at 0", "It levels off at −3"],
      "why": "For large x, the x³ term outweighs the −3x² term. A large negative number cubed is a large negative number, so y falls without bound. The graph does not level off, because a cubic has no horizontal limit.",
      "clue": "Which term is largest when x is huge? What sign does it have for negative x?"
    },
    "b": {
      "d": 3,
      "q": "For f(x) = x³ − 12x, what are the coordinates of the maximum turning point?",
      "opts": ["(−2, 16)", "(2, −16)", "(−2, −16)", "(2, 16)"],
      "why": "f'(x) = 3x² − 12 = 0 gives x = 2 or x = −2. f(−2) = −8 + 24 = 16. The gradient is positive at x = −3 and negative at x = 0, so (−2, 16) is a maximum. (2, −16) is tempting but is the minimum.",
      "clue": "Solve f'(x) = 0, then check the gradient either side of each x-value."
    }
  },
  "mat-antiderivatives": {
    "title": "Antiderivatives",
    "card": [
      "An antiderivative undoes differentiation. If F'(x) = f(x), then F(x) is an antiderivative of f(x).",
      "Power rule: the antiderivative of xⁿ is xⁿ⁺¹/(n + 1) + C, for n ≠ -1. Add 1 to the power and divide by the new power, one term at a time, keeping any constant multiple in front.",
      "C is the constant of integration. Constants vanish when we differentiate, so the general antiderivative, which covers all antiderivatives, includes + C.",
      "Example: 6x² gives 6 × x³/3 + C = 2x³ + C. If a curve with gradient 6x² passes through (1, 7), then 7 = 2 + C, so C = 5 and y = 2x³ + 5."
    ],
    "remember": "Add 1 to the power, divide by the new power, add C, then use a known point to find C.",
    "a": {
      "q": "What is the general antiderivative of 8x³?",
      "opts": ["2x⁴ + C", "24x² + C", "8x⁴ + C", "8x⁴/3 + C"],
      "why": "Raise the power to 4, then divide by 4: 8x⁴/4 = 2x⁴, so the general antiderivative is 2x⁴ + C. Differentiating 2x⁴ gives 8x³, which confirms it. 24x² + C comes from differentiating instead, and 8x⁴/3 + C divides by the old power.",
      "clue": "Divide by the new power, not the old one."
    },
    "b": {
      "d": 3,
      "q": "A curve has gradient function dy/dx = 3x² − 4x and passes through (1, 5). What is its equation?",
      "opts": ["y = x³ − 2x² + 6", "y = x³ − 2x² + 5", "y = x³ − 4x² + 8", "y = x³ − 2x² + 4"],
      "why": "Term by term, the antiderivative is y = x³ − 2x² + C. Putting in (1, 5): 1 − 2 + C = 5, so C = 6. Using 5 as C without substituting is the tempting mistake, and y = x³ − 4x² + 8 passes through the point but forgets to divide −4x² by 2.",
      "clue": "Find the antiderivative first, then substitute the point to find C."
    }
  },
  "mat-integrals-exponential-trigonometric-functions": {
    "title": "Integrals of exponential and trig functions",
    "card": [
      "Each rule comes from reversing a derivative. ∫eˣ dx = eˣ + C. ∫cos x dx = sin x + C. ∫sec²x dx = tan x + C.",
      "Watch the sign for sine: ∫sin x dx = −cos x + C, because the derivative of cos x is −sin x.",
      "If the inside is linear, ax + b, divide by a. ∫e^(ax+b) dx = e^(ax+b) ÷ a + C. ∫cos(ax+b) dx = sin(ax+b) ÷ a + C. The same works for sin and sec².",
      "Example: ∫e³ˣ dx = e³ˣ/3 + C. Check by differentiating: the derivative of e³ˣ/3 is 3e³ˣ/3 = e³ˣ."
    ],
    "remember": "Integrate the function, then divide by the number in front of x. Sine gives −cos.",
    "a": {
      "q": "What is ∫sin x dx?",
      "opts": ["−cos x + C", "cos x + C", "−sin x + C", "sin²x/2 + C"],
      "why": "The derivative of −cos x is sin x, so −cos x + C is the integral. cos x + C is tempting, but its derivative is −sin x, which has the wrong sign.",
      "clue": "Differentiate your answer and see if you get sin x."
    },
    "b": {
      "d": 3,
      "q": "What is ∫cos(2x) dx?",
      "opts": ["sin(2x)/2 + C", "2 sin(2x) + C", "−sin(2x)/2 + C", "sin(2x) + C"],
      "why": "Divide by the 2 in front of x, so the integral is sin(2x)/2 + C. Differentiating gives 2cos(2x)/2 = cos(2x). Multiplying by 2 instead is a common slip, and sin(2x) + C would differentiate to 2cos(2x).",
      "clue": "Differentiating sin(2x) brings out an extra factor. Cancel it."
    }
  },
  "mat-integrals-giving-logarithms": {
    "title": "Integrals giving logarithms",
    "card": [
      "The integral of 1/x is ln|x| + C. The absolute value bars are there because 1/x is defined for negative x too, but ln is only defined for positive numbers.",
      "More generally, if the top of a fraction is the derivative of the bottom, the integral is ln|bottom| + C. In symbols: ∫ f'(x)/f(x) dx = ln|f(x)| + C.",
      "Worked example: ∫ 2x/(x² + 1) dx. The derivative of x² + 1 is 2x, which is the top. So the answer is ln(x² + 1) + C. Here x² + 1 is always positive, so the bars are not needed.",
      "If the top is only a constant multiple of the derivative, take the constant out. For ∫ 3/(3x + 5) dx, the derivative of 3x + 5 is 3, so the answer is ln|3x + 5| + C. For ∫ 1/(3x + 5) dx, the top is 1, which is 1/3 of 3, so the answer is (1/3) ln|3x + 5| + C."
    ],
    "remember": "Top is the derivative of the bottom: the integral is ln|bottom| + C.",
    "a": {
      "q": "What is ∫ 4x³/(x⁴ + 7) dx?",
      "opts": ["ln(x⁴ + 7) + C", "4 ln(x⁴ + 7) + C", "x⁴/(x⁴ + 7) + C", "(x⁴ + 7)⁻¹ + C"],
      "why": "The derivative of x⁴ + 7 is 4x³, which is exactly the top, so the answer is ln(x⁴ + 7) + C. Multiplying by 4 is wrong because the 4 is already part of the derivative and is not an extra factor.",
      "clue": "Differentiate the bottom and compare it with the top."
    },
    "b": {
      "d": 3,
      "q": "What is ∫ 1/(2x + 1) dx, for x > 0?",
      "opts": ["(1/2) ln(2x + 1) + C", "ln(2x + 1) + C", "2 ln(2x + 1) + C", "−1/(2x + 1)² + C"],
      "why": "The derivative of 2x + 1 is 2, but the top is only 1, which is half of 2. So the answer is (1/2) ln(2x + 1) + C. Check by differentiating: (1/2) × 2/(2x + 1) = 1/(2x + 1). Leaving out the 1/2 is the tempting mistake.",
      "clue": "Differentiate your answer: do you get back 1/(2x + 1)?"
    }
  },
  "mat-definite-integral": {
    "title": "The definite integral",
    "card": [
      "The definite integral of f(x) from a to b is written ∫ f(x) dx, with a at the bottom and b at the top. a and b are called the limits.",
      "To find it, first find an antiderivative F(x). Then the value is F(b) − F(a): put in the top limit, put in the bottom limit, and subtract. This is the fundamental theorem of calculus.",
      "The constant C is not needed. It would appear in both F(b) and F(a), so it cancels.",
      ["Example", "For the integral of 2x from 1 to 3, F(x) = x². Then F(3) − F(1) = 9 − 1 = 8."]
    ],
    "remember": "Definite integral = F(top) − F(bottom), and C cancels.",
    "a": {
      "q": "What is the value of the integral of 3x² from 1 to 2?",
      "opts": ["7", "8", "1", "5"],
      "why": "An antiderivative of 3x² is x³. Then F(2) − F(1) = 8 − 1 = 7. The answer 8 comes from using only F(2) and forgetting to subtract F(1).",
      "clue": "Find F(x), then subtract the bottom value from the top."
    },
    "b": {
      "d": 3,
      "q": "What is the value of the integral of (4x − 1) from 0 to 3?",
      "opts": ["15", "18", "−15", "21"],
      "why": "An antiderivative is 2x² − x. Then F(3) = 18 − 3 = 15 and F(0) = 0, so the value is 15 − 0 = 15. The answer 18 comes from forgetting to integrate the −1 term, and −15 comes from subtracting in the wrong order.",
      "clue": "Integrate both terms, then put in 3 and 0."
    }
  },
  "mat-areas-under-curves": {
    "title": "Areas under curves",
    "card": [
      "The definite integral of f(x) from a to b gives signed area between the curve and the x-axis. Area above the x-axis counts as positive. Area below counts as negative.",
      "If a curve crosses the x-axis between a and b, the positive and negative parts partly cancel. The integral then does not give the total area.",
      "To find the total area, solve f(x) = 0 to find where the curve crosses the axis. Integrate each region separately. Take each result as a positive value, then add.",
      "Example: y = x² − 4 from x = 0 to x = 3. It crosses at x = 2. From 0 to 2: [x³/3 − 4x] = 8/3 − 8 = −16/3, so the area is 16/3. From 2 to 3: (9 − 12) − (8/3 − 8) = −3 + 16/3 = 7/3. Total area = 16/3 + 7/3 = 23/3."
    ],
    "remember": "Integrals give signed area, so split at each x-intercept and add the positive sizes.",
    "a": {
      "q": "The integral of f(x) from 1 to 4 is −6, and the whole region lies below the x-axis. What is the area of the region?",
      "opts": ["6 square units", "−6 square units", "0 square units", "3 square units"],
      "why": "Area below the x-axis gives a negative integral, but an area is positive. The area is the size of −6, which is 6. Leaving it as −6 mixes up signed area with area.",
      "clue": "An area cannot be negative."
    },
    "b": {
      "d": 3,
      "q": "What is the total area between y = x² − 1 and the x-axis from x = 0 to x = 2?",
      "opts": ["2 square units", "2/3 square units", "8/3 square units", "4/3 square units"],
      "why": "The curve crosses at x = 1. From 0 to 1: [x³/3 − x] = −2/3, so area 2/3. From 1 to 2: (8/3 − 2) − (1/3 − 1) = 2/3 + 2/3 = 4/3. Total = 2/3 + 4/3 = 2. The single integral from 0 to 2 gives 2/3, which is the tempting wrong answer because the parts cancel.",
      "clue": "Find where the curve crosses the x-axis, then split the integral there."
    }
  },
  "mat-area-between-two-curves": {
    "title": "Area between two curves",
    "card": [
      "To find the area between two curves, subtract the lower function from the upper one, then integrate. Area = ∫ (upper − lower) dx.",
      "The limits are where the curves meet. Set f(x) = g(x) and solve for x to find them.",
      "Check which curve is on top between the limits, for example by testing a point. Subtracting the wrong way gives a negative area.",
      "Example: y = x and y = x² meet where x = x², so at x = 0 and x = 1. Between them x is on top. Area = ∫ from 0 to 1 of (x − x²) dx = [x²/2 − x³/3] from 0 to 1 = 1/2 − 1/3 = 1/6."
    ],
    "remember": "Area between curves = integral of (upper − lower), from one intersection to the next.",
    "a": {
      "q": "Which integral gives the area between y = x and y = x² from x = 0 to x = 1, where y = x is the upper curve?",
      "opts": [
        "∫ from 0 to 1 of (x − x²) dx",
        "∫ from 0 to 1 of (x² − x) dx",
        "∫ from 0 to 1 of (x + x²) dx",
        "∫ from 0 to 1 of (x · x²) dx"
      ],
      "why": "The area is the upper function minus the lower one, and y = x is on top, so the integrand is x − x². Using x² − x gives the right size with the wrong sign, a negative answer.",
      "clue": "Take the lower curve away from the upper curve."
    },
    "b": {
      "d": 2,
      "q": "The line y = 4 and the curve y = x² meet at x = −2 and x = 2, with the line on top. What is the area between them?",
      "opts": ["32/3", "16/3", "16", "64/3"],
      "why": "Area = ∫ from −2 to 2 of (4 − x²) dx = [4x − x³/3] from −2 to 2 = (8 − 8/3) − (−8 + 8/3) = 32/3. Using only 0 to 2 gives 16/3, which is just half of the area.",
      "clue": "The region runs from x = −2 to x = 2, not from 0."
    }
  },
  "mat-trapezoidal-rule": {
    "title": "The trapezoidal rule",
    "card": [
      "The trapezoidal rule estimates a definite integral when an exact antiderivative is hard to find or the data comes as a table. Split the area into strips of equal width h, and treat each strip as a trapezium.",
      "A trapezium has area (sum of parallel sides) ÷ 2 × width. With n strips, h = (b − a) ÷ n, and the function values are y₀, y₁, ..., yₙ.",
      "Adding the strips: area ≈ h/2 × [y₀ + yₙ + 2(y₁ + y₂ + ... + yₙ₋₁)]. The first and last values are used once. Every middle value is used twice.",
      "Example: estimate the integral of x² from 0 to 2 using 2 strips. h = 1, and y₀ = 0, y₁ = 1, y₂ = 4. Area ≈ 1/2 × [0 + 4 + 2×1] = 3."
    ],
    "remember": "Use h/2 × [first + last + 2 × (all the middle values)].",
    "a": {
      "q": "Using the trapezoidal rule with 2 strips, what is the estimate for the integral of x² from 0 to 4?",
      "opts": ["24", "20", "48", "12"],
      "why": "Here h = (4 − 0) ÷ 2 = 2, and y₀ = 0, y₁ = 4, y₂ = 16. Area ≈ 2/2 × [0 + 16 + 2×4] = 24. The answer 20 comes from using the middle value only once, and 48 comes from multiplying by h instead of h/2.",
      "clue": "Find h first, then double the middle value."
    },
    "b": {
      "d": 2,
      "q": "A function has values 2, 5, 6 and 3 at x = 0, 1, 2 and 3. Using the trapezoidal rule with 3 strips, what is the estimate of the integral from 0 to 3?",
      "opts": ["13.5", "10.5", "8", "27"],
      "why": "Here h = 1, so area ≈ 1/2 × [2 + 3 + 2×(5 + 6)] = 1/2 × 27 = 13.5. Adding the three trapezia gives the same: 3.5 + 5.5 + 4.5 = 13.5. The answer 10.5 comes from doubling the first and last values instead of the middle ones.",
      "clue": "Which values sit inside the interval and get doubled?"
    }
  },
  "mat-optimisation": {
    "title": "Optimisation",
    "card": [
      "Optimisation finds the largest or smallest value of a quantity. First write that quantity as a function of one variable. Use any given condition to remove the other variables.",
      "Differentiate and solve f'(x) = 0 to find the stationary points. Test each one to see if it is a maximum or minimum, using the second derivative or the sign of f'(x) on each side.",
      "Check the endpoints of the allowed domain, because the greatest or least value can occur there. Also check that the answer makes sense, for example that a length is positive.",
      "Example: two numbers add to 10. Find the largest product. If one is x, the other is 10 − x, so P = x(10 − x) = 10x − x². Then P' = 10 − 2x = 0 gives x = 5. P'' = −2 is negative, so it is a maximum. The largest product is 5 × 5 = 25."
    ],
    "remember": "Write one variable, solve f'(x) = 0, test the type, then check endpoints and sense.",
    "a": {
      "q": "Two numbers add to 12. Their product P = x(12 − x). What is the largest value of P?",
      "opts": ["36", "6", "72", "12"],
      "why": "P = 12x − x², so P' = 12 − 2x = 0 gives x = 6. P'' = −2 is negative, so this is a maximum, and P = 6 × 6 = 36. The value 6 is where the maximum occurs, not the maximum itself.",
      "clue": "Find x first, then put it back into P."
    },
    "b": {
      "d": 3,
      "q": "Ava has 40 m of fencing for a rectangular pen x metres wide, so its area is A = x(20 − x) for 0 ≤ x ≤ 20. What is the largest possible area A?",
      "opts": ["100 m²", "10 m²", "200 m²", "400 m²"],
      "why": "A = 20x − x², so A' = 20 − 2x = 0 gives x = 10. A'' = −2 is negative, so it is a maximum, and A = 10 × 10 = 100. The endpoints x = 0 and x = 20 both give area 0, so they are smaller. The value 10 is the width, not the area.",
      "clue": "Find x, then work out the area, and compare with the endpoints."
    }
  },
  "mat-displacement-velocity-acceleration": {
    "title": "Displacement, velocity and acceleration",
    "card": [
      "For a particle moving in a straight line, x(t) is its displacement from the origin at time t. Velocity is v = dx/dt and acceleration is a = dv/dt.",
      "Going the other way, integrate. Velocity is the integral of acceleration, and displacement is the integral of velocity. Each integral adds a constant C.",
      "An initial condition fixes the constant. Put in the given values of t and v (or x), then solve for C.",
      [
        "Example",
        "If a = 6t and v = 2 when t = 0, then v = 3t² + C. Putting in t = 0 gives 2 = C, so v = 3t² + 2. At t = 1, v = 5."
      ]
    ],
    "remember": "Differentiate to go from x to v to a. Integrate to go back, and use the starting values to find C.",
    "a": {
      "q": "A particle has displacement x = t³ − 4t metres at time t seconds. What is its velocity when t = 2?",
      "opts": ["8 m/s", "4 m/s", "0 m/s", "12 m/s"],
      "why": "v = dx/dt = 3t² − 4, so at t = 2, v = 12 − 4 = 8 m/s. The value 0 is x itself at t = 2 (8 − 8), which is displacement, not velocity.",
      "clue": "Differentiate x first, then put in t = 2."
    },
    "b": {
      "d": 3,
      "q": "A particle has acceleration a = 4t m/s². When t = 0 its velocity is 3 m/s. What is its velocity when t = 2?",
      "opts": ["11 m/s", "8 m/s", "5 m/s", "14 m/s"],
      "why": "Integrating gives v = 2t² + C. Since v = 3 when t = 0, C = 3, so v = 2t² + 3. At t = 2, v = 8 + 3 = 11 m/s. The answer 8 comes from leaving out the constant.",
      "clue": "Integrate a, then use v = 3 at t = 0 to find C before putting in t = 2."
    }
  },
  "mat-reading-motion-from-graphs": {
    "title": "Reading motion from graphs",
    "card": [
      [
        "Displacement-time",
        "the gradient at a point is the velocity. A horizontal tangent means velocity is 0, so the particle is at rest at that moment."
      ],
      [
        "Velocity-time",
        "the height of the graph is the velocity, and its gradient is the acceleration. Above the t-axis the particle moves in the positive direction. Below it, the particle moves in the negative direction."
      ],
      [
        "Changing direction",
        "the velocity must change sign. On a velocity-time graph, the graph crosses the t-axis. On a displacement-time graph, the curve turns at a peak or a trough."
      ],
      [
        "Speeding up",
        "the particle speeds up when velocity and acceleration have the same sign, and slows down when the signs differ. Example: v = −3 and a = −2 means speeding up."
      ]
    ],
    "remember": "Rest means v = 0. A change of direction needs v to change sign. Same signs for v and a mean speeding up.",
    "a": {
      "q": "On a velocity-time graph, a particle's graph crosses the t-axis from above to below at t = 4. What happens at t = 4?",
      "opts": [
        "It changes direction",
        "It is at the origin",
        "Its acceleration is zero",
        "It stops and then continues the same way"
      ],
      "why": "Crossing the t-axis means velocity changes from positive to negative, so the particle reverses direction. Stopping and carrying on the same way would need the graph to touch the axis without crossing, so velocity would not change sign.",
      "clue": "Look at the sign of velocity before and after t = 4."
    },
    "b": {
      "d": 3,
      "q": "At t = 3, a particle's velocity-time graph is above the t-axis and sloping downwards. What is the particle doing at that moment?",
      "opts": [
        "Moving in the positive direction and slowing down",
        "Moving in the positive direction and speeding up",
        "Moving in the negative direction and slowing down",
        "Moving in the negative direction and speeding up"
      ],
      "why": "The graph is above the t-axis, so velocity is positive and the particle moves in the positive direction. The downward slope means the acceleration is negative, so the signs differ and the particle slows down. A downward slope does not mean moving in the negative direction: that depends on which side of the t-axis the graph is.",
      "clue": "Height gives the velocity's sign. Gradient gives the acceleration's sign."
    }
  },
  "mat-exponential-growth-decay": {
    "title": "Exponential growth and decay",
    "card": [
      "Some quantities change at a rate proportional to their size: the bigger N is, the faster it changes. This is written dN/dt = kN, and its solution is N = N₀eᵏᵗ.",
      "N₀ is the starting amount, when t = 0. k is the constant that sets how fast N changes, and t is time.",
      ["Growth", "k > 0, so N increases, as with a population in a good environment."],
      [
        "Decay",
        "k < 0, so N decreases towards 0, as with a radioactive substance. Example: N = 80e^(−0.5t) starts at 80. At t = 2, N = 80e⁻¹ ≈ 29.4."
      ]
    ],
    "remember": "N = N₀eᵏᵗ: N₀ is the start, and the sign of k decides growth or decay.",
    "a": {
      "q": "A quantity follows N = 50e^(−0.2t). Which statement is true?",
      "opts": [
        "It starts at 50 and is decaying",
        "It starts at 50 and is growing",
        "It starts at 0.2 and is decaying",
        "It starts at −0.2 and is growing"
      ],
      "why": "N₀ = 50 is the value at t = 0, and k = −0.2 is negative, so N decays. Growing is wrong because it ignores the negative sign of k.",
      "clue": "Put t = 0 in, then look at the sign of k."
    },
    "b": {
      "d": 3,
      "q": "A colony of bacteria in a lab follows N = 200e^(0.3t), where t is in hours. What is N after 2 hours, to the nearest whole number?",
      "opts": ["364", "120", "1478", "320"],
      "why": "N = 200e^(0.3 × 2) = 200e^0.6 ≈ 200 × 1.822 = 364. The value 320 comes from adding 30% of 200, which is 60, in each of the 2 hours. That treats the growth as a fixed amount per hour, but in this model N grows faster as it gets bigger, so you must use e to the power 0.6.",
      "clue": "Work out k × t first, then use e to that power."
    }
  },
  "mat-rates-change-context": {
    "title": "Rates of change in context",
    "card": [
      "The derivative dV/dt is the rate of change of V with respect to time t. Its units are the units of V per unit of t, such as litres per minute.",
      "To find how fast a quantity changes at a given moment, write it as a function of t, differentiate, then substitute that value of t.",
      "A positive rate means the quantity is increasing. A negative rate means it is decreasing.",
      "Example: water in a tank is V = 40t − t² litres after t minutes. Then dV/dt = 40 − 2t. At t = 5, dV/dt = 40 − 10 = 30, so the volume is rising at 30 litres per minute."
    ],
    "remember": "Differentiate, then substitute the time. The sign of the answer shows whether the quantity is rising or falling.",
    "a": {
      "q": "The water in a tank is V = 60t − t² litres after t minutes. How fast is the volume changing at t = 10?",
      "opts": ["Increasing at 40 L/min", "Increasing at 500 L/min", "Increasing at 80 L/min", "Decreasing at 40 L/min"],
      "why": "dV/dt = 60 − 2t, so at t = 10 the rate is 60 − 20 = 40. It is positive, so the volume is increasing. The value 500 is V itself, found by substituting without differentiating.",
      "clue": "Differentiate first, then put in t = 10."
    },
    "b": {
      "d": 3,
      "q": "The water in a pool is V = 200 + 12t − 3t² litres after t minutes. What is the rate of change of volume at t = 4?",
      "opts": ["Decreasing at 12 L/min", "Increasing at 12 L/min", "Decreasing at 36 L/min", "Increasing at 236 L/min"],
      "why": "dV/dt = 12 − 6t, so at t = 4 the rate is 12 − 24 = −12. The negative sign means the volume is decreasing. Choosing increasing at 12 ignores the sign.",
      "clue": "Check the sign of your answer."
    }
  },
  "mat-discrete-probability-distributions": {
    "title": "Discrete probability distributions",
    "card": [
      "A discrete random variable X takes separate values, such as 0, 1, 2, 3. A probability distribution lists each value x with its probability P(X = x).",
      "Every probability is between 0 and 1. All the probabilities in the table must add to 1, because one of the values must happen.",
      "To find a missing probability, subtract the others from 1. Example: P(1) = 0.3, P(2) = 0.5 and P(3) = k. Then k = 1 − 0.3 − 0.5 = 0.2.",
      "To find the chance of a group of values, add their probabilities. In the example, P(X ≥ 2) = 0.5 + 0.2 = 0.7."
    ],
    "remember": "List every value with its probability, and the probabilities add to 1.",
    "a": {
      "q": "A random variable X has P(1) = 0.2, P(2) = 0.35, P(3) = k and P(4) = 0.25. What is k?",
      "opts": ["0.2", "0.8", "0.45", "0.25"],
      "why": "The probabilities add to 1, so k = 1 − (0.2 + 0.35 + 0.25) = 1 − 0.8 = 0.2. The value 0.8 is the sum of the known probabilities, not the missing one.",
      "clue": "Subtract the known probabilities from 1."
    },
    "b": {
      "d": 3,
      "q": "Ava's bus is late X minutes, where P(0) = 0.4, P(5) = 0.3, P(10) = 0.2 and P(15) = 0.1. What is P(X ≥ 5)?",
      "opts": ["0.6", "0.3", "0.4", "0.9"],
      "why": "Add the probabilities for 5, 10 and 15: 0.3 + 0.2 + 0.1 = 0.6. Check: 1 − P(0) = 1 − 0.4 = 0.6. The value 0.9 adds the probabilities for 0, 5 and 10, so it wrongly includes P(0) and leaves out P(15).",
      "clue": "At least 5 means 5 or more. Add those probabilities."
    }
  },
  "mat-expected-value": {
    "title": "Expected value",
    "card": [
      "The expected value E(X) is the long-run average of a random variable. It is the mean of the distribution.",
      "Formula: E(X) = Σ x × P(x). Multiply each value by its probability, then add the results.",
      "Example: P(0) = 0.5, P(1) = 0.3, P(2) = 0.2. Then E(X) = 0 × 0.5 + 1 × 0.3 + 2 × 0.2 = 0.7.",
      "E(X) is an average over many trials. It need not be a value X can actually take, as 0.7 is not."
    ],
    "remember": "Multiply each value by its probability and add them up.",
    "a": {
      "q": "X has P(1) = 0.5, P(2) = 0.3 and P(5) = 0.2. What is E(X)?",
      "opts": ["2.1", "2.67", "1.0", "8"],
      "why": "E(X) = 1 × 0.5 + 2 × 0.3 + 5 × 0.2 = 0.5 + 0.6 + 1.0 = 2.1. The value 2.67 comes from averaging 1, 2 and 5 without using the probabilities.",
      "clue": "Weight each value by its probability."
    },
    "b": {
      "d": 3,
      "q": "A game at a fete in Orange costs nothing to play. You win $0 with probability 0.7, $4 with probability 0.2 and $10 with probability 0.1. What is the expected win in dollars?",
      "opts": ["1.80", "4.67", "14", "0.90"],
      "why": "E(X) = 0 × 0.7 + 4 × 0.2 + 10 × 0.1 = 0.8 + 1.0 = 1.80. The value 4.67 is the plain average of 0, 4 and 10, which ignores how likely each prize is.",
      "clue": "Do not average the prizes. Weight them by probability."
    }
  },
  "mat-variance-standard-deviation-random": {
    "title": "Variance and standard deviation of a random variable",
    "card": [
      "Variance measures how spread out X is around its mean. Formula: Var(X) = E(X²) − [E(X)]².",
      "E(X²) = Σ x² × P(x). Square each value first, then multiply by its probability and add. Then subtract the square of E(X).",
      "The standard deviation is the square root of the variance: SD = √Var(X). It is in the same units as X.",
      "Example: P(0) = 0.5 and P(2) = 0.5. E(X) = 1 and E(X²) = 0 × 0.5 + 4 × 0.5 = 2. So Var(X) = 2 − 1² = 1 and SD = 1."
    ],
    "remember": "Var = E(X²) minus the square of E(X). SD is its square root.",
    "a": {
      "q": "X has P(1) = 0.5 and P(3) = 0.5. So E(X) = 2 and E(X²) = 5. What is Var(X)?",
      "opts": ["1", "3", "5", "9"],
      "why": "Var(X) = E(X²) − [E(X)]² = 5 − 2² = 1. The value 3 comes from subtracting E(X) instead of its square.",
      "clue": "Square E(X) before subtracting."
    },
    "b": {
      "d": 3,
      "q": "A spinner gives X = 0 with probability 0.6 and X = 5 with probability 0.4. What is the variance of X?",
      "opts": ["6", "10", "4", "2.45"],
      "why": "E(X) = 5 × 0.4 = 2. E(X²) = 25 × 0.4 = 10. Var(X) = 10 − 2² = 6. The value 2.45 is the standard deviation √6, not the variance.",
      "clue": "Find E(X) and E(X²) first, then subtract."
    }
  },
  "mat-probability-density-functions": {
    "title": "Probability density functions",
    "card": [
      "A continuous variable can take any value in an interval, such as a height or a waiting time. The chance of one exact value is 0, so we find the chance of a range of values.",
      "A probability density function f(x) is a curve. P(a ≤ X ≤ b) is the area under the curve from x = a to x = b. This area is found by integrating: ∫ f(x) dx from a to b.",
      "A density function must follow two rules. f(x) ≥ 0 for every x, so no area is negative. The total area under the whole curve is 1.",
      "Example: f(x) = 0.25 for 0 ≤ x ≤ 4, and 0 elsewhere. The total area is 0.25 × 4 = 1. P(1 ≤ X ≤ 3) = 0.25 × 2 = 0.5."
    ],
    "remember": "For a continuous variable, probability is area under f(x), and the total area is 1.",
    "a": {
      "q": "f(x) = k for 0 ≤ x ≤ 5, and 0 elsewhere, is a probability density function. What is k?",
      "opts": ["0.2", "5", "1", "0.5"],
      "why": "The total area must be 1, so the rectangle gives k × 5 = 1 and k = 0.2. Choosing 5 mixes up the width with the height.",
      "clue": "Set the area of the rectangle equal to 1."
    },
    "b": {
      "d": 3,
      "q": "A waiting time X minutes has f(x) = 0.1 for 0 ≤ x ≤ 10, and 0 elsewhere. What is P(X ≥ 7)?",
      "opts": ["0.3", "0.7", "0.03", "0.1"],
      "why": "The area from x = 7 to x = 10 is 0.1 × 3 = 0.3. The value 0.7 is the area from 0 to 7, which is P(X ≤ 7), so it is the wrong part of the curve.",
      "clue": "Find the width of the interval from 7 to the end of the curve."
    }
  },
  "mat-cumulative-distribution-functions": {
    "title": "Cumulative distribution functions",
    "card": [
      "The cumulative distribution function (CDF), F(x), gives P(X ≤ x). It is the area under the density curve f from the lowest value of X up to x.",
      "Find it by integrating: F(x) = ∫ f(t) dt, from the lowest value up to x. Use t inside the integral so x is only the upper limit.",
      "Worked example: f(x) = 2x for 0 ≤ x ≤ 1. Then F(x) = ∫ 2t dt from 0 to x = x². So P(X ≤ 0.5) = 0.5² = 0.25.",
      "F rises from 0 to 1 and never falls. For an interval, P(a ≤ X ≤ b) = F(b) − F(a). Differentiating F gives back f."
    ],
    "remember": "F(x) is the area so far: integrate f up to x.",
    "a": {
      "q": "A variable has density f(x) = 2x for 0 ≤ x ≤ 1. What is P(X ≤ 0.6)?",
      "opts": ["0.36", "0.6", "1.2", "0.72"],
      "why": "F(x) = x², so P(X ≤ 0.6) = 0.6² = 0.36. Substituting 0.6 into f gives 1.2, which is the height of the curve, not the area up to 0.6.",
      "clue": "Integrate f from 0 up to 0.6."
    },
    "b": {
      "d": 3,
      "q": "A variable has density f(x) = 2x for 0 ≤ x ≤ 1. What is P(0.5 ≤ X ≤ 0.8)?",
      "opts": ["0.39", "0.64", "0.25", "0.30"],
      "why": "F(x) = x², so P = F(0.8) − F(0.5) = 0.64 − 0.25 = 0.39. Using F(0.8) alone gives 0.64, which wrongly includes the area below 0.5.",
      "clue": "Subtract the area up to 0.5 from the area up to 0.8."
    }
  },
  "mat-normal-distribution": {
    "title": "The normal distribution",
    "card": [
      "A normal distribution is a symmetric, bell-shaped curve. Its highest point is at the mean (μ), and the left and right sides mirror each other.",
      "Two numbers set the curve: the mean μ, which gives its centre, and the standard deviation σ, which gives its spread. A bigger σ makes a wider, flatter bell.",
      "The empirical rule: about 68% of values lie within 1σ of the mean, about 95% within 2σ, and about 99.7% within 3σ.",
      "Example: if μ = 50 and σ = 4, about 95% of values lie within 2 × 4 = 8 of the mean, so between 42 and 58."
    ],
    "remember": "Mean sets the centre, standard deviation sets the spread: 68%, 95% and 99.7% within 1, 2 and 3σ.",
    "a": {
      "q": "A normal variable has mean 100 and standard deviation 10. About 95% of values lie between which two numbers?",
      "opts": ["80 and 120", "90 and 110", "70 and 130", "95 and 105"],
      "why": "95% lies within 2 standard deviations, and 2 × 10 = 20, so the range is 100 − 20 = 80 to 100 + 20 = 120. The range 90 to 110 is only 1 standard deviation each side, which holds about 68%.",
      "clue": "95% is within 2 standard deviations of the mean."
    },
    "b": {
      "d": 3,
      "q": "Fish lengths on a Tasmanian farm are normal. About 95% of the fish are between 34 cm and 46 cm long. What are the mean and standard deviation?",
      "opts": [
        "Mean 40 cm, standard deviation 3 cm",
        "Mean 40 cm, standard deviation 6 cm",
        "Mean 40 cm, standard deviation 12 cm",
        "Mean 40 cm, standard deviation 2 cm"
      ],
      "why": "The curve is symmetric, so the mean is the midpoint: (34 + 46) ÷ 2 = 40. Each end is 6 cm from the mean, and 95% covers 2σ each side, so 2σ = 6 and σ = 3. Choosing 6 cm treats the distance to each end as only one standard deviation.",
      "clue": "How many standard deviations does 95% cover on each side?"
    }
  },
  "mat-z-scores": {
    "title": "z-scores",
    "card": [
      "A z-score tells how many standard deviations a value is from the mean. z = (x − μ) ÷ σ, where x is the value, μ is the mean and σ is the standard deviation.",
      "A positive z-score means the value is above the mean. A negative z-score means it is below the mean. A z-score of 0 means it equals the mean.",
      "Example: a test has mean 60 and standard deviation 8. A mark of 76 has z = (76 − 60) ÷ 8 = 16 ÷ 8 = 2, so it is 2 standard deviations above the mean.",
      "A z-score has no units, so it lets you compare values from different distributions. The higher z-score is further above its own mean, relative to its spread."
    ],
    "remember": "z is the distance from the mean, measured in standard deviations.",
    "a": {
      "q": "A variable has mean 50 and standard deviation 5. What is the z-score of the value 42?",
      "opts": ["-1.6", "1.6", "-8", "-0.2"],
      "why": "z = (42 − 50) ÷ 5 = −8 ÷ 5 = −1.6. The value is below the mean, so z is negative. Giving 1.6 drops the sign, and −8 forgets to divide by the standard deviation.",
      "clue": "Subtract the mean first, then divide by the standard deviation."
    },
    "b": {
      "d": 3,
      "q": "Priya scores 68 in Maths, where the mean is 56 and σ = 6. She scores 75 in Science, where the mean is 65 and σ = 8. In which subject did she do better compared with her class?",
      "opts": [
        "Maths, because its z-score of 2 is higher than 1.25",
        "Science, because 75 is a higher mark than 68",
        "Science, because its mean of 65 is higher",
        "Neither, because the two tests have different means"
      ],
      "why": "Maths: z = (68 − 56) ÷ 6 = 2. Science: z = (75 − 65) ÷ 8 = 1.25. The higher z-score is further above its own mean, so Maths is better. Comparing raw marks is tempting, but the two tests have different means and spreads.",
      "clue": "Work out both z-scores before comparing."
    }
  },
  "mat-probabilities-from-normal-distribution": {
    "title": "Probabilities from the normal distribution",
    "card": [
      "Step 1: turn each end of the interval into a z-score using z = (x − μ)/σ. Step 2: use the z-scores to find the area under the standard normal curve. That area is the probability.",
      [
        "Empirical rule",
        "About 68% of values lie within 1 standard deviation of the mean, 95% within 2 and 99.7% within 3. The curve is symmetric, so half of the area lies on each side of the mean."
      ],
      [
        "Table or calculator",
        "A z-table gives P(Z ≤ z). For an interval, P(a < Z < b) = P(Z ≤ b) − P(Z ≤ a). For a value above z, P(Z > z) = 1 − P(Z ≤ z)."
      ],
      [
        "Example",
        "Heights have μ = 170 and σ = 10. For 150 to 190, z = −2 to 2, so P is about 0.95. For above 180, z = 1. Within 1 standard deviation is 68%, so the two tails share 32%. Each tail is 16%, so P(X > 180) is about 0.16."
      ]
    ],
    "remember": "Convert to z-scores, then read the area from the empirical rule or a table.",
    "a": {
      "q": "Test marks are normal with mean 60 and standard deviation 8. What is the approximate probability that a mark is between 44 and 76?",
      "opts": ["0.95", "0.68", "0.997", "0.475"],
      "why": "z = (44 − 60)/8 = −2 and z = (76 − 60)/8 = 2. The interval is within 2 standard deviations of the mean, so the probability is about 0.95. The value 0.68 is for 1 standard deviation, not 2.",
      "clue": "Find the z-scores of 44 and 76 first."
    },
    "b": {
      "d": 3,
      "q": "The lifetime of a battery is normal with mean 400 hours and standard deviation 25 hours. What is the approximate probability that a battery lasts more than 450 hours?",
      "opts": ["0.025", "0.05", "0.95", "0.975"],
      "why": "z = (450 − 400)/25 = 2. About 95% of values lie within 2 standard deviations, so 5% lie outside, split equally between the two tails. The upper tail is 0.025. The value 0.05 is wrong because it counts both tails.",
      "clue": "The 5% outside 2 standard deviations is split between both tails, but this question asks about one."
    }
  },
  "mat-compound-interest": {
    "title": "Compound interest",
    "card": [
      "With compound interest, the interest earned is added to the balance. The next period's interest is then worked out on the larger amount. So interest earns interest.",
      "The formula is A = P(1 + r)ⁿ. A is the final amount, P is the amount invested at the start, r is the rate per period as a decimal, and n is the number of periods.",
      "Rate and periods must match. For 6% per year compounded monthly, r = 0.06 ÷ 12 = 0.005 and n is the number of months.",
      "Example: $2000 at 5% per year for 3 years. A = 2000 × 1.05³ = 2000 × 1.157625 = $2315.25. The interest earned is $315.25."
    ],
    "remember": "Multiply by (1 + r) once for each period. Match r and n to the same period.",
    "a": {
      "q": "Mia invests $1000 at 10% per year, compounded yearly, for 2 years. What is the final amount?",
      "opts": ["$1210", "$1200", "$1100", "$1020"],
      "why": "A = 1000 × 1.1² = 1000 × 1.21 = $1210. The answer $1200 is simple interest, which does not let the interest earn interest.",
      "clue": "Is the second year's interest found on $1000 or on the new balance?"
    },
    "b": {
      "d": 3,
      "q": "Sam invests $5000 at 6% per year, compounded monthly, for 2 years. Which calculation gives the final amount?",
      "opts": ["5000 × (1.005)²⁴", "5000 × (1.005)²", "5000 × (1.06)²⁴", "5000 × (1.06)²"],
      "why": "The rate per month is 0.06 ÷ 12 = 0.005, and there are 2 × 12 = 24 months. So A = 5000 × 1.005²⁴. Using 1.06² ignores the monthly compounding, so the rate and periods do not match.",
      "clue": "Convert both the rate and the time to months."
    }
  },
  "mat-annuities-as-geometric-series": {
    "title": "Annuities as geometric series",
    "card": [
      "An annuity is a series of equal payments M made at regular intervals, such as $1000 deposited at the end of each year. Interest is added each period at a rate r.",
      "The future value is the total of all payments after compounding. A payment made with k periods left grows to M × (1 + r) to the power k, so each payment compounds for a different number of periods.",
      "Written from the last payment back, the terms are M, M(1 + r), M(1 + r)², and so on. This is a geometric series with first term M and common ratio (1 + r). For n payments, its sum is FV = M[(1 + r)ⁿ − 1] ÷ r.",
      "Example: $1000 at the end of each year for 3 years at 10% a year. FV = 1000 + 1000 × 1.1 + 1000 × 1.1² = 1000 + 1100 + 1210 = $3310. The formula gives 1000 × (1.1³ − 1) ÷ 0.1 = 1000 × 3.31 = $3310."
    ],
    "remember": "Each payment compounds for a different time, and the total is a geometric series with ratio 1 + r.",
    "a": {
      "q": "$500 is paid at the end of each year for 3 years, with interest of 10% a year. What is the future value just after the last payment?",
      "opts": ["$1655", "$1500", "$1820.50", "$665.50"],
      "why": "The payments grow to 500, 500 × 1.1 = 550 and 500 × 1.1² = 605, so the total is 500 + 550 + 605 = $1655. $1820.50 compounds every payment one extra period, but the last payment earns no interest. $1500 ignores interest altogether.",
      "clue": "The last payment earns no interest, and the earlier ones earn more."
    },
    "b": {
      "d": 3,
      "q": "Priya deposits $200 at the end of each year for 4 years at 5% a year. Which expression gives the future value just after her last deposit?",
      "opts": ["200 × (1.05⁴ − 1) ÷ 0.05", "200 × 1.05⁴", "200 × (1.05⁴ − 1) ÷ 1.05", "200 × (1.05⁵ − 1) ÷ 0.05"],
      "why": "The deposits form a geometric series with first term 200, ratio 1.05 and 4 terms, so the sum is 200 × (1.05⁴ − 1) ÷ 0.05, about $862.03. 200 × 1.05⁴ compounds only one deposit, not all four. Using a power of 5 counts one deposit too many.",
      "clue": "Match each part of the expression to the sum formula on the card."
    }
  },
  "mat-present-value-annuity": {
    "title": "Present value of an annuity",
    "card": [
      "The present value of an annuity is the lump sum needed now to fund a series of equal future payments, when the money earns compound interest.",
      "Each payment is discounted back to today. A payment N made n periods from now is worth N ÷ (1 + r)ⁿ today, where r is the rate per period.",
      "Add the discounted payments to get the present value. Example: $1000 at the end of each year for 3 years at 5% p.a. gives 1000/1.05 + 1000/1.05² + 1000/1.05³ = 952.38 + 907.03 + 863.84 = $2723.25.",
      "Later payments are discounted by more periods, so each is worth less today than the one before."
    ],
    "remember": "Present value is the sum of each payment divided by (1 + r)ⁿ for its own n.",
    "a": {
      "q": "Amir will be paid $2000 in 2 years. Interest is 10% p.a. compounded annually. What is that payment worth today?",
      "opts": ["$1652.89", "$2420.00", "$1818.18", "$1600.00"],
      "why": "Discount over 2 periods: 2000 ÷ 1.1² = 2000 ÷ 1.21 = $1652.89. Dividing by 1.1 only once ($1818.18) discounts for just one year, but the payment is two years away.",
      "clue": "Divide by (1 + r) once for each period until payment."
    },
    "b": {
      "d": 3,
      "q": "Lena wants to receive $500 at the end of each year for 2 years. Money earns 8% p.a. compounded annually. What lump sum is needed now?",
      "opts": ["$891.63", "$857.34", "$925.93", "$1123.20"],
      "why": "Discount each payment separately: 500 ÷ 1.08 = 462.96 and 500 ÷ 1.08² = 428.67, which total $891.63. Discounting the $1000 total by 2 years ($857.34) treats the first payment as if it came a year later than it does.",
      "clue": "The first payment is discounted by 1 year, the second by 2."
    }
  },
  "mat-reducing-balance-loans": {
    "title": "Reducing balance loans",
    "card": [
      "On a reducing balance loan, interest is charged on the amount still owing. Each period, the interest is added and then the repayment M is taken off.",
      "With balance B and rate r per period, the new balance is B × (1 + r) − M. Repeat this step for each period.",
      "Example: $10 000 at 10% per year, repaid over 2 years. After year 1: 11 000 − M. After year 2: (11 000 − M) × 1.1 − M = 12 100 − 2.1M.",
      "The loan is repaid when the balance after n periods is zero. Here 12 100 − 2.1M = 0, so M = 12 100 ÷ 2.1 = $5761.90 per year, to the nearest cent."
    ],
    "remember": "Balance each period = balance × (1 + r) − M. Set the final balance to zero to find M.",
    "a": {
      "q": "Ravi borrows $1000 at 5% per period. He makes a repayment of $300 at the end of the first period. What is the balance after that repayment?",
      "opts": ["$750", "$700", "$735", "$1350"],
      "why": "Interest is added first: 1000 × 1.05 = 1050. Then the repayment comes off: 1050 − 300 = 750. $735 is wrong because it takes the repayment off before adding interest.",
      "clue": "Add the interest to the balance, then take off the repayment."
    },
    "b": {
      "d": 3,
      "q": "Lena borrows $2000 at 10% per year. She repays it with 2 equal repayments at the end of each year. What is each repayment, to the nearest cent?",
      "opts": ["$1152.38", "$1210.00", "$1100.00", "$1047.62"],
      "why": "After year 1 the balance is 2000 × 1.1 − M = 2200 − M. After year 2 it is 2420 − 2.1M. Setting this to zero gives M = 2420 ÷ 2.1 = $1152.38. $1210 is wrong because it halves 2420 and ignores that the first repayment cuts the interest in year 2.",
      "clue": "Write the balance after each year, then set the second one to zero."
    }
  },
  "mat-using-tables-interest-factors": {
    "title": "Using tables of interest factors",
    "card": [
      "An interest factor table gives the value of an annuity of $1 per period. Find the row for the number of periods and the column for the rate per period.",
      [
        "Future value",
        "Use this when you want the total at the end of the payments. Factors for $1: 2% for 4 periods is 4.1216, 2% for 5 periods is 5.2040, 3% for 5 periods is 5.3091."
      ],
      [
        "Present value",
        "Use this when you want the lump sum needed now. Factors for $1: 2% for 5 periods is 4.7135, 3% for 5 periods is 4.5797."
      ],
      "Multiply the payment by the factor. Example: $100 paid each period for 5 periods at 2% has a future value of 100 × 5.2040 = $520.40."
    ],
    "remember": "Payment × factor. Use a future value factor for the end total and a present value factor for the sum now.",
    "a": {
      "q": "Mia deposits $500 at the end of each year for 5 years. Interest is 2% per year, compounded yearly. What is the future value of her deposits?",
      "opts": ["$2602.00", "$2356.75", "$2654.55", "$2500.00"],
      "why": "Mia wants the total at the end, so use the future value factor for 2% and 5 periods: 500 × 5.2040 = $2602.00. The present value factor gives $2356.75, which is the lump sum needed now, not the total at the end.",
      "clue": "Does she want a total at the end or a sum now?"
    },
    "b": {
      "d": 3,
      "q": "Sam wants to receive $2000 at the end of each year for 5 years. The account earns 3% per year, compounded yearly. What lump sum must he put in now?",
      "opts": ["$9159.40", "$10618.20", "$9427.00", "$10000.00"],
      "why": "A lump sum needed now uses the present value factor for 3% and 5 periods: 2000 × 4.5797 = $9159.40. The future value factor gives $10618.20, which is tempting but is the total at the end, not the sum needed now.",
      "clue": "Is Sam's money needed at the start or built up by the end?"
    }
  }
};
