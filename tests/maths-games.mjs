// Maths challenges and races in v2: the subject switch on the friend sheet, a maths challenge sent and finished,
// the same seed giving the same questions on both sides, a maths rematch staying in maths, a maths race won and lost,
// and the sample friends' maths pace. Every answer is typed with keypad taps, worked out with the Maths Lab's solver.
import fs from 'fs';
import { open, saved, check } from './lib.mjs';
const R = [];
const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8');
const LM = new Function(read('lab/maths.js') + '; return LabMaths;')();
// The app's own question maker, run here with no browser. A seed must give the same questions here as on the phone.
const {MATHS, MAKE} = new Function(read('src/maths-content.js') + read('src/15-maths-make.js') + '; return {MATHS, MAKE};')();
const setFor = (ch, seed) => MAKE.set(MATHS.chapters.find(c => c.id === ch).points, seed, 5).map(q => q.eq);

const T = Date.now();
const h = q => ({ok: true, day: '2026-10-01', q: q, t: T - 1e6});
// Every maths point has one right answer, so nothing is new and Play never stops to warn.
const SEED = {subject: 'maths', m: {cur: 'm1', h: {m1p1: [h('a')], m1p2: [h('b')], m1p3: [h('c')], m1p4: [h('d')], m1p5: [h('e')], m2p1: [h('f')], m2p2: [h('g')]}},
  th: {
    aisha: [{id: 1, from: 'them', kind: 'race', ch: 'm1', state: 'open', t: T - 4e6}],
    noah: [],
    mia: [{id: 3, from: 'them', kind: 'challenge', ch: 'm1', seed: 12345, them: 3, themMs: 150000, me: null, total: 5, state: 'open', t: T - 3e6}],
    tom: []
  }, unread: {}, mid: 10};
const {b, ctx, p, errs} = await open({clock: true, seed: SEED});
const ff = async ms => { await ctx.clock.runFor(ms); await p.waitForTimeout(60); };
const text = sel => p.locator(sel).first().textContent();
const music = () => p.evaluate(() => document.querySelector('#run').dataset.music);
// The question on screen, as LaTeX. A maths slide shows its question's LaTeX as it is (questions have no macros).
const question = () => p.locator(WAIT + ' .mq-q math-span').last().textContent();

// --- keypad helpers, as in maths-practice.mjs
const NAME = {x: 't0', or: 't2', '=': 'equals', '-': 'minus', '>': 'right', F: 'frac'};
const tap = async sel => { await p.locator(sel).last().tap(); await p.waitForTimeout(25); };
async function keys(seq) { for (const k of seq.split(' ')) if (k) await tap('#mKeys .key[data-key="' + (NAME[k] || k) + '"]'); }
function numberKeys(v) {
  for (let q = 1; q <= 12; q++) {
    const n = Math.round(v * q);
    if (Math.abs(v * q - n) > 1e-7) continue;
    const sign = n < 0 ? '- ' : '', top = String(Math.abs(n)).split('').join(' ');
    return q === 1 ? sign + top : sign + 'F ' + top + ' > ' + String(q).split('').join(' ') + ' >';
  }
  throw new Error('not a simple number: ' + v);
}
const WAIT = '#feed .slide.mq:not(.done)';
async function answer(wrong) {
  const latex = await p.locator(WAIT + ' .mq-q math-span').last().textContent();
  const xs = LM.solve(LM.read(latex)).some.slice().sort((a, b) => b - a), vals = wrong ? [xs[0] + 1000] : xs;
  await keys(vals.map(v => 'x = ' + numberKeys(v)).join(' or '));
  await tap('#mDone');
  await p.waitForTimeout(120);
}
async function ready() {
  await p.waitForFunction(() => document.querySelector('#app').dataset.work !== undefined && document.querySelector('#launch').hidden, null, {timeout: 8000});
  await p.waitForTimeout(80);
}
// Back to Home the way a student would (back buttons, or Back to Home on a result), then open Friends.
async function home() {
  for (let i = 0; i < 4 && await p.locator('.page [data-act="back"]:visible').count(); i++) { await p.locator('.page [data-act="back"]:visible').last().click(); await p.waitForTimeout(150); }
  const back = p.locator('#feed .summary [data-act="home"]');
  if (await back.count() && await back.isVisible()) await back.click(); else await p.click('.tab[data-tab="home"]');
  await p.waitForTimeout(120);
}
const toFriends = async () => { await home(); await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(100); };
const toThread = async f => { await toFriends(); await p.click('.thr[data-f="' + f + '"]'); await p.waitForTimeout(100); };

await p.waitForFunction(() => !!window.MathfieldElement, null, {timeout: 8000});

// --- the friend sheet: Economics or Maths, starting with the subject picked on Home
await toThread('noah');
await p.click('[data-act="pickch"][data-kind="challenge"]'); await p.waitForTimeout(80);
const pressed = () => text('#sheetBody .subsw [aria-pressed="true"]');
const chs = () => p.locator('#sheetBody [data-act="startwith"]').evaluateAll(bs => bs.map(x => x.dataset.ch).join());
check((await pressed()) === 'Maths' && (await chs()) === 'm1,m2', 'the challenge sheet starts on Maths, with the maths chapters', R);
check((await text('#sheetBody .sub')).includes('You play 5 questions first, then Noah plays the same set, with the same numbers.'), 'a maths challenge is 5 questions with the same numbers for both', R);
await p.click('#sheetBody .subsw [data-sub="eco"]'); await p.waitForTimeout(60);
check((await pressed()) === 'Economics' && (await chs()) === 'c1,c2,c3,c4' && (await text('#sheetBody .sub')).includes('You play 8 questions'), 'Economics switches the sheet to the Economics chapters and 8 questions', R);
check(await p.evaluate(() => document.activeElement.dataset.sub) === 'eco', 'focus stays on the subject switch', R);
await p.click('#sheetClose');
await p.click('[data-act="pickch"][data-kind="race"]'); await p.waitForTimeout(80);
check((await pressed()) === 'Maths' && (await text('#sheetBody .sub')).includes('The first to 4 correct answers wins.'), 'the race sheet starts on Maths: first to 4', R);
await p.click('#sheetBody .subsw [data-sub="eco"]'); await p.waitForTimeout(60);
check((await text('#sheetBody .sub')).includes('The first to 6 correct answers wins.'), 'and Economics is first to 6', R);
await p.click('#sheetClose');
check(await p.locator('#pracStart [data-act="pickch"], #pracStart [data-act="startwith"]').count() === 0, 'the Practice start screen has no game button, as in Economics', R);

// --- a maths challenge sent to Noah, played with one wrong answer
await p.click('[data-act="pickch"][data-kind="challenge"]'); await p.waitForTimeout(80);
await p.click('#sheetBody [data-ch="m1"]');
await ready();
check((await text('#modeT')) === 'Maths challenge for Noah', 'the flight says it is a maths challenge for Noah', R);
check(await p.locator(WAIT + ' [data-act="mpskip"]').count() === 0 && await p.locator(WAIT + ' [data-act="mpreveal"]').count() === 1, 'a challenge question has Answer but no Skip', R);
check(await p.locator('#fSegs .seg').count() === 5 && await p.locator('#fSegs:not([hidden])').count() === 1, 'five segments, one per question', R);
const played = [];
for (let i = 0; i < 5; i++) {
  played.push(await question());
  await answer(i === 2);
  if (i === 2) {
    const sec = p.locator('#feed .slide.mq.done').last();
    check((await sec.locator('.end').textContent()).startsWith('Not this time') && (await sec.locator('.note').textContent()).includes('Worked solution'), 'a wrong answer ends the question and shows the worked solution', R);
    check(await sec.locator('.next:not([hidden])').count() === 1 && await p.locator(WAIT).count() === 1, 'Next waits, with the next question ready below', R);
    await sec.locator('.next').tap();
  }
  if (i < 4) await ready();
}
await p.waitForSelector('#feed .summary');
let sum = await text('#feed .summary');
check(sum.includes('4 of 5') && sum.includes('Noah is playing the same set now.') && /Your time\d+:\d\d/.test(sum), 'result: 4 of 5, your time, Noah still playing', R);
check(await p.locator('#feed .slide.mq').count() === 5, 'five questions in all: nothing came back at the end', R);
let s = await saved(p);
let m = s.th.noah[s.th.noah.length - 1];
const sentSeed = m.seed;
check(m.kind === 'challenge' && m.ch === 'm1' && typeof m.seed === 'number' && m.total === 5 && m.me === 4 && m.meMs > 0 && m.state === 'wait', 'the card is saved with its seed, 4 of 5 and your time', R);
check(new Set(played).size === 5 && JSON.stringify(played) === JSON.stringify(setFor('m1', sentSeed)), 'the five questions are the ones its seed makes, worked out again away from the page: ' + played.join(' | '), R);
await ff(9000);
check((await text('#toast')) === 'Noah finished your challenge', 'Noah finishes the same set', R);
await p.click('[data-act="tothread"]'); await p.waitForTimeout(150);
const card = p.locator('.mcard').last();
const times = await card.locator('.sc.timed .tm').allTextContents();
s = await saved(p); m = s.th.noah[s.th.noah.length - 1];
check((await card.textContent()).includes('Maths challenge, 5 questions') && (await card.textContent()).includes('You4 of 5') && times.length === 2 && times.every(t => /^\d+:\d\d$/.test(t)), 'the card shows both scores and both times: ' + times.join(', '), R);
const want = m.them > 4 ? 'Noah won.' : m.them < 4 ? 'You won.' : (m.meMs < m.themMs ? 'You won on time.' : 'Noah won on time.');
check((await card.locator('.out').textContent()) === want && m.themMs > 0, 'the result line follows the scores, then the times: ' + want, R);

// --- a maths rematch stays in maths, even with Economics picked on Home
await p.click('[data-act="reply"][data-text="Rematch?"]'); await ff(1700);
await ff(2000);
s = await saved(p); m = s.th.noah[s.th.noah.length - 1];
check(m.from === 'them' && m.kind === 'challenge' && m.ch === 'm1' && m.total === 5 && typeof m.seed === 'number' && m.seed !== sentSeed && m.them != null && m.themMs > 0, 'Noah\'s rematch is a maths challenge on the same chapter, with a new seed', R);
const rematchSeed = m.seed;
await home();
await p.click('.subrow [data-act="subject"]'); await p.waitForTimeout(80);
await p.click('#sheetBody [data-sub="eco"]'); await p.waitForTimeout(150);
check((await saved(p)).subject === 'eco', 'Home is switched to Economics', R);
await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(100);
await p.click('.thr[data-f="noah"]'); await p.waitForTimeout(100);
await p.click('[data-act="reply"][data-text="Rematch?"]'); await ff(3700);
s = await saved(p);
check(s.th.noah[s.th.noah.length - 1].ch === 'm1', 'a second rematch, sent with Economics picked, is still on the maths chapter', R);
await p.locator('.mcard [data-act="play"]').first().tap();
await ready();
check((await saved(p)).subject === 'maths' && (await text('#modeT')).startsWith('Maths challenge, Noah got'), 'Play switches Home back to Maths and plays the rematch', R);
played.length = 0;
for (let i = 0; i < 5; i++) { played.push(await question()); await answer(false); if (i < 4) await ready(); }
check(JSON.stringify(played) === JSON.stringify(setFor('m1', rematchSeed)), 'the rematch has exactly the questions its seed gave Noah', R);
await p.waitForSelector('#feed .summary');
sum = await text('#feed .summary');
check(sum.includes('5 of 5') && /won|draw/i.test(sum), 'five right: the result says who won', R);

// --- Mia's challenge: the seed on her card gives the same questions here as anywhere
await toThread('mia');
check((await text('.mcard')).includes('Maths challenge, 5 questions') && (await text('.mcard')).includes('Mia3 of 52:30'), 'Mia\'s card shows her score and time', R);
await p.locator('.mcard [data-act="play"]').tap();
await ready();
check((await text('#modeT')) === 'Maths challenge, Mia got 3 of 5', 'the flight shows the score to beat', R);
const mia = setFor('m1', 12345);
check((await question()) === mia[0], 'seed 12345 gives the first question worked out outside the page: ' + mia[0], R);
await answer(false); await ready();
check((await question()) === mia[1], 'and the second: ' + mia[1], R);
await p.click('#endBtn'); await p.click('#endBtn'); await p.waitForTimeout(150);
sum = await text('#feed .summary');
check(sum.includes('1 of 5') && sum.includes('You ended early') && sum.includes('Mia won. Mia scored 3 in 2:30.'), 'ending early counts the rest as wrong: Mia won', R);
check(await p.evaluate(() => document.querySelector('#app').dataset.work === undefined), 'the keypad goes when the challenge ends', R);

// --- a maths race against Aisha, won
await toThread('aisha');
check((await text('.mcard .k')) === 'Maths race, first to 4 correct', 'Aisha\'s race card says maths, first to 4', R);
await p.locator('.mcard [data-act="play"]').tap();
await ff(1500);
await ready();
check((await text('#modeT')) === 'Maths race to 4' && await p.locator('#lanes:not([hidden])').count() === 1 && await p.locator('#fSegs[hidden]').count() === 1, 'the race shows two lanes and no segments', R);
check(await music() === '0', 'the race music starts on Go', R);
check(!(await text(WAIT + ' .meta')).includes(' of '), 'race questions have no total', R);
for (let i = 0; i < 4; i++) {
  await answer(false);
  if (i === 1) check(await music() === '1', 'the music builds at 2 correct, halfway', R);
  if (i === 2) check(await music() === '2', 'and again at 3, one from winning', R);
  if (i < 3) await ready();
}
await p.waitForSelector('#feed .summary');
sum = await text('#feed .summary');
const lanesThem = +(await text('#laneThem'));
check(sum.includes('You won the race.') && sum.includes('4 to ' + lanesThem) && lanesThem < 4, 'four right wins the race 4 to ' + lanesThem, R);
check((await text('#comboNum')) !== '×0' && (await text('#altNum')) !== '0', 'the combo and the rocket work as in Practice: combo ' + (await text('#comboNum')) + ', altitude ' + (await text('#altNum')), R);
check(await music() === 'off', 'the music stops when the race is won', R);
s = await saved(p);
check(s.th.aisha[0].state === 'done' && s.th.aisha[0].me === 4, 'Aisha\'s race card is marked done, 4 right', R);

// --- the sample friends' pace: maths is slower than Economics, and chapter 2 slower than chapter 1
// The numbers come from src/10-core.js: FRIENDS (pace and mpace) and MATHS_SLOW.
const core = read('src/10-core.js'), grab = name => new Function('return ' + core.match(new RegExp('const ' + name + ' = ([\\s\\S]*?);\\n'))[1])();
const FRIENDS = grab('FRIENDS'), SLOW = grab('MATHS_SLOW');
const paces = FRIENDS.map(f => [f.name, f.pace, f.mpace * SLOW.m1, f.mpace * SLOW.m2]);
check(paces.every(x => x[2] >= 2 * x[1] && x[3] > x[2]), 'each friend takes over twice as long for maths, longer still in chapter 2: ' + paces.map(x => x[0] + ' ' + x.slice(1).map(v => Math.round(v)).join('/')).join(', '), R);

// --- a maths race started with Tom, lost by waiting. Tom takes 45 seconds a point in chapter 1, give or take 35%.
await toThread('tom');
await p.click('[data-act="pickch"][data-kind="race"]'); await p.waitForTimeout(80);
await p.click('#sheetBody [data-ch="m1"]');
await ff(1500);
await ready();
await ff(27000);
check((await text('#laneThem')) === '0', 'after 27 seconds Tom has not scored (his fastest is 29 seconds; in Economics it would be 12)', R);
await answer(false); await ready();
await ff(36000);
check(+(await text('#laneThem')) >= 1, 'by about 64 seconds Tom has scored (his slowest is 61 seconds)', R);
await ff(400000);
await p.waitForSelector('#feed .summary');
sum = await text('#feed .summary');
check(sum.includes('Tom won the race.') && sum.includes('1 to 4'), 'waiting loses the race 1 to 4', R);
check((await p.locator('#feed .slide.mq.done .note').last().textContent()).includes('The race ended before you answered'), 'the open question is closed', R);
check(await p.evaluate(() => document.querySelector('#app').dataset.work === undefined) && await music() === 'off', 'the keypad goes and the music stops', R);
s = await saved(p);
m = s.th.tom.find(x => x.kind === 'race');
check(m && m.kind === 'race' && m.ch === 'm1' && m.me === 1 && m.them === 4, 'the race is saved in Tom\'s thread, 1 to 4', R);
await toThread('tom');
check((await text('.mcard')).includes('Maths race, first to 4 correct') && (await text('.mcard .out')) === 'Tom won.', 'and its card says Tom won', R);

// --- the weekly table counts both subjects together
await toFriends();
await p.click('[data-act="ftab"][data-v="week"]'); await p.waitForTimeout(80);
check((await text('.lb-cap')) === 'Correct answers since Monday, both subjects.', 'the weekly table says it counts both subjects', R);

check(!errs.length, 'no script errors: ' + errs.join(' | '), R);
await b.close();
console.log(R.join('\n'));
console.log('errors:', errs);
