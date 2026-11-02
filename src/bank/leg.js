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
  },
  "leg-negligence": {
    "title": "Negligence",
    "card": [
      "Negligence is a civil wrong based on carelessness. The plaintiff (the person harmed) sues the defendant, and does not need to prove the defendant meant to cause harm.",
      [
        "Duty of care",
        "a legal duty to take reasonable care not to harm people who could foreseeably be affected by what you do. A driver, for example, owes a duty to other road users."
      ],
      ["Breach", "the defendant fell short of what a reasonable person would have done in the same situation."],
      [
        "Causation and remoteness",
        "the breach must have caused the harm, and the harm must not be too remote, meaning too unlikely or too far removed from the breach to be fairly blamed on the defendant."
      ]
    ],
    "remember": "Liable in negligence: duty of care, breach, and harm caused that was not too remote. All three are needed.",
    "a": {
      "q": "Nadia shows that Leo owed her a duty of care and breached it. Why might her negligence claim still fail?",
      "opts": [
        "His breach did not cause the harm she suffered",
        "He did not mean to cause her any harm",
        "He was never charged by police over it",
        "He acted carelessly rather than on purpose"
      ],
      "why": "Duty and breach are not enough: the breach must also have caused harm that is not too remote. Leo not meaning to cause harm does not matter, because negligence is about carelessness, not intention.",
      "clue": "Count the elements Nadia has proved so far."
    },
    "b": {
      "d": 3,
      "q": "Sam, a cyclist, is hit by a van when its driver, Priya, looks at her phone and drifts into the bike lane. Sam's arm is broken. Which statement describes Priya's breach of duty?",
      "opts": [
        "She failed to take the care a reasonable driver would",
        "She owed a duty to other road users on the road",
        "Sam's arm was broken when the van hit him",
        "Sam's injury was not too remote from her driving"
      ],
      "why": "A breach means falling short of what a reasonable person would do, and a reasonable driver would watch the road. The other options match other steps: the duty, the harm and remoteness. Harm alone does not prove a breach.",
      "clue": "Look at how Priya acted, not whom she owed or what resulted."
    }
  },
  "leg-defences-negligence": {
    "title": "Defences to negligence",
    "card": [
      "A defence is an argument by the defendant that they should not have to pay the full amount, or anything at all, even if the plaintiff proves negligence.",
      [
        "Contributory negligence",
        "the plaintiff did not take reasonable care for their own safety, and this helped cause their own harm. The court can reduce the damages to reflect the plaintiff's share of the blame."
      ],
      [
        "Voluntary assumption of risk",
        "the plaintiff knew about a specific risk and freely chose to accept it. If the defendant proves this, the claim can fail completely."
      ],
      "The difference is the result. Contributory negligence can lower the damages. Voluntary assumption of risk can defeat the claim."
    ],
    "remember": "Contributory negligence can cut the damages. Voluntary assumption of risk can defeat the claim.",
    "a": {
      "q": "A court finds a driver negligent, but the injured passenger was not wearing a seatbelt, which made their injuries worse. If the driver raises this, what is the likely effect?",
      "opts": [
        "The damages are reduced to reflect the passenger's share",
        "The claim fails completely because the risk was accepted",
        "The driver is found to owe no duty of care to the passenger",
        "The driver is found not to have breached the duty of care"
      ],
      "why": "Not wearing a seatbelt is a failure to take reasonable care for one's own safety, so it is contributory negligence, which lets the court reduce the damages. It is not voluntary assumption of risk, because the passenger did not knowingly accept a specific risk from the driver. The driver was still negligent.",
      "clue": "Did the passenger accept a known risk, or fail to take care?"
    },
    "b": {
      "d": 3,
      "q": "Tariq is hit by a cricket ball while sitting in a marked area of a ground, under a sign warning of flying balls. He sues the club. Which defence is the club most likely to use?",
      "opts": [
        "Voluntary assumption of risk, as he accepted a known risk",
        "Contributory negligence, as he accepted a known risk",
        "Voluntary assumption of risk, as the club breached its duty",
        "Contributory negligence, as the club breached its duty"
      ],
      "why": "Tariq knew the specific risk from the sign and chose to sit there, so voluntary assumption of risk fits, and if proven it can defeat the claim. Contributory negligence is tempting, but it is about the plaintiff failing to take reasonable care, not knowingly accepting a risk. A breach by the club is part of proving negligence, not a defence.",
      "clue": "Tariq was warned of a specific risk and chose to stay."
    }
  },
  "leg-defamation": {
    "title": "Defamation",
    "card": [
      "Defamation is a civil wrong. It happens when a person publishes material about someone that harms that person's reputation.",
      "Publishing means sharing the material with at least one other person. It can be spoken, written, posted online or shown in a picture.",
      [
        "Defences",
        "The defendant may argue the material was true, or that it was an honest opinion on a matter of public interest. If a defence succeeds, the claim can fail."
      ],
      [
        "Remedy",
        "The usual remedy is damages, which is money paid to the person defamed for the harm to their reputation."
      ]
    ],
    "remember": "Defamation is publishing material that harms a reputation. Truth and honest opinion are defences, and damages are the usual remedy.",
    "a": {
      "q": "Which situation is most likely to be defamation?",
      "opts": [
        "Leo posts online that a neighbour stole, which is false",
        "Leo privately tells a neighbour he dislikes her haircut",
        "Leo writes in his diary that a neighbour is rude, unseen",
        "Leo tells a neighbour to her face that she sings badly"
      ],
      "why": "Leo shares a false claim with others online, and it harms his neighbour's reputation. In the other options nothing is published to anyone else, or no reputation is harmed. A private comment to the person alone is not publication.",
      "clue": "Look for material shared with others that damages a reputation."
    },
    "b": {
      "d": 3,
      "q": "Mia, a food critic in Geelong, publishes a review saying a café's soup was bland. The café owner sues for defamation. Which defence is most suited to Mia's case?",
      "opts": [
        "Honest opinion, because the review states her view of it",
        "Truth, because the café has been open for many years",
        "Honest opinion, because the review was published for money",
        "Truth, because the owner agreed to be reviewed"
      ],
      "why": "A review of how food tasted is a view about a matter of public interest, so honest opinion fits. Truth is the tempting option, but it must show the material was true, and the length of time a café has been open or the owner's agreement does not do that. Being paid to publish is also not what makes an opinion honest.",
      "clue": "Is the review a statement of fact or a view, and what shows the defence?"
    }
  },
  "leg-impact-civil-wrong": {
    "title": "The impact of a civil wrong",
    "card": [
      "A civil wrong, such as negligence or defamation, can affect both sides of a dispute. The effects can reach beyond the court case.",
      [
        "Injured party",
        "the person who says they were wronged. They may lose money through medical bills, lost wages or repair costs. They may lose health, or have their reputation damaged."
      ],
      [
        "Defendant",
        "the person or organisation accused of the wrong. If found liable, they may have to pay damages and legal costs. They may also lose standing, meaning the respect others have for them."
      ],
      "Not every effect is a money loss. Harm to health or reputation is real even when no bill has been paid. A court can usually only order money to make up for it."
    ],
    "remember": "A civil wrong can cost both sides money, and also health, reputation or standing.",
    "a": {
      "q": "A gym member in Geelong is hurt by faulty equipment and cannot work for two months. Which impact does lost pay show?",
      "opts": [
        "A financial cost to the injured party",
        "A loss of standing for the defendant",
        "A harm to the injured party's reputation",
        "A legal cost paid by the injured party"
      ],
      "why": "Pay the member could not earn is a loss of money, so it is a financial cost to the injured party. It is not a legal cost, which is the cost of running the case, and it has nothing to do with reputation.",
      "clue": "Think about what the member could not earn while off work."
    },
    "b": {
      "d": 3,
      "q": "A newspaper in Ballarat is found liable for defaming a local chef and must pay damages. Which impact is a loss of standing for the defendant?",
      "opts": [
        "Readers trust the newspaper less after the ruling",
        "The newspaper must pay damages to the chef",
        "The chef's restaurant loses customers after the story",
        "The newspaper pays its own lawyers for the case"
      ],
      "why": "Standing is the respect others hold for a person or organisation, so readers trusting the newspaper less is a loss of standing for the defendant. Paying damages or lawyers is a money cost, and the lost customers are harm to the chef, not the newspaper.",
      "clue": "First work out who the defendant is, then recall what standing means."
    }
  },
  "leg-purposes-remedies": {
    "title": "Purposes of remedies",
    "card": [
      "A remedy is what a court orders to deal with a wrong in a civil dispute. The person who sued is the plaintiff. A remedy is not a fine or a finding of guilt, which belong to criminal cases.",
      [
        "Restore",
        "the main aim is to put the plaintiff back in the position they were in before the wrong, as far as money or an order can do this. The aim is not to leave them better off."
      ],
      [
        "Stop",
        "another aim is to stop the wrong continuing, so that the harm to the plaintiff does not go on or happen again."
      ],
      "A court looks at the harm in the case and picks a remedy that suits it. Some wrongs are in the past and some are still going on."
    ],
    "remember": "A remedy puts the plaintiff back where they were, or stops the wrong carrying on.",
    "a": {
      "q": "What is the main purpose of a remedy in a civil dispute?",
      "opts": [
        "To put the plaintiff back in their earlier position",
        "To make the defendant pay a fine to the state",
        "To decide whether the defendant is guilty of a crime",
        "To make sure the plaintiff ends up better off than before"
      ],
      "why": "A remedy aims to restore the plaintiff to where they were before the wrong. Making them better off is tempting, but the aim is to restore, not to give a gain. Fines and guilt belong to criminal cases.",
      "clue": "A civil remedy is about the parties, not about punishing a crime."
    },
    "b": {
      "d": 3,
      "q": "Priya's neighbour Tom keeps running a loud machine at night in Geelong, and it still disturbs her sleep. Which purpose of a remedy fits her need most directly?",
      "opts": [
        "Stopping the wrong from continuing",
        "Restoring her to her position before the wrong",
        "Deciding whether Tom is guilty of an offence",
        "Recording that the wrong happened in the past"
      ],
      "why": "The wrong is still going on, so the most direct need is to stop it continuing. Restoring her position is also a purpose, but it deals with harm already done. Deciding guilt belongs to criminal cases, and recording a past wrong is not one of the aims on the card.",
      "clue": "Is the wrong over, or is it still happening?"
    }
  },
  "leg-compensatory-damages": {
    "title": "Compensatory damages",
    "card": [
      "Compensatory damages are a sum of money paid by the defendant to the plaintiff. They aim to make up for the loss the plaintiff suffered because of the wrong.",
      [
        "Economic loss",
        "money lost or spent because of the wrong, such as medical bills, repair costs and wages the plaintiff could not earn."
      ],
      [
        "Non-economic loss",
        "harm that has no price tag, such as pain and suffering, loss of enjoyment of life and emotional distress."
      ],
      "The plaintiff must show the loss. A court sets an amount that it thinks fairly covers it. The aim is to compensate, not to punish the defendant."
    ],
    "remember": "Compensatory damages pay for the plaintiff's loss, both money lost and pain suffered.",
    "a": {
      "q": "Which best describes the purpose of compensatory damages?",
      "opts": [
        "To make up for the loss the plaintiff suffered",
        "To punish the defendant for how they behaved",
        "To stop the defendant repeating the wrong",
        "To show the claim was a waste of time"
      ],
      "why": "Compensatory damages are paid to make up for the plaintiff's loss. Punishing the defendant is tempting, but that is not the aim of compensatory damages: they compensate, not punish.",
      "clue": "Think about who the money is meant to help."
    },
    "b": {
      "d": 3,
      "q": "Priya is hurt when a delivery van driven carelessly hits her car in Ballarat. She wins her case. Which part of her claim is for non-economic loss?",
      "opts": [
        "The pain and distress she suffered from her injuries",
        "The cost of repairing her damaged car",
        "The wages she lost while off work",
        "The hospital bills she paid after the crash"
      ],
      "why": "Pain and distress cannot be measured by a bill, so they are non-economic loss. Repair costs, lost wages and hospital bills are all money lost or spent, so they are economic loss.",
      "clue": "Which loss has no receipt or pay slip behind it?"
    }
  },
  "leg-other-kinds-damages": {
    "title": "Other kinds of damages",
    "card": [
      [
        "Nominal",
        "a very small sum that recognises the plaintiff's rights were breached, even though they suffered little or no real loss."
      ],
      [
        "Contemptuous",
        "a tiny sum, such as one cent, awarded when the plaintiff technically wins but the court thinks the claim was worthless or should not have been brought."
      ],
      [
        "Exemplary",
        "a larger sum to punish the defendant for very bad conduct and to warn others. It is not paid to cover loss."
      ],
      "Exemplary damages are usually added on top of compensatory damages, not given instead of them."
    ],
    "remember": "Nominal recognises a wrong, contemptuous shows disapproval of the claim, exemplary punishes.",
    "a": {
      "q": "Which kind of damages is awarded mainly to punish the defendant?",
      "opts": ["Exemplary damages", "Nominal damages", "Contemptuous damages", "Compensatory damages"],
      "why": "Exemplary damages punish the defendant for very bad conduct and warn others. Contemptuous damages are a tiny sum that shows the court's low opinion of the claim, not a punishment of the defendant.",
      "clue": "Which kind looks at the defendant's conduct, not the claim?"
    },
    "b": {
      "d": 3,
      "q": "Sam sues a neighbour in Geelong for walking across his lawn. The court finds a wrong occurred but Sam lost nothing, so it awards one dollar to recognise the breach. What kind of damages is this?",
      "opts": ["Nominal damages", "Contemptuous damages", "Exemplary damages", "Compensatory damages"],
      "why": "A small sum that recognises a wrong where there was little or no loss is nominal damages. Contemptuous damages are also tiny, but they are used when the court thinks the claim itself was worthless, and nothing here says that.",
      "clue": "The court is recognising the wrong, not judging the claim."
    }
  },
  "leg-injunctions": {
    "title": "Injunctions",
    "card": [
      "An injunction is a court order that tells a person to act in a certain way, or to stop. It is a remedy that is not paid in money.",
      [
        "Restrictive",
        "an order to stop doing something, or not to start, such as stopping a business from making loud noise at night."
      ],
      ["Mandatory", "an order to do something, such as removing a fence built on a neighbour's land."],
      "A person who ignores an injunction can be punished by the court for contempt of court. Injunctions are often used when money would not fix the problem."
    ],
    "remember": "A restrictive injunction orders a person to stop. A mandatory one orders them to act.",
    "a": {
      "q": "A court orders a factory in Dandenong to stop dumping waste into a creek. What kind of order is this?",
      "opts": ["A restrictive injunction", "A mandatory injunction", "Exemplary damages", "Compensatory damages"],
      "why": "The order tells the factory to stop doing something, so it is a restrictive injunction. A mandatory injunction would order the factory to do something, such as clean up the creek.",
      "clue": "Is the order telling the factory to stop or to act?"
    },
    "b": {
      "d": 2,
      "q": "Leila builds a shed that blocks her neighbour's driveway in Bendigo. The court orders her to knock it down. What kind of order is this?",
      "opts": ["A mandatory injunction", "A restrictive injunction", "Nominal damages", "Contemptuous damages"],
      "why": "Knocking the shed down is something Leila must do, so the order is a mandatory injunction. A restrictive injunction would only stop her from doing something, such as stopping her building more.",
      "clue": "Ask whether Leila must take an action."
    }
  },
  "leg-role-laws": {
    "title": "Laws and social cohesion",
    "card": [
      "Social cohesion means people in a society live together peacefully and trust that others will follow the same rules.",
      "Laws set out how people must behave and what they can expect from others. They protect each person's rights, such as safety and property.",
      "The legal system, which includes parliament, police and courts, makes laws and enforces them. It also gives people a peaceful way to settle disputes with each other.",
      "Individuals play a part too. When most people obey the law and use the legal system to settle disputes, society stays stable."
    ],
    "remember": "A stable society needs three things working together: people, laws and the legal system.",
    "a": {
      "q": "Which statement best describes how laws help social cohesion?",
      "opts": [
        "They set shared rules and protect each person's rights",
        "They remove all disagreements between people in society",
        "They stop every person from ever breaking the rules",
        "They mean people never need to use the courts at all"
      ],
      "why": "Laws give people shared rules and protect their rights, so they can trust each other and live together peacefully. Laws do not remove all disagreements. The legal system gives a way to settle disputes when they happen.",
      "clue": "Think about what people can rely on when everyone follows the same rules."
    },
    "b": {
      "d": 3,
      "q": "Neighbours in a Ballarat street dispute a fence. Instead of fighting, they take the matter to a court, which makes a decision they both accept. How does this support social cohesion?",
      "opts": [
        "Individuals used the legal system to settle it peacefully",
        "The decision stopped any further disputes in the street",
        "Laws alone settled the dispute without the neighbours",
        "The neighbours' rights were set aside for the sake of peace"
      ],
      "why": "The neighbours chose to use the legal system, and the court settled the dispute without conflict. A decision does not mean disputes never happen again. Laws do not settle things alone, because individuals must choose to use the system.",
      "clue": "Look at what the neighbours did and what the court did."
    }
  },
  "leg-principles-justice": {
    "title": "Principles of justice",
    "card": [
      [
        "Fairness",
        "the law uses fair processes. Decisions are made without bias, everyone gets a chance to be heard, and the process is open to scrutiny."
      ],
      [
        "Equality",
        "people are treated the same way, whatever their wealth or status. Where people start from different positions, such as having a disability, different treatment can be needed so each person gets a fair outcome."
      ],
      [
        "Access",
        "a person can understand the legal system and use it. Cost, language, distance and not knowing their rights can all get in the way."
      ],
      "The three principles work together. A system is more just when its processes are fair, people are treated equally and people can reach it."
    ],
    "remember": "Justice asks three things: is the process fair, is treatment equal, and can people get into the system?",
    "a": {
      "q": "A court provides a free interpreter for a witness who speaks little English. Which principle is this mainly meant to meet?",
      "opts": [
        "Access, so the person can understand and take part",
        "Fairness, so the judge can be free of all bias",
        "Equality, so every person is treated in the same way",
        "Fairness, so the public can watch the hearing"
      ],
      "why": "An interpreter helps the witness understand the system and take part in it, which is access. Equality is the tempting option, but giving everyone identical treatment would leave this witness unable to follow the case.",
      "clue": "What stops this person from using the system?"
    },
    "b": {
      "d": 3,
      "q": "Two people are found guilty of the same theft, done the same way, with no past offences. One is a wealthy business owner and one is unemployed. The magistrate gives both the same penalty. Why does this meet equality?",
      "opts": [
        "People in the same position get the same treatment",
        "Different treatment was given to meet each person's needs",
        "Each person was given a chance to be heard in court",
        "Both people were able to understand the court process"
      ],
      "why": "The two offenders are in the same position, and equality means the same treatment whatever a person's wealth or status. The option about different treatment is tempting, but that part of equality applies where people start from different positions, and these two did not.",
      "clue": "Does a person's wealth change how equality treats them?"
    }
  },
  "leg-characteristics-effective-law": {
    "title": "Characteristics of an effective law",
    "card": [
      "An effective law is one that people follow and that does its job. It has five characteristics: it reflects society's values, and it is enforceable, known, clear and stable.",
      "Reflecting values means the law matches what most people believe is right, so they are more willing to obey it. Enforceable means police and courts can detect breaches and apply a penalty.",
      "Known means people can find out about the law. Clear means its wording is easy to understand, so people can tell what it requires.",
      "Stable means the law does not change too often, so people can plan around it. It can still change over time when society changes."
    ],
    "remember": "People are more likely to follow a law they agree with, know about, understand, can be caught breaking and can rely on.",
    "a": {
      "q": "A new law is written in such complicated wording that most people cannot tell what it requires. Which characteristic is it missing?",
      "opts": ["It is not clear", "It is not stable", "It is not enforceable", "It does not reflect values"],
      "why": "Clear means the wording can be understood, so people can tell what the law requires. Stability is about how often a law changes, not how it is worded.",
      "clue": "Think about the wording, not how often the law changes."
    },
    "b": {
      "d": 3,
      "q": "A council has banned dogs from a beach for ten years. Signs at each entrance explain the ban and most locals support it, but there are no rangers and no way to check who brings a dog. Which characteristic is the law weakest on?",
      "opts": ["It is hard to enforce", "It does not reflect values", "It is not well known", "It is not stable"],
      "why": "Without rangers or any way to detect breaches, the council cannot apply a penalty, so the law is hard to enforce. It does reflect values, because most locals support it, and the signs mean it is known.",
      "clue": "Most locals agree with the ban, so look at what happens after someone breaks it."
    }
  },
  "leg-parliament-courts": {
    "title": "Parliament and the courts",
    "card": [
      "Parliament makes most laws by passing Acts. It can make new laws and change or repeal old ones.",
      "Courts apply the law to the cases that come before them. A judge or magistrate decides what the law means for the facts of that case.",
      [
        "Precedent",
        "when a higher court, such as the Supreme Court, decides a case, its reasons can become a rule that later courts follow in similar cases. Higher courts bind lower courts in the same hierarchy."
      ],
      [
        "Statutory interpretation",
        "when the words of an Act are unclear in a case, a court works out what they mean. If a higher court does this, its reading can guide how the Act is applied later."
      ]
    ],
    "remember": "Parliament makes most laws. Courts apply them and also shape law through precedent and interpretation.",
    "a": {
      "q": "Which of these is an example of a court making law, rather than only applying it?",
      "opts": [
        "The Supreme Court explains an unclear word in an Act",
        "A magistrate applies a clear section of an Act",
        "A judge decides what happened between two parties",
        "A judge sentences an offender within the set maximum"
      ],
      "why": "When a higher court explains an unclear word, its reading can guide later cases, so it shapes the law. The other options only apply the law to the facts of one case, and applying the law is not the same as making it.",
      "clue": "Which option sets something later courts may follow?"
    },
    "b": {
      "d": 3,
      "q": "A Victorian Act bans \"vehicles\" from a park. In a Supreme Court case, a judge must decide if an electric scooter is a vehicle, and rules that it is. Which statement best describes what the judge did?",
      "opts": [
        "Interpreted the Act, and the ruling can guide later cases",
        "Made a new Act that now replaces the original one",
        "Repealed the ban because its wording was unclear",
        "Followed a lower court's ruling that bound the judge"
      ],
      "why": "The word \"vehicle\" was unclear in this case, so the judge worked out its meaning. That is statutory interpretation, and because the Supreme Court is a higher court, the reading can guide later cases. The judge did not make or repeal an Act, because parliament does that, and a lower court's ruling cannot bind a higher court.",
      "clue": "The Act already exists, and one word in it is unclear."
    }
  },
  "leg-sources-law": {
    "title": "Sources of law",
    "card": [
      "Law in Victoria comes from two main sources: parliament, and the decisions judges make when they decide court cases.",
      [
        "Statute law",
        "law made by parliament and set out in an Act of Parliament, such as the Crimes Act 1958 (Vic). A bill is only a proposed law until parliament passes it."
      ],
      [
        "Common law",
        "law made by judges when they decide cases. It is also called case law, and it is recorded in the judge's written reasons for the decision."
      ],
      "The two sources do not rank equally. Where a statute and a common law rule are inconsistent, the statute prevails and the common law rule no longer applies."
    ],
    "remember": "Acts make statute law, judges' decisions make common law, and statute wins if they clash.",
    "a": {
      "q": "Which of these is an example of common law?",
      "opts": [
        "A rule set out in a judge's reasons for deciding a case",
        "A rule set out in a new Act passed by parliament",
        "A rule set out in a bill before parliament",
        "A rule set out in a council's list of local fees"
      ],
      "why": "Common law is made by judges when they decide cases, and it is recorded in their reasons. An Act of Parliament is statute law, not common law. A bill is only a proposed law until parliament passes it.",
      "clue": "Who makes common law?"
    },
    "b": {
      "d": 2,
      "q": "Parliament passes an Act that changes a rule judges had set in earlier cases. Which statement is correct?",
      "opts": [
        "The new rule is statute law and replaces the judges' rule",
        "The new rule is common law because it replaces a case",
        "The judges' rule stays in force over the new Act",
        "The new rule is common law until a court approves it"
      ],
      "why": "An Act of Parliament is statute law, whatever rule it changes. Where a statute and a common law rule are inconsistent, the statute prevails, so the judges' rule no longer applies. Replacing a rule from a case does not make the Act common law.",
      "clue": "Look at who made the new rule, not what it replaced."
    }
  },
  "leg-victorian-court-hierarchy": {
    "title": "The Victorian court hierarchy",
    "card": [
      "Victorian courts are ranked in a hierarchy. From the bottom up, the main courts are the Magistrates' Court, the County Court and the Supreme Court.",
      [
        "Original jurisdiction",
        "the power of a court to hear a case for the first time. Each court can hear only the types of case its jurisdiction allows."
      ],
      [
        "Appellate jurisdiction",
        "the power of a court to hear an appeal, which asks a higher court to review a decision made by a lower court."
      ],
      "Less serious matters usually begin in the Magistrates' Court, and more serious ones in the County Court or Supreme Court. So each case goes to a court suited to it, and a party who thinks a decision was wrong can ask a higher court to review it."
    ],
    "remember": "The hierarchy matches cases to suitable courts and lets decisions be appealed upward.",
    "a": {
      "q": "Why does Victoria have a court hierarchy, with different courts hearing different cases?",
      "opts": [
        "Cases go to courts suited to them, and appeals are possible",
        "Every case is heard by each court in turn, from the bottom",
        "Lower courts hear only cases about laws that are brand new",
        "Higher courts decide every case, so appeals are not needed"
      ],
      "why": "A ranking lets serious or complex cases go to higher courts, and lets a party ask a higher court to review a decision. The option about every court hearing each case is wrong because cases usually begin in one court, not all of them.",
      "clue": "What happens to a serious case, or to a party who disagrees with a result?"
    },
    "b": {
      "d": 2,
      "q": "Sam is unhappy with a decision made in the Magistrates' Court and asks the County Court to review it. Which power is the County Court using?",
      "opts": ["Appellate jurisdiction", "Original jurisdiction", "Statutory interpretation", "Precedent"],
      "why": "The County Court is reviewing a decision from a lower court, which is appellate jurisdiction. Original jurisdiction is wrong because that is hearing a case for the first time, and Sam's case has already been decided.",
      "clue": "Has this case already been decided once?"
    }
  },
  "leg-criminal-civil-law-2": {
    "title": "Criminal and civil law",
    "card": [
      [
        "Criminal law",
        "deals with offences against society, such as theft or assault. The state brings the case, through police and prosecutors. The aim is mainly to punish the offender and protect society."
      ],
      [
        "Civil law",
        "deals with disputes between people or organisations, such as a broken contract or damage to a fence. The person who says they were harmed brings the case. The aim is usually to put things right, for example by paying compensation."
      ],
      "One act can lead to both. If Sam punches Ali, the state may charge Sam with assault. Ali may also sue Sam for the harm caused.",
      "The two types of case are separate. They are brought by different parties, they have different aims, and both can go ahead."
    ],
    "remember": "Criminal: the state acts against an offence. Civil: one party sues another. One act can bring both.",
    "a": {
      "q": "Which case is a civil dispute?",
      "opts": [
        "A tenant sues a landlord over a bond not repaid",
        "Police charge a man with stealing a car",
        "Prosecutors charge a driver with dangerous driving",
        "The state charges a woman with assault"
      ],
      "why": "A tenant suing a landlord is a dispute between two people, brought by the person who says they were harmed. The other three are offences against society, brought by the state.",
      "clue": "Who is bringing the case: the state or a person?"
    },
    "b": {
      "d": 3,
      "q": "Jo is hit by a cyclist who rides through a red light. Police charge the cyclist, and Jo also sues for medical costs. What is true of these two cases?",
      "opts": [
        "They are separate cases arising from one act",
        "They are one case heard in two different courts",
        "Both cases are brought by the state against the cyclist",
        "Jo's civil claim replaces the criminal charge"
      ],
      "why": "The one act led to a criminal case brought by the state and a civil case brought by Jo. They are separate cases with different aims, and both can go ahead. Jo's claim is not a second state case, because Jo, the person harmed, brings it.",
      "clue": "Think about who brings each case and what each one wants."
    }
  },
  "leg-purposes-criminal-law": {
    "title": "Purposes of criminal law",
    "card": [
      "Criminal law deals with conduct that harms individuals or the community as a whole. The state, not the victim, brings the case against the accused.",
      ["Protect", "it protects people and property from harm, such as assault, theft and damage."],
      ["Set standards", "it sets out the behaviour the community expects, by making some conduct a crime."],
      ["Punish", "it allows courts to punish those found guilty, which can also discourage others from offending."]
    ],
    "remember": "Criminal law protects, sets standards and allows punishment.",
    "a": {
      "q": "Parliament makes it a crime to carry a knife in a public place without a good reason. Which purpose of criminal law does this show most clearly?",
      "opts": [
        "Setting standards of behaviour in the community",
        "Allowing a victim to claim money for loss",
        "Punishing a person who has already been found guilty",
        "Settling a dispute between two neighbours"
      ],
      "why": "Making conduct a crime tells the community what behaviour is expected. It is not about punishing a particular person yet, and the state, not a victim, enforces criminal law.",
      "clue": "Think about what the rule tells everyone before anyone breaks it."
    },
    "b": {
      "d": 3,
      "q": "Priya is found guilty of stealing a bicycle from a shop in Ballarat, and the court orders a penalty. Which purpose is the court mainly carrying out?",
      "opts": [
        "Allowing punishment of a person who broke the law",
        "Protecting property by making theft a crime",
        "Setting the standard that theft is wrong",
        "Helping the shop owner recover the bicycle's value"
      ],
      "why": "The court is dealing with a person already found guilty, so it is using its power to punish. Protecting property and setting standards are served by the law itself, before any case reaches court.",
      "clue": "Look at the stage of the case: guilt has already been decided."
    }
  },
  "leg-presumption-innocence": {
    "title": "The presumption of innocence",
    "card": [
      "A person accused of a crime is treated as innocent until they are proven guilty. They do not have to prove that they did not do it.",
      "The presumption applies to everyone charged, however serious the charge or however strong the claims in the news seem.",
      "The accused also has the right to silence. They can choose not to answer police questions or give evidence at trial.",
      "Staying silent does not prove guilt. The accused is still presumed innocent."
    ],
    "remember": "Innocent until proven guilty, and silence is not an admission.",
    "a": {
      "q": "Tom is charged with burglary in Geelong. Before his trial, how must the law treat him?",
      "opts": [
        "As innocent, until he is proven guilty",
        "As guilty, unless he can show he is innocent",
        "As innocent, but only if the charge is minor",
        "As guilty, if he refuses to answer police questions"
      ],
      "why": "The presumption of innocence applies to every accused person until guilt is proven. It is not limited to minor charges, and Tom does not have to prove anything.",
      "clue": "Who is treated as innocent, and until when?"
    },
    "b": {
      "d": 3,
      "q": "Police question Mei about a fire at a Bendigo warehouse. She says she will not answer any questions. What does this silence mean in law?",
      "opts": [
        "Nothing: it is her right, and does not prove guilt",
        "It shows she has something to hide and is probably guilty",
        "It is an admission that she started the fire",
        "It removes the presumption of innocence for her"
      ],
      "why": "The right to silence lets an accused person decline to answer without it being treated as guilt. The tempting idea that silence looks suspicious is wrong, because Mei is still presumed innocent.",
      "clue": "Choosing not to speak is a right, not evidence."
    }
  },
  "leg-burden-standard-proof-criminal": {
    "title": "Burden and standard of proof",
    "card": [
      [
        "Burden of proof",
        "the duty to prove the case. In a criminal trial it rests on the prosecution, because the accused is presumed innocent. The accused does not have to prove innocence."
      ],
      [
        "Standard of proof",
        "how strongly the case must be proved. In a criminal trial the prosecution must prove guilt beyond reasonable doubt."
      ],
      "If the jury or magistrate is left with a reasonable doubt about guilt, the accused must be found not guilty. Thinking the accused probably did it is not enough.",
      "This is higher than the civil standard, the balance of probabilities, which only asks whether a claim is more likely than not."
    ],
    "remember": "Any reasonable doubt about guilt means a not guilty verdict, and the accused never has to prove innocence.",
    "a": {
      "q": "In a Victorian criminal trial, which side must prove the case, and to what standard?",
      "opts": [
        "The prosecution, to prove guilt beyond reasonable doubt",
        "The defence, to prove innocence beyond reasonable doubt",
        "The prosecution, to show guilt is more likely than not",
        "The defence, to raise some doubt about the evidence"
      ],
      "why": "The burden sits with the prosecution because the accused is presumed innocent, and the standard is beyond reasonable doubt. Showing guilt is more likely than not is the lower civil standard, so it is not enough in a criminal trial.",
      "clue": "The accused is presumed innocent, so who must do the proving?"
    },
    "b": {
      "d": 3,
      "q": "Jaya is tried by a jury in the County Court of Victoria for armed robbery of a service station in Footscray. The jury thinks she probably did it but still has a reasonable doubt. What should the verdict be?",
      "opts": [
        "Not guilty, because the standard of proof was not met",
        "Guilty, because the jury thinks she probably did it",
        "Not guilty, because Jaya proved she was innocent",
        "Guilty, because Jaya could not prove her innocence"
      ],
      "why": "Probably guilty is not enough. The prosecution must remove reasonable doubt, so a jury that still has such doubt must find her not guilty. The options about Jaya proving or failing to prove her innocence both wrongly put the burden on her.",
      "clue": "Does the jury's doubt mean the standard has been met?"
    }
  },
  "leg-strict-liability-offences": {
    "title": "Strict liability offences",
    "card": [
      "Most crimes need the prosecution to prove both a guilty act and a guilty mind.",
      "A strict liability offence is different. The prosecution need only prove the act happened. It does not have to prove the accused intended it.",
      "Many traffic offences work this way, such as driving over the speed limit. It does not matter if the driver did not mean to speed.",
      "The accused may still raise a defence, such as an honest and reasonable mistake of fact. But the prosecution does not need to prove intent."
    ],
    "remember": "Strict liability: prove the act, not the intent.",
    "a": {
      "q": "Sam is fined for driving 15 km/h over the limit in Mildura. He says he did not notice his speed. Why is this not a good reason to avoid the offence?",
      "opts": [
        "Speeding is strict liability, so intent need not be proven",
        "Speeding needs proof that the driver meant to go too fast",
        "Speeding is an offence only if someone is hurt by it",
        "A driver who did not notice their speed cannot be charged"
      ],
      "why": "For a strict liability offence the prosecution only needs to prove the act. Sam not noticing means he did not intend to speed, but intent does not have to be proven, so he can still be found guilty.",
      "clue": "What must the prosecution prove for this kind of offence?"
    },
    "b": {
      "d": 2,
      "q": "Which feature makes an offence strict liability?",
      "opts": [
        "The prosecution does not have to prove the accused's intent",
        "The accused must prove to the court they had no intent",
        "The penalty is always a fine and never a prison term",
        "The act must have caused serious harm to another person"
      ],
      "why": "What marks a strict liability offence is that only the act needs to be proven. The accused does not have to prove a lack of intent, and neither the type of penalty nor the harm caused is what defines it.",
      "clue": "Focus on what the prosecution can leave out."
    }
  },
  "leg-summary-indictable-offences-2": {
    "title": "Summary and indictable offences",
    "card": [
      [
        "Summary offence",
        "a minor offence, such as offensive language or a minor traffic offence. It is heard by a magistrate in the Magistrates' Court, with no jury."
      ],
      [
        "Indictable offence",
        "a serious offence, such as murder, armed robbery or large-scale drug supply. It can be tried by a judge and jury in a higher court, such as the County Court or the Supreme Court."
      ],
      "Many indictable offences start in the Magistrates' Court, where a magistrate handles early steps. The most serious ones then go to a higher court for trial.",
      "The type of offence depends on how serious the law treats it. It does not depend on how the accused pleads or how long the case takes."
    ],
    "remember": "Minor offences go to a magistrate. Serious offences can go to a judge and jury.",
    "a": {
      "q": "Which feature is normally true of a summary offence in Victoria?",
      "opts": [
        "It is heard by a magistrate without a jury",
        "It is tried by a judge and jury",
        "It is heard in the Supreme Court",
        "It is decided by the police, not a court"
      ],
      "why": "Summary offences are minor and are heard by a magistrate alone. A jury is linked to indictable offences, so the option saying it is tried by a judge and jury is the tempting mistake.",
      "clue": "Think about who hears minor matters and whether a jury is used."
    },
    "b": {
      "d": 3,
      "q": "Dev is charged with armed robbery. His first court appearance is in the Magistrates' Court. How is his offence best classed, and why?",
      "opts": [
        "Indictable, because it is serious and can go before a jury",
        "Summary, because it first appears in the Magistrates' Court",
        "Summary, because Dev may plead guilty to the charge",
        "Indictable, because a magistrate hears it without a jury"
      ],
      "why": "The law treats armed robbery as serious, so it is indictable and can be tried by a judge and jury. Appearing first in the Magistrates' Court does not make an offence summary, because many indictable offences begin there.",
      "clue": "Where a case first appears may not tell you its type."
    }
  },
  "leg-participants-crime": {
    "title": "Participants in a crime",
    "card": [
      [
        "Principal offender",
        "the person who commits the crime, or who carries out the main act of it. Two or more people can both be principal offenders in the one crime."
      ],
      [
        "Accessory",
        "a person who helps an offender after the crime, knowing they committed it, so that they avoid arrest or punishment. An example is hiding the offender from police."
      ],
      "People can also be charged for helping before or during a crime. This includes planning it with the offender, or helping them while it happens, such as keeping watch.",
      "The time of the help matters. Help after the crime makes someone an accessory. Help before or during it can lead to a charge for taking part in the crime itself."
    ],
    "remember": "Principal offenders commit the crime. Help after it makes an accessory.",
    "a": {
      "q": "Which person is an accessory to a burglary?",
      "opts": [
        "Sam, who hides the burglar from police the next day",
        "Lena, who breaks in and takes a laptop",
        "Noor, who helps plan the break-in with the burglar",
        "Tom, who keeps watch outside during the break-in"
      ],
      "why": "Sam helps the burglar after the crime to avoid police, so he is an accessory. Tom is tempting, but he helps during the crime, so he can be charged for taking part in it instead.",
      "clue": "Look for the person whose help comes after the crime."
    },
    "b": {
      "d": 3,
      "q": "Priya knows her brother robbed a shop. The next day she drives him interstate so police cannot find him. What is Priya's role?",
      "opts": [
        "An accessory, as she helped after the crime",
        "A principal offender, as she is helping the robber",
        "A principal offender, as she knew about the crime",
        "An accessory, as she is related to the robber"
      ],
      "why": "Priya did not commit the robbery. She helped her brother avoid police after it, knowing what he did, so she is an accessory. Being a relative is not what makes her one, and knowing about a crime alone does not make someone a principal offender.",
      "clue": "Ask when her help happened and what she did."
    }
  },
  "leg-offence-against-person": {
    "title": "An offence against the person",
    "card": [
      "An offence against the person harms, or threatens to harm, a person's body or life. Assault and homicide are examples.",
      "Every offence has elements. These are the parts that make up the offence, and the prosecution must prove each one beyond reasonable doubt.",
      "Most offences have two kinds of element: a physical act (the conduct) and a mental state (such as intending to cause harm, or being reckless about it).",
      "If the prosecution cannot prove even one element, the accused is not guilty of that offence. The accused does not have to prove their innocence."
    ],
    "remember": "Offences against the person harm a body or a life, and the prosecution must prove every element.",
    "a": {
      "q": "Why must the prosecution prove the elements of an offence against the person?",
      "opts": [
        "Each element is part of the offence, so all must be proved",
        "Only the physical act needs proof, as the mind is assumed",
        "The accused must prove the elements did not happen",
        "The judge decides which elements are needed in each case"
      ],
      "why": "The elements make up the offence, so the prosecution must prove every one beyond reasonable doubt. The mental state is not assumed: it is an element too, and the accused does not have to prove the elements did not happen.",
      "clue": "Think about who has to prove guilt, and how much of it."
    },
    "b": {
      "d": 3,
      "q": "Dev is charged with an offence against the person. The prosecution proves he did the act, but the jury is not satisfied about his mental state. What is the likely outcome for that charge?",
      "opts": [
        "Not guilty, as one element has not been proved",
        "Guilty, as the physical act was proved",
        "Guilty, unless Dev proves he lacked the mental state",
        "A retrial, as the jury must find every element proved"
      ],
      "why": "Every element must be proved beyond reasonable doubt, and the mental state is an element. If the jury is not satisfied about it, Dev is not guilty of that offence. Proving the act alone is not enough.",
      "clue": "Does proving the act alone complete the offence?"
    }
  },
  "leg-offence-against-property": {
    "title": "An offence against property",
    "card": [
      "An offence against property takes, damages or interferes with someone's property. Theft and burglary are two examples. Criminal damage is another.",
      "Each offence has elements. The prosecution must prove every element beyond reasonable doubt. If one element is not proved, the accused is not guilty of that offence.",
      [
        "Theft",
        "dishonestly taking property that belongs to another person, with the intention of permanently depriving them of it."
      ],
      [
        "Burglary",
        "entering a building as a trespasser, with the intention of stealing or committing certain other offences inside. The accused does not need to take anything."
      ]
    ],
    "remember": "Property offences have elements, and the prosecution must prove every one.",
    "a": {
      "q": "Sam borrows his neighbour's ladder without asking, and plans to return it the next day. Which element of theft is most clearly missing?",
      "opts": [
        "Intention to permanently deprive the owner of it",
        "Property that belongs to another person",
        "A taking of the property",
        "Dishonesty in how the property was taken"
      ],
      "why": "Theft requires an intention to permanently deprive the owner. Sam plans to return the ladder, so that element is missing. The ladder does belong to another person and Sam did take it, so those elements are present.",
      "clue": "Sam plans to give the ladder back."
    },
    "b": {
      "d": 3,
      "q": "Priya climbs through an unlocked window into a shop after closing, planning to steal stock. A guard stops her before she touches anything. Which statement is correct?",
      "opts": [
        "She can face a burglary charge, as entry with intent counts",
        "She cannot face a burglary charge, as nothing was taken",
        "She can only face a theft charge, as she planned to steal",
        "She cannot face any charge, as the window was unlocked"
      ],
      "why": "Burglary needs entry as a trespasser with intent to steal, and nothing needs to be taken. Priya entered the shop without permission and intended to steal, so the elements can be proved. Saying nothing was taken confuses burglary with theft.",
      "clue": "Does burglary need anything to be taken?"
    }
  },
  "leg-trends-impact-offence": {
    "title": "Trends and impact of an offence",
    "card": [
      "Crime statistics count how many offences are recorded over a period. In Victoria, the Crime Statistics Agency publishes them.",
      "A trend is the pattern in those counts over time, such as a rise or fall across several years. Comparing Victoria with other places shows whether a trend is local or wider.",
      "Statistics only count offences that are recorded. Some offences are never reported, so the real number of offences may be higher than the figures show.",
      "The impact of an offence is its harm. It can reach the victim, their family and friends, and the wider community, for example through injury, lost money, fear or the cost of services."
    ],
    "remember": "Statistics show how often an offence is recorded. Impact shows how far its harm spreads.",
    "a": {
      "q": "Recorded car thefts in a Victorian city fall each year for five years. What does this describe?",
      "opts": [
        "A trend in the recorded offence",
        "The impact of the offence on victims",
        "A defence to the offence",
        "The harm done to the wider community"
      ],
      "why": "A pattern in recorded counts over several years is a trend. Impact is about harm to people, which a count alone does not show.",
      "clue": "Look at the pattern across the years."
    },
    "b": {
      "d": 3,
      "q": "Dan's shop in Bendigo is burgled and police record it. He loses stock, his daughter who works there feels afraid, and nearby shops pay for extra security. Which part shows harm to the wider community?",
      "opts": [
        "Nearby shops paying for extra security",
        "Dan losing stock from his shop",
        "Dan's daughter feeling afraid at work",
        "Police recording the burglary"
      ],
      "why": "The nearby shops were not targeted, yet they bear a cost, so the harm has spread to the wider community. Dan losing stock is harm to the direct victim, and his daughter's fear is harm to his family. Police recording the burglary adds to the statistics but is not itself a harm.",
      "clue": "Find the people who were not targeted and are not Dan's family."
    }
  },
  "leg-purposes-sanctions": {
    "title": "Purposes of sanctions",
    "card": [
      "Deterrence discourages crime through fear of a sanction. Specific deterrence aims at the offender, and general deterrence aims at others who might offend.",
      "Punishment makes the offender pay for the wrong, in proportion to how serious the crime was. Denunciation is the court publicly stating that the conduct is wrong.",
      "Rehabilitation helps the offender change, for example through treatment or training, so they do not reoffend. Protection keeps the community safe, for example by keeping the offender in prison.",
      "A sanction can serve several of these purposes at once, and they can pull against each other. The judge weighs them to reach a fitting sentence."
    ],
    "remember": "Judges balance five aims: punish, deter, denounce, protect and rehabilitate.",
    "a": {
      "q": "A court orders an offender to complete a drug treatment program so they can change their behaviour. Which purpose does this mainly serve?",
      "opts": ["Rehabilitation", "Punishment", "General deterrence", "Protection"],
      "why": "Treatment aims to change the offender so they do not reoffend, which is rehabilitation. Protection is the tempting wrong answer, but it keeps the community safe by removing the offender, not by changing the person.",
      "clue": "Which purpose is about changing the offender?"
    },
    "b": {
      "d": 3,
      "q": "In sentencing a fraudster to a long prison term, a judge says it should warn others who might commit similar frauds. Which purpose is the judge relying on?",
      "opts": ["General deterrence", "Specific deterrence", "Punishment", "Denunciation"],
      "why": "The warning is aimed at other people who might offend, which is general deterrence. Specific deterrence is the tempting wrong answer, but it aims to discourage this offender, not the wider public.",
      "clue": "Who is the warning meant for: the offender or others?"
    }
  },
  "leg-fines": {
    "title": "Fines",
    "card": [
      "A fine is a sanction where the offender pays a sum of money to the state. It is the least serious of the main sanctions, and it does not remove the offender's freedom.",
      "The court sets the amount by looking at the offence. A more serious offence usually brings a larger fine, up to the limit the law allows for that offence.",
      "The court also looks at the offender's ability to pay. The same fine can hurt a person on a low income much more than a person on a high income.",
      "A fine can punish the offender, deter them from reoffending and deter others from offending. It is often used for less serious offences, such as minor traffic matters."
    ],
    "remember": "A fine is money paid to the state, set by how serious the offence is and what the offender can afford.",
    "a": {
      "q": "Which statement best describes a fine?",
      "opts": [
        "Money paid to the state by the offender",
        "Money paid to the victim by the offender",
        "Unpaid work done in the community",
        "Time spent under supervision by a court officer"
      ],
      "why": "A fine is a sum of money paid to the state, not to the victim. Unpaid work and supervision are conditions of a community correction order, which is a different sanction.",
      "clue": "Think about who receives the money."
    },
    "b": {
      "d": 3,
      "q": "Two drivers in Geelong are found guilty in court of the same minor speeding offence. Sam earns a very high income. Jo is a student with little money. How does the court approach setting their fines?",
      "opts": [
        "It considers what each driver is able to pay",
        "It sets one amount, whatever each driver can pay",
        "It gives Jo a larger fine, as she has less money",
        "It looks at their incomes but not at the offence"
      ],
      "why": "The amount is set by the offence and also by the offender's ability to pay, so the court considers each driver's means. Setting one amount whatever each can pay is tempting because the offence is the same, but it ignores ability to pay.",
      "clue": "Think about what else a court looks at besides the offence."
    }
  },
  "leg-community-correction-orders": {
    "title": "Community correction orders",
    "card": [
      "A community correction order (CCO) is a sanction served in the community, not in prison. It is set out in the Sentencing Act 1991 (Vic).",
      "A court cannot impose a CCO for category 1 offences, the most serious group, such as murder. It can use one for category 2 offences only in limited cases.",
      "Every CCO has core conditions. The offender must not commit an offence punishable by imprisonment, must report to and follow directions from Corrections Victoria, must report a change of address, and must not leave Victoria without permission.",
      "The court must also add at least one condition to suit the offender and the offence, such as unpaid community work, treatment for drug, alcohol or mental health issues, supervision, or a curfew. If the offender breaks a condition without a good reason, they can be brought back to court and resentenced."
    ],
    "remember": "A CCO is served in the community, with core conditions plus ones the court adds to suit the case.",
    "a": {
      "q": "Which description best fits a community correction order?",
      "opts": [
        "A sanction served in the community, with set conditions",
        "A sum of money paid to the state by the offender",
        "A sanction that removes the offender from the community",
        "A promise by the offender to behave, with no conditions"
      ],
      "why": "A CCO is served in the community and always comes with conditions. A fine is a payment, and imprisonment removes the offender from the community. Every CCO has core conditions, so it is not an unconditional promise.",
      "clue": "Think about where the order is served and what comes with it."
    },
    "b": {
      "d": 3,
      "q": "Ravi is found guilty of an offence linked to his drug use. The court gives him a CCO with a treatment condition and unpaid work. Which statement about his CCO is correct?",
      "opts": [
        "The court set conditions aimed at why he offended",
        "Corrections Victoria set his treatment and work conditions",
        "His order has no core conditions, only the court's ones",
        "He must do his unpaid work while held in prison"
      ],
      "why": "The court adds conditions such as treatment to suit the offender and the offence, here the cause of his offending. Corrections Victoria gives directions under the order, but it is the court that adds the treatment and work conditions.",
      "clue": "Who adds the extra conditions to a CCO?"
    }
  },
  "leg-imprisonment": {
    "title": "Imprisonment",
    "card": [
      "Imprisonment is a sanction that removes the offender from the community and holds them in a prison. It is the most serious sanction a court in Victoria can impose.",
      "Courts treat it as a last resort. A judge or magistrate considers whether a less serious sanction, such as a fine or a community correction order, could meet the purposes of sentencing.",
      "Imprisonment can punish the offender and protect the community, because the offender cannot reoffend in the community while held. It can also deter others by warning them of the penalty, and denounce the crime by showing the community's disapproval.",
      "It has limits. The offender may lose a job, housing and family contact, which can make returning to the community harder. Rehabilitation programs in prison may help, but this is not certain."
    ],
    "remember": "Imprisonment is the most serious sanction, used when less serious sanctions would not be enough.",
    "a": {
      "q": "What does it mean to say imprisonment is a last resort?",
      "opts": [
        "Less serious sanctions are considered before it is imposed",
        "It can only be imposed after an offender has reoffended",
        "It is only used for offences that involve violence",
        "It is chosen when the offender cannot pay a fine"
      ],
      "why": "A last resort means a court first asks whether a less serious sanction could meet the purposes of sentencing. Prison is not limited to repeat offenders or violent crimes, and it is not a simple backup for an unpaid fine.",
      "clue": "Think about what a court looks at first."
    },
    "b": {
      "d": 3,
      "q": "Tariq has seriously assaulted two people. The judge wants to stop him harming anyone for the next few years and sends him to prison. What best explains how prison achieves this aim?",
      "opts": [
        "He cannot offend in the community while he is held",
        "The sentence warns others that the crime leads to prison",
        "The sentence shows the public disapproves of his crime",
        "Prison programs are sure to change his behaviour"
      ],
      "why": "While Tariq is held, he cannot reoffend in the community, so people are protected for the length of his sentence. Warning others is deterrence and showing disapproval is denunciation: both are real purposes, but neither stops Tariq himself. Rehabilitation in prison may help, but it is not certain.",
      "clue": "Which option is about Tariq himself, during his sentence?"
    }
  },
  "leg-alternative-approaches-sentencing": {
    "title": "Alternative approaches to sentencing",
    "card": [
      "Alternative approaches look at the reasons behind a person's offending and try to address them. The aim is to make the offender less likely to offend again.",
      [
        "Drug Court",
        "a Victorian court for some offenders whose offending is linked to drug or alcohol dependence. It can order treatment and regular testing, with close supervision by the court."
      ],
      [
        "Koori Court",
        "a Victorian court for Aboriginal and Torres Strait Islander offenders who plead guilty. Elders or respected persons take part, so sentencing is more culturally appropriate and helps reconnect the offender with community and culture."
      ],
      [
        "Diversion program",
        "a way to deal with an offence without a full court process. The accused may agree to conditions, such as counselling or an apology, and the case can then be dealt with without a conviction."
      ]
    ],
    "remember": "Alternative approaches look beyond the offence itself, aiming to reduce reoffending.",
    "a": {
      "q": "What do the Drug Court, the Koori Court and diversion programs have in common?",
      "opts": [
        "They try to address the reasons behind offending",
        "They aim to give the offender the longest sentence",
        "They only apply to people who plead not guilty",
        "They replace the need for any sanction at all"
      ],
      "why": "Each approach looks at what lies behind the offending, such as drug or alcohol dependence, and tries to reduce reoffending. They do not aim for the longest sentence, and the Koori Court needs a guilty plea.",
      "clue": "Think about what each approach tries to change in the offender's life."
    },
    "b": {
      "d": 3,
      "q": "Jack has been charged with theft. His offending is linked to heroin dependence. Which approach is most suited to the cause of his offending?",
      "opts": [
        "The Drug Court, with treatment and court supervision",
        "The Koori Court, with Elders taking part in the hearing",
        "A larger fine, to increase the penalty for him",
        "A longer prison term, to keep him away from drugs"
      ],
      "why": "The Drug Court is for offending linked to drug or alcohol dependence and can order treatment with close supervision. The Koori Court is for Aboriginal and Torres Strait Islander offenders, and nothing suggests Jack is one. A fine or prison would not address the dependence.",
      "clue": "Match the approach to the cause of Jack's offending."
    }
  },
  "leg-sentencing-another-state": {
    "title": "Sentencing in another state",
    "card": [
      "Each Australian state and territory makes its own sentencing laws. The same offence can lead to different sanctions in different places.",
      "Sanctions in every jurisdiction aim at the same purposes, such as punishment, deterrence, protecting the community and rehabilitation.",
      "Comparing Victoria with another state shows different ways to meet those purposes. For example, a state may use a different type of order or set different limits on a sanction.",
      "A comparison can show what works well in one place. It can also give reasons to reform the law in another."
    ],
    "remember": "Jurisdictions share sentencing purposes but may use different sanctions to meet them.",
    "a": {
      "q": "Why is it useful to compare Victoria's sentencing with that of another state?",
      "opts": [
        "It shows other ways of meeting the same sentencing purposes",
        "It shows that other states pursue different purposes",
        "It shows that Victorian courts must follow that state's laws",
        "It shows that one offence gets the same sanction everywhere"
      ],
      "why": "The purposes are shared, so a comparison shows different ways to reach them, which can suggest reform. The tempting option about different purposes is wrong, because every jurisdiction aims at the same purposes. Each state also makes its own laws, so outcomes can differ and one state does not bind another.",
      "clue": "Think about what stays the same and what differs between states."
    },
    "b": {
      "d": 3,
      "q": "A law reform group notes that another state uses a type of order that Victoria does not. The order aims to rehabilitate offenders. What does this comparison show?",
      "opts": [
        "It shows another way to meet a purpose Victoria shares",
        "It shows Victoria's courts must adopt that state's order",
        "It shows Victoria has no way to rehabilitate offenders",
        "It shows the other state pursues different purposes"
      ],
      "why": "Rehabilitation is a shared purpose, and the other state meets it with a different tool. The comparison may support reform, but it does not bind Victoria. The tempting wrong option says the purposes differ, but they are the same in every jurisdiction.",
      "clue": "The purpose is the same. What differs is the method."
    }
  },
  "leg-purposes-civil-law": {
    "title": "Purposes of civil law",
    "card": [
      "Civil law deals with disputes between people, groups or businesses. It protects their rights, such as the right to have the other party keep their promise in a contract, or to be free from harm caused by someone else's carelessness.",
      "When someone's rights have been infringed, civil law aims to put the wronged party back where they were before the wrong. It usually does this by ordering the other party to pay money, called damages.",
      "Civil law covers many areas. Negligence deals with careless harm to a person or their property. Defamation deals with harm to a person's reputation. Contract law deals with broken agreements. Nuisance deals with interference with the use of land.",
      "The aim is to fix the harm to the wronged party. It is not mainly to punish the wrongdoer, which is the focus of criminal law."
    ],
    "remember": "Civil law protects rights and puts the wronged party back where they were.",
    "a": {
      "q": "What is the main purpose of an order to pay damages in a civil case?",
      "opts": [
        "To restore the wronged party to their earlier position",
        "To punish the wrongdoer for breaking the law",
        "To warn the public against similar behaviour",
        "To decide whether the wrongdoer goes to prison"
      ],
      "why": "Civil law aims to put the wronged party back where they were, and money is the usual way to do this. Punishing the wrongdoer is the focus of criminal law, so it is not the main purpose here.",
      "clue": "Think about who the civil law is trying to help."
    },
    "b": {
      "d": 2,
      "q": "Sam's neighbour runs a loud workshop each night, so Sam cannot use his backyard in peace. Which area of civil law does this dispute fall under?",
      "opts": ["Nuisance", "Defamation", "Contract", "Negligence"],
      "why": "Nuisance deals with interference with a person's use of their land, and the noise stops Sam enjoying his yard. Negligence is tempting, but no one has been carelessly harmed and nothing has been carelessly damaged. The problem is the ongoing interference with the use of land.",
      "clue": "Look at what the noise interferes with."
    }
  },
  "leg-breach-causation-loss": {
    "title": "Breach, causation and loss",
    "card": [
      "To win a civil claim, the plaintiff usually must show three things: a breach, causation and a loss. If one is missing, the claim will usually fail or gain little.",
      ["Breach", "the defendant broke a legal duty or obligation, such as a duty of care or a term of a contract."],
      [
        "Causation",
        "the breach caused the harm. The harm must have happened because of the breach, not for some other reason."
      ],
      [
        "Loss",
        "the plaintiff suffered real harm, such as injury, damage to property or lost income. A breach with no loss leaves little to compensate."
      ]
    ],
    "remember": "Broken duty, harm caused by it, real loss: without one, a claim usually fails or gains little.",
    "a": {
      "q": "Which situation is a loss, as needed for a civil claim?",
      "opts": [
        "A cyclist cannot work for a month because of a broken arm",
        "A driver ignores a stop sign but no one is nearby",
        "A shop promises delivery by Friday and delivers on Monday",
        "A neighbour plays loud music but you are away all week"
      ],
      "why": "A month of lost work is real harm, in the form of injury and lost income. Ignoring a stop sign may be a breach, but with no harm to anyone there is no loss.",
      "clue": "Look for actual harm, not just a rule being broken."
    },
    "b": {
      "d": 3,
      "q": "Leo hires Priya to paint his fence. She finishes a week late, which breaches the contract. The fence is later damaged by a storm. Leo sues for the storm damage. Why is his claim likely to fail?",
      "opts": [
        "The breach did not cause the storm damage",
        "There was no breach of the contract",
        "Leo did not suffer any loss",
        "Storm damage cannot be claimed in court"
      ],
      "why": "Priya's lateness was a breach, and the fence was damaged, so a loss exists. But the storm caused the damage, not the late work, so causation is missing. Without causation, his claim for the storm damage is likely to fail.",
      "clue": "Ask what actually caused the damage."
    }
  },
  "leg-burden-standard-proof-civil": {
    "title": "Burden and standard of proof in civil cases",
    "card": [
      "The burden of proof is the duty to prove the case. In a civil case, it falls on the plaintiff, who brings the claim.",
      "The standard of proof is how strongly the case must be proved. In a civil case, it is the balance of probabilities.",
      "On the balance of probabilities means it is more likely than not that the plaintiff's version is true. The court weighs the evidence from both sides to decide this.",
      "The defendant does not have to prove that they are not liable. If the plaintiff does not meet the standard, the claim fails."
    ],
    "remember": "In a civil case, the plaintiff must show their case is more likely true than not.",
    "a": {
      "q": "Which statement best describes the standard of proof in a civil case?",
      "opts": [
        "The plaintiff's version is more likely true than not",
        "The plaintiff's version is certain beyond any doubt",
        "The defendant must show that they are not at fault",
        "The plaintiff's version has some chance of being true"
      ],
      "why": "The balance of probabilities means the plaintiff's case is more probable than not. Certainty beyond any doubt is too high a standard for a civil case, and a mere chance of being true is too low.",
      "clue": "Picture a set of scales tipping one way, even slightly."
    },
    "b": {
      "d": 3,
      "q": "Dev sues a builder in the County Court of Victoria for faulty work. The judge thinks it is slightly more likely than not that the work was faulty. What is the result?",
      "opts": [
        "Dev meets the standard of proof and can succeed",
        "Dev fails, because the judge has some doubt",
        "Dev fails, because the fault is not proven beyond doubt",
        "Dev must wait for the builder to prove the work was sound"
      ],
      "why": "A civil plaintiff only needs to show the claim is more probable than not. A slight lean in Dev's favour is enough, and some doubt remaining does not defeat the claim. The builder does not have to prove that the work was sound.",
      "clue": "Does the plaintiff need to remove all doubt?"
    }
  },
  "leg-parties-civil-dispute": {
    "title": "Parties to a civil dispute",
    "card": [
      [
        "Plaintiff",
        "the person or group who brings the civil claim. They say they have been wronged and ask the court for a remedy."
      ],
      [
        "Defendant",
        "the person or group who answers the claim. They may be an individual, a business or a government body."
      ],
      "A civil dispute is between these two parties. The plaintiff starts it, and the defendant responds to it.",
      [
        "Class action",
        "a claim brought by one person on behalf of a group of at least seven people who have been wronged in a similar way. The group members share the same type of complaint against the same defendant."
      ]
    ],
    "remember": "The plaintiff sues and the defendant answers. A class action lets one person act for a group.",
    "a": {
      "q": "Which description fits the defendant in a civil dispute?",
      "opts": [
        "The party who responds to the claim made against them",
        "The party who starts the claim and asks for a remedy",
        "The party who decides which side wins the dispute",
        "The party who acts for a group in a class action"
      ],
      "why": "The defendant is the party who answers the claim. Starting the claim and asking for a remedy is the plaintiff's role, and so is acting for a group in a class action. The defendant is the one the claim is made against.",
      "clue": "Think about who is being claimed against."
    },
    "b": {
      "d": 3,
      "q": "Hundreds of customers of a Geelong gym were overcharged in the same way. Ana brings one claim for all of them against the gym. Who is the plaintiff, and what is the claim called?",
      "opts": [
        "Ana, in a class action against the gym",
        "The gym, in a class action against Ana",
        "Ana, in a claim where each customer is a defendant",
        "The customers, with the gym as the plaintiff"
      ],
      "why": "Ana starts the claim, so she is the plaintiff. She acts for a group with a similar complaint against the same defendant, so it is a class action. The gym answers the claim, so it is the defendant, and the other customers are not defendants.",
      "clue": "Who starts the claim, and who answers it?"
    }
  },
  "leg-limitation-actions": {
    "title": "Limitation of actions",
    "card": [
      "A limitation period is the time limit for starting a civil claim. It is set by law, in Victoria mainly by the Limitation of Actions Act 1958 (Vic).",
      "The length depends on the type of claim. Many claims, such as those in contract, have a period of six years.",
      "The period usually runs from the day the cause of action arises, for example when the breach of contract happens. If the plaintiff files after it ends, the defendant can raise the time limit as a defence and the claim can be lost.",
      "Time limits keep evidence fresh and give defendants certainty that old disputes will not suddenly return. Some situations, such as claims by children, have different rules."
    ],
    "remember": "A civil claim must be started within the time the law allows, or it can be lost.",
    "a": {
      "q": "Why does the law set limitation periods for civil claims?",
      "opts": [
        "So claims are brought while evidence is still fresh",
        "So defendants never have to pay for any harm they cause",
        "So only claims about contracts can reach a court",
        "So plaintiffs must prove their case more strongly"
      ],
      "why": "Over time witnesses forget and documents are lost, so a time limit helps keep evidence reliable and gives defendants certainty. It does not remove liability for harm brought in time, and it does not change how strongly a plaintiff must prove the case.",
      "clue": "Think about what happens to witnesses and records as years pass."
    },
    "b": {
      "d": 2,
      "q": "Sam's builder breached their contract in 2015. Sam files a claim in 2024, nine years later, where the period is six years. What is the likely result?",
      "opts": [
        "The claim can be lost because it was filed too late",
        "The claim succeeds because the breach really happened",
        "The claim succeeds because the time limit is only a guide",
        "The claim is moved to a criminal court instead"
      ],
      "why": "The six-year period ended before Sam filed, so the defendant can use the time limit as a defence and the claim can be lost. It does not matter that the breach really happened, because the time limit is a separate bar set by law, not a guide.",
      "clue": "Count the years between the breach and the filing."
    }
  },
  "leg-justice-civil-disputes": {
    "title": "Justice in civil disputes",
    "card": [
      [
        "Fairness",
        "The process is fair. Each side knows the case against it, can put its own side and has the case decided without bias."
      ],
      [
        "Equality",
        "Everyone is treated equally in the process, with the same chance to be heard. Equality does not mean every party gets the same outcome."
      ],
      [
        "Access",
        "People can understand their rights and use the system. Cost, distance, delay and complex rules can block access."
      ],
      "A civil dispute can fail on one of these three without failing on the others. For example, a fair hearing is of no use to a person who cannot afford to bring the case."
    ],
    "remember": "A just civil dispute needs a fair process, equal treatment and access to the system.",
    "a": {
      "q": "Which situation is mainly a problem of access in a civil dispute?",
      "opts": [
        "A tenant cannot afford the fees to start a claim",
        "A judge shows bias toward one side at a hearing",
        "One party is not told the case against it",
        "One party is given less time to speak than the other"
      ],
      "why": "Being unable to afford to start a claim stops the person from using the system at all. The other three are problems with how the hearing itself is run, so they concern fairness or equality. Cost is the barrier to access.",
      "clue": "Which person is kept out before any hearing begins?"
    },
    "b": {
      "d": 3,
      "q": "Priya has a strong claim against a builder. The court process is fair, but the rules are so complex she cannot work out how to file it. Which idea is most clearly lacking?",
      "opts": [
        "Access, as she cannot use the system",
        "Fairness, as the court is biased against her",
        "Equality, as the builder gets a better result",
        "Fairness, as she was not told of the claim"
      ],
      "why": "The process itself is fair, but Priya cannot use it because the rules are too complex. That is a failure of access. The tempting option is fairness, but nothing in the case shows bias or a denied chance to be heard.",
      "clue": "The process is fine. What stops Priya reaching it?"
    }
  },
  "leg-ways-settling-civil-disputes": {
    "title": "Ways of settling civil disputes",
    "card": [
      [
        "Negotiation",
        "The parties talk directly, sometimes with their lawyers, and try to agree. No neutral third party is involved."
      ],
      [
        "Mediation",
        "A neutral mediator helps the parties talk and reach their own agreement. The mediator does not decide the outcome."
      ],
      [
        "Conciliation",
        "A neutral conciliator helps the parties and may suggest terms for settlement. The parties still make the final choice."
      ],
      [
        "Arbitration",
        "A neutral arbitrator hears both sides and makes a decision that is binding on the parties. Parties often agree to use it, and it is still not a full trial in court."
      ]
    ],
    "remember": "Only an arbitrator decides. Mediators and conciliators help the parties reach their own agreement.",
    "a": {
      "q": "In which method does a neutral third person hear both sides and make a decision for them?",
      "opts": ["Arbitration", "Mediation", "Negotiation", "Conciliation"],
      "why": "An arbitrator hears both sides and makes a binding decision. A mediator only helps the parties reach their own agreement. A conciliator may suggest terms, but the parties still make the final choice.",
      "clue": "Which person acts a little like a judge, but outside court?"
    },
    "b": {
      "d": 2,
      "q": "Two neighbours in Geelong argue over a fence. They meet with no one else and agree to share the cost. Which method did they use?",
      "opts": ["Negotiation", "Mediation", "Conciliation", "Arbitration"],
      "why": "They talked directly and reached agreement with no neutral third party helping. Mediation would need a neutral mediator. The other two also involve a neutral third person.",
      "clue": "Was any neutral person in the room?"
    }
  },
  "leg-bodies-that-settle-disputes": {
    "title": "Bodies that settle disputes",
    "card": [
      "Many civil disputes are settled by bodies outside the courts. These bodies are usually quicker, cheaper and less formal than a court.",
      [
        "Tribunal",
        "a body that hears both sides and makes a decision. The Victorian Civil and Administrative Tribunal (VCAT) hears matters such as tenancy and building disputes."
      ],
      [
        "Ombudsman",
        "a body that investigates complaints about the actions of an organisation, such as a government department. It looks into the complaint and does not act as a judge."
      ],
      [
        "Complaints body",
        "a body such as Consumer Affairs Victoria that gives information about consumer and tenancy rights and can help the parties reach agreement. It is not a court."
      ]
    ],
    "remember": "Tribunals decide, ombudsmen investigate and complaints bodies inform and assist, all without going to court.",
    "a": {
      "q": "Which description best fits the role of VCAT?",
      "opts": [
        "It hears both sides and decides tenancy disputes",
        "It investigates complaints about a government department",
        "It gives consumers information and helps parties agree",
        "It hears the largest civil claims in front of a jury"
      ],
      "why": "VCAT is a tribunal, so it hears both sides and makes a decision. Investigating complaints is the role of an ombudsman, and giving information and help is what a body such as Consumer Affairs Victoria does.",
      "clue": "A tribunal is the body that makes a decision."
    },
    "b": {
      "d": 3,
      "q": "Priya believes her energy provider billed her wrongly. She wants her complaint investigated, not a judge's ruling. Which body suits her aim best?",
      "opts": ["An ombudsman", "VCAT", "The Supreme Court", "The County Court"],
      "why": "An ombudsman investigates complaints about the actions of an organisation, which is what Priya wants. VCAT is tempting because it settles disputes, but it hears both sides and decides, and the courts are formal and not needed here.",
      "clue": "Which body looks into complaints rather than deciding like a judge?"
    }
  },
  "leg-courts-civil-disputes": {
    "title": "Courts in civil disputes",
    "card": [
      "Victoria has three levels of court that hear civil disputes. The level depends on the size and complexity of the claim.",
      ["Magistrates' Court", "hears smaller claims, such as a dispute over an unpaid bill for a modest amount."],
      [
        "County Court",
        "hears larger claims than the Magistrates' Court. It sits above the Magistrates' Court and below the Supreme Court in the court hierarchy."
      ],
      ["Supreme Court", "hears the largest and most complex claims. It is the highest court in Victoria."]
    ],
    "remember": "The bigger and more complex the claim, the higher the court.",
    "a": {
      "q": "Which Victorian court hears the largest and most complex civil claims?",
      "opts": ["The Supreme Court", "The County Court", "The Magistrates' Court", "The Children's Court"],
      "why": "The Supreme Court is the highest Victorian court and hears the largest and most complex claims. The County Court is tempting, but it hears claims larger than those in the Magistrates' Court and sits below the Supreme Court.",
      "clue": "Think of the top of the three levels."
    },
    "b": {
      "d": 2,
      "q": "Tomas runs a cleaning business and sues a customer for a small unpaid invoice. Which court is the best fit for this claim?",
      "opts": ["The Magistrates' Court", "The Supreme Court", "The County Court", "The Coroners Court"],
      "why": "A small unpaid invoice is a smaller claim, which the Magistrates' Court hears. The Supreme Court is wrong because it is for the largest and most complex claims.",
      "clue": "Is the claim small, or large and complex?"
    }
  },
  "leg-jury-civil-trial": {
    "title": "The jury in a civil trial",
    "card": [
      "A civil trial may be heard with a jury. A civil jury has six people, and not every civil trial has one.",
      "The jury decides the facts. It weighs the evidence and decides what happened.",
      "The jury also decides whether the defendant is liable, which means legally responsible for the harm.",
      "In some cases the jury also decides the damages, the amount of money awarded to the plaintiff. The judge manages the trial and explains the law."
    ],
    "remember": "A civil jury of six decides the facts and liability, and sometimes the damages.",
    "a": {
      "q": "How many people make up a jury in a civil trial?",
      "opts": ["Six", "Four", "Twelve", "Three"],
      "why": "A civil jury has six people. Twelve is tempting because it is the usual number in a criminal trial, but it is not the number in a civil trial.",
      "clue": "It is fewer than in a criminal jury."
    },
    "b": {
      "d": 3,
      "q": "In a civil trial with a jury, who decides whether the defendant is liable?",
      "opts": ["The jury", "The judge alone", "The plaintiff", "A tribunal member"],
      "why": "The jury decides the facts and whether the defendant is liable. The judge is tempting, but the judge manages the trial and explains the law, while the jury makes the decision on liability.",
      "clue": "Who decides the facts in a jury trial?"
    }
  },
  "leg-groups-facing-difficulties-civil": {
    "title": "Groups facing difficulties in civil justice",
    "card": [
      [
        "First Nations people",
        "may face cultural barriers, distrust of the system and a lack of services that fit their needs."
      ],
      ["Low incomes", "People on low incomes may not be able to pay for lawyers, fees or time off work."],
      [
        "Young people",
        "may not know their rights, and may find it hard to bring a claim without the help of an adult."
      ],
      [
        "Rural and remote",
        "People far from cities may have to travel long distances to reach courts, lawyers and other services."
      ]
    ],
    "remember": "Cost, culture, age and distance can each make civil justice hard to reach.",
    "a": {
      "q": "Which barrier is most likely to affect a person living in a remote town?",
      "opts": [
        "Long travel to reach courts and lawyers",
        "Not knowing their rights because of their age",
        "Distrust of the system based on past experience",
        "Being unable to pay for a lawyer"
      ],
      "why": "Distance means travel to reach courts and lawyers, which is the barrier the card links to rural and remote people. Age, cultural distrust and cost are linked to the other groups, though they can affect anyone.",
      "clue": "Think about where the remote town is, not who lives there."
    },
    "b": {
      "d": 3,
      "q": "Kai, aged 16, lives in Geelong and is owed wages by a café. He does not know he has a right to claim them. Which difficulty fits best?",
      "opts": [
        "Young people may not know their rights",
        "Remote people may have to travel far to court",
        "People on low incomes may not afford lawyers",
        "First Nations people may face cultural barriers"
      ],
      "why": "Kai does not know he has a right to claim, and the card links not knowing your rights to young people, which fits a 16 year old. Nothing says he lives far from a city, cannot pay for help or faces cultural barriers. Cost is tempting because he is owed money, but the problem described is a lack of knowledge.",
      "clue": "What does Kai lack: money, distance or knowledge?"
    }
  },
  "leg-human-rights-are-2": {
    "title": "What human rights are",
    "card": [
      "Human rights are basic rights and freedoms that every person has because they are human. They do not depend on a person's nationality, race, religion or status.",
      "The idea grew over centuries, from earlier documents such as Magna Carta in 1215. After the Second World War, the world saw the harm done when governments ignored people's dignity.",
      "In 1948 the United Nations General Assembly adopted the Universal Declaration of Human Rights (UDHR). It was the first global statement of the rights all people should have.",
      "The UDHR is a declaration, which sets out shared standards. It is not itself a treaty that binds countries."
    ],
    "remember": "Human rights belong to everyone as people, and the UDHR of 1948 set them out.",
    "a": {
      "q": "Why are human rights described as universal?",
      "opts": [
        "Every person has them simply by being human",
        "Every country has agreed to enforce them in court",
        "Every person receives them when they become a citizen",
        "Every person has them once a parliament passes a law"
      ],
      "why": "Human rights belong to people because they are human, whatever their nationality or status. Citizenship is a tempting answer, but the card says rights do not depend on nationality.",
      "clue": "Think about what a person needs to have these rights."
    },
    "b": {
      "d": 3,
      "q": "Leila says the UDHR in 1948 created human rights for the first time, so no one had them before it. What is the best reply?",
      "opts": [
        "The idea grew from history and the UDHR set it out",
        "The UDHR gave rights only to people in member countries",
        "The UDHR was a treaty that gave rights legal force",
        "Rights existed only for people who lived in democracies"
      ],
      "why": "The idea of human rights grew over centuries, from documents such as Magna Carta, and the UDHR in 1948 set the rights out in a global statement. The treaty option is tempting, but the UDHR is a declaration, not a binding treaty.",
      "clue": "Check what the card says about the centuries before 1948."
    }
  },
  "leg-rights-statute-common-law": {
    "title": "Rights in statute and common law",
    "card": [
      [
        "Statute law",
        "Law made by parliament. Parliaments can protect rights by passing acts, such as anti-discrimination acts, that ban unfair treatment in areas like work and education."
      ],
      [
        "Common law",
        "Law developed by judges in court cases. Courts can protect rights through their decisions, such as the right to a fair trial."
      ],
      "Parliament can change or override common law by passing a statute. A court cannot override a valid statute by common law.",
      "Both sources can protect rights. A person whose rights are breached may use a statute, or a court may apply a common law principle."
    ],
    "remember": "Parliaments protect rights by making statutes. Courts protect them through common law decisions.",
    "a": {
      "q": "Which example shows a right being protected by statute law?",
      "opts": [
        "Parliament passes an act banning disability discrimination",
        "A judge applies a rule from earlier court decisions",
        "A court decides a case on a fair trial principle",
        "A tribunal member gives a personal opinion on fairness"
      ],
      "why": "A statute is made by parliament, and an anti-discrimination act is one. The judge's rule and the fair trial decision come from courts, so they are common law. A personal opinion is not law.",
      "clue": "Who makes statute law?"
    },
    "b": {
      "d": 3,
      "q": "A court's common law ruling gives a person less protection than they want. Parliament then passes an act giving more protection. What is the effect?",
      "opts": [
        "The statute prevails over the common law ruling",
        "The common law ruling prevails over the statute",
        "The two cancel out and neither applies",
        "The court must first approve the statute"
      ],
      "why": "Parliament can change or override common law by passing a statute. The common law ruling does not defeat a valid statute, and courts do not need to approve it first.",
      "clue": "Which source can change the other?"
    }
  },
  "leg-victorian-charter-human-rights": {
    "title": "The Victorian Charter of Rights",
    "card": [
      "The Charter of Human Rights and Responsibilities Act 2006 (Vic) is a Victorian statute. It lists the human rights that the Victorian Parliament has chosen to protect, such as freedom of expression and the right to life.",
      [
        "Reading laws",
        "Courts and tribunals must interpret Victorian laws in a way that is consistent with the listed rights, as long as that fits the purpose of the law."
      ],
      [
        "Public authorities",
        "Bodies such as Victoria Police, local councils and government departments are public authorities. They must act compatibly with the rights and give proper consideration to them when they make decisions."
      ],
      "The Charter is an ordinary Act of the Victorian Parliament, not part of the Australian Constitution. It applies to Victorian laws and Victorian public authorities."
    ],
    "remember": "The Charter lists rights, and it shapes how Victorian laws are read and how public authorities decide.",
    "a": {
      "q": "A Victorian council is deciding how to handle a request from a community group. What does the Charter require of the council?",
      "opts": [
        "To give proper consideration to the listed rights",
        "To ask the High Court to approve its decision",
        "To follow the rights set out in the Constitution",
        "To apply the rights only if a court orders it"
      ],
      "why": "A local council is a public authority, so the Charter requires it to act compatibly with the listed rights and to consider them when deciding. The Charter is a Victorian statute, not part of the Constitution, and the duty applies without any court order.",
      "clue": "What kind of body is a local council under the Charter?"
    },
    "b": {
      "d": 3,
      "q": "A court in Victoria is unsure what a word in a state law means. One reading limits a right listed in the Charter. The other does not and still fits the law's purpose. What should the court do?",
      "opts": [
        "Prefer the reading that is consistent with the right",
        "Prefer the reading that limits the right",
        "Send the law back to the Victorian Parliament",
        "Apply the Constitution in place of the state law"
      ],
      "why": "The Charter requires courts to interpret Victorian laws consistently with the listed rights, where that fits the law's purpose. Here one reading does both, so the court should choose it. The Charter shapes how a law is read. It does not make the court hand the law back to parliament or swap in the Constitution.",
      "clue": "Think of the duty the Charter places on courts when they read laws."
    }
  },
  "leg-australia-international-rights": {
    "title": "International treaties and Australia",
    "card": [
      "A treaty is a formal agreement between countries. A human rights treaty sets out rights that the countries agree to respect.",
      "Australia first signs a treaty and then ratifies it. Ratifying binds Australia as a nation under international law. Both steps are taken by the executive government.",
      "A treaty does not automatically become part of Australian law. It binds people and courts here only when parliament passes a statute that includes it.",
      "Example: Australia is a party to the International Covenant on Civil and Political Rights. Its rights can be enforced in Australian courts only to the extent that parliament has put them into Australian law."
    ],
    "remember": "A ratified treaty binds Australia internationally. It binds locally only once parliament legislates.",
    "a": {
      "q": "Australia ratifies a human rights treaty, but parliament has passed no law about it. What is the effect in Australian courts?",
      "opts": [
        "The treaty does not bind people or courts here",
        "The treaty binds courts here as soon as it is ratified",
        "The treaty binds only the High Court, not other courts",
        "The treaty binds only public servants, not other people"
      ],
      "why": "A treaty becomes enforceable in Australian courts only when parliament makes it part of Australian law. Ratifying it binds Australia internationally, but ratification alone does not create rights that a court here can enforce.",
      "clue": "Which body has to act before a treaty becomes local law?"
    },
    "b": {
      "d": 3,
      "q": "Priya says a treaty Australia ratified last year lets her sue a business in a Victorian court. Parliament has not passed any law about it. Why is she likely to fail?",
      "opts": [
        "Parliament has not made the treaty part of Australian law",
        "Treaties apply only to governments, never to businesses",
        "Only the High Court can hear cases about treaties",
        "Australia has not agreed to be bound by the treaty"
      ],
      "why": "Priya is likely to fail because no statute has made the treaty part of Australian law, so a court here cannot enforce it. The option saying Australia has not agreed to be bound is tempting, but ratifying does bind Australia under international law. That is a different thing from binding people locally.",
      "clue": "Ratifying binds Australia as a nation. What else is needed for local courts?"
    }
  },
  "leg-studying-human-rights-issue": {
    "title": "Studying a human rights issue",
    "card": [
      "A human rights issue is studied by picking one right and looking at how it applies in Australia. The right to vote is one example. Freedom of expression is another.",
      "Studying how the right developed means tracing how it changed over time. For voting, this includes who was first allowed to vote and who was added later.",
      "Studying how the right is protected means finding the laws that protect it. These can be Acts of Parliament, the Australian Constitution and court decisions.",
      "Studying an issue also asks how well the right is protected today, and whether some people still miss out on it."
    ],
    "remember": "Study one right by asking how it developed, which laws protect it, and how well it is protected.",
    "a": {
      "q": "A student studies the right to vote in Australia. Which task is part of studying how the right developed?",
      "opts": [
        "Tracing how the group of people allowed to vote changed",
        "Listing the penalties for breaking a particular voting law",
        "Comparing voting rules in two different school elections",
        "Predicting which party will win the next federal election"
      ],
      "why": "Development is about change over time, such as who gained the vote and when. Listing penalties looks at how a law is enforced, not at how the right changed over time.",
      "clue": "Development means change over time."
    },
    "b": {
      "d": 2,
      "q": "Ravi is studying freedom of expression in Australia. He reads an Act of Parliament and a High Court decision that deal with this right. What is Ravi studying?",
      "opts": [
        "Which laws protect the right",
        "How the right developed over time",
        "How people disagree about the right",
        "Which people campaigned for the right"
      ],
      "why": "Acts of Parliament and court decisions are laws that can protect a right, so Ravi is studying its protection. Development would mean looking at how the right changed over time, which is a different task.",
      "clue": "An Act and a court decision are both kinds of law."
    }
  },
  "leg-conflicting-attitudes-right": {
    "title": "Conflicting attitudes to a right",
    "card": [
      "People and groups often agree that a right matters but disagree on how far it should go. Their attitudes come from their values, experiences and interests.",
      "Rights can clash with each other. Freedom of expression can clash with a person's right to a good reputation, or with the right to be free from discrimination.",
      "Rights can also clash with the wider interests of the community, such as safety and public order. Lawmakers have to decide where to draw the line.",
      "Because of this, most rights are not absolute. A right can be limited by law where the limit is reasonable, and different groups may argue that the limit is too wide or too narrow."
    ],
    "remember": "People agree a right matters but disagree on its limits, because rights are balanced against other rights and community interests.",
    "a": {
      "q": "Two groups both support freedom of expression. One wants limits on hateful speech and the other wants none. What does this show?",
      "opts": [
        "They disagree on how far the right should go",
        "They disagree that the right exists at all",
        "They share the same view of the right's limits",
        "Their attitudes have no basis in their values"
      ],
      "why": "Both groups accept the right. They differ on its limits, which is a conflict of attitudes about how far it should go. The option about not accepting the right is wrong because both groups support it.",
      "clue": "Do both groups accept the right itself?"
    },
    "b": {
      "d": 3,
      "q": "A council bans protest marches on a main highway at peak hour to stop crashes and traffic chaos. Organiser Priya says the ban is too wide. What clash is this?",
      "opts": [
        "A right weighed against safety and public order",
        "A right weighed against another person's right",
        "A dispute over whether the right should exist",
        "A dispute over whether the right has any limits"
      ],
      "why": "The council limits the right to protest to protect safety and public order, which are interests of the wider community. No other person's right, such as reputation, is at stake. Priya accepts some limit but says this one is too wide, so she is not denying the right or all limits.",
      "clue": "Look at the reason the council gives for its ban."
    }
  },
  "leg-reforming-rights-protection": {
    "title": "Reforming rights protection",
    "card": [
      "Reform means a change to make a right better protected. In Australia, reform can come through parliament, a charter of rights or the courts.",
      [
        "New laws",
        "parliament can pass a new Act or change an old one. For example, an anti-discrimination Act can give people a way to complain when their rights are not respected."
      ],
      [
        "Charter of rights",
        "a law that lists certain rights and says how governments and public bodies must treat them. Victoria has one, the Charter of Human Rights and Responsibilities Act 2006."
      ],
      [
        "Courts",
        "when judges decide a case, they may interpret a law in a way that protects a right. This can change how the law is applied in later cases."
      ]
    ],
    "remember": "Rights protection can be reformed by parliament, by a charter, or by court decisions.",
    "a": {
      "q": "What does a charter of rights do?",
      "opts": [
        "Lists rights and how public bodies must treat them",
        "Records how judges read unclear laws in past cases",
        "Protects one right, such as freedom from discrimination",
        "Sets rules for private businesses, not governments"
      ],
      "why": "A charter is a law that lists a set of rights and says how governments and public bodies must treat them. Recording how judges read laws describes reform through the courts, not a charter. A charter also covers many rights, not just one.",
      "clue": "Think about who a charter tells how to act."
    },
    "b": {
      "d": 3,
      "q": "A judge hears a case and reads an unclear law so that it protects a person's right. No new Act is passed and no charter is relied on. Other judges then follow this reading in later cases. What kind of reform is this?",
      "opts": [
        "Reform through the courts",
        "Reform through a new Act of parliament",
        "Reform through a charter of rights",
        "Reform through a change of government"
      ],
      "why": "The change came from a judge interpreting a law in a case, and it then shaped later cases. No new Act was passed, so it is not reform through parliament. The question says no charter was relied on, so reform through a charter is also wrong.",
      "clue": "Who made the change, and in what setting?"
    }
  },
  "leg-people-who-changed-rights": {
    "title": "People who changed rights",
    "card": [
      "Rights are not only set by governments. Individuals and groups have pushed parliaments and courts to protect rights better.",
      [
        "Cases",
        "a person takes a dispute to court. A ruling can change how a right is understood and applied. Eddie Mabo's case led the High Court in 1992 to recognise native title."
      ],
      [
        "Campaigns",
        "a group organises over time to win public support and press for law change. The 1967 referendum campaign led to a change to the Constitution. Aboriginal and Torres Strait Islander people were counted in official population figures and brought under Commonwealth law-making power."
      ],
      [
        "Protest",
        "people take public action, such as marches and rallies, to show strong support for change and draw attention to a right."
      ]
    ],
    "remember": "Change in rights can come from people acting, not only from governments.",
    "a": {
      "q": "Eddie Mabo took a dispute about land to the High Court, and the Court recognised native title in 1992. Which method of change does this show?",
      "opts": [
        "A case that changed how a right is applied",
        "A campaign run to win a public vote",
        "A protest march to draw public attention",
        "A law passed by parliament without any court"
      ],
      "why": "Mabo used a court case, and the High Court's ruling changed how land rights were recognised. It is not a protest, because the change came from a court ruling rather than from public action to draw attention.",
      "clue": "Where was the dispute decided?"
    },
    "b": {
      "d": 3,
      "q": "A group in a town spends years gathering signatures, speaking to the media and meeting MPs until parliament passes a law protecting a right. What method is this mainly?",
      "opts": [
        "A campaign, as the group worked over time on many fronts",
        "A case, as the group sought a ruling on its dispute",
        "A protest, as the group marched to show its support",
        "A referendum, as the group asked voters to decide"
      ],
      "why": "The group spent years building support and persuading MPs, which makes it a campaign. It is not a case, because no court ruled on a dispute. It is not a protest, because the group did not hold marches or rallies.",
      "clue": "Look at how long the group worked and who it aimed to persuade."
    }
  },
  "leg-summary-indictable-offences-unit": {
    "title": "Summary and indictable offences",
    "card": [
      [
        "Summary offence",
        "a minor offence, such as a minor traffic offence or offensive behaviour in a public place. It is heard by a magistrate in the Magistrates' Court of Victoria, with no jury."
      ],
      [
        "Indictable offence",
        "a serious offence, such as murder, armed robbery or large-scale drug trafficking. It can be tried by a judge and jury in the County Court or the Supreme Court of Victoria."
      ],
      "Many indictable offences start in the Magistrates' Court, where a magistrate handles early steps. The most serious ones then go to the County Court or Supreme Court for trial.",
      "The type of offence depends on how serious the law treats it. It does not depend on how the accused pleads or how long the case takes."
    ],
    "remember": "Minor offences go to a magistrate. Serious offences can go to a judge and jury.",
    "a": {
      "q": "Which feature usually applies to a summary offence in Victoria?",
      "opts": [
        "It is heard by a magistrate without a jury",
        "It is tried by a judge and jury",
        "It is heard in the Supreme Court of Victoria",
        "It is decided by the police, not a court"
      ],
      "why": "Summary offences are minor and are heard by a magistrate alone. A jury is linked to indictable offences, so the second option is the tempting mistake.",
      "clue": "Think about who hears minor matters and whether a jury is used."
    },
    "b": {
      "d": 3,
      "q": "Dev is charged with armed robbery. His first appearance is in the Magistrates' Court of Victoria. How is the offence best classed, and why?",
      "opts": [
        "Indictable, because it is serious and can go before a jury",
        "Summary, because it first appears in the Magistrates' Court",
        "Summary, because Dev may plead guilty to the charge",
        "Indictable, because a magistrate hears it without a jury"
      ],
      "why": "The law treats armed robbery as serious, so it is indictable and can be tried by a judge and jury. Appearing first in the Magistrates' Court does not make an offence summary, because many indictable offences begin there.",
      "clue": "Where a case first appears may not tell you its type."
    }
  },
  "leg-principles-criminal-justice": {
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
      "q": "Under the principles of criminal justice, who carries the burden of proof in a Victorian criminal trial, and what standard must they meet?",
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
      "q": "Jaya is on trial in the County Court in Melbourne for armed robbery of a service station in Footscray. The jury thinks she probably did it but still has a reasonable doubt. What should the verdict be?",
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
  "leg-fairness-justice-system": {
    "title": "Fairness in the justice system",
    "card": [
      "In the VCE study design, fairness is about the processes used to reach an outcome. It does not mean everyone gets the result they want.",
      [
        "Independent decision-maker",
        "the person or body deciding the case is impartial and free from outside influence, such as pressure from the government or a party."
      ],
      [
        "Knowing the case",
        "each party has a chance to know the case against them and the evidence behind it, so they can prepare a response."
      ],
      [
        "Fair hearing",
        "each party has a chance to present their side, to question the other side's evidence, and to be heard before a decision is made."
      ]
    ],
    "remember": "A fair process is impartial, open about the case and lets each side be heard.",
    "a": {
      "q": "Which of these best shows fairness in the justice system?",
      "opts": [
        "A judge with no link to either party hears the case",
        "Both parties get the same outcome in the case",
        "The accused is told the verdict before the hearing",
        "The most serious charges are always heard first"
      ],
      "why": "Fairness is about the process, and an impartial judge is part of an independent decision-maker. Getting the same outcome is the tempting option, but fairness does not guarantee any particular result.",
      "clue": "Fairness looks at how a decision is reached, not what it is."
    },
    "b": {
      "d": 3,
      "q": "Before her hearing, Priya is given none of the evidence the prosecution will use against her. Which element of fairness is most directly missing?",
      "opts": [
        "A chance to know the case against her",
        "An independent decision-maker",
        "A chance to question the other side's evidence",
        "A lighter sentence than other offenders receive"
      ],
      "why": "Priya has not been given the evidence, so she cannot prepare a response. Questioning evidence at the hearing is related, but the missing step here is knowing the case beforehand.",
      "clue": "What does she need to have before the hearing begins?"
    }
  },
  "leg-equality-justice-system": {
    "title": "Equality in the justice system",
    "card": [
      "Equality means people are treated the same by the justice system, with the same rules and the same chance to take part.",
      "Treating everyone exactly the same can sometimes leave a person at a disadvantage. For example, a person who does not speak English well may not follow a hearing.",
      "Where that would happen, measures are taken to correct it. This helps each person take part on a similar footing.",
      "An interpreter for a witness is one such measure. It does not favour the witness. It removes a barrier that others do not face."
    ],
    "remember": "Equality is the same treatment, adjusted where sameness would disadvantage someone.",
    "a": {
      "q": "Why might a court sometimes treat people differently to achieve equality?",
      "opts": [
        "Identical treatment could leave some people disadvantaged",
        "Some people should receive a better outcome than others",
        "Rules should apply only to people who can follow them",
        "Courts must treat each party differently in every case"
      ],
      "why": "Measures are used where the same treatment would disadvantage a person, so that they can take part on a similar footing. The option about some people receiving a better outcome is tempting, but the aim is to remove a barrier, not to favour anyone.",
      "clue": "Think about what sameness can do to a person who faces a barrier."
    },
    "b": {
      "d": 3,
      "q": "Tomas, a witness, is deaf and cannot follow questions in court. The court provides an Auslan interpreter. What does this show?",
      "opts": [
        "A measure to correct a disadvantage sameness would cause",
        "Unfair treatment, as other witnesses receive no interpreter",
        "A change to the verdict so that Tomas is favoured",
        "The court treating every witness in exactly the same way"
      ],
      "why": "Without the interpreter, identical treatment would leave Tomas unable to take part. The interpreter removes that barrier. It is not unfair to other witnesses, as it does not favour his evidence.",
      "clue": "Ask what Tomas could not do if he were treated exactly like the other witnesses."
    }
  },
  "leg-access-justice-system": {
    "title": "Access in the justice system",
    "card": [
      "Access means people can learn about their rights and use the justice system to protect them. It is one of the principles used to judge whether the system is working well.",
      [
        "Knowing",
        "People need information about their rights and how the system works. Plain language, community legal education and interpreters help people understand."
      ],
      [
        "Using",
        "People also need to be able to take part. Cost, distance, language and a lack of legal help can all stand in the way."
      ],
      "Access is about being able to reach and use the system. It is not a promise of any particular result, and it is separate from how fair the hearing itself is."
    ],
    "remember": "Access means knowing your rights and being able to use the system to protect them.",
    "a": {
      "q": "Which situation is mainly a problem of access to the justice system?",
      "opts": [
        "A person cannot afford a lawyer to explain their options",
        "A judge refuses to hear a person's side of the case",
        "A person is treated differently from others for no reason",
        "A court reaches a decision the person disagrees with"
      ],
      "why": "Not being able to pay for legal help can stop a person from using the system to protect their rights. A judge refusing to hear a side is about the fairness of the hearing, not access.",
      "clue": "Which one stops a person from getting into the system?"
    },
    "b": {
      "d": 3,
      "q": "Tran has lived in Australia for one year and speaks little English. He has a legal problem but does not understand his rights. Which step would best improve his access?",
      "opts": [
        "Free legal information and an interpreter in his language",
        "A judge with no personal link to either party in the case",
        "The same English court forms that every other party gets",
        "A written statement of reasons after the case is decided"
      ],
      "why": "Tran's barriers are language and not knowing his rights, and information with an interpreter removes both. Giving him the same English forms as everyone else treats him alike but leaves the language barrier in place. An unbiased judge and written reasons concern the fairness of the hearing, not his ability to reach and use the system.",
      "clue": "Which step removes the barriers Tran actually faces?"
    }
  },
  "leg-rights-accused": {
    "title": "Rights of the accused",
    "card": [
      ["Presumed innocent", "The accused is treated as not guilty until the prosecution proves guilt in court."],
      [
        "Silence",
        "In general, the accused does not have to answer police questions or give evidence at trial, though in some situations they must give police their name and address. Staying silent is not an admission of guilt."
      ],
      [
        "No unreasonable delay",
        "The accused has a right to be tried without unreasonable delay, so they are not left waiting years for a verdict."
      ],
      [
        "Jury",
        "If the accused pleads not guilty to an indictable offence and is tried in the County or Supreme Court, a jury of citizens decides the verdict. A guilty plea, or an indictable offence heard summarily in the Magistrates' Court, has no jury."
      ]
    ],
    "remember": "Four rights protect the accused: innocence until proven guilty, silence, a timely trial and, in some trials, a jury.",
    "a": {
      "q": "Police question Priya about a theft, and she chooses to say nothing. Which right is she using?",
      "opts": [
        "The right to silence",
        "The right to be presumed innocent",
        "The right to trial by jury",
        "The right to trial without delay"
      ],
      "why": "Priya is choosing not to answer questions, which is the right to silence. Presumed innocence is about how her guilt is treated until it is proven, not whether she answers police questions.",
      "clue": "What is she choosing not to do?"
    },
    "b": {
      "d": 3,
      "q": "In which of these cases would a jury decide the verdict?",
      "opts": [
        "Not guilty plea to an indictable offence, County Court",
        "Guilty plea to an indictable offence, County Court",
        "Not guilty plea to a summary offence, Magistrates' Court",
        "Indictable offence heard summarily, Magistrates' Court"
      ],
      "why": "A jury is used when the accused pleads not guilty to an indictable offence tried in a higher court such as the County Court. A guilty plea in the County Court is tempting, but with no dispute about guilt there is no verdict for a jury to reach.",
      "clue": "Does the accused deny the charge, and which court hears it?"
    }
  },
  "leg-rights-victims": {
    "title": "Rights of victims",
    "card": [
      "Victims of crime have rights in the criminal justice system. These recognise that victims have an interest in the case and that giving evidence can be stressful.",
      [
        "Evidence",
        "Victims can give evidence in other ways, such as by video link from a separate room, so they do not face the accused in the courtroom."
      ],
      [
        "Information",
        "Victims can be told about the proceedings, such as what charges have been laid and how the case is going."
      ],
      [
        "Release",
        "Victims of violent crime can join the Victims Register. They can then be told when the offender is likely to be released from prison."
      ]
    ],
    "remember": "Victims are supported to take part and are kept informed.",
    "a": {
      "q": "The victim in a violent assault case gives evidence by video link from another room. What is the main purpose of this?",
      "opts": [
        "To reduce the stress of facing the accused in court",
        "To make the trial a summary hearing",
        "To stop the accused from hearing the evidence",
        "To give the victim a say in the sentence"
      ],
      "why": "Video link lets the victim give evidence without being in the same room as the accused, which reduces stress. It does not change the type of hearing, and the accused still hears the evidence.",
      "clue": "Think about how the victim feels in the courtroom."
    },
    "b": {
      "d": 3,
      "q": "Jess was assaulted, and the offender was jailed. Years later, a letter from the Victims Register tells her he will soon leave prison. Which right is this?",
      "opts": [
        "The right to be told about the offender's likely release",
        "The right to be told about the charges and the case",
        "The right to give evidence from a separate room",
        "The right to be presumed innocent until proven guilty"
      ],
      "why": "The letter is about when the offender will get out of prison, which is the right to be told about likely release. Being told about the charges and the case is about the proceedings, which ended at sentencing. Presumed innocence is a right of the accused, not the victim.",
      "clue": "The letter is about what happens after the sentence."
    }
  },
  "leg-victoria-legal-aid": {
    "title": "Victoria Legal Aid",
    "card": [
      "Victoria Legal Aid (VLA) is a statutory body set up by the Victorian Parliament. It gives legal help to people in Victoria who might not be able to pay for it.",
      "VLA gives free legal information and advice to anyone who asks, including accused people and victims of crime.",
      "Lawyers are provided only to those who qualify. Before it funds a lawyer, VLA looks at a person's income and assets (a means test) and at the type of case.",
      "VLA also supports victims of crime, for example by giving them information and advice about the criminal justice process."
    ],
    "remember": "VLA gives free advice to all, but a funded lawyer depends on qualifying.",
    "a": {
      "q": "Tom is charged with theft and has never been to court. He phones VLA for help. What can VLA give him whether or not he qualifies for a lawyer?",
      "opts": [
        "Free legal information and advice",
        "A VLA lawyer to appear for him in court",
        "A guarantee that the charge will be dropped",
        "Payment of any fine a court gives him"
      ],
      "why": "VLA gives free information and advice to anyone who asks. A funded lawyer depends on qualifying, so it is not given to everyone. VLA does not decide outcomes or pay fines.",
      "clue": "Think about what VLA gives to everyone, not only those who qualify."
    },
    "b": {
      "d": 3,
      "q": "Priya is accused of a serious offence. She earns a high income and owns several properties. Which statement best describes her likely position with VLA?",
      "opts": [
        "Unlikely to get a VLA lawyer, but can still get advice",
        "Likely to get a VLA lawyer, as the offence is serious",
        "Unlikely to get any VLA help, including information",
        "Likely to get a VLA lawyer, as all accused people do"
      ],
      "why": "VLA applies a means test to a person's income and assets before funding a lawyer, so Priya's wealth means she is unlikely to qualify. The seriousness of the offence is only one factor and does not get her past the means test. Free information and advice is open to anyone, so she can still get that.",
      "clue": "A funded lawyer depends on more than the type of case."
    }
  },
  "leg-community-legal-centres": {
    "title": "Community legal centres",
    "card": [
      "Community legal centres (CLCs) are independent, non-profit services. They give free legal help to people in their community.",
      "CLCs help accused people and victims of crime. They can give advice, information and, in some cases, representation.",
      "They are independent of Victoria Legal Aid. Many help people who cannot get a lawyer through Legal Aid.",
      "Some CLCs serve a local area. Others focus on a group, such as young people or people on low incomes."
    ],
    "remember": "CLCs are free, independent services that often help where Legal Aid does not.",
    "a": {
      "q": "Which description best fits a community legal centre?",
      "opts": [
        "An independent service giving free legal help",
        "A court that hears minor criminal cases",
        "A government body that prosecutes accused people",
        "A private firm that charges standard fees"
      ],
      "why": "CLCs are independent services that give free legal help to accused people and victims. A private firm charging fees is wrong because CLCs do not charge for this help. They also do not prosecute or hear cases.",
      "clue": "Think about who runs them and what they charge."
    },
    "b": {
      "d": 2,
      "q": "Jess is accused of a driving offence. VLA will not fund a lawyer for her, and she cannot afford a private one. What could she do?",
      "opts": [
        "Ask a local community legal centre for free help",
        "Wait for the court to appoint her a free lawyer",
        "Ask the prosecution to give her legal advice",
        "Plead guilty because no help is available"
      ],
      "why": "CLCs often help people who cannot get Legal Aid, so Jess can ask one for free help. Pleading guilty is wrong because help may still be available. The prosecution acts against her, so it cannot advise her.",
      "clue": "Which service often helps people that Legal Aid cannot?"
    }
  },
  "leg-plea-negotiations": {
    "title": "Plea negotiations",
    "card": [
      "A plea is the accused's answer to a charge. A guilty plea admits the offence, so there is no trial on guilt and the court moves to sentencing. A not guilty plea sends the case to trial, where the prosecution must prove it.",
      "In plea negotiations, the prosecution and defence talk before trial. The accused agrees to plead guilty, often to a lesser charge or fewer charges, and in return the prosecution drops the other charges. For serious (indictable) cases in Victoria, the Office of Public Prosecutions conducts the talks.",
      "It saves time and cost, and the court does not need a full trial. Witnesses, including victims, may not have to give evidence. This supports efficiency in the justice system.",
      "It can raise concerns about fairness. The accused may be convicted of a lesser offence than the victim believes was committed, and the sentence may be lighter. Under the Victims' Charter Act 2006 (Vic), prosecutors should seek the victim's views."
    ],
    "remember": "Plea negotiations trade a guilty plea for fewer or lesser charges. They save time and cost but can cut against fairness for victims.",
    "a": {
      "q": "In a plea negotiation, what does the accused usually agree to do?",
      "opts": [
        "Plead guilty in return for fewer or lesser charges",
        "Plead not guilty to every charge so the case goes on",
        "Stay silent and ask the judge to dismiss the case",
        "Plead guilty to all charges in return for a jury trial"
      ],
      "why": "In plea negotiations the accused gives a guilty plea. In return, the prosecution drops some charges or accepts a lesser one. Pleading not guilty to every charge sends the case to trial, so nothing is negotiated.",
      "clue": "The accused gives something up and gets something back."
    },
    "b": {
      "d": 3,
      "q": "Dev faces two charges. In plea negotiations he pleads guilty to one and the other is dropped. The victim, Sam, says the outcome lacks fairness. What is the most likely reason?",
      "opts": [
        "Dev is convicted of less than Sam believes he did",
        "Dev must face a full jury trial on both charges",
        "Sam must give evidence for several days at a trial",
        "Dev's guilty plea means the court cannot sentence him"
      ],
      "why": "Dev is convicted of only one offence, though Sam believes he committed both. The outcome does not match what Sam thinks happened. A full trial is wrong because a guilty plea avoids a trial on guilt.",
      "clue": "Think about what the dropped charge means for the outcome."
    }
  },
  "leg-legal-practitioners": {
    "title": "Legal practitioners",
    "card": [
      "Legal practitioners are lawyers. They know the law and court procedure, which most accused people and victims do not.",
      "They prepare the case. This can include gathering evidence, advising on the strongest approach and getting documents ready for court.",
      "They present the case in court. They can speak for their client, question witnesses and make arguments on the law, but the court decides the outcome.",
      "They also help a client understand their options, such as what a charge means and what choices they have. The client then makes the decision."
    ],
    "remember": "A lawyer brings knowledge of law and procedure to prepare, present and explain a case.",
    "a": {
      "q": "Which task is a legal practitioner's role for an accused person?",
      "opts": [
        "Presenting the accused person's case in court",
        "Deciding whether the accused is guilty",
        "Setting the penalty after a guilty finding",
        "Choosing which charges the police lay"
      ],
      "why": "A lawyer presents the client's case in court. Deciding guilt is for the magistrate or jury, and setting the penalty is for the magistrate or judge, so those two options are tempting but wrong. Police choose the charges.",
      "clue": "A lawyer acts for the client, not as the decision maker."
    },
    "b": {
      "d": 3,
      "q": "Liam is charged with an offence and does not understand the charge or what he can do next. How can a lawyer best help him?",
      "opts": [
        "By explaining his options so he can choose",
        "By deciding for him how he should plead",
        "By ensuring he is found not guilty at court",
        "By taking his place so he can skip court"
      ],
      "why": "A lawyer helps a client understand their options, but the client still makes the decision, so deciding his plea for him is wrong. A lawyer cannot ensure a particular result, because the court decides the outcome. The accused generally still needs to attend court.",
      "clue": "The lawyer advises, and the client makes the choice."
    }
  },
  "leg-have-court-hierarchy": {
    "title": "Why have a court hierarchy",
    "card": [
      "A court hierarchy ranks courts from lowest to highest. Victoria's criminal courts run from the Magistrates' Court to the County Court, then the Supreme Court (Trial Division), then the Supreme Court (Court of Appeal). The High Court of Australia sits above them all.",
      [
        "Specialisation",
        "Each court hears cases of a set seriousness and type. Less serious cases go to lower courts, and the most serious go to higher courts. Courts can then build skill and use resources to suit the cases they hear."
      ],
      [
        "Appeals",
        "A party who thinks a court made a mistake may ask a higher court to review the decision. The hierarchy gives them somewhere to go."
      ],
      "Appeals can also correct errors in law and help the law stay consistent, as lower courts follow the decisions of higher courts."
    ],
    "remember": "A hierarchy sorts cases by seriousness and gives a path to appeal.",
    "a": {
      "q": "Which is a reason for having a court hierarchy?",
      "opts": [
        "It lets a party ask a higher court to review a decision",
        "It lets every case be heard in the highest court",
        "It stops a party from challenging a court's decision",
        "It lets the lowest court overrule the higher courts"
      ],
      "why": "A hierarchy gives a path for appeal to a higher court. It does not put every case in the highest court, because cases are sorted by seriousness. It opens a way to challenge decisions rather than closing one, and lower courts follow higher ones rather than overruling them.",
      "clue": "Think about where a party goes if they think a court got it wrong."
    },
    "b": {
      "d": 2,
      "q": "Dev is charged with a minor traffic offence, and Priya is charged with a very serious offence. Why does the hierarchy help with their cases?",
      "opts": [
        "Each case can go to a court suited to its seriousness",
        "Both cases must start in the Supreme Court",
        "Each case must be appealed before it is heard",
        "Priya's case can skip the hearing and go to appeal"
      ],
      "why": "The hierarchy sends less serious cases to lower courts and more serious cases to higher courts. This is specialisation by seriousness, so a minor traffic offence does not go to the Supreme Court. Appeals come after a decision, so a case is not appealed before it is heard.",
      "clue": "The two charges differ in how serious they are."
    }
  },
  "leg-judges-magistrates-criminal-cases": {
    "title": "Judges and magistrates in criminal cases",
    "card": [
      "In a criminal case, the judge or magistrate acts as an impartial umpire. They manage the hearing and make sure it runs fairly and follows the rules.",
      [
        "Law",
        "They decide questions of law, such as whether a piece of evidence can be used. In a jury trial, the jury decides the facts, and the judge directs it on the law it must apply."
      ],
      ["Sentence", "If the accused is found guilty or pleads guilty, the judge or magistrate passes sentence."],
      "The parties, the prosecution and the defence, present their own cases. The judge or magistrate does not run either side's case."
    ],
    "remember": "The judge or magistrate manages, rules on law and sentences. The parties argue their cases.",
    "a": {
      "q": "Which task is done by the judge in a criminal jury trial?",
      "opts": [
        "Explaining to the jury the law it must apply",
        "Calling the witnesses for the prosecution",
        "Planning the defence for the accused",
        "Deciding the facts and giving the verdict"
      ],
      "why": "The judge directs the jury on the law. The prosecution calls its own witnesses and the defence plans its own case, as the parties present their cases. Deciding the facts is the jury's job in a jury trial, so it is not the judge's task here.",
      "clue": "The judge is an umpire, not one of the parties."
    },
    "b": {
      "d": 3,
      "q": "In a County Court trial, the defence asks to use a document, and the prosecution objects. Who decides whether it can be used?",
      "opts": [
        "The judge, as the umpire of the hearing",
        "The jury, as it decides the facts of the case",
        "The prosecution, as it raised the objection",
        "The defence, as it wants to use the document"
      ],
      "why": "Whether a document can be used as evidence is a question of law, and the judge decides questions of law. The jury decides the facts, not whether evidence is allowed. The parties argue their sides, but neither one decides the issue.",
      "clue": "Is this about what happened, or about the rules of the trial?"
    }
  },
  "leg-juries-criminal-trials": {
    "title": "Juries in criminal trials",
    "card": [
      "A jury is a group of ordinary citizens who decide the facts in a criminal trial. In Victoria, a jury of 12 is used in serious (indictable) trials in the County Court and the Supreme Court.",
      "The jury decides whether the accused is guilty or not guilty. The judge directs the jury on the law and runs the trial, but the jury decides guilt.",
      "A jury is first asked to reach a unanimous verdict, where all 12 agree. In some cases, after long deliberation, a majority verdict may be accepted instead.",
      "Under the Juries Act 2000 (Vic), an 11 to 1 verdict may be accepted only after at least six hours of deliberation. It is not available for murder, treason, some large commercial drug offences or any Commonwealth offence."
    ],
    "remember": "A jury of 12 decides guilt. Unanimity comes first, and 11 to 1 is allowed only after six hours and for some offences.",
    "a": {
      "q": "In a Victorian County Court trial with a jury, who decides if the accused is guilty?",
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
      "q": "A Victorian jury in an armed robbery trial has deliberated for seven hours and is split 11 to 1 for guilty. Can the judge accept this verdict?",
      "opts": [
        "Yes, as the time and offence allow a majority verdict",
        "No, as every criminal verdict must be unanimous",
        "No, as a majority verdict needs at least two days",
        "No, as armed robbery is treated the same as murder"
      ],
      "why": "Armed robbery is not one of the excluded offences, and more than six hours have passed, so the judge may accept 11 to 1. The tempting wrong answer is that every verdict must be unanimous: a jury is asked for unanimity first, but a majority can be accepted for most offences.",
      "clue": "Compare this trial with the limits on majority verdicts."
    }
  },
  "leg-factors-affecting-justice-criminal": {
    "title": "Factors affecting justice in criminal cases",
    "card": [
      "The principles of justice are fairness, equality and access. Fairness means impartial, open processes that people can take part in. Equality means the same chance to present a case. Access means people can engage with the system on an informed basis.",
      [
        "Cost",
        "Legal representation can be expensive. An accused who cannot afford a lawyer, or cannot get legal aid, may struggle to present their case. This can affect fairness, equality and access."
      ],
      [
        "Time",
        "Cases can take a long time to reach trial. Delay can weaken witness memories, which can affect the fairness of the trial. It can also add stress for the accused and victims."
      ],
      [
        "Cultural differences",
        "People from some backgrounds may have limited English or may not know court processes. Without an interpreter or support, they may not follow the case or take part fully. This can affect access and fairness."
      ]
    ],
    "remember": "Cost, time and cultural differences are factors that can stop the system being fair, equal or accessible.",
    "a": {
      "q": "Zoran is accused of theft but cannot afford a lawyer and is refused legal aid. Which factor is most directly limiting justice for him?",
      "opts": [
        "Cost, because he has no lawyer to help present his case",
        "Time, because he must wait a long time for his trial",
        "Cultural differences, because court customs are unfamiliar",
        "Jury size, because twelve people will decide his case"
      ],
      "why": "Zoran has no legal help because he cannot pay and legal aid was refused, so this is a cost issue. Nothing in the case mentions a delay, so time is not the factor here.",
      "clue": "Use only the facts given about Zoran."
    },
    "b": {
      "d": 3,
      "q": "Linh has limited English and is tried without an interpreter. She cannot follow the evidence. Which factor is most directly limiting her access to justice?",
      "opts": [
        "Cultural differences, as she cannot follow the court process",
        "Cost, as she has paid too much for her lawyer",
        "Time, as her trial has been delayed for too long",
        "Equality, as it is a factor that makes trials slower"
      ],
      "why": "Limited English and no interpreter stop Linh understanding the case, so this is a cultural difference that limits her access. Equality is tempting, but it is a principle of justice, not a factor that affects justice, and nothing suggests delay.",
      "clue": "Check which options name a factor and which name a principle."
    }
  },
  "leg-purposes-sanctions-unit-3": {
    "title": "Purposes of sanctions",
    "card": [
      "Deterrence discourages crime through fear of a sanction. Specific deterrence aims at the offender, and general deterrence aims at others who might offend.",
      "Punishment makes the offender face a just penalty for the wrong, in proportion to how serious the crime was. Denunciation is the court publicly stating that the conduct is wrong.",
      "Rehabilitation helps the offender change, for example through treatment or training, so they do not reoffend. Protection keeps the community safe from the offender, for example by keeping them in prison.",
      "Section 5(1) of the Sentencing Act 1991 (Vic) sets out these five purposes. A sentence can serve several at once, and they can pull against each other. The judge weighs them to reach a fitting sentence."
    ],
    "remember": "Judges balance five purposes: rehabilitate, punish, deter, denounce and protect.",
    "a": {
      "q": "A court orders an offender to complete a drug treatment program so they can change their behaviour and stop reoffending. Which purpose does this mainly serve?",
      "opts": ["Rehabilitation", "Punishment", "General deterrence", "Protection"],
      "why": "Treatment aims to change the offender so they do not reoffend, which is rehabilitation. Protection is the tempting wrong answer, but it keeps the community safe from the offender, not by changing the person.",
      "clue": "Which purpose is about changing the offender?"
    },
    "b": {
      "d": 3,
      "q": "A judge imposes a long prison term on a fraudster and says it should warn other people tempted to commit similar frauds. Which purpose is the judge relying on?",
      "opts": ["General deterrence", "Specific deterrence", "Punishment", "Denunciation"],
      "why": "The warning is aimed at other people who might offend, which is general deterrence. Specific deterrence is the tempting wrong answer, but it aims to discourage this offender, not the wider public.",
      "clue": "Who is the warning meant for: the offender or others?"
    }
  },
  "leg-sanctions-their-purposes": {
    "title": "Sanctions and their purposes",
    "card": [
      [
        "Fine",
        "A sum of money the offender must pay. It punishes and can deter, and it suits less serious offences. It does little to rehabilitate."
      ],
      [
        "Community correction order",
        "A CCO lets the offender stay in the community under conditions set by the court, such as unpaid work, treatment or supervision. It can rehabilitate and punish while the offender stays connected to family and work."
      ],
      [
        "Imprisonment",
        "The offender is held in custody. It punishes, denounces the crime and protects the community while the offender is held. It can also deter, but time in prison may make rehabilitation harder."
      ],
      "A court chooses the sanction that best fits the purposes it wants to achieve in the case in front of it."
    ],
    "remember": "Each sanction fits some purposes better than others, so the court matches the sanction to the purposes it needs.",
    "a": {
      "q": "Which purpose does imprisonment serve better than a fine or a CCO?",
      "opts": [
        "Protecting the community while the offender is held",
        "Rehabilitating the offender through treatment",
        "Keeping the offender connected to family and work",
        "Suiting offences that are less serious"
      ],
      "why": "Imprisonment holds the offender in custody, so others are protected for that time. Rehabilitation through treatment and staying connected to family and work are strengths of a CCO, and prison may make rehabilitation harder.",
      "clue": "Which sanction removes the offender from the public?"
    },
    "b": {
      "d": 3,
      "q": "Dani, 24, has no prior convictions. She stole from the café where she works to pay gambling debts, and the café has kept her on. The judge wants a sanction that punishes her and helps her change, while she keeps working. Which sanction best fits?",
      "opts": [
        "A CCO with unpaid work and treatment conditions",
        "A fine set at the value of what she stole",
        "A short prison term to punish and deter her",
        "A long prison term to denounce the crime"
      ],
      "why": "A CCO can punish through unpaid work and help rehabilitate through treatment, while Dani stays in her job. A fine punishes but does little to rehabilitate, so it would not address her gambling. Either prison term would take her away from work.",
      "clue": "Which sanction can punish and rehabilitate while she stays in the community?"
    }
  },
  "leg-factors-sentencing-unit-3": {
    "title": "Factors in sentencing",
    "card": [
      [
        "Aggravating factor",
        "a feature of the offence or offender that can make the sentence more severe, such as planning the offence, using a weapon or a prior record of similar offences."
      ],
      [
        "Mitigating factor",
        "a feature that can make the sentence less severe, such as genuine remorse, good prospects of rehabilitation or a difficult personal background."
      ],
      [
        "Guilty plea",
        "an early plea of guilty can lead to a lower sentence. It saves court time and spares witnesses and victims from giving evidence."
      ],
      [
        "Victim impact statement",
        "the victim can tell the court how the offence has affected them. The judge may consider it when weighing the harm done."
      ]
    ],
    "remember": "The judge weighs factors that can increase or reduce a sentence, along with a guilty plea and the victim's account of harm.",
    "a": {
      "q": "Which of these is a mitigating factor at sentencing?",
      "opts": [
        "The offender shows genuine remorse",
        "The offender has prior convictions for similar offences",
        "The offender used a weapon in the offence",
        "The offender planned the offence in advance"
      ],
      "why": "Genuine remorse can reduce a sentence, so it mitigates. The other three can make a sentence more severe, so they aggravate. Prior similar convictions are the most tempting wrong option, but they count against the offender.",
      "clue": "Which one could lead to a lighter sentence?"
    },
    "b": {
      "d": 3,
      "q": "Sam pleaded guilty to a burglary in Bendigo at the first hearing. The homeowner's victim impact statement describes ongoing fear at home. How may the judge use these?",
      "opts": [
        "Plea may reduce the sentence, statement shows the harm",
        "Both are aggravating factors that raise the sentence",
        "Statement is ignored, as only the plea can matter",
        "The sentence is cut because the victim has suffered"
      ],
      "why": "An early guilty plea can reduce the sentence, and the victim impact statement helps the judge understand the harm done. The plea is not aggravating, and the victim's suffering is weighed as harm, not as a reason to reduce the sentence.",
      "clue": "Think about what each one tells the judge about the case."
    }
  },
  "leg-principles-civil-justice": {
    "title": "Principles of civil justice",
    "card": [
      "In a civil case, one person or organisation sues another to fix a wrong, usually by getting money or another remedy. The person who sues is the plaintiff. The person sued is the defendant.",
      "The plaintiff bears the burden of proof. This means the plaintiff must prove the claim. The defendant does not have to prove that the claim is false.",
      "The standard of proof is the balance of probabilities. The plaintiff must show that their version of events is more likely than not to be true.",
      "This standard is lower than in a criminal case, where the prosecution must prove guilt beyond reasonable doubt. A civil plaintiff does not need to remove all doubt."
    ],
    "remember": "The plaintiff must prove the claim, and more likely than not is enough.",
    "a": {
      "q": "What must a plaintiff do to succeed in a civil claim?",
      "opts": [
        "Show their version is more likely than not true",
        "Show the defendant is guilty beyond reasonable doubt",
        "Show that the defendant cannot disprove the claim",
        "Show that the defendant broke the law on purpose"
      ],
      "why": "The plaintiff carries the burden of proof and meets it by showing their claim is more likely than not true. Beyond reasonable doubt is the criminal standard, so it is the tempting wrong option here.",
      "clue": "Think about who must prove the claim, and how strongly."
    },
    "b": {
      "d": 3,
      "q": "Priya sues Tom, a builder, for faulty work on her deck. At trial, the evidence leaves it about 60% likely that the work was faulty. Tom has not proved the work was sound. What is the result?",
      "opts": [
        "Priya meets the standard, because it is more likely than not",
        "Priya fails, because some doubt remains about the work",
        "Priya fails, because Tom did not have to prove anything",
        "Tom must lose, because he did not prove the work was sound"
      ],
      "why": "Priya has the burden of proof, and a 60% likelihood is more likely than not, so she meets the balance of probabilities. The option saying Tom must lose for not proving the work was sound is wrong: the burden stays with Priya, and she wins by meeting her own standard, not because Tom failed to prove anything. The option saying some doubt remains is wrong too, because a civil plaintiff does not need to remove all doubt.",
      "clue": "Does Priya need to remove all doubt, or only tip the balance?"
    }
  },
  "leg-before-starting-civil-claim": {
    "title": "Before starting a civil claim",
    "card": [
      "A plaintiff is the person who starts a civil claim. Before filing, a plaintiff should weigh up whether the claim is worth pursuing.",
      [
        "Costs",
        "Court cases can cost a lot in legal fees, court fees and time. A plaintiff may also have to pay the defendant's costs if the claim fails."
      ],
      [
        "Time limit",
        "Each type of claim has a limitation period set by law. If the plaintiff starts the claim after it ends, the defendant can ask the court to stop the claim."
      ],
      [
        "Enforcement",
        "A court order is only useful if it can be carried out. If the defendant has no money or assets, the plaintiff may win but never be paid."
      ]
    ],
    "remember": "Before suing, ask: what will it cost, is there still time, and can a win be enforced?",
    "a": {
      "q": "Which of these is a reason a plaintiff might decide not to start a civil claim?",
      "opts": [
        "The likely legal costs are close to the amount claimed",
        "The defendant has said they disagree with the claim",
        "The plaintiff has never been to court before",
        "The defendant is likely to hire a lawyer"
      ],
      "why": "If costs are close to what the plaintiff could win, the claim may leave them no better off, and they may even pay the defendant's costs if they lose. A defendant disagreeing is normal in a dispute and is not one of the factors on the card.",
      "clue": "Think about whether winning would leave the plaintiff better off."
    },
    "b": {
      "d": 3,
      "q": "Priya wins a court order that Dan pay her $20,000 for a faulty renovation. Dan has no job, no savings and owns no property. Which factor should Priya have weighed more carefully before starting her claim?",
      "opts": [
        "Whether a win could be enforced",
        "Whether the limitation period had passed",
        "Whether the defendant disagreed with her",
        "Whether the court fees were affordable"
      ],
      "why": "Dan has no money or assets, so the order may never be carried out and Priya may not be paid. That is the enforcement factor. The time limit was not a problem, since her claim went ahead and she won, and nothing in the case suggests the fees were the issue.",
      "clue": "She won the case. What could still stop her getting paid?"
    }
  },
  "leg-mediation-conciliation-arbitration": {
    "title": "Mediation, conciliation and arbitration",
    "card": [
      [
        "Mediation",
        "a neutral third person helps the parties talk and reach their own agreement. The mediator does not give advice on the outcome or decide it."
      ],
      [
        "Conciliation",
        "a neutral third person also helps the parties talk, and may suggest options for settling. The parties still make the final decision."
      ],
      [
        "Arbitration",
        "a neutral third person, the arbitrator, hears both sides and makes a decision. The decision is binding, so the parties must follow it."
      ],
      "These are forms of dispute resolution outside a courtroom. The main difference is who controls the outcome: the parties, or the third person."
    ],
    "remember": "Mediation and conciliation leave the decision with the parties. In arbitration the third person decides.",
    "a": {
      "q": "Two neighbours use a neutral person who suggests ways to settle their fence dispute, but they decide the result. Which method is this?",
      "opts": ["Conciliation", "Mediation", "Arbitration", "A court hearing"],
      "why": "The neutral person suggests options, which is what separates conciliation from mediation. The neighbours still decide, so it is not arbitration, where the third person makes the decision.",
      "clue": "Who suggests options, and who decides?"
    },
    "b": {
      "d": 3,
      "q": "Priya and a builder take their dispute over a bill to arbitration. Priya is unhappy with the outcome. Where does that leave her?",
      "opts": [
        "She is bound by the outcome and has to follow it",
        "She can reject it and keep negotiating with the builder",
        "She can ignore it, as the parties make the final decision",
        "She has to follow it only if the builder also agrees to it"
      ],
      "why": "In arbitration the third person makes the decision, and it is binding on both parties. Saying the parties make the final decision is true of mediation and conciliation, not arbitration.",
      "clue": "In this method, who controls the outcome?"
    }
  },
  "leg-consumer-affairs-victoria": {
    "title": "Consumer Affairs Victoria",
    "card": [
      "Consumer Affairs Victoria (CAV) is a Victorian government body. It deals with the rights and duties of consumers, traders, renters and rental providers (landlords).",
      "It gives information for free. It explains the law to these groups, so people know their rights and duties before a dispute grows.",
      "It also helps people settle consumer and tenancy disputes for free, such as over a faulty product. It contacts the other party and tries to help the two sides reach agreement.",
      "CAV is not a court. It does not hear evidence and make a binding ruling. If a dispute is not settled, a person can take it to another body, such as VCAT."
    ],
    "remember": "CAV is a free government service that informs and helps settle disputes, but it does not rule on them.",
    "a": {
      "q": "Which statement best describes the role of Consumer Affairs Victoria in a dispute?",
      "opts": [
        "It helps the parties reach agreement, at no cost",
        "It hears evidence and makes a binding order",
        "It represents the consumer as their lawyer in court",
        "It charges a fee based on the size of the claim"
      ],
      "why": "CAV helps parties settle disputes and does not charge for this. It is not a court, so it does not hear evidence and make a binding order. That is the most tempting wrong option.",
      "clue": "Think about what it costs and who makes the final call."
    },
    "b": {
      "d": 3,
      "q": "Jack buys a fridge from a store in Bendigo. It breaks, and the store refuses a refund. He asks CAV for help, but the dispute is not settled. What is true of CAV's role?",
      "opts": [
        "It can contact the store, but cannot make a binding ruling",
        "It can order the store to refund him, as a tribunal would",
        "It can act as his lawyer if he sues the store in court",
        "It can give him information, but cannot contact the store"
      ],
      "why": "CAV helps settle consumer disputes for free, which includes contacting the other party. It does not make a binding ruling, so an unsettled dispute can go to another body such as VCAT. Ordering a refund is the tempting option, but that is what a tribunal or court does, not CAV.",
      "clue": "Recall what Jack can do next if CAV cannot settle it."
    }
  },
  "leg-victorian-civil-administrative-tribunal": {
    "title": "The Victorian Civil and Administrative Tribunal",
    "card": [
      "The Victorian Civil and Administrative Tribunal (VCAT) is a Victorian body that settles many civil disputes. It is a tribunal, not a court.",
      "It hears matters such as consumer claims, tenancy disputes between landlords and renters, and building disputes.",
      "VCAT is designed to be cheaper and quicker than a court. Its fees are generally lower, and its procedures are less formal. Parties can often represent themselves without a lawyer.",
      "A VCAT member hears the case and, if the parties do not settle, makes a decision. That decision is binding, so the parties must follow it."
    ],
    "remember": "VCAT is a tribunal, not a court. It is designed to settle civil disputes more cheaply and quickly, and its decisions bind the parties.",
    "a": {
      "q": "Which statement about VCAT is accurate?",
      "opts": [
        "It makes binding decisions but is not a court",
        "It is a court, so its decisions are binding",
        "It is not a court, so its decisions are only advice",
        "It is a court that hears minor criminal matters"
      ],
      "why": "VCAT is a tribunal, not a court, yet a VCAT member can make a decision the parties must follow. The tempting idea that being outside the court system means its decisions are only advice is wrong, because its decisions are binding.",
      "clue": "Check two things separately: what VCAT is, and what its decisions do."
    },
    "b": {
      "d": 3,
      "q": "Priya wants a refund from a Geelong furniture store for a faulty $900 table. The store refuses, and she cannot afford a lawyer. Why does VCAT suit her claim?",
      "opts": [
        "It has lower fees and simpler steps, so she may act alone",
        "It is a court, so it can make the store pay her back",
        "It gives her a free lawyer, so she need not pay for one",
        "It only gives advice, so neither side takes a risk"
      ],
      "why": "VCAT hears consumer claims, its fees are generally lower and its procedures less formal, so parties can often represent themselves. The option calling it a court is wrong: VCAT can make a binding decision, but it is a tribunal, not a court.",
      "clue": "Test each option against what VCAT is and how its hearings run."
    }
  },
  "leg-courts-civil-disputes-2": {
    "title": "Courts in civil disputes",
    "card": [
      "Victoria has a hierarchy of courts, ranked from lowest to highest. Each court's jurisdiction, its power to hear a case, depends on the size and complexity of the civil claim.",
      [
        "Magistrates' Court",
        "the lowest court in the hierarchy. It hears smaller and simpler civil claims, such as a modest debt, and has a limit on the amount it can deal with."
      ],
      [
        "County and Supreme Courts",
        "higher courts. The County Court hears larger claims and the Supreme Court hears the largest and most complex ones. Neither has an upper limit on the amount claimed."
      ],
      "One reason for the hierarchy is administrative convenience: spreading cases lets each court's judges, time and money be used well. Another is that it allows appeals, where a higher court reviews a lower court's decision."
    ],
    "remember": "The hierarchy spreads cases so courts run efficiently, and lets higher courts review decisions on appeal.",
    "a": {
      "q": "What is one reason Victoria has a hierarchy of civil courts?",
      "opts": [
        "It spreads cases so each court's resources are used well",
        "It lets parties pick the court most likely to favour them",
        "It means the Supreme Court hears every claim first",
        "It stops any court decision from being reviewed later"
      ],
      "why": "Spreading cases by size and complexity is administrative convenience: each court's judges, time and money are used well. Letting parties pick a court that favours them is not a reason for the hierarchy. Courts are ranked by the size and complexity of claims, not to suit the parties.",
      "clue": "One of the card's reasons is about running the courts."
    },
    "b": {
      "d": 2,
      "q": "Priya loses a civil case in the County Court and believes the judge made an error of law. What does the court hierarchy allow her to do?",
      "opts": [
        "Appeal to a higher court to review the decision",
        "Appeal to the Magistrates' Court to review the decision",
        "Appeal to the same judge to rehear the whole case",
        "Appeal to any court she chooses, higher or lower"
      ],
      "why": "The hierarchy allows a higher court to review a lower court's decision, so Priya may appeal upwards. The Magistrates' Court sits below the County Court, so it cannot review a County Court decision.",
      "clue": "Think about which way an appeal travels in the hierarchy."
    }
  },
  "leg-judges-juries-lawyers-civil": {
    "title": "Judges, juries and lawyers in civil cases",
    "card": [
      [
        "Judge",
        "A judge manages the case before and during the hearing. In case management, the judge sets timelines and helps the parties narrow the issues in dispute, so the hearing is shorter and more focused."
      ],
      "A judge also decides questions of law, such as which rules apply and what evidence is allowed. If there is no jury, the judge decides the facts too.",
      [
        "Jury",
        "In some civil cases in Victoria, a jury of six people may decide the facts, such as what happened. The judge tells the jury the law to apply. A jury is not used in every civil case, and a party may choose to have one."
      ],
      [
        "Lawyers",
        "Lawyers present each side. They advise their client, prepare the case, question witnesses and argue for their client's position."
      ]
    ],
    "remember": "The judge manages the case and decides law. A jury of six may decide facts. Lawyers argue for each side.",
    "a": {
      "q": "In a civil trial with a jury, which task belongs to the jury rather than the judge?",
      "opts": [
        "Deciding what happened on the facts",
        "Deciding which rules of law apply",
        "Setting timelines for the case",
        "Questioning witnesses for one party"
      ],
      "why": "A civil jury of six may decide the facts, such as what happened. The judge decides questions of law and manages the case. Lawyers, not the jury, question witnesses for each side.",
      "clue": "Think of facts versus law."
    },
    "b": {
      "d": 3,
      "q": "Before a civil hearing in Geelong, a judge meets both parties and gets them to agree on which issues are still in dispute. What is the main purpose of this step?",
      "opts": [
        "To shorten and focus the hearing on the real issues",
        "To let the judge decide the facts without a jury",
        "To allow the lawyers to give evidence themselves",
        "To make the jury responsible for the law in the case"
      ],
      "why": "This is case management. Narrowing the issues means the hearing deals only with what is truly disputed, which saves time. It does not decide who has a jury, and the lawyers present each side rather than give evidence.",
      "clue": "Which role does the judge play before the hearing?"
    }
  },
  "leg-class-actions": {
    "title": "Class actions",
    "card": [
      "A class action is one civil claim brought by one person for a whole group. Seven or more people must have claims against the same defendant, the claims must arise from related circumstances, and they must raise a common issue of law or fact.",
      "The person who starts it is the lead plaintiff. They act for the group members, who are usually not named in the case and do not each have to appear in court.",
      "Costs are shared across the group. A person with a small loss, who could not afford to sue alone, may be able to have their claim heard.",
      "The court deals with the common issues once, instead of in many separate cases. This can save time and avoid different results for similar claims."
    ],
    "remember": "One lead plaintiff, one case for many people, with costs shared.",
    "a": {
      "q": "Why can a class action give access to justice to a person with a small loss?",
      "opts": [
        "The group shares the costs of one case",
        "The court waives legal fees for group members",
        "Each member gets a separate hearing for free",
        "The court lowers the loss needed to sue"
      ],
      "why": "The costs of one case are spread across the group, so a person with a small loss does not face the full expense alone. The court does not waive fees, and members do not get separate hearings: the common issues are decided once.",
      "clue": "Think about what stops a person with a small loss suing alone."
    },
    "b": {
      "d": 3,
      "q": "Hundreds of customers of a Geelong energy company were each overcharged a small amount by the same billing error. Which is the best reason a class action suits them?",
      "opts": [
        "Their similar claims can be heard together in one case",
        "Each customer must appear and give evidence in court",
        "Each customer will win a larger amount than alone",
        "The company must admit it was at fault to the group"
      ],
      "why": "The claims arise from the same error, so the common issue can be decided once, and the costs are shared. Members do not each have to appear, and a class action does not guarantee a larger payment or an admission of fault.",
      "clue": "Look for what the claims have in common."
    }
  },
  "leg-remedies-civil-cases": {
    "title": "Remedies in civil cases",
    "card": [
      "A remedy is what a court orders when the plaintiff wins a civil case. Most remedies aim to restore the plaintiff, as far as possible, to the position they were in before the wrong.",
      [
        "Damages",
        "a sum of money paid to the plaintiff. Most damages compensate for loss, such as lost income, medical bills or damage to property. Exemplary damages are rarer and can punish very serious misconduct."
      ],
      [
        "Injunction",
        "a court order that tells a party to stop doing something, or to do something. It deals with the problem itself, not with money."
      ],
      "A court picks the remedy that suits the harm. Money cannot always fix a wrong, such as ongoing noise, so an injunction may be ordered instead of damages, or together with them."
    ],
    "remember": "Damages are money, mostly to compensate for loss. An injunction orders a party to stop or to act.",
    "a": {
      "q": "A court orders a party to stop running loud machines at night. Which remedy is this, and why?",
      "opts": [
        "An injunction, because it orders a party to stop conduct",
        "Damages, because it compensates for the harm of the noise",
        "An injunction, because it orders a payment to the plaintiff",
        "Damages, because it punishes a party for serious misconduct"
      ],
      "why": "An order to stop conduct is an injunction, because it deals with the problem itself and not with money. Damages are a payment, so an order to stop running machines is not damages, even though it responds to harm.",
      "clue": "Think about what the order actually requires the party to do."
    },
    "b": {
      "d": 3,
      "q": "Priya wins a case against her neighbour Tom. His loud workshop keeps running every night, and she lost rent when a tenant left because of the noise. Which remedies fit her case?",
      "opts": [
        "An injunction to stop the noise, and damages for the rent",
        "Damages only, because the lost rent is the only harm",
        "An injunction only, because the noise is still going on",
        "Damages to stop the noise, and an injunction for the rent"
      ],
      "why": "The noise is an ongoing problem, so an injunction can order Tom to stop. The lost rent is a money loss, so damages can compensate for it. The option with damages to stop the noise and an injunction for the rent swaps the two: damages are money, and an injunction deals with conduct, not with paying for a loss.",
      "clue": "One harm is still happening and one is a past money loss."
    }
  },
  "leg-factors-affecting-justice-civil": {
    "title": "Factors affecting justice in civil cases",
    "card": [
      "The civil system is judged against three principles of justice. Fairness is a fair process and hearing, equality is a level footing for all parties, and access is being able to use the system.",
      [
        "Costs",
        "a party may pay lawyers, court fees and expert witnesses. High costs can stop people starting a case or push them to settle, which harms access. A party who can afford better lawyers may gain an advantage, which harms equality."
      ],
      [
        "Time",
        "a case can take months or years to reach a hearing. Long delays add to costs, wear down parties and make evidence harder to gather, which harms fairness. Parties may give up or accept a poor settlement."
      ],
      "Lower costs and quicker steps give parties a better chance of a fair outcome. The system works to reduce both, but they can still limit justice."
    ],
    "remember": "High costs and long delays can shut people out of court or push them into weak settlements.",
    "a": {
      "q": "Why can high legal costs reduce access to justice in a civil dispute?",
      "opts": [
        "Some people cannot afford to start or continue a case",
        "Courts refuse to hear cases from people with low incomes",
        "Judges give more weight to the party who spent more",
        "Costs make every civil case last longer than a year"
      ],
      "why": "Access means being able to use the system. If people cannot pay for lawyers and fees, they may not start a case or may give up. Courts do not turn people away because of their income, so the option about courts refusing low-income people is wrong.",
      "clue": "Think about whether a person can get into the system at all."
    },
    "b": {
      "d": 3,
      "q": "Priya sues a builder over faulty work. The case takes two years to reach a hearing. By then her main witness has moved overseas, and she accepts a low settlement. Which principle did the delay most directly harm, and why?",
      "opts": [
        "Fairness, as her witness was gone before the hearing",
        "Access, as she was never able to file her claim",
        "Equality, as the delay was longer than the law allows",
        "Fairness, as the law does not let civil cases settle"
      ],
      "why": "Delay made her evidence harder to gather, so she could not fully present her case. That harms a fair hearing, which is fairness. Access is wrong because Priya did start her case, and settling a civil case is allowed.",
      "clue": "What did the two years do to her evidence?"
    }
  },
  "leg-commonwealth-constitution": {
    "title": "The Commonwealth Constitution",
    "card": [
      "The Commonwealth Constitution is the document that set up Australia's federal system in 1901. It is the highest law for the national government.",
      "It says how federal parliament is made up: the Crown, the Senate and the House of Representatives.",
      "It lists the subjects the Commonwealth Parliament may make laws on, such as trade and commerce, defence and immigration. Parliament cannot make laws outside its listed powers, and a law made outside them can be found invalid.",
      "It also shares power between the Commonwealth and the states. The states keep their own parliaments and their own law-making powers."
    ],
    "remember": "The Constitution builds federal parliament, limits what it may legislate on and shares power with the states.",
    "a": {
      "q": "Which statement best describes a role of the Commonwealth Constitution?",
      "opts": [
        "It sets out the subjects federal parliament may legislate on",
        "It lists every offence that a person can be charged with",
        "It decides each case brought before the federal courts",
        "It sets the policies that a government must follow"
      ],
      "why": "The Constitution gives federal parliament a list of subjects it may make laws on. It does not list offences, because those are made in ordinary laws. It does not decide cases, because courts do that.",
      "clue": "Think about what limits the reach of federal parliament."
    },
    "b": {
      "d": 2,
      "q": "Federal parliament passes a law on a subject the Constitution does not give it. The law could be found invalid. What does this show about the Constitution?",
      "opts": [
        "It limits what federal parliament may make laws on",
        "It lets parliament pass any law that both houses agree to",
        "It gives the states control over federal parliament",
        "It stops the states from making their own laws"
      ],
      "why": "The Constitution lists the subjects federal parliament may legislate on, so a law outside that list can be found invalid. Both houses agreeing is not enough, because the law must still fit within the listed powers. The states keep their own law-making powers, so the last option is wrong.",
      "clue": "Ask why a law passed by parliament could still fail."
    }
  },
  "leg-roles-parliament-courts": {
    "title": "The Crown and the Houses of Parliament",
    "card": [
      "Federal parliament has three parts: the House of Representatives, the Senate and the Crown. Victoria's parliament has the Legislative Assembly, the Legislative Council and the Crown.",
      "A bill is a proposed law. It must be passed by both houses in the same form before it can go further.",
      "The Crown is represented by the Governor-General for the Commonwealth and by the Governor for a state. This person gives royal assent.",
      "A bill becomes an Act, which is law, only after royal assent. A bill that has passed both houses is not yet law until assent is given."
    ],
    "remember": "A bill needs both houses and then royal assent before it is law.",
    "a": {
      "q": "When does a bill in the federal parliament become law?",
      "opts": [
        "After both houses pass it and royal assent is given",
        "After one house passes it and royal assent is given",
        "After both houses pass it and the Prime Minister signs it",
        "After the Senate passes it and the High Court approves it"
      ],
      "why": "A bill needs both houses to pass it and then royal assent from the Crown's representative, the Governor-General. Passing both houses alone is not enough, because the bill is not law until assent is given.",
      "clue": "Two houses pass it, then one more step."
    },
    "b": {
      "d": 3,
      "q": "A bill on bike helmets has passed the Legislative Assembly and the Legislative Council of Victoria in the same form. What is its legal status?",
      "opts": [
        "It is not yet law, because royal assent is still needed",
        "It is law, because both houses have passed it",
        "It is not yet law, because the Governor-General must assent",
        "It is law once the Premier announces it publicly"
      ],
      "why": "Both houses have passed the bill, but it becomes an Act only when the Governor gives royal assent. The Governor-General is wrong here because that role is for federal bills, not Victorian ones.",
      "clue": "Which representative of the Crown acts for a state?"
    }
  },
  "leg-division-law-making-powers": {
    "title": "The division of law-making powers",
    "card": [
      [
        "Exclusive",
        "a power only the Commonwealth parliament may use. The states cannot make laws on it. Examples are customs and excise duties, and the power to coin money."
      ],
      [
        "Concurrent",
        "a power both the Commonwealth and the states may use. Examples are taxation (apart from customs and excise), marriage and trade."
      ],
      [
        "Residual",
        "a power the Constitution does not give to the Commonwealth, so it stays with the states. Examples are criminal law, education and public transport."
      ],
      "If a state law and a Commonwealth law clash on a concurrent power, the Commonwealth law wins. This rule comes from section 109 of the Constitution."
    ],
    "remember": "Exclusive is Commonwealth only, concurrent is shared, residual is left to the states.",
    "a": {
      "q": "The Constitution does not give the Commonwealth power over a topic, so only the states make laws on it. What kind of power is this?",
      "opts": ["A residual power", "An exclusive power", "A concurrent power", "A delegated power"],
      "why": "Powers left with the states because the Constitution does not give them to the Commonwealth are residual powers. An exclusive power is the reverse: only the Commonwealth may use it.",
      "clue": "Think about who is left with the power."
    },
    "b": {
      "d": 3,
      "q": "Victoria and the Commonwealth have both validly passed laws on the same topic, and the laws clash. Which statement is correct?",
      "opts": [
        "The topic is concurrent, so the Commonwealth law prevails",
        "The topic is exclusive, so the Commonwealth law prevails",
        "The topic is concurrent, so the Victorian law prevails",
        "The topic is residual, so the Commonwealth law prevails"
      ],
      "why": "Both parliaments can only make valid laws on the same topic if the power is concurrent, and where such laws clash the Commonwealth law wins. An exclusive power would not allow a Victorian law at all, and a residual power would not allow a Commonwealth law.",
      "clue": "Which kind of power can both parliaments use?"
    }
  },
  "leg-section-109": {
    "title": "Section 109",
    "card": [
      "Section 109 of the Commonwealth Constitution deals with a clash between a state law and a Commonwealth law. It applies only when both laws are valid and cover the same matter.",
      "If the two laws are inconsistent, the Commonwealth law prevails. The state law is invalid to the extent of the inconsistency.",
      "Only the part that clashes is invalid. The rest of the state law stays in force, and the state law is not repealed.",
      "Laws can be inconsistent when it is impossible to obey both. They can also be inconsistent when the Commonwealth law is meant to cover the whole field, leaving no room for a state law."
    ],
    "remember": "If valid Commonwealth and state laws clash, the Commonwealth law wins and the state law is invalid to that extent.",
    "a": {
      "q": "A valid state law and a valid Commonwealth law on the same matter are inconsistent. What is the effect under section 109?",
      "opts": [
        "The state law is invalid to the extent of the clash",
        "The whole state law is repealed by the Commonwealth",
        "The state law wins because the state acted first",
        "Both laws are invalid until the High Court rules"
      ],
      "why": "Section 109 makes the Commonwealth law prevail, and the state law is invalid only to the extent of the inconsistency. It is not repealed, and the rest of it stays in force. The idea that the whole state law is repealed is tempting, but the card says only the clashing part is affected.",
      "clue": "Think about which law prevails and how much of the other is affected."
    },
    "b": {
      "d": 3,
      "q": "A valid Commonwealth law says a worker must be paid at least a set weekly amount. A valid Victorian law says the same worker must be paid no more than a lower weekly amount. The Victorian law also sets rules on rest breaks, which the Commonwealth law does not cover. What is the result?",
      "opts": [
        "The Victorian pay rule is invalid, but rest breaks remain",
        "The whole Victorian law is invalid, including rest breaks",
        "The Victorian law wins on pay because it is more specific",
        "Both pay rules apply, and the employer chooses between them"
      ],
      "why": "An employer cannot obey both pay rules: paying the Commonwealth minimum breaks the Victorian cap. So the Commonwealth rule prevails and the Victorian pay rule is invalid to that extent, while the rest break rules clash with nothing and stay in force. Striking down the whole Victorian law is tempting, but section 109 reaches only the inconsistent part.",
      "clue": "Could an employer obey both pay rules at once?"
    }
  },
  "leg-high-court-case-law": {
    "title": "High Court cases on law-making powers",
    "card": [
      "The High Court of Australia decides what the Constitution means. When it rules on a law, it can decide whether the parliament that made it had the power to do so.",
      "Section 90 says only the Commonwealth may impose duties of excise, which are taxes on the production or sale of goods. States cannot impose them.",
      "In Ha v New South Wales (1997), the High Court read excise widely. It held that state licence fees on tobacco, based on the value of tobacco sold, were excises. The state fees were therefore invalid.",
      "The ruling cut the states' power to raise their own revenue and left more power with the Commonwealth. A court decision can shift power between the states and the Commonwealth without any change to the wording of the Constitution."
    ],
    "remember": "The High Court's reading of the Constitution can shift power between the Commonwealth and the states.",
    "a": {
      "q": "What did the High Court's decision in Ha v New South Wales do to the balance of power?",
      "opts": [
        "It limited state taxing power, favouring the Commonwealth",
        "It gave the states more power to tax goods such as tobacco",
        "It changed the wording of section 90 of the Constitution",
        "It made state and Commonwealth taxing powers equal"
      ],
      "why": "The Court read excise widely, so the state tobacco licence fees were invalid. That limited the states' ability to raise revenue and left the power with the Commonwealth. The Court did not change the wording of section 90, as it only interpreted it.",
      "clue": "Ask who is allowed to impose excise under section 90."
    },
    "b": {
      "d": 3,
      "q": "The High Court reads section 90 widely, as it did in Ha v New South Wales. A state charges a fee on each litre of fuel sold. What follows?",
      "opts": [
        "The fee is invalid, because it counts as an excise",
        "The fee is valid, because states can set their own taxes",
        "The Court amends section 90, so the fee stays valid",
        "The Commonwealth loses its own power to tax fuel"
      ],
      "why": "Under a wide reading, a fee on each litre of fuel sold is a tax on the sale of goods, so it is an excise. Section 90 gives excise to the Commonwealth only, so the state fee is invalid. States can raise some taxes of their own, but not excise, and the Court interprets section 90 rather than changing it.",
      "clue": "Is a fee on each litre sold a tax on the sale of goods?"
    }
  },
  "leg-bicameral-structure-parliament": {
    "title": "Bicameral structure of parliament",
    "card": [
      "A bicameral parliament has two houses. The federal parliament has the House of Representatives (lower house) and the Senate (upper house). Victoria's parliament has the Legislative Assembly and the Legislative Council.",
      "A bill must pass both houses before it can become law. Each house can debate it, change it or vote it down.",
      "If the government does not control the upper house, the upper house may block a bill or amend it. This can slow or change the government's plans.",
      "If the government does control the upper house, bills may pass with little review. Scrutiny of the bill is then weaker."
    ],
    "remember": "Two houses share the work. Who controls the upper house affects how closely a bill is checked.",
    "a": {
      "q": "Why does having two houses affect how laws are made?",
      "opts": [
        "A bill needs both houses to pass it, so each can check it",
        "A bill needs only the house the government controls",
        "Only the upper house can debate and change a bill",
        "The lower house passes bills and the upper house cannot vote"
      ],
      "why": "A bill must pass both houses, so each house can debate, amend or reject it. The tempting option that only the government's house matters is wrong, because the other house can still block a bill.",
      "clue": "Think about what must happen before a bill becomes law."
    },
    "b": {
      "d": 3,
      "q": "A state government has a majority in its lower house but not in its upper house. It introduces a controversial bill. What is the most likely effect?",
      "opts": [
        "The upper house amends or rejects it, slowing the plan",
        "It becomes law as soon as the lower house passes it",
        "It passes the upper house quickly with little review",
        "The upper house has to pass it once the lower house does"
      ],
      "why": "The government does not control the upper house, so that house is likely to amend, delay or reject a controversial bill. Passing the lower house is not enough, because both houses must pass a bill. Quick passage with little review is what happens when the government controls the upper house.",
      "clue": "Which house does the government not control?"
    }
  },
  "leg-other-pressures-parliament": {
    "title": "Other pressures on parliament",
    "card": [
      "Parliament does not make laws in isolation. Outside forces shape what laws it can make and what laws it is willing to make.",
      [
        "International pressure",
        "Australia signs treaties, which are agreements with other countries. A treaty becomes Australian law only when parliament passes a statute for it, which the Constitution's external affairs power lets the Commonwealth do."
      ],
      [
        "Other countries and bodies",
        "Governments and international bodies can also press Australia to change a law, for example through public criticism or trade and diplomatic pressure."
      ],
      [
        "Voters",
        "MPs want to be re-elected, so they tend to avoid laws voters strongly oppose and favour laws voters want. This is political pressure, not a legal rule: voter opposition does not make a law invalid."
      ]
    ],
    "remember": "A treaty needs a statute to become law, and other countries and voters can push parliament towards or away from laws.",
    "a": {
      "q": "Australia signs a treaty on protecting wetlands. What must happen before it becomes part of Australian law?",
      "opts": [
        "Parliament passes a statute to give it effect",
        "The Prime Minister signs it on behalf of Australia",
        "The other countries to the treaty vote to approve it",
        "The High Court declares that it applies in Australia"
      ],
      "why": "A treaty binds Australia internationally, but it becomes Australian law only when parliament passes a statute to put it into effect. Signing is tempting, but signing is done by the executive and is not law-making.",
      "clue": "Does signing a treaty change the law inside Australia?"
    },
    "b": {
      "d": 3,
      "q": "A government has a bill that polls show most voters strongly oppose. Which of these is most likely to happen?",
      "opts": [
        "The government changes or drops the bill to keep votes",
        "The bill becomes invalid because voters did not approve it",
        "The Governor-General refuses royal assent to the bill",
        "The High Court strikes the bill down before it is passed"
      ],
      "why": "Governments want to be re-elected, so strong voter opposition tends to lead them to change or drop a bill. Voter opinion is political pressure, not a legal rule, so it does not make a bill invalid or lead a court or official to block it.",
      "clue": "Think about what MPs need at the next election."
    }
  },
  "leg-high-court-constitution": {
    "title": "The High Court and the Constitution",
    "card": [
      "The High Court of Australia is the final court of appeal. It also interprets the Constitution, which sets out the powers of the Commonwealth Parliament.",
      "The Commonwealth Parliament can only make laws on topics the Constitution gives it. A law outside those powers is invalid.",
      "If someone challenges a law, the High Court decides whether it is within power. It can strike down a law that is not, so the law has no effect.",
      "The High Court also protects representative government. It has found that the Constitution implies a freedom of political communication, which lets people discuss political matters."
    ],
    "remember": "The High Court checks parliament by striking down laws made outside the Constitution.",
    "a": {
      "q": "What can the High Court do if the Commonwealth Parliament passes a law outside its constitutional power?",
      "opts": [
        "Strike the law down so it has no effect",
        "Amend the law so that it fits the Constitution",
        "Send the law back to parliament to be voted on again",
        "Ask the Governor-General to repeal the law"
      ],
      "why": "The High Court interprets the Constitution and can declare a law invalid. Amending a law is tempting, but that is a job for parliament, not a court.",
      "clue": "Think about what a court can do to an invalid law."
    },
    "b": {
      "d": 3,
      "q": "A business owner in Geelong challenges a Commonwealth law, arguing that it covers a topic the Constitution does not give parliament power over. Which body decides whether the law is valid?",
      "opts": [
        "The High Court, by interpreting the Constitution",
        "The Commonwealth Parliament, by reviewing its own law",
        "The Governor-General, by refusing to sign the law",
        "The Victorian Supreme Court, by amending the law"
      ],
      "why": "The High Court decides if a law is within the Constitution and can strike it down if not. Parliament made the law, so it does not rule on its own validity.",
      "clue": "Which court interprets the Constitution?"
    }
  },
  "leg-separation-powers-2": {
    "title": "Separation of powers",
    "card": [
      "The Constitution sets up three kinds of government power. Spreading them out means no one body holds too much power.",
      ["Legislative", "the power to make laws. It is held by parliament."],
      [
        "Executive",
        "the power to carry out laws and run government, used by the Governor-General, ministers and departments. Under responsible government, ministers must also sit in parliament and answer to it, so this power overlaps with legislative power."
      ],
      [
        "Judicial",
        "the power to decide disputes and apply the law. It is held only by courts, which are kept strictly separate from parliament and the executive."
      ]
    ],
    "remember": "Power is spread so no one body has too much. Only judicial power is kept strictly apart.",
    "a": {
      "q": "Which statement about the separation of powers in Australia is correct?",
      "opts": [
        "Judicial power is kept strictly separate from the others",
        "All three powers are kept strictly separate from each other",
        "Ministers are not allowed to be members of parliament",
        "Courts share judicial power with ministers and parliament"
      ],
      "why": "Only courts hold judicial power, and they are kept strictly apart from the other two. All three are not strictly separate, because ministers sit in parliament, so legislative and executive power overlap.",
      "clue": "Think about where ministers sit."
    },
    "b": {
      "d": 3,
      "q": "Sam is a federal minister and a member of parliament. He votes for a bill, and once it is law his department carries it out. A friend says this breaks the separation of powers. Is the friend right?",
      "opts": [
        "No, legislative and executive power overlap in Australia",
        "Yes, each power must be held by a completely separate body",
        "Yes, ministers are not meant to vote on their own bills",
        "No, because ministers also hold some judicial power"
      ],
      "why": "Under responsible government, ministers sit in parliament, so legislative and executive power overlap. The friend assumes all three powers are strictly separate, but in Australia only judicial power is. Ministers do not hold judicial power, which belongs only to courts.",
      "clue": "Which two powers are not strictly kept apart?"
    }
  },
  "leg-express-rights-constitution": {
    "title": "Express rights in the Constitution",
    "card": [
      "An express right is a right written directly into the words of the Constitution. Australia's Constitution has only a few.",
      "Section 80 gives a right to trial by jury for a Commonwealth indictable offence. An indictable offence is a serious crime.",
      "Other express rights include freedom of religion from Commonwealth laws, and a ban on discrimination against people because of the state they live in.",
      "Because these rights are in the Constitution, the High Court can strike down a Commonwealth law that breaks them. It does not rewrite the law."
    ],
    "remember": "A few rights are written into the Constitution, so an ordinary law cannot override them.",
    "a": {
      "q": "What does it mean to say that the right to trial by jury is an express right?",
      "opts": [
        "It is written in the words of the Constitution",
        "It is drawn from the structure of the Constitution",
        "It is set out in a Commonwealth Act of parliament",
        "It was created by a High Court decision in a case"
      ],
      "why": "An express right is stated in the actual words of the Constitution. A right drawn from the Constitution's structure is not written down, so it is not express, even though it also comes from the Constitution.",
      "clue": "In everyday speech, what does it mean to say something expressly?"
    },
    "b": {
      "d": 3,
      "q": "The Commonwealth Parliament passes a law saying people charged with a Commonwealth indictable offence must be tried by a judge alone. If the law is challenged, what would the High Court most likely do?",
      "opts": [
        "Strike it down, as it breaches the right to a jury",
        "Uphold it, as parliament can override the Constitution",
        "Uphold it, as the jury right covers only state crimes",
        "Rewrite it, so that a jury hears the trial instead"
      ],
      "why": "Section 80 of the Constitution gives a right to a jury for Commonwealth indictable offences, so the law breaks an express right and can be struck down. Parliament cannot override the Constitution with an ordinary law, and the High Court strikes laws down rather than rewriting them.",
      "clue": "Can an ordinary law change what the Constitution says?"
    }
  },
  "leg-courts-statutory-interpretation": {
    "title": "Courts and statutory interpretation",
    "card": [
      "Parliament writes Acts, but the words cannot cover every case. When a word or phrase in an Act is unclear, a court must decide what it means in the case before it.",
      "This is statutory interpretation. The judge works out what the words mean, and does not rewrite the Act.",
      "A court can read a word widely, so more situations are covered. It can read the word narrowly, so fewer situations are covered.",
      "The meaning the court gives becomes part of the common law. It is a precedent that later courts may need to follow when the same words arise again."
    ],
    "remember": "Courts decide what unclear words in an Act mean, and that meaning can guide later cases.",
    "a": {
      "q": "A court is asked what an unclear word in an Act means. What is the court doing?",
      "opts": [
        "Interpreting the Act to decide how it applies to the case",
        "Repealing the word so that it no longer has any effect",
        "Passing a new Act to replace the unclear wording",
        "Asking parliament to vote on the meaning of the word"
      ],
      "why": "The court applies the Act to the case, so it must decide what the unclear word means. It cannot repeal or replace the Act, because that is a job for parliament.",
      "clue": "The court must still decide the case in front of it."
    },
    "b": {
      "d": 3,
      "q": "An Act bans 'vehicles' in Wattle Park. A Supreme Court judge rules that an electric scooter is not a vehicle, and so is allowed. What is the effect of this ruling?",
      "opts": [
        "It narrows the word and may bind lower courts later",
        "It widens the word and covers more things than before",
        "It changes the Act, so parliament must now vote on it",
        "It applies only to this scooter and to no later case"
      ],
      "why": "The judge read 'vehicles' so that it covers less, which narrows it. The meaning becomes precedent, so lower courts may have to follow it. Widening would mean scooters were caught by the ban.",
      "clue": "Did the ruling bring more things under the ban or fewer?"
    }
  },
  "leg-doctrine-precedent": {
    "title": "The doctrine of precedent",
    "card": [
      [
        "Binding",
        "A decision of a higher court in the same court hierarchy must be followed by lower courts in later cases with similar facts. For example, a Victorian County Court must follow the Victorian Court of Appeal."
      ],
      [
        "Persuasive",
        "Other decisions need not be followed but a court may consider them. These include decisions of lower courts, courts in other hierarchies and courts overseas."
      ],
      "A higher court can reverse a decision on appeal in the same case. It can overrule an earlier precedent in a different case, so that the old rule no longer stands.",
      "A court can distinguish a precedent if the facts of the new case are materially different, and so not follow it. A court can disapprove of a decision, which expresses doubt without changing the result."
    ],
    "remember": "Higher courts bind lower courts in the same hierarchy, and the rest only persuade.",
    "a": {
      "q": "A Magistrates' Court in Victoria hears a case with facts like an earlier Victorian Court of Appeal decision. What must the Magistrates' Court do?",
      "opts": [
        "Follow the Court of Appeal decision, which is binding",
        "Consider the decision, but it is only persuasive",
        "Overrule the Court of Appeal decision",
        "Wait for parliament to pass a new Act"
      ],
      "why": "The Court of Appeal is higher in the same hierarchy, so its decision binds the Magistrates' Court. It is not merely persuasive, and a lower court cannot overrule a higher one.",
      "clue": "Think about which court is higher in the same hierarchy."
    },
    "b": {
      "d": 3,
      "q": "A County Court judge in Victoria finds that the facts before her differ in an important way from a binding precedent. She decides not to follow it. What has she done?",
      "opts": [
        "Distinguished the precedent",
        "Overruled the precedent",
        "Reversed the precedent",
        "Disapproved the precedent"
      ],
      "why": "Distinguishing means finding a material difference in the facts, so the precedent does not apply. Overruling is done by a higher court in a later case. Reversing happens on appeal in the same case.",
      "clue": "Her reason was the facts, not a view that the old rule was wrong."
    }
  },
  "leg-strengths-weaknesses-courts-as": {
    "title": "Factors affecting courts as law-makers",
    "card": [
      [
        "Standing",
        "a person must be directly affected by a legal issue to bring a case. Courts cannot start changing the law on their own, so they wait for a suitable case brought by someone with standing."
      ],
      [
        "Cost and time",
        "court cases can be expensive and slow. This can stop people bringing cases, so some issues never reach a court."
      ],
      [
        "Precedent",
        "lower courts must follow binding precedent from higher courts in their hierarchy. This makes the law stable but limits how far a judge can change it."
      ],
      [
        "Conservatism or activism",
        "a conservative judge keeps to existing law and leaves reform to parliament. An activist judge is more willing to develop the law to meet new social needs."
      ]
    ],
    "remember": "Courts can only make law when a suitable case reaches them, and precedent and judicial approach shape what they do with it.",
    "a": {
      "q": "Why can a court not change an unfair law as soon as a judge notices it?",
      "opts": [
        "It must wait for a case from someone with standing",
        "It may only change laws that parliament has just passed",
        "It can only change the law after a public vote",
        "It needs the approval of the Attorney-General first"
      ],
      "why": "Courts make law only when a dispute is brought by a person with standing, so judges cannot start reform on their own. The Attorney-General's approval may seem likely, but the limit is not permission from anyone: it is waiting for a suitable case to reach the court.",
      "clue": "Who has to start a court case?"
    },
    "b": {
      "d": 3,
      "q": "Two judges hear similar cases. Judge Ng follows earlier decisions closely and says reform is for parliament. Judge Roy develops the law to meet new social needs. How would you describe them?",
      "opts": [
        "Ng is conservative and Roy is activist",
        "Ng is activist and Roy is conservative",
        "Both are conservative, as both are bound by precedent",
        "Both are activist, as both are making law in court"
      ],
      "why": "A conservative judge sticks to existing law and leaves change to parliament. An activist judge is more willing to develop the law. Precedent binds both judges, so it does not show who is conservative or activist.",
      "clue": "Which judge leaves reform to parliament?"
    }
  },
  "leg-courts-parliament": {
    "title": "Courts and parliament",
    "card": [
      [
        "Supremacy",
        "Parliament is supreme in law-making. If a statute and common law conflict, the statute prevails, within the limits of the Constitution."
      ],
      ["Codify", "parliament can collect common law rules into an Act. The rules then become statute law."],
      ["Abrogate", "parliament can override a common law rule by passing an Act that cancels or changes it."],
      [
        "Court influence",
        "a court decision may expose a gap in the law, or judges may comment that reform is needed. This does not change the law itself, and parliament may act but does not have to."
      ]
    ],
    "remember": "Parliament can codify or abrogate common law, and court decisions and comments can prompt it to act.",
    "a": {
      "q": "Parliament passes an Act that cancels a common law rule made in an earlier case. What is this called?",
      "opts": ["Abrogation", "Codification", "Distinguishing", "Persuasion"],
      "why": "Abrogating means overriding or cancelling common law by statute. Codification is the tempting wrong answer: it puts common law rules into an Act, rather than cancelling them.",
      "clue": "Think of the Act removing the rule, not collecting it."
    },
    "b": {
      "d": 3,
      "q": "A judge in Ballarat says a gap in the law caused an unfair result and suggests parliament should consider reform. What is the effect of this comment?",
      "opts": [
        "It can prompt reform, and parliament decides if it acts",
        "It can prompt reform, and the judge decides if it happens",
        "It binds parliament, so parliament must pass a new Act",
        "It changes the law, and parliament can later reverse it"
      ],
      "why": "A judge's comment can draw attention to a problem and may lead parliament to reform the law, but parliament is supreme and decides whether to act. The tempting wrong answer gives that choice to the judge, yet the comment does not bind parliament or change the law itself.",
      "clue": "Who has the final say in law-making?"
    }
  },
  "leg-laws-change": {
    "title": "Why laws change",
    "card": [
      "Laws are not fixed. Parliament and the courts can change them when they stop suiting the community.",
      [
        "Changing values",
        "what people think is acceptable can shift over time. Laws may then be changed to match the new view."
      ],
      [
        "New technology",
        "inventions can create situations that old laws never planned for. New or updated laws may be needed to cover them."
      ],
      [
        "A law that no longer works",
        "a law may be unclear, hard to enforce or fail to achieve its purpose. It may then be reformed or repealed (removed)."
      ]
    ],
    "remember": "Laws change to keep up with the community, with new technology and with what works.",
    "a": {
      "q": "Which situation is the best example of a law changing because of new technology?",
      "opts": [
        "Parliament creates an offence for misusing drones in crowds",
        "Parliament lowers a penalty after public attitudes soften",
        "Parliament repeals a law that police could not enforce",
        "Parliament rewrites an unclear law that courts dispute"
      ],
      "why": "Drones are a new invention that older laws did not plan for, so a new offence was needed. The option about softer attitudes shows changing values, not technology.",
      "clue": "Look for the option where a new invention creates the need."
    },
    "b": {
      "d": 3,
      "q": "A Victorian law bans an activity, but police rarely charge anyone because the wording is vague and courts keep dismissing cases. Which reason for change does this show best?",
      "opts": [
        "The law no longer works",
        "Society's values have shifted",
        "New technology has appeared",
        "The community wants a harsher penalty"
      ],
      "why": "The law is failing in practice because it is unclear and hard to enforce. Nothing in the case says attitudes changed, so changing values is the tempting but wrong choice.",
      "clue": "Ask whether the problem is the community, a new invention, or the law itself."
    }
  },
  "leg-petitions-demonstrations": {
    "title": "Petitions and demonstrations",
    "card": [
      [
        "Petition",
        "a written request to parliament, signed by many people, asking for a law to be made or changed. It shows how many people support the change."
      ],
      [
        "Demonstration",
        "a public gathering, such as a march or rally, held to show support for or opposition to a law or issue. It draws public and media attention to the issue."
      ],
      "Both are ways for people to take part in law reform without holding office. Parliament can see that an issue matters to the community.",
      "Neither can force parliament to change the law. Members of parliament decide whether to act, and they may take public support into account."
    ],
    "remember": "A petition shows how many people want change. A demonstration shows the issue to the public and the media.",
    "a": {
      "q": "What is the main thing a petition shows parliament about a proposed law change?",
      "opts": [
        "How many people support the change",
        "How the change would work in practice",
        "That the change must now be debated",
        "That the courts have approved the change"
      ],
      "why": "A petition collects signatures, so its strength is showing the number of people who want change. It does not make parliament debate or pass anything, because members of parliament still decide whether to act.",
      "clue": "Think about what a long list of signatures counts."
    },
    "b": {
      "d": 3,
      "q": "Residents of a Ballarat suburb want a law changed to protect a local creek. They hold a rally in the main street and the evening news covers it. What is the main effect of the rally on law reform?",
      "opts": [
        "It draws public and media attention to the issue",
        "It shows the exact number of people who back it",
        "It requires parliament to debate a bill on the creek",
        "It changes the law through a court decision"
      ],
      "why": "A rally is a demonstration, and its main strength is drawing public and media attention to the issue. It does not count supporters the way a petition does, and it cannot require parliament to act because members of parliament decide.",
      "clue": "A rally gets seen. Does it get counted or does it compel?"
    }
  },
  "leg-courts-law-reform": {
    "title": "Courts and law reform",
    "card": [
      "Courts apply the law to real cases. A case can show that a law is unclear, unfair or out of date.",
      [
        "Pushing parliament",
        "a judge may point out a problem in a decision. Parliament can then pass a statute to fix it."
      ],
      [
        "Changing common law",
        "common law is law made by judges through their decisions. A court can change it directly by setting a new precedent, if a higher court does not overturn it."
      ],
      "Courts cannot change a statute themselves. Only parliament can amend or repeal a statute, though courts interpret it."
    ],
    "remember": "Cases can expose problems that parliament fixes, and courts can change common law themselves.",
    "a": {
      "q": "A judge finds a statute has a gap that leads to an unfair result, and parliament later amends it. How did the court contribute to reform?",
      "opts": [
        "The case exposed the problem and pushed parliament to act",
        "The court amended the statute itself in its judgment",
        "The court changed the common law by creating a precedent",
        "The court wrote the new law and parliament only approved it"
      ],
      "why": "The case revealed the gap, and parliament, which has the power over statutes, made the change. The court did not amend the statute, which is the tempting wrong choice.",
      "clue": "Who has the power to amend a statute?"
    },
    "b": {
      "d": 3,
      "q": "Kai wins a case in the Supreme Court of Victoria, and the judge sets a new rule on a point covered only by common law. What has happened?",
      "opts": [
        "The court has changed the common law directly",
        "The court has amended a statute on this point",
        "Parliament has passed a new Act on this point",
        "The case has no effect beyond Kai's own dispute"
      ],
      "why": "The point was covered only by common law, which judges make, so the new rule changes it directly as a precedent. No statute was involved, and courts cannot amend one anyway. Nothing shows parliament has acted, and only parliament can pass an Act.",
      "clue": "Common law is made by judges, not parliament."
    }
  },
  "leg-media-law-reform": {
    "title": "The media and law reform",
    "card": [
      "The media is the channel that carries information to the public. Traditional media includes television, radio and newspapers. Social media includes platforms where users share posts and videos.",
      [
        "Raising awareness",
        "media coverage can bring a problem with the law to many people who did not know about it. Social media can spread a story quickly, and anyone can share it."
      ],
      [
        "Pressure on parliament",
        "when many people take notice of an issue, members of parliament may feel pressure to respond. This is more likely when coverage is sustained and public concern is strong."
      ],
      [
        "Limits",
        "the media does not make or change laws. Only parliament can pass a new law, and it may choose not to act."
      ]
    ],
    "remember": "The media can raise awareness and add pressure, but parliament decides whether to pass a new law.",
    "a": {
      "q": "Which statement best describes how the media can contribute to law reform?",
      "opts": [
        "It informs the public, which may put pressure on parliament",
        "It may pass a new law once public concern becomes strong",
        "It can force parliament to change a law that people dislike",
        "It can overturn an unfair law by reporting on it widely"
      ],
      "why": "The media can spread information and build public concern, which may put pressure on parliament to respond. It cannot force parliament to act, because parliament may choose not to. It cannot pass or overturn laws either, as only parliament can pass a new law.",
      "clue": "Does the media make laws, or does it influence those who do?"
    },
    "b": {
      "d": 3,
      "q": "A newspaper series in Victoria exposes a gap in the law, and the story spreads widely on social media. Several MPs then speak about the issue. What does this best show?",
      "opts": [
        "Media coverage added pressure, but parliament still decides",
        "Media coverage has changed the law through public pressure",
        "Parliament must now pass a new law to fix the gap",
        "Social media has replaced parliament as a source of law"
      ],
      "why": "The coverage raised awareness and MPs responded, which shows pressure on parliament. Speaking about an issue does not change the law, and parliament may still choose not to act. The option saying the law has changed treats pressure as if it were the outcome.",
      "clue": "Has anything been passed by parliament yet?"
    }
  },
  "leg-victorian-law-reform-commission": {
    "title": "The Victorian Law Reform Commission",
    "card": [
      "The Victorian Law Reform Commission (VLRC) is an independent body set up by an Act of the Victorian Parliament. It researches the law and suggests how to improve it.",
      "It mainly works on references: topics the Attorney-General sends it to review. It studies the current law, looks at other places' laws and asks the public for views, then writes a report with recommendations.",
      "The VLRC cannot make or change laws. Parliament decides whether to act on its report. Governments often accept recommendations, but they do not have to.",
      "Example: in 2021 the VLRC reported on how the justice system responds to sexual offences. In 2022 Parliament acted on many of its recommendations, including changes to how consent is defined."
    ],
    "remember": "The VLRC researches and recommends. Parliament decides what becomes law.",
    "a": {
      "q": "What is the main role of the VLRC in law reform?",
      "opts": [
        "To research a referred issue and recommend changes",
        "To pass a law once it has finished its research",
        "To hear appeals about laws that are unfair",
        "To order the government to adopt its reports"
      ],
      "why": "The VLRC investigates an issue sent to it and reports with recommendations. It cannot make law or order change, and Parliament decides whether to act on its advice. Passing a law is the most tempting wrong option, but it confuses a body that recommends with one that makes law.",
      "clue": "Does the VLRC decide, or does it advise?"
    },
    "b": {
      "d": 3,
      "q": "The Attorney-General refers a topic to the VLRC. After public consultation, the VLRC reports, but Parliament does not act on every recommendation. What does this show?",
      "opts": [
        "The VLRC advises, and Parliament chooses what to adopt",
        "The VLRC failed, because its reports must become law",
        "The VLRC is not independent, as it acts on a referral",
        "The VLRC can pass its own laws if Parliament delays"
      ],
      "why": "The VLRC's role is to recommend, so Parliament may adopt some, all or none of its advice. A referral does not remove its independence, because the VLRC still researches and reaches its own conclusions. The option about failure is tempting but wrongly treats its reports as binding.",
      "clue": "Who holds the power to make the final decision?"
    }
  },
  "leg-royal-commissions": {
    "title": "Royal commissions",
    "card": [
      "A royal commission is a public inquiry set up by government to investigate a matter of great public concern.",
      [
        "Strong powers",
        "it can summon witnesses, require documents and hold public hearings. These powers are stronger than those of most other inquiries."
      ],
      [
        "Recommendations",
        "it reports its findings and recommends changes to law or practice. Government is not bound to adopt them all."
      ],
      [
        "Examples",
        "the Royal Commission into Institutional Responses to Child Sexual Abuse and the Royal Commission into Aged Care Quality and Safety led to reforms."
      ]
    ],
    "remember": "Royal commissions use strong powers to investigate and recommend, but government decides what to adopt.",
    "a": {
      "q": "What power makes a royal commission different from most other inquiries?",
      "opts": [
        "It can summon witnesses and require documents",
        "It can pass laws based on its findings",
        "It can overturn court decisions it disagrees with",
        "It can force government to adopt every recommendation"
      ],
      "why": "Royal commissions can compel witnesses and documents. They only recommend, so they cannot pass laws, which is the tempting wrong choice.",
      "clue": "Think about how it gathers evidence."
    },
    "b": {
      "d": 2,
      "q": "A royal commission into aged care publishes a report with many recommendations. What happens next?",
      "opts": [
        "Government decides which recommendations to act on",
        "Every recommendation automatically becomes law",
        "The commission passes the changes in parliament",
        "The courts review and enforce each recommendation"
      ],
      "why": "The commission recommends, and government and parliament choose what to adopt. Recommendations do not become law automatically, which is the tempting wrong choice.",
      "clue": "The commission reports but does not make law."
    }
  },
  "leg-parliamentary-committees": {
    "title": "Parliamentary committees",
    "card": [
      "A parliamentary committee is a small group of members of parliament. It looks into a particular issue and reports back to parliament.",
      "Members often come from different parties, so a committee can look at an issue with views from across parliament. It can take written submissions, hold public hearings and call witnesses.",
      "After its inquiry, the committee writes a report with findings and recommendations for law reform. Parliament and the government can then decide whether to act on them.",
      "A committee can only recommend. It cannot pass a bill or make statute law itself, because only parliament can do that."
    ],
    "remember": "A committee investigates and recommends. Parliament decides whether a bill becomes law.",
    "a": {
      "q": "What is the main role of a parliamentary committee in law reform?",
      "opts": [
        "To investigate an issue and recommend changes to parliament",
        "To pass a bill into law once its inquiry has finished",
        "To decide cases that raise a problem in the law",
        "To make sure the government acts on every recommendation"
      ],
      "why": "A committee inquires into an issue and reports with recommendations. It cannot pass bills, because only parliament can do that, so the option about passing a bill is wrong.",
      "clue": "Think about what a committee can do with its findings."
    },
    "b": {
      "d": 3,
      "q": "A Victorian parliamentary committee inquires into e-scooter safety and recommends new rules for riders. Who decides whether those rules become statute law?",
      "opts": [
        "Parliament, by voting on a bill",
        "The committee, by approving its report",
        "The courts, by applying the report",
        "Voters, by holding a referendum"
      ],
      "why": "Only parliament can pass a bill, so the rules become statute law only if parliament votes for one. The committee is tempting because it wrote the recommendations, but it can only recommend. It has no power to pass a bill.",
      "clue": "Who has the power to pass a bill?"
    }
  },
  "leg-change-constitution": {
    "title": "Why change the Constitution",
    "card": [
      "The Australian Constitution was drafted in the 1890s and took effect in 1901. It is still in force, and there is no set timetable for changing it.",
      [
        "Values",
        "Australian society has changed a great deal since 1901. Changes may be sought so the document reflects what Australians now believe is fair or important."
      ],
      [
        "Rights",
        "The Constitution protects only a few rights directly, such as freedom of religion. Changes may be sought to protect rights it does not mention."
      ],
      [
        "Ways of governing",
        "Changes may be sought to update how power is shared or how government is set up, such as recognising local councils or becoming a republic."
      ]
    ],
    "remember": "An 1890s document may not fit today, so change may be sought to reflect new values, protect rights or update how Australia is governed.",
    "a": {
      "q": "The Constitution does not mention the Prime Minister. A group wants to add rules about the role. Which reason best fits?",
      "opts": [
        "Updating how power is shared in government",
        "Adding protection for a right it lacks",
        "Reflecting new beliefs about what is fair",
        "Meeting a set timetable for regular review"
      ],
      "why": "Rules about the Prime Minister's role change how government is set up and how power is shared, so this is about ways of governing. It is not a right held by people, and there is no set timetable that requires review.",
      "clue": "Would the change affect people's freedoms, or how government is set up?"
    },
    "b": {
      "d": 2,
      "q": "Jess argues that the Constitution should be changed to protect a right that Australians now widely value but it does not mention. Which idea does her argument rest on?",
      "opts": [
        "Ideas about rights have changed since the 1890s",
        "The Constitution has ceased to be law",
        "Changes are required every few years",
        "The Constitution already protects most rights"
      ],
      "why": "Jess is saying the 1890s document leaves out a right people now value, so change may be sought to protect it. The Constitution protects only a few rights directly, so her argument does not assume it already protects most of them.",
      "clue": "Her argument is about a gap between an old document and what people value today."
    }
  },
  "leg-changing-constitution": {
    "title": "Changing the Constitution",
    "card": [
      "The Constitution can be changed only by a referendum, which is a vote of electors on a proposed change. Section 128 of the Constitution sets out the steps.",
      [
        "Step one",
        "The proposed law usually passes both houses of the Commonwealth Parliament. Each house must pass it by an absolute majority, which is more than half of all its members."
      ],
      [
        "Deadlock",
        "If one house passes it twice, three months apart, and the other house refuses, the Governor-General may still put it to voters."
      ],
      [
        "Step two",
        "Voters then decide in a referendum. It needs a double majority: a national majority of all voters, and a majority of voters in at least four of the six states."
      ]
    ],
    "remember": "Parliament first, usually both houses, then a double majority of voters: a national one and at least four of the six states.",
    "a": {
      "q": "What is a double majority in a referendum?",
      "opts": [
        "A national majority and a majority of voters in most states",
        "A majority in the House and a majority in the Senate",
        "A majority of voters in every state and territory",
        "Two separate referendums that both receive a majority"
      ],
      "why": "A double majority means a majority of all voters across Australia and a majority of voters in at least four of the six states. The two houses of Parliament vote earlier, in step one, so their votes are not the double majority.",
      "clue": "Think about what voters must deliver, not Parliament."
    },
    "b": {
      "d": 3,
      "q": "A proposed change wins 55% of the national vote, but only three of the six states vote yes. What is the result?",
      "opts": [
        "It fails, because fewer than four states voted yes",
        "It passes, because a national majority voted yes",
        "It passes, because three states is half of six",
        "It goes back to Parliament to be voted on again"
      ],
      "why": "A change needs a national majority and a majority of voters in at least four of the six states. Only three states voted yes, so the second part is not met and it fails despite the national majority. Half of the states is not a majority.",
      "clue": "Count how many states are needed out of six."
    }
  },
  "leg-makes-referendum-succeed": {
    "title": "What makes a referendum succeed",
    "card": [
      "Very few referendums to change the Constitution have passed. Since 1901, only 8 of 45 have been approved, and success usually needs several factors at once.",
      [
        "Bipartisan support",
        "the major parties back the change and campaign for it. When parties split, voters often hear reasons to vote No."
      ],
      [
        "Public understanding",
        "voters know what the change means and why it is proposed. Voters who are unsure tend to vote No, even when the parties agree."
      ],
      [
        "Clear, simple question",
        "the wording is short and easy to follow, so voters can see what a Yes vote would do."
      ]
    ],
    "remember": "Referendums are more likely to pass with major party backing, informed voters and a simple question.",
    "a": {
      "q": "Which situation makes a referendum more likely to pass?",
      "opts": [
        "Both major parties campaign for a Yes vote",
        "One major party campaigns hard for a No vote",
        "Most voters have little information about the change",
        "The question is long and has several parts"
      ],
      "why": "When both major parties back a change, voters hear one message and fewer reasons to vote No. A split between the major parties does the reverse, because it gives voters reasons to doubt the change.",
      "clue": "Think about whether voters hear one message or two."
    },
    "b": {
      "d": 3,
      "q": "A government proposes a change. Both major parties support it, but surveys show most voters cannot explain what it would do. What is the most likely outcome?",
      "opts": [
        "It may fail, because unsure voters tend to vote No",
        "It should pass, because party support outweighs doubt",
        "It may fail, because bipartisan support puts voters off",
        "It should pass, because unsure voters tend to vote Yes"
      ],
      "why": "Party support helps, but it does not make up for voters who do not understand the change. Voters who are unsure tend to vote No, even when the parties agree. Bipartisan support is one factor, not enough on its own.",
      "clue": "Which of the three factors is missing here?"
    }
  },
  "leg-1967-2023-referendums": {
    "title": "The 1967 and 2023 referendums",
    "card": [
      [
        "1967",
        "A referendum in 1967 asked voters to change the Constitution about First Nations people. It passed with a very large Yes vote."
      ],
      [
        "What changed",
        "First Nations people were to be counted in the census. The Commonwealth could now make special laws for First Nations people in the states."
      ],
      [
        "2023",
        "The Voice referendum asked whether to add an Aboriginal and Torres Strait Islander Voice, an advisory body, to the Constitution. It did not pass."
      ],
      [
        "Contrast",
        "The 1967 change had wide support across parties. In 2023 the major parties were split, and the Yes vote did not win a national majority."
      ]
    ],
    "remember": "1967 passed with wide support. The 2023 Voice referendum did not pass.",
    "a": {
      "q": "What did the 1967 referendum change?",
      "opts": [
        "Census counting and wider Commonwealth law-making power",
        "A Voice to Parliament was added to the Constitution",
        "Australia became a republic with an elected president",
        "Commonwealth lost its power to make laws for the states"
      ],
      "why": "After 1967, First Nations people were counted in the census, and the Commonwealth could make special laws for First Nations people in the states. The Voice was the 2023 proposal, and it did not pass.",
      "clue": "Think of the census and who could make laws."
    },
    "b": {
      "d": 2,
      "q": "Which statement correctly compares the 1967 and 2023 referendums?",
      "opts": [
        "1967 passed, while 2023 did not pass",
        "Both passed, but 2023 had a smaller Yes vote",
        "Both failed to win a national majority",
        "1967 did not pass, while 2023 passed"
      ],
      "why": "The 1967 referendum passed with a very large Yes vote. The 2023 Voice referendum did not pass. Reversing the two results is the common mistake.",
      "clue": "One result was a clear Yes and the other was a No."
    }
  }
};
