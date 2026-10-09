/* ---------- slides: the pieces Learn and Practice share ---------- */
const actBtn = (name, ic, label) => '<button class="act" type="button" data-act="' + name + '">' + ic + label + '</button>';
const whyHtml = q => '<b>Why</b><p>' + esc(q.why) + '</p>';

/* One question as a slide. S is the session it belongs to and i is its place in S.items. */
function qEl(S, i, learn) {
  const it = S.items[i], p = PT[it.p], q = p[it.k], sec = document.createElement('section');
  let meta, acts = '';
  if (learn) {
    meta = '<span>Check</span><span>' + esc(p.title) + '</span>';
    acts = actBtn('clue', IC.clue, 'Clue');
  } else {
    meta = '<span>Question ' + (i + 1) + (S.mode !== 'race' && !it.back ? ' of ' + S.total : '') + '</span><span>Chapter ' + (p.ci + 1) + '</span>' + (it.back ? '<span class="back">Back again</span>' : '');
    if (S.mode === 'mix' || S.mode === 'chapter') acts = actBtn('clue', IC.clue, 'Clue') + actBtn('reveal', IC.eye, 'Answer') + (it.back ? '' : actBtn('skip', IC.skip, 'Skip'));
  }
  sec.className = 'slide q'; sec.dataset.i = i;
  sec.innerHTML =
    '<p class="meta">' + meta + '</p>' +
    '<h2 class="qtext">' + esc(q.q) + '</h2>' +
    '<div class="opts" role="group" aria-label="Answer choices">' +
      it.perm.map((oi, n) => '<button class="opt" type="button" data-act="opt" data-n="' + n + '"><span class="key">' + 'ABCD'.charAt(n) + '</span><span class="txt">' + esc(q.opts[oi]) + '</span><span class="mk">' + IC.tick + IC.cross + '</span></button>').join('') +
    '</div>' +
    '<div class="note" hidden></div>' +
    '<div class="foot">' + (acts ? '<div class="actions">' + acts + '</div>' : '') + '<button class="next" type="button" data-act="nextslide" hidden>Next' + IC.down + '</button></div>';
  return sec;
}
/* Show how a question turned out: mark the options and explain. */
function paintResolved(S, sec, i, learn) {
  const it = S.items[i], q = PT[it.p][it.k], r = S.res[i];
  const opts = $$('.opt', sec), rightN = it.perm.indexOf(0), note = $('.note', sec), acts = $('.actions', sec);
  sec.classList.add('done');
  opts.forEach(b => { b.disabled = true; });
  note.hidden = false; note.className = 'note';
  if (r.o === 'correct') {
    opts[r.pick].classList.add('is-right');
    if (learn) note.innerHTML = whyHtml(q);
    else { note.className = 'note quiet'; note.innerHTML = '<button class="whybtn" type="button" data-act="why">Why is that right?</button>'; }
  } else if (r.o === 'wrong') {
    opts[r.pick].classList.add('is-wrong');
    opts[rightN].classList.add('is-right', 'shown');
    note.innerHTML = whyHtml(q) + (learn ? '<p class="after">Marked as a weak point. Practice will bring it back.</p>' : '');
  } else if (r.o === 'revealed') {
    opts[rightN].classList.add('is-right', 'shown');
    note.innerHTML = whyHtml(q);
  } else if (r.o === 'closed') {
    note.className = 'note quiet';
    note.innerHTML = '<p>The race ended before you answered.</p>';
  } else {
    note.className = 'note quiet';
    note.innerHTML = '<p>Skipped. This one comes back at the end.</p>';
  }
  if (acts) acts.hidden = true;
}
function paintClue(sec, q) {
  const note = $('.note', sec), b = $('[data-act="clue"]', sec);
  note.hidden = false; note.className = 'note';
  note.innerHTML = '<b>Clue</b><p>' + esc(q.clue) + '</p>';
  if (b) b.disabled = true;
}
/* The slide that fills the screen right now. */
function viewing(f) {
  let best = f.firstElementChild;
  const top = f.scrollTop + 12;
  for (let i = 0; i < f.children.length; i++) { if (f.children[i].offsetTop <= top) best = f.children[i]; else break; }
  return best;
}
function scrollToEl(f, el) { f.scrollTo({top: el.offsetTop, behavior: reduce ? 'auto' : 'smooth'}); }
function showFoot(sec) {
  const f = $('.foot', sec);
  setTimeout(() => { try { f.scrollIntoView({block: 'nearest', behavior: reduce ? 'auto' : 'smooth'}); } catch (e) {} }, 80);
}
function buzzFor(right, tier) { buzz(right ? BUZZ[tier] : [16, 40, 16]); }

ACT.nextslide = b => { const sec = b.closest('.slide'); if (sec && sec.nextElementSibling) scrollToEl(sec.parentNode, sec.nextElementSibling); };
ACT.opt = b => { const sec = b.closest('.slide'); if (sec.parentNode === learnFeed) learnAnswer(sec, +b.dataset.n); else answer(sec, +b.dataset.n); };
ACT.clue = b => { if (b.closest('.feed') === learnFeed) learnClue(); else clue(); };
ACT.why = b => { const sec = b.closest('.slide'), it = P && P.items[+sec.dataset.i]; if (!it) return; const note = b.parentNode; note.className = 'note'; note.innerHTML = whyHtml(PT[it.p][it.k]); };

/* ---------- learn: read a card, then answer one check question about it ---------- */
const segsEl = $('#segs'), chPickT = $('#chPickT');

/* Build a session. By default it holds the points of the chapter that are still new.
   o.review holds every point of the chapter, o.only holds one point, and o.pts holds a list of points.
   Economics: each point is a card, then its check question.
   Maths: a new or weak point gets the worked example, a guided question and a check question.
   A learned or proven point goes straight to a check question. Review shows each worked example, then a check.
   Proving a maths chapter (o.prove) adds one check question at a time until every point in the chapter is proven. */
function buildLearn(chId, o) {
  o = o || {};
  const ch = chOf(chId) || curCh();
  mathsStop();
  const pts = o.pts ? o.pts.map(id => PT[id]) : o.only ? [PT[o.only]] : ch.points.filter(p => o.review || statusOf(p.id) === 'new');
  const items = [];
  pts.forEach(p => {
    if (p.sub !== 'maths') { items.push({t: 'card', p: p.id}); items.push({t: 'q', p: p.id, k: 'a', perm: shuffle([0, 1, 2, 3])}); return; }
    const st = statusOf(p.id);
    if (o.review) items.push({t: 'wex', p: p.id}, {t: 'mq', p: p.id, k: 'check'});
    else if (st === 'new' || st === 'weak') items.push({t: 'wex', p: p.id}, {t: 'mq', p: p.id, k: 'guided'}, {t: 'mq', p: p.id, k: 'check'});
    else items.push({t: 'mq', p: p.id, k: 'check'});
  });
  if (o.prove) items.length = 0;                   /* proving a chapter makes its questions one at a time, as it goes */
  L = {ch: ch.id, mode: o.prove ? 'prove' : o.pts ? 'pts' : o.only ? 'one' : (o.review ? 'review' : 'new'), items: items, res: [], shown: 0, right: 0, row: 0, over: false};
  if (o.prove) provePush();
  if (!o.only && !o.pts) setCur(ch.id);
  learnFeed.textContent = '';
  if (items.length) fillLearn(); else { L.over = true; learnFeed.appendChild(learnEndEl()); }
  learnFeed.scrollTop = 0;
  paintLearnBar();
}
let learnHold = false;
function openLearn(chId, o) {
  const c = chOf(chId);
  if (c && c.sub !== SUB.id) useSubject(c.sub, true);       /* a chapter of the other subject switches to it first */
  const ch = c || curCh(), plain = !o || (!o.only && !o.review && !o.pts && !o.prove);
  const midway = L && L.ch === ch.id && L.mode === 'new' && !L.over;
  if (!(plain && midway)) buildLearn(ch.id, o);     /* a session that is part way through carries on */
  learnHold = true; go('learn'); learnHold = false;
}
/* Arriving by the tab bar. A finished session gives way to a fresh one when there are new points to learn. */
function enterLearn() {
  const cur = curCh();
  if (!learnHold && (!L || (L.over && cur.points.some(p => statusOf(p.id) === 'new')))) buildLearn(cur.id);
  paintLearnBar();
}
/* Add slides until a question is waiting: a card (or a worked example), then its question. */
function fillLearn() {
  let i = L.shown;
  while (i < L.items.length) {
    const it = L.items[i];
    if (it.t === 'card') { learnFeed.appendChild(cardEl(i)); L.res[i] = {o: 'card'}; i++; }
    else if (it.t === 'wex') { learnFeed.appendChild(wexEl(i)); L.res[i] = {o: 'card'}; i++; }
    else if (it.t === 'mq') { learnFeed.appendChild(mqEl(i)); i++; break; }
    else { learnFeed.appendChild(qEl(L, i, true)); i++; break; }
  }
  L.shown = i;
}
function cardEl(i) {
  const p = PT[L.items[i].p], ch = chOf(p.ch), sec = document.createElement('section');
  sec.className = 'slide card'; sec.dataset.i = i;
  sec.innerHTML =
    '<p class="meta"><span>Point ' + (p.pi + 1) + ' of ' + ch.points.length + '</span></p>' +
    '<h2 class="ctitle">' + esc(p.title) + '</h2>' +
    '<div class="lines">' + p.card.map(lineHtml).join('') + '</div>' +
    '<p class="rem"><b>Remember</b>' + esc(p.remember) + '</p>' +
    '<div class="foot"><button class="next" type="button" data-act="nextslide">Check it' + IC.down + '</button></div>';
  return sec;
}
function learnEndEl() {
  if (chOf(L.ch).sub === 'maths') return mathsEndEl();
  const ch = chOf(L.ch), st = chStats(ch), nextCh = CH[CH.indexOf(ch) + 1], asked = L.items.filter(it => it.t === 'q').length;
  const sec = document.createElement('section');
  let title, body;
  if (L.mode === 'one') {
    title = 'Point checked';
    body = L.right ? 'Right. Practice will ask about it again later.' : 'Not this time. It is marked weak, and Practice will bring it back.';
  } else if (!asked) {
    title = 'You have learned every point in this chapter';
    body = st.pct === 100 ? 'Every question is right. Practice will keep it that way.' : 'Now prove it in Practice. ' + plural(st.n * 2 - st.ok, 'question') + ' left to get right.';
  } else {
    title = st.learned === st.n ? 'Chapter learned' : 'Session done';
    body = L.right + ' of ' + asked + ' checks right first time.' + (st.weak ? ' ' + plural(st.weak, 'weak point') + ' to fix in Practice.' : ' Practice will bring these points back later.');
  }
  sec.className = 'slide endslide';
  sec.innerHTML =
    '<p class="meta"><span>Chapter ' + (CH.indexOf(ch) + 1) + '</span><span>' + st.learned + ' of ' + st.n + ' points learned</span></p>' +
    '<h2 class="ctitle">' + title + '</h2>' +
    '<p class="lede">' + body + '</p>' +
    '<div class="cta">' +
      '<button class="primary" type="button" data-act="pracch" data-ch="' + ch.id + '">Practise this chapter</button>' +
      (nextCh ? '<button class="ghost" type="button" data-act="learnch" data-ch="' + nextCh.id + '">Go to chapter ' + (CH.indexOf(nextCh) + 1) + '</button>' : '') +
      (L.mode === 'review' ? '' : '<button class="textbtn" type="button" data-act="review" data-ch="' + ch.id + '">Read the cards again</button>') +
    '</div>';
  return sec;
}
function learnCurrent() {
  if (!L || L.over) return null;
  const i = L.shown - 1, it = L.items[i];
  if (!it || it.t !== 'q' || L.res[i]) return null;
  const sec = $('.slide[data-i="' + i + '"]', learnFeed);
  return sec ? {i: i, sec: sec, it: it, q: PT[it.p][it.k]} : null;
}
function learnAnswer(sec, n) {
  const c = learnCurrent(); if (!c || (sec && c.sec !== sec)) return;
  const right = c.it.perm[n] === 0, btn = $('.opt[data-n="' + n + '"]', c.sec);
  L.res[c.i] = {o: right ? 'correct' : 'wrong', pick: n};
  record(c.it.p, 'a', right);
  if (right) { L.right++; L.row++; } else L.row = 0;
  paintResolved(L, c.sec, c.i, true);
  if (right) {
    const p = centre(btn);
    anim(btn, 'pop');
    burst(p.x, p.y, 18, sparkColours(1));
    sound.correct(L.row, 0);
    say('Correct. ' + c.q.why);
  } else {
    anim(btn, 'shake');
    sound.wrong();
    say('Not this time. The answer is ' + c.q.opts[0] + '. ' + c.q.why);
  }
  buzzFor(right, 0);
  if (L.shown < L.items.length) fillLearn();
  else { L.over = true; learnFeed.appendChild(learnEndEl()); }
  const nb = $('.next', c.sec);
  nb.firstChild.nodeValue = L.over ? 'Finish' : 'Next point';
  nb.hidden = false;
  if (document.activeElement && document.activeElement.disabled) learnFeed.focus({preventScroll: true});
  paintLearnBar();
  showFoot(c.sec);
}
function learnClue() { const c = learnCurrent(); if (!c) return; paintClue(c.sec, c.q); say('Clue. ' + c.q.clue); }
/* The bar above the cards: the chapter, and one segment for each question in this session.
   A segment fills when its question is finished: blue if it was right first time, the weak-point colour if not.
   The segment for the question on screen (or the one a card leads to) is darker until it is done. */
function paintLearnBar() {
  if (!L) return;
  const ch = chOf(L.ch), v = viewing(learnFeed), vi = v && v.dataset.i !== undefined ? +v.dataset.i : -1;
  chPickT.textContent = (CH.indexOf(ch) + 1) + '. ' + ch.title;
  let cur = -1;
  if (vi >= 0) for (let i = vi; i < L.items.length; i++) if (L.items[i].t === 'q' || L.items[i].t === 'mq') { cur = i; break; }
  segsEl.innerHTML = L.items.map((it, i) => {
    if (it.t !== 'q' && it.t !== 'mq') return '';
    const r = L.res[i], fill = !r ? '' : (r.o === 'correct' ? ' fin' : ' miss');
    return '<i class="seg' + fill + (i === cur && !r ? ' cur' : '') + '"></i>';
  }).join('');
}
let segTick = 0;
let workTick = 0;
learnFeed.addEventListener('scroll', () => {
  clearTimeout(workTick); workTick = setTimeout(paintWork, 140);     /* once the scroll has settled */
  if (segTick) return;
  segTick = setTimeout(() => { segTick = 0; paintLearnBar(); }, 120);
}, {passive: true});

ACT.chpick = () => {
  openSheet('Chapters', '<div class="picks">' + CH.map((c, i) => {
    const s = chStats(c);
    return '<button class="pick" type="button" data-act="learnch" data-ch="' + c.id + '"><span class="t">' + (i + 1) + '. ' + esc(c.title) + '<small>' + esc(chStage(c).t) + '</small></span></button>';
  }).join('') + '</div>');
};
