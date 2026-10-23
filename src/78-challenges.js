/* ---------- challenges with real friends ----------
   Only while accounts are on and the student is signed in. Everything goes through the functions in
   supabase/challenges.sql, which check who is asking and keep every limit. Signed out, the sample friends' challenges
   work as before (70-social.js).
   How one goes: the challenger picks a chapter they have learned, start_challenge picks a seed, and they play. The
   questions come from the seed alone, so the friend gets the same ones. finish_challenge saves the score and time,
   and only then does the friend see it. The friend taps Play (play_challenge hands over the seed, once), plays, and
   both see who won: more right answers, then the faster time.
   The list of challenges comes with the friends list (frLoad in 75-friends.js), and every 10 seconds while a chat is
   on screen. It is never kept on this device. A score not saved yet is, under stratos2.chal, so a flight cut off by
   a reload or a lost connection is still sent. */
let chl = null;                       /* the last answer from challenges_state, with uid (whose it is) */
let chBusy = false;
const CH_KEY = 'stratos2.chal';
const chMine = () => signedIn() && chl && chl.uid === st.uid ? chl : null;
const chList = () => { const c = chMine(); return c ? c.challenges : []; };
const chFind = ref => chList().find(c => c.ref === ref) || null;
/* Every challenge with one friend, by the friendship's ref. */
const chFor = ref => chList().filter(c => c.friend === ref);
const chFoeName = ref => { const f = frFind('friends', ref); return f ? frShown(f) : ''; };
function chForget() { chl = null; try { localStorage.removeItem(CH_KEY); } catch (e) {} }
async function chLoadList() {
  const c = await frCall('challenges_state');
  chl = Object.assign(c, {uid: st.uid});
}
/* For the dot on Home and Friends: challenges waiting for this student to play, and results they haven't opened. */
const chUnread = () => chList().filter(c => c.state === 'open' || c.new).length;

/* ---------- saving a score ---------- */
function chPending() { try { const p = JSON.parse(localStorage.getItem(CH_KEY) || 'null'); return p && p.ref ? p : null; } catch (e) { return null; } }
/* The score so far in a real challenge, kept on this phone after each answer (and at the start). mine: this student
   sent the challenge. n: how many questions are answered. */
function chKeep() {
  if (!P || !P.real || !P.cref) return;
  try { localStorage.setItem(CH_KEY, JSON.stringify({uid: st.uid, ref: P.cref, mine: P.them == null, n: P.res.length, right: P.first, ms: Math.round(P.ms)})); } catch (e) {}
}
/* Send a score waiting on this phone. A challenge still being played waits until it ends. A challenger who left before
   answering anything never sends it: it goes from the database after 2 hours. A friend who started it gets the score
   they had, and the questions not answered count as wrong. Answers what the database said, or null with no connection. */
async function chFlush(fromLoad) {
  const p = chPending();
  if (!p || chBusy || !st.uid || p.uid !== st.uid) return null;
  if (P && P.real && P.cref === p.ref && !P.done) return null;
  const drop = () => { const q = chPending(); if (q && q.ref === p.ref) try { localStorage.removeItem(CH_KEY); } catch (e) {} };
  if (p.mine && !p.n) { drop(); return {result: 'dropped'}; }
  chBusy = true;
  let r = null;
  try { r = await frCall('finish_challenge', {ref: p.ref, right_n: p.right, ms: p.ms}); } catch (e) { r = null; }
  chBusy = false;
  if (r) { drop(); if (!fromLoad) frLoad(); }
  return r;
}
window.addEventListener('online', () => { if (st.uid && chPending()) frLoad(); });

/* The end of a real challenge (postResult in 70-social.js). The result slide is up already. If the database moved the
   time (never faster than a set time per question, never slower than the time it measured), the verdict follows it. */
async function chSend() {
  const p = P;
  chKeep();
  const r = await chFlush();
  const verdict = text => { if (P === p) { const v = $('.summary .verdict', feed); if (v) v.textContent = text; } };
  if (!r) { verdict('Saved on this phone. It sends when you’re back online.'); return; }
  if (r.result === 'ok') {
    if (r.ms !== Math.round(p.ms) && P === p) {
      p.ms = r.ms;
      const t = $('.summary .myT', feed); if (t) t.textContent = clockText(r.ms);
      fClock.textContent = clockText(r.ms);
      if (p.them != null) verdict(mpChallengeLine({name: p.foe}));
    }
    return;
  }
  verdict(r.result === 'late' ? 'This challenge ran out of time, so it wasn’t saved.' : 'This challenge is no longer there.');
}

/* ---------- starting, playing and declining ---------- */
const startWords = n => ({day: 'You’ve sent 20 challenges today. Try again tomorrow.', friend_full: n + ' has 3 of your challenges to play already.',
  their_full: n + ' has a lot of challenges waiting. Try again later.', chapter: 'That chapter can’t be used for a challenge yet.',
  gone: 'You’re no longer friends, so you can’t challenge them.'});
/* A chapter picked on the challenge sheet (ACT.pickch in 70-social.js). The database picks the seed. */
ACT.chstart = async b => {
  const ref = b.dataset.f, ch = b.dataset.ch, n = chFoeName(ref);
  if (!n) return;
  if (!navigator.onLine) { toast('You need a connection to start a challenge.'); return; }
  b.disabled = true;
  let r;
  try { r = await frCall('start_challenge', {friend: ref, ch: ch}); }
  catch (e) { toast(navigator.onLine ? frWhy(e) : 'You need a connection to start a challenge.'); if (b.isConnected) b.disabled = false; return; }
  if (r.result !== 'ok') { toast(startWords(n)[r.result] || 'Something went wrong. Try again in a moment.'); if (b.isConnected) b.disabled = false; if (r.result === 'gone') frLoad(); return; }
  startPractice({mode: 'challenge', ch: ch, friend: ref, real: true, cref: r.ref, seed: r.seed, foe: n});
  chKeep();
};
/* Play a challenge a friend sent. If the chapter has points you haven't learned, say so first. */
ACT.chplay = async b => {
  const c = chFind(b.dataset.ref); if (!c || c.state !== 'open') return;
  const ch = chOf(c.ch), n = chFoeName(c.friend);
  if (!ch) { toast('This challenge is on a chapter this version of Stratos doesn’t have.'); return; }
  const s = chStats(ch), fresh = s.n - s.learned;
  if (fresh && !b.dataset.cold) {
    openSheet('Before you play',
      '<p class="sub">' + (fresh === s.n ? 'All ' + s.n + ' points' : fresh + ' of the ' + s.n + ' points') + ' in this chapter are new to you. You can learn them first, or go in cold.</p>' +
      '<div class="cta"><button class="primary" type="button" data-act="learnch" data-ch="' + ch.id + '">Learn the chapter first</button><button class="ghost" type="button" data-act="chplay" data-cold="1" data-ref="' + c.ref + '">Play anyway</button></div>' +
      '<p class="fine">Once you start, you can’t play it again. You have 2 hours to finish.</p>');
    return;
  }
  if (!navigator.onLine) { toast('You need a connection to play a challenge.'); return; }
  b.disabled = true;
  let r;
  try { r = await frCall('play_challenge', {ref: c.ref}); }
  catch (e) { toast(navigator.onLine ? frWhy(e) : 'You need a connection to play a challenge.'); if (b.isConnected) b.disabled = false; return; }
  if (r.result !== 'ok') {
    toast({started: 'You’ve played this challenge already.', expired: 'This challenge ran out. Challenges last 7 days.'}[r.result] || 'This challenge is no longer there.');
    closeSheet(); frLoad(); return;
  }
  c.state = 'playing';
  startPractice({mode: 'challenge', ch: c.ch, friend: c.friend, real: true, cref: c.ref, seed: r.seed, foe: n, them: c.them.right, themMs: c.them.ms});
  chKeep();
};
/* Decline is silent: to the friend, it waits until the 7 days are up. */
ACT.chdecline = async b => {
  const c = chFind(b.dataset.ref); if (!c) return;
  const n = chFoeName(c.friend);
  b.disabled = true;
  try {
    const r = await frCall('decline_challenge', {ref: c.ref});
    if (r === 'ok') { c.state = 'declined'; frRepaint(); toast('Declined. ' + n + ' isn’t told.'); }
    else toast('This challenge is no longer there.');
  } catch (e) { toast(frWhy(e)); if (b.isConnected) b.disabled = false; }
  frLoad();
};
ACT.tochat = b => { const f = b.dataset.f; closeRun(); go('home'); ui.ftab = 'msgs'; openPage('friends'); if (frFind('friends', f)) openPage('chat', f); };
/* Opening a chat counts the results in it as seen, so the dot goes. */
function chSeen(ref) {
  const fresh = chFor(ref).filter(c => c.new);
  if (!fresh.length) return;
  fresh.forEach(c => { c.new = false; });
  frRepaint();
  frCall('seen_challenges', {friend: ref}).catch(() => {});
}
/* While a chat is on screen, its challenges are fetched every 10 seconds (the chat's messages every 5). */
setInterval(async () => {
  if (!pageIs('chat') || document.hidden || !navigator.onLine || !st.uid) return;
  const before = JSON.stringify(chl);
  try { await chLoadList(); } catch (e) { return; }
  if (JSON.stringify(chl) !== before) frRepaint();
}, 10000);

/* ---------- what the student sees ---------- */
const chScore = (c, side) => side ? (side.quit ? 'Didn’t finish' : side.right + ' of ' + c.total) : null;
const chOutcome = c => challengeOutcome(c.me.right, c.them.right, c.me.ms, c.them.ms);
function chDaysLeft(c) { const d = Math.ceil((new Date(c.ends).getTime() - Date.now()) / 864e5); return d >= 1 ? plural(d, 'day') + ' left' : 'Less than a day left'; }
/* A result in a few words: "you won, 5 to 3". n is the friend's name. */
const chShort = (c, n) => ({won: 'you won', lost: n + ' won', wontime: 'you won on time', losttime: n + ' won on time', draw: 'a draw'})[chOutcome(c)] + ', ' + c.me.right + ' to ' + c.them.right;
/* Where a chapter is: "Maths, Year 11. Chapter 1." */
const chWhere = ch => { const course = COURSE_LIST.find(x => x.id === ch.sub); return (course ? course.name + '. ' : '') + chName(ch) + '.'; };
/* A challenge as a card in the chat, the same for both students: each one's score and time, and where it stands. */
function chCard(c) {
  const ch = chOf(c.ch), n = esc(chFoeName(c.friend) || 'Your friend'), maths = !!ch && ch.sub === 'maths';
  const cell = (who, side, none) => '<span>' + who + '</span><b>' + (chScore(c, side) || none) + '</b><b class="tm">' + (side && side.ms ? clockText(side.ms) : '') + '</b>';
  const them = cell(n, c.them, c.state === 'playing' && c.mine ? 'Playing now' : 'Not played'), me = cell('You', c.me, c.state === 'playing' ? 'Started' : 'Not played');
  const out = c.state === 'done' ? outcomeWords(chOutcome(c), n)
    : c.state === 'waiting' ? 'Waiting for ' + n + ' to play. ' + chDaysLeft(c) + '.'
    : c.state === 'playing' ? (c.mine ? n + ' is playing it now.' : 'You started this challenge.')
    : c.state === 'open' ? chDaysLeft(c) + ' to play.'
    : c.state === 'declined' ? 'You declined it.' : 'Not played in time.';
  return '<div class="msg ch-msg' + (c.mine ? ' mine' : '') + '" data-ch="' + c.ref + '"><div class="mcard"><span class="k">' + (maths ? 'Maths challenge, ' : 'Challenge, ') + plural(c.total, 'question') + '</span>' +
    '<span class="t">' + (ch ? esc(ch.title) : 'A chapter this version doesn’t have') + '</span>' + (ch ? '<span class="d">' + esc(chWhere(ch)) + '</span>' : '') +
    '<div class="sc timed">' + them + me + '</div><span class="out">' + out + '</span>' +
    (c.state === 'open' ? '<div class="ch-acts"><button class="primary" type="button" data-act="chplay" data-ref="' + c.ref + '">Play</button><button class="ghost" type="button" data-act="chdecline" data-ref="' + c.ref + '">Decline</button></div>' : '') +
    '</div></div>';
}
/* The Send a challenge button, in a chat and on a friend's sheet. */
const chButton = ref => '<button class="ghost" type="button" data-act="pickch" data-kind="challenge" data-real="1" data-f="' + ref + '">Send a challenge</button>';
/* The challenges part of a chat that is not open for messages yet (no message request accepted). */
function chChatPart(ref) {
  const list = chFor(ref).slice().sort((x, y) => new Date(x.at) - new Date(y.at));
  return '<div class="ch-part">' + (list.length ? '<h3 class="fr-h">Challenges</h3>' + list.map(chCard).join('') : '') +
    '<div class="cta">' + chButton(ref) + '</div><p class="fine">Challenges work without a message request. They have no messages in them, only the chapter and the scores.</p></div>';
}
/* What a friend's row on Friends says about challenges, if anything: one waiting to be played, or a new result. */
function chRowLine(ref, n) {
  const l = chFor(ref), open = l.find(c => c.state === 'open'), fresh = l.find(c => c.new);
  if (open) { const ch = chOf(open.ch); return {text: 'Challenged you: ' + (ch ? ch.title : 'a chapter'), dot: true}; }
  if (fresh) return {text: 'Challenge: ' + chShort(fresh, n), dot: true};
  return null;
}
/* Challenges to play, at the top of Friends. */
function chToPlay() {
  const l = chList().filter(c => c.state === 'open');
  if (!l.length) return '';
  return '<h3 class="fr-h">Challenges to play</h3><div class="rows">' + l.map(c => {
    const f = frFind('friends', c.friend), ch = chOf(c.ch); if (!f) return '';
    return '<div class="fr-row ch-row"><span class="avatar">' + frInitial(f) + '</span><span class="fr-who"><b>' + esc(frShown(f)) + '</b><span>' +
      esc((ch ? ch.title : 'A chapter') + '. Beat ' + c.them.right + ' of ' + c.total + (c.them.ms ? ' in ' + clockText(c.them.ms) : '') + '.') + '</span></span>' +
      '<span class="fr-acts"><button class="primary sm" type="button" data-act="chplay" data-ref="' + c.ref + '">Play</button><button class="ghost sm" type="button" data-act="chdecline" data-ref="' + c.ref + '">Decline</button></span></div>';
  }).join('') + '</div>';
}
/* Results with one friend, for their sheet: the tally over the last 90 days and the last 10. */
function chResults(ref, name) {
  const done = chFor(ref).filter(c => c.state === 'done'), n = esc(name);
  if (!done.length) return '<h3 class="fr-h">Challenges</h3><p class="fine ch-none">No challenges finished yet.</p>';
  const count = o => done.filter(c => { const x = chOutcome(c); return o === 'won' ? x === 'won' || x === 'wontime' : o === 'lost' ? x === 'lost' || x === 'losttime' : x === 'draw'; }).length;
  const draws = count('draw');
  return '<h3 class="fr-h">Challenges</h3><p class="sub ch-tally">Last 90 days: you ' + count('won') + ', ' + n + ' ' + count('lost') + (draws ? ', ' + plural(draws, 'draw') : '') + '.</p>' +
    '<ul class="ch-results">' + done.slice(0, 10).map(c => {
      const ch = chOf(c.ch), s = chShort(c, n);
      return '<li>' + esc(ch ? ch.title : 'A chapter') + '. ' + s.charAt(0).toUpperCase() + s.slice(1) + '.</li>';
    }).join('') + '</ul>';
}
