/* The sci bank: points made by the content pipeline. Written by python3 content/pipeline.py publish.
   Do not edit it by hand: change a point through the review page and publish again (content/README.md).
   Each point has the same parts as in econ-points.js. In every question the correct answer is opts[0]. */
MADE_BANKS.sci = {
  "sci-dna-genes-chromosomes": {
    "title": "DNA, genes and chromosomes",
    "card": [
      [
        "DNA",
        "a long molecule that carries the instructions for building and running a living thing. It is shaped like a twisted ladder, called a double helix."
      ],
      [
        "Gene",
        "a section of DNA that codes for a trait, such as a protein that affects eye colour. One DNA molecule holds many genes."
      ],
      [
        "Chromosome",
        "one long DNA molecule wound tightly around proteins so it fits inside the nucleus. Human body cells have 46 chromosomes, in 23 pairs."
      ],
      "So a gene is only a small part of a DNA molecule. A chromosome is that whole DNA molecule coiled around proteins, so it carries many genes."
    ],
    "remember": "A gene is a small part of DNA. A chromosome is a whole DNA molecule, coiled up and holding many genes.",
    "a": {
      "q": "Which statement best describes a gene?",
      "opts": [
        "A section of DNA that codes for a trait",
        "A tightly coiled structure made of many chromosomes",
        "A cell part that stores DNA in the nucleus",
        "A whole DNA molecule that is wound around proteins"
      ],
      "why": "A gene is one section of a DNA molecule and codes for a trait. A whole DNA molecule wound around proteins is a chromosome, which holds many genes, so that option describes the wrong structure.",
      "clue": "Think about which one is only a small part of DNA."
    },
    "b": {
      "d": 3,
      "q": "A scientist studies one human body cell and its nucleus. Which statement about what she finds is correct?",
      "opts": [
        "Each chromosome is a coiled DNA molecule with many genes",
        "Each gene is a coiled DNA molecule with many chromosomes",
        "Each chromosome is a single gene made of coiled DNA",
        "Each gene is made of many DNA molecules and chromosomes"
      ],
      "why": "A chromosome is one whole DNA molecule wound tightly around proteins, and it carries many genes along its length. A chromosome is not a single gene, because a gene is only one small section of that DNA.",
      "clue": "Ask which one is a part of the other."
    }
  },
  "sci-mitosis-meiosis": {
    "title": "Mitosis and meiosis",
    "card": [
      [
        "Mitosis",
        "one cell divides once to make two cells. Each has the same chromosomes and genes as the parent cell. It is used for growth and to repair damaged tissue."
      ],
      [
        "Meiosis",
        "one cell divides twice to make gametes, which are sex cells with half the usual number of chromosomes. In males it makes four sperm. In females it makes one egg, plus tiny cells that break down."
      ],
      "During meiosis, the chromosomes are shuffled and the genes on them are mixed. So each gamete gets a different mix of genes, and offspring differ from their parents and from each other.",
      "When a sperm and an egg join, the full chromosome number is restored. Humans have 46 chromosomes in body cells and 23 in each gamete."
    ],
    "remember": "Mitosis copies a cell for growth and repair. Meiosis halves and mixes it to make gametes.",
    "a": {
      "q": "A skin cell on Jai's knee divides to heal a graze. Which process makes the new skin cells, and how do they compare with the parent cell?",
      "opts": [
        "Mitosis, and they are identical to it",
        "Meiosis, and they are identical to it",
        "Mitosis, and they have half its chromosomes",
        "Meiosis, and they have half its chromosomes"
      ],
      "why": "Repairing tissue is done by mitosis, which makes cells identical to the parent cell. Meiosis makes gametes with half the chromosomes, but skin repair does not need gametes.",
      "clue": "Think about which process is used to repair tissue."
    },
    "b": {
      "d": 3,
      "q": "A human egg cell is made in an ovary. How many chromosomes does it have, and why can it differ from the mother's other egg cells?",
      "opts": [
        "23, because meiosis halves the number and mixes genes",
        "46, because meiosis copies the cell and keeps its genes",
        "23, because mitosis halves the number and mixes genes",
        "46, because mitosis copies the cell and mixes its genes"
      ],
      "why": "Egg cells are gametes, made by meiosis. Meiosis halves the chromosome number to 23 and mixes the genes, so each egg gets a different mix. Mitosis keeps the number at 46 and makes identical cells, so it does not make gametes.",
      "clue": "Which process makes gametes, and what does it do to the number?"
    }
  },
  "sci-alleles-genotype-phenotype": {
    "title": "Alleles, genotype and phenotype",
    "card": [
      ["Allele", "a version of a gene. An organism has two alleles for each gene, one from each parent."],
      ["Genotype", "the pair of alleles an organism has, written as letters such as TT, Tt or tt."],
      ["Phenotype", "the trait that can be seen or measured, such as tall or short."],
      "A dominant allele (capital letter) shows when it is present. A recessive allele (small letter) shows only when both alleles are recessive. So TT and Tt both give the dominant trait, and only tt gives the recessive trait."
    ],
    "remember": "Genotype is the alleles you carry. Phenotype is the trait you show.",
    "a": {
      "q": "A pea plant has the genotype Tt, where T (tall) is dominant to t (short). What is its phenotype?",
      "opts": [
        "Tall, because T is dominant",
        "Short, because t is the second allele",
        "Medium height, because it has both alleles",
        "Tall, because it has two copies of T"
      ],
      "why": "The dominant allele T masks the recessive allele t, so the plant is tall. A medium height is wrong because one allele masks the other here, and the plant has only one T, not two.",
      "clue": "Which allele shows when both are present?"
    },
    "b": {
      "d": 3,
      "q": "In guinea pigs, black fur (B) is dominant to white fur (b). Zoe has a white guinea pig and a black guinea pig. Which statement must be true?",
      "opts": [
        "The white one has the genotype bb",
        "The black one has the genotype BB",
        "The white one has the genotype Bb",
        "The black one has the genotype Bb"
      ],
      "why": "White is the recessive trait, so it shows only when both alleles are recessive: bb. The black one could be BB or Bb, because both genotypes give the same phenotype, so neither can be named from its fur alone.",
      "clue": "Which trait needs two recessive alleles to show?"
    }
  },
  "sci-pedigrees-sex-linked-traits": {
    "title": "Pedigrees and sex-linked traits",
    "card": [
      "A pedigree chart traces a trait through a family, using squares for males and circles for females. Shaded shapes show people with the trait, and lines link parents to their children.",
      "Sex-linked genes sit on the X chromosome. Females have two X chromosomes (XX), and males have one X and one Y (XY).",
      "A son gets his X from his mother and his Y from his father. A daughter gets one X from each parent.",
      "A male has only one X, so one recessive allele on it shows as the trait. A female needs it on both X chromosomes, so traits such as red-green colour blindness show more in males."
    ],
    "remember": "A male has one X, so one recessive allele on it shows. A female needs two.",
    "a": {
      "q": "Which statement best explains how an X-linked recessive trait comes to show more often in males?",
      "opts": [
        "Males have one X, so one recessive allele shows",
        "Males have two X chromosomes, so the allele is doubled",
        "Females have a Y chromosome that hides the allele",
        "The gene sits on the Y chromosome, which only males have"
      ],
      "why": "A male has only one X chromosome, so there is no second allele to mask a recessive one. A female has two X chromosomes, so she needs the recessive allele on both. The gene is on the X, not the Y.",
      "clue": "Think about how many X chromosomes each sex has."
    },
    "b": {
      "d": 3,
      "q": "In a pedigree, a shaded square and a shaded circle are parents. The trait is X-linked recessive. Could they have an unshaded son?",
      "opts": [
        "No, as every X the mother can pass on carries the allele",
        "Yes, as the son gets his X chromosome from his father",
        "Yes, as the son could get a Y chromosome from his mother",
        "No, as the father passes the allele to his son on the Y"
      ],
      "why": "A shaded mother has the recessive allele on both X chromosomes, so every X she passes on carries it. A son gets his X from his mother, so every son would show the trait. The father gives his son a Y, not an X, so the father does not pass this allele to sons.",
      "clue": "A son gets his X from one parent only. Which one?"
    }
  },
  "sci-mutations": {
    "title": "Mutations",
    "card": [
      "A mutation is a change in the DNA sequence of a gene or chromosome. It can happen when DNA is copied before a cell divides and a mistake is made.",
      "Radiation, such as ultraviolet light, and some chemicals can also damage DNA and cause mutations.",
      "Most mutations have no effect on the organism. Some change a trait, and a few cause a genetic disorder, such as cystic fibrosis.",
      "A mutation can be passed to offspring only if it is in a gamete. Mutations in other body cells, such as skin cells, are not inherited."
    ],
    "remember": "A mutation is a change in DNA. Most do nothing, and only those in gametes can be inherited.",
    "a": {
      "q": "Which of these is a mutation?",
      "opts": [
        "A change in the DNA sequence of a gene",
        "A new mix of alleles inherited from two parents",
        "A change in the number of cells in the body",
        "A change in a trait caused by diet or exercise"
      ],
      "why": "A mutation is a change in the DNA itself. A new mix of alleles from two parents is normal inheritance, and none of the DNA has changed.",
      "clue": "Look for a change to the DNA itself."
    },
    "b": {
      "d": 3,
      "q": "Tom gets a mutation in a skin cell from too much sun, and later has a child. What is most likely true of the mutation?",
      "opts": [
        "It is not passed on, as it is not in a gamete",
        "It is passed on, as all mutations are inherited",
        "It is passed on, as sunlight changes every cell",
        "It is not passed on, as sunlight cannot cause mutations"
      ],
      "why": "Only mutations in gametes can be passed to offspring. A skin cell is not a gamete, so the child does not inherit it. Ultraviolet light can cause mutations, so the last option is wrong.",
      "clue": "Does the mutation reach the cells that can make a child?"
    }
  },
  "sci-natural-selection": {
    "title": "Natural selection",
    "card": [
      "Individuals in a population vary. Some of this variation is inherited, which means it is passed from parents to offspring in their genes.",
      "More offspring are born than can survive. Food, water and space are limited, so many die before they can breed.",
      "An inherited trait that helps an individual survive in its environment makes it more likely to live and breed. It then passes the trait on to more offspring.",
      "Over many generations, the helpful trait becomes more common in the population. This process is natural selection."
    ],
    "remember": "Helpful inherited traits mean more survivors breed, so the trait spreads over generations.",
    "a": {
      "q": "Which statement best describes how natural selection changes a population?",
      "opts": [
        "Inherited helpful traits give more offspring, so they spread",
        "Helpful traits appear when they are needed, then pass on",
        "Helpful traits let individuals live longer and change form",
        "Individuals that try harder to survive pass on their effort"
      ],
      "why": "Natural selection works on inherited variation. Those with helpful traits leave more offspring, so the trait becomes more common. It is wrong to say traits appear when needed, because the variation is already there and inherited.",
      "clue": "Think about who has more offspring, and what the offspring inherit."
    },
    "b": {
      "d": 3,
      "q": "A beetle population on a farm has green and brown beetles. Birds eat more green beetles than brown ones, and colour is inherited. What is most likely after many generations?",
      "opts": [
        "Brown beetles will make up more of the population",
        "Green beetles will turn brown during their lives",
        "All beetles will be brown after one generation",
        "Brown beetles will be born because the beetles need them"
      ],
      "why": "Brown beetles are eaten less, so more of them survive and breed. They pass on their colour, so brown becomes more common over generations. Individual beetles do not change colour to suit their need, and the change is gradual, not instant.",
      "clue": "Which beetles are more likely to survive and breed, and what do their young inherit?"
    }
  },
  "sci-selection-pressures-adaptation": {
    "title": "Selection pressures and adaptation",
    "card": [
      "A selection pressure is something in the environment that affects whether individuals survive and breed. Predators, disease, drought and lack of food are examples.",
      "A selection pressure favours some variations over others. Individuals with a helpful trait are more likely to survive and breed, so they pass on that trait.",
      "Over many generations, the helpful trait becomes more common. A trait that suits an organism to its environment is called an adaptation.",
      "Antibiotic resistance is an example. When bacteria are exposed to an antibiotic, the few that already resist it survive and multiply. Their offspring inherit the resistance, so resistant bacteria become common."
    ],
    "remember": "The environment favours helpful variations, and those traits become common as adaptations.",
    "a": {
      "q": "A drought hits a region and seeds with thick, tough coats are more likely to survive. What is the drought in this case?",
      "opts": ["A selection pressure", "An adaptation", "A mutation", "A variation in the seeds"],
      "why": "The drought is a feature of the environment that affects which seeds survive, so it is a selection pressure. The tough coat is the adaptation, which is the tempting wrong answer because it is the trait that helps survival.",
      "clue": "Is the drought part of the environment or a trait of the seeds?"
    },
    "b": {
      "d": 3,
      "q": "A hospital treats an infection with an antibiotic. Most bacteria die, but a few that already resisted it survive. Why do resistant bacteria become common?",
      "opts": [
        "Resistant bacteria survive and breed, passing on resistance",
        "Bacteria change themselves to resist the antibiotic",
        "Each bacterium slowly gets used to the antibiotic",
        "The antibiotic makes every bacterium resistant at once"
      ],
      "why": "The antibiotic is a selection pressure that favours bacteria already able to resist it. They survive, multiply and pass on the trait. Bacteria do not choose to change in response to the antibiotic, which is the tempting wrong answer.",
      "clue": "Which bacteria were able to resist before the antibiotic was used?"
    }
  },
  "sci-new-species-form": {
    "title": "How new species form",
    "card": [
      "A species is a group of living things that can breed together and have fertile young. Populations of one species can be split apart by a barrier, such as the sea around an island. This is called isolation.",
      "Isolated populations do not mix their genes. Each one faces its own conditions, such as different food, climate or predators, so different traits are favoured in each.",
      "Random mutations (changes in DNA) also happen separately in each population. Natural selection can keep helpful ones in one population but not in the other.",
      "Over many generations the populations become so different that they can no longer breed together to have fertile young. They are now separate species."
    ],
    "remember": "Isolation, different pressures and mutations, then no more breeding together: new species.",
    "a": {
      "q": "A few finches blown to a remote island form a new population. Which change shows they have become a new species?",
      "opts": [
        "They can no longer have fertile young with mainland finches",
        "Their beaks grow larger than those of mainland finches",
        "They start to eat a different food from mainland finches",
        "Their DNA gains a few mutations the mainland finches lack"
      ],
      "why": "A species is a group that can breed together and have fertile young, so a new species exists once that is no longer possible. Bigger beaks, new food or new mutations are changes along the way, but the two groups could still breed if they met.",
      "clue": "Think about the definition of a species."
    },
    "b": {
      "d": 3,
      "q": "Two populations of one frog species are split by a new desert. After thousands of years they meet again and cannot produce fertile young. What best explains this?",
      "opts": [
        "Separate pressures and mutations changed each population",
        "The desert caused the same mutations in both populations",
        "The frogs chose not to mate with each other",
        "Both populations kept mixing their genes across the desert"
      ],
      "why": "While apart, each population faced its own conditions and gained its own mutations, so they slowly became different. Mutations are random, so the desert did not cause the same ones in both. Mixing genes would have kept them one species.",
      "clue": "What happens to the genes of two populations kept apart?"
    }
  },
  "sci-evidence-evolution": {
    "title": "Evidence for evolution",
    "card": [
      [
        "Fossils",
        "Fossils are preserved remains or traces of past life. Deeper rock layers are usually older, so fossils in layers show how living things changed over time."
      ],
      [
        "Bone structure",
        "Some animals have similar bone patterns in limbs that do different jobs, such as a human arm, a bat wing and a whale flipper. This points to a shared ancestor."
      ],
      [
        "DNA",
        "DNA is the code that carries an organism's instructions. Species with more similar DNA are usually more closely related, and share a more recent ancestor."
      ],
      [
        "Where species live",
        "Species found on Earth are spread in patterns that match their ancestry. Island species often resemble those on the nearest mainland, which suggests they descended from them."
      ]
    ],
    "remember": "Fossils, bones, DNA and where species live all point to shared ancestors.",
    "a": {
      "q": "Scientists find that two species have very similar DNA. What does this most suggest?",
      "opts": [
        "They share a fairly recent common ancestor",
        "They live in the same habitat today",
        "They have exactly the same bone structures",
        "One species evolved from the other directly"
      ],
      "why": "More similar DNA usually means a more recent shared ancestor. It does not show that one species came from the other, because both can descend from a common ancestor.",
      "clue": "Think about how closely related species share ancestors."
    },
    "b": {
      "d": 3,
      "q": "A fossil hunter finds a simple fossil in a deep rock layer and a more complex relative in a higher layer. What does this best show?",
      "opts": [
        "Living things in this group changed over time",
        "Both organisms lived at exactly the same time",
        "The higher fossil must have evolved from the lower one",
        "The deeper rock layer formed after the higher one"
      ],
      "why": "Deeper layers are usually older, so the fossils show a change in the group over time. The fossils alone do not prove that the higher one descended directly from the lower one.",
      "clue": "Which layer is usually older, and what does a change between layers show?"
    }
  },
  "sci-artificial-selection": {
    "title": "Artificial selection",
    "card": [
      "In artificial selection, people choose which plants or animals breed. They pick individuals with traits they want, such as a calm nature or large grains.",
      "Individuals in a population vary, and some of this variation is inherited. Offspring of the chosen parents are more likely to have the wanted trait.",
      "If this choice is repeated over many generations, the wanted trait becomes more common in the population. Dog breeds and high-yield wheat were produced this way.",
      "The process is the same as natural selection, except that people, not the environment, decide which individuals breed."
    ],
    "remember": "In artificial selection, people choose the parents, and the chosen traits become more common over generations.",
    "a": {
      "q": "A farmer in Western Australia sows only seed from her highest-yielding wheat plants each year. What is she doing?",
      "opts": [
        "Choosing which plants breed to make a wanted trait common",
        "Causing wheat plants to mutate so that they grow more grain",
        "Letting the environment decide which wheat plants survive",
        "Changing the traits of each plant by giving it better care"
      ],
      "why": "She picks which plants breed, so high yield becomes more common over generations. Better care would not change the seed's inherited traits, and here the farmer, not the environment, decides which plants breed.",
      "clue": "Who decides which plants pass on their seed?"
    },
    "b": {
      "d": 3,
      "q": "Wool from some of Tomas's sheep in Tasmania is finer than the rest. He breeds only from those sheep for many years. What is the likely result?",
      "opts": [
        "Fine wool becomes more common in his flock",
        "Each sheep grows finer wool as it ages",
        "Fine wool becomes less common in his flock",
        "His flock stops varying in any trait at all"
      ],
      "why": "Only sheep with fine wool breed, and the trait is inherited, so more lambs have it and it becomes more common. A sheep does not change its own traits to suit the breeder, and variation in other traits can remain.",
      "clue": "Think about which sheep have lambs, and what lambs inherit."
    }
  },
  "sci-stars-galaxies-universe": {
    "title": "Stars, galaxies and the universe",
    "card": [
      "A star is a huge ball of hot gas that gives off its own light. The Sun is a star.",
      "Stars are grouped in galaxies, along with gas and dust, held together by gravity. Our galaxy is the Milky Way, and it holds hundreds of billions of stars.",
      "The universe is everything that exists: all galaxies, stars, planets, gas and space. It holds billions of galaxies.",
      "A light-year is a distance, not a time. It is how far light travels in one year, which is about 9.5 trillion kilometres."
    ],
    "remember": "Stars are grouped in galaxies, and the universe holds billions of galaxies. Light-years measure the huge distances.",
    "a": {
      "q": "What does a light-year measure?",
      "opts": [
        "The distance light travels in one year",
        "The time light takes to leave a star",
        "The age of a star in years",
        "The brightness of a star over one year"
      ],
      "why": "A light-year is a distance: how far light travels in a year. It is easy to think it is a time because it has the word year in it, but it is used for the huge distances between stars and galaxies.",
      "clue": "Think about what light does during that year."
    },
    "b": {
      "d": 2,
      "q": "Which list puts these in order from smallest to largest?",
      "opts": ["Star, galaxy, universe", "Galaxy, star, universe", "Star, universe, galaxy", "Universe, galaxy, star"],
      "why": "Stars are grouped in galaxies, and the universe holds billions of galaxies. So a star is the smallest and the universe is the largest. A galaxy is not smaller than a star, because one galaxy holds many stars.",
      "clue": "Think about what each one holds."
    }
  },
  "sci-big-bang-theory": {
    "title": "The big bang theory",
    "card": [
      "The big bang theory says the universe began about 13.8 billion years ago. It started from an extremely hot, dense state.",
      "The big bang was not an explosion in a place that already existed. Space itself has been expanding since then.",
      "As the universe expanded, it cooled. Once it was cool enough, atoms could form.",
      "Over a very long time, gravity pulled gas together into stars and galaxies."
    ],
    "remember": "The universe began hot and dense, then expanded and cooled, which let atoms, stars and galaxies form.",
    "a": {
      "q": "Which statement best describes the universe soon after the big bang?",
      "opts": [
        "It was extremely hot and dense",
        "It was cold and filled with stars",
        "It was cool and made of galaxies",
        "It was empty space with no heat"
      ],
      "why": "The theory says the universe began in an extremely hot, dense state. Stars and galaxies came much later, after the universe had expanded and cooled.",
      "clue": "Think about the state the universe started in."
    },
    "b": {
      "d": 3,
      "q": "Dev says atoms formed in the universe before it had cooled at all. Using the big bang theory, what is wrong with his idea?",
      "opts": [
        "Atoms could not form until the universe had cooled enough",
        "Atoms formed only after the first galaxies had formed",
        "Atoms formed because the universe stopped expanding",
        "Atoms were already there before the big bang began"
      ],
      "why": "The theory says the universe cooled as it expanded, and atoms could form once it was cool enough. Galaxies formed later still, when gravity pulled gas together, so atoms did not need galaxies first.",
      "clue": "Which came first, cooling or atoms?"
    }
  },
  "sci-red-shift-expanding-universe": {
    "title": "Red shift and an expanding universe",
    "card": [
      "Light travels as waves. Red light has a longer wavelength than blue light.",
      "Light from distant galaxies is stretched to longer, redder wavelengths. This is called red shift.",
      "Edwin Hubble found that the farther away a galaxy is, the more its light is red shifted. This means farther galaxies move away faster.",
      "Galaxies moving away from us in every direction shows that the universe is expanding."
    ],
    "remember": "Red shift shows galaxies moving away, and farther ones move faster, so the universe is expanding.",
    "a": {
      "q": "What happens to the light from a galaxy that is moving away from us?",
      "opts": [
        "Its wavelengths are stretched towards red",
        "Its wavelengths are squeezed towards blue",
        "Its light becomes brighter but keeps its colour",
        "Its light changes colour only if it is close"
      ],
      "why": "Light from a galaxy moving away is stretched to longer, redder wavelengths. Squeezing towards blue would be the opposite, and it does not depend on the galaxy being close.",
      "clue": "Red light has a longer wavelength."
    },
    "b": {
      "d": 2,
      "q": "Galaxy X shows a larger red shift than Galaxy Y. What does Hubble's finding suggest about Galaxy X?",
      "opts": [
        "It is farther away and moving away faster",
        "It is closer and moving away faster",
        "It is farther away and moving away slower",
        "It is closer and moving away slower"
      ],
      "why": "Hubble found that more red shift goes with greater distance and greater speed of moving away. A closer galaxy would show less red shift, not more.",
      "clue": "More red shift means more distance."
    }
  },
  "sci-cosmic-microwave-background-radiation": {
    "title": "Cosmic microwave background radiation",
    "card": [
      "Cosmic microwave background radiation (CMB) is a faint glow of microwaves. It reaches Earth from every direction in space.",
      "The CMB is leftover heat from the early universe. This heat was once much more intense.",
      "As the universe expanded, this radiation was stretched out and cooled. Today it is in the microwave part of the spectrum.",
      "The big bang theory says the early universe was hot and dense, and that it has been cooling since. The CMB matches this, so it supports the theory."
    ],
    "remember": "The CMB is cooled leftover heat from the early universe, and it supports the big bang theory.",
    "a": {
      "q": "What is the cosmic microwave background radiation?",
      "opts": [
        "Cooled leftover heat from the early universe",
        "Microwaves sent out by a single bright star",
        "Radio signals made by the Milky Way's centre",
        "Heat from stars that formed in recent times"
      ],
      "why": "The CMB is the cooled leftover heat of the early universe, and it reaches Earth from every direction. It does not come from one star or one galaxy, because it is spread across the whole sky.",
      "clue": "It comes from all directions, not one place."
    },
    "b": {
      "d": 3,
      "q": "Why do scientists say the CMB supports the big bang theory?",
      "opts": [
        "It matches a hot early universe that has cooled",
        "It shows that all stars are the same age",
        "It proves that galaxies are moving apart",
        "It comes from the one place where the bang happened"
      ],
      "why": "The big bang theory predicts a hot early universe that has cooled as it expanded, and the CMB is the glow left from that. It does not come from one place, because it arrives from every direction in space.",
      "clue": "Think about what the glow says about the early universe."
    }
  },
  "sci-reading-starlight-with-spectra": {
    "title": "Reading starlight with spectra",
    "card": [
      "A spectrum is starlight spread out into its colours, like light through a prism. Dark or bright lines can appear in it.",
      "Each element makes its own pattern of lines, like a fingerprint. Matching the lines in a star's spectrum to these patterns shows which elements the star contains.",
      "The lines of a star can be shifted compared with the same lines measured in a laboratory. The size and direction of the shift shows how the star is moving.",
      "This lets astronomers learn what a star is made of and how it is moving, even though it is too far away to visit."
    ],
    "remember": "The pattern of lines in a star's spectrum shows what it is made of, and a shift in them shows how it moves.",
    "a": {
      "q": "What does the pattern of lines in a star's spectrum tell astronomers?",
      "opts": [
        "Which elements the star is made of",
        "How many planets the star has",
        "How old the star's light is",
        "What colour the star's planets are"
      ],
      "why": "Each element gives its own pattern of lines, so the pattern shows which elements are in the star. The lines do not show planets, because they come from the elements in the star's light.",
      "clue": "Think of the lines as a fingerprint."
    },
    "b": {
      "d": 3,
      "q": "Astronomer Priya finds that a star's lines match those of hydrogen and helium, but sit in shifted positions. What can she conclude?",
      "opts": [
        "It contains hydrogen and helium, and is moving",
        "It contains only hydrogen, and is not moving",
        "It contains neither element, and is moving",
        "It contains hydrogen and helium, and is not moving"
      ],
      "why": "The matching patterns show hydrogen and helium are present. The shifted position of the lines shows the star is moving. The shift does not change which elements the lines point to.",
      "clue": "One feature shows content, the other shows motion."
    }
  },
  "sci-earth-s-energy-balance": {
    "title": "Earth's energy balance",
    "card": [
      "Earth absorbs energy from the sun, mostly as light. The land, oceans and air warm up as they take it in.",
      "Earth also radiates heat back out to space. When energy in equals energy out, the average temperature stays steady.",
      "Greenhouse gases, such as carbon dioxide and methane, trap some of the outgoing heat in the atmosphere. This is the greenhouse effect, and it keeps Earth warm enough for life.",
      "If greenhouse gases rise, more heat is kept than lost. The extra energy builds up and the planet warms."
    ],
    "remember": "Warming happens when Earth keeps more energy than it loses.",
    "a": {
      "q": "What happens to Earth's average temperature when it keeps more energy than it loses to space?",
      "opts": [
        "It rises as the extra energy builds up",
        "It stays steady as energy is shared out",
        "It falls as the extra energy is used up",
        "It rises only until the sun's output drops"
      ],
      "why": "Extra energy that is not lost to space builds up in the land, oceans and air, so the average temperature rises. It stays steady only when energy in equals energy out.",
      "clue": "Think about what happens to energy that cannot escape."
    },
    "b": {
      "d": 3,
      "q": "Over many years, a country burns large amounts of coal and the carbon dioxide in the air rises. Which change to Earth's energy balance does this cause?",
      "opts": [
        "More outgoing heat is trapped, so less escapes to space",
        "The sun sends more energy, so more is absorbed",
        "Less outgoing heat is trapped, so more escapes to space",
        "The sun sends less energy, so less is absorbed"
      ],
      "why": "Carbon dioxide is a greenhouse gas, so more of it traps more of the outgoing heat. Less escapes to space and the planet warms. The sun's output is not what changes here.",
      "clue": "Greenhouse gases act on heat leaving Earth, not on sunlight arriving."
    }
  },
  "sci-ocean-currents-climate": {
    "title": "Ocean currents and climate",
    "card": [
      "An ocean current is a large flow of seawater that moves in a steady pattern. Some currents run near the surface and some run deep.",
      "Surface currents are mainly driven by wind. Deep currents are driven by differences in water temperature and saltiness, which change how dense the water is. Cold, salty water is denser and sinks.",
      "Currents carry heat around the globe. Warm water flows from the tropics towards the poles, and cold water flows back towards the equator.",
      "This moves heat to places that would otherwise be cooler or warmer. Currents therefore shape the climate of nearby coasts, such as how warm or cool they are."
    ],
    "remember": "Currents move heat around Earth, so they help shape regional climates.",
    "a": {
      "q": "Which pair of things drives deep ocean currents?",
      "opts": [
        "Differences in temperature and saltiness",
        "Differences in wave height and tide times",
        "Differences in sea depth and fish numbers",
        "Differences in cloud cover and rainfall"
      ],
      "why": "Temperature and saltiness change how dense seawater is, and denser water sinks and flows. Wind mainly drives surface currents, not deep ones.",
      "clue": "Both change how dense the water is."
    },
    "b": {
      "d": 2,
      "q": "A warm current flows along the coast of a town in the far south of a continent. How is it likely to affect the town's climate?",
      "opts": [
        "It carries heat from warmer places, so the coast is milder",
        "It carries heat to the town, so the coast is much colder",
        "It adds saltiness to the air, so the coast is much drier",
        "It stops wind reaching the coast, so the coast is calmer"
      ],
      "why": "A warm current brings heat from warmer waters, so nearby coasts are milder than places at the same distance from the equator without it. It does not cool the coast.",
      "clue": "Ask where the current's heat came from."
    }
  },
  "sci-evidence-climate-change": {
    "title": "Evidence of climate change",
    "card": [
      "Climate is the pattern of weather in a place over many years. Scientists look for long-term trends in measurements, not one hot day or one cold year.",
      "Air and ocean temperatures have risen over the past century. Warmer water also expands, and melting land ice adds water to the sea, so sea levels are rising.",
      "Sea ice and glaciers are shrinking. Satellite images and measurements taken over many years show the loss.",
      "Many species are moving to cooler places as their old homes warm. Some move higher up mountains, where the air is cooler, and some move further from the equator."
    ],
    "remember": "Many long-term measurements point the same way: the climate is changing.",
    "a": {
      "q": "Which observation is the best evidence that the climate is changing?",
      "opts": [
        "Average ocean temperatures have risen over many decades",
        "Sydney had one very hot week last summer",
        "A cold winter hit Hobart this year",
        "A storm flooded a town in Queensland last month"
      ],
      "why": "Climate is a long-term pattern, so a trend over many decades is strong evidence. One hot week, one cold winter or one storm is weather, and a single event cannot show a long-term change.",
      "clue": "Climate is about patterns over many years."
    },
    "b": {
      "d": 3,
      "q": "Alpine plants on a mountain in Tasmania now grow 100 metres higher than they did 50 years ago. What is the most likely reason?",
      "opts": [
        "Their lower slopes have become too warm for them",
        "Their lower slopes have become too cold for them",
        "Growing glaciers have covered their lower slopes",
        "Cooler summers now let them grow further uphill"
      ],
      "why": "Air higher up a mountain is cooler, so plants that need cold conditions shift uphill as the lower slopes warm. Saying the lower slopes became too cold reverses the cause: cooling would let the plants spread downhill, not push them up. Glaciers are shrinking and temperatures are rising, so the other two options do not fit the evidence.",
      "clue": "Think about which way temperatures have moved and where cooler air is found."
    }
  },
  "sci-reducing-adapting-climate-change": {
    "title": "Reducing and adapting to climate change",
    "card": [
      [
        "Mitigation",
        "actions that cut greenhouse gas emissions or remove these gases from the air, so that less warming happens. Examples are using solar and wind power instead of burning coal, and planting trees."
      ],
      [
        "Adaptation",
        "actions that prepare for changes already happening or expected. Examples are building sea walls and growing heat-tolerant crops."
      ],
      "Mitigation tackles the cause of the problem. Adaptation deals with the effects.",
      "Communities, businesses and governments can use both at the same time."
    ],
    "remember": "Mitigation limits warming by reducing greenhouse gases. Adaptation prepares for the effects.",
    "a": {
      "q": "A town replaces its coal-fired power station with a wind farm. What is this an example of?",
      "opts": [
        "Mitigation, because it cuts greenhouse gas emissions",
        "Adaptation, because it prepares for a warmer climate",
        "Adaptation, because it uses a new technology",
        "Mitigation, because it protects the town from floods"
      ],
      "why": "Wind power produces far fewer greenhouse gases than burning coal, so it cuts emissions and is mitigation. It does not prepare the town for changes, so it is not adaptation.",
      "clue": "Does it cut emissions or prepare for effects?"
    },
    "b": {
      "d": 2,
      "q": "A farming group in Western Australia switches to wheat varieties that cope with hotter, drier seasons. What is this?",
      "opts": [
        "Adaptation, because it prepares for changed conditions",
        "Mitigation, because it lowers the farm's emissions",
        "Mitigation, because it limits future warming",
        "Adaptation, because it stops greenhouse gases rising"
      ],
      "why": "The new wheat helps farmers cope with heat and dry seasons, so it is adaptation. It does not cut emissions or remove greenhouse gases, so it does not limit warming, which is what mitigation aims to do.",
      "clue": "Is the change helping farmers cope or reducing greenhouse gases?"
    }
  },
  "sci-speed-velocity-acceleration": {
    "title": "Speed, velocity and acceleration",
    "card": [
      ["Speed", "how far an object travels in a given time. Speed = distance ÷ time, so 300 m in 60 s is 5 m/s."],
      [
        "Velocity",
        "speed in a given direction, such as 5 m/s north. Speed has a size only. Velocity has a size and a direction, and both use the unit m/s."
      ],
      [
        "Acceleration",
        "how quickly velocity changes. Acceleration = change in velocity ÷ time taken, measured in m/s²."
      ],
      "Velocity changes if the speed changes, the direction changes, or both. So an object moving at a steady speed around a bend is accelerating."
    ],
    "remember": "Velocity is speed with a direction. Acceleration is how fast velocity changes.",
    "a": {
      "q": "Which of these gives a velocity, not just a speed?",
      "opts": ["12 m/s east", "12 m/s", "12 m east", "12 m/s² east"],
      "why": "Velocity needs a speed in m/s and a direction, and only 12 m/s east has both. 12 m/s is a speed with no direction. 12 m east is a distance, as it has no time in its unit, and 12 m/s² east is an acceleration, because m/s² is the unit of acceleration.",
      "clue": "Check the unit as well as the direction."
    },
    "b": {
      "d": 3,
      "q": "A cyclist in Hobart rides a bend at a steady 8 m/s. Her direction changes the whole way round. What is true of her motion?",
      "opts": [
        "Her velocity changes, so she is accelerating",
        "Her velocity is steady, so she is not accelerating",
        "Her speed changes, so she is accelerating",
        "Her acceleration is zero, as her speed is steady"
      ],
      "why": "Velocity includes direction, so a change in direction is a change in velocity. That means she is accelerating even though her speed stays at 8 m/s. Steady speed alone does not mean steady velocity.",
      "clue": "Does velocity depend on direction as well as speed?"
    }
  },
  "sci-newton-s-first-law": {
    "title": "Newton's first law",
    "card": [
      "Newton's first law says an object keeps its velocity unless an unbalanced force acts on it. The unbalanced force is the net force, the sum of all the forces on the object.",
      "If the forces are balanced, an object at rest stays at rest. A moving object keeps moving in a straight line at the same speed.",
      "The tendency of an object to keep its state of motion is called inertia. An object at constant velocity has balanced forces, even if several forces act on it.",
      "An unbalanced force is needed to change the velocity, which means to speed up, slow down or turn. Motion alone does not need an unbalanced force."
    ],
    "remember": "Balanced forces mean no change in velocity. Inertia is the tendency to keep moving or stay at rest.",
    "a": {
      "q": "A skydiver has reached a steady fall of 55 m/s straight down. What can you say about the forces on the skydiver?",
      "opts": [
        "They are balanced, so there is no unbalanced force",
        "The unbalanced force points down, because of the motion",
        "The unbalanced force points down, because of gravity",
        "The unbalanced force points up, because of air resistance"
      ],
      "why": "Constant velocity means the velocity is not changing, so the forces are balanced. Gravity and air resistance both act, but they cancel. Motion downwards does not need an unbalanced force downwards.",
      "clue": "Is the velocity changing?"
    },
    "b": {
      "d": 3,
      "q": "A student pushes a trolley down a level, straight hallway at a constant 1.5 m/s. What is true about the horizontal forces on the trolley?",
      "opts": [
        "The push is balanced by the forces resisting the motion",
        "The push is larger than the forces resisting the motion",
        "The push is the only horizontal force acting on it",
        "The push is balanced by the trolley's weight"
      ],
      "why": "The velocity is not changing, so the forces are balanced: the push equals friction and the other forces resisting the motion. A larger push would be an unbalanced force and the trolley would speed up. Weight acts downwards, not along the hallway, so it cannot balance a horizontal push.",
      "clue": "Is the trolley speeding up, slowing down or neither?"
    }
  },
  "sci-newton-s-second-law": {
    "title": "Newton's second law",
    "card": [
      "The net force is the total of all forces on an object, found by adding forces along a line and taking their directions into account. Newton's second law says net force = mass × acceleration, or F = ma.",
      "Force is in newtons (N), mass in kilograms (kg) and acceleration in metres per second squared (m/s²). One newton gives a 1 kg mass an acceleration of 1 m/s².",
      "The acceleration points in the same direction as the net force. For the same net force, a larger mass gives a smaller acceleration.",
      "If the net force is zero, the acceleration is zero. If several forces act, first add them along the line, taking their directions into account, then use F = ma on the net force."
    ],
    "remember": "Acceleration depends on the net force and the mass, not on any single force.",
    "a": {
      "q": "A trolley has a mass of 3 kg. A net force of 12 N pushes it to the right. What is its acceleration?",
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
      "q": "Priya pushes a 20 kg box east with a force of 50 N. Friction of 30 N acts west on the box. What is the acceleration of the box?",
      "opts": ["1 m/s² east", "2.5 m/s² east", "4 m/s² east", "1 m/s² west"],
      "why": "The net force is 50 N east minus 30 N west, which is 20 N east. Then a = 20 ÷ 20 = 1 m/s² east. Using the 50 N push alone gives 2.5 m/s², which ignores friction.",
      "clue": "Find the net force before you use F = ma."
    }
  },
  "sci-newton-s-third-law": {
    "title": "Newton's third law",
    "card": [
      "Forces come in pairs. If object A exerts a force on object B, then B exerts a force on A at the same time.",
      "The two forces in a pair are equal in size, opposite in direction and of the same type, such as both contact forces or both gravitational.",
      "The two forces act on different objects. Because of this, they never cancel each other out.",
      "The pair stays equal whatever the objects are like. A rocket pushes exhaust gas backwards, and the gas pushes the rocket forwards with an equal force."
    ],
    "remember": "Every force has a partner of equal size and opposite direction, acting on the other object.",
    "a": {
      "q": "A rocket engine pushes exhaust gas backwards with a force of 800 N. What is the partner force?",
      "opts": [
        "The gas pushes the rocket forwards with 800 N",
        "The gas pushes the rocket backwards with 800 N",
        "The rocket's weight pulls down on the rocket",
        "The gas pushes the rocket forwards with less than 800 N"
      ],
      "why": "The partner force acts on the other object, so the gas pushes on the rocket. It is equal in size and opposite in direction, so 800 N forwards. A push backwards would not be opposite to the rocket's push on the gas.",
      "clue": "Which object does the partner force act on, and which way?"
    },
    "b": {
      "d": 3,
      "q": "A heavy truck pushes on a lighter parked car with 5000 N in a crash. What size is the force the car pushes back on the truck with?",
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
  "sci-newton-s-laws-car": {
    "title": "Newton's laws and car safety",
    "card": [
      "In a crash, a car stops very fast. The people inside keep moving forward at the car's old velocity until a force stops them. This is inertia.",
      "The force that stops a person depends on their mass and how quickly their velocity drops to zero. A longer stopping time means a smaller acceleration, so a smaller force (F = ma).",
      "Seatbelts stretch a little, airbags squash slowly, and crumple zones in the car's body fold up. Each makes the person's stop take longer.",
      "The change in velocity is the same, but it happens over more time. The force on the person is smaller, so they are less likely to be hurt."
    ],
    "remember": "Safety features spread the same stop over more time, so the force is smaller.",
    "a": {
      "q": "How does an airbag reduce the force on a driver in a crash?",
      "opts": [
        "It makes the driver's stop take longer",
        "It makes the driver's stop take less time",
        "It increases the driver's mass in the crash",
        "It stops the car from slowing down so fast"
      ],
      "why": "An airbag squashes slowly, so the driver's velocity drops to zero over a longer time. That gives a smaller acceleration and a smaller force. Making the car stop more slowly is tempting, but the airbag acts on the driver, not on the car.",
      "clue": "Think about the time the stop takes."
    },
    "b": {
      "d": 3,
      "q": "Two identical test dummies hit a wall at the same speed. Dummy P is stopped in 0.1 s. Dummy Q is stopped in 0.4 s by a crumple zone. Which statement is correct?",
      "opts": [
        "Dummy Q has a smaller force, as its stop takes longer",
        "Dummy Q has a smaller force, as its mass is smaller",
        "Dummy P has a smaller force, as its stop is quicker",
        "Both feel the same force, as their speeds are the same"
      ],
      "why": "Both dummies lose the same velocity, but Q loses it over more time. Q has a smaller acceleration, and with the same mass the force is smaller. Equal speeds do not mean equal forces, because the stopping time also matters.",
      "clue": "The mass and the starting speed are the same. What differs?"
    }
  },
  "sci-electron-shells-bohr-model": {
    "title": "Electron shells and the Bohr model",
    "card": [
      "In the Bohr model, electrons orbit the nucleus in layers called shells. Each shell can hold only a set number of electrons.",
      "The first shell holds up to 2 electrons. The second holds up to 8, and so does the third.",
      "Electrons fill the shell closest to the nucleus first. Only when it is full do they start the next shell.",
      "The outer shell is the outermost shell that holds electrons. The number of electrons in it decides how an element reacts."
    ],
    "remember": "Shells fill from the inside out, and the outer shell sets how an element reacts.",
    "a": {
      "q": "Which shows how the 11 electrons of a sodium atom are arranged in shells?",
      "opts": ["2, 8, 1", "2, 9", "11", "8, 3"],
      "why": "The first shell fills with 2, the second fills with 8, and the last 1 electron goes in the third shell. 2, 9 is wrong because the second shell holds only 8.",
      "clue": "Fill the shell closest to the nucleus first."
    },
    "b": {
      "d": 3,
      "q": "Priya says a chlorine atom has 17 electrons, so its outer shell holds 17. What is her mistake, and what is the correct outer shell?",
      "opts": [
        "Shells hold set numbers, so the outer shell has 7",
        "Shells hold set numbers, so the outer shell has 8",
        "Every shell holds 8, so the outer shell has 1",
        "Only the first shell has a limit, so the outer has 15"
      ],
      "why": "Electrons are spread over shells as 2, 8, 7, so the outer shell holds 7. It is not 8, because the third shell is not full. Priya forgot that inner shells fill first and hold set numbers.",
      "clue": "Fill 2, then 8, then see how many are left over."
    }
  },
  "sci-metals-non-metals": {
    "title": "Metals and non-metals",
    "card": [
      [
        "Metals",
        "Metals are usually shiny. They conduct heat and electricity well, and they can be bent or hammered into shape without breaking."
      ],
      [
        "Non-metals",
        "Non-metals are usually dull. They are poor conductors of heat and electricity, called insulators, and solid ones are brittle, so they shatter when hit."
      ],
      "On the periodic table, metals sit to the left and in the middle. Non-metals sit to the right.",
      "These are general patterns. A few elements break them, such as carbon in the form of graphite, which is a non-metal that conducts electricity."
    ],
    "remember": "Metals are usually shiny, bendable conductors, found to the left and in the middle. Non-metals are usually dull, brittle insulators, found to the right.",
    "a": {
      "q": "A strip of an unknown element is shiny, bends without snapping and lets electricity flow through it. Where on the periodic table is it most likely to sit?",
      "opts": [
        "On the left or in the middle",
        "On the far right",
        "In the top right corner only",
        "Anywhere, as position tells us nothing"
      ],
      "why": "Shiny, bendable and conducting are the properties of a metal, and metals sit to the left and in the middle. The far right holds non-metals, which are usually dull insulators.",
      "clue": "Shiny, bendable and conducting describe one type of element."
    },
    "b": {
      "d": 3,
      "q": "Sam hits a lump of an element with a hammer and it shatters into pieces. It is dull and does not light a small bulb in a circuit. What should Sam conclude?",
      "opts": [
        "It is most likely a non-metal",
        "It is most likely a metal",
        "It is a metal that has gone dull with age",
        "It is a metal, because all solids conduct electricity"
      ],
      "why": "Shattering, a dull surface and failing to conduct are all properties of a non-metal. A metal that has gone dull would still bend rather than shatter, and it would still conduct, so it would not fit all three results.",
      "clue": "Think about what a metal does when hit, and whether it would conduct."
    }
  },
  "sci-patterns-groups": {
    "title": "Patterns in the groups",
    "card": [
      [
        "Group 1",
        "The Group 1 metals, such as lithium, sodium and potassium, react strongly with water. They make hydrogen gas and an alkaline solution."
      ],
      "The reaction gets stronger down the group. Potassium reacts more strongly than sodium, and sodium more than lithium.",
      ["Group 18", "The noble gases, such as helium, neon and argon, hardly react at all."],
      "Their outer shells are full, which makes their atoms very stable. They have little reason to react with other elements."
    ],
    "remember": "Group 1 reacts strongly, more so down the group. Group 18 hardly reacts because its outer shells are full.",
    "a": {
      "q": "Why do the noble gases hardly react with other elements?",
      "opts": [
        "Their outer shells are full",
        "Their outer shells are empty",
        "They have no electrons at all",
        "They are too light to react"
      ],
      "why": "A full outer shell makes an atom stable, so it has little reason to react. The empty option gets this backwards: a noble gas's outer shell holds as many electrons as it can, not none.",
      "clue": "Think about how many electrons the outer shell holds."
    },
    "b": {
      "d": 2,
      "q": "A teacher drops lithium, sodium and potassium into separate bowls of water. Which reacts most strongly?",
      "opts": ["Potassium", "Sodium", "Lithium", "They all react equally"],
      "why": "Reactions get stronger down Group 1, and potassium is lowest of the three. Sodium is tempting because it sits in the middle, but it reacts less strongly than potassium.",
      "clue": "Which metal sits lowest in the group?"
    }
  },
  "sci-synthesis-decomposition": {
    "title": "Synthesis and decomposition",
    "card": [
      [
        "Synthesis",
        "Two or more simple substances join to make one more complex substance. Magnesium and oxygen join to form magnesium oxide."
      ],
      [
        "Decomposition",
        "One compound breaks down into two or more simpler substances. Water can be split into hydrogen and oxygen using electricity."
      ],
      "A synthesis reaction has one product. A decomposition reaction has one reactant. Count the reactants and products to tell them apart.",
      "Many decompositions need energy supplied, such as heat, light or electricity. Copper carbonate heated strongly breaks into copper oxide and carbon dioxide. Some compounds break down slowly on their own."
    ],
    "remember": "Synthesis builds one product from simpler reactants. Decomposition breaks one reactant into simpler products.",
    "a": {
      "q": "Sodium and chlorine react to form sodium chloride. What type of reaction is this?",
      "opts": ["Synthesis", "Decomposition", "Neutralisation", "Displacement"],
      "why": "Two simple substances join to make one compound, so it is synthesis. It is not decomposition, because nothing breaks down into simpler substances.",
      "clue": "Count how many substances react and how many form."
    },
    "b": {
      "d": 3,
      "q": "Hydrogen peroxide in a bottle slowly forms water and oxygen gas. Which statement describes this reaction?",
      "opts": [
        "Decomposition, because one compound forms simpler substances",
        "Synthesis, because a gas is made as a new product",
        "Synthesis, because two products form from the reaction",
        "Neither type, because no energy is supplied to it"
      ],
      "why": "One compound breaks into two simpler substances, so it is decomposition. Many decompositions need energy supplied, but some happen on their own, so the lack of heat does not rule it out. Having two products does not make it synthesis, which has a single product.",
      "clue": "Look at how many reactants there are, not how many products."
    }
  },
  "sci-displacement-reactions": {
    "title": "Displacement reactions",
    "card": [
      "In a displacement reaction, a more reactive metal takes the place of a less reactive metal in a compound. The less reactive metal is pushed out and left as a solid element.",
      "Zinc placed in copper sulfate solution becomes coated with copper. Zinc is more reactive than copper, so it forms zinc sulfate and copper is displaced.",
      "If the metal added is less reactive than the metal in the compound, nothing happens. Copper placed in zinc sulfate solution does not react.",
      "A reactivity series ranks metals from most to least reactive. Magnesium is above zinc, and zinc is above copper."
    ],
    "remember": "A metal only displaces another metal that is less reactive than itself.",
    "a": {
      "q": "Which metal could displace copper from copper sulfate solution?",
      "opts": ["Magnesium", "Silver", "Gold", "Platinum"],
      "why": "Magnesium is more reactive than copper, so it pushes copper out of the compound. Silver is less reactive than copper, so it cannot displace it.",
      "clue": "The metal added must be more reactive than copper."
    },
    "b": {
      "d": 3,
      "q": "Tariq puts a clean zinc strip into magnesium sulfate solution. Magnesium is more reactive than zinc. What is the result?",
      "opts": [
        "No reaction, because zinc is less reactive than magnesium",
        "Zinc is coated with magnesium, because it is a metal",
        "Zinc dissolves and magnesium forms, as zinc is more reactive",
        "The solution reacts, because all metals displace each other"
      ],
      "why": "Zinc is less reactive than magnesium, so it cannot push magnesium out of its compound. Both are metals, but reactivity decides the outcome, not just being a metal.",
      "clue": "Compare the reactivity of the metal added with the metal in solution."
    }
  },
  "sci-acids-bases-neutralisation": {
    "title": "Acids, bases and neutralisation",
    "card": [
      "The pH scale shows how acidic or basic a solution is. A pH below 7 is acidic, above 7 is basic, and exactly 7 is neutral.",
      "Neutralisation is the reaction of an acid with a base. It makes a salt and water. Hydrochloric acid and sodium hydroxide make sodium chloride and water.",
      "Adding a base to an acid raises the pH. With just the right amount the pH reaches 7, and extra base takes it above 7. Adding an acid to a base lowers the pH in the same way.",
      "Neutralisation can be used to treat acidic soil. A farmer can spread lime, which is a base, to raise the soil pH."
    ],
    "remember": "Acid + base makes a salt and water. A base raises the pH and an acid lowers it.",
    "a": {
      "q": "Which pair of products forms when an acid reacts with a base?",
      "opts": ["A salt and water", "A salt and hydrogen gas", "An acid and oxygen gas", "Oxygen gas and water"],
      "why": "Neutralisation makes a salt and water, as when hydrochloric acid and sodium hydroxide make sodium chloride and water. A salt and hydrogen gas is tempting, but hydrogen forms when some metals react with acids, not in neutralisation with a base.",
      "clue": "Recall what hydrochloric acid and sodium hydroxide make."
    },
    "b": {
      "d": 2,
      "q": "Priya's garden soil has a pH of 5. She spreads lime, a base, on it. What is the most likely pH afterwards?",
      "opts": ["6.5", "3.5", "5", "4.5"],
      "why": "A pH of 5 is acidic. Lime neutralises some of the acid, so the pH rises, and 6.5 is the only option above 5. A pH of 3.5 or 4.5 would mean the soil became more acidic, which is the wrong direction.",
      "clue": "Does adding a base raise or lower the pH?"
    }
  },
  "sci-science-corrects-itself": {
    "title": "How science corrects itself",
    "card": [
      "Scientific knowledge can change when new evidence appears. Scientists treat ideas as the best explanation so far, not as final truth.",
      [
        "Peer review",
        "Before a study is published, other experts check its methods and conclusions. They can spot errors, gaps or claims the data does not support."
      ],
      [
        "Repeated experiments",
        "Other scientists run the same test to see if they get the same result. A result that cannot be repeated is doubted."
      ],
      "New evidence can refine or replace an idea. Evidence that the universe is expanding built up over decades, from many observations by many scientists."
    ],
    "remember": "Checking by others and new evidence let science find mistakes and improve its ideas.",
    "a": {
      "q": "Why do other scientists repeat an experiment after its result is published?",
      "opts": [
        "To see whether they get the same result",
        "To make sure the first scientist gets the credit",
        "To turn the original idea into a final truth",
        "To check the study before a journal prints it"
      ],
      "why": "Repeating a test shows whether the result holds up. If others get the same result, confidence grows, and if not, a mistake may be found. Checking a study before a journal prints it is peer review, which happens before publication, not after.",
      "clue": "Think about what a different result would reveal."
    },
    "b": {
      "d": 3,
      "q": "Dr Lee's team reports that a new fertiliser doubles crop growth. Three other labs repeat the test and see no change. What is the best conclusion?",
      "opts": [
        "Dr Lee's result is doubtful and needs rechecking",
        "Dr Lee's result stands because it was published first",
        "The three other labs likely made errors, not Dr Lee",
        "Passing peer review showed Dr Lee's result is correct"
      ],
      "why": "A result that others cannot repeat is doubted, so Dr Lee's study needs rechecking for errors. Peer review can spot problems, but passing it does not make a result correct, and later tests can still challenge it.",
      "clue": "What happens to a result that others cannot repeat?"
    }
  },
  "sci-technology-that-drives-discovery": {
    "title": "Technology that drives discovery",
    "card": [
      "New technology lets scientists collect data that was impossible to gather before. Better data can lead to new questions and new discoveries.",
      [
        "Radio telescopes",
        "These collect faint radio waves given off by objects in space, such as galaxies. Our eyes cannot see radio waves. The Australian SKA Pathfinder (ASKAP) in Western Australia only receives signals and does not send them out. It can survey large areas of sky."
      ],
      [
        "DNA sequencing machines",
        "These read the order of the bases that make up DNA, without changing them. They let scientists compare the genes of many living things quickly."
      ],
      "The tool does not reach conclusions by itself. Scientists analyse the new data it collects, and that analysis drives discovery."
    ],
    "remember": "New tools collect data that scientists could not gather before, and analysing that data leads to discoveries.",
    "a": {
      "q": "How can ASKAP detect objects in space that are invisible to our eyes?",
      "opts": [
        "It collects faint radio waves that the objects give off",
        "It sends out radio waves and times the returning echoes",
        "It magnifies visible light more than other telescopes",
        "It picks up ultraviolet light that our eyes cannot see"
      ],
      "why": "Objects such as galaxies give off radio waves, which our eyes cannot see, and ASKAP collects them. It does not send signals out and time their echoes, which is how radar works.",
      "clue": "Think about which way the radio waves travel."
    },
    "b": {
      "d": 3,
      "q": "Using DNA sequencing, a team reads genes from 300 frog species in a few weeks. How does the machine help lead to new discoveries?",
      "opts": [
        "It gives scientists far more data to analyse quickly",
        "It decides by itself which frog species are related",
        "It changes the bases so the genes match more easily",
        "It shows each frog's whole body in fine detail"
      ],
      "why": "The machine reads the order of bases quickly, giving scientists far more data to analyse. It does not reach conclusions itself, such as which species are related: scientists work that out from the data. It reads the bases without changing them.",
      "clue": "Think about what the machine produces and who uses it."
    }
  },
  "sci-society-steering-science": {
    "title": "Society steering science",
    "card": [
      "Science does not happen in isolation. Society influences which research goes ahead and how it is done.",
      [
        "Public concern",
        "When many people worry about a problem, such as climate change, there is pressure to study it. Governments and groups may respond."
      ],
      [
        "Funding",
        "Research costs money. Projects that governments, businesses or charities pay for are more likely to go ahead."
      ],
      [
        "Ethics",
        "Ethics is about what is right and wrong. It can limit research itself: a study that tests people's genes needs approval from an ethics committee, which can stop it or set conditions such as consent and privacy."
      ]
    ],
    "remember": "Public concern, funding and ethics help decide which research goes ahead and how.",
    "a": {
      "q": "After public worry about coral bleaching, a government sets aside money for Great Barrier Reef research. Which factor most directly sends research to the reef here?",
      "opts": [
        "Funding sending research towards a problem",
        "Ethics rules stopping a kind of experiment on reefs",
        "Peer review finding a mistake in an earlier study",
        "A new tool letting scientists gather reef data"
      ],
      "why": "The government's money sends research towards the reef, which shows funding. Public concern started the response, but no ethical limit, error check or new tool is described.",
      "clue": "Look for what the government actually provided."
    },
    "b": {
      "d": 3,
      "q": "Researchers plan to test the genes of 500 volunteers for a disease risk. A university review panel lets the study go ahead only if every volunteer agrees in writing and their results are kept private. Which factor is most directly shown?",
      "opts": [
        "Ethics setting limits on how a study is run",
        "Funding deciding which study gets paid for",
        "Public concern pushing a problem up the agenda",
        "A new machine making genetic data possible"
      ],
      "why": "The panel is judging what is right for the volunteers, so its conditions show ethics limiting how the research is done. Public concern is tempting, but no wider worry pushed for this study. No money or new machine is described.",
      "clue": "Think about why the panel cares about the volunteers' consent and privacy."
    }
  },
  "sci-correlation-causation": {
    "title": "Correlation and causation",
    "card": [
      "A correlation is when two things change together. When one goes up, the other tends to go up too, or tends to go down.",
      "A correlation does not prove that one thing causes the other. The link may be a coincidence.",
      "A third factor may cause both changes. In summer, hot weather can raise both ice cream sales and the number of people swimming at a beach.",
      "To show that one thing causes another, scientists need more evidence, such as a fair test that changes only that one thing."
    ],
    "remember": "Changing together is a correlation. It is not proof of cause.",
    "a": {
      "q": "Over a year, a town's monthly ice cream sales rise and fall along with its number of sunburn cases. What can be concluded from this data alone?",
      "opts": [
        "They are correlated, but this alone does not show a cause",
        "They are correlated, which shows ice cream causes sunburn",
        "They are correlated, which proves sunburn boosts sales",
        "They are not linked, because neither one causes the other"
      ],
      "why": "Sales and sunburn rise and fall together, so they are correlated, but a correlation alone cannot prove cause. A third factor such as hot sunny weather could explain both. Saying ice cream causes sunburn is tempting, but it reads cause into a pattern that does not show it.",
      "clue": "Does changing together prove that one thing causes the other?"
    },
    "b": {
      "d": 3,
      "q": "A survey finds that students with more books at home tend to get higher science marks. Which statement does the survey on its own best support?",
      "opts": [
        "Books at home and science marks are correlated",
        "Buying more books raises a student's science mark",
        "High science marks make students buy more books",
        "Books at home and science marks have no link at all"
      ],
      "why": "The survey shows the two change together, which is a correlation. It does not show that books cause higher marks, because a third factor, such as family income, may explain both. It does not show there is no link either, since the two do move together.",
      "clue": "A survey finds patterns. It does not run a fair test."
    }
  },
  "sci-sample-size": {
    "title": "Sample size",
    "card": [
      "A sample is the group of people, plants or objects that a study actually measures. It is used to learn about a much larger group.",
      "A larger sample gives more reliable results. Reliable means that repeating the study would give similar results.",
      "In a small sample, one unusual result can pull the average a long way. In a large sample, that same result is outweighed by many ordinary ones.",
      "A large sample does not fix a badly designed test. It does reduce the effect of chance on the average."
    ],
    "remember": "More measurements means one odd result matters less, so the average is more reliable.",
    "a": {
      "q": "Why does a larger sample give a more reliable average than a smaller one?",
      "opts": [
        "One unusual result has less effect on the average",
        "Unusual results are removed before the average is found",
        "Every result in a large sample is measured more accurately",
        "A large sample cannot contain any unusual results"
      ],
      "why": "With more results, one unusual value is outweighed by many ordinary ones, so the average moves less. It does not remove unusual results or make each measurement more accurate, because those depend on the test and the equipment.",
      "clue": "Think about how far one odd value can shift an average."
    },
    "b": {
      "d": 2,
      "q": "Priya tests how far paper planes fly. Which plan gives the most reliable average distance for her design?",
      "opts": [
        "Throw one design 30 times and average the distances",
        "Throw one design 3 times and average the distances",
        "Throw one design once and use that distance",
        "Throw one design twice and use the longer distance"
      ],
      "why": "Thirty throws means one lucky or unlucky throw has little effect on the average. Three throws is better than one, but a single odd throw can still shift the average a lot.",
      "clue": "Picture a sudden gust of wind on one throw. In which plan would it matter least?"
    }
  },
  "sci-evaluating-scientific-claim": {
    "title": "Evaluating a scientific claim",
    "card": [
      "A claim is only as strong as the evidence behind it. Ask what was measured and whether the evidence actually supports the claim.",
      "Look at the study. A larger sample and a fair test, with variables controlled and measurements done carefully, give more trustworthy results.",
      "Look for repeats. If other scientists run their own studies and find the same result, confidence in the claim grows.",
      "Check who made or paid for the study. A funder with something to gain is a reason to look more closely at the method. It does not prove the result is wrong."
    ],
    "remember": "Judge a claim by its evidence, how well the study was run, whether others found the same, and who paid for it.",
    "a": {
      "q": "A website claims a new drink improves memory. Which finding would make you trust the claim most?",
      "opts": [
        "Several separate studies found the same memory gain",
        "One study of 20 people found a memory gain",
        "The drink's maker says the gain is large",
        "Many people online say they feel sharper"
      ],
      "why": "Separate studies that find the same result show the effect can be repeated. A single small study could be a fluke, and the maker's word and online opinions are not controlled evidence.",
      "clue": "Which finding would be hardest to explain as chance?"
    },
    "b": {
      "d": 3,
      "q": "A battery company pays a lab to test its batteries. The lab reports they last longer than rivals. What is the best response?",
      "opts": [
        "Check how the test was run and look for other tests",
        "Reject the result because the company paid for it",
        "Accept the result because a lab ran the test",
        "Accept it because the batteries are sold widely"
      ],
      "why": "Funding by a company is a reason to check the method and look for independent tests of the same thing. Rejecting the result outright is tempting, but funding alone does not show the result is wrong.",
      "clue": "A funder with something to gain calls for a closer look, not an automatic verdict."
    }
  },
  "sci-scientists-classify-living-things": {
    "title": "Why scientists classify living things",
    "card": [
      "Scientists have found millions of kinds of living things, and many more are still unnamed. Classifying means sorting them into groups by shared features.",
      "Identify: a group with known features helps us work out what an unknown organism is. If it has feathers and a beak, it belongs with the birds.",
      "Study: organisms in the same group often share other features, so learning about one can help scientists predict things about others in that group.",
      "Talk: group names give scientists a shared way to describe living things, so they can compare their findings clearly."
    ],
    "remember": "Classifying sorts life by shared features, so it is easier to identify, study and discuss.",
    "a": {
      "q": "Why do scientists sort living things into groups by shared features?",
      "opts": [
        "It makes the variety of life easier to identify and study",
        "It lets them rank living things from least to most important",
        "It shows which living things are the most useful to humans",
        "It means each living thing needs only one group name"
      ],
      "why": "Groups with known features let scientists work out what an organism is and compare it with others. Sorting does not rank organisms by importance, because groups are based on shared features, not on value.",
      "clue": "Think about what groups help scientists do with unknown organisms."
    },
    "b": {
      "d": 2,
      "q": "Priya finds an unknown insect in a park in Perth. It has six legs and three body parts. How does classification help her?",
      "opts": [
        "She can match its features to a known group to identify it",
        "She can tell how long the insect will live from its colour",
        "She can be sure that no one has seen this insect before",
        "She can name the insect by choosing any word she likes"
      ],
      "why": "Classification groups organisms by shared features, so Priya can compare the insect's features with known groups and narrow down what it is. Its features cannot show that it is new, because many known insects share them.",
      "clue": "Her insect has features she can compare with groups."
    }
  },
  "sci-linnaean-hierarchy": {
    "title": "The Linnaean hierarchy",
    "card": [
      "The Linnaean system sorts living things into groups that sit inside bigger groups. The levels are kingdom, phylum, class, order, family, genus and species.",
      "Kingdom is the biggest group and species is the smallest. Each step down gives a smaller group with fewer organisms in it.",
      "Organisms in the same group share features. The lower the level, the more features they share, so two organisms in the same family have more in common than two in the same class.",
      "A memory trick for the order is: King Philip Came Over For Good Soup. Each word starts with the same letter as a level."
    ],
    "remember": "Going down from kingdom to species, groups get smaller and their members share more features.",
    "a": {
      "q": "Which pair of animals shares the most features with each other?",
      "opts": [
        "Two animals in the same genus",
        "Two animals in the same class",
        "Two animals in the same phylum",
        "Two animals in the same kingdom"
      ],
      "why": "Genus is the lowest of these four levels, so animals in the same genus share the most features. Animals in the same kingdom share the fewest, because kingdom is the biggest group.",
      "clue": "Lower levels have smaller groups with more in common."
    },
    "b": {
      "d": 3,
      "q": "A scientist sorts a beetle into these groups: family, class, genus, order. Which list puts them from the biggest group to the smallest?",
      "opts": [
        "Class, order, family, genus",
        "Order, class, genus, family",
        "Genus, family, order, class",
        "Class, family, order, genus"
      ],
      "why": "The levels go class, order, family, genus from biggest to smallest, with each step holding fewer organisms. Genus, family, order, class is the reverse, so it runs from smallest to biggest.",
      "clue": "Start with the level closest to kingdom."
    }
  },
  "sci-scientific-names": {
    "title": "Scientific names",
    "card": [
      "Common names change from place to place. One animal can have several names, and one name can be used for different animals.",
      "Each species has a scientific name made of two parts. The first part is its genus. The second part is its species.",
      "The name is written in Latin form. The genus starts with a capital letter, the species starts with a small letter, and both are in italics, such as Homo sapiens.",
      "Scientists everywhere use the same scientific name for a species. This stops confusion between languages and regions."
    ],
    "remember": "A scientific name has two parts, genus then species, and it is the same worldwide.",
    "a": {
      "q": "Why do scientists give each species a two-part scientific name?",
      "opts": [
        "So every scientist names the species the same way",
        "So the name can show the animal's size and colour",
        "So each region can keep its own name for the species",
        "So the species can be sorted into a kingdom by name"
      ],
      "why": "A scientific name is shared by scientists everywhere, so they all know which species is meant. Common names can differ between places, so they do not give this certainty.",
      "clue": "Think about what goes wrong when names change from place to place."
    },
    "b": {
      "d": 3,
      "q": "A student writes the name of the koala as Phascolarctos cinereus. Which part of this name is the genus?",
      "opts": [
        "Phascolarctos, the first part",
        "cinereus, the second part",
        "Both parts together",
        "Neither part, as it is only a common name"
      ],
      "why": "The genus is always the first part of a scientific name, and it starts with a capital letter. The second part, cinereus, names the species within that genus. It is tempting to pick both parts, but the full name is the genus and species together.",
      "clue": "Look at which word has the capital letter."
    }
  },
  "sci-using-dichotomous-key": {
    "title": "Using a dichotomous key",
    "card": [
      "A dichotomous key is a tool for identifying an organism. It is a series of steps, and each step gives two choices about a feature you can observe.",
      "At each step, pick the choice that matches the organism. Each choice sends you to another step or to a name.",
      "Every choice splits the group in two, so the possible organisms get fewer. You stop when a choice gives a name instead of another step.",
      "The choices must be clear features, such as has wings or has no wings. A dichotomous key only identifies an organism. It does not show how closely organisms are related."
    ],
    "remember": "A dichotomous key narrows the group with two-way choices until one name is left.",
    "a": {
      "q": "Why does each step in a dichotomous key give two choices?",
      "opts": [
        "Each choice splits the group, so fewer organisms remain",
        "Each choice shows how closely two organisms are related",
        "Each choice checks the habitat and diet of the organism",
        "Each choice lets you guess the name before you finish"
      ],
      "why": "Two choices split the group in two, so the possible organisms get fewer at every step until one is left. A dichotomous key only identifies organisms. It does not show how closely they are related, so that option is wrong.",
      "clue": "Think about what happens to the group after each choice."
    },
    "b": {
      "d": 2,
      "q": "Sam uses a dichotomous key to identify a beetle. Step 1 gives two choices: wings covered by a hard case, or no hard case. What should Sam do?",
      "opts": [
        "Look at the beetle's wings and pick the matching choice",
        "Pick the first choice, because it is listed first",
        "Skip to the last step to find a name faster",
        "Pick the choice with the longer description"
      ],
      "why": "Each step asks about a feature you can observe, so Sam must look at the beetle and pick the choice that matches. Taking the first choice without looking could send Sam to the wrong name.",
      "clue": "The choices describe a feature of the organism."
    }
  },
  "sci-first-nations-australians-classification": {
    "title": "First Nations Australians' classification systems",
    "card": [
      "First Nations Australians have observed and classified plants and animals for tens of thousands of years. This knowledge is passed on through stories, songs, art and practice.",
      "Groups of First Nations Australians may sort living things by features such as use (food, medicine or tools), habitat (where it lives), season and relationships (links between living things, land and people).",
      "Season is one example. Some plants and animals are grouped by the time of year they flower, fruit or are ready to be gathered, and the seasons used can differ from the four European ones.",
      "The Linnaean system mainly groups living things by shared physical features. First Nations systems can group living things in different ways, and each system suits its own purpose."
    ],
    "remember": "First Nations Australians may classify living things by use, habitat, season and relationships, so groups can differ from Linnaean ones.",
    "a": {
      "q": "A community puts several plants in one group because each can treat a cough or heal a cut. Which feature is this grouping based on?",
      "opts": ["Their use", "Their habitat", "Their season", "Their relationships"],
      "why": "Treating a cough or healing a cut is a medicine use, so the plants are grouped by use. Habitat would mean grouping by where the plants live, which the case does not mention. The card shows these systems can group living things in several ways, and this one is by use.",
      "clue": "Think about what people do with these plants."
    },
    "b": {
      "d": 3,
      "q": "A community groups a plant with a shellfish because both are collected on one beach when a certain tree flowers. Why might this differ from the Linnaean system?",
      "opts": [
        "It links them by time and place, not by body features",
        "It links them by body features, not by time and place",
        "It links them by use as medicine, not by body features",
        "It links them by one feature, so it is not a real system"
      ],
      "why": "The tree flowering marks a season, and the beach is a habitat, so the group is based on time and place. The Linnaean system mainly uses shared physical features, which would put a plant and a shellfish in different groups. Different does not mean wrong, as each system suits its own purpose.",
      "clue": "What do the tree flowering and the beach tell you?"
    }
  },
  "sci-producers-consumers-decomposers": {
    "title": "Producers, consumers and decomposers",
    "card": [
      ["Producer", "an organism that makes its own food using sunlight. Plants and algae are producers."],
      [
        "Consumer",
        "an organism that cannot make its own food, so it eats other organisms. Rabbits, eagles and humans are consumers."
      ],
      ["Decomposer", "an organism that breaks down dead plants and animals. Fungi and bacteria are decomposers."],
      "Decomposers return nutrients from dead matter to the soil. Producers can then take up those nutrients."
    ],
    "remember": "Producers make food, consumers eat others, and decomposers recycle the dead.",
    "a": {
      "q": "A mushroom grows on a fallen log and breaks it down. What is the mushroom's role in the ecosystem?",
      "opts": ["Decomposer", "Producer", "Consumer of living plants", "Consumer of living animals"],
      "why": "A mushroom is a fungus, and it breaks down dead matter, so it is a decomposer. It is not a producer, because it does not make its own food using sunlight.",
      "clue": "Is the log alive or dead?"
    },
    "b": {
      "d": 3,
      "q": "Imagine a paddock in Queensland with no bacteria or fungi in the soil. Dead leaves pile up and the plants grow poorly. Why?",
      "opts": [
        "Nutrients in the dead leaves are not returned to the soil",
        "Plants cannot make food without bacteria in the soil",
        "Consumers cannot eat the plants without fungi present",
        "The plants become consumers and must eat the dead leaves"
      ],
      "why": "Decomposers break down dead matter and return nutrients to the soil, so without them the nutrients stay locked in the leaves. Plants still make their own food from sunlight, so the problem is not that they cannot make food without bacteria.",
      "clue": "Think about where the nutrients in dead leaves end up."
    }
  },
  "sci-food-chains-food-webs": {
    "title": "Food chains and food webs",
    "card": [
      ["Food chain", "A food chain shows one feeding path, such as grass, then a grasshopper, then a lizard."],
      [
        "Arrows",
        "Each arrow points from the food to the eater. The arrow means \"is eaten by\", so it points toward the organism doing the eating."
      ],
      [
        "Food web",
        "Most animals eat more than one kind of food, and many are eaten by more than one kind of animal. A food web joins many food chains together to show these links."
      ],
      ["Dependence", "A food web shows how the organisms in an ecosystem depend on each other for food."]
    ],
    "remember": "A chain is one path with arrows from food to eater. A web joins many chains.",
    "a": {
      "q": "In a food chain, a frog eats a fly. Which way should the arrow point?",
      "opts": [
        "From the fly to the frog",
        "From the frog to the fly",
        "Both ways between the fly and frog",
        "No arrow, just a line between them"
      ],
      "why": "The arrow points from the food to the eater, so it goes from the fly to the frog. From the frog to the fly is tempting because the frog seems to act on the fly, but that shows the wrong direction of feeding.",
      "clue": "Point the arrow toward the eater."
    },
    "b": {
      "d": 3,
      "q": "On a Tasmanian farm, a food chain shows grass → rabbit → eagle. Another shows grass → mouse → eagle. Why is it better to show both chains in one food web?",
      "opts": [
        "It shows grass and the eagle each link to two animals",
        "It shows that rabbits and mice feed on each other",
        "It shows that the eagle feeds directly on the grass",
        "It shows arrows point from the eater to the food"
      ],
      "why": "A food web joins chains, so it shows that grass feeds both the rabbit and the mouse, and the eagle eats both. The idea that rabbits and mice feed on each other is wrong, because neither chain has an arrow between them.",
      "clue": "Look for what the two chains share."
    }
  },
  "sci-energy-flow-ecosystem": {
    "title": "Energy flow in an ecosystem",
    "card": [
      "Nearly all the energy in an ecosystem comes from sunlight. Producers capture some of it and store it as chemical energy in their food.",
      "Energy passes to the next feeding level when one organism eats another. A consumer gets only the energy stored in the food it eats.",
      "At each step, much of the energy is lost to the surroundings as heat. Organisms use energy to move, grow and stay alive, and this releases heat.",
      "Less energy reaches each higher feeding level, so it can support fewer organisms. This is why there are fewer top consumers than producers."
    ],
    "remember": "Less energy passes on at each step, so higher feeding levels have fewer organisms.",
    "a": {
      "q": "Why are there fewer hawks than mice in a grassland?",
      "opts": [
        "Less energy reaches each higher feeding level",
        "Hawks make less energy from sunlight than mice",
        "Energy passes back down from hawks to mice",
        "Mice use up all the energy in the grass they eat"
      ],
      "why": "Much energy is lost as heat at each step, so less is left for the hawks, which supports fewer of them. Hawks do not make energy from sunlight, because only producers capture it.",
      "clue": "Think about what happens to energy at each step."
    },
    "b": {
      "d": 2,
      "q": "In a pond, algae are eaten by water fleas, which are eaten by small fish, which are eaten by a heron. Which consumer receives the least of the energy the algae captured?",
      "opts": ["The heron", "The small fish", "The water fleas", "Each consumer gets an equal share"],
      "why": "Much energy is lost as heat at each step, so less passes on each time. The heron is three steps from the algae, so it receives the least. The consumers do not get equal shares, because each one gets only what is left in the food it eats.",
      "clue": "Count the steps from the algae to each consumer."
    }
  },
  "sci-biotic-abiotic-factors": {
    "title": "Biotic and abiotic factors",
    "card": [
      [
        "Biotic factor",
        "a living part of an ecosystem, or something made by living things. Plants, animals, fungi and bacteria are biotic."
      ],
      ["Abiotic factor", "a non-living part of an ecosystem. Temperature, water, light, soil and wind are abiotic."],
      "Both kinds affect how many of an organism can live in a place. A lack of water can shrink a plant population. More predators can shrink a prey population.",
      "Biotic and abiotic factors also affect each other. Soil type, an abiotic factor, helps decide which plants grow, and those plants are biotic."
    ],
    "remember": "Living parts are biotic, non-living parts are abiotic, and both affect population sizes.",
    "a": {
      "q": "Which of these is an abiotic factor in a desert ecosystem?",
      "opts": ["The amount of rainfall", "The number of lizards", "The seeds eaten by ants", "The bacteria in the sand"],
      "why": "Rainfall is a non-living part of the ecosystem, so it is abiotic. Bacteria are tempting because they are tiny and in the sand, but they are living things, so they are biotic.",
      "clue": "Which one is not alive and not made by living things?"
    },
    "b": {
      "d": 3,
      "q": "A dry summer in Perth lowers the water in a pond, and fewer frogs survive. Which statement about this is correct?",
      "opts": [
        "An abiotic factor, water level, lowered a biotic population",
        "A biotic factor, the frogs, lowered the water level",
        "A biotic factor lowered a biotic population",
        "Only living factors can change a population size"
      ],
      "why": "Water level is non-living, so it is abiotic, and it affected the number of frogs. Frogs are living, but they did not cause the drop in water. Abiotic factors can change populations as well as biotic ones.",
      "clue": "Decide whether water and frogs are living, then see which one caused the change."
    }
  },
  "sci-changes-that-disrupt-ecosystems": {
    "title": "Changes that disrupt ecosystems",
    "card": [
      "The organisms in an ecosystem depend on each other. A change to one population can change many others through the food web.",
      [
        "Removing a species",
        "if a predator is removed, the animals it ate can increase in number and eat more of their own food. If a pollinator is removed, the plants that rely on it may make fewer seeds and fruit."
      ],
      [
        "Clearing habitat",
        "clearing land removes the food, water and shelter that organisms need. Their populations can fall or disappear from the area."
      ],
      [
        "Introduced species",
        "a species brought in from another place, such as the cane toad in Australia, may eat native animals or compete with them. Native populations can fall as a result."
      ]
    ],
    "remember": "A change to one population can spread through a food web and change many others.",
    "a": {
      "q": "A disease wipes out the foxes that eat rabbits in a bushland area. What is the most likely first change?",
      "opts": [
        "The rabbit population increases",
        "The rabbit population decreases",
        "The grass population increases",
        "The rabbit population stays the same"
      ],
      "why": "Foxes are predators of rabbits. With fewer foxes, fewer rabbits are eaten, so rabbit numbers are likely to rise. Grass is not likely to increase, because more rabbits would eat more of it.",
      "clue": "Fewer predators means fewer animals being eaten."
    },
    "b": {
      "d": 3,
      "q": "A farmer clears a patch of bush where native bees live. Nearby wildflowers depend on those bees for pollination. What is the most likely effect on the wildflowers?",
      "opts": [
        "They make fewer seeds because fewer bees visit them",
        "They make more seeds because they face less competition",
        "They are unaffected because wind carries their pollen",
        "They are unaffected because only the bush was cleared"
      ],
      "why": "Clearing the bush removes the bees' habitat, so fewer bees are left to pollinate the wildflowers. With less pollination, the wildflowers are likely to make fewer seeds. The wildflowers themselves were not cleared, but they still depend on the bees, so losing the bees affects them.",
      "clue": "Think about what the flowers need the bees to do."
    }
  },
  "sci-fire-management-by-first": {
    "title": "Fire management by First Nations Australians",
    "card": [
      "For tens of thousands of years, First Nations Australians have used planned burning to care for Country: the land, waters, plants and animals they belong to.",
      "Cool burning uses small, slow, low fires lit at chosen times of year. They clear dry grass and leaf litter but usually spare the tree canopy.",
      "Burning small patches at different times leaves a mosaic, a patchwork of freshly burnt, regrowing and long-unburnt areas. Different plants and animals live in each, so the mosaic shapes where they live.",
      "Cool burns also use up fuel, so later fires are less likely to become large, hot bushfires that harm many living things."
    ],
    "remember": "Planned cool burns make a patchwork of habitats and leave less fuel for big fires.",
    "a": {
      "q": "How does burning small patches at different times affect where animals live?",
      "opts": [
        "It makes a mix of habitats, each suiting different animals",
        "It makes most animals gather in the freshly burnt patches",
        "It mainly suits animals that need long-unburnt bush",
        "It spreads the same animals evenly across the patches"
      ],
      "why": "Patches burnt at different times are at different stages, freshly burnt, regrowing or long unburnt, and different animals live in each. So animals do not all crowd into the fresh patches or the old bush, and the same animals are not found everywhere.",
      "clue": "Do the same animals live in every kind of patch?"
    },
    "b": {
      "d": 3,
      "q": "A property has had no planned burning for 15 years, and dry grass and leaf litter have built up. What is most likely?",
      "opts": [
        "A later fire burns hotter and spreads more widely",
        "Fires become less likely, as nothing is burnt",
        "Animals that need freshly burnt ground do better",
        "More kinds of habitat form across the property"
      ],
      "why": "With no cool burns, dry grass and leaf litter build up as fuel, so a later fire is likely to burn hotter and spread further. Fires do not become less likely, because the fuel is still there to catch alight.",
      "clue": "What does the built-up dry grass become?"
    }
  },
  "sci-we-have-seasons": {
    "title": "Why we have seasons",
    "card": [
      "The Earth spins on an axis, an imaginary line through the North and South Poles. The axis is tilted. It always points the same way in space as the Earth travels around the sun once a year.",
      [
        "Summer",
        "the hemisphere tilted towards the sun gets more direct sunlight, so the same light falls on a smaller area and is more concentrated. Its days are also longer. Both of these make it warmer."
      ],
      [
        "Winter",
        "the hemisphere tilted away from the sun gets less direct, more spread out sunlight and shorter days. Both of these make it cooler."
      ],
      "The two hemispheres take turns through the year, so when it is summer in Australia it is winter in the northern hemisphere. Seasons are caused by the tilt, not by the Earth's distance from the sun."
    ],
    "remember": "The tilt means each hemisphere takes turns facing the sun more directly.",
    "a": {
      "q": "Why is it summer in Perth when the southern hemisphere is tilted towards the sun?",
      "opts": [
        "Its sunlight is more concentrated and its days are longer",
        "Its sunlight is more spread out and its days are shorter",
        "Its sunlight is more concentrated but its days are shorter",
        "Its sunlight is more spread out but its days are longer"
      ],
      "why": "Tilting towards the sun makes the light fall more directly, so it is more concentrated, and it also makes the days longer. Both work together to warm Perth. The options with shorter days or spread out light mix in a winter effect, which comes from tilting away.",
      "clue": "Tilting towards the sun warms a place in two ways."
    },
    "b": {
      "d": 3,
      "q": "Mei lives in Hobart. She says it is December there and her cousin in Canada is wearing a heavy coat. What best explains this?",
      "opts": [
        "Each hemisphere is tilted towards the sun at opposite times",
        "Canada is always further from the sun than Tasmania is",
        "The Earth's axis tilts back and forth during each month",
        "The sun only shines on one hemisphere at a time"
      ],
      "why": "In December the southern hemisphere is tilted towards the sun, so Hobart has summer. The northern hemisphere is tilted away, so Canada has winter. Distance is not the reason: seasons come from the tilt, not from how far a place is from the sun.",
      "clue": "When one hemisphere tilts towards the sun, what does the other do?"
    }
  },
  "sci-phases-moon": {
    "title": "Phases of the moon",
    "card": [
      "The moon does not make its own light. It shines because its surface reflects sunlight.",
      "The sun always lights half of the moon, the half facing it. The other half is dark.",
      "As the moon orbits the Earth, we see a different amount of its lit half. The full cycle of phases takes about 29.5 days, roughly a month.",
      "At new moon we see almost none of the lit half. At full moon we see all of it. The shape then shrinks back to new moon, and the cycle repeats."
    ],
    "remember": "The moon's phases come from how much of its lit half we can see as it orbits.",
    "a": {
      "q": "What causes the moon to change from a thin crescent to a full moon over about two weeks?",
      "opts": [
        "We see more of the moon's lit half as it orbits",
        "The Earth's shadow covers less of the moon",
        "The moon makes more light as it moves",
        "The sun lights more of the moon's surface"
      ],
      "why": "The sun always lights half of the moon. As the moon orbits, we see more of that lit half from Earth. Earth's shadow is not the cause of phases, and the moon makes no light of its own.",
      "clue": "Think about which half is lit and what we can see of it."
    },
    "b": {
      "d": 3,
      "q": "Priya watches the moon from her home in Darwin. On one night she sees a full moon. About how long until she sees the next full moon?",
      "opts": ["About a month", "About two weeks", "About a week", "About a year"],
      "why": "Full moon to full moon is one whole cycle of phases, which takes about 29.5 days, roughly a month. After about two weeks she would be halfway through the cycle and see a new moon, not a full one.",
      "clue": "Going from full moon back to full moon is one whole cycle."
    }
  },
  "sci-solar-lunar-eclipses": {
    "title": "Solar and lunar eclipses",
    "card": [
      "An eclipse happens when one object in space casts its shadow on another. The sun, Earth and moon must line up almost in a straight line.",
      [
        "Solar eclipse",
        "The moon passes between the sun and Earth. The moon's shadow falls on part of the Earth, and the sun is blocked from view for people in that shadow."
      ],
      [
        "Lunar eclipse",
        "The Earth is between the sun and the moon. The Earth's shadow falls on the moon, so the moon looks dim and often reddish."
      ],
      "A solar eclipse can only be seen from the part of Earth that the moon's shadow touches. A lunar eclipse can be seen by anyone on the night side of Earth, where the moon is above the horizon."
    ],
    "remember": "Solar: the moon blocks the sun. Lunar: Earth's shadow covers the moon.",
    "a": {
      "q": "During an eclipse, the Earth's shadow falls on the moon. What kind of eclipse is this, and what is the order of the three bodies?",
      "opts": [
        "Lunar eclipse, with Earth between the sun and moon",
        "Lunar eclipse, with the moon between the sun and Earth",
        "Solar eclipse, with Earth between the sun and moon",
        "Solar eclipse, with the moon between the sun and Earth"
      ],
      "why": "A lunar eclipse is when the moon is darkened by Earth's shadow, so Earth must sit between the sun and the moon. The moon sitting between the sun and Earth is a real arrangement, but it makes a solar eclipse, where the moon's shadow falls on Earth.",
      "clue": "Which object is casting the shadow, and which is receiving it?"
    },
    "b": {
      "d": 3,
      "q": "Priya in Perth sees the moon pass in front of the sun and block its light. Her cousin in Darwin sees the sun as normal. What best explains this?",
      "opts": [
        "The moon's shadow covers only part of the Earth",
        "The Earth's shadow covers only part of the moon",
        "The moon's shadow covers the whole day side of Earth",
        "The Earth's shadow covers the whole night side of Earth"
      ],
      "why": "This is a solar eclipse, and the moon's shadow is small, so it touches only part of the Earth. Only people in that shadow see the sun blocked. The Earth's shadow is involved in lunar eclipses, not in this case.",
      "clue": "Think about which shadow is falling on the Earth, and how much of it that shadow covers."
    }
  },
  "sci-tides": {
    "title": "Tides",
    "card": [
      "Tides are the regular rise and fall of the ocean's level. High tide is when the water is at its highest and low tide is when it is at its lowest.",
      "The moon's gravity pulls on the Earth's oceans. This makes the water bulge out on the side facing the moon and on the opposite side. These bulges are high tides.",
      "The sun's gravity also affects the oceans. It has a smaller effect on tides than the moon, because the sun is much further away. As the Earth turns, a place moves through the bulges and the lower water between them, so most coasts get high and low tides each day.",
      [
        "Spring tide",
        "a tide with a very high high tide and a very low low tide. It happens when the sun and moon line up with the Earth, so their effects on the oceans add together. It has nothing to do with the season of spring."
      ]
    ],
    "remember": "The moon has the biggest effect on tides. When the sun and moon line up, their effects combine to make spring tides.",
    "a": {
      "q": "What is the main cause of the ocean's tides?",
      "opts": [
        "The pull of the moon's gravity on the oceans",
        "The pull of the sun's gravity on the oceans",
        "Winds blowing the water towards the coast",
        "The Earth's tilt as it moves around the sun"
      ],
      "why": "The moon's gravity makes the oceans bulge, and these bulges are high tides. The sun's gravity also affects tides, but its effect is smaller because the sun is much further away.",
      "clue": "Which object has the bigger effect because it is much closer?"
    },
    "b": {
      "d": 3,
      "q": "At a beach in Broome, the sun, Earth and moon are lined up and the tide range is the biggest of the month. What type of tide is this?",
      "opts": [
        "A spring tide, because the sun and moon's effects combine",
        "A spring tide, because it happens in the season of spring",
        "A weak tide, because the sun works against the moon",
        "A weak tide, because the sun's pull cancels the moon's"
      ],
      "why": "When the sun and moon line up with the Earth, their effects on the oceans add together. This gives a very high high tide and a very low low tide, called a spring tide. The name does not come from the season of spring.",
      "clue": "Think about what lining up does to the sun's and moon's effects."
    }
  },
  "sci-first-nations-australians-knowledge": {
    "title": "First Nations knowledge of the sky",
    "card": [
      "First Nations Australians have watched the sky for tens of thousands of years. They pass this knowledge on through stories, songs and ceremony.",
      "They use the moon's phases, the positions of stars and signs in nature to track time. These work like a calendar.",
      "The calendars help people predict tides, seasons and when foods are ready to gather. Different Nations have their own calendars, based on their Country, and many have more than four seasons.",
      "Seasonal signs can include plants flowering, animals breeding or a change in the wind. Seasons follow these signs, not fixed dates. When a sign appears, people know it is time for a task, such as gathering a food."
    ],
    "remember": "Sky and seasonal signs act as calendars that help people predict tides, seasons and foods.",
    "a": {
      "q": "Which statement best describes how First Nations calendars work?",
      "opts": [
        "Signs in the sky and nature mark when to do tasks",
        "Every Nation shares the same calendar across Australia",
        "Every year is split into four equal seasons by date",
        "Each season starts on the same date every year"
      ],
      "why": "First Nations calendars are read from signs, such as the moon, stars or a plant flowering, which show when it is time for a task. They are not set by fixed dates, and different Nations have their own calendars based on their Country, often with more than four seasons.",
      "clue": "Does a season start on a date or when something happens?"
    },
    "b": {
      "d": 2,
      "q": "In one Nation, an elder says a certain tree flowering means a fish is ready to catch. What is the flowering being used as?",
      "opts": [
        "A seasonal sign in a calendar",
        "A fixed date set for fishing",
        "A way to measure the moon's phase",
        "A record of how old the tree is"
      ],
      "why": "The flowering is a sign in nature that tells people when a food is ready, so it works as part of a calendar. It is not a fixed date, because seasons follow signs like this rather than set days, and it does not show the moon's phase.",
      "clue": "Which option is about telling the time of year?"
    }
  },
  "sci-force": {
    "title": "What a force is",
    "card": [
      "A force is a push or a pull on an object. Kicking a ball is a push. Pulling open a door is a pull.",
      "A force is not the same as movement. The ball rolling away after the kick is its motion, not a force.",
      "Force is measured in newtons, written N. A force meter (also called a spring balance) measures it.",
      "A force arrow shows a force in a diagram. It starts on the object. Its length shows the size of the force, and where it points shows the direction."
    ],
    "remember": "A force is a push or a pull. Its size is in newtons, and its arrow shows size and direction.",
    "a": {
      "q": "Which of these is a force acting on a shopping trolley?",
      "opts": [
        "A shopper pushing the trolley along an aisle",
        "The trolley rolling along an aisle on its own",
        "The trolley moving quickly along an aisle",
        "The trolley travelling 10 metres along an aisle"
      ],
      "why": "The shopper's push acts on the trolley, so it is a force. Rolling, moving quickly and travelling 10 metres describe how the trolley moves. Movement is not a push or a pull being applied.",
      "clue": "Is something acting on the trolley, or is it only moving?"
    },
    "b": {
      "d": 2,
      "q": "Sam draws two force arrows on a diagram. Arrow X is 4 cm long and arrow Y is 2 cm long, and both point right. What does this show?",
      "opts": [
        "The force for X is bigger than for Y, in the same direction",
        "The force for Y is bigger than for X, in the same direction",
        "The forces are equal, but X acts for a longer time",
        "The forces are equal in size, but point in opposite ways"
      ],
      "why": "Arrow length shows the size of a force, so the longer arrow X is the bigger force. Both arrows point right, so both forces act in the same direction. A longer arrow means a bigger force, not a longer time.",
      "clue": "Length shows size, and the point shows direction."
    }
  },
  "sci-balanced-unbalanced-forces": {
    "title": "Balanced and unbalanced forces",
    "card": [
      "Several forces can act on an object at once. What matters is the total effect of all of them together.",
      [
        "Balanced forces",
        "forces that are equal in size and opposite in direction, so they cancel out. An object at rest stays still, and a moving object keeps moving at the same speed in the same direction."
      ],
      [
        "Unbalanced forces",
        "forces that do not cancel out. The object starts moving, stops, speeds up, slows down or changes direction."
      ],
      "A book resting on a table stays still because the push of the table up on the book balances the pull of gravity down. A bigger force one way than the other makes the forces unbalanced."
    ],
    "remember": "Balanced forces cancel and the motion stays the same. Unbalanced forces change the motion.",
    "a": {
      "q": "A cyclist rides along a flat path at a steady speed in a straight line. What can be said about the forces on the bike?",
      "opts": [
        "They are balanced, so the motion does not change",
        "They are unbalanced, so the bike keeps moving",
        "They are balanced, so the bike must slow to a stop",
        "They are unbalanced, so the bike is speeding up"
      ],
      "why": "A steady speed in a straight line means the motion is not changing, so the forces cancel out. Many students think a moving object needs unbalanced forces to keep going, but unbalanced forces would change the speed or direction.",
      "clue": "Is the speed or direction of the bike changing?"
    },
    "b": {
      "d": 3,
      "q": "Two teams pull on opposite ends of a rope with equal force, and the rope does not move. Team A then pulls with a bigger force while Team B stays the same. What happens to the rope?",
      "opts": [
        "It moves towards Team A because the forces are unbalanced",
        "It stays still because the forces are still balanced",
        "It moves towards Team B because the forces are unbalanced",
        "It stays still because the forces are unbalanced"
      ],
      "why": "At first the equal, opposite pulls cancel, so the rope stays still. When Team A pulls harder the forces no longer cancel, so the rope starts to move in the direction of the bigger force, towards Team A. Team B's pull is smaller, so the rope does not go that way.",
      "clue": "Which team now has the bigger pull?"
    }
  },
  "sci-mass-effect-force": {
    "title": "Mass and the effect of a force",
    "card": [
      "Mass is the amount of matter in an object. A heavy object has more mass than a light one.",
      "If the same force is applied to a light object and a heavy one, the light object changes its motion more. It speeds up, slows down or turns by a bigger amount.",
      "A heavier object resists changes to its motion more. It needs a bigger force to start moving, or to stop in the same distance or time.",
      "For example, an empty shopping trolley is easy to get moving and easy to stop. The same trolley full of groceries needs a bigger push to start and a bigger force to stop."
    ],
    "remember": "The more mass an object has, the more force it needs to change its motion.",
    "a": {
      "q": "Two students give a football and a bowling ball the same push along a smooth floor. Which result is expected?",
      "opts": [
        "The football speeds up more than the bowling ball",
        "The bowling ball speeds up more than the football",
        "Both speed up by exactly the same amount",
        "Only the football moves, as the bowling ball stays still"
      ],
      "why": "The football has less mass, so the same push changes its motion more. The bowling ball option is tempting because it is heavier, but a heavier object changes its motion less for the same force.",
      "clue": "Which object has less mass?"
    },
    "b": {
      "d": 2,
      "q": "Jess pushes an empty wheelie bin along her driveway in Hobart. She then fills it with bricks. It is now rolling at the same speed as before. What force is needed to stop it in the same distance?",
      "opts": [
        "A bigger force, because the bin now has more mass",
        "A smaller force, because the bin is now heavier",
        "The same force, because the speed has not changed",
        "No force, because the bin will stop by itself"
      ],
      "why": "The full bin has more mass, so it resists changes to its motion more. A bigger force is needed to stop it in the same distance. The same force option is tempting because the speed is the same, but the mass is not.",
      "clue": "Think about what filling the bin with bricks changes."
    }
  },
  "sci-gravity-mass-weight": {
    "title": "Gravity, mass and weight",
    "card": [
      "Gravity is a pulling force between any two objects that have mass. The more mass an object has, the stronger its pull. Earth is so massive that its pull on us is easy to notice.",
      [
        "Mass",
        "the amount of matter in an object. It is measured in kilograms (kg) and stays the same wherever the object is."
      ],
      [
        "Weight",
        "the force of gravity on an object from Earth, the Moon or another body. It is measured in newtons (N) and pulls towards the centre of that body. More mass means more weight."
      ],
      "The Moon has less mass than Earth, so its gravity is weaker. An astronaut has the same mass on the Moon as on Earth, but a smaller weight."
    ],
    "remember": "Mass is how much matter there is. Weight is the pull of gravity on it.",
    "a": {
      "q": "An astronaut travels from Earth to the Moon. What happens to her mass and her weight?",
      "opts": [
        "Mass stays the same and weight gets smaller",
        "Mass gets smaller and weight stays the same",
        "Both mass and weight stay the same",
        "Both mass and weight get smaller"
      ],
      "why": "Mass is the amount of matter in her body, and that does not change with place. Weight is the pull of gravity, and the Moon's pull is weaker than Earth's. Saying that both get smaller mixes up mass with weight.",
      "clue": "Which one depends on the pull of gravity where she is?"
    },
    "b": {
      "d": 3,
      "q": "Liam has a rock with a mass of 2 kg. He hangs it from a force meter on Earth, then takes it to the Moon. Which statement is correct?",
      "opts": [
        "The reading is less on the Moon and the mass is still 2 kg",
        "The reading is less on the Moon because the mass is smaller",
        "The reading is the same on both because the mass is 2 kg",
        "The reading is more on the Moon and the mass is still 2 kg"
      ],
      "why": "A force meter measures weight, which is the pull of gravity. The Moon's gravity is weaker, so the reading is smaller. The rock has the same amount of matter, so its mass stays 2 kg. The option saying the mass is smaller is tempting but confuses mass with weight.",
      "clue": "A force meter measures a force, not the amount of matter."
    }
  },
  "sci-simple-machines": {
    "title": "Simple machines",
    "card": [
      "A simple machine is a tool that makes a job easier by changing the size or the direction of the force you need to use.",
      [
        "Lever",
        "a rigid bar that turns around a fixed point called the pivot. A crowbar lets you lift a heavy rock with a small push."
      ],
      [
        "Pulley",
        "a wheel with a rope around it. A single fixed pulley on a flagpole changes the direction of the force, so you pull down to raise the flag."
      ],
      [
        "Inclined plane",
        "a ramp. Pushing a heavy box up a ramp takes less force than lifting it straight up, though the box travels a longer path."
      ]
    ],
    "remember": "Simple machines change the size or direction of the force needed for a job.",
    "a": {
      "q": "Sam pulls down on a rope over a fixed pulley to raise a bucket. How does the pulley help?",
      "opts": [
        "It changes the direction of the force",
        "It makes the bucket lighter",
        "It turns the pull into a push",
        "It makes the bucket's path shorter"
      ],
      "why": "The rope runs over the wheel, so a downward pull lifts the bucket upward. The bucket does not become lighter, and a single fixed pulley does not shorten the path.",
      "clue": "Think about which way Sam pulls and which way the bucket moves."
    },
    "b": {
      "d": 2,
      "q": "Priya needs to get a heavy barrel onto a truck tray. She rolls it up a plank instead of lifting it. Which simple machine is the plank, and how does it help?",
      "opts": [
        "An inclined plane, so she needs less force",
        "A lever, so she needs less force",
        "An inclined plane, so the barrel travels a shorter path",
        "A pulley, so she pushes in a different direction"
      ],
      "why": "A plank leaning from the ground to the truck is a ramp, which is an inclined plane. Rolling the barrel up it takes less force than lifting it, but the barrel travels a longer path, so the option about a shorter path is wrong.",
      "clue": "Picture the shape the plank makes between the ground and the tray."
    }
  },
  "sci-particle-theory-matter": {
    "title": "The particle theory of matter",
    "card": [
      "All matter is made of tiny particles. Matter is anything that takes up space and has mass.",
      "The particles are always moving. They never stop, even in a solid that looks still.",
      "The particles attract each other. This pull holds them together.",
      "There is space between the particles. The particles are the matter, and the gaps between them are empty."
    ],
    "remember": "Matter is made of tiny moving particles that attract each other and have space between them.",
    "a": {
      "q": "A steel spoon lies on a bench and does not move. What does the particle theory say about the particles in the spoon?",
      "opts": [
        "They keep moving, even though the spoon looks still",
        "They are still, because the spoon is not moving at all",
        "They start moving only when the spoon is heated up",
        "They start moving only when someone picks up the spoon"
      ],
      "why": "The theory says particles are always moving, so the particles in the spoon move even though the spoon looks still. Saying they move only when heated is tempting, but the card says the movement never stops.",
      "clue": "Look at what the card says about how long particles move."
    },
    "b": {
      "d": 2,
      "q": "Sam says a drop of water is one smooth piece, with nothing at all between its parts. Which idea from the particle theory shows he is wrong?",
      "opts": [
        "There is space between the particles of water",
        "The particles of water have stopped moving",
        "Water is not made of particles at all",
        "The particles of water do not attract each other"
      ],
      "why": "The theory says there is space between the particles, so water is not one smooth piece with nothing between its parts. The idea that the particles do not attract is wrong, because the theory says they pull on each other.",
      "clue": "Sam's claim is about how the water is built, not how it moves."
    }
  },
  "sci-solids-liquids-gases": {
    "title": "Solids, liquids and gases",
    "card": [
      [
        "Solid",
        "The particles are packed close together in a fixed pattern. They vibrate in place but do not move past each other."
      ],
      [
        "Liquid",
        "The particles are close together but not in a fixed pattern. They slide past each other, so a liquid can flow and take the shape of its container."
      ],
      [
        "Gas",
        "The particles are far apart and move freely in all directions. A gas spreads out to fill its container."
      ],
      "Because gas particles have a lot of space between them, they can be pushed closer together. This is why a gas can be squashed. Solid and liquid particles are already close, so they are very hard to squash."
    ],
    "remember": "Solid and liquid particles are both close: a solid's stay in a fixed pattern, a liquid's slide. Gas particles are far apart.",
    "a": {
      "q": "Which sentence correctly describes the particles in a liquid?",
      "opts": [
        "They are close together and slide past each other",
        "They are close together and vibrate in a fixed place",
        "They are far apart and move freely in all directions",
        "They are far apart and slide past each other slowly"
      ],
      "why": "Liquid particles are close together but can slide past each other, which lets a liquid flow. Vibrating in a fixed place describes a solid, because solid particles cannot move past their neighbours.",
      "clue": "Think about what lets a liquid be poured."
    },
    "b": {
      "d": 3,
      "q": "Zoe pushes the plunger of a sealed syringe. The syringe full of air can be squashed a lot, but one full of water hardly changes. Why?",
      "opts": [
        "Air particles are far apart, so they can be pushed closer",
        "Air particles are smaller, so they take up less room",
        "Water particles are far apart, so they cannot be pushed",
        "Water particles vibrate in place, so they are packed tighter"
      ],
      "why": "Gas particles have a lot of space between them, so pushing the plunger moves them closer together. Water particles are already close together, so there is little space to squash into. Particle size is not the reason, and vibrating in place describes a solid, not a liquid.",
      "clue": "Compare how much space is between the particles in each."
    }
  },
  "sci-changes-state": {
    "title": "Changes of state",
    "card": [
      "A change of state happens when a substance gains or loses heat energy. The particles stay the same. Only their movement and spacing change.",
      [
        "Melting and boiling",
        "Adding heat makes particles move faster and spread out. A solid melts into a liquid, and a liquid boils into a gas."
      ],
      [
        "Condensing and freezing",
        "Losing heat slows particles down and usually brings them closer together, so a gas condenses and a liquid freezes. Water is unusual: ice particles sit slightly further apart than in liquid water, which is why ice floats."
      ],
      "Water melts and freezes at 0 °C. It boils at 100 °C at sea level, but water vapour can condense at lower temperatures, such as on a cold window."
    ],
    "remember": "Heat in speeds particles up. Heat out slows them down.",
    "a": {
      "q": "Steam touches a cold window and turns into drops of water. What happens to the water particles?",
      "opts": [
        "They lose heat, slow down and move closer together",
        "They gain heat, speed up and move further apart",
        "They lose heat, speed up and move closer together",
        "They gain heat, slow down and move further apart"
      ],
      "why": "Steam turning to liquid is condensing, which happens when heat is lost. The particles slow down and come closer together. Gaining heat would make them speed up and spread out, which is what happens in boiling.",
      "clue": "Condensing is a gas becoming a liquid. Is heat added or lost?"
    },
    "b": {
      "d": 3,
      "q": "Liam heats a block of wax in a pan. It becomes a runny liquid. Which statement best explains this?",
      "opts": [
        "The wax particles gained heat, moved faster and spread out",
        "The wax particles gained heat and changed into new particles",
        "The wax particles lost heat and slid past each other",
        "The wax particles gained heat and became larger in size"
      ],
      "why": "Heat makes the particles move faster and spread out, so the solid melts. The particles themselves do not change or grow, because a change of state only changes movement and spacing. Losing heat would keep the wax solid, not turn it into a liquid.",
      "clue": "The particles stay the same. Think about what heat changes."
    }
  },
  "sci-diffusion": {
    "title": "Diffusion",
    "card": [
      "Diffusion is the spreading of particles from where there are many to where there are few. It happens because particles keep moving and bump into each other.",
      "Diffusion carries on until the particles are spread out evenly. The particles do not stop moving when this happens.",
      "Diffusion is faster in gases than in liquids. Gas particles are far apart and move freely, so they spread out more quickly.",
      "Diffusion is faster when the substance is warmer. Warm particles move faster, so they spread sooner."
    ],
    "remember": "Moving particles spread out to places where there are fewer, and heat speeds this up.",
    "a": {
      "q": "A drop of food dye is placed in a glass of still water. Why does the colour slowly spread through the water?",
      "opts": [
        "Dye particles keep moving and spread to where there are few",
        "Dye particles stop moving and settle through the water",
        "Water particles push the dye particles up towards the top",
        "Dye particles melt into the water and become much smaller"
      ],
      "why": "Dye particles are always moving, so they spread from the crowded drop to places where there are few. The idea that particles stop is wrong, because they keep moving even after the colour looks even.",
      "clue": "Think about what particles are always doing."
    },
    "b": {
      "d": 2,
      "q": "Liam opens a bottle of perfume at one end of a room. Which change would make the smell reach the other end sooner?",
      "opts": [
        "Warming the room, so the particles move faster",
        "Cooling the room, so the particles move slower",
        "Chilling the perfume, so its particles stop moving",
        "Closing the bottle, so fewer particles escape"
      ],
      "why": "Warmer particles move faster, so diffusion is faster and the smell spreads sooner. Cooling the room does the opposite, because the particles move more slowly. Particles never stop moving, and chilling would only slow them.",
      "clue": "What does heat do to the speed of particles?"
    }
  },
  "sci-pure-substances-mixtures": {
    "title": "Pure substances and mixtures",
    "card": [
      [
        "Pure substance",
        "It has only one kind of particle. Distilled water is pure, because every particle in it is a water particle."
      ],
      [
        "Mixture",
        "It has two or more substances mixed together but not joined. Each substance keeps its own properties."
      ],
      "Because the substances in a mixture are not joined, they can be separated by physical means. Examples are sieving, picking out pieces or filtering.",
      "A pure substance cannot be split into other substances by physical means. Air, sea water and soil are mixtures."
    ],
    "remember": "Pure: one kind of particle. Mixture: two or more, and a physical method can separate them.",
    "a": {
      "q": "Which of these is a pure substance?",
      "opts": ["A sample of distilled water", "A glass of sea water", "A spoonful of garden soil", "A sample of clean air"],
      "why": "Distilled water has only one kind of particle, so it is pure. Sea water has salt mixed in with the water, so it is a mixture even though it looks clear.",
      "clue": "Look for the one with only one kind of particle."
    },
    "b": {
      "d": 3,
      "q": "Liam stirs sand and iron filings together in a dish. He then pulls the iron out with a magnet. What does this show about the sand and iron?",
      "opts": [
        "A mixture formed, so a physical method can separate it",
        "A pure substance formed, so a magnet can separate it",
        "They were joined, so the magnet broke them apart",
        "A mixture formed, so only a chemical change can split it"
      ],
      "why": "The sand and iron were only mixed, not joined, so a magnet could pull them apart. This is a physical method. Stirring did not make a pure substance, because two kinds of particle were still present.",
      "clue": "Did stirring join the two substances or only mix them?"
    }
  },
  "sci-solutions-solutes-solvents": {
    "title": "Solutions, solutes and solvents",
    "card": [
      "A solution is a mixture in which one substance dissolves in another and spreads out evenly. You cannot see separate parts in it.",
      ["Solute", "the substance that dissolves, such as salt in salty water."],
      ["Solvent", "the substance that does the dissolving, such as the water in salty water."],
      "Water dissolves so many substances, including some gases such as oxygen, that it is called the universal solvent. This does not mean it dissolves everything."
    ],
    "remember": "Solute + solvent = solution. Water dissolves a lot, so it is the universal solvent.",
    "a": {
      "q": "Ava stirs cordial powder into cold water until she can no longer see it. In this solution, which is the solvent?",
      "opts": ["The water", "The cordial powder", "The finished cordial", "The colour in the drink"],
      "why": "The water does the dissolving, so it is the solvent. The powder is the solute, because it is the substance that dissolves, so picking it reverses the two roles. The finished cordial is the whole solution.",
      "clue": "Which substance dissolves the other one?"
    },
    "b": {
      "d": 3,
      "q": "Noah reads that water is called the universal solvent. Which statement explains the name correctly?",
      "opts": [
        "It dissolves a great many substances, though not all",
        "It dissolves almost every solid, though not any gases",
        "It is found in most places on Earth, so it is common",
        "It dissolves every substance if stirred long enough"
      ],
      "why": "Water is called the universal solvent because it dissolves so many substances, but it does not dissolve everything. It also dissolves some gases, such as oxygen, so the option about no gases is wrong. The name is about dissolving, not about where water is found.",
      "clue": "The name comes from what water does to other substances."
    }
  },
  "sci-filtration-decanting": {
    "title": "Filtration and decanting",
    "card": [
      [
        "Filtration",
        "a way to separate an undissolved solid from a liquid. The mixture is poured through filter paper, which has tiny holes. The liquid passes through and the solid particles are caught."
      ],
      [
        "Filtrate and residue",
        "The liquid that passes through is the filtrate. The solid left on the paper is the residue."
      ],
      [
        "Decanting",
        "a way to pour a liquid off a solid that has settled to the bottom. The solid stays in the container."
      ],
      "Both methods separate an undissolved solid from a liquid. A dissolved solid is spread out as tiny particles in the liquid, so it is not caught by filter paper."
    ],
    "remember": "Filtration catches solids in paper. Decanting pours liquid off settled solid.",
    "a": {
      "q": "Sand and water are poured through filter paper in a funnel. What is left on the filter paper?",
      "opts": [
        "The sand, as the residue",
        "The water, as the filtrate",
        "The sand, as the filtrate",
        "The water, as the residue"
      ],
      "why": "The sand is an undissolved solid, so the holes in the paper are too small for it to pass. It stays on the paper as the residue. The water that passes through is the filtrate, so the option with water as the filtrate has the wrong substance on the paper.",
      "clue": "Which part of the mixture is too big to pass through the holes?"
    },
    "b": {
      "d": 3,
      "q": "Ravi stirs salt into a jug of water until it disappears. He then pours the jug through filter paper. What is most likely to happen?",
      "opts": [
        "The salt water passes through and no salt is caught",
        "The salt is caught on the paper as the residue",
        "The water is caught and only the salt passes through",
        "The salt settles so Ravi can decant the water off"
      ],
      "why": "The salt has dissolved, so it is spread through the water as tiny particles that pass through the holes in the paper. Nothing is caught. Filtering only catches undissolved solid, so the option about salt left as residue is wrong.",
      "clue": "Has the salt dissolved or is it still an undissolved solid?"
    }
  },
  "sci-evaporation-crystallisation": {
    "title": "Evaporation and crystallisation",
    "card": [
      "Evaporation can separate a dissolved solid from a solution. When the solution is heated, the solvent (the liquid) turns into a gas and escapes.",
      "The dissolved solid does not evaporate with the solvent, so it is left behind as a solid.",
      [
        "Crystallisation",
        "the solid forming crystals as the solvent leaves. The crystals are made of the dissolved solid, not the liquid."
      ],
      "Slow evaporation gives the particles more time to join in an orderly pattern, so larger crystals can form. Fast evaporation tends to give smaller crystals."
    ],
    "remember": "Evaporation removes the liquid and leaves the solid. Slower evaporation can give larger crystals.",
    "a": {
      "q": "A salt solution is heated in a dish until all the water is gone. What is left in the dish?",
      "opts": [
        "Solid salt, which stayed behind as the water evaporated",
        "Salt water, which has become more concentrated",
        "Solid salt, which formed from the water as it cooled",
        "Nothing, because the salt and water both evaporated"
      ],
      "why": "The water evaporates and escapes as a gas, but the dissolved salt does not. It stays in the dish as a solid. Saying that both evaporate is tempting, but only the solvent leaves.",
      "clue": "Which part of the solution turns into a gas?"
    },
    "b": {
      "d": 2,
      "q": "Jess leaves two identical dishes of copper sulfate solution. One sits in the sun, and one sits in a cool, shady spot. She wants the largest crystals. What should she do?",
      "opts": [
        "Use the dish in the shade, where evaporation is slower",
        "Use the dish in the sun, where evaporation is faster",
        "Use the dish in the sun, because heat joins particles faster",
        "Use either dish, because the crystals will be the same size"
      ],
      "why": "Slow evaporation gives the particles more time to settle into an orderly pattern, so larger crystals can form. The sunny dish loses its water faster, which tends to give smaller crystals.",
      "clue": "Think about which dish gives the particles more time."
    }
  },
  "sci-distillation-chromatography": {
    "title": "Distillation and chromatography",
    "card": [
      [
        "Distillation",
        "A liquid is boiled and its vapour is cooled in a condenser so it turns back into a liquid. The liquid collected is called the distillate."
      ],
      "Distillation can separate a solvent, such as water, from a solution. The dissolved solid stays behind in the flask, so the water is collected pure.",
      [
        "Chromatography",
        "A spot of a mixture of dissolved substances, such as the dyes in an ink, is placed near the bottom of a strip of paper. The bottom edge is then dipped in a solvent."
      ],
      "The solvent moves up the paper and carries the substances with it. Each substance travels a different distance, so they spread out into separate spots or bands. A single substance makes only one spot."
    ],
    "remember": "Distillation collects a pure liquid from vapour. Chromatography spreads dissolved substances out on paper.",
    "a": {
      "q": "Salty water is boiled and the vapour is cooled in a condenser. What is collected in the cup at the end?",
      "opts": [
        "Pure water, with the salt left in the flask",
        "Salty water, with less salt than before",
        "Salt crystals, with the water left in the flask",
        "Steam, with the salt left in the flask"
      ],
      "why": "Only the water boils off and condenses, so the distillate is pure water. Collecting salt crystals is wrong because the salt stays behind in the flask and is not carried over in the vapour. It is not steam, because the condenser cools the vapour back into a liquid.",
      "clue": "Think about what turns to vapour and what stays in the flask."
    },
    "b": {
      "d": 2,
      "q": "Mia dips paper with a spot of black ink into water. The ink splits into a yellow band and a blue band. What does this show?",
      "opts": [
        "The black ink is a mixture of dyes",
        "The black ink is one pure substance",
        "The blue and yellow dyes are the same substance",
        "The paper has made new dyes from the ink"
      ],
      "why": "The ink separated into two bands that travelled different distances, so it contains at least two dyes. It is not one substance, because a single substance makes only one spot. The paper only separates the dyes and does not make new ones.",
      "clue": "How many spots would a single substance make?"
    }
  },
  "sci-choosing-separation-method": {
    "title": "Choosing a separation method",
    "card": [
      "To separate a mixture, look for a property that is different in each part. Then choose the method that uses that difference.",
      [
        "Particle size",
        "if a solid is too big to pass through paper or a sieve, use filtration or sieving. Dissolved particles are too small to be caught, so they pass through."
      ],
      [
        "Density",
        "a heavier solid can settle so the liquid is poured off, called decanting. In yandying, First Nations Australians shake seeds in a wooden dish called a coolamon, so light husks separate from heavier seeds."
      ],
      [
        "Solubility and boiling point",
        "evaporation recovers a dissolved solid, but the water escapes into the air. Distillation boils off the liquid with the lower boiling point and cools the vapour to collect it."
      ]
    ],
    "remember": "Find the property that differs, then pick the method that uses it.",
    "a": {
      "q": "Sand is mixed with small pebbles. The pebbles are too big to fit through the holes of a sieve, but the sand fits. Which property is used to separate them?",
      "opts": ["Particle size", "Boiling point", "Solubility in water", "Density in a liquid"],
      "why": "The sieve holds back the larger pebbles and lets the smaller sand pass, so the difference in particle size is used. Boiling point and solubility are not involved because nothing is heated or dissolved.",
      "clue": "What does the sieve do to big pieces compared with small ones?"
    },
    "b": {
      "d": 3,
      "q": "Priya has a jar of salty water. She wants to collect the pure water, not just the salt. Which method suits this best?",
      "opts": [
        "Distillation, as water boils at a lower temperature",
        "Filtration, as salt is too large to pass through paper",
        "Evaporation, as the water vapour is caught and kept",
        "Decanting, as the salt sinks to the bottom of the jar"
      ],
      "why": "Distillation boils the water and cools the vapour so it can be collected. Plain evaporation keeps the salt but lets the water escape into the air. Filtration and decanting fail because dissolved salt neither gets caught by paper nor settles.",
      "clue": "Which method collects the liquid rather than losing it to the air?"
    }
  },
  "sci-new-evidence-changes-science": {
    "title": "How new evidence changes science",
    "card": [
      "Scientific ideas are based on the evidence we have at the time. They can be explained, tested and checked by others.",
      "New evidence can show that an idea is incomplete or wrong. Scientists may then change the idea so that it fits all the evidence.",
      "New tools can produce new evidence. Better microscopes let people see living things that were too small to see before, such as bacteria.",
      "A change in a scientific idea does not mean science failed. It shows that science responds to evidence."
    ],
    "remember": "When new evidence or tools appear, scientists can change an idea to fit it.",
    "a": {
      "q": "Why might a scientific idea about living things change?",
      "opts": [
        "New evidence shows the old idea does not fit",
        "A new scientist has taken over the research",
        "The old idea has been around for a long time",
        "Most people have stopped liking the old idea"
      ],
      "why": "Scientific ideas are judged against evidence, so evidence that does not fit an idea can lead to a change. Age or popularity does not decide whether an idea is kept.",
      "clue": "Think about what scientific ideas are based on."
    },
    "b": {
      "d": 3,
      "q": "Aiden and Priya look at the same drop of pond water at the same time. Aiden's simple microscope shows nothing living. Priya's stronger microscope shows tiny organisms moving. What is the best conclusion?",
      "opts": [
        "Living things were there but too small for Aiden to see",
        "Aiden's result proves no living things were in the drop",
        "The living things only formed once Priya started looking",
        "Aiden's simple microscope gave the more accurate result"
      ],
      "why": "Both looked at the same drop at the same time, so the drop did not change. Priya's stronger microscope showed organisms that were too small for Aiden's to show. Aiden's result does not prove nothing was there, because it only shows what his weaker microscope could reveal.",
      "clue": "The drop was the same. What was different?"
    }
  },
  "sci-culture-scientific-knowledge": {
    "title": "Culture and scientific knowledge",
    "card": [
      "People in every culture have built knowledge of the natural world. Much of it comes from careful observation over a very long time.",
      "First Nations Australians have lived on and cared for Country for tens of thousands of years. They hold detailed knowledge of plants, animals, seasons, weather and land.",
      "This knowledge is passed on through stories, songs, art and practice. Each generation checks it against what they see, and adds to it.",
      "Culture can shape what science studies. A community's knowledge and concerns can lead scientists to ask new questions, and the two can work together."
    ],
    "remember": "Many cultures build knowledge by long observation, and their views can shape the questions science asks.",
    "a": {
      "q": "An Aboriginal group knows that a certain plant flowering signals a change of season. Where did this knowledge most likely come from?",
      "opts": [
        "Watching Country closely over many generations",
        "Recording flowering dates for a single season",
        "Tests run in a university laboratory",
        "Books written by scientists from overseas"
      ],
      "why": "First Nations knowledge of seasons comes from close observation of Country, passed on and checked by each generation over a very long time. One season of records is too short to build this kind of knowledge, and it did not come from laboratories or overseas books.",
      "clue": "Think about how long people have lived on Country."
    },
    "b": {
      "d": 3,
      "q": "Scientists in northern Australia ask a local Aboriginal ranger group about the timing of seasons. The rangers' knowledge leads to a new study of when plants flower. What does this show?",
      "opts": [
        "A community's knowledge can shape what science studies",
        "Science questions come from labs, not from communities",
        "The rangers' knowledge makes the flowering study unneeded",
        "Cultural knowledge is a separate topic from science"
      ],
      "why": "The rangers' knowledge led scientists to ask a new question, so culture shaped what was studied. The study still went ahead, which shows the two working together rather than one making the other unneeded.",
      "clue": "Where did the idea for the flowering study come from?"
    }
  },
  "sci-weighing-scientific-solution": {
    "title": "Weighing a scientific solution",
    "card": [
      "A science-based solution to a problem can have effects beyond fixing the problem. People judge it by looking at four kinds of effect before it is used.",
      [
        "Ethical and environmental",
        "Ethical asks if it is right and fair, including how it treats animals and people. Environmental asks what it might do to living things, soil, water and air."
      ],
      [
        "Social and economic",
        "Social asks how it affects people and communities. Economic asks what it costs and who gains or loses money."
      ],
      "Cane toads were brought to Queensland in 1935 to eat beetles on sugar cane. They spread widely and poisoned native animals that ate them, which is an environmental effect."
    ],
    "remember": "A solution can be judged on all its effects, not only whether it fixes the problem.",
    "a": {
      "q": "Why do people check a solution's ethical, environmental, social and economic effects?",
      "opts": [
        "It can fix one problem but cause harm in other ways",
        "It can be judged on cost alone if it works well",
        "It can be used without checks if scientists made it",
        "It can only be checked once it is already in use"
      ],
      "why": "A solution can work on the problem and still cause harm in other ways, so all four kinds of effect are checked before it is used. Looking at cost alone would miss effects on people, animals and the environment.",
      "clue": "Think about what else a solution might change."
    },
    "b": {
      "d": 2,
      "q": "A council plans to bring a new insect into Tasmania to eat a weed. Scientists say it might also eat native plants. Which kind of effect is this?",
      "opts": ["An environmental effect", "An economic effect", "A social effect", "An ethical effect"],
      "why": "Harm to native plants is an effect on living things in the environment. It could also lead to costs or worries for people, but the effect described is on the plants themselves.",
      "clue": "Which effect is about plants and animals in nature?"
    }
  },
  "sci-science-communication": {
    "title": "Science communication",
    "card": [
      "Science communication is how science is shared with the public, in news stories, ads and social media posts.",
      "What people read can shape what they believe and what they do, such as whether they choose a product or follow health advice.",
      "It can also shape the rules governments make, because leaders and voters often rely on how science is reported.",
      "Good science communication is clear and based on evidence. A claim with no source, or one that leaves out how it was tested, is harder to trust."
    ],
    "remember": "How science is reported can shape beliefs and rules, so it should be clear and based on evidence.",
    "a": {
      "q": "Why should science be reported clearly and with evidence?",
      "opts": [
        "Reports shape what people believe and what rules are made",
        "Reports decide which experiments scientists carry out next",
        "Reports make sure that every claim in them is true",
        "Reports are only read by scientists and government leaders"
      ],
      "why": "Many people use reports to decide what to believe and do, and governments may use them when making rules. Clear, evidence-based reports help those choices. Reports do not make a claim true: the evidence has to be sound.",
      "clue": "Think about who reads reports and what they do next."
    },
    "b": {
      "d": 3,
      "q": "An ad for a drink says in large letters, \"Scientists say it boosts your brain!\" It names no study and gives no details. What is the best response?",
      "opts": [
        "Ask what evidence supports the claim before believing it",
        "Believe it, because the ad mentions scientists",
        "Ignore it, because ads can never use real science",
        "Believe it, because the words are in large letters"
      ],
      "why": "The ad gives no source or detail, so the claim cannot be checked. The best step is to ask for the evidence. Saying that ads can never use real science is also wrong: some ads do, so each claim should be judged on its evidence.",
      "clue": "Can you check a claim that names no study?"
    }
  },
  "sci-questions-predictions-hypotheses": {
    "title": "Questions, predictions and hypotheses",
    "card": [
      [
        "Investigable question",
        "a question you can answer by testing and measuring something. \"Does the amount of sunlight change how tall bean plants grow?\" is investigable."
      ],
      [
        "Hypothesis",
        "a testable idea that explains something. For example: \"Plants grow taller in more light because they use light to make food.\""
      ],
      [
        "Prediction",
        "a statement of what will happen in your test if the hypothesis is right. For example: \"Bean plants given more light will grow taller in two weeks.\""
      ],
      "Questions about opinions, such as which plant is prettiest, cannot be settled by testing, so they are not investigable."
    ],
    "remember": "A hypothesis gives the reason. A prediction says what the test will show if that reason is right.",
    "a": {
      "q": "Which of these is an investigable question?",
      "opts": [
        "Does the mass of a paper plane change how far it flies?",
        "Which paper plane design is the nicest to look at?",
        "Should students be allowed to fly paper planes at school?",
        "Why are paper planes more fun than other toys?"
      ],
      "why": "You can change the mass of a paper plane and measure how far it flies, so the question can be tested. The other three depend on opinions or values, so testing cannot settle them. Nicest to look at sounds like a thing to measure, but it is a matter of taste.",
      "clue": "Which question could you answer by measuring something?"
    },
    "b": {
      "d": 3,
      "q": "Lena thinks warm water dissolves sugar faster because its particles move faster. She says: \"Sugar will dissolve in less time in 50 °C water than in 10 °C water.\" What is her statement?",
      "opts": ["A prediction", "A hypothesis", "An investigable question", "An opinion"],
      "why": "Her statement says what result she expects in her test, so it is a prediction. The hypothesis is her idea that warm water dissolves sugar faster because its particles move faster. It is tempting to call the statement a hypothesis because it is testable, but a hypothesis gives the explanation.",
      "clue": "Does her statement give a reason, or just say what will happen?"
    }
  },
  "sci-independent-dependent-controlled-variables": {
    "title": "Independent, dependent and controlled variables",
    "card": [
      "A variable is anything in an investigation that can change. In a fair test, you change only one variable and keep the rest the same.",
      ["Independent", "the variable you change on purpose, such as the amount of light a plant gets."],
      [
        "Dependent",
        "the variable you measure to see what happened, such as the height of the plant. Its result depends on the change you made."
      ],
      [
        "Controlled",
        "every other variable, which you keep the same, such as the soil, water and pot size. Then any change in the dependent variable can be put down to the independent variable."
      ]
    ],
    "remember": "Change one, measure one, keep the rest the same.",
    "a": {
      "q": "Sam tests how the temperature of water affects how fast sugar dissolves. Which is the dependent variable?",
      "opts": [
        "The time the sugar takes to dissolve",
        "The temperature of the water",
        "The amount of sugar used",
        "The volume of water used"
      ],
      "why": "The time to dissolve is what Sam measures, and it depends on the change he makes. The temperature is the tempting wrong answer, because it is the variable he changes, so it is the independent variable.",
      "clue": "Which one is measured to see the result?"
    },
    "b": {
      "d": 3,
      "q": "Priya tests how the slope of a ramp affects how far a toy car rolls. She uses a different car on each ramp. Why is this not a fair test?",
      "opts": [
        "The type of car is not kept the same",
        "The slope of the ramp was changed",
        "The distance rolled was measured",
        "Only one variable was measured"
      ],
      "why": "Using a different car changes a second variable, so Priya cannot tell whether the slope or the car caused the difference. Changing the slope is not the problem, because it is the independent variable she is testing.",
      "clue": "Which variable should have been kept the same?"
    }
  },
  "sci-measuring-with-precision": {
    "title": "Measuring with precision",
    "card": [
      "Choose the instrument that fits the job. A ruler measures length, a measuring cylinder measures the volume of a liquid, a balance measures mass and a thermometer measures temperature.",
      "Read the scale carefully. Put your eye level with the mark you are reading. Looking from above or below makes the reading wrong.",
      "Water in a measuring cylinder has a surface that curves down in the middle. Read the scale at the bottom of this curve.",
      "Write every measurement with its unit, such as 25 mL, 4.2 cm, 18 g or 21 °C. A number with no unit does not say what was measured."
    ],
    "remember": "Pick the right instrument, read it at eye level and write the unit.",
    "a": {
      "q": "Sam wants to find what volume of water is in a jug. Which instrument should he use?",
      "opts": ["A measuring cylinder", "A balance", "A thermometer", "A ruler"],
      "why": "A measuring cylinder measures the volume of a liquid. A balance is the most tempting wrong choice, but it measures mass, not volume.",
      "clue": "Which instrument measures how much space a liquid takes up?"
    },
    "b": {
      "d": 2,
      "q": "Priya reads the water level in a measuring cylinder. Which way of reading gives the correct result?",
      "opts": [
        "Eye level with the bottom of the curved surface",
        "Looking down from above at the top of the water",
        "Looking up from below at the bottom of the curve",
        "Eye level with the top edge of the curved surface"
      ],
      "why": "Your eye must be level with the mark, and for water the reading is taken at the bottom of the curved surface. Eye level with the top edge is tempting, but the top edge is the wrong part of the curve to read.",
      "clue": "Where should your eye be, and which part of the curve is read?"
    }
  },
  "sci-tables-graphs": {
    "title": "Tables and graphs",
    "card": [
      "A results table has a title and a heading for each column, with units. The independent variable (the one you change) goes in the first column. The dependent variable (the one you measure) goes next.",
      [
        "Line graph",
        "suits continuous data, which are numbers that can take any value on a scale, such as time or temperature. Points are joined to show how the measurement changes."
      ],
      [
        "Column graph",
        "suits categories, which are separate groups, such as types of soil or colours. Each category gets its own column, and the columns do not join."
      ],
      "On a graph, the independent variable goes on the horizontal axis and the dependent variable goes on the vertical axis. Each axis has a label and units."
    ],
    "remember": "Independent variable first in the table. Line graph for continuous data, column graph for categories.",
    "a": {
      "q": "Priya times how long ice takes to melt in four liquids: water, salt water, juice and milk. Which graph suits her results?",
      "opts": [
        "A column graph, because the liquids are categories",
        "A line graph, because the liquids are categories",
        "A column graph, because the times are continuous",
        "A line graph, because the times are measured in seconds"
      ],
      "why": "The liquids are separate groups, so each one gets its own column. A line graph is the tempting choice because the melting times are numbers, but the numbers are the dependent variable. The liquids on the horizontal axis decide the graph type.",
      "clue": "Look at what she changes: are the liquids a scale or separate groups?"
    },
    "b": {
      "d": 3,
      "q": "Tom heats water and records its temperature every minute for ten minutes. How should he set out his table and graph?",
      "opts": [
        "Time in the first column, and a line graph",
        "Temperature in the first column, and a line graph",
        "Time in the first column, and a column graph",
        "Temperature in the first column, and a column graph"
      ],
      "why": "Tom chooses the times, so time is the independent variable and goes first. Time is continuous, so a line graph shows how temperature changes. Putting temperature first is tempting because it is the main result, but it is the variable he measures.",
      "clue": "Which variable did Tom choose, and is it a scale or a group?"
    }
  },
  "sci-patterns-trends-anomalies": {
    "title": "Patterns, trends and anomalies",
    "card": [
      "A pattern is something that repeats or links in results. A trend is the general direction the data moves, such as rising, falling or staying level.",
      "A trend can be described even when the points do not sit exactly on a line. Look at the data as a whole, not at one result.",
      ["Anomaly", "a result that does not fit the pattern of the others. It stands out as unusually high or low."],
      "An anomaly may come from an error, such as a misread instrument or a spill. Scientists look for the cause and may repeat that trial to check it."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "A plant's height measured each day for 5 days: 3, 5, 7, 4 and 11 cm. The straight line shows the trend: the height rises by about 2 cm a day. Four results sit on the line. The day 4 result, 4 cm, is far below it, so it is an anomaly.",
        "x": {"min": 0, "max": 6, "label": "Day", "step": 1},
        "y": {"min": 0, "max": 14, "label": "Height (cm)", "step": 2},
        "items": [
          {"type": "fn", "id": "t", "expr": "2x + 1", "domain": [0.5, 5.5], "label": "trend"},
          {"type": "point", "at": [1, 3], "on": ["t"]},
          {"type": "point", "at": [2, 5], "on": ["t"]},
          {"type": "point", "at": [3, 7], "on": ["t"]},
          {"type": "point", "at": [5, 11], "on": ["t"]},
          {"type": "point", "at": [4, 4], "label": "anomaly", "pos": "below-right"}
        ]
      }
    },
    "remember": "A trend is the overall direction. An anomaly is the result that breaks the pattern.",
    "a": {
      "q": "Hana times how long ice takes to melt in water at 10, 20, 30, 40 and 50 °C. The times fall as the water gets warmer. What does this describe?",
      "opts": [
        "A trend: the melting time falls as the temperature rises",
        "An anomaly: the melting time changes between trials",
        "A trend: the melting time rises as the temperature rises",
        "An anomaly: the melting time is the same in every trial"
      ],
      "why": "The times move in one general direction, down as the water warms, so this is a trend. It is not an anomaly, because no single result is out of line with the others.",
      "clue": "Look at the overall direction of the times."
    },
    "b": {
      "d": 3,
      "q": "Leo measures the height of a bean plant each day for five days: 2 cm, 4 cm, 6 cm, 15 cm, 10 cm. Which statement is best?",
      "opts": [
        "15 cm is an anomaly, so Leo should check how it was measured",
        "The trend is that the plant did not grow at all",
        "15 cm is the trend, because it is the highest result",
        "10 cm is an anomaly, because it is lower than 15 cm"
      ],
      "why": "The heights rise by about 2 cm a day, so 15 cm does not fit and may be a measuring error. Leo should check it. 10 cm is not the anomaly, because it fits the rising trend better.",
      "clue": "Which result breaks the steady rise?"
    }
  },
  "sci-cells-as-building-blocks": {
    "title": "Cells as the building blocks of life",
    "card": [
      "All living things are made of one or more cells. A cell is the smallest unit that can carry out the processes of life, such as growing and using energy.",
      [
        "Unicellular",
        "made of one cell only, such as an amoeba. That single cell carries out every process the organism needs."
      ],
      [
        "Multicellular",
        "made of many cells, such as a tree or a human. Cells work together to keep the whole organism alive."
      ],
      "Most cells are too small to see with the naked eye. We use a microscope to see them."
    ],
    "remember": "Cells are the smallest units of life, and an organism may have one cell or many.",
    "a": {
      "q": "Why is a cell called a building block of life?",
      "opts": [
        "All living things are made of one or more cells",
        "Only large living things are made of cells",
        "Cells are found only in animals and plants",
        "Cells are the smallest things that exist"
      ],
      "why": "All living things are made of cells, and a cell is the smallest unit that carries out the processes of life. Cells are not the smallest things that exist, because the card only says they are the smallest units of life.",
      "clue": "Think about what every living thing has in common."
    },
    "b": {
      "d": 3,
      "q": "A scientist views a drop of pond water under a microscope and sees one tiny organism. It grows and uses energy, and it has only one cell. What can be concluded?",
      "opts": [
        "It is alive, because one cell can carry out life processes",
        "It is not alive, because living things need many cells",
        "It is alive only if it is part of a larger organism",
        "It is not alive, because it is too small to see by eye"
      ],
      "why": "A single cell can carry out the processes of life, so a unicellular organism is a complete living thing. Being too small to see does not decide whether something is alive, since most cells are only visible with a microscope.",
      "clue": "Can a living thing be made of just one cell?"
    }
  },
  "sci-parts-animal-cell": {
    "title": "Parts of an animal cell",
    "card": [
      [
        "Nucleus",
        "The control centre of the cell. It holds the genetic material, which has the instructions for how the cell works."
      ],
      [
        "Cell membrane",
        "A thin layer around the cell. It controls what goes in and out, so it lets useful things in and wastes out."
      ],
      ["Cytoplasm", "A jelly-like fluid that fills the cell. Most of the cell's chemical reactions happen here."],
      "Each part has its own job, and the cell works because the parts do their jobs together."
    ],
    "remember": "Nucleus controls and stores instructions, membrane controls entry and exit, cytoplasm is where reactions happen.",
    "a": {
      "q": "An animal cell has its nucleus taken out. Which job can the cell no longer do without its nucleus?",
      "opts": [
        "Follow the instructions in its genetic material",
        "Keep its contents inside a thin outer layer",
        "Hold the jelly-like fluid where reactions happen",
        "Control which wastes pass out through its edge"
      ],
      "why": "The nucleus holds the genetic material, which has the instructions that control the cell. The membrane and cytoplasm are separate parts, so the outer layer, the fluid and the movement of wastes are not the nucleus's jobs.",
      "clue": "Which part is the control centre?"
    },
    "b": {
      "d": 3,
      "q": "A chemical damages the membrane of an animal cell, so the membrane stops controlling what passes through it. What is the most likely problem?",
      "opts": [
        "Harmful substances get in and useful ones leak out",
        "The nucleus stops storing the genetic material",
        "The cytoplasm stops being where reactions happen",
        "Nothing changes, as the nucleus controls what enters"
      ],
      "why": "The cell membrane is the part that controls what goes in and out, so damage to it lets the wrong things pass. It is tempting to think the nucleus controls entry because it is the control centre, but that job belongs to the membrane. The nucleus still holds the genetic material and the cytoplasm is still where reactions happen.",
      "clue": "Which part acts as the gatekeeper of the cell?"
    }
  },
  "sci-parts-plant-cell": {
    "title": "Parts of a plant cell",
    "card": [
      "Plant cells have a nucleus, cell membrane and cytoplasm, as animal cells do. They also have three extra parts.",
      ["Cell wall", "a rigid layer outside the cell membrane. It supports the cell and gives it a fixed shape."],
      [
        "Chloroplasts",
        "small green parts where photosynthesis happens. Photosynthesis is how a plant makes food using light energy."
      ],
      [
        "Large vacuole",
        "a big space that stores water. When it is full, it presses on the cell wall and keeps the cell firm."
      ]
    ],
    "remember": "Plant cells have a cell wall, chloroplasts and a large vacuole as well.",
    "a": {
      "q": "Which part of a plant cell is the site of photosynthesis?",
      "opts": ["Chloroplasts", "Cell wall", "Large vacuole", "Nucleus"],
      "why": "Chloroplasts are where photosynthesis happens. The cell wall is tempting because plant cells have one and animal cells do not, but it supports the cell and does not make food.",
      "clue": "Look for the green parts."
    },
    "b": {
      "d": 3,
      "q": "A lettuce left out of water goes limp. Which change in its cells best explains why the leaf loses its firmness?",
      "opts": [
        "The large vacuoles lose water and press less on the walls",
        "The chloroplasts stop making the cell walls firm",
        "The nucleus stops holding the cell in its fixed shape",
        "The cell walls break down and lose their rigid layer"
      ],
      "why": "A full vacuole presses on the cell wall and keeps the cell firm. When the vacuoles lose water, this pressure drops and the leaf goes limp. The cell wall is tempting, but it is rigid and stays in place, so the loss of water is the cause.",
      "clue": "Think about what the stored water is pressing against."
    }
  },
  "sci-using-light-microscope": {
    "title": "Using a light microscope",
    "card": [
      "A light microscope has an eyepiece lens, which you look through, and several objective lenses on a rotating nose piece. Each lens has its own magnification, such as 10×, 4× or 40×.",
      "Total magnification = eyepiece lens × objective lens. An eyepiece of 10× with an objective of 40× gives 10 × 40 = 400×.",
      "Always start with the lowest power objective lens. It shows the widest view, so the specimen is easier to find and bring into focus.",
      "Then move to a higher power objective to see more detail. Refocus each time you change lens."
    ],
    "remember": "Multiply the two lenses for total magnification, and start on low power.",
    "a": {
      "q": "A student uses a 10× eyepiece lens and a 4× objective lens. What is the total magnification?",
      "opts": ["40×", "14×", "4×", "400×"],
      "why": "Total magnification is the eyepiece lens times the objective lens, so 10 × 4 = 40×. Adding the numbers to get 14× is the tempting mistake, but the lenses are multiplied.",
      "clue": "Multiply the two lens powers."
    },
    "b": {
      "d": 2,
      "q": "Ravi has put a slide of onion cells on the stage. Which step should he do first?",
      "opts": [
        "Focus using the lowest power objective lens",
        "Focus using the highest power objective lens",
        "Add the eyepiece and objective numbers together",
        "Swap to the highest power to find the cells quickly"
      ],
      "why": "The lowest power gives the widest view, so the cells are easier to find and focus. Starting on high power is tempting because it shows more detail, but the view is narrow and the specimen is hard to find.",
      "clue": "Which lens gives the widest view?"
    }
  },
  "sci-specialised-cells": {
    "title": "Specialised cells",
    "card": [
      "Specialised cells have a shape and parts that suit the job they do. Different jobs need different cells, so the cells in one body can look very different.",
      [
        "Nerve cell",
        "It is long and thin, with branches at its ends. This shape lets it carry messages over a distance around the body."
      ],
      [
        "Red blood cell",
        "It is small and has a dip in each side. It carries oxygen around the body, and its small size lets it fit through the narrowest blood vessels."
      ],
      [
        "Root hair cell",
        "It has a long, thin extension that sticks out into the soil. The extension gives the cell a large surface for taking in water."
      ]
    ],
    "remember": "A specialised cell's shape fits its job.",
    "a": {
      "q": "Why is a nerve cell long and thin?",
      "opts": [
        "It can carry messages over a distance in the body",
        "It can fit through the narrowest blood vessels",
        "It can take in water from the soil around it",
        "It can carry oxygen to every part of the body"
      ],
      "why": "A long, thin shape lets a nerve cell carry messages from one part of the body to another. Fitting through narrow blood vessels is the job of the small red blood cell, not the nerve cell.",
      "clue": "Think about what a nerve cell carries and how far it must go."
    },
    "b": {
      "d": 2,
      "q": "Sam looks at a cell from a plant root under a microscope. It has a long, thin extension that gives it a large surface. What job does this cell most likely do?",
      "opts": [
        "Taking in water for the plant",
        "Carrying messages around the plant",
        "Carrying oxygen through the plant",
        "Fitting through narrow tubes in the plant"
      ],
      "why": "This is a root hair cell. Its long extension gives it a large surface for taking in water. A long, thin shape also suits a nerve cell, but nerve cells carry messages around an animal's body, not a plant's root.",
      "clue": "Think about what a root needs to collect, and why a large surface would help."
    }
  },
  "sci-from-cells-organ-systems": {
    "title": "From cells to organ systems",
    "card": [
      ["Tissue", "a group of similar cells that do the same job. Muscle tissue is one example."],
      [
        "Organ",
        "a structure made of different tissues that work together to do a particular job. The stomach is an organ."
      ],
      [
        "Organ system",
        "a group of organs that work together to carry out a major job for the body. The organs of the digestive system work together to deal with food."
      ],
      "Cells, tissues, organs and organ systems build up in that order. Together the organ systems keep the whole organism alive."
    ],
    "remember": "Each level is built from the one below it, and the levels work as a team.",
    "a": {
      "q": "Which list shows the levels of organisation from smallest to largest?",
      "opts": [
        "Cell, tissue, organ, organ system",
        "Cell, organ, tissue, organ system",
        "Tissue, cell, organ system, organ",
        "Organ, tissue, cell, organ system"
      ],
      "why": "Similar cells make a tissue, different tissues make an organ, and organs make an organ system. Putting organ before tissue is tempting, but an organ is built from several tissues, so it is larger.",
      "clue": "Start with the smallest unit and ask what it forms."
    },
    "b": {
      "d": 3,
      "q": "The heart contains muscle tissue, nerve tissue and connective tissue, and it pumps blood. Why is the heart an organ and not a tissue?",
      "opts": [
        "It is made of different tissues working together",
        "It is made of one type of cell doing one job",
        "It is a group of organs doing a major body job",
        "It is made of cells, and tissues have no cells"
      ],
      "why": "An organ is made of different tissues that work together for a particular job. A tissue is made of similar cells, so a structure with several tissue types is not a tissue. It is not an organ system either, because it is one organ and not a group of organs.",
      "clue": "Count how many types of tissue the heart has."
    }
  },
  "sci-digestive-system": {
    "title": "The digestive system",
    "card": [
      "Digestion breaks large food molecules into small ones that can pass into the blood. Enzymes are chemicals made by the body that break these molecules apart.",
      [
        "Mouth and stomach",
        "Teeth chew food into small pieces, which gives enzymes more surface to work on. Saliva starts breaking down starch, and in the stomach, muscles churn the food while acid and enzymes break down protein."
      ],
      [
        "Small intestine",
        "Most chemical digestion ends here. Its wall is folded into tiny villi, which give a large surface area. The small molecules are absorbed through the villi into the blood."
      ],
      ["Large intestine", "It takes in water from the leftover material. The remains leave the body as faeces."]
    ],
    "remember": "Digestion makes food molecules small enough to absorb, and the small intestine passes them into the blood.",
    "a": {
      "q": "Where do digested food molecules pass into the blood?",
      "opts": ["The small intestine", "The stomach", "The large intestine", "The mouth"],
      "why": "The small intestine absorbs the small molecules through its villi into the blood. The stomach is tempting because a lot of digestion happens there, but breaking food down is not the same as absorbing it, and the card gives absorption to the small intestine.",
      "clue": "Absorbing means taking in, not breaking down."
    },
    "b": {
      "d": 3,
      "q": "Sam swallows a mouthful of food without chewing it. Why would this food be digested more slowly?",
      "opts": [
        "Large pieces give enzymes less surface to work on",
        "Large pieces pass straight into the large intestine",
        "Enzymes work only after food reaches the large intestine",
        "Chewing is the only step that breaks down protein"
      ],
      "why": "Chewing breaks food into small pieces, which gives enzymes more surface to work on. Without it, enzymes reach less of the food at once, so digestion is slower. Protein is broken down in the stomach by acid and enzymes, not by chewing, so that option is wrong.",
      "clue": "Think about how much of the food the enzymes can reach."
    }
  },
  "sci-circulatory-system": {
    "title": "The circulatory system",
    "card": [
      "The circulatory system moves blood around the body. The heart is a muscular pump that pushes blood through blood vessels.",
      [
        "Arteries",
        "carry blood away from the heart. Their walls are thick and strong, because blood leaves the heart under high pressure."
      ],
      [
        "Capillaries",
        "are the tiniest vessels, with walls only one cell thick. Oxygen and nutrients pass out of them into cells, and wastes such as carbon dioxide pass in."
      ],
      ["Veins", "carry blood back to the heart. Blood in veins is under lower pressure than in arteries."]
    ],
    "remember": "The heart pumps blood out in arteries, through capillaries to the cells, and back in veins.",
    "a": {
      "q": "Which blood vessels have thin walls so materials can pass between the blood and the cells?",
      "opts": ["Capillaries", "Arteries", "Veins", "The heart"],
      "why": "Capillaries have walls only one cell thick, so oxygen, nutrients and wastes can pass through them. Arteries have thick walls to cope with high pressure, so little passes through them.",
      "clue": "Think about which vessels are the tiniest."
    },
    "b": {
      "d": 3,
      "q": "Liam sprints and his leg muscle cells use up oxygen quickly. Where does oxygen leave his blood to enter these cells?",
      "opts": [
        "In the capillaries in the muscle",
        "In the arteries leaving the heart",
        "In the veins returning to the heart",
        "In the walls of the heart"
      ],
      "why": "Capillaries have walls one cell thick, so oxygen can pass out of them into the muscle cells. Arteries carry blood to the muscle, but their thick walls mean oxygen does not pass out of them.",
      "clue": "Which vessels sit right next to the cells?"
    }
  },
  "sci-respiratory-system": {
    "title": "The respiratory system",
    "card": [
      "Air enters through the nose or mouth and moves down the trachea (windpipe). The trachea splits into two bronchi, one to each lung.",
      "Inside each lung, the bronchi branch into smaller tubes that end in tiny air sacs called alveoli. There are millions of alveoli in the lungs.",
      "Each alveolus has a very thin wall with blood vessels wrapped around it. Oxygen passes from the air in the alveolus into the blood. Carbon dioxide passes from the blood into the air.",
      "The blood carries the oxygen to cells, which use it to release energy from food. Carbon dioxide is a waste, and it leaves the body when we breathe out."
    ],
    "remember": "Oxygen goes into the blood at the alveoli, and carbon dioxide comes out.",
    "a": {
      "q": "At which part of the respiratory system does oxygen pass from the air into the blood?",
      "opts": ["The alveoli", "The trachea", "The bronchi", "The nose"],
      "why": "Oxygen passes into the blood at the alveoli, which have thin walls with blood vessels wrapped around them. The bronchi are tubes that carry air towards the alveoli, so oxygen does not pass into the blood there.",
      "clue": "Look for the tiny air sacs at the ends of the tubes."
    },
    "b": {
      "d": 3,
      "q": "Leila breathes in. Which list shows the order the air passes through these parts on its way to the blood?",
      "opts": [
        "Trachea, bronchi, alveoli",
        "Bronchi, trachea, alveoli",
        "Alveoli, bronchi, trachea",
        "Trachea, alveoli, bronchi"
      ],
      "why": "Air moves down the trachea, which splits into the bronchi, and the bronchi lead to the alveoli where gases pass into the blood. The order bronchi then trachea is tempting, but the trachea is the single tube that splits into the two bronchi.",
      "clue": "The windpipe splits into two tubes, and those tubes end in air sacs."
    }
  },
  "sci-transport-systems-plants": {
    "title": "Transport systems in plants",
    "card": [
      "Plants have transport tissues made of long tubes that carry materials around the plant, much as blood vessels do in animals. These tissues run in bundles through the roots, stems and leaves.",
      ["Xylem", "a transport tissue that carries water and minerals from the roots up to the stem and leaves."],
      [
        "Phloem",
        "a transport tissue that carries sugars made in the leaves to the rest of the plant, such as the roots and growing tips."
      ],
      "Leaves make sugars by photosynthesis. Roots take in water and minerals from the soil, not sugars. Each tissue moves its materials from where they are made or taken in to where they are needed."
    ],
    "remember": "Xylem moves water and minerals up from the roots. Phloem moves sugars from the leaves.",
    "a": {
      "q": "A tree's leaves need a steady supply of water. Which tissue brings this water to them?",
      "opts": ["Xylem", "Phloem", "Alveoli", "Capillaries"],
      "why": "Water is taken in by the roots, and xylem carries it up to the stem and leaves. Phloem is tempting because it is also a plant transport tissue, but it carries sugars made in the leaves.",
      "clue": "Where does a tree get its water from?"
    },
    "b": {
      "d": 3,
      "q": "A potato plant stores food in potatoes that grow under the ground. The food is made from sugars. Which tissue brings the sugars, and from where?",
      "opts": [
        "Phloem, bringing them from the leaves",
        "Xylem, bringing them from the leaves",
        "Phloem, bringing them from the soil",
        "Xylem, bringing them from the soil"
      ],
      "why": "Sugars are made in the leaves by photosynthesis, and phloem carries them to other parts of the plant. Xylem from the soil is tempting because potatoes are underground, but roots take in water and minerals from the soil, not sugars.",
      "clue": "Which part of the plant makes sugars?"
    }
  },
  "sci-layers-earth": {
    "title": "Layers of the Earth",
    "card": [
      [
        "Crust",
        "The thin, rocky outer layer of the Earth. It is the layer we live on, and it is thinnest under the oceans."
      ],
      [
        "Mantle",
        "The thick layer under the crust. It is hot, solid rock, but it can flow very slowly over long periods of time."
      ],
      ["Core", "The centre of the Earth, made mostly of metal, mainly iron and nickel."],
      "The crust and the very top of the mantle are cool and rigid. Together they are broken into large pieces called plates."
    ],
    "remember": "Crust, mantle, core from the outside in. Plates are crust plus the top of the mantle.",
    "a": {
      "q": "A plate is one of the large pieces of the Earth's rigid outer shell. Which layers is a plate made of?",
      "opts": [
        "The crust and the top of the mantle",
        "The crust and the whole of the mantle",
        "The mantle and the outer part of the core",
        "Only the thin crust under land and sea"
      ],
      "why": "The plates are made of the crust together with the cool, rigid top of the mantle. The crust on its own is tempting, but the plates reach down into the top of the mantle as well. The rest of the mantle is hot and can flow, so it is not part of the plates.",
      "clue": "Which layers does the card call cool and rigid?"
    },
    "b": {
      "d": 3,
      "q": "Jack thinks the plates float on an ocean of melted rock inside the mantle. Which fact shows his idea is wrong?",
      "opts": [
        "The mantle is solid rock, though it can flow very slowly",
        "The mantle is cold, hard rock that cannot flow at all",
        "The plates rest on the core, not on the mantle under them",
        "The mantle is made mostly of the metals iron and nickel"
      ],
      "why": "The mantle is hot, solid rock that can flow very slowly over long periods, so it is not an ocean of melted rock. Saying it cannot flow at all is tempting, but the mantle does flow slowly. Iron and nickel make up the core, not the mantle.",
      "clue": "Is the rock under the plates solid or liquid?"
    }
  },
  "sci-moves-plates": {
    "title": "What moves the plates",
    "card": [
      "Tectonic plates move slowly, about a few centimetres a year. That is roughly the speed at which fingernails grow.",
      [
        "Convection",
        "hot rock in the mantle rises, cools, then sinks, in a very slow loop. Plates ride on this flow and are carried along with it."
      ],
      [
        "Ridge push",
        "at a spreading ridge, new plate material is hot and sits high. Gravity makes it slide down the slope and push the plate away from the ridge."
      ],
      [
        "Slab pull",
        "where an old, cold plate sinks into the mantle, its weight drags the rest of the plate behind it, towards the sinking edge."
      ]
    ],
    "remember": "Plates can be carried by mantle flow, pushed away from ridges and pulled by sinking slabs.",
    "a": {
      "q": "The edge of an old, cold plate sinks into the mantle. Its weight drags the rest of the plate along. What is this force called?",
      "opts": ["Slab pull", "Ridge push", "Mantle convection", "Sea-floor spreading"],
      "why": "The sinking edge is a heavy slab, and its weight pulls the plate behind it. Ridge push is the tempting answer, but it happens at a spreading ridge, where gravity makes new, high plate slide away from the ridge.",
      "clue": "Is the plate being pushed from behind or dragged from the front?"
    },
    "b": {
      "d": 3,
      "q": "A plate has a spreading ridge along its west edge. Its east edge is old and cold and sinks into the mantle. How do ridge push and slab pull act on it?",
      "opts": [
        "Both move it the same way, east towards the sinking edge",
        "They act in opposite directions and cancel each other out",
        "Ridge push moves it west, while slab pull moves it east",
        "Only slab pull acts, as ridge push needs a sinking edge"
      ],
      "why": "Ridge push slides the plate away from the ridge, which is east. Slab pull drags the plate towards its sinking edge, which is also east. The two forces add together rather than cancel, so the option about opposite directions is wrong.",
      "clue": "Work out which way each force moves the plate on its own."
    }
  },
  "sci-divergent-convergent-transform-boundaries": {
    "title": "Divergent, convergent and transform boundaries",
    "card": [
      [
        "Divergent",
        "Plates move apart. Where this happens on the sea floor, a ridge forms. Where it happens on land, a rift valley can form."
      ],
      [
        "Convergent",
        "Plates push towards each other. Mountains can form where plates crumple upwards, and a deep ocean trench can form where one plate sinks under another."
      ],
      [
        "Transform",
        "Plates slide past each other sideways. Crust is not pulled apart or pushed together, and the boundary is marked by a line of broken rock."
      ],
      "A boundary is named by how the plates move relative to each other: apart, together or side by side."
    ],
    "remember": "The name of a boundary tells you how the plates move: apart, together or past each other.",
    "a": {
      "q": "Two plates on the sea floor are moving away from each other and a ridge is forming. What type of boundary is this?",
      "opts": ["Divergent", "Convergent", "Transform", "Rift valley"],
      "why": "Plates moving apart form a divergent boundary, and a ridge is one landform that results. A convergent boundary is wrong because there the plates push together, not apart. A rift valley is a landform, not a type of boundary.",
      "clue": "Think about the direction the plates are moving."
    },
    "b": {
      "d": 3,
      "q": "Two plates meet. One is sinking under the other, and a deep trench lies along the line where they meet. How are the plates moving, and what is the boundary?",
      "opts": [
        "Pushing together, a convergent boundary",
        "Pulling apart, a divergent boundary",
        "Sliding past, a transform boundary",
        "Pushing together, a transform boundary"
      ],
      "why": "A trench forms where one plate sinks under another, so the plates are pushing together. This is a convergent boundary. A divergent boundary is tempting because it also forms a long feature on the sea floor, but there the plates move apart and a raised ridge forms, not a trench.",
      "clue": "A plate sinking under another is being pushed towards it."
    }
  },
  "sci-earthquakes-volcanoes": {
    "title": "Earthquakes and volcanoes",
    "card": [
      "Most earthquakes and volcanoes happen along plate boundaries. Few happen in the middle of a plate.",
      [
        "Earthquakes",
        "Plates grind past each other or push together and get stuck. Stress builds up. When the rock suddenly slips, the energy is released as shaking."
      ],
      [
        "Volcanoes",
        "Where one plate sinks under another, or where plates pull apart, rock can melt. The melted rock (magma) rises and erupts at the surface."
      ],
      "The Pacific Ring of Fire is a long belt of boundaries around the Pacific Ocean. It has many of the world's earthquakes and volcanoes."
    ],
    "remember": "Most quakes and volcanoes are at plate boundaries: quakes where plates stick and slip, volcanoes where rock can melt.",
    "a": {
      "q": "Earthquakes are common along plate boundaries. What causes the shaking there?",
      "opts": [
        "Stress builds in stuck rock until it suddenly slips",
        "Gaps between plates let the crust sink and drop",
        "The core comes closest to the surface at boundaries",
        "Plates stop moving at their edges, which weakens rock"
      ],
      "why": "Where plates grind past or push into each other, the rock can stick while stress builds up. When it suddenly slips, the energy is released as shaking. Plates do not stop at their edges: the push from the moving plates is what builds the stress.",
      "clue": "Think about where the energy for the shaking comes from."
    },
    "b": {
      "d": 3,
      "q": "Hawaii's volcanoes erupt in the middle of the Pacific plate, far from any plate boundary. How does this fit the idea about where volcanoes form?",
      "opts": [
        "Most volcanoes are at boundaries, but a few are not",
        "Most volcanoes are at boundaries, so Hawaii is on one",
        "Most volcanoes are mid-plate, as Hawaii's are",
        "Most volcanoes form where plates pull apart, as here"
      ],
      "why": "The card says most volcanoes are at plate boundaries and few are in the middle of a plate, so Hawaii is one of the few. Saying Hawaii is on a boundary is tempting, but the question says it is far from any boundary. Mid-plate volcanoes are uncommon, which is why Hawaii stands out.",
      "clue": "Trust what the question says about where Hawaii is."
    }
  },
  "sci-evidence-plate-tectonics": {
    "title": "Evidence for plate tectonics",
    "card": [
      "Plate tectonics is the theory that Earth's outer layer is broken into plates that move slowly. Scientists support it with several kinds of evidence.",
      [
        "Matching land",
        "The coastlines of continents such as South America and Africa fit together like puzzle pieces. Similar fossils and rock types are found on continents now far apart across oceans."
      ],
      [
        "Sea-floor ridges",
        "Marie Tharp mapped the ocean floor and showed a long ridge with a rift valley down its centre. This fits with new crust forming where plates move apart."
      ],
      [
        "Magnetic stripes",
        "Rock on the sea floor records Earth's magnetic field as it forms. It shows matching stripes on both sides of a ridge, which suggests new rock forms at the ridge and spreads outwards."
      ]
    ],
    "remember": "Many separate clues, on land and under the sea, fit the idea that plates move.",
    "a": {
      "q": "Identical fossils of the same land animal are found in South America and Africa. How does this support plate tectonics?",
      "opts": [
        "The continents were once joined, then moved apart",
        "The animal swam across the ocean to breed",
        "The continents have always been in their present places",
        "The fossils were formed by rock stripes on the sea floor"
      ],
      "why": "A land animal could not cross a wide ocean, so the best fit is that the continents were once joined and have since moved apart. Swimming across is a tempting idea, but the card says the fossils are found on continents now far apart across oceans, which points to the land having moved.",
      "clue": "Think about where a land animal could live."
    },
    "b": {
      "d": 3,
      "q": "Scientists find matching magnetic stripes in sea-floor rock on both sides of a mid-ocean ridge. What does this pattern suggest?",
      "opts": [
        "New rock forms at the ridge and spreads outwards",
        "Old rock is sinking at the ridge and being destroyed",
        "The continents on each side fit together like a puzzle",
        "The ridge was mapped by Marie Tharp using fossils"
      ],
      "why": "The rock records Earth's magnetic field as it forms, so matching stripes on both sides suggest new rock forms at the ridge and spreads outwards. The puzzle-fit idea is also evidence for plate tectonics, but it comes from coastlines, not from magnetic stripes.",
      "clue": "The rock records the magnetic field as it forms."
    }
  },
  "sci-igneous-rocks": {
    "title": "Igneous rocks",
    "card": [
      "Igneous rocks form when molten rock cools and becomes solid. Molten rock is called magma when it is underground and lava when it flows out onto the surface.",
      "Molten rock is made of tiny particles that can move around. As it cools, they lock together into crystals.",
      [
        "Slow cooling",
        "Magma cooling slowly deep underground has plenty of time for crystals to grow. The rock has large crystals, as in granite."
      ],
      [
        "Fast cooling",
        "Lava cooling quickly at the surface leaves little time for crystals to grow. The rock has small crystals, as in basalt."
      ]
    ],
    "remember": "The slower the molten rock cools, the bigger the crystals.",
    "a": {
      "q": "Why does granite have large crystals?",
      "opts": [
        "Its magma cooled slowly, so crystals had time to grow",
        "Its magma cooled quickly, so crystals grew at once",
        "Its lava was squeezed hard, so crystals were pushed out",
        "Its lava flowed over the surface, so crystals formed in air"
      ],
      "why": "Large crystals need time to grow, and magma cooling slowly underground gives that time. Fast cooling is the tempting wrong answer, because it leaves little time and gives small crystals.",
      "clue": "Think about how much time the crystals had to grow."
    },
    "b": {
      "d": 3,
      "q": "Two igneous rocks are found. Rock X has crystals too small to see without a lens. Rock Y has crystals the size of rice grains. Which statement is best supported?",
      "opts": [
        "Rock X cooled faster than Rock Y",
        "Rock X cooled more slowly than Rock Y",
        "Rock X formed deeper underground than Rock Y",
        "Rock X took longer to become solid than Rock Y"
      ],
      "why": "Small crystals mean little time to grow, so Rock X cooled faster than Rock Y. The option about cooling more slowly gets the link backwards: slow cooling gives large crystals, not small ones.",
      "clue": "Link crystal size to how long each rock took to cool."
    }
  },
  "sci-sedimentary-rocks": {
    "title": "Sedimentary rocks",
    "card": [
      "Sediments are loose pieces of rock, sand, mud or shell, or the remains of living things. Water, wind or ice carry them and drop them in a new place.",
      "Sediments settle in layers, with the oldest usually at the bottom. Over a very long time, newer layers bury the older ones, and their weight squeezes the grains together.",
      "Cementing is a separate step: minerals in the water glue the grains together. This turns the buried sediment into sedimentary rock, such as sandstone.",
      "Most fossils are found in sedimentary rock. A dead animal buried in soft sediment can be kept as the sediment becomes rock."
    ],
    "remember": "Sedimentary rock is made from layers of sediment that are buried and cemented over a long time.",
    "a": {
      "q": "Which describes how sandstone forms?",
      "opts": [
        "Sand is laid down, buried and cemented into rock",
        "Sand is melted deep underground, then cools into rock",
        "Sand is changed by heat and pressure without melting",
        "Sand is blown into a pile and stays as loose grains"
      ],
      "why": "Sandstone is sedimentary, so it forms when sand is laid down in layers, buried and cemented. Melting is not part of how sedimentary rock forms, and a loose pile of sand has not been buried or cemented, so it is not rock.",
      "clue": "Think about layers, burial and glue-like minerals."
    },
    "b": {
      "d": 2,
      "q": "Layers of mud settle on the floor of a lake in Tasmania. A dead fish is buried in one layer. Over millions of years the layers harden. Where is the fish fossil most likely to be found?",
      "opts": [
        "In sedimentary rock formed from the mud",
        "In igneous rock formed from cooled lava",
        "In the loose mud at the surface today",
        "In rock that was melted and then cooled"
      ],
      "why": "The mud was buried in layers and cemented, so it became sedimentary rock, which is where most fossils are found. The fish was buried in mud, not lava, so igneous rock formed from cooled lava is not where it would be kept.",
      "clue": "What kind of rock does buried, hardened mud become?"
    }
  },
  "sci-metamorphic-rocks": {
    "title": "Metamorphic rocks",
    "card": [
      "Metamorphic rocks form when heat and pressure change a rock that already exists. The word metamorphic means changed in form.",
      "The rock does not melt. It stays solid, but its minerals can change or regrow, and the rock can look and feel different.",
      "This usually happens deep underground, where rock is squeezed and heated, such as when mountains are built or hot molten rock pushes in nearby.",
      "Limestone becomes marble when it is heated and squeezed. Shale, a soft sedimentary rock, can become slate, which is harder."
    ],
    "remember": "Metamorphic rock is old rock changed by heat and pressure while it stays solid.",
    "a": {
      "q": "Which description fits how a metamorphic rock forms?",
      "opts": [
        "Heat and pressure change a solid rock without melting it",
        "Molten rock cools and hardens into a new rock",
        "Layers of sediment are pressed and cemented together",
        "Wind and water break a rock into small pieces"
      ],
      "why": "Metamorphic rocks form when heat and pressure change an existing rock that stays solid. Cooling molten rock makes a different type of rock, because that rock has melted first.",
      "clue": "Think about what happens to the original rock: it changes, but does it melt?"
    },
    "b": {
      "d": 3,
      "q": "Geologist Priya finds marble in a hillside. Which statement about how this marble formed is best supported?",
      "opts": [
        "It was limestone that was heated and squeezed but not melted",
        "It formed when molten limestone cooled slowly underground",
        "It formed from sand grains cemented together in layers",
        "It formed when limestone was broken down by rain and rivers"
      ],
      "why": "Marble is a metamorphic rock made when limestone is changed by heat and pressure while still solid. Molten limestone cooling is tempting, but melting would make a different type of rock, not a metamorphic one.",
      "clue": "Remember what limestone becomes, and whether the rock melts on the way."
    }
  },
  "sci-rock-cycle": {
    "title": "The rock cycle",
    "card": [
      "The rock cycle is the set of processes that turn rock of one type into another type. Any rock can change into any of the three types, and most changes take millions of years.",
      [
        "Surface processes",
        "Weathering breaks rock into smaller pieces. Erosion moves the pieces away, and deposition drops them in a new place. Layers of sediment that are buried and cemented become sedimentary rock."
      ],
      [
        "Underground processes",
        "Heat and pressure change buried rock into metamorphic rock without melting it. If the rock gets hot enough to melt, it becomes magma. When magma cools, it forms igneous rock."
      ],
      [
        "Uplift",
        "Uplift pushes rock from deep underground up towards the surface. There it can be weathered, and the cycle goes on."
      ]
    ],
    "remember": "There is no single path: surface processes, heat, pressure, melting and uplift can change any rock into any type.",
    "a": {
      "q": "Wind picks up grains of sand from a weathered cliff and blows them far inland. Which rock cycle process is this?",
      "opts": ["Erosion", "Deposition", "Uplift", "Weathering"],
      "why": "Erosion is the process that moves weathered pieces of rock, for example by wind or a river. Deposition is tempting, but it is when the pieces are dropped, not when they are carried. Weathering breaks the rock up before it is moved.",
      "clue": "Are the grains being broken up, moved or dropped?"
    },
    "b": {
      "d": 3,
      "q": "Waves beat against a cliff of igneous rock beside the sea. Which order of processes could turn this rock into sedimentary rock?",
      "opts": [
        "Weathering, erosion, deposition, then burial",
        "Deposition, erosion, weathering, then burial",
        "Heating, melting, cooling, then uplift",
        "Heat, pressure, burial, then uplift"
      ],
      "why": "The rock is first broken into pieces, then moved, then dropped in layers that are buried and cemented. The reversed order is tempting, but pieces cannot be moved or dropped before weathering makes them. Melting and cooling would give igneous rock, and heat and pressure would give metamorphic rock.",
      "clue": "What has to happen to solid rock before any pieces can be moved?"
    }
  },
  "sci-rocks-are-used": {
    "title": "How rocks are used",
    "card": [
      "A rock's properties include its hardness, how it breaks, how it feels and how well it lets water through. These come from how the rock formed.",
      "People choose a rock for a job by matching its properties to what the job needs. A hard rock wears away slowly, so it suits cutting, grinding and surfaces that get heavy use. A rock that splits into flat sheets suits paving.",
      "First Nations Australians chose particular stones for particular tasks. Coarse, hard sandstone was used for grindstones to crush seeds. Fine-grained stones that break into sharp edges were used for cutting tools.",
      "This choice was made by knowing the stone well. It came from careful observation over a very long time and was passed on through generations."
    ],
    "remember": "Choose a rock for a job by matching its properties to what the job needs.",
    "a": {
      "q": "A group needs a stone to grind seeds into flour. Which stone would suit this job best?",
      "opts": [
        "A coarse, hard stone with a rough, gritty surface",
        "A soft stone that crumbles easily when rubbed",
        "A fine-grained stone that breaks into sharp edges",
        "A light stone that lets water soak through it"
      ],
      "why": "A hard stone wears away slowly, and a coarse surface helps crush the seeds, so it suits grinding. A stone that breaks into sharp edges suits cutting tools rather than grinding. A soft stone would crumble into the food.",
      "clue": "Match the stone's properties to the work of grinding."
    },
    "b": {
      "d": 3,
      "q": "A builder in Perth needs stone for a path that will be walked on daily and often get wet. Which property matters most for the choice?",
      "opts": [
        "It is hard and wears away slowly under foot traffic",
        "It is soft enough to be carved with bare hands",
        "It is coloured to match the nearby garden plants",
        "It is the same rock type as the stone in the house"
      ],
      "why": "A path is worn down by walking and weather, so a hard stone that wears slowly is the best match. A soft stone would wear away fast. Colour and rock type do not decide how well it does the job.",
      "clue": "Match the stone's property to what the job demands."
    }
  },
  "sci-kinetic-potential-energy": {
    "title": "Kinetic and potential energy",
    "card": [
      [
        "Kinetic energy",
        "energy of movement. A moving car has kinetic energy. So do the moving particles that make up heat, sound and electricity."
      ],
      [
        "Potential energy",
        "energy that is stored and ready to be used. It is not doing anything yet, but it can be changed into another form."
      ],
      "Kinds of potential energy include gravitational (stored in an object because of its height), elastic (stored in a stretched or squashed object) and chemical (stored in food, fuel and batteries).",
      "To sort an example, ask whether the energy is in movement or in storage. A stretched rubber band has elastic potential energy. Once released and flying, it has kinetic energy."
    ],
    "remember": "Kinetic energy is energy in movement. Potential energy is energy in storage.",
    "a": {
      "q": "Which of these is an example of potential energy?",
      "opts": [
        "A book resting still on a shelf",
        "A ball rolling across the floor",
        "A fan spinning on a desk",
        "A bell ringing in a school hall"
      ],
      "why": "The book is not moving, but it stores gravitational potential energy because of its height. The ringing bell may seem still, but it makes sound, and sound is kinetic energy because its particles are moving.",
      "clue": "Look for the energy that is stored, not moving."
    },
    "b": {
      "d": 3,
      "q": "Priya pulls back the string of a bow, holds it still, then lets go and the arrow flies. Which pair correctly names the energy of the held string and of the flying arrow?",
      "opts": [
        "Elastic potential, then kinetic",
        "Kinetic, then elastic potential",
        "Chemical potential, then kinetic",
        "Elastic potential, then gravitational potential"
      ],
      "why": "The pulled-back string is stretched and not moving, so it stores elastic potential energy. The flying arrow is moving, so it has kinetic energy. Gravitational potential energy is stored because of height, but the arrow's energy here comes from its movement.",
      "clue": "Ask whether each part is moving or stored."
    }
  },
  "sci-energy-transfer-transformation": {
    "title": "Energy transfer and transformation",
    "card": [
      [
        "Transfer",
        "Energy moves from one object to another, and its form stays the same. When a hot pan warms your hand, heat energy passes from the pan to your hand."
      ],
      [
        "Transformation",
        "Energy changes from one form to another. In a battery-powered torch, chemical energy in the battery becomes electrical energy."
      ],
      "Both can happen in one event. A kicked football gains movement energy from the foot (a transfer). The kicker's stored chemical energy became movement energy in the leg (a transformation).",
      "To tell them apart, ask one question: did the energy change form, or did it only move to a new object?"
    ],
    "remember": "Transfer: same energy form, new object. Transformation: new energy form.",
    "a": {
      "q": "A hot cup of tea warms the hands of the person holding it. Heat energy passes from the cup to their hands. What is this?",
      "opts": [
        "An energy transfer, because the form stays the same",
        "An energy transformation, because the energy is used up",
        "An energy transformation, because the hands get warm",
        "An energy transfer, because the energy changes its form"
      ],
      "why": "The energy is heat before and after, and it only moves from the cup to the hands, so it is a transfer. Hands getting warm may seem like a change, but the energy form has not changed.",
      "clue": "Did the form of the energy change, or only where it is?"
    },
    "b": {
      "d": 3,
      "q": "Mia's solar-powered calculator in Perth works in bright light. Which statement describes what the solar cell does?",
      "opts": [
        "It transforms light energy into electrical energy",
        "It transfers light energy to the calculator unchanged",
        "It transforms electrical energy into light energy",
        "It transfers electrical energy into another object as light"
      ],
      "why": "Light arrives and electrical energy comes out, so the form changes. That is a transformation. Calling it a transfer is tempting because the energy moves into the calculator, but the form is different.",
      "clue": "Compare the energy form going in with the form coming out."
    }
  },
  "sci-energy-flow-diagrams": {
    "title": "Energy flow diagrams",
    "card": [
      "An energy flow diagram shows the forms of energy in a system, in order. Arrows join the forms and point from one form to the next.",
      "A torch is drawn as: chemical energy in the battery, then electrical energy in the wires, then light and heat from the globe.",
      "Each box names a form of energy. Each arrow shows a change from one form to another.",
      "Most changes also give off some heat that is not wanted. It is drawn as an extra arrow leaving the main path."
    ],
    "remember": "Read a flow diagram arrow by arrow, and expect some unwanted heat to leave along the way.",
    "a": {
      "q": "What does an arrow in an energy flow diagram show?",
      "opts": [
        "A change from one form of energy to the next",
        "The size of the object that holds the energy",
        "The place where the energy is finally used up",
        "The time that each change in the system takes"
      ],
      "why": "An arrow joins two forms of energy and shows the change from one to the next. It does not show size or time. Energy is also not used up at the end, because it ends up in other forms.",
      "clue": "Look at what sits at each end of an arrow."
    },
    "b": {
      "d": 3,
      "q": "Isla charges her phone, then plays a video. Which flow diagram best fits the phone while it plays, including unwanted heat?",
      "opts": [
        "Chemical to electrical to light and sound, with some heat",
        "Electrical to chemical to light and sound, with no heat",
        "Chemical to electrical to light and sound, with no heat",
        "Light and sound to electrical to chemical, with some heat"
      ],
      "why": "The battery stores chemical energy, which becomes electrical energy and then light and sound from the screen and speaker. Most changes also give off some unwanted heat, so a diagram with no heat is incomplete. The order of the forms also matters.",
      "clue": "Start with where the energy is stored, and check whether heat is shown."
    }
  },
  "sci-energy-swinging-or-rolling": {
    "title": "Energy in a swinging or rolling system",
    "card": [
      "The higher an object is above the ground, the more gravitational potential energy it has. The faster it moves, the more kinetic energy it has.",
      "On a roller-coaster, the cars slow down as they climb. Kinetic energy is transformed into gravitational potential energy.",
      "As the cars drop, height falls and speed rises. Gravitational potential energy is transformed into kinetic energy.",
      "A pendulum does the same. It is fastest at the lowest point, where kinetic energy is greatest. It is highest at the end of each swing, where it stops for a moment and gravitational potential energy is greatest."
    ],
    "remember": "As height goes up, speed goes down, and the energy changes back and forth between the two forms.",
    "a": {
      "q": "A swing is at the top of its arc and is stopped for an instant. Which energy does it have the most of at that point?",
      "opts": ["Gravitational potential energy", "Kinetic energy", "Elastic potential energy", "Chemical potential energy"],
      "why": "At the top of the arc the swing is at its highest point, so gravitational potential energy is greatest. Kinetic energy is greatest at the bottom, where the swing moves fastest, so it is not the answer here.",
      "clue": "Think about height at the top of the arc."
    },
    "b": {
      "d": 2,
      "q": "A roller-coaster car rolls down a long slope from the top of a hill. What happens to its energy as it drops?",
      "opts": [
        "Potential energy falls and kinetic energy rises",
        "Potential energy rises and kinetic energy falls",
        "Both potential and kinetic energy rise",
        "Both potential and kinetic energy fall"
      ],
      "why": "As the car drops, its height falls, so gravitational potential energy falls. Its speed rises, so kinetic energy rises. Climbing a hill would be the reverse, which is the tempting wrong option.",
      "clue": "Check what happens to height and to speed as the car drops."
    }
  },
  "sci-atoms-elements": {
    "title": "Atoms and elements",
    "card": [
      "An atom is a very small particle that makes up all matter. Atoms are the building blocks of every substance.",
      "An element is a substance made of only one type of atom. Gold is an element because it contains only gold atoms.",
      "An element cannot be broken down into simpler substances by chemical reactions.",
      "Each element has a symbol of one or two letters. The first letter is always a capital and the second is lower case, such as O for oxygen and Na for sodium."
    ],
    "remember": "An element has one type of atom only, and it has its own symbol.",
    "a": {
      "q": "Why is copper classed as an element?",
      "opts": [
        "It is made of only one type of atom",
        "It is made of atoms joined in a fixed ratio",
        "It is a mixture of metals with similar atoms",
        "It can be broken down into simpler substances"
      ],
      "why": "An element is a substance made of only one type of atom, and copper contains only copper atoms. Atoms joined in a fixed ratio describes something else, because an element does not need different atoms joined together. An element also cannot be broken down into simpler substances.",
      "clue": "Think about how many types of atom an element contains."
    },
    "b": {
      "d": 2,
      "q": "Priya is labelling a jar of magnesium. Its symbol uses the letters m and g. How should she write the symbol?",
      "opts": [
        "Mg, with a capital M and a lower case g",
        "MG, with both letters as capitals",
        "mg, with both letters in lower case",
        "mG, with a lower case m and a capital G"
      ],
      "why": "A symbol starts with a capital letter, and any second letter is lower case, so magnesium is Mg. MG is the most tempting wrong option, but it breaks the rule that the second letter is lower case.",
      "clue": "Only one letter in a symbol is a capital. Which one?"
    }
  },
  "sci-molecules-compounds": {
    "title": "Molecules and compounds",
    "card": [
      ["Molecule", "two or more atoms joined together. The atoms can be the same kind or different kinds."],
      [
        "Compound",
        "a substance with two or more different elements chemically joined. The elements are joined in fixed amounts."
      ],
      "A compound has properties unlike the elements it is made from. Sodium is a soft metal and chlorine is a poisonous gas, but sodium chloride is the salt we put on chips.",
      "Oxygen gas is a molecule made of two oxygen atoms, but it is not a compound because it has only one element. Water is both a molecule and a compound."
    ],
    "remember": "A compound joins different elements in fixed amounts, and it behaves differently from them.",
    "a": {
      "q": "Which substance is a compound?",
      "opts": [
        "Water, made of hydrogen and oxygen atoms joined",
        "Oxygen gas, made of two oxygen atoms joined",
        "Helium gas, made of single helium atoms",
        "Iron, made of iron atoms only"
      ],
      "why": "Water has two different elements, hydrogen and oxygen, chemically joined, so it is a compound. Oxygen gas is a molecule, but both its atoms are the same, so it has only one element.",
      "clue": "A compound needs more than one kind of element."
    },
    "b": {
      "d": 3,
      "q": "Priya says carbon dioxide is a compound because it is a molecule. Is her reasoning correct?",
      "opts": [
        "No, a molecule can be made of just one element",
        "Yes, a molecule is made of different elements joined",
        "No, a compound is made of just one kind of atom",
        "Yes, joined atoms of any kind make a compound"
      ],
      "why": "A molecule is two or more atoms joined, and they can be the same kind, as in oxygen gas. So being a molecule does not make something a compound. Carbon dioxide is a compound because it has two different elements, carbon and oxygen, joined, not just because its atoms are joined.",
      "clue": "Think about oxygen gas, which has two atoms joined."
    }
  },
  "sci-reading-chemical-formulas": {
    "title": "Reading chemical formulas",
    "card": [
      "A chemical formula shows which atoms are in a substance. It uses the symbol for each element.",
      "A small number written after a symbol tells you how many atoms of that element there are. In H2O, the 2 means two hydrogen atoms.",
      "If a symbol has no small number, there is one atom of that element. H2O has two hydrogen atoms and one oxygen atom.",
      "The small number only applies to the symbol just before it. In CO2, the 2 applies to O, so there is one carbon atom and two oxygen atoms."
    ],
    "remember": "Read each symbol, then the small number after it. No number means one atom.",
    "a": {
      "q": "What does the formula H2O tell you about one unit of water?",
      "opts": [
        "It has two hydrogen atoms and one oxygen atom",
        "It has one hydrogen atom and two oxygen atoms",
        "It has two hydrogen atoms and two oxygen atoms",
        "It has one hydrogen atom and one oxygen atom"
      ],
      "why": "The small 2 comes after H, so it applies to hydrogen. O has no number, so there is one oxygen atom. Putting the 2 on oxygen reverses the formula.",
      "clue": "Which symbol sits directly before the small 2?"
    },
    "b": {
      "d": 3,
      "q": "Ammonia has the formula NH3. How many atoms of each element are in one unit of ammonia?",
      "opts": [
        "One nitrogen atom and three hydrogen atoms",
        "Three nitrogen atoms and one hydrogen atom",
        "One nitrogen atom and one hydrogen atom",
        "Three nitrogen atoms and three hydrogen atoms"
      ],
      "why": "The small 3 comes after H, so there are three hydrogen atoms. N has no number, so there is one nitrogen atom. The 3 does not apply to N, which is the tempting mistake.",
      "clue": "The small number applies only to the symbol just before it."
    }
  },
  "sci-telling-elements-compounds-mixtures": {
    "title": "Telling elements, compounds and mixtures apart",
    "card": [
      [
        "Element",
        "a particle diagram shows only one kind of atom. The atoms may be single or joined in pairs, but they are all the same kind."
      ],
      [
        "Compound",
        "every particle in the diagram is the same group of different atoms joined together. That one group repeats throughout."
      ],
      [
        "Mixture",
        "the diagram shows two or more kinds of particle side by side. They are not joined to each other, so each substance keeps its own particles."
      ],
      "To classify a diagram, first check whether every particle is the same. If not, it is a mixture. If so, look inside a particle: one kind of atom is an element, and different atoms joined is a compound."
    ],
    "remember": "Two or more kinds of particle make a mixture. If every particle is the same, one kind of atom is an element and joined different atoms are a compound.",
    "a": {
      "q": "A particle diagram shows green and yellow circles. Every green circle is joined to two yellow circles, and every group looks the same. What does the diagram show?",
      "opts": ["A compound", "An element", "A mixture", "A single atom"],
      "why": "Every particle is the same group, and each group has two kinds of atom joined, so it is a compound. It is not a mixture, because there is only one kind of particle, and it is not an element, because each particle has two kinds of atom.",
      "clue": "Is every particle in the diagram the same?"
    },
    "b": {
      "d": 3,
      "q": "A diagram shows some particles made of one red atom joined to two white atoms, and other particles made of one black atom joined to two red atoms. How should it be classified?",
      "opts": ["A mixture of two compounds", "A single compound", "A mixture of two elements", "A compound of three elements"],
      "why": "There are two kinds of particle, so it is a mixture. Each kind has different atoms joined, so each one is a compound. Calling it one compound is tempting because the atoms inside each particle are joined, but the two kinds of particle are not joined to each other.",
      "clue": "Count the kinds of particle before looking inside them."
    }
  },
  "sci-periodic-table-begins": {
    "title": "The periodic table begins",
    "card": [
      "In 1869, the Russian chemist Dmitri Mendeleev arranged the elements known at the time into a table. He ordered them by mass and grouped those with similar properties.",
      "Mendeleev left gaps in his table for elements that had not been found yet. He used the pattern of properties to predict what the missing elements would be like.",
      "Later, elements were discovered that matched his predictions. This gave scientists good reason to trust the table.",
      "In the modern periodic table, metals sit on the left and non-metals sit on the right."
    ],
    "remember": "The table grouped elements by pattern, and its gaps predicted new ones.",
    "a": {
      "q": "Why did Mendeleev leave gaps in his periodic table?",
      "opts": [
        "He expected elements not yet found to fit those spaces",
        "He had run out of room for the elements he knew about",
        "He wanted to separate the metals from the non-metals",
        "He could not work out the masses of some known elements"
      ],
      "why": "The pattern of properties suggested that some elements were still missing, so he left spaces for them. The gaps were not about room or about sorting metals from non-metals, because the card says he ordered elements by mass and properties.",
      "clue": "Think about what the gaps let him predict."
    },
    "b": {
      "d": 2,
      "q": "Ayesha looks at a modern periodic table. Sulfur is a non-metal. Where is it most likely to be found?",
      "opts": [
        "On the right side of the table",
        "On the left side of the table",
        "In a gap Mendeleev left empty",
        "In a separate table of mixtures"
      ],
      "why": "Non-metals sit on the right of the modern periodic table, so sulfur is on the right. The left side is where metals sit, which is the tempting wrong answer.",
      "clue": "Metals are on one side, non-metals on the other."
    }
  },
  "sci-physical-changes": {
    "title": "Physical changes",
    "card": [
      "In a physical change, no new substance forms. The particles stay the same, but the way they are arranged or spread out may change.",
      "Melting, freezing, boiling, condensing and dissolving are physical changes. So are cutting, bending and crushing.",
      "A physical change is usually easy to reverse. Water that freezes into ice can be melted back into water, and salt dissolved in water can be recovered by evaporating the water.",
      "The substance has the same identity before and after. Ice, liquid water and steam are all water."
    ],
    "remember": "Physical change: same substance, new form or arrangement, usually easy to undo.",
    "a": {
      "q": "Which change is a physical change?",
      "opts": [
        "Butter melting in a warm pan",
        "Milk going sour in a hot car",
        "A candle wax burning away",
        "An egg cooking in hot water"
      ],
      "why": "Melting only changes butter from solid to liquid, and no new substance forms. The other changes make new substances, so they are not physical changes.",
      "clue": "Which change leaves the same substance behind?"
    },
    "b": {
      "d": 3,
      "q": "Tom stirs sugar into hot tea and the sugar disappears. Why is this a physical change?",
      "opts": [
        "The sugar is still there and could be recovered",
        "The sugar has turned into a new substance in the tea",
        "The sugar has been destroyed by the heat",
        "The change cannot be reversed once it has happened"
      ],
      "why": "The sugar has spread out through the water, but it is still sugar. Evaporating the water would leave the sugar behind. Disappearing from sight does not mean a new substance formed.",
      "clue": "Disappearing from sight is not the same as being gone."
    }
  },
  "sci-chemical-changes": {
    "title": "Chemical changes",
    "card": [
      "In a chemical change, the atoms in the starting substances rearrange to make new substances. The atoms are not created or destroyed. They join up in a different way.",
      "The new substances have different properties from the starting ones. Iron and oxygen make rust, which is crumbly and reddish-brown, not hard and grey.",
      "A chemical change is usually hard to reverse. You cannot easily turn ash and smoke back into wood.",
      "The test is whether a new substance forms. A change in shape or state, or mixing two things, does not prove a chemical change. Melting is a physical change instead."
    ],
    "remember": "Chemical change: atoms rearrange into new substances, and it is usually hard to undo.",
    "a": {
      "q": "Which statement best describes what happens to atoms in a chemical change?",
      "opts": [
        "They rearrange to form new substances",
        "They are destroyed and replaced by new atoms",
        "They stay joined in the same way as before",
        "They turn into a different state of matter"
      ],
      "why": "In a chemical change the same atoms join up in new ways, so new substances form. The atoms are not destroyed. Staying joined the same way would mean no new substance forms.",
      "clue": "Think about what happens to the atoms, not whether they vanish."
    },
    "b": {
      "d": 3,
      "q": "Lena fries an egg. The clear, runny egg white turns into a firm white solid. Why is this a chemical change?",
      "opts": [
        "A new substance with different properties formed",
        "The egg white changed from a liquid to a solid",
        "The egg white spread out and changed its shape",
        "The egg white mixed with the oil in the pan"
      ],
      "why": "The atoms in the egg white rearranged into a new substance with new properties, and cooling the egg does not undo it. Going from liquid to solid is tempting, but a change of state alone does not prove a chemical change, as water freezing shows.",
      "clue": "Ask whether a new substance has formed."
    }
  },
  "sci-signs-chemical-reaction": {
    "title": "Signs of a chemical reaction",
    "card": [
      "Some changes give clues that a chemical reaction has happened. These clues are signs that a new substance may have formed.",
      "Common signs are gas bubbles, a new solid called a precipitate, a colour change, light given off, and a temperature change.",
      "A sign only suggests a reaction. It is not proof, because some physical changes also show one. Boiling water makes bubbles, but they are just water vapour.",
      "The best evidence is a new substance with different properties. Look for a sign that cannot be explained by a change of state or by dissolving."
    ],
    "remember": "Bubbles, a precipitate, a colour change, light or a temperature change suggest a reaction, but check that a new substance formed.",
    "a": {
      "q": "Two clear liquids are mixed in a beaker. A cloudy white solid slowly sinks to the bottom. What is this solid called, and what does it suggest?",
      "opts": [
        "A precipitate, which suggests a chemical reaction",
        "A precipitate, which suggests a physical change",
        "A solute, which suggests a chemical reaction",
        "A solute, which suggests a physical change"
      ],
      "why": "A new solid that forms when two liquids are mixed is a precipitate, and it is a sign of a chemical reaction. A solute is a substance that dissolves, so it does not appear as a new solid.",
      "clue": "A new solid has appeared from two liquids."
    },
    "b": {
      "d": 3,
      "q": "Liam heats a pot of water on the stove and sees bubbles rising. Mia adds a tablet to water and sees bubbles rising. Which statement is best?",
      "opts": [
        "Mia's bubbles suggest a reaction, but Liam's may not",
        "Both sets of bubbles prove a chemical reaction happened",
        "Neither set of bubbles can ever suggest a reaction",
        "Liam's bubbles suggest a reaction, but Mia's may not"
      ],
      "why": "Boiling water makes bubbles of water vapour, which is a change of state and a physical change. A tablet making bubbles when added to water suggests a new gas may be forming. Bubbles are a sign, not proof, so each case needs checking.",
      "clue": "Ask what the bubbles in each case are made of."
    }
  },
  "sci-reactions-that-release-or": {
    "title": "Exothermic and endothermic reactions",
    "card": [
      "Chemical reactions involve energy changes. Often this energy moves as heat between the reaction and its surroundings.",
      [
        "Exothermic",
        "a reaction that releases energy to its surroundings, so they get warmer. Burning wood is an example."
      ],
      [
        "Endothermic",
        "a reaction that takes in energy from its surroundings, so they get cooler. An instant ice pack uses an endothermic change to cool in the same way."
      ],
      "A thermometer in the surroundings shows which kind it is. A temperature rise means exothermic. A temperature fall means endothermic."
    ],
    "remember": "Exothermic: energy out, surroundings warm. Endothermic: energy in, surroundings cool.",
    "a": {
      "q": "Which description fits an exothermic reaction?",
      "opts": [
        "It releases energy and warms its surroundings",
        "It takes in energy and cools its surroundings",
        "It releases energy and cools its surroundings",
        "It takes in energy and warms its surroundings"
      ],
      "why": "An exothermic reaction gives out energy, so the surroundings gain energy and get warmer. Taking in energy and cooling the surroundings describes an endothermic reaction. The two mixed options cannot happen: energy released warms the surroundings, and energy taken in cools them.",
      "clue": "Think of burning: where does the heat go?"
    },
    "b": {
      "d": 3,
      "q": "Priya mixes two powders in water and they react. The thermometer reading falls from 22 °C to 14 °C. What does this show about the reaction?",
      "opts": [
        "It is endothermic because it took in energy",
        "It is exothermic because it took in energy",
        "It is exothermic because the water got colder",
        "It is endothermic because it released energy"
      ],
      "why": "The surroundings cooled, so energy moved from them into the reaction. That makes it endothermic. The tempting mistake is to link cold with exothermic, but exothermic reactions warm their surroundings.",
      "clue": "Look at what happened to the surroundings, not the reaction."
    }
  },
  "sci-models-matter-change-over": {
    "title": "Models of matter change over time",
    "card": [
      "A model is an idea or picture that helps scientists explain what they observe. Scientists change a model when new evidence does not fit it.",
      [
        "Democritus",
        "an ancient Greek thinker who proposed that matter is made of tiny particles that cannot be divided. He called them atoms. His idea came from reasoning, not from experiments."
      ],
      [
        "Dalton",
        "a scientist in the early 1800s who built atomic theory from experiments. He proposed that each element is made of its own kind of atom, and that atoms join in set ways to form compounds."
      ],
      "Later experiments and better instruments gave new evidence about atoms, so the model kept changing. A model that changes is not a failure. It shows science using new evidence."
    ],
    "remember": "Models of matter change when new evidence from experiments and instruments does not fit the old model.",
    "a": {
      "q": "Why did ideas about atoms change from Democritus's model to Dalton's?",
      "opts": [
        "Dalton used experiments to give evidence for atoms",
        "Dalton showed that Democritus had made an error in reasoning",
        "Dalton had access to better microscopes than Democritus",
        "Dalton was more famous, so people accepted his model"
      ],
      "why": "Dalton built his theory from experiments, so it had evidence behind it. Microscopes were not the reason: the card says Democritus used reasoning, and Dalton relied on experimental evidence.",
      "clue": "Think about where each person's idea came from."
    },
    "b": {
      "d": 3,
      "q": "A scientist finds that a new instrument gives results that her current model of the atom cannot explain. What would scientists most likely do?",
      "opts": [
        "Change the model so that it fits the new evidence",
        "Ignore the results because the model is already accepted",
        "Keep the model because models never change once published",
        "Throw out all earlier work on atoms as worthless"
      ],
      "why": "Scientists change a model when new evidence does not fit it. Keeping the model unchanged ignores the evidence, and earlier work still helped lead to the improved model.",
      "clue": "What do scientists do when evidence does not fit a model?"
    }
  },
  "sci-science-decisions-about-resources": {
    "title": "Science and decisions about resources",
    "card": [
      "A mine, or a plan to restore land after mining, has many effects. People weigh them to decide, using evidence from science.",
      "Environmental effects are on land, water, air, plants and animals. Economic effects are on money, such as jobs, income and costs.",
      "Social effects are on people's health, communities and way of life. Ethical effects are about what is right and fair, such as who gains and who is harmed.",
      "Effects on Country matter too: the land, waters and living things First Nations people belong to and care for. Traditional Owners' knowledge and views are part of the decision."
    ],
    "remember": "Science gives evidence, and the decision weighs every kind of effect, including on Country.",
    "a": {
      "q": "Restoring a mine site after it closes would cost the company $20 million. Which kind of effect is this?",
      "opts": [
        "Economic, as it is about costs",
        "Environmental, as it is about land",
        "Social, as it is about a community",
        "Ethical, as it is about fairness"
      ],
      "why": "A cost to the company is an effect on money, so it is economic. The plan is about land, but this fact is its price, not what happens to the land.",
      "clue": "What is measured in dollars?"
    },
    "b": {
      "d": 3,
      "q": "A council is weighing a new sand mine on a First Nations group's Country. It has evidence on jobs, people's health, wildlife, and who gains and who loses. What has it left out?",
      "opts": [
        "Traditional Owners' views and knowledge",
        "The effect the mine has on local jobs",
        "The environmental effects on wildlife",
        "The fairness of who gains and who loses"
      ],
      "why": "The council has evidence on economic, social, environmental and ethical effects. The mine is on Country, so Traditional Owners' knowledge and views are part of the decision too. Jobs, wildlife and fairness are already in its evidence.",
      "clue": "Whose land and waters is the mine on?"
    }
  },
  "sci-judging-science-media": {
    "title": "Judging science in the media",
    "card": [
      "Media includes news, websites, videos and social media. Some science claims in the media are sound and some are not.",
      "A claim is more trustworthy when it names its source, so you can check where it came from.",
      "It is also more trustworthy when it shows its evidence, such as data from a test, and when it comes from experts who study that field.",
      "Be careful with claims based on opinion, or from someone selling a product. They may leave out evidence that does not help the sale, so check what experts in the field have found."
    ],
    "remember": "A claim is more trustworthy with a named source, evidence and experts behind it.",
    "a": {
      "q": "Which claim is the most trustworthy?",
      "opts": [
        "A university team reports test results and names the journal",
        "A famous singer says a tea cures colds, from her own use",
        "An advert says nine in ten love a cream, with no source",
        "A post says a diet works because a friend lost weight"
      ],
      "why": "The university team names the journal, shows its test results and is made up of experts in the field. The advert sounds like evidence, but it names no source and it is selling something.",
      "clue": "Look for a named source and evidence from experts."
    },
    "b": {
      "d": 2,
      "q": "A video claims a new drink makes you smarter. The video is made by the company that sells the drink. What is the best first step?",
      "opts": [
        "Check what experts in that field have found",
        "Trust it, since the company knows its drink best",
        "Trust it, since customers in the video say it works",
        "Try the drink yourself and judge how smart you feel"
      ],
      "why": "The company is selling the drink, so it may leave out evidence that does not help the sale. Checking what experts in the field have found is the best step. Customers saying it works, or your own feeling after trying it, is opinion, not tested evidence.",
      "clue": "Who gains if you buy the drink?"
    }
  },
  "sci-writing-aim-hypothesis": {
    "title": "Writing an aim and hypothesis",
    "card": [
      [
        "Aim",
        "A statement of what the investigation will find out. It is often written as \"To investigate how X affects Y\"."
      ],
      [
        "Hypothesis",
        "A prediction that can be tested. A good one links the independent variable (the one you change) to the dependent variable (the one you measure)."
      ],
      "A good hypothesis can be shown wrong by the results. A statement that no result could contradict cannot be tested.",
      "A hypothesis is often written as \"If the independent variable is changed, then the dependent variable will change in this way\". It should use the same variables as the aim."
    ],
    "remember": "The aim says what you will find out. The hypothesis predicts the link between the two variables and can be tested.",
    "a": {
      "q": "Which of these is a hypothesis that could be tested in an investigation?",
      "opts": [
        "If the water is hotter, then sugar will dissolve faster",
        "To find out how temperature affects sugar dissolving",
        "Sugar and water are used in many kitchens and laboratories",
        "Sugar might dissolve faster, or it might not dissolve faster"
      ],
      "why": "The hot water statement predicts how changing temperature changes dissolving speed, so results could show it wrong. The statement starting \"To find out\" is an aim with no prediction, and the kitchens statement is a general fact that links no variables. The \"might or might not\" statement fits any result, so it cannot be shown wrong.",
      "clue": "Look for a prediction linking a changed variable to a measured one."
    },
    "b": {
      "d": 3,
      "q": "Ravi wants to know how the height of a ramp affects how far a toy car rolls. Which hypothesis is best?",
      "opts": [
        "If the ramp is higher, then the car will roll further",
        "If the ramp is changed, then the car will do something",
        "The car will roll further on a smooth floor than a rough one",
        "To investigate how ramp height affects the distance rolled"
      ],
      "why": "The ramp height statement names the variable Ravi changes and the one he measures, and gives a direction that results could contradict. The smooth floor statement can be tested, but it changes floor surface, not ramp height, so it does not match Ravi's aim. The \"do something\" statement is too vague to be shown wrong, and the \"To investigate\" statement is an aim, not a prediction.",
      "clue": "Which option uses Ravi's two variables and could be shown wrong?"
    }
  },
  "sci-repeat-trials-averages": {
    "title": "Repeat trials and averages",
    "card": [
      "A trial is one run of an experiment at one setting of the independent variable. Repeating a trial means running it again under the same conditions.",
      "Random errors change results in an unpredictable way, such as a small slip in timing. Averaging the repeats cancels out much of this. Add the results, then divide by the number of trials.",
      [
        "Repeatable",
        "your own repeats under the same conditions give close results. Repeats that are spread out are less reliable, and the cause should be checked."
      ],
      [
        "Reproducible",
        "other people repeat your trials with your method, or test the idea a different way, and get similar results. Your own repeats cannot show this."
      ]
    ],
    "remember": "Averaging repeats reduces random error. Close repeats of your own show results are repeatable; close repeats by others show they are reproducible.",
    "a": {
      "q": "Ella runs each trial of her experiment four times and works out the average. What does the averaging do?",
      "opts": [
        "It reduces the effect of random errors on the result",
        "It removes the need to control other variables",
        "It makes the hypothesis more likely to be correct",
        "It shows that other people would get the same result"
      ],
      "why": "Random errors push single results up or down in unpredictable ways, so averaging cancels out much of this. Averaging Ella's own repeats says nothing about what other people would get, and the other variables still need to be controlled.",
      "clue": "What happens when a result that is too high is added to one that is too low?"
    },
    "b": {
      "d": 3,
      "q": "Priya times a marble rolling down her ramp three times: 2.1 s, 2.2 s and 2.1 s. Tom times a marble on his own ramp three times: 1.6 s, 2.4 s and 2.9 s. Which statement is correct?",
      "opts": [
        "Priya's repeats are close, so her results are repeatable",
        "Priya's repeats are close, so her results are reproducible",
        "Tom's repeats vary a lot, so his average is more reliable",
        "Both sets are repeatable because both have three trials"
      ],
      "why": "Priya's own repeats under the same conditions are close, which shows her results are repeatable. They are not shown to be reproducible, because nobody else has repeated her trials. Tom's repeats are spread out, so his results are less reliable.",
      "clue": "Who did the repeats: Priya herself, or other people?"
    }
  },
  "sci-risk-assessment": {
    "title": "Risk assessment",
    "card": [
      "A hazard is anything in an investigation that could cause harm, such as a hot plate, a sharp blade or an acid. A risk is the chance that a hazard will actually harm someone.",
      "A risk assessment is done before the investigation starts. It lists each hazard in the method and who could be harmed.",
      "For each hazard it also says how likely harm is and how serious it could be. A hazard that is likely to cause serious harm needs the most care.",
      "It then states how to reduce the risk, such as wearing safety glasses with acids, tying back long hair near a flame or using small amounts."
    ],
    "remember": "Find the hazards, judge the likelihood and seriousness of harm, then plan how to reduce the risk.",
    "a": {
      "q": "Which of these is a way to reduce the risk in a risk assessment?",
      "opts": [
        "Wearing safety glasses when pouring acid",
        "Writing down that acid can burn skin",
        "Predicting that acid will react with metal",
        "Recording how long the acid reaction takes"
      ],
      "why": "Safety glasses are an action that reduces the risk of harm from the acid. Noting that acid can burn skin only names the hazard, so it does not reduce the risk by itself.",
      "clue": "Which one is an action that makes harm less likely?"
    },
    "b": {
      "d": 3,
      "q": "Lena plans to heat water in a beaker on a Bunsen burner. Her risk assessment says burns are likely and could be serious. What should it do next?",
      "opts": [
        "State how to reduce the risk, such as using tongs",
        "Remove burns from the list because they are likely",
        "Wait until someone is burnt, then add a safety step",
        "Repeat the heating three times to find an average"
      ],
      "why": "After judging the likelihood and seriousness of harm, a risk assessment states how to reduce the risk, such as using tongs or a heatproof mat. Repeating trials is a different idea and does not make heating any safer.",
      "clue": "The hazard and its level of harm are already listed. What is missing?"
    }
  },
  "sci-drawing-conclusion": {
    "title": "Drawing a conclusion",
    "card": [
      "A conclusion comes at the end of an investigation. It answers the aim in a sentence or two.",
      "It says whether the data supports the hypothesis. One investigation can support a hypothesis, but it does not prove it.",
      "It uses the results as evidence, quoting the measurements or the pattern in them. For example: \"Paper planes with longer wings flew further, 6.2 m on average compared with 4.1 m.\"",
      "It claims only what the results show. It does not stretch to things that were not tested."
    ],
    "remember": "Answer the aim, judge the hypothesis, and point to the results that show it.",
    "a": {
      "q": "Kai's results show warmer water dissolved sugar faster, as his hypothesis predicted. Which sentence belongs in his conclusion?",
      "opts": [
        "The results support the hypothesis",
        "The results prove the hypothesis true",
        "The hypothesis was changed to fit the data",
        "The results show sugar dissolves in all liquids"
      ],
      "why": "Kai's data agrees with his prediction, so it supports the hypothesis. Saying the results prove the hypothesis true claims too much, because one investigation cannot prove a hypothesis.",
      "clue": "Support and prove do not mean the same thing."
    },
    "b": {
      "d": 3,
      "q": "Lena's aim was to find out whether a ball bounces higher on concrete or on grass. Over 5 drops on each, it bounced 62 cm on average on concrete and 18 cm on grass. Which is the best conclusion?",
      "opts": [
        "It bounced higher on concrete, 62 cm to 18 cm on average",
        "It bounced higher on concrete, so all balls do the same",
        "It bounced higher on concrete because concrete is cold",
        "It bounced 62 cm, which proves concrete is always best"
      ],
      "why": "It answers the aim and quotes the averages as evidence. The other options stretch to all balls, give a reason that was never tested, or claim proof.",
      "clue": "Stay with what Lena measured."
    }
  },
  "sci-stimulus-receptor-effector": {
    "title": "Stimulus, receptor and effector",
    "card": [
      [
        "Stimulus",
        "a change inside or outside the body that the body can detect, such as a loud noise or a drop in body temperature."
      ],
      ["Receptor", "a cell or organ that detects a stimulus. The eyes, ears and skin hold receptors."],
      [
        "Control centre",
        "a part, such as the brain, that takes in the information from receptors and decides how to respond."
      ],
      [
        "Effector",
        "a muscle or gland that carries out the response. A muscle moves a body part, and a gland releases a substance."
      ]
    ],
    "remember": "The body detects a change, decides what to do, then acts on it.",
    "a": {
      "q": "Ravi hears a car horn and jumps back onto the footpath. Which part of this is the stimulus?",
      "opts": [
        "The sound of the car horn",
        "The ears detecting the sound",
        "The brain deciding to move",
        "The leg muscles moving him back"
      ],
      "why": "The stimulus is the change that is detected, which is the sound. The ears are the receptors, the brain is the control centre, and the leg muscles are the effectors. The ears are tempting but they detect the stimulus and are not the stimulus.",
      "clue": "The stimulus is the change itself, not the part that detects it."
    },
    "b": {
      "d": 3,
      "q": "Lena smells hot chips and her mouth begins to water. Which is the effector?",
      "opts": ["The salivary glands", "The nose", "The brain", "The smell of the chips"],
      "why": "The effector carries out the response, and here the response is saliva being released by the glands. The nose is the receptor that detects the smell. The brain decides, but it does not produce the response itself.",
      "clue": "Which part actually produces the response?"
    }
  },
  "sci-nervous-system": {
    "title": "The nervous system",
    "card": [
      "The nervous system is made of neurons, which are cells that carry messages as electrical impulses. Impulses travel very fast.",
      "Sensory neurons carry impulses from receptors to the brain and spinal cord. Motor neurons carry impulses from the brain and spinal cord to effectors, such as muscles.",
      "In most responses, the impulse goes to the brain, which decides what to do. This takes a little longer.",
      "A reflex is a fast, automatic response. The impulse is passed on in the spinal cord without going to the brain first, so the effector acts sooner."
    ],
    "remember": "Neurons carry fast impulses, and a reflex is quicker because it skips the brain.",
    "a": {
      "q": "Which describes what a motor neuron does?",
      "opts": [
        "Carries impulses from the spinal cord to a muscle",
        "Carries impulses from a receptor to the spinal cord",
        "Carries hormones from a gland to the blood",
        "Carries impulses from the brain to a receptor"
      ],
      "why": "A motor neuron carries impulses to an effector such as a muscle. Carrying impulses from a receptor to the spinal cord is the job of a sensory neuron, which is the most tempting mix-up.",
      "clue": "Motor neurons lead to the part that responds."
    },
    "b": {
      "d": 3,
      "q": "Sam steps on a sharp shell on a beach in Perth and his foot jerks up before he feels pain. Why was the response so quick?",
      "opts": [
        "The impulse was passed on in the spinal cord, not the brain",
        "The impulse travelled faster along the neurons than normal",
        "The foot detected the shell without using a receptor",
        "The brain sent a stronger impulse to the leg muscles"
      ],
      "why": "In a reflex, the impulse is passed on in the spinal cord without going to the brain first, which shortens the path. The impulses do not travel faster, and a receptor is still needed to detect the shell.",
      "clue": "Think about the path the impulse takes, not its speed."
    }
  },
  "sci-endocrine-system": {
    "title": "The endocrine system",
    "card": [
      "The endocrine system is made up of glands. Glands release chemical messengers called hormones.",
      "Hormones travel in the blood. They reach cells all around the body, but they only affect cells that can respond to them.",
      "Hormone messages are slower than nerve messages, because blood carries them. Their effects often last longer, from minutes to hours or more.",
      "Adrenaline is a hormone released by the adrenal glands in a fright. It raises heart rate and gets the body ready for action, and the effects last for a while after the danger has passed."
    ],
    "remember": "Hormones are slower than nerves, but their effects often last longer.",
    "a": {
      "q": "How do hormones travel from a gland to the cells they affect?",
      "opts": ["In the blood", "Along neurons", "Through the skin", "Through the lungs"],
      "why": "Glands release hormones into the blood, and the blood carries them around the body. Neurons carry nerve impulses, not hormones, so travelling along neurons is a common mix-up.",
      "clue": "Think about what the body uses to carry things around."
    },
    "b": {
      "d": 2,
      "q": "Tom is startled by a snake on a bush track. His heart still pounds a few minutes after it slithers away. What best explains this?",
      "opts": [
        "Adrenaline has long-lasting effects",
        "Hormones act faster than nerve messages",
        "Adrenaline is carried along neurons",
        "The adrenal glands have stopped working"
      ],
      "why": "Adrenaline is a hormone, and hormone effects often last longer than the effects of nerve messages. That is why his heart keeps pounding after the danger is gone. The option saying hormones act faster than nerve messages is wrong, because hormones travel in the blood and are slower than nerves.",
      "clue": "Compare how long hormone effects last with nerve effects."
    }
  },
  "sci-negative-feedback": {
    "title": "Negative feedback",
    "card": [
      "Negative feedback keeps conditions in the body steady. When a change happens, the body responds in a way that reverses it.",
      "If the body gets too hot, sweating cools it down. Once the temperature returns to normal, the response eases off.",
      "If the body gets too cold, shivering makes muscles release heat and warms it up.",
      "The word negative does not mean bad. It means the response works against the change, so conditions move back towards their normal level."
    ],
    "remember": "Negative feedback reverses a change to keep conditions steady.",
    "a": {
      "q": "What does negative feedback do when a condition in the body rises above normal?",
      "opts": [
        "Causes a response that brings it back down",
        "Causes a response that pushes it up further",
        "Stops the body from detecting the change",
        "Leaves it high until the stimulus ends"
      ],
      "why": "Negative feedback reverses the change, so a rise leads to a response that lowers the condition. Pushing it up further would make the change bigger, which is not what negative feedback does.",
      "clue": "Negative means working against the change."
    },
    "b": {
      "d": 2,
      "q": "Priya has been standing in a cold pool in Hobart and begins to shiver. How does shivering show negative feedback?",
      "opts": [
        "It warms her body, reversing the fall in temperature",
        "It cools her body, reversing the fall in temperature",
        "It warms her body, making the cold change bigger",
        "It shows her body has stopped detecting the cold"
      ],
      "why": "Shivering makes muscles release heat, which reverses the drop in body temperature. It is not a bad response just because she feels uncomfortable: it works against the change.",
      "clue": "Which response works against the cold?"
    }
  },
  "sci-blood-glucose-diabetes": {
    "title": "Blood glucose and diabetes",
    "card": [
      "Glucose is a sugar from food. Cells use it for energy, and it travels around the body in the blood.",
      "After a meal, blood glucose rises. The pancreas releases the hormone insulin, which helps cells take in glucose, so blood glucose falls back.",
      "In diabetes, this system does not work properly. In some people the pancreas makes little or no insulin. In others the cells do not respond well to it. Blood glucose then stays too high.",
      "Some people with diabetes need insulin injections to bring their blood glucose down."
    ],
    "remember": "Insulin lowers blood glucose. In diabetes, that control fails.",
    "a": {
      "q": "Priya eats a large plate of pasta and her blood glucose rises. What does her pancreas do?",
      "opts": [
        "Releases insulin so blood glucose falls",
        "Releases insulin so blood glucose rises more",
        "Stops insulin so blood glucose falls",
        "Stops insulin so blood glucose rises more"
      ],
      "why": "Insulin helps cells take in glucose, so blood glucose falls. Releasing insulin would not make glucose rise further. The pancreas responds to the rise by releasing insulin, not by stopping it.",
      "clue": "Which hormone brings blood glucose down?"
    },
    "b": {
      "d": 3,
      "q": "Sam has diabetes and his pancreas makes almost no insulin. Why might insulin injections help him?",
      "opts": [
        "They supply the insulin his body lacks",
        "They stop him from absorbing glucose from food",
        "They make his pancreas release more glucose",
        "They replace the glucose his cells need"
      ],
      "why": "Without insulin, cells cannot take in glucose well and blood glucose stays high. Injections supply the missing insulin. They do not replace glucose, because the problem is too much in the blood and not too little.",
      "clue": "Think about what is missing when the pancreas makes no insulin."
    }
  },
  "sci-sexual-asexual-reproduction": {
    "title": "Sexual and asexual reproduction",
    "card": [
      [
        "Asexual",
        "One parent makes new organisms, with no gametes joining. The offspring have the same genes as the parent, so they are identical to it and to each other."
      ],
      [
        "Sexual",
        "Two gametes, which are sex cells, join to form a new organism. Usually one gamete comes from each parent."
      ],
      "Each gamete carries a different mix of genes, so the offspring get a new combination. They are not identical to their parents or to each other.",
      "Bacteria splitting in two is asexual. A dog having puppies and a rose bush making seeds are both sexual."
    ],
    "remember": "One parent gives identical offspring. Two gametes give offspring that vary.",
    "a": {
      "q": "A bacterium in a pond splits into two new cells. Why are the two new cells identical to each other?",
      "opts": [
        "One parent made them, so they share its genes",
        "Two gametes joined, so they share the same genes",
        "Each got a new mix of genes from two parents",
        "Each gamete carried the same mix of genes"
      ],
      "why": "Splitting in two is asexual: one parent makes the new cells with no gametes joining, so both get the parent's genes. Gametes joining would mix genes and give offspring that vary, so that cannot explain identical cells.",
      "clue": "Count the parents and ask if gametes joined."
    },
    "b": {
      "d": 3,
      "q": "Two brown mice in Darwin have a litter of four. The pups differ in colour and size. What best explains this?",
      "opts": [
        "Each pup got a new mix of genes from two gametes",
        "Each pup came from one parent splitting in two",
        "Each pup copied the genes of one parent exactly",
        "Each pup got the same genes from both parents"
      ],
      "why": "Each pup forms when two gametes join, and each gamete carries a different mix of genes, so the pups vary. One parent copying itself would give identical offspring, so that cannot explain pups that differ.",
      "clue": "Think about what joins to make each pup."
    }
  },
  "sci-gametes-fertilisation": {
    "title": "Gametes and fertilisation",
    "card": [
      "Gametes are the sex cells used in sexual reproduction. Males make sperm and females make egg cells.",
      [
        "Sperm",
        "small cells with a tail, so they can swim to the egg. They carry genetic material from the male parent."
      ],
      [
        "Egg",
        "a much larger cell that cannot swim. It holds a store of food that feeds the new organism in its early growth."
      ],
      "Fertilisation is when a sperm joins with an egg. The joined cell carries genetic material from both parents and starts a new organism."
    ],
    "remember": "A small swimming sperm joins a large, food-filled egg, and that starts a new organism.",
    "a": {
      "q": "Why is the egg cell much larger than a sperm cell?",
      "opts": [
        "It holds food for the early growth of the new organism",
        "It has a long tail that helps it swim towards the sperm",
        "It carries genetic material from both of the parents",
        "It makes the sperm cell that will join with it"
      ],
      "why": "The egg holds a store of food that feeds the new organism before it can get food in other ways. The egg does not swim, and it carries genetic material from only one parent until fertilisation.",
      "clue": "Think about what the new organism needs at the very start."
    },
    "b": {
      "d": 3,
      "q": "Under a microscope, Priya sees two cells from a frog. Cell X is small with a tail. Cell Y is large and round with a lot of stored food. Which statement is correct?",
      "opts": [
        "X is a sperm and Y is an egg, and fertilisation joins them",
        "X is an egg and Y is a sperm, and fertilisation joins them",
        "X and Y are both eggs, and fertilisation joins them",
        "X is a sperm and Y is an egg, and fertilisation divides them"
      ],
      "why": "A small cell with a tail is a sperm, and a large cell with a food store is an egg. Fertilisation joins the two cells. It does not divide them, and it needs one of each type of gamete.",
      "clue": "Match the tail and the food store to the right gamete."
    }
  },
  "sci-reproduction-flowering-plants": {
    "title": "Reproduction in flowering plants",
    "card": [
      "Pollen is made in the anther. It is carried to the stigma of a flower by wind or by animals such as bees and birds. This move is called pollination.",
      "A pollen grain grows a tube down to an ovule in the ovary. A male gamete from the pollen joins the egg inside the ovule. This is fertilisation.",
      "After fertilisation, the ovule becomes a seed. The ovary becomes a fruit that holds the seed or seeds.",
      "Many plants also grow new plants without seeds. Runners are stems that grow along the soil, and bulbs are underground food stores. Both can grow into new plants."
    ],
    "remember": "Pollen lands on the stigma, fertilises an ovule, and the ovule becomes a seed. Runners and bulbs make new plants without seeds.",
    "a": {
      "q": "In a flowering plant, what does an ovule become after it is fertilised?",
      "opts": ["A seed", "A fruit", "A grain of pollen", "A runner"],
      "why": "Fertilisation joins a male gamete with the egg in the ovule, and the ovule then becomes a seed. The fruit is tempting, but the fruit grows from the ovary, which holds the seeds.",
      "clue": "The ovule is inside the ovary."
    },
    "b": {
      "d": 2,
      "q": "Sam grows a strawberry plant in Perth. It sends out long stems along the soil, and a new plant grows from each stem. Which statement explains how the new plants form?",
      "opts": [
        "The stems are runners, which grow new plants without seeds",
        "The stems carry pollen, which fertilises a new ovule",
        "The stems are bulbs, which store seeds for the new plants",
        "The stems are fruits, which hold the seeds of new plants"
      ],
      "why": "Stems that grow along the soil and make new plants are runners. They do this without seeds, pollen or fertilisation. The fruit option is tempting, but a fruit grows from the ovary after fertilisation and is not a stem.",
      "clue": "Does a runner need pollen to make a new plant?"
    }
  },
  "sci-variation-helps-species-survive": {
    "title": "Why variation helps a species survive",
    "card": [
      "Sexual reproduction mixes the features of two parents, so offspring differ from each other. This difference is called variation.",
      "If the environment changes, for example a new disease arrives, some varied offspring may have features that help them survive. They can then breed and pass those features on.",
      "Asexual offspring are identical to their parent. If a new disease harms one of them, it can harm them all, so a whole group may die.",
      "In a stable place, asexual reproduction can be an advantage. One parent can make offspring quickly without finding a mate, and the offspring suit the place as well as the parent does."
    ],
    "remember": "Variation makes it more likely that some survive a change. Asexual reproduction is quick when conditions stay the same.",
    "a": {
      "q": "A new disease spreads through a field of identical plants grown from one parent. Why might all of the plants die?",
      "opts": [
        "They are identical, so none may have a feature to resist it",
        "They are too crowded, so the disease spreads to every plant",
        "They have no variation in size, so they grow too slowly",
        "They came from one parent, so they cannot make seeds"
      ],
      "why": "Identical plants share the same features, so if the disease harms one it can harm all. Crowding might help a disease spread, but it is not the reason the whole group lacks any resistant plant.",
      "clue": "Think about what identical offspring have in common."
    },
    "b": {
      "d": 3,
      "q": "Two kinds of plant grow on a farm where conditions stay steady. Kind A reproduces asexually. Kind B reproduces sexually. Which comparison is correct?",
      "opts": [
        "A spreads faster now, B is likelier to survive a change",
        "B spreads faster now, A is likelier to survive a change",
        "A spreads faster now, A is likelier to survive a change",
        "B spreads faster now, B is likelier to survive a change"
      ],
      "why": "Kind A needs no mate, so in steady conditions it can make offspring quickly. Kind B's offspring vary, so some are more likely to have features that help them survive a change. Kind A does not win both ways: its offspring are identical, so one change can harm them all.",
      "clue": "Each kind of reproduction has a different advantage."
    }
  },
  "sci-number-offspring-parental-care": {
    "title": "Number of offspring and parental care",
    "card": [
      "Some animals, such as cod and many other fish, give their young no care after hatching. They produce huge numbers of eggs, and most of the young are eaten or die early.",
      "Other animals feed, shelter and protect their young. Examples are kangaroos, humans and many birds. They usually have few offspring at a time.",
      "Care raises the chance that each young animal survives to adulthood. So a few young can be enough to replace the parents.",
      "Without care, each young animal has a small chance of surviving. Producing huge numbers makes it likely that at least some will survive."
    ],
    "remember": "Few young with care, or huge numbers with none: both ways can leave survivors.",
    "a": {
      "q": "Which animal is matched with the right pattern of care and number of offspring?",
      "opts": [
        "A kangaroo: one young, with care",
        "A kangaroo: thousands of young, with no care",
        "A cod: one young, with care",
        "A cod: a few young, with care"
      ],
      "why": "A kangaroo feeds and protects its young, so it has few at a time. Thousands of young with no care fits fish such as cod, not a kangaroo, which makes it the tempting wrong choice.",
      "clue": "Which animal feeds and protects its young?"
    },
    "b": {
      "d": 3,
      "q": "A fish lays 50 000 eggs and leaves them. Most are eaten, but a few young reach adulthood. Why is laying so many eggs useful?",
      "opts": [
        "It makes it likely that some young will survive",
        "It lets the fish care for each young one better",
        "It makes sure that every young fish survives",
        "It means the young no longer need food to grow"
      ],
      "why": "With no care, each egg has a small chance of surviving, so large numbers make it likely that some do. It does not ensure every young fish survives, as the scenario says most are eaten.",
      "clue": "Think about the chance each egg has of surviving."
    }
  },
  "sci-earth-s-four-spheres": {
    "title": "Earth's four spheres",
    "card": [
      ["Geosphere", "the rock, soil and landforms of Earth, from the surface down to the core."],
      ["Biosphere", "all living things, such as plants, animals and microbes, and the places where they live."],
      [
        "Hydrosphere",
        "all the water on Earth, as liquid, ice and water vapour, including oceans, rivers and groundwater."
      ],
      [
        "Atmosphere",
        "the layer of gases around Earth. Matter and energy move between all four spheres, so a change in one can affect the others."
      ]
    ],
    "remember": "Earth's rock, life, water and air are linked, and matter and energy flow between them.",
    "a": {
      "q": "Which sphere includes the oceans, rivers and ice caps?",
      "opts": ["Hydrosphere", "Geosphere", "Biosphere", "Atmosphere"],
      "why": "The hydrosphere is all the water on Earth, in liquid, ice and vapour form. The geosphere is tempting because oceans sit on the seafloor, but it is the rock and soil, not the water.",
      "clue": "Think about what each sphere is made of."
    },
    "b": {
      "d": 3,
      "q": "Rain falls on a hillside in Tasmania and washes soil into a stream. Which two spheres does the moving matter pass between?",
      "opts": [
        "Hydrosphere and geosphere",
        "Atmosphere and biosphere",
        "Biosphere and hydrosphere",
        "Geosphere and atmosphere"
      ],
      "why": "Rain is water, so it is part of the hydrosphere. It moves soil, which is part of the geosphere, into the stream. Biosphere is tempting because a hillside has plants, but the question is about the water and soil moving.",
      "clue": "Name what the rain is made of and what the soil is."
    }
  },
  "sci-photosynthesis-respiration-carbon-cycle": {
    "title": "Photosynthesis and respiration in the carbon cycle",
    "card": [
      [
        "Photosynthesis",
        "Plants, algae and some bacteria use light energy to turn carbon dioxide and water into glucose and oxygen. This takes carbon dioxide out of the air or water and puts the carbon into living things."
      ],
      [
        "Respiration",
        "Cells break down glucose to release energy, and carbon dioxide is released. Plants, animals and fungi all respire, so all of them return carbon dioxide to the air or water."
      ],
      "Animals get carbon by eating plants or other animals. The carbon in their bodies came from photosynthesis.",
      "Together, the two processes move carbon between the atmosphere and living things. When photosynthesis and respiration are about equal, the amount of carbon dioxide in the air stays steady."
    ],
    "remember": "Photosynthesis moves carbon from the air into living things. Respiration moves it back.",
    "a": {
      "q": "Which process in a eucalyptus tree takes carbon dioxide from the air and builds it into glucose?",
      "opts": ["Photosynthesis", "Respiration", "Digestion", "Decomposition"],
      "why": "Photosynthesis uses light energy to turn carbon dioxide and water into glucose. Respiration is the tempting answer, but it does the reverse: it breaks glucose down and releases carbon dioxide.",
      "clue": "Which process needs light energy?"
    },
    "b": {
      "d": 3,
      "q": "Priya says plants take in carbon dioxide but do not give any out. Which reply is correct?",
      "opts": [
        "Wrong: plant cells respire and give out carbon dioxide",
        "Wrong: photosynthesis gives out carbon dioxide",
        "Right: plants give out oxygen in place of carbon dioxide",
        "Right: respiration happens in animals but not in plants"
      ],
      "why": "Plants, animals and fungi all respire, and respiration releases carbon dioxide, so Priya is wrong. The tempting option blames photosynthesis, but photosynthesis takes carbon dioxide in and gives out oxygen.",
      "clue": "Which living things respire, according to the card?"
    }
  },
  "sci-combustion-carbon-stores": {
    "title": "Combustion and carbon stores",
    "card": [
      "A carbon store is a place where carbon stays for a long time. Fossil fuels, rocks, oceans and forests are all carbon stores.",
      "Fossil fuels such as coal, oil and gas formed from the remains of living things buried over millions of years. Their carbon has been locked away for that whole time.",
      "Combustion means burning. When fossil fuels burn, the carbon in them joins with oxygen and is released into the air as carbon dioxide.",
      "Nature moves carbon out of these stores slowly. Burning fuels releases it in a short time, so carbon dioxide can build up in the air."
    ],
    "remember": "Carbon can stay in stores for millions of years, but burning fossil fuels releases carbon from one store quickly.",
    "a": {
      "q": "What happens to the carbon in coal when a power station burns it?",
      "opts": [
        "It is released into the air as carbon dioxide",
        "It is stored deeper in the rocks as new coal",
        "It stays behind in the ash left after burning",
        "It is turned into oxygen that stays in the air"
      ],
      "why": "Combustion joins the carbon in coal with oxygen, which makes carbon dioxide that goes into the air. It does not stay in the ash, because joining with oxygen turns it into a gas that leaves the fire.",
      "clue": "Burning joins carbon with oxygen."
    },
    "b": {
      "d": 3,
      "q": "Why can burning fossil fuels raise the amount of carbon dioxide in the air faster than natural processes remove it?",
      "opts": [
        "It frees carbon stored for millions of years in a short time",
        "It makes new carbon that was not on Earth before",
        "It stops forests and oceans from taking in any carbon",
        "It moves carbon from the air into rocks more quickly"
      ],
      "why": "Fossil fuels hold carbon that built up over millions of years, and burning releases it in a short time. Burning does not create carbon. It moves carbon from one store to the air.",
      "clue": "Think about how long the carbon was stored and how long it takes to burn."
    }
  },
  "sci-greenhouse-effect": {
    "title": "The greenhouse effect",
    "card": [
      "Earth's surface is warmed by sunlight. It gives off heat, which travels back up through the atmosphere towards space.",
      "Greenhouse gases, such as carbon dioxide, methane and water vapour, absorb some of this heat. They send some of it back towards the surface, so less heat escapes to space.",
      "This natural greenhouse effect keeps Earth warm enough for life. Without it, Earth's average temperature would be far below freezing.",
      "When there is more of these gases in the atmosphere, more heat is trapped. This makes Earth's average temperature rise."
    ],
    "remember": "Greenhouse gases slow heat loss to space, so more gas means more trapped heat.",
    "a": {
      "q": "What do greenhouse gases such as carbon dioxide do in the atmosphere?",
      "opts": [
        "Absorb some heat leaving Earth and send some back",
        "Block sunlight so that it never reaches Earth's surface",
        "Make heat that warms the atmosphere from within it",
        "Reflect all heat from the surface straight into space"
      ],
      "why": "Greenhouse gases absorb some of the heat given off by Earth's surface and send some back down, so less escapes to space. They do not stop sunlight reaching the surface, which is what warms it in the first place.",
      "clue": "Think about heat leaving Earth, not sunlight arriving."
    },
    "b": {
      "d": 3,
      "q": "Planet X and Planet Y receive the same sunlight. Planet X has an atmosphere with more greenhouse gases than Planet Y. What is most likely?",
      "opts": [
        "Planet X traps more heat and is warmer on average",
        "Planet X traps less heat and is cooler on average",
        "Planet X has the same temperature as Planet Y",
        "Planet X gets more sunlight, so it is warmer on average"
      ],
      "why": "More greenhouse gases absorb and return more of the heat leaving the surface, so less escapes and the planet is warmer. The sunlight is the same, so the difference comes from the atmosphere, not from the amount of sunlight received.",
      "clue": "The sunlight is equal, so look at what happens to the heat leaving."
    }
  },
  "sci-capturing-carbon": {
    "title": "Capturing carbon",
    "card": [
      "Carbon capture means taking carbon dioxide out of the air and holding it as carbon in another store. Forests do this when trees grow, because photosynthesis builds carbon into wood and leaves.",
      "Soils and oceans also take up carbon naturally. Soils hold carbon in dead plant matter. Oceans absorb carbon dioxide from the air, and it dissolves in the water.",
      "First Nations Australians have long managed fire on Country, with cool, planned burns early in the dry season. These can reduce large, hot fires later in the year, which release much more carbon and leave less stored in plants and soil.",
      "New technologies can help too. Some machines capture carbon dioxide from the air or from factory smoke, and it can then be stored deep underground."
    ],
    "remember": "Carbon can be captured by nature and by people, and each way holds carbon out of the air.",
    "a": {
      "q": "Why can planting a new forest reduce the carbon dioxide in the air?",
      "opts": [
        "Growing trees take in carbon dioxide and build it into wood",
        "Trees make carbon dioxide into water that falls as rain",
        "Trees give out carbon dioxide that is then stored in soil",
        "Trees block heat from reaching the air above the forest"
      ],
      "why": "Growing trees use photosynthesis to take carbon dioxide from the air and build it into wood and leaves, so the carbon is stored. Trees do not turn carbon dioxide into rain, and they do not release it as a way of storing it.",
      "clue": "Think about what trees take in as they grow."
    },
    "b": {
      "d": 3,
      "q": "A ranger group in northern Australia lights cool, planned burns early in the dry season. How does this help keep carbon stored?",
      "opts": [
        "It lowers the chance of large, hot fires later in the year",
        "It adds carbon dioxide to the soil to help plants grow later",
        "It turns some carbon in the plants into rock underground",
        "It cools the air so that plants take in more carbon dioxide"
      ],
      "why": "Cool, planned burns can reduce large, hot fires later in the year. Hot fires release much more carbon, so fewer of them leaves more carbon stored in plants and soil. The burns do not put carbon dioxide into the soil to feed plants, and they do not turn plant carbon into rock.",
      "clue": "Compare the carbon released by cool burns and by hot fires."
    }
  },
  "sci-conduction": {
    "title": "Conduction",
    "card": [
      "Conduction is the way heat passes through a material from particle to particle. Hot particles vibrate more and bump into their neighbours, passing energy along.",
      "Heat moves from the hotter part of an object to the cooler part. The material itself does not move from one place to another.",
      [
        "Conductor",
        "a material that lets heat pass through easily. Metals such as copper and iron are good conductors."
      ],
      [
        "Insulator",
        "a material that heat passes through slowly. Air and wool are insulators, so they are used to keep heat in or out."
      ]
    ],
    "remember": "Conduction passes heat by particle collisions. Metals pass it on quickly, air and wool slowly.",
    "a": {
      "q": "Jaz leaves a metal spoon in a hot soup. Soon the handle feels warm. How did the heat reach the handle?",
      "opts": [
        "Particles in the spoon collided and passed energy along",
        "Hot soup particles travelled up the spoon to the handle",
        "Warm air rose from the soup and heated the handle",
        "The spoon's particles all moved from the bowl to the handle"
      ],
      "why": "Heat travelled along the metal as particles bumped into their neighbours. The particles stayed in place and only passed on energy, so the idea that soup particles climbed the spoon is wrong.",
      "clue": "Think about what the particles in the spoon do to their neighbours."
    },
    "b": {
      "d": 3,
      "q": "Lena wears a wool jumper on a cold day in Hobart and stays warm. Why does wool help?",
      "opts": [
        "It is an insulator, so heat leaves her body slowly",
        "It is a conductor, so heat moves through it quickly",
        "It makes heat for her body through its fibres",
        "It stops her body from losing any heat at all"
      ],
      "why": "Wool and the air it holds are insulators, so they slow the passing of heat from her warm body to the cold air. The option saying wool stops her losing any heat at all is wrong, because insulators slow heat loss and do not stop it.",
      "clue": "Which kind of material passes heat on slowly?"
    }
  },
  "sci-convection": {
    "title": "Convection",
    "card": [
      "A fluid is a liquid or a gas. Its particles can move from place to place, so they can carry heat with them.",
      "When part of a fluid is heated, its particles spread out. The warm fluid becomes less dense than the fluid around it, so it rises.",
      "Cooler fluid is more dense, so it sinks to take the place of the rising fluid.",
      "This loop of rising warm fluid and sinking cool fluid is a convection current. It happens in liquids and gases, but not in solids."
    ],
    "remember": "Warm fluid rises and cool fluid sinks, making a convection current that carries heat.",
    "a": {
      "q": "Why does warm water rise in a pot heated from below?",
      "opts": [
        "It is less dense than the cooler water around it",
        "It is more dense than the cooler water around it",
        "Its particles shrink and become lighter",
        "Its particles pass heat on by collisions only"
      ],
      "why": "Heated water spreads out, so the same amount takes up more space and is less dense. It floats upward through the cooler water. It does not become more dense, which would make it sink.",
      "clue": "Think about what spreading out does to density."
    },
    "b": {
      "d": 2,
      "q": "On a cold winter morning, Sam's classroom in Hobart has a heater on the floor. What happens to the air in the room?",
      "opts": [
        "Warm air rises and cooler air sinks, forming a current",
        "Warm air sinks and cooler air rises, forming a current",
        "Warm air stays by the heater and nothing else moves",
        "Heat passes along the air only by particle collisions"
      ],
      "why": "Air by the heater warms, spreads out and rises, and cooler air sinks to replace it. This makes a convection current. The reverse order is wrong because warm air is less dense, not more.",
      "clue": "Which air is less dense, warm or cool?"
    }
  },
  "sci-sound-as-wave": {
    "title": "Sound as a wave",
    "card": [
      "Sound is a vibration. A vibrating object, such as a guitar string, pushes on nearby particles and sets them vibrating.",
      "The vibration is passed from particle to particle through a medium, which is the material the sound travels through. The particles move back and forth and do not travel with the sound.",
      "Sound travels faster in solids than in air. The particles in a solid are close together and strongly linked, so each one passes the vibration on to the next quickly.",
      "Sound needs particles to travel through. It cannot travel through a vacuum, which is empty space with no particles."
    ],
    "remember": "Sound is a vibration passed on by particles, so it needs a medium and is faster in solids than in air.",
    "a": {
      "q": "Why can astronauts not hear a spacecraft's engine from outside in space?",
      "opts": [
        "Space is a vacuum, so no particles pass on the vibration",
        "Space is too cold for the engine to make any sound at all",
        "Sound travels too slowly through solids to be heard",
        "The engine stops vibrating once it leaves Earth's air"
      ],
      "why": "Sound needs particles to pass the vibration along, and a vacuum has none, so the sound cannot travel. Cold is not the reason: the engine still vibrates, but there is no medium to carry the vibration.",
      "clue": "What does sound need to pass from one place to another?"
    },
    "b": {
      "d": 3,
      "q": "Ari puts an ear against a long steel fence and a friend taps the far end. Ari hears the tap before the sound arrives through the air. Why?",
      "opts": [
        "Sound travels faster in a solid than in air",
        "Sound travels faster in air than in a solid",
        "The tapped steel moves along the fence to Ari's ear",
        "Sound travels through steel but not through air"
      ],
      "why": "The particles in steel are close together and strongly linked, so they pass the vibration on faster than the loosely spread particles in air. The steel itself does not move along the fence, only the vibration does. Sound does travel through air, just more slowly.",
      "clue": "Think about how the particles in steel are held together compared with air."
    }
  },
  "sci-parts-wave": {
    "title": "Parts of a wave",
    "card": [
      ["Wavelength", "the distance from one peak of a wave to the next peak. It is measured in metres."],
      [
        "Amplitude",
        "the height of a wave from its rest position to a peak. A bigger amplitude means the wave carries more energy."
      ],
      [
        "Frequency",
        "the number of complete waves that pass a point each second. It is measured in hertz (Hz), where 1 Hz is one wave each second."
      ],
      "For sound, a higher frequency gives a higher pitch. Pitch is how high or low a note sounds."
    ],
    "cardFigs": {
      "2": {
        "kind": "graph",
        "alt": "A wave drawn along its rest position, the horizontal line. The wavelength is the distance from one peak to the next peak, shown by the arrow along the top. The amplitude is the height from the rest position up to a peak, shown by the upright arrow.",
        "x": {"min": 0, "max": 19, "label": "Distance"},
        "y": {"min": -3, "max": 4, "label": "Height"},
        "items": [
          {"type": "fn", "id": "w", "expr": "2\\sin(x)", "domain": [0, 14.137]},
          {"type": "arrow", "from": [1.571, 2.6], "to": [7.854, 2.6], "label": "wavelength", "pos": "above"},
          {"type": "arrow", "from": [14.137, 0], "to": [14.137, 2], "label": "amplitude", "pos": "right"}
        ]
      }
    },
    "remember": "Wavelength is a distance, amplitude is a height, and frequency is a count each second that sets pitch.",
    "a": {
      "q": "Which part of a wave is the distance from one peak to the next peak?",
      "opts": ["Wavelength", "Amplitude", "Frequency", "Pitch"],
      "why": "Wavelength is the distance between one peak and the next. Amplitude is tempting, but it is the height of the wave, not a distance along it.",
      "clue": "Think of measuring along the wave, from peak to peak."
    },
    "b": {
      "d": 3,
      "q": "Sam plucks a guitar string and hears a low note. He then presses the string to shorten it and plucks again. The new note is higher. What has changed about the sound wave?",
      "opts": ["Its frequency is higher", "Its frequency is lower", "Its amplitude is higher", "Its amplitude is lower"],
      "why": "A higher pitch means a higher frequency, so more waves pass each second. Amplitude is tempting, but it is the height of the wave and does not set how high or low a note sounds.",
      "clue": "Pitch is linked to how many waves pass each second."
    }
  },
  "sci-electromagnetic-spectrum": {
    "title": "The electromagnetic spectrum",
    "card": [
      "Visible light is one part of a family of waves called the electromagnetic spectrum. All of these waves carry energy and can travel through a vacuum, which is empty space with no matter in it.",
      "In order from longest wavelength to shortest, the family is radio waves, microwaves, infrared, visible light, ultraviolet, X-rays and gamma rays.",
      "Moving along the spectrum from radio waves to gamma rays, the wavelength gets shorter and the frequency gets higher. Higher-frequency waves can be more energetic, which is why ultraviolet, X-rays and gamma rays can damage living cells.",
      "All electromagnetic waves travel at the same speed in a vacuum. They differ in wavelength and frequency, which is why they behave differently, such as visible light being seen and X-rays passing through soft tissue."
    ],
    "remember": "Light is one kind of electromagnetic wave. The kinds differ in wavelength and frequency, not in speed in a vacuum.",
    "a": {
      "q": "Which of these is true of visible light?",
      "opts": [
        "It is one of several kinds of electromagnetic wave",
        "It is the only kind of wave that can cross a vacuum",
        "It has the shortest wavelength in the spectrum",
        "It moves faster than radio waves through a vacuum"
      ],
      "why": "Visible light sits in a family with radio waves, X-rays and others. All of them can cross a vacuum and all travel at the same speed there, so light is not special in either way. Gamma rays, not visible light, have the shortest wavelength.",
      "clue": "Think about which waves are in the same family as light."
    },
    "b": {
      "d": 3,
      "q": "Besides visible light, the Sun sends other electromagnetic waves across empty space to Earth. Which comparison with visible light is correct?",
      "opts": [
        "Ultraviolet has a shorter wavelength than visible light",
        "Ultraviolet has a longer wavelength than visible light",
        "Infrared has a higher frequency than visible light",
        "Infrared moves faster than visible light through space"
      ],
      "why": "Ultraviolet lies past violet in the spectrum, so its wavelength is shorter than visible light's. Infrared lies on the other side, with a longer wavelength and a lower frequency, and all electromagnetic waves travel at the same speed in a vacuum.",
      "clue": "Recall the order of the spectrum and which way wavelength changes along it."
    }
  },
  "sci-wave-particle-models-light": {
    "title": "Wave and particle models of light",
    "card": [
      "A model is a way of explaining how something behaves. Scientists use two models for light, because one model cannot explain everything light does.",
      [
        "Wave model",
        "light travels as a wave. It explains why light spreads out after passing through a narrow gap and why it bends when it moves from air into water."
      ],
      [
        "Particle model",
        "light is a stream of tiny packets of energy called photons. It explains why light is absorbed in separate amounts of energy, such as when a solar cell takes in light."
      ],
      "Neither model is wrong. Each one explains some behaviour of light, so scientists choose the model that fits what they are studying."
    ],
    "remember": "Spreading and bending fit the wave model. Absorption in separate packets fits the particle model.",
    "a": {
      "q": "A laser beam passes through a very narrow slit and fans out on the far side. Which model explains this best?",
      "opts": [
        "The wave model, because waves spread after a gap",
        "The particle model, because photons spread after a gap",
        "The wave model, because waves are absorbed in packets",
        "The particle model, because photons bend in water"
      ],
      "why": "Spreading out after a narrow gap is a wave behaviour, so the wave model explains it. The particle model is tempting, but it is used for absorption in separate packets, not for spreading.",
      "clue": "Think about which behaviour belongs to which model."
    },
    "b": {
      "d": 3,
      "q": "Sam's solar panel takes in sunlight and turns it into electricity. Which model best explains how the panel absorbs the light, and why?",
      "opts": [
        "Particle model, as energy is absorbed in separate packets",
        "Wave model, as waves are absorbed as packets of energy",
        "Particle model, as photons spread out after a narrow gap",
        "Wave model, as light bends when it enters the glass cover"
      ],
      "why": "The particle model explains why light is absorbed in separate packets of energy, called photons. The wave model can describe light being taken in, but it does not explain these separate packets. Bending in the glass cover is a real wave behaviour, but it is not how the panel absorbs light.",
      "clue": "Focus on how the light is taken in, not how it travels."
    }
  },
  "sci-static-current-electricity": {
    "title": "Static and current electricity",
    "card": [
      [
        "Static electricity",
        "a build-up of electric charge on an object, such as a balloon after it is rubbed on hair. The charge stays on the object instead of flowing along a path."
      ],
      [
        "Current electricity",
        "a flow of charge through a conductor, such as a copper wire. A conductor is a material that lets charge move through it easily."
      ],
      "A voltage is what pushes charge around a circuit. A battery provides the voltage, and the charge flows only if the circuit is a complete loop.",
      "Rubbing can make charge build up on an object. Built-up charge can suddenly jump away all at once, as a small spark."
    ],
    "remember": "Static is charge that builds up. Current is charge that flows, pushed by a voltage.",
    "a": {
      "q": "Which of these shows current electricity?",
      "opts": [
        "Charge moving through the wires of a lit torch",
        "Charge building up on a child going down a slide",
        "Charge sitting on a plastic comb after combing",
        "Charge collecting on a jumper rubbed on a rug"
      ],
      "why": "In a lit torch, charge flows through the wires, which are conductors, in a complete loop. That is current electricity. The child, the comb and the jumper all show static electricity, where charge builds up and stays on the object.",
      "clue": "Which example needs a conductor and a complete loop?"
    },
    "b": {
      "d": 3,
      "q": "Ana joins a battery, a globe and wires into a complete loop, and the globe lights up. What is the battery's job in this circuit?",
      "opts": [
        "Giving a voltage that pushes charge around the loop",
        "Storing static charge that builds up on the globe",
        "Acting as a conductor that lets the charge flow",
        "Making charge by rubbing parts together inside it"
      ],
      "why": "The battery provides the voltage, which pushes charge around the complete loop. Letting charge flow is the job of conductors such as the copper wires, and a conductor does not push the charge.",
      "clue": "Think about what makes charge move, not what lets it move."
    }
  },
  "sci-conservation-energy": {
    "title": "Conservation of energy",
    "card": [
      "Energy cannot be made or destroyed. It can only be transferred from one object to another, or transformed from one type to another.",
      [
        "Transfer",
        "energy moves from one place or object to another, such as heat moving from a hot drink into a cold cup."
      ],
      [
        "Transformation",
        "energy changes type, such as chemical energy in a battery becoming electrical energy and then light and heat."
      ],
      "The total energy in a system stays the same before and after. Some energy often ends up as heat or sound that spreads into the surroundings, so it is hard to collect, but it has not disappeared."
    ],
    "remember": "Energy is never lost or created. The total stays the same, even when it spreads out.",
    "a": {
      "q": "A ball rolls along a rough floor and slows to a stop. What happens to its kinetic energy?",
      "opts": [
        "It becomes heat and sound in the floor and air",
        "It is destroyed because the ball has stopped",
        "It stays in the ball as kinetic energy",
        "It becomes new energy that adds to the total"
      ],
      "why": "Energy is not destroyed. The ball's kinetic energy is transformed into heat and sound, which spread into the floor and air. Saying it is destroyed is tempting because the ball stops moving, but the energy has only changed form.",
      "clue": "Where does the energy go if it cannot disappear?"
    },
    "b": {
      "d": 3,
      "q": "Priya's torch has a battery that stores 100 J of chemical energy. It gives out 20 J as light. How much energy goes elsewhere?",
      "opts": [
        "80 J, as heat in the torch and its surroundings",
        "0 J, because the battery energy was used up",
        "80 J, which is destroyed inside the torch",
        "20 J, because light and heat share the energy equally"
      ],
      "why": "The total stays at 100 J, so 100 J minus 20 J leaves 80 J. It is transformed into heat that spreads into the torch and the air. Calling it used up or destroyed is tempting, but energy is never destroyed.",
      "clue": "The total energy before and after must match."
    }
  },
  "sci-efficiency-sankey-diagrams": {
    "title": "Efficiency and Sankey diagrams",
    "card": [
      "Useful energy is the energy that does the job you want. Energy that is not useful, such as heat from a motor, is wasted.",
      "Efficiency = useful energy out ÷ total energy in × 100. The answer is a percentage.",
      "A Sankey diagram shows where energy goes. The width of each arrow matches the amount of energy: a wider arrow means more energy.",
      "The input arrow is the widest. It splits into a useful output arrow and a wasted output arrow. The output widths add up to the input width."
    ],
    "remember": "Efficiency is useful out ÷ total in. In a Sankey diagram, arrow width shows the amount.",
    "a": {
      "q": "A kettle takes in 2000 J of electrical energy and transfers 1600 J to heat the water. What is its efficiency?",
      "opts": ["80%", "20%", "125%", "1600%"],
      "why": "Efficiency = 1600 ÷ 2000 × 100 = 80%. Dividing the other way gives 125%, which is impossible because useful energy cannot be more than the energy put in.",
      "clue": "Put useful energy on top and total energy underneath."
    },
    "b": {
      "d": 3,
      "q": "In a Sankey diagram for a lamp, the input arrow is 10 units wide. The arrow for light is 2 units wide. What does the diagram show?",
      "opts": [
        "The lamp is 20% efficient, with 8 units wasted as heat",
        "The lamp is 80% efficient, with 2 units wasted as heat",
        "The lamp is 20% efficient, with 2 units wasted as heat",
        "The lamp is 80% efficient, with 8 units wasted as heat"
      ],
      "why": "Light is the useful output, so efficiency = 2 ÷ 10 × 100 = 20%. The other 8 units are wasted, and the output widths add up to the input width. Mixing up the useful and wasted arrows gives 80%.",
      "clue": "Which arrow is the useful one, and what is left over?"
    }
  },
  "sci-protons-neutrons-electrons": {
    "title": "Protons, neutrons and electrons",
    "card": [
      ["Proton", "a particle with a positive charge. It sits in the nucleus, the small centre of the atom."],
      ["Neutron", "a particle with no charge. It also sits in the nucleus."],
      [
        "Electron",
        "a particle with a negative charge. It moves around the nucleus and is far lighter than a proton or neutron."
      ],
      "In a neutral atom, the number of electrons equals the number of protons. The positive and negative charges cancel out."
    ],
    "remember": "The nucleus holds the positive protons and the neutral neutrons. The light, negative electrons move around it.",
    "a": {
      "q": "Which particles are found in the nucleus of an atom?",
      "opts": ["Protons and neutrons", "Protons and electrons", "Neutrons and electrons", "Electrons only"],
      "why": "Protons and neutrons are the heavier particles that sit in the nucleus. Protons and electrons can seem right because both have a charge, but electrons move around the nucleus rather than sitting in it.",
      "clue": "Go through the three particles and recall where each one is."
    },
    "b": {
      "d": 3,
      "q": "A neutral atom of sodium has 11 protons. How many electrons does it have, and why?",
      "opts": [
        "11, so the charges cancel out",
        "11, because electrons sit in the nucleus",
        "12, so there is one more than the protons",
        "0, because the atom has no overall charge"
      ],
      "why": "A neutral atom has equal numbers of positive protons and negative electrons, so 11 electrons cancel the charge of 11 protons. No overall charge does not mean no electrons, because the charges balance.",
      "clue": "Neutral means the positive and negative charges are balanced."
    }
  },
  "sci-model-atom-changed": {
    "title": "How the model of the atom changed",
    "card": [
      "A model of the atom is changed when new evidence does not fit the old one. Scientists have updated the model several times.",
      [
        "Thomson",
        "He found the electron, a tiny negative particle inside the atom. So atoms were not solid balls that could not be split."
      ],
      [
        "Rutherford",
        "His team fired positive particles at thin gold foil. Most went straight through, but a few bounced back. This showed a small, dense, positive nucleus with mostly empty space around it."
      ],
      [
        "Chadwick",
        "He found the neutron, a particle in the nucleus with no charge. This explained why the nucleus has more mass than its protons alone."
      ]
    ],
    "remember": "New evidence changed the model: electron, then nucleus, then neutron.",
    "a": {
      "q": "In the gold foil experiment, a few particles bounced back. What did this show?",
      "opts": [
        "Atoms have a small, dense nucleus",
        "Atoms contain negative electrons",
        "Atoms contain neutral neutrons",
        "Atoms are solid balls of gold"
      ],
      "why": "Only a small, dense, positive centre could push particles back. Most passed straight through because the atom is mostly empty space. The electron was found earlier, in Thomson's work.",
      "clue": "Think about what could be hard enough to bounce a particle back."
    },
    "b": {
      "d": 3,
      "q": "Before 1932, scientists could not explain why atoms weigh more than their protons add up to. Which discovery fixed this?",
      "opts": [
        "Chadwick found neutral particles in the nucleus",
        "Thomson found negative particles in the atom",
        "Rutherford found that atoms are mostly empty space",
        "Rutherford found that the nucleus is positive"
      ],
      "why": "Neutrons have mass but no charge, so they add mass to the nucleus without changing its charge. Thomson's electrons are very light, so they could not account for the missing mass.",
      "clue": "Which particle adds mass but has no charge?"
    }
  },
  "sci-atomic-number-mass-number": {
    "title": "Atomic number, mass number and isotopes",
    "card": [
      ["Atomic number", "the number of protons in an atom. It decides which element the atom is."],
      ["Mass number", "the number of protons plus the number of neutrons in the nucleus."],
      [
        "Isotopes",
        "atoms of the same element with the same number of protons but different numbers of neutrons. They have different mass numbers."
      ],
      "To find the neutrons in an atom, subtract the atomic number from the mass number."
    ],
    "remember": "Protons name the element. Neutrons can vary, and that makes isotopes.",
    "a": {
      "q": "An atom has 6 protons and 8 neutrons. What is its mass number?",
      "opts": ["14", "6", "8", "2"],
      "why": "Mass number is protons plus neutrons, so 6 + 8 = 14. The number 6 is the atomic number, and 2 comes from wrongly subtracting.",
      "clue": "Add the particles in the nucleus."
    },
    "b": {
      "d": 3,
      "q": "A lab tests two samples of a gas. Atoms in sample P have 10 protons and 10 neutrons. Atoms in sample Q have 10 protons and 12 neutrons. What is true of the atoms in P and Q?",
      "opts": [
        "They are isotopes of one element",
        "They are two different elements",
        "They have different atomic numbers",
        "They have the same mass number"
      ],
      "why": "Both have 10 protons, so they have the same atomic number and are the same element. Their neutrons differ, so they are isotopes with mass numbers 20 and 22. A different number of neutrons does not make a different element.",
      "clue": "Compare the protons first, then the neutrons."
    }
  },
  "sci-alpha-beta-gamma-radiation": {
    "title": "Alpha, beta and gamma radiation",
    "card": [
      "Some nuclei are unstable. They decay by giving off radiation until they become stable.",
      [
        "Alpha",
        "a particle of two protons and two neutrons. It travels only a few centimetres in air and is stopped by paper."
      ],
      [
        "Beta",
        "a fast electron from the nucleus. It travels about a metre in air and is stopped by a thin sheet of aluminium."
      ],
      [
        "Gamma",
        "a ray of energy, not a particle. It travels a long way through air and most materials, and is greatly reduced by thick lead or concrete."
      ]
    ],
    "remember": "Alpha is stopped most easily, beta less so, and gamma goes the furthest.",
    "a": {
      "q": "Which type of radiation is stopped by a sheet of paper?",
      "opts": ["Alpha particles", "Beta particles", "Gamma rays", "Beta particles and gamma rays"],
      "why": "Alpha particles are large and are stopped by paper. Beta particles pass through paper and need aluminium to stop them, and gamma rays go through both.",
      "clue": "Which radiation travels the shortest distance?"
    },
    "b": {
      "d": 3,
      "q": "A detector is near a radioactive source. A sheet of paper between them does not change the reading, but a thin sheet of aluminium cuts it to almost zero. What is the source giving off?",
      "opts": ["Beta particles", "Alpha particles", "Gamma rays", "Alpha particles and gamma rays"],
      "why": "The radiation gets through paper, so it is not alpha. It is stopped by thin aluminium, so it is not gamma, which would pass through and keep the reading up. Only beta fits both results.",
      "clue": "Use each barrier to rule out one type."
    }
  },
  "sci-half-life-radiocarbon-dating": {
    "title": "Half-life and radiocarbon dating",
    "card": [
      "Half-life is the time it takes for half of the unstable atoms in a sample to decay. After one half-life, half are left. After two, a quarter are left.",
      "Living things take in carbon, including a tiny share of unstable carbon-14, while they are alive. When they die, they take in no more, and their carbon-14 slowly decays.",
      "Carbon-14 has a half-life of about 5,700 years. Comparing the carbon-14 left in charcoal, bone or shell with a living sample shows how long ago it died.",
      "Radiocarbon dating has dated many First Peoples' campsites and burials in Australia. It works up to about 50,000 years ago, so older sites need other dating methods."
    ],
    "cardFigs": {
      "3": {
        "kind": "graph",
        "alt": "The percentage of carbon-14 left in a sample against time since the living thing died. It starts at 100% and halves every half-life of about 5,700 years: the dashed lines show 50% left at 5,700 years. The curve keeps falling, more slowly, so less carbon-14 means an older sample.",
        "x": {"min": 0, "max": 30000, "label": "Time (years)", "step": 5000, "nums": false},
        "y": {"min": 0, "max": 110, "label": "Carbon-14 left (%)", "step": 25},
        "items": [
          {"type": "fn", "id": "c", "expr": "100\\cdot 2^{-\\frac{x}{5700}}", "domain": [0, 30000]},
          {"type": "guide", "at": [5700, 50], "xLabel": "5,700", "yLabel": ""},
          {"type": "point", "at": [5700, 50], "on": ["c"]}
        ]
      }
    },
    "remember": "Less carbon-14 left means more half-lives have passed, so the sample is older.",
    "a": {
      "q": "A sample has 1,200 unstable atoms, and its half-life is 3 days. How many unstable atoms are left after 9 days?",
      "opts": ["150 atoms", "300 atoms", "400 atoms", "600 atoms"],
      "why": "Nine days is three half-lives: 1,200 halves to 600, then 300, then 150. 400 comes from dividing by 3, but each half-life halves what is left.",
      "clue": "Halve it once for each half-life."
    },
    "b": {
      "d": 3,
      "q": "A shell from an old campsite has one eighth of the carbon-14 that a living shell has. About how long ago did it die?",
      "opts": ["About 17,100 years ago", "About 11,400 years ago", "About 45,600 years ago", "About 5,700 years ago"],
      "why": "One eighth left means three half-lives: a half, a quarter, then an eighth. 3 × 5,700 = 17,100 years. 45,600 comes from multiplying by 8, but each half-life halves what is left, so an eighth takes only three.",
      "clue": "How many halvings turn the whole into an eighth?"
    }
  },
  "sci-reactants-products": {
    "title": "Reactants and products",
    "card": [
      "In a chemical reaction, new substances form. The substances you start with are the reactants.",
      "The new substances that form are the products. They have different properties from the reactants.",
      "A word equation names them with an arrow between: reactants → products. The arrow means \"react to form\".",
      "Reactants are on the left of the arrow and products are on the right. If more than one substance is on a side, a plus sign joins them."
    ],
    "remember": "Reactants go in on the left of the arrow. Products come out on the right.",
    "a": {
      "q": "Which part of this word equation is a product? magnesium + oxygen → magnesium oxide",
      "opts": ["Magnesium oxide", "Magnesium", "Oxygen", "Magnesium and oxygen"],
      "why": "Magnesium oxide is on the right of the arrow, so it is the new substance that forms. Magnesium and oxygen are on the left, so they are the reactants that are used up.",
      "clue": "Look at which side of the arrow it is on."
    },
    "b": {
      "d": 2,
      "q": "Sam burns methane gas in a camp stove. The word equation is methane + oxygen → carbon dioxide + water. Which pair are both reactants?",
      "opts": ["Methane and oxygen", "Carbon dioxide and water", "Methane and water", "Oxygen and carbon dioxide"],
      "why": "Reactants are the substances on the left of the arrow, which are the ones that start the reaction. Carbon dioxide and water are on the right, so they are the products that form.",
      "clue": "Reactants are written before the arrow."
    }
  },
  "sci-conservation-mass": {
    "title": "Conservation of mass",
    "card": [
      "In a chemical reaction, atoms are rearranged into new substances. No atoms are made or lost.",
      "Because the atoms stay the same, the total mass of the reactants equals the total mass of the products.",
      "In an open container, a gas product can escape into the air. The mass left in the container then seems to drop.",
      "In a sealed container, no gas can escape. The total mass stays the same, which shows mass is conserved."
    ],
    "remember": "Mass is conserved because atoms are only rearranged, but an escaping gas can hide this.",
    "a": {
      "q": "Why is the total mass of the products equal to the total mass of the reactants?",
      "opts": [
        "Atoms are rearranged, and none are made or lost",
        "Atoms join up, so fewer atoms are left at the end",
        "Atoms change into other atoms with the same mass",
        "Atoms of the reactants are used up completely"
      ],
      "why": "A reaction only rearranges the atoms, so every atom that starts is still there at the end. The idea that atoms are used up is wrong, because they form new substances instead.",
      "clue": "Think about what happens to the atoms themselves."
    },
    "b": {
      "d": 3,
      "q": "Priya adds an antacid tablet to water in an open cup on a balance. Bubbles of gas form and the reading drops. What is the best explanation?",
      "opts": [
        "Gas escaped into the air, taking its mass with it",
        "Some atoms were destroyed when the tablet reacted",
        "The tablet turned into energy as it dissolved",
        "The water became lighter once the tablet reacted"
      ],
      "why": "The bubbles are a gas product that leaves the open cup, so its mass is no longer on the balance. The atoms were not destroyed. They are in the gas in the air.",
      "clue": "Where could the bubbles of gas have gone?"
    }
  },
  "sci-balancing-chemical-equation": {
    "title": "Balanced equations",
    "card": [
      "In a chemical reaction, atoms are rearranged. They are not made or lost, so each type of atom is still there after the reaction.",
      "A balanced equation shows this. It has the same number of each type of atom on both sides of the arrow.",
      "To balance an equation, change the coefficients, the big numbers in front of formulas. Never change the small subscripts inside a formula, because that would make a different substance.",
      "Example: 2H₂ + O₂ → 2H₂O has 4 H atoms and 2 O atoms on each side. H₂ + O₂ → H₂O is not balanced, because the left has 2 O atoms and the right has 1."
    ],
    "remember": "Atoms are not lost or gained, so balance by changing coefficients only.",
    "a": {
      "q": "Why must each type of atom appear in the same number on both sides of a balanced equation?",
      "opts": [
        "Atoms are only rearranged, never made or lost",
        "Each reactant must have the same mass as each product",
        "Molecules are never made or lost, so counts must match",
        "Subscripts in each formula must match on both sides"
      ],
      "why": "Atoms are only rearranged in a reaction, so each type of atom must appear in the same number on both sides. The number of molecules can change, as in 2H₂ + O₂ → 2H₂O, so equal molecule counts are not required.",
      "clue": "Think about what happens to atoms during a reaction."
    },
    "b": {
      "d": 3,
      "q": "Mia tries to balance H₂ + O₂ → H₂O by rewriting the product as H₂O₂. Why is this not a correct way to balance it?",
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
  "sci-peer-review-publication": {
    "title": "Peer review and publication",
    "card": [
      "Scientists publish their methods and results in journals. Other people can then see exactly what was done and how the conclusions were reached.",
      [
        "Peer review",
        "before a journal publishes a study, independent experts in the same field read it. They check whether the methods suit the question and whether the results support the conclusions."
      ],
      [
        "Replication",
        "after publication, other scientists repeat the investigation using the published methods. If they get similar results, confidence in the finding grows."
      ],
      "Checking before and after publication helps validate scientific knowledge. Even a well-checked finding can change if new evidence appears."
    ],
    "remember": "Checks by other experts, in review and by repeating the work, build confidence in a finding, but it can still change.",
    "a": {
      "q": "Why does a scientist include the methods in a published paper, and not just the results?",
      "opts": [
        "So other scientists can check and repeat the work",
        "So other scientists can claim the findings as theirs",
        "So the results can skip any further testing",
        "So the journal can decide which topics get studied"
      ],
      "why": "Published methods let other experts judge whether the work was sound and repeat it to see if they get similar results. Publishing does not end testing: even well-checked findings can change when new evidence appears.",
      "clue": "Think about what another scientist needs in order to repeat a study."
    },
    "b": {
      "d": 3,
      "q": "Dr Nguyen in Hobart publishes a study finding that a new feed helps hens lay more eggs. A team in Darwin follows her published methods and gets similar results. Which step is this, and what does it do?",
      "opts": [
        "Replication, which builds confidence in her finding",
        "Peer review, which builds confidence in her finding",
        "Replication, which means no more testing is needed",
        "Peer review, which means no more testing is needed"
      ],
      "why": "Repeating a published study with similar results is replication, and it builds confidence in the finding. Peer review is the check by experts before publication, so it is a different step. No check ends testing, because new evidence can still change a finding.",
      "clue": "Did the Darwin team check the work before or after it was published?"
    }
  },
  "sci-science-technology-engineering": {
    "title": "Science, technology and engineering",
    "card": [
      ["Science", "Science builds knowledge by investigating and explaining the natural world."],
      [
        "Technology and engineering",
        "Technology is the tools and products people make to solve problems. Engineers design and build them, often using scientific knowledge."
      ],
      "New technology can let science find out more. A better telescope can show galaxies that older telescopes could not detect.",
      "New science can lead to new technology. Scientific knowledge about X-rays and magnetism helped lead to medical imaging machines."
    ],
    "remember": "Science and technology can help each other: tools extend what science finds, and findings can lead to new tools.",
    "a": {
      "q": "Which example shows new technology letting science find out more?",
      "opts": [
        "A stronger microscope lets biologists see inside cells",
        "Scientists study how light bends and later design a lens",
        "Doctors use a scan to treat patients in a clinic",
        "Engineers build a bridge using a known design"
      ],
      "why": "A stronger microscope is a new tool, and it lets scientists observe things they could not see before. The lens example is the other way round: science came first and led to a new product.",
      "clue": "Look for a new tool that gives scientists new observations."
    },
    "b": {
      "d": 3,
      "q": "Researchers in Perth learn how certain materials react to magnetic fields. Engineers then use this knowledge to build a new scanner for hospitals. What does this show?",
      "opts": [
        "New science leading to new technology",
        "New technology leading to new science",
        "Technology working without any science",
        "Engineering replacing the need for science"
      ],
      "why": "The scientific knowledge came first, and engineers used it to build the scanner. That is new science leading to new technology. It is not the reverse, because the scanner did not exist before the research.",
      "clue": "Which came first: the knowledge or the machine?"
    }
  },
  "sci-society-takes-up-new": {
    "title": "Why society takes up new science",
    "card": [
      "Science can show that a practice works, but people do not always adopt it. Several factors affect whether a community takes it up.",
      "Cost and evidence matter. A practice is more likely to spread if it is affordable and if the evidence that it works is strong.",
      "Trust and culture matter. People may avoid a practice if they distrust the source of the information, or if it clashes with their beliefs or customs.",
      "Government support can make a practice easier to adopt. For example, a rebate can lower the price of solar panels, and council recycling bins make recycling simple."
    ],
    "remember": "People adopt new science for many reasons, not only because it works: cost, trust, culture and government support all play a part.",
    "a": {
      "q": "Tom's town has strong evidence that rainwater tanks save water. Few households buy one. Which reason fits best?",
      "opts": [
        "The tanks cost more than most households want to pay",
        "The evidence about tanks has been shown to be false",
        "The government has paid for a tank for every household",
        "Scientists have not tested whether tanks save water"
      ],
      "why": "Cost can stop people from adopting a practice even when the evidence is strong. The other options contradict the facts given: the evidence is strong, so it was not shown to be false or left untested, and few households buy, so it is not free.",
      "clue": "The evidence is already strong, so look at another factor."
    },
    "b": {
      "d": 3,
      "q": "A council offers free recycling bins and clear advice. Many residents still do not use them, saying they distrust the council's claims. Which factor explains this?",
      "opts": [
        "Low trust in the source of the information",
        "High cost of taking part in the program",
        "Weak evidence that recycling works",
        "Too little government support for recycling"
      ],
      "why": "The residents say they distrust the council, so trust is the factor at work. Government support is tempting, but the council has already provided bins and advice, so support is not what is missing.",
      "clue": "Read what the residents say about the council."
    }
  },
  "sci-gets-researched": {
    "title": "What gets researched",
    "card": [
      "Research costs money, so choices are made about which projects get funded. Funding comes from governments, businesses, universities and charities.",
      "Society's needs help steer those choices. A need might be cleaner energy or treatments for a common disease.",
      "Society's values also help steer them. Values are beliefs about what matters, such as protecting the environment or caring for the sick.",
      "So the topics that get funded can change over time. A problem that more people see as urgent is more likely to attract research money."
    ],
    "remember": "What society needs and values helps steer which research gets funded.",
    "a": {
      "q": "A lot of research money goes into ways of cutting greenhouse gas emissions. What best explains this?",
      "opts": [
        "Many people see climate change as a problem to solve",
        "Emissions are easier to measure than other topics",
        "Climate research costs less than most other research",
        "Funders pick topics at random to share out their money"
      ],
      "why": "Society's needs and values steer funding, and many people see climate change as an urgent problem that needs solving. The card does not link funding to how cheap or easy a topic is, and funding choices are made on purpose, not at random.",
      "clue": "Whose concerns does the funding respond to?"
    },
    "b": {
      "d": 2,
      "q": "Many people in a country town have a common lung disease. The state government then offers extra money for lung disease research. What best explains this choice?",
      "opts": [
        "Many people there are ill and want better treatments",
        "Lung disease is simpler to study than other diseases",
        "The disease is rare, so little is known about it yet",
        "Lung research costs less than other medical research"
      ],
      "why": "Many people in the town are ill, so better treatments are needed, and that need helped steer the funding. The disease is common there, not rare, and nothing in the case suggests lung research is simpler or cheaper.",
      "clue": "Who in the town would gain from the research?"
    }
  },
  "sci-validity": {
    "title": "Validity",
    "card": [
      "An investigation is valid when it tests what it set out to test. The method must measure the thing the question asks about.",
      "The independent variable is the one you change. The dependent variable is the one you measure.",
      "Controlled variables are all the other factors you keep the same. If one of them changes too, you cannot tell what caused the result.",
      "A fair method changes only the independent variable and measures its effect on the dependent variable. Scientists may also check controlled variables, such as temperature, to make sure they stay the same."
    ],
    "remember": "A valid test changes one thing, measures its effect and keeps everything else the same.",
    "a": {
      "q": "In an investigation, why are the controlled variables kept the same?",
      "opts": [
        "So only the independent variable can explain the result",
        "So the dependent variable stays the same in every trial",
        "So the independent variable changes by the same amount",
        "So the results come out as the student predicted"
      ],
      "why": "If the other factors stay the same, any change in the dependent variable can be linked to the independent variable. The dependent variable is meant to change, so keeping it constant would defeat the test.",
      "clue": "Think about what you could blame if two things changed."
    },
    "b": {
      "d": 3,
      "q": "Kai tests whether salt water affects how tall bean plants grow. Plant A gets salt water on a sunny windowsill, and Plant B gets tap water in a dark cupboard. Why is his test not valid?",
      "opts": [
        "Light also differs, so two things could explain the result",
        "Height does not show plant growth, so he measured wrongly",
        "Salt is a controlled variable, so it should stay the same",
        "A fair test uses one plant, so using two plants is wrong"
      ],
      "why": "Salt and light both differ between the plants, so either could explain a difference in height. His question is about height, so measuring height is the right dependent variable and is not the problem.",
      "clue": "Count how many things differ between the two plants."
    }
  },
  "sci-reproducibility-replicability": {
    "title": "Reproducibility and replicability",
    "card": [
      ["Replicable", "the same person repeats the investigation and gets similar results again."],
      ["Reproducible", "other people follow the same method and get similar results too."],
      "Results do not need to be identical. Small differences are normal, but the results should be close.",
      "Scientists share their methods in clear detail so others can reproduce the work. Results that others cannot get again are treated with caution."
    ],
    "remember": "Replicable: I get it again. Reproducible: others get it too.",
    "a": {
      "q": "Tom times a pendulum swing three times and gets similar times each run. What can be said about his results?",
      "opts": [
        "They are replicable, because he got similar results again",
        "They are reproducible, because he got similar results again",
        "They are replicable, because other people got them",
        "They are reproducible, because the times were identical"
      ],
      "why": "Tom is one person repeating his own test, so the results are replicable. Reproducible needs other people using the same method, and results do not need to be identical.",
      "clue": "How many people did the testing?"
    },
    "b": {
      "d": 3,
      "q": "A Hobart class follows Mei's published method for dissolving sugar in water. Most students get results close to Mei's. What does this show about Mei's results?",
      "opts": [
        "Reproducible, because other people got similar results",
        "Replicable, because other people got similar results",
        "Not reproducible, because some results were different",
        "Replicable, because Mei repeated the test herself"
      ],
      "why": "Other people used Mei's method and got close results, so her results are reproducible. Replicable describes the same person getting results again, which is not what happened here. Small differences between results are normal, so they do not stop the results being reproducible.",
      "clue": "Who got the matching results this time?"
    }
  },
  "sci-random-systematic-errors": {
    "title": "Random and systematic errors",
    "card": [
      "An error is the gap between a measured result and the true value. Errors come from the equipment, the method or the person measuring.",
      [
        "Random error",
        "it scatters results both above and below the true value, for example from reading a measuring cylinder at slightly different angles. Repeating the measurement and averaging reduces it."
      ],
      [
        "Systematic error",
        "it pushes every result the same way by about the same amount, for example a scale that reads 5 g when nothing is on it. Repeating does not remove it."
      ],
      "A systematic error is fixed by correcting its cause, such as setting the scale to zero before each measurement."
    ],
    "remember": "Random errors scatter results and repeats reduce them. Systematic errors shift all results one way and need their cause fixed.",
    "a": {
      "q": "Mia times a trolley rolling down a ramp five times. Her times are 2.1 s, 2.4 s, 1.9 s, 2.3 s and 2.0 s. Which type of error is most likely?",
      "opts": [
        "Random error, as the times scatter either side",
        "Systematic error, as the times are not the same",
        "Systematic error, as there are five different times",
        "Random error, as the stopwatch pushes times up"
      ],
      "why": "The times fall above and below one another with no steady direction, which is the pattern of random error, such as small differences in reaction time. Systematic error would shift every time the same way, so having different times does not point to it.",
      "clue": "Do the results all lean the same way, or spread out?"
    },
    "b": {
      "d": 3,
      "q": "Liam weighs the same rock four times on a kitchen scale and gets 152 g, 152 g, 153 g and 152 g. A lab balance, correctly set to zero, gives 143 g. What best explains the difference?",
      "opts": [
        "A systematic error in the kitchen scale",
        "A random error in the kitchen scale",
        "Random error, which Liam can fix by repeating more",
        "A systematic error, which Liam can fix by repeating more"
      ],
      "why": "Liam's results agree closely but all sit about 9 g above the true value, so every result is pushed the same way. That is a systematic error, perhaps from a scale not set to zero. Repeating would not fix it, so the tempting idea that more repeats help is wrong here.",
      "clue": "Close agreement between repeats does not mean the results are correct."
    }
  },
  "sci-mean-median-range": {
    "title": "Mean, median and range",
    "card": [
      ["Mean", "Add up all the results, then divide by the number of results. It is the usual 'average'."],
      [
        "Median",
        "Put the results in order from smallest to largest. The median is the middle one. With an even number of results, it is halfway between the two middle ones."
      ],
      ["Range", "Subtract the smallest result from the largest. It shows how spread out the results are."],
      "One very high or very low result can pull the mean towards it. The median is affected much less."
    ],
    "remember": "Mean is total divided by count, median is the middle, range is largest minus smallest.",
    "a": {
      "q": "A student times a toy car over five runs: 4, 6, 5, 9 and 6 seconds. What is the range?",
      "opts": ["5 seconds", "6 seconds", "9 seconds", "30 seconds"],
      "why": "The range is the largest minus the smallest: 9 - 4 = 5 seconds. The 6 seconds option is tempting because it is the mean and also the median, but the range measures spread, not the centre.",
      "clue": "Subtract the smallest from the largest."
    },
    "b": {
      "d": 3,
      "q": "Priya measures the height of a bean plant in cm on five days: 2, 3, 3, 4 and 18. The 18 was a typing mistake for 8. How does this mistake affect the mean and the median?",
      "opts": [
        "The mean rises, but the median stays the same",
        "The median rises, but the mean stays the same",
        "Both the mean and the median rise",
        "Neither the mean nor the median changes"
      ],
      "why": "The mean uses every result in its total, so it is 30 ÷ 5 = 6 with the mistake instead of 20 ÷ 5 = 4. The median is the middle result after ordering, which is 3 either way, so it does not change. Thinking both rise is tempting, but the high result only moves the end of the ordered list, not the middle.",
      "clue": "Find the middle result with 18 and then with 8."
    }
  }
};
