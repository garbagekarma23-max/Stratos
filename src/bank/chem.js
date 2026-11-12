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
        "Its salt and water are joined in one fixed ratio by bonds",
        "It is made of only one type of atom joined together",
        "It cannot be split up by any physical means such as boiling"
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
        "Both have the same number of occupied energy levels",
        "Both atoms have the same total number of electrons",
        "Both have a full outer energy level of eight electrons"
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
        "Ethane has hydrogen bonds, because it has more C and H atoms",
        "Ethane has stronger dipole-dipole forces, as it is polar",
        "Ethane has stronger covalent bonds, which break less easily"
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
        "Graphite has mobile ions in its layers, but diamond has none",
        "Graphite has four bonds per atom, but diamond has only three",
        "Graphite is a different element from diamond, so it conducts"
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
        "Each single reactant must have the same mass as each product",
        "Molecules are not created or destroyed, so counts must match",
        "Subscripts in each formula must be the same on both sides"
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
        "They both have the same mass in grams",
        "Oxygen has more particles because it is O2",
        "Carbon has more particles as atoms are small"
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
    "cardFigs": {
      "1": {
        "kind": "graph",
        "alt": "Boyle's law: pressure against volume for a fixed amount of gas at constant temperature. The curve falls as the volume rises, because pressure is inversely proportional to volume. Halving the volume from 4 L to 2 L doubles the pressure from 100 kPa to 200 kPa.",
        "x": {"min": 0, "max": 11, "label": "Volume (L)", "step": 2},
        "y": {"min": 0, "max": 250, "label": "Pressure (kPa)", "step": 50},
        "items": [
          {"type": "fn", "id": "p", "expr": "\\frac{400}{x}", "domain": [1.7, 10.5]},
          {"type": "guide", "at": [2, 200], "xLabel": "", "yLabel": ""},
          {"type": "point", "at": [2, 200], "on": ["p"]},
          {"type": "guide", "at": [4, 100], "xLabel": "", "yLabel": ""},
          {"type": "point", "at": [4, 100], "on": ["p"]}
        ]
      },
      "2": {
        "kind": "graph",
        "alt": "Charles's law: volume against temperature in kelvin for a fixed amount of gas at constant pressure. The graph is a straight line through the origin, so volume is directly proportional to the kelvin temperature. The line meets zero volume at 0 K, absolute zero.",
        "x": {"min": 0, "max": 450, "label": "Temperature (K)", "step": 100},
        "y": {"min": 0, "max": 30, "label": "Volume (L)", "step": 5},
        "items": [{"type": "fn", "id": "v", "expr": "0.06x", "domain": [0, 420]}]
      }
    },
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
      "opts": [
        "A salt, water and carbon dioxide",
        "A salt and hydrogen gas only",
        "A salt and water, with no gas given off",
        "A salt, water and oxygen gas"
      ],
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
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Energy profiles for the same reaction without a catalyst (dashed) and with a catalyst (solid). Both start at the same reactants' level and end at the same products' level, but the catalysed path has a lower peak, so it has a lower activation energy. An arrow points down from the higher peak to the lower one.",
        "x": {"min": 0, "max": 12, "label": "Progress of reaction"},
        "y": {"min": 0, "max": 11.5, "label": "Energy"},
        "items": [
          {
            "type": "curve",
            "id": "n",
            "points": [[0, 4], [3, 4], [6, 9], [9, 2], [12, 2]],
            "smooth": true,
            "label": "no catalyst",
            "style": "dash",
            "labelAt": 6,
            "pos": "above"
          },
          {
            "type": "curve",
            "id": "c",
            "points": [[0, 4], [3, 4], [6, 6.2], [9, 2], [12, 2]],
            "smooth": true,
            "label": "with catalyst",
            "labelAt": 7.8,
            "pos": "below-left"
          },
          {"type": "arrow", "from": [6, 8.7], "to": [6, 6.5]},
          {"type": "text", "at": [1.5, 4], "label": "reactants", "pos": "below"},
          {"type": "text", "at": [10.5, 2], "label": "products", "pos": "below"}
        ]
      }
    },
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
        "Iron forms on the copper strip only",
        "Iron forms on both of the strips",
        "Iron forms on neither of the strips"
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
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "An energy profile diagram: energy against the progress of the reaction. The reactants' level is at the start and the products' level, lower, is at the end, with a peak between them. The activation energy is the height from the reactants' level up to the top of the peak. ΔH is measured from the reactants' level down to the products' level, so here it is negative.",
        "x": {"min": 0, "max": 12, "label": "Progress of reaction"},
        "y": {"min": 0, "max": 11.5, "label": "Energy"},
        "items": [
          {"type": "curve", "id": "e", "points": [[0, 4], [3, 4], [6, 9], [9, 2], [12, 2]], "smooth": true},
          {"type": "guide", "at": [6, 9], "yLabel": ""},
          {"type": "guide", "at": [12, 4], "yLabel": ""},
          {"type": "arrow", "from": [1, 4], "to": [1, 9]},
          {"type": "text", "at": [2.6, 9], "label": "activation energy", "pos": "above"},
          {"type": "arrow", "from": [11, 4], "to": [11, 2], "label": "ΔH", "pos": "left"},
          {"type": "text", "at": [1.6, 4], "label": "reactants", "pos": "below"},
          {"type": "text", "at": [10.3, 2], "label": "products", "pos": "below"}
        ]
      }
    },
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
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "A titration curve for a weak acid titrated with a strong base: pH against the volume of base added. The pH starts near 3, rises slowly through a flatter buffer region, then rises steeply near 25 mL. The equivalence point is the middle of this steep section, at about pH 8.7, above 7. After it, the curve levels off near pH 12.5.",
        "x": {"min": 0, "max": 50, "label": "Base added (mL)", "step": 10},
        "y": {"min": 0, "max": 14, "label": "pH", "step": 2},
        "items": [
          {
            "type": "curve",
            "id": "t",
            "points": [
              [0, 2.88],
              [2, 3.7],
              [5, 4.16],
              [10, 4.58],
              [12.5, 4.76],
              [15, 4.94],
              [20, 5.36],
              [23, 5.82],
              [24, 6.14],
              [24.8, 6.85],
              [25, 8.72],
              [25.2, 10.6],
              [26, 11.29],
              [30, 11.96],
              [40, 12.36],
              [50, 12.52]
            ],
            "smooth": true
          },
          {"type": "point", "at": [25, 8.72], "on": ["t"], "label": "equivalence point", "pos": "right"},
          {"type": "text", "at": [12.5, 4.6], "label": "buffer region", "pos": "below-right"}
        ]
      }
    },
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
        "Its stronger covalent bonds need more energy to break apart",
        "Its stronger hydrogen bonds between molecules need more heat",
        "Its polar bonds attract other molecules and need more heat"
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
        "How much mass of precipitate the metal forms when dried",
        "The colour the metal gives to a flame in the burner",
        "How much heat the sample gives out in the flame"
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
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "A calibration curve: absorbance against concentration for five standards, which lie on a straight line through the origin. An unknown with an absorbance of 0.40 is read across to the line and down, giving a concentration of 0.05 mol/L, inside the range of the standards.",
        "x": {"min": 0, "max": 0.14, "label": "Concentration (mol/L)", "step": 0.02, "nums": false},
        "y": {"min": 0, "max": 1, "label": "Absorbance", "step": 0.2, "nums": false},
        "items": [
          {"type": "fn", "id": "c", "expr": "8x", "domain": [0, 0.11000000000000001]},
          {"type": "point", "at": [0.02, 0.16], "on": ["c"]},
          {"type": "point", "at": [0.04, 0.32], "on": ["c"]},
          {"type": "point", "at": [0.06, 0.48], "on": ["c"]},
          {"type": "point", "at": [0.08, 0.64], "on": ["c"]},
          {"type": "point", "at": [0.1, 0.8], "on": ["c"]},
          {"type": "guide", "at": [0.05, 0.4], "xLabel": "0.05", "yLabel": "0.40"},
          {"type": "point", "at": [0.05, 0.4], "on": ["c"], "open": true, "label": "unknown", "pos": "above-left"}
        ]
      }
    },
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
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "A mass spectrum: relative abundance against mass-to-charge ratio, with each peak a thin bar. The peak with the highest m/z, at 46, is the molecular ion, so the molar mass is 46 g/mol. The tallest peak is at 31, which is 46 minus 15: the loss of a CH3 group. Smaller peaks are at 15, 27, 29 and 45.",
        "x": {"min": 0, "max": 70, "label": "m/z", "step": 10},
        "y": {"min": 0, "max": 135, "label": "Abundance (%)", "step": 20},
        "items": [
          {
            "type": "curve",
            "id": "s",
            "points": [
              [0, 0],
              [15, 0],
              [15, 6],
              [15, 0],
              [27, 0],
              [27, 22],
              [27, 0],
              [29, 0],
              [29, 23],
              [29, 0],
              [31, 0],
              [31, 100],
              [31, 0],
              [45, 0],
              [45, 51],
              [45, 0],
              [46, 0],
              [46, 17],
              [46, 0],
              [70, 0]
            ]
          },
          {"type": "text", "at": [47, 17], "label": "molecular ion", "pos": "right"},
          {"type": "arrow", "from": [46, 110], "to": [31.6, 110], "label": "loss of 15, CH3", "pos": "above"}
        ]
      }
    },
    "remember": "The molecular ion peak gives the molar mass. The fragment peaks give clues to the structure.",
    "a": {
      "q": "A compound has a mass spectrum with its highest m/z peak at 72. What does this peak most likely show?",
      "opts": [
        "The molar mass of the compound is 72 g/mol",
        "The compound has 72 carbon atoms per molecule",
        "Each molecule has 72 hydrogen atoms in total",
        "The peak shows a CH3 group with a mass of 72"
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
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "An IR spectrum of a compound with a C=O bond and no O-H bond. It plots how much light passes through, as a percentage, against wavenumber, running from 4000 cm⁻¹ on the left down to 500 cm⁻¹ on the right, as IR spectra are drawn. Each absorption is a peak pointing down. The strongest is a sharp peak at about 1715 cm⁻¹, labelled C=O. There is a smaller peak near 2970 cm⁻¹ and a few more below 1500 cm⁻¹. There is no broad O-H peak between 2500 and 3550 cm⁻¹.",
        "x": {"min": 500, "max": 4000, "label": "Wavenumber (cm⁻¹)", "step": 500, "reverse": true},
        "y": {"min": 0, "max": 100, "label": "Transmittance (%)", "step": 20},
        "items": [
          {
            "type": "curve",
            "id": "s",
            "smooth": true,
            "points": [
              [500, 90],
              [520, 86],
              [540, 76],
              [560, 86],
              [600, 91],
              [760, 91],
              [790, 82],
              [810, 85],
              [850, 91],
              [1060, 91],
              [1090, 82],
              [1110, 89],
              [1180, 90],
              [1205, 72],
              [1220, 66],
              [1235, 72],
              [1260, 90],
              [1340, 89],
              [1355, 74],
              [1365, 70],
              [1380, 80],
              [1405, 76],
              [1420, 72],
              [1440, 84],
              [1480, 91],
              [1660, 92],
              [1690, 82],
              [1705, 30],
              [1715, 10],
              [1725, 30],
              [1740, 82],
              [1770, 92],
              [2900, 92],
              [2940, 82],
              [2970, 64],
              [3000, 82],
              [3040, 92],
              [4000, 92]
            ]
          },
          {"type": "text", "at": [1715, 10], "label": "C=O", "pos": "right"}
        ]
      }
    },
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
      "opts": [
        "Using a renewable feedstock",
        "Using a less harmful solvent",
        "Producing fewer by-products",
        "Using a lower reaction temperature"
      ],
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
  },
  "chem-isotopes-relative-atomic-mass": {
    "title": "Isotopes and relative atomic mass",
    "card": [
      "Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons. They have different masses.",
      "Relative isotopic mass compares the mass of an isotope with carbon-12. One unit is one twelfth of the mass of a carbon-12 atom.",
      "A mass spectrometer measures the mass of each isotope and its abundance, which is the percentage of atoms of that isotope in a natural sample.",
      "Relative atomic mass is the weighted average of the isotopic masses. Multiply each mass by its abundance as a fraction, then add the results."
    ],
    "remember": "Relative atomic mass is an average of isotopic masses, weighted by abundance.",
    "a": {
      "q": "Which pair of atoms are isotopes of the same element?",
      "opts": [
        "Both have 17 protons, one has 18 neutrons and one has 20",
        "Both have 17 neutrons, one has 17 protons and one has 18",
        "Both have 17 protons and 18 neutrons, but different charges",
        "Both have a mass number of 35, but different protons"
      ],
      "why": "Isotopes have the same number of protons but different numbers of neutrons. Any pair with different numbers of protons are atoms of different elements. The pair with 17 protons and 18 neutrons each have identical nuclei, so a different charge does not make them different isotopes.",
      "clue": "Same element means same protons. What differs?"
    },
    "b": {
      "d": 3,
      "q": "A sample of element X is 75% X-35 and 25% X-37. Using these mass numbers as the isotopic masses, what is its relative atomic mass?",
      "opts": ["35.5", "36.0", "35.0", "36.5"],
      "why": "Weighted average = 0.75 × 35 + 0.25 × 37 = 26.25 + 9.25 = 35.5. A simple average of 35 and 37 gives 36.0, but that ignores that X-35 is far more abundant.",
      "clue": "Multiply each mass by its abundance as a fraction, then add."
    }
  },
  "chem-mole": {
    "title": "The mole",
    "card": [
      "The mole (mol) is the unit for amount of substance. One mole of any particle is 6.02 × 10²³ particles. The Avogadro constant, N_A, is 6.02 × 10²³ mol⁻¹.",
      "The particles can be atoms, molecules or ions. So 1 mol of carbon atoms and 1 mol of water molecules each hold 6.02 × 10²³ particles.",
      "Molar mass (M) is the mass of one mole of a substance, in g/mol. For an element, it has the same number as its relative atomic mass. Carbon is 12.0 g/mol.",
      "Amount in moles, mass and molar mass are linked by n = m/M. Here n is in mol, m is in g and M is in g/mol."
    ],
    "remember": "Mass divided by molar mass gives moles, and each mole is 6.02 × 10²³ particles.",
    "a": {
      "q": "Magnesium has a molar mass of 24.3 g/mol. Which sample contains 6.02 × 10²³ magnesium atoms?",
      "opts": ["24.3 g of magnesium", "1.0 g of magnesium", "12.0 g of magnesium", "6.02 g of magnesium"],
      "why": "6.02 × 10²³ atoms is one mole, and the mass of one mole is the molar mass, 24.3 g. A common mistake is to think one mole always weighs 1.0 g, but the mass of a mole depends on the substance.",
      "clue": "What does molar mass tell you the mass of?"
    },
    "b": {
      "d": 2,
      "q": "A sample of carbon is 6.0 g. Carbon has a molar mass of 12.0 g/mol. How many moles of carbon atoms are in it?",
      "opts": ["0.50 mol", "2.0 mol", "72 mol", "6.0 mol"],
      "why": "n = m/M = 6.0 ÷ 12.0 = 0.50 mol. Dividing the other way round gives 2.0 mol, which is a common mistake.",
      "clue": "Divide mass by molar mass."
    }
  },
  "chem-molar-mass-percentage-composition": {
    "title": "Molar mass and percentage composition",
    "card": [
      "The molar mass of a compound is the mass of one mole of it, in g/mol. Add up the molar masses of all the atoms in its formula.",
      "Count each atom using the subscripts. In CaCO₃ there is 1 Ca, 1 C and 3 O. With Ca = 40.1, C = 12.0 and O = 16.0, M = 40.1 + 12.0 + 48.0 = 100.1 g/mol.",
      "The percentage by mass of an element is the mass of that element in one mole of the compound, divided by the molar mass, then × 100.",
      "For CaCO₃, the percentage of oxygen is 48.0 ÷ 100.1 × 100, which is about 48%. The percentages of all the elements add to 100%."
    ],
    "remember": "Add the atoms' masses for molar mass. Then element mass ÷ molar mass × 100 gives the percentage.",
    "a": {
      "q": "What is the molar mass of water, H₂O? Use H = 1.0 g/mol and O = 16.0 g/mol.",
      "opts": ["18.0 g/mol", "17.0 g/mol", "16.0 g/mol", "34.0 g/mol"],
      "why": "Water has 2 H and 1 O, so M = 2 × 1.0 + 16.0 = 18.0 g/mol. Adding only one H gives 17.0 g/mol, which ignores the subscript 2.",
      "clue": "Use the subscript to count each atom."
    },
    "b": {
      "d": 3,
      "q": "Methane, CH₄, has C = 12.0 g/mol and H = 1.0 g/mol. What is the percentage of carbon by mass?",
      "opts": ["75%", "25%", "20%", "80%"],
      "why": "M = 12.0 + 4 × 1.0 = 16.0 g/mol. Carbon is 12.0 ÷ 16.0 × 100 = 75%. Counting atoms gives 1 in 5, or 20%, but percentage by mass depends on the atoms' masses.",
      "clue": "Compare carbon's mass with the whole molar mass, not the atom count."
    }
  },
  "chem-empirical-molecular-formulas": {
    "title": "Empirical and molecular formulas",
    "card": [
      ["Empirical formula", "the simplest whole-number ratio of atoms of each element in a compound."],
      [
        "Molecular formula",
        "the actual number of atoms of each element in one molecule. It is a whole-number multiple of the empirical formula."
      ],
      "To find the empirical formula, take the mass of each element, such as from percentage composition in a 100 g sample. Divide each by its molar mass to get moles, then divide all by the smallest number of moles.",
      "To find the molecular formula, divide the compound's molar mass by the empirical formula's molar mass. Multiply the empirical formula by this whole number."
    ],
    "remember": "Percentage composition gives the ratio. Molar mass gives the multiple.",
    "a": {
      "q": "A compound has the empirical formula CH2O and a molar mass of 180 g/mol. The empirical formula mass is 30 g/mol. What is its molecular formula?",
      "opts": ["C6H12O6", "C3H6O3", "C2H4O2", "CH2O"],
      "why": "180 ÷ 30 = 6, so multiply every subscript in CH2O by 6 to get C6H12O6. C3H6O3 would be a multiple of 3, which gives only 90 g/mol.",
      "clue": "How many times does the empirical mass fit into the molar mass?"
    },
    "b": {
      "d": 3,
      "q": "A compound is 85.7% carbon and 14.3% hydrogen by mass. Its molar mass is 56 g/mol. Use C = 12 and H = 1. What is its molecular formula?",
      "opts": ["C4H8", "CH2", "C2H4", "C3H6"],
      "why": "In 100 g: C = 85.7 ÷ 12 = 7.14 mol and H = 14.3 ÷ 1 = 14.3 mol. The ratio is 1 : 2, so the empirical formula is CH2, with mass 14 g/mol. 56 ÷ 14 = 4, giving C4H8. CH2 is only the ratio, not the actual molecule.",
      "clue": "Find the ratio first, then scale it up using the molar mass."
    }
  },
  "chem-water-earth": {
    "title": "Water on Earth",
    "card": [
      "Water exists in all three states at Earth's surface. It is solid as ice and snow, liquid in oceans, rivers and groundwater, and gas as water vapour in the air.",
      "Most of Earth's water is in the oceans. Ocean water is salty, so it is not fit to drink without treatment.",
      "Only a small share of Earth's water is fresh water, which has very little dissolved salt.",
      "Much of that fresh water is locked up as ice in glaciers and ice sheets. Only a small part is liquid water in rivers, lakes and groundwater that people can reach and drink."
    ],
    "remember": "Water is plentiful on Earth, but drinkable fresh water is only a small share.",
    "a": {
      "q": "Why is most of the water on Earth not fit to drink?",
      "opts": [
        "It is mostly salty ocean water",
        "It is mostly water vapour in the air",
        "It is mostly polluted river water",
        "It is mostly groundwater deep underground"
      ],
      "why": "Most of Earth's water is in the oceans, and ocean water is salty. Groundwater can be fresh, and only a small share of all water is vapour in the air.",
      "clue": "Think about where most of the water is stored."
    },
    "b": {
      "d": 3,
      "q": "Mia sees that a large share of Earth's fresh water is frozen in glaciers. What does this mean for drinking water?",
      "opts": [
        "Much fresh water is not easy for people to reach",
        "Fresh water cannot exist as a liquid",
        "Glacier ice is salty and cannot be drunk",
        "Most fresh water is found in the oceans"
      ],
      "why": "Fresh water locked in ice sheets and glaciers is hard to reach, so the supply people can use is smaller than the total fresh water. It is not salty, and fresh water does exist as a liquid in rivers, lakes and groundwater.",
      "clue": "Fresh and easy to reach are not the same thing."
    }
  },
  "chem-water-s-unusual-properties": {
    "title": "Water's unusual properties",
    "card": [
      "A water molecule is polar. The hydrogen atoms of one molecule are attracted to the oxygen atom of a neighbour. This attraction is a hydrogen bond, and it is stronger than the weak forces between most small molecules.",
      "Compare the hydrides of Group 16: H2S, H2Se and H2Te. Their boiling points rise as the molecules get larger. Water breaks this pattern and boils at a much higher temperature than all of them, because extra energy is needed to overcome its hydrogen bonds.",
      "In liquid water, hydrogen bonds keep forming and breaking as the molecules move past each other and sit close together.",
      "In ice, each molecule is held by hydrogen bonds in a fixed, open lattice with gaps in it. This spaces the molecules further apart than in the liquid, so ice is less dense than liquid water and floats."
    ],
    "cardFigs": {
      "2": {
        "kind": "chart",
        "chart": "bar",
        "alt": "A bar chart of the boiling points of the Group 16 hydrides, in kelvin: H2O 373 K, H2S 213 K, H2Se 232 K and H2Te 271 K. From H2S to H2Te the boiling point rises as the molecules get larger, but water's boiling point is far higher than all of them.",
        "x": {"label": "Hydride"},
        "y": {"min": 0, "max": 400, "step": 100, "label": "Boiling point (K)"},
        "bars": [["H2O", 373], ["H2S", 213], ["H2Se", 232], ["H2Te", 271]]
      }
    },
    "remember": "Hydrogen bonding lifts water's boiling point and gives ice an open structure, so ice floats.",
    "a": {
      "q": "Why does water boil at a higher temperature than H2S, even though H2S molecules are larger?",
      "opts": [
        "Hydrogen bonds between its molecules need more energy",
        "Water molecules are larger than H2S molecules",
        "The O-H bonds inside water molecules are easier to break",
        "Water molecules have no attraction to each other when liquid"
      ],
      "why": "Boiling separates whole molecules, so it must overcome the attractions between them. Water's hydrogen bonds are stronger than the forces between H2S molecules, so more energy is needed. Size does not explain it, because water is the smaller molecule.",
      "clue": "Boiling pulls molecules apart from each other, not atoms apart within a molecule."
    },
    "b": {
      "d": 3,
      "q": "A lake in Victoria's high country freezes in winter. Which statement best explains why the ice forms a layer on top of the water?",
      "opts": [
        "Hydrogen bonds hold ice in an open, less dense lattice",
        "Ice molecules are lighter than liquid water molecules",
        "Hydrogen bonds break as water freezes, so ice is less dense",
        "Cold water molecules move faster and rise to the surface"
      ],
      "why": "In ice, hydrogen bonds hold the molecules in a fixed open lattice with gaps, so the molecules are further apart and the ice is less dense. The molecules themselves are the same in both states, so ice is not made of lighter molecules. Hydrogen bonds do not break on freezing. They hold the molecules in place.",
      "clue": "The molecules are identical in ice and water, so think about how they are arranged."
    }
  },
  "chem-specific-heat-capacity": {
    "title": "Specific heat capacity",
    "card": [
      "Specific heat capacity is the energy needed to raise the temperature of 1 g of a substance by 1 °C. Its unit is J g⁻¹ °C⁻¹.",
      "Energy needed = mass × specific heat capacity × temperature change, or q = mcΔT.",
      "Water's specific heat capacity is high, about 4.18 J g⁻¹ °C⁻¹. It takes a lot of energy to warm water and water gives out a lot of energy as it cools.",
      "So water warms and cools slowly compared with a substance of lower specific heat capacity, such as most metals. This helps keep oceans and living things at steady temperatures."
    ],
    "remember": "The higher the specific heat capacity, the more energy it takes to change the temperature, so the slower it warms and cools.",
    "a": {
      "q": "Why does a lake warm up more slowly than the sand on its shore in the same sunshine?",
      "opts": [
        "Water has a higher specific heat capacity than sand",
        "Water has a lower specific heat capacity than sand",
        "Water absorbs less energy from the Sun than sand",
        "Water needs less energy for each degree of warming"
      ],
      "why": "Water needs more energy per gram for each degree of warming, so the same sunshine raises its temperature less. The tempting option is the one saying water needs less energy per degree: that would make it warm faster, not slower.",
      "clue": "Think about how much energy each gram needs for a 1 °C rise."
    },
    "b": {
      "d": 3,
      "q": "Mia heats 200 g of water in a kettle in Geelong and its temperature rises by 10 °C. About how much energy does the water absorb? (Specific heat capacity of water = 4.18 J g⁻¹ °C⁻¹)",
      "opts": ["8360 J", "836 J", "418 J", "2090 J"],
      "why": "q = mcΔT = 200 × 4.18 × 10 = 8360 J. The value 836 J comes from leaving out the factor of 10, which is a common slip when the temperature change is forgotten.",
      "clue": "Multiply mass, specific heat capacity and temperature change."
    }
  },
  "chem-latent-heat-vaporisation": {
    "title": "Latent heat of vaporisation",
    "card": [
      "Latent heat of vaporisation is the energy needed to change a liquid into a gas at its boiling point or during evaporation, with no change in temperature. The energy is used to separate particles, not to speed them up.",
      "Water has a high latent heat of vaporisation. Many hydrogen bonds between water molecules must be broken before a molecule can escape as vapour.",
      "When water evaporates from a surface, the energy it takes comes from what is left behind. The remaining water and the surface cool down.",
      "This is why sweating cools the body, and why evaporation from oceans and lakes helps limit how much their temperatures rise."
    ],
    "remember": "Evaporating water absorbs a lot of energy, so evaporation cools the surface it leaves.",
    "a": {
      "q": "Why does a large amount of energy need to be absorbed for liquid water to evaporate?",
      "opts": [
        "Hydrogen bonds between molecules must be broken",
        "Covalent bonds inside each molecule must be broken",
        "The water must first be cooled to a lower temperature",
        "The molecules must be made to move more slowly"
      ],
      "why": "Molecules can only escape as vapour once the hydrogen bonds holding them to their neighbours are broken, and this takes a lot of energy. The covalent bonds inside each molecule stay intact, so that option is wrong.",
      "clue": "Think about what holds one water molecule to the next."
    },
    "b": {
      "d": 3,
      "q": "Layla steps out of a pool on a warm day and feels cold as the water on her skin dries. What best explains this?",
      "opts": [
        "Evaporating water takes energy from her skin",
        "Evaporating water gives energy to her skin",
        "Water on her skin is colder than the air",
        "Her skin loses energy by breaking covalent bonds"
      ],
      "why": "Water needs a lot of energy to evaporate, and this energy comes from her skin, so her skin cools. The water gaining energy is true, but it takes that energy from her skin rather than giving it to her.",
      "clue": "Where does the energy for evaporation come from?"
    }
  },
  "chem-oxidation-reduction-2": {
    "title": "Oxidation and reduction",
    "card": [
      [
        "Oxidation",
        "the loss of electrons. The species that loses electrons is oxidised, and its oxidation number goes up."
      ],
      [
        "Reduction",
        "the gain of electrons. The species that gains electrons is reduced, and its oxidation number goes down."
      ],
      "A half-equation shows one side of a redox reaction, with electrons written as e-. Example: Zn(s) → Zn²⁺(aq) + 2e- is oxidation, because electrons are on the product side.",
      "In acidic conditions, balance a half-equation in order: balance atoms other than O and H, add H2O to balance O, add H⁺ to balance H, then add e- to balance charge. Example: MnO4⁻ + 8H⁺ + 5e- → Mn²⁺ + 4H2O."
    ],
    "remember": "Electrons lost means oxidation. Electrons gained means reduction. Both always happen together.",
    "a": {
      "q": "In the half-equation Fe³⁺(aq) + e- → Fe²⁺(aq), what happens to the iron?",
      "opts": [
        "It is reduced, because it gains an electron",
        "It is oxidised, because it gains an electron",
        "It is reduced, because it loses an electron",
        "It is oxidised, because it loses an electron"
      ],
      "why": "The electron is on the reactant side, so the iron ion gains an electron. Gaining electrons is reduction. Saying it is oxidised is a common mix-up, but oxidation is a loss of electrons.",
      "clue": "Look at which side of the arrow the electron is on."
    },
    "b": {
      "d": 3,
      "q": "Dichromate is reduced in acidic conditions: Cr2O7²⁻ + 14H⁺ + ?e- → 2Cr³⁺ + 7H2O. How many electrons are needed to balance the charge?",
      "opts": ["6 on the reactant side", "6 on the product side", "12 on the reactant side", "3 on the reactant side"],
      "why": "The left side has a charge of -2 + 14 = +12. The right side has 2 × 3 = +6. Six electrons added to the left give +6 on both sides. They go on the reactant side because this is reduction, a gain of electrons.",
      "clue": "Add up the charge on each side before adding electrons."
    }
  },
  "chem-reactivity-series-corrosion": {
    "title": "The reactivity series of metals",
    "card": [
      "The reactivity series ranks metals by how easily they lose electrons to form positive ions. The metal at the top loses electrons most easily, so it is the most reactive.",
      "A more reactive metal displaces a less reactive metal from a solution of its ions. The more reactive metal goes into solution as ions and the less reactive metal forms as a solid.",
      "Example: zinc placed in copper(II) sulfate solution becomes coated in copper, because zinc is more reactive than copper. Copper placed in zinc sulfate solution shows no change.",
      "Metals in order from most to least reactive include magnesium, zinc, iron, tin, lead, copper and silver."
    ],
    "remember": "The more easily a metal loses electrons, the higher it sits in the reactivity series, and it displaces metals below it.",
    "a": {
      "q": "What puts a metal near the top of the reactivity series?",
      "opts": [
        "It loses electrons very easily",
        "It gains electrons very easily",
        "It has a very high density",
        "It is very hard to cut"
      ],
      "why": "The series ranks metals by how easily they lose electrons, so a metal near the top loses them most easily. Metals form positive ions by losing electrons, not gaining them. Density and hardness are physical properties and do not set the order.",
      "clue": "Think about what the reactivity series ranks metals by."
    },
    "b": {
      "d": 2,
      "q": "Mia places a strip of magnesium in one beaker of iron(II) sulfate solution and a strip of copper in another. What does she see?",
      "opts": [
        "Iron forms on the magnesium only",
        "Iron forms on the copper strip only",
        "Iron forms on both of the strips",
        "Iron forms on neither of the strips"
      ],
      "why": "Magnesium is more reactive than iron, so it displaces iron from solution and iron forms as a solid. Copper is less reactive than iron, so it cannot displace iron and nothing happens.",
      "clue": "Only a metal above iron in the reactivity series can displace iron."
    }
  },
  "chem-corrosion-simple-cells": {
    "title": "Corrosion and simple cells",
    "card": [
      [
        "Corrosion",
        "the slow breakdown of a metal by reaction with its surroundings. Rusting is the corrosion of iron, and it is a redox reaction."
      ],
      [
        "Rusting",
        "iron is oxidised: Fe → Fe²⁺ + 2e-. Oxygen is reduced. Water must be present, and salt in the water speeds the process up. The iron ions go on to form hydrated iron oxide, or rust."
      ],
      [
        "Simple cell",
        "a set-up where redox turns chemical energy into electrical energy. The two half-reactions happen at separate electrodes, and electrons travel along an external wire."
      ],
      "Oxidation happens at the anode and reduction at the cathode. Electrons flow from the anode to the cathode through the wire. A primary cell cannot be recharged."
    ],
    "remember": "Rusting and cells are both redox. In a cell, electrons flow from the anode to the cathode.",
    "a": {
      "q": "What happens to iron when it rusts?",
      "opts": [
        "It is oxidised, losing electrons to form iron ions",
        "It is reduced, gaining electrons to form iron ions",
        "It is oxidised, gaining electrons from oxygen",
        "It is reduced, losing electrons to oxygen"
      ],
      "why": "Iron atoms lose electrons to become iron ions, which is oxidation. Oxygen gains those electrons and is the species reduced. Saying iron is reduced mixes up the direction of electron transfer.",
      "clue": "Iron forms positive ions."
    },
    "b": {
      "d": 2,
      "q": "In a simple cell, a zinc electrode is oxidised and a copper electrode is where reduction occurs. Which describes the electron flow in the external wire?",
      "opts": [
        "From the zinc anode to the copper cathode",
        "From the copper cathode to the zinc anode",
        "From the zinc cathode to the copper anode",
        "From the copper anode to the zinc cathode"
      ],
      "why": "Oxidation happens at the anode, so zinc is the anode and releases electrons. Electrons flow through the wire to the cathode, where reduction occurs. That is the copper electrode, so the flow is from zinc to copper.",
      "clue": "Oxidation happens at the anode, and electrons flow away from it."
    }
  },
  "chem-concentration-2": {
    "title": "Concentration",
    "card": [
      "Concentration is the amount of solute in a given amount of solution. Solute is the substance that dissolves. The volume used is that of the whole solution, not of the solvent alone.",
      "Molar concentration is in mol/L: c = n ÷ V, with V in litres. Mass concentration is in g/L: mass of solute in grams ÷ volume of solution in litres.",
      "Percentages: %(m/v) is grams of solute per 100 mL of solution. %(v/v) is millilitres of solute per 100 mL of solution. For very dilute solutions in water, ppm is used, and 1 ppm is about 1 mg of solute per litre (mg/L).",
      "To convert between units, use the molar mass: g/L ÷ M = mol/L. For example, 58.5 g/L of NaCl is 1.00 mol/L, as M(NaCl) = 58.5 g/mol. Check that the volume is in the unit the formula needs."
    ],
    "remember": "Concentration is solute per volume of solution. Molar mass links g/L to mol/L.",
    "a": {
      "q": "A student dissolves 0.50 mol of sugar in water to make 250 mL of solution. What is the concentration in mol/L?",
      "opts": ["2.0 mol/L", "0.50 mol/L", "0.125 mol/L", "0.0020 mol/L"],
      "why": "c = n ÷ V = 0.50 mol ÷ 0.250 L = 2.0 mol/L. Dividing by 250 without converting mL to litres gives 0.0020 mol/L. Multiplying 0.50 by 0.250 instead of dividing gives 0.125 mol/L.",
      "clue": "Convert the volume to litres before dividing."
    },
    "b": {
      "d": 3,
      "q": "A saline solution contains 9.0 g/L of NaCl (M = 58.5 g/mol). Which is closest to its concentration in mol/L?",
      "opts": ["0.15 mol/L", "6.5 mol/L", "0.90 mol/L", "527 mol/L"],
      "why": "Divide the mass concentration by the molar mass: 9.0 ÷ 58.5 = 0.15 mol/L. Multiplying by the molar mass gives 527, which reverses the conversion. 0.90 is the %(m/v) value, since 9.0 g/L is 0.90 g per 100 mL, so it is not in mol/L.",
      "clue": "Moles are mass divided by molar mass."
    }
  },
  "chem-water-as-solvent": {
    "title": "Solubility",
    "card": [
      "Solubility is the maximum mass of a solute that dissolves in a given amount of solvent at a set temperature, such as g per 100 g of water. A solution holding that maximum is saturated.",
      "A solubility curve plots solubility against temperature. A point on the curve is a saturated solution. A point below it is unsaturated, and more solute can still dissolve.",
      "For most solids, solubility rises as temperature rises, so the curve slopes up. If a saturated solution is cooled, the extra solute comes out as crystals.",
      "For gases, solubility falls as temperature rises, so the curve slopes down. A warm drink holds less dissolved carbon dioxide than a cold one."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "A solubility curve for a solid in water: solubility, in grams per 100 g of water, against temperature. The curve rises, so the solid dissolves better when hot. A point on the curve, at 30 °C and 46 g, is a saturated solution. A point below the curve, at 60 °C and 50 g, is unsaturated: more solid can still dissolve.",
        "x": {"min": 0, "max": 80, "label": "Temperature (°C)", "step": 20},
        "y": {"min": 0, "max": 150, "label": "Solubility (g/100 g)", "step": 50},
        "items": [
          {
            "type": "curve",
            "id": "s",
            "points": [[0, 13], [10, 21], [20, 32], [30, 46], [40, 64], [50, 85], [60, 110], [70, 138]],
            "smooth": true
          },
          {"type": "point", "at": [30, 46], "on": ["s"], "label": "saturated", "pos": "above-left"},
          {"type": "point", "at": [60, 50], "label": "unsaturated", "pos": "below"}
        ]
      }
    },
    "remember": "Solids usually dissolve better when hot. Gases dissolve better when cold.",
    "a": {
      "q": "A solubility curve shows a solid dissolving at 40 g per 100 g of water at 50 °C. A solution at 50 °C holds 25 g in 100 g of water. How is it best described?",
      "opts": [
        "Unsaturated, as more solute can still dissolve",
        "Saturated, as the solute has all dissolved",
        "Saturated, as it is below the curve",
        "Unsaturated, as it holds less than 100 g"
      ],
      "why": "The curve gives the maximum at 50 °C, which is 40 g. A solution with 25 g holds less than this, so more solute can dissolve and it is unsaturated. Having all the solute dissolved does not make a solution saturated.",
      "clue": "Compare 25 g with the maximum at that temperature."
    },
    "b": {
      "d": 3,
      "q": "Mia cools a saturated solution of a solid in water from 60 °C to 20 °C. The solid's solubility rises with temperature. What happens?",
      "opts": [
        "Crystals form, as the solid is less soluble at 20 °C",
        "Nothing, as the solution is still saturated and clear",
        "Crystals form, as cold water cannot dissolve any solid",
        "The solution becomes unsaturated as the solid dissolves"
      ],
      "why": "This solid is less soluble at 20 °C, so the water can hold less than before and the extra comes out as crystals. Cold water still dissolves some of the solid, so the idea that it dissolves none is wrong.",
      "clue": "Think about how much solid the water can hold once it is cooler."
    }
  },
  "chem-precipitation-reactions-2": {
    "title": "Removing impurities from water",
    "card": [
      "An unwanted ion in water can be removed by adding a chemical that forms a precipitate with it. A precipitate is an insoluble solid that forms when two solutions are mixed.",
      "Choose a reagent whose ions combine with the unwanted ion to make an insoluble compound, using a solubility table to check. The reagent's other ion should stay dissolved and be harmless: sodium, potassium and nitrate compounds are all soluble.",
      "Once the precipitate forms, it is separated from the water by filtration. The water that passes through has much less of the unwanted ion.",
      "Example: lead(II) ions, Pb2+, can be removed by adding sodium sulfate. Pb2+(aq) + SO4 2-(aq) → PbSO4(s). Lead(II) sulfate is insoluble, and sodium ions stay in solution."
    ],
    "remember": "Add a reagent that makes the unwanted ion into an insoluble solid, then filter it out.",
    "a": {
      "q": "Why is a precipitate formed when removing an unwanted ion from water?",
      "opts": [
        "It is an insoluble solid that can be filtered out",
        "It is a gas that bubbles out of the water",
        "It is a soluble salt that is easier to measure",
        "It is an acid that neutralises the unwanted ion"
      ],
      "why": "A precipitate is an insoluble solid, so filtration separates it from the water and takes the unwanted ion with it. A soluble salt would stay dissolved, so the ion would not be removed.",
      "clue": "Think about what filtration can separate."
    },
    "b": {
      "d": 3,
      "q": "Water from a mine in Ballarat contains dissolved silver ions, Ag+. Which reagent could remove them as a precipitate?",
      "opts": [
        "Sodium chloride solution",
        "Sodium nitrate solution",
        "Potassium nitrate solution",
        "Calcium nitrate solution"
      ],
      "why": "Chloride ions combine with silver ions to make silver chloride, which is insoluble, so it can be filtered out. Calcium nitrate is tempting because calcium forms some precipitates, but all nitrates are soluble, so silver nitrate stays dissolved and the silver ions remain in the water.",
      "clue": "Use a solubility table to find which pairing with silver is insoluble."
    }
  },
  "chem-volumetric-analysis": {
    "title": "Volumetric analysis",
    "card": [
      "Volumetric analysis finds an unknown concentration by measuring volumes. In a titration, a solution is added from a burette to a measured volume of another solution in a conical flask, until the reaction is complete.",
      "One solution is a standard solution, which has an accurately known concentration. The standard is often in the burette, but it can be in the flask instead. The volume delivered from the burette at the end point is the titre.",
      "The equivalence point is when the reactants have been added in exactly the mole ratio of the balanced equation. The end point is when the indicator changes colour, and a suitable indicator puts it as close as possible to the equivalence point.",
      "Use n = c × V (V in litres) on the standard solution to find its moles. Use the equation's mole ratio to find moles of the unknown, then divide by the unknown's volume in litres. If the unknown was diluted first, multiply the answer by the dilution factor."
    ],
    "remember": "Moles of the standard, then the equation's ratio, then moles divided by volume gives the unknown concentration.",
    "a": {
      "q": "In a titration, what is the end point?",
      "opts": [
        "When the indicator changes colour",
        "When reactants are in the exact mole ratio",
        "When the solution reaches a pH of exactly 7",
        "When the burette has been completely emptied"
      ],
      "why": "The end point is the moment the indicator changes colour. Reactants in the exact mole ratio describes the equivalence point, which a suitable indicator makes the end point as close as possible to, but the two are not the same thing.",
      "clue": "One of these is what you see, the other is what the reaction does."
    },
    "b": {
      "d": 3,
      "q": "Mia titrates 20.0 mL of sulfuric acid, H2SO4, with 0.100 mol/L NaOH from the burette. The titre is 30.0 mL. The equation is H2SO4 + 2NaOH → Na2SO4 + 2H2O. What is the concentration of the acid?",
      "opts": ["0.0750 mol/L", "0.150 mol/L", "0.300 mol/L", "0.0333 mol/L"],
      "why": "n(NaOH) = 0.100 × 0.0300 = 0.00300 mol. The ratio is 1 acid to 2 NaOH, so n(H2SO4) = 0.00150 mol. Dividing by 0.0200 L gives 0.0750 mol/L. The value 0.150 mol/L comes from ignoring the 1 to 2 ratio.",
      "clue": "Use the mole ratio from the balanced equation before dividing by the acid's volume."
    }
  },
  "chem-salts-water-soil": {
    "title": "Salts in water and soil",
    "card": [
      "Water and soil contain dissolved salts. Many are minerals that come from rocks, such as calcium, magnesium and sodium salts.",
      "Heavy metals such as lead, mercury and cadmium can also get into water and soil. Mining, industry and old pipes are common sources.",
      "A salt dissolved in water splits into ions that can move. More dissolved ions means the water carries electric current better.",
      "Electrical conductivity measures how well a sample conducts electricity. A higher reading means more dissolved ions, so the sample is saltier."
    ],
    "remember": "More dissolved ions means higher conductivity, which means a saltier sample.",
    "a": {
      "q": "Why does a higher electrical conductivity show that a water sample is saltier?",
      "opts": [
        "There are more dissolved ions to carry current",
        "There are more undissolved solids settled at the bottom",
        "The water molecules themselves carry more current",
        "The sample contains more heavy metals than minerals"
      ],
      "why": "Dissolved salts form mobile ions, and these carry current through the water. More ions means a higher reading. Heavy metals add ions too, but conductivity does not tell which ions are present.",
      "clue": "Think about what moves to carry the current in the solution."
    },
    "b": {
      "d": 3,
      "q": "Farmer Sam tests water from two dams. Dam A has a conductivity reading twice that of Dam B. What can Sam conclude?",
      "opts": [
        "Dam A has more dissolved ions than Dam B",
        "Dam A has more lead than Dam B",
        "Dam A has less dissolved salt than Dam B",
        "Dam A has more mineral salts but no heavy metals"
      ],
      "why": "A higher reading means more dissolved ions, so Dam A is saltier. Conductivity cannot show which ions are present, so Sam cannot say the extra ions are lead, or that no heavy metals are there.",
      "clue": "Conductivity counts ions but does not name them."
    }
  },
  "chem-water-crystallisation": {
    "title": "Water of crystallisation",
    "card": [
      "Some salt crystals hold water molecules inside their structure. This is water of crystallisation, and the salt is called hydrated. It is written with a dot, such as CuSO4·5H2O.",
      "Heating a hydrated salt drives off the water as vapour. The solid left behind is the anhydrous salt, which has no water in it.",
      "The mass lost is the mass of water. The mass left is the mass of anhydrous salt. Heat until the mass stops changing, so you know all the water has gone.",
      "Divide each mass by its molar mass to get moles. The ratio of moles of water to moles of salt gives x in the formula salt·xH2O. Round to a whole number."
    ],
    "remember": "Mass lost is water. Convert both masses to moles, then find the ratio.",
    "a": {
      "q": "A student heats a hydrated salt until its mass stops changing. What does the mass lost show?",
      "opts": [
        "The mass of water that was in the crystals",
        "The mass of anhydrous salt that remains",
        "The mass of salt that has decomposed into gas",
        "The mass of water added from the air"
      ],
      "why": "Heating drives off the water of crystallisation, so the mass lost equals the mass of water. The mass of anhydrous salt is what is left behind, not what is lost, so that option is the tempting reversal.",
      "clue": "What leaves the crucible as vapour?"
    },
    "b": {
      "d": 3,
      "q": "Heating 4.99 g of hydrated copper sulfate leaves 3.19 g of anhydrous CuSO4 (M = 159.6 g/mol). Water has M = 18.0 g/mol. What is x in CuSO4·xH2O?",
      "opts": ["5", "1", "3", "10"],
      "why": "Water lost = 4.99 - 3.19 = 1.80 g, which is 0.100 mol. The salt is 3.19 ÷ 159.6 = 0.0200 mol. The ratio is 0.100 ÷ 0.0200 = 5. Using the masses 1.80 and 3.19 directly without converting to moles gives a wrong ratio.",
      "clue": "Find the water lost, then turn both masses into moles."
    }
  },
  "chem-stoichiometry": {
    "title": "Mass-mass stoichiometry",
    "card": [
      "A balanced equation shows the mole ratio of the substances. In 2H2 + O2 → 2H2O, 2 mol of H2 react with 1 mol of O2 to make 2 mol of H2O.",
      "Equations give ratios of moles, not of masses. To use the ratio, first change the given mass to moles using n = m ÷ M.",
      "Then use the coefficients in the equation to find the moles of the substance you want. Multiply the known moles by (wanted coefficient ÷ known coefficient).",
      "Finally change moles to mass using m = n × M. The steps are: mass to moles, mole ratio, moles to mass."
    ],
    "remember": "Mass to moles, apply the mole ratio, then moles back to mass.",
    "a": {
      "q": "In 2Mg + O2 → 2MgO, why can you not compare the masses of Mg and MgO directly using the coefficients?",
      "opts": [
        "The coefficients give mole ratios, not mass ratios",
        "The coefficients give mass ratios, not mole ratios",
        "Mg and MgO have the same molar mass",
        "Oxygen changes the mass of the magnesium"
      ],
      "why": "Coefficients in a balanced equation show the ratio of moles. Each substance has a different molar mass, so the masses are not in the same ratio. Treating coefficients as masses is the common mistake.",
      "clue": "What do the numbers in front of formulas count?"
    },
    "b": {
      "d": 3,
      "q": "Zinc reacts with hydrochloric acid: Zn + 2HCl → ZnCl2 + H2. What mass of H2 (M = 2.0 g/mol) forms from 6.54 g of Zn (M = 65.4 g/mol) in excess acid?",
      "opts": ["0.20 g", "0.10 g", "0.40 g", "6.54 g"],
      "why": "n(Zn) = 6.54 ÷ 65.4 = 0.100 mol. The ratio of Zn to H2 is 1:1, so n(H2) = 0.100 mol. Mass = 0.100 × 2.0 = 0.20 g. Giving 0.10 g stops at the moles and forgets to convert to mass.",
      "clue": "Check the Zn to H2 ratio, then finish with m = n × M."
    }
  },
  "chem-aims-hypotheses-models-theories": {
    "title": "Aims, hypotheses, models and theories",
    "card": [
      [
        "Aim",
        "states what an investigation will find out. It is the purpose, such as to determine how temperature affects the rate of a reaction."
      ],
      [
        "Hypothesis",
        "a testable prediction of the result, often linking two variables. For example, if temperature rises, the reaction rate will increase."
      ],
      [
        "Model",
        "a simplified representation that helps explain or predict how something behaves, such as particles drawn as spheres."
      ],
      [
        "Theory and law",
        "a theory is a well-tested explanation of why something happens. A law describes a pattern in observations, often as a relationship, without explaining why."
      ]
    ],
    "remember": "Aim: what you will find out. Hypothesis: what you expect. Theory: why it happens. Law: the pattern.",
    "a": {
      "q": "Which of these is a hypothesis for an investigation into zinc and acid?",
      "opts": [
        "If acid concentration increases, the reaction will be faster",
        "To investigate how acid concentration affects reaction rate",
        "Particles are modelled as spheres that collide and react",
        "Mass is neither created nor destroyed in a reaction"
      ],
      "why": "A hypothesis is a testable prediction, and the statement that a higher acid concentration will make the reaction faster predicts a result. The statement starting 'to investigate' gives a purpose, so it is an aim. The particles as spheres statement is a model, and the statement about mass is a law.",
      "clue": "Which option predicts what will happen?"
    },
    "b": {
      "d": 3,
      "q": "Priya says, 'Gases are made of tiny particles that move randomly and collide, which explains why gases fill their containers.' What is this?",
      "opts": [
        "A theory, because it explains why gases behave as they do",
        "A law, because it describes a pattern in gas behaviour",
        "A hypothesis, because it predicts a result for a test",
        "An aim, because it states what will be investigated"
      ],
      "why": "The statement gives a well-tested explanation of why gases behave as they do, so it is a theory. A law would describe a pattern, such as a relationship between pressure and volume, without explaining why.",
      "clue": "Does the statement explain why, or only describe a pattern?"
    }
  },
  "chem-accuracy-precision-validity": {
    "title": "Accuracy, precision and validity",
    "card": [
      [
        "Accuracy",
        "how close a result is to the true value. A measured boiling point of 99.8 °C for pure water at sea level is very accurate."
      ],
      [
        "Precision",
        "how close repeated measurements are to each other. Results can be precise even if all are far from the true value."
      ],
      [
        "Validity",
        "whether the investigation measures what it set out to measure. It needs a fair test, where only the independent variable changes."
      ],
      "Results can be precise but not accurate, for example if a faulty balance gives the same wrong mass each time."
    ],
    "remember": "Accurate: near the true value. Precise: close together. Valid: measures the right thing.",
    "a": {
      "q": "Four titrations give volumes of 20.10, 20.12, 20.11 and 20.10 mL. The true value is 19.50 mL. How are these results best described?",
      "opts": [
        "Precise but not accurate",
        "Accurate but not precise",
        "Both accurate and precise",
        "Neither accurate nor precise"
      ],
      "why": "The results agree closely with each other, so they are precise. They are all about 0.6 mL from the true value, so they are not accurate. Accuracy depends on the true value, not on agreement.",
      "clue": "Compare the results with each other, then with the true value."
    },
    "b": {
      "d": 3,
      "q": "Jo tests how temperature affects how fast sugar dissolves in water. She also uses a larger amount of sugar in the hotter samples. Which statement is correct?",
      "opts": [
        "Not valid, as sugar amount and temperature both changed",
        "Not precise, as sugar amount and temperature both changed",
        "Not accurate, as sugar amount changed between samples",
        "Valid, as temperature was the independent variable"
      ],
      "why": "A valid test changes only the independent variable. Jo changed the amount of sugar as well, so she cannot tell which change affected dissolving. Precision is about whether repeated measurements agree, not about how many variables changed.",
      "clue": "Which idea is about measuring what the test set out to measure?"
    }
  },
  "chem-repeatability-reproducibility": {
    "title": "Repeatability and reproducibility",
    "card": [
      [
        "Repeatability",
        "the same person, using the same method and equipment, gets close to the same results when the investigation is repeated."
      ],
      ["Reproducibility", "different people, or a different method or equipment, get close to the same results."],
      "Repeating trials helps show whether results are repeatable. It also helps spot a result that does not fit.",
      "Results that other groups can reproduce are more trustworthy, because a one-off result might come from something unusual in one setup."
    ],
    "remember": "Repeatable: same person, same method. Reproducible: different people or methods.",
    "a": {
      "q": "Sam measures the heat released by burning ethanol three times with the same set-up and gets very similar results. What has Sam shown?",
      "opts": [
        "The results are repeatable",
        "The results are reproducible",
        "The results are repeatable and reproducible",
        "The results are neither repeatable nor reproducible"
      ],
      "why": "The same person repeated the same method and got similar results, so they are repeatable. Reproducible would need a different person, method or equipment to get similar results, and nobody else has tried yet.",
      "clue": "Who did the repeating, and which method did they use?"
    },
    "b": {
      "d": 2,
      "q": "A school group finds the mass of copper formed in a reaction. A group at another school follows the same method and gets a similar mass. What does this show?",
      "opts": [
        "The result is reproducible",
        "The result is repeatable",
        "The result is not reproducible",
        "The result came from one unusual setup"
      ],
      "why": "A different group of people got a similar result, so the result is reproducible. Repeatable would describe the first group repeating it themselves. Because two separate setups agreed, the result is unlikely to come from something unusual in one setup.",
      "clue": "Was it the same people or different people?"
    }
  },
  "chem-errors-limitations": {
    "title": "Errors and limitations",
    "card": [
      [
        "Random error",
        "an error that changes from one measurement to the next, sometimes too high and sometimes too low. It scatters results around the true value."
      ],
      [
        "Systematic error",
        "an error that pushes every measurement the same way, such as a balance that always reads 0.5 g too high. It shifts results away from the true value."
      ],
      "Repeating a measurement and averaging helps reduce the effect of random error. It does not remove a systematic error, because every repeat is shifted the same way.",
      [
        "Limitations",
        "Every method has limits, such as the smallest scale division on the equipment, a small sample or conditions that were hard to control. Report them, so readers know how far to trust the results."
      ]
    ],
    "remember": "Random error scatters results. Systematic error shifts them one way. Report the limits of the method.",
    "a": {
      "q": "A student heats a sample in a crucible. The balance reads 0.3 g too high every time it is used. What type of error is this?",
      "opts": [
        "Systematic error, as every reading is shifted the same way",
        "Random error, as the balance is not reading correctly",
        "Random error, as the readings were taken several times",
        "Systematic error, as the readings are scattered widely"
      ],
      "why": "The balance shifts every reading by the same amount in the same direction, so the error is systematic. It is not random, because random errors vary from one reading to the next and scatter results.",
      "clue": "Does the error change between readings, or push them all the same way?"
    },
    "b": {
      "d": 3,
      "q": "Noah measures the temperature of a solution five times. His thermometer reads 1.5 °C too high every time. Why does averaging his five readings not remove this error?",
      "opts": [
        "Every reading is shifted the same way, so the average is too",
        "Averaging adds more scatter to the results, so error grows",
        "Averaging only works if all the readings are exactly equal",
        "The thermometer causes random error, which averaging keeps"
      ],
      "why": "A thermometer that always reads 1.5 °C too high is a systematic error, so every reading is shifted up by the same amount. The average of shifted readings is still shifted. Averaging helps reduce random scatter, and calling this error random is the tempting mistake.",
      "clue": "Think about what each repeat does to a shift that is the same every time."
    }
  },
  "chem-atomic-structure-2": {
    "title": "Atomic structure",
    "card": [
      "An atom has a nucleus of protons and neutrons, with electrons around it. Protons have a positive charge, electrons a negative charge, and neutrons have no charge.",
      [
        "Atomic number",
        "the number of protons. It decides which element an atom is. Mass number is the number of protons plus neutrons."
      ],
      [
        "Isotopes",
        "atoms of the same element with different numbers of neutrons. They have the same atomic number but different mass numbers."
      ],
      [
        "Ions",
        "a neutral atom has equal protons and electrons. An ion has gained or lost electrons, so its charge is protons minus electrons."
      ]
    ],
    "remember": "Protons name the element. Neutrons change the mass. Electrons change the charge.",
    "a": {
      "q": "How many neutrons are in an atom with atomic number 17 and mass number 35?",
      "opts": ["18", "17", "35", "52"],
      "why": "Neutrons = mass number minus atomic number = 35 - 17 = 18. The tempting answer 17 is the number of protons, not neutrons.",
      "clue": "Mass number counts protons and neutrons together."
    },
    "b": {
      "d": 3,
      "q": "An ion has 13 protons, 14 neutrons and 10 electrons. What is its charge and mass number?",
      "opts": ["3+ and 27", "3- and 27", "3+ and 24", "10+ and 37"],
      "why": "Charge = protons minus electrons = 13 - 10 = 3+. Mass number = 13 + 14 = 27. Electrons are not counted in mass number, so 24 is wrong, and 3- reverses the charge.",
      "clue": "More protons than electrons means a positive charge."
    }
  },
  "chem-periodic-table-s-layout": {
    "title": "The periodic table's layout",
    "card": [
      "The periodic table lists the elements in order of increasing atomic number, starting with hydrogen.",
      [
        "Groups",
        "the vertical columns, numbered 1 to 18. Elements in the same group have similar chemical properties, and each one sits in a different period."
      ],
      [
        "Periods",
        "the horizontal rows, numbered from 1 at the top. Atomic number increases from left to right along a period. The f-block elements are shown in two rows below the main table."
      ],
      "Group 1, apart from hydrogen, holds the alkali metals. Group 18 holds the noble gases, which are very unreactive."
    ],
    "remember": "Columns are groups with similar properties. Rows are periods in order of atomic number.",
    "a": {
      "q": "Lithium, sodium and potassium are in group 1. What does this tell you about them?",
      "opts": [
        "They have similar chemical properties",
        "They have the same atomic number",
        "They are in the same period",
        "They are all noble gases"
      ],
      "why": "Elements in one group, a column, have similar chemical properties. Each sits in a different period, and atomic number rises through the table, so they cannot share a period or an atomic number. Group 1 holds the alkali metals, not the noble gases.",
      "clue": "A group is a column, not a row."
    },
    "b": {
      "d": 3,
      "q": "Neon and argon are both noble gases, and argon has the higher atomic number. Which statement is correct?",
      "opts": [
        "Both are in group 18, in different periods",
        "Both are in group 1, in different periods",
        "Both are in group 18, in the same period",
        "Both are in the same period, in different groups"
      ],
      "why": "Noble gases make up group 18, so neon and argon share a column. Each element in a group sits in a different period, so they are in different rows. Saying they share group 18 and a period is tempting, but one column has only one element in each row.",
      "clue": "Can two elements in one column share a row?"
    }
  },
  "chem-critical-elements": {
    "title": "Critical elements",
    "card": [
      "A critical element is one that industry and society need but that is scarce or hard to get. Supply can be limited by small deposits, by mining in only a few places, or by how hard it is to extract.",
      "Helium is used to cool the magnets in MRI scanners. Phosphorus is used in fertiliser, and farming needs it to grow crops. Rare-earth metals are used in magnets, phone screens and wind turbines.",
      "These elements, like all elements, cannot be made by chemical reactions. Once they are lost, they are hard to replace. Helium, for example, escapes into the atmosphere when the gas is released.",
      "Recycling recovers these elements from waste, such as old electronics. This makes supply last longer, and it reduces the need to mine new ore."
    ],
    "remember": "Critical elements are needed but scarce, so recovering them by recycling helps supply last.",
    "a": {
      "q": "Why is a rare-earth metal called a critical element?",
      "opts": [
        "It is needed for technology but its supply is limited",
        "It is the most common metal in Earth's crust",
        "It can be made easily in a reaction when stocks run low",
        "It has very few uses, so industry rarely needs it"
      ],
      "why": "A critical element is needed by industry and is scarce or hard to get. Rare-earth metals are used in magnets and screens, but few places have deposits worth mining and extraction is hard. No chemical reaction can make an element, so stocks cannot be topped up that way.",
      "clue": "Think about need and supply together."
    },
    "b": {
      "d": 3,
      "q": "Dev runs a recycling plant in Geelong. He starts recovering rare-earth metals from old phones. Why does this help the supply of these elements?",
      "opts": [
        "It reuses limited atoms, so less new ore is needed",
        "It turns common elements into rare-earth metals",
        "It makes the rare-earth metals less useful to industry",
        "It makes more atoms of these elements as they are recycled"
      ],
      "why": "Recycling recovers atoms that are already in use, so less new ore needs to be mined. The tempting option is that recycling makes more atoms, but it only recovers those that exist. No chemical reaction can turn common elements into rare-earth metals either.",
      "clue": "Recycling gets back atoms that already exist."
    }
  },
  "chem-lewis-structures": {
    "title": "Lewis structures",
    "card": [
      "A Lewis structure shows the valence electrons of a molecule. Each line is a bonding pair shared between two atoms. Each pair of dots is a lone pair on one atom.",
      "To draw one, count the total valence electrons from all atoms. Join the atoms with single bonds, then place lone pairs so that each atom has a full outer shell.",
      "Hydrogen is full with 2 electrons. Carbon, nitrogen, oxygen and fluorine are full with 8, shown as bonding pairs plus lone pairs.",
      "Some atoms share more than one pair. A double bond is two shared pairs and a triple bond is three. Count each bonding pair once for the atom at each end."
    ],
    "remember": "Lines are shared pairs, dots are lone pairs, and each atom ends up with a full outer shell.",
    "a": {
      "q": "In the Lewis structure of ammonia, NH3, how many lone pairs are on the nitrogen atom?",
      "opts": ["1", "0", "2", "3"],
      "why": "Nitrogen has 5 valence electrons. Three are shared in N-H bonds, so 2 electrons remain as 1 lone pair. That gives 3 bonding pairs plus 1 lone pair, which is 8 electrons. Zero is tempting, but it would leave nitrogen with only 6.",
      "clue": "Nitrogen needs 8 electrons around it, and 6 are in bonds."
    },
    "b": {
      "d": 3,
      "q": "A chemist draws the Lewis structure of water, H2O. Which description is correct?",
      "opts": [
        "Two O-H bonds and two lone pairs on oxygen",
        "Two O-H bonds and one lone pair on oxygen",
        "Two O-H bonds and no lone pairs on oxygen",
        "Two O-H bonds and two lone pairs on each hydrogen"
      ],
      "why": "Oxygen has 6 valence electrons. Two are shared in bonds, leaving 4 electrons as 2 lone pairs, so oxygen has 8 around it. Hydrogen is full with its one bonding pair, so it has no lone pairs.",
      "clue": "Oxygen has 6 valence electrons and uses 2 in bonds."
    }
  },
  "chem-molecular-shapes": {
    "title": "Molecular shapes",
    "card": [
      "Electron pairs around a central atom repel each other. They move as far apart as possible, and this sets the shape of the molecule.",
      "Count the bonding pairs and lone pairs around the central atom. Each double or triple bond counts as one region, in the same way as a single bond.",
      ["Linear", "two regions, such as CO2, which has two double bonds. The atoms lie in a straight line."],
      [
        "Others",
        "With four regions the pairs point to the corners of a tetrahedron. Four bonds make a tetrahedral shape, as in CH4. Three bonds and one lone pair make pyramidal, as in NH3. Two bonds and two lone pairs make bent, as in H2O. The shape names only the atoms, not the lone pairs."
      ]
    ],
    "remember": "Count the regions of electrons around the central atom, then name the shape by where the atoms sit.",
    "a": {
      "q": "Why is a water molecule bent and not linear?",
      "opts": [
        "Two lone pairs on oxygen repel the bonding pairs",
        "The two hydrogen atoms repel each other strongly",
        "Oxygen has no lone pairs, so the bonds bend",
        "Hydrogen atoms are smaller than oxygen atoms"
      ],
      "why": "Oxygen has four regions of electrons: two bonding pairs and two lone pairs. They spread out in a tetrahedral arrangement, so the two H atoms sit at an angle. The idea that the hydrogens repel each other is tempting, but the pairs of electrons cause the shape.",
      "clue": "Look at all the electron pairs on oxygen, not only the bonds."
    },
    "b": {
      "d": 3,
      "q": "Phosphine, PH3, has three P-H bonds and one lone pair on phosphorus. What is its shape?",
      "opts": ["Pyramidal", "Tetrahedral", "Bent", "Linear"],
      "why": "There are four regions of electrons, so they point to the corners of a tetrahedron. Only three of them hold atoms, so the atoms form a pyramidal shape. Tetrahedral is tempting, but that needs four bonded atoms.",
      "clue": "The shape is named by the atoms only, not the lone pair."
    }
  },
  "chem-polarity-bonds-molecules": {
    "title": "Polarity of bonds and molecules",
    "card": [
      "Electronegativity is how strongly an atom pulls shared electrons towards itself. It rises across a period and up a group, so fluorine is the highest, and chlorine is higher than hydrogen.",
      [
        "Polar bond",
        "a bond between atoms with different electronegativities. The shared pair sits closer to the atom with the stronger pull, which gains a slight negative charge, and the other a slight positive charge."
      ],
      [
        "Non-polar bond",
        "a bond between atoms with the same, or almost the same, electronegativity, so the electrons are shared evenly."
      ],
      [
        "Polar molecule",
        "a molecule whose shape leaves the charges uneven, so one side is slightly negative and the other slightly positive. If polar bonds are arranged so their pulls cancel, the molecule is non-polar."
      ]
    ],
    "remember": "Unequal pull makes a bond polar. Uneven charge across the whole shape makes a molecule polar.",
    "a": {
      "q": "Why is the bond in a hydrogen chloride molecule, H-Cl, polar?",
      "opts": [
        "Chlorine pulls the shared pair harder than hydrogen does",
        "Hydrogen and chlorine share their electrons equally",
        "Chlorine gives one of its electrons fully to hydrogen",
        "Hydrogen pulls the shared pair harder than chlorine does"
      ],
      "why": "Chlorine is more electronegative than hydrogen, so the shared pair sits closer to chlorine, which becomes slightly negative. Hydrogen has the weaker pull, so it becomes slightly positive, not negative.",
      "clue": "Which of the two atoms has the higher electronegativity?"
    },
    "b": {
      "d": 3,
      "q": "A molecule has two polar bonds pointing in exactly opposite directions from the central atom, so the pulls cancel. How is the molecule best described?",
      "opts": [
        "Non-polar, because the charges are spread evenly",
        "Polar, because each bond is polar",
        "Non-polar, because its bonds are non-polar",
        "Polar, because the central atom is slightly positive"
      ],
      "why": "Opposite pulls cancel, so the charges are even across the molecule and it is non-polar, even though each bond is polar. Having polar bonds does not make a molecule polar when the shape evens out the charges.",
      "clue": "Look at what the two equal pulls do to each other."
    }
  },
  "chem-properties-molecular-substances": {
    "title": "Properties of molecular substances",
    "card": [
      "A molecular substance is made of separate molecules. The atoms within each molecule are held by strong covalent bonds. The molecules are held to each other by much weaker forces.",
      "To melt or boil a molecular substance, only these weak forces between molecules must be overcome. The covalent bonds stay intact. So melting and boiling points are low.",
      "Molecules have no free charged particles. They have no ions, and their electrons stay in bonds or lone pairs. So molecular substances do not conduct electricity as solids or liquids.",
      "Many molecular substances are gases or liquids at room temperature. Solids are often soft and easy to break."
    ],
    "remember": "Weak forces between molecules mean low melting points, and no free charges means no conduction.",
    "a": {
      "q": "Why does a molecular substance such as wax melt at a low temperature?",
      "opts": [
        "Only weak forces between molecules must be overcome",
        "The covalent bonds in each molecule are weak",
        "The atoms in each molecule are free to move as ions",
        "Its electrons are free to move through the substance"
      ],
      "why": "Melting separates molecules from each other, which takes little energy because the forces between them are weak. The strong covalent bonds inside the molecules stay intact. Saying the covalent bonds are weak is tempting, but they are not broken when it melts.",
      "clue": "What is pulled apart when a molecular solid melts?"
    },
    "b": {
      "d": 2,
      "q": "Liquid ethanol is tested with a battery and a globe. The globe stays off. What is the best explanation?",
      "opts": [
        "It has no free ions or electrons to carry charge",
        "Its covalent bonds block the flow of electricity",
        "Its melting point is too low to conduct",
        "Its molecules are too large to move"
      ],
      "why": "Ethanol is made of molecules, with no ions and no free electrons. Without charged particles able to move, there is no current. Low melting point is a property of such substances, but it does not explain the lack of conduction.",
      "clue": "Conduction needs charged particles that can move."
    }
  },
  "chem-covalent-network-lattices": {
    "title": "Diamond and graphite",
    "card": [
      "Diamond and graphite are both made only of carbon atoms. Each is a covalent network: atoms are joined by strong covalent bonds in a huge continuous lattice, not in small separate molecules.",
      [
        "Diamond",
        "each carbon atom bonds to four others in a three-dimensional lattice. With all four valence electrons held in bonds, none are free to move, so diamond is very hard and does not conduct electricity."
      ],
      [
        "Graphite",
        "each carbon atom bonds to three others in flat layers. Its fourth electron is delocalised, meaning it is free to move along the layer, so graphite conducts electricity."
      ],
      "Weak forces hold graphite's layers together, so the layers slide and graphite is soft. Uses follow: diamond suits cutting and drilling tools, and graphite suits pencils, lubricants and electrodes."
    ],
    "remember": "Diamond is hard because every carbon bonds in 3D. Graphite conducts because one electron per atom is free to move.",
    "a": {
      "q": "Why can graphite conduct electricity but diamond cannot?",
      "opts": [
        "Graphite has delocalised electrons that move along layers",
        "Graphite has ions that can move when the solid is heated",
        "Graphite has weaker covalent bonds within each layer",
        "Graphite has more carbon atoms in its lattice than diamond"
      ],
      "why": "In graphite each carbon uses three electrons in bonds, and the fourth is delocalised and moves along the layer. In diamond all four electrons are held in bonds. The bonds within graphite layers are still strong, so weaker bonds are not the reason.",
      "clue": "Count how many electrons each carbon atom holds in bonds."
    },
    "b": {
      "d": 3,
      "q": "Priya's company needs a material for the tip of a drill that cuts through rock. Which material and reason suit best?",
      "opts": [
        "Diamond, as each carbon bonds strongly to four others",
        "Diamond, as it has delocalised electrons that hold it firm",
        "Graphite, as its layers are strongly bonded to each other",
        "Graphite, as each carbon bonds strongly to three others"
      ],
      "why": "A drill tip must be very hard. Diamond is hard because every carbon is bonded to four others in a rigid 3D lattice. Graphite also has strong bonds in each layer, but its layers slide because the forces between them are weak, so it is soft.",
      "clue": "Think about which structure cannot slide apart in layers."
    }
  },
  "chem-metallic-bonding-2": {
    "title": "Metallic bonding",
    "card": [
      "A metal is a lattice of positive metal ions. Their outer electrons leave the atoms and move freely between the ions as delocalised electrons, often called a sea of electrons.",
      "Metallic bonding is the electrostatic attraction between the positive ions and the delocalised electrons. It is generally strong, so most metals have high melting points.",
      "Free-moving electrons carry electric charge and pass on heat energy, so metals conduct electricity and heat. The electrons also reflect light, which gives metals their lustre.",
      "Layers of ions can slide over each other without breaking the bonding, because the electrons still surround the ions. This makes metals malleable, which means they can be hammered into shape without breaking."
    ],
    "remember": "Positive ions in a sea of moving electrons: the attraction holds the metal together, and the free electrons carry charge and heat.",
    "a": {
      "q": "Which feature of metallic bonding explains why copper conducts electricity?",
      "opts": [
        "Delocalised electrons that are free to move",
        "Positive ions that are free to move",
        "Electrons held tightly between two atoms",
        "Neutral atoms that are free to move"
      ],
      "why": "Delocalised electrons move through the lattice and carry charge. The ions stay in fixed positions in the lattice, so they do not carry the current in a solid metal.",
      "clue": "What moves in a solid metal to carry charge?"
    },
    "b": {
      "d": 3,
      "q": "Hana hammers a sheet of silver into a thin shape and it does not shatter. Which statement best explains this?",
      "opts": [
        "Layers of ions slide while the electrons keep bonding them",
        "Layers of ions slide and the bonding between them breaks",
        "The ions are replaced by neutral atoms as it is hammered",
        "The electrons are pushed out of the metal as it is hammered"
      ],
      "why": "When the layers slide, the delocalised electrons still surround the ions, so the attraction remains and the metal stays in one piece. The idea that the bonding breaks is tempting, but breaking the bonding would make the metal crack.",
      "clue": "After the layers slide, what still surrounds the ions?"
    }
  },
  "chem-reactivity-metals": {
    "title": "Reactivity of metals",
    "card": [
      "Reactivity is how readily a metal reacts with other substances, such as water, acids and oxygen. A more reactive metal reacts faster and more vigorously.",
      "Reactivity is found by experiment. Students compare what they see, such as how fast bubbles form or how quickly a metal tarnishes, under the same conditions.",
      "Ranking metals from most reactive to least reactive gives a reactivity series. In it, potassium, sodium and calcium are high, magnesium and zinc are in the middle, and copper and gold are low.",
      "A metal high in the series reacts strongly with acid. A metal low in the series reacts weakly or not at all. For example, magnesium fizzes quickly in dilute hydrochloric acid, but copper shows no reaction."
    ],
    "remember": "The faster and more vigorously a metal reacts, the higher it sits in the reactivity series.",
    "a": {
      "q": "Pieces of zinc, magnesium and copper of equal size are placed in dilute acid. Magnesium fizzes fastest, zinc fizzes slowly and copper does not react. What does this show?",
      "opts": [
        "Magnesium is more reactive than zinc, and zinc than copper",
        "Copper is more reactive than zinc, and zinc than magnesium",
        "Zinc is the most reactive, as it reacts at a steady pace",
        "All three have the same reactivity, but differ in size"
      ],
      "why": "The faster the reaction, the more reactive the metal, so the order is magnesium, then zinc, then copper. Copper showing no reaction does not make it the most reactive. It places it lowest in the series.",
      "clue": "Faster, more vigorous reaction means higher in the series."
    },
    "b": {
      "d": 2,
      "q": "Priya tests four metals in dilute acid. Metal W produces no bubbles, X produces a few slow bubbles, Y produces rapid bubbles, and Z produces bubbles at a medium rate. Which list orders them from most reactive to least reactive?",
      "opts": ["Y, Z, X, W", "W, X, Z, Y", "Z, Y, X, W", "Y, X, Z, W"],
      "why": "Rapid bubbles mean the most reactive metal (Y), then medium (Z), then slow (X), then no reaction (W). The list W, X, Z, Y reverses the order by treating no reaction as most reactive.",
      "clue": "Rank by how fast bubbles form, fastest first."
    }
  },
  "chem-metal-recycling": {
    "title": "Metal recycling",
    "card": [
      "Metal recycling collects used metal, melts it and makes it into new products. This avoids mining and processing new ore, which is rock that contains a metal.",
      "A circular economy keeps materials in use by reusing and recycling them. A linear economy takes resources, makes a product and throws it away.",
      "Recycling saves ore, so fewer new mines are needed. It also usually saves energy, because melting scrap metal often needs less energy than extracting metal from ore.",
      "Metals suit recycling because they can be melted and reshaped many times. Scrap metal must still be collected and sorted by type before it is melted."
    ],
    "remember": "Recycling metal keeps it in use, so less ore is mined and usually less energy is needed.",
    "a": {
      "q": "Which action is an example of a circular economy for metals?",
      "opts": [
        "Melting old steel cans to make new steel products",
        "Burying old steel cans in a landfill site",
        "Mining more iron ore to make new steel cans",
        "Storing old steel cans in a shed for many years"
      ],
      "why": "Melting old cans to make new products keeps the metal in use. Burying them is the linear path, where the metal is used once and thrown away.",
      "clue": "Which action puts the used metal back into use?"
    },
    "b": {
      "d": 3,
      "q": "A Geelong company melts scrap aluminium to make new bike frames instead of using aluminium from new ore. Which statement about this choice is correct?",
      "opts": [
        "Less ore is mined, and less energy is usually used",
        "Less ore is mined, and scrap usually needs no sorting",
        "More ore is mined, but less energy is usually used",
        "Less ore is mined, but the frames usually cannot be recycled"
      ],
      "why": "The scrap replaces ore, so less ore is mined, and melting scrap usually takes less energy than extracting metal from ore. Scrap still has to be collected and sorted by type before melting, so the sorting option is wrong. Metals can be melted and reshaped many times, so the frames can be recycled again.",
      "clue": "Check each claim against what happens to scrap before it is melted."
    }
  },
  "chem-properties-ionic-compounds": {
    "title": "Properties of ionic compounds",
    "card": [
      "An ionic compound is a lattice of positive and negative ions held together by strong electrostatic attraction. A lot of energy is needed to pull the ions apart.",
      [
        "High melting point",
        "Ionic compounds are solid at room temperature and melt at high temperatures, because the strong attractions in the lattice must be overcome."
      ],
      [
        "Brittle",
        "A hard blow can shift one layer of ions so that ions of the same charge line up. They repel, and the crystal cracks or shatters."
      ],
      [
        "Conduction",
        "A solid does not conduct electricity, because its ions are fixed in place. When molten or dissolved in water, the ions are free to move and carry charge."
      ]
    ],
    "remember": "Strong attractions in the lattice give high melting points. Conduction needs ions free to move.",
    "a": {
      "q": "Why does solid sodium chloride not conduct electricity, while molten sodium chloride does?",
      "opts": [
        "Its ions are fixed in solid, but free to move when molten",
        "It has no ions in solid, but forms ions when it melts",
        "Its electrons are fixed in solid, but free when molten",
        "Its ions are attracted in solid, but repel when molten"
      ],
      "why": "In the solid lattice the ions cannot move, so no charge is carried. When molten, the ions are free to move and carry charge. Sodium chloride already has ions as a solid, so it does not form them on melting.",
      "clue": "Think about what carries the charge, and whether it can move."
    },
    "b": {
      "d": 3,
      "q": "A hammer strikes a crystal of magnesium oxide and it shatters into pieces. What best explains this?",
      "opts": [
        "Layers shift and like-charged ions line up and repel",
        "Layers slide over each other while electrons hold them",
        "The strong attractions between ions are weak when struck",
        "Free electrons are pushed out of the lattice by the blow"
      ],
      "why": "A blow shifts a layer of ions so ions of the same charge sit side by side. They repel and the crystal splits. Layers do not slide smoothly, because there is no sea of electrons to hold them together as in a metal.",
      "clue": "An ionic lattice has no free electrons to hold shifted layers."
    }
  },
  "chem-writing-ionic-formulas": {
    "title": "Writing ionic formulas",
    "card": [
      "An ionic compound has no overall charge. The total positive charge from the cations must equal the total negative charge from the anions.",
      "To write a formula, find the charge on each ion, then choose the numbers of each ion that cancel out. Write the cation first. Magnesium (Mg²⁺) and chloride (Cl⁻) need one Mg²⁺ and two Cl⁻, so the formula is MgCl₂.",
      "A polyatomic ion is a group of atoms with one overall charge, such as sulfate (SO₄²⁻) and nitrate (NO₃⁻). If you need more than one, put the whole ion in brackets and write the number after it, as in Mg(NO₃)₂. If you need only one, use no brackets, as in CaSO₄.",
      "To name the compound, write the cation name, then the anion name. A single-atom anion ends in -ide, such as chloride. Polyatomic ions keep their own names, such as sulfate. The numbers in the formula are not part of the name."
    ],
    "remember": "Make the charges add to zero, and use brackets only when you need more than one of a polyatomic ion.",
    "a": {
      "q": "Potassium ions are K⁺ and sulfate ions are SO₄²⁻. What is the formula of potassium sulfate?",
      "opts": ["K₂SO₄", "K(SO₄)₂", "KSO₄", "K₂(SO₄)₂"],
      "why": "Two K⁺ give +2, which cancels one SO₄²⁻. Only one sulfate is needed, so it takes no brackets. K(SO₄)₂ swaps the numbers and gives +1 and -4, which do not cancel.",
      "clue": "How many K⁺ ions cancel one 2- charge?"
    },
    "b": {
      "d": 3,
      "q": "Aluminium ions are Al³⁺ and sulfate ions are SO₄²⁻. What is the formula of aluminium sulfate?",
      "opts": ["Al₂(SO₄)₃", "Al₃(SO₄)₂", "Al(SO₄)₃", "Al(SO₄)₂"],
      "why": "Two Al³⁺ give +6 and three SO₄²⁻ give -6, so the charges cancel. More than one sulfate is needed, so it goes in brackets. Al₃(SO₄)₂ is a tempting swap of the numbers, but it gives +9 and -4.",
      "clue": "Find the smallest total charge that both 3 and 2 divide into."
    }
  },
  "chem-like-dissolves-like": {
    "title": "Like dissolves like",
    "card": [
      "A polar molecule has an uneven spread of charge, so one end is slightly positive and the other slightly negative. A non-polar molecule has an even spread of charge.",
      "Polar solutes tend to dissolve in polar solvents, such as water. Many ionic compounds, such as sodium chloride, also dissolve in water, as the water molecules attract the ions.",
      "Non-polar solutes tend to dissolve in non-polar solvents, such as hexane. Oils and fats dissolve in hexane.",
      "A polar solute and a non-polar solvent usually do not mix. The attractions between the particles of each substance are stronger than the attractions between the two different substances."
    ],
    "remember": "Match the solute to the solvent: polar with polar, non-polar with non-polar.",
    "a": {
      "q": "Which solvent is best for dissolving a non-polar wax?",
      "opts": [
        "Hexane, a non-polar liquid",
        "Water, a polar liquid",
        "Salt water, a solution of ions",
        "Ethanol, a polar liquid"
      ],
      "why": "Wax is non-polar, so it dissolves best in a non-polar solvent such as hexane. Water is the tempting choice because it is the most common solvent, but it is polar and does not dissolve non-polar wax well.",
      "clue": "Match the polarity of the solvent to the wax."
    },
    "b": {
      "d": 3,
      "q": "Priya spills cooking oil on a bench. Water barely cleans it, but hexane removes it easily. What explains this?",
      "opts": [
        "Oil is non-polar, so it mixes with non-polar hexane",
        "Oil is polar, so it mixes with non-polar hexane",
        "Oil is non-polar, so it mixes with polar water",
        "Oil is ionic, so it mixes with non-polar hexane"
      ],
      "why": "Oil is non-polar, so it dissolves in non-polar hexane but not in polar water. The option saying oil is non-polar and mixes with water is tempting, but it reverses the rule and does not fit what Priya saw.",
      "clue": "Decide whether oil is polar, then pick the matching solvent."
    }
  },
  "chem-chromatography": {
    "title": "Chromatography",
    "card": [
      "Chromatography separates the components of a mixture. The sample sits on a stationary phase, such as paper, and a mobile phase, the solvent, moves through it.",
      "Components can differ in how strongly they are attracted to the stationary phase and how well they dissolve in the mobile phase. So they can travel different distances.",
      "A component more attracted to the mobile phase travels further. A component more attracted to the stationary phase travels less far.",
      "Each spot holds at least one component. Components that travel the same distance share a spot, so one spot does not prove a substance is pure. More than one spot shows a mixture."
    ],
    "remember": "More than one spot means a mixture. One spot alone does not prove purity.",
    "a": {
      "q": "A sample of food dye is run on paper and gives three separate spots. What does this show?",
      "opts": [
        "A mixture with at least three components",
        "A mixture with exactly three components",
        "A pure substance that split into three parts",
        "A pure substance with three different colours"
      ],
      "why": "Each spot holds at least one component, so three spots show a mixture of at least three. Exactly three goes too far, because two components that travel the same distance would share one spot.",
      "clue": "Can one spot hold more than one component?"
    },
    "b": {
      "d": 3,
      "q": "Tom runs two samples of ink. Sample X gives one spot and sample Y gives two. Which conclusion is best?",
      "opts": [
        "Y is a mixture, and X may be pure or a mixture",
        "Y is a mixture, and X is certainly pure",
        "Y may be pure or a mixture, and X is pure",
        "X is a mixture, and Y is certainly pure"
      ],
      "why": "Two spots show Y has at least two components, so Y is a mixture. X gave one spot, but components that travel the same distance share a spot, so X may still be a mixture. Saying X is certainly pure claims more than one spot can prove.",
      "clue": "Could two components in X have travelled the same distance?"
    }
  },
  "chem-rf-values": {
    "title": "Rf values",
    "card": [
      "The Rf value of a spot is the distance the spot travelled divided by the distance the solvent travelled. Both are measured from the starting line.",
      "Rf = distance moved by the spot ÷ distance moved by the solvent front. Rf has no units, and it is between 0 and 1.",
      "Rf depends on the substance, the solvent and the stationary phase. With the same solvent and paper, a substance gives the same Rf each time.",
      "Matching a spot's Rf to a known value helps identify the substance. A matching Rf suggests the same substance but does not prove it."
    ],
    "remember": "Rf = spot distance ÷ solvent distance. Compare it with known values to help identify a substance.",
    "a": {
      "q": "A spot moves 3.0 cm while the solvent front moves 12.0 cm. What is the Rf value?",
      "opts": ["0.25", "4.0", "0.75", "0.25 cm"],
      "why": "Rf = 3.0 ÷ 12.0 = 0.25. The value 4.0 comes from dividing the wrong way round. Rf has no units, so 0.25 cm is wrong.",
      "clue": "Spot distance goes on top."
    },
    "b": {
      "d": 2,
      "q": "Aisha runs a pen ink and a known dye on the same sheet of paper with the same solvent. The ink spot has Rf 0.40 and the dye has Rf 0.62. What can she conclude?",
      "opts": [
        "The ink spot is not the same substance as the dye",
        "The ink spot is the same substance as the dye",
        "The ink spot travelled further up the paper than the dye",
        "The ink spot would give Rf 0.62 in any other solvent"
      ],
      "why": "Under the same conditions, a substance gives the same Rf each time. The values 0.40 and 0.62 differ, so the ink spot is not that dye. On the same sheet the solvent front is shared, so the lower Rf means the ink spot travelled a shorter distance, not further.",
      "clue": "Same substance, same conditions, same Rf."
    }
  },
  "chem-hydrocarbons": {
    "title": "Families of organic compounds",
    "card": [
      "Organic compounds are built on chains of carbon atoms. A family is a group of compounds that share a general formula and a similar set of properties.",
      [
        "Alkanes and alkenes",
        "These contain only carbon and hydrogen. Alkanes have only single bonds between carbons (CnH2n+2). Alkenes have one C=C double bond (CnH2n)."
      ],
      [
        "Haloalkanes",
        "These are alkanes where one or more hydrogen atoms are replaced by a halogen atom, such as chlorine or bromine."
      ],
      [
        "Alcohols and carboxylic acids",
        "Alcohols (CnH2n+1OH) contain an OH group. Carboxylic acids (CnH2n+1COOH) contain a COOH group and act as weak acids."
      ]
    ],
    "remember": "Each family has a general formula, and its group of atoms gives its properties.",
    "a": {
      "q": "Which compound is an alkene, using its general formula?",
      "opts": ["C3H6", "C3H8", "C3H7OH", "C3H7Cl"],
      "why": "Alkenes follow CnH2n, and C3H6 fits with n = 3. C3H8 is tempting because it has only carbon and hydrogen, but it fits CnH2n+2, so it is an alkane.",
      "clue": "Check which formula matches CnH2n."
    },
    "b": {
      "d": 3,
      "q": "A lab technician has a liquid with the formula C2H5Br. Which family does it belong to?",
      "opts": ["Haloalkane", "Alkene", "Alcohol", "Alkane"],
      "why": "One hydrogen of ethane has been replaced by a bromine atom, so it is a haloalkane. It is not an alkane, because an alkane has only carbon and hydrogen atoms.",
      "clue": "Look for an atom other than carbon and hydrogen."
    }
  },
  "chem-functional-groups": {
    "title": "Structural and semi-structural formulas",
    "card": [
      "A molecular formula, such as C2H6O, counts each atom but hides how they are joined. Structural and semi-structural formulas show the joins, including the functional group: the atoms that set a family apart.",
      [
        "Structural formula",
        "shows every atom and every bond as a line. Each carbon has four bonds, each hydrogen has one and each oxygen has two."
      ],
      [
        "Semi-structural formula",
        "writes the molecule in a line and groups the hydrogens with each carbon, such as CH3CH2OH. Bonds are left out, except double bonds, which are often shown as =."
      ],
      "An alcohol has an -OH group on a carbon that has no =O. In the -COOH group of a carboxylic acid, the =O and the -OH share one carbon, so that -OH is not an alcohol group."
    ],
    "remember": "Structural shows every bond, semi-structural groups atoms by carbon. An -OH beside a =O is part of -COOH, not an alcohol.",
    "a": {
      "q": "Which semi-structural formula shows an alcohol?",
      "opts": ["CH3CH2OH", "CH3CH2COOH", "CH3CH2CH3", "CH3CH2CH2CH3"],
      "why": "CH3CH2OH has an -OH group on a carbon with no =O, which makes it an alcohol. CH3CH2COOH has its -OH on the same carbon as a =O, so it is a -COOH group and the compound is a carboxylic acid. The other two contain only carbon and hydrogen.",
      "clue": "Find an -OH on a carbon that has no =O."
    },
    "b": {
      "d": 3,
      "q": "A student writes CH3COOH for a compound. Which statement about this formula is correct?",
      "opts": [
        "It shows a carboxylic acid, because it has a -COOH group",
        "It shows an alcohol, because it contains O and H atoms",
        "It shows an alcohol, because it has an -OH group",
        "It shows a carboxylic acid, because it has two carbons"
      ],
      "why": "The last carbon carries both a =O and an -OH, which together make the -COOH group of a carboxylic acid. The -OH is tempting, but an alcohol's -OH sits on a carbon with no =O, so this one is not an alcohol group. Having two carbons does not decide the family.",
      "clue": "What else is on the carbon that holds the -OH?"
    }
  },
  "chem-naming-simple-organic-compounds": {
    "title": "Naming simple organic compounds",
    "card": [
      "An IUPAC name has a stem for the number of carbons in the longest chain: meth (1), eth (2), prop (3), but (4), pent (5), hex (6).",
      "The ending shows the bonds or family. -ane means only single bonds between carbons, and -ene means a C=C double bond. -ol means an alcohol, and -oic acid means a carboxylic acid.",
      "A number shows where a feature sits on the chain. Count from the end that gives the lower number. In but-2-ene, the double bond starts at carbon 2.",
      "A halogen on the chain is named as a prefix: chloro, bromo or fluoro. The number shows which carbon it is attached to, as in 2-chloropropane."
    ],
    "remember": "Read a name in parts: the stem gives the chain length, the ending gives the bonds or family, and numbers give the position.",
    "a": {
      "q": "What does the name pent-1-ene tell you about this compound?",
      "opts": [
        "Five carbons in the chain and a double bond at carbon 1",
        "Five carbons in the chain and a single bond at carbon 1",
        "One carbon in the chain and five double bonds",
        "Five carbons in the chain and an alcohol group on carbon 1"
      ],
      "why": "Pent means five carbons, -ene means a C=C double bond, and 1 gives its position. The alcohol option is tempting, but an alcohol would end in -ol, not -ene.",
      "clue": "Split the name into stem, number and ending."
    },
    "b": {
      "d": 3,
      "q": "A compound has a chain of three carbons, only single bonds, and a chlorine atom on the second carbon. What is its name?",
      "opts": ["2-chloropropane", "2-chloropropene", "3-chloropropane", "2-chlorobutane"],
      "why": "Three carbons gives prop, and only single bonds gives -ane. Chlorine on carbon 2 gives the prefix 2-chloro. Propene is wrong because that ending would mean a double bond.",
      "clue": "Which ending matches only single bonds?"
    }
  },
  "chem-organic-chemicals-from-plants": {
    "title": "Organic chemicals from plants",
    "card": [
      "Biomass is material from living or recently living things, such as wood, crop waste and algae. Plants build their biomass from carbon dioxide and water, using energy from sunlight.",
      "Crude oil is the source of most organic chemicals today. It formed over millions of years and cannot be replaced in a human lifetime, so it is non-renewable.",
      "Plant biomass is renewable, because new plants can be grown within months or years. Chemists can turn it into solvents, medicines, adhesives, dyes and paints.",
      "Using biomass in place of oil can cut the demand for oil. It still needs land, water and energy to grow and process the plants."
    ],
    "remember": "Plants regrow in a human lifetime, oil does not, so biomass can replace oil as a source of organic chemicals.",
    "a": {
      "q": "Why is plant biomass called a renewable source of organic chemicals?",
      "opts": [
        "New plants can be grown within a human lifetime",
        "It releases no carbon dioxide when it is processed",
        "It is made by living things, so it never runs short",
        "It forms deep underground over millions of years"
      ],
      "why": "Biomass is renewable because crops and trees can be regrown within months or years. Oil also came from living things long ago, but it takes millions of years to form, so it cannot be replaced in a human lifetime.",
      "clue": "Think about how long it takes to replace each source."
    },
    "b": {
      "d": 3,
      "q": "Zara runs a paint company in Ballarat. She wants to cut her use of crude oil, so she makes a solvent from sugarcane waste. What is the best reason this change helps?",
      "opts": [
        "Sugarcane can be regrown, so less oil is needed",
        "Sugarcane needs no land, water or energy to produce",
        "Sugarcane solvents are always safer than oil solvents",
        "Sugarcane waste is made of different elements from oil"
      ],
      "why": "Sugarcane regrows in a short time, so using it in place of oil cuts the demand for non-renewable oil. The other options say too much: the card says growing and processing plants still need land, water and energy, and nothing says biomass solvents are always safer.",
      "clue": "Compare how fast each source can be replaced."
    }
  },
  "chem-organic-materials-everyday-life": {
    "title": "Organic materials in everyday life",
    "card": [
      "Organic compounds are built around carbon atoms, usually joined to hydrogen and often to oxygen, nitrogen or other elements. Many everyday materials are made of them.",
      "Fabrics such as cotton, wool and nylon are organic. So are foods such as sugars, fats and proteins.",
      "Many medicines, cosmetics and pesticides are organic compounds. Some come from living things and some are made in a laboratory.",
      "Many parts of a car are organic too, such as tyres, seat fabric, paint and the plastic dashboard. Not every part is: metal parts, such as the body and engine, and the glass are not organic."
    ],
    "remember": "Organic compounds are in many things we wear, eat, use and drive.",
    "a": {
      "q": "Which of these everyday materials is made mainly of organic compounds?",
      "opts": ["A cotton shirt", "A window pane of glass", "A steel car body", "A table salt crystal"],
      "why": "Cotton is made of compounds built around carbon joined to hydrogen and oxygen, so it is organic. Glass and salt are not built around carbon, and a steel body is mostly metal, so these are not organic.",
      "clue": "Which material is built from carbon joined to hydrogen?"
    },
    "b": {
      "d": 2,
      "q": "Ali's family car has the parts listed below. Which part is not made of organic compounds?",
      "opts": ["The steel engine block", "The rubber tyres", "The painted dashboard trim", "The fabric seat covers"],
      "why": "Steel is a metal, and the card lists metal parts as not organic. Rubber, paint and fabric are all made of organic compounds. The tempting choice is the paint, but paint is organic too.",
      "clue": "Check which kinds of car parts the card says are not organic."
    }
  },
  "chem-addition-condensation-polymers": {
    "title": "Addition and condensation polymers",
    "card": [
      [
        "Addition",
        "Monomers with a carbon-carbon double bond join by opening that bond. Every atom in the monomers ends up in the polymer, so nothing is lost."
      ],
      [
        "Condensation",
        "Monomers join by reacting at functional groups on their ends. Each time two monomers link, a small molecule such as water is released."
      ],
      "A condensation monomer needs a reactive group at each end, such as an acid group or an alcohol group. This lets the chain keep growing in both directions.",
      "To classify a polymer, ask whether a small molecule is given off when it forms. If none is, it is an addition polymer. If one is, it is a condensation polymer."
    ],
    "remember": "Addition: nothing lost. Condensation: a small molecule such as water is released.",
    "a": {
      "q": "Which observation shows that a polymer forms by condensation polymerisation?",
      "opts": [
        "Water is released each time two monomers link",
        "The monomers each contain a C=C double bond",
        "The polymer has a larger mass than one monomer",
        "The polymer forms as a very long carbon chain"
      ],
      "why": "A small molecule such as water is given off at each link, so atoms are lost from the monomers. A polymer is always heavier than one monomer, so that does not tell the types apart.",
      "clue": "Think about what leaves the reaction."
    },
    "b": {
      "d": 3,
      "q": "In a lab, 100 g of a monomer is fully converted to polymer. The polymer has a mass of 100 g and no other product forms. What type of polymerisation is it?",
      "opts": [
        "Addition, because no atoms were lost from the monomer",
        "Condensation, because the monomer joined into chains",
        "Addition, because the monomer must contain an acid group",
        "Condensation, because the polymer has a very large mass"
      ],
      "why": "The polymer has the same mass as the monomer used, so no small molecule was released. That fits addition polymerisation. Forming long chains happens in both types, so it does not suggest condensation.",
      "clue": "Compare the mass before and after."
    }
  },
  "chem-thermoplastics-thermosets": {
    "title": "Thermoplastics and thermosets",
    "card": [
      [
        "Thermoplastic",
        "The polymer chains are not joined to each other by covalent bonds. Only weak forces hold neighbouring chains together."
      ],
      [
        "Thermoset",
        "Strong covalent bonds, called cross-links, join the chains into one network. The cross-links hold the chains in place."
      ],
      "Heating a thermoplastic weakens the forces between chains, so the chains slide past each other. The plastic softens and can be reshaped, then sets again as it cools.",
      "Heating a thermoset does not let its chains slide, as the cross-links hold them. It stays rigid, and strong heating breaks down the polymer instead of softening it."
    ],
    "remember": "Thermoplastic: no cross-links, so it softens. Thermoset: cross-linked, so it stays rigid.",
    "a": {
      "q": "Why can a thermoplastic be softened and reshaped by heating?",
      "opts": [
        "Its chains are not cross-linked, so they can slide",
        "Its chains are joined by strong covalent cross-links",
        "Its chains are all much shorter than thermoset chains",
        "Its chains break into monomers when they are heated"
      ],
      "why": "With no cross-links, only weak forces hold the chains, so heating lets them slide. Cross-links are the feature of thermosets, which is why that option is wrong.",
      "clue": "Think about what holds neighbouring chains together."
    },
    "b": {
      "d": 3,
      "q": "A kettle handle stays rigid and does not soften near hot steam. Which explanation best fits this?",
      "opts": [
        "Cross-links between chains hold them in place",
        "Weak forces let its chains slide past each other",
        "Its chains have no bonds between them at all",
        "It was made from monomers with no double bonds"
      ],
      "why": "A handle that stays rigid when hot suggests a thermoset, whose cross-links stop chains sliding. Weak forces between chains would let it soften.",
      "clue": "Which type does not soften with heat?"
    }
  },
  "chem-designing-polymers": {
    "title": "Designing polymers",
    "card": [
      [
        "Monomer",
        "The monomer sets the polymer's chemistry. Side groups or functional groups on the monomer decide how strongly chains attract each other."
      ],
      [
        "Chain length",
        "Longer chains have more contact with neighbouring chains, so they attract more strongly. Longer chains usually give a stronger, tougher plastic with a higher melting point."
      ],
      [
        "Branching",
        "Chains with many branches cannot pack closely. Weaker attraction between them gives a softer, more flexible plastic with a lower density."
      ],
      "Chemists choose these three features to match a use. A strong, rigid item such as a milk bottle can use closely packed chains. A soft, flexible film such as cling wrap can use highly branched chains."
    ],
    "remember": "Monomer, chain length and branching can be chosen to suit the job.",
    "a": {
      "q": "A chemist wants a plastic that is tougher and has a higher melting point. Which change to the polymer is most likely to help?",
      "opts": [
        "Make the chains longer",
        "Add many more branches to the chains",
        "Use chains that cannot pack closely",
        "Make the chains much shorter"
      ],
      "why": "Longer chains attract each other more strongly, so the plastic is tougher and melts at a higher temperature. More branches stop chains packing closely, which weakens attraction.",
      "clue": "More contact between chains means stronger attraction."
    },
    "b": {
      "d": 2,
      "q": "Mei Ling needs a soft, flexible film to wrap sandwiches. Which polymer design suits this best?",
      "opts": [
        "Highly branched chains that pack loosely",
        "Unbranched chains that pack closely together",
        "Very long chains that pack closely together",
        "Chains that pack as tightly as possible"
      ],
      "why": "Highly branched chains pack loosely, so attraction between them is weaker. This gives a soft, flexible film. Closely packed chains attract more strongly and give a stiffer, stronger plastic.",
      "clue": "Flexible plastics have weaker attraction between chains."
    }
  },
  "chem-fossil-plastics-bioplastics": {
    "title": "Fossil plastics and bioplastics",
    "card": [
      [
        "Fossil plastic",
        "a plastic made from monomers that come from crude oil or natural gas. PVC and polystyrene are examples."
      ],
      [
        "Bioplastic",
        "a plastic made from monomers that come from plants or other living things. PLA (polylactic acid) is made from sugars in crops such as corn."
      ],
      "Where the monomers come from does not decide how a plastic ends its life. Some bioplastics can be composted, but others are not made to break down.",
      "PLA can be composted in industrial facilities, where it is kept hot and moist. In landfill or a home compost it breaks down very slowly. PVC and polystyrene do not compost, but they can be recycled if they are collected and sorted by type."
    ],
    "remember": "Fossil plastics start from oil. Bioplastics start from plants. Each needs the right disposal.",
    "a": {
      "q": "Which statement correctly describes PLA?",
      "opts": [
        "Its monomers come from plants, and it can be composted",
        "Its monomers come from oil, and it can be composted",
        "Its monomers come from plants, and it cannot be composted",
        "Its monomers come from oil, and it cannot be composted"
      ],
      "why": "PLA is made from plant sugars, so it is a bioplastic, and it can be composted in industrial facilities. The options with oil are wrong because oil is the source of fossil plastics such as PVC.",
      "clue": "Think about what crop sugars are used to make."
    },
    "b": {
      "d": 3,
      "q": "A café in Ballarat swaps its polystyrene cups for PLA cups. Which statement about this change is correct?",
      "opts": [
        "The new cups come from plants but need the right disposal",
        "The new cups come from plants and break down in any bin",
        "The new cups still come from oil but can be composted",
        "The new cups come from plants, as the polystyrene ones did"
      ],
      "why": "PLA monomers come from plants, but the cups still need to go to an industrial composting facility to break down properly. Starting from plants does not make a plastic break down in any bin, so that option is tempting but wrong. Polystyrene comes from oil, not plants.",
      "clue": "A plant source does not decide how the plastic ends its life."
    }
  },
  "chem-linear-circular-economies-plastics": {
    "title": "Linear and circular economies",
    "card": [
      [
        "Linear economy",
        "plastic is made, used and then thrown away. The material is lost to landfill or the environment after one use."
      ],
      [
        "Circular economy",
        "plastic is kept in use for as long as possible. It is reused, recycled or broken down and made into new products."
      ],
      "Some condensation polymers, such as polyesters, can break down by hydrolysis. Water splits the links between monomers, which can return the monomers so they can be used again.",
      "Better design also helps. A product made from one type of plastic is easier to sort and recycle than one made from a mix."
    ],
    "remember": "A linear economy ends in waste. A circular economy keeps the material in use.",
    "a": {
      "q": "Which choice describes a linear economy for plastics?",
      "opts": [
        "Make a bottle, use it once, then send it to landfill",
        "Make a bottle, use it, then recycle it into a new bottle",
        "Make a bottle, use it, then break it into monomers",
        "Make a bottle from one plastic so it is easy to sort"
      ],
      "why": "A linear economy goes from make to use to throw away. The recycling option is tempting but wrong, because it returns the material to use, which is circular.",
      "clue": "Look for the path that ends with the material being thrown away."
    },
    "b": {
      "d": 3,
      "q": "A company in Geelong makes a polyester that water can split back into its monomers. How does this help move towards a circular economy?",
      "opts": [
        "The monomers can be recovered and made into new plastic",
        "The plastic will last longer, so it never needs replacing",
        "The plastic becomes an addition polymer that sorts easily",
        "The monomers are lost, so less plastic reaches landfill"
      ],
      "why": "Hydrolysis splits the links of a condensation polymer, so the monomers can be collected and used again. Losing the monomers would not keep the material in use, so that option is wrong.",
      "clue": "Think about what happens to the monomers after water splits the chains."
    }
  },
  "chem-primary-secondary-data": {
    "title": "Primary and secondary data",
    "card": [
      [
        "Primary data",
        "Data collected first-hand by the person doing the investigation, such as measuring a temperature or a mass in the lab yourself."
      ],
      [
        "Secondary data",
        "Data that someone else collected and that you then use, such as values from a textbook, a database or a published report."
      ],
      "Secondary data must be judged before it is used. You did not control how it was collected, so you check where it came from and whether it suits your question.",
      "The same kind of measurement can be either. A boiling point you measure is primary. The same boiling point read from a data table is secondary."
    ],
    "remember": "Primary data is what you collect yourself. Secondary data is what you take from others, so you must check it.",
    "a": {
      "q": "A student wants the density of ethanol. Which choice is primary data?",
      "opts": [
        "Measuring the mass and volume of ethanol in the lab",
        "Reading the density from a chemistry data book",
        "Copying the density from a classmate's report",
        "Finding the density in a published journal article"
      ],
      "why": "The student collects the measurements first-hand, so this is primary data. The other three take values that other people collected, which makes them secondary data, even though the sources may be reliable.",
      "clue": "Who made the measurement?"
    },
    "b": {
      "d": 3,
      "q": "Priya tests the pH of rainwater at her school in Ballarat. She then compares her results with a council report on rainwater pH in the region. Which statement is correct?",
      "opts": [
        "Her results are primary and the report is secondary",
        "Her results are secondary and the report is primary",
        "Both are primary because both are pH measurements",
        "Both are secondary because both are about rainwater"
      ],
      "why": "Priya collected her own pH readings, so they are primary data for her. The council report was collected by others and she must judge its quality, so it is secondary. The type of measurement does not decide which kind of data it is.",
      "clue": "Ask who collected each set of results, not what was measured."
    }
  },
  "chem-evidence-opinion-anecdote": {
    "title": "Evidence, opinion and anecdote",
    "card": [
      [
        "Evidence",
        "Scientific evidence comes from observations or measurements made under controlled conditions. Others can repeat the work and check the result."
      ],
      [
        "Opinion",
        "a personal view or belief. It may come from an expert, but it has not been tested, so it cannot settle a scientific question."
      ],
      [
        "Anecdote",
        "a story about one person's experience. It may be true, but it was not collected under controlled conditions and nobody can repeat it, so it cannot settle a scientific question."
      ],
      "Opinion and anecdote can suggest an idea worth testing. Only tested, repeatable evidence can show whether the idea is supported."
    ],
    "remember": "What settles a scientific question is how a claim was tested, not who says it or how good the story is.",
    "a": {
      "q": "Why can an anecdote not settle a scientific question?",
      "opts": [
        "It was never tested under controlled, repeatable conditions",
        "It was told by someone who is not a trained scientist",
        "It always describes a result that turns out to be false",
        "It is based on a personal view rather than on an event"
      ],
      "why": "An anecdote describes one experience that was not controlled and that others cannot repeat or check. It may even be true, so it is not always false. Who tells it does not matter either, since even an expert's untested view is only an opinion.",
      "clue": "Compare how an anecdote and evidence are each gathered."
    },
    "b": {
      "d": 3,
      "q": "Liam says his gran's tea stain remover works, because it cleaned his shirt once. Which step would turn this claim into scientific evidence?",
      "opts": [
        "Test it on many identical stains and compare with a control",
        "Ask more family members whether they think it works",
        "Ask a chemistry teacher for their opinion on the claim",
        "Wait to see if the remover cleans his shirt again"
      ],
      "why": "Evidence needs controlled tests that others can repeat, such as many identical stains compared with a control. The other options add more opinions or one more story. A teacher's view is still an opinion, and one repeat on a single shirt is still an anecdote.",
      "clue": "Which step lets other people repeat and check the result?"
    }
  },
  "chem-quality-evidence": {
    "title": "Quality of evidence",
    "card": [
      [
        "Valid",
        "Evidence is valid when the investigation measures what it claims to measure and fairly tests the question. A fair test changes one variable, keeps the others controlled and uses suitable methods."
      ],
      [
        "Authoritative",
        "An authoritative source is written by people with expertise in the area. Their work is usually reviewed by other experts and names its methods and data."
      ],
      [
        "Errors",
        "Random errors make repeated measurements scatter. Systematic errors push results the same way each time, such as a balance that reads too high. Both lower the quality of evidence."
      ],
      [
        "Bias",
        "Bias is when interests or expectations shape how an investigation is done or reported. Checking who paid for the work and what was left out helps spot it."
      ]
    ],
    "remember": "Good evidence tests the right thing, comes from experts, and has its errors and bias checked.",
    "a": {
      "q": "Ravi wants to test whether a fertiliser makes bean plants grow taller. He gives the fertiliser to plants on a sunny windowsill and gives none to plants in a dark cupboard. Why is his evidence weak?",
      "opts": [
        "It is not valid, because light also differs between groups",
        "It is biased, because the fertiliser was made by a company",
        "It has random error, because the plants were measured twice",
        "It is not authoritative, because Ravi is a school student"
      ],
      "why": "A fair test changes only one variable. Here light differs as well as fertiliser, so the investigation does not fairly test the question and the evidence is not valid. Being a student does not make results weak if the method is sound.",
      "clue": "How many things differ between the two groups of plants?"
    },
    "b": {
      "d": 3,
      "q": "A drink company pays a laboratory to test its bottled water. The report says the water is the purest available, but it does not give the methods or the data. Which concern about this evidence is the most direct?",
      "opts": [
        "Bias, because the company paid and left out its data",
        "Random error, because the samples came from one factory",
        "Systematic error, because the company paid for the test",
        "Not valid, because the water was tested in a laboratory"
      ],
      "why": "The company paid for the report and has an interest in the result, and leaving out the methods and data stops others checking it. These are the signs of bias. Systematic error comes from the measuring, such as a faulty balance, not from who paid for the work.",
      "clue": "Think about whose interests the report might serve, and whether anyone else could check it."
    }
  },
  "chem-br-nsted-lowry-acids": {
    "title": "Brønsted-Lowry acids and bases",
    "card": [
      ["Acid", "a substance that donates a proton (H⁺) to another substance. A proton here is a hydrogen ion."],
      [
        "Base",
        "a substance that accepts a proton from another substance. Acid and base roles go together: one gives, the other receives."
      ],
      "In HCl + H₂O → H₃O⁺ + Cl⁻, HCl donates a proton to H₂O. So HCl is the acid and H₂O is the base.",
      [
        "Polyprotic acid",
        "an acid that can donate more than one proton per molecule. H₂SO₄ can donate two. H₃PO₄ can donate three."
      ]
    ],
    "remember": "An acid gives a proton and a base takes it. Polyprotic acids can give more than one.",
    "a": {
      "q": "In the reaction HNO₃ + NH₃ → NO₃⁻ + NH₄⁺, which species acts as the base?",
      "opts": [
        "NH₃, because it accepts a proton from HNO₃",
        "HNO₃, because it accepts a proton from NH₃",
        "NH₃, because it donates a proton to HNO₃",
        "HNO₃, because it donates a proton to NH₃"
      ],
      "why": "NH₃ becomes NH₄⁺, so it gains a proton and is the base. HNO₃ becomes NO₃⁻, so it loses a proton and is the acid. The tempting mistake is to call the larger or first-listed species the base: the role depends on whether a species gives or takes the proton.",
      "clue": "Compare the formula of NH₃ before and after. Did it gain or lose an H?"
    },
    "b": {
      "d": 3,
      "q": "Phosphoric acid, H₃PO₄, is used in some soft drinks. Which statement about it is correct?",
      "opts": [
        "It can donate up to three protons per molecule",
        "It can accept up to three protons per molecule",
        "It can donate one proton, as it has one acidic atom",
        "It can donate three protons, but only to a hydroxide ion"
      ],
      "why": "H₃PO₄ has three hydrogens that can be donated as protons, so it is polyprotic. It is an acid because it donates, not accepts. Its protons can be donated to any base, not only to hydroxide ions.",
      "clue": "Polyprotic means more than one proton can be given. Is an acid a giver or a taker?"
    }
  },
  "chem-strong-weak-acids-2": {
    "title": "Strong and weak acids",
    "card": [
      [
        "Strong acid",
        "An acid that ionises fully in water. Almost every molecule donates its proton, so HCl in water gives H⁺ (as H₃O⁺) and Cl⁻ ions, with almost no HCl left."
      ],
      [
        "Weak acid",
        "An acid that ionises only partly in water. Most molecules stay whole and a small share donate a proton, as in ethanoic acid, which forms an equilibrium."
      ],
      [
        "Bases",
        "The same split applies to bases. A strong base such as NaOH fully dissociates into ions, while a weak base such as NH₃ only partly reacts with water."
      ],
      "Strength is about how much of the acid ionises. Concentration is how much acid is dissolved in a volume, so a dilute strong acid and a concentrated weak acid are both possible."
    ],
    "remember": "Strength is the share that ionises. Concentration is the amount dissolved per volume.",
    "a": {
      "q": "Which statement best describes a weak acid in water?",
      "opts": [
        "Only some of its molecules donate a proton to water",
        "It is always a very dilute solution of acid",
        "Its molecules all donate protons to water at once",
        "It cannot donate any protons to water molecules"
      ],
      "why": "A weak acid ionises only partly, so most molecules stay whole while a few donate protons. Weak does not mean dilute, because strength describes ionisation and concentration describes how much is dissolved.",
      "clue": "Strength describes how much of the acid ionises."
    },
    "b": {
      "d": 3,
      "q": "Tariq has 0.01 M HCl and 2.0 M ethanoic acid. Which statement about these two solutions is correct?",
      "opts": [
        "HCl is the stronger acid, but it is the more dilute one",
        "Ethanoic acid is stronger because it is more concentrated",
        "The two are equally strong because both are acids in water",
        "HCl is the weaker acid because its solution is more dilute"
      ],
      "why": "HCl ionises fully, so it is a strong acid, even at 0.01 M. Ethanoic acid ionises only partly, so it is weak, even at 2.0 M. The tempting wrong answers mix up concentration with strength.",
      "clue": "Ask how much ionises, not how much is dissolved."
    }
  },
  "chem-amphiprotic-substances": {
    "title": "Amphiprotic substances",
    "card": [
      "An amphiprotic substance can donate a proton (H⁺) and can also accept one. So it can act as an acid or as a base.",
      "To donate, it needs a hydrogen it can lose. To accept, it needs a lone pair of electrons to bond to H⁺. Water and HCO₃⁻ have both.",
      "Which role it plays depends on what it reacts with. Water acts as a base with HCl: H₂O + HCl → H₃O⁺ + Cl⁻. It acts as an acid with NH₃: H₂O + NH₃ ⇌ OH⁻ + NH₄⁺.",
      "Amphiprotic does not mean neutral. It means the substance can take either role, depending on its partner."
    ],
    "remember": "Amphiprotic means it can give or take a proton, depending on its partner.",
    "a": {
      "q": "HCO₃⁻ reacts with H₃O⁺ to form H₂CO₃, and with OH⁻ to form CO₃²⁻. Why do these reactions show HCO₃⁻ is amphiprotic?",
      "opts": [
        "It accepts a proton in one and donates in the other",
        "It donates a proton in both of the two reactions",
        "It accepts a proton in both of the two reactions",
        "It is neutral, so it neither donates nor accepts"
      ],
      "why": "With H₃O⁺, HCO₃⁻ gains an H⁺ to become H₂CO₃, so it acts as a base. With OH⁻, it loses an H⁺ to become CO₃²⁻, so it acts as an acid. Amphiprotic does not mean neutral: it means the substance can take either role.",
      "clue": "Compare HCO₃⁻ with each product. Has it gained or lost a hydrogen?"
    },
    "b": {
      "d": 3,
      "q": "In the reaction H₂O + HCO₃⁻ ⇌ OH⁻ + H₂CO₃, what role does water play?",
      "opts": [
        "An acid, because it donates a proton to HCO₃⁻",
        "A base, because it accepts a proton from HCO₃⁻",
        "An acid, because it accepts a proton from HCO₃⁻",
        "A base, because it donates a proton to HCO₃⁻"
      ],
      "why": "H₂O loses an H⁺ to become OH⁻, and HCO₃⁻ gains that H⁺ to become H₂CO₃. Water donates a proton, so it acts as an acid here. It is tempting to call water a base, as it is with HCl, but its role depends on what it reacts with.",
      "clue": "Compare H₂O with OH⁻. Which has lost a hydrogen?"
    }
  },
  "chem-neutralisation": {
    "title": "Neutralisation",
    "card": [
      "Neutralisation is a reaction in which an acid reacts with a base and the acidic properties are used up. The products include a salt, which is an ionic compound made from the acid's negative ion and the base's positive ion.",
      ["Acid and hydroxide", "makes a salt and water. For example, HCl + NaOH → NaCl + H₂O."],
      [
        "Acid and carbonate",
        "makes a salt, water and carbon dioxide gas. For example, 2HCl + CaCO₃ → CaCl₂ + H₂O + CO₂. The gas makes bubbles."
      ],
      "Antacid tablets contain bases such as magnesium hydroxide or calcium carbonate. They neutralise some of the excess hydrochloric acid in the stomach."
    ],
    "remember": "Acid + hydroxide gives salt + water. Acid + carbonate also gives carbon dioxide.",
    "a": {
      "q": "Sulfuric acid reacts completely with sodium hydroxide solution. Which products form?",
      "opts": [
        "Sodium sulfate and water",
        "Sodium sulfate and hydrogen gas",
        "Sodium sulfate, water and carbon dioxide",
        "Sodium oxide and water"
      ],
      "why": "An acid and a hydroxide form a salt and water. The salt is sodium sulfate. Carbon dioxide only forms when the base is a carbonate, and no carbonate is present here.",
      "clue": "The base here is a hydroxide, not a carbonate."
    },
    "b": {
      "d": 3,
      "q": "Ravi takes an antacid tablet containing calcium carbonate for excess stomach acid. Which products form in the stomach?",
      "opts": [
        "Calcium chloride, water and carbon dioxide",
        "Calcium chloride and water only",
        "Calcium hydroxide and carbon dioxide",
        "Calcium chloride, water and hydrogen gas"
      ],
      "why": "Stomach acid is hydrochloric acid. With a carbonate it forms a salt (calcium chloride), water and carbon dioxide. The tempting answer of calcium chloride and water only would be right for a hydroxide, but this base is a carbonate.",
      "clue": "Check whether the base is a hydroxide or a carbonate."
    }
  },
  "chem-ph-scale": {
    "title": "The pH scale",
    "card": [
      "pH = -log₁₀[H₃O⁺], where [H₃O⁺] is the hydronium ion concentration in mol L⁻¹. The scale is logarithmic, so a change of 1 pH unit means the concentration changes by a factor of 10.",
      "At 25 °C, the ionic product of water is Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴. In pure water, [H₃O⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, so the pH is 7. This is neutral.",
      "A strong monoprotic acid ionises fully, so [H₃O⁺] equals the acid concentration. For 0.010 M HCl, [H₃O⁺] = 1.0 × 10⁻² M and pH = 2.",
      "A strong base such as NaOH gives [OH⁻] equal to its concentration. Use Kw to find [H₃O⁺] = Kw ÷ [OH⁻], then take the pH. For 0.010 M NaOH, [H₃O⁺] = 1.0 × 10⁻¹² M and pH = 12."
    ],
    "remember": "Each pH unit is a tenfold change in [H₃O⁺]. Kw links [H₃O⁺] and [OH⁻].",
    "a": {
      "q": "Solution X has a pH of 3 and solution Y has a pH of 5. How do their hydronium ion concentrations compare?",
      "opts": [
        "X has 100 times the [H₃O⁺] of Y",
        "X has 2 times the [H₃O⁺] of Y",
        "Y has 100 times the [H₃O⁺] of X",
        "Y has 2 times the [H₃O⁺] of X"
      ],
      "why": "The scale is logarithmic, so a difference of 2 pH units is a factor of 10² = 100. The lower pH means the higher [H₃O⁺], so X has 100 times more. Saying 2 times treats the scale as if it were linear.",
      "clue": "Each pH unit is a factor of 10, and lower pH means more H₃O⁺."
    },
    "b": {
      "d": 3,
      "q": "Nina dissolves NaOH in water to make a 0.0010 M solution at 25 °C. What is its pH?",
      "opts": ["11", "3", "10", "14"],
      "why": "NaOH is a strong base, so [OH⁻] = 1.0 × 10⁻³ M. Then [H₃O⁺] = 1.0 × 10⁻¹⁴ ÷ 1.0 × 10⁻³ = 1.0 × 10⁻¹¹ M, so pH = 11. A pH of 3 comes from taking -log of [OH⁻] directly, which gives the pOH, not the pH.",
      "clue": "Use Kw to turn [OH⁻] into [H₃O⁺] before taking the log."
    }
  },
  "chem-indicators-ph-meters": {
    "title": "Indicators and pH meters",
    "card": [
      [
        "Natural indicator",
        "a plant extract, such as red cabbage juice, that changes colour with pH. It gives a rough pH, because the colours blend into each other and are hard to match to exact values."
      ],
      [
        "Commercial indicator",
        "a made dye or mix of dyes, such as universal indicator, with colour changes set against a chart. It narrows pH down to about one unit, but it still relies on the eye matching a colour."
      ],
      [
        "pH meter",
        "an electronic probe that reads pH as a number, often to two decimal places. It needs calibrating with buffer solutions of known pH, or its readings can be consistently off."
      ],
      "Accuracy is how close a reading is to the true value. Precision is how closely repeated readings of the same sample agree, which is separate from how finely a scale reads."
    ],
    "remember": "Indicators rely on matching colours by eye. A meter gives a number, but calibrate it so its readings are not consistently off.",
    "a": {
      "q": "Why does universal indicator give a less exact pH than a calibrated pH meter?",
      "opts": [
        "It relies on the eye matching a colour to a chart",
        "It must be calibrated with buffers before each use",
        "It can only show if a solution is acidic or basic",
        "It is a plant extract whose colours blend together"
      ],
      "why": "Universal indicator is read by matching its colour to a chart by eye, which narrows pH to about one unit. Calibrating with buffers is what a pH meter needs, not an indicator. Blending plant colours describes a natural indicator such as red cabbage juice.",
      "clue": "Think about how a person reads the result from an indicator."
    },
    "b": {
      "d": 3,
      "q": "Priya's pH meter reads 7.52 each time in a buffer of pH 7.00. What does this show about the meter?",
      "opts": [
        "It is precise but not accurate, so it needs calibrating",
        "It is accurate but not precise, so it needs calibrating",
        "It is both accurate and precise, so it can be used",
        "It is neither accurate nor precise, so it is faulty"
      ],
      "why": "The repeated readings agree with each other, so the meter is precise. They are 0.52 away from the true value of 7.00, so it is not accurate. Calibrating with buffers can fix this kind of consistent error.",
      "clue": "Compare the readings with each other, then with the buffer's true pH."
    }
  },
  "chem-acidification-oceans": {
    "title": "Acid rain and ocean acidity",
    "card": [
      "Carbon dioxide in the air dissolves in rain and forms carbonic acid, a weak acid. This makes unpolluted rain naturally slightly acidic, with a pH a little below 7.",
      "Burning fuels and smelting metals release sulfur dioxide and nitrogen oxides. These dissolve in water to form stronger acids, so acid rain has a lower pH than natural rain.",
      "The ocean is slightly basic. It absorbs carbon dioxide from the air, and the carbonic acid formed lowers the pH of seawater.",
      "More carbon dioxide in the air means more is absorbed, so the ocean becomes less basic. Its pH falls towards 7, which is called ocean acidification."
    ],
    "remember": "Carbon dioxide makes rain slightly acidic. Pollutant gases make stronger acid rain, and extra carbon dioxide makes the ocean less basic.",
    "a": {
      "q": "Why is unpolluted rain slightly acidic?",
      "opts": [
        "Dissolved carbon dioxide forms carbonic acid",
        "Dissolved sulfur dioxide forms sulfurous acid",
        "Dissolved nitrogen oxides form nitric acid",
        "Dissolved oxygen forms a weak acid in the rain"
      ],
      "why": "Carbon dioxide occurs naturally in air and dissolves in rain to form carbonic acid. Sulfur dioxide and nitrogen oxides mostly come from pollution, so they explain acid rain, not natural rain.",
      "clue": "Think of the gas that is in air without any pollution."
    },
    "b": {
      "d": 3,
      "q": "Carbon dioxide levels in the air keep rising around the world. What is the likely effect on the ocean?",
      "opts": [
        "Its pH falls, so it becomes less basic",
        "Its pH rises, so it becomes more basic",
        "Its pH stays the same, as the ocean is basic",
        "Its pH falls below 7 at once, so it turns acidic"
      ],
      "why": "More carbon dioxide in the air means more dissolves in seawater and forms carbonic acid. This lowers the pH, so the ocean becomes less basic. The pH falls towards 7 and does not turn acidic at once.",
      "clue": "More dissolved carbon dioxide means more carbonic acid."
    }
  },
  "chem-greenhouse-gases": {
    "title": "Greenhouse gases",
    "card": [
      "Sunlight warms Earth's surface. The warm surface gives off energy as infrared radiation: invisible radiation that carries energy and warms what absorbs it.",
      "Greenhouse gases absorb some of this infrared radiation and send some of it back towards the surface. This warms the lower atmosphere.",
      "Carbon dioxide (CO2), methane (CH4) and water vapour (H2O) are greenhouse gases. As their bonds stretch and bend, charge shifts unevenly across the molecule, which lets them absorb infrared radiation.",
      "The main gases in air, nitrogen (N2) and oxygen (O2), are each made of two identical atoms. Their vibrations do not shift charge unevenly, so they absorb almost no infrared radiation and add almost nothing to this warming."
    ],
    "remember": "Greenhouse gases absorb infrared radiation from Earth's surface and warm the atmosphere.",
    "a": {
      "q": "Why does carbon dioxide warm the atmosphere?",
      "opts": [
        "It absorbs infrared radiation given off by Earth's surface",
        "It reflects incoming sunlight back out into space",
        "It makes up most of the gas in Earth's atmosphere",
        "It releases new energy as it reacts with oxygen in air"
      ],
      "why": "Carbon dioxide absorbs infrared radiation from the surface and sends some back down, which warms the lower atmosphere. Reflecting sunlight away would cool Earth, not warm it.",
      "clue": "Think about what the warm surface gives off."
    },
    "b": {
      "d": 3,
      "q": "Dev says nitrogen is the most common gas in air, so it must cause most of the greenhouse warming. Why is he wrong?",
      "opts": [
        "Nitrogen molecules absorb almost no infrared radiation",
        "Nitrogen molecules reflect infrared back to the surface",
        "Nitrogen is present in too small an amount to matter",
        "Nitrogen absorbs infrared but sends none back down"
      ],
      "why": "Being common does not matter if a gas cannot absorb infrared radiation. A nitrogen molecule is made of two identical atoms, so its vibrations do not shift charge unevenly and it absorbs almost no infrared. Saying nitrogen is too scarce is wrong, as Dev is right that it is the most common gas.",
      "clue": "What must a gas do with infrared radiation to warm the air?"
    }
  },
  "chem-gas-pressure-standard-conditions": {
    "title": "Gas pressure and standard conditions",
    "card": [
      "Pressure is force divided by the area it acts on. Gas pressure comes from particles hitting the walls of their container.",
      "The unit of pressure is the pascal (Pa). One kilopascal (kPa) is 1000 Pa.",
      "More collisions or harder collisions on the same area mean a higher pressure. Squeezing the same gas into a smaller container raises its pressure.",
      "Standard laboratory conditions (SLC) are a temperature of 25 °C and a pressure of 100 kPa. Using the same conditions lets chemists compare gases fairly."
    ],
    "remember": "Pressure is force per area. Standard laboratory conditions are 25 °C and 100 kPa.",
    "a": {
      "q": "A force of 600 N acts on an area of 2 m². What is the pressure?",
      "opts": ["300 Pa", "1200 Pa", "600 Pa", "0.003 Pa"],
      "why": "Pressure = force ÷ area = 600 ÷ 2 = 300 Pa. Multiplying instead of dividing gives 1200 Pa, which is the tempting mistake.",
      "clue": "Divide the force by the area."
    },
    "b": {
      "d": 2,
      "q": "Priya collects a gas in her school lab at 25 °C and 100 kPa. What can she say about these conditions?",
      "opts": [
        "They are standard laboratory conditions",
        "They are the conditions at 0 °C",
        "They are only found at sea level",
        "They give a pressure of 100 Pa"
      ],
      "why": "A temperature of 25 °C and a pressure of 100 kPa are the standard laboratory conditions. The pressure is 100 kPa, which is 100 000 Pa, not 100 Pa.",
      "clue": "Compare her numbers with the card."
    }
  },
  "chem-stoichiometry-with-gases": {
    "title": "Stoichiometry with gases",
    "card": [
      "The coefficients in a balanced equation give the mole ratio of the substances. In 2H2 + O2 → 2H2O, 2 mol of H2 reacts with 1 mol of O2.",
      "To find an unknown, first change the given quantity to moles. Use n = m ÷ M for a mass, where M is molar mass.",
      "Then use the mole ratio to find the moles of the substance you want.",
      "Last, change moles to the quantity asked for. For a mass, use m = n × M. For a gas volume at SLC, use V = n × 24.8 L, as 1 mol of any gas takes up 24.8 L at SLC."
    ],
    "remember": "Go from the given quantity to moles, use the mole ratio, then convert to the answer asked for.",
    "a": {
      "q": "In 2H2 + O2 → 2H2O, how many moles of O2 react with 6.0 mol of H2?",
      "opts": ["3.0 mol", "6.0 mol", "12 mol", "2.0 mol"],
      "why": "The ratio of H2 to O2 is 2 to 1, so 6.0 mol of H2 needs 3.0 mol of O2. Using 6.0 mol ignores the ratio.",
      "clue": "Look at the coefficients in front of H2 and O2."
    },
    "b": {
      "d": 3,
      "q": "Magnesium reacts with acid: Mg + 2HCl → MgCl2 + H2. What volume of H2 at SLC forms from 0.10 mol of Mg?",
      "opts": ["2.48 L", "4.96 L", "0.248 L", "24.8 L"],
      "why": "The ratio of Mg to H2 is 1 to 1, so 0.10 mol of H2 forms. V = 0.10 × 24.8 = 2.48 L. Forgetting to multiply by the moles gives 24.8 L.",
      "clue": "Find the moles of H2 first, then change to volume."
    }
  },
  "chem-fossil-fuels-biofuels": {
    "title": "Fossil fuels and biofuels",
    "card": [
      [
        "Fossil fuel",
        "a fuel formed from the remains of ancient organisms over millions of years. Coal, natural gas and petrol are fossil fuels."
      ],
      [
        "Biofuel",
        "a fuel made from recently living material, such as plants, algae or animal waste. Biogas, bioethanol and biodiesel are biofuels."
      ],
      "Fossil fuels take millions of years to form, so they are non-renewable on any human timescale. Biofuels can be replaced quickly by natural processes, such as crops growing each season.",
      "Both kinds store chemical energy and release it when they burn. What separates them is the source and how fast the source is replaced."
    ],
    "remember": "Fossil fuels come from ancient remains and take millions of years to replace. Biofuels come from recent living material and are replaced quickly.",
    "a": {
      "q": "Why is natural gas classed as a fossil fuel rather than a biofuel?",
      "opts": [
        "It formed from ancient organisms over millions of years",
        "It is made from crops that regrow each season",
        "It is a gas, and biofuels are always liquids",
        "It releases chemical energy when it burns"
      ],
      "why": "Natural gas formed from the remains of ancient organisms over millions of years, so it cannot be replaced quickly. Releasing energy on burning is true of both fossil fuels and biofuels, so it does not separate them.",
      "clue": "Think about the source and how long it took to form."
    },
    "b": {
      "d": 2,
      "q": "Kofi's farm in Mildura turns pig manure into methane-rich gas to run a generator. Which type of fuel is this gas?",
      "opts": [
        "A biofuel, because the source is replaced quickly",
        "A fossil fuel, because it is a gas like natural gas",
        "A fossil fuel, because it contains methane",
        "A biofuel, because it is made without any burning"
      ],
      "why": "The gas is biogas, made from animal waste, which is recent living material that is replaced quickly. Being a gas or containing methane does not make a fuel fossil, as the source is what counts.",
      "clue": "Look at where the gas came from, not what it is made of."
    }
  },
  "chem-energy-from-food": {
    "title": "Energy from food",
    "card": [
      "Carbohydrates, proteins and fats are the main fuels in food. The body breaks them down and uses the energy they release.",
      "Energy values are measured in kilojoules per gram (kJ/g). This is the energy released from one gram of the nutrient.",
      "Fats release about 37 kJ/g. Carbohydrates release about 16 kJ/g and proteins about 17 kJ/g.",
      "To find the energy in a food, multiply the mass of each nutrient in grams by its energy value, then add the results."
    ],
    "remember": "Gram for gram, fats hold more than twice the energy of carbohydrates or proteins.",
    "a": {
      "q": "Which statement about the energy values of nutrients is correct?",
      "opts": [
        "Fat releases more energy per gram than carbohydrate",
        "Carbohydrate releases more energy per gram than fat",
        "Protein releases more energy per gram than fat",
        "Fat and carbohydrate release the same energy per gram"
      ],
      "why": "Fat releases about 37 kJ/g, which is more than twice the 16 kJ/g of carbohydrate. Many students think carbohydrate is the richest fuel because it is the main source of energy, but its value per gram is lower than fat.",
      "clue": "Compare the kJ/g values on the card."
    },
    "b": {
      "d": 2,
      "q": "A snack bar made by Priya contains 10 g of carbohydrate and 5 g of fat, and no other nutrients that release energy. About how much energy does it release?",
      "opts": ["345 kJ", "160 kJ", "185 kJ", "450 kJ"],
      "why": "Carbohydrate gives 10 × 16 = 160 kJ and fat gives 5 × 37 = 185 kJ. The total is 345 kJ. Matching each mass to the wrong energy value gives 450 kJ, and using only one nutrient, such as 160 kJ, leaves out part of the energy.",
      "clue": "Work out each nutrient separately, then add."
    }
  },
  "chem-photosynthesis-respiration": {
    "title": "Photosynthesis and respiration",
    "card": [
      [
        "Photosynthesis",
        "Plants use light energy to turn carbon dioxide and water into glucose and oxygen. The light energy is stored as chemical energy in the glucose."
      ],
      [
        "Cellular respiration",
        "Cells oxidise glucose with oxygen to make carbon dioxide and water. This releases the stored energy for the cell to use."
      ],
      "The two processes run in opposite directions. The products of one are the reactants of the other.",
      "Photosynthesis takes in energy from light. Respiration releases energy from glucose."
    ],
    "remember": "Photosynthesis stores light energy in glucose. Respiration releases it by turning glucose back into carbon dioxide and water.",
    "a": {
      "q": "Which pair of reactants is used in photosynthesis?",
      "opts": ["Carbon dioxide and water", "Glucose and oxygen", "Glucose and carbon dioxide", "Oxygen and water"],
      "why": "Photosynthesis builds glucose from carbon dioxide and water, using light energy. Glucose and oxygen are the reactants of respiration, which is the tempting wrong choice.",
      "clue": "Photosynthesis makes glucose, so glucose cannot be a reactant."
    },
    "b": {
      "d": 3,
      "q": "Priya's muscle cells release energy during a sprint. Which change is happening in them?",
      "opts": [
        "Glucose is oxidised to carbon dioxide and water",
        "Glucose is made from carbon dioxide and water",
        "Light energy is stored as chemical energy",
        "Carbon dioxide is used up and oxygen is made"
      ],
      "why": "Muscle cells release the energy stored in glucose by oxidising it to carbon dioxide and water, which is respiration. The other options describe photosynthesis, which is the reverse process and needs light.",
      "clue": "Releasing stored energy is the reverse of storing it."
    }
  },
  "chem-making-bioethanol": {
    "title": "Making bioethanol",
    "card": [
      [
        "Fermentation",
        "Yeast breaks down glucose without oxygen to make ethanol and carbon dioxide. The glucose can come from crops such as sugarcane."
      ],
      "The mixture after fermentation is mostly water, with only a low percentage of ethanol. Too much ethanol makes the yeast stop working.",
      [
        "Distillation",
        "The mixture is heated so the ethanol boils off first, as it has a lower boiling point than water. The vapour is cooled and condensed to give a more concentrated ethanol."
      ],
      "The concentrated ethanol can then be used as a fuel, often blended with petrol."
    ],
    "remember": "Yeast ferments glucose to ethanol and carbon dioxide. Distillation then concentrates the ethanol for fuel.",
    "a": {
      "q": "What is the purpose of distillation in making bioethanol?",
      "opts": [
        "To concentrate the ethanol by separating it from water",
        "To turn glucose into ethanol and carbon dioxide",
        "To supply the yeast with more glucose to use",
        "To remove the carbon dioxide made by the yeast"
      ],
      "why": "Distillation uses the lower boiling point of ethanol to separate it from water and raise its concentration. Changing glucose into ethanol is fermentation, which happens earlier and is done by the yeast.",
      "clue": "Distillation separates substances by boiling point."
    },
    "b": {
      "d": 3,
      "q": "Lena heats a fermented mixture from her sugarcane batch in Bundaberg and collects the first vapour that boils off. Why is this vapour richer in ethanol?",
      "opts": [
        "Ethanol has a lower boiling point than water",
        "Ethanol has a higher boiling point than water",
        "Yeast makes ethanol only at the surface",
        "Carbon dioxide turns into ethanol when heated"
      ],
      "why": "Ethanol boils at a lower temperature than water, so it vaporises first and the early vapour has more ethanol. A higher boiling point would leave the ethanol behind in the flask.",
      "clue": "Which substance boils off first when heated?"
    }
  },
  "chem-combustion": {
    "title": "Combustion",
    "card": [
      "Combustion is a fuel reacting with oxygen and releasing energy as heat and light.",
      ["Complete combustion", "happens with plenty of oxygen. A hydrocarbon gives carbon dioxide and water only."],
      [
        "Incomplete combustion",
        "happens when oxygen is limited. It makes water and also carbon monoxide (CO) or soot (carbon, C), often with some carbon dioxide."
      ],
      "Incomplete combustion releases less energy than complete combustion of the same fuel. A yellow, smoky flame suggests soot, and carbon monoxide is a toxic gas."
    ],
    "remember": "Plenty of oxygen gives CO2 and H2O. Limited oxygen can also give CO or soot.",
    "a": {
      "q": "A gas heater in a small, poorly ventilated room burns methane. Which products suggest incomplete combustion?",
      "opts": ["Carbon monoxide and water", "Carbon dioxide and water", "Carbon dioxide and hydrogen", "Oxygen and water"],
      "why": "Carbon monoxide forms when oxygen is limited, so it signals incomplete combustion. Carbon dioxide and water are the products of complete combustion, which is the tempting wrong choice.",
      "clue": "Poor ventilation means limited oxygen."
    },
    "b": {
      "d": 3,
      "q": "Liam's camp stove burns butane with a bright yellow flame and leaves black marks on the pot. What is the best explanation?",
      "opts": [
        "Oxygen is limited, so soot forms",
        "Oxygen is plentiful, so soot forms",
        "Combustion is complete, so carbon forms",
        "Oxygen is limited, so more energy is released"
      ],
      "why": "The yellow flame and black marks point to soot, which is carbon from incomplete combustion when oxygen is limited. Complete combustion with plenty of oxygen gives only carbon dioxide and water. Incomplete combustion releases less energy, not more.",
      "clue": "Think about what the black marks on the pot are made of."
    }
  },
  "chem-limiting-reactants": {
    "title": "Limiting reactants",
    "card": [
      [
        "Limiting reactant",
        "the reactant that runs out first. The reaction stops when it is gone, so it sets how much product can form."
      ],
      ["Excess reactant", "a reactant that is left over when the reaction stops."],
      "Reactants combine in the ratio in the balanced equation. To find the limiting reactant, change each amount to moles and compare. In CH4 + 2O2 → CO2 + 2H2O, 1 mol of CH4 needs 2 mol of O2, so if there is less O2 than that, O2 is limiting.",
      "Then use the moles of the limiting reactant and the equation's ratio to find the product. Here 2 mol of O2 makes 1 mol of CO2, so 1 mol of O2 makes 0.5 mol of CO2."
    ],
    "remember": "Find which reactant runs out first, then use its moles and the ratio to find the product.",
    "a": {
      "q": "A reaction stops because one reactant is all used up. Some of the other reactant is still there. What does the leftover reactant tell you?",
      "opts": [
        "It is in excess, and the used up reactant was limiting",
        "It is limiting, and the used up reactant was in excess",
        "Both reactants were present in the exact ratio",
        "The reaction did not follow the balanced equation"
      ],
      "why": "The reaction stops when one reactant runs out, so that one is the limiting reactant. The reactant left over is in excess. It did not stop the reaction, so it is not limiting.",
      "clue": "Which reactant ran out and stopped the reaction?"
    },
    "b": {
      "d": 3,
      "q": "Methane burns: CH4 + 2O2 → CO2 + 2H2O. A container holds 3 mol of CH4 and 2 mol of O2. Which statement is correct?",
      "opts": [
        "O2 is limiting, and 2 mol of H2O can form",
        "CH4 is limiting, and 6 mol of H2O can form",
        "O2 is limiting, and 1 mol of H2O can form",
        "CH4 is in excess, and 6 mol of H2O can form"
      ],
      "why": "3 mol of CH4 would need 6 mol of O2, but there is only 2 mol, so O2 runs out first and is limiting. The product comes from the limiting reactant: O2 to H2O is 2 to 2, so 2 mol of H2O forms. Using the 3 mol of CH4 to get 6 mol of H2O is wrong, because CH4 is in excess and not all of it reacts.",
      "clue": "Work out the product from the reactant that runs out first."
    }
  },
  "chem-stoichiometry-fuels": {
    "title": "Stoichiometry of fuels",
    "card": [
      "The coefficients in a balanced equation give mole ratios. For C3H8 + 5O2 → 3CO2 + 4H2O, 1 mol of propane makes 3 mol of carbon dioxide.",
      "Moles of a substance = mass ÷ molar mass (n = m/M). Energy released = moles of fuel × energy per mole.",
      "At standard laboratory conditions (SLC, 25 °C and 100 kPa), 1 mol of any gas has a volume of 24.8 L. So volume of gas = moles × 24.8 L.",
      "Steps: find moles of the known substance, use the mole ratio to find moles of the wanted substance, then convert to mass, volume or energy."
    ],
    "remember": "Convert to moles, use the equation's ratio, then convert to what is asked.",
    "a": {
      "q": "In C3H8 + 5O2 → 3CO2 + 4H2O, how many moles of carbon dioxide form when 2.0 mol of propane burns completely?",
      "opts": ["6.0 mol", "3.0 mol", "2.0 mol", "10 mol"],
      "why": "The ratio of propane to carbon dioxide is 1 to 3, so 2.0 mol of propane gives 6.0 mol. Giving 3.0 mol uses the coefficient without scaling it to the amount of propane.",
      "clue": "Multiply the moles of propane by the ratio from the equation."
    },
    "b": {
      "d": 3,
      "q": "Methane burns: CH4 + 2O2 → CO2 + 2H2O. What volume of carbon dioxide forms at SLC from 8.0 g of CH4? (M(CH4) = 16 g/mol)",
      "opts": ["12.4 L", "24.8 L", "6.2 L", "49.6 L"],
      "why": "Moles of CH4 = 8.0 ÷ 16 = 0.50 mol. The ratio is 1 to 1, so CO2 is 0.50 mol, and 0.50 × 24.8 = 12.4 L. Giving 24.8 L ignores that only half a mole of methane reacts.",
      "clue": "Find moles of methane first, then use the 1 to 1 ratio."
    }
  },
  "chem-thermochemical-equations": {
    "title": "Thermochemical equations",
    "card": [
      "A thermochemical equation is a balanced equation that also gives ΔH, the enthalpy change, in kJ mol⁻¹. It includes state symbols, such as (g) or (l), because the state affects the energy.",
      "Here kJ mol⁻¹ means per mole of reaction as written, with the amounts shown by the coefficients. For C(s) + O2(g) → CO2(g), ΔH = -394 kJ mol⁻¹, so 394 kJ is released when 1 mol of carbon reacts.",
      "If you multiply the coefficients, you multiply ΔH by the same factor. An actual amount of energy, such as 788 kJ for 2 mol of carbon, is given in kJ.",
      "If the equation is reversed, ΔH keeps its size but changes sign. A reaction that releases 394 kJ one way absorbs 394 kJ the other way."
    ],
    "remember": "ΔH belongs to the equation as written: scale the amounts and ΔH scales, reverse it and the sign flips.",
    "a": {
      "q": "2H2(g) + O2(g) → 2H2O(l) has ΔH = -572 kJ mol⁻¹. What is ΔH for H2(g) + ½O2(g) → H2O(l)?",
      "opts": ["-286 kJ mol⁻¹", "-572 kJ mol⁻¹", "-1144 kJ mol⁻¹", "+286 kJ mol⁻¹"],
      "why": "The coefficients are halved, so ΔH is halved to -286 kJ mol⁻¹. Keeping -572 kJ mol⁻¹ is tempting, but that value belongs to the equation with twice the amounts.",
      "clue": "Compare the amounts in the two equations."
    },
    "b": {
      "d": 3,
      "q": "CH4(g) + 2O2(g) → CO2(g) + 2H2O(l) has ΔH = -890 kJ mol⁻¹. What energy change occurs when 2 mol of CO2(g) and 4 mol of H2O(l) react to form CH4(g) and O2(g)?",
      "opts": ["1780 kJ absorbed", "1780 kJ released", "890 kJ absorbed", "890 kJ released"],
      "why": "This is the reverse of the given reaction, so the sign flips and energy is absorbed. The amounts are double those in the equation, so the energy is 2 × 890 = 1780 kJ. 1780 kJ released scales correctly but forgets that reversing changes the sign.",
      "clue": "Check both the direction and the amounts compared with the equation."
    }
  },
  "chem-calorimetry-2": {
    "title": "Calorimetry",
    "card": [
      "A solution calorimeter is an insulated container used to measure the energy change of a reaction in solution. The energy change shows up as a temperature change of the solution.",
      "A calibration factor is the energy needed to change the temperature of the calorimeter and its contents by 1 °C, in J °C⁻¹. It is found by supplying a known amount of electrical energy and measuring the temperature rise.",
      "Energy change = calibration factor × temperature change. A rise in temperature means the reaction is exothermic, and a fall means it is endothermic.",
      "Even with insulation, some heat moves between the mixture and the surroundings. A warm mixture loses heat and a cold one gains it. Extending the temperature-time graph lines back to the time of mixing gives the temperature change with no heat exchange."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "A temperature-time graph for a reaction in a calorimeter. The temperature is steady at 20 °C until the solutions are mixed at 2 minutes. It rises quickly, peaks, then falls slowly in a straight line as the warm mixture loses heat. Extending that line back to the time of mixing gives 27 °C, so the temperature change with no heat exchange is 7 °C, more than the highest reading shows.",
        "x": {"min": 0, "max": 12.0, "label": "Time (min)", "step": 4},
        "y": {"min": 17, "max": 30, "label": "Temperature (°C)"},
        "items": [
          {
            "type": "curve",
            "id": "t",
            "points": [[0, 20], [2, 20], [2.5, 24.6], [3, 26.0], [3.5, 26.4], [6, 25.4], [8, 24.6]],
            "smooth": true,
            "label": "readings",
            "labelAt": 5,
            "pos": "above-right"
          },
          {
            "type": "fn",
            "id": "e",
            "expr": "27 - 0.4(x - 2)",
            "domain": [2, 3.5],
            "label": "extended",
            "style": "dash",
            "labelAt": 2.45,
            "pos": "above-right"
          },
          {"type": "guide", "at": [2, 20], "yLabel": "20"},
          {"type": "guide", "at": [2, 27], "yLabel": "27"},
          {"type": "arrow", "from": [1.1, 20.3], "to": [1.1, 26.7], "label": "ΔT", "pos": "right"}
        ]
      }
    },
    "remember": "Energy = calibration factor × temperature change. Extrapolating the graph corrects for heat exchange with the surroundings.",
    "a": {
      "q": "A calorimeter has a calibration factor of 450 J °C⁻¹. A reaction in it raises the temperature by 3.0 °C. How much energy was released?",
      "opts": ["1350 J", "150 J", "453 J", "1.35 J"],
      "why": "Energy = 450 × 3.0 = 1350 J, which is 1.35 kJ, not 1.35 J. Dividing 450 by 3.0 gives 150, which is the wrong operation.",
      "clue": "Multiply the calibration factor by the temperature change."
    },
    "b": {
      "d": 3,
      "q": "Priya mixes two solutions in a calorimeter and records the temperature every 30 seconds. Why does she extend the graph lines back to the time of mixing?",
      "opts": [
        "To allow for heat exchanged with the surroundings",
        "To find the calibration factor of the calorimeter",
        "To show whether the reaction is endothermic",
        "To remove the energy supplied by stirring"
      ],
      "why": "While the reaction happens, heat moves between the mixture and the room, so the recorded temperature change is smaller than the true one. Extending the lines gives the change if no heat had been exchanged. The calibration factor is found separately, using a known amount of electrical energy.",
      "clue": "Ask what the thermometer reading at the moment of mixing would be if the insulation were perfect."
    }
  },
  "chem-energy-content-fuels": {
    "title": "Energy content and efficiency",
    "card": [
      "To estimate a fuel's energy content, burn a known mass of it under a container of water. Measure the water's temperature rise. The energy gained by the water is q = m × c × ΔT, where m is the mass of water and c is 4.18 J g⁻¹ °C⁻¹.",
      "Energy content is the energy released per unit of fuel, such as kJ g⁻¹. Divide the energy gained by the water by the mass of fuel burnt.",
      "Some heat is lost to the air and the container, and the fuel may burn incompletely. So the value found this way is usually lower than the true energy content.",
      "Efficiency is the useful energy output divided by the chemical energy released by the fuel, usually given as a percentage. The rest is wasted, mostly as heat to the surroundings."
    ],
    "remember": "Water's energy gain estimates the fuel's energy, and efficiency is useful energy out as a share of energy released.",
    "a": {
      "q": "Burning 0.50 g of a fuel raises the temperature of 100 g of water by 10 °C. About how much energy did the water gain? (c = 4.18 J g⁻¹ °C⁻¹)",
      "opts": ["4180 J", "418 J", "41.8 J", "2090 J"],
      "why": "q = 100 × 4.18 × 10 = 4180 J. The 2090 J option wrongly multiplies by the mass of fuel as well. The fuel mass is only needed later, to divide by when finding the energy content.",
      "clue": "Use the mass of water, not the mass of fuel."
    },
    "b": {
      "d": 3,
      "q": "A heater releases 800 kJ of chemical energy from gas, and 600 kJ of it warms a room. What is its efficiency, and where did the rest go?",
      "opts": [
        "75%, lost as waste heat to the surroundings",
        "75%, destroyed during the chemical reaction",
        "25%, lost as waste heat to the surroundings",
        "133%, because more energy was released"
      ],
      "why": "Efficiency = 600 ÷ 800 × 100 = 75%. The other 200 kJ is not useful, so it is wasted, mostly as heat to the surroundings. The 25% option is the wasted share, not the efficiency.",
      "clue": "Divide useful energy by the energy released."
    }
  },
  "chem-redox-oxidation-numbers": {
    "title": "Redox and oxidation numbers",
    "card": [
      "Redox reactions transfer electrons. Oxidation is loss of electrons. Reduction is gain of electrons.",
      "An oxidation number tracks electrons in a species. Free elements are 0, simple ions equal their charge, oxygen is usually -2 and hydrogen is usually +1 in compounds.",
      "If an atom's oxidation number rises, it is oxidised. If it falls, it is reduced. A reaction with no change in any oxidation number is not redox.",
      "The reducing agent is the species oxidised, as it gives away electrons. The oxidising agent is the species reduced, as it takes electrons. A conjugate redox pair is an oxidant and the reductant it becomes, such as Cu²⁺ and Cu."
    ],
    "remember": "Oxidation number up means oxidised, and that species is the reducing agent.",
    "a": {
      "q": "In Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s), which species is the reducing agent?",
      "opts": [
        "Zn(s), because its oxidation number rises from 0 to +2",
        "Zn(s), because its oxidation number falls from +2 to 0",
        "Cu²⁺(aq), because its oxidation number falls from +2 to 0",
        "Cu²⁺(aq), because its oxidation number rises from 0 to +2"
      ],
      "why": "Zinc goes from 0 to +2, so it is oxidised and gives away electrons. That makes it the reducing agent. Cu²⁺ is tempting because it is involved in the electron transfer, but it is reduced, so it is the oxidising agent.",
      "clue": "The reducing agent is the one that is oxidised."
    },
    "b": {
      "d": 3,
      "q": "In 2Mg(s) + O₂(g) → 2MgO(s), which pair is a conjugate redox pair?",
      "opts": ["Mg²⁺ and Mg", "O₂ and Mg", "O₂ and Mg²⁺", "O²⁻ and Mg"],
      "why": "A conjugate pair is an oxidant and the reductant it becomes. Mg²⁺ in MgO is the product of Mg losing electrons, so Mg²⁺ and Mg are a pair. O₂ and Mg are the two reactants, so they are not a pair.",
      "clue": "A pair is one element in two oxidation states, not two reactants."
    }
  },
  "chem-half-equations-unit-3": {
    "title": "Half-equations in Unit 3",
    "card": [
      "A half-equation shows only one half of a redox reaction: either the loss of electrons (oxidation) or the gain of electrons (reduction). Electrons appear as e⁻ and states such as (aq), (s), (l) and (g) are included.",
      "To balance one in acidic solution, balance the atoms other than O and H first. Then add H₂O(l) to balance O, add H⁺(aq) to balance H, and add e⁻ to balance charge.",
      "In basic solution, start the same way. Then add OH⁻(aq) to each side to match the H⁺(aq), so that H⁺(aq) and OH⁻(aq) combine to form H₂O(l). Cancel any water that appears on both sides.",
      "A balanced half-equation has the same atoms and the same total charge on both sides. Example in acid: MnO₄⁻(aq) + 8H⁺(aq) + 5e⁻ → Mn²⁺(aq) + 4H₂O(l). Both sides have a charge of 2+."
    ],
    "remember": "Balance atoms other than O and H first, then O with H₂O, H with H⁺ and charge with e⁻. In base, add OH⁻ to turn the H⁺ into water.",
    "a": {
      "q": "Which half-equation is correctly balanced for atoms and charge in acidic solution?",
      "opts": [
        "Cr₂O₇²⁻(aq) + 14H⁺(aq) + 6e⁻ → 2Cr³⁺(aq) + 7H₂O(l)",
        "Cr₂O₇²⁻(aq) + 14H⁺(aq) + 6e⁻ → 2Cr³⁺(aq) + 14H₂O(l)",
        "Cr₂O₇²⁻(aq) + 7H⁺(aq) + 3e⁻ → 2Cr³⁺(aq) + 7H₂O(l)",
        "Cr₂O₇²⁻(aq) + 14H⁺(aq) → 2Cr³⁺(aq) + 7H₂O(l)"
      ],
      "why": "The version with 14H⁺, 6e⁻ and 7H₂O has 2 Cr, 7 O and 14 H on each side, and a charge of 6+ on each side. The version with 14H₂O has 14 O and 28 H on the right, and the version with 7H⁺ and 3e⁻ has 7 H on the left but 14 H on the right. The version with no electrons has a charge of 12+ on the left but 6+ on the right.",
      "clue": "Check that the atoms and the total charge match on both sides."
    },
    "b": {
      "d": 3,
      "q": "In basic solution, oxygen gas is made from hydroxide ions. Which balanced half-equation shows this?",
      "opts": [
        "4OH⁻(aq) → O₂(g) + 2H₂O(l) + 4e⁻",
        "4OH⁻(aq) + 4e⁻ → O₂(g) + 2H₂O(l)",
        "2H₂O(l) → O₂(g) + 4H⁺(aq) + 4e⁻",
        "4OH⁻(aq) → O₂(g) + 4H₂O(l) + 4e⁻"
      ],
      "why": "With 4OH⁻ on the left and O₂ + 2H₂O + 4e⁻ on the right, both sides have 4 O, 4 H and a charge of 4-. Putting 4e⁻ on the left makes the charge 8- on the left and 0 on the right, and using 4H₂O gives 8 H on the right but only 4 on the left. The version with H⁺(aq) does balance, but H⁺ is used in acidic solution, not basic.",
      "clue": "Count the atoms and charge on each side, then check which condition uses OH⁻."
    }
  },
  "chem-anode-cathode": {
    "title": "Anode and cathode",
    "card": [
      ["Anode", "the electrode where oxidation happens. The species there loses electrons."],
      ["Cathode", "the electrode where reduction happens. The species there gains electrons."],
      "In a galvanic cell, electrons are released at the anode, so the anode is the negative electrode. They travel through the external wire to the cathode, which is positive.",
      "Take a cell with zinc in Zn²⁺ solution and copper in Cu²⁺ solution. Zn(s) → Zn²⁺(aq) + 2e⁻ happens at the zinc electrode, so zinc is the anode. Cu²⁺(aq) + 2e⁻ → Cu(s) happens at the copper electrode, so copper is the cathode."
    ],
    "remember": "Oxidation at the anode, reduction at the cathode. In a galvanic cell the anode is negative.",
    "a": {
      "q": "In a galvanic cell, which statement about the anode is correct?",
      "opts": [
        "Oxidation happens there and it is the negative electrode",
        "Oxidation happens there and it is the positive electrode",
        "Reduction happens there and it is the negative electrode",
        "Reduction happens there and it is the positive electrode"
      ],
      "why": "Oxidation is loss of electrons, and it happens at the anode. These electrons make the anode the negative electrode in a galvanic cell. The option with reduction at the negative electrode mixes up the anode and the cathode.",
      "clue": "Electrons are released at the anode."
    },
    "b": {
      "d": 3,
      "q": "A galvanic cell has a nickel electrode in Ni²⁺(aq) and a silver electrode in Ag⁺(aq). Ni(s) is oxidised and Ag⁺(aq) is reduced. Which row is correct?",
      "opts": [
        "Nickel is the anode; electrons flow from nickel to silver",
        "Nickel is the anode; electrons flow from silver to nickel",
        "Nickel is the cathode; electrons flow from nickel to silver",
        "Nickel is the cathode; electrons flow from silver to nickel"
      ],
      "why": "Nickel is oxidised, so it is the anode. It releases electrons, which flow through the wire to the silver cathode, where Ag⁺ is reduced. Electrons flow from the anode to the cathode, so a flow from silver to nickel would be backwards.",
      "clue": "Find which electrode is oxidised, then follow the electrons from there."
    }
  },
  "chem-electrochemical-series": {
    "title": "The electrochemical series",
    "card": [
      "The electrochemical series lists reduction half-equations in order of their standard electrode potentials, E°, measured in volts. The most positive E° is at the top, where the strongest oxidising agents are found.",
      "A species on the left of a half-equation is an oxidising agent. The higher its E°, the stronger it is. The species on the right is a reducing agent, and it is stronger the lower the E° of its half-equation.",
      "To predict a reaction, pair the oxidising agent with the higher E° (it is reduced) with the reducing agent from the half-equation with the lower E° (it is oxidised). A reaction predicted this way is spontaneous under standard conditions.",
      "Cell voltage = E° of the reduction half-equation minus E° of the oxidation half-equation, both taken as written in the table. A positive answer means the reaction is predicted to occur."
    ],
    "remember": "The higher half-equation is reduced, the lower one is reversed. Voltage = E° (reduced) minus E° (oxidised).",
    "a": {
      "q": "Which statement about the electrochemical series is correct?",
      "opts": [
        "The oxidising agent on the higher half-equation is stronger",
        "The reducing agent on the higher half-equation is stronger",
        "Lower E° values belong to the stronger oxidising agents",
        "Half-equations are ordered by the number of electrons"
      ],
      "why": "A more positive E° means the species on the left is better at gaining electrons, so it is a stronger oxidising agent. The reducing agent is stronger when its half-equation has a lower E°, so the second option is the reverse.",
      "clue": "Think about which end of the table has the strongest oxidising agents."
    },
    "b": {
      "d": 3,
      "q": "Cu²⁺(aq) + 2e⁻ ⇌ Cu(s) has E° = +0.34 V. Zn²⁺(aq) + 2e⁻ ⇌ Zn(s) has E° = -0.76 V. What is predicted for a standard cell made from these two half-cells?",
      "opts": [
        "Zn is oxidised, and the cell voltage is 1.10 V",
        "Cu is oxidised, and the cell voltage is 1.10 V",
        "Zn is oxidised, and the cell voltage is 0.42 V",
        "Cu is oxidised, and the cell voltage is 0.42 V"
      ],
      "why": "Cu²⁺ has the higher E°, so it is reduced and Zn is oxidised. Voltage = +0.34 - (-0.76) = 1.10 V. Subtracting gives the wrong size when the signs are ignored, which is how 0.42 V arises.",
      "clue": "Subtract the lower E° from the higher, keeping the negative sign."
    }
  },
  "chem-fuel-cells": {
    "title": "Fuel cells",
    "card": [
      "A fuel cell is a galvanic cell that is fed reactants from outside, so it keeps running as long as the supply lasts. A fuel such as hydrogen goes to one electrode and oxygen goes to the other.",
      "In an acidic hydrogen fuel cell, hydrogen is oxidised at the anode: H2(g) → 2H+(aq) + 2e-. Oxygen is reduced at the cathode: O2(g) + 4H+(aq) + 4e- → 2H2O(l).",
      "The electrons travel through the external circuit and make the electric current. The overall reaction is 2H2(g) + O2(g) → 2H2O(l), so the only product is water.",
      "A battery has a fixed amount of reactants inside it and goes flat when they run out. A fuel cell does not go flat while fuel and oxygen keep being supplied."
    ],
    "remember": "A fuel cell makes electricity from a continuous supply of fuel and oxygen. A hydrogen fuel cell makes only water.",
    "a": {
      "q": "Which feature makes a fuel cell different from a standard battery?",
      "opts": [
        "Its reactants are supplied continuously from outside",
        "No redox reaction takes place at its electrodes",
        "Its reaction runs without any electrons being transferred",
        "Its anode is where reduction takes place"
      ],
      "why": "A fuel cell is fed fuel and oxygen from outside, so it can keep producing electricity. It still relies on redox reactions at its electrodes, with oxidation at the anode, so the other options are wrong.",
      "clue": "Think about what happens when a battery's reactants run out."
    },
    "b": {
      "d": 3,
      "q": "Mia uses an acidic hydrogen fuel cell on a long trip. Hydrogen and oxygen are fed in the whole time. Which statement about the cell is correct?",
      "opts": [
        "Hydrogen is oxidised at the anode and water is the product",
        "Hydrogen is reduced at the cathode and water is the product",
        "Oxygen is oxidised at the anode and hydrogen is the product",
        "Hydrogen is oxidised at the anode and the cell goes flat"
      ],
      "why": "Hydrogen loses electrons, so it is oxidised at the anode, and oxygen is reduced to water at the cathode. The last option is tempting because it has the right electrode, but a fuel cell keeps running while it is fed.",
      "clue": "Which reactant loses electrons, and what does the supply do to the cell?"
    }
  },
  "chem-designing-better-fuel-cells": {
    "title": "Designing better fuel cells",
    "card": [
      "Green chemistry is a set of principles for designing products and processes that cut waste and hazards. Chemists use it to guide changes to fuel cell design.",
      [
        "Energy efficiency",
        "a fuel cell is more efficient when more of the fuel's chemical energy becomes electrical energy and less is lost as heat. Better catalysts at the electrodes help by speeding up the electrode reactions."
      ],
      [
        "Safer materials",
        "designers aim to use materials that are less toxic and less harmful to mine, use and dispose of. Platinum catalysts rely on a scarce metal whose mining disturbs land and uses a lot of energy, so one aim is to use less platinum or replace it with more abundant materials. Cost is a separate issue: a cheaper material is not automatically a safer one."
      ],
      "A better design also has to meet society's energy needs. It should supply enough power, last a long time and use fuel that is produced in a way that does not create large amounts of waste."
    ],
    "remember": "Better fuel cells waste less energy and use safer materials, while still meeting society's need for power.",
    "a": {
      "q": "A team develops a catalyst that lets a fuel cell convert more fuel energy into electricity and lose less as heat. Which green chemistry aim does this meet?",
      "opts": [
        "Greater energy efficiency",
        "Use of safer materials",
        "Use of a less hazardous fuel",
        "A longer working life for the cell"
      ],
      "why": "Turning more of the fuel's chemical energy into electrical energy and losing less as heat is greater energy efficiency. It is not about safer materials, because nothing in the case changes how hazardous the materials are.",
      "clue": "Think about where the energy goes: electricity or heat."
    },
    "b": {
      "d": 3,
      "q": "Dana's company replaces the platinum catalyst in its fuel cell with an abundant, non-toxic metal. The cell gives the same power from the same amount of fuel. Why is this a green chemistry improvement?",
      "opts": [
        "It uses safer, more abundant materials and keeps its power",
        "It turns more of the fuel's energy into electricity",
        "It uses a fuel that is produced with less waste",
        "It costs less, and a cheaper material is a safer one"
      ],
      "why": "Swapping scarce platinum for an abundant, non-toxic metal is a safer materials change, and keeping the same power means society's needs are still met. It is not an efficiency gain, because the same fuel gives the same power. Lower cost does not by itself make a material safer.",
      "clue": "The fuel and the power output stayed the same. What did change?"
    }
  },
  "chem-collision-theory": {
    "title": "Collision theory",
    "card": [
      "For a reaction to happen, reactant particles must collide. Most collisions do not lead to a reaction.",
      [
        "Enough energy",
        "the colliding particles must have at least the activation energy, the minimum energy needed to break bonds and start the reaction."
      ],
      [
        "Right orientation",
        "the particles must hit each other at the right angle, so the atoms that must bond or break are brought together."
      ],
      "A collision with enough energy and the right orientation is a successful collision. Only successful collisions form products."
    ],
    "remember": "A reaction needs a collision that has both enough energy and the right orientation.",
    "a": {
      "q": "Two gas molecules collide with more than the activation energy, but with the wrong orientation. What happens?",
      "opts": [
        "The collision is unsuccessful and no products form",
        "The collision is successful and products form",
        "The molecules react after they bounce apart",
        "The molecules react because the energy is high enough"
      ],
      "why": "A successful collision needs both enough energy and the right orientation. Here the orientation is wrong, so no products form, even though the energy is enough.",
      "clue": "A successful collision needs two things at once."
    },
    "b": {
      "d": 3,
      "q": "In a flask, hydrogen and iodine gases collide very often, yet only a small fraction of collisions form hydrogen iodide. Which reason fits the collision theory?",
      "opts": [
        "Most collisions lack enough energy or the right orientation",
        "Most collisions happen between particles that do not touch",
        "Most collisions use up the activation energy of the flask",
        "Most collisions make products that at once change back"
      ],
      "why": "Only collisions with at least the activation energy and the right orientation are successful. Many collisions fail one of these tests, so only a small fraction form products. Collisions happening often does not make them successful.",
      "clue": "Think about what a collision must have to be successful."
    }
  },
  "chem-factors-affecting-rate": {
    "title": "Factors affecting rate",
    "card": [
      "The rate of a reaction is how fast reactants are used up or products form. A faster rate means more successful collisions each second.",
      [
        "Temperature",
        "Higher temperature makes particles move faster, so they collide more often and more of them collide with enough energy."
      ],
      [
        "Concentration and pressure",
        "More particles in the same volume means more collisions each second. Raising the pressure of a gas does this by squeezing the same particles into a smaller volume."
      ],
      [
        "Surface area and catalyst",
        "Crushing a solid exposes more particles to collide with. A catalyst speeds up a reaction by giving it an easier path."
      ]
    ],
    "remember": "Each factor raises the number of successful collisions per second.",
    "a": {
      "q": "Why does a reaction speed up when a solution is made more concentrated?",
      "opts": [
        "More particles in each volume, so more collisions per second",
        "Each particle moves faster, so more have enough energy",
        "Each particle gains energy, so every collision succeeds",
        "The particles have a larger surface area to collide with"
      ],
      "why": "A higher concentration puts more reactant particles in the same volume, so collisions happen more often. Moving faster is the effect of a higher temperature, not of concentration.",
      "clue": "Think about how crowded the particles are."
    },
    "b": {
      "d": 2,
      "q": "Kofi reacts a 5 g lump of zinc with acid, then repeats it with 5 g of zinc powder. Nothing else changes. Why is the powder faster?",
      "opts": [
        "More zinc particles are exposed to the acid",
        "The zinc particles move faster in the acid",
        "The acid becomes more concentrated",
        "The zinc particles have more energy to start with"
      ],
      "why": "Powder has a much larger surface area, so more zinc particles can meet acid particles at once. The temperature and acid concentration are the same, so particle speed and energy are unchanged.",
      "clue": "On a solid, which particles can the acid actually reach?"
    }
  },
  "chem-maxwell-boltzmann-distributions": {
    "title": "Maxwell-Boltzmann distributions",
    "card": [
      "Particles in a gas or liquid do not all have the same energy. A Maxwell-Boltzmann distribution is a graph of this spread of energies.",
      "The vertical axis shows the number of particles. The horizontal axis shows their energy. The area under the curve is the total number of particles.",
      "The activation energy is marked as a line on the energy axis, and temperature does not move it. Only particles to the right of that line have enough energy to react in a collision.",
      "At a higher temperature the curve flattens and shifts right, with a lower peak. The area stays the same, but more particles lie past the activation energy."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "Maxwell-Boltzmann distributions: number of particles against energy, at a lower temperature (dashed) and a higher temperature (solid). At the higher temperature the curve is flatter, with a lower peak further right, and the same area under it. The activation energy is a line on the energy axis that does not move. The shaded area past it, under the higher temperature curve, is larger than under the lower one, so more particles have enough energy to react.",
        "x": {"min": 0, "max": 6, "label": "Energy"},
        "y": {"min": 0, "max": 6, "label": "Number of particles"},
        "items": [
          {"type": "shade", "under": "h", "span": [3, 6]},
          {
            "type": "fn",
            "id": "l",
            "expr": "11.28\\sqrt{x}e^{-x}",
            "domain": [0, 6],
            "label": "lower temperature",
            "style": "dash",
            "labelAt": 0.9,
            "pos": "above-right"
          },
          {
            "type": "fn",
            "id": "h",
            "expr": "6.14\\sqrt{x}e^{-\\frac{x}{1.5}}",
            "domain": [0, 6],
            "label": "higher temperature",
            "labelAt": 2.4,
            "pos": "above-right"
          },
          {"type": "guide", "at": [3, 4.2], "xLabel": "activation energy"},
          {"type": "arrow", "from": [0.6, 5.1], "to": [1.0, 3.6]}
        ]
      }
    },
    "remember": "Higher temperature moves the curve right, so more particles pass the activation energy.",
    "a": {
      "q": "On a Maxwell-Boltzmann graph, which particles have enough energy to react?",
      "opts": [
        "Those to the right of the activation energy line",
        "Those to the left of the activation energy line",
        "Those at the peak of the curve",
        "Those under the whole area of the curve"
      ],
      "why": "Particles with energy at or above the activation energy lie to its right on the energy axis. The peak shows the most common energy, which is usually below the activation energy.",
      "clue": "Higher energy is further along the horizontal axis."
    },
    "b": {
      "d": 3,
      "q": "A solution of reactants is warmed by 10 degrees Celsius. How does its Maxwell-Boltzmann curve change, and why does this matter for the rate?",
      "opts": [
        "Shifts right, so more particles pass the activation energy",
        "Shifts right, so the activation energy line moves left",
        "Shifts left, so more particles pass the activation energy",
        "Stays still, but the number of particles under it rises"
      ],
      "why": "Warming moves the curve right and flattens it, so a larger share of particles lie past the activation energy. The activation energy line does not move with temperature, and the area under the curve stays the same because no particles are added.",
      "clue": "The activation energy line stays where it is."
    }
  },
  "chem-catalysts": {
    "title": "Catalysts",
    "card": [
      "Activation energy is the minimum energy colliding particles need to react. A catalyst is a substance that speeds up a reaction without being used up.",
      "A catalyst gives the reaction a different path with a lower activation energy. More collisions then have enough energy to react, so the rate rises.",
      "The catalyst takes part in the reaction but is regenerated by the end. It is the same amount and chemical form afterwards, so a small amount can be used again and again.",
      "A catalyst does not change the energy of the reactants or products, so it does not change the overall energy released or absorbed."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "Energy profiles for the same reaction without a catalyst (dashed) and with a catalyst (solid). Here the products sit higher than the reactants. Both paths start and end at the same levels, so the overall energy change is the same, but the catalysed path has a lower peak: a lower activation energy. An arrow points down from the higher peak to the lower one.",
        "x": {"min": 0, "max": 12, "label": "Progress of reaction"},
        "y": {"min": 0, "max": 11.5, "label": "Energy"},
        "items": [
          {
            "type": "curve",
            "id": "n",
            "points": [[0, 2], [3, 2], [6, 9.5], [9, 5], [12, 5]],
            "smooth": true,
            "label": "no catalyst",
            "style": "dash",
            "labelAt": 6,
            "pos": "above"
          },
          {
            "type": "curve",
            "id": "c",
            "points": [[0, 2], [3, 2], [6, 7], [9, 5], [12, 5]],
            "smooth": true,
            "label": "with catalyst",
            "labelAt": 4.5,
            "pos": "below-right"
          },
          {"type": "arrow", "from": [6, 9.2], "to": [6, 7.3]},
          {"type": "text", "at": [1.5, 2], "label": "reactants", "pos": "below"},
          {"type": "text", "at": [10.5, 5], "label": "products", "pos": "below"}
        ]
      }
    },
    "remember": "A catalyst lowers activation energy by a new path and is not used up.",
    "a": {
      "q": "What change inside a reaction explains why adding a catalyst increases the rate?",
      "opts": [
        "A different path needs less activation energy",
        "Colliding particles carry more energy than before",
        "The reactants start at a higher energy",
        "Some of the catalyst turns into extra product"
      ],
      "why": "The new path needs less energy, so a larger share of collisions succeed. Giving colliding particles more energy describes heating, not a catalyst, which leaves the energy of the particles unchanged.",
      "clue": "Heating gives particles more energy. A catalyst works another way."
    },
    "b": {
      "d": 3,
      "q": "Priya adds manganese dioxide to hydrogen peroxide and oxygen bubbles off faster. She filters out the solid afterwards. What would she find?",
      "opts": [
        "The same mass of manganese dioxide as she added",
        "Less manganese dioxide, as it was used up",
        "More manganese dioxide, as it formed from the reaction",
        "The same mass, but it has become a different compound"
      ],
      "why": "A catalyst is regenerated, so the same amount remains in the same chemical form. Less remaining would mean it was consumed, which a catalyst is not.",
      "clue": "Does a catalyst get used up or changed by the end?"
    }
  },
  "chem-reversible-reactions-extent": {
    "title": "Reversible reactions and extent",
    "card": [
      "In a reversible reaction, the products can react to form the reactants again. It is shown with a double arrow, such as N2O4(g) ⇌ 2NO2(g), with the forward reaction going left to right and the reverse going right to left.",
      [
        "Rate",
        "how fast a reaction goes, or how quickly reactants are used up or products form. A faster reaction reaches the point where it stops changing sooner."
      ],
      [
        "Extent",
        "how far a reaction goes, or how much of the reactants have turned into products when the reaction stops changing."
      ],
      "In a reversible reaction, the reactants do not all turn into products, so the extent is incomplete. A catalyst changes the rate but not the extent, while a change in temperature can change both. Knowing one does not tell you the other."
    ],
    "remember": "Rate is how fast. Extent is how far. Knowing one does not tell you the other.",
    "a": {
      "q": "Which statement describes the extent of a reaction?",
      "opts": [
        "How much reactant has become product by the end",
        "How quickly the reactants are used up at the start",
        "How much energy is needed to start the reaction",
        "How much faster the reaction goes with a catalyst"
      ],
      "why": "Extent is about how far the reaction goes, which means how much reactant has turned into product. The option about reactants being used up quickly describes rate, which is a different idea.",
      "clue": "Extent asks how far, not how fast."
    },
    "b": {
      "d": 3,
      "q": "Ava runs a reversible reaction at two temperatures. At the higher temperature, the mixture stops changing after 2 minutes. At the lower temperature, it takes 10 minutes. What can she say from this alone?",
      "opts": [
        "The reaction is faster at the higher temperature",
        "The reaction goes further at the higher temperature",
        "The reaction is faster at the lower temperature",
        "The reaction goes further at the lower temperature"
      ],
      "why": "Stopping changing sooner shows the reaction is faster at the higher temperature, which is about rate. Temperature can also change extent, but the time taken does not show how much product formed, so nothing can be said about extent from this alone.",
      "clue": "Time taken tells you about rate, not about how far."
    }
  },
  "chem-dynamic-equilibrium": {
    "title": "Dynamic equilibrium",
    "card": [
      "A closed system lets energy move in or out, but no matter enters or leaves. In a closed system, a reversible reaction can reach equilibrium.",
      "At equilibrium, the forward and reverse reactions both continue, and they go at equal rates.",
      "Because the two rates are equal, each substance is made as fast as it is used up. Its amount and concentration stay constant, though they need not be equal to each other.",
      "The equilibrium is dynamic, as particles keep reacting in both directions. It looks still on the large scale only. If the reaction had truly stopped, no particles would be reacting."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "Concentration against time for a reversible reaction in a closed system. The reactant's concentration falls and the product's rises, quickly at first, then more slowly. Once equilibrium is reached both level off and stay constant, at different concentrations, because the forward and reverse reactions go at equal rates.",
        "x": {"min": 0, "max": 7, "label": "Time"},
        "y": {"min": 0, "max": 1.15, "label": "Concentration"},
        "items": [
          {"type": "fn", "id": "a", "expr": "0.4 + 0.6e^{-x}", "domain": [0, 7], "label": "reactant"},
          {"type": "fn", "id": "b", "expr": "0.6 - 0.6e^{-x}", "domain": [0, 7], "label": "product"},
          {"type": "text", "at": [4.0, 0.44], "label": "equilibrium", "pos": "above"}
        ]
      }
    },
    "remember": "At equilibrium, reactions keep going both ways at equal rates, so amounts stay constant.",
    "a": {
      "q": "What is the best reason the concentrations stay constant at equilibrium in a closed system?",
      "opts": [
        "Forward and reverse reactions go on at equal rates",
        "Both reactions have stopped, so nothing changes",
        "The reactants and products have equal concentrations",
        "The forward reaction has used up all the reactants"
      ],
      "why": "Each substance is made as fast as it is used up, so its concentration does not change. Constant concentrations do not mean the reactions have stopped, and they do not mean the concentrations are equal.",
      "clue": "Think about how fast each substance is made and used up."
    },
    "b": {
      "d": 3,
      "q": "Nitrogen dioxide gas in a sealed flask has reached equilibrium with dinitrogen tetroxide. The colour stops changing. Which statement about the flask is correct?",
      "opts": [
        "Both reactions continue and their rates are equal",
        "Neither reaction continues, as the colour is steady",
        "Only the forward reaction continues, at a slower rate",
        "The two gases are now present in equal concentrations"
      ],
      "why": "A steady colour shows the concentrations are constant, which happens when the forward and reverse rates are equal. It does not show the reactions have stopped, because particles keep reacting in both directions.",
      "clue": "A steady colour shows constant amounts, not a stopped reaction."
    }
  },
  "chem-electrolysis": {
    "title": "Electrolysis",
    "card": [
      "Electrolysis uses an external power supply to force a non-spontaneous redox reaction to happen. The cell converts electrical energy into chemical energy.",
      "In an electrolytic cell the anode is positive and the cathode is negative. Oxidation happens at the anode and reduction happens at the cathode. Electrons are pushed from the anode to the cathode through the external circuit.",
      "In a molten salt, only the two ions are present. The cation is reduced at the cathode and the anion is oxidised at the anode. Molten sodium chloride gives sodium metal and chlorine gas.",
      "In an aqueous solution, water can also react. At the cathode, the strongest oxidising agent present is reduced. At the anode, the strongest reducing agent present is oxidised. Use the electrochemical series to compare them."
    ],
    "remember": "Electrolysis forces a non-spontaneous reaction: oxidation at the anode, reduction at the cathode.",
    "a": {
      "q": "What is the role of the external power supply in an electrolytic cell?",
      "opts": [
        "It forces a non-spontaneous redox reaction to occur",
        "It speeds up a reaction that is already spontaneous",
        "It stores the chemical energy released by the reaction",
        "It allows ions to move through a salt bridge"
      ],
      "why": "The reaction would not happen by itself, so electrical energy must be supplied to drive it. Speeding up a spontaneous reaction is the job of a catalyst, not a power supply.",
      "clue": "Think about whether the reaction would run without it."
    },
    "b": {
      "d": 3,
      "q": "Molten potassium bromide, KBr, is electrolysed using inert electrodes. What forms at the anode?",
      "opts": [
        "Bromine, from oxidation of bromide ions",
        "Potassium, from reduction of potassium ions",
        "Oxygen, from oxidation of water",
        "Hydrogen, from reduction of water"
      ],
      "why": "A molten salt has no water, so only K⁺ and Br⁻ are present. Anions are oxidised at the anode, so bromide ions form bromine. Potassium would form at the cathode, not the anode.",
      "clue": "Which ions are in the molten salt, and which electrode attracts anions?"
    }
  },
  "chem-commercial-electrolytic-cells": {
    "title": "Commercial electrolytic cells",
    "card": [
      "Industrial electrolytic cells are designed to make a product cheaply and safely on a large scale. The electrodes and electrolyte are chosen to suit the product wanted.",
      "Electrodes must conduct electricity and not react in unwanted ways. Inert electrodes such as graphite or titanium are often used. Some electrodes are made from the metal being refined.",
      "The electrolyte must contain the ions needed to make the product. Some cells use a molten electrolyte. Others use an aqueous solution.",
      "Products are removed as they form. This keeps the products apart so they cannot react with each other, and it allows the cell to run continuously."
    ],
    "remember": "Commercial cells match electrodes and electrolyte to the product and remove it as it forms.",
    "a": {
      "q": "Why do industrial cells remove products as they form?",
      "opts": [
        "To keep products apart and let the cell run continuously",
        "To make the reaction spontaneous without a power supply",
        "To raise the voltage the power supply must provide",
        "To change the electrolyte into a different substance"
      ],
      "why": "Removing products keeps them from reacting with each other, such as a gas reacting with a metal, and lets production continue. It does not make the reaction spontaneous, because the power supply is still needed.",
      "clue": "Think about what could happen if products stayed mixed together."
    },
    "b": {
      "d": 2,
      "q": "A company designs a cell to make chlorine gas from salt solution. Why would it choose graphite or titanium electrodes?",
      "opts": [
        "They conduct electricity and do not react with chlorine",
        "They react with chlorine to make the process cheaper",
        "They dissolve into the solution to replace the ions used",
        "They stop the solution from conducting electricity"
      ],
      "why": "Inert electrodes carry current without being used up or changing the products. Electrodes that reacted with chlorine would be damaged and would contaminate the product.",
      "clue": "An electrode should carry current but not take part."
    }
  },
  "chem-rechargeable-cells": {
    "title": "Rechargeable cells",
    "card": [
      "A rechargeable cell works in two modes. When it powers a device, it is a galvanic cell: a spontaneous redox reaction releases electrical energy.",
      "When it is charged, an external power supply is connected. The cell becomes an electrolytic cell, and the reaction is forced to run in reverse.",
      "Recharging can work when the products of discharge stay in contact with the electrodes. The reverse reaction can then rebuild the original reactants.",
      "The positive and negative terminals keep their signs in both modes. During discharge the negative electrode is the anode and the positive electrode is the cathode. During charging these roles swap, because oxidation always happens at the anode and the reaction is reversed."
    ],
    "remember": "Discharge is galvanic and spontaneous. Charging is electrolytic and forced by a power supply.",
    "a": {
      "q": "A rechargeable cell is connected to a power supply to charge it. How does the cell behave?",
      "opts": [
        "Electrolytic cell, and the discharge reaction is reversed",
        "Galvanic cell, and the discharge reaction is sped up",
        "Electrolytic cell, and the discharge reaction continues",
        "Galvanic cell, and the discharge reaction is reversed"
      ],
      "why": "Charging uses an external power supply to force the discharge reaction to run backwards, which is the job of an electrolytic cell. A galvanic cell releases energy from a spontaneous reaction, so it cannot describe charging, even if the reaction is reversed.",
      "clue": "Is the reaction spontaneous when a power supply drives it?"
    },
    "b": {
      "d": 3,
      "q": "Priya charges a rechargeable battery. At the electrode that is negative during discharge, what type of reaction happens during charging?",
      "opts": [
        "Reduction, because it becomes the cathode",
        "Oxidation, because it stays the anode",
        "Reduction, because it stays the anode",
        "Oxidation, because it becomes the cathode"
      ],
      "why": "Charging reverses the discharge reaction. Oxidation happened at this electrode during discharge, so reduction happens there during charging, which makes it the cathode. Oxidation always happens at the anode, so the electrode cannot stay the anode and be reduced.",
      "clue": "Charging runs the discharge reaction backwards."
    }
  },
  "chem-green-hydrogen": {
    "title": "Green hydrogen",
    "card": [
      "Electrolysis of water uses electricity to split water: 2H₂O(l) → 2H₂(g) + O₂(g). The only products at the electrodes are hydrogen and oxygen.",
      "Hydrogen is called green when the electricity for electrolysis comes from renewable sources such as solar or wind. No fossil fuels are burned to make it.",
      "If the electricity comes from burning coal or gas, the electrodes still make no carbon dioxide. The power station releases it instead, so that hydrogen is not green.",
      "Artificial photosynthesis is another route. A device uses sunlight to split water into hydrogen and oxygen directly, without a separate power supply."
    ],
    "remember": "Green hydrogen is made from water using renewable energy, not fossil fuels.",
    "a": {
      "q": "What makes hydrogen made by electrolysis of water green?",
      "opts": [
        "The electricity comes from solar or wind power",
        "The electrolysis uses water rather than molten salt",
        "The water used comes from a renewable source",
        "The oxygen made at the anode is also collected"
      ],
      "why": "Green refers to how the energy is supplied. If the electricity came from burning fossil fuels, the hydrogen would not be green, even though it still comes from water.",
      "clue": "Think about where the electrical energy comes from."
    },
    "b": {
      "d": 3,
      "q": "A Queensland plant electrolyses water using grid power made mostly by burning coal. Which statement about its hydrogen is correct?",
      "opts": [
        "Not green, as CO₂ is released where the power is made",
        "Green, as the hydrogen is made only from water",
        "Not green, as CO₂ forms at the electrodes",
        "Green, as no fuel is burned inside the electrolyser"
      ],
      "why": "The electrodes make only hydrogen and oxygen, but burning coal for the electricity releases carbon dioxide at the power station. So the hydrogen is not green. Saying CO₂ forms at the electrodes is wrong, because water contains no carbon.",
      "clue": "Where is the coal burned?"
    }
  },
  "chem-faraday-s-laws": {
    "title": "Faraday's laws",
    "card": [
      "The amount of substance made in electrolysis depends on the charge passed through the cell. More charge means more product.",
      "Charge in coulombs is current in amperes multiplied by time in seconds. Q = It. Convert minutes and hours to seconds first.",
      "The amount of electrons in moles is n(e⁻) = Q/F. F is Faraday's constant, about 96 500 C mol⁻¹. It is the charge carried by one mole of electrons.",
      "Use the half-equation to link electrons to product. For Cu²⁺ + 2e⁻ → Cu, two moles of electrons make one mole of copper."
    ],
    "remember": "Q = It, then n(e⁻) = Q/F, then use the half-equation ratio.",
    "a": {
      "q": "A current of 2.0 A flows for 100 s in an electrolytic cell. What charge passes through the cell?",
      "opts": ["200 C", "50 C", "0.020 C", "96 500 C"],
      "why": "Q = It = 2.0 × 100 = 200 C. Dividing current by time gives 0.020, which is the wrong operation. 96 500 C is the charge of one mole of electrons, not this cell.",
      "clue": "Multiply current by time in seconds."
    },
    "b": {
      "d": 3,
      "q": "A current of 1.93 A flows for 5000 s through molten silver nitrate. Ag⁺ + e⁻ → Ag. How many moles of silver form at the cathode?",
      "opts": ["0.100 mol", "0.0500 mol", "0.200 mol", "9650 mol"],
      "why": "Q = 1.93 × 5000 = 9650 C. n(e⁻) = 9650 ÷ 96 500 = 0.100 mol. One electron makes one silver atom, so n(Ag) = 0.100 mol. 0.0500 mol would come from wrongly halving the electrons.",
      "clue": "Find Q, then electrons, then use the 1 to 1 ratio."
    }
  },
  "chem-carbon-special": {
    "title": "Why carbon is special",
    "card": [
      "A carbon atom has four valence electrons, the electrons in its outer shell. It shares each one in a covalent bond, so it forms four bonds.",
      "Carbon forms strong covalent bonds with other carbon atoms. This lets it join into long chains, branched chains and rings.",
      "Carbon also bonds strongly with other non-metal atoms, such as hydrogen, oxygen, nitrogen and the halogens.",
      "Four bonds per atom, plus the many ways to join atoms, give millions of different carbon compounds. Few other elements form such varied compounds."
    ],
    "remember": "Four bonds and strong C to C links let carbon build millions of compounds.",
    "a": {
      "q": "Which property of carbon atoms best explains why there are so many carbon compounds?",
      "opts": [
        "They form four bonds and can bond strongly to each other",
        "They form ionic bonds with most other elements",
        "They have a full outer shell and so bond very easily",
        "They form two bonds and so can only make short chains"
      ],
      "why": "Four covalent bonds per atom, and strong bonds between carbon atoms, allow chains, branches and rings in many arrangements. A carbon atom has four valence electrons, not a full outer shell, so it needs to share electrons.",
      "clue": "Think about how many bonds each atom makes and what it can bond to."
    },
    "b": {
      "d": 2,
      "q": "A chemist says that carbon can form branched chains and rings. Which feature of carbon makes this possible?",
      "opts": [
        "Each atom can make four bonds, including bonds to carbon",
        "Each atom can lose four electrons to form an ion",
        "Each atom has four electron shells to hold bonds",
        "Each atom can make bonds only with hydrogen atoms"
      ],
      "why": "Because each carbon atom makes four bonds and can bond strongly to other carbon atoms, chains can branch or close into rings. Carbon has four valence electrons, not four shells, and it shares electrons rather than losing them.",
      "clue": "Look at how many bonds each atom makes and what it can bond to."
    }
  },
  "chem-homologous-series": {
    "title": "Homologous series",
    "card": [
      "A homologous series is a family of organic compounds with the same functional group and similar chemical properties. Each member differs from the next by one CH2 unit.",
      "Examples: alkanes have only C-C single bonds. Alkenes have a C=C double bond. Alcohols have an -OH group. Amines have an -NH2 group. Carboxylic acids have -COOH. Esters have -COO- between two carbon chains. Amides have -CONH2 or a similar C(=O)N link.",
      [
        "Molecular formula",
        "shows only the number of each atom, such as C2H6O. It does not show how the atoms are joined."
      ],
      [
        "Semi-structural formula",
        "shows the atoms in groups along the chain, such as CH3CH2OH. A structural formula draws every atom and bond. A skeletal formula shows only the carbon backbone as lines, with functional groups written in."
      ]
    ],
    "remember": "A series shares a functional group and grows by CH2. Different formulas show different amounts of detail.",
    "a": {
      "q": "Ethanol, propan-1-ol and butan-1-ol all contain an -OH group and differ by one CH2 unit each. What are they?",
      "opts": [
        "Members of one homologous series",
        "Members of the alkane series",
        "Compounds with the same molecular formula",
        "Members of the carboxylic acid series"
      ],
      "why": "They share the -OH functional group and each differs from the next by CH2, so they belong to one homologous series, the alcohols. Each extra CH2 changes the molecular formula, so they cannot share one. Alkanes have no -OH group, and carboxylic acids need -COOH.",
      "clue": "Look at what they share and how each differs from the next."
    },
    "b": {
      "d": 3,
      "q": "A molecule is written as CH3CH2COOH. Which description is correct?",
      "opts": [
        "A semi-structural formula of a carboxylic acid",
        "A molecular formula of an ester",
        "A skeletal formula of a carboxylic acid",
        "A semi-structural formula of an alcohol"
      ],
      "why": "The atoms are grouped along the chain, so it is a semi-structural formula. The -COOH group makes it a carboxylic acid. An ester would have -COO- between two carbon chains, not a -COOH group at the end.",
      "clue": "Check how the atoms are written, then name the group at the end."
    }
  },
  "chem-iupac-naming": {
    "title": "IUPAC naming",
    "card": [
      "An IUPAC name is built in parts. The stem shows the number of carbons in the longest chain: meth (1), eth (2), prop (3), but (4), pent (5), hex (6).",
      "The ending shows the functional group. Alkanes end in -ane, alkenes in -ene, alcohols in -ol and carboxylic acids in -oic acid.",
      "Numbers show where a branch or functional group sits. Number the chain from the end that gives the functional group the lowest number. Branches get the lowest numbers only when that still leaves a choice.",
      "A branch is named by its own stem with -yl, such as methyl, and goes in front of the main name. In 2-methylbutane, a methyl branch sits on carbon 2 of a 4-carbon chain."
    ],
    "remember": "A name gives chain length, functional group and positions, and the functional group claims the lowest number first.",
    "a": {
      "q": "What does the 'pent' in pentan-1-ol tell you?",
      "opts": [
        "The longest chain has five carbons",
        "The -OH group is on carbon 5",
        "There are five hydroxyl groups",
        "There is a branch with five carbons"
      ],
      "why": "The stem pent shows a longest chain of five carbons. The position of the -OH group is shown by the number 1, not by the stem. Mixing up the stem with the position is a common mistake.",
      "clue": "The stem counts carbons in the longest chain."
    },
    "b": {
      "d": 3,
      "q": "What is the IUPAC name of CH3CH(OH)CH(CH3)CH3?",
      "opts": ["3-methylbutan-2-ol", "2-methylbutan-3-ol", "3-methylbutan-1-ol", "2-methylpentan-3-ol"],
      "why": "The longest chain has four carbons, so it is butane with an -ol ending. Numbering from the end nearer the -OH puts it on carbon 2 and the methyl on carbon 3. 2-methylbutan-3-ol is tempting because it gives the branch a lower number, but the functional group takes priority.",
      "clue": "Which part of the molecule gets first claim on the lowest number?"
    }
  },
  "chem-boiling-points-organic-compounds": {
    "title": "Boiling points of organic compounds",
    "card": [
      "To boil a liquid, energy must pull its molecules apart from each other. The stronger the forces between molecules, the more energy is needed, so the boiling point is higher.",
      "Longer chains have more electrons and more surface contact, so their dispersion forces are stronger. Within a family, boiling point, melting point and viscosity rise as chain length increases.",
      "Different families have different forces. Dispersion forces are weakest, dipole-dipole forces are stronger, and hydrogen bonds (from O-H or N-H groups) are stronger again.",
      "For molecules of similar size, an alcohol or carboxylic acid boils at a higher temperature than an alkane, because it can form hydrogen bonds. Viscosity, how slowly a liquid flows, rises with stronger forces in the same way."
    ],
    "remember": "Stronger forces between molecules mean more energy to separate them, so a higher boiling point.",
    "a": {
      "q": "Why does pentane boil at a higher temperature than propane?",
      "opts": [
        "Its longer chain gives stronger dispersion forces",
        "Its longer chain gives it hydrogen bonds",
        "Its covalent bonds are stronger within each molecule",
        "Its molecules are more polar than propane molecules"
      ],
      "why": "Pentane has more electrons and a longer chain, so its dispersion forces between molecules are stronger and more energy is needed to separate them. Hydrogen bonds need O-H or N-H groups, which neither alkane has.",
      "clue": "Both are alkanes, so think about chain length and the forces between molecules."
    },
    "b": {
      "d": 3,
      "q": "Ethanol (CH3CH2OH) and propane (CH3CH2CH3) have similar molar masses. Why does ethanol have the much higher boiling point?",
      "opts": [
        "Ethanol molecules form hydrogen bonds with each other",
        "Ethanol has a longer carbon chain than propane",
        "Ethanol has stronger covalent bonds inside its molecules",
        "Ethanol has only dispersion forces between its molecules"
      ],
      "why": "Ethanol has an O-H group, so its molecules form hydrogen bonds, which are stronger than the dispersion forces between propane molecules. More energy is needed to separate ethanol molecules. The chain lengths are similar, so chain length does not explain the gap.",
      "clue": "Look at the functional group on ethanol that propane lacks."
    }
  },
  "chem-substitution-addition-reactions": {
    "title": "Substitution and addition reactions",
    "card": [
      [
        "Substitution",
        "A saturated alkane has only single C-C bonds. In a substitution reaction, a halogen atom replaces a hydrogen atom on the alkane, and a hydrogen halide is also made."
      ],
      [
        "Conditions",
        "Alkanes need UV light or heat to react with chlorine or bromine. For example, CH4 + Cl2 gives CH3Cl + HCl. Further substitution can give a mix of haloalkanes."
      ],
      [
        "Addition",
        "An unsaturated alkene has a C=C double bond. In an addition reaction, one bond of the double bond breaks and a new atom bonds to each carbon. No hydrogen halide is left over, and a symmetrical alkene such as ethene gives one product."
      ],
      [
        "Reagents",
        "Alkenes add H2 to give an alkane, Cl2 or Br2 to give a dihaloalkane, HCl or HBr to give a haloalkane, and H2O to give an alcohol."
      ]
    ],
    "remember": "Alkanes swap H for a halogen and also make a hydrogen halide. Alkenes add atoms across the C=C bond.",
    "a": {
      "q": "Which description fits the reaction of ethene with bromine to make 1,2-dibromoethane?",
      "opts": [
        "Addition, because the C=C bond opens and one product forms",
        "Substitution, because bromine replaces hydrogen atoms",
        "Addition, because HBr forms as a second product",
        "Substitution, because the C=C bond opens to one product"
      ],
      "why": "Ethene has a C=C double bond. One bond breaks and a bromine atom joins each carbon, giving a single product, which is addition. Substitution would replace a hydrogen and also make a hydrogen halide, and no HBr forms here.",
      "clue": "Check what happens to the double bond and count the products."
    },
    "b": {
      "d": 3,
      "q": "Ethane reacts with chlorine in UV light. Separately, under the same conditions, ethene reacts with chlorine. Which statement is correct?",
      "opts": [
        "Ethane gives chloroethane and HCl; ethene gives C2H4Cl2",
        "Ethane gives C2H4Cl2; ethene gives chloroethane and HCl",
        "Both give chloroethane and HCl as the two products",
        "Both give a dichloro product as the only product"
      ],
      "why": "Ethane is saturated, so a chlorine atom replaces a hydrogen and HCl also forms. Ethene is unsaturated, so chlorine adds across the C=C bond to give 1,2-dichloroethane (C2H4Cl2) with no HCl. The tempting second option swaps the two reaction types.",
      "clue": "Which molecule has a double bond, and which reaction also makes HCl?"
    }
  },
  "chem-esters-amides": {
    "title": "Esters and amides",
    "card": [
      [
        "Ester",
        "An alcohol and a carboxylic acid join to form an ester and water, usually with an acid catalyst. Joining two molecules with the loss of water is called a condensation reaction. The ester link is -COO-."
      ],
      [
        "Hydrolysis",
        "Water can split an ester back into an alcohol and a carboxylic acid. This reaction is called hydrolysis, and it is the reverse of ester formation. An acid catalyst is often used."
      ],
      [
        "Amide",
        "An amine and a carboxylic acid join to form an amide and water. The amide link is -CONH-, where the nitrogen comes from the amine."
      ],
      "In both reactions, the carboxylic acid loses its -OH and supplies the C=O of the new link. The alcohol or amine loses an H, and supplies the O or the N of the link."
    ],
    "remember": "Alcohol + carboxylic acid gives an ester. Amine + carboxylic acid gives an amide. Each also gives water.",
    "a": {
      "q": "Ethanol reacts with propanoic acid with an acid catalyst. What are the products?",
      "opts": ["An ester and water", "An amide and water", "An ester and hydrogen", "An amide and ammonia"],
      "why": "An alcohol and a carboxylic acid form an ester and water. An amide needs an amine, and ethanol is an alcohol with no nitrogen, so no amide can form.",
      "clue": "Look at what type of compound ethanol is."
    },
    "b": {
      "d": 3,
      "q": "Methylamine, CH3NH2, reacts with ethanoic acid. Which statement about the organic product is correct?",
      "opts": [
        "It has a -CONH- link and water is also made",
        "It has a -COO- link and water is also made",
        "It has a -CONH- link and water is used up",
        "It has a -COO- link and an alcohol is also made"
      ],
      "why": "An amine and a carboxylic acid form an amide, which has the -CONH- link, and water is released. The -COO- link is tempting but belongs to esters, which need an alcohol rather than an amine.",
      "clue": "Which functional group does the nitrogen end up in?"
    }
  },
  "chem-reaction-pathways": {
    "title": "Reaction pathways",
    "card": [
      "A reaction pathway is a series of reactions that turns a starting compound into a target compound. The product of one step becomes the reactant of the next.",
      "Each step uses a known reaction that changes one functional group. Examples: an alkene and HBr give a haloalkane, and a haloalkane and water give an alcohol.",
      "To make a primary amine, react a haloalkane with excess ammonia. To make a carboxylic acid, oxidise a primary alcohol using acidified dichromate or permanganate.",
      "To plan a pathway, work backwards from the target. Ask which functional group is needed, and which reaction makes it from the group you have."
    ],
    "remember": "Plan a pathway by working backwards from the target, one functional group change per step.",
    "a": {
      "q": "Which pathway makes propanoic acid from 1-bromopropane?",
      "opts": [
        "Add water to make propan-1-ol, then oxidise it",
        "Add excess ammonia to make propan-1-amine, then oxidise it",
        "Add water to make propan-1-ol, then add excess ammonia",
        "Oxidise it with dichromate, then add water to the product"
      ],
      "why": "Water turns the haloalkane into the primary alcohol propan-1-ol, and oxidising a primary alcohol gives a carboxylic acid. The option that adds excess ammonia first is tempting, but it makes an amine, and only a primary alcohol is oxidised to a carboxylic acid.",
      "clue": "Which functional group is oxidised to give a carboxylic acid?"
    },
    "b": {
      "d": 3,
      "q": "Dana wants to make ethylamine from ethene. Which two-step pathway should she use?",
      "opts": [
        "Ethene and HBr give bromoethane, then excess ammonia",
        "Ethene and H2O give ethanol, then acidified dichromate",
        "Ethene and H2 give ethane, then ethane and water",
        "Ethene and Br2 give dibromoethane, then acidified dichromate"
      ],
      "why": "Bromoethane reacts with excess ammonia to give the primary amine ethylamine. The ethanol option is tempting because it is a real pathway, but oxidising ethanol gives ethanoic acid, which is a carboxylic acid and not an amine.",
      "clue": "Work backwards: which compound reacts with ammonia to make an amine?"
    }
  },
  "chem-making-biodiesel": {
    "title": "Making biodiesel",
    "card": [
      "Plant oils are triglycerides: esters made from glycerol (propane-1,2,3-triol) and three long fatty acid chains. Biodiesel is a mixture of methyl or ethyl esters of those fatty acids.",
      "In transesterification, a triglyceride reacts with a short-chain alcohol, usually methanol or ethanol. The alcohol swaps places with the glycerol part of the ester.",
      "One triglyceride and three alcohol molecules make three biodiesel ester molecules and one glycerol molecule. A catalyst, often a base such as sodium hydroxide, speeds up the reaction.",
      "Biodiesel esters have long chains with an oxygen-containing ester group. Petrodiesel is a mixture of hydrocarbons only. Biodiesel is made from plants, which are renewable, while petrodiesel comes from crude oil."
    ],
    "remember": "Biodiesel is made by reacting a plant oil with an alcohol, giving fatty acid esters and glycerol.",
    "a": {
      "q": "Which pair of products forms when a plant oil reacts with methanol to make biodiesel?",
      "opts": ["Methyl esters and glycerol", "Fatty acids and methanal", "Methyl esters and water", "Alkenes and glycerol"],
      "why": "Transesterification swaps the glycerol part of the triglyceride for methanol, so three methyl esters and glycerol form. Methyl esters and water is tempting, but water is the by-product of esterification from an acid and an alcohol, not of this reaction.",
      "clue": "The alcohol swaps places with the glycerol part."
    },
    "b": {
      "d": 3,
      "q": "A plant in Bendigo makes biodiesel from canola oil and ethanol. Which statement about the process and its products is correct?",
      "opts": [
        "Each triglyceride makes three ethyl esters and one glycerol",
        "Each triglyceride makes one ethyl ester and three glycerol",
        "Each triglyceride makes three ethyl esters and three water",
        "Each triglyceride makes one ethyl ester and one glycerol"
      ],
      "why": "A triglyceride has three fatty acid chains, so it needs three ethanol molecules and gives three ethyl esters plus one glycerol. Three ethyl esters and three water is tempting, but no water forms because the ester links are exchanged, not made from acids.",
      "clue": "Count the fatty acid chains on one triglyceride."
    }
  },
  "chem-hydrolysis-digestion": {
    "title": "Hydrolysis and condensation of biomolecules",
    "card": [
      [
        "Condensation",
        "Two molecules join and a small molecule, usually water, is released. Cells use it to build large biomolecules from small units."
      ],
      [
        "Building",
        "Amino acids join by condensation to form proteins. Glucose units join to form starch in plants and glycogen in animals. Fatty acids and glycerol join to form fats."
      ],
      [
        "Hydrolysis",
        "A large molecule is split by reacting with water. The water is used up, and the large molecule breaks into smaller units."
      ],
      [
        "Digestion",
        "Digestion uses hydrolysis, helped by enzymes. Proteins break down to amino acids, starch and glycogen to glucose, and fats to fatty acids and glycerol."
      ]
    ],
    "remember": "Condensation joins units and releases water. Hydrolysis splits them and uses water.",
    "a": {
      "q": "Which change in the body is a condensation reaction?",
      "opts": [
        "Glucose units joining to form glycogen",
        "Starch breaking down to glucose in the gut",
        "A protein breaking down to amino acids",
        "A fat breaking down to fatty acids and glycerol"
      ],
      "why": "Glycogen is built by joining glucose units, and water is released. The other three changes break a large molecule into smaller units by reacting with water, so they are hydrolysis.",
      "clue": "Which change builds a larger molecule from smaller units?"
    },
    "b": {
      "d": 3,
      "q": "Mia eats a meal of chicken and rice. In her gut, which reaction type and products match the digestion of the protein in the chicken?",
      "opts": [
        "Hydrolysis, giving amino acids",
        "Condensation, giving amino acids",
        "Hydrolysis, giving glucose",
        "Condensation, giving a larger protein"
      ],
      "why": "Digestion breaks large molecules down by reacting them with water, which is hydrolysis. Protein is made of amino acids, so these are the products. Glucose comes from starch, not protein.",
      "clue": "Digestion splits large molecules. Which units make up a protein?"
    }
  },
  "chem-atom-economy-yield": {
    "title": "Atom economy and yield",
    "card": [
      [
        "Percentage yield",
        "compares the mass of product actually collected with the mass the equation says is possible. % yield = actual mass ÷ theoretical mass × 100. It is lowered by incomplete reactions, side reactions and losses during separation."
      ],
      [
        "Atom economy",
        "compares the mass of the desired product with the total mass of all reactants in the balanced equation. Atom economy = molar mass of desired product ÷ total molar mass of reactants × 100, using the coefficients."
      ],
      [
        "Difference",
        "Yield depends on how well the reaction is carried out. Atom economy depends only on the equation, so a reaction can have a 100% yield and a low atom economy if it makes a lot of by-product."
      ],
      [
        "Green chemistry",
        "favours a high atom economy, because more of the reactant atoms end up in the product and less becomes waste. An addition reaction that makes only one product has an atom economy of 100%."
      ]
    ],
    "remember": "Yield shows how well a reaction was carried out. Atom economy shows how much of the reactants the equation turns into product.",
    "a": {
      "q": "Which change would raise the percentage yield of a reaction without changing its equation?",
      "opts": [
        "Losing less product when it is separated",
        "Choosing a reaction with fewer by-products in its equation",
        "Using a different balanced equation for the same product",
        "Dividing by the total molar mass of reactants"
      ],
      "why": "Percentage yield compares the mass actually collected with the theoretical mass, so less loss during separation raises it. Changing the equation changes the atom economy, not how well a given reaction is carried out.",
      "clue": "Yield is about what happens in the flask and afterwards, not what is written in the equation."
    },
    "b": {
      "d": 3,
      "q": "Reaction X makes ethanol in 100% yield, but the equation also produces a large mass of waste by-product. What is true of reaction X?",
      "opts": [
        "Its atom economy is low, though its yield is high",
        "Its atom economy is high, because its yield is high",
        "Its atom economy is 100%, because no product is lost",
        "Its yield is low, because a by-product forms"
      ],
      "why": "Atom economy depends on the equation. A large by-product means less of the reactant mass ends up in ethanol, so atom economy is low. A 100% yield only shows that all the possible ethanol was collected, so it does not make the atom economy high.",
      "clue": "Which measure depends only on the balanced equation, and which on the amount collected?"
    }
  },
  "chem-tests-functional-groups": {
    "title": "Tests for functional groups",
    "card": [
      [
        "C=C double bond",
        "Add bromine water, which is orange-brown. An alkene decolourises it quickly, because bromine adds across the double bond. A saturated compound does not decolourise it quickly in the dark."
      ],
      [
        "Hydroxyl group",
        "An alcohol has an -OH group. Warm it with acidified potassium dichromate, which is orange. A primary or secondary alcohol turns the mixture green, as the dichromate is reduced to chromium(III) ions."
      ],
      [
        "Carboxyl group",
        "A carboxylic acid has a -COOH group. Add sodium carbonate or sodium hydrogencarbonate. A carboxylic acid fizzes, because carbon dioxide gas forms."
      ],
      "Each test gives a visible change, such as a colour change or bubbles. The change suggests a group but does not prove it: aldehydes also turn dichromate green, and tertiary alcohols give no change."
    ],
    "remember": "Each result suggests a group: colourless bromine water for C=C, green dichromate for a primary or secondary alcohol, fizzing for a carboxylic acid.",
    "a": {
      "q": "A colourless liquid is added to sodium carbonate powder and fizzes. Which functional group does it contain?",
      "opts": ["Carboxyl group", "Hydroxyl group", "Carbon-carbon double bond", "Carbon-carbon single bond only"],
      "why": "Fizzing with a carbonate means carbon dioxide formed, which shows an acid with a carboxyl group. A hydroxyl group is tested with dichromate, which gives a colour change, not bubbles.",
      "clue": "Which group makes a carbonate release gas?"
    },
    "b": {
      "d": 3,
      "q": "Priya tests a sample of unknown liquid X. It stays orange-brown with bromine water, but warmed acidified dichromate turns green. What does X most likely contain?",
      "opts": [
        "A hydroxyl group but no C=C double bond",
        "A C=C double bond but no hydroxyl group",
        "Both a hydroxyl group and a C=C double bond",
        "A carboxyl group and no hydroxyl group"
      ],
      "why": "Bromine water was not decolourised, so there is no C=C bond. Green dichromate suggests a primary or secondary alcohol, though an aldehyde would give the same result. A carboxyl group does not turn dichromate green, so that option does not explain the second result.",
      "clue": "Read each test result separately, then combine them."
    }
  },
  "chem-melting-point-distillation": {
    "title": "Melting point and distillation",
    "card": [
      [
        "Melting point",
        "A pure solid melts at one sharp temperature, over a range of about 1°C or less. An impure solid melts over a wider range and at a lower temperature than the pure substance."
      ],
      [
        "Simple distillation",
        "The liquid is heated, its vapour is cooled in a condenser, and the liquid that collects is the distillate. It separates a liquid from a solid, or liquids whose boiling points are far apart."
      ],
      [
        "Fractional distillation",
        "A fractionating column is added between the flask and the condenser. Vapour condenses and re-evaporates many times in the column, so liquids with close boiling points can be separated."
      ],
      "In both methods the liquid with the lower boiling point comes off first. This is because the vapour from the mixture is richer in the lower-boiling liquid."
    ],
    "remember": "A sharp melting point means pure. Distillation separates liquids by boiling point, and a column is needed when the boiling points are close.",
    "a": {
      "q": "A student measures the melting point of a white solid from a synthesis. It melts from 118°C to 126°C, and the pure compound melts at 130°C. What does this show?",
      "opts": [
        "The solid is impure, as it melts low and over a wide range",
        "The solid is pure, as it melts over a range of temperatures",
        "The solid is pure, as it melts below the known 130°C",
        "The solid is impure, as it melts above the known 130°C"
      ],
      "why": "A pure solid melts sharply, within about 1°C, at its known temperature. This solid melts over 8°C and below 130°C, and both are signs of impurity. Calling it pure because it melts over a range gets it backwards, as a wide range shows impurity.",
      "clue": "Look at the width of the range and where it sits."
    },
    "b": {
      "d": 3,
      "q": "A mixture of two liquids, with boiling points of 78°C and 82°C, must be separated. Which method is suitable, and why?",
      "opts": [
        "Fractional distillation, as the boiling points are close",
        "Simple distillation, as the boiling points are close",
        "Fractional distillation, as the boiling points are far apart",
        "Simple distillation, as both liquids have low boiling points"
      ],
      "why": "Boiling points only 4°C apart need the repeated condensing and evaporating in a fractionating column. Simple distillation works when the boiling points are far apart, so it would give a mixed distillate here.",
      "clue": "What does the column add that simple distillation lacks?"
    }
  },
  "chem-degree-unsaturation": {
    "title": "Degree of unsaturation",
    "card": [
      "Fats and oils are triglycerides: esters of glycerol and three fatty acids. Each fatty acid has a long hydrocarbon chain.",
      "Some of these chains contain C=C double bonds. The more double bonds, the more unsaturated the fat or oil.",
      "Iodine (I2) adds across a C=C double bond, one I2 molecule for each double bond. So the amount of iodine absorbed shows how many double bonds there are.",
      "The iodine number is the mass of iodine, in grams, absorbed by 100 g of fat or oil. With equal masses, the sample that absorbs more iodine has more C=C bonds."
    ],
    "remember": "More iodine absorbed means more C=C double bonds, so a higher degree of unsaturation.",
    "a": {
      "q": "Which fat or oil is the most unsaturated?",
      "opts": [
        "The one with an iodine number of 130",
        "The one with an iodine number of 90",
        "The one with an iodine number of 50",
        "The one with an iodine number of 10"
      ],
      "why": "A higher iodine number means more iodine was absorbed, so there are more C=C double bonds. A low number such as 10 shows few double bonds, so that fat is more saturated.",
      "clue": "Iodine reacts with double bonds."
    },
    "b": {
      "d": 2,
      "q": "Tom tests 100 g samples of oil P, Q and R. They absorb 15 g, 85 g and 60 g of iodine. Which statement is correct?",
      "opts": [
        "Q has more C=C bonds than R",
        "P has more C=C bonds than Q",
        "R has more C=C bonds than Q",
        "P has more C=C bonds than R"
      ],
      "why": "Equal masses were used, so the sample that absorbed more iodine has more double bonds. Q absorbed 85 g and R absorbed 60 g, so Q has more C=C bonds than R. P absorbed the least, so it has the fewest.",
      "clue": "Rank the samples by iodine absorbed."
    }
  },
  "chem-determining-concentration": {
    "title": "Redox titrations",
    "card": [
      "A redox titration adds a solution of known concentration from a burette to a measured volume of another solution. The reaction is a redox reaction, with electrons transferred.",
      "Acidified potassium permanganate, KMnO4, is a strong oxidising agent. It is purple and turns almost colourless when it reacts. The first lasting pale pink shows the end point, so no indicator is needed.",
      "To find a concentration, use the balanced equation. Find moles of the known solution from n = c × V, then use the mole ratio to find moles of the other reactant, then c = n ÷ V.",
      "If amounts of both reactants are given, work out the moles of each and compare them with the mole ratio. The reactant with more than the ratio needs is in excess. The other is the limiting reactant."
    ],
    "remember": "Use n = c × V, then the mole ratio from the equation. Compare moles with the ratio to find the excess.",
    "a": {
      "q": "Why is no indicator needed when titrating iron(II) ions with acidified potassium permanganate?",
      "opts": [
        "The permanganate itself changes colour at the end point",
        "The iron(II) ions change colour at the end point",
        "The acid added changes colour at the end point",
        "A redox reaction never needs an end point"
      ],
      "why": "Permanganate is purple and turns almost colourless as it reacts. When the iron(II) ions run out, the first extra drop leaves a lasting pale pink. The titration still needs an end point, so the option saying a redox reaction never needs one is wrong.",
      "clue": "Look at the colour of the solution in the burette."
    },
    "b": {
      "d": 3,
      "q": "0.020 mol of MnO4- is mixed with 0.080 mol of Fe2+. The equation is MnO4- + 5Fe2+ + 8H+ → Mn2+ + 5Fe3+ + 4H2O. Which reactant is in excess?",
      "opts": [
        "MnO4-, with 0.004 mol left over",
        "MnO4-, with 0.016 mol left over",
        "Fe2+, with 0.020 mol left over",
        "Fe2+, with 0.060 mol left over"
      ],
      "why": "0.020 mol of MnO4- needs 5 × 0.020 = 0.10 mol of Fe2+, but only 0.080 mol is present, so Fe2+ is limiting and MnO4- is in excess. The Fe2+ reacts with 0.080 ÷ 5 = 0.016 mol of MnO4-, leaving 0.020 − 0.016 = 0.004 mol. The 0.016 mol is the amount that reacts, not the amount left over.",
      "clue": "Find how much Fe2+ the MnO4- needs using the 1 to 5 ratio."
    }
  },
  "chem-medicines-from-plants": {
    "title": "Medicines from plants",
    "card": [
      "An active ingredient is the chemical in a plant that has a medical effect. Chemists first take it out of the plant material, then purify it.",
      [
        "Solvent extraction",
        "plant material is mixed with a solvent that dissolves the wanted compound better than it dissolves the rest. The solution is then separated from the solid plant matter. Polar compounds dissolve best in polar solvents, and non-polar compounds in non-polar solvents."
      ],
      [
        "Distillation",
        "a mixture of liquids is heated and the parts boil off at different temperatures. The vapour of the part with the lower boiling point is cooled and collected first. This separates the extracted compound from the solvent or from other liquids."
      ],
      "Extraction gives a mixture, so a further purifying step is usually needed. Testing then shows whether the purified compound has a medical effect."
    ],
    "remember": "Extraction takes a compound out of a plant using a solvent. Distillation purifies it by boiling point.",
    "a": {
      "q": "Why is distillation used after solvent extraction of a plant?",
      "opts": [
        "To separate liquids in the mixture by boiling point",
        "To make the plant material dissolve in the solvent",
        "To separate liquids in the mixture by their polarity",
        "To make the solvent boil at the same temperature"
      ],
      "why": "Extraction gives a mixture of dissolved compounds and solvent. Distillation separates the liquids because they boil at different temperatures. Polarity is what decides how well a compound dissolves during extraction, not how it is separated in distillation.",
      "clue": "Think about what differs between the liquids as they are heated."
    },
    "b": {
      "d": 3,
      "q": "Mia wants to extract a non-polar compound from crushed leaves. Which solvent should she choose, and why?",
      "opts": [
        "A non-polar solvent, as it dissolves the compound better",
        "A polar solvent, as it dissolves the compound better",
        "A non-polar solvent, as it has a higher boiling point",
        "A polar solvent, as it has a lower boiling point"
      ],
      "why": "A non-polar compound dissolves best in a non-polar solvent, so this solvent takes it out of the leaves. A polar solvent would dissolve the compound poorly. Boiling point matters for distillation later, not for choosing how well the solvent extracts.",
      "clue": "Which solvent dissolves the compound best?"
    }
  },
  "chem-functional-groups-medicines": {
    "title": "Functional groups in medicines",
    "card": [
      "A functional group is a small group of atoms in a molecule that mostly decides how the molecule reacts. Molecules with the same functional group react in similar ways.",
      [
        "Hydroxyl",
        "an -OH group on a carbon chain, found in alcohols. It can form hydrogen bonds with water, which can help a medicine dissolve."
      ],
      [
        "Carboxyl",
        "a -COOH group, found in carboxylic acids. It can give away a hydrogen ion, so the molecule can act as an acid."
      ],
      ["Amino", "an -NH2 group, found in amines. It can accept a hydrogen ion, so the molecule can act as a base."]
    ],
    "remember": "Spot the functional group in a medicine's structure to predict how it may react.",
    "a": {
      "q": "A medicine's structure shows a -COOH group. What does this suggest about how the medicine may react?",
      "opts": [
        "It may give away a hydrogen ion, acting as an acid",
        "It may accept a hydrogen ion, acting as a base",
        "It may form hydrogen bonds but cannot react as an acid",
        "It may react in the same way as any alcohol"
      ],
      "why": "A -COOH group is a carboxyl group, and it can give away a hydrogen ion. That makes the molecule able to act as an acid. Accepting a hydrogen ion is what the amino group can do, not the carboxyl group.",
      "clue": "What family of compounds contains a -COOH group?"
    },
    "b": {
      "d": 3,
      "q": "Chemist Priya draws a medicine with an -NH2 group and an -OH group. Which prediction fits both groups?",
      "opts": [
        "It may act as a base and form hydrogen bonds with water",
        "It may act as an acid and form hydrogen bonds with water",
        "It may act as a base but cannot form hydrogen bonds",
        "It may act as an acid but cannot form hydrogen bonds"
      ],
      "why": "The amino group can accept a hydrogen ion, so the molecule may act as a base. The hydroxyl group can form hydrogen bonds with water. On the card, giving away a hydrogen ion is linked to the carboxyl group, which this medicine does not show, so the acid options do not fit these two groups.",
      "clue": "Match each group to what it can do, then combine the two."
    }
  },
  "chem-chirality-medicines": {
    "title": "Chirality in medicines",
    "card": [
      "A carbon atom bonded to four different atoms or groups is called a chiral carbon. If two of the four groups are the same, the carbon is not chiral: its mirror image can be placed on top of it, so it is the same molecule.",
      "A molecule with a chiral carbon exists as two forms that are mirror images. They cannot be placed on top of each other, like a left hand and a right hand. These forms are called enantiomers.",
      "Enantiomers have the same formula and the same bonds, so many of their physical properties match. They can differ in how they act in the body, because body molecules such as enzymes and receptors are also chiral.",
      "One enantiomer of a medicine may work as intended while its mirror image works less well, does nothing, or causes different effects. This is why a medicine may be made or sold as one pure enantiomer."
    ],
    "remember": "Four different groups make a carbon chiral, and its mirror-image forms can act differently in the body.",
    "a": {
      "q": "Which carbon atom in a molecule is chiral?",
      "opts": [
        "One bonded to four different groups",
        "One bonded to two identical groups",
        "One with a double bond to an oxygen atom",
        "One bonded to three hydrogen atoms"
      ],
      "why": "A chiral carbon has four different groups, so its mirror image cannot be placed on top of it. A carbon with two identical groups, such as three hydrogens, has a mirror image that can be placed on top of it, so the two are the same molecule. A carbon in a double bond has only three groups attached.",
      "clue": "Count the groups on the carbon and check whether any repeat."
    },
    "b": {
      "d": 3,
      "q": "A drug company in Geelong makes a medicine as a mix of two enantiomers. Only one enantiomer treats the illness. Why might the other enantiomer act differently in the body?",
      "opts": [
        "Body molecules such as receptors are chiral too",
        "The two enantiomers have different molecular formulas",
        "The two enantiomers have different bonds between atoms",
        "The other enantiomer has no chiral carbon in it"
      ],
      "why": "Enzymes and receptors in the body are chiral, so each enantiomer fits them differently. The enantiomers have the same formula and the same bonds, so a difference in formula or bonding is not the reason. Both forms come from a chiral carbon.",
      "clue": "Think about what the body molecules that the medicine meets are like."
    }
  },
  "chem-enzymes": {
    "title": "Enzymes",
    "card": [
      "Enzymes are proteins that act as catalysts in living things. They speed up a reaction by giving it a lower activation energy, and they are not used up.",
      "Each enzyme has an active site, a small region with a specific shape. Only a substrate that fits the site can bind, and the reaction happens there.",
      "Protein structure has levels. Primary is the sequence of amino acids. Secondary is folding into helices and sheets. Tertiary is the 3D shape of the whole chain. Quaternary is several chains joined together.",
      "Heat or a change in pH can break the bonds that hold the tertiary shape. The active site changes shape, the substrate no longer fits, and the enzyme is denatured."
    ],
    "remember": "An enzyme works only while its active site keeps its shape. Heat and pH change can ruin that shape.",
    "a": {
      "q": "Why does a very high temperature stop an enzyme from working?",
      "opts": [
        "The active site changes shape, so the substrate cannot fit",
        "The amino acid sequence is rearranged into a new order",
        "The enzyme is used up by the reaction it catalyses",
        "The substrate is changed so it can no longer react"
      ],
      "why": "High temperature breaks the bonds that hold the tertiary shape, so the active site no longer matches the substrate. The primary structure is the amino acid sequence, and it is not rearranged by this change.",
      "clue": "Think about what holds the 3D shape in place."
    },
    "b": {
      "d": 3,
      "q": "A digestive enzyme in Priya's stomach works well at very low pH. She tests it in a solution at neutral pH and it stops working. What is the best explanation?",
      "opts": [
        "The change in pH altered the shape of its active site",
        "The enzyme was used up as it catalysed the reaction",
        "The change in pH rearranged its amino acid sequence",
        "The change in pH made the substrate unable to react"
      ],
      "why": "A change in pH can break the bonds that hold the tertiary shape, so the active site no longer fits the substrate. The primary structure is the amino acid sequence, and it is not rearranged by this change.",
      "clue": "Which level of structure sets the shape of the active site?"
    }
  },
  "chem-enzyme-inhibitors": {
    "title": "Enzyme inhibitors",
    "card": [
      "An enzyme's substrate is the molecule it acts on. The substrate binds at a region of the enzyme called the active site.",
      "An enzyme inhibitor is a molecule that slows or stops an enzyme's reaction. Some medicines work this way.",
      "A competitive inhibitor has a shape and charge pattern that fit the active site. It binds there, so the real substrate cannot bind while the inhibitor is in place.",
      "With the enzyme blocked, its reaction slows. If a bacterium or a virus needs that reaction, the medicine can help stop the infection."
    ],
    "remember": "A competitive inhibitor medicine fills the active site, so the substrate cannot bind and the reaction slows.",
    "a": {
      "q": "How does a competitive inhibitor medicine reduce the rate of an enzyme's reaction?",
      "opts": [
        "It binds to the active site and blocks the substrate",
        "It joins the substrate and turns it into a product",
        "It lowers the temperature of the enzyme's surroundings",
        "It adds more substrate for the enzyme to act on"
      ],
      "why": "The inhibitor fits the active site, so the substrate cannot bind there while the inhibitor is in place, and the reaction slows. It does not react with the substrate or make product: it only occupies the site.",
      "clue": "Think about what sits in the active site."
    },
    "b": {
      "d": 2,
      "q": "A drug designed by a chemist in Geelong has a shape that fits the active site of a viral enzyme. What is the most likely effect on that enzyme?",
      "opts": [
        "The viral substrate cannot bind, so the reaction slows",
        "The viral substrate binds faster, so the reaction speeds up",
        "The drug becomes a second active site on the enzyme",
        "The enzyme makes more product from the viral substrate"
      ],
      "why": "A drug that fits the active site occupies it, so the viral substrate cannot bind and the reaction slows. It does not speed the reaction up, because a bound inhibitor blocks the substrate rather than helping it.",
      "clue": "What happens to the substrate when the active site is already occupied?"
    }
  },
  "chem-proton-nmr-spectroscopy": {
    "title": "Proton NMR spectroscopy",
    "card": [
      "Proton NMR looks at the hydrogen atoms in a molecule. Hydrogen atoms in the same surroundings are one environment and give one peak, so the number of peaks is the number of hydrogen environments.",
      "The area under a peak (shown by the integration trace) is proportional to the number of hydrogen atoms in that environment. A peak with twice the area comes from twice as many hydrogens.",
      "The chemical shift of a peak, in ppm, shows what is near the hydrogens. For example, hydrogens near an electronegative atom or a C=O group appear at a different shift from those in a plain alkyl group.",
      "Splitting shows neighbours. A peak splits into n + 1 lines, where n is the number of hydrogens on the carbon atoms adjacent to the carbon holding those hydrogens. Two neighbouring hydrogens give a triplet."
    ],
    "remember": "Peaks count environments, area counts hydrogens, shift shows surroundings, and splitting (n + 1) shows neighbours.",
    "a": {
      "q": "A proton NMR spectrum has three peaks with relative areas 3 : 2 : 1. What does this area ratio tell you?",
      "opts": [
        "The relative number of hydrogens in each environment",
        "The relative number of neighbours for each environment",
        "The relative chemical shift of each environment",
        "The relative number of lines in each split peak"
      ],
      "why": "Peak area is proportional to the number of hydrogens in each environment, so the areas give a ratio of hydrogens, not exact counts. Neighbours and the number of lines come from splitting, and shift is read from the position of the peak, not its area.",
      "clue": "Think about what the integration trace measures."
    },
    "b": {
      "d": 3,
      "q": "In the proton NMR spectrum of a compound, one peak is a triplet. How many hydrogens in total are on the carbon atoms adjacent to the carbon bearing those hydrogens?",
      "opts": ["Two", "Three", "One", "Four"],
      "why": "A peak splits into n + 1 lines, so a triplet (3 lines) means n = 2. A student who picks three has counted the lines instead of using n + 1.",
      "clue": "Lines in the peak = n + 1."
    }
  },
  "chem-chromatography-2": {
    "title": "Chromatography",
    "card": [
      "High performance liquid chromatography (HPLC) separates a mixture. A liquid carries the sample through a column packed with a solid. Each component sticks to the solid to a different extent, so the components move at different speeds.",
      "Retention time is the time a component takes to pass through the column and reach the detector. Under the same conditions, a component has the same retention time each run.",
      "A peak that matches a known standard's retention time is likely that compound. It is not proof, because different compounds can share a retention time.",
      "Peak area grows with the amount of a component. Run standards of known concentration and plot peak area against concentration to make a calibration curve. Then read the unknown's concentration at its peak area."
    ],
    "cardFigs": {
      "4": {
        "kind": "graph",
        "alt": "A calibration curve for HPLC: peak area against concentration for five standards, which lie on a straight line through the origin. An unknown's peak area is read across to the line and down, giving a concentration of about 26 mg/L, between two standards.",
        "x": {"min": 0, "max": 70, "label": "Concentration (mg/L)", "step": 10, "nums": false},
        "y": {"min": 0, "max": 140, "label": "Peak area", "step": 20, "nums": false},
        "items": [
          {"type": "fn", "id": "c", "expr": "2.4x", "domain": [0, 55.00000000000001]},
          {"type": "point", "at": [10, 24.0], "on": ["c"]},
          {"type": "point", "at": [20, 48.0], "on": ["c"]},
          {"type": "point", "at": [30, 72.0], "on": ["c"]},
          {"type": "point", "at": [40, 96.0], "on": ["c"]},
          {"type": "point", "at": [50, 120.0], "on": ["c"]},
          {"type": "guide", "at": [26, 62.4], "xLabel": "26", "yLabel": ""},
          {"type": "point", "at": [26, 62.4], "on": ["c"], "open": true, "label": "unknown", "pos": "above-left"}
        ]
      }
    },
    "remember": "Retention time suggests what a component is. Peak area, read off a calibration curve, shows how much.",
    "a": {
      "q": "An HPLC run of a soft drink shows a peak at the same retention time as a caffeine standard. What can you conclude?",
      "opts": [
        "The peak is likely caffeine",
        "The peak is certainly caffeine and no other compound",
        "The drink contains a known amount of caffeine",
        "The peak is not caffeine unless its area matches"
      ],
      "why": "Under the same conditions a compound has the same retention time, so the peak is likely caffeine. It is not certain, because another compound could share that retention time. The amount needs peak area and a calibration curve, so a matching retention time does not give a known amount.",
      "clue": "Can two compounds have the same retention time?"
    },
    "b": {
      "d": 3,
      "q": "Dev runs four standards of a dye through HPLC and plots peak area against concentration. His unknown sample's peak area falls between two standards. How does he find its concentration?",
      "opts": [
        "Read the concentration at his sample's peak area",
        "Read the concentration at his sample's retention time",
        "Divide his sample's peak area by its retention time",
        "Average the peak areas of the two nearest standards"
      ],
      "why": "Dev's graph links peak area to concentration, so he reads the concentration at his sample's peak area. Retention time is not on the graph, and it suggests which compound a peak is, not how much is present.",
      "clue": "What did Dev put on each axis?"
    }
  },
  "chem-combining-techniques": {
    "title": "Combining techniques",
    "card": [
      "No single technique gives a whole structure. Each one answers a different question about an unknown organic compound, so chemists use them together.",
      "Mass spectrometry gives the mass of the molecular ion, which is the molar mass. Infrared spectroscopy shows which functional groups are present, such as O-H or C=O.",
      "Carbon-13 NMR shows how many different carbon environments there are. Proton NMR shows the hydrogen environments and, by splitting, how many neighbouring hydrogens each one has.",
      "A common method is to find the molar mass, list the functional groups, then fit the NMR data to a structure. Isomers can share a molar mass and functional groups, so NMR often tells them apart."
    ],
    "remember": "Each technique answers a different question. The right structure must fit all of the data.",
    "a": {
      "q": "An unknown compound has a molecular ion at m/z 74 and an infrared peak for C=O. What does each result tell you?",
      "opts": [
        "Molar mass is 74 and a C=O bond is present",
        "Molar mass is 74 and there are 74 carbon environments",
        "Molar mass is 74 and C=O has two hydrogen neighbours",
        "Molar mass is unknown but a C=O bond is present"
      ],
      "why": "The molecular ion peak gives the molar mass, and the infrared peak shows a C=O bond. The number of carbon environments needs carbon-13 NMR, and hydrogen neighbours need proton NMR, so those options are wrong.",
      "clue": "Which technique gives mass, and which gives bonds?"
    },
    "b": {
      "d": 3,
      "q": "Priya has an unknown compound. Its mass spectrum and infrared spectrum suggest a carboxylic acid with molar mass 88. Which extra data would best help her decide between the possible structures that fit these data?",
      "opts": [
        "Proton NMR splitting patterns showing hydrogen neighbours",
        "A second infrared spectrum showing the same O-H peak",
        "The molecular ion mass again from a repeat run",
        "A calibration curve showing its concentration"
      ],
      "why": "Isomers can share the same molar mass and functional groups. Proton NMR splitting shows how the hydrogens are arranged, so it can tell them apart. Repeating the mass or infrared data adds nothing new, and a concentration says nothing about structure.",
      "clue": "Which technique shows how the atoms are arranged, not just what is present?"
    }
  },
  "chem-variables-controlled-experiments": {
    "title": "Variables and controlled experiments",
    "card": [
      [
        "Independent variable",
        "the one factor the experimenter deliberately changes, such as the temperature of a reaction mixture."
      ],
      [
        "Dependent variable",
        "the factor that is measured to see the effect, such as the time taken for a reaction to finish. It may change because of the independent variable."
      ],
      [
        "Controlled variables",
        "all other factors that could affect the result, such as concentration and volume. They are kept the same in every trial."
      ],
      "If only the independent variable changes, any change in the dependent variable can be linked to it. This is how a controlled experiment shows cause and effect."
    ],
    "remember": "Change one thing, measure the result, and keep everything else the same.",
    "a": {
      "q": "A student heats the same acid at different temperatures and times how long a piece of magnesium ribbon takes to dissolve. What is the dependent variable?",
      "opts": [
        "The time taken for the magnesium to dissolve",
        "The temperature of the acid",
        "The mass of the magnesium ribbon",
        "The concentration of the acid"
      ],
      "why": "The dependent variable is what is measured to see the effect, which is the dissolving time. The temperature is tempting, but the student deliberately changes it, so it is the independent variable.",
      "clue": "Which quantity is measured as the outcome, not set by the student?"
    },
    "b": {
      "d": 3,
      "q": "Liam tests how the concentration of hydrochloric acid affects the rate of gas production from marble chips. He uses large chips in the weakest acid and powdered chips in the strongest acid. Why can he not conclude that concentration caused the change in rate?",
      "opts": [
        "Chip size also changed, so it was not controlled",
        "Gas production is not a suitable dependent variable",
        "He changed concentration, which is the dependent variable",
        "He used more than one concentration of acid"
      ],
      "why": "Chip size changed along with concentration, so a difference in rate could come from either. Only the independent variable should change, with other factors controlled. Using several concentrations is needed to test the effect, so it is not a flaw.",
      "clue": "Count how many factors differ between the trials."
    }
  },
  "chem-measurement-quality-unit-4": {
    "title": "Measurement quality",
    "card": [
      [
        "Accuracy and precision",
        "accuracy is how close a measurement is to the true value. Precision is how close repeated measurements are to each other."
      ],
      [
        "Repeatability and reproducibility",
        "repeatability is when the same person, using the same method and equipment, gets close results again. Reproducibility is when a different person or lab gets close results."
      ],
      [
        "Resolution",
        "the smallest change an instrument can show, such as 0.01 g on a balance. A smaller step means a finer resolution."
      ],
      [
        "Validity",
        "an investigation is valid when it measures what it claims to and controls other variables. Good results can still be invalid if the method tests the wrong thing."
      ]
    ],
    "remember": "Close to the true value is accuracy. Close to each other is precision. Same person is repeatable, different person is reproducible.",
    "a": {
      "q": "Four titration results for a hydrochloric acid sample are 20.12, 20.14, 20.13 and 20.12 mL. The true value is 21.50 mL. How can the results be described?",
      "opts": [
        "Precise but not accurate",
        "Accurate but not precise",
        "Both accurate and precise",
        "Neither accurate nor precise"
      ],
      "why": "The results are close to each other, so they are precise. They are all well away from 21.50 mL, so they are not accurate. Closeness of repeats does not show closeness to the true value.",
      "clue": "Compare the results to each other, then to the true value."
    },
    "b": {
      "d": 3,
      "q": "Priya measures the enthalpy of combustion of ethanol with a spirit burner. Her teacher then follows Priya's method and gets results close to hers. What does the teacher's agreement with Priya show?",
      "opts": [
        "Reproducibility of the results",
        "Repeatability of the results",
        "Accuracy of the results",
        "Resolution of the thermometer"
      ],
      "why": "A different person using the method gets close results, which is reproducibility. Repeatability would need the same person to repeat the work, but here the results come from two people. Close agreement alone does not show accuracy, because both could be far from the true value.",
      "clue": "Are the two sets of results from the same person?"
    }
  },
  "chem-reporting-findings": {
    "title": "Reporting findings",
    "card": [
      "A scientific report or poster presents what was done, what was found and what the findings mean. Readers should be able to follow it without the author there.",
      "Use correct scientific terms and symbols. Write the unit with every measured quantity that has one, such as 25.0 mL or 0.100 mol L⁻¹. Some quantities, such as pH, have no unit.",
      "Show data clearly. In a graph, put the independent variable on the horizontal axis and the dependent variable on the vertical axis. Label both axes with quantity and unit.",
      "Link the conclusion to the data. State what the results show for the aim, and what they imply. A claim should reach only as far as the evidence supports, so name the conditions that were tested."
    ],
    "remember": "A good report uses correct terms and units, shows data clearly, and draws conclusions that the data supports.",
    "a": {
      "q": "A student graphs the volume of gas produced against time. Which presentation follows scientific conventions?",
      "opts": [
        "Time on the x-axis, volume on the y-axis, both with units",
        "Volume on the x-axis, time on the y-axis, units in the title",
        "Time on the x-axis, volume on the y-axis, no units shown",
        "Both axes labelled with units, but in a random order"
      ],
      "why": "Time is the independent variable, so it goes on the horizontal axis, and the measured volume goes on the vertical axis. Each axis needs its quantity and unit. Putting units only in the title leaves the axes incomplete.",
      "clue": "Which variable did the student choose, and which did they measure?"
    },
    "b": {
      "d": 3,
      "q": "Priya runs one reaction three times with a catalyst and three times without, at one temperature, keeping all else the same. The catalysed trials are faster. Which conclusion is best supported for her report?",
      "opts": [
        "This catalyst sped up this reaction at that one temperature",
        "This catalyst speeds up all reactions at every temperature",
        "This catalyst is the best one for this reaction at any heat",
        "This catalyst sped up this reaction in only some conditions"
      ],
      "why": "The evidence covers one catalyst, one reaction and one temperature, so the claim should reach only as far as those conditions. Claiming all reactions or every temperature goes beyond the data. Saying it worked only in some conditions is not supported either, as she tested one set of conditions and the catalysed trials were faster.",
      "clue": "What did the data actually test, and how far can the claim reach?"
    }
  }
};
