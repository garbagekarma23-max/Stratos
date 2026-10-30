/* The leg bank: points made by the content pipeline. Written by python3 content/pipeline.py publish.
   Do not edit it by hand: change a point through the review page and publish again (content/README.md).
   Each point has the same parts as in econ-points.js. In every question the correct answer is opts[0]. */
MADE_BANKS.leg = {
  "leg-crime": {
    "title": "What a crime is",
    "card": [
      "A crime is an act or omission that is forbidden by law and punished by the state. An omission is a failure to do something the law requires.",
      "A crime is treated as a wrong against society as a whole, not only against the victim. This is why the state, not the victim, brings the case.",
      "Conduct that is only immoral or rude is not a crime unless a law forbids it. Breaking a promise to a friend is an example.",
      "A dispute between two people, such as a broken contract, is usually a civil matter. The aim there is to settle the dispute, not to punish."
    ],
    "remember": "A crime is conduct the law forbids and the state punishes as a wrong against society.",
    "a": {
      "q": "Which of these is a crime?",
      "opts": [
        "Taking someone's car without consent and driving it off",
        "Telling a friend a lie that hurts their feelings",
        "Failing to repay a loan to a neighbour as agreed",
        "Refusing to speak to a family member for a year"
      ],
      "why": "Taking the car is forbidden by law and punished by the state. The lie is wrong in a moral sense, but no law forbids it. An unpaid loan is a civil dispute between two people, so it is not a crime.",
      "clue": "Look for conduct that a law forbids and the state punishes."
    },
    "b": {
      "d": 3,
      "q": "Sam signs a contract with a painter in Wagga Wagga to paint his house. The painter stops halfway and does not finish. Why is this usually not treated as a crime?",
      "opts": [
        "It is a dispute between two people, settled by civil means",
        "It is an omission, and omissions cannot be crimes",
        "It is only rude, so no law could ever forbid it",
        "Only acts of violence are treated as crimes"
      ],
      "why": "A broken contract is usually a dispute between two people, and the aim is to settle it rather than punish. The idea that omissions cannot be crimes is wrong, because a crime can be an act or an omission.",
      "clue": "Think about who brings the case and what the aim is."
    }
  },
  "leg-actus-reus-mens-rea": {
    "title": "Actus reus and mens rea",
    "card": [
      [
        "Actus reus",
        "the guilty act. It is the physical element of a crime, such as hitting someone or taking an item. It can also be an omission, a failure to act when the law requires it."
      ],
      [
        "Mens rea",
        "the guilty mind. It is the mental element, such as intending to cause harm or being reckless, which means knowing there is a risk and going ahead anyway."
      ],
      "For most crimes, the prosecution must prove both elements beyond reasonable doubt. The accused does not have to prove their innocence.",
      "If either element is not proved, the accused should not be found guilty of that crime. A few offences do not need a guilty mind to be proved."
    ],
    "remember": "Most crimes need a guilty act and a guilty mind, and the prosecution proves both.",
    "a": {
      "q": "Which situation shows mens rea?",
      "opts": [
        "Ravi swings a bat at a car, wanting to smash its window",
        "Ravi's bat slips from his bag and smashes a car window",
        "Ravi keeps a cricket bat in his garage next to the car",
        "Ravi walks past a parked car carrying a bat after training"
      ],
      "why": "Mens rea is the mental element, and here Ravi wants to cause damage, which is intent. The slipping bat is a physical event with no intent or recklessness, so no guilty mind is shown.",
      "clue": "Which one tells you about Ravi's state of mind?"
    },
    "b": {
      "d": 3,
      "q": "Dana is charged with a crime. The prosecution proves she did the act, but the court finds she had no intent and was not reckless. What is the likely result for most crimes?",
      "opts": [
        "Not guilty, as the guilty mind has not been proved",
        "Not guilty, as the guilty act has not been proved",
        "Guilty, as Dana failed to prove she had no intent",
        "Guilty, but with a lighter penalty for having no intent"
      ],
      "why": "For most crimes the prosecution must prove both the guilty act and the guilty mind. The act was proved here, but the guilty mind was not, so the charge fails. It is not up to Dana to prove she had no intent.",
      "clue": "Which element did the prosecution fail to prove?"
    }
  },
  "leg-strict-absolute-liability": {
    "title": "Strict and absolute liability",
    "card": [
      "For most crimes the prosecution must prove a guilty mind. For some offences, such as many traffic offences, it does not need to prove one. It only has to prove that the person did the act.",
      [
        "Strict liability",
        "no guilty mind needs to be proved, but the defendant can raise the defence of honest and reasonable mistake of fact. If the court accepts it, the defendant is not guilty."
      ],
      [
        "Absolute liability",
        "no guilty mind needs to be proved, and even an honest and reasonable mistake of fact is not a defence. Proof of the act is enough for a guilty finding."
      ],
      "Both are often used for offences where the law puts public safety or protection first, so the focus is on what was done, not on what the person meant."
    ],
    "remember": "Both skip the guilty mind. Only strict liability allows honest and reasonable mistake of fact.",
    "a": {
      "q": "What is the difference between strict and absolute liability?",
      "opts": [
        "Mistake of fact is a defence to strict but not absolute",
        "Mistake of fact is a defence to absolute but not strict",
        "Strict needs a guilty mind but absolute does not",
        "Absolute needs the act to be proved but strict does not"
      ],
      "why": "Neither needs a guilty mind to be proved. The difference is the defence: strict liability allows an honest and reasonable mistake of fact, and absolute liability does not. Saying strict liability needs a guilty mind is wrong, because both skip it.",
      "clue": "Both skip the guilty mind. Look at what defence is left."
    },
    "b": {
      "d": 3,
      "q": "Suppose driving an overloaded truck is an absolute liability offence. Liam's truck is over the limit, but a faulty weighbridge showed it was under. He honestly and reasonably believed the reading. The prosecution proves the act. What is the likely result?",
      "opts": [
        "Guilty, as a mistake of fact is no defence here",
        "Not guilty, as his mistake was honest and reasonable",
        "Guilty only if the court finds he meant to overload it",
        "Not guilty unless the prosecution proves recklessness"
      ],
      "why": "Under absolute liability, proof of the act is enough, and even an honest and reasonable mistake of fact is not a defence. So Liam is likely guilty. If the offence were strict liability instead, he could raise his mistake about the truck's weight as a defence.",
      "clue": "Check which type of liability this offence carries."
    }
  },
  "leg-categories-crime": {
    "title": "Categories of crime",
    "card": [
      "Crimes are grouped by what they harm or involve. Offences against the person harm or threaten people, such as assault and murder.",
      "Offences against property involve another person's goods, such as theft and break and enter. Drug offences involve illegal drugs, such as supplying a prohibited drug.",
      "Public order offences disturb public peace or safety, such as offensive behaviour or affray. Driving offences involve vehicles, such as drink driving.",
      "White collar crime is non-violent crime, often by people in business or office roles, such as fraud. Offences against the state threaten the government or the nation, such as treason."
    ],
    "remember": "A crime's category depends on what it harms or involves: people, property, drugs, public peace, business roles, vehicles or the state.",
    "a": {
      "q": "Which offence is an offence against the person?",
      "opts": ["Assault", "Fraud", "Treason", "Affray"],
      "why": "Assault harms or threatens another person, so it is an offence against the person. Affray is tempting because it involves violence, but it is a public order offence because it disturbs public peace or safety.",
      "clue": "Which offence directly harms or threatens an individual?"
    },
    "b": {
      "d": 3,
      "q": "Dev is an accountant in Newcastle. He secretly moves client money into his own account and hides it in the records. Which category best fits his offence?",
      "opts": ["White collar crime", "Offence against the person", "Public order offence", "Offence against the state"],
      "why": "Dev committed a non-violent fraud through his office role, which is white collar crime. Offence against the person is tempting because his clients lose out, but nobody was harmed or threatened.",
      "clue": "No one was hurt, and his job gave him the chance."
    }
  },
  "leg-summary-indictable-offences": {
    "title": "Summary and indictable offences",
    "card": [
      [
        "Summary offence",
        "a minor offence, such as offensive language or a minor traffic offence. It is heard by a magistrate in the Local Court, with no jury."
      ],
      [
        "Indictable offence",
        "a serious offence, such as murder, armed robbery or large-scale drug supply. It can be tried by a judge and jury in a higher court."
      ],
      "Many indictable offences start in the Local Court, where a magistrate handles early steps. The most serious ones then go to a higher court for trial.",
      "The type of offence depends on how serious the law treats it. It does not depend on how the accused pleads or how long the case takes."
    ],
    "remember": "Minor offences go to a magistrate. Serious offences can go to a judge and jury.",
    "a": {
      "q": "Which feature is usually true of a summary offence?",
      "opts": [
        "It is heard by a magistrate without a jury",
        "It is tried by a judge and jury",
        "It is heard in the Supreme Court",
        "It is decided by the police, not a court"
      ],
      "why": "Summary offences are minor and are heard by a magistrate alone. A jury is linked to indictable offences, so the second option is the tempting mistake.",
      "clue": "Think about who hears minor matters and whether a jury is used."
    },
    "b": {
      "d": 3,
      "q": "Dev is charged with armed robbery. His first court appearance is in the Local Court. How is his offence best classed, and why?",
      "opts": [
        "Indictable, because it is serious and can go before a jury",
        "Summary, because it is first mentioned in the Local Court",
        "Summary, because Dev may plead guilty to the charge",
        "Indictable, because a magistrate hears it without a jury"
      ],
      "why": "The law treats armed robbery as serious, so it is indictable and can be tried by a judge and jury. Appearing first in the Local Court does not make an offence summary, because many indictable offences begin there.",
      "clue": "Where a case first appears may not tell you its type."
    }
  },
  "leg-causes-crime": {
    "title": "Causes of crime",
    "card": [
      "No single cause explains crime. Several factors can combine, and each one can contribute to a person offending without forcing them to.",
      [
        "Social and economic",
        "factors such as poverty, unemployment and disadvantage. They can limit a person's access to money, education or support, which can make offending more likely."
      ],
      [
        "Psychological",
        "factors that affect how a person thinks or behaves, such as poor impulse control or a mental illness. They can contribute to some offences."
      ],
      [
        "Opportunity and peers",
        "a chance to offend, such as an unlocked car, can contribute to crime. So can pressure from friends or a group to join in."
      ]
    ],
    "remember": "Crime can have many causes, and they often work together.",
    "a": {
      "q": "Lena grew up in poverty and left school early with few chances of work. What type of factor do these details show?",
      "opts": ["Social and economic factors", "Psychological factors", "An opportunity to offend", "Pressure from her peers"],
      "why": "Poverty and leaving school early limit Lena's access to money and education, so they are social and economic factors. Psychological factors are about how a person thinks or behaves, such as impulse control, and nothing in the details describes that.",
      "clue": "Are these details about Lena's mind or her circumstances?"
    },
    "b": {
      "d": 3,
      "q": "Jaden, 16, is walking home with friends. They dare him to take a bike left unlocked outside a shop, and he does. Which two factors does the story show?",
      "opts": [
        "Peer pressure and opportunity",
        "Poverty and opportunity",
        "Peer pressure and mental illness",
        "Unemployment and peer pressure"
      ],
      "why": "His friends dared him, which is peer pressure, and the unlocked bike gave him the chance to offend, which is opportunity. Each other option pairs one of these with a factor the story never mentions, such as poverty, unemployment or a mental illness.",
      "clue": "Count only the factors the story actually describes."
    }
  },
  "leg-police-powers": {
    "title": "Police powers",
    "card": [
      "Police have powers to stop, search, question and arrest people. These powers exist to help them prevent and investigate crime.",
      "Police powers are set by law. In NSW they are mainly found in an Act passed by the NSW Parliament: the Law Enforcement (Powers and Responsibilities) Act 2002, often called LEPRA.",
      "Police can use a power only in the situations the law allows. For example, they usually need a reasonable suspicion or belief about a person before they search that person without a warrant.",
      "Police who go beyond their powers act unlawfully. Evidence they gain that way may be challenged in court, and the officers may face consequences."
    ],
    "remember": "Police powers are real, but they come from law and have limits.",
    "a": {
      "q": "Where do NSW police mainly get their powers to stop, search and arrest?",
      "opts": [
        "An Act of Parliament that sets limits on when they apply",
        "Police policy that senior officers can change when needed",
        "Court rulings made case by case, with no Act involved",
        "An officer's own judgement about what each case needs"
      ],
      "why": "NSW police powers come mainly from LEPRA, an Act of the NSW Parliament, which limits when each power can be used. Police policy is tempting, but police cannot widen their own powers beyond what Parliament's law allows.",
      "clue": "Think about who makes the rules that police must follow."
    },
    "b": {
      "d": 3,
      "q": "Officer Ruiz in Newcastle searches a man's bag without a warrant. She had no reasonable suspicion and no other lawful ground. What is the best description of her action?",
      "opts": [
        "It went beyond her powers, so it may be challenged",
        "It was lawful, because she did not arrest the man",
        "It was lawful, because police do not need grounds to search",
        "It was unlawful only if she found nothing in the bag"
      ],
      "why": "Police can search without a warrant only where the law allows, and usually need reasonable suspicion or another lawful ground. Without one, the search goes beyond her powers. Finding something does not make an unlawful search lawful, and the evidence may still be challenged.",
      "clue": "Does the card say police can use powers without grounds?"
    }
  },
  "leg-gathering-evidence-warrants": {
    "title": "Gathering evidence and warrants",
    "card": [
      "Police gather evidence in several ways: searching people, vehicles and places, interviewing suspects and witnesses, and running forensic tests such as DNA or fingerprint analysis.",
      [
        "Warrant",
        "a written authority from an authorised officer, such as a magistrate or judge, that lets police do something they could not otherwise do, such as search a home."
      ],
      "Many searches and the use of surveillance, such as listening devices, need a warrant. The warrant is issued only if there are reasonable grounds to support it.",
      "Police can sometimes act without a warrant, for example in an emergency where evidence could be destroyed. Evidence gathered unlawfully may be excluded from a trial."
    ],
    "remember": "A warrant is independent approval for police to search or use surveillance, so that evidence is gathered lawfully.",
    "a": {
      "q": "What is the main purpose of requiring police to get a warrant before searching a home?",
      "opts": [
        "An independent officer checks that there are grounds",
        "It lets police keep the search secret from the court",
        "It guarantees the evidence found will be accepted at trial",
        "It allows police to search any property they choose"
      ],
      "why": "A warrant means someone independent of the police checks that reasonable grounds exist before a person's privacy is invaded. It does not guarantee the evidence will be admitted, because a court can still exclude it, for example if other rules were broken.",
      "clue": "Think about who decides, and what they must see first."
    },
    "b": {
      "d": 3,
      "q": "Police in Newcastle want to install a listening device in a suspect's flat to record talk about drug supply. They have reasonable grounds, but no warrant, and there is no emergency. What should they do?",
      "opts": [
        "Apply to an authorised officer for a surveillance warrant",
        "Install it, then ask a court to approve it afterwards",
        "Install it, because suspects have no right to privacy",
        "Interview the suspect instead, as that needs no warrant"
      ],
      "why": "Surveillance such as a listening device needs a warrant, and with no emergency there is no reason to act without one, so police should apply to an authorised officer first. Installing it and seeking approval later risks the evidence being excluded as unlawfully gathered. Interviewing the suspect is a different way of gathering evidence and would not replace the recordings.",
      "clue": "In a non-emergency, surveillance needs approval before it starts."
    }
  },
  "leg-rights-suspects": {
    "title": "Rights of suspects",
    "card": [
      "A suspect is a person police believe may have committed an offence. The law gives suspects rights so police cannot treat them unfairly.",
      "On arrest, a person must be told that they are under arrest and why. Before questioning, police must caution them: warn them that they do not have to say anything, and that what they say may be used as evidence.",
      "A detained suspect can contact a lawyer. Police must give them a reasonable chance to do so, and to get advice, before questioning starts.",
      "The right to silence means a suspect does not have to answer police questions. It has limits in NSW: in some cases a court may allow an unfavourable inference from silence, and a person must still give their name and address in certain situations."
    ],
    "remember": "Suspects have rights that protect them from unfair treatment, but the right to silence is not absolute.",
    "a": {
      "q": "Which right is a suspect given when arrested?",
      "opts": [
        "To be told that they are arrested and why",
        "To choose which police officer questions them",
        "To leave once they have been charged",
        "To see all the evidence police hold against them"
      ],
      "why": "A person who is arrested must be told that they are under arrest and the reason. Suspects have no right to pick the officer or to see all the evidence at this stage. Being charged does not mean they are free to leave.",
      "clue": "Think about what police must tell a person when they arrest them."
    },
    "b": {
      "d": 3,
      "q": "Dev is questioned by police about a break-in and stays silent. At his trial, the court allows an unfavourable inference from this. What does this show about the right to silence?",
      "opts": [
        "It has limits in NSW, so silence can count against a suspect",
        "It does not exist in NSW, so suspects must answer questions",
        "It applies only in court, so police can demand answers",
        "It is absolute, so silence can never be mentioned in court"
      ],
      "why": "The right to silence means a suspect does not have to answer, but in NSW it has limits. In some cases a court may allow an unfavourable inference from silence. It is wrong to say the right is absolute or does not exist, because Dev was still not forced to answer.",
      "clue": "The right exists, but the card says it has limits."
    }
  },
  "leg-bail-remand": {
    "title": "Bail and remand",
    "card": [
      [
        "Bail",
        "Bail is the release of an accused person before their trial. It can come with conditions, such as reporting to police or living at a set address."
      ],
      [
        "Remand",
        "Remand is when a person is refused bail and is held in custody until their trial or sentencing hearing."
      ],
      "An accused person is presumed innocent until proven guilty. This is why release before trial is often the starting point.",
      "Bail laws also protect the community. A court looks at risks, such as the accused not turning up to court or committing another offence, and weighs them against the presumption of innocence."
    ],
    "remember": "Bail laws balance the presumption of innocence against community safety.",
    "a": {
      "q": "Which of these best describes a person on remand?",
      "opts": [
        "An accused person refused bail and held in custody",
        "An accused person released before trial with conditions",
        "A convicted person serving a prison sentence",
        "An accused person found not guilty at trial"
      ],
      "why": "Remand means the court refused bail, so the accused stays in custody until the trial or sentencing hearing. Release with conditions is bail, which is the opposite of remand, and a person serving a sentence has already been convicted.",
      "clue": "Remand happens before the case is decided."
    },
    "b": {
      "d": 3,
      "q": "A court in NSW refuses bail to Dan, who is charged with a serious offence and has failed to attend court before. Which reason best explains why bail laws allow this?",
      "opts": [
        "They weigh the chance he misses court against his freedom",
        "They treat Dan as guilty because he has been charged",
        "They punish Dan for the offence before his trial begins",
        "They end the presumption of innocence for serious charges"
      ],
      "why": "Bail laws weigh the presumption of innocence against risks such as not appearing in court or reoffending. Refusing bail does not mean Dan is treated as guilty or punished, as he is still presumed innocent until proven guilty.",
      "clue": "Think about what the court wants to prevent, not what Dan did."
    }
  },
  "leg-prosecution-defence": {
    "title": "The prosecution and defence",
    "card": [
      [
        "Prosecution",
        "The prosecution acts for the state in a criminal trial. It presents evidence to try to prove that the accused committed the offence charged."
      ],
      [
        "Defence",
        "The defence acts for the accused. It tests the prosecution's evidence, for example by cross-examining witnesses, and may present its own case."
      ],
      "Both sides have duties to the court. Each must act honestly and fairly and must not mislead the court.",
      "The prosecution seeks a decision on the evidence, not a win at any cost. It must not hide evidence that could help the accused."
    ],
    "remember": "The prosecution presents the state's case, the defence tests it, and both owe duties to the court.",
    "a": {
      "q": "In a criminal trial, what is the main role of the defence?",
      "opts": [
        "To test the prosecution's evidence for the accused",
        "To act for the state and present the charge",
        "To decide whether the accused is guilty",
        "To represent the victim of the alleged crime"
      ],
      "why": "The defence acts for the accused and tests the prosecution's evidence, for example through cross-examination. Acting for the state and presenting the charge is the prosecution's role, not the defence's.",
      "clue": "Think about who the defence acts for and what it does to the other side's evidence."
    },
    "b": {
      "d": 3,
      "q": "In a NSW trial, a prosecutor knows of a witness statement that helps the accused. She wants a conviction. What do her duties to the court require?",
      "opts": [
        "Act fairly and not hide the statement from the court",
        "Keep the statement back, as the state must win",
        "Leave it to the defence to find the statement",
        "Disclose it only if the defence asks for it"
      ],
      "why": "Both sides owe duties to the court, including acting honestly and fairly. The prosecutor seeks a decision on the evidence, not a win at any cost, so she must not hide evidence that could help the accused. Waiting for the defence to ask is tempting, but it still keeps the statement hidden.",
      "clue": "The prosecution acts for the state, but its aim is not to win at any cost."
    }
  },
  "leg-burden-standard-proof": {
    "title": "The burden and standard of proof",
    "card": [
      [
        "Burden of proof",
        "the duty to prove the case. In a criminal trial it rests on the prosecution, not the accused."
      ],
      [
        "Presumption of innocence",
        "the accused is treated as innocent until the prosecution proves guilt. The accused does not have to prove innocence."
      ],
      [
        "Standard of proof",
        "how strongly the case must be proved. The prosecution must prove guilt beyond reasonable doubt."
      ],
      "If the court has a reasonable doubt about guilt, the accused must be found not guilty. Proof beyond reasonable doubt is a higher standard than the one used in civil cases."
    ],
    "remember": "The prosecution must prove guilt beyond reasonable doubt, so the accused need not prove innocence.",
    "a": {
      "q": "Who carries the burden of proof in a criminal trial, and what must that side show?",
      "opts": [
        "The prosecution, to prove guilt beyond reasonable doubt",
        "The defence, to prove innocence beyond reasonable doubt",
        "The prosecution, to show guilt is more likely than not",
        "The defence, to raise some doubt about the evidence"
      ],
      "why": "The burden sits with the prosecution because the accused is presumed innocent. The standard is beyond reasonable doubt. Showing guilt is only more likely than not is too low a standard for a criminal trial.",
      "clue": "The accused is presumed innocent, so who must do the proving?"
    },
    "b": {
      "d": 3,
      "q": "Jaya is on trial in the District Court for armed robbery of a service station in Parramatta. The jury thinks she probably did it but still has a reasonable doubt. What should the verdict be?",
      "opts": [
        "Not guilty, because the standard of proof was not met",
        "Guilty, because the jury thinks she probably did it",
        "Not guilty, because Jaya proved she was innocent",
        "Guilty, because Jaya chose not to give evidence at trial"
      ],
      "why": "Probably guilty is not enough. The prosecution must remove reasonable doubt, so a jury with such doubt must find her not guilty. Jaya did not have to prove anything, so the options 'Jaya proved she was innocent' and 'Jaya chose not to give evidence' both wrongly put the burden on her.",
      "clue": "Does the jury's doubt mean the standard has been met?"
    }
  },
  "leg-pleas-charge-negotiation": {
    "title": "Pleas and charge negotiation",
    "card": [
      "A plea is the accused's answer to a charge. A guilty plea admits the offence, so there is no trial on guilt and the court moves to sentencing. A not guilty plea sends the case to trial, where the prosecution must prove it.",
      "In charge negotiation, the prosecution and defence talk before the trial. The accused agrees to plead guilty to a lesser charge or to fewer charges. In return, the prosecution drops the other charges.",
      "It saves time and cost, and the court does not need a full trial. Witnesses, including victims, may not have to give evidence.",
      "It can seem unfair to victims. The accused may be convicted of a lesser offence than the crime the victim believes was committed, and the sentence may be lighter."
    ],
    "remember": "Charge negotiation trades a guilty plea for a lesser or fewer charges, which saves time but can feel unfair to victims.",
    "a": {
      "q": "What does an accused person agree to do in charge negotiation?",
      "opts": [
        "Plead guilty to a lesser charge or fewer charges",
        "Plead not guilty to every charge laid against them",
        "Skip the plea and ask the judge to dismiss the case",
        "Plead guilty to all charges in return for a jury trial"
      ],
      "why": "In charge negotiation the accused gives a guilty plea, and in return the prosecution drops some charges or accepts a lesser one. Pleading not guilty to every charge is wrong because that sends the case to trial, so nothing is negotiated.",
      "clue": "The accused gives something up and gets something back."
    },
    "b": {
      "d": 3,
      "q": "Dev is charged with two offences. He agrees to plead guilty to one, and the prosecution drops the other. The victim, Sam, says this is unfair. What is the most likely reason for Sam's view?",
      "opts": [
        "Dev is convicted of less than Sam thinks he did",
        "Dev faces a full jury trial on both of the charges",
        "Sam must give evidence for several days at a trial",
        "Dev's guilty plea means the court cannot sentence him"
      ],
      "why": "Dev is convicted of only one offence, though Sam believes he committed both, so the outcome does not match what Sam thinks happened. The option about a full trial is wrong because a guilty plea avoids a trial on guilt, and the other charge was dropped.",
      "clue": "Think about what the dropped charge means for the outcome."
    }
  },
  "leg-juries": {
    "title": "Juries",
    "card": [
      "A jury is a group of ordinary citizens who decide the facts in a criminal trial. In NSW, a jury of 12 is used in serious (indictable) trials in the higher courts.",
      "The jury decides whether the accused is guilty or not guilty. The judge directs the jury on the law and runs the trial, but the jury decides guilt.",
      "A jury is first asked to reach a unanimous verdict, where all 12 agree. If it cannot after long and genuine deliberation, the judge may accept a majority verdict in some cases.",
      "In NSW, a majority verdict can be 11 to 1. The judge must be satisfied that the jury has deliberated for long enough and is unlikely to reach a unanimous verdict."
    ],
    "remember": "The jury of 12 decides guilt, and a judge may accept 11 to 1 in some cases.",
    "a": {
      "q": "In a serious NSW trial before a jury, who decides whether the accused is guilty?",
      "opts": [
        "The jury of 12 citizens",
        "The judge who runs the trial",
        "The prosecutor for the state",
        "The defence lawyer for the accused"
      ],
      "why": "The jury decides the facts and reaches the verdict. The judge runs the trial and directs the jury on the law, which is why the judge is the most tempting wrong answer, but the judge does not decide guilt.",
      "clue": "Think about who weighs the evidence, not who runs the court."
    },
    "b": {
      "d": 3,
      "q": "After many hours, a NSW jury in a murder trial is split 11 to 1 for guilty. The judge is satisfied it has deliberated long enough and will not reach a unanimous verdict. What can the judge do?",
      "opts": [
        "Accept the 11 to 1 majority verdict",
        "Order a retrial before a new jury",
        "Enter a verdict of guilty without the jury",
        "Direct the jury to stay until all 12 agree"
      ],
      "why": "NSW allows a majority verdict of 11 to 1 in some cases, once the judge is satisfied the jury is unlikely to reach a unanimous verdict. A retrial is not needed here, because the law allows the majority verdict to stand.",
      "clue": "The judge is satisfied that more time will not produce agreement."
    }
  },
  "leg-defences-criminal-charges": {
    "title": "Defences to criminal charges",
    "card": [
      "A defence is an argument that an accused person should not be convicted of the crime charged, even if they did the act. Defences differ in how far they clear the accused.",
      [
        "Complete defence",
        "if it succeeds, the accused is acquitted, which means found not guilty. Self-defence and duress are examples."
      ],
      [
        "Partial defence",
        "if it succeeds, it does not lead to acquittal. It reduces a charge of murder to manslaughter. Substantial impairment because of a mental health or cognitive impairment is an example."
      ],
      "Self-defence is using reasonable force to protect yourself or another person. Duress is committing an offence because of a threat of serious harm."
    ],
    "remember": "A complete defence ends in acquittal. A partial defence still leaves a conviction for manslaughter.",
    "a": {
      "q": "A jury accepts a partial defence on a murder charge. What is the result?",
      "opts": [
        "The accused is convicted of manslaughter instead",
        "The accused is acquitted of all charges",
        "The accused is convicted of murder with a lighter penalty",
        "The trial is stopped and the charge is dropped"
      ],
      "why": "A partial defence reduces murder to manslaughter, so the accused is still convicted of a crime. It does not lead to acquittal, which is the result of a complete defence.",
      "clue": "Partial means the accused is not fully cleared."
    },
    "b": {
      "d": 3,
      "q": "Sam is charged with assault. He says a gang threatened to seriously harm his family unless he hit a shop worker. If the jury accepts this defence, what is the outcome?",
      "opts": [
        "Acquittal, because duress is a complete defence",
        "Conviction for manslaughter, as duress is a partial defence",
        "Conviction for a lesser offence, as duress is partial",
        "Acquittal, because the prosecution dropped the case"
      ],
      "why": "Sam says he acted because of a threat of serious harm, which is duress. Duress is a complete defence, so if it succeeds he is acquitted. It is not a partial defence, and reducing murder to manslaughter does not apply to an assault charge.",
      "clue": "Name the defence from the threat, then decide if it is complete."
    }
  },
  "leg-purposes-punishment": {
    "title": "Purposes of punishment",
    "card": [
      "Deterrence discourages crime through fear of punishment. Specific deterrence aims at the offender, and general deterrence aims at others who might offend.",
      "Retribution makes the offender pay for the wrong, in proportion to how serious the crime was. Denunciation is the court publicly stating that the conduct is wrong.",
      "Rehabilitation helps the offender change, for example through treatment or training, so they do not reoffend. Incapacitation removes their ability to offend, for example by keeping them in prison.",
      "A sentence can serve several of these purposes at once, and they can pull against each other. The judge weighs them to reach a fitting sentence."
    ],
    "remember": "Judges balance five aims: deter, punish, denounce, reform and incapacitate.",
    "a": {
      "q": "A judge gives an offender a sentence mainly to help them change through a drug treatment program. Which purpose is this?",
      "opts": ["Rehabilitation", "Retribution", "General deterrence", "Incapacitation"],
      "why": "Treatment aims to change the offender so they do not reoffend, which is rehabilitation. Incapacitation is the tempting wrong answer, but it prevents offending by removing the ability to offend, not by changing the person.",
      "clue": "Which purpose is about changing the offender?"
    },
    "b": {
      "d": 3,
      "q": "A judge says a long prison term for a fraudster will warn other people tempted to commit similar frauds. Which purpose is the judge relying on?",
      "opts": ["General deterrence", "Specific deterrence", "Retribution", "Denunciation"],
      "why": "The warning is aimed at other people who might offend, which is general deterrence. Specific deterrence is the tempting wrong answer, but it aims to discourage this offender, not the wider public.",
      "clue": "Who is the warning meant for: the offender or others?"
    }
  },
  "leg-aggravating-mitigating-factors": {
    "title": "Aggravating and mitigating factors",
    "card": [
      "When sentencing, a judge looks at the offence and the offender. The judge weighs facts that push the sentence up against facts that pull it down, within the maximum penalty the law sets.",
      [
        "Aggravating factor",
        "a fact that can lead to a harsher sentence. Using violence or targeting a vulnerable victim are examples, as they make the offence more serious."
      ],
      [
        "Mitigating factor",
        "a fact that can lead to a lighter sentence. Examples are genuine remorse, good character, having no prior record, and a guilty plea."
      ],
      "A prior record is aggravating because the court can show less leniency, not because this offence is worse. A guilty plea earns a discount mainly because it saves a trial and spares witnesses from giving evidence."
    ],
    "remember": "Aggravating factors can raise a sentence. Mitigating factors, including a guilty plea, can lower it.",
    "a": {
      "q": "Why does a guilty plea usually lead to a lighter sentence?",
      "opts": [
        "It saves a trial and spares witnesses from giving evidence",
        "It proves the offender is less to blame for the crime",
        "It shows the offence was less serious than first charged",
        "It shows the offender has no earlier criminal record"
      ],
      "why": "A guilty plea has practical value: the court avoids a trial and witnesses do not have to give evidence. It does not change how much the offender is to blame, so the blame option is the tempting mistake.",
      "clue": "Think about what a trial costs the court and the people in it."
    },
    "b": {
      "d": 3,
      "q": "Dan is sentenced for breaking into a house in Orange. He has two earlier break-in convictions, but he pleaded guilty and apologised. How are these facts best described?",
      "opts": [
        "The record is aggravating, the plea and apology mitigating",
        "The record is mitigating, the plea and apology aggravating",
        "All three are aggravating because they involve the offence",
        "All three are mitigating because Dan admitted the crime"
      ],
      "why": "Dan's record is aggravating: it does not make this break-in worse, but the court can show him less leniency. His apology can show remorse and his plea saves a trial, so both are mitigating. Admitting the crime does not turn his record into a mitigating factor.",
      "clue": "Which facts could earn Dan a lighter sentence, and which could not?"
    }
  },
  "leg-types-penalties": {
    "title": "Types of penalties",
    "card": [
      ["Fine", "The offender pays money to the state. It is mostly used for less serious offences."],
      [
        "Conditional release order",
        "Since 2018 this has replaced the good behaviour bond in NSW. The offender is released on conditions, such as being of good behaviour, and a breach can lead to being resentenced."
      ],
      [
        "Community correction order",
        "The offender lives in the community under court conditions, such as supervision or unpaid work, for up to three years."
      ],
      [
        "Prison sentences",
        "An intensive correction order (ICO) is a prison term served in the community under strict conditions, up to two years for one offence or three for several. Full-time imprisonment is the most serious penalty."
      ]
    ],
    "remember": "Penalties run from paying money, through orders served in the community, to full-time custody.",
    "a": {
      "q": "Which penalty is a prison sentence that the offender serves in the community under strict conditions?",
      "opts": ["Intensive correction order", "Community correction order", "Conditional release order", "Fine"],
      "why": "An intensive correction order is a prison term that is served in the community rather than in jail. A community correction order is tempting, as it also has conditions, but it is not a prison sentence.",
      "clue": "Look for the order that counts as a prison term."
    },
    "b": {
      "d": 2,
      "q": "Dev is given a conditional release order for a minor offence. Months later, while still on the order, he reoffends. What can the court do about the first offence?",
      "opts": [
        "Resentence him for the original offence",
        "Nothing, because the order carries no penalty",
        "Deal with the new offence only, not the old one",
        "Drop the new charge since he is already on an order"
      ],
      "why": "Breaching a conditional release order can lead to Dev being resentenced for the original offence. That chance is what gives the order its force. It is wrong to think the order carries no consequence just because no penalty was imposed at first.",
      "clue": "Think about what gives the conditions of the order their force."
    }
  },
  "leg-appeals": {
    "title": "Appeals",
    "card": [
      "An appeal asks a higher court to review a decision made by a lower court. It is not a new trial from the start.",
      [
        "Sentence appeal",
        "either side can appeal against a sentence. The accused may argue it is too harsh. The Crown (the prosecution) may argue it is too lenient."
      ],
      [
        "Conviction appeal",
        "only the accused can appeal against a conviction, which is a finding of guilt. The accused argues the finding of guilt was wrong."
      ],
      "The appeal goes to a higher court than the one that made the decision. For example, a Local Court decision can go to the District Court."
    ],
    "remember": "An appeal sends a decision to a higher court. The accused can challenge a conviction or sentence, and the Crown can challenge a sentence.",
    "a": {
      "q": "Which appeal is open to the Crown after an accused person is sentenced?",
      "opts": [
        "An appeal arguing the sentence is too lenient",
        "An appeal arguing the conviction was wrong",
        "An appeal to the same court that sentenced",
        "An appeal arguing the sentence is too harsh"
      ],
      "why": "The Crown can appeal against a sentence, and it does so when it thinks the sentence is too lenient. Arguing that a sentence is too harsh is the accused's argument, and a conviction appeal belongs to the accused only.",
      "clue": "The Crown is the prosecution, so which result would it dislike?"
    },
    "b": {
      "d": 3,
      "q": "Tariq is found guilty of fraud in the Local Court and given a sentence he accepts. He now believes the court was wrong to find him guilty. What can he do?",
      "opts": [
        "Appeal against the conviction to a higher court",
        "Appeal only against the sentence to a higher court",
        "Ask the Crown to appeal the conviction for him",
        "Do nothing, because an accepted sentence ends all appeals"
      ],
      "why": "The accused can appeal against a conviction, whatever view he takes of the sentence. Accepting the sentence does not stop him challenging the finding of guilt. Appealing only against the sentence would not address his complaint, which is about guilt.",
      "clue": "His complaint is about the finding of guilt, not the penalty."
    }
  },
  "leg-alternative-methods-sentencing": {
    "title": "Alternative methods of sentencing",
    "card": [
      "Alternative methods of sentencing involve more people than the judge and the lawyers. They aim to deal with the harm caused by an offence and the reasons behind it.",
      [
        "Circle sentencing",
        "Aboriginal elders and community members sit with the magistrate, the offender and often the victim. They talk together and help decide the sentence for an Aboriginal offender."
      ],
      [
        "Restorative justice",
        "The offender and the victim are brought together, often in a conference. The offender hears how the offence affected the victim and can take responsibility and try to repair the harm."
      ],
      "Both methods give the community or the victim a voice in the process. A traditional court hearing is mainly between the court, the prosecution and the accused."
    ],
    "remember": "Circle sentencing adds Aboriginal elders and community. Restorative justice centres on the offender repairing the harm done.",
    "a": {
      "q": "Which feature is found in circle sentencing but not in a traditional court hearing?",
      "opts": [
        "Aboriginal elders help decide the sentence",
        "The magistrate alone decides the sentence",
        "The prosecution presents the case against the accused",
        "The offender is brought before a court"
      ],
      "why": "In circle sentencing, Aboriginal elders and community members take part in sentencing an Aboriginal offender. A magistrate, a prosecution and an offender in court are also found in traditional hearings, so they do not set circle sentencing apart.",
      "clue": "Think about who sits in the circle besides the magistrate."
    },
    "b": {
      "d": 3,
      "q": "Dan damaged a neighbour's fence. A conference is arranged where he hears how it affected the neighbour and offers to repair it. What is this method?",
      "opts": ["Restorative justice", "Circle sentencing", "A traditional court hearing", "Sentencing by a magistrate alone"],
      "why": "Restorative justice brings the offender and the victim together so the offender can face the harm and try to repair it. Circle sentencing is the tempting wrong answer: it involves Aboriginal elders and community members helping sentence an Aboriginal offender, and nothing here says that.",
      "clue": "Look at who Dan meets in the conference."
    }
  },
  "leg-post-sentencing": {
    "title": "Post-sentencing",
    "card": [
      [
        "Parole",
        "Parole lets a prisoner serve the last part of a sentence in the community, under supervision. It is a release on conditions, and the sentence has not ended."
      ],
      [
        "Conditions",
        "A parolee must follow set conditions, such as reporting to a supervising officer. If they break the conditions, the State Parole Authority can revoke parole and return them to prison."
      ],
      [
        "Parole decisions",
        "The court sets the non-parole period, the minimum time to serve in custody. In NSW, for sentences of three years or less, the court's parole order usually means release once it ends. For longer sentences, the State Parole Authority decides."
      ],
      [
        "After the sentence",
        "Some serious offenders can be kept in custody or supervised in the community after their sentence ends. These orders aim to protect the community from a risk of serious harm."
      ]
    ],
    "remember": "Parole is release under supervision during a sentence. Post-sentence orders can apply once the sentence is over.",
    "a": {
      "q": "Which statement best describes a prisoner who is released on parole?",
      "opts": [
        "They serve part of the sentence under community supervision",
        "They have finished the sentence and have no conditions left",
        "They have had the conviction overturned by a higher court",
        "They have been given a lighter sentence by the judge"
      ],
      "why": "Parole is part of the sentence served in the community, with supervision and conditions. It is not the end of the sentence, so the option about having no conditions left is wrong.",
      "clue": "Is the sentence over when parole starts?"
    },
    "b": {
      "d": 2,
      "q": "Sam is on parole. He stops reporting to his supervising officer, and the State Parole Authority revokes his parole. What happens next?",
      "opts": [
        "He goes back to prison to serve more of his sentence",
        "His conviction is quashed because supervision was unfair",
        "His sentence ends because he was already released",
        "He is given a new, longer sentence for the original crime"
      ],
      "why": "Parole is a release on conditions while the sentence is still running. When it is revoked, Sam returns to prison to serve more of that same sentence. His sentence has not ended, and revoking parole does not add a new sentence.",
      "clue": "Parole is a release on conditions, not the end of the sentence."
    }
  },
  "leg-age-criminal-responsibility": {
    "title": "The age of criminal responsibility",
    "card": [
      "The age of criminal responsibility is the age at which a child can be held responsible for a crime. In NSW it is 10.",
      [
        "Under 10",
        "a child cannot be charged with a crime. The law treats them as unable to commit one, whatever they did."
      ],
      [
        "Aged 10 to 13",
        "a child can be charged, but doli incapax applies. The child is presumed not to know the act was seriously wrong."
      ],
      "To convict, the prosecution must overcome this by proving the child knew the act was seriously wrong, not just naughty. This is on top of proving the offence itself."
    ],
    "remember": "Under 10: no charge. Aged 10 to 13: a charge is possible, but a conviction needs proof the child knew the act was seriously wrong.",
    "a": {
      "q": "A 12-year-old is charged with theft in NSW. What else must be shown for a conviction?",
      "opts": [
        "That the child knew the act was seriously wrong",
        "That the child knew the act was naughty or mischievous",
        "Nothing more, as the child is aged 10 or over",
        "That the child is mature enough to be tried as an adult"
      ],
      "why": "At 12, doli incapax applies, so the prosecution must prove the child knew the act was seriously wrong, on top of proving the theft. Knowing it was naughty or mischievous is tempting, but that is not enough to overcome the presumption.",
      "clue": "Reread what doli incapax presumes about a child of 12."
    },
    "b": {
      "d": 3,
      "q": "Ethan is 9 and Priya is 13. Each takes a bike from a shed in Bathurst. Which statement is correct?",
      "opts": [
        "Only Priya can be charged, but doli incapax applies to her",
        "Both can be charged, and doli incapax applies to both",
        "Neither can be charged, as both are under 14",
        "Only Priya can be charged, and doli incapax does not apply"
      ],
      "why": "Ethan is under 10, so he cannot be charged whatever he knew. Priya is 13, which is still in the 10 to 13 group, so she can be charged, but to convict her the prosecution must prove she knew the act was seriously wrong. Thinking 13 is too old for doli incapax is the tempting mistake.",
      "clue": "Is 13 inside or outside the 10 to 13 group?"
    }
  },
  "leg-young-offenders-act-1997": {
    "title": "The Young Offenders Act 1997",
    "card": [
      "The Young Offenders Act 1997 (NSW) lets police deal with some young people who commit offences without taking them to court. The aim is to keep them out of the court system where that is suitable.",
      [
        "Warning",
        "a police officer tells the young person that the behaviour is wrong. It is the lightest response and is used for minor offences."
      ],
      [
        "Caution",
        "a more formal response, given by police or a specialist youth officer. It is recorded, and a parent or other adult is usually present."
      ],
      [
        "Youth justice conference",
        "a meeting of the young person, the victim, a convenor and others. They agree on an outcome plan, which may include an apology or repair work. The Act covers less serious offences, and some serious offences are left out."
      ]
    ],
    "remember": "Under the Act, police can use a warning, caution or conference instead of court.",
    "a": {
      "q": "What is the main purpose of the Young Offenders Act 1997?",
      "opts": [
        "To deal with some young people outside the court system",
        "To set the youngest age at which a child can be charged",
        "To make sure young offenders are dealt with in court",
        "To let courts give young offenders adult sentences"
      ],
      "why": "The Act gives police options such as warnings, cautions and conferences, so that some young people avoid court. The age at which a child can be charged is a separate idea, so that option is wrong.",
      "clue": "Think about what warnings, cautions and conferences replace."
    },
    "b": {
      "d": 2,
      "q": "Police in Orange find that Liam, 15, spray painted a bus shelter. It is his first offence and the damage is minor. Which response fits the Act?",
      "opts": [
        "A caution instead of going to court",
        "A trial in court before any other response",
        "An adult sentence for the damage",
        "No response, as the Act cannot cover property damage"
      ],
      "why": "The Act lets police use a warning, caution or conference for a less serious offence like this one. The option about no response is wrong because the Act covers minor offences, and the damage here is minor. The court options go against the Act's aim of keeping young people out of court.",
      "clue": "A minor first offence is the kind the Act is designed for."
    }
  },
  "leg-children-s-court": {
    "title": "The Children's Court",
    "card": [
      "In NSW, the Children's Court hears most criminal charges against young people under 18. It is a separate court from the courts that hear adult cases.",
      "It is a closed court. The general public cannot sit in the courtroom during criminal hearings, though reporters are generally allowed to attend.",
      "Its focus is rehabilitation, which means helping the young person change their behaviour and stay out of trouble. Punishment is not the only aim, and the court looks at the young person's needs and circumstances.",
      "The names of young people are usually kept private. Even when reporters attend, they generally cannot publish a name or details that identify a child in the case. This protects the young person's chance to start again."
    ],
    "remember": "A closed court that aims to rehabilitate, and that usually keeps a young person's name private.",
    "a": {
      "q": "Which feature of the Children's Court best shows its focus on rehabilitation?",
      "opts": [
        "It looks at the young person's needs and circumstances",
        "It is open to the public so the community can watch",
        "It hears cases from both young people and adults",
        "It aims to deter others by publishing their name"
      ],
      "why": "Rehabilitation means helping the young person change, so the court considers their needs and circumstances. Open hearings and published names work against its aims, and it does not hear adult cases.",
      "clue": "Rehabilitation is about helping a young person change."
    },
    "b": {
      "d": 3,
      "q": "A 16-year-old in Newcastle is charged with stealing from a shop. The case is heard in the Children's Court. What is a local reporter generally allowed to do?",
      "opts": [
        "Attend the hearing but not publish the name",
        "Attend the hearing and publish the name",
        "Neither attend the hearing nor publish the name",
        "Publish the name but not attend the hearing"
      ],
      "why": "The public is excluded, but reporters are generally allowed to attend. Being in the courtroom does not give them the right to identify the teenager, so the name stays private. Thinking a closed court shuts out reporters too is the common mistake.",
      "clue": "Being allowed in the room and being allowed to publish are separate rules."
    }
  },
  "leg-international-crime": {
    "title": "International crime",
    "card": [
      "International crime is crime that goes beyond one country's own law. There are two main kinds, and they differ in what makes them international.",
      [
        "Crimes against international law",
        "acts that international law treats as serious wrongs, such as genocide and war crimes. They are international because of what the act is, not where it happens."
      ],
      [
        "Transnational crime",
        "crime that crosses national borders, such as drug trafficking and cybercrime. It is international because the offending, the people or the effects reach more than one country."
      ],
      "A crime can be one kind without the other. A drug ring that moves cargo between countries is transnational, but drug trafficking is not genocide or a war crime."
    ],
    "remember": "Some crimes are international by their nature. Others are international because they cross borders.",
    "a": {
      "q": "Which crime is a transnational crime?",
      "opts": [
        "A cyber attack on a bank in Australia launched from Romania",
        "A fight between two people in a Sydney park",
        "A theft from a shop in Newcastle by a local",
        "A break-in at a house in Perth by a neighbour"
      ],
      "why": "The attacker and the victim are in different countries, so the crime crosses a border. The other three happen between people in one place and one country, so they are not transnational.",
      "clue": "Look for the crime where the offender and victim are in different countries."
    },
    "b": {
      "d": 3,
      "q": "A group of soldiers deliberately kills civilians in a war, all inside one country. Why is this an international crime?",
      "opts": [
        "International law treats the act itself as a serious wrong",
        "It is transnational because the soldiers carried weapons",
        "It is transnational because news of it spread overseas",
        "It is only international if the victims cross a border"
      ],
      "why": "War crimes are crimes against international law because of the nature of the act, so no border crossing is needed. The tempting option says the victims must cross a border, but that test applies to transnational crime, not to crimes against international law.",
      "clue": "Ask whether the act is international because of what it is or because of where it goes."
    }
  },
  "leg-responses-international-crime": {
    "title": "Responses to international crime",
    "card": [
      [
        "International Criminal Court",
        "The ICC is a permanent court in The Hague. It tries individuals accused of genocide, war crimes, crimes against humanity and, since 2018, the crime of aggression."
      ],
      [
        "Jurisdiction",
        "The ICC usually acts when a crime happens in a member state or the accused is from one. A non-member state can accept its jurisdiction, and the UN Security Council can refer a situation to it. It is a court of last resort, stepping in when national courts are unable or unwilling to act."
      ],
      [
        "Extradition",
        "One country formally hands a suspect or convicted person to another country, so that person can face trial or serve a sentence there. It usually relies on a treaty."
      ],
      [
        "Police cooperation",
        "Police forces share information and work together across borders. Agencies such as the Australian Federal Police and Interpol help with transnational crimes like drug trafficking and cybercrime."
      ]
    ],
    "remember": "The ICC tries the gravest crimes against international law. Extradition and police cooperation tackle crime that crosses borders.",
    "a": {
      "q": "A suspect accused of drug trafficking is arrested in Thailand. Australia asks Thailand to send the suspect to Australia for trial. What is this process called?",
      "opts": [
        "Extradition of the suspect for trial",
        "Referral of the case to the ICC",
        "Police sharing intelligence across borders",
        "A trial of the suspect in The Hague"
      ],
      "why": "Extradition is the formal handing over of a suspect from one country to another for trial. Police cooperation is tempting, but it covers sharing information and working together, not formally transferring a person.",
      "clue": "Think of a formal request to hand over a person."
    },
    "b": {
      "d": 3,
      "q": "A military leader is accused of ordering the killing of a whole ethnic group. Which of these is set up to try the leader for this crime?",
      "opts": [
        "The International Criminal Court",
        "The UN Security Council",
        "Interpol's police network",
        "The Australian Federal Police"
      ],
      "why": "This is genocide, which the ICC tries, and it tries individuals. The UN Security Council is tempting, but it can only refer a situation to the ICC, not try anyone. Interpol and the AFP are police bodies, not courts.",
      "clue": "Which of these is a court?"
    }
  },
  "leg-human-rights-are": {
    "title": "What human rights are",
    "card": [
      "Human rights are the basic rights that belong to every person simply because they are human. They do not have to be earned or bought.",
      ["Universal", "they apply to all people, everywhere, whatever their nationality, race, sex or religion."],
      [
        "Inherent and inalienable",
        "inherent means people have them from birth, not as a gift from a government. Inalienable means they cannot be taken away or given up, although they may be limited in some cases."
      ],
      ["Indivisible", "rights are linked and equally important. A government cannot pick some and ignore the others."]
    ],
    "remember": "Human rights belong to everyone as humans, so no government grants them and none can pick and choose.",
    "a": {
      "q": "A government says its citizens only have rights that its parliament has chosen to give them. Which feature of human rights does this view deny?",
      "opts": [
        "They are inherent, as people have them from birth",
        "They are indivisible, as all rights are linked",
        "They are universal, as they apply in every country",
        "They are earned, as people must show they deserve them"
      ],
      "why": "Inherent rights belong to people because they are human, so they do not depend on a government giving them. The view does not mainly deny that rights are universal: it is about where rights come from, not who has them.",
      "clue": "Think about where rights come from."
    },
    "b": {
      "d": 3,
      "q": "A country protects its citizens' right to vote and speak freely, but ignores their right to education and health care, saying the first group matters more. Which idea about human rights does this go against?",
      "opts": [
        "Indivisible, as rights are linked and equally important",
        "Inherent, as people have rights from birth",
        "Inalienable, as rights cannot be taken away",
        "Universal, as rights apply to people everywhere"
      ],
      "why": "The country is choosing some rights and ignoring others, which goes against the idea that rights are indivisible. Universal is the tempting option, but the country is not leaving out any group of people. It is leaving out certain rights.",
      "clue": "Is the country leaving out some people, or some rights?"
    }
  },
  "leg-development-human-rights": {
    "title": "The development of human rights",
    "card": [
      "Ideas of human rights grew slowly over many centuries. They were shaped by written documents and by campaigns that pushed for change.",
      [
        "Magna Carta",
        "agreed to by King John and sealed with his royal seal in England in 1215, it limited the power of the king. It supported the idea that rulers must follow the law, but it first protected mainly powerful nobles, not everyone."
      ],
      [
        "18th-century declarations",
        "the American Declaration of Independence (1776) and the French Declaration of the Rights of Man and of the Citizen (1789) said people have rights that governments should respect."
      ],
      [
        "Campaigns",
        "people campaigned against slavery and for workers' rights and women's rights. These campaigns pushed the idea of rights to cover more people."
      ]
    ],
    "remember": "Human rights ideas grew from documents that limited rulers and from campaigns that widened who is protected.",
    "a": {
      "q": "What did Magna Carta contribute to the development of human rights?",
      "opts": [
        "It supported the idea that rulers must follow the law",
        "It gave equal rights to every person in England",
        "It ended slavery across the British Empire",
        "It created a court to enforce rights worldwide"
      ],
      "why": "Magna Carta limited the king's power and supported the idea that rulers are under the law. It is wrong to say it gave equal rights to all, because at first it mainly protected powerful nobles.",
      "clue": "Think about who it limited, and who it first protected."
    },
    "b": {
      "d": 3,
      "q": "Why did campaigns against slavery and for women's rights matter to the development of human rights?",
      "opts": [
        "They pushed rights to cover people who had been left out",
        "They replaced earlier documents such as Magna Carta",
        "They were the first time anyone wrote about rights",
        "They gave rulers new powers to decide who has rights"
      ],
      "why": "These campaigns challenged who was protected and pushed rights to include more people. They did not replace earlier documents, because ideas of rights grew through both documents and campaigns working over time.",
      "clue": "Ask who was missing from the early documents."
    }
  },
  "leg-universal-declaration-human-rights": {
    "title": "The Universal Declaration of Human Rights",
    "card": [
      "The Universal Declaration of Human Rights (UDHR) was adopted by the United Nations (UN) General Assembly in 1948. It was drafted after the Second World War.",
      "It sets out rights that apply to all people, in every country. It is a statement of shared standards, not a treaty.",
      "The UDHR is not legally binding itself. A state that ignores it does not break a treaty obligation by that alone.",
      "It still had a lasting effect. It led to binding treaties, such as the International Covenant on Civil and Political Rights (ICCPR), which states choose to join."
    ],
    "remember": "The UDHR is a non-binding list of rights for all people that led to binding treaties.",
    "a": {
      "q": "Which statement about the legal status of the UDHR is correct?",
      "opts": [
        "It is not binding itself, but it led to binding treaties",
        "It is a binding treaty that every UN member must obey",
        "It is not binding and has had no effect on later treaties",
        "It became binding only on states that voted for it in 1948"
      ],
      "why": "The UDHR is a declaration, so it is not binding by itself. Later treaties built on it and do bind the states that join them. It is wrong to say it had no effect, because its influence is the reason those treaties exist.",
      "clue": "Think about what a declaration is compared with a treaty."
    },
    "b": {
      "d": 3,
      "q": "Country X has joined the ICCPR, a treaty based on the UDHR. Country Y has only said it supports the UDHR. Which is the best description of their positions?",
      "opts": [
        "Country X has binding treaty duties, but Country Y does not",
        "Both countries have the same binding duties under the UDHR",
        "Country Y has binding duties, but Country X does not",
        "Neither has duties, because treaties cannot bind any state"
      ],
      "why": "Joining a treaty creates legal duties for that state. Supporting the UDHR alone does not, because the UDHR is not binding itself. The two are not equal, since one rests on a treaty and the other on a declaration.",
      "clue": "Compare where each country's duties would come from."
    }
  },
  "leg-types-rights": {
    "title": "Types of rights",
    "card": [
      [
        "Civil and political",
        "rights that protect a person's freedom and let them take part in public life. Examples are free speech, a fair trial and the right to vote."
      ],
      [
        "Economic, social and cultural",
        "rights that relate to a person's basic needs and way of life. Examples are education, health care, fair work and taking part in cultural life."
      ],
      [
        "Collective",
        "rights held by a group or a people, not by one person alone. An example is the right of a people to self-determination, which is choosing their own political status and future."
      ],
      "One law or case can involve more than one type. Sorting a right means asking who holds it and what it protects."
    ],
    "remember": "Ask who holds the right and what it protects: freedoms and public voice, basic needs and way of life, or a group's shared claim.",
    "a": {
      "q": "Which of these is an example of a civil and political right?",
      "opts": [
        "The right to vote in an election",
        "The right to attend a local school",
        "The right to health care when sick",
        "The right of a people to choose their future"
      ],
      "why": "Voting lets a person take part in public life, so it is a civil and political right. Education is tempting because it is a major right, but it relates to a basic need, so it is economic, social and cultural.",
      "clue": "Which right is about taking part in public life?"
    },
    "b": {
      "d": 3,
      "q": "A group of Pacific islanders says that their people have the right to decide their own political status. What type of right are they claiming?",
      "opts": ["A collective right", "A civil and political right", "An economic right", "A social and cultural right"],
      "why": "The claim is made by a people as a group, and it concerns self-determination, so it is a collective right. It is tempting to call it civil and political because it involves politics, but that type protects individuals, such as their vote or speech.",
      "clue": "Who holds this right: one person or a whole people?"
    }
  },
  "leg-sovereignty-enforcement": {
    "title": "Sovereignty and enforcement",
    "card": [
      "Sovereignty means a state has supreme authority over its own territory and people. Other states and international bodies cannot simply override its decisions.",
      "There is no world government or police force to make a state obey human rights standards. This makes enforcement hard when a state will not comply.",
      "Pressure can still come from outside. The UN can criticise a state or review its record, and other states can use diplomacy or sanctions.",
      "Non-government organisations (NGOs), such as Amnesty International, and the media expose abuses and shape public opinion. This pressure may persuade a state to change, but it does not force it to."
    ],
    "remember": "Sovereignty limits enforcement, so human rights rely on pressure from the UN, states, NGOs and the media.",
    "a": {
      "q": "Why is it hard to enforce human rights against a state that refuses to comply?",
      "opts": [
        "The state has supreme authority over its own territory",
        "The state has not yet been told which rights apply",
        "The UN has no interest in the rights of that state's people",
        "NGOs and the media are banned from reporting abuses"
      ],
      "why": "Sovereignty gives a state supreme authority within its territory, and no world government can override it. The UN does take an interest in human rights, so the claim that it has none is wrong.",
      "clue": "Think about who has final authority inside a country."
    },
    "b": {
      "d": 3,
      "q": "A state is accused of jailing critics. An NGO publishes a report and newspapers abroad cover it. Which statement best describes what this pressure can do?",
      "opts": [
        "It can persuade the state, but it cannot force a change",
        "It can force a change, but only if the UN agrees",
        "It cannot persuade the state, as sovereignty blocks it",
        "It can force a change, as long as other states join in"
      ],
      "why": "NGOs and the media expose abuses and shape opinion, which may lead a state to change. No body can compel a sovereign state, so even UN agreement or support from other states does not force a change. Sovereignty does not block persuasion, since the state can still choose to act.",
      "clue": "Think about what a sovereign state is still free to decide."
    }
  },
  "leg-rights-australian-constitution": {
    "title": "Rights in the Australian Constitution",
    "card": [
      "The Australian Constitution protects only a few rights in express words. An express right is one the text states directly.",
      [
        "Express right",
        "Section 80 says a trial on indictment (the procedure for serious offences) for a Commonwealth law must be by jury. Others include freedom of religion (section 116) and just terms when the Commonwealth acquires property (section 51(xxxi))."
      ],
      [
        "Implied right",
        "a right the High Court has found from the Constitution's structure, though the words do not state it. The best known is the implied freedom of political communication, which comes from the system of representative government."
      ],
      "The implied freedom is not absolute. The High Court has said laws can limit it in some cases. The Constitution has no general list of rights like a bill of rights."
    ],
    "remember": "The Constitution protects few rights in words. The High Court has found others by implication, such as the freedom of political communication.",
    "a": {
      "q": "Which of these is an implied right in the Australian Constitution?",
      "opts": [
        "Freedom of political communication",
        "Trial by jury for Commonwealth indictable offences",
        "Freedom of religion",
        "Just terms for property acquired by the Commonwealth"
      ],
      "why": "The High Court found the freedom of political communication from the Constitution's system of representative government. The other three are stated in the text, so they are express rights. Jury trial is the most tempting, but section 80 states it directly.",
      "clue": "Which right does the text not state, but the High Court found?"
    },
    "b": {
      "d": 3,
      "q": "Layla says the Constitution protects all the rights Australians need, because the High Court has found an implied freedom. Which reply is most accurate?",
      "opts": [
        "The Constitution states few rights and has no full list",
        "The implied freedom is absolute, so no law can limit it",
        "The Constitution has no express rights, only implied ones",
        "The Constitution lists the same rights as a bill of rights"
      ],
      "why": "The Constitution states only a few rights and does not set out a general list. The implied freedom does not make up for this, as it covers political communication and laws can limit it in some cases. It is wrong to say there are no express rights, because section 80 is one.",
      "clue": "Think about how many rights the text states, and how far the implied one reaches."
    }
  },
  "leg-statutes-that-protect-rights": {
    "title": "Statutes that protect rights",
    "card": [
      "A statute is a law made by parliament. Australia has no national bill of rights, so many rights are protected by statutes that cover particular areas.",
      [
        "Racial Discrimination Act 1975",
        "a Commonwealth (national) law that makes it unlawful to treat people unfairly because of their race, colour, descent or national or ethnic origin."
      ],
      [
        "Sex Discrimination Act 1984",
        "a Commonwealth law that makes it unlawful to treat people unfairly on grounds such as sex, pregnancy or potential pregnancy, marital or relationship status, and sexual orientation. It also covers sexual harassment."
      ],
      "Each statute protects rights only in the areas it covers, such as work, education and the provision of goods and services. A person with a complaint must show that their situation falls within the Act."
    ],
    "remember": "Statutes protect rights one area at a time, not through a single general guarantee.",
    "a": {
      "q": "Why are statutes such as the Racial Discrimination Act 1975 described as protecting rights in particular areas?",
      "opts": [
        "Each Act covers set grounds and areas of life",
        "Each Act applies only in one State or Territory",
        "Each Act protects rights written into the Constitution",
        "Each Act protects every right a person has"
      ],
      "why": "These Acts name the grounds, such as race or sex, and the areas, such as work or education, where discrimination is unlawful. They are Commonwealth laws made by parliament, so they are not limited to one State and are not part of the Constitution.",
      "clue": "Think about what each Act lists as its grounds and areas."
    },
    "b": {
      "d": 3,
      "q": "Dana is refused a job at a Newcastle warehouse because the manager says she is a woman and 'will have children soon'. Which law most directly protects her?",
      "opts": [
        "The Sex Discrimination Act 1984",
        "The Racial Discrimination Act 1975",
        "The right to trial by jury",
        "A national bill of rights"
      ],
      "why": "The treatment is based on Dana's sex and potential pregnancy, which the Sex Discrimination Act covers in employment. The Racial Discrimination Act is tempting because it is also an anti-discrimination law, but the ground here is not race. Australia has no national bill of rights.",
      "clue": "Match the ground of the unfair treatment to the Act."
    }
  },
  "leg-australian-human-rights-commission": {
    "title": "The Australian Human Rights Commission",
    "card": [
      "The Australian Human Rights Commission is an independent body set up by federal law. It is not a court, so it cannot make a binding ruling on a complaint.",
      [
        "Complaints",
        "It investigates complaints of unlawful discrimination under federal laws and tries to settle them by conciliation, a private talk between both sides helped by a neutral person. If that fails, the person can take the case to a federal court."
      ],
      [
        "Education",
        "It teaches the public, schools and workplaces about human rights, so that people know their rights and duties."
      ],
      ["Reporting", "It reports on human rights issues in Australia and gives advice to the government."]
    ],
    "remember": "The Commission handles complaints, educates and reports, but it cannot make binding rulings like a court.",
    "a": {
      "q": "Which of these is a function of the Australian Human Rights Commission?",
      "opts": [
        "Investigating complaints of unlawful discrimination",
        "Hearing appeals against decisions of the High Court",
        "Passing new laws to protect human rights",
        "Punishing people found guilty of discrimination"
      ],
      "why": "The Commission investigates complaints of unlawful discrimination and tries to settle them. It does not pass laws, which is the work of parliament, and it is not a court, so it cannot punish people or hear appeals.",
      "clue": "The Commission is not a court and not a parliament."
    },
    "b": {
      "d": 3,
      "q": "Priya's employer refuses to settle her race discrimination complaint at conciliation. What can happen next?",
      "opts": [
        "Priya can take her case to a federal court",
        "The Commission can order the employer to pay Priya",
        "The Commission can make a binding ruling on the case",
        "Priya has no other way to have the complaint heard"
      ],
      "why": "When conciliation fails, the person can take the case to a federal court, which can make a binding decision. Ordering payment is tempting, but the Commission is not a court, so it cannot make orders that bind the employer.",
      "clue": "Which body can make a decision that binds the employer?"
    }
  },
  "leg-bill-rights-debate": {
    "title": "The bill of rights debate",
    "card": [
      "A bill of rights is a document that lists the basic rights of people in a country. Australia has no national bill of rights.",
      [
        "Supporters",
        "say a bill of rights would protect rights better. It would set clear standards that governments must meet, and people could rely on them in court."
      ],
      [
        "Opponents",
        "say it would hand power from parliament to unelected judges. They argue that elected members of parliament, who answer to voters, should decide how rights are balanced."
      ],
      "Victoria, the ACT and Queensland have their own human rights acts. These are state and territory laws and do not cover the whole country."
    ],
    "remember": "The debate is about who should protect rights: a bill of rights and the courts, or elected parliaments.",
    "a": {
      "q": "Which argument do opponents of a bill of rights make?",
      "opts": [
        "It would shift power from parliament to unelected judges",
        "It would give parliament too little power to make new laws",
        "It would remove rights that people already have",
        "It would apply to some states but not to the others"
      ],
      "why": "Opponents say judges, who are not elected, would gain power that now belongs to parliament. The option about removing rights is wrong because it is not the argument opponents make. Their concern is who decides, not the loss of rights.",
      "clue": "Opponents care most about who gets the final say on rights."
    },
    "b": {
      "d": 3,
      "q": "Tariq says a national bill of rights would let a court strike down a rule made by elected members of parliament, and he opposes it for that reason. Which argument is he making?",
      "opts": [
        "Judges would gain power that should stay with parliament",
        "Rights would be less protected than they are now",
        "Voters would have no way to enforce their rights",
        "States would lose their own human rights acts"
      ],
      "why": "Tariq objects that unelected judges could override elected members of parliament. This is the opponents' argument about power moving from parliament to judges. Saying rights would be less protected is tempting, but Tariq makes no claim that rights would be weaker. His objection is about who decides.",
      "clue": "He is worried about who makes the final decision, not about how strong the rights are."
    }
  },
  "leg-who-consumer": {
    "title": "Who is a consumer",
    "card": [
      [
        "Consumer",
        "A person who buys goods or services, usually for personal or household use. Goods are things such as a phone. Services are things such as a haircut."
      ],
      [
        "Legal test",
        "Under the Australian Consumer Law, a buyer is also a consumer if the price is under a set limit, or the item is a kind usually bought for personal use. This holds even if it is bought for work."
      ],
      [
        "Not a consumer",
        "A person who buys goods to resell them, or to use up or transform in making other goods, is not a consumer of those goods."
      ],
      [
        "Imbalance",
        "Sellers usually know more about the product and hold more power in a sale. Consumer law exists to reduce this imbalance and sets rules for how sellers treat buyers."
      ]
    ],
    "remember": "Buying to resell or to make other goods is excluded. The law protects consumers because sellers usually hold more power and information.",
    "a": {
      "q": "Why does consumer law protect people who buy goods and services?",
      "opts": [
        "Sellers usually have more power and information",
        "Consumers always know more than sellers do",
        "Sellers are not allowed to make a profit",
        "Consumers must be able to buy any product they want"
      ],
      "why": "Sellers usually know more about what they sell and hold more power in the sale, so the law steps in to reduce that imbalance. It does not say consumers know more, and it does not stop sellers making a profit.",
      "clue": "Think about who knows more about the product."
    },
    "b": {
      "d": 3,
      "q": "Priya buys laptops from a shop in Parramatta. Laptops are a kind of item usually bought for personal use. In which situation is she not a consumer?",
      "opts": [
        "She buys ten to resell in her shop",
        "She buys one for study at home",
        "She buys one to use in her law firm",
        "She buys one for her employer's office"
      ],
      "why": "Buying goods to resell them is excluded, so Priya is not a consumer of those ten laptops. Buying one for her law firm is tempting, but a laptop is a kind of item usually bought for personal use, so she is still a consumer.",
      "clue": "Which purchase is she planning to sell on to others?"
    }
  },
  "leg-contracts": {
    "title": "Contracts",
    "card": [
      "A contract is an agreement that the law will enforce. It needs four things: offer, acceptance, consideration and an intention to be legally bound.",
      ["Offer and acceptance", "One party offers clear terms. The other agrees to those terms without changing them."],
      [
        "Consideration and intention",
        "Each side gives something of value, such as money for goods. The parties must also mean the agreement to have legal effect."
      ],
      ["Implied terms", "Some terms are implied by law. They apply even if the contract does not write them down."]
    ],
    "remember": "A contract needs four parts, and the law can add terms the parties never wrote.",
    "a": {
      "q": "Ravi agrees to pay Chen $200 for a second-hand bike, and Chen agrees to hand it over. Which part of the contract is the $200 payment?",
      "opts": ["Consideration", "Offer", "Acceptance", "Intention to be legally bound"],
      "why": "The $200 is what Ravi gives in return for the bike, so it is consideration. It is not the offer, because the offer is the proposal of terms, and it is not acceptance, which is agreeing to those terms.",
      "clue": "What does each side give in exchange?"
    },
    "b": {
      "d": 3,
      "q": "Mia emails a shop: she offers $90 for a jacket marked $120. The shop replies, 'We will sell it for $105.' Why is there no contract yet?",
      "opts": [
        "The shop changed the terms, so Mia's offer was not accepted",
        "Mia did not pay any money to the shop in advance",
        "The shop's reply did not include any written implied terms",
        "Mia and the shop did not intend to be legally bound"
      ],
      "why": "Acceptance must agree to the terms without changing them. The shop named a new price, so Mia's offer was not accepted. Payment in advance is not needed to form a contract, because the card only asks that each side gives something of value.",
      "clue": "Did the shop agree to the terms Mia offered?"
    }
  },
  "leg-australian-consumer-law": {
    "title": "The Australian Consumer Law",
    "card": [
      "The Australian Consumer Law (ACL) is a national law that applies across Australia. It sets rules that sellers must follow when dealing with consumers.",
      [
        "Consumer guarantees",
        "automatic rights that come with goods and services. For example, goods must be of acceptable quality, and services must be provided with due care and skill."
      ],
      [
        "Misleading conduct",
        "the ACL bans misleading or deceptive conduct. A seller breaks this rule if its words, ads or actions give buyers a false impression."
      ],
      [
        "Unfair terms",
        "the ACL bans unfair contract terms in standard form contracts offered to consumers. A term can be unfair if it creates a significant imbalance in the parties' rights and is not needed to protect the seller's legitimate interests."
      ]
    ],
    "remember": "The ACL guarantees basic standards and bans false impressions and unfair terms.",
    "a": {
      "q": "Ravi buys a new kettle in Newcastle. It stops working after two days of normal use. Which part of the ACL does this most directly involve?",
      "opts": [
        "The guarantee of acceptable quality",
        "The ban on unfair contract terms",
        "The ban on misleading conduct",
        "The guarantee of due care and skill"
      ],
      "why": "Goods must be of acceptable quality, and a new kettle that fails after two days of normal use is unlikely to meet that standard. Due care and skill applies to services, not to goods such as a kettle.",
      "clue": "A kettle is goods, not a service."
    },
    "b": {
      "d": 3,
      "q": "A gym in Parramatta advertises 'no joining fees' but charges a joining fee when members sign up. Which ACL rule is the gym most likely to have breached?",
      "opts": [
        "The ban on misleading or deceptive conduct",
        "The ban on unfair contract terms",
        "The guarantee of acceptable quality",
        "The guarantee of due care and skill"
      ],
      "why": "The advertisement gave customers a false impression about the cost, which is misleading or deceptive conduct. It is not mainly about an unfair term, because the problem is the false claim in the ad rather than an imbalance of rights in a contract.",
      "clue": "Focus on what the advertisement told people."
    }
  },
  "leg-remedies-consumers": {
    "title": "Remedies for consumers",
    "card": [
      "A remedy is what a consumer can seek when a business has failed them, for example when goods are faulty. The first step is usually to ask the seller to fix the problem.",
      [
        "Repair, replace, refund",
        "For a minor problem, the seller can choose how to fix it, such as with a repair. For a major failure, such as goods that are unsafe, the consumer can choose a refund or a replacement."
      ],
      [
        "NSW Fair Trading",
        "If the seller will not help, the consumer can complain to NSW Fair Trading, a government agency. It can help the two sides try to settle the dispute, but it does not decide it."
      ],
      [
        "NCAT",
        "A consumer can also take a claim to the NSW Civil and Administrative Tribunal (NCAT). A tribunal hears both sides and makes a decision, and it is less formal than a court."
      ]
    ],
    "remember": "Start with the seller. Fair Trading can help settle a dispute, and NCAT can decide it.",
    "a": {
      "q": "Dev's seller refuses to help with his faulty blender. Which statement about where he can turn is correct?",
      "opts": [
        "Fair Trading helps settle it, and NCAT decides it",
        "NCAT helps settle it, and Fair Trading decides it",
        "Fair Trading and NCAT can each only give advice",
        "Fair Trading decides it, and NCAT hears appeals"
      ],
      "why": "NSW Fair Trading is a government agency that helps the two sides try to settle. NCAT is a tribunal, so it hears both sides and makes a decision. Swapping the two roles is the tempting mistake, but Fair Trading does not decide disputes.",
      "clue": "Which of the two is a tribunal?"
    },
    "b": {
      "d": 3,
      "q": "Leah's new heater gives off sparks and is unsafe to use. The seller offers only to repair it. What is Leah's position?",
      "opts": [
        "She can choose a refund or a replacement",
        "She must accept the repair the seller offers",
        "She can get a refund only by going to NCAT",
        "She must complain to NSW Fair Trading first"
      ],
      "why": "An unsafe heater is a major failure, so Leah can choose a refund or a replacement. The seller gets to choose the fix only for a minor problem, so she does not have to accept the repair. She can ask the seller directly and does not need Fair Trading or NCAT to get this remedy.",
      "clue": "Is this a minor problem or a major failure?"
    }
  },
  "leg-consumer-credit": {
    "title": "Consumer credit",
    "card": [
      "Consumer credit is money a person borrows for personal or household use, such as a car loan, a personal loan or a credit card.",
      "The National Consumer Credit Protection Act 2009 (Cth) is the main law on this. It sets rules for the businesses that lend to consumers.",
      ["Licensing", "lenders must hold an Australian credit licence before they can offer credit to consumers."],
      [
        "Suitability",
        "before giving a loan, a lender must make reasonable checks on the borrower's finances and needs. It must not give a loan that is unsuitable for the borrower."
      ]
    ],
    "remember": "Credit law works on the lender: it must be licensed and must check a loan is not unsuitable.",
    "a": {
      "q": "Which duty does the National Consumer Credit Protection Act 2009 place on lenders?",
      "opts": [
        "Hold a credit licence before offering credit to consumers",
        "Offer the same interest rate to every borrower",
        "Approve every loan application from a consumer",
        "Provide credit only to people who already own property"
      ],
      "why": "The Act requires lenders to be licensed, so only approved businesses can lend to consumers. It does not make lenders approve every application, because a lender must refuse a loan that is unsuitable.",
      "clue": "The Act sets conditions on who may lend."
    },
    "b": {
      "d": 3,
      "q": "Dev earns a low wage. A licensed lender gives him a large loan without checking his income or expenses. Which duty has the lender most likely breached?",
      "opts": [
        "Checking that the loan is not unsuitable for Dev",
        "Holding an Australian credit licence",
        "Refusing to lend to anyone on a low wage",
        "Lending only to buyers of household goods"
      ],
      "why": "The lender must make reasonable checks on a borrower's finances and must not give an unsuitable loan. It was licensed, so the licence duty was met. The law does not ban lending to people on low wages, it requires the lender to check first.",
      "clue": "The lender was licensed, so look at what it did before lending."
    }
  },
  "leg-consumers-online-shopping": {
    "title": "Consumers and online shopping",
    "card": [
      [
        "Scams",
        "A fake website or a false offer can take a buyer's money and send nothing. The person behind it may be hard to identify or trace."
      ],
      [
        "Overseas sellers",
        "A seller based in another country can be hard to pursue. Australian courts and regulators may have limited power to make it provide a remedy."
      ],
      [
        "Data privacy",
        "Online sellers collect personal details such as names, addresses and payment information. Consumers can lose control over how that data is stored, used or shared."
      ],
      "Consumer law still protects people who buy online, but it can be hard to enforce. Online trade can change faster than the law, so some gaps in protection remain."
    ],
    "remember": "Online shopping adds risks of scams, overseas sellers and misuse of personal data, and the law is still catching up.",
    "a": {
      "q": "Priya pays for a jacket on a website run from another country. It never arrives and the seller stops replying. Why might a remedy be hard to get?",
      "opts": [
        "Regulators here may have little power over a foreign seller",
        "Consumer law may not apply to goods bought online",
        "Priya may not count as a consumer when buying online",
        "Her personal data may have been shared without consent"
      ],
      "why": "The seller is based overseas, so Australian courts and regulators may struggle to make it provide a remedy. Consumer law still protects people who buy online, and Priya is still a consumer. The problem is enforcing the law, not whether it applies.",
      "clue": "Think about where the seller is based."
    },
    "b": {
      "d": 3,
      "q": "Tom buys shoes on a website and they arrive as ordered. Weeks later he gets many emails from companies he has never dealt with. Which issue does this best show?",
      "opts": [
        "Data privacy, as his details reached other companies",
        "A scam, as the website was set up to trick him",
        "An overseas seller, as the companies are run from abroad",
        "A scam, as the emails are offers he did not ask for"
      ],
      "why": "Companies he never dealt with have his details, so he has lost control over how his data was shared. That is a data privacy issue. It is not a scam in the card's sense, because he paid and the shoes arrived. Nothing in the case says anyone is based overseas.",
      "clue": "What did the website collect from Tom when he paid?"
    }
  },
  "leg-marriage": {
    "title": "Marriage",
    "card": [
      "The Marriage Act 1961 is a Commonwealth law that sets the rules for a valid marriage anywhere in Australia. Since 2017 it has defined marriage as a voluntary union of two people for life, so two people of any sex can marry.",
      "Both people must normally be at least 18. A 16 or 17 year old can marry only with a court's approval, and only if the other person is at least 18.",
      "Both people must freely consent. Neither can be already married, and they cannot be close family members.",
      "A marriage is also formed through a ceremony. An authorised celebrant must conduct it and two witnesses must attend."
    ],
    "remember": "A valid marriage must meet every rule in the Marriage Act 1961, and since 2017 two people of any sex can marry.",
    "a": {
      "q": "Which change did the Marriage Act 1961 undergo in 2017?",
      "opts": [
        "It allowed two people of any sex to marry",
        "It raised the minimum age for marriage to 21",
        "It gave each state its own rules for marriage",
        "It ended the need for consent to a marriage"
      ],
      "why": "The 2017 change widened the Act so that two people of any sex can marry. Marriage law is still Commonwealth law and consent is still required, so the other options are wrong.",
      "clue": "The change was about who is allowed to marry."
    },
    "b": {
      "d": 3,
      "q": "Lena, aged 30, is already married. She holds a ceremony with a celebrant and two witnesses to marry Tom, who is single and consents. Why is the new marriage not valid?",
      "opts": [
        "Lena is still married to another person",
        "Lena is too old to marry for a second time",
        "Tom and Lena did not have a court's approval",
        "The ceremony was held without enough witnesses"
      ],
      "why": "A person who is already married cannot marry again, so the new marriage is not valid. The ceremony had a celebrant and two witnesses, and court approval is needed only when a person is 16 or 17.",
      "clue": "Go through each rule for a valid marriage in turn."
    }
  },
  "leg-de-facto-relationships": {
    "title": "De facto relationships",
    "card": [
      "A de facto relationship is a couple who live together on a genuine domestic basis without being married. They can be of the same sex or different sexes.",
      "A court looks at the whole relationship to decide if it is de facto. It considers things such as how long they lived together, whether they shared money and a home, and how others saw them.",
      "Under the Family Law Act 1975, de facto partners who separate can ask the court to divide their property and to order maintenance (financial support). These are most of the same rights that married couples have.",
      "The court can usually make these orders only if one gateway test is met: the relationship lasted at least 2 years in total, there is a child of the relationship, one partner made substantial contributions, or the relationship was registered."
    ],
    "remember": "Living together as a couple can give most of the separation rights of marriage, usually once a gateway test, such as 2 years together, is met.",
    "a": {
      "q": "Ana and Leo lived together as a couple for 8 months. They have no child, never registered the relationship and neither made substantial contributions. They separate. Can a court usually make property orders?",
      "opts": [
        "No, because none of the gateway tests is met",
        "Yes, because they lived together as a couple",
        "Yes, because any separating couple can apply",
        "No, because the law covers only married couples"
      ],
      "why": "De facto partners can seek property orders, but usually only if a gateway test is met. Ana and Leo were together under 2 years, with no child, registration or substantial contributions, so none is met. Living together as a couple is not enough on its own.",
      "clue": "Check each gateway test against their situation."
    },
    "b": {
      "d": 3,
      "q": "Mia and Jack lived together as a couple in Dubbo for 18 months and had a baby together. They never married or registered the relationship. They separate. Which statement is correct?",
      "opts": [
        "The court can make orders, because they have a child",
        "The court cannot, because they were together under 2 years",
        "The court cannot, because they never married",
        "The court can, but only once they register the relationship"
      ],
      "why": "The gateway tests are alternatives, so meeting any one is enough. Mia and Jack have a child of the relationship, so the court can make property and maintenance orders even though they were together under 2 years. Registration is just one of the tests, not a requirement.",
      "clue": "Does a couple need to meet every gateway test, or just one?"
    }
  },
  "leg-divorce": {
    "title": "Divorce",
    "card": [
      "Divorce is the legal end of a marriage. In Australia it is granted under the Family Law Act 1975 by a family law court.",
      "Australia has no-fault divorce. The court does not ask who caused the marriage to end, and blame is not part of the application.",
      "The only ground is that the marriage has broken down and cannot be repaired. This is proved by showing the couple has been separated for at least 12 months.",
      "Spouses can be separated while still living under the same roof. Divorce ends the marriage itself. Matters such as children and property are separate questions."
    ],
    "remember": "Divorce needs proof that the marriage has broken down, shown by 12 months of separation, not proof of who was to blame.",
    "a": {
      "q": "Which of these is the ground for divorce in Australia?",
      "opts": [
        "The marriage has broken down, shown by 12 months apart",
        "One spouse has been proved to be at fault for the split",
        "Both spouses have agreed in writing that they want to part",
        "The couple has gone through a period of formal counselling"
      ],
      "why": "Australia has no-fault divorce, so the court looks at whether the marriage has broken down, which is shown by 12 months of separation. Fault is tempting but it is not part of the ground. Agreement alone does not meet the ground either.",
      "clue": "The court asks about the state of the marriage, not about blame."
    },
    "b": {
      "d": 3,
      "q": "Tom's wife left him after he was unfaithful. Eleven months later, Tom applies for divorce. Tom's lawyer says the court will not grant it yet. What is the reason?",
      "opts": [
        "The couple has not yet been separated for 12 months",
        "Tom's wife has not been proved to be the one at fault",
        "Tom was unfaithful, so he cannot apply for a divorce",
        "The couple must first agree on who looks after the children"
      ],
      "why": "The ground is that the marriage has broken down, proved by 12 months of separation, and only 11 months have passed. Tom's unfaithfulness is irrelevant, because Australia has no-fault divorce and does not ask who caused the split.",
      "clue": "Count the months, and ignore who caused the split."
    }
  },
  "leg-children-after-separation": {
    "title": "Children after separation",
    "card": [
      "When parents separate, they can agree on where their child lives and how much time the child spends with each parent. If they cannot agree, a court can decide under the Family Law Act 1975.",
      "The best interests of the child are the court's first concern. The question is what suits the child, not what suits either parent.",
      "The Act lists factors the court weighs. The first is safety: arrangements that keep the child, and the people caring for the child, safe from family violence, abuse, neglect or other harm.",
      "Other factors include the child's views, the child's emotional, developmental and cultural needs, each parent's ability to meet those needs, and the benefit of relationships with parents and others where it is safe. A child's views count, but they do not settle the matter alone."
    ],
    "remember": "The court asks what is best for the child, not what each parent wants.",
    "a": {
      "q": "Two separated parents cannot agree on where their son should live. A court must decide. What is its first concern?",
      "opts": [
        "The best interests of the child",
        "The wishes of the parent who earns more",
        "Treating both parents' claims as equal",
        "The wishes of the parent who left first"
      ],
      "why": "The court puts the child's best interests first, and weighs the child's needs, not the parents' wishes. Treating the parents' claims as equal is tempting, but the court's focus is the child, not fairness between the parents.",
      "clue": "Whose needs does the court put first?"
    },
    "b": {
      "d": 3,
      "q": "Aisha, 10, says she wants to live only with her father in Wagga Wagga. The court has evidence that he has been violent. How is the court likely to treat her wish?",
      "opts": [
        "As one factor, weighed against the need to protect her",
        "As the deciding factor, because she has stated it clearly",
        "As irrelevant, because children's views are never heard",
        "As less important than her father's right to time with her"
      ],
      "why": "The court considers a child's views, but they do not settle the matter alone. Safety is the first factor the Act lists, so her wish is weighed against the evidence of violence. Treating her wish as decisive is wrong because the child's best interests come first, not her stated preference.",
      "clue": "The child's views count, but they are not the only thing weighed."
    }
  },
  "leg-domestic-violence-law": {
    "title": "Domestic violence and the law",
    "card": [
      "An apprehended violence order (AVO) is a court order that protects a person from violence, threats, harassment or stalking. In NSW, an apprehended domestic violence order (ADVO) is the kind used when the people are in a domestic relationship.",
      "An AVO sets conditions for the person it is made against, such as not approaching or contacting the protected person. Police or the protected person can apply, and a court makes the order.",
      "Breaching an AVO is a criminal offence. The order itself is not a criminal charge, but ignoring its conditions can lead to one.",
      "Coercive control is a pattern of behaviour used to control or dominate a partner, such as isolating them or monitoring them. From 2024, NSW made coercive control in a current or former intimate relationship a crime."
    ],
    "remember": "An AVO protects a person by setting conditions, and coercive control is now a crime in NSW.",
    "a": {
      "q": "What best describes coercive control under NSW law?",
      "opts": [
        "A pattern of behaviour used to control an intimate partner",
        "A single act of physical violence against a partner",
        "Controlling behaviour that is a crime only between spouses",
        "A court order that stops a person contacting a partner"
      ],
      "why": "Coercive control is a pattern of behaviour used to control or dominate a partner, and it covers current or former intimate relationships. It is not one act of violence, and a court order barring contact is an AVO, not coercive control.",
      "clue": "Think about what the behaviour looks like over time."
    },
    "b": {
      "d": 3,
      "q": "Dev has an ADVO against him that bars him from contacting his former partner Mia. He sends her several messages. What is the legal position?",
      "opts": [
        "He has breached the order, which is a criminal offence",
        "He has committed no offence, as an ADVO is only civil",
        "He has breached the order, but only a civil penalty applies",
        "He has committed no offence unless Mia is physically hurt"
      ],
      "why": "Breaching the conditions of an AVO is a criminal offence, so contacting Mia can lead to a charge. The tempting idea that an order is only civil is wrong, because the order itself is not a charge but breaking it is a crime.",
      "clue": "What happens when the conditions of the order are ignored?"
    }
  },
  "leg-surrogacy-birth-technologies": {
    "title": "Surrogacy and birth technologies",
    "card": [
      [
        "Surrogacy",
        "A woman agrees to carry and give birth to a child for another person or couple, who intend to raise the child. The people who will raise the child are called the intended parents."
      ],
      [
        "Altruistic",
        "The surrogate is not paid for carrying the child. Her reasonable medical and related costs may be covered. This kind of surrogacy is legal in NSW."
      ],
      [
        "Commercial",
        "The surrogate is paid for carrying the child, beyond her reasonable costs. Under NSW law, this is a crime."
      ],
      "Birth technologies, such as IVF, have outpaced the law. The law is still working out the rights of everyone involved: the child, the surrogate and the intended parents."
    ],
    "remember": "NSW allows unpaid surrogacy and makes paid surrogacy a crime, while the law on everyone's rights is still developing.",
    "a": {
      "q": "Priya agrees to carry a child for her cousin and his partner. She is paid only for her reasonable medical costs. How does NSW law treat this?",
      "opts": [
        "It is legal altruistic surrogacy",
        "It is a crime because money was involved",
        "It is illegal because the parties are related",
        "It is legal only if she is paid a fee"
      ],
      "why": "Priya receives no payment beyond reasonable costs, so this is altruistic surrogacy, which is legal in NSW. Covering costs is not the same as being paid for carrying the child, so the option about money is wrong.",
      "clue": "Look at what kind of payment she receives."
    },
    "b": {
      "d": 3,
      "q": "Dan and Lee, a couple in Newcastle, offer a woman a large fee to carry their child, and she agrees. Which statement best describes the law in NSW?",
      "opts": [
        "The arrangement is paid surrogacy, which is a crime",
        "The arrangement is altruistic, so it is legal",
        "The arrangement is legal because both parties agreed",
        "The law has settled every right of the child already"
      ],
      "why": "A fee beyond reasonable costs makes this paid surrogacy, which is a crime in NSW. Agreement between the parties does not make it legal. The law on the rights of everyone involved is still developing, so the option saying the law has settled every right of the child is also wrong.",
      "clue": "Consent does not decide whether a payment is lawful."
    }
  },
  "leg-environment-as-global-issue": {
    "title": "The environment as a global issue",
    "card": [
      "Some environmental harm does not stop at a border. Air, oceans, rivers and wildlife move across the lines between countries.",
      [
        "Pollution",
        "Harmful substances released in one country can spread to others. Smoke can travel through the air, and waste can be carried by ocean currents."
      ],
      [
        "Climate change",
        "Greenhouse gases mix through the whole atmosphere. Where they are released does not decide where the warming is felt."
      ],
      [
        "Loss of species",
        "Migratory animals, such as some birds and whales, travel across many countries and oceans. Harm to their habitat in one place can reduce their numbers everywhere."
      ]
    ],
    "remember": "Environmental harm can cross borders, so one country often cannot fix it alone.",
    "a": {
      "q": "Why is climate change described as a global issue?",
      "opts": [
        "Greenhouse gases mix in the air and affect many countries",
        "It is caused only by countries with the largest populations",
        "One country can stop it if that country acts strongly enough",
        "It affects only the countries that release greenhouse gases"
      ],
      "why": "Greenhouse gases spread through the whole atmosphere, so the effects are not limited to where they are released. The option saying only the releasing countries are affected is tempting, but it is wrong because the warming is shared.",
      "clue": "Think about where released gases end up."
    },
    "b": {
      "d": 3,
      "q": "A mining company in Country X dumps waste into a river that flows into Country Y. Country Y bans dumping within its own borders, but the harm goes on. What does this case best show?",
      "opts": [
        "Harm from one country can reach another beyond its control",
        "Pollution harms only the country where it is released",
        "A ban inside one country can stop harm from upstream",
        "Rivers can spread harm, but air and oceans keep it local"
      ],
      "why": "The waste enters the river in Country X, so Country Y's ban does not reach the source, and the harm still flows across the border. The option about a ban stopping upstream harm is tempting, but the case shows the opposite: one country acting alone often cannot solve a problem that starts elsewhere.",
      "clue": "Can Country Y's ban reach where the waste enters the river?"
    }
  },
  "leg-international-environmental-agreements": {
    "title": "International environmental agreements",
    "card": [
      "An international environmental agreement is a treaty between countries. It sets shared goals for a problem that crosses borders.",
      [
        "Paris Agreement",
        "a treaty on climate change. Each country sets its own targets to cut greenhouse gas emissions and reports on its progress."
      ],
      [
        "Convention on Biological Diversity",
        "a treaty to protect the variety of living things, use biological resources sustainably and share their benefits fairly."
      ],
      "A country is bound only if it chooses to join the treaty. Most treaties have no world police force, so they rely on countries keeping their own promises. Pressure from other countries and public reporting can encourage compliance."
    ],
    "remember": "Environmental treaties set shared goals, but they mostly depend on each country keeping its word.",
    "a": {
      "q": "Why do most international environmental agreements depend on countries keeping their own promises?",
      "opts": [
        "There is no world police force to make countries comply",
        "Treaties are not binding on any country that joins them",
        "Each treaty is enforced by the courts of one country",
        "Treaties only cover problems inside a single country"
      ],
      "why": "Most treaties have no global body that can force countries to act, so they rely on each country to follow through. The option saying treaties never bind is wrong: a country that joins takes on the commitment, but nothing forces it to keep it.",
      "clue": "Think about who could force a country to act."
    },
    "b": {
      "d": 3,
      "q": "Country X joins the Paris Agreement and sets its own target to cut emissions. Years later it is well short of that target. What best describes the agreement's position?",
      "opts": [
        "It relies on pressure and reporting, not direct enforcement",
        "It lets a world court seize the country's factories",
        "It automatically cancels the country's membership",
        "It sets the same fixed target for every country"
      ],
      "why": "The Paris Agreement relies on countries setting their own targets and reporting progress, so the main tools are pressure and public reporting. The option about a fixed target for all countries is tempting but wrong, because each country sets its own.",
      "clue": "Recall who sets the targets and what happens to a country that falls short."
    }
  },
  "leg-principles-environmental-law": {
    "title": "Principles of environmental law",
    "card": [
      [
        "ESD",
        "ecologically sustainable development means development that meets people's needs now while protecting the environment it depends on. It is the overall aim, and it is made up of several principles."
      ],
      [
        "Precautionary principle",
        "if an action could cause serious or irreversible harm, a lack of full scientific proof is not a reason to delay steps to prevent that harm."
      ],
      [
        "Intergenerational equity",
        "the present generation should keep the environment healthy, diverse and productive, so future generations have the same chance to benefit from it."
      ],
      "Australian laws, such as the Environment Protection and Biodiversity Conservation Act 1999, list both of these as principles of ESD. They guide how laws are written and decisions are made."
    ],
    "remember": "ESD is the big aim. Precaution and fairness to future generations are two of the parts that build it.",
    "a": {
      "q": "How do the precautionary principle and intergenerational equity relate to ESD in Australian law?",
      "opts": [
        "They are principles that make up ESD",
        "They are separate goals that compete with ESD",
        "They replace ESD when the science is uncertain",
        "They apply only to decisions where ESD does not"
      ],
      "why": "Australian law lists both as principles of ESD, so they are parts of the overall aim. They do not compete with ESD or replace it, because they are how ESD is put into practice.",
      "clue": "Think about how the law lists them."
    },
    "b": {
      "d": 3,
      "q": "A company says its chemical plant should be approved, as no study proves it will poison a nearby wetland. Experts warn the harm could be serious and lasting. Under the precautionary principle, how should the lack of proof be treated?",
      "opts": [
        "It is no reason to delay steps to prevent the harm",
        "It is a reason to approve the plant without conditions",
        "It means harm should be ignored until it is proven",
        "It matters only if future generations are affected"
      ],
      "why": "The precautionary principle says that when harm could be serious or irreversible, missing proof is not a reason to delay preventing it. Approving the plant because nothing is proven is the tempting answer, but it treats doubt as a green light, which is the reverse of the principle.",
      "clue": "Does the principle wait for certainty before acting?"
    }
  },
  "leg-australian-environmental-law": {
    "title": "Australian environmental law",
    "card": [
      "The Environment Protection and Biodiversity Conservation Act 1999 (Cth), called the EPBC Act, is the Commonwealth's main environmental law. It was passed by the federal Parliament.",
      "The Act protects matters of national environmental significance. These include world heritage properties, national heritage places, wetlands of international importance, listed threatened species and ecological communities, and listed migratory species.",
      "A person who wants to take an action that is likely to have a significant impact on one of these matters must apply for approval from the federal Environment Minister.",
      "The Act is not a ban on all development. Approval can be refused or given with conditions. Places and species that are listed only under state or territory laws, and other local matters, are mainly dealt with by those laws."
    ],
    "remember": "The EPBC Act is the federal law that requires approval for actions likely to significantly affect matters of national environmental significance.",
    "a": {
      "q": "Which of these is protected under the EPBC Act as a matter of national environmental significance?",
      "opts": [
        "A wetland of international importance",
        "A wetland protected only by a state law",
        "A building on a state heritage register",
        "A creek that flows through one country town"
      ],
      "why": "Wetlands of international importance are on the Act's list of matters of national environmental significance. A wetland or building listed only under state law, or an ordinary local creek, is mainly dealt with by state and local laws, not the EPBC Act.",
      "clue": "Is it on the national list, or only a state or local one?"
    },
    "b": {
      "d": 3,
      "q": "A company plans a mine likely to significantly affect a listed threatened species. Under the EPBC Act, what must it do before it starts?",
      "opts": [
        "Apply for approval from the federal Environment Minister",
        "Wait until the species is removed from the threatened list",
        "Seek a permit only from the local council",
        "Prove the mine will have no effect on any living thing"
      ],
      "why": "An action likely to have a significant impact on a protected matter needs federal approval, and the Minister can refuse it or add conditions. The Act does not ban all development, so the company does not need to show there is no effect at all.",
      "clue": "The Act sets up an approval process, not a total ban."
    }
  },
  "leg-courts-ngos-protecting-environment": {
    "title": "Courts and NGOs in protecting the environment",
    "card": [
      "Courts hear environmental disputes and apply the law. The NSW Land and Environment Court is a specialist court that hears cases about planning, development and environmental offences.",
      "Courts can decide whether a decision or activity followed the law. They can enforce it: depending on the case, they can order a person or business to stop, to fix damage, or to pay a penalty.",
      "A non-government organisation (NGO) is a group that is independent of government. Environmental NGOs include groups such as Greenpeace and the Australian Conservation Foundation.",
      "NGOs campaign to change public opinion and laws. They can take legal action in court, and they monitor compliance by watching whether governments and businesses keep to the law and to their promises."
    ],
    "remember": "Courts apply and enforce environmental law. NGOs push for it, test it in court and check it is followed.",
    "a": {
      "q": "Each month, an environmental NGO reads a coal mine's water test results and compares them with the limits set in the mine's approval. What is the NGO mainly doing?",
      "opts": [
        "Monitoring compliance with the approval",
        "Taking legal action against the mine",
        "Campaigning to change the law",
        "Enforcing the approval conditions"
      ],
      "why": "Comparing results with the approval limits is watching whether the mine keeps to the law, which is monitoring compliance. Enforcing is tempting, but an NGO cannot order the mine to stop or pay a penalty: that power belongs to courts. No case has been filed and no campaign has begun.",
      "clue": "Has the NGO gone to court or to the public yet?"
    },
    "b": {
      "d": 3,
      "q": "Residents in Newcastle believe a council approved a development without following the planning law. A local environmental NGO files a case in the Land and Environment Court. Which statement best describes what is happening?",
      "opts": [
        "The NGO takes legal action and the court decides the case",
        "The NGO decides the case and the court campaigns",
        "The court takes legal action and the NGO decides the case",
        "The NGO and the court both make the law in this case"
      ],
      "why": "The NGO uses the court by starting legal action, and the court hears the dispute and decides whether the law was followed. The roles are not reversed: NGOs do not decide cases, and the court does not campaign.",
      "clue": "Who brings the case, and who judges it?"
    }
  },
  "leg-indigenous-peoples-under-international": {
    "title": "Indigenous peoples under international law",
    "card": [
      "The United Nations Declaration on the Rights of Indigenous Peoples (UNDRIP) was adopted by the UN General Assembly in 2007. It sets out the rights of Indigenous peoples around the world.",
      "Its rights include the right to practise and keep their culture, the right to their lands, territories and resources, and the right to self-determination.",
      "A declaration is a statement of agreed standards. It is not a treaty, so it does not bind states in the way a treaty does. Its force comes from the commitment states make to it.",
      "Australia did not support the Declaration in 2007. It endorsed it in 2009, which means it formally gave its support."
    ],
    "remember": "UNDRIP (2007) sets standards on culture, land and self-determination. Australia endorsed it in 2009.",
    "a": {
      "q": "Which of these is a right set out in the UN Declaration on the Rights of Indigenous Peoples?",
      "opts": [
        "The right of Indigenous peoples to their lands and culture",
        "The right of states to override Indigenous laws",
        "The right of Indigenous peoples to veto all national laws",
        "The duty of Indigenous peoples to adopt national culture"
      ],
      "why": "The Declaration sets out rights to culture, land and self-determination. It does not let states override Indigenous laws or give Indigenous peoples a veto over all national laws. It protects Indigenous culture, so it cannot require people to give it up for a national one.",
      "clue": "Think of the three areas of rights the Declaration covers."
    },
    "b": {
      "d": 3,
      "q": "A student says Australia is legally bound by the Declaration in the same way as by a treaty it has ratified. Which reply is most accurate?",
      "opts": [
        "The Declaration is a statement of standards, not a treaty",
        "The Declaration is a treaty, but Australia only endorsed it",
        "The Declaration became binding when Australia endorsed it",
        "The Declaration binds only states that voted against it"
      ],
      "why": "A declaration states agreed standards and is not a treaty, so it does not bind states in the way a treaty does. The idea that it became binding when Australia endorsed it is tempting but wrong: endorsing shows formal support, but it does not turn the Declaration into a treaty.",
      "clue": "Ask what kind of document a declaration is."
    }
  },
  "leg-self-determination": {
    "title": "Self-determination",
    "card": [
      "Self-determination is the right of a people to decide for themselves how they live and how they run their communities and lands.",
      "For Aboriginal and Torres Strait Islander peoples, it means holding the power to make decisions about their own lives, lands and communities.",
      "Being asked for views is not enough if someone else makes the final decision. Having Indigenous people carry out a program is also not enough if others decided what it would be.",
      "It can take many forms, such as Indigenous-run organisations that choose their own priorities and deliver services like health care or legal help."
    ],
    "remember": "Self-determination is about who holds the decision-making power, not who is consulted or who does the work.",
    "a": {
      "q": "Which of these is the clearest example of self-determination?",
      "opts": [
        "An Aboriginal-run legal service chooses its own priorities",
        "A department asks an Aboriginal group for its views first",
        "A government hires Aboriginal staff to run its own program",
        "A council informs elders of a plan it has already approved"
      ],
      "why": "Self-determination means Indigenous people hold the power to decide, and an organisation setting its own priorities does this. Asking for views is the most tempting wrong option, but the department still makes the decision.",
      "clue": "Look for who holds the final decision."
    },
    "b": {
      "d": 3,
      "q": "A state government wants to cut youth crime in a remote Aboriginal community. It holds a meeting, listens to views, then writes and runs the program itself. Why does this fall short of self-determination?",
      "opts": [
        "The government kept the power to make the final decisions",
        "The government aimed the program at young people only",
        "The government paid for the program from its own budget",
        "The government did not ask the community for its views"
      ],
      "why": "Self-determination depends on who decides. The government listened but still made the final decisions, so the community did not hold the power. The option saying the government did not ask for views is wrong, because it did hold a meeting and listen.",
      "clue": "Listening to people is different from letting them decide."
    }
  },
  "leg-land-rights-native-title": {
    "title": "Land rights and native title",
    "card": [
      [
        "Terra nullius",
        "A Latin term meaning land belonging to no one. Before 1992, Australian law treated the continent as terra nullius when Britain claimed it, so it ignored the rights of Aboriginal and Torres Strait Islander peoples."
      ],
      [
        "Native title",
        "The recognition in Australian law of rights and interests in land and waters that Indigenous peoples hold under their own laws and customs."
      ],
      [
        "Mabo",
        "Eddie Koiki Mabo and other Meriam people of the Murray Islands brought the case Mabo v Queensland (No 2). In 1992 the High Court rejected terra nullius and held that native title exists in Australian law."
      ],
      [
        "Native Title Act",
        "The Native Title Act 1993 (Cth) set out how native title is claimed and how claims are decided. It gave the common law decision a process in legislation."
      ]
    ],
    "remember": "Mabo recognised native title in law. The Native Title Act set out how to claim it.",
    "a": {
      "q": "What was the main effect of the High Court's decision in Mabo (1992)?",
      "opts": [
        "It recognised native title and rejected terra nullius",
        "It recognised terra nullius and ended native title claims",
        "It created a process for lodging native title claims",
        "It gave Indigenous peoples ownership of all Crown land"
      ],
      "why": "The High Court rejected terra nullius and held that native title exists in Australian law. Creating the claims process was the job of the Native Title Act 1993, which came after Mabo, so that option is wrong.",
      "clue": "Think about what the Court said about the idea of land belonging to no one."
    },
    "b": {
      "d": 3,
      "q": "A group of Aboriginal people in Western Australia wants their rights to their traditional land recognised. Which law sets out how they can make a native title claim?",
      "opts": [
        "The Native Title Act 1993",
        "The Mabo decision of 1992",
        "The doctrine of terra nullius",
        "The UN Declaration of 2007"
      ],
      "why": "The Native Title Act 1993 sets out how native title is claimed and how claims are decided. Mabo is the court decision that recognised native title, but it did not set out the claims process, so it is the tempting wrong answer.",
      "clue": "Recognising a right and setting out how to claim it are different steps."
    }
  },
  "leg-aboriginal-torres-strait-islander": {
    "title": "Indigenous peoples and the justice system",
    "card": [
      "Aboriginal and Torres Strait Islander people are imprisoned at far higher rates than other Australians. They are also a much larger share of prisoners than of the general population.",
      "The Royal Commission into Aboriginal Deaths in Custody (1987 to 1991) examined why so many Aboriginal people died in custody. Its 1991 report made 339 recommendations.",
      "The Royal Commission found that the main cause was not worse treatment inside prisons. It was that Aboriginal people were over-represented in custody in the first place, linked to disadvantage and past policies.",
      "Later reviews, such as the Australian Law Reform Commission's Pathways to Justice report (2017), looked again at the high rates. They urged measures such as diversion from custody and community-led programs."
    ],
    "remember": "The Royal Commission traced deaths in custody to over-representation. Later reviews urged diversion and community-led programs.",
    "a": {
      "q": "What did the Royal Commission into Aboriginal Deaths in Custody find about why so many Aboriginal people died in custody?",
      "opts": [
        "Aboriginal people were over-represented in custody",
        "Aboriginal people were treated worse than others in cells",
        "Aboriginal people were more often found guilty of murder",
        "Aboriginal people were held longer than the law allowed"
      ],
      "why": "The Royal Commission found that the deaths were linked to the number of Aboriginal people taken into custody, tied to disadvantage and past policies. Treatment inside cells is the tempting option, but the Commission did not find it to be the main cause.",
      "clue": "Recall what the Commission ruled out as the main cause."
    },
    "b": {
      "d": 3,
      "q": "A review in a state finds that Aboriginal people make up a small share of the population but a large share of its prisoners. Which response best matches the approach of the later reviews and inquiries?",
      "opts": [
        "Divert people from custody and fund community-led programs",
        "Build more prisons so that cells are less crowded",
        "Treat the gap as a problem inside prisons only",
        "Wait for the rates to fall as the population grows"
      ],
      "why": "The ALRC's Pathways to Justice report urged diversion from custody and community-led programs, which target the causes of high imprisonment. Focusing only on prison conditions is tempting, but the inquiries looked at why people end up in custody.",
      "clue": "The inquiries looked at why people end up in custody."
    }
  },
  "leg-effectiveness-law-indigenous-peoples": {
    "title": "Effectiveness of the law for Indigenous peoples",
    "card": [
      "To judge how effective a law is, ask whether it met its aims and whether it changed outcomes in people's lives. A law can succeed on one measure and fall short on another.",
      [
        "Achievements",
        "The law has made real gains, such as the legal recognition of native title and laws against racial discrimination, such as the Racial Discrimination Act 1975."
      ],
      [
        "Gaps",
        "Gaps remain in health, such as lower life expectancy, in justice outcomes such as imprisonment rates, and in recognition, as the Constitution does not recognise Indigenous peoples."
      ],
      "A balanced judgement names the gains, names the gaps, and weighs them together. One gain does not cancel out a gap, and a gap does not erase a gain."
    ],
    "remember": "Weigh what the law has achieved against the gaps that still remain.",
    "a": {
      "q": "Which statement gives the most balanced judgement of the law's effectiveness for Indigenous peoples?",
      "opts": [
        "Native title is a gain, but health and justice gaps remain",
        "Native title is a gain, so the other gaps no longer matter",
        "Health and justice gaps mean native title achieved nothing",
        "Gaps remain, so the law cannot be judged until they close"
      ],
      "why": "A balanced judgement weighs a real gain alongside the gaps that remain. The statement that native title means the other gaps no longer matter is tempting, but one gain does not cancel out a gap. Saying the gaps mean nothing was achieved makes the opposite mistake.",
      "clue": "Can a law succeed and fall short at the same time?"
    },
    "b": {
      "d": 3,
      "q": "A student argues that a law is ineffective because Indigenous imprisonment rates are still far higher than for other Australians. What is the best response?",
      "opts": [
        "The rates are a real gap, but gains must be weighed too",
        "The rates are not a fair measure of how a law is working",
        "The rates do not matter, as the law was passed by Parliament",
        "The rates are no problem, because native title is recognised"
      ],
      "why": "Imprisonment rates are a real outcome and a real gap, but a full judgement also weighs what the law has achieved. The answer that the rates are no problem because native title is recognised is tempting, but a gain in land rights does not cancel a gap in justice.",
      "clue": "A fair judgement uses more than one measure."
    }
  },
  "leg-shelter-as-right": {
    "title": "Shelter as a right",
    "card": [
      "International law treats adequate housing as a human right. The International Covenant on Economic, Social and Cultural Rights (ICESCR) recognises the right to an adequate standard of living, which includes housing.",
      "Adequate housing means more than a roof. It includes secure tenure, affordability, safe and liveable conditions, and access to services.",
      "Australia has ratified the ICESCR, so it has agreed to work towards this right. A treaty does not become part of Australian law until Parliament passes a law that includes it.",
      "Parliament has not passed a law that gives people a right to housing, and the Australian Constitution does not protect one. A person cannot go to court and claim a home as a legal right."
    ],
    "remember": "Housing is a right in international law, but Australian law does not give a right to a home.",
    "a": {
      "q": "Which statement best describes the right to housing in Australia?",
      "opts": [
        "It is set out in a treaty but not in Australian law",
        "It is protected by the Australian Constitution",
        "Australian courts can enforce it as a legal right",
        "It is not recognised in international law"
      ],
      "why": "Australia has ratified the ICESCR, but Parliament has not passed a law giving a right to housing. The Constitution option is wrong because it does not protect this right.",
      "clue": "Think about what must happen before a treaty becomes Australian law."
    },
    "b": {
      "d": 3,
      "q": "Sam has been on a waiting list for housing in Sydney for years. He says Australia has ratified a treaty on housing, so a court must give him a home. Why is he wrong?",
      "opts": [
        "Parliament has not made a law giving a right to housing",
        "Australia has not signed any treaty that mentions housing",
        "A treaty only applies to people who own their own homes",
        "Courts can only order housing for people who rent"
      ],
      "why": "A ratified treaty does not become Australian law until Parliament passes a law that includes it. No such law gives a right to housing, so a court has nothing to enforce. Saying Australia has not signed a treaty is wrong, because it has ratified the ICESCR.",
      "clue": "Ratifying a treaty is not the same as making it law."
    }
  },
  "leg-renting": {
    "title": "Renting",
    "card": [
      "In NSW, the Residential Tenancies Act 2010 sets out the rights and duties of landlords and tenants. A written agreement between them is called a residential tenancy agreement.",
      [
        "Bond",
        "Money a tenant pays at the start as security. In NSW it is held by a government body, not by the landlord, and it can be used to cover unpaid rent or damage beyond fair wear and tear."
      ],
      [
        "Repairs",
        "The landlord must keep the home in a reasonable state of repair and fit to live in. The tenant must keep it reasonably clean and not damage it."
      ],
      [
        "Notice",
        "A landlord cannot simply make a tenant leave. The Act sets minimum notice periods, and if a tenant stays on after a valid notice, the landlord must apply to the NSW Civil and Administrative Tribunal (NCAT) for an order."
      ]
    ],
    "remember": "The Act gives landlords and tenants each duties, and disputes are settled by rules, not by force.",
    "a": {
      "q": "Which statement about a rental bond in NSW is correct?",
      "opts": [
        "Security money held by a government body during the tenancy",
        "Security money kept by the landlord to spend as they like",
        "A non-refundable fee paid to the landlord to start the lease",
        "The first month of rent, paid in advance to the landlord"
      ],
      "why": "The bond is security for the landlord's losses, such as unpaid rent or damage, and a government body holds it. The tempting option that the landlord keeps it is wrong because the Act keeps the money out of the landlord's hands.",
      "clue": "Who holds the money while the tenancy lasts?"
    },
    "b": {
      "d": 3,
      "q": "Tariq rents a unit in Parramatta. The oven stops working because it is old, and he did not misuse it. His landlord refuses to fix it and tells Tariq to leave. What is the correct legal position?",
      "opts": [
        "The landlord must repair it and cannot just make him leave",
        "The landlord need not repair it, but must give notice",
        "Tariq must pay for the repair because he uses the oven",
        "Tariq may leave at once and the landlord keeps the bond"
      ],
      "why": "The landlord has a duty to keep the home in a reasonable state of repair, and a worn oven is not the tenant's fault. A landlord cannot make a tenant leave without following the notice rules, so telling him to go does not end the tenancy. The option that only mentions notice is wrong because the repair duty still applies.",
      "clue": "Who owes the duty to repair, and does a landlord's say-so end a tenancy?"
    }
  },
  "leg-buying-home": {
    "title": "Buying a home",
    "card": [
      "Most people cannot pay for a home in cash, so they borrow from a lender such as a bank. The money borrowed is called the loan, and it is repaid over many years with interest.",
      [
        "Mortgage",
        "a legal agreement in which the home is the lender's security for the loan. The borrower owns the home but the lender has a claim over it until the loan is repaid."
      ],
      [
        "Default",
        "failing to make the repayments as agreed. The mortgage then lets the lender take steps to sell the home to recover the money owed."
      ],
      "The buyer must pay the loan, interest and other costs of buying. Once the loan is fully repaid, the lender's claim over the home ends."
    ],
    "remember": "A mortgage gives the lender security over the home, so it can sell if repayments stop.",
    "a": {
      "q": "What does a mortgage allow a lender to do if the borrower defaults?",
      "opts": [
        "Sell the home to recover the money owed",
        "Keep the home and cancel the borrower's debt",
        "Raise the loan amount without agreement",
        "Move into the home as the new owner"
      ],
      "why": "The home is the lender's security, so the lender can sell it to recover the debt. A lender selling the home is not the same as taking it and cancelling the debt: the aim is to recover what is owed.",
      "clue": "Think about what security means for a lender."
    },
    "b": {
      "d": 2,
      "q": "Priya borrowed from a bank to buy a unit in Parramatta. She then lost her job and missed many repayments. What can the bank do under the mortgage?",
      "opts": [
        "Sell the unit to recover the money owed",
        "Cancel the loan and let Priya keep the unit",
        "Make Priya's employer pay the loan",
        "Take over the unit without selling it"
      ],
      "why": "Missing repayments is a default, so the lender can take steps to sell the home to recover the debt. Losing a job does not cancel the loan, and the mortgage does not make anyone else responsible for it.",
      "clue": "What claim does the lender hold over the home?"
    }
  },
  "leg-strata-community-living": {
    "title": "Strata and community living",
    "card": [
      "In a strata scheme, each person owns their own unit (a lot). They also share ownership of the common property, such as lifts, stairs, gardens and the roof.",
      [
        "Owners corporation",
        "the body made up of all the lot owners. It manages and maintains the common property and makes decisions for the scheme."
      ],
      [
        "By-laws",
        "the rules for the scheme, made by the owners corporation, such as limits on noise or parking. They bind owners and occupiers, including tenants."
      ],
      "Strata law in NSW, including the Strata Schemes Management Act 2015 (NSW), sets out how schemes run. Owners usually pay levies to cover the costs of common property."
    ],
    "remember": "Own your lot, share the common property, and follow the by-laws the owners corporation makes within strata law.",
    "a": {
      "q": "In a NSW strata scheme, who is responsible for managing and maintaining the common property?",
      "opts": ["The owners corporation", "Each tenant in the building", "The local council", "The owner of the top floor lot"],
      "why": "The owners corporation is made up of all lot owners and manages the common property for the whole scheme. Tenants are tempting, but they do not own lots and so are not part of the owners corporation.",
      "clue": "The common property is owned by more than one person."
    },
    "b": {
      "d": 3,
      "q": "Priya rents a unit in a NSW strata building. A by-law bans loud music after 10 pm. Priya's lease says nothing about noise. Can the by-law apply to her?",
      "opts": [
        "Yes, by-laws bind tenants as well as owners",
        "No, by-laws bind only the owners of lots",
        "No, because her lease does not mention noise",
        "Yes, but only if the council approves the by-law"
      ],
      "why": "By-laws bind owners and occupiers, including tenants, so the noise by-law can apply to Priya. It does not matter that the lease is silent, because the by-laws are a separate set of rules for the scheme.",
      "clue": "Check who the by-laws bind besides owners."
    }
  },
  "leg-homelessness-public-housing": {
    "title": "Homelessness and public housing",
    "card": [
      "Homelessness means a person has no suitable place to live. The Australian Bureau of Statistics counts people sleeping rough, in crisis accommodation, couch surfing with others, and in severely crowded dwellings.",
      [
        "Public housing",
        "homes owned and managed by a state government and rented to people on low incomes, usually at a rent set as a share of the tenant's income."
      ],
      [
        "Social housing",
        "a wider term for housing for people on low incomes. It covers public housing and also homes run by community housing providers, which are not-for-profit organisations."
      ],
      "Demand is greater than supply, so waiting lists are long and many people wait for years. Homelessness has been rising, and it shows that housing support does not reach everyone who needs it."
    ],
    "remember": "Governments supply public and social housing for people on low incomes, but supply falls short of need.",
    "a": {
      "q": "Which of these is an example of social housing that is not public housing?",
      "opts": [
        "A home run by a not-for-profit community housing provider",
        "A home bought by a family with a mortgage",
        "A flat rented from a private landlord at market rent",
        "A unit in a strata scheme owned by its occupant"
      ],
      "why": "Social housing includes homes run by community housing providers, not only those run by a state government. A privately rented flat is not social housing, because the landlord is a private owner who charges market rent.",
      "clue": "Think about who owns and runs the home, and why."
    },
    "b": {
      "d": 3,
      "q": "Jess is on a low income in Newcastle and has waited four years for a public housing home. What does her situation best show?",
      "opts": [
        "Demand for public housing is greater than the supply",
        "Supply of public housing is greater than the demand",
        "Public housing is not meant for people on low incomes",
        "Community housing providers cannot rent to low earners"
      ],
      "why": "Jess is on a low income, so she is the kind of person public housing is for. A wait of years means there are more eligible people than homes. If supply were greater than demand, eligible people would be housed quickly, so the reversed option is wrong.",
      "clue": "Is Jess eligible, and if so, why is she still waiting?"
    }
  },
  "leg-fair-work-act-2009": {
    "title": "The Fair Work Act 2009",
    "card": [
      "The Fair Work Act 2009 (Cth) is the main law for workplaces in Australia. It covers most private sector employees and employers across the country.",
      "It sets the National Employment Standards (NES), a set of minimum entitlements for the employees it covers. Some, such as paid annual leave, do not apply to casual employees.",
      "The NES include annual leave, personal/carer's leave, parental leave and a maximum of 38 ordinary weekly hours for a full-time employee. Extra hours must be reasonable.",
      "An employment contract, award or agreement cannot give an employee less than the NES. It can give more."
    ],
    "remember": "The NES are a floor: a contract can add to them but cannot take them away.",
    "a": {
      "q": "Zane starts a full-time job. His contract says he gets no annual leave. What is the legal effect of this term?",
      "opts": [
        "It cannot override his NES leave entitlement",
        "It is valid because Zane signed the contract",
        "It is valid if his employer pays a higher wage",
        "It applies only until his probation period ends"
      ],
      "why": "Zane is full-time, so the NES give him annual leave, and a contract cannot give less than the NES. Signing the contract does not remove that minimum, so the term has no effect on his right to annual leave.",
      "clue": "Can a contract give less than the NES?"
    },
    "b": {
      "d": 3,
      "q": "Priya's employer in Newcastle offers her a contract with more annual leave than the NES requires. Which statement about this is correct?",
      "opts": [
        "It is lawful, because the NES set only a minimum",
        "It is unlawful, because the NES set a fixed amount",
        "It is lawful only if the Fair Work Commission approves",
        "It is unlawful, because it treats other staff unequally"
      ],
      "why": "The NES are a floor, not a ceiling, so an employer can give more than they require. The tempting idea that the NES fix the amount is wrong, because the Act only stops terms that give less.",
      "clue": "Think about whether the NES are a minimum or a fixed amount."
    }
  },
  "leg-awards-enterprise-agreements": {
    "title": "Awards and enterprise agreements",
    "card": [
      [
        "Modern award",
        "a legal document that sets minimum pay and conditions for workers in a particular industry or occupation, such as retail or hospitality."
      ],
      [
        "Enterprise agreement",
        "a set of pay and conditions negotiated by an employer and its employees at one workplace or business. It is approved by the Fair Work Commission."
      ],
      "An enterprise agreement must pass the better off overall test. Taken as a whole, each worker must be better off than under the award that would otherwise cover them.",
      "An agreement can trade one entitlement for another, such as flexible hours for a different loading. It cannot leave workers worse off overall."
    ],
    "remember": "An award is the industry minimum. An agreement is made at one workplace and must beat that minimum overall.",
    "a": {
      "q": "What is the main difference between a modern award and an enterprise agreement?",
      "opts": [
        "An award covers an industry, an agreement one workplace",
        "An award covers one workplace, an agreement an industry",
        "An award is negotiated by staff, an agreement is set by law",
        "An award binds employers, an agreement binds workers"
      ],
      "why": "A modern award sets minimum pay and conditions across an industry. An enterprise agreement is negotiated by the employer and employees at one workplace. The reversed option is tempting, but it swaps the two.",
      "clue": "Think about how many workplaces each one covers."
    },
    "b": {
      "d": 3,
      "q": "Kiran's café group in Newcastle offers staff an enterprise agreement. It gives higher base pay but lower weekend loadings than the award. Which test decides if the agreement can be approved?",
      "opts": [
        "Whether the package as a whole beats the award",
        "Whether each condition on its own beats the award",
        "Whether most of the owners agree to the package",
        "Whether its pay beats that of rival cafés nearby"
      ],
      "why": "The better off overall test looks at the whole package, not each item. Lower loadings can be made up for by higher base pay. Requiring each condition to beat the award is tempting, but the test does not demand it.",
      "clue": "Can a loss in one area be made up by a gain in another?"
    }
  },
  "leg-work-health-safety": {
    "title": "Work health and safety",
    "card": [
      "In NSW, the Work Health and Safety Act 2011 (NSW) requires a person who runs a business to keep workers safe at work, as far as is reasonably practicable. This is called a duty of care.",
      "The duty covers more than injuries from machines. It includes a safe workplace, safe equipment, safe work systems, and training and supervision.",
      "Workers also have duties. They must take reasonable care for their own safety and must not put others at risk.",
      "SafeWork NSW is the regulator that enforces the Act. It can inspect workplaces, issue notices requiring problems to be fixed, and prosecute those who break the law."
    ],
    "remember": "Employers must keep workers safe as far as is reasonably practicable, and SafeWork NSW enforces the Act.",
    "a": {
      "q": "An inspector visits a Newcastle building site, finds unsafe scaffolding and issues a notice to fix it. Which body sent the inspector?",
      "opts": [
        "SafeWork NSW",
        "The Fair Work Commission",
        "The Fair Work Ombudsman",
        "The NSW Civil and Administrative Tribunal"
      ],
      "why": "SafeWork NSW is the regulator that enforces the Work Health and Safety Act, and it can inspect workplaces and issue notices. The Fair Work Commission is tempting because it deals with workplace matters, but it is not the regulator for safety.",
      "clue": "Which body enforces the safety law?"
    },
    "b": {
      "d": 2,
      "q": "Tane runs a warehouse in Parramatta. A forklift has a broken brake, and he lets staff keep using it. Which duty has Tane most clearly failed to meet?",
      "opts": [
        "His duty to provide safe equipment for workers",
        "His duty to pay workers the award rate",
        "His duty to avoid discrimination in hiring",
        "His duty to keep workers' records private"
      ],
      "why": "A faulty forklift is unsafe equipment, and providing safe equipment is part of the employer's duty of care under the Act. Pay is a different workplace issue and is not what this case is about.",
      "clue": "Think about what is wrong with the forklift."
    }
  },
  "leg-discrimination-harassment-at-work": {
    "title": "Discrimination and harassment at work",
    "card": [
      [
        "Discrimination",
        "treating a worker or job applicant unfairly because of a personal attribute, such as sex, race, age or disability. Other attributes include pregnancy and marital status."
      ],
      [
        "Sexual harassment",
        "unwelcome sexual behaviour where a reasonable person would anticipate the possibility that the person would be offended, humiliated or intimidated. One incident can be enough, and intent does not matter."
      ],
      [
        "The laws",
        "Federal laws, such as the Sex Discrimination Act 1984 (Cth) and the Racial Discrimination Act 1975 (Cth), apply to workplaces. The Anti-Discrimination Act 1977 (NSW) also covers NSW workplaces."
      ],
      [
        "Employer duty",
        "An employer can be held responsible for the conduct of staff at work. Taking reasonable steps to prevent it, such as training and a complaints process, matters."
      ]
    ],
    "remember": "Discrimination turns on the reason for the treatment. Sexual harassment turns on what a reasonable person would anticipate, not on intent.",
    "a": {
      "q": "Which situation is an example of unlawful discrimination at work?",
      "opts": [
        "A firm refuses to hire a woman because she is pregnant",
        "A firm refuses to hire a person with no relevant skills",
        "A firm hires the applicant who interviewed best",
        "A firm pays a worker more because of longer experience"
      ],
      "why": "Pregnancy is a protected attribute, so refusing to hire for that reason is unfair treatment. The option about no relevant skills is tempting, but it rests on ability, not a personal attribute.",
      "clue": "Look for a decision based on a personal attribute, not on skills or merit."
    },
    "b": {
      "d": 3,
      "q": "Dev's manager keeps making sexual jokes at him after Dev asks him to stop. The manager says he meant it as a laugh. Why can this still be sexual harassment?",
      "opts": [
        "Unwelcome, and a reasonable person would anticipate offence",
        "The manager holds a more senior position than Dev at work",
        "The jokes were repeated many times over the same week",
        "The manager really meant the jokes to hurt and upset Dev"
      ],
      "why": "Sexual harassment depends on the behaviour being unwelcome and on whether a reasonable person would anticipate the possibility of offence, humiliation or intimidation. Intent is tempting because the manager claims it was a joke, but intent does not matter. Repetition is not needed either, as one incident can be enough.",
      "clue": "Does the law ask what the harasser meant, or how a reasonable person would see it?"
    }
  },
  "leg-unfair-dismissal": {
    "title": "Unfair dismissal",
    "card": [
      "Dismissal is when an employer ends a worker's job. An employer can lawfully dismiss a worker, but the dismissal must not be harsh, unjust or unreasonable.",
      "A worker who thinks they were dismissed unfairly can apply to the Fair Work Commission. The Commission is the national workplace tribunal under the Fair Work Act 2009.",
      "The Commission looks at whether there was a valid reason, such as poor conduct or performance. It also looks at whether the worker was told the reason and given a chance to respond.",
      "If the claim succeeds, the Commission can order reinstatement, which returns the worker to their job. It can order compensation, which is money paid to the worker, if reinstatement is not suitable."
    ],
    "remember": "An unfair sacking can be challenged at the Fair Work Commission, which may order reinstatement or compensation.",
    "a": {
      "q": "Which action is open to a worker who believes they were sacked in a harsh, unjust or unreasonable way?",
      "opts": [
        "Apply to the Fair Work Commission for a remedy",
        "Apply to SafeWork NSW for a safety order",
        "Ask the employer's customers to hold a vote",
        "Sign a new enterprise agreement with the employer"
      ],
      "why": "The Fair Work Commission hears unfair dismissal claims and can order a remedy. SafeWork NSW is tempting, but it deals with workplace safety and not with dismissals.",
      "clue": "Which body hears claims about sackings?"
    },
    "b": {
      "d": 3,
      "q": "Dev is sacked from a bakery in Orange after a customer complaint. His manager never told him about the complaint and gave him no chance to respond. Dev applies to the Fair Work Commission. Which factor most supports his claim that the dismissal was unfair?",
      "opts": [
        "He was not given a chance to respond to the reason",
        "He was sacked for a reason his employer disliked",
        "He had worked at the bakery for many years",
        "He was paid the same wage as other bakers"
      ],
      "why": "The Commission considers whether the worker was given a chance to respond to the reason for dismissal. Being sacked after a complaint does not make a dismissal unfair, because a dismissal can be lawful if it follows a fair process and a valid reason.",
      "clue": "Think about the process the employer followed, not only the reason."
    }
  },
  "leg-world-order-means": {
    "title": "What world order means",
    "card": [
      "World order is the set of rules, institutions and relationships that help keep peace and security between countries.",
      ["Rules", "agreed standards of behaviour for states, such as treaties and international law."],
      ["Institutions", "organisations that states set up to work together, such as the United Nations."],
      [
        "Relationships",
        "the alliances, trade links and diplomacy that connect countries and give them reasons to cooperate."
      ]
    ],
    "remember": "Countries keep the peace through shared rules, joint organisations and ties with each other.",
    "a": {
      "q": "Which statement best describes world order?",
      "opts": [
        "Rules, institutions and relationships that keep peace",
        "A single world government that makes laws for every country",
        "The military power held by the largest country in the world",
        "The laws that each country makes to govern its own people"
      ],
      "why": "World order is the combination of rules, institutions and relationships that help keep peace and security between countries. The option about one world government is tempting, but world order does not need a single government, as states work through shared rules and organisations.",
      "clue": "Think of what links countries, not what rules inside one country."
    },
    "b": {
      "d": 2,
      "q": "Two neighbouring countries sign a border treaty. They agree that an international organisation set up by many states will hear any future dispute. Which part of world order is the international organisation?",
      "opts": ["Institutions", "Rules", "Relationships", "Domestic law"],
      "why": "The organisation is a body that states set up to work together, so it is an institution. Rules is tempting because the treaty and the agreement are rules, but the question asks about the organisation itself, not the agreement to use it.",
      "clue": "Focus on the body itself, not the promise to use it."
    }
  },
  "leg-united-nations-security-council": {
    "title": "The UN and the Security Council",
    "card": [
      "The United Nations (UN) is an organisation of states formed after World War II. Its Charter is its founding treaty.",
      "The Charter bans states from using force against other states. There are two exceptions: self-defence, and force authorised by the Security Council.",
      "The Security Council has 15 members. Five are permanent: China, France, Russia, the United Kingdom and the United States.",
      "Each permanent member can veto a decision. A veto by any one of the five blocks a decision, even if other members vote for it."
    ],
    "remember": "Force is banned unless it is self-defence or the Security Council authorises it, and any permanent member can veto.",
    "a": {
      "q": "Under the UN Charter, when may a state lawfully use force against another state?",
      "opts": [
        "In self-defence, or when the Security Council authorises it",
        "When its own government decides the other state is a threat",
        "When most UN member states say they support the action",
        "When it has the support of at least one permanent member"
      ],
      "why": "The Charter allows only two exceptions: self-defence and Security Council authorisation. Support from one permanent member is not enough, because the Council as a whole must authorise the force, without any permanent member vetoing it.",
      "clue": "The Charter names two exceptions only."
    },
    "b": {
      "d": 3,
      "q": "A Security Council resolution to authorise force is backed by 14 of the 15 members. One permanent member votes against it. What is the result?",
      "opts": [
        "The resolution is blocked by the veto",
        "The resolution passes, as 14 is a large majority",
        "The resolution passes, but only for a limited time",
        "The resolution goes to the other four permanent members"
      ],
      "why": "A veto from any one permanent member blocks a decision, even if all other members vote for it. The size of the majority does not matter, so the tempting answer that 14 votes is enough is wrong.",
      "clue": "Think about what a permanent member's veto can do."
    }
  },
  "leg-peacekeeping": {
    "title": "Peacekeeping",
    "card": [
      "UN peacekeeping sends international personnel, such as soldiers, police and civilian staff, to help keep peace in places affected by conflict. Missions are usually set up by the Security Council.",
      "Peacekeepers normally work with the consent of the parties to the conflict. They are there to support a peace, not to fight one side or help one side win.",
      "Peacekeepers may use force in self-defence and, under some missions, to protect civilians. Their tasks can include monitoring ceasefires, protecting civilians, helping with elections and supporting local police and government.",
      "Timor-Leste is an example. After the 1999 violence around its vote on independence, UN missions helped keep order and rebuild the country. Australia took a large part in these efforts."
    ],
    "remember": "Peacekeepers usually work with consent and support a peace without taking sides. They may use force, such as in self-defence.",
    "a": {
      "q": "Which statement best describes how UN peacekeepers usually work?",
      "opts": [
        "With consent, supporting peace without taking a side",
        "Without consent, defeating the side that broke the peace",
        "With consent, but never using force, even in self-defence",
        "Without consent, judging which side was in the right"
      ],
      "why": "Peacekeepers normally have the parties' consent and support a peace without taking sides. The tempting option about never using force is wrong, because peacekeepers may use force in self-defence and sometimes to protect civilians.",
      "clue": "Think about consent, sides and when force may be used."
    },
    "b": {
      "d": 3,
      "q": "After a ceasefire between two armed groups in a fictional country, Varnia, the Security Council sets up a mission. Which task fits UN peacekeeping best?",
      "opts": [
        "Monitoring the ceasefire and helping protect civilians",
        "Fighting one group to force it to give up its weapons",
        "Helping the stronger group win the coming election",
        "Arming one group so it can defend its own territory"
      ],
      "why": "Monitoring a ceasefire and protecting civilians are tasks peacekeepers can carry out while staying impartial. Arming one group may sound defensive, but it still helps one side, which goes against supporting a peace without taking sides.",
      "clue": "Which task supports the peace without favouring either group?"
    }
  },
  "leg-international-humanitarian-law": {
    "title": "International humanitarian law",
    "card": [
      "International humanitarian law (IHL) is the set of rules for how armed conflict is fought. It aims to limit suffering.",
      "The four Geneva Conventions of 1949 are its core. They protect people who are not fighting or can no longer fight: civilians, prisoners of war, and the wounded and sick.",
      "These people must be treated humanely. Civilians must not be deliberately attacked, and prisoners of war must not be tortured. Wounded enemy fighters must be cared for.",
      "IHL binds all sides, whoever started the war and whether or not the war was lawful. A side cannot ignore the rules because its enemy does. Serious breaches can be war crimes."
    ],
    "remember": "IHL protects people who are not fighting, and it binds every side in a conflict.",
    "a": {
      "q": "A state starts a war that many countries call unlawful. Do the Geneva rules still bind its army?",
      "opts": [
        "Yes, the rules apply to every side in the conflict",
        "No, only the side that acted lawfully must follow them",
        "No, the rules apply only after the war has ended",
        "Yes, but only for how it treats enemy soldiers"
      ],
      "why": "IHL governs how fighting is conducted, and it applies to all sides whether or not the war was lawful. The idea that only the lawful side is bound is tempting, but it would let the protections depend on who started the war.",
      "clue": "IHL does not depend on who started the war."
    },
    "b": {
      "d": 3,
      "q": "An army finds an enemy soldier, badly wounded and no longer fighting. Its commander learns the enemy has ignored the rules. What must the army do?",
      "opts": [
        "Give him medical care, as he is no longer fighting",
        "Refuse care, as the enemy has ignored the rules",
        "Give care only if the enemy starts following the rules",
        "Give care only if he agrees to share information"
      ],
      "why": "A wounded soldier who is no longer fighting is protected, and he must be cared for. The protection does not depend on the enemy's conduct, so waiting for the enemy to follow the rules is wrong, even though it can seem fair.",
      "clue": "A side cannot ignore the rules because its enemy does."
    }
  },
  "leg-responsibility-protect": {
    "title": "The responsibility to protect",
    "card": [
      "The responsibility to protect (R2P) is the idea that each state has the first duty to protect its own people from mass atrocities. These are genocide, war crimes, ethnic cleansing and crimes against humanity.",
      "The international community should help states meet this duty. This can include support, diplomacy and other peaceful steps.",
      "If peaceful steps fail and a state clearly fails to protect its people, the international community may take stronger action. Any use of force must be authorised by the UN Security Council.",
      "R2P changes the question from a state's right to be left alone to the protection of people. World leaders accepted it at the UN in 2005. It is a principle, not a treaty."
    ],
    "remember": "The state protects its people first. Others should help, and any force needs Security Council approval.",
    "a": {
      "q": "Under R2P, who has the first duty to protect a population from mass atrocities?",
      "opts": [
        "The government of the state where the people live",
        "The group of states closest to the country",
        "The members of the UN General Assembly",
        "The leaders of the world's largest economies"
      ],
      "why": "R2P puts the first duty on each state to protect its own people. Other countries should help, and may take stronger action if the state clearly fails. Neighbouring states are tempting, but R2P gives them no first duty over another state's population.",
      "clue": "Think about whose people they are."
    },
    "b": {
      "d": 3,
      "q": "In Ardovia, the government is killing a minority group and refuses all offers of help. Which approach by the international community fits R2P?",
      "opts": [
        "Peaceful steps, then force if the Security Council agrees",
        "Peaceful steps, then force without Security Council approval",
        "Troops first, then Security Council approval afterwards",
        "Stay out, unless Ardovia itself asks for outside help"
      ],
      "why": "R2P starts with peaceful steps and allows stronger action if they fail, but any force must be authorised by the Security Council beforehand. Using force without that approval is tempting because the peaceful steps come first, but it skips the Council.",
      "clue": "Check the order of steps and who must approve force."
    }
  },
  "leg-international-courts": {
    "title": "International courts",
    "card": [
      [
        "ICJ",
        "The International Court of Justice, in The Hague, settles legal disputes between states. It can hear a case only if the states involved have agreed to its jurisdiction (its power to decide), and its decision then binds them."
      ],
      [
        "ICC",
        "The International Criminal Court, also in The Hague, tries individuals, not states. It deals with the gravest crimes: genocide, crimes against humanity, war crimes and the crime of aggression."
      ],
      "The ICC is a court of last resort. It acts only when a state is unwilling or unable to prosecute the crime itself.",
      "So the question to ask is who is on trial. A dispute between countries goes to the ICJ. A person accused of a grave crime may face the ICC."
    ],
    "remember": "The ICJ hears disputes between states. The ICC tries individuals.",
    "a": {
      "q": "Two countries disagree over where their sea border lies and both agree to take the matter to court. Which court hears it?",
      "opts": [
        "The International Court of Justice",
        "The International Criminal Court",
        "The Security Council",
        "The courts of the larger country"
      ],
      "why": "A legal dispute between states is the work of the ICJ, and both states have agreed to its jurisdiction. The ICC is the tempting wrong answer, but it tries individuals for grave crimes and does not settle disputes between countries.",
      "clue": "Are the parties states or individuals?"
    },
    "b": {
      "d": 3,
      "q": "A militia commander is accused of war crimes. His own country's courts refuse to prosecute him. Which statement is correct?",
      "opts": [
        "The ICC may try him as an individual",
        "The ICJ may try him as an individual",
        "The ICC may sue his country for the crimes",
        "The ICJ may hear his case if his country agrees"
      ],
      "why": "The ICC tries individuals for war crimes, and it can act when a state is unwilling to prosecute. The ICJ is the tempting wrong answer, but it hears disputes between states and does not try individuals, even when a state consents.",
      "clue": "Who is accused, and which court tries individuals?"
    }
  }
};
