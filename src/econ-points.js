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
      clue: 'Did the government plan for this reaction?'}}
};
