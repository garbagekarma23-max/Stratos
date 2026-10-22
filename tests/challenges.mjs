// Runs challenges between real friends in v2 on two devices against the fake Supabase (fake-supabase.mjs), whose
// database is PGlite with every SQL file loaded, so the rules are the real ones. Ana has learned NSW Economics
// chapter 1 on her phone; Ben has learned nothing. They are friends with no message request yet.
// node challenges.mjs shots also saves the screens at 390 by 844 in light and dark.
import { open, shot, tab as tabOnly, pick, toLast, TOPIC, check } from './lib.mjs';
import { fakeSupabase } from './fake-supabase.mjs';

const R = [], SHOTS = process.argv[2] === 'shots';
const f = await fakeSupabase();
const all = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const until = async (fn, ms = 6000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await fn()) return true; await wait(100); } return false; };
const device = async (o = {}) => { const d = await open(Object.assign({supabase: f}, o)); all.push(d); return d; };
const text = async (p, sel) => ((await p.locator(sel).first().textContent()) || '').trim();
const toastSays = (p, s) => until(async () => (await text(p, '#toast')).includes(s), 4000);
async function tab(p, t) {
  while (await p.locator('#pages [data-act="back"]').count()) { await p.locator('#pages [data-act="back"]').last().click(); await p.waitForTimeout(80); }
  if (await p.locator('#sheet:not([hidden])').count()) { await p.click('#sheetClose'); await p.waitForTimeout(80); }
  await tabOnly(p, t);
}
const call = async (uid, fn, args = {}) => {
  const keys = Object.keys(args);
  return (await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]))).rows[0].v;
};
const rows = async (sql, params) => (await f.admin(sql, params)).rows;
async function signIn(p, email) {
  await tab(p, 'you');
  await p.click('#v-you [data-act="signin"]'); await p.waitForTimeout(100);
  await p.fill('#emailIn', email);
  await p.click('[data-act="sendcode"]');
  await p.waitForSelector('#codeIn');
  await p.fill('#codeIn', f.codes[email]);
  await p.click('[data-act="verifycode"]');
  await p.waitForSelector('#sheet', {state: 'hidden', timeout: 8000});
  await p.waitForTimeout(300);
}
async function friendsPage(p) {
  await tab(p, 'home');
  await p.click('[data-act="page"][data-page="friends"]');
  await p.waitForSelector('.p-body .fr-open', {timeout: 8000});
}
async function chat(p) {
  await friendsPage(p);
  await p.click('.p-body .fr-open');
  await p.waitForFunction(() => !/^Loading/.test(document.querySelector('.p-body.thread .sys')?.textContent || ''), null, {timeout: 6000});
}
// The number of new things Home's friends button says it has.
const homeNew = async p => { await tab(p, 'home'); return +((/, (\d+) new/.exec(await p.locator('#v-home [data-page="friends"]').getAttribute('aria-label')) || [0, 0])[1]); };
// Answer n questions in the flight on screen. Gives back each question and its options in the order shown, so two
// players' sets can be compared.
async function playAll(p, n, wrongAt = []) {
  const seen = [];
  for (let i = 0; i < n; i++) {
    const s = p.locator('#feed .slide.q:not(.done)').last();
    seen.push((await s.locator('.qtext').textContent()) + ' / ' + (await s.locator('.opt .txt').allTextContents()).join(' / '));
    await pick(p, '#feed', !wrongAt.includes(i)); await p.waitForTimeout(wrongAt.includes(i) ? 1500 : 250); await toLast(p, '#feed');
  }
  return seen;
}
const fits = p => p.evaluate(() => [...document.querySelectorAll('.p-body, .panel, .composer')].every(el => el.scrollWidth <= el.clientWidth + 1) && document.documentElement.scrollWidth <= innerWidth);
async function both(p, name) {
  if (!SHOTS) return;
  await shot(p, name + '-light');
  await p.emulateMedia({colorScheme: 'dark'}); await p.waitForTimeout(100);
  await shot(p, name + '-dark');
  await p.emulateMedia({colorScheme: 'light'}); await p.waitForTimeout(100);
}
const lastChallenge = async () => (await rows('select * from public.challenges order by made_at desc limit 1'))[0];

// Ana and Ben, friends already, each with a call sign. Ana's phone has learned every point in NSW Economics chapter 1.
const ua = await f.user('ana@example.com'), ub = await f.user('ben@example.com');
await call(ua.id, 'set_username', {new_username: 'ana.game'});
await call(ub.id, 'set_username', {new_username: 'ben.game'});
await f.as(ua.id, "insert into public.profiles (id, call_sign) values ($1, 'Ana') on conflict (id) do update set call_sign = 'Ana'", [ua.id]);
await f.as(ub.id, "insert into public.profiles (id, call_sign) values ($1, 'Ben') on conflict (id) do update set call_sign = 'Ben'", [ub.id]);
await call(ua.id, 'send_friend_request', {friend_code: (await call(ub.id, 'friends_state')).me.code});
await call(ub.id, 'accept_friend_request', {ref: (await call(ub.id, 'friends_state')).incoming[0].ref});
const ref = (await call(ua.id, 'friends_state')).friends[0].ref;
const ans = {};
TOPIC.chapters[0].points.forEach(pt => { ans[pt.id + 'a'] = {ok: true, n: 1, t: Date.now() - 60000}; });

// ---------- signed out: the sample friends only ----------
const O = await device();
await O.p.click('[data-act="page"][data-page="friends"]'); await O.p.waitForTimeout(150);
check(await O.p.locator('.fr-open').count() === 0 && await O.p.locator('.thr').count() === 4 && (await text(O.p, '.fr-out .h2')) === 'Friends need an account', 'signed out, Friends has the sample friends and asks for an account, with no real friend rows', R);
await O.p.click('.thr[data-f="tom"]'); await O.p.waitForTimeout(120);
await O.p.click('[data-act="pickch"][data-kind="challenge"]'); await O.p.waitForTimeout(100);
check(await O.p.locator('#sheetBody [data-act="startwith"]').count() === 4 && await O.p.locator('#sheetBody [data-act="chstart"]').count() === 0, 'a sample friend\'s challenge sheet works as before, any chapter', R);
check(f.log.length === 0, 'nothing is asked of Supabase while signed out', R);

const A = await device({seed: {ans, picked: 1, subject: 'eco'}}), B = await device();
await signIn(A.p, 'ana@example.com');
await signIn(B.p, 'ben@example.com');
const baseA = await homeNew(A.p), baseB = await homeNew(B.p);

// ---------- the challenge sheet ----------
await friendsPage(A.p);
check(await A.p.locator('.fr-friend [data-act="pickch"]').count() === 1 && (await text(A.p, '.fr-friend [data-act="pickch"]')) === 'Challenge', 'a friend\'s row has a Challenge button', R);
await both(A.p, 'chal-friends');
await A.p.click('.fr-friend [data-act="pickch"]'); await A.p.waitForTimeout(120);
check((await text(A.p, '#sheetTitle')) === 'Challenge Ben', 'it opens Challenge Ben', R);
check((await A.p.locator('#sheetBody .subsw button').allTextContents()).join() === 'Economics,Maths,AS Economics' && (await A.p.getAttribute('#sheetBody .subsw [aria-pressed="true"]', 'data-sub')) === 'eco',
  'with a switch for all three courses, on the course open on Home', R);
check((await text(A.p, '#sheetBody .sub')) === 'Pick a chapter you’ve learned. You play first, then Ben plays the same questions. Ben has 7 days to play.', 'the line says who plays first and for how long', R);
check((await text(A.p, '#sheetBody [data-ch="c1"] small')) === '8 questions' && !(await A.p.locator('#sheetBody [data-ch="c1"]').isDisabled()), 'a learned chapter can be picked, with its number of questions', R);
check(await A.p.locator('#sheetBody [data-ch="c2"]').isDisabled() && (await text(A.p, '#sheetBody [data-ch="c2"] small')) === 'Learn every point first', 'a chapter not learned cannot', R);
check((await A.p.locator('#sheetBody > .fine').last().textContent()) === 'More right answers wins. If it’s level, the faster time wins.', 'and the sheet says how a challenge is won', R);
await both(A.p, 'chal-sheet');
await A.p.click('#sheetBody .subsw [data-sub="edexcel"]'); await A.p.waitForTimeout(80);
check((await text(A.p, '#sheetBody .ch-none')) === 'Learn a chapter in this course to challenge with it.' && await A.p.locator('#sheetBody [data-act="chstart"]:not([disabled])').count() === 0 && await A.p.locator('#sheetBody h3.unit').count() === 2,
  'in a course with nothing learned, every chapter is shut and the sheet says why, with each unit\'s name', R);
await A.p.click('#sheetBody .subsw [data-sub="eco"]'); await A.p.waitForTimeout(80);
await A.p.context().setOffline(true);
await A.p.click('#sheetBody [data-ch="c1"]');
check(await toastSays(A.p, 'You need a connection to start a challenge.') && !(await rows('select 1 from public.challenges')).length, 'offline, a challenge cannot start', R);
await A.p.context().setOffline(false); await A.p.waitForTimeout(200);

// ---------- Ana plays first, then it is sent ----------
await A.p.click('#sheetBody [data-ch="c1"]');
await A.p.waitForSelector('#launch:not([hidden])');
check((await text(A.p, '#launchMark')).includes('8 questions. Ben plays the same set after you.'), 'the launch card says Ben plays the same set after', R);
const c1 = await lastChallenge();
check(c1 && c1.sent_at === null && c1.ch === 'c1' && c1.total === 8, 'the challenge is made in the database, not sent yet', R);
await A.p.waitForSelector('#launch[hidden]', {state: 'attached'});
check(await A.p.locator('#fClock:not([hidden])').count() === 1 && (await text(A.p, '#modeT')) === 'Challenge for Ben', 'an Economics challenge has a clock', R);
const setA = await playAll(A.p, 8, [2, 5]);
await A.p.waitForSelector('#feed .summary');
await until(async () => !!(await lastChallenge()).sent_at);
const sumA = await text(A.p, '#feed .summary');
check(sumA.includes('Challenge sent') && sumA.includes('6 of 8') && sumA.includes('Sent to Ben. They have 7 days to play it.') && /Your time\d+:\d\d/.test(sumA) && sumA.includes('Ben\'s timeNot played'), 'the result: Challenge sent, 6 of 8, your time, Ben not played', R);
const c1s = await lastChallenge();
check(c1s.sent_at && c1s.from_right === 6 && c1s.from_ms >= 12000, 'the database has Ana\'s score, and a time of at least 1.5 seconds a question: ' + c1s.from_ms, R);
check(await until(async () => (await text(A.p, '#fClock')) === (await text(A.p, '#feed .summary .myT'))) && (await text(A.p, '#fClock')) === Math.floor(c1s.from_ms / 60000) + ':' + String(Math.floor(c1s.from_ms / 1000) % 60).padStart(2, '0'),
  'the clock and Your time both show the time the database saved', R);
check(!(await A.p.evaluate(() => localStorage.getItem('stratos2.chal'))), 'nothing waits on the phone once it is saved', R);
await both(A.p, 'chal-sent');
await A.p.click('#feed [data-act="tochat"]');
await A.p.waitForSelector('.p-body .ch-msg');
check((await text(A.p, '.ch-msg .mcard .out')) === 'Waiting for Ben to play. 7 days left.' && (await text(A.p, '.ch-msg .mcard .k')) === 'Challenge, 8 questions' && (await text(A.p, '.ch-msg .mcard .d')) === 'Economics, Year 12. Chapter 1.',
  'See it in chat shows the card, waiting for Ben, with the course and chapter', R);
check(/^BenNot playedYou6 of 8\d+:\d\d$/.test(await text(A.p, '.ch-msg .sc')), 'with Ben not played and Ana\'s 6 of 8 and time', R);
check((await text(A.p, '.ch-part > .fine')) === 'Challenges work without a message request. They have no messages in them, only the chapter and the scores.' && await A.p.locator('.ch-part [data-act="pickch"]').count() === 1,
  'with no message request accepted, the chat still shows challenges and a Send a challenge button', R);
await both(A.p, 'chal-waiting');

// ---------- Ben sees it, and plays it ----------
await friendsPage(B.p);
check(await until(async () => (await B.p.locator('.p-body .ch-row').count()) === 1, 12000), 'it reaches Ben\'s Friends page within a refresh', R);
check((await text(B.p, '.p-body .fr-h')) === 'Challenges to play' && /^International economic integration\. Beat 6 of 8 in \d+:\d\d\.$/.test(await text(B.p, '.ch-row .fr-who span')), 'under Challenges to play: the chapter and the score and time to beat', R);
check((await text(B.p, '.fr-friend .fr-who span')) === 'Challenged you: International economic integration' && await B.p.locator('.fr-friend .dot').count() === 1, 'Ana\'s row says she challenged him, with a dot', R);
check(await homeNew(B.p) === baseB + 1, 'and Home\'s friends button counts it', R);
await friendsPage(B.p);
await both(B.p, 'chal-toplay');
await B.p.click('.ch-row [data-act="chplay"]'); await B.p.waitForTimeout(150);
check((await text(B.p, '#sheetTitle')) === 'Before you play' && (await text(B.p, '#sheetBody .fine')) === 'Once you start, you can’t play it again. You have 2 hours to finish.', 'a chapter new to Ben warns first, and says it plays once', R);
await B.p.click('#sheetBody [data-act="chplay"][data-cold="1"]');
await B.p.waitForSelector('#launch:not([hidden])');
check(/Ana scored 6 of 8 in \d+:\d\d\. Beat it\./.test(await text(B.p, '#launchMark')), 'the launch card names the score and time to beat', R);
check((await lastChallenge()).to_start !== null, 'the database marks it started', R);
await B.p.waitForSelector('#launch[hidden]', {state: 'attached'});
const setB = await playAll(B.p, 3);
check(setB.join('|') === setA.slice(0, 3).join('|'), 'Ben gets the same questions as Ana, in the same order, with the options in the same places', R);
check(JSON.parse(await B.p.evaluate(() => localStorage.getItem('stratos2.chal'))).right === 3, 'the score so far is kept on the phone after each answer', R);
await B.p.reload(); await B.p.waitForTimeout(400);
check(await until(async () => (await lastChallenge()).to_done !== null, 8000), 'after a reload part way, the score so far is sent', R);
const c1d = await lastChallenge();
check(c1d.to_right === 3 && !(await B.p.evaluate(() => localStorage.getItem('stratos2.chal'))), 'with the 3 answered right, the rest wrong, and nothing left waiting', R);
await chat(B.p);
await B.p.waitForSelector('.ch-msg');
check((await text(B.p, '.ch-msg .out')) === 'Ana won.' && (await text(B.p, '.ch-msg .sc')).includes('You3 of 8'), 'Ben\'s chat shows the result: Ana won, 3 of 8', R);
check((await B.p.locator('.ch-msg [data-act="chplay"]').count()) === 0 && await B.p.evaluate(() => document.querySelector('.ch-msg').classList.contains('mine')) === false, 'it cannot be played again, and sits on Ana\'s side', R);

// ---------- Ana sees the result ----------
await friendsPage(A.p);
check(await until(async () => (await text(A.p, '.fr-friend .fr-who span')) === 'Challenge: you won, 6 to 3', 12000) && await A.p.locator('.fr-friend .dot').count() === 1, 'Ana\'s row says she won, 6 to 3, with a dot', R);
check(await homeNew(A.p) === baseA + 1, 'and Home counts the new result', R);
await chat(A.p);
check(await until(async () => (await text(A.p, '.ch-msg .out')) === 'You won.') && /Ben3 of 8\d+:\d\dYou6 of 8\d+:\d\d/.test(await text(A.p, '.ch-msg .sc')), 'the card shows both scores and times: You won.', R);
await both(A.p, 'chal-result');
check(await until(async () => (await rows('select from_seen from public.challenges where id = $1', [c1.id]))[0].from_seen === true), 'opening the chat marks the result seen', R);
check(await homeNew(A.p) === baseA, 'and the dot goes', R);

// ---------- a second one, played to the end; a draw on score goes to time ----------
await chat(A.p);
await A.p.click('.ch-part [data-act="pickch"]'); await A.p.waitForTimeout(100);
await A.p.click('#sheetBody [data-ch="c1"]');
await A.p.waitForSelector('#launch[hidden]', {state: 'attached', timeout: 8000}); await A.p.waitForTimeout(100);
await playAll(A.p, 8, [0, 1]);
await A.p.waitForSelector('#feed .summary');
await until(async () => !!(await lastChallenge()).sent_at);
const c2 = await lastChallenge();
await friendsPage(B.p);
await until(async () => (await B.p.locator('.ch-row').count()) === 1, 12000);
await B.p.click('.ch-row [data-act="chplay"]'); await B.p.waitForTimeout(150);
if (await B.p.locator('#sheetBody [data-cold="1"]').count()) await B.p.click('#sheetBody [data-cold="1"]');
await B.p.waitForSelector('#launch[hidden]', {state: 'attached', timeout: 8000}); await B.p.waitForTimeout(100);
await playAll(B.p, 8);
await B.p.waitForSelector('#feed .summary');
const sumB = await text(B.p, '#feed .summary');
check(sumB.includes('Challenge complete') && sumB.includes('8 of 8') && /You won\. Ana scored 6 in \d+:\d\d\./.test(sumB) && /Ana's time\d+:\d\d/.test(sumB), 'Ben\'s result: 8 of 8, You won, with Ana\'s score and time', R);
await both(B.p, 'chal-won');
check(await until(async () => (await rows('select to_right from public.challenges where id = $1', [c2.id]))[0].to_right === 8), 'and it is saved', R);
await B.p.click('#feed [data-act="tochat"]');
await B.p.waitForSelector('.ch-msg');
check((await B.p.locator('.ch-msg .out').allTextContents()).join('|') === 'Ana won.|You won.', 'Ben\'s chat has both cards, oldest first', R);

// ---------- decline, and the friend's sheet ----------
await chat(A.p);
await A.p.click('.ch-part [data-act="pickch"]'); await A.p.waitForTimeout(100);
await A.p.click('#sheetBody [data-ch="c1"]');
await A.p.waitForSelector('#launch[hidden]', {state: 'attached', timeout: 8000}); await A.p.waitForTimeout(100);
await playAll(A.p, 8);
await A.p.waitForSelector('#feed .summary');
await until(async () => !!(await lastChallenge()).sent_at);
const c3 = await lastChallenge();
await friendsPage(B.p);
await until(async () => (await B.p.locator('.ch-row').count()) === 1, 12000);
await B.p.click('.ch-row [data-act="chdecline"]');
check(await toastSays(B.p, 'Declined. Ana isn’t told.') && await until(async () => (await B.p.locator('.ch-row').count()) === 0), 'Ben declines: Ana isn\'t told, and it leaves Challenges to play', R);
check((await rows('select declined_at from public.challenges where id = $1', [c3.id]))[0].declined_at !== null, 'the database keeps the decline', R);
await chat(A.p);
await until(async () => (await A.p.locator('.ch-msg').count()) === 3);
check((await A.p.locator('.ch-msg .out').last().textContent()) === 'Waiting for Ben to play. 7 days left.', 'to Ana it still waits', R);
await A.p.click('[data-act="frfriend"]'); await A.p.waitForTimeout(120);
check((await text(A.p, '#sheetBody .ch-tally')) === 'Last 90 days: you 1, Ben 1.', 'Ben\'s sheet has the tally', R);
check((await A.p.locator('#sheetBody .ch-results li').allTextContents()).join('|') === 'International economic integration. Ben won, 6 to 8.|International economic integration. You won, 6 to 3.', 'and the results, newest first', R);
check(await A.p.locator('#sheetBody [data-act="pickch"][data-real="1"]').count() === 1 && (await text(A.p, '#sheetBody')).includes('Races with real friends come in a later update.'), 'with Send a challenge, and a line saying races come later', R);
await both(A.p, 'chal-friendsheet');
await A.p.click('#sheetClose'); await A.p.waitForTimeout(80);

// ---------- the limits ----------
// The declined one does not count, so 3 more fill the limit.
for (let i = 0; i < 3; i++) { const s = await call(ua.id, 'start_challenge', {friend: ref, ch: 'c1'}); await call(ua.id, 'finish_challenge', {ref: s.ref, right_n: 4, ms: 60000}); }
await A.p.click('.ch-part [data-act="pickch"], .composer [data-act="pickch"]'); await A.p.waitForTimeout(100);
await A.p.click('#sheetBody [data-ch="c1"]');
check(await toastSays(A.p, 'Ben has 3 of your challenges to play already.') && !(await A.p.locator('#launch:not([hidden])').count()), 'with 3 waiting for Ben, a 4th is refused with a line saying why', R);
if (await A.p.locator('#sheet:not([hidden])').count()) { await A.p.click('#sheetClose'); await A.p.waitForTimeout(80); }

// ---------- an open chat: the cards in among the messages ----------
await call(ua.id, 'ask_to_message', {friend: ref});
await call(ub.id, 'accept_message_request', {friend: ref});
await call(ua.id, 'send_message', {friend: ref, body: 'good game'});
await tab(A.p, 'home'); await chat(A.p);
await A.p.waitForSelector('#msgIn');
const order = await A.p.evaluate(() => [...document.querySelectorAll('.p-body .msg')].map(m => m.classList.contains('ch-msg') ? 'card' : 'text'));
check(order.join() === 'card,card,card,card,card,card,text', 'the cards sit in among the messages by when each was sent: ' + order.join(), R);
check(await A.p.locator('.composer .acts [data-act="pickch"]').count() === 1, 'Send a challenge sits above the message box', R);
await both(A.p, 'chal-chat');

// ---------- 360 px, light and dark ----------
await B.p.setViewportSize({width: 360, height: 740});
await friendsPage(B.p);
let fit = await fits(B.p);
await chat(B.p); fit = fit && await fits(B.p);
await B.p.emulateMedia({colorScheme: 'dark'}); await B.p.waitForTimeout(100);
fit = fit && await fits(B.p);
await B.p.click('[data-act="frfriend"]'); await B.p.waitForTimeout(120); fit = fit && await fits(B.p);
await B.p.emulateMedia({colorScheme: 'light'});
check(fit, 'Friends, the chat and the friend\'s sheet fit at 360 px in light and dark', R);

// ---------- blocking clears them ----------
await call(ub.id, 'block_student', {ref: ref});
check(!(await rows('select 1 from public.challenges')).length, 'blocking deletes every challenge between them', R);
await friendsPage(A.p).catch(() => {});
await tab(A.p, 'home'); await A.p.click('[data-act="page"][data-page="friends"]');
check(await until(async () => (await A.p.locator('.ch-row, .fr-friend').count()) === 0, 12000), 'and Ana\'s Friends page no longer shows Ben or a challenge', R);

// ---------- signing out forgets ----------
await A.p.evaluate(() => localStorage.setItem('stratos2.chal', JSON.stringify({uid: 'x', ref: 'y', mine: true, n: 1, right: 1, ms: 1})));
await tab(A.p, 'you');
await A.p.click('#v-you [data-act="account"]'); await A.p.waitForTimeout(150);
await A.p.click('#sheetBody [data-act="signout"]'); await A.p.waitForTimeout(400);
if (await A.p.locator('[data-act="signoutanyway"]').count()) { await A.p.click('[data-act="signoutanyway"]'); await A.p.waitForTimeout(400); }
check(!(await A.p.evaluate(() => localStorage.getItem('stratos2.chal'))), 'signing out erases a score waiting on the phone', R);

const errs = all.flatMap(d => d.errs);
console.log(R.join('\n'));
console.log('errors: ' + (errs.length ? JSON.stringify(errs) : 'none'));
await Promise.all(all.map(d => d.b.close()));
process.exit(process.exitCode || 0);
