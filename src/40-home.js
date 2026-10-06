/* ---------- home: the chapter in progress, its bar, and the list of chapters ---------- */
const lineHtml = l => '<p>' + (Array.isArray(l) ? '<b>' + esc(l[0]) + ':</b> ' + esc(l[1]) : esc(l)) + '</p>';
const unreadCount = () => FRIENDS.reduce((n, f) => n + (saved.unread[f.id] || 0), 0);
const STATUS_MEANS = {
  new: 'Not started yet.',
  learned: 'One of its two questions is right so far.',
  weak: 'You last got one of its questions wrong.',
  proven: 'Both of its questions are right.'
};

function chRow(c, i) {
  const s = chStats(c), open = ui.open === c.id;
  let h = '<li class="ch' + (open ? ' open' : '') + '"><button class="ch-head" type="button" data-act="chtoggle" data-ch="' + c.id + '" aria-expanded="' + open + '">' +
    '<span class="n">' + (i + 1) + '</span><span class="t">' + esc(c.title) + '</span><span class="pct">' + s.pct + '%</span>' + IC.down + '</button>';
  if (open) {
    h += '<ul class="pts">' + c.points.map(p => {
      const st = statusOf(p.id);
      return '<li><button class="pt is-' + st + '" type="button" data-act="point" data-p="' + p.id + '"><i class="st ' + st + '"></i><span class="t">' + esc(p.title) + '</span><span class="lab">' + STATUS[st] + '</span></button></li>';
    }).join('') + '<li>' + (s.learned < s.n
      ? '<button class="ghost sm" type="button" data-act="learnch" data-ch="' + c.id + '">' + (s.learned ? 'Keep learning this chapter' : 'Learn this chapter') + '</button>'
      : '<button class="ghost sm" type="button" data-act="pracch" data-ch="' + c.id + '">Practise this chapter</button>') + '</li></ul>';
  }
  return h + '</li>';
}

function renderHome() {
  const ch = curCh(), ci = CH.indexOf(ch), st = chStats(ch), step = nextStep(), weak = weakPoints(), streak = streakNow(), unread = unreadCount();
  if (ui.cur !== ch.id) { ui.cur = ch.id; ui.open = ch.id; }       /* the list opens at the chapter you are on */
  /* The bar starts at the widths it had last time, then slides to the new ones. */
  const from = ui.bar && ui.bar.ch === ch.id ? ui.bar : {l: st.lpct, p: st.pct};
  const keep = views.home.scrollTop;
  let h = '<div class="pad home">' +
    '<header class="top"><span class="word">Stratos</span><span class="grow"></span>' +
      (streak ? '<span class="streak">' + streak + '-day streak</span>' : '') +
      '<button class="icon-btn" type="button" data-act="page" data-page="friends" aria-label="Friends and messages' + (unread ? ', ' + unread + ' new' : '') + '">' + IC.send + (unread ? '<i class="dot"></i>' : '') + '</button>' +
    '</header>' +
    '<button class="subject" type="button" data-act="subject" aria-haspopup="dialog">' + esc(TOPIC.course + ', ' + TOPIC.year) + IC.down + '</button>' +
    '<section class="hero" aria-label="Your chapter">' +
      '<p class="kicker">' + esc(TOPIC.name) + ', chapter ' + (ci + 1) + ' of ' + CH.length + '</p>' +
      '<h1 class="h1">' + esc(ch.title) + '</h1>' +
      '<div class="bar2" role="img" aria-label="' + st.pct + '% proven. ' + st.learned + ' of ' + st.n + ' points learned."><i class="b-l" style="width:' + from.l + '%"></i><i class="b-p" style="width:' + from.p + '%"></i></div>' +
      '<div class="legend" aria-hidden="true"><span><i class="k-p"></i>Proven ' + st.pct + '%</span><span><i class="k-l"></i>Learned ' + st.learned + ' of ' + st.n + '</span></div>' +
      '<button class="primary wide" type="button" data-act="continue">' + esc(step.label) + '</button>' +
      '<p class="sub">' + esc(step.sub) + '</p>' +
    '</section>';
  if (weak.length && step.label.indexOf('Fix') !== 0) {
    h += '<button class="weakrow" type="button" data-act="fixweak"><i class="st weak"></i><span><b>' + plural(weak.length, 'weak point') + '</b><span class="names">' + esc(names(weak)) + '</span></span>' + IC.right + '</button>';
  }
  h += '<section class="sec"><h2 class="h2">Chapters</h2><ol class="ch-list">' + CH.map(chRow).join('') + '</ol></section>' +
    '<p class="fine">Second test build. The study notes are a first draft and still need checking against the syllabus. Progress is saved on this device only.</p></div>';
  views.home.innerHTML = h;
  views.home.scrollTop = keep;
  if (from.l !== st.lpct || from.p !== st.pct) {
    setTimeout(() => {
      const b = $('.bar2', views.home); if (!b) return;
      $('.b-l', b).style.width = st.lpct + '%'; $('.b-p', b).style.width = st.pct + '%';
    }, 80);
  }
  ui.bar = {ch: ch.id, l: st.lpct, p: st.pct};
}

ACT.continue = () => nextStep().run();
ACT.fixweak = () => startPractice({mode: 'mix', len: 8});
ACT.chtoggle = b => { ui.open = ui.open === b.dataset.ch ? null : b.dataset.ch; renderHome(); };
ACT.learnch = b => { closeSheet(); closeAllPages(); openLearn(b.dataset.ch); };
ACT.pracch = b => { closeSheet(); startPractice({mode: 'chapter', ch: b.dataset.ch, len: 8}); };
ACT.review = b => openLearn(b.dataset.ch, {review: true});
ACT.point = b => pointSheet(b.dataset.p);
ACT.learnpoint = b => { closeSheet(); openLearn(PT[b.dataset.p].ch, {only: b.dataset.p}); };

/* One point, opened from Home or from Search: its card, where it stands, and what to do with it. */
function pointSheet(pid) {
  const p = PT[pid], st = statusOf(pid);
  openSheet(p.title,
    '<p class="statusline"><i class="st ' + st + '"></i><span>' + STATUS[st] + '. ' + STATUS_MEANS[st] + '</span></p>' +
    '<div class="lines">' + p.card.map(lineHtml).join('') + '</div>' +
    '<p class="rem"><b>Remember</b>' + esc(p.remember) + '</p>' +
    '<p class="sub">Chapter ' + (p.ci + 1) + ': ' + esc(chOf(p.ch).title) + '</p>' +
    '<div class="cta">' + (st === 'new'
      ? '<button class="primary" type="button" data-act="learnpoint" data-p="' + pid + '">Check this point</button>'
      : '<button class="primary" type="button" data-act="pracch" data-ch="' + p.ch + '">Practise this chapter</button><button class="ghost" type="button" data-act="learnpoint" data-p="' + pid + '">Check this point again</button>') +
    '</div>');
}

ACT.subject = () => {
  const rows = [
    ['The Global Economy', 'Economics, Year 12', 'Loaded'],
    ['Australia\'s Place in the Global Economy', 'Economics, Year 12', 'Soon'],
    ['Economic Issues', 'Economics, Year 12', 'Soon'],
    ['Economic Policies and Management', 'Economics, Year 12', 'Soon'],
    ['Biology', 'Year 12', 'Soon'],
    ['Maths', 'Year 12', 'Soon'],
    ['English', 'Year 12', 'Soon'],
    ['Modern History', 'Year 12', 'Soon']
  ];
  openSheet('Subjects and topics',
    '<div class="picks">' + rows.map((r, i) => '<button class="pick" type="button"' + (i ? ' disabled' : ' data-act="sheetclose"') + '><span class="t">' + esc(r[0]) + '<small>' + esc(r[1]) + '</small></span><span class="v">' + r[2] + '</span></button>').join('') + '</div>' +
    '<p class="fine">This test has one topic. The other rows show where the rest of the syllabus would go.</p>');
};
