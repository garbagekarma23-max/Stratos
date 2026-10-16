/* A bank of Economics points that belongs to no one course.
   A course (such as edexcel-content.js) lists the ids of the points in each of its chapters. A later course that
   covers the same ideas, such as a Cambridge course, can list the same ids, and a student's progress on a point
   is kept by its id, so it would count in both. Nothing shares points yet: only the Edexcel course uses this bank.
   Ids name the idea, not the course, and start with e- so they never clash with NSW (c1p1) or Maths (m1p1).

   Written fresh in plain words for 16 to 17 year olds. Not copied from any specification, textbook, past paper
   or mark scheme. A teacher has not checked it yet, which is why the course marks its chapters as drafts.

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
      clue: 'What would happen to the price of large shoes in a market?'}},

  /* ---------- consumers and demand ---------- */

  'e-rational': {title: 'Rational decision making',
    card: [
      'Most economic models assume people act rationally. They weigh up the costs and benefits of each choice and pick the one that leaves them best off.',
      ['Consumers', 'aim to maximise utility, the satisfaction they get from what they buy. They spread their income across goods to get as much satisfaction as they can.'],
      ['Firms', 'aim to maximise profit, the gap between their total revenue and their total costs.'],
      'Real people do not always fit the model. They may lack information, follow habits, or care about others as well as themselves.'
    ],
    remember: 'Rational consumers aim for the most utility. Rational firms aim for the most profit.',
    a: {q: 'In economic models, what does a rational consumer try to maximise?',
      opts: ['The satisfaction they get from spending', 'The amount of money they have saved', 'The number of goods they can buy', 'The profit made by the shops they use'],
      why: 'Utility means satisfaction. A rational consumer spreads their income to get the most satisfaction, which is not the same as buying the most items or saving the most money.',
      clue: 'Economists call it utility.'},
    b: {d: 2, q: 'A café owner in Lisbon could open on Sundays. It would add €1,800 a month to revenue and €2,100 a month to costs. What would a profit-maximising owner do?',
      opts: ['Stay closed, as costs would rise by more', 'Open, as revenue would rise by €1,800', 'Open, as more customers is always better', 'Stay closed, as Sunday is a day of rest'],
      why: 'Opening adds €1,800 of revenue but €2,100 of costs, so profit would fall by €300 a month. A firm aiming for profit weighs what it gains against what it pays, not revenue alone.',
      clue: 'Compare what Sundays add to revenue with what they add to costs.'}},

  'e-demand': {title: 'The demand curve',
    card: [
      'Demand is the quantity of a good that consumers are willing and able to buy at each price. The demand curve slopes down: as the price falls, more is bought.',
      'One reason is diminishing marginal utility. Each extra unit gives less satisfaction than the one before, so people only buy more if the price falls.',
      ['Movement', 'a change in the good\'s own price moves along the curve. A fall in price causes an extension of demand. A rise causes a contraction.'],
      ['Shift', 'anything else moves the whole curve: income, the prices of substitutes and complements, tastes, advertising and population. More demand at every price shifts it right.']
    ],
    remember: 'The good\'s own price moves along the curve. Anything else shifts it.',
    a: {q: 'What causes a movement along the demand curve for rice?',
      opts: ['A change in the price of rice', 'A rise in the incomes of rice buyers', 'A change in the price of wheat', 'An advert telling people to eat rice'],
      why: 'Only a change in the good\'s own price moves along its demand curve. Income, the prices of other goods and advertising shift the whole curve.',
      clue: 'Which change is about rice itself?'},
    b: {d: 3, q: 'News that oats lower cholesterol spreads in Canada, and more oats are sold even though their price has not changed. What has happened?',
      opts: ['Demand for oats has shifted right', 'There has been an extension of demand', 'Demand for oats has shifted left', 'The supply of oats has shifted right'],
      why: 'Tastes changed, so more oats are wanted at the same price. That is a shift to the right. An extension of demand would need a fall in the price of oats.',
      clue: 'The price did not change.'}},

  'e-ped': {title: 'Price elasticity of demand',
    card: [
      'Price elasticity of demand (PED) measures how much the quantity demanded responds to a change in price. PED = % change in quantity demanded ÷ % change in price.',
      'PED is negative, as price and quantity move in opposite directions. Ignoring the sign, above 1 is elastic, below 1 is inelastic, 1 is unitary and 0 is perfectly inelastic.',
      'Demand is more elastic with close substitutes, when the good takes a large share of income, for luxuries rather than necessities, and over a longer time.',
      'PED shows how a price change affects total revenue (price × quantity). If demand is elastic, a price cut raises revenue. If it is inelastic, a price rise does.'
    ],
    remember: 'Elastic: a price cut raises revenue. Inelastic: a price rise does.',
    a: {q: 'The price of bubble tea in Taipei rises by 20%, and the number of cups sold falls by 10%. What is the PED?',
      opts: ['-0.5, so demand is price inelastic', '-2, so demand is price elastic', '-0.5, so demand is price elastic', '-2, so demand is price inelastic'],
      why: 'PED = -10% ÷ 20% = -0.5. Quantity changed by less than price, so demand is inelastic.',
      clue: 'The change in quantity goes on top.'},
    b: {d: 3, q: 'A cinema chain in Johannesburg cuts its ticket prices by 10% and sells 25% more tickets. What is the PED, and what happens to its ticket revenue?',
      opts: ['-2.5, and revenue rises', '-2.5, and revenue falls', '-0.4, and revenue rises', '-0.4, and revenue falls'],
      why: 'PED = 25% ÷ -10% = -2.5, so demand is elastic. The extra tickets sold outweigh the lower price, so revenue rises: 0.9 × 1.25 = 1.125, a rise of 12.5%.',
      clue: 'Divide the change in quantity by the change in price.'}},

  'e-yed': {title: 'Income elasticity of demand',
    card: [
      'Income elasticity of demand (YED) measures how demand responds to a change in income. YED = % change in quantity demanded ÷ % change in income.',
      ['Normal good', 'YED is positive: people buy more as their incomes rise. Most goods are normal. A necessity, such as bread, has a YED between 0 and 1.'],
      ['Luxury', 'a normal good with a YED above 1. Demand grows faster than income, as with overseas holidays or meals out.'],
      ['Inferior good', 'YED is negative. People buy less as their incomes rise, because they switch to something they like more, such as from bus trips to driving.']
    ],
    remember: 'Normal: positive. Luxury: above 1. Inferior: negative.',
    a: {q: 'Incomes in Indonesia rise, and people buy fewer second-hand motorbikes and more new ones. What kind of good is a second-hand motorbike?',
      opts: ['An inferior good', 'A normal good', 'A luxury good', 'A necessity'],
      why: 'Demand fell as incomes rose, so YED is negative, which makes it an inferior good. Normal goods, including luxuries and necessities, have a positive YED.',
      clue: 'Did demand go up or down as incomes rose?'},
    b: {d: 3, q: 'Average incomes in Poland rise by 4%, and the number of restaurant meals bought rises by 10%. Prices stay the same. What is the YED, and what type of good is it?',
      opts: ['2.5, a luxury good', '0.4, a necessity', '2.5, an inferior good', '-2.5, an inferior good'],
      why: 'YED = 10% ÷ 4% = 2.5. It is positive, so the good is normal, and above 1, so it is a luxury: demand grows faster than income.',
      clue: 'The change in quantity goes on top.'}},

  'e-xed': {title: 'Cross elasticity of demand',
    card: [
      'Cross elasticity of demand (XED) measures how demand for one good responds to a change in the price of another. XED = % change in quantity demanded of A ÷ % change in price of B.',
      ['Substitutes', 'XED is positive. When tea gets dearer, people buy more coffee instead. The closer the substitutes, the larger the number.'],
      ['Complements', 'goods used together, such as games consoles and games. XED is negative: when consoles get dearer, fewer games are bought.'],
      'Unrelated goods have an XED of about 0. Firms use XED to judge how a rival\'s price change will affect their own sales.'
    ],
    remember: 'Substitutes: positive. Complements: negative. Unrelated: about zero.',
    a: {q: 'Two goods have a cross elasticity of demand of +0.8. What does this tell you?',
      opts: ['They are substitutes', 'They are complements', 'They are unrelated goods', 'They are both inferior goods'],
      why: 'A positive XED means a rise in the price of one raises demand for the other, so people switch between them. Complements have a negative XED.',
      clue: 'Positive means both move the same way.'},
    b: {d: 3, q: 'Petrol prices in the Philippines rise by 20%, and sales of large cars fall by 6%. What is the XED of large cars with respect to the price of petrol?',
      opts: ['-0.3, so they are complements', '+0.3, so they are substitutes', '-3.3, so they are complements', '+3.3, so they are substitutes'],
      why: 'XED = -6% ÷ 20% = -0.3. It is negative, so the goods are complements: dearer petrol makes a large car cost more to run.',
      clue: 'The change in car sales goes on top.'}},

  /* ---------- supply ---------- */

  'e-supply': {title: 'The supply curve',
    card: [
      'Supply is the quantity of a good that producers are willing and able to sell at each price. The supply curve slopes up: as the price rises, more is offered.',
      'A higher price means more profit on each unit, and it covers the higher cost of making extra units, so firms offer more.',
      ['Movement', 'a change in the good\'s own price moves along the curve. A rise in price causes an extension of supply. A fall causes a contraction.'],
      ['Shift', 'anything else moves the whole curve: costs of production, technology, indirect taxes, subsidies, the weather and the number of firms. Lower costs shift it right.']
    ],
    remember: 'The good\'s own price moves along the supply curve. Costs and conditions shift it.',
    a: {q: 'Which of these would shift the supply curve for steel to the right?',
      opts: ['A fall in the cost of iron ore', 'A rise in the price of steel', 'A new tax on each tonne of steel', 'A rise in steelworkers\' wages'],
      why: 'Cheaper iron ore lowers the cost of each tonne, so firms offer more at every price. A rise in the price of steel moves along the curve. A tax and higher wages raise costs, which shifts it left.',
      clue: 'Which change makes steel cheaper to produce?'},
    b: {d: 3, q: 'A drought in Brazil pushes up the world price of coffee. Growers in Vietnam, untouched by the drought, sell more coffee. What does this show for Vietnam\'s growers?',
      opts: ['An extension along their supply curve', 'A shift right of their supply curve', 'A shift left of their supply curve', 'A contraction along their supply curve'],
      why: 'Nothing changed Vietnam\'s costs or growing conditions. The higher price makes selling more worthwhile, so they move up along their curve. It is Brazil\'s supply curve that shifted left.',
      clue: 'Did anything change for Vietnam\'s growers apart from the price?'}},

  'e-pes': {title: 'Price elasticity of supply',
    card: [
      'Price elasticity of supply (PES) measures how much the quantity supplied responds to a change in price. PES = % change in quantity supplied ÷ % change in price.',
      'PES is positive. Above 1 is elastic, below 1 is inelastic, and 0 is perfectly inelastic, such as the seats in a stadium on match day.',
      'Supply is more elastic when firms have spare capacity, can hold stocks, can move resources between uses easily, and when the good is quick to make.',
      'Supply is more elastic in the long run. In the short run at least one factor, such as land or a factory, is fixed. In the long run firms can build, plant and hire.'
    ],
    remember: 'Supply stretches more with time, spare capacity and stocks.',
    a: {q: 'Why is the supply of fresh durians in Malaysia price inelastic in the short run?',
      opts: ['New trees take years to bear fruit', 'Durians are too expensive to grow', 'Few people want to buy durians', 'The price of durians never changes'],
      why: 'Growers cannot add trees quickly, and fresh fruit cannot be stored for long, so a higher price brings little extra supply at first. Over years, more trees can be planted.',
      clue: 'How long does it take to grow more?'},
    b: {d: 3, q: 'The price of avocados in Peru rises by 25%. The next season, the quantity supplied rises by 10%. What is the PES, and is supply elastic or inelastic?',
      opts: ['0.4, inelastic', '2.5, elastic', '0.4, elastic', '2.5, inelastic'],
      why: 'PES = 10% ÷ 25% = 0.4. That is below 1, so supply is inelastic. Avocado trees take years to mature, so growers cannot add much in one season.',
      clue: 'Divide the change in quantity supplied by the change in price.'}},

  /* ---------- prices ---------- */

  'e-equilibrium': {title: 'Equilibrium price and quantity',
    card: [
      'Equilibrium is the price at which the quantity demanded equals the quantity supplied. The market clears: there is no shortage and no surplus.',
      'Above equilibrium there is excess supply, so sellers cut prices. Below it there is excess demand, so buyers bid prices up. Either way the price moves back to equilibrium.',
      'More demand raises price and quantity. Less demand lowers both. More supply lowers price and raises quantity. Less supply raises price and lowers quantity.',
      'When both curves shift at once, one of price or quantity is sure to move one way. The other depends on which shift is bigger.'
    ],
    remember: 'A demand shift moves price and quantity the same way. A supply shift moves them opposite ways.',
    a: {q: 'Demand for electric bikes in the Netherlands rises while supply stays the same. What happens?',
      opts: ['Price and quantity both rise', 'Price rises and quantity falls', 'Price falls and quantity rises', 'Price and quantity both fall'],
      why: 'Demand shifts right. At the old price there is a shortage, so the price is bid up, and firms extend supply. Price and quantity both end higher.',
      clue: 'A rise in demand moves price and quantity the same way.'},
    b: {d: 3, q: 'A pig virus cuts the number of pigs in China, and at the same time pork becomes less popular. What can you be sure happens in the pork market?',
      opts: ['Quantity falls, but price is uncertain', 'Price rises, but quantity is uncertain', 'Price and quantity both fall', 'Price and quantity both rise'],
      why: 'Both shifts cut quantity. But less supply pushes the price up and less demand pulls it down, so what happens to the price depends on which shift is bigger.',
      clue: 'Take each shift on its own, then put them together.'}},

  'e-surplus': {title: 'Consumer and producer surplus',
    card: [
      ['Consumer surplus', 'the difference between what consumers are willing to pay and what they actually pay. On a diagram it is the area below the demand curve and above the price.'],
      ['Producer surplus', 'the difference between the price producers get and the lowest price they would accept. It is the area above the supply curve and below the price.'],
      'If you would pay 500 rupees for a concert ticket in Mumbai and it costs 300, you gain 200 rupees of consumer surplus.',
      'Together they show what buyers and sellers gain from trade. A higher price moves surplus from consumers to producers. A lower price moves it back.'
    ],
    remember: 'Consumer surplus: paying less than you would have. Producer surplus: getting more than you needed.',
    a: {q: 'Ana in Mexico City would pay up to 800 pesos for a football shirt. She buys one for 500 pesos. What is her consumer surplus?',
      opts: ['300 pesos', '500 pesos', '800 pesos', '1,300 pesos'],
      why: 'Consumer surplus is what she was willing to pay less what she paid: 800 minus 500 is 300 pesos.',
      clue: 'Take the price paid from the most she would pay.'},
    b: {d: 3, q: 'A good harvest lowers the price of mangoes in Pakistan. What happens to consumer surplus in the mango market?',
      opts: ['It rises', 'It falls', 'It stays the same', 'It all turns into producer surplus'],
      why: 'Supply shifts right, so the price falls and more is bought. People who already bought mangoes pay less, and new buyers join, so consumer surplus grows.',
      clue: 'Buyers now pay less, and more of them buy.'}},

  'e-pricemech': {title: 'Functions of the price mechanism',
    card: [
      'In a market, prices decide how scarce resources are used. The price mechanism does this through three functions.',
      ['Rationing', 'when a good is scarce, a higher price limits it to those willing and able to pay the most.'],
      ['Signalling', 'a change in price tells buyers and sellers that conditions have changed, such as a shortage, and shows where resources are wanted.'],
      ['Incentive', 'a higher price rewards firms for making more, and a lower price encourages buyers to buy more. Resources move to where they earn the most.']
    ],
    remember: 'Prices ration, signal and give an incentive.',
    a: {q: 'Hotel prices in Paris jump during the Olympic Games, so only those willing to pay the most get a room. Which function of the price mechanism is this?',
      opts: ['Rationing', 'Signalling', 'Incentive', 'Planning'],
      why: 'Rooms are scarce, and the high price limits them to those who value them most. That is rationing. The same price also signals and gives an incentive, but this question is about who gets a room.',
      clue: 'The question is about who ends up with a room.'},
    b: {d: 3, q: 'Lithium prices rise as demand for batteries grows. Mining firms in Chile and Australia open new mines to earn the higher profits. Which function does their response show?',
      opts: ['Incentive', 'Rationing', 'Signalling', 'Equilibrium'],
      why: 'The higher price signals that more lithium is wanted. The extra profit is what gets firms to act on it, by opening mines. Acting to earn more profit is the incentive function.',
      clue: 'What makes the firms open new mines?'}},

  'e-taxsub': {title: 'Indirect taxes and subsidies',
    card: [
      'An indirect tax is a tax on spending, paid to the government by sellers. A specific tax is a fixed amount per unit, such as 50 cents a litre. An ad valorem tax is a percentage of the price, such as VAT.',
      'A tax raises costs, so supply shifts up: by the same amount at every price for a specific tax, and by more at higher prices for an ad valorem tax.',
      'The price usually rises by less than the tax. Incidence is how the tax is split: consumers pay the rise in price, producers the rest. The more inelastic demand is, the more consumers pay.',
      'A subsidy is a payment to producers for each unit. Supply shifts right, so the price falls and quantity rises. The gain is split between consumers and producers.'
    ],
    remember: 'Most of a tax falls on whichever side, buyers or sellers, is less elastic.',
    a: {q: 'South Africa charges VAT at 15% of the price of most goods. What kind of tax is this?',
      opts: ['An ad valorem indirect tax', 'A specific indirect tax', 'A direct tax on income', 'A subsidy paid to producers'],
      why: 'VAT is a percentage of the price, which makes it ad valorem. A specific tax is a fixed amount per unit. It is indirect because it is charged on spending, not on income.',
      clue: 'Is it a fixed amount or a percentage?'},
    b: {d: 3, q: 'Thailand adds a tax of 10 baht to each packet of cigarettes, and the price buyers pay rises by 8 baht. How is the tax split?',
      opts: ['Consumers pay 8 baht, producers 2 baht', 'Consumers pay 2 baht, producers 8 baht', 'Consumers pay all 10 baht of it', 'Producers pay all 10 baht of it'],
      why: 'Consumers pay the rise in price, 8 baht. Sellers hand 10 baht to the government but get only 8 baht more from buyers, so they keep 2 baht less per packet. Demand for cigarettes is inelastic, so most falls on smokers.',
      clue: 'How much did the price buyers pay go up?'}},

  /* ---------- market failure ---------- */

  'e-failure': {title: 'Market failure',
    card: [
      'Market failure is when a free market uses resources inefficiently. Too much or too little of a good is made, compared with what is best for society as a whole.',
      ['Externalities', 'costs or benefits that fall on third parties outside the deal, such as smoke from a factory.'],
      ['Under-provision of public goods', 'goods such as street lights, which markets supply too little of, or none at all, because people cannot be made to pay.'],
      ['Information gaps', 'when buyers or sellers lack what they need to know to choose well, such as a buyer who cannot judge a used car.']
    ],
    remember: 'Market failure is the wrong amount made, judged by what is best for society.',
    a: {q: 'What is market failure?',
      opts: ['When a market uses resources inefficiently', 'When a firm goes out of business', 'When prices rise faster than incomes', 'When the government sets prices too low'],
      why: 'Market failure means a free market makes too much or too little of something compared with what is best for society. A firm closing can be a sign the market is working.',
      clue: 'Think about society as a whole, not one firm.'},
    b: {d: 2, q: 'Smoke from farmers burning crop stubble in Punjab causes breathing problems for people in Delhi. Which type of market failure is this?',
      opts: ['An externality', 'A public good', 'An information gap', 'A speculative bubble'],
      why: 'The people in Delhi are third parties. They have no part in the farmers\' choices but bear a cost. That is a negative externality.',
      clue: 'Who bears the cost, and were they part of the deal?'}},

  'e-externality': {title: 'Externalities',
    card: [
      'Private costs and benefits fall on the buyer and seller. External ones fall on third parties. Social cost = private cost + external cost, and social benefit works the same way.',
      ['Negative externality', 'an external cost, such as noise from an airport. The market makes more than the social optimum, because firms ignore the cost to others.'],
      ['Positive externality', 'an external benefit, such as a vaccine, which also protects others. The market makes less than the social optimum, because buyers ignore the benefit to others.'],
      'The social optimum is where marginal social cost equals marginal social benefit. Any gap between it and the market\'s output causes a welfare loss.'
    ],
    remember: 'Social = private + external. A free market ignores the external part.',
    a: {q: 'A cement factory in Vietnam pollutes a river that fishers rely on. What is the cost to the fishers?',
      opts: ['An external cost', 'A private cost', 'A social benefit', 'A private benefit'],
      why: 'The fishers are third parties. They are not part of the deal between the factory and its buyers, but they bear a cost. That is an external cost, which is part of the social cost.',
      clue: 'Are the fishers buying or selling cement?'},
    b: {d: 3, q: 'Flu jabs in Japan protect the people who get them and also slow the spread of flu to others. Left to a free market, how many flu jabs would be bought?',
      opts: ['Fewer than the social optimum', 'More than the social optimum', 'Exactly the social optimum', 'None, because jabs are public goods'],
      why: 'Buyers weigh only their own benefit and ignore the protection given to others. Social benefit is higher than private benefit, so the market buys too few.',
      clue: 'Do buyers count the benefit to other people?'}},

  'e-public': {title: 'Public goods',
    card: [
      'A public good has two features. It is non-rival: one person using it leaves no less for others. It is non-excludable: once it is provided, no one can be stopped from using it.',
      'Examples include street lighting, flood defences, national defence and lighthouses.',
      'Because no one can be shut out, people can use the good without paying. This is the free rider problem. Firms cannot make people pay, so the market provides too little or none at all.',
      'Most goods are private goods: rival and excludable. Some are partly public, such as a road, which can get crowded and can be tolled.'
    ],
    remember: 'Non-rival and non-excludable, so free riders stop the market supplying it.',
    a: {q: 'Why would a free market not provide enough flood defences for a town in Bangladesh?',
      opts: ['People can be protected without paying', 'Flood defences cost too much to build', 'Few people in the town want flood defences', 'The government owns all the riverbank land'],
      why: 'Once a flood wall is built, everyone behind it is protected, whether they paid or not. People can free ride, so no firm can charge enough to cover the cost.',
      clue: 'Could a firm stop someone who did not pay from being protected?'},
    b: {d: 3, q: 'A streaming service in Brazil shows films to members only. One more viewer does not stop anyone else watching. Why is it not a public good?',
      opts: ['It is excludable', 'It is rival', 'It costs money to make', 'It is supplied by a private firm'],
      why: 'Watching is non-rival, but people who do not pay can be shut out. That makes it excludable, so the firm can charge and free riding is not a problem.',
      clue: 'Can people who do not pay be stopped?'}},

  'e-info': {title: 'Information gaps',
    card: [
      'Markets work best when buyers and sellers know what they are trading. Imperfect information is when they lack what they need to choose well, such as the long-term harm of smoking.',
      'Asymmetric information is when one side knows more than the other. The seller of a used car knows its faults, but the buyer may not.',
      'Moral hazard is when someone takes more risk because someone else will bear the cost. A driver with full insurance may take less care, and a bank that expects to be rescued may lend recklessly.',
      'Information gaps lead to too much of harmful goods, and too little of helpful ones such as pensions and health checks.'
    ],
    remember: 'When one side knows more than the other, information is asymmetric.',
    a: {q: 'A seller in Turkey knows a used car has a faulty gearbox, but the buyer does not. What is this an example of?',
      opts: ['Asymmetric information', 'Moral hazard', 'A public good', 'A positive externality'],
      why: 'One side of the deal knows more than the other, which is asymmetric information. The buyer may pay more than the car is worth.',
      clue: 'Who knows more?'},
    b: {d: 3, q: 'Before 2008, many large banks in the United States expected the government to rescue them if their loans went bad, so they made riskier loans. What does this show?',
      opts: ['Moral hazard', 'Asymmetric information', 'A free rider problem', 'A negative externality'],
      why: 'The banks took more risk because they expected others, the taxpayers, to bear the losses. That is moral hazard.',
      clue: 'Who would pay if the risky loans failed?'}},

  'e-bubbles': {title: 'Speculation and market bubbles',
    card: [
      'Speculation is buying an asset, such as shares, houses or gold, in the hope of selling it later at a higher price.',
      'A bubble forms when prices rise far above an asset\'s real value, because people expect them to keep rising. Rising prices draw in more buyers, which pushes prices higher.',
      'When confidence breaks, everyone sells at once and prices crash, as with tulip bulbs in the Netherlands in the 1630s, US internet shares in 2000, and houses in Ireland and Spain around 2008.',
      'Bubbles are a market failure because prices stop giving accurate signals. Resources flow to the wrong uses, and a crash can hurt banks and the whole economy.'
    ],
    remember: 'In a bubble, prices rise on the hope of higher prices, not on real value.',
    a: {q: 'What is speculation?',
      opts: ['Buying an asset in the hope its price rises', 'Buying goods to use them straight away', 'Selling goods for less than they cost to make', 'Saving money in a bank to earn interest'],
      why: 'A speculator buys to sell later at a profit, not to use the asset. Saving in a bank earns interest but does not rely on prices rising.',
      clue: 'The buyer cares about the future price.'},
    b: {d: 3, q: 'House prices in Spain rose fast in the early 2000s as buyers expected them to keep rising, then crashed after 2008. Why is this a market failure?',
      opts: ['Prices stopped showing what houses were worth', 'House prices should never be allowed to fall', 'Too few people in Spain wanted to buy a home', 'Buyers had to pay tax on their houses'],
      why: 'Prices rose because people expected more rises, not because houses were worth more. That false signal drew too many resources into building, and the crash left empty homes and bad loans.',
      clue: 'What were prices telling builders and buyers?'}},

  /* ---------- government intervention ---------- */

  'e-correct': {title: 'Correcting externalities with taxes and subsidies',
    card: [
      'A tax on a good with external costs makes the firm pay for the harm. Ideally the tax per unit equals the external cost, so output falls to the social optimum.',
      'Examples include fuel taxes and taxes on sugary drinks, as in Mexico and the UK. The money raised can pay to deal with the harm.',
      'A subsidy on a good with external benefits lowers its price, so more is bought, closer to the social optimum. Examples include subsidies for solar panels, public transport and vaccines.',
      'Both are hard to set right, as external costs and benefits are hard to measure. A tax changes little if demand is price inelastic, and a subsidy has an opportunity cost.'
    ],
    remember: 'Tax the harm, subsidise the help, and aim for the social optimum.',
    a: {q: 'Why might the government of Norway put a high tax on petrol?',
      opts: ['So drivers pay for the pollution they cause', 'So petrol is cheaper for poorer drivers', 'So that more petrol is bought and sold', 'So that car makers earn less profit on cars'],
      why: 'Burning petrol pollutes the air, a cost to third parties. A tax raises the price, so less is bought, and drivers bear more of the cost they cause.',
      clue: 'Who bears the cost of pollution without the tax?'},
    b: {d: 3, q: 'Mexico adds a tax of one peso a litre to sugary drinks. Suppose demand for them is very price inelastic. What is the likely result?',
      opts: ['Consumption falls only a little', 'Consumption falls sharply', 'Consumption rises', 'The price of sugary drinks falls'],
      why: 'With inelastic demand, a higher price cuts the quantity bought only a little. The tax still raises money, but it does less to cut consumption. This is one limit of using a tax to correct an externality.',
      clue: 'Inelastic means quantity does not respond much to price.'}},

  'e-maxmin': {title: 'Maximum and minimum prices',
    card: [
      ['Maximum price', 'a legal limit set below equilibrium, such as rent controls in Stockholm. It helps buyers who get the good, but causes excess demand: a shortage.'],
      'Shortages bring queues, waiting lists and black markets, where goods are sold illegally above the maximum price. Sellers may also let quality slip.',
      ['Minimum price', 'a legal floor set above equilibrium, such as Scotland\'s minimum price for each unit of alcohol. It causes excess supply: a surplus.'],
      'With a minimum price for a farm good, the government may have to buy up the surplus. In the simple model, a minimum wage above equilibrium causes a surplus of labour: unemployment.'
    ],
    remember: 'A maximum price below equilibrium makes a shortage. A minimum price above it makes a surplus.',
    a: {q: 'A government sets a maximum rent for flats, below the market rent. What is the likely result?',
      opts: ['More people want flats than are on offer', 'More flats are offered than people want', 'Rents rise above the market level', 'The number of flats to rent rises'],
      why: 'Below equilibrium, more people want to rent at the lower price, and landlords offer fewer flats. The result is a shortage, with waiting lists.',
      clue: 'At a lower rent, what happens to demand and to supply?'},
    b: {d: 3, q: 'Thailand sets a minimum price for rice below the price rice already sells for. What is the effect?',
      opts: ['None, the market price is already higher', 'A surplus of rice builds up', 'A shortage of rice builds up', 'The rice price falls to the new minimum'],
      why: 'A minimum price is a floor. It only has an effect if it is above equilibrium. Here the market price is already higher, so the floor changes nothing.',
      clue: 'A floor only matters if the price would fall below it.'}},

  'e-permits': {title: 'Permits, state provision, information and regulation',
    card: [
      ['Tradable pollution permits', 'the government caps total emissions and gives out permits up to the cap. Firms that cut emissions cheaply sell spare permits to others. The EU and China use them for carbon.'],
      ['State provision', 'the government supplies a good itself, paid for by taxes, such as street lights or schools. This gets round free riders, but the state may not know how much people want.'],
      ['Information', 'campaigns, labels and warnings help people choose better, such as health warnings on cigarettes or energy ratings on fridges.'],
      ['Regulation', 'laws that ban or limit something, such as limits on factory emissions. They only work if they are enforced, which costs money.']
    ],
    remember: 'Cap and trade, provide it, inform people, or set rules.',
    a: {q: 'Under a tradable pollution permit scheme, why might a firm sell some of its permits?',
      opts: ['It has cut its emissions below its allowance', 'It wants to pollute more than before', 'The government has told it to close down', 'Its permits are about to be made free to all'],
      why: 'A firm that cuts emissions cheaply needs fewer permits, so it can sell the spare ones. This rewards cutting pollution where it costs least.',
      clue: 'Who would have permits left over?'},
    b: {d: 3, q: 'Canada makes cigarette packets carry large pictures and warnings about the harm of smoking. Which type of intervention is this?',
      opts: ['Providing information', 'State provision', 'A tradable permit scheme', 'A maximum price'],
      why: 'The warnings close an information gap: smokers may not weigh the long-term harm. Better information should cut demand towards the social optimum.',
      clue: 'What do the warnings give smokers?'}},

  'e-govfail': {title: 'Government failure',
    card: [
      'Government failure is when intervention leads to a worse use of resources than doing nothing, or creates new problems.',
      ['Distorted price signals', 'taxes, subsidies and price controls change prices, which can send resources to the wrong uses. Guaranteed farm prices in the EU in the 1980s led to butter mountains.'],
      ['Unintended consequences', 'people react in ways the policy did not expect. EU fishing quotas once led crews to throw dead fish back rather than land more than their quota.'],
      ['Costs and information gaps', 'a policy can cost more to run than it saves, and a government may not know the size of an external cost, so it sets a tax at the wrong level.']
    ],
    remember: 'Intervention can fail too, and leave things worse than before.',
    a: {q: 'What is government failure?',
      opts: ['When intervention makes resource use worse', 'When a government loses an election', 'When a market makes too much of a good', 'When a government spends more than it taxes'],
      why: 'Government failure is when a policy meant to fix a problem leaves society worse off. A market making too much of a good on its own is market failure. Spending more than tax brings in is a budget deficit.',
      clue: 'The problem is caused by the fix.'},
    b: {d: 3, q: 'Malaysia raises its cigarette tax sharply, and smuggled cigarettes, sold with no tax or checks, become common. What cause of government failure is this?',
      opts: ['Unintended consequences', 'Free riders', 'Asymmetric information', 'A positive externality'],
      why: 'The tax aimed to cut smoking, but many smokers switched to illegal cigarettes, which raise no tax and may be less safe. The policy caused a problem it did not plan for.',
      clue: 'Did the government plan for this reaction?'}},

  /* ---------- measures of economic performance ---------- */

  'e-gdp': {title: 'Measuring economic growth',
    card: [
      'Gross domestic product (GDP) is the total value of the goods and services produced in a country in a year. Economic growth is a rise in real GDP.',
      ['Nominal GDP', 'measured at the prices of the time. It can rise just because prices rise, even if no more is made.'],
      ['Real GDP', 'nominal GDP adjusted for inflation, so it shows the change in output alone. Real GDP = nominal GDP × 100 ÷ the price index, with the base year at 100.'],
      'GDP per capita is GDP divided by the population. It gives a rough idea of output per person, so large and small countries can be compared.'
    ],
    remember: 'Real GDP takes out price rises. Per capita divides by the population.',
    a: {q: 'Argentina\'s nominal GDP rises by 50% in a year in which prices also rise by 50%. What has happened to real GDP?',
      opts: ['It has stayed about the same', 'It has risen by about 50%', 'It has risen by about 100%', 'It has fallen by about 50%'],
      why: 'The money value of output rose by 50%, but prices rose by the same amount, so the amount actually produced barely changed. Real GDP takes the price rise out.',
      clue: 'How much of the rise came from higher prices?'},
    b: {d: 3, q: 'Brazil\'s nominal GDP is R$10 trillion this year. The price index is 125, with the base year at 100. What is real GDP in base year prices?',
      opts: ['R$8 trillion', 'R$12.5 trillion', 'R$10 trillion', 'R$1.25 trillion'],
      why: 'Real GDP = R$10 trillion × 100 ÷ 125 = R$8 trillion. Prices are 25% higher than in the base year, so the money value overstates how much was made.',
      clue: 'Multiply by 100, then divide by the price index.'}},

  'e-living': {title: 'Comparing living standards',
    card: [
      ['Gross national income (GNI)', 'GDP plus income a country\'s people and firms earn abroad, less income foreign owners take out. In Ireland, where many foreign firms book their profits, GNI is well below GDP.'],
      ['Purchasing power parity (PPP)', 'converts incomes at rates that allow for what money buys in each country. A haircut costs far less in India than in Switzerland, so PPP compares what incomes can really buy.'],
      'GDP leaves a lot out: unpaid work at home, the hidden economy, leisure time, pollution, and how income is shared. A country can grow while most people are no better off.',
      'Wider measures exist. The Human Development Index (HDI) combines life expectancy, years of schooling and income per person. Bhutan measures Gross National Happiness.'
    ],
    remember: 'Income per person is a start, but it misses much of what makes life good.',
    a: {q: 'Why do economists use purchasing power parity to compare incomes between countries?',
      opts: ['Prices differ from country to country', 'Exchange rates are set by each government', 'GDP figures leave out government spending', 'It adds the value of unpaid work at home'],
      why: 'The same income buys more where prices are lower. PPP allows for this, so incomes are compared by what they can buy, not just at market exchange rates.',
      clue: 'Think about what US$100 buys in Vietnam and in Norway.'},
    b: {d: 3, q: 'Two countries have the same real GDP per capita. In one, life expectancy is 82 and most children finish school. In the other, it is 64 and many leave school early. What does this show?',
      opts: ['GDP per capita misses parts of wellbeing', 'The second must have a larger hidden economy', 'The first must have a higher inflation rate', 'Both have the same standard of living'],
      why: 'Equal income per person can come with very different health and education. Measures such as the HDI include these, so they would rank the first country well above the second.',
      clue: 'Is income all that makes up a standard of living?'}},

  'e-cpi': {title: 'Measuring inflation',
    card: [
      'Inflation is a sustained rise in the general price level. It is measured with a price index, such as the consumer price index (CPI). Inflation = change in the index ÷ the starting index × 100.',
      'The CPI tracks the price of a basket of goods and services that households buy. Each item is weighted by its share of spending, found from a survey of households, so a rise in rent counts for more than a rise in the price of salt.',
      ['Deflation', 'a fall in the price level, as in Japan in many years from the late 1990s. Disinflation is when inflation falls but stays above zero: prices still rise, only more slowly.'],
      'Price indices have limits. The basket may not match a given household, new products and better quality are hard to allow for, and people switch to cheaper goods when prices rise.'
    ],
    remember: 'Deflation: prices fall. Disinflation: prices still rise, but more slowly.',
    a: {q: 'South Africa\'s CPI rises from 120 to 126 over a year. What is the rate of inflation?',
      opts: ['5%', '6%', '4.8%', '26%'],
      why: 'Inflation = (126 - 120) ÷ 120 × 100 = 5%. The change is divided by the starting value. Dividing by the ending value gives 4.8%, and 6 is the change in points, not a percentage.',
      clue: 'Divide the change by where the index started.'},
    b: {d: 3, q: 'Inflation in Mexico falls from 8% one year to 4% the next. What has happened to prices?',
      opts: ['They are still rising, but more slowly', 'They have fallen by 4%', 'They are back to where they were before', 'They are rising twice as fast'],
      why: 'Inflation of 4% still means prices are rising, at half the speed. This is disinflation. Prices only fall when inflation goes below zero, which is deflation.',
      clue: 'Is 4% inflation above or below zero?'}},

  'e-inflation': {title: 'Causes and effects of inflation',
    card: [
      ['Demand-pull', 'aggregate demand grows faster than the economy can produce, so firms raise prices. Causes include a spending boom, cheap credit or a big rise in government spending.'],
      ['Cost-push', 'firms\' costs rise and they pass them on as higher prices. Causes include higher wages, dearer oil and energy, and a weaker currency that makes imports cost more. Energy prices pushed up inflation across Europe in 2022.'],
      'Consumers lose if prices rise faster than their pay. Savers lose if interest is below inflation, while borrowers gain, as the real value of their debt shrinks. People on fixed incomes are hit hardest.',
      'Firms face uncertainty, which can hold back investment, and their exports become less competitive. The government collects more tax as prices rise, but pays more on pensions and benefits that rise with prices.'
    ],
    remember: 'Demand-pull: too much spending. Cost-push: rising costs.',
    a: {q: 'The world price of oil doubles, and petrol, transport and food all cost more in India. What type of inflation is this?',
      opts: ['Cost-push inflation', 'Demand-pull inflation', 'Deflation', 'Disinflation'],
      why: 'Oil is a cost for many firms. When it rises, they raise their prices to cover it, which is cost-push inflation. Nothing here says spending rose.',
      clue: 'Did spending rise, or did costs?'},
    b: {d: 3, q: 'Inflation in Turkey is 40% a year, and banks pay 20% interest on savings. Who is most likely to gain?',
      opts: ['Borrowers with fixed-rate loans', 'Savers with money in a bank account', 'Pensioners on a fixed pension', 'Workers whose pay is frozen'],
      why: 'Prices rise faster than the interest on a fixed-rate loan, so the real value of what borrowers owe shrinks. Savers lose, as 20% interest does not keep up with 40% inflation, and fixed incomes buy less each year.',
      clue: 'Whose debt shrinks in real terms?'}},

  'e-labour': {title: 'Measuring unemployment',
    card: [
      'A person is unemployed if they are out of work, want a job and are looking for one. The labour force is everyone in work or unemployed. Unemployment rate = unemployed ÷ labour force × 100.',
      'People out of work who are not looking, such as full-time students, retirees and many carers, are economically inactive. They are not in the labour force, so they do not count as unemployed.',
      ['Claimant count', 'the number of people claiming unemployment benefits. It misses people who are looking but do not claim. The Labour Force Survey asks households directly, using the international (ILO) definition. The two figures can differ by a lot.'],
      ['Underemployment', 'people in work who want more hours, or who are in jobs below their skills. They count as employed, so the unemployment rate can look low while many people want more work.']
    ],
    remember: 'Unemployment rate = unemployed ÷ (employed + unemployed) × 100.',
    a: {q: 'In Canada, 19 million people are in work, 1 million are unemployed and 10 million adults are inactive. What is the unemployment rate?',
      opts: ['5%', '3.3%', '5.3%', '10%'],
      why: 'The labour force is 19 + 1 = 20 million, so the rate is 1 ÷ 20 × 100 = 5%. Inactive people are not in the labour force, so they are left out. Dividing by the employed alone gives 5.3%.',
      clue: 'The labour force is people in work plus people looking for work.'},
    b: {d: 3, q: 'Nour, an engineering graduate in Cairo, works 15 hours a week in a shop and wants a full-time job as an engineer. How is Nour counted?',
      opts: ['Employed, but underemployed', 'Unemployed', 'Economically inactive', 'Unemployed and claiming benefits'],
      why: 'Nour has paid work, so counts as employed, even though it is part-time and below their skills. This is underemployment, which the unemployment rate does not show.',
      clue: 'Does Nour have any paid work?'}},

  'e-unemployment': {title: 'Causes and effects of unemployment',
    card: [
      'Frictional unemployment is people between jobs while they search, such as a graduate looking for a first job. Seasonal unemployment comes and goes with the time of year, as in tourism or harvest work.',
      'Structural unemployment is when an industry shrinks for good and workers lack the skills, or live in the wrong place, for the new jobs. This happened when coal mines closed across Wales and northern England in the 1980s.',
      'Cyclical unemployment, also called demand-deficient, rises in a recession, when spending falls and firms need fewer workers. Spain\'s unemployment rose above 25% after the 2008 crisis.',
      'For people, unemployment means lost income, fading skills and worse health. For the economy, it means lost output, less tax revenue and more spent on benefits. Firms find workers more easily, but sell less.'
    ],
    remember: 'Frictional: between jobs. Seasonal: time of year. Structural: a shrinking industry. Cyclical: a recession.',
    a: {q: 'As car makers moved their factories out of Detroit, many workers without the skills for other jobs stayed out of work for years. What type of unemployment is this?',
      opts: ['Structural', 'Cyclical', 'Frictional', 'Seasonal'],
      why: 'The industry shrank for good, and workers\' skills did not match the jobs on offer. That is structural unemployment. It lasts until people retrain or move, so it is often long-term.',
      clue: 'Would the jobs come back when the economy recovers?'},
    b: {d: 3, q: 'Unemployment in South Africa is above 30%. Which of these is a cost of it for the government?',
      opts: ['Lower tax revenue', 'Easier hiring for firms', 'Faster wage growth', 'Less traffic on roads'],
      why: 'People without jobs pay no income tax and spend less, so less tax comes in on spending too. Easier hiring is an effect on firms, and high unemployment tends to slow wage growth, not speed it up.',
      clue: 'What do people in work pay that people out of work do not?'}},

  'e-bop': {title: 'The balance of payments',
    card: [
      'The balance of payments records all the money flowing into and out of a country. The current account covers trade and income, and is the part most often in the news.',
      ['Trade in goods and services', 'exports bring money in, and imports send it out. Goods are things such as cars and coffee. Services include tourism, banking and teaching students from abroad.'],
      'Primary income is earnings from abroad, such as profits, interest and wages. Secondary income is transfers with nothing traded in return, such as foreign aid and the money migrants send home, a large inflow for the Philippines and Nepal.',
      'A current account deficit means more flows out than in, paid for by borrowing from abroad or selling assets. The United States has run deficits for decades, while Germany runs large surpluses.'
    ],
    remember: 'Current account: goods, services, primary income and secondary income.',
    a: {q: 'People from Nepal working in Qatar send money home to their families. Where does this go in Nepal\'s balance of payments?',
      opts: ['Secondary income on the current account', 'Exports of services', 'Primary income on the current account', 'Imports of goods'],
      why: 'The money is a gift to the families, with nothing given in return, so it is a transfer. Transfers go in secondary income. Primary income is earnings such as profits and interest.',
      clue: 'Do the families give anything back for the money?'},
    b: {d: 3, q: 'Australia\'s trade in goods is +A$40 billion, trade in services -A$10 billion, primary income -A$60 billion and secondary income -A$2 billion. What is the current account balance?',
      opts: ['A deficit of A$32 billion', 'A surplus of A$32 billion', 'A surplus of A$40 billion', 'A deficit of A$72 billion'],
      why: 'Add the four parts: 40 - 10 - 60 - 2 = -32. The surplus on goods is outweighed by the income paid to foreign owners of Australian assets, so the current account is in deficit.',
      clue: 'Add up all four parts, minding the signs.'}},

  /* ---------- aggregate demand ---------- */

  'e-ad': {title: 'Aggregate demand',
    card: [
      'Aggregate demand (AD) is the total spending on a country\'s goods and services at each price level. AD = C + I + G + (X - M).',
      'C is consumption by households, I is investment by firms, G is government spending, and X - M is net exports: exports minus imports. Imports are taken away because that spending goes to other countries.',
      'The AD curve slopes down. A higher price level cuts what people\'s money and savings will buy, tends to push up interest rates, and makes exports dearer and imports cheaper.',
      ['Movement and shift', 'a change in the price level moves along the AD curve. A change in any part of AD, such as a cut in income tax or a rise in exports, shifts the whole curve.']
    ],
    remember: 'AD = C + I + G + (X - M). The price level moves along it. Anything else shifts it.',
    a: {q: 'In a year in Chile, households spend $200 billion, firms invest $60 billion, the government spends $50 billion, exports are $90 billion and imports $100 billion. What is AD?',
      opts: ['$300 billion', '$500 billion', '$400 billion', '$210 billion'],
      why: 'AD = 200 + 60 + 50 + (90 - 100) = $300 billion. Net exports are -$10 billion, because more is spent on imports than is earned from exports.',
      clue: 'Imports are taken away.'},
    b: {d: 3, q: 'The price level in New Zealand rises, and total spending on its goods and services falls. How is this shown?',
      opts: ['A movement up along the AD curve', 'A shift of the AD curve to the left', 'A shift of the AD curve to the right', 'A movement down along the AD curve'],
      why: 'A change in the price level moves along the AD curve, not the whole curve. A higher price level with less spending is a movement up and to the left along it.',
      clue: 'What changed first: the price level, or a part of AD?'}},

  'e-consumption': {title: 'Consumption and saving',
    card: [
      'Consumption is household spending on goods and services, the largest part of AD in most countries. Saving is the part of income that is not spent.',
      ['Income', 'the main influence. As disposable income (income after tax and benefits) rises, people spend more. The marginal propensity to consume (MPC) is the share of each extra dollar that is spent.'],
      ['Interest rates', 'higher rates make borrowing dearer and saving more rewarding, so people spend less. Lower rates do the reverse.'],
      ['Confidence and wealth', 'people who feel their jobs are safe spend more. When house or share prices rise, owners feel richer and spend more. This is the wealth effect.']
    ],
    remember: 'Income, interest rates, confidence and wealth move consumption.',
    a: {q: 'Brazil\'s central bank raises interest rates. What is the likely effect on consumption?',
      opts: ['It falls, as borrowing costs more', 'It rises, as savers earn more to spend', 'It falls, as house prices rise', 'It stays the same, as income has not changed'],
      why: 'Higher rates make loans and credit cards dearer and give savers a better return, so households borrow less and save more. Some savers earn more, but on the whole spending falls.',
      clue: 'Think about people with loans.'},
    b: {d: 3, q: 'Share and house prices fall sharply in South Korea, but incomes stay the same. What is likely to happen to consumption?',
      opts: ['It falls, as households feel less wealthy', 'It rises, as homes are now cheaper to buy', 'It stays the same, as incomes have not changed', 'It rises, as people save less'],
      why: 'This is the wealth effect working in reverse. Owners of shares and houses feel poorer, so they spend less and save more, even though their incomes have not changed.',
      clue: 'How do owners of homes and shares feel?'}},

  'e-investment': {title: 'Investment',
    card: [
      'Investment is spending by firms on capital goods, such as machines, buildings and software, used to make more in future. Buying shares is not investment in this sense.',
      ['Interest rates', 'many firms borrow to invest, so higher rates make a project cost more and fewer go ahead. A firm using its own money gives up the interest it could have earned.'],
      ['Expected demand and confidence', 'firms invest when they expect sales to grow. Keynes called the moods behind these choices animal spirits. Faster growth in demand can bring an even faster rise in investment.'],
      ['Technology and government', 'new technology, such as robots or cloud computing, makes new capital worth buying. Governments can encourage investment with tax breaks, or hold it back with rules that keep changing.']
    ],
    remember: 'Firms invest when borrowing is cheap and they expect to sell more.',
    a: {q: 'Which of these counts as investment in AD?',
      opts: ['A factory in Vietnam buys new machines', 'A family in Hanoi buys shares in a bank', 'A student puts money in a savings account', 'The government pays pensions to retirees'],
      why: 'Investment is firms buying capital goods to make more in future. Buying shares or saving moves money from one owner to another, and pensions are transfers, not spending on output.',
      clue: 'Which one adds to what can be made in future?'},
    b: {d: 3, q: 'Firms in Germany expect demand for their goods to fall next year, even though interest rates are low. What is likely to happen to investment?',
      opts: ['It falls, as new capital may sit idle', 'It rises, as borrowing is cheap', 'It stays the same, as rates have not changed', 'It rises, as firms need to cut costs'],
      why: 'Cheap loans help only if new machines will be used. If firms expect lower sales, extra capital would sit idle, so their expectations outweigh low interest rates.',
      clue: 'Why buy a machine you will not need?'}},

  'e-govtrade': {title: 'Government spending and net trade',
    card: [
      'Government spending (G) covers public services and projects, such as schools, hospitals, roads and defence. Transfer payments, such as pensions and unemployment benefits, are not part of G, as nothing is produced in return.',
      'Net trade is exports minus imports. Exports add to AD, as foreign buyers spend on home goods. Imports take away from it.',
      ['Exchange rates', 'a weaker currency makes exports cheaper abroad and imports dearer at home, so net trade tends to rise. A weaker yen helps Japan\'s car makers sell overseas.'],
      ['Incomes abroad and trade barriers', 'faster growth in trading partners raises demand for exports. Tariffs and quotas abroad make exports harder to sell. Higher inflation at home makes exports less competitive.']
    ],
    remember: 'A weaker currency and growing trading partners help net exports.',
    a: {q: 'Which of these counts as government spending (G) in aggregate demand?',
      opts: ['Paying nurses in public hospitals', 'Paying state pensions to retirees', 'Paying unemployment benefits', 'Households buying food at markets'],
      why: 'Nurses\' pay buys a service: health care. Pensions and benefits are transfers, paid with nothing produced in return, so they are not in G. Households buying food is consumption.',
      clue: 'Which payment buys something that is produced?'},
    b: {d: 3, q: 'The Indian rupee falls in value against the US dollar. What is the likely effect on India\'s net exports?',
      opts: ['They rise, as exports get cheaper abroad', 'They fall, as exports get dearer abroad', 'They fall, as imports get cheaper', 'They stay the same, as prices are set in rupees'],
      why: 'Each dollar now buys more rupees, so Indian goods cost less for foreign buyers, and imports cost more in rupees. Exports tend to rise and imports to fall, so net exports rise.',
      clue: 'What does a buyer in the United States now pay for Indian goods?'}},

  /* ---------- aggregate supply ---------- */

  'e-sras': {title: 'Short-run aggregate supply',
    card: [
      'Aggregate supply (AS) is the total output firms in an economy plan to produce at each price level. In the short run, costs such as wages are taken as fixed.',
      'The short-run aggregate supply (SRAS) curve slopes up. With costs fixed, a higher price level means more profit on each unit, so firms produce more.',
      'A change in the price level moves along the SRAS curve. A change in firms\' costs shifts the whole curve.',
      'SRAS shifts left when costs rise: higher wages, dearer raw materials or energy, a weaker currency that raises import prices, or higher indirect taxes. It shifts right when costs fall.'
    ],
    remember: 'Higher costs shift SRAS left. Lower costs shift it right.',
    a: {q: 'Wages rise across Poland with no rise in productivity. What happens to the SRAS curve?',
      opts: ['It shifts left', 'It shifts right', 'It moves up along the curve', 'It does not change'],
      why: 'Higher wages raise the cost of making each unit, so firms supply less at each price level. The whole curve shifts left.',
      clue: 'Wages are a cost for firms.'},
    b: {d: 3, q: 'The world price of oil falls sharply. What is the likely effect on short-run aggregate supply in a country that imports its oil, such as Japan?',
      opts: ['SRAS shifts right as costs fall', 'SRAS shifts left as costs fall', 'There is a movement up along SRAS', 'AD shifts left and SRAS stays put'],
      why: 'Oil is used in transport, energy and many products, so cheaper oil lowers costs for firms. They can supply more at each price level, so SRAS shifts right.',
      clue: 'Is oil a cost for firms?'}},

  'e-lras': {title: 'Long-run aggregate supply',
    card: [
      'Long-run aggregate supply (LRAS) shows the economy\'s productive capacity: the most it can make with all its resources fully used. It matches a point on the PPF.',
      ['Classical view', 'in the long run, wages and prices adjust, so the economy returns to full capacity. LRAS is vertical: more demand raises only the price level, not output.'],
      ['Keynesian view', 'LRAS is flat when there is a lot of spare capacity, so more demand raises output without raising prices. It curves up as capacity is used, then turns vertical at full capacity.'],
      'Keynes wrote during the Great Depression of the 1930s, when unemployment stayed high for years. He argued that wages do not fall easily, so an economy can stay below capacity for a long time.'
    ],
    remember: 'Classical: vertical. Keynesian: flat with spare capacity, then vertical at full capacity.',
    a: {q: 'In the classical view, what happens in the long run when AD rises?',
      opts: ['Only the price level rises', 'Only real output rises', 'Real output and prices both fall', 'Real output rises with no price change'],
      why: 'Classical economists draw LRAS as vertical at full capacity. In the long run, more spending cannot make more output, so it only pushes up prices.',
      clue: 'What shape is classical LRAS?'},
    b: {d: 3, q: 'An economy is in a deep recession, with many idle factories and high unemployment. In the Keynesian view, what does a rise in AD do?',
      opts: ['Raises output but not prices', 'Raises prices but not output', 'Lowers output and raises prices', 'Changes nothing until wages fall'],
      why: 'With lots of spare capacity, LRAS is flat in the Keynesian view. Firms can make more using idle workers and machines without raising costs, so output rises and prices barely move.',
      clue: 'Is there spare capacity?'}},

  'e-lrasshift': {title: 'What shifts long-run aggregate supply',
    card: [
      'LRAS shifts right when the economy can make more: more or better resources, or better ways of using them. This is the same as the PPF shifting out.',
      ['Technology and capital', 'new machines and methods let each worker make more. Investment in capital, such as faster broadband or new ports, raises capacity.'],
      ['Skills and labour', 'education and training make workers more productive. More workers, through migration, a later retirement age or more people joining the workforce, add to capacity too.'],
      ['Institutions and resources', 'secure property rights, the rule of law and a sound banking system encourage firms to invest. New resources, such as the oil Norway found in 1969, also shift LRAS right.']
    ],
    remember: 'More and better resources, used better, shift LRAS right.',
    a: {q: 'Which of these is most likely to shift Ghana\'s LRAS to the right?',
      opts: ['More young people finish school', 'Households spend more on imported cars', 'The central bank lowers interest rates', 'The government raises taxes on income'],
      why: 'Better educated workers are more productive, which raises what the economy can make. Lower interest rates and more spending mainly shift AD, not capacity.',
      clue: 'Which one raises what the economy could make?'},
    b: {d: 3, q: 'A long war destroys roads, power stations and factories across a country. What happens to its LRAS?',
      opts: ['It shifts left', 'It shifts right', 'There is a movement along it', 'It stays the same, as only AD falls'],
      why: 'Capital has been destroyed, so the economy can make less even with everyone working. Its productive capacity falls and LRAS shifts left, like a PPF shifting in.',
      clue: 'Can the country make as much as before?'}},

  /* ---------- national income ---------- */

  'e-income': {title: 'National income',
    card: [
      'National income is the value of all the goods and services an economy produces in a year. It can be measured in three ways, and in theory all three give the same total.',
      'The output method adds up the value each firm adds. The income method adds up the wages, rent, interest and profit earned making that output. The expenditure method adds up all the spending on it.',
      'They match because one person\'s spending is another person\'s income. The money paid for output is shared out as income to the people who made it.',
      'Income is a flow: money earned over a period, such as a year. Wealth is a stock: the value of assets owned at one time, such as houses, shares and savings.'
    ],
    remember: 'Output = income = expenditure, measured three ways.',
    a: {q: 'Why should the output, income and expenditure methods give the same national income?',
      opts: ['Spending on output is paid out as income', 'Governments make the three match by law', 'Each method counts only goods sold abroad', 'Firms report all three on the same form'],
      why: 'Money spent on goods and services goes to the firms that made them, which pay it out as wages, rent, interest and profit. Spending, income and output are the same flow measured at different points.',
      clue: 'Where does the money spent in a shop end up?'},
    b: {d: 2, q: 'A family in Singapore keeps a record of its money. Which of these is wealth rather than income?',
      opts: ['The value of the family\'s flat', 'A parent\'s salary for the year', 'Rent earned from a lodger each month', 'Interest paid on savings in a year'],
      why: 'Wealth is a stock: what is owned at one moment, such as the flat. A salary, rent and interest are flows, earned over a period of time.',
      clue: 'Is it measured over a period, or at one moment?'}},

  'e-flow': {title: 'Injections and withdrawals',
    card: [
      'The circular flow of income shows money moving between households and firms. Households spend on firms\' output, and firms pay households incomes.',
      ['Withdrawals', 'money that leaves the flow: saving (S), taxes (T) and spending on imports (M).'],
      ['Injections', 'money that enters the flow: investment (I), government spending (G) and exports (X).'],
      'If injections are greater than withdrawals, national income rises. If withdrawals are greater, it falls. National income settles where injections equal withdrawals.'
    ],
    remember: 'In: I, G and X. Out: S, T and M.',
    a: {q: 'Which of these is an injection into Colombia\'s circular flow?',
      opts: ['Coffee sold to buyers abroad', 'Saving by Colombian households', 'Taxes paid by Colombian firms', 'Imports of cars into Colombia'],
      why: 'Foreign buyers paying for Colombian coffee bring money into the flow, so exports are an injection. Saving, taxes and imports take money out.',
      clue: 'Which brings money in from outside?'},
    b: {d: 3, q: 'In Thailand, investment, government spending and exports total $150 billion, while saving, taxes and imports total $170 billion. What will happen to national income?',
      opts: ['It will fall', 'It will rise', 'It will stay the same', 'It will rise by $20 billion'],
      why: 'Withdrawals of $170 billion are larger than injections of $150 billion, so more leaves the flow than enters it. National income falls until withdrawals equal injections.',
      clue: 'Which is larger: money in or money out?'}},

  'e-macroeq': {title: 'Equilibrium real output',
    card: [
      'Equilibrium real output is where aggregate demand meets aggregate supply. It sets the level of real GDP and the price level.',
      'If AD shifts right, as when consumers or firms spend more, real output and the price level both rise. If AD shifts left, both fall.',
      'If SRAS shifts left, as when energy costs jump, real output falls while the price level rises. Output that stalls while prices rise is called stagflation, which many countries had in the 1970s.',
      'In the long run, output is set by LRAS. A shift of LRAS to the right raises real output and can lower the price level.'
    ],
    remember: 'AD right: more output, higher prices. SRAS left: less output, higher prices.',
    a: {q: 'Households and firms in Indonesia become more confident and spend more. What happens to the equilibrium?',
      opts: ['Real output and the price level both rise', 'Real output rises and the price level falls', 'Real output falls and the price level rises', 'Real output and the price level both fall'],
      why: 'More spending shifts AD right. Firms make more to meet it, and as they move up the SRAS curve, prices rise too.',
      clue: 'Which curve shifts, and which way?'},
    b: {d: 3, q: 'Energy prices jump across Europe, raising firms\' costs. What happens to real output and the price level in the short run?',
      opts: ['Output falls and prices rise', 'Output rises and prices rise', 'Output falls and prices fall', 'Output rises and prices fall'],
      why: 'Higher costs shift SRAS left. At each price level firms make less, so output falls while prices rise. This mix is called stagflation.',
      clue: 'Higher costs shift which curve?'}},

  'e-multiplier': {title: 'The multiplier',
    card: [
      'The multiplier is when a change in an injection, such as government spending, leads to a larger change in national income. Spending becomes someone\'s income, part of which is spent again, and again.',
      'How much is passed on depends on withdrawals. The marginal propensity to withdraw (MPW) is the share of each extra dollar of income that is saved, taxed or spent on imports.',
      'Multiplier = 1 ÷ MPW. With no taxes or trade, this is 1 ÷ (1 - MPC). If MPW is 0.25, the multiplier is 4, so an extra $10 billion of spending raises national income by $40 billion.',
      'It has limits. Its size is hard to estimate, it takes time to work through, and where taxes and imports are high, much of each round leaks out. Near full capacity, more spending raises prices more than output.'
    ],
    remember: 'Multiplier = 1 ÷ MPW. The more that leaks out, the smaller it is.',
    a: {q: 'In Kenya, the marginal propensity to withdraw is 0.5. The government spends an extra KSh 20 billion on roads. By how much does national income rise in the end?',
      opts: ['KSh 40 billion', 'KSh 10 billion', 'KSh 20 billion', 'KSh 100 billion'],
      why: 'The multiplier is 1 ÷ 0.5 = 2. The final rise is 2 × KSh 20 billion = KSh 40 billion.',
      clue: 'Work out 1 ÷ MPW first.'},
    b: {d: 3, q: 'In the UK, out of each extra pound of income, people save 10p, pay 20p in tax and spend 20p on imports. What is the multiplier?',
      opts: ['2', '10', '5', '0.5'],
      why: 'MPW = 0.1 + 0.2 + 0.2 = 0.5, so the multiplier is 1 ÷ 0.5 = 2. Using saving alone gives 1 ÷ 0.1 = 10, which leaves out tax and imports.',
      clue: 'Add up all three withdrawals.'}},

  /* ---------- economic growth ---------- */

  'e-growthcause': {title: 'Causes of growth',
    card: [
      ['Actual growth', 'a rise in real GDP: the economy makes more than before. It happens when AD rises and spare resources are put to work. On a PPF, the economy moves from inside towards the curve.'],
      ['Potential growth', 'a rise in productive capacity, what the economy could make. LRAS shifts right and the PPF shifts out.'],
      'Potential growth comes from more or better capital, a larger or more skilled workforce, and new technology. Over long periods, rising productivity, the output of each worker in an hour, matters most.',
      'Actual growth cannot stay above potential growth for long. Once spare capacity is used up, extra spending mostly raises prices.'
    ],
    remember: 'Actual growth uses spare capacity. Potential growth adds to it.',
    a: {q: 'Which of these is potential growth?',
      opts: ['New ports raise what Vietnam can produce', 'Idle factories in Vietnam start up again', 'Vietnamese households spend more in shops', 'Unemployed workers in Vietnam find jobs'],
      why: 'Potential growth is a rise in what the economy could make, which new capital such as ports provides. Putting idle factories and workers to use, or spending more, is actual growth from spare capacity.',
      clue: 'Which one raises capacity, rather than using what is there?'},
    b: {d: 3, q: 'After a recession, real GDP in Argentina grows by 6% in a year as unemployed workers go back to work. Its productive capacity has not changed. What kind of growth is this?',
      opts: ['Actual growth, using spare capacity', 'Potential growth, from more capacity', 'Both actual and potential growth', 'Neither, as capacity has not changed'],
      why: 'Output rose because idle resources went back to work, which is actual growth. Capacity is the same, so there is no potential growth. On a PPF, the economy moves from inside towards the curve.',
      clue: 'Did the economy make more, or could it make more?'}},

  'e-outputgap': {title: 'Output gaps and the trade cycle',
    card: [
      'An output gap is the difference between actual real GDP and potential real GDP, what the economy could make with its resources fully used.',
      ['Negative output gap', 'actual output is below potential. There is spare capacity: unemployment is high and inflation is usually low.'],
      ['Positive output gap', 'actual output is above potential, as resources are worked harder than they can be for long. Firms struggle to find workers, and inflation tends to rise.'],
      'The trade cycle is the rise and fall of real GDP around its trend: boom, slowdown, recession and recovery. A recession is often defined as two quarters in a row of falling real GDP.'
    ],
    remember: 'Negative gap: spare capacity. Positive gap: overheating.',
    a: {q: 'An economy has high unemployment and many idle factories. What kind of output gap does it have?',
      opts: ['A negative output gap', 'A positive output gap', 'No output gap at all', 'A gap that adds to inflation'],
      why: 'Idle workers and factories mean actual output is below what the economy could make. That is a negative output gap, which usually comes with low inflation.',
      clue: 'Is output above or below what the economy could make?'},
    b: {d: 3, q: 'New Zealand\'s real GDP falls by 0.3% in one quarter and by 0.5% in the next, and unemployment starts to rise. Which phase of the trade cycle is this?',
      opts: ['A recession', 'A boom', 'A recovery', 'A positive output gap'],
      why: 'Two quarters in a row of falling real GDP is the usual definition of a recession. In a recovery or a boom, real GDP is rising.',
      clue: 'Count the quarters of falling output.'}},

  'e-growthgain': {title: 'Benefits of growth',
    card: [
      ['Consumers', 'higher real incomes mean more and better goods and services. Growth since 1980 has lifted hundreds of millions of people in China out of extreme poverty.'],
      ['Firms', 'rising demand brings higher sales and profits, which give firms the money and the confidence to invest and hire.'],
      ['Government', 'more income and spending means more tax revenue without raising tax rates, and fewer people need benefits. The money can pay for health, schools or less borrowing.'],
      ['Living standards', 'growth can pay for better health care and education, longer lives and more leisure time, as long as its gains are shared.']
    ],
    remember: 'Growth means more income for people, sales for firms and tax for government.',
    a: {q: 'Real GDP in Rwanda grows by 7% a year. How does this help its government?',
      opts: ['More tax comes in at the same tax rates', 'It no longer needs to collect any taxes', 'Prices fall, so public services cost less', 'Fewer people want public services'],
      why: 'As incomes and spending grow, the same tax rates bring in more money. Fewer people need benefits too, so the government can spend more on services or borrow less.',
      clue: 'What happens to tax revenue as incomes rise?'},
    b: {d: 2, q: 'Sales are rising fast in Poland as the economy grows. Why might firms there invest more?',
      opts: ['They expect demand to keep growing', 'Interest rates always fall in a boom', 'Taxes on firms fall when GDP grows', 'Their costs must be falling'],
      why: 'Growing sales and profits give firms both the money and the reason to buy new capital. They invest when they expect the new machines to be used.',
      clue: 'Why would a firm buy new machines?'}},

  'e-growthcost': {title: 'Costs of growth',
    card: [
      ['Inflation', 'if AD grows faster than the economy\'s capacity, prices rise. Fast growth can lead to a positive output gap and overheating.'],
      ['The environment', 'more output can mean more pollution, carbon emissions and use of non-renewable resources. China\'s fast growth came with severe air pollution in cities such as Beijing.'],
      ['Inequality', 'the gains from growth may go mostly to people with capital or high skills, so the gap between rich and poor can widen even as average incomes rise.'],
      ['Current account deficits', 'as incomes rise, people buy more imports. If exports do not keep up, the current account deficit grows.']
    ],
    remember: 'Growth can bring inflation, pollution, inequality and a wider trade gap.',
    a: {q: 'Incomes in the UK rise fast and people buy many more imported cars and phones. Which cost of growth is this?',
      opts: ['A larger current account deficit', 'A fall in the price of imports', 'Less tax collected by the government', 'Slower growth in productive capacity'],
      why: 'Higher incomes are spent partly on imports. If exports do not rise as fast, more money flows out than in, and the current account deficit widens.',
      clue: 'Where are the cars and phones made?'},
    b: {d: 3, q: 'Average real incomes in a country rise by 20% over ten years, but most of the gain goes to the richest tenth of people. What cost of growth does this show?',
      opts: ['Wider inequality', 'Cost-push inflation', 'Harm to the environment', 'A current account deficit'],
      why: 'The average rose, but most people saw little of it. Growth that mainly benefits those at the top widens the gap between rich and poor.',
      clue: 'Who got most of the gain?'}},

  /* ---------- macroeconomic objectives and policies ---------- */

  'e-objectives': {title: 'Macroeconomic objectives',
    card: [
      'Governments usually have four main aims: steady economic growth, low unemployment, low and stable inflation, and a balance of payments that can be sustained.',
      'Many set an inflation target. The Bank of England, the European Central Bank and the US Federal Reserve aim for 2%. The Reserve Bank of Australia aims for 2 to 3%.',
      'Other aims include protecting the environment, a fairer spread of income, and keeping government borrowing under control.',
      'Growth should be sustainable: it should not come at the cost of future generations, through debt, pollution or using up resources.'
    ],
    remember: 'Growth, jobs, stable prices and a sustainable balance of payments, plus wider aims.',
    a: {q: 'Which of these is one of the main macroeconomic objectives?',
      opts: ['Low and stable inflation', 'The highest possible prices', 'A large current account deficit', 'As many imports as possible'],
      why: 'Stable prices let people and firms plan ahead. High prices, large deficits and lots of imports are not aims in themselves.',
      clue: 'Which helps people and firms plan?'},
    b: {d: 2, q: 'Costa Rica aims to grow its economy while keeping its forests. Besides growth, which objective is this?',
      opts: ['Protecting the environment', 'A fairer spread of income', 'Low and stable inflation', 'A balance of payments surplus'],
      why: 'Keeping forests protects the environment for future generations, so growth can be sustained. It is one of the wider aims beyond the main four.',
      clue: 'What are the forests part of?'}},

  'e-monetary': {title: 'Monetary policy',
    card: [
      'Monetary policy is the central bank changing interest rates and the amount of money to steer AD. Many central banks are independent of the government, such as the Bank of England since 1997.',
      'Lower interest rates make borrowing cheaper and saving less rewarding, so consumption and investment rise. The currency tends to weaken, which helps exports. AD shifts right.',
      'Higher interest rates do the reverse. They cool spending and bring inflation down, but can slow growth and raise unemployment.',
      ['Quantitative easing (QE)', 'the central bank creates money to buy government bonds and other assets, which pushes down long-term interest rates. The US, the UK, Japan and the euro area used it when rates were near zero.']
    ],
    remember: 'Lower rates and QE raise AD. Higher rates cool it.',
    a: {q: 'Inflation in Canada is well above its 2% target. What is the Bank of Canada most likely to do?',
      opts: ['Raise interest rates', 'Cut interest rates', 'Start quantitative easing', 'Cut income tax'],
      why: 'Higher rates make borrowing dearer and saving more rewarding, so spending slows and AD shifts left. That takes pressure off prices. Income tax is set by the government, not the central bank.',
      clue: 'Does the bank want more spending or less?'},
    b: {d: 3, q: 'In 2009 the Bank of England\'s interest rate was 0.5%, and the economy was still weak. Why did it use quantitative easing?',
      opts: ['Rates could not be cut much further', 'To raise the interest rate on loans', 'To pay off the government\'s debt', 'To make the pound stronger'],
      why: 'With rates close to zero, cutting them again would do little. QE created money to buy bonds, which pushed down long-term rates and put more money into the economy to lift spending.',
      clue: 'How much lower could rates go?'}},

  'e-fiscal': {title: 'Fiscal policy',
    card: [
      'Fiscal policy is the government changing its spending and taxes to steer AD. Direct taxes are on income, such as income tax. Indirect taxes are on spending, such as VAT or GST.',
      ['Expansionary', 'more spending or lower taxes raise AD, which can lift output in a recession. In 2009 Australia paid cash bonuses to millions of households to keep them spending.'],
      ['Contractionary', 'less spending or higher taxes cut AD, which can slow inflation or reduce borrowing.'],
      'A budget deficit is one year\'s gap between spending and tax revenue, which the government borrows. The national debt is the total owed from all past borrowing, so each deficit adds to it.'
    ],
    remember: 'More spending or lower taxes raise AD. Less spending or higher taxes cut it.',
    a: {q: 'In a recession, South Korea\'s government spends more on roads and cuts income tax. What kind of policy is this?',
      opts: ['Expansionary fiscal policy', 'Contractionary fiscal policy', 'Expansionary monetary policy', 'Quantitative easing'],
      why: 'Changes to government spending and taxes are fiscal policy. Spending more and taxing less raises AD, so it is expansionary.',
      clue: 'Who is acting: the government or the central bank?'},
    b: {d: 3, q: 'Chile\'s government spends $80 billion in a year and collects $72 billion in taxes. What is its budget position?',
      opts: ['A deficit of $8 billion', 'A surplus of $8 billion', 'A deficit of $72 billion', 'A balanced budget'],
      why: 'Spending is $80 billion - $72 billion = $8 billion more than tax revenue, so the budget is in deficit by $8 billion, which the government borrows.',
      clue: 'Compare what it spends with what it collects.'}},

  'e-supplyside': {title: 'Supply-side policies',
    card: [
      'Supply-side policies aim to raise productive capacity, shifting LRAS right. This can bring growth without inflation, but most take years to work.',
      ['Market-based', 'let markets work more freely: lower income and company taxes to reward work and investment, privatisation (selling state firms) and removing rules. The UK sold BT and British Gas in the 1980s.'],
      ['Interventionist', 'the government acts directly: spending on education, training and infrastructure, or funding research. Singapore gives adults credits to spend on training courses.'],
      'Market-based policies can widen inequality. Interventionist ones cost public money and depend on the government choosing well.'
    ],
    remember: 'Supply-side policies shift LRAS right, through markets or through the state.',
    a: {q: 'Which of these is an interventionist supply-side policy?',
      opts: ['Paying for adults to retrain in new skills', 'Selling a state airline to private owners', 'Cutting the top rate of income tax', 'Removing rules on shop opening hours'],
      why: 'Paying for training is the government acting directly to raise workers\' skills. Privatisation, tax cuts and removing rules work by letting markets run more freely, so they are market-based.',
      clue: 'Which one has the government doing the work?'},
    b: {d: 3, q: 'India builds new highways and railways to cut the time and cost of moving goods. How does this mainly affect the economy in the long run?',
      opts: ['LRAS shifts right', 'SRAS shifts left', 'AD shifts left', 'Only prices rise'],
      why: 'Better transport lets firms make and move more for the same cost, so the economy can produce more. The building adds to AD while it lasts, but the lasting effect is on capacity.',
      clue: 'Does it change what the economy can make?'}},

  'e-conflicts': {title: 'Conflicts between objectives and policies',
    card: [
      ['Growth and inflation', 'fast growth can push AD beyond capacity, so prices rise. Policies that cut unemployment can raise inflation. The Phillips curve shows this short-run trade-off.'],
      ['Growth, trade and the environment', 'rising incomes draw in imports, which can widen a current account deficit. More output can also mean more pollution and emissions.'],
      ['Between policies', 'raising interest rates to cut inflation slows growth, and tends to strengthen the currency, which hurts exporters. Cutting taxes to lift growth widens the budget deficit.'],
      'Governments rank their aims and mix their policies. Supply-side policies can ease some conflicts, as more capacity allows growth without inflation, but they work slowly.'
    ],
    remember: 'Hitting one target often means missing another.',
    a: {q: 'Brazil\'s central bank raises interest rates to bring inflation down. Which objective is likely to suffer?',
      opts: ['Low unemployment', 'Low inflation', 'A fairer spread of income', 'Protecting the environment'],
      why: 'Higher rates cool spending, which brings inflation down but means firms sell less and hire fewer workers. Unemployment tends to rise, the trade-off the Phillips curve shows.',
      clue: 'What happens to jobs when spending slows?'},
    b: {d: 3, q: 'The Reserve Bank of New Zealand raises interest rates, and the New Zealand dollar rises against other currencies. Who is most likely to be hurt?',
      opts: ['Firms that export dairy products', 'Households buying imported goods', 'New Zealanders on holiday abroad', 'Savers with money in the bank'],
      why: 'A stronger dollar makes New Zealand\'s exports dearer for foreign buyers, so dairy firms sell less abroad. Imports and holidays abroad get cheaper, and savers earn more interest.',
      clue: 'What does a stronger currency do to export prices?'}}
};
