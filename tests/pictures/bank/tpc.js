/* The tpc bank: a point for tests/pictures.mjs, written by hand. It is not real study content. Its questions have
   pictures as their options: diagrams, an image and a chart, so the test can answer them by tap and by keyboard and
   check the credits under them. In every question the correct answer is opts[0]. */
MADE_BANKS.tpc = {
  "tpc-picture-options": {
    "title": "Pictures as options",
    "card": [
      "This point is for the tests. Its questions show pictures as their options.",
      "A diagram, an image and a chart can each be an option, and the option's text is read to screen readers.",
      "An image used as an option has its credit under the options."
    ],
    "cardFigs": {
      "1": {"kind": "diagram", "src": "pictures/diagrams/series-circuit.svg", "alt": "A series circuit with a cell and two resistors, for the tests."}
    },
    "remember": "Any picture can be an option.",
    "a": {
      "q": "Which picture shows a series circuit, in this test?",
      "opts": ["A series circuit with a cell and two resistors", "A plant cell and an animal cell", "A leaflet from 1916", "A box plot with one outlier"],
      "optFigs": [
        {"kind": "diagram", "src": "pictures/diagrams/series-circuit.svg"},
        {"kind": "diagram", "src": "pictures/diagrams/plant-and-animal-cell-parts.svg"},
        {"kind": "image", "src": "pictures/images/the-blood-vote-1916.webp"},
        {"kind": "chart", "chart": "box", "x": {"min": 0, "max": 40, "step": 10}, "outliers": true, "sets": [{"data": [5, 8, 12, 13, 14, 16, 18, 19, 20, 23, 35]}]}
      ],
      "why": "The first picture is the circuit.",
      "clue": "Look for the loop."
    },
    "b": {
      "d": 2,
      "q": "Which picture is a primary source from 1916, in this test?",
      "opts": ["The leaflet The Blood Vote", "A series circuit", "Two cells side by side", "A bar chart of four sports"],
      "optFigs": [
        {"kind": "image", "src": "pictures/images/the-blood-vote-1916.webp"},
        {"kind": "diagram", "src": "pictures/diagrams/series-circuit.svg"},
        {"kind": "diagram", "src": "pictures/diagrams/plant-and-animal-cell-parts.svg"},
        {"kind": "chart", "chart": "bar", "x": {}, "y": {"min": 0, "max": 8, "step": 4}, "bars": [["A", 8], ["B", 6], ["C", 4], ["D", 6]]}
      ],
      "why": "The first picture is the leaflet.",
      "clue": "Look for the poster."
    }
  }
};
