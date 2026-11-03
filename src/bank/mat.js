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
        "The circle is the graph of a valid function",
        "The circle is a function only when x is above 0",
        "The circle is not a relation of x and y values"
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
        "Both rise steadily from left to right",
        "Both cross the x-axis at the point x = 1",
        "Both have the y-intercept 3 on the y-axis"
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
        "An inflection point, as f''(x) = 0 when x = 0 on the curve",
        "An inflection point, as the curve is concave up near x = 0",
        "Not an inflection point, as f''(x) is negative near x = 0"
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
  },
  "mat-substituting-into-formulas": {
    "title": "Substituting into formulas",
    "card": [
      "A formula is a rule that links letters. To substitute, replace each letter with its number and write the numbers in brackets if they could be confused with signs.",
      "Then work it out in the usual order: brackets first, then powers, then × and ÷ from left to right, then + and − from left to right.",
      "Example: speed s = d ÷ t. For d = 150 and t = 3, s = 150 ÷ 3 = 50.",
      "Example: A = ½bh with b = 6 and h = 4. A = ½ × 6 × 4 = 3 × 4 = 12. Another: P = 2l + 2w with l = 5 and w = 3 gives P = 10 + 6 = 16, because the × is done before the +."
    ],
    "remember": "Replace each letter with its number, then follow the order of operations.",
    "a": {
      "q": "Using P = 2l + 2w, what is P when l = 7 and w = 4?",
      "opts": ["22", "64", "18", "51"],
      "why": "P = 2 × 7 + 2 × 4 = 14 + 8 = 22. The answer 64 comes from working strictly left to right: 2 × 7 = 14, then 14 + 2 = 16, then 16 × 4 = 64, which does the + before the second ×. The answer 18 comes from forgetting to double w, giving 14 + 4.",
      "clue": "Do each multiplication before the addition."
    },
    "b": {
      "d": 2,
      "q": "Dana cycles 36 km in 3 hours. Using s = d ÷ t, what is her speed in km/h?",
      "opts": ["12", "108", "39", "33"],
      "why": "s = 36 ÷ 3 = 12 km/h. The answer 108 comes from multiplying d and t instead of dividing. The answers 39 and 33 come from adding or subtracting the two numbers.",
      "clue": "Distance goes on top, time goes underneath."
    }
  },
  "mat-changing-subject-formula": {
    "title": "Changing the subject of a formula",
    "card": [
      "The subject of a formula is the letter on its own on one side. In v = d ÷ t, the subject is v.",
      "To change the subject, do the same operation to both sides. Undo operations on the wanted letter in reverse order, so the last one applied is undone first.",
      "Example: make d the subject of v = d ÷ t. Multiply both sides by t. This gives v × t = d, so d = vt.",
      "Example: make x the subject of y = 3x + 2. Subtract 2 from both sides: y − 2 = 3x. Then divide both sides by 3: x = (y − 2) ÷ 3."
    ],
    "remember": "Do the same to both sides, and undo the steps in reverse order.",
    "a": {
      "q": "Make m the subject of P = 4m − 5",
      "opts": ["m = (P + 5) ÷ 4", "m = (P − 5) ÷ 4", "m = P ÷ 4 + 5", "m = 4(P + 5)"],
      "why": "First add 5 to both sides: P + 5 = 4m. Then divide both sides by 4 to get m = (P + 5) ÷ 4. Option m = P ÷ 4 + 5 is tempting, but it divides only part of the right side, so the 5 is not divided by 4.",
      "clue": "Undo the subtraction first, then the multiplication."
    },
    "b": {
      "d": 3,
      "q": "The formula C = 5F ÷ 9 is rearranged to make F the subject. Which result is correct?",
      "opts": ["F = 9C ÷ 5", "F = 5C ÷ 9", "F = C ÷ 45", "F = 9C − 5"],
      "why": "Multiply both sides by 9: 9C = 5F. Then divide both sides by 5: F = 9C ÷ 5. Option F = 5C ÷ 9 is tempting, but it swaps the numbers and does not undo the operations.",
      "clue": "Undo the division by 9 first, then undo the multiplication by 5."
    }
  },
  "mat-solving-linear-equations": {
    "title": "Solving linear equations",
    "card": [
      "A linear equation has one unknown, such as x, and no powers of x higher than 1 (no x², x³ and so on). To solve it, find the value of x that makes both sides equal.",
      "Undo the operations in reverse order, doing the same to both sides each time. In an equation without brackets, undo any addition or subtraction first, then undo multiplication or division.",
      "With brackets, expand them first or divide both sides by the number outside. With a fraction such as x/4, multiply both sides by the bottom number.",
      "Example: 3(x + 2) = 21. Divide both sides by 3 to get x + 2 = 7. Subtract 2 to get x = 5. Check: 3 × (5 + 2) = 3 × 7 = 21, so x = 5 is correct."
    ],
    "remember": "Do the same to both sides, undo in reverse order, then check by substituting.",
    "a": {
      "q": "Solve 2x + 5 = 17.",
      "opts": ["x = 6", "x = 11", "x = 12", "x = 3.5"],
      "why": "Subtract 5 from both sides to get 2x = 12, then divide by 2 to get x = 6. Check: 2 × 6 + 5 = 17. Choosing x = 11 comes from adding 5 instead of subtracting it, and x = 12 comes from skipping the division by 2.",
      "clue": "Undo the addition before the multiplication."
    },
    "b": {
      "d": 3,
      "q": "Mia solves 4(x − 3) = 20. What is x?",
      "opts": ["x = 8", "x = 2", "x = 5", "x = 5.75"],
      "why": "Divide both sides by 4 to get x − 3 = 5, then add 3 to get x = 8. Check: 4 × (8 − 3) = 4 × 5 = 20. Choosing x = 5 comes from dividing by 4 but forgetting to add 3 back.",
      "clue": "Divide by the number outside the bracket, then undo the subtraction."
    }
  },
  "mat-formulas-with-units": {
    "title": "Formulas with units",
    "card": [
      "Every measurement in a formula has a unit. Before you substitute, check that the units match what the formula needs and what the answer should be in.",
      "If a unit does not match, convert it first. Common conversions: 60 minutes = 1 hour, 1000 m = 1 km, 100 cm = 1 m.",
      "To change minutes to hours, divide by 60. For hours and minutes, convert only the minutes: 2 hours 15 minutes = 2 + 15 ÷ 60 = 2.25 hours, not 2.15 hours.",
      "Example: speed = distance ÷ time. A cyclist rides 12 km in 30 minutes. Change 30 minutes to 0.5 hours. Then speed = 12 ÷ 0.5 = 24 km/h."
    ],
    "remember": "Convert to matching units first, then substitute.",
    "a": {
      "q": "Zara walks 3 km in 45 minutes. To find her speed in km/h, what time should be put into speed = distance ÷ time?",
      "opts": ["0.75 hours", "45 hours", "4.5 hours", "0.45 hours"],
      "why": "Minutes change to hours by dividing by 60, and 45 ÷ 60 = 0.75. Writing 0.45 hours is tempting but wrong, because an hour has 60 minutes, not 100.",
      "clue": "Divide minutes by 60 to get hours."
    },
    "b": {
      "d": 2,
      "q": "Leon drives 90 km in 1 hour 30 minutes. What is his average speed, using speed = distance ÷ time?",
      "opts": ["60 km/h", "69.2 km/h", "90 km/h", "1 km/h"],
      "why": "1 hour 30 minutes is 1 + 30 ÷ 60 = 1.5 hours, so speed = 90 ÷ 1.5 = 60 km/h. Writing the time as 1.3 hours gives 90 ÷ 1.3 ≈ 69.2, which is wrong because 30 minutes is half an hour, not 0.3 of an hour.",
      "clue": "Change 30 minutes to part of an hour first."
    }
  },
  "mat-writing-equations-from-words": {
    "title": "Writing equations from words",
    "card": [
      "Choose a letter for the unknown amount, such as n for the number of gigabytes. Then turn each part of the story into maths.",
      "A fixed amount is added once. An amount per item is multiplied by the number of items. Total cost = fixed fee + cost per item × number of items.",
      "Words like total, is or costs show where the equals sign goes. Then solve the equation by undoing operations in reverse order.",
      "Example: a phone plan costs $20 a month plus $3 per GB. Zara's bill was $38. Write 20 + 3n = 38. Subtract 20 to get 3n = 18, then divide by 3 to get n = 6 GB."
    ],
    "remember": "Name the unknown, build the equation from the story, then solve it.",
    "a": {
      "q": "A gym charges a $15 joining fee plus $4 per class. Sam paid $47 in total. Which equation finds the number of classes, c?",
      "opts": ["15 + 4c = 47", "4 + 15c = 47", "(15 + 4) × c = 47", "15c + 4c = 47"],
      "why": "The joining fee is paid once, so 15 is added. The $4 is paid for each class, so it is multiplied by c. Swapping them, as in 4 + 15c, would charge $15 per class.",
      "clue": "Which amount is paid once, and which is paid for each class?"
    },
    "b": {
      "d": 2,
      "q": "Ella's phone plan costs $25 a month plus $2 per GB. Her bill was $41. How many GB did she use?",
      "opts": ["8 GB", "16 GB", "33 GB", "13 GB"],
      "why": "The equation is 25 + 2n = 41. Subtract 25 to get 2n = 16, then divide by 2 to get n = 8. Choosing 16 forgets the last step of dividing by 2.",
      "clue": "Undo the fixed fee first, then the cost per GB."
    }
  },
  "mat-gradient-as-rate-change": {
    "title": "Gradient as a rate of change",
    "card": [
      "The gradient of a line measures how steep it is. Gradient = rise ÷ run, where rise is the change in y and run is the change in x.",
      "Pick two points on the line. Subtract the y values for the rise and the x values for the run, in the same order. A line that goes up from left to right has a positive gradient.",
      "In context, the gradient is a rate: the change in y for each 1 unit of x. Its unit is the y unit per x unit, such as dollars per hour or litres per minute.",
      "Example: a graph of money earned ($) against hours worked passes through (2, 30) and (5, 75). Rise = 75 − 30 = 45. Run = 5 − 2 = 3. Gradient = 45 ÷ 3 = 15, so the rate is $15 per hour."
    ],
    "remember": "Gradient = rise ÷ run, and in context it is the rate of change in y per 1 unit of x.",
    "a": {
      "q": "A line passes through (1, 7) and (4, 19). What is its gradient?",
      "opts": ["4", "3", "12", "1/4"],
      "why": "Rise = 19 − 7 = 12 and run = 4 − 1 = 3, so the gradient is 12 ÷ 3 = 4. The answer 1/4 comes from dividing run by rise, which is the wrong way round.",
      "clue": "Divide the change in y by the change in x."
    },
    "b": {
      "d": 2,
      "q": "Sam fills a tank. The graph of litres in the tank against minutes passes through (2, 50) and (6, 130). What is the rate of filling?",
      "opts": ["20 litres per minute", "80 litres per minute", "25 litres per minute", "0.05 litres per minute"],
      "why": "Rise = 130 − 50 = 80 litres and run = 6 − 2 = 4 minutes, so the rate is 80 ÷ 4 = 20 litres per minute. The answer 80 is only the rise, and it skips the division by the run.",
      "clue": "Find the rise and the run first, then divide."
    }
  },
  "mat-y-intercept-context": {
    "title": "The y-intercept in context",
    "card": [
      "The y-intercept is the value of y when x is zero. On a graph, it is the point where the line crosses the vertical axis.",
      "In a real situation, it is the starting amount, before anything has changed. Often it is a fixed cost, such as a call-out fee, which is paid even if the job takes no time.",
      "To find it from a table, look for the row where x = 0. If there is no such row, work backwards using the rate of change.",
      "Example: a plumber charges $60 to arrive, then $40 for each hour of work. When hours = 0, the cost is $60. So the y-intercept is $60, the call-out fee."
    ],
    "remember": "The y-intercept is the value of y when x is zero: the starting amount.",
    "a": {
      "q": "A tutor's cost C (in dollars) for h hours is shown on a graph. The line crosses the vertical axis at C = 25. What does this 25 mean?",
      "opts": [
        "The fixed fee charged before any hours are worked",
        "The extra cost for each hour of tutoring",
        "The number of hours that cost nothing",
        "The cost of tutoring for 25 hours"
      ],
      "why": "The line crosses the axis where h = 0, so 25 is the cost with no hours worked. That is a fixed fee. The cost for each extra hour is the gradient, not the y-intercept.",
      "clue": "What is the number of hours at the point where the line meets the vertical axis?"
    },
    "b": {
      "d": 2,
      "q": "Jaya hires a bike. The table shows the total cost, $C, for h hours: h = 1 gives $18, h = 2 gives $26, h = 3 gives $34. What is the y-intercept, and what does it mean?",
      "opts": [
        "$10, the fixed hire fee",
        "$8, the fixed hire fee",
        "$10, the cost for each hour",
        "$8, the cost for each hour"
      ],
      "why": "The cost rises by $8 each hour, so one hour earlier the cost was $18 − $8 = $10. At h = 0 the cost is $10, which is the fixed fee. The $8 is the rate of change per hour, so it is the gradient.",
      "clue": "Work backwards one hour from h = 1 using the rise in cost."
    }
  },
  "mat-equation-y-mx-c": {
    "title": "The equation y = mx + c",
    "card": [
      "A straight line has the equation y = mx + c. The letter m is the gradient, and c is the y-intercept, where the line crosses the y-axis.",
      [
        "Write it",
        "put the gradient in for m and the y-intercept in for c. A line with gradient 3 and y-intercept −2 has the equation y = 3x − 2."
      ],
      [
        "Graph it",
        "plot the point (0, c) on the y-axis. Then use the gradient as rise over run to find a second point, and join the points with a straight line."
      ],
      [
        "Read it",
        "for a line that crosses the y-axis at 4 and rises 2 for every 1 across, m = 2 and c = 4. So the equation is y = 2x + 4."
      ]
    ],
    "remember": "In y = mx + c, m is the steepness of the line and c is where it crosses the y-axis.",
    "a": {
      "q": "What is the equation of a line with gradient 2 and y-intercept −5?",
      "opts": ["y = 2x − 5", "y = −5x + 2", "y = 2x + 5", "y = −2x − 5"],
      "why": "The gradient 2 goes in for m and the y-intercept −5 goes in for c, so y = 2x − 5. The equation y = −5x + 2 is tempting, but it swaps the gradient and the y-intercept.",
      "clue": "m comes before x, and c is the number added at the end."
    },
    "b": {
      "d": 2,
      "q": "A line crosses the y-axis at 3. Starting from that point, it rises 4 for every 2 units across. What is its equation?",
      "opts": ["y = 2x + 3", "y = 4x + 3", "y = 2x + 4", "y = 3x + 2"],
      "why": "The gradient is rise over run, which is 4 ÷ 2 = 2, and the y-intercept is 3. So y = 2x + 3. The equation y = 4x + 3 is tempting, but it uses the rise as the gradient without dividing by the run.",
      "clue": "Divide the rise by the run to find m."
    }
  },
  "mat-direct-variation": {
    "title": "Direct variation",
    "card": [
      "Two quantities are in direct variation when y = kx. We say y is directly proportional to x. The number k is the constant of variation.",
      "If x doubles, y doubles. If x is 0, y is 0. The graph is a straight line through the origin (0, 0).",
      "To find k, divide y by x using one known pair. k = y ÷ x. Then use y = kx to find other values.",
      "Example: y is directly proportional to x, and y = 12 when x = 3. Then k = 12 ÷ 3 = 4, so y = 4x. When x = 5, y = 4 × 5 = 20."
    ],
    "remember": "In direct variation, y = kx: find k by dividing y by x, and the line passes through the origin.",
    "a": {
      "q": "y is directly proportional to x, and y = 35 when x = 7. What is the constant of variation k?",
      "opts": ["5", "28", "42", "245"],
      "why": "k = y ÷ x = 35 ÷ 7 = 5. Check: 5 × 7 = 35. The value 245 comes from multiplying 35 × 7, which is not how k is found.",
      "clue": "Divide y by x."
    },
    "b": {
      "d": 3,
      "q": "Mia is paid at a fixed rate per hour, so her pay is directly proportional to hours worked. She earns $96 for 4 hours. How much does she earn for 7 hours?",
      "opts": ["$168", "$99", "$120", "$672"],
      "why": "k = 96 ÷ 4 = 24 dollars per hour, so pay = 24 × 7 = $168. Adding the 3 extra hours to $96 gives $99, which treats hours as dollars. Multiplying $96 by 7 gives $672, which skips finding the pay for one hour, and $120 adds only one extra hour of pay.",
      "clue": "Find the pay for one hour first."
    }
  },
  "mat-linear-models": {
    "title": "Linear models",
    "card": [
      "A linear model uses a straight-line equation to describe how two quantities are related. It is written y = mx + c, where m is the rate of change and c is the starting amount.",
      "To predict, put a value of x into the equation and work out y. Example: a taxi charges C = 3 + 2d, where C is the cost in dollars and d is the distance in km. For 10 km, C = 3 + 2 × 10 = 23, so the cost is $23.",
      "To find x from a known y, put y into the equation and solve. If C = 17, then 17 = 3 + 2d, so 2d = 14 and d = 7 km.",
      "A model is only built from real data in a certain range. Predicting outside that range is extrapolation, and the model may stop being accurate there, because the real pattern may not stay a straight line."
    ],
    "remember": "Put x in to predict y, but be careful of predictions outside the data the model came from.",
    "a": {
      "q": "A plumber's charge is C = 60 + 45h, where C is the cost in dollars and h is the hours worked. What is the cost of a 3 hour job?",
      "opts": ["$195", "$108", "$135", "$8,100"],
      "why": "C = 60 + 45 × 3 = 60 + 135 = 195, so the cost is $195. The answer $135 leaves out the $60 starting amount, and $108 comes from adding all three numbers, 60 + 45 + 3, instead of multiplying 45 by 3.",
      "clue": "Multiply first, then add the starting amount."
    },
    "b": {
      "d": 3,
      "q": "Sam's plant height model is H = 5 + 2t, where H is height in cm and t is days. It was made from data for days 1 to 10. Which prediction is least reliable?",
      "opts": ["The height at day 60", "The height at day 4", "The height at day 9", "The height at day 10"],
      "why": "Day 60 is far outside the data from days 1 to 10, so it is extrapolation and the plant may not keep growing at the same rate. Days 4, 9 and 10 are inside the range the model was built from, so they are more reliable.",
      "clue": "Which day is furthest from the data used to make the model?"
    }
  },
  "mat-wages-salaries": {
    "title": "Wages and salaries",
    "card": [
      ["Wage", "Pay for each hour worked. Weekly wage = hourly rate × hours worked in the week."],
      [
        "Salary",
        "A fixed amount for the year, paid in equal instalments. These are often weekly, fortnightly or monthly."
      ],
      "To find one payment from a salary, divide by the number of payments in the year: 52 weeks, 26 fortnights or 12 months.",
      "Example: a salary of $62 400 paid fortnightly gives $62 400 ÷ 26 = $2400 each fortnight. To get a yearly figure from a weekly wage, multiply by 52."
    ],
    "remember": "Salary ÷ number of payments gives one payment. Payment × number of payments gives the year.",
    "a": {
      "q": "Priya earns a salary of $54 600 a year, paid weekly. How much is each weekly payment?",
      "opts": ["$1050", "$2100", "$4550", "$1092"],
      "why": "There are 52 weeks in a year, so $54 600 ÷ 52 = $1050. Dividing by 26 gives $2100, which is a fortnightly payment, not a weekly one.",
      "clue": "How many weekly payments are there in a year?"
    },
    "b": {
      "d": 3,
      "q": "Sam is paid $28 an hour and works 35 hours a week, all year. Pay is the same every week. What is his yearly pay?",
      "opts": ["$50 960", "$980", "$25 480", "$101 920"],
      "why": "Weekly pay is $28 × 35 = $980. Yearly pay is $980 × 52 = $50 960. The answer $25 480 comes from using 26, which is the number of fortnights, not weeks.",
      "clue": "Find the weekly pay first, then count the weeks in a year."
    }
  },
  "mat-overtime-penalty-rates": {
    "title": "Overtime and penalty rates",
    "card": [
      [
        "Overtime",
        "hours worked beyond a worker's normal hours, such as past 38 hours in a week. Overtime is paid at a higher rate than the normal hourly rate."
      ],
      [
        "Penalty rate",
        "a higher rate paid for work at certain times, such as nights, weekends or public holidays, even within normal hours."
      ],
      "Time-and-a-half pays 1.5 times the normal rate, and double time pays 2 times. For each type of hour, pay = hours × normal rate × multiplier, then add these for total pay.",
      "Example: the normal rate is $20 an hour. Ali works 8 normal hours and 2 overtime hours at time-and-a-half. Normal pay is 8 × $20 = $160. Overtime pay is 2 × $20 × 1.5 = $60. Total pay is $220."
    ],
    "remember": "Work out hours × normal rate × multiplier for each type of hour, then add the amounts.",
    "a": {
      "q": "Priya's normal rate is $24 an hour. What is her hourly rate at time-and-a-half?",
      "opts": ["$36", "$48", "$25.50", "$12"],
      "why": "Time-and-a-half is 1.5 times the normal rate, so 24 × 1.5 = $36. The tempting $48 uses a multiplier of 2, which is double time.",
      "clue": "Time-and-a-half means 1.5 times the normal rate."
    },
    "b": {
      "d": 3,
      "q": "Tom earns $18 an hour. One week he works 38 normal hours and 4 hours at double time. What is his total pay for the week?",
      "opts": ["$828", "$756", "$684", "$720"],
      "why": "Normal pay is 38 × 18 = $684. Double time pay is 4 × 18 × 2 = $144. The total is 684 + 144 = $828. The option $756 comes from paying the 4 extra hours at the normal rate and forgetting the multiplier.",
      "clue": "Find the normal pay and the double time pay separately, then add them."
    }
  },
  "mat-commission-piecework": {
    "title": "Commission and piecework",
    "card": [
      ["Commission", "Pay worked out as a percentage of the value of what a person sells. Commission = rate × sales."],
      [
        "Piecework",
        "Pay worked out as a fixed amount for each item made or task done. Piecework pay = rate per item × number of items."
      ],
      [
        "Example",
        "Sam sells $12 000 of furniture at 5% commission. Commission = 0.05 × 12 000 = $600. Ana is paid $4 for each scarf she sews and sews 30. Pay = 4 × 30 = $120."
      ],
      "Some workers get a base wage or salary and commission on top. Add the two to find total pay."
    ],
    "remember": "Commission pays a percentage of sales. Piecework pays a set amount per item or task.",
    "a": {
      "q": "Leila earns 4% commission on her sales. She sells $15 000 of solar panels in a month. How much commission does she earn?",
      "opts": ["$600", "$375", "$3750", "$6000"],
      "why": "Commission = 4% × 15 000 = 0.04 × 15 000 = $600. Dividing 15 000 by 4 gives $3750, which treats 4% as 1/4 and is wrong.",
      "clue": "Change 4% to a decimal, then multiply by the sales."
    },
    "b": {
      "d": 3,
      "q": "Tom is paid a base wage of $500 a week plus 3% commission on his sales. In one week he sells $8000 of goods. What is his total pay for the week?",
      "opts": ["$740", "$240", "$524", "$8500"],
      "why": "Commission = 0.03 × 8000 = $240. Total pay = base wage + commission = 500 + 240 = $740. Giving $240 leaves out the base wage.",
      "clue": "Work out the commission first, then add the base wage."
    }
  },
  "mat-taxable-income": {
    "title": "Taxable income",
    "card": [
      [
        "Gross income",
        "all the money a person earns in a year before anything is taken out. It includes wages, salary, commission and interest."
      ],
      [
        "Deduction",
        "an allowable expense that can be taken off gross income, such as work tools, a work uniform or a union fee. Everyday costs like groceries are not deductions."
      ],
      [
        "Taxable income",
        "gross income − allowable deductions. Income tax is worked out on this amount, not on gross income."
      ],
      "Example: Sam earns $64 000 in a year and has $1 200 of allowable deductions. Taxable income = $64 000 − $1 200 = $62 800."
    ],
    "remember": "Taxable income is what is left after deductions, and tax is worked out on it.",
    "a": {
      "q": "Priya has a gross income of $52 000 and allowable deductions of $900. What is her taxable income?",
      "opts": ["$51 100", "$52 900", "$900", "$51 000"],
      "why": "Taxable income = gross income − deductions = $52 000 − $900 = $51 100. Adding the deductions gives $52 900, but deductions are taken off, not added.",
      "clue": "Deductions are taken away from gross income."
    },
    "b": {
      "d": 2,
      "q": "Tom earns $78 500 in a year. He spends $650 on work boots and $350 on a union fee, both allowable. Tax is worked out on which amount?",
      "opts": ["$77 500", "$78 500", "$79 500", "$1 000"],
      "why": "Total deductions are $650 + $350 = $1 000. Taxable income = $78 500 − $1 000 = $77 500, and tax is worked out on this. Using $78 500 is tempting, but that is gross income, before deductions.",
      "clue": "Add the deductions first, then subtract them."
    }
  },
  "mat-income-tax-net-pay": {
    "title": "Income tax and net pay",
    "card": [
      "Income tax is worked out on taxable income using a tax table with brackets. Each bracket has its own rate, and the rates can change, so always use the table you are given.",
      "Example table: $0 to $18,200 pays no tax. $18,201 to $45,000 pays 16c for each $1 over $18,200. $45,001 to $135,000 pays $4,288 plus 30c for each $1 over $45,000.",
      "The Medicare levy is a separate amount for public health care. Here it is 2% of taxable income. Example: taxable income $60,000 gives tax of $4,288 + 0.30 × $15,000 = $8,788, and a levy of 0.02 × $60,000 = $1,200.",
      "Net pay is take-home pay. Net pay = gross income − income tax − Medicare levy − other deductions, such as union fees. Gross income is total pay before anything is taken out."
    ],
    "remember": "Find the tax from the table, add the Medicare levy, then take both and any other deductions off the gross income.",
    "a": {
      "q": "Using the example table, what is the income tax on a taxable income of $30,000?",
      "opts": ["$1,888", "$4,800", "$2,912", "$11,800"],
      "why": "Only the part over $18,200 is taxed at 16c per $1. That is $30,000 − $18,200 = $11,800, and 0.16 × $11,800 = $1,888. Taking 16% of the whole $30,000 gives $4,800, but the first $18,200 is not taxed at that rate.",
      "clue": "Find how much of the income is over $18,200 first."
    },
    "b": {
      "d": 3,
      "q": "Sam earns a gross income of $50,000 a year and has no allowable deductions, so his taxable income is also $50,000. Using the example table and a 2% Medicare levy, what is his net pay if $600 in union fees also comes out of his pay?",
      "opts": ["$42,612", "$43,612", "$43,212", "$33,400"],
      "why": "Tax is $4,288 + 0.30 × $5,000 = $5,788, and the levy is 0.02 × $50,000 = $1,000. Net pay = $50,000 − $5,788 − $1,000 − $600 = $42,612. $43,612 is tempting, but it leaves out the Medicare levy.",
      "clue": "Three amounts come off the gross income, not two."
    }
  },
  "mat-budgeting": {
    "title": "Budgeting",
    "card": [
      "A budget is a plan for the money you expect to earn and spend. List all income, such as wages, then list all expenses.",
      ["Fixed cost", "an expense that stays the same each period, such as rent, insurance or a gym membership."],
      ["Variable cost", "an expense that changes from one period to the next, such as food or petrol."],
      "Savings = income − expenses. Example: Zoe earns $900 a fortnight. Rent is $400 and food is $150. Other costs are $200. Expenses are $750, so she can save $900 − $750 = $150."
    ],
    "remember": "A budget compares income with expenses. What is left over can be saved.",
    "a": {
      "q": "Which of these is a variable cost for a household?",
      "opts": [
        "Weekly groceries for the household",
        "Weekly rent for the unit",
        "Monthly car insurance payment",
        "Monthly gym membership fee"
      ],
      "why": "Food costs change from one week to the next, so groceries are a variable cost. Rent, insurance and a gym membership stay the same each period, so they are fixed. Rent is the most tempting wrong option because it is paid weekly too, but the amount does not change.",
      "clue": "Which amount would differ from one week to the next?"
    },
    "b": {
      "d": 2,
      "q": "Liam earns $1200 a fortnight. His expenses are rent $520, food $210, transport $90 and other costs $180. How much can he save each fortnight?",
      "opts": ["$200", "$1000", "$380", "$2200"],
      "why": "Expenses are 520 + 210 + 90 + 180 = $1000. Savings = 1200 − 1000 = $200. Giving $1000 is a mistake, because that is the total of the expenses, not what is left. $380 leaves out the other costs.",
      "clue": "Add up every expense first, then subtract from income."
    }
  },
  "mat-simple-interest": {
    "title": "Simple interest",
    "card": [
      "Simple interest is worked out only on the starting amount, called the principal. The interest is not added to the principal each period, so it never earns interest itself.",
      "The formula is I = Prn. I is the interest, P is the principal, r is the interest rate per period as a decimal, and n is the number of periods.",
      "The rate and the time must use the same unit. A rate of 6% per year needs n in years, so 6 months is n = 0.5.",
      "Example: $2000 at 5% per year for 3 years. I = 2000 × 0.05 × 3 = $300. The total amount after 3 years is $2000 + $300 = $2300."
    ],
    "remember": "Simple interest is the same every period, because it is always worked out on the principal.",
    "a": {
      "q": "Ben invests $4000 at 3% per year simple interest for 2 years. How much interest does he earn?",
      "opts": ["$240", "$120", "$4240", "$24 000"],
      "why": "I = 4000 × 0.03 × 2 = $240. $4240 is the total amount after 2 years, the principal plus the interest, but the question asks for the interest alone. $24 000 comes from using 3 instead of 0.03.",
      "clue": "Write 3% as a decimal before you multiply."
    },
    "b": {
      "d": 3,
      "q": "Priya borrows $5000 at 8% per year simple interest for 18 months. How much interest does she pay in total?",
      "opts": ["$600", "$7200", "$400", "$720"],
      "why": "The rate is per year, so 18 months is n = 1.5 years. I = 5000 × 0.08 × 1.5 = $600. Using n = 18 gives $7200, which mixes months with a yearly rate.",
      "clue": "Change the months into years first."
    }
  },
  "mat-compound-interest-by-repeated": {
    "title": "Compound interest by repeated calculation",
    "card": [
      "With compound interest, the interest is added to the balance at the end of each period. In the next period, interest is earned on the new, larger balance.",
      "To work it out, find the interest for one period, add it to the balance, then repeat. Interest for a period = balance × rate for that period.",
      "Example: $1000 at 10% per year for 2 years. Year 1: 10% of $1000 = $100, so the balance is $1100. Year 2: 10% of $1100 = $110, so the balance is $1210.",
      "Simple interest on $1000 at 10% for 2 years is $200, so the balance would be $1200. Compound interest gave $210 because the year 1 interest earned interest."
    ],
    "remember": "Compound interest is added to the balance each period, so later interest is worked out on a bigger amount.",
    "a": {
      "q": "Ava invests $2000 at 5% per year, compounded yearly. What is the balance after 2 years?",
      "opts": ["$2205", "$2200", "$2100", "$2250"],
      "why": "Year 1: 5% of $2000 = $100, so the balance is $2100. Year 2: 5% of $2100 = $105, so the balance is $2205. $2200 is the simple interest answer, which works out interest on $2000 both years.",
      "clue": "Year 2 interest is worked out on the new balance."
    },
    "b": {
      "d": 3,
      "q": "Liam borrows $5000 at 10% per year, compounded yearly, and repays nothing for 3 years. How much more does he owe than with simple interest at the same rate?",
      "opts": ["$155", "$500", "$1655", "$150"],
      "why": "Compound: $5000 becomes $5500, then $6050, then $6655, so the interest is $1655. Simple interest is 3 × $500 = $1500. The difference is $155. $1655 is only the compound interest, not the difference.",
      "clue": "Find both interest amounts, then subtract."
    }
  },
  "mat-percentage-increase-decrease": {
    "title": "Percentage increase and decrease",
    "card": [
      [
        "Increase",
        "To raise an amount by a percentage, multiply by 100% plus the percentage. To increase by 15%, multiply by 1.15."
      ],
      [
        "Decrease",
        "To lower an amount by a percentage, multiply by 100% minus the percentage. To decrease by 20%, multiply by 0.8."
      ],
      ["Worked example", "A $60 jumper is discounted by 20%. New price = 60 × 0.8 = $48."],
      [
        "Backwards",
        "To find the original amount, divide the new amount by the multiplier. If $48 is the price after a 20% discount, original = 48 ÷ 0.8 = $60. Do not add 20% to $48."
      ]
    ],
    "remember": "Change forwards by multiplying by the multiplier. Go back to the original by dividing by it.",
    "a": {
      "q": "A $250 bike is discounted by 30%. What is the new price?",
      "opts": ["$175", "$325", "$220", "$75"],
      "why": "The multiplier is 100% − 30% = 70%, so 250 × 0.7 = $175. $75 is only the discount, not the new price.",
      "clue": "Multiply by 100% minus the percentage."
    },
    "b": {
      "d": 3,
      "q": "After a 20% discount, a pair of headphones in Perth costs $120. What was the price before the discount?",
      "opts": ["$150", "$144", "$96", "$140"],
      "why": "The sale price is 80% of the original, so original = 120 ÷ 0.8 = $150. Adding 20% of $120 gives $144, which is wrong because the 20% was taken from the original price, not from $120.",
      "clue": "$120 is 0.8 times the original price."
    }
  },
  "mat-gst": {
    "title": "GST",
    "card": [
      "GST is the Goods and Services Tax. In Australia it is 10% of the price on most goods and services. Some items, such as basic fresh food, do not have it.",
      [
        "Adding GST",
        "Multiply the price before GST by 1.1. Example: a $60 repair becomes $60 × 1.1 = $66. The GST is $6."
      ],
      [
        "Finding the GST",
        "A price with GST included is 110% of the original, so the GST is 1/11 of it. Divide the GST-inclusive price by 11."
      ],
      [
        "Example",
        "A jacket costs $154 with GST included. The GST is $154 ÷ 11 = $14. The price before GST is $154 − $14 = $140."
      ]
    ],
    "remember": "Add GST by multiplying by 1.1. To find the GST in a price that includes it, divide by 11.",
    "a": {
      "q": "A tradesperson charges $250 before GST. What is the price with 10% GST added?",
      "opts": ["$275", "$25", "$272.73", "$260"],
      "why": "The price with GST is $250 × 1.1 = $275. Adding $250 ÷ 11 = $22.73 gives $272.73, but that uses the wrong method: dividing by 11 finds the GST in a price that already includes it. Here the $250 is before GST, so the GST is 10% of it, which is $25.",
      "clue": "The new price is 110% of the starting price."
    },
    "b": {
      "d": 3,
      "q": "Mia pays $187 for a printer, and the price includes GST. How much of the $187 is GST?",
      "opts": ["$17", "$18.70", "$170", "$20.57"],
      "why": "The price includes GST, so the GST is $187 ÷ 11 = $17. Taking 10% of $187 gives $18.70, which is tempting but wrong, because $187 is 110% of the original price and not 100%.",
      "clue": "The $187 is already 110% of the price before GST."
    }
  },
  "mat-household-bills": {
    "title": "Household bills",
    "card": [
      "A fixed charge does not depend on how much is used. It is often a supply charge given as a daily rate, such as $1 a day for electricity.",
      "A usage charge depends on how much is used, such as cents per kilowatt hour (kWh) of electricity. Bill total = fixed charge + (usage × rate).",
      "Example: a supply charge of $1 a day for 90 days is $90. Using 600 kWh at 30 cents per kWh costs 600 × $0.30 = $180. The bill is $90 + $180 = $270.",
      "To compare two plans, work out the total cost of each for the same usage. The plan with the lower total is cheaper for that usage."
    ],
    "remember": "Total bill = fixed charge + usage charge. Compare plans using the same usage.",
    "a": {
      "q": "A water bill has a fixed charge of $60 for the bill and a usage charge of $2 per kilolitre. A household uses 40 kilolitres. What is the total bill?",
      "opts": ["$140", "$80", "$120", "$100"],
      "why": "The usage charge is 40 × $2 = $80. Adding the fixed charge gives $80 + $60 = $140. The $80 option leaves out the fixed charge, which does not depend on how much is used.",
      "clue": "Find the usage charge first, then add the fixed charge."
    },
    "b": {
      "d": 3,
      "q": "Two electricity plans each have a bill covering 90 days. Plan A has a supply charge of $90 for the whole bill and costs 25 cents per kWh. Plan B has a supply charge of $60 for the whole bill and costs 30 cents per kWh. Which plan is cheaper for 800 kWh, and by how much?",
      "opts": ["Plan A, by $10", "Plan B, by $10", "Plan A, by $30", "Plan B, by $30"],
      "why": "Plan A: $90 + 800 × $0.25 = $90 + $200 = $290. Plan B: $60 + 800 × $0.30 = $60 + $240 = $300. Plan B has the lower supply charge, but its higher rate costs more at this usage, so Plan A is cheaper by $10.",
      "clue": "Work out the full total for each plan before comparing."
    }
  },
  "mat-accuracy-measurements": {
    "title": "Accuracy of measurements",
    "card": [
      "No measurement is exact. An instrument can only show readings to its smallest unit, such as 1 mm on a ruler.",
      [
        "Absolute error",
        "half the smallest unit on the instrument. A ruler marked in 1 mm steps has an absolute error of 0.5 mm."
      ],
      [
        "Limits of accuracy",
        "the measurement minus the absolute error, up to the measurement plus the absolute error. The true value lies between these limits."
      ],
      "Example: a length is 24 cm, read from a ruler marked in whole centimetres. Absolute error = 1 ÷ 2 = 0.5 cm. Limits: 24 − 0.5 = 23.5 cm to 24 + 0.5 = 24.5 cm."
    ],
    "remember": "Absolute error is half the smallest unit. Limits are the reading plus and minus it.",
    "a": {
      "q": "A kitchen scale shows masses in steps of 2 g. What is its absolute error?",
      "opts": ["1 g", "2 g", "4 g", "0.5 g"],
      "why": "The absolute error is half the smallest unit, and 2 ÷ 2 = 1 g. Choosing 2 g is tempting, but that is the whole smallest unit, not half of it.",
      "clue": "Halve the size of the smallest step."
    },
    "b": {
      "d": 3,
      "q": "Priya measures a plank as 3.4 m, using a tape marked in steps of 0.1 m. What are the limits of accuracy?",
      "opts": ["3.35 m to 3.45 m", "3.3 m to 3.5 m", "3.39 m to 3.41 m", "3.375 m to 3.425 m"],
      "why": "The absolute error is 0.1 ÷ 2 = 0.05 m. So the limits are 3.4 − 0.05 = 3.35 m and 3.4 + 0.05 = 3.45 m. The range 3.3 m to 3.5 m uses the whole smallest unit instead of half.",
      "clue": "Halve 0.1 first, then subtract and add it."
    }
  },
  "mat-significant-figures-scientific-notation": {
    "title": "Significant figures and scientific notation",
    "card": [
      "Significant figures are the digits that carry meaning. Count from the first non-zero digit. Zeros between non-zero digits count. Zeros at the start never count.",
      "To round to a number of significant figures, keep that many digits from the first non-zero digit. Look at the next digit: 5 or more rounds up, 4 or less stays. Example: 0.004 738 to 2 significant figures is 0.0047.",
      "Scientific notation is a number that is at least 1 and less than 10, times a power of ten. Example: 45 000 = 4.5 × 10⁴, because the decimal point moves 4 places left.",
      "A small number has a negative power. Example: 0.0032 = 3.2 × 10⁻³, because the decimal point moves 3 places right."
    ],
    "remember": "Count significant figures from the first non-zero digit. Scientific notation is a number at least 1 and less than 10, times a power of ten.",
    "a": {
      "q": "What is 0.007 046 rounded to 3 significant figures?",
      "opts": ["0.00705", "0.00704", "0.007", "0.0070"],
      "why": "The first significant figure is 7. The three significant figures are 7, 0 and 4, and the next digit is 6, so the 4 rounds up to 5. This gives 0.00705. Rounding to 0.00704 ignores the 6 and leaves the 4 unchanged.",
      "clue": "Start counting at the first non-zero digit, then check the digit after the third."
    },
    "b": {
      "d": 3,
      "q": "A virus in a lab measures 0.000 000 12 m across. How is this written in scientific notation?",
      "opts": ["1.2 × 10⁻⁷ m", "1.2 × 10⁷ m", "1.2 × 10⁻⁶ m", "12 × 10⁻⁸ m"],
      "why": "The decimal point moves 7 places right to give 1.2, so the power is −7. The form 12 × 10⁻⁸ has the right value, but 12 is not less than 10. Using 10⁻⁶ moves the point only 6 places.",
      "clue": "Count the places the point moves to get a number at least 1 and less than 10."
    }
  },
  "mat-unit-conversions": {
    "title": "Unit conversions",
    "card": [
      "Length, mass and capacity: 1 m = 100 cm, 1 cm = 10 mm, 1 km = 1000 m, 1 kg = 1000 g, 1 L = 1000 mL. To go to a smaller unit, multiply. To go to a larger unit, divide.",
      "For area, square the length factor. 1 m = 100 cm, so 1 m² = 100 × 100 = 10 000 cm². For volume, cube it: 1 m³ = 100 × 100 × 100 = 1 000 000 cm³.",
      "1 cm³ holds 1 mL. So 1000 cm³ holds 1000 mL, which is 1 L.",
      "Worked example: 30 000 cm² to m². Divide by 10 000, because 1 m² = 10 000 cm². The answer is 3 m²."
    ],
    "remember": "Square the length factor for area and cube it for volume. 1 cm³ = 1 mL.",
    "a": {
      "q": "A rug has an area of 50 000 cm². What is its area in m²?",
      "opts": ["5 m²", "500 m²", "50 m²", "0.5 m²"],
      "why": "1 m² = 10 000 cm², so divide: 50 000 ÷ 10 000 = 5 m². Dividing by 100, the length factor, gives 500 m², which forgets to square the factor for an area.",
      "clue": "How many cm² are in 1 m²?"
    },
    "b": {
      "d": 3,
      "q": "A rainwater tank on a farm near Orange holds 0.6 m³ of water. How many litres is that?",
      "opts": ["600 L", "6 L", "6000 L", "600 000 L"],
      "why": "1 m³ = 1 000 000 cm³, so 0.6 m³ = 600 000 cm³, which holds 600 000 mL. Dividing by 1000 gives 600 L. Stopping at 600 000 forgets to change mL to L, and 6 L comes from squaring the length factor instead of cubing it.",
      "clue": "Change m³ to cm³ first, then cm³ to mL, then mL to L."
    }
  },
  "mat-perimeter-area": {
    "title": "Perimeter and area",
    "card": [
      [
        "Perimeter",
        "the distance around the outside of a shape, in units such as cm or m. Add the lengths of all the sides."
      ],
      [
        "Area",
        "the space inside a shape, in square units such as cm² or m². Rectangle: A = l × w. Triangle: A = ½ × b × h, where h is the height at right angles to the base."
      ],
      [
        "Trapezium and circle",
        "Trapezium: A = ½ × (a + b) × h, where a and b are the parallel sides. Circle: A = πr², and the perimeter (circumference) is C = 2πr."
      ],
      [
        "Composite shapes",
        "Split the shape into rectangles, triangles and so on, then add the areas, or subtract any part that is cut out. Example: a 6 m by 4 m rectangle with a triangle of base 6 m and height 3 m on top has area 24 + ½ × 6 × 3 = 24 + 9 = 33 m²."
      ]
    ],
    "remember": "Perimeter adds the sides. Area fills the inside, so split a complex shape into simple parts, then add or subtract.",
    "a": {
      "q": "A trapezium has parallel sides of 5 cm and 9 cm, and a height of 4 cm. What is its area?",
      "opts": ["28 cm²", "56 cm²", "36 cm²", "20 cm²"],
      "why": "A = ½ × (5 + 9) × 4 = ½ × 14 × 4 = 28 cm². Leaving out the ½ gives 56 cm², which is the tempting mistake. Using only one parallel side gives 36 cm² or 20 cm².",
      "clue": "Add the parallel sides, then multiply by the height and halve."
    },
    "b": {
      "d": 3,
      "q": "Mia's garden bed is an 8 m by 5 m rectangle with a right triangle cut out of one corner. The triangle has base 4 m and height 3 m. What is the area of the bed?",
      "opts": ["34 m²", "40 m²", "46 m²", "28 m²"],
      "why": "The rectangle is 8 × 5 = 40 m² and the triangle is ½ × 4 × 3 = 6 m², so the bed is 40 − 6 = 34 m². Adding the triangle instead of subtracting it gives 46 m², and not removing it gives 40 m². Forgetting the ½ removes 12 m² and gives 28 m².",
      "clue": "The triangle is cut out, so take its area away."
    }
  },
  "mat-surface-area": {
    "title": "Surface area",
    "card": [
      "Surface area is the total area of all the faces of a solid. It is measured in square units, such as cm² or m².",
      "To find it, work out the area of each face and add them. A rectangular prism has 6 rectangular faces, in 3 matching pairs.",
      "A cylinder has two circular ends and one curved side. The side unrolls into a rectangle. Its width is the circle's circumference (2 × π × r) and its height is the cylinder's height.",
      "Example: a box is 5 cm long, 3 cm wide and 2 cm high. Faces: 2 × (5 × 3) + 2 × (5 × 2) + 2 × (3 × 2) = 30 + 20 + 12 = 62 cm²."
    ],
    "remember": "Find the area of every face, then add them all.",
    "a": {
      "q": "A box is 4 cm long, 3 cm wide and 2 cm high. What is its surface area?",
      "opts": ["52 cm²", "24 cm²", "26 cm²", "40 cm²"],
      "why": "The pairs of faces are 2 × 12 + 2 × 8 + 2 × 6 = 24 + 16 + 12 = 52 cm². The 24 option is really the volume, 4 × 3 × 2, which would be 24 cm³, not an area. The 26 option counts each pair only once.",
      "clue": "Add the areas of all 6 faces, in 3 matching pairs."
    },
    "b": {
      "d": 3,
      "q": "A closed cube has sides of 5 cm. What is the total area of its faces?",
      "opts": ["150 cm²", "125 cm²", "100 cm²", "25 cm²"],
      "why": "Each face is 5 × 5 = 25 cm², and a cube has 6 faces, so 6 × 25 = 150 cm². The 125 cm² option is really the volume, 5 × 5 × 5, which should be 125 cm³, not an area. The 100 cm² option counts only 4 faces.",
      "clue": "A cube has 6 faces, and all of them are the same size."
    }
  },
  "mat-volume-capacity": {
    "title": "Volume and capacity",
    "card": [
      "Volume is the space inside a solid. For a prism or cylinder, V = base area × height. The base is the face that repeats along the height.",
      [
        "Prism",
        "find the area of the base shape first, then multiply by the height. A rectangular prism has V = l × w × h."
      ],
      [
        "Cylinder",
        "the base is a circle, so V = π × r² × h. Example: r = 3 cm and h = 10 cm gives V = π × 3² × 10 = 90π, which is about 283 cm³."
      ],
      [
        "Capacity",
        "capacity is how much liquid a container holds. 1 cm³ holds 1 mL, and 1000 cm³ holds 1 L. So a volume of 2000 cm³ has a capacity of 2 L."
      ]
    ],
    "remember": "Volume is base area × height. Use 1 cm³ = 1 mL to turn volume into capacity.",
    "a": {
      "q": "A rectangular tank has a base 20 cm by 10 cm and a height of 5 cm. What is its volume?",
      "opts": ["1000 cm³", "200 cm³", "350 cm³", "100 cm³"],
      "why": "Base area = 20 × 10 = 200 cm². Volume = 200 × 5 = 1000 cm³. Finding only the base area, 200 cm³, skips the multiplication by the height.",
      "clue": "Find the base area first, then use the height."
    },
    "b": {
      "d": 3,
      "q": "A cylindrical water tank has a base radius of 10 cm and a height of 20 cm. About how many litres can it hold?",
      "opts": ["6.3 L", "2.0 L", "0.63 L", "6283 L"],
      "why": "V = π × 10² × 20 = 2000π, which is about 6283 cm³. Since 1000 cm³ holds 1 L, the capacity is about 6.3 L. Leaving out π gives 2000 cm³, or 2.0 L, and 6283 L forgets to divide by 1000.",
      "clue": "Find the volume in cm³ first, then change cm³ to litres."
    }
  },
  "mat-latitude-longitude": {
    "title": "Latitude and longitude",
    "card": [
      [
        "Latitude",
        "measures degrees north or south of the equator. The equator is 0°, and the poles are 90° N and 90° S."
      ],
      [
        "Longitude",
        "measures degrees east or west of the prime meridian, which runs through Greenwich in London. The prime meridian is 0°, and longitude goes up to 180° E and 180° W."
      ],
      "Latitude is written first, then longitude. Together they give the position of a place, such as Sydney at about 34° S, 151° E.",
      "Lines of latitude run east to west, and each one is a circle around the Earth. Lines of longitude run from the North Pole to the South Pole."
    ],
    "remember": "Latitude is the angle north or south. Longitude is the angle east or west.",
    "a": {
      "q": "Which place is in the southern hemisphere and east of the prime meridian?",
      "opts": ["34° S, 151° E", "34° N, 151° E", "34° S, 151° W", "34° N, 151° W"],
      "why": "S means south of the equator and E means east of the prime meridian. 34° N is north of the equator. 34° S, 151° W is south but west of Greenwich, so it fails the second test.",
      "clue": "Check the letter after each number."
    },
    "b": {
      "d": 3,
      "q": "Priya reads a map for a town at 37° S, 145° E. What does the 145° E tell her?",
      "opts": [
        "It is 145° of longitude east of the prime meridian",
        "It is 145° of latitude east of the prime meridian",
        "It is 145° of longitude east of the equator",
        "It is 145° of latitude north of the equator"
      ],
      "why": "The second number in a position is the longitude, and E means east of the prime meridian. Longitude is not measured from the equator: that is the starting line for latitude.",
      "clue": "Which line is longitude measured from, and which comes second?"
    }
  },
  "mat-time-zones": {
    "title": "Time zones",
    "card": [
      "The world is divided into time zones. Each zone keeps its own clock time, so it can be morning in one country and night in another.",
      "Zones are measured from Coordinated Universal Time (UTC). A zone written UTC+3 is 3 hours ahead of UTC. A zone written UTC−5 is 5 hours behind UTC.",
      "Sydney is UTC+10. During daylight saving, when clocks go forward 1 hour, Sydney is UTC+11.",
      "To compare two places, find the gap between their UTC numbers. Example: UTC+10 and UTC+3 are 10 − 3 = 7 hours apart, and the higher number is ahead."
    ],
    "remember": "UTC+ means ahead of UTC and UTC− means behind. Sydney is UTC+10, or UTC+11 in daylight saving.",
    "a": {
      "q": "A city is in the UTC−5 time zone. How does its clock time compare with UTC?",
      "opts": [
        "It is 5 hours behind UTC",
        "It is 5 hours ahead of UTC",
        "It is 5 minutes behind UTC",
        "It is the same as UTC"
      ],
      "why": "A minus sign means the zone is behind UTC, so UTC−5 is 5 hours behind. Reading it as ahead mixes up the sign, and the number counts hours, not minutes.",
      "clue": "Does the minus sign mean ahead or behind?"
    },
    "b": {
      "d": 2,
      "q": "It is 2:00 pm in Sydney during daylight saving (UTC+11). What is the time at UTC+3?",
      "opts": ["6:00 am", "10:00 pm", "5:00 am", "11:00 am"],
      "why": "UTC+11 and UTC+3 are 11 − 3 = 8 hours apart. UTC+3 is behind Sydney, so subtract 8 hours from 2:00 pm to get 6:00 am. Adding 8 hours gives 10:00 pm, which would put UTC+3 ahead of Sydney.",
      "clue": "Which zone has the higher number, and so is ahead?"
    }
  },
  "mat-longitude-time-difference": {
    "title": "Longitude and time difference",
    "card": [
      "The Earth turns 360° in 24 hours, so it turns 360° ÷ 24 = 15° each hour. This means every 15° of longitude is about 1 hour of time difference.",
      [
        "Same side",
        "if both places are east, or both are west, subtract the longitudes. For 150°E and 120°E: 150° − 120° = 30°, and 30° ÷ 15 = 2 hours."
      ],
      [
        "Opposite sides",
        "if one place is east and one is west of 0°, add the longitudes. For 45°E and 15°W: 45° + 15° = 60°, and 60° ÷ 15 = 4 hours."
      ],
      "The Earth turns towards the east, so the place further east is ahead in time. So 150°E is 2 hours ahead of 120°E, and 45°E is 4 hours ahead of 15°W."
    ],
    "remember": "Same side, subtract. Opposite sides, add. Divide by 15, and east is ahead.",
    "a": {
      "q": "Two towns are 45° of longitude apart. About how many hours apart are their times?",
      "opts": ["3 hours", "4 hours", "6 hours", "45 hours"],
      "why": "The Earth turns 15° each hour, so 45° ÷ 15 = 3 hours. Dividing by 24 instead of 15 gives about 1.9, which does not match the rule of 15° per hour.",
      "clue": "Divide the degrees by the number of degrees in one hour."
    },
    "b": {
      "d": 3,
      "q": "Town P is at 30°E and town Q is at 75°W. Both are on the same day. About what is the time difference, and which town is ahead?",
      "opts": ["7 hours, and P is ahead", "7 hours, and Q is ahead", "3 hours, and P is ahead", "3 hours, and Q is ahead"],
      "why": "P is east and Q is west of 0°, so add the longitudes: 30° + 75° = 105°, and 105° ÷ 15 = 7 hours. P is further east, so P is ahead. Subtracting gives 75° − 30° = 45°, or 3 hours, which treats the towns as if they were on the same side.",
      "clue": "Check whether the towns are on the same side of 0°."
    }
  },
  "mat-travel-across-time-zones": {
    "title": "Travel across time zones",
    "card": [
      "A flight takes the same real time whatever the clocks say. To find the arrival time, add the flight time to the departure time first.",
      "Then adjust for the time difference between the two places. If the destination is ahead of where you left, add the difference. If it is behind, subtract it.",
      ["Example", "A flight leaves Sydney at 10:00 am and takes 3 hours. The destination is 2 hours behind Sydney."],
      "10:00 am + 3 hours = 1:00 pm Sydney time. Then 1:00 pm − 2 hours = 11:00 am local time at the destination."
    ],
    "remember": "Add the flight time, then add or subtract the time difference.",
    "a": {
      "q": "A flight leaves Sydney at 8:00 am and takes 4 hours. The destination is 3 hours behind Sydney. What is the local arrival time?",
      "opts": ["9:00 am", "3:00 pm", "12:00 noon", "5:00 am"],
      "why": "8:00 am + 4 hours = 12:00 noon Sydney time. The destination is behind, so subtract 3 hours to get 9:00 am. Adding the 3 hours gives 3:00 pm, which is wrong because a place that is behind has an earlier clock time.",
      "clue": "Add the flight time first, then use the time difference."
    },
    "b": {
      "d": 2,
      "q": "Jamal's flight leaves Sydney at 9:30 am and takes 9 hours. The destination is 2 hours ahead of Sydney. What is the local arrival time?",
      "opts": ["8:30 pm", "4:30 pm", "6:30 pm", "11:30 am"],
      "why": "9:30 am + 9 hours = 6:30 pm Sydney time. The destination is ahead, so add 2 hours to get 8:30 pm. Subtracting 2 hours gives 4:30 pm, which is wrong because a place that is ahead has a later clock time.",
      "clue": "Ahead means the clock there shows a later time."
    }
  },
  "mat-international-date-line": {
    "title": "The International Date Line",
    "card": [
      "The International Date Line is an imaginary line that runs through the Pacific Ocean, close to 180° longitude. It bends in places so that it goes around some countries and islands.",
      "Crossing the line changes the calendar date by one day. The date is not changed by the distance travelled or the time of day.",
      [
        "West",
        "Going west across the line adds a day, so the date moves forward one day. For example, 5 March becomes 6 March."
      ],
      [
        "East",
        "Going east across the line takes a day away, so the date moves back one day. For example, 5 March becomes 4 March."
      ]
    ],
    "remember": "West adds a day. East takes a day away.",
    "a": {
      "q": "A cargo ship sails west across the International Date Line. Just before it crosses, it is Tuesday. What day is it just after?",
      "opts": ["Wednesday", "Monday", "Tuesday", "Thursday"],
      "why": "Going west across the line adds a day, so Tuesday moves forward to Wednesday. Monday is the tempting mistake: it comes from taking a day away, which is what happens going east.",
      "clue": "Does the ship's direction move the calendar forward or back?"
    },
    "b": {
      "d": 3,
      "q": "Leila sails her yacht east across the International Date Line in the Pacific. Just before she crosses, the date is 1 April. What is the date just after?",
      "opts": ["31 March", "2 April", "1 April", "30 March"],
      "why": "Going east takes a day away, so the date goes back one day from 1 April. March has 31 days, so the day before 1 April is 31 March. 2 April comes from adding a day, which is what happens going west.",
      "clue": "Work out the direction rule first, then count one day."
    }
  },
  "mat-network-terms": {
    "title": "Network terms",
    "card": [
      ["Vertex", "a point in a network, drawn as a dot. It can stand for a town, a computer or a person."],
      ["Edge", "a line that joins two vertices. It can stand for a road, a cable or a friendship."],
      ["Degree", "the number of edges that meet at a vertex. If town A has roads to B, C and D, then A has degree 3."],
      [
        "Weighted network",
        "a network with a value on each edge, such as a distance in km or a cost in dollars. The value is called the weight."
      ]
    ],
    "remember": "A network is vertices joined by edges. Degree counts edges at a vertex, and weights are values on edges.",
    "a": {
      "q": "In a network, vertex P is joined by edges to Q, R, S and T. What is the degree of P?",
      "opts": ["4", "5", "1", "8"],
      "why": "Degree is the number of edges that meet at the vertex. P has four edges, one to each of Q, R, S and T, so its degree is 4. The answer is not 5, because degree counts edges at P, not the vertices P, Q, R, S and T.",
      "clue": "Count the edges at P, not the vertices in the network."
    },
    "b": {
      "d": 2,
      "q": "A network shows five towns as dots. Roads between them are lines labelled 12, 7, 9 and 15, in km. What do the labels 12, 7, 9 and 15 show?",
      "opts": ["The weights of the edges", "The degrees of the vertices", "The number of vertices", "The number of edges"],
      "why": "A value written on an edge, such as a distance, is its weight. The labels are on the roads, which are edges, so they are not degrees. Degree is a count of edges at a vertex, and it is not a distance.",
      "clue": "The labels sit on the lines, not on the dots."
    }
  },
  "mat-walks-paths-circuits": {
    "title": "Walks, paths and circuits",
    "card": [
      [
        "Walk",
        "any route that moves along edges from vertex to vertex. A walk may use the same edge or the same vertex more than once."
      ],
      [
        "Path",
        "a walk that never repeats a vertex. For example, A-B-C-D is a path, but A-B-C-B-D is not, because B appears twice."
      ],
      [
        "Circuit",
        "a walk that starts and ends at the same vertex without repeating an edge. A-B-C-A is a circuit. A-B-A is not, because it uses edge AB twice."
      ],
      "To classify a route, list its vertices in order. Check if any vertex or edge repeats, and check if the first and last vertices are the same."
    ],
    "remember": "A path repeats no vertex. A circuit ends where it began and repeats no edge.",
    "a": {
      "q": "A network has the route P-Q-R-S-Q-T. Which word describes this route?",
      "opts": ["A walk that is not a path", "A path", "A circuit", "A path that is also a circuit"],
      "why": "The route moves along edges, so it is a walk. Vertex Q appears twice, so it is not a path. It starts at P and ends at T, so it is not a circuit.",
      "clue": "List the vertices and look for one that repeats."
    },
    "b": {
      "d": 3,
      "q": "Mia cycles around her town along the route H-J-K-L-M-H. Every vertex except H is visited once. Which statement is correct?",
      "opts": [
        "It is a circuit, because it starts and ends at H",
        "It is a path, because no vertex except H repeats",
        "It is a path, because it starts and ends at H",
        "It is not a walk, because H appears twice"
      ],
      "why": "The route starts and ends at H and uses each edge only once, so it is a circuit. It is not a path, because H appears twice. It is still a walk, as it follows edges.",
      "clue": "Compare the first and last vertices, then check for repeats."
    }
  },
  "mat-shortest-paths": {
    "title": "Shortest paths",
    "card": [
      "In a weighted network, the weight of a route is the sum of the weights on its edges. The shortest path between two vertices is the route with the smallest total weight.",
      "The route with the fewest edges is not always the shortest. Add up the weights to compare routes.",
      "For a small network, list every route from the start to the end without repeating a vertex. Add the weights of each route and choose the smallest total.",
      "Example: A to D can go A-B-D with weights 4 and 7, or A-C-D with weights 3 and 5. A-B-D totals 4 + 7 = 11. A-C-D totals 3 + 5 = 8. The shortest path is A-C-D, with weight 8."
    ],
    "remember": "Add the weights along each route and pick the smallest total, not the fewest edges.",
    "a": {
      "q": "In a network, the only two routes from P to S are P-Q-S, with weights 6 and 9, and P-R-S, with weights 5 and 7. What is the weight of the shortest path from P to S?",
      "opts": ["12", "15", "11", "13"],
      "why": "P-R-S totals 5 + 7 = 12, and P-Q-S totals 6 + 9 = 15. The smaller total is 12. Choosing 15 would mean picking the longer route.",
      "clue": "Add the weights along each route, then compare the totals."
    },
    "b": {
      "d": 3,
      "q": "Town A is joined to town D by a direct road of 14 km. The only other route goes A to B (4 km), B to C (5 km), then C to D (3 km). Which route is the shortest path from A to D?",
      "opts": [
        "A-B-C-D, with a total of 12 km",
        "A-D, with a total of 14 km",
        "A-B-C-D, with a total of 13 km",
        "A-D, because it has the fewest edges"
      ],
      "why": "A-B-C-D totals 4 + 5 + 3 = 12 km, which is less than the direct 14 km. The direct road has fewer edges, but the shortest path depends on total weight, not the number of edges.",
      "clue": "Fewer edges does not mean less total weight."
    }
  },
  "mat-trees": {
    "title": "Trees",
    "card": [
      "A network is connected if there is a route between every pair of vertices.",
      "A tree is a connected network that contains no circuits. Take away any one edge and it is no longer connected.",
      "A tree with n vertices has n − 1 edges. Example: a tree with 6 vertices has 6 − 1 = 5 edges.",
      "To test a network, check that it is connected and has no circuits. If a connected network has n vertices and more than n − 1 edges, it must contain a circuit, so it is not a tree."
    ],
    "remember": "A tree is connected with no circuits, and n vertices means n − 1 edges.",
    "a": {
      "q": "A tree has 9 vertices. How many edges does it have?",
      "opts": ["8", "9", "10", "7"],
      "why": "A tree with n vertices has n − 1 edges, so 9 − 1 = 8. Choosing 9 mixes up the number of edges with the number of vertices.",
      "clue": "Take one away from the number of vertices."
    },
    "b": {
      "d": 3,
      "q": "A council plans a path network joining 7 parks in Orange. It has 7 vertices, is connected and has 7 edges. Is it a tree?",
      "opts": [
        "No, because a tree would have only 6 edges",
        "Yes, because it is connected",
        "Yes, because it has as many edges as vertices",
        "No, because a tree would have 8 edges"
      ],
      "why": "A tree with 7 vertices has 7 − 1 = 6 edges. This network has one extra edge, so it must contain a circuit. Being connected is not enough, because a tree also needs no circuits.",
      "clue": "Work out how many edges a tree with 7 vertices has, then compare."
    }
  },
  "mat-minimum-spanning-trees": {
    "title": "Minimum spanning trees",
    "card": [
      "A minimum spanning tree joins every vertex of a weighted network using the least total weight. It has no circuits. It is used for jobs such as laying cable between towns.",
      [
        "Kruskal's method",
        "List the edges from smallest weight to largest. Add each edge in turn, but skip any edge that would make a circuit. Stop when every vertex is joined."
      ],
      [
        "Prim's method",
        "Start at any vertex. Keep adding the smallest edge that joins a new vertex to the part already built. Stop when every vertex is joined."
      ],
      [
        "Example",
        "Edges: AB 4, AC 2, BC 3, BD 5, CD 6. Kruskal adds AC 2 and BC 3. It skips AB 4, as A, B and C would form a circuit. It adds BD 5. Total weight: 2 + 3 + 5 = 10."
      ]
    ],
    "remember": "Both methods build the cheapest way to join every vertex, and neither ever adds an edge that makes a circuit.",
    "a": {
      "q": "A network has edges PQ 3, PR 4, QR 5, RS 6 and QS 8. What is the total weight of its minimum spanning tree?",
      "opts": ["13", "12", "18", "26"],
      "why": "Kruskal adds PQ 3 and PR 4. It skips QR 5, as P, Q and R would form a circuit. It adds RS 6. Total: 3 + 4 + 6 = 13. The answer 12 is tempting, but 3 + 4 + 5 leaves S unconnected.",
      "clue": "Check each edge for a circuit before you add it."
    },
    "b": {
      "d": 3,
      "q": "Cable must link five towns. The costs in thousands of dollars are AB 7, AC 5, BC 6, BD 4, CD 8, CE 9 and DE 3. What is the least total cost to connect all five towns?",
      "opts": ["$18 000", "$19 000", "$21 000", "$42 000"],
      "why": "Kruskal adds DE 3, BD 4, AC 5 and BC 6. Every town is now joined, so the rest are not needed. Total: 3 + 4 + 5 + 6 = 18. Using AB 7 in place of BC 6 also joins all towns, but it costs 19, which is more.",
      "clue": "Take the cheapest edges first, and stop once all five towns are joined."
    }
  },
  "mat-statistical-investigation-process": {
    "title": "The statistical investigation process",
    "card": [
      "A statistical investigation starts with a question that data can answer. For example: how many hours do Year 11 students at our school sleep on a school night?",
      "Next, collect the data, for example by a survey. Then organise it in a table and display it in a graph, so patterns are easier to see.",
      "Then analyse the data, for example by finding a measure such as an average, and looking for patterns. The analysis gives the evidence for the answer.",
      "Finally, draw a conclusion that answers the original question, using the data as evidence. A conclusion that does not answer the question means the investigation is not finished."
    ],
    "remember": "Question, collect, organise and display, analyse, conclude. The conclusion answers the question.",
    "a": {
      "q": "Which list shows the steps of an investigation in the correct order?",
      "opts": [
        "Pose a question, collect data, display data, conclude",
        "Collect data, pose a question, display data, conclude",
        "Pose a question, display data, collect data, conclude",
        "Pose a question, collect data, conclude, display data"
      ],
      "why": "An investigation starts with a question, then data is collected, then it is displayed and analysed, and the conclusion comes last. Displaying data before collecting it is impossible, and a conclusion drawn before analysis has no evidence.",
      "clue": "What must you have before you know which data to collect?"
    },
    "b": {
      "d": 3,
      "q": "Zoe asks: do Year 11 students at her school spend more time on homework than Year 9 students? She surveys both year groups and graphs the results. What should she do to finish her investigation?",
      "opts": [
        "Compare the group averages and say which is higher",
        "Work out the group averages and leave it there",
        "Survey Year 10 students and add them to the graph",
        "Describe the shape of the Year 11 graph only"
      ],
      "why": "Comparing the averages is the analysis, and saying which is higher is the conclusion that answers Zoe's question. Working out the averages and stopping there is tempting, but without a conclusion the question is still unanswered, so the investigation is not finished.",
      "clue": "Which step gives Zoe an answer to the question she asked?"
    }
  },
  "mat-sampling-methods": {
    "title": "Sampling methods",
    "card": [
      [
        "Random",
        "every member of the population, the whole group being studied, has an equal chance of being in the sample, such as drawing names from a hat."
      ],
      [
        "Systematic",
        "choose every kth member from a list, after a random start. For 500 students and a sample of 50, take every 10th name."
      ],
      [
        "Stratified",
        "split the population into groups, such as year groups, then take a random sample from each group in proportion to its size."
      ],
      [
        "Self-selected",
        "people choose to take part, such as in an online poll. People with strong views are more likely to reply, so the sample can be biased: its results may not match the population."
      ]
    ],
    "remember": "A fair sample gives every member an equal chance of being chosen. A sample whose members choose themselves can be biased.",
    "a": {
      "q": "A school has 500 students on a numbered list. The principal picks a random start, then surveys every 10th student on the list. Which sampling method is this?",
      "opts": ["Systematic", "Stratified", "Self-selected", "Random"],
      "why": "Choosing every kth name from a list after a random start is systematic sampling. It is not stratified, because the students are not split into groups first.",
      "clue": "Look at how the students are picked from the list."
    },
    "b": {
      "d": 3,
      "q": "A council in Wagga Wagga wants to know if residents like a new bus timetable. It posts a survey link on its Facebook page and uses the first 200 replies. Why might the results be biased?",
      "opts": [
        "Residents chose to reply, so they may not match the town",
        "Residents were split into groups, so some may be left out",
        "Every resident had an equal chance, so some may be missed",
        "Every 10th reply was used, so some groups may be skipped"
      ],
      "why": "This is a self-selected sample. Only residents who see the page and choose to reply take part, so their views may not match the whole town. The council did not split residents into groups or take every 10th reply, and not every resident had an equal chance of being chosen.",
      "clue": "Who decided which residents took part?"
    }
  },
  "mat-displaying-data": {
    "title": "Displaying data",
    "card": [
      [
        "Column graph",
        "uses separate bars with gaps between them. It suits categorical data, such as the favourite sport of each student in a class."
      ],
      [
        "Dot plot",
        "puts one dot above a number on a number line for each score. It suits small sets of numerical data, such as 12 test marks out of 10."
      ],
      [
        "Histogram",
        "uses touching bars, each covering a class interval, such as 0 to 9 or 10 to 19. It suits large sets of numerical data, especially measures."
      ],
      [
        "Stem-and-leaf plot",
        "splits each value into a stem and a leaf, so 47 has stem 4 and leaf 7. It shows the shape and keeps every original value."
      ]
    ],
    "remember": "Gaps between bars suit categories. Touching bars suit grouped numbers.",
    "a": {
      "q": "Which display suits the data on the favourite pet of each student in a class?",
      "opts": ["Column graph", "Histogram", "Stem-and-leaf plot", "Dot plot"],
      "why": "Favourite pet is categorical, so separate bars with gaps suit it. A histogram is for grouped numerical data, and it has touching bars.",
      "clue": "Pets are names of groups, not numbers."
    },
    "b": {
      "d": 3,
      "q": "Dev records the exact height of each of 200 students and wants to group the heights in intervals. Which display suits this best?",
      "opts": ["Histogram", "Column graph", "Dot plot", "Stem-and-leaf plot"],
      "why": "Heights are numerical and there are many of them, so grouping them in class intervals with a histogram suits. A dot plot suits small sets, and a column graph suits categories.",
      "clue": "Think of a large set of measures grouped in intervals."
    }
  },
  "mat-spread-box-plots": {
    "title": "Spread and box plots",
    "card": [
      [
        "Range",
        "highest score − lowest score. It shows the full spread, but it can be pulled a long way by outliers."
      ],
      [
        "Quartiles",
        "Order the data. The median is Q2. Q1 is the median of the lower half and Q3 is the median of the upper half. IQR = Q3 − Q1. It measures the spread of the middle half, so outliers barely change it."
      ],
      [
        "Box plot",
        "It is drawn from five numbers: lowest, Q1, median, Q3 and highest. The box runs from Q1 to Q3, with a line at the median. Whiskers reach to the lowest and highest scores."
      ],
      "Example: 2, 4, 5, 7, 8, 10, 12, 20. Median = (7 + 8) ÷ 2 = 7.5. Q1 = (4 + 5) ÷ 2 = 4.5. Q3 = (10 + 12) ÷ 2 = 11. IQR = 11 − 4.5 = 6.5. Range = 20 − 2 = 18. To compare two sets, a smaller IQR means the middle of the data is less spread out."
    ],
    "remember": "Range uses the two ends. IQR uses the middle half, so outliers barely change it.",
    "a": {
      "q": "Which set of five numbers is used to draw a box plot?",
      "opts": [
        "Lowest, Q1, median, Q3, highest",
        "Lowest, mean, median, mode, highest",
        "Q1, Q2, Q3, range, IQR",
        "Lowest, Q1, mean, Q3, highest"
      ],
      "why": "A box plot uses the lowest score, Q1, the median, Q3 and the highest score. Mean and mode are measures of centre, but they are not part of a box plot's five numbers.",
      "clue": "The box runs from Q1 to Q3 with a line inside it."
    },
    "b": {
      "d": 3,
      "q": "Ben's quiz scores have Q1 = 12 and Q3 = 20, lowest 4 and highest 30. Mia's scores have Q1 = 10 and Q3 = 24, lowest 8 and highest 26. Whose middle half of scores is less spread out, and what is that IQR?",
      "opts": ["Ben's, with an IQR of 8", "Mia's, with an IQR of 14", "Ben's, with an IQR of 26", "Mia's, with an IQR of 18"],
      "why": "Ben's IQR = 20 − 12 = 8 and Mia's IQR = 24 − 10 = 14. The smaller IQR means less spread in the middle half, so Ben's. Ben's range of 26 is larger than Mia's 18, but range uses only the two ends.",
      "clue": "Find Q3 − Q1 for each student, not highest − lowest."
    }
  },
  "mat-simultaneous-linear-equations": {
    "title": "Simultaneous linear equations",
    "card": [
      "Two linear equations that describe the same situation are called simultaneous equations. Their graphs are straight lines, and the point where the lines cross satisfies both equations.",
      [
        "Graphing",
        "Draw both lines on the same axes and read off the point where they cross. This is quick, but the reading may be only approximate."
      ],
      [
        "Substitution",
        "Put one equation into the other to leave one unknown. Example: y = 2x + 5 and y = 3x + 1. Set 2x + 5 = 3x + 1, so x = 4. Then y = 2 × 4 + 5 = 13. The lines meet at (4, 13)."
      ],
      "The meeting point shows where two things are equal. If two phone plans have costs C = 20 + 5t and C = 8 + 8t, they cost the same at the t-value where the lines meet."
    ],
    "remember": "The crossing point is the one pair of values that fits both equations, so both quantities are equal there.",
    "a": {
      "q": "Solve y = 2x + 1 and y = x + 6 by substitution. Where do the lines meet?",
      "opts": ["(5, 11)", "(11, 5)", "(5, 6)", "(7, 5)"],
      "why": "Set 2x + 1 = x + 6, so x = 5. Then y = 2 × 5 + 1 = 11, which gives (5, 11). Checking in the other equation: 5 + 6 = 11. The point (11, 5) swaps the order of x and y.",
      "clue": "Make the two right-hand sides equal, then find y."
    },
    "b": {
      "d": 3,
      "q": "Plan A costs C = 30 + 4t and Plan B costs C = 10 + 6t, where t is the number of gigabytes used. At how many gigabytes do the plans cost the same?",
      "opts": ["10 gigabytes", "20 gigabytes", "4 gigabytes", "70 gigabytes"],
      "why": "Set 30 + 4t = 10 + 6t, so 20 = 2t and t = 10. The cost at that point is 30 + 40 = 70 dollars, which is the answer 70, not the number of gigabytes. Check: 10 + 60 = 70.",
      "clue": "Ask for t, not the cost. Make the two costs equal."
    }
  },
  "mat-break-even-analysis": {
    "title": "Break-even analysis",
    "card": [
      "A business has a cost line and a revenue line. Cost = fixed cost + cost per item × number of items. Revenue = price per item × number of items.",
      "The break-even point is where the two lines meet. Cost equals revenue there, so the profit is zero.",
      "Past the break-even point, revenue is above cost and the business makes a profit. Before it, cost is above revenue and the business makes a loss. Profit = revenue − cost.",
      "Example: Ravi sells scarves. Fixed cost is $300 and each scarf costs $10 to make and sells for $25. Set 300 + 10n = 25n. Then 300 = 15n, so n = 20. He breaks even at 20 scarves."
    ],
    "remember": "Break even where cost = revenue. Profit = revenue − cost.",
    "a": {
      "q": "At 50 items, a business has revenue of $900 and cost of $900. What does this show?",
      "opts": [
        "It breaks even at 50 items",
        "It makes a profit at 50 items",
        "It makes a loss at 50 items",
        "Its fixed cost is $0"
      ],
      "why": "Revenue equals cost, so profit is $0 and 50 items is the break-even point. A profit would need revenue above cost. Fixed cost cannot be found from these two figures alone.",
      "clue": "Compare revenue with cost."
    },
    "b": {
      "d": 3,
      "q": "Mia sells candles. Fixed cost is $400, each candle costs $6 to make and sells for $14. How many candles must she sell to break even?",
      "opts": ["50", "29", "67", "20"],
      "why": "Set 400 + 6n = 14n, so 400 = 8n and n = 50. Check: cost is 400 + 300 = $700 and revenue is 14 × 50 = $700. Dividing by the price of $14 gives 29, which ignores that each candle also costs $6 to make.",
      "clue": "How much profit does each candle add towards the fixed cost?"
    }
  },
  "mat-exponential-models": {
    "title": "Exponential models",
    "card": [
      "An exponential model changes by a fixed percentage each period. It has the form y = a(b)ˣ, where x is the number of periods.",
      ["a", "the starting value, when x = 0. b is the multiplier for each period."],
      ["Growth", "b is above 1. A rise of 5% each period gives b = 1 + 0.05 = 1.05."],
      [
        "Decay",
        "b is between 0 and 1. A fall of 15% each period gives b = 1 − 0.15 = 0.85. Example: a car worth $20 000 that loses 15% a year has V = 20 000 × 0.85ˣ. After 2 years, V = 20 000 × 0.85² = $14 450."
      ]
    ],
    "remember": "Find b by adding the percentage rate to 1 for growth, or taking it from 1 for decay.",
    "a": {
      "q": "A town of 4000 people grows by 3% each year. Which equation models the population P after x years?",
      "opts": ["P = 4000 × 1.03ˣ", "P = 4000 × 0.03ˣ", "P = 4000 × 3ˣ", "P = 4000 × 0.97ˣ"],
      "why": "Growth of 3% means the multiplier is 1 + 0.03 = 1.03. Using 0.97 is tempting, but that is the multiplier for a 3% fall, not a rise.",
      "clue": "For growth, add the rate to 1."
    },
    "b": {
      "d": 3,
      "q": "Priya buys a laptop for $2000. It loses 20% of its value each year. What is it worth after 3 years?",
      "opts": ["$1024", "$800", "$1280", "$3456"],
      "why": "Decay of 20% gives b = 0.8, so V = 2000 × 0.8³ = 2000 × 0.512 = $1024. Subtracting $400 (20% of the original $2000) each year gives $800, which is wrong, because each year's fall is 20% of the current, smaller value.",
      "clue": "Multiply by 0.8 once for each year, so the power is 3."
    }
  },
  "mat-quadratic-models": {
    "title": "Quadratic models",
    "card": [
      "A quadratic model has the form y = ax² + bx + c, where a is not 0. Its graph is a parabola, a smooth U-shaped or upside-down U-shaped curve.",
      [
        "Maximum",
        "if a is negative, the parabola opens downwards and its highest point is the maximum. A thrown ball rises to a maximum height, then falls."
      ],
      [
        "Minimum",
        "if a is positive, the parabola opens upwards and its lowest point is the minimum. This point is called the vertex, as is the maximum point."
      ],
      "To read the answer from a graph, find the vertex. Its y-value is the maximum or minimum value. Its x-value is where that value happens. Example: a ball's height h (metres) after t seconds peaks at the point (2, 20). The maximum height is 20 m, reached after 2 seconds."
    ],
    "remember": "The vertex gives the best value (its y) and when or where it happens (its x).",
    "a": {
      "q": "A graph of a ball's height (m) against time (s) is a parabola with its vertex at (3, 45). What is the maximum height?",
      "opts": ["45 m", "3 m", "48 m", "15 m"],
      "why": "The y-value of the vertex is the maximum value, and y is height here, so it is 45 m. The 3 is the time in seconds when the ball reaches that height, not the height itself.",
      "clue": "Height is on the y-axis. Which part of the vertex is y?"
    },
    "b": {
      "d": 3,
      "q": "Profit P (in dollars) from selling cupcakes at price x dollars is modelled by a parabola with vertex (6, 240) that opens downwards. What price gives the greatest profit?",
      "opts": ["$6", "$240", "$36", "$46"],
      "why": "The x-value of the vertex is the price at which the maximum happens, so the price is $6. The $240 is the greatest profit, which is the y-value, so it answers a different question.",
      "clue": "Price is on the x-axis. Which part of the vertex tells you where the maximum happens?"
    }
  },
  "mat-inverse-variation-models": {
    "title": "Inverse variation models",
    "card": [
      "In an inverse variation, y = k/x, where k is a fixed number called the constant. As x gets bigger, y gets smaller.",
      "Doubling x halves y. Tripling x divides y by 3. The product x × y always equals k.",
      "The graph is a curve called a hyperbola. It never touches either axis.",
      "Example: a 120 km trip takes t = 120/s hours at a speed of s km/h. At 60 km/h, t = 120 ÷ 60 = 2 hours. At 120 km/h, t = 1 hour. Doubling the speed halved the time."
    ],
    "remember": "In y = k/x, x × y stays the same, so when one doubles the other halves.",
    "a": {
      "q": "y varies inversely with x. When x = 4, y = 12. What is y when x = 8?",
      "opts": ["6", "24", "3", "1.5"],
      "why": "Here k = x × y = 4 × 12 = 48, so y = 48/8 = 6. Doubling x halves y. The answer 24 comes from doubling y, which treats the relationship as direct rather than inverse.",
      "clue": "Find k first by multiplying x and y."
    },
    "b": {
      "d": 3,
      "q": "Leila's trip is 240 km. At an average speed of 80 km/h it takes 3 hours. If she slows to an average of 60 km/h, how long does the trip take?",
      "opts": ["4 hours", "2.25 hours", "3 hours", "5 hours"],
      "why": "Time = 240/speed, so t = 240 ÷ 60 = 4 hours. Check: 80 × 3 = 240 and 60 × 4 = 240, so the product stays the same. Slower speed means more time, so 2.25 hours is wrong. That answer comes from multiplying 3 by 60/80, which treats the relationship as direct.",
      "clue": "Distance stays 240 km, so speed × time stays the same."
    }
  },
  "mat-comparing-investments": {
    "title": "Comparing investments",
    "card": [
      [
        "Simple interest",
        "Interest is paid only on the original amount. I = Prn, so the interest is the same every year."
      ],
      [
        "Compound interest",
        "Interest is added to the balance, so later interest is earned on interest too. FV = PV(1 + r)ⁿ, where r is the rate per period and n is the number of periods. For quarterly, r is the yearly rate ÷ 4 and there are 4 periods a year."
      ],
      [
        "Compare",
        "Work out the final value of each investment over the same time. The larger final value is the better investment. Example: $1000 for 2 years at 6% p.a. gives $1120 simple, or 1000 × 1.06² = $1123.60 compounded yearly."
      ],
      [
        "Watch for",
        "At the same yearly rate, more frequent compounding gives more. But a higher simple rate can beat a lower compound rate, so always work out both."
      ]
    ],
    "remember": "Find each final value over the same time, then pick the larger.",
    "a": {
      "q": "Over 3 years, which gives the larger final value? A: $2000 at 5.5% p.a. simple interest. B: $2000 at 5% p.a. compounded yearly.",
      "opts": ["A, by $14.75", "B, by $14.75", "A, by $330.00", "B, by $315.25"],
      "why": "A gives 2000 + 2000 × 0.055 × 3 = $2330. B gives 2000 × 1.05³ = $2315.25. A is larger by $14.75. B is tempting because compound interest earns interest on interest, but its lower rate means it falls short here.",
      "clue": "Compound is not always better. Work out both final values."
    },
    "b": {
      "d": 3,
      "q": "Mia invests $5000 for 1 year at 8% p.a. Bank X compounds the interest yearly. Bank Y compounds it quarterly. How much more does Bank Y pay?",
      "opts": ["$12.16", "$0.00", "$412.16", "$400.00"],
      "why": "Bank X gives 5000 × 1.08 = $5400. Bank Y uses r = 0.02 and n = 4: 5000 × 1.02⁴ = $5412.16, so Y pays $12.16 more. It is not $0, because at the same yearly rate, more frequent compounding earns more.",
      "clue": "Quarterly means a rate of 8% ÷ 4 for 4 periods."
    }
  },
  "mat-shares-dividends": {
    "title": "Shares and dividends",
    "card": [
      [
        "Share",
        "A share is one small part of the ownership of a company. People who own shares are called shareholders."
      ],
      [
        "Dividend",
        "A dividend is a share of a company's profit paid to shareholders. It is paid per share, so owning more shares means a bigger payment."
      ],
      [
        "Dividend yield",
        "Dividend yield = yearly dividend per share ÷ share price × 100%. It shows the yearly dividend as a percentage of the price."
      ],
      "Example: a share costs $40 and pays $1.80 in dividends over a year. Yield = 1.80 ÷ 40 × 100% = 4.5%."
    ],
    "remember": "Yield compares the yearly dividend with the share price, as a percentage.",
    "a": {
      "q": "A share costs $25 and pays a dividend of $1.50 over a year. What is the dividend yield?",
      "opts": ["6%", "0.06%", "1.5%", "37.5%"],
      "why": "Yield = 1.50 ÷ 25 × 100% = 6%. Dividing gives 0.06, and writing 0.06% forgets to multiply by 100%.",
      "clue": "Divide the dividend by the share price, then turn it into a percentage."
    },
    "b": {
      "d": 3,
      "q": "Tariq owns 200 shares in a company. Each share costs $12 and the company pays $0.84 per share in a year. What is his total yearly dividend, and the yield?",
      "opts": [
        "$168, and the yield is 7%",
        "$168, and the yield is 0.07%",
        "$2400, and the yield is 7%",
        "$2400, and the yield is 0.07%"
      ],
      "why": "Dividend = 200 × 0.84 = $168. Yield = 0.84 ÷ 12 × 100% = 7%. The yield uses the price and dividend of one share, so it does not depend on how many shares he owns, and $2400 is the cost of the shares.",
      "clue": "Yield uses one share, but the payment uses all 200."
    }
  },
  "mat-inflation-appreciation": {
    "title": "Inflation and appreciation",
    "card": [
      [
        "Inflation",
        "a general rise in prices over time. A fixed yearly inflation rate makes prices grow like compound interest."
      ],
      [
        "Appreciation",
        "a rise in the value of an asset, such as a house, over time. A fixed yearly rate works the same way."
      ],
      "Use FV = PV(1 + r)ⁿ. PV is today's price or value, r is the yearly rate as a decimal, and n is the number of years. FV is the future price or value.",
      "Example: a $4000 laptop with inflation of 3% a year. After 2 years, FV = 4000 × 1.03² = 4000 × 1.0609 = $4243.60."
    ],
    "remember": "Inflation and appreciation both use FV = PV(1 + r)ⁿ, with r as the yearly rate of increase.",
    "a": {
      "q": "A unit is worth $500 000 and appreciates by 4% a year. Which calculation gives its value after 3 years?",
      "opts": ["500 000 × 1.04³", "500 000 × 0.96³", "500 000 × 1.12", "500 000 × 1.04 × 3"],
      "why": "Appreciation of 4% means r = 0.04, so each year the value is multiplied by 1.04. After 3 years that is 1.04³. Multiplying by 1.12 treats the growth as simple, not compound, and ignores that each year builds on the last.",
      "clue": "Each year the value is multiplied by the same number."
    },
    "b": {
      "d": 2,
      "q": "A bus fare is $3.50 today. Inflation is 2% a year. What is the fare after 2 years, to the nearest cent?",
      "opts": ["$3.64", "$3.57", "$3.71", "$3.92"],
      "why": "FV = 3.50 × 1.02² = 3.50 × 1.0404 = 3.6414, which is $3.64. The answer $3.57 uses only one year of inflation, so it skips a step.",
      "clue": "Multiply by 1.02 once for each year."
    }
  },
  "mat-declining-balance-depreciation": {
    "title": "Declining balance depreciation",
    "card": [
      "Depreciation is the fall in an asset's value over time. Declining balance depreciation takes off a fixed percentage of the asset's current value each year.",
      "S = V₀(1 − r)ⁿ. S is the salvage value (the value after n years), V₀ is the starting value, r is the yearly rate as a decimal and n is the number of years.",
      "The percentage is taken from a smaller value each year, so the dollar loss gets smaller each year.",
      "Example: a $20 000 machine loses 10% a year for 3 years. S = 20 000 × (1 − 0.10)³ = 20 000 × 0.9³ = 20 000 × 0.729 = $14 580."
    ],
    "remember": "Multiply by (1 − r) once for each year. The value falls, but the rate stays the same.",
    "a": {
      "q": "A van is worth $40 000 and loses 15% of its value each year. What is its value after 2 years?",
      "opts": ["$28 900", "$28 000", "$34 000", "$27 100"],
      "why": "S = 40 000 × 0.85² = 40 000 × 0.7225 = $28 900. The value $28 000 comes from taking 15% of $40 000 off each year, which ignores that the percentage applies to the smaller current value.",
      "clue": "Multiply by 0.85 twice."
    },
    "b": {
      "d": 3,
      "q": "Priya's laptop cost $2000 and depreciates by 20% each year on the declining balance. What is its value after 3 years?",
      "opts": ["$1024", "$800", "$1280", "$1200"],
      "why": "S = 2000 × 0.8³ = 2000 × 0.512 = $1024. The value $800 comes from taking 20% of the original price off each year, which ignores that each year's loss is taken from the smaller current value.",
      "clue": "The factor each year is 1 − 0.20, used three times."
    }
  },
  "mat-credit-cards": {
    "title": "Credit cards",
    "card": [
      "A credit card lets you spend money the card provider lends you. If you pay the full balance by the due date, you usually pay no interest on purchases during the interest-free period.",
      "If you do not pay in full, interest is charged on the amount owed, and it is worked out daily. Daily rate = annual rate ÷ 365.",
      "Interest for a period = amount owed × daily rate × number of days. The annual rate on credit cards is often high.",
      "Example: $2000 is owed at 18% per year for 30 days. Daily rate = 18% ÷ 365 = 0.0493% (to 4 decimal places). Interest = 2000 × 0.18 ÷ 365 × 30 = $29.59 (to the nearest cent)."
    ],
    "remember": "Interest = amount owed × annual rate ÷ 365 × days, charged once the interest-free period ends.",
    "a": {
      "q": "A credit card has an annual rate of 21.9%. What is the daily interest rate, using 365 days in a year?",
      "opts": ["0.06%", "1.83%", "0.73%", "0.6%"],
      "why": "Daily rate = 21.9% ÷ 365 = 0.06%. Dividing by 12 gives about 1.83%, which is a monthly rate, and dividing by 30 gives 0.73%, which is not a daily rate either. 0.6% is a decimal place slip.",
      "clue": "Divide the annual rate by the number of days in a year."
    },
    "b": {
      "d": 3,
      "q": "Leo owes $1500 on a credit card at 19.5% per year, and the interest-free period has ended. Using 365 days, what is the interest for 20 days, to the nearest cent?",
      "opts": ["$16.03", "$24.38", "$292.50", "$0.80"],
      "why": "Interest = 1500 × 0.195 ÷ 365 × 20 = $16.03. The $0.80 option is only one day's interest, found by 1500 × 0.195 ÷ 365 = $0.80 and not multiplied by 20 days. $24.38 divides the yearly interest by 12, which gives a month, not 20 days.",
      "clue": "Work out one day's interest, then multiply by the number of days."
    }
  },
  "mat-annuity": {
    "title": "What an annuity is",
    "card": [
      "An annuity is a series of equal payments made at regular intervals. The money earns compound interest, which means interest is added to the balance and then earns interest too.",
      "Example: Sam puts $200 into a savings account at the end of every month. The payments are equal and regular, and the balance earns compound interest. This is an annuity.",
      "An annuity can be money you pay in, such as regular saving. The payment amount and the time between payments stay the same each time.",
      "A single deposit that is left alone is not an annuity. A set of deposits of different sizes, or made at random times, is not an annuity either."
    ],
    "remember": "An annuity is equal payments at regular intervals, earning compound interest.",
    "a": {
      "q": "Which of these is an annuity?",
      "opts": [
        "Paying $150 into a savings account every month",
        "Paying $5000 into a savings account once",
        "Paying in $100, then $300, then $50 each year",
        "Paying $150 into an account on days chosen at random"
      ],
      "why": "The $150 deposit every month is equal and regular, and it earns compound interest in the account. The single $5000 deposit is tempting because it earns interest, but it is only one payment, so it is not a series.",
      "clue": "Look for equal amounts and a regular gap."
    },
    "b": {
      "d": 3,
      "q": "Which of these savings plans is an annuity?",
      "opts": [
        "Ella saves $80 at the end of each fortnight in an account",
        "Raj deposits $1000 once and leaves it for ten years",
        "Tia saves $50, then $70, then $90 on the first of each month",
        "Leo deposits $60 whenever he has spare cash"
      ],
      "why": "Ella pays the same amount at regular intervals into an account that earns compound interest. Tia's payments are regular but they are not equal, so her plan does not fit. Raj's plan earns compound interest but has only one payment.",
      "clue": "Check both the size of each payment and the timing."
    }
  },
  "mat-future-value-annuity": {
    "title": "Future value of an annuity",
    "card": [
      "The future value of an annuity is the total it grows to, including every payment and all the interest earned. Interest is paid on each payment from the day it goes in.",
      "A table of future value interest factors gives a number for each interest rate per period and number of periods. The rate and periods must match how often payments are made.",
      "Future value = payment × factor. A spreadsheet can also give the answer.",
      "Example: $200 is paid in at the end of each year for 3 years at 5% p.a. The factor for 5% and 3 periods is 3.1525. Future value = 200 × 3.1525 = $630.50."
    ],
    "remember": "Future value = payment × table factor, using the rate and periods that match each payment.",
    "a": {
      "q": "An annuity pays $500 at the end of each year. For its rate and term, the future value factor is 4.3101. What is the future value?",
      "opts": ["$2155.05", "$116.00", "$500.00", "$2500.00"],
      "why": "Future value = 500 × 4.3101 = $2155.05. Dividing by the factor gives a much smaller number, because the factor is a multiplier that includes interest. That is a common mistake.",
      "clue": "Multiply the payment by the factor."
    },
    "b": {
      "d": 3,
      "q": "Leila saves $300 at the end of each quarter for 2 years at 8% p.a. compounded quarterly. Which factor should she use from the table?",
      "opts": ["2% per period, 8 periods", "8% per period, 2 periods", "2% per period, 2 periods", "8% per period, 8 periods"],
      "why": "Payments are quarterly, so the rate is 8% ÷ 4 = 2% per quarter. Two years has 2 × 4 = 8 quarters, so there are 8 periods. Using 8% and 2 periods matches the yearly figures, not the quarterly payments.",
      "clue": "Change both the rate and the term to quarters."
    }
  },
  "mat-present-value-from-tables": {
    "title": "Present value from tables",
    "card": [
      "The present value of an annuity is the single amount that, invested now, would grow to the same total as the annuity. It is a lump sum today that matches the regular payments.",
      "Present value = payment × present value factor. The factor comes from a table, found using the interest rate per period and the number of periods.",
      "Rate per period = annual rate ÷ periods per year. Number of periods = years × periods per year. Example: 6% p.a. paid monthly for 2 years is 0.5% per month for 24 periods.",
      "Worked example: $1000 paid each year for 3 years at 2% p.a. The table factor is 2.8839. Present value = 1000 × 2.8839 = $2883.90."
    ],
    "remember": "Present value = payment × table factor, using the rate and periods for each payment.",
    "a": {
      "q": "An annuity pays $2000 each year for 5 years at 2% p.a. The table factor for 2% and 5 periods is 4.7135. What is its present value?",
      "opts": ["$9427.00", "$424.31", "$10 000.00", "$2004.71"],
      "why": "Present value = 2000 × 4.7135 = $9427.00. Dividing by the factor gives $424.31, which reverses the method. The factor is multiplied by the payment.",
      "clue": "The payment and the factor are combined by one operation."
    },
    "b": {
      "d": 3,
      "q": "Mia wants the lump sum today that matches $300 paid each month for 3 years at 6% p.a. compounded monthly. Which table factor does she need?",
      "opts": [
        "0.5% per period, 36 periods",
        "6% per period, 3 periods",
        "0.5% per period, 3 periods",
        "6% per period, 36 periods"
      ],
      "why": "Payments are monthly, so the rate is 6% ÷ 12 = 0.5% per month and the periods are 3 × 12 = 36. Using 6% and 3 periods uses the annual figures, which do not match monthly payments.",
      "clue": "Both the rate and the number of periods must match how often payments are made."
    }
  },
  "mat-loan-repayments": {
    "title": "Loan repayments",
    "card": [
      "A loan is the present value of all its repayments. It is the amount that, paid in one go today, equals the repayments in value.",
      "So loan = repayment × present value factor. The factor comes from the table, using the interest rate per period and the number of periods.",
      "To find the repayment, divide: repayment = loan ÷ factor. Match the rate to the repayment period, so monthly repayments need a monthly rate.",
      "Example: a $10 000 loan has a factor of 11.2551 for 12 monthly repayments at 1% per month. Repayment = 10 000 ÷ 11.2551 = $888.49."
    ],
    "remember": "Repayment = loan ÷ present value factor.",
    "a": {
      "q": "Anna borrows $15 000. The table gives a present value factor of 5 for her rate and term. What is each repayment?",
      "opts": ["$3000", "$75 000", "$14 995", "$15 005"],
      "why": "The loan equals repayment × factor, so repayment = 15 000 ÷ 5 = $3000. Multiplying gives $75 000, but that mixes up which amount is the total and which is the factor's multiple.",
      "clue": "The loan is the repayment times the factor."
    },
    "b": {
      "d": 3,
      "q": "Tom borrows $25 000 and repays it in 12 equal monthly repayments at 1% per month. The table factor is 11.2551. What is each repayment, to the nearest cent?",
      "opts": ["$2221.22", "$2083.33", "$2333.33", "$281 377.50"],
      "why": "Repayment = 25 000 ÷ 11.2551 = $2221.22. Dividing by 12 gives $2083.33, but that ignores interest, so it is too low. Adding a flat 1% of the loan to that gives $2333.33, which is not how the table works.",
      "clue": "Divide the loan by the factor. Interest is already built into the factor."
    }
  },
  "mat-total-interest-loan": {
    "title": "Total interest on a loan",
    "card": [
      "The total paid on a loan = repayment × number of repayments. Total interest = total paid − amount borrowed.",
      "Example: Sam borrows $10 000 and repays $450 a month for 24 months. Total paid = 450 × 24 = $10 800. Total interest = 10 800 − 10 000 = $800.",
      "A longer term makes each repayment smaller, because the loan is spread over more payments.",
      "A longer term also means interest is charged for more time, so the total interest is usually much larger."
    ],
    "remember": "Total interest = total paid − amount borrowed. A longer term means smaller repayments but more interest.",
    "a": {
      "q": "Priya borrows $8000 and repays $250 a month for 36 months. What is the total interest?",
      "opts": ["$1000", "$9000", "$750", "$8250"],
      "why": "Total paid = 250 × 36 = $9000. Total interest = 9000 − 8000 = $1000. The $9000 is the total paid, not the interest, because the amount borrowed has not yet been taken off.",
      "clue": "Find the total paid first, then take off the amount borrowed."
    },
    "b": {
      "d": 3,
      "q": "Tom borrows $20 000. Plan A: $620 a month for 36 months. Plan B: $390 a month for 60 months. Which statement is correct?",
      "opts": [
        "Plan B has $1080 more interest than Plan A",
        "Plan A has $1080 more interest than Plan B",
        "Plan B has $3400 more interest than Plan A",
        "Plan A and Plan B have the same total interest"
      ],
      "why": "Plan A total = 620 × 36 = $22 320, so interest is $2320. Plan B total = 390 × 60 = $23 400, so interest is $3400. Plan B costs $1080 more in interest, even though its repayments are smaller.",
      "clue": "Work out the interest for each plan, then compare them."
    }
  },
  "mat-elevation-depression": {
    "title": "Elevation and depression",
    "card": [
      "Both angles are measured from a horizontal line, the level line through the eye of the person looking.",
      [
        "Angle of elevation",
        "the angle from the horizontal up to the line of sight, such as looking up at a flagpole top."
      ],
      [
        "Angle of depression",
        "the angle from the horizontal down to the line of sight, such as looking down from a balcony to a car."
      ],
      "The two horizontal lines are parallel, so the angle of depression from A to B equals the angle of elevation from B to A. A right triangle drawn from the heights and distances then lets you find the missing length."
    ],
    "remember": "Measure from the horizontal: up is elevation, down is depression. The matching pair are equal.",
    "a": {
      "q": "Priya stands at the bottom of a hill and looks up at a tower on top. The angle between the horizontal and her line of sight is called the:",
      "opts": ["Angle of elevation", "Angle of depression", "Angle of the vertical", "Angle of the hill"],
      "why": "Her line of sight goes up from the horizontal, so the angle is one of elevation. Depression is used only when the line of sight goes down from the horizontal.",
      "clue": "Does her line of sight go up or down from the horizontal?"
    },
    "b": {
      "d": 3,
      "q": "From the top of a lighthouse, the angle of depression to a boat is 20°. What is the angle of elevation from the boat to the top of the lighthouse?",
      "opts": ["20°", "70°", "110°", "160°"],
      "why": "The horizontal lines at the top and at the boat are parallel, so the two angles are equal and the elevation is 20°. 70° is tempting, but that is the angle between the line of sight and the lighthouse, not the horizontal.",
      "clue": "The two horizontal lines are parallel."
    }
  },
  "mat-true-compass-bearings": {
    "title": "True and compass bearings",
    "card": [
      [
        "True bearing",
        "a three-figure angle measured clockwise from north, such as 045°T or 135°T. North is 000°T, east is 090°T, south is 180°T and west is 270°T."
      ],
      [
        "Compass bearing",
        "an angle from north or south turned towards east or west, such as S45°E. Start facing south, then turn 45° towards east."
      ],
      "To convert: N θ E = θ. S θ E = 180 − θ. S θ W = 180 + θ. N θ W = 360 − θ.",
      "Example: S30°W is 30° past south towards west, so the true bearing is 180 + 30 = 210°T."
    ],
    "remember": "True bearings turn clockwise from north. Compass bearings turn from north or south.",
    "a": {
      "q": "What is the true bearing of N40°W?",
      "opts": ["320°T", "040°T", "140°T", "220°T"],
      "why": "N40°W is 40° from north towards west, which is 40° short of a full turn: 360 − 40 = 320°T. 040°T is wrong because that is N40°E, towards east.",
      "clue": "West is anticlockwise from north."
    },
    "b": {
      "d": 3,
      "q": "A ship leaves port on a true bearing of 250°T. What is its compass bearing?",
      "opts": ["S70°W", "S20°W", "N70°W", "S70°E"],
      "why": "250° lies between south (180°) and west (270°). It is 250 − 180 = 70° past south towards west, so S70°W. S20°W is wrong because it is 20° past south, which is 200°T.",
      "clue": "250° is between south at 180° and west at 270°."
    }
  },
  "mat-ratios": {
    "title": "Ratios",
    "card": [
      "A ratio compares quantities of the same kind in the same unit. Simplify it by dividing every part by the same number, as with fractions. For example, 12 : 18 = 2 : 3 after dividing by 6.",
      "If the units differ, change them to the same unit first. 50 cm to 2 m becomes 50 : 200, which simplifies to 1 : 4.",
      "To share a quantity in a ratio, add the parts to get the total number of parts. Divide the quantity by this total to find the value of one part.",
      "Multiply one part by each ratio number. Sharing $600 in the ratio 2 : 3 gives 2 + 3 = 5 parts. One part is $600 ÷ 5 = $120, so the shares are $240 and $360."
    ],
    "remember": "Add the parts, divide to find one part, then multiply by each ratio number.",
    "a": {
      "q": "Ava and Ben share $450 in the ratio 4 : 5. How much does Ben get?",
      "opts": ["$250", "$200", "$360", "$90"],
      "why": "There are 4 + 5 = 9 parts, so one part is $450 ÷ 9 = $50. Ben gets 5 × $50 = $250. $200 is Ava's share, and it is the tempting wrong option.",
      "clue": "Add the parts first, then find one part."
    },
    "b": {
      "d": 3,
      "q": "Mia mixes 750 mL of cordial with 3 L of water. What is the ratio of cordial to water in simplest form?",
      "opts": ["1 : 4", "1 : 40", "250 : 1", "3 : 4"],
      "why": "Change 3 L to 3000 mL. The ratio 750 : 3000 simplifies by dividing both by 750 to give 1 : 4. Writing 750 : 3 and simplifying to 250 : 1 is wrong because the units were not the same.",
      "clue": "Put both amounts in the same unit before simplifying."
    }
  },
  "mat-scale-drawings-plans": {
    "title": "Scale drawings and plans",
    "card": [
      "A scale such as 1 : 100 means 1 unit on the plan stands for 100 of the same units in real life. So 1 cm on the plan is 100 cm in real life.",
      "To find a real length, multiply the plan length by the scale number. To find a plan length, divide the real length by it. Then change units if needed: 100 cm = 1 m.",
      "Areas scale by the square of the scale number. With a scale of 1 : 100, 1 cm² on the plan is 100 × 100 = 10 000 cm² in real life.",
      "Worked example: a room is 5 cm by 4 cm on a 1 : 50 plan. Real size = 250 cm by 200 cm = 2.5 m by 2 m. Real area = 2.5 × 2 = 5 m²."
    ],
    "remember": "Multiply lengths by the scale number. For areas, multiply by the scale number squared.",
    "a": {
      "q": "A wall is 6 cm long on a plan with a scale of 1 : 200. How long is the real wall?",
      "opts": ["12 m", "1.2 m", "30 m", "120 m"],
      "why": "Real length = 6 × 200 = 1200 cm, which is 12 m because 100 cm = 1 m. The option 120 m comes from dividing by 10 instead of 100 when changing units.",
      "clue": "Multiply by 200, then change cm to m."
    },
    "b": {
      "d": 3,
      "q": "A courtyard measures 3 cm by 2 cm on a plan with a scale of 1 : 500. What is its real area?",
      "opts": ["150 m²", "30 m²", "1500 m²", "75 000 m²"],
      "why": "Real sides are 3 × 500 = 1500 cm = 15 m and 2 × 500 = 1000 cm = 10 m. Area = 15 × 10 = 150 m². The option 1500 m² comes from multiplying the plan area (6 cm²) by 500 instead of by 500².",
      "clue": "Find both real sides in metres first, then multiply."
    }
  },
  "mat-rates-conversions": {
    "title": "Rates and conversions",
    "card": [
      "A rate compares two quantities with different units, such as km/h (kilometres per hour) or $/kg (dollars per kilogram). The word per means for each one.",
      "To find a rate, divide the first quantity by the second. If 3 kg of apples cost $12, the rate is $12 ÷ 3 kg = $4/kg.",
      "To convert a rate, change each unit separately. For km/h to m/s, multiply by 1000, as 1 km is 1000 m. Then divide by 3600: an hour has 3600 seconds, so the distance in one second is smaller.",
      "Example: 72 km/h = 72 × 1000 ÷ 3600 = 20 m/s. To go back from m/s to km/h, multiply by 3.6."
    ],
    "remember": "Change each unit on its own: km to m (×1000) and per hour to per second (÷3600).",
    "a": {
      "q": "A cyclist travels at 18 km/h. What is this speed in m/s?",
      "opts": ["5 m/s", "64.8 m/s", "0.3 m/s", "18 000 m/s"],
      "why": "18 × 1000 = 18 000 m per hour, and 18 000 ÷ 3600 = 5 m/s. Multiplying by 3.6 gives 64.8, which is the conversion from m/s to km/h, so it is the wrong way round.",
      "clue": "Change km to m, then per hour to per second."
    },
    "b": {
      "d": 3,
      "q": "A tap fills a tank at 90 litres per minute. What is this rate in litres per second?",
      "opts": ["1.5 L/s", "5400 L/s", "0.67 L/s", "0.025 L/s"],
      "why": "A minute has 60 seconds, so each second gives 90 ÷ 60 = 1.5 litres. Multiplying by 60 gives 5400, which is the rate per hour, not per second. Dividing by 3600 treats a minute as if it were an hour.",
      "clue": "Will the amount in one second be smaller or larger than in one minute?"
    }
  },
  "mat-energy-power": {
    "title": "Energy and power",
    "card": [
      ["Power", "how fast an appliance uses energy. It is measured in watts (W). 1 kilowatt (kW) = 1000 W."],
      [
        "Energy",
        "the total amount used. Energy = power × time. With power in kW and time in hours, energy is in kilowatt-hours (kWh)."
      ],
      "Electricity is billed by the kWh. Cost = kWh used × price per kWh. Change watts to kW first by dividing by 1000.",
      "Example: a 2000 W heater runs for 3 hours. 2000 W = 2 kW. Energy = 2 × 3 = 6 kWh. At 30 cents per kWh, the cost is 6 × 30 = 180 cents, or $1.80."
    ],
    "remember": "Change watts to kW, then multiply by hours to get kWh, then by the price.",
    "a": {
      "q": "A 500 W microwave runs for 2 hours. How much energy does it use?",
      "opts": ["1 kWh", "1000 kWh", "250 kWh", "0.25 kWh"],
      "why": "500 W = 0.5 kW, so energy = 0.5 × 2 = 1 kWh. 1000 kWh comes from not dividing by 1000 at all: 500 × 2 = 1000 is in watt-hours, not kWh.",
      "clue": "Divide watts by 1000 before multiplying by time."
    },
    "b": {
      "d": 3,
      "q": "Ravi runs a 1500 W heater for 4 hours. Electricity costs 25 cents per kWh. What is the cost?",
      "opts": ["$1.50", "$0.38", "$150.00", "$1500.00"],
      "why": "1500 W = 1.5 kW, so energy = 1.5 × 4 = 6 kWh. Cost = 6 × 25 = 150 cents, which is $1.50. $150.00 treats 150 cents as dollars, and $1500.00 comes from using 1500 W instead of 1.5 kW.",
      "clue": "Find kWh first, then the cost in cents, then change to dollars."
    }
  },
  "mat-speed-distance-time": {
    "title": "Speed, distance and time",
    "card": [
      "Speed = distance ÷ time. Rearranged, distance = speed × time and time = distance ÷ speed. Keep the units matching, such as km with hours.",
      "Worked example: a cyclist rides 45 km in 3 hours. Speed = 45 ÷ 3 = 15 km/h. At 15 km/h, 20 km takes 20 ÷ 15 = 1.33 hours.",
      "On a distance-time graph, time is across and distance is up. The gradient (rise ÷ run) is the speed, so a steeper line means a faster speed.",
      "A flat line means distance is not changing, so the object is stopped. A line going back down towards zero means the object is returning to the start."
    ],
    "remember": "Speed = distance ÷ time, and on a distance-time graph the gradient is the speed.",
    "a": {
      "q": "A train travels 240 km at a steady speed of 80 km/h. How long does the trip take?",
      "opts": ["3 hours", "0.33 hours", "320 hours", "19 200 hours"],
      "why": "Time = distance ÷ speed = 240 ÷ 80 = 3 hours. Dividing speed by distance instead gives 0.33, which flips the rearranged formula.",
      "clue": "Time is distance divided by speed."
    },
    "b": {
      "d": 3,
      "q": "On a distance-time graph, Priya's line rises from 0 km at 0 h to 12 km at 2 h. It then stays flat until 3 h. What is her average speed over the first 2 hours, and what does the flat part show?",
      "opts": [
        "6 km/h, and she is stopped",
        "6 km/h, and she is moving slowly",
        "4 km/h, and she is stopped",
        "4 km/h, and she is moving slowly"
      ],
      "why": "Speed is the gradient: 12 ÷ 2 = 6 km/h. A flat line means distance is not changing, so she is stopped, not moving slowly. Dividing by 3 hours gives 4 km/h, but the first stage lasts only 2 hours.",
      "clue": "Use only the first 2 hours, and ask what a gradient of zero means."
    }
  },
  "mat-fuel-consumption": {
    "title": "Fuel consumption",
    "card": [
      "Fuel consumption is the number of litres a car uses to travel 100 km. It is written as L/100 km. A lower number means the car uses less fuel.",
      "To find the fuel for a trip, use: fuel (L) = consumption ÷ 100 × distance (km). Divide by 100 first to get the litres used per kilometre.",
      "To find the cost, multiply the litres by the price per litre. Cost = fuel used × price per litre.",
      "Example: a car uses 8 L/100 km and petrol costs $2 per litre. A 250 km trip uses 8 ÷ 100 × 250 = 20 L. The cost is 20 × $2 = $40."
    ],
    "remember": "Fuel used = consumption ÷ 100 × distance. Then multiply by the price per litre for the cost.",
    "a": {
      "q": "A car uses 6 L/100 km. How much fuel does it use on a 350 km trip?",
      "opts": ["21 L", "58.3 L", "1.7 L", "2100 L"],
      "why": "Fuel = 6 ÷ 100 × 350 = 21 L. Dividing 350 by 6 gives 58.3, but dividing the distance by the consumption does not give litres. The fuel used comes from multiplying the litres per kilometre by the distance.",
      "clue": "Find the litres used for each kilometre, then multiply by the distance."
    },
    "b": {
      "d": 3,
      "q": "Sam's van uses 9.5 L/100 km. Fuel costs $1.80 per litre. What is the fuel cost of a 400 km trip?",
      "opts": ["$68.40", "$38.00", "$6.84", "$17.10"],
      "why": "Fuel = 9.5 ÷ 100 × 400 = 38 L. Cost = 38 × $1.80 = $68.40. The answer $38.00 is the number of litres, so the cost step is still needed, and $17.10 is only the cost of 100 km.",
      "clue": "Find the litres first, then use the price."
    }
  },
  "mat-flow-networks": {
    "title": "Flow networks",
    "card": [
      "A flow network is a directed network, so each edge has an arrow showing the way flow can go. Flow might be cars on roads, water in pipes or data in cables.",
      ["Source", "the vertex where the flow starts. Nothing flows into it along the network."],
      ["Sink", "the vertex where the flow ends. Nothing flows out of it along the network."],
      "Each edge has a capacity, the most it can carry in a set time, such as 40 cars an hour. The flow along an edge can be anything from 0 up to its capacity, and only in the direction of the arrow."
    ],
    "remember": "A flow network has arrows, a source, a sink and a capacity on every edge.",
    "a": {
      "q": "In a flow network of roads, an edge from P to Q is labelled 40. What does this mean?",
      "opts": [
        "Up to 40 cars an hour can travel from P to Q",
        "Exactly 40 cars an hour must travel from P to Q",
        "Up to 40 cars an hour can travel either way",
        "The road from P to Q is 40 kilometres long"
      ],
      "why": "The label is the capacity, the most the edge can carry in a set time, and the arrow gives the direction. Exactly 40 is wrong because the flow can be anything from 0 up to the capacity.",
      "clue": "Capacity is a limit on the flow, in one direction."
    },
    "b": {
      "d": 2,
      "q": "A flow network of pipes has one source and one sink. Every arrow at vertex W points away from W, and every arrow at vertex K points towards K. Which is correct?",
      "opts": [
        "W is the source and K is the sink",
        "K is the source and W is the sink",
        "W and K are both sinks",
        "W and K are both sources"
      ],
      "why": "Nothing flows into W, so flow can only start there, which makes W the source. Nothing flows out of K, so flow ends there, which makes K the sink. Swapping them is wrong because the source is where arrows leave, not where they arrive.",
      "clue": "Flow starts where nothing comes in."
    }
  },
  "mat-cuts": {
    "title": "Cuts",
    "card": [
      "A cut is a line drawn across a flow network that splits the vertices into two groups. The source is in one group and the sink is in the other.",
      "The capacity of a cut is the total of the capacities of the edges that point from the source side to the sink side. Edges that point back towards the source side are not counted.",
      "Edges with both ends on the same side do not cross the cut, so they are not counted either.",
      "Example: the source S has edges S to A (7) and S to B (5). A to T (4) and B to T (6) lead to the sink T. A cut with S, A, B on one side and T on the other crosses A to T and B to T. Its capacity is 4 + 6 = 10."
    ],
    "remember": "Add only the edges that go from the source side to the sink side.",
    "a": {
      "q": "A cut separates S and A from B and T. The edges are S to B (3), A to B (5), A to T (2) and B to T (6). What is the capacity of the cut?",
      "opts": ["10", "16", "8", "14"],
      "why": "The edges that go from the S and A side to the B and T side are S to B (3), A to B (5) and A to T (2). The total is 3 + 5 + 2 = 10. B to T (6) is not counted, as both ends are on the sink side, and adding it gives 16.",
      "clue": "Count only the edges that start on the source side and end on the sink side."
    },
    "b": {
      "d": 3,
      "q": "The edges are S to A (9), S to B (6), A to B (3), B to A (4), A to T (5) and B to T (7). A cut separates S and A from B and T. What is its capacity?",
      "opts": ["14", "18", "10", "12"],
      "why": "The edges that cross from the S and A side to the B and T side are S to B (6), A to B (3) and A to T (5), so the total is 6 + 3 + 5 = 14. B to A (4) points back to the source side, so it is ignored: adding it gives 18 and subtracting it gives 10. Adding only the edges into T gives 12, which misses S to B and A to B.",
      "clue": "Check the direction of each edge that crosses the cut."
    }
  },
  "mat-maximum-flow-minimum-cut": {
    "title": "Maximum flow and minimum cut",
    "card": [
      "A cut splits a network into a source side and a sink side, as in the last point. Every unit of flow must cross each cut to reach the sink.",
      "So no flow can be bigger than the capacity of any cut. The cut with the smallest capacity is called the minimum cut, and it is the tightest limit.",
      "Maximum flow = capacity of the minimum cut. If a flow you find equals the capacity of some cut, that flow is the maximum and that cut is the minimum.",
      "Example: a network's cuts have capacities 12, 9 and 15. The maximum flow is 9. Finding a flow of 9 confirms it, since no flow can get past the cut of 9."
    ],
    "remember": "The tightest cut sets the limit: maximum flow = minimum cut.",
    "a": {
      "q": "A network has exactly three cuts, with capacities 14, 11 and 17. What is the maximum flow through the network?",
      "opts": ["11", "14", "17", "42"],
      "why": "The maximum flow equals the capacity of the minimum cut, which is 11. Choosing 17 is tempting, but all the flow must also cross the cut of 11, so it cannot be more than 11. Adding the cuts to get 42 has no meaning.",
      "clue": "Which cut is the tightest limit?"
    },
    "b": {
      "d": 3,
      "q": "Ava finds a way to send 15 kL per hour through a pipe network. She also finds a cut with a capacity of 15 kL per hour. What can she conclude?",
      "opts": [
        "15 kL per hour is the maximum flow",
        "The maximum flow could be more than 15 kL per hour",
        "Another cut could have a capacity under 15 kL per hour",
        "The maximum flow is less than 15 kL per hour"
      ],
      "why": "No flow can be bigger than any cut, so no flow can pass the cut of 15, and 15 is the maximum. Thinking a bigger flow might exist is tempting, but it would have to cross that cut. Also, no cut can be under 15, since Ava's flow of 15 crosses every cut.",
      "clue": "Can any flow be bigger than a cut it has to cross?"
    }
  },
  "mat-flow-practice": {
    "title": "Flow in practice",
    "card": [
      "A bottleneck is an edge or set of edges that limits the maximum flow. It is found by looking at the minimum cut, because those edges are full when the flow is at its maximum.",
      "Example: a network has two roads in a row. Road 1 carries 8 cars a minute and road 2 carries 5. The most that can get through is 5, so road 2 is the bottleneck.",
      "Raising the capacity of a bottleneck edge raises every cut that contains it. The new maximum flow is the new smallest cut, which may be a different cut that does not contain that edge.",
      "Raising the capacity of an edge that is not in the minimum cut does not change the maximum flow, as the minimum cut stays the same."
    ],
    "remember": "To raise the flow, widen an edge in the minimum cut, and check the new smallest cut.",
    "a": {
      "q": "Two pipes join in a line. Pipe A carries 12 litres a minute and pipe B carries 7. What is the maximum flow, and where is the bottleneck?",
      "opts": [
        "7 litres a minute, at pipe B",
        "7 litres a minute, at pipe A",
        "12 litres a minute, at pipe A",
        "19 litres a minute, at pipe B"
      ],
      "why": "Water must pass through both pipes in turn, so the flow cannot be more than the smaller capacity, 7. Pipe B is full at that flow, so it is the bottleneck. Pipe A is not full, so it is not the limit.",
      "clue": "Which pipe is the smaller one in the line?"
    },
    "b": {
      "d": 3,
      "q": "A data network has source S and sink T. Its minimum cut is 20 Mb/s, made up of edges P (12) and Q (8). The next smallest cut is 26 Mb/s and does not contain P. P is raised from 12 to 20. What is the new maximum flow?",
      "opts": ["26 Mb/s", "28 Mb/s", "20 Mb/s", "32 Mb/s"],
      "why": "Raising P lifts the first cut to 20 − 12 + 20 = 28. The 26 Mb/s cut does not contain P, so it stays at 26 and is now the smallest, so the maximum flow is 26. Adding 8 to get 28 is tempting, but the flow cannot pass the new smallest cut.",
      "clue": "Work out the old cut's new capacity, then compare it with the other cut."
    }
  },
  "mat-activity-networks": {
    "title": "Activity networks",
    "card": [
      "A big project is split into smaller jobs called activities. An activity network shows them as a diagram.",
      "Each activity is an edge (an arrow) with a letter and its duration, such as A, 3 for an activity A that takes 3 hours. Each arrow points in the direction of time.",
      "Some activities must wait for others. A vertex (a circle) is where arrows meet, and any activity leaving a vertex cannot start until every activity arriving at it is finished.",
      "Example: A, 2 leads to a vertex. Two arrows leave it: B, 4 and C, 3. B and C can only start once A is done. B and C do not wait for each other."
    ],
    "remember": "In an activity network, edges are activities with durations, and an activity waits for all arrows into its starting vertex.",
    "a": {
      "q": "In an activity network, activities D and E both arrive at a vertex, and activity F leaves it. When can F start?",
      "opts": [
        "Once both D and E are finished",
        "As soon as D is finished",
        "As soon as E is finished",
        "At the same time as D and E"
      ],
      "why": "F leaves the vertex, so it must wait for every activity arriving there. That means both D and E must be finished. Starting after only one of them is tempting, but F would then begin before the other is done.",
      "clue": "An activity waits for everything arriving at its starting vertex."
    },
    "b": {
      "d": 2,
      "q": "Mia plans a school fair. Activity P, 3 days (book the hall) leads to a vertex. Activities Q, 2 days (print posters) and R, 4 days (hire tables) both leave that vertex. Which statement is correct?",
      "opts": [
        "Q and R can both start once P is finished",
        "Q can start only after R is finished",
        "R can start before P is finished",
        "P can start only after Q and R are finished"
      ],
      "why": "Q and R both leave the vertex where P arrives, so each must wait for P and no other activity. They do not wait for each other. P is before them, so it cannot wait for Q or R.",
      "clue": "Look at which arrows enter the vertex and which leave it."
    }
  },
  "mat-earliest-starting-times": {
    "title": "Earliest starting times",
    "card": [
      "The earliest starting time (EST) of an activity is the soonest it can begin. Activities with nothing before them start at 0.",
      "Scan forward: an activity finishes at its own EST plus its own duration. The next activity's EST is the largest finish time of the activities leading into it, since it must wait for all of them.",
      [
        "Example",
        "A (3 days) and B (5 days) both start at 0. C (4 days) follows A, so its EST is 0 + 3 = 3. D (3 days) follows A and B, which finish at 3 and 5, so its EST is 5."
      ],
      "E (3 days) follows C and D. C finishes at 3 + 4 = 7 and D at 5 + 3 = 8, so the EST of E is 8. The project's shortest time is 8 + 3 = 11 days."
    ],
    "remember": "Scan forward, add durations, and take the largest total where paths meet.",
    "a": {
      "q": "Activity X takes 4 days and activity Y takes 6 days. Both start at 0, and activity Z can only begin after both are finished. What is the EST of Z?",
      "opts": ["6 days", "10 days", "4 days", "2 days"],
      "why": "Z must wait for both X and Y. X finishes at 4 and Y at 6, so Z can start at the larger value, 6. Adding them to get 10 is wrong, because X and Y run at the same time.",
      "clue": "Z waits for the slower of the two."
    },
    "b": {
      "d": 3,
      "q": "P (2 days) and Q (4 days) both start at 0. R (5 days) follows P. S (4 days) follows P and Q. T (6 days) follows R and S. What is the shortest time to finish the project?",
      "opts": ["14 days", "13 days", "21 days", "8 days"],
      "why": "R finishes at 2 + 5 = 7. S starts at the larger of 2 and 4, which is 4, so S finishes at 8. T starts at the larger of 7 and 8, which is 8, so the project takes 8 + 6 = 14 days. The answer 8 is only the EST of T, and it leaves out T's own duration.",
      "clue": "Find the EST of T, then add its duration."
    }
  },
  "mat-latest-starting-times": {
    "title": "Latest starting times",
    "card": [
      "The latest starting time (LST) of an activity is the latest it can begin without delaying the whole project. A backward scan through the network finds it.",
      "Start at the finish vertex. Give it the project's shortest time, which comes from the forward scan. Then work backwards, one vertex at a time.",
      "An activity's LST is the value at the vertex it leads to, minus its duration. A vertex's value is the smallest LST of the activities leaving it.",
      "Example: the finish vertex is 12. A (4 days) and B (7 days) both go from vertex V to the finish. A's LST is 12 − 4 = 8. B's LST is 12 − 7 = 5. V's value is the smallest, 5."
    ],
    "remember": "Work back from the finish: subtract each duration, and keep the smallest result at each vertex.",
    "a": {
      "q": "Two activities leave vertex V. One lasts 3 days and leads to a vertex with value 10. The other lasts 5 days and leads to a vertex with value 11. What is the value at vertex V?",
      "opts": ["6", "7", "13", "16"],
      "why": "10 − 3 = 7 and 11 − 5 = 6, and a vertex takes the smallest result, so V is 6. Choosing 7 is wrong: the 5-day activity would then end on day 12, after 11, which delays the whole project.",
      "clue": "Subtract each duration, then compare the two results."
    },
    "b": {
      "d": 3,
      "q": "In Mia's building project, the finish vertex has value 20. Activity P (6 days) and activity Q (9 days) both go from vertex X to the finish. What is the LST of activity P?",
      "opts": ["14", "11", "26", "6"],
      "why": "P's LST is the value at the vertex it leads to minus its duration: 20 − 6 = 14. The tempting 11 is the value at vertex X, which is set by Q, the longer activity. P can start as late as day 14 and still finish by day 20.",
      "clue": "Use only P's duration and the vertex P leads to."
    }
  },
  "mat-float-time": {
    "title": "Float time",
    "card": [
      "Float is how long an activity can be delayed without delaying the whole project. Float = latest start time − earliest start time.",
      "Always subtract the earliest start from the latest start. Never add them. Float is in the same unit as the times, such as days or hours.",
      "Worked example: an activity has an earliest start of 6 days and a latest start of 10 days. Float = 10 − 6 = 4 days.",
      "A float of 4 days means the activity can start up to 4 days late and the project still finishes on time. A float of 0 means there is no room to delay it."
    ],
    "remember": "Float is latest start minus earliest start: the spare time an activity has.",
    "a": {
      "q": "An activity has an earliest start time of 8 days and a latest start time of 13 days. What is its float?",
      "opts": ["5 days", "21 days", "8 days", "13 days"],
      "why": "Float = latest start − earliest start = 13 − 8 = 5 days. Adding the two times gives 21, but float is a difference, so you subtract.",
      "clue": "Subtract the earlier start from the later one."
    },
    "b": {
      "d": 3,
      "q": "Priya manages a build in Newcastle. Fitting windows has an earliest start of 14 days and a latest start of 14 days. Painting has an earliest start of 9 days and a latest start of 12 days. Which statement is correct?",
      "opts": [
        "Windows have 0 days float, and painting has 3 days",
        "Windows have 14 days float, and painting has 3 days",
        "Windows have 0 days float, and painting has 12 days",
        "Windows have 14 days float, and painting has 21 days"
      ],
      "why": "Windows: 14 − 14 = 0, so there is no room to delay them. Painting: 12 − 9 = 3 days of float. Taking a latest start time on its own as the float is the tempting mistake, because float is a difference.",
      "clue": "Work out latest start minus earliest start for each activity."
    }
  },
  "mat-critical-path": {
    "title": "The critical path",
    "card": [
      "The critical path is the longest path through an activity network, from start to finish. Its length is the shortest time in which the whole project can be finished.",
      "Every activity on the critical path has zero float, so its earliest start time equals its latest start time. These are called critical activities.",
      "A delay to any critical activity delays the whole project by the same amount. An activity off the path has float, so it can start late by up to its float without delaying the project.",
      "Example: path A, C, E takes 3 + 5 + 4 = 12 days. Path B, D takes 4 + 6 = 10 days. The longest is A, C, E, so it is the critical path and the project takes 12 days."
    ],
    "remember": "The critical path is the longest path. It has no float, so any delay on it delays the project.",
    "a": {
      "q": "A project has three paths from start to finish. Path 1 takes 14 days, path 2 takes 17 days and path 3 takes 15 days. What is the shortest time to finish the project?",
      "opts": ["17 days", "14 days", "15 days", "46 days"],
      "why": "The project cannot finish until the longest path is done, so the critical path of 17 days sets the time. The shortest path of 14 days is tempting, but the project would not be finished when that path ends.",
      "clue": "The project is only finished when every path is done."
    },
    "b": {
      "d": 3,
      "q": "In Priya's building project, activity G is on the critical path and activity H is not. Both are due to start on Monday. G is delayed by 2 days. What happens?",
      "opts": [
        "The whole project is delayed by 2 days",
        "The whole project is delayed by less than 2 days",
        "The project is not delayed, as G has float",
        "Only activity H is delayed, by 2 days"
      ],
      "why": "G is critical, so it has zero float and a 2 day delay moves the finish by 2 days. The option saying G has float is tempting but wrong, because float belongs to activities off the critical path, such as H.",
      "clue": "Critical activities have zero float."
    }
  },
  "mat-scatterplots": {
    "title": "Scatterplots",
    "card": [
      "A scatterplot shows pairs of numerical data as points on a graph. Each point is one person, place, object or time, with a value for each of two variables.",
      [
        "Explanatory variable",
        "the variable that may explain or influence the other. It goes on the x-axis (horizontal). Choose it by asking which may explain the other, not by number size or the order measured."
      ],
      ["Response variable", "the variable that may respond to the change. It goes on the y-axis (vertical)."],
      "Example: Sam records hours of study and test mark for 12 students. Hours may explain the mark, so hours go on the x-axis and mark on the y-axis. A student with 3 hours and a mark of 60 is plotted at (3, 60)."
    ],
    "remember": "Plot each pair as a point, with the explanatory variable on the x-axis.",
    "a": {
      "q": "A teacher plots the number of hours of sleep and the number of mistakes made in a maths quiz. Which variable goes on the x-axis?",
      "opts": [
        "Hours of sleep, as it may explain the mistakes",
        "Mistakes, as it may explain the hours of sleep",
        "Mistakes, as it is the larger number",
        "Hours of sleep, as it is measured first"
      ],
      "why": "Sleep may influence how many mistakes are made, so it is the explanatory variable and goes on the x-axis. The size of the numbers or the order of measuring does not decide the axis.",
      "clue": "Which variable may explain the other?"
    },
    "b": {
      "d": 2,
      "q": "Mia records the daily maximum temperature and the number of ice creams sold at her stall in Byron Bay. She plots a scatterplot to see if the two are related. On Monday it was 30°C and she sold 85. Which point is plotted for Monday?",
      "opts": ["(30, 85)", "(85, 30)", "(30, 30)", "(85, 85)"],
      "why": "Temperature may explain sales, so it is the explanatory variable and goes on the x-axis. Monday is plotted as (30, 85). The point (85, 30) swaps the axes.",
      "clue": "Which variable might explain the other? It is the x value."
    }
  },
  "mat-correlation": {
    "title": "Correlation",
    "card": [
      [
        "Direction",
        "In a positive relationship, y tends to increase as x increases. In a negative relationship, y tends to decrease as x increases."
      ],
      [
        "Form",
        "If the points follow a straight-line pattern, the relationship is linear. If they follow a curve, it is non-linear."
      ],
      [
        "Strength",
        "The more tightly the points cluster around the pattern, the stronger the relationship. Points that are widely spread show a weak relationship. In between is moderate."
      ],
      "Example: the points on a scatterplot of hours of study and test mark form a tight, upward straight-line pattern. That is a strong, positive, linear relationship."
    ],
    "remember": "A full description names all three: how strong, which way and what shape.",
    "a": {
      "q": "A scatterplot shows the age of a car and its resale value. The points fall from left to right, close to a straight line. How is the relationship described?",
      "opts": [
        "Strong, negative, linear",
        "Strong, positive, linear",
        "Weak, negative, linear",
        "Strong, negative, non-linear"
      ],
      "why": "The points fall as age increases, so the direction is negative. They sit close to a straight line, so it is strong and linear. Positive is wrong because resale value goes down, not up, as age increases.",
      "clue": "As x goes up, which way does y move?"
    },
    "b": {
      "d": 2,
      "q": "Mia plots shoe size against height for her class. The points rise from left to right but are widely scattered around a straight-line pattern. Which description fits best?",
      "opts": ["Weak, positive, linear", "Strong, positive, linear", "Weak, negative, linear", "Weak, positive, non-linear"],
      "why": "The points rise, so the direction is positive. They are widely scattered, so the relationship is weak. They follow a straight-line pattern, so it is linear. Strong is tempting because the points rise, but strength depends on how tightly the points cluster.",
      "clue": "Strength is about how tightly the points cluster, not just whether they rise."
    }
  },
  "mat-pearson-s-correlation-coefficient": {
    "title": "Pearson's correlation coefficient",
    "card": [
      "Pearson's correlation coefficient, written r, is a number that measures how strong a linear relationship is and which direction it goes. It is found with a calculator.",
      "r is always from -1 to 1. The sign gives the direction: a positive r means y tends to rise as x rises, and a negative r means y tends to fall as x rises.",
      "The distance from 0 gives the strength. Values close to 1 or -1 are strong, values near 0.5 or -0.5 are moderate, and values close to 0 are weak. So r = -0.9 is stronger than r = 0.6.",
      "Example: r = -0.82 is a strong negative linear relationship. r = 0 means there is no linear relationship, but the data could still follow a curve."
    ],
    "remember": "The sign of r gives the direction. How close it is to 1 or -1 gives the strength.",
    "a": {
      "q": "A calculator gives r = -0.85 for a set of data. Which description is correct?",
      "opts": [
        "A strong negative linear relationship",
        "A strong positive linear relationship",
        "A weak negative linear relationship",
        "A weak positive linear relationship"
      ],
      "why": "The negative sign means y tends to fall as x rises. The value 0.85 is close to 1, so the relationship is strong. The positive options ignore the sign, and the weak options misread how close 0.85 is to 1.",
      "clue": "Read the sign for direction, then see how close the number is to 1 or -1."
    },
    "b": {
      "d": 3,
      "q": "Four pairs of variables have these values of r. Which pair has the strongest linear relationship?",
      "opts": ["r = -0.92", "r = 0.75", "r = 0.10", "r = -0.48"],
      "why": "Strength depends on the distance from 0, not on the sign. The value -0.92 is closest to -1, so it is the strongest. A common mistake is to pick 0.75 because it is the largest positive value, but a negative r can be stronger.",
      "clue": "Ignore the signs and ask which number is closest to 1."
    }
  },
  "mat-least-squares-regression-line": {
    "title": "Least-squares regression line",
    "card": [
      "A least-squares regression line is the line of best fit for a scatterplot. A calculator finds it, and it is written as y = a + bx, where x is the explanatory variable and y is the response variable.",
      "The gradient b shows how much y changes, on average, when x increases by 1. The y-intercept a is the predicted value of y when x = 0.",
      "To predict, put a value of x into the equation and work out y. The line is used to predict y from x, not x from y.",
      "Example: a line for a bakery is y = 20 + 3x, where x is the temperature in °C and y is the number of iced drinks sold. At x = 30, y = 20 + 3 × 30 = 110 drinks."
    ],
    "remember": "Put x into y = a + bx to predict y. The gradient is the change in y for each 1 increase in x.",
    "a": {
      "q": "A regression line is y = 20 + 3x, where x is the temperature in °C and y is the iced drinks sold. What does the gradient 3 tell us?",
      "opts": [
        "Each 1°C rise adds about 3 drinks sold",
        "Each extra drink sold adds about 3°C",
        "At 0°C, about 3 drinks are sold",
        "At 3°C, about 20 drinks are sold"
      ],
      "why": "The gradient is the change in y for each 1 increase in x. Here, y is drinks and x is temperature, so each 1°C rise adds about 3 drinks. The value 20 is the y-intercept, so saying 3 drinks are sold at 0°C mixes up the gradient and the intercept.",
      "clue": "Gradient is the change in y for a 1 unit rise in x."
    },
    "b": {
      "d": 2,
      "q": "Ravi's regression line is y = 12 + 2x, where x is the hours studied and y is the test mark. What mark does the line predict for 8 hours of study?",
      "opts": ["28", "20", "112", "22"],
      "why": "Put x = 8 into the line: y = 12 + 2 × 8 = 12 + 16 = 28. Answering 112 comes from adding 12 and 2 first, then multiplying by 8: (12 + 2) × 8 = 112. That ignores the order of operations, as the multiplication must be done before the addition.",
      "clue": "Multiply 2 by 8 before you add 12."
    }
  },
  "mat-interpolation-extrapolation": {
    "title": "Interpolation and extrapolation",
    "card": [
      "A regression line can be used to predict values. The range of the data runs from the smallest to the largest x-value in the data set.",
      [
        "Interpolation",
        "predicting for an x-value inside the range of the data. It is fairly reliable, because the line is built from data on both sides of that value."
      ],
      [
        "Extrapolation",
        "predicting for an x-value outside the range of the data. It is less reliable, because the pattern may not continue beyond the data."
      ],
      "Example: a line is fitted to data for x from 10 to 40. Predicting at x = 25 is interpolation. Predicting at x = 60 is extrapolation."
    ],
    "remember": "Inside the data range is interpolation and fairly reliable. Outside it is extrapolation and less reliable.",
    "a": {
      "q": "A line of best fit is drawn using data with x-values from 20 to 50. Which prediction is an example of extrapolation?",
      "opts": ["Predicting y when x = 70", "Predicting y when x = 35", "Predicting y when x = 22", "Predicting y when x = 48"],
      "why": "The value x = 70 is outside the range of 20 to 50, so it is extrapolation. The values 22, 35 and 48 all lie inside the range, so they are interpolation, even 22 and 48, which sit close to the ends.",
      "clue": "Compare each x-value with the data the line was built from."
    },
    "b": {
      "d": 3,
      "q": "Dana records the hours of study (from 2 to 10 hours) and the test scores of 30 students. She uses her line to predict scores for 6 hours and for 14 hours. Which statement is correct?",
      "opts": [
        "The 6 hour prediction is more reliable than the 14 hour one",
        "The 14 hour prediction is more reliable than the 6 hour one",
        "Both predictions are equally reliable, as they use one line",
        "Neither prediction is reliable, as it is only an estimate"
      ],
      "why": "The value 6 hours is inside the range of 2 to 10, so it is interpolation and fairly reliable. The value 14 hours is outside the range, so it is extrapolation and less reliable, even though both use the same line.",
      "clue": "Which prediction has data on both sides of it?"
    }
  },
  "mat-correlation-causation": {
    "title": "Correlation and causation",
    "card": [
      "Correlation means two variables move together. Causation means a change in one variable produces a change in the other.",
      "A strong correlation does not prove causation. The data only shows that the variables move together, not why.",
      [
        "Third factor",
        "a separate variable that affects both of the others and makes them move together. Ice cream sales and sunburn cases both rise in hot weather, so temperature is a third factor."
      ],
      "To claim causation, there needs to be more than a scatterplot or a value of r. A reasonable explanation for how one variable affects the other is needed, and third factors need to be ruled out."
    ],
    "remember": "Moving together does not prove one causes the other. Look for a third factor.",
    "a": {
      "q": "A town finds a strong positive correlation between the number of fire trucks sent to a fire and the damage done. What is the best conclusion?",
      "opts": [
        "The correlation alone does not show trucks cause damage",
        "Sending more fire trucks causes more damage to buildings",
        "Damage causes fewer fire trucks to be sent to a fire",
        "The correlation is an error, as r cannot be positive here"
      ],
      "why": "A correlation shows only that the variables move together. A third factor, the size of the fire, probably leads to both more trucks and more damage. Saying the trucks cause the damage is the tempting mistake.",
      "clue": "Think about what makes both numbers larger."
    },
    "b": {
      "d": 3,
      "q": "Data from a city shows that suburbs with more swimming pools have more cases of heat stroke. Which is the most likely reason?",
      "opts": [
        "Hotter suburbs have more pools and more heat stroke",
        "Owning a pool causes heat stroke in the owner",
        "Heat stroke leads people to build pools at home",
        "Pools and heat stroke are unrelated, so r must be 0"
      ],
      "why": "Hot weather is a third factor that could lead to both more pools and more heat stroke. Claiming pools cause heat stroke treats the correlation as causation. The data show the variables move together, so r is not 0.",
      "clue": "Look for a separate factor that affects both variables."
    }
  },
  "mat-relative-frequency": {
    "title": "Relative frequency",
    "card": [
      "A trial is one go at an experiment, such as one roll of a die. An event is an outcome you are counting, such as rolling a 6.",
      "Relative frequency = number of times the event happened ÷ number of trials. It can be written as a fraction, a decimal or a percentage.",
      "Example: Sam flips a drawing pin 50 times and it lands point up 30 times. Relative frequency = 30 ÷ 50 = 3/5 = 0.6 = 60%.",
      "Relative frequency is used as an estimate of probability when the true value is not known. More trials usually give a better estimate."
    ],
    "remember": "Relative frequency = times it happened ÷ total trials. More trials usually give a better estimate.",
    "a": {
      "q": "A spinner is spun 40 times and lands on red 14 times. What is the relative frequency of red?",
      "opts": ["14/40 = 0.35", "14/26 = 0.54", "40/14 = 2.86", "26/40 = 0.65"],
      "why": "Relative frequency = 14 ÷ 40 = 0.35. The tempting option 14/26 divides by the number of non-red spins, but the total number of trials must go on the bottom.",
      "clue": "Divide by the total number of spins."
    },
    "b": {
      "d": 3,
      "q": "Lena tests a coin she thinks is unfair. After 10 flips she gets 7 heads. Her friend Ravi flips the same coin 500 times and gets 270 heads. Which estimate of the probability of heads is likely to be better?",
      "opts": [
        "Ravi's 270/500, because it uses more trials",
        "Lena's 7/10, because it is a higher value",
        "Lena's 7/10, because she suspects the coin is unfair",
        "Both are equally good, because it is one coin"
      ],
      "why": "More trials usually give a better estimate of probability, so Ravi's 270 ÷ 500 = 0.54 is likely closer to the true value. Lena's 7/10 = 0.7 comes from only 10 flips, so luck can change it a lot. Using the same coin does not make a short run as reliable as a long one.",
      "clue": "With only a few flips, how much can luck change the result?"
    }
  },
  "mat-expected-frequency": {
    "title": "Expected frequency",
    "card": [
      "Expected frequency is the number of times an event is expected to happen in a set number of trials. It is a prediction, not a promise.",
      "Expected frequency = probability × number of trials.",
      "Example: the probability of rain on a day in a town is 0.2. Over 150 days, the expected number of rainy days is 0.2 × 150 = 30.",
      "The actual result is often close to the expected frequency but may not match it. Change a percentage to a decimal or fraction first, so 40% becomes 0.4."
    ],
    "remember": "Expected frequency is probability × number of trials, and it is a prediction.",
    "a": {
      "q": "The probability that a bus is late is 0.15. About how many late buses are expected in 200 trips?",
      "opts": ["30", "15", "185", "1333"],
      "why": "Expected frequency = 0.15 × 200 = 30. The option 185 comes from 200 − 15, which treats the probability as the whole number 15 and subtracts it instead of multiplying. The option 1333 comes from dividing 200 by 0.15.",
      "clue": "Multiply the probability by the number of trips."
    },
    "b": {
      "d": 3,
      "q": "A factory finds that 4% of its phone chargers are faulty. In a batch of 2500 chargers, how many faulty chargers are expected?",
      "opts": ["100", "10", "10000", "2496"],
      "why": "Change 4% to 0.04. Then 0.04 × 2500 = 100. Using 4 instead of 0.04 gives 10000, and 10 comes from 0.004 × 2500, which moves the decimal point one place too far.",
      "clue": "Write the percentage as a decimal before multiplying."
    }
  },
  "mat-two-way-tables": {
    "title": "Two-way tables",
    "card": [
      "A two-way table sorts data by two categories at once, such as year group and how students travel to school. Each cell counts the people in both categories. The totals sit in the last row and column.",
      "To find a probability, divide the count you want by the total that applies. P(event) = number in the event ÷ total in the group.",
      "The group matters. If you are told a person is already in a group, such as 'a Year 12 student', use that group's total as the divisor, not the grand total.",
      "Example: 60 students. Bus: 12 in Year 11 and 18 in Year 12. Walk: 20 in Year 11 and 10 in Year 12. P(bus) = 30/60 = 1/2. P(bus, given Year 12) = 18 ÷ 28 (Year 12 total is 18 + 10)."
    ],
    "remember": "Pick the count you want, then divide by the total of the group you are in.",
    "a": {
      "q": "In the example, 60 students: Year 12 bus 18, Year 12 walk 10. A Year 12 student is chosen. What is the probability they walk?",
      "opts": ["10/28", "10/60", "10/30", "18/28"],
      "why": "The student is known to be in Year 12, so the divisor is the Year 12 total: 18 + 10 = 28. So P = 10/28. Using 60 is the tempting mistake, as it ignores the group you are told about.",
      "clue": "Which total applies once you know the year group?"
    },
    "b": {
      "d": 3,
      "q": "At Kiah's gym, 80 members were surveyed. Morning: 14 women and 26 men. Evening: 22 women and 18 men. A woman is chosen. What is the probability she goes in the morning?",
      "opts": ["14/36", "14/40", "14/80", "26/40"],
      "why": "The person is a woman, so the group is all women: 14 + 22 = 36. P = 14/36. Using 40 divides by all morning members, which is the wrong group and the tempting mistake.",
      "clue": "Add up the column or row for the group you are told about."
    }
  },
  "mat-complementary-events": {
    "title": "Complementary events",
    "card": [
      "The complement of an event is the event not happening. If A is rain tomorrow, the complement of A is no rain tomorrow.",
      "An event and its complement cover every outcome, and they cannot both happen. So their probabilities add to 1.",
      "P(not A) = 1 − P(A). Probabilities can be written as fractions, decimals or percentages, and 1 means 100%.",
      "Example: the chance a bus is late is 0.15. The chance it is not late is 1 − 0.15 = 0.85."
    ],
    "remember": "To find the chance of something not happening, take its probability away from 1.",
    "a": {
      "q": "The probability that Ravi's train is on time is 0.92. What is the probability that it is not on time?",
      "opts": ["0.08", "0.92", "0.82", "1.92"],
      "why": "P(not on time) = 1 − 0.92 = 0.08. The value 0.92 is the chance of the train being on time, not the complement. Adding to 1 instead of taking away gives 1.92, which is impossible for a probability.",
      "clue": "The two probabilities must add to 1."
    },
    "b": {
      "d": 3,
      "q": "A spinner at a school fair has a 3/8 chance of landing on red. What is the probability that it does not land on red?",
      "opts": ["5/8", "3/5", "1/8", "8/3"],
      "why": "P(not red) = 1 − 3/8 = 8/8 − 3/8 = 5/8. The option 3/5 compares red with not red, which is not a probability of not red. A probability can never be larger than 1, so 8/3 cannot be right.",
      "clue": "Write 1 as a fraction with 8 on the bottom."
    }
  },
  "mat-features-normal-distribution": {
    "title": "Features of a normal distribution",
    "card": [
      "A normal distribution is shaped like a bell. It has one peak in the middle, and the curve falls away on both sides.",
      "It is symmetric. The left half is a mirror image of the right half, so the centre splits the data into two matching halves.",
      "The mean, median and mode are all equal, and they sit at the peak. For example, if the mean mark is 60, the median and mode are also 60.",
      "Scores near the centre are common. Scores far from the centre, in either tail, are rare."
    ],
    "remember": "A normal distribution is a symmetric bell with the mean, median and mode all at the centre.",
    "a": {
      "q": "The heights of a large group of students follow a normal distribution with a mean of 168 cm. What is the median height?",
      "opts": ["168 cm", "Less than 168 cm", "More than 168 cm", "It cannot be found without the range"],
      "why": "In a normal distribution the mean and median are equal, so the median is 168 cm. The distribution is symmetric, so the median is not pulled to either side of the mean.",
      "clue": "Which measures of centre are equal in a normal distribution?"
    },
    "b": {
      "d": 2,
      "q": "The weights of apples from an orchard in Orange follow a normal distribution. Which description of the graph is correct?",
      "opts": [
        "Symmetric, with a single peak at the mean",
        "Skewed right, with a long tail of heavy apples",
        "Flat, with every weight equally likely",
        "Symmetric, with two peaks either side of the mean"
      ],
      "why": "A normal distribution is a symmetric bell with one peak at the mean. A long tail on one side would mean the distribution is skewed, and two peaks would not be a bell shape.",
      "clue": "Think of the shape of a bell, with the peak at the centre."
    }
  },
  "mat-empirical-rule": {
    "title": "The empirical rule",
    "card": [
      "In a normal distribution, scores cluster around the mean. The empirical rule says how much of the data lies within 1, 2 and 3 standard deviations of the mean.",
      "About 68% of scores lie within 1 standard deviation of the mean. About 95% lie within 2, and about 99.7% lie within 3.",
      "The distribution is symmetric, so the percentages split evenly either side of the mean. Within 1 standard deviation, about 34% lie on each side.",
      "Example: test marks have mean 60 and standard deviation 10. Within 2 standard deviations means 40 to 80, so about 95% of marks are in that range. The other 5% are split evenly, so about 2.5% score above 80."
    ],
    "remember": "Within 1, 2 and 3 standard deviations of the mean: about 68%, 95% and 99.7%.",
    "a": {
      "q": "Heights of Year 12 students are normally distributed, with mean 170 cm and standard deviation 8 cm. About what percentage of heights lie between 154 cm and 186 cm?",
      "opts": ["95%", "68%", "99.7%", "50%"],
      "why": "154 and 186 are each 16 cm from the mean, which is 2 standard deviations. About 95% of scores lie within 2 standard deviations. 68% is tempting, but that is the share within only 1 standard deviation, 162 to 178.",
      "clue": "Find how many standard deviations 154 is below the mean."
    },
    "b": {
      "d": 3,
      "q": "Bags of rice have a normal distribution of mass, with mean 1000 g and standard deviation 20 g. About what percentage of bags have a mass above 1040 g?",
      "opts": ["2.5%", "5%", "0.15%", "16%"],
      "why": "1040 g is 2 standard deviations above the mean. About 95% of bags lie within 2 standard deviations, so about 5% lie outside, split evenly between the two ends. That gives 2.5% above 1040 g. 5% is wrong because it counts both ends.",
      "clue": "The scores outside the range are split evenly between both ends."
    }
  },
  "mat-comparing-scores-with-z": {
    "title": "Comparing scores with z-scores",
    "card": [
      "Raw scores from different tests cannot be compared directly, because each test has its own mean and spread. A mark of 70 can be strong on one test and weak on another.",
      "To compare, convert each score to a z-score using its own test's mean and standard deviation (SD). This puts both scores on the same scale.",
      "The higher z-score is the better performance relative to its group. A bigger gap in marks does not always give a higher z-score, because a wider spread makes it smaller.",
      "Example: Maths 72 (mean 60, SD 8) gives z = (72 − 60) ÷ 8 = 1.5. Science 68 (mean 50, SD 12) gives z = (68 − 50) ÷ 12 = 1.5. The two results are equal relative to their groups."
    ],
    "remember": "Compare z-scores, not raw marks. The higher z-score is the better result for its group.",
    "a": {
      "q": "Ravi scores 64 in English (mean 55, SD 6) and 58 in History (mean 50, SD 4). In which subject did he do better relative to the group?",
      "opts": [
        "History, because its z-score is 2 and English is 1.5",
        "English, because its z-score is 1.5 and History is 2",
        "English, because 64 is higher than 58",
        "History, because its mean is lower than English"
      ],
      "why": "English z = (64 − 55) ÷ 6 = 1.5. History z = (58 − 50) ÷ 4 = 2. The higher z-score is the better result. Comparing raw marks is tempting, but each test has its own mean and spread.",
      "clue": "Find a z-score for each subject, then compare them."
    },
    "b": {
      "d": 3,
      "q": "Priya scores 45 on a music test (mean 38, SD 5) and 81 on a drama test (mean 70, SD 10). Which statement is correct?",
      "opts": [
        "Music was better: z = 1.4 compared with z = 1.1",
        "Drama was better: z = 1.1 compared with z = 1.4",
        "Drama was better, as she was 11 marks above the mean",
        "The two were equal, because both are above the mean"
      ],
      "why": "Music z = (45 − 38) ÷ 5 = 1.4. Drama z = (81 − 70) ÷ 10 = 1.1. Drama has the bigger gap in marks, but its spread is wider, so its z-score is lower. Music is the better result for its group.",
      "clue": "Divide each gap from the mean by that test's standard deviation."
    }
  },
  "mat-quality-control": {
    "title": "Quality control",
    "card": [
      "Quality control checks that a product is close enough to its target. A machine that fills bottles gives amounts that vary a little, and these often follow a normal distribution.",
      "Work out the product's z-score. The business sets limits for the z-score. A product is acceptable if its z-score is inside the limits or exactly equal to a limit.",
      "Many firms accept z-scores from −2 to 2 inclusive. A product outside the limits is unusual, so it may be rejected or the machine may be checked.",
      "Example: bottles have a mean fill of 600 mL and a standard deviation of 4 mL. A 592 mL bottle has z = (592 − 600) ÷ 4 = −2. That equals the limit, so it is acceptable. A 609 mL bottle has z = 2.25, so it is outside."
    ],
    "remember": "Find the z-score: on or inside the limits is acceptable, outside may be rejected.",
    "a": {
      "q": "Cans have a mean fill of 375 mL and a standard deviation of 2 mL. The limits are z from −2 to 2 inclusive. Is a 380 mL can acceptable?",
      "opts": [
        "No, its z-score of 2.5 is outside the limits",
        "Yes, its z-score of 0.4 is inside the limits",
        "Yes, it is only 5 mL away from the mean",
        "No, its z-score of −2.5 is outside the limits"
      ],
      "why": "z = (380 − 375) ÷ 2 = 2.5, which is above the upper limit of 2, so the can is not acceptable. Saying it is only 5 mL from the mean is tempting, but the limits apply to the z-score, not the difference in mL.",
      "clue": "Compare the z-score, not the mL difference, with the limits."
    },
    "b": {
      "d": 3,
      "q": "Mia's factory fills jars with a mean of 500 g and a standard deviation of 5 g. Jars are acceptable if z is from −2 to 2 inclusive. Which jar is rejected?",
      "opts": ["511 g", "490 g", "505 g", "498 g"],
      "why": "For 511 g, z = (511 − 500) ÷ 5 = 2.2, which is outside the limits. The 490 g jar has z = −2, which equals a limit, so it is acceptable. It is tempting only because it is the lightest jar.",
      "clue": "Work out each jar's z-score. Does a z-score equal to a limit count?"
    }
  },
  "mat-order-operations": {
    "title": "Order of operations",
    "card": [
      "When a calculation has more than one operation, do them in a set order. Brackets come first, then powers, then multiplication and division, then addition and subtraction.",
      "Multiplication and division have equal rank, so work through them from left to right. Addition and subtraction also have equal rank, so work through them from left to right.",
      "Example: 20 − 4 × 3. Multiply first: 4 × 3 = 12. Then subtract: 20 − 12 = 8.",
      "Example: 24 ÷ 4 × 2. Division and multiplication have equal rank, so go left to right: 24 ÷ 4 = 6, then 6 × 2 = 12."
    ],
    "remember": "Brackets, powers, then × and ÷, then + and −, working left to right within each rank.",
    "a": {
      "q": "What is the value of 5 + 3 × 4?",
      "opts": ["17", "32", "12", "27"],
      "why": "Multiplication comes before addition, so 3 × 4 = 12, then 5 + 12 = 17. The answer 32 comes from adding first (5 + 3 = 8, then 8 × 4), which ignores the order.",
      "clue": "Which operation is done first, + or ×?"
    },
    "b": {
      "d": 3,
      "q": "Mia works out 30 − 12 ÷ 3 + 2 for a bake sale. What is the correct value?",
      "opts": ["28", "24", "8", "27.6"],
      "why": "Divide first: 12 ÷ 3 = 4. Then work left to right: 30 − 4 = 26, and 26 + 2 = 28. The answer 24 comes from adding 4 + 2 before subtracting, but addition and subtraction have equal rank, so they go left to right.",
      "clue": "After dividing, which comes first from the left, − or +?"
    }
  },
  "mat-fractions-decimals-percentages": {
    "title": "Fractions, decimals and percentages",
    "card": [
      "A fraction, a decimal and a percentage can show the same amount. For example, 1/4 = 0.25 = 25%.",
      ["Fraction to decimal", "divide the top number by the bottom number. 3/5 = 3 ÷ 5 = 0.6."],
      ["Decimal to percentage", "multiply by 100. 0.6 × 100 = 60%. To go back, divide by 100."],
      ["Percentage to fraction", "write the percentage over 100, then simplify. 60% = 60/100 = 3/5."]
    ],
    "remember": "Percent means out of 100. Divide by 100 to go from a percentage to a decimal, and multiply by 100 to go back.",
    "a": {
      "q": "Which decimal is equal to 3/8?",
      "opts": ["0.375", "0.38", "2.67", "0.83"],
      "why": "Divide the top by the bottom: 3 ÷ 8 = 0.375. Dividing 8 by 3 instead gives 2.67, which is the mistake of turning the fraction upside down.",
      "clue": "Divide the top number by the bottom number."
    },
    "b": {
      "d": 3,
      "q": "Mia scored 0.7 on one quiz, 65% on another and 3/4 on a third. Which list puts these in order from smallest to largest?",
      "opts": ["65%, 0.7, 3/4", "0.7, 65%, 3/4", "3/4, 0.7, 65%", "65%, 3/4, 0.7"],
      "why": "Write each as a percentage: 0.7 = 70%, 65% stays 65%, and 3/4 = 75%. The order is 65%, 70%, 75%. Comparing 0.7 with 65 without converting wrongly makes 0.7 look smaller.",
      "clue": "Write all three amounts in the same form first."
    }
  },
  "mat-percentages-amounts": {
    "title": "Percentages of amounts",
    "card": [
      "Percent means out of 100. To find a percentage of an amount, change the percentage to a decimal by dividing by 100, then multiply.",
      "Example: 15% of $80. 15% = 0.15, and 0.15 × 80 = $12.",
      "Some percentages are quick: 50% is half, 10% is dividing by 10, and 1% is dividing by 100. Use them to build other percentages, so 30% is 3 × 10%.",
      "To find a percentage increase, work out the percentage of the amount, then add it to the amount. For a decrease, such as a discount, subtract it."
    ],
    "remember": "Percentage of an amount: change the percentage to a decimal, then multiply.",
    "a": {
      "q": "What is 35% of $60?",
      "opts": ["$21", "$2.10", "$25", "$210"],
      "why": "35% = 0.35, and 0.35 × 60 = $21. As a check, 30% is 3 × $6 = $18 and 5% is $3, giving $21. The answer $2.10 comes from writing 35% as 0.035, which moves the decimal point one place too far.",
      "clue": "Write 35% as a decimal first."
    },
    "b": {
      "d": 3,
      "q": "Sam's phone costs $400. It is on sale with a 20% discount. What is the sale price?",
      "opts": ["$320", "$80", "$480", "$380"],
      "why": "20% of 400 = 0.2 × 400 = $80. A discount is taken off the price, so 400 − 80 = $320. The answer $80 is only the discount, not the sale price.",
      "clue": "Find the discount, then decide whether to add or subtract it."
    }
  },
  "mat-ratios-rates": {
    "title": "Ratios and rates",
    "card": [
      [
        "Ratio",
        "A ratio compares amounts of the same kind, in the same unit. A ratio of 2:3 means 2 parts to 3 parts."
      ],
      [
        "Rate",
        "A rate compares amounts in different units, such as km per hour or dollars per kilogram. To find a rate, divide by the amount of the second unit."
      ],
      [
        "Sharing",
        "To share in a ratio, add the parts, then divide the total by that number to find one part. Example: share $40 in the ratio 1:3. Parts = 1 + 3 = 4, so one part = 40 ÷ 4 = $10. The shares are $10 and $30."
      ],
      "Rate example: 150 km in 3 hours is 150 ÷ 3 = 50 km per hour."
    ],
    "remember": "A ratio compares the same units. A rate compares different units.",
    "a": {
      "q": "Which of these is a rate?",
      "opts": [
        "240 km travelled in 3 hours",
        "3 red cups for every 5 blue cups",
        "20 girls in a class of 30 students",
        "A 4 m rope cut into 2 m pieces"
      ],
      "why": "Kilometres and hours are different units, so 240 km in 3 hours is a rate (80 km per hour). Red cups to blue cups compares the same kind of thing, so it is a ratio.",
      "clue": "Look for two different units."
    },
    "b": {
      "d": 3,
      "q": "Liam and Ava share $350 in the ratio 3:4. How much does Ava get?",
      "opts": ["$200", "$150", "$262.50", "$140"],
      "why": "Parts = 3 + 4 = 7, so one part = 350 ÷ 7 = $50. Ava has 4 parts, so 4 × 50 = $200. Liam's share is $150, which is the tempting wrong answer.",
      "clue": "Find the value of one part first."
    }
  },
  "mat-estimating-rounding": {
    "title": "Estimating and rounding",
    "card": [
      "To round, look at the digit just after the place you want. If it is 5 or more, round up. If it is 4 or less, leave the digit as it is.",
      "Round to a sensible place for the job. Money is usually rounded to the nearest cent, and a count of people is a whole number.",
      "To estimate, round each number to one or two non-zero digits, then work with the easy numbers. For 38 × 52, think 40 × 50 = 2000.",
      "Estimate before you use a calculator. If the calculator shows 1976 for 38 × 52, it is close to 2000, so it is sensible. An answer of 19 760 is about ten times too big, so a typing slip is likely."
    ],
    "remember": "Estimate first with easy numbers, then check that the calculator answer is close.",
    "a": {
      "q": "What is 6.48 rounded to the nearest whole number?",
      "opts": ["6", "7", "6.5", "6.4"],
      "why": "The digit after the units place is 4, so the 6 stays the same. Rounding up to 7 would only be right if that digit were 5 or more.",
      "clue": "Look at the first digit after the decimal point."
    },
    "b": {
      "d": 3,
      "q": "Sam uses a calculator for 49 × 21 and gets 10 290. Which estimate shows the answer is about ten times too big?",
      "opts": [
        "50 × 20 = 1000, so the answer should be near 1000",
        "50 × 20 = 100, so the answer should be near 100",
        "50 × 20 = 10 000, so the answer should be near 10 000",
        "50 × 20 = 700, so the answer should be near 700"
      ],
      "why": "49 rounds to 50 and 21 rounds to 20, and 50 × 20 = 1000. The calculator answer of 10 290 is about ten times that, so a typing slip is likely. The correct answer is 1029.",
      "clue": "Round each number, then multiply the easy numbers."
    }
  },
  "mat-patterns-rules": {
    "title": "Patterns and rules",
    "card": [
      "A pattern is a list of numbers that follows a rule. Some patterns change by the same amount each step. A rule is a short sentence or formula that gives any value in the pattern.",
      "When a pattern goes up by the same amount each step, that amount multiplies the step number. Then check whether anything extra is added or taken away.",
      "Example: a gym charges $5, $10, $15, $20 for 1, 2, 3, 4 classes. It goes up by 5 each time, so cost = 5 × number of classes.",
      "Once you have the rule, put in any number. For 12 classes, cost = 5 × 12 = $60. You do not need to list every step."
    ],
    "remember": "Find the change each step, write it as a rule, then use the rule for any value.",
    "a": {
      "q": "A pattern of costs is $3, $6, $9, $12 for 1, 2, 3, 4 items. Which rule fits?",
      "opts": [
        "cost = 3 × number of items",
        "cost = 3 + number of items",
        "cost = 6 × number of items",
        "cost = 12 × number of items"
      ],
      "why": "Each extra item adds $3, so the cost is 3 times the number of items. Check: 3 × 4 = 12. The rule 3 + number of items gives $4 for 1 item, which is wrong.",
      "clue": "How much does the cost go up for each extra item?"
    },
    "b": {
      "d": 2,
      "q": "Sam's rule for a pizza night is cost = 8 × number of people. What is the cost for 7 people?",
      "opts": ["$56", "$15", "$48", "$64"],
      "why": "Put 7 into the rule: 8 × 7 = 56, so the cost is $56. Adding gives $15, which treats the rule as 8 + 7, but the rule multiplies.",
      "clue": "Replace the number of people with 7, then follow the operation in the rule."
    }
  },
  "mat-solving-simple-equations": {
    "title": "Solving simple equations",
    "card": [
      "An equation says two things are equal. Solving it means finding the value of the unknown, such as x, that makes it true.",
      "To solve it, undo the operations on the unknown in reverse order. Whatever you do to one side, do to the other.",
      "Example: 3x + 5 = 20. The unknown was multiplied by 3, then 5 was added. Undo the adding first: subtract 5 from both sides to get 3x = 15.",
      "Then undo the multiplying: divide both sides by 3 to get x = 5. Check by putting 5 back in: 3 × 5 + 5 = 20."
    ],
    "remember": "Undo the last operation first, do the same to both sides, then check.",
    "a": {
      "q": "Solve 2x + 7 = 19. What is x?",
      "opts": ["6", "13", "12", "10"],
      "why": "Subtract 7 from both sides to get 2x = 12, then divide by 2 to get x = 6. Check: 2 × 6 + 7 = 19. The answer 13 comes from adding 7 instead of subtracting it: (19 + 7) ÷ 2 = 13.",
      "clue": "Undo the adding before the multiplying."
    },
    "b": {
      "d": 3,
      "q": "Leila pays $12 to join a gym, then $8 per class. She has paid $60 in total. This gives 12 + 8n = 60. How many classes has she attended?",
      "opts": ["6", "9", "48", "7.5"],
      "why": "Subtract 12 from both sides to get 8n = 48, then divide by 8 to get n = 6. Check: 12 + 8 × 6 = 60. The answer 9 comes from adding the joining fee instead of subtracting it: (60 + 12) ÷ 8 = 9.",
      "clue": "Take away the joining fee before dividing."
    }
  },
  "mat-mean-median-range-context": {
    "title": "Mean, median and spread",
    "card": [
      ["Mean", "Add all the values, then divide by how many there are. Example: 2, 4, 9 has a mean of 15 ÷ 3 = 5."],
      [
        "Median",
        "Put the values in order and take the middle one. With two middle values, take the number halfway between them. For 2, 4, 9 the median is 4."
      ],
      [
        "Range",
        "Range = highest value − lowest value. For 2, 4, 9 it is 9 − 2 = 7. One very high or low value changes the mean and range a lot, but the median and IQR much less."
      ],
      [
        "IQR",
        "Split the ordered data into a lower and upper half. Q1 is the median of the lower half, Q3 the median of the upper half, and IQR = Q3 − Q1. For 2, 4, 6, 8, 10, 12: Q1 = 4, Q3 = 10, IQR = 6."
      ]
    ],
    "remember": "Mean and median give a typical value. Range and IQR give the spread.",
    "a": {
      "q": "What is the mean of these quiz scores: 4, 7, 5, 8, 6?",
      "opts": ["6", "5", "7", "30"],
      "why": "Add the scores: 4 + 7 + 5 + 8 + 6 = 30. Divide by 5 scores to get 6. The answer 30 is only the total, and the division step has been skipped.",
      "clue": "Add them up, then divide by how many scores there are."
    },
    "b": {
      "d": 3,
      "q": "Five houses in a street sold for $500 000, $520 000, $540 000, $560 000 and $2 400 000. Which measure is changed least by the $2.4 million sale, and what is its value?",
      "opts": ["The median, $540 000", "The mean, $904 000", "The range, $1 900 000", "The mean, $540 000"],
      "why": "The middle of the five ordered prices is $540 000, and the very high sale barely moves it. The mean is 4 520 000 ÷ 5 = $904 000 and the range is $1 900 000, and both are pulled up a lot by that one sale.",
      "clue": "Picture each measure with and without the $2.4 million sale."
    }
  },
  "mat-comparing-data-sets": {
    "title": "Comparing data sets",
    "card": [
      "To compare two data sets, look at the same measures for both: a typical value (mean or median) and the spread (range or IQR).",
      "Graphs help. Two box plots drawn on the same scale show the medians, spreads and ranges side by side.",
      "Write the comparison in words and use the numbers. Example: Team A has a median of 40 and Team B has 32, so Team A usually scores higher.",
      "A smaller spread means more consistent results. A fair conclusion uses both a typical value and the spread, and it is stated in the context of the data."
    ],
    "remember": "Compare the typical value and the spread, using the same measures for both sets.",
    "a": {
      "q": "Team A scores have a median of 40 and an IQR of 6. Team B scores have a median of 32 and an IQR of 12. Which is true?",
      "opts": [
        "Team A usually scores higher and is more consistent",
        "Team B usually scores higher and is more consistent",
        "Team A usually scores higher and is less consistent",
        "Team B usually scores lower and is more consistent"
      ],
      "why": "Team A has the higher median, so it usually scores higher. Its IQR is smaller, so its scores are more consistent. A larger IQR does not mean better scores, it means more spread.",
      "clue": "Compare the medians for typical scores, then the IQRs for consistency."
    },
    "b": {
      "d": 3,
      "q": "Mia's café sells a median of 52 coffees a day with a range of 20. Sam's café sells a median of 52 with a range of 50. What is a fair conclusion?",
      "opts": [
        "Typical sales are equal, but Sam's sales vary more",
        "Typical sales are equal, but Mia's sales vary more",
        "Sam's typical sales are higher, and his sales vary more",
        "Mia's typical sales are higher, and her sales vary less"
      ],
      "why": "The medians are equal, so typical daily sales are the same. Sam's range of 50 is larger than Mia's 20, so his sales vary more, not Mia's. A larger range shows more spread, not higher sales.",
      "clue": "Check the medians first, then compare the ranges."
    }
  },
  "mat-unit-pricing": {
    "title": "Comparing products",
    "card": [
      "To compare products of different sizes, work out the price per unit. Price per unit = price ÷ amount.",
      "Example: a 500 g jar of peanut butter costs $4.00 and a 750 g jar costs $5.25. $4.00 ÷ 500 = $0.008 per g, and $5.25 ÷ 750 = $0.007 per g. The 750 g jar is cheaper per gram.",
      "Check that the units match before you divide. Change kg to g, or mL to L, so both products use the same unit.",
      "Price is not the only thing to compare. Look at features, such as data in a phone plan, and terms, such as contract length or extra fees. The cheapest price per unit may not suit your needs."
    ],
    "remember": "Compare in the same unit, then check features and terms as well as price.",
    "a": {
      "q": "A 2 L bottle of juice costs $3.60. A 750 mL bottle costs $1.50. Which is cheaper per litre, and what is its price per litre?",
      "opts": [
        "The 2 L bottle, at $1.80 per litre",
        "The 750 mL bottle, at $2.00 per litre",
        "The 2 L bottle, at $1.80 per 100 mL",
        "The 750 mL bottle, at $1.50 per litre"
      ],
      "why": "$3.60 ÷ 2 = $1.80 per litre. For the small bottle, 750 mL is 0.75 L, so $1.50 ÷ 0.75 = $2.00 per litre. The 2 L bottle is cheaper per litre. Using $1.50 as the price per litre skips the unit change.",
      "clue": "Change 750 mL to litres before you divide."
    },
    "b": {
      "d": 3,
      "q": "Priya compares two phone plans. Plan X costs $40 a month and gives 20 GB of data. Plan Y costs $55 a month and gives 50 GB. Priya uses about 15 GB a month. Which plan suits Priya better, and why?",
      "opts": [
        "Plan X, because 20 GB covers her use for $15 less",
        "Plan Y, because its lower price per GB saves her money",
        "Plan X, because its price per GB is lower than Plan Y's",
        "Plan Y, because 50 GB gives her more data for $15 more"
      ],
      "why": "Plan X covers her 15 GB and costs $15 less each month. Plan Y is cheaper per GB ($1.10 against $2.00), but Priya would not use most of the extra data, so she would pay more for no real gain. The lowest price per unit may not suit her needs.",
      "clue": "How much of the extra data would Priya actually use?"
    }
  },
  "mat-planning-life-stages": {
    "title": "Planning for life stages",
    "card": [
      "Money needs change as life moves from school to work, renting, family and retirement. A plan that suits one stage may not suit the next.",
      "At school, income is often small, such as pocket money or a part-time job. Starting full-time work brings a regular wage. Moving out to rent adds costs such as rent, bills and transport.",
      "A family adds costs such as child care, nappies and a larger home. Income may fall if a parent works less. Example: Sam earns $900 a week and pays $350 rent, and a new baby means Sam's plan needs to change.",
      "Near retirement, the aim moves to having enough to live on once work income stops, such as from superannuation and savings."
    ],
    "remember": "Each life stage can change both income and costs, so review the plan at each change.",
    "a": {
      "q": "Leo finishes school, starts a full-time job and moves into a rented flat. How do his money needs change?",
      "opts": [
        "Income rises, and costs such as rent and bills begin",
        "Income rises, so he no longer needs to plan spending",
        "Costs rise, but his income stays at part-time levels",
        "Income stays the same, but rent replaces fun spending"
      ],
      "why": "A full-time job brings a regular wage, usually more than school income, and renting adds rent, bills and transport. A higher income does not remove the need for a plan, because the new costs still have to fit within it.",
      "clue": "Look at what comes in and what goes out."
    },
    "b": {
      "d": 3,
      "q": "Priya and her partner have their first child. Priya will work part-time for a year. Which change to their plan fits this stage?",
      "opts": [
        "Plan for new costs and a lower income for a while",
        "Plan for new costs while income stays the same",
        "Plan for lower costs, as she will be home more",
        "Plan to live on super, as her work income stops"
      ],
      "why": "A baby adds costs such as child care and nappies, and part-time work means Priya earns less, so the plan must cover both. Planning only for the new costs is the tempting mistake, because it misses the drop in income.",
      "clue": "Part-time work changes more than her hours."
    }
  },
  "mat-study-debts-government-support": {
    "title": "Study debts and government support",
    "card": [
      [
        "HECS-HELP",
        "a government loan that covers university fees. Compulsory repayments start only once a person's income passes a set threshold."
      ],
      [
        "Repayments",
        "these are usually collected through the tax system, often taken from pay by the employer. People can also choose to make extra voluntary repayments."
      ],
      [
        "Government support",
        "payments such as child-care support lower what a family pays. The government pays part of the cost, so the family pays the rest."
      ],
      "Below the threshold, no compulsory repayment is due that year, but the debt stays. The threshold and rates change over time, so check current figures."
    ],
    "remember": "HECS-HELP is repaid through tax once income passes the threshold. Support payments cut what a family pays.",
    "a": {
      "q": "Jai has a HECS-HELP debt. His income this year is below the repayment threshold. What happens to his debt repayments this year?",
      "opts": [
        "No compulsory repayment is due this year",
        "He must pay the full debt at once",
        "He pays a bill straight to the university",
        "The debt is cancelled for good"
      ],
      "why": "Compulsory HECS-HELP repayments start only once income passes the threshold, so none is due this year. The debt is not cancelled, because it stays and is repaid in a later year when income is high enough.",
      "clue": "Compare Jai's income with the threshold."
    },
    "b": {
      "d": 2,
      "q": "Priya's child-care costs $120 a day. A government payment covers $70 of it. How much does Priya pay for each day?",
      "opts": ["$50", "$70", "$120", "$190"],
      "why": "The government pays part of the cost, so Priya pays the rest: $120 − $70 = $50. Paying $70 is a mistake, because that is the amount the government covers.",
      "clue": "Take the government's share away from the full cost."
    }
  },
  "mat-financial-trends": {
    "title": "Financial trends",
    "card": [
      "A financial trend is the way a money figure changes over time, such as prices, interest rates, wages or house prices. Looking at data over several years shows the pattern, not just one number.",
      [
        "CPI",
        "The Consumer Price Index (CPI) tracks the price of a typical basket of goods and services. If the CPI rises from 100 to 105, prices have risen by 5%."
      ],
      [
        "Wages",
        "Wages show what people earn. If prices rise by 5% and wages rise by 2%, a worker can buy less than before, even though their pay went up."
      ],
      "Percentage change = (new − old) ÷ old × 100. Example: a wage rises from $1000 to $1030 a week. The change is 30 ÷ 1000 × 100 = 3%."
    ],
    "remember": "Compare how fast prices and wages change: if prices rise faster than wages, buying power falls.",
    "a": {
      "q": "The CPI rises from 120 to 126 over a year. By what percentage have prices risen?",
      "opts": ["5%", "6%", "4.8%", "126%"],
      "why": "The change is 126 − 120 = 6. Then 6 ÷ 120 × 100 = 5%. Using 6 as the percentage forgets to divide by the old value, which is the tempting mistake.",
      "clue": "Divide the change by the starting value."
    },
    "b": {
      "d": 3,
      "q": "Over a year, Sam's wage rises by 2% and prices rise by 4%. What has happened to what Sam's wage can buy?",
      "opts": [
        "It has fallen, as prices rose faster than the wage",
        "It has risen, as the wage went up by 2%",
        "It has stayed the same, as both figures rose",
        "It has fallen, as the wage rose by less than 4 dollars"
      ],
      "why": "Prices rose by more than the wage, so each dollar buys less and Sam can afford less than before. A pay rise alone does not mean buying power rises, because it must be compared with price changes.",
      "clue": "Compare the two percentages, not just the wage."
    }
  },
  "mat-shapes-objects": {
    "title": "Shapes and objects",
    "card": [
      [
        "Shapes",
        "A 2D shape is flat. It is described by its sides and angles. A triangle has 3 sides and 3 angles. A rectangle has 4 sides and 4 right angles (90°)."
      ],
      [
        "Objects",
        "A 3D object takes up space. It is described by its faces (flat surfaces), edges (where two faces meet) and vertices (corners). A cube has 6 faces, 12 edges and 8 vertices."
      ],
      [
        "Composite",
        "A composite shape or object is made by joining simpler ones. An L-shape is two rectangles joined. A house can be a rectangular prism with a triangular prism as its roof."
      ],
      "To describe a composite, split it into simple parts and name each part. A tent shape is a triangle on top of a rectangle. Where two parts join along a whole side, that side is inside, so it is not on the outline."
    ],
    "remember": "Shapes have sides and angles. Objects have faces, edges and vertices. Composites are built from simple parts.",
    "a": {
      "q": "How many faces does a rectangular prism (a box shape) have?",
      "opts": ["6", "8", "12", "4"],
      "why": "A box has a top, a bottom and four sides, so 6 faces. 12 is the number of edges and 8 is the number of vertices, which are different parts of the object.",
      "clue": "Faces are the flat surfaces. Count top, bottom and sides."
    },
    "b": {
      "d": 3,
      "q": "Jo draws a flat shape made of a square with an equilateral triangle joined along one of its sides, with no gap. How many sides does the new outline have?",
      "opts": ["5", "7", "6", "4"],
      "why": "The square has 4 sides and the triangle has 3, which makes 7. The shared side is inside the shape, and it was counted once for each part, so 7 − 2 = 5 sides. 7 counts the shared side twice, and 6 still counts it once.",
      "clue": "The joined side is no longer on the outside."
    }
  },
  "mat-reading-plans-diagrams": {
    "title": "Reading plans and diagrams",
    "card": [
      "A plan is a drawing of a place seen from above. Its scale tells you how much smaller it is: 1:100 means 1 cm on the plan is 100 cm in real life.",
      "To find a real length, multiply the plan length by the scale number, then change units (100 cm = 1 m). Example: 4 cm on a 1:50 plan is 4 × 50 = 200 cm, which is 2 m.",
      "The scale applies to each length, not to an area. For a real area, change the length and width to real lengths first, then multiply. Example: 2 cm by 4 cm on a 1:50 plan is 1 m by 2 m, so the area is 2 m².",
      "Symbols show features such as doors, windows and stairs. A legend on the plan explains what each symbol means."
    ],
    "remember": "Real length = plan length × scale number. For an area, scale each length first, then multiply.",
    "a": {
      "q": "A bedroom is 6 cm long on a plan with a scale of 1:50. How long is the real bedroom?",
      "opts": ["3 m", "300 m", "30 m", "30 cm"],
      "why": "6 × 50 = 300 cm, which is 3 m. The option 300 m is tempting, but it forgets to change centimetres to metres.",
      "clue": "Multiply by 50, then change cm to m."
    },
    "b": {
      "d": 3,
      "q": "On a 1:100 plan, Ava's deck is 5 cm long and 3 cm wide. What is the real area of the deck?",
      "opts": ["15 m²", "1500 m²", "0.15 m²", "8 m²"],
      "why": "The real deck is 5 m by 3 m, because 5 × 100 = 500 cm and 3 × 100 = 300 cm. Then 5 × 3 = 15 m². Multiplying the plan area of 15 cm² by 100 gives 0.15 m², which is wrong because the scale applies to each length, not to the area.",
      "clue": "Find the real length and width first, in metres."
    }
  },
  "mat-scale-maps": {
    "title": "Scale and maps",
    "card": [
      "A map scale such as 1:50 000 means 1 unit on the map is 50 000 of the same unit in real life. So 1 cm on the map is 50 000 cm on the ground.",
      "To find a real distance, measure the map distance and multiply by the second number in the scale. Then change the units to something sensible.",
      "Useful changes: 100 cm = 1 m, 1000 m = 1 km, and 100 000 cm = 1 km. So on a 1:50 000 map, 2 cm on the map is 100 000 cm, which is 1 km.",
      "Worked example: on a 1:25 000 map, two towns are 6 cm apart. 6 × 25 000 = 150 000 cm. Divide by 100 000 to get 1.5 km."
    ],
    "remember": "Map length × scale number gives real length. Then change the units.",
    "a": {
      "q": "On a 1:50 000 map, a walking track measures 4 cm. What is its real length?",
      "opts": ["2 km", "200 m", "20 km", "4 km"],
      "why": "4 × 50 000 = 200 000 cm. Dividing by 100 000 gives 2 km. The option 200 m comes from dividing by 1000 instead of 100 000, which is a unit mistake.",
      "clue": "Multiply by 50 000, then change cm to km."
    },
    "b": {
      "d": 3,
      "q": "On a 1:25 000 map, Priya measures 7.2 cm from a campsite to a lake. What is the real distance?",
      "opts": ["1.8 km", "18 km", "180 m", "3.6 km"],
      "why": "7.2 × 25 000 = 180 000 cm. Dividing by 100 000 gives 1.8 km. The option 18 km comes from dividing by 10 000, which mixes up the cm to km change.",
      "clue": "Multiply by 25 000, then use 100 000 cm = 1 km."
    }
  },
  "mat-routes-travel-times": {
    "title": "Routes and travel times",
    "card": [
      "A map or app gives the distance of each route. Speed is how far you travel in one hour, such as 60 km/h.",
      "Time = distance ÷ speed. The answer is in hours when distance is in km and speed is in km/h.",
      "To turn hours into minutes, multiply by 60. So 0.5 hours is 30 minutes, and 0.25 hours is 15 minutes.",
      "Example: 90 km at 60 km/h takes 90 ÷ 60 = 1.5 hours, which is 1 hour 30 minutes. Real trips can take longer because of traffic and stops."
    ],
    "remember": "Time = distance ÷ speed, then change hours to minutes if needed.",
    "a": {
      "q": "Noah drives 120 km at an average speed of 80 km/h. How long does the trip take?",
      "opts": ["1 hour 30 minutes", "1 hour 20 minutes", "1 hour 50 minutes", "1 hour 5 minutes"],
      "why": "120 ÷ 80 = 1.5 hours, which is 1 hour 30 minutes. 1 hour 50 minutes is tempting, but it reads the .5 as 50 minutes instead of 0.5 × 60 = 30 minutes.",
      "clue": "Divide distance by speed, then change any part of an hour to minutes."
    },
    "b": {
      "d": 3,
      "q": "Priya cycles 18 km at 24 km/h, stops for a 10 minute break, then cycles 6 km at 12 km/h. How long is the whole trip?",
      "opts": ["1 hour 25 minutes", "1 hour 15 minutes", "1 hour 10 minutes", "1 hour 35 minutes"],
      "why": "The first part takes 18 ÷ 24 = 0.75 hours, or 45 minutes. The second takes 6 ÷ 12 = 0.5 hours, or 30 minutes. 45 + 10 + 30 = 85 minutes. Leaving out the break gives 1 hour 15 minutes, which is wrong.",
      "clue": "Work out each ride separately, then add the break."
    }
  },
  "mat-finding-linear-rule": {
    "title": "Finding a linear rule",
    "card": [
      "A straight line has a rule y = mx + c. Two points on the line are enough to find m and c.",
      [
        "Step 1",
        "Find the gradient. m = (y₂ − y₁) ÷ (x₂ − x₁). Subtract the y values and the x values in the same order."
      ],
      ["Step 2", "Substitute m and one of the points into y = mx + c. Then solve for c."],
      [
        "Example",
        "The line passes through (1, 5) and (3, 11). m = (11 − 5) ÷ (3 − 1) = 6 ÷ 2 = 3. Using (1, 5): 5 = 3 × 1 + c, so c = 2. The rule is y = 3x + 2."
      ]
    ],
    "remember": "Gradient from the two points first, then substitute one point to get c.",
    "a": {
      "q": "A line passes through (2, 7) and (5, 16). What is its gradient?",
      "opts": ["3", "9", "3/9", "−3"],
      "why": "m = (16 − 7) ÷ (5 − 2) = 9 ÷ 3 = 3. Dividing the x change by the y change gives 3/9, which is the wrong way up.",
      "clue": "Divide the change in y by the change in x."
    },
    "b": {
      "d": 3,
      "q": "A line passes through (2, 3) and (4, 11). What is its rule?",
      "opts": ["y = 4x − 5", "y = 4x + 5", "y = 4x − 1", "y = 2x − 1"],
      "why": "m = (11 − 3) ÷ (4 − 2) = 8 ÷ 2 = 4. Using (2, 3): 3 = 4 × 2 + c, so c = −5. The rule is y = 4x − 5, and it also gives 11 when x = 4. Writing y = 4x + 5 comes from a sign error when solving for c.",
      "clue": "Your rule should give the right y value for both points."
    }
  },
  "mat-linear-models-context": {
    "title": "Linear models in context",
    "card": [
      "A linear model has the form y = mx + c. It fits a situation where something changes by the same amount for each step.",
      [
        "Gradient",
        "m is a rate. It tells you how much y changes for each 1 unit increase in x, such as dollars per kilometre."
      ],
      [
        "Intercept",
        "c is the starting value, the value of y when x = 0. It is a fixed amount, such as a call-out fee paid before any work is done."
      ],
      "Example: a plumber charges C = 45t + 80, where t is hours worked. The rate is $45 per hour and the call-out fee is $80. For 3 hours, C = 45 × 3 + 80 = $215."
    ],
    "remember": "In a linear model, the gradient is the rate and the intercept is the starting value.",
    "a": {
      "q": "A taxi fare in Geelong is F = 2.5d + 4, where d is the distance in km. What does the 2.5 mean?",
      "opts": [
        "The fare rises by $2.50 for each extra kilometre",
        "The fare for a trip of 0 km is $2.50",
        "The fare for a trip of 4 km is $2.50",
        "The fare rises by $4 for each extra kilometre"
      ],
      "why": "The 2.5 is the gradient, so it is the rate: $2.50 for each extra km. The 4 is the intercept, the fixed starting fee, so the option giving $4 per kilometre mixes up the two.",
      "clue": "Which number multiplies d?"
    },
    "b": {
      "d": 2,
      "q": "Priya hires a ladder in Bendigo. The cost is C = 12n + 30, where n is the number of days. What is the cost for 5 days?",
      "opts": ["$90", "$60", "$150", "$102"],
      "why": "C = 12 × 5 + 30 = 60 + 30 = $90. Leaving out the $30 starting fee gives $60, which is the tempting mistake.",
      "clue": "Multiply the daily rate by 5, then add the fixed amount."
    }
  },
  "mat-simultaneous-linear-equations-2": {
    "title": "Simultaneous linear equations",
    "card": [
      "Two linear equations are simultaneous when we want the x and y values that make both true. This is the point where their graphs cross. A break-even point is one such point: where cost equals income, so there is no profit or loss.",
      ["Graphing", "Draw both lines and read off the point where they intersect."],
      [
        "Substitution",
        "Write one equation as y = ..., then put that into the other equation and solve for x. Then find y. For break-even, set the cost rule equal to the income rule and solve."
      ],
      [
        "Elimination",
        "Add or subtract the equations to cancel one variable. Example: x + y = 10 and x − y = 4. Adding gives 2x = 14, so x = 7, and then y = 3."
      ]
    ],
    "remember": "The solution is the point where both equations are true, which is where the lines cross.",
    "a": {
      "q": "Solve x + y = 12 and x − y = 2. What is the solution?",
      "opts": ["x = 7, y = 5", "x = 5, y = 7", "x = 10, y = 2", "x = 6, y = 6"],
      "why": "Adding the equations gives 2x = 14, so x = 7. Then y = 12 − 7 = 5. Swapping the values gives x = 5, y = 7, which fails x − y = 2.",
      "clue": "Add the two equations to cancel y."
    },
    "b": {
      "d": 3,
      "q": "Leo sells mugs in Ballarat. His cost is C = 400 + 5n and his income is R = 13n, where n is the number of mugs. How many mugs give the break-even point?",
      "opts": ["50", "30", "80", "400"],
      "why": "Break-even is where cost equals income: 400 + 5n = 13n, so 400 = 8n and n = 50. Check: C = 400 + 250 = 650 and R = 13 × 50 = 650. Dividing 400 by 5 gives 80, but that ignores the income of 13 per mug.",
      "clue": "Set the cost rule equal to the income rule."
    }
  },
  "mat-piecewise-step-graphs": {
    "title": "Piecewise and step graphs",
    "card": [
      [
        "Piecewise graph",
        "A piecewise graph is made of line segments, each with its own rule over its own range of x values. The segments can join up where the rule changes, as on a tax scale."
      ],
      [
        "Step graph",
        "A step graph is made of horizontal segments with jumps between them. The value stays fixed over a range, then jumps to a new amount."
      ],
      ["Open and closed dots", "A closed dot means the end value is included. An open dot means it is not."],
      "Example: a car park charges $5 for up to 1 hour, then $9 for over 1 hour up to 2 hours. A stay of exactly 1 hour costs $5. A stay of 1.5 hours costs $9."
    ],
    "remember": "Piecewise graphs change rule at set points. Step graphs hold a value, then jump.",
    "a": {
      "q": "A car park charges $4 for up to 1 hour, $7 for over 1 hour up to 2 hours, and $10 for over 2 hours up to 3 hours. What does a stay of 2.5 hours cost?",
      "opts": ["$10", "$7", "$4", "$17"],
      "why": "2.5 hours is over 2 hours and up to 3 hours, so the charge is $10. The charge is read from one step, not added up across steps, so $17 is wrong.",
      "clue": "Find which time range 2.5 hours falls in."
    },
    "b": {
      "d": 3,
      "q": "A step graph for a car park shows $6 for up to 2 hours, then $11 for over 2 hours up to 4 hours. Which cost applies to a stay of exactly 2 hours?",
      "opts": [
        "$6, because the first step includes 2 hours",
        "$11, because the next step starts at 2 hours",
        "$8.50, the average of the two steps",
        "$17, as both steps are charged"
      ],
      "why": "The first step covers up to and including 2 hours, so the dot at 2 hours is closed on $6. The $11 step starts just after 2 hours, so it has an open dot there. A stay has one charge, not an average or a total.",
      "clue": "Check which step has the closed dot at 2 hours."
    }
  },
  "mat-direct-inverse-variation": {
    "title": "Direct and inverse variation",
    "card": [
      [
        "Direct",
        "y = kx, where k is a constant. When x doubles, y doubles. The graph is a straight line through the origin."
      ],
      [
        "Inverse",
        "y = k/x, where k is a constant. When x doubles, y halves. The graph is a curve that falls and never touches either axis."
      ],
      "From a table, test the pattern. In direct variation y ÷ x is always the same. In inverse variation x × y is always the same.",
      "Example: x = 2, 4, 5 and y = 20, 10, 8. Here x × y = 40 every time, so y = 40/x and the variation is inverse."
    ],
    "remember": "Direct: y ÷ x stays constant. Inverse: x × y stays constant.",
    "a": {
      "q": "A table gives x = 2, 4, 6 and y = 6, 12, 18. Which rule fits?",
      "opts": ["y = 3x", "y = 12/x", "y = x + 4", "y = 3/x"],
      "why": "Each y ÷ x equals 3, so y = 3x and the variation is direct. The rule y = 12/x is tempting because 12 appears in the table, but x × y is not constant: 2 × 6 = 12 and 4 × 12 = 48.",
      "clue": "Divide each y by its x and compare."
    },
    "b": {
      "d": 2,
      "q": "Cars on a road travel the same 120 km. Time taken t hours varies with speed v km/h as t = 120/v. What happens to t when v is doubled?",
      "opts": ["t is halved", "t is doubled", "t is reduced by 120", "t stays the same"],
      "why": "The rule is inverse variation, so doubling v halves t. Doubling t would be direct variation, which is the tempting mistake.",
      "clue": "Is the rule y = kx or y = k/x?"
    }
  },
  "mat-transforming-data-linearity": {
    "title": "Transforming data to linearity",
    "card": [
      "Some data form a curve when y is plotted against x. We can replace x with a transformed value, such as x², and plot again. If the new plot is a straight line, the transformation suits the data.",
      "Use x² when y rises more and more steeply, as in y = kx². Use log x when y rises quickly at first, then levels off.",
      "Use 1/x when y falls quickly and then levels off, as in y = k/x. Plotting y against 1/x then gives a straight line.",
      "Example: x = 1, 2, 3 and y = 3, 12, 27. Then x² = 1, 4, 9, and each y ÷ x² is 3. So the points (1, 3), (4, 12) and (9, 27) lie on a straight line."
    ],
    "remember": "Match the shape: x² for steepening rises, log x for rises that level off, 1/x for falls that level off.",
    "a": {
      "q": "Data follow the rule y = 5x². Which plot gives a straight line?",
      "opts": ["y against x²", "y against 1/x", "y against log x", "y against x"],
      "why": "Since y = 5 × x², each y is 5 times its x² value, so y against x² gives a straight line. Plotting y against x gives a curve that rises more and more steeply, so it is not a line.",
      "clue": "Which form of x appears in the rule?"
    },
    "b": {
      "d": 3,
      "q": "A table shows x = 1, 2, 4 and y = 12, 6, 3. Which plot gives a straight line?",
      "opts": ["y against 1/x", "y against log x", "y against x²", "y against x"],
      "why": "As x grows, y falls quickly and then levels off, which suits 1/x. The 1/x values are 1, 0.5 and 0.25, and each y is 12 times its 1/x value, so the points lie on a line. Log x is tempting because the data level off, but it suits data that rise, not fall.",
      "clue": "Is y rising or falling as x grows?"
    }
  },
  "mat-modelling-non-linear-data": {
    "title": "Modelling non-linear data",
    "card": [
      "Some curved data fit a rule y = kx^n, where n is a power such as 2, 3 or 1/2. The constant k sets the size of y.",
      "Once you pick the power n, plot y against x^n. If the points lie on a straight line through the origin, the rule fits.",
      "The gradient of that line is k. Find it as y ÷ x^n for any point on the line.",
      "Example: x = 2 and y = 24 fit y = kx³. Then x³ = 8, so k = 24 ÷ 8 = 3 and the rule is y = 3x³."
    ],
    "remember": "Plot y against x^n. The gradient of the straight line is k.",
    "a": {
      "q": "Data fit y = kx². The point x = 3, y = 45 lies on the curve. What is k?",
      "opts": ["5", "15", "135", "7.5"],
      "why": "x² = 9, so k = 45 ÷ 9 = 5. The value 15 comes from dividing by x instead of x².",
      "clue": "Square x before you divide."
    },
    "b": {
      "d": 3,
      "q": "The area of a circular garden bed is modelled as A = kr². When r = 2 m, A = 12.56 m². Which is the area when r = 5 m?",
      "opts": ["78.5 m²", "31.4 m²", "62.8 m²", "25.12 m²"],
      "why": "k = 12.56 ÷ 4 = 3.14. Then A = 3.14 × 25 = 78.5. The value 31.4 comes from scaling the area by 5 ÷ 2 instead of squaring the radius ratio.",
      "clue": "Find k first, then square 5."
    }
  },
  "mat-units-precision": {
    "title": "Units and precision",
    "card": [
      "Convert units by multiplying or dividing. 1 m = 100 cm = 1000 mm, and 1 km = 1000 m. For area, square the factor: 1 m² = 10 000 cm². For volume, cube it: 1 m³ = 1 000 000 cm³.",
      "Capacity is how much a container holds. 1 L = 1000 mL, and 1 L = 1000 cm³. So 1 mL = 1 cm³.",
      "Scientific notation writes a number as a × 10ⁿ, with a from 1 up to (but not including) 10. So 45 000 = 4.5 × 10⁴ and 0.0032 = 3.2 × 10⁻³.",
      "Significant figures start at the first non-zero digit. 0.004 07 has 3 significant figures. To round, look at the next digit: 5 or more rounds up. So 0.004 07 to 2 significant figures is 0.0041."
    ],
    "remember": "Square the factor for area, cube it for volume. Count significant figures from the first non-zero digit.",
    "a": {
      "q": "What is 3 m² written in cm²?",
      "opts": ["30 000 cm²", "300 cm²", "3000 cm²", "300 000 cm²"],
      "why": "1 m = 100 cm, so 1 m² = 100 × 100 = 10 000 cm². Then 3 × 10 000 = 30 000 cm². Using 100 instead of 10 000 gives 300, which is the length factor, not the area factor.",
      "clue": "Square the length factor first."
    },
    "b": {
      "d": 3,
      "q": "A tank holds 2.5 m³ of water. How many litres is this?",
      "opts": ["2500 L", "250 L", "25 000 L", "2 500 000 L"],
      "why": "1 m³ = 1 000 000 cm³, and 1000 cm³ = 1 L, so 1 m³ = 1000 L. Then 2.5 × 1000 = 2500 L. Choosing 2 500 000 stops at cm³ and does not convert to litres.",
      "clue": "Change m³ to cm³ first, then use 1 L = 1000 cm³."
    }
  },
  "mat-perimeter-area-2": {
    "title": "Perimeter and area",
    "card": [
      [
        "Perimeter",
        "the distance around the outside of a shape, in units such as cm. For a circle it is called the circumference: C = 2πr."
      ],
      [
        "Area",
        "the space inside a shape, in square units such as cm². Rectangle: length × width. Triangle: ½ × base × perpendicular height. Parallelogram: base × perpendicular height. Circle: πr²."
      ],
      [
        "Arcs and sectors",
        "A sector is a slice of a circle, and its arc is the curved edge. Take the fraction θ/360 of the whole circle. Arc length = θ/360 × 2πr. Sector area = θ/360 × πr²."
      ],
      [
        "Composite shapes",
        "Split the shape into simple parts, find each area, then add or subtract. Example: a 10 cm by 6 cm rectangle with a 4 cm by 3 cm rectangle cut out has area 60 − 12 = 48 cm²."
      ]
    ],
    "remember": "Perimeter is the distance around. Area is the space inside. Split composite shapes into simple parts.",
    "a": {
      "q": "A triangle has a base of 10 cm and a perpendicular height of 6 cm. What is its area?",
      "opts": ["30 cm²", "60 cm²", "16 cm²", "32 cm²"],
      "why": "Area = ½ × 10 × 6 = 30 cm². 60 cm² is wrong because it leaves out the ½, which is the rectangle's area. 16 comes from adding the base and height.",
      "clue": "A triangle is half of a rectangle with the same base and height."
    },
    "b": {
      "d": 3,
      "q": "A sector has a radius of 6 cm and an angle of 90°. What is its area, to the nearest cm²?",
      "opts": ["28 cm²", "113 cm²", "9 cm²", "57 cm²"],
      "why": "The sector is 90/360 = 1/4 of a circle. Area = 1/4 × π × 6² = 9π, which is about 28 cm². 113 cm² is the whole circle. 57 cm² uses 1/2 instead of 1/4.",
      "clue": "Find the fraction of the circle first, then use πr²."
    }
  },
  "mat-surface-area-volume": {
    "title": "Surface area and volume",
    "card": [
      [
        "Volume",
        "A prism has the same cross-section (base) all the way along. Volume of a prism = base area × height, where height is the distance between the two ends."
      ],
      [
        "Surface area",
        "Surface area is the total area of every face of a solid. Add the areas of all the faces, including the two ends."
      ],
      ["Units", "Volume is in cubic units such as cm³. Surface area is in square units such as cm²."],
      [
        "Worked example",
        "A box is 5 cm by 3 cm by 4 cm. Volume = (5 × 3) × 4 = 60 cm³. Faces: 2 × (5×3) + 2 × (5×4) + 2 × (3×4) = 30 + 40 + 24 = 94 cm²."
      ]
    ],
    "remember": "Volume is base area × height in cubic units. Surface area adds every face in square units.",
    "a": {
      "q": "A prism has a base area of 12 cm² and a height of 7 cm. What is its volume?",
      "opts": ["84 cm³", "19 cm³", "84 cm²", "38 cm³"],
      "why": "Volume = base area × height = 12 × 7 = 84 cm³. Adding 12 and 7 gives 19, which mixes up the operation. Volume is measured in cubic units, so cm² is wrong.",
      "clue": "Multiply the base area by the height."
    },
    "b": {
      "d": 3,
      "q": "A closed box measures 6 cm by 2 cm by 5 cm. What is its surface area?",
      "opts": ["104 cm²", "60 cm²", "52 cm²", "104 cm³"],
      "why": "The faces are 2 × (6×2) + 2 × (6×5) + 2 × (2×5) = 24 + 60 + 20 = 104 cm². Finding 6 × 2 × 5 = 60 gives the volume, not the surface area. Using each face type only once gives 52, which skips the pairs of faces.",
      "clue": "A box has three pairs of matching faces."
    }
  },
  "mat-similarity-scale-factors": {
    "title": "Similarity and scale factors",
    "card": [
      "Two shapes are similar if they have the same shape but may differ in size. Matching angles are equal, and matching sides are in the same ratio.",
      "The scale factor is the ratio of matching sides: new length ÷ original length. Example: a side of 4 cm becomes 10 cm, so the scale factor is 10 ÷ 4 = 2.5.",
      "To find a missing side, multiply or divide by the scale factor. If the scale factor from small to large is 2.5, a 6 cm side on the small shape matches 6 × 2.5 = 15 cm on the large one.",
      "Two triangles are similar if two pairs of angles are equal, or if all three pairs of sides are in the same ratio. Two equal angles are enough, as the third angle must then match too."
    ],
    "remember": "Similar shapes have equal angles and sides in a constant ratio, the scale factor.",
    "a": {
      "q": "Triangle ABC is similar to triangle PQR. Side AB is 6 cm and matching side PQ is 15 cm. Side BC is 8 cm. How long is the matching side QR?",
      "opts": ["20 cm", "3.2 cm", "17 cm", "23 cm"],
      "why": "The scale factor is 15 ÷ 6 = 2.5, so QR = 8 × 2.5 = 20 cm. Adding the difference of 9 cm to get 17 cm is tempting, but similar shapes scale by multiplying, not adding.",
      "clue": "Find the scale factor first, then multiply."
    },
    "b": {
      "d": 3,
      "q": "In triangle DEF, angle D is 50° and angle E is 70°. In triangle XYZ, angle X is 50° and angle Z is 60°. What can be said about the two triangles?",
      "opts": [
        "They are similar, because two pairs of angles are equal",
        "They are not similar, because the sides are not given",
        "They are not similar, because only one angle matches",
        "They are similar only if the side lengths are equal"
      ],
      "why": "Angle F = 180° − 50° − 70° = 60°, and angle Y = 180° − 50° − 60° = 70°. So all three angles match (D and X, E and Y, F and Z), and the triangles are similar. Side lengths are not needed, as equal angles are enough.",
      "clue": "Find the missing angle in each triangle first."
    }
  },
  "mat-scaling-area-volume": {
    "title": "Scaling area and volume",
    "card": [
      "When every length of a shape or solid is multiplied by k, the new shape is similar to the old one. Here k is the scale factor for lengths.",
      [
        "Area",
        "area scales by k². Area is length × length, so both lengths are multiplied by k. Example: k = 3 makes every area 9 times as large."
      ],
      [
        "Volume",
        "volume scales by k³. Volume is length × length × length, so three lengths are multiplied by k. Example: k = 2 makes every volume 8 times as large."
      ],
      "To find k from areas or volumes, go backwards. If the area ratio is 25, then k = √25 = 5. If the volume ratio is 27, then k = ∛27 = 3."
    ],
    "remember": "Lengths × k, areas × k², volumes × k³.",
    "a": {
      "q": "A small tin has a base area of 12 cm². A larger similar tin has all lengths 3 times as long. What is the base area of the larger tin?",
      "opts": ["108 cm²", "36 cm²", "324 cm²", "27 cm²"],
      "why": "Area scales by k² = 3² = 9, so the base area is 12 × 9 = 108 cm². Multiplying by 3 gives 36 cm², which scales the area as if it were a length.",
      "clue": "Area is length × length, so k is used twice."
    },
    "b": {
      "d": 3,
      "q": "Two similar water tanks hold 40 L and 320 L. The small tank is 50 cm tall. How tall is the large tank?",
      "opts": ["100 cm", "200 cm", "400 cm", "150 cm"],
      "why": "The volume ratio is 320 ÷ 40 = 8, so k³ = 8 and k = 2. The height is 50 × 2 = 100 cm. Using 8 as the length factor gives 400 cm, which forgets that volume scales by k³.",
      "clue": "Find k by going backwards from the volume ratio."
    }
  },
  "mat-quadratic-graphs": {
    "title": "Quadratic graphs",
    "card": [
      "A quadratic graph is a parabola. In turning point form, y = a(x − h)² + k, the vertex (turning point) is (h, k). Note the sign: (x − 3) gives h = 3, and (x + 3) = (x − (−3)) gives h = −3.",
      "If a is positive, the parabola opens upwards and the vertex is the lowest point. If a is negative, it opens downwards and the vertex is the highest point.",
      "For the y-intercept, put x = 0. For the x-intercepts, put y = 0, then solve by factorising or by the quadratic formula.",
      "Example: y = (x − 2)² − 9 has vertex (2, −9). Setting y = 0 gives (x − 2)² = 9, so x − 2 = 3 or −3, and x = 5 or −1."
    ],
    "remember": "To get h, flip the sign of the number inside the bracket. k is read as it is. Set y = 0 for x-intercepts.",
    "a": {
      "q": "What is the vertex of y = 2(x + 4)² − 7?",
      "opts": ["(−4, −7)", "(4, −7)", "(−4, 7)", "(4, 7)"],
      "why": "Write (x + 4) as (x − (−4)), so h = −4. The k value is −7, so the vertex is (−4, −7). The option (4, −7) is tempting but copies the sign inside the bracket.",
      "clue": "Whatever is added inside the bracket, h has the opposite sign."
    },
    "b": {
      "d": 3,
      "q": "Priya graphs y = −(x − 1)² + 16. What are the x-intercepts?",
      "opts": ["x = −3 and x = 5", "x = −5 and x = 3", "x = 1 and x = 16", "x = 0 and x = 2"],
      "why": "Set y = 0: (x − 1)² = 16, so x − 1 = 4 or −4. That gives x = 5 or x = −3. The option x = −5 and x = 3 comes from taking h as −1.",
      "clue": "Set y = 0, then take the square root of both sides, remembering both signs."
    }
  },
  "mat-cubic-quartic-graphs": {
    "title": "Cubic and quartic graphs",
    "card": [
      "A factorised polynomial shows its x-intercepts. Set each bracket to zero. For y = (x + 2)(x − 1)(x − 3), the x-intercepts are x = −2, 1 and 3.",
      ["Single factor", "a bracket that appears once, such as (x − 1). The graph crosses the x-axis at that point."],
      [
        "Squared factor",
        "a bracket that appears twice, such as (x − 1)². The graph touches the axis and turns back without crossing."
      ],
      [
        "Cubed factor",
        "a bracket that appears three times, such as (x − 1)³. The graph flattens at the axis as it crosses."
      ]
    ],
    "remember": "Read the x-intercepts from the brackets. One factor crosses, a squared factor touches, a cubed factor flattens.",
    "a": {
      "q": "For y = (x − 4)²(x + 1), what does the graph do at x = 4?",
      "opts": [
        "Touches the x-axis and turns back",
        "Crosses the x-axis without flattening",
        "Flattens as it crosses the x-axis",
        "Does not meet the x-axis"
      ],
      "why": "The factor (x − 4) is squared, so x = 4 is an x-intercept where the graph touches the axis and turns. A single factor would cross. A cubed factor would flatten as it crosses.",
      "clue": "Look at the power on the bracket (x − 4)."
    },
    "b": {
      "d": 3,
      "q": "A graph is y = (x + 2)(x − 3)³. What does it do at x = 3 and at x = −2?",
      "opts": [
        "Flattens as it crosses at x = 3, crosses at x = −2",
        "Crosses at x = 3, flattens as it crosses at x = −2",
        "Touches and turns at x = 3, crosses at x = −2",
        "Flattens as it crosses at both x = 3 and x = −2"
      ],
      "why": "The bracket (x − 3) is cubed, so the graph flattens as it crosses at x = 3. The bracket (x + 2) appears once, so the graph simply crosses at x = −2. The powers belong to the brackets, not to the numbers inside them.",
      "clue": "Match each power to its own bracket, then set each bracket to zero."
    }
  },
  "mat-power-functions": {
    "title": "Power functions",
    "card": [
      "A power function has the form y = xⁿ, where n can be negative or a fraction. Its graph is shaped by values it cannot reach.",
      [
        "1/x and 1/x²",
        "x cannot be 0, so the y-axis is a vertical asymptote, a line the graph approaches but never touches. y = 0 is a horizontal asymptote. For y = 1/x the branches are in opposite quadrants. For y = 1/x² both branches are above the x-axis."
      ],
      [
        "√x",
        "y = √x needs x ≥ 0, so the graph starts at the point (0, 0) and rises to the right. It has no part to the left of the y-axis."
      ],
      "Example: y = 1/x has no point at x = 0. When x = 2, y = 1/2. When x = −2, y = −1/2."
    ],
    "remember": "The values a power function cannot use, such as x = 0 for 1/x or negative x for √x, set its shape.",
    "a": {
      "q": "Which statement is true for the graph of y = 1/x²?",
      "opts": [
        "It has the y-axis as an asymptote and lies above the x-axis",
        "It has the y-axis as an asymptote and dips below the x-axis",
        "It passes through the origin and lies above the x-axis",
        "It starts at the origin and has no part for negative x"
      ],
      "why": "x = 0 is not allowed, so the y-axis is an asymptote. Squaring makes every x² positive, so y is always positive. A branch below the x-axis belongs to y = 1/x, not 1/x².",
      "clue": "Is x² ever negative?"
    },
    "b": {
      "d": 2,
      "q": "Sam graphs y = √x. Which x-value gives no point on the graph?",
      "opts": ["x = −4", "x = 0", "x = 4", "x = 9"],
      "why": "The square root of a negative number is not a real number, so the graph has no point for x = −4. The value x = 0 is tempting, but it is allowed and gives the start point (0, 0).",
      "clue": "Which x-value would put a negative number under the root?"
    }
  },
  "mat-transformations-graphs": {
    "title": "Transformations of graphs",
    "card": [
      [
        "Translation",
        "y = f(x − h) + k moves the graph h units right and k units up. A minus inside the bracket moves the graph right."
      ],
      ["Reflection", "y = −f(x) reflects the graph in the x-axis. y = f(−x) reflects it in the y-axis."],
      [
        "Dilation",
        "y = a f(x) stretches the graph by a factor of a from the x-axis. y = f(x/b) stretches it by a factor of b from the y-axis."
      ],
      "Each point (x, y) moves in a set way. For example, y = (x + 1)² − 4 is y = x² moved 1 left and 4 down, so its vertex is (−1, −4)."
    ],
    "remember": "Outside the bracket changes y. Inside the bracket changes x, and in the opposite way to how it looks.",
    "a": {
      "q": "The graph of y = x² is translated 3 units right and 2 units down. What is the new rule?",
      "opts": ["y = (x − 3)² − 2", "y = (x + 3)² − 2", "y = (x − 3)² + 2", "y = (x + 3)² + 2"],
      "why": "Moving right by 3 means x is replaced by (x − 3), and moving down by 2 means subtracting 2. The option with (x + 3) moves the graph left, which is the tempting mistake.",
      "clue": "Right 3 puts a minus inside the bracket."
    },
    "b": {
      "d": 3,
      "q": "The point (6, 4) lies on y = f(x). Which point lies on y = −f(x/2)?",
      "opts": ["(12, −4)", "(3, −4)", "(−12, 4)", "(12, 4)"],
      "why": "Replacing x with x/2 stretches the graph by a factor of 2 from the y-axis, so x goes from 6 to 12. The negative sign outside reflects in the x-axis, so y goes from 4 to −4. (3, −4) is tempting, but it halves x instead of doubling it.",
      "clue": "Deal with x and y separately: one is stretched, one is flipped."
    }
  },
  "mat-families-functions": {
    "title": "Families of functions",
    "card": [
      "A parameter is a letter in a rule that can take many values. In y = ax², each value of a gives a different parabola, and together they form a family.",
      "If a > 0 the parabola opens up. If a < 0 it opens down. The larger the size of a, the narrower the parabola.",
      "To find the rule for one member of the family, put a given point into the rule and solve for the parameter.",
      "Example: y = ax² passes through (2, 12). Then 12 = a × 2², so 12 = 4a and a = 3. The rule is y = 3x²."
    ],
    "remember": "A parameter names a family. A point on the graph fixes which member it is.",
    "a": {
      "q": "The graph of y = ax² passes through (3, 18). What is the value of a?",
      "opts": ["2", "6", "9", "54"],
      "why": "Put in x = 3 and y = 18: 18 = a × 3², so 18 = 9a and a = 2. Using 3 instead of 3² gives 6, which is the tempting mistake.",
      "clue": "Square the x-value before dividing."
    },
    "b": {
      "d": 3,
      "q": "The graph of y = ax² + 1 passes through (2, −7). What is its rule?",
      "opts": ["y = −2x² + 1", "y = −1.5x² + 1", "y = −1.75x² + 1", "y = 2x² + 1"],
      "why": "Put in the point: −7 = 4a + 1, so 4a = −8 and a = −2. Adding 1 instead of subtracting it gives 4a = −6, so −1.5, which is the tempting mistake.",
      "clue": "Subtract the constant from both sides before dividing."
    }
  },
  "mat-simultaneous-equations": {
    "title": "Simultaneous equations",
    "card": [
      [
        "Substitution",
        "Rearrange one equation to give y (or x), then put it into the other. Example: y = 2x + 1 and 3x + y = 11 give 3x + 2x + 1 = 11, so x = 2 and y = 5."
      ],
      [
        "Elimination",
        "Add or subtract the equations to remove one variable. Example: x + y = 7 and x − y = 3 add to give 2x = 10, so x = 5 and y = 2."
      ],
      "A line can meet a parabola. Substitute the line into the parabola to get a quadratic, then solve it. There can be two solutions, one or none.",
      "Find y for each x using the line's rule. The answer is a point (x, y), so always give both coordinates."
    ],
    "remember": "Combine the equations to get one variable, solve it, then go back for the other.",
    "a": {
      "q": "Solve y = 3x − 2 and 2x + y = 13 together. What is the solution (x, y)?",
      "opts": ["(3, 7)", "(7, 3)", "(3, 11)", "(3, 10)"],
      "why": "Substituting gives 2x + 3x − 2 = 13, so 5x = 15 and x = 3. Then y = 3 × 3 − 2 = 7, which also checks in 2 × 3 + 7 = 13. (7, 3) has the coordinates swapped.",
      "clue": "Replace y in the second equation with 3x − 2."
    },
    "b": {
      "d": 3,
      "q": "The line y = x + 2 meets the parabola y = x². Where do they meet?",
      "opts": ["(2, 4) and (−1, 1)", "(2, 4) and (1, 1)", "(−2, 0) and (1, 3)", "(2, 4) only"],
      "why": "Set x² = x + 2, so x² − x − 2 = 0, which factorises as (x − 2)(x + 1) = 0. So x = 2 or x = −1, and the points are (2, 4) and (−1, 1). (2, 4) only is tempting, but the quadratic has two solutions.",
      "clue": "Put x + 2 equal to x², then factorise."
    }
  },
  "mat-simulation": {
    "title": "Simulation",
    "card": [
      "A simulation copies a random experiment using a device that is easier to run. Coins, dice, spinners and random number generators are common choices.",
      "The device must match the chances in the real experiment. A fair coin has two equally likely outcomes, so it can stand in for any yes or no event with probability 1/2.",
      "Run the simulation many times. Estimated probability = number of trials with the event ÷ total number of trials.",
      "Example: a spinner has 5 equal sectors. Let 1 stand for rain and 2 to 5 for no rain. In 40 spins, 1 comes up 9 times. The estimate for rain is 9/40 = 0.225. The true value is 1/5 = 0.2. More trials usually bring the estimate closer."
    ],
    "remember": "Match the device to the chances, run many trials, then divide successes by trials.",
    "a": {
      "q": "A fair six-sided die is rolled 50 times and shows a 6 on 7 rolls. What is the estimated probability of a 6?",
      "opts": ["7/50", "1/6", "7/43", "43/50"],
      "why": "The estimate is the number of trials with the event divided by all trials, so 7 ÷ 50 = 0.14. The value 1/6 is the theoretical probability, not the result of this simulation.",
      "clue": "Divide the count of 6s by the total number of rolls."
    },
    "b": {
      "d": 3,
      "q": "Priya wants to simulate whether a bus is late, with probability 1/4. Which device matches this chance?",
      "opts": [
        "A spinner with 4 equal sectors, one marked late",
        "A fair coin, with heads meaning late",
        "A fair die, with 1 meaning late",
        "A spinner with 3 equal sectors, one marked late"
      ],
      "why": "One of 4 equal sectors gives a chance of 1/4. A coin gives 1/2, a die gives 1/6 for a single face, and a 3-sector spinner gives 1/3.",
      "clue": "Find the device where the late outcome has chance 1/4."
    }
  },
  "mat-permutations": {
    "title": "Counting principles",
    "card": [
      [
        "Multiplication",
        "When choices are made one after another, multiply the number of ways for each step. A meal with 3 mains and then 4 drinks gives 3 × 4 = 12 meals."
      ],
      [
        "Addition",
        "When you pick one option from separate groups, and only one choice is made, add the numbers. Choosing one book from 5 novels or 6 atlases gives 5 + 6 = 11 books."
      ],
      "Ask first: do I make one choice after another, or do I pick just one item from different groups?",
      "Some problems use both. Work out each part, then combine them with the right principle."
    ],
    "remember": "Steps one after another: multiply. Alternatives: add.",
    "a": {
      "q": "Priya chooses one of 4 hats and then one of 5 scarves. How many hat and scarf outfits are possible?",
      "opts": ["20", "9", "16", "25"],
      "why": "The two choices are made one after another, so multiply: 4 × 5 = 20. Adding gives 9, which would count only a single item from the two groups, not an outfit of both.",
      "clue": "She picks a hat and then a scarf."
    },
    "b": {
      "d": 3,
      "q": "A café sells 6 hot drinks and 4 cold drinks. Sam buys one drink, then picks one of 3 snacks. How many drink and snack choices are there?",
      "opts": ["30", "13", "72", "24"],
      "why": "The drink is one choice from two groups, so add: 6 + 4 = 10 drinks. The snack comes after, so multiply: 10 × 3 = 30. Using 6 × 4 × 3 = 72 wrongly multiplies the two drink groups, which are alternatives.",
      "clue": "Hot and cold drinks are alternatives. The snack is a second step."
    }
  },
  "mat-combinations": {
    "title": "Combinations",
    "card": [
      "A combination is a selection where order does not matter. Choosing Ana and Ben is the same as choosing Ben and Ana.",
      "The number of ways to choose r items from n is nCr = n! ÷ (r! × (n − r)!). Here n! means n × (n − 1) × ... × 1.",
      "Example: choose 2 from 5. 5C2 = 5! ÷ (2! × 3!) = 120 ÷ (2 × 6) = 10.",
      "Shortcut: multiply r numbers counting down from n, then divide by r!. So 5C2 = (5 × 4) ÷ (2 × 1) = 10. Dividing by r! removes repeats, as each group can be ordered in r! ways."
    ],
    "remember": "When order does not matter, divide by r! so each group is counted once.",
    "a": {
      "q": "What is 6C2?",
      "opts": ["15", "30", "12", "8"],
      "why": "6C2 = (6 × 5) ÷ (2 × 1) = 15. The answer 30 is 6 × 5 without dividing by 2!, so it counts each pair twice, once in each order.",
      "clue": "Each pair can be ordered in 2! ways."
    },
    "b": {
      "d": 2,
      "q": "A coach picks 3 players from a squad of 8 to attend a clinic. The order of picking does not matter. How many different groups can be picked?",
      "opts": ["56", "336", "24", "5"],
      "why": "This is 8C3 = (8 × 7 × 6) ÷ (3 × 2 × 1) = 336 ÷ 6 = 56. The answer 336 counts each group in every order, so it is 3! = 6 times too large.",
      "clue": "Work out which number is n and which is r."
    }
  },
  "mat-venn-diagrams-karnaugh-maps": {
    "title": "Venn diagrams and Karnaugh maps",
    "card": [
      "A Venn diagram uses a rectangle for all outcomes and overlapping circles for events. A probability table, or Karnaugh map, does the same job with rows and columns, and in both the probabilities of all regions add to 1.",
      [
        "Intersection",
        "A ∩ B means both A and B happen. It is the overlap of the two circles, or the cell where row A meets column B."
      ],
      ["Union", "A ∪ B means A or B or both happen. It is everything inside either circle."],
      [
        "Complement",
        "A' means A does not happen. It is everything outside circle A, so Pr(A') = 1 − Pr(A). Example: if Pr(A) = 0.6 and Pr(A ∩ B) = 0.3, then Pr(A ∩ B') = 0.6 − 0.3 = 0.3."
      ]
    ],
    "remember": "Overlap is both, whole circles together is or, outside is not. All regions add to 1.",
    "a": {
      "q": "In a table, Pr(A) = 0.7 and Pr(A ∩ B) = 0.4. What is Pr(A ∩ B')?",
      "opts": ["0.3", "0.4", "0.6", "1.1"],
      "why": "A ∩ B' is the part of A that is not in B, so 0.7 − 0.4 = 0.3. Giving 0.6 comes from finding 1 − 0.4, which ignores that the region must sit inside A.",
      "clue": "Take the overlap away from all of A."
    },
    "b": {
      "d": 3,
      "q": "In Year 11 at a Ballarat school, Pr(plays sport) = 0.5, Pr(plays music) = 0.4 and Pr(both) = 0.2. What is the probability a student does neither?",
      "opts": ["0.3", "0.1", "0.5", "0.7"],
      "why": "Fill each region: sport only 0.5 − 0.2 = 0.3, both 0.2, music only 0.4 − 0.2 = 0.2. These add to 0.7, so neither is 1 − 0.7 = 0.3. Giving 0.1 comes from 1 − 0.5 − 0.4, which counts the overlap twice.",
      "clue": "Fill the three regions inside the circles first."
    }
  },
  "mat-addition-rule": {
    "title": "The addition rule",
    "card": [
      "Pr(A ∪ B) is the chance that A happens, or B happens, or both. The rule is Pr(A ∪ B) = Pr(A) + Pr(B) − Pr(A ∩ B).",
      "We subtract Pr(A ∩ B) because outcomes in both A and B are counted twice when we add Pr(A) and Pr(B).",
      "Mutually exclusive events cannot happen together, so Pr(A ∩ B) = 0. Then Pr(A ∪ B) = Pr(A) + Pr(B).",
      "Example: Pr(A) = 0.5, Pr(B) = 0.4 and Pr(A ∩ B) = 0.2. Then Pr(A ∪ B) = 0.5 + 0.4 − 0.2 = 0.7."
    ],
    "remember": "Add the two chances, then take away the overlap so it is counted once.",
    "a": {
      "q": "Pr(A) = 0.6, Pr(B) = 0.3 and Pr(A ∩ B) = 0.1. What is Pr(A ∪ B)?",
      "opts": ["0.8", "0.9", "0.7", "0.18"],
      "why": "Pr(A ∪ B) = 0.6 + 0.3 − 0.1 = 0.8. Adding only Pr(A) and Pr(B) gives 0.9, which counts the overlap twice.",
      "clue": "Take away the overlap once."
    },
    "b": {
      "d": 3,
      "q": "At a Ballarat school, Pr(a student plays netball) = 0.35 and Pr(a student plays chess) = 0.15. No student does both. What is the chance a student plays netball or chess?",
      "opts": ["0.50", "0.20", "0.0525", "0.4475"],
      "why": "No student does both, so the events are mutually exclusive and Pr(A ∩ B) = 0. Then Pr(A ∪ B) = 0.35 + 0.15 = 0.50. The product 0.0525 is not used here, because the rule adds the chances.",
      "clue": "If no one does both, what is the overlap?"
    }
  },
  "mat-conditional-probability-2": {
    "title": "Conditional probability",
    "card": [
      "Pr(A | B) is the probability of A given that B has happened. Knowing B has happened shrinks the sample space to just the outcomes in B.",
      "Formula: Pr(A | B) = Pr(A ∩ B)/Pr(B). The bottom is the event we are given. The top is the part of it that is also A.",
      "From a table, Pr(A | B) = (number in both A and B) ÷ (number in B). Use only the row or column for B as the total.",
      "Example: in a class of 30, 12 play netball, and 8 of those 12 also play tennis. Pr(tennis | netball) = 8/12 = 2/3. The total is 12, not 30."
    ],
    "remember": "Given B means B is the new total. Divide by Pr(B), not by everything.",
    "a": {
      "q": "For two events, Pr(A ∩ B) = 0.2 and Pr(B) = 0.5. Find Pr(A | B).",
      "opts": ["0.4", "0.1", "0.7", "2.5"],
      "why": "Pr(A | B) = Pr(A ∩ B) ÷ Pr(B) = 0.2 ÷ 0.5 = 0.4. Multiplying gives 0.1, but the formula divides by the probability of the given event.",
      "clue": "The event after the bar goes on the bottom."
    },
    "b": {
      "d": 3,
      "q": "At a school camp, 40 students chose activities. 25 chose kayaking, and 10 of those also chose archery. 5 chose only archery. One archery student is picked at random. What is the probability they also chose kayaking?",
      "opts": ["2/3", "1/4", "2/5", "3/8"],
      "why": "Archery has 10 + 5 = 15 students, and 10 of them chose kayaking, so the probability is 10/15 = 2/3. The option 2/5 is 10/25, which divides by the kayakers and so reverses the condition. The given event is archery, so it goes on the bottom.",
      "clue": "Find the total number who chose archery first."
    }
  },
  "mat-law-total-probability": {
    "title": "The law of total probability",
    "card": [
      "Sometimes an event can happen in more than one way. The law of total probability adds up the chance of each way.",
      "Split on A and not A: Pr(B) = Pr(B | A) × Pr(A) + Pr(B | A') × Pr(A').",
      "Each path is a product: the chance of the first step times the chance of the second step given the first. Then the paths that end in B are added.",
      "Example: Pr(A) = 0.4, Pr(B | A) = 0.5 and Pr(B | A') = 0.2. Then Pr(B) = 0.5 × 0.4 + 0.2 × 0.6 = 0.2 + 0.12 = 0.32."
    ],
    "remember": "Multiply along each path to B, then add the paths.",
    "a": {
      "q": "Pr(A) = 0.3, Pr(B | A) = 0.6 and Pr(B | A') = 0.1. What is Pr(B)?",
      "opts": ["0.25", "0.18", "0.70", "0.35"],
      "why": "Pr(B) = 0.6 × 0.3 + 0.1 × 0.7 = 0.18 + 0.07 = 0.25. Giving 0.18 counts only the path through A and misses the path through not A.",
      "clue": "B can happen after A or after not A."
    },
    "b": {
      "d": 3,
      "q": "Priya cycles to school in Geelong on 20% of days, and otherwise takes the bus. She is late on 10% of cycling days and 30% of bus days. What is the probability she is late on a random day?",
      "opts": ["0.26", "0.20", "0.40", "0.06"],
      "why": "Late = 0.1 × 0.2 + 0.3 × 0.8 = 0.02 + 0.24 = 0.26. Giving 0.40 adds 0.1 and 0.3 without weighting each by how often that path is used.",
      "clue": "Weight each lateness chance by how often she uses that way."
    }
  },
  "mat-independent-events-2": {
    "title": "Independent events",
    "card": [
      "Two events are independent if knowing that one happened does not change the probability of the other. Flipping a coin and rolling a die are independent.",
      "For independent events A and B, Pr(A ∩ B) = Pr(A) × Pr(B). This means both happen.",
      "Example: Pr(heads) = 1/2 and Pr(roll a 6) = 1/6. Pr(heads and a 6) = 1/2 × 1/6 = 1/12.",
      "To test for independence, check whether Pr(A ∩ B) equals Pr(A) × Pr(B). If it does, the events are independent. If it does not, they are not."
    ],
    "remember": "Independent events: multiply the probabilities to find Pr(A ∩ B).",
    "a": {
      "q": "Events A and B are independent, with Pr(A) = 0.4 and Pr(B) = 0.5. Find Pr(A ∩ B).",
      "opts": ["0.2", "0.9", "0.1", "0.8"],
      "why": "For independent events, Pr(A ∩ B) = 0.4 × 0.5 = 0.2. Adding gives 0.9, which is the mistake of using the wrong operation and would not be a probability of both happening.",
      "clue": "Both events happen, and the events are independent."
    },
    "b": {
      "d": 3,
      "q": "Pr(A) = 0.5, Pr(B) = 0.4 and Pr(A ∩ B) = 0.3. Which statement is correct?",
      "opts": [
        "Not independent, as 0.5 × 0.4 = 0.2, not 0.3",
        "Independent, as 0.3 is between 0 and 1",
        "Independent, as 0.5 + 0.4 is more than 0.3",
        "Not independent, as 0.3 is less than Pr(A)"
      ],
      "why": "Independent events need Pr(A ∩ B) = Pr(A) × Pr(B). Here 0.5 × 0.4 = 0.2, which is not 0.3, so the events are not independent. Being a valid probability between 0 and 1 does not test independence.",
      "clue": "Multiply Pr(A) and Pr(B), then compare with Pr(A ∩ B)."
    }
  },
  "mat-graph-theory-specialist": {
    "title": "Graph theory in Specialist",
    "card": [
      "A graph is a set of vertices (points) joined by edges (lines). It can model a molecule, where atoms are vertices and bonds are edges, or a network of computers and cables.",
      "The degree of a vertex is the number of edges that meet it. An edge that starts and ends at the same vertex, called a loop, adds 2 to that vertex's degree.",
      "Every edge has two ends, so it adds 2 to the total of all the degrees. This gives the handshake rule: the sum of the degrees = 2 × the number of edges.",
      "Example: a graph has 5 edges. The degrees add to 2 × 5 = 10. If four vertices have degrees 3, 2, 2 and 1, the fifth has degree 10 − 8 = 2."
    ],
    "remember": "Add up every vertex's degree and you get twice the number of edges.",
    "a": {
      "q": "A network of 6 computers has 9 cables, and each cable joins two computers. What is the sum of the degrees of all the vertices?",
      "opts": ["18", "9", "15", "12"],
      "why": "Each edge adds 2 to the total, so the sum is 2 × 9 = 18. The answer 9 is the number of edges, which is only half of the degree sum.",
      "clue": "Each edge has two ends."
    },
    "b": {
      "d": 3,
      "q": "A graph has 4 vertices with degrees 4, 3, 3 and x. It has 7 edges. What is x?",
      "opts": ["4", "3", "7", "14"],
      "why": "The degrees add to 2 × 7 = 14. The three known degrees give 4 + 3 + 3 = 10, so x = 14 − 10 = 4. Using 7 as the total forgets to double the number of edges.",
      "clue": "Find the degree sum first, then subtract."
    }
  },
  "mat-types-graphs": {
    "title": "Types of graphs",
    "card": [
      [
        "Simple",
        "a graph with no loops and no more than one edge between any two vertices. Every graph here is simple."
      ],
      [
        "Complete",
        "every pair of vertices is joined by an edge. Kn has n vertices and n(n − 1)/2 edges. K5 has 5 × 4 ÷ 2 = 10 edges."
      ],
      ["Regular", "every vertex has the same degree. A regular graph with degree 3 is called 3-regular."],
      [
        "Complement",
        "the complement of a simple graph has the same vertices and exactly the edges the graph lacks. A graph and its complement together make a complete graph."
      ]
    ],
    "remember": "A complete graph has every possible edge. The complement has exactly the edges that are missing.",
    "a": {
      "q": "A simple graph has 6 vertices and is complete. How many edges does it have?",
      "opts": ["15", "30", "12", "36"],
      "why": "K6 has 6 × 5 ÷ 2 = 15 edges. Choosing 6 × 5 = 30 forgets that each edge is counted twice, once from each end.",
      "clue": "Count each edge once, not from both ends."
    },
    "b": {
      "d": 3,
      "q": "A simple graph has 5 vertices and 4 edges. What is the number of edges in its complement?",
      "opts": ["6", "4", "10", "5"],
      "why": "K5 has 5 × 4 ÷ 2 = 10 edges. The graph and its complement together make K5, so the complement has 10 − 4 = 6 edges. Giving 4 wrongly treats the complement as having the same edges.",
      "clue": "Find the edges of the complete graph on 5 vertices first."
    }
  },
  "mat-planar-graphs-euler-s-2": {
    "title": "Planar graphs and Euler's formula",
    "card": [
      "A planar graph can be drawn on a flat page so that no edges cross. A face is a region bounded by edges, and the outside region counts as one face.",
      "Euler's formula is for a connected planar graph: v − e + f = 2. Here v is the number of vertices, e the number of edges and f the number of faces.",
      "Worked example: a connected planar graph has 6 vertices and 9 edges. Then 6 − 9 + f = 2, so f = 5.",
      "A common slip is to forget the outside face when counting. Also, a graph that is drawn with crossing edges may still be planar, if it can be redrawn with no crossings."
    ],
    "remember": "For a connected planar graph, v − e + f = 2, and the outside face counts.",
    "a": {
      "q": "A connected planar graph has 7 vertices and 10 edges. How many faces does it have?",
      "opts": ["5", "3", "4", "6"],
      "why": "Use v − e + f = 2. Then 7 − 10 + f = 2, so −3 + f = 2 and f = 5. Choosing 3 comes from calculating 10 − 7 and stopping before adding the 2.",
      "clue": "Put the numbers into v − e + f = 2, then solve for f."
    },
    "b": {
      "d": 3,
      "q": "A connected planar graph has 8 faces, counting the outside face, and 12 edges. How many vertices does it have?",
      "opts": ["6", "4", "7", "18"],
      "why": "Use v − e + f = 2. Then v − 12 + 8 = 2, so v − 4 = 2 and v = 6. Choosing 4 comes from leaving out the 2 on the right side, which gives v − 12 + 8 = 0. Choosing 7 comes from taking away the outside face as well, so f becomes 7.",
      "clue": "The 8 faces already include the outside one."
    }
  },
  "mat-trees-algorithms": {
    "title": "Trees",
    "card": [
      "A network is connected if there is a route between every pair of vertices.",
      "A tree is a connected network that contains no circuits. Take away any one edge and it is no longer connected.",
      "A tree with n vertices has n − 1 edges. Example: a tree with 6 vertices has 6 − 1 = 5 edges.",
      "To test a network, check that it is connected and has no circuits. If a connected network has n vertices and more than n − 1 edges, it must contain a circuit, so it is not a tree."
    ],
    "remember": "A tree is connected with no circuits, and n vertices means n − 1 edges.",
    "a": {
      "q": "A tree has 12 vertices. How many edges does it have?",
      "opts": ["11", "12", "13", "10"],
      "why": "A tree with n vertices has n − 1 edges, so 12 − 1 = 11. Choosing 12 mixes up the number of edges with the number of vertices.",
      "clue": "Sketch a tree with 3 vertices and count its edges."
    },
    "b": {
      "d": 3,
      "q": "A council plans a walking track network joining 7 lookouts around Bendigo. It has 7 vertices, is connected and has 7 edges. Is it a tree?",
      "opts": [
        "No, because a tree would have only 6 edges",
        "Yes, because it is connected",
        "Yes, because it has as many edges as vertices",
        "No, because a tree would have 8 edges"
      ],
      "why": "A tree with 7 vertices has 7 − 1 = 6 edges. This network has one extra edge, so it must contain a circuit. Being connected is not enough, because a tree also needs no circuits.",
      "clue": "Work out how many edges a tree with 7 vertices has, then compare."
    }
  },
  "mat-euler-hamilton": {
    "title": "Euler and Hamilton",
    "card": [
      [
        "Euler trail",
        "a walk along the graph that uses every edge exactly once. Vertices may be visited more than once."
      ],
      [
        "Hamiltonian path",
        "a path that visits every vertex exactly once. It may leave some edges unused, and counting degrees does not tell you whether one exists."
      ],
      [
        "Euler test",
        "Count the vertices of odd degree. A connected graph has an Euler trail if and only if it has 0 or 2 odd vertices, so with any other number there is none. With 2, the trail must start at one odd vertex and end at the other."
      ],
      "The Königsberg bridge problem asked for a walk crossing each of 7 bridges once. The land areas were vertices, the bridges were edges, and all 4 vertices were odd. So no Euler trail exists."
    ],
    "remember": "Euler trail: every edge once. Hamiltonian path: every vertex once.",
    "a": {
      "q": "A connected graph has 5 vertices with degrees 2, 2, 3, 3 and 4. Which statement is correct?",
      "opts": [
        "It has an Euler trail starting at a vertex of degree 3",
        "It has no Euler trail, because two vertices are odd",
        "It has an Euler trail starting at the vertex of degree 4",
        "It has no Euler trail, because the degrees are not equal"
      ],
      "why": "Exactly two vertices are odd (the two of degree 3), so an Euler trail exists and must start at one of them and end at the other. Having two odd vertices does not rule a trail out, which is the tempting mistake.",
      "clue": "Count the vertices with an odd degree."
    },
    "b": {
      "d": 3,
      "q": "A connected graph has 6 vertices, and 4 of them have odd degree. Which statement must be true?",
      "opts": [
        "It has no Euler trail",
        "It has an Euler trail starting at any vertex",
        "It has an Euler trail starting at an odd vertex",
        "It has no Hamiltonian path"
      ],
      "why": "A connected graph has an Euler trail only if it has 0 or 2 odd vertices. This graph has 4, so no Euler trail exists. Counting degrees does not decide whether a Hamiltonian path exists, so that option need not be true.",
      "clue": "The Euler test looks only at odd vertices, not at vertices visited."
    }
  },
  "mat-matrix-operations-specialist": {
    "title": "Matrix operations",
    "card": [
      "A matrix is a rectangle of numbers in rows and columns. Its order is rows × columns, so a matrix with 2 rows and 3 columns has order 2 × 3.",
      "To add matrices, they must have the same order. Add the entries in matching positions. To scale a matrix, multiply every entry by the number.",
      "To multiply A × B, the number of columns in A must equal the number of rows in B. The result has A's rows and B's columns.",
      "Each entry of the product is a row of A times a column of B: multiply in pairs, then add. Example: (2 3) × (4 5)ᵀ, where the column is 4 then 5, gives 2×4 + 3×5 = 23."
    ],
    "remember": "Add needs equal orders. Multiply needs columns of the first to equal rows of the second.",
    "a": {
      "q": "Matrix A has order 2 × 3 and matrix B has order 3 × 4. What is the order of A × B?",
      "opts": ["2 × 4", "3 × 3", "2 × 3", "3 × 4"],
      "why": "The columns of A (3) match the rows of B (3), so the product exists. It has the rows of A and the columns of B, so its order is 2 × 4. Order 3 × 3 comes from taking the matching numbers instead.",
      "clue": "Keep the outer numbers."
    },
    "b": {
      "d": 3,
      "q": "A shop sells 2 items. Row matrix P = (10 20) holds the prices in dollars. Column matrix Q holds the numbers sold on one day: 3 of the first item and 4 of the second. What does P × Q give?",
      "opts": [
        "110, the total takings in dollars",
        "70, the total takings in dollars",
        "110, the total number of items sold",
        "30, the total price of the two items"
      ],
      "why": "P × Q = 10×3 + 20×4 = 30 + 80 = 110, which is price times number sold, added up: the takings in dollars. Adding 3 + 4 gives the items sold, 7, not 110.",
      "clue": "Multiply in pairs, then add the results."
    }
  },
  "mat-determinants-matrix-equations": {
    "title": "Determinants and matrix equations",
    "card": [
      "For a 2 × 2 matrix A with rows (a b) and (c d), the determinant is det(A) = ad − bc.",
      "A square matrix has an inverse only if its determinant is not 0. If det(A) = 0, there is no inverse.",
      "When det(A) = D is not 0, the inverse A⁻¹ is 1/D times the matrix with rows (d −b) and (−c a).",
      "To solve AX = B, multiply both sides on the left by A⁻¹. This gives X = A⁻¹B. The order matters: A⁻¹ goes before B."
    ],
    "remember": "No inverse if det = 0. Otherwise X = A⁻¹B, with A⁻¹ on the left.",
    "a": {
      "q": "Matrix A has rows (3 2) and (4 5). What is det(A)?",
      "opts": ["7", "23", "−7", "15"],
      "why": "det(A) = ad − bc = 3×5 − 2×4 = 15 − 8 = 7. The answer 23 comes from adding the products instead of subtracting.",
      "clue": "Main diagonal product, take away the other."
    },
    "b": {
      "d": 3,
      "q": "For which value of k does the matrix with rows (2 k) and (6 3) have no inverse?",
      "opts": ["k = 1", "k = 9", "k = 0", "k = 4"],
      "why": "det = 2×3 − 6k = 6 − 6k. There is no inverse when this is 0, so k = 1. The value k = 9 does not give 0, since 6 − 54 = −48.",
      "clue": "Set the determinant equal to 0."
    }
  },
  "mat-sums-random-variables": {
    "title": "Sums of random variables",
    "card": [
      "Let X be a discrete random variable. X1 + X2 means two independent copies of X: two separate trials, added together. 2X means one trial, then doubled.",
      "Example: a spinner gives X = 1 or 3, each with probability 1/2. Doubling one spin gives 2X = 2 or 6, each with probability 1/2.",
      "Adding two spins gives the sums 1+1 = 2, 1+3 = 4, 3+1 = 4 and 3+3 = 6. So X1 + X2 is 2 with probability 1/4, 4 with probability 1/2 and 6 with probability 1/4.",
      "Both have a mean of 4, but the distributions differ. X1 + X2 can take the middle value 4, and 2X cannot. The sum is less likely to land on the extremes."
    ],
    "remember": "2X repeats one outcome. X1 + X2 combines two outcomes, so its distribution is different.",
    "a": {
      "q": "A fair coin scores X = 1 for heads and 0 for tails. It is tossed twice, independently. What is P(X1 + X2 = 1)?",
      "opts": ["1/2", "1/4", "1/3", "0"],
      "why": "A sum of 1 happens with heads then tails, or tails then heads. Each has probability 1/4, so the total is 1/2. The value 0 would be right for 2X, which can only be 0 or 2, but not for the sum of two tosses.",
      "clue": "Count the ways two tosses can add to 1."
    },
    "b": {
      "d": 3,
      "q": "A spinner scores 2 or 4, each with probability 1/2. Mia spins once and doubles the score. Sam spins twice and adds the scores. What is each person's chance of getting 8?",
      "opts": ["Mia 1/2, Sam 1/4", "Mia 1/4, Sam 1/2", "Mia 1/2, Sam 1/2", "Mia 1/4, Sam 1/4"],
      "why": "Mia gets 8 when her one spin is 4, which has probability 1/2. Sam needs 4 + 4, which has probability 1/2 × 1/2 = 1/4. The tempting answer of 1/2 for both treats adding two spins as the same as doubling one.",
      "clue": "Sam needs both spins to be the same high score."
    }
  },
  "mat-simulation-2": {
    "title": "Simulation",
    "card": [
      "A simulation uses random numbers to act out a chance process again and again. Each run is called a trial.",
      "First, decide how random digits stand for the outcomes. If a chance is 30%, let 3 of the 10 digits 0 to 9 stand for it, such as 0, 1 and 2.",
      "Then run many trials and count how often the event happens. Estimated probability = number of trials with the event ÷ total number of trials.",
      "Example: a bus is late 30% of the time. In 50 simulated days it is late on 14 days. The estimate is 14 ÷ 50 = 0.28. More trials usually give a more reliable estimate."
    ],
    "remember": "Assign digits to match the chances, run many trials, then divide the successes by the trials.",
    "a": {
      "q": "A shop's card reader fails 20% of the time. Which digit rule matches this for one random digit from 0 to 9?",
      "opts": [
        "Digits 0 and 1 mean a failure",
        "Digit 2 means a failure",
        "Digits 0 to 4 mean a failure",
        "Digits 0 to 8 mean a failure"
      ],
      "why": "Two of the ten digits give 2 ÷ 10 = 20%. Digit 2 alone gives 10%, and digits 0 to 4 give 50%.",
      "clue": "Count how many of the ten digits you need for 20%."
    },
    "b": {
      "d": 2,
      "q": "Priya simulates a free-throw shooter who scores 70% of the time. In 40 trials, she gets a score in 30 of them. What is her estimated probability of a score?",
      "opts": ["0.75", "0.70", "0.57", "1.33"],
      "why": "Estimate = 30 ÷ 40 = 0.75. It differs from 0.70 because simulations vary. Dividing 40 by 30 would give 1.33, which cannot be a probability.",
      "clue": "Divide the trials with the event by all the trials."
    }
  },
  "mat-sample-means-vary": {
    "title": "Sample means vary",
    "card": [
      "A sample is a group taken from a larger population. Its mean is found by adding the values and dividing by the number of values.",
      "Different samples contain different values, so their means usually differ, even when each sample is taken and worked out correctly. This is called sample variation.",
      "Example: two samples of 3 students have heights 160, 170, 180 and 165, 175, 185. The means are 510 ÷ 3 = 170 and 525 ÷ 3 = 175.",
      "Larger samples tend to have means that vary less from sample to sample. A single extreme value has less pull on a big sample."
    ],
    "remember": "Sample means usually differ from sample to sample, and larger samples tend to differ less.",
    "a": {
      "q": "Two correctly chosen random samples of 10 from the same population have different means. What does this show?",
      "opts": [
        "Sample means vary from one sample to the next",
        "One of the two samples was chosen wrongly",
        "The population mean changed between samples",
        "One of the means was calculated incorrectly"
      ],
      "why": "Each sample holds different values, so their means usually differ even when nothing has gone wrong. A difference does not mean a sample was chosen badly or a mean was worked out wrongly, and the population itself stays the same.",
      "clue": "Do two samples usually contain the same values?"
    },
    "b": {
      "d": 3,
      "q": "Sam takes many samples of 5 from a school's students, and Lee takes many samples of 50. Whose sample means will tend to vary less?",
      "opts": [
        "Lee's, because the samples are larger",
        "Sam's, because the samples are smaller",
        "Both the same, because the school is the same",
        "Sam's, because there are fewer values to add"
      ],
      "why": "A larger sample is less affected by any one extreme value, so Lee's means tend to stay closer together. Taking samples from the same school does not make the variation equal, because sample size still matters.",
      "clue": "Think about how much one extreme value matters in a big sample."
    }
  },
  "mat-distributions-sample-means": {
    "title": "Distributions of sample means",
    "card": [
      "Take many samples of the same size from one population. Find each sample's mean, then plot all the means on a dot plot or histogram. This shows the distribution of sample means.",
      "The spread of this plot shows how much the sample means vary.",
      "When the sample size is larger, the plot is narrower. The means bunch more tightly.",
      "Example: means of samples of 4 might range from 10 to 30. Means of samples of 40 from the same population might range from 18 to 22."
    ],
    "remember": "Plot many sample means to see their spread: bigger samples give a narrower plot.",
    "a": {
      "q": "What does each dot represent in a dot plot of sample means?",
      "opts": [
        "The mean of one sample",
        "One value from the population",
        "The size of one sample",
        "The mean of the whole population"
      ],
      "why": "Each dot is the mean of one sample. A single value from the population is not a sample mean. The sample size is the same for every dot.",
      "clue": "The plot is made after finding a mean for each sample."
    },
    "b": {
      "d": 3,
      "q": "Mia plots 100 means of samples of size 10. She repeats it with samples of size 100 from the same population. How will the second plot look?",
      "opts": [
        "Narrower, with means closer together",
        "Wider, with means further apart",
        "The same width, only shifted",
        "Narrower, because there are fewer samples"
      ],
      "why": "Larger samples give means that vary less, so the plot is narrower. The number of samples is 100 both times, so it is not the reason.",
      "clue": "Compare the sample size, not the number of samples."
    }
  },
  "mat-radians-arcs-segments": {
    "title": "Radians, arcs and segments",
    "card": [
      "One radian is the angle at the centre of a circle when the arc is as long as the radius. A half turn is π radians, so π radians = 180°.",
      "To change degrees to radians, multiply by π/180. To change radians to degrees, multiply by 180/π.",
      "With θ in radians, arc length = rθ and sector area = ½r²θ. These formulas only work when θ is in radians.",
      "A segment is a sector with its triangle removed. The triangle has area ½r² sin θ, so segment area = ½r²(θ − sin θ). Example: r = 6 and θ = π/3 give arc length 2π and sector area 6π."
    ],
    "remember": "Use radians in the formulas: arc = rθ, sector = ½r²θ, segment = sector − triangle.",
    "a": {
      "q": "A sector of a circle has radius 5 cm and centre angle 2 radians. What is its arc length?",
      "opts": ["10 cm", "25 cm", "5 cm", "20 cm"],
      "why": "Arc length = rθ = 5 × 2 = 10 cm. The value 25 comes from the sector area formula ½r²θ, which gives an area in cm², not a length.",
      "clue": "Multiply the radius by the angle in radians."
    },
    "b": {
      "d": 3,
      "q": "A circle has radius 4 cm. A chord cuts off a segment with centre angle π/2. What is the area of the segment?",
      "opts": ["4π − 8 cm²", "4π cm²", "8π − 8 cm²", "4π − 4 cm²"],
      "why": "Sector = ½ × 16 × π/2 = 4π. Triangle = ½ × 16 × sin(π/2) = 8. Segment = 4π − 8 cm². Choosing 4π gives the whole sector, which still includes the triangle.",
      "clue": "Take the triangle's area away from the sector's area."
    }
  },
  "mat-sine-cosine-rules-three": {
    "title": "Sine and cosine rules in three dimensions",
    "card": [
      "To solve a solid shape, find a flat triangle inside it. Draw that triangle on its own and label the sides and angles you know.",
      [
        "Cosine rule",
        "c² = a² + b² − 2ab cos C, where side c is opposite angle C. Use it when you know two sides and the angle between them, or all three sides."
      ],
      [
        "Sine rule",
        "a/sin A = b/sin B. Use it when you know a side and the angle opposite it, plus one more side or angle."
      ],
      "To find an angle from three sides, rearrange: cos C = (a² + b² − c²) ÷ (2ab). Example: sides 3, 4 and 5 give cos C = (9 + 16 − 25) ÷ 24 = 0, so C = 90°."
    ],
    "remember": "Pull a flat triangle out of the solid, then pick the sine or cosine rule to suit what you know.",
    "a": {
      "q": "Triangle ABC lies on one face of a box. AB = 5 m, AC = 7 m and angle BAC = 60°. What is BC?",
      "opts": ["√39 m", "√109 m", "√74 m", "12 m"],
      "why": "BC² = 25 + 49 − 2 × 5 × 7 × cos 60° = 74 − 35 = 39, so BC = √39 m. Adding 35 instead of taking it away gives √109, which is a sign error.",
      "clue": "The angle is between the two known sides."
    },
    "b": {
      "d": 3,
      "q": "In a pyramid, triangle PQR has PQ = 8 m, PR = 10 m and QR = 6 m. What is angle QPR, to one decimal place?",
      "opts": ["36.9°", "53.1°", "90.0°", "143.1°"],
      "why": "QR is opposite P, so cos P = (64 + 100 − 36) ÷ (2 × 8 × 10) = 128 ÷ 160 = 0.8 and P ≈ 36.9°. The angle 53.1° is the angle at R, found by using PQ as the opposite side instead of QR. Getting cos P = −0.8 from a sign error gives 143.1°.",
      "clue": "Which side is opposite angle P?"
    }
  },
  "mat-trigonometric-identities": {
    "title": "Compound and double angle formulas",
    "card": [
      "Sine: sin(A + B) = sin A cos B + cos A sin B, and sin(A − B) = sin A cos B − cos A sin B. The sign between the products matches the sign inside.",
      "Cosine: cos(A + B) = cos A cos B − sin A sin B, and cos(A − B) = cos A cos B + sin A sin B. The sign between the products is the opposite of the sign inside.",
      "Double angle formulas: sin 2A = 2 sin A cos A, and cos 2A = cos²A − sin²A. Also cos 2A = 2cos²A − 1 = 1 − 2sin²A.",
      "Exact values: sin 45° = cos 45° = √2/2, sin 30° = 1/2 and cos 30° = √3/2. Example: sin 75° = sin 45° cos 30° + cos 45° sin 30° = (√6 + √2)/4."
    ],
    "remember": "Split an angle into known angles. Sine keeps the sign inside, cosine flips it.",
    "a": {
      "q": "Angle A is acute and sin A = 3/5. What is sin 2A?",
      "opts": ["24/25", "7/25", "6/5", "12/25"],
      "why": "Since A is acute, cos A = 4/5. Then sin 2A = 2 × 3/5 × 4/5 = 24/25. The value 7/25 is cos 2A, which is a neighbouring formula.",
      "clue": "Find cos A first, using a 3, 4, 5 triangle."
    },
    "b": {
      "d": 3,
      "q": "Which is the exact value of cos 75°?",
      "opts": ["(√6 − √2)/4", "(√6 + √2)/4", "(√3 − 1)/4", "(√6 − √2)/2"],
      "why": "cos 75° = cos 45° cos 30° − sin 45° sin 30° = √6/4 − √2/4 = (√6 − √2)/4. The option with a plus sign is sin 75°, which comes from keeping the plus sign as the sine formula does.",
      "clue": "For cos(A + B), the sign between the products flips."
    }
  },
  "mat-matrices-as-transformations": {
    "title": "Matrices as transformations",
    "card": [
      "A 2 × 2 matrix can move every point (x, y) in the plane. Write the point as a column and multiply: [a b; c d] times (x, y) gives (ax + by, cx + dy).",
      "The first column of the matrix is where the point (1, 0) lands. The second column is where (0, 1) lands.",
      "Some common matrices: [k 0; 0 k] is a dilation by factor k from the origin. [1 0; 0 −1] reflects in the x-axis. [0 −1; 1 0] rotates 90° anticlockwise about the origin. [1 k; 0 1] is a shear that moves points parallel to the x-axis.",
      "Example: [2 0; 0 2] sends (3, 1) to (2×3 + 0×1, 0×3 + 2×1) = (6, 2). Every coordinate doubles."
    ],
    "remember": "Multiply the matrix by the point's column. The columns show where (1, 0) and (0, 1) go.",
    "a": {
      "q": "What does the matrix [1 0; 0 −1] do to the point (4, 3)?",
      "opts": ["Sends it to (4, −3)", "Sends it to (−4, 3)", "Sends it to (−4, −3)", "Sends it to (3, 4)"],
      "why": "The new point is (1×4 + 0×3, 0×4 + (−1)×3) = (4, −3). The x-value stays and the y-value changes sign, so this is a reflection in the x-axis. Reflection in the y-axis would give (−4, 3).",
      "clue": "Multiply each row of the matrix by the column (4, 3)."
    },
    "b": {
      "d": 3,
      "q": "A matrix sends (1, 0) to (0, 1) and (0, 1) to (−1, 0). Where does it send the point (2, 5)?",
      "opts": ["(−5, 2)", "(5, −2)", "(−2, 5)", "(2, −5)"],
      "why": "The columns are (0, 1) and (−1, 0), so the matrix is [0 −1; 1 0], a 90° anticlockwise rotation. Then (2, 5) goes to (0×2 + (−1)×5, 1×2 + 0×5) = (−5, 2). Putting the columns in as rows would give (5, −2).",
      "clue": "Where (1, 0) and (0, 1) land are the columns of the matrix."
    }
  },
  "mat-composition-inverse-transformations": {
    "title": "Composition and inverse transformations",
    "card": [
      "To do transformation A and then transformation B, multiply the matrices as BA. The matrix for the first transformation is written on the right, next to the point.",
      "Order matters. For A = [1 0; 0 −1] and B = [0 −1; 1 0], BA = [0 1; 1 0] but AB = [0 −1; −1 0]. Swapping the order can give a different result.",
      "The inverse of a matrix M is written M⁻¹. It undoes M, so M⁻¹M is the identity matrix [1 0; 0 1], which leaves every point unchanged.",
      "For [a b; c d], the inverse is 1/(ad − bc) × [d −b; −c a], when ad − bc is not 0. Example: the inverse of the dilation [2 0; 0 2] is 1/4 × [2 0; 0 2] = [1/2 0; 0 1/2], a dilation by 1/2."
    ],
    "remember": "Do A then B is BA. The inverse matrix undoes the transformation.",
    "a": {
      "q": "A = [1 0; 0 −1] reflects in the x-axis. B = [0 −1; 1 0] rotates 90° anticlockwise about the origin. Where does A then B send (1, 2)?",
      "opts": ["(2, 1)", "(−2, −1)", "(1, −2)", "(−2, 1)"],
      "why": "A then B is BA = [0 1; 1 0], which sends (1, 2) to (2, 1). Step by step, the reflection gives (1, −2) and the rotation then gives (2, 1). Doing B first, using AB, gives (−2, −1), which is the wrong order.",
      "clue": "The matrix closest to the point acts first."
    },
    "b": {
      "d": 2,
      "q": "M = [3 0; 0 5] stretches the plane. What is M⁻¹?",
      "opts": ["[1/3 0; 0 1/5]", "[−3 0; 0 −5]", "[5 0; 0 3]", "[1/5 0; 0 1/3]"],
      "why": "Here ad − bc = 15, so M⁻¹ = 1/15 × [5 0; 0 3] = [1/3 0; 0 1/5]. It undoes the stretch, so it scales x by 1/3 and y by 1/5. Swapping d and a without dividing by the 15 gives [5 0; 0 3], which is wrong.",
      "clue": "The inverse must undo the stretch of 3 in x and 5 in y."
    }
  },
  "mat-determinants-area": {
    "title": "Determinants and area",
    "card": [
      "For the matrix [a b; c d], the determinant is det = ad − bc.",
      "A transformation scales every area by the absolute value of the determinant. New area = |det| × old area.",
      "If det is negative, the shape is flipped over (its orientation reverses), and the area still scales by |det|. If det = 0, the plane collapses onto a line or a point.",
      "Example: [3 1; 2 2] has det = 3×2 − 1×2 = 4, so a triangle of area 5 becomes area 20. Rotations, reflections and shears have |det| = 1, so they keep areas the same, though a shear can change lengths."
    ],
    "remember": "Area scales by |ad − bc|. The sign of the determinant tells you whether the shape is flipped.",
    "a": {
      "q": "A matrix [4 1; 2 3] is applied to a shape of area 6. What is the area of the image?",
      "opts": ["60", "84", "72", "10"],
      "why": "det = 4×3 − 1×2 = 10, so the new area is 10 × 6 = 60. Adding instead of subtracting gives 14 and an area of 84, which uses the wrong formula.",
      "clue": "Work out ad − bc first, then multiply by the old area."
    },
    "b": {
      "d": 3,
      "q": "The matrix [1 2; 3 1] is applied to a square of area 4. What is the area of the image, and what happens to its orientation?",
      "opts": ["20, and it is flipped", "20, and it is not flipped", "−20, and it is flipped", "28, and it is flipped"],
      "why": "det = 1×1 − 2×3 = −5. Area scales by |−5| = 5, so the new area is 20. The negative sign means the orientation is reversed, but an area is never negative.",
      "clue": "Area uses the absolute value, but the sign still tells you about flipping."
    }
  },
  "mat-imaginary-unit": {
    "title": "The imaginary unit",
    "card": [
      "No real number squares to give a negative answer. So we define a new number i with i² = −1.",
      "Square roots of negative numbers can now be written using i. Split the root: √−9 = √9 × √−1 = 3i. Check: (3i)² = 9 × i² = −9.",
      "Both 3i and −3i square to −9. The √ sign means the root 3i, just as √9 means 3 and not −3.",
      "Powers of i repeat in a cycle of four: i¹ = i, i² = −1, i³ = −i, i⁴ = 1. Then i⁵ = i again."
    ],
    "remember": "i² = −1, so √−n = √n × i for n > 0.",
    "a": {
      "q": "Which expression equals √−16?",
      "opts": ["4i", "−4i", "4", "−4"],
      "why": "√−16 = √16 × √−1 = 4i. The option −4i also squares to −16, but the √ sign means the root 4i, just as √16 means 4. The option 4 ignores the negative sign, since 4² = 16, not −16.",
      "clue": "Split the root into √16 and √−1."
    },
    "b": {
      "d": 3,
      "q": "What is the value of i³ × i⁴?",
      "opts": ["−i", "i", "1", "−1"],
      "why": "i³ = −i and i⁴ = 1, so the product is −i × 1 = −i. Adding the powers gives i⁷, which is also −i, since i⁷ = i⁴ × i³. Taking i³ as i is a common slip.",
      "clue": "Write each power as a simple value first, using the cycle of four."
    }
  },
  "mat-arithmetic-with-complex-numbers": {
    "title": "Arithmetic with complex numbers",
    "card": [
      "A complex number has the form a + bi, where a is the real part and b is the imaginary part.",
      "To add or subtract, combine the real parts and the imaginary parts separately. (2 + 3i) + (4 − i) = 6 + 2i.",
      "To multiply, expand like binomials, then replace i² with −1.",
      "Example: (1 + 2i)(3 + i) = 3 + i + 6i + 2i² = 3 + 7i − 2 = 1 + 7i."
    ],
    "remember": "Treat i like a pronumeral, then replace i² with −1.",
    "a": {
      "q": "What is (5 − 2i) − (1 + 4i)?",
      "opts": ["4 − 6i", "4 + 2i", "6 − 6i", "4 − 2i"],
      "why": "Subtract the real parts: 5 − 1 = 4. Subtract the imaginary parts: −2 − 4 = −6. The option 4 + 2i comes from not subtracting the sign of the whole bracket.",
      "clue": "Subtract the whole bracket, including the sign of 4i."
    },
    "b": {
      "d": 3,
      "q": "What is (2 + 3i)(4 − i)?",
      "opts": ["11 + 10i", "5 + 10i", "8 + 3i", "11 + 14i"],
      "why": "Expand: 8 − 2i + 12i − 3i² = 8 + 10i + 3 = 11 + 10i. The option 5 + 10i comes from using i² = +1 and getting 8 − 3.",
      "clue": "The term −3i² becomes +3."
    }
  },
  "mat-conjugates-division": {
    "title": "Conjugates and division",
    "card": [
      "The conjugate of a + bi is a − bi. Only the sign of the imaginary part changes.",
      "A number times its conjugate is real: (a + bi)(a − bi) = a² + b².",
      "To divide, multiply the top and bottom by the conjugate of the denominator. This makes the denominator real.",
      "Example: 1/(2 + i) = (2 − i)/((2 + i)(2 − i)) = (2 − i)/5 = 2/5 − i/5."
    ],
    "remember": "To divide, multiply top and bottom by the denominator's conjugate.",
    "a": {
      "q": "What is (3 + 2i)(3 − 2i)?",
      "opts": ["13", "5", "9 − 4i", "9 + 4i"],
      "why": "A number times its conjugate is a² + b² = 9 + 4 = 13. The option 5 comes from a sign error, treating the result as a² − b².",
      "clue": "Expand it, then use i² = −1."
    },
    "b": {
      "d": 3,
      "q": "What is 5/(1 − 2i) in the form a + bi?",
      "opts": ["1 + 2i", "1 − 2i", "5 + 10i", "1/5 + 2i/5"],
      "why": "Multiply top and bottom by the conjugate 1 + 2i. The bottom becomes 1 + 4 = 5 and the top becomes 5 + 10i, so the result is 1 + 2i. The option 1 − 2i flips the sign of the imaginary part of this result, and 5 + 10i forgets to divide by 5.",
      "clue": "Multiply top and bottom by the conjugate of 1 − 2i."
    }
  },
  "mat-argand-plane": {
    "title": "The Argand plane",
    "card": [
      "A complex number z = a + bi has a real part a and an imaginary part b. Both a and b are ordinary real numbers.",
      "The Argand plane shows complex numbers as points. The horizontal axis is the real axis. The vertical axis is the imaginary axis.",
      "To plot z = a + bi, go a units along the real axis and b units up the imaginary axis. This gives the point (a, b).",
      "Example: 3 − 2i has real part 3 and imaginary part −2. It is plotted at (3, −2), which is 3 right and 2 down from the origin."
    ],
    "remember": "Real part goes across, imaginary part goes up: a + bi is the point (a, b).",
    "a": {
      "q": "At which point is the complex number −4 + 5i plotted on the Argand plane?",
      "opts": ["(−4, 5)", "(5, −4)", "(−4, 5i)", "(4, −5)"],
      "why": "The real part −4 gives the horizontal position and the imaginary part 5 gives the vertical position, so the point is (−4, 5). (5, −4) swaps the axes. The i is not part of the coordinate, because the imaginary part is the number 5.",
      "clue": "Real part first, then the number in front of i."
    },
    "b": {
      "d": 3,
      "q": "Zara plots the complex number 2i − 6 on an Argand plane. Where does it lie?",
      "opts": [
        "6 left of the origin and 2 up",
        "6 right of the origin and 2 up",
        "2 left of the origin and 6 up",
        "2 right of the origin and 6 down"
      ],
      "why": "Written as −6 + 2i, the real part is −6 and the imaginary part is 2. So the point is (−6, 2): 6 left and 2 up. Taking the first number written (2) as the real part swaps the axes and gives the tempting wrong answer.",
      "clue": "Rewrite it as a + bi before reading off the parts."
    }
  },
  "mat-modulus-argument": {
    "title": "Modulus and argument",
    "card": [
      "A complex number z = a + bi is plotted on the Argand plane as the point (a, b). The horizontal axis is real and the vertical axis is imaginary.",
      ["Modulus", "|z| is the distance from the origin to the point. |z| = √(a² + b²)."],
      [
        "Argument",
        "Arg z is the angle from the positive real axis to the line joining the origin to the point, with −π < Arg z ≤ π. Anticlockwise angles are positive and clockwise angles are negative, and adding or subtracting 2π brings an angle into the range."
      ],
      "Example: z = 1 − √3i. |z| = √(1 + 3) = 2. The point is in the fourth quadrant. Measured anticlockwise the angle is 5π/3, which is too big, so Arg z = 5π/3 − 2π = −π/3."
    ],
    "remember": "Modulus is the distance from the origin. Argument is the angle from the positive real axis, kept between −π and π.",
    "a": {
      "q": "What is the modulus of z = 3 − 4i?",
      "opts": ["5", "7", "25", "1"],
      "why": "|z| = √(3² + (−4)²) = √(9 + 16) = √25 = 5. Giving 25 is tempting, but that is the value before taking the square root.",
      "clue": "Use the distance formula from the origin, then take the root."
    },
    "b": {
      "d": 3,
      "q": "What is Arg z for z = −2i?",
      "opts": ["−π/2", "π/2", "3π/2", "π"],
      "why": "The point (0, −2) lies on the negative imaginary axis. Measured anticlockwise it is 3π/2, which is outside the range, so subtract 2π to get −π/2. That is the same as turning a quarter turn clockwise. The option π/2 is the positive imaginary axis.",
      "clue": "Which axis is the point on, and is the angle within −π to π?"
    }
  },
  "mat-polar-form": {
    "title": "Polar form",
    "card": [
      "Polar form writes a complex number as z = r cis θ, where r is the modulus and θ is the argument. cis θ means cos θ + i sin θ.",
      "To convert from a + bi, find r = √(a² + b²) and the angle θ from the position of the point. For example, 1 + i = √2 cis(π/4).",
      "To multiply, multiply the moduli and add the arguments: (r₁ cis θ₁)(r₂ cis θ₂) = r₁r₂ cis(θ₁ + θ₂). For example, (2 cis(π/6))(3 cis(π/3)) = 6 cis(π/2), which is 6i.",
      "The principal argument lies in the range −π < θ ≤ π. If a sum of arguments falls outside it, add or subtract 2π, which gives the same point. For example, cis(5π/4) = cis(−3π/4)."
    ],
    "remember": "Multiply the moduli, add the arguments, then add or subtract 2π if the angle leaves the range −π to π.",
    "a": {
      "q": "What is (4 cis(π/5))(2 cis(π/10)) in polar form?",
      "opts": ["8 cis(3π/10)", "8 cis(π/50)", "6 cis(3π/10)", "6 cis(π/50)"],
      "why": "Multiply the moduli: 4 × 2 = 8. Add the arguments: π/5 + π/10 = 2π/10 + π/10 = 3π/10. Adding the moduli or multiplying the arguments are the tempting mistakes.",
      "clue": "Moduli are multiplied. Arguments are added."
    },
    "b": {
      "d": 3,
      "q": "What is 3 cis(2π/3) × 2 cis(π/2) written with its argument in the range −π < θ ≤ π?",
      "opts": ["6 cis(−5π/6)", "6 cis(7π/6)", "5 cis(−5π/6)", "6 cis(π/6)"],
      "why": "The modulus is 3 × 2 = 6. The arguments add to 2π/3 + π/2 = 7π/6, which is above π, so subtract 2π to get −5π/6. The option 6 cis(7π/6) is the same number, but its argument is outside the range asked for.",
      "clue": "After adding, check whether the angle is bigger than π."
    }
  },
  "mat-solving-quadratics-over-complex": {
    "title": "Solving quadratics over the complex numbers",
    "card": [
      "The discriminant of ax² + bx + c is Δ = b² − 4ac. If Δ is negative, there are no real roots, but there are two complex roots.",
      "Use the quadratic formula: z = (−b ± √Δ) ÷ 2a. Write √(negative number) using i, where i² = −1. For example, √(−16) = 4i.",
      "The two roots are conjugates: they have the same real part and opposite imaginary parts, as in p + qi and p − qi. This holds when a, b and c are all real.",
      ["Example", "Solve z² − 4z + 13 = 0. Δ = 16 − 52 = −36, so √Δ = 6i. Then z = (4 ± 6i) ÷ 2 = 2 ± 3i."]
    ],
    "remember": "Negative discriminant: two complex roots, found with the formula, and they are conjugates.",
    "a": {
      "q": "Solve z² + 6z + 10 = 0. What are the roots?",
      "opts": ["−3 + i and −3 − i", "3 + i and 3 − i", "−3 + 2i and −3 − 2i", "−6 + i and −6 − i"],
      "why": "Δ = 36 − 40 = −4, so √Δ = 2i. Then z = (−6 ± 2i) ÷ 2 = −3 ± i. Using 3 ± i comes from dropping the sign of −b.",
      "clue": "Divide both parts of −b ± √Δ by 2a."
    },
    "b": {
      "d": 3,
      "q": "A quadratic with real coefficients has one root 5 − 2i. What is true of its other root?",
      "opts": ["It is 5 + 2i", "It is −5 + 2i", "It is 5 − 2i again", "It is a real number"],
      "why": "Real coefficients and a negative discriminant give conjugate roots, so the other root is 5 + 2i. Negating both parts, as in −5 + 2i, is not the conjugate: only the imaginary part changes sign.",
      "clue": "Only the sign of the imaginary part changes."
    }
  },
  "mat-regions-complex-plane": {
    "title": "Regions in the complex plane",
    "card": [
      "|z − w| is the distance between the points z and w. So |z − w| = r is a circle with centre w and radius r.",
      "|z − w| < r is the inside of that circle. |z − w| > r is the outside.",
      "|z − a| = |z − b| is the set of points equally far from a and b. It is a straight line, the perpendicular bisector of the segment joining them.",
      "Arg(z − w) = θ is a ray starting at w, at angle θ from the positive real direction. Re(z) = k is a vertical line and Im(z) = k is a horizontal line."
    ],
    "remember": "Read |z − w| as a distance from w, and Arg(z − w) as a direction from w.",
    "a": {
      "q": "What does |z − (2 + i)| = 3 describe on the Argand plane?",
      "opts": [
        "A circle with centre (2, 1) and radius 3",
        "A circle with centre (−2, −1) and radius 3",
        "A circle with centre (2, 1) and radius 9",
        "A line through (2, 1) at a gradient of 3"
      ],
      "why": "|z − w| = r is a circle with centre w, so the centre is 2 + i, which is (2, 1), and the radius is 3. The sign is not flipped: the centre is w, not −w.",
      "clue": "Read it as: the distance from z to 2 + i is 3."
    },
    "b": {
      "d": 3,
      "q": "Which description fits |z − 1| = |z + 3|?",
      "opts": [
        "The vertical line Re(z) = −1",
        "The vertical line Re(z) = 1",
        "The horizontal line Im(z) = −1",
        "A circle with centre −1 and radius 2"
      ],
      "why": "The equation says z is equally far from 1 and −3. The perpendicular bisector of those two points on the real axis is the vertical line through their midpoint, −1. The midpoint is not 1, which is only one of the points.",
      "clue": "Write |z + 3| as |z − (−3)|, then find the midpoint of 1 and −3."
    }
  },
  "mat-partial-fractions": {
    "title": "Partial fractions",
    "card": [
      "Partial fractions split one rational function into a sum of simpler fractions. First factorise the denominator. If the top has a lower degree than the bottom, no division is needed.",
      [
        "Linear factors",
        "Each different linear factor gets its own fraction with a constant on top. For (x − 1)(x + 2), write A/(x − 1) + B/(x + 2)."
      ],
      [
        "Quadratic factor",
        "A quadratic factor that cannot be factorised gets a linear top. For x² + 1, write (Cx + D)/(x² + 1)."
      ],
      "Add the parts over the common denominator, then equate coefficients of matching powers of x on each side. Example: 5/((x − 1)(x + 4)) = A/(x − 1) + B/(x + 4). So 5 = A(x + 4) + B(x − 1). The left has no x term, so A + B = 0. The constants give 4A − B = 5. So A = 1 and B = −1."
    ],
    "remember": "Factorise the bottom, give each factor a fraction with unknown tops, then equate coefficients.",
    "a": {
      "q": "Which is the correct form of the partial fractions for 7/((x − 2)(x + 3))?",
      "opts": ["A/(x − 2) + B/(x + 3)", "A/((x − 2)(x + 3))", "(Ax + B)/(x − 2) + C/(x + 3)", "A/(x − 2) × B/(x + 3)"],
      "why": "Each different linear factor gets its own fraction with a constant on top, and the parts are added. A linear top is only needed for a quadratic factor that cannot be factorised, and multiplying the parts would not split the fraction into a sum.",
      "clue": "Each linear factor gets a constant on top."
    },
    "b": {
      "d": 3,
      "q": "Write (3x + 7)/((x + 1)(x + 3)) as A/(x + 1) + B/(x + 3). What are A and B?",
      "opts": ["A = 2 and B = 1", "A = 1 and B = 2", "A = 2 and B = −1", "A = 3 and B = 7"],
      "why": "Equating gives 3x + 7 = A(x + 3) + B(x + 1). The x terms give A + B = 3 and the constants give 3A + B = 7, so A = 2 and B = 1. Swapping them fails: 1(x + 3) + 2(x + 1) = 3x + 5, not 3x + 7.",
      "clue": "Match the x terms on each side, then match the constants."
    }
  },
  "mat-reciprocal-functions-2": {
    "title": "Reciprocal functions",
    "card": [
      "The graph of y = 1/f(x) comes from the graph of y = f(x). Each y-value is replaced by its reciprocal, so a point (a, b) becomes (a, 1/b).",
      "Where f(x) = 0, the reciprocal is undefined. So y = 1/f(x) has a vertical asymptote at every x-intercept of f.",
      "Points where f(x) = 1 or f(x) = −1 stay on the graph, because 1/1 = 1 and 1/(−1) = −1. Where f is positive, 1/f is positive. Where f is negative, 1/f is negative.",
      "The reciprocal circular functions are sec x = 1/cos x, cosec x = 1/sin x and cot x = 1/tan x. Example: cos x = 0 at x = π/2, so sec x has a vertical asymptote at x = π/2."
    ],
    "remember": "Reciprocal graphs have a vertical asymptote wherever f(x) = 0.",
    "a": {
      "q": "The graph of y = f(x) crosses the x-axis at x = 3 and x = −2. What does y = 1/f(x) have at these x-values?",
      "opts": ["Vertical asymptotes", "x-intercepts", "Turning points", "Horizontal asymptotes"],
      "why": "At each x-intercept f(x) = 0, and 1/0 is undefined, so the graph has a vertical asymptote there. It does not have x-intercepts, because 1/f(x) is never 0 when f(x) is a finite number.",
      "clue": "What happens when you divide 1 by zero?"
    },
    "b": {
      "d": 3,
      "q": "Which equations give the vertical asymptotes of y = cosec x for 0 ≤ x ≤ 2π?",
      "opts": ["x = 0, x = π and x = 2π", "x = π/2 and x = 3π/2", "x = π/4 and x = 3π/4", "x = 0 and x = 2π only"],
      "why": "cosec x = 1/sin x, and sin x = 0 at x = 0, π and 2π. Those are the asymptotes. The values x = π/2 and 3π/2 are where cos x = 0, which gives the asymptotes of sec x, not cosec x.",
      "clue": "Find where sin x equals zero."
    }
  },
  "mat-inverse-circular-functions": {
    "title": "Inverse circular functions",
    "card": [
      "Sin, cos and tan repeat, so each is restricted to a domain where it is one-to-one before it can have an inverse. The inverse swaps domain and range, and its graph is the reflection of the restricted graph in y = x.",
      [
        "arcsin",
        "the inverse of sin x on [−π/2, π/2], so it has domain [−1, 1] and range [−π/2, π/2]. For example, arcsin(1/2) = π/6, because sin(π/6) = 1/2."
      ],
      ["arccos", "the inverse of cos x on [0, π]. It has domain [−1, 1] and range [0, π]."],
      ["arctan", "the inverse of tan x on (−π/2, π/2). It has domain all real numbers and range (−π/2, π/2)."]
    ],
    "remember": "Many angles share a sine, cosine or tangent. The inverse gives the one in its restricted range.",
    "a": {
      "q": "What is the exact value of arccos(0)?",
      "opts": ["π/2", "0", "π", "3π/2"],
      "why": "arccos(0) is the angle in [0, π] with cosine 0, which is π/2. The value 3π/2 also has cosine 0, but it lies outside the range [0, π].",
      "clue": "The answer must lie between 0 and π."
    },
    "b": {
      "d": 3,
      "q": "Which is the exact value of arcsin(−1/2)?",
      "opts": ["−π/6", "π/6", "11π/6", "−π/3"],
      "why": "The answer must lie in [−π/2, π/2], and sin(−π/6) = −1/2. The value 11π/6 also has sine −1/2, but it is outside the range of arcsin. The positive π/6 gives sine +1/2.",
      "clue": "Check which angles fall inside the range of arcsin."
    }
  },
  "mat-absolute-value-function": {
    "title": "The absolute value function",
    "card": [
      "The absolute value |x| is the distance of x from 0, so it is never negative. |x| = x when x ≥ 0, and |x| = −x when x < 0.",
      "The graph of y = |x| is a V with its vertex at (0, 0). The part of y = x below the x-axis is reflected above it.",
      "For y = |f(x)|, any part of the graph of f below the x-axis is reflected in the x-axis. Parts on or above the axis stay the same.",
      "Transformations apply as usual. y = |x − 2| + 3 is a V with its vertex moved to (2, 3). Example: |−5| = 5 and |5| = 5."
    ],
    "remember": "Absolute value makes outputs non-negative by flipping any negative part upwards.",
    "a": {
      "q": "What is the vertex of the graph of y = |x + 1| − 4?",
      "opts": ["(−1, −4)", "(1, −4)", "(−1, 4)", "(1, 4)"],
      "why": "Inside the bars, x + 1 = 0 when x = −1, so the vertex has x = −1. The −4 outside moves the graph down 4, giving (−1, −4). The sign inside the bars shifts the graph the opposite way to what it looks like.",
      "clue": "Find the x-value that makes the inside zero."
    },
    "b": {
      "d": 2,
      "q": "The graph of y = x − 3 is reflected using y = |x − 3|. What is the y-intercept?",
      "opts": ["3", "−3", "0", "1/3"],
      "why": "At x = 0, y = |0 − 3| = |−3| = 3. The value −3 is the y-intercept of y = x − 3, but the absolute value makes it positive.",
      "clue": "Substitute x = 0, then take the absolute value."
    }
  },
  "mat-collecting-data": {
    "title": "Collecting data",
    "card": [
      ["Survey", "asking people questions, such as how they travel to school. It collects what people say or choose."],
      ["Measurement", "using a tool to find a number, such as a height in cm or a time in seconds."],
      [
        "Observation",
        "watching and recording what happens, such as counting birds that land on a school oval in one hour."
      ],
      [
        "Biased sample",
        "a sample is the group you collect data from. If it leaves out some people or favours one type, it is biased and can give a wrong picture. Example: asking only the school netball team about favourite sports."
      ]
    ],
    "remember": "Choose the method to suit the data. A sample should fairly match the whole group.",
    "a": {
      "q": "A council worker wants to know how many people walk through a park between 12 pm and 1 pm. Which method fits best?",
      "opts": [
        "Observation, counting the people as they walk past",
        "Survey, asking people how often they visit parks",
        "Measurement, finding the width of the park path",
        "Biased sample, asking only people who own dogs"
      ],
      "why": "Counting people as they walk past is watching and recording what happens, so it is observation. A survey would record what people say about visits, not who actually walks through in that hour.",
      "clue": "Think about whether the worker needs answers, a tool reading, or a count of real events."
    },
    "b": {
      "d": 3,
      "q": "Jo wants to know the favourite lunch of all students at her school. She asks only the students in the canteen queue. Why might the results be wrong?",
      "opts": [
        "The sample leaves out students who do not use the canteen",
        "A survey cannot collect data about what people choose",
        "The answers were found with a tool instead of by asking",
        "The sample includes every student in the whole school"
      ],
      "why": "Students who bring lunch from home are left out, so the sample may not match the whole school. That makes it biased. A survey suits this question, since it collects what people choose, so the method is not the problem.",
      "clue": "Who is missing from the group Jo asked?"
    }
  },
  "mat-reading-tables-graphs": {
    "title": "Reading tables and graphs",
    "card": [
      "A table lists values in rows and columns. Find the row and the column you need, then read where they meet.",
      "On a bar graph or line graph, read the label on each axis first. Then follow the top of a bar, or a point on the line, across to the scale to find its value.",
      "A line graph shows a trend. A line going up means the values rise over time. A line going down means they fall. A flat line means no change.",
      "A pie chart shows parts of a whole. A bigger slice is a bigger share. Example: a pie chart of 200 students shows 25% walk to school. 25% of 200 = 50 students."
    ],
    "remember": "Read the labels and scale first, then find the value, trend or share.",
    "a": {
      "q": "A pie chart shows how 80 students get to school. The bus slice is 50%. How many students take the bus?",
      "opts": ["40 students", "50 students", "30 students", "160 students"],
      "why": "50% is one half, and half of 80 is 40. Choosing 50 reads the percentage as a number of students, but the chart shows a share of the 80.",
      "clue": "Find 50% of the whole group."
    },
    "b": {
      "d": 2,
      "q": "A line graph shows the weekly sales of Mia's café in Dubbo. Sales are $400 in week 1, $500 in week 2, $650 in week 3 and $600 in week 4. Between which two weeks did sales fall?",
      "opts": ["Week 3 to week 4", "Week 1 to week 2", "Week 2 to week 3", "Week 1 to week 4"],
      "why": "Sales went from $650 in week 3 to $600 in week 4, so the line goes down there. The other steps go up. Week 1 to week 4 is a rise overall, from $400 to $600.",
      "clue": "Look for where the line goes down."
    }
  },
  "mat-drawing-charts-graphs": {
    "title": "Drawing charts and graphs",
    "card": [
      [
        "Column graph",
        "Use it to compare separate groups, such as the number of students in each year level. Draw gaps between the columns."
      ],
      [
        "Line graph",
        "Use it to show how something changes over time, such as a temperature each month. Join the points with a line."
      ],
      [
        "Pie chart",
        "Use it to show how parts make up a whole, with a title and labelled slices. Each slice is a share of 360°: 1/4 of the whole is 1/4 × 360° = 90°."
      ],
      "Column and line graphs need a title, labels on both axes and an even scale, such as 0, 10, 20, 30. Use a table when exact values matter."
    ],
    "remember": "Match the graph to the data, then add a title and clear labels.",
    "a": {
      "q": "Which graph best shows a town's rainfall each month over one year?",
      "opts": [
        "A line graph with a title and labels",
        "A pie chart with a title and labels",
        "A column graph with no axis labels",
        "A table of values with no title"
      ],
      "why": "Rainfall each month is a change over time, so a labelled line graph suits it. A pie chart shows parts of a whole, and the monthly rainfall figures are not shares of a total that matter here. The other two are missing a title or labels.",
      "clue": "Think about change over time."
    },
    "b": {
      "d": 3,
      "q": "In a survey of 40 students, 10 chose bus to get to school. What angle is the bus slice on a pie chart?",
      "opts": ["90°", "10°", "40°", "144°"],
      "why": "The bus share is 10/40 = 1/4, and 1/4 × 360° = 90°. The answer 144° comes from wrongly using 40% as the share, since 0.4 × 360° = 144°. But 10 out of 40 is 25%, not 40%.",
      "clue": "Find the fraction of the whole, then take that share of 360°."
    }
  },
  "mat-misleading-graphs": {
    "title": "Misleading graphs",
    "card": [
      "A graph can show true numbers and still give the wrong picture. Check the axes, the scale and the pictures before you trust the shape.",
      [
        "Axis not at zero",
        "if the vertical axis starts above zero, the bottom of every column is cut off. A small difference then looks huge."
      ],
      [
        "Uneven scale",
        "the marks on an axis are evenly spaced, but the values jump unevenly, such as 0, 10, 20, 50. Equal distances then stand for unequal amounts, so a change can look faster or slower than it is."
      ],
      [
        "Unfair pictures",
        "if a picture is made twice as tall and also twice as wide, its area is 4 times bigger. Example: sales double from 10 to 20, but the picture looks 4 times as large."
      ]
    ],
    "remember": "Read the axis numbers first. Then ask if the shape matches the real change.",
    "a": {
      "q": "A column graph of phone sales starts its vertical axis at 90, not 0. Sales of 100 and 110 are shown. What is the effect?",
      "opts": [
        "The 110 column looks much more than 10% taller than 100",
        "The 110 column looks the same height as the 100 column",
        "The 110 column looks shorter than the 100 column",
        "The two sales figures are changed to different numbers"
      ],
      "why": "Starting at 90 cuts off the bottom of both columns. The columns look 10 and 20 tall, so the second looks double the first, not 10% taller. The sales numbers stay the same: only the picture changes.",
      "clue": "Compare the heights you see above the starting value."
    },
    "b": {
      "d": 3,
      "q": "Mia's café sold 10 cups on Monday and 20 on Tuesday. A graph shows each as a cup picture, with Tuesday's cup twice as tall and twice as wide. Why is this misleading?",
      "opts": [
        "Its area is 4 times bigger, so sales look 4 times bigger",
        "Its area is 2 times bigger, so sales look 2 times bigger",
        "Its width is bigger, so sales look smaller than Monday's",
        "Pictures can only be used when the axis starts at zero"
      ],
      "why": "Doubling both height and width makes the area 2 × 2 = 4 times as large. Sales only doubled, so the eye reads a bigger rise than the real one. The area is not 2 times bigger, because both measurements were doubled.",
      "clue": "Area depends on height and width together."
    }
  },
  "mat-wages-salaries-2": {
    "title": "Pay and payslips",
    "card": [
      ["Hourly pay", "Pay = hours worked × hourly rate. At $25 an hour, 6 hours pays 6 × 25 = $150."],
      [
        "Overtime and penalty rates",
        "Some hours are paid at a higher rate, such as overtime or a weekend shift. A rate of time and a half means rate × 1.5. Double time means rate × 2."
      ],
      [
        "Salary",
        "A salary is a fixed yearly amount. Pay for one period = yearly salary ÷ number of pay periods. A salary of $52 000 paid fortnightly gives 52 000 ÷ 26 = $2000 each fortnight."
      ],
      [
        "Payslip",
        "A payslip shows the pay period, hours and rates, gross pay (pay before anything is taken out), deductions and net pay (pay after deductions). Net pay = gross pay − deductions."
      ]
    ],
    "remember": "Pay is hours × rate, with a higher rate for penalty hours. Net pay is gross pay minus deductions.",
    "a": {
      "q": "Sam earns $20 an hour. On Sunday the rate is double time. How much does Sam earn for a 5 hour Sunday shift?",
      "opts": ["$200", "$100", "$120", "$40"],
      "why": "Double time means 20 × 2 = $40 an hour, so 5 hours pays 5 × 40 = $200. $100 is the answer if the double rate is forgotten.",
      "clue": "Work out the Sunday hourly rate first."
    },
    "b": {
      "d": 3,
      "q": "Priya's payslip shows gross pay of $1850 and deductions of $370 for the fortnight. What is her net pay?",
      "opts": ["$1480", "$2220", "$370", "$1850"],
      "why": "Net pay = gross pay − deductions = 1850 − 370 = $1480. Adding the deductions gives $2220, which mixes up the direction: deductions are taken out of gross pay.",
      "clue": "Net pay is what is left after deductions come out."
    }
  },
  "mat-banking-bills-borrowing": {
    "title": "Banking, bills and borrowing",
    "card": [
      [
        "Bank accounts",
        "A transaction account holds money for daily spending. A savings account holds money you do not plan to spend soon, and it usually pays interest."
      ],
      [
        "Card payments",
        "A debit card takes money straight from your account. A credit card lends you money, and you must pay it back to the card company."
      ],
      [
        "Bills",
        "A bill is money you owe for a service, such as power or phone. Paying after the due date can add a late fee, so check the date."
      ],
      [
        "Borrowing",
        "When you borrow, you usually repay more than you borrowed, and the extra is the cost of borrowing. Example: borrow $500 and repay $550 in total, so the cost is $550 − $500 = $50."
      ]
    ],
    "remember": "Cost of borrowing = total repaid − amount borrowed. It is usually more than zero.",
    "a": {
      "q": "Tom pays for a $40 meal with his debit card. What happens?",
      "opts": [
        "$40 is taken from his account straight away",
        "He borrows $40 and repays the bank later",
        "$40 is added to his savings account interest",
        "He is given 30 days before paying $40"
      ],
      "why": "A debit card takes money directly from the account. The credit card is the one that lends money, so the idea of borrowing and repaying later is wrong for a debit card.",
      "clue": "Debit and credit cards work differently."
    },
    "b": {
      "d": 2,
      "q": "Priya borrows $2000 for a laptop. She repays $2300 in total. What did the borrowing cost her?",
      "opts": ["$300", "$2000", "$2300", "$4300"],
      "why": "The cost is the total repaid minus the amount borrowed: $2300 − $2000 = $300. Choosing $2300 gives the total repaid, not the extra cost.",
      "clue": "Subtract what she borrowed from what she repaid."
    }
  },
  "mat-tax-superannuation": {
    "title": "Tax and superannuation",
    "card": [
      [
        "Income tax",
        "Income tax is taken out of pay and sent to the government. Here it is shown as one percentage of pay, a simplification: in real life income above a tax-free amount is taxed at rates that rise as income rises."
      ],
      [
        "Superannuation",
        "Super is money an employer pays into a fund for the worker's retirement. It is a share of earnings set by law, 12% from 1 July 2025, paid on top of wages, not taken out of them."
      ],
      "Take-home pay = pay − tax. Super goes straight into the fund, so it is not part of take-home pay and is not subtracted from it.",
      "Example: Sam earns $1000 in a week, with a simple tax rate of 20%. Tax = 0.2 × 1000 = $200, so take-home pay is $800. Super = 0.12 × 1000 = $120, paid into Sam's fund."
    ],
    "remember": "Tax is taken out of pay. Super is paid in addition by the employer, and both are a share of earnings.",
    "a": {
      "q": "Lena earns $800 in a week. Her tax is 25% of her pay. What is her take-home pay?",
      "opts": ["$600", "$200", "$1000", "$775"],
      "why": "Tax = 0.25 × 800 = $200, and take-home pay = 800 − 200 = $600. The $200 is the tax taken out, not what Lena keeps.",
      "clue": "Find the tax first, then take it away from the pay."
    },
    "b": {
      "d": 3,
      "q": "Omar earns $2000 a fortnight. His tax is 15% of his pay. His employer pays super of 12% of his pay into a fund. How much does Omar take home?",
      "opts": ["$1700", "$1460", "$1760", "$1940"],
      "why": "Tax = 0.15 × 2000 = $300, so take-home pay = 2000 − 300 = $1700. The super of 0.12 × 2000 = $240 is paid by the employer on top of wages, so subtracting it as well to get $1460 is wrong.",
      "clue": "Does the super come out of Omar's pay?"
    }
  },
  "mat-tax-community": {
    "title": "Tax and the community",
    "card": [
      "Tax is money that people and businesses pay to governments. Governments use it to pay for shared services that most people use, such as roads, schools and hospitals.",
      [
        "Local",
        "councils collect rates, which are based on property. They spend on local roads, parks, libraries and rubbish collection."
      ],
      [
        "State",
        "state governments collect taxes such as stamp duty on property sales. They spend on public schools, public hospitals and public transport."
      ],
      [
        "Federal",
        "the federal government collects the most tax, including income tax and GST. It spends on services such as Medicare, the age pension and defence."
      ]
    ],
    "remember": "Taxes are collected by three levels of government and spent on services we share.",
    "a": {
      "q": "Which of these is paid for by tax?",
      "opts": [
        "A public hospital",
        "A holiday at a private resort",
        "A takeaway meal bought from a shop",
        "A phone bought online from a retailer"
      ],
      "why": "Public hospitals are shared services that governments fund from tax. The other three are bought by people with their own money, and they are not shared services run by a government.",
      "clue": "Think of a service that many people share."
    },
    "b": {
      "d": 2,
      "q": "Priya pays rates on her house in Ballarat. Which level of government collects them, and what is a likely use?",
      "opts": [
        "Local council, to maintain local roads",
        "Federal government, to pay the age pension",
        "State government, to run public hospitals",
        "Local council, to pay for Medicare"
      ],
      "why": "Rates are collected by local councils and spent on local services such as roads. The age pension is a federal service and public hospitals are a state service, but neither of those governments collects rates. Medicare is a federal service, so councils do not pay for it.",
      "clue": "Rates are based on property, and the money stays local."
    }
  },
  "mat-simple-interest-everyday-life": {
    "title": "Fees and interest",
    "card": [
      "Fees add to what you pay. An account fee is charged for keeping an account, often each month. A late fee is charged when a bill is paid after its due date.",
      "Interest is the cost of borrowing money. Simple interest is worked out on the original amount only. I = P × r × t, where P is the amount, r is the yearly rate as a decimal, and t is the time in years.",
      "Worked example: borrow $2000 at 6% per year for 3 years. I = 2000 × 0.06 × 3 = $360. The total to repay is 2000 + 360 = $2360.",
      "If the time is in months, change it to years first. 6 months is 6 ÷ 12 = 0.5 years."
    ],
    "remember": "Fees and interest add to the cost. Simple interest = amount × rate × time in years.",
    "a": {
      "q": "Sam borrows $1500 at 4% simple interest per year for 2 years. How much interest does he pay?",
      "opts": ["$120", "$60", "$1200", "$1620"],
      "why": "I = 1500 × 0.04 × 2 = $120. The answer $60 is for one year only, because the time was left out. $1200 comes from writing 4% as 0.4, and $1620 is the total to repay, not the interest.",
      "clue": "Change 4% to a decimal, then multiply all three numbers."
    },
    "b": {
      "d": 3,
      "q": "Priya borrows $3000 at 5% simple interest per year for 18 months. What is the total she must repay?",
      "opts": ["$3225", "$3150", "$5700", "$225"],
      "why": "18 months is 18 ÷ 12 = 1.5 years. I = 3000 × 0.05 × 1.5 = $225, so the total is 3000 + 225 = $3225. $3150 comes from using 1 year, $5700 from using 18 as the time, and $225 is the interest only, not the total.",
      "clue": "Turn 18 months into years, then add the interest to the amount."
    }
  },
  "mat-discounts-mark-ups": {
    "title": "Discounts and mark-ups",
    "card": [
      [
        "Discount",
        "A discount lowers a price. For a 20% discount, the new price is 100% − 20% = 80% of the old price, so multiply by 0.8."
      ],
      [
        "Mark-up",
        "A mark-up raises a price. For a 20% mark-up, the new price is 100% + 20% = 120% of the old price, so multiply by 1.2."
      ],
      "To find the multiplier, turn the percentage into a decimal. Subtract it from 1 for a discount. Add it to 1 for a mark-up.",
      "Example: a $50 jacket with a 20% discount costs 50 × 0.8 = $40. A $50 item with a 20% mark-up sells for 50 × 1.2 = $60."
    ],
    "remember": "Discount: multiply by 1 minus the rate. Mark-up: multiply by 1 plus the rate.",
    "a": {
      "q": "Which multiplier gives the new price after a 15% discount?",
      "opts": ["0.85", "0.15", "1.15", "0.75"],
      "why": "A 15% discount leaves 100% − 15% = 85% of the price, so the multiplier is 0.85. The multiplier 1.15 is for a 15% mark-up, which raises the price instead.",
      "clue": "A discount takes the rate away from 1."
    },
    "b": {
      "d": 2,
      "q": "Sam buys mugs for $12 each and sells them with a 25% mark-up. What is the selling price of one mug?",
      "opts": ["$15", "$9", "$13", "$12.25"],
      "why": "A 25% mark-up means multiplying by 1.25, so 12 × 1.25 = $15. Adding only $0.25 mixes up the percentage with a dollar amount, which gives the wrong price.",
      "clue": "Add the rate to 1 to get the multiplier."
    }
  },
  "mat-units-converting": {
    "title": "Units and converting",
    "card": [
      "Length: 10 mm = 1 cm, 100 cm = 1 m, 1000 m = 1 km. Mass: 1000 g = 1 kg. Capacity: 1000 mL = 1 L.",
      "To change to a smaller unit, multiply. There are more of the small units. To change to a larger unit, divide.",
      "Check that the answer makes sense. A smaller unit gives a bigger number, and a larger unit gives a smaller number.",
      ["Example", "3.5 kg to g: kg is the larger unit, so multiply by 1000. 3.5 × 1000 = 3500 g."]
    ],
    "remember": "Larger to smaller unit: multiply. Smaller to larger unit: divide.",
    "a": {
      "q": "A ribbon is 2.4 m long. How long is it in centimetres?",
      "opts": ["240 cm", "24 cm", "2400 cm", "0.024 cm"],
      "why": "A centimetre is smaller than a metre, so multiply by 100: 2.4 × 100 = 240 cm. Multiplying by 10 gives 24 cm, but there are 100 cm in 1 m, not 10.",
      "clue": "How many centimetres are in 1 m?"
    },
    "b": {
      "d": 3,
      "q": "Priya runs 850 m each morning. How many kilometres does she run in 4 mornings?",
      "opts": ["3.4 km", "34 km", "0.34 km", "3400 km"],
      "why": "In 4 mornings she runs 850 × 4 = 3400 m. Metres to kilometres means divide by 1000, so 3400 ÷ 1000 = 3.4 km. Dividing by 100 instead gives 34 km, but there are 1000 m in 1 km, not 100.",
      "clue": "Find the total in metres first, then change the unit."
    }
  },
  "mat-reading-scales": {
    "title": "Reading scales",
    "card": [
      "First find what each small mark is worth. Pick two marked numbers next to each other, find the gap between them, then divide by the number of spaces.",
      "Read the scale at the mark the pointer or liquid is closest to. Give the answer to the nearest marked unit.",
      "For a jug, read at eye level, at the flat top of the liquid. Always include the unit, such as mL, °C or kg.",
      [
        "Example",
        "The marks 0 and 100 mL have 5 spaces between them. Each space is 100 ÷ 5 = 20 mL. The third mark after 0 reads 60 mL."
      ]
    ],
    "remember": "Work out what each small mark is worth before you read the value.",
    "a": {
      "q": "On a jug, the marks 200 mL and 300 mL have 4 equal spaces between them. What does each small mark count for?",
      "opts": ["25 mL", "20 mL", "4 mL", "100 mL"],
      "why": "The gap is 300 − 200 = 100 mL, shared over 4 spaces: 100 ÷ 4 = 25 mL. Using 20 mL would mean dividing by 5, which is the number of marks, not the number of spaces.",
      "clue": "Divide the gap between the numbers by the number of spaces."
    },
    "b": {
      "d": 3,
      "q": "A thermometer is marked every 2 °C. The 20 °C mark is labelled, and the liquid ends one small mark above 20 °C. What is the reading?",
      "opts": ["22 °C", "21 °C", "20 °C", "24 °C"],
      "why": "Each small mark is worth 2 °C, so one mark above 20 °C is 22 °C. Reading 21 °C treats each mark as 1 °C, which the scale does not show.",
      "clue": "What is each small mark worth on this scale?"
    }
  },
  "mat-time-timetables": {
    "title": "Time and timetables",
    "card": [
      "24-hour time runs from 0000 (midnight) to 2359. Times from 1:00 am to 12:59 pm keep their hour: 7:40 am is 0740 and 12:30 pm is 1230.",
      "From 1:00 pm onwards, add 12 to the hour: 3:15 pm is 1515 and 11:20 pm is 2320.",
      "For a time difference, count up to the next whole hour, then add whole hours and leftover minutes, as 1 hour is 60 minutes, not 100. From 1445 to 1710: 15 min + 2 h + 10 min = 2 h 25 min.",
      "In a timetable, read across the row for your stop and down the column for your service. If you change services, check you reach the changeover stop before your connecting service leaves."
    ],
    "remember": "An hour has 60 minutes, so count up through the hours instead of subtracting times like ordinary numbers.",
    "a": {
      "q": "What is 7:40 pm in 24-hour time?",
      "opts": ["1940", "0740", "1840", "1960"],
      "why": "7:40 pm is after 1:00 pm, so add 12 to the hour: 7 + 12 = 19, giving 1940. 0740 is 7:40 am, and 1960 cannot be a time, as minutes only go up to 59.",
      "clue": "Is 7:40 pm before or after 1:00 pm?"
    },
    "b": {
      "d": 3,
      "q": "A train leaves Ballarat at 0955 and arrives in Melbourne at 1138. How long is the trip?",
      "opts": ["1 h 43 min", "2 h 17 min", "1 h 83 min", "1 h 17 min"],
      "why": "0955 to 1000 is 5 min, 1000 to 1100 is 1 h, and 1100 to 1138 is 38 min, which makes 1 h 43 min. Taking 1138 − 0955 as ordinary numbers gives 183, which wrongly reads as 1 h 83 min.",
      "clue": "Count up to 1000 first, then add the hours and minutes."
    }
  },
  "mat-graphing-linear-relations": {
    "title": "Graphing linear relations",
    "card": [
      "A linear rule such as C = 20 + 5n gives a straight line when plotted. Put n on the horizontal axis and C on the vertical axis.",
      [
        "Start",
        "the fixed amount, where the line meets the vertical axis (n = 0). In C = 20 + 5n, the line starts at 20."
      ],
      [
        "Steepness",
        "the rate, which is how much the vertical value changes for each 1 step across. In C = 20 + 5n, C rises by 5 for each 1 more n, and a bigger rate gives a steeper line."
      ],
      "To plot, find two points. At n = 0, C = 20. At n = 4, C = 20 + 5 × 4 = 40. Mark (0, 20) and (4, 40), then join them with a straight line."
    ],
    "remember": "The start is where the line crosses the vertical axis. The rate is how much it rises for each 1 step across.",
    "a": {
      "q": "A taxi fare is F = 4 + 3d, where d is the distance in km. What does the graph of F against d look like?",
      "opts": [
        "A straight line starting at 4 and rising 3 for each 1 km",
        "A straight line starting at 3 and rising 4 for each 1 km",
        "A straight line starting at 0 and rising 7 for each 1 km",
        "A straight line starting at 4 and rising 3 for each 3 km"
      ],
      "why": "The fixed amount 4 is the start, and the rate 3 is the rise for each 1 km across. The line starting at 3 and rising 4 swaps the start and the rate, which is a common mistake.",
      "clue": "The start is the value when d = 0."
    },
    "b": {
      "d": 3,
      "q": "Ben hires a bike for C = 10 + 6h dollars, where h is the hours. He plots C against h. What is the value of C at h = 3 on his line?",
      "opts": ["28", "18", "48", "19"],
      "why": "At h = 3, C = 10 + 6 × 3 = 10 + 18 = 28. Choosing 18 leaves out the fixed 10, and 48 adds 10 and 6 first, then multiplies by 3, so the fixed part is wrongly tripled.",
      "clue": "Multiply the rate by h first, then add the start."
    }
  },
  "mat-significant-figures-rounding": {
    "title": "Significant figures and rounding",
    "card": [
      "Significant figures (sf) are counted from the first non-zero digit, so leading zeros never count. 0.004 706 has 4 sf: 4, 7, 0, 6. The zero between 7 and 6 counts.",
      "To round, find the last digit you keep and look at the next digit. If it is 5 or more, round up. If it is 4 or less, leave the last digit as it is.",
      "Decimal places (dp) count every digit after the decimal point, zeros included, so 0.004 706 has 6 dp. Use dp when the job needs a fixed unit, such as 2 dp for dollars and cents.",
      "Example: 38 462 to 2 sf. The first two digits are 3 and 8. The next digit is 4, so we do not round up: 38 000. These zeros only hold place value, so they are not significant."
    ],
    "remember": "Count sf from the first non-zero digit. Look one digit past where you stop.",
    "a": {
      "q": "What is 0.07382 rounded to 2 significant figures?",
      "opts": ["0.074", "0.07", "0.0738", "0.073"],
      "why": "The first sf is 7, so the two sf are 7 and 3. The next digit is 8, so round the 3 up to 4, giving 0.074. The answer 0.073 forgets to round up.",
      "clue": "Start counting at the first non-zero digit."
    },
    "b": {
      "d": 3,
      "q": "A tile measures 2.0496 m long. What is this to 3 significant figures?",
      "opts": ["2.05 m", "2.04 m", "2.050 m", "2.0 m"],
      "why": "The three sf are 2, 0 and 4, and the next digit is 9, so the 4 rounds up to 5. This gives 2.05 m. The answer 2.04 m cuts off the number without rounding. The answer 2.050 m has 4 sf.",
      "clue": "A zero between two non-zero digits counts."
    }
  },
  "mat-quick-estimates": {
    "title": "Quick estimates",
    "card": [
      [
        "Leading digit",
        "round each number to its first digit, then work with those. For 6.8 × 31, think 7 × 30 = 210."
      ],
      [
        "Interval",
        "give a low and a high value that the answer must sit between. Round the numbers down for the low value and up for the high value."
      ],
      [
        "Ceiling",
        "round up to the next whole unit. Use it when a part unit still needs a whole one, such as buses or boxes."
      ],
      [
        "Floor",
        "round down to the whole unit. Use it when only complete units count, such as full packs you can fill."
      ]
    ],
    "remember": "Round simply to estimate. Round up when you need enough, down when only whole ones count.",
    "a": {
      "q": "Which is the best leading-digit estimate of 48 × 21?",
      "opts": ["1000", "800", "1200", "500"],
      "why": "Round 48 to 50 and 21 to 20. Then 50 × 20 = 1000. The answer 800 would come from rounding 48 down to 40, which is too rough.",
      "clue": "Round each number to one digit followed by zeros."
    },
    "b": {
      "d": 2,
      "q": "Mia needs to move 130 students in vans that each hold 12. How many vans does she need?",
      "opts": ["11", "10", "12", "130"],
      "why": "130 ÷ 12 is about 10.83. Ten vans seat only 120, so 10 students would be left behind. Round up to 11, as the ceiling gives. The answer 10 rounds down.",
      "clue": "Would a part-full van still be needed?"
    }
  },
  "mat-percentage-error": {
    "title": "Percentage error",
    "card": [
      "Error = estimate − true value. Ignore the sign to find the size of the error: it is the gap between the two.",
      "Percentage error = error ÷ true value × 100%. Always divide by the true value, not by the estimate.",
      "A small percentage error means the estimate is close to the true value. The same error matters more when the true value is small.",
      "Example: you estimate 45 people, and the true number is 50. The error is 5, so 5 ÷ 50 × 100% = 10%."
    ],
    "remember": "Divide the size of the error by the true value, then multiply by 100.",
    "a": {
      "q": "Sam measures a board as 2.4 m. Its true length is 2.5 m. What is the percentage error?",
      "opts": ["4%", "4.17%", "0.1%", "10%"],
      "why": "The error is 0.1 m. Then 0.1 ÷ 2.5 × 100% = 4%. The answer 4.17% divides by the estimate 2.4 instead of the true value.",
      "clue": "Which number goes on the bottom of the fraction?"
    },
    "b": {
      "d": 3,
      "q": "A crowd is estimated at 1200. The true count is 1000. What is the percentage error?",
      "opts": ["20%", "16.7%", "200%", "2%"],
      "why": "The error is 1200 − 1000 = 200. Then 200 ÷ 1000 × 100% = 20%. The answer 16.7% divides by the estimate 1200 instead of the true value.",
      "clue": "The true value is the number that was actually counted."
    }
  },
  "mat-planning-data-collection": {
    "title": "Planning data collection",
    "card": [
      "Start with the purpose: the question you want to answer. The purpose decides what data to collect, from whom and how.",
      "Collect from the people or things the question is about. Example: to learn how people travel to the pool, ask pool visitors, not only people at a bus stop.",
      "Choose a method that suits the data, such as a survey, an interview or counting records. Numbers like age or cost suit a survey or records.",
      "Think about the audience, the people who will read the results. The planner chooses how simple the data and its display should be with them in mind, such as plain graphs for the public."
    ],
    "remember": "Plan from the purpose: what to collect, from whom, how, and for which audience.",
    "a": {
      "q": "A gym wants to know why members cancel. What is the best group to collect data from?",
      "opts": [
        "Members who have recently cancelled",
        "Members who visit the gym every day",
        "People walking past the gym",
        "The gym's newest staff members"
      ],
      "why": "The question is about members who cancel, so the data must come from people who cancelled. Daily visitors are members, but they are unlikely to be the ones leaving, so they cannot explain cancelling.",
      "clue": "Who has actually done the thing you are asking about?"
    },
    "b": {
      "d": 3,
      "q": "Priya runs a café in Geelong. She wants to know which new menu items her customers would buy. What is the best plan?",
      "opts": [
        "Ask café customers to rate the new items after tasting",
        "Ask her friends to guess which items would sell",
        "Count the total daily sales of the existing menu",
        "Ask people in a shopping centre about their favourite foods"
      ],
      "why": "The purpose is customers' views on the new items, so she should ask her own customers, and tasting gives them a real basis to rate. Existing sales say nothing about items not yet on the menu, so that option does not match the purpose.",
      "clue": "Match the group and the data to the question being asked."
    }
  },
  "mat-statistical-claims": {
    "title": "Statistical claims",
    "card": [
      "A statistical claim is only as good as the data behind it. Ask who collected the data, how they collected it and how many people or items it covers.",
      "Check who is in the sample. If it leaves out part of the group the claim is about, or only includes people who chose to reply, the result may be biased. A very small sample can also give a result that does not hold for the whole group.",
      "Look for errors and misleading uses. If a graph's vertical axis does not start at zero, each bar shows only the part above the starting value, so a small gap can look huge. A percentage with no sample size, or a claim that one thing caused another when the data only shows they happen together, is also misleading.",
      "For example, a gym says 90% of members love its classes, but it asked only 10 members, all leaving a class. The sample is small and the people were not chosen fairly, so the claim is weak."
    ],
    "remember": "Before trusting a claim, check the sample, the numbers and how the graph is drawn.",
    "a": {
      "q": "A shop claims 80% of customers prefer its brand. It asked 5 people standing at its own checkout. Why is the claim weak?",
      "opts": [
        "The sample is tiny and likely to favour the shop's brand",
        "The sample is tiny, but 80% of 5 people is not possible",
        "The sample is fair, but 80% is too high a result to trust",
        "The sample is fair, but the result needs a graph to count"
      ],
      "why": "Five people already buying at the checkout is a tiny sample that is likely to favour the brand. The arithmetic is fine, since 80% of 5 is 4 people. A high percentage is not a fault by itself, and a claim does not need a graph to count.",
      "clue": "Ask whether the sample is large enough and whether it was chosen fairly."
    },
    "b": {
      "d": 3,
      "q": "A graph shows a town's bike sales rising from 520 to 540, yet the second bar looks twice as tall as the first. What is the most likely cause?",
      "opts": [
        "The vertical axis starts at 500, not at zero",
        "Sales doubled, so the bars are drawn correctly",
        "The axis starts at zero but uses steps of 20",
        "Bars always exaggerate change compared with lines"
      ],
      "why": "Measured from 500, the bars are 20 and 40 units tall, so the second looks twice as tall. Sales did not double: 540 is only about 4% more than 520. An axis from zero would make the bars almost the same height.",
      "clue": "Bar height shows the distance above the axis's starting value."
    }
  },
  "mat-two-way-tables-context": {
    "title": "Tables and spreadsheets",
    "card": [
      "A table organises data in rows and columns. Give each column a clear heading, and keep one kind of data in each column, with the unit in the heading.",
      "A spreadsheet is a table on a computer. Each box is a cell, named by its column letter and row number, so B3 is column B, row 3. A formula starts with = and works out a value from other cells, such as =B2+B3.",
      [
        "Two-way table",
        "a table that sorts people by two categories at once. One category runs down the rows and the other across the columns. Each cell counts the people in both."
      ],
      "Add row totals and column totals. Example: 30 students, 18 in Year 11 and 12 in Year 12. If 10 of the 18 Year 11 students walk to school, then 8 of them do not. The row and column totals must add to the grand total of 30."
    ],
    "remember": "Put one kind of data in each column. In a two-way table, rows and columns must add to the totals.",
    "a": {
      "q": "In a spreadsheet, cell B2 holds 15 and cell B3 holds 9. What value does the formula =B2+B3 give?",
      "opts": ["24", "159", "6", "135"],
      "why": "The formula adds the values in the two cells: 15 + 9 = 24. Joining the digits to make 159 is tempting, but the formula adds numbers and does not write them side by side.",
      "clue": "A formula works with the values in the cells."
    },
    "b": {
      "d": 3,
      "q": "Of 40 people at a club, 25 are members and 15 are not. 18 of the members are adults. How many members are not adults?",
      "opts": ["7", "18", "22", "15"],
      "why": "The members row totals 25, so the members who are not adults number 25 − 18 = 7. The 15 is tempting, but that is the total of non-members, a different row of the table.",
      "clue": "Use the members row: its two cells must add to its total."
    }
  },
  "mat-modern-graph-types": {
    "title": "Modern graph types",
    "card": [
      [
        "Bubble chart",
        "Each bubble is one item, placed by two number values on the axes. The size of the bubble shows a third number. It suits comparing items on three measures at once."
      ],
      [
        "Radar chart",
        "Several measures for one item are drawn on spokes from a centre point, and joined to make a shape. It suits comparing the profile of a few items across the same measures."
      ],
      [
        "Heat map",
        "A grid of cells, where the colour of each cell shows its value. It suits spotting high and low values across two categories, such as day and hour."
      ],
      [
        "Others",
        "A sunburst uses rings to show parts inside parts. A Mekko chart has bars of varying width, so it shows two sizes at once. A stacked area chart shows how the parts of a total change over time."
      ]
    ],
    "remember": "Match the graph to the job: a third measure, a profile, a grid, parts in parts, two sizes, or parts over time.",
    "a": {
      "q": "A gym wants to show how busy it is for each day of the week and each hour of the day. Which graph suits this best?",
      "opts": ["Heat map", "Radar chart", "Bubble chart", "Sunburst chart"],
      "why": "A heat map uses a grid with day on one side and hour on the other, and colour shows how busy each cell is. A radar chart suits several measures for one item, not a grid of two categories.",
      "clue": "How many ways is each busy level sorted?"
    },
    "b": {
      "d": 3,
      "q": "A school wants to show how its sport, music and drama participation each changed from 2019 to 2024, with the total shown too. Which graph suits best?",
      "opts": ["Stacked area chart", "Radar chart", "Bubble chart", "Sunburst chart"],
      "why": "A stacked area chart shows how parts of a total change over time, and the top edge shows the total. A sunburst shows parts inside parts at one point in time, so it does not show change across years.",
      "clue": "What does the school want to see, and across what span?"
    }
  },
  "mat-comparing-groups-with-statistics": {
    "title": "Comparing groups with statistics",
    "card": [
      "To compare two groups, compare their centre and their spread. Centre is the median or mean. Spread is the range, the interquartile range (IQR) or the standard deviation.",
      "A higher median or mean means the typical value is higher. A larger standard deviation or IQR means the values are more spread out and less consistent.",
      "You can also compare the same percentile in each group. If the 90th percentile wage is $45 in Job A and $38 in Job B, then A pays more at the upper end.",
      "Example: Group A has a median of $30 and an IQR of $4. Group B has a median of $34 and an IQR of $12. B is typically higher, but A is more consistent."
    ],
    "remember": "Compare the centre first, then the spread, and state both in the context.",
    "a": {
      "q": "Two bakeries record daily sales. Bakery P has a median of $900 and an IQR of $100. Bakery Q has a median of $900 and an IQR of $400. Which is true?",
      "opts": [
        "Sales at P are more consistent than at Q",
        "Sales at Q are more consistent than at P",
        "Sales at P are typically higher than at Q",
        "Sales at Q are typically higher than at P"
      ],
      "why": "The medians are equal, so the typical sales are the same. P has the smaller IQR, so its sales are more tightly grouped and more consistent. A larger spread does not mean a higher centre.",
      "clue": "The medians match, so look at the spread."
    },
    "b": {
      "d": 3,
      "q": "Wages per hour: Job X has a mean of $32 and a standard deviation of $2. Job Y has a mean of $35 and a standard deviation of $9. Which statement is best supported?",
      "opts": [
        "Y pays more on average, but X wages vary less",
        "X pays more on average, and X wages vary less",
        "Y pays more on average, and Y wages vary less",
        "X pays more on average, but X wages vary more"
      ],
      "why": "Y has the higher mean, $35 against $32, so it pays more on average. X has the smaller standard deviation, so its wages are closer together. The tempting mistake is to think a larger standard deviation means a higher wage, but it only shows spread.",
      "clue": "Use the mean for the centre and the standard deviation for the spread."
    }
  },
  "mat-cumulative-frequency-percentiles": {
    "title": "Cumulative frequency and percentiles",
    "card": [
      "Cumulative frequency is a running total. For each value or class, add its frequency to all the frequencies before it. The last total equals the number of values.",
      "Example: Frequencies of 4, 6, 10 and 5 give cumulative frequencies of 4, 10, 20 and 25. So 20 of the 25 values are in the first three classes.",
      "A percentile shows where a value sits. The 40th percentile is the value with about 40% of the data at or below it.",
      "To find a percentile, work out that percentage of the total count, then read across to the value. In 25 values, the 40th percentile is near the 10th value, as 0.4 × 25 = 10."
    ],
    "remember": "Cumulative frequency counts values up to a point. A percentile turns that count into a percentage.",
    "a": {
      "q": "Frequencies for four classes are 3, 7, 12 and 8. What are the cumulative frequencies?",
      "opts": ["3, 10, 22, 30", "3, 7, 12, 8", "8, 20, 27, 30", "3, 10, 19, 27"],
      "why": "Add each frequency to the running total: 3, 3 + 7 = 10, 10 + 12 = 22, 22 + 8 = 30. The last total must equal the number of values. Repeating the frequencies adds nothing up.",
      "clue": "Each total includes every class before it."
    },
    "b": {
      "d": 2,
      "q": "A school records 80 swim times. Tia's time has 60 times at or below it. What is her percentile?",
      "opts": ["75th percentile", "60th percentile", "25th percentile", "80th percentile"],
      "why": "The percentile is 60 ÷ 80 × 100 = 75. So 75% of times are at or below hers. Using 60 itself ignores that the total is 80, not 100.",
      "clue": "Divide the count at or below by the total count."
    }
  },
  "mat-predicting-from-data": {
    "title": "Interpolation and extrapolation",
    "card": [
      "A line of best fit can be used to predict values. The range of the data runs from the smallest to the largest x-value in the data set.",
      [
        "Interpolation",
        "predicting for an x-value inside the range of the data. It is fairly reliable, because the line is built from data on both sides of that value."
      ],
      [
        "Extrapolation",
        "predicting for an x-value outside the range of the data. It is less reliable, because the pattern may not continue beyond the data."
      ],
      "Example: a line is fitted to data for x from 10 to 40. Predicting at x = 25 is interpolation. Predicting at x = 60 is extrapolation."
    ],
    "remember": "Inside the data range is interpolation and fairly reliable. Outside it is extrapolation and less reliable.",
    "a": {
      "q": "A line of best fit is fitted to data with x-values from 20 to 50. Which prediction is extrapolation?",
      "opts": ["Predicting y when x = 70", "Predicting y when x = 35", "Predicting y when x = 22", "Predicting y when x = 48"],
      "why": "The value x = 70 is outside the range of 20 to 50, so it is extrapolation. The values 22, 35 and 48 all lie inside the range, so they are interpolation, even 22 and 48, which sit close to the ends.",
      "clue": "Compare each x-value with the data the line was built from."
    },
    "b": {
      "d": 3,
      "q": "Dana records study time (2 to 10 hours) and test scores for 30 students. Her line of best fit predicts scores at 6 hours and at 14 hours. Which statement is correct?",
      "opts": [
        "The 6 hour prediction is more reliable than the 14 hour one",
        "The 14 hour prediction is more reliable than the 6 hour one",
        "Both predictions are equally reliable, as they use one line",
        "Neither prediction is reliable, as it is only an estimate"
      ],
      "why": "The value 6 hours is inside the range of 2 to 10, so it is interpolation and fairly reliable. The value 14 hours is outside the range, so it is extrapolation and less reliable, even though both use the same line.",
      "clue": "Which prediction has data on both sides of it?"
    }
  },
  "mat-credit-cards-buy-now": {
    "title": "Credit and debit",
    "card": [
      [
        "Debit",
        "You spend your own money from your bank account. You usually cannot spend more than you have, and going overdrawn can bring fees."
      ],
      [
        "Credit",
        "You borrow money from a lender to pay now, then repay it later. Lenders include banks, credit card providers and buy now pay later (BNPL) companies."
      ],
      [
        "Costs",
        "A credit card charges interest on the amount not paid by the due date. The interest is a percentage of that unpaid amount. Missed payments on cards or BNPL can also bring late fees."
      ],
      [
        "Example",
        "Ben buys a $400 jacket on his credit card and pays $100 by the due date. He is charged 2% interest for the month on the unpaid $300: 0.02 × 300 = $6, so he now owes $306."
      ]
    ],
    "remember": "Debit spends what you have. Credit is borrowed, and interest and fees can push the cost above the price.",
    "a": {
      "q": "Priya pays $60 for shoes with her debit card. Whose money is used to pay the shop?",
      "opts": [
        "Her own money from her bank account",
        "Money her bank lends her until payday",
        "Money lent by a buy now pay later company",
        "Money lent by a credit card provider"
      ],
      "why": "A debit card takes the money straight from Priya's own account, so her balance drops by $60. The other options all involve a lender, which is credit, not debit.",
      "clue": "Does debit involve borrowing?"
    },
    "b": {
      "d": 3,
      "q": "Jack buys a $900 laptop on his credit card. He pays $300 by the due date and is charged 1.5% interest for the month on the rest. How much does he now owe?",
      "opts": ["$609", "$613.50", "$600", "$913.50"],
      "why": "Interest is charged only on the unpaid amount: $900 − $300 = $600, and 0.015 × 600 = $9, so he owes $609. The answer $613.50 wrongly charges 1.5% on the full $900 instead of the unpaid $600.",
      "clue": "Work out what is still unpaid before finding the interest."
    }
  },
  "mat-debt-consolidation": {
    "title": "Debt consolidation",
    "card": [
      "Debt consolidation means combining several debts into one new loan. The new loan pays off the old debts, and you then make one repayment.",
      "It can cut the interest if the new loan has a lower rate than the old debts. It can also lower each repayment.",
      "A lower repayment may mean a longer loan. A longer loan can mean more interest, so the total paid may rise.",
      "Example: Sam pays $120 a month on a credit card and $80 a month on a personal loan. Both would be cleared in 12 months, so the total is $200 × 12 = $2,400. One new loan at $100 a month for 36 months costs $100 × 36 = $3,600, which is $1,200 more."
    ],
    "remember": "Consolidation can give one smaller repayment, but a longer loan may cost more in total.",
    "a": {
      "q": "Which of these is an example of debt consolidation?",
      "opts": [
        "Taking one loan to pay off a car loan and two cards",
        "Getting a new credit card to spend more each month",
        "Paying only the interest on each of three debts",
        "Taking a second loan to buy a newer, bigger car"
      ],
      "why": "Using one new loan to clear the car loan and both cards leaves one debt and one repayment. Paying only the interest keeps all three debts separate. A second loan for a car adds a debt instead of combining them.",
      "clue": "Count how many debts are left after each choice."
    },
    "b": {
      "d": 3,
      "q": "Priya has a card and a store loan. Together they cost $300 a month and would be cleared in 10 months. She consolidates to $200 a month for 24 months. What happens?",
      "opts": [
        "Her repayment falls, but she pays $1,800 more in total",
        "Her repayment falls, and she pays $1,800 less in total",
        "Her repayment rises, and she pays $1,800 more in total",
        "Her repayment falls, and she pays the same in total"
      ],
      "why": "Her old debts total $300 × 10 = $3,000. The new loan costs $200 × 24 = $4,800, which is $1,800 more. The lower repayment looks better each month, but it is spread over a longer time, so the total paid rises.",
      "clue": "Compare the total of the old debts with the total of the new loan."
    }
  },
  "mat-comparing-costs-owning-renting": {
    "title": "Comparing costs of owning and renting",
    "card": [
      "To compare buying with renting, add up every cost over the same period of time. The price tag alone is not enough.",
      [
        "Owning",
        "the purchase price, plus running costs such as loan interest, insurance and repairs. Some of the money may come back if the item is sold."
      ],
      [
        "Renting",
        "regular rent payments, plus any extra costs the rental has. Nothing comes back at the end, because the owner keeps the item."
      ],
      "Example: a car costs $12 000 to buy. Running it costs $2000 a year, and after 3 years it sells for $7000. Cost of owning = 12 000 + 3 × 2000 − 7000 = $11 000. Renting costs $300 a month with running costs included, so 36 × 300 = $10 800. Renting is $200 cheaper."
    ],
    "remember": "Compare total costs over the same time, and take off any money you get back.",
    "a": {
      "q": "Using the card's method, a van costs $20 000 to buy, $1500 a year to run, and sells for $12 000 after 4 years. What is the total cost of owning it for 4 years?",
      "opts": ["$14 000", "$26 000", "$8000", "$34 000"],
      "why": "Total cost = 20 000 + 4 × 1500 − 12 000 = 20 000 + 6000 − 12 000 = $14 000. The $8000 answer is the price less the resale value only, which leaves out the running costs.",
      "clue": "Add the price and 4 years of running costs, then take off the sale money."
    },
    "b": {
      "d": 3,
      "q": "Tariq can buy a scooter for $5000, which costs $400 a year to run and sells for $2000 after 3 years. Or he can rent one for $190 a month, with running costs included. Which is cheaper over 3 years, and by how much?",
      "opts": ["Owning, by $2640", "Owning, by $640", "Renting, by $1360", "Renting, by $1920"],
      "why": "Owning costs 5000 + 3 × 400 − 2000 = $4200. Renting costs 36 × 190 = $6840, so owning is cheaper by 6840 − 4200 = $2640. Owning by $640 comes from forgetting to take off the $2000 he gets back from selling the scooter.",
      "clue": "Find both totals over 36 months, then subtract."
    }
  },
  "mat-tax-payslips": {
    "title": "Personal and business tax",
    "card": [
      [
        "Income tax",
        "Income tax is charged on taxable income in steps called tax brackets. Each bracket has its own rate, and only the income inside a bracket is taxed at that rate."
      ],
      [
        "Medicare levy",
        "The Medicare levy is a set percentage of taxable income that helps pay for public health care. It is paid on top of income tax."
      ],
      [
        "Super and rates",
        "Superannuation is money an employer pays into a worker's retirement fund. Council rates are a yearly charge paid by property owners to their local council."
      ],
      [
        "Company tax",
        "Companies pay company tax as a flat percentage of their profit. Example: at a rate of 30%, a profit of $200 000 gives 0.3 × 200 000 = $60 000."
      ]
    ],
    "remember": "Income tax goes bracket by bracket with the levy on top, super funds retirement, rates go to councils, and companies are taxed on profit.",
    "a": {
      "q": "Ben has taxable income of $40 000. The Medicare levy is 2%. How much levy does he pay?",
      "opts": ["$800", "$80", "$8000", "$2000"],
      "why": "Levy = 2% × 40 000 = 0.02 × 40 000 = $800. $80 comes from moving the decimal point one place too far.",
      "clue": "Change 2% to a decimal, then multiply by taxable income."
    },
    "b": {
      "d": 3,
      "q": "A tax scale taxes the first $18 000 at 0% and every dollar above that at 20%. Priya's taxable income is $30 000. How much income tax does she pay?",
      "opts": ["$2400", "$6000", "$3600", "$600"],
      "why": "Only the income above $18 000 is taxed at 20%. That is 30 000 − 18 000 = $12 000, and 0.2 × 12 000 = $2400. $6000 is wrong because it taxes all $30 000 at 20%.",
      "clue": "Only the income inside the 20% bracket is taxed at 20%."
    }
  },
  "mat-gst-invoices-bas": {
    "title": "GST, invoices and BAS",
    "card": [
      ["GST", "GST is the goods and services tax. It is 10% of the price of most goods and services in Australia."],
      [
        "Invoice",
        "A business adds GST to the price on an invoice. Price without GST × 1.1 gives the price with GST. Price with GST ÷ 11 gives the GST part."
      ],
      [
        "BAS",
        "A business activity statement (BAS) reports the GST a business collected from customers and the GST it paid on its own purchases."
      ],
      [
        "Amount owed",
        "GST collected − GST paid = amount sent to the tax office. Example: collected $900 and paid $400 gives 900 − 400 = $500 to send."
      ]
    ],
    "remember": "GST is 10% added to the price, and the BAS works out collected minus paid.",
    "a": {
      "q": "Kofi's workshop charges $350 for a job, before GST. What is the invoice total including GST?",
      "opts": ["$385", "$35", "$315", "$350.10"],
      "why": "GST is 10% of 350 = $35, so the total is 350 + 35 = $385. $35 is only the GST, not the total.",
      "clue": "Work out 10% of the price, then add it on."
    },
    "b": {
      "d": 3,
      "q": "Lena's bakery collected $2200 GST from customers and paid $1500 GST on supplies this quarter. What does her BAS show she sends to the tax office?",
      "opts": ["$700", "$3700", "$1500", "$2200"],
      "why": "The amount sent is GST collected minus GST paid: 2200 − 1500 = $700. Adding them to get $3700 is wrong because the GST paid on supplies is taken off.",
      "clue": "Take away the GST the business paid."
    }
  },
  "mat-comparing-insurance": {
    "title": "Comparing insurance",
    "card": [
      [
        "Premium",
        "the amount you pay to the insurer for the policy, often monthly or yearly. Yearly cost = monthly premium × 12."
      ],
      ["Excess", "the amount you pay first when you make a claim. The insurer pays the rest, up to the policy limit."],
      ["Cover", "what the policy pays for. Read what is included and what is left out before you choose."],
      "A lower premium often comes with a higher excess or less cover. To compare, check the cover is the same, then add the yearly premium and the excess for a claim year. Example: $50 a month with a $400 excess costs $600 + $400 = $1000 in a year with one claim."
    ],
    "remember": "Compare cover first, then the premium and excess together, not the premium alone.",
    "a": {
      "q": "Policy A costs $40 a month with a $500 excess. What is the total cost in a year with one claim?",
      "opts": ["$980", "$540", "$480", "$500"],
      "why": "Yearly premium = $40 × 12 = $480. Adding the $500 excess gives $980. $540 is wrong because it adds only one month of premium to the excess.",
      "clue": "Turn the monthly premium into a yearly amount first."
    },
    "b": {
      "d": 3,
      "q": "Both policies cover the same things. Policy X costs $35 a month with a $600 excess. Policy Y costs $45 a month with a $200 excess. Mia expects to make one claim this year. Which is cheaper, and by how much?",
      "opts": ["Y is cheaper by $280", "X is cheaper by $280", "Y is cheaper by $120", "X is cheaper by $120"],
      "why": "X costs $35 × 12 + $600 = $1020. Y costs $45 × 12 + $200 = $740. Y is cheaper by $280. X only looks cheaper if you compare premiums alone, and that gap is $120 a year.",
      "clue": "Find each policy's yearly premium, then add its excess."
    }
  },
  "mat-inflation-cost-living": {
    "title": "Inflation and the cost of living",
    "card": [
      "Inflation is a general rise in prices over time. It is usually given as a percentage a year. If inflation is 5%, a basket of goods that cost $100 now costs $105.",
      "When prices rise, the same income buys less. This is a fall in purchasing power, and it makes the cost of living higher.",
      "Compare a pay rise with inflation. If pay rises by less than inflation, the worker can buy less than before. This is a cut in real terms, even though the dollar amount went up.",
      "Example: Sam's pay rises 2% while inflation is 5%. Pay is up 2% but prices are up 5%, so Sam is worse off by about 3 percentage points in real terms."
    ],
    "remember": "Compare the pay rise with inflation. If pay rises by less, real income falls.",
    "a": {
      "q": "Ella gets a 2% pay rise in a year when inflation is 4%. What happens to her pay in real terms?",
      "opts": [
        "It falls, because prices rose faster than her pay",
        "It rises, because her pay went up by 2%",
        "It stays the same, because both numbers rose",
        "It rises, because inflation is higher than her pay"
      ],
      "why": "Prices rose by 4% but her pay rose by only 2%, so she can buy less than before. Her pay went up in dollars, which is the tempting mistake, but real terms means comparing it with prices.",
      "clue": "Compare the size of the pay rise with the rise in prices."
    },
    "b": {
      "d": 2,
      "q": "Inflation is 3% for the year. Which pay rise leaves a worker with more buying power than before?",
      "opts": ["5%", "3%", "2%", "1%"],
      "why": "Pay must rise by more than prices for buying power to grow. A 5% rise beats 3% inflation. A 3% rise only keeps up with prices, so buying power stays the same, not higher.",
      "clue": "Which pay rise is bigger than the rise in prices?"
    }
  },
  "mat-financial-risk": {
    "title": "Financial risk",
    "card": [
      "Financial risk is the chance that you lose money or cannot meet payments. It can come from a single event, such as losing your job, or from the whole economy, such as a recession.",
      [
        "Investments",
        "the value of shares or property can fall as well as rise. You may get back less than you put in."
      ],
      [
        "Loans",
        "you must repay a loan even if your income drops. A larger loan or a higher interest rate means a higher repayment and more risk."
      ],
      "Spreading money across different investments is called diversifying. If one falls, the others may hold their value, so the loss is smaller. Example: $10 000 in one company could lose $4000 if it falls 40%. Spread over five companies, the same fall in one costs $800."
    ],
    "remember": "Risk is the chance of losing money. Spreading it across many investments reduces the damage from any one.",
    "a": {
      "q": "Sam puts $6000 into the shares of one company. Its price falls by 30%. How much does Sam lose?",
      "opts": ["$1800", "$4200", "$600", "$3000"],
      "why": "30% of $6000 = 0.3 × $6000 = $1800. $4200 is what the shares are worth after the fall, not the loss.",
      "clue": "Find 30% of the amount invested."
    },
    "b": {
      "d": 3,
      "q": "Priya has $10 000. She puts $2000 into each of five different companies. One company's shares fall by 50%, and the other four do not change in value. How much does she lose in total?",
      "opts": ["$1000", "$5000", "$2000", "$8000"],
      "why": "Only $2000 was in the company that fell. 50% of $2000 = $1000. Losing $5000 would be the result if all $10 000 had been in that one company.",
      "clue": "Only the money in the falling company is affected."
    }
  },
  "mat-reading-financial-trends": {
    "title": "Reading financial trends",
    "card": [
      [
        "Line graphs",
        "Financial data such as share prices and exchange rates is often shown on a line graph. Time is on the horizontal axis and the value is on the vertical axis."
      ],
      [
        "Trend",
        "A line that rises over time shows an increase. A line that falls shows a decrease. The size of the change is the later value minus the earlier value."
      ],
      [
        "Percentage change",
        "Percentage change = change ÷ starting value × 100. Example: a share price goes from $20 to $25. The change is 5, and 5 ÷ 20 × 100 = 25%."
      ],
      [
        "Exchange rate",
        "An exchange rate says how much of one currency you get for one unit of another. If A$1 = US$0.60, you get US$0.60 for each Australian dollar, so A$100 buys 100 × 0.60 = US$60."
      ]
    ],
    "remember": "Read the change from the graph, then divide by the starting value for a percentage.",
    "a": {
      "q": "A share price rises from $40 to $50. What is the percentage increase?",
      "opts": ["25%", "20%", "10%", "50%"],
      "why": "The change is 50 − 40 = 10. Then 10 ÷ 40 × 100 = 25%. 20% is wrong because it divides by the new price instead of the starting price.",
      "clue": "Divide the change by the starting value."
    },
    "b": {
      "d": 3,
      "q": "The exchange rate is A$1 = 0.65 euros. Sam changes A$200 into euros. How many euros does he get?",
      "opts": ["130 euros", "307.69 euros", "200.65 euros", "65 euros"],
      "why": "Sam gets 0.65 euros for each Australian dollar, so 200 × 0.65 = 130 euros. Dividing 200 by 0.65 gives 307.69, which uses the rate the wrong way round.",
      "clue": "Multiply the dollars by the euros you get per dollar."
    }
  },
  "mat-transformations-symmetry": {
    "title": "Transformations and symmetry",
    "card": [
      [
        "Translation",
        "slides a shape without turning or flipping it. Every point moves the same distance in the same direction."
      ],
      ["Reflection", "flips a shape over a mirror line. The image is the same size but faces the other way."],
      [
        "Rotation",
        "turns a shape about a fixed point by an angle. A quarter turn is 90° and a half turn is 180°. Dilation, the fourth type, resizes a shape by a scale factor."
      ],
      "A shape has line symmetry if folding it along a line makes the two halves match exactly. It has rotational symmetry if it looks the same after a turn of less than 360°. A regular hexagon has 6 lines of symmetry and rotational symmetry of order 6."
    ],
    "remember": "Slide, flip, turn or resize. Symmetry means the shape matches itself after a flip or a turn.",
    "a": {
      "q": "The hour hand of a clock moves from pointing at 12 to pointing at 3. Which transformation describes this move?",
      "opts": [
        "A 90° rotation about the centre of the clock",
        "A 180° rotation about the centre of the clock",
        "A reflection in the line from 12 to 6",
        "A translation of the hand to the right"
      ],
      "why": "The hand stays fixed at the centre and turns a quarter of the way round, from 12 to 3, which is 90°. A 180° rotation would take it to 6. A translation is wrong because it would move the whole hand, including the end at the centre.",
      "clue": "Does the hand stay joined at the centre of the clock?"
    },
    "b": {
      "d": 3,
      "q": "A door panel is a rectangle that is longer than it is wide. How many lines of symmetry does it have?",
      "opts": ["2", "4", "1", "0"],
      "why": "Folding across the middle, either lengthwise or widthwise, gives matching halves, so there are 2 lines. The answer 4 is tempting, but folding along a diagonal of a non-square rectangle does not make the halves match exactly.",
      "clue": "Picture each possible fold and check the halves match exactly."
    }
  },
  "mat-scale-models-plans": {
    "title": "Scale models and plans",
    "card": [
      "A scale compares a length on a plan or model with the real length. A scale of 1:50 means 1 unit on the plan is 50 of the same unit in real life.",
      "To find a real length, multiply the plan length by the scale number. To find a plan length, divide the real length by the scale number.",
      "Change units after you scale. Example: 4 cm on a 1:50 plan is 4 × 50 = 200 cm, which is 2 m.",
      "A scale factor applies to lengths only. Area changes by the scale factor squared, so on a 1:50 plan every real area is 50² = 2500 times the plan area."
    ],
    "remember": "Multiply by the scale number to go from plan to real. Divide to go from real to plan.",
    "a": {
      "q": "A plan has a scale of 1:200. A wall measures 3 cm on the plan. How long is the real wall?",
      "opts": ["6 m", "600 m", "0.6 m", "60 m"],
      "why": "Real length = 3 × 200 = 600 cm, which is 6 m. The option 600 m forgets to change the units from centimetres to metres.",
      "clue": "Multiply, then change cm to m."
    },
    "b": {
      "d": 3,
      "q": "Priya builds a model of a bridge in Geelong at a scale of 1:80. The real bridge is 24 m long. How long is her model?",
      "opts": ["30 cm", "1920 m", "3 cm", "0.3 cm"],
      "why": "Model length = 24 ÷ 80 = 0.3 m, and 0.3 m is 30 cm. The option 1920 m multiplies instead of dividing, which is the wrong direction for going from real to model. The option 0.3 cm keeps the number but forgets to change metres to centimetres.",
      "clue": "Real to model means divide. Then change the units."
    }
  },
  "mat-rates-practice": {
    "title": "Derived and non-metric measures",
    "card": [
      ["Speed", "is distance ÷ time. A car that travels 150 km in 2 hours has a speed of 150 ÷ 2 = 75 km/h."],
      [
        "Fuel use",
        "is shown as litres per 100 km. If a car uses 8 L to go 100 km, it uses 8 ÷ 100 = 0.08 L for each km."
      ],
      [
        "Flow rate",
        "is volume ÷ time, such as litres per minute. A tap that fills 12 L in 3 minutes runs at 12 ÷ 3 = 4 L/min."
      ],
      [
        "Inches",
        "are still used in trades. 1 inch = 25.4 mm. To convert 3 inches to mm, multiply: 3 × 25.4 = 76.2 mm. To go from mm to inches, divide by 25.4."
      ]
    ],
    "remember": "Rates divide one measure by another. To change units, multiply or divide by the conversion number.",
    "a": {
      "q": "A tank pipe fills 90 L in 6 minutes. What is the flow rate?",
      "opts": ["15 L/min", "540 L/min", "0.07 L/min", "96 L/min"],
      "why": "Flow rate = 90 ÷ 6 = 15 L/min. Multiplying 90 × 6 = 540 is wrong because a rate divides volume by time.",
      "clue": "Divide volume by time."
    },
    "b": {
      "d": 3,
      "q": "A carpenter in Geelong needs a pipe 4 inches wide. What is this in mm?",
      "opts": ["101.6 mm", "6.35 mm", "29.4 mm", "4 000 mm"],
      "why": "Inches are larger than mm, so multiply: 4 × 25.4 = 101.6 mm. Dividing 25.4 by 4 gives 6.35, which is wrong because it uses the wrong operation.",
      "clue": "1 inch is 25.4 mm, and a mm is smaller."
    }
  },
  "mat-area-volume-jobs": {
    "title": "Area and volume for jobs",
    "card": [
      "Split a compound shape into simple shapes such as rectangles and triangles. Find each area, then add them. Perimeter is the total length around the outside.",
      "Volume of a rectangular prism = length × width × height. Concrete for a slab is its volume, so all three lengths must be in the same unit, such as metres.",
      "1 m³ = 1000 litres, and 1 m² = 10 000 cm². Convert before you multiply.",
      "Allow for waste by adding a percentage. Example: 40 m² of tiles plus 10% waste is 40 × 1.1 = 44 m²."
    ],
    "remember": "Split into simple shapes, keep units the same, then add the waste allowance last.",
    "a": {
      "q": "An L-shaped floor is made from a 6 m by 4 m rectangle and a 2 m by 3 m rectangle. What is its area?",
      "opts": ["30 m²", "24 m²", "36 m²", "10 m²"],
      "why": "Area = 6 × 4 + 2 × 3 = 24 + 6 = 30 m². The option 24 m² leaves out the second rectangle.",
      "clue": "Find each rectangle's area, then add."
    },
    "b": {
      "d": 3,
      "q": "Sam pours a concrete slab 5 m long, 4 m wide and 0.1 m thick in Bendigo. He orders 10% extra. How much concrete does he order?",
      "opts": ["2.2 m³", "2 m³", "22 m³", "2.1 m³"],
      "why": "Volume = 5 × 4 × 0.1 = 2 m³. Adding 10% gives 2 × 1.1 = 2.2 m³. The option 2.1 m³ adds 0.1 instead of 10% of the volume.",
      "clue": "Find the volume first, then add 10% of it."
    }
  },
  "mat-accuracy-measurement": {
    "title": "Tolerance, accuracy and precision",
    "card": [
      [
        "Tolerance",
        "the error allowed in a measurement. A part of 50 mm ± 0.2 mm must be between 49.8 mm and 50.2 mm."
      ],
      [
        "Accuracy",
        "how close a measurement is to the true value. Every measurement has some error, so the closer it is, the more accurate it is."
      ],
      [
        "Precision",
        "how fine the measure is. A ruler marked in millimetres is more precise than one marked in centimetres."
      ],
      "A measure can be precise but not accurate, such as a scale that reads 2.35 kg for a true mass of 2.00 kg. A reading is within tolerance if it falls inside the allowed range."
    ],
    "remember": "Tolerance is the allowed error, accuracy is closeness to true, precision is how fine the scale is.",
    "a": {
      "q": "A steel rod must be 120 mm ± 0.5 mm. Which length is within tolerance?",
      "opts": ["119.6 mm", "119.4 mm", "120.6 mm", "121 mm"],
      "why": "The allowed range is 119.5 mm to 120.5 mm. 119.6 mm is inside it. 119.4 mm is just outside, so it is not allowed.",
      "clue": "Work out the lowest and highest allowed lengths."
    },
    "b": {
      "d": 2,
      "q": "A bag has a true mass of 500 g. Ali's scale reads to 0.01 g and shows 512.35 g. Jo's scale reads to 1 g and shows 499 g. Which describes the scales?",
      "opts": [
        "Ali's is more precise, Jo's is more accurate",
        "Ali's is more accurate, Jo's is more precise",
        "Ali's is more precise and more accurate",
        "Jo's is more precise and more accurate"
      ],
      "why": "Ali's scale reads to 0.01 g, which is finer than 1 g, so it is more precise. But its reading is 12.35 g from the true mass, while Jo's is only 1 g away, so Jo's is more accurate. A finer scale does not mean a reading closer to the true value.",
      "clue": "Precision is how fine the scale is. Accuracy is how close to 500 g."
    }
  },
  "mat-types-data-2": {
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
      "Measured data stays continuous even when it is rounded. A height written as 172 cm has been rounded, but the true height could be any value close to it."
    ],
    "remember": "Categorical data names groups. Numerical data counts or measures. Ask: counted, measured, or just a label?",
    "a": {
      "q": "Each student in a Year 11 class counts how many siblings they have. What type of data is this?",
      "opts": ["Numerical, discrete", "Numerical, continuous", "Categorical, nominal", "Categorical, ordinal"],
      "why": "Siblings are counted, so the data is numerical and takes separate values: discrete. It is not continuous, because nobody has 1.5 siblings.",
      "clue": "Is it counted or measured?"
    },
    "b": {
      "d": 3,
      "q": "A coach in Bendigo times each runner over 100 m, rounding each time to the nearest tenth of a second. What type of data is this?",
      "opts": ["Numerical, continuous", "Numerical, discrete", "Categorical, ordinal", "Categorical, nominal"],
      "why": "Time is measured, so the data is numerical and continuous. Rounding to a tenth of a second makes the values look separate, but a runner's true time could be any value in a range, so it is not discrete.",
      "clue": "Does rounding change how the time was found?"
    }
  },
  "mat-displaying-categorical-data": {
    "title": "Displaying categorical data",
    "card": [
      [
        "Frequency table",
        "lists each category with its frequency, the number of times it occurs. A relative frequency is the frequency as a fraction of the total. Written as a percentage, it is called the percentage frequency."
      ],
      [
        "Bar chart",
        "shows one bar for each category, and the bar's height is its frequency. The bars do not touch, because the categories are separate groups."
      ],
      [
        "Segmented bar chart",
        "splits each bar into parts to compare groups. It is often drawn with percentages, so groups of different sizes can be compared fairly."
      ],
      "Example: a class of 25 students has 10 who walk to school. The relative frequency of walking is 10 ÷ 25 = 0.4, so the percentage frequency is 0.4 × 100 = 40%."
    ],
    "remember": "Frequency counts each category. Percentages let groups of different sizes be compared.",
    "a": {
      "q": "In a survey of 40 students, 14 chose pizza as their favourite lunch. What is the percentage frequency of pizza?",
      "opts": ["35%", "14%", "28%", "40%"],
      "why": "Percentage frequency = 14 ÷ 40 × 100 = 35%. The number 14 is the frequency, not the percentage, and it only equals a percentage when the total is 100.",
      "clue": "Divide the frequency by the total, then change to a percentage."
    },
    "b": {
      "d": 3,
      "q": "Class A has 20 students and Class B has 50. In each class, 10 students ride a bike to school. Which statement is correct?",
      "opts": [
        "A higher percentage of Class A ride a bike",
        "A higher percentage of Class B ride a bike",
        "The same percentage of each class ride a bike",
        "Class B has a higher frequency of bike riders"
      ],
      "why": "Class A: 10 ÷ 20 = 50%. Class B: 10 ÷ 50 = 20%. The frequencies are equal at 10, which is tempting, but the class sizes differ, so the percentages differ.",
      "clue": "Work out each class's percentage, not just its count."
    }
  },
  "mat-histograms-dot-plots": {
    "title": "Histograms, stem plots and dot plots",
    "card": [
      [
        "Dot plot",
        "One dot for each value, stacked above a number line. It suits a small set of data with few different values, such as 20 quiz scores out of 10."
      ],
      [
        "Stem plot",
        "Each value is split into a stem (the leading digits) and a leaf (the last digit). 47 has stem 4 and leaf 7. It keeps every value and suits small to medium sets."
      ],
      [
        "Histogram",
        "Bars show how many values fall in each equal-width interval, and the bars touch. It suits large sets, but the individual values are lost."
      ],
      "All three show shape, centre and spread. A possible outlier can show up as a value well apart from the rest of the data."
    ],
    "remember": "Dot and stem plots keep each value. A histogram groups values into intervals.",
    "a": {
      "q": "A stem plot has the row 3 | 2 5 5 8. Which values does this row show?",
      "opts": ["32, 35, 35 and 38", "32, 35 and 38", "3, 2, 5, 5 and 8", "23, 53, 53 and 83"],
      "why": "The stem 3 is the leading digit and each leaf is a last digit, so the row shows 32, 35, 35 and 38. Each leaf is one value, so the repeated 5 means 35 appears twice. Writing the leaf first, or reading the stem as its own value, misreads the plot.",
      "clue": "Put the stem in front of each leaf, one value per leaf."
    },
    "b": {
      "d": 2,
      "q": "Ravi records the heights of 400 students in Geelong. Which display suits this large set best?",
      "opts": [
        "A histogram with equal-width intervals",
        "A dot plot with one dot per student",
        "A stem plot listing all 400 values",
        "A segmented bar chart of the heights"
      ],
      "why": "With 400 measured values, grouping into intervals keeps the shape clear. A dot plot or stem plot would be very crowded, as each shows every value. A segmented bar chart is for categorical data, not heights.",
      "clue": "Which display groups values instead of showing each one?"
    }
  },
  "mat-five-number-summary-boxplots": {
    "title": "The five-number summary and boxplots",
    "card": [
      "The five-number summary lists the minimum, Q1, median, Q3 and maximum. Q1 is the median of the lower half of the data, and Q3 is the median of the upper half.",
      "A boxplot draws these five values. The box runs from Q1 to Q3 with a line at the median. Whiskers reach out to the smallest and largest values that are not outliers.",
      "The fences are 1.5 × IQR below Q1 and 1.5 × IQR above Q3, where IQR = Q3 − Q1. A value beyond a fence is a possible outlier, and it is shown as a separate dot.",
      "Example: Q1 = 12 and Q3 = 20. IQR = 8, and 1.5 × 8 = 12. The fences are 12 − 12 = 0 and 20 + 12 = 32. A value of 35 is a possible outlier."
    ],
    "remember": "A boxplot shows five values, and anything beyond a fence is a possible outlier.",
    "a": {
      "q": "A data set has Q1 = 30 and Q3 = 50. What is the upper fence for outliers?",
      "opts": ["80", "70", "60", "75"],
      "why": "IQR = 50 − 30 = 20, and 1.5 × 20 = 30. The upper fence is Q3 + 30 = 80. Adding only the IQR to Q3 gives 70, adding 30 to Q1 instead of Q3 gives 60, and multiplying Q3 by 1.5 gives 75.",
      "clue": "Find the IQR first, then multiply it by 1.5."
    },
    "b": {
      "d": 3,
      "q": "Mia's daily steps (in hundreds) have Q1 = 40 and Q3 = 60. Her minimum is 8 and her maximum is 88. Which statement is correct?",
      "opts": [
        "Only the minimum of 8 is a possible outlier",
        "Only the maximum of 88 is a possible outlier",
        "Both 8 and 88 are possible outliers",
        "Neither 8 nor 88 is a possible outlier"
      ],
      "why": "IQR = 20, and 1.5 × 20 = 30, so the fences are 40 − 30 = 10 and 60 + 30 = 90. The value 8 is below 10, so it is a possible outlier, but 88 is inside the upper fence of 90. Using the IQR alone gives fences of 20 and 80, which wrongly flags both values.",
      "clue": "Work out both fences, then check each end value against them."
    }
  },
  "mat-shapes-distributions": {
    "title": "Shapes of distributions",
    "card": [
      ["Symmetric", "The two sides of the display are roughly mirror images, with the peak near the middle."],
      [
        "Skewed",
        "One side has a long tail. If the tail points to the higher values, it is positively skewed (skewed right). If it points to the lower values, it is negatively skewed (skewed left)."
      ],
      [
        "Bell-shaped",
        "A symmetric distribution with one peak in the middle that tapers off evenly on both sides. About 68% of values lie within 1 standard deviation of the mean, about 95% within 2, and about 99.7% within 3."
      ],
      "Example: test scores have a mean of 60 and a standard deviation of 5. If they are bell-shaped, about 95% of scores lie within 2 standard deviations, which is from 50 to 70."
    ],
    "remember": "The tail names the skew. In a bell shape, 68%, 95% and 99.7% lie within 1, 2 and 3 standard deviations.",
    "a": {
      "q": "A histogram has its peak at the low values and a long tail stretching to the high values. What is its shape?",
      "opts": ["Positively skewed", "Negatively skewed", "Symmetric", "Bell-shaped"],
      "why": "The long tail points to the higher values, so the distribution is positively skewed. It is not negatively skewed, because that name follows the tail and not the side where the peak sits.",
      "clue": "Name the shape by the direction of the tail."
    },
    "b": {
      "d": 3,
      "q": "The heights of plants in a nursery are bell-shaped, with a mean of 40 cm and a standard deviation of 4 cm. About 68% of the plants have heights between which values?",
      "opts": ["36 cm and 44 cm", "32 cm and 48 cm", "28 cm and 52 cm", "38 cm and 42 cm"],
      "why": "About 68% of values lie within 1 standard deviation of the mean, so 40 − 4 = 36 and 40 + 4 = 44. The range 32 cm to 48 cm is within 2 standard deviations, which holds about 95%.",
      "clue": "Which percentage matches 1 standard deviation?"
    }
  },
  "mat-comparing-distributions": {
    "title": "Comparing distributions",
    "card": [
      "To compare groups, look at the same variable in each group. Back-to-back stem plots share one stem. Parallel boxplots sit on one scale, one above the other.",
      [
        "Centre",
        "Compare the medians. Example: group A has median 62 and group B has median 55. Group A is centred 7 higher."
      ],
      [
        "Spread",
        "Compare the IQRs. A larger IQR means the middle half of the data is more spread out. Example: A has IQR 10 and B has IQR 18, so B is more spread out."
      ],
      "Write the comparison in context, using both centre and spread. Take care with the range, as one extreme value can stretch it."
    ],
    "remember": "Compare medians for centre and IQRs for spread, in context.",
    "a": {
      "q": "Parallel boxplots show test scores. Class P has median 70 and IQR 8. Class Q has median 70 and IQR 20. What is the best comparison?",
      "opts": [
        "Same centre, but Q's scores are more spread out",
        "Same centre, but P's scores are more spread out",
        "Q has a higher centre and a wider spread",
        "P has a higher centre and a narrower spread"
      ],
      "why": "Both medians are 70, so the centres are the same. Q's IQR of 20 is larger than P's IQR of 8, so Q is more spread out. Saying P is more spread out reverses what a larger IQR means.",
      "clue": "Compare the medians first, then the IQRs."
    },
    "b": {
      "d": 3,
      "q": "Parallel boxplots show daily sales (in dollars) at two Geelong cafés. Café X: median 400, IQR 120, range 500. Café Y: median 360, IQR 200, range 380. Using medians and IQRs, which comparison is correct?",
      "opts": [
        "X is centred higher, and Y is more spread out",
        "X is centred higher, and X is more spread out",
        "Y is centred higher, and Y is more spread out",
        "Y is centred higher, and X is more spread out"
      ],
      "why": "X's median of 400 is higher than Y's 360, so X is centred higher. Y's IQR of 200 is larger than X's 120, so Y's middle half is more spread out. X's larger range is tempting, but one extreme day can stretch the range.",
      "clue": "Ignore the ranges and compare the IQRs."
    }
  },
  "mat-first-order-recurrence-relations": {
    "title": "First-order recurrence relations",
    "card": [
      "A recurrence relation gives each term from the term just before it. It needs a starting value, written u0, so the list can begin.",
      "The rule u(n+1) = u(n) + 4 means the next term is the current term plus 4. The rule u(n+1) = 3 × u(n) means the next term is 3 times the current term.",
      "To use it, start with u0 and apply the rule again and again. Each answer becomes the input for the next step.",
      "Example: u0 = 5 and u(n+1) = u(n) + 4. Then u1 = 5 + 4 = 9, u2 = 9 + 4 = 13 and u3 = 13 + 4 = 17."
    ],
    "remember": "Start with u0, then apply the rule to each term to get the next one.",
    "a": {
      "q": "A sequence has u0 = 2 and u(n+1) = 3 × u(n) − 1. What is u2?",
      "opts": ["14", "5", "17", "8"],
      "why": "u1 = 3 × 2 − 1 = 5. Then u2 = 3 × 5 − 1 = 14. The answer 5 is only u1, so one step was missed.",
      "clue": "Find u1 first, then use it to find u2."
    },
    "b": {
      "d": 2,
      "q": "Sam saves for a bike. His savings follow u0 = 30 and u(n+1) = u(n) + 12, where n is the week. How much does he have at the end of week 3?",
      "opts": ["$66", "$42", "$54", "$78"],
      "why": "u1 = 42, u2 = 54 and u3 = 66. The answer $54 is u2, which stops one step too early.",
      "clue": "Apply the rule three times, starting from u0."
    }
  },
  "mat-explicit-rules-sequences": {
    "title": "Explicit rules for sequences",
    "card": [
      "An explicit rule gives the nth term directly from n. You put in the term number and get that term, with no need to list the terms before it.",
      "For an arithmetic sequence, the rule is t(n) = a + (n − 1)d. Here a is the first term and d is the common difference.",
      "Worked example: the sequence 7, 12, 17, 22, ... has a = 7 and d = 5. So t(n) = 7 + (n − 1) × 5.",
      "To find the 30th term, put n = 30. t(30) = 7 + 29 × 5 = 7 + 145 = 152. Do the bracket and the multiplication before the addition."
    ],
    "remember": "An explicit rule takes n and gives that term straight away.",
    "a": {
      "q": "An arithmetic sequence has first term 4 and common difference 3. What is the 21st term?",
      "opts": ["64", "67", "63", "84"],
      "why": "t(21) = 4 + (21 − 1) × 3 = 4 + 60 = 64. Using 21 × 3 instead of 20 × 3 gives 67, which forgets that the first term is already there.",
      "clue": "Multiply d by n − 1, not by n."
    },
    "b": {
      "d": 3,
      "q": "Mia saves for a bike. She has $50 in week 1 and adds $15 each week. Using t(n) = a + (n − 1)d, how much has she in week 12?",
      "opts": ["$215", "$230", "$195", "$180"],
      "why": "Here a = 50 and d = 15. t(12) = 50 + 11 × 15 = 50 + 165 = $215. Using 12 × 15 gives $230, because it counts one extra step of $15.",
      "clue": "Week 1 is the first term, so count how many steps come after it."
    }
  },
  "mat-linear-growth-decay": {
    "title": "Linear growth and decay",
    "card": [
      "In linear growth, the same amount is added at each step. In linear decay, the same amount is taken away at each step.",
      "As a recurrence relation, growth is u(n+1) = u(n) + d and decay is u(n+1) = u(n) − d. The amount d stays fixed.",
      "Simple interest is linear growth. The interest is worked out on the original amount only, so the same dollar amount is added each year.",
      "Flat-rate depreciation is linear decay. An item loses the same dollar amount each year. Example: a $2000 laptop losing $300 a year is worth $2000 − 3 × $300 = $1100 after 3 years."
    ],
    "remember": "Linear means the same amount is added or taken away at each step.",
    "a": {
      "q": "Priya invests $1500 at 4% simple interest per year. How much interest is added each year?",
      "opts": ["$60", "$62.40", "$6", "$1560"],
      "why": "Simple interest is 4% of the original $1500, which is $60 every year. The amount $62.40 is 4% of $1560, which is not how simple interest works.",
      "clue": "Simple interest always uses the original amount."
    },
    "b": {
      "d": 3,
      "q": "A van bought for $42 000 loses $6000 in value each year under flat-rate depreciation. What is its value after 4 years?",
      "opts": ["$18 000", "$24 000", "$36 000", "$12 000"],
      "why": "The loss is 4 × $6000 = $24 000. So the value is $42 000 − $24 000 = $18 000. The answer $24 000 is the total loss, not the value left.",
      "clue": "Find the total loss, then subtract it from the start."
    }
  },
  "mat-geometric-growth-decay": {
    "title": "Geometric growth and decay",
    "card": [
      "In geometric growth or decay, each term is the one before multiplied by the same factor R. The recurrence relation is u(n+1) = R × u(n).",
      "If R is above 1, the amount grows. If R is between 0 and 1, the amount decays.",
      "To find R, write the percentage rate as a decimal. Add it to 1 for growth, or subtract it from 1 for decay: a 5% rise gives R = 1 + 0.05 = 1.05, and a 5% fall gives R = 1 − 0.05 = 0.95.",
      "Compound interest is geometric growth. Reducing balance depreciation is geometric decay. Example: $1000 at 5% compound interest becomes 1000 × 1.05 = $1050, then 1050 × 1.05 = $1102.50."
    ],
    "remember": "Multiply by the same factor R each step: above 1 grows, between 0 and 1 decays.",
    "a": {
      "q": "A car loses 15% of its value each year by reducing balance depreciation. What factor R is used?",
      "opts": ["0.85", "1.15", "0.15", "15"],
      "why": "A 15% fall means R = 1 − 0.15 = 0.85, so 85% of the value is left each year. The answer 1.15 adds the rate to 1, which would be a 15% rise.",
      "clue": "What percentage of the value is left after the fall?"
    },
    "b": {
      "d": 3,
      "q": "Leo puts $2000 in an account paying 5% compound interest per year. What is the balance after 2 years?",
      "opts": ["$2205", "$2200", "$2100", "$2210"],
      "why": "Year 1: 2000 × 1.05 = $2100. Year 2: 2100 × 1.05 = $2205. The answer $2200 is simple interest, which adds the same $100 each year instead of working out interest on the new balance.",
      "clue": "Year 2 interest is worked out on the year 1 balance."
    }
  },
  "mat-gst-price": {
    "title": "GST and price",
    "card": [
      "GST is the goods and services tax. In Australia it is 10% of the price before tax. It is added to the price of most goods and services.",
      [
        "Adding GST",
        "price with GST = price without GST × 1.1. Example: a $200 bike has GST of $20, so it costs $200 × 1.1 = $220."
      ],
      [
        "Removing GST",
        "price without GST = price with GST ÷ 1.1. GST is 10% of the price without GST, not 10% of the total."
      ],
      ["Example", "A jacket costs $330 with GST. Without GST it is $330 ÷ 1.1 = $300. The GST is $330 − $300 = $30."]
    ],
    "remember": "Times 1.1 to add GST. Divide by 1.1 to take it off.",
    "a": {
      "q": "A printer costs $450 before GST. What is its price including GST?",
      "opts": ["$495", "$405", "$450.10", "$409.09"],
      "why": "Price with GST = $450 × 1.1 = $495. Subtracting 10% to get $405 is simply wrong, because adding GST makes the price go up. Dividing by 1.1 gives $409.09, which is how you would remove GST, not add it.",
      "clue": "Adding GST means multiplying the price before GST."
    },
    "b": {
      "d": 3,
      "q": "Mia buys a desk for $1100 including GST. How much of that price is GST?",
      "opts": ["$100", "$110", "$1000", "$990"],
      "why": "Price without GST = $1100 ÷ 1.1 = $1000, so the GST is $1100 − $1000 = $100. Taking 10% of $1100 gives $110, but GST is 10% of the price before GST, not of the total.",
      "clue": "Find the price without GST first, then subtract."
    }
  },
  "mat-unitary-method": {
    "title": "The unitary method",
    "card": [
      "The unitary method finds the value of one unit first. A unit can be one item, one litre, one hour or 1 per cent. Then you scale up by multiplying.",
      "To find one unit, divide the total amount by the number of units. If 5 kg of rice costs $12.50, then 1 kg costs $12.50 ÷ 5 = $2.50.",
      "To find several units, multiply the one-unit value by the number wanted. 3 kg of that rice costs 3 × $2.50 = $7.50.",
      "To compare two deals, find the cost of one unit for each. The smaller cost per unit is the better buy."
    ],
    "remember": "Divide to get one unit, then multiply to get the amount you need.",
    "a": {
      "q": "Four tickets to a footy match cost $90. Using the unitary method, what do seven tickets at the same price cost?",
      "opts": ["$157.50", "$51.43", "$360.00", "$22.50"],
      "why": "One ticket costs $90 ÷ 4 = $22.50, so seven cost 7 × $22.50 = $157.50. $22.50 is only the cost of one ticket, so it stops after the first step.",
      "clue": "Find the cost of one ticket first."
    },
    "b": {
      "d": 2,
      "q": "Ava can buy 6 pens for $4.50 or 10 pens for $7.20 at a shop in Bendigo. Which is the better buy, and why?",
      "opts": [
        "10 pens, at 72 cents each",
        "6 pens, at 75 cents each",
        "10 pens, at 82 cents each",
        "6 pens, at 70 cents each"
      ],
      "why": "6 pens: $4.50 ÷ 6 = $0.75 each. 10 pens: $7.20 ÷ 10 = $0.72 each. The lower cost per pen is the better buy, so the pack of 10 wins even though it costs more in total.",
      "clue": "Work out the cost of one pen in each pack."
    }
  },
  "mat-simple-interest-2": {
    "title": "Simple interest",
    "card": [
      "Simple interest is worked out only on the starting amount, called the principal. The interest is not added to the principal each period, so it never earns interest itself.",
      "The formula is I = PrT/100. I is the interest, P is the principal, r is the yearly interest rate as a percentage, and T is the time in years.",
      "The rate is per year, so T must be in years. For 6 months, T = 0.5. Put r in as 6, not 0.06, because the 100 in the formula does that job.",
      "Example: $2000 at 5% per year for 3 years. I = 2000 × 5 × 3/100 = $300. The total amount after 3 years is $2000 + $300 = $2300."
    ],
    "remember": "Simple interest is the same every period, because it is always worked out on the principal.",
    "a": {
      "q": "Mia puts $4000 into an account paying 3% per year simple interest. She leaves it for 2 years. How much interest does she earn?",
      "opts": ["$240", "$120", "$4240", "$24 000"],
      "why": "I = 4000 × 3 × 2/100 = $240. $4240 is the total balance, but the question asks for the interest alone. $24 000 comes from leaving out the ÷ 100.",
      "clue": "Use I = PrT/100 with r = 3 and T = 2."
    },
    "b": {
      "d": 3,
      "q": "Sam takes a loan of $5000 at 8% per year simple interest. He repays it after 18 months. How much interest does he pay in total?",
      "opts": ["$600", "$7200", "$400", "$720"],
      "why": "The rate is per year, so 18 months is T = 1.5 years. I = 5000 × 8 × 1.5/100 = $600. Using T = 18 gives $7200, which mixes months with a yearly rate.",
      "clue": "Change the months into years before using the formula."
    }
  },
  "mat-compound-interest-2": {
    "title": "Compound interest",
    "card": [
      "With compound interest, the interest earned is added to the balance. The next period's interest is then worked out on the larger amount. So interest earns interest.",
      "The formula is A = P(1 + r/100)ⁿ. A is the final amount, P is the amount invested at the start, r is the percentage rate per period (6 means 6%), and n is the number of periods.",
      "Both r and n must use the compounding period. For 6% per year compounded monthly, r = 6 ÷ 12 = 0.5 per month, so the multiplier is 1 + 0.5/100 = 1.005. Then n is the number of months.",
      "Example: $2000 at 5% per year, compounded yearly, for 3 years. A = 2000 × (1 + 5/100)³ = 2000 × 1.157625 = $2315.25. The interest earned is $315.25."
    ],
    "remember": "Multiply by (1 + r/100) once for each period, with r and n both set to the compounding period.",
    "a": {
      "q": "Priya invests $2000 at 10% per year, compounded yearly, for 2 years. What is the final amount?",
      "opts": ["$2420", "$2400", "$2200", "$2040"],
      "why": "A = 2000 × (1 + 10/100)² = 2000 × 1.21 = $2420. The answer $2400 is simple interest, which does not let the interest earn interest.",
      "clue": "Is year 2 interest found on $2000 or on the new balance?"
    },
    "b": {
      "d": 3,
      "q": "Tom invests $3000 at 12% per year, compounded monthly, for 3 years. Which calculation gives the final amount?",
      "opts": ["3000 × (1 + 1/100)³⁶", "3000 × (1 + 1/100)³", "3000 × (1 + 12/100)³⁶", "3000 × (1 + 12/100)³"],
      "why": "Interest is compounded monthly, so the rate per month is 12 ÷ 12 = 1 and there are 3 × 12 = 36 months. So A = 3000 × (1 + 1/100)³⁶. Using 12% with 3 periods works in years, so neither r nor n matches the monthly compounding period.",
      "clue": "Convert both the rate and the time to months."
    }
  },
  "mat-comparing-purchase-options": {
    "title": "Comparing purchase options",
    "card": [
      "To compare ways to pay, work out the total cost of each: everything you pay in the end, including deposits, fees such as late fees, and interest. The cheapest option has the lowest total.",
      ["Cash or debit", "you pay the price now from your own money. The total cost is the price, with no interest."],
      [
        "Credit card",
        "you pay later. If you pay the full balance within the interest-free period, there is usually no interest. If not, interest is charged on what is unpaid, and card fees may apply."
      ],
      [
        "Loan or BNPL",
        "you pay in instalments, and loan repayments include interest. Total = instalment × number of instalments + any fees, so $55 a month for 12 months is 55 × 12 = $660."
      ]
    ],
    "remember": "Compare the totals you pay in the end, not the size of each instalment.",
    "a": {
      "q": "A $450 bike can be bought on a loan with $40 a month for 12 months. How much more than the cash price does the loan cost?",
      "opts": ["$30", "$40", "$480", "$10"],
      "why": "Loan total = 40 × 12 = $480. Extra cost = 480 − 450 = $30. The $480 is the total cost, not the extra amount paid.",
      "clue": "Find the loan total first, then compare it with the cash price."
    },
    "b": {
      "d": 3,
      "q": "Mia buys a $240 jacket. Option A: pay cash. Option B: BNPL with 4 payments of $60 and a $12 late fee she is charged once. Which statement is correct?",
      "opts": [
        "Option B costs $12 more than option A",
        "Option B costs $240 in total, the same as A",
        "Option B costs $60 more than option A",
        "Option B costs $12 less than option A"
      ],
      "why": "The instalments are 4 × 60 = $240. Adding the $12 fee gives $252, which is $12 more than the $240 cash price. Splitting the payments does not change the total, but the fee does.",
      "clue": "Add the instalments and the fee, then compare with the cash price."
    }
  },
  "mat-inflation-purchasing-power": {
    "title": "Inflation and purchasing power",
    "card": [
      "Inflation is a general rise in prices over time. It is usually given as a percentage per year.",
      "Purchasing power is how much a sum of money can buy. When prices rise, the same money buys less, so its purchasing power falls.",
      "A price that rises at the same rate as inflation has not changed in real terms. The dollar figure is higher, but money is worth less by the same amount.",
      "Example: a $50 item rises with 4% inflation to $50 × 1.04 = $52. In real terms it costs the same. If your $50 stays the same, it is no longer enough to buy the item."
    ],
    "remember": "If prices rise, money buys less. A price rising with inflation is unchanged in real terms.",
    "a": {
      "q": "Over a year, prices in general rise by 3%. Sam keeps $200 in a drawer. What happens to its purchasing power?",
      "opts": [
        "It falls, as $200 buys less than before",
        "It rises, as $200 is still the same amount",
        "It stays the same, as the dollar amount is unchanged",
        "It rises by 3%, as prices have gone up"
      ],
      "why": "Inflation means prices rise, so the same $200 buys fewer goods. The dollar figure is unchanged, but its purchasing power is not, so staying the same is a tempting but wrong answer.",
      "clue": "Think about what $200 can buy after prices rise."
    },
    "b": {
      "d": 3,
      "q": "A loaf of bread in Geelong costs $4.00. With 5% inflation over a year, it rises to $4.20. In real terms, what has happened to the price of bread?",
      "opts": [
        "It is unchanged, as it rose at the same rate as inflation",
        "It has risen, as $4.20 is more than $4.00",
        "It has fallen, as inflation makes money worth less",
        "It has risen by 5%, as the dollar price went up by 5%"
      ],
      "why": "$4.00 × 1.05 = $4.20, so the bread rose in line with inflation. In real terms the price is unchanged. The dollar price did rise by 5%, but so did prices in general.",
      "clue": "Compare the bread's rise with the rise in prices in general."
    }
  },
  "mat-matrix": {
    "title": "What a matrix is",
    "card": [
      "A matrix is a rectangular array of numbers in rows and columns. It stores information, such as sales figures in a table or the links between places in a network.",
      "The order of a matrix is its number of rows × its number of columns. A matrix with 2 rows and 3 columns has order 2 × 3. Each number in it is an element.",
      [
        "Row and column",
        "a row matrix has one row, such as [4 7 9], which has order 1 × 3. A column matrix has one column."
      ],
      [
        "Square, zero, identity",
        "a square matrix has equal numbers of rows and columns. A zero matrix has every element 0. An identity matrix is square, with 1s down the diagonal from top left and 0s elsewhere."
      ]
    ],
    "remember": "Order is rows × columns. A square matrix has equal rows and columns.",
    "a": {
      "q": "A matrix has 3 rows and 2 columns. What is its order?",
      "opts": ["3 × 2", "2 × 3", "3 × 3", "6 × 1"],
      "why": "Order is written as rows × columns, so 3 rows and 2 columns gives 3 × 2. The option 2 × 3 swaps the two numbers, which is the most common mistake.",
      "clue": "Say rows first, then columns."
    },
    "b": {
      "d": 2,
      "q": "Mia records the points of 4 players over 4 games in a matrix with 4 rows and 4 columns. Which type of matrix is this?",
      "opts": ["A square matrix", "A column matrix", "A row matrix", "An identity matrix"],
      "why": "The number of rows equals the number of columns, so it is square. It would be an identity matrix only if it had 1s on the diagonal and 0s elsewhere, and points scored need not look like that.",
      "clue": "Compare the number of rows with the number of columns."
    }
  },
  "mat-adding-scaling-matrices": {
    "title": "Adding and scaling matrices",
    "card": [
      "The order of a matrix is its number of rows × its number of columns. Two matrices can be added only if they have the same order.",
      ["Adding", "add the elements in the same position. For example, [2 5] + [3 −1] = [5 4]."],
      [
        "Scalar multiplication",
        "a scalar is an ordinary number. To multiply a matrix by it, multiply every element. For example, 3 × [2 −4] = [6 −12]."
      ],
      "Subtracting works the same way as adding. Take away the element in the same position, and watch the signs."
    ],
    "remember": "Add matching positions. A scalar multiplies every element.",
    "a": {
      "q": "What is 2 × [3 −5] + [1 4]?",
      "opts": ["[7 −6]", "[4 −1]", "[7 −1]", "[7 −14]"],
      "why": "First, 2 × [3 −5] = [6 −10]. Then add [1 4] to get [7 −6]. Multiplying only the first element by 2 would give [7 −1], but a scalar multiplies every element.",
      "clue": "Scale first, then add matching positions."
    },
    "b": {
      "d": 3,
      "q": "A = [5 −3] and B = [2 4]. What is 2 × (A − B)?",
      "opts": ["[6 −14]", "[8 −10]", "[6 2]", "[6 −7]"],
      "why": "A − B = [5 − 2 −3 − 4] = [3 −7], and 2 × [3 −7] = [6 −14]. The answer [8 −10] comes from 2A − B, which doubles A but not B. The scalar multiplies the whole bracket.",
      "clue": "Work out the bracket first, and watch the sign of −3 − 4."
    }
  },
  "mat-multiplying-matrices": {
    "title": "Multiplying matrices",
    "card": [
      "The order of a matrix is its number of rows × its number of columns. A 2 × 3 matrix has 2 rows and 3 columns.",
      "Two matrices can be multiplied only if the number of columns in the first equals the number of rows in the second. An m × n matrix times an n × p matrix gives an m × p matrix.",
      "Each element of the answer is a row of the first matrix times a column of the second. Multiply the pairs in order, then add them.",
      [
        "Example",
        "Row [2 3] times column [4 5] (read down) = 2 × 4 + 3 × 5 = 8 + 15 = 23. This is one element of the answer."
      ]
    ],
    "remember": "Columns of the first must match rows of the second. Each element is row times column, then add.",
    "a": {
      "q": "A is a 2 × 3 matrix and B is a 3 × 4 matrix. What is the order of the product AB?",
      "opts": ["2 × 4", "3 × 3", "2 × 3", "3 × 4"],
      "why": "The inner numbers (3 and 3) match, so the product exists. The answer has the outer numbers: 2 rows from A and 4 columns from B. 3 × 3 is wrong because it uses the inner numbers, which are used up in the multiplying.",
      "clue": "Look at the outer numbers once the inner ones match."
    },
    "b": {
      "d": 2,
      "q": "A is the row [1 2 3] and B is the column [4 5 6], read down. AB has one element. What is it?",
      "opts": ["32", "28", "21", "18"],
      "why": "Multiply the pairs in order and add: 1 × 4 + 2 × 5 + 3 × 6 = 4 + 10 + 18 = 32. The answer 28 comes from reading the column upwards, pairing 1 with 6 and 3 with 4. The answer 21 adds all six numbers instead of multiplying pairs.",
      "clue": "Pair the first of the row with the top of the column."
    }
  },
  "mat-identity-inverse-matrices": {
    "title": "Identity and inverse matrices",
    "card": [
      [
        "Identity",
        "The identity matrix I is a square matrix with 1s down the main diagonal and 0s elsewhere. For a square matrix A, using I of the same order, A × I = A and I × A = A."
      ],
      [
        "Inverse",
        "The inverse of A is written A⁻¹. It is the matrix where A × A⁻¹ = I. Only a square matrix can have an inverse, and not every square matrix has one."
      ],
      [
        "2 × 2 rule",
        "For A = [a b; c d], the determinant is ad − bc. If it is 0, there is no inverse. If not, A⁻¹ = 1/(ad − bc) × [d −b; −c a]."
      ],
      ["Example", "For A = [3 1; 5 2], ad − bc = 3×2 − 1×5 = 1. So A⁻¹ = 1/1 × [2 −1; −5 3] = [2 −1; −5 3]."]
    ],
    "remember": "A matrix times its inverse gives I. No inverse if the determinant is 0.",
    "a": {
      "q": "What is the determinant of the matrix [4 3; 2 5]?",
      "opts": ["14", "26", "−14", "6"],
      "why": "The determinant is ad − bc = 4×5 − 3×2 = 20 − 6 = 14. The value 26 comes from adding the products instead of subtracting them.",
      "clue": "Multiply the main diagonal, then take away the other diagonal's product."
    },
    "b": {
      "d": 3,
      "q": "For which value of k does the matrix [2 k; 3 6] have no inverse?",
      "opts": ["k = 4", "k = 9", "k = −4", "k = 0"],
      "why": "The determinant is 2×6 − k×3 = 12 − 3k. It equals 0 when k = 4, so there is no inverse. When k = 0 the determinant is 12, which is not 0, so an inverse exists.",
      "clue": "Set the determinant equal to 0 and solve for k."
    }
  },
  "mat-matrices-context": {
    "title": "Matrices in context",
    "card": [
      "A matrix can store data in a table. Each row and each column stands for something, such as a shop and a month. Each element is one value, such as the number of items sold.",
      "To total costs or revenue, put the quantities in one matrix and the prices in another. Multiply them so each row of the first meets the column of prices.",
      "Each element of the answer is a sum of quantity × price. The answer has one row for each row of quantities, so each row gives one total, such as one shop's revenue.",
      "Example: a shop sells 10 hats and 4 scarves. Hats cost $8 and scarves cost $5. Revenue = [10 4] × (column with 8 above 5) = 10 × 8 + 4 × 5 = 80 + 20 = $100."
    ],
    "remember": "Quantities times prices, row by column, give one total for each row.",
    "a": {
      "q": "Cara sells 6 mugs and 3 plates. Mugs cost $7 each and plates cost $10 each. Her quantities are in a row matrix and the prices in a column matrix. What is the product?",
      "opts": ["[72]", "[81]", "[26]", "[42]"],
      "why": "Multiply each quantity by its own price and add: 6 × 7 + 3 × 10 = 42 + 30 = 72, so the product is [72] dollars. The answer 81 comes from pairing mugs with the plate price, 6 × 10 + 3 × 7, and 42 leaves out the plates.",
      "clue": "Pair each quantity with its own price, then add."
    },
    "b": {
      "d": 3,
      "q": "Two shops sell hats and scarves. Their sales matrix has rows [5 2] for Shop A and [3 6] for Shop B. Prices are in the column with $10 above $4. What is each shop's revenue?",
      "opts": ["Shop A $58, Shop B $54", "Shop A $40, Shop B $72", "Shop A $50, Shop B $30", "Shop A $98, Shop B $126"],
      "why": "Each row meets the price column: Shop A is 5 × 10 + 2 × 4 = 50 + 8 = $58, and Shop B is 3 × 10 + 6 × 4 = 30 + 24 = $54. The answer $40 and $72 pairs hats with the scarf price, and $50 and $30 leaves out the scarves.",
      "clue": "Each shop's row meets the price column. Add both products."
    }
  },
  "mat-transition-matrices": {
    "title": "Transition matrices",
    "card": [
      "A transition matrix shows the chance of moving from each state to each state in one step. Each column is the starting state and each row is the next state. Each column adds to 1.",
      "Example: each week, 80% of people at gym A stay and 20% move to gym B. Of people at gym B, 10% move to A and 90% stay. T = [0.8 0.1 ; 0.2 0.9], written row by row, with a semicolon between rows.",
      "Write the starting numbers as a column matrix S0. The next state is S1 = T × S0, and then S2 = T × S1. Each step is one more multiplication by T.",
      "Example: if S0 = [100 ; 50], then S1 = [0.8×100 + 0.1×50 ; 0.2×100 + 0.9×50] = [85 ; 65]. After many steps, the numbers often settle to a steady state that stops changing."
    ],
    "remember": "Next state = T × current state. Each column of T adds to 1.",
    "a": {
      "q": "Using the gym matrix T = [0.8 0.1 ; 0.2 0.9] and S0 = [50 ; 150], how many people are at gym A after one week?",
      "opts": ["55", "70", "40", "145"],
      "why": "Gym A keeps 0.8 × 50 = 40 and gains 0.1 × 150 = 15 from gym B, so 55. The answer 70 comes from using 0.2, the share that leaves A, instead of the 0.1 that arrives from B.",
      "clue": "Multiply the top row of T by the column S0."
    },
    "b": {
      "d": 3,
      "q": "Each month, 70% of Mia's café customers stay and 30% move to a rival. Of the rival's customers, 20% move to Mia and 80% stay. Mia has 400 customers and the rival 100. How many does Mia have next month?",
      "opts": ["300", "280", "360", "200"],
      "why": "Mia keeps 0.7 × 400 = 280 and gains 0.2 × 100 = 20, so 300. Choosing 280 forgets the customers who arrive from the rival, and 200 is the rival's new total, not Mia's.",
      "clue": "Add those who stay to those who arrive."
    }
  },
  "mat-response-explanatory-variables": {
    "title": "Response and explanatory variables",
    "card": [
      "When two numerical variables may be linked, we ask which one might explain or predict the other.",
      [
        "Explanatory variable",
        "the variable that may explain or predict changes in the other. It goes on the horizontal axis."
      ],
      ["Response variable", "the variable that may change in response. It goes on the vertical axis."],
      "Example: a teacher studies hours of study and test score. Hours of study may explain the score, so hours is explanatory and score is the response. Choosing the explanatory variable is a judgement about which could predict the other, and it does not prove that one causes the other."
    ],
    "remember": "Explanatory may explain or predict. Response is what changes. Explanatory goes across.",
    "a": {
      "q": "Mia records the hours of sunshine each day and the number of ice creams sold at her stall in Geelong. She wants to predict sales from sunshine. Which is the response variable?",
      "opts": ["Number of ice creams sold", "Hours of sunshine", "The day of the week", "The price of an ice cream"],
      "why": "Mia wants to predict sales from sunshine, so sales is the response variable. Hours of sunshine is the explanatory variable, the one used to explain or predict.",
      "clue": "Which variable is being predicted?"
    },
    "b": {
      "d": 3,
      "q": "Sam collects data on the height of 20 students and the length of their forearms. He wants to predict height from forearm length. Which statement about his scatterplot is correct?",
      "opts": [
        "Forearm length goes on the horizontal axis",
        "Height goes on the horizontal axis",
        "Forearm length is the response variable",
        "Either variable can go on the horizontal axis"
      ],
      "why": "Sam predicts height from forearm length, so forearm length is explanatory and goes on the horizontal axis. Height is the response and goes on the vertical axis. The axis is chosen by which variable is used to predict, not by which is bigger.",
      "clue": "Which variable is being used to make the prediction?"
    }
  },
  "mat-describing-association": {
    "title": "Describing an association",
    "card": [
      [
        "Direction",
        "Positive: as one variable increases, the other tends to increase. Negative: as one increases, the other tends to decrease. No direction: no clear trend."
      ],
      ["Form", "Linear if the points follow a straight line pattern. Non-linear if they follow a curve."],
      [
        "Strength",
        "Strong if the points sit close to a clear pattern. Weak if they are widely scattered around it. Moderate sits in between."
      ],
      "A strong association does not prove that one variable causes the other. Both may be affected by a third variable, or the link may be coincidence."
    ],
    "remember": "Describe direction, form and strength. A strong association does not prove cause.",
    "a": {
      "q": "On a scatterplot, points slope downwards from left to right and sit close to a straight line. Which description fits best?",
      "opts": [
        "Negative, linear and strong",
        "Positive, linear and strong",
        "Negative, linear and weak",
        "Negative, non-linear and strong"
      ],
      "why": "Points sloping down show a negative direction. A straight line pattern is linear, and points close to the line make it strong. Positive is wrong because the other variable decreases as the first increases.",
      "clue": "Read the points from left to right: do they rise or fall?"
    },
    "b": {
      "d": 3,
      "q": "In Geelong, daily ice cream sales and daily sunburn cases have a strong positive linear association. What does this association show?",
      "opts": [
        "Neither variable is shown to cause the other",
        "Ice cream sales are shown to cause sunburn cases",
        "Sunburn cases are shown to cause ice cream sales",
        "The association is weak, as neither causes the other"
      ],
      "why": "A strong association does not prove cause. A third variable, such as hot sunny weather, may affect both. Saying ice cream sales cause sunburn is tempting, but strength only describes how close the points sit to the pattern.",
      "clue": "Think about what else could affect both variables on a hot day."
    }
  },
  "mat-lines-good-fit": {
    "title": "Lines of good fit",
    "card": [
      "A line of good fit is a straight line drawn by eye through a scatterplot that shows a linear trend. It follows the general direction of the points.",
      "Draw it so that about half the points lie above the line and half below. The points should be spread fairly evenly along it. The line does not need to touch any point.",
      "To predict, pick a value on the horizontal axis. Go up to the line, then across to the vertical axis and read off the value.",
      "Example: a line passes through (2, 10) and (6, 30). At x = 4, the line is at y = 20, the midway value. So the prediction is 20."
    ],
    "remember": "Draw the line by eye through the middle of the points, then read predictions off it.",
    "a": {
      "q": "Which describes a well-drawn line of good fit?",
      "opts": [
        "It follows the trend, with points spread on both sides",
        "It joins the first point to the last point",
        "It passes through as many points as possible",
        "It lies below all of the points"
      ],
      "why": "A good line follows the trend and has about half the points on each side. Joining the first and last points is tempting, but this can leave most points on one side. Touching many points is not required.",
      "clue": "Think about how the points should sit around the line."
    },
    "b": {
      "d": 2,
      "q": "Kai draws a line of good fit that passes through (10, 50) and (30, 90). What does the line predict when x = 20?",
      "opts": ["70", "60", "80", "65"],
      "why": "At x = 20, the line is midway between x = 10 and x = 30. The midway value of y is (50 + 90) ÷ 2 = 70. The value 60 comes from adding only 10 to 50, which does not match the line's steepness.",
      "clue": "x = 20 is exactly halfway between 10 and 30."
    }
  },
  "mat-interpolation-extrapolation-2": {
    "title": "Interpolation and extrapolation",
    "card": [
      "A line of good fit can be used to predict values. The range of the data runs from the smallest to the largest x-value in the data set.",
      [
        "Interpolation",
        "predicting for an x-value inside the range of the data. It is fairly reliable, because the line is built from data on both sides of that value."
      ],
      [
        "Extrapolation",
        "predicting for an x-value outside the range of the data. It is less reliable, because the pattern may not continue beyond the data."
      ],
      "Example: a line is fitted to data for x from 10 to 40. Predicting at x = 25 is interpolation. Predicting at x = 60 is extrapolation."
    ],
    "remember": "Inside the data range is interpolation and fairly reliable. Outside it is extrapolation and less reliable.",
    "a": {
      "q": "A line of good fit is drawn for data with x-values from 20 to 50. Which prediction is extrapolation?",
      "opts": ["Predicting y when x = 70", "Predicting y when x = 35", "Predicting y when x = 22", "Predicting y when x = 48"],
      "why": "The value x = 70 is outside the range of 20 to 50, so it is extrapolation. The values 22, 35 and 48 all lie inside the range, so they are interpolation, even 22 and 48, which sit close to the ends.",
      "clue": "Compare each x-value with the data the line was built from."
    },
    "b": {
      "d": 3,
      "q": "Dana has hours of study (from 2 to 10 hours) and test scores for 30 students. Her line of good fit predicts scores at 6 hours and at 14 hours. Which statement is correct?",
      "opts": [
        "The 6 hour prediction is more reliable than the 14 hour one",
        "The 14 hour prediction is more reliable than the 6 hour one",
        "Both predictions are equally reliable, as they use one line",
        "Neither prediction is reliable, as it is only an estimate"
      ],
      "why": "The value 6 hours is inside the range of 2 to 10, so it is interpolation and fairly reliable. The value 14 hours is outside the range, so it is extrapolation and less reliable, even though both use the same line.",
      "clue": "Which prediction has data on both sides of it?"
    }
  },
  "mat-pythagoras-theorem": {
    "title": "Pythagoras' theorem",
    "card": [
      "A right-angled triangle has one angle of 90°. The longest side, opposite the right angle, is the hypotenuse.",
      "Pythagoras' theorem says a² + b² = c², where c is the hypotenuse and a and b are the other two sides.",
      "To find the hypotenuse, add the squares and take the square root. To find a shorter side, subtract the square of the known short side from c², then take the root. Example: sides 6 and 8 give c² = 36 + 64 = 100, so c = 10.",
      "In a box with length l, width w and height h, the longest straight line from corner to opposite corner is d, where d² = l² + w² + h²."
    ],
    "remember": "Square the sides, add or subtract, then take the square root to get the length.",
    "a": {
      "q": "A right-angled triangle has shorter sides of 5 cm and 12 cm. How long is the hypotenuse?",
      "opts": ["13 cm", "17 cm", "169 cm", "60 cm"],
      "why": "c² = 5² + 12² = 25 + 144 = 169, so c = √169 = 13 cm. The answer 169 stops one step early, because it is c² and not c.",
      "clue": "Square both sides, add, then take the root."
    },
    "b": {
      "d": 3,
      "q": "Tariq has a storage box 2 m long, 3 m wide and 6 m high. What is the longest straight rod that fits inside it from corner to opposite corner?",
      "opts": ["7 m", "11 m", "49 m", "3.6 m"],
      "why": "d² = 2² + 3² + 6² = 4 + 9 + 36 = 49, so d = 7 m. Adding the sides to get 11 m skips the squaring and rooting steps.",
      "clue": "Use all three measurements, each squared."
    }
  },
  "mat-sine-cosine-tangent-ratios": {
    "title": "Sine, cosine and tangent ratios",
    "card": [
      "In a right-angled triangle, name the sides from the angle θ you are using. The hypotenuse is opposite the right angle. The opposite side faces θ. The adjacent side touches θ.",
      "sin θ = opposite ÷ hypotenuse. cos θ = adjacent ÷ hypotenuse. tan θ = opposite ÷ adjacent.",
      "To find a side, put the ratio in an equation and solve it. Example: a 5 m ladder at 60° to the ground reaches 5 × sin 60° = 4.33 m high. To find an angle, use sin⁻¹, cos⁻¹ or tan⁻¹ with the calculator set to degrees.",
      "An angle of elevation is measured up from the horizontal to a line of sight. An angle of depression is measured down from the horizontal. The angle of depression from A to B equals the angle of elevation from B to A, because the two horizontals are parallel."
    ],
    "remember": "Match the two sides you have or want to the ratio: opposite, adjacent, hypotenuse.",
    "a": {
      "q": "A right-angled triangle has an angle θ with opposite side 6 cm and adjacent side 8 cm. Which ratio gives tan θ?",
      "opts": ["6/8", "8/6", "6/10", "8/10"],
      "why": "tan θ = opposite ÷ adjacent = 6/8. The option 8/6 turns the ratio upside down. The hypotenuse is not used in tan, so 6/10 and 8/10 are not tan θ.",
      "clue": "Tan uses the two sides that are not the hypotenuse."
    },
    "b": {
      "d": 3,
      "q": "From the top of a cliff, the angle of depression to a boat is 30°. The boat is 100 m from the base of the cliff, on level water. Which expression gives the cliff's height in metres?",
      "opts": ["100 × tan 30°", "100 × sin 30°", "100 ÷ tan 30°", "100 × cos 30°"],
      "why": "The angle of depression from the cliff top equals the angle of elevation from the boat, so the angle at the boat is 30°. The cliff is opposite it and the 100 m is adjacent, so tan 30° = height ÷ 100 and height = 100 × tan 30°. Dividing by tan 30° is a mistake in rearranging.",
      "clue": "Put the angle at the boat, then name the sides opposite and adjacent to it."
    }
  },
  "mat-sine-cosine-rules": {
    "title": "The sine and cosine rules",
    "card": [
      [
        "Sine rule",
        "a/sin A = b/sin B. Use it when you know a side and the angle opposite it, plus one more side or angle. Example: A = 30°, B = 45°, a = 8 gives b = 8 × sin 45° ÷ sin 30° ≈ 11.3."
      ],
      [
        "Cosine rule",
        "c² = a² + b² − 2ab cos C. Use it when you know two sides and the angle between them, or all three sides."
      ],
      "These rules work in triangles with no right angle. Pythagoras and the basic ratios need a right angle.",
      [
        "Ambiguous case",
        "If you know two sides and an angle that is not between them, the sine rule gives sin B. Both B and 180° − B have that sine, so there may be two triangles. Check that each one has angles adding to less than 180°."
      ]
    ],
    "remember": "Sine rule for opposite pairs. Cosine rule for two sides and the angle between, or three sides.",
    "a": {
      "q": "A triangle has sides of 7 cm and 9 cm with a 50° angle between them. Which rule finds the third side?",
      "opts": ["The cosine rule", "The sine rule", "Pythagoras' theorem", "The tangent ratio"],
      "why": "Two sides and the angle between them are known, so the cosine rule applies. The sine rule needs a side and its opposite angle, and neither is known here.",
      "clue": "Is there a side and angle that sit opposite each other?"
    },
    "b": {
      "d": 3,
      "q": "In triangle ABC, A = 30°, a = 5 m and b = 8 m. Using the sine rule, sin B = 0.8. Which are the possible sizes of angle B?",
      "opts": ["53.1° and 126.9°", "53.1° only", "53.1° and 36.9°", "126.9° only"],
      "why": "sin B = 0.8 gives B = 53.1°, and the second angle is 180° − 53.1° = 126.9°. Both fit with 30°, as 30° + 126.9° is less than 180°. The value 36.9° is 90° − 53.1°, which is not the other angle with that sine.",
      "clue": "Two angles between 0° and 180° share the same sine."
    }
  },
  "mat-bearings-angles-elevation": {
    "title": "Three-figure bearings",
    "card": [
      "A bearing is a direction measured clockwise from north. It is written with three figures and a T, such as 045°T or 135°T.",
      "North is 000°T, east is 090°T, south is 180°T and west is 270°T.",
      "To find the back bearing, add 180° if the bearing is under 180°, or subtract 180° if it is over. Example: if B is on 070°T from A, then A is on 250°T from B.",
      "In navigation problems, draw a north line at each point. North lines are parallel, so they give equal alternate angles. This lets you find angles inside the triangle, then use the sine or cosine rule."
    ],
    "remember": "Measure clockwise from north, and swap direction by adding or subtracting 180°.",
    "a": {
      "q": "A hiker walks from camp to a lookout on a bearing of 125°T. What is the bearing from the lookout back to camp?",
      "opts": ["305°T", "235°T", "055°T", "215°T"],
      "why": "The bearing is under 180°, so add 180°: 125° + 180° = 305°T. The answer 055°T comes from subtracting from 180° instead.",
      "clue": "The return direction is exactly opposite."
    },
    "b": {
      "d": 3,
      "q": "A ship sails from P to Q on a bearing of 070°T, then from Q to R on a bearing of 150°T. What is the interior angle PQR?",
      "opts": ["100°", "80°", "70°", "120°"],
      "why": "The bearing from Q back to P is 070° + 180° = 250°T. The angle between 250°T and 150°T is 100°. The angle 80° is how far the ship turns, not the angle inside the triangle.",
      "clue": "Find the back bearing from Q to P first."
    }
  },
  "mat-displaying-data-2": {
    "title": "Displaying data",
    "card": [
      [
        "Categorical data",
        "A two-way table counts how many people fall in each pair of categories. A segmented bar chart shows the same counts as percentages, so groups of different sizes can be compared."
      ],
      [
        "Numerical data",
        "A dot plot puts one dot per value and suits small sets. A histogram groups values into equal intervals and suits large sets."
      ],
      [
        "Stem plot",
        "A stem plot is also for numerical data. It splits each value into a stem and a leaf, so every value stays visible. If the stem is tens, then 3 | 4 means 34."
      ],
      [
        "Log scale",
        "On a log base 10 scale, 1, 10, 100 and 1000 are equally spaced. Each step is ×10. It suits data spread over several powers of ten."
      ]
    ],
    "remember": "Categories: two-way tables and segmented bar charts. Numbers: dot plots, stem plots and histograms.",
    "a": {
      "q": "A teacher wants a numerical display where every original value can still be read back. Which display should she use?",
      "opts": ["A stem plot", "A histogram", "A segmented bar chart", "A two-way table"],
      "why": "A stem plot keeps each value, because the stem and leaf together give the whole number. A histogram only counts values in each interval, so the exact values are lost. The other two displays are for categories, not numerical values.",
      "clue": "Think about what a histogram bar tells you about the values inside it."
    },
    "b": {
      "d": 2,
      "q": "Ava asks 40 Year 11 and 120 Year 12 students if they work part-time. Which display best compares the percentage who work in each year?",
      "opts": ["A segmented bar chart", "A histogram", "A dot plot", "A stem plot"],
      "why": "Year group and working or not are categories, and the groups differ in size, so percentages give a fair comparison. A segmented bar chart shows percentages. A histogram, dot plot and stem plot are for numerical data, not categories.",
      "clue": "Is the answer to Ava's question a number or a category?"
    }
  },
  "mat-describing-distribution": {
    "title": "Describing a distribution",
    "card": [
      [
        "Shape",
        "A distribution is symmetric if both sides mirror each other. It is positively skewed if the tail stretches to the right, and negatively skewed if the tail stretches to the left."
      ],
      [
        "Centre",
        "The centre is the median (the middle value) or the mean (the average). In a skewed distribution, the mean is pulled towards the tail."
      ],
      [
        "Spread",
        "The spread is the IQR (Q3 − Q1) or the standard deviation. Median and IQR go together, as do mean and standard deviation."
      ],
      [
        "Outliers",
        "An outlier is a value far from the rest. Outliers pull the mean and standard deviation more than the median and IQR, so with skew or outliers, median and IQR are the better pair."
      ]
    ],
    "remember": "Describe shape, centre, spread and outliers, and use median and IQR when data is skewed.",
    "a": {
      "q": "Most scores in a histogram are bunched at the left, with a long tail to the right. What is the shape?",
      "opts": ["Positively skewed", "Negatively skewed", "Symmetric", "Symmetric with outliers"],
      "why": "The tail names the skew, and this tail points right, so it is positively skewed. It is not negatively skewed, which has its tail on the left.",
      "clue": "Look at which way the tail points."
    },
    "b": {
      "d": 3,
      "q": "House prices in a suburb are positively skewed, with a few very expensive mansions. Which pair best describes centre and spread?",
      "opts": ["Median and IQR", "Mean and standard deviation", "Mean and IQR", "Median and standard deviation"],
      "why": "The mansions pull the mean and standard deviation upwards, so they misdescribe most houses. The median and IQR are less affected, and they are the matching pair.",
      "clue": "Which measures are pulled least by extreme values?"
    }
  },
  "mat-boxplots-outliers": {
    "title": "Boxplots and outliers",
    "card": [
      "The IQR is Q3 − Q1. An outlier is a value below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR. These two numbers are the fences.",
      "Example: Q1 = 20 and Q3 = 32. The IQR is 12 and 1.5 × 12 = 18. The fences are 20 − 18 = 2 and 32 + 18 = 50.",
      "A value exactly on a fence is not an outlier. It must be beyond the fence, so 50 is not an outlier but 51 is.",
      "On a boxplot, outliers are drawn as separate points. The whiskers stop at the smallest and largest values that are not outliers."
    ],
    "remember": "Find the IQR, build the fences with 1.5 × IQR, and plot anything beyond them as a point.",
    "a": {
      "q": "A data set has Q1 = 40 and Q3 = 52. What is the upper fence for outliers?",
      "opts": ["70", "64", "88", "18"],
      "why": "IQR = 52 − 40 = 12, and 1.5 × 12 = 18. The upper fence is 52 + 18 = 70. Adding only the IQR gives 64, which skips the 1.5.",
      "clue": "Add 1.5 × IQR to Q3."
    },
    "b": {
      "d": 3,
      "q": "A boxplot of daily bike hires has Q1 = 15 and Q3 = 27. Which value would be drawn as a separate point?",
      "opts": ["46", "45", "44", "42"],
      "why": "IQR = 12, so the upper fence is 27 + 18 = 45. Only 46 is above it. The value 45 is on the fence, so it is not an outlier.",
      "clue": "A value on the fence is not beyond it."
    }
  },
  "mat-68-95-99-7": {
    "title": "The 68-95-99.7% rule",
    "card": [
      "In a bell-shaped distribution, scores cluster around the mean. The 68-95-99.7% rule says how much of the data lies within 1, 2 and 3 standard deviations of the mean.",
      "About 68% of scores lie within 1 standard deviation of the mean. About 95% lie within 2, and about 99.7% lie within 3.",
      "The distribution is symmetric, so the percentages split evenly either side of the mean. Within 1 standard deviation, about 34% lie on each side.",
      "Example: test marks have mean 60 and standard deviation 10. Within 2 standard deviations means 40 to 80, so about 95% of marks are in that range. The other 5% are split evenly, so about 2.5% score above 80."
    ],
    "remember": "The 68-95-99.7% rule: within 1, 2 and 3 standard deviations of the mean lie about 68%, 95% and 99.7%.",
    "a": {
      "q": "The masses of apples from an orchard are bell-shaped, with mean 150 g and standard deviation 10 g. About what percentage of apples have a mass between 130 g and 170 g?",
      "opts": ["95%", "68%", "99.7%", "50%"],
      "why": "130 g and 170 g are each 20 g from the mean, which is 2 standard deviations. About 95% of values lie within 2 standard deviations. 68% is tempting, but that is the share within only 1 standard deviation, 140 g to 160 g.",
      "clue": "Find how many standard deviations 130 g is below the mean."
    },
    "b": {
      "d": 3,
      "q": "The times taken to travel to school are bell-shaped, with mean 30 minutes and standard deviation 5 minutes. About what percentage of trips take more than 40 minutes?",
      "opts": ["2.5%", "5%", "0.15%", "16%"],
      "why": "40 minutes is 2 standard deviations above the mean. About 95% of trips lie within 2 standard deviations, so about 5% lie outside, split evenly between the two ends. That gives 2.5% above 40 minutes. 5% is wrong because it counts both ends.",
      "clue": "The values outside the range are split evenly between both ends."
    }
  },
  "mat-response-explanatory-variables-2": {
    "title": "Scatterplots",
    "card": [
      "A scatterplot shows pairs of numerical data as points on a graph. Each point is one person, place, object or time, with a value for each of two variables.",
      [
        "Explanatory variable",
        "the variable that may explain or influence the other. It goes on the x-axis (horizontal). Choose it by asking which may explain the other, not by number size or the order measured."
      ],
      ["Response variable", "the variable that may respond to the change. It goes on the y-axis (vertical)."],
      "Example: Sam records hours of study and test mark for 12 students. Hours may explain the mark, so hours go on the x-axis and mark on the y-axis. A student with 3 hours and a mark of 60 is plotted at (3, 60)."
    ],
    "remember": "Plot each pair as a point, with the explanatory variable on the x-axis.",
    "a": {
      "q": "A teacher compares each student's hours of sleep the night before with their number of mistakes on a maths quiz. Which variable is placed on the horizontal axis of the scatterplot?",
      "opts": [
        "Hours of sleep, as it may explain the mistakes",
        "Mistakes, as it may explain the hours of sleep",
        "Mistakes, as it is the larger number",
        "Hours of sleep, as it is measured first"
      ],
      "why": "Sleep may influence how many mistakes are made, so it is the explanatory variable and goes on the x-axis. The size of the numbers or the order of measuring does not decide the axis.",
      "clue": "Which variable may explain the other?"
    },
    "b": {
      "d": 2,
      "q": "Mia records the daily maximum temperature and the number of ice creams sold at her stall in Lorne, Victoria. She draws a scatterplot to see if the two are related. On Monday it was 30°C and she sold 85. Which point is plotted for Monday?",
      "opts": ["(30, 85)", "(85, 30)", "(30, 30)", "(85, 85)"],
      "why": "Temperature may explain sales, so it is the explanatory variable and goes on the x-axis. Monday is plotted as (30, 85). The point (85, 30) swaps the axes.",
      "clue": "Which variable might explain the other? It is the x value."
    }
  },
  "mat-associations-between-categorical-variables": {
    "title": "Associations between categorical variables",
    "card": [
      "A two-way table shows counts for two categorical variables at once. One variable runs down the rows and the other across the columns.",
      "Raw counts can mislead when the groups differ in size. So turn the counts into percentages of each column total, or each row total, as set by the explanatory variable.",
      "Percentages are taken within each group of the explanatory variable. Then compare them across the groups. Example: 30 of 60 Year 11 students walk to school (50%), and 20 of 80 Year 12 students do (25%).",
      "If the percentages differ clearly between the groups, there is an association. If they are about the same, there is no association. In the example, walking is associated with year level."
    ],
    "remember": "Find percentages within each explanatory group, then compare them. Clearly different percentages mean an association.",
    "a": {
      "q": "In a survey, 40 of 80 members of Club A and 30 of 60 members of Club B prefer swimming. What does this show about club and preference?",
      "opts": [
        "No association, as 50% of each club prefer swimming",
        "An association, as 40% of Club A and 30% of Club B do",
        "An association, as 57% of all swimmers are in Club A",
        "An association, as Club A has 33% more swimmers than B"
      ],
      "why": "Club A: 40 ÷ 80 = 50%. Club B: 30 ÷ 60 = 50%. The percentages within each club are the same, so there is no association. Treating the counts 40 and 30 as percentages is tempting, but the clubs differ in size, so counts mislead.",
      "clue": "Turn each count into a percentage of its own club."
    },
    "b": {
      "d": 3,
      "q": "In a school, 54 of 90 Year 9 students and 36 of 120 Year 10 students own a bike. Which statement is correct?",
      "opts": [
        "Bike ownership is associated with year level, 60% to 30%",
        "Bike ownership is associated with year level, 54% to 36%",
        "Bike ownership is not associated with year level, as 90 > 36",
        "Bike ownership is not associated with year level, as 54 > 36"
      ],
      "why": "Year 9: 54 ÷ 90 = 60%. Year 10: 36 ÷ 120 = 30%. The percentages differ clearly, so there is an association. The numbers 54 and 36 are counts, not percentages, so quoting them as percentages is a mistake.",
      "clue": "Divide each count by its own year total, not by the overall total."
    }
  },
  "mat-numerical-categorical-variable": {
    "title": "A numerical and a categorical variable",
    "card": [
      "To see if a numerical variable differs across groups, compare its values for each group of a categorical variable. Use back-to-back stem plots, parallel dot plots or parallel boxplots.",
      "Compare three things: centre (median), spread (range or IQR) and shape. Say which group is higher, which is more spread out, and by how much.",
      "If the medians are clearly different, there is an association between the two variables. A difference is clear when it is large compared with the spread of the data. Similar medians alone do not rule out an association, as spread or shape may still differ.",
      "Example: Group A has a median of 40 and Group B has a median of 55, and both have an IQR of about 5. The medians are far apart compared with the spread, so the numerical variable is associated with the group."
    ],
    "remember": "Compare the centre, spread and shape of each group. Medians that are far apart compared with the spread suggest an association.",
    "a": {
      "q": "Parallel boxplots show the times to run 1 km for Year 9 students (median 5.5 minutes, IQR 0.2) and Year 12 students (median 4.5 minutes, IQR 0.2). What does this suggest?",
      "opts": [
        "Run time is associated with year level",
        "Run time is not associated with year level",
        "Year 12 students have a larger spread",
        "Year 9 students have a lower median"
      ],
      "why": "The medians differ by 1 minute, which is large compared with an IQR of 0.2 for each group. So the difference is clear and run time is associated with year level. The spread is the same in both groups, so the spread option is wrong.",
      "clue": "Compare the gap between medians with the IQR."
    },
    "b": {
      "d": 3,
      "q": "Parallel boxplots show the daily steps of two groups. Group X has a median of 8000 and an IQR of 1000. Group Y has a median of 8000 and an IQR of 4000. Which statement is best?",
      "opts": [
        "The centres are the same, but Y is more spread out",
        "The centres are the same, but X is more spread out",
        "Y has a higher median than X, with the same spread",
        "X and Y are the same in centre and spread"
      ],
      "why": "Both medians are 8000, so the centres match. Y has the larger IQR, so its steps vary more from person to person. Equal medians do not mean the groups are alike in spread.",
      "clue": "A larger IQR means a wider middle half."
    }
  },
  "mat-correlation-causation-2": {
    "title": "Correlation and causation",
    "card": [
      "Two variables can be correlated, which means they move together, without one causing the other.",
      "Another variable may explain both. This is a lurking variable. Hot weather raises both ice cream sales and drowning numbers, so the two are correlated.",
      "Observing data alone cannot show cause. It shows only that variables are associated.",
      "A controlled experiment can show cause. Subjects are assigned to groups at random and only the explanatory variable is changed, so other factors are spread evenly across the groups."
    ],
    "remember": "Correlation is not causation. Only a controlled experiment can show cause.",
    "a": {
      "q": "A survey finds that towns with more pools have more sunburn cases. Which is the best conclusion?",
      "opts": [
        "The two are associated, but cause is not shown",
        "Pools cause sunburn in these towns",
        "Sunburn causes towns to build more pools",
        "Pools and sunburn have no association"
      ],
      "why": "The survey observed the towns and did not run an experiment, so it cannot show cause. A lurking variable such as hot weather may explain both. Pools causing sunburn is only one possible explanation.",
      "clue": "Was anything controlled in this survey?"
    },
    "b": {
      "d": 3,
      "q": "Leila wants to test if a new study app raises marks. Which plan could show that the app causes higher marks?",
      "opts": [
        "Randomly give the app to half of a class and compare",
        "Compare marks of students who chose to use the app",
        "Ask students if they think the app helps their marks",
        "Check if app use and marks are highly correlated"
      ],
      "why": "Random assignment spreads other factors evenly across both groups, so a difference in marks can be put down to the app. Students who choose the app may already be more motivated, so comparing them cannot show cause.",
      "clue": "Who decides which students get the app?"
    }
  },
  "mat-least-squares-regression-line-2": {
    "title": "Least squares regression line",
    "card": [
      "The least squares regression line is written y = a + bx. It is the line that makes the sum of the squared residuals as small as possible, which is where its name comes from.",
      "The slope is b = r × sy/sx. Here r is the correlation coefficient, sy is the standard deviation of the response y, and sx is the standard deviation of the explanatory variable x.",
      "The intercept is a = ȳ − b × x̄, where x̄ and ȳ are the means. This means the line always passes through the point (x̄, ȳ).",
      "Worked example: r = 0.8, sx = 5, sy = 10. Then b = 0.8 × 10/5 = 1.6. If x̄ = 20 and ȳ = 50, then a = 50 − 1.6 × 20 = 50 − 32 = 18."
    ],
    "remember": "Slope b = r × sy/sx, and the line passes through (x̄, ȳ).",
    "a": {
      "q": "A data set has r = 0.6, sx = 4 and sy = 12. What is the slope of the least squares line?",
      "opts": ["1.8", "0.2", "7.2", "3"],
      "why": "b = r × sy/sx = 0.6 × 12/4 = 0.6 × 3 = 1.8. Using sx/sy instead gives 0.6 × 4/12 = 0.2, which turns the ratio upside down. Leaving out r gives 3.",
      "clue": "The standard deviation of y goes on top."
    },
    "b": {
      "d": 3,
      "q": "For a group of runners, x̄ = 30, ȳ = 60, and the least squares line has slope 1.5. What is the intercept a?",
      "opts": ["15", "−15", "45", "105"],
      "why": "a = ȳ − b × x̄ = 60 − 1.5 × 30 = 60 − 45 = 15. The value 45 is just b × x̄ with the subtraction from ȳ skipped, and adding instead of subtracting gives 105. Subtracting the wrong way round, 45 − 60, gives −15.",
      "clue": "The line passes through the point of the two means."
    }
  },
  "mat-interpreting-slope-intercept": {
    "title": "Interpreting slope and intercept",
    "card": [
      "In a fitted line y = a + bx, y is the response variable and x is the explanatory variable. The slope is b and the intercept is a.",
      [
        "Slope",
        "the predicted change in y for each increase of 1 unit in x. If b is negative, y is predicted to fall as x rises."
      ],
      [
        "Intercept",
        "the predicted value of y when x = 0. It only makes sense if x = 0 is a realistic value for the situation."
      ],
      "Example: cost = 40 + 6 × hours, with cost in dollars and time in hours. Each extra hour adds $6 to the predicted cost. At 0 hours the predicted cost is $40."
    ],
    "remember": "Slope: change in y per 1 unit of x. Intercept: predicted y when x is 0.",
    "a": {
      "q": "A line predicts a plant's height (cm) from days of growth: height = 12 + 3 × days. What does the slope of 3 mean?",
      "opts": [
        "Height is predicted to rise by 3 cm each day",
        "Height is predicted to be 3 cm after 12 days",
        "The plant is predicted to be 3 cm tall at the start",
        "Height is predicted to rise by 12 cm every 3 days"
      ],
      "why": "The slope is the change in height for each extra day, so 3 cm per day. The 12 is the intercept, which is the predicted height at 0 days, so the option about the start is the intercept's meaning wrongly given to the slope.",
      "clue": "The slope is the change in y for each 1 unit of x."
    },
    "b": {
      "d": 3,
      "q": "Leo's data give: phone battery left (%) = 95 − 8 × hours of use. Which statement is correct?",
      "opts": [
        "Battery is predicted to fall 8 percentage points per hour",
        "Battery is predicted to be 8% after 95 hours of use",
        "Battery is predicted to rise 8 percentage points per hour",
        "Battery is predicted to fall 95 percentage points per hour"
      ],
      "why": "The slope is −8, so each extra hour of use is predicted to lower the battery by 8 percentage points. The option saying it rises ignores the negative sign. The 95 is the intercept, the predicted battery at 0 hours.",
      "clue": "Check the sign of the slope, then ask what 1 unit of x is."
    }
  },
  "mat-coefficient-determination": {
    "title": "The coefficient of determination",
    "card": [
      "The coefficient of determination is r². It is found by squaring the correlation coefficient r, so it is always between 0 and 1.",
      "r² is the proportion of the variation in the response variable explained by the variation in the explanatory variable. Multiply by 100 to write it as a percentage. The rest, 1 − r², is due to other factors.",
      "To go back from r² to r, take the square root. Give r the sign of the association: negative if y tends to fall as x rises.",
      "Worked example: r = −0.7. Then r² = 0.49, so 49% of the variation in y is explained by x. The other 51% is not."
    ],
    "remember": "Square r to find the share of variation in y explained by x. The rest is not explained.",
    "a": {
      "q": "A data set has r = 0.9. What percentage of the variation in y is explained by x?",
      "opts": ["81%", "90%", "9%", "19%"],
      "why": "r² = 0.9 × 0.9 = 0.81, so 81% is explained. Giving 90% mistakes r for r². The value 19% is the part not explained.",
      "clue": "Square r before turning it into a percentage."
    },
    "b": {
      "d": 3,
      "q": "For a sample of bakeries, r² = 0.36 between the price of a loaf and loaves sold each day. The association is negative. What is r, and what percentage is not explained by price?",
      "opts": [
        "r = −0.6, and 64% is not explained",
        "r = −0.6, and 36% is not explained",
        "r = −0.36, and 64% is not explained",
        "r = 0.6, and 64% is not explained"
      ],
      "why": "r = −√0.36 = −0.6, negative because sales fall as price rises. The unexplained part is 1 − 0.36 = 0.64, or 64%. The 36% is the explained part, not the unexplained part.",
      "clue": "Take the square root, then check the direction of the association."
    }
  },
  "mat-residuals-residual-plots": {
    "title": "Residuals and residual plots",
    "card": [
      "A residual is the actual value minus the predicted value: residual = y − ŷ. The predicted value ŷ comes from the regression line.",
      "A positive residual means the point is above the line, so the line predicted too low. A negative residual means the point is below the line.",
      "A residual plot graphs the residuals against x. A plot with no clear pattern, with points scattered randomly about zero, supports a linear model.",
      "A curve or other clear pattern in the residual plot shows a linear model is not suitable. Worked example: actual y = 40 and predicted ŷ = 46 gives a residual of 40 − 46 = −6."
    ],
    "remember": "Residual = actual − predicted. A random scatter supports a line.",
    "a": {
      "q": "A line predicts a plant height of 25 cm. The plant is actually 22 cm tall. What is the residual?",
      "opts": ["−3 cm", "3 cm", "−47 cm", "47 cm"],
      "why": "Residual = actual − predicted = 22 − 25 = −3 cm. The answer 3 cm reverses the subtraction, which is the tempting sign error.",
      "clue": "Actual comes first in the subtraction."
    },
    "b": {
      "d": 2,
      "q": "The residual plot for a linear model shows a clear U-shaped curve. What does this suggest?",
      "opts": [
        "A linear model is not suitable",
        "A linear model is a good fit",
        "The correlation must be zero",
        "The data has no outliers"
      ],
      "why": "A clear pattern such as a curve means the line is missing structure in the data, so a linear model is not suitable. A good fit would show random scatter with no pattern.",
      "clue": "Which kind of residual plot supports a line?"
    }
  },
  "mat-data-transformations": {
    "title": "Data transformations",
    "card": [
      "A straight line fits poorly when a scatterplot is curved. A transformation changes one variable so the plot becomes closer to a straight line.",
      "You can transform either variable. Common choices are squaring (x² or y²), taking the logarithm (log x or log y) and taking the reciprocal (1/x or 1/y).",
      "Choose the transformation by the shape of the curve. After transforming, plot the new variable against the other one and check that the plot looks straighter.",
      "Then fit the least squares line to the transformed data. Example: if y rises more and more steeply as x increases, try y against x², which can straighten the plot."
    ],
    "remember": "Transform a variable to straighten a curve, then fit a line to the straighter plot.",
    "a": {
      "q": "Why would a student transform a variable before fitting a line to a curved scatterplot?",
      "opts": [
        "To make the relationship closer to a straight line",
        "To make every data point sit exactly on the line",
        "To change the response variable into the explanatory one",
        "To remove the data points that are far from the others"
      ],
      "why": "A transformation changes the scale of one variable so a curved plot becomes closer to linear. It does not make every point lie exactly on a line, and it does not remove any points.",
      "clue": "Think about what shape a line fits well."
    },
    "b": {
      "d": 2,
      "q": "Ava's scatterplot of y against x curves upward, getting steeper. She plots y against x² and the points now look roughly straight. What should she do next?",
      "opts": [
        "Fit a least squares line to y against x²",
        "Fit a least squares line to the original y against x",
        "Delete the points that look furthest from the line",
        "Swap the variables and plot x² against y"
      ],
      "why": "The straighter plot is y against x², so the line should be fitted to those transformed data. Fitting to the original data would use the curved plot, which a line fits poorly.",
      "clue": "Fit the line to the plot that looks straight."
    }
  },
  "mat-recurrence-relations-finance": {
    "title": "Recurrence relations for finance",
    "card": [
      "A recurrence relation gives the next value from the one before it. In finance, V(n) is the balance after n periods, and V(0) is the starting balance.",
      "A first-order linear recurrence has the form V(n+1) = R × V(n) + d. R is the number that multiplies the balance each period. d is the amount added each period, or taken off if d is negative.",
      "On its own, R above 1 makes the balance grow and R between 0 and 1 makes it shrink. For example, R = 1.02 is a 2% rise each period. The d term can change whether the balance grows or shrinks overall.",
      "Worked example: V(0) = 500, V(n+1) = 1.1 × V(n) + 50. Multiply first, then add d. V(1) = 1.1 × 500 + 50 = 600. Then V(2) = 1.1 × 600 + 50 = 710."
    ],
    "remember": "Next balance = R × this balance + d. Work one period at a time.",
    "a": {
      "q": "A balance starts at 200 and V(n+1) = 1.5 × V(n) − 40. What is V(2)?",
      "opts": ["350", "260", "300", "550"],
      "why": "V(1) = 1.5 × 200 − 40 = 260. Then V(2) = 1.5 × 260 − 40 = 390 − 40 = 350. The option 260 is only V(1), one period too early.",
      "clue": "Find V(1) first, then use it to find V(2)."
    },
    "b": {
      "d": 2,
      "q": "Mia's savings in Bendigo follow V(n+1) = 1.01 × V(n) + 100, with V(0) = 1000. What is V(1)?",
      "opts": ["1110", "1100", "1010", "1111"],
      "why": "V(1) = 1.01 × 1000 + 100 = 1010 + 100 = 1110. Adding 100 first and then multiplying gives 1.01 × 1100 = 1111, which uses the wrong order. Stopping at 1010 leaves out d.",
      "clue": "Multiply by R first, then add d."
    }
  },
  "mat-flat-rate-depreciation": {
    "title": "Flat-rate depreciation",
    "card": [
      "Depreciation is the fall in an asset's value over time. With flat-rate depreciation, the asset loses the same dollar amount each period.",
      "The rule is V(n+1) = V(n) − d, where V(0) is the starting value and d is the amount lost each period. The value after n periods is V(n) = V(0) − d × n.",
      "The graph of value against time is a straight line going down. The gradient is −d.",
      "Example: a $12 000 printer loses $1500 each year. After 4 years, V(4) = 12 000 − 1500 × 4 = $6000."
    ],
    "remember": "Flat-rate depreciation takes off the same dollar amount every period, so the value falls in a straight line.",
    "a": {
      "q": "A machine is bought for $20 000 and loses $2500 in value each year. What is its value after 3 years?",
      "opts": ["$12 500", "$17 500", "$10 000", "$27 500"],
      "why": "V(3) = 20 000 − 2500 × 3 = 20 000 − 7500 = $12 500. The value $17 500 is only the value after 1 year, because the loss was taken off once instead of three times.",
      "clue": "Take the yearly loss off once for each year."
    },
    "b": {
      "d": 3,
      "q": "Mia's café buys an oven for $9000. After 5 years its value is $4000 using flat-rate depreciation. How much value does it lose each year?",
      "opts": ["$1000", "$800", "$1800", "$5000"],
      "why": "The total loss is 9000 − 4000 = $5000 over 5 years. So d = 5000 ÷ 5 = $1000 a year. The value $5000 is the total loss, not the loss for one year.",
      "clue": "Find the total fall in value, then share it across the years."
    }
  },
  "mat-unit-cost-depreciation": {
    "title": "Unit cost depreciation",
    "card": [
      "Some assets lose value because of how much they are used, not how long they are owned. Unit cost depreciation takes off a fixed amount for each unit of use, such as each kilometre driven or each hour a machine runs.",
      "Depreciation = cost per unit × number of units used. Value after use = purchase price − depreciation.",
      "Example: a van costs $40 000 and depreciates by $0.20 per km. After 60 000 km, depreciation = 0.20 × 60 000 = $12 000. The value is 40 000 − 12 000 = $28 000.",
      "The value falls by the same amount for each unit used. If the asset is not used in a year, it does not lose value that year."
    ],
    "remember": "Unit cost depreciation: value = purchase price − (cost per unit × units used).",
    "a": {
      "q": "A delivery truck costs $90 000 and depreciates by $0.30 per km. What is its value after 50 000 km?",
      "opts": ["$75 000", "$15 000", "$89 950", "$60 000"],
      "why": "Depreciation = 0.30 × 50 000 = $15 000. The value is 90 000 − 15 000 = $75 000. The $15 000 option is the depreciation, not the value left.",
      "clue": "Find the amount lost first, then take it from the price."
    },
    "b": {
      "d": 3,
      "q": "Priya's printing press cost $24 000. It depreciates by $0.05 per page printed. It has printed 200 000 pages and is not in use this month. What is its value now?",
      "opts": ["$14 000", "$10 000", "$23 990", "$24 000"],
      "why": "Depreciation = 0.05 × 200 000 = $10 000, so the value is 24 000 − 10 000 = $14 000. Time spent idle adds no depreciation, because this method depends only on use. The $10 000 option is the amount lost, not the value.",
      "clue": "Only pages printed count, not the months passed."
    }
  },
  "mat-simple-compound-interest-unit": {
    "title": "Simple and compound interest",
    "card": [
      [
        "Simple interest",
        "The same dollar amount is added each period, found from the starting amount only. Interest per period = P × r, where P is the principal and r is the rate per period as a decimal."
      ],
      [
        "Compound interest",
        "Interest is a percentage of the current balance, so it grows as the balance grows. Each period the balance is multiplied by 1 + r."
      ],
      "Recurrence rules: simple interest is V(n+1) = V(n) + P × r. Compound interest is V(n+1) = (1 + r) × V(n).",
      "Example: $2000 at 5% per year. Simple: $2000, $2100, $2200. Compound: $2000, $2100, $2205."
    ],
    "remember": "Simple adds the same dollars each period. Compound multiplies the balance each period.",
    "a": {
      "q": "Which recurrence rule models $800 invested at 4% per year compound interest?",
      "opts": ["V(n+1) = 1.04 × V(n)", "V(n+1) = V(n) + 0.04", "V(n+1) = V(n) + 32", "V(n+1) = 0.04 × V(n)"],
      "why": "Compound interest multiplies the balance by 1 + 0.04 = 1.04 each year. V(n) + 32 is the rule for simple interest, because it adds the same amount each year. 0.04 × V(n) would leave only the interest, not the whole balance.",
      "clue": "The balance is multiplied each year, and the old balance is kept."
    },
    "b": {
      "d": 3,
      "q": "Priya invests $5000 at 6% per year simple interest. What is the balance after 3 years?",
      "opts": ["$5900", "$5955.08", "$5300", "$5600"],
      "why": "Simple interest is 5000 × 0.06 = $300 each year, so 3 years adds $900 and the balance is $5900. $5955.08 is the compound answer, 5000 × 1.06³, which multiplies the balance instead of adding the same sum each year. $5300 and $5600 are only one and two years of interest.",
      "clue": "Add the same dollar amount every year, found from the starting $5000."
    }
  },
  "mat-effective-annual-interest-rate": {
    "title": "Effective annual interest rate",
    "card": [
      "A nominal rate is the yearly rate that is quoted. If it is compounded more often than once a year, the balance grows by more than the nominal rate over the year.",
      "The effective annual rate is the single yearly rate that gives the same growth in one year. Formula: r(eff) = (1 + r/(100n))^n − 1, then × 100 for a percentage. Here r is the nominal rate in % and n is the number of compounding periods per year.",
      "Example: 6% compounded quarterly. Each quarter earns 6 ÷ 4 = 1.5%. After one year the balance is 1.015⁴ = 1.0614 times the start, so the effective rate is about 6.14%.",
      "More frequent compounding gives a higher effective rate. Compounding once a year gives an effective rate equal to the nominal rate."
    ],
    "remember": "Effective rate = growth factor over one year, minus 1. More compounding means a higher effective rate.",
    "a": {
      "q": "A savings account pays 4% per year, compounded annually. What is its effective annual interest rate?",
      "opts": ["4%", "4.04%", "2%", "8%"],
      "why": "With one compounding period a year, the balance grows by exactly 4% in a year, so the effective rate equals the nominal rate. 4.04% would be the rate if compounding were twice a year.",
      "clue": "How many times a year is the interest added?"
    },
    "b": {
      "d": 3,
      "q": "Mia's account pays 6% per year, compounded monthly. Her friend Sam's account pays 6% per year, compounded quarterly. Which statement is correct?",
      "opts": [
        "Mia's effective rate is higher than Sam's",
        "Sam's effective rate is higher than Mia's",
        "Both have an effective rate of exactly 6%",
        "Both have the same effective rate above 6%"
      ],
      "why": "Both nominal rates are 6%, but monthly compounding adds interest to the balance more often than quarterly does. Mia's effective rate is about 6.17% and Sam's is about 6.14%. The equal nominal rate is the tempting trap, as it does not make the effective rates equal.",
      "clue": "Compare how often interest is added to the balance."
    }
  },
  "mat-amortisation-tables": {
    "title": "Amortisation tables",
    "card": [
      "An amortisation table lists a loan period by period. Its columns are the payment, the interest, the reduction in principal and the balance.",
      "Interest = balance at the start of the period × the interest rate for that period. Reduction in principal = payment − interest.",
      "Each period the interest is added to the balance and the whole payment is taken off. So new balance = old balance + interest − payment, which equals old balance − reduction in principal.",
      "Example: a $10 000 loan has interest of 6% per year, charged yearly, with a payment of $2000. Interest = 10 000 × 0.06 = $600. Reduction in principal = 2000 − 600 = $1400. New balance = 10 000 + 600 − 2000 = $8600."
    ],
    "remember": "Part of each payment covers the interest. Only what is left over cuts the balance.",
    "a": {
      "q": "A loan balance is $5000 and the interest rate is 4% per period. The payment is $1000. What is the reduction in principal for this period?",
      "opts": ["$800", "$200", "$1000", "$1200"],
      "why": "Interest = 5000 × 0.04 = $200. Reduction in principal = 1000 − 200 = $800. The $200 is the interest, which the payment must cover first, so it is not the amount that reduces the principal.",
      "clue": "Find the interest first, then take it from the payment."
    },
    "b": {
      "d": 3,
      "q": "Priya has a loan with a balance of $8000. The interest is 3% per period and the payment is $1500. What is the balance after this payment?",
      "opts": ["$6740", "$6500", "$6260", "$7760"],
      "why": "Interest = 8000 × 0.03 = $240. New balance = 8000 + 240 − 1500 = $6740, the same as 8000 − 1260. $6500 is wrong because it ignores the interest added to the balance, and $6260 takes the interest off instead of adding it.",
      "clue": "Interest is added to the balance before the payment comes off."
    }
  },
  "mat-annuities": {
    "title": "Annuities",
    "card": [
      "An annuity is an investment that pays out a regular amount each period. The balance earns interest, but the payouts take money out, so the balance falls until it reaches zero.",
      "Each period: new balance = old balance + interest − payout. Interest is worked out on the old balance. Repeat for the next period, starting from the new balance.",
      "Example: $10 000 earns 6% per year and pays out $2000 at the end of each year. Interest = 6% × 10 000 = $600. New balance = 10 000 + 600 − 2000 = $8600.",
      "If the payout is bigger than the interest, the balance falls. If the payout is smaller than the interest, the balance would rise, so it would not be run down to zero."
    ],
    "remember": "Annuity: balance + interest − payout each period, so the balance falls.",
    "a": {
      "q": "An annuity of $20 000 earns 5% per year and pays out $3000 at the end of each year. What is the balance after the first payout?",
      "opts": ["$18 000", "$17 000", "$17 850", "$21 000"],
      "why": "Interest = 5% × 20 000 = $1000. New balance = 20 000 + 1000 − 3000 = $18 000. Taking away only the payout gives $17 000, which leaves out the interest.",
      "clue": "Add the interest first, then take off the payout."
    },
    "b": {
      "d": 3,
      "q": "Priya's annuity of $50 000 earns 4% per year. It pays out $6000 at the end of each year. What is the balance after two payouts?",
      "opts": ["$41 840", "$42 000", "$38 000", "$46 000"],
      "why": "Year 1: interest is 4% × 50 000 = $2000, so the balance is 50 000 + 2000 − 6000 = $46 000. Year 2: interest is 4% × 46 000 = $1840, so the balance is 46 000 + 1840 − 6000 = $41 840. $42 000 comes from using $2000 interest both years, but interest must be worked out on the new, smaller balance.",
      "clue": "Work out the interest again on the new balance in year 2."
    }
  },
  "mat-perpetuities": {
    "title": "Perpetuities",
    "card": [
      "A perpetuity is an investment that pays out only the interest it earns each period. The balance stays the same, so the payments can go on forever.",
      "Payment = principal × interest rate per period. The rate must match the payment period, so a yearly rate of 6% paid monthly becomes 0.5% per month.",
      "Worked example: $200 000 invested at 5% per year, paid yearly. Payment = 200 000 × 0.05 = $10 000 each year, and the balance stays at $200 000.",
      "To find the principal needed for a set payment, rearrange: principal = payment ÷ interest rate per period."
    ],
    "remember": "A perpetuity pays only the interest, so the balance never falls.",
    "a": {
      "q": "$300 000 is invested in a perpetuity at 4% per year, paid yearly. What is the yearly payment?",
      "opts": ["$12 000", "$7 500 000", "$312 000", "$1 200"],
      "why": "Payment = 300 000 × 0.04 = $12 000. Dividing by 0.04 instead gives 300 000 ÷ 0.04 = $7 500 000, which uses the rearranged rule for a principal, not a payment. $312 000 adds the interest to the balance, but a perpetuity pays out only the interest.",
      "clue": "Multiply the principal by the rate."
    },
    "b": {
      "d": 3,
      "q": "Priya wants a perpetuity paying $2 000 each month. The interest rate is 6% per year, paid monthly. What principal does she need?",
      "opts": ["$400 000", "$33 333", "$24 000", "$40 000"],
      "why": "The monthly rate is 6% ÷ 12 = 0.5%. Principal = 2 000 ÷ 0.005 = $400 000. Using 6% gives $33 333, which mixes a yearly rate with a monthly payment.",
      "clue": "Change the yearly rate to a monthly rate first."
    }
  },
  "mat-compound-interest-with-regular": {
    "title": "Compound interest with regular additions",
    "card": [
      "This investment earns compound interest, and the same amount is also added at the end of every period. The balance grows from both.",
      "Each period: new balance = old balance × (1 + r) + deposit, where r is the interest rate for one period as a decimal. Divide an annual rate by the number of periods in a year.",
      "Example: start with $1000, interest 10% per year, add $200 at the end of each year. After year 1: 1000 × 1.10 + 200 = $1300.",
      "After year 2: 1300 × 1.10 + 200 = $1630. The interest is worked out on the whole balance, including earlier deposits and earlier interest."
    ],
    "remember": "Multiply the balance by (1 + r), then add the deposit, and repeat.",
    "a": {
      "q": "An account has $2000, earns 5% per year, and $500 is added at the end of each year. What is the balance after year 1?",
      "opts": ["$2600", "$2500", "$2100", "$2625"],
      "why": "New balance = 2000 × 1.05 + 500 = 2100 + 500 = $2600. $2625 adds the deposit before the interest, but the deposit comes at the end of the year. $2500 skips the interest, and $2100 leaves out the deposit.",
      "clue": "Add the interest first, then the deposit."
    },
    "b": {
      "d": 3,
      "q": "Priya opens a savings account with $1000. It earns 6% per year, and she adds $100 at the end of each year. What is the balance after year 2?",
      "opts": ["$1329.60", "$1341.96", "$1320.00", "$1123.60"],
      "why": "Year 1: 1000 × 1.06 + 100 = $1160. Year 2: 1160 × 1.06 + 100 = 1229.60 + 100 = $1329.60. $1341.96 adds each deposit before the interest, $1320.00 pays interest only on the first $1000, and $1123.60 leaves out the deposits.",
      "clue": "Work out year 1 first, then use that balance for year 2."
    }
  },
  "mat-using-finance-solver": {
    "title": "Using a finance solver",
    "card": [
      "A finance solver is a tool on a calculator or in software. You enter four of N, I%, PV, PMT and FV, and it finds the fifth. It also needs PPY, the payments per year, and CPY, the compounding periods per year.",
      "N is the number of payments. I% is the annual interest rate. PV is the amount at the start. PMT is the regular payment, or 0 if there is none. FV is the amount at the end.",
      "Choose one person's point of view and keep it. Money that person receives is positive. Money that person pays out is negative. If the signs are wrong, the solver gives a wrong or impossible answer.",
      "Example: from your point of view, you borrow $20 000, so PV = 20 000. You repay PMT = -500 each month at 6% a year, and FV = 0 at the end. The solver then gives N, the number of months to repay."
    ],
    "remember": "Enter four values, find the fifth, and sign money in and out from one point of view.",
    "a": {
      "q": "Sam borrows $15 000 to buy a car. From Sam's point of view, how should PV and PMT be entered in a finance solver?",
      "opts": [
        "PV = 15 000 and PMT as a negative number",
        "PV = -15 000 and PMT as a negative number",
        "PV = 15 000 and PMT as a positive number",
        "PV = -15 000 and PMT as a positive number"
      ],
      "why": "Sam receives the loan, so PV is positive for Sam. Sam pays out each repayment, so PMT is negative. PV = -15 000 with PMT positive is the lender's point of view, not Sam's.",
      "clue": "Which amount does Sam receive, and which does Sam pay out?"
    },
    "b": {
      "d": 3,
      "q": "Priya puts $8 000 into an account. She will add nothing more and wants FV after 5 years. From Priya's point of view, what are PV and PMT?",
      "opts": [
        "PV = -8 000 and PMT = 0",
        "PV = 8 000 and PMT = 0",
        "PV = -8 000 and PMT = 8 000",
        "PV = 8 000 and PMT = -8 000"
      ],
      "why": "Priya pays the $8 000 into the account, so it is money out for her and PV is negative. She makes no regular additions, so PMT is 0. Entering PV as positive is tempting because it is the starting amount, but for Priya it is money paid out.",
      "clue": "Does Priya receive the $8 000 or pay it in?"
    }
  },
  "mat-types-matrices": {
    "title": "Types of matrices",
    "card": [
      "The order of a matrix is rows × columns, so a 2 × 3 matrix has 2 rows and 3 columns. A row matrix has one row, a column matrix has one column, and a square matrix has equal numbers of rows and columns.",
      "The main diagonal of a square matrix runs from top left to bottom right. A diagonal matrix has 0s everywhere off it. An upper triangular matrix has 0s everywhere below it, and a lower triangular matrix has 0s everywhere above it.",
      "A symmetric matrix is square, and each element equals the one in its mirror position across the main diagonal. The identity matrix I has 1s on the main diagonal and 0s elsewhere. A zero matrix has every element 0, and a binary matrix has only 0s and 1s.",
      "The transpose swaps rows and columns, so row 1 becomes column 1. For example, the transpose of [1 2 3] is a column matrix with 1, 2, 3 going down. A 2 × 3 matrix has a 3 × 2 transpose."
    ],
    "remember": "Order is rows × columns. The transpose swaps rows and columns, so the order flips.",
    "a": {
      "q": "Matrix M has 4 rows and 2 columns. What is the order of the transpose of M?",
      "opts": ["2 × 4", "4 × 2", "2 × 2", "4 × 4"],
      "why": "The transpose swaps rows and columns, so 4 rows and 2 columns become 2 rows and 4 columns. The order is 2 × 4. The order 4 × 2 is the original matrix, which comes from forgetting to swap.",
      "clue": "Swap the number of rows and the number of columns."
    },
    "b": {
      "d": 3,
      "q": "Which matrix is symmetric? Rows are separated by a semicolon.",
      "opts": ["[2 5; 5 3]", "[2 5; 3 5]", "[2 0; 5 3]", "[2 5 3; 5 3 1]"],
      "why": "In [2 5; 5 3] the elements in row 1, column 2 and row 2, column 1 are both 5, so it matches its mirror image. [2 0; 5 3] is lower triangular, not symmetric, because 0 and 5 differ. [2 5 3; 5 3 1] is not square, so it cannot be symmetric.",
      "clue": "A symmetric matrix must be square, and its mirror positions must match."
    }
  },
  "mat-building-matrix-from-rule": {
    "title": "Building a matrix from a rule",
    "card": [
      "The element in row i and column j is written aᵢⱼ. The first number, i, is the row. The second number, j, is the column.",
      "A rule gives aᵢⱼ in terms of i and j. To build the matrix, put each row number and column number into the rule, one position at a time.",
      "The order tells you how many rows and columns to fill. A 2 × 3 matrix has i = 1, 2 and j = 1, 2, 3.",
      "Example: for a 2 × 2 matrix with aᵢⱼ = 2i + j, a₁₁ = 2(1) + 1 = 3, a₁₂ = 2(1) + 2 = 4, a₂₁ = 2(2) + 1 = 5 and a₂₂ = 2(2) + 2 = 6. The matrix has rows [3 4] and [5 6]."
    ],
    "remember": "Put the row number in for i and the column number in for j, then fill the matrix position by position.",
    "a": {
      "q": "A 2 × 3 matrix has the rule aᵢⱼ = i + 3j. What is the element a₂₁?",
      "opts": ["5", "7", "4", "9"],
      "why": "a₂₁ has i = 2 and j = 1, so a₂₁ = 2 + 3(1) = 5. The answer 7 comes from swapping the numbers, which gives i = 1 and j = 2: 1 + 3(2) = 7.",
      "clue": "The first number in 21 is the row, and the second is the column."
    },
    "b": {
      "d": 3,
      "q": "A 2 × 3 matrix B has the rule bᵢⱼ = 3i − j. What is row 2 of B?",
      "opts": ["[5 4 3]", "[1 4 7]", "[7 8 9]", "[2 1 0]"],
      "why": "In row 2, i = 2 and j runs from 1 to 3: b₂₁ = 6 − 1 = 5, b₂₂ = 6 − 2 = 4 and b₂₃ = 6 − 3 = 3. The option [1 4 7] comes from mixing up i and j and using 3j − i instead. The option [2 1 0] is row 1, not row 2.",
      "clue": "Along a row, which of i and j stays the same?"
    }
  },
  "mat-determinants-inverses": {
    "title": "Determinants and inverses",
    "card": [
      "The inverse of a square matrix A is written A⁻¹. Multiplying A by A⁻¹ gives the identity matrix, so the inverse undoes what A did.",
      [
        "Determinant",
        "for A = [a b; c d], det A = ad − bc. Multiply the main diagonal, then subtract the product of the other diagonal."
      ],
      ["Inverse test", "if det A = 0, A has no inverse. If det A is not 0, A has an inverse."],
      [
        "Finding A⁻¹",
        "A⁻¹ = 1/det A × [d −b; −c a]. Example: A = [3 1; 5 2]. det A = 3×2 − 1×5 = 1, so A⁻¹ = [2 −1; −5 3]."
      ]
    ],
    "remember": "Work out ad − bc. If it is 0 there is no inverse. If not, there is one.",
    "a": {
      "q": "For the matrix [4 3; 2 1], what is the determinant?",
      "opts": ["−2", "10", "2", "−10"],
      "why": "det = 4×1 − 3×2 = 4 − 6 = −2. Adding the products to get 10 is the tempting mistake, but the second product must be subtracted. Since −2 is not 0, this matrix has an inverse.",
      "clue": "Subtract the product of the other diagonal, 3 × 2."
    },
    "b": {
      "d": 3,
      "q": "For which value of k does the matrix [k 6; 2 3] have no inverse?",
      "opts": ["k = 4", "k = 9", "k = 0", "k = 1"],
      "why": "det = 3k − 6×2 = 3k − 12. No inverse needs det = 0, so 3k = 12 and k = 4. Setting k = 0 is tempting, but then det = −12, which is not 0, so an inverse exists.",
      "clue": "Set the determinant equal to 0 and solve for k."
    }
  },
  "mat-permutation-matrices": {
    "title": "Binary and permutation matrices",
    "card": [
      [
        "Binary matrix",
        "A matrix whose elements are only 0 or 1. A 1 means yes or a link, and a 0 means no or no link."
      ],
      [
        "Permutation matrix",
        "A square matrix with exactly one 1 in each row and each column. All other elements are 0. Multiplying by it reorders the rows or columns of another matrix."
      ],
      [
        "Rows",
        "P × A reorders the rows of A. Row i of P has its 1 in column j, so row i of the answer is row j of A. A × P reorders the columns instead."
      ],
      [
        "Example",
        "P = [0 1; 1 0] and A = [2 3; 4 5], where ; starts a new row. Then P × A = [4 5; 2 3], so the two rows of A swap places."
      ]
    ],
    "remember": "A binary matrix records yes or no with 1 and 0. A permutation matrix on the left reorders rows.",
    "a": {
      "q": "Which of these 3 × 3 matrices is a permutation matrix?",
      "opts": [
        "Row 1: 0 1 0, row 2: 0 0 1, row 3: 1 0 0",
        "Row 1: 1 1 0, row 2: 0 0 1, row 3: 1 0 0",
        "Row 1: 0 1 0, row 2: 0 1 0, row 3: 1 0 0",
        "Row 1: 1 0 0, row 2: 0 2 0, row 3: 0 0 1"
      ],
      "why": "In the right matrix, each row and each column has exactly one 1, and every other element is 0. The matrix starting with 1 1 0 has two 1s in row 1. The one with 0 1 0 in both rows 1 and 2 has two 1s in column 2 and none in column 3. The one containing a 2 is not even binary.",
      "clue": "Count the 1s in every row and every column."
    },
    "b": {
      "d": 3,
      "q": "P = [0 1; 1 0] and A = [3 6; 8 1]. What is P × A?",
      "opts": ["Row 1: 8 1, row 2: 3 6", "Row 1: 6 3, row 2: 1 8", "Row 1: 3 6, row 2: 8 1", "Row 1: 1 8, row 2: 6 3"],
      "why": "Row 1 of P has its 1 in column 2, so row 1 of the answer is row 2 of A: 8 1. Row 2 of P has its 1 in column 1, so row 2 is 3 6. Swapping columns instead gives 6 3 and 1 8, which is A × P.",
      "clue": "P is on the left, so it moves rows, not columns."
    }
  },
  "mat-communication-dominance-matrices": {
    "title": "Communication and dominance matrices",
    "card": [
      [
        "Communication matrix",
        "A binary matrix where 1 means the row person can send a message directly to the column person, and 0 means they cannot. A message may go one way only."
      ],
      [
        "Dominance matrix",
        "A binary matrix where 1 means the row player beat the column player. Each pair plays once, so a 1 in one place means a 0 in the matching place across the diagonal."
      ],
      "Row sums count direct links or wins. The matrix squared, M², counts two-step links: the entry in row i and column j is the number of ways to go from i to j through one other person.",
      "M + M² counts all one-step and two-step links. Example: if A beat B and B beat C, then A has 1 direct win (over B) and 1 two-step win (over C). Ranking uses row sums of M + M²."
    ],
    "remember": "Row sums of M count direct links. Row sums of M + M² count direct and two-step links.",
    "a": {
      "q": "A dominance matrix M has rows and columns in the order P, Q, R, S: row P is 0 1 0 1, row Q is 0 0 1 1, row R is 1 0 0 0, row S is 0 0 1 0. What is P's row sum in M + M²?",
      "opts": ["5", "2", "3", "4"],
      "why": "P beat Q and S directly, so 2 direct wins. Two-step wins go through those players: P to Q to R, P to Q to S, and P to S to R, so 3 more. The total is 5, while 2 counts only the direct wins.",
      "clue": "Find who P beat, then who those players beat."
    },
    "b": {
      "d": 3,
      "q": "Messages in a team are shown by this communication matrix, with rows and columns in the order A, B, C: row A is 0 1 1, row B is 0 0 1, row C is 1 0 0. How many two-step ways are there to send a message from A to C?",
      "opts": ["1", "2", "0", "3"],
      "why": "A two-step path from A to C goes through a middle person. A to B then B to C works. A to C then C to C does not, as C has a 0 for C to C. So there is 1 way. Counting the direct link A to C as well would give 2, but that is a one-step link.",
      "clue": "Check each middle person: can A reach them, and can they reach C?"
    }
  },
  "mat-transition-matrices-2": {
    "title": "Transition matrices",
    "card": [
      "A transition matrix T shows the chance of moving between states in one step. Each column is one starting state, and the numbers in a column add to 1.",
      "The entry in row i, column j is the chance of moving from state j to state i. The entry in row j, column j is the chance of staying put.",
      "A state matrix S lists how many are in each state. The next state matrix is T × S.",
      "Example: T = [0.8 0.3; 0.2 0.7] (rows separated by a semicolon) and S = [100; 50]. T × S = [0.8×100 + 0.3×50; 0.2×100 + 0.7×50] = [95; 55]."
    ],
    "remember": "Read a column as where that state's members go next. T × S gives the next state.",
    "a": {
      "q": "Commuters in a city use the bus or the train. T = [0.8 0.3; 0.2 0.7] has rows and columns in the order bus, train. What does the 0.3 in row 1, column 2 mean?",
      "opts": [
        "Chance a train user switches to the bus",
        "Chance a bus user switches to the train",
        "Chance a train user stays on the train",
        "Share of all commuters who use the bus"
      ],
      "why": "Row 1 is the bus and column 2 is the train, so 0.3 is the chance of moving from train to bus. The reverse option reads the row and column the wrong way round.",
      "clue": "Column is where they start, row is where they end up."
    },
    "b": {
      "d": 2,
      "q": "Two cafés share a town. This week 600 customers use Café A and 400 use Café B. T = [0.9 0.2; 0.1 0.8] has rows and columns in the order A, B. How many customers will use Café A next week?",
      "opts": ["620", "580", "540", "380"],
      "why": "Café A next week = 0.9 × 600 + 0.2 × 400 = 540 + 80 = 620. The 580 comes from using 0.1 instead of 0.2, which reads the column instead of the row. The 380 is the number at Café B.",
      "clue": "Multiply row 1 of T by the column of customer numbers."
    }
  },
  "mat-steady-state": {
    "title": "Steady state",
    "card": [
      "After many steps, a regular transition matrix gives a steady state. The number in each state stops changing, whatever the starting split was.",
      "People or items still move between states in a steady state. The numbers moving out of each state equal the numbers moving in, so the totals stay put.",
      "To find it, write that balance for one state and keep the total fixed. Example: each month 10% of A move to B and 20% of B move to A, with 900 in total.",
      "Balance: 10% of A = 20% of B, so A = 2 × B. With A + B = 900, B = 300 and A = 600. Check: 60 leave A and 60 join it."
    ],
    "remember": "In a steady state the numbers stop changing because movement out equals movement in.",
    "a": {
      "q": "Which statement describes a steady state?",
      "opts": [
        "Another step leaves the numbers in each state the same",
        "Every state ends up holding the same number of people",
        "Nobody moves from one state to another any more",
        "One state slowly loses everyone until it is empty"
      ],
      "why": "In a steady state, the numbers leaving each state equal the numbers joining it, so another step changes nothing. People still move between states, so the idea that movement stops is wrong.",
      "clue": "Do people stop moving, or do the totals stop changing?"
    },
    "b": {
      "d": 3,
      "q": "Each month, 20% of train users in a town switch to the bus, and 30% of bus users switch to the train. The others stay. Of 1000 commuters, 100 use the train and 900 use the bus at the start. In the long run, how many use the train?",
      "opts": ["600", "400", "500", "800"],
      "why": "At the steady state, 20% of train users = 30% of bus users, so train : bus = 3 : 2. Of 1000 commuters, that is 600 train and 400 bus. The starting split does not change the steady state, and 400 is the bus figure.",
      "clue": "Balance the numbers switching each way. The starting split does not matter."
    }
  },
  "mat-matrix-recurrence-relations": {
    "title": "Matrix recurrence relations",
    "card": [
      "A matrix recurrence relation builds each state matrix from the one before it. S(n+1) = T × S(n), where S(0) is the starting state matrix.",
      "To find S(1), work out T × S(0). To find S(2), work out T × S(1). The matrix T always comes first in the product.",
      "A column matrix B can be added at each step: S(n+1) = T × S(n) + B. Work out the product first, then add B. Add matching entries, so each row gains its own entry of B.",
      "Example: T = [0.5 0.5; 0.5 0.5], S(0) = [40; 20]. S(1) = T × S(0) = [30; 30]. S(2) = T × S(1) = [30; 30]."
    ],
    "remember": "Each state matrix comes from the one just before it: multiply by T, then add any column.",
    "a": {
      "q": "A recurrence relation is S(n+1) = T × S(n). Which calculation gives S(2)?",
      "opts": ["T × S(1)", "T × S(0)", "S(1) × T", "T × T × S(1)"],
      "why": "Each state matrix comes from the one before it, so S(2) comes from S(1), with T written first. T × S(0) would give S(1) instead.",
      "clue": "S(2) is built from the state matrix just before it."
    },
    "b": {
      "d": 3,
      "q": "A fish pond has S(n+1) = T × S(n) + B, with T = [0.8 0.3; 0.2 0.7], B = [10; 0] and S(0) = [200; 100]. What is S(1)?",
      "opts": ["[200; 110]", "[190; 110]", "[198; 112]", "[200; 120]"],
      "why": "T × S(0) = [0.8×200 + 0.3×100; 0.2×200 + 0.7×100] = [190; 110]. Adding B = [10; 0] entry by entry gives [200; 110]. The option [190; 110] leaves out B, [198; 112] adds B before multiplying, and [200; 120] adds 10 to both rows instead of 10 and 0.",
      "clue": "Multiply by T first, then add each entry of B to its matching row."
    }
  },
  "mat-leslie-matrices": {
    "title": "Leslie matrices",
    "card": [
      "A Leslie matrix models a population split into age groups. The state matrix lists the number in each age group, youngest first.",
      "The top row holds birth rates: the average number of young born to each member of an age group. Entries just below the main diagonal hold survival rates: the proportion of one age group that moves up to the next. All other entries are 0.",
      "The next population is L × S, found by matrix multiplication, as with a transition matrix. Add the groups to get the total population.",
      "Example: L = [0 2; 0.5 0] and S = [100; 40]. L × S = [0×100 + 2×40; 0.5×100 + 0×40] = [80; 50]."
    ],
    "remember": "Top row: births. Below the diagonal: survival to the next age group.",
    "a": {
      "q": "A Leslie matrix is L = [0 2 1; 0.5 0 0; 0 0.4 0]. What does the 0.4 in row 3, column 2 mean?",
      "opts": [
        "Proportion of age group 2 that survive into group 3",
        "Average births per member of age group 2",
        "Proportion of age group 3 that survive another step",
        "Proportion of age group 3 born to group 2"
      ],
      "why": "An entry below the diagonal is a survival rate from one age group to the next. Column 2 is the group that starts and row 3 is where it ends up. Births appear only in the top row.",
      "clue": "It is not in the top row, so it is not about births."
    },
    "b": {
      "d": 3,
      "q": "A population has L = [0 1.5 1; 0.6 0 0; 0 0.5 0] and S = [80; 50; 20], with age groups youngest first. What is the total population after one step?",
      "opts": ["168", "150", "95", "73"],
      "why": "Youngest = 1.5×50 + 1×20 = 95. Second = 0.6×80 = 48. Oldest = 0.5×50 = 25. The total is 95 + 48 + 25 = 168. The option 73 leaves out the new births, and 150 is the starting total.",
      "clue": "Work out all three groups, then add them."
    }
  },
  "mat-culling-restocking": {
    "title": "Culling and restocking",
    "card": [
      "Culling removes animals from a population. Restocking adds animals to it. Both can be built into a matrix recurrence by using a matrix B.",
      "The rule is S(n+1) = T × S(n) + B. Multiply by T first, then add B.",
      "A positive entry in B restocks that state. A negative entry in B culls that state.",
      "Example: T × S(0) = [70; 80] and B = [−10; 20]. Then S(1) = [70 − 10; 80 + 20] = [60; 100]."
    ],
    "remember": "Multiply by T first, then add B: a negative entry culls and a positive entry restocks.",
    "a": {
      "q": "In S(n+1) = T × S(n) + B, what does a negative entry in B mean?",
      "opts": [
        "Animals are culled from that state each step",
        "Animals are restocked into that state each step",
        "That state's chance of staying is negative",
        "That state is left out of the model"
      ],
      "why": "B is added after the transition, so a negative entry takes that many away from the state. Restocking is the opposite, and it needs a positive entry.",
      "clue": "B is added to the population, so a negative number takes away."
    },
    "b": {
      "d": 3,
      "q": "Deer live in a forest and on a plain. Each year, T × S gives the new numbers after moving, where T = [0.8 0.1; 0.2 0.9]. Then B = [−20; 50] is added. At the start S(0) = [300; 200]. What is S(1), as forest then plain?",
      "opts": ["240 and 290", "249 and 281", "280 and 190", "280 and 250"],
      "why": "T × S(0) = [0.8×300 + 0.1×200; 0.2×300 + 0.9×200] = [260; 240]. Adding B gives [240; 290]. Adding B before multiplying by T gives 249 and 281, which is the wrong order.",
      "clue": "Find T × S(0) first, then add B to the result."
    }
  },
  "mat-graph-terms": {
    "title": "Graph terms",
    "card": [
      [
        "Vertices and edges",
        "A graph is made of points called vertices, joined by lines called edges. The degree of a vertex is the number of edge ends at that vertex. A loop adds 2 to the degree."
      ],
      [
        "Planar graph",
        "A graph is planar if it can be drawn with no edges crossing. Euler's rule for a connected planar graph is v + f = e + 2, where v is vertices, e is edges and f is faces. The outside region counts as a face."
      ],
      [
        "Digraph",
        "A directed graph (digraph) has edges with arrows. Each edge can only be used in the direction of its arrow."
      ],
      ["Weighted network", "A weighted network has a number on each edge, such as a distance, time or cost."]
    ],
    "remember": "Degree counts edge ends at a vertex. Euler's rule: v + f = e + 2.",
    "a": {
      "q": "A connected planar graph has 6 vertices and 9 edges. Using Euler's rule, how many faces does it have?",
      "opts": ["5", "3", "4", "17"],
      "why": "v + f = e + 2 gives 6 + f = 9 + 2 = 11, so f = 5. Answering 4 comes from forgetting that the outside region counts as a face.",
      "clue": "Put the numbers into v + f = e + 2, then solve for f."
    },
    "b": {
      "d": 3,
      "q": "A connected planar graph has 5 faces and 8 vertices. How many edges does it have?",
      "opts": ["11", "15", "13", "9"],
      "why": "v + f = e + 2 gives 8 + 5 = e + 2, so e = 11. Choosing 15 comes from adding 2 instead of subtracting it: 8 + 5 + 2 = 15 is a sign error.",
      "clue": "The 2 is on the same side as e, so take it away from v + f."
    }
  },
  "mat-adjacency-matrices": {
    "title": "Adjacency matrices",
    "card": [
      "An adjacency matrix shows how many edges join each pair of vertices. Each row and each column is one vertex, in the same order.",
      "The number in row A and column B is the number of edges between A and B. If no edge joins them, the entry is 0.",
      "For an undirected graph, the matrix is symmetric: the entry for A to B equals the entry for B to A. A loop on a vertex counts as 1 in that vertex's diagonal entry.",
      "Example: vertices A, B, C with two edges between A and B, one edge between B and C, and none between A and C. The rows are A: 0 2 0, B: 2 0 1, C: 0 1 0. When a graph has no loops, adding a row gives the number of edges meeting that vertex, so row B adds to 3."
    ],
    "remember": "Row and column show the pair of vertices. The entry counts the edges between them.",
    "a": {
      "q": "In an adjacency matrix for an undirected graph, the entry in row P and column Q is 3. What does this mean?",
      "opts": [
        "Three edges join P and Q",
        "Vertex P has three edges in total",
        "Vertex Q is the third vertex in the graph",
        "P and Q are three edges apart"
      ],
      "why": "Each entry counts the edges joining the pair of vertices named by its row and column. The entry 3 is not the total number of edges at P, since P may also have edges to other vertices.",
      "clue": "The entry is about one pair of vertices only."
    },
    "b": {
      "d": 2,
      "q": "A graph has vertices A, B, C and no loops. There is one edge between A and B, two edges between A and C, and none between B and C. What is row A of its adjacency matrix, in the order A, B, C?",
      "opts": ["0 1 2", "1 0 2", "0 2 1", "1 2 0"],
      "why": "Row A lists the edges from A to A, B and C in that order: none, one and two. The option 0 2 1 swaps the counts for B and C, which is a common slip.",
      "clue": "Read the entries in the order A, B, C, starting with A to A."
    }
  },
  "mat-euler-hamilton-unit-4": {
    "title": "Eulerian trails and Hamiltonian paths",
    "card": [
      [
        "Eulerian trail",
        "a walk that uses every edge exactly once. It may pass through a vertex more than once. If it starts and ends at the same vertex, it is an Eulerian circuit."
      ],
      [
        "Hamiltonian path",
        "a path that visits every vertex exactly once. It may leave some edges unused. If it starts and ends at the same vertex, it is a Hamiltonian cycle."
      ],
      "For a connected graph, count the vertices of odd degree. None odd: an Eulerian circuit exists. Exactly two odd: an Eulerian trail exists, from one odd vertex to the other. More than two odd: neither exists.",
      "Example: a connected graph has vertex degrees 2, 2, 3, 3 and 4. Exactly two are odd, so it has an Eulerian trail but no Eulerian circuit."
    ],
    "remember": "Eulerian is about edges, Hamiltonian is about vertices. Two odd vertices give a trail, none give a circuit.",
    "a": {
      "q": "A connected graph has vertices with degrees 3, 5, 2, 4, 1 and 3. What can be said about Eulerian trails and circuits?",
      "opts": [
        "It has neither an Eulerian trail nor an Eulerian circuit",
        "It has an Eulerian trail but no Eulerian circuit",
        "It has an Eulerian circuit, since the degree sum is even",
        "It has an Eulerian trail starting at the degree 1 vertex"
      ],
      "why": "The odd degrees are 3, 5, 1 and 3, so four vertices are odd. More than two odd vertices means there is no Eulerian trail and no circuit. The degree sum of 18 is even, but that is true of every graph, so it proves nothing.",
      "clue": "Count the odd degrees, then check whether there are zero, two or more."
    },
    "b": {
      "d": 3,
      "q": "A connected graph has vertex degrees 4, 4, 2, 3, 3 and 4. Mia wants to walk along every edge exactly once and finish where she started. What is the correct conclusion?",
      "opts": [
        "She cannot, because two vertices have odd degree",
        "She can, because the degrees add to an even number",
        "She can, because most vertices have even degree",
        "She cannot, because a Hamiltonian path is needed"
      ],
      "why": "Finishing where she started needs an Eulerian circuit, which needs every degree to be even. Two vertices have degree 3, so there is no circuit, only a trail. The degrees do add to an even number (20), but that is true for every graph, so it proves nothing.",
      "clue": "A circuit needs all degrees even, not most of them."
    }
  },
  "mat-trees-spanning-trees": {
    "title": "Trees and spanning trees",
    "card": [
      [
        "Tree",
        "a connected graph with no cycles. A cycle is a walk that starts and ends at the same vertex without repeating any other vertex or any edge."
      ],
      "A tree with n vertices has exactly n − 1 edges. For example, a tree with 6 vertices has 5 edges.",
      [
        "Spanning tree",
        "a tree made from some of the edges of a connected graph. It reaches every vertex of that graph."
      ],
      "Example: a connected graph has 5 vertices and 7 edges. Any spanning tree of it has 5 − 1 = 4 edges, so 7 − 4 = 3 edges are left out to break every cycle."
    ],
    "remember": "A tree is connected with no cycles, and it has one fewer edge than vertices.",
    "a": {
      "q": "Mia draws a connected graph with no cycles on 12 vertices. How many edges does her graph have?",
      "opts": ["11", "12", "13", "10"],
      "why": "A connected graph with no cycles is a tree, and a tree with n vertices has n − 1 edges, so 12 − 1 = 11. The answer 12 is tempting, but a connected graph with 12 edges on 12 vertices would contain a cycle.",
      "clue": "No cycles and connected means it is a tree."
    },
    "b": {
      "d": 3,
      "q": "A connected graph has 8 vertices and 11 edges. How many edges must be removed to leave a spanning tree?",
      "opts": ["4", "3", "7", "10"],
      "why": "A spanning tree reaches all 8 vertices, so it has 8 − 1 = 7 edges. Edges removed = 11 − 7 = 4. The answer 3 comes from taking 11 − 8, which forgets that a tree has one fewer edge than vertices.",
      "clue": "First find how many edges the spanning tree keeps."
    }
  },
  "mat-prim-s-algorithm": {
    "title": "Prim's algorithm",
    "card": [
      "A minimum spanning tree joins every vertex of a weighted graph using the smallest possible total weight. Prim's algorithm builds one step by step.",
      "Start at any vertex. Look at all the edges that join a vertex in the tree to a vertex not yet in the tree. Add the cheapest one.",
      "Repeat until every vertex is in the tree. A graph with n vertices needs n − 1 edges. If two edges tie, either can be chosen, and the total weight is the same.",
      "Example: edges AB = 4, AC = 2, BC = 3, BD = 5, CD = 6. Start at A and add AC (2). Then add BC (3), which brings in B. Then add BD (5), which brings in D. Total = 2 + 3 + 5 = 10."
    ],
    "remember": "Always add the cheapest edge that reaches a new vertex, and stop at n − 1 edges.",
    "a": {
      "q": "A tree has A and C so far. Edges from the tree to new vertices are AB = 4, CB = 3, CD = 6. Which edge does Prim's algorithm add next?",
      "opts": ["CB, weight 3", "AB, weight 4", "CD, weight 6", "AC, weight 2"],
      "why": "Prim's algorithm adds the cheapest edge that joins a new vertex to the tree. Of the edges that reach B or D, CB at 3 is the smallest. AC cannot be chosen, even though its weight is 2, because both A and C are already in the tree.",
      "clue": "The edge must reach a vertex that is not yet in the tree."
    },
    "b": {
      "d": 3,
      "q": "A network has edges PQ = 5, PR = 3, QR = 2, QS = 6, RS = 4, RT = 7, ST = 3. Using Prim's algorithm from P, what is the total weight of the minimum spanning tree?",
      "opts": ["12", "15", "16", "17"],
      "why": "From P add PR (3). Then QR (2), then RS (4), then ST (3). That is 4 edges for 5 vertices, and 3 + 2 + 4 + 3 = 12. A total of 15 comes from taking PQ (5) instead of QR (2) at the second step, but QR is cheaper and also brings in Q.",
      "clue": "At each step, list only the edges that reach a new vertex, then pick the smallest."
    }
  },
  "mat-dijkstra-s-algorithm": {
    "title": "Dijkstra's algorithm",
    "card": [
      "Dijkstra's algorithm finds the shortest path from one start vertex to every other vertex in a weighted network. The start gets the label 0. Every other vertex starts with no label.",
      "Each step, fix the unvisited vertex with the smallest label. Then look at its neighbours. New label = fixed label + edge weight. Keep the new label only if it is smaller than the old one.",
      [
        "Example",
        "Edges are A-B 4, A-C 2, C-B 1, B-D 5 and C-D 8. Fix A (0), so B gets 4 and C gets 2. Fix C (2): B drops from 4 to 3 via C, and D gets 10."
      ],
      "Fix B (3): D drops from 10 to 8. Fix D (8). The shortest distance from A to D is 8, and tracing back through the labels gives the path A-C-B-D."
    ],
    "remember": "Fix the smallest label, update its neighbours, and keep only smaller labels.",
    "a": {
      "q": "After the start is fixed, the unvisited vertices have labels B 6, C 3 and D 9. Which vertex is fixed next?",
      "opts": [
        "C, as it has the smallest label",
        "D, as it has the largest label",
        "B, as it comes next after A in order",
        "D, as it is furthest from the start"
      ],
      "why": "The algorithm always fixes the unvisited vertex with the smallest label, so C is fixed. Choosing B because of its place in the alphabet ignores the labels, which is what the method is based on.",
      "clue": "Look at the numbers, not the letters."
    },
    "b": {
      "d": 3,
      "q": "Four towns are joined by roads (in km): P-Q 7, P-R 3, R-Q 2, Q-S 4 and R-S 9. Using Dijkstra's algorithm from P, what is the shortest distance from P to S?",
      "opts": ["9 km", "11 km", "12 km", "5 km"],
      "why": "Fix P (0). Then R gets 3 and Q gets 7. Fix R (3): Q drops to 5 via R, and S gets 12. Fix Q (5): S drops to 9, the path P-R-Q-S of 3 + 2 + 4. The 11 km answer comes from P-Q-S, which keeps the first label for Q and misses the cheaper route through R.",
      "clue": "Check whether going through R makes Q closer."
    }
  },
  "mat-relations-functions": {
    "title": "Relations and functions",
    "card": [
      [
        "Relation",
        "a set of ordered pairs (x, y) linking inputs to outputs. Any rule that pairs numbers is a relation."
      ],
      [
        "Function",
        "a relation where each input gives exactly one output. No x-value is paired with two different y-values."
      ],
      ["Notation", "f(x) names the rule and its output. If f(x) = 2x + 1, then f(3) = 2 × 3 + 1 = 7."],
      [
        "Domain and range",
        "The domain is the set of allowed inputs. The range is the set of outputs that result. For {(1, 4), (2, 4), (3, 5)}, the domain is {1, 2, 3} and the range is {4, 5}."
      ]
    ],
    "remember": "A function never sends one input to two outputs. f(x) is the output for input x.",
    "a": {
      "q": "Which set of ordered pairs is a function?",
      "opts": ["{(1, 2), (2, 2), (3, 5)}", "{(1, 2), (1, 3), (2, 5)}", "{(2, 1), (2, 4), (3, 5)}", "{(0, 3), (4, 1), (4, 6)}"],
      "why": "Each input appears once, so each x has one output. It is fine for two inputs to share an output, as 1 and 2 both give 2. The other sets pair one input with two outputs.",
      "clue": "Look for an x-value that appears twice."
    },
    "b": {
      "d": 2,
      "q": "Given f(x) = 3x − 4, what is f(−2)?",
      "opts": ["−10", "2", "−2", "10"],
      "why": "f(−2) = 3 × (−2) − 4 = −6 − 4 = −10. The answer −2 comes from working out −6 + 4, but the 4 is subtracted, so the result goes further below zero. The answer 2 comes from treating 3 × (−2) as 6.",
      "clue": "Replace x with −2 in brackets, then follow the order of operations."
    }
  },
  "mat-domain-range-notation": {
    "title": "Domain and range notation",
    "card": [
      "An interval is a set of numbers between two ends. A square bracket [ or ] includes the end number. A round bracket ( or ) leaves it out.",
      "Example: [0, 5) means all numbers from 0 up to but not including 5. So 0 is in the interval and 5 is not.",
      "The symbol ∞ means the numbers go on without end. It is not a number, so it always gets a round bracket, as in [0, ∞).",
      "A restricted domain is written f: [0, ∞) → R. This reads: f is a function whose inputs are x ≥ 0, and whose outputs are real numbers. For f(x) = x² on this domain, the range is [0, ∞)."
    ],
    "remember": "Square bracket includes the end. Round bracket leaves it out. Infinity always gets a round bracket.",
    "a": {
      "q": "Which interval contains every x with −2 < x ≤ 3?",
      "opts": ["(−2, 3]", "[−2, 3]", "[−2, 3)", "(−2, 3)"],
      "why": "−2 is not included, so it gets a round bracket. 3 is included, so it gets a square bracket. [−2, 3] is tempting, but it wrongly includes −2.",
      "clue": "Check each end on its own: is it included or not?"
    },
    "b": {
      "d": 3,
      "q": "A function is f: [1, ∞) → R, where f(x) = x². Which input is NOT allowed?",
      "opts": ["x = 0", "x = 1", "x = 2", "x = 100"],
      "why": "The domain [1, ∞) holds only numbers from 1 upwards, with 1 included. So 0 is outside it and is not allowed. x = 1 is allowed because the square bracket includes 1.",
      "clue": "The domain is the set of allowed inputs, not the outputs."
    }
  },
  "mat-inverse-functions": {
    "title": "Inverse functions",
    "card": [
      "The inverse of f, written f⁻¹, reverses f. If f takes 2 to 7, then f⁻¹ takes 7 back to 2.",
      "To find it, write y = f(x), swap x and y, then solve for y. Example: f(x) = 2x + 3. Write y = 2x + 3, swap to x = 2y + 3, so y = (x − 3)/2. This gives f⁻¹(x) = (x − 3)/2.",
      "An inverse exists only if f is one-to-one: each output comes from exactly one input. A horizontal line must cut the graph at most once. So y = x² on all of R has no inverse, because 2 and −2 both give 4.",
      "The graph of f⁻¹ is the graph of f reflected in the line y = x. The domain of f⁻¹ is the range of f, and the range of f⁻¹ is the domain of f."
    ],
    "remember": "Swap x and y to reverse a function. Only a one-to-one function has an inverse.",
    "a": {
      "q": "What is the inverse of f(x) = 3x − 6?",
      "opts": ["f⁻¹(x) = (x + 6)/3", "f⁻¹(x) = (x − 6)/3", "f⁻¹(x) = x/3 + 6", "f⁻¹(x) = 3x + 6"],
      "why": "Swap to x = 3y − 6, so 3y = x + 6 and y = (x + 6)/3. Check: f(4) = 6, and f⁻¹(6) = 12/3 = 4 gives back 4. The option (x − 6)/3 has a sign error when moving the 6 across.",
      "clue": "Swap x and y first, then undo the subtraction before the multiplication."
    },
    "b": {
      "d": 3,
      "q": "Which function, on the domain given, has an inverse function?",
      "opts": ["f(x) = 2x + 1, for x in R", "f(x) = x², for x in R", "f(x) = |x|, for x in R", "f(x) = 4 − x², for x in R"],
      "why": "Only f(x) = 2x + 1 is one-to-one, so any horizontal line cuts it once. The other three each give the same output for x and −x, such as 2 and −2, so a horizontal line can cut them twice. Having a rule that can be rearranged does not make a function one-to-one.",
      "clue": "Does any output come from two different inputs, such as 2 and −2?"
    }
  },
  "mat-reading-graphs-real-data": {
    "title": "Reading graphs of real data",
    "card": [
      "A graph of real data shows how one quantity changes with another, such as water depth against time. You can describe it even without a rule.",
      [
        "Rising or falling",
        "Read the graph from left to right. If the line goes up, the quantity is increasing. If it goes down, the quantity is decreasing."
      ],
      [
        "Levelling off",
        "A flat section means the quantity is not changing for those inputs. The graph is steady there, and the output stays at the same value."
      ],
      [
        "Crossing an axis",
        "Where the graph meets the vertical axis, the input is 0. Where it meets the horizontal axis, the output is 0."
      ]
    ],
    "remember": "Read left to right: up is increasing, down is decreasing, flat is no change, and an axis crossing means a zero.",
    "a": {
      "q": "A graph shows the depth of water in a tank (in cm) against time (in minutes). It is flat from 5 to 9 minutes. What happens to the depth then?",
      "opts": ["It stays the same", "It rises slowly", "It falls slowly", "It is zero"],
      "why": "A flat section means the output does not change for those inputs, so the depth stays the same. It is not zero, because a flat line can sit at any height. It only reaches zero where it meets the horizontal axis.",
      "clue": "A flat line has the same height all the way along."
    },
    "b": {
      "d": 3,
      "q": "A graph shows the height of a drone (in m) above the ground against time (in s). It starts at the vertical axis at 20, falls, and meets the horizontal axis at 8. What does the point at 8 on the horizontal axis mean?",
      "opts": [
        "The drone lands after 8 seconds",
        "The drone starts 8 metres above the ground",
        "The drone lands after 20 seconds",
        "The drone is 8 metres up after 20 seconds"
      ],
      "why": "On the horizontal axis the output, the height, is 0, so the drone is on the ground. The input there is 8, so this happens at 8 seconds. The 20 is the starting height, where the graph meets the vertical axis.",
      "clue": "On the horizontal axis, which quantity is 0?"
    }
  },
  "mat-expanding-factorising": {
    "title": "Expanding and factorising",
    "card": [
      [
        "Common factor",
        "Check for this first. Take out the largest factor shared by every term. 6x² + 9x = 3x(2x + 3)."
      ],
      [
        "Grouping",
        "With four terms, factorise in pairs, then take out the shared bracket. x³ + 2x² + 3x + 6 = x²(x + 2) + 3(x + 2) = (x + 2)(x² + 3)."
      ],
      ["Difference of two squares", "a² − b² = (a − b)(a + b). For example, x² − 25 = (x − 5)(x + 5)."],
      [
        "Perfect squares",
        "(a + b)² = a² + 2ab + b², and (a − b)² = a² − 2ab + b². For example, (x − 3)² = x² − 6x + 9."
      ]
    ],
    "remember": "Look for a common factor first, then a pattern: a difference of two squares, a perfect square, or grouping.",
    "a": {
      "q": "Which is the factorised form of 4x² − 49?",
      "opts": ["(2x − 7)(2x + 7)", "(2x − 7)²", "(4x − 7)(x + 7)", "(2x + 7)²"],
      "why": "4x² is (2x)² and 49 is 7², so this is a difference of two squares: (2x − 7)(2x + 7). The option (2x − 7)² expands to 4x² − 28x + 49, which has a middle term.",
      "clue": "Write each term as a square, then use a² − b²."
    },
    "b": {
      "d": 3,
      "q": "Which is the expansion of (3x − 2)²?",
      "opts": ["9x² − 12x + 4", "9x² − 4", "9x² − 6x + 4", "9x² + 12x + 4"],
      "why": "Use (a − b)² = a² − 2ab + b² with a = 3x and b = 2. This gives 9x² − 12x + 4. The option 9x² − 4 is tempting, but it leaves out the middle term −2ab.",
      "clue": "The middle term is twice the product of 3x and 2, with a minus sign."
    }
  },
  "mat-dividing-polynomials": {
    "title": "Dividing polynomials",
    "card": [
      "Long division of polynomials works like long division of numbers. Any polynomial P(x) can be written as P(x) = D(x) × Q(x) + R(x), where D is the divisor, Q is the quotient and R is the remainder.",
      "The remainder has a lower degree than the divisor. If the divisor is x − a, the remainder is a number.",
      "Step 1: divide the first term of what is left by the first term of the divisor. Step 2: multiply the divisor by that result and subtract. Step 3: repeat until what is left has a lower degree than the divisor.",
      "Example: divide x² + 5x + 7 by x + 2. x² ÷ x = x, and x(x + 2) = x² + 2x, leaving 3x + 7. Then 3x ÷ x = 3, and 3(x + 2) = 3x + 6, leaving 1. So x² + 5x + 7 = (x + 2)(x + 3) + 1."
    ],
    "remember": "P(x) = divisor × quotient + remainder, and the remainder has a lower degree than the divisor.",
    "a": {
      "q": "x² + 7x + 4 is divided by x + 3. What are the quotient and the remainder?",
      "opts": [
        "Quotient x + 4, remainder −8",
        "Quotient x + 4, remainder 8",
        "Quotient x + 4, remainder 12",
        "Quotient x + 7, remainder 4"
      ],
      "why": "x² ÷ x = x, and subtracting x² + 3x leaves 4x + 4. Then 4x ÷ x = 4, and subtracting 4x + 12 leaves 4 − 12 = −8. A remainder of 8 comes from subtracting 12 from 4 the wrong way round.",
      "clue": "Subtract after every step, and stop only when the leftover has a lower degree than the divisor."
    },
    "b": {
      "d": 3,
      "q": "x³ − 2x² + 3x − 5 is divided by x − 1. Which is the correct way to write it?",
      "opts": ["(x − 1)(x² − x + 2) − 3", "(x − 1)(x² − x + 2) + 3", "(x − 1)(x² − x + 2) − 5", "(x − 1)(x² − x + 4) − 9"],
      "why": "Dividing the first terms in turn gives x², then −x, then 2, so the quotient is x² − x + 2. The last step leaves 2x − 5 − (2x − 2) = −3. Writing +3 comes from taking the constants the wrong way round, −2 − (−5).",
      "clue": "Subtract each line carefully, especially when a term is negative."
    }
  },
  "mat-remainder-factor-theorems": {
    "title": "The remainder and factor theorems",
    "card": [
      [
        "Remainder theorem",
        "When P(x) is divided by (x − a), the remainder is P(a). To find it, substitute x = a. No long division is needed."
      ],
      [
        "Factor theorem",
        "If P(a) = 0, then (x − a) is a factor of P(x). If P(a) is not 0, then (x − a) is not a factor."
      ],
      [
        "Rational root theorem",
        "Take P(x) with integer coefficients, which may be negative. Any rational root p/q in lowest terms has p dividing the constant term and q dividing the leading coefficient."
      ],
      [
        "Example",
        "Let P(x) = x³ − 2x² − 5x + 6. P(1) = 1 − 2 − 5 + 6 = 0, so (x − 1) is a factor. P(2) = 8 − 8 − 10 + 6 = −4, so dividing by (x − 2) leaves remainder −4."
      ]
    ],
    "remember": "Substitute a into P(x): the answer is the remainder, and 0 means (x − a) is a factor.",
    "a": {
      "q": "What is the remainder when P(x) = x³ + 2x − 5 is divided by (x − 2)?",
      "opts": ["7", "−17", "5", "17"],
      "why": "The remainder is P(2) = 8 + 4 − 5 = 7. The option −17 comes from substituting x = −2, giving −8 − 4 − 5 = −17, but the divisor (x − 2) means x = 2.",
      "clue": "Substitute the value that makes x − 2 equal zero."
    },
    "b": {
      "d": 3,
      "q": "For which value of k is (x + 3) a factor of P(x) = x³ + kx² − 4x − 12?",
      "opts": ["k = 3", "k = −3", "k = 1", "k = −1"],
      "why": "(x + 3) is a factor when P(−3) = 0. P(−3) = −27 + 9k + 12 − 12 = 9k − 27, so k = 3. Substituting x = 3 instead is a common slip: it gives 9k + 3 = 0, which does not match any option.",
      "clue": "Set P(−3) = 0 and solve for k."
    }
  },
  "mat-solving-polynomial-equations": {
    "title": "Solving polynomial equations",
    "card": [
      "To solve a polynomial equation, move every term to one side so the other side is 0. Then factorise the polynomial.",
      "If a product is 0, at least one factor is 0. So set each factor equal to 0 and solve each one.",
      "For a cubic with no obvious factor, test small values such as ±1, ±2 in P(x). When P(a) = 0, the factor theorem says (x − a) is a factor. Divide it out to leave a quadratic.",
      [
        "Example",
        "Solve x³ − 2x² − 5x + 6 = 0. P(1) = 0, so (x − 1) is a factor. Dividing gives (x − 1)(x² − x − 6) = (x − 1)(x − 3)(x + 2), so x = 1, 3 or −2."
      ]
    ],
    "remember": "Make one side 0, factorise, then set each factor to 0.",
    "a": {
      "q": "What are the solutions of (x − 4)(x + 1)(2x − 3) = 0?",
      "opts": ["x = 4, −1, 3/2", "x = −4, 1, −3/2", "x = 4, −1, 2/3", "x = 4, −1, −3/2"],
      "why": "Set each factor to 0: x = 4, x = −1, and 2x = 3 gives x = 3/2. The option with 2/3 flips the fraction, which is a common slip.",
      "clue": "Solve each bracket separately, including 2x − 3 = 0."
    },
    "b": {
      "d": 3,
      "q": "Solve x³ − 7x + 6 = 0. What are all the solutions?",
      "opts": ["x = 1, 2, −3", "x = −1, −2, 3", "x = 1, −2, 3", "x = 1, 2, 3"],
      "why": "P(1) = 1 − 7 + 6 = 0, so (x − 1) is a factor. Dividing gives x² + x − 6 = (x + 3)(x − 2), so x = 1, 2 or −3. Check x = 3: 27 − 21 + 6 = 12, so it is not a solution.",
      "clue": "Test x = 1 first, then factorise the quadratic that is left."
    }
  },
  "mat-bisection-method": {
    "title": "The bisection method",
    "card": [
      "If f(x) is continuous and f(a) and f(b) have opposite signs, then f has a root between a and b. The root is where f(x) = 0.",
      "Find the midpoint m = (a + b) ÷ 2 and work out f(m). Keep the half of the interval where the signs at the two ends are still opposite.",
      "Repeat. Each step halves the interval, so the root is trapped in a smaller and smaller interval. You can stop when the interval is as small as the accuracy you need.",
      "Example: f(x) = x² − 5 has f(2) = −1 and f(3) = 4. The midpoint is 2.5 and f(2.5) = 1.25, which is positive. So the root lies between 2 and 2.5."
    ],
    "remember": "Halve the interval and keep the half where f changes sign. The root stays trapped inside.",
    "a": {
      "q": "f(x) = x³ − 10 has f(2) = −2 and f(3) = 17. Which interval does the method keep after one bisection step?",
      "opts": ["Between 2 and 2.5", "Between 2.5 and 3", "Between 2 and 3", "Between 2.25 and 2.75"],
      "why": "The midpoint is 2.5 and f(2.5) = 15.625 − 10 = 5.625, which is positive. The signs at 2 and 2.5 are opposite, so the method keeps 2 to 2.5. Between 2.5 and 3 is wrong, because f is positive at both ends.",
      "clue": "Find f at the midpoint and check which end has the opposite sign."
    },
    "b": {
      "d": 2,
      "q": "f(x) = x² − 7 has f(2) = −3 and f(3) = 2. What is f(2.5), and which interval does the method keep next?",
      "opts": [
        "−0.75, so between 2.5 and 3",
        "−0.75, so between 2 and 2.5",
        "1.25, so between 2.5 and 3",
        "1.25, so between 2 and 2.5"
      ],
      "why": "f(2.5) = 6.25 − 7 = −0.75, which is negative. The signs at 2.5 and 3 are opposite (−0.75 and 2), so the method keeps 2.5 to 3. The option with 2 and 2.5 fails, because f is negative at both ends.",
      "clue": "Square 2.5 first, then subtract 7."
    }
  },
  "mat-instantaneous-rate-change": {
    "title": "Instantaneous rate of change",
    "card": [
      "The instantaneous rate of change is how fast a function is changing at one exact point. It is the gradient of the tangent, the line that just touches the curve there.",
      "To find it, take a chord from the point to a second point a small distance h away. Then let h get smaller and smaller.",
      "The chord gradients settle towards one number. That number is the limit, and it is the instantaneous rate of change.",
      "Example: for f(x) = x², the chord from x = 1 to x = 1 + h has gradient ((1 + h)² − 1) ÷ h = 2 + h. As h shrinks towards 0, this gets close to 2. So the rate at x = 1 is 2."
    ],
    "remember": "Shrink the gap h towards 0. The chord gradient settles on the instantaneous rate.",
    "a": {
      "q": "For f(x) = x², the chord from x = 3 to x = 3 + h has gradient 6 + h. What is the instantaneous rate of change at x = 3?",
      "opts": ["6", "9", "3", "7"],
      "why": "As h shrinks towards 0, the gradient 6 + h gets close to 6. The value 9 is f(3), a height on the curve, not a rate.",
      "clue": "What does 6 + h get close to as h gets tiny?"
    },
    "b": {
      "d": 3,
      "q": "For f(x) = 2x², the chord from x = 3 to x = 3 + h is used to find the rate at x = 3. What is the instantaneous rate of change there?",
      "opts": ["12", "14", "18", "6"],
      "why": "The chord gradient is (2(3 + h)² − 18) ÷ h = (12h + 2h²) ÷ h = 12 + 2h. As h gets close to 0, this gets close to 12. The value 14 is the chord gradient when h = 1, which is not the limit.",
      "clue": "Work out 2(3 + h)² − f(3) first, and only then divide by h."
    }
  },
  "mat-rates-context": {
    "title": "Rates in context",
    "card": [
      "On a graph of real data, the gradient is a rate. Its units are the vertical units per horizontal unit, such as km per hour or °C per hour.",
      "A steeper graph means a faster rate of change. A flat section means no change at that time, such as a cyclist who has stopped.",
      "A line that slopes up means the quantity is increasing. A line that slopes down means it is decreasing.",
      "Water filling a container at a steady rate: the depth rises quickly where the container is narrow and slowly where it is wide. A container with straight sides of the same width gives a straight line."
    ],
    "remember": "Read the gradient as a rate. Steeper means faster, flat means no change.",
    "a": {
      "q": "A graph of a cyclist's distance (km) against time (hours) is steepest between 2 and 3 hours. What does this show?",
      "opts": [
        "She was riding fastest then",
        "She rode the furthest in total",
        "She had stopped for a rest",
        "She was riding slowest then"
      ],
      "why": "On a distance and time graph, the steepest part has the greatest distance per hour, so the fastest speed. A flat part would be a rest, not a steep one.",
      "clue": "Steep means a lot of distance in a short time."
    },
    "b": {
      "d": 3,
      "q": "A vase fills with water at a steady rate. The graph of depth against time rises steeply at first, then gets gradually less steep all the way to the top. Which vase fits?",
      "opts": [
        "Narrow at the bottom, getting wider towards the top",
        "Wide at the bottom, getting narrower towards the top",
        "The same width all the way up",
        "Wide in the middle, narrow at the bottom and top"
      ],
      "why": "Depth rises fastest where the vase is narrow, so the vase starts narrow. The graph keeps flattening, so it keeps getting wider. A vase wide at the bottom would fill slowly at first, which is the reverse.",
      "clue": "Steep depth graph means the water level is climbing quickly."
    }
  },
  "mat-tangent-lines": {
    "title": "Tangent lines",
    "card": [
      "A tangent line touches the curve at a point and has the same direction as the curve there. Its gradient, rise ÷ run between any two points on the line, is the instantaneous rate of change at that point.",
      ["Positive gradient", "the tangent slopes up, so the function is increasing at that point."],
      ["Negative gradient", "the tangent slopes down, so the function is decreasing at that point."],
      [
        "Zero gradient",
        "the tangent is horizontal, so the function is not rising or falling at that point. Example: the tangent to y = x² at x = 0 is flat, so the rate there is 0."
      ]
    ],
    "remember": "Tangent up is positive, down is negative, flat is zero.",
    "a": {
      "q": "The tangent to a curve at point P is horizontal. What does this tell you about the curve at P?",
      "opts": [
        "The rate of change at P is zero",
        "The rate of change at P is 1",
        "The curve is decreasing at P",
        "The rate of change at P is undefined"
      ],
      "why": "A horizontal line has gradient 0, so the instantaneous rate of change at P is 0. It is not decreasing, because a decreasing curve has a tangent that slopes down.",
      "clue": "What is the gradient of a horizontal line?"
    },
    "b": {
      "d": 3,
      "q": "A tangent to a curve at (0, 5) also passes through (2, 1). What is the instantaneous rate of change at (0, 5)?",
      "opts": ["−2", "2", "−4", "−1/2"],
      "why": "The gradient is (1 − 5) ÷ (2 − 0) = −4 ÷ 2 = −2, so the curve is decreasing at that point. The value −4 is only the rise and has not been divided by the run.",
      "clue": "Rise over run, and check which way the line slopes."
    }
  },
  "mat-graphs-sine-cosine": {
    "title": "Graphs of sine and cosine",
    "card": [
      "The graphs of y = a sin(nx) + k and y = a cos(nx) + k are smooth waves that repeat. Here a, n and k are numbers, and a and n are positive.",
      [
        "Amplitude",
        "The amplitude is a. It is the distance from the middle line up to a peak. The wave goes from k − a to k + a."
      ],
      [
        "Period",
        "The period is 2π ÷ n. It is the length of one full wave along the x-axis. A larger n gives a shorter period."
      ],
      [
        "Mean value",
        "The mean value is k. It is the height of the middle line. Example: y = 3 sin(2x) + 1 has amplitude 3, period 2π ÷ 2 = π, mean 1, and goes from −2 to 4."
      ]
    ],
    "remember": "a is the distance from the middle to a peak, 2π ÷ n is the length of one wave, and k is the height of the middle line.",
    "a": {
      "q": "What is the period of y = 2 cos(4x) + 5?",
      "opts": ["π/2", "8π", "π/4", "2π"],
      "why": "Period = 2π ÷ n = 2π ÷ 4 = π/2. The tempting answer 2π is the period of y = cos x, which applies when n = 1.",
      "clue": "Divide 2π by the number multiplying x."
    },
    "b": {
      "d": 3,
      "q": "What are the greatest and least values of y = 4 sin(3x) − 2?",
      "opts": ["2 and −6", "4 and −4", "1 and −5", "6 and −2"],
      "why": "The mean is −2 and the amplitude is 4, so y goes from −2 − 4 = −6 up to −2 + 4 = 2. The option 4 and −4 forgets to shift the wave by k.",
      "clue": "Start at the middle line, then go up and down by the amplitude."
    }
  },
  "mat-tangent-graph": {
    "title": "The tangent graph",
    "card": [
      "The graph of y = tan x comes from tan x = sin x ÷ cos x. It repeats every π radians, so its period is π.",
      "When cos x = 0, the fraction cannot be worked out. The graph has a vertical asymptote there, a line it gets closer to but never touches.",
      "In one period from −π/2 to π/2, the asymptotes are at x = −π/2 and x = π/2. Others are at x = 3π/2, −3π/2 and so on, every π apart.",
      "The graph crosses the x-axis where sin x = 0, so at x = 0, π, −π, 2π and so on. Between each pair of asymptotes, the curve rises from left to right."
    ],
    "remember": "tan x = sin x ÷ cos x: period π, with asymptotes wherever cos x = 0.",
    "a": {
      "q": "Which of these is a vertical asymptote of y = tan x?",
      "opts": ["x = π/2", "x = π", "x = 0", "x = 2π"],
      "why": "At x = π/2, cos x = 0, so tan x cannot be worked out and there is an asymptote. At x = π, sin x = 0 and cos x = −1, so tan π = 0 and the graph crosses the x-axis there.",
      "clue": "Look for the value of x where cos x = 0."
    },
    "b": {
      "d": 3,
      "q": "The graph of y = tan x has a vertical asymptote at x = π/2. Which is the next asymptote to the right?",
      "opts": ["x = 3π/2", "x = π", "x = 2π", "x = 5π/2"],
      "why": "Asymptotes repeat every period, which is π. So the next one is π/2 + π = 3π/2. The value x = π is tempting, but tan π = 0 there, so the graph crosses the axis.",
      "clue": "Add one period to π/2."
    }
  },
  "mat-modelling-with-sine-cosine": {
    "title": "Modelling with sine and cosine",
    "card": [
      "Things that rise and fall in a regular cycle, such as tides, daylight hours and temperatures, can be modelled by y = a sin(nx) + k or y = a cos(nx) + k.",
      [
        "Mean",
        "The mean k is the middle value of the cycle. It is halfway between the greatest and least values, so k = (greatest + least) ÷ 2."
      ],
      [
        "Amplitude",
        "The amplitude a is how far the value rises above the mean. It is half the gap between greatest and least, so a = (greatest − least) ÷ 2."
      ],
      [
        "Period",
        "The period is the time for one full cycle, and it equals 2π ÷ n. Example: a tide with high 5 m, low 1 m and a 12 hour cycle has mean 3 m, amplitude 2 m and n = 2π ÷ 12 = π/6."
      ]
    ],
    "remember": "Mean is halfway between the extremes, amplitude is half the gap, period is one cycle.",
    "a": {
      "q": "The temperature in a cool room cycles between 14°C and 22°C. What is the amplitude of a sine model for it?",
      "opts": ["4°C", "8°C", "18°C", "36°C"],
      "why": "The amplitude is half the gap: (22 − 14) ÷ 2 = 4. The option 8°C is the whole gap from least to greatest, not the distance from the middle.",
      "clue": "Amplitude is measured from the middle line, not from bottom to top."
    },
    "b": {
      "d": 3,
      "q": "Water depth at a small harbour jetty is modelled by d = 0.5 sin(nt) + 2, in metres, with t in hours. One full tide cycle takes 12 hours. What is n?",
      "opts": ["π/6", "6/π", "24π", "π/12"],
      "why": "The period is 2π ÷ n = 12, so n = 2π ÷ 12 = π/6. Check: 2π ÷ (π/6) = 12. The option 6/π comes from dividing 12 by 2π, which turns the division upside down.",
      "clue": "Put the period into period = 2π ÷ n and solve for n."
    }
  },
  "mat-index-laws": {
    "title": "Index laws",
    "card": [
      "For a positive whole number n, a^n means n copies of the base a multiplied together. The number n is the index.",
      [
        "Multiply or divide",
        "with the same base, add the indices to multiply and subtract them to divide: a^m × a^n = a^(m+n) and a^m ÷ a^n = a^(m−n). For example, 3² × 3⁴ = 3⁶ and 5⁷ ÷ 5³ = 5⁴."
      ],
      ["Power of a power", "multiply the indices: (a^m)^n = a^(mn). For example, (2³)² = 2⁶."],
      [
        "Power of a product",
        "raise every factor inside the brackets to the power: (ab)^n = a^n × b^n. For example, (3x²)² = 3² × x⁴ = 9x⁴."
      ]
    ],
    "remember": "Same base: add indices to multiply, subtract to divide. A power outside brackets applies to every factor inside.",
    "a": {
      "q": "Which expression is equal to x⁵ × x³?",
      "opts": ["x⁸", "x¹⁵", "x²", "2x⁸"],
      "why": "Same base, multiplying, so add the indices: 5 + 3 = 8. Multiplying the indices to get x¹⁵ is the rule for a power of a power, not for a product.",
      "clue": "The bases match and you are multiplying."
    },
    "b": {
      "d": 3,
      "q": "Simplify (2x³)² × x⁴.",
      "opts": ["4x¹⁰", "2x¹⁰", "4x⁹", "4x²⁴"],
      "why": "Every factor in the brackets is squared: (2x³)² = 2² × x⁶ = 4x⁶. Then 4x⁶ × x⁴ = 4x¹⁰. Leaving the 2 unsquared gives 2x¹⁰, which is the tempting mistake.",
      "clue": "Every factor inside the brackets is squared."
    }
  },
  "mat-exponential-models-2": {
    "title": "Exponential models",
    "card": [
      "An exponential model has the form y = a × b^t. The value a is the initial value, when t = 0. The base b is the growth or decay factor for each time step.",
      "For a rise of r% per step, b = 1 + r/100, so a 5% rise gives b = 1.05. For a fall of r%, b = 1 − r/100, so a 20% fall gives b = 0.8.",
      "Example: $200 grows 10% each year, so y = 200 × 1.1^t. After 2 years, y = 200 × 1.21 = $242.",
      "If a quantity doubles every d hours (its doubling time), y = a × 2^(t/d). If it halves every h hours (its half-life), y = a × (1/2)^(t/h)."
    ],
    "remember": "Start value a, then multiply by b each step: b = 1 + r/100 for growth, 1 − r/100 for decay.",
    "a": {
      "q": "A town of 4000 people grows by 3% each year. Which rule gives its population P after t years?",
      "opts": ["P = 4000 × 1.03^t", "P = 4000 × 0.03^t", "P = 4000 × 3^t", "P = 4000 + 1.03t"],
      "why": "Growth of 3% means the factor is 1 + 3/100 = 1.03, and the population is multiplied by it each year. Using 0.03 would shrink the population to almost nothing.",
      "clue": "Each year the population becomes 103% of the year before."
    },
    "b": {
      "d": 3,
      "q": "A drug in the blood has a half-life of 4 hours. A dose of 80 mg is taken. How much remains after 12 hours?",
      "opts": ["10 mg", "20 mg", "26.7 mg", "40 mg"],
      "why": "Using y = 80 × (1/2)^(12/4) = 80 × 1/8 = 10 mg. That is 3 half-lives, so 80 → 40 → 20 → 10. Halving only once or twice gives 40 or 20 mg, and dividing 80 by 3 gives 26.7 mg.",
      "clue": "Count how many half-lives fit into 12 hours."
    }
  },
  "mat-central-difference-approximation": {
    "title": "The central difference approximation",
    "card": [
      "A chord joins two points on a curve. Its gradient is rise over run. The derivative at x = a is the gradient of the tangent there.",
      "The central difference uses one point either side of a. f′(a) ≈ (f(a + h) − f(a − h)) ÷ 2h, where h is a small positive number.",
      "Take f(x) = x² with a = 3 and h = 0.1. f(3.1) = 9.61 and f(2.9) = 8.41. The difference is 9.61 − 8.41 = 1.2, and 2h = 0.2.",
      "So the estimate is 1.2 ÷ 0.2 = 6. A smaller h usually gives a closer estimate."
    ],
    "remember": "Right value minus left value, f(a + h) − f(a − h), then divide by 2h.",
    "a": {
      "q": "For f(x) = x² with a = 4 and h = 0.5, what is the central difference estimate of f′(4)?",
      "opts": ["8", "7.5", "16", "−8"],
      "why": "f(4.5) = 20.25 and f(3.5) = 12.25. The difference is 20.25 − 12.25 = 8, and 2h = 1, so the estimate is 8 ÷ 1 = 8. Dividing by h instead of 2h gives 16, and subtracting the right value from the left gives −8.",
      "clue": "Find f at 4.5 and 3.5, take right minus left, then divide by 2h."
    },
    "b": {
      "d": 3,
      "q": "Priya estimates f′(2) for f(x) = x³ using h = 0.1. What does she get?",
      "opts": ["12.01", "24.02", "12.61", "11.41"],
      "why": "f(2.1) = 9.261 and f(1.9) = 6.859. The difference is 2.402, and 2h = 0.2, so the estimate is 12.01. Dividing by h gives 24.02, which forgets that the points are 2h apart. 12.61 uses f(2.1) and f(2) only, which is not a point either side of 2.",
      "clue": "Use one point either side of 2, and the points are 0.2 apart."
    }
  },
  "mat-graphs-derivative-functions": {
    "title": "Graphs of derivative functions",
    "card": [
      "The derivative f′(x) gives the gradient of the graph of f at each x. So its graph shows how steep f is and which way it slopes.",
      "Where f rises as x increases, the gradient is positive, so f′ is above the x-axis. Where f falls, f′ is below the x-axis.",
      "At a stationary point, such as a peak or a dip, the tangent is flat. The gradient is zero, so the graph of f′ touches or crosses the x-axis there.",
      "Example: a curve falls until x = 2, then rises. So f′ is negative for x < 2, zero at x = 2 and positive for x > 2."
    ],
    "remember": "Read f′ from the slope of f: above the axis means rising, below means falling.",
    "a": {
      "q": "The graph of f falls for x < 1 and rises for x > 1. Which describes f′?",
      "opts": [
        "Negative for x < 1, zero at x = 1, positive after",
        "Positive for x < 1, zero at x = 1, negative after",
        "Negative everywhere, with a zero at x = 1",
        "Zero for x < 1 and positive for x > 1"
      ],
      "why": "A falling graph has a negative gradient, and a rising graph has a positive one. The flat point at x = 1 gives zero. Swapping the signs is the tempting mistake.",
      "clue": "Falling means a negative gradient."
    },
    "b": {
      "d": 3,
      "q": "The graph of f has a peak at x = −1, a dip at x = 3 and no other stationary points. Where is f′ negative?",
      "opts": ["Between x = −1 and x = 3", "For x < −1 and for x > 3", "At x = −1 and at x = 3", "For all x less than 3"],
      "why": "After a peak the graph falls until the dip, so f′ is negative between −1 and 3. Before the peak f rises, so f′ is positive for x < −1, which rules out all x less than 3. At −1 and 3 the gradient is zero, not negative.",
      "clue": "What does the graph do just after a peak?"
    }
  },
  "mat-antidifferentiation": {
    "title": "Antidifferentiation",
    "card": [
      "Antidifferentiation reverses differentiation. If f′(x) = 2x, then f(x) could be x², because the derivative of x² is 2x.",
      "Add 1 to the power, then divide by the new power. The antiderivative of xⁿ is xⁿ⁺¹/(n + 1) + c, for n ≠ −1. Do each term of a sum separately.",
      "The constant c is needed because a constant has derivative 0. So x², x² + 5 and x² − 3 all have derivative 2x. They form a family of curves with the same gradient at each x value.",
      "A known point picks out one curve. Example: f′(x) = 6x² and f(1) = 5. Then f(x) = 2x³ + c. Put in x = 1: 2 + c = 5, so c = 3 and f(x) = 2x³ + 3."
    ],
    "remember": "Antidifferentiate to get xⁿ⁺¹/(n + 1) + c, then use a known point to find c.",
    "a": {
      "q": "Which function has derivative f′(x) = 4x³ and passes through (1, 7)?",
      "opts": ["f(x) = x⁴ + 6", "f(x) = x⁴ + 7", "f(x) = 12x² + 7", "f(x) = x⁴ − 6"],
      "why": "The antiderivative of 4x³ is x⁴ + c. Putting in x = 1 gives 1 + c = 7, so c = 6. The option x⁴ + 7 has the right shape, but it gives 8 at x = 1, not 7, as it uses the y value as c.",
      "clue": "Find x⁴ + c first, then put in the point."
    },
    "b": {
      "d": 3,
      "q": "A curve has gradient 3x² − 4x at every point and passes through (2, 1). What is its equation?",
      "opts": ["y = x³ − 2x² + 1", "y = x³ − 2x²", "y = x³ − 2x² − 1", "y = x³ − 4x² + 1"],
      "why": "The antiderivative is y = x³ − 2x² + c. At x = 2: 8 − 8 + c = 1, so c = 1. The option with no constant would give y = 0 at x = 2, not 1. The option with −4x² divides by the new power wrongly: it leaves out the division by 2.",
      "clue": "Divide each term by its new power, then use (2, 1) to find c."
    }
  },
  "mat-newton-s-method": {
    "title": "Newton's method",
    "card": [
      "Newton's method improves a guess for a root, a value of x where f(x) = 0. Draw the tangent at the guess and see where it meets the x-axis.",
      "That crossing point is the next guess. The rule is x₁ = x₀ − f(x₀) ÷ f′(x₀). Repeating it usually gets closer.",
      "Example: f(x) = x³ − 8 with x₀ = 3. f(3) = 19 and f′(x) = 3x², so f′(3) = 27.",
      "Then x₁ = 3 − 19/27 ≈ 2.30. This is closer to the root x = 2. The method fails if f′(x₀) = 0, and a poor guess can overshoot or move away."
    ],
    "remember": "New guess = old guess − f ÷ f′, found where the tangent meets the axis.",
    "a": {
      "q": "For f(x) = x³ − 8 with x₀ = 2.5, what is x₁ using Newton's method?",
      "opts": ["2.5 − 7.625/18.75 ≈ 2.09", "2.5 + 7.625/18.75 ≈ 2.91", "2.5 − 7.625/7.5 ≈ 1.48", "2.5 − 18.75/7.625 ≈ 0.04"],
      "why": "f(2.5) = 15.625 − 8 = 7.625, and f′(2.5) = 3 × 6.25 = 18.75. So x₁ = 2.5 − 7.625/18.75 ≈ 2.09. Adding instead of subtracting moves away from the root.",
      "clue": "Subtract f divided by f′."
    },
    "b": {
      "d": 3,
      "q": "For f(x) = x³ − 2x − 5 with x₀ = 2, what is x₁?",
      "opts": ["2.1", "1.9", "3", "2.5"],
      "why": "f(2) = 8 − 4 − 5 = −1, and f′(x) = 3x² − 2, so f′(2) = 10. Then x₁ = 2 − (−1)/10 = 2.1. Dropping the negative sign on f(2) gives 1.9, and forgetting to divide by f′(2) gives 3.",
      "clue": "Find f(2) ÷ f′(2) first, keeping its sign, then subtract it."
    }
  },
  "mat-polynomial-power-graphs-unit": {
    "title": "Polynomial and power graphs",
    "card": [
      [
        "Polynomial",
        "a function such as y = x³ − 4x, with whole-number powers of x. Its domain is all real numbers and its graph has no asymptotes."
      ],
      [
        "Intercepts",
        "The y-intercept is found by putting x = 0. The x-intercepts are found by solving y = 0. For y = x³ − 4x, x(x − 2)(x + 2) = 0, so x = −2, 0 or 2."
      ],
      [
        "Power function",
        "y = x^n with n negative, such as y = 1/x², has the asymptotes x = 0 and y = 0. Its domain leaves out x = 0. A square root such as y = √x is also a power function, with domain x ≥ 0."
      ],
      [
        "Stationary points",
        "These are points where the gradient is 0. A stationary point of inflection also has a curve that changes concavity, as in y = x³ at (0, 0). A cubic can have two turning points or none."
      ]
    ],
    "remember": "Polynomials have no asymptotes and a domain of all reals. Negative powers have asymptotes and leave out x = 0.",
    "a": {
      "q": "What are the x-intercepts of y = x³ − 9x?",
      "opts": ["−3, 0 and 3", "0 and 9", "−9, 0 and 9", "3 only"],
      "why": "Factorise: x(x − 3)(x + 3) = 0, so x = −3, 0 or 3. The option 0 and 9 comes from stopping at x² = 9 and mistaking it for x = 9.",
      "clue": "Take out a common factor of x first, then factorise what is left."
    },
    "b": {
      "d": 2,
      "q": "Which function has a vertical asymptote at x = 0?",
      "opts": ["y = 1/x²", "y = x²", "y = x³", "y = √x"],
      "why": "A negative power puts x in the denominator, so x = 0 is not allowed and the graph rises or falls without limit near it. Polynomials have no asymptotes. The graph of y = √x starts at (0, 0), so it has no asymptote.",
      "clue": "Look for the function where x = 0 is not in the domain."
    }
  },
  "mat-exponential-logarithmic-graphs": {
    "title": "Exponential and logarithmic graphs",
    "card": [
      "y = e^x has domain all real x and range y > 0. It has a horizontal asymptote at y = 0 and a y-intercept at (0, 1).",
      "y = log_e(x) is the inverse of y = e^x, so its graph is the reflection of y = e^x in the line y = x. It has domain x > 0, a vertical asymptote at x = 0 and an x-intercept at (1, 0).",
      "A translation moves the asymptote with the graph. For y = e^x + c, the asymptote is y = c. For y = log_e(x − h), the asymptote is x = h.",
      "Example: y = e^x + 3 has asymptote y = 3. Its y-intercept is e⁰ + 3 = 4, so the point is (0, 4)."
    ],
    "remember": "e^x and log_e(x) mirror each other in y = x. Translations move the asymptote too.",
    "a": {
      "q": "What is the vertical asymptote of y = log_e(x − 2)?",
      "opts": ["x = 2", "x = −2", "x = 0", "y = 2"],
      "why": "Replacing x with x − 2 moves the graph 2 units right, so the asymptote x = 0 moves to x = 2. The option x = −2 comes from reading the sign the wrong way.",
      "clue": "Which way does x − 2 shift the graph?"
    },
    "b": {
      "d": 3,
      "q": "What is the y-intercept of y = e^x − 5?",
      "opts": ["(0, −4)", "(0, −5)", "(0, 1)", "(0, −6)"],
      "why": "At x = 0, y = e⁰ − 5 = 1 − 5 = −4. The option (0, −5) is tempting but it is the asymptote level, not the intercept, because e⁰ is 1 and not 0.",
      "clue": "Put x = 0 in and remember what e⁰ equals."
    }
  },
  "mat-circular-function-graphs": {
    "title": "Circular function graphs",
    "card": [
      "The graph of y = a sin(n(x − b)) + c is a wave. The same four numbers shape y = a cos(n(x − b)) + c and y = a tan(n(x − b)) + c.",
      [
        "Amplitude and centre",
        "The amplitude is |a|, the height from the centre line to a peak. The centre line is y = c, so the range of sine and cosine is from c − |a| to c + |a|. Tangent has no peaks, so it has no amplitude."
      ],
      [
        "Period and phase",
        "The period is 2π ÷ |n| for sine and cosine, and π ÷ |n| for tangent. The graph shifts b units right, so b is the phase shift."
      ],
      [
        "Example",
        "y = 3 sin(2(x − π/4)) + 1 has amplitude 3, period 2π ÷ 2 = π, centre line y = 1, and a shift of π/4 right. Its range is from −2 to 4."
      ]
    ],
    "remember": "a sets the height, n the period, b the shift right, c the centre line.",
    "a": {
      "q": "For y = 5 cos(4x) − 2, what are the amplitude and the period?",
      "opts": ["Amplitude 5, period π/2", "Amplitude 5, period 8π", "Amplitude 2, period π/2", "Amplitude 4, period π/2"],
      "why": "The amplitude is |a| = 5. The period is 2π ÷ |4| = π/2. Amplitude 2 is wrong because −2 only moves the centre line down, it does not set the height of the wave.",
      "clue": "Amplitude comes from a, and the period is 2π divided by |n|."
    },
    "b": {
      "d": 3,
      "q": "A tide height in metres is h = 2 sin(π/6 (t − 3)) + 5, with t in hours. What are the lowest height and the period?",
      "opts": ["3 m and 12 hours", "3 m and 6 hours", "7 m and 12 hours", "2 m and 12 hours"],
      "why": "The lowest height is c − |a| = 5 − 2 = 3 m. The period is 2π ÷ (π/6) = 12 hours. 7 m is the highest height, not the lowest, and a period of 6 hours comes from dividing π by n, which is the tangent rule.",
      "clue": "Lowest height is the centre line minus the amplitude."
    }
  },
  "mat-transformations-mapping-form": {
    "title": "Transformations in mapping form",
    "card": [
      "A mapping rule such as (x, y) → (2x + 1, 3y) says where each point (x, y) on a graph moves to. The first part gives the new x-value. The second part gives the new y-value.",
      "A number multiplying a part is a dilation: 2x dilates from the y-axis by a factor of 2, and 3y dilates from the x-axis by a factor of 3. A negative sign is a reflection: −y reflects in the x-axis and −x reflects in the y-axis.",
      "A number added or subtracted is a translation. In the x-part, x + 1 moves the graph 1 unit right and x − 4 moves it 4 units left. In the y-part, y + 2 moves it 2 units up and y − 2 moves it 2 units down.",
      "Worked example: apply (x, y) → (2x + 1, 3y) to the point (4, 5). New x = 2 × 4 + 1 = 9. New y = 3 × 5 = 15. The point moves to (9, 15)."
    ],
    "remember": "Read a mapping rule as new x, then new y, and apply it to each point.",
    "a": {
      "q": "The rule (x, y) → (2x + 1, 3y) is applied to the point (3, −2). Where does the point move to?",
      "opts": ["(7, −6)", "(8, −6)", "(7, 6)", "(7, −5)"],
      "why": "New x = 2 × 3 + 1 = 7. New y = 3 × (−2) = −6. The point moves to (7, −6). (8, −6) comes from adding 1 before doubling, which is the wrong order, since the rule doubles x and then adds 1.",
      "clue": "Double x first, then add 1, and multiply y by 3."
    },
    "b": {
      "d": 3,
      "q": "Which mapping rule reflects a graph in the x-axis and then translates it 4 units to the left? (Apply the reflection first.)",
      "opts": ["(x, y) → (x − 4, −y)", "(x, y) → (x + 4, −y)", "(x, y) → (−x − 4, y)", "(x, y) → (−x + 4, y)"],
      "why": "Reflecting in the x-axis changes y to −y and leaves x alone. Moving 4 units left subtracts 4 from x, so the rule is (x − 4, −y). (x + 4, −y) moves the graph 4 units right, which is the tempting sign mistake.",
      "clue": "Reflection in the x-axis changes the y-part only."
    }
  },
  "mat-sums-products-functions": {
    "title": "Sums and products of functions",
    "card": [
      "(f + g)(x) = f(x) + g(x) and (f × g)(x) = f(x) × g(x). Each is built by working with the two outputs at the same x value.",
      "The new function exists only where both f and g exist. Its domain is the overlap of the two domains.",
      "To sketch f + g, add the heights of the two graphs at each x. To sketch f × g, multiply the heights. Where one height is 0, the product is 0.",
      "Example: f(x) = x² with domain R, and g(x) = √x with domain [0, ∞). Then (f + g)(4) = 16 + 2 = 18, and the domain of f + g is [0, ∞)."
    ],
    "remember": "Combine the outputs at the same x, and only use x values that both functions allow.",
    "a": {
      "q": "f(x) = 2x + 1 and g(x) = x². What is (f × g)(3)?",
      "opts": ["63", "30", "16", "28"],
      "why": "f(3) = 7 and g(3) = 9, so the product is 7 × 9 = 63. The answer 16 comes from adding the outputs, which gives f + g, not f × g.",
      "clue": "Find each output at x = 3, then multiply them."
    },
    "b": {
      "d": 3,
      "q": "f(x) = √(x − 2) and g(x) = 1/(x − 5). What is the domain of f + g?",
      "opts": ["[2, ∞) except x = 5", "[2, ∞)", "R except x = 5", "(2, ∞) except x = 5"],
      "why": "f needs x ≥ 2, and g needs x ≠ 5. The shared domain keeps x ≥ 2 and removes 5. R except x = 5 ignores the limit from f.",
      "clue": "Check what each function rules out, then keep only what both allow."
    }
  },
  "mat-composite-functions": {
    "title": "Composite functions",
    "card": [
      "A composite function applies one function and then another. In f(g(x)), g is applied first and f is applied to the result.",
      "Worked example: f(x) = 2x + 1 and g(x) = x². Then f(g(x)) = 2(x²) + 1 = 2x² + 1. For x = 3: g(3) = 9, then f(9) = 19.",
      "The order matters. Here g(f(x)) = (2x + 1)², and g(f(3)) = 7² = 49, which is not 19.",
      "f(g(x)) exists only when the range of g sits inside the domain of f. Every output of g must be an input that f accepts."
    ],
    "remember": "In f(g(x)), work from the inside out. It exists only if the range of g fits inside the domain of f.",
    "a": {
      "q": "Let f(x) = 3x − 2 and g(x) = x + 4. What is f(g(x))?",
      "opts": ["3x + 10", "3x + 2", "3x − 6", "x + 2"],
      "why": "Apply g first: g(x) = x + 4. Then f of that is 3(x + 4) − 2 = 3x + 10. The option 3x + 2 comes from adding 4 after f, which is g(f(x)) and applies the functions in the wrong order.",
      "clue": "Put x + 4 into f in place of x."
    },
    "b": {
      "d": 3,
      "q": "Let f(x) = √x with domain [0, ∞) and g(x) = x − 5 with domain R. Why does f(g(x)) not exist on the whole domain R?",
      "opts": [
        "The range of g is not inside the domain of f",
        "The range of f is not inside the domain of g",
        "The domain of g is not inside the range of f",
        "The functions give different outputs when swapped"
      ],
      "why": "The range of g is all real numbers, but f accepts only inputs of 0 or more, so some outputs of g cannot go into f. The option 'the range of f is not inside the domain of g' swaps the roles: that is the test for g(f(x)), and it is false here anyway, since g accepts every real number. The domain of g is not the test for f(g(x)), so 'the domain of g is not inside the range of f' is wrong too.",
      "clue": "g goes first, so its outputs become inputs for f."
    }
  },
  "mat-inverse-functions-unit-3": {
    "title": "Inverse functions",
    "card": [
      "A function is one-to-one if each y-value comes from only one x-value. A horizontal line cuts its graph at most once. Only a one-to-one function has an inverse function.",
      "The inverse f⁻¹ undoes f. Its domain is the range of f, and its range is the domain of f. The graphs are reflections of each other in the line y = x.",
      "To find f⁻¹, swap x and y, then solve for y. Example: f(x) = 2x + 3. Swap: x = 2y + 3. Solve: y = (x − 3)/2. So f⁻¹(x) = (x − 3)/2.",
      "y = x² is not one-to-one, as x = 2 and x = −2 both give 4. Restrict the domain, such as x ≥ 0, and it becomes one-to-one. Then the inverse is f⁻¹(x) = √x."
    ],
    "remember": "Swap x and y to find the inverse. Its domain is the range of f.",
    "a": {
      "q": "f(x) = 3x − 6 is a one-to-one function. What is f⁻¹(x)?",
      "opts": ["(x + 6)/3", "(x − 6)/3", "x/3 + 6", "−3x + 6"],
      "why": "Swap to get x = 3y − 6. Add 6 to get x + 6 = 3y, so y = (x + 6)/3. (x − 6)/3 is tempting, but it subtracts 6 when the inverse must undo the subtraction by adding 6.",
      "clue": "Swap x and y, then solve for y."
    },
    "b": {
      "d": 3,
      "q": "g(x) = (x − 2)², with domain x ≥ 2. What are the domain and rule of g⁻¹?",
      "opts": ["x ≥ 0, g⁻¹(x) = √x + 2", "x ≥ 2, g⁻¹(x) = √x + 2", "x ≥ 0, g⁻¹(x) = √x − 2", "x ≥ 2, g⁻¹(x) = √x − 2"],
      "why": "The range of g is y ≥ 0, so the domain of g⁻¹ is x ≥ 0. Swap: x = (y − 2)², so y − 2 = √x since y ≥ 2, and y = √x + 2. Using the domain of g as the domain of g⁻¹ is the tempting mistake.",
      "clue": "The domain of the inverse is the range of g, not the domain of g."
    }
  },
  "mat-hybrid-functions-modelling": {
    "title": "Hybrid functions and modelling",
    "card": [
      "A hybrid (piecewise) function uses different rules on different parts of its domain. Each rule is written with the x-values it applies to.",
      "Example: a taxi charges $3 per km up to 10 km, then $2 per km after that. For x ≤ 10, C(x) = 3x. For x > 10, C(x) = 30 + 2(x − 10).",
      "To find a value, first check which x-interval the input is in. Then use only that rule. For x = 14, use the second rule: C(14) = 30 + 2 × 4 = 38.",
      "If the pieces meet at the boundary, the graph has no jump there. Here 3 × 10 = 30 and the second rule also gives 30 at x = 10, so the graph joins up."
    ],
    "remember": "Pick the rule by the interval the input falls in, then use only that rule.",
    "a": {
      "q": "A function is f(x) = 2x + 1 for x < 3, and f(x) = 10 − x for x ≥ 3. What is f(5)?",
      "opts": ["5", "11", "6", "−5"],
      "why": "Since 5 ≥ 3, use the second rule: f(5) = 10 − 5 = 5. The first rule gives 11, but it only applies for x < 3.",
      "clue": "Check which interval 5 is in first."
    },
    "b": {
      "d": 3,
      "q": "Mia's gym charges C(x) = 20x dollars for x ≤ 8 visits, and C(x) = 160 + 12(x − 8) for x > 8. What is the cost for 11 visits?",
      "opts": ["$196", "$220", "$132", "$36"],
      "why": "Since 11 > 8, use the second rule: 160 + 12 × 3 = 160 + 36 = 196. The tempting $220 applies 20 to every visit, but the cheaper rate applies only after 8 visits.",
      "clue": "Only the visits after the 8th use the second rate, and 160 is the cost of the first 8."
    }
  },
  "mat-polynomial-equations-unit-3": {
    "title": "Polynomial equations",
    "card": [
      "A polynomial of degree n has at most n real solutions. A cubic has at most 3, and a quadratic at most 2. It can have fewer.",
      "To solve by factorising, move every term to one side so the other side is 0. Factorise, then set each factor equal to 0 (the null factor law).",
      "Example: x³ − 4x = 0 gives x(x − 2)(x + 2) = 0, so x = 0, x = 2 or x = −2. Three solutions from a cubic.",
      "If it will not factorise, graph y = the polynomial. The real solutions are the x-intercepts. A calculator can also find them numerically."
    ],
    "remember": "Set one side to 0, then factorise. A degree n polynomial has at most n real solutions.",
    "a": {
      "q": "How many real solutions does x³ − 9x = 0 have?",
      "opts": ["3", "2", "1", "9"],
      "why": "x³ − 9x = x(x − 3)(x + 3) = 0, so x = 0, 3 or −3. Three solutions is the most a cubic can have. Dividing both sides by x would lose x = 0 and leave only 2.",
      "clue": "Factorise fully, then set each factor to 0."
    },
    "b": {
      "d": 3,
      "q": "What are all the real solutions of x³ = 4x²?",
      "opts": ["x = 0 or x = 4", "x = 4 only", "x = 0 or x = 2", "x = 0, x = 2 or x = −2"],
      "why": "Move terms to one side: x³ − 4x² = 0, so x²(x − 4) = 0. Then x = 0 or x = 4. Dividing both sides by x² would lose x = 0, which is the tempting mistake that gives x = 4 only.",
      "clue": "Get 0 on one side before you factorise."
    }
  },
  "mat-exponential-logarithmic-equations": {
    "title": "Exponential and logarithmic equations",
    "card": [
      [
        "Same base",
        "If both sides can be written with the same base, equate the indices. Example: 2^(x+1) = 32 = 2⁵, so x + 1 = 5 and x = 4."
      ],
      [
        "Take logs",
        "If the bases cannot match, take logs of both sides. Example: 3^x = 20 gives x = log₃(20) = log(20) ÷ log(3), which is about 2.73."
      ],
      [
        "Log equations",
        "Combine the logs into one using the log laws, then rewrite in index form. Example: log₂(x) + log₂(x − 2) = 3 gives log₂(x(x − 2)) = 3, so x² − 2x = 8."
      ],
      [
        "Domain check",
        "A log needs a positive input. Test each answer in the original equation. For x² − 2x = 8, x = 4 or x = −2. Only x = 4 works, as log₂(−2) is undefined."
      ]
    ],
    "remember": "Match the base or take logs, then check every answer against the log's domain.",
    "a": {
      "q": "Solve 3^(2x) = 81.",
      "opts": ["x = 2", "x = 4", "x = 9", "x = 40"],
      "why": "81 = 3⁴, so 2x = 4 and x = 2. Choosing x = 4 comes from stopping at the index 4 and forgetting to divide by 2.",
      "clue": "Write 81 as a power of 3, then equate the indices."
    },
    "b": {
      "d": 3,
      "q": "Solve log₃(x) + log₃(x − 6) = 3 for x.",
      "opts": ["x = 9", "x = −3", "x = 9 or x = −3", "x = 27"],
      "why": "Combining gives x(x − 6) = 27, so x² − 6x − 27 = 0 and (x − 9)(x + 3) = 0. The input of a log must be positive, so x = −3 is rejected and only x = 9 remains. Giving both values skips the domain check.",
      "clue": "Test each solution in the original equation."
    }
  },
  "mat-trigonometric-equations-unit-3": {
    "title": "Trigonometric equations",
    "card": [
      "To solve sin(x) = k, cos(x) = k or tan(x) = k, first find the reference angle α. It is the angle from 0 to π/2 whose sin, cos or tan equals |k|, so ignore the sign of k at this step.",
      "Use the signs in the quadrants to place the solutions. Sin is positive in quadrants 1 and 2, cos in 1 and 4, tan in 1 and 3. For a negative k, use the two quadrants where the function is negative.",
      "Quadrant 1 gives α, quadrant 2 gives π − α, quadrant 3 gives π + α and quadrant 4 gives 2π − α. Add the period for more solutions: 2π for sin and cos, π for tan. Keep every solution in the domain.",
      "For sin(2x) = 1/2 on 0 ≤ x ≤ 2π, solve for 2x on 0 ≤ 2x ≤ 4π. Here α = π/6, so 2x = π/6, 5π/6, 13π/6, 17π/6. Divide by 2: x = π/12, 5π/12, 13π/12, 17π/12."
    ],
    "remember": "Reference angle, then quadrants, then add the period, and change the domain first if x is transformed.",
    "a": {
      "q": "Solve 2cos(x) = 1 for 0 ≤ x ≤ 2π. What are the solutions?",
      "opts": ["π/3 and 5π/3", "π/3 and 2π/3", "π/6 and 11π/6", "π/3 and 4π/3"],
      "why": "cos(x) = 1/2, so the reference angle is π/3. Cos is positive in quadrants 1 and 4, giving π/3 and 2π − π/3 = 5π/3. Using π/3 and 2π/3 is tempting, but that is the pair for sin, where quadrants 1 and 2 are positive.",
      "clue": "Cos is positive in which two quadrants?"
    },
    "b": {
      "d": 3,
      "q": "How many solutions does sin(2x) = 1/2 have for 0 ≤ x ≤ π?",
      "opts": ["2", "1", "4", "3"],
      "why": "Let u = 2x, so 0 ≤ u ≤ 2π. Then sin(u) = 1/2 gives u = π/6 and 5π/6, so x = π/12 and 5π/12. Giving 4 solutions comes from using the domain 0 to 4π for 2x, which is too wide here.",
      "clue": "Change the domain for 2x before you solve."
    }
  },
  "mat-literal-parameter-equations": {
    "title": "Literal and parameter equations",
    "card": [
      "A parameter is a letter that stands for a fixed number whose value is not given, such as k in kx + 2 = 3. The unknown to solve for is x.",
      "Collect the x terms and write the equation as ax = b, where a and b may involve k. Then check whether a is zero before dividing.",
      ["One solution", "if a ≠ 0, divide to get x = b/a. For kx + 2 = 3, we get kx = 1, so x = 1/k when k ≠ 0."],
      [
        "None or infinitely many",
        "if a = 0, the equation becomes 0 = b. If b ≠ 0 it is false for every x, so there is no solution. If b = 0 it is true for every x, so there are infinitely many."
      ]
    ],
    "remember": "Write ax = b. Only divide by a when a ≠ 0. If a = 0, look at b.",
    "a": {
      "q": "For which value of k does kx + 2 = 3 have no solution?",
      "opts": ["k = 0", "k = 1", "k = 2", "k = 3"],
      "why": "Rearranging gives kx = 1. If k = 0 this becomes 0 = 1, which is false for every x, so there is no solution. For k = 1, 2 or 3 we can divide by k and get one solution.",
      "clue": "Which value of k makes you unable to divide?"
    },
    "b": {
      "d": 3,
      "q": "For which value of m does the equation 3x + 5 = mx + 5 have infinitely many solutions?",
      "opts": ["m = 3", "m = 0", "m = 5", "m = −3"],
      "why": "Collecting x terms gives (3 − m)x = 0. If m = 3 this is 0 = 0, which is true for every x. If m = 0 the equation is 3x = 0, which has the single solution x = 0.",
      "clue": "Make the x coefficient zero, then check what is left on the right."
    }
  },
  "mat-systems-linear-equations": {
    "title": "Systems of linear equations",
    "card": [
      "A system of two linear equations in x and y is a pair of straight lines. A solution is a point on both lines, so if the gradients differ, the lines cross at exactly one point.",
      [
        "No solution",
        "the lines are parallel and never meet. The gradients are equal but the y-intercepts differ, such as y = 2x + 1 and y = 2x + 5."
      ],
      [
        "Infinitely many",
        "both equations describe the same line, so every point on it is a solution. For example, 2y = 4x + 2 is the same line as y = 2x + 1."
      ],
      "With a parameter k, find the k that makes the gradients equal, then compare the y-intercepts. For kx + y = 3 and 2x + y = 5, the gradients are −k and −2, so k = 2. The intercepts 3 and 5 differ, so k = 2 gives no solution."
    ],
    "remember": "Different gradients give one solution. Equal gradients give none or infinitely many, depending on the intercepts.",
    "a": {
      "q": "Which pair of equations has no solution?",
      "opts": [
        "y = 3x + 2 and y = 3x − 4",
        "y = 3x + 2 and y = −3x + 2",
        "y = 3x + 2 and 2y = 6x + 4",
        "y = 3x + 2 and y = 2x + 3"
      ],
      "why": "Both lines have gradient 3 but different y-intercepts, so they are parallel and never meet. The pair with 2y = 6x + 4 is the same line as y = 3x + 2, so it has infinitely many solutions, not none.",
      "clue": "Rewrite each pair as y = mx + c and compare m, then c."
    },
    "b": {
      "d": 3,
      "q": "For the system 3x + ky = 6 and x + 2y = 4, which value of k gives no solution?",
      "opts": ["k = 6", "k = 3", "k = 2/3", "k = −6"],
      "why": "Parallel lines need equal gradients: −3/k = −1/2, so k = 6. Then 3x + 6y = 6 becomes x + 2y = 2, which has a different intercept from x + 2y = 4, so the lines never meet. The other values of k give different gradients, so those lines cross once.",
      "clue": "Make the gradients equal, then check the intercepts differ."
    }
  },
  "mat-bisection-method-2": {
    "title": "Numerical solutions",
    "card": [
      "Some equations cannot be solved exactly with algebra, such as x = cos(x) or eˣ = 3 − x². A numerical method finds an approximate solution instead.",
      "Bisection starts with an interval [a, b] where f is continuous and f(a) and f(b) have opposite signs. Then f(x) = 0 has a solution between a and b.",
      "Find the midpoint m. Keep the half of the interval where the signs still differ, and repeat. Each step halves the interval, so the answer can be found to any accuracy.",
      "Example: f(x) = x² − 2 has f(1) = −1 and f(2) = 2. The midpoint is 1.5 and f(1.5) = 0.25, which is positive. The solution lies in [1, 1.5]."
    ],
    "remember": "Bisection: check for a sign change, halve the interval, and keep the half with the sign change.",
    "a": {
      "q": "For f(x) = x³ − 5, f(1) = −4 and f(2) = 3. Bisection is used on [1, 2]. Which interval holds the solution after one step?",
      "opts": [
        "[1.5, 2], because f(1.5) = −1.625",
        "[1, 1.5], because f(1.5) = −1.625",
        "[1.5, 2], because f(1.5) = 1.625",
        "[1, 1.5], because f(1.5) = 1.625"
      ],
      "why": "The midpoint is 1.5 and f(1.5) = 3.375 − 5 = −1.625. This is negative, like f(1), so the sign change is now between 1.5 and 2. Keeping [1, 1.5] would be wrong, as both ends would be negative.",
      "clue": "Work out f(1.5), then find where the sign changes."
    },
    "b": {
      "d": 3,
      "q": "Mia uses bisection on f(x) = x² − 2 in [1, 2]. After the first step the solution lies in [1, 1.5]. What is the midpoint of the next step, and which interval does she keep?",
      "opts": [
        "1.25, and she keeps [1.25, 1.5]",
        "1.25, and she keeps [1, 1.25]",
        "1.75, and she keeps [1.5, 1.75]",
        "1.75, and she keeps [1, 1.75]"
      ],
      "why": "The midpoint of [1, 1.5] is 1.25. f(1.25) = 1.5625 − 2 = −0.4375, which is negative like f(1), so the sign change is in [1.25, 1.5], where f(1.5) = 0.25 is positive. The midpoint 1.75 comes from using the old interval [1, 2].",
      "clue": "Take the midpoint of the current interval, then check the sign of f there."
    }
  },
  "mat-derivatives-exponential-log-circular": {
    "title": "Derivatives of e, log and trig",
    "card": [
      [
        "Exponential",
        "The derivative of e^(kx) is k e^(kx). The power stays the same and the constant k comes out the front."
      ],
      ["Logarithm", "The derivative of log_e(x) is 1/x, for x > 0."],
      [
        "Sine",
        "The derivative of sin(kx) is k cos(kx). Angles are in radians. In a sum, differentiate each term separately."
      ],
      [
        "Cosine",
        "The derivative of cos(kx) is −k sin(kx). Note the negative sign. A number in front stays as a multiplier: the derivative of 2 cos(3x) is 2 × (−3 sin(3x)) = −6 sin(3x)."
      ]
    ],
    "remember": "For e^(kx), sin(kx) and cos(kx), k comes out the front. log_e(x) gives 1/x, and cos gives a negative sin.",
    "a": {
      "q": "A function is given by f(x) = e^(6x). Which expression is f′(x)?",
      "opts": ["6e^(6x)", "e^(6x)", "6xe^(6x−1)", "e^(6x)/6"],
      "why": "The derivative of e^(kx) is k e^(kx), so with k = 6 it is 6e^(6x). The option e^(6x) is tempting because e^x is its own derivative, but the constant 6 must come out the front.",
      "clue": "The number in front of x comes out the front."
    },
    "b": {
      "d": 3,
      "q": "What is the derivative of 2 cos(4x) + 3 sin(x)?",
      "opts": ["−8 sin(4x) + 3 cos(x)", "8 sin(4x) + 3 cos(x)", "−2 sin(4x) + 3 cos(x)", "−8 sin(4x) − 3 cos(x)"],
      "why": "Each term is done separately. The derivative of 2 cos(4x) is 2 × (−4 sin(4x)) = −8 sin(4x), and the derivative of 3 sin(x) is 3 cos(x). Dropping the negative sign for cos gives the tempting wrong answer 8 sin(4x).",
      "clue": "Multiply the 2 by the −4 from the cos rule."
    }
  },
  "mat-sketching-derivative-antiderivative-graphs": {
    "title": "Sketching derivative and antiderivative graphs",
    "card": [
      "The derivative graph shows the gradient of the original graph. Where the original rises, the derivative is above the x-axis. Where it falls, the derivative is below.",
      "Where the original has a turning point, the derivative graph crosses the x-axis, because the gradient is zero.",
      "Going the other way, an antiderivative has the given graph as its gradient. Where the given graph is positive, the antiderivative rises. Where it is negative, it falls.",
      "Example: a parabola that opens upward has a derivative that is a straight line with positive gradient, crossing the x-axis at the parabola's lowest point."
    ],
    "remember": "The original's gradient is the derivative's height.",
    "a": {
      "q": "A graph rises, reaches a peak, then falls. What does its derivative graph do around the peak?",
      "opts": [
        "Goes from above the x-axis to below it",
        "Goes from below the x-axis to above it",
        "Stays above the x-axis the whole time",
        "Has a peak at the same x-value"
      ],
      "why": "Before the peak the gradient is positive, at the peak it is zero, and after it the gradient is negative. So the derivative crosses the x-axis from above to below. A peak in the original does not give a peak in the derivative.",
      "clue": "Think about the sign of the gradient before and after the peak."
    },
    "b": {
      "d": 3,
      "q": "A graph y = f(x) is below the x-axis for x < 2 and above it for x > 2. What is true of an antiderivative of f?",
      "opts": [
        "It falls until x = 2, then rises",
        "It rises until x = 2, then falls",
        "It is below the x-axis for x < 2",
        "It is above the x-axis for x > 2"
      ],
      "why": "The antiderivative has gradient f(x). Where f is negative it falls, and where f is positive it rises, so it has a lowest point at x = 2. The options saying it is below the x-axis for x < 2 or above it for x > 2 mix up height and gradient: the sign of f sets the antiderivative's gradient, not its height.",
      "clue": "The sign of f gives the gradient of the antiderivative, not its height."
    }
  },
  "mat-stationary-points-curve-sketching": {
    "title": "Stationary points and curve sketching",
    "card": [
      ["Stationary point", "A stationary point is where f′(x) = 0. Solve this equation to find the x-values."],
      [
        "Nature",
        "Check the sign of f′ on each side. Positive then negative is a local maximum. Negative then positive is a local minimum. The same sign on both sides is a stationary point of inflection."
      ],
      [
        "Increasing",
        "If f′(x) > 0 across an interval, except at isolated points where f′(x) = 0, f is strictly increasing there. So x³ is strictly increasing for all x, even though f′(0) = 0. With f′(x) < 0, f is strictly decreasing. Endpoints where f′ = 0 are usually included."
      ],
      [
        "Example",
        "For f(x) = x³ − 3x, f′(x) = 3x² − 3 = 0 gives x = −1 or x = 1. f′ < 0 between them, so f is strictly decreasing on [−1, 1], endpoints included."
      ]
    ],
    "remember": "Set f′(x) = 0 to find stationary points, then use the sign of f′ to decide their nature.",
    "a": {
      "q": "What are the x-values of the stationary points of f(x) = x² − 6x + 5?",
      "opts": ["x = 3 only", "x = 1 and x = 5", "x = −3 only", "x = 6 only"],
      "why": "f′(x) = 2x − 6 = 0 gives x = 3. The values 1 and 5 are the x-intercepts, where f(x) = 0, not where f′(x) = 0.",
      "clue": "Differentiate first, then set the derivative to zero."
    },
    "b": {
      "d": 3,
      "q": "For f(x) = x³ − 12x, what is the largest interval on which f is strictly decreasing?",
      "opts": ["[−2, 2]", "(−∞, −2] ∪ [2, ∞)", "(−∞, 2]", "[−2, ∞)"],
      "why": "f′(x) = 3x² − 12 = 3(x − 2)(x + 2). This is negative between −2 and 2 and zero only at the endpoints, so f is strictly decreasing on [−2, 2]. Outside this interval f′ is positive, so the reversed answer is where f is increasing.",
      "clue": "Factorise f′ and decide where it is negative."
    }
  },
  "mat-random-variables": {
    "title": "Random variables",
    "card": [
      "A random variable gives a number to each outcome of an experiment. It is written with a capital letter, such as X.",
      "Example: toss a coin 3 times. Let X be the number of heads. The outcome HTH gives X = 2.",
      [
        "Discrete",
        "it takes separate values that can be counted, such as 0, 1, 2, 3. Counting things usually gives a discrete variable."
      ],
      [
        "Continuous",
        "it can take any value in a range, such as 1.5 or 1.52. Measuring things such as time, mass or height usually gives a continuous variable."
      ]
    ],
    "remember": "A random variable turns outcomes into numbers. Separate values make it discrete. Any value in a range makes it continuous.",
    "a": {
      "q": "Which of these random variables is discrete?",
      "opts": [
        "The number of goals scored in a netball match",
        "The time a runner takes to finish 100 m",
        "The mass of a watermelon at a market",
        "The height of a tree in a park"
      ],
      "why": "Goals are counted and take separate values such as 0, 1, 2. Time, mass and height are measured and can take any value in a range, so they are continuous.",
      "clue": "Which one is counted rather than measured?"
    },
    "b": {
      "d": 3,
      "q": "Priya records the number of red cars among the next 20 cars to pass her school. She also records the time between two cars passing. Which describes these two random variables?",
      "opts": [
        "The count is discrete and the time is continuous",
        "The count is continuous and the time is discrete",
        "Both are discrete because they are recorded as numbers",
        "Both are continuous because they are random"
      ],
      "why": "The number of red cars takes separate values: it can only be 0, 1, 2, up to 20. The time between cars can be any value in a range. Being recorded as a number does not make a variable discrete.",
      "clue": "Ask whether each value is counted or measured."
    }
  },
  "mat-expected-value-variance": {
    "title": "Expected value and variance",
    "card": [
      "The expected value is the long-run mean of X. E(X) = sum of x × Pr(X = x), taken over every value of x.",
      "The variance is Var(X) = E(X²) − (E(X))². Find E(X²) by adding x² × Pr(X = x). The standard deviation is the square root of Var(X).",
      "Example: X takes 0, 1, 2 with probabilities 0.5, 0.3, 0.2. E(X) = 0 + 0.3 + 0.4 = 0.7.",
      "E(X²) = 0 + 0.3 + 0.8 = 1.1. So Var(X) = 1.1 − 0.7² = 1.1 − 0.49 = 0.61."
    ],
    "remember": "Find E(X), then E(X²), then subtract the square of E(X). Take the square root for the standard deviation.",
    "a": {
      "q": "X takes the values 1, 2, 3 with probabilities 0.2, 0.5, 0.3. What is E(X)?",
      "opts": ["2.1", "2", "4.9", "1.9"],
      "why": "E(X) = 1 × 0.2 + 2 × 0.5 + 3 × 0.3 = 0.2 + 1 + 0.9 = 2.1. Averaging the values 1, 2, 3 gives 2, which ignores the probabilities. 4.9 is E(X²), not E(X).",
      "clue": "Multiply each value by its own probability, then add."
    },
    "b": {
      "d": 3,
      "q": "A game gives a score X of 0, 2 or 4 with probabilities 0.4, 0.4, 0.2. What is Var(X)?",
      "opts": ["2.24", "2.56", "3.2", "4.8"],
      "why": "E(X) = 0 + 0.8 + 0.8 = 1.6 and E(X²) = 0 + 1.6 + 3.2 = 4.8, so Var(X) = 4.8 − 1.6² = 4.8 − 2.56 = 2.24. The tempting 2.56 is only (E(X))², and 3.2 comes from subtracting 1.6 without squaring it.",
      "clue": "Subtract the square of the mean from E(X²)."
    }
  },
  "mat-binomial-distribution": {
    "title": "The binomial distribution",
    "card": [
      "A Bernoulli trial has two outcomes, success or failure. The chance of success is p, and the chance of failure is 1 − p.",
      "Let X be the number of successes in n trials. X is binomial if n is fixed, the trials are independent and p is the same every time. We write X ~ Bin(n, p).",
      "The chance of exactly x successes is Pr(X = x) = nCx × p^x × (1 − p)^(n − x). Here nCx counts the ways to place x successes among n trials.",
      "Example: a fair coin is tossed 3 times and X is the number of heads. X ~ Bin(3, 0.5). Pr(X = 2) = 3 × 0.5² × 0.5 = 0.375."
    ],
    "remember": "Fixed n, independent trials, same p each time: count the successes and you have a binomial.",
    "a": {
      "q": "A fair coin is tossed 4 times. X is the number of heads. What is Pr(X = 3)?",
      "opts": ["0.25", "0.0625", "0.5", "0.125"],
      "why": "X ~ Bin(4, 0.5), so Pr(X = 3) = 4 × 0.5³ × 0.5 = 4 × 0.0625 = 0.25. The option 0.0625 leaves out the factor 4 for the ways to place the 3 heads.",
      "clue": "Count the ways to place 3 heads among 4 tosses."
    },
    "b": {
      "d": 3,
      "q": "Which situation is best modelled by a binomial distribution?",
      "opts": [
        "Number of sixes in 10 rolls of a fair die",
        "Number of rolls of a fair die until the first six",
        "Number of red cards in 5 cards dealt, no replacing",
        "Number of rolls of a die until 3 sixes appear"
      ],
      "why": "Ten rolls give a fixed n, independent trials and the same p of 1/6 each time. Dealing cards without replacement changes the chance of red after each card, so the trials are not independent and p does not stay the same.",
      "clue": "Check for a fixed number of trials and a constant p."
    }
  },
  "mat-mean-variance-binomial": {
    "title": "Mean and variance of a binomial",
    "card": [
      "Suppose X is binomial with n trials and chance of success p on each trial. Then the mean is E(X) = np.",
      "The variance is Var(X) = np(1 − p). The standard deviation is the square root of the variance.",
      "Example: n = 50 and p = 0.2. E(X) = 50 × 0.2 = 10.",
      "Var(X) = 50 × 0.2 × 0.8 = 8. The standard deviation is √8, about 2.83."
    ],
    "remember": "Mean is np. Variance is np(1 − p), and the standard deviation is its square root.",
    "a": {
      "q": "X is binomial with n = 40 and p = 0.25. What is E(X)?",
      "opts": ["10", "7.5", "30", "0.625"],
      "why": "E(X) = np = 40 × 0.25 = 10. The value 7.5 is the variance, np(1 − p), not the mean.",
      "clue": "Multiply the number of trials by the chance of success."
    },
    "b": {
      "d": 3,
      "q": "A bakery in Ballarat finds 10% of its pies are underbaked. In a batch of 80 pies, X is the number underbaked. What is the standard deviation of X, to 2 decimal places?",
      "opts": ["2.68", "7.2", "8", "2.83"],
      "why": "Var(X) = 80 × 0.1 × 0.9 = 7.2. The standard deviation is √7.2 = 2.68. The value 7.2 is the variance, and 8 is the mean.",
      "clue": "Find the variance first, then take the square root."
    }
  },
  "mat-mean-median-variance-continuous": {
    "title": "Mean, median and variance of a continuous variable",
    "card": [
      [
        "Mean",
        "For a pdf f(x), the mean is E(X) = ∫ x f(x) dx, taken over the values X can take. It is the balance point of the distribution."
      ],
      [
        "Median",
        "The median m splits the area under f into two halves. Solve ∫ f(x) dx = 1/2, from the lowest value of X up to m."
      ],
      [
        "Variance",
        "Var(X) = E(X²) − [E(X)]², where E(X²) = ∫ x² f(x) dx. The standard deviation is the square root of the variance."
      ],
      [
        "Example",
        "Let f(x) = 2x for 0 ≤ x ≤ 1. Mean = ∫ 2x² dx = 2/3. Median: x² = 1/2, so m = √2/2. E(X²) = ∫ 2x³ dx = 1/2, so Var(X) = 1/2 − 4/9 = 1/18."
      ]
    ],
    "remember": "Mean uses x times f(x). Median uses half the area. Variance is E(X²) minus the mean squared.",
    "a": {
      "q": "X has pdf f(x) = 3x² for 0 ≤ x ≤ 1, and 0 otherwise. What is E(X)?",
      "opts": ["3/4", "1/2", "3/5", "1"],
      "why": "E(X) = ∫ x · 3x² dx from 0 to 1 = [3x⁴/4] = 3/4. The value 3/5 is tempting, but it comes from ∫ x² · 3x² dx, which is E(X²), not the mean.",
      "clue": "Multiply f(x) by x before you integrate."
    },
    "b": {
      "d": 3,
      "q": "The time T hours that Priya spends on a task has pdf f(t) = t/2 for 0 ≤ t ≤ 2, and 0 otherwise. What is the median of T?",
      "opts": ["√2", "4/3", "1", "2"],
      "why": "Solve ∫ t/2 dt from 0 to m = m²/4 = 1/2, so m² = 2 and m = √2. The value 4/3 is the mean, found with ∫ t · t/2 dt. The value 1 is the middle of the range, but the area is not split evenly there.",
      "clue": "Set the area from 0 to m equal to 1/2, then solve for m."
    }
  },
  "mat-standard-normal-distribution": {
    "title": "The standard normal distribution",
    "card": [
      "The standard normal variable Z has mean 0 and standard deviation 1. Any normal variable X with mean μ and standard deviation σ can be turned into Z.",
      "The rule is Z = (X − μ)/σ. Subtract the mean, then divide by the standard deviation.",
      "The value of Z says how many standard deviations X is from the mean. It is negative below the mean and positive above it.",
      "To go back, use X = μ + σZ. Example: if μ = 50 and σ = 4, then X = 58 gives Z = (58 − 50)/4 = 2. The probability Pr(X < 58) equals Pr(Z < 2)."
    ],
    "remember": "Z counts standard deviations from the mean, so a probability for X equals the matching probability for Z.",
    "a": {
      "q": "A machine fills bags with mass X grams, normal with mean 250 and standard deviation 8. What is Z for a bag of 234 g?",
      "opts": ["−2", "2", "−16", "−0.5"],
      "why": "Z = (234 − 250)/8 = −16/8 = −2. The value −16 is only the top line: it skips the division by the standard deviation. The bag is below the mean, so Z must be negative, which rules out 2.",
      "clue": "Subtract the mean first, then divide."
    },
    "b": {
      "d": 3,
      "q": "Daniel's bus journey time X, in minutes, is normal with mean 40 and standard deviation 6. One trip has a Z value of 1.5. How long did the trip take?",
      "opts": ["49 minutes", "31 minutes", "41.5 minutes", "60 minutes"],
      "why": "X = μ + σZ = 40 + 6 × 1.5 = 49. A positive Z means above the mean, so 31 is wrong. The value 41.5 adds Z without multiplying by σ, and 60 multiplies the mean by Z.",
      "clue": "Z is a number of standard deviations. Turn it into minutes before adding."
    }
  },
  "mat-populations-samples": {
    "title": "Populations and samples",
    "card": [
      [
        "Population",
        "the whole group we want to know about, such as every Year 12 student in Victoria. A number that describes the population is a parameter, such as the population proportion p."
      ],
      [
        "Sample",
        "a smaller group taken from the population. A number worked out from the sample is a statistic, such as the sample proportion p̂ = number with the feature ÷ sample size."
      ],
      "We use a statistic to estimate a parameter. Example: in a random sample of 50 students, 30 own a bike. Then p̂ = 30/50 = 0.6.",
      "A different random sample can give a different statistic. The parameter p is fixed, but p̂ varies from sample to sample."
    ],
    "remember": "A sample statistic estimates a population parameter. The parameter is fixed, but the statistic varies between samples.",
    "a": {
      "q": "In a random sample of 200 Geelong voters, 90 back a new bike path. What is the value of p̂ and what does it estimate?",
      "opts": [
        "0.45, the proportion of all Geelong voters who back it",
        "0.45, the proportion of the 200 who back it",
        "0.9, the proportion of all Geelong voters who back it",
        "0.55, the proportion of all Geelong voters who back it"
      ],
      "why": "p̂ = 90/200 = 0.45. This is a statistic from the sample, and it estimates the population parameter p, the proportion of all Geelong voters. The proportion in the sample is already known to be exactly 0.45, so it is not what is being estimated.",
      "clue": "Divide the count by the sample size, then ask which group is being estimated."
    },
    "b": {
      "d": 2,
      "q": "Priya takes a random sample of 40 students from a school of 900. She finds p̂ = 0.35. A friend takes another random sample of 40 and finds p̂ = 0.30. What is the best explanation?",
      "opts": [
        "Sample statistics vary from sample to sample",
        "The population proportion p has changed",
        "One of the two samples must have been counted wrongly",
        "The samples came from two different populations"
      ],
      "why": "Different random samples usually give different values of p̂, even when the population proportion p stays the same. The parameter p is fixed, so it has not changed, and both samples come from the same school. Nothing suggests a counting error.",
      "clue": "Is it the sample or the population that changes between draws?"
    }
  },
  "mat-simulating-samples": {
    "title": "Simulating samples",
    "card": [
      "A simulation uses technology to draw many random samples of the same size from a population with a known proportion p. Doing this by hand would take too long.",
      "For each sample, record the sample proportion. Each trial can give a different value, because each random sample can include different members.",
      "Example: set p = 0.4 and n = 50. Ten simulated samples might give 0.36, 0.42, 0.46, 0.38, 0.40, 0.34, 0.44, 0.40, 0.48 and 0.38. The values spread around 0.4 but few equal it.",
      "Plot all the results on a dot plot or histogram. The shape shows how much the statistic varies. Running more trials gives a clearer picture of that variation."
    ],
    "remember": "Simulation repeats random sampling many times to show how much a statistic varies.",
    "a": {
      "q": "A simulation draws 200 random samples, each of size 50, from a population with p = 0.4. Why do the sample proportions vary?",
      "opts": [
        "Random samples differ in which members they include",
        "The simulation has made a calculation error",
        "The population proportion changes each trial",
        "Each sample has a different number of members"
      ],
      "why": "Each trial picks a random set of members, so the sample proportion can change from trial to trial. The population proportion p stays fixed at 0.4, and every sample has 50 members, so neither of those can be the cause.",
      "clue": "What can differ between samples, and what stays fixed?"
    },
    "b": {
      "d": 2,
      "q": "Priya simulates 1000 random samples of size 80 from a population with p = 0.25 and plots the 1000 sample proportions. What does the plot show?",
      "opts": [
        "How much the sample proportion varies between samples",
        "The exact value of p in the population",
        "How the population proportion varies between samples",
        "The proportion in the first sample she drew"
      ],
      "why": "Each dot is one sample proportion, so the plot shows how that statistic varies from sample to sample. The value p was set by Priya and does not vary, so the plot is not showing a changing population proportion.",
      "clue": "Each dot on the plot comes from one sample."
    }
  },
  "mat-sample-proportion": {
    "title": "The sample proportion",
    "card": [
      "The sample proportion is p̂ = X ÷ n, where X is the number in the sample with a feature and n is the sample size.",
      "If we take many random samples of the same size n from a population with proportion p, the value of p̂ changes each time.",
      "For large n, the distribution of p̂ is roughly normal, with mean p and standard deviation √(p(1 − p)/n).",
      "Example: p = 0.4 and n = 100. The standard deviation is √(0.4 × 0.6/100) = √0.0024, which is about 0.049. So p̂ is centred on 0.4 and usually lies within about 0.1 of it."
    ],
    "remember": "p̂ varies between samples, and for large n it is roughly normal and centred on p.",
    "a": {
      "q": "Many random samples of size 100 are taken from a population where p = 0.4. Around which value are the p̂ values centred?",
      "opts": ["0.4", "0.04", "0.5", "100"],
      "why": "The distribution of p̂ is centred on the population proportion p, which is 0.4. The value 0.04 mixes up the mean with a spread-type value, and the sample size is not a proportion.",
      "clue": "Where does the distribution of p̂ sit compared with p?"
    },
    "b": {
      "d": 3,
      "q": "A factory has a fault rate of p = 0.2. Random samples of 400 items are tested. What is the standard deviation of p̂?",
      "opts": ["0.02", "0.0004", "0.16", "0.2"],
      "why": "The standard deviation is √(0.2 × 0.8/400) = √0.0004 = 0.02. The answer 0.0004 is the variance, because the square root step was skipped. The answer 0.16 is just 0.2 × 0.8.",
      "clue": "Use √(p(1 − p)/n) and finish with the square root."
    }
  },
  "mat-approximate-confidence-intervals": {
    "title": "Approximate confidence intervals",
    "card": [
      "A confidence interval gives a range of likely values for the population proportion p. First find p-hat = x ÷ n, where x is the number with the feature and n is the sample size.",
      "An approximate 95% confidence interval for p is p-hat ± 1.96 × √(p-hat(1 − p-hat)/n). Work out the part after ± first. It is the margin of error.",
      "Worked example: 20 of 100 people are left-handed. p-hat = 0.2, so √(0.2 × 0.8 ÷ 100) = √0.0016 = 0.04.",
      "The margin of error is 1.96 × 0.04 = 0.0784. The interval is 0.2 ± 0.0784, which is about 0.122 to 0.278."
    ],
    "remember": "Find p-hat, then p-hat ± 1.96 × √(p-hat(1 − p-hat)/n), with n the sample size.",
    "a": {
      "q": "In a survey of 400 Victorian students, 100 walk to school. What is the approximate 95% confidence interval for p?",
      "opts": ["0.208 to 0.292", "0.228 to 0.272", "0.249 to 0.251", "0.165 to 0.335"],
      "why": "p-hat = 100 ÷ 400 = 0.25. The margin is 1.96 × √(0.25 × 0.75 ÷ 400) ≈ 0.042, giving 0.208 to 0.292. Leaving out 1.96 gives a narrower interval, 0.228 to 0.272, which is not the 95% interval.",
      "clue": "Find p-hat first, then divide by the sample size inside the root."
    },
    "b": {
      "d": 3,
      "q": "A council surveys 900 residents of Ballarat, and 540 say they use the library. What is the margin of error for a 95% interval for p, to 3 decimal places?",
      "opts": ["0.032", "0.016", "0.041", "0.001"],
      "why": "p-hat = 540 ÷ 900 = 0.6, and n = 900. The margin is 1.96 × √(0.6 × 0.4 ÷ 900) ≈ 0.032. Using 540 as n gives 0.041, which mixes up the count with the sample size.",
      "clue": "n is the number surveyed, not the number who said yes."
    }
  },
  "mat-interpreting-confidence-interval": {
    "title": "Interpreting a confidence interval",
    "card": [
      "The true proportion p is a fixed number. Different random samples give different p-hat values, so they give different intervals.",
      "The 95% describes the method. If we took many random samples and made an interval from each, about 95% of the intervals would contain p.",
      "Any one interval either contains p or it does not. We do not know which, but the method works about 95% of the time.",
      "A larger sample size n gives a narrower interval, so p is pinned down more closely. The 95% level stays the same."
    ],
    "remember": "95% describes how often the method captures p. Larger samples give narrower intervals.",
    "a": {
      "q": "A poll of Geelong residents gives a 95% confidence interval of 0.42 to 0.52 for the proportion who support a new bike path. What does the 95% mean?",
      "opts": [
        "About 95% of such intervals contain the true proportion",
        "About 95% of Geelong residents support the bike path",
        "About 95% of sample proportions fall between 0.42 and 0.52",
        "p-hat is about 95% likely to equal the true proportion"
      ],
      "why": "The 95% describes the long run of intervals made by the same method, and about 95% of them contain the true proportion. It is not a percentage of residents, which is the tempting mistake: the interval itself says support is around 42% to 52%.",
      "clue": "Think about many polls, not just this one."
    },
    "b": {
      "d": 3,
      "q": "Hana surveys 100 students and Leo surveys 400 students from the same school, and their p-hat values are close. Both make 95% intervals. Which interval is likely narrower?",
      "opts": [
        "Leo's, because a larger sample varies less",
        "Hana's, because a smaller sample is more precise",
        "Leo's, because his interval is more likely to contain p",
        "Neither, because both are 95% intervals so widths match"
      ],
      "why": "A larger sample varies less from sample to sample, so Leo's interval is narrower. Both methods capture p about 95% of the time, so the confidence level does not make Leo's interval more likely to contain p.",
      "clue": "Both use 95%. What differs is the sample size."
    }
  },
  "mat-number-systems-sets": {
    "title": "Number systems and sets",
    "card": [
      [
        "Number systems",
        "Natural numbers ℕ are 1, 2, 3, and so on. Integers ℤ add 0 and the negatives. Rationals ℚ are numbers that can be written as a/b with a and b integers and b ≠ 0. Reals ℝ include every point on the number line, such as √2 and π."
      ],
      [
        "Nesting",
        "Each system sits inside the next: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Complex numbers ℂ contain all the reals and also numbers such as √(−1)."
      ],
      [
        "Sets",
        "A ∪ B (union) has everything in A or B or both. A ∩ B (intersection) has only what is in both. The complement A′ has everything in the universal set that is not in A."
      ],
      [
        "Subset",
        "A ⊆ B means every element of A is also in B. Example: {3, 4} ⊆ {2, 3, 4, 5}, but {1, 3} is not a subset of it, because 1 is missing."
      ]
    ],
    "remember": "Each number system sits inside the next. Union is in either, intersection is in both.",
    "a": {
      "q": "If A = {2, 4, 6, 8} and B = {4, 8, 10}, what is A ∩ B?",
      "opts": ["{4, 8}", "{2, 4, 6, 8, 10}", "{2, 6}", "{10}"],
      "why": "The intersection holds only the elements that are in both sets, which are 4 and 8. The option {2, 4, 6, 8, 10} is the union, which holds everything in either set.",
      "clue": "Which numbers appear in both lists?"
    },
    "b": {
      "d": 3,
      "q": "Which statement about number systems is true?",
      "opts": [
        "0.75 is rational but not an integer",
        "√2 is rational because it is a real number",
        "Every integer is also a natural number",
        "3/4 is an integer because it is a ratio"
      ],
      "why": "0.75 = 3/4 is a ratio of integers, so it is rational, and it is not a whole number, so it is not an integer. The number √2 is real but cannot be written as a/b. Negative integers are not natural numbers, so the nesting does not run that way.",
      "clue": "Check each number against the a/b test, and which way the nesting runs."
    }
  },
  "mat-primes-fundamental-theorem-arithmetic": {
    "title": "Primes and the fundamental theorem of arithmetic",
    "card": [
      [
        "Prime",
        "a whole number greater than 1 with exactly two factors, 1 and itself. So 2, 3, 5, 7 and 11 are prime. 1 is not prime, and 2 is the only even prime."
      ],
      [
        "Composite",
        "a whole number greater than 1 that is not prime. It has a factor other than 1 and itself, so it can be broken into smaller factors."
      ],
      [
        "Fundamental theorem",
        "every whole number above 1 is a product of primes in exactly one way, apart from the order of the factors. For example, 60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5, which is 2² × 3 × 5."
      ],
      [
        "Infinitely many",
        "the list of primes never ends. Suppose there were a last prime. Multiply all the primes together and add 1. This number leaves remainder 1 when divided by any prime on the list, so it has a prime factor that is not on the list. This contradicts the supposed last prime."
      ]
    ],
    "remember": "Every whole number above 1 is built from primes in one way only, and the primes never run out.",
    "a": {
      "q": "What is the prime factorisation of 84?",
      "opts": ["2² × 3 × 7", "2 × 6 × 7", "2 × 3 × 14", "2² × 21"],
      "why": "84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7, which is 2² × 3 × 7. The option 2 × 6 × 7 also multiplies to 84, but 6 is composite, so it is not a product of primes.",
      "clue": "Every factor in the answer must itself be prime."
    },
    "b": {
      "d": 3,
      "q": "Priya says the number 2 × 3 × 5 × 7 × 11 + 1 must be divisible by one of 2, 3, 5, 7 or 11. Which statement is correct?",
      "opts": [
        "No, it leaves remainder 1 when divided by each of them",
        "Yes, because it is built from those primes",
        "No, because it is odd, so no prime can divide it",
        "Yes, because adding 1 keeps every factor of the product"
      ],
      "why": "The product 2 × 3 × 5 × 7 × 11 = 2310 is divisible by each of these primes, so 2311 leaves remainder 1 each time. Adding 1 breaks those factors rather than keeping them, and being odd only rules out 2. Numbers made this way are not always prime, since 2 × 3 × 5 × 7 × 11 × 13 + 1 = 30031 = 59 × 509, though 2311 happens to be prime.",
      "clue": "Divide the product part by each prime, then think about the extra 1."
    }
  },
  "mat-quantifiers": {
    "title": "Quantifiers",
    "card": [
      [
        "For all",
        "A statement with \"for all\" (written ∀) claims that every member of a set fits. For example, \"for all integers n, n² ≥ 0\" is true, because no integer squared is negative."
      ],
      [
        "There exists",
        "A statement with \"there exists\" (written ∃) claims that at least one member of a set fits. For example, \"there exists an integer n with n² = 49\" is true, because n = 7 works."
      ],
      "One member that fails is called a counterexample. A single counterexample shows that a \"for all\" statement is false.",
      "Example: \"for all integers n, n² > n\" is false. Take n = 1: 1² = 1, and 1 is not greater than 1. To show a \"there exists\" statement is true, one member that fits is enough."
    ],
    "remember": "For all needs every case to work. There exists needs just one case to work.",
    "a": {
      "q": "Which single value of n shows that \"for all integers n, n + 3 > 5\" is false?",
      "opts": ["n = 2", "n = 4", "n = 10", "n = 100"],
      "why": "For n = 2, n + 3 = 5, and 5 is not greater than 5, so the claim fails. The values 4, 10 and 100 all give results above 5, so they fit the statement and cannot disprove it.",
      "clue": "Find a value where n + 3 is not above 5."
    },
    "b": {
      "d": 3,
      "q": "Which statement about the integers is true?",
      "opts": [
        "There exists an integer n with n + 4 = 1",
        "For all integers n, n + 4 > 1",
        "There exists an integer n with n² = −4",
        "For all integers n, n² > n"
      ],
      "why": "With n = −3, n + 4 = 1, so one integer fits and the \"there exists\" statement is true. The claim \"for all integers n, n + 4 > 1\" fails at n = −5, which gives −1, and \"for all integers n, n² > n\" fails at n = 0, since 0 is not greater than 0. No integer squared is negative, so no integer has n² = −4.",
      "clue": "For a \"for all\" statement, test one value that might fail it."
    }
  },
  "mat-direct-proof": {
    "title": "Direct proof",
    "card": [
      "A direct proof starts from what is known and reasons step by step to the result. Every step must follow from the one before. Checking a few cases is not a proof.",
      "To prove something about all even numbers, write them with a letter. An even number is 2k, where k is any integer. An odd number is 2k + 1.",
      "Example: prove that the sum of two even numbers is even. Let the numbers be 2m and 2n, where m and n are integers. Their sum is 2m + 2n = 2(m + n).",
      "Since m + n is an integer, 2(m + n) is a multiple of 2, so it is even. The letters stand for any integers, so this works for every pair of even numbers."
    ],
    "remember": "Use letters for any case, then reason step by step to the result.",
    "a": {
      "q": "Why does writing two even numbers as 2m and 2n give a proof, when testing 4 + 6 does not?",
      "opts": [
        "The letters can be any integers, so every pair is covered",
        "The letters make the working shorter than checking numbers",
        "Testing a number such as 4 + 6 always gives a wrong answer",
        "Two letters are enough to cover every possible number"
      ],
      "why": "Because m and n can be any integers, the argument covers every pair of even numbers at once. Testing 4 + 6 gives a correct result, but it only covers one pair.",
      "clue": "Think about how many cases the letters cover."
    },
    "b": {
      "d": 3,
      "q": "Which line completes a direct proof that the sum of an even number 2m and an odd number 2n + 1 is odd?",
      "opts": [
        "2m + 2n + 1 = 2(m + n) + 1, which is odd",
        "2m + 2n + 1 = 2(m + n + 1), which is even",
        "2m + 2n + 1 = 4mn + 1, which is odd",
        "2m + 2n + 1 = 2(m + n), which is even"
      ],
      "why": "Taking out a factor of 2 from 2m + 2n leaves 2(m + n) + 1. Since m + n is an integer, this is one more than a multiple of 2, so it is odd. The option 2(m + n + 1) is false: it expands to 2m + 2n + 2, which is 1 more than the sum.",
      "clue": "Take a common factor out of the terms that have a 2, then check each line expands back to the sum."
    }
  },
  "mat-examples-counterexamples": {
    "title": "Examples and counterexamples",
    "card": [
      "A claim such as \"every number of this type has this property\" covers infinitely many cases. Checking a few cases is a test of the claim, not a proof of it.",
      [
        "Example",
        "a case where the claim works. Many examples can make a claim look likely, but they never prove it for all cases, because the next case might fail."
      ],
      [
        "Counterexample",
        "a single case where the claim fails. One is enough to disprove the claim, so it must be a case that fits the claim's conditions and gives a false result."
      ],
      "Worked example: \"n² + n + 11 is prime for every whole number n ≥ 0.\" It works for n = 0, 1, 2 and more, giving 11, 13, 17. But n = 11 gives 121 + 11 + 11 = 143 = 11 × 13, which is not prime. So the claim is false."
    ],
    "remember": "Examples can support a claim, but one counterexample disproves it.",
    "a": {
      "q": "Priya says \"n² + n + 11 is prime for every whole number n ≥ 0\" because it works for n = 0 to 5. What do her six checks show?",
      "opts": [
        "They support the claim but do not prove it",
        "They prove the claim is true for all n",
        "They prove the claim is false for some n",
        "They show the claim is false after n = 5"
      ],
      "why": "Six successful checks are examples, and examples never cover every case. The claim is not proved, because a later case such as n = 11 could fail. It is also not disproved, because no failing case has been found.",
      "clue": "Did any of the six checks fail, and did they cover every n?"
    },
    "b": {
      "d": 3,
      "q": "Claim: \"If n is a whole number above 1, then n² − 1 is composite.\" Which value of n is a counterexample?",
      "opts": [
        "n = 2, giving 3, which is prime",
        "n = 5, giving 24, which is composite",
        "n = 7, giving 48, which is composite",
        "n = 1, giving 0, which is not composite"
      ],
      "why": "For n = 2, n² − 1 = 3, which is prime, so the claim fails for a case that fits its conditions. The values n = 5 and n = 7 are examples that agree with the claim. n = 1 is not above 1, so it does not fit the claim's conditions and cannot be a counterexample.",
      "clue": "A counterexample must meet the condition and make the result false."
    }
  },
  "mat-proof-by-contrapositive": {
    "title": "Proof by contrapositive",
    "card": [
      "A statement \"if P then Q\" has a contrapositive: \"if not Q then not P\". Swap the two parts, then negate both.",
      "A statement and its contrapositive are logically equivalent: both are true or both are false. The converse (swap only) and the inverse (negate only) are not equivalent to the original.",
      "Use this method when P is hard to use directly, but not Q gives you something concrete to work with, such as a formula for n.",
      "Example: prove that if n² is even, then the integer n is even. Knowing n² is even tells you little about n, so prove the contrapositive: if n is odd, then n² is odd. Let n = 2k + 1. Then n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd, so the original is true."
    ],
    "remember": "To prove if P then Q, prove if not Q then not P. The two are equivalent.",
    "a": {
      "q": "What is the contrapositive of \"if x is a multiple of 6, then x is even\"?",
      "opts": [
        "If x is not even, then x is not a multiple of 6",
        "If x is even, then x is a multiple of 6",
        "If x is not a multiple of 6, then x is not even",
        "If x is not a multiple of 6, then x is even"
      ],
      "why": "Swap the two parts and negate both: not even comes first, and not a multiple of 6 follows. The option that only swaps the parts is the converse, which is a different statement and need not be true.",
      "clue": "Swap the parts, then negate both."
    },
    "b": {
      "d": 3,
      "q": "To prove \"if n² is odd, then n is odd\" by contrapositive, which statement should be proved?",
      "opts": [
        "If n is even, then n² is even",
        "If n is odd, then n² is odd",
        "If n² is even, then n is even",
        "If n² is odd, then n is even"
      ],
      "why": "P is \"n² is odd\" and Q is \"n is odd\". The contrapositive, if not Q then not P, is: if n is even, then n² is even. The option \"if n² is even, then n is even\" is the inverse (if not P then not Q), which is not equivalent to the original.",
      "clue": "Not odd means even. Put not Q first."
    }
  },
  "mat-proof-by-contradiction": {
    "title": "Proof by contradiction",
    "card": [
      "To prove a statement by contradiction, assume it is false. Then reason step by step until you reach something impossible.",
      "The impossible result might clash with a known fact, or with the assumption itself. Either way, the assumption cannot be true, so the original statement must be true.",
      "Example: prove there is no greatest even number. Assume there is one, called N. Then N + 2 is even and larger than N. This contradicts N being the greatest.",
      "A contradiction only shows the assumption is wrong if every step of the reasoning was valid."
    ],
    "remember": "Assume the opposite, reach something impossible, and the original statement is true.",
    "a": {
      "q": "To prove by contradiction that there is no smallest positive rational number, what is the first step?",
      "opts": [
        "Assume there is a smallest positive rational number",
        "Assume there is no smallest positive rational number",
        "Test several small positive rational numbers",
        "Show that every positive rational number is a fraction"
      ],
      "why": "The first step is to assume the opposite of the statement, so we assume a smallest one exists. Assuming the statement itself is true gives nothing to contradict, and testing examples does not prove it.",
      "clue": "Start by assuming the statement is false."
    },
    "b": {
      "d": 2,
      "q": "Sam assumes there is a greatest odd number, M. He notes that M + 2 is odd and greater than M. What does this show?",
      "opts": [
        "The assumption is false, so there is no greatest odd number",
        "The assumption is true, so M is the greatest odd number",
        "M + 2 is the greatest odd number instead",
        "Nothing, because one number cannot give a contradiction"
      ],
      "why": "M + 2 is odd and larger than M, which contradicts M being the greatest. So the assumption is false and there is no greatest odd number. Choosing M + 2 as the greatest would just repeat the same problem.",
      "clue": "Does M + 2 fit the assumption about M?"
    }
  },
  "mat-mathematical-induction": {
    "title": "Mathematical induction",
    "card": [
      ["Basis step", "show the statement is true for the first case, such as n = 1."],
      ["Inductive step", "assume the statement is true for n = k. Then show it must be true for n = k + 1."],
      "If both steps work, the statement is true for n = 1. Then it is true for 2, then 3, and so on, so it holds for every whole number from the first case.",
      "Example: 1 + 2 + ... + n = n(n + 1)/2. For n = 1, both sides equal 1. Assuming it holds for k, adding k + 1 to both sides gives the formula for k + 1."
    ],
    "remember": "Prove the first case, then prove that one case leads to the next.",
    "a": {
      "q": "In an induction proof, what must the inductive step show?",
      "opts": [
        "If the statement is true for n = k, it is true for n = k + 1",
        "The statement is true for n = k and for n = k + 1 by testing",
        "The statement is true for every n up to a large number",
        "If the statement is true for n = k + 1, it is true for n = k"
      ],
      "why": "The inductive step assumes the statement for k and shows it follows for k + 1. Reversing the direction is a mistake, as it would not carry the first case forward.",
      "clue": "The chain moves from one case to the next one up."
    },
    "b": {
      "d": 3,
      "q": "Ana shows that if 2k > k + 5, then 2(k + 1) > (k + 1) + 5. She concludes that 2n > n + 5 for every whole number n ≥ 1. Which is correct?",
      "opts": [
        "It fails, since the statement is false for n = 1",
        "It is complete, since the inductive step works for all k",
        "It fails, since the inductive step should go from k + 1 to k",
        "It is complete, since inequalities need no basis step"
      ],
      "why": "For n = 1, 2 > 6 is false, so the basis step fails and the chain never starts. Her inductive step is correct, but it only passes truth from one case to the next. On its own it proves nothing, so the proof is not complete.",
      "clue": "Test the first case she claims."
    }
  },
  "mat-proofs-about-numbers": {
    "title": "Proofs about numbers",
    "card": [
      "Divisibility proofs use algebra. Write an even number as 2m and an odd number as 2m + 1, where m is a whole number. Of two consecutive numbers, n and n + 1, one is even and one is odd.",
      "Example: the sum of two odd numbers is even. (2a + 1) + (2b + 1) = 2a + 2b + 2 = 2(a + b + 1), which is a multiple of 2.",
      "Inequalities can be proved by rearranging. To show a² + b² ≥ 2ab, note that a² + b² − 2ab = (a − b)², which is never negative.",
      "To show √2 is irrational, assume √2 = p/q in lowest terms. Then p² = 2q² is even, so p is even. Putting p = 2k gives 4k² = 2q², so q² = 2k² and q is even too, which breaks lowest terms."
    ],
    "remember": "Write numbers in algebraic form, then rearrange to show the property.",
    "a": {
      "q": "Which expression shows the product of two consecutive whole numbers is always even?",
      "opts": [
        "n(n + 1), because one of n and n + 1 is even",
        "n(n + 2), because n + 2 is always even",
        "n(n + 1), because n and n + 1 are both odd",
        "2n, because it is a multiple of 2"
      ],
      "why": "Of two consecutive whole numbers, one is even, so the product has a factor of 2. In n(n + 2), n and n + 2 are both odd when n is odd, so that product is not always even.",
      "clue": "Consecutive numbers alternate between even and odd."
    },
    "b": {
      "d": 3,
      "q": "Which line correctly completes a proof that a² + b² ≥ 2ab for all real a and b?",
      "opts": [
        "a² + b² − 2ab = (a − b)² ≥ 0",
        "a² + b² − 2ab = (a + b)² ≥ 0",
        "a² + b² − 2ab = a² − b² ≥ 0",
        "a² + b² − 2ab = 2(a − b) ≥ 0"
      ],
      "why": "Expanding (a − b)² gives a² − 2ab + b², which matches. A square is never negative, so the inequality holds. (a + b)² expands to a² + 2ab + b², which has the wrong sign on 2ab.",
      "clue": "Expand each bracket and compare with a² − 2ab + b²."
    }
  },
  "mat-statements-connectives": {
    "title": "Statements and connectives",
    "card": [
      "A proposition is a statement that is either true or false, such as 7 is prime. A truth table, or a grid called a Karnaugh map, shows when a compound statement is true in every case.",
      ["And", "P and Q is true only when both P and Q are true."],
      ["Or", "P or Q is true when at least one of P and Q is true. It is false only when both are false."],
      [
        "Not",
        "not P has the opposite truth value to P. Brackets show what not applies to: (not P) and Q is not the same as not (P and Q)."
      ]
    ],
    "remember": "And needs both true. Or needs at least one true. Not flips the value.",
    "a": {
      "q": "P is true and Q is false. Which compound statement is true?",
      "opts": ["P or Q", "P and Q", "not P", "(not P) and Q"],
      "why": "Or is true when at least one part is true, and P is true. P and Q fails because Q is false. not P is false, so (not P) and Q is also false.",
      "clue": "Which connective only needs one true part?"
    },
    "b": {
      "d": 3,
      "q": "P: it is raining. Q: it is windy. Today it is not raining, so P is false, and it is windy, so Q is true. Which statement is true?",
      "opts": ["(not P) and Q", "P or (not Q)", "P and Q", "not (P or Q)"],
      "why": "not P is true because P is false, and Q is true, so (not P) and Q is true. not (P or Q) is tempting, but P or Q is true because Q is true, so its opposite is false. P or (not Q) and P and Q are both false.",
      "clue": "Work out what is inside each bracket first."
    }
  },
  "mat-conditional-statements": {
    "title": "Conditional statements",
    "card": [
      "A conditional statement has the form if P then Q. P is the condition and Q is the result. It makes a promise: whenever P is true, Q is true too.",
      "The promise is broken in only one case: P is true and Q is false. In every other case the statement is true, including when P is false.",
      "The contrapositive of if P then Q is if not Q then not P. It is true in exactly the same cases, so it means the same as the original.",
      "Example: if a number ends in 0, then it is divisible by 5. The contrapositive is: if a number is not divisible by 5, then it does not end in 0. Both are true."
    ],
    "remember": "If P then Q fails only when P is true and Q is false. The contrapositive says the same thing.",
    "a": {
      "q": "Ravi says: if it rains, then the match is cancelled. It rains, but the match goes ahead. Is Ravi's statement true or false?",
      "opts": [
        "False, because P is true and Q is false",
        "True, because the match was not cancelled",
        "True, because the statement only needs P to be true",
        "False, because it is not always raining"
      ],
      "why": "The only way if P then Q fails is P true and Q false. Here it rained and the match was not cancelled, so the statement is false. Saying it is true because the match went ahead ignores the promise that rain leads to cancellation.",
      "clue": "Check whether the promise was broken when P happened."
    },
    "b": {
      "d": 3,
      "q": "Which is the contrapositive of: if a shape is a square, then it has four equal sides?",
      "opts": [
        "If not four equal sides, then not a square",
        "If four equal sides, then a square",
        "If not a square, then not four equal sides",
        "If a square, then not four equal sides"
      ],
      "why": "The contrapositive swaps P and Q and negates both: if not Q then not P. So not having four equal sides leads to not being a square. 'If four equal sides, then a square' swaps but does not negate, and 'If not a square, then not four equal sides' negates but does not swap, so neither means the same as the original.",
      "clue": "Swap the two parts and put not on both."
    }
  },
  "mat-converse-equivalence": {
    "title": "Converse and equivalence",
    "card": [
      "The converse of \"if P then Q\" swaps the two parts to give \"if Q then P\". Neither part is changed or negated. Example: \"If a shape is a square, then it has four sides\" has the converse \"If a shape has four sides, then it is a square\".",
      "The converse is not always true when the original is true. In the example, a rectangle has four sides but is not a square.",
      "To show a converse is false, find one case where Q is true and P is false. One such case is called a counterexample.",
      "If \"if P then Q\" and its converse \"if Q then P\" are both true, then P and Q are equivalent. This is written \"P if and only if Q\"."
    ],
    "remember": "Swapping the parts of a true statement may make it false. If both directions are true, P and Q are equivalent.",
    "a": {
      "q": "For a whole number n, what is the converse of \"If n is divisible by 10, then n is divisible by 5\"?",
      "opts": [
        "If n is divisible by 5, then n is divisible by 10",
        "If n is not divisible by 10, then n is not divisible by 5",
        "If n is not divisible by 5, then n is not divisible by 10",
        "If n is divisible by 10, then n is not divisible by 5"
      ],
      "why": "The converse only swaps the two parts, so it starts with divisible by 5 and ends with divisible by 10. The options with \"not\" change the parts by negating them, which the converse never does.",
      "clue": "Swap the two parts without changing either one."
    },
    "b": {
      "d": 3,
      "q": "Which statement about \"If x = 3, then x² = 9\" and its converse is correct?",
      "opts": [
        "The converse is false, because x = −3 gives x² = 9",
        "The converse is true, so x = 3 and x² = 9 are equivalent",
        "The converse is false, because x = 3 does not give x² = 9",
        "The original is false, so the converse cannot be true"
      ],
      "why": "The converse is \"If x² = 9, then x = 3\". Taking x = −3 gives x² = 9 but x ≠ 3, so this counterexample makes the converse false. The original is true but the converse is false, so P and Q are not equivalent.",
      "clue": "Write the converse first, then test whether Q can be true while P is false."
    }
  },
  "mat-boolean-algebra": {
    "title": "Boolean algebra",
    "card": [
      "Boolean algebra uses rules to rewrite a statement in a simpler form with the same truth value. Write ∧ for and, ∨ for or, and ¬ for not.",
      [
        "Laws",
        "P ∧ P = P, P ∨ ¬P = true, P ∧ ¬P = false, and ¬(¬P) = P. De Morgan's laws: ¬(P ∧ Q) = ¬P ∨ ¬Q, and ¬(P ∨ Q) = ¬P ∧ ¬Q."
      ],
      [
        "Worked example",
        "Simplify ¬(P ∨ Q) ∨ P. De Morgan gives (¬P ∧ ¬Q) ∨ P. This is true when P is true. When P is false, ¬P is true, so it equals ¬Q. So the result is P ∨ ¬Q."
      ],
      [
        "Tautology",
        "A tautology is a statement that is true for every combination of truth values, such as P ∨ ¬P. The same laws work for sets, with union for or, intersection for and, and complement for not."
      ]
    ],
    "remember": "Use the laws to rewrite a statement more simply. A tautology is always true.",
    "a": {
      "q": "Using De Morgan's law, which statement equals ¬(P ∧ Q)?",
      "opts": ["¬P ∨ ¬Q", "¬P ∧ ¬Q", "P ∨ Q", "¬P ∨ Q"],
      "why": "De Morgan's law negates each part and swaps and with or, so ¬(P ∧ Q) = ¬P ∨ ¬Q. The option ¬P ∧ ¬Q is tempting, but it keeps the and, so it equals ¬(P ∨ Q).",
      "clue": "Negate each part and swap the connective."
    },
    "b": {
      "d": 3,
      "q": "Which of these statements is a tautology?",
      "opts": ["(P ∧ Q) ∨ ¬(P ∧ Q)", "(P ∨ Q) ∧ ¬P", "P ∧ (Q ∨ ¬Q)", "¬(P ∨ Q) ∨ P"],
      "why": "(P ∧ Q) ∨ ¬(P ∧ Q) has the form R ∨ ¬R with R = P ∧ Q, so it is true every time. P ∧ (Q ∨ ¬Q) is tempting, but it equals P, which is false when P is false. (P ∨ Q) ∧ ¬P is false when P is true, and ¬(P ∨ Q) ∨ P is false when P is false and Q is true.",
      "clue": "Look for the form R ∨ ¬R, where R is a whole statement."
    }
  },
  "mat-logic-gates-circuits": {
    "title": "Logic gates and circuits",
    "card": [
      ["AND gate", "gives output 1 only when both inputs are 1. It matches the Boolean product A·B."],
      ["OR gate", "gives output 1 when at least one input is 1. It matches the Boolean sum A + B."],
      ["NOT gate", "has one input and flips it: 1 becomes 0 and 0 becomes 1. It matches the complement A'."],
      "Gates joined together make a circuit whose output follows a Boolean expression. Simplifying the expression gives fewer gates. For example, A·B + A·B' = A·(B + B') = A·1 = A, since B + B' is always 1. So that circuit is just a wire from A."
    ],
    "remember": "Each gate matches a Boolean operation, so a simpler expression means a simpler circuit.",
    "a": {
      "q": "Inputs A and B go into an AND gate, and its output goes into a NOT gate. For which inputs is the final output 0?",
      "opts": ["A = 1 and B = 1", "A = 1 and B = 0", "A = 0 and B = 1", "A = 0 and B = 0"],
      "why": "The NOT gate gives 0 only when the AND gate gives 1, and the AND gate gives 1 only when both inputs are 1. Choosing A = 0 and B = 0 forgets the NOT gate: the AND output there is 0, which the NOT gate flips to 1.",
      "clue": "What must the AND gate give for the NOT gate to output 0?"
    },
    "b": {
      "d": 3,
      "q": "A circuit has the output A·B + A'·B. How can the circuit be simplified?",
      "opts": [
        "Replace it with a wire carrying B",
        "Replace it with a wire carrying A",
        "Replace it with a single AND gate on A and B",
        "Replace it with a single OR gate on A and B"
      ],
      "why": "Factor out B: (A + A')·B. A + A' is always 1, so the output is 1·B = B, a wire from B with no gates. An AND gate on A and B is wrong: when A = 0 and B = 1 it gives 0, but the original gives 0·1 + 1·1 = 1.",
      "clue": "Find the input that appears in both terms and factor it out."
    }
  },
  "mat-binary-numbers": {
    "title": "Binary numbers",
    "card": [
      "Binary is base 2. It uses only the digits 0 and 1. Computers store numbers this way because a circuit can be off (0) or on (1).",
      "Place values go up in powers of 2 from the right: 1, 2, 4, 8, 16 and so on. Each place is worth double the one to its right.",
      "To convert to base 10, add the place values where there is a 1. For example, 1011 = 8 + 2 + 1 = 11.",
      "To convert from base 10, take away the largest power of 2 that fits, and repeat. For 13: 8 fits, leaving 5. 4 fits, leaving 1. 1 fits. So 13 = 8 + 4 + 1 = 1101."
    ],
    "remember": "Binary place values double from the right: 1, 2, 4, 8, 16. Add the place values that have a 1 to get base 10.",
    "a": {
      "q": "What is 10110 in base 10?",
      "opts": ["22", "26", "11", "20"],
      "why": "The places with a 1 are 16, 4 and 2, and 16 + 4 + 2 = 22. The answer 20 comes from leaving out the 2. The answer 26 comes from using 8 instead of 4: 16 + 8 + 2 = 26.",
      "clue": "Write the place values 16, 8, 4, 2, 1 under the digits."
    },
    "b": {
      "d": 2,
      "q": "What is 37 written in binary?",
      "opts": ["100101", "101001", "100011", "110101"],
      "why": "32 fits in 37, leaving 5. Then 4 fits, leaving 1, and 1 fits. So 37 = 32 + 4 + 1, which is 100101. The option 101001 equals 32 + 8 + 1 = 41, so it has the 4 in the wrong place.",
      "clue": "Take away 32 first, then work with what is left."
    }
  },
  "mat-algorithms-pseudocode": {
    "title": "Algorithms and pseudocode",
    "card": [
      "An algorithm is a list of steps that solves a problem and always ends. Pseudocode writes those steps in plain, code-like words, so any person can follow them.",
      ["Sequence", "steps run one after another, in order. Changing the order can change the result."],
      ["Decision", "an if-then step runs only when a condition is true. Example: if n > 10 then set n to 10."],
      [
        "Loop",
        "a set of steps repeats. Example: set total to 0, then for each i from 1 to 3, set total to total + i. The steps run 3 times, so total becomes 1, then 3, then 6."
      ]
    ],
    "remember": "Sequence gives the order, decisions choose, loops repeat.",
    "a": {
      "q": "An algorithm sets n to 4, then runs: if n > 10 then set n to 10. Then it sets n to n + 2. What is the final value of n?",
      "opts": ["6", "12", "10", "4"],
      "why": "n is 4, so n > 10 is false and the if-then step is skipped. Then n + 2 = 6. The answer 12 comes from running the if-then step as if it were true, which would make n 10 and then 12.",
      "clue": "Check whether the condition is true before running the step."
    },
    "b": {
      "d": 3,
      "q": "An algorithm sets total to 0. Then for each i from 1 to 4, it sets total to total + 2 × i. What is the final value of total?",
      "opts": ["20", "10", "24", "8"],
      "why": "The loop adds 2, 4, 6 and 8, and 2 + 4 + 6 + 8 = 20. Check: 2 × (1 + 2 + 3 + 4) = 2 × 10 = 20. The answer 10 forgets the 2 ×, and 8 gives only the last pass.",
      "clue": "List what is added on each pass of the loop, then add them up."
    }
  },
  "mat-arithmetic-geometric-series": {
    "title": "Arithmetic and geometric series",
    "card": [
      [
        "Arithmetic",
        "Terms differ by a constant d. With first term a and n terms, the sum is Sn = n/2 × (2a + (n − 1)d)."
      ],
      [
        "Geometric",
        "Each term is r times the one before. With first term a and n terms, the sum is Sn = a(rⁿ − 1)/(r − 1), where r ≠ 1."
      ],
      "Example: 3 + 7 + 11 + ... with 10 terms has a = 3, d = 4 and n = 10. So S = 10/2 × (6 + 9 × 4) = 5 × 42 = 210.",
      "Example: 2 + 6 + 18 + 54 + 162 has a = 2, r = 3 and n = 5. So S = 2 × (3⁵ − 1)/(3 − 1) = 2 × 242/2 = 242."
    ],
    "remember": "Arithmetic adds the same amount each time, geometric multiplies by the same amount. Put n, a and d or r into the right formula.",
    "a": {
      "q": "What is 4 + 8 + 16 + 32 + ... for the first 6 terms?",
      "opts": ["252", "63", "256", "508"],
      "why": "The ratio is r = 2, so S = 4 × (2⁶ − 1)/(2 − 1) = 4 × 63 = 252. The option 256 forgets to take 1 away from 2⁶, and 63 forgets to multiply by a.",
      "clue": "Each term is double the one before, so use the geometric formula."
    },
    "b": {
      "d": 2,
      "q": "A hall has 15 rows. Row 1 has 12 seats and each row has 2 more than the row before. How many seats are in the hall?",
      "opts": ["390", "405", "780", "180"],
      "why": "The seats form an arithmetic series with a = 12, d = 2 and n = 15. So S = 15/2 × (24 + 14 × 2) = 15/2 × 52 = 390. Using 15 × 2 instead of 14 × 2 inside the bracket gives 405, which is wrong.",
      "clue": "Inside the bracket, d is multiplied by one less than the number of rows."
    }
  },
  "mat-recurrence-relations-specialist": {
    "title": "Recurrence relations in Specialist",
    "card": [
      "A recurrence relation gives each term using earlier terms. You also need starting values to get the sequence going.",
      "A first-order relation uses only the previous term, such as t(n+1) = 2 × t(n). It needs one starting value.",
      "A second-order relation uses the two previous terms, such as t(n+2) = t(n+1) + t(n). It needs two starting values.",
      "The Fibonacci sequence has t1 = 1, t2 = 1 and t(n+2) = t(n+1) + t(n), giving 1, 1, 2, 3, 5, 8. Earlier terms can also be multiplied by a number, such as t(n+2) = 3 × t(n+1) − t(n)."
    ],
    "remember": "Start with the given values, then build each new term from the earlier ones, one step at a time.",
    "a": {
      "q": "A sequence has t1 = 1, t2 = 3 and t(n+2) = t(n+1) + t(n). What is t6?",
      "opts": ["18", "11", "29", "12"],
      "why": "The terms are 1, 3, 4, 7, 11, 18, so t6 = 18. The value 11 is t5, which comes from stopping one term too soon.",
      "clue": "Write out each term in order, adding the previous two."
    },
    "b": {
      "d": 3,
      "q": "A sequence has t1 = 1, t2 = 2 and t(n+2) = 2 × t(n+1) + t(n). What is t5?",
      "opts": ["29", "8", "16", "12"],
      "why": "t3 = 2 × 2 + 1 = 5, t4 = 2 × 5 + 2 = 12 and t5 = 2 × 12 + 5 = 29. The value 12 is t4, and 8 comes from ignoring the 2 and adding the previous two terms.",
      "clue": "The 2 multiplies the term just before, not the one before that."
    }
  },
  "mat-pigeonhole-principle": {
    "title": "The pigeonhole principle",
    "card": [
      "If more than n items are placed into n boxes, at least one box holds two or more items. This is the pigeonhole principle.",
      "To use it, decide what the items are and what the boxes are. The boxes are the possible categories each item can fall into.",
      "Example: 13 people are in a room. There are 12 months, so at least two people share a birth month. With only 12 people, each could have a different month, so 13 is the fewest that guarantees a match.",
      "The principle says some box holds at least two. It does not say which box, and it does not say that every box is used."
    ],
    "remember": "More items than boxes means some box holds at least two.",
    "a": {
      "q": "A Year 11 class has 15 students. Which statement about their birth months must be true?",
      "opts": [
        "At least two share a birth month",
        "Every month has at least one student",
        "At least two were born in January",
        "Exactly two share a birth month"
      ],
      "why": "There are 15 items and 12 boxes, and 15 is more than 12, so some month holds at least two students. The principle does not say which month, so January is not guaranteed. It also does not say every month is used or that exactly two share.",
      "clue": "Items are students, boxes are months. Which box is named?"
    },
    "b": {
      "d": 3,
      "q": "Priya has a drawer with loose socks in 4 colours, and she picks socks in the dark. What is the smallest number of socks she must pick to be sure of a matching pair?",
      "opts": ["5", "4", "3", "8"],
      "why": "The boxes are the 4 colours. With 4 socks she could have one of each colour, so no pair is certain. A fifth sock must repeat a colour, so 5 is the smallest number that guarantees a pair.",
      "clue": "Imagine the worst luck: one sock of each colour first."
    }
  },
  "mat-inclusion-exclusion-principle": {
    "title": "The inclusion-exclusion principle",
    "card": [
      "To count items in A or B (or both), add the count of A and the count of B. Then subtract the count of items in both.",
      "In symbols: |A or B| = |A| + |B| − |A and B|. Items in both were counted twice, so one count is taken away.",
      "Example: of 30 students, 18 play netball, 12 swim and 5 do both. Students doing at least one: 18 + 12 − 5 = 25.",
      "Sometimes the overlap must be worked out. Whole numbers divisible by both 2 and 3 are the multiples of 6."
    ],
    "remember": "Add the two groups, then subtract the overlap once so nothing is counted twice.",
    "a": {
      "q": "In a year group of 40, 24 study French, 15 study Italian and 6 study both. How many study French or Italian?",
      "opts": ["33", "39", "27", "18"],
      "why": "24 + 15 − 6 = 33. Adding only 24 + 15 = 39 counts the 6 students in both subjects twice.",
      "clue": "Students in both subjects appear in both counts."
    },
    "b": {
      "d": 3,
      "q": "How many whole numbers from 1 to 50 are divisible by 3 or by 5?",
      "opts": ["23", "26", "20", "13"],
      "why": "There are 16 multiples of 3, 10 multiples of 5 and 3 multiples of 15, so 16 + 10 − 3 = 23. The option 26 adds without taking away the overlap.",
      "clue": "A number divisible by both 3 and 5 is a multiple of 15."
    }
  },
  "mat-arrangements-with-restrictions": {
    "title": "Permutations and combinations",
    "card": [
      [
        "Permutation",
        "an arrangement where order matters. Arranging n different items in a row can be done in n! ways, where n! = n × (n − 1) × ... × 1."
      ],
      [
        "Combination",
        "a selection where order does not matter. Choosing r from n different items can be done in nCr = n! ÷ (r! × (n − r)!) ways."
      ],
      [
        "Repeated items",
        "if some items are identical, divide n! by the factorial of each repeat count. The word AABC has 4! ÷ 2! = 12 arrangements."
      ],
      [
        "Together",
        "to keep two people side by side, treat them as one block, arrange the blocks, then multiply by the ways to order the pair. For 4 people with A and B together: 3! × 2! = 12."
      ]
    ],
    "remember": "Order matters: arrange. Order does not matter: choose. Join a pair into one block.",
    "a": {
      "q": "How many different arrangements of the letters in the word LEVEL are there?",
      "opts": ["30", "120", "60", "20"],
      "why": "LEVEL has 5 letters, with L twice and E twice. So the count is 5! ÷ (2! × 2!) = 120 ÷ 4 = 30. Dividing by only one repeat gives 60, which is tempting but ignores the second repeated letter.",
      "clue": "Two letters each appear twice."
    },
    "b": {
      "d": 3,
      "q": "Five friends sit in a row of 5 seats. Two of them, Sam and Tia, must sit next to each other. How many seatings are possible?",
      "opts": ["48", "24", "120", "12"],
      "why": "Treat Sam and Tia as one block. Then there are 4 units to arrange, which is 4! = 24 ways. The pair can sit in 2 orders, so 24 × 2 = 48. Leaving out the pair's order gives 24, which is the common slip.",
      "clue": "Count the block's arrangements, then the order inside the block."
    }
  },
  "mat-combinatorial-identities": {
    "title": "Combinatorial identities",
    "card": [
      "A combinatorial identity is an equation between counts, such as nCr = nC(n − r). It can be proved by counting the same thing in two different ways.",
      "Example: choosing r people from n to join a team gives nCr ways. Choosing the n − r people to leave out gives nC(n − r) ways. Each team matches exactly one leave-out group, so the counts are equal.",
      "Another identity is nC0 + nC1 + ... + nCn = 2ⁿ. Count all subsets of n items. Each item is in or out, giving 2ⁿ. Sorting subsets by size gives the sum.",
      "The method is to describe one situation, count it two ways, and set the counts equal."
    ],
    "remember": "Count one situation in two ways, and the two answers must be equal.",
    "a": {
      "q": "Which statement is true for every n and r, because choosing r items to keep is the same as choosing which items to leave out?",
      "opts": ["nCr = nC(n − r)", "nCr = nC(r − n)", "nCr = nC(n + r)", "nCr = nPr"],
      "why": "Each group of r chosen items matches exactly one group of n − r left-out items, so the counts are equal. nPr counts ordered arrangements, so it is larger in general.",
      "clue": "Choosing who is in matches choosing who is out."
    },
    "b": {
      "d": 2,
      "q": "A club has 5 members. Counting every possible committee of any size, including none, which number is the total?",
      "opts": ["32", "25", "10", "120"],
      "why": "Each member is either on the committee or not, so there are 2 choices for each of 5 members: 2⁵ = 32. This equals 5C0 + 5C1 + ... + 5C5. Using 5² = 25 swaps the base and the power.",
      "clue": "Each member has two choices: in or out."
    }
  },
  "mat-vectors-plane": {
    "title": "Vectors in the plane",
    "card": [
      "A vector has a size and a direction. A scalar, such as 5 kg or 20 °C, has size only.",
      "A vector can be written as a column of two numbers. The top number is the move right (x) and the bottom number is the move up (y), so a negative number means left or down.",
      "Here a column with 3 on top and −2 below is typed as [3, −2], with square brackets, so it is not confused with a point such as (3, −2). The same vector with i and j components is 3i − 2j, where i is one unit right and j is one unit up.",
      "Example: the vector from A(1, 4) to B(5, 2) is end minus start. The x change is 5 − 1 = 4 and the y change is 2 − 4 = −2. So the vector is [4, −2], or 4i − 2j."
    ],
    "remember": "A vector has size and direction. To find the vector from A to B, take B minus A.",
    "a": {
      "q": "Which vector is the same as the column vector [−4, 5]?",
      "opts": ["−4i + 5j", "4i − 5j", "5i − 4j", "−5i + 4j"],
      "why": "The top number is the i part and the bottom number is the j part, so [−4, 5] is −4i + 5j. The option 5i − 4j swaps the two parts, which is a common slip.",
      "clue": "The top number goes with i."
    },
    "b": {
      "d": 3,
      "q": "A drone in Geelong flies from P(6, −1) to Q(2, 3). What is the vector from P to Q?",
      "opts": ["−4i + 4j", "4i − 4j", "8i + 2j", "−8i − 2j"],
      "why": "Take end minus start: 2 − 6 = −4 and 3 − (−1) = 4, so the vector is −4i + 4j. The option 4i − 4j is start minus end, which gives the vector from Q to P.",
      "clue": "Subtract the start point from the end point, and take care with the −1."
    }
  },
  "mat-adding-scaling-vectors": {
    "title": "Adding and scaling vectors",
    "card": [
      "To add vectors, add the matching components. If a = 3i + 2j and b = i − 4j, then a + b = 4i − 2j. Drawn as arrows, you place the tail of b at the head of a (head to tail).",
      "To subtract, subtract the matching components. a − b = (3 − 1)i + (2 − (−4))j = 2i + 6j. Take care with the sign when the second component is negative.",
      "A scalar is an ordinary number. Multiplying a vector by a scalar k multiplies every component by k. So 2a = 6i + 4j.",
      "If k > 1, the vector gets longer. If 0 < k < 1, it gets shorter. If k is negative, the vector points the opposite way. So −a = −3i − 2j."
    ],
    "remember": "Add or scale each component. A negative scalar reverses the direction.",
    "a": {
      "q": "Let p = 2i + 5j and q = 4i − j. What is p + q?",
      "opts": ["6i + 4j", "−2i + 6j", "6i + 6j", "8i − 5j"],
      "why": "Add the i components: 2 + 4 = 6. Add the j components: 5 + (−1) = 4. So p + q = 6i + 4j. The option 6i + 6j comes from ignoring the negative sign on the j component of q.",
      "clue": "Add the i parts together and the j parts together."
    },
    "b": {
      "d": 3,
      "q": "Let u = 3i − 2j and v = i + 4j. What is 2u − v?",
      "opts": ["5i − 8j", "5i + 2j", "7i − 8j", "5i − 4j"],
      "why": "First 2u = 6i − 4j. Then 2u − v = (6 − 1)i + (−4 − 4)j = 5i − 8j. The option 5i + 2j comes from two slips: leaving the j part of u as −2 instead of doubling it, then adding 4 instead of subtracting it, so −2 + 4 = 2.",
      "clue": "Scale u first, then subtract each component of v."
    }
  },
  "mat-magnitude-unit-vectors": {
    "title": "Magnitude and unit vectors",
    "card": [
      "The magnitude of a vector is its length. It is written |v|. For v = ai + bj, |v| = √(a² + b²), from Pythagoras' theorem.",
      "Example: for v = 3i − 4j, |v| = √(3² + (−4)²) = √(9 + 16) = √25 = 5. Squaring removes the minus sign.",
      ["Unit vector", "a vector with magnitude 1. It shows direction only."],
      "To find the unit vector in the direction of v, divide v by |v|. For v = 3i − 4j, the unit vector is (3/5)i − (4/5)j."
    ],
    "remember": "Magnitude is √(a² + b²). Divide a vector by its magnitude to get a unit vector.",
    "a": {
      "q": "What is the magnitude of the vector 5i − 12j?",
      "opts": ["13", "7", "17", "−13"],
      "why": "|v| = √(5² + (−12)²) = √(25 + 144) = √169 = 13. Adding 5 and 12 to get 17 skips the squaring and the square root. A magnitude is a length, so it is never negative.",
      "clue": "Square each component, add, then take the square root."
    },
    "b": {
      "d": 3,
      "q": "Which is the unit vector in the same direction as 6i + 8j?",
      "opts": ["(3/5)i + (4/5)j", "(1/6)i + (1/8)j", "(3/7)i + (4/7)j", "(6/10)i − (8/10)j"],
      "why": "|6i + 8j| = √(36 + 64) = 10, so divide each component by 10 to get (3/5)i + (4/5)j. Check: (3/5)² + (4/5)² = 9/25 + 16/25 = 1. Dividing by 14, the sum of the components, gives (3/7)i + (4/7)j, which has magnitude less than 1.",
      "clue": "Find the magnitude first, then divide both components by it."
    }
  },
  "mat-scalar-product": {
    "title": "The scalar product",
    "card": [
      "The scalar product of two vectors a and b is a·b = |a||b|cos θ, where θ is the angle between them when they start at the same point. The answer is a number, not a vector.",
      "With components, if a = a₁i + a₂j and b = b₁i + b₂j, then a·b = a₁b₁ + a₂b₂. Example: (2i + 3j)·(4i − j) = 2×4 + 3×(−1) = 5.",
      "If θ = 90°, then cos θ = 0, so a·b = 0. If two non-zero vectors have a·b = 0, they are perpendicular.",
      "To find the angle, rearrange: cos θ = a·b ÷ (|a||b|). A positive scalar product means θ is below 90°. A negative one means θ is above 90°."
    ],
    "remember": "Multiply matching components and add. For two non-zero vectors, a result of zero means they are perpendicular.",
    "a": {
      "q": "What is the scalar product of a = 3i + 2j and b = 4i − 5j?",
      "opts": ["2", "22", "−2", "12i − 10j"],
      "why": "a·b = 3×4 + 2×(−5) = 12 − 10 = 2. The answer 22 comes from a sign error, treating −5 as 5. The answer 12i − 10j wrongly keeps the vector form, but a scalar product is a number.",
      "clue": "Multiply the i parts, multiply the j parts, then add."
    },
    "b": {
      "d": 3,
      "q": "For which value of k are p = 3i + kj and q = 2i + 6j perpendicular?",
      "opts": ["k = −1", "k = 1", "k = −9", "k = 9"],
      "why": "Both vectors are non-zero, so they are perpendicular when p·q = 0. So 3×2 + k×6 = 0, which gives 6 + 6k = 0 and k = −1. The value k = 1 gives 12, not zero, so it comes from a sign error. The value k = −9 comes from multiplying the wrong components together.",
      "clue": "Set the scalar product equal to zero and solve for k."
    }
  },
  "mat-vector-projections": {
    "title": "Vector projections",
    "card": [
      "The vector projection of a onto b is the part of a that points along b. It points in the direction of b or the opposite direction, or it is the zero vector when a is perpendicular to b.",
      [
        "Scalar projection",
        "a·b ÷ |b|. This is a signed length. It is negative when the angle between a and b is obtuse, and 0 when they are perpendicular."
      ],
      [
        "Vector projection",
        "(a·b ÷ |b|²) b. This is the scalar projection multiplied by the unit vector in the direction of b."
      ],
      "Example: a = 3i + 4j and b = 2i. Then a·b = 6 and |b|² = 4, so the vector projection is (6 ÷ 4)(2i) = 3i."
    ],
    "remember": "Projection of a onto b: find a·b, divide by |b|², then multiply b by the result.",
    "a": {
      "q": "Let a = 2i + 5j and b = 3i. What is the vector projection of a onto b?",
      "opts": ["2i", "6i", "2i + 5j", "5j"],
      "why": "a·b = 6 and |b|² = 9, so the projection is (6 ÷ 9)(3i) = 2i. This is the part of a along the i direction. 6i comes from dividing by |b| instead of |b|², giving (6 ÷ 3)(3i), or from multiplying a·b by the unit vector i.",
      "clue": "Find a·b and |b|² first, then scale b."
    },
    "b": {
      "d": 3,
      "q": "Mia walks with displacement a = 4i + 3j. A road runs in the direction of b = 3i − 4j. What is the scalar projection of a onto b?",
      "opts": ["0", "5", "−5", "25"],
      "why": "a·b = 4×3 + 3×(−4) = 0, and |b| = 5, so the scalar projection is 0 ÷ 5 = 0. The vectors are perpendicular, so none of a lies along b. The option 5 is |a| or |b|, not the projection.",
      "clue": "Work out a·b first. What does its value tell you about the angle?"
    }
  },
  "mat-proof-with-vectors": {
    "title": "Proof with vectors",
    "card": [
      "Set up a shape using vectors from one origin O. The position vector of a point P is OP. For a parallelogram OABC, let a = OA and c = OC. Then OB = a + c, because B is reached by going along OA and then along AB, which equals c.",
      "Opposite sides of a parallelogram are parallel and equal in length, so AB = OC = c and CB = OA = a.",
      "To show the diagonals bisect each other, find the midpoint of each diagonal. The midpoint of OB is ½(a + c). The diagonal AC = c − a, so the midpoint of AC is a + ½(c − a) = ½(a + c).",
      "Both midpoints have the same position vector, so they are the same point. The diagonals cross at their midpoints, so they bisect each other."
    ],
    "remember": "Write each point as a vector from one origin, then show two routes give the same vector.",
    "a": {
      "q": "In parallelogram OABC, a = OA and c = OC. Which vector is the diagonal OB?",
      "opts": ["a + c", "a − c", "c − a", "½(a + c)"],
      "why": "B is reached by going along OA and then along AB, which equals c, so OB = a + c. The vector c − a is the other diagonal AC, and ½(a + c) is only the midpoint of OB.",
      "clue": "Go from O to A, then from A to B."
    },
    "b": {
      "d": 3,
      "q": "In parallelogram OABC, a = OA and c = OC. M is the midpoint of side AB. What is the position vector of M?",
      "opts": ["a + ½c", "½(a + c)", "½c", "a − ½c"],
      "why": "Start at A, then go half of AB, which equals c: OM = a + ½c. The vector ½(a + c) is where the diagonals meet, not the midpoint of side AB. Using ½c alone leaves out the start at A.",
      "clue": "Start at A, then add half of the vector AB."
    }
  },
  "mat-vectors-motion": {
    "title": "Vectors in motion",
    "card": [
      [
        "Displacement and velocity",
        "Displacement is a vector for change in position. Velocity is a vector for the rate of change of position. With constant velocity v, displacement = v × t."
      ],
      [
        "Relative velocity",
        "The velocity of A relative to B is v(A) − v(B). Example: a boat moves at 5i + 2j and a current moves at 1i + 2j. The boat relative to the current is 4i + 0j."
      ],
      [
        "Forces in balance",
        "Forces are vectors. When forces are in balance, their sum is the zero vector. Example: 3i + 2j and −3i + 1j need a third force 0i − 3j to balance."
      ],
      [
        "Constant force",
        "A constant force F on mass m gives constant acceleration a = F ÷ m. Example: F = 6i + 12j with m = 3 gives a = 2i + 4j."
      ]
    ],
    "remember": "Subtract velocities for relative velocity. Balanced forces add to the zero vector. Acceleration = force ÷ mass.",
    "a": {
      "q": "Three forces act on an object at rest: 4i + 1j, −1i + 3j and F. They are in balance. What is F?",
      "opts": ["−3i − 4j", "3i + 4j", "−5i − 2j", "−3i + 4j"],
      "why": "Balance means 4i + 1j + (−1i + 3j) + F = 0. The first two add to 3i + 4j, so F = −3i − 4j. The option 3i + 4j is the sum of the two forces, which forgets that F must cancel it.",
      "clue": "The three forces must add to the zero vector."
    },
    "b": {
      "d": 3,
      "q": "Car P has velocity 20i + 5j and car Q has velocity 12i + 9j, in km/h. What is the velocity of P relative to Q?",
      "opts": ["8i − 4j", "−8i + 4j", "32i + 14j", "8i + 4j"],
      "why": "Relative velocity of P to Q = v(P) − v(Q) = (20 − 12)i + (5 − 9)j = 8i − 4j. The option −8i + 4j is the velocity of Q relative to P, which subtracts in the wrong order.",
      "clue": "Take the velocity of Q away from the velocity of P."
    }
  },
  "mat-circles-ellipses": {
    "title": "Circles and ellipses",
    "card": [
      [
        "Circle",
        "A circle is the locus (set of all points) at a fixed distance r from a centre (h, k). Its equation is (x − h)² + (y − k)² = r²."
      ],
      [
        "Ellipse",
        "An ellipse centred at (h, k) has equation (x − h)²/a² + (y − k)²/b² = 1. It reaches a units left and right of the centre, and b units up and down."
      ],
      "Read the centre from the brackets, with the signs flipped. In (x + 2)², the centre has x = −2. The numbers under the brackets are squares, so take the square root to get a or b.",
      "Example: (x − 2)²/25 + (y + 1)²/9 = 1 has centre (2, −1), a = 5 and b = 3. So x runs from 2 − 5 = −3 to 2 + 5 = 7."
    ],
    "remember": "Brackets give the centre with flipped signs. Squared numbers need a square root.",
    "a": {
      "q": "What are the centre and radius of the circle (x − 3)² + (y + 4)² = 49?",
      "opts": [
        "Centre (3, −4), radius 7",
        "Centre (−3, 4), radius 7",
        "Centre (3, −4), radius 49",
        "Centre (−3, 4), radius 49"
      ],
      "why": "The brackets x − 3 and y + 4 give a centre of (3, −4). The right side is r² = 49, so r = 7. Giving a radius of 49 forgets the square root.",
      "clue": "Flip the signs for the centre, then take a square root."
    },
    "b": {
      "d": 3,
      "q": "What is the greatest x-value on the ellipse (x − 1)²/36 + (y − 2)²/4 = 1?",
      "opts": ["7", "37", "3", "6"],
      "why": "The number under the x bracket is 36, so a = 6. The ellipse reaches 6 units right of the centre x = 1, so the greatest x-value is 1 + 6 = 7. The answer 6 forgets to add the centre.",
      "clue": "Which number belongs to x, and is it a or a²?"
    }
  },
  "mat-hyperbolas": {
    "title": "Parabolas and hyperbolas",
    "card": [
      [
        "Parabola",
        "A parabola is the locus of points the same distance from a point (the focus) and a line (the directrix). With vertex at the origin and focus (0, p), the directrix is y = −p and the equation is x² = 4py."
      ],
      [
        "Hyperbola",
        "The hyperbola x²/a² − y²/b² = 1 has two branches opening left and right, with vertices (±a, 0). If the y² term is the positive one, as in y²/a² − x²/b² = 1, the branches open up and down instead."
      ],
      [
        "Asymptotes",
        "The branches of x²/a² − y²/b² = 1 get closer and closer to the lines y = ±(b/a)x without touching them. These lines are the asymptotes."
      ],
      "Example: x² = 20y has 4p = 20, so p = 5 and the focus is (0, 5). For x²/4 − y²/25 = 1, a = 2 and b = 5, so the asymptotes are y = ±(5/2)x."
    ],
    "remember": "A parabola is equally far from focus and directrix. A hyperbola follows its asymptotes.",
    "a": {
      "q": "What are the asymptotes of the hyperbola x²/16 − y²/9 = 1?",
      "opts": ["y = ±(3/4)x", "y = ±(4/3)x", "y = ±(9/16)x", "y = ±(16/9)x"],
      "why": "Here a² = 16 and b² = 9, so a = 4 and b = 3. The asymptotes are y = ±(b/a)x = ±(3/4)x. Using 4/3 turns the fraction upside down.",
      "clue": "Take square roots first, then use b over a."
    },
    "b": {
      "d": 2,
      "q": "What is the focus of the parabola x² = 8y?",
      "opts": ["(0, 2)", "(2, 0)", "(0, 8)", "(0, 4)"],
      "why": "Compare x² = 8y with x² = 4py. Then 4p = 8, so p = 2 and the focus is (0, 2). The answer (0, 4) uses p = 8 ÷ 2 instead of 8 ÷ 4.",
      "clue": "Match 8 with 4p, then put p on the y-axis."
    }
  },
  "mat-parametric-equations": {
    "title": "Parametric equations",
    "card": [
      "In parametric equations, x and y are each given in terms of a third variable t, called the parameter. Each value of t gives one point (x, y).",
      "To find a point, put the value of t into both equations. For x = t² + 1 and y = 3t, t = 1 gives the point (2, 3).",
      "To find the Cartesian equation, make t the subject of one equation and substitute it into the other. For x = 2t and y = t + 1, t = x/2, so y = x/2 + 1.",
      "Parametric equations can trace curves that are not graphs of a single function. The equations x = r cos t and y = r sin t trace a circle x² + y² = r² as t increases."
    ],
    "remember": "Put t into both equations for a point. Eliminate t for the Cartesian equation.",
    "a": {
      "q": "A curve has x = t² + 1 and y = 3t. What point is on the curve when t = 2?",
      "opts": ["(5, 6)", "(6, 5)", "(4, 6)", "(3, 6)"],
      "why": "When t = 2, x = 2² + 1 = 5 and y = 3 × 2 = 6, so the point is (5, 6). The point (4, 6) leaves out the + 1. The point (6, 5) swaps x and y.",
      "clue": "Put t = 2 into each equation separately."
    },
    "b": {
      "d": 3,
      "q": "A curve has x = t + 2 and y = t². What is its Cartesian equation?",
      "opts": ["y = (x − 2)²", "y = x² − 2", "y = (x + 2)²", "y = x² + 2"],
      "why": "From x = t + 2, t = x − 2. Substituting into y = t² gives y = (x − 2)². The option y = x² − 2 squares x instead of squaring the whole expression for t.",
      "clue": "Make t the subject first, then square it."
    }
  },
  "mat-polar-coordinates": {
    "title": "Polar coordinates",
    "card": [
      "A point can be given as (r, θ). r is its distance from the origin. θ is the angle measured anticlockwise from the positive x-axis.",
      [
        "Polar to Cartesian",
        "x = r cos θ and y = r sin θ. For (4, 60°): x = 4 × 1/2 = 2 and y = 4 × √3/2 = 2√3. The point is (2, 2√3)."
      ],
      [
        "Cartesian to polar",
        "r = √(x² + y²) and tan θ = y/x. Check which quadrant the point is in, because tan θ gives the same value in two opposite quadrants."
      ],
      "For (−3, 3), r = √(9 + 9) = 3√2. The point is in the second quadrant, so θ = 135°, not 45°."
    ],
    "remember": "x = r cos θ, y = r sin θ, and r = √(x² + y²). Use the quadrant to choose θ.",
    "a": {
      "q": "A point has polar coordinates (6, 30°). What is its y-coordinate?",
      "opts": ["3", "3√3", "6", "√3/2"],
      "why": "y = r sin θ = 6 × sin 30° = 6 × 1/2 = 3. The value 3√3 comes from using cos 30° instead, which is the formula for x.",
      "clue": "y uses sine, not cosine."
    },
    "b": {
      "d": 3,
      "q": "A drone is at the point (−2, −2) on a grid, with the origin as the centre. Which polar coordinates give its position?",
      "opts": ["(2√2, 225°)", "(2√2, 45°)", "(8, 225°)", "(2√2, 135°)"],
      "why": "r = √(4 + 4) = √8 = 2√2. The point is in the third quadrant, so θ = 180° + 45° = 225°. Using 45° ignores the quadrant, and 8 forgets the square root.",
      "clue": "Both coordinates are negative, so which quadrant is the point in?"
    }
  },
  "mat-conjectures-if-only-if": {
    "title": "Conjectures and if and only if",
    "card": [
      "A conjecture is a statement that is believed true but is not yet proved. It stays a conjecture until it is proved or disproved.",
      "P ⇒ Q means if P is true, then Q is true. We say P is sufficient for Q, and Q is necessary for P.",
      "P ⇔ Q means P ⇒ Q and Q ⇒ P. Read it as P if and only if Q. Each side is both necessary and sufficient for the other.",
      "To prove P ⇔ Q, prove both directions. Example: n is even ⇔ n² is even. The 'n is even ⇒ n² is even' direction is true, but 'n² is even ⇒ n is even' must also be shown. Here both hold, so the ⇔ is true. For x > 2 ⇒ x² > 4, the reverse fails at x = −3, so ⇔ is false."
    ],
    "remember": "P ⇔ Q needs both P ⇒ Q and Q ⇒ P to be true.",
    "a": {
      "q": "Which is needed to prove the statement P ⇔ Q?",
      "opts": [
        "P ⇒ Q and Q ⇒ P are both proved",
        "P ⇒ Q is proved for several cases",
        "Q ⇒ P is proved for several cases",
        "P ⇒ Q is proved and Q is checked once"
      ],
      "why": "⇔ means each side implies the other, so both directions must be proved. Proving only P ⇒ Q shows P is sufficient for Q, but not that Q is sufficient for P.",
      "clue": "Think of the two arrows inside ⇔."
    },
    "b": {
      "d": 3,
      "q": "For a real number x, consider: x = 3 ⇒ x² = 9. Which statement about it is correct?",
      "opts": [
        "x = 3 is sufficient but not necessary for x² = 9",
        "x = 3 is necessary but not sufficient for x² = 9",
        "x = 3 is both necessary and sufficient for x² = 9",
        "x = 3 is neither necessary nor sufficient for x² = 9"
      ],
      "why": "If x = 3 then x² = 9, so x = 3 is sufficient. But x = −3 also gives x² = 9, so x = 3 is not necessary. The reverse implication fails, so the ⇔ is false.",
      "clue": "Try x = −3 in x² = 9."
    }
  },
  "mat-proof-by-induction-unit": {
    "title": "Proof by induction",
    "card": [
      "Induction proves that a statement P(n) is true for every natural number n from a starting value. It has two steps, and both are needed.",
      ["Base case", "show the statement is true for the first value, usually n = 1."],
      ["Inductive step", "assume P(k) is true for some k. Then use that to show P(k + 1) is true."],
      "Example: prove 1 + 2 + ... + n = n(n + 1)/2. For n = 1, both sides are 1. If it holds for k, then adding k + 1 gives k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2, which is the formula with n = k + 1."
    ],
    "remember": "Induction needs a true base case and a step that takes k to k + 1.",
    "a": {
      "q": "A student proves the inductive step for a statement but never checks the base case. What has the student failed to do?",
      "opts": [
        "Show the statement is true for the first value",
        "Show the statement is true for every value of k",
        "Show that P(k + 1) can be assumed true",
        "Show that the statement is true for k + 1 only"
      ],
      "why": "Without a base case, the step has nothing true to start from, so the chain never begins. The step assumes P(k) and proves P(k + 1), so it does not show the statement is true for every k directly.",
      "clue": "The step passes truth along, but where does the chain start?"
    },
    "b": {
      "d": 3,
      "q": "In proving 1 + 3 + 5 + ... + (2n − 1) = n² by induction, the statement is assumed true for n = k. What must be shown next?",
      "opts": ["k² + (2k + 1) = (k + 1)²", "k² + (2k − 1) = (k + 1)²", "k² + (2k + 1) = k²", "(k + 1)² + (2k + 1) = k²"],
      "why": "The next odd number after 2k − 1 is 2k + 1. Adding it to the assumed sum k² gives k² + 2k + 1 = (k + 1)², which is the formula with n = k + 1. Adding 2k − 1 again would repeat the last term instead of adding the new one.",
      "clue": "What is the next odd number after 2k − 1?"
    }
  },
  "mat-counterexamples": {
    "title": "Counterexamples",
    "card": [
      "A counterexample is one case where a statement about all values fails. Finding a single counterexample proves the statement is false.",
      "Many examples that work do not prove a statement true. A statement is only proved true for every case by a proof.",
      "To disprove a claim, pick a value that makes the conditions true but the conclusion false, then check it by working it out.",
      "Worked example: \"n² + n + 41 is prime for every whole number n.\" Try n = 41: 41² + 41 + 41 = 41 × 43 = 1763. This is not prime, so n = 41 is a counterexample."
    ],
    "remember": "One failing case disproves a claim for all. Many working cases never prove it.",
    "a": {
      "q": "Claim: \"n² > n for every whole number n.\" Which value of n is a counterexample?",
      "opts": ["n = 1", "n = 2", "n = 3", "n = 10"],
      "why": "For n = 1, n² = 1 and n = 1, so n² > n is false. For n = 2, 3 and 10 the claim holds (4 > 2, 9 > 3, 100 > 10), so they cannot disprove it.",
      "clue": "Which value makes both sides equal?"
    },
    "b": {
      "d": 3,
      "q": "Mia claims that \"if n is a prime number, then n + 2 is also prime\". She checks n = 3, 5 and 11 and finds it works each time. What does this show?",
      "opts": [
        "Nothing is proved, and n = 7 disproves the claim",
        "The claim is proved, because three cases work",
        "The claim is proved, because 3, 5 and 11 are all odd",
        "Nothing is proved, and n = 11 disproves the claim"
      ],
      "why": "For n = 3, 5 and 11 the claim holds, but working cases never prove it for all primes. For n = 7, n + 2 = 9 = 3 × 3, which is not prime, so n = 7 is a counterexample. For n = 11, n + 2 = 13 is prime, so n = 11 does not disprove it.",
      "clue": "Test the next prime after 5."
    }
  },
  "mat-proofs-about-integers": {
    "title": "Proofs about integers",
    "card": [
      "Every even integer can be written as 2k, and every odd integer as 2k + 1, where k is an integer. A multiple of 3 can be written as 3k.",
      [
        "Direct proof",
        "Start from what is given, write it in this algebraic form, and simplify until the result is clear. Example: for odd n = 2k + 1, n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd."
      ],
      [
        "Contradiction",
        "Assume the statement is false and work forward. If this leads to something impossible, the assumption was wrong, so the statement is true."
      ],
      "Use different letters when two integers are named, such as 2a and 2b. A prime has exactly two positive factors, 1 and itself."
    ],
    "remember": "Write integers in algebraic form, then show the result by direct proof or by contradiction.",
    "a": {
      "q": "Let m = 2a + 1 and n = 2b + 1 be two odd integers. Which expression equals m + n and shows that it is even?",
      "opts": ["2(a + b + 1)", "2(a + b) + 1", "2ab + 1", "2(a + b)"],
      "why": "m + n = 2a + 2b + 2 = 2(a + b + 1), which is 2 times an integer, so it is even. The option 2(a + b) + 1 keeps only one of the two 1s, so it does not equal m + n.",
      "clue": "Add the two forms, then take out a factor of 2."
    },
    "b": {
      "d": 3,
      "q": "To prove that the sum of three consecutive integers is a multiple of 3, let the integers be n, n + 1 and n + 2. What is the sum, written to show this?",
      "opts": ["3(n + 1)", "3n + 2", "3n + 1", "3(n + 2)"],
      "why": "n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1), which is 3 times an integer. The sum 3n + 2 comes from adding the 2 but leaving out the 1, so the constants should total 1 + 2 = 3.",
      "clue": "Add the three terms, then take out a factor of 3."
    }
  },
  "mat-contrapositive-contradiction-unit-3": {
    "title": "Contrapositive and contradiction",
    "card": [
      [
        "Contrapositive",
        "The contrapositive of \"if P then Q\" is \"if not Q then not P\". The two statements are equivalent, so proving one proves the other. Use it when \"not Q\" is easier to work from."
      ],
      [
        "Contradiction",
        "Assume the statement is false. Reason step by step until you reach something impossible. Then the assumption was wrong, so the statement is true."
      ],
      [
        "Cases",
        "Split all possibilities into groups that cover every number, such as n even or n odd. Prove the statement in each group."
      ],
      [
        "Example",
        "Claim: if n² is even, then n is even. Contrapositive: if n is odd, then n² is odd. Let n = 2k + 1. Then n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1, which is odd. So the claim is true."
      ]
    ],
    "remember": "Contrapositive turns \"if P then Q\" into \"if not Q then not P\". Contradiction assumes the statement is false and finds an impossibility.",
    "a": {
      "q": "What is the contrapositive of \"if n is divisible by 6, then n is even\"?",
      "opts": [
        "If n is not even, then n is not divisible by 6",
        "If n is even, then n is divisible by 6",
        "If n is not divisible by 6, then n is not even",
        "If n is divisible by 6, then n is not even"
      ],
      "why": "The contrapositive swaps the two parts and negates both: if not Q then not P. Here that gives \"if n is not even, then n is not divisible by 6\". The option that only swaps the parts is the converse, which is not equivalent to the original.",
      "clue": "Swap the two parts, then negate both."
    },
    "b": {
      "d": 3,
      "q": "Dana wants to prove \"if n² is odd, then n is odd\". Which start gives a valid proof of this statement by contrapositive?",
      "opts": [
        "Let n be even, so n = 2k, and show n² is even",
        "Let n be odd, so n = 2k + 1, and show n² is odd",
        "Let n² be odd, so n² = 2k + 1, and show n is odd",
        "Let n be even, so n = 2k, and show n² is odd"
      ],
      "why": "The contrapositive is \"if n is not odd, then n² is not odd\", which means: if n is even, then n² is even. Starting with n = 2k leads to n² = 4k², which is even. Starting with n odd only proves the converse.",
      "clue": "Write \"not Q then not P\" first, using even in place of not odd."
    }
  },
  "mat-rational-functions": {
    "title": "Rational functions",
    "card": [
      "A rational function is a quotient of two polynomials, f(x) = p(x) ÷ q(x). It is defined everywhere except where q(x) = 0.",
      "A vertical asymptote is a vertical line the graph approaches but never reaches. It sits at x = a when q(a) = 0 and p(a) ≠ 0.",
      "If the degree of p is exactly one more than the degree of q, the graph has an oblique asymptote. Divide p by q: the quotient is the line, and the remainder term goes to 0 for large x.",
      "Example: f(x) = (x² + 1)/(x − 2). Dividing gives x + 2 with remainder 5, so f(x) = x + 2 + 5/(x − 2). The vertical asymptote is x = 2 and the oblique asymptote is y = x + 2."
    ],
    "remember": "Vertical asymptotes need q(a) = 0 and p(a) ≠ 0. Divide p by q to find an oblique one.",
    "a": {
      "q": "Where is the vertical asymptote of f(x) = (2x + 5)/(x − 4)?",
      "opts": ["x = 4", "x = −4", "x = −5/2", "x = 2"],
      "why": "The denominator is zero at x = 4, and the numerator there is 13, which is not zero. So x = 4 is a vertical asymptote. The value x = −5/2 makes the numerator zero, which gives an x-intercept, not an asymptote.",
      "clue": "Which x-value makes the bottom of the fraction zero?"
    },
    "b": {
      "d": 3,
      "q": "What is the oblique asymptote of f(x) = (x² + 3x + 5)/(x + 1)?",
      "opts": ["y = x + 2", "y = x + 3", "y = x + 1", "y = x + 5"],
      "why": "Dividing, x² + 3x + 5 = (x + 1)(x + 2) + 3. So f(x) = x + 2 + 3/(x + 1), and the last term goes to 0 for large x. The line is y = x + 2, not y = x + 3, which only copies the middle coefficient.",
      "clue": "Divide the top by x + 1 and ignore the remainder."
    }
  },
  "mat-partial-fractions-unit-3": {
    "title": "Partial fractions in Unit 3",
    "card": [
      "A rational function whose numerator has lower degree than its denominator can be split into simpler fractions. If the denominator is (x − a)(x − b) with a ≠ b, then p(x)/((x − a)(x − b)) = A/(x − a) + B/(x − b).",
      "To find A and B, multiply both sides by the denominator. This gives p(x) = A(x − b) + B(x − a). Then substitute x = a and x = b to remove one unknown at a time.",
      "Example: (5x + 1)/((x − 1)(x + 2)). Then 5x + 1 = A(x + 2) + B(x − 1). Putting x = 1 gives 6 = 3A, so A = 2. Putting x = −2 gives −9 = −3B, so B = 3.",
      "The split makes integration easy, because the integral of 1/(x − a) is ln|x − a|. So the integral of A/(x − a) is A ln|x − a|."
    ],
    "remember": "Split the fraction, find each constant by substitution, then integrate each part as a logarithm.",
    "a": {
      "q": "Write (3x + 5)/((x + 1)(x + 2)) as partial fractions.",
      "opts": ["2/(x + 1) + 1/(x + 2)", "1/(x + 1) + 2/(x + 2)", "2/(x + 1) − 1/(x + 2)", "3/(x + 1) + 5/(x + 2)"],
      "why": "We need 3x + 5 = A(x + 2) + B(x + 1). Putting x = −1 gives 2 = A, and x = −2 gives −1 = −B, so B = 1. The swapped answer 1/(x + 1) + 2/(x + 2) mixes up which constant goes with which factor.",
      "clue": "Put x = −1 to find A, then x = −2 to find B."
    },
    "b": {
      "d": 3,
      "q": "What is the integral of 7/((x − 3)(x + 4)) with respect to x?",
      "opts": [
        "ln|x − 3| − ln|x + 4| + c",
        "ln|x − 3| + ln|x + 4| + c",
        "ln|x + 4| − ln|x − 3| + c",
        "7 ln|(x − 3)(x + 4)| + c"
      ],
      "why": "Write 7 = A(x + 4) + B(x − 3). Putting x = 3 gives A = 1, and x = −4 gives B = −1. So the fraction is 1/(x − 3) − 1/(x + 4), which integrates to ln|x − 3| − ln|x + 4| + c. Adding the logarithms ignores the negative sign on B.",
      "clue": "Split first, then check the sign of the second constant."
    }
  },
  "mat-graphs-quotient-functions": {
    "title": "Graphs of quotient functions",
    "card": [
      "To sketch a quotient function, first find its asymptotes and its intercepts. The graph may cross an oblique or horizontal asymptote, but it never meets a vertical one.",
      "Stationary points are where f′(x) = 0. Check the sign of f′ on each side to decide if each is a local maximum or minimum.",
      "A point of inflection is where f″(x) = 0 and f″ changes sign, so the graph changes concavity. If f″ is zero but does not change sign, there is no inflection.",
      "Example: f(x) = x + 1/x. Then f′(x) = 1 − 1/x² = 0 gives x = ±1. Also f″(x) = 2/x³ is never zero, so there is no point of inflection."
    ],
    "remember": "Asymptotes first, then f′ = 0 for stationary points, then a sign change in f″ for inflections.",
    "a": {
      "q": "At which x-values does f(x) = x + 4/x have stationary points?",
      "opts": ["x = 2 and x = −2", "x = 4 and x = −4", "x = 0 only", "x = 2 only"],
      "why": "f′(x) = 1 − 4/x², which is zero when x² = 4, so x = 2 or x = −2. The value x = 0 is a vertical asymptote, where f′ is not defined, so it is not a stationary point.",
      "clue": "Differentiate, set f′(x) = 0, then solve for x."
    },
    "b": {
      "d": 3,
      "q": "For g(x) = 1/(x² + 1), g″(x) = (6x² − 2)/(x² + 1)³. How many points of inflection does the graph have?",
      "opts": ["Two", "One", "None", "Three"],
      "why": "g″ is zero when 6x² = 2, so x = 1/√3 or x = −1/√3. The numerator changes sign at each, and the denominator is always positive, so concavity changes at both. The point x = 0 is a stationary maximum, not an inflection.",
      "clue": "Solve g″(x) = 0, then check that the sign changes."
    }
  },
  "mat-de-moivre-s-theorem": {
    "title": "De Moivre's theorem",
    "card": [
      "A complex number in polar form is z = r cis θ, where r is the modulus and θ is the argument. cis θ means cos θ + i sin θ.",
      "De Moivre's theorem: (r cis θ)ⁿ = rⁿ cis(nθ). To raise to a power n, raise the modulus to the power n and multiply the argument by n.",
      "Example: (2 cis 30°)⁴ = 2⁴ cis(4 × 30°) = 16 cis 120°. Angles can be in degrees or radians, as long as you stay with one.",
      "To use it on a number in the form a + bi, first write it in polar form. Find r = √(a² + b²) and then θ."
    ],
    "remember": "Power n: raise the modulus to n, multiply the argument by n.",
    "a": {
      "q": "What is (3 cis 20°)³ in polar form?",
      "opts": ["27 cis 60°", "9 cis 60°", "27 cis 8000°", "9 cis 8000°"],
      "why": "The modulus is raised to the power 3, so 3³ = 27. The argument is multiplied by 3, so 3 × 20° = 60°. Multiplying the modulus by 3 (giving 9) is the tempting mistake, as the power applies to the modulus.",
      "clue": "Modulus: use the power. Argument: multiply."
    },
    "b": {
      "d": 3,
      "q": "What is (1 + i)⁸ in the form a + bi?",
      "opts": ["16", "16i", "−16", "256"],
      "why": "1 + i = √2 cis(π/4). Then (√2)⁸ = 16 and 8 × π/4 = 2π, so the result is 16 cis 2π = 16. Taking the modulus as 2, by adding 1 + 1, gives 2⁸ = 256, but r = √(1² + 1²) = √2.",
      "clue": "Find the modulus and argument of 1 + i first."
    }
  },
  "mat-roots-complex-numbers": {
    "title": "Roots of complex numbers",
    "card": [
      "A non-zero complex number z has exactly n different nth roots. Write z = r cis θ. One root is r^(1/n) cis(θ/n).",
      "The other roots come from adding multiples of 2π, written 2πk, to the angle before dividing by n. The roots are r^(1/n) cis((θ + 2πk)/n) for k = 0, 1, ..., n − 1.",
      "All n roots have the same modulus, r^(1/n). Their arguments are 2π/n apart, so they are evenly spaced on a circle centred at the origin.",
      "Example: the cube roots of 1 have modulus 1 and arguments 0, 2π/3 and 4π/3. So they are 1, cis(2π/3) and cis(4π/3)."
    ],
    "remember": "n roots, the same modulus, and arguments 2π/n apart.",
    "a": {
      "q": "The 5th roots of 1 are evenly spaced on a circle. What is the angle between neighbouring roots?",
      "opts": ["2π/5", "π/5", "2π", "5π/2"],
      "why": "There are 5 roots spread evenly around a full turn of 2π, so neighbouring roots are 2π/5 apart. π/5 is tempting, but it would fit 10 roots around the circle.",
      "clue": "Share one full turn equally between the roots."
    },
    "b": {
      "d": 3,
      "q": "The 4th roots of 16 are plotted in the complex plane. What are their modulus and the angle between neighbouring roots?",
      "opts": ["Modulus 2, angle π/2", "Modulus 4, angle π/2", "Modulus 2, angle π/4", "Modulus 4, angle π/4"],
      "why": "Each root has modulus 16^(1/4) = 2, because 2⁴ = 16. There are 4 roots, so neighbouring roots are 2π/4 = π/2 apart. Modulus 4 comes from dividing 16 by 4, which is not how roots work.",
      "clue": "Find the number that gives 16 when raised to the power 4."
    }
  },
  "mat-factorising-polynomials-over-c": {
    "title": "Factorising polynomials over C",
    "card": [
      "The fundamental theorem of algebra says a polynomial of degree n has exactly n roots over C, counting repeated roots as many times as they occur.",
      "So over C every polynomial of degree n factorises fully into n linear factors. If a is a root, then (z − a) is a factor.",
      "Example: z² + 4 has roots 2i and −2i, because (2i)² = −4. So z² + 4 = (z − 2i)(z + 2i).",
      "A repeated root counts each time. In (z − 3)²(z + 1), the root 3 is counted twice, so the polynomial has 3 roots and degree 3."
    ],
    "remember": "Degree n means n linear factors over C, one for each root, counting repeats.",
    "a": {
      "q": "Which is the full factorisation of z² + 9 over C?",
      "opts": ["(z − 3i)(z + 3i)", "(z − 3)(z + 3)", "(z − 9i)(z + 9i)", "(z + 3i)²"],
      "why": "The roots satisfy z² = −9, so z = 3i or z = −3i, giving (z − 3i)(z + 3i). (z − 3)(z + 3) expands to z² − 9, which is a sign error.",
      "clue": "Solve z² = −9, then write one factor for each root."
    },
    "b": {
      "d": 3,
      "q": "P(z) = (z − 2)³(z + i) is a polynomial. How many roots does it have over C, counting repeats?",
      "opts": ["4", "2", "3", "5"],
      "why": "The factor (z − 2) appears three times and (z + i) once, so the roots are counted 3 + 1 = 4. This matches the degree, which is 4. Counting only distinct roots gives 2, which ignores the repeats.",
      "clue": "Add up the powers on all the linear factors."
    }
  },
  "mat-solving-polynomial-equations-over": {
    "title": "Solving polynomial equations over C",
    "card": [
      "A quadratic with real coefficients and a negative discriminant has complex roots. Complete the square or use the formula, and write √(−k) as i√k.",
      "Conjugate root theorem: if a polynomial has real coefficients and a + bi is a root, then a − bi is also a root. Non-real roots come in pairs.",
      "A conjugate pair a ± bi gives the real quadratic factor x² − 2ax + (a² + b²). Divide the polynomial by this factor to find the remaining roots.",
      "Example: x³ − 2x² + 4x − 8 = 0. Try x = 2: 8 − 8 + 8 − 8 = 0, so (x − 2) is a factor. Dividing gives x² + 4 = 0, so x = ±2i. The roots are 2, 2i and −2i."
    ],
    "remember": "Real coefficients mean non-real roots come in conjugate pairs, and each pair gives a real quadratic factor.",
    "a": {
      "q": "A cubic with real coefficients has roots 3 and 1 + 2i. What is the third root?",
      "opts": ["1 − 2i", "−1 + 2i", "−1 − 2i", "−3"],
      "why": "The coefficients are real, so the conjugate of 1 + 2i must also be a root. The conjugate changes only the sign of the imaginary part, giving 1 − 2i. Option −1 − 2i is the negative, not the conjugate.",
      "clue": "What does the conjugate root theorem say about a non-real root?"
    },
    "b": {
      "d": 3,
      "q": "A quartic with real coefficients has roots 2 + i and −3i. What is the real quadratic factor from the root 2 + i?",
      "opts": ["x² − 4x + 5", "x² + 4x + 5", "x² − 4x + 3", "x² − 2x + 5"],
      "why": "The roots 2 ± i form a conjugate pair with a = 2 and b = 1. Then x² − 2ax + (a² + b²) gives x² − 4x + 5. Option x² − 4x + 3 uses a² − b², but (2 + i)(2 − i) = 4 + 1 = 5.",
      "clue": "Pair 2 + i with its conjugate, then find a and b."
    }
  },
  "mat-implicit-differentiation": {
    "title": "Implicit differentiation",
    "card": [
      "Some relations, such as x² + y² = 25, do not give y as a function of x. We can still find dy/dx by differentiating both sides with respect to x.",
      "A term in x is differentiated as usual. A term in y is differentiated using the chain rule, so d/dx(y²) = 2y × dy/dx. A product such as xy needs the product rule.",
      "After differentiating, collect the dy/dx terms on one side and solve for dy/dx. The answer usually has both x and y in it.",
      "Example: x² + y² = 25. Differentiate: 2x + 2y × dy/dx = 0. So dy/dx = −2x ÷ 2y = −x/y. At (3, 4), dy/dx = −3/4."
    ],
    "remember": "Differentiate every term with respect to x, and attach dy/dx to each term in y.",
    "a": {
      "q": "Which expression is d/dx of y³ with respect to x?",
      "opts": ["3y² × dy/dx", "3y²", "3x² × dy/dx", "y³ × dy/dx"],
      "why": "y depends on x, so the chain rule gives 3y² multiplied by dy/dx. Writing only 3y² skips the chain rule step, which is the most common mistake.",
      "clue": "y is a function of x, so the chain rule applies."
    },
    "b": {
      "d": 3,
      "q": "For x² + 3y² = 12, what is dy/dx at the point (3, 1)?",
      "opts": ["−1", "−3", "1", "−1/3"],
      "why": "Differentiating gives 2x + 6y × dy/dx = 0, so dy/dx = −x/(3y). At (3, 1) this is −3/3 = −1. The answer −3 comes from forgetting the 3 in 6y.",
      "clue": "The derivative of 3y² is 6y × dy/dx."
    }
  },
  "mat-related-rates": {
    "title": "Related rates",
    "card": [
      "A related rates problem links two quantities that both change with time t. The chain rule connects their rates: dV/dt = dV/dr × dr/dt.",
      "Step 1: write an equation that links the quantities. Step 2: differentiate both sides with respect to t. Step 3: substitute the known values and solve.",
      "Example: a sphere has V = 4/3 πr³, so dV/dt = 4πr² × dr/dt. If r = 2 cm and dr/dt = 0.5 cm/s, then dV/dt = 4π × 4 × 0.5 = 8π cm³/s.",
      "Put in the numbers only after differentiating. A quantity that changes with time must not be replaced by its value before this step."
    ],
    "remember": "Write the link, differentiate with respect to t, then substitute the numbers.",
    "a": {
      "q": "A circular oil spill has area A = πr². Its radius grows at 3 m/min. What is dA/dt when r = 10 m?",
      "opts": ["60π m²/min", "30π m²/min", "300π m²/min", "100π m²/min"],
      "why": "dA/dt = 2πr × dr/dt = 2π × 10 × 3 = 60π m²/min. The option 30π comes from forgetting the 2 in 2πr.",
      "clue": "Differentiate A = πr² with respect to t first."
    },
    "b": {
      "d": 3,
      "q": "Air fills a spherical balloon at 36π cm³/s. Using V = 4/3 πr³, how fast is the radius growing when r = 3 cm?",
      "opts": ["1 cm/s", "3 cm/s", "1/3 cm/s", "12 cm/s"],
      "why": "dV/dt = 4πr² × dr/dt, so 36π = 4π × 9 × dr/dt = 36π × dr/dt. Then dr/dt = 1 cm/s. The option 3 comes from dividing by 12π, which is wrong.",
      "clue": "Find dV/dt in terms of dr/dt, then substitute r = 3."
    }
  },
  "mat-derivatives-inverse-circular-functions": {
    "title": "Derivatives of inverse circular functions",
    "card": [
      "The derivative of arcsin(x) is 1/√(1 − x²), for −1 < x < 1.",
      "The derivative of arctan(x) is 1/(1 + x²), for all real x.",
      "When the input is a function u of x, use the chain rule. The derivative of arctan(u) is u′/(1 + u²).",
      "Example: for y = arctan(3x), u = 3x and u′ = 3. So dy/dx = 3/(1 + 9x²)."
    ],
    "remember": "Arcsin gives 1/√(1 − x²), arctan gives 1/(1 + x²), and the chain rule puts u′ on top.",
    "a": {
      "q": "What is the derivative of arcsin(x)?",
      "opts": ["1/√(1 − x²)", "1/(1 + x²)", "1/√(1 + x²)", "−1/√(1 − x²)"],
      "why": "The derivative of arcsin(x) is 1/√(1 − x²). The option 1/(1 + x²) is the derivative of arctan(x), a neighbouring result.",
      "clue": "The answer has a square root in the denominator."
    },
    "b": {
      "d": 3,
      "q": "What is dy/dx when y = arctan(2x) at x = 1/2?",
      "opts": ["1", "2", "1/2", "4/5"],
      "why": "By the chain rule, dy/dx = 2/(1 + 4x²). At x = 1/2, 4x² = 1, so dy/dx = 2/2 = 1. The option 1/2 forgets to multiply by u′ = 2.",
      "clue": "Let u = 2x and multiply by u′ = 2."
    }
  },
  "mat-graphs-antiderivatives": {
    "title": "Graphs of antiderivatives",
    "card": [
      "An antiderivative of f is a function F whose derivative is f. So F′(x) = f(x).",
      "Any two antiderivatives of f differ by a constant. Their graphs are vertical shifts of each other, with the same shape.",
      "Where f is positive, F is increasing. Where f is negative, F is decreasing. Where f = 0, F has a stationary point.",
      "Example: if f is a straight line crossing the x-axis at x = 2 from below to above, F has a minimum at x = 2."
    ],
    "remember": "The sign of f gives the slope of F, and F can be shifted up or down.",
    "a": {
      "q": "The graph of f is above the x-axis for 1 < x < 4. What does the graph of an antiderivative F do on that interval?",
      "opts": ["It is increasing", "It is decreasing", "It is above the x-axis", "It is concave up"],
      "why": "F′ = f, and f is positive there, so F is increasing. F being above the x-axis depends on the shift, so it is not guaranteed.",
      "clue": "F′ = f, so the sign of f gives the slope of F."
    },
    "b": {
      "d": 3,
      "q": "f crosses the x-axis at x = 3 from above to below. What does an antiderivative F have at x = 3?",
      "opts": ["A local maximum", "A local minimum", "A point of inflection", "A vertical asymptote"],
      "why": "F′ = f is positive before x = 3 and negative after, so F rises then falls. This gives a local maximum. A minimum would need f to go from negative to positive.",
      "clue": "Check whether F rises or falls on each side of x = 3."
    }
  },
  "mat-integrals-that-give-inverse": {
    "title": "Inverse circular function integrals",
    "card": [
      "Two standard results: ∫ 1/(a² + x²) dx = (1/a) tan⁻¹(x/a) + c, and ∫ 1/√(a² − x²) dx = sin⁻¹(x/a) + c, for a > 0.",
      "For the second result, x must lie between −a and a, so that the square root is defined and the denominator is not zero.",
      "Match the form first. A sum a² + x² under no root gives tan⁻¹. A difference a² − x² under a root gives sin⁻¹. Find a by taking the square root of the constant.",
      "Worked example: ∫ 1/(9 + x²) dx. Here a² = 9, so a = 3. The answer is (1/3) tan⁻¹(x/3) + c."
    ],
    "remember": "Sum a² + x² gives tan⁻¹ with a factor 1/a. Root of a² − x² gives sin⁻¹ with no factor.",
    "a": {
      "q": "What is ∫ 1/(25 + x²) dx?",
      "opts": ["(1/5) tan⁻¹(x/5) + c", "(1/25) tan⁻¹(x/25) + c", "5 tan⁻¹(x/5) + c", "(1/5) sin⁻¹(x/5) + c"],
      "why": "Here a² = 25, so a = 5, and the result is (1/a) tan⁻¹(x/a) = (1/5) tan⁻¹(x/5) + c. Using 1/25 is tempting, but that mistakes a² for a.",
      "clue": "Find a by taking the square root of 25."
    },
    "b": {
      "d": 3,
      "q": "What is ∫ 1/√(16 − x²) dx, for −4 < x < 4?",
      "opts": ["sin⁻¹(x/4) + c", "(1/4) sin⁻¹(x/4) + c", "(1/4) tan⁻¹(x/4) + c", "tan⁻¹(x/4) + c"],
      "why": "The form is a difference under a root with a² = 16, so a = 4 and the result is sin⁻¹(x/4) + c. The factor 1/a belongs only to the tan⁻¹ result, so (1/4) sin⁻¹(x/4) is wrong.",
      "clue": "Which result has a root and a minus sign, and does it have a factor out the front?"
    }
  },
  "mat-integration-by-substitution": {
    "title": "Integration by substitution",
    "card": [
      "Use substitution when the integrand has an inner function g(x) and also its derivative g′(x) as a factor. Let u = g(x).",
      "Then du/dx = g′(x), so g′(x) dx becomes du. If the factor is a constant multiple of g′(x), such as 6x² when g′(x) = 3x², write it as that multiple of du.",
      "The integral of f(g(x))g′(x) dx becomes the integral of f(u) du. Integrate in u, then put g(x) back in place of u. For a definite integral, you can instead change the limits to u-values.",
      "For example, for the integral of 2x(x² + 1)³ dx, let u = x² + 1. Then du = 2x dx, so the integral is u³ du = u⁴/4 + c = (x² + 1)⁴/4 + c."
    ],
    "remember": "Let u be the inner function, swap g′(x) dx for du, integrate, then change back.",
    "a": {
      "q": "To find the integral of 6x²(x³ + 5)⁴ dx, which substitution works best?",
      "opts": ["u = x³ + 5, so du = 3x² dx", "u = x³ + 5, so du = 6x² dx", "u = x², so du = 2x dx", "u = 6x², so du = 12x dx"],
      "why": "The inner function is x³ + 5, and its derivative 3x² is a factor of 6x², so 6x² dx = 2 du. The option with du = 6x² dx gets du wrong: the derivative of x³ + 5 is 3x², and the extra factor of 2 is handled separately.",
      "clue": "Pick the inner function whose derivative appears as a factor."
    },
    "b": {
      "d": 3,
      "q": "What is the integral of 4x(x² + 3)³ dx?",
      "opts": ["(x² + 3)⁴/2 + c", "(x² + 3)⁴/4 + c", "2(x² + 3)⁴ + c", "(x² + 3)⁴ + c"],
      "why": "Let u = x² + 3, so du = 2x dx and 4x dx = 2 du. The integral is 2 × u³ du = 2 × u⁴/4 = u⁴/2. The tempting option (x² + 3)⁴/4 forgets the factor of 2 from 4x dx.",
      "clue": "Write 4x dx as a multiple of du."
    }
  },
  "mat-integrating-with-trigonometric-identities": {
    "title": "Integrating with trigonometric identities",
    "card": [
      "We have no direct rule for ∫ sin²x dx. A trigonometric identity can rewrite the function as one we can integrate.",
      ["sin²x", "sin²x = (1 − cos 2x)/2"],
      ["cos²x", "cos²x = (1 + cos 2x)/2"],
      "Example: ∫ sin²x dx = ∫ (1 − cos 2x)/2 dx = x/2 − (sin 2x)/4 + c. The 4 appears because ∫ cos 2x dx = (sin 2x)/2, and this is then halved."
    ],
    "remember": "Rewrite sin²x or cos²x using cos 2x, then integrate each term.",
    "a": {
      "q": "Which expression equals ∫ cos²x dx?",
      "opts": ["x/2 + (sin 2x)/4 + c", "x/2 − (sin 2x)/4 + c", "x/2 + (sin 2x)/2 + c", "(cos³x)/3 + c"],
      "why": "cos²x = (1 + cos 2x)/2. Integrating gives x/2 + (sin 2x)/4 + c. The option with a minus sign is the answer for sin²x, so it uses the wrong identity.",
      "clue": "Use the identity that has a plus sign."
    },
    "b": {
      "d": 3,
      "q": "What is the value of ∫ from 0 to π/2 of sin²x dx?",
      "opts": ["π/4", "π/2", "1/2", "1"],
      "why": "The antiderivative is x/2 − (sin 2x)/4. At π/2 it equals π/4 − 0, and at 0 it equals 0, so the value is π/4. The value π/2 comes from forgetting the factor 1/2 in the identity.",
      "clue": "Write sin²x as (1 − cos 2x)/2 before you integrate."
    }
  },
  "mat-integration-by-parts": {
    "title": "Integration by parts",
    "card": [
      "Integration by parts is used when the integrand is a product that substitution cannot simplify. The rule is ∫u dv = uv − ∫v du, where du is the derivative of u times dx, and v is the integral of dv.",
      "Split the integrand into two parts. Call one part u, which you differentiate, and the other dv, which you integrate. Choose u so that du is simpler than u.",
      "Example: ∫x e^x dx. Let u = x and dv = e^x dx. Then du = dx and v = e^x.",
      "Put these in the rule: ∫x e^x dx = x e^x − ∫e^x dx = x e^x − e^x + c."
    ],
    "remember": "∫u dv = uv − ∫v du. Pick u so that differentiating it makes it simpler.",
    "a": {
      "q": "For ∫x e^x dx, we set u = x and dv = e^x dx. What is the integral ∫v du that must be subtracted from uv?",
      "opts": ["∫e^x dx", "∫x e^x dx", "∫x dx", "∫(x²/2) e^x dx"],
      "why": "Here du = dx and v = e^x, so v du = e^x dx. Using ∫x e^x dx again would just repeat the original problem, because the rule subtracts the integral of v du, not of u dv.",
      "clue": "Find v and du first, then multiply them."
    },
    "b": {
      "d": 3,
      "q": "Using integration by parts with u = x and dv = cos x dx, what is ∫x cos x dx?",
      "opts": ["x sin x + cos x + c", "x sin x − cos x + c", "x sin x + sin x + c", "−x sin x + cos x + c"],
      "why": "Here du = dx and v = sin x, so ∫x cos x dx = x sin x − ∫sin x dx. Since ∫sin x dx = −cos x, this gives x sin x + cos x + c. The option with −cos x comes from forgetting that subtracting −cos x gives +cos x. Check: the derivative of x sin x + cos x is sin x + x cos x − sin x = x cos x.",
      "clue": "The integral of sin x is −cos x, and the rule subtracts it."
    }
  },
  "mat-volumes-solids-revolution": {
    "title": "Volumes of solids of revolution",
    "card": [
      "Rotate the region under a curve y = f(x), from x = a to x = b, once around the x-axis. This makes a solid. Each slice of it is a thin disc with radius y.",
      "A disc has area πy², so the volume is V = π ∫ y² dx, from x = a to x = b. Square y first, then integrate.",
      "For a rotation about the y-axis, swap the roles of x and y: V = π ∫ x² dy, from y = c to y = d. Write x in terms of y first.",
      "Example: y = x from x = 0 to x = 3 gives a cone. V = π ∫ x² dx = π[x³/3] from 0 to 3 = π(9 − 0) = 9π."
    ],
    "remember": "Square the radius, multiply by π, then integrate along the axis of rotation.",
    "a": {
      "q": "The curve y = √x, from x = 0 to x = 4, is rotated about the x-axis. What is the volume of the solid?",
      "opts": ["8π", "16π/3", "4π", "2π"],
      "why": "V = π ∫ (√x)² dx = π ∫ x dx = π[x²/2] from 0 to 4 = π × 8 = 8π. Writing π ∫ √x dx gives 16π/3, which is wrong because y was not squared first.",
      "clue": "Square y before you integrate, and (√x)² is simple."
    },
    "b": {
      "d": 3,
      "q": "The region under y = 2x from x = 1 to x = 2 is rotated about the x-axis. What is the volume of the solid?",
      "opts": ["28π/3", "14π/3", "28/3", "56π/3"],
      "why": "V = π ∫ (2x)² dx = π ∫ 4x² dx = π[4x³/3] from 1 to 2 = π(32/3 − 4/3) = 28π/3. Forgetting to square the 2 gives 14π/3, which is wrong because the radius is 2x, so the 2 is squared too.",
      "clue": "The radius is 2x, so square the whole of it, including the 2."
    }
  },
  "mat-arc-length-surface-area": {
    "title": "Arc length and surface area",
    "card": [
      "A curve given by x = x(t) and y = y(t), for a ≤ t ≤ b, has length L = ∫ √((dx/dt)² + (dy/dt)²) dt, from t = a to t = b. The root comes from Pythagoras on a tiny piece of the curve.",
      "If the curve is y = f(x), use L = ∫ √(1 + (dy/dx)²) dx, from x = a to x = b.",
      "Rotating the curve y = f(x) about the x-axis makes a surface. Its area is S = 2π ∫ y √(1 + (dy/dx)²) dx. Each tiny piece of length is spun around a circle of circumference 2πy.",
      "Example: x = t², y = 2t for 0 ≤ t ≤ 1 gives dx/dt = 2t and dy/dt = 2. So L = ∫ √(4t² + 4) dt = 2∫ √(t² + 1) dt, from t = 0 to t = 1."
    ],
    "remember": "Length adds up tiny pieces √(dx² + dy²). Surface area multiplies each piece by 2πy.",
    "a": {
      "q": "A curve has x = 3t and y = 4t for 0 ≤ t ≤ 2. Using the arc length formula, what is its length?",
      "opts": ["10", "14", "5", "50"],
      "why": "dx/dt = 3 and dy/dt = 4, so the integrand is √(9 + 16) = 5. Then L = 5 × 2 = 10. Answer 5 forgets to integrate over the interval of length 2.",
      "clue": "The integrand is constant, so multiply it by the length of the t interval."
    },
    "b": {
      "d": 3,
      "q": "The line y = 2x for 0 ≤ x ≤ 1 is rotated about the x-axis. What is the surface area, using S = 2π ∫ y √(1 + (dy/dx)²) dx?",
      "opts": ["2π√5", "4π√5", "2π", "4π"],
      "why": "dy/dx = 2, so √(1 + 4) = √5. Then S = 2π ∫ 2x√5 dx = 2π√5 × [x²] from 0 to 1 = 2π√5. Answer 4π√5 forgets that the integral of 2x is x², not 2x². Answer 4π leaves out the √5 factor.",
      "clue": "Put y = 2x into the integrand, and keep the factor √(1 + (dy/dx)²)."
    }
  },
  "mat-differential-equations": {
    "title": "Differential equations",
    "card": [
      "A differential equation links a quantity to its rate of change. For example, dy/dt = 3y says the rate of change of y is 3 times y.",
      "To form one from a context, write the rate as a derivative and set it equal to what the words describe. \"A tank loses salt at a rate proportional to the amount S present\" gives dS/dt = −kS, with k > 0.",
      "A solution is a function that makes the equation true. To check one, differentiate it and substitute both y and dy/dt into the equation.",
      "Worked check: is y = 2e^(3t) a solution of dy/dt = 3y? Differentiating gives dy/dt = 6e^(3t). Also 3y = 3 × 2e^(3t) = 6e^(3t). The two sides match, so it is a solution."
    ],
    "remember": "Write the rate as a derivative to form the equation. Substitute the function and its derivative to check a solution.",
    "a": {
      "q": "A biologist says the rate of growth of a bacteria population N is proportional to N, with constant k > 0. Which differential equation matches?",
      "opts": ["dN/dt = kN", "N = kt", "dN/dt = k", "dN/dt = N + k"],
      "why": "A rate of change is written as dN/dt, and proportional to N means it equals k times N. The option dN/dt = k is tempting, but that rate stays the same whatever N is, so it is not proportional to N.",
      "clue": "Follow the same steps used for the salt tank on the card."
    },
    "b": {
      "d": 3,
      "q": "Which function is a solution of dy/dt = −2y?",
      "opts": ["y = 5e^(−2t)", "y = 5e^(2t)", "y = −2t + 5", "y = 5 − 2t²"],
      "why": "For y = 5e^(−2t), dy/dt = −10e^(−2t), and −2y = −2 × 5e^(−2t) = −10e^(−2t). The two sides match. For y = 5e^(2t), dy/dt = 10e^(2t), but −2y = −10e^(2t), so the sign is wrong.",
      "clue": "Differentiate each function, then compare dy/dt with −2y."
    }
  },
  "mat-separation-variables": {
    "title": "Separation of variables",
    "card": [
      "A differential equation of the form dy/dx = f(x) × g(y) can be solved by separating the variables. Get all the y terms on one side with dy, and all the x terms on the other with dx.",
      "Then integrate both sides: ∫ 1/g(y) dy = ∫ f(x) dx. Note that ∫ 1/y dy = ln|y|. Put a single constant c on one side only, as the two constants combine into one.",
      "Use a given point to find c. If y > 0 at that point, ln|y| can be written as ln y. Then solve for y if the question asks for it.",
      [
        "Example",
        "dy/dx = 2xy, with y = 1 when x = 0. Separate: ∫ 1/y dy = ∫ 2x dx, so ln|y| = x² + c. At x = 0, y = 1, so c = 0. As y > 0, ln y = x², so y = e^(x²)."
      ]
    ],
    "remember": "Put y with dy and x with dx, integrate both sides, then use the point to find c.",
    "a": {
      "q": "Which line is the correct first step in separating dy/dx = 3y²x?",
      "opts": ["∫ 1/y² dy = ∫ 3x dx", "∫ y² dy = ∫ 3x dx", "∫ 1/y² dy = ∫ 3 dx", "∫ 1/y dy = ∫ 3x dx"],
      "why": "Dividing both sides by y² gives (1/y²) dy/dx = 3x, so 1/y² goes with dy and 3x with dx. Writing ∫ y² dy = ∫ 3x dx leaves y² with dy without dividing by it, so the equation is no longer the same.",
      "clue": "Which operation moves y² off the x side?"
    },
    "b": {
      "d": 3,
      "q": "Solve dy/dx = 2y, given y = 3 when x = 0. What is y when x = ln 2?",
      "opts": ["12", "6", "7", "4 + ln 3"],
      "why": "Separating gives ∫ 1/y dy = ∫ 2 dx, so ln|y| = 2x + c, and c = ln 3. As y > 0, y = e^(2x + ln 3) = 3e^(2x). At x = ln 2, y = 3e^(ln 4) = 3 × 4 = 12. The answer 6 comes from treating e^(2 ln 2) as 2.",
      "clue": "e^(a + b) = e^a × e^b, and 2 ln 2 = ln 4."
    }
  },
  "mat-growth-decay-models": {
    "title": "Growth and decay models",
    "card": [
      "If the rate of change of y is proportional to y, then dy/dt = ky, where k is a constant. The solution is y = Ae^(kt), where A is the value of y at t = 0.",
      [
        "Growth",
        "k > 0. The rate rises as y rises, so y grows exponentially. Example: dy/dt = 0.03y gives y = Ae^(0.03t)."
      ],
      [
        "Decay",
        "k < 0. The rate of decrease slows as y falls, so y shrinks towards 0. Example: dy/dt = −0.2y gives y = Ae^(−0.2t)."
      ],
      "Worked example: a drug has dy/dt = −0.2y and y = 50 mg at t = 0. Then y = 50e^(−0.2t). At t = 5, y = 50e^(−1) ≈ 18.4 mg."
    ],
    "remember": "dy/dt = ky gives y = Ae^(kt): growth if k is positive, decay if k is negative.",
    "a": {
      "q": "A quantity satisfies dy/dt = −0.4y, and y = 10 when t = 0. Which equation gives y in terms of t?",
      "opts": ["y = 10e^(−0.4t)", "y = 10e^(0.4t)", "y = −0.4e^(10t)", "y = 10 − 0.4t"],
      "why": "For dy/dt = ky the solution is y = Ae^(kt), and A = 10 because y = 10 at t = 0. Here k = −0.4, so y = 10e^(−0.4t). The option with 0.4 instead of −0.4 loses the sign, which would give growth rather than decay.",
      "clue": "Match the form y = Ae^(kt) and keep the sign of k."
    },
    "b": {
      "d": 3,
      "q": "A culture of bacteria in a lab in Geelong has dy/dt = 0.5y, with y in thousands and t in hours. At t = 0, y = 4. What is y at t = 2, to one decimal place?",
      "opts": ["10.9 thousand", "8.0 thousand", "5.0 thousand", "29.6 thousand"],
      "why": "The solution is y = 4e^(0.5t). At t = 2, y = 4e^1 = 4 × 2.718 ≈ 10.9. Using 4 × 2 = 8.0 treats the rate as a plain multiple instead of using the exponential.",
      "clue": "Find A first, then put t = 2 into Ae^(kt)."
    }
  },
  "mat-logistic-equation": {
    "title": "The logistic equation",
    "card": [
      "The logistic equation models a population P with a limit N, the carrying capacity: the largest population the environment can support. From a small start, P grows slowly, speeds up until P = N/2, then slows as it nears N.",
      "The equation is dP/dt = kP(1 − P/N), where k > 0 and N > 0. The factor (1 − P/N) is close to 1 when P is small and close to 0 when P is near N.",
      "If 0 < P < N, then dP/dt > 0 and the population rises towards N. If P > N, then dP/dt < 0 and it falls towards N. If P = N or P = 0, then dP/dt = 0 and the population does not change.",
      "Example: dP/dt = 0.2P(1 − P/500). When P = 100, dP/dt = 0.2 × 100 × (1 − 100/500) = 20 × 0.8 = 16. The population is growing at 16 per unit of time."
    ],
    "remember": "The rate kP(1 − P/N) peaks at P = N/2 and falls to 0 as P reaches N.",
    "a": {
      "q": "A population follows dP/dt = 0.3P(1 − P/800). What is the carrying capacity?",
      "opts": ["800", "0.3", "2400", "400"],
      "why": "The equation has the form dP/dt = kP(1 − P/N), so N = 800. The number 0.3 is the growth constant k, not a population limit, and 400 is N/2, where growth is fastest.",
      "clue": "Match the equation to the form with N inside the bracket."
    },
    "b": {
      "d": 3,
      "q": "A pond population follows dP/dt = 0.1P(1 − P/200). At P = 100, what is dP/dt?",
      "opts": ["5", "10", "2.5", "0"],
      "why": "dP/dt = 0.1 × 100 × (1 − 100/200) = 10 × 0.5 = 5. The value 10 comes from leaving out the bracket. The value 0 mixes up the point where the rate is largest, P = N/2, with a rate of zero.",
      "clue": "Work out the bracket first, then multiply by 0.1P."
    }
  },
  "mat-slope-fields": {
    "title": "Slope fields",
    "card": [
      "A slope field is a grid of short line segments. For dy/dx = f(x, y), the segment at each point (x, y) has gradient f(x, y).",
      "To draw one, put the x and y values of a grid point into f(x, y). Example: for dy/dx = x − y, at (3, 1) the gradient is 3 − 1 = 2.",
      "Where f(x, y) = 0, the segment is flat. Where f(x, y) is positive the segment rises to the right, and where it is negative it falls.",
      "A solution curve is drawn by starting at a given point and following the segments, so that the curve touches each segment it meets and has the same direction there. No solving is needed."
    ],
    "remember": "Each segment shows the gradient f(x, y) at its point. A solution curve follows the segments.",
    "a": {
      "q": "A slope field is drawn for dy/dx = x − y. What is the gradient of the segment at the point (4, 1)?",
      "opts": ["3", "5", "−3", "4"],
      "why": "Substitute x = 4 and y = 1: 4 − 1 = 3. The value 5 comes from adding the values instead of subtracting, and −3 comes from reversing the order to y − x.",
      "clue": "Put both coordinates into the right side of the equation."
    },
    "b": {
      "d": 3,
      "q": "For dy/dx = xy, which statement about the slope field is correct?",
      "opts": [
        "Segments are flat along both axes",
        "Segments are flat only along the x-axis",
        "Segments are flat only along the y-axis",
        "Segments are flat only at the origin"
      ],
      "why": "The gradient is xy, which is 0 when x = 0 or y = 0. So segments are flat along both axes. Flat only at the origin is tempting, but every point on either axis gives xy = 0.",
      "clue": "Find every point where xy = 0."
    }
  },
  "mat-euler-s-method": {
    "title": "Euler's method",
    "card": [
      "Euler's method approximates a solution of dy/dx = f(x, y) when you know a starting point. It moves in small steps of size h along the tangent line.",
      "Each step uses the gradient at the current point. x(n+1) = x(n) + h and y(n+1) = y(n) + h × f(x(n), y(n)).",
      "Example: dy/dx = x + y, y(0) = 1, h = 0.1. The gradient at (0, 1) is 0 + 1 = 1. So y1 = 1 + 0.1 × 1 = 1.1 at x = 0.1.",
      "For the next step, use the new point (0.1, 1.1). The gradient is 0.1 + 1.1 = 1.2, so y2 = 1.1 + 0.1 × 1.2 = 1.22 at x = 0.2."
    ],
    "remember": "Each new y is the old y plus step size times the gradient at the old point.",
    "a": {
      "q": "dy/dx = 2x + y with y(0) = 3. Use Euler's method with h = 0.5 to find y1 at x = 0.5.",
      "opts": ["4.5", "3.5", "6", "4"],
      "why": "The gradient at (0, 3) is 2 × 0 + 3 = 3. So y1 = 3 + 0.5 × 3 = 4.5. The answer 6 comes from forgetting to multiply the gradient by h, which gives 3 + 3.",
      "clue": "Find the gradient at the starting point first."
    },
    "b": {
      "d": 3,
      "q": "dy/dx = y − x with y(0) = 2. Using Euler's method with h = 0.2, what is the approximate value of y at x = 0.4?",
      "opts": ["2.84", "2.8", "2.88", "2.4"],
      "why": "At (0, 2) the gradient is 2 − 0 = 2, so y1 = 2 + 0.2 × 2 = 2.4 at x = 0.2. At (0.2, 2.4) the gradient is 2.4 − 0.2 = 2.2, so y2 = 2.4 + 0.2 × 2.2 = 2.84. The option 2.8 reuses the old gradient of 2, and 2.88 uses the new y but the old x.",
      "clue": "The second step uses the new x and the new y."
    }
  },
  "mat-velocity-time-graphs": {
    "title": "Velocity-time graphs",
    "card": [
      "A velocity-time graph plots velocity v on the vertical axis against time t. The gradient at a point is the acceleration at that time.",
      "The signed area between the graph and the t-axis is the change in position, called displacement. Area above the axis counts as positive. Area below counts as negative.",
      "Distance travelled adds up all the areas as positive numbers. Displacement keeps the signs.",
      "Example: v = 4 m/s from t = 0 to t = 3, then v = −2 m/s from t = 3 to t = 7. Displacement = 4×3 + (−2)×4 = 12 − 8 = 4 m. Distance = 12 + 8 = 20 m."
    ],
    "remember": "Gradient gives acceleration. Signed area gives displacement.",
    "a": {
      "q": "A particle has v = 5 m/s from t = 0 to t = 2, then v = −3 m/s from t = 2 to t = 6. What is its displacement from t = 0 to t = 6?",
      "opts": ["−2 m", "22 m", "2 m", "10 m"],
      "why": "Displacement = 5×2 + (−3)×4 = 10 − 12 = −2 m. The tempting answer 22 m is the distance, which treats the negative area as positive.",
      "clue": "Area below the t-axis counts as negative."
    },
    "b": {
      "d": 3,
      "q": "Priya's cycle has velocity rising in a straight line from 2 m/s at t = 0 to 10 m/s at t = 4 seconds. What is her acceleration, and how far does she travel in that time?",
      "opts": ["2 m/s², and 24 m", "2 m/s², and 40 m", "2.5 m/s², and 24 m", "2.5 m/s², and 40 m"],
      "why": "Gradient = (10 − 2) ÷ 4 = 2 m/s². The area is a trapezium: ½ × (2 + 10) × 4 = 24 m. The option 40 m uses the final velocity 10 × 4, which ignores that she started at 2 m/s.",
      "clue": "Gradient is rise over run. The area is a trapezium."
    }
  },
  "mat-acceleration-different-forms": {
    "title": "Acceleration in different forms",
    "card": [
      "Acceleration is the rate of change of velocity. When velocity is given in terms of time t, use a = dv/dt.",
      "When velocity is given in terms of position x, use a = v dv/dx. This comes from the chain rule: dv/dt = dv/dx × dx/dt, and dx/dt = v.",
      "The same thing can be written a = d/dx(½v²). Differentiate ½v² with respect to x and you get v dv/dx.",
      "Example: v² = 16 − x². Then ½v² = 8 − ½x², so a = d/dx(8 − ½x²) = −x."
    ],
    "remember": "Use dv/dt when v depends on t. Use v dv/dx or d/dx(½v²) when v depends on x.",
    "a": {
      "q": "A particle has velocity v = 3x at position x. Which gives its acceleration in terms of x?",
      "opts": ["v dv/dx = 9x", "dv/dx = 3", "d/dx(v²) = 18x", "dv/dt = 0"],
      "why": "With v = 3x, dv/dx = 3, so a = v dv/dx = 3x × 3 = 9x. The option dv/dx = 3 is the rate of change of velocity with position, not with time, so it is missing the factor v.",
      "clue": "Velocity here depends on position. Which form suits that?"
    },
    "b": {
      "d": 3,
      "q": "A particle moves so that v² = 25 − 4x². What is its acceleration at position x?",
      "opts": ["−4x", "−8x", "25 − 4x", "−2x"],
      "why": "½v² = 12.5 − 2x², so a = d/dx(12.5 − 2x²) = −4x. The option −8x comes from differentiating v² and forgetting the ½.",
      "clue": "Halve v² first, then differentiate with respect to x."
    }
  },
  "mat-vectors-3d": {
    "title": "Vectors in 3D",
    "card": [
      "The unit vectors i, j and k point along the x, y and z axes. Every 3D vector can be written as a combination, such as a = 2i − 3j + 5k.",
      "The numbers 2, −3 and 5 are the components. They tell you how far the vector goes along each axis.",
      "A vector from point A to point B is AB = OB − OA, where O is the origin. Subtract the position vector of A from that of B, component by component.",
      "The magnitude is |a| = √(x² + y² + z²). For a = 2i − 3j + 5k, |a| = √(4 + 9 + 25) = √38."
    ],
    "remember": "Subtract start from end to find AB. Magnitude is the square root of the sum of squared components.",
    "a": {
      "q": "What is the magnitude of the vector 2i − 6j + 3k?",
      "opts": ["7", "11", "49", "√22"],
      "why": "|a| = √(2² + (−6)² + 3²) = √(4 + 36 + 9) = √49 = 7. Adding the sizes 2 + 6 + 3 gives 11, and doubling each component instead of squaring gives √(4 + 12 + 6) = √22. Forgetting the square root leaves 49.",
      "clue": "Square each component, add, then take the root."
    },
    "b": {
      "d": 3,
      "q": "Point A has position vector i + 2j − k and point B has position vector 4i − j + 3k. What is the vector AB?",
      "opts": ["3i − 3j + 4k", "−3i + 3j − 4k", "5i + j + 2k", "3i − 3j + 2k"],
      "why": "AB = OB − OA = (4 − 1)i + (−1 − 2)j + (3 − (−1))k = 3i − 3j + 4k. The option −3i + 3j − 4k is BA, found by subtracting the wrong way round, and 5i + j + 2k adds the vectors. The option 3i − 3j + 2k comes from the sign slip 3 − 1 for the k part.",
      "clue": "End minus start, and watch the sign on the k part of A."
    }
  },
  "mat-linear-dependence": {
    "title": "Linear dependence",
    "card": [
      "Vectors are linearly dependent if one of them can be built from the others by scaling and adding. Otherwise they are linearly independent.",
      "Two vectors are dependent when one is a scalar multiple of the other, so they are parallel. For example, (1, 2, 3) and (2, 4, 6) are dependent, because the second is 2 times the first.",
      "Three vectors are dependent if one is a combination of the other two, so all three lie in the same plane. Check by trying to write one as a combination of the other two.",
      "In 3D, three independent vectors point in genuinely different directions and do not share a plane. A set of four or more vectors in 3D is always dependent."
    ],
    "remember": "Dependent means one vector is made from the others. Independent vectors each add a new direction.",
    "a": {
      "q": "Which pair of vectors is linearly dependent?",
      "opts": [
        "(1, −2, 3) and (−2, 4, −6)",
        "(1, −2, 3) and (2, 4, 6)",
        "(1, −2, 3) and (−1, −2, 3)",
        "(1, −2, 3) and (3, −2, 1)"
      ],
      "why": "(−2, 4, −6) is −2 times (1, −2, 3), so the two are parallel. In (2, 4, 6) the signs do not match a single multiple, so it is not a multiple of (1, −2, 3), even though the numbers look related.",
      "clue": "Look for one number that scales every component of the first vector."
    },
    "b": {
      "d": 3,
      "q": "Let a = (1, 0, 0), b = (0, 1, 0) and c = (2, 3, 0). Which statement is correct?",
      "opts": [
        "The three are dependent, as c = 2a + 3b",
        "The three are independent, as no two are parallel",
        "The three are independent, as they have three components",
        "The three are dependent, as c is a multiple of a"
      ],
      "why": "c = 2a + 3b, so c is built from a and b and the set is dependent. No two vectors are parallel, but that alone does not make three vectors independent: all three lie in the plane z = 0.",
      "clue": "Try to build c from a and b by scaling and adding."
    }
  },
  "mat-scalar-vector-resolutes": {
    "title": "Scalar and vector resolutes",
    "card": [
      [
        "Scalar resolute",
        "The scalar resolute of a in the direction of b is a·b ÷ |b|. It is a number: the signed length of a along b. It is negative if a points against b."
      ],
      [
        "Vector resolute",
        "The vector resolute of a parallel to b is (a·b ÷ |b|²) b. It is a vector along b. Its length is the size of the scalar resolute."
      ],
      "The part of a perpendicular to b is a − (the vector resolute). Its scalar product with b is 0.",
      "Example: a = 2i + 3j + 6k, b = i + 2j + 2k. Then a·b = 20 and |b| = 3. The scalar resolute is 20/3. The vector resolute is (20/9)(i + 2j + 2k)."
    ],
    "remember": "The scalar resolute is a signed length along b. The vector resolute is that signed length times the unit vector of b.",
    "a": {
      "q": "What is the scalar resolute of a = 3i + 2j + 2k in the direction of b = 2i + j + 2k?",
      "opts": ["4", "12", "4/3", "12/√17"],
      "why": "a·b = 6 + 2 + 4 = 12 and |b| = √(4 + 1 + 4) = 3, so the scalar resolute is 12 ÷ 3 = 4. Dividing by |b|² gives 4/3, which is the mistake of using the vector resolute's divisor.",
      "clue": "Divide a·b by the length of b, the vector you project onto."
    },
    "b": {
      "d": 3,
      "q": "What is the vector resolute of a = i + 4j + 3k parallel to b = 2i − j + 2k?",
      "opts": ["(8/9)i − (4/9)j + (8/9)k", "(8/3)i − (4/3)j + (8/3)k", "8i − 4j + 8k", "(1/9)i + (40/9)j + (19/9)k"],
      "why": "a·b = 2 − 4 + 6 = 4 and |b|² = 9, so the vector resolute is (4/9)(2i − j + 2k) = (8/9)i − (4/9)j + (8/9)k. Dividing by |b| instead of |b|² gives (8/3)i − (4/3)j + (8/3)k. The answer (1/9)i + (40/9)j + (19/9)k is the perpendicular part, a minus the resolute.",
      "clue": "Divide by |b|², not |b|, then multiply by b."
    }
  },
  "mat-vector-product": {
    "title": "The vector product",
    "card": [
      "The vector product a × b is a vector, not a number. It is perpendicular to both a and b, and its direction follows the right-hand rule.",
      "For a = (a1, a2, a3) and b = (b1, b2, b3): a × b = (a2b3 − a3b2, a3b1 − a1b3, a1b2 − a2b1).",
      "The size |a × b| equals the area of the parallelogram with sides a and b. The area of the triangle they form is half of that. If a × b = 0, the vectors are parallel.",
      "Example: a = (1, 2, 0) and b = (0, 3, 4). a × b = (2×4 − 0×3, 0×0 − 1×4, 1×3 − 2×0) = (8, −4, 3)."
    ],
    "remember": "a × b is a vector perpendicular to a and b. Its size is the parallelogram's area.",
    "a": {
      "q": "What is a × b for a = (1, 0, 2) and b = (3, 1, 0)?",
      "opts": ["(−2, 6, 1)", "(2, −6, −1)", "(−2, 6, −1)", "(2, 6, 1)"],
      "why": "First: 0×0 − 2×1 = −2. Second: 2×3 − 1×0 = 6. Third: 1×1 − 0×3 = 1. So a × b = (−2, 6, 1). The option (2, −6, −1) is b × a, which has the order reversed.",
      "clue": "Work out each component using the pattern on the card, in the order a then b."
    },
    "b": {
      "d": 3,
      "q": "Vectors p = (2, 0, 0) and q = (0, 3, 0) are two sides of a triangle. What is the area of the triangle?",
      "opts": ["3 square units", "6 square units", "9 square units", "12 square units"],
      "why": "p × q = (0×0 − 0×3, 0×0 − 2×0, 2×3 − 0×0) = (0, 0, 6), so |p × q| = 6, the parallelogram's area. The triangle is half of that, which is 3. The option 6 is the parallelogram's area, not the triangle's.",
      "clue": "The size of the product gives a parallelogram. A triangle is a fraction of it."
    }
  },
  "mat-angles-distances-3d": {
    "title": "Angles between vectors",
    "card": [
      "The scalar product of a = a1i + a2j + a3k and b = b1i + b2j + b3k is a·b = a1b1 + a2b2 + a3b3. It is also a·b = |a||b| cos θ, where θ is the angle between them.",
      "Put the two together: cos θ = (a·b) ÷ (|a||b|). Find the scalar product, find both lengths, divide, then use inverse cosine.",
      "If a·b = 0, then cos θ = 0, so θ = 90°. Two non-zero vectors with a·b = 0 are perpendicular.",
      "Example: a = i + 2j + 2k and b = 2i − j + 2k. a·b = 2 − 2 + 4 = 4. |a| = 3 and |b| = 3. So cos θ = 4/9 and θ ≈ 63.6°."
    ],
    "remember": "cos θ = a·b ÷ (|a||b|), and a·b = 0 means the vectors are perpendicular.",
    "a": {
      "q": "For a = 2i + j − k and b = i − 3j + k, what does a·b show?",
      "opts": [
        "a·b = −2, so the angle is obtuse",
        "a·b = 2, so the angle is acute",
        "a·b = 0, so they are perpendicular",
        "a·b = −2, so the angle is acute"
      ],
      "why": "a·b = 2 × 1 + 1 × (−3) + (−1) × 1 = 2 − 3 − 1 = −2. Since |a| and |b| are positive, cos θ is negative, so θ is obtuse. A negative scalar product does not mean an acute angle.",
      "clue": "Multiply matching components, then add them."
    },
    "b": {
      "d": 3,
      "q": "For which value of m are p = 2i + mj + k and q = i − 2j + 4k perpendicular?",
      "opts": ["m = 3", "m = −3", "m = 1", "m = 6"],
      "why": "p·q = 2 − 2m + 4 = 6 − 2m. Perpendicular means p·q = 0, so m = 3. Checking: 2 − 6 + 4 = 0. The value m = −3 comes from a sign slip, as it gives 6 + 6 = 12.",
      "clue": "Set the scalar product equal to zero and solve for m."
    }
  },
  "mat-vector-proofs-unit-3": {
    "title": "Vector proofs",
    "card": [
      "To prove a geometry result, write the sides as vectors. Name two sides from one corner, such as a and b, then write every other side or diagonal using a and b.",
      "Two non-zero vectors are perpendicular when their scalar product is 0. So to prove two lines are perpendicular, show that the scalar product of their vectors is 0.",
      "Worked example: a rhombus OABC has OA = a and OC = b, with |a| = |b| because all sides are equal. The diagonals are OB = a + b and AC = b − a.",
      "Then (a + b)·(b − a) = b·b − a·a = |b|² − |a|² = 0. So the diagonals are perpendicular."
    ],
    "remember": "Write the shape in terms of a and b, then show the scalar product is 0.",
    "a": {
      "q": "To prove that two diagonals of a shape are perpendicular, what must you show about their vectors?",
      "opts": [
        "Their scalar product is 0",
        "Their scalar product is 1",
        "Their vector sum is the zero vector",
        "They have equal magnitudes"
      ],
      "why": "Non-zero vectors are perpendicular exactly when their scalar product is 0. Equal magnitudes do not make lines perpendicular: the diagonals of a rectangle are equal in length but are not usually perpendicular.",
      "clue": "Think of the test for perpendicular vectors."
    },
    "b": {
      "d": 3,
      "q": "In a rhombus, OA = a, OC = b and |a| = |b|. Which step gives (a + b)·(b − a) = 0?",
      "opts": [
        "It expands to |b|² − |a|², and the sides are equal",
        "It expands to |a|² − |b|², and the sides are equal",
        "It expands to |a|² + |b|², and the sides are equal",
        "It expands to a·b − a·b, and the sides are parallel"
      ],
      "why": "Expanding gives a·b − a·a + b·b − b·a. The a·b terms cancel, leaving |b|² − |a|². Equal side lengths make this 0. The option with a plus sign is wrong because the a·a term is subtracted, not added.",
      "clue": "The two a·b terms cancel, so check which squares are left and their signs."
    }
  },
  "mat-vector-equation-line": {
    "title": "Vector equation of a line",
    "card": [
      "A line in space is set by one point on it and a direction. The vector equation is r = a + tb.",
      ["a", "the position vector of a known point on the line."],
      [
        "b",
        "a direction vector, parallel to the line. For points A and B on the line, b = B − A works. Any non-zero multiple of b gives the same direction."
      ],
      ["t", "a real number that can be positive, negative or zero. Each value of t gives one point on the line."]
    ],
    "remember": "Start at a, then move any number t of steps along b.",
    "a": {
      "q": "A line has the equation r = (3i − j + 2k) + t(i + 4j − k). Which point is on the line when t = 2?",
      "opts": ["(5, 7, 0)", "(4, 3, 1)", "(5, 9, 0)", "(6, −2, 4)"],
      "why": "When t = 2, r = (3i − j + 2k) + 2(i + 4j − k) = 5i + 7j + 0k, so the point is (5, 7, 0). The point (4, 3, 1) is where t = 1, and (5, 9, 0) comes from reading −j in a as +j.",
      "clue": "Multiply every part of b by 2, then add a."
    },
    "b": {
      "d": 3,
      "q": "Which is a vector equation of the line through A(1, 2, 0) and B(4, 6, 12)?",
      "opts": [
        "r = (i + 2j) + t(3i + 4j + 12k)",
        "r = (i + 2j) + t(4i + 6j + 12k)",
        "r = (4i + 6j + 12k) + t(i + 2j)",
        "r = (i + 2j) + t(5i + 8j + 12k)"
      ],
      "why": "The direction is B − A = (3, 4, 12), and A is a point on the line. Using the position vector of B as the direction is tempting, but (4, 6, 12) is not a multiple of (3, 4, 12), so it is not parallel to the line.",
      "clue": "Find the direction by subtracting one point from the other."
    }
  },
  "mat-vector-cartesian-equations-plane": {
    "title": "Equations of a plane",
    "card": [
      "A normal vector n is perpendicular to every direction lying in the plane. A plane is set by one point P on it, with position vector p, and a normal vector n.",
      "A point R with position vector r is on the plane when (r − p) · n = 0. This gives the vector equation r · n = p · n.",
      "Writing r = (x, y, z) and n = (a, b, c) gives the Cartesian equation ax + by + cz = d. The coefficients a, b, c are the parts of the normal, and d = p · n, found by putting in the known point.",
      "Example: the plane through P(1, 2, 3) with normal n = (2, −1, 4). Then d = 2×1 − 1×2 + 4×3 = 12, so the plane is 2x − y + 4z = 12."
    ],
    "remember": "The coefficients of x, y and z are the normal vector. Put in a known point to find d.",
    "a": {
      "q": "Which vector is a normal to the plane 3x − 2y + 5z = 7?",
      "opts": ["(3, −2, 5)", "(3, 2, 5)", "(−3, −2, 5)", "(3, −2, 7)"],
      "why": "The coefficients of x, y and z give the normal, so n = (3, −2, 5). The option (3, −2, 7) wrongly uses the constant 7, which is d and not part of the normal.",
      "clue": "Read the numbers in front of x, y and z, with their signs."
    },
    "b": {
      "d": 3,
      "q": "A plane passes through P(2, 1, −1) and has normal vector n = (1, 3, 2). What is its Cartesian equation?",
      "opts": ["x + 3y + 2z = 3", "x + 3y + 2z = 7", "x + 3y + 2z = 1", "x + 3y + 2z = −3"],
      "why": "d = p · n = 1×2 + 3×1 + 2×(−1) = 2 + 3 − 2 = 3, so the plane is x + 3y + 2z = 3. Choosing 7 comes from treating −1 as +1 and adding 2 + 3 + 2.",
      "clue": "Find d by taking the dot product of the point with the normal."
    }
  },
  "mat-vector-calculus": {
    "title": "Vector calculus",
    "card": [
      "A position vector r(t) gives where a particle is at time t. Write r(t) = x(t) i + y(t) j, with one component for each direction.",
      [
        "Velocity",
        "the derivative of position, v(t) = r'(t). Differentiate each component separately and keep the i and j parts."
      ],
      [
        "Acceleration",
        "the derivative of velocity, a(t) = v'(t) = r''(t). Differentiate the velocity components once more."
      ],
      "Example: r(t) = 3t² i + (2t − 1) j. Then v(t) = 6t i + 2 j, and a(t) = 6 i + 0 j. At t = 2, v = 12 i + 2 j."
    ],
    "remember": "Differentiate each component of r to get v, and again to get a.",
    "a": {
      "q": "A particle has position r(t) = 4t³ i + t² j. What is its velocity v(t)?",
      "opts": ["12t² i + 2t j", "12t² i + 2t", "4t³ i + 2t j", "24t i + 2 j"],
      "why": "Differentiate each component: 4t³ becomes 12t² and t² becomes 2t, so v = 12t² i + 2t j. The option 24t i + 2 j is the acceleration, found by differentiating twice.",
      "clue": "Differentiate once, and do it to each component."
    },
    "b": {
      "d": 3,
      "q": "A drone has position r(t) = (t³ − 3t) i + 5t² j. What is its acceleration at t = 2?",
      "opts": ["12 i + 10 j", "9 i + 20 j", "12 i + 20 j", "6 i + 10 j"],
      "why": "v(t) = (3t² − 3) i + 10t j, so a(t) = 6t i + 10 j. At t = 2, a = 12 i + 10 j. The option 9 i + 20 j is the velocity at t = 2, which comes from differentiating only once.",
      "clue": "Differentiate twice, then substitute t = 2 at the end."
    }
  },
  "mat-paths-particles": {
    "title": "Paths of particles",
    "card": [
      "A position vector r(t) = x(t)i + y(t)j gives a particle's position at time t. To find the Cartesian equation of its path, eliminate t.",
      "For r(t) = 3cos(t)i + 2sin(t)j, cos(t) = x/3 and sin(t) = y/2. Since cos²(t) + sin²(t) = 1, the path is the ellipse x²/9 + y²/4 = 1. Equal multipliers give a circle: 5cos(t)i + 5sin(t)j gives x² + y² = 25.",
      "Two particles collide only if they are at the same point at the same time. Set the i components equal and the j components equal, then check that one value of t satisfies both.",
      "Paths can cross without a collision. Solve the two Cartesian equations together to find where the paths meet, then find when each particle is there. Different times means no collision."
    ],
    "remember": "A path comes from eliminating t. A collision needs the same point at the same time.",
    "a": {
      "q": "A particle has position r(t) = 4cos(t)i + 3sin(t)j. What is the Cartesian equation of its path?",
      "opts": ["x²/16 + y²/9 = 1", "x²/4 + y²/3 = 1", "x²/9 + y²/16 = 1", "x² + y² = 25"],
      "why": "Since cos(t) = x/4 and sin(t) = y/3, using cos²(t) + sin²(t) = 1 gives x²/16 + y²/9 = 1. The option x²/4 + y²/3 = 1 forgets to square the 4 and the 3.",
      "clue": "Divide each component by its multiplier, then square."
    },
    "b": {
      "d": 3,
      "q": "Particle A has r(t) = ti + 2tj and particle B has r(t) = (6 − t)i + tj, for t ≥ 0. Which statement is correct?",
      "opts": [
        "They pass through (2, 4) at different times",
        "They collide at (2, 4) when t = 2",
        "They collide when t = 3",
        "Their paths never cross each other"
      ],
      "why": "Equal i components give t = 3, but equal j components give t = 0, so no single t works and there is no collision. The paths are y = 2x and y = 6 − x, which meet at (2, 4). A is there at t = 2, but B is there at t = 4, since at t = 2 B is at (4, 2).",
      "clue": "Find where the paths meet, then when each particle gets there."
    }
  },
  "mat-projectile-motion-with-vectors": {
    "title": "Projectile motion with vectors",
    "card": [
      "A projectile moves under gravity alone. Take i as horizontal and j as vertical (up), and ignore air resistance. Then acceleration is a = −g j, with g = 9.8 m/s².",
      "Horizontal motion has no acceleration, so the horizontal velocity stays constant. Vertical velocity changes at a steady rate of −g.",
      "For a launch from the origin with speed u at angle θ above the horizontal: r(t) = (u cos θ)t i + ((u sin θ)t − 4.9t²) j.",
      "Example: a ball leaves the origin with velocity 12i + 20j m/s. Then r(t) = 12t i + (20t − 4.9t²) j. It lands when the j part is 0 again: 20t − 4.9t² = 0, so t = 20/4.9 ≈ 4.08 s."
    ],
    "remember": "Horizontal: constant velocity. Vertical: constant acceleration of −g.",
    "a": {
      "q": "A projectile is launched from the origin with velocity 15i + 10j m/s. Which is its position vector at time t seconds, in metres?",
      "opts": ["15t i + (10t − 4.9t²) j", "15t i + (10t − 9.8t²) j", "(15t − 4.9t²) i + 10t j", "15t i + (10 − 4.9t²) j"],
      "why": "Horizontal velocity is constant, so the i part is 15t. The j part is 10t − ½gt² = 10t − 4.9t². Using 9.8t² forgets the half that comes from integrating the acceleration twice.",
      "clue": "Gravity acts only on the j part, and the half matters."
    },
    "b": {
      "d": 3,
      "q": "A ball is thrown from the origin with velocity 8i + 14.7j m/s. How far horizontally has it travelled when it returns to j = 0?",
      "opts": ["24 m", "12 m", "48 m", "3 m"],
      "why": "The j part is 14.7t − 4.9t² = 4.9t(3 − t), so it returns to 0 at t = 3 s. Horizontal distance is 8 × 3 = 24 m. Using t = 1.5 s, the time to the top, gives 12 m, which is only halfway.",
      "clue": "Find t when the j part is zero again, then use the i part."
    }
  },
  "mat-linear-combinations-random-variables": {
    "title": "Linear combinations of random variables",
    "card": [
      "A linear combination of X and Y is aX + bY, where a and b are constants. For example, 2X + 3Y or X − Y.",
      ["Mean", "E(aX + bY) = aE(X) + bE(Y). This holds whether or not X and Y are independent."],
      [
        "Variance",
        "If X and Y are independent, Var(aX + bY) = a²Var(X) + b²Var(Y). The constants are squared, so a minus sign becomes plus: Var(X − Y) = Var(X) + Var(Y)."
      ],
      [
        "Example",
        "E(X) = 10, Var(X) = 4, E(Y) = 6, Var(Y) = 9, X and Y independent. Then E(2X − Y) = 20 − 6 = 14 and Var(2X − Y) = 4×4 + 1×9 = 25."
      ]
    ],
    "remember": "Means combine with a and b. For independent variables, variances combine with a² and b².",
    "a": {
      "q": "X and Y are independent, with Var(X) = 5 and Var(Y) = 3. What is Var(X − Y)?",
      "opts": ["8", "2", "−2", "16"],
      "why": "For independent variables, Var(X − Y) = (1)²×5 + (−1)²×3 = 8. The tempting answer 2 comes from subtracting the variances, but the constant −1 is squared, so it becomes +1.",
      "clue": "Square each constant before you use it."
    },
    "b": {
      "d": 3,
      "q": "X and Y are independent, with E(X) = 4, Var(X) = 2, E(Y) = 5 and Var(Y) = 6. What is Var(3X − 2Y)?",
      "opts": ["42", "−6", "18", "2"],
      "why": "Var(3X − 2Y) = 3²×2 + (−2)²×6 = 18 + 24 = 42. The answer 18 comes from not squaring the constants (3×2 + 2×6), and −6 comes from squaring but then subtracting (18 − 24). The answer 2 is E(3X − 2Y) = 12 − 10, the mean, not the variance.",
      "clue": "Square 3 and −2, then add the two parts."
    }
  },
  "mat-distribution-sample-means": {
    "title": "The distribution of sample means",
    "card": [
      "Take many random samples of size n from a population with mean μ and standard deviation σ. Each sample has its own mean, written x̄. These sample means form a distribution.",
      "The mean of the sample means is μ. Their standard deviation is σ/√n. A bigger sample gives a smaller spread, because √n is larger.",
      "If the population is normal, x̄ is normal for any n. If not, x̄ is roughly normal when n is large. This is the central limit theorem.",
      "Example: σ = 12 and n = 36. Then σ/√n = 12 ÷ 6 = 2. The sample means have a standard deviation of 2."
    ],
    "remember": "Sample means centre on μ, with spread σ/√n. Larger samples spread less.",
    "a": {
      "q": "A population has mean 50 and standard deviation 20. Samples of size 25 are taken. What is the standard deviation of the sample means?",
      "opts": ["4", "20", "0.8", "100"],
      "why": "The standard deviation is σ/√n = 20 ÷ √25 = 20 ÷ 5 = 4. Using 20 ignores the sample size, which is a common mistake. That is the spread of single values, not of sample means.",
      "clue": "Divide σ by the square root of n, not by n."
    },
    "b": {
      "d": 3,
      "q": "Machine parts have a mean length of 80 mm and a standard deviation of 6 mm. Sample size is increased from 9 to 36. What happens to the standard deviation of the sample means?",
      "opts": [
        "It halves, from 2 mm to 1 mm",
        "It falls to a quarter, from 2 mm to 0.5 mm",
        "It stays at 6 mm, as σ does not change",
        "It halves, from 6 mm to 3 mm"
      ],
      "why": "For n = 9, 6/√9 = 2. For n = 36, 6/√36 = 1. Sample size rose by a factor of 4, so the spread falls by a factor of √4 = 2, not 4. The population σ stays at 6, but it is not the spread of sample means.",
      "clue": "Work out σ/√n for both sample sizes and compare."
    }
  },
  "mat-confidence-intervals-mean": {
    "title": "Confidence intervals for a mean",
    "card": [
      "An approximate 95% confidence interval for the population mean μ is x̄ ± 1.96 × σ/√n. Here x̄ is the sample mean, σ is the population standard deviation and n is the sample size.",
      "Example: x̄ = 50, σ = 10, n = 100. Then σ/√n = 10/10 = 1, so the margin is 1.96 × 1 = 1.96. The interval is 48.04 to 51.96.",
      "The 95% describes the method. If we took many samples and built an interval from each, about 95% of those intervals would contain μ.",
      "A larger n gives a smaller margin, because n is under a square root. Four times the sample size halves the margin."
    ],
    "remember": "Interval = sample mean ± 1.96 × σ/√n. A bigger sample gives a narrower interval.",
    "a": {
      "q": "Mia weighs 64 packets of rice and finds a mean of 200 g. The population standard deviation is 16 g. What is the approximate 95% interval for μ?",
      "opts": ["196.08 g to 203.92 g", "168.64 g to 231.36 g", "199.51 g to 200.49 g", "198.00 g to 202.00 g"],
      "why": "σ/√n = 16/8 = 2, so the margin is 1.96 × 2 = 3.92. The interval is 200 ± 3.92. The wide interval 168.64 to 231.36 comes from forgetting to divide by √n.",
      "clue": "Divide σ by the square root of 64 before multiplying."
    },
    "b": {
      "d": 3,
      "q": "A 95% interval for a mean has a margin of 4.0 from a sample of 25. A new sample of 100 is taken from the same population, with the same σ. What is the approximate new margin?",
      "opts": ["About 2.0", "About 1.0", "About 4.0", "About 8.0"],
      "why": "The sample size is four times larger and √4 = 2, so the margin is halved to about 2.0. A margin of 1.0 comes from dividing by 4 instead of by √4.",
      "clue": "The margin changes with √n, not with n."
    }
  },
  "mat-hypothesis-testing": {
    "title": "Hypothesis testing",
    "card": [
      [
        "Null hypothesis",
        "H₀ is the claim we test, usually that nothing has changed. For a mean, it looks like H₀: μ = 50."
      ],
      [
        "Alternative",
        "H₁ is what we suspect instead, such as H₁: μ ≠ 50 or H₁: μ > 50. It is written before looking at the sample."
      ],
      "Assume H₀ is true. Then ask how unlikely the sample result would be. A result very unlikely under H₀ is evidence against it.",
      "Example: a machine should fill bags with a mean of 50 g. A sample mean of 47 g is far below 50 for the sample size, so it would be unlikely if H₀ were true. That counts against H₀."
    ],
    "remember": "Assume the null is true, then ask how unlikely the sample result would be.",
    "a": {
      "q": "What is the test of a hypothesis based on?",
      "opts": [
        "How unlikely the sample result is if H₀ is true",
        "How unlikely the sample result is if H₁ is true",
        "Whether the sample mean equals the claimed mean",
        "How large the sample is compared with the population"
      ],
      "why": "The test assumes H₀ is true and asks how unlikely the sample result would be. The sample mean will rarely equal the claimed mean exactly, so equality is not the test.",
      "clue": "Which hypothesis do we assume is true while testing?"
    },
    "b": {
      "d": 2,
      "q": "A bakery claims its loaves have a mean mass of 700 g. Mia suspects they are lighter. Which pair of hypotheses should she use?",
      "opts": [
        "H₀: μ = 700 and H₁: μ < 700",
        "H₀: μ < 700 and H₁: μ = 700",
        "H₀: μ = 700 and H₁: μ > 700",
        "H₀: μ ≠ 700 and H₁: μ = 700"
      ],
      "why": "The null is the claim being tested, μ = 700. Mia suspects the loaves are lighter, so the alternative is μ < 700. Using μ > 700 would test for heavier loaves.",
      "clue": "The null is the bakery's claim. The alternative is Mia's suspicion."
    }
  },
  "mat-p-values-significance": {
    "title": "p-values and significance",
    "card": [
      [
        "p-value",
        "The p-value is the probability of a sample result at least as extreme as the one observed, if H₀ is true."
      ],
      ["Significance level", "The significance level, α, is chosen before the test. A common choice is 0.05."],
      "If p < α, reject H₀. There is evidence for H₁. If p > α, do not reject H₀. The evidence is not strong enough.",
      "Example: with α = 0.05, a p-value of 0.03 gives evidence to reject H₀. A p-value of 0.20 does not."
    ],
    "remember": "A p-value below the significance level is evidence to reject H₀.",
    "a": {
      "q": "A test has α = 0.05 and gives a p-value of 0.02. What is the conclusion?",
      "opts": [
        "Reject H₀, as 0.02 is less than 0.05",
        "Do not reject H₀, as 0.02 is a small value",
        "Reject H₁, as 0.02 is less than 0.05",
        "Do not reject H₀, as 0.02 is not equal to 0.05"
      ],
      "why": "The p-value 0.02 is below α = 0.05, so there is evidence to reject H₀. A small p-value is a reason to reject H₀, not to keep it.",
      "clue": "Compare the p-value with α. Which is smaller?"
    },
    "b": {
      "d": 3,
      "q": "Sam tests a new fertiliser at α = 0.01 and gets p = 0.03. What is the correct conclusion?",
      "opts": [
        "Do not reject H₀, as 0.03 is greater than 0.01",
        "Reject H₀, as 0.03 is less than 0.05",
        "Reject H₀, as 0.03 is a small probability",
        "Do not reject H₀, as 0.03 is less than 0.05"
      ],
      "why": "The level here is 0.01, not 0.05. Since 0.03 is above 0.01, the evidence is not strong enough to reject H₀. Using 0.05 would give the wrong conclusion.",
      "clue": "Use the α given in the question, not the usual one."
    }
  },
  "mat-one-tail-two-tail": {
    "title": "One-tail and two-tail tests",
    "card": [
      [
        "One-tail test",
        "The alternative hypothesis names one direction only: H₁: μ > 50 or H₁: μ < 50. Use it when the question asks about an increase only, or a decrease only."
      ],
      [
        "Two-tail test",
        "The alternative hypothesis allows a change either way: H₁: μ ≠ 50. Use it when the question asks whether the mean has changed, with no direction given."
      ],
      "A one-tail test counts extreme results only in the tail named by H₁. A two-tail test counts results far from the null mean in either direction, so its p-value uses both tails.",
      "For a symmetric distribution such as the normal, when the sample result lies on the side named in H₁, the two-tail p-value is double the one-tail p-value. Example: if P(Z > 1.5) = 0.067, the two-tail p-value is 2 × 0.067 = 0.134."
    ],
    "remember": "The wording of H₁ sets the tails. One tail looks one way, two tails look both ways.",
    "a": {
      "q": "A tyre maker claims its tyres last 40 000 km on average. A tester wants to know if the mean differs from this. Which H₁ is used?",
      "opts": [
        "μ ≠ 40 000, a two-tail test",
        "μ < 40 000, a one-tail test",
        "μ > 40 000, a one-tail test",
        "μ = 40 000, a two-tail test"
      ],
      "why": "The tester asks if the mean differs, with no direction given, so the alternative allows a change either way: μ ≠ 40 000. The option μ = 40 000 is wrong because it is the null hypothesis, not the alternative.",
      "clue": "No direction is mentioned in the question."
    },
    "b": {
      "d": 3,
      "q": "A test of H₀: μ = 12 against H₁: μ > 12 uses a normal distribution and gives a one-tail p-value of 0.03. The same data is used for H₁: μ ≠ 12. What is the two-tail p-value?",
      "opts": ["0.06", "0.03", "0.015", "0.97"],
      "why": "A one-tail p-value of 0.03 means the sample mean lies above 12, on the side named in H₁. The normal is symmetric, so counting both tails doubles it: 2 × 0.03 = 0.06. Halving to 0.015 goes the wrong way, because two tails hold more probability than one.",
      "clue": "A two-tail test counts extreme results in both directions."
    }
  },
  "mat-type-i-type-ii": {
    "title": "Type I and type II errors",
    "card": [
      "A test ends in one of two decisions: reject the null hypothesis (H₀) or do not reject it. Either decision can be wrong, because a sample can mislead.",
      [
        "Type I error",
        "rejecting a null hypothesis that is true. The test claims an effect that is not really there."
      ],
      [
        "Type II error",
        "failing to reject a null hypothesis that is false. The test misses an effect that is really there."
      ],
      "Example: H₀ says a new battery lasts the same time as the old one. If the batteries are really the same but the test says they differ, that is a type I error. If the new battery really lasts longer but the test finds no difference, that is a type II error."
    ],
    "remember": "Type I: reject a true H₀. Type II: fail to reject a false H₀.",
    "a": {
      "q": "Which situation describes a type II error?",
      "opts": [
        "Not rejecting H₀ when H₀ is false",
        "Rejecting H₀ when H₀ is true",
        "Not rejecting H₀ when H₀ is true",
        "Rejecting H₀ when H₀ is false"
      ],
      "why": "A type II error is a failure to reject a null hypothesis that is actually false, so a real effect is missed. Rejecting a true H₀ is the tempting option, but that is a type I error.",
      "clue": "Type II means the test missed something real."
    },
    "b": {
      "d": 3,
      "q": "Mia tests H₀: a bakery's loaves have mean mass 700 g. The loaves really do have a mean mass below 700 g, but her sample leads her not to reject H₀. What has happened?",
      "opts": [
        "A type II error, because a false H₀ was not rejected",
        "A type I error, because a false H₀ was not rejected",
        "A type II error, because a true H₀ was not rejected",
        "A type I error, because a true H₀ was wrongly rejected"
      ],
      "why": "The true mean is below 700 g, so H₀ is false. Mia did not reject it, which is a type II error. A type I error needs a true H₀ to be rejected, and that did not happen here.",
      "clue": "First decide whether H₀ is true, then whether Mia rejected it."
    }
  },
  "mat-vertices-edges-degree": {
    "title": "Vertices, edges and degree",
    "card": [
      ["Vertex", "a point on a graph, drawn as a dot. It can stand for a place, a person or a team."],
      ["Edge", "a line joining two vertices. It can stand for a road, a friendship or a game between two teams."],
      [
        "Degree",
        "the number of edges that meet a vertex. With edges AB, AC, AD and BC, vertex A has degree 3 and D has degree 1."
      ],
      "Each edge adds 1 to the degree at each of its two ends. So the degrees of all the vertices add up to twice the number of edges."
    ],
    "remember": "Degree counts the edges at one vertex. All the degrees together make twice the number of edges.",
    "a": {
      "q": "A graph has vertices P, Q, R, S and T, with edges PQ, QR, QS, RS and ST. What is the degree of vertex S?",
      "opts": ["3", "2", "5", "4"],
      "why": "The edges that meet S are QS, RS and ST, so its degree is 3. The answer 5 is the number of edges in the whole graph, not the edges at S.",
      "clue": "List only the edges that include the letter S."
    },
    "b": {
      "d": 3,
      "q": "A network of 6 towns has roads joining them. The towns have degrees 4, 3, 3, 2, 2 and 2. How many roads are in the network?",
      "opts": ["8", "16", "6", "32"],
      "why": "The degrees add to 4 + 3 + 3 + 2 + 2 + 2 = 16. Each road adds 1 to the degree at both of its ends, so it is counted twice: 16 ÷ 2 = 8 roads. The answer 16 forgets to halve.",
      "clue": "Each road is counted once at each end."
    }
  },
  "mat-types-graphs-adjacency-matrix": {
    "title": "Types of graphs and the adjacency matrix",
    "card": [
      [
        "Connected",
        "a graph where you can get from any vertex to any other by following edges. If one vertex is cut off, the graph is not connected."
      ],
      [
        "Loops and multiple edges",
        "a loop is an edge that starts and ends at the same vertex. Multiple edges are two or more edges joining the same pair of vertices."
      ],
      [
        "Isomorphic",
        "two graphs are isomorphic if they have the same structure: the same number of vertices and the same connections, even if they are drawn differently."
      ],
      [
        "Adjacency matrix",
        "a square table with one row and one column for each vertex. The entry is the number of edges joining the row vertex to the column vertex. A loop counts as 1 in this course. Example: if A and B are joined by 2 edges, both the A-B and B-A entries are 2."
      ]
    ],
    "remember": "An adjacency matrix counts the edges between each pair of vertices, and it is the same either side of the diagonal.",
    "a": {
      "q": "A graph has vertices A, B and C. A and B are joined by one edge, and B and C are joined by two edges. What is the entry in row C, column B of its adjacency matrix?",
      "opts": ["2", "1", "0", "3"],
      "why": "Row C, column B counts the edges joining C and B, which is 2. The answer 1 comes from counting the A-B edge or from treating multiple edges as one connection.",
      "clue": "Count every edge between C and B."
    },
    "b": {
      "d": 3,
      "q": "Mia draws a graph with 4 vertices. Vertex P has a loop and one edge to Q. Q has one edge to R. R has one edge to S. What is the sum of all the entries in its adjacency matrix?",
      "opts": ["7", "6", "8", "4"],
      "why": "Each of the 3 edges between different vertices appears twice in the matrix, giving 6. The loop is entered once, as 1, so the total is 7. Answering 6 forgets the loop, and 8 counts the loop twice.",
      "clue": "Edges between two vertices appear on both sides of the diagonal."
    }
  },
  "mat-planar-graphs-euler-s": {
    "title": "Planar graphs and Euler's formula",
    "card": [
      "A graph is planar if it can be drawn on a flat page with no edges crossing. Edges may only meet at vertices.",
      "A planar graph divides the page into regions called faces. The area outside the graph also counts as one face.",
      "For a connected planar graph, v − e + f = 2. Here v is the number of vertices, e the number of edges and f the number of faces.",
      "Example: a triangle has v = 3 and e = 3. Its faces are the inside and the outside, so f = 2. Check: 3 − 3 + 2 = 2."
    ],
    "remember": "For a connected planar graph, vertices − edges + faces = 2, and the outside counts as a face.",
    "a": {
      "q": "A connected planar graph has 6 vertices and 9 edges. How many faces does it have?",
      "opts": ["5", "3", "1", "17"],
      "why": "v − e + f = 2, so 6 − 9 + f = 2. This gives f − 3 = 2, so f = 5. Choosing 3 comes from working out 9 − 6 and leaving out the 2 on the right side.",
      "clue": "Put v and e into v − e + f = 2, then solve for f."
    },
    "b": {
      "d": 3,
      "q": "A connected planar graph has 8 faces and 12 edges. How many vertices does it have?",
      "opts": ["6", "18", "2", "8"],
      "why": "v − e + f = 2, so v − 12 + 8 = 2. This gives v − 4 = 2, so v = 6. Choosing 18 comes from writing v = e + f − 2, which mixes up the signs of e and f: 12 + 8 − 2 = 18.",
      "clue": "Write the formula with e = 12 and f = 8, then find v."
    }
  },
  "mat-walks-trails-paths-circuits": {
    "title": "Walks, trails, paths and circuits",
    "card": [
      ["Walk", "any route along edges from one vertex to another. It may repeat edges and vertices."],
      ["Trail", "a walk that repeats no edge. It may pass through the same vertex more than once."],
      ["Path", "a walk that repeats no vertex. This means it repeats no edge either."],
      [
        "Circuit and cycle",
        "a circuit is a trail that starts and ends at the same vertex. A cycle is a circuit that repeats no vertex, except the start and end."
      ]
    ],
    "remember": "Trail: no repeated edge. Path: no repeated vertex. Circuit and cycle: end where they began.",
    "a": {
      "q": "A route on a graph goes A-B-C-B-D. It uses edges AB, BC, CB and BD, with BC and CB being the same edge. What is the best name for it?",
      "opts": [
        "A walk only, as an edge is repeated",
        "A trail, as no vertex is repeated",
        "A path, as it ends at a new vertex",
        "A circuit, as it passes through B twice"
      ],
      "why": "The edge between B and C is used twice, so the route is not a trail or a path. It is a walk only. A circuit needs to end where it began, and this route starts at A and ends at D.",
      "clue": "Check whether any edge is used twice."
    },
    "b": {
      "d": 3,
      "q": "In a graph, Priya travels P-Q-R-S-Q-T using each edge once only. Which description is correct?",
      "opts": [
        "A trail, but not a path",
        "A path, but not a trail",
        "A circuit, as it passes Q twice",
        "A cycle, as no edge is repeated"
      ],
      "why": "No edge is repeated, so it is a trail. Vertex Q is visited twice, so it is not a path. It is not a circuit or cycle, as it starts at P and ends at T. Not repeating an edge does not make it a cycle.",
      "clue": "Look for a repeated vertex, then check where the route starts and ends."
    }
  },
  "mat-trees-minimum-spanning-trees": {
    "title": "Trees and minimum spanning trees",
    "card": [
      ["Tree", "a connected graph with no cycles. A tree with v vertices always has v − 1 edges."],
      [
        "Spanning tree",
        "a tree that reaches every vertex of a connected graph, using only edges from that graph. A weighted graph can have many spanning trees."
      ],
      [
        "Minimum spanning tree",
        "the spanning tree with the smallest total weight. Use Prim's algorithm: start at any vertex, then keep adding the lightest edge that joins a new vertex to the tree."
      ],
      "Example: edges AB = 2, BC = 3, AC = 4 and CD = 5. Take AB (2), then BC (3), then CD (5). AC is skipped because it would make a cycle. Total weight = 2 + 3 + 5 = 10."
    ],
    "remember": "A minimum spanning tree reaches every vertex with v − 1 edges and the least total weight.",
    "a": {
      "q": "A connected graph has 7 vertices. How many edges does a spanning tree of this graph have?",
      "opts": ["6", "7", "8", "5"],
      "why": "A tree with v vertices has v − 1 edges, so 7 − 1 = 6. Choosing 7 would mean one edge too many, and that edge would make a cycle.",
      "clue": "Take one away from the number of vertices."
    },
    "b": {
      "d": 3,
      "q": "Roads join four towns: P to Q is 6 km, Q to R is 3 km, P to R is 5 km, R to S is 4 km and Q to S is 7 km. Cables must link all four towns using the least total length. What is that length?",
      "opts": ["12 km", "13 km", "14 km", "15 km"],
      "why": "Start at Q and take QR (3), then RS (4), then PR (5). Total = 3 + 4 + 5 = 12 km. Adding PQ (6) or QS (7) would make a cycle. Picking 13 km comes from taking PQ (6) instead of PR (5), which is heavier.",
      "clue": "A tree on 4 towns uses 3 roads. Add the lightest edge that reaches a new town each time."
    }
  },
  "mat-features-time-series": {
    "title": "Features of a time series",
    "card": [
      "A time series is data recorded over time, plotted with time on the horizontal axis. We look at the plot for patterns.",
      [
        "Trend",
        "a long-term rise or fall in the values. Seasonality is a pattern that repeats at a fixed, known period, such as every year or every week."
      ],
      [
        "Cycles",
        "rises and falls that repeat, but not at a fixed period, so their timing cannot be predicted exactly. Irregular fluctuations are random ups and downs with no pattern."
      ],
      [
        "Other features",
        "Structural change is a sudden, lasting shift, such as a new road changing visitor numbers for good. An outlier is a single value far from the rest."
      ]
    ],
    "remember": "Trend is long-term, seasonality repeats on a fixed period, and a cycle repeats without one.",
    "a": {
      "q": "Ice cream sales at a kiosk in Geelong peak every summer and drop every winter, year after year. Which feature is this?",
      "opts": ["Seasonality", "A cycle", "Structural change", "An outlier"],
      "why": "The peaks come at the same time each year, which is a fixed period, so this is seasonality. It is not a cycle, because a cycle has no fixed period.",
      "clue": "Look at whether the pattern repeats on a fixed schedule."
    },
    "b": {
      "d": 3,
      "q": "Monthly visitors to a Bendigo museum were steady for years. After a new wing opened, they jumped by about 30% and stayed there. Which feature is this?",
      "opts": ["Structural change", "An outlier", "Seasonality", "Irregular fluctuation"],
      "why": "The values shifted suddenly and stayed at the new level, which is structural change. An outlier is a single value far from the rest, so it is the tempting wrong answer, but here the shift lasted.",
      "clue": "Does the change last, or is it only one point?"
    }
  },
  "mat-smoothing-with-moving-means": {
    "title": "Smoothing with moving means",
    "card": [
      "Smoothing replaces each value in a time series with the mean of it and the values next to it. This evens out short-term ups and downs so the overall pattern is easier to see.",
      "For a 3-point moving mean, average a value with the one before and the one after. Example: for 10, 14, 12, the smoothed middle value is (10 + 14 + 12) ÷ 3 = 12.",
      "An odd-point mean lines up with a real data point. Values without a full set of neighbours get no smoothed value: the first and last for a 3-point mean, the first two and last two for a 5-point mean.",
      "An even-point mean, such as 4-point, falls halfway between two time points. Centre it by averaging two neighbouring 4-point means. The result lines up with a real time point."
    ],
    "remember": "Average each value with its neighbours. Even-point means need a second averaging to centre them.",
    "a": {
      "q": "A 3-point moving mean is used on the values 8, 11, 17, 14. What is the smoothed value for the second point?",
      "opts": ["12", "11", "14", "9.5"],
      "why": "The second point is averaged with its neighbours: (8 + 11 + 17) ÷ 3 = 36 ÷ 3 = 12. Answering 14 smooths the third point instead: (11 + 17 + 14) ÷ 3 = 14.",
      "clue": "Add the second value and the two beside it, then divide by 3."
    },
    "b": {
      "d": 3,
      "q": "Sales at a kiosk in Ballarat are 20, 26, 22, 28, 30 in five time periods. A 4-point moving mean gives 24 (between periods 2 and 3) and 26.5 (between periods 3 and 4). What is the centred 4-point mean for period 3?",
      "opts": ["25.25", "24", "26.5", "50.5"],
      "why": "Centre it by averaging the two 4-point means: (24 + 26.5) ÷ 2 = 25.25. Giving 50.5 adds the two means but forgets to divide by 2.",
      "clue": "Average the two means that sit either side of period 3."
    }
  },
  "mat-median-smoothing": {
    "title": "Median smoothing",
    "card": [
      "Median smoothing replaces each value with the median of it and its neighbours. The median is the number in the middle once they are put in order of size.",
      "For 3-median smoothing, take a value and the one before and after it. Put the three in order of size and pick the one in the middle.",
      "Example: values 4, 20, 6. In order of size they are 4, 6, 20. The median is 6, so the middle point's value, 20, is replaced by 6.",
      "A single extreme value ends up at one end of the ordered list, so it does not become the median. This is why median smoothing resists outliers. It can also be done on the graph by eye."
    ],
    "remember": "Sort each group by size and keep the one in the middle, so a single outlier has little effect.",
    "a": {
      "q": "Three consecutive values in a time series are 12, 9 and 21. What is the 3-median smoothed value for the middle point?",
      "opts": ["12", "9", "14", "21"],
      "why": "In order of size the values are 9, 12, 21, so the median is 12. The middle point's own value, 9, is not the median, because the median is found after putting the three in order. The mean of the three is 14, but median smoothing does not use the mean.",
      "clue": "Put the three values in order of size first."
    },
    "b": {
      "d": 3,
      "q": "Daily sales at a Ballarat bakery are 30, 32, 95, 31, 33. What is the 3-median smoothed value for the day with 95?",
      "opts": ["32", "31", "53", "95"],
      "why": "The three values are 32, 95 and 31. In order of size: 31, 32, 95, so the median is 32. A 3-mean would give about 53, because the outlier pulls it up.",
      "clue": "Use the 95 and the two values beside it."
    }
  },
  "mat-seasonal-indices": {
    "title": "Seasonal indices",
    "card": [
      "A seasonal index shows how one season (such as a quarter, month or day) compares with the average season. An index of 1 means that season is average.",
      "An index above 1 means the season is above average. An index of 1.2 means 20% above average. An index below 1 means below average, so 0.9 means 10% below average.",
      "Over a full cycle, the seasonal indices add up to the number of seasons. With 4 quarters, the indices add to 4. With 12 months, they add to 12.",
      "Example: if the indices for three quarters are 1.3, 0.8 and 1.1, the fourth must be 4 − (1.3 + 0.8 + 1.1) = 0.8."
    ],
    "remember": "Index 1 is average. Above 1 is above average. The indices add to the number of seasons.",
    "a": {
      "q": "A café in Geelong has a seasonal index of 0.85 for Mondays. What does this tell us about Monday sales?",
      "opts": [
        "15% below the average day",
        "85% above the average day",
        "15% above the average day",
        "85% below the average day"
      ],
      "why": "An index of 0.85 is 1 − 0.85 = 0.15 below 1, so sales are 15% below average. Saying 85% below confuses the index with the size of the gap.",
      "clue": "Compare 0.85 with 1, which is average."
    },
    "b": {
      "d": 3,
      "q": "A pool in Mildura has seasonal indices of 1.45 for summer, 0.85 for autumn and 1.05 for spring. What is the seasonal index for winter?",
      "opts": ["0.65", "0.35", "1.35", "1.00"],
      "why": "Four seasons means the indices add to 4. The three given add to 3.35, so winter is 4 − 3.35 = 0.65. The answer 0.35 is how far winter sits below average, not the index itself.",
      "clue": "How many seasons are there, and what must the indices add to?"
    }
  },
  "mat-deseasonalising-data": {
    "title": "Deseasonalising data",
    "card": [
      "Seasonal effects can hide the trend. Deseasonalising removes them so we can see whether values are really rising or falling.",
      "To deseasonalise, divide each value by the seasonal index for its season. Deseasonalised value = actual value ÷ seasonal index.",
      "Example: sales are 120 in a season with index 1.2. The deseasonalised value is 120 ÷ 1.2 = 100. This is what sales would be in an average season.",
      "A season with an index below 1 gets adjusted upwards. Sales of 72 with index 0.8 give 72 ÷ 0.8 = 90."
    ],
    "remember": "Divide by the seasonal index to take the season out and reveal the trend.",
    "a": {
      "q": "Ice cream sales in Cairns are 150 boxes in a quarter with a seasonal index of 1.25. What is the deseasonalised value?",
      "opts": ["120", "187.5", "148.75", "151.25"],
      "why": "Deseasonalised value = 150 ÷ 1.25 = 120. Multiplying gives 187.5, which adds the seasonal effect instead of removing it.",
      "clue": "Removing a season's effect means dividing, not multiplying."
    },
    "b": {
      "d": 2,
      "q": "A bookshop in Bendigo sells 210 books in a month with seasonal index 0.70. After deseasonalising, what does this value show?",
      "opts": [
        "300, above the 210 actually sold",
        "300, below the 210 actually sold",
        "147, below the 210 actually sold",
        "147, above the 210 actually sold"
      ],
      "why": "210 ÷ 0.70 = 300. The month is below average, so removing the season raises the value above 210. The 147 comes from multiplying by 0.70 instead.",
      "clue": "An index below 1 means the month was weaker than average."
    }
  },
  "mat-forecasting-from-trend": {
    "title": "Forecasting from a trend",
    "card": [
      "Seasonal data has a repeating pattern that can hide the trend. To forecast, start with the deseasonalised data, where the seasonal effect has been taken out.",
      "Fit a least squares line to the deseasonalised data, with time as the explanatory variable. Substitute the future time period to predict a deseasonalised value.",
      "Then reseasonalise by multiplying the prediction by the seasonal index for that season. This puts the seasonal pattern back.",
      "Example: the line gives 200 for a quarter with index 1.2. The forecast is 200 × 1.2 = 240."
    ],
    "remember": "Predict from the line, then multiply by the seasonal index.",
    "a": {
      "q": "A least squares line fitted to deseasonalised data predicts 150 for a season with seasonal index 0.8. What is the forecast?",
      "opts": ["120", "187.5", "150", "149.2"],
      "why": "Reseasonalising means multiplying: 150 × 0.8 = 120. Dividing gives 187.5, which does the reverse of putting the season back. Leaving 150 skips the reseasonalising step.",
      "clue": "Putting the season back means multiplying."
    },
    "b": {
      "d": 3,
      "q": "A café in Mildura has the deseasonalised line sales = 400 + 12t. For t = 10, the seasonal index is 1.25. What is the forecast?",
      "opts": ["650", "416", "520", "550"],
      "why": "The line gives 400 + 12 × 10 = 520. Multiply the whole prediction by the index: 520 × 1.25 = 650. Stopping at 520 skips reseasonalising, and 550 comes from multiplying only the 12t part by the index.",
      "clue": "Find the line's full value first, then adjust for the season."
    }
  },
  "mat-hungarian-algorithm": {
    "title": "The Hungarian algorithm",
    "card": [
      "A bipartite graph has two groups, such as workers and tasks, with edges only between the groups. A cost table shows the same thing. Each worker gets exactly one task, and the aim is the least total cost.",
      "Subtract the smallest number in each row from every number in that row. Then subtract the smallest number in each column from every number in that column. This makes zeros.",
      "Cover all the zeros with as few lines as possible. If the number of lines equals the number of rows, assign using the zeros. If there are fewer lines, subtract the smallest uncovered number from every uncovered number, add it to numbers covered twice, and cover again.",
      "Example: workers A, B, C cost 9, 7, 8 / 6, 5, 9 / 8, 4, 6 for tasks 1, 2, 3. Both steps give 1, 0, 0 / 0, 0, 3 / 3, 0, 1, which needs 3 lines. C has one zero, so C does task 2, B does 1 and A does 3. Add the original costs: 8 + 6 + 4 = 18."
    ],
    "remember": "Reduce rows then columns, cover the zeros, and assign only when the lines equal the rows.",
    "a": {
      "q": "The first row of a cost table is 12, 9, 15. What does this row become after the row step?",
      "opts": ["3, 0, 6", "-3, -6, 0", "0, -3, 3", "12, 0, 15"],
      "why": "The smallest number in the row is 9, so subtract 9 from every number: 3, 0, 6. Changing only the smallest number to zero is tempting, but every number in the row must change.",
      "clue": "Find the smallest number in the row, then subtract it from all three."
    },
    "b": {
      "d": 3,
      "q": "After reducing rows and columns, a 3×3 table has all its zeros covered by 2 lines. What happens next?",
      "opts": [
        "Adjust the table using the smallest uncovered number",
        "Assign using the zeros, as the table is now optimal",
        "Add a dummy row of zeros and cover again",
        "Reduce the rows again and then stop"
      ],
      "why": "A 3×3 table needs 3 lines before an assignment can be made. With only 2 lines, subtract the smallest uncovered number from the uncovered numbers, add it to those covered twice, then cover again. Assigning now is tempting because zeros exist, but there are not enough of them in the right places.",
      "clue": "Compare the number of lines with the number of rows."
    }
  },
  "mat-activity-networks-2": {
    "title": "Activity networks",
    "card": [
      "In an activity network, each activity is an arrow labelled with its letter and time, and each node is an event. A precedence table lists the activities that must finish right before each one can start.",
      "A dummy activity is a dotted arrow with zero time. It shows that one activity must wait for another, without adding any time.",
      [
        "Some, not all",
        "use a dummy when an activity needs only some of another's predecessors. If C needs A, and D needs A and B, a dummy runs from the end of A to the start of D."
      ],
      [
        "Same two nodes",
        "two activities must not both start and end at the same pair of nodes, or they cannot be told apart. End one at a new node, then add a dummy from there."
      ]
    ],
    "remember": "A dummy adds a link without adding time: use it for a partial overlap of predecessors, or to keep two activities off the same pair of nodes.",
    "a": {
      "q": "In a precedence table, Q and R both need only P, and S needs both Q and R. Why is a dummy activity needed?",
      "opts": [
        "Q and R would share the same start and end nodes",
        "S could start before both Q and R are finished",
        "R would have to wait until Q is finished",
        "The project would take longer to complete"
      ],
      "why": "Q and R both start at the end of P and both end at the start of S, so without a dummy they would run between the same pair of nodes. S already waits for both, because both arrows end at its start node, so S starting early is not the problem.",
      "clue": "Find the node where Q starts and ends, then do the same for R."
    },
    "b": {
      "d": 3,
      "q": "Priya renovates a kitchen. A has no predecessors. B and C each need A. D needs B. E needs B and C. F needs D and E. How many dummy activities are needed?",
      "opts": ["One", "None", "Two", "Three"],
      "why": "D needs only B, but E needs B and C, so a dummy runs from the end of B to the node where C ends and E starts. D and E both end where F starts, but they start at different nodes, so no second dummy is needed.",
      "clue": "Check both reasons for a dummy, one at a time."
    }
  },
  "mat-earliest-latest-start-times": {
    "title": "Earliest and latest start times",
    "card": [
      "The earliest start time (EST) is the soonest an activity can begin. Scan forward from the start, where the first activities have EST 0.",
      "EST of an activity = the largest of (EST + duration) over all its predecessors. It must wait for the one that finishes last.",
      "The latest start time (LST) is the last time an activity can begin without delaying the project. Scan backward from the finish, which is the project time.",
      "LST = the smallest LST of its successors − its own duration. Example: A (3 days) then B (4) and C (2), then D (5). D has EST 7, so the project takes 12 days and D has LST 12 − 5 = 7."
    ],
    "remember": "Forward scan: take the largest. Backward scan: take the smallest, then subtract.",
    "a": {
      "q": "P (4 days) and Q (6 days) have no predecessors. R (3 days) needs P. S (5 days) needs P and Q. What is the EST of S?",
      "opts": ["6", "4", "10", "11"],
      "why": "S cannot start until both P and Q are done. P finishes at 0 + 4 = 4 and Q finishes at 0 + 6 = 6, so the largest is 6. Taking 4 ignores that Q is still running.",
      "clue": "S waits for whichever predecessor finishes last."
    },
    "b": {
      "d": 3,
      "q": "A (2 days) has no predecessors. B (5 days) and C (3 days) both need A. D (4 days) needs B and C. The project takes 11 days. What is the LST of C?",
      "opts": ["4", "2", "5", "8"],
      "why": "D must start by 11 − 4 = 7. C takes 3 days, so its LST is 7 − 3 = 4. The value 8 comes from forgetting that D takes time, and 2 is C's earliest start.",
      "clue": "Work back from the finish, finding D's LST first."
    }
  },
  "mat-crashing-project": {
    "title": "Crashing a project",
    "card": [
      "Crashing means shortening an activity by spending extra money. Each activity has a crash cost for every time unit saved.",
      "The project time falls only if you crash an activity on the critical path, the longest path through the network.",
      "To cut the time at least cost, crash the cheapest critical activity first. Once a path is shortened to match another path, both paths are critical.",
      "Example: path 1 takes 9 days and path 2 takes 8. Crashing a path 1 activity by 1 day gives 8 days. Now both paths are critical, so any further cut needs both paths shortened."
    ],
    "remember": "Crash only critical activities, cheapest first, and check if the critical path changes.",
    "a": {
      "q": "The critical path is A, C, E (14 days). Path B, D takes 10 days. Crash costs per day: A $300, C $500, D $100, E $400. Which activity should be crashed to cut 1 day at least cost?",
      "opts": [
        "Activity A, at $300 a day",
        "Activity D, at $100 a day",
        "Activity C, at $500 a day",
        "Activity E, at $400 a day"
      ],
      "why": "Only activities on the critical path can shorten the project. Of A, C and E, activity A is cheapest. D costs less but is not critical, so crashing it does not shorten the project.",
      "clue": "Cross out any activity that is not on the critical path."
    },
    "b": {
      "d": 3,
      "q": "Path X takes 12 days and path Y takes 11 days. An activity only on X can be crashed by up to 3 days, at $200 a day. If all 3 days are crashed, how many days does the project time fall by?",
      "opts": ["1 day", "3 days", "2 days", "0 days"],
      "why": "After 1 day, X takes 11 days and matches Y. Y is now critical and still takes 11 days, so the project time stays at 11. The other 2 days of crashing cost money but save no time.",
      "clue": "Which path sets the time once X becomes shorter than Y?"
    }
  },
  "mat-radians-2": {
    "title": "Radians",
    "card": [
      "On a unit circle (radius 1), the angle at the centre in radians equals the arc length it cuts off. So an arc of length 1 gives an angle of 1 radian.",
      "The unit circle has circumference 2π, so a full turn is 2π radians. This means π radians = 180°.",
      [
        "Arc length",
        "on a circle of radius r, arc length = radius × angle in radians, so l = rθ. Example: r = 4 and θ = π/3 give l = 4π/3."
      ],
      ["Change units", "degrees × π/180 gives radians. Radians × 180/π gives degrees. Example: 60° × π/180 = π/3."]
    ],
    "remember": "π radians is 180°. Use π/180 to go to radians and 180/π to go to degrees.",
    "a": {
      "q": "Convert 150° to radians.",
      "opts": ["5π/6", "6π/5", "5π/3", "3π/4"],
      "why": "150 × π/180 = 150π/180 = 5π/6. The option 6π/5 turns the fraction upside down, which would come from using 180/150 instead of 150/180.",
      "clue": "Multiply by π/180, then simplify the fraction."
    },
    "b": {
      "d": 2,
      "q": "A dial is turned through 5π/4 radians. What is this angle in degrees?",
      "opts": ["225°", "240°", "150°", "200°"],
      "why": "5π/4 × 180/π = 5 × 45 = 225°. The option 150° comes from using 5π/6, a different fraction, and 240° is 4π/3, so neither fits 5π/4.",
      "clue": "Multiply by 180/π so that π cancels."
    }
  },
  "mat-exact-values-2": {
    "title": "Exact values",
    "card": [
      [
        "π/4 triangle",
        "Half a square with side 1 has angles π/4, π/4 and π/2. By Pythagoras the hypotenuse is √2. So sin(π/4) = 1/√2, cos(π/4) = 1/√2 and tan(π/4) = 1."
      ],
      [
        "π/6 and π/3 triangle",
        "Half an equilateral triangle with side 2 has angles π/6, π/3 and π/2. Its short side is 1 and its other side is √3, by Pythagoras."
      ],
      [
        "Reading it off",
        "Opposite π/6 is 1, so sin(π/6) = 1/2, cos(π/6) = √3/2 and tan(π/6) = 1/√3. Opposite π/3 is √3, so sin(π/3) = √3/2, cos(π/3) = 1/2 and tan(π/3) = √3."
      ],
      "Leave answers as surds, not decimals. Example: sin(π/3) × cos(π/6) = (√3/2) × (√3/2) = 3/4."
    ],
    "remember": "Draw the special triangle, then read the ratio from its sides.",
    "a": {
      "q": "Find the exact value of cos(π/3).",
      "opts": ["1/2", "√3/2", "1/√2", "√3"],
      "why": "In the π/6, π/3, π/2 triangle, the side next to π/3 is 1 and the hypotenuse is 2, so cos(π/3) = 1/2. The value √3/2 is tempting, but that is sin(π/3) and cos(π/6).",
      "clue": "Which side is next to the angle π/3?"
    },
    "b": {
      "d": 3,
      "q": "Evaluate sin(π/6) + tan(π/4) exactly.",
      "opts": ["3/2", "1/2", "√3/2 + 1", "1 + 1/√2"],
      "why": "sin(π/6) = 1/2 and tan(π/4) = 1, so the sum is 1/2 + 1 = 3/2. The option 1/2 is tempting, but it leaves out the tan(π/4) term.",
      "clue": "Find each value from its triangle, then add."
    }
  },
  "mat-symmetry-periodicity": {
    "title": "Symmetry and periodicity",
    "card": [
      "Sine and cosine repeat every 2π, so sin(θ + 2π) = sin θ and cos(θ + 2π) = cos θ. Tangent repeats every π, so tan(θ + π) = tan θ.",
      "Reflecting an angle in the y-axis gives π − θ: sin(π − θ) = sin θ and cos(π − θ) = −cos θ.",
      "Going half a turn round gives π + θ: sin(π + θ) = −sin θ and cos(π + θ) = −cos θ. Reflecting in the x-axis gives −θ or 2π − θ: sin(−θ) = −sin θ and cos(−θ) = cos θ.",
      "Worked example: sin(5π/6) = sin(π − π/6) = sin(π/6) = 1/2. The angle 5π/6 is in quadrant 2, where sine is positive."
    ],
    "remember": "Find the matching angle in quadrant 1, then fix the sign using the quadrant.",
    "a": {
      "q": "Which expression is equal to cos(π − θ)?",
      "opts": ["−cos θ", "cos θ", "−sin θ", "sin θ"],
      "why": "Reflecting in the y-axis keeps the height but flips the x-coordinate, so cosine changes sign: cos(π − θ) = −cos θ. The option cos θ is tempting, but that is the rule for sine, which keeps its sign.",
      "clue": "Reflecting in the y-axis changes the x-coordinate."
    },
    "b": {
      "d": 3,
      "q": "What is the value of cos(4π/3)?",
      "opts": ["−1/2", "1/2", "−√3/2", "√3/2"],
      "why": "4π/3 = π + π/3, which is in quadrant 3, where cosine is negative. So cos(4π/3) = −cos(π/3) = −1/2. The option −√3/2 is tempting, but it is the value of sin(4π/3) and cos(7π/6), not of cos(4π/3).",
      "clue": "Write 4π/3 as π + π/3, then check the quadrant."
    }
  },
  "mat-antiderivatives-unit-3": {
    "title": "Antiderivatives",
    "card": [
      "An antiderivative of f(x) is a function whose derivative is f(x). A constant disappears when we differentiate, so the general antiderivative, written ∫f(x) dx, includes + c, where c is any constant.",
      [
        "Powers",
        "∫xⁿ dx = xⁿ⁺¹/(n + 1) + c, for n ≠ −1. Add 1 to the power, then divide by the new power. For 1/x, ∫1/x dx = loge|x| + c."
      ],
      ["Exponential", "∫e^(kx) dx = (1/k)e^(kx) + c, for k ≠ 0. Divide by the number k in front of x."],
      [
        "Trig",
        "∫sin(kx) dx = −(1/k)cos(kx) + c and ∫cos(kx) dx = (1/k)sin(kx) + c. Example: ∫cos(2x) dx = (1/2)sin(2x) + c."
      ]
    ],
    "remember": "Raise the power and divide by the new power, or divide by k. The general antiderivative adds + c.",
    "a": {
      "q": "What is ∫6x² dx?",
      "opts": ["2x³ + c", "3x³ + c", "12x + c", "6x³ + c"],
      "why": "Add 1 to the power to get x³, then divide by the new power 3: 6x³/3 = 2x³. The option 12x comes from differentiating instead: multiplying by the power and lowering it by 1. The option 3x³ divides by the old power 2, and 6x³ forgets to divide at all.",
      "clue": "Raise the power by 1, then divide by the new power."
    },
    "b": {
      "d": 3,
      "q": "What is ∫(e^(3x) + sin(2x)) dx?",
      "opts": [
        "(1/3)e^(3x) − (1/2)cos(2x) + c",
        "(1/3)e^(3x) + (1/2)cos(2x) + c",
        "3e^(3x) − 2cos(2x) + c",
        "(1/3)e^(3x) − 2cos(2x) + c"
      ],
      "why": "Integrate each term. e^(3x) gives (1/3)e^(3x), and sin(2x) gives −(1/2)cos(2x). The sign is negative because the derivative of cos is −sin, and multiplying by k instead of dividing is a common slip.",
      "clue": "Divide by k in each term, and check the sign for sin."
    }
  },
  "mat-definite-integrals": {
    "title": "Definite integrals",
    "card": [
      "Split the area under y = f(x) from x = a to x = b into thin strips of height f(x) and width Δx. The definite integral is the limit of the sum of their areas as the strips get thinner.",
      "It is written ∫ from a to b of f(x) dx and gives a number, not a function. Area above the x-axis counts as positive, and area below the axis counts as negative.",
      "Splitting: for c between a and b, ∫ from a to b of f(x) dx = ∫ from a to c of f(x) dx + ∫ from c to b of f(x) dx. Example: if ∫ from 0 to 2 of f(x) dx = 5 and ∫ from 2 to 6 of f(x) dx = 3, then ∫ from 0 to 6 of f(x) dx = 8.",
      "Swapping the limits reverses the sign: ∫ from b to a of f(x) dx = −∫ from a to b of f(x) dx. Example: if ∫ from 0 to 6 of f(x) dx = 8, then ∫ from 6 to 0 of f(x) dx = −8."
    ],
    "remember": "Join pieces across an interval by adding them with their signs. Swap the limits and the sign flips.",
    "a": {
      "q": "Given ∫ from 1 to 4 of f(x) dx = 7 and ∫ from 4 to 9 of f(x) dx = −2, what is ∫ from 1 to 9 of f(x) dx?",
      "opts": ["5", "9", "−5", "14"],
      "why": "Splitting at x = 4 gives 7 + (−2) = 5. The answer 9 comes from ignoring the negative sign, which treats the negative integral as positive.",
      "clue": "Add the two pieces, keeping their signs."
    },
    "b": {
      "d": 3,
      "q": "Given ∫ from 2 to 8 of f(x) dx = 10 and ∫ from 2 to 5 of f(x) dx = 6, what is ∫ from 8 to 5 of f(x) dx?",
      "opts": ["−4", "4", "16", "−16"],
      "why": "Splitting at 5 gives 10 = 6 + ∫ from 5 to 8, so ∫ from 5 to 8 of f(x) dx = 4. The required integral runs from 8 to 5, so the limits are swapped and the sign reverses to −4. The answer 4 forgets this swap.",
      "clue": "Find the piece from 5 to 8 first, then check the direction of the limits."
    }
  },
  "mat-fundamental-theorem-calculus": {
    "title": "The fundamental theorem of calculus",
    "card": [
      "Differentiating and integrating undo each other. If F′(x) = f(x), then F is an antiderivative of f.",
      "To find a definite integral, find an antiderivative F, then work out F(b) − F(a). The constant of integration cancels, so leave it out.",
      "Worked example: ∫ from 1 to 3 of 2x dx. An antiderivative of 2x is x². So the integral = 3² − 1² = 9 − 1 = 8.",
      "The same rule works the other way. The derivative of ∫ from a to x of f(t) dt is f(x). Where f is positive, the integral is the area under the curve."
    ],
    "remember": "Integral from a to b of f = F(b) − F(a), where F′ = f.",
    "a": {
      "q": "What is the value of ∫ from 0 to 2 of 3x² dx?",
      "opts": ["8", "6", "12", "4"],
      "why": "An antiderivative of 3x² is x³. The integral is 2³ − 0³ = 8. Using the value 3x² = 12 at x = 2 is the tempting mistake, because that is the function's value, not F(2) − F(0).",
      "clue": "Find F first, then use its values at both limits."
    },
    "b": {
      "d": 2,
      "q": "Mia finds that an antiderivative of 2x + 1 is F(x) = x² + x. What is ∫ from 1 to 4 of (2x + 1) dx?",
      "opts": ["18", "22", "20", "−18"],
      "why": "F(4) = 16 + 4 = 20 and F(1) = 1 + 1 = 2, so the integral is 20 − 2 = 18. Adding the two values gives 22, and using F(4) alone gives 20. Working out F(1) − F(4) gives −18, but the rule is F(b) − F(a).",
      "clue": "Both limits are needed, and the order matters."
    }
  },
  "mat-finding-function-from-rate": {
    "title": "Finding a function from its rate of change",
    "card": [
      "If you know f'(x), the rate of change, you can find f(x) by antidifferentiating. The answer has a constant: f(x) = ∫f'(x) dx + c.",
      "One rate fits many functions, because each value of c gives a different curve. A known point on the curve, called a boundary condition, fixes c.",
      "Substitute the point into f(x) and solve for c. Then write the full function with c in place.",
      "Example: f'(x) = 6x² − 2 and f(1) = 5. Then f(x) = 2x³ − 2x + c. Putting in x = 1: 2 − 2 + c = 5, so c = 5 and f(x) = 2x³ − 2x + 5."
    ],
    "remember": "Antidifferentiate the rate, then use the known point to find c.",
    "a": {
      "q": "f'(x) = 4x − 3 and f(2) = 1. What is f(x)?",
      "opts": ["2x² − 3x − 1", "2x² − 3x + 1", "2x² − 3x + 3", "4x² − 3x − 9"],
      "why": "Antidifferentiating gives f(x) = 2x² − 3x + c. Then f(2) = 8 − 6 + c = 1, so c = −1. The option with +1 uses the value of f(2) as c without working it out.",
      "clue": "Find c by putting x = 2 into 2x² − 3x + c."
    },
    "b": {
      "d": 3,
      "q": "A tank's volume V litres changes at dV/dt = 6t − 12 litres per minute. At t = 0 the tank holds 20 litres. What is V at t = 4?",
      "opts": ["20 litres", "0 litres", "12 litres", "32 litres"],
      "why": "V = 3t² − 12t + c. At t = 0, V = 20, so c = 20, and V(4) = 48 − 48 + 20 = 20 litres. The 12 litres option is the rate dV/dt at t = 4, not the volume, and 0 litres leaves out c.",
      "clue": "Antidifferentiate first, then use t = 0 to find c."
    }
  },
  "mat-area-under-between-curves": {
    "title": "Area under and between curves",
    "card": [
      "The area between two curves from x = a to x = b is the integral of (top curve − bottom curve). Area = ∫ from a to b of [f(x) − g(x)] dx, where f(x) ≥ g(x) on [a, b].",
      "For the area between a curve and the x-axis, the axis is the bottom curve (g(x) = 0). Where the curve is below the axis, the integral is negative, so take the positive size of that part.",
      "If the curves cross, or the curve crosses the x-axis, find the crossing points. Split the interval there and find each area on its own, using top − bottom each time.",
      "Example: f(x) = x and g(x) = x² between x = 0 and x = 1. They meet where x = x², at x = 0 and x = 1, and x ≥ x² between them. Area = ∫ from 0 to 1 of (x − x²) dx = 1/2 − 1/3 = 1/6."
    ],
    "remember": "Area = integral of top − bottom, and split at every crossing.",
    "a": {
      "q": "Between x = 0 and x = 2, the line y = 4 lies above the curve y = x². Which integral gives the area between them?",
      "opts": [
        "∫ from 0 to 2 of (4 − x²) dx",
        "∫ from 0 to 2 of (x² − 4) dx",
        "∫ from 0 to 2 of (4 + x²) dx",
        "∫ from 0 to 4 of (4 − x²) dx"
      ],
      "why": "The top curve is y = 4, so the integrand is top − bottom = 4 − x², over the x-values 0 to 2. Using x² − 4 reverses the order and gives a negative number, which is not an area.",
      "clue": "Subtract the lower curve from the upper curve."
    },
    "b": {
      "d": 3,
      "q": "What is the total area enclosed between y = x² − 4 and the x-axis, from x = 0 to x = 3?",
      "opts": ["23/3", "5/3", "−23/3", "7/3"],
      "why": "The curve crosses the axis at x = 2, so split there. From 0 to 2 the integral is [x³/3 − 4x] = 8/3 − 8 = −16/3, so that area is 16/3. From 2 to 3 it is (9 − 12) − (8/3 − 8) = −3 + 16/3 = 7/3. The total is 16/3 + 7/3 = 23/3. Integrating straight from 0 to 3 gives −16/3 + 7/3 = −3, which cancels the parts instead of adding them.",
      "clue": "Find where the curve crosses the axis, and add the two areas as positive numbers."
    }
  },
  "mat-average-value-function": {
    "title": "Average value of a function",
    "card": [
      "The average value of f on [a, b] is 1/(b − a) × the definite integral of f(x) from a to b. In words: integrate, then divide by the width b − a.",
      "When f(x) ≥ 0 on [a, b], the average value is the height of a rectangle on [a, b] with the same area as the region under the curve.",
      "The integral is signed: parts of the graph below the x-axis count as negative. So use the definite integral itself, not the total area.",
      "Example: for f(x) = x² on [0, 3], the integral is [x³/3] from 0 to 3 = 9 − 0 = 9. Dividing by the width 3 − 0 gives 9 ÷ 3 = 3."
    ],
    "remember": "Find the signed integral first, then divide by the width b − a.",
    "a": {
      "q": "The integral of f(x) from 1 to 5 is 20. What is the average value of f on [1, 5]?",
      "opts": ["5", "4", "20", "80"],
      "why": "The width is 5 − 1 = 4, so the average value is 20 ÷ 4 = 5. Dividing by 5, the end value, gives 4, which is a mistake: the width is b − a, not b.",
      "clue": "Divide the integral by the width of the interval."
    },
    "b": {
      "d": 3,
      "q": "What is the average value of f(x) = 2x on [1, 4]?",
      "opts": ["5", "15", "3", "7.5"],
      "why": "The integral of 2x from 1 to 4 is [x²] from 1 to 4 = 16 − 1 = 15. The width is 3, so the average is 15 ÷ 3 = 5. The answer 15 is only the integral, and has not been divided by the width.",
      "clue": "Find the integral first, then divide by 4 − 1."
    }
  }
};
