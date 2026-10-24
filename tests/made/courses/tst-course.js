/* Testing, Year 9 (NSW, Test topic). Made by the content pipeline from content/outlines/tst-course.yaml.
   Written by python3 content/pipeline.py publish. Do not edit it by hand. A chapter with no points is still
   being reviewed, and shows on Home as Coming soon. */
MADE_COURSES.push({
  "id": "tst-course",
  "course": "Testing",
  "year": "Year 9",
  "name": "Testing, Year 9",
  "short": "Testing",
  "note": "A made course for the tests. It is not real study content.",
  "place": "nsw",
  "kind": "standard",
  "years": [9],
  "chips": ["plain one", "dash one", "flag one", "error one", "expire one"],
  "row": {"name": "Testing, Year 9", "about": "NSW, Test topic"},
  "units": [
    {
      "title": "Testing unit",
      "chapters": [
        {
          "id": "tst-course-1-1",
          "title": "First chapter",
          "check": "checked",
          "points": ["tst-plain-one", "tst-dash-one", "tst-flag-one", "tst-error-one", "tst-expire-one", "e-nature", "e-ped"]
        },
        {
          "id": "tst-course-1-2",
          "title": "Second chapter",
          "check": "checked",
          "points": ["tst-refuse-one", "tst-unsure-one"]
        }
      ]
    }
  ]
});
