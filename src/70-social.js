/* ---------- friends and messages ----------
   The four friends are samples and their side of every exchange is pretend.
   A message to a sample friend is a card or a preset reply. Real friends type messages (77-messages.js). */
function findMsg(f, id) { return saved.th[f].find(m => m.id === +id) || null; }
function refreshThread(f) { if (pageIs('thread', f)) paintPage('same'); }
/* Something arrived from a friend. Count it as unread unless their thread is open. */
function landed(f, text) {
  if (!pageIs('thread', f)) { saved.unread[f] = (saved.unread[f] || 0) + 1; if (text) toast(text); }
  save();
  if (pageIs('friends')) paintPage('same');
  else if (!pages.length && ui.tab === 'home') renderHome();
  else if (!pages.length && ui.tab === 'you') renderYou();
}
function addMsg(f, m) {
  m.id = saved.mid = (saved.mid || 10) + 1;
  m.t = Date.now();
  saved.th[f].push(m);
  if (saved.th[f].length > 40) saved.th[f].splice(0, saved.th[f].length - 40);
  if (m.from === 'them') landed(f, friend(f).name + ' sent a message'); else save();
  refreshThread(f);
  return m;
}
function reactLater(f, text, ms) { later(ms || 2600, () => addMsg(f, {from: 'them', kind: 'react', text: text})); }
/* The sample friend takes a few seconds to play a challenge you sent. Their score (and maths time) is pretend. */
function friendPlays(f, id) {
  later(5000 + Math.random() * 3000, () => {
    const m = findMsg(f, id); if (!m || m.state !== 'wait') return;
    friendScores(friend(f), m); m.state = 'done';
    landed(f, friend(f).name + ' finished your challenge');
    refreshThread(f);
  });
}
/* Who won a challenge: won or lost on score, wontime or losttime on level scores (maths only, which keeps times), or draw. */
function challengeOutcome(me, them, meMs, themMs) {
  if (me !== them) return me > them ? 'won' : 'lost';
  if (meMs && themMs && meMs !== themMs) return meMs < themMs ? 'wontime' : 'losttime';
  return 'draw';
}
const outcomeWords = (o, n) => ({won: 'You won.', lost: n + ' won.', wontime: 'You won on time.', losttime: n + ' won on time.', draw: 'A draw.'})[o];
/* A finished challenge or race goes into the thread with that friend. A challenge keeps its seed and your time.
   A challenge with a real friend goes to the database instead (78-challenges.js). */
function postResult() {
  const f = P.friend;
  if (P.real) { chSend(); return; }
  if (P.mode === 'challenge') {
    const m = P.msg ? findMsg(f, P.msg) : null, ms = Math.round(P.ms);
    if (m) {
      m.me = P.first; m.state = 'done';
      m.meMs = ms;
      save();
      const o = challengeOutcome(m.me, m.them, m.meMs, m.themMs);
      reactLater(f, o === 'won' || o === 'wontime' ? 'Rematch?' : (o === 'draw' ? 'Good game' : 'Too easy'), 3000);
    } else {
      const nm = {from: 'me', kind: 'challenge', ch: P.ch, me: P.first, them: null, total: P.total, state: 'wait', seed: P.seed, meMs: ms};
      friendPlays(f, addMsg(f, nm).id);
    }
  } else if (P.mode === 'race') {
    const R = P.race, m = P.msg ? findMsg(f, P.msg) : null, data = {me: R.me, them: R.them, left: R.left, state: 'done'};
    if (m) { Object.assign(m, data); save(); } else addMsg(f, Object.assign({from: 'me', kind: 'race', ch: P.ch}, data));
    reactLater(f, R.left ? 'Next time' : (R.me >= R.target ? 'Rematch?' : 'Good game'), 3000);
  }
}

const lastT = f => { const l = saved.th[f.id]; return l.length ? l[l.length - 1].t : 0; };
function preview(f) {
  const l = saved.th[f.id], m = l[l.length - 1], n = f.name;
  if (!m) return 'No messages yet';
  const mine = m.from === 'me';
  if (m.kind === 'react') return (mine ? 'You: ' : '') + m.text;
  if (m.kind === 'result') { const d = fmt(m.km); return (mine ? 'You sent a flight: ' : 'Sent a flight: ') + d.n + ' ' + d.u; }
  if (m.kind === 'challenge') {
    if (m.state === 'open') return 'Challenged you: ' + chOf(m.ch).title;
    if (m.state === 'wait') return n + ' is playing your challenge';
    const o = challengeOutcome(m.me, m.them, m.meMs, m.themMs);
    return 'Challenge: ' + {won: 'you won', lost: n + ' won', wontime: 'you won on time', losttime: n + ' won on time', draw: 'a draw'}[o] + ', ' + m.me + ' to ' + m.them;
  }
  if (m.state === 'open') return 'Wants to race you';
  return 'Race: ' + (m.left ? 'you left' : (m.me > m.them ? 'you won' : n + ' won')) + ', ' + m.me + ' to ' + m.them;
}
function msgHtml(f, m) {
  const fr = friend(f), mine = m.from === 'me', wrap = h => '<div class="msg' + (mine ? ' mine' : '') + '">' + h + '</div>';
  if (m.kind === 'react') return wrap('<div class="bubble">' + esc(m.text) + '</div>');
  if (m.kind === 'result') {
    const d = fmt(m.km);
    return wrap('<div class="mcard"><span class="k">' + (mine ? 'Your flight' : fr.name + '\'s flight') + '</span><span class="bign">' + d.n + ' ' + d.u + '</span>' +
      '<span class="d">' + esc(layerOf(m.km).name) + '. Best combo ×' + m.combo + '. ' + m.first + ' of ' + m.total + ' right first try.</span></div>');
  }
  const title = '<span class="t">' + esc(chOf(m.ch).title) + '</span>', maths = subOf(m.ch) === 'maths';
  if (m.kind === 'challenge') {
    const out = m.state !== 'done' ? '' : outcomeWords(challengeOutcome(m.me, m.them, m.meMs, m.themMs), fr.name);
    /* A third column: each player's time. A challenge from before challenges were timed has none. */
    const time = ms => '<b class="tm">' + (ms ? clockText(ms) : '') + '</b>';
    return wrap('<div class="mcard"><span class="k">' + (maths ? 'Maths challenge, ' : 'Challenge, ') + plural(m.total, 'question') + '</span>' + title +
      '<div class="sc timed"><span>' + fr.name + '</span><b>' + (m.them == null ? 'Playing now' : m.them + ' of ' + m.total) + '</b>' + time(m.them == null ? 0 : m.themMs) +
        '<span>You</span><b>' + (m.me == null ? 'Not played' : m.me + ' of ' + m.total) + '</b>' + time(m.me == null ? 0 : m.meMs) + '</div>' +
      (out ? '<span class="out">' + out + '</span>' : '') +
      (m.state === 'open' ? '<button class="primary" type="button" data-act="play" data-kind="challenge" data-f="' + f + '" data-m="' + m.id + '">Play</button>' : '') + '</div>');
  }
  const kind = '<span class="k">' + (maths ? 'Maths race' : 'Race') + ', first to ' + gameSize(m.ch, 'race') + ' correct</span>';
  if (m.state === 'open') {
    return wrap('<div class="mcard">' + kind + title +
      '<button class="primary" type="button" data-act="play" data-kind="race" data-f="' + f + '" data-m="' + m.id + '">Race now</button></div>');
  }
  return wrap('<div class="mcard">' + kind + title +
    '<div class="sc"><span>You</span><b>' + m.me + '</b><span>' + fr.name + '</span><b>' + m.them + '</b></div>' +
    '<span class="out">' + (m.left ? 'You left the race.' : (m.me > m.them ? 'You won.' : fr.name + ' won.')) + '</span></div>');
}

/* The Friends page. Messages: real friends first (75-friends.js), then the four sample friends, who stay until real
   friends can play races. This week: signed in, you and your real friends (76-week.js); signed out, the sample
   friends. With accounts switched off, the page is as it was before accounts. */
PAGE.friends = () => {
  const seg = '<div class="seg3 wide" role="group" aria-label="Show"><button type="button" data-act="ftab" data-v="msgs" aria-pressed="' + (ui.ftab === 'msgs') + '">Messages</button><button type="button" data-act="ftab" data-v="week" aria-pressed="' + (ui.ftab === 'week') + '">This week</button></div>';
  let body;
  const real = ui.ftab === 'week' && signedIn();
  if (real) body = weekReal();
  else if (ui.ftab === 'week') {
    const rows = FRIENDS.map(f => ({name: f.name, n: f.week})).concat([{name: saved.name || 'You', n: weekCount(), you: true}]).sort((a, b) => b.n - a.n);
    body = '<p class="lb-cap">Correct answers since Monday, all subjects.</p><ol class="lb rows">' + rows.map((r, i) =>
      '<li' + (r.you ? ' class="you-row"' : '') + '><span class="rank">' + (i + 1) + '</span><span class="avatar">' + esc(r.name.charAt(0).toUpperCase()) + '</span><span class="nm">' + esc(r.name) + (r.you && saved.name ? ' (you)' : '') + '</span><span class="sc">' + r.n + '</span></li>').join('') + '</ol>' +
      (ACCOUNTS ? '<p class="fine fr-later">Sample friends only. Sign in to see your real friends here.</p>' +
        '<div class="cta"><button class="ghost" type="button" data-act="signin" data-title="Sign in">Sign in</button></div>' : '');
  } else {
    body = realFriends() + (ACCOUNTS ? '<h3 class="fr-h">Sample friends</h3>' : '') + '<div class="rows">' + FRIENDS.slice().sort((a, b) => lastT(b) - lastT(a)).map(f => {
      const un = saved.unread[f.id] || 0;
      return '<button class="thr' + (un ? ' unread' : '') + '" type="button" data-act="page" data-page="thread" data-f="' + f.id + '"><span class="avatar">' + f.name.charAt(0) + '</span><span><b>' + f.name + '</b><span class="prev">' + esc(preview(f)) + '</span></span>' + (un ? '<i class="dot"></i><span class="sr">' + un + ' new</span>' : '<i></i>') + '</button>';
    }).join('') + (ACCOUNTS ? '' : '<button class="row" type="button" disabled><span class="t">Add a friend</span><span class="val">Needs accounts</span>' + IC.right + '</button>') + '</div>';
  }
  return {title: 'Friends', html: seg + body + '<p class="notice">' + (real ? 'Friends see only your call sign or username and your total. To leave the table, open You, then Account.'
    : ACCOUNTS ? 'These four are sample friends, and their scores are made up. Chats with sample friends use cards and preset replies.'
    : 'These four are sample friends, and their scores are made up. Real friends need accounts, which this test does not have. Messages are cards and preset replies. There is no free typing.') + '</p>'};
};
ACT.ftab = b => { ui.ftab = b.dataset.v; paintPage('same'); const again = $('.seg3 [data-v="' + ui.ftab + '"]', pagesEl); if (again) again.focus({preventScroll: true}); };

PAGE.thread = f => {
  const fr = friend(f), list = saved.th[f];
  if (saved.unread[f]) { delete saved.unread[f]; save(); }
  return {
    title: fr.name, avatar: '<span class="avatar">' + fr.name.charAt(0) + '</span>', cls: 'thread', bottom: true,
    html: '<p class="sys">' + fr.name + ' is a sample friend. Their replies are pretend.</p>' + (list.length ? list.map(m => msgHtml(f, m)).join('') : '<p class="sys">No messages yet. Send a challenge or start a race.</p>'),
    foot: '<footer class="composer"><div class="acts"><button class="ghost" type="button" data-act="pickch" data-kind="challenge" data-f="' + f + '">Send a challenge</button><button class="ghost" type="button" data-act="pickch" data-kind="race" data-f="' + f + '">Start a race</button></div>' +
      '<div class="replies" role="group" aria-label="Quick replies">' + REPLIES.map(r => '<button class="chip" type="button" data-act="reply" data-f="' + f + '" data-text="' + esc(r) + '">' + esc(r) + '</button>').join('') + '</div></footer>'
  };
};
/* Pick the course and chapter for a challenge or a race you are starting. The course starts as the one picked on Home.
   Challenges work in all three courses, races in NSW Economics and Maths. With a real friend (data-real, from
   78-challenges.js), only a chapter with every point learned can be picked, because the challenger plays first. */
const GAME_SUBS = [['eco', 'Economics'], ['maths', 'Maths'], ['edexcel', 'AS Economics']];
ACT.pickch = b => {
  const f = b.dataset.f, kind = b.dataset.kind, real = !!b.dataset.real, n = real ? chFoeName(f) : friend(f).name;
  if (!n) return;
  const subs = GAME_SUBS.filter(o => GAME[o[0]][kind]), sub = b.dataset.sub || (subs.some(o => o[0] === SUB.id) ? SUB.id : 'eco');
  const G = GAME[sub], S = SUBJECTS[sub], again = !!b.closest('#sheet');
  const seg = '<div class="seg3 wide subsw" role="group" aria-label="Course">' + subs.map(o =>
    '<button type="button" data-act="pickch" data-kind="' + kind + '" data-f="' + f + '"' + (real ? ' data-real="1"' : '') + ' data-sub="' + o[0] + '" aria-pressed="' + (sub === o[0]) + '">' + o[1] + '</button>').join('') + '</div>';
  const ready = c => { const s = chStats(c); return s.learned === s.n; };
  const row = c => {
    if (real) {
      return '<button class="pick" type="button" data-act="chstart" data-f="' + f + '" data-ch="' + c.id + '"' + (ready(c) ? '' : ' disabled') + '><span class="t">' + c.n + '. ' + esc(c.title) +
        '<small>' + (ready(c) ? plural(gameSize(c.id, 'challenge'), 'question') : 'Learn every point first') + '</small></span>' + IC.right + '</button>';
    }
    const s = chStats(c), fresh = s.n - s.learned;
    return '<button class="pick" type="button" data-act="startwith" data-kind="' + kind + '" data-f="' + f + '" data-ch="' + c.id + '"><span class="t">' + c.n + '. ' + esc(c.title) + '<small>' + (fresh ? (fresh === s.n ? 'All ' + s.n + ' points are new to you' : fresh + ' of ' + s.n + ' points are new to you') : 'You have learned every point') + '</small></span>' + IC.right + '</button>';
  };
  const size = sub === 'edexcel' ? 'up to ' + G.challenge : G.challenge;
  openSheet(kind === 'race' ? 'Race ' + n : 'Challenge ' + n, (real && isOnline(f) ? '<p class="on-now">' + onlineTag(f) + '</p>' : '') + seg +
    '<p class="sub">' + (kind === 'race' ? 'Pick a chapter. The first to ' + G.race + ' correct answers wins.'
      : real ? 'Pick a chapter you’ve learned. You play first, then ' + esc(n) + ' plays the same questions. ' + esc(n) + ' has 7 days to play.'
      : 'Pick a chapter. You play ' + size + ' questions first, then ' + n + ' plays the same set' + (sub === 'maths' ? ', with the same numbers.' : '.')) + '</p>' +
    (real && !S.ch.some(ready) ? '<p class="fine ch-none">Learn a chapter in this course to challenge with it.</p>' : '') +
    chPicks(row, S) +
    (kind === 'challenge' ? '<p class="fine">More right answers wins. If it’s level, the faster time wins.</p>' : ''));
  /* Tapping the switch redraws the sheet. Focus stays on the switch. */
  if (again) $('#sheetBody .subsw [aria-pressed="true"]').focus({preventScroll: true});
};
ACT.startwith = b => startPractice({mode: b.dataset.kind, ch: b.dataset.ch, friend: b.dataset.f});
/* Play a challenge or race a friend sent. If the chapter has points you have not learned, say so first. */
ACT.play = b => {
  const f = b.dataset.f, m = findMsg(f, b.dataset.m); if (!m || m.state !== 'open') return;
  const s = chStats(chOf(m.ch)), fresh = s.n - s.learned;
  const o = {mode: b.dataset.kind, ch: m.ch, friend: f, msg: m.id, them: m.kind === 'challenge' ? m.them : null, themMs: m.themMs || null, seed: m.seed};
  if (!fresh || b.dataset.cold) { startPractice(o); return; }
  openSheet('Before you play',
    '<p class="sub">' + (fresh === s.n ? 'All ' + s.n + ' points' : fresh + ' of the ' + s.n + ' points') + ' in this chapter are new to you. You can learn them first, or go in cold.</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="learnch" data-ch="' + m.ch + '">Learn the chapter first</button><button class="ghost" type="button" data-act="play" data-cold="1" data-kind="' + b.dataset.kind + '" data-f="' + f + '" data-m="' + m.id + '">Play anyway</button></div>');
};
ACT.reply = b => {
  const f = b.dataset.f, text = b.dataset.text;
  addMsg(f, {from: 'me', kind: 'react', text: text});
  if (text === 'Rematch?') {
    /* The friend takes you up on it and sends a fresh challenge on the subject and chapter of the last game in the thread
       (or the chapter Home shows, if there has been no game yet). A maths one gets a new seed: new numbers, the same for both. */
    const l = saved.th[f], lastGame = l.slice().reverse().find(m => m.ch), ch = lastGame ? lastGame.ch : curCh().id;
    reactLater(f, 'You are on', 1500);
    later(3400, () => {
      const m = {from: 'them', kind: 'challenge', ch: ch, me: null, total: gameSize(ch, 'challenge'), state: 'open'};
      if (subOf(ch) === 'maths') m.seed = MAKE.newSeed();
      friendScores(friend(f), m);
      addMsg(f, m);
    });
  } else if (Math.random() < 0.6) reactLater(f, text === 'Too easy' ? 'Next time' : 'Good game', 2200);
};
ACT.tothread = b => { const f = b.dataset.f; closeRun(); go('home'); ui.ftab = 'msgs'; openPage('friends'); openPage('thread', f); };
/* Send the result of a flight to a friend. */
ACT.sendres = () => {
  if (!P || P.sent) return;
  openSheet('Send to a friend', '<div class="picks">' + FRIENDS.map(f => '<button class="pick" type="button" data-act="sendto" data-f="' + f.id + '"><span class="t">' + f.name + '<small>Sample friend</small></span>' + IC.right + '</button>').join('') + '</div>');
};
ACT.sendto = b => {
  const f = b.dataset.f; if (!P) return;
  const asked = P.items.filter((it, i) => !it.back && P.res[i]).length;
  addMsg(f, {from: 'me', kind: 'result', km: P.alt, combo: P.best, first: P.first, total: asked});
  P.sent = true;
  closeSheet();
  const sb = $('[data-act="sendres"]', feed); if (sb) { sb.textContent = 'Sent to ' + friend(f).name; sb.disabled = true; }
  toast('Sent to ' + friend(f).name);
  reactLater(f, P.first === asked ? 'Too easy' : 'Nice one', 2600);
};

/* ---------- the store ---------- */
const exhaustList = () => Object.keys(EXHAUST).map(k => ({id: k, name: EXHAUST[k].name, price: EXHAUST[k].price, c: EXHAUST[k].c}));
const flameIcon = c => '<svg class="flameic" viewBox="0 0 24 28" aria-hidden="true"><path fill="' + c[0] + '" d="M12 1C13 6 19 9 19 17A7 7 0 0 1 5 17C5 13.5 6.5 11.5 8 10C8 12.5 9 14 10.5 14.5C10 10 9.5 5.5 12 1Z"/><path fill="' + c[2] + '" d="M12 15C12.6 17.2 15 18.4 15 21A3 3 0 0 1 9 21C9 19 10.8 17.8 12 15Z"/></svg>';
const isLocked = it => !!it.price || (!!it.earn && streakNow() < it.earn);
function thumbOf(kind, it) { return kind === 'bg' ? '' : (kind === 'rocket' ? rocketSvg(it.id) : (kind === 'exhaust' ? flameIcon(it.c) : IC.sound)); }
function shelfList(kind) { return kind === 'bg' ? BGS : (kind === 'rocket' ? ROCKETS : (kind === 'exhaust' ? exhaustList() : SOUNDS)); }
PAGE.store = () => {
  const using = {bg: saved.bg, rocket: saved.rocket, exhaust: saved.exhaust, sound: 'ignition'};
  const shelf = (kind, title) => '<h3 class="shelf-h">' + title + '</h3><div class="shelf">' + shelfList(kind).map(it => {
    const locked = isLocked(it), on = using[kind] === it.id;
    return '<button class="tile" type="button" data-act="equip" data-kind="' + kind + '" data-id="' + it.id + '" aria-pressed="' + on + '">' +
      '<span class="thumb' + (kind === 'bg' ? ' ' + it.cls : '') + '">' + thumbOf(kind, it) + '</span>' + (locked ? '<span class="lock">' + IC.lock + '</span>' : '') +
      '<span class="name">' + it.name + '</span><span class="state">' + (on ? 'In use' : (it.price ? it.price : (locked ? it.earn + '-day streak' : 'Owned'))) + '</span></button>';
  }).join('') + '</div>';
  return {title: 'Store', html:
    '<p class="notice">Example prices. Buying is switched off in this test. Every item has a fixed price, and nothing is sold by chance.</p>' +
    shelf('bg', 'Backgrounds') + shelf('rocket', 'Rockets') + shelf('exhaust', 'Exhausts') + shelf('sound', 'Sounds') +
    '<h3 class="shelf-h">Packs</h3><button class="packrow" type="button" data-act="pack"><span><b>' + PACK.name + '</b><span>' + PACK.items + '</span></span><span class="price">' + PACK.price + '</span></button>'};
};
function lockedSheet(kind, it) {
  openSheet(it.name,
    '<div class="preview' + (kind === 'bg' ? ' ' + it.cls : '') + '">' + thumbOf(kind, it) + '</div>' +
    '<p class="sub">' + (it.earn ? 'This one is earned, not bought. It unlocks at a ' + it.earn + '-day streak. Your streak is ' + plural(streakNow(), 'day') + '.' : 'Example price: ' + it.price + '. Buying is switched off in this test, so nothing can be charged.') + '</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="sheetclose">Close</button></div>');
}
ACT.equip = b => {
  const kind = b.dataset.kind, id = b.dataset.id, it = shelfList(kind).find(x => x.id === id);
  if (!it) return;
  if (isLocked(it)) { lockedSheet(kind, it); return; }
  if (kind === 'bg') { save({bg: id}); applyBg(); }
  else if (kind === 'rocket') { save({rocket: id}); if (P) $('#rkSlot').innerHTML = rocketSvg(id); }
  else if (kind === 'exhaust') { save({exhaust: id}); applyLook(); }
  sound.tap();
  paintPage('same');
  const again = $('.tile[data-kind="' + kind + '"][data-id="' + id + '"]', pagesEl); if (again) again.focus({preventScroll: true});
};
ACT.pack = () => openSheet(PACK.name,
  '<div class="preview bg-deep">' + rocketSvg('saucer') + '</div>' +
  '<p class="sub">' + PACK.items + '. Example price: ' + PACK.price + '. Buying is switched off in this test, so nothing can be charged.</p>' +
  '<div class="cta"><button class="primary" type="button" data-act="sheetclose">Close</button></div>');

/* ---------- you: records, settings and the way into friends and the store ---------- */
function renderYou() {
  const rec = records(), best = fmt(rec.km), name = saved.name || '', unread = unreadCount();
  const seg = (act, opts, cur, label) => '<div class="seg3" role="group" aria-labelledby="' + label + '">' + opts.map(o => '<button type="button" data-act="' + act + '" data-v="' + o[0] + '" aria-pressed="' + (cur === o[0]) + '">' + o[1] + '</button>').join('') + '</div>';
  views.you.innerHTML = '<div class="pad you">' +
    '<header class="me"><span class="avatar big">' + esc((name || 'Y').charAt(0).toUpperCase()) + '</span><div class="grow"><h1 class="h1">' + esc(name || 'You') + '</h1><p>' + esc(SUB.topic.course + ', ' + SUB.topic.year) + '</p></div>' +
      '<button class="ghost sm" type="button" data-act="editname">' + (name ? 'Edit' : 'Add a call sign') + '</button></header>' +
    '<dl class="stats four"><div><dt>Day streak</dt><dd>' + streakNow() + '</dd></div><div><dt>Points proven</dt><dd>' + provenCount() + ' of ' + ALL.length + '</dd></div>' +
      '<div><dt>Best altitude</dt><dd>' + best.n + ' ' + best.u + '</dd></div><div><dt>Best combo</dt><dd>×' + rec.combo + '</dd></div></dl>' +
    '<div class="rows">' + acctRow() +
      '<button class="row" type="button" data-act="page" data-page="friends"><span class="t">Friends and messages</span><span class="val">' + (unread ? unread + ' new' : '') + '</span>' + IC.right + '</button>' +
      '<button class="row" type="button" data-act="page" data-page="store"><span class="t">Store</span><span class="val">Rockets, backgrounds, exhausts</span>' + IC.right + '</button>' +
    '</div>' +
    '<section class="sec"><h2 class="h2">Settings</h2>' +
      '<div class="set"><span class="t" id="setTheme">Appearance</span>' + seg('theme', [['system', 'System'], ['light', 'Light'], ['dark', 'Dark']], saved.theme, 'setTheme') + '</div>' +
      '<div class="set"><span class="t" id="setBg">Practice background</span>' + seg('bg', [['plain', 'Plain'], ['sky', 'Sky']], saved.bg, 'setBg') + '</div>' +
      '<div class="set"><span class="t" id="setSound">Sound</span><button class="switch" type="button" data-act="sound" aria-pressed="' + (saved.sound !== false) + '" aria-labelledby="setSound"><span></span></button></div>' +
      '<div class="set"><span class="t" id="setMusic">Race music</span><button class="switch" type="button" data-act="music" aria-pressed="' + (saved.music !== false) + '" aria-labelledby="setMusic"><span></span></button></div>' +
    '</section>' +
    '<button class="textbtn danger" type="button" data-act="reset">Reset this test</button>' +
    '<p class="fine">' + (signedIn() ? 'Reset erases progress, messages and settings on this device, and signs you out. Your account keeps its progress.'
      : 'Reset erases progress, messages and settings on this device. Nothing you do here is sent anywhere' + (ACCOUNTS ? ' unless you sign in.' : '.')) + '</p></div>';
}
const refocus = sel => { const el = $(sel, views.you); if (el) el.focus({preventScroll: true}); };
ACT.theme = b => { save({theme: b.dataset.v}); applyTheme(); applyLook(); renderYou(); refocus('[data-act="theme"][data-v="' + saved.theme + '"]'); };
ACT.bg = b => { save({bg: b.dataset.v}); applyBg(); renderYou(); refocus('[data-act="bg"][data-v="' + saved.bg + '"]'); sound.tap(); };
ACT.sound = () => { save({sound: saved.sound === false}); renderYou(); refocus('[data-act="sound"]'); sound.tap(); };
ACT.music = () => { save({music: saved.music === false}); renderYou(); refocus('[data-act="music"]'); sound.tap(); };
ACT.editname = () => callSign('');
const BANNED_CS = 'That call sign has a word Stratos doesn’t allow. Try another.';
/* The call sign sheet. lead is a line above the box, used just after signing in. err is a message to show at once. */
function callSign(lead, err) {
  openSheet('Call sign', (lead ? '<p class="sub">' + esc(lead) + ' Add a call sign for friends to see, or close this to skip it.</p>' : '') +
    '<label class="field"><span class="sr">Call sign</span><input id="nameIn" type="text" maxlength="16" autocomplete="off" autocapitalize="words" spellcheck="false" placeholder="Shown on results you send"></label>' +
    '<p class="fine err" id="nameErr" role="alert"' + (err ? '' : ' hidden') + '>' + esc(err || '') + '</p>' +
    '<p class="fine">Use a nickname, not your full name.</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="savename">Save</button></div>');
  const i = $('#nameIn'); i.value = saved.name || ''; i.focus();
}
/* Signed in, the account checks the call sign for banned words first (nameAllowed in 85-account.js). */
ACT.savename = async () => {
  const i = $('#nameIn'), b = $('[data-act="savename"]', sheetBody); if (!i) return;
  const name = i.value.trim().slice(0, 16);
  if (b) b.disabled = true;
  const ok = await nameAllowed(name);
  if (b && b.isConnected) b.disabled = false;
  if (!ok) { const e = $('#nameErr'); if (e) { e.textContent = BANNED_CS; e.hidden = false; } return; }
  save({name: name}); closeSheet(); renderYou();
};
sheetBody.addEventListener('keydown', ev => { if (ev.key === 'Enter' && ev.target.id === 'nameIn') { ev.preventDefault(); ACT.savename(); } });
let resetArm = 0;
ACT.reset = b => {
  if (b.dataset.armed !== '1') {
    b.dataset.armed = '1'; b.textContent = 'Tap again to erase everything on this device';
    resetArm = setTimeout(() => { if (b.isConnected) { b.dataset.armed = ''; b.textContent = 'Reset this test'; } }, 3600);
    return;
  }
  clearTimeout(resetArm);
  /* Signed in, Reset signs this device out first. The account keeps its progress. */
  if (signedIn()) acctForget();
  eraseDevice();
  toast('Reset. This device is back to the start.');
};
/* Erase this device's progress, messages and settings, and go back to Home. Reset and Sign out both use it. */
function eraseDevice() {
  epoch++;
  try { localStorage.removeItem(KEY); } catch (e) {}
  saved = {}; tidySaved(); save();
  closeRun(); mathsStop(); L = null; paintSearchFor();
  ui.cur = null; ui.open = null; ui.bar = null; ui.scope = 'mix'; ui.scopeCh = null; ui.len = 8; ui.ftab = 'msgs';
  applyTheme(); applyLook(); applyBg();
  go('home');
}

/* ---------- search: every point, its card and its questions ---------- */
const qIn = $('#q'), qOut = $('#qOut'), qChips = $('#qChips'), qClear = $('#qClear'), searchPad = $('#searchPad');
/* Search looks through the subject picked on Home. Maths points are found by their title, intro, worked example and notes. */
let INDEX = [];
function indexEntry(p) {
  if (p.sub === 'maths') {
    const ex = MAKE.example(p), lines = [p.intro, p.remember].concat(ex.steps.map(s => s.note));
    return {p: p, title: p.title.toLowerCase(), lines: lines, body: lines.join(' ').toLowerCase(), qs: ex.text.toLowerCase()};
  }
  const lines = p.card.map(l => Array.isArray(l) ? l[0] + ': ' + l[1] : l).concat([p.remember]);
  return {p: p, title: p.title.toLowerCase(), lines: lines, body: lines.join(' ').toLowerCase(), qs: [p.a.q, p.b.q, p.a.opts[0], p.b.opts[0]].join(' ').toLowerCase()};
}
/* Words to try in Search, for each subject. A made course (made.js) brings its own, as chips. */
const CHIPS = {eco: ['tariff', 'comparative advantage', 'IMF', 'HDI', 'dumping', 'G20'], maths: ['brackets', 'fraction', 'square root', 'decimal', 'both sides'],
  edexcel: ['opportunity cost', 'PPF', 'normative', 'money', 'invisible hand']};
function paintSearchFor() {
  INDEX = ALL.map(indexEntry);
  qChips.innerHTML = (CHIPS[SUB.id] || SUB.topic.chips || []).map(s => '<button class="chip" type="button" data-act="chipq" data-q="' + s + '">' + s + '</button>').join('');
  qIn.placeholder = 'Search ' + (SUB.topic.short || SUB.topic.name);
  qIn.setAttribute('aria-label', 'Search ' + (SUB.topic.short || SUB.topic.name));
  qIn.value = '';
  runSearch();
}
function marked(text, terms) {
  const re = new RegExp('(' + terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'ig');
  return text.split(re).map((part, i) => i % 2 ? '<mark>' + esc(part) + '</mark>' : esc(part)).join('');
}
function runSearch() {
  const raw = qIn.value.trim(), terms = raw.toLowerCase().split(/\s+/).filter(Boolean), hits = [];
  searchPad.classList.toggle('has-q', !!terms.length);
  qClear.hidden = !raw; qChips.hidden = !!terms.length;
  if (!terms.length) { qOut.innerHTML = ''; return; }
  INDEX.forEach(e => {
    let s = 0;
    for (let i = 0; i < terms.length; i++) {
      const t = terms[i];
      if (e.title.indexOf(t) >= 0) s += 5; else if (e.body.indexOf(t) >= 0) s += 2; else if (e.qs.indexOf(t) >= 0) s += 1; else return;
    }
    hits.push({e: e, s: s});
  });
  hits.sort((a, b) => b.s - a.s);
  if (!hits.length) { qOut.innerHTML = '<p class="nores">Nothing in this topic matches "' + esc(raw) + '".</p>'; return; }
  qOut.innerHTML = '<p class="count-l">' + plural(hits.length, 'point') + '</p><div class="results">' + hits.map(h => {
    const e = h.e, st = statusOf(e.p.id), line = e.lines.find(l => terms.some(t => l.toLowerCase().indexOf(t) >= 0)) || e.lines[0];
    return '<button class="res" type="button" data-act="point" data-p="' + e.p.id + '"><i class="st ' + st + '"></i><span><span class="t">' + esc(e.p.title) + '</span><span class="c">' + esc(chName(chOf(e.p.ch))) + ', ' + STATUS[st].toLowerCase() + '</span><span class="snip">' + marked(line, terms) + '</span></span></button>';
  }).join('') + '</div>';
}
qIn.addEventListener('input', runSearch);
ACT.chipq = b => { qIn.value = b.dataset.q; runSearch(); };
ACT.clearq = () => { qIn.value = ''; runSearch(); qIn.focus(); };
