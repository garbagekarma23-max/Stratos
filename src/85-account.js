/* ---------- accounts: signing in by email, and keeping progress in step across devices ----------
   Signing in is optional. The app always reads and writes progress on the device (stratos2.v1), exactly as without an
   account. With an account, a copy is kept in Supabase too: the device sends it 2 seconds after a change, when the
   app is put away and when the connection comes back, and fetches the account's copy when the app opens and when it
   comes back on screen. Two copies are put together by merge() in 84-merge.js, so nothing either has learned is lost.
   With no connection nothing changes for the student: changes wait on the device.
   The Supabase library is big, so it only loads for a student who opens the sign-in sheet or is signed in already.
   Without an account, nothing here contacts Supabase. */

/* The Supabase project. Both values are public by design: the publishable key only lets a browser ask, and the rules
   in supabase/schema.sql decide what it may do. The secret key never goes here, or anywhere in this repository.
   With these empty, accounts are switched off and You shows no account row. Tests point this at a fake. */
const SUPA = window.stratosSupabase || {url: 'https://hlklmkvuanyogqwpmszi.supabase.co', key: 'sb_publishable_ik-1wCDIVx7g66o-mNYFqg_S6uDqP9x'};
const ACCOUNTS = !!(SUPA.url && SUPA.key);
const AUTH_KEY = 'stratos2.auth', SYNC_KEY = 'stratos2.sync';
let sb = null, sbLoading = null;
let acctUser = null;      /* the account signed in right now, from the library: {id, email} */
let leaving = false;      /* true while this device signs itself out, so that is not mistaken for being signed out */
/* What this device knows about its account, kept apart from the progress so Reset and sign out can clear it:
   uid and email of the account, rev (the account copy's number when last seen), hash (the account copy's text when
   last seen, see canon), name (the call sign when last in step) and last (when it was last in step). */
let st = readSync();
function readSync() { try { const s = JSON.parse(localStorage.getItem(SYNC_KEY) || '{}'); return s && typeof s === 'object' ? s : {}; } catch (e) { return {}; } }
function saveSync() { try { if (st.uid) localStorage.setItem(SYNC_KEY, JSON.stringify(st)); else localStorage.removeItem(SYNC_KEY); } catch (e) {} }
const signedIn = () => ACCOUNTS && !!(st.uid || acctUser);
/* True when the device has progress the account has not got yet. */
const unsynced = () => !!st.uid && canon(syncPart(saved)) !== st.hash;

function loadSupabase() {
  if (sb) return Promise.resolve(sb);
  if (sbLoading) return sbLoading;
  sbLoading = new Promise((ok, no) => {
    const s = document.createElement('script');
    s.src = 'vendor/supabase/supabase.js';
    s.onload = () => {
      try {
        /* implicit: a link from the email signs in whichever browser it opens in. The code works anywhere.
           If the link opens in another tab of this browser, the library tells this tab, and onAuth carries on here. */
        sb = window.supabase.createClient(SUPA.url, SUPA.key, {auth: {storageKey: AUTH_KEY, flowType: 'implicit', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true}});
        sb.auth.onAuthStateChange(onAuth);
        ok(sb);
      } catch (e) { sbLoading = null; no(e); }
    };
    s.onerror = () => { sbLoading = null; s.remove(); no(new Error('offline')); };
    document.head.appendChild(s);
  });
  return sbLoading;
}

/* The library says when the sign-in changes. Its advice is to do the work after it returns, hence the setTimeout. */
function onAuth(event, session) {
  if (session && session.user) {
    acctUser = {id: session.user.id, email: session.user.email || ''};
    if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') setTimeout(afterSignIn, 0);
    return;
  }
  if (event === 'SIGNED_OUT' && !leaving && (acctUser || st.uid)) goneElsewhere();
}
/* Signed out from elsewhere: the account was deleted on another device, or its sign-in ran out.
   The progress on this device stays. */
function goneElsewhere() {
  if (!st.uid && !acctUser) return;
  acctForget();
  paintAcct();
  toast('Signed out. This device keeps its progress.');
}

let firstFor = null;
const acctStart = Date.now();
function afterSignIn() {
  if (!acctUser) return;
  paintAcct();
  /* Just after opening, on Home, the device moves to the subject and chapter the account was last used on.
     Later, or once the student is doing something, they stay where they are. */
  const opening = Date.now() - acctStart < 10000 && ui.tab === 'home' && !P && !L && !pages.length;
  if (st.uid === acctUser.id) { st.email = acctUser.email; saveSync(); pull(!opening); return; }
  if (firstFor === acctUser.id) return;
  firstFor = acctUser.id;
  firstSync(acctUser).catch(() => { toast('Signed in. Your progress will be saved once the connection is back.'); paintAcct(); }).finally(() => { firstFor = null; });
}

/* The account's copy: {data, rev}, or null if it has none yet. Throws if it cannot be reached. */
async function fetchRow(uid) {
  const r = await sb.from('progress').select('data,rev').eq('user_id', uid);
  if (r.error) throw r.error;
  const row = r.data[0];
  return row ? {data: row.data, rev: Number(row.rev) || 0} : null;
}

/* The first time this device signs in to this account. If both have progress, the student chooses. */
async function firstSync(user) {
  const remote = await fetchRow(user.id);
  const mine = hasProgress(saved), theirs = !!remote && hasProgress(remote.data);
  if (mine && theirs) { askWhich(user, remote); return; }
  await adopt(user, remote, 'add', mine ? 'Signed in. This device’s progress is saved to your account.' : theirs ? 'Signed in. Your progress is on this device now.' : 'Signed in. Your progress will be saved to your account.');
}
function askWhich(user, remote) {
  pendingChoice = {user: user, remote: remote};
  openSheet('This device has progress too',
    '<p class="sub">Your account already has progress from another device.</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="acctadd">Add this device’s progress</button>' +
    '<button class="ghost" type="button" data-act="acctuse">Use the account’s only</button></div>' +
    '<p class="fine">Use the account’s only if someone else used Stratos on this device. Their answers here are erased.</p>' +
    '<button class="textbtn" type="button" data-act="signout">Sign out instead</button>');
}
let pendingChoice = null;
ACT.acctadd = () => choose('add', 'Signed in. This device’s progress is added to your account.');
ACT.acctuse = () => choose('use', 'Signed in. This device now has your account’s progress.');
function choose(how, msg) {
  const c = pendingChoice; pendingChoice = null;
  if (!c || !acctUser || acctUser.id !== c.user.id) { closeSheet(); return; }
  adopt(c.user, c.remote, how, msg).catch(() => { pendingChoice = c; toast('No connection. Try again when you are online.'); });
}
/* Start keeping this device in step with the account. add puts both copies together; use takes the account's. */
async function adopt(user, remote, how, msg) {
  if (remote) applyPart(how === 'use' ? remote.data : merge(syncPart(saved), remote.data), false);
  st = {uid: user.id, email: user.email, rev: remote ? remote.rev : 0, hash: remote ? canon(syncPart(remote.data)) : ''};
  saveSync();
  await syncName(true);
  closeSheet();
  if (saved.name) toast(msg);
  else callSign(msg);
  await push();
}

/* Fetch the account's copy and put it together with this device's. With here set, the subject and chapter open on
   this device stay as they are, so nothing moves under a student who is using it. */
async function fetchAndMerge(here) {
  const remote = await fetchRow(st.uid);
  if (!remote) { st.rev = 0; st.hash = ''; return; }
  const mine = syncPart(saved), both = merge(mine, remote.data);
  st.rev = remote.rev; st.hash = canon(syncPart(remote.data));
  if (canon(both) !== canon(mine)) applyPart(both, here);
}
let pulling = false;
async function pull(here) {
  if (!st.uid || !acctUser || pulling) return;
  pulling = true;
  try { await fetchAndMerge(here); await syncName(false); st.last = Date.now(); saveSync(); } catch (e) {} finally { pulling = false; }
  paintAcct();
  push();
}

/* Send this device's copy to the account. rev is checked, so if another device saved since this one last looked,
   nothing is written: this device fetches that copy, puts the two together and tries again. */
let pushing = false, pushAgain = false, pushTimer = 0;
function syncSoon(ms) {
  if (!st.uid) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(push, ms == null ? 2000 : ms);
}
async function push() {
  if (!st.uid || !sb || !acctUser || acctUser.id !== st.uid) return;
  if (pushing) { pushAgain = true; return; }
  pushing = true;
  try {
    for (let i = 0; i < 3; i++) {
      const part = syncPart(saved), h = canon(part);
      if (h === st.hash) break;
      if (!st.rev) {
        const r = await sb.from('progress').insert({user_id: st.uid, data: part, rev: 1});
        if (!r.error) { st.rev = 1; st.hash = h; break; }
        if (r.error.code === '23505') { await fetchAndMerge(true); continue; }   /* another device made the row first */
        throw r.error;
      }
      const r = await sb.from('progress').update({data: part, rev: st.rev + 1}).eq('user_id', st.uid).eq('rev', st.rev).select('rev');
      if (r.error) throw r.error;
      if (r.data.length) { st.rev = Number(r.data[0].rev); st.hash = h; break; }
      await fetchAndMerge(true);
    }
    await syncName(false);
    if (!unsynced()) st.last = Date.now();
  } catch (e) {
    /* 23503: the row could not be made because the account is gone, deleted on another device. */
    if (e && e.code === '23503') { goneElsewhere(); return; }
    if (navigator.onLine) syncSoon(30000);           /* the connection is there but Supabase was not: try again later */
  } finally {
    pushing = false; saveSync(); paintAcct();
    if (pushAgain) { pushAgain = false; syncSoon(0); }
  }
}

/* The call sign, in profiles. The account's wins, unless this device changed it since they were last in step. */
async function syncName(first) {
  const mine = saved.name || '';
  const r = await sb.from('profiles').select('call_sign').eq('id', st.uid);
  if (r.error) throw r.error;
  if (!r.data.length) {
    const w = await sb.from('profiles').insert({id: st.uid, call_sign: mine || null});
    if (w.error && w.error.code !== '23505') throw w.error;
    st.name = mine; return;
  }
  const theirs = r.data[0].call_sign || '';
  if (theirs === mine) { st.name = mine; return; }
  if (first ? theirs : mine === (st.name || '')) { save({name: theirs}); st.name = theirs; return; }
  const w = await sb.from('profiles').update({call_sign: mine || null}).eq('id', st.uid);
  if (w.error) throw w.error;
  st.name = mine;
}

/* Put a synced part into this device's save, then tidy it the way a save from storage is tidied. */
function applyPart(part, here) {
  part = copy(part);
  if (here) {
    part.subject = saved.subject; part.cur = saved.cur; part.rocket = saved.rocket; part.exhaust = saved.exhaust;
    part.m = isObj(part.m) ? part.m : {}; part.m.cur = saved.m.cur;
    part.c = isObj(part.c) ? part.c : {};
    Object.keys(saved.c).forEach(id => { part.c[id] = isObj(part.c[id]) ? part.c[id] : {}; part.c[id].cur = saved.c[id].cur; });
  }
  const was = SUB.id;
  SYNC_TOP.forEach(k => { if (part[k] === undefined) delete saved[k]; else saved[k] = part[k]; });
  saved.m = isObj(part.m) ? part.m : {};
  saved.c = isObj(part.c) ? part.c : {};
  const want = saved.subject;
  saved.subject = was;
  tidySaved();
  if (SUBJECTS[want] && want !== was) useSubject(want, true);
  save();
  applyLook();
  if (!pages.length && (ui.tab === 'home' || ui.tab === 'you')) paint();
}

/* Stop keeping this device in step and forget the account here. The account itself is not touched. */
function acctForget() {
  leaving = true;
  clearTimeout(pushTimer);
  acctUser = null; st = {}; saveSync();
  const end = () => { try { localStorage.removeItem(AUTH_KEY); } catch (e) {} leaving = false; };
  if (sb) sb.auth.signOut({scope: 'local'}).then(end, end); else end();
}

/* ---------- what the student sees: a row on You, and the sheets ---------- */
function syncWords() {
  if (!st.uid) return 'Not saved yet';
  if (unsynced()) return navigator.onLine ? 'Saving' : 'Waiting for a connection';
  return 'Saved';
}
const whereSaved = () => signedIn() ? 'Progress is saved to your account.' : 'Progress is saved on this device only.';
function acctRow() {
  if (!ACCOUNTS) return '';
  if (!signedIn()) return '<button class="row" type="button" data-act="signin" data-title="Save your progress"><span class="t">Save progress to an account</span><span class="val">Optional</span>' + IC.right + '</button>';
  return '<button class="row" type="button" data-act="account"><span class="t">Account</span><span class="val" id="acctVal">' + syncWords() + '</span>' + IC.right + '</button>';
}
function acctLine() {
  if (!st.uid) return 'Not saved to your account yet. It will be once the connection is back.';
  if (unsynced()) return navigator.onLine ? 'Saving to your account.' : 'Not saved yet. Waiting for a connection.';
  if (!st.last || Date.now() - st.last < 60000) return 'Saved to your account just now.';
  return 'Saved to your account at ' + new Date(st.last).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) + '.';
}
function paintAcct() {
  if (ui.tab === 'you' && !pages.length) {
    const v = $('#acctVal');
    if (v && signedIn()) v.textContent = syncWords(); else if (!!v !== signedIn()) renderYou();
  }
  const l = $('#acctLine'); if (l) l.textContent = acctLine();
  /* Home's Sign in button shows only while signed out. */
  if (!!$('.top .signin', views.home) === signedIn()) renderHome();
}

let codeFor = '', againTimer = 0;
/* The email sheet. One email address both makes an account and signs in, so it is the same sheet everywhere. Its title
   follows the button that opened it: Create an account, Sign in, or Save your progress from You. Use a different
   email keeps the title it had. */
let signTitle = 'Save your progress';
ACT.signin = b => signInSheet(b && b.dataset.title);
function signInSheet(title) {
  if (!ACCOUNTS) return;
  if (title) signTitle = title;
  loadSupabase().catch(() => {});
  openSheet(signTitle,
    '<p class="sub">We’ll email you a link. It makes your account, or signs you in if you have one.</p>' +
    '<label class="field"><span class="sr">Email</span><input id="emailIn" type="email" inputmode="email" autocomplete="email" autocapitalize="off" spellcheck="false" placeholder="Email"></label>' +
    '<p class="fine err" id="acctErr" role="alert" hidden></p>' +
    '<div class="cta"><button class="primary" type="button" data-act="sendcode">Email me a sign-in link</button></div>' +
    '<p class="fine">Your email is used only to sign in. Stratos keeps no name, birthday or location.</p>');
  const i = $('#emailIn'); i.value = codeFor; i.focus();
}
function acctErr(msg) { const e = $('#acctErr'); if (e) { e.textContent = msg; e.hidden = !msg; } }
/* What went wrong, in plain words. The library gives a status of 0 when it could not reach Supabase at all. */
function why(e, fallback) {
  if (!navigator.onLine || !e || e.status === 0 || /fetch|network|offline/i.test(e.message || '')) return 'No connection. Try again when you are online.';
  if (e.status === 429 || /rate/i.test(e.code || '')) return 'Too many emails asked for. Wait a minute, then try again.';
  return fallback;
}
ACT.sendcode = async b => {
  const again = b.dataset.again === '1', i = $('#emailIn');
  const email = again ? codeFor : (i ? i.value.trim().toLowerCase() : '');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { acctErr('Type the whole email address, like name@example.com.'); return; }
  b.disabled = true; acctErr('');
  try {
    await loadSupabase();
    const r = await sb.auth.signInWithOtp({email: email, options: {shouldCreateUser: true, emailRedirectTo: location.origin + location.pathname}});
    if (r.error) throw r.error;
  } catch (e) {
    b.disabled = false; acctErr(why(e, 'The email could not be sent. Check the address and try again.'));
    return;
  }
  codeFor = email;
  if (!again) codeSheet(); else { acctErr(''); toast('Sent again.'); }
  waitToResend();
};
/* The email always has a link. It has a 6-digit code too once Supabase sends our own email (supabase/emails.md), so
   the sheet leads with the link and offers the code box as the other way in. Closing the sheet, Send again and Use a
   different email are always there, so nobody waits on a code that never comes. */
function codeSheet() {
  openSheet('Check your email',
    '<p class="sub">We sent an email to <span class="em">' + esc(codeFor) + '</span>. Tap the link in it to sign in.</p>' +
    '<p class="fine">The link signs in the browser it opens in. On an iPhone that is Safari, even if you use Stratos from your Home Screen.</p>' +
    '<p class="fine">If the email has a 6-digit code, you can type it here instead.</p>' +
    '<label class="field"><span class="sr">6-digit code</span><input id="codeIn" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="10" spellcheck="false" placeholder="6-digit code"></label>' +
    '<p class="fine err" id="acctErr" role="alert" hidden></p>' +
    '<div class="cta"><button class="ghost" type="button" data-act="verifycode">Sign in with the code</button>' +
    '<button class="ghost" type="button" data-act="sendcode" data-again="1" id="againBtn" disabled>Send again</button></div>' +
    '<button class="textbtn" type="button" data-act="signin">Use a different email</button>');
}
/* Send again waits 60 seconds, the gap Supabase needs between two codes to the same address. */
function waitToResend() {
  clearInterval(againTimer);
  let left = 60;
  const tick = () => {
    const b = $('#againBtn');
    if (!b) { clearInterval(againTimer); return; }
    b.disabled = left > 0; b.textContent = left > 0 ? 'Send again in ' + left + ' s' : 'Send again';
    if (left-- <= 0) clearInterval(againTimer);
  };
  tick(); againTimer = setInterval(tick, 1000);
}
ACT.verifycode = async b => {
  const i = $('#codeIn'), code = i ? i.value.replace(/\D/g, '') : '';
  if (code.length < 6) { acctErr('Tap the link in the email. If it has a 6-digit code, type that here.'); return; }
  b.disabled = true; b.textContent = 'Signing in'; acctErr('');
  try {
    const r = await sb.auth.verifyOtp({email: codeFor, token: code, type: 'email'});
    if (r.error) throw r.error;
    /* onAuth hears about the sign-in and takes it from here. */
  } catch (e) {
    b.disabled = false; b.textContent = 'Sign in with the code';
    acctErr(why(e, 'That code is wrong or has run out. Check the email, or send a new one.'));
  }
};
sheetBody.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter') return;
  if (ev.target.id === 'emailIn') { ev.preventDefault(); const b = $('[data-act="sendcode"]', sheetBody); if (b && !b.disabled) ACT.sendcode(b); }
  if (ev.target.id === 'codeIn') { ev.preventDefault(); const b = $('[data-act="verifycode"]', sheetBody); if (b && !b.disabled) ACT.verifycode(b); }
});

ACT.account = () => {
  /* Signed in, but this device has not started keeping in step yet: the choice was closed, or the connection
     dropped. Ask again, or try again. */
  if (!st.uid && pendingChoice) { askWhich(pendingChoice.user, pendingChoice.remote); return; }
  if (!st.uid && acctUser) afterSignIn();
  openSheet('Account',
    '<p class="sub">Signed in as <span class="em">' + esc(st.email || (acctUser && acctUser.email) || '') + '</span>.</p>' +
    '<p class="statusline" id="acctLine">' + acctLine() + '</p>' +
    '<p class="fine">Progress, records and your call sign are saved to your account. Appearance, sound and the place you picked stay on each device.</p>' +
    '<div class="cta"><button class="ghost" type="button" data-act="signout">Sign out</button></div>' +
    '<p class="fine">Signing out erases this device’s copy. Your account keeps it.</p>' +
    '<button class="textbtn danger" type="button" data-act="delacct">Delete account</button>' +
    '<p class="fine err" id="acctErr" role="alert" hidden></p>');
  if (navigator.onLine) pull(true);
};
ACT.signout = async b => {
  b.disabled = true;
  /* This device never started keeping in step, so its progress is not in the account: keep it here. */
  if (!st.uid) { acctForget(); closeSheet(); renderYou(); toast('Signed out. This device keeps its progress.'); return; }
  if (unsynced()) { await loadSupabase().catch(() => {}); await push(); }
  if (unsynced()) {
    openSheet('Not saved yet',
      '<p class="sub">Some progress on this device has not reached your account yet. Connect to the internet to save it, or sign out and lose it.</p>' +
      '<div class="cta"><button class="primary" type="button" data-act="sheetclose">Stay signed in</button>' +
      '<button class="ghost danger" type="button" data-act="signoutanyway">Sign out and lose it</button></div>');
    return;
  }
  signOutAndErase();
};
ACT.signoutanyway = () => signOutAndErase();
function signOutAndErase() {
  acctForget();
  closeSheet();
  eraseDevice();
  toast('Signed out. This device is back to the start.');
}
let delArm = 0;
ACT.delacct = async b => {
  if (b.dataset.armed !== '1') {
    b.dataset.armed = '1'; b.textContent = 'Tap again to delete your account and its progress';
    delArm = setTimeout(() => { if (b.isConnected) { b.dataset.armed = ''; b.textContent = 'Delete account'; } }, 3600);
    return;
  }
  clearTimeout(delArm);
  b.disabled = true; acctErr('');
  try {
    await loadSupabase();
    /* delete_account takes nothing in: it deletes whoever is signed in, and no one else (supabase/schema.sql). */
    const r = await sb.rpc('delete_account');
    if (r.error) throw r.error;
  } catch (e) {
    b.disabled = false; b.dataset.armed = ''; b.textContent = 'Delete account';
    acctErr(why(e, 'The account could not be deleted. Try again in a moment.'));
    return;
  }
  acctForget();
  closeSheet();
  renderYou();
  toast('Account deleted. This device keeps its progress.');
};

/* ---------- asking to save progress: the welcome screen, and one offer after the first chapter ----------
   Both are only for a student who is not signed in, and only while accounts are switched on. Try it first and
   Not now keep everything on the device, as before. saved.welcomed and saved.offered stay on the device: they are
   not progress, so they never go to the account. Tests turn both off with window.stratosWelcome = false. */
const welcomeEl = $('#welcome');
const asking = () => ACCOUNTS && !signedIn() && window.stratosWelcome !== false;
/* The welcome screen shows on a device that has never seen it and has no progress yet, so testers who already have
   progress never see it. Not when the page opens from a sign-in link: the welcome would only get in its way. */
function welcomeDue() {
  if (!asking() || saved.welcomed || hasProgress(saved)) return false;
  return !/(^|[#&])(access_token|error_description)=/.test(location.hash);
}
/* start() calls this before the intro plays, so the intro fades into the welcome screen instead of Home. */
function showWelcome() {
  if (!welcomeDue()) return;
  welcomeEl.innerHTML =
    '<div class="w-mid"><p class="word" id="wWord">Stratos</p><p class="w-line">Your syllabus in short cards. Race your friends on it.</p></div>' +
    '<div class="w-end"><button class="primary wide" type="button" data-act="wcreate">Create an account</button>' +
      '<button class="textbtn" type="button" data-act="wtry">Try it first</button>' +
      '<p class="fine">An account keeps your progress on every device. Trying it first keeps it on this device, and you can sign in later from Home.</p></div>';
  welcomeEl.hidden = false;
  welcomeInert(true);
  welcomeEl.focus({preventScroll: true});
}
/* While the welcome screen is up, the app behind it cannot be reached with the keyboard or a screen reader. */
function welcomeInert(on) { Object.keys(views).forEach(k => { views[k].inert = on; }); $('#tabs').inert = on; }
function welcomeDone() {
  save({welcomed: 1});
  welcomeEl.hidden = true; welcomeEl.textContent = '';
  welcomeInert(false);
}
ACT.wtry = () => welcomeDone();
ACT.wcreate = () => { welcomeDone(); signInSheet('Create an account'); };

/* At the end of a Learn session, once the chapter is learned, the end slide carries a mark. When that slide comes
   into view (learnSeen in 50-feed.js), the offer opens, once per device. Closing it counts as Not now. */
const offerDue = ch => asking() && !saved.offered && chStats(ch).learned === chStats(ch).n;
function offerSave() {
  if (!asking() || saved.offered) return;
  save({offered: 1});
  openSheet('Save your progress so you don’t lose it',
    '<p class="sub">Your progress is on this device only. An account keeps it if you lose or change your phone.</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="signin" data-title="Create an account">Create an account</button>' +
    '<button class="ghost" type="button" data-act="sheetclose">Not now</button></div>');
}

/* ---------- when to sync ---------- */
function acctBoot() {
  if (!ACCOUNTS) return;
  /* A link from the email that had run out or was used already comes back with an error in the address. */
  if (/(^|[#&])error_description=/.test(location.hash)) {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    toast('That sign-in link has run out or was used already. Ask for a new one in You.');
  }
  let has = false;
  try { has = !!localStorage.getItem(AUTH_KEY); } catch (e) {}
  if (has || /(^|[#&])access_token=/.test(location.hash)) loadSupabase().catch(() => {});
}
document.addEventListener('visibilitychange', () => {
  if (!st.uid) return;
  if (document.hidden) { if (unsynced()) push(); }
  else if (navigator.onLine) pull(true);
});
window.addEventListener('online', () => { if (st.uid) loadSupabase().then(() => pull(true), () => {}); paintAcct(); });
window.addEventListener('offline', paintAcct);
