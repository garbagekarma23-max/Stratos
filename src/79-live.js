/* ---------- live: who is online now, and typing in a chat ----------
   Only while accounts are on and the student is signed in. The rules for both are in supabase/live.sql.
   Online: while the app is on screen, it checks in every 10 seconds on Friends or in a chat and every 20 elsewhere
   (online_now), which marks the student online for the next minute, unless they turned off "Show when I'm online". The answer is the refs of friends online now,
   never an id or a time. When the app goes into the background it says so, and the mark goes at once. Nothing about
   it is kept on this device.
   Typing: while an accepted chat is on screen, the app joins that chat's private channel in Supabase Realtime. It sends
   "typing" at most every 2 seconds while the student types, "stop" when the box empties or the chat closes, and "new"
   with the message number after a message is sent, so the friend's app fetches it at once. No text goes this way:
   messages still only come from chat_messages. Realtime lets in only the two friends, once the message request is
   accepted. If it can't be reached, the chat is fetched every 5 seconds, as before. */
let onl = null;           /* the last answer from online_now: {uid, online (refs), show (the switch)} */
let onAt = 0, onBusy = false;
function onMine() { return signedIn() && onl && onl.uid === st.uid ? onl : null; }
function isOnline(ref) { const o = onMine(); return !!(o && o.online.includes(ref)); }
/* The green dot and the word, next to a friend's name. */
function onlineTag(ref) { return isOnline(ref) ? '<i class="online">Online</i>' : ''; }

/* Check in (or, in the background, say this student has gone) and fetch which friends are online. Redraws only if
   that changed. Skipped for a student with no friends, once the switch is known. */
async function onCheck() {
  const d = frMine();
  if (!ACCOUNTS || !st.uid || onBusy || !d || (!d.friends.length && onMine())) return;
  onBusy = true; onAt = Date.now();
  try {
    const r = await frCall('online_now', {here: !document.hidden});
    const was = onMine(), before = was ? was.online.join() + was.show : '';
    onl = {uid: st.uid, online: r.online.slice().sort(), show: r.show};
    if (before !== onl.online.join() + onl.show) frRepaint();
  } catch (e) {} finally { onBusy = false; }
}
setInterval(() => {
  if (document.hidden || !navigator.onLine || !st.uid) return;
  if (Date.now() - onAt > (pageIs('friends') || pageIs('chat') ? 9500 : 19500)) onCheck();
}, 1000);
document.addEventListener('visibilitychange', () => { if (st.uid && navigator.onLine && onMine()) { onBusy = false; onCheck(); } liveSync(); });
/* Signing out: take this student's mark away first, while the sign-in still works. Waits at most a second and a half. */
function liveBye() {
  liveLeave();
  const go = sb && onMine() ? sb.rpc('online_now', {here: false}).then(() => {}, () => {}) : Promise.resolve();
  onl = null; rtNo = {};
  return Promise.race([go, new Promise(ok => setTimeout(ok, 1500))]);
}
function liveForget() { liveLeave(); onl = null; rtNo = {}; }

/* ---------- the switch on the account sheet ---------- */
function onlineSetHtml() {
  const o = onMine();
  if (!o) setTimeout(onCheck, 0);
  return '<div class="rows fr-acct"><div class="set"><span class="t" id="setOnline">Show when I’m online</span><button class="switch" type="button" data-act="frshowon" aria-pressed="' + (o ? o.show : true) + '" aria-labelledby="setOnline"><span></span></button></div></div>' +
    '<p class="fine">When this is off, nobody sees when you’re online. You still see friends who show it. Stratos keeps no record of when you were online.</p>';
}
ACT.frshowon = async b => {
  const o = onMine(), on = !(o ? o.show : true);
  if (o) o.show = on;
  b.setAttribute('aria-pressed', on);
  try { await frCall('set_show_online', {show_on: on}); toast(on ? 'Friends can see when you’re online.' : 'Nobody can see when you’re online now.'); }
  catch (e) { if (o) o.show = !on; if (b.isConnected) b.setAttribute('aria-pressed', !on); toast(frWhy(e)); return; }
  onBusy = false; onCheck();
};

/* ---------- the chat's channel in Realtime ---------- */
let rt = null;            /* the channel joined now: {ref, ch, joined, sentAt, mine (typing sent), hide, soon, fetchAt} */
let rtNo = {};            /* chats whose channel was refused or failed, and until when not to try again */
const RT_GAP = 2000, RT_HIDE = 4000;
/* True while the open chat's channel is joined, so the chat can be fetched less often (77-messages.js). */
function liveOn(ref) { return !!(rt && rt.ref === ref && rt.joined); }
/* The chat that should have a channel now: accepted, on screen, still a friend, the app in front and online. */
function liveWant() {
  return ACCOUNTS && sb && st.uid && !document.hidden && navigator.onLine && cv && cv.loaded && cv.state === 'open' &&
    pageIs('chat', cv.ref) && frFind('friends', cv.ref) ? cv.ref : null;
}
/* Join or leave to match. Runs every second, and whenever the chat or the app changes. */
function liveSync() {
  const want = liveWant();
  if (rt && rt.ref !== want) liveLeave();
  if (want && !rt && !((rtNo[want] || 0) > Date.now())) liveJoin(want);
}
setInterval(liveSync, 1000);
function liveJoin(ref) {
  const ch = sb.channel('chat:' + ref, {config: {private: true, broadcast: {self: false, ack: false}}});
  const me = rt = {ref: ref, ch: ch, joined: false, sentAt: 0, mine: false, hide: 0, soon: 0, fetchAt: 0};
  ch.on('broadcast', {event: 'typing'}, () => theyType(me, true))
    .on('broadcast', {event: 'stop'}, () => theyType(me, false))
    .on('broadcast', {event: 'new'}, () => { theyType(me, false); liveFetch(me); })
    .subscribe(status => {
      if (rt !== me) return;
      me.joined = status === 'SUBSCRIBED';
      /* Joined: fetch anything sent before the channel was ready. Refused or failed: fetch every 5 seconds instead,
         and try again in a minute. */
      if (me.joined) liveFetch(me);
      else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') { rtNo[ref] = Date.now() + 60000; liveLeave(); }
    });
}
function liveLeave() {
  const me = rt; if (!me) return;
  if (me.mine) liveSend(me, 'stop');
  rt = null;
  clearTimeout(me.hide); clearTimeout(me.soon);
  if (cv && cv.ref === me.ref && cv.theyType) { cv.theyType = false; typingPaint(); }
  try { sb.removeChannel(me.ch).catch(() => {}); } catch (e) {}
}
/* Block or remove: leave at once, and don't join again before the list catches up. */
function liveDrop(ref) { if (rt && rt.ref === ref) { rtNo[ref] = Date.now() + 864e5; liveLeave(); } }
function liveSend(me, event, payload) {
  if (!me || !me.joined) return;
  try { me.ch.send({type: 'broadcast', event: event, payload: payload || {}}).catch(() => {}); } catch (e) {}
}
/* The box changed: say typing (at most every 2 seconds), or stop once it is empty. */
function liveTyping(text) {
  const me = rt;
  if (!me || !me.joined || !cv || me.ref !== cv.ref) return;
  if (!text.trim()) { if (me.mine) { me.mine = false; me.sentAt = 0; liveSend(me, 'stop'); } return; }
  if (Date.now() - me.sentAt < RT_GAP) return;
  me.mine = true; me.sentAt = Date.now();
  liveSend(me, 'typing');
}
/* A message was sent: tell the friend's app its number, so it fetches it now. This also ends typing there. */
function liveSent(n) {
  const me = rt;
  if (!me || !cv || me.ref !== cv.ref) return;
  me.mine = false; me.sentAt = 0;
  liveSend(me, 'new', {n: n});
}
/* The friend is typing, or stopped. The bubble goes 4 seconds after the last word from them. */
function theyType(me, on) {
  if (rt !== me || !cv || cv.ref !== me.ref) return;
  clearTimeout(me.hide);
  if (on) me.hide = setTimeout(() => theyType(me, false), RT_HIDE);
  if (!!cv.theyType === on) return;
  cv.theyType = on;
  typingPaint();
}
/* Fetch new messages, at most once a second, however many "new" arrive. */
function liveFetch(me) {
  if (rt !== me || me.soon) return;
  me.soon = setTimeout(() => {
    me.soon = 0; me.fetchAt = Date.now();
    if (rt === me && cv && cv.ref === me.ref) chatFetch(false);
  }, Math.max(0, 1000 - (Date.now() - me.fetchAt)));
}
