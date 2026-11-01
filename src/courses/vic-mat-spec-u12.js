/* Specialist Mathematics, Units 1 and 2 (VCE, Proof, vectors, complex numbers and discrete maths). Made by the content pipeline from content/outlines/vic-mat-spec-u12.yaml.
   Written by python3 content/pipeline.py publish. Do not edit it by hand. A chapter with no points is still
   being reviewed, and shows on Home as Coming soon. */
MADE_COURSES.push({
  "id": "vic-mat-spec-u12",
  "course": "Mathematics",
  "year": "Units 1 and 2",
  "name": "Specialist Mathematics, Units 1 and 2",
  "short": "Specialist Mathematics",
  "note": "Follows the VCE Mathematics study design. Not made or endorsed by the VCAA.",
  "place": "vic",
  "kind": "maths",
  "years": [11],
  "level": "Units 1 and 2",
  "chips": ["proof by contradiction", "induction", "Argand plane", "vector", "recurrence"],
  "row": {
    "name": "Specialist Mathematics, Units 1 and 2",
    "about": "VCE, Proof, vectors, complex numbers and discrete maths"
  },
  "units": [
    {
      "title": "Unit 1: Proof, logic, graphs, sequences and combinatorics",
      "chapters": [
        {"id": "vic-mat-spec-u12-1-1", "title": "Number and proof", "check": "checked", "points": []},
        {"id": "vic-mat-spec-u12-1-2-2", "title": "Methods of proof", "check": "checked", "points": []},
        {"id": "vic-mat-spec-u12-1-3-2", "title": "Logic and algorithms", "check": "checked", "points": []},
        {
          "id": "vic-mat-spec-u12-1-3",
          "title": "Graphs and matrices",
          "check": "checked",
          "points": [
            "mat-graph-theory-specialist",
            "mat-types-graphs",
            "mat-planar-graphs-euler-s-2",
            "mat-trees-algorithms",
            "mat-euler-hamilton",
            "mat-matrix-operations-specialist",
            "mat-determinants-matrix-equations"
          ]
        },
        {
          "id": "vic-mat-spec-u12-1-2",
          "title": "Sequences, series and combinatorics",
          "check": "checked",
          "points": []
        }
      ]
    },
    {
      "title": "Unit 2: Sampling, trigonometry, vectors, complex numbers and curves",
      "chapters": [
        {
          "id": "vic-mat-spec-u12-5-1",
          "title": "Simulation and sampling",
          "check": "checked",
          "points": ["mat-sums-random-variables", "mat-simulation-2", "mat-sample-means-vary", "mat-distributions-sample-means"]
        },
        {
          "id": "vic-mat-spec-u12-3-1",
          "title": "Trigonometry and transformations",
          "check": "checked",
          "points": [
            "mat-radians-arcs-segments",
            "mat-sine-cosine-rules-three",
            "mat-trigonometric-identities",
            "mat-matrices-as-transformations",
            "mat-composition-inverse-transformations",
            "mat-determinants-area"
          ]
        },
        {"id": "vic-mat-spec-u12-2-3", "title": "Vectors in the plane", "check": "checked", "points": []},
        {
          "id": "vic-mat-spec-u12-4-1",
          "title": "Complex numbers",
          "check": "checked",
          "points": ["mat-imaginary-unit", "mat-arithmetic-with-complex-numbers", "mat-conjugates-division", "mat-argand-plane"]
        },
        {
          "id": "vic-mat-spec-u12-2-5",
          "title": "Polar form and the complex plane",
          "check": "checked",
          "points": [
            "mat-modulus-argument",
            "mat-polar-form",
            "mat-solving-quadratics-over-complex",
            "mat-regions-complex-plane"
          ]
        },
        {
          "id": "vic-mat-spec-u12-2-6",
          "title": "Rational and circular graphs",
          "check": "checked",
          "points": [
            "mat-partial-fractions",
            "mat-reciprocal-functions-2",
            "mat-inverse-circular-functions",
            "mat-absolute-value-function"
          ]
        },
        {"id": "vic-mat-spec-u12-2-1", "title": "Curves and loci", "check": "checked", "points": []}
      ]
    }
  ]
});
