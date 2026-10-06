// Friends, messages, a challenge, races, the store, settings, search and reset.
import { open, shot, tab, saved, pick, toLast, waiting, check } from './lib.mjs';
const R = [];
const {b, ctx, p, errs} = await open({clock: true});
const text = sel => p.locator(sel).first().textContent();
const ff = async ms => { await ctx.clock.runFor(ms); await p.waitForTimeout(60); };
async function playAll(n, wrongAt = []) {            // answer n questions in the flight on screen
  for (let i = 0; i < n; i++) { await pick(p, '#feed', !wrongAt.includes(i)); await ff(1400); await toLast(p, '#feed'); }
}

// --- friends list
await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(120);
check((await text('.page h2')) === 'Friends', 'the plane button opens Friends', R);
const order = await p.locator('.thr b').allTextContents();
check(order.join() === 'Aisha,Noah,Mia,Tom', 'threads are newest first: ' + order.join(), R);
check(await p.locator('.thr.unread').count() === 2, 'two threads are unread', R);
check((await text('.notice')).includes('sample friends'), 'the page says the friends are samples', R);
await shot(p, 'soc-friends');
await p.click('[data-act="ftab"][data-v="week"]'); await p.waitForTimeout(80);
const lb = await p.locator('.lb li').allTextContents();
check(lb.length === 5 && lb[4].includes('You') && lb[4].trim().endsWith('0'), 'leaderboard has five rows with you last on 0', R);
await shot(p, 'soc-week');
await p.click('[data-act="ftab"][data-v="msgs"]'); await p.waitForTimeout(80);

// --- a challenge Mia sent, played cold
await p.click('.thr[data-f="mia"]'); await p.waitForTimeout(120);
check((await text('.mcard .t')) === 'International economic integration' && (await text('.mcard')).includes('Mia6 of 8') && (await text('.mcard')).includes('YouNot played'), 'Mia\'s challenge card shows her 6 of 8', R);
await shot(p, 'soc-thread-mia');
check(!(await saved(p)).unread.mia, 'opening the thread clears its unread count', R);
await p.click('.mcard [data-act="play"]'); await p.waitForTimeout(100);
check((await text('#sheetTitle')) === 'Before you play' && (await text('#sheetBody')).includes('All 7 points in this chapter are new to you'), 'it warns that the chapter is new', R);
await shot(p, 'soc-cold-sheet');
await p.click('#sheetBody [data-act="play"]'); await p.waitForTimeout(100);
check(await p.locator('#launch:not([hidden])').count() === 1 && (await text('#launchMark')).includes('Mia scored 6 of 8. Beat it.'), 'the launch card names the score to beat', R);
await ff(1500);
check(await p.locator('#launch[hidden]').count() === 1 && (await text('#modeT')) === 'Challenge, Mia got 6 of 8', 'the challenge flight starts', R);
check(await p.locator('#feed .actions').count() === 0, 'a challenge has no clue, answer or skip buttons', R);
await playAll(8, [1, 5]);
let sum = await text('#feed .summary');
check(sum.includes('6 of 8') && sum.includes('A draw. Mia scored 6.'), 'result: 6 of 8, a draw', R);
await shot(p, 'soc-challenge-result');
await p.click('[data-act="tothread"]'); await p.waitForTimeout(150);
check((await text('.page h2')) === 'Mia' && (await text('.mcard')).includes('You6 of 8') && (await text('.mcard .out')) === 'A draw.', 'the card in the thread now shows both scores', R);
await ff(3200);
check((await p.locator('.msg .bubble').last().textContent()) === 'Good game', 'Mia replies Good game', R);
await shot(p, 'soc-thread-mia-done');
let s = await saved(p);
check(Object.keys(s.ans).length === 8 && s.week.n === 6, '8 answers saved and 6 counted for the week', R);

// --- quick replies and a rematch
await p.click('[data-act="reply"][data-text="Rematch?"]'); await ff(1700);
check((await p.locator('.msg .bubble').last().textContent()) === 'You are on', 'Mia answers the rematch', R);
await ff(2000);
check(await p.locator('.mcard [data-act="play"]').count() === 1, 'and sends a new challenge card', R);
await shot(p, 'soc-thread-rematch');

// --- a race Aisha sent, won
await p.click('[data-act="back"]'); await p.waitForTimeout(100);
await p.click('.thr[data-f="aisha"]'); await p.waitForTimeout(100);
await p.click('.mcard [data-act="play"]'); await p.waitForTimeout(80);
check(await p.locator('#sheet[hidden]').count() === 1, 'no warning this time, because chapter 1 is no longer new', R);
check((await text('#launchMark')).includes('Race Aisha'), 'race launch card shows', R);
await ff(130); check((await text('#launchMark .count')) === '3', 'the countdown starts at 3', R);
await shot(p, 'soc-race-count');
await ff(3200);
check(await p.locator('#launch[hidden]').count() === 1 && await p.locator('#lanes:not([hidden])').count() === 1, 'the race is on, with two lanes', R);
for (let i = 0; i < 6; i++) { await pick(p, '#feed', true); if (i === 2) await shot(p, 'soc-race-mid'); await toLast(p, '#feed'); }
sum = await text('#feed .summary');
check(sum.includes('You won the race.') && sum.includes('6 to 0'), 'six right in a row wins 6 to 0', R);
await shot(p, 'soc-race-won');
s = await saved(p);
check(s.th.aisha[0].state === 'done' && s.th.aisha[0].me === 6, 'Aisha\'s race card is marked done', R);

// --- a race started with Tom, lost by waiting
await p.click('[data-act="tothread"]'); await p.waitForTimeout(100);
await p.click('[data-act="back"]'); await p.waitForTimeout(100);
await p.click('.thr[data-f="tom"]'); await p.waitForTimeout(100);
check((await text('.p-body')).includes('No messages yet'), 'Tom\'s thread starts empty', R);
await p.click('[data-act="pickch"][data-kind="race"]'); await p.waitForTimeout(80);
await shot(p, 'soc-pick-chapter');
await p.click('#sheetBody [data-ch="c3"]'); await p.waitForTimeout(80);
await ff(4500);
await pick(p, '#feed', true); await toLast(p, '#feed');
await pick(p, '#feed', false); await ff(1400);
await ff(200000);                                   // Tom scores every 12 to 24 seconds
sum = await text('#feed .summary');
check(sum.includes('Tom won the race.') && sum.includes('1 to 6'), 'waiting loses the race 1 to 6', R);
check((await p.locator('#feed .slide.q.done .note').last().textContent()).includes('The race ended before you answered'), 'the open question is closed', R);
await shot(p, 'soc-race-lost');

// --- a challenge sent to Noah
await p.click('[data-act="home"]'); await p.waitForTimeout(100);
await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(100);
await p.click('.thr[data-f="noah"]'); await p.waitForTimeout(100);
await shot(p, 'soc-thread-noah');
await p.click('[data-act="pickch"][data-kind="challenge"]'); await p.waitForTimeout(80);
await p.click('#sheetBody [data-ch="c1"]'); await p.waitForTimeout(80);
await ff(1500);
await playAll(8);
sum = await text('#feed .summary');
check(sum.includes('8 of 8') && sum.includes('Noah is playing the same set now.'), 'my challenge result: 8 of 8, Noah still playing', R);
await ff(9000);
check((await text('#toast')) === 'Noah finished your challenge' && (await saved(p)).unread.noah === 1, 'a toast says Noah finished, and his thread is unread', R);
await p.click('[data-act="tothread"]'); await p.waitForTimeout(100);
const card = await p.locator('.mcard').last().textContent();
check(/Noah\d of 8/.test(card) && card.includes('You8 of 8'), 'the card shows both scores: ' + card, R);

// --- store
await p.click('[data-act="back"]'); await p.click('[data-act="back"]'); await p.waitForTimeout(100);
await tab(p, 'you');
await shot(p, 'soc-you');
await p.click('[data-act="page"][data-page="store"]'); await p.waitForTimeout(120);
await shot(p, 'soc-store-top');
check(await p.locator('.tile').count() === 6 + 5 + 6 + 3, 'the store has 20 items', R);
check(await p.locator('.tile[aria-pressed="true"]').count() === 4, 'four items are in use', R);
await p.click('.tile[data-kind="bg"][data-id="sky"]'); await p.waitForTimeout(60);
await p.click('.tile[data-kind="rocket"][data-id="needle"]'); await p.waitForTimeout(60);
await p.click('.tile[data-kind="exhaust"][data-id="ion"]'); await p.waitForTimeout(60);
s = await saved(p);
check(s.bg === 'sky' && s.rocket === 'needle' && s.exhaust === 'ion', 'owned items can be put in use', R);
await p.click('.tile[data-kind="bg"][data-id="aurora"]'); await p.waitForTimeout(80);
check((await text('#sheetBody')).includes('Example price: $2.99. Buying is switched off'), 'a locked item explains that buying is off', R);
await shot(p, 'soc-store-locked');
await p.click('#sheetBody [data-act="sheetclose"]');
await p.click('.tile[data-kind="rocket"][data-id="comet"]'); await p.waitForTimeout(80);
check((await text('#sheetBody')).includes('unlocks at a 30-day streak'), 'the earned rocket explains the streak', R);
await p.click('#sheetClose');
await p.evaluate(() => { const b = document.querySelector('.page .p-body'); b.scrollTop = b.scrollHeight; }); await p.waitForTimeout(60);
await shot(p, 'soc-store-bottom');
await p.click('[data-act="back"]'); await p.waitForTimeout(80);

// --- settings
await p.click('[data-act="editname"]'); await p.waitForTimeout(60);
await p.fill('#nameIn', 'James'); await p.keyboard.press('Enter'); await p.waitForTimeout(60);
check((await text('.me .h1')) === 'James', 'the call sign is saved', R);
await p.click('[data-act="theme"][data-v="dark"]'); await p.waitForTimeout(60);
check(await p.evaluate(() => document.documentElement.getAttribute('data-theme')) === 'dark', 'Dark sets the theme', R);
await shot(p, 'soc-you-dark');
await p.click('[data-act="sound"]'); await p.waitForTimeout(40);
check((await saved(p)).sound === false, 'sound can be switched off', R);
await p.click('[data-act="theme"][data-v="system"]'); await p.waitForTimeout(40);
check(await p.evaluate(() => document.documentElement.hasAttribute('data-theme')) === false, 'System removes the override', R);

// --- search
await tab(p, 'search');
await p.fill('#q', 'tariff'); await p.waitForTimeout(80);
const hits = await p.locator('.res .t').allTextContents();
check(hits[0] === 'Tariffs' && hits.length >= 4, 'searching tariff finds Tariffs first, ' + hits.length + ' points', R);
await shot(p, 'soc-search');
await p.click('.res'); await p.waitForTimeout(80);
check((await text('#sheetTitle')) === 'Tariffs' && (await text('#sheetBody')).includes('A tariff is a tax on an imported good.'), 'a result opens the point with its card', R);
await shot(p, 'soc-point-sheet');
await p.click('#sheetClose');
await p.fill('#q', 'zzzz'); await p.waitForTimeout(60);
check((await text('#qOut')).includes('Nothing in this topic matches'), 'no match is handled', R);
await p.click('#qClear'); await p.waitForTimeout(40);
check(await p.locator('#qChips:not([hidden])').count() === 1, 'clearing brings the suggestions back', R);

// --- reset
await tab(p, 'you');
await p.click('[data-act="reset"]'); await p.waitForTimeout(40);
check((await text('[data-act="reset"]')).startsWith('Tap again'), 'reset asks for a second tap', R);
await p.click('[data-act="reset"]'); await p.waitForTimeout(150);
s = await saved(p);
check(Object.keys(s.ans).length === 0 && s.bg === 'plain' && !s.name && s.th.mia.length === 1, 'reset clears progress, settings and messages', R);
check((await text('.hero .primary')) === 'Start this chapter', 'and Home is back to the start', R);

console.log(R.join('\n'));
console.log('errors:', errs);
await b.close();
