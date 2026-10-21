/* ---------- messages between real friends ----------
   Only while accounts are on and the student is signed in. Everything goes through the functions in
   supabase/messages.sql, which check who is asking, keep every limit and filter every message before it is saved, so
   nothing here has to be trusted. A chat is named by its friendship's ref, never by the other student's account id.
   Messages are never saved on this device: a chat is fetched when it opens, and new messages are asked for every 5
   seconds while it is on screen. The list of chats (who has unread messages or a request) comes with the friends
   list, every 10 seconds on Friends and every 30 seconds elsewhere, for the dot on Home. */
let chs = null;          /* the last answer from chats_state, with uid (whose it is) */
let cv = null;           /* the chat open now: {ref, state, list, more, ban, loaded} */
let cvBusy = false, warnShown = false;
const MAX_MSG = 500;
const msMine = () => signedIn() && chs && chs.uid === st.uid ? chs : null;
const msChat = ref => { const c = msMine(); return (c && c.chats.find(x => x.ref === ref)) || {state: 'none', unread: 0, last: null}; };
/* Unread messages and message requests waiting, for the dot on Home and You. */
function msUnread() { const c = msMine(); return c ? c.chats.reduce((n, x) => n + (x.state === 'open' ? x.unread : 0) + (x.state === 'asked' ? 1 : 0), 0) : 0; }
function msForget() { chs = null; cv = null; warnShown = false; }
async function msLoadList() {
  const c = await frCall('chats_state');
  chs = Object.assign(c, {uid: st.uid});
}
/* Characters as the database counts them, so an emoji counts once. */
const msLen = s => Array.from(s).length;

/* Help details follow the country saved on the subject sheet, or the phone's guess if none is saved yet. */
function helpLine() {
  const c = (saved.place && saved.place.country) || ((guessPlace() || {}).country);
  return c === 'AU'
    ? 'Kids Helpline: <a href="tel:1800551800">1800 55 1800</a>, any time. In an emergency, call 000.'
    : 'Find free support in your country at <a href="https://findahelpline.com" target="_blank" rel="noopener">findahelpline.com</a>. In an emergency, call your local emergency number.';
}
const banText = b => b && b.until ? 'You can’t send messages until ' + dayText(b.until, true) + '.' : 'Messaging is turned off for your account.';
const SEND_SAY = {
  word: 'That message has a word Stratos doesn’t allow. Change it to send.',
  bullying: 'Stratos doesn’t send messages telling someone to hurt themselves.',
  email: 'Messages can’t have email addresses.',
  link: 'Messages can’t have links or website addresses.',
  offsite: 'Keep chats on Stratos. Messages can’t have @handles or ask to chat on other apps.',
  phone: 'Messages can’t have phone numbers. Write big numbers with commas, like 1,250,000.',
  soon: 'You’re sending messages quickly. Wait a minute, then try again.',
  day: 'You’ve sent 300 messages today. Try again tomorrow.',
  long: 'Messages can be up to 500 characters.',
  gone: 'You’re no longer friends, so you can’t send messages.'
};

/* ---------- the chat page ---------- */
/* When the time between two messages is more than 15 minutes, a small line says when. */
function whenText(t) {
  const d = new Date(t), now = new Date(), time = d.toLocaleTimeString('en-AU', {hour: 'numeric', minute: '2-digit'});
  const day = x => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime(), diff = Math.round((day(now) - day(d)) / 864e5);
  if (diff === 0) return 'Today ' + time;
  if (diff === 1) return 'Yesterday ' + time;
  return d.toLocaleDateString('en-AU', {weekday: 'short', day: 'numeric', month: 'short'}) + ', ' + time;
}
function msgsHtml(f) {
  const name = esc(frShown(f));
  let h = cv.more ? '<button class="textbtn ms-earlier" type="button" data-act="mearlier">Show earlier messages</button>' : '', last = 0;
  if (!cv.list.length) h += '<p class="sys">No messages yet. Say hello.</p>';
  cv.list.forEach(m => {
    const t = new Date(m.at).getTime();
    if (t - last > 15 * 60000) h += '<p class="sys ms-when">' + whenText(m.at) + '</p>';
    last = t;
    h += '<div class="msg' + (m.mine ? ' mine' : '') + '" data-n="' + m.n + '">' +
      (m.mine ? '<div class="bubble ms">' + esc(m.text) + '</div>' : '<button class="bubble ms" type="button" data-act="mmsg" data-n="' + m.n + '">' + esc(m.text) + '</button>') + '</div>';
    if (m.care) h += '<p class="care' + (m.mine ? ' mine' : '') + '">' + (m.mine ? 'If you’re not okay, you don’t have to deal with it alone. ' + helpLine()
      : name + ' might be going through something. Check in with them, and tell an adult you trust if you’re worried.') + '</p>';
  });
  return h;
}
PAGE.chat = ref => {
  const f = frFind('friends', ref);
  if (!f) return {title: 'Chat', cls: 'thread', html: '<p class="sys">You’re no longer friends, so you can’t send messages.</p>'};
  const name = frShown(f), n = esc(name);
  if (!cv || cv.ref !== ref) { cv = {ref: ref, state: msChat(ref).state, list: [], more: false, ban: null, loaded: false, at: 0}; setTimeout(() => chatFetch(true), 0); }
  else if (Date.now() - cv.at > 1500) setTimeout(() => chatFetch(false), 0);  /* opened again: fetch what is new now */
  const more = '<button class="icon-btn" type="button" data-act="frfriend" data-ref="' + ref + '" aria-label="About ' + n + '">' + IC.more + '</button>';
  const page = {title: name, avatar: '<span class="avatar">' + frInitial(f) + '</span>', right: more, cls: 'thread', bottom: true};
  if (!cv.loaded) return Object.assign(page, {html: '<p class="sys">' + (frOffline ? 'No connection. This chat will show once you are online.' : 'Loading.') + '</p>'});
  if (cv.state === 'none') {
    return Object.assign(page, {cls: 'thread ms-ask', html: '<p class="sys">You and ' + n + ' are friends. Send a message request to start chatting. ' + n + ' can accept or decline.</p>' +
      '<div class="cta"><button class="primary" type="button" data-act="mask">Send message request</button></div>' +
      '<p class="fine">Messages are text only. Stratos doesn’t send messages with links, phone numbers, email addresses or words it doesn’t allow.</p>'});
  }
  if (cv.state === 'sent') {
    return Object.assign(page, {cls: 'thread ms-ask', html: '<p class="sys">Message request sent. You can message ' + n + ' once they accept.</p>' +
      '<div class="cta"><button class="ghost" type="button" data-act="mcancel">Cancel request</button></div>'});
  }
  if (cv.state === 'asked') {
    return Object.assign(page, {cls: 'thread ms-ask', html: '<h3 class="h2">' + n + ' wants to message you.</h3>' +
      '<p class="sub">Accept only if you know ' + n + ' and want to chat. You can block them at any time.</p>' +
      '<div class="cta"><button class="primary" type="button" data-act="maccept">Accept</button><button class="ghost" type="button" data-act="mdecline">Decline</button></div>'});
  }
  const foot = cv.ban
    ? '<footer class="composer ms-banned"><p class="sub">' + banText(cv.ban) + '</p><p class="fine">This is because of a report. You can still read your chats, and friends still work. Questions? Email support@stratosstudy.com.</p></footer>'
    : '<footer class="composer ms-box"><p class="fine err" id="msErr" role="alert" hidden></p><div class="ms-row">' +
      '<textarea id="msgIn" rows="1" placeholder="Message" aria-label="Message to ' + n + '" autocomplete="off"></textarea>' +
      '<button class="primary sm" type="button" data-act="msend" disabled>Send</button></div><p class="fine ms-count" aria-live="polite" hidden></p></footer>';
  return Object.assign(page, {html: '<p class="sys">Only you and ' + n + ' can read this chat. Messages are deleted after 90 days.</p>' + msgsHtml(f), foot: foot});
};

/* Redraw the chat, keeping what is typed in the box, where the cursor is, and the place in the list (or the bottom,
   if the student was already there). */
function chatRepaint() {
  if (!cv || !pageIs('chat', cv.ref)) return;
  const i = $('#msgIn'), v = i ? i.value : '', focused = i && document.activeElement === i, s0 = i ? i.selectionStart : 0, s1 = i ? i.selectionEnd : 0;
  const err = $('#msErr'), errText = err && !err.hidden ? err.textContent : '';
  const body = $('.p-body', pagesEl), atEnd = !body || body.scrollHeight - body.scrollTop - body.clientHeight < 80, keep = body ? body.scrollTop : 0;
  paintPage('same');
  const j = $('#msgIn');
  if (j) { j.value = v; boxChanged(j); if (focused) { j.focus({preventScroll: true}); j.setSelectionRange(s0, s1); } }
  if (errText) msErr(errText);
  const nb = $('.p-body', pagesEl);
  if (nb && !atEnd) nb.scrollTop = keep;
}
/* Fetch the chat: everything (when it opens) or only what is new. */
async function chatFetch(full) {
  if (!cv || cvBusy) return;
  const ref = cv.ref, after = !full && cv.loaded && cv.list.length ? cv.list[cv.list.length - 1].n : 0;
  cvBusy = true;
  let r = null;
  try { r = await frCall('chat_messages', {friend: ref, after_n: after}); frOffline = false; } catch (e) { frOffline = true; }
  cvBusy = false;
  if (!cv || cv.ref !== ref) return;
  if (!r) { if (!cv.loaded) chatRepaint(); return; }
  if (r.result === 'gone') { frLoad(); return; }
  const before = cv.state + JSON.stringify(cv.ban) + cv.list.length + cv.loaded;
  if (full || !cv.loaded || after === 0) { cv.list = r.messages; cv.more = r.more; }
  else r.messages.forEach(m => { if (!cv.list.some(x => x.n === m.n)) cv.list.push(m); });
  cv.state = r.state; cv.ban = r.ban; cv.loaded = true; cv.at = Date.now();
  /* Fetching counts the messages as seen, so the dot goes. */
  const c = msMine() && msMine().chats.find(x => x.ref === ref), seen = !!(c && (c.unread || c.state !== r.state));
  if (c) { c.state = r.state; c.unread = 0; }
  if (before !== cv.state + JSON.stringify(cv.ban) + cv.list.length + cv.loaded) chatRepaint();
  if (seen || before !== cv.state + JSON.stringify(cv.ban) + cv.list.length + cv.loaded) frRepaint();
}
setInterval(() => { if (cv && pageIs('chat', cv.ref) && !document.hidden && navigator.onLine && st.uid) chatFetch(false); }, 5000);
/* The list of chats, for the dot, while Friends and the chat are not on screen. */
setInterval(() => { if (!pageIs('friends') && !pageIs('chat') && !document.hidden && navigator.onLine && st.uid) frLoad(); }, 30000);
ACT.mearlier = async b => {
  if (!cv || !cv.list.length) return;
  b.disabled = true;
  try {
    const r = await frCall('chat_messages', {friend: cv.ref, before_n: cv.list[0].n});
    if (r.result !== 'ok' || !cv) return;
    const body = $('.p-body', pagesEl), fromEnd = body ? body.scrollHeight - body.scrollTop : 0;
    cv.list = r.messages.concat(cv.list); cv.more = r.more;
    chatRepaint();
    const nb = $('.p-body', pagesEl); if (nb) nb.scrollTop = nb.scrollHeight - fromEnd;
  } catch (e) { toast(frWhy(e)); } finally { if (b.isConnected) b.disabled = false; }
};

/* ---------- the box and Send ---------- */
function msErr(msg) { const e = $('#msErr'); if (e) { e.textContent = msg; e.hidden = !msg; } }
/* The box grows to about five lines. The count shows from 400 characters. Send works once something is typed. */
function boxChanged(i) {
  i.style.height = 'auto';
  i.style.height = Math.min(i.scrollHeight, 132) + 'px';
  const len = msLen(i.value), c = $('.ms-count'), b = $('[data-act="msend"]');
  if (c) { c.hidden = len < 400; c.textContent = len + ' of ' + MAX_MSG; c.classList.toggle('over', len > MAX_MSG); }
  if (b) b.disabled = !i.value.trim();
}
ACT.msend = async b => {
  const i = $('#msgIn'); if (!i || !cv) return;
  const text = i.value, ref = cv.ref;
  if (!text.trim()) return;
  if (msLen(text.trim()) > MAX_MSG) { msErr(SEND_SAY.long); return; }
  b.disabled = true; msErr('');
  let r;
  try { r = await frCall('send_message', {friend: ref, body: text}); }
  catch (e) { msErr(navigator.onLine ? frWhy(e) : 'No connection. Your message is still in the box.'); if (b.isConnected) b.disabled = false; return; }
  if (!cv || cv.ref !== ref) return;
  if (r.result === 'ok') {
    /* Sent: the box empties and the message joins the chat. Anything that came in meanwhile is fetched too. */
    const j = $('#msgIn'); if (j) { j.value = ''; boxChanged(j); }
    if (cv.list.length && cv.list[cv.list.length - 1].n < r.n - 1) await chatFetch(false);
    else cv.list.push({n: r.n, mine: true, text: text.trim(), at: r.at, care: r.care});
    chatRepaint();
    const body = $('.p-body', pagesEl); if (body) body.scrollTop = body.scrollHeight;
    if (r.care) say('Sent. If you’re not okay, you don’t have to deal with it alone.');
    return;
  }
  /* Not sent: it stays in the box, with one line saying why. */
  if (r.result === 'banned') { cv.ban = {until: r.until || null}; chatRepaint(); return; }
  if (r.result === 'closed' || r.result === 'gone') { msErr(SEND_SAY.gone); chatFetch(true); frLoad(); return; }
  msErr(SEND_SAY[r.result] || 'Something went wrong. Try again in a moment.');
  if (b.isConnected) b.disabled = false;
};
app.addEventListener('input', ev => { if (ev.target.id === 'msgIn') { boxChanged(ev.target); if (!$('#msErr').hidden) msErr(''); } });
/* On a computer keyboard Enter sends, and Shift and Enter starts a new line. On a phone Enter is a new line. */
app.addEventListener('keydown', ev => {
  if (ev.target.id !== 'msgIn' || ev.key !== 'Enter' || ev.shiftKey || ev.isComposing) return;
  if (!(window.matchMedia && matchMedia('(pointer: fine)').matches)) return;
  ev.preventDefault();
  const b = $('[data-act="msend"]'); if (b && !b.disabled) b.click();
});

/* ---------- message requests ---------- */
async function reqChange(b, fn, done) {
  if (!cv) return;
  const ref = cv.ref, f = frFind('friends', ref), n = f ? frShown(f) : 'them';
  b.disabled = true;
  try {
    const r = await frCall(fn, {friend: ref});
    const res = typeof r === 'string' ? r : r.result;
    closeSheet();
    if (res === 'banned') toast(banText({until: r.until || null}));
    else toast(done(res, n));
  } catch (e) { toast(frWhy(e)); if (b.isConnected) b.disabled = false; }
  await chatFetch(true);
  frLoad();
}
ACT.mask = b => reqChange(b, 'ask_to_message', (r, n) => ({sent: 'Message request sent.', sent_already: 'Message request sent.', open: 'You can message ' + n + ' now.',
  open_already: 'You can message ' + n + ' now.', day: 'You’ve sent 10 message requests today. Try again tomorrow.'})[r] || SEND_SAY.gone);
ACT.maccept = b => reqChange(b, 'accept_message_request', (r, n) => r === 'open' ? 'You can message ' + n + ' now.' : 'That request is no longer there.');
ACT.mcancel = b => reqChange(b, 'cancel_message_request', () => 'Request cancelled.');
ACT.mdeclineok = b => reqChange(b, 'decline_message_request', () => 'Declined.');
ACT.mdecline = () => {
  if (!cv) return;
  const f = frFind('friends', cv.ref); if (!f) return;
  const n = esc(frShown(f));
  openSheet('Decline ' + frShown(f) + '’s message request?',
    '<p class="sub">They won’t be told. You stay friends.</p>' +
    '<div class="cta"><button class="ghost" type="button" data-act="mdeclineok">Decline</button></div>' +
    '<button class="textbtn danger" type="button" data-act="frblock" data-ref="' + f.ref + '" data-now="1">Decline and block</button>' +
    '<p class="fine">Blocking also removes ' + n + ' as a friend and stops their requests.</p>');
};

/* ---------- report ---------- */
const REASONS = [['bullying', 'Bullying or threats'], ['sexual', 'Sexual or rude'], ['personal', 'Asking for personal details or to meet'],
  ['harm', 'Hurting themselves or others'], ['spam', 'Spam'], ['other', 'Something else']];
ACT.mmsg = b => {
  if (!cv) return;
  const m = cv.list.find(x => x.n === +b.dataset.n), f = frFind('friends', cv.ref); if (!m || !f) return;
  openSheet('Message from ' + frShown(f), '<blockquote class="ms-quote">' + esc(m.text) + '</blockquote>' +
    '<div class="cta"><button class="ghost" type="button" data-act="mreport" data-n="' + m.n + '">Report message</button></div>');
};
ACT.mreport = b => {
  if (!cv) return;
  const f = frFind('friends', cv.ref); if (!f) return;
  openSheet('Report this message', '<p class="sub">' + esc(frShown(f)) + ' won’t be told. Stratos will see this message and the messages around it.</p>' +
    '<p class="fine err" id="msRepErr" role="alert" hidden></p>' +
    '<div class="picks">' + REASONS.map(r => '<button class="pick" type="button" data-act="mreportas" data-n="' + b.dataset.n + '" data-why="' + r[0] + '"><span class="t">' + r[1] + '</span>' + IC.right + '</button>').join('') + '</div>');
};
ACT.mreportas = async b => {
  if (!cv) return;
  const f = frFind('friends', cv.ref); if (!f) return;
  const n = esc(frShown(f)), why = b.dataset.why;
  $$('#sheetBody .pick').forEach(x => { x.disabled = true; });
  let r;
  try { r = await frCall('report_message', {friend: cv.ref, n: +b.dataset.n, reason: why}); }
  catch (e) { r = null; const err = $('#msRepErr'); if (err) { err.textContent = frWhy(e); err.hidden = false; } }
  if (r !== 'ok') {
    const err = $('#msRepErr');
    if (r && err) { err.textContent = r === 'already' ? 'You’ve reported this message already.' : r === 'day' ? 'You’ve sent 20 reports today. Try again tomorrow.' : 'That message can’t be reported now.'; err.hidden = false; }
    $$('#sheetBody .pick').forEach(x => { x.disabled = false; });
    return;
  }
  openSheet('Thanks for reporting', '<p class="sub">Stratos will look at it. Do you want to block ' + n + ' too? Blocking removes them as a friend and deletes this chat for both of you.</p>' +
    (why === 'harm' ? '<p class="fine care-help">' + helpLine() + '</p>' : '') +
    '<div class="cta"><button class="ghost danger" type="button" data-act="frblock" data-ref="' + f.ref + '" data-now="1">Block ' + n + '</button><button class="ghost" type="button" data-act="sheetclose">Not now</button></div>');
};

/* ---------- a warning from a report ---------- */
/* Shown once, the next time Friends or a chat opens after a warning. */
function msWarnCheck() {
  const c = msMine();
  if (!c || !c.me.warned || warnShown || !sheet.hidden || !(pageIs('friends') || pageIs('chat'))) return;
  warnShown = true;
  openSheet('A message you sent was reported',
    '<p class="sub">Stratos checked it, and it breaks the rules for messages: be kind, nothing sexual, nothing about hurting anyone, and no phone numbers, addresses, links or other apps. If it happens again, your account may lose messaging.</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="mwarnok">OK</button></div>');
}
ACT.mwarnok = async () => {
  closeSheet();
  try { await frCall('seen_notice'); if (msMine()) msMine().me.warned = false; } catch (e) { warnShown = false; }
};
