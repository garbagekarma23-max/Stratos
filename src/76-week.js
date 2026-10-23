/* ---------- the weekly table with real friends ----------
   Only while accounts are on and the student is signed in. The rules are in supabase/week.sql.
   Each right answer (counted() in 10-core.js) is kept on this phone with the time it was given (stratos2.wk) and sent
   within 10 seconds, when the app is put away, when the connection comes back and when the table loads. The database
   decides which count: real questions only, not too close together, the same question once an hour, and at most 300
   in any 24 hours. Answers given while signed out are never kept, so they never count.
   The table is your total and each friend's, since Monday at midnight on this phone. Friends get only your call sign
   or username and your total. It is kept in memory only, and fetched when This week opens and every 30 seconds while
   it is on screen. Signed out, This week shows the sample friends, as before (70-social.js). */
const WK_KEY = 'stratos2.wk';
let wk = null;            /* the last answer from week_table: {uid, at, show (the switch), me (your total), friends} */
let wkBusy = false, wkAsked = 0, wkOffline = false, wkSending = null, wkTimer = 0;
const wkMine = () => signedIn() && wk && wk.uid === st.uid ? wk : null;
const wkShowing = () => pageIs('friends') && ui.ftab === 'week';
/* The answers waiting to be sent: {uid (whose they are), list: [{q, at}]}. */
function wkRead() { try { const s = JSON.parse(localStorage.getItem(WK_KEY) || 'null'); return s && Array.isArray(s.list) && s.list.length ? s : null; } catch (e) { return null; } }
function wkWrite(s) { try { if (s && s.list.length) localStorage.setItem(WK_KEY, JSON.stringify(s)); else localStorage.removeItem(WK_KEY); } catch (e) {} }
/* Sign out, Reset and Delete account: forget the table and anything waiting. */
function wkForget() { wk = null; wkOffline = false; clearTimeout(wkTimer); wkTimer = 0; wkWrite(null); }
/* Monday at midnight on this phone, when the week starts. */
function wkMonday() { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; }

/* A right answer, while signed in: keep it, and send it within 10 seconds. At most 400 wait, more than a day can count. */
function wkLog(q) {
  if (!ACCOUNTS || !st.uid || !q) return;
  let s = wkRead();
  if (!s || s.uid !== st.uid) s = {uid: st.uid, list: []};
  s.list.push({q: String(q).slice(0, 80), at: Date.now()});
  if (s.list.length > 400) s.list = s.list.slice(-400);
  wkWrite(s);
  if (!wkTimer) wkTimer = setTimeout(() => { wkTimer = 0; wkSend(); }, 10000);
}
/* Send what is waiting, 50 at a time. Answers kept for another account are dropped. With no connection they wait.
   One send at a time: a second call while one runs gets the same one. */
function wkSend() {
  if (!wkSending) wkSending = wkSendAll().finally(() => { wkSending = null; });
  return wkSending;
}
async function wkSendAll() {
  try {
    for (let i = 0; i < 8; i++) {
      const s = wkRead();
      if (!s) return;
      if (!st.uid || s.uid !== st.uid) { wkWrite(null); return; }
      if (!navigator.onLine) return;
      const part = s.list.slice(0, 50);
      await frCall('count_answers', {answers: part});
      /* Take away what was sent. New answers only ever join the end, so the ones sent are still at the front. */
      const now = wkRead();
      if (now && now.uid === s.uid) { now.list = now.list.slice(part.length); wkWrite(now); }
    }
  } catch (e) {}
}

/* Fetch the table, after sending anything waiting. Only redraws if something changed. */
async function wkLoad() {
  if (!ACCOUNTS || !st.uid || wkBusy) return;
  wkBusy = true; wkAsked = Date.now();
  const now = () => wkMine() ? JSON.stringify(Object.assign({}, wk, {at: 0})) : '', before = now(), wasOff = wkOffline;
  try {
    await wkSend();
    const d = await frCall('week_table', {since: wkMonday().toISOString()});
    wk = Object.assign(d, {uid: st.uid, at: Date.now()});
    wkOffline = false;
  } catch (e) { wkOffline = true; }
  wkBusy = false;
  if (before !== now() || wasOff !== wkOffline) wkRepaint();
}
function wkRepaint() {
  if (wkShowing()) paintPage('same');
  const af = $('#acctFr'); if (af) af.innerHTML = acctFrHtml();
}
setInterval(() => { if (wkShowing() && !document.hidden && navigator.onLine && st.uid) wkLoad(); }, 30000);
document.addEventListener('visibilitychange', () => {
  if (!st.uid) return;
  if (document.hidden) wkSend();
  else if (wkShowing() && navigator.onLine) wkLoad();
});
window.addEventListener('online', () => { if (st.uid && wkRead()) wkSend(); });
/* Answers left waiting from last time go once the app has started. */
setTimeout(() => { if (st.uid && wkRead()) wkSend(); }, 3000);

/* ---------- This week, signed in ----------
   Your row and each friend who shows on the table, most correct answers first. Equal totals share a place. */
function weekReal() {
  if (Date.now() - wkAsked > 3000) setTimeout(wkLoad, 0);
  const d = wkMine(), cap = '<p class="lb-cap">Correct answers since Monday, all subjects.</p>';
  if (!d) return cap + '<p class="fine fr-wait">' + (wkOffline ? 'This week’s table needs a connection.' : 'Loading this week’s table…') + '</p>';
  const rows = d.friends.map(x => ({name: frShown(x), initial: frInitial(x), n: x.n}))
    .concat([{name: saved.name || 'You', initial: esc((saved.name || 'You').charAt(0).toUpperCase()), n: d.me, you: true}])
    .sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));
  return cap + (wkOffline ? '<p class="fine fr-off">Offline. This table is from ' + new Date(d.at).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) + '.</p>' : '') +
    '<ol class="lb rows' + (rows.length > 9 ? ' wide' : '') + '">' + rows.map(r =>
      '<li' + (r.you ? ' class="you-row"' : '') + '><span class="rank">' + (1 + rows.filter(x => x.n > r.n).length) + '</span><span class="avatar">' + r.initial + '</span>' +
      '<span class="nm">' + esc(r.name) + (r.you && saved.name ? ' (you)' : '') + (r.you && !d.show ? '<span class="lb-sub">Hidden from friends</span>' : '') + '</span><span class="sc">' + r.n + '</span></li>').join('') + '</ol>' +
    (d.friends.length ? '' : '<p class="fine fr-none">Friends you add show here, unless they turn the table off.</p><div class="cta"><button class="ghost" type="button" data-act="wkadd">Add a friend</button></div>') +
    '<p class="fine fr-later">Counts answers given while signed in, up to 300 in 24 hours. Starts again Monday at midnight, your time.</p>';
}
/* Add a friend: the Messages tab, with the Add a friend sheet once the student has a username. */
ACT.wkadd = () => {
  ui.ftab = 'msgs'; paintPage('same');
  const d = frMine();
  if (d && d.me.username) ACT.fradd();
};

/* ---------- the switch on the account sheet ---------- */
function weekSetHtml() {
  const d = wkMine();
  if (!d && Date.now() - wkAsked > 3000) setTimeout(wkLoad, 0);
  return '<div class="rows fr-acct"><div class="set"><span class="t" id="setWeek">Show me on friends’ weekly table</span><button class="switch" type="button" data-act="wkshow" aria-pressed="' + (d ? d.show : true) + '" aria-labelledby="setWeek"><span></span></button></div></div>' +
    '<p class="fine">When this is off, friends don’t see you on This week. You still see them, and your answers still count.</p>';
}
ACT.wkshow = async b => {
  const d = wkMine(), on = !(d ? d.show : true);
  if (d) d.show = on;
  b.setAttribute('aria-pressed', on);
  try { await frCall('set_show_week', {show_on: on}); toast(on ? 'Friends can see you on the weekly table.' : 'Friends can’t see you on the weekly table now.'); }
  catch (e) { if (d) d.show = !on; if (b.isConnected) b.setAttribute('aria-pressed', !on); toast(frWhy(e)); return; }
  wkLoad();
};
