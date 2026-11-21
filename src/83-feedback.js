/* ---------- Could we improve this? ----------
   A quiet link under each Learn card (and worked example) and under each question once it is answered, in Learn,
   Practice, challenges and races. It opens a sheet: one reason, an optional note, and Send. The rules are in
   supabase/feedback.sql.
   What is sent: the point's id, which part (the card or one of its lines, question a or b, a maths worked example or
   question), the reason, the note, the course open and the app's version. Nothing about the student. A signed-in
   student's account goes with it only because the library sends the sign-in with every call; the database keeps it to
   count the limit and never shows it.
   Like right answers for the weekly table (76-week.js), each one is kept on the phone first (stratos2.fb) and sent at
   once, or when the connection comes back, the app comes back on screen, or a moment after it opens. Signed out, the
   Supabase library loads only when there is feedback to send. With accounts switched off there is nowhere to send it,
   so the link does not show. */
const FB_KEY = 'stratos2.fb', FB_MOST = 20, FB_DAYS = 30, FB_NOTE = 300;
/* The app's version: the day and commit it was built from. build.py writes it in. */
const APP_VERSION = '__APP_VERSION__';
const FB_REASONS = [['wrong', 'The answer is wrong'], ['unclear', 'The question is unclear'], ['typo', 'There’s a typo'], ['other', 'Something else']];
let fbSending = null;

/* The link. part is card, a, b, example or question. It starts hidden on a question, and shows once it is answered.
   A screen reader hears what it is about ("Could we improve this question?"); the screen shows only the short words. */
function fbLink(pid, part, hidden) {
  if (!ACCOUNTS) return '';
  const what = part === 'card' ? 'card' : part === 'example' ? 'worked example' : 'question';
  return '<button class="fbk" type="button" data-act="fbk" data-p="' + esc(pid) + '" data-part="' + part + '"' + (hidden ? ' hidden' : '') + '>Could we improve this<span class="sr"> ' + what + '?</span><span aria-hidden="true">?</span></button>';
}
/* Show the link on a slide whose question is over. */
function fbShow(sec) { const b = $('.fbk', sec); if (b) b.hidden = false; }

function fbRead() { try { const s = JSON.parse(localStorage.getItem(FB_KEY) || '[]'); return Array.isArray(s) ? s : []; } catch (e) { return []; } }
function fbWrite(list) { try { if (list.length) localStorage.setItem(FB_KEY, JSON.stringify(list)); else localStorage.removeItem(FB_KEY); } catch (e) {} }

/* A card line in a few words, for the list of parts. */
function fbLineText(l) {
  const t = plainTx(Array.isArray(l) ? l[0] + ': ' + l[1] : l).replace(/\s+/g, ' ').trim();
  return t.length > 48 ? t.slice(0, 46).replace(/\s+\S*$/, '') + '…' : t;
}

ACT.fbk = b => {
  const p = PT[b.dataset.p], part = b.dataset.part;
  if (!p) return;
  const what = part === 'card' ? 'Card' : part === 'example' ? 'Worked example' : 'Question';
  const lines = part === 'card' && Array.isArray(p.card) ? p.card : [];
  openSheet('Could we improve this?',
    '<p class="sub">' + what + ': ' + esc(p.title) + '</p>' +
    '<div class="fb" data-p="' + esc(p.id) + '" data-part="' + part + '">' +
    (lines.length > 1 ? '<label class="fb-l" for="fbPart">Which part?</label><select id="fbPart" class="fb-sel"><option value="card">The whole card</option>' +
      lines.map((l, i) => '<option value="card ' + (i + 1) + '">Line ' + (i + 1) + ': ' + esc(fbLineText(l)) + '</option>').join('') + '</select>' : '') +
    '<fieldset class="fb-why"><legend class="fb-l">What’s the problem?</legend>' +
      FB_REASONS.map(r => '<label class="fb-r"><input type="radio" name="fbWhy" value="' + r[0] + '"><span>' + r[1] + '</span></label>').join('') +
    '</fieldset>' +
    '<label class="fb-l" for="fbNote">Anything to add? (optional)</label>' +
    '<textarea id="fbNote" class="fb-note" rows="3" maxlength="' + FB_NOTE + '" aria-describedby="fbHint fbCount" autocomplete="off"></textarea>' +
    '<p class="fine fb-hint"><span id="fbHint">Please don’t include your name or personal details.</span> <span id="fbCount" class="fb-count">0 of ' + FB_NOTE + '</span></p>' +
    '<p class="fine err" id="fbErr" role="alert" hidden></p>' +
    '<div class="cta"><button class="primary" type="button" data-act="fbsend">Send</button></div></div>');
};
sheetBody.addEventListener('input', ev => {
  if (ev.target.id !== 'fbNote') return;
  const c = $('#fbCount'); if (c) c.textContent = ev.target.value.length + ' of ' + FB_NOTE;
});
sheetBody.addEventListener('change', ev => {
  if (ev.target.name === 'fbWhy') { const e = $('#fbErr'); if (e) e.hidden = true; }
});

ACT.fbsend = () => {
  const box = $('.fb', sheetBody), pick = $('input[name="fbWhy"]:checked', sheetBody), err = $('#fbErr');
  if (!box) return;
  if (!pick) {
    err.textContent = 'Choose what the problem is first.'; err.hidden = false;
    $('input[name="fbWhy"]', sheetBody).focus();
    return;
  }
  const sel = $('#fbPart'), note = ($('#fbNote').value || '').trim().slice(0, FB_NOTE);
  const list = fbRead();
  list.push({point: box.dataset.p, part: sel ? sel.value : box.dataset.part, why: pick.value, note: note,
             course: /^[a-z0-9-]{1,60}$/.test(SUB.id) ? SUB.id : 'unknown', version: APP_VERSION, at: Date.now()});
  fbWrite(list.slice(-FB_MOST));
  closeSheet();
  toast('Thanks. We’ll take a look.');
  fbSend();
};

/* Send what is waiting, oldest first. A word back from the database (ok, or a refusal such as limit) means it is done
   with, so it leaves the phone. With no connection, or if the database can't be reached, it waits for next time.
   Feedback older than 30 days is dropped. One send at a time. */
function fbSend() {
  if (!fbSending) fbSending = fbSendAll().finally(() => { fbSending = null; });
  return fbSending;
}
async function fbSendAll() {
  if (!ACCOUNTS) return;
  let list = fbRead().filter(x => x && x.point && Date.now() - (x.at || 0) < FB_DAYS * 864e5);
  fbWrite(list);
  if (!list.length || !navigator.onLine) return;
  try {
    await loadSupabase();
    /* A signed-in student's call carries their sign-in, so the database counts the limit for them. */
    if (st.uid && !acctUser) await sb.auth.getSession();
    while (list.length) {
      const x = list[0];
      const r = await sb.rpc('add_feedback', {point_id: x.point, which_part: x.part, why: x.why, note_text: x.note || null, course_id: x.course, app_version: x.version});
      if (r.error || typeof r.data !== 'string') return;
      /* Take away what was sent. New feedback only ever joins the end. */
      list = fbRead();
      if (list.length && list[0].at === x.at && list[0].point === x.point) list.shift();
      fbWrite(list);
    }
  } catch (e) {}
}
window.addEventListener('online', () => { if (fbRead().length) fbSend(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && fbRead().length) fbSend(); });
setTimeout(() => { if (fbRead().length) fbSend(); }, 3000);
