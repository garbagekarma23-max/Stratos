/* Study content: NSW Year 12 Economics (2009 syllabus), Topic 1, The Global Economy.
   The four chapters follow the four headings of the topic in the syllabus.
   Written from the syllabus headings without the NESA file open, so every point needs checking against it before students rely on it.
   Not included yet: the case study of an economy other than Australia, and questions that use diagrams or tables of data.

   How a point is stored:
     card      the lines a student reads. A line written as [label, text] shows the label in bold.
     remember  one line to hold on to.
     a         the check question, asked straight after the card.
     b         the practice question, asked later. d is its difficulty, 2 or 3.
   In every question the correct answer is opts[0]. The order is shuffled on screen. */
const TOPIC = {
  id: 'ge', course: 'Economics', year: 'Year 12', name: 'The Global Economy',
  chapters: [

    {id: 'c1', title: 'International economic integration', points: [
      {id: 'c1p1', title: 'The global economy',
        card: [
          'The global economy is every national economy in the world, linked together.',
          'The links are trade, investment, finance, technology and the movement of workers.',
          'Because of these links, a change in one economy can spread to many others.'
        ],
        remember: 'No economy works alone.',
        a: {q: 'What is the global economy?',
          opts: ['All the world\'s economies and the links between them', 'The group made up of the world\'s largest economies', 'The organisations that set the rules of world trade', 'The total value of goods traded between countries'],
          why: 'The global economy is the network of every national economy and the flows between them.',
          clue: 'It includes every country, large or small.'},
        b: {d: 2, q: 'A large economy goes into recession and buys fewer imports. What is the most likely effect on its trading partners?',
          opts: ['Their exports fall and their growth slows', 'Their exports rise as world prices fall', 'Their growth speeds up to fill the gap', 'Their exports stay the same but earn more'],
          why: 'Economies are linked through trade. When a large economy buys less, the countries that sell to it earn less.',
          clue: 'One country\'s imports are another country\'s exports.'}},

      {id: 'c1p2', title: 'Gross World Product',
        card: [
          'Gross World Product (GWP) is the total value of goods and services produced in the world in one year.',
          'It is the sum of the output of every economy.',
          'Growth in real GWP shows how fast world output is rising.'
        ],
        remember: 'GDP is one country\'s output. GWP is the world\'s.',
        a: {q: 'What does Gross World Product measure?',
          opts: ['The value of everything produced in the world in a year', 'The value of everything traded between countries in a year', 'The total wealth owned by the world\'s governments', 'The combined output of the world\'s ten largest economies'],
          why: 'GWP adds up the output of every economy. It counts everything produced, including what is never traded.',
          clue: 'Think of GDP, but for the whole world.'},
        b: {d: 2, q: 'If world trade grows faster than Gross World Product, what does that show?',
          opts: ['More of world output is crossing borders', 'World output is shrinking from year to year', 'Countries are producing less for export', 'Trade barriers are rising in most countries'],
          why: 'When trade grows faster than output, more of what the world makes crosses a border. That is a sign of integration.',
          clue: 'If trade grows faster than output, what happens to trade as a share of output?'}},

      {id: 'c1p3', title: 'Globalisation',
        card: [
          'Globalisation is the growing integration of national economies into one global economy.',
          'It shows up as more trade, investment, finance, technology and workers crossing borders.',
          'It is driven by lower trade barriers, cheaper transport and faster communication.'
        ],
        remember: 'Globalisation means integration: economies becoming more linked.',
        a: {q: 'What is globalisation?',
          opts: ['The increasing integration of economies around the world', 'The spread of one country\'s currency to other countries', 'The rise of tariffs between major trading partners', 'The transfer of private firms to government ownership'],
          why: 'Globalisation is the process of economies becoming more connected, so that borders matter less for trade, investment and finance.',
          clue: 'Think about what is happening to the links between economies.'},
        b: {d: 2, q: 'Which change would speed up globalisation?',
          opts: ['Countries removing tariffs on each other\'s goods', 'Countries placing tighter limits on foreign investment', 'A sharp rise in the cost of shipping goods', 'Tighter limits on moving money overseas'],
          why: 'Lower barriers make it cheaper to trade across borders, so economies become more linked. The other three changes make cross-border activity harder.',
          clue: 'Look for the change that makes crossing a border easier.'}},

      {id: 'c1p4', title: 'Trade and financial flows',
        card: [
          'Trade in goods and services is the most visible link between economies.',
          'Financial flows are movements of money between countries: loans, shares, bonds and currencies.',
          'Much of this money is short-term and speculative, so it can leave a country quickly.'
        ],
        remember: 'Goods take weeks to cross a border. Money takes seconds.',
        a: {q: 'What are international financial flows?',
          opts: ['Money moving between countries to lend or invest', 'Goods and services sold from one country to another', 'Taxes that firms pay to a foreign government', 'Workers moving overseas to take up new jobs'],
          why: 'Financial flows are money crossing borders to lend, invest or trade currencies. Goods and workers are separate flows.',
          clue: 'Finance is about money, not goods.'},
        b: {d: 2, q: 'Why can short-term financial flows make an economy less stable?',
          opts: ['They can leave quickly and push the currency down', 'They are mostly spent on imported consumer goods', 'They raise the cost of borrowing for local firms', 'Their size is capped by the IMF from year to year'],
          why: 'Speculative money chases short-term returns. When confidence falls it can leave within days, which pushes down the exchange rate and asset prices.',
          clue: 'Think about what happens when investors lose confidence.'}},

      {id: 'c1p5', title: 'Investment and transnational corporations',
        card: [
          'Foreign direct investment (FDI) is when a firm sets up a business in another country, or buys 10 per cent or more of one. It is long-term and gives the investor a say in running the business.',
          'A transnational corporation (TNC) is a firm that produces in more than one country.',
          'TNCs bring money, jobs and technology. They can also move production and profits to where costs and taxes are lowest.'
        ],
        remember: 'FDI buys control of a business. Portfolio investment buys shares or bonds without control.',
        a: {q: 'What is a transnational corporation?',
          opts: ['A firm that produces in more than one country', 'A firm that exports to more than one country', 'A firm that is owned by a national government', 'A firm listed on more than one stock exchange'],
          why: 'A TNC owns or controls production in at least two countries. Exporting from one home base is not enough.',
          clue: 'Trans means across. Across what?'},
        b: {d: 2, q: 'A Japanese car maker builds its own factory in Thailand. What kind of flow is this?',
          opts: ['Foreign direct investment', 'Portfolio investment', 'Official development assistance', 'A trade in services'],
          why: 'Building or buying a business overseas is foreign direct investment, because the firm owns and controls it. Portfolio investment is buying shares or bonds without control.',
          clue: 'The firm owns and runs the factory.'}},

      {id: 'c1p6', title: 'Technology, labour and migration',
        card: [
          'Cheaper transport and faster communication let firms trade and run production across the world.',
          'The international division of labour means each stage of production is done in the country that does it best or cheapest.',
          'Labour moves between countries far less freely than goods, money or technology. Skilled workers move more easily than unskilled workers.'
        ],
        remember: 'Money and goods cross borders more easily than people do.',
        a: {q: 'What is the international division of labour?',
          opts: ['Splitting production into tasks done in different countries', 'A rule that limits how many workers can migrate each year', 'A system that sorts each country\'s workers by skill level', 'An agreement to pay the same wage for a job in every country'],
          why: 'Firms place each task where it is done best or at the lowest cost. A phone can be designed in one country and assembled in another.',
          clue: 'Think about where a phone is designed and where it is put together.'},
        b: {d: 2, q: 'Which of these moves least freely between countries?',
          opts: ['Labour', 'Financial capital', 'Technology', 'Traded goods'],
          why: 'People face visa rules, language barriers, family ties and the cost of moving. Money and information can cross a border in seconds.',
          clue: 'Think about which one faces the most rules and personal costs when it moves.'}},

      {id: 'c1p7', title: 'The international business cycle',
        card: [
          'The international business cycle is the rise and fall of world economic activity over time.',
          'Economies tend to move together, because they are linked by trade, investment, finance and confidence.',
          'Regional cycles work the same way. Asia\'s cycle has a strong influence on Australia, because most of its exports go there.'
        ],
        remember: 'Linked economies tend to boom and slow together.',
        a: {q: 'What is the international business cycle?',
          opts: ['Changes in the level of world economic activity over time', 'The regular rounds of world trade talks between countries', 'The time it takes a new product to reach export markets', 'Changes in one country\'s output from one year to the next'],
          why: 'World output does not grow at a steady rate. It moves through upswings and downturns, and that pattern is the international business cycle.',
          clue: 'A cycle goes up and comes back down. This one is about the whole world.'},
        b: {d: 3, q: 'The world economy is in a downturn, yet one economy keeps growing. What best explains this?',
          opts: ['Its own interest rates and government policy', 'A world downturn lifts demand for its exports', 'Its trading partners are buying fewer of its goods', 'Higher world interest rates lift its investment'],
          why: 'The international cycle is a strong influence, but domestic factors matter too. Interest rates, government spending and local confidence can offset a world downturn.',
          clue: 'World conditions are not the only thing that drives an economy.'}}
    ]},

    {id: 'c2', title: 'Trade, financial flows and foreign investment', points: [
      {id: 'c2p1', title: 'The basis of free trade',
        card: [
          'Free trade means governments place no barriers on imports or exports.',
          'A country has a comparative advantage in a good when it gives up less to make it than other countries do.',
          'If each country specialises in its comparative advantage and trades, total output rises.'
        ],
        remember: 'Comparative advantage means the lowest opportunity cost.',
        a: {q: 'A country has a comparative advantage in a good when it:',
          opts: ['Has a lower opportunity cost of producing it', 'Can produce more of it than any other country can', 'Pays lower wages than its trading partners', 'Places the highest tariff on imports of it'],
          why: 'Comparative advantage is about what a country gives up. The country that gives up the least to make a good should specialise in it.',
          clue: 'Compare what each country gives up to make the good.'},
        b: {d: 3, q: 'Country A can make more wheat and more cars than Country B from the same resources. Can both still gain from trade?',
          opts: ['Yes, if their opportunity costs are different', 'No, because Country A gains nothing by trading', 'No, because all of the gains go to Country B', 'Yes, as long as Country A exports both goods'],
          why: 'Being better at everything is an absolute advantage. Gains from trade depend on comparative advantage. Each country gives up less by specialising in one good, so total output rises.',
          clue: 'Absolute advantage and comparative advantage are different things.'}},

      {id: 'c2p2', title: 'For and against free trade',
        card: [
          ['For', 'lower prices, more choice and bigger markets for exporters.'],
          ['For', 'competition pushes local firms to become more efficient.'],
          ['Against', 'jobs are lost in industries that cannot compete, new industries struggle to start, and dumping can hurt local firms.']
        ],
        remember: 'Free trade raises total income, but the gains and losses are not shared evenly.',
        a: {q: 'Which is an advantage of free trade?',
          opts: ['Consumers get lower prices and more choice', 'Local industries face less competition from imports', 'The government collects more tariff revenue', 'Fewer workers have to change jobs'],
          why: 'Imports compete with local goods, which lowers prices and widens choice. Free trade removes tariffs, so tariff revenue falls.',
          clue: 'Think about what imports do to prices.'},
        b: {d: 2, q: 'Australia removes its tariffs on imported clothing. What is likely in the short term?',
          opts: ['Some local clothing workers lose their jobs', 'Shoppers pay higher prices for imported clothing', 'Local clothing makers raise their output', 'Local clothing firms face less competition'],
          why: 'Cheaper imports win sales from local makers, so some local jobs go. This is structural unemployment. Over time, workers and capital can move to industries where Australia is more competitive.',
          clue: 'Who was the tariff protecting?'}},

      {id: 'c2p3', title: 'The WTO, IMF and World Bank',
        card: [
          ['World Trade Organization (WTO)', 'oversees the trade rules its members agree on, and runs a process for settling disputes between them.'],
          ['International Monetary Fund (IMF)', 'works to keep the global financial system stable and lends to countries in crisis.'],
          ['World Bank', 'lends to poorer countries for long-term development, such as roads, schools and health.']
        ],
        remember: 'WTO is trade. IMF is financial stability. World Bank is development.',
        a: {q: 'Which organisation oversees the rules of world trade and hears disputes between its members?',
          opts: ['The World Trade Organization', 'The International Monetary Fund', 'The World Bank', 'The United Nations'],
          why: 'The WTO administers the trade agreements its members have signed, and members can bring disputes to it.',
          clue: 'Its disputes are about tariffs, quotas and subsidies.'},
        b: {d: 2, q: 'A country cannot pay for its imports and its currency is collapsing. Which organisation has the main job of lending to a country in this kind of crisis?',
          opts: ['The International Monetary Fund', 'The World Trade Organization', 'The World Bank', 'The OECD'],
          why: 'The IMF supports countries in balance of payments and currency crises, usually with conditions attached. The World Bank funds long-term development projects.',
          clue: 'This one deals with financial stability, not long-term projects.'}},

      {id: 'c2p4', title: 'The UN and OECD',
        card: [
          ['United Nations (UN)', 'nearly every country is a member. It works on peace, security, development and the environment.'],
          'The UN sets shared development goals, such as ending extreme poverty.',
          ['Organisation for Economic Co-operation and Development (OECD)', 'a group of mostly advanced economies. It researches economic policy and recommends changes to its members.']
        ],
        remember: 'The UN is nearly every country. The OECD is mainly the advanced economies.',
        a: {q: 'What does the OECD mainly do?',
          opts: ['Researches economic policy and advises its members', 'Lends money to members that are in financial crisis', 'Sets the tariffs that its members charge each other', 'Supervises the world\'s largest currency markets'],
          why: 'The OECD compares its members\' economies and recommends policy. It has no power to lend or to set tariffs.',
          clue: 'It is known for reports that compare countries.'},
        b: {d: 2, q: 'Nearly every country has signed up to a shared set of development goals, such as ending extreme poverty. Which organisation set them?',
          opts: ['The United Nations', 'The OECD', 'The G20', 'The World Trade Organization'],
          why: 'The members of the UN agreed on the Sustainable Development Goals in 2015. The UN has almost universal membership, which is why its goals are shared so widely.',
          clue: 'Which organisation has nearly every country as a member?'}},

      {id: 'c2p5', title: 'Government economic forums',
        card: [
          'The G20 brings together most of the world\'s largest advanced and emerging economies. Australia is a member.',
          'The G7 is a smaller group of seven large advanced economies.',
          'Both are forums. Leaders meet to coordinate policy, but their agreements are not binding.'
        ],
        remember: 'Forums coordinate. They cannot force a country to act.',
        a: {q: 'Which forum includes both advanced and emerging economies, with Australia as a member?',
          opts: ['The G20', 'The G7', 'The European Union', 'ASEAN'],
          why: 'The G20 includes Australia, China, India and Brazil alongside the large advanced economies. The G7 has advanced economies only. The syllabus writes G7/8 because Russia was a member from 1998 until it was suspended in 2014.',
          clue: 'Australia is not one of the seven. Look for the wider group that also includes China and India.'},
        b: {d: 2, q: 'The G20 agrees that members should raise government spending in a global downturn. What makes a member follow through?',
          opts: ['Peer pressure, since the agreement is not binding', 'The G20 can fine any member that does not comply', 'The WTO enforces the decisions that the G20 makes', 'The agreement becomes law in each member country'],
          why: 'The G20 is a forum, not a rule-making body. Its influence comes from coordination and peer pressure. Members coordinated their stimulus this way in 2008 and 2009.',
          clue: 'A forum is a meeting, not a court.'}},

      {id: 'c2p6', title: 'Trade agreements',
        card: [
          'A bilateral agreement is between two countries, such as the Closer Economic Relations agreement between Australia and New Zealand.',
          'A multilateral agreement covers three or more. NAFTA joined the United States, Canada and Mexico, and a new agreement between the same three replaced it in 2020.',
          'APEC is a forum of Asia-Pacific economies, including Australia. Its trade goals are not binding.',
          'Bilateral agreements are quicker to reach. Multilateral agreements open more markets at once, but take longer to negotiate.'
        ],
        remember: 'Two countries is bilateral. Three or more is multilateral.',
        a: {q: 'What is a bilateral trade agreement?',
          opts: ['A trade agreement between two countries', 'A trade agreement between all WTO members', 'A tariff that applies to two types of import', 'An agreement to share a single currency'],
          why: 'Bi means two. An agreement between three or more countries is multilateral.',
          clue: 'A bicycle has two wheels.'},
        b: {d: 2, q: 'Why do many countries sign bilateral agreements instead of waiting for a multilateral one?',
          opts: ['Two countries can reach a deal more quickly', 'A bilateral deal opens more markets at once', 'The WTO does not allow multilateral deals', 'A bilateral deal benefits countries outside it too'],
          why: 'With only two sides there are fewer interests to balance, so talks finish sooner. A multilateral agreement opens more markets but can take many years to negotiate.',
          clue: 'Count how many governments have to agree.'}},

      {id: 'c2p7', title: 'Trading blocs and monetary unions',
        card: [
          'A trading bloc is a group of countries that lowers or removes barriers between members while keeping them against non-members. The European Union and ASEAN are examples.',
          'A monetary union goes further: members share one currency, as the eurozone does, and give up their own interest rate and exchange rate.',
          'Blocs create trade between members. They can also divert trade away from cheaper producers outside the bloc.'
        ],
        remember: 'Trade creation is a gain. Trade diversion is a cost.',
        a: {q: 'What do the members of a monetary union share?',
          opts: ['A single currency', 'A single government', 'A single income tax rate', 'A single stock exchange'],
          why: 'Members of a monetary union use one currency and one central bank, so they give up their own interest rate and exchange rate.',
          clue: 'Monetary is about money.'},
        b: {d: 3, q: 'After joining a trading bloc, a country buys cars from a member, although a non-member makes them more cheaply. What is this called?',
          opts: ['Trade diversion', 'Trade creation', 'Dumping', 'Comparative advantage'],
          why: 'The bloc\'s tariff preference moved the purchase to a higher-cost member. Trade was diverted away from the most efficient producer.',
          clue: 'The trade moved to a less efficient producer.'}}
    ]},

    {id: 'c3', title: 'Protection', points: [
      {id: 'c3p1', title: 'Why countries protect',
        card: [
          'Protection is any government action that gives local producers an advantage over foreign ones.',
          ['Infant industry', 'a new industry needs time to grow before it can compete.'],
          ['Dumping', 'foreign firms sell here below the price they charge at home, or below cost. This can drive local firms out.'],
          ['Jobs and defence', 'saving local employment, and keeping industries a country would need in a war.']
        ],
        remember: 'Four reasons: infant industries, dumping, jobs, defence.',
        a: {q: 'What is the infant industry argument?',
          opts: ['New industries need protection until they can compete', 'New industries should compete with imports from the start', 'Declining industries deserve the most protection', 'Small local firms should be merged into larger ones'],
          why: 'A new industry starts small and at high cost. The argument is that temporary protection gives it time to grow and bring its costs down.',
          clue: 'An infant needs help at first, then grows up.'},
        b: {d: 2, q: 'A foreign firm sells steel in Australia below its cost of production to win the market. What is this called?',
          opts: ['Dumping', 'An embargo', 'Comparative advantage', 'A local content rule'],
          why: 'Dumping is selling in another country below the cost of production or below the home price. WTO rules let countries respond with anti-dumping duties.',
          clue: 'Think of unloading a product at a loss.'}},

      {id: 'c3p2', title: 'Tariffs',
        card: [
          'A tariff is a tax on an imported good.',
          'It raises the price of the import, so local producers can sell more and charge more.',
          'Consumers pay higher prices. The government collects the tax.'
        ],
        remember: 'A tariff works on price, and it raises money for the government.',
        a: {q: 'What is a tariff?',
          opts: ['A tax on imported goods', 'A limit on the quantity of imports', 'A payment to local producers', 'A ban on trade with one country'],
          why: 'A tariff is charged on goods as they enter the country, which makes them dearer than they would otherwise be.',
          clue: 'It makes imports dearer at the border.'},
        b: {d: 2, q: 'A tariff is placed on imported shoes. Who gains?',
          opts: ['Local shoe makers and the government', 'Shoppers who buy shoes of any kind', 'Foreign shoe makers and their workers', 'Local shops that sell imported shoes'],
          why: 'Local makers sell more at a higher price, and the government collects the tax. Shoppers pay more.',
          clue: 'Who sells more, and who collects the tax?'}},

      {id: 'c3p3', title: 'Subsidies',
        card: [
          'A subsidy is a payment from the government to local producers.',
          'It lowers their costs, so they can sell at a lower price and compete with imports.',
          'Shoppers do not pay higher prices, but taxpayers pay for the subsidy.'
        ],
        remember: 'Shoppers pay for a tariff. Taxpayers pay for a subsidy.',
        a: {q: 'What is a subsidy?',
          opts: ['A government payment to local producers', 'A tax charged on imported goods', 'A limit on the quantity of goods that can be imported', 'A tax charged on exported goods'],
          why: 'The government pays producers, which lowers their costs and lets them match the price of imports.',
          clue: 'Money flows from the government to the firm.'},
        b: {d: 2, q: 'What is one advantage of a subsidy over a tariff?',
          opts: ['It does not raise prices for consumers', 'It raises more money for the government', 'Its cost is paid by foreign producers', 'It limits the quantity of imports'],
          why: 'A subsidy lowers producers\' costs instead of raising the import price, so shoppers do not pay more. Its cost also appears in the budget, where it can be questioned each year.',
          clue: 'Compare what happens to the price in the shop.'}},

      {id: 'c3p4', title: 'Quotas',
        card: [
          'A quota is a limit on the quantity of a good that can be imported.',
          'With fewer imports allowed in, the price rises and local producers sell more.',
          'A tariff quota lets a set amount in at a low tariff, then charges a higher tariff on anything above it.'
        ],
        remember: 'A tariff works on price. A quota works on quantity.',
        a: {q: 'What is an import quota?',
          opts: ['A limit on the quantity of a good that can be imported', 'A tax charged on each unit of a good that is imported', 'A payment that helps local firms to sell overseas', 'A rule about what share of a product is made locally'],
          why: 'A quota caps the volume of imports. Under a plain quota, once the limit is reached no more can come in.',
          clue: 'Quota means a fixed amount.'},
        b: {d: 2, q: 'A quota halves the number of cars that can be imported. What happens in the local car market?',
          opts: ['Prices rise and local makers sell more', 'Prices fall and local makers sell less', 'Prices rise and local makers sell less', 'Prices fall and local makers sell more'],
          why: 'Fewer imports means less supply, so the price rises. Buyers who cannot get an import turn to local cars.',
          clue: 'Supply has been cut. Work out the price first, then who picks up the sales.'}},

      {id: 'c3p5', title: 'Other methods and the cost of protection',
        card: [
          ['Local content rules', 'a product must contain a set share of locally made parts.'],
          ['Export incentives', 'grants, cheap loans or tax breaks that help local firms sell overseas.'],
          ['The cost of protection', 'higher prices, less efficient industries, and the risk that other countries retaliate.']
        ],
        remember: 'Protection helps the protected industry. Consumers and other industries pay for it.',
        a: {q: 'What is a local content rule?',
          opts: ['A product must include a set share of locally made parts', 'Imports must carry a label naming their country of origin', 'Local firms must export a set share of what they make', 'Foreign firms must sell through a local distributor'],
          why: 'The rule forces producers to buy local parts, which protects local suppliers from imported parts.',
          clue: 'Content means what the product is made from.'},
        b: {d: 3, q: 'Australia puts a tariff on imported steel. What is the likely effect on Australian firms that build with steel?',
          opts: ['Their costs rise, so they become less competitive', 'Their costs fall, so they can export more', 'They gain, because the tariff protects them too', 'They are paid the revenue from the tariff'],
          why: 'Protection for one industry raises costs for the industries that buy from it. This is one way protection lowers efficiency across the economy.',
          clue: 'For these firms, steel is an input.'}}
    ]},

    {id: 'c4', title: 'Globalisation and economic development', points: [
      {id: 'c4p1', title: 'Growth and development',
        card: [
          'Economic growth is a rise in a country\'s real output, measured by real GDP.',
          'Economic development is wider. It is an improvement in living standards: income, health, education and freedom to choose.',
          'A country can grow without developing, if the gains reach only a few people.'
        ],
        remember: 'Growth counts output. Development looks at people\'s lives.',
        a: {q: 'What does economic development measure that economic growth does not?',
          opts: ['Improvements in people\'s living standards', 'Increases in the output of the service sector', 'Growth in output over a longer period of time', 'Increases in the value of a country\'s exports'],
          why: 'Growth measures the quantity of output. Development asks whether people live longer, learn more and have more choices.',
          clue: 'One counts output. The other looks at people\'s lives.'},
        b: {d: 2, q: 'A country\'s real GDP rises 8% a year, but most people\'s incomes, life expectancy and school attendance do not change. What does this show?',
          opts: ['Economic growth without economic development', 'Economic development without economic growth', 'Both economic growth and development', 'Neither economic growth nor development'],
          why: 'Output is rising, so there is growth. Incomes, health and education are not improving for most people, so living standards have not caught up.',
          clue: 'Output rose. Did lives improve?'}},

      {id: 'c4p2', title: 'Distribution of income and wealth',
        card: [
          'World income is shared unevenly. High-income economies have a small share of the world\'s people and a large share of its income.',
          'Wealth is shared even less evenly than income.',
          'The Gini coefficient measures inequality inside a country, from 0 (everyone equal) to 1 (one person has everything).',
          'Wide gaps have costs: poorer health and education for many people, and a risk of social and political unrest.'
        ],
        remember: 'Measure inequality between countries and inside them.',
        a: {q: 'How is world income shared between countries?',
          opts: ['Unevenly, with high-income economies holding a large share', 'Evenly, in line with each country\'s share of population', 'Unevenly, with most of it going to low-income economies', 'Evenly, because trade spreads income between countries'],
          why: 'High-income economies hold a much larger share of world income than their share of the world\'s people.',
          clue: 'Compare a rich country\'s share of people with its share of income.'},
        b: {d: 2, q: 'A country\'s Gini coefficient rises from 0.30 to 0.45. What has happened?',
          opts: ['Income has become less equally shared', 'Income has become more equally shared', 'Average income has fallen', 'Economic growth has stopped'],
          why: 'The Gini coefficient runs from 0, where everyone has the same income, to 1, where one person has all of it. A higher number means more inequality.',
          clue: 'Zero means perfect equality.'}},

      {id: 'c4p3', title: 'Measuring development',
        card: [
          'Income is measured by Gross National Income (GNI) per person.',
          'Purchasing power parity (PPP) adjusts for what money buys in each country, so incomes can be compared fairly.',
          'The Human Development Index (HDI) combines income, life expectancy and education into a score from 0 to 1.'
        ],
        remember: 'HDI is health, education and income.',
        a: {q: 'Which three things does the Human Development Index combine?',
          opts: ['Income, life expectancy and education', 'Income, inequality and life expectancy', 'Income, employment and education', 'Growth, inflation and unemployment'],
          why: 'The HDI measures a long and healthy life, access to knowledge and a decent standard of living.',
          clue: 'It measures people\'s lives: money, health and schooling.'},
        b: {d: 2, q: 'Two countries have the same GNI per person. One has a much higher HDI. What is the most likely reason?',
          opts: ['Its people live longer and stay in school longer', 'It has a much larger population and workforce', 'It exports more goods and services than it imports', 'Its currency buys more on world markets'],
          why: 'The HDI adds life expectancy and education to income. With income equal, the difference must come from health and schooling.',
          clue: 'Income is the same, so look at the other two parts.'}},

      {id: 'c4p4', title: 'Groups of economies',
        card: [
          ['Advanced economies', 'high incomes, large service sectors and high living standards. Australia, Japan and Germany are examples.'],
          ['Emerging economies', 'industrialising and growing fast, with rising incomes. China, India and Indonesia are examples.'],
          ['Developing economies', 'low incomes, a heavy reliance on farming or raw materials, and weaker health and education.']
        ],
        remember: 'Three groups, sorted by income, industry and living standards.',
        a: {q: 'Which is a feature of an advanced economy?',
          opts: ['High income per person and a large service sector', 'A workforce that is mostly employed in farming', 'Low life expectancy and few years of schooling', 'A very high rate of population growth each year'],
          why: 'Advanced economies have high incomes, and most of their output and jobs are in services.',
          clue: 'Think of Australia, Japan or Germany.'},
        b: {d: 2, q: 'An economy is industrialising quickly, its incomes are rising fast and it is drawing in foreign investment. Which group does it fit best?',
          opts: ['Emerging economies', 'Advanced economies', 'Developing economies', 'Planned economies'],
          why: 'Emerging economies are in the middle of rapid growth and industrialisation. They have moved past the low incomes of developing economies but have not reached advanced living standards.',
          clue: 'It is on the way up, but not yet rich.'}},

      {id: 'c4p5', title: 'Why nations differ',
        card: [
          ['Global factors', 'the rules of world trade, global finance, foreign investment, aid and access to technology.'],
          ['Domestic resources', 'natural resources, the skills of workers, and how much is invested in capital and technology.'],
          ['Domestic institutions', 'stable government, the rule of law and sound economic policy.']
        ],
        remember: 'Some causes are global. Many are found at home.',
        a: {q: 'Which is a domestic reason for differences in development between nations?',
          opts: ['The education and skills of a country\'s workers', 'The rules of the world trading system it sells into', 'The level of interest rates around the world', 'The conditions the IMF attaches to its loans'],
          why: 'Domestic factors are inside a country: its resources, its workers, its investment and its institutions. The other three are set outside the country.',
          clue: 'Domestic means inside the country.'},
        b: {d: 2, q: 'Rich countries protect their farmers with subsidies and tariffs. How does this affect developing economies?',
          opts: ['It limits their farm exports and holds back incomes', 'It raises the prices they receive for farm exports', 'It makes their farm exports more competitive', 'It gives them access to cheaper loans'],
          why: 'Many developing economies have a comparative advantage in agriculture. Protection in rich countries shuts them out of markets and pushes world prices down.',
          clue: 'Farm goods are what many developing economies sell.'}},

      {id: 'c4p6', title: 'The effects of globalisation',
        card: [
          ['Growth', 'globalisation has raised world output and helped lift hundreds of millions of people out of poverty, most of them in Asia.'],
          ['Inequality', 'the gains are uneven. The gap between rich and poor has widened inside many countries.'],
          ['Risk', 'downturns and financial crises spread faster from one economy to the next.']
        ],
        remember: 'Globalisation raises growth, and it spreads both gains and shocks.',
        a: {q: 'Which is an effect of globalisation?',
          opts: ['A crisis in one economy spreads faster to others', 'Economies become less affected by one another', 'World trade grows more slowly than world output', 'The gains are shared evenly between countries'],
          why: 'Closer links carry downturns from one economy to the next. The global financial crisis of 2008 began in the United States and spread worldwide.',
          clue: 'Linked economies share good times and bad.'},
        b: {d: 3, q: 'Which statement about globalisation and incomes is most accurate?',
          opts: ['It raised many incomes, but the gains were uneven', 'It raised incomes mainly in the poorest economies', 'It cut inequality inside most countries', 'It raised incomes by a similar amount everywhere'],
          why: 'Fast-growing emerging economies narrowed the gap with rich ones. The poorest economies fell further behind, and inequality rose inside many countries.',
          clue: 'Think of the fast growth in China and India, and of the gap between rich and poor inside countries.'}},

      {id: 'c4p7', title: 'Globalisation and the environment',
        card: [
          'More production, trade and transport use more resources and create more emissions.',
          'Firms can move polluting production to countries with weaker environmental rules.',
          'Problems such as climate change cross borders, so they need agreements between countries.'
        ],
        remember: 'Environmental costs do not stop at a border.',
        a: {q: 'How can globalisation put pressure on the environment?',
          opts: ['More production and transport create more emissions', 'Lower world output reduces the use of resources', 'Fewer goods are moved from country to country', 'Countries stop using their own natural resources'],
          why: 'Globalisation raises output and moves more goods over longer distances. Both use more energy and resources.',
          clue: 'Think about what more factories and more shipping need.'},
        b: {d: 2, q: 'A firm moves its most polluting factory to a country with weaker environmental laws. What does this show?',
          opts: ['Pollution can shift between countries instead of falling', 'World emissions fall whenever production moves', 'Environmental laws do not affect where firms produce', 'Trade agreements set the same pollution limits everywhere'],
          why: 'The firm\'s pollution has moved, not stopped. This is why global environmental problems need rules that countries agree on together.',
          clue: 'Ask whether the pollution stopped or moved.'}}
    ]}
  ]
}; /*TOPIC-END*/
