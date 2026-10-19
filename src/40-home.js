/* ---------- home: the chapter in progress, its bar, and the list of chapters ---------- */
const lineHtml = l => '<p>' + (Array.isArray(l) ? '<b>' + esc(l[0]) + ':</b> ' + esc(l[1]) : esc(l)) + '</p>';
const unreadCount = () => FRIENDS.reduce((n, f) => n + (saved.unread[f.id] || 0), 0);
const STATUS_MEANS = {
  new: 'Not started yet.',
  learned: 'One of its two questions is right so far.',
  weak: 'You last got one of its questions wrong.',
  proven: 'Both of its questions are right.'
};
/* What a maths point's status means, in one sentence, for that point as it stands. */
function mathsMeans(pid) {
  const st = statusOf(pid), run = runOf(pid);
  if (st === 'new') return 'Not started yet.';
  if (st === 'weak') return 'Your last answer was wrong. Get the next one right to move on.';
  if (st === 'proven') return 'Three right in a row, each with different numbers.';
  return plural(run, 'right answer') + ' in a row so far. Three in a row proves it.';
}
const MATHS_RULE = 'Proven means three right answers in a row on this point, each with different numbers. One right answer does not show you can do the type. A wrong answer makes the point weak and starts the count again.';

function chRow(c) {
  /* A chapter with no points yet is Coming soon: the row shows where it sits in the course, and it cannot be opened. */
  if (!c.points.length) return '<li class="ch soon"><button class="ch-head" type="button" disabled><span class="n">' + c.n + '</span><span class="t">' + esc(c.title) + '</span><span class="stage">Coming soon</span><span></span></button></li>';
  const s = chStats(c), g = chStage(c), open = ui.open === c.id;
  let h = '<li class="ch' + (open ? ' open' : '') + '"><button class="ch-head" type="button" data-act="chtoggle" data-ch="' + c.id + '" aria-expanded="' + open + '">' +
    '<span class="n">' + c.n + '</span><span class="t">' + esc(c.title) + (isDraft(c) ? ' ' + DRAFT : '') + '</span><span class="stage">' + esc(g.t) + '</span>' + IC.down + '</button>';
  if (open) {
    h += '<ul class="pts">' + c.points.map(p => {
      const st = statusOf(p.id);
      return '<li><button class="pt is-' + st + '" type="button" data-act="point" data-p="' + p.id + '"><i class="st ' + st + '"></i><span class="t">' + esc(p.title) + '</span><span class="lab">' + STATUS[st] + '</span></button></li>';
    }).join('') + '<li>' + (s.learned < s.n
      ? '<button class="ghost sm" type="button" data-act="learnch" data-ch="' + c.id + '">' + (s.learned ? 'Keep learning this chapter' : 'Learn this chapter') + '</button>'
      : (c.sub === 'maths' ? '' : '<button class="ghost sm" type="button" data-act="pracch" data-ch="' + c.id + '">Practise this chapter</button>')) + '</li></ul>';
  }
  return h + '</li>';
}

function renderHome() {
  const ch = curCh(), st = chStats(ch), step = nextStep(), weak = weakPoints(), streak = streakNow(), unread = unreadCount();
  if (ui.cur !== ch.id) { ui.cur = ch.id; ui.open = ch.id; }       /* the list opens at the chapter you are on */
  /* The bar starts at the widths it had last time, then slides to the new ones. */
  const from = ui.bar && ui.bar.ch === ch.id ? ui.bar : {l: st.lpct, p: st.ppct};
  const keep = views.home.scrollTop;
  let h = '<div class="pad home">' +
    /* The top bar has three parts. On the left, the courses button, and Sign in while signed out. In the middle, the logo.
       On the right, the store and the friends button. */
    '<header class="top"><span class="tl"><button class="icon-btn" type="button" data-act="subject" aria-haspopup="dialog" aria-label="Courses">' + IC.book + '</button>' +
        (ACCOUNTS && !signedIn() ? '<button class="signin" type="button" data-act="signin" data-title="Sign in" aria-haspopup="dialog">Sign in</button>' : '') + '</span>' +
      '<span class="word">Stratos</span>' +
      '<span class="tr"><button class="icon-btn" type="button" data-act="page" data-page="store" aria-label="Store">' + IC.bag + '</button>' +
        '<button class="icon-btn" type="button" data-act="page" data-page="friends" aria-label="Friends and messages' + (unread ? ', ' + unread + ' new' : '') + '">' + IC.send + (unread ? '<i class="dot"></i>' : '') + '</button></span>' +
    '</header>' +
    '<div class="subrow"><button class="subject" type="button" data-act="subject" aria-haspopup="dialog">' + esc(SUB.topic.course + ', ' + SUB.topic.year) + IC.down + '</button>' +
      (streak ? '<span class="streak">' + streak + '-day streak</span>' : '') + '</div>' +
    (SUB.topic.note ? '<p class="cnote">' + esc(SUB.topic.note) + '</p>' : '') +
    '<section class="hero" aria-label="Your chapter">' +
      '<p class="kicker">' + (ch.unit ? esc(chName(ch)) + ' of ' + ch.of : esc(SUB.topic.name) + ', chapter ' + ch.n + ' of ' + CH.length) + (isDraft(ch) ? ' ' + DRAFT : '') + '</p>' +
      '<h1 class="h1">' + esc(ch.title) + '</h1>' +
      /* The bar: the pale part is points learned, the blue part points proven. The words under it say the same. */
      '<div class="bar2" role="img" aria-label="' + st.learned + ' of ' + st.n + ' points learned. ' + st.proven + ' of ' + st.n + ' proven."><i class="b-l" style="width:' + from.l + '%"></i><i class="b-p" style="width:' + from.p + '%"></i></div>' +
      '<div class="legend" aria-hidden="true"><span><i class="k-p"></i>' + st.proven + ' of ' + st.n + ' proven</span><span><i class="k-l"></i>' + st.learned + ' of ' + st.n + ' learned</span></div>' +
      '<button class="primary wide" type="button" data-act="continue">' + esc(step.label) + '</button>' +
      '<p class="sub">' + esc(step.sub) + '</p>' +
    '</section>';
  if (weak.length && step.label.indexOf('Fix') !== 0) {
    h += '<button class="weakrow" type="button" data-act="fixweak"><i class="st weak"></i><span><b>' + plural(weak.length, 'weak point') + '</b><span class="names">' + esc(names(weak)) + '</span></span>' + IC.right + '</button>';
  }
  /* A course with units lists every chapter under its unit, ready or not, so the shape of the whole year shows. */
  h += '<section class="sec"><h2 class="h2">Chapters</h2>' + (SUB.units
    ? SUB.units.map(u => '<h3 class="unit">Unit ' + u.n + ': ' + esc(u.title) + '</h3><ol class="ch-list">' + u.ch.map(chRow).join('') + '</ol>').join('')
    : '<ol class="ch-list">' + CH.map(chRow).join('') + '</ol>') + '</section>' +
    '<p class="fine">' + (SUB.units
      ? 'The AS year has 12 chapters.' + (SUB.ch.some(isDraft) ? ' Chapters marked Draft have not been checked by a teacher yet.' : '') + ' Challenges and races use the other subjects for now. ' + whereSaved()
      : isMaths()
      ? 'Maths is new in this test build. Learn and Practice work now. Races and challenges use Economics for now. ' + whereSaved()
      : 'Second test build. The study notes are a first draft and still need checking against the syllabus. ' + whereSaved()) + '</p></div>';
  views.home.innerHTML = h;
  views.home.scrollTop = keep;
  if (from.l !== st.lpct || from.p !== st.ppct) {
    setTimeout(() => {
      const b = $('.bar2', views.home); if (!b) return;
      $('.b-l', b).style.width = st.lpct + '%'; $('.b-p', b).style.width = st.ppct + '%';
    }, 80);
  }
  ui.bar = {ch: ch.id, l: st.lpct, p: st.ppct};
}

ACT.continue = () => nextStep().run();
ACT.fixweak = () => { if (isMaths()) { const w = weakPoints(); openLearn(w[0].ch, {pts: w.map(p => p.id)}); } else startPractice({mode: 'mix', len: 8}); };
ACT.chtoggle = b => { ui.open = ui.open === b.dataset.ch ? null : b.dataset.ch; renderHome(); };
ACT.learnch = b => { closeSheet(); closeAllPages(); openLearn(b.dataset.ch); };
ACT.pracch = b => { closeSheet(); startPractice({mode: 'chapter', ch: b.dataset.ch, len: 8}); };
ACT.review = b => openLearn(b.dataset.ch, {review: true});
ACT.point = b => pointSheet(b.dataset.p);
ACT.learnpoint = b => { closeSheet(); openLearn(PT[b.dataset.p].ch, {only: b.dataset.p}); };

/* One point, opened from Home or from Search: its card, where it stands, and what to do with it. */
function pointSheet(pid) {
  const p = PT[pid], st = statusOf(pid);
  if (p.sub === 'maths') { mathsSheet(p, st); return; }
  openSheet(p.title,
    '<p class="statusline"><i class="st ' + st + '"></i><span>' + STATUS[st] + '. ' + STATUS_MEANS[st] + '</span></p>' +
    '<div class="lines">' + p.card.map(lineHtml).join('') + '</div>' +
    '<p class="rem"><b>Remember</b>' + esc(p.remember) + '</p>' +
    '<p class="sub">' + esc(chName(chOf(p.ch))) + ': ' + esc(chOf(p.ch).title) + '</p>' +
    (isDraft(chOf(p.ch)) ? '<p class="sub">' + DRAFT + ' This chapter has not been checked by a teacher yet.</p>' : '') +
    '<div class="cta">' + (st === 'new'
      ? '<button class="primary" type="button" data-act="learnpoint" data-p="' + pid + '">Check this point</button>'
      : '<button class="primary" type="button" data-act="pracch" data-ch="' + p.ch + '">Practise this chapter</button><button class="ghost" type="button" data-act="learnpoint" data-p="' + pid + '">Check this point again</button>') +
    '</div>');
}

/* ---------- the subject sheet: where you study, then its courses ----------
   The first time, the sheet asks for the country (and the state, for a country with states), with a guess from the
   phone's settings already picked. Once that is saved it opens on the courses: the place's own, then the international
   ones. The data is in places.js. ui.pl holds the picks while the sheet is open, before they are saved.
   On a device's first open the same steps run full screen (#setup) instead of in the sheet: see the end of this part.
   ui.first is true while they do. showStep and stepBody send each step to the right place. */
const setupEl = $('#setup'), setupBody = $('#setupBody');
const stepBody = () => ui.first ? setupBody : sheetBody;
function showStep(title, html) {
  if (!ui.first) { openSheet(title, html); return; }
  $('#setupTitle').textContent = title;
  setupBody.innerHTML = html;
  $('.panel', setupEl).scrollTop = 0;
}
ACT.subject = () => {
  if (saved.place) { courseSheet(); return; }
  const g = guessPlace();
  ui.pl = {country: g ? g.country : null, state: g ? g.state : null, guessed: !!g};
  countrySheet();
};
ACT.placechange = () => { ui.pl = {country: saved.place.country, state: saved.place.state, guessed: false}; countrySheet(); };
/* Search ignores capitals and accents, so "cote" finds Côte d’Ivoire. */
const fold = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').toLowerCase();
const radio = (act, v, on, title, small) => '<button class="choice" type="button" role="radio" aria-checked="' + on + '" data-act="' + act + '" data-v="' + v + '"><i class="radio"></i><span class="t">' + esc(title) + (small ? '<small>' + esc(small) + '</small>' : '') + '</span></button>';
const placeNext = () => statesOf(ui.pl.country).length ? 'Next' : 'Show courses';

function countrySheet() {
  const sel = ui.pl.country;
  /* The country picked comes first, then the countries with courses of their own, then every other country A to Z. */
  const named = COUNTRY_CODES.map(c => ({c: c, n: countryName(c)}));
  const rank = x => x.c === sel ? 0 : hasOwn(x.c) ? 1 : 2;
  named.sort((a, b) => rank(a) - rank(b) || a.n.localeCompare(b.n, 'en'));
  showStep('Where do you study?',
    '<p class="rule">Pick your country to see its courses.' + (ui.pl.guessed ? ' We guessed from your phone\'s language and region settings.' : '') + '</p>' +
    '<label class="field"><span class="sr">Search countries</span><input id="placeIn" type="search" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" placeholder="Search countries"></label>' +
    '<div class="places" role="radiogroup" aria-label="Country">' + named.map(x =>
      radio('country', x.c, x.c === sel, x.n, PLACES[x.c] && PLACES[x.c].about).replace('<button ', '<button data-find="' + esc(fold(x.n)) + '" ')).join('') + '</div>' +
    '<p class="sub" id="placeNone" hidden>No country matches.</p>' +
    '<p class="fine">This uses no location, and nothing is sent anywhere.</p>' +
    '<div class="stick"><button class="primary wide" type="button" data-act="placenext"' + (sel ? '' : ' disabled') + '>' + placeNext() + '</button></div>');
}
/* Typing in the search box hides the countries whose names do not have what was typed in them. */
[sheetBody, setupBody].forEach(el => {
  el.addEventListener('input', ev => {
    if (ev.target.id !== 'placeIn') return;
    const q = fold(ev.target.value.trim());
    let shown = 0;
    $$('.places .choice', el).forEach(b => { const ok = !q || b.dataset.find.indexOf(q) >= 0 || b.dataset.v === q.toUpperCase(); b.hidden = !ok; if (ok) shown++; });
    $('#placeNone').hidden = shown > 0;
  });
  el.addEventListener('keydown', ev => { if (ev.key === 'Enter' && ev.target.id === 'placeIn') { ev.preventDefault(); ev.target.blur(); } });
});
/* Picking a row only moves the dot, so the search and the place in the list stay as they are. */
const checkOnly = (b, sel) => $$(sel, stepBody()).forEach(x => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
ACT.country = b => {
  ui.pl.country = b.dataset.v;
  ui.pl.state = guessState(b.dataset.v, deviceZone());
  checkOnly(b, '.places .choice');
  const n = $('[data-act="placenext"]', stepBody()); n.disabled = false; n.textContent = placeNext();
};
ACT.placenext = () => { if (!ui.pl.country) return; if (statesOf(ui.pl.country).length) stateSheet(); else placeDone(); };

function stateSheet() {
  showStep('Which state or territory?',
    '<p class="rule">Pick yours to see its courses.</p>' +
    '<div role="radiogroup" aria-label="State or territory">' + statesOf(ui.pl.country).map(s =>
      radio('state', s.id, s.id === ui.pl.state, s.name, s.curriculum ? s.about : 'Courses coming')).join('') + '</div>' +
    '<div class="cta"><button class="primary" type="button" data-act="placedone">Show courses</button><button class="ghost" type="button" data-act="placeback">Back</button></div>');
}
ACT.state = b => { ui.pl.state = b.dataset.v; checkOnly(b, '[data-act="state"]'); };
ACT.placeback = () => countrySheet();
ACT.placedone = () => placeDone();
function placeDone() { save({place: {country: ui.pl.country, state: ui.pl.state}}); ui.pl = null; courseSheet(); }

/* The courses for the place saved: its own, then the international ones. The course open now always shows, under
   Open now if the place does not offer it, so Home never names a course the sheet hides.
   On a first open nothing is open yet: each row has an arrow, one tap picks it, and there is no Open now. */
function courseSheet() {
  const first = ui.first, pl = saved.place, own = curriculumAt(pl), st = stateOf(pl.country, pl.state);
  const row = id => {
    const c = COURSE_LIST.find(x => x.id === id), note = c.data.note, on = !first && SUB.id === id;
    return '<button class="pick" type="button" data-act="' + (first ? 'firstsub' : 'setsub') + '" data-sub="' + id + '"' + (on ? ' aria-current="true"' : '') + '><span class="t">' + esc(c.name) +
      '<small>' + esc(c.about) + '</small>' + (note ? '<small class="pnote">' + esc(note) + '</small>' : '') + '</span>' +
      (first ? IC.right : '<span class="v">' + (on ? 'Open' : 'Switch') + '</span>') + '</button>';
  };
  const group = (name, ids, more) => '<h3 class="unit">' + esc(name) + '</h3><div class="picks">' + ids.map(row).join('') + '</div>' + (more ? '<p class="sub">' + esc(more) + '</p>' : '');
  const listed = (own ? own.courses : []).concat(INTERNATIONAL.courses);
  showStep(first ? 'Pick your course' : 'Courses',
    '<button class="pick place" type="button" data-act="placechange"><span class="t">' + esc(placeName(pl)) + '</span><span class="v">Change</span></button>' +
    (own ? group(own.name, own.courses, own.more)
      : '<p class="sub">Courses for ' + esc(st ? st.name : countryName(pl.country)) + ' are coming. The international courses below work anywhere.</p>') +
    group(INTERNATIONAL.name, INTERNATIONAL.courses, INTERNATIONAL.more) +
    (!first && listed.indexOf(SUB.id) < 0 ? group('Open now', [SUB.id]) : '') +
    '<p class="fine">' + (first ? 'You can switch courses any time from Home. ' : '') + 'Each course keeps its own progress, ' + (signedIn() ? 'saved to your account.' : 'saved on this device only.') + '</p>' +
    (first ? '<button class="textbtn" type="button" data-act="firstnone">My course isn’t here yet</button>' : ''));
}
ACT.setsub = b => { closeSheet(); useSubject(b.dataset.sub); };

/* ---------- the first-open steps ----------
   On a device's first open, the intro fades into the subject sheet's steps, full screen: where you study, the state
   if the country has states, then the course. Then the welcome screen (85-account.js), if it is due, then Home.
   They show only while this device has no course (saved.picked is 0, see tidySaved in 10-core.js), not while signed
   in (the account brings its course), and not when the page opens from a sign-in link. Picking a course saves
   picked, so they never show again. A reload part way through starts them again, at the courses if the place was
   saved. Tests skip them with window.stratosSetup = false. */
function setupDue() {
  if (saved.picked || window.stratosSetup === false || signedIn() || hasProgress(saved)) return false;
  return !/(^|[#&])(access_token|error_description)=/.test(location.hash);
}
/* start() calls this before the intro plays, so the intro fades into the first step. True if the steps are showing. */
function showSetup() {
  if (!setupDue()) return false;
  ui.first = true;
  setupEl.hidden = false;
  welcomeInert(true);
  if (saved.place) courseSheet();
  else { const g = guessPlace(); ui.pl = {country: g ? g.country : null, state: g ? g.state : null, guessed: !!g}; countrySheet(); }
  setupEl.focus({preventScroll: true});
  return true;
}
/* A course is picked: save it, close the steps, then the welcome screen if it is due, or Home. note is a toast for
   Home, shown once Home is in view. */
function setupDone(id, note) {
  ui.first = false; ui.pl = null;
  setupEl.hidden = true; setupBody.textContent = '';
  useSubject(id, true);
  save({subject: id, picked: 1});
  go('home');
  ui.homeNote = note || '';
  if (!showWelcome()) { welcomeInert(false); homeNote(); }
}
/* The toast saved for Home, if there is one. The welcome screen's Try it first calls this too. */
function homeNote() { if (ui.homeNote) toast(ui.homeNote); ui.homeNote = ''; }
ACT.firstsub = b => setupDone(b.dataset.sub);
/* My course isn’t here yet: the first course the place has, or the first international one, to try meanwhile. */
ACT.firstnone = () => {
  const own = curriculumAt(saved.place);
  setupDone(own ? own.courses[0] : INTERNATIONAL.courses[0], 'Try this one while we add yours.');
};
/* Switch Home, Learn and Search to another subject. Each subject's progress stays where it is.
   A Learn session or flight from the other subject ends, because its slides belong to that subject. */
function useSubject(id, quiet) {
  if (id === SUB.id || !SUBJECTS[id]) return;
  save({subject: id});
  setSubject(id);
  if (P) closeRun();
  if (L) { mathsStop(); L = null; learnFeed.textContent = ''; }
  ui.cur = null; ui.open = null; ui.bar = null;
  if (id === 'maths') loadMaths();
  paintSearchFor();
  if (!quiet) toast('Switched to ' + subTitle());
  if (!quiet) { closeAllPages(); go('home'); views.home.scrollTop = 0; }
}
