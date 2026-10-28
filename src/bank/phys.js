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
        "Both horizontal and vertical velocities are constant",
        "Horizontal velocity decreases as the ball falls",
        "Vertical velocity is constant at 9.8 m/s"
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
        "It spins faster and faster in one direction",
        "It does not move because the forces cancel out",
        "It turns a half turn, then stops there"
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
        "Its bright lines are wider, so they are easier to see",
        "It stops light of some wavelengths from passing through",
        "It makes all wavelengths leave at the same angle"
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
        "c plus the speed of the spaceship",
        "c minus the speed of the spaceship",
        "Less than c, because the ship is moving"
      ],
      "why": "The speed of light in a vacuum is the same for all observers, whatever the motion of the source. Adding the ship's speed to c is the everyday rule, and the second postulate rules it out.",
      "clue": "Does the speed of the source change the speed of light?"
    },
    "b": {
      "d": 3,
      "q": "Priya is on a train moving at a steady speed. She does a physics experiment in a closed carriage with no windows. Which statement follows from the first postulate?",
      "opts": [
        "The experiment cannot show if the train is moving steadily",
        "The experiment gives different laws from the platform's",
        "The experiment can measure the train's steady speed",
        "The experiment works only if the train is at rest"
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
        "The particles came only from the glass tube",
        "The particles were different in each metal",
        "The particles had no charge or mass"
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
        "Each was a different value with no pattern",
        "Each was exactly the same size",
        "Each was a fraction of the electron's charge"
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
  }
};
