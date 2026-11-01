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
      "q": "Which statement is a hypothesis?",
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
  }
};
