/* A bank of Economics points that belongs to no one course.
   A course (such as edexcel-content.js) lists the ids of the points in each of its chapters. A later course that
   covers the same ideas, such as a Cambridge course, can list the same ids, and a student's progress on a point
   is kept by its id, so it would count in both. Nothing shares points yet: only the Edexcel course uses this bank.
   Ids name the idea, not the course, and start with e- so they never clash with NSW (c1p1) or Maths (m1p1).

   Written fresh in plain words for 16 to 17 year olds. Not copied from any specification, textbook, past paper
   or mark scheme. A teacher has not checked it yet, which is why the course marks its chapter as a draft.

   Each point has the same parts as in content.js:
     card      the lines a student reads. A line written as [label, text] shows the label in bold.
     remember  one line to hold on to.
     a         the check question, asked straight after the card.
     b         the practice question, asked later. d is its difficulty, 2 or 3.
   In every question the correct answer is opts[0]. The order is shuffled on screen. */
const ECON_POINTS = {

  'e-nature': {title: 'The nature of economics',
    card: [
      'Economics is the study of how people, firms and governments choose to use limited resources to meet their wants.',
      'It is a social science. It studies human behaviour, so economists can rarely run controlled experiments the way chemists can.',
      'Instead they build models: simple versions of the real world that leave out detail to show how one thing affects another.',
      'Models assume ceteris paribus, Latin for "other things being equal". Only one thing changes at a time, so its effect can be seen on its own.'
    ],
    remember: 'A model changes one thing and holds everything else still.',
    a: {q: 'Why do economists use the assumption of ceteris paribus?',
      opts: ['To see the effect of one change on its own', 'To make sure forecasts are always right', 'To include every factor in a market', 'To show what the government ought to do'],
      why: 'Holding other things equal lets an economist look at one cause on its own. Real markets have many changes at once, so the assumption makes a model simpler, not more accurate.',
      clue: 'Ceteris paribus means other things being equal.'},
    b: {d: 2, q: 'A model says a higher bus fare in Nairobi will mean fewer bus trips. The fare rises, but petrol prices jump in the same month and bus trips go up. What best explains this?',
      opts: ['Other factors changed at the same time', 'The model is wrong and should not be used again', 'Higher bus fares always lead to more trips', 'Economists cannot predict how people behave'],
      why: 'The model assumed ceteris paribus. Dearer petrol pushed some drivers onto buses, which outweighed the effect of the fare. The model can still be right about the fare on its own.',
      clue: 'What else changed that month?'}},

  'e-positive': {title: 'Positive and normative economics',
    card: [
      'A positive statement is about what is, was or will be. It can be tested against evidence, even if it turns out to be false.',
      'A normative statement is about what should be. It rests on a value judgement, so evidence alone cannot settle it.',
      'Words such as should, ought, fair and too much are signs of a normative statement.',
      'Economists use positive analysis to show the likely effects of a policy. Deciding whether to adopt it is a normative choice.'
    ],
    remember: 'Positive can be checked against evidence. Normative needs a value judgement.',
    a: {q: 'Which of these is a positive statement?',
      opts: ['Unemployment in India fell last year', 'India ought to spend more on public schools', 'Petrol taxes in India are far too high', 'It is unfair that rents rose so fast in Mumbai'],
      why: 'Whether unemployment fell can be checked against the data. The other three use ought, too high and unfair, which are value judgements.',
      clue: 'Which one could you prove right or wrong with data?'},
    b: {d: 3, q: 'Which statement is normative?',
      opts: ['Brazil should raise its tax on cigarettes', 'A tax on cigarettes would cut smoking in Brazil', 'Most Brazilians think cigarette taxes are fair', 'Cigarette taxes raise money for Brazil\'s government'],
      why: 'Should signals a value judgement. The prediction about smoking can be tested. A survey of what people think is positive too: it reports a fact about opinions, and it can be checked.',
      clue: 'A statement about what people believe can still be checked.'}},

  'e-scarcity': {title: 'Scarcity',
    card: [
      'People\'s wants are unlimited, but the resources to meet them are limited. This is the basic economic problem.',
      'There are four factors of production: land (natural resources), labour (people\'s work), capital (tools, machines and buildings) and enterprise (organising the others and taking the risk).',
      'Because resources are scarce, every choice has an opportunity cost: the value of the next best option given up.',
      'Some resources are renewable, such as forests and fish stocks if they are managed well. Others, such as oil and coal, are non-renewable and are gone once used.'
    ],
    remember: 'Scarcity forces choices, and every choice costs the next best option.',
    a: {q: 'What is the opportunity cost of a choice?',
      opts: ['The value of the next best option given up', 'The total money spent on all the options', 'The price paid for the option that is chosen', 'The value of every option that was not chosen'],
      why: 'Opportunity cost is only the next best thing you give up, not every option. It is often not money at all.',
      clue: 'In the end you only give up one alternative: the one you would have picked next.'},
    b: {d: 2, q: 'Mei, in Singapore, has a free Saturday. Her choices, best first: study for a test, a paid shift worth S$90, a day at the beach. She studies. What is her opportunity cost?',
      opts: ['The S$90 shift she gave up', 'The day at the beach', 'The S$90 shift and the beach together', 'Nothing, because studying is free'],
      why: 'Opportunity cost is the next best option, which for Mei is the shift. The beach was her third choice, so it does not count. Studying costs no money, but it still has an opportunity cost.',
      clue: 'Which option would she have picked if she could not study?'}},

  'e-ppf': {title: 'Production possibility frontiers',
    card: [
      'A production possibility frontier (PPF) shows the most an economy can make of two goods using all its resources and technology.',
      'A point on the curve uses every resource fully. A point inside means some resources are unused or wasted. A point outside cannot be reached for now.',
      'Moving along the curve shows opportunity cost: more of one good means less of the other. The curve bows outward because resources are not equally good at making both goods.',
      'The whole curve shifts out when resources or technology grow, and in when they are lost, as after a war or a natural disaster.'
    ],
    remember: 'On the curve is efficient. Inside is waste. Outside is out of reach until the curve shifts.',
    a: {q: 'An economy is at a point inside its PPF. What does this mean?',
      opts: ['Some resources are unused or used poorly', 'The economy is producing as much as it can', 'The point cannot be reached with today\'s resources', 'Its technology has improved since last year'],
      why: 'Inside the curve, the economy could make more of both goods with what it already has. Unemployed workers or idle factories put it there.',
      clue: 'Could the economy make more of both goods without new resources?'},
    b: {d: 3, q: 'Vietnam moves along its PPF to make more machinery and fewer consumer goods. What is the most likely effect in later years?',
      opts: ['Its PPF shifts outward as capital grows', 'Its PPF shifts inward as people consume less', 'It moves to a point inside its PPF', 'Its PPF stays in the same place'],
      why: 'Machines are capital. More capital means more can be made in future, so the curve shifts out. The cost is fewer consumer goods today.',
      clue: 'Machines are used to make other things.'}},

  'e-special': {title: 'Specialisation, money and financial markets',
    card: [
      'Specialisation means focusing on a narrow range of tasks or goods. The division of labour splits making one product into separate tasks, each done by different workers.',
      'Workers get quicker with practice and less time is lost moving between tasks, so output rises. The costs are dull, repetitive work and depending on others.',
      'Specialists must trade, and money makes trade easy. It is a medium of exchange, a measure of value, a store of value and a means of deferred payment (paying later, as with a loan).',
      'Financial markets, such as banks and stock markets, move money from savers to people and firms who want to borrow and invest.'
    ],
    remember: 'Specialists rely on trade, and money is what makes trade work.',
    a: {q: 'What is the main reason the division of labour raises output?',
      opts: ['Workers get faster at the task they repeat', 'Each worker makes the whole product alone', 'Firms can pay each worker a lower wage', 'Workers stop needing to trade with others'],
      why: 'Repeating one task builds speed and skill, and no time is lost changing tasks. Splitting the work makes people more dependent on trade, not less.',
      clue: 'Think about doing the same job many times a day.'},
    b: {d: 2, q: 'A family in Kenya puts some of each week\'s pay into a mobile money account to buy a fridge next year. Which function of money is this?',
      opts: ['A store of value', 'A medium of exchange', 'A measure of value', 'A means of deferred payment'],
      why: 'Holding money now to spend later uses it as a store of value. Deferred payment is paying for something after you get it, such as with a loan.',
      clue: 'The money is being kept to use later.'}},

  'e-systems': {title: 'Free market, mixed and command economies',
    card: [
      ['Free market', 'private owners and prices decide what is made. Adam Smith argued that self-interest in free markets ends up serving others, as if guided by an invisible hand.'],
      'Friedrich Hayek argued that prices carry information no planner could collect, so the state\'s role should be limited.',
      ['Command', 'the state owns most resources and plans what is made. Karl Marx argued for shared ownership. Plans often lead to shortages and waste, as planners lack the signals prices give.'],
      ['Mixed', 'markets do most of the work, while the government provides some goods and services and sets rules. Almost every economy today is mixed, from Germany to India.']
    ],
    remember: 'Market: prices decide. Command: the state decides. Mixed: both do.',
    a: {q: 'In a command economy, who mainly decides what is produced?',
      opts: ['The government, through a central plan', 'Consumers, through what they buy', 'Private firms, chasing profit', 'Banks, by choosing who gets loans'],
      why: 'In a command economy the state owns most resources and sets output targets. In a market economy, consumers and firms make these choices through prices.',
      clue: 'Command means orders from the top.'},
    b: {d: 3, q: 'A planning office sets a shoe factory a target for the number of pairs it makes. Shops fill with small sizes while larger sizes run out. What problem does this show?',
      opts: ['Planners lack the information prices give', 'Prices change too often for firms to plan', 'Private firms make too much profit on shoes', 'The government taxes shoe factories too much'],
      why: 'In a market, the shortage of large sizes would push their price up and tell firms to make more. Without prices, planners and factories miss that signal, so targets are met while people go without.',
      clue: 'What would happen to the price of large shoes in a market?'}}
};
