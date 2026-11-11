/* The phys bank: points made by the content pipeline. Written by python3 content/pipeline.py publish.
   Do not edit it by hand: change a point through the review page and publish again (content/README.md).
   Each point has the same parts as in econ-points.js. In every question the correct answer is opts[0]. */
MADE_BANKS.phys = {
  "phys-projectile-motion": {
    "title": "Projectile motion",
    "card": [
      "A projectile is an object moving through the air under gravity alone. Here we ignore air resistance.",
      [
        "Horizontal",
        "no force acts sideways, so the horizontal velocity stays constant and the acceleration is zero."
      ],
      [
        "Vertical",
        "gravity pulls down, so the vertical velocity changes by 9.8 m/s every second. The acceleration is 9.8 m/s² downwards, whether the object is rising or falling."
      ],
      "The two directions do not affect each other, so we solve them separately. Time is the link: it is the same for both."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "The path of a ball launched from level ground with no air resistance: height against horizontal distance, a parabola. Dots mark the ball at equal time steps. They are equally spaced sideways, because the horizontal velocity stays constant, but not up and down, because gravity changes the vertical velocity.",
        "x": {"min": 0, "max": 44, "label": "Horizontal distance", "step": 5, "nums": false},
        "y": {"min": 0, "max": 24, "label": "Height"},
        "items": [
          {"type": "fn", "id": "p", "expr": "1.96x - 0.049x^{2}", "domain": [0, 40]},
          {"type": "point", "at": [0, 0], "on": ["p"]},
          {"type": "point", "at": [5, 8.575], "on": ["p"]},
          {"type": "point", "at": [10, 14.7], "on": ["p"]},
          {"type": "point", "at": [15, 18.375], "on": ["p"]},
          {"type": "point", "at": [20, 19.6], "on": ["p"]},
          {"type": "point", "at": [25, 18.375], "on": ["p"]},
          {"type": "point", "at": [30, 14.7], "on": ["p"]},
          {"type": "point", "at": [35, 8.575], "on": ["p"]},
          {"type": "point", "at": [40, 0], "on": ["p"]},
          {"type": "text", "at": [20, 21], "label": "equal steps sideways", "pos": "above"}
        ]
      }
    },
    "remember": "Treat horizontal and vertical separately: constant velocity sideways, constant acceleration downwards.",
    "a": {
      "q": "A ball rolls off a table and flies through the air. Ignoring air resistance, which statement describes its motion?",
      "opts": [
        "Sideways velocity is constant, falling velocity changes",
        "Both sideways and falling velocities stay constant, always",
        "Sideways velocity decreases steadily as the ball falls",
        "Falling velocity is constant at 9.8 m/s, sideways changes"
      ],
      "why": "No horizontal force acts, so horizontal velocity stays the same. Gravity changes the vertical velocity. The option saying 9.8 m/s is tempting, but 9.8 is the acceleration in m/s², not a constant speed.",
      "clue": "Which direction has a force acting on it?"
    },
    "b": {
      "d": 3,
      "q": "Priya kicks a ball horizontally off a cliff at 12 m/s. At the same instant, Sam drops a second ball from rest off the same cliff. Ignoring air resistance, how do their times to reach the ground compare?",
      "opts": [
        "They land at the same time",
        "Priya's ball lands first",
        "Sam's ball lands first",
        "Priya's ball lands later because it travels further"
      ],
      "why": "Both balls start with zero vertical velocity and have the same vertical acceleration and height, so the vertical motion is identical. Priya's ball moves sideways too, but that does not change the time it takes to fall.",
      "clue": "Does sideways motion change how fast something falls?"
    }
  },
  "phys-range-time-flight": {
    "title": "Range and time of flight",
    "card": [
      "Range is the horizontal distance a projectile travels. Time of flight is how long it stays in the air. Both depend on launch speed and launch angle.",
      "Split the launch velocity into parts: vx = v cos θ and vy = v sin θ. The vertical part sets the time of flight, so a steeper launch stays up longer.",
      "For a launch from level ground with no air resistance, time of flight = 2v sin θ ÷ g. Range = vx × time of flight = v² sin 2θ ÷ g.",
      "A larger launch speed gives a greater range and a longer time. For a fixed speed, 45° gives the longest range, and angles that add to 90° give equal ranges."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "Paths of three balls launched from level ground at the same speed, with no air resistance. The 45° path goes furthest. The 30° and 60° paths land at the same place, so they have equal ranges, but the 60° path goes much higher, so it stays in the air longer.",
        "x": {"min": 0, "max": 44, "label": "Horizontal distance"},
        "y": {"min": 0, "max": 17.5, "label": "Height"},
        "items": [
          {
            "type": "fn",
            "id": "a60",
            "expr": "\\sqrt{3}x - \\frac{x^{2}}{20}",
            "domain": [0, 34.641],
            "label": "60°",
            "labelAt": 17.32,
            "pos": "above",
            "style": "dot"
          },
          {
            "type": "fn",
            "id": "a45",
            "expr": "x - \\frac{x^{2}}{40}",
            "domain": [0, 40],
            "label": "45°",
            "labelAt": 20,
            "pos": "above"
          },
          {
            "type": "fn",
            "id": "a30",
            "expr": "\\frac{x}{\\sqrt{3}} - \\frac{x^{2}}{60}",
            "domain": [0, 34.641],
            "label": "30°",
            "labelAt": 17.32,
            "pos": "above",
            "style": "dash"
          },
          {"type": "point", "at": [34.641, 0], "on": ["a30", "a60"], "is": "intersection"},
          {"type": "point", "at": [40, 0], "on": ["a45"], "is": "x-intercept"}
        ]
      }
    },
    "remember": "Vertical motion sets the time in the air. Range is horizontal speed times that time, and 45° gives the longest range.",
    "a": {
      "q": "Two balls are kicked from level ground at the same speed, one at 30° and one at 60°. Ignoring air resistance, which statement is correct?",
      "opts": [
        "The 60° ball is in the air longer",
        "The 30° ball is in the air longer",
        "Both balls are in the air for the same time",
        "The 60° ball travels much further than the 30° ball"
      ],
      "why": "The 60° ball has the larger vertical velocity, v sin θ, so it stays up longer. The ranges are equal: sin 2θ is sin 60° for the 30° kick and sin 120° for the 60° kick, and these two values are equal. So the 60° ball does not go further.",
      "clue": "Which angle gives the larger vertical part of the velocity?"
    },
    "b": {
      "d": 3,
      "q": "Priya kicks a ball from level ground at 20 m/s. She wants the greatest range and ignores air resistance. Which launch angle should she choose?",
      "opts": [
        "45°, which makes sin 2θ largest",
        "30°, so the ball keeps more horizontal speed",
        "60°, so the ball stays in the air longer",
        "90°, so the ball reaches the greatest height"
      ],
      "why": "Range is v² sin 2θ ÷ g, and sin 2θ is largest at 45°. A steeper angle gives more time in the air but less horizontal speed, and a flatter angle does the reverse. A 90° launch goes straight up and has no range.",
      "clue": "Range depends on both horizontal speed and time in the air."
    }
  },
  "phys-uniform-circular-motion": {
    "title": "Uniform circular motion",
    "card": [
      "In uniform circular motion, an object moves in a circle at constant speed. Its velocity still changes, because the direction keeps changing.",
      "A change in velocity is an acceleration. So the object accelerates towards the centre of the circle, even though its speed stays the same.",
      "By Newton's second law, this acceleration needs a net force towards the centre. This is the centripetal force: F = mv²/r, where m is mass, v is speed and r is the radius.",
      "Centripetal force is not a new kind of force. It is the name for the net force towards the centre, supplied by tension, gravity, friction or another force."
    ],
    "remember": "Circular motion at constant speed means acceleration and net force towards the centre.",
    "a": {
      "q": "A ball on a string is swung in a horizontal circle at constant speed. Which statement about the ball is correct?",
      "opts": [
        "It accelerates towards the centre of the circle",
        "It has zero acceleration because its speed is constant",
        "It accelerates in the direction it is moving",
        "It accelerates away from the centre of the circle"
      ],
      "why": "Velocity includes direction, and the direction keeps changing, so the ball accelerates towards the centre. Zero acceleration is tempting because the speed is constant, but speed is only part of velocity.",
      "clue": "Velocity has direction as well as speed."
    },
    "b": {
      "d": 3,
      "q": "A 2.0 kg trolley moves at 3.0 m/s in a circle of radius 1.5 m. What is the net force towards the centre?",
      "opts": ["12 N", "4.0 N", "18 N", "6.0 N"],
      "why": "F = mv²/r = 2.0 × 3.0² ÷ 1.5 = 12 N. Using v instead of v² gives 4.0 N, which is the tempting mistake.",
      "clue": "The speed is squared in the formula."
    }
  },
  "phys-banked-curves": {
    "title": "Banked curves",
    "card": [
      "On a flat road, friction between the tyres and the road supplies the force that turns a car. If the road is wet or icy, this friction can be too small.",
      "On a banked curve, the road is tilted towards the centre of the curve. The normal force is at right angles to the road, so it tilts towards the centre too.",
      "The horizontal part of the normal force points to the centre of the circle. It supplies the centripetal force. The vertical part balances the car's weight.",
      "For a given radius and bank angle, there is one design speed where the normal force alone supplies the centripetal force. At that speed the car does not rely on friction to take the curve."
    ],
    "remember": "A banked road turns part of the normal force towards the centre, so the car can corner without relying on friction.",
    "a": {
      "q": "On a banked curve, which force provides the centripetal force at the design speed?",
      "opts": [
        "The horizontal part of the normal force",
        "The car's weight acting down the slope",
        "The friction between the tyres and the road",
        "The engine force pushing the car forward"
      ],
      "why": "The normal force is at right angles to the tilted road, so part of it points towards the centre of the curve. At the design speed this part alone supplies the centripetal force. Friction is the tempting answer, but a banked curve is designed so that the car does not rely on it.",
      "clue": "The road is tilted, so which force tilts with it?"
    },
    "b": {
      "d": 3,
      "q": "A banked curve in Bathurst is designed for a speed of 80 km/h. A car takes it at exactly that speed on a road made slippery by ice. What happens?",
      "opts": [
        "The car can still turn, as the normal force is enough",
        "The car slides outwards, as friction is needed at any speed",
        "The car slides inwards, as the normal force is too large",
        "The car cannot turn, as the vertical force is too small"
      ],
      "why": "At the design speed the horizontal part of the normal force alone gives the required centripetal force, so the car does not need friction. Ice removes friction, but it is not needed here. The tempting answer is that friction is always needed, which is true on a flat road but not at the design speed of a banked curve.",
      "clue": "At the design speed, is friction part of the force that turns the car?"
    }
  },
  "phys-torque": {
    "title": "Torque",
    "card": [
      "Torque is the turning effect of a force about a pivot. It is measured in newton metres (N m).",
      "τ = r F sin θ. Here r is the distance from the pivot to where the force acts, F is the force, and θ is the angle between the force and the line from the pivot.",
      "For the same force, a larger r gives a larger torque. This is why a longer spanner turns a tight nut more easily.",
      "A force pushing at right angles (θ = 90°) to the line from the pivot gives the most torque. A force along that line (θ = 0°) gives zero torque."
    ],
    "remember": "Torque depends on the force, the distance from the pivot, and the angle.",
    "a": {
      "q": "Why does a longer spanner make a tight nut easier to turn?",
      "opts": [
        "The same force acts at a greater distance, so torque is more",
        "The longer spanner makes the force on the nut larger",
        "The longer spanner gives the nut more mass to turn",
        "The angle of the force is larger with a longer spanner"
      ],
      "why": "Torque is r F sin θ, so a larger r gives a larger torque for the same force. The force itself is not made bigger by the spanner. Only the distance from the pivot changes.",
      "clue": "Which part of τ = r F sin θ changes with spanner length?"
    },
    "b": {
      "d": 3,
      "q": "Priya pushes on a door with a force of 20 N. The door is 0.90 m wide and she pushes at the handle edge, at 90° to the door. What is the torque about the hinges?",
      "opts": ["18 N m", "22 N m", "0 N m", "1.8 N m"],
      "why": "τ = r F sin θ = 0.90 × 20 × sin 90° = 18 N m. The torque is not zero, because the push is at right angles to the line from the hinges, which gives the largest sin θ value of 1.",
      "clue": "sin 90° equals 1, so multiply distance by force."
    }
  },
  "phys-newton-s-law-universal": {
    "title": "Newton's law of universal gravitation",
    "card": [
      "Every two masses attract each other. The forces are equal in size and opposite in direction, whatever the masses are.",
      "The size of the force is F = GMm/r². M and m are the two masses in kg, r is the distance between their centres in metres, and G is the universal gravitational constant.",
      "F is proportional to each mass. Doubling one mass doubles F.",
      "F is inversely proportional to r². Doubling the distance cuts F to one quarter, and halving the distance makes F four times larger."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "Gravitational force against the distance between the centres of two masses: a curve that falls steeply, then flattens. At distance r the force is F. At distance 2r it is one quarter of F, because F is inversely proportional to r squared.",
        "x": {"min": 0, "max": 8, "label": "Distance, r"},
        "y": {"min": 0, "max": 6.4, "label": "Force, F"},
        "items": [
          {"type": "fn", "id": "f", "expr": "\\frac{18}{x^{2}}", "domain": [1.75, 8]},
          {"type": "guide", "at": [2, 4.5], "xLabel": "\\(r\\)", "yLabel": "\\(F\\)"},
          {"type": "point", "at": [2, 4.5], "on": ["f"]},
          {"type": "guide", "at": [4, 1.125], "xLabel": "\\(2r\\)", "yLabel": "\\(\\frac{F}{4}\\)"},
          {"type": "point", "at": [4, 1.125], "on": ["f"]}
        ]
      }
    },
    "remember": "Force grows with both masses and falls with the square of the distance between centres.",
    "a": {
      "q": "The distance between the centres of two masses is tripled. The masses stay the same. What happens to the gravitational force between them?",
      "opts": [
        "It becomes one ninth of its original size",
        "It becomes one third of its original size",
        "It becomes three times its original size",
        "It becomes nine times its original size"
      ],
      "why": "F is proportional to 1/r², so tripling r divides F by 3², which is 9. One third is tempting, but it treats the force as inversely proportional to r rather than to r².",
      "clue": "The distance is squared in the formula."
    },
    "b": {
      "d": 3,
      "q": "A 2000 kg probe is near a moon. The moon pulls on the probe with a force of 800 N. What is the force the probe exerts on the moon?",
      "opts": [
        "800 N, directed towards the probe",
        "800 N, directed away from the probe",
        "Far less than 800 N, as the probe has less mass",
        "Far more than 800 N, as the moon has more mass"
      ],
      "why": "The two forces are an equal and opposite pair, so the probe pulls on the moon with 800 N towards the probe. The moon's larger mass does not make its pull on the probe larger than the probe's pull on it. It only means the moon's acceleration is far smaller.",
      "clue": "The card says the two forces are equal in size."
    }
  },
  "phys-gravitational-field-strength": {
    "title": "Gravitational field strength",
    "card": [
      "Gravitational field strength, g, is the gravitational force on each kilogram placed at a point. It is measured in newtons per kilogram (N/kg), and g = F/m.",
      "Around a mass M, at a distance r from its centre, g = GM/r². It does not depend on the mass placed in the field, only on M and r.",
      "The field gets weaker with distance. Doubling r makes g one quarter as large. A larger M makes g larger.",
      "At the Earth's surface, g is about 9.8 N/kg. The force on a mass m is F = mg, so a 2.0 kg object feels about 19.6 N."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Gravitational field strength against distance from the Earth's centre, from the surface outwards. At the surface, a distance r from the centre, g is 9.8 N/kg. At 2r it is 2.45 N/kg, one quarter as large, and the field keeps getting weaker further out.",
        "x": {"min": 0, "max": 5, "label": "Distance from centre"},
        "y": {"min": 0, "max": 11, "label": "g (N/kg)"},
        "items": [
          {"type": "fn", "id": "g", "expr": "\\frac{9.8}{x^{2}}", "domain": [1, 5]},
          {"type": "guide", "at": [1, 9.8], "xLabel": "\\(r\\)", "yLabel": "9.8"},
          {"type": "point", "at": [1, 9.8], "on": ["g"], "label": "surface", "pos": "right"},
          {"type": "guide", "at": [2, 2.45], "xLabel": "\\(2r\\)", "yLabel": "2.45"},
          {"type": "point", "at": [2, 2.45], "on": ["g"]}
        ]
      }
    },
    "remember": "g = GM/r²: it depends on the mass creating the field and the distance, not on the object in it.",
    "a": {
      "q": "A 3.0 kg object and a 6.0 kg object are placed at the same point near a planet. How do the field strengths at that point compare?",
      "opts": [
        "They are the same, because g depends only on M and r",
        "The 6.0 kg object has twice the g",
        "The 3.0 kg object has twice the g",
        "The 6.0 kg object has four times the g"
      ],
      "why": "The field strength at a point is set by the mass creating the field and the distance from it, so both objects are in the same g. The 6.0 kg object feels twice the force, but force per kilogram is unchanged.",
      "clue": "g is force per kilogram, so mass of the object cancels."
    },
    "b": {
      "d": 3,
      "q": "At the surface of a planet, g is 12 N/kg. What is g at a point three planet radii above the surface, measured from the centre at 4 times the radius?",
      "opts": ["0.75 N/kg", "3.0 N/kg", "4.0 N/kg", "48 N/kg"],
      "why": "The distance from the centre is 4 times larger, so g falls to 1/4² = 1/16 of its value. 12 ÷ 16 = 0.75 N/kg. Dividing by 4 is the tempting mistake, as it forgets the square in r².",
      "clue": "Distance is squared in the formula, so the factor is squared too."
    }
  },
  "phys-orbital-motion": {
    "title": "Orbital motion",
    "card": [
      "A satellite in a circular orbit is always accelerating towards the centre. Gravity from the central mass is the only force providing this centripetal force.",
      "Set the two equal: GMm/r² = mv²/r. The satellite's mass m cancels, so v = √(GM/r).",
      "Here M is the mass being orbited and r is the distance from its centre. Orbital speed depends only on M and r, not on the satellite's own mass.",
      "A larger orbital radius gives a smaller speed. Two satellites at the same radius around the same planet move at the same speed, even if their masses differ."
    ],
    "remember": "Gravity is the centripetal force, so v = √(GM/r): only M and r matter.",
    "a": {
      "q": "Two satellites orbit Earth at the same radius. One has twice the mass of the other. How do their orbital speeds compare?",
      "opts": ["They are equal", "The heavier one is faster", "The heavier one is slower", "The heavier one is twice as fast"],
      "why": "Gravity provides the centripetal force, and the satellite's mass cancels from both sides of the equation. Speed depends only on Earth's mass and the orbital radius, so both move at the same speed. A heavier satellite feels more gravity, but it also needs more force to turn, so the effects cancel.",
      "clue": "What happens to m when you set GMm/r² equal to mv²/r?"
    },
    "b": {
      "d": 3,
      "q": "Satellite X orbits a planet at radius r. Satellite Y orbits the same planet at radius 4r. What is the ratio of the speed of Y to the speed of X?",
      "opts": ["1 : 2", "1 : 4", "2 : 1", "4 : 1"],
      "why": "Speed is v = √(GM/r), so speed is proportional to 1/√r. Radius 4 times larger gives a speed half as large, so Y to X is 1 : 2. The tempting 1 : 4 forgets the square root.",
      "clue": "Speed depends on the square root of 1/r."
    }
  },
  "phys-kepler-s-laws": {
    "title": "Kepler's laws",
    "card": [
      [
        "First law",
        "Each planet moves in an ellipse, with the Sun at one focus. An ellipse is a stretched circle, and a circle is a special case."
      ],
      [
        "Second law",
        "A line from the Sun to a planet sweeps out equal areas in equal times. So a planet moves faster when it is closer to the Sun and slower when it is further away."
      ],
      [
        "Third law",
        "For bodies orbiting the same central mass, r³/T² is the same constant. Here r is the orbital radius (the average distance for an ellipse) and T is the orbital period."
      ],
      "So a larger orbit has a longer period. If two bodies orbit the same mass, r₁³/T₁² = r₂³/T₂²."
    ],
    "remember": "Ellipses, equal areas in equal times, and r³/T² constant for one central mass.",
    "a": {
      "q": "A comet orbits the Sun in an ellipse. Where in its orbit is the comet moving fastest?",
      "opts": [
        "At its closest point to the Sun",
        "At its furthest point from the Sun",
        "At the midpoint of its path, at the average distance",
        "It moves at the same speed everywhere"
      ],
      "why": "The line to the Sun sweeps equal areas in equal times. Near the Sun the line is short, so the comet must cover more distance along its path to sweep the same area. Constant speed would only suit a circular orbit, and the first law says orbits are ellipses.",
      "clue": "A short line to the Sun must cover more path to sweep the same area."
    },
    "b": {
      "d": 3,
      "q": "Moon A orbits a planet at a radius of 4.0 × 10⁵ km with a period of 2.0 days. Moon B orbits the same planet at a radius of 1.6 × 10⁶ km. What is the period of Moon B?",
      "opts": ["16 days", "8.0 days", "4.0 days", "32 days"],
      "why": "Both moons orbit the same planet, so r³/T² is equal. The radius is 4 times larger, so r³ and T² are both 64 times larger, and T is √64 = 8 times larger: 16 days. Choosing 8.0 days wrongly treats T as proportional to r, so it multiplies the period by 4 instead of 8.",
      "clue": "Find how many times larger r³ is, then take the square root for T."
    }
  },
  "phys-escape-velocity-gravitational-potential": {
    "title": "Escape velocity and gravitational potential energy",
    "card": [
      "Gravitational potential energy between two masses is U = -GMm/r, where r is the distance between their centres. It is zero at infinite distance and negative everywhere closer.",
      "Moving a mass away from a planet raises U towards zero, so work must be done on it. Moving closer lowers U, making it more negative.",
      "Escape velocity is the launch speed needed to leave a planet's gravity with no further thrust. The object must reach infinity with at least zero kinetic energy.",
      "So the starting kinetic energy must cancel the negative U: ½mv² = GMm/r. This gives v = √(2GM/r). The mass m cancels, so escape velocity does not depend on the mass of the object."
    ],
    "cardFigs": {
      "1": {
        "kind": "graph",
        "alt": "Gravitational potential energy against the distance between the centres. The curve is below the axis everywhere, so U is negative. It rises steeply at first and then flattens, getting closer and closer to zero as the distance grows, without reaching it.",
        "x": {"min": 0, "max": 10, "label": "\\(r\\)"},
        "y": {"min": -5.5, "max": 1.6, "label": "Energy, U"},
        "items": [
          {
            "type": "fn",
            "id": "u",
            "expr": "-\\frac{4}{x}",
            "domain": [0.75, 8.6],
            "label": "\\(U = -\\frac{GMm}{r}\\)",
            "labelAt": 3,
            "pos": "below-right"
          },
          {"type": "text", "at": [7.4, -0.6], "label": "U rises to 0", "pos": "below"}
        ]
      }
    },
    "remember": "U is negative and rises to zero at infinity. Escape speed is the launch speed that makes total energy zero.",
    "a": {
      "q": "A rocket moves from the Earth's surface to a point far above it. What happens to its gravitational potential energy U?",
      "opts": [
        "It increases, becoming less negative",
        "It decreases, becoming more negative",
        "It stays the same, as U is always zero",
        "It increases, becoming more positive than zero"
      ],
      "why": "U = -GMm/r, so a larger r gives a smaller negative number, which is a higher value. U rises towards zero but never passes it. The idea that U gets more negative with height mixes up the sign with the size of the number.",
      "clue": "Think about what happens to -GMm/r as r gets very large."
    },
    "b": {
      "d": 3,
      "q": "Two probes leave the same planet. Probe X has mass 200 kg and probe Y has mass 800 kg. What can be said about the escape velocity of each?",
      "opts": [
        "They are the same, as mass cancels out",
        "Y needs a higher speed, as it is heavier",
        "X needs a higher speed, as it has less inertia",
        "Y needs a lower speed, as gravity pulls it harder"
      ],
      "why": "Setting ½mv² = GMm/r cancels m, leaving v = √(2GM/r). Only the planet's mass and the starting distance matter. A heavier probe needs more energy in total, but not more speed.",
      "clue": "Look at what happens to m when kinetic energy is set equal to GMm/r."
    }
  },
  "phys-charges-electric-fields": {
    "title": "Charges in electric fields",
    "card": [
      "Two parallel plates with a potential difference V across them, set a distance d apart, make a uniform electric field between them. Its strength is E = V/d.",
      "A charge q in this field feels a force F = qE. The force is the same at every point between the plates. It points along the field for a positive charge and against it for a negative charge.",
      "A charge that enters at right angles to the field keeps a constant velocity along the plates, because there is no force in that direction. Across the plates it has constant acceleration a = F/m, as in projectile motion.",
      "The path is a parabola while the charge is between the plates. Once it leaves the plates, there is no force and it moves in a straight line."
    ],
    "remember": "Between plates the force is constant, so a charge follows a parabola like a projectile.",
    "a": {
      "q": "A proton enters the space between two charged parallel plates, moving parallel to them. What is the path of the proton between the plates?",
      "opts": [
        "A parabola, curving towards the negative plate",
        "A circle, centred between the plates",
        "A straight line, parallel to the plates",
        "A parabola, curving towards the positive plate"
      ],
      "why": "The field gives a constant force across the plates, while there is no force along them. Constant acceleration in one direction with constant velocity in the other gives a parabola. A proton is positive, so it curves towards the negative plate. A circle would need a force that always changes direction.",
      "clue": "Think of a ball thrown sideways under gravity."
    },
    "b": {
      "d": 3,
      "q": "Two plates 0.040 m apart have a potential difference of 200 V across them. An electron (charge 1.6 × 10⁻¹⁹ C) is between them. What is the size of the force on it?",
      "opts": ["8.0 × 10⁻¹⁶ N", "3.2 × 10⁻¹⁷ N", "6.4 × 10⁻²² N", "1.3 × 10⁻²¹ N"],
      "why": "E = V/d = 200 ÷ 0.040 = 5000 V/m. F = qE = 1.6 × 10⁻¹⁹ × 5000 = 8.0 × 10⁻¹⁶ N. Using V in place of E gives 3.2 × 10⁻¹⁷ N, which skips the step of dividing by the distance.",
      "clue": "Find the field strength first, then the force."
    }
  },
  "phys-charges-magnetic-fields": {
    "title": "Charges in magnetic fields",
    "card": [
      "A charge moving in a magnetic field feels a force F = qvB sin θ. Here q is the charge, v is its speed, B is the field strength and θ is the angle between the velocity and the field.",
      "The force is at right angles to both the velocity and the field. A charge at rest, or one moving along the field (θ = 0°), feels no force.",
      "The force changes the direction of the motion but not the speed, so it does no work. If the velocity is at right angles to the field, the charge moves in a circle, with the magnetic force acting as the centripetal force: qvB = mv²/r.",
      "This gives the radius r = mv/qB. A faster or heavier particle moves in a bigger circle. A stronger field or a larger charge makes the circle smaller."
    ],
    "remember": "The magnetic force is sideways to the motion, so it turns the charge and never speeds it up.",
    "a": {
      "q": "A proton moves at right angles to a uniform magnetic field. What happens to its speed while it moves in the field?",
      "opts": [
        "It stays constant, as the force only changes direction",
        "It increases, as the force acts on the proton",
        "It decreases, as the field slows moving charges",
        "It rises on half the circle and falls on the other half"
      ],
      "why": "The magnetic force is at right angles to the velocity, so it does no work on the proton. Its direction changes but its speed stays constant. The force does act on the proton, but it acts sideways rather than along the motion, so it cannot speed it up.",
      "clue": "Think about the direction of the force compared with the direction of motion."
    },
    "b": {
      "d": 3,
      "q": "Two electrons enter the same uniform magnetic field at right angles to it. Electron X has twice the speed of electron Y. How do their circular paths compare?",
      "opts": [
        "X's circle has twice the radius of Y's",
        "X's circle has half the radius of Y's",
        "X's circle has four times the radius of Y's",
        "Both circles have the same radius"
      ],
      "why": "Since r = mv/qB, and m, q and B are the same for both electrons, the radius is proportional to speed, so X's radius is twice Y's. Four times is tempting because mv²/r contains v squared, but the force qvB on X also doubles, which cancels one factor of v.",
      "clue": "Use r = mv/qB and see which quantities are the same for both electrons."
    }
  },
  "phys-force-current-carrying-wire": {
    "title": "Force on a current-carrying wire",
    "card": [
      "A current is a flow of moving charges. A wire carrying current in a magnetic field therefore feels a force, as each moving charge does.",
      "The size of the force is F = BIL sin θ. B is the field strength in tesla, I is the current in amperes, L is the length of wire in the field in metres, and θ is the angle between the wire and the field.",
      "The force is greatest when the wire is at right angles to the field (θ = 90°). It is zero when the wire runs parallel to the field (θ = 0°).",
      "The force is at right angles to both the wire and the field. For direction, point your right thumb along the conventional current and your fingers along the field. The palm pushes in the direction of the force."
    ],
    "remember": "F = BIL sin θ: the force is biggest at 90° to the field and zero when parallel.",
    "a": {
      "q": "A straight wire carries a current in a uniform magnetic field. For which angle between the wire and the field is the force on the wire zero?",
      "opts": [
        "0°, with the wire parallel to the field",
        "90°, with the wire at right angles to the field",
        "45°, with the wire halfway between",
        "60°, with the wire tilted towards the field"
      ],
      "why": "The force is F = BIL sin θ, and sin 0° = 0. A wire parallel to the field feels no force. At 90° the sine is 1, so that is where the force is greatest, not zero.",
      "clue": "Check what sin θ equals for each angle."
    },
    "b": {
      "d": 3,
      "q": "A 0.20 m length of wire carries 5.0 A at right angles to a uniform field of 0.30 T. What is the force on the wire?",
      "opts": ["0.30 N", "0.12 N", "1.5 N", "7.5 N"],
      "why": "F = BIL sin θ = 0.30 × 5.0 × 0.20 × sin 90° = 0.30 N. The value 1.5 N comes from leaving out the length L, which is the tempting mistake.",
      "clue": "At 90°, sin θ is 1, so multiply B, I and L."
    }
  },
  "phys-force-between-parallel-wires": {
    "title": "Force between parallel wires",
    "card": [
      "A current makes a magnetic field around its wire. A second wire nearby sits in that field, so it feels a force. By the same reasoning, the first wire feels a force from the second.",
      ["Same direction", "two parallel wires with currents in the same direction attract each other."],
      ["Opposite directions", "two parallel wires with currents in opposite directions repel each other."],
      "The force on each wire per metre of length is F/L = μ₀I₁I₂ ÷ 2πr. Here I₁ and I₂ are the currents, r is the distance between the wires and μ₀ is a constant. The two forces are equal in size and opposite in direction."
    ],
    "remember": "Same direction attracts, opposite repels. Force per metre grows with the currents and falls with distance.",
    "a": {
      "q": "Two long parallel wires carry currents in the same direction. What happens between the wires?",
      "opts": [
        "They attract each other",
        "They repel each other",
        "They exert no force on each other",
        "Only the wire with the larger current feels a force"
      ],
      "why": "Each wire sits in the magnetic field of the other, so each feels a force. When the currents run the same way, the forces pull the wires together. The larger current does not change this: both wires feel equal forces.",
      "clue": "Each wire is in the field of the other, and the forces are equal."
    },
    "b": {
      "d": 3,
      "q": "Two parallel wires are 0.10 m apart. Wire 1 carries 4.0 A and wire 2 carries 6.0 A. The distance is then doubled. What happens to the force per metre on wire 1?",
      "opts": ["It halves", "It doubles", "It quarters", "It stays the same"],
      "why": "The force per metre is μ₀I₁I₂ ÷ 2πr, so it is inversely proportional to r. Doubling r halves the force. It does not quarter, because r is not squared in this formula.",
      "clue": "Look at how r appears in the formula."
    }
  },
  "phys-dc-motors": {
    "title": "DC motors",
    "card": [
      "A DC motor has a coil of wire between the poles of a magnet. Current runs in opposite directions along the coil's two long sides, so the field pushes them in opposite directions and makes a torque that turns the coil.",
      "If the current never reverses, the torque turns the coil only about a quarter turn, until its plane is at right angles to the field. In that position the torque is zero.",
      "The coil overshoots that position, and the torque then pulls it back. It swings back and forth about this position until friction brings it to rest there.",
      [
        "Split-ring commutator",
        "a ring cut into two halves, joined to the ends of the coil. It reverses the current in the coil every half turn, so the torque keeps pushing the same way and the coil keeps spinning."
      ]
    ],
    "remember": "Opposite forces on the two sides turn the coil. The commutator reverses the current each half turn to keep it turning the same way.",
    "a": {
      "q": "What is the job of the split-ring commutator in a DC motor?",
      "opts": [
        "It reverses the coil current every half turn",
        "It reverses the magnetic field every half turn",
        "It stops the current flowing through the coil",
        "It makes the forces on both sides point the same way"
      ],
      "why": "Reversing the current every half turn keeps the torque acting in the same turning direction. The magnet's field is not changed by the commutator. The forces on the two sides still point in opposite directions, which is what produces the torque.",
      "clue": "Think about what must change so the torque does not reverse."
    },
    "b": {
      "d": 3,
      "q": "Dev builds a simple DC motor, but the split ring is replaced by two solid rings, so the current never reverses. The coil is released with its plane parallel to the field. What is most likely to happen?",
      "opts": [
        "It swings about the quarter-turn position, then stops",
        "It keeps spinning faster in one direction without stopping",
        "It stays still because the forces on both sides cancel out",
        "It turns a half turn, then stops with its plane parallel"
      ],
      "why": "The torque turns the coil about a quarter turn, to where its plane is at right angles to the field and the torque is zero. It overshoots, is pulled back, and friction stops it there. It does not reach a half turn, because past the quarter turn the torque acts against its motion.",
      "clue": "Where is the torque zero when the current never reverses?"
    }
  },
  "phys-magnetic-flux": {
    "title": "Magnetic flux",
    "card": [
      "Magnetic flux is the amount of magnetic field passing through an area. It is measured in webers (Wb).",
      "Φ = BA cos θ. B is the magnetic field strength in tesla, and A is the area of the loop in square metres.",
      "θ is the angle between the magnetic field and the normal, a line at right angles to the surface of the loop. It is not the angle between the field and the surface.",
      "Flux is greatest when the field is along the normal (θ = 0°, cos θ = 1). It is zero when the field runs parallel to the surface (θ = 90°, cos θ = 0)."
    ],
    "remember": "Flux depends on field strength, area and the angle between the field and the normal.",
    "a": {
      "q": "A flat coil sits in a uniform magnetic field. Which change to the coil would reduce the flux through it to zero?",
      "opts": [
        "Turning it until the field runs parallel to its surface",
        "Turning it until the field is along its normal",
        "Doubling the area of the coil",
        "Doubling the strength of the field"
      ],
      "why": "Flux is zero when cos θ = 0, which happens at θ = 90°. This is when the field runs parallel to the surface. Turning the coil so the field is along the normal gives the greatest flux, not zero, because the angle is then 0°.",
      "clue": "Zero flux means no field lines pass through the surface."
    },
    "b": {
      "d": 3,
      "q": "A square loop of side 0.20 m sits in a uniform 0.50 T field. The field is at 60° to the normal of the loop. What is the flux through the loop?",
      "opts": ["0.010 Wb", "0.020 Wb", "0.017 Wb", "0.0050 Wb"],
      "why": "A = 0.20 × 0.20 = 0.040 m². Φ = 0.50 × 0.040 × cos 60° = 0.010 Wb. Using 60° as the angle to the surface instead would give cos 30° and a wrong answer of 0.017 Wb.",
      "clue": "The angle in the formula is measured from the normal, and cos 60° = 0.5."
    }
  },
  "phys-faraday-s-law": {
    "title": "Faraday's law",
    "card": [
      "An emf is induced in a circuit when the magnetic flux through it changes. If the flux stays constant, no emf is induced.",
      "Faraday's law says the induced emf equals the rate of change of flux, for a coil of N turns: emf = -N × ΔΦ/Δt.",
      "The faster the flux changes, the bigger the emf. A coil with more turns gives a bigger emf for the same change in flux.",
      "Flux can change if the field strength changes, if the area changes, or if the angle between the field and the area changes."
    ],
    "remember": "No change in flux, no emf. A faster change gives a bigger emf.",
    "a": {
      "q": "A magnet is held still inside a coil of wire. Why is no emf induced in the coil?",
      "opts": [
        "The magnetic flux through the coil is not changing",
        "The magnetic flux through the coil is zero",
        "The magnet is too weak to produce any flux",
        "The coil has no turns of wire in the field"
      ],
      "why": "An emf needs a changing flux, and a still magnet gives a steady flux. The flux is not zero, so a strong field alone is not enough to induce an emf.",
      "clue": "What must the flux be doing for an emf to appear?"
    },
    "b": {
      "d": 3,
      "q": "A coil of 100 turns has the flux through it fall from 0.050 Wb to 0.020 Wb in 0.10 s. What is the size of the average induced emf?",
      "opts": ["30 V", "0.30 V", "3.0 V", "300 V"],
      "why": "Change in flux = 0.030 Wb. emf = N × ΔΦ/Δt = 100 × 0.030 ÷ 0.10 = 30 V. Leaving out the number of turns gives 0.30 V, which is the tempting mistake.",
      "clue": "Multiply the rate of change of flux by the number of turns."
    }
  },
  "phys-lenz-s-law": {
    "title": "Lenz's law",
    "card": [
      "When the magnetic flux through a coil changes, a current is induced in the coil. Lenz's law gives the direction of that current.",
      "The induced current flows in the direction that opposes the change in flux that caused it. It opposes the change, not the flux itself.",
      "If the flux through a coil is increasing, the induced current makes a field that points opposite to the original field. If the flux is decreasing, it makes a field that points the same way, to try to keep the flux up.",
      "This follows from conservation of energy. If the induced current helped the change, the change would grow on its own and energy would appear from nothing. Instead, work must be done to move a magnet against the coil, and that work becomes electrical energy."
    ],
    "remember": "The induced current fights the change in flux, because anything else would create energy from nothing.",
    "a": {
      "q": "The north pole of a bar magnet is pushed towards a coil. What does the induced current in the coil do?",
      "opts": [
        "Makes a field that opposes the increase in flux",
        "Makes a field that adds to the magnet's field",
        "Flows only after the magnet stops moving",
        "Makes a field that cancels the magnet's field everywhere"
      ],
      "why": "Pushing the magnet in increases the flux, so the induced current makes a field that opposes that increase. The option where the field adds to the magnet's field is tempting, but a field that helped the change would make the flux grow even faster, which would create energy from nothing.",
      "clue": "The current acts against the change that causes it."
    },
    "b": {
      "d": 3,
      "q": "A magnet is pulled away from a coil at constant speed. Why must the person pulling do work, according to Lenz's law?",
      "opts": [
        "The induced current opposes the change and resists the pull",
        "The induced current helps the change and assists the pull",
        "The magnet loses its magnetism as it leaves the coil",
        "The coil's flux stays constant, so energy is stored in it"
      ],
      "why": "Pulling the magnet away decreases the flux. The induced current opposes this decrease, so the coil pulls back on the magnet and work must be done against it, which supplies the electrical energy. The option where the current assists the pull is wrong, because it would speed the magnet up and create energy from nothing.",
      "clue": "Think about where the electrical energy comes from."
    }
  },
  "phys-generators": {
    "title": "Generators",
    "card": [
      "A generator turns a coil in a magnetic field. The flux through the coil keeps changing, so an emf is induced in the coil.",
      "As the coil turns, each side moves up through the field and then down through it. The emf reverses direction every half turn, so it is alternating.",
      [
        "Slip rings",
        "two full rings, each joined to one end of the coil. They keep the same connection to the circuit all the time, so the output is AC."
      ],
      [
        "Commutator",
        "a split ring that swaps the connections every half turn. The current in the circuit then flows one way only, so the output is DC."
      ]
    ],
    "remember": "A turning coil induces an alternating emf. Slip rings pass it on as AC, and a commutator flips the connections to give DC.",
    "a": {
      "q": "Why does the emf induced in a turning generator coil alternate?",
      "opts": [
        "Each side moves up, then down, through the field",
        "The magnetic field reverses direction every half turn",
        "The coil stops moving at the top of each turn",
        "The coil switches between a field and no field"
      ],
      "why": "As the coil turns, each side moves through the field in one direction and then the opposite direction, so the induced emf reverses every half turn. The magnet itself does not change, so the field does not reverse.",
      "clue": "In a generator, what stays fixed and what keeps changing?"
    },
    "b": {
      "d": 2,
      "q": "A student builds a simple generator and wants the output to be DC. Which part should be fitted to the coil?",
      "opts": ["A commutator", "A pair of slip rings", "A second magnet", "A longer coil"],
      "why": "A commutator is a split ring that swaps the connections every half turn, so the current in the circuit flows one way. Slip rings keep the same connections, so they would give AC.",
      "clue": "One part swaps the connections every half turn."
    }
  },
  "phys-back-emf-motors": {
    "title": "Back emf in motors",
    "card": [
      "A motor coil spins in a magnetic field. Its flux keeps changing, so it also acts as a generator and induces an emf in itself.",
      "By Lenz's law, this induced emf opposes the change that causes it. It acts against the supply voltage, so it is called the back emf.",
      "Back emf grows as the coil spins faster. The net voltage across the coil is the supply voltage minus the back emf. Current = net voltage ÷ coil resistance.",
      "At the instant of starting, the coil is not moving, so there is no back emf. The net voltage is largest and so is the current. As the motor speeds up, the back emf rises and the current falls."
    ],
    "remember": "Faster spinning means more back emf, so less net voltage and less current.",
    "a": {
      "q": "A motor is switched on and its coil begins to spin faster. What happens to the back emf and the current drawn?",
      "opts": [
        "Back emf rises and current falls",
        "Back emf rises and current rises",
        "Back emf falls and current falls",
        "Back emf falls and current rises"
      ],
      "why": "A faster coil changes its flux more quickly, so the back emf rises. This cuts the net voltage across the coil, so the current falls. Current does not rise with speed, because the back emf opposes the supply.",
      "clue": "Net voltage is supply minus back emf."
    },
    "b": {
      "d": 3,
      "q": "A drill in Tom's workshop jams, and its coil stops spinning while it is still switched on. What happens to the current in the coil?",
      "opts": [
        "It rises sharply, because the back emf drops to zero",
        "It falls, because the coil is no longer moving",
        "It stays the same, because the supply voltage is fixed",
        "It falls, because the back emf rises as the coil stops"
      ],
      "why": "A stopped coil has no changing flux, so the back emf falls to zero. The net voltage across the coil is then at its largest, so the current is very high and can overheat the coil. The supply voltage is fixed, but the net voltage is not.",
      "clue": "Think about the instant a motor starts, when the coil is still."
    }
  },
  "phys-transformers": {
    "title": "Transformers",
    "card": [
      "A transformer has a primary coil and a secondary coil wound on a shared iron core. An alternating current in the primary makes a changing magnetic flux in the core, which induces an emf in the secondary.",
      "The voltages depend on the number of turns: Vp/Vs = Np/Ns. More turns on the secondary than the primary gives a higher voltage (step-up). Fewer turns gives a lower voltage (step-down).",
      "A steady direct current gives a constant flux, so no emf is induced in the secondary. A transformer needs a changing current to work.",
      "Power lines use high voltage. For the same power, a higher voltage means a smaller current, and less energy is lost as heat in the wires (P = I²R)."
    ],
    "remember": "Voltage ratio matches turns ratio. High voltage means low current, so less heat lost in the lines.",
    "a": {
      "q": "A transformer has 200 turns on its primary coil and 1000 turns on its secondary coil. The primary is connected to a 12 V AC supply. What is the secondary voltage?",
      "opts": [
        "60 V, so it is a step-up transformer",
        "60 V, so it is a step-down transformer",
        "2.4 V, so it is a step-up transformer",
        "2.4 V, so it is a step-down transformer"
      ],
      "why": "Vs = Vp × Ns/Np = 12 × 1000/200 = 60 V. The secondary has more turns, so the voltage is stepped up. 2.4 V comes from flipping the ratio.",
      "clue": "Which coil has more turns, and what does that do to the voltage?"
    },
    "b": {
      "d": 3,
      "q": "A power station sends the same power along a long cable at 11 kV in one case and at 220 kV in the other. Why is less energy lost as heat at 220 kV?",
      "opts": [
        "The current is smaller, so I²R heating is smaller",
        "The cable resistance falls as the voltage rises",
        "The current is larger, so the energy moves faster",
        "The frequency changes, so the cable stays cooler"
      ],
      "why": "For the same power, P = VI, so a higher voltage means a smaller current. Heat loss is I²R, so it falls sharply. The cable's resistance does not change with the voltage applied to it, so that option is wrong.",
      "clue": "Use P = VI first, then think about I²R."
    }
  },
  "phys-ac-induction-motors": {
    "title": "AC induction motors",
    "card": [
      "In an AC induction motor, alternating current in the fixed outer coils (the stator) makes a magnetic field that rotates around the inside of the motor.",
      "This rotating field sweeps across the conductors of the rotor, the part that turns. The changing flux induces an emf and so a current in the rotor.",
      "The rotor current sits in the magnetic field, so it feels a force. By Lenz's law, the rotor turns to follow the field and so reduce the relative motion between them.",
      "No electrical supply is connected to the rotor, so the motor needs no brushes or commutator. These parts wear out, so an induction motor needs little upkeep."
    ],
    "remember": "The rotating field induces current in the rotor, and the rotor follows the field.",
    "a": {
      "q": "How does the rotor of an AC induction motor get its current?",
      "opts": [
        "It is induced by the rotating magnetic field",
        "It is carried in through brushes from the supply",
        "It is passed in through a commutator",
        "It comes from permanent magnets on the stator"
      ],
      "why": "The rotating field changes the flux through the rotor, so an emf and current are induced. Brushes are not needed, because the rotor has no electrical supply connected to it.",
      "clue": "Nothing is wired to the rotor."
    },
    "b": {
      "d": 2,
      "q": "A workshop in Wagga Wagga uses an AC induction motor to run a fan for many hours a day. Why does the motor need little upkeep?",
      "opts": [
        "It has no brushes that wear away",
        "It has no coils in the stator",
        "It uses a commutator to reverse current",
        "It needs no magnetic field to turn"
      ],
      "why": "The rotor current is induced, so no brushes touch the rotor and wear down. The stator does have coils, and the motor depends on a rotating magnetic field to turn.",
      "clue": "Think about which parts rub against each other and wear out."
    }
  },
  "phys-maxwell-electromagnetic-waves": {
    "title": "Maxwell and electromagnetic waves",
    "card": [
      "In the 1860s James Clerk Maxwell combined the laws of electricity and magnetism into one set of equations. They showed that a changing electric field produces a changing magnetic field, and the reverse.",
      "Maxwell's equations predicted that these linked fields can travel through space together as a wave, with no medium needed. The electric and magnetic fields oscillate at right angles to each other and to the direction the wave travels.",
      "The predicted speed depends only on two constants, the permittivity and permeability of free space: c = 1/√(μ₀ε₀). This gives about 3.00 × 10⁸ m/s, the measured speed of light.",
      "Maxwell concluded that light is an electromagnetic wave. Heinrich Hertz later produced and detected radio waves in the laboratory, and they behaved as Maxwell predicted."
    ],
    "remember": "Changing fields sustain each other as a wave, and its predicted speed matches light.",
    "a": {
      "q": "Why did Maxwell conclude that light is an electromagnetic wave?",
      "opts": [
        "His predicted wave speed matched the measured speed of light",
        "Light was shown to need a medium, as sound does",
        "Light was found to carry electric charge from the source",
        "His equations showed that only static fields can travel"
      ],
      "why": "His equations gave a wave speed of about 3.00 × 10⁸ m/s from two constants, matching the measured speed of light. The medium option is wrong because these waves need no medium to travel.",
      "clue": "Compare the predicted speed with a measured one."
    },
    "b": {
      "d": 3,
      "q": "A student says that an electromagnetic wave in a vacuum is a changing electric field travelling alone, with no magnetic field. Which reply matches Maxwell's prediction?",
      "opts": [
        "The changing electric and magnetic fields travel together",
        "The magnetic field only appears when the wave meets matter",
        "The magnetic field travels first, then the electric field",
        "The student is right, as only the electric field oscillates"
      ],
      "why": "Maxwell showed that a changing electric field produces a changing magnetic field and the reverse, so each sustains the other as the wave travels. The wave does not need matter for the magnetic part to exist.",
      "clue": "Each changing field produces the other."
    }
  },
  "phys-electromagnetic-spectrum": {
    "title": "The electromagnetic spectrum",
    "card": [
      "The electromagnetic spectrum is the family of electromagnetic waves. In order of increasing frequency, it is radio, microwave, infrared, visible, ultraviolet, X-ray and gamma rays.",
      "The waves differ only in wavelength and frequency. Higher frequency means shorter wavelength.",
      "All of them travel at the same speed, c, in a vacuum. Here c = fλ, so if the frequency goes up, the wavelength must go down.",
      "Gamma rays have the highest frequency and the shortest wavelength. Radio waves have the lowest frequency and the longest wavelength."
    ],
    "remember": "One family of waves: all travel at c in a vacuum, and only frequency and wavelength differ.",
    "a": {
      "q": "Which statement correctly compares X-rays with microwaves in a vacuum?",
      "opts": [
        "X-rays have a higher frequency and the same speed",
        "X-rays have a higher frequency and a higher speed",
        "X-rays have a lower frequency and the same speed",
        "X-rays have a shorter wavelength and a lower speed"
      ],
      "why": "X-rays are higher in frequency than microwaves, and so have a shorter wavelength. All electromagnetic waves travel at c in a vacuum, so the speed is the same. The tempting idea that higher frequency means faster is wrong, because c = fλ and the wavelength shortens to compensate.",
      "clue": "Does the speed in a vacuum change along the spectrum?"
    },
    "b": {
      "d": 3,
      "q": "A radio wave and a beam of ultraviolet light travel through a vacuum. Which statement is correct?",
      "opts": [
        "The radio wave has the longer wavelength",
        "The radio wave has the higher frequency",
        "The ultraviolet light reaches a target first",
        "The ultraviolet light has the longer wavelength"
      ],
      "why": "Radio waves have a lower frequency than ultraviolet, so by c = fλ they have a longer wavelength. Both travel at c in a vacuum, so neither arrives first. Choosing the ultraviolet as faster confuses frequency with speed.",
      "clue": "Both waves travel at c, so compare frequency and wavelength only."
    }
  },
  "phys-young-s-double-slit": {
    "title": "Young's double slit experiment",
    "card": [
      "In Young's experiment, light from one source passes through two narrow slits close together. The two beams overlap on a screen and make a pattern of bright and dark bands called fringes.",
      "Interference makes the bands. Where the waves arrive in phase, they add to give a bright fringe. Where they arrive out of phase, they cancel to give a dark fringe.",
      "Interference is a wave behaviour. A stream of simple particles would make two bright patches, so the fringes showed that light behaves as a wave.",
      "Bright fringes follow d sin θ = mλ. Here d is the slit separation, θ is the angle from the centre line, m is the order (0, 1, 2 and so on) and λ is the wavelength. Larger λ or smaller d spreads the fringes further apart."
    ],
    "remember": "Bright and dark fringes come from interference, so light behaves as a wave.",
    "a": {
      "q": "What does the pattern of bright and dark fringes in Young's experiment show about light?",
      "opts": [
        "It can interfere, so it behaves as a wave",
        "It travels in straight lines, so it is a particle stream",
        "It is bent by the slits, so it has mass",
        "It travels at different speeds through each slit"
      ],
      "why": "Bright and dark fringes come from waves adding and cancelling, which is interference. A stream of simple particles would give two bright patches, not alternating bands, so the straight-line particle idea does not fit.",
      "clue": "Which behaviour makes waves add and cancel?"
    },
    "b": {
      "d": 3,
      "q": "Mia shines red laser light through a double slit and sees fringes on a screen. She swaps to a blue laser, which has a shorter wavelength, and changes nothing else. What happens to the fringe spacing?",
      "opts": [
        "The fringes move closer together",
        "The fringes move further apart",
        "The fringes stay the same distance apart",
        "The fringes disappear"
      ],
      "why": "From d sin θ = mλ, with d fixed, a smaller λ gives a smaller sin θ for each order m. The fringes therefore sit closer together. They do not disappear, because blue light still interferes.",
      "clue": "With d fixed, what happens to sin θ when λ gets smaller?"
    }
  },
  "phys-diffraction-gratings": {
    "title": "Diffraction gratings",
    "card": [
      "A diffraction grating is a plate with a very large number of narrow, evenly spaced slits. Light passing through all the slits interferes to give bright lines.",
      "Bright lines form at angles where light from neighbouring slits arrives in phase. This happens when d sin θ = mλ, where d is the slit spacing and m = 0, 1, 2 and so on.",
      "With many slits, the bright lines are thin and sharp, with wide dark gaps between them. This makes them easier to measure than the broad fringes from two slits.",
      "For a given d, a longer wavelength gives a larger angle. So a grating spreads white light into colours and splits a light source into its separate wavelengths. Measuring θ lets us find λ."
    ],
    "remember": "More slits make sharper lines, and d sin θ = mλ links the angle to the wavelength.",
    "a": {
      "q": "Compared with a double slit of the same spacing, why is a diffraction grating better for measuring wavelengths?",
      "opts": [
        "Its bright lines are thin and sharp, so angles are precise",
        "Its bright lines are wider, so they are easier to see by eye",
        "It blocks light of some wavelengths so fewer colours remain",
        "It sends all the wavelengths out at one angle, so they merge"
      ],
      "why": "Light from many slits interferes to give thin, sharp bright lines, so the angle θ can be measured precisely. Wider lines would make the angle harder to read, not easier.",
      "clue": "Think about what many slits do to the width of each bright line."
    },
    "b": {
      "d": 3,
      "q": "A grating has slit spacing d. Red and blue light both pass through it. In the first order (m = 1), which statement is correct?",
      "opts": [
        "Red light is bent to a larger angle than blue light",
        "Blue light is bent to a larger angle than red light",
        "Red and blue light leave at the same angle",
        "Red light is not bent but blue light is"
      ],
      "why": "Since sin θ = mλ/d, a larger wavelength gives a larger angle for the same d and m. Red has a longer wavelength than blue, so it is bent more. The idea that shorter wavelengths bend more is a common mistake.",
      "clue": "Rearrange d sin θ = mλ to get sin θ on its own."
    }
  },
  "phys-polarisation": {
    "title": "Polarisation",
    "card": [
      "Light is a transverse wave, so its electric field can vibrate in many planes. Polarisation means the vibrations are limited to one plane.",
      "A polarising filter lets through only the part of the light vibrating along its transmission axis. Unpolarised light loses about half its intensity passing through a first filter.",
      "Polarised light then meets a second filter at angle θ between the two axes. Malus's law gives the intensity through it: I = I₀cos²θ, where I₀ is the intensity reaching the second filter.",
      "At θ = 0° all the light passes. At θ = 90° none passes. Only transverse waves can be polarised, so polarisation is evidence that light is a transverse wave."
    ],
    "remember": "A filter passes one plane of vibration. Through a second filter, I = I₀cos²θ.",
    "a": {
      "q": "What does polarisation of light show about the nature of light?",
      "opts": [
        "Light is a transverse wave",
        "Light is a longitudinal wave",
        "Light travels at a fixed speed",
        "Light can interfere with itself"
      ],
      "why": "Only transverse waves can be limited to one plane of vibration. A longitudinal wave vibrates along its direction of travel, so it has no planes to filter. Interference shows that light is a wave, but not that it is transverse, because longitudinal waves such as sound interfere too.",
      "clue": "Which type of wave has vibrations at right angles to its travel?"
    },
    "b": {
      "d": 3,
      "q": "Polarised light of intensity 80 W m⁻² reaches a second polarising filter. Its axis is at 60° to the light's plane of vibration. What intensity passes through?",
      "opts": ["20 W m⁻²", "40 W m⁻²", "69 W m⁻²", "0 W m⁻²"],
      "why": "I = I₀cos²θ = 80 × (cos 60°)² = 80 × 0.5² = 20 W m⁻². The tempting 40 W m⁻² comes from using cos 60° without squaring it.",
      "clue": "Square the cosine before multiplying."
    }
  },
  "phys-black-body-radiation": {
    "title": "Black body radiation",
    "card": [
      "A black body is an ideal object that absorbs all radiation that hits it. When hot, it gives off a continuous spectrum of radiation that depends only on its temperature.",
      "Wien's law says the peak wavelength is inversely proportional to the temperature in kelvin: λmax = b ÷ T. The constant b is about 2.9 × 10^-3 m K.",
      "So as an object gets hotter, the peak moves to a shorter wavelength, and the object gives off more energy overall. A cooler object peaks at a longer wavelength.",
      "Classical physics could not explain the shape of the spectrum. Planck fixed this by assuming energy is given off in separate packets, not in a smooth flow."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Intensity against wavelength for two black bodies. The 5000 K curve is higher at every wavelength, so it gives off more energy overall, and it peaks at a shorter wavelength, about 0.58 μm, than the 4000 K curve, which peaks at about 0.72 μm. An arrow from the cooler peak to the hotter peak shows the peak moving to a shorter wavelength.",
        "x": {"min": 0, "max": 2.5, "label": "Wavelength (μm)", "step": 0.5},
        "y": {"min": 0, "max": 10.5, "label": "Intensity"},
        "items": [
          {
            "type": "fn",
            "id": "t4",
            "expr": "\\frac{83.86}{x^{5}\\left(e^{\\frac{3.597}{x}} - 1\\right)}",
            "domain": [0.15, 2.5],
            "label": "4000 K",
            "labelAt": 1.442,
            "pos": "below-left",
            "style": "dash"
          },
          {
            "type": "fn",
            "id": "t5",
            "expr": "\\frac{83.86}{x^{5}\\left(e^{\\frac{2.8776}{x}} - 1\\right)}",
            "domain": [0.15, 2.5],
            "label": "5000 K",
            "labelAt": 0.82,
            "pos": "above-right"
          },
          {"type": "point", "at": [0.5796, 9.011], "on": ["t5"], "is": "turning point"},
          {"type": "point", "at": [0.7244, 2.953], "on": ["t4"], "is": "turning point"},
          {"type": "arrow", "from": [0.7244, 3.553], "to": [0.6096, 8.3], "label": "hotter", "pos": "below"}
        ]
      }
    },
    "remember": "Hotter means a shorter peak wavelength. Planck explained the spectrum with energy in packets.",
    "a": {
      "q": "A metal bar is heated in a furnace and its temperature rises. What happens to the peak wavelength of the radiation it gives off?",
      "opts": ["It becomes shorter", "It becomes longer", "It stays the same", "It becomes longer, then shorter"],
      "why": "Wien's law says peak wavelength is inversely proportional to temperature, so a hotter bar peaks at a shorter wavelength. It is tempting to think the wavelength grows with the heat, but that reverses the relationship.",
      "clue": "Look at where T sits in Wien's law."
    },
    "b": {
      "d": 3,
      "q": "Filament X glows at 3000 K. Filament Y glows at 1500 K. Both act as black bodies. How do their peak wavelengths compare?",
      "opts": [
        "X's peak is half of Y's",
        "X's peak is double Y's",
        "X's peak is the same as Y's",
        "X's peak is a quarter of Y's"
      ],
      "why": "Peak wavelength is inversely proportional to temperature in kelvin. Filament X is twice as hot, so its peak wavelength is half that of Filament Y. Doubling the temperature does not double the wavelength, because T is on the bottom of λmax = b ÷ T.",
      "clue": "Find the ratio of the temperatures, then use λmax = b ÷ T."
    }
  },
  "phys-photons": {
    "title": "Photons",
    "card": [
      "A photon is a single packet of light energy. Light is emitted and absorbed in these packets, not in a smooth, continuous flow.",
      "The energy of one photon is E = hf. E is energy in joules, f is frequency in hertz, and h is Planck's constant, about 6.63 × 10^-34 J s.",
      "Energy is directly proportional to frequency. Doubling the frequency doubles the energy of each photon.",
      "Violet light has a higher frequency than red light, so each violet photon carries more energy than each red photon. Brightness is a different thing: it depends on how many photons arrive each second."
    ],
    "remember": "Each photon carries E = hf, so higher frequency means more energy per photon.",
    "a": {
      "q": "Which change would increase the energy carried by each photon of a light beam?",
      "opts": [
        "Increasing the frequency of the light",
        "Increasing the number of photons each second",
        "Increasing the width of the beam",
        "Increasing the time the light is switched on"
      ],
      "why": "E = hf, so the energy of one photon depends only on frequency. Sending more photons each second makes the beam brighter, but each photon still carries the same energy.",
      "clue": "Look at what the symbols in E = hf stand for."
    },
    "b": {
      "d": 3,
      "q": "Mia compares a dim violet laser with a bright red laser. Which statement about a single photon from each is correct?",
      "opts": [
        "A violet photon has more energy than a red photon",
        "A red photon has more energy because its beam is brighter",
        "Both photons have equal energy because both are light",
        "A red photon has more energy as its wavelength is longer"
      ],
      "why": "Violet light has a higher frequency than red light, so by E = hf each violet photon has more energy. Brightness depends on the number of photons each second, not the energy of one photon, so the bright red beam does not have more energetic photons.",
      "clue": "Compare frequencies, not brightness."
    }
  },
  "phys-photoelectric-effect": {
    "title": "The photoelectric effect",
    "card": [
      "When light shines on a metal surface, it can eject electrons from the metal. These electrons are called photoelectrons.",
      "Ejection happens only if the light is above a threshold frequency, which depends on the metal. Below it, no electrons are ejected, however bright the light is.",
      "Above the threshold, even very dim light ejects electrons straight away. Brighter light ejects more electrons per second. A higher frequency raises the maximum kinetic energy of the photoelectrons, though many leave with less.",
      "The wave model predicted that a bright enough light of any frequency would eventually eject electrons. Einstein explained the effect with photons: one photon gives all its energy to one electron, and it must carry enough energy to free it."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Maximum kinetic energy of the photoelectrons against the frequency of the light. Below the threshold frequency no electrons are ejected. Above it, the maximum kinetic energy rises in a straight line as the frequency rises.",
        "x": {"min": 0, "max": 10, "label": "Frequency"},
        "y": {"min": 0, "max": 7, "label": "Max kinetic energy"},
        "items": [
          {"type": "fn", "id": "k", "expr": "0.9x - 3.6", "domain": [4, 10]},
          {"type": "point", "at": [4, 0], "on": ["k"], "is": "x-intercept"},
          {"type": "guide", "at": [4, 0], "xLabel": "threshold"},
          {"type": "text", "at": [2, 0.2], "label": "no electrons", "pos": "above"}
        ]
      }
    },
    "remember": "Frequency decides whether electrons are ejected. Brightness decides how many.",
    "a": {
      "q": "Red light shining on a metal ejects no electrons, however bright it is. What does this show?",
      "opts": [
        "The red light is below the metal's threshold frequency",
        "The red light is too bright to eject electrons",
        "The metal needs a longer time to absorb the red light",
        "The red light has too many photons to eject electrons"
      ],
      "why": "Each photon of red light has too little energy to free an electron, so none are ejected. Making the light brighter only adds more photons of the same low energy, so waiting or brightening cannot help.",
      "clue": "Think about the energy of one photon, not the number of photons."
    },
    "b": {
      "d": 3,
      "q": "Ultraviolet light ejects electrons from a zinc plate. The light is then made much dimmer, but its frequency is unchanged. What happens?",
      "opts": [
        "Electrons are still ejected, but fewer each second",
        "Electrons stop being ejected until the light is brighter",
        "Electrons are ejected, but with a lower maximum energy",
        "Electrons are ejected only after a long delay"
      ],
      "why": "The frequency is unchanged, so each photon still has enough energy to free an electron, and the maximum kinetic energy stays the same. Dimmer light has fewer photons, so fewer electrons are ejected each second. Dimness does not cause a delay or lower the energy of each photon.",
      "clue": "The frequency stays the same, so the energy of each photon stays the same."
    }
  },
  "phys-spectra-stars": {
    "title": "Spectra and stars",
    "card": [
      [
        "Emission lines",
        "A hot, low-pressure gas gives off light only at certain wavelengths, seen as bright lines. Each element has its own pattern of lines."
      ],
      [
        "Absorption lines",
        "When light with all wavelengths passes through a cooler gas, that gas absorbs the same wavelengths it would emit. This leaves dark lines in the spectrum."
      ],
      "A star's spectrum shows dark lines from the gases in its outer layers. Matching these lines to known patterns tells us which elements the star contains.",
      "A star's colour shows its surface temperature. A hotter star has a shorter peak wavelength, so it looks bluer. A cooler star looks redder."
    ],
    "remember": "Lines identify the elements in a star. Colour shows how hot its surface is.",
    "a": {
      "q": "A star's spectrum has dark lines at the same wavelengths as the bright lines of hydrogen. What does this show?",
      "opts": [
        "Hydrogen is present in the star's outer gases",
        "Hydrogen is the hottest element in the star",
        "The star is giving off only hydrogen light",
        "The star has a surface temperature of zero"
      ],
      "why": "Gas absorbs the same wavelengths it would emit, so matching dark lines show that hydrogen is in the star's outer layers. The lines do not show that the star emits only hydrogen light, because the star gives off all wavelengths and the gas removes some.",
      "clue": "A gas absorbs the wavelengths it would emit."
    },
    "b": {
      "d": 2,
      "q": "Astronomers find that star X looks blue and star Y looks red. What can they conclude about the surface temperatures?",
      "opts": [
        "Star X is hotter than star Y",
        "Star Y is hotter than star X",
        "Both stars have the same temperature",
        "Star X is made of different elements to star Y"
      ],
      "why": "A hotter star has a shorter peak wavelength, so it looks bluer. Star X is blue, so it is hotter. Many people think red means hot, but a red star has a longer peak wavelength and is cooler.",
      "clue": "Hotter objects peak at shorter wavelengths."
    }
  },
  "phys-postulates-special-relativity": {
    "title": "Postulates of special relativity",
    "card": [
      "An inertial frame is a frame of reference that moves at constant velocity, with no acceleration. A lab at rest and a train gliding at steady speed are both inertial frames.",
      [
        "First postulate",
        "the laws of physics are the same in every inertial frame. No experiment done inside a frame can show whether that frame is at rest or moving at steady speed."
      ],
      [
        "Second postulate",
        "the speed of light in a vacuum, c, is the same for all observers. It does not depend on how fast the source or the observer is moving."
      ],
      "The second postulate breaks the everyday rule of adding speeds. If a torch is switched on in a fast spaceship, observers in the ship and outside both measure light moving at c."
    ],
    "remember": "Same laws in every inertial frame, and the same value of c for every observer.",
    "a": {
      "q": "A spaceship moves past Earth at a steady, very high speed. It fires a pulse of light forwards. What do observers on Earth measure for the speed of the pulse in a vacuum?",
      "opts": [
        "c, the same as the crew on the ship measure",
        "c plus the speed of the ship, as speeds add",
        "c minus the speed of the ship, seen from Earth",
        "Less than c, because the ship is moving away"
      ],
      "why": "The speed of light in a vacuum is the same for all observers, whatever the motion of the source. Adding the ship's speed to c is the everyday rule, and the second postulate rules it out.",
      "clue": "Does the speed of the source change the speed of light?"
    },
    "b": {
      "d": 3,
      "q": "Priya is on a train moving at a steady speed. She does a physics experiment in a closed carriage with no windows. Which statement follows from the first postulate?",
      "opts": [
        "The experiment cannot show if the train is moving steadily",
        "The experiment shows that laws differ from the platform's",
        "The experiment can measure the train's steady speed exactly",
        "The experiment works only if the train is not moving at all"
      ],
      "why": "The laws of physics are the same in every inertial frame, so no experiment inside the carriage can tell steady motion from rest. The claim that the laws differ on the platform is the tempting mistake, and the first postulate rules it out.",
      "clue": "A train at steady speed is an inertial frame."
    }
  },
  "phys-time-dilation": {
    "title": "Time dilation",
    "card": [
      "Time dilation is the effect that a clock moving relative to an observer is measured by that observer to run slow. The moving clock's own time between two events is called the proper time, t₀.",
      "The observer's time is t = γt₀, where γ = 1 ÷ √(1 − v²/c²) is the Lorentz factor. The factor γ is always 1 or more, so t is longer than t₀.",
      "At everyday speeds v is tiny next to c, so γ is almost exactly 1 and the effect cannot be noticed. It becomes large only when v is close to c.",
      "Muons are made high in the atmosphere and last only about 2.2 microseconds in their own frame. Without dilation, most would decay before reaching the ground. Many are detected at ground level, which supports time dilation."
    ],
    "remember": "A moving clock is measured to run slow by the factor γ, and the effect is large only near the speed of light.",
    "a": {
      "q": "A spacecraft passes Earth at a speed where γ = 2. A clock on the spacecraft ticks off 3.0 s. How long does an Earth observer measure for this?",
      "opts": ["6.0 s", "1.5 s", "3.0 s", "9.0 s"],
      "why": "The 3.0 s is the proper time, measured on the moving clock. The Earth observer measures t = γt₀ = 2 × 3.0 = 6.0 s. Dividing by γ gives 1.5 s, but that reverses the effect: the moving clock runs slow, so the observer's time is longer.",
      "clue": "The moving clock's reading is the proper time, t₀."
    },
    "b": {
      "d": 3,
      "q": "Muons made high in the atmosphere reach the ground in far greater numbers than their 2.2 microsecond lifetime would allow. Which explanation fits special relativity?",
      "opts": [
        "Ground observers measure a lifetime longer than 2.2 µs",
        "Their lifetime in their own frame is longer than 2.2 µs",
        "The muons travel faster than the speed of light",
        "The distance to the ground is longer for the muons"
      ],
      "why": "The 2.2 µs is the lifetime in the muon's own frame. Ground observers measure the moving muon's clock running slow, so its lifetime is longer, by γ, and more muons arrive. The muon's own lifetime does not change, and nothing with mass can exceed c.",
      "clue": "Whose clock gives the 2.2 µs, and who measures the longer time?"
    }
  },
  "phys-length-contraction": {
    "title": "Length contraction",
    "card": [
      "Length contraction is the shortening of a moving object along its direction of motion, as measured by an observer relative to whom the object is moving. Lengths at right angles to the motion do not change.",
      [
        "Proper length",
        "L₀ is the length measured in the frame where the object is at rest. It is the longest length any observer will measure for that object."
      ],
      [
        "Contracted length",
        "L = L₀ √(1 − v²/c²) = L₀ / γ, where v is the relative speed and γ is the Lorentz factor. Since γ is greater than 1, L is less than L₀."
      ],
      "The effect is only noticeable at speeds close to c. A person on the moving object measures its length as L₀, and sees no change in it."
    ],
    "remember": "Along the direction of motion, a moving object is measured as shorter than its proper length.",
    "a": {
      "q": "A spaceship has a proper length of 100 m. It passes a stationary observer at a speed close to c. What does the observer measure for its length?",
      "opts": ["Less than 100 m", "More than 100 m", "Exactly 100 m", "Less than 100 m, but only its width"],
      "why": "The ship is moving relative to the observer, so they measure its length along the motion as contracted, which is less than the proper length. The ship's own crew measure 100 m, but the observer does not. Its width, at right angles to the motion, does not change.",
      "clue": "Proper length is the longest length any observer measures."
    },
    "b": {
      "d": 3,
      "q": "A rod of proper length 10.0 m moves along its length past Priya at 0.80c, so γ is about 1.67. Priya measures its length. Which is closest to her result?",
      "opts": ["6.0 m", "16.7 m", "10.0 m", "8.0 m"],
      "why": "L = L₀ / γ = 10.0 ÷ 1.67, which is about 6.0 m. The 16.7 m option multiplies by γ instead of dividing, which would make a moving object longer, and that does not happen.",
      "clue": "Divide the proper length by γ."
    }
  },
  "phys-mass-energy": {
    "title": "Mass and energy",
    "card": [
      "E = mc² links a mass m to an energy E. The speed of light c is very large, so a small mass is equivalent to a huge amount of energy. Mass is a form of energy.",
      "If a system's mass changes, its energy changes by ΔE = Δm c². In nuclear reactions, a small loss of mass is released as a large amount of energy.",
      "Relativistic momentum is p = γmv, where γ is the Lorentz factor. As speed v gets close to c, γ becomes very large, so p grows without limit.",
      "Giving an object more and more momentum takes more and more energy. No finite amount is enough to reach c, so nothing with mass can reach the speed of light."
    ],
    "remember": "A mass change means an energy change, ΔE = Δm c². Momentum grows without limit near c, so no object with mass can reach c.",
    "a": {
      "q": "A nuclear reaction releases energy and the total mass of the products is slightly less than the mass before. What explains this?",
      "opts": [
        "Some of the mass was changed into energy",
        "The energy released had no source in the reaction",
        "Mass is always conserved as a separate quantity",
        "The products moved faster than the speed of light"
      ],
      "why": "Mass is a form of energy, so a loss of mass Δm is released as energy ΔE = Δm c². Saying mass is always conserved on its own is wrong here, because the missing mass appears as energy.",
      "clue": "Where does the energy come from if mass is a form of energy?"
    },
    "b": {
      "d": 3,
      "q": "A proton in a particle accelerator is given more and more energy, and its speed gets closer to c. Why can it never reach c?",
      "opts": [
        "Its momentum would have to become infinitely large",
        "Its mass would drop to zero as it nears c",
        "Its kinetic energy stops increasing near c",
        "Its Lorentz factor becomes smaller as it speeds up"
      ],
      "why": "Momentum is p = γmv, and γ grows without limit as v nears c. Reaching c would need infinite momentum and so infinite energy. The tempting idea that energy stops increasing is wrong: the energy keeps rising, but no finite amount is enough.",
      "clue": "Think about what happens to γ as v approaches c."
    }
  },
  "phys-big-bang-expansion": {
    "title": "The Big Bang and expansion",
    "card": [
      "The Big Bang model says the universe began extremely hot and dense, and space has been expanding ever since. It describes the expansion of space itself, not an explosion into empty space.",
      [
        "Red shift",
        "Light from distant galaxies has longer wavelengths than expected, shifted towards the red end of the spectrum. This fits galaxies moving away from us as space expands."
      ],
      [
        "Cosmic microwave background",
        "The cosmic microwave background (CMB) is faint microwave radiation coming from every direction in the sky. It is left over from the early hot universe, and it has cooled as space expanded."
      ],
      "Both observations support the model. The red shift shows the universe is expanding now, and the CMB is a relic of the hot early stage."
    ],
    "remember": "The universe began hot and dense and has expanded since, backed by red-shifted galaxies and the CMB.",
    "a": {
      "q": "Astronomers find that light from most distant galaxies is red-shifted. What does this observation support?",
      "opts": [
        "The universe is expanding",
        "The universe is getting hotter",
        "Galaxies are getting brighter",
        "Space is filled with microwave radiation"
      ],
      "why": "Longer wavelengths fit galaxies moving away as space expands. The microwave radiation is a separate observation, the CMB, and a red shift does not show it.",
      "clue": "Red shift means the wavelength has grown longer."
    },
    "b": {
      "d": 3,
      "q": "A student says the CMB is evidence for the Big Bang. Which reason best supports this?",
      "opts": [
        "It is radiation left from the hot early universe",
        "It shows galaxies are moving away from us",
        "It comes from stars in our own galaxy only",
        "It shows the universe began as an explosion in space"
      ],
      "why": "The CMB is a relic of the hot, dense early universe, now cooled to microwaves. The idea that galaxies move away is the red shift evidence. The Big Bang is the expansion of space, not an explosion into space.",
      "clue": "Think about what the CMB is left over from."
    }
  },
  "phys-hubble-s-law": {
    "title": "Hubble's law",
    "card": [
      "Hubble's law says the recession speed of a distant galaxy is proportional to its distance from us: v = H₀d. Here v is the speed at which the galaxy moves away, d is its distance and H₀ is the Hubble constant.",
      "A galaxy twice as far away recedes twice as fast. Galaxies in every direction show this pattern.",
      "The speed comes from the red shift of the galaxy's light. The distance is found by other methods, such as using standard candles, which are objects of known luminosity.",
      "H₀ is about 70 km/s per megaparsec. A galaxy 100 Mpc away would recede at about 7000 km/s. Hubble's law shows that space itself is expanding."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "Recession speed against distance for a set of galaxies. The dots lie close to a straight line through the origin, so speed is proportional to distance. The gradient of the line is the Hubble constant, about 70 km/s per megaparsec: a galaxy 100 Mpc away recedes at about 7000 km/s.",
        "x": {"min": 0, "max": 150, "label": "d (Mpc)", "step": 25, "nums": false},
        "y": {"min": 0, "max": 11000, "label": "v (km/s)", "step": 2000, "nums": false},
        "items": [
          {
            "type": "fn",
            "id": "h",
            "expr": "70x",
            "domain": [0, 150],
            "label": "\\(v = H_{0}d\\)",
            "labelAt": 128,
            "pos": "above-left"
          },
          {"type": "point", "at": [22, 1700]},
          {"type": "point", "at": [40, 2600]},
          {"type": "point", "at": [58, 4300]},
          {"type": "point", "at": [75, 5000]},
          {"type": "point", "at": [92, 6800]},
          {"type": "point", "at": [118, 8000]},
          {"type": "point", "at": [133, 9600]},
          {"type": "guide", "at": [100, 7000], "xLabel": "100", "yLabel": "7000"}
        ]
      }
    },
    "remember": "Recession speed is proportional to distance, so the universe is expanding.",
    "a": {
      "q": "Galaxy A is 200 Mpc from us. Galaxy B is 100 Mpc away. By Hubble's law, how do their recession speeds compare?",
      "opts": [
        "A recedes twice as fast as B",
        "A recedes at the same speed as B",
        "A recedes half as fast as B",
        "A recedes four times as fast as B"
      ],
      "why": "Speed is proportional to distance, so doubling the distance doubles the speed. Four times as fast would need distance to be squared, but the law is a direct proportion.",
      "clue": "v = H₀d is a direct proportion."
    },
    "b": {
      "d": 3,
      "q": "Using H₀ = 70 km/s per Mpc, a galaxy recedes from us at 14 000 km/s. About how far away is it?",
      "opts": ["200 Mpc", "20 Mpc", "980 000 Mpc", "0.005 Mpc"],
      "why": "Rearrange to d = v ÷ H₀ = 14 000 ÷ 70 = 200 Mpc. Multiplying speed by H₀ gives 980 000, which wrongly treats H₀ as a factor for distance rather than a divisor.",
      "clue": "Rearrange v = H₀d to make d the subject."
    }
  },
  "phys-hertzsprung-russell-diagram": {
    "title": "The Hertzsprung-Russell diagram",
    "card": [
      "A Hertzsprung-Russell (H-R) diagram plots stars by luminosity (total power output) against surface temperature. Temperature is drawn backwards: hot stars are on the left and cool stars are on the right.",
      [
        "Main sequence",
        "a band running from hot, luminous stars at the upper left to cool, dim stars at the lower right. Most stars are in it, including the Sun."
      ],
      [
        "Giants",
        "cool but very luminous stars at the upper right, because they are very large with a huge surface area."
      ],
      [
        "White dwarfs",
        "hot but dim stars at the lower left, because they are very small. A Sun-like star leaves the main sequence to become a giant, then ends as a white dwarf."
      ]
    ],
    "cardFigs": {
      "1": {
        "kind": "graph",
        "alt": "A Hertzsprung-Russell diagram. Luminosity goes up the side. Surface temperature runs along the bottom backwards, with hot stars on the left and cool stars on the right, as the axis name and the arrow say. The main sequence is a band from the upper left to the lower right, with the Sun near its middle. Giants are at the upper right and white dwarfs at the lower left.",
        "x": {"min": 0.4, "max": 10, "label": "Temperature, hot to cool"},
        "y": {"min": 0, "max": 10, "label": "Luminosity"},
        "items": [
          {
            "type": "shade",
            "poly": [[0.6, 9.2], [1.8, 9.4], [5.2, 6.4], [9.4, 2.6], [9.4, 1.2], [8.6, 1.2], [4.6, 5], [0.6, 8]],
            "label": "main sequence",
            "at": [3.2, 7.3]
          },
          {"type": "shade", "poly": [[6.6, 7], [9.4, 8.4], [9.4, 6.4], [7, 5.6]], "label": "giants", "at": [8.2, 7]},
          {
            "type": "shade",
            "poly": [[1, 2.6], [3.2, 1.6], [3.2, 0.8], [1, 1.8]],
            "label": "white dwarfs",
            "at": [2.1, 2.9]
          },
          {"type": "point", "at": [6.4, 4.1], "label": "Sun", "pos": "right"},
          {"type": "arrow", "from": [4.6, 0.6], "to": [9.2, 0.6], "label": "cooler", "pos": "above"}
        ]
      }
    },
    "remember": "Position on the H-R diagram shows a star's temperature, luminosity and stage of life.",
    "a": {
      "q": "A star is cool at its surface but has very high luminosity. Where is it on the H-R diagram, and why is it so luminous?",
      "opts": [
        "Upper right, because it is very large",
        "Lower left, because it is very small",
        "Upper right, because it is very hot",
        "Lower left, because it is very large"
      ],
      "why": "Cool and luminous places a star at the upper right, with the giants. A cool surface gives off little light per unit area, so the star must have a huge surface area to be so luminous. Being very hot cannot be the reason, as its surface is cool.",
      "clue": "Cool stars give off little light for each square metre of surface."
    },
    "b": {
      "d": 3,
      "q": "Astronomers find a star with a very high surface temperature and very low luminosity. What is the best conclusion?",
      "opts": [
        "It is a white dwarf, and it is very small",
        "It is a giant, and it is very large",
        "It is a main sequence star like the Sun",
        "It is a white dwarf, and it is very large"
      ],
      "why": "Hot and dim places a star at the lower left, with the white dwarfs. A hot surface gives off a lot of light per unit area, so for the star to be dim overall it must be very small. Calling it a giant is tempting because both groups are unusual, but giants are cool and luminous.",
      "clue": "Hot surface but little total light means very little surface."
    }
  },
  "phys-fusion-stars": {
    "title": "Fusion in stars",
    "card": [
      "Fusion is when light nuclei join to form a heavier nucleus. A star's core is hot and dense enough for hydrogen nuclei (protons) to overcome their electrical repulsion and fuse.",
      "Stars shine by fusing hydrogen into helium. The helium nucleus has slightly less mass than the hydrogen nuclei that formed it, and the missing mass is released as energy (E = mc²).",
      [
        "Proton-proton chain",
        "the main route in smaller stars, such as the Sun. Hydrogen nuclei fuse in steps to make helium."
      ],
      [
        "CNO cycle",
        "the main route in larger stars, which have hotter cores. Carbon, nitrogen and oxygen act as catalysts, and the overall result is still hydrogen fused into helium."
      ]
    ],
    "remember": "Stars shine by fusing hydrogen into helium, and the small mass lost becomes energy.",
    "a": {
      "q": "Why does the fusion of hydrogen into helium release energy in a star?",
      "opts": [
        "The helium formed has slightly less mass than the hydrogen",
        "The helium formed has slightly more mass than the hydrogen",
        "Hydrogen nuclei attract each other and release heat",
        "The helium nuclei split apart and release stored energy"
      ],
      "why": "The helium nucleus has slightly less mass than the hydrogen nuclei that formed it, and the missing mass is released as energy (E = mc²). It does not gain mass, because that would need energy to be put in, not released.",
      "clue": "Compare the mass before and after fusion."
    },
    "b": {
      "d": 3,
      "q": "Two stars both shine by fusing hydrogen into helium. Star X is small and Star Y is much larger, with a hotter core. Which statement is correct?",
      "opts": [
        "X mainly uses the proton-proton chain, Y the CNO cycle",
        "X mainly uses the CNO cycle, Y the proton-proton chain",
        "X fuses hydrogen into helium, Y fuses helium into hydrogen",
        "X uses fusion, but Y gets its energy from burning carbon"
      ],
      "why": "Smaller stars mainly use the proton-proton chain, and larger stars with hotter cores mainly use the CNO cycle. Saying X mainly uses the CNO cycle and Y the proton-proton chain reverses the two routes. Y does not burn carbon either: in the CNO cycle carbon, nitrogen and oxygen are catalysts, and the overall result is still hydrogen fused into helium.",
      "clue": "Both routes make helium from hydrogen. Which star has the hotter core?"
    }
  },
  "phys-thomson-electron": {
    "title": "Thomson and the electron",
    "card": [
      "A cathode ray tube is a sealed glass tube with most of the air removed. A high voltage across two metal plates inside produces a beam called cathode rays.",
      "Thomson showed that an electric field bends the beam towards the positive plate. A magnetic field also bends it. So the rays carry negative charge.",
      "He adjusted the two fields until their forces balanced and the beam went straight. This gave the speed of the particles. With the speed known, he measured how much the magnetic field alone bent the beam. This gave the charge to mass ratio (q/m).",
      "The ratio was the same whatever metal the plates were made of or gas was left in the tube. So these particles, later called electrons, are found in all matter. Their mass is very small compared with the lightest atom."
    ],
    "remember": "Thomson used electric and magnetic fields on cathode rays to show electrons are negative particles in all matter, and found their q/m.",
    "a": {
      "q": "What did the bending of cathode rays towards the positive plate in an electric field show?",
      "opts": [
        "The rays carry negative charge",
        "The rays carry positive charge",
        "The rays are a form of light",
        "The rays have no mass"
      ],
      "why": "Negative charges are attracted to a positive plate, so the rays must be negative. Light is not bent by an electric field, so the rays cannot be light.",
      "clue": "Opposite charges attract."
    },
    "b": {
      "d": 3,
      "q": "Thomson got the same charge to mass ratio when he changed the metal of the plates and the gas in the tube. What did this suggest?",
      "opts": [
        "The particles are a common part of all matter",
        "The particles come only from the tube glass",
        "The particles are different in each metal used",
        "The particles have no charge and almost no mass"
      ],
      "why": "A ratio that stays the same for every metal and gas suggests the same kind of particle comes from all of them, so it is part of all matter. If the particles differed by material, the ratio would change. It does not.",
      "clue": "Think about what stays the same when the materials change."
    }
  },
  "phys-millikan-s-oil-drop": {
    "title": "Millikan's oil drop experiment",
    "card": [
      "Millikan sprayed tiny oil drops between two horizontal charged plates. Some drops picked up electric charge from the air or from X-rays.",
      "He adjusted the voltage until a drop hung still. Then the upward electric force qE equalled the downward weight mg, so q = mg/E.",
      "The drop's mass was found from its size and the density of oil. This let him work out the charge on each drop.",
      "Every charge was a whole-number multiple of one smallest value, about 1.6 × 10^-19 C. So charge comes in units, and this smallest unit is the charge of one electron."
    ],
    "remember": "A drop hangs still when qE = mg, and every charge found was a whole multiple of the electron's charge.",
    "a": {
      "q": "What did Millikan's results show about the charges on the oil drops?",
      "opts": [
        "Each was a whole multiple of one smallest charge",
        "Each was a different value with no fixed pattern",
        "Each was exactly the same size on every drop",
        "Each was a small fraction of the electron's charge"
      ],
      "why": "The charges were all whole multiples of about 1.6 × 10^-19 C, so charge comes in units. Different drops carried different numbers of these units, so they were not all the same size. No drop carried a fraction of that value, so the charges could not take just any value.",
      "clue": "Look at what the measured charges had in common."
    },
    "b": {
      "d": 3,
      "q": "In Millikan's experiment, an oil drop of mass m and charge q hangs still between the plates in an electric field of strength E. Which equation applies?",
      "opts": ["qE = mg", "qE = 0", "mg = 0", "qE > mg"],
      "why": "A drop that hangs still has zero net force, so the upward electric force qE equals the downward weight mg. Gravity still acts on the drop, so mg is not zero, and qE greater than mg would make the drop accelerate upward.",
      "clue": "A drop that is not moving has balanced forces."
    }
  },
  "phys-rutherford-s-nuclear-model": {
    "title": "Rutherford's nuclear model",
    "card": [
      "In the Geiger-Marsden experiment, alpha particles (positive particles) were fired at a very thin gold foil. A detector screen showed where they ended up.",
      "Most alpha particles went straight through, or bent only slightly. So most of an atom is empty space.",
      "A very small number were deflected through large angles, and a few bounced almost straight back. Only a strong force from a concentrated positive charge could do this.",
      "Rutherford concluded that an atom has a tiny, dense, positively charged nucleus, which holds nearly all of its mass. The electrons lie outside it."
    ],
    "remember": "Most alpha particles passed through, a few bounced back: the atom has a tiny, dense, positive nucleus.",
    "a": {
      "q": "What did the few alpha particles that bounced almost straight back show about the gold atoms?",
      "opts": [
        "Each atom has a tiny, dense, positive centre",
        "Each atom is a uniform ball of positive charge",
        "Each atom's mass is spread evenly through it",
        "Each atom is mostly made of negative charge"
      ],
      "why": "A large deflection needs a strong repulsion from a small region holding concentrated positive charge and mass. A uniform ball of positive charge would only bend alpha particles slightly, so that option is tempting but wrong.",
      "clue": "Only a concentrated charge could turn a fast particle right around."
    },
    "b": {
      "d": 3,
      "q": "In a repeat of the experiment, a student sees that almost all alpha particles pass straight through the foil. What does this observation show?",
      "opts": [
        "Most of the atom is empty space",
        "The nucleus takes up most of the atom's volume",
        "Alpha particles are not affected by positive charge",
        "The gold atoms have no electrons"
      ],
      "why": "If almost all particles pass undeflected, then most of the atom's volume has no concentrated charge or mass in the way. The option saying the nucleus takes up most of the atom's volume is the reverse of what is seen, because the nucleus is tiny. The few large deflections, not the passing through, are what show the nucleus is positive.",
      "clue": "What must most of the atom be like if particles are not turned aside?"
    }
  },
  "phys-bohr-model": {
    "title": "The Bohr model",
    "card": [
      "In the Bohr model, electrons orbit the nucleus only at certain fixed energy levels. An electron in one of these levels does not radiate energy.",
      "One way an electron can jump to a higher level is by absorbing a photon whose energy equals the gap between the levels. Collisions, such as in a heated gas, can also raise it.",
      "When an electron falls to a lower level, it emits a photon. The photon's energy is the difference between the levels: E = hf, where h is Planck's constant and f is the frequency.",
      "Hydrogen has only certain energy gaps, so it emits only certain frequencies of light. This gives a line spectrum of separate bright lines, not a continuous band."
    ],
    "remember": "Fixed energy levels mean fixed photon energies, so hydrogen gives separate spectral lines.",
    "a": {
      "q": "Why does the light from excited hydrogen gas form separate lines, not a continuous band?",
      "opts": [
        "Electron jumps release only photons of certain energies",
        "Electrons spiral inward and release energy gradually",
        "Hydrogen atoms release light of every frequency in turn",
        "Electrons absorb photons of any energy they receive"
      ],
      "why": "Electrons can only move between fixed levels, so each fall gives a photon of one set energy and one set frequency. A spiral inward would give a continuous range of energies, but in the Bohr model an electron in a level does not radiate.",
      "clue": "Think about which energy gaps are allowed."
    },
    "b": {
      "d": 3,
      "q": "In a hydrogen atom, an electron falls from level 3 to level 2, and then from level 2 to level 1. The gap from level 2 to level 1 is larger than the gap from level 3 to level 2. Which statement is correct?",
      "opts": [
        "The second jump emits a photon of higher frequency",
        "The second jump emits a photon of lower frequency",
        "Both jumps emit photons of the same frequency",
        "The second jump absorbs a photon of higher frequency"
      ],
      "why": "Photon energy equals the gap between levels, and E = hf, so a larger gap gives a higher frequency. The second jump has the larger gap, so its photon has the higher frequency. The electron is falling, so it emits a photon rather than absorbing one.",
      "clue": "Compare the two gaps, then link energy to frequency."
    }
  },
  "phys-matter-waves": {
    "title": "Matter waves",
    "card": [
      "De Broglie proposed that particles such as electrons have a wavelength, just as light behaves as both a wave and a particle. The wavelength is λ = h/mv, where h is Planck's constant, m is mass and v is speed.",
      "All moving matter has a wavelength, but a larger momentum (mv) gives a shorter one. A cricket ball's is far too small to detect, so only tiny particles such as electrons show detectable wave effects.",
      "Electrons fired at a thin crystal or through slits produce a diffraction pattern. Only waves do this, so the pattern confirmed that matter has wave properties.",
      "Schrödinger built a wave model of the atom. It describes the electron as a wave around the nucleus, not as a particle on a fixed path."
    ],
    "remember": "Moving matter has a wavelength λ = h/mv, and electron diffraction showed it is real.",
    "a": {
      "q": "What did electron diffraction show about electrons?",
      "opts": [
        "They can behave as waves",
        "They carry a negative charge",
        "They orbit the nucleus in fixed paths",
        "They have the same mass as a proton"
      ],
      "why": "A diffraction pattern is produced only by waves, so it showed that electrons have wave properties. Negative charge is true, but it was shown by other experiments and is not what a diffraction pattern reveals.",
      "clue": "Which kind of motion produces a diffraction pattern?"
    },
    "b": {
      "d": 3,
      "q": "An electron and a proton move at the same speed. Which statement about their de Broglie wavelengths is correct?",
      "opts": [
        "The electron's is longer, because its mass is smaller",
        "The proton's is longer, because its mass is larger",
        "They are equal, because the speeds are equal",
        "Neither has one, because only light has a wavelength"
      ],
      "why": "With λ = h/mv, at equal speed a smaller mass gives a longer wavelength. The electron has much less mass than the proton, so its wavelength is longer. Thinking a heavier particle has a longer wavelength reverses the relationship, because mass is in the denominator.",
      "clue": "Mass is on the bottom of the fraction in λ = h/mv."
    }
  },
  "phys-radioactive-decay": {
    "title": "Radioactive decay",
    "card": [
      "An unstable nucleus can change into a more stable one by emitting radiation. This is radioactive decay, and it happens at random.",
      [
        "Alpha",
        "a helium nucleus (2 protons, 2 neutrons), charge +2. It is heavy and slow, and a sheet of paper or a few centimetres of air stops it."
      ],
      [
        "Beta",
        "a fast electron (beta minus) or positron (beta plus) from the nucleus, with charge -1 or +1. It is very light, and a few millimetres of aluminium stops it."
      ],
      [
        "Gamma",
        "a high-energy photon from the nucleus. It has no charge and no mass, and it is the most penetrating. Thick lead or concrete is needed to reduce it."
      ]
    ],
    "remember": "Alpha is heavy and stopped easily, beta is light and moderate, gamma is uncharged and the most penetrating.",
    "a": {
      "q": "Which type of radiation has no charge and is the most penetrating?",
      "opts": ["Gamma rays", "Alpha particles", "Beta particles", "Positrons"],
      "why": "Gamma rays are photons, so they carry no charge, and they pass through paper and aluminium. Beta particles are charged and are stopped by a few millimetres of aluminium, so they penetrate less.",
      "clue": "Think about what each one needs to stop it."
    },
    "b": {
      "d": 3,
      "q": "A radioactive source is placed behind a sheet of paper. A detector behind the paper records radiation, but the count drops to near zero when a few millimetres of aluminium is added. What radiation is reaching the detector?",
      "opts": ["Beta particles", "Alpha particles", "Gamma rays", "Beta particles and gamma rays"],
      "why": "Paper stops alpha, so any alpha from the source is absorbed before the detector. The radiation that gets through is stopped by thin aluminium, which fits beta. Gamma would still pass the aluminium, so the count would not fall to near zero.",
      "clue": "What gets past paper but not thin aluminium?"
    }
  },
  "phys-half-life": {
    "title": "Half-life",
    "card": [
      "Half-life is the time taken for half of the radioactive nuclei in a sample to decay. The decayed nuclei become different nuclei, and the sample does not vanish.",
      "Each isotope has its own half-life. It stays the same however large the sample is.",
      "Decay is random. We cannot say when one nucleus will decay, but in a large sample the fraction decaying in a set time is predictable.",
      "After one half-life, 1/2 of the original nuclei remain. After two, 1/4 remain. After three, 1/8 remain."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "The fraction of the original nuclei still undecayed against time, measured in half-lives. The curve starts at 1 and halves every half-life: 1/2 after one, 1/4 after two and 1/8 after three. It keeps falling but never reaches zero.",
        "x": {"min": 0, "max": 5.75, "label": "Half-lives", "step": 1},
        "y": {"min": 0, "max": 1.1, "label": "Fraction left"},
        "items": [
          {"type": "fn", "id": "n", "expr": "2^{-x}", "domain": [0, 4]},
          {"type": "point", "at": [0, 1], "on": ["n"], "is": "y-intercept", "label": "1", "pos": "above-right"},
          {"type": "guide", "at": [1, 0.5], "yLabel": "1/2"},
          {"type": "point", "at": [1, 0.5], "on": ["n"]},
          {"type": "guide", "at": [2, 0.25], "yLabel": "1/4"},
          {"type": "point", "at": [2, 0.25], "on": ["n"]},
          {"type": "guide", "at": [3, 0.125], "yLabel": "1/8"},
          {"type": "point", "at": [3, 0.125], "on": ["n"]}
        ]
      }
    },
    "remember": "Every half-life, the number of undecayed nuclei is cut in half.",
    "a": {
      "q": "An isotope has a half-life of 6 hours. What fraction of a sample's original nuclei remains undecayed after 12 hours?",
      "opts": ["1/4", "0", "1/2", "1/12"],
      "why": "12 hours is two half-lives. The amount is halved twice, so 1/4 remains. It is not 0, because each half-life removes only half of what is left, not half of the original each time.",
      "clue": "Count how many half-lives fit into 12 hours."
    },
    "b": {
      "d": 3,
      "q": "Lab A has 8 g of an isotope and Lab B has 2 g of the same isotope. Which statement about their half-lives is correct?",
      "opts": [
        "They are equal, because half-life depends on the isotope",
        "Lab A's is longer, because it has more nuclei to decay",
        "Lab B's is longer, because fewer nuclei must decay",
        "Lab A's is four times longer, as it has four times the mass"
      ],
      "why": "Half-life is constant for an isotope, whatever the size of the sample. Lab A has more nuclei, so more decay in each period, but the fraction that decays is still one half. Mixing up the number decaying with the time for half to decay is the tempting mistake.",
      "clue": "Think about what fraction of each sample decays in one half-life."
    }
  },
  "phys-mass-defect-binding-energy": {
    "title": "Mass defect and binding energy",
    "card": [
      "The mass of a nucleus is less than the total mass of its separate protons and neutrons (nucleons). This difference in mass is called the mass defect.",
      "The missing mass is not lost. It was released as energy when the nucleons joined, and the amount of energy is found with E = mc².",
      "The binding energy is the energy needed to split a nucleus into its separate nucleons. It equals the energy released when the nucleus forms from them.",
      "To find the binding energy, use E = mc². Here m is the mass defect in kg, c is the speed of light (3.0 × 10⁸ m/s) and E is in joules."
    ],
    "remember": "Mass defect is the missing mass. E = mc² turns it into the energy needed to pull the nucleus apart.",
    "a": {
      "q": "What is the mass defect of a nucleus?",
      "opts": [
        "The mass of the separate nucleons minus the nucleus mass",
        "The mass of the nucleus minus the separate nucleons",
        "The mass of the protons only in the nucleus",
        "The mass of the electrons removed from the atom"
      ],
      "why": "A nucleus has less mass than its separate nucleons, so the mass defect is the separate total minus the nucleus mass. The reverse order would give a negative value, and the mass defect is a difference, not the mass of one type of particle.",
      "clue": "Which is smaller: the whole nucleus or its parts added up?"
    },
    "b": {
      "d": 3,
      "q": "A nucleus has a mass defect of 3.0 × 10⁻²⁹ kg. Which calculation gives its binding energy in joules?",
      "opts": [
        "3.0 × 10⁻²⁹ × (3.0 × 10⁸)²",
        "3.0 × 10⁻²⁹ × (3.0 × 10⁸)",
        "3.0 × 10⁻²⁹ ÷ (3.0 × 10⁸)²",
        "3.0 × 10⁻²⁹ × 2 × (3.0 × 10⁸)"
      ],
      "why": "E = mc², so the mass defect is multiplied by the speed of light squared. Using c without squaring it, or doubling it, gives the wrong size and the wrong units for energy.",
      "clue": "Write out E = mc² and substitute each value carefully."
    }
  },
  "phys-fission-fusion": {
    "title": "Fission and fusion",
    "card": [
      [
        "Fission",
        "a heavy nucleus, such as uranium-235, splits into two smaller nuclei. It is often started when the nucleus absorbs a neutron, and more neutrons are released."
      ],
      [
        "Fusion",
        "two light nuclei, such as hydrogen isotopes, join to form a heavier nucleus. This needs very high temperature and pressure, as in the Sun, because the nuclei repel each other."
      ],
      "Binding energy per nucleon is the binding energy divided by the number of nucleons. It is greatest for nuclei near iron, so these are the most tightly bound.",
      "In both processes the products have a higher binding energy per nucleon than the starting nuclei. The total mass of the products is slightly less, and the missing mass is released as energy."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Binding energy per nucleon against mass number. It rises steeply from light nuclei such as hydrogen-2 to a peak of about 8.8 MeV near iron-56, the most tightly bound, then falls slowly to about 7.6 MeV for uranium-238. Arrows show fusion joining light nuclei and fission splitting heavy ones, both moving towards iron.",
        "x": {"min": 0, "max": 250, "label": "Mass number", "step": 50},
        "y": {"min": 0, "max": 11, "label": "MeV per nucleon", "step": 2},
        "items": [
          {
            "type": "curve",
            "id": "b",
            "points": [
              [2, 1.1],
              [6, 5.3],
              [12, 7.7],
              [16, 8],
              [30, 8.5],
              [56, 8.8],
              [90, 8.7],
              [140, 8.4],
              [200, 7.9],
              [238, 7.6]
            ],
            "smooth": true
          },
          {"type": "point", "at": [56, 8.8], "on": ["b"], "label": "iron-56", "pos": "above"},
          {"type": "point", "at": [238, 7.6], "on": ["b"], "label": "uranium", "pos": "below-left"},
          {"type": "arrow", "from": [14, 4.2], "to": [40, 6.6], "label": "fusion", "pos": "right"},
          {"type": "arrow", "from": [226, 6.4], "to": [130, 6.4], "label": "fission", "pos": "below"}
        ]
      }
    },
    "remember": "Fission and fusion both move nuclei towards more tightly bound products, and the difference is released as energy.",
    "a": {
      "q": "Why does fusion of two hydrogen nuclei release energy?",
      "opts": [
        "The product is more tightly bound per nucleon",
        "The product has more mass than the two nuclei",
        "The product has a lower binding energy per nucleon",
        "The nuclei lose their protons as they join"
      ],
      "why": "The helium-type product has a higher binding energy per nucleon than the hydrogen nuclei, so its total mass is slightly less and the difference is released as energy. It is wrong to say the product has more mass, because that would need energy to be put in.",
      "clue": "Think about what happens to binding energy per nucleon."
    },
    "b": {
      "d": 3,
      "q": "A uranium-235 nucleus absorbs a neutron and splits into two medium-sized nuclei. Which statement about this event is correct?",
      "opts": [
        "The products are more tightly bound per nucleon than uranium",
        "The products have a lower binding energy per nucleon",
        "The total mass of the products equals the starting mass",
        "Energy is released because the products are heavier"
      ],
      "why": "Medium-sized nuclei lie closer to iron, so they have a higher binding energy per nucleon than uranium. The products have slightly less total mass, and that missing mass is released as energy. Saying the masses are equal is tempting, but then no energy could be released.",
      "clue": "Medium-sized nuclei are nearer to iron on the binding energy curve."
    }
  },
  "phys-standard-model": {
    "title": "The standard model",
    "card": [
      "The standard model describes the fundamental particles of matter and the forces between them. Fundamental means they have no known smaller parts. Matter is made of quarks and leptons.",
      [
        "Quarks",
        "fundamental matter particles that feel the strong force and join in groups to make larger particles. Protons and neutrons are each made of three quarks, a mix of up and down quarks."
      ],
      [
        "Leptons",
        "fundamental matter particles that are not made of quarks and do not feel the strong force. The electron and the neutrino are leptons."
      ],
      [
        "Force carriers",
        "forces act through exchange particles, which are not matter particles. The photon carries the electromagnetic force. Gluons carry the strong force, which holds quarks together inside protons and neutrons."
      ]
    ],
    "remember": "Quarks and leptons make up matter. Exchange particles such as photons and gluons carry the forces.",
    "a": {
      "q": "Which statement about a proton is correct, according to the standard model?",
      "opts": [
        "It is made of three quarks",
        "It is a lepton like the electron",
        "It is a force carrier like the photon",
        "It is a single particle with no parts"
      ],
      "why": "A proton is made of three up and down quarks, held together by gluons. It cannot be a lepton, because leptons are fundamental and not made of quarks. It is a matter particle, not an exchange particle like the photon.",
      "clue": "Think about what protons and neutrons are built from."
    },
    "b": {
      "d": 3,
      "q": "A student says that an electron is made of quarks held together by gluons. Which reply is correct?",
      "opts": [
        "No, an electron is a lepton and not made of quarks",
        "No, an electron is a force carrier like the photon",
        "Yes, all matter particles are made of quarks",
        "Yes, but it has only two quarks, unlike a proton"
      ],
      "why": "The electron is a lepton: a fundamental matter particle with no quarks inside it. The idea that all matter is made of quarks is tempting, but matter is made of two families, quarks and leptons. The electron is not a force carrier either, as it is a matter particle.",
      "clue": "Matter has two families of fundamental particles. Which one includes the electron?"
    }
  },
  "phys-temperature-internal-energy": {
    "title": "Temperature and internal energy",
    "card": [
      "All the particles in a substance are moving and pulling on each other. Internal energy is the total of their kinetic energy and their potential energy.",
      "Temperature is linked to the average kinetic energy of the particles. Hotter means the particles move faster on average.",
      "Adding energy to a substance raises its internal energy. The particles can gain kinetic energy, potential energy, or both.",
      "The Kelvin scale starts at absolute zero, where particles have the least possible energy. Absolute zero is about 273 degrees below 0 on the Celsius scale, so T(K) = T(°C) + 273."
    ],
    "remember": "Internal energy is the particles' kinetic plus potential energy. Temperature tracks the average kinetic energy.",
    "a": {
      "q": "Which statement best describes the internal energy of a block of copper?",
      "opts": [
        "The sum of kinetic and potential energy of its particles",
        "The kinetic energy of the whole block as it moves",
        "The average speed of the particles in the block",
        "The potential energy of the block above the ground"
      ],
      "why": "Internal energy is the total of the kinetic and potential energy of the particles inside the substance. The average speed or kinetic energy of the particles relates to temperature, not to the total, and the motion or height of the whole block does not change it.",
      "clue": "Think about the particles inside, not the block as a whole."
    },
    "b": {
      "d": 2,
      "q": "A lab thermometer reads 27 °C. What is this temperature on the Kelvin scale?",
      "opts": ["300 K", "246 K", "27 K", "-246 K"],
      "why": "Add 273 to the Celsius value: 27 + 273 = 300 K. The 246 K option comes from 273 − 27, which reverses the conversion. Working out 27 − 273 gives −246, which is impossible, as the Kelvin scale starts at absolute zero and has no negative values.",
      "clue": "Should the Kelvin number be bigger or smaller than 27?"
    }
  },
  "phys-heat-transfer": {
    "title": "Heat transfer",
    "card": [
      "Heat is energy that moves from a hotter place to a cooler place. It moves in three ways: conduction, convection and radiation.",
      [
        "Conduction",
        "heat passing through direct contact. Vibrating particles pass energy to their neighbours without the material itself moving. Metals conduct well."
      ],
      [
        "Convection",
        "heat carried by the movement of a fluid, which is a liquid or a gas. Warmer fluid is less dense and rises, and cooler fluid sinks to replace it."
      ],
      [
        "Radiation",
        "heat carried by electromagnetic waves, mainly infrared. It needs no particles, so it can cross empty space."
      ]
    ],
    "remember": "Conduction needs contact, convection needs a moving fluid, and radiation needs neither.",
    "a": {
      "q": "Which way of transferring heat can carry energy from the Sun to Earth through space?",
      "opts": ["Radiation", "Conduction", "Convection", "Conduction and convection together"],
      "why": "Space is almost empty, so there are no particles to pass energy on or to flow as a fluid. Radiation uses electromagnetic waves, which need no particles. Conduction and convection both rely on particles.",
      "clue": "Which way does not need any particles?"
    },
    "b": {
      "d": 3,
      "q": "Jin holds one end of a steel spoon. The other end sits in hot soup, and soon his hand feels warm. How did the heat mostly travel along the spoon?",
      "opts": [
        "By conduction, as vibrating particles passed energy on",
        "By convection, as hot steel moved up the spoon",
        "By radiation, as waves crossed the air to his hand",
        "By convection, as hot soup flowed along the handle"
      ],
      "why": "The spoon is a solid, so its particles stay in place and pass energy to their neighbours by vibrating. That is conduction. Convection is tempting because soup is hot, but it needs a fluid to move, and the steel does not flow.",
      "clue": "Does the steel itself move along the spoon?"
    }
  },
  "phys-specific-heat-capacity-physics": {
    "title": "Specific heat capacity in physics",
    "card": [
      "Specific heat capacity (c) is the energy needed to raise the temperature of 1 kg of a substance by 1 °C. Its unit is J/(kg °C).",
      "The energy to change an object's temperature is Q = mcΔT. Q is energy in joules, m is mass in kg, and ΔT is the change in temperature.",
      "For the same mass and the same energy, a substance with a low c warms up more than one with a high c. Water has a high c, about 4200 J/(kg °C).",
      "ΔT is final temperature minus initial temperature. It is negative when the object cools, so Q is then negative and energy leaves the object."
    ],
    "remember": "Q = mcΔT: more mass or a higher c means more energy is needed for the same temperature change.",
    "a": {
      "q": "Two blocks of equal mass gain the same energy. Block X has a lower c than block Y. Which statement is correct?",
      "opts": [
        "Block X warms up by more than block Y",
        "Block Y warms up by more than block X",
        "Both blocks warm up by the same amount",
        "Block X needs more energy for the same rise"
      ],
      "why": "With Q and m equal, ΔT = Q ÷ (mc), so a lower c gives a larger ΔT. Block Y is tempting only if you think a higher c means more warming, but a high c means the block resists temperature change.",
      "clue": "Rearrange the formula to find ΔT."
    },
    "b": {
      "d": 2,
      "q": "Ayesha heats 2.0 kg of water in a pan in Geelong from 20 °C to 30 °C. Water has c = 4200 J/(kg °C). How much energy does the water gain?",
      "opts": ["84 000 J", "8400 J", "42 000 J", "168 000 J"],
      "why": "Q = mcΔT = 2.0 × 4200 × 10 = 84 000 J. The value 42 000 J comes from leaving out the mass of 2.0 kg.",
      "clue": "ΔT is the change in temperature, not the final temperature."
    }
  },
  "phys-latent-heat-2": {
    "title": "Latent heat",
    "card": [
      "During a change of state, such as ice melting or water boiling, energy goes in or out but the temperature stays constant. The energy changes how the particles are arranged, not how fast they move.",
      [
        "Latent heat",
        "the energy absorbed or released when a substance changes state at constant temperature. Melting and boiling absorb it. Freezing and condensing release it."
      ],
      [
        "Formula",
        "Q = mL, where Q is the energy in joules, m is the mass in kilograms and L is the specific latent heat in joules per kilogram."
      ],
      "L depends on the substance and the change. For water, melting ice takes about 3.3 × 10^5 J/kg. Boiling takes about 2.3 × 10^6 J/kg, which is much more."
    ],
    "cardFigs": {
      "1": {
        "kind": "graph",
        "alt": "A heating curve for ice heated until it becomes steam: temperature against energy supplied. The temperature rises, then stays flat while the ice melts at 0 °C, rises again as the water warms, then stays flat for much longer while the water boils at 100 °C, because boiling takes much more energy than melting. It then rises as the steam heats.",
        "x": {"min": 0, "max": 3200, "label": "Energy supplied"},
        "y": {"min": 240, "max": 420, "label": "Temperature"},
        "items": [
          {
            "type": "curve",
            "id": "h",
            "points": [[0, 253], [42, 273], [372, 273], [792, 373], [3052, 373], [3092, 393]]
          },
          {"type": "text", "at": [50, 273], "label": "melting, 0 °C", "pos": "below-right"},
          {"type": "text", "at": [1900, 373], "label": "boiling, 100 °C", "pos": "below"},
          {"type": "text", "at": [600, 322], "label": "water", "pos": "above-left"},
          {"type": "text", "at": [3072, 383], "label": "steam", "pos": "left"}
        ]
      }
    },
    "remember": "During a change of state the energy goes into changing particle arrangement, so temperature stays constant. Use Q = mL.",
    "a": {
      "q": "A block of ice at 0 °C is heated and begins to melt. What happens to the energy supplied while it melts?",
      "opts": [
        "It changes the particle arrangement, not the temperature",
        "It raises the temperature of the ice until it is all melted",
        "It is lost to the surroundings and does not affect the ice",
        "It makes the particles move faster, so the water gets hotter"
      ],
      "why": "During melting, the energy goes into changing how the particles are arranged, so the temperature stays at 0 °C. The tempting option says the temperature rises, but the temperature is constant during a change of state.",
      "clue": "Look at what stays constant during a change of state."
    },
    "b": {
      "d": 3,
      "q": "Priya heats 0.50 kg of water at 100 °C until it has all boiled to steam at 100 °C. About how much energy is needed, using L = 2.3 × 10^6 J/kg?",
      "opts": ["1.2 × 10^6 J", "4.6 × 10^6 J", "2.3 × 10^6 J", "1.2 × 10^5 J"],
      "why": "Q = mL = 0.50 × 2.3 × 10^6 = 1.15 × 10^6 J, which is about 1.2 × 10^6 J. Using 2.3 × 10^6 J ignores the mass and gives the energy for 1 kg.",
      "clue": "Multiply the mass by L, and check the mass is not 1 kg."
    }
  },
  "phys-cooling-by-evaporation": {
    "title": "Cooling by evaporation",
    "card": [
      "Particles in a liquid move at different speeds. Some have more kinetic energy than others, and the average sets the temperature.",
      "Evaporation happens at the surface. A particle can escape as a gas only if it has enough kinetic energy to break free of the attraction of its neighbours.",
      "So the fastest particles leave first. The particles left behind have a lower average kinetic energy.",
      "Lower average kinetic energy means the remaining liquid is cooler. This is why sweat on skin cools the body as it evaporates."
    ],
    "remember": "Evaporation removes the most energetic particles, so the liquid left behind cools.",
    "a": {
      "q": "Why does a liquid cool as it evaporates?",
      "opts": [
        "The fastest particles leave, so the average energy falls",
        "Every particle slows down by the same amount as it escapes",
        "The liquid gains energy from the air and so it cools",
        "Particles that escape take the slowest ones with them"
      ],
      "why": "Only particles with enough kinetic energy can escape, so the fastest ones leave. The average kinetic energy of the particles left behind falls, and so does the temperature. It is not the slowest particles that leave, because they cannot break free.",
      "clue": "Think about which particles can break free of their neighbours."
    },
    "b": {
      "d": 2,
      "q": "Mia steps out of a pool on a warm, dry day in Mildura and feels cold as the water on her skin dries. What is the best explanation?",
      "opts": [
        "The fastest water particles escape and take energy with them",
        "The water on her skin gains energy from the cool pool",
        "The slowest water particles escape and leave the warmer ones",
        "Her skin loses all of its particles as the water dries"
      ],
      "why": "The most energetic water particles leave the surface, so the average energy of the water left on her skin falls and it cools her skin. The slowest particles do not have enough energy to escape, so the idea that they leave is wrong.",
      "clue": "Which particles have enough energy to leave the surface?"
    }
  },
  "phys-black-body-radiation-2": {
    "title": "Black body radiation",
    "card": [
      "A black body is an ideal object that absorbs all the radiation that hits it. At any temperature above absolute zero, it emits radiation across a range of wavelengths.",
      "The hotter the object, the more energy it emits in total each second. The Stefan-Boltzmann law says this power rises with the fourth power of the temperature in kelvin.",
      "The peak wavelength is the wavelength at which the most energy is emitted. Wien's law says it gets shorter as temperature rises, because peak wavelength is inversely proportional to temperature in kelvin.",
      "Real objects only approximate a black body. A heated piece of metal glows dull red, then orange, then white as its peak moves to shorter wavelengths and more visible light is emitted."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Intensity against wavelength for two black bodies. The 5000 K curve is higher at every wavelength, so it emits more energy in total each second, and its peak wavelength, about 0.58 μm, is shorter than the 4000 K curve's, about 0.72 μm. An arrow from the cooler peak to the hotter peak shows the peak moving to a shorter wavelength.",
        "x": {"min": 0, "max": 2.5, "label": "Wavelength (μm)", "step": 0.5},
        "y": {"min": 0, "max": 10.5, "label": "Intensity"},
        "items": [
          {
            "type": "fn",
            "id": "t4",
            "expr": "\\frac{83.86}{x^{5}\\left(e^{\\frac{3.597}{x}} - 1\\right)}",
            "domain": [0.15, 2.5],
            "label": "4000 K",
            "labelAt": 1.442,
            "pos": "below-left",
            "style": "dash"
          },
          {
            "type": "fn",
            "id": "t5",
            "expr": "\\frac{83.86}{x^{5}\\left(e^{\\frac{2.8776}{x}} - 1\\right)}",
            "domain": [0.15, 2.5],
            "label": "5000 K",
            "labelAt": 0.82,
            "pos": "above-right"
          },
          {"type": "point", "at": [0.5796, 9.011], "on": ["t5"], "is": "turning point"},
          {"type": "point", "at": [0.7244, 2.953], "on": ["t4"], "is": "turning point"},
          {"type": "arrow", "from": [0.7244, 3.553], "to": [0.6096, 8.3], "label": "hotter", "pos": "below"}
        ]
      }
    },
    "remember": "Hotter means more total energy emitted and a shorter peak wavelength.",
    "a": {
      "q": "A metal rod is heated until its temperature in kelvin doubles. What happens to the radiation it emits?",
      "opts": [
        "More energy in total, and a shorter peak wavelength",
        "More energy in total, and a longer peak wavelength",
        "Less energy in total, and a shorter peak wavelength",
        "The same energy in total, and a shorter peak wavelength"
      ],
      "why": "A hotter object emits more energy in total, and its peak moves to a shorter wavelength. The option with a longer peak wavelength reverses Wien's law, which says peak wavelength falls as temperature rises.",
      "clue": "Think of metal going from red to white as it heats."
    },
    "b": {
      "d": 3,
      "q": "Star P has a surface temperature of 3000 K. Star Q has a surface temperature of 6000 K. Which statement compares their radiation correctly?",
      "opts": [
        "Q has a peak wavelength half that of P",
        "Q has a peak wavelength twice that of P",
        "Q has a peak wavelength the same as P",
        "Q has a peak wavelength a quarter that of P"
      ],
      "why": "Peak wavelength is inversely proportional to temperature in kelvin. Doubling the temperature halves the peak wavelength. The option saying twice is tempting, but it treats the two as directly proportional.",
      "clue": "Peak wavelength and temperature move in opposite directions."
    }
  },
  "phys-greenhouse-effect-climate": {
    "title": "The greenhouse effect and climate",
    "card": [
      "Earth absorbs energy from the Sun, mostly as visible light. The warm surface then emits energy back towards space as infrared radiation.",
      "Greenhouse gases, such as carbon dioxide, methane and water vapour, absorb some of this infrared radiation. They then re-emit it in all directions, including back down to the surface.",
      "This extra energy returning to the surface keeps Earth warmer than it would be without these gases. This is the greenhouse effect, and it is a natural process.",
      "Adding more greenhouse gases to the atmosphere means more infrared radiation is absorbed and re-emitted downwards. This warms the surface further and changes the climate."
    ],
    "remember": "Greenhouse gases trap infrared radiation from the surface, so more gas means more warming.",
    "a": {
      "q": "Which process is the greenhouse effect?",
      "opts": [
        "Gases absorb and re-emit infrared from Earth's surface",
        "Gases block sunlight so less of it reaches the surface",
        "Gases reflect visible light from the Sun back into space",
        "Gases create new thermal energy inside the atmosphere"
      ],
      "why": "The surface emits infrared, and greenhouse gases absorb it and re-emit some of it back down, which warms the surface. The gases do not block sunlight or make new energy. Blocking sunlight would cool Earth, not warm it.",
      "clue": "Think about what the warm surface sends out, and what happens to it."
    },
    "b": {
      "d": 3,
      "q": "Over many years, the amount of carbon dioxide in the atmosphere above a region rises. What is the most direct effect on energy at the surface?",
      "opts": [
        "More infrared is re-emitted downwards to the surface",
        "Less infrared leaves the surface in the first place",
        "More visible light is emitted by the surface",
        "Less sunlight is absorbed by the surface"
      ],
      "why": "More carbon dioxide absorbs more of the surface's infrared and re-emits more of it back down, so the surface warms. The surface does not emit less infrared, since that depends on its temperature. Visible light from the Sun is not what the extra gas changes.",
      "clue": "Which radiation do greenhouse gases interact with?"
    }
  },
  "phys-electrical-power-energy": {
    "title": "Electrical power and energy",
    "card": [
      "Electrical power is the rate at which a device transfers energy. P = VI, where P is in watts (W), V is in volts (V) and I is in amperes (A).",
      "Energy transferred = power × time, or E = Pt. With P in watts and t in seconds, E is in joules (J). One watt is one joule per second.",
      "Electricity bills use the kilowatt-hour (kWh). It is the energy used by a 1 kW device running for 1 hour.",
      "To find kWh, change power to kilowatts and time to hours, then multiply. 1 kWh = 3.6 million joules."
    ],
    "remember": "Power is VI. Energy is power × time, and a kWh is 1 kW for 1 hour.",
    "a": {
      "q": "A heater runs from a 240 V supply and draws a current of 5.0 A. What is its power?",
      "opts": ["1200 W", "48 W", "245 W", "0.021 W"],
      "why": "P = VI = 240 × 5.0 = 1200 W. Dividing V by I gives 48, which is a resistance in ohms, not a power.",
      "clue": "Multiply the voltage by the current."
    },
    "b": {
      "d": 3,
      "q": "Priya runs a 2000 W fan heater for 3 hours. How much energy does she use, as billed?",
      "opts": ["6 kWh", "6000 kWh", "0.67 kWh", "2 kWh"],
      "why": "Change 2000 W to 2 kW, then E = 2 × 3 = 6 kWh. Leaving the power in watts gives 6000, which is in watt-hours, not kilowatt-hours.",
      "clue": "Change watts to kilowatts before multiplying by hours."
    }
  },
  "phys-non-ohmic-devices": {
    "title": "Non-ohmic devices",
    "card": [
      [
        "Ohmic",
        "a device whose resistance stays constant, so current is directly proportional to voltage. Its I-V graph is a straight line through the origin."
      ],
      [
        "Non-ohmic",
        "a device whose resistance changes as the voltage or conditions change. Its I-V graph is not a straight line through the origin."
      ],
      [
        "Diode and LED",
        "these let current flow easily in one direction only. An LED is a diode that gives off light. Little current flows until the voltage passes a certain value, then the current rises steeply."
      ],
      [
        "Thermistor and LDR",
        "a thermistor changes resistance with temperature. A light dependent resistor (LDR) changes resistance with light level. For a typical LDR, resistance falls as light gets brighter."
      ]
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Current against voltage for a resistor and a diode. The resistor's graph is a straight line through the origin, so it is ohmic. The diode carries almost no current when connected the other way (negative voltage) and very little at first the right way round, then the current rises steeply once the voltage passes about 0.6 V, so it is non-ohmic.",
        "x": {"min": -0.6, "max": 1, "label": "Voltage (V)", "step": 0.2, "nums": false},
        "y": {"min": -20, "max": 42, "label": "Current (mA)", "step": 10},
        "items": [
          {
            "type": "fn",
            "id": "r",
            "expr": "30x",
            "domain": [-0.6, 1],
            "label": "resistor",
            "labelAt": -0.4,
            "pos": "below-right"
          },
          {
            "type": "fn",
            "id": "d",
            "expr": "0.0001\\left(e^{20x} - 1\\right)",
            "domain": [-0.6, 0.645],
            "label": "diode",
            "labelAt": 0.62,
            "pos": "left"
          }
        ]
      }
    },
    "remember": "If the I-V graph is not a straight line through the origin, the device is non-ohmic.",
    "a": {
      "q": "The I-V graph of a component is a curve. What does this show about the component?",
      "opts": [
        "Its resistance changes, so it is non-ohmic",
        "Its resistance is constant, so it is ohmic",
        "Its current stays the same at every voltage",
        "It lets current flow in both directions equally"
      ],
      "why": "A curved I-V graph means the ratio of voltage to current is not constant, so the resistance changes and the device is non-ohmic. A constant resistance would give a straight line through the origin.",
      "clue": "What shape is the graph for a device with constant resistance?"
    },
    "b": {
      "d": 3,
      "q": "Priya tests a component in a Bendigo school lab. Connected one way, almost no current flows. Connected the other way, little current flows until the voltage passes a certain value, then it rises steeply. What is the component?",
      "opts": ["A diode", "A thermistor", "A light dependent resistor", "A fixed resistor"],
      "why": "Current flows easily in only one direction and rises steeply once the voltage passes a certain value, which is how a diode behaves. A thermistor is tempting because its graph also curves, but it lets current flow in both directions.",
      "clue": "What happens when she reverses the connection?"
    }
  },
  "phys-circuits-home": {
    "title": "Circuits in the home",
    "card": [
      "Household appliances are mostly wired in parallel. Each one sits on its own branch, connected across the active and neutral wires from the supply.",
      "In a parallel circuit, every branch has the same voltage across it. In Australian homes this is about 230 V, so each appliance gets the full supply voltage.",
      "Each branch carries its own current. If one appliance is switched off or fails, the other branches are not cut off and keep working.",
      "The current in the main supply wire is the sum of the branch currents. Turning on more appliances adds more branches, so the total current rises."
    ],
    "remember": "Parallel branches share the same voltage, work independently, and their currents add.",
    "a": {
      "q": "A kettle and a toaster are plugged into two sockets on the same household circuit. The toaster is switched off. What happens to the kettle?",
      "opts": [
        "It keeps working with the same voltage across it",
        "It works, but with a lower voltage across it",
        "It stops, because the circuit is now broken",
        "It works, but with a higher voltage across it"
      ],
      "why": "The kettle is on its own parallel branch, so switching off the toaster does not break its path. The voltage across it stays the same. In a series circuit, one open switch would stop the current everywhere, but that is not how sockets are wired.",
      "clue": "Each appliance is on its own branch."
    },
    "b": {
      "d": 2,
      "q": "In Priya's home in Geelong, a lamp is on and a heater is then switched on in the same circuit. What happens to the total current in the supply wire?",
      "opts": [
        "It rises, because the heater adds a branch current",
        "It stays the same, because the voltage is unchanged",
        "It falls, because the voltage is shared between them",
        "It stays the same, because the lamp keeps its current"
      ],
      "why": "In parallel, the total current is the sum of the branch currents. The heater adds its own current to the lamp's, so the total rises. The voltage stays the same for each branch, but that does not mean the total current stays the same.",
      "clue": "Branch currents add together."
    }
  },
  "phys-electrical-safety-at-home": {
    "title": "Safety devices",
    "card": [
      [
        "Fuse",
        "a thin wire in the live line that melts when the current is too high. This breaks the circuit, and a melted fuse must be replaced."
      ],
      [
        "Circuit breaker",
        "a switch that trips open when the current is too high, so the circuit is broken. It can be reset after the fault is fixed."
      ],
      [
        "Earthing",
        "a wire joins the metal case of an appliance to the ground. If the live wire touches the case, current flows safely through the earth wire, and this large current blows the fuse or trips the breaker."
      ],
      [
        "Residual current device",
        "a device that compares the current in the live and neutral wires. If some current leaks out, as it would through a person, the two differ and it cuts the power very quickly."
      ]
    ],
    "remember": "Fuses and breakers stop too much current. Earthing gives a safe path. A residual current device spots leaks.",
    "a": {
      "q": "Which device cuts the power because the current in the live and neutral wires is different?",
      "opts": ["A residual current device", "A fuse", "A circuit breaker", "An earth wire"],
      "why": "A residual current device compares the two currents, and a difference means current is leaking elsewhere. A fuse and a circuit breaker respond to a high current in the circuit, not to a difference between wires.",
      "clue": "Which device compares two wires?"
    },
    "b": {
      "d": 3,
      "q": "Jo's metal toaster has a fault, and the live wire touches its metal case. The case is earthed. What does the earth wire do?",
      "opts": [
        "Carries current to ground, so a fuse or breaker acts",
        "Stops current reaching the ground, so the case stays safe",
        "Compares live and neutral currents, then cuts the power",
        "Lowers the case's voltage, so the fuse is not needed"
      ],
      "why": "The earth wire joins the case to the ground, giving the fault current a safe path. That large current blows the fuse or trips the breaker, which cuts the power. Comparing the live and neutral currents is the job of a residual current device, not the earth wire.",
      "clue": "Picture the easiest path the fault current can take."
    }
  },
  "phys-electric-shock": {
    "title": "Electric shock",
    "card": [
      "An electric shock happens when current passes through the body. Current, not voltage alone, causes the harm.",
      "The harm grows with the size of the current and with how long it flows. Current is roughly V ÷ R, so lower body resistance lets more current flow at the same voltage. Wet skin has a lower resistance than dry skin.",
      "Effects range from a tingle and muscle spasms to burns and the heart beating abnormally. A current of around 0.1 A or more through the chest can be fatal.",
      "First aid: switch off the power, or free the person using a non-conductor such as dry wood. Do not touch them while they are still in contact. Then call 000, and start CPR if they are not breathing."
    ],
    "remember": "Harm depends on current and time, so cut the power first and then get help.",
    "a": {
      "q": "Two people touch the same faulty wiring at the same voltage. Why might one receive a larger current than the other?",
      "opts": [
        "Their bodies have different resistances",
        "One person touches the wiring for a longer time",
        "One has wet skin, which raises body resistance",
        "One body uses up more of the flow than the other"
      ],
      "why": "At the same voltage, current is roughly V ÷ R, so the body with lower resistance gets more current. Wet skin is tempting, but it lowers resistance rather than raising it. Touching for longer adds to the harm but does not change the size of the current.",
      "clue": "Besides voltage, what else sets the current?"
    },
    "b": {
      "d": 3,
      "q": "Jai finds his friend gripping a damaged power cord and unable to let go. The power point is nearby. What should Jai do first?",
      "opts": [
        "Switch off the power at the power point",
        "Pull his friend away from the cord by the arm",
        "Call 000 and wait beside his friend for help",
        "Start CPR while his friend still holds the cord"
      ],
      "why": "Cutting the power stops the current and keeps Jai safe. Pulling his friend by the arm is tempting, but Jai could become part of the circuit and be shocked too. Calling 000 and CPR come after the danger is removed.",
      "clue": "Remove the danger before helping, so you are not shocked too."
    }
  },
  "phys-scalars-vectors-2": {
    "title": "Scalars and vectors",
    "card": [
      [
        "Scalar",
        "a quantity with size only, such as distance, speed, mass and time. It is fully described by a number and a unit."
      ],
      [
        "Vector",
        "a quantity with size and direction, such as displacement, velocity and force. A full description needs a number, a unit and a direction."
      ],
      "Direction can be given in words, such as north or upwards, or by a sign, such as + and - along a line. Opposite directions have opposite signs.",
      "A vector keeps its direction in the answer. 50 km/h is a speed. 50 km/h east is a velocity."
    ],
    "remember": "If a quantity needs a direction to be complete, it is a vector. If not, it is a scalar.",
    "a": {
      "q": "Which quantity is a vector?",
      "opts": [
        "A force of 20 N acting downwards",
        "A mass of 20 kg measured on scales",
        "A time of 20 s measured on a stopwatch",
        "A speed of 20 m/s shown on a speedometer"
      ],
      "why": "A force of 20 N acting downwards has a size and a direction, so it is a vector. A speed of 20 m/s is tempting, but the speedometer gives size only, so it is a scalar. How a value was measured does not give it a direction.",
      "clue": "Which one includes a direction, not just a way of measuring?"
    },
    "b": {
      "d": 3,
      "q": "Priya cycles at 12 m/s around a circular track. Which statement about her motion is correct?",
      "opts": [
        "12 m/s is her speed, as no direction is given",
        "12 m/s is her velocity, as it has a size",
        "12 m/s is her speed, as she travels in a circle",
        "12 m/s is her velocity, as it is measured in m/s"
      ],
      "why": "The value 12 m/s has a size only, with no direction stated, so it is a speed, which is a scalar. Units of m/s do not decide it: a velocity must also include a direction.",
      "clue": "Does the value 12 m/s include a direction?"
    }
  },
  "phys-displacement-velocity-acceleration": {
    "title": "Displacement, velocity and acceleration",
    "card": [
      [
        "Displacement",
        "the straight-line change in position, from start to finish, with a direction. It is not the same as the distance travelled along the path."
      ],
      [
        "Velocity",
        "the rate of change of displacement. Average velocity = change in displacement ÷ time taken. Its unit is m s⁻¹."
      ],
      [
        "Acceleration",
        "the rate of change of velocity. Average acceleration = change in velocity ÷ time taken. Its unit is m s⁻²."
      ],
      "Change in velocity is final velocity minus initial velocity. Velocity changes if speed changes, if direction changes, or both, so a body can accelerate while its speed stays the same."
    ],
    "remember": "Displacement over time gives velocity. Velocity change over time gives acceleration.",
    "a": {
      "q": "A cyclist's velocity changes from 2 m s⁻¹ east to 8 m s⁻¹ east in 3 s. What is the average acceleration?",
      "opts": ["2 m s⁻² east", "6 m s⁻² east", "2.7 m s⁻² east", "5 m s⁻² east"],
      "why": "Change in velocity = 8 - 2 = 6 m s⁻¹, and 6 ÷ 3 = 2 m s⁻². Dividing the final velocity by the time gives 2.7, but acceleration depends on the change in velocity, not the final value.",
      "clue": "Find the change in velocity first, then divide by the time."
    },
    "b": {
      "d": 3,
      "q": "Priya walks 60 m east along a track, then 20 m west, in 40 s. What is her average velocity?",
      "opts": ["1.0 m s⁻¹ east", "2.0 m s⁻¹ east", "1.5 m s⁻¹ east", "0.5 m s⁻¹ east"],
      "why": "Her displacement is 60 - 20 = 40 m east, so average velocity = 40 ÷ 40 = 1.0 m s⁻¹ east. Using the 80 m distance travelled gives 2.0, but velocity uses displacement, not distance.",
      "clue": "Velocity uses the change in position, not the path length."
    }
  },
  "phys-motion-graphs": {
    "title": "Motion graphs",
    "card": [
      "On a position-time graph, the gradient is the velocity. A straight line means constant velocity, and a flat line means the object is at rest.",
      "On a velocity-time graph, the gradient is the acceleration. The area between the line and the time axis is the displacement.",
      "On an acceleration-time graph, the area under the line is the change in velocity.",
      "A curved line means the gradient is changing. So a curve on a position-time graph shows changing velocity, and a curve on a velocity-time graph shows changing acceleration."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "A velocity-time graph. The velocity rises in a straight line from 2 m/s to 8 m/s in the first 4 s, so the gradient there is the acceleration, 1.5 m/s squared. It then stays at 8 m/s, a zero gradient. The shaded area between the line and the time axis is the displacement.",
        "x": {"min": 0, "max": 13.5, "label": "Time (s)", "step": 2},
        "y": {"min": 0, "max": 13, "label": "Velocity (m/s)", "step": 2},
        "items": [
          {"type": "shade", "under": "v", "span": [0, 10], "label": "area = displacement", "at": [5.6, 3.2]},
          {"type": "curve", "id": "v", "points": [[0, 2], [4, 8], [10, 8]]},
          {"type": "text", "at": [4.6, 10.6], "label": "gradient = acceleration", "pos": "above"},
          {"type": "arrow", "from": [2.6, 10.4], "to": [2.1, 5.6]}
        ]
      }
    },
    "remember": "Position, velocity, acceleration: gradient gives the next one along, and area gives the change in the one before.",
    "a": {
      "q": "A cyclist's velocity-time graph is a straight line sloping upwards from the origin. What does this show?",
      "opts": ["Constant acceleration", "Constant velocity", "Zero acceleration", "Decreasing velocity"],
      "why": "The gradient of a velocity-time graph is acceleration. A straight sloping line has a constant gradient, so the acceleration is constant. Constant velocity would need a flat line, with zero gradient.",
      "clue": "Gradient on a velocity-time graph gives acceleration."
    },
    "b": {
      "d": 3,
      "q": "A runner's position-time graph is a straight line sloping up for 10 s, then a curve that gets steeper. What does the curve show?",
      "opts": [
        "The runner's velocity is increasing",
        "The runner's velocity is constant",
        "The runner is at rest",
        "The runner's acceleration is zero"
      ],
      "why": "On a position-time graph, the gradient is velocity. A curve that gets steeper has an increasing gradient, so the velocity is increasing. Constant velocity, with zero acceleration, describes the straight section, not the curve.",
      "clue": "Steeper means a larger gradient, and gradient means velocity."
    }
  },
  "phys-equations-motion": {
    "title": "Equations of motion",
    "card": [
      "The equations apply only when acceleration is constant along a straight line. The symbols are u (initial velocity), v (final velocity), a (acceleration), t (time) and s (displacement).",
      "v = u + at links final velocity, initial velocity, acceleration and time. It has no s in it.",
      "s = ut + ½at² links displacement, initial velocity, acceleration and time. It has no v in it.",
      "Pick the equation that holds the three quantities you know and the one you want. Take one direction as positive and give signs to match."
    ],
    "remember": "Constant acceleration only. Choose the equation that leaves out the quantity you do not need.",
    "a": {
      "q": "A trolley starts from rest and accelerates at 3 m/s² for 4 s. What is its final velocity?",
      "opts": ["12 m/s", "7 m/s", "24 m/s", "0.75 m/s"],
      "why": "Use v = u + at, so v = 0 + 3 × 4 = 12 m/s. Adding 3 and 4 to get 7 mixes up the quantities, as acceleration is multiplied by time.",
      "clue": "Rest means u is 0."
    },
    "b": {
      "d": 3,
      "q": "A car moving at 10 m/s accelerates at 2 m/s² for 5 s. How far does it travel in this time?",
      "opts": ["75 m", "50 m", "25 m", "60 m"],
      "why": "Use s = ut + ½at²: s = 10 × 5 + ½ × 2 × 25 = 50 + 25 = 75 m. Giving 50 m leaves out the extra distance gained from accelerating.",
      "clue": "You need the equation with s, u, a and t, and no v."
    }
  },
  "phys-forces-as-vectors": {
    "title": "Forces as vectors",
    "card": [
      "A force is a push or a pull. It has a size, measured in newtons (N), and a direction. A quantity with both is a vector.",
      "Forces add as vectors. Forces in the same direction add, and forces in opposite directions subtract. The result is the net force.",
      "A force at an angle can be split into two components at right angles, usually horizontal and vertical. For a force F at angle θ above the horizontal, the horizontal part is F cos θ and the vertical part is F sin θ.",
      "Common forces are gravity (weight), which pulls down, the normal force, which pushes out at right angles from a surface, and friction, which acts along a surface against sliding."
    ],
    "remember": "A force is a vector: add it with direction in mind, or split it into components.",
    "a": {
      "q": "A 30 N force pulls a box to the right and a 10 N force pulls it to the left. What is the net force?",
      "opts": ["20 N to the right", "40 N to the right", "20 N to the left", "10 N to the right"],
      "why": "Forces in opposite directions subtract, so 30 N - 10 N = 20 N, in the direction of the larger force, to the right. Adding them to get 40 N ignores direction, which is the mistake the vector idea avoids.",
      "clue": "Opposite directions work against each other."
    },
    "b": {
      "d": 3,
      "q": "Priya pulls a sled with a 100 N rope force at 30° above the horizontal. What is the horizontal component of her pull?",
      "opts": ["About 87 N", "50 N", "100 N", "About 58 N"],
      "why": "The horizontal component is F cos θ = 100 × cos 30° ≈ 87 N. The 50 N option is the vertical component, F sin θ, which is the tempting mix-up.",
      "clue": "The horizontal part uses the angle measured from the horizontal."
    }
  },
  "phys-newton-s-first-law-2": {
    "title": "Newton's first law",
    "card": [
      "Newton's first law says an object keeps its velocity unless a net force acts on it. The net force is the sum of all the forces on the object.",
      "If the net force is zero, an object at rest stays at rest. An object that is moving keeps moving in a straight line at the same speed.",
      "So an object moving at constant velocity has a net force of zero. Several forces can still act on it, as long as they balance.",
      "A net force is needed to change the velocity, which means to speed up, slow down or turn. Motion alone does not need a net force."
    ],
    "remember": "No net force means no change in velocity. Constant velocity does not need a net force.",
    "a": {
      "q": "A skydiver falls at a constant velocity of 55 m/s straight down. What is the net force on the skydiver?",
      "opts": [
        "Zero, because the forces on the skydiver balance",
        "Downwards, because the skydiver is moving down",
        "Downwards, because gravity is acting on the skydiver",
        "Upwards, because air resistance acts on the skydiver"
      ],
      "why": "Constant velocity means the velocity is not changing, so the net force is zero. Gravity and air resistance both act, but they balance. The motion downwards does not need a net force downwards.",
      "clue": "Is the velocity changing?"
    },
    "b": {
      "d": 3,
      "q": "Priya pushes a trolley along a flat, straight corridor at a steady 1.5 m/s. Which statement about the forces on the trolley is correct?",
      "opts": [
        "Her push is balanced by the forces resisting the motion",
        "Her push is larger than the forces resisting the motion",
        "Her push is the only force acting along the corridor",
        "Her push is needed to cancel the trolley's weight"
      ],
      "why": "A steady velocity means the net force is zero, so her push must be balanced by friction and other resisting forces along the corridor. A larger push would make the trolley speed up. Weight acts downwards and is balanced by a different force.",
      "clue": "Steady speed in a straight line means what for the net force?"
    }
  },
  "phys-newton-s-second-law-2": {
    "title": "Newton's second law",
    "card": [
      "The net force is the vector sum of all forces on an object. Newton's second law says net force = mass × acceleration, or F = ma.",
      "Force is in newtons (N), mass in kilograms (kg) and acceleration in metres per second squared (m/s²). One newton gives a 1 kg mass an acceleration of 1 m/s².",
      "The acceleration points in the same direction as the net force. For the same net force, a larger mass gives a smaller acceleration.",
      "If the net force is zero, the acceleration is zero. If several forces act, add them as vectors first, then use F = ma on the net force."
    ],
    "remember": "Acceleration depends on the net force and the mass, not on any single force.",
    "a": {
      "q": "A net force of 12 N acts on a 3 kg trolley. What is the trolley's acceleration?",
      "opts": [
        "4 m/s² in the direction of the net force",
        "4 m/s² opposite to the net force",
        "36 m/s² in the direction of the net force",
        "0.25 m/s² in the direction of the net force"
      ],
      "why": "a = F ÷ m = 12 ÷ 3 = 4 m/s², and it points in the direction of the net force. Multiplying 12 by 3 to get 36 is the tempting mistake, because it ignores that acceleration is force divided by mass.",
      "clue": "Divide the net force by the mass."
    },
    "b": {
      "d": 3,
      "q": "Priya pushes a 20 kg box east with 50 N. Friction of 30 N acts west on the box. What is the box's acceleration?",
      "opts": ["1 m/s² east", "2.5 m/s² east", "4 m/s² east", "1 m/s² west"],
      "why": "The net force is 50 N east minus 30 N west, which is 20 N east. Then a = 20 ÷ 20 = 1 m/s² east. Using the 50 N push alone gives 2.5 m/s², which ignores friction.",
      "clue": "Find the net force before you use F = ma."
    }
  },
  "phys-newton-s-third-law-2": {
    "title": "Newton's third law",
    "card": [
      "Forces come in pairs. If object A exerts a force on object B, then B exerts a force on A at the same time.",
      "The two forces in a pair are equal in size, opposite in direction and of the same type, such as both contact forces or both gravitational.",
      "The two forces act on different objects. Because of this, they never cancel each other out.",
      "The pair stays equal whatever the objects are like. It holds if one object is far heavier than the other, and whether each is still or moving."
    ],
    "remember": "Every force has a partner of equal size and opposite direction, acting on the other object.",
    "a": {
      "q": "A skateboarder pushes on a wall with a force of 60 N to the right. What is the partner force?",
      "opts": [
        "The wall pushes the skateboarder with 60 N to the left",
        "The wall pushes the skateboarder with 60 N to the right",
        "The skateboarder's weight pulls down on the skateboarder",
        "The wall pushes the skateboarder with less than 60 N"
      ],
      "why": "The partner force acts on the other object, so the wall pushes on the skateboarder. It is equal in size and opposite in direction, so 60 N to the left. A force to the right would not be opposite to the skateboarder's push.",
      "clue": "Which object does the partner force act on, and which way?"
    },
    "b": {
      "d": 3,
      "q": "A heavy moving truck hits a lighter parked car and pushes on it with 5000 N. What size is the force the car exerts on the truck?",
      "opts": [
        "5000 N, as the pair forces are equal in size",
        "Less than 5000 N, as the car has less mass",
        "More than 5000 N, as the car is damaged more",
        "Zero, as the car was parked before the crash"
      ],
      "why": "The car's push on the truck is the partner of the truck's push on the car, so it is also 5000 N. The pair stays equal even though the truck is heavier and the car was still. Less than 5000 N is tempting, but the size of a third law pair does not depend on the masses of the objects.",
      "clue": "Think about what the third law says a pair depends on."
    }
  },
  "phys-torque-2": {
    "title": "Torque and equilibrium",
    "card": [
      "Torque is the turning effect of a force about a pivot. Torque = force × perpendicular distance from the pivot, so its unit is the newton metre (N m).",
      "Only the distance measured at right angles to the line of the force counts. A bigger force or a longer distance gives a bigger torque.",
      "A torque can turn an object clockwise or anticlockwise. A structure is in equilibrium when the forces balance (net force is zero) and the torques balance (clockwise torque equals anticlockwise torque).",
      "Balanced torques mean the object does not start to rotate. Balanced forces mean it does not start to accelerate in a straight line. Both conditions must hold."
    ],
    "remember": "Torque = force × perpendicular distance. Equilibrium needs balanced forces and balanced torques.",
    "a": {
      "q": "Why is a door easier to push open at the handle than near the hinges?",
      "opts": [
        "A longer distance from the pivot gives a larger torque",
        "A longer distance from the pivot gives a larger net force",
        "The push has a smaller size when applied near the hinges",
        "The handle is lighter, so it needs less torque to turn"
      ],
      "why": "The hinges are the pivot. The same force applied further away has a larger perpendicular distance, so the torque is larger. The size of the force does not change, and torque is not the same as net force.",
      "clue": "The hinges are the pivot. What changes when you push further from it?"
    },
    "b": {
      "d": 3,
      "q": "A 30 N child sits 2.0 m from the pivot of a see-saw. A second child sits on the other side. The see-saw stays level. If the second child weighs 20 N, how far from the pivot do they sit?",
      "opts": ["3.0 m", "1.3 m", "2.0 m", "0.33 m"],
      "why": "For torques to balance, 30 × 2.0 = 20 × d, so d = 3.0 m. The lighter child must sit further away. Sitting at 2.0 m would give a smaller torque, so the see-saw would tip toward the heavier child.",
      "clue": "Set the clockwise torque equal to the anticlockwise torque."
    }
  },
  "phys-momentum-impulse-physics": {
    "title": "Momentum and impulse in physics",
    "card": [
      "Momentum is mass times velocity: p = mv. It is measured in kg m/s and has a direction, the same as the velocity.",
      "Impulse is force times the time the force acts: impulse = FΔt. It equals the change in momentum: FΔt = Δp = mv - mu, where u is the initial velocity and v is the final velocity.",
      "For the same change in momentum, a longer contact time means a smaller average force. This is why a crumple zone or a soft landing reduces the force.",
      "In a system with no external force, total momentum stays the same. The momentum before a collision equals the momentum after it."
    ],
    "remember": "Impulse equals change in momentum. More time means less average force for the same change.",
    "a": {
      "q": "A 0.50 kg ball moving at 6.0 m/s is caught by a player and brought to rest in 0.20 s. What is the average force on the ball?",
      "opts": ["15 N", "3.0 N", "30 N", "0.60 N"],
      "why": "The change in momentum has size 0.50 × 6.0 = 3.0 kg m/s, as the final velocity is 0. Force = 3.0 ÷ 0.20 = 15 N. The answer 3.0 N is the momentum change, which has not been divided by the time.",
      "clue": "Find the change in momentum first, then divide by the time."
    },
    "b": {
      "d": 3,
      "q": "Tariq lands from a jump with his knees bent, so he stops over a longer time than with stiff legs. His momentum change is the same both ways. Why is the force on him smaller?",
      "opts": [
        "The same impulse is spread over a longer time",
        "The impulse is smaller when the time is longer",
        "His momentum change is smaller with bent knees",
        "The force and the time are not related to impulse"
      ],
      "why": "Impulse FΔt equals the change in momentum, which is the same in both landings. If Δt is larger, F must be smaller. The impulse does not shrink, because it is fixed by the momentum change.",
      "clue": "The momentum change is fixed, so what must happen to F when Δt grows?"
    }
  },
  "phys-work-energy": {
    "title": "Work and energy",
    "card": [
      "Work is done when a force moves an object. W = Fs, where s is the distance moved in the direction of the force. It is measured in joules (J).",
      "Work transfers energy. Doing work on an object changes its energy by the same amount.",
      [
        "Kinetic energy",
        "the energy of motion. Ek = ½mv². Doubling the speed makes the kinetic energy four times larger."
      ],
      [
        "Gravitational potential energy",
        "the energy stored by height in a gravitational field. Ep = mgh, with g about 9.8 m/s² near Earth's surface."
      ]
    ],
    "remember": "Work is force times distance. Energy of motion is ½mv² and energy of height is mgh.",
    "a": {
      "q": "A trolley is pushed with a steady force of 40 N along a level path for 5.0 m. How much work is done on the trolley?",
      "opts": ["200 J", "8.0 J", "45 J", "35 J"],
      "why": "Work = force × distance = 40 × 5.0 = 200 J. Dividing the two numbers gives 8.0, but work is found by multiplying them.",
      "clue": "Multiply the force by the distance moved."
    },
    "b": {
      "d": 3,
      "q": "A cyclist on a flat road speeds up from 5 m/s to 10 m/s. By what factor does her kinetic energy increase?",
      "opts": ["4 times", "2 times", "3 times", "8 times"],
      "why": "Kinetic energy depends on v². Doubling the speed multiplies v² by 4, so the energy is four times larger. It is not doubled, because speed is squared in the formula.",
      "clue": "Look at how speed appears in ½mv²."
    }
  },
  "phys-hooke-s-law": {
    "title": "Hooke's law",
    "card": [
      "For an ideal spring, the extension x is directly proportional to the force applied. Doubling the force doubles the extension.",
      "Hooke's law is F = -kx. The spring constant k is the force needed per metre of extension, in N/m. A stiffer spring has a larger k.",
      "The minus sign shows that the spring's restoring force points opposite to the extension. The size of the force is kx.",
      "A stretched or compressed spring stores elastic potential energy. E = ½kx², so doubling the extension makes the stored energy four times greater."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "Force against extension for an ideal spring with k = 40 N/m: a straight line through the origin. The stored energy is the area under the line. Up to 0.2 m the area is a small triangle, E. Doubling the extension to 0.4 m makes the area four times as large: the triangle E plus a strip of 3E.",
        "x": {"min": 0, "max": 0.675, "label": "Extension (m)", "step": 0.1},
        "y": {"min": 0, "max": 21, "label": "Force (N)", "step": 5},
        "items": [
          {"type": "shade", "under": "f", "span": [0, 0.2], "label": "E", "at": [0.14, 1.9]},
          {"type": "shade", "under": "f", "span": [0.2, 0.4], "label": "3E", "at": [0.3, 4.6], "hatch": true},
          {"type": "fn", "id": "f", "expr": "40x", "domain": [0, 0.45]},
          {"type": "guide", "at": [0.2, 8], "xLabel": ""},
          {"type": "guide", "at": [0.4, 16], "xLabel": ""}
        ]
      }
    },
    "remember": "Force is proportional to extension, F = kx in size. Stored energy is ½kx².",
    "a": {
      "q": "A spring stretches 0.10 m when a 5.0 N force is applied. What is its spring constant k, assuming it is ideal?",
      "opts": ["50 N/m", "0.50 N/m", "0.020 N/m", "5.1 N/m"],
      "why": "k = F ÷ x = 5.0 ÷ 0.10 = 50 N/m. Multiplying force by extension gives 0.50, which is not the force per metre.",
      "clue": "Divide the force by the extension in metres."
    },
    "b": {
      "d": 3,
      "q": "Spring A is stretched 2.0 cm and stores energy E. Spring A is then stretched 6.0 cm from rest. How much energy does it store now?",
      "opts": ["9E", "3E", "6E", "27E"],
      "why": "Stored energy is ½kx², so it depends on the square of the extension. Tripling x makes the energy 3² = 9 times greater. Choosing 3E treats energy as proportional to extension, which is true for force but not for energy.",
      "clue": "Energy depends on x squared, not x."
    }
  },
  "phys-conservation-energy-efficiency": {
    "title": "Conservation of energy and efficiency",
    "card": [
      "Energy changes from one form to another but is not created or destroyed. The total energy stays the same.",
      "Some energy usually ends up as thermal energy that spreads into the surroundings. It is not lost, but it is not useful for the task.",
      "Power is the rate of energy transfer: P = E ÷ t. It is measured in watts (W), where 1 W is 1 J each second.",
      "Efficiency is the share of input energy that becomes useful output. Efficiency = useful output ÷ total input, often written as a percentage."
    ],
    "remember": "Energy is never lost, but only the useful share counts toward efficiency.",
    "a": {
      "q": "A motor takes in 500 J of energy and gives out 350 J of useful energy. What is its efficiency?",
      "opts": ["70%", "30%", "150 J", "143%"],
      "why": "Efficiency = 350 ÷ 500 = 0.70, or 70%. The 30% figure is the share of the input that is not useful, mostly thermal energy, so it is not the efficiency.",
      "clue": "Divide the useful output by the total input."
    },
    "b": {
      "d": 3,
      "q": "Nina's kettle transfers 180 000 J of electrical energy in 90 s. What is its power?",
      "opts": ["2000 W", "16 200 000 W", "0.0005 W", "90 W"],
      "why": "Power = energy ÷ time = 180 000 ÷ 90 = 2000 W. Multiplying the two numbers gives a far larger value, but power is a rate, so it needs division by the time.",
      "clue": "Power is energy transferred each second."
    }
  },
  "phys-aims-hypotheses-models-theories": {
    "title": "Aims, hypotheses, models and theories",
    "card": [
      [
        "Aim",
        "states what an investigation will test or find out. It is often written as a purpose, such as \"To investigate how the length of a pendulum affects its period\"."
      ],
      [
        "Hypothesis",
        "a testable prediction of the result, often with a reason. For example: \"If the length increases, the period will increase.\" Data can support it or fail to support it."
      ],
      [
        "Model",
        "a simplified picture or set of ideas used to explain or predict how something behaves. A theory is a broader explanation that has been tested many times and is supported by a lot of evidence."
      ],
      [
        "Law",
        "a short description of a pattern that has been observed, often as an equation, such as F = ma. A law describes what happens. A theory explains why."
      ]
    ],
    "remember": "Aim: what is tested. Hypothesis: the predicted result. Model and theory explain, and a law describes a pattern.",
    "a": {
      "q": "Ana is planning a ramp investigation with trolleys. Which statement is a hypothesis?",
      "opts": [
        "A heavier trolley will roll down a ramp more slowly",
        "To find out how trolley mass affects speed on a ramp",
        "Trolley speed is measured with a light gate and timer",
        "Trolleys are modelled as point masses on the ramp"
      ],
      "why": "A hypothesis predicts a result that can be tested, and the trolley statement does this. The statement starting with \"To find out\" is an aim, because it says what is tested without predicting an outcome.",
      "clue": "Which one predicts what will happen?"
    },
    "b": {
      "d": 3,
      "q": "Priya measures the current through a resistor at several voltages. In her results, current is proportional to voltage, so V = IR with R constant. She gives no reason why. What is this statement?",
      "opts": [
        "A law, because it describes a pattern in observations",
        "A theory, because it is supported by many results",
        "A hypothesis, because it predicts a future result",
        "An aim, because it states what the test is about"
      ],
      "why": "Current being proportional to voltage, with R constant, describes a pattern seen in measurements. It does not explain why, so it is a law: this one is known as Ohm's law. A theory is tempting because the pattern is well supported, but a theory explains why something happens.",
      "clue": "Does the statement describe a pattern or explain a cause?"
    }
  },
  "phys-accuracy-precision-validity-physics": {
    "title": "Accuracy, precision and validity",
    "card": [
      [
        "Accurate",
        "results are close to the true value. A set of readings can be accurate when their average is near the accepted value."
      ],
      ["Precise", "results agree closely with each other. Precise readings can still be far from the true value."],
      [
        "Valid",
        "an investigation is valid when it measures what it set out to measure, and only the independent variable changes the dependent variable. Other variables are controlled."
      ],
      "An investigation can give precise results and still be invalid, for example if a variable that should be controlled is left to change."
    ],
    "remember": "Accurate is close to the true value, precise is close together, and valid is measuring what you meant to.",
    "a": {
      "q": "Four students time a pendulum swing that is known to take 2.00 s. Whose readings are precise but not accurate?",
      "opts": ["2.51, 2.50, 2.52, 2.51 s", "2.00, 2.01, 1.99, 2.00 s", "1.6, 2.4, 2.1, 1.9 s", "1.4, 2.6, 2.9, 1.1 s"],
      "why": "The readings 2.51, 2.50, 2.52 and 2.51 s agree closely, so they are precise, but they sit well above 2.00 s, so they are not accurate. The readings 2.00, 2.01, 1.99 and 2.00 s are both precise and accurate, which is why that option is tempting.",
      "clue": "Look for readings that agree with each other but miss 2.00 s."
    },
    "b": {
      "d": 3,
      "q": "Priya tests how the mass of a trolley affects its acceleration down a ramp. She adds mass but also raises the ramp each time. Her timings agree closely. What is the main problem?",
      "opts": [
        "The investigation is not valid, as the slope also changed",
        "The timings are not precise, as the mass changed",
        "The investigation is not accurate, as the timings agree",
        "The results are not valid, as the timings agree closely"
      ],
      "why": "Raising the ramp changes a second variable that should be controlled, so the results do not show the effect of mass alone. This makes the investigation invalid. Close agreement of timings shows precision, but precision does not make an investigation valid.",
      "clue": "Which variable should have been kept the same?"
    }
  },
  "phys-uncertainty-error": {
    "title": "Uncertainty and error",
    "card": [
      [
        "Random error",
        "a small, unpredictable variation that makes repeated readings scatter around a value. Repeating the measurement and averaging reduces its effect."
      ],
      [
        "Systematic error",
        "a fault that shifts every reading the same way, such as a balance that is not zeroed. Repeating and averaging does not remove it."
      ],
      [
        "Uncertainty",
        "a range that shows how far a measured value could be from the true value, written as 12.4 ± 0.2 s. A smaller range means the result can be trusted more."
      ],
      "A measuring tool has a limit to its reading. A common estimate of reading uncertainty is half the smallest scale division."
    ],
    "remember": "Random error scatters readings, systematic error shifts them, and uncertainty gives the range of doubt.",
    "a": {
      "q": "A student times a trolley with a stopwatch that starts 0.3 s late every run. What type of error is this?",
      "opts": [
        "Systematic error, as every time is shifted the same way",
        "Random error, as the times differ from the true value",
        "Systematic error, as the readings scatter from run to run",
        "Random error, as averaging the times will remove it"
      ],
      "why": "The stopwatch shifts every reading by the same amount, so it is a systematic error. Averaging does not remove it, which is why the random error options are wrong.",
      "clue": "Does the fault push every reading the same way?"
    },
    "b": {
      "d": 3,
      "q": "Mia measures a pendulum's period five times and gets 1.92, 2.05, 1.98, 2.10 and 1.95 s. Her clock is accurate. Which change best reduces the effect of the variation in her results?",
      "opts": [
        "Repeat many more times and average the results",
        "Subtract a fixed amount from every reading",
        "Replace the pendulum string with a longer one",
        "Record only the first reading to avoid confusion"
      ],
      "why": "The readings scatter both above and below a value, so the variation is random. Repeating and averaging reduces random error. Subtracting a fixed amount would suit a systematic shift, but the readings here are not shifted one way.",
      "clue": "Are the readings scattered or all shifted the same way?"
    }
  },
  "phys-reporting-investigation": {
    "title": "Reporting an investigation",
    "card": [
      "A report presents what was found so that another person can follow it and check it. Use correct physics terms and give every measurement with its correct unit, such as 2.4 m/s or 15 N.",
      "Give results to a sensible number of significant figures. A value should not show more digits than the measuring instrument can support. A ruler marked in millimetres cannot give a length such as 12.3456 cm.",
      "Draw a graph to show a pattern. Put the independent variable on the horizontal axis and the dependent variable on the vertical axis. Label each axis with its quantity and unit, and draw a line of best fit through the points.",
      "Link the findings to physics ideas. State what the results show, then explain it using a relevant concept, model or law."
    ],
    "remember": "A good report gives units, sensible significant figures and labelled graphs, then links results to physics.",
    "a": {
      "q": "A student times a trolley with a stopwatch that reads to 0.01 s. Which way of reporting the time best follows good reporting practice?",
      "opts": ["2.35 s", "2.3517 s", "2.35", "2.35 m"],
      "why": "2.35 s gives the correct unit for time and the digits the stopwatch can read. 2.3517 s shows digits the stopwatch cannot measure. 2.35 has no unit, and 2.35 m uses a unit of length, not time.",
      "clue": "Check the unit and the digits the instrument can give."
    },
    "b": {
      "d": 3,
      "q": "Priya measures how the stretch of a spring changes as she adds mass. She chooses the mass to add and measures the stretch. Which graph setup is correct?",
      "opts": [
        "Mass on the horizontal axis, stretch on the vertical axis",
        "Stretch on the horizontal axis, mass on the vertical axis",
        "Mass and stretch both with no axis labels",
        "Mass on the horizontal axis, with a line joining every point"
      ],
      "why": "Mass is the independent variable, so it goes on the horizontal axis, and stretch is the dependent variable on the vertical axis. Swapping them is tempting, but the variable Priya controls goes on the horizontal axis. Axes also need labels with units, and a line of best fit is drawn, not a line joining every point.",
      "clue": "Which quantity did Priya choose, and which did she measure?"
    }
  },
  "phys-waves-their-properties": {
    "title": "Waves and their properties",
    "card": [
      "Amplitude is the maximum displacement from the rest position. Wavelength (λ) is the distance between two matching points on neighbouring waves, such as crest to crest.",
      "Frequency (f) is the number of waves passing a point each second, in hertz. Period (T) is the time for one wave to pass, so T = 1 ÷ f.",
      "Wave speed, frequency and wavelength are linked by v = fλ. If the speed stays the same, a higher frequency means a shorter wavelength.",
      "In a transverse wave, the vibration is at right angles to the direction the wave travels. Light is transverse and can travel through a vacuum. Sound is a different type of wave and needs a medium such as air."
    ],
    "remember": "v = fλ, and T = 1 ÷ f. Light needs no medium, but sound does.",
    "a": {
      "q": "A wave has a frequency of 4.0 Hz. What is its period?",
      "opts": ["0.25 s", "4.0 s", "0.40 s", "16 s"],
      "why": "Period is the time for one wave, so T = 1 ÷ 4.0 = 0.25 s. Giving 4.0 s mixes up frequency and period, which are inverses of each other.",
      "clue": "Period and frequency are inverses."
    },
    "b": {
      "d": 3,
      "q": "A wave on a lake has a wavelength of 2.0 m and a frequency of 0.50 Hz. A wave of the same type then travels at the same speed with a frequency of 1.0 Hz. What is its wavelength?",
      "opts": ["1.0 m", "2.0 m", "4.0 m", "0.50 m"],
      "why": "The speed is v = fλ = 0.50 × 2.0 = 1.0 m/s. At 1.0 Hz, λ = 1.0 ÷ 1.0 = 1.0 m. Doubling the frequency at the same speed halves the wavelength, so 2.0 m is wrong.",
      "clue": "Find the speed first, then keep it fixed."
    }
  },
  "phys-electromagnetic-spectrum-2": {
    "title": "The electromagnetic spectrum",
    "card": [
      "The electromagnetic spectrum is the family of electromagnetic waves. In order of increasing frequency: radio, microwave, infrared, visible, ultraviolet, x-rays and gamma rays.",
      "All of them travel at the same speed, c, in a vacuum. This is about 3.0 × 10^8 m/s.",
      "Because the speed is fixed at c in a vacuum, a higher frequency means a shorter wavelength. Radio waves have the longest wavelengths and gamma rays the shortest.",
      "The Sun gives out mostly ultraviolet, visible and infrared. The waves differ in frequency and wavelength, not in speed."
    ],
    "remember": "One speed in a vacuum, so higher frequency means shorter wavelength.",
    "a": {
      "q": "Which statement about radio waves and x-rays travelling through a vacuum is correct?",
      "opts": [
        "Same speed, and x-rays have the higher frequency",
        "Same speed, and x-rays have the longer wavelength",
        "X-rays travel faster because their frequency is higher",
        "Radio waves travel faster because their wavelength is longer"
      ],
      "why": "In the spectrum order, x-rays come well after radio waves, so x-rays have the higher frequency. All electromagnetic waves travel at c in a vacuum, so that higher frequency gives x-rays the shorter wavelength, not the longer one. Frequency does not change the speed.",
      "clue": "Speed is fixed, so what must happen to wavelength when frequency rises?"
    },
    "b": {
      "d": 3,
      "q": "Mia compares infrared and ultraviolet waves from the Sun reaching Earth through space. Which comparison is correct?",
      "opts": [
        "Ultraviolet has the shorter wavelength, and both travel at c",
        "Ultraviolet has the shorter wavelength and travels faster",
        "Infrared has the shorter wavelength, and both travel at c",
        "Infrared has the shorter wavelength and travels faster"
      ],
      "why": "Ultraviolet has a higher frequency than infrared, so with the same speed c its wavelength is shorter. The tempting idea that higher frequency means faster is wrong, because both travel at c in a vacuum.",
      "clue": "Place both in the spectrum order, then recall that the speed is the same."
    }
  },
  "phys-refraction-snell-s-law": {
    "title": "Refraction and Snell's law",
    "card": [
      "Refraction is the bending of light when it passes from one material into another. It happens because light changes speed in the new material.",
      "The refractive index n of a material is c ÷ v, where c is the speed of light in a vacuum and v is the speed in the material. A higher n means slower light.",
      "Angles are measured from the normal, a line at right angles to the surface. Snell's law is n1 sin θ1 = n2 sin θ2.",
      "Light entering a material with a higher n slows down and bends towards the normal. Light entering a material with a lower n speeds up and bends away from the normal."
    ],
    "remember": "Slower light bends towards the normal. Faster light bends away from it.",
    "a": {
      "q": "A ray of light passes from air into glass. How does it bend at the surface?",
      "opts": [
        "Towards the normal, because it slows down",
        "Away from the normal, because it slows down",
        "Towards the normal, because it speeds up",
        "Away from the normal, because it speeds up"
      ],
      "why": "Glass has a higher refractive index than air, so light slows down in it and bends towards the normal. Bending away from the normal goes with light speeding up, not slowing down.",
      "clue": "Compare the refractive index of glass with that of air."
    },
    "b": {
      "d": 3,
      "q": "A ray in air hits a flat pool of water at 40° to the normal. Water has n = 1.33 and air has n = 1.00. Which describes the angle in the water?",
      "opts": [
        "Smaller than 40°, because the light slows down",
        "Larger than 40°, because the light slows down",
        "Larger than 40°, because the light speeds up",
        "Exactly 40°, because the ray stays straight"
      ],
      "why": "Water has the higher n, so light slows down and bends towards the normal. By Snell's law, sin θ2 = sin 40° ÷ 1.33 ≈ 0.48, so the angle is about 29°, which is smaller than 40°. Slowing down does not make the angle larger.",
      "clue": "Use Snell's law to find sin θ2, then compare it with sin 40°."
    }
  },
  "phys-total-internal-reflection-optical": {
    "title": "Total internal reflection and optical fibres",
    "card": [
      "When light goes from a material with a higher refractive index to one with a lower index, such as glass to air, it bends away from the normal.",
      "The critical angle is the angle of incidence at which the refracted ray runs along the boundary. Beyond it, no light escapes and all of it reflects back inside.",
      "Total internal reflection needs two things: light travelling in the higher index material, and an angle of incidence greater than the critical angle. Angles of incidence are measured from the normal.",
      "An optical fibre is a thin glass core with a lower index coating around it. Light signals hit the wall beyond the critical angle, so they reflect again and again along the fibre with very little loss."
    ],
    "remember": "Beyond the critical angle, light inside the higher index material reflects completely, so fibres can guide it.",
    "a": {
      "q": "Which situation can produce total internal reflection?",
      "opts": [
        "Glass to air, angle of incidence above the critical angle",
        "Air to glass, angle of incidence above the critical angle",
        "Glass to air, angle of incidence below the critical angle",
        "Air to water, angle of incidence below the critical angle"
      ],
      "why": "Total internal reflection needs light in the higher index material and an angle of incidence beyond the critical angle. Air to glass fails the first need. An angle of incidence below the critical angle fails the second, so some light escapes.",
      "clue": "Check both conditions: which material, and which angle of incidence."
    },
    "b": {
      "d": 2,
      "q": "Why does a light signal stay inside an optical fibre instead of leaking out through the side?",
      "opts": [
        "It hits the wall beyond the critical angle and reflects",
        "It hits the wall below the critical angle and is absorbed",
        "The coating has a higher index than the core and traps it",
        "The signal is a sound wave that cannot leave the glass"
      ],
      "why": "The core has a higher index than the coating, and the light meets the wall beyond the critical angle, so all of it reflects. A higher index coating would let light escape instead.",
      "clue": "Think about the angle of incidence at the wall of the core."
    }
  },
  "phys-dispersion-rainbows-mirages": {
    "title": "Dispersion, rainbows and mirages",
    "card": [
      "Dispersion is the splitting of white light into its colours. It happens because a material has a slightly different refractive index for each colour.",
      "In glass, violet light slows more than red light, so violet bends more. A prism shows this as a band of colours from red to violet.",
      "In a rainbow, light refracts as it enters a raindrop, reflects off the back inside the drop, then refracts again as it leaves. Each colour leaves at a slightly different angle.",
      "A mirage forms when air near the ground is much warmer than the air above. The refractive index changes with height, so light bends gradually and can seem to come from a pool of water."
    ],
    "remember": "Colours bend by different amounts. Warm air also bends light.",
    "a": {
      "q": "Why does a glass prism split white light into colours?",
      "opts": [
        "Each colour has a different refractive index in glass",
        "Each colour travels at a different speed in a vacuum",
        "The prism adds colour to the light as it passes",
        "Red light reflects off the prism and violet light does not"
      ],
      "why": "Each colour has a slightly different refractive index in glass, so each bends by a different amount. In a vacuum all colours travel at the same speed c, so that option is wrong.",
      "clue": "Think about how much each colour bends at the surface."
    },
    "b": {
      "d": 2,
      "q": "On a hot day, Sam sees a shimmering patch that looks like water on a highway ahead. What causes it?",
      "opts": [
        "Light bends in the warm air just above the road",
        "Light reflects off a thin layer of real water",
        "Raindrops split the light into its colours",
        "The road surface gives out its own blue light"
      ],
      "why": "Air just above the hot road has a different refractive index from the cooler air above it, so light bends and seems to come from the ground. Raindrops cause rainbows, not mirages.",
      "clue": "Think about what is different about the air near the road."
    }
  },
  "phys-nuclear-stability": {
    "title": "Nuclear stability",
    "card": [
      "A nucleus contains protons and neutrons. Protons are positively charged, so they repel each other with an electric force.",
      "The strong nuclear force attracts protons and neutrons to each other. It is stronger than the electric force, but acts only over very short distances, about the size of a nucleus.",
      "Neutrons add to the strong force without adding to the repulsion, so they help hold protons together. Light stable nuclei have about equal numbers of each. Heavier ones need more neutrons than protons.",
      "Stability depends on the balance of neutrons to protons. A nucleus with too few or too many neutrons for its protons is unstable. It decays by emitting radiation, which changes it towards a more stable form."
    ],
    "remember": "A stable nucleus has the right balance of neutrons to protons. Too few or too many, and it decays.",
    "a": {
      "q": "What does the strong nuclear force do inside a nucleus?",
      "opts": [
        "Holds protons and neutrons together",
        "Pushes protons apart from each other",
        "Pulls electrons into the nucleus",
        "Makes neutrons repel one another"
      ],
      "why": "The strong force attracts protons and neutrons to each other and works against the electric repulsion between protons. The electric force is what pushes protons apart, so that is not the strong force.",
      "clue": "It acts against the repulsion between protons."
    },
    "b": {
      "d": 3,
      "q": "Carbon-12 has 6 protons and 6 neutrons and is stable. Carbon-14 has 6 protons and 8 neutrons and decays. Why is carbon-14 unstable?",
      "opts": [
        "It has too many neutrons for its number of protons",
        "Its protons repel too strongly for the strong force",
        "Its extra neutrons repel each other electrically",
        "The strong force cannot act on its extra neutrons"
      ],
      "why": "Carbon-14 has the same 6 protons as stable carbon-12, so the proton repulsion is no greater. The difference is its two extra neutrons, which upset the neutron to proton balance. Neutrons have no charge, so they do not repel each other electrically.",
      "clue": "Compare what changes between the two isotopes."
    }
  },
  "phys-nuclear-equations": {
    "title": "Nuclear equations",
    "card": [
      "A nuclear equation shows a nucleus changing in a decay. Each nuclide is written as its symbol with mass number A at the top and atomic number Z at the bottom.",
      "The mass number A is the number of protons and neutrons. The atomic number Z is the number of protons, and it decides which element the atom is.",
      "In every nuclear equation, the total A is the same on both sides. The total Z is also the same on both sides.",
      "An alpha particle is written as He with A = 4 and Z = 2. A beta-minus particle is an electron with A = 0 and Z = -1. Use these to find the missing nuclide."
    ],
    "remember": "Add up the top numbers and the bottom numbers: each total must match on both sides.",
    "a": {
      "q": "In a decay, a nucleus with A = 20 and Z = 9 emits a beta-minus particle. What are A and Z of the new nucleus?",
      "opts": ["A = 20, Z = 10", "A = 20, Z = 8", "A = 19, Z = 9", "A = 16, Z = 7"],
      "why": "The beta-minus particle has A = 0 and Z = -1. A stays at 20, and Z must balance: 9 = Z + (-1), so Z = 10. Z = 8 comes from subtracting 1 instead of balancing the equation.",
      "clue": "Z on the right must add up to 9, including the electron's Z."
    },
    "b": {
      "d": 3,
      "q": "Radium-226 (A = 226, Z = 88) decays by emitting an alpha particle. Which nuclide is formed?",
      "opts": [
        "Radon-222 (A = 222, Z = 86)",
        "Radium-222 (A = 222, Z = 88)",
        "Polonium-222 (A = 222, Z = 84)",
        "Thorium-230 (A = 230, Z = 90)"
      ],
      "why": "An alpha particle has A = 4 and Z = 2. Subtracting gives A = 222 and Z = 86, which is radon. Radium-222 is tempting, but keeping Z at 88 means the Z totals would not balance, and the element would not have changed.",
      "clue": "Take the alpha particle's A and Z away from both radium numbers."
    }
  },
  "phys-decay-series": {
    "title": "Decay series",
    "card": [
      "Some unstable isotopes do not reach a stable nucleus in one decay. The product may also be unstable, so it decays again.",
      "A decay series is this chain of decays, one step after another. It ends when a stable isotope is formed.",
      "A decay series diagram plots mass number A against atomic number Z. Each isotope is a point, and each decay is an arrow to the next.",
      "An alpha decay lowers A by 4 and Z by 2. A beta-minus decay keeps A the same and raises Z by 1. This shows which decay each arrow stands for."
    ],
    "remember": "A decay series is a chain of decays that stops only at a stable isotope.",
    "a": {
      "q": "What happens at the end of a decay series?",
      "opts": [
        "A stable isotope is formed and decay stops",
        "The nucleus breaks into single protons",
        "All the radiation stops after one decay",
        "The atomic number returns to its first value"
      ],
      "why": "The chain continues while each product is unstable, and stops at a stable isotope. One decay is not always enough, so it is wrong to say the series ends after one step.",
      "clue": "Think about when a nucleus has no reason to decay again."
    },
    "b": {
      "d": 2,
      "q": "On a decay series diagram, an arrow goes from A = 214, Z = 84 to A = 210, Z = 82. Which decay does the arrow show?",
      "opts": ["Alpha decay", "Beta-minus decay", "Beta-plus decay", "Gamma emission"],
      "why": "A falls by 4 and Z falls by 2, which matches an alpha particle. Beta-minus would leave A unchanged and raise Z by 1.",
      "clue": "Compare the change in A and the change in Z with each decay."
    }
  },
  "phys-effects-ionising-radiation": {
    "title": "Effects of ionising radiation",
    "card": [
      "Ionising radiation carries enough energy to knock electrons from atoms. In living tissue it can damage cells, including their DNA.",
      [
        "Absorbed dose",
        "the energy absorbed per kilogram of tissue. It is measured in grays (Gy), where 1 Gy is 1 joule per kilogram."
      ],
      [
        "Equivalent dose",
        "absorbed dose adjusted for the type of radiation, as some types do more harm for the same energy absorbed. It is measured in sieverts (Sv)."
      ],
      [
        "Effective dose",
        "equivalent dose adjusted for the tissue, as some tissues are more sensitive than others. It is also measured in sieverts (Sv)."
      ]
    ],
    "remember": "Grays measure energy absorbed per kilogram. Sieverts allow for radiation type and tissue.",
    "a": {
      "q": "Which dose is measured in grays?",
      "opts": ["Absorbed dose", "Equivalent dose", "Effective dose", "Radiation type"],
      "why": "Absorbed dose is the energy absorbed per kilogram, and its unit is the gray. Equivalent and effective dose are adjusted for harm, so they use sieverts.",
      "clue": "Think of energy per kilogram."
    },
    "b": {
      "d": 3,
      "q": "Two workers each absorb 2 mGy, one from one type of radiation and one from another that does more harm per unit of energy. How do their equivalent doses compare?",
      "opts": [
        "The second worker's is larger",
        "The first worker's is larger",
        "They are the same, as absorbed doses match",
        "They cannot be compared, as sieverts are not used"
      ],
      "why": "Equivalent dose allows for the type of radiation, so the type that does more harm gives a larger value. The matching absorbed doses are tempting, but they ignore the type.",
      "clue": "Which dose allows for the type of radiation?"
    }
  },
  "phys-medical-radioisotopes": {
    "title": "Medical radioisotopes",
    "card": [
      "A radioisotope is an unstable isotope that emits radiation. Doctors use some of them to find cancers and some to treat them.",
      [
        "Finding",
        "a radioisotope is given to the patient, and a detector outside the body picks up the radiation it emits. This can show where a tumour is."
      ],
      [
        "Treating",
        "a radioisotope is placed in or near a tumour, or given so that it gathers there. Its radiation damages the cancer cells."
      ],
      "Radiation also harms healthy tissue. Doctors weigh the damage to diseased cells against the harm to healthy tissue when they choose an isotope and dose."
    ],
    "remember": "Radioisotopes help to find and treat cancers, but healthy tissue can be harmed, so the risk is weighed.",
    "a": {
      "q": "Why do doctors weigh the benefits and risks when using a radioisotope to treat a tumour?",
      "opts": [
        "Its radiation damages healthy tissue as well as cancer cells",
        "Its radiation damages cancer cells but spares healthy tissue",
        "Its radiation is too weak to damage the cancer cells",
        "Its radiation damages healthy tissue but not cancer cells"
      ],
      "why": "Treatment works because the radiation damages cancer cells, but it also harms healthy tissue, so doctors weigh one against the other. The option saying it spares healthy tissue is wrong: if it did, there would be no harm to weigh.",
      "clue": "Radiation does not choose which cells it hits."
    },
    "b": {
      "d": 2,
      "q": "Sam has a radioisotope injected, and a detector outside his body records where it gathers. What is this use of the radioisotope for?",
      "opts": ["Finding a tumour", "Treating a tumour", "Removing healthy tissue", "Making his body stable"],
      "why": "A detector outside the body picks up the emitted radiation, which shows where the isotope has gathered. That is for finding a tumour. Treating relies on radiation damaging the cancer cells, not on recording where it goes.",
      "clue": "A detector records radiation, it does not damage cells."
    }
  },
  "phys-charge-current": {
    "title": "Charge and current",
    "card": [
      "Electric charge is measured in coulombs (C). In a metal wire, the moving charges are electrons.",
      "Current is the rate at which charge flows past a point. I = q/t, where q is charge in coulombs and t is time in seconds.",
      "Current is measured in amperes (A). One ampere is one coulomb passing a point each second.",
      "A larger current means more charge passes each second. The same current for a longer time moves more charge in total."
    ],
    "remember": "Current is charge per second: I = q/t, and 1 A is 1 C each second.",
    "a": {
      "q": "A phone charger cable carries a steady 2 A. How much charge passes a point in the cable each second?",
      "opts": ["2 C", "0.5 C", "2 J", "4 C"],
      "why": "One ampere is one coulomb per second, so 2 A means 2 C passes each second. 0.5 C comes from dividing the wrong way round.",
      "clue": "Think of an ampere as coulombs each second."
    },
    "b": {
      "d": 3,
      "q": "A torch in Bendigo has a steady current of 0.50 A. How much charge passes through the bulb in 2.0 minutes?",
      "opts": ["60 C", "0.25 C", "1.0 C", "240 C"],
      "why": "Time must be in seconds: 2.0 min = 120 s. Then q = It = 0.50 × 120 = 60 C. Using 2.0 for the time gives 1.0 C, which is the tempting mistake.",
      "clue": "Change minutes to seconds first."
    }
  },
  "phys-potential-difference-2": {
    "title": "Potential difference",
    "card": [
      "Potential difference (p.d.), also called voltage, is the energy each coulomb of charge gains or loses between two points in a circuit. It is measured in volts (V).",
      "V = E/q, where E is energy in joules and q is charge in coulombs. So 1 volt means 1 joule of energy for each coulomb.",
      "A battery or power supply gives energy to the charge. A component such as a lamp or resistor changes that energy into other forms, such as heat and light, so the charge loses energy there.",
      "A bigger p.d. means more energy for every coulomb. For a given charge, E = qV."
    ],
    "remember": "Voltage is energy per coulomb: 1 V is 1 J for each 1 C.",
    "a": {
      "q": "A lamp has a potential difference of 6 V across it. What does this tell you about the charge passing through it?",
      "opts": [
        "Each coulomb transfers 6 J of energy in the lamp",
        "Each second, 6 C of charge passes through the lamp",
        "The lamp transfers 6 J of energy every second",
        "The lamp holds 6 C of charge stored inside it"
      ],
      "why": "6 V means 6 joules for each coulomb, so each coulomb loses 6 J as it passes through the lamp. The option about 6 J every second mixes up energy per coulomb with energy per second, which is not what a volt measures.",
      "clue": "A volt is a measure of energy for each coulomb."
    },
    "b": {
      "d": 3,
      "q": "Mia's phone charger supplies charge at 5 V. How much energy is given to 20 C of charge by the charger?",
      "opts": ["100 J", "4 J", "25 J", "0.25 J"],
      "why": "E = qV = 20 C × 5 V = 100 J. The answer 4 J comes from dividing charge by voltage, which turns the relationship upside down.",
      "clue": "Multiply the charge by the energy given to each coulomb."
    }
  },
  "phys-models-meters": {
    "title": "Models and meters",
    "card": [
      "In the water-in-pipes model, wires are pipes, charge is the water and a battery is a pump that pushes it round. Current is like the flow rate, and voltage is like the pressure that drives the flow.",
      "Every model has limits. Charge does not leak out of a wire in a complete circuit the way water can leak from a pipe, and the model does not show why a lamp glows.",
      [
        "Ammeter",
        "measures current. It is placed in series, so the current passes through it. A good ammeter has very low resistance so it barely changes the current."
      ],
      [
        "Voltmeter",
        "measures potential difference. It is placed in parallel across the part being tested, so it compares the two ends. A good voltmeter has very high resistance so it draws almost no current."
      ]
    ],
    "remember": "Ammeter in series to measure current. Voltmeter in parallel to measure voltage.",
    "a": {
      "q": "In the water-in-pipes model of a simple circuit, what does the battery correspond to?",
      "opts": [
        "A pump that pushes the water round",
        "A narrow section that slows the flow",
        "A tap that controls how much flows",
        "A tank that stores water for later use"
      ],
      "why": "The battery gives charge the energy to move round the circuit, as a pump does for water. A tap or narrow pipe would act more like something that restricts flow, not something that drives it.",
      "clue": "Think about where the water gets the energy to keep moving."
    },
    "b": {
      "d": 3,
      "q": "Priya wants to measure the current through a lamp and the voltage across it. How should she connect the meters?",
      "opts": [
        "Ammeter in series, voltmeter across the lamp",
        "Ammeter across the lamp, voltmeter in series",
        "Both meters in series with the lamp",
        "Both meters in parallel across the lamp"
      ],
      "why": "Current must pass through the ammeter, so it goes in series. A voltmeter compares the two ends of the lamp, so it goes in parallel. Putting the ammeter across the lamp is tempting because both meters touch the lamp, but it would not measure the current through the lamp.",
      "clue": "One meter must let the current pass through it. The other compares two points."
    }
  },
  "phys-resistance-ohm-s-law": {
    "title": "Resistance and Ohm's law",
    "card": [
      "Resistance is how much a component opposes current. It is measured in ohms (Ω). A higher resistance means less current for the same voltage.",
      "Ohm's law links the three quantities: V = IR. Voltage V is in volts, current I is in amperes and resistance R is in ohms.",
      [
        "Ohmic",
        "a device whose resistance stays constant as the voltage changes. Its graph of current against voltage is a straight line through the origin."
      ],
      [
        "Non-ohmic",
        "a device whose resistance changes as the voltage changes, such as a diode. Its current against voltage graph is not a straight line."
      ]
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Current against voltage for two ohmic resistors. Both graphs are straight lines through the origin, because each resistance stays constant. The 5 Ω resistor's line is steeper: at 10 V it carries 2.0 A. The 10 Ω resistor carries less current at every voltage, 1.0 A at 10 V.",
        "x": {"min": 0, "max": 15.5, "label": "Voltage (V)", "step": 2},
        "y": {"min": 0, "max": 2.8, "label": "Current (A)", "step": 0.5},
        "items": [
          {
            "type": "fn",
            "id": "a",
            "expr": "\\frac{x}{5}",
            "domain": [0, 11],
            "label": "5 Ω",
            "labelAt": 9,
            "pos": "above-left"
          },
          {
            "type": "fn",
            "id": "b",
            "expr": "\\frac{x}{10}",
            "domain": [0, 11],
            "label": "10 Ω",
            "labelAt": 9,
            "pos": "below-right"
          },
          {"type": "point", "at": [10, 2], "on": ["a"]},
          {"type": "point", "at": [10, 1], "on": ["b"]}
        ]
      }
    },
    "remember": "V = IR. In an ohmic device, R stays constant, so current is proportional to voltage.",
    "a": {
      "q": "A resistor has 12 V across it and a current of 3.0 A through it. What is its resistance?",
      "opts": ["4.0 Ω", "36 Ω", "0.25 Ω", "9.0 Ω"],
      "why": "Rearranging V = IR gives R = V ÷ I = 12 ÷ 3.0 = 4.0 Ω. Multiplying the two numbers to get 36 Ω would find V × I, which is not the resistance.",
      "clue": "Rearrange V = IR to make R the subject."
    },
    "b": {
      "d": 3,
      "q": "A student raises the voltage across a component and finds that the current rises, but the current against voltage graph curves and is not a straight line. What can be concluded?",
      "opts": [
        "Its resistance changes, so it is non-ohmic",
        "Its resistance is constant, so it is ohmic",
        "Its resistance is zero, so it is ohmic",
        "Its current is constant, so it is non-ohmic"
      ],
      "why": "A curved graph means the ratio V ÷ I is not constant, so the resistance changes and the device is non-ohmic. The fact that current rises with voltage does not make it ohmic, because an ohmic device needs a straight line through the origin.",
      "clue": "What shape of graph does a constant resistance give?"
    }
  },
  "phys-series-circuits": {
    "title": "Series circuits",
    "card": [
      "In a series circuit, the components are connected one after another in a single loop. The charge has only one path to follow.",
      [
        "Current",
        "is the same at every point in the loop, because charge is not used up and has nowhere else to go. I is the same through every component."
      ],
      [
        "Voltage",
        "is shared between the components. The voltages across them add up to the supply voltage: V = V1 + V2 + ..."
      ],
      [
        "Resistance",
        "adds up. The total is R = R1 + R2 + ... and it is larger than any single resistor. Current then follows from I = V ÷ R."
      ]
    ],
    "cardFigs": {
      "1": {
        "kind": "diagram",
        "src": "pictures/diagrams/series-circuit.svg",
        "alt": "A series circuit: a cell and two resistors, R1 and R2, joined one after another in a single loop. An arrow labelled I shows the current leaving the cell's positive terminal and flowing round the one path."
      }
    },
    "remember": "In series, current is the same everywhere. Voltages add up to the supply, and resistances add.",
    "a": {
      "q": "Two resistors are connected in series to a 12 V supply. The voltage across one is 5 V. What is the voltage across the other?",
      "opts": ["7 V", "5 V", "12 V", "17 V"],
      "why": "In series the voltages across the components add up to the supply voltage, so the other resistor has 12 - 5 = 7 V. It cannot be 5 V, because 5 + 5 is only 10 V, not the 12 V supply.",
      "clue": "The voltages must add up to the supply."
    },
    "b": {
      "d": 3,
      "q": "A 4 ohm resistor and an 8 ohm resistor are in series with a 6 V supply. What is the current through the 4 ohm resistor?",
      "opts": ["0.5 A", "1.5 A", "0.75 A", "2.25 A"],
      "why": "The total resistance is 4 + 8 = 12 ohms, so I = 6 ÷ 12 = 0.5 A. The same current flows through every component in series. 1.5 A comes from dividing the supply by the 4 ohm resistor alone, which ignores the other resistor.",
      "clue": "Add the resistances first, then use I = V ÷ R."
    }
  },
  "phys-parallel-circuits": {
    "title": "Parallel circuits",
    "card": [
      "In a parallel circuit, the current has more than one path. Each path is called a branch, and every branch connects across the same two points of the supply.",
      ["Voltage", "the potential difference is the same across each branch, and equals the supply voltage."],
      [
        "Current",
        "the current from the supply splits between the branches and joins up again. The branch currents add to give the supply current. A branch with a smaller resistance carries more current."
      ],
      [
        "Resistance",
        "the total resistance is less than the smallest branch resistance, because extra branches give the current more paths. Use 1/R(total) = 1/R1 + 1/R2 + ..."
      ]
    ],
    "remember": "Parallel: same voltage on every branch, branch currents add, and total resistance falls as branches are added.",
    "a": {
      "q": "A 12 V battery is connected across two resistors in parallel, 4 ohms and 12 ohms. What is the voltage across the 12 ohm resistor?",
      "opts": ["12 V", "9 V", "3 V", "4 V"],
      "why": "Each branch connects directly across the battery, so each has the full 12 V. The voltage would only be shared out if the resistors were in series, which is not the case here.",
      "clue": "Each branch connects straight across the supply."
    },
    "b": {
      "d": 3,
      "q": "A 6 V supply is connected across a 6 ohm resistor and a 3 ohm resistor in parallel. What is the current drawn from the supply?",
      "opts": ["3 A", "1 A", "2 A", "0.67 A"],
      "why": "Each branch has 6 V. The 6 ohm branch carries 6 ÷ 6 = 1 A and the 3 ohm branch carries 6 ÷ 3 = 2 A. The branch currents add to 3 A. Adding the resistances to get 9 ohms would give 0.67 A, but that is the series method.",
      "clue": "Find the current in each branch using V = IR, then combine them."
    }
  },
  "phys-voltage-dividers": {
    "title": "Voltage dividers",
    "card": [
      "A voltage divider is two resistors in series across a supply. The supply voltage is shared between them.",
      "The same current flows through both resistors. A larger resistance has a larger share of the voltage, since V = IR.",
      "The voltages split in the same ratio as the resistances. If R2 is twice R1, then R2 has twice the voltage of R1. The two voltages add up to the supply.",
      "A sensor such as a thermistor or light-dependent resistor can be one of the two resistors. If its resistance rises, its share of the total resistance grows, so its share of the voltage grows too."
    ],
    "remember": "Each resistor's share of the supply voltage matches its share of the total resistance.",
    "a": {
      "q": "A 12 V supply is connected across a 1 kΩ resistor and a 3 kΩ resistor in series. What is the voltage across the 3 kΩ resistor?",
      "opts": ["9 V", "4 V", "6 V", "3 V"],
      "why": "The resistances are in the ratio 1 to 3, so the 3 kΩ resistor gets 3 parts out of 4, which is 9 V. 3 V is the share of the 1 kΩ resistor, and 4 V comes from wrongly dividing 12 V by 3.",
      "clue": "Split the supply in the same ratio as the resistances."
    },
    "b": {
      "d": 3,
      "q": "Priya's garden light circuit has a 6 V supply, a fixed resistor and a light-dependent resistor (LDR) in series. At dusk the LDR's resistance rises. What happens to the voltage across the LDR?",
      "opts": [
        "It rises, as the LDR takes a larger share",
        "It falls, as less current flows through the LDR",
        "It stays at 6 V, as the supply is fixed",
        "It stays the same, as the current is the same"
      ],
      "why": "The LDR's share of the total resistance grows, so its share of the 6 V grows too, whichever resistor is larger. The current does fall, but the voltages still split in the ratio of the resistances. The fixed resistor's voltage falls as the LDR's rises.",
      "clue": "How does the LDR's share of the total resistance change?"
    }
  },
  "phys-forces-two-dimensions": {
    "title": "Forces in two dimensions",
    "card": [
      "Force is a vector, so it has size and direction. Newton's second law, net force = mass × acceleration, applies to the net force, which is the vector sum of all forces on the object.",
      "To add forces at angles, split each force into components along two perpendicular axes, such as horizontal and vertical. For a force F at angle θ above the horizontal, the horizontal part is F cos θ and the vertical part is F sin θ.",
      "Add the components along each axis separately. Then apply the second law to each axis on its own. If the object is not accelerating along an axis, the components along it add to zero.",
      "For a box pulled along level ground by a rope at an angle above the horizontal, only the horizontal component of the pull drives the box forward. The vertical component lifts partly against the weight, so the normal force is smaller than the weight."
    ],
    "remember": "Split forces into perpendicular components, add each direction separately, then apply F = ma to each.",
    "a": {
      "q": "A 100 N force acts at 30° above the horizontal on a crate. Which expression gives the horizontal component of the force?",
      "opts": ["100 × cos 30°", "100 × sin 30°", "100 ÷ cos 30°", "100 + 30"],
      "why": "The horizontal part of a force at angle θ above the horizontal is F cos θ, so it is 100 × cos 30°. Sin 30° gives the vertical part, which is the most tempting mistake.",
      "clue": "The angle is measured from the horizontal."
    },
    "b": {
      "d": 3,
      "q": "Priya pulls a sled at constant velocity along level snow in Falls Creek. The rope is angled upwards. The sled has weight W and she pulls with force F at angle θ above the horizontal. Which statement about the vertical forces is correct?",
      "opts": [
        "The normal force plus F sin θ equals W",
        "The normal force equals W",
        "The normal force plus F cos θ equals W",
        "The normal force equals W plus F sin θ"
      ],
      "why": "The sled has no vertical acceleration, so upward forces equal downward force. The upward forces are the normal force and F sin θ, and they balance W. The normal force does not equal W, because the rope lifts part of the load.",
      "clue": "Which forces act upwards, and which component of the pull is vertical?"
    }
  },
  "phys-projectile-motion-physics": {
    "title": "Projectile motion in physics",
    "card": [
      "A projectile is an object launched through the air. In the simple model only gravity acts on it, so its horizontal and vertical motions are independent and we treat them separately.",
      [
        "Horizontal",
        "No horizontal force acts, so the horizontal velocity stays steady. The object covers equal horizontal distances in equal times."
      ],
      [
        "Vertical",
        "Gravity gives a constant downward acceleration of about 9.8 m/s², so the vertical velocity changes by the same amount each second. Ignoring air resistance, the time in the air depends only on the vertical motion."
      ],
      "Air resistance is a force that opposes the motion. It slows the object, so the real path is shorter than the path with no air resistance."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "Two paths of the same launch. With no air resistance the path is a parabola, the same shape going up and coming down. With air resistance the path is lower, falls more steeply at the end, and lands much shorter.",
        "x": {"min": 0, "max": 42, "label": "Horizontal distance"},
        "y": {"min": 0, "max": 13.5, "label": "Height"},
        "items": [
          {
            "type": "fn",
            "id": "n",
            "expr": "x - \\frac{x^{2}}{40}",
            "domain": [0, 40],
            "label": "no air resistance",
            "labelAt": 20,
            "pos": "above"
          },
          {
            "type": "curve",
            "id": "a",
            "points": [[0, 0], [6, 4.6], [12, 7.0], [17, 7.6], [21, 6.6], [25, 3.6], [27.5, 0]],
            "smooth": true,
            "label": "with air resistance",
            "labelAt": 26.125,
            "pos": "left"
          }
        ]
      }
    },
    "remember": "With no air resistance, horizontal velocity stays steady, vertical velocity changes steadily, and the two share only the time.",
    "a": {
      "q": "A ball is kicked off a cliff in a horizontal direction. Ignoring air resistance, what is true of its horizontal velocity as it falls?",
      "opts": [
        "It stays the same, as no horizontal force acts on it",
        "It increases, because the ball is falling faster",
        "It decreases, because gravity pulls the ball down",
        "It increases, because the ball keeps being pushed forward"
      ],
      "why": "With no air resistance, no horizontal force acts, so the horizontal velocity stays steady. Gravity acts only downwards, so it changes the vertical velocity, not the horizontal one.",
      "clue": "Which direction does gravity act, and is there any force sideways?"
    },
    "b": {
      "d": 3,
      "q": "Mia drops a stone from a bridge. At the same instant, Tom throws an identical stone horizontally from the same height. Ignoring air resistance, which stone lands first?",
      "opts": [
        "They land at the same time",
        "Mia's stone lands first",
        "Tom's stone lands first",
        "It depends on how fast Tom throws his"
      ],
      "why": "Both stones start with zero vertical velocity and fall with the same downward acceleration from the same height, so they take the same time. Tom's stone has extra horizontal velocity, but however fast he throws it, that does not change its vertical motion.",
      "clue": "Compare how each stone starts moving up or down."
    }
  },
  "phys-banked-tracks": {
    "title": "Banked curves",
    "card": [
      "On a flat road, friction between the tyres and the road supplies the force that turns a car. If the road is wet or icy, this friction can be too small.",
      "On a banked curve, the road is tilted towards the centre of the curve. The normal force is at right angles to the road, so it tilts towards the centre too.",
      "The horizontal part of the normal force points to the centre of the circle. It supplies the centripetal force. The vertical part balances the car's weight.",
      "For a given radius and bank angle, there is one design speed where the normal force alone supplies the centripetal force. At that speed the car does not rely on friction to take the curve."
    ],
    "remember": "A banked road turns part of the normal force towards the centre, so the car can corner without relying on friction.",
    "a": {
      "q": "A car takes a banked curve at its design speed. Which force supplies the centripetal force?",
      "opts": [
        "The horizontal part of the normal force",
        "The car's weight acting down the slope",
        "The friction between the tyres and the road",
        "The engine force pushing the car forward"
      ],
      "why": "The normal force is at right angles to the tilted road, so part of it points towards the centre of the curve. At the design speed this part alone supplies the centripetal force. Friction is the tempting answer, but a banked curve is designed so that the car does not rely on it.",
      "clue": "The road is tilted, so which force tilts with it?"
    },
    "b": {
      "d": 3,
      "q": "A banked curve on a road near Mount Buller in Victoria is designed for 80 km/h. A car takes it at exactly 80 km/h on an icy road. What happens?",
      "opts": [
        "The car can still turn, as the normal force is enough",
        "The car slides outwards, as friction is needed at any speed",
        "The car slides inwards, as the normal force is too large",
        "The car cannot turn, as the vertical force is too small"
      ],
      "why": "At the design speed the horizontal part of the normal force alone gives the required centripetal force, so the car does not need friction. Ice removes friction, but it is not needed here. The tempting answer is that friction is always needed, which is true on a flat road but not at the design speed of a banked curve.",
      "clue": "At the design speed, is friction part of the force that turns the car?"
    }
  },
  "phys-vertical-circular-motion": {
    "title": "Vertical circular motion",
    "card": [
      "An object moving in a vertical circle needs a net force towards the centre at every point. This net force is the centripetal force, and it equals mv² ÷ r.",
      [
        "Bottom",
        "the centre is above the object. The normal force points up and weight points down, so the net force towards the centre is N - mg = mv² ÷ r."
      ],
      [
        "Top",
        "for an object on the inside of the loop, the centre is below it. The track or seat pushes down, and weight points down too, so N + mg = mv² ÷ r."
      ],
      "The normal force is a real force from a surface or seat. Centripetal force is just the name for the net force towards the centre, not an extra force. At the bottom N is larger than mg, so a rider feels heavier."
    ],
    "remember": "Take the centre as positive: the net force towards it equals mv² ÷ r, and the forces differ at the top and bottom.",
    "a": {
      "q": "A cart moves at steady speed through the bottom of a vertical loop, on the inside of the track. How does the normal force on the cart compare with its weight?",
      "opts": [
        "The normal force is greater than the weight",
        "The normal force is equal to the weight",
        "The normal force is less than the weight",
        "The normal force is zero"
      ],
      "why": "At the bottom the centre is above the cart, so the net force must point up. This needs the normal force to be greater than the weight. Equal forces would give no net force, so the cart could not turn.",
      "clue": "Which way must the net force point at the bottom?"
    },
    "b": {
      "d": 3,
      "q": "A 50 kg rider in Geelong passes through the top of a vertical loop, inside the loop, at 14 m/s. The radius is 10 m. Which equation gives the normal force N from the seat? Take g as 10 m/s².",
      "opts": ["N + 500 = 50 × 14² ÷ 10", "N - 500 = 50 × 14² ÷ 10", "N = 500 + 50 × 14", "N + 500 = 50 × 14 ÷ 10"],
      "why": "Inside the loop at the top, the seat pushes down and weight points down, both towards the centre. So N + mg = mv² ÷ r, which is N + 500 = 50 × 14² ÷ 10. Subtracting 500 would be right for the bottom of the loop, where the normal force points up.",
      "clue": "At the top, inside the loop, where is the centre?"
    }
  },
  "phys-work-done-by-force": {
    "title": "Work done by a force",
    "card": [
      "Work is the energy transferred when a force moves an object. For a force along the direction of motion, W = Fs, where F is the force in newtons and s is the displacement in metres. Work is measured in joules.",
      "If the force is at an angle to the motion, only the part of the force along the displacement does work. That part is F cos θ, so W = Fs cos θ.",
      "On a force-distance graph, the work done is the area under the line. This works even when the force changes.",
      "A force at right angles to the motion does no work. Work is positive if the force acts along the motion and negative if it acts against it."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Force against distance for a force that changes: it stays at 20 N for the first 4 m, then falls steadily to zero at 8 m. The shaded area under the line is the work done, even though the force changes.",
        "x": {"min": 0, "max": 12.5, "label": "Distance (m)", "step": 2},
        "y": {"min": 0, "max": 26, "label": "Force (N)", "step": 5},
        "items": [
          {"type": "shade", "poly": [[0, 0], [0, 20], [4, 20], [8, 0]], "label": "area = work done", "at": [3, 8]},
          {"type": "curve", "id": "f", "points": [[0, 20], [4, 20], [8, 0]]}
        ]
      }
    },
    "remember": "Work is the force along the motion times the distance moved, or the area under a force-distance graph.",
    "a": {
      "q": "Which force does no work on the object?",
      "opts": [
        "A satellite's weight while it moves in a circular orbit",
        "A person's push on a trolley moving away from them",
        "A rope pulling a sled forwards along flat snow",
        "A brake pad's friction on a spinning wheel"
      ],
      "why": "In a circular orbit the weight acts towards the centre, at right angles to the motion, so it does no work. The other forces act along or against the motion, so they do work.",
      "clue": "Look for the force at right angles to the motion."
    },
    "b": {
      "d": 3,
      "q": "Priya pulls a suitcase 20 m along a flat floor. She pulls with a force of 50 N on a handle at 60° above the horizontal. How much work does she do on the suitcase?",
      "opts": ["500 J", "1000 J", "866 J", "25 J"],
      "why": "Only the part of the force along the floor does work: W = 50 × 20 × cos 60° = 500 J. Using the full 50 N gives 1000 J, which wrongly counts the upward part of the pull.",
      "clue": "Find the part of the force that points along the motion."
    }
  },
  "phys-elastic-inelastic-collisions-2": {
    "title": "Elastic and inelastic collisions",
    "card": [
      "In every collision in an isolated system, total momentum is conserved. This is true whether or not kinetic energy is kept.",
      [
        "Elastic",
        "total kinetic energy is the same before and after the collision. The objects bounce apart with no energy turned into other forms."
      ],
      [
        "Inelastic",
        "some kinetic energy is lost from the motion. It becomes other forms, such as heat, sound or the energy of deforming the objects."
      ],
      "To classify a collision, compare total kinetic energy (½mv² for each object, added up) before and after. Equal means elastic. Less after means inelastic."
    ],
    "remember": "Momentum is conserved in both types. Only an elastic collision keeps all the kinetic energy.",
    "a": {
      "q": "Two trolleys collide and stick together. Total momentum is the same before and after, but kinetic energy falls. What kind of collision is this?",
      "opts": [
        "Inelastic, because kinetic energy was lost",
        "Elastic, because momentum was conserved",
        "Elastic, because the trolleys moved together",
        "Inelastic, because momentum was not conserved"
      ],
      "why": "Kinetic energy fell, so the collision is inelastic. Momentum is conserved in both types, so conserved momentum cannot show that a collision is elastic.",
      "clue": "Which quantity tells the two types apart?"
    },
    "b": {
      "d": 3,
      "q": "A 2.0 kg trolley moving at 3.0 m/s hits a stationary 1.0 kg trolley. Afterwards they move apart at 1.0 m/s and 4.0 m/s respectively. What type of collision is this?",
      "opts": [
        "Elastic, as kinetic energy stays at 9.0 J",
        "Inelastic, as kinetic energy falls from 9.0 J",
        "Inelastic, as momentum falls from 6.0 kg m/s",
        "Elastic, as the trolleys move apart afterwards"
      ],
      "why": "Before: ½ × 2.0 × 3.0² = 9.0 J. After: ½ × 2.0 × 1.0² + ½ × 1.0 × 4.0² = 1.0 + 8.0 = 9.0 J. Kinetic energy is kept, so it is elastic. Momentum is 6.0 kg m/s before and after (2.0 + 4.0), so it is conserved.",
      "clue": "Add up the kinetic energy of both trolleys before and after."
    }
  },
  "phys-springs-energy": {
    "title": "Springs and energy",
    "card": [
      "A spring that obeys Hooke's law has force F = kx, where k is the spring constant and x is the extension or compression from its natural length.",
      "The energy stored in a stretched or compressed spring is elastic potential energy. It equals the area under the force-extension graph: E = ½kx².",
      "Near Earth's surface, gravitational potential energy changes by mgΔh when an object's height changes by Δh.",
      "If no energy is lost, the total of kinetic, elastic and gravitational energy stays the same. Energy moves between these forms, so a released spring can give an object kinetic energy or lift it."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "Force against extension for a spring that obeys Hooke's law, with k = 100 N/m: a straight line through the origin, F = kx. At an extension of 0.20 m the force is 20 N. The shaded triangle under the line is the stored elastic potential energy, one half of 0.20 m times 20 N, which is 2.0 J.",
        "x": {"min": 0, "max": 0.35, "label": "Extension (m)", "step": 0.1},
        "y": {"min": 0, "max": 25, "label": "Force (N)", "step": 5},
        "items": [
          {"type": "shade", "under": "f", "span": [0, 0.2], "label": "\\(E = \\frac{1}{2}kx^{2}\\)", "at": [0.135, 5]},
          {
            "type": "fn",
            "id": "f",
            "expr": "100x",
            "domain": [0, 0.27],
            "label": "\\(F = kx\\)",
            "labelAt": 0.15,
            "pos": "above-left"
          },
          {"type": "guide", "at": [0.2, 20], "xLabel": "", "yLabel": ""}
        ]
      }
    },
    "remember": "Spring energy is ½kx², the area under the force-extension graph, and it can change into kinetic or gravitational energy.",
    "a": {
      "q": "A spring has a spring constant of 200 N/m. How much energy is stored when it is stretched by 0.10 m?",
      "opts": ["1.0 J", "20 J", "2.0 J", "0.10 J"],
      "why": "E = ½kx² = ½ × 200 × 0.10² = 1.0 J. Using kx² gives 2.0 J, which forgets the half. Using F × x with F = kx has the same mistake.",
      "clue": "Use the area under the force-extension graph, which is a triangle."
    },
    "b": {
      "d": 3,
      "q": "A spring with k = 400 N/m is compressed 0.20 m and launches a 0.10 kg ball straight up. Ignoring energy losses, how high does the ball rise above its starting, compressed position? Use g = 10 m/s².",
      "opts": ["8.0 m", "16 m", "40 m", "0.80 m"],
      "why": "Stored energy is ½ × 400 × 0.20² = 8.0 J. All of it becomes gravitational potential energy: mgh = 0.10 × 10 × h = 8.0, so h = 8.0 m. Leaving out the half gives 16 J and 16 m, and leaving out the square gives 40 J and 40 m.",
      "clue": "Find the spring energy first, then set it equal to mgh."
    }
  },
  "phys-fields-field-lines": {
    "title": "Fields and field lines",
    "card": [
      "A field is a region of space where an object feels a force without touching anything. Gravity, electric charge and magnets each have a field.",
      "An arrow on a field line shows the direction of the force on a test object at that point: a small test mass for gravity, a positive test charge for electric fields and a north pole for magnetic fields.",
      "Where field lines are closer together, the field is stronger. Where they are further apart, the field is weaker.",
      "Field lines never cross. If two lines crossed, the field would point in two directions at one point, which is not possible."
    ],
    "remember": "Line arrows give the direction of the force. Line spacing gives the strength.",
    "a": {
      "q": "What does it tell you if field lines are drawn closer together in one region than in another?",
      "opts": [
        "The field is stronger in the closer region",
        "The field is weaker in the closer region",
        "The force points toward the closer region",
        "The field in the closer region is uniform"
      ],
      "why": "Closer lines mean a stronger field, so a test object placed there would feel a larger force. The spacing does not show direction, which is given by the arrows on the lines.",
      "clue": "Think of spacing as a measure of strength, not direction."
    },
    "b": {
      "d": 2,
      "q": "Field lines around a planet are drawn twice as close together at point P as at point Q. What can be said about P and Q?",
      "opts": [
        "The field is stronger at P than at Q",
        "The field is stronger at Q than at P",
        "The force at P points toward Q",
        "The field has the same strength at P and Q"
      ],
      "why": "Lines that are closer together show a stronger field, so a test mass at P would feel a larger force than at Q. The same strength would need the same spacing, and the spacing does not show which way the force points.",
      "clue": "Compare how tightly the lines are packed at each point."
    }
  },
  "phys-electric-fields-2": {
    "title": "Electric fields",
    "card": [
      "A charge creates an electric field around it. The field strength E is the force per unit of positive charge, so F = qE. The force on a positive charge is along the field, and on a negative charge it is opposite.",
      [
        "Point charge",
        "The field of a point charge Q is E = kQ/r². It weakens with the inverse square of distance, so doubling the distance cuts E to a quarter. Field lines point away from a positive charge and towards a negative one."
      ],
      [
        "Uniform field",
        "Two parallel plates with a potential difference V and separation d make a uniform field between them, E = V/d. It points from the positive plate to the negative plate. A charge between the plates feels a constant force, so it accelerates steadily."
      ],
      "Moving a charge q through a potential difference V changes its energy by W = qV. If only the field acts, a charge moving with the force gains this as kinetic energy, and one moving against it loses kinetic energy."
    ],
    "remember": "Force on a charge is F = qE. A point charge's field follows 1/r², and crossing a potential difference V changes a charge's energy by qV.",
    "a": {
      "q": "The distance from a point charge is tripled. What happens to the strength of its electric field?",
      "opts": ["It falls to one ninth", "It falls to one third", "It falls to one sixth", "It rises to nine times"],
      "why": "E = kQ/r², so tripling r divides E by 3², which is 9. One third is the tempting answer, but it treats the field as falling in direct proportion to distance, and the card says it follows the inverse square.",
      "clue": "Field strength depends on r squared."
    },
    "b": {
      "d": 3,
      "q": "An electron (charge 1.6 × 10⁻¹⁹ C) starts at rest at the negative plate and crosses to the positive plate. The potential difference is 500 V. What happens to its kinetic energy and speed?",
      "opts": [
        "It gains 8.0 × 10⁻¹⁷ J, and its speed increases steadily",
        "It gains 8.0 × 10⁻¹⁷ J, and its speed stays constant",
        "It loses 8.0 × 10⁻¹⁷ J, and its speed decreases",
        "It gains 3.2 × 10⁻²² J, and its speed increases steadily"
      ],
      "why": "The force on the electron points opposite the field, towards the positive plate, so it moves with the force and gains W = qV = 1.6 × 10⁻¹⁹ × 500 = 8.0 × 10⁻¹⁷ J of kinetic energy. The tempting constant speed option confuses a constant force with a constant speed: in a uniform field the constant force gives a steady acceleration. Dividing q by V gives 3.2 × 10⁻²² J, which is the wrong operation.",
      "clue": "Which way does the force on a negative charge point?"
    }
  },
  "phys-magnetic-fields": {
    "title": "Magnetic fields",
    "card": [
      "A magnetic field is a region where a magnetic force acts on magnets, moving charges and current-carrying wires. It is created by magnets and by electric currents.",
      "Outside a magnet, field lines curve from the north pole round to the south pole. Inside the magnet they run from south to north, so each line is a closed loop.",
      "A compass needle lines up with the field, and its north end points in the field direction.",
      "A current in a straight wire makes circular field lines around the wire. Use the right-hand grip rule: thumb along the current, and the curled fingers show the field direction."
    ],
    "remember": "Magnets and currents make magnetic fields, and outside a magnet the lines run north to south.",
    "a": {
      "q": "A compass sits beside the middle of a bar magnet, level with its centre. Which way does the compass's north end point?",
      "opts": [
        "Parallel to the magnet, towards its south pole",
        "Parallel to the magnet, towards its north pole",
        "At right angles to the magnet, away from it",
        "At right angles to the magnet, towards it"
      ],
      "why": "Outside the magnet, field lines curve from north round to south, so beside the middle they run parallel to the magnet towards the south pole. The north end of the needle points in the field direction. Pointing towards the north pole reverses the direction of the lines.",
      "clue": "Which way do field lines run outside a magnet?"
    },
    "b": {
      "d": 3,
      "q": "Dani holds a straight wire carrying a current upwards. Looking down from above, which describes the magnetic field around the wire?",
      "opts": [
        "Circular lines around the wire, anticlockwise from above",
        "Circular lines around the wire, clockwise from above",
        "Straight lines pointing away from the wire",
        "Straight lines running parallel to the current"
      ],
      "why": "Thumb up along the current, and the fingers curl anticlockwise when viewed from above. A current makes circular field lines around the wire, not straight lines. Clockwise is tempting but reverses the direction given by the grip rule.",
      "clue": "Point your right thumb up and see which way your fingers curl."
    }
  },
  "phys-comparing-fields": {
    "title": "Comparing fields",
    "card": [
      "Gravity, electric and magnetic fields each exert a force on a suitable object placed in them. Gravity acts on mass, electric fields act on charge, and magnetic fields act on moving charges and on magnets.",
      [
        "Attract or repel",
        "Gravity only attracts, as there is no negative mass. Electric forces can attract or repel, depending on the signs of the charges. Magnetic forces can also attract or repel, such as between like and unlike poles."
      ],
      [
        "Static or changing",
        "A static field does not change with time, such as the field around a fixed mass. A changing field varies with time, such as the field near a moving magnet or a changing current."
      ],
      [
        "Uniform or not",
        "In a uniform field the strength and direction are the same at every point, so field lines are parallel and evenly spaced. In a non-uniform field they vary, so the lines bend or change spacing."
      ]
    ],
    "remember": "Gravity only attracts. Electric and magnetic forces can attract or repel. Any field can be static or changing, uniform or not.",
    "a": {
      "q": "Which statement correctly compares gravitational and electric forces?",
      "opts": [
        "Electric forces can repel, but gravity only attracts",
        "Gravity can repel, but electric forces only attract",
        "Both only attract, but they act on different things",
        "Both can attract or repel, depending on the objects"
      ],
      "why": "Electric forces repel when charges have the same sign. Gravity acts on mass, and there is no negative mass, so it only attracts. The option saying both only attract is tempting, but it ignores like charges repelling.",
      "clue": "Think about two charges with the same sign."
    },
    "b": {
      "d": 3,
      "q": "Two students compare fields. Which statement about field lines is correct?",
      "opts": [
        "Parallel, evenly spaced lines show a uniform field",
        "Parallel lines show a field that is changing with time",
        "Lines that bend apart show a field that is uniform",
        "Evenly spaced lines show a field that only attracts"
      ],
      "why": "In a uniform field, strength and direction are the same everywhere, so lines are parallel and evenly spaced. Whether a field changes with time is a different question from whether it is uniform, so parallel lines do not show a changing field.",
      "clue": "Uniform describes position, not time or attraction."
    }
  },
  "phys-satellites-orbits": {
    "title": "Satellites and orbits",
    "card": [
      "A satellite in a circular orbit is pulled towards the centre of the planet by gravity. This gravitational force is the centripetal force that keeps it moving in a circle.",
      "Set the two forces equal: GMm/r² = mv²/r. The satellite's mass m cancels, so the orbital speed is v = √(GM/r). M is the mass of the planet and r is the distance from the planet's centre.",
      "A larger orbit radius means a smaller speed. The period is T = 2πr/v, so a larger radius also means a longer period.",
      "Speed and period depend on the orbit radius and the planet's mass, not on the satellite's mass. A heavy satellite and a light one at the same radius move the same way."
    ],
    "remember": "Gravity is the centripetal force, so each radius has one speed and one period.",
    "a": {
      "q": "A 500 kg communications satellite and a 1000 kg one are placed in the same circular orbit around Earth. What can be said about their orbital periods?",
      "opts": [
        "They are equal",
        "The 1000 kg one is longer",
        "The 1000 kg one is shorter",
        "The 1000 kg one is twice as long"
      ],
      "why": "The satellite's mass cancels when gravity is set equal to the centripetal force, so speed depends only on Earth's mass and the radius. The same speed over the same path gives the same period. The heavier satellite feels a bigger pull, but it also needs a bigger force to curve.",
      "clue": "Does the satellite's mass survive when you equate the two forces?"
    },
    "b": {
      "d": 3,
      "q": "A weather satellite orbits a planet at radius r. A second satellite of the same planet orbits at a larger radius. Which statement is correct?",
      "opts": [
        "The second has a lower speed and a longer period",
        "The second has a lower speed and a shorter period",
        "The second has a higher speed and a longer period",
        "The second has a higher speed and a shorter period"
      ],
      "why": "Since v = √(GM/r), a larger radius gives a lower speed. The satellite also has a longer path and moves slower along it, so its period is longer. A higher speed at a larger radius is a tempting error, but gravity is weaker there.",
      "clue": "Gravity gets weaker with distance, so think about the speed first."
    }
  },
  "phys-synchrotrons-light": {
    "title": "Particle accelerators",
    "card": [
      "A charged particle gains speed when it moves through an electric field. The field does work on it, so its kinetic energy rises by qΔV for a potential difference ΔV.",
      "The magnetic fields in an accelerator do not add energy to the particles. Their job is to steer them, bending their path into a curve.",
      "A synchrotron uses both. Electric fields at points around a ring give the particles energy, and magnets bend them round so they pass through those electric fields again and again.",
      "A faster particle is harder to bend, so in the same field it would swing out to a wider path. To keep the ring's radius fixed, the magnetic field is made stronger as the particles gain speed."
    ],
    "remember": "Electric fields speed charges up. Magnetic fields steer them round the ring.",
    "a": {
      "q": "In a synchrotron, which part of the machine increases the speed of the particles?",
      "opts": ["The electric fields", "The magnetic fields", "Both fields equally", "The circular path itself"],
      "why": "The electric fields do work on the charges and add kinetic energy, so they raise the speed. The magnetic fields steer the particles round the ring but add no energy, so they cannot speed them up. The circular path is only the result of that steering.",
      "clue": "Steering a particle is not the same as speeding it up."
    },
    "b": {
      "d": 3,
      "q": "Protons in a synchrotron ring keep gaining speed on a path of fixed radius. What happens to the magnetic field strength?",
      "opts": ["It is increased", "It is decreased", "It stays constant", "It is switched off"],
      "why": "A faster proton is harder to bend, so the same field would let it swing out to a wider path. To hold the radius fixed, the field is made stronger as the protons' speed, or more exactly their momentum, rises. Keeping the field constant is the tempting error, but then the protons would drift outwards.",
      "clue": "Is a faster particle easier or harder to bend?"
    }
  },
  "phys-dc-motors-2": {
    "title": "DC motors",
    "card": [
      "A coil of wire sits between the poles of a magnet and carries a current. The two sides of the coil carry current in opposite directions, so the forces on them are opposite. This turns the coil.",
      "A split ring commutator is a ring cut into two halves, joined to the ends of the coil. Each half touches a fixed brush. Every half turn it swaps which end of the coil connects to which brush, so the current in the coil reverses.",
      "Without the commutator, the coil would swing to the vertical position, where the forces no longer turn it, and stop. With it, the forces keep turning the coil in the same direction.",
      "The torque (turning effect) on the coil rises with more current, a stronger magnetic field or more loops of wire in the coil."
    ],
    "remember": "The commutator reverses the current each half turn so the coil keeps turning. Torque rises with current, field and loops.",
    "a": {
      "q": "What does the split ring commutator do in a DC motor?",
      "opts": [
        "Reverses the coil's current every half turn",
        "Changes the supply from DC to AC",
        "Makes the magnetic field reverse each half turn",
        "Stops the coil from moving past the vertical"
      ],
      "why": "Reversing the current every half turn keeps the forces on each side of the coil turning it the same way. The commutator does not change the magnet. Without the reversal, the coil would stop at the vertical position, not turn past it.",
      "clue": "Think about what must swap each half turn to keep the forces pushing the same way."
    },
    "b": {
      "d": 3,
      "q": "Ravi builds a simple DC motor in his school workshop. He wants the coil to turn with more torque, and he changes only one thing. Which change does this?",
      "opts": [
        "Winding more loops of wire into the coil",
        "Fitting a commutator with more brushes",
        "Turning the magnets so the poles are swapped",
        "Making the coil spin faster by hand at the start"
      ],
      "why": "More loops means the force acts on more lengths of wire, so torque rises. Swapping the poles only reverses the direction of turning. It does not change the size of the torque.",
      "clue": "Torque depends on current, field strength and number of loops."
    }
  },
  "phys-magnetic-flux-2": {
    "title": "Magnetic flux",
    "card": [
      "Magnetic flux measures how much magnetic field passes through a surface. For a field at right angles to the surface, Φ = BA.",
      "B is the magnetic field strength in tesla (T) and A is the area in square metres (m²). Flux is measured in weber (Wb), where 1 Wb = 1 T m².",
      "Only the part of the field at right angles to the surface counts. If the field runs along the surface, no field lines pass through it and the flux is zero.",
      "Flux rises if the field gets stronger or the area gets larger. Tilting a coil changes how much field passes through it, so the flux changes too."
    ],
    "remember": "Flux is field times area, counted at right angles to the surface.",
    "a": {
      "q": "A square coil of area 0.020 m² sits at right angles to a uniform field of 0.50 T. What is the magnetic flux through it?",
      "opts": ["0.010 Wb", "0.040 Wb", "25 Wb", "0.52 Wb"],
      "why": "Φ = BA = 0.50 × 0.020 = 0.010 Wb. Dividing B by A gives 25, which is the wrong operation, because flux is the product of the two.",
      "clue": "Multiply field strength by area."
    },
    "b": {
      "d": 3,
      "q": "Priya holds a flat loop in a steady magnetic field so that the field lines pass straight through it. She then turns the loop until its flat face is parallel to the field lines. What happens to the flux through the loop?",
      "opts": ["It falls to zero", "It stays the same", "It doubles", "It becomes negative and large"],
      "why": "Only the part of the field at right angles to the surface counts. When the face is parallel to the field, no field lines pass through it, so the flux is zero. The field and the area have not changed, but that does not keep the flux the same.",
      "clue": "Do any field lines pass through the loop once it lies along them?"
    }
  },
  "phys-solar-cells-inverters": {
    "title": "Solar cells and inverters",
    "card": [
      "A photovoltaic (solar) cell uses light to push electrons through a circuit. The current always flows in one direction, so a solar cell produces DC.",
      "Many cells are joined in a solar panel. Panels in series add their voltages, so the DC output is larger.",
      "Mains electricity in an Australian home is AC, which reverses direction many times each second. Most home appliances and the grid are built for AC.",
      "An inverter is a device that changes DC into AC. A rooftop solar system needs one so its electricity can be used in the home or sent to the grid."
    ],
    "remember": "Solar cells give DC. An inverter turns it into AC for the home.",
    "a": {
      "q": "Mia installs solar panels on her house in Bendigo. What does the inverter do in her system?",
      "opts": [
        "Changes the DC from the panels into AC",
        "Changes the AC from the panels into DC",
        "Makes the panels produce more voltage from light",
        "Stores the panels' electricity for use at night"
      ],
      "why": "The panels give DC, but the home runs on AC, so the inverter changes DC into AC. It changes the type of current. It does not make the cells produce more voltage or store energy.",
      "clue": "Think about which type of current the panels make and which the home uses."
    },
    "b": {
      "d": 2,
      "q": "A farm in Mildura wants its solar panels to run a pump designed to run only on AC. What must be added between them?",
      "opts": [
        "An inverter, to change the panels' DC into AC",
        "An inverter, to change the panels' AC into DC",
        "More panels in series, to raise the DC voltage",
        "A battery, to store the panels' DC output"
      ],
      "why": "Solar panels produce DC, and the pump runs only on AC, so an inverter is needed to change DC into AC. Adding panels in series gives a larger voltage, but the output is still DC.",
      "clue": "Compare the type of current the panels make with the type the pump needs."
    }
  },
  "phys-peak-rms-values": {
    "title": "Peak and RMS values",
    "card": [
      "An AC voltage swings between a positive and a negative peak. The peak voltage, Vpeak, is the largest value it reaches.",
      "The RMS voltage is the DC voltage that would give the same power in a resistor. For a sinusoidal supply, Vrms = Vpeak ÷ √2, which is about 0.71 × Vpeak.",
      "The RMS value is smaller than the peak, because the AC voltage is at its peak only for an instant in each cycle.",
      "The same rule works for current: Irms = Ipeak ÷ √2. Mains voltage is quoted as an RMS value."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "An AC voltage against time: a sine wave swinging between plus 10 V and minus 10 V. The peak voltage, Vpeak, is 10 V. A horizontal line marks the RMS voltage, Vrms, about 7.1 V, which is 10 divided by root 2. The voltage is above Vrms only for part of each cycle.",
        "x": {"min": 0, "max": 14.5, "label": "Time"},
        "y": {"min": -12, "max": 14, "label": "Voltage (V)", "step": 5},
        "items": [
          {"type": "fn", "id": "v", "expr": "10\\sin(x)", "domain": [0, 12.566]},
          {"type": "guide", "at": [12.566, 7.07], "yLabel": "Vrms"},
          {"type": "point", "at": [1.5708, 10], "on": ["v"], "is": "turning point", "label": "Vpeak", "pos": "above"}
        ]
      }
    },
    "remember": "RMS is the DC equivalent for power: peak divided by √2.",
    "a": {
      "q": "An AC supply has a peak voltage of 20 V. About what DC voltage would give the same power in a resistor?",
      "opts": ["14 V", "28 V", "10 V", "20 V"],
      "why": "The equal-power DC voltage is the RMS value: 20 ÷ √2 ≈ 14 V. Multiplying by √2 gives 28 V, which reverses the relationship, as the RMS value is below the peak.",
      "clue": "Find the RMS value."
    },
    "b": {
      "d": 3,
      "q": "A workshop in Ballarat has an AC supply with an RMS voltage of 230 V. What is the peak voltage of this supply, to the nearest volt?",
      "opts": ["325 V", "163 V", "230 V", "460 V"],
      "why": "Vpeak = Vrms × √2 = 230 × 1.414 ≈ 325 V. Dividing by √2 gives 163 V, but the quoted 230 V is already the RMS value, so the peak must be larger.",
      "clue": "The quoted mains value is RMS, and the peak is higher."
    }
  },
  "phys-transmission-losses": {
    "title": "Transmission losses",
    "card": [
      "Wires have resistance, so some electrical energy is lost as heat when current flows. The power lost is P = I²R, where I is the current and R is the resistance of the wires.",
      "The loss depends on the square of the current. Halving the current cuts the power lost to a quarter.",
      "Power sent is P = VI. For the same power, a higher voltage means a lower current. The resistance of the wires does not change with the voltage.",
      "So electricity is sent over long distances at high voltage and low current. This keeps the heat loss in the wires small."
    ],
    "remember": "For the same power, high voltage means low current, and low current means less heat lost.",
    "a": {
      "q": "Why is electricity sent along power lines at high voltage?",
      "opts": [
        "It lowers the current, so less power is lost as heat",
        "It lowers the resistance, so the wires heat up less",
        "It raises the current, so more power reaches homes",
        "It raises the generator's output, so homes get more power"
      ],
      "why": "For the same power, a higher voltage means a lower current, and the loss is I²R. The resistance of the wires does not change with the voltage, so lowering the resistance is not the reason.",
      "clue": "Think about what happens to current when voltage rises."
    },
    "b": {
      "d": 3,
      "q": "A power line carries 100 A and loses 40 kW as heat. The same power is sent at ten times the voltage, so the current is 10 A. How much power is lost in the same line?",
      "opts": ["0.4 kW", "4 kW", "40 kW", "0.04 kW"],
      "why": "The current falls to one tenth, and the loss depends on I², so it falls to one hundredth: 40 kW ÷ 100 = 0.4 kW. A fall to 4 kW would treat the loss as proportional to I, but it depends on the square.",
      "clue": "The loss depends on the square of the current."
    }
  },
  "phys-wave-properties": {
    "title": "Wave properties",
    "card": [
      "Light is an electromagnetic wave. It is made of electric and magnetic fields that oscillate together and carry energy through space.",
      "Electromagnetic waves are made by accelerating charges. A charge moving at constant velocity does not make them, but a charge that speeds up, slows down or changes direction does.",
      "Light is a transverse wave. The fields oscillate at right angles to the direction the wave travels.",
      "All electromagnetic waves, from radio waves to X-rays, travel at c in a vacuum, about 3.00 × 10^8 m s^-1, whatever their frequency. Since c = fλ, a lower frequency means a longer wavelength, so radio waves are far longer than visible light."
    ],
    "remember": "Accelerating charges make transverse electromagnetic waves, and in a vacuum all of them travel at c.",
    "a": {
      "q": "Which charge motion would produce an electromagnetic wave?",
      "opts": [
        "An electron oscillating back and forth in an aerial",
        "An electron moving at constant speed in a straight line",
        "A proton at rest on a metal plate",
        "A proton moving at constant velocity in a vacuum"
      ],
      "why": "An oscillating electron keeps changing its velocity, so it is accelerating and radiates an electromagnetic wave. A charge moving at constant speed in a straight line is not accelerating, so it does not. A fast charge is not enough: it must accelerate.",
      "clue": "Look for the charge whose velocity keeps changing."
    },
    "b": {
      "d": 3,
      "q": "A radio wave of frequency 100 MHz and a beam of red light both travel through a vacuum. How do their speeds and wavelengths compare?",
      "opts": [
        "Equal speeds, and the radio wave has the longer wavelength",
        "Equal speeds, and the radio wave has the shorter wavelength",
        "The radio wave is faster because its wavelength is longer",
        "The red light is faster because its frequency is higher"
      ],
      "why": "All electromagnetic waves travel at c in a vacuum, so the speeds are equal. Since c = fλ, the radio wave's much lower frequency means a much longer wavelength. Frequency and wavelength do not change the speed in a vacuum.",
      "clue": "Speed is fixed in a vacuum, so use c = fλ to compare wavelengths."
    }
  },
  "phys-standing-waves": {
    "title": "Standing waves",
    "card": [
      "A wave that meets a boundary is reflected. The incoming wave and the reflected wave travel in opposite directions and add together as they overlap.",
      [
        "Node",
        "a point that stays still, because the two waves always arrive opposite and cancel there. Nodes are fixed in place."
      ],
      [
        "Antinode",
        "a point where the two waves always arrive together and add, so the medium moves with the largest amplitude. Antinodes are also fixed in place."
      ],
      "The pattern does not travel along the medium, which is why it is called a standing wave. Neighbouring nodes are half a wavelength apart, and a node and the next antinode are a quarter of a wavelength apart."
    ],
    "remember": "A wave plus its reflection gives a standing wave: fixed nodes of no movement and fixed antinodes of largest movement.",
    "a": {
      "q": "A guitar string is plucked and a standing wave forms on it. What is true of a node on the string?",
      "opts": [
        "It stays still because the two waves cancel there",
        "It moves most because the two waves add there",
        "It moves along the string at the wave speed",
        "It stays still because no wave reaches it"
      ],
      "why": "At a node the incoming and reflected waves always arrive opposite, so they cancel and the string does not move. The option saying it stays still because no wave reaches it is wrong: both waves do reach the node, and it is their cancelling that keeps it still.",
      "clue": "Think about what the two waves do when they arrive opposite."
    },
    "b": {
      "d": 3,
      "q": "A standing wave forms on a rope with a wavelength of 1.2 m. What is the distance from one node to the next antinode?",
      "opts": ["0.30 m", "0.60 m", "1.2 m", "2.4 m"],
      "why": "Neighbouring nodes are half a wavelength apart, which is 0.60 m. An antinode sits midway between two nodes, so a node and the next antinode are a quarter of a wavelength apart: 1.2 ÷ 4 = 0.30 m. The tempting 0.60 m is the distance from node to node.",
      "clue": "An antinode lies halfway between two neighbouring nodes."
    }
  },
  "phys-diffraction": {
    "title": "Diffraction",
    "card": [
      "Diffraction is the spreading of a wave as it passes through a gap or around the edge of an obstacle. The wave bends into the region behind the barrier.",
      "The wavelength does not change during diffraction. The wave only spreads out.",
      "The amount of spreading depends on the ratio λ/w, the wavelength divided by the gap width. The larger this ratio, the more the wave spreads.",
      "Spreading is small when the gap is much wider than the wavelength. It is noticeable when the gap is about the wavelength or smaller. A gap narrower than the wavelength gives the widest spreading, though less of the wave gets through."
    ],
    "remember": "More diffraction comes from a larger λ/w: a longer wavelength or a narrower gap.",
    "a": {
      "q": "Water waves pass through a gap in a barrier and spread into the region behind it. What is this effect called?",
      "opts": ["Diffraction", "Reflection", "Standing wave formation", "Interference"],
      "why": "Diffraction is the spreading of a wave through a gap or around an edge. Reflection is different because the wave bounces back from the barrier instead of spreading past it.",
      "clue": "The wave bends into the region behind the barrier."
    },
    "b": {
      "d": 3,
      "q": "In a ripple tank, water waves pass through a gap. Which setup makes the waves diffract the most?",
      "opts": [
        "Wavelength 2.0 cm, gap width 1.5 cm",
        "Wavelength 1.0 cm, gap width 1.5 cm",
        "Wavelength 2.0 cm, gap width 6.0 cm",
        "Wavelength 1.0 cm, gap width 6.0 cm"
      ],
      "why": "The spreading depends on λ/w. The ratios are about 1.3, 0.67, 0.33 and 0.17, so the 2.0 cm waves through the 1.5 cm gap spread the most. The 1.0 cm waves through the same 1.5 cm gap spread less, because their shorter wavelength gives a smaller ratio.",
      "clue": "Work out the wavelength divided by the gap width for each setup."
    }
  },
  "phys-path-difference-interference": {
    "title": "Path difference and interference",
    "card": [
      "Path difference is the difference in the distances travelled by two waves from their sources to the same point. It is a distance in metres, often written as a multiple of the wavelength (λ).",
      [
        "Constructive",
        "if the path difference is 0, λ, 2λ and so on (nλ), the waves arrive in phase. Crests meet crests, so the light is bright."
      ],
      [
        "Destructive",
        "if the path difference is ½λ, 1½λ, 2½λ and so on ((n + ½)λ), the waves arrive out of phase. Crests meet troughs, so the light is dark."
      ],
      "These rules hold when the two sources are coherent and in phase, as in a double slit lit by one source. The centre of the screen is equally far from both slits, so its path difference is 0 and it is bright."
    ],
    "remember": "Path difference of a whole number of wavelengths gives bright. A half-wavelength offset gives dark.",
    "a": {
      "q": "Light from two coherent, in-phase sources reaches a point on a screen. One path is 3.0 wavelengths longer than the other. What is seen there?",
      "opts": [
        "A bright band, as the waves arrive in phase",
        "A dark band, as the waves arrive out of phase",
        "A dark band, as the path difference is an odd number",
        "A bright band, as the waves cancel each other out"
      ],
      "why": "A path difference of 3λ is a whole number of wavelengths, so crests meet crests and the light is bright. A dark band needs a half-wavelength offset such as 2.5λ or 3.5λ. Being an odd whole number does not matter.",
      "clue": "Is 3.0 a whole number of wavelengths or a half-way value?"
    },
    "b": {
      "d": 3,
      "q": "In a double slit setup, a point P on the screen is 2.5 wavelengths further from slit 1 than from slit 2. A point Q is 2.0 wavelengths further from slit 1 than from slit 2. What is seen at P and Q?",
      "opts": ["P is dark and Q is bright", "P is bright and Q is dark", "P and Q are both bright", "P and Q are both dark"],
      "why": "At P the path difference is 2.5λ, a half-wavelength offset, so the waves arrive out of phase and P is dark. At Q it is 2.0λ, a whole number, so Q is bright. Choosing P bright and Q dark swaps the two rules.",
      "clue": "Check which path difference is a whole number and which ends in a half."
    }
  },
  "phys-photoelectric-effect-2": {
    "title": "The photoelectric effect",
    "card": [
      "When light shines on a metal surface, it can eject electrons from the metal. These electrons are called photoelectrons.",
      "Electrons are ejected only if the light's frequency is above a threshold frequency, f0, which depends on the metal. Below f0, no electrons are ejected, however bright the light is.",
      "Above f0, even very dim light ejects electrons with no measurable delay. Brighter light ejects more electrons per second. A higher frequency, not brighter light, raises the electrons' maximum kinetic energy.",
      "The wave model said light energy spreads out and builds up over time. So bright enough light of any frequency should eject electrons, after a delay if the light is dim. Experiments showed neither, and Einstein explained the results with photons, a particle model of light."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "Maximum kinetic energy of the photoelectrons against the frequency of the light. Below the threshold frequency f0 no electrons are ejected, however bright the light. Above f0, the maximum kinetic energy rises in a straight line as the frequency rises.",
        "x": {"min": 0, "max": 10, "label": "Frequency"},
        "y": {"min": 0, "max": 7, "label": "Kmax"},
        "items": [
          {"type": "fn", "id": "k", "expr": "0.9x - 3.6", "domain": [4, 10]},
          {"type": "point", "at": [4, 0], "on": ["k"], "is": "x-intercept"},
          {"type": "guide", "at": [4, 0], "xLabel": "\\(f_{0}\\)"},
          {"type": "text", "at": [2, 0.2], "label": "no electrons", "pos": "above"}
        ]
      }
    },
    "remember": "Frequency decides whether electrons are ejected. Brightness decides how many.",
    "a": {
      "q": "A metal is lit with red light and no electrons are ejected, even when the lamp is made much brighter. What does this show?",
      "opts": [
        "The red light is below the metal's threshold frequency",
        "The red light is above the metal's threshold frequency",
        "The metal needs longer to absorb enough red light",
        "The red light is too bright to eject any electrons"
      ],
      "why": "Below the threshold frequency, no electrons are ejected, however bright the light is. The wave model suggested that waiting longer would let energy build up, but experiments show no electrons at any brightness or time below the threshold.",
      "clue": "Brightness did not help, so what property of the light matters?"
    },
    "b": {
      "d": 3,
      "q": "Ultraviolet light ejects electrons from a zinc plate. The lamp is then dimmed a lot, with the frequency kept the same. What happens?",
      "opts": [
        "Electrons are still ejected, but fewer each second",
        "Electrons stop being ejected until the light is brighter",
        "Electrons are ejected, but with a lower maximum energy",
        "Electrons are ejected only after a long delay"
      ],
      "why": "The frequency is unchanged and still above the threshold, so electrons are still ejected straight away. Dimmer light ejects fewer electrons per second. The maximum kinetic energy depends on frequency, not brightness, and the delay the wave model predicted is not seen.",
      "clue": "Which property of the light was kept the same?"
    }
  },
  "phys-photons-energy": {
    "title": "Photons and energy",
    "card": [
      "Light comes in packets of energy called photons. One photon carries energy E = hf, where h is Planck's constant and f is the frequency of the light.",
      "A higher frequency means more energy per photon. The intensity of a beam sets how many photons arrive each second, not the energy of each one.",
      "In the photoelectric effect, one photon gives all its energy to one electron. Part of that energy frees the electron from the metal.",
      "The rest of the energy becomes the electron's kinetic energy. So photon energy = energy to free the electron + kinetic energy."
    ],
    "remember": "One photon has energy hf. It goes into freeing one electron and the rest into its motion.",
    "a": {
      "q": "Light of frequency f is replaced by light of a higher frequency. The number of photons per second stays the same. What changes for each photon?",
      "opts": ["Its energy is larger", "Its energy is smaller", "Its energy is the same", "Its speed in a vacuum is larger"],
      "why": "Photon energy is E = hf, so a higher frequency gives each photon more energy. The number of photons per second is the intensity, and it has not changed. Light in a vacuum keeps the same speed whatever its frequency.",
      "clue": "Look at what E = hf depends on."
    },
    "b": {
      "d": 3,
      "q": "Violet light shines on a metal and ejects electrons. Only the number of photons per second is then doubled, and the frequency is unchanged. What happens to the kinetic energy of each ejected electron?",
      "opts": [
        "It stays the same, but more electrons are ejected",
        "It doubles, because the beam carries twice the energy",
        "It halves, because the photons share their energy",
        "It falls, because the electrons must share the energy"
      ],
      "why": "Each photon still has energy hf, and each gives all of it to one electron. Doubling the photons ejects more electrons but does not change the energy each one gets. The beam carries more energy in total, but no single electron receives it.",
      "clue": "One photon gives its energy to one electron."
    }
  },
  "phys-work-function-stopping-voltage": {
    "title": "Work function and stopping voltage",
    "card": [
      [
        "Work function",
        "the least energy needed to free an electron from a metal's surface. It is written as φ and depends on the metal."
      ],
      [
        "Maximum kinetic energy",
        "an electron freed with the least energy loss leaves with the most kinetic energy. This is Kmax = hf - φ."
      ],
      [
        "Stopping voltage",
        "the voltage that just stops the fastest electrons from reaching the other plate. Kmax = eV₀, where e is the size of an electron's charge."
      ],
      "Measuring V₀ gives Kmax in electron volts. If V₀ is 2.0 V, then Kmax is 2.0 eV."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "Kmax against the frequency of the light: a straight line, Kmax = hf minus φ, that starts at the threshold frequency f0 on the frequency axis. Extended back as a dashed line, it meets the energy axis at minus φ, the work function.",
        "x": {"min": 0, "max": 10, "label": "Frequency"},
        "y": {"min": -4.5, "max": 6.5, "label": "Kmax"},
        "items": [
          {
            "type": "fn",
            "id": "k",
            "expr": "0.9x - 3.6",
            "domain": [4, 10],
            "label": "\\(K_{max} = hf - \\phi\\)",
            "labelAt": 7,
            "pos": "above-left"
          },
          {
            "type": "fn",
            "id": "e",
            "expr": "0.9x - 3.6",
            "domain": [0, 4],
            "label": "extended",
            "labelAt": 1.4,
            "pos": "below-right",
            "style": "dash"
          },
          {
            "type": "point",
            "at": [4, 0],
            "on": ["k"],
            "is": "x-intercept",
            "label": "\\(f_{0}\\)",
            "pos": "above-left"
          },
          {
            "type": "point",
            "at": [0, -3.6],
            "on": ["e"],
            "is": "y-intercept",
            "label": "\\(-\\phi\\)",
            "pos": "below-right"
          }
        ]
      }
    },
    "remember": "Kmax = hf - φ, and the stopping voltage V₀ measures Kmax through Kmax = eV₀.",
    "a": {
      "q": "A metal has a work function of 2.0 eV. A photon of energy 5.0 eV frees an electron with the most kinetic energy possible. What stopping voltage is needed?",
      "opts": ["3.0 V", "2.0 V", "5.0 V", "7.0 V"],
      "why": "Kmax = 5.0 eV - 2.0 eV = 3.0 eV, so the stopping voltage is 3.0 V. A student who gives 5.0 V forgets that some of the photon's energy was used to free the electron.",
      "clue": "Take the work function away from the photon energy first."
    },
    "b": {
      "d": 3,
      "q": "Light of one frequency ejects electrons from metal X, which has a stopping voltage of 1.5 V. The same light is used on metal Y, which has a larger work function. Electrons are still ejected from Y. What is the stopping voltage for Y?",
      "opts": ["Less than 1.5 V", "More than 1.5 V", "Exactly 1.5 V", "Zero, as Y's work function is larger"],
      "why": "The photon energy is the same, so a larger work function leaves less energy for motion. Kmax is lower, so V₀ is lower. It is not zero: electrons are still ejected from Y, so the photon energy is above Y's work function and some energy is left over.",
      "clue": "Same photon energy: if more is spent freeing the electron, how much is left?"
    }
  },
  "phys-electron-diffraction": {
    "title": "Electron diffraction",
    "card": [
      "Diffraction is the spreading of a wave as it passes through a gap or past an edge. Waves from neighbouring gaps overlap and make a pattern of bright and dark regions.",
      "A crystal has atoms in regular rows. The rows act like a grating that can diffract electrons whose wavelength is close to the atom spacing.",
      "The amount of spreading depends on the wavelength, not on how many electrons arrive. If the wavelength is much smaller than the spacing, the spread is too small to see.",
      "When electrons pass through a thin crystal, they land on a screen in rings or spots, not one blob. Only waves make this pattern, which confirmed de Broglie's idea that electrons have a wavelength."
    ],
    "remember": "A diffraction pattern from electrons shows they behave as waves.",
    "a": {
      "q": "A beam of electrons passes through a thin crystal and forms rings on a screen. What does this show?",
      "opts": [
        "Electrons behave as waves",
        "Electrons behave as tiny particles",
        "Electrons turn into photons in the crystal",
        "The crystal's atoms are not in regular rows"
      ],
      "why": "Rings come from waves spreading and overlapping, so the electrons behave as waves. Particles alone would not make rings, and it is the electrons, not light, that land in the pattern. The regular rows of atoms are what make the pattern possible.",
      "clue": "Which kind of model makes bright and dark patterns?"
    },
    "b": {
      "d": 3,
      "q": "Nina fires electrons at a thin crystal and sees only a single bright spot straight ahead, with no rings. Which change would most likely bring the rings back?",
      "opts": [
        "Slowing the electrons so each has a longer wavelength",
        "Speeding the electrons up so each has a shorter wavelength",
        "Sending more electrons at the crystal each second",
        "Sending fewer electrons at the crystal each second"
      ],
      "why": "The spot means the spread is too small to see, so the wavelength is much smaller than the atom spacing. Slower electrons have a longer wavelength, which spreads more and can bring the rings back. A shorter wavelength spreads even less, and the number of electrons does not change the spread.",
      "clue": "What does the amount of spreading depend on, and which way must it change?"
    }
  },
  "phys-momentum-photons-matter": {
    "title": "Momentum of photons and matter",
    "card": [
      "A photon has momentum even though it has no mass. Its momentum is p = h/λ, where λ is its wavelength and h is Planck's constant.",
      "De Broglie proposed that a particle with momentum p has a wavelength λ = h/p. This is the same relation, written the other way round.",
      "So a photon and a particle with the same wavelength have the same momentum. A shorter wavelength means a larger momentum.",
      "Equal momentum does not mean equal speed. For example, an electron with a wavelength of 0.20 nm moves at only about 1% of the speed of light."
    ],
    "remember": "Same wavelength means same momentum, p = h/λ, for photons and for particles.",
    "a": {
      "q": "An electron and a photon both have a wavelength of 0.20 nm. How do their momenta compare?",
      "opts": [
        "They are equal",
        "The electron's is larger",
        "The photon's is larger",
        "The photon's is zero, as it has no mass"
      ],
      "why": "Both follow p = h/λ, and λ and h are the same, so the momenta are equal. A photon has no mass, but it still has momentum.",
      "clue": "Use the same equation for both and compare the wavelengths."
    },
    "b": {
      "d": 2,
      "q": "A proton has the same momentum as an X-ray photon. Which statement about their wavelengths is correct?",
      "opts": [
        "They are equal, since λ = h/p for both",
        "The proton's is longer, since it has mass",
        "The photon's is longer, since it moves faster",
        "The proton's is shorter, since it is heavier"
      ],
      "why": "Wavelength is h divided by momentum, and the momentum is the same, so the wavelengths are equal. The proton is heavier and slower, but those differences are already accounted for in its momentum.",
      "clue": "Check which quantities appear in the relation for wavelength."
    }
  },
  "phys-idea-quantisation": {
    "title": "The idea of quantisation",
    "card": [
      "A quantity is quantised when it comes only in set amounts, like steps on a staircase. It cannot take any value in between.",
      "Planck proposed that energy is quantised, and Einstein showed that light energy comes in packets, later called photons.",
      "One photon of frequency f has energy E = hf, where h is Planck's constant. Brighter light of the same frequency means more photons, not more energy in each one.",
      "The same idea explained atoms. Electrons in an atom can have only certain set amounts of energy, not any amount."
    ],
    "remember": "Energy comes in set packets, and E = hf gives the size of one photon.",
    "a": {
      "q": "What does it mean to say the energy of light is quantised?",
      "opts": [
        "It comes in packets, each of a set size for a frequency",
        "It can take any value, but only in very bright light",
        "It travels as a wave that has no smallest amount",
        "Each packet's size depends on brightness, not frequency"
      ],
      "why": "Quantised means energy comes in set amounts. For light, each photon of a given frequency carries E = hf. The option about any value is wrong because it describes energy without steps, and brightness changes the number of photons, not their size.",
      "clue": "Think of steps on a staircase, not a ramp."
    },
    "b": {
      "d": 3,
      "q": "Two beams of light of the same frequency fall on a surface. Beam X is twice as bright as beam Y. How do the photons in the beams compare?",
      "opts": [
        "X has more photons each second, with the same energy each",
        "X has the same number of photons, each with twice the energy",
        "X has more photons each second, each with twice the energy",
        "X has the same number of photons, each with the same energy"
      ],
      "why": "Photon energy depends only on frequency, E = hf, and the frequencies are equal. A brighter beam has more photons each second. Doubling the energy of each photon would need a higher frequency, not more brightness.",
      "clue": "What does the energy of one photon depend on?"
    }
  },
  "phys-wave-particle-duality": {
    "title": "Wave-particle duality",
    "card": [
      "Light shows wave behaviour when it passes through two narrow slits. The waves overlap and make a pattern of bright and dark bands, called an interference pattern.",
      "Light also shows particle behaviour. A detector can record a single photon arriving at one spot, not spread across the screen.",
      "Send photons through the slits one at a time. Each one lands at a single point, but after many arrive the points build up the same bands as the wave pattern.",
      "Electrons do the same. Single electrons build up a double slit pattern, so matter acts as both a particle and a wave. This is wave-particle duality."
    ],
    "remember": "Single photons and electrons land as points but build up a wave pattern, so both act as waves and particles.",
    "a": {
      "q": "Single electrons are fired at a double slit, one at a time. After thousands have landed, bright and dark bands appear. What does this show?",
      "opts": [
        "Electrons act as both particles and waves",
        "Electrons act only as particles, as each lands at a point",
        "Electrons act only as waves, as bands form",
        "Electrons must be interacting with each other"
      ],
      "why": "Each electron is detected at one point, which is particle behaviour, and the bands that build up are an interference pattern, which is wave behaviour. Electrons arriving one at a time cannot be interfering with each other, so that option is wrong.",
      "clue": "Think about both how each electron lands and what pattern forms."
    },
    "b": {
      "d": 3,
      "q": "In a double slit experiment, photons are sent through one at a time. A student watches the screen early on, when only a few photons have landed. What would the student see?",
      "opts": [
        "A few separate points that do not yet show bands",
        "A faint, smooth set of bands across the whole screen",
        "One bright band at the centre of the screen",
        "Nothing, as one photon cannot reach a screen"
      ],
      "why": "Each photon is detected at a single point, so early on there are just scattered dots. The bands only appear as many points build up. A smooth faint pattern would mean each photon spreads out when detected, which is not what happens.",
      "clue": "Each photon is detected at one spot, and the pattern takes time to build."
    }
  },
  "phys-limits-classical-mechanics": {
    "title": "Limits of classical mechanics",
    "card": [
      "Classical mechanics is the physics of Newton. It predicts the motion of everyday objects very well, such as cars, balls and planets.",
      "Classical mechanics assumes speeds simply add. A ball thrown forward at 10 m/s from a train moving at 30 m/s moves at 40 m/s relative to the ground.",
      "At speeds close to the speed of light, this fails. Experiments show that fast particles do not behave as Newton's laws predict.",
      "At everyday speeds, which are tiny compared with the speed of light, the error is negligible. So classical mechanics still works well there, and it is not wrong for cars or planets."
    ],
    "remember": "Newton's mechanics works at everyday speeds but fails for objects moving close to the speed of light.",
    "a": {
      "q": "Which situation is one where classical mechanics gives results that fail experimental tests?",
      "opts": [
        "An electron moving at 99% of the speed of light",
        "A cyclist riding at 15 m/s along a straight road",
        "A spacecraft coasting at a few km/s past a planet",
        "A footballer kicking a ball at 25 m/s across a field"
      ],
      "why": "Only the electron is moving close to the speed of light, where Newton's predictions fail. The other speeds are tiny compared with the speed of light. A spacecraft is fast by human standards, but Newton's laws still predict its path very well at a few km/s.",
      "clue": "Look for the speed that is close to the speed of light."
    },
    "b": {
      "d": 2,
      "q": "An engineer in Geelong designs a conveyor belt that carries boxes at 2 m/s. Why is classical mechanics suitable for this design?",
      "opts": [
        "The speed is tiny compared with the speed of light",
        "The boxes are heavy enough to avoid any error",
        "Classical mechanics works for anything made of matter",
        "The belt is on Earth, where relativity does not apply"
      ],
      "why": "At 2 m/s, the speed is far below the speed of light, so the error in Newton's predictions is too small to matter. Mass and location do not decide this. Relativity still applies on Earth, but its effects are tiny at low speeds.",
      "clue": "Compare the belt's speed with the speed of light."
    }
  },
  "phys-michelson-morley-experiment": {
    "title": "The Michelson-Morley experiment",
    "card": [
      "Before 1900, many physicists thought light was a wave that travelled through a medium called the aether. They thought the aether filled all of space and sat at rest.",
      "If the aether existed, Earth would move through it. Light travelling along Earth's motion would then have a different measured speed from light travelling across it.",
      "In 1887, Michelson and Morley split a light beam into two beams at right angles and compared them. They looked for a shift in the pattern made when the beams recombined. They found no shift that matched Earth's motion.",
      "So the measured speed of light did not change with Earth's motion, and no aether was detected. This result fits special relativity, which says light has the same speed for all observers."
    ],
    "remember": "No change in the speed of light was found, so no aether was detected.",
    "a": {
      "q": "What did Michelson and Morley's experiment find?",
      "opts": [
        "The speed of light did not depend on Earth's motion",
        "The speed of light was greater along Earth's motion",
        "The speed of light was less along Earth's motion",
        "The speed of light changed with the time of year"
      ],
      "why": "They looked for a difference in light's speed along and across Earth's motion and found none. The aether idea predicted a different speed along the motion, so the greater and less options both describe a prediction that was not seen.",
      "clue": "Think about what the aether idea predicted, then what was actually seen."
    },
    "b": {
      "d": 3,
      "q": "A student says the experiment supports special relativity. Which finding backs this up?",
      "opts": [
        "Light had the same measured speed in every direction",
        "Light needed the aether as a medium to travel through",
        "Light was faster when it travelled along Earth's motion",
        "Light was slower when it travelled across Earth's motion"
      ],
      "why": "The experiment found no change in light's speed with direction or Earth's motion, which fits special relativity's claim that light has the same speed for all observers. The aether option is tempting because the experiment was built to find the aether, but no aether was detected.",
      "clue": "Which option matches a null result, with no aether found?"
    }
  },
  "phys-time-dilation-length-contraction": {
    "title": "Time dilation and length contraction",
    "card": [
      [
        "Proper time",
        "the time between two events measured in a frame where both events happen at the same place. A clock moving with the events measures it."
      ],
      ["Proper length", "the length of an object measured in the frame where the object is at rest."],
      "An observer moving relative to these measures a longer time and a shorter length. The time is t = γt₀ and the length is L = L₀/γ, where γ = 1/√(1 − v²/c²) and γ is always 1 or more.",
      "The length shortens only along the direction of motion. The effects are tiny at everyday speeds and large close to the speed of light."
    ],
    "remember": "Own frame gives the shortest time and the longest length. Moving observers see time stretched and length shrunk.",
    "a": {
      "q": "A rocket passes Earth at 0.8c. Which measurement is a proper time?",
      "opts": [
        "A rocket clock timing two events at one spot on the rocket",
        "An Earth clock timing two events at one spot on the rocket",
        "A rocket clock timing two events at one spot on Earth",
        "Two Earth clocks timing the rocket between two planets"
      ],
      "why": "The rocket clock sits at that spot on the rocket, so it is present at both events and measures proper time. An Earth clock sees that spot move, so the two events happen at different places in its frame. In the same way, a spot on Earth moves past the rocket, and two separate clocks mean the events are at different places.",
      "clue": "In which frame do both events happen at the same place?"
    },
    "b": {
      "d": 3,
      "q": "A spacecraft is 120 m long when at rest. It passes a station at 0.6c, where γ = 1.25. What length does the station crew measure, and what do the spacecraft crew measure?",
      "opts": [
        "96 m by the station crew, 120 m by the spacecraft crew",
        "120 m by the station crew, 96 m by the spacecraft crew",
        "150 m by the station crew, 120 m by the spacecraft crew",
        "96 m by the station crew, 96 m by the spacecraft crew"
      ],
      "why": "The 120 m is the proper length, measured by the spacecraft crew in the frame where it is at rest. The station crew see it moving, so L = 120 ÷ 1.25 = 96 m. Multiplying by γ gives 150 m, but moving observers measure a shorter length, not a longer one.",
      "clue": "Whose frame is the spacecraft at rest in?"
    }
  },
  "phys-relativity-action": {
    "title": "Relativity in action",
    "card": [
      [
        "Muons",
        "Muons are made high in the atmosphere and last only about 2.2 microseconds at rest. In that time they could not travel far enough to reach the ground, yet many do. In Earth's frame the muon's clock runs slowly, and in the muon's frame the trip is shorter."
      ],
      [
        "Accelerators",
        "Particles in accelerators move very close to the speed of light. Their design must use relativity, or the predicted behaviour of the particles would not match what is measured."
      ],
      [
        "GPS",
        "GPS satellite clocks tick at a different rate from clocks on the ground. Their speed slows them by about 7 microseconds a day, while weaker gravity at their height, an effect of general relativity, speeds them up by about 45. Without corrections, timing and position errors would build up each day."
      ],
      "In each case, measurements match relativity and do not match the predictions of Newton's mechanics."
    ],
    "remember": "Muon survival, accelerator design and GPS timing all match relativity, not Newton.",
    "a": {
      "q": "Many muons made high in the atmosphere reach the ground. What is the best explanation?",
      "opts": [
        "Their short lifetime is stretched in Earth's frame",
        "Their lifetime is longer in the muon's own frame",
        "Their speed is greater than the speed of light",
        "Earth's atmosphere slows them so they last longer"
      ],
      "why": "Measured from Earth, the muon's clock runs slowly, so it lasts long enough to reach the ground. In its own frame its lifetime is still only about 2.2 microseconds, so the option about the muon's own frame is wrong.",
      "clue": "The 2.2 microsecond lifetime is measured with the muon at rest."
    },
    "b": {
      "d": 3,
      "q": "An engineer says GPS needs relativistic corrections. Which statement best supports this?",
      "opts": [
        "Without corrections, satellite timing errors would build up",
        "Satellites travel faster than light relative to Earth",
        "Satellites are too small for Newton's mechanics to apply",
        "Radio signals from satellites travel at varying speeds"
      ],
      "why": "Satellite clocks tick at a different rate from clocks on the ground, because of both their speed and the weaker gravity at their height. Uncorrected, the timing errors would grow and cause position errors. The signals are not the problem, so the option about varying signal speeds is wrong.",
      "clue": "Think about what differs between a satellite and the ground, and what that does over a day."
    }
  },
  "phys-mass-energy-relativity": {
    "title": "Mass and energy in relativity",
    "card": [
      "An object's total energy is E = γmc². Here m is its rest mass, c is the speed of light, and γ is the Lorentz factor, which is 1 at rest and grows as speed rises.",
      "At rest, γ = 1 and the energy is the rest energy, E = mc². Total energy = rest energy + kinetic energy, so kinetic energy = (γ - 1)mc².",
      "Mass and energy can be converted. In the Sun, hydrogen nuclei fuse into helium, and the products have slightly less mass than the starting nuclei. The lost mass is released as energy.",
      "In annihilation, a particle and its antiparticle meet and their whole rest mass becomes energy, usually as photons. The energy released is the rest energy of both particles."
    ],
    "remember": "Total energy is γmc²: rest energy mc² plus kinetic energy. Lost mass becomes released energy.",
    "a": {
      "q": "An electron is moving at high speed. Which expression gives its kinetic energy?",
      "opts": ["(γ - 1)mc²", "γmc²", "mc²", "(γ + 1)mc²"],
      "why": "Kinetic energy is total energy minus rest energy, so γmc² - mc² = (γ - 1)mc². The total energy γmc² is tempting, but it also includes the rest energy.",
      "clue": "Take the rest energy away from the total energy."
    },
    "b": {
      "d": 3,
      "q": "In a lab, an electron and its antiparticle meet at rest and annihilate. What is the total energy released?",
      "opts": [
        "The rest energy of both particles, 2mc²",
        "The rest energy of one particle, mc²",
        "Only the kinetic energy of both particles",
        "Nothing, because mass is always conserved separately"
      ],
      "why": "All the rest mass of both particles becomes energy, so the energy is mc² + mc² = 2mc². Counting only one particle is tempting, but both particles lose their mass.",
      "clue": "Count the rest energy of each particle that disappears."
    }
  },
  "phys-variables-controlled-experiments-physics": {
    "title": "Variables and controlled experiments",
    "card": [
      [
        "Independent variable",
        "the quantity the experimenter deliberately changes. There should be only one in a test."
      ],
      ["Dependent variable", "the quantity that is measured to see how it responds to the change."],
      [
        "Controlled variables",
        "all other quantities that could affect the result. They are kept the same, so they cannot explain any change in the dependent variable."
      ],
      "If only the independent variable changes and the dependent variable changes with it, the investigation supports a cause and effect link. If a second quantity also changes, the cause cannot be pinned down."
    ],
    "remember": "Change one thing, measure the response, and hold everything else the same.",
    "a": {
      "q": "Why must the controlled variables be kept constant in an investigation?",
      "opts": [
        "So they cannot explain a change in the dependent variable",
        "So the independent variable stays the same in every trial",
        "So the dependent variable does not change at all",
        "So the measurements need no repeats"
      ],
      "why": "If a controlled variable also changed, it could be the real cause of the change in the dependent variable. Keeping them constant removes that doubt. The independent variable is the one that is deliberately changed, so it does not stay the same.",
      "clue": "Think about what else could cause the change you see."
    },
    "b": {
      "d": 2,
      "q": "Priya rolls a trolley down a ramp and times it. She raises the ramp to different heights to see how ramp height affects the trolley's final speed. Which quantity is a controlled variable?",
      "opts": [
        "The mass of the trolley",
        "The height of the ramp",
        "The final speed of the trolley",
        "The cause of the speed change"
      ],
      "why": "The trolley's mass could affect the result, so it must be kept the same in every run. Ramp height is the independent variable because Priya changes it. Final speed is the dependent variable because she measures it.",
      "clue": "Which quantity is neither changed on purpose nor measured as the result?"
    }
  },
  "phys-linearising-data": {
    "title": "Linearising data",
    "card": [
      "A straight line is the easiest graph to judge. If a relationship is not linear, we can transform one variable so the graph becomes a straight line.",
      "For a pendulum, the period T depends on length L by T = 2π√(L/g). Plotting T² against L gives a straight line through the origin.",
      "A straight line through the origin means the plotted quantities are directly proportional. A curve on the first graph shows the relationship is not linear.",
      "The gradient of the line has a physical meaning. For T² against L, gradient = 4π²/g, so g = 4π² ÷ gradient. The gradient has units too: the units of the y-axis divided by the units of the x-axis."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "The period T of a pendulum against its length L for five lengths from 0.2 m to 1.0 m. The points lie on a curve that rises less and less steeply, so T is not proportional to L.",
        "x": {"min": 0, "max": 1.25, "label": "L (m)", "step": 0.2},
        "y": {"min": 0, "max": 2.5, "label": "T (s)", "step": 0.5},
        "items": [
          {"type": "fn", "id": "t", "expr": "2.007\\sqrt{x}", "domain": [0, 1.1]},
          {"type": "point", "at": [0.2, 0.898], "on": ["t"]},
          {"type": "point", "at": [0.4, 1.269], "on": ["t"]},
          {"type": "point", "at": [0.6, 1.555], "on": ["t"]},
          {"type": "point", "at": [0.8, 1.795], "on": ["t"]},
          {"type": "point", "at": [1.0, 2.007], "on": ["t"]}
        ]
      },
      "3": {
        "kind": "graph",
        "alt": "The square of the period, T squared, against length L for the same five lengths. The points lie on a straight line through the origin, so T squared is directly proportional to L. Its gradient is about 4.0 s squared per metre.",
        "x": {"min": 0, "max": 1.2, "label": "L (m)", "step": 0.2},
        "y": {"min": 0, "max": 5, "label": "T² (s²)", "step": 1},
        "items": [
          {"type": "fn", "id": "t", "expr": "4.028x", "domain": [0, 1.1]},
          {"type": "point", "at": [0.2, 0.806], "on": ["t"]},
          {"type": "point", "at": [0.4, 1.611], "on": ["t"]},
          {"type": "point", "at": [0.6, 2.417], "on": ["t"]},
          {"type": "point", "at": [0.8, 3.222], "on": ["t"]},
          {"type": "point", "at": [1.0, 4.028], "on": ["t"]}
        ]
      }
    },
    "remember": "Plot the transformed quantity so the points form a straight line, then read the physics from the gradient.",
    "a": {
      "q": "Students plot T² (s²) against L (m) for a pendulum and get a straight line through the origin. What does the gradient allow them to find?",
      "opts": [
        "The value of g, using g = 4π² ÷ gradient",
        "The value of L, using L = 4π² ÷ gradient",
        "The mass of the bob, using the gradient",
        "The amplitude of the swing, using the gradient"
      ],
      "why": "Squaring both sides gives T² = (4π²/g)L, so the gradient equals 4π²/g and g can be found by rearranging. L is plotted on the x-axis, so it varies along the line and is not a single value from the gradient. Mass and amplitude do not appear in the relationship at all.",
      "clue": "Square both sides of T = 2π√(L/g) and compare it with y = mx."
    },
    "b": {
      "d": 3,
      "q": "A student measures the period T of a pendulum at several lengths L and plots T against L. The points form a curve. Which change would be expected to give a straight line?",
      "opts": [
        "Plot T² on the vertical axis against L",
        "Plot L on the vertical axis against T",
        "Plot T against L with a larger scale",
        "Draw a line of best fit through the curve"
      ],
      "why": "Since T² = (4π²/g)L, plotting T² against L gives a straight line. Swapping the axes leaves the curve, as L is proportional to T², not T. A bigger scale or a straight line drawn through curved data does not change the relationship.",
      "clue": "Which transformed quantity is proportional to L?"
    }
  },
  "phys-presenting-scientific-poster": {
    "title": "Presenting a scientific poster",
    "card": [
      "A poster communicates an investigation briefly. It has clear sections, such as the aim, method, results, discussion and conclusion, so a reader can follow it quickly.",
      "Use short sentences and labelled graphs, tables and diagrams. Axes and columns need the correct quantity symbols and units, such as v (m s⁻¹).",
      "Report values to a suitable number of significant figures. This should match the precision of the measurements, not every digit on a calculator.",
      "Acknowledge sources, such as books, websites and data from others, in a reference list. This shows which ideas and data are not your own."
    ],
    "remember": "A poster is brief, uses correct symbols, units and significant figures, and credits its sources.",
    "a": {
      "q": "A student reads a length of 23.5 cm from a ruler marked in millimetres, then converts it to metres on a calculator, which shows 0.2350000 m. What should the poster show?",
      "opts": ["0.235 m", "0.2350000 m", "0.2 m", "0.23500 m"],
      "why": "The ruler reading has three significant figures, so the poster should show 0.235 m. The full calculator display, 0.2350000 m, suggests a precision the ruler does not have. Rounding to 0.2 m throws away precision the ruler does give.",
      "clue": "The converted value cannot be more precise than the ruler reading."
    },
    "b": {
      "d": 2,
      "q": "Leila's poster uses a graph from a website and a formula from a textbook. What should she do?",
      "opts": [
        "List both sources in a reference list",
        "Leave them out, as they are not her own work",
        "Mention only the textbook, as it is printed",
        "Add the source only if the teacher asks"
      ],
      "why": "Any data, graph or formula that is not her own should be acknowledged. The website and the textbook both count as sources. Leaving them out of the reference list would present others' work as hers.",
      "clue": "Which of these ideas did Leila not come up with herself?"
    }
  },
  "phys-nuclear-fission": {
    "title": "Nuclear fission",
    "card": [
      "Fission is when a heavy nucleus, such as uranium-235, splits into two smaller nuclei. It releases energy and two or three neutrons.",
      "Fission is usually started when a nucleus absorbs a neutron. The neutrons released can then be absorbed by other nuclei and split them too. This is a chain reaction.",
      "A chain reaction needs enough fissile material in a suitable shape. If too many neutrons escape through the surface, the reaction dies out. This is why a minimum mass, the critical mass, is needed.",
      "Neutrons from fission move fast, and slow neutrons are more likely to be absorbed by uranium-235. A moderator, such as water or graphite, slows the neutrons down so the chain reaction can continue in a reactor."
    ],
    "remember": "Fission splits a heavy nucleus and frees neutrons. Those neutrons keep a chain reaction going if enough are absorbed.",
    "a": {
      "q": "What makes fission a chain reaction?",
      "opts": [
        "Neutrons released by one fission trigger further fissions",
        "Energy released by one fission heats the whole reactor",
        "The two smaller nuclei split again into lighter nuclei",
        "A moderator keeps adding new uranium to the reactor"
      ],
      "why": "Each fission releases neutrons, and these can be absorbed by other nuclei and split them. If enough neutrons are absorbed, the reaction can sustain itself. Heat is released, but heat alone does not cause the next fission.",
      "clue": "What particles come out of each fission?"
    },
    "b": {
      "d": 3,
      "q": "A small sphere of uranium-235 does not sustain a chain reaction, but a larger one does. What is the best explanation?",
      "opts": [
        "In the small sphere too many neutrons escape the surface",
        "In the small sphere the neutrons are moving too slowly",
        "In the larger sphere each fission releases more neutrons",
        "In the larger sphere the nuclei are less likely to split"
      ],
      "why": "A small sphere has a large surface compared with its volume, so many neutrons leave before they hit another nucleus. A larger mass lets enough neutrons be absorbed to keep going. The number of neutrons per fission does not depend on the size of the sphere.",
      "clue": "What must happen to a neutron before it can cause another fission?"
    }
  },
  "phys-nuclear-fusion": {
    "title": "Nuclear fusion",
    "card": [
      "Fusion is when two light nuclei join to form a heavier nucleus. It releases energy. An example is hydrogen nuclei fusing to form helium.",
      "Fusion powers the Sun and other stars. In the Sun, hydrogen is fused into helium in the core.",
      "Nuclei are positively charged, so they repel each other. To fuse, they must be moving very fast and get very close. This needs extremely high temperatures and pressures, as in the core of the Sun.",
      "Fusion is a different process from fission, which is a separate idea. Scientists are testing fusion reactors on Earth, but none yet supplies power to homes."
    ],
    "remember": "Fusion joins light nuclei, but only extreme heat and pressure push them close enough.",
    "a": {
      "q": "Why does fusion need extremely high temperatures?",
      "opts": [
        "Nuclei must move fast enough to overcome their repulsion",
        "Nuclei must be heavy enough to split into smaller ones",
        "Heat makes the nuclei attract each other more strongly",
        "Nuclei must be melted so they can be joined together"
      ],
      "why": "Nuclei are positively charged and repel each other. High temperature gives them enough speed to get close and fuse. Heat does not make nuclei attract: they still repel, and speed is what lets them get close anyway.",
      "clue": "What do two positive charges do when they approach?"
    },
    "b": {
      "d": 2,
      "q": "Which process happens in the core of the Sun?",
      "opts": [
        "Hydrogen nuclei fuse to form helium",
        "Uranium nuclei split into smaller nuclei",
        "Helium nuclei split into hydrogen nuclei",
        "Hydrogen burns with oxygen to form water"
      ],
      "why": "The Sun gets its energy from fusion, where light hydrogen nuclei join to form helium. Splitting nuclei is not fusion, so the uranium and helium options are wrong. Burning hydrogen is a chemical reaction, not a nuclear one.",
      "clue": "Light nuclei join to form a heavier one."
    }
  },
  "phys-nuclear-power-australia": {
    "title": "Nuclear power for Australia",
    "card": [
      "A nuclear power station uses fission to heat water into steam, which turns turbines. It gives off very little carbon dioxide while running, and it can supply steady power day and night.",
      [
        "Costs",
        "nuclear stations cost a lot and take many years to build. Australian law bans nuclear power stations now, so Australia would also need law changes, trained staff and regulators."
      ],
      [
        "Risks",
        "used fuel stays dangerously radioactive for thousands of years and needs secure long-term storage. Rare accidents can release radioactive material."
      ],
      [
        "Weighing up",
        "physics can measure costs, risks and benefits. Whether Australia should build nuclear power also depends on values, such as how much risk people accept."
      ]
    ],
    "remember": "Steady, low-carbon power on one side; high cost, long build times, waste and accident risk on the other.",
    "a": {
      "q": "Compared with a coal power station, what is a benefit of a nuclear power station while it runs?",
      "opts": [
        "It gives off very little carbon dioxide",
        "It produces no radioactive waste at all",
        "It needs no fuel once it starts running",
        "It can only supply power in the daytime"
      ],
      "why": "Fission heats the water without burning fuel, so very little carbon dioxide is released while it runs. It still makes used fuel that stays radioactive for a very long time.",
      "clue": "What does burning coal release that fission does not?"
    },
    "b": {
      "d": 3,
      "q": "Ming says nuclear waste would be left for future Australians to deal with. Which statement rests on a value judgement rather than physics?",
      "opts": [
        "Leaving waste to future Australians is unfair",
        "Used fuel stays radioactive for a very long time",
        "Nuclear stations release little carbon dioxide",
        "Fission in a reactor heats water into steam"
      ],
      "why": "Unfair is a value word: people can agree on every fact and still disagree about what is fair. The other three are facts about how nuclear power works, which can be tested by measurement.",
      "clue": "Which statement could measurement never settle?"
    }
  }
};
