// Runs Could we improve this? in v2 against the fake Supabase (fake-supabase.mjs), whose database has feedback.sql
// loaded, so these are the real rules.
// It checks: no link with accounts off; the link on a Learn card, and on a question only once it is answered, in Learn,
// Practice, a challenge and a race, and on a maths worked example; what a screen reader is told (the link's name, the
// reasons as radio buttons in a group, the note's label and hint); the sheet by tap (no reason picked, a card line,
// the note and its count, the 300 limit, Send and the toast) and by keyboard alone (focus back on the link after);
// exactly what is sent and stored (no email, name, device or account id signed out; the account id kept signed in,
// and never in the owner's view); offline (kept on the phone, nothing sent, sent once the connection is back, and after
// a reload); a refusal from the database (over the limit) leaving the phone and never sent again; and the sheet and
// the link at 360 px in light, dark and Sky, with no sideways scroll.
// node feedback.mjs shots also saves fb-card, fb-question, fb-sheet and fb-sky, light and dark, at 390 by 844.
import { open, shot, tab as tabOnly, check, pick, toLast, waiting } from './lib.mjs';
import { fakeSupabase } from './fake-supabase.mjs';

const R = [], SHOTS = process.argv[2] === 'shots';
const f = await fakeSupabase();
const all = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const until = async (fn, ms = 6000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await fn()) return true; await wait(100); } return false; };
const device = async (o = {}) => { const d = await open(Object.assign({supabase: f}, o)); all.push(d); return d; };
const text = async (p, sel) => ((await p.locator(sel).first().textContent()) || '').trim();
const rows = async (sql, params) => (await f.admin(sql, params)).rows;
const stored = () => rows('select point, part, reason, note, course, version, signed_in, user_id from public.feedback order by id');
const queue = p => p.evaluate(() => JSON.parse(localStorage.getItem('stratos2.fb') || '[]'));
const sent = () => f.log.filter(l => /rpc\/add_feedback/.test(l));
const fits = p => p.evaluate(() => [...document.querySelectorAll('.panel, .slide')].every(el => el.scrollWidth <= el.clientWidth + 1) && document.documentElement.scrollWidth <= innerWidth);
async function tab(p, t) {
  while (await p.locator('#pages [data-act="back"]').count()) { await p.locator('#pages [data-act="back"]').last().click(); await p.waitForTimeout(80); }
  await tabOnly(p, t);
}
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
// Learn from Home: the first card on screen.
async function learn(p) {
  await tab(p, 'home');
  await p.click('.hero .primary'); await p.waitForTimeout(200);
}
const card = p => p.locator('#learnFeed .slide.card').last();
// Open the sheet from a link, pick a reason (by its words), write a note, and Send.
async function send(p, link, reason, note) {
  await link.click(); await p.waitForTimeout(100);
  await p.locator('.fb-r', {hasText: reason}).click();
  if (note) await p.fill('#fbNote', note);
  await p.click('[data-act="fbsend"]'); await p.waitForTimeout(100);
}
const ARGS = ['app_version', 'course_id', 'note_text', 'point_id', 'which_part', 'why'];
const argsOf = line => Object.keys(JSON.parse(line.slice(line.indexOf('{')))).sort().join();

// ---------- accounts off: nowhere to send it, so no link ----------
{
  const d = await open({accounts: false}); all.push(d);
  const p = d.p;
  await learn(p);
  check(await card(p).count() === 1 && await p.locator('.fbk').count() === 0, 'with accounts off there is no Could we improve this? link', R);
}

// ---------- signed out, by tap ----------
const A = await device();
{
  const p = A.p;
  await learn(p);
  const cl = card(p).locator('.fbk');
  check(await cl.isVisible() && (await cl.evaluate(b => [...b.childNodes].filter(n => !(n.classList && n.classList.contains('sr'))).map(n => n.textContent).join(''))) === 'Could we improve this?', 'a Learn card has the link, Could we improve this?, under Check it', R);
  check(await p.getByRole('button', {name: 'Could we improve this card?'}).count() === 1, 'a screen reader hears what it is about: Could we improve this card?', R);
  const look = await cl.evaluate(b => { const s = getComputedStyle(b), n = b.parentNode.querySelector('.next'); return {size: parseFloat(s.fontSize), ink: s.color, next: getComputedStyle(n).fontSize, below: b.getBoundingClientRect().top >= n.getBoundingClientRect().bottom - 1, tall: b.getBoundingClientRect().height}; });
  check(look.size <= 13 && look.below && look.tall >= 24, 'it is quiet: small, under the button, and still big enough to tap (' + look.tall + ' px)', R);
  if (SHOTS) await shot(p, 'fb-card-light');
  await card(p).locator('.next').click(); await p.waitForTimeout(150);
  const q = waiting(p, '#learnFeed');
  check(await q.locator('.fbk').count() === 1 && !(await q.locator('.fbk').isVisible()), 'a question has no link before it is answered', R);
  const k = await pick(p, '#learnFeed', false);
  const done = p.locator('#learnFeed .slide.q.done').last();
  check(await done.locator('.fbk').isVisible(), 'once answered, the link shows under the question', R);
  check(await p.getByRole('button', {name: 'Could we improve this question?'}).count() === 1, 'and is named Could we improve this question?', R);
  if (SHOTS) await shot(p, 'fb-question-light');

  // The sheet.
  await done.locator('.fbk').click(); await p.waitForTimeout(120);
  check((await text(p, '#sheetTitle')) === 'Could we improve this?' && (await text(p, '#sheetBody .sub')) === 'Question: ' + k.p.title, 'the sheet says which question it is about', R);
  check(await p.locator('#fbPart').count() === 0, 'a question has no Which part?', R);
  const radios = p.getByRole('group', {name: 'What’s the problem?'}).getByRole('radio');
  check((await radios.count()) === 4 && (await p.locator('.fb-r').allTextContents()).join('|') === 'The answer is wrong|The question is unclear|There’s a typo|Something else',
    'four reasons, read out as radio buttons in a group named What’s the problem?', R);
  check(await p.locator('input[name="fbWhy"]:checked').count() === 0, 'none is picked to start with', R);
  const note = p.getByRole('textbox', {name: 'Anything to add? (optional)'});
  check(await note.count() === 1 && /Please don’t include your name or personal details\./.test(await note.evaluate(t => t.getAttribute('aria-describedby').split(' ').map(id => document.getElementById(id).textContent).join(' '))),
    'the note is labelled, and its hint (no name or personal details) is read with it', R);
  check(await fits(p), 'the sheet fits at 390 px with no sideways scroll', R);
  await p.click('[data-act="fbsend"]'); await p.waitForTimeout(80);
  check(await p.locator('#fbErr').isVisible() && (await text(p, '#fbErr')) === 'Choose what the problem is first.' && await p.locator('#sheet:not([hidden])').count() === 1 &&
    await p.evaluate(() => document.activeElement.name === 'fbWhy'), 'Send with no reason says to choose one, and moves to the first reason', R);
  await p.locator('.fb-r', {hasText: 'The answer is wrong'}).click();
  check(await p.locator('#fbErr').isHidden(), 'picking a reason takes the message away', R);
  await note.fill('x'.repeat(350));
  check((await note.inputValue()).length === 300 && (await text(p, '#fbCount')) === '300 of 300', 'the note stops at 300 characters, and says so', R);
  await note.fill('The second option is right too.');
  check((await text(p, '#fbCount')) === '31 of 300', 'the count follows the note', R);
  if (SHOTS) await shot(p, 'fb-sheet-light');
  await p.click('[data-act="fbsend"]'); await p.waitForTimeout(150);
  check(await p.locator('#sheet[hidden]').count() === 1 && (await text(p, '#toast')) === 'Thanks. We’ll take a look.', 'Send closes the sheet with the toast: Thanks. We’ll take a look.', R);
  check(await until(async () => (await stored()).length === 1), 'it reaches the database', R);
  const s = (await stored())[0];
  check(s.point === k.p.id && s.part === 'a' && s.reason === 'wrong' && s.note === 'The second option is right too.' && s.course === 'eco' && /^(\d{4}-\d\d-\d\d\.[0-9a-f]+|dev)$/.test(s.version),
    'stored: the point, question a, the reason, the note, the course and the app version (' + s.version + ')', R);
  check(s.signed_in === false && s.user_id === null, 'signed out, nothing says who sent it', R);
  check(sent().length === 1 && argsOf(sent()[0]) === ARGS.join(), 'the page sends exactly the point, part, reason, note, course and version: ' + argsOf(sent()[0]), R);
  check((await queue(p)).length === 0, 'and nothing is left waiting on the phone', R);

  // A card line, and no note.
  await done.locator('.next').click(); await p.waitForTimeout(150);
  const c2 = card(p);
  await c2.locator('.fbk').click(); await p.waitForTimeout(100);
  const opts = await p.locator('#fbPart option').allTextContents();
  check(opts[0] === 'The whole card' && opts.length >= 3 && /^Line 1: /.test(opts[1]) && opts.every(o => o.length <= 60), 'a card asks Which part?, the whole card or each line in a few words', R);
  await p.selectOption('#fbPart', 'card 2');
  await p.locator('.fb-r', {hasText: 'There’s a typo'}).click();
  await p.click('[data-act="fbsend"]');
  check(await until(async () => (await stored()).length === 2), 'a card\'s feedback is sent too', R);
  const s2 = (await stored())[1];
  check(s2.part === 'card 2' && s2.reason === 'typo' && s2.note === null, 'with the line picked (card 2), and no note', R);
}

// ---------- by keyboard alone ----------
{
  const {p} = await device({w: 1280, h: 800});
  await learn(p);
  await card(p).locator('.next').click(); await p.waitForTimeout(150);
  await p.keyboard.press('a'); await p.waitForTimeout(200);
  const link = p.locator('#learnFeed .slide.q.done .fbk').last();
  await link.focus();
  await p.keyboard.press('Enter'); await p.waitForTimeout(120);
  check(await p.locator('#sheet:not([hidden])').count() === 1 && await p.evaluate(() => document.activeElement.id === 'sheetClose'), 'Enter on the link opens the sheet, with focus on Close', R);
  await p.keyboard.press('Tab');
  check(await p.evaluate(() => document.activeElement.name === 'fbWhy' && document.activeElement.value === 'wrong'), 'Tab reaches the reasons', R);
  await p.keyboard.press('ArrowDown');
  check(await p.evaluate(() => document.activeElement.value === 'unclear' && document.activeElement.checked), 'the arrow keys pick a reason', R);
  await p.keyboard.press('Tab');
  check(await p.evaluate(() => document.activeElement.id === 'fbNote'), 'Tab goes on to the note', R);
  await p.keyboard.type('Two options say the same thing.');
  await p.keyboard.press('Tab');
  check(await p.evaluate(() => document.activeElement.dataset.act === 'fbsend'), 'then to Send', R);
  const before = (await stored()).length;
  await p.keyboard.press('Enter'); await p.waitForTimeout(150);
  check(await p.locator('#sheet[hidden]').count() === 1 && await p.evaluate(() => document.activeElement.classList.contains('fbk')), 'Enter sends, and focus goes back to the link', R);
  check(await until(async () => (await stored()).length === before + 1) && (await stored())[before].reason === 'unclear' && (await stored())[before].note === 'Two options say the same thing.', 'it is sent with the reason and note chosen by keyboard', R);
  // Escape closes the sheet without sending.
  await p.keyboard.press('Enter'); await p.waitForTimeout(100);
  await p.keyboard.press('Escape'); await p.waitForTimeout(100);
  check(await p.locator('#sheet[hidden]').count() === 1 && (await stored()).length === before + 1, 'Escape closes the sheet and sends nothing', R);
}

// ---------- offline: kept on the phone, then sent ----------
{
  const {p, ctx} = await device();
  await learn(p);
  const before = (await stored()).length, calls = sent().length;
  await ctx.setOffline(true);
  await send(p, card(p).locator('.fbk'), 'Something else', 'Offline note');
  check((await text(p, '#toast')) === 'Thanks. We’ll take a look.', 'offline, the student still gets the toast', R);
  await p.waitForTimeout(800);
  const q = await queue(p);
  check(q.length === 1 && q[0].point && q[0].part === 'card' && q[0].why === 'other' && q[0].note === 'Offline note' && (await stored()).length === before && sent().length === calls,
    'offline, it waits on the phone and nothing is sent', R);
  await ctx.setOffline(false);
  check(await until(async () => (await stored()).length === before + 1) && (await stored())[before].note === 'Offline note', 'once the connection is back, it is sent', R);
  check(await until(async () => (await queue(p)).length === 0), 'and leaves the phone', R);

  // Kept through a reload, and sent a moment after the app opens.
  await ctx.setOffline(true);
  await send(p, card(p).locator('.fbk'), 'There’s a typo', '');
  check((await queue(p)).length === 1, 'another waits offline', R);
  await ctx.setOffline(false);
  await p.evaluate(() => { window.dispatchEvent = () => true; });     // the page does not hear the connection come back
  await p.reload(); await p.waitForTimeout(200);
  check(await until(async () => (await stored()).length === before + 2, 8000) && (await queue(p)).length === 0, 'after a reload it is sent a moment after the app opens', R);

  // Over the limit: the database says no, so it leaves the phone and is never sent again.
  await f.admin("insert into public.feedback (point, part, reason, course, version, signed_in) select 'c1p1', 'a', 'other', 'eco', 'dev', false from generate_series(1, 60)");
  const n = (await stored()).length, c = sent().length;
  await learn(p);
  await send(p, card(p).locator('.fbk'), 'Something else', '');
  check(await until(async () => sent().length === c + 1) && await until(async () => (await queue(p)).length === 0) && (await stored()).length === n, 'over the signed-out limit, nothing is saved and it leaves the phone', R);
  await p.evaluate(() => window.dispatchEvent(new Event('online'))); await p.waitForTimeout(600);
  check(sent().length === c + 1, 'and it is never sent again', R);
  await f.admin('delete from public.feedback where note is null and user_id is null and point = $1', ['c1p1']);
}

// ---------- signed in: the account id is kept for the limit, and shown nowhere ----------
{
  const {p} = await device();
  const uid = (await f.user('fb.ana@example.com')).id;
  await f.as(uid, "insert into public.profiles (id, call_sign) values ($1, 'Ana') on conflict (id) do update set call_sign = 'Ana'", [uid]);
  await signIn(p, 'fb.ana@example.com');
  await learn(p);
  const before = (await stored()).length;
  await send(p, card(p).locator('.fbk'), 'The question is unclear', 'Signed in');
  check(await until(async () => (await stored()).length === before + 1), 'signed in, it is sent', R);
  const s = (await stored())[before];
  check(s.signed_in === true && s.user_id === uid, 'with the account id, for the limit', R);
  const view = await rows('select * from moderation.feedback_by_point');
  check(!JSON.stringify(view).includes(uid) && !Object.keys(view[0]).includes('user_id'), 'the owner\'s view never has the account id', R);
  // The same point, part and reason again today: the database answers already, and it leaves the phone.
  await send(p, card(p).locator('.fbk'), 'The question is unclear', 'Again');
  await p.waitForTimeout(1200);
  check((await stored()).length === before + 1 && (await queue(p)).length === 0, 'the same point, part and reason twice in a day is kept once', R);
}

// ---------- Practice, a challenge and a race ----------
{
  const {p} = await device({clock: false});
  await learn(p);
  for (let i = 0; i < 3; i++) {
    await card(p).locator('.next').click(); await p.waitForTimeout(120);
    await pick(p, '#learnFeed', true); await p.waitForTimeout(80);
    await toLast(p, '#learnFeed');
  }
  await tab(p, 'practice');
  await p.click('[data-act="start"]'); await p.waitForTimeout(1600);
  const fq = waiting(p, '#feed');
  check(await fq.locator('.fbk').count() === 1 && !(await fq.locator('.fbk').isVisible()), 'in Practice, no link before the question is answered', R);
  const k = await pick(p, '#feed', false);
  const done = p.locator('#feed .slide.q.done').last();
  check(await done.locator('.fbk').isVisible(), 'and the link once it is answered', R);
  const before = (await stored()).length;
  await send(p, done.locator('.fbk'), 'The answer is wrong', '');
  check(await until(async () => (await stored()).length === before + 1) && (await stored())[before].point === k.p.id && (await stored())[before].part === k.k, 'a Practice question\'s feedback names the point and question ' + k.k, R);
  await tab(p, 'home');
  // A challenge and a race with the sample friends.
  for (const [who, what] of [['mia', 'challenge'], ['aisha', 'race']]) {
    await tab(p, 'home');
    await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(120);
    await p.click('.thr[data-f="' + who + '"]'); await p.waitForTimeout(120);
    await p.click('.mcard [data-act="play"]'); await p.waitForTimeout(150);
    if (await p.locator('#sheetBody [data-act="play"]').count()) { await p.click('#sheetBody [data-act="play"]'); await p.waitForTimeout(100); }
    await until(async () => await p.locator('#launch[hidden]').count() === 1, 6000);
    await pick(p, '#feed', true);
    check(await p.locator('#feed .slide.q.done').last().locator('.fbk').isVisible(), 'in a ' + what + ', the link shows once a question is answered', R);
    await tab(p, 'home');
  }
}

// ---------- maths: the worked example ----------
{
  const {p} = await device();
  await p.locator('.subject').click(); await p.waitForTimeout(100);
  if (await p.locator('#placeIn').count()) {
    await p.locator('[data-act="placenext"]').click(); await p.waitForTimeout(80);
    if (await p.locator('[data-act="placedone"]').count()) { await p.locator('[data-act="placedone"]').click(); await p.waitForTimeout(80); }
  }
  await p.locator('.pick[data-sub="maths"]').click(); await p.waitForTimeout(200);
  await learn(p);
  const wex = p.locator('#learnFeed .slide.wex').first();
  check(await wex.locator('.fbk').isVisible() && await p.getByRole('button', {name: 'Could we improve this worked example?'}).count() === 1, 'a maths worked example has the link', R);
  await wex.locator('.fbk').click(); await p.waitForTimeout(100);
  check((await text(p, '#sheetBody .sub')).startsWith('Worked example: ') && await p.locator('#fbPart').count() === 0, 'its sheet says Worked example, with no Which part?', R);
  const before = (await stored()).length;
  await p.locator('.fb-r', {hasText: 'There’s a typo'}).click();
  await p.click('[data-act="fbsend"]');
  check(await until(async () => (await stored()).length === before + 1) && (await stored())[before].part === 'example' && (await stored())[before].course === 'maths', 'sent as the example part, in the maths course', R);
}

// ---------- 360 px, light, dark and Sky ----------
for (const scheme of ['light', 'dark']) {
  const {p} = await device({w: 360, h: 760, scheme});
  await learn(p);
  const l = card(p).locator('.fbk');
  const box = await l.boundingBox();
  check(box && box.x >= 0 && box.x + box.width <= 360 && await fits(p), 'at 360 px in ' + scheme + ', the link fits on the card', R);
  const ink = await l.evaluate(b => [getComputedStyle(b).color, getComputedStyle(document.body).backgroundColor]);
  check(ink[0] !== ink[1], 'and can be seen (' + ink[0] + ' on ' + ink[1] + ')', R);
  await l.click(); await p.waitForTimeout(150);
  const panel = await p.locator('#sheet .panel').boundingBox();
  check(await fits(p) && panel.width <= 360, 'the sheet fits at 360 px in ' + scheme + ', with no sideways scroll', R);
  const send_ = await p.locator('[data-act="fbsend"]').boundingBox();
  check(send_.x >= 0 && send_.x + send_.width <= 360, 'and Send is on screen', R);
  if (SHOTS) {
    await p.setViewportSize({width: 390, height: 844}); await p.waitForTimeout(100);
    await shot(p, 'fb-sheet-' + scheme);
    await p.click('#sheetClose'); await p.waitForTimeout(100);
    await shot(p, 'fb-card-' + scheme);
  }
}
{
  // Sky: the link on a Practice question over the sky keeps its contrast.
  const seed = {ans: {c1p1a: {ok: true, n: 1, t: Date.now() - 9e5}, c1p2a: {ok: true, n: 1, t: Date.now() - 8e5}, c1p3a: {ok: true, n: 1, t: Date.now() - 7e5}}, bg: 'sky'};
  const {p} = await device({w: 360, h: 760, seed});
  await tab(p, 'practice');
  await p.click('[data-act="start"]'); await p.waitForTimeout(1600);
  await pick(p, '#feed', false);
  const l = p.locator('#feed .slide.q.done .fbk').last();
  const c = await l.evaluate(b => getComputedStyle(b).color);
  check(await l.isVisible() && /255, 255, 255/.test(c) && await fits(p), 'on Sky the link is in the light ink, and fits at 360 px', R);
  if (SHOTS) { await p.setViewportSize({width: 390, height: 844}); await p.waitForTimeout(100); await shot(p, 'fb-sky'); }
  await l.click(); await p.waitForTimeout(120);
  check(await fits(p) && await p.locator('#sheet:not([hidden])').count() === 1, 'and its sheet opens over the flight and fits', R);
}

const errs = all.flatMap(d => d.errs);
for (const d of all) await d.b.close();
console.log(R.join('\n'));
if (errs.length) { console.log('ERRORS after feedback.mjs:', errs); process.exitCode = 1; }
