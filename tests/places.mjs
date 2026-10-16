// The subject sheet's steps: where you study (country, then state for Australia), then the courses there and the
// international courses. Checks the guess from the phone's language and time zone, the country list and its search,
// the international courses showing in every country, and switching courses with each one's progress kept apart.
// Nothing may be sent and the location feature may never be asked for.
// Run: node places.mjs. Pass "shots" to also save each step at 390 by 844, light and dark, to tests/shots/.
import { open, shot, saved, check } from './lib.mjs';
const R = [], errsAll = [], shots = process.argv[2] === 'shots';
const text = (p, sel) => p.locator(sel).first().textContent();
const COMING = c => 'Courses for ' + c + ' are coming. The international courses below work anywhere.';
// Count every call to the location feature, so a test can show there were none.
const spyLocation = () => {
  window.__loc = 0;
  const g = navigator.geolocation;
  if (g) { const f = () => { window.__loc++; }; g.getCurrentPosition = f; g.watchPosition = f; }
  if (navigator.permissions) { const q = navigator.permissions.query.bind(navigator.permissions); navigator.permissions.query = d => { window.__loc++; return q(d); }; }
};
const checked = p => p.locator('#sheetBody [role="radio"][aria-checked="true"]');
const headings = p => p.locator('#sheetBody .unit').allTextContents();

// ---------- 1. the guess from the phone's settings ----------
const cases = [
  ['en-AU', 'Australia/Sydney', 'AU', 'Australia', 'New South Wales', 'an Australian phone'],
  ['en-US', 'Australia/Sydney', 'AU', 'Australia', 'New South Wales', 'US English in Sydney (the time zone says Australia)'],
  ['en-US', 'Australia/Melbourne', 'AU', 'Australia', 'Victoria', 'US English in Melbourne'],
  ['en-AU', 'Australia/Perth', 'AU', 'Australia', 'Western Australia', 'Australian English in Perth'],
  ['en-AU', 'UTC', 'AU', 'Australia', 'New South Wales', 'Australian English with no Australian time zone (NSW, the state with courses)'],
  ['en-GB', 'Australia/Sydney', 'AU', 'Australia', 'New South Wales', 'British English in Sydney (a country with courses wins)'],
  ['en-GB', 'Europe/London', 'GB', 'United Kingdom', null, 'British English in London'],
  ['fr-FR', 'UTC', 'FR', 'France', null, 'French in France'],
  ['ar-AE', 'Asia/Dubai', 'AE', 'United Arab Emirates', null, 'Arabic in Dubai'],
  // The browser's own name for Hong Kong differs between versions ("Hong Kong", "Hong Kong SAR China").
  ['zh-Hant-HK', 'Asia/Hong_Kong', 'HK', null, null, 'Chinese in Hong Kong (a script in the language tag)']
];
for (const [locale, tz, code, name, state, what] of cases) {
  const {b, p, errs} = await open({locale: locale, tz: tz, init: spyLocation});
  await p.click('.subject'); await p.waitForTimeout(100);
  const country = name || await p.evaluate(c => new Intl.DisplayNames(['en'], {type: 'region'}).of(c), code);
  const got = await checked(p).evaluateAll(els => els.map(e => [e.dataset.v, e.querySelector('.t').firstChild.textContent]));
  const first = await p.locator('#sheetBody .places .choice').first().getAttribute('data-v');
  check(got.length === 1 && got[0][0] === code && got[0][1] === country && first === code, locale + ' with ' + tz + ' picks ' + country + ', at the top of the list: ' + what, R);
  const next = await text(p, '[data-act="placenext"]');
  check(next === (state ? 'Next' : 'Show courses'), 'the button says ' + (state ? 'Next' : 'Show courses'), R);
  if (state) {
    await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
    check((await text(p, '#sheetTitle')) === 'Which state or territory?' && (await checked(p).allTextContents())[0].startsWith(state), 'then the state step picks ' + state, R);
  }
  check((await saved(p)).place === undefined, 'the guess is not saved until it is confirmed', R);
  check(await p.evaluate(() => window.__loc) === 0, 'the location feature is never asked for', R);
  errsAll.push(...errs); await b.close();
}
// A language with no country in it and a time zone that names none: nothing is picked, and the sheet says so.
{
  const {b, p, errs} = await open({locale: 'en', tz: 'UTC'});
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await checked(p).count()) === 0 && (await p.locator('[data-act="placenext"]').isDisabled()), 'with no country in the settings, nothing is picked and the button waits for a pick', R);
  check((await text(p, '#sheetBody .rule')) === 'Pick your country to see its courses.', 'and the sheet does not say it guessed', R);
  await p.click('#sheetBody .places .choice[data-v="KE"]'); await p.waitForTimeout(60);
  check(!(await p.locator('[data-act="placenext"]').isDisabled()), 'picking a country lets the button go', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 2. the country step: every country by name, search, and remembering the pick ----------
{
  const {b, p, errs} = await open({locale: 'en-AU', tz: 'Australia/Sydney', init: spyLocation});
  const sent = [];
  p.on('request', r => sent.push(r.url()));
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await text(p, '#sheetTitle')) === 'Where do you study?', 'the sheet opens on Where do you study?', R);
  check((await text(p, '#sheetBody .rule')) === 'Pick your country to see its courses. We guessed from your phone\'s language and region settings.', 'it says the pick is a guess from the phone\'s settings', R);
  check((await text(p, '#sheetBody .fine')) === 'This uses no location, and nothing is sent anywhere.', 'and that it uses no location', R);
  const rows = p.locator('#sheetBody .places .choice');
  const all = await rows.evaluateAll(els => els.map(e => ({c: e.dataset.v, n: e.querySelector('.t').firstChild.textContent})));
  const named = await p.evaluate(list => { const d = new Intl.DisplayNames(['en'], {type: 'region'}); return list.every(x => d.of(x.c) === x.n); }, all);
  check(all.length === 244 && new Set(all.map(x => x.c)).size === 244, 'the list has all 244 countries, once each', R);
  check(named && all.every(x => x.n !== x.c), 'each is named by the browser, never shown as a bare code', R);
  const rest = all.slice(1).map(x => x.n);
  check(all[0].c === 'AU' && rest.join('|') === rest.slice().sort((a, b) => a.localeCompare(b, 'en')).join('|'), 'Australia comes first, then every other country A to Z', R);
  check((await text(p, '#sheetBody .choice[data-v="AU"] small')) === 'NSW courses and international courses' && (await p.locator('#sheetBody .choice[data-v="FR"] small').count()) === 0, 'only a country with courses of its own has a line under its name', R);

  // Search filters as you type, ignoring capitals and accents.
  const shown = () => rows.evaluateAll(els => els.filter(e => !e.hidden).map(e => e.dataset.v));
  await p.fill('#placeIn', 'King'); await p.waitForTimeout(60);
  const k = await shown();
  check(k.includes('GB') && k.length < 5 && (await p.locator('#placeNone').isHidden()), 'typing King shows the United Kingdom and only a few others: ' + k.join(' '), R);
  await p.fill('#placeIn', 'cote'); await p.waitForTimeout(60);
  check((await shown()).join() === 'CI', 'cote finds Côte d’Ivoire, without its accent', R);
  await p.fill('#placeIn', 'united arab'); await p.waitForTimeout(60);
  check((await shown()).join() === 'AE', 'united arab finds the United Arab Emirates', R);
  await p.fill('#placeIn', 'zzz'); await p.waitForTimeout(60);
  check((await shown()).length === 0 && (await text(p, '#placeNone')) === 'No country matches.' && (await p.locator('#placeNone').isVisible()), 'a search with no match says No country matches.', R);
  await p.fill('#placeIn', ''); await p.waitForTimeout(60);
  check((await shown()).length === 244 && (await p.locator('#placeNone').isHidden()), 'clearing the search shows every country again', R);
  await p.press('#placeIn', 'Enter'); await p.waitForTimeout(60);
  check((await text(p, '#sheetTitle')) === 'Where do you study?', 'Enter in the search box only closes the keyboard', R);

  // Pick France from a search. The dot moves and the search stays as typed.
  await p.fill('#placeIn', 'fra'); await p.waitForTimeout(60);
  await p.click('#sheetBody .choice[data-v="FR"]'); await p.waitForTimeout(60);
  check((await checked(p).allTextContents()).join() === 'France' && (await p.inputValue('#placeIn')) === 'fra', 'tapping France picks it and leaves the search as it was', R);
  check((await text(p, '[data-act="placenext"]')) === 'Show courses', 'France has no states, so the button says Show courses', R);
  // The button stays on screen while the list scrolls.
  await p.fill('#placeIn', ''); await p.waitForTimeout(60);
  await p.evaluate(() => { const s = document.querySelector('.panel'); s.scrollTop = s.scrollHeight / 2; });
  await p.waitForTimeout(60);
  const box = await p.locator('[data-act="placenext"]').boundingBox();
  check(box && box.y > 600 && box.y + box.height <= 844, 'the button stays at the bottom of the sheet while the list scrolls', R);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(100);
  check((await text(p, '#sheetTitle')) === 'Courses' && (await text(p, '#sheetBody .place .t')) === 'France', 'the courses step names France', R);
  check(JSON.stringify((await saved(p)).place) === JSON.stringify({country: 'FR', state: null}), 'the pick is saved', R);
  check((await p.locator('#sheetBody .pick[data-sub="eco"]').count()) === 1 && (await headings(p)).join('|') === 'International courses|Open now', 'France shows the international courses, and NSW Economics only under Open now', R);
  check((await text(p, '#sheetBody > .sub')) === COMING('France'), 'it says courses for France are coming', R);

  // Later opens go straight to the courses. Change goes back, with France picked.
  await p.click('#sheetClose'); await p.waitForTimeout(80);
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await text(p, '#sheetTitle')) === 'Courses', 'the next open goes straight to the courses', R);
  await p.click('[data-act="placechange"]'); await p.waitForTimeout(100);
  check((await text(p, '#sheetTitle')) === 'Where do you study?' && (await checked(p).allTextContents()).join() === 'France' && (await p.locator('#sheetBody .places .choice').first().getAttribute('data-v')) === 'FR', 'Change goes back to the country step, with France picked at the top', R);
  check((await p.locator('#sheetBody .rule').textContent()).indexOf('guessed') < 0, 'and no longer says it guessed', R);
  // Back to Australia, Victoria.
  await p.click('#sheetBody .choice[data-v="AU"]'); await p.waitForTimeout(60);
  check((await text(p, '[data-act="placenext"]')) === 'Next', 'Australia has states, so the button says Next', R);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  const states = await p.locator('#sheetBody .choice .t').allTextContents();
  check(states.length === 8 && states[0] === 'New South WalesHSC' && states.slice(1).every(s => s.endsWith('Courses coming')), 'the state step lists the eight states and territories, NSW with the HSC, the others coming', R);
  check((await checked(p).allTextContents())[0].startsWith('New South Wales'), 'Sydney\'s time zone picks New South Wales', R);
  await p.click('[data-act="placeback"]'); await p.waitForTimeout(80);
  check((await text(p, '#sheetTitle')) === 'Where do you study?' && (await checked(p).allTextContents()).join().startsWith('Australia'), 'Back goes to the country step, still on Australia', R);
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80);
  await p.click('#sheetBody .choice[data-v="vic"]'); await p.waitForTimeout(60);
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(100);
  check((await text(p, '#sheetBody .place .t')) === 'Victoria, Australia' && (await text(p, '#sheetBody > .sub')) === COMING('Victoria'), 'Victoria says its courses are coming', R);
  check(JSON.stringify((await saved(p)).place) === JSON.stringify({country: 'AU', state: 'vic'}), 'Australia, Victoria is saved', R);
  await p.reload(); await p.waitForTimeout(300);
  sent.length = 0;      // the reload itself loads the page and its typefaces; only what the sheet does counts
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await text(p, '#sheetTitle')) === 'Courses' && (await text(p, '#sheetBody .place .t')) === 'Victoria, Australia', 'after a reload the sheet still opens on Victoria\'s courses', R);
  const own = sent.filter(u => !u.startsWith('http://127.0.0.1') && !u.startsWith('http://localhost'));
  check(own.length === 0, 'nothing is sent anywhere while the sheet is used' + (own.length ? ': ' + own.join(' ') : ''), R);
  check(await p.evaluate(() => window.__loc) === 0, 'the location feature is never asked for', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 3. the international courses show in every country ----------
for (const [place, own, line] of [
  [{country: 'AU', state: 'nsw'}, 'New South Wales', null],
  [{country: 'AU', state: 'vic'}, null, COMING('Victoria')],
  [{country: 'AU', state: 'nt'}, null, COMING('Northern Territory')],
  [{country: 'GB', state: null}, null, COMING('United Kingdom')],
  [{country: 'FR', state: null}, null, COMING('France')],
  [{country: 'AE', state: null}, null, COMING('United Arab Emirates')]
]) {
  const {b, p, errs} = await open({seed: {place: place, subject: 'edexcel'}});
  await p.click('.subject'); await p.waitForTimeout(100);
  const hs = await headings(p), name = await text(p, '#sheetBody .place .t');
  check(hs.includes('International courses') && (await p.locator('#sheetBody .pick[data-sub="edexcel"]').count()) === 1, name + ': the international courses show', R);
  check((await p.locator('#sheetBody .unit + .picks + .sub').last().textContent()) === 'Taught in schools around the world.', name + ': under them, Taught in schools around the world.', R);
  if (own) {
    check(hs[0] === own && (await p.locator('#sheetBody .pick[data-sub="eco"], #sheetBody .pick[data-sub="maths"]').count()) === 2 && (await p.locator('#sheetBody > .sub').first().textContent()) === 'More NSW subjects are coming.', name + ': NSW Economics and Maths come first, then More NSW subjects are coming.', R);
  } else {
    check(hs.join('|') === 'International courses' && (await p.locator('#sheetBody .pick[data-sub="eco"], #sheetBody .pick[data-sub="maths"]').count()) === 0 && (await p.locator('#sheetBody > .sub').first().textContent()) === line, name + ': ' + line, R);
  }
  errsAll.push(...errs); await b.close();
}

// ---------- 4. switching courses, each keeping its own progress ----------
{
  const ECO = {c1p1a: {ok: true, n: 1, t: Date.parse('2026-10-01T09:00:00')}};
  const ED = {'e-naturea': {ok: false, n: 1, t: Date.parse('2026-10-02T09:00:00')}};
  const MH = {m1p1: [{ok: true, day: '2026-10-01', q: 'a', t: 1}]};
  const {b, p, errs} = await open({seed: {place: {country: 'AU', state: 'nsw'}, ans: Object.assign({}, ECO, ED), cur: 'c1', m: {cur: 'm1', h: MH}}});
  const row = id => p.locator('#sheetBody .pick[data-sub="' + id + '"]');
  const sw = async id => { await p.click('.subject'); await p.waitForTimeout(100); await row(id).click(); await p.waitForTimeout(250); };
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await headings(p)).join('|') === 'New South Wales|International courses', 'NSW shows its own courses, then the international ones', R);
  const names = await p.locator('#sheetBody .pick:not(.place) .t').allTextContents();
  check(names[0] === 'Economics, Year 12HSC, The Global Economy' && names[1] === 'Maths, Year 11HSC, Equations' && names[2].startsWith('Economics, AS yearInternational A Level (Edexcel)'), 'each row has a plain name and the exam it leads to', R);
  check((await row('eco').locator('.v').textContent()) === 'Open' && (await row('maths').locator('.v').textContent()) === 'Switch' && (await row('edexcel').locator('.v').textContent()) === 'Switch', 'the course open now says Open, the others Switch', R);
  check((await p.locator('#sheetBody .pick:disabled').count()) === 0 && !(await text(p, '#sheetBody')).includes('Soon'), 'there are no Soon rows', R);
  await p.click('#sheetClose'); await p.waitForTimeout(80);
  await sw('edexcel');
  check((await text(p, '.subject')) === 'Economics, International A Level (Edexcel)' && (await saved(p)).subject === 'edexcel', 'switching to the Edexcel course opens it on Home', R);
  check((await p.locator('#v-home .pt.is-weak').count()) === 1, 'its own progress shows: one weak point', R);
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await row('edexcel').locator('.v').textContent()) === 'Open' && (await row('eco').locator('.v').textContent()) === 'Switch', 'the sheet now says the Edexcel course is open', R);
  await p.click('#sheetClose'); await p.waitForTimeout(80);
  await sw('maths');
  await p.waitForFunction(() => !!window.MathfieldElement);
  check((await text(p, '.subject')) === 'Maths, Year 11' && (await text(p, '.pt[data-p="m1p1"] .lab')) === 'Learned', 'switching to Maths shows its progress', R);
  await sw('eco');
  check((await text(p, '.subject')) === 'Economics, Year 12' && (await text(p, '.pt .lab')) === 'Learned', 'and back to NSW Economics, with its progress', R);
  const s = await saved(p);
  check(JSON.stringify(s.ans) === JSON.stringify(Object.assign({}, ECO, ED)) && JSON.stringify(s.m.h) === JSON.stringify(MH), 'switching changed no one\'s progress', R);
  // Moving to a country without NSW courses: the course open now stays in the sheet, under Open now, until another is picked.
  await p.click('.subject'); await p.waitForTimeout(100);
  await p.click('[data-act="placechange"]'); await p.waitForTimeout(80);
  await p.fill('#placeIn', 'united kingdom'); await p.waitForTimeout(60);
  await p.click('#sheetBody .choice[data-v="GB"]'); await p.click('[data-act="placenext"]'); await p.waitForTimeout(100);
  check((await headings(p)).join('|') === 'International courses|Open now' && (await row('eco').locator('.v').textContent()) === 'Open', 'in the United Kingdom, NSW Economics shows under Open now', R);
  await row('edexcel').click(); await p.waitForTimeout(250);
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await headings(p)).join('|') === 'International courses' && (await row('eco').count()) === 0, 'once the Edexcel course is open, Open now goes', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 5. a saved place this build does not know is dropped, so the sheet asks again ----------
for (const place of [{country: 'ZZ'}, {country: 'AU', state: 'qq'}, {country: 'AU'}, 'AU']) {
  const {b, p, errs} = await open({seed: {place: place}});
  await p.click('.subject'); await p.waitForTimeout(100);
  check((await text(p, '#sheetTitle')) === 'Where do you study?', 'a saved place of ' + JSON.stringify(place) + ' is dropped and the sheet asks again', R);
  await p.click('[data-act="placenext"]'); await p.click('[data-act="placedone"]'); await p.waitForTimeout(100);
  check(JSON.stringify((await saved(p)).place) === JSON.stringify({country: 'AU', state: 'nsw'}), 'confirming it saves a place again', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 6. it fits a small phone, in light and dark ----------
for (const scheme of ['light', 'dark']) {
  const {b, p, errs} = await open({w: 360, h: 640, scheme: scheme});
  await p.click('.subject'); await p.waitForTimeout(300);
  const wide = async () => p.evaluate(() => { const s = document.querySelector('.panel'); return s.scrollWidth - s.clientWidth + document.documentElement.scrollWidth - innerWidth; });
  const w1 = await wide();
  const btn = await p.locator('[data-act="placenext"]').boundingBox();
  await p.click('[data-act="placenext"]'); await p.waitForTimeout(80); const w2 = await wide();
  await p.click('[data-act="placedone"]'); await p.waitForTimeout(80); const w3 = await wide();
  check(w1 <= 0 && w2 <= 0 && w3 <= 0 && btn.y + btn.height <= 640, 'at 360 px in ' + scheme + ', no step scrolls sideways and the button is on screen', R);
  errsAll.push(...errs); await b.close();
}

// ---------- 7. screenshots of each step at 390 by 844, light and dark ----------
if (shots) for (const scheme of ['light', 'dark']) {
  {
    const {b, p, errs} = await open({scheme: scheme});
    await p.click('.subject'); await p.waitForTimeout(350);
    await shot(p, 'place-country-' + scheme);
    await p.fill('#placeIn', 'united'); await p.waitForTimeout(100);
    await shot(p, 'place-search-' + scheme);
    await p.fill('#placeIn', ''); await p.click('[data-act="placenext"]'); await p.waitForTimeout(350);
    await shot(p, 'place-state-' + scheme);
    await p.click('[data-act="placedone"]'); await p.waitForTimeout(350);
    await shot(p, 'place-courses-nsw-' + scheme);
    errsAll.push(...errs); await b.close();
  }
  {
    const {b, p, errs} = await open({scheme: scheme, locale: 'fr-FR', tz: 'Europe/Paris'});
    await p.click('.subject'); await p.waitForTimeout(350);
    await shot(p, 'place-country-france-' + scheme);
    await p.click('[data-act="placenext"]'); await p.waitForTimeout(350);
    await shot(p, 'place-courses-france-' + scheme);
    errsAll.push(...errs); await b.close();
  }
}

console.log(R.join('\n'));
console.log('errors:', errsAll.length ? errsAll : 'none');
if (errsAll.length) { console.log('ERRORS after', R.length, 'checks'); process.exitCode = 1; }
process.exit();
