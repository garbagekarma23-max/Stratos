## Graphs

A point can show graphs. The app draws each one from data you write, so a graph is exact, sharp on a phone and right in light and dark mode. Never describe a picture to be drawn later: write the graph itself, or none.

### When a graph helps

- Add a graph when the idea is a picture: the shape of a function, where a graph crosses the axes, a turning point, an asymptote, a shift of a curve, an area such as consumer surplus or a tax wedge.
- Put it under the card line it shows (the card line's fig). Most points need one graph or none. Never more than two on a card.
- A question can have a graph under it (the question's fig) when the student must read it to answer. Never add one that gives the answer away.
- A question can have graphs as its options (optFigs), four of them, for "Which graph shows ...?". Each option's text is then its description for screen readers, such as "Concave down, with roots \(x = -2\) and \(x = 4\)": the student sees only the graphs. Each description must say exactly what its graph shows, and the wrong graphs show real mistakes, such as the signs of the roots swapped or the wrong concavity.
- Leave fig and optFigs as "" when there is no graph.

### How to write one

fig is the graph as JSON text, a string inside your answer; optFigs is a JSON list of four graphs, as text, in the order of opts. Inside that text every quote and backslash is escaped again, so the maths \(x\) is written "\\\\(x\\\\)" in your answer. A graph that is not valid JSON is sent back to you.

A graph has kind, alt, x, y, items, and may have grid and equal:

- kind: "graph".
- alt: what the graph shows, in words, for a student who cannot see it. Name every curve, the points it marks, and what it shows. Required, except on an option's graph, which takes its description from the option.
- x and y: the axes. min and max; label (a word or two, or maths: "\(x\)", "Price", "Quantity"); step for a tick and a number at every step. No step means no ticks and no numbers, as an economics diagram has. "nums": false keeps the ticks with no numbers. Leave room around the curves: a turning point or label right at the edge does not fit.
- grid: true for grid lines at each step. equal: true when one unit must be as long on both axes, such as for a circle.
- items, drawn in order (shading first, so the curves sit on top). Each has a type:
  - fn: a function of x, "expr" in LaTeX with x as the only letter and no "y =": "x^{2} - 6x + 5", "\frac{6}{x}", "|x - 3|", "\sqrt{9 - x^{2}}". "domain": [a, b] limits it. "breaks": [0] stops the line at an asymptote. "id" names it ("f").
  - curve: a line or curve through points, for economics: "points": [[0, 10], [10, 0]]. "smooth": true bends it through them, with x rising from point to point.
  - circle: "centre": [3, -2], "r": 5, with equal: true.
  - fn, curve and circle take "label" (maths allowed: "\(y = x^{2}\)", "D", "S1"), "labelAt" (the x where the label sits), "pos" and "style" ("solid", "dash" or "dot").
  - point: a dot, "at": [3, -4], with "label", "pos", "open": true for an open dot, "on": the ids of the curves it lies on, and "is": "x-intercept", "y-intercept", "turning point" or "intersection".
  - guide: dashed lines from a point to the axes, "at": [4, 6], "xLabel": "Q*" at the x-axis and "yLabel": "P*" at the y-axis. "" draws a line with no label; leave one out for no line.
  - shade: a region, "poly": [[0, 10], [0, 6], [4, 6]]; or "under": "f" or "between": ["D", "S"] with "span": [a, b]. "label" ("CS", "Tax") sits in the middle, or at "at". "hatch": true draws lines instead of a tint.
  - arrow: a shift, "from": [x, y], "to": [x, y], with "label" and "pos".
  - asymptote: a dashed line, "x": 2 or "y": 1, with a label such as "\(x = 2\)".
  - text: a short label, "at", "label", "pos".
  - pos is above, below, left, right, above-left, above-right, below-left or below-right. Place labels so they do not sit on a line.

### Rules

- Every number must be exact. A point said to be on a curve is on it. An intercept is where the curve meets the axis, a turning point is where it turns, and coordinates in a label match the dot. Work each one out before you write it. The content check works them out too, and sends back any that are wrong.
- The graph must agree with the card, the question, the right answer and the why. Label what the text names, with the same names.
- Curves are told apart by labels, line style and position, never by colour: the app draws every curve in one colour. With two or more curves, label every one.
- When a curve shifts, draw the original dashed and the new one solid, with an arrow from the old to the new. Use dashed lines for nothing else that could be read as a curve: asymptotes and guides are drawn in their own lighter dashes, and a line the student solves against (such as \(y = 4\)) is solid.
- Label all the parts a question turns on evenly. Never label only the parts that give the answer away, such as only the two empty quadrants.
- Everything fits inside the axes. Labels are a word or two, or short maths. Keep option graphs simple: few labels, numbers only where the student needs them.
- Economics diagrams use "Price" and "Quantity" (or the course's own terms) with no numbers, and plain labels such as D, S, S1, S2, P*, Q*, P1, Q1.

### Two examples

A card line's fig, for \(y = x^{2} - 6x + 5\):

{"kind": "graph", "alt": "The parabola \\(y = x^{2} - 6x + 5\\), concave up, crossing the x-axis at \\(x = 1\\) and \\(x = 5\\), with its vertex at \\((3, -4)\\).", "x": {"min": -1, "max": 7, "label": "\\(x\\)", "step": 1}, "y": {"min": -5, "max": 7, "label": "\\(y\\)", "step": 1}, "grid": true, "items": [{"type": "fn", "id": "f", "expr": "x^{2} - 6x + 5", "label": "\\(y = x^{2} - 6x + 5\\)", "labelAt": 6.2, "pos": "left"}, {"type": "point", "at": [1, 0], "on": ["f"], "is": "x-intercept"}, {"type": "point", "at": [5, 0], "on": ["f"], "is": "x-intercept"}, {"type": "point", "at": [3, -4], "on": ["f"], "is": "turning point", "label": "\\((3, -4)\\)", "pos": "below-right"}]}

A card line's fig, for consumer surplus:

{"kind": "graph", "alt": "Demand D and supply S cross at price P* and quantity Q*. Consumer surplus CS is the shaded triangle below demand and above P*.", "x": {"min": 0, "max": 10, "label": "Quantity"}, "y": {"min": 0, "max": 10, "label": "Price"}, "items": [{"type": "shade", "poly": [[0, 10], [0, 6], [4, 6]], "label": "CS", "at": [1.3, 7.3]}, {"type": "curve", "id": "D", "points": [[0, 10], [10, 0]], "label": "D", "pos": "above"}, {"type": "curve", "id": "S", "points": [[0, 2], [8, 10]], "label": "S", "pos": "right"}, {"type": "guide", "at": [4, 6], "xLabel": "Q*", "yLabel": "P*"}, {"type": "point", "at": [4, 6], "on": ["D", "S"], "is": "intersection"}]}

Each is shown as JSON. In your answer it is the text of fig, so each quote and backslash in it is escaped once more.

## Charts

A chart is drawn from data too: "kind": "chart", with "chart" one of bar, histogram, box, dot or stem, and an alt. Use one when a point is about reading or comparing data: a bar chart of categories, a histogram of grouped data, a box plot of a five-number summary, a dot plot or a stem-and-leaf plot of a small data set.

- bar: "bars": [["Soccer", 8], ["Netball", 6]] (a label and a value each, 2 to 12), "y": an axis with min 0, max and step, and "x": {"label": "Sport"}. "truncated": true lets y start above 0, only for a point about misleading graphs.
- histogram: "classes": [[0, 10, 3], [10, 20, 7]] (from, to and count, each class touching the next, all the same width), on "x" and "y" axes with steps. The x step should match the class width.
- box: "sets": [{"label": "Route 1", "data": [...]}], or {"label": ..., "five": [min, Q1, median, Q3, max]}, one to three sets, across an "x" axis with a step. "outliers": true shows values more than 1.5 IQR beyond the box as dots (it needs data).
- dot: "data": [...] on an "x" axis with a step: one dot for each value.
- stem: "data": [...] (or "sets": two {"label", "data"} for a back-to-back plot), "leaf": 1 (or 0.1 for one decimal place) and "key": "2 | 3 means 23".
- "stats": {"median": 16, "q1": 12} lists any value the text states about the data. The content check works out every stat from the data, and also reads "the median is 16", "Q1 = 12" and "IQR = 8" in the card line or question beside the chart, and sends back any that do not match. Quartiles are the medians of the lower and upper halves, leaving out the median when the number of values is odd.

A box plot under a card line, for a data set with one outlier:

{"kind": "chart", "chart": "box", "alt": "A box plot from 5 to 23, with the box from 12 to 20, the median at 16, and an outlier at 35 shown as a dot.", "x": {"min": 0, "max": 40, "step": 5, "label": "Value"}, "outliers": true, "sets": [{"data": [5, 8, 12, 13, 14, 16, 18, 19, 20, 23, 35]}], "stats": {"q1": 12, "q3": 20, "iqr": 8}}

## Slope fields

A graph can show a slope field: {"type": "slope", "id": "s", "expr": "x - y"}, with dy/dx in LaTeX in x and y. It draws a short line at each grid point (each step on both axes, or "every": [dx, dy]). A fn with "solves": "s" is checked to follow the field.

## Pictures

Some ideas are a picture that is not a graph or a chart: the parts of a cell, a circuit, the water cycle, a labelled triangle, a food web, a historical photo, a primary source, a map. You cannot draw these here, so ask for one in pictures, and a separate step draws or finds it.

- Ask only when the picture teaches: a student understands the idea better by seeing it. Most points need none. Never more than two on a point.
- pictures is a JSON list as text, or "" for none. Each entry is {"at": "card 2", "kind": "diagram", "brief": "...", "why": "..."}:
  - at: where it goes. card 1 to card 4 (under that card line), a or b (under that question), or a options or b options (four pictures as the options, for "Which diagram shows ...?").
  - kind: diagram (drawn for Stratos: a cell, a circuit, a cycle, a labelled shape), image (a real photo, artwork, primary source or map, found with an open licence), or chart (data you could not finish).
  - brief: what it shows, with every label, in the card's own words and names. For an image, say what kind of source (a photo of the event, a poster from the campaign, a map of the basin) and what it must show. Never name a textbook, an exam paper or a picture you cannot be sure is free to use.
  - why: one sentence on how it helps.
- The picture must agree with the card, the question and the right answer, and must not give the answer away.
- Never ask for a picture of a real student, a private person or anything a student should not see.
