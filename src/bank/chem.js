/* The chem bank: points made by the content pipeline. Written by python3 content/pipeline.py publish.
   Do not edit it by hand: change a point through the review page and publish again (content/README.md).
   Each point has the same parts as in econ-points.js. In every question the correct answer is opts[0]. */
MADE_BANKS.chem = {
  "chem-pure-substances-mixtures": {
    "title": "Pure substances and mixtures",
    "card": [
      [
        "Pure substance",
        "a material made of only one kind of particle. An element has one type of atom. A compound has two or more elements joined chemically in a fixed ratio."
      ],
      [
        "Mixture",
        "two or more substances that are not chemically joined. The amounts can vary, and each substance keeps its own properties."
      ],
      "Mixtures can be separated by physical means, which make no new substances and use a difference in a property. Filtration separates an undissolved solid from a liquid by particle size.",
      "Distillation separates liquids by boiling point. Chromatography separates substances by how strongly each is attracted to the paper compared with the solvent."
    ],
    "remember": "Mixtures separate by physical means that use a difference in properties.",
    "a": {
      "q": "Why is salt water a mixture and not a compound?",
      "opts": [
        "Its salt and water are not joined chemically and can vary",
        "Its salt and water are joined in one fixed ratio",
        "It contains only one type of atom",
        "It cannot be separated by physical means"
      ],
      "why": "Salt water has salt and water mixed together without being chemically joined, and the amount of salt can vary. A compound has a fixed ratio of elements joined chemically, so that option is wrong.",
      "clue": "Think about whether the amounts can change."
    },
    "b": {
      "d": 3,
      "q": "Ben has a mixture of ethanol and water, which are both liquids. The ethanol boils at a lower temperature than the water. Which method best separates them?",
      "opts": ["Distillation", "Filtration", "Chromatography", "Chemical reaction"],
      "why": "Distillation uses the difference in boiling point to separate the liquids. Filtration is tempting, but it separates an undissolved solid from a liquid by particle size, so it cannot separate two liquids.",
      "clue": "Which property differs between the two liquids?"
    }
  },
  "chem-atomic-structure": {
    "title": "Atomic structure",
    "card": [
      "An atom has a small, dense nucleus at its centre. The nucleus holds protons and neutrons. Electrons move around the nucleus.",
      [
        "Proton",
        "positive charge, found in the nucleus. Neutron: no charge, found in the nucleus. Electron: negative charge, found outside the nucleus."
      ],
      "The atomic number is the number of protons. It decides which element the atom is. The mass number is the number of protons plus neutrons.",
      "A neutral atom has equal numbers of protons and electrons, so the charges cancel. Neutrons = mass number - atomic number."
    ],
    "remember": "Atomic number counts protons. Mass number counts protons and neutrons.",
    "a": {
      "q": "An atom has 11 protons, 12 neutrons and 11 electrons. What is its mass number?",
      "opts": ["23", "11", "12", "34"],
      "why": "Mass number = protons + neutrons = 11 + 12 = 23. The number 11 is the atomic number, which counts protons only. Electrons are not counted in the mass number.",
      "clue": "Add the particles that sit in the nucleus."
    },
    "b": {
      "d": 3,
      "q": "An atom of an element has a mass number of 40 and an atomic number of 18. How many neutrons does it have?",
      "opts": ["22", "18", "40", "58"],
      "why": "Neutrons = mass number - atomic number = 40 - 18 = 22. Adding the two numbers gives 58, which is wrong because the mass number already includes the protons.",
      "clue": "The mass number already includes the protons."
    }
  },
  "chem-isotopes": {
    "title": "Isotopes",
    "card": [
      "Isotopes are atoms of the same element with different numbers of neutrons. For example, carbon-12 has 6 neutrons and carbon-14 has 8.",
      "Isotopes have the same number of protons, so the same atomic number, but different mass numbers. They react in nearly the same way, because they have the same number of electrons.",
      "Some isotopes are radioactive: their nuclei are unstable and break down over time, giving off radiation. Many isotopes are not radioactive.",
      "Relative atomic mass is a weighted average of the masses of an element's isotopes, so more abundant isotopes count for more. If an element is mostly one isotope, its relative atomic mass is close to that isotope's mass number."
    ],
    "remember": "Same protons, different neutrons. Relative atomic mass is an average that favours the more abundant isotopes.",
    "a": {
      "q": "Atom X has 17 protons and 18 neutrons. Atom Y has 17 protons and 20 neutrons. How are X and Y related?",
      "opts": [
        "They are isotopes of the same element",
        "They are atoms of different elements",
        "They are isotopes of two different elements",
        "They are the same element with equal mass numbers"
      ],
      "why": "Both atoms have 17 protons, so they are the same element. They differ in neutrons, so they are isotopes. Their mass numbers are 35 and 37, so they are not equal.",
      "clue": "Compare the protons first, then the neutrons."
    },
    "b": {
      "d": 3,
      "q": "Element Z has two isotopes: 90% has a mass number of 20 and 10% has a mass number of 22. Which value is closest to its relative atomic mass?",
      "opts": ["20.2", "21.0", "21.8", "22.0"],
      "why": "The average is weighted: (0.90 × 20) + (0.10 × 22) = 20.2. The simple average of 20 and 22 is 21.0, which is tempting, but it ignores that the lighter isotope is far more abundant.",
      "clue": "The more abundant isotope counts for more in the average."
    }
  },
  "chem-electron-configuration": {
    "title": "Electron configuration",
    "card": [
      "Electrons sit in energy levels (shells) around the nucleus. Level 1 has only an s subshell, level 2 has s and p, and level 3 has s, p and d.",
      "An s subshell holds up to 2 electrons, a p subshell up to 6 and a d subshell up to 10. Electrons fill the lowest energy subshell first, in the order 1s, 2s, 2p, 3s, 3p, 4s, 3d.",
      "A configuration lists the subshells and their electrons. Sodium has 11 electrons, so its configuration is 1s² 2s² 2p⁶ 3s¹.",
      "The electrons in the outermost energy level are the valence electrons. They decide how an element reacts. Atoms with the same number of valence electrons often react in similar ways."
    ],
    "remember": "Fill from the lowest energy up. The outer electrons decide how an atom reacts.",
    "a": {
      "q": "Which is the correct electron configuration of a neutral magnesium atom, which has 12 electrons?",
      "opts": ["1s² 2s² 2p⁶ 3s²", "1s² 2s² 2p⁶ 3s¹ 3p¹", "1s² 2s² 2p⁸ 3s¹", "1s² 2s² 2p⁴ 3s² 3p²"],
      "why": "1s², 2s² and 2p⁶ use 10 electrons, and the last 2 fill 3s. The 3s¹ 3p¹ and 2p⁴ options both put electrons in a higher subshell before a lower one is full. The 2p⁸ option is wrong because a p subshell holds only 6 electrons.",
      "clue": "Fill each subshell to its limit before moving on."
    },
    "b": {
      "d": 3,
      "q": "Sodium has the configuration 1s² 2s² 2p⁶ 3s¹. Why does it react in a similar way to potassium, which ends in 4s¹?",
      "opts": [
        "Both have one electron in their outer energy level",
        "Both have the same number of energy levels",
        "Both have the same total number of electrons",
        "Both have a full outer energy level"
      ],
      "why": "Reactions depend on the outer electrons, and both atoms have one valence electron. They have different numbers of energy levels and total electrons, and neither outer level is full.",
      "clue": "Look at the last subshell in each configuration."
    }
  },
  "chem-periodic-table-trends": {
    "title": "Periodic table trends",
    "card": [
      "A period is a row of the periodic table. A group is a column. Three properties change in a regular way along a period and down a group.",
      [
        "Across a period",
        "Atomic radius falls. First ionisation energy (the energy to remove one electron from an atom) and electronegativity (how strongly an atom attracts shared electrons) both rise."
      ],
      ["Down a group", "Atomic radius rises. First ionisation energy and electronegativity both fall."],
      [
        "Why",
        "Across a period, the nuclear charge grows while electrons are added to the same energy level, so the outer electrons are pulled in more strongly. Down a group, outer electrons sit in higher energy levels, further from the nucleus and held more weakly."
      ]
    ],
    "remember": "Across a period, the pull on outer electrons grows. Down a group, it weakens.",
    "a": {
      "q": "Which change occurs from left to right across a period?",
      "opts": [
        "First ionisation energy rises and atomic radius falls",
        "First ionisation energy falls and atomic radius rises",
        "Both first ionisation energy and atomic radius rise",
        "Both first ionisation energy and atomic radius fall"
      ],
      "why": "Across a period, outer electrons are pulled in more strongly, so the atom gets smaller and more energy is needed to remove an electron. First ionisation energy falling while atomic radius rises is the trend down a group, not across a period.",
      "clue": "Think about how strongly the nucleus pulls on the outer electrons."
    },
    "b": {
      "d": 3,
      "q": "Rubidium is below potassium in Group 1. Compared with potassium, rubidium atoms have which properties?",
      "opts": [
        "A larger radius and a lower first ionisation energy",
        "A larger radius and a higher first ionisation energy",
        "A smaller radius and a lower first ionisation energy",
        "A smaller radius and a higher first ionisation energy"
      ],
      "why": "Down a group, outer electrons are in a higher energy level, further from the nucleus. The atom is larger and the outer electron is easier to remove. A higher ionisation energy is the trend across a period, not down a group.",
      "clue": "Moving down a group, are the outer electrons closer to or further from the nucleus?"
    }
  },
  "chem-ionic-bonding": {
    "title": "Ionic bonding",
    "card": [
      "Metal atoms lose electrons and become positive ions. Non-metal atoms gain those electrons and become negative ions.",
      "Oppositely charged ions attract each other strongly. This attraction is the ionic bond.",
      "The ions pack into a regular 3D pattern called a lattice. Each ion is surrounded by ions of opposite charge.",
      "Ionic compounds have high melting points, because a lot of energy is needed to pull the ions apart. They conduct electricity when melted or dissolved, because the ions are then free to move."
    ],
    "remember": "Ionic compounds are ions in a lattice. They conduct only when the ions can move.",
    "a": {
      "q": "Sodium atoms react with chlorine atoms to form sodium chloride. What happens to the electrons?",
      "opts": [
        "Sodium loses electrons and chlorine gains them",
        "Sodium gains electrons and chlorine loses them",
        "Sodium and chlorine share pairs of electrons",
        "Electrons move freely between all the atoms"
      ],
      "why": "Sodium is a metal, so it loses electrons and becomes a positive ion. Chlorine is a non-metal, so it gains them and becomes a negative ion. Sharing pairs of electrons is not what happens here, because the electrons are transferred.",
      "clue": "Which atom is the metal, and what do metals do with electrons?"
    },
    "b": {
      "d": 3,
      "q": "Solid potassium bromide does not conduct electricity, but a solution of it in water does. Why?",
      "opts": [
        "The ions are fixed in the solid but free to move in solution",
        "The solid has no ions, but dissolving makes them",
        "Dissolving frees electrons from the potassium ions",
        "The solid has a lattice, but the solution does not have ions"
      ],
      "why": "The ions are already present in the solid, but they are held in fixed positions in the lattice. Dissolving frees them to move and carry charge. The idea that the solid has no ions is wrong, because the lattice is made of ions.",
      "clue": "Charge needs something to carry it. Are the ions free to move in the solid?"
    }
  },
  "chem-covalent-bonding": {
    "title": "Covalent bonding",
    "card": [
      "A covalent bond forms when two non-metal atoms share a pair of electrons. Each atom is attracted to the shared pair, so the atoms stay joined. Some atoms share more than one pair.",
      [
        "Molecular",
        "small groups of atoms joined by covalent bonds. The bonds inside each molecule are strong, but the molecules are only weakly attracted to each other. Little energy is needed to separate them, so melting points are low."
      ],
      [
        "Network",
        "a huge three-dimensional web of atoms, all joined by covalent bonds. Diamond is one. Melting means breaking many strong bonds, so network solids are very hard and have very high melting points."
      ],
      "Covalent substances have no ions, so they have no charged particles free to move in the way that ions do in a melted ionic compound."
    ],
    "remember": "Covalent bonds share electron pairs. Molecules separate easily, but a network must break bonds.",
    "a": {
      "q": "Which pair of atoms is most likely to join by a covalent bond?",
      "opts": [
        "Two non-metal atoms, such as carbon and oxygen",
        "A metal and a non-metal atom, such as sodium and chlorine",
        "Two atoms that each give away all their outer electrons",
        "An atom that loses electrons and an atom that gains them"
      ],
      "why": "A covalent bond forms when two non-metal atoms share a pair of electrons. The sodium and chlorine pairing is tempting, but it includes a metal, and covalent bonds form between non-metals.",
      "clue": "Look for the pair that shares electrons."
    },
    "b": {
      "d": 3,
      "q": "Wax is made of small covalent molecules and melts at a low temperature. Quartz is a covalent network solid and melts at a very high temperature. Why do they differ?",
      "opts": [
        "Wax melts by separating molecules, quartz by breaking bonds",
        "Wax has no covalent bonds, but quartz has many of them",
        "Quartz contains ions that wax does not have",
        "The covalent bonds in wax are weaker than those in quartz"
      ],
      "why": "Melting wax only separates molecules that are weakly attracted to each other. Melting quartz means breaking covalent bonds throughout the network. The idea that the covalent bonds in wax are weaker is tempting, but the bonds inside wax molecules are strong. They just do not need to break when wax melts.",
      "clue": "Ask what must be pulled apart when each one melts."
    }
  },
  "chem-metallic-bonding": {
    "title": "Metallic bonding",
    "card": [
      "A metal is a lattice of positive metal ions. Each atom has given up its outer electrons, and these electrons are free to move through the whole structure.",
      "The free electrons are called delocalised electrons. They form a sea around the ions. The attraction between the positive ions and this sea of electrons is the metallic bond.",
      "Metals conduct electricity because the delocalised electrons can move through the metal as a current when a voltage is applied.",
      "Metals can be bent and shaped because layers of ions can slide past each other. The sea of electrons moves with them and keeps holding the ions together, so the metal does not shatter."
    ],
    "remember": "Metal ions sit in a sea of moving electrons, which carry charge and let the layers slide.",
    "a": {
      "q": "Why can a copper wire carry an electric current?",
      "opts": [
        "Delocalised electrons can move through the lattice",
        "Positive ions move freely along the wire",
        "Electrons are shared in fixed pairs between atoms",
        "Copper atoms gain electrons to form negative ions"
      ],
      "why": "The delocalised electrons are free to move, so they carry charge through the metal. The ions stay in the lattice and do not flow along the wire. Electrons in fixed pairs would not be free to move.",
      "clue": "Which particles are free to move in a metal?"
    },
    "b": {
      "d": 3,
      "q": "Mia hits a thin sheet of aluminium with a hammer and it changes shape without breaking. Which statement best explains this?",
      "opts": [
        "Layers of ions slide while the electron sea holds them",
        "The layers of ions repel each other and push apart",
        "The delocalised electrons are removed by the hammer",
        "Each ion is bonded to just one neighbouring ion"
      ],
      "why": "When the layers of ions slide, the delocalised electrons move with them and keep attracting the ions, so the bond is not broken. Repulsion between layers would make the metal break apart, which is what the tempting option wrongly suggests.",
      "clue": "What keeps holding the ions together as the layers move?"
    }
  },
  "chem-shapes-polarity-molecules": {
    "title": "Shapes and polarity of molecules",
    "card": [
      "Pairs of electrons around a central atom repel each other, so they spread as far apart as they can. This sets the shape of the molecule.",
      "Two bonded atoms and no lone pairs on the centre give a linear shape, as in CO2. Four bonded atoms and no lone pairs give a tetrahedral shape, as in CH4.",
      "Lone pairs also repel, so they bend the shape. Two bonded atoms and two lone pairs on the centre give a bent shape, as in H2O.",
      "A bond is polar when atoms share electrons unevenly. A molecule is polar only if its polar bonds are arranged unevenly, so they do not cancel. CO2 has polar bonds but is non-polar. H2O is polar."
    ],
    "remember": "Electron pairs spread apart to set the shape. Polar bonds in an uneven shape make a polar molecule.",
    "a": {
      "q": "Why is a water molecule polar, while a carbon dioxide molecule is not?",
      "opts": [
        "Water is bent, so its polar bonds do not cancel",
        "Water has bonds, but carbon dioxide has none",
        "Water has more atoms than carbon dioxide has",
        "Carbon dioxide has bonds that share electrons evenly"
      ],
      "why": "Water is bent, so the pull of its two polar bonds does not cancel and one side of the molecule is more negative. It is tempting to say carbon dioxide's bonds share electrons evenly, but its bonds are polar. Its linear shape is what makes their pulls cancel.",
      "clue": "Think about the shape of each molecule and whether the pulls cancel."
    },
    "b": {
      "d": 3,
      "q": "A methane molecule, CH4, has four identical bonds around the carbon atom with no lone pairs. Which describes its shape and polarity?",
      "opts": [
        "Tetrahedral, and non-polar as the bond pulls cancel",
        "Tetrahedral, and polar as its bonds are polar",
        "Bent, and polar as the bond pulls do not cancel",
        "Linear, and non-polar as it has identical bonds"
      ],
      "why": "Four bonded atoms with no lone pairs spread out into a tetrahedral shape. This shape is even, so the pulls of the bonds cancel and the molecule is non-polar. Calling it polar is tempting, but a molecule with an even shape is not polar just because its bonds are.",
      "clue": "Check the shape first, then ask if the bond pulls cancel."
    }
  },
  "chem-intermolecular-forces": {
    "title": "Intermolecular forces",
    "card": [
      "Intermolecular forces attract separate molecules to each other. Boiling a molecular substance overcomes these forces, not the much stronger covalent bonds inside molecules, so stronger forces mean a higher boiling point.",
      [
        "Dispersion forces",
        "act between all molecules. They are stronger in larger molecules, which have more electrons."
      ],
      [
        "Dipole-dipole forces",
        "act between polar molecules. The slightly positive end of one molecule attracts the slightly negative end of another."
      ],
      [
        "Hydrogen bonds",
        "are a strong type of dipole-dipole force. They form when hydrogen bonded to nitrogen, oxygen or fluorine is attracted to one of these atoms in a nearby molecule."
      ]
    ],
    "remember": "All molecules have dispersion forces. Polar ones add dipole-dipole, and H on N, O or F adds hydrogen bonds.",
    "a": {
      "q": "Water boils at a much higher temperature than hydrogen sulfide (H2S), which is a larger molecule with more electrons. Which is the best explanation?",
      "opts": [
        "Water molecules form hydrogen bonds with each other",
        "Water has stronger covalent bonds inside its molecules",
        "Water molecules have far more electrons than H2S ones",
        "Water is the only one that has dispersion forces"
      ],
      "why": "In water, hydrogen is bonded to oxygen, so water molecules form hydrogen bonds, which are stronger than the forces between H2S molecules. H2S is larger, so dispersion forces alone would make it boil higher. Boiling does not break the covalent bonds inside molecules, so their strength does not explain it.",
      "clue": "Which forces are overcome when water boils, and what is hydrogen bonded to?"
    },
    "b": {
      "d": 3,
      "q": "Methane (CH4) has a lower boiling point than ethane (C2H6). Both are non-polar molecules. Which is the best reason?",
      "opts": [
        "Ethane has stronger dispersion forces, with more electrons",
        "Ethane has hydrogen bonds between its molecules",
        "Ethane has dipole-dipole forces because it is polar",
        "Ethane has stronger covalent bonds between its atoms"
      ],
      "why": "Both molecules are non-polar, and hydrogen is bonded only to carbon, so only dispersion forces act. Ethane is larger with more electrons, so its dispersion forces are stronger and it boils higher. Covalent bonds are not broken when a molecular substance boils.",
      "clue": "Both are non-polar, so which force is left, and what makes it stronger?"
    }
  },
  "chem-allotropes": {
    "title": "Allotropes",
    "card": [
      "Allotropes are different forms of the same element in the same state. Their atoms are joined in different arrangements, so their properties differ.",
      [
        "Diamond",
        "each carbon atom is bonded to four others in a rigid 3D network. It is very hard and does not conduct electricity, as it has no free electrons."
      ],
      [
        "Graphite",
        "each carbon atom is bonded to three others in flat layers. The layers can slide over each other, so graphite is soft. It conducts electricity, as each atom has one electron free to move along the layers."
      ],
      [
        "Fullerenes",
        "carbon atoms joined in hollow cages or tubes, such as the ball-shaped C60. These are separate molecules, not a giant network."
      ]
    ],
    "remember": "Same element, different arrangement of atoms, different properties.",
    "a": {
      "q": "Why are diamond and graphite called allotropes of carbon?",
      "opts": [
        "They are different structural forms of the same element",
        "They are different elements that both bond to carbon",
        "They have the same structure but different melting points",
        "They are compounds made of carbon and another element"
      ],
      "why": "Both are made only of carbon atoms, joined in different arrangements. Having different properties does not make them allotropes by itself: the same element in different structures is what matters.",
      "clue": "Think about what atoms each one is made of."
    },
    "b": {
      "d": 3,
      "q": "Graphite is used in pencils and conducts electricity, but diamond does not conduct. What best explains the difference?",
      "opts": [
        "Graphite has a free electron per atom, but diamond has none",
        "Graphite has ions that move, but diamond has none",
        "Graphite has four bonds per atom, but diamond has three",
        "Graphite is a different element from diamond"
      ],
      "why": "In graphite each carbon atom bonds to three others, leaving one electron free to move along the layers. In diamond all four outer electrons are held in bonds. The element is the same in both, so a different element cannot be the reason.",
      "clue": "Compare how many bonds each carbon atom makes in the two forms."
    }
  },
  "chem-balanced-equations": {
    "title": "Balanced equations",
    "card": [
      "In a chemical reaction, atoms are rearranged, not created or destroyed. So the total mass of the products equals the total mass of the reactants.",
      "A balanced equation shows this. It has the same number of each type of atom on both sides of the arrow.",
      "To balance an equation, change the coefficients, the big numbers in front of formulas. Never change the small subscripts inside a formula, because that would make a different substance.",
      "Example: 2H₂ + O₂ → 2H₂O has 4 H atoms and 2 O atoms on each side. H₂ + O₂ → H₂O is not balanced, because the left has 2 O atoms and the right has 1."
    ],
    "remember": "Atoms are not lost or gained, so balance by changing coefficients only.",
    "a": {
      "q": "Why must a chemical equation be balanced?",
      "opts": [
        "Atoms are not created or destroyed, so mass is conserved",
        "Each reactant must have the same mass as each product",
        "The number of molecules must be equal on both sides",
        "Subscripts in formulas must match on both sides"
      ],
      "why": "Atoms are only rearranged in a reaction, so each type of atom must appear in the same number on both sides. The number of molecules can change, as in 2H₂ + O₂ → 2H₂O, so equal molecule counts are not required.",
      "clue": "Think about what happens to atoms during a reaction."
    },
    "b": {
      "d": 3,
      "q": "Mia balances H₂ + O₂ → H₂O by changing the product to H₂O₂. What is wrong with her method?",
      "opts": [
        "Changing a subscript makes a different substance",
        "Subscripts should be changed on the reactant side only",
        "H₂O₂ has more atoms than the reactants",
        "Only coefficients on the left side may be changed"
      ],
      "why": "H₂O₂ is hydrogen peroxide, not water, so Mia has changed the reaction instead of balancing it. Balancing uses coefficients, which change the amount of a substance but not what it is.",
      "clue": "What does a subscript tell you about a formula?"
    }
  },
  "chem-mole-avogadro-s-number": {
    "title": "The mole and Avogadro's number",
    "card": [
      "Atoms and molecules are far too small to count one by one. Chemists use a counting unit called the mole (symbol mol).",
      "One mole is 6.022 × 10²³ particles. This number is called Avogadro's number. The particles can be atoms, molecules or ions.",
      "The number of particles = moles × 6.022 × 10²³. So 2 mol of any substance holds twice as many particles as 1 mol.",
      "A mole is a fixed number of particles, not a fixed mass. Because a mole of a substance has a mass that can be measured, chemists can count particles by weighing."
    ],
    "remember": "One mole is always 6.022 × 10²³ particles, whatever the particles are.",
    "a": {
      "q": "Which statement about 1 mol of oxygen molecules and 1 mol of carbon atoms is correct?",
      "opts": [
        "They contain the same number of particles",
        "They have the same mass",
        "The oxygen has more particles",
        "The carbon has more particles"
      ],
      "why": "One mole of any particles is 6.022 × 10²³ of them, so both amounts contain the same number of particles. Mass is not what a mole fixes, so the same mass is a tempting but wrong choice.",
      "clue": "A mole is a number of particles, not a mass."
    },
    "b": {
      "d": 2,
      "q": "A sample of copper contains 3.0 mol of copper atoms. Which expression gives the number of atoms in the sample?",
      "opts": ["3.0 × 6.022 × 10²³", "3.0 ÷ 6.022 × 10²³", "6.022 × 10²³ ÷ 3.0", "3.0 + 6.022 × 10²³"],
      "why": "Number of particles = moles × 6.022 × 10²³, so the answer is 3.0 × 6.022 × 10²³, about 1.8 × 10²⁴ atoms. Dividing would give fewer than one mole's worth of particles, but 3.0 mol must hold more than 1 mol.",
      "clue": "More moles means more particles, so multiply."
    }
  },
  "chem-molar-mass-moles": {
    "title": "Molar mass and moles",
    "card": [
      "Molar mass (M) is the mass of one mole of a substance. Its unit is g/mol.",
      "For atoms of an element, the molar mass in g/mol has the same number as the relative atomic mass on the periodic table. Carbon atoms are about 12.01 g/mol.",
      "For a molecule or compound, add the molar masses of every atom in its formula. So oxygen gas, O2, is 2 × 16.00 = 32.00 g/mol, and water, H2O, is 2 × 1.008 + 16.00 = 18.02 g/mol.",
      "Moles, mass and molar mass are linked by n = m/M. Here n is moles (mol) and m is mass in grams (g). Rearranged, m = n × M."
    ],
    "remember": "Divide the mass in grams by the molar mass to get moles.",
    "a": {
      "q": "A sample of water, H2O, has a mass of 36.04 g. The molar mass of water is 18.02 g/mol. How many moles of water are in the sample?",
      "opts": ["2.000 mol", "0.5000 mol", "18.02 mol", "649.4 mol"],
      "why": "n = m/M = 36.04 ÷ 18.02 = 2.000 mol. Dividing the other way, 18.02 ÷ 36.04, gives 0.5000 mol, which turns the formula upside down.",
      "clue": "Mass goes on top and molar mass goes on the bottom."
    },
    "b": {
      "d": 3,
      "q": "Priya has 0.250 mol of sodium chloride, NaCl. Na is 22.99 g/mol and Cl is 35.45 g/mol. What mass of NaCl does she have?",
      "opts": ["14.6 g", "234 g", "0.00428 g", "58.4 g"],
      "why": "M of NaCl = 22.99 + 35.45 = 58.44 g/mol. m = n × M = 0.250 × 58.44 = 14.6 g. Dividing 0.250 by 58.44 would give 0.00428, which is the wrong way round for finding mass.",
      "clue": "Find the molar mass first, then multiply by the moles."
    }
  },
  "chem-limiting-reagents": {
    "title": "Limiting reagents",
    "card": [
      [
        "Limiting reagent",
        "the reactant that runs out first. The reaction stops when it is gone, so it sets how much product can form."
      ],
      ["Excess reagent", "a reactant that is left over when the reaction stops."],
      "Reactants combine in the ratio in the balanced equation. To find the limiting reagent, change each amount to moles and compare. In 2H2 + O2 → 2H2O, 2 mol of H2 needs 1 mol of O2, so if there is less O2 than that, O2 is limiting.",
      "Then use the moles of the limiting reagent and the equation's ratio to find the product. Here 1 mol of O2 makes 2 mol of H2O, so 0.5 mol of O2 makes 1 mol of H2O."
    ],
    "remember": "Find which reactant runs out first, then use its moles and the ratio to find the product.",
    "a": {
      "q": "In a reaction, one reactant is used up and the reaction stops. Some of the other reactant is left over. What does the leftover reactant show?",
      "opts": [
        "It is in excess, and the used up reactant was limiting",
        "It is limiting, and the used up reactant was in excess",
        "Both reactants were present in the exact ratio",
        "The reaction did not follow the balanced equation"
      ],
      "why": "The reaction stops when one reactant runs out, so that one is limiting. The reactant left over is in excess. It is not limiting, because it did not stop the reaction.",
      "clue": "Which reactant ran out and stopped the reaction?"
    },
    "b": {
      "d": 3,
      "q": "Hydrogen reacts with oxygen: 2H2 + O2 → 2H2O. A flask holds 4 mol of H2 and 1 mol of O2. Which statement is correct?",
      "opts": [
        "O2 is limiting, and 2 mol of H2O can form",
        "H2 is limiting, and 4 mol of H2O can form",
        "O2 is limiting, and 1 mol of H2O can form",
        "H2 is in excess, and 4 mol of H2O can form"
      ],
      "why": "1 mol of O2 needs only 2 mol of H2, and there is 4 mol, so O2 runs out first and is limiting. The product comes from the limiting reagent: O2 to H2O is 1 to 2, so 2 mol of H2O forms. Using the 4 mol of H2 to get 4 mol of H2O is wrong, because H2 is in excess and not all of it reacts.",
      "clue": "Work out the product from the reactant that runs out first."
    }
  },
  "chem-empirical-formulas-percentage-composition": {
    "title": "Empirical formulas and percentage composition",
    "card": [
      [
        "Empirical formula",
        "the simplest whole-number ratio of atoms of each element in a compound. For example, CH₂O is the empirical formula of a compound whose formula could be C₂H₄O₂."
      ],
      [
        "Finding it",
        "Divide each element's mass by its molar mass to get moles. Divide every answer by the smallest one. If the results are not whole numbers, multiply them all by the same small number until they are."
      ],
      [
        "Percentage composition",
        "the mass of an element in a compound as a percentage of the compound's total mass. % of element = mass of element ÷ mass of compound × 100."
      ],
      "Percentages can be used as if they were masses out of 100 g. This lets you find an empirical formula from percentage data."
    ],
    "remember": "Masses become moles, moles become the simplest ratio, and that ratio is the empirical formula.",
    "a": {
      "q": "A compound contains only carbon and hydrogen: 1.2 g of carbon and 0.2 g of hydrogen. What is its empirical formula? (C = 12, H = 1.0 g/mol)",
      "opts": ["CH₂", "CH", "C₂H", "C₆H"],
      "why": "Carbon is 1.2 ÷ 12 = 0.10 mol and hydrogen is 0.2 ÷ 1.0 = 0.20 mol. The ratio is 1 : 2, so the formula is CH₂. C₆H comes from comparing the masses 1.2 : 0.2 directly instead of the moles.",
      "clue": "Change each mass to moles before comparing."
    },
    "b": {
      "d": 3,
      "q": "A sample of an oxide of nitrogen is 63.7% nitrogen and 36.3% oxygen by mass. What is its empirical formula? (N = 14.0, O = 16.0 g/mol)",
      "opts": ["N₂O", "NO", "NO₂", "N₂O₃"],
      "why": "In 100 g there are 63.7 ÷ 14.0 = 4.55 mol of N and 36.3 ÷ 16.0 = 2.27 mol of O. Dividing by 2.27 gives a ratio of 2 : 1, so the formula is N₂O. NO₂ uses the right numbers but reverses the ratio, giving the 2 to oxygen instead of nitrogen.",
      "clue": "Treat the percentages as grams in a 100 g sample."
    }
  },
  "chem-concentration": {
    "title": "Concentration",
    "card": [
      "Concentration is the amount of solute in a given quantity of solution, measured by volume or by mass. The solute is the substance that dissolves, and the solution is the solute and solvent mixed together.",
      [
        "Molar concentration",
        "c = n ÷ V, where c is in mol/L, n is the moles of solute and V is the volume of solution in litres. Change mL to L by dividing by 1000."
      ],
      [
        "Mass concentration",
        "mass of solute ÷ volume of solution, usually in g/L. To change g/L to mol/L, divide by the molar mass of the solute."
      ],
      [
        "Parts per million",
        "ppm means mg of solute per kg of solution. For dilute water solutions, 1 ppm is about 1 mg/L."
      ]
    ],
    "remember": "Match the unit to the measure: mol/L uses moles, g/L uses grams and ppm uses mg per kg.",
    "a": {
      "q": "Liam dissolves 0.50 mol of sodium chloride in water to make 250 mL of solution. What is the concentration?",
      "opts": ["2.0 mol/L", "0.0020 mol/L", "0.125 mol/L", "0.50 mol/L"],
      "why": "250 mL is 0.250 L, so c = 0.50 ÷ 0.250 = 2.0 mol/L. Dividing by 250 instead gives 0.0020 mol/L, which comes from forgetting to change mL to L.",
      "clue": "Convert the volume to litres before you divide."
    },
    "b": {
      "d": 3,
      "q": "A sample of sodium hydroxide solution has a concentration of 4.0 g/L. The molar mass of NaOH is 40 g/mol. What is its concentration in mol/L?",
      "opts": ["0.10 mol/L", "10 mol/L", "160 mol/L", "4.0 mol/L"],
      "why": "Divide the mass concentration by the molar mass: 4.0 g/L ÷ 40 g/mol = 0.10 mol/L. Multiplying by the molar mass gives 160, but then the units do not work out to mol/L.",
      "clue": "Grams per litre become moles per litre when you divide by the molar mass."
    }
  },
  "chem-dilution": {
    "title": "Dilution",
    "card": [
      "Diluting a solution means adding solvent, usually water. The solution gets a larger volume and a lower concentration.",
      "The amount of solute does not change, because only water is added. The moles of solute before dilution equal the moles after.",
      "Since n = cV, the moles before are c₁V₁ and the moles after are c₂V₂. So c₁V₁ = c₂V₂.",
      "Use the same units for volume on both sides, such as mL or L. The final volume V₂ is the total volume, not the volume of water added."
    ],
    "remember": "Water changes the volume and concentration, but not the moles of solute.",
    "a": {
      "q": "A student adds water to a sodium chloride solution. What stays the same?",
      "opts": [
        "The moles of sodium chloride",
        "The concentration of the solution",
        "The total volume of the solution",
        "The mass of the whole solution"
      ],
      "why": "Only water is added, so the amount of solute is unchanged. Concentration falls because the same moles are now in a larger volume.",
      "clue": "Think about what is added and what is not."
    },
    "b": {
      "d": 3,
      "q": "Priya has 50 mL of 2.0 mol/L hydrochloric acid. She adds water to make a final volume of 250 mL. What is the new concentration?",
      "opts": ["0.40 mol/L", "0.50 mol/L", "2.5 mol/L", "10 mol/L"],
      "why": "c₂ = c₁V₁ ÷ V₂ = (2.0 × 50) ÷ 250 = 0.40 mol/L. The tempting 0.50 mol/L comes from using 200 mL, the water added, as V₂, but V₂ is the final total volume.",
      "clue": "V₂ is the total volume at the end, not the water added."
    }
  },
  "chem-gas-laws": {
    "title": "Gas laws",
    "card": [
      [
        "Boyle's law",
        "At constant temperature, the pressure of a fixed amount of gas is inversely proportional to its volume. P₁V₁ = P₂V₂."
      ],
      [
        "Charles's law",
        "At constant pressure, the volume of a fixed amount of gas is directly proportional to its temperature in kelvin. V₁/T₁ = V₂/T₂."
      ],
      [
        "Gay-Lussac's law",
        "At constant volume, the pressure of a fixed amount of gas is directly proportional to its temperature in kelvin. P₁/T₁ = P₂/T₂."
      ],
      "Always convert temperature to kelvin first: K = °C + 273.15. Celsius cannot be used, because 0°C is not absolute zero."
    ],
    "remember": "Each law keeps the amount of gas and one other quantity constant. Temperature must be in kelvin.",
    "a": {
      "q": "A sealed syringe of air is pushed in at constant temperature, halving its volume. What happens to the gas pressure?",
      "opts": ["It doubles", "It halves", "It stays the same", "It quadruples"],
      "why": "At constant temperature, pressure and volume are inversely proportional (Boyle's law). Halving the volume doubles the pressure. Pressure does not halve, because that would be a direct relationship.",
      "clue": "Pressure and volume move in opposite directions."
    },
    "b": {
      "d": 3,
      "q": "A rigid sealed can of gas at 27°C is heated to 127°C. The gas pressure was 100 kPa at 27°C. What is it at 127°C?",
      "opts": ["About 133 kPa", "About 470 kPa", "About 100 kPa", "About 75 kPa"],
      "why": "The volume is constant, so use P₁/T₁ = P₂/T₂ with kelvin: about 300 K and 400 K. P₂ = 100 × 400 ÷ 300 ≈ 133 kPa. Using 27 and 127 directly gives about 470 kPa, which is wrong because Celsius cannot be used.",
      "clue": "Convert both temperatures to kelvin before you divide."
    }
  },
  "chem-ideal-gas-law": {
    "title": "The ideal gas law",
    "card": [
      "The ideal gas law is PV = nRT. It links the pressure, volume, amount and temperature of a gas in one equation.",
      "P is pressure, V is volume, n is moles and T is temperature in kelvin. R is the gas constant, 8.314 J K⁻¹ mol⁻¹, when P is in kilopascals (kPa) and V is in litres (L).",
      "To find one quantity, rearrange the equation. For example, n = PV ÷ RT. Convert °C to K by adding 273.15 before you calculate.",
      "An ideal gas is a model in which the particles take up no space and do not attract each other. Real gases follow it closely at low pressure and high temperature."
    ],
    "remember": "PV = nRT: keep T in kelvin, and use R with kPa and litres.",
    "a": {
      "q": "A 3.00 L container holds a gas at 200 kPa and 27°C. How many moles of gas are in it? (R = 8.314)",
      "opts": ["0.240 mol", "2.67 mol", "4.16 mol", "240 mol"],
      "why": "n = PV ÷ RT = (200 × 3.00) ÷ (8.314 × 300.15) = 0.240 mol. The answer 2.67 mol comes from using 27 instead of 300.15, but T must be in kelvin.",
      "clue": "Rearrange for n, and convert the temperature first."
    },
    "b": {
      "d": 3,
      "q": "A sealed flask holds 0.100 mol of gas at 25°C and a volume of 2.00 L. Which expression gives its pressure in kPa? (R = 8.314)",
      "opts": [
        "P = 0.100 × 8.314 × 298.15 ÷ 2.00",
        "P = 0.100 × 8.314 × 25 ÷ 2.00",
        "P = 2.00 × 8.314 × 298.15 ÷ 0.100",
        "P = 0.100 × 298.15 ÷ (8.314 × 2.00)"
      ],
      "why": "Rearranging gives P = nRT ÷ V, with T converted to 298.15 K. Using 25 directly is wrong because temperature must be in kelvin.",
      "clue": "Rearrange for P, then check the temperature unit."
    }
  },
  "chem-molar-volume-gases": {
    "title": "Molar volume of gases",
    "card": [
      "Equal amounts of any gas take up the same volume when the temperature and pressure are the same. So one mole of hydrogen and one mole of carbon dioxide fill the same space.",
      "This volume is called the molar volume. At 25°C and 100 kPa it is 24.79 L/mol. At 0°C and 100 kPa it is 22.71 L/mol.",
      "To find the volume of a gas, use V = n × 24.79. To find the moles, use n = V ÷ 24.79. Use these only when the gas is at 25°C and 100 kPa.",
      "The molar volume does not depend on the type of gas or the size of its particles. It changes only if the temperature or pressure changes."
    ],
    "remember": "At the same temperature and pressure, one mole of any gas has the same volume.",
    "a": {
      "q": "At 25°C and 100 kPa, which sample has the same volume as 1.0 mol of oxygen gas?",
      "opts": ["1.0 mol of helium gas", "32 g of helium gas", "1.0 g of hydrogen gas", "1.0 L of any liquid"],
      "why": "At the same temperature and pressure, equal moles of any gas have equal volume, so 1.0 mol of helium matches. The 32 g of helium is about 8 mol, so it fills a much larger volume. Matching mass does not mean matching moles.",
      "clue": "Compare the number of moles, not the mass."
    },
    "b": {
      "d": 3,
      "q": "Mia collects carbon dioxide from a reaction in her school lab at 25°C and 100 kPa. The gas has a mass of 4.40 g (M = 44.0 g/mol). What volume does it occupy?",
      "opts": ["2.48 L", "0.248 L", "24.8 L", "248 L"],
      "why": "The moles are 4.40 ÷ 44.0 = 0.100 mol. The volume is 0.100 × 24.79 = 2.48 L. The answer of 24.8 L is tempting, but it is the volume of a full mole, not 0.100 mol.",
      "clue": "Find the moles from the mass first, then use the molar volume."
    }
  },
  "chem-synthesis-decomposition-combustion": {
    "title": "Synthesis, decomposition and combustion",
    "card": [
      ["Synthesis", "two or more substances join to form one product. For example, hydrogen and oxygen form water."],
      [
        "Decomposition",
        "one substance breaks apart into two or more simpler substances. For example, calcium carbonate breaks into calcium oxide and carbon dioxide when heated."
      ],
      [
        "Combustion",
        "a fuel burns in oxygen and releases energy as heat and light. Complete combustion of a hydrocarbon gives carbon dioxide and water."
      ],
      "Synthesis and decomposition are opposites. Many reactions can be sorted by counting how many reactants and products there are."
    ],
    "remember": "Synthesis builds one product from many. Decomposition splits one reactant into many. Combustion burns a fuel in oxygen.",
    "a": {
      "q": "Which equation shows a decomposition reaction?",
      "opts": ["2H2O2 → 2H2O + O2", "2Mg + O2 → 2MgO", "N2 + 3H2 → 2NH3", "CH4 + 2O2 → CO2 + 2H2O"],
      "why": "One reactant, hydrogen peroxide, breaks into two simpler products. The magnesium and ammonia equations join substances, so they are synthesis. The methane equation has two reactants and is combustion.",
      "clue": "Look for one reactant on the left."
    },
    "b": {
      "d": 3,
      "q": "Propane (C3H8) burns in a plentiful supply of oxygen in a camping stove. Which products form?",
      "opts": ["Carbon dioxide and water", "Carbon and hydrogen", "Carbon monoxide and hydrogen", "Propane oxide only"],
      "why": "Complete combustion of a hydrocarbon in plenty of oxygen gives carbon dioxide and water. Carbon and hydrogen would mean the fuel simply broke apart, which is not burning in oxygen.",
      "clue": "Complete combustion of a hydrocarbon has two familiar products."
    }
  },
  "chem-precipitation-reactions": {
    "title": "Precipitation reactions",
    "card": [
      "A precipitation reaction happens when two solutions are mixed and the ions combine to form an insoluble solid. The solid is called the precipitate.",
      "In the mixture, the ions swap partners. A new combination of cation and anion forms. If that compound is insoluble, it comes out of solution as a solid.",
      "Solubility rules tell you which ionic compounds dissolve in water. For example, nitrates and sodium salts are soluble, while silver chloride and lead(II) iodide are insoluble.",
      "Ions that stay dissolved are spectator ions. The net ionic equation leaves them out: Ag+(aq) + Cl-(aq) → AgCl(s)."
    ],
    "remember": "Swap the partners, then check the solubility rules: an insoluble product is the precipitate.",
    "a": {
      "q": "Solutions of silver nitrate and sodium chloride are mixed and a white solid forms. What is the white solid?",
      "opts": ["Silver chloride", "Sodium nitrate", "Silver nitrate", "Sodium chloride"],
      "why": "The ions swap partners to give silver chloride and sodium nitrate. Silver chloride is insoluble, so it forms the solid. Sodium nitrate is soluble, because all nitrates are, so it stays dissolved.",
      "clue": "Swap the partners, then ask which new compound is insoluble."
    },
    "b": {
      "d": 3,
      "q": "Mia mixes solutions of lead(II) nitrate and potassium iodide. Which ions are the spectator ions?",
      "opts": [
        "Potassium and nitrate ions",
        "Lead(II) and iodide ions",
        "Lead(II) and nitrate ions",
        "Potassium and iodide ions"
      ],
      "why": "Lead(II) iodide is insoluble, so lead(II) and iodide ions join to form the precipitate. Potassium and nitrate ions stay dissolved and do not change, so they are spectators. Lead(II) and nitrate ions are not a pair: they come from the same starting solution, but only lead(II) goes on to form the solid.",
      "clue": "Spectator ions are the ones that are not in the solid."
    }
  },
  "chem-reactions-acids": {
    "title": "Reactions of acids",
    "card": [
      [
        "Acid and metal",
        "an acid reacts with a reactive metal to give a salt and hydrogen gas. Example: magnesium + hydrochloric acid → magnesium chloride + hydrogen."
      ],
      [
        "Acid and carbonate",
        "an acid reacts with a carbonate to give a salt, water and carbon dioxide. Example: calcium carbonate + hydrochloric acid → calcium chloride + water + carbon dioxide."
      ],
      [
        "Acid and base",
        "an acid reacts with a base to give a salt and water. Example: sodium hydroxide + hydrochloric acid → sodium chloride + water."
      ],
      "The salt's name has two parts. The first is the positive ion from the metal, carbonate or base. The second comes from the acid: chloride from hydrochloric acid, sulfate from sulfuric acid, nitrate from nitric acid."
    ],
    "remember": "Every acid reaction here makes a salt. The other products depend on whether the acid meets a metal, a carbonate or a base.",
    "a": {
      "q": "Which products form when an acid reacts with a carbonate?",
      "opts": ["A salt, water and carbon dioxide", "A salt and hydrogen", "A salt and water only", "A salt, water and oxygen"],
      "why": "A carbonate contains carbon and oxygen, so the reaction gives off carbon dioxide along with a salt and water. A salt and water only is the result for a base, which has no carbonate to release gas.",
      "clue": "A carbonate reaction fizzes with a gas."
    },
    "b": {
      "d": 2,
      "q": "Zinc metal is added to dilute sulfuric acid. Which pair of products forms?",
      "opts": [
        "Zinc sulfate and hydrogen",
        "Zinc sulfate and water",
        "Zinc sulfide and hydrogen",
        "Zinc sulfate and carbon dioxide"
      ],
      "why": "A metal and an acid give a salt and hydrogen gas. The salt takes zinc from the metal and sulfate from sulfuric acid, so it is zinc sulfate. Water is the product with a base, not a metal.",
      "clue": "Name the salt from the metal and the acid, then pick the gas."
    }
  },
  "chem-rates-reaction": {
    "title": "Rates of reaction",
    "card": [
      "The rate of a reaction is how fast reactants are used up or products are made. Collision theory says a reaction needs particles to collide, and only some collisions are successful.",
      "A higher temperature makes particles move faster. They collide more often and more of the collisions are successful, so the rate rises.",
      "A higher concentration puts more particles in the same volume, so collisions happen more often. A larger surface area of a solid exposes more particles to collide, so crushing a solid into powder speeds up the reaction.",
      "A catalyst also speeds up a reaction. It is not used up, so it is left unchanged at the end."
    ],
    "remember": "Anything that makes successful collisions more frequent speeds up a reaction.",
    "a": {
      "q": "Why does a more concentrated acid react faster with magnesium ribbon?",
      "opts": [
        "More acid particles per volume mean more frequent collisions",
        "Each acid particle moves much faster than before",
        "The magnesium ribbon has a larger surface area",
        "The acid is no longer used up in the reaction"
      ],
      "why": "A higher concentration means more particles in each unit of volume, so collisions with the metal happen more often. The option saying each acid particle moves faster is wrong, because particle speed is linked to temperature, not concentration.",
      "clue": "Think about how many particles fit in the same volume."
    },
    "b": {
      "d": 2,
      "q": "Sam adds the same mass of calcium carbonate to the same acid at the same temperature. One test uses a single lump and one uses fine powder. Why is the powder faster?",
      "opts": [
        "More surface is exposed, so more collisions with acid happen",
        "The powder particles move faster than the lump particles",
        "The powder lowers the temperature of the acid",
        "The powder acts as a catalyst and is not used up"
      ],
      "why": "Powder exposes far more of the solid to the acid, so collisions are more frequent. The temperature is the same in both tests, so particle speed is not the cause. The powder is a reactant and is used up, so it is not a catalyst.",
      "clue": "Only the amount of exposed solid has changed."
    }
  },
  "chem-activation-energy-catalysts": {
    "title": "Activation energy and catalysts",
    "card": [
      "Particles must collide to react, but most collisions do not lead to a reaction. A collision only works if the particles hit with enough energy.",
      [
        "Activation energy",
        "the minimum energy particles need in a collision to react. A reaction with a high activation energy is slow at a given temperature, because fewer collisions have enough energy."
      ],
      [
        "Catalyst",
        "a substance that speeds up a reaction by giving it a different path with a lower activation energy. More collisions then have enough energy to react."
      ],
      "A catalyst is not used up in the reaction. It can be recovered at the end, and it does not change the products that form."
    ],
    "remember": "A catalyst lowers the activation energy, so more collisions succeed, and it is not used up.",
    "a": {
      "q": "How does a catalyst make a reaction faster?",
      "opts": [
        "It gives a path with a lower activation energy",
        "It gives the particles more energy as they collide",
        "It is used up to supply extra energy to the reaction",
        "It changes the products so the reaction finishes sooner"
      ],
      "why": "A catalyst offers a different path that needs less energy, so more collisions are successful. It does not supply energy, and it is not used up, which is why the option about supplying extra energy is wrong.",
      "clue": "Think about what the catalyst changes about the energy needed."
    },
    "b": {
      "d": 3,
      "q": "Sam adds a catalyst to a reaction in a flask. The reaction speeds up. After it finishes, what will Sam find?",
      "opts": [
        "The catalyst is still there, with the same products formed",
        "The catalyst is gone, with the same products formed",
        "The catalyst is still there, with different products formed",
        "The catalyst is gone, and less product is formed"
      ],
      "why": "A catalyst is not used up, so it can be recovered at the end. It lowers the activation energy but does not change which products form. The tempting idea that it is consumed confuses a catalyst with a reactant.",
      "clue": "Is a catalyst a reactant that gets used up?"
    }
  },
  "chem-activity-series-metals": {
    "title": "The activity series of metals",
    "card": [
      "The activity series ranks metals by how easily they lose electrons to form positive ions. The metal at the top loses electrons most easily, so it is the most reactive.",
      "A more reactive metal displaces a less reactive metal from a solution of its ions. The more reactive metal goes into solution as ions and the less reactive metal forms as a solid.",
      "Example: zinc placed in copper(II) sulfate solution becomes coated in copper, because zinc is more reactive than copper. Copper placed in zinc sulfate solution shows no change.",
      "Common metals in order from most to least reactive include potassium, sodium, calcium, magnesium, aluminium, zinc, iron, lead, copper, silver and gold."
    ],
    "remember": "The more easily a metal loses electrons, the higher it sits, and it displaces metals below it.",
    "a": {
      "q": "Which kind of metal sits highest in the activity series?",
      "opts": [
        "The one that loses electrons most easily",
        "The one that gains electrons most easily",
        "The one with the highest density",
        "The one that is hardest to cut"
      ],
      "why": "The series ranks metals by how easily they lose electrons, so the top metal loses them most easily. Metals form positive ions by losing electrons, not gaining them. Density and hardness are physical properties and do not set the order.",
      "clue": "Think about what the series ranks metals by."
    },
    "b": {
      "d": 2,
      "q": "Mia puts a strip of magnesium into iron(II) sulfate solution and a strip of copper into a separate beaker of iron(II) sulfate solution. What does she see?",
      "opts": [
        "Iron forms on the magnesium only",
        "Iron forms on the copper only",
        "Iron forms on both strips",
        "Iron forms on neither strip"
      ],
      "why": "Magnesium is more reactive than iron, so it displaces iron from solution and iron forms as a solid. Copper is less reactive than iron, so it cannot displace iron and nothing happens.",
      "clue": "Only a metal above iron in the series can displace iron."
    }
  },
  "chem-oxidation-reduction": {
    "title": "Oxidation and reduction",
    "card": [
      [
        "Oxidation",
        "the loss of electrons by an atom, ion or molecule. For example, Zn becomes Zn²⁺ and loses 2 electrons."
      ],
      [
        "Reduction",
        "the gain of electrons by an atom, ion or molecule. For example, Cu²⁺ becomes Cu and gains 2 electrons."
      ],
      "Electrons do not stay free in a reaction. If one species loses electrons, another species gains them, so oxidation and reduction always happen together.",
      "A reaction with both is a redox reaction. In Zn + Cu²⁺ → Zn²⁺ + Cu, zinc is oxidised and copper(II) ions are reduced."
    ],
    "remember": "Oxidation is loss of electrons, reduction is gain, and one cannot happen without the other.",
    "a": {
      "q": "In the reaction Mg + Fe²⁺ → Mg²⁺ + Fe, what happens to the magnesium?",
      "opts": [
        "It is oxidised because it loses electrons",
        "It is reduced because it loses electrons",
        "It is oxidised because it gains electrons",
        "It is reduced because it gains electrons"
      ],
      "why": "Mg becomes Mg²⁺, so each atom loses 2 electrons. Losing electrons is oxidation. Reduction is the opposite process, and here it happens to the iron ions.",
      "clue": "Compare the charge on magnesium before and after."
    },
    "b": {
      "d": 3,
      "q": "Mia places a copper wire in silver nitrate solution and silver metal forms on it: Cu + 2Ag⁺ → Cu²⁺ + 2Ag. Which statement is correct?",
      "opts": [
        "Silver ions gain electrons while copper loses electrons",
        "Silver ions lose electrons while copper gains electrons",
        "Silver ions are oxidised and copper is reduced",
        "Copper is reduced and no species is oxidised"
      ],
      "why": "Ag⁺ becomes Ag, so silver ions gain electrons and are reduced. The electrons come from copper, which becomes Cu²⁺ and is oxidised. Reduction cannot occur alone, so some species must be oxidised.",
      "clue": "Check which species changes to a lower charge, and where its electrons came from."
    }
  },
  "chem-oxidation-numbers": {
    "title": "Oxidation numbers",
    "card": [
      "An oxidation number is the charge an atom would have if all its bonding electrons went to the more electronegative atom. It is a bookkeeping tool that tracks electrons.",
      "An atom in an element is 0. A simple ion has its own charge. Oxygen is usually -2 and hydrogen is usually +1. The numbers in a neutral compound add to 0, and in an ion they add to its charge.",
      "Use known numbers to find the unknown one. In SO2, two oxygens at -2 give -4, so sulfur is +4, and in copper(II) sulfate the (II) shows copper is +2.",
      "If an atom's oxidation number rises in a reaction, it is oxidised. If it falls, it is reduced."
    ],
    "remember": "Work out each oxidation number from the rules. A rise means oxidised and a fall means reduced.",
    "a": {
      "q": "What is the oxidation number of manganese in the permanganate ion, MnO4⁻?",
      "opts": ["+7", "+3", "+1", "-1"],
      "why": "Four oxygen atoms at -2 give -8. The total must equal the ion's charge of -1, so Mn is +7. The answer -1 is the charge of the whole ion, not of manganese alone.",
      "clue": "The numbers must add up to the charge on the ion."
    },
    "b": {
      "d": 3,
      "q": "Zinc reacts with copper(II) sulfate: Zn + CuSO4 → ZnSO4 + Cu. Which statement is correct?",
      "opts": [
        "Zn goes from 0 to +2 and is oxidised",
        "Zn goes from 0 to +2 and is reduced",
        "Cu goes from +2 to 0 and is oxidised",
        "Cu goes from 0 to +2 and is reduced"
      ],
      "why": "Zinc's number rises from 0 to +2, so zinc is oxidised. Copper falls from +2 to 0, so it is reduced. The statement 'Zn goes from 0 to +2 and is reduced' has the right numbers but the wrong label, because a rise means oxidised.",
      "clue": "Find each metal's number before and after, then see whether it rose or fell."
    }
  },
  "chem-half-equations": {
    "title": "Half-equations",
    "card": [
      "A half-equation shows just one half of a redox reaction. One half shows oxidation and the other shows reduction. Electrons (e⁻) are written in each one.",
      ["Oxidation", "electrons are lost, so they appear on the right. Example: Zn → Zn²⁺ + 2e⁻."],
      ["Reduction", "electrons are gained, so they appear on the left. Example: Cu²⁺ + 2e⁻ → Cu."],
      "Balance each half-equation for atoms and for charge. The total charge on the left must equal the total charge on the right. Adding the two halves, with the electrons cancelling, gives the overall equation: Zn + Cu²⁺ → Zn²⁺ + Cu."
    ],
    "remember": "Balance atoms and charge in each half. Electrons are on the right for oxidation and on the left for reduction.",
    "a": {
      "q": "Which half-equation is correctly balanced and shows oxidation?",
      "opts": ["Mg → Mg²⁺ + 2e⁻", "Mg²⁺ + 2e⁻ → Mg", "Mg → Mg²⁺ + e⁻", "Mg + 2e⁻ → Mg²⁺"],
      "why": "Magnesium loses two electrons, so they appear on the right, and the charge is 0 on both sides. Mg²⁺ + 2e⁻ → Mg is balanced, but it shows reduction because the electrons are gained.",
      "clue": "Oxidation means electrons are lost, so check which side they are on and whether the charges match."
    },
    "b": {
      "d": 3,
      "q": "Silver ions react with copper metal: Cu + 2Ag⁺ → Cu²⁺ + 2Ag. Which pair of half-equations is correct?",
      "opts": [
        "Cu → Cu²⁺ + 2e⁻ and Ag⁺ + e⁻ → Ag",
        "Cu²⁺ + 2e⁻ → Cu and Ag → Ag⁺ + e⁻",
        "Cu → Cu²⁺ + e⁻ and Ag⁺ + 2e⁻ → Ag",
        "Cu + 2e⁻ → Cu²⁺ and Ag⁺ → Ag + e⁻"
      ],
      "why": "Copper goes from charge 0 to 2+, so it loses two electrons in Cu → Cu²⁺ + 2e⁻, and each Ag⁺ gains one electron in Ag⁺ + e⁻ → Ag. The pair Cu²⁺ + 2e⁻ → Cu and Ag → Ag⁺ + e⁻ is balanced but runs the reaction backwards. The pair Cu → Cu²⁺ + e⁻ and Ag⁺ + 2e⁻ → Ag has the wrong electron counts, so its charges do not balance.",
      "clue": "Check how the charge changes for each species, then count the electrons needed to balance it."
    }
  },
  "chem-galvanic-cells": {
    "title": "Galvanic cells",
    "card": [
      "A galvanic cell splits a redox reaction into two half-cells. Electrons move through an external wire, so the reaction produces an electric current.",
      [
        "Anode",
        "the electrode where oxidation happens. It is the negative terminal. Electrons leave the cell from here."
      ],
      [
        "Cathode",
        "the electrode where reduction happens. It is the positive terminal. Electrons arrive here from the wire."
      ],
      "A salt bridge joins the two solutions, and ions move through it to balance charge. Cell voltage = E° of the cathode minus E° of the anode, and the half-cell with the higher E° is the cathode."
    ],
    "remember": "Oxidation at the anode, reduction at the cathode. Electrons flow through the wire, ions through the salt bridge.",
    "a": {
      "q": "In a working galvanic cell, which direction do electrons move in the external wire?",
      "opts": [
        "From the anode to the cathode",
        "From the cathode to the anode",
        "From the salt bridge to the anode",
        "From the cathode to the salt bridge"
      ],
      "why": "Oxidation at the anode releases electrons, and they travel through the wire to the cathode, where reduction uses them. Electrons do not pass through the salt bridge, which carries ions only.",
      "clue": "Electrons are released where oxidation happens."
    },
    "b": {
      "d": 3,
      "q": "A cell joins a zinc half-cell (E° = -0.76 V) to a copper half-cell (E° = +0.34 V). What is the cell voltage, and which is the anode?",
      "opts": [
        "1.10 V, and zinc is the anode",
        "1.10 V, and copper is the anode",
        "0.42 V, and zinc is the anode",
        "0.42 V, and copper is the anode"
      ],
      "why": "The copper half-cell has the higher E°, so it is the cathode and zinc is the anode. Voltage = +0.34 - (-0.76) = 1.10 V. Adding or mixing up the signs gives the tempting 0.42 V.",
      "clue": "The higher E° is the cathode. Subtract the anode's E° from it."
    }
  },
  "chem-exothermic-endothermic-reactions": {
    "title": "Exothermic and endothermic reactions",
    "card": [
      "Enthalpy change (ΔH) is the heat energy taken in or given out by a reaction at constant pressure. It is measured in kJ, or kJ/mol.",
      [
        "Exothermic",
        "a reaction that releases heat to the surroundings. The products have less energy than the reactants, so ΔH is negative. The surroundings get warmer."
      ],
      [
        "Endothermic",
        "a reaction that absorbs heat from the surroundings. The products have more energy than the reactants, so ΔH is positive. The surroundings get cooler."
      ],
      "The sign of ΔH is from the point of view of the reaction system. Heat leaving the system gives a negative sign. Heat entering gives a positive sign."
    ],
    "remember": "Exothermic: heat out, ΔH negative. Endothermic: heat in, ΔH positive.",
    "a": {
      "q": "A student mixes two solutions in a beaker. The beaker feels cold, and the thermometer reading falls. What does this show about the reaction?",
      "opts": [
        "It is endothermic, and ΔH is positive",
        "It is endothermic, and ΔH is negative",
        "It is exothermic, and ΔH is positive",
        "It is exothermic, and ΔH is negative"
      ],
      "why": "The surroundings got colder, so the reaction absorbed heat from them. That makes it endothermic, with a positive ΔH. A cold beaker does not mean a negative ΔH, because the sign describes the energy change of the reaction, not the feel of the beaker.",
      "clue": "Where did the heat go: into the reaction or out of it?"
    },
    "b": {
      "d": 3,
      "q": "Burning natural gas in a stove heats a pot of water. The reaction has ΔH = -890 kJ/mol. Which statement is correct?",
      "opts": [
        "The products have less energy than the reactants",
        "The reaction absorbs 890 kJ of heat per mole",
        "The products have more energy than the reactants",
        "The reaction is endothermic, as it gets very hot"
      ],
      "why": "A negative ΔH means heat is released, so the products hold less energy than the reactants. The option about absorbing 890 kJ is tempting because of the number, but absorbing heat would give a positive ΔH.",
      "clue": "Look at the sign of ΔH, not the size of the number."
    }
  },
  "chem-energy-profile-diagrams": {
    "title": "Energy profile diagrams",
    "card": [
      "An energy profile diagram plots the energy of the chemicals (vertical axis) against the progress of the reaction (horizontal axis). The reactants are the level at the start and the products are the level at the end.",
      [
        "Activation energy",
        "the minimum energy needed to start the reaction. It is the height from the reactants' level up to the top of the peak."
      ],
      [
        "ΔH",
        "the energy change of the reaction. It is the products' level minus the reactants' level, so it is measured from the reactants to the products, not to the peak."
      ],
      "If the products sit lower than the reactants, ΔH is negative. If the products sit higher, ΔH is positive."
    ],
    "remember": "Activation energy is reactants up to the peak. ΔH is reactants to products.",
    "a": {
      "q": "On an energy profile diagram, what does the height from the reactants' level to the top of the peak show?",
      "opts": ["The activation energy", "The enthalpy change, ΔH", "The energy of the products", "The total energy released"],
      "why": "The peak is the energy barrier the reactants must climb to react, so that height is the activation energy. It is not ΔH, because ΔH is measured from the reactants to the products and not to the peak.",
      "clue": "Think about the energy needed to get the reaction started."
    },
    "b": {
      "d": 3,
      "q": "In a diagram for a reaction, the reactants are at 200 kJ, the peak is at 350 kJ and the products are at 120 kJ. What are the activation energy and ΔH?",
      "opts": ["150 kJ and -80 kJ", "150 kJ and +80 kJ", "230 kJ and -80 kJ", "230 kJ and +80 kJ"],
      "why": "Activation energy is the peak minus the reactants: 350 - 200 = 150 kJ. ΔH is the products minus the reactants: 120 - 200 = -80 kJ, because the products sit lower. Using 230 kJ measures from the products to the peak, which is not the activation energy.",
      "clue": "Both values start from the reactants' level."
    }
  },
  "chem-calorimetry": {
    "title": "Calorimetry",
    "card": [
      "Calorimetry measures the heat transferred in a reaction by finding how much it changes the temperature of a known mass of water or solution.",
      "The heat gained or lost by the water is q = mcΔT. Here q is heat in joules, m is the mass of water in grams, c is its specific heat capacity and ΔT is the change in temperature.",
      "For water, c is 4.18 J g⁻¹ °C⁻¹. If the water gets hotter, the reaction released heat. If the water gets colder, the reaction absorbed heat.",
      "To find the heat per mole, divide q by the moles of the reactant. The reaction's heat change has the opposite sign to the water's, so heating the water means ΔH is negative and cooling it means ΔH is positive."
    ],
    "remember": "The temperature change of the water gives q = mcΔT, and the reaction's heat change is the opposite of the water's.",
    "a": {
      "q": "A fuel burns under a metal can holding 200 g of water. The water warms from 20.0 °C to 25.0 °C. How much heat did the water gain? (c = 4.18 J g⁻¹ °C⁻¹)",
      "opts": ["4180 J", "836 J", "20 900 J", "1050 J"],
      "why": "q = mcΔT = 200 × 4.18 × 5.0 = 4180 J. The common mistake is to use the final temperature of 25.0 °C instead of the change, which gives 20 900 J.",
      "clue": "Use the change in temperature, not the final temperature."
    },
    "b": {
      "d": 3,
      "q": "Lena dissolves a salt in 100 g of water in an insulated cup. The temperature falls from 22.0 °C to 19.0 °C. What does this show about the dissolving?",
      "opts": [
        "It absorbed heat, and ΔH is positive",
        "It released heat, and ΔH is negative",
        "It absorbed heat, and ΔH is negative",
        "It released heat, and ΔH is positive"
      ],
      "why": "The water lost heat, so the dissolving took that heat in from the water. It absorbed heat, so ΔH is positive. The water got colder, but that does not mean the dissolving released heat.",
      "clue": "Ask where the heat lost by the water went."
    }
  },
  "chem-hess-s-law": {
    "title": "Hess's law",
    "card": [
      "Hess's law says the enthalpy change (ΔH) of a reaction is the same whether it happens in one step or in several. It depends only on the starting reactants and the final products.",
      "So we can add equations to get a target equation, and add their ΔH values to get its ΔH. Substances that appear on both sides cancel out.",
      "If an equation is reversed, change the sign of its ΔH. If it is multiplied by a number, multiply its ΔH by the same number.",
      "This lets us find ΔH for a reaction that is hard to measure directly, using reactions whose ΔH values are known."
    ],
    "remember": "Add the equations and add the ΔH values. Reverse flips the sign, multiplying scales it.",
    "a": {
      "q": "Reaction 1 has ΔH = -100 kJ. Reaction 2 has ΔH = -50 kJ. Adding the two equations gives the target reaction. What is its ΔH?",
      "opts": ["-150 kJ", "-50 kJ", "+150 kJ", "-75 kJ"],
      "why": "By Hess's law, the ΔH values of added equations are added: -100 + -50 = -150 kJ. Taking the difference (-50 kJ) is tempting, but nothing is reversed here, so the values are simply summed.",
      "clue": "Adding equations means adding their ΔH values."
    },
    "b": {
      "d": 3,
      "q": "A → B has ΔH = +40 kJ. Mia needs the ΔH for B → A. She also needs the ΔH for 2A → 2B. Which pair is correct?",
      "opts": [
        "B → A is -40 kJ, and 2A → 2B is +80 kJ",
        "B → A is +40 kJ, and 2A → 2B is +80 kJ",
        "B → A is -40 kJ, and 2A → 2B is +40 kJ",
        "B → A is -80 kJ, and 2A → 2B is -40 kJ"
      ],
      "why": "Reversing A → B flips the sign, so B → A is -40 kJ. Doubling the equation doubles ΔH, so 2A → 2B is +80 kJ. Keeping +40 kJ for the doubled equation ignores that twice as much reacts.",
      "clue": "One change flips the sign. The other changes the size."
    }
  },
  "chem-bond-energies": {
    "title": "Bond energies",
    "card": [
      "Breaking a bond takes in energy. Making a bond releases energy. The bond energy is the energy needed to break one mole of a particular bond, in kJ/mol.",
      "In a reaction, bonds in the reactants break and new bonds form in the products. ΔH ≈ energy to break bonds - energy released making bonds.",
      "If more energy is released making bonds than is taken in breaking bonds, ΔH is negative. If less is released, ΔH is positive.",
      "Bond energies are averages over many molecules, so ΔH found this way is only an estimate. Each bond is counted once for every mole of it in the equation."
    ],
    "remember": "ΔH is roughly energy in to break bonds minus energy out from making bonds.",
    "a": {
      "q": "In a reaction, the bonds formed in the products release more energy than the bonds broken in the reactants take in. What is true of ΔH?",
      "opts": ["ΔH is negative", "ΔH is positive", "ΔH is zero", "ΔH cannot be estimated"],
      "why": "ΔH is energy to break bonds minus energy released making bonds. Releasing more than is taken in gives a negative value. A positive ΔH would need the energy taken in to break bonds to be the larger amount.",
      "clue": "Subtract the energy released from the energy taken in."
    },
    "b": {
      "d": 3,
      "q": "For H2 + Cl2 → 2HCl, breaking 1 mol of H-H (436 kJ/mol) and 1 mol of Cl-Cl (243 kJ/mol) takes in energy. Making 2 mol of H-Cl (432 kJ/mol) releases energy. What is the estimated ΔH?",
      "opts": ["-185 kJ/mol", "+185 kJ/mol", "-47 kJ/mol", "+679 kJ/mol"],
      "why": "Energy taken in is 436 + 243 = 679 kJ. Energy released is 2 × 432 = 864 kJ. ΔH = 679 - 864 = -185 kJ, so the reaction is exothermic. The value +185 comes from subtracting the wrong way round.",
      "clue": "Count two moles of H-Cl bonds formed, then take released from taken in."
    }
  },
  "chem-entropy": {
    "title": "Entropy",
    "card": [
      "Entropy (S) measures how spread out the energy and the particles of a system are. The more ways they can be arranged, the higher the entropy.",
      "Gases have more entropy than liquids, and liquids have more than solids. Particles in a gas are far apart and move freely.",
      "Entropy rises when a solid melts or a liquid boils, and it usually rises when a solid dissolves in water. It also rises when a reaction makes more moles of gas.",
      "Entropy falls when the change goes the other way, such as a gas condensing or fewer moles of gas forming. The change in entropy is written ΔS. It is positive when entropy rises."
    ],
    "remember": "More spread out and freer to move means higher entropy.",
    "a": {
      "q": "Which change has a positive ΔS?",
      "opts": [
        "Ice melting to liquid water",
        "Steam condensing to liquid water",
        "Water freezing to ice",
        "Carbon dioxide gas turning to dry ice"
      ],
      "why": "Liquid water is more spread out than ice, so entropy rises. The other three changes make particles more ordered, so entropy falls. Condensing is tempting, but it moves from gas to liquid.",
      "clue": "Which change frees the particles to move more?"
    },
    "b": {
      "d": 3,
      "q": "Which reaction increases the entropy of the system?",
      "opts": [
        "2H2O2(l) → 2H2O(l) + O2(g)",
        "N2(g) + 3H2(g) → 2NH3(g)",
        "2H2(g) + O2(g) → 2H2O(l)",
        "Ca(OH)2(aq) + CO2(g) → CaCO3(s) + H2O(l)"
      ],
      "why": "Hydrogen peroxide decomposing makes a gas from a liquid, so the particles become far more spread out. The other three use up gas, so entropy falls. The ammonia reaction is tempting, but it turns four moles of gas into two.",
      "clue": "Look for a reaction that makes gas, not one that uses it up."
    }
  },
  "chem-gibbs-free-energy": {
    "title": "Gibbs free energy",
    "card": [
      "Gibbs free energy change (ΔG) combines enthalpy and entropy into one value. ΔG = ΔH - TΔS.",
      "ΔH is the enthalpy change, in kJ mol⁻¹. ΔS is the entropy change, T is the temperature in kelvin, and ΔG is in kJ mol⁻¹. ΔS is often given in J K⁻¹ mol⁻¹, so divide by 1000 to match ΔH.",
      "A reaction is spontaneous when ΔG is negative. It is not spontaneous when ΔG is positive. Spontaneous means it can happen without continuous energy input. It does not say how fast.",
      "To convert from °C to kelvin, add 273. For example, 25 °C is 298 K."
    ],
    "remember": "Negative ΔG means spontaneous. Keep T in kelvin and ΔS in kJ.",
    "a": {
      "q": "A reaction has ΔG = -40 kJ mol⁻¹ at 298 K. What does this tell you?",
      "opts": [
        "The reaction is spontaneous at this temperature",
        "The reaction is not spontaneous at this temperature",
        "The reaction must be very fast",
        "The reaction needs continuous energy input"
      ],
      "why": "A negative ΔG means the reaction is spontaneous, so it can happen without continuous energy input. Spontaneous does not mean fast, which is the tempting mistake, because ΔG says nothing about rate.",
      "clue": "Look at the sign of ΔG."
    },
    "b": {
      "d": 3,
      "q": "A reaction has ΔH = -92 kJ mol⁻¹ and ΔS = -199 J K⁻¹ mol⁻¹. What is ΔG at 300 K, and is it spontaneous?",
      "opts": [
        "-32 kJ mol⁻¹, spontaneous",
        "+32 kJ mol⁻¹, not spontaneous",
        "-152 kJ mol⁻¹, spontaneous",
        "+59 608 kJ mol⁻¹, not spontaneous"
      ],
      "why": "TΔS = 300 × (-0.199) = -59.7 kJ mol⁻¹, so ΔG = -92 - (-59.7) = about -32 kJ mol⁻¹, which is negative, so the reaction is spontaneous. The answer -152 comes from adding TΔS instead of subtracting it. Leaving ΔS in J gives +59 608, which mixes J and kJ.",
      "clue": "Convert ΔS to kJ, then watch the minus sign before TΔS."
    }
  },
  "chem-predicting-spontaneity": {
    "title": "Predicting spontaneity",
    "card": [
      "In ΔG = ΔH - TΔS, T is always positive. So the signs of ΔH and ΔS decide how ΔG changes with temperature.",
      ["ΔH negative, ΔS positive", "ΔG is always negative. The reaction is spontaneous at all temperatures."],
      ["ΔH positive, ΔS negative", "ΔG is always positive. The reaction is spontaneous at no temperature."],
      [
        "Same signs",
        "Temperature decides. If both are negative, the reaction is spontaneous at low temperatures. If both are positive, it is spontaneous at high temperatures."
      ]
    ],
    "remember": "Opposite signs fix the answer. Matching signs mean temperature decides.",
    "a": {
      "q": "A reaction has a positive ΔH and a positive ΔS. When is it spontaneous?",
      "opts": ["Only at high temperatures", "Only at low temperatures", "At all temperatures", "At no temperature"],
      "why": "At high temperature the TΔS term is large and positive, so it outweighs ΔH and makes ΔG negative. At low temperature ΔH dominates, so ΔG is positive.",
      "clue": "Which term gets larger as T rises?"
    },
    "b": {
      "d": 3,
      "q": "Water vapour condenses to liquid water, releasing heat. At which temperatures is condensation spontaneous?",
      "opts": ["Only at low temperatures", "Only at high temperatures", "At all temperatures", "At no temperature"],
      "why": "Condensing releases heat, so ΔH is negative. The particles become more ordered, so ΔS is negative. With both negative, the -TΔS term is positive and grows with T, so ΔG is negative only at low temperatures.",
      "clue": "Decide the sign of ΔS for gas becoming liquid."
    }
  },
  "chem-static-dynamic-equilibrium": {
    "title": "Static and dynamic equilibrium",
    "card": [
      "Some reactions are reversible: the products can react to re-form the reactants. The forward reaction makes products. The reverse reaction makes reactants.",
      [
        "Dynamic equilibrium",
        "the forward and reverse reactions both continue at the same rate. The amounts of reactants and products stay constant, but particles are still reacting."
      ],
      [
        "Static equilibrium",
        "nothing is changing at the particle level. No reaction is going on in either direction, so the amounts stay constant."
      ],
      "Chemical equilibrium is dynamic. It needs a closed system, where no matter enters or leaves. In an open container, a gas product can escape and equilibrium is not reached."
    ],
    "remember": "At equilibrium the amounts are constant because both reactions run at equal rates, not because they have stopped.",
    "a": {
      "q": "A reversible reaction in a sealed flask has reached equilibrium. Which statement about the flask is correct?",
      "opts": [
        "The forward and reverse reactions continue at equal rates",
        "The forward reaction goes on but the reverse has stopped",
        "Both reactions have stopped, so the amounts are constant",
        "The amounts of reactants and products are always equal"
      ],
      "why": "At equilibrium both reactions continue, and equal rates keep the amounts constant. Saying both reactions have stopped describes static equilibrium, which is not how chemical equilibrium works. Constant amounts do not have to be equal amounts.",
      "clue": "Constant amounts do not mean that nothing is happening."
    },
    "b": {
      "d": 3,
      "q": "Dani places some solid calcium carbonate in an open dish and heats it. It breaks down into calcium oxide and carbon dioxide gas, and the gas escapes into the room. Why does this system not reach equilibrium?",
      "opts": [
        "It is an open system, so the product gas leaves",
        "The reverse reaction is not possible for this change",
        "The forward reaction stops once the dish is heated",
        "The amounts of solids cannot stay constant in a dish"
      ],
      "why": "Equilibrium needs a closed system. Carbon dioxide escapes, so it cannot react with calcium oxide to re-form calcium carbonate at the same rate as the forward reaction. The reaction is reversible in a sealed container, so the reverse reaction being impossible is wrong.",
      "clue": "Think about what happens to the gas in an open dish."
    }
  },
  "chem-le-chatelier-s-principle": {
    "title": "Le Chatelier's principle",
    "card": [
      "When a system at equilibrium is disturbed, it shifts in the direction that partly undoes the change. It does not fully undo it.",
      [
        "Concentration",
        "adding a substance shifts the system to use it up. Removing a substance shifts the system to make more of it."
      ],
      [
        "Pressure",
        "for a gas system in a container, raising the pressure by reducing the volume shifts the system to the side with fewer moles of gas. Lowering the pressure shifts it to the side with more moles of gas."
      ],
      [
        "Temperature",
        "raising the temperature shifts the system in the endothermic direction, which absorbs heat. Lowering the temperature shifts it in the exothermic direction, which releases heat."
      ]
    ],
    "remember": "The system shifts to partly oppose whatever change was made to it.",
    "a": {
      "q": "N2(g) + 3H2(g) ⇌ 2NH3(g) is at equilibrium in a closed container. More H2 is added at constant temperature. What happens?",
      "opts": [
        "The system shifts right and uses up some of the added H2",
        "The system shifts left and makes more N2",
        "The system shifts right and all of the added H2 is used up",
        "The system does not shift, because only pressure matters"
      ],
      "why": "Adding H2 is a rise in the concentration of a reactant. The system shifts right to use some of it up. It only partly undoes the change, so not all of the added H2 is used up.",
      "clue": "The system works to use up what was added."
    },
    "b": {
      "d": 3,
      "q": "2SO2(g) + O2(g) ⇌ 2SO3(g) is at equilibrium in a sealed cylinder. The volume is reduced at constant temperature, so the pressure rises. What happens?",
      "opts": [
        "It shifts right, to the side with fewer moles of gas",
        "It shifts left, to the side with more moles of gas",
        "It shifts right, because the reaction is exothermic",
        "It does not shift, because the temperature is unchanged"
      ],
      "why": "The left side has 3 moles of gas and the right side has 2. Higher pressure shifts the system to the side with fewer moles of gas, which is to the right. Unchanged temperature does not stop a shift caused by pressure.",
      "clue": "Count the moles of gas on each side."
    }
  },
  "chem-equilibrium-constant": {
    "title": "The equilibrium constant",
    "card": [
      "The equilibrium constant, K, compares the amounts of products and reactants at equilibrium. It does not show how fast equilibrium is reached.",
      "For aA + bB ⇌ cC + dD, K = [C]^c [D]^d ÷ ([A]^a [B]^b), where square brackets mean concentration in mol/L. Products go on top, reactants on the bottom, and each is raised to the power of its coefficient.",
      "Only gases and aqueous species go in the expression. Pure solids and pure liquids are left out.",
      "A large K means products are favoured, so the equilibrium mixture contains mostly products. A small K means reactants are favoured."
    ],
    "remember": "K = products over reactants, each to the power of its coefficient. Large K, products favoured.",
    "a": {
      "q": "Which is the correct equilibrium expression for N2(g) + 3H2(g) ⇌ 2NH3(g)?",
      "opts": [
        "K = [NH3]^2 ÷ ([N2][H2]^3)",
        "K = [N2][H2]^3 ÷ [NH3]^2",
        "K = [NH3] ÷ ([N2][H2])",
        "K = 2[NH3] ÷ ([N2] + 3[H2])"
      ],
      "why": "Products go on top and reactants on the bottom, and each concentration is raised to the power of its coefficient. K = [N2][H2]^3 ÷ [NH3]^2 is upside down, so it is the expression for the reverse reaction.",
      "clue": "Coefficients become powers, and products go on top."
    },
    "b": {
      "d": 3,
      "q": "At a set temperature, the reaction 2SO2(g) + O2(g) ⇌ 2SO3(g) has K = 3 × 10^24. What does this say about the equilibrium mixture?",
      "opts": [
        "It contains mostly SO3, so products are favoured",
        "It contains mostly SO2 and O2, so reactants are favoured",
        "It contains about equal amounts of reactants and products",
        "It is reached very slowly because K is so large"
      ],
      "why": "A very large K means the product concentration is much greater than the reactant concentrations at equilibrium, so products are favoured. K compares amounts at equilibrium. It does not tell you how fast equilibrium is reached.",
      "clue": "K is products over reactants. What does a huge ratio mean?"
    }
  },
  "chem-temperature-equilibrium-constant": {
    "title": "Temperature and the equilibrium constant",
    "card": [
      "The value of K for a reaction is fixed at a given temperature. Changing the temperature is the only thing that changes K.",
      [
        "Exothermic",
        "the forward reaction releases heat. Raising the temperature lowers K, so less product is present at the new equilibrium."
      ],
      [
        "Endothermic",
        "the forward reaction absorbs heat. Raising the temperature raises K, so more product is present at the new equilibrium."
      ],
      "Changing a concentration or the pressure can move the position of equilibrium, but K stays the same. Lowering the temperature changes K in the opposite direction to raising it."
    ],
    "remember": "Only temperature changes K. Heating lowers K for exothermic reactions and raises it for endothermic ones.",
    "a": {
      "q": "The value of K for an exothermic reaction is measured at 300 K. Which change would give a different value of K?",
      "opts": [
        "Raising the temperature to 400 K",
        "Adding more reactant at 300 K",
        "Removing some product at 300 K",
        "Increasing the pressure at 300 K"
      ],
      "why": "Only a change in temperature changes K. Adding or removing a substance, or changing pressure, can move the position of equilibrium, but K stays the same at 300 K.",
      "clue": "Which change affects K itself, not just the amounts present?"
    },
    "b": {
      "d": 3,
      "q": "The reaction N2(g) + 3H2(g) ⇌ 2NH3(g) is exothermic. A plant in Newcastle raises the temperature of its reaction vessel. What happens to K, and why?",
      "opts": [
        "K decreases, because the forward reaction releases heat",
        "K increases, because the mixture has more energy",
        "K decreases, because the pressure in the vessel has risen",
        "K stays the same, because equilibrium has been reached"
      ],
      "why": "Raising the temperature lowers K for an exothermic reaction, so less product is present at the new equilibrium. Extra energy does not raise K here, because the forward reaction releases heat rather than absorbs it.",
      "clue": "Check whether the forward reaction releases or absorbs heat."
    }
  },
  "chem-reaction-quotient": {
    "title": "Reaction quotient",
    "card": [
      "The reaction quotient, Q, has the same form as the equilibrium constant, K. For aA + bB ⇌ cC + dD, Q = [C]^c[D]^d ÷ [A]^a[B]^b.",
      "Q uses the concentrations at any moment, so it changes as the reaction proceeds. K uses only equilibrium concentrations, so Q equals K only at equilibrium.",
      "If Q is less than K, there are too few products compared with equilibrium. The net reaction moves forward, towards products, until Q = K.",
      "If Q is greater than K, there are too many products compared with equilibrium. The net reaction moves in reverse, towards reactants, until Q = K."
    ],
    "remember": "Compare Q with K: the reaction moves in whichever direction brings Q towards K.",
    "a": {
      "q": "At a given temperature, a mixture has Q = 0.5 and K = 4.0. What will happen to the mixture?",
      "opts": [
        "The net reaction moves forward, forming more products",
        "The net reaction moves in reverse, forming more reactants",
        "The mixture stays the same because it is at equilibrium",
        "The value of K falls until it equals Q"
      ],
      "why": "Q is less than K, so there are too few products compared with equilibrium. The net reaction moves forward until Q rises to equal K. K does not change, because the temperature has not changed.",
      "clue": "Which way must Q move to reach K?"
    },
    "b": {
      "d": 3,
      "q": "For N2(g) + 3H2(g) ⇌ 2NH3(g), K = 0.50 at a set temperature. A mixture has [N2] = 1.0 M, [H2] = 2.0 M and [NH3] = 2.0 M. Which statement is correct?",
      "opts": [
        "Q = 0.5, so the mixture is at equilibrium",
        "Q = 2.0, so the net reaction moves in reverse",
        "Q = 0.5, so the net reaction moves forward",
        "Q = 2.0, so the net reaction moves forward"
      ],
      "why": "Q = [NH3]^2 ÷ ([N2][H2]^3) = 4.0 ÷ (1.0 × 8.0) = 0.50, which equals K, so the mixture is at equilibrium. Q = 2.0 comes from dropping the cube on [H2] or from turning the ratio upside down. Pairing Q = 0.5 with a forward shift misreads the comparison, as a forward shift needs Q to be less than K.",
      "clue": "Raise each concentration to the power of its coefficient, then compare Q with K."
    }
  },
  "chem-dissolving-ionic-compounds": {
    "title": "Dissolving ionic compounds",
    "card": [
      "An ionic solid is a lattice of positive and negative ions held together by strong attraction. Water is a polar molecule, so it has a slightly positive end and a slightly negative end.",
      "When an ionic solid is added to water, the slightly negative ends of water molecules attract the positive ions. The slightly positive ends attract the negative ions.",
      "These attractions pull ions out of the lattice, and water molecules surround each ion. The ions are now hydrated and spread through the solution.",
      "Some ionic compounds dissolve only slightly. Only a small amount of the solid breaks up into ions, and most stays as solid."
    ],
    "remember": "Water's polar ends pull ions from the lattice, and slightly soluble salts release only a few.",
    "a": {
      "q": "Sodium chloride dissolves in water. Which change describes what happens to the solid?",
      "opts": [
        "Water molecules surround and separate the ions",
        "Water molecules break the bonds inside each ion",
        "Sodium and chlorine atoms form new covalent bonds",
        "The solid melts into a liquid made of molecules"
      ],
      "why": "Polar water molecules attract the ions and pull them out of the lattice, so the ions end up surrounded by water. Ions are not broken apart, and no covalent bonds form between sodium and chlorine.",
      "clue": "Think about which ends of water attract which ions."
    },
    "b": {
      "d": 3,
      "q": "Silver chloride is added to water, and only a tiny amount of it dissolves. What does this show?",
      "opts": [
        "Only a small amount of the solid separates into ions",
        "The water molecules cannot attract any ions at all",
        "The solid does not contain ions in a lattice",
        "The ions that dissolve are no longer surrounded by water"
      ],
      "why": "A slightly soluble compound releases only a few ions into solution, while most stays as solid. Water can still attract ions, and the dissolved ions are surrounded by water molecules like any others.",
      "clue": "Slightly soluble does not mean not at all."
    }
  },
  "chem-solubility-product": {
    "title": "The solubility product",
    "card": [
      "A slightly soluble salt in water forms a saturated solution. The solid and its dissolved ions are at equilibrium, for example: PbI2(s) ⇌ Pb2+(aq) + 2I-(aq).",
      "The solubility product, Ksp, is the equilibrium constant for this dissolving. The solid is left out of the expression, so Ksp = [Pb2+][I-]2. Each concentration is raised to the power of its coefficient.",
      "To find solubility, let s be the moles of salt that dissolve per litre. For PbI2, [Pb2+] = s and [I-] = 2s, so Ksp = s × (2s)2 = 4s3.",
      "Ksp is also used as a limit. Comparing the ion concentrations in a mixture with Ksp shows whether a precipitate will form."
    ],
    "remember": "Ksp is the equilibrium constant for a salt dissolving, written with the ion concentrations only.",
    "a": {
      "q": "Which expression is the Ksp for calcium fluoride, CaF2(s) ⇌ Ca2+(aq) + 2F-(aq)?",
      "opts": ["[Ca2+][F-]2", "[Ca2+][F-]", "[Ca2+][F-]2 ÷ [CaF2]", "[Ca2+]2[F-]"],
      "why": "Ksp uses only the dissolved ions, and each is raised to the power of its coefficient, so fluoride is squared. The solid is not included, so dividing by CaF2 is wrong.",
      "clue": "Leave out the solid and use the coefficients as powers."
    },
    "b": {
      "d": 3,
      "q": "Silver chromate, Ag2CrO4, has a molar solubility of s mol/L. Which expression gives its Ksp?",
      "opts": ["4s3", "s2", "2s3", "27s4"],
      "why": "Ag2CrO4 gives [Ag+] = 2s and [CrO4 2-] = s. So Ksp = (2s)2 × s = 4s3. Using 2s3 forgets to square the 2 in 2s.",
      "clue": "Square the silver concentration, which is 2s."
    }
  },
  "chem-predicting-precipitation": {
    "title": "Predicting precipitation",
    "card": [
      "The ion product, Q, is worked out like Ksp, but with the ion concentrations at the moment of mixing. These need not be equilibrium values.",
      "If Q is greater than Ksp, the solution holds more ions than it can at equilibrium. Solid precipitates until Q falls to equal Ksp. Ksp itself stays the same at a given temperature.",
      "If Q is less than Ksp, no precipitate forms and the solution is unsaturated. If Q equals Ksp, the solution is just saturated.",
      "When two solutions are mixed, the total volume grows, so each ion is diluted. Find each ion's new concentration before calculating Q."
    ],
    "remember": "Precipitate forms when Q is greater than Ksp. Dilute the ions first when mixing.",
    "a": {
      "q": "A mixture of two solutions has a Q for barium sulfate of 5 × 10⁻⁹. The Ksp is 1 × 10⁻¹⁰. What happens?",
      "opts": ["A precipitate forms", "No precipitate forms", "The solution is unsaturated", "The Ksp rises to match Q"],
      "why": "Q is greater than Ksp, so the mixture holds more ions than it can at equilibrium and solid forms. It is not unsaturated, and Ksp stays the same at a given temperature.",
      "clue": "Compare Q with Ksp."
    },
    "b": {
      "d": 3,
      "q": "50 mL of 0.020 M Ca²⁺ is mixed with 50 mL of 0.020 M SO₄²⁻. Ksp of CaSO₄ is 5 × 10⁻⁵. What happens?",
      "opts": [
        "Q = 1.0 × 10⁻⁴, so a precipitate forms",
        "Q = 4.0 × 10⁻⁴, so a precipitate forms",
        "Q = 1.0 × 10⁻⁴, so no precipitate forms",
        "Q = 2.5 × 10⁻⁵, so no precipitate forms"
      ],
      "why": "The total volume is 100 mL, double each starting volume, so each ion falls to 0.010 M. Q = 0.010 × 0.010 = 1.0 × 10⁻⁴, which is greater than 5 × 10⁻⁵, so a precipitate forms. Using 0.020 M for each ion gives 4.0 × 10⁻⁴ because the dilution is ignored.",
      "clue": "The total volume is double each starting volume."
    }
  },
  "chem-properties-acids-bases": {
    "title": "Properties of acids and bases",
    "card": [
      [
        "Acids",
        "Acids taste sour and turn blue litmus red. They react with many metals to give hydrogen gas, and with carbonates to give carbon dioxide."
      ],
      ["Bases", "Bases feel slippery and turn red litmus blue. Soap and many cleaning products contain bases."],
      "An indicator is a substance that changes colour depending on the pH of the solution it is in. Litmus is one indicator.",
      "Tasting and touching chemicals is not safe in a lab. Use indicators and reactions to test a solution instead."
    ],
    "remember": "Acids and bases can be told apart by how they react and by indicator colours.",
    "a": {
      "q": "A student adds a solution to blue litmus paper and the paper turns red. What does this show about the solution?",
      "opts": ["It is an acid", "It is a base", "It is a metal", "It is a carbonate"],
      "why": "Blue litmus turns red in an acid. A base would turn red litmus blue, so it would leave blue litmus unchanged.",
      "clue": "Think about which type of solution turns blue litmus red."
    },
    "b": {
      "d": 2,
      "q": "Sam drops a piece of magnesium ribbon into a clear solution and sees bubbles. The gas is collected. Which result fits an acid reacting with a metal?",
      "opts": [
        "The gas is hydrogen",
        "The gas is carbon dioxide",
        "The gas is oxygen",
        "No gas forms but the solution turns red"
      ],
      "why": "Acids react with many metals to give hydrogen gas, so bubbles from a metal fit an acid. Carbon dioxide is the gas given off when an acid reacts with a carbonate, not a metal.",
      "clue": "Which gas does an acid give off with a metal, not a carbonate?"
    }
  },
  "chem-arrhenius-br-nsted-lowry": {
    "title": "Arrhenius and Brønsted-Lowry definitions",
    "card": [
      [
        "Arrhenius",
        "An acid releases H⁺ ions in water. A base releases OH⁻ ions in water. These definitions only work for water solutions."
      ],
      ["Brønsted-Lowry", "An acid is a proton donor. A base is a proton acceptor. A proton here means an H⁺ ion."],
      "Brønsted-Lowry also works without water, such as for reactions between gases. In NH₃ + HCl → NH₄Cl, HCl donates a proton to NH₃, so HCl is the acid and NH₃ is the base.",
      "A substance is an acid or a base by what it does in a reaction. In water, an acid donates its proton to a water molecule, forming H₃O⁺."
    ],
    "remember": "Arrhenius is about ions released in water. Brønsted-Lowry is about proton transfer.",
    "a": {
      "q": "In the reaction NH₃ + HCl → NH₄Cl, which substance is the Brønsted-Lowry base?",
      "opts": [
        "NH₃, because it accepts a proton",
        "HCl, because it donates a proton",
        "NH₃, because it donates a proton",
        "HCl, because it accepts a proton"
      ],
      "why": "NH₃ gains a proton from HCl to form NH₄⁺, so it is a proton acceptor and a Brønsted-Lowry base. HCl gives the proton away, so it is the proton donor, which makes it the acid, not the base.",
      "clue": "Which substance ends up with an extra proton?"
    },
    "b": {
      "d": 3,
      "q": "Hydrogen chloride gas reacts with ammonia gas, with no water present. Why can the Arrhenius definitions not describe this reaction, while Brønsted-Lowry can?",
      "opts": [
        "Arrhenius needs water, but Brønsted-Lowry does not",
        "Arrhenius needs a gas, but Brønsted-Lowry needs a solid",
        "Brønsted-Lowry needs water, but Arrhenius does not",
        "Arrhenius covers only bases, Brønsted-Lowry only acids"
      ],
      "why": "Arrhenius defines acids and bases by the ions they release in water, so it cannot apply with no water present. Brønsted-Lowry looks only at whether a proton is transferred, which happens here. The option that says Brønsted-Lowry needs water is wrong because it swaps the two definitions.",
      "clue": "Look at what each definition needs in order to apply."
    }
  },
  "chem-conjugate-acid-base-pairs": {
    "title": "Conjugate acid-base pairs",
    "card": [
      "This idea builds on the Brønsted-Lowry model. When an acid donates a proton (H⁺), the species left behind is its conjugate base.",
      "The reverse also works. When a base accepts a proton, it becomes its conjugate acid. A conjugate pair differs by exactly one H⁺.",
      "Example: HCl donates a proton to become Cl⁻, so Cl⁻ is the conjugate base of HCl. NH₃ accepts a proton to become NH₄⁺, so NH₄⁺ is the conjugate acid of NH₃.",
      "The stronger an acid is, the weaker its conjugate base. A strong acid gives up its proton very readily, so its conjugate base has very little attraction for a proton."
    ],
    "remember": "Conjugate partners differ by one H⁺. A strong acid has a very weak conjugate base.",
    "a": {
      "q": "What is the conjugate base of the hydrogen carbonate ion, HCO₃⁻?",
      "opts": ["CO₃²⁻", "H₂CO₃", "H₂O", "CO₂"],
      "why": "A conjugate base is what is left after the acid donates one H⁺, so HCO₃⁻ becomes CO₃²⁻. H₂CO₃ is tempting, but it has gained a proton, so it is the conjugate acid of HCO₃⁻.",
      "clue": "Remove one H⁺ from the formula and adjust the charge."
    },
    "b": {
      "d": 3,
      "q": "Nitric acid, HNO₃, is a strong acid. What does this tell you about its conjugate base, NO₃⁻, in water?",
      "opts": [
        "It is a very weak base with little attraction for H⁺",
        "It is a strong base that readily accepts H⁺",
        "It is a strong acid, as it comes from a strong acid",
        "It is neither an acid nor a base, so it cannot react"
      ],
      "why": "A strong acid gives up its proton very readily, so its conjugate base has very little attraction for H⁺ and is very weak. The tempting answer is a strong base, which reverses the link: strength in an acid goes with weakness in its conjugate base.",
      "clue": "A strong acid lets go of its proton easily."
    }
  },
  "chem-strong-weak-acids": {
    "title": "Strong and weak acids",
    "card": [
      [
        "Strong acid",
        "An acid that ionises fully in water. Almost every molecule donates its proton, so the solution holds mostly ions. Hydrochloric acid, HCl, is an example."
      ],
      [
        "Weak acid",
        "An acid that ionises only partly in water. Most molecules stay unchanged, and an equilibrium forms. Ethanoic acid, CH₃COOH, is an example."
      ],
      "Strength is about how far an acid ionises. Concentration is about how much acid is dissolved in a given volume of solution. They are separate ideas.",
      "A concentrated solution has a lot of acid in it. A dilute solution has little. Either kind of solution can be made from a strong acid or from a weak acid."
    ],
    "remember": "Strength is how much of the acid ionises. Concentration is how much acid is dissolved.",
    "a": {
      "q": "What makes hydrochloric acid a strong acid?",
      "opts": [
        "It ionises almost fully when dissolved in water",
        "It is dissolved at a high concentration in water",
        "It contains more hydrogen atoms than a weak acid",
        "It forms an equilibrium with most molecules unchanged"
      ],
      "why": "A strong acid is defined by how far it ionises, and HCl ionises almost fully. Concentration is a different idea, because a strong acid can be dilute and a weak acid can be concentrated.",
      "clue": "Strength describes what happens to each molecule in water."
    },
    "b": {
      "d": 3,
      "q": "Sam has 0.1 mol L⁻¹ ethanoic acid and 0.001 mol L⁻¹ hydrochloric acid. Which statement about them is correct?",
      "opts": [
        "Ethanoic acid is weak and more concentrated",
        "Ethanoic acid is strong and more concentrated",
        "Hydrochloric acid is weak and more dilute",
        "Hydrochloric acid is strong and more concentrated"
      ],
      "why": "Ethanoic acid ionises only partly, so it is weak, and 0.1 mol L⁻¹ is a greater concentration than 0.001 mol L⁻¹. Concentration does not decide strength, so the more concentrated acid is not the stronger one.",
      "clue": "Judge strength and concentration separately, one at a time."
    }
  },
  "chem-ph-poh": {
    "title": "pH and pOH",
    "card": [
      [
        "pH",
        "pH = -log[H⁺], where [H⁺] is the concentration of hydrogen ions in mol/L. A lower pH means a higher [H⁺]."
      ],
      ["pOH", "pOH = -log[OH⁻], where [OH⁻] is the concentration of hydroxide ions in mol/L."],
      "At 25°C, pH + pOH = 14. So if you know one value, you can find the other by subtracting from 14.",
      "The scale is logarithmic. A change of 1 pH unit means [H⁺] changes by a factor of 10. At 25°C, pH below 7 is acidic, 7 is neutral and above 7 is basic."
    ],
    "remember": "pH and pOH are negative logs of ion concentrations, and at 25°C they add to 14.",
    "a": {
      "q": "A solution at 25°C has [H⁺] = 1 × 10⁻⁴ mol/L. What is its pH?",
      "opts": ["4", "10", "-4", "0.0001"],
      "why": "pH = -log(1 × 10⁻⁴) = 4. The value 10 is the pOH (14 - 4), which a student might give by finding the pOH instead of the pH.",
      "clue": "Take the negative log of the H⁺ concentration."
    },
    "b": {
      "d": 3,
      "q": "Solution X at 25°C has a pOH of 3. Which statement about solution X is correct?",
      "opts": [
        "Its pH is 11, so it is basic",
        "Its pH is 3, so it is acidic",
        "Its pH is 11, so it is acidic",
        "Its pH is 3, so it is basic"
      ],
      "why": "At 25°C, pH + pOH = 14, so pH = 14 - 3 = 11. That is above 7, so the solution is basic. It is tempting to read the pOH of 3 as the pH, but pH = 14 - 3 = 11.",
      "clue": "Subtract the pOH from 14, then compare with 7."
    }
  },
  "chem-acid-dissociation-constant": {
    "title": "Acid dissociation constant",
    "card": [
      "For a weak acid HA in water, HA + H₂O ⇌ H₃O⁺ + A⁻. The acid dissociation constant is Ka = [H₃O⁺][A⁻] ÷ [HA]. Water is left out of the expression.",
      "Ka measures how far a weak acid ionises. A larger Ka means more ionisation at equilibrium, so the acid is stronger.",
      "pKa = -log Ka. This turns very small Ka values into easier numbers, like pH does for [H⁺].",
      "Because of the negative sign, a smaller pKa means a larger Ka. So a smaller pKa means a stronger acid."
    ],
    "remember": "Bigger Ka or smaller pKa means a stronger acid.",
    "a": {
      "q": "Which comparison shows that weak acid A is stronger than weak acid B?",
      "opts": [
        "A has a smaller pKa than B",
        "A has a larger pKa than B",
        "A has a smaller Ka than B",
        "A is at a higher concentration than B"
      ],
      "why": "A smaller pKa means a larger Ka, so more of acid A ionises at equilibrium. A larger pKa is tempting because bigger numbers seem stronger, but the negative log reverses the order.",
      "clue": "The negative sign in pKa reverses the order of Ka."
    },
    "b": {
      "d": 3,
      "q": "Acid X has Ka = 1.8 × 10⁻⁵ and acid Y has Ka = 6.3 × 10⁻⁸, at the same temperature. Which statement is correct?",
      "opts": [
        "X has the smaller pKa and is the stronger acid",
        "X has the larger pKa and is the stronger acid",
        "Y has the smaller pKa and is the stronger acid",
        "Y has the larger pKa and is the stronger acid"
      ],
      "why": "X has the larger Ka, so it ionises more and is the stronger acid. A larger Ka gives a smaller pKa, so X has the smaller pKa. The option saying X has the larger pKa mixes up the direction of the negative log.",
      "clue": "Compare the powers of ten first, then flip for pKa."
    }
  },
  "chem-neutralisation-reactions": {
    "title": "Neutralisation reactions",
    "card": [
      "In a neutralisation reaction, an acid reacts with a base to form a salt and water. The salt is an ionic compound made from the positive ion of the base and the negative ion of the acid.",
      "Example: HCl(aq) + NaOH(aq) → NaCl(aq) + H2O(l). Here the salt is sodium chloride.",
      "Neutralisation releases heat, so it is exothermic. The enthalpy of neutralisation is the heat released when an acid and a base react to form one mole of water.",
      "A neutralisation reaction does not always give a solution with pH 7. The final pH depends on the acid and base used, and on whether one of them is left over."
    ],
    "remember": "Acid + base → salt + water, and heat is released.",
    "a": {
      "q": "Which pair of products forms when sulfuric acid reacts with sodium hydroxide?",
      "opts": [
        "Sodium sulfate and water",
        "Sodium sulfide and hydrogen",
        "Sulfur dioxide and water",
        "Sodium oxide and hydrogen gas"
      ],
      "why": "An acid and a base form a salt and water. The salt is made of the sodium ion from the base and the sulfate ion from the acid. Hydrogen gas is not a product here, because that pattern belongs to a different type of reaction.",
      "clue": "Name the salt, then add the other product."
    },
    "b": {
      "d": 3,
      "q": "Tahlia mixes dilute hydrochloric acid with dilute potassium hydroxide in a beaker. The beaker feels warm. What explains this?",
      "opts": [
        "Neutralisation is exothermic, so it releases heat",
        "Neutralisation is endothermic, so it absorbs heat",
        "The salt that forms dissolves and heats the water",
        "The acid and base are both warm before mixing"
      ],
      "why": "Neutralisation releases heat to the surroundings, so the mixture warms up. This heat is the enthalpy of neutralisation. An endothermic reaction would make the beaker feel cool, not warm.",
      "clue": "Think about which way heat moves when the beaker feels warm."
    }
  },
  "chem-titration": {
    "title": "Titration",
    "card": [
      "A titration finds the unknown concentration of one solution. A solution of known concentration, the standard solution, is added from a burette to a measured volume of the unknown solution in a conical flask.",
      "The volume of the unknown solution is measured with a pipette. The volume added from the burette is read from the scale before and after, and the difference is the titre.",
      "The equivalence point is where the two reactants have been added in exactly the ratio of the balanced equation. An indicator in the flask changes colour near this point, and the titration is stopped there.",
      "To calculate, find moles of the known solution: n = c × V (V in litres). Use the mole ratio in the equation to find moles of the unknown, then divide by its volume to get concentration."
    ],
    "remember": "Titration uses a known solution, the mole ratio and n = c × V to find an unknown concentration.",
    "a": {
      "q": "In a titration, what is the titre?",
      "opts": [
        "The volume added from the burette to reach the end",
        "The volume of solution measured into the flask",
        "The concentration of the standard solution",
        "The moles of unknown solution in the flask"
      ],
      "why": "The titre is the burette reading after minus the reading before, which is the volume added. The volume in the flask is measured with a pipette, so it is not the titre.",
      "clue": "It is the difference between two burette readings."
    },
    "b": {
      "d": 3,
      "q": "Tom titrates 20.0 mL of sulfuric acid, H2SO4, with 0.100 mol/L NaOH. The titre is 30.0 mL. What is the concentration of the acid?",
      "opts": ["0.0750 mol/L", "0.150 mol/L", "0.0500 mol/L", "0.300 mol/L"],
      "why": "Moles of NaOH = 0.100 × 0.0300 = 0.00300 mol. H2SO4 + 2NaOH gives 1 mol acid per 2 mol base, so acid = 0.00150 mol, and 0.00150 ÷ 0.0200 = 0.0750 mol/L. 0.150 mol/L comes from ignoring the 1:2 ratio.",
      "clue": "Write the balanced equation first and check the mole ratio."
    }
  },
  "chem-choosing-indicator": {
    "title": "Choosing an indicator",
    "card": [
      "An indicator is a weak acid or base whose colour changes over a small pH range. The point where it changes colour is the end point.",
      "The equivalence point is where the acid and base have reacted in exact mole ratio. The pH there depends on the salt formed, so it is not always 7.",
      "Strong acid with strong base: pH 7 at equivalence. Strong acid with weak base: below 7, as the salt's cation is a weak acid. Weak acid with strong base: above 7, as the salt's anion is a weak base.",
      "Choose an indicator whose colour change range includes the pH at the equivalence point. Then the end point is very close to the equivalence point. For example, phenolphthalein changes colour at about pH 8 to 10, and methyl orange at about pH 3 to 4."
    ],
    "remember": "Match the indicator's colour change range to the pH at the equivalence point.",
    "a": {
      "q": "Why is the choice of indicator important in a titration?",
      "opts": [
        "Its colour change must occur near the equivalence point",
        "It must change colour at exactly pH 7 in every titration",
        "It must react with the acid before the base is added",
        "It must be a stronger acid than the acid being titrated"
      ],
      "why": "The end point only shows when the equivalence point is reached if the colour change happens near it. The equivalence point is not always at pH 7, so an indicator that changes at exactly pH 7 is not needed in every titration.",
      "clue": "What must the colour change tell you about the reaction?"
    },
    "b": {
      "d": 3,
      "q": "Ethanoic acid, a weak acid, is titrated with sodium hydroxide, a strong base. Which indicator is the best choice?",
      "opts": [
        "Phenolphthalein, which changes at about pH 8 to 10",
        "Methyl orange, which changes at about pH 3 to 4",
        "Either one, because the titration involves a strong base",
        "Neither one, because the equivalence point is at pH 7"
      ],
      "why": "The salt formed has an anion that is a weak base, so the pH at equivalence is above 7. Phenolphthalein changes colour in that range. Methyl orange changes well below it, so it would show an end point long before the equivalence point.",
      "clue": "Is the pH at equivalence above, below or at 7 for a weak acid and strong base?"
    }
  },
  "chem-titration-curves": {
    "title": "Titration curves",
    "card": [
      "A titration curve is a graph of pH (vertical axis) against the volume of solution added from the burette (horizontal axis). It shows how the pH of the flask changes during a titration.",
      "The curve has a steep, near vertical section. The equivalence point is the midpoint of this section, where the acid and base have reacted in exactly the amounts shown by the balanced equation.",
      "For a strong acid and a strong base, the equivalence point is at pH 7 at 25°C. For a weak acid titrated with a strong base, it is above 7, because the conjugate base of the weak acid makes the solution basic.",
      "A weak acid curve also has a flatter buffer region before the steep section. Here the flask holds both the weak acid and its conjugate base, so the pH changes only slowly as base is added."
    ],
    "remember": "The equivalence point is the middle of the steep rise. A weak acid curve also has a flat buffer region before it.",
    "a": {
      "q": "On a titration curve, which part shows the equivalence point?",
      "opts": [
        "The midpoint of the steep, near vertical section",
        "The starting pH before any solution is added",
        "The end of the graph at the largest volume added",
        "The middle of the flat region before the steep rise"
      ],
      "why": "At the equivalence point the acid and base have reacted in exactly the amounts in the balanced equation, and the pH changes sharply around it. The flat region before the rise is the buffer region of a weak acid, where the pH changes slowly.",
      "clue": "Look for where the pH jumps most for a tiny volume."
    },
    "b": {
      "d": 3,
      "q": "Ethanoic acid (a weak acid) is titrated with sodium hydroxide (a strong base). Why is the pH at the equivalence point above 7?",
      "opts": [
        "The ethanoate ion formed is a weak base",
        "Sodium hydroxide is added in excess at that point",
        "Ethanoic acid is not fully used up at that point",
        "The salt formed is always neutral in water"
      ],
      "why": "At equivalence all the ethanoic acid has reacted to form ethanoate ions. These are the conjugate base of a weak acid and react with water to make the solution basic. Excess sodium hydroxide is only present after the equivalence point, so it does not explain this pH.",
      "clue": "Think about what is in the flask once all the weak acid has reacted."
    }
  },
  "chem-buffers": {
    "title": "Buffers",
    "card": [
      "A buffer is a solution that resists a change in pH when a small amount of acid or base is added. It holds a weak acid and its conjugate base together in the same solution.",
      [
        "Weak acid",
        "reacts with any added base (OH⁻). This removes the extra base and keeps the pH close to where it was."
      ],
      [
        "Conjugate base",
        "reacts with any added acid (H⁺). This removes the extra acid and keeps the pH close to where it was."
      ],
      "An example is ethanoic acid with sodium ethanoate. Blood is also buffered, mainly by carbonic acid and hydrogencarbonate ions, so its pH stays in a narrow range. A buffer has a limit: a large amount of acid or base can use up one of the two partners and the pH then changes."
    ],
    "remember": "A buffer holds a weak acid and its conjugate base, so it can absorb small amounts of added base or acid.",
    "a": {
      "q": "Why can a mixture of ethanoic acid and sodium ethanoate act as a buffer?",
      "opts": [
        "It holds a weak acid and its conjugate base together",
        "It holds a strong acid and a strong base together",
        "It contains a lot of water, which dilutes added acid",
        "It contains a salt that blocks any added acid or base"
      ],
      "why": "Ethanoic acid reacts with added base and ethanoate ions react with added acid, so the pH changes little. A strong acid and a strong base would neutralise each other, not form a buffer.",
      "clue": "Which pair can deal with both added acid and added base?"
    },
    "b": {
      "d": 3,
      "q": "A buffer contains the weak acid HA and its conjugate base A⁻. A small amount of hydrochloric acid is added. What happens?",
      "opts": [
        "A⁻ reacts with the added H⁺ and the pH changes only slightly",
        "HA reacts with the added H⁺ and the pH changes only slightly",
        "The added H⁺ stays free and the pH falls sharply",
        "A⁻ reacts with the added H⁺ and the pH is fixed exactly"
      ],
      "why": "The conjugate base A⁻ removes added H⁺ by forming HA, so the pH changes only slightly. HA is the partner that reacts with added base, not acid. The pH is resisted, not held exactly fixed.",
      "clue": "Which partner in the buffer can accept H⁺?"
    }
  },
  "chem-naming-hydrocarbons": {
    "title": "Naming hydrocarbons",
    "card": [
      "An IUPAC name is built from parts. The stem shows the longest continuous carbon chain: meth (1), eth (2), prop (3), but (4), pent (5), hex (6).",
      "The ending shows the bonds in the chain: -ane for only single bonds, -ene for a double bond, -yne for a triple bond.",
      "A branch is a group attached to the main chain, named with a prefix such as methyl (one carbon) or ethyl (two carbons).",
      "Number the chain from the end that gives the branch or bond the lowest number. That number says where it sits. In 2-methylbutane, a methyl branch is on carbon 2 of a four-carbon chain."
    ],
    "remember": "Stem for chain length, ending for bonds, numbered prefix for branches.",
    "a": {
      "q": "A hydrocarbon has an unbranched chain of five carbons with only single bonds. What is its IUPAC name?",
      "opts": ["Pentane", "Butane", "Pentene", "Hexane"],
      "why": "Five carbons gives the stem pent, and only single bonds gives the ending -ane, so the name is pentane. Pentene is tempting, but -ene would mean a double bond.",
      "clue": "Count the carbons for the stem, then check the bonds."
    },
    "b": {
      "d": 3,
      "q": "A chain of four carbons has a methyl branch on carbon 2, and all bonds are single. Which name is correct?",
      "opts": ["2-methylbutane", "2-methylpropane", "3-methylbutane", "2-methylbutene"],
      "why": "The longest chain has four carbons (butane) and the methyl branch sits on carbon 2. 3-methylbutane is wrong because the chain is numbered from the end giving the lowest number. Butene would need a double bond.",
      "clue": "Number from the end that gives the branch the lower number."
    }
  },
  "chem-alkanes-alkenes-alkynes": {
    "title": "Alkanes, alkenes and alkynes",
    "card": [
      [
        "Alkane",
        "a hydrocarbon with only single bonds between carbon atoms. It is saturated, so each carbon holds as many hydrogen atoms as it can. Its names end in -ane, such as propane."
      ],
      [
        "Alkene",
        "a hydrocarbon with at least one carbon to carbon double bond. It is unsaturated. Its names end in -ene, such as propene."
      ],
      [
        "Alkyne",
        "a hydrocarbon with at least one carbon to carbon triple bond. It is also unsaturated. Its names end in -yne, such as propyne."
      ],
      "For chains with one double or triple bond and no rings, the general formulae are CnH2n+2 for alkanes, CnH2n for alkenes and CnH2n-2 for alkynes. A double or triple bond means fewer hydrogen atoms for the same number of carbons."
    ],
    "remember": "The bond between carbons sets the family: single is alkane, double is alkene, triple is alkyne.",
    "a": {
      "q": "Each of these is a chain hydrocarbon with no rings. Which one is saturated?",
      "opts": ["C6H14", "C6H12", "C6H10", "C3H4"],
      "why": "C6H14 fits CnH2n+2, so it is an alkane with only single bonds, which makes it saturated. C6H12 fits CnH2n, so it is an alkene with a double bond and is unsaturated.",
      "clue": "Which family is saturated, and what is its general formula?"
    },
    "b": {
      "d": 3,
      "q": "A chain hydrocarbon with one multiple bond has 5 carbon atoms and 8 hydrogen atoms. Which statement is correct?",
      "opts": [
        "It is an alkyne, because it fits CnH2n-2",
        "It is an alkene, because it fits CnH2n",
        "It is an alkane, because it fits CnH2n+2",
        "It is an alkane, because it has 5 carbon atoms"
      ],
      "why": "With n = 5, CnH2n-2 gives C5H8, so the formula fits an alkyne with a triple bond. An alkene with 5 carbons would be C5H10, and an alkane would be C5H12.",
      "clue": "Put n = 5 into each general formula and compare."
    }
  },
  "chem-isomers": {
    "title": "Isomers",
    "card": [
      "Isomers are compounds with the same molecular formula but different structural arrangements of atoms. Different structures mean different properties.",
      [
        "Chain isomers",
        "the carbon skeleton is arranged differently, such as a straight chain and a branched chain. Butane and 2-methylpropane are both C4H10."
      ],
      [
        "Position isomers",
        "the carbon skeleton is the same, but a double bond or other group sits at a different place. But-1-ene and but-2-ene are both C4H8."
      ],
      [
        "Functional group isomers",
        "the atoms form different functional groups. Ethanol and methoxymethane are both C2H6O, one with an OH group and one with an ether link."
      ]
    ],
    "remember": "Isomers share a molecular formula but differ in how the atoms are joined.",
    "a": {
      "q": "Which pair are isomers of each other?",
      "opts": ["Butane and 2-methylpropane", "Propane and propene", "Ethane and ethene", "Pentane and 2-methylpropane"],
      "why": "Butane and 2-methylpropane are both C4H10 but have different structures. Propane (C3H8) and propene (C3H6) have different molecular formulas, so they are not isomers even though their names look similar.",
      "clue": "First check that the molecular formulas match."
    },
    "b": {
      "d": 3,
      "q": "What type of isomers are CH2=CHCH2CH2CH3 and CH3CH=CHCH2CH3?",
      "opts": ["Position isomers", "Chain isomers", "Functional group isomers", "They are not isomers"],
      "why": "Both are C5H10 with an unbranched chain of five carbons, so the skeleton is the same. The double bond starts at carbon 1 in one and carbon 2 in the other, so they are position isomers. Chain isomers would need a different skeleton, such as a branched chain.",
      "clue": "Count the carbons, hydrogens and chain shape in each first."
    }
  },
  "chem-reactions-alkenes": {
    "title": "Reactions of alkenes",
    "card": [
      "An alkene has a C=C double bond. In an addition reaction, one bond of the C=C breaks and each of those carbons bonds to a new atom or group. All the atoms join into the product, so no by-product is given off.",
      "Alkenes add hydrogen (H2) to form an alkane, a halogen such as Br2 to form a dihaloalkane, a hydrogen halide such as HBr to form a haloalkane, and water to form an alcohol.",
      "Adding hydrogen needs a metal catalyst such as nickel or platinum. Adding water is called hydration and needs an acid catalyst. For example, ethene + Br2 gives 1,2-dibromoethane, and ethene + H2O gives ethanol.",
      "Bromine water is orange-brown. Shaken with an alkene, it turns colourless as the bromine adds across the double bond. A saturated alkane does not decolourise it quickly in the dark, so this is a test for C=C bonds."
    ],
    "remember": "Alkenes react by addition across C=C, and they decolourise bromine water.",
    "a": {
      "q": "Ethene reacts with hydrogen in the presence of a nickel catalyst. What is the product?",
      "opts": ["Ethane", "Ethanol", "Bromoethane", "Ethyne"],
      "why": "Hydrogen adds across the C=C bond, so the alkene becomes an alkane, ethane. Ethanol is the tempting wrong answer, because it forms when water adds, not hydrogen.",
      "clue": "Which molecule adds to the double bond, and what is left?"
    },
    "b": {
      "d": 3,
      "q": "A chemist shakes bromine water with two colourless liquids in the dark. Liquid X stays orange-brown. Liquid Y turns colourless. What does this show?",
      "opts": [
        "Y has a C=C bond and X does not",
        "X has a C=C bond and Y does not",
        "Both X and Y contain C=C bonds",
        "Neither X nor Y contains a C=C bond"
      ],
      "why": "Bromine water is decolourised when bromine adds across a C=C bond. Y changed colour, so it has a double bond, while X did not react. X is not the answer because staying orange-brown means no addition took place.",
      "clue": "Which liquid caused the colour to disappear?"
    }
  },
  "chem-properties-hydrocarbons": {
    "title": "Properties of hydrocarbons",
    "card": [
      "Hydrocarbons are non-polar molecules. The only forces between their molecules are weak dispersion forces.",
      "A longer chain has more electrons and more surface contact between molecules. So dispersion forces are stronger and the boiling point is higher.",
      "Small hydrocarbons such as methane are gases at room temperature. Longer chains are liquids, and very long chains are waxy solids.",
      "Water molecules are polar and hold each other with strong hydrogen bonds. Hydrocarbons cannot form these bonds with water, so they do not dissolve in it."
    ],
    "remember": "Longer chain, stronger dispersion forces, higher boiling point. Non-polar hydrocarbons do not mix with polar water.",
    "a": {
      "q": "Why does pentane have a higher boiling point than propane?",
      "opts": [
        "Its stronger dispersion forces need more energy to overcome",
        "Its covalent bonds between carbons are stronger",
        "It forms hydrogen bonds between its molecules",
        "It has polar bonds that attract other molecules"
      ],
      "why": "Pentane has a longer chain, so its dispersion forces between molecules are stronger and more energy is needed to separate them. Boiling does not break the covalent bonds inside the molecules, so stronger bonds are not the reason.",
      "clue": "Think about the forces between molecules, not inside them."
    },
    "b": {
      "d": 3,
      "q": "Hexane is added to water in a test tube and shaken. What is seen after it settles, and why?",
      "opts": [
        "Two layers, because hexane is non-polar and water is polar",
        "Two layers, because hexane is polar and water is non-polar",
        "One layer, because hexane has dispersion forces like water",
        "One layer, because hexane is a small molecule"
      ],
      "why": "Hexane is non-polar and cannot form hydrogen bonds with water, so it does not dissolve and the two liquids form separate layers. The option with polarity swapped gets the layers right but the reason wrong: the hydrocarbon is the non-polar one, and water is polar.",
      "clue": "What holds water molecules to each other, and can hexane join in?"
    }
  },
  "chem-alcohols": {
    "title": "Alcohols",
    "card": [
      "An alcohol has a hydroxyl group, OH, bonded to a carbon atom. Names end in -ol, such as ethanol and propan-2-ol.",
      "Primary alcohols have one or no other carbon atoms attached to the carbon holding the OH, as in methanol and propan-1-ol.",
      "Secondary alcohols have two other carbons attached to that carbon, as in propan-2-ol. Tertiary alcohols have three, as in 2-methylpropan-2-ol.",
      "Alcohols boil at higher temperatures than alkanes of similar size. Their OH groups form hydrogen bonds between molecules, which take more energy to break than the dispersion forces between alkane molecules."
    ],
    "remember": "Type depends on the carbon holding the OH. Hydrogen bonding raises boiling points.",
    "a": {
      "q": "Why does ethanol have a higher boiling point than ethane?",
      "opts": [
        "Ethanol molecules form hydrogen bonds with each other",
        "Ethanol molecules have covalent bonds and ethane has none",
        "Ethanol has a longer carbon chain than ethane",
        "Ethanol molecules break apart when heated, ethane does not"
      ],
      "why": "The OH group in ethanol forms hydrogen bonds between molecules, and these need more energy to break than the dispersion forces in ethane. Ethane also has covalent bonds, so that is not the difference.",
      "clue": "Think about the forces between molecules, not the bonds inside them."
    },
    "b": {
      "d": 3,
      "q": "Butan-2-ol has the structure CH3CH(OH)CH2CH3. How is it classified, and why?",
      "opts": [
        "Secondary, as the carbon with OH is bonded to two carbons",
        "Primary, as the OH group is near the end of the chain",
        "Secondary, as the molecule has two carbons after the OH",
        "Tertiary, as the carbon with OH has three bonds to atoms"
      ],
      "why": "The carbon holding the OH is bonded to one CH3 and one CH2CH3, so it is attached to two other carbons. That makes it secondary. Counting all carbons in the molecule, or the position in the chain, does not decide the type.",
      "clue": "Count only the carbon atoms attached to the carbon that holds the OH."
    }
  },
  "chem-reactions-alcohols": {
    "title": "Reactions of alcohols",
    "card": [
      [
        "Combustion",
        "Alcohols burn in plenty of oxygen to make carbon dioxide and water. The reaction releases energy, so alcohols such as ethanol can be used as fuels."
      ],
      [
        "Dehydration",
        "With heat and a concentrated sulfuric acid catalyst, an alcohol can lose water to form an alkene. For example, ethanol gives ethene."
      ],
      [
        "Oxidation",
        "An oxidising agent such as acidified dichromate can oxidise an alcohol. A primary alcohol forms an aldehyde, and with further oxidation a carboxylic acid."
      ],
      "A secondary alcohol is oxidised to a ketone. A tertiary alcohol is not oxidised under these conditions, because its carbon with the OH group has no hydrogen atom to lose."
    ],
    "remember": "Type decides oxidation: primary gives aldehyde then acid, secondary gives ketone, tertiary stays unchanged.",
    "a": {
      "q": "Propan-2-ol is a secondary alcohol. It is heated with acidified dichromate. What is the main organic product?",
      "opts": ["A ketone", "An aldehyde", "A carboxylic acid", "No reaction occurs"],
      "why": "A secondary alcohol is oxidised to a ketone. An aldehyde and then an acid form only from a primary alcohol, so those options are wrong. Reaction does occur, because the carbon with the OH group has a hydrogen atom to lose.",
      "clue": "Think about which type of alcohol propan-2-ol is."
    },
    "b": {
      "d": 3,
      "q": "Three alcohol samples are each heated with acidified dichromate. Sample X is primary, Y is secondary and Z is tertiary. Which result is correct?",
      "opts": [
        "Only Z shows no oxidation",
        "Only X is oxidised",
        "Only Y gives a ketone and an acid",
        "X and Z are oxidised but Y is not"
      ],
      "why": "A tertiary alcohol has no hydrogen on the carbon with the OH group, so Z is not oxidised. X and Y are both oxidised, so the claim that only X reacts is wrong. Y gives a ketone, not an acid, and X gives an aldehyde or acid.",
      "clue": "Which type has no hydrogen on the carbon bonded to OH?"
    }
  },
  "chem-aldehydes-ketones-carboxylic-acids": {
    "title": "Aldehydes, ketones and carboxylic acids",
    "card": [
      [
        "Aldehyde",
        "has a C=O group on the end carbon of the chain, so that carbon is also bonded to a hydrogen. Names end in -al, such as ethanal."
      ],
      [
        "Ketone",
        "has a C=O group on a carbon inside the chain, so that carbon is bonded to two other carbons. Names end in -one, such as propanone."
      ],
      [
        "Carboxylic acid",
        "has a COOH group on the end carbon of the chain. Names end in -oic acid, such as ethanoic acid."
      ],
      "Carboxylic acids are weak acids. They ionise only partly in water, giving a few H+ ions and leaving most molecules unchanged."
    ],
    "remember": "C=O in all three: aldehydes and ketones differ by where it sits, and COOH makes a weak acid.",
    "a": {
      "q": "Which compound is a ketone?",
      "opts": ["Propanone, CH3COCH3", "Propanal, CH3CH2CHO", "Propanoic acid, CH3CH2COOH", "Propan-1-ol, CH3CH2CH2OH"],
      "why": "Propanone has its C=O on the middle carbon, bonded to two other carbons, so it is a ketone. Propanal also has C=O, but it is on the end carbon with a hydrogen, which makes it an aldehyde.",
      "clue": "Look for C=O on a carbon inside the chain."
    },
    "b": {
      "d": 3,
      "q": "A student tests 0.1 M ethanoic acid and 0.1 M hydrochloric acid. The ethanoic acid has a higher pH. What is the best explanation?",
      "opts": [
        "Ethanoic acid ionises only partly in water",
        "Ethanoic acid has fewer carbon atoms than HCl",
        "Ethanoic acid ionises completely in water",
        "Ethanoic acid has no hydrogen that can be lost"
      ],
      "why": "A carboxylic acid is a weak acid, so only some molecules ionise and fewer H+ ions form. That gives a higher pH. Complete ionisation would give a lower pH, as it does for hydrochloric acid.",
      "clue": "Both solutions have the same concentration, so think about how much ionises."
    }
  },
  "chem-amines-amides": {
    "title": "Amines and amides",
    "card": [
      [
        "Amine",
        "an organic compound with a nitrogen atom bonded to carbon, as in the NH2 group of methylamine. The nitrogen has a lone pair of electrons."
      ],
      [
        "Weak base",
        "the lone pair on nitrogen can accept a H+ ion from water. This makes an ammonium ion and OH- ions, but only a small fraction of amine molecules react, so amines are weak bases."
      ],
      [
        "Amide",
        "formed when a carboxylic acid joins an amine. The OH of the acid and an H from the amine leave as water, and the carbon and nitrogen bond together."
      ],
      "The amide link is a C=O group bonded directly to a nitrogen atom. It is called the amide linkage."
    ],
    "remember": "Amines have a nitrogen lone pair that accepts H+, so they are weak bases. An acid plus an amine makes an amide and water.",
    "a": {
      "q": "Why does methylamine act as a weak base in water?",
      "opts": [
        "Its nitrogen lone pair accepts a H+ ion from water",
        "Its nitrogen atom donates a H+ ion to water",
        "Its carbon atoms accept a H+ ion from water",
        "Its nitrogen releases OH- ions from its own structure"
      ],
      "why": "The lone pair on nitrogen accepts H+ from water, which leaves OH- ions in solution. Only a small fraction of molecules react, so the base is weak. Donating H+ would make it an acid, not a base.",
      "clue": "A base accepts H+. Which atom has a lone pair?"
    },
    "b": {
      "d": 3,
      "q": "Ethanoic acid reacts with methylamine to form an organic product and water. Which statement about the organic product is correct?",
      "opts": [
        "It is an amide with a C=O group bonded to nitrogen",
        "It is an ester with a C=O group bonded to oxygen",
        "It is an amine with no C=O group in its structure",
        "It is an amide, and the water forms from the amine's N atom"
      ],
      "why": "A carboxylic acid joined to an amine makes an amide, with the C=O group bonded directly to nitrogen. An ester would form if the acid joined an alcohol, not an amine. The water comes from the OH of the acid and an H from the amine, not from the nitrogen atom.",
      "clue": "Which atom is bonded to the C=O carbon after the acid joins the amine?"
    }
  },
  "chem-esterification": {
    "title": "Esterification",
    "card": [
      "Esterification is the reaction of a carboxylic acid with an alcohol. It makes an ester and water: carboxylic acid + alcohol ⇌ ester + water.",
      "The reaction is slow and reversible. It needs a few drops of concentrated sulfuric acid as a catalyst, and heat under reflux. Reflux means the mixture is boiled with a condenser fitted, so vapours cool and drip back into the flask.",
      "The ester has a C=O group with an O joined to a carbon chain: the group is COO. The name has two parts. The first comes from the alcohol (methyl, ethyl) and the second from the acid (ethanoate, propanoate). Ethanoic acid and methanol make methyl ethanoate.",
      "Many esters are volatile and have sweet, fruity smells. This is why they are used in flavourings and perfumes. The ester is the product, so the mixture ends up with a fruity smell that the acid and alcohol alone do not have."
    ],
    "remember": "Acid + alcohol ⇌ ester + water, using sulfuric acid and reflux.",
    "a": {
      "q": "Which pair of reactants, heated under reflux with concentrated sulfuric acid, makes ethyl propanoate?",
      "opts": [
        "Propanoic acid and ethanol",
        "Ethanoic acid and propan-1-ol",
        "Propanoic acid and ethane",
        "Ethanoic acid and propanal"
      ],
      "why": "The first part of the name, ethyl, comes from the alcohol ethanol. The second part, propanoate, comes from propanoic acid. Ethanoic acid with propan-1-ol is tempting, but it makes propyl ethanoate, as the parts are swapped.",
      "clue": "The alcohol gives the first word of the ester name."
    },
    "b": {
      "d": 3,
      "q": "Jun heats ethanol and ethanoic acid in a flask with a few drops of concentrated sulfuric acid. He fits a condenser upright in the neck of the flask. What is the main reason for the condenser?",
      "opts": [
        "It returns vapours to the flask so none are lost",
        "It removes the water so the reaction goes to completion",
        "It stops the reaction from reversing",
        "It is the catalyst that makes the ester form"
      ],
      "why": "Under reflux, vapours of the reactants and product cool in the condenser and drip back into the flask, so the mixture can be heated for a long time without loss. The sulfuric acid is the catalyst, not the condenser. The condenser does not remove water.",
      "clue": "Think about what happens to hot vapours at the top of the flask."
    }
  },
  "chem-soaps-detergents": {
    "title": "Soaps and detergents",
    "card": [
      "A soap molecule has two ends. The head is charged and hydrophilic (water-loving). The tail is a long hydrocarbon chain and is hydrophobic (water-hating) but oil-loving.",
      "Grease and oil are non-polar, so they do not dissolve in water. The hydrocarbon tails of soap dissolve in the grease, while the charged heads stay in the water.",
      "Many soap molecules surround a drop of grease with their tails pointing in and their heads pointing out. This forms a tiny ball called a micelle.",
      "Micelles have a charged outer surface, so they repel each other and stay spread through the water. The grease is lifted off the surface and washed away."
    ],
    "remember": "Tails go into the grease, heads face the water, and the micelle carries the grease away.",
    "a": {
      "q": "Why does a soap molecule help water to remove grease from a plate?",
      "opts": [
        "Its tail dissolves in grease and its head dissolves in water",
        "Its head dissolves in grease and its tail dissolves in water",
        "It reacts with the grease to make a new gas",
        "It makes the grease polar so it dissolves in water"
      ],
      "why": "The non-polar tail mixes with the grease and the charged head mixes with water, so the grease is held in the water. The reverse arrangement is wrong because the charged head is hydrophilic and cannot enter non-polar grease.",
      "clue": "Match each end of the molecule to the substance it mixes with."
    },
    "b": {
      "d": 3,
      "q": "Soap is added to water containing a drop of oil. In the micelle that forms, which parts of the soap molecules face the water?",
      "opts": [
        "The charged heads, on the outside of the micelle",
        "The hydrocarbon tails, on the outside of the micelle",
        "The charged heads, in the centre with the oil",
        "The hydrocarbon tails, in the centre with the oil"
      ],
      "why": "The tails point inward into the oil, so the charged heads form the outer surface in contact with water. The option with the hydrocarbon tails on the outside is tempting, but it reverses the micelle: the tails are hydrophobic, so they avoid the water.",
      "clue": "Which end of a soap molecule is hydrophilic?"
    }
  },
  "chem-addition-polymers": {
    "title": "Addition polymers",
    "card": [
      "An addition polymer is made when many alkene monomers join into one long chain. Each monomer has a C=C double bond.",
      "One bond of each double bond opens, and the carbon atoms link to the next monomers. The double bond becomes a single bond in the chain.",
      "Nothing is lost in the reaction. The polymer has the same atoms as the monomers added together, so only one product forms.",
      "Ethene gives polyethylene. Chloroethene (vinyl chloride, CH2=CHCl) gives PVC, with a chlorine atom on every second carbon along the chain."
    ],
    "remember": "Addition polymers form when C=C bonds open and monomers join, with no atoms lost.",
    "a": {
      "q": "What must a monomer have to form an addition polymer?",
      "opts": [
        "A carbon to carbon double bond",
        "Two different functional groups",
        "A hydroxyl group at each end",
        "A carbon to carbon triple bond only"
      ],
      "why": "Addition polymerisation works by opening the C=C double bond so that monomers can link in a chain. Two functional groups are not needed here, because no small molecule is given off.",
      "clue": "Think about which bond opens."
    },
    "b": {
      "d": 3,
      "q": "Chloroethene, C2H3Cl, is polymerised to make PVC. A student has 1000 g of monomer. What mass of PVC can form, assuming complete reaction?",
      "opts": [
        "1000 g, because no atoms are lost",
        "Less than 1000 g, because water is lost",
        "Less than 1000 g, because HCl is lost",
        "More than 1000 g, because bonds are added"
      ],
      "why": "In addition polymerisation the monomers simply join, so all atoms stay in the polymer and the mass is unchanged. Mass is not lost as a small molecule, which is the case only when a different type of polymerisation occurs.",
      "clue": "Count the products of the reaction."
    }
  },
  "chem-condensation-polymers": {
    "title": "Condensation polymers",
    "card": [
      "A condensation polymer forms when monomers with two functional groups join, one link at a time. Each time two monomers link, a small molecule such as water is given off.",
      [
        "Polyamide",
        "made from a diamine and a dicarboxylic acid. The amine and carboxyl groups join to form an amide link (-CONH-), as in nylon."
      ],
      [
        "Polyester",
        "made from a diol and a dicarboxylic acid. The alcohol (hydroxyl) and carboxyl groups join to form an ester link (-COO-), as in the polyester PET."
      ],
      "Some monomers carry two different groups, such as an amino acid. Each of these can join to others in a chain and give off water at each link."
    ],
    "remember": "Condensation polymers join through two-group monomers, losing a small molecule at every link.",
    "a": {
      "q": "A diol reacts with a dicarboxylic acid to make a polymer. What are the products?",
      "opts": ["A polyester and water", "A polyamide and water", "A polyester only", "A polyamide and ammonia"],
      "why": "Hydroxyl and carboxyl groups form ester links, and water is lost at each link. A polyamide would need an amine group, and a polymer made with no small molecule would be an addition polymer.",
      "clue": "Name the link made by an alcohol group and an acid group."
    },
    "b": {
      "d": 2,
      "q": "Nylon is made from hexane-1,6-diamine and hexanedioic acid. Which link joins the monomers in the chain?",
      "opts": ["Amide link", "Ester link", "Carbon to carbon single bond only", "Ether link"],
      "why": "An amine group and a carboxyl group react to form an amide link, and water is given off. An ester link needs an alcohol (hydroxyl) group, which neither monomer has.",
      "clue": "Look at the names: diamine and acid."
    }
  },
  "chem-properties-uses-polymers": {
    "title": "Properties and uses of polymers",
    "card": [
      [
        "Chain length",
        "longer chains have stronger forces between them, so the polymer is stronger and has a higher melting point."
      ],
      [
        "Branching",
        "side chains stop the chains packing closely. The polymer is less dense, softer and more flexible, as in low density polyethylene (LDPE)."
      ],
      [
        "Linear chains",
        "pack closely and have stronger forces between them. The polymer is denser, stiffer and stronger, as in high density polyethylene (HDPE)."
      ],
      [
        "Cross-links",
        "covalent bonds between chains. Many cross-links lock the chains in place, so the polymer is hard, rigid and does not soften when heated."
      ]
    ],
    "remember": "Longer, closely packed or heavily cross-linked chains give stronger, stiffer, more heat resistant polymers.",
    "a": {
      "q": "Why is LDPE softer and more flexible than HDPE?",
      "opts": [
        "Its branched chains cannot pack closely",
        "Its chains are cross-linked together",
        "Its chains are always shorter than HDPE",
        "Its chains pack closely in rows"
      ],
      "why": "Branches keep the chains apart, so the forces between them are weaker and the chains slide more easily. Cross-links would make the polymer more rigid, not softer.",
      "clue": "Think about how side chains affect packing."
    },
    "b": {
      "d": 3,
      "q": "A maker needs a plastic handle for a pan that must not soften on a hot stove. Which polymer structure suits best?",
      "opts": [
        "Chains with many cross-links between them",
        "Short, branched chains with weak forces",
        "Long linear chains packed in close rows",
        "Long branched chains with no cross-links"
      ],
      "why": "Many cross-links are covalent bonds that hold the chains firmly in place, so heating does not let them slide past each other. Long linear chains are strong, but they are held only by forces between chains, so enough heat lets them soften.",
      "clue": "When a plastic softens, what are its chains doing?"
    }
  },
  "chem-chemists-analyse-substances": {
    "title": "Why chemists analyse substances",
    "card": [
      [
        "Qualitative",
        "analysis finds out what is in a substance. It answers the question: which substances or ions are present?"
      ],
      ["Quantitative", "analysis finds out how much of a substance is present, such as a mass or a concentration."],
      "Water suppliers test for harmful metals and bacteria. Food makers check for contaminants and for ingredients that must be listed on labels.",
      "Miners analyse ore to see which metals it holds and how much, so they can judge if mining it is worthwhile. Doctors test blood and urine to help diagnose illness and check treatment."
    ],
    "remember": "Analysis answers two questions: what is there, and how much of it is there.",
    "a": {
      "q": "A lab tests a river sample and reports that it contains 0.8 mg/L of lead. What does this result show?",
      "opts": [
        "What is present and how much of it",
        "Only which substance is present",
        "Only that the water is unsafe to drink",
        "Only how pure the whole sample is"
      ],
      "why": "Naming lead says what is present, and 0.8 mg/L says how much. A result with both is qualitative and quantitative. It does not say the water is unsafe by itself, because that needs a comparison with a safe limit.",
      "clue": "Look for both a name and an amount in the result."
    },
    "b": {
      "d": 3,
      "q": "A mining company drills a new site. A chemist first finds that the rock contains copper, then measures the percentage of copper in it. Which describes these two steps in order?",
      "opts": ["Qualitative, then quantitative", "Quantitative, then qualitative", "Both qualitative", "Both quantitative"],
      "why": "Finding that copper is present answers what is there, so it is qualitative. Measuring the percentage answers how much, so it is quantitative. Reversing them is tempting, but an amount cannot be measured until you know which substance to measure.",
      "clue": "One step names the substance. The other gives an amount."
    }
  },
  "chem-tests-ions": {
    "title": "Tests for ions",
    "card": [
      [
        "Flame test",
        "A metal ion gives a flame a set colour when heated. Sodium gives yellow-orange, potassium lilac, calcium orange-red and copper blue-green."
      ],
      [
        "Precipitation test",
        "Adding a solution that forms a solid, called a precipitate, with the suspected ion shows if it is present. Chloride gives a white precipitate with silver nitrate, and sulfate gives a white precipitate with barium nitrate."
      ],
      [
        "Carbonate test",
        "Carbonate fizzes with dilute acid, releasing carbon dioxide gas. Bubbling the gas through limewater turns it milky, which confirms it is carbon dioxide."
      ],
      "Some ions give the same result, so they can interfere. Dilute nitric acid is often added first to remove carbonate, which would otherwise also form a precipitate."
    ],
    "remember": "Match each test to the ion it detects, and remove interfering ions such as carbonate first.",
    "a": {
      "q": "A student adds silver nitrate solution to a clear solution, and a white precipitate forms. Which ion is the student testing for?",
      "opts": ["Chloride", "Sulfate", "Carbonate", "Sodium"],
      "why": "Silver nitrate gives a white precipitate with chloride ions. Sulfate is the tempting wrong answer because its precipitate is also white, but it is tested with barium nitrate.",
      "clue": "Match the test solution to the ion it detects."
    },
    "b": {
      "d": 3,
      "q": "An unknown white powder is added to dilute hydrochloric acid and it fizzes. Which further result confirms the powder contains carbonate?",
      "opts": [
        "The gas turns limewater milky",
        "The flame test colour is yellow-orange",
        "A white precipitate forms with silver nitrate",
        "A white precipitate forms with barium nitrate"
      ],
      "why": "Fizzing shows a gas is released, and limewater turning milky confirms the gas is carbon dioxide, which comes from carbonate. A white precipitate with silver nitrate is tempting, but it would come from the chloride in the hydrochloric acid, not from the powder.",
      "clue": "Which test identifies the gas itself?"
    }
  },
  "chem-gravimetric-analysis": {
    "title": "Gravimetric analysis",
    "card": [
      "Gravimetric analysis finds how much of a substance is in a sample by measuring mass. The substance is turned into a solid precipitate that is pure and has a known formula.",
      "The steps are: add excess reagent so all of the ion precipitates, filter the solid, wash it, dry it and weigh it. Drying until the mass stops changing shows that all the water has gone.",
      "The mass of the precipitate is converted to moles using its molar mass. The mole ratio in the balanced equation then gives the moles of the ion in the sample.",
      "For example, chloride ions can be precipitated as silver chloride, AgCl, by adding excess silver nitrate. One mole of AgCl contains one mole of chloride ions."
    ],
    "remember": "Precipitate all of the ion, dry and weigh it, then use moles to work back to the amount in the sample.",
    "a": {
      "q": "Why is the precipitate dried until its mass stops changing before the final weighing?",
      "opts": [
        "So that no water is left to add extra mass",
        "So that the precipitate fully dissolves again",
        "So that more precipitate forms during drying",
        "So that the molar mass of the precipitate drops"
      ],
      "why": "A wet precipitate would weigh more than the solid alone, so the amount of ion would seem too high. A steady mass shows the water has gone. Drying does not make more precipitate or change its molar mass.",
      "clue": "Think about what else could be adding mass to the solid."
    },
    "b": {
      "d": 3,
      "q": "A 50.0 mL water sample from a bore in Broken Hill is treated with excess silver nitrate. The dried AgCl precipitate has a mass of 0.287 g (molar mass 143.4 g/mol). How many moles of chloride ions were in the sample?",
      "opts": ["0.00200 mol", "0.00100 mol", "0.00400 mol", "0.0412 mol"],
      "why": "Moles of AgCl = 0.287 ÷ 143.4 = 0.00200 mol. The ratio of AgCl to Cl⁻ is 1 to 1, so the sample held 0.00200 mol of chloride. Halving the answer would wrongly treat the ratio as 2 to 1.",
      "clue": "Divide the mass by the molar mass, then check the mole ratio."
    }
  },
  "chem-atomic-absorption-spectroscopy": {
    "title": "Atomic absorption spectroscopy",
    "card": [
      "Atomic absorption spectroscopy (AAS) finds the concentration of a metal in a sample. It can measure very low concentrations, such as traces of lead in water.",
      "The sample is turned into a cloud of free atoms, usually in a flame. A lamp containing the metal being tested shines light of one set wavelength through the cloud.",
      "Atoms of that metal absorb some of this light. The more atoms there are, the more light is absorbed.",
      "The absorbance of the sample is compared with the absorbance of standard solutions of known concentration. This gives the concentration in the sample. AAS was developed in Australia, by Alan Walsh and his team at CSIRO."
    ],
    "remember": "AAS: more atoms in the flame means more light absorbed, so absorbance shows concentration.",
    "a": {
      "q": "In AAS, what is measured to find the concentration of a metal?",
      "opts": [
        "How much light of a set wavelength the atoms absorb",
        "How much mass of precipitate the metal forms",
        "The colour the metal gives to a flame",
        "How much heat the sample gives out"
      ],
      "why": "Free atoms of the metal absorb light of a set wavelength, and more atoms absorb more light. Flame colour is a different test, and AAS does not weigh a precipitate.",
      "clue": "The name of the method says what the atoms do to the light."
    },
    "b": {
      "d": 2,
      "q": "A lab tests river water for copper using AAS. Sample A absorbs more light than sample B at the copper wavelength. What does this show?",
      "opts": [
        "Sample A has a higher copper concentration",
        "Sample A has a lower copper concentration",
        "Sample A contains no other metals",
        "Sample B has more light shining through the lamp"
      ],
      "why": "More absorbed light means more copper atoms in the light path, so sample A has more copper. The reverse would mean less absorption, not more.",
      "clue": "More atoms in the flame means more light taken in."
    }
  },
  "chem-colorimetry-uv-visible-spectroscopy": {
    "title": "Colorimetry and UV-visible spectroscopy",
    "card": [
      "A coloured solution absorbs some of the light passing through it. For dilute solutions, absorbance rises in proportion to concentration.",
      "A colorimeter measures absorbance using visible light of one chosen colour. A UV-visible spectrometer does the same job across ultraviolet and visible wavelengths.",
      "Measure the absorbance of several standards, which are solutions of known concentration. Plot absorbance against concentration to make a calibration curve, then read the unknown's concentration from its absorbance.",
      "The curve is only reliable within the range of the standards. If the unknown's absorbance is too high, dilute it, remeasure, then multiply by the dilution factor."
    ],
    "remember": "Standards of known concentration give a curve that turns a measured absorbance into a concentration.",
    "a": {
      "q": "Why is a calibration curve needed to find the concentration of a copper(II) sulfate solution by colorimetry?",
      "opts": [
        "It links absorbance to concentration using known standards",
        "It shows the mass of precipitate formed from the copper ions",
        "It removes the colour of the solution before it is measured",
        "It counts the atoms of copper in the sample directly"
      ],
      "why": "A colorimeter only measures absorbance. Standards of known concentration give a curve that links absorbance to concentration. The precipitate option describes gravimetric analysis, which is a different method.",
      "clue": "The instrument measures absorbance, not concentration."
    },
    "b": {
      "d": 3,
      "q": "Sam measures the absorbance of five standard solutions and plots a calibration curve. His water sample from a dam has an absorbance higher than any standard. What is the best next step?",
      "opts": [
        "Dilute the sample, remeasure, and allow for the dilution",
        "Read the concentration by extending the curve far upwards",
        "Use the highest standard's concentration as the answer",
        "Add more standards that are more dilute than the rest"
      ],
      "why": "The curve is only reliable between the standards measured. Diluting brings the absorbance inside that range, and multiplying by the dilution factor gives the sample's concentration. Extending the curve assumes the line keeps going the same way, which the standards do not show.",
      "clue": "Is the sample's reading inside the range the curve covers?"
    }
  },
  "chem-chemical-tests-organic-compounds": {
    "title": "Chemical tests for organic compounds",
    "card": [
      "A functional group is the part of an organic molecule that gives it its typical reactions. A simple test on a small sample can show which groups are likely present.",
      [
        "Bromine water",
        "Orange-brown bromine water is shaken with the sample. If it quickly turns colourless, the molecule is likely unsaturated, with a C=C or C≡C bond. A saturated alkane does not decolourise it quickly in the dark."
      ],
      [
        "Sodium carbonate",
        "Sodium carbonate is added to the sample. If bubbles of carbon dioxide gas form, an acid such as a carboxylic acid is likely present. Alcohols do not give bubbles."
      ],
      "A positive result suggests a group but does not prove it, as some other groups can react too. Using several tests on one sample, and ruling groups in or out, narrows down what the compound could be."
    ],
    "remember": "Bromine water losing its colour points to a C=C bond. Fizzing with sodium carbonate points to a carboxylic acid.",
    "a": {
      "q": "A student adds orange-brown bromine water to a liquid, and the mixture quickly turns colourless. What does this suggest?",
      "opts": [
        "The liquid is likely unsaturated",
        "The liquid likely has a carboxylic acid group",
        "The liquid is likely a saturated hydrocarbon",
        "The liquid likely has no functional group"
      ],
      "why": "Bromine adds across a C=C or C≡C bond, so the orange-brown colour disappears, which points to an unsaturated compound. A saturated hydrocarbon would leave the colour in place in the dark, so it is not the answer.",
      "clue": "What kind of bond makes bromine water lose its colour?"
    },
    "b": {
      "d": 3,
      "q": "Sample X is a colourless liquid. It gives bubbles when sodium carbonate is added, and bromine water stays orange-brown. Which compound could X be?",
      "opts": ["Propanoic acid, CH3CH2COOH", "Propenoic acid, CH2=CHCOOH", "Propan-1-ol, CH3CH2CH2OH", "Propene, CH3CH=CH2"],
      "why": "Bubbles suggest a carboxylic acid, and no colour change suggests there is no C=C bond, so propanoic acid fits. Propenoic acid is the tempting option, but its C=C bond would decolourise bromine water.",
      "clue": "Use both results: one test rules a group in, the other rules one out."
    }
  },
  "chem-mass-spectrometry": {
    "title": "Mass spectrometry",
    "card": [
      "In a mass spectrometer, molecules are hit with high-energy electrons. This knocks an electron off each molecule and makes a positive ion, called the molecular ion.",
      "The molecular ion often breaks into smaller fragments. Only fragments that are positive ions reach the detector. The spectrum plots the mass-to-charge ratio (m/z) against abundance. Most ions carry a charge of +1, so m/z is the ion's mass.",
      "The peak with the highest m/z is usually the molecular ion. Its m/z value equals the molar mass of the molecule, in g/mol.",
      "The gaps between peaks show which pieces were lost. A loss of 15 fits a CH3 group, and a loss of 29 fits a C2H5 group. The pattern of fragments gives clues to the structure."
    ],
    "remember": "The molecular ion peak gives the molar mass. The fragment peaks give clues to the structure.",
    "a": {
      "q": "A compound has a mass spectrum with its highest m/z peak at 72. What does this peak most likely show?",
      "opts": [
        "The molar mass of the compound is 72 g/mol",
        "The compound has 72 carbon atoms",
        "The compound has 72 hydrogen atoms",
        "The compound has a CH3 group of mass 72"
      ],
      "why": "The peak with the highest m/z is usually the molecular ion, and its m/z equals the molar mass. It does not count atoms. A CH3 group has a mass of 15, so a loss of 15 would show a CH3 group, not a peak at 72.",
      "clue": "The molecular ion has lost only one electron, so its mass is the mass of the whole molecule."
    },
    "b": {
      "d": 3,
      "q": "A compound has a molecular ion peak at m/z 58 and a strong fragment peak at m/z 43. What does the fragment peak suggest?",
      "opts": [
        "The molecule lost a CH3 group of mass 15",
        "The molecule lost a C2H5 group of mass 29",
        "The compound has a molar mass of 43 g/mol",
        "The molecule lost a hydrogen atom of mass 1"
      ],
      "why": "58 minus 43 is 15, which matches a lost CH3 group. A loss of 29 would leave a fragment at 29, not 43. The molar mass is given by the molecular ion at 58, not by a fragment peak.",
      "clue": "Subtract the fragment m/z from the molecular ion m/z, then match the difference to a group."
    }
  },
  "chem-infrared-spectroscopy": {
    "title": "Infrared spectroscopy",
    "card": [
      "In infrared (IR) spectroscopy, a sample absorbs infrared light. Each type of bond vibrates and absorbs within its own range of wavenumbers, measured in cm⁻¹.",
      "The spectrum plots how much light passes through against wavenumber. Each absorption shows as a peak pointing down, so a peak means a bond of that type is present.",
      "Useful peaks: a strong, sharp C=O peak at about 1680 to 1750 cm⁻¹. A broad O-H peak from an alcohol at about 3230 to 3550 cm⁻¹. A very broad O-H peak from a carboxylic acid at about 2500 to 3000 cm⁻¹. An N-H peak at about 3300 to 3500 cm⁻¹.",
      "Peaks are matched to a data table to find which functional groups are present. IR does not give the molar mass or the full structure."
    ],
    "remember": "Each bond absorbs within its own range of wavenumbers, so peaks point to functional groups.",
    "a": {
      "q": "An IR spectrum of an unknown compound has a strong, sharp peak at about 1700 cm⁻¹. What does this show?",
      "opts": [
        "A C=O bond is present",
        "An O-H bond is present",
        "A C-H bond is absent",
        "The molar mass is about 1700 g/mol"
      ],
      "why": "A strong, sharp peak near 1700 cm⁻¹ falls in the C=O range. An O-H bond would give a broad peak at a higher wavenumber. IR does not measure molar mass.",
      "clue": "Match the wavenumber to a bond in the data table."
    },
    "b": {
      "d": 3,
      "q": "An IR spectrum of a liquid has a strong peak at about 1700 cm⁻¹ and a very broad peak from about 2500 to 3000 cm⁻¹. Which compound fits best?",
      "opts": ["Ethanoic acid", "Ethanol", "Ethyl ethanoate", "Propanone"],
      "why": "The C=O peak and the very broad O-H peak together show a carboxylic acid, so ethanoic acid fits. Propanone and ethyl ethanoate have C=O but no O-H. Ethanol has a broad O-H peak but no C=O peak.",
      "clue": "Which compound has both a C=O bond and an O-H bond?"
    }
  },
  "chem-carbon-13-nmr": {
    "title": "Carbon-13 NMR",
    "card": [
      "In carbon-13 NMR, carbon-13 nuclei in a molecule absorb radio waves in a strong magnetic field. The spectrum shows one peak for each different carbon environment.",
      "Carbons are in the same environment when they are bonded in the same way and the molecule is symmetrical about them. These carbons give one shared peak.",
      "So the number of peaks equals the number of different kinds of carbon, not the total number of carbons. Propane, CH3CH2CH3, has three carbons but two peaks, because the two end carbons are equivalent.",
      "The position of a peak is its chemical shift. It depends on what the carbon is bonded to, so carbons next to an oxygen appear at a different shift from carbons in a plain chain."
    ],
    "remember": "One peak for each kind of carbon: count environments, not carbon atoms.",
    "a": {
      "q": "A molecule has four carbon atoms, and its carbon-13 NMR spectrum shows three peaks. What does this tell you?",
      "opts": [
        "Two of the carbons are in the same environment",
        "One carbon gives no signal in the spectrum",
        "Three of the carbons are bonded to oxygen",
        "The molecule must contain three double bonds"
      ],
      "why": "Each different carbon environment gives one peak, so four carbons with three peaks means two carbons share an environment. A carbon does not go missing from the spectrum: carbons that look alike simply share a peak.",
      "clue": "Peaks count environments, not atoms."
    },
    "b": {
      "d": 3,
      "q": "Ethanol, CH3CH2OH, and methoxymethane, CH3OCH3, are isomers. How many peaks would each show in a carbon-13 NMR spectrum?",
      "opts": [
        "Ethanol has two peaks and methoxymethane has one",
        "Ethanol has one peak and methoxymethane has two",
        "Both have two peaks, as both have two carbons",
        "Both have one peak, as both have the same formula"
      ],
      "why": "In ethanol one carbon is bonded to the oxygen and the other is not, so there are two environments. In methoxymethane both CH3 groups are attached to the same oxygen in the same way, so they are equivalent and give one peak. The same number of carbons does not mean the same number of peaks.",
      "clue": "Draw each molecule and ask if the two carbons look identical."
    }
  },
  "chem-proton-nmr": {
    "title": "Proton NMR",
    "card": [
      "Proton NMR looks at the hydrogen atoms in a molecule. Hydrogens in the same chemical environment give one peak. Hydrogens in different environments give separate peaks.",
      "The area under a peak (often shown as an integration value) is in proportion to the number of hydrogens in that environment. A peak with twice the area is from twice as many hydrogens.",
      "A peak is split by hydrogens on the neighbouring carbon atoms. A peak with n neighbouring hydrogens splits into n + 1 lines: 0 gives a singlet, 1 a doublet, 2 a triplet and 3 a quartet.",
      "Chemists combine the number of peaks, their areas and their splitting to work out the structure. For example, ethanol, CH3CH2OH, has three environments: CH3, CH2 and OH."
    ],
    "remember": "Peaks count the kinds of hydrogen, area counts how many, and splitting counts the neighbours.",
    "a": {
      "q": "A peak in a proton NMR spectrum is a triplet. What does this tell you about that hydrogen environment?",
      "opts": [
        "It has 2 hydrogens on the neighbouring carbon atoms",
        "It contains 3 hydrogens",
        "It has 3 hydrogens on the neighbouring carbon atoms",
        "It has 2 hydrogens in the same environment"
      ],
      "why": "A peak splits into n + 1 lines, where n is the number of neighbouring hydrogens. A triplet has 3 lines, so n is 2. The tempting option is 3 neighbours, but that would give a quartet, and the number of hydrogens in the peak itself comes from its area.",
      "clue": "Lines = neighbouring hydrogens + 1."
    },
    "b": {
      "d": 3,
      "q": "A compound has the formula C4H8O2. Its proton NMR spectrum shows 3 peaks with area ratio 3:2:3. The 2-hydrogen peak is a quartet. How many hydrogens are on the neighbouring carbon atoms?",
      "opts": ["3", "2", "4", "8"],
      "why": "A quartet has 4 lines, so n + 1 = 4 and n = 3. The neighbouring carbon atoms carry 3 hydrogens in total. The 2 is the number of hydrogens in the quartet itself, which comes from its area, not its splitting.",
      "clue": "Use the number of lines in the quartet, not its area."
    }
  },
  "chem-designing-chemical-synthesis": {
    "title": "Designing a chemical synthesis",
    "card": [
      "A synthesis is a plan to make a wanted product from starting materials. The designer chooses the reactants, the conditions and the number of steps.",
      "Reactants are chosen so that the product can be made by known reactions. Conditions such as temperature, pressure, catalyst and solvent are chosen to give a useful rate and a good amount of product.",
      "Each extra step usually lowers the overall amount of product, because some is lost at every step. Fewer steps often means less product lost, less time and lower cost.",
      "The designer weighs yield, purity, cost and safety together. Improving one can worsen another, such as a costly catalyst that raises yield or a hazardous reagent that is cheap."
    ],
    "remember": "A good synthesis is a trade-off: yield, purity, cost and safety are balanced, not maximised one at a time.",
    "a": {
      "q": "Why does a chemist usually prefer a synthesis with fewer steps?",
      "opts": [
        "Some product is lost at each step, so fewer steps keep more",
        "Each step always makes the product purer than before",
        "Fewer steps means the reactants can be less pure",
        "Fewer steps removes the need to consider safety"
      ],
      "why": "Some product is lost at every step, so the overall amount usually falls as steps are added. Purity can improve with a purification step, but a step does not always do this, and the card does not say it does.",
      "clue": "Think about what happens to the amount of product at each step."
    },
    "b": {
      "d": 3,
      "q": "Tariq's team can make a medicine by a cheap route with a hazardous reagent, or a dearer route with a safer reagent. Which describes the design decision?",
      "opts": [
        "They balance cost and safety along with yield and purity",
        "They pick the cheapest route, since cost matters most",
        "They pick the longer route, as more steps keep more product",
        "They ignore yield once the safer reagent is chosen"
      ],
      "why": "The designer considers yield, purity, cost and safety together, and improving one can worsen another. Choosing on cost alone leaves out the hazard of the cheap reagent, which is one of the factors in the trade-off.",
      "clue": "Could one factor on its own decide the best route?"
    }
  },
  "chem-yield-purity": {
    "title": "Yield and purity",
    "card": [
      [
        "Percentage yield",
        "the actual mass of product made, divided by the theoretical (greatest possible) mass, then × 100. The theoretical mass is worked out from the balanced equation and the limiting reagent."
      ],
      [
        "Purity",
        "the share of a sample that is the wanted substance. Purity (%) = mass of wanted substance ÷ mass of sample × 100."
      ],
      "Yield and purity are separate measures. A high yield can still be impure, if the mass collected includes by-products or leftover reactants.",
      "Yield can be lost through incomplete reactions, side reactions and product left behind during separation. Purification, such as recrystallisation, can raise purity but usually lowers yield."
    ],
    "remember": "Yield asks how much was made compared with the most possible. Purity asks how much of the sample is the wanted substance.",
    "a": {
      "q": "A student collects 4.2 g of a product. The balanced equation shows the most that could form is 6.0 g. What is the percentage yield?",
      "opts": ["70%", "143%", "42%", "30%"],
      "why": "Percentage yield = actual ÷ theoretical × 100 = 4.2 ÷ 6.0 × 100 = 70%. Turning the fraction upside down gives 143%, but a yield here cannot be above 100% when the product is pure and the theoretical mass is the most possible.",
      "clue": "Actual mass goes on top, theoretical mass goes below."
    },
    "b": {
      "d": 3,
      "q": "Dev makes 9.0 g of crystals. Tests show only 7.2 g of the crystals is the wanted compound. What is the purity of the sample?",
      "opts": ["80%", "125%", "20%", "72%"],
      "why": "Purity = wanted substance ÷ mass of sample × 100 = 7.2 ÷ 9.0 × 100 = 80%. The 72% option is tempting, but it just uses the digits of 7.2 and ignores the sample mass.",
      "clue": "Compare the wanted substance with the whole sample, not with a theoretical mass."
    }
  },
  "chem-sustainability-industry": {
    "title": "Sustainability in industry",
    "card": [
      "Green chemistry is a way of designing chemical products and processes to reduce harm to people and the environment. It aims to prevent problems at the start, rather than clean them up afterwards.",
      [
        "Less waste",
        "a process is designed so fewer unwanted by-products are made. This means less waste to treat or dispose of, and less raw material lost."
      ],
      [
        "Safer chemicals",
        "hazardous reactants, solvents and products are replaced with less harmful ones where possible. This lowers risk to workers and the environment."
      ],
      [
        "Renewable feedstocks and lower energy",
        "starting materials come from sources that are replenished, such as plants, rather than finite ones such as crude oil. Lower temperatures and pressures, or a catalyst, mean less energy is needed."
      ]
    ],
    "remember": "Green chemistry cuts harm by design: less waste, safer chemicals, renewable feedstocks and less energy.",
    "a": {
      "q": "A company changes a process so it runs at a lower temperature and pressure. Which green chemistry aim does this best meet?",
      "opts": ["Lower energy use", "Less waste", "Safer chemicals", "Renewable feedstocks"],
      "why": "Lower temperature and pressure mean less energy is needed to run the process. It does not by itself change the starting materials or how hazardous the chemicals are, so the other aims are not the main one met.",
      "clue": "Think about what heating and compressing use up."
    },
    "b": {
      "d": 3,
      "q": "Dev's company makes a plastic from crude oil. It switches to making the same plastic from sugar cane waste. Which green chemistry aim does this meet?",
      "opts": ["Using a renewable feedstock", "Using a safer chemical", "Producing less waste", "Using less energy"],
      "why": "Sugar cane waste is a plant source that can be replaced, while crude oil is finite. The change is to the starting material. Nothing in the case says the process makes less waste or is less hazardous, so those aims cannot be assumed.",
      "clue": "Focus on where the starting material comes from."
    }
  },
  "chem-industrial-process": {
    "title": "An industrial process",
    "card": [
      "The Haber process makes ammonia: N2(g) + 3H2(g) ⇌ 2NH3(g). The forward reaction is exothermic and 4 mol of gas become 2 mol.",
      "By Le Chatelier's principle, a lower temperature and a higher pressure shift the equilibrium towards ammonia. This raises the yield at equilibrium.",
      "A low temperature makes the reaction too slow. So industry uses about 400 to 500 °C with an iron-based catalyst. The catalyst raises the rate, is not used up and does not change the yield.",
      "Very high pressure gives a better yield but needs costly equipment and more energy. So a high but not extreme pressure is used. Ammonia is removed as a liquid and unreacted gases are recycled."
    ],
    "remember": "An industrial process is a compromise: conditions are chosen to balance rate, yield and cost.",
    "a": {
      "q": "Why is the Haber process run at about 400 to 500 °C and not at a much lower temperature?",
      "opts": [
        "The reaction would be too slow",
        "The yield at equilibrium would fall",
        "The catalyst would lower the yield",
        "The forward reaction would turn endothermic"
      ],
      "why": "Lowering the temperature favours the exothermic forward reaction, so the equilibrium yield would rise. But the rate becomes too slow to be useful, so a moderately high temperature is a compromise. The yield does not fall at lower temperatures.",
      "clue": "Temperature affects both the position of equilibrium and the speed."
    },
    "b": {
      "d": 3,
      "q": "A plant makes ammonia by the Haber process. Its engineers raise the pressure from 200 atm to a much higher value. Which is the most likely drawback?",
      "opts": [
        "Equipment and energy costs rise sharply",
        "The equilibrium shifts away from ammonia",
        "The catalyst is used up in the reaction",
        "The forward reaction becomes endothermic"
      ],
      "why": "Very high pressure needs stronger, costlier equipment and more energy to compress the gases. Higher pressure still shifts the equilibrium towards ammonia, because fewer gas moles are on the product side, so the yield is not the problem.",
      "clue": "Apply Le Chatelier's principle first, then look beyond equilibrium."
    }
  }
};
