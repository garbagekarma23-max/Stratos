/* ---------- real friends: usernames, search, codes, requests, the list, remove, block and unblock ----------
   Only while accounts are on and the student is signed in. Everything goes through the functions in
   supabase/friends.sql, which check who is asking and keep every limit, so nothing here has to be trusted.
   The app never gets another student's account id or email: each friend, request, search result and block comes as a
   ref (a random id for that row), a call sign and a username, and a search result as a username and a number of
   mutual friends. The last list loaded is kept on this device (stratos2.friends), so the page opens straight away and
   works offline. It is not progress, so it never goes to the account, and signing out erases it. */
const FR_KEY = 'stratos2.friends';
let fr = readFr();                   /* the last answer from friends_state, with uid (whose it is) and at (when) */
let frBusy = false, frAgain = false, frAsked = 0, frOffline = false;
let addHow = 'name', lastFound = [];
function readFr() { try { const s = JSON.parse(localStorage.getItem(FR_KEY) || 'null'); return s && s.me ? s : null; } catch (e) { return null; } }
function saveFr() { try { if (fr) localStorage.setItem(FR_KEY, JSON.stringify(fr)); } catch (e) {} }
function frForget() { fr = null; lastFound = []; frOffline = false; liveForget(); msForget(); chForget(); try { localStorage.removeItem(FR_KEY); } catch (e) {} }
/* The list, if it belongs to the account signed in now. */
const frMine = () => signedIn() && fr && fr.uid === st.uid ? fr : null;
/* Requests waiting for this student, for the dot on Home's friends button. */
function frRequests() { const d = frMine(); return d ? d.incoming.length : 0; }
/* What a student is called on screen: their call sign, or their username if they have none. */
const frShown = x => x.name || (x.username ? '@' + x.username : 'A student');
const frInitial = x => esc((x.name || x.username || '?').charAt(0).toUpperCase());
const codeText = c => c ? c.slice(0, 4) + ' ' + c.slice(4) : '';
const dayText = (t, long) => new Date(t).toLocaleDateString('en-AU', {day: 'numeric', month: long ? 'long' : 'short'});
const mutualText = n => !n ? 'No mutual friends' : n === 1 ? '1 mutual friend' : n + ' mutual friends';

/* Call one of the functions in friends.sql. Waits for the sign-in to be ready, so a call just after opening works. */
async function frCall(fn, args) {
  await loadSupabase();
  if (!acctUser) await sb.auth.getSession();
  if (!acctUser || acctUser.id !== st.uid) throw {status: 0, message: 'not signed in yet'};
  const r = await sb.rpc(fn, args || {});
  if (r.error) throw r.error;
  return r.data;
}
const frWhy = e => why(e, 'Something went wrong. Try again in a moment.');

/* Fetch the list. Called when Friends opens, every 10 seconds while it is open and on screen, when the app comes back
   on screen, after signing in and after every change. Only redraws if something changed. The chats (77-messages.js)
   and the challenges (78-challenges.js) come with it, and a challenge score waiting on this phone is sent first. */
async function frLoad() {
  if (!ACCOUNTS || !st.uid) return;
  if (frBusy) { frAgain = true; return; }
  frBusy = true; frAsked = Date.now();
  const now = () => (fr ? JSON.stringify(Object.assign({}, fr, {at: 0})) : '') + JSON.stringify(chs) + JSON.stringify(chl), before = now(), wasOff = frOffline;
  try {
    if (chPending()) await chFlush(true);
    const d = await frCall('friends_state');
    fr = Object.assign(d, {uid: st.uid, at: Date.now()});
    frOffline = false;
    saveFr();
    /* The chats come with the list. If they cannot be fetched, the friends list still shows. */
    try { await msLoadList(); } catch (e) {}
    try { await chLoadList(); } catch (e) {}
  } catch (e) { frOffline = true; }
  /* Who is online (79-live.js) has its own timer. The first list loaded fetches it straight away. */
  if (!frOffline && !onMine()) await onCheck();
  frBusy = false;
  if (before !== now() || wasOff !== frOffline) frRepaint();
  if (frAgain) { frAgain = false; frLoad(); }
}
setInterval(() => { if (pageIs('friends') && !document.hidden && navigator.onLine && st.uid) frLoad(); }, 10000);
document.addEventListener('visibilitychange', () => { if (!document.hidden && st.uid && navigator.onLine) frLoad(); });

/* Redraw whatever shows friends: the Friends page (keeping what is typed in the username box), a chat (which closes
   if the friend is gone), the account sheet's username part, and the dot on Home and You. */
function frRepaint() {
  if (pageIs('chat') && frMine() && !frFind('friends', topPage().arg)) closePage();
  else if (pageIs('chat')) chatRepaint();
  if (pageIs('friends')) {
    const i = $('.unameIn', pagesEl), v = i ? i.value : null, focused = i && document.activeElement === i;
    paintPage('same');
    const j = $('.unameIn', pagesEl);
    if (j && v !== null) { j.value = v; if (focused) j.focus({preventScroll: true}); }
  }
  const af = $('#acctFr'); if (af) af.innerHTML = acctFrHtml();
  if (!pages.length && ui.tab === 'home') renderHome();
  else if (!pages.length && ui.tab === 'you') renderYou();
  msWarnCheck();
}

/* ---------- the Friends page ---------- */
/* The real friends part of the Messages tab. Signed out, it says friends need an account. Signed in with no username
   yet, it asks for one first. Otherwise: requests, friends, the two ways to add a friend, requests sent and blocked. */
function realFriends() {
  if (!ACCOUNTS) return '';
  if (!signedIn()) {
    return '<section class="fr-out"><h3 class="h2">Friends need an account</h3>' +
      '<p class="fine">Find friends by username, or add them with a code you share in person. Friends see only your call sign and username, never your email or progress.</p>' +
      '<div class="cta"><button class="primary" type="button" data-act="signin" data-title="Sign in">Sign in</button></div></section>';
  }
  if (Date.now() - frAsked > 3000) setTimeout(frLoad, 0);
  setTimeout(msWarnCheck, 0);
  const d = frMine();
  if (!d) return '<p class="fine fr-wait">' + (frOffline ? 'No connection. Your friends will show once you are online.' : 'Loading your friends.') + '</p>';
  if (!d.me.username) return unameForm(false);
  let h = frOffline ? '<p class="fine fr-off">Offline. This list is from ' + new Date(d.at).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) + '.</p>' : '';
  /* Requests waiting for this student. The heading says what they are, so each row has room for both buttons. */
  if (d.incoming.length) {
    h += '<h3 class="fr-h">Requests</h3><div class="rows">' + d.incoming.map(r =>
      '<div class="fr-row"><span class="avatar">' + frInitial(r) + '</span><span class="fr-who"><b>' + esc(frShown(r)) + '</b>' + (r.name && r.username ? '<span>@' + esc(r.username) + '</span>' : '') + '</span>' +
      '<span class="fr-acts"><button class="primary sm" type="button" data-act="fraccept" data-ref="' + r.ref + '">Accept</button><button class="ghost sm" type="button" data-act="frdecline" data-ref="' + r.ref + '">Decline</button></span></div>').join('') + '</div>';
  }
  /* Challenges waiting for this student to play (78-challenges.js). */
  h += chToPlay();
  /* Each friend opens their chat, and has a Challenge button. The line under the name says where the chat stands, or
     a challenge to play or a new result first. A dot shows unread messages, a message request or a challenge. */
  h += '<h3 class="fr-h">Your friends</h3>' + (d.friends.length ? '<div class="rows">' + d.friends.slice().sort((x, y) => frShown(x).localeCompare(frShown(y))).map(f => {
      const c = msChat(f.ref), g = chRowLine(f.ref, frShown(f)), dot = c.state === 'asked' || (c.state === 'open' && c.unread > 0) || !!g;
      const line = g ? g.text : c.state === 'asked' ? 'Wants to message you' : c.state === 'sent' ? 'Message request sent' : c.state === 'open' && c.last ? (c.last.mine ? 'You: ' : '') + c.last.text
        : c.state === 'open' ? 'No messages yet' : (f.name ? '@' + f.username + ', friends' : 'Friends') + ' since ' + dayText(f.since);
      return '<div class="fr-row fr-friend' + (dot ? ' unread' : '') + '"><button class="fr-open" type="button" data-act="page" data-page="chat" data-f="' + f.ref + '"><span class="avatar">' + frInitial(f) + '</span><span class="fr-who">' +
        (isOnline(f.ref) ? '<b class="fr-nm"><bdi>' + esc(frShown(f)) + '</bdi>' + onlineTag(f.ref) + '</b>' : '<b>' + esc(frShown(f)) + '</b>') + '<span>' + esc(line) + '</span></span>' +
        (dot ? '<i class="dot"></i><span class="sr">' + (g ? 'Challenge' : c.state === 'asked' ? 'Message request' : c.unread + ' new') + '</span>' : '') + '</button>' +
        '<button class="ghost sm" type="button" data-act="pickch" data-kind="challenge" data-real="1" data-f="' + f.ref + '" aria-label="Challenge ' + esc(frShown(f)) + '">Challenge</button></div>';
    }).join('') + '</div>'
    : '<p class="fine fr-none">No friends yet. Find a friend by username, or show them your code.</p>');
  h += '<div class="rows fr-ways"><button class="row" type="button" data-act="fradd"><span class="t">Add a friend</span><span class="val"></span>' + IC.right + '</button>' +
    '<button class="row" type="button" data-act="frcode"><span class="t">Your friend code</span><span class="val">' + codeText(d.me.code) + '</span>' + IC.right + '</button></div>';
  if (d.outgoing.length) {
    h += '<h3 class="fr-h">Requests you sent</h3><div class="rows">' + d.outgoing.map(o =>
      '<div class="fr-row two"><span class="fr-who"><b>' + (o.asked ? '@' + esc(o.asked) : 'Request sent') + '</b><span>' + (o.asked ? 'Waiting for them to accept' : 'Code ' + codeText(o.code) + ', waiting for them to accept') + '</span></span>' +
      '<button class="ghost sm" type="button" data-act="frcancel" data-ref="' + o.ref + '">Cancel</button></div>').join('') + '</div>';
  }
  if (d.blocked.length) {
    h += '<h3 class="fr-h">Blocked</h3><div class="rows">' + d.blocked.map(k =>
      '<div class="fr-row"><span class="avatar">' + frInitial(k) + '</span><span class="fr-who"><b>' + esc(frShown(k)) + '</b>' + (k.name && k.username ? '<span>@' + esc(k.username) + '</span>' : '') + '</span>' +
      '<button class="ghost sm" type="button" data-act="frunblock" data-ref="' + k.ref + '">Unblock</button></div>').join('') + '</div>';
  }
  return h;
}

/* ---------- usernames ---------- */
/* The username form: on the Friends page the first time, and in a sheet from Account to change it. */
function unameForm(sheetForm) {
  return '<div class="uform">' + (sheetForm ? '' : '<h3 class="h2">Pick a username</h3>') +
    '<p class="sub">Friends can find you by your username. Other students see it when they search, so don’t use your real name.</p>' +
    '<label class="field at"><span class="sr">Username</span><span class="at-sign" aria-hidden="true">@</span><input class="unameIn" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="21" placeholder="username"></label>' +
    '<p class="fine err" role="alert" hidden></p>' +
    '<p class="fine">3 to 20 letters, numbers, dots or underscores.' + (sheetForm && frMine() && frMine().me.username ? ' You can change it once a day. Friends see the new one.' : '') + '</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="unamesave">Save username</button></div>' +
    (sheetForm ? '' : '<p class="fine">You can turn off search by username in Account, on the You page.</p>') + '</div>';
}
const UN_SAY = {
  bad: 'Use 3 to 20 letters (a to z), numbers, dots or underscores.',
  dots: 'A username can’t start or end with a dot, or have two dots together.',
  taken: 'That username is taken. Try another.',
  banned: 'That username has a word Stratos doesn’t allow. Try another.',
  today: 'You changed your username today. Try again tomorrow.',
  soon: 'Too many tries. Try again in 15 minutes.',
  day: 'Too many tries. Try again tomorrow.'
};
ACT.unamesave = async b => {
  const form = b.closest('.uform'), input = $('.unameIn', form), err = $('.err', form);
  const say = msg => { err.textContent = msg; err.hidden = !msg; };
  const name = input.value.trim().toLowerCase().replace(/^@/, '');
  /* The database checks all of this again. These two just answer quickly. */
  if (!/^[a-z0-9._]{3,20}$/.test(name)) { say(UN_SAY.bad); return; }
  if (/^\.|\.$|\.\./.test(name)) { say(UN_SAY.dots); return; }
  b.disabled = true; say('');
  try {
    const r = await frCall('set_username', {new_username: name});
    if (r.result !== 'ok') { say(UN_SAY[r.result] || UN_SAY.bad); return; }
    if (fr) { fr.me.username = r.username; saveFr(); }
    if (b.closest('#sheet')) { closeSheet(); toast('Username saved: @' + r.username + '.'); }
    frRepaint();
  } catch (e) { say(frWhy(e)); } finally { if (b.isConnected) b.disabled = false; }
};
ACT.unamechange = () => {
  const d = frMine(); if (!d) return;
  openSheet(d.me.username ? 'Change username' : 'Pick a username', unameForm(true));
  const i = $('.unameIn', sheetBody); i.value = d.me.username || ''; i.focus();
};
/* The account sheet's part: the username and the search switch. */
function acctFrHtml() {
  const d = frMine(); if (!d) return '';
  return '<div class="rows fr-acct"><div class="set"><span class="t">Username</span><span class="fr-un">' + (d.me.username ? '@' + esc(d.me.username) : 'Not picked yet') + '</span>' +
      '<button class="ghost sm" type="button" data-act="unamechange">' + (d.me.username ? 'Change' : 'Pick') + '</button></div>' +
    '<div class="set"><span class="t" id="setFind">Let people find me by username</span><button class="switch" type="button" data-act="frfindable" aria-pressed="' + (d.me.findable !== false) + '" aria-labelledby="setFind"><span></span></button></div></div>' +
    '<p class="fine">When this is off, nobody can find you by searching. Your friend code still works, and your friends stay your friends.</p>' +
    onlineSetHtml();
}
ACT.frfindable = async b => {
  const d = frMine(); if (!d) return;
  const on = d.me.findable === false;
  d.me.findable = on; b.setAttribute('aria-pressed', on); saveFr();
  try { await frCall('set_findable', {findable_on: on}); toast(on ? 'People can find you by username.' : 'Nobody can find you by username now.'); }
  catch (e) { d.me.findable = !on; saveFr(); if (b.isConnected) b.setAttribute('aria-pressed', !on); toast(frWhy(e)); }
};

/* ---------- adding a friend: by username or by code ---------- */
ACT.fradd = b => {
  if (b && b.dataset.v) addHow = b.dataset.v;
  const again = !!(b && b.closest('#sheet'));
  const seg = '<div class="seg3 wide addsw" role="group" aria-label="Add by">' + [['name', 'Username'], ['code', 'Code']].map(o =>
    '<button type="button" data-act="fradd" data-v="' + o[0] + '" aria-pressed="' + (addHow === o[0]) + '">' + o[1] + '</button>').join('') + '</div>';
  if (addHow === 'name') {
    openSheet('Add a friend', seg +
      '<p class="sub">Type your friend’s username, or at least its first 3 characters.</p>' +
      '<label class="field at"><span class="sr">Username</span><span class="at-sign" aria-hidden="true">@</span><input id="findIn" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="21" placeholder="username"></label>' +
      '<p class="fine err" id="frErr" role="alert" hidden></p>' +
      '<div class="cta"><button class="primary" type="button" data-act="frfind">Search</button></div>' +
      '<div class="rows fr-found" id="findOut" hidden></div>' +
      '<p class="fine">Students who turned off search by username don’t show. You can search 10 times in 15 minutes.</p>');
  } else {
    openSheet('Add a friend', seg +
      '<p class="sub">Type your friend’s code. They’ll see your call sign and username, and can accept or decline.</p>' +
      '<label class="field"><span class="sr">Friend code</span><input id="fcodeIn" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="11" placeholder="Friend code"></label>' +
      '<p class="fine err" id="frErr" role="alert" hidden></p>' +
      '<div class="cta"><button class="primary" type="button" data-act="frsendcode">Send request</button></div>' +
      '<p class="fine">Codes use letters and numbers, with no 0, O, 1, I or L.</p>');
  }
  lastFound = [];
  if (again) $('#sheetBody .addsw [aria-pressed="true"]').focus({preventScroll: true});
  else { const i = $(addHow === 'name' ? '#findIn' : '#fcodeIn'); if (i) i.focus(); }
};
function frErr(msg) { const e = $('#frErr'); if (e) { e.textContent = msg; e.hidden = !msg; } }
/* What sending a request can answer, in words. how is 'name' or 'code', for the answers that differ. */
function sendWords(r, how) {
  const n = frShown(r);
  return ({
    none: 'No one found with that username. Check the spelling with your friend.',
    wrong: 'That code didn’t work. Check it with your friend.',
    bad: 'Codes use letters and numbers, with no 0, O, 1, I or L.',
    self: how === 'code' ? 'That’s your own code. Share it with a friend instead.' : 'That’s your username.',
    friends_already: 'You’re already friends with ' + n + '.',
    sent_already: 'You’ve already sent this student a request.',
    you_blocked: 'You blocked this student. Unblock them first.',
    full: 'You have 100 friends, the most there can be. Remove one to add another.',
    their_full: 'That student has 100 friends, the most there can be.',
    out_full: 'You have 10 requests waiting. Cancel one, or wait for them to answer.',
    their_in_full: 'That student has too many requests waiting. Ask them to check Friends.',
    sent_day: 'You’ve sent 20 requests today. Try again tomorrow.',
    soon: how === 'code' ? 'Too many codes that didn’t work. Try again in 15 minutes.' : 'Too many searches. Try again in 15 minutes.',
    day: how === 'code' ? 'Too many codes that didn’t work. Try again tomorrow.' : 'Too many searches. Try again tomorrow.'
  })[r.result] || 'Something went wrong. Try again in a moment.';
}
/* Sent, or friends straight away because they had asked too: say so and fetch the list. */
function sentOk(r) {
  if (r.result === 'sent') toast('Request sent. You’ll be friends once they accept.');
  else toast('You’re now friends with ' + frShown(r) + '.');
  frLoad();
}
ACT.frfind = async b => {
  const i = $('#findIn'), q = i ? i.value.trim().toLowerCase().replace(/^@/, '') : '';
  if (q.length < 3) { frErr('Type at least 3 characters.'); return; }
  if (!/^[a-z0-9._]{3,20}$/.test(q)) { frErr('Usernames have only letters, numbers, dots and underscores.'); return; }
  b.disabled = true; frErr('');
  try {
    const r = await frCall('find_students', {search: q});
    if (r.result !== 'ok') { frErr(sendWords(r, 'name')); lastFound = []; }
    else { lastFound = r.found; if (!lastFound.length) frErr('No one found. Check the spelling with your friend.'); }
    paintFound();
  } catch (e) { frErr(frWhy(e)); } finally { if (b.isConnected) b.disabled = false; }
};
/* The search results: each is only a username, the number of mutual friends, and a button or where you stand. */
function paintFound() {
  const out = $('#findOut'); if (!out) return;
  out.hidden = !lastFound.length;
  out.innerHTML = lastFound.map(x => {
    const act = x.state === 'friends' ? '<span class="fr-state">Friends</span>' : x.state === 'sent' ? '<span class="fr-state">Request sent</span>'
      : '<button class="primary sm" type="button" data-act="frsendname" data-u="' + esc(x.username) + '">' + (x.state === 'asked' ? 'Accept' : 'Send request') + '</button>';
    return '<div class="fr-row"><span class="avatar">' + esc(x.username.charAt(0).toUpperCase()) + '</span><span class="fr-who"><b>@' + esc(x.username) + '</b><span>' + mutualText(x.mutual) + '</span></span>' + act + '</div>';
  }).join('');
}
ACT.frsendname = async b => {
  const u = b.dataset.u;
  b.disabled = true; frErr('');
  try {
    const r = await frCall('send_friend_request_to', {friend_username: u});
    const hit = lastFound.find(x => x.username === u);
    if (r.result === 'sent' || r.result === 'now_friends') { if (hit) hit.state = r.result === 'sent' ? 'sent' : 'friends'; paintFound(); sentOk(r); return; }
    if (hit && r.result === 'friends_already') hit.state = 'friends';
    if (hit && r.result === 'sent_already') hit.state = 'sent';
    paintFound();
    frErr(sendWords(r, 'name'));
  } catch (e) { frErr(frWhy(e)); } finally { if (b.isConnected) b.disabled = false; }
};
ACT.frsendcode = async b => {
  const i = $('#fcodeIn'), code = i ? i.value.toUpperCase().replace(/[\s-]/g, '') : '';
  if (/[01OIL]/.test(code)) { frErr(sendWords({result: 'bad'}, 'code')); return; }
  if (!/^[2-9A-Z]{8}$/.test(code)) { frErr('A friend code has 8 letters and numbers.'); return; }
  b.disabled = true; frErr('');
  try {
    const r = await frCall('send_friend_request', {friend_code: code});
    if (r.result === 'sent' || r.result === 'now_friends') { closeSheet(); sentOk(r); return; }
    frErr(sendWords(r, 'code'));
  } catch (e) { frErr(frWhy(e)); } finally { if (b.isConnected) b.disabled = false; }
};

/* ---------- your code ---------- */
ACT.frcode = () => {
  const d = frMine(); if (!d) return;
  openSheet('Your friend code',
    '<p class="fr-code" aria-label="' + d.me.code.split('').join(' ') + '">' + codeText(d.me.code) + '</p>' +
    '<p class="sub">Show this to a friend in person, so they can type it. Anyone with your code can send you a request, and you choose whether to accept.</p>' +
    '<p class="fine err" id="frErr" role="alert" hidden></p>' +
    '<div class="cta"><button class="ghost" type="button" data-act="frnewcode">Make a new code</button></div>' +
    '<p class="fine">A new code stops the old one working. Friends you have stay friends.</p>');
};
ACT.frnewcode = async b => {
  b.disabled = true; frErr('');
  try {
    const c = await frCall('new_friend_code');
    if (fr) { fr.me.code = c; saveFr(); }
    const el = $('.fr-code', sheetBody); if (el) { el.textContent = codeText(c); el.setAttribute('aria-label', c.split('').join(' ')); }
    toast('New code made. The old one no longer works.');
    frRepaint();
  } catch (e) { frErr(frWhy(e)); } finally { if (b.isConnected) b.disabled = false; }
};

/* ---------- answering requests, and a friend's sheet ---------- */
const frFind = (list, ref) => { const d = frMine(); return d ? d[list].find(x => x.ref === ref) || null : null; };
/* Run one change, then fetch the list. A toast says what happened or what went wrong. */
async function frChange(b, fn, ref, done) {
  if (b) b.disabled = true;
  /* Leave the chat's Realtime channel straight away, so nothing more goes either way (79-live.js). */
  if (fn === 'block_student' || fn === 'remove_friend') liveDrop(ref);
  try {
    const r = await frCall(fn, {ref: ref});
    closeSheet();
    toast(typeof done === 'function' ? done(r) : done);
  } catch (e) { toast(frWhy(e)); if (b && b.isConnected) b.disabled = false; }
  frLoad();
}
ACT.fraccept = b => frChange(b, 'accept_friend_request', b.dataset.ref, x => x.result === 'friends' ? 'You’re now friends with ' + frShown(x) + '.' :
  x.result === 'full' || x.result === 'their_full' ? sendWords(x, 'code') : 'That request is no longer there.');
ACT.frdecline = b => {
  const r = frFind('incoming', b.dataset.ref); if (!r) return;
  openSheet('Decline ' + frShown(r) + '’s request?',
    '<p class="sub">They won’t be told. They can send another one later.</p>' +
    '<div class="cta"><button class="ghost" type="button" data-act="frdeclineok" data-ref="' + r.ref + '">Decline</button></div>' +
    '<button class="textbtn danger" type="button" data-act="frblock" data-ref="' + r.ref + '" data-now="1">Decline and block</button>' +
    '<p class="fine">Blocking stops them sending you another request.</p>');
};
ACT.frdeclineok = b => frChange(b, 'decline_friend_request', b.dataset.ref, 'Declined.');
ACT.frcancel = b => frChange(b, 'cancel_friend_request', b.dataset.ref, 'Request cancelled.');
ACT.frunblock = b => frChange(b, 'unblock_student', b.dataset.ref, 'Unblocked. They can send you a request again.');
ACT.frfriend = b => {
  const f = frFind('friends', b.dataset.ref); if (!f) return;
  const n = esc(frShown(f));
  openSheet(frShown(f),
    '<p class="sub">' + (f.name ? '@' + esc(f.username) + '. ' : '') + 'Friends since ' + dayText(f.since, true) + '.</p>' +
    chResults(f.ref, frShown(f)) +
    '<div class="cta">' + chButton(f.ref) + '</div>' +
    '<p class="fine">Races with real friends come in a later update. ' + n + ' sees only your call sign and username.</p>' +
    '<div class="cta"><button class="ghost" type="button" data-act="frremove" data-ref="' + f.ref + '" data-n="' + n + '">Remove friend</button></div>' +
    '<button class="textbtn danger" type="button" data-act="frblock" data-ref="' + f.ref + '" data-n="' + n + '">Block</button>' +
    '<p class="fine">Removing or blocking doesn’t tell them. Either one deletes your chat for both of you. Blocking also stops them sending you another request.</p>');
};
/* Remove and Block from a friend's sheet take two taps, like Delete account. */
function armed(b, text, back) {
  if (b.dataset.armed === '1') return true;
  b.dataset.armed = '1'; b.textContent = text;
  setTimeout(() => { if (b.isConnected) { b.dataset.armed = ''; b.textContent = back; } }, 3600);
  return false;
}
ACT.frremove = b => { if (armed(b, 'Tap again to remove ' + b.dataset.n, 'Remove friend')) frChange(b, 'remove_friend', b.dataset.ref, b.dataset.n + ' is no longer your friend.'); };
ACT.frblock = b => {
  if (!b.dataset.now && !armed(b, 'Tap again to block ' + b.dataset.n, 'Block')) return;
  frChange(b, 'block_student', b.dataset.ref, 'Blocked. They can’t send you a request.');
};

/* Enter in a box presses its button. The username box turns capitals to lower case as they are typed. */
app.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter') return;
  const t = ev.target, sel = t.classList.contains('unameIn') ? '[data-act="unamesave"]' : t.id === 'findIn' ? '[data-act="frfind"]' : t.id === 'fcodeIn' ? '[data-act="frsendcode"]' : '';
  if (!sel) return;
  ev.preventDefault();
  const b = $(sel, t.closest('.uform') || sheetBody);
  if (b && !b.disabled) b.click();
});
app.addEventListener('input', ev => {
  const t = ev.target;
  if (!t.classList.contains('unameIn') && t.id !== 'findIn') return;
  const lower = t.value.toLowerCase();
  if (lower !== t.value) { const at = t.selectionStart; t.value = lower; t.setSelectionRange(at, at); }
});
