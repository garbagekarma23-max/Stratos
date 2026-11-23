// The privacy policy (src/87-privacy.js): the Privacy row on You, the line under the email box on the sign-in sheet,
// the page itself (its draft line, contact, headings, plain words), going back, the sign-in sheet coming back with the
// email typed, nothing asked of Supabase, and 360 px in light and dark with no sideways scroll. With no browser, it
// also checks that the numbers the page gives for how long things are kept are the ones in supabase/*.sql, so the two
// cannot drift apart. node privacy.mjs shots saves privacy-top, privacy-end and privacy-signin, light and dark, at
// 390 by 844.
import fs from 'fs';
import { open, tab, shot, check } from './lib.mjs';
const R = [], SHOTS = process.argv[2] === 'shots', errsAll = [];
const read = f => fs.readFileSync(new URL('../' + f, import.meta.url), 'utf8');
const LINE = 'Your email is used only to sign in. See what Stratos keeps in the privacy policy.';
const HEADS = ['The short version', 'Without an account', 'With an account', 'What friends can see', 'Who else can see it',
  'Companies that help run Stratos', 'How long we keep it', 'Your choices', 'See, change or delete it', 'If you are under 15',
  'Keeping it safe', 'Questions or problems', 'Changes'];
const BANNED = ['crucial', 'delve', 'enhance', 'foster', 'garner', 'highlight', 'interplay', 'intricate', 'key', 'landscape', 'meticulous',
  'pivotal', 'showcase', 'tapestry', 'testament', 'underscore', 'valuable', 'vibrant', 'groundbreaking', 'renowned'];
async function close(d) { errsAll.push(...d.errs); await d.b.close(); }
const pageText = p => p.locator('.page .p-body').innerText();
// Sideways scroll anywhere on the page: the page body, or the document.
const sideways = p => p.evaluate(() => {
  const b = document.querySelector('.page .p-body');
  return (b && b.scrollWidth > b.clientWidth + 1) || document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
});

// ---------- the numbers on the page match the database ----------
{
  const js = read('src/87-privacy.js'), sql = f => read('supabase/' + f);
  const says = t => js.includes(t);
  check(says("'Messages: 90 days.'") && /delete from public\.messages where sent_at < now\(\) - interval '90 days'/.test(sql('messages.sql')), 'messages: 90 days on the page and in messages.sql', R);
  check(says("'Challenges: 90 days.'") && /delete from public\.challenges where made_at < now\(\) - interval '90 days'/.test(sql('challenges.sql')), 'challenges: 90 days on the page and in challenges.sql', R);
  check(says("'Right answers for the weekly table: 15 days.'") && /delete from public\.week_answers where user_id = me and at < now\(\) - interval '15 days'/.test(sql('week.sql')), 'weekly table answers: 15 days on the page and in week.sql', R);
  check(says("'Online: about a minute after you leave the app.'") && /now\(\) \+ interval '60 seconds'/.test(sql('live.sql')), 'online: about a minute on the page, 60 seconds in live.sql', R);
  check(says("'Feedback and reports: 12 months.'") && /delete from public\.feedback where at < now\(\) - interval '12 months'/.test(sql('feedback.sql'))
    && /delete from moderation\.reports where at < now\(\) - interval '12 months'/.test(sql('messages.sql')), 'feedback and reports: 12 months on the page and in the SQL', R);
  check(says('up to 10 messages either side') && /report_message\.n - 10 and report_message\.n \+ 10/.test(sql('messages.sql')), 'a report copies up to 10 messages either side, as messages.sql does', R);
  check(/reporter uuid references auth\.users \(id\) on delete set null/.test(sql('messages.sql')) && /user_id uuid references auth\.users \(id\) on delete set null/.test(sql('feedback.sql')),
    'reports and feedback lose the account when it is deleted, as the page says', R);
}

// ---------- You, signed out, accounts on ----------
{
  const d = await open();
  const asked = [];
  d.p.on('request', r => { if (/supabase\.co/.test(r.url())) asked.push(r.url()); });
  await tab(d.p, 'you');
  const row = d.p.locator('#v-you .row[data-act="privacy"]');
  check(await row.count() === 1 && (await row.locator('.t').textContent()) === 'Privacy' && (await row.locator('.val').textContent()) === 'What Stratos keeps', 'You has a Privacy row, What Stratos keeps', R);
  await row.click(); await d.p.waitForTimeout(250);
  check((await d.p.locator('.page .p-bar h2').textContent()) === 'Privacy', 'it opens the Privacy page', R);
  const note = await d.p.locator('.page .notice').textContent();
  check(note.startsWith('Draft. Last changed ') && note.includes('may change before Stratos launches'), 'which says first that it is a draft, and when it last changed', R);
  const heads = await d.p.locator('.page h3').allTextContents();
  check(JSON.stringify(heads) === JSON.stringify(HEADS), 'with its headings in order (' + heads.length + ')', R);
  const mails = await d.p.locator('.page a[href="mailto:support@stratosstudy.com"]').count();
  check(mails === 2, 'support@stratosstudy.com as a link, twice', R);
  check(await d.p.locator('.page a[href="https://www.oaic.gov.au"]').count() === 1, 'and the OAIC for complaints', R);
  const text = await pageText(d.p);
  const words = text.toLowerCase().match(/[a-z]+/g);
  const found = BANNED.filter(w => words.some(x => x === w || (w !== 'key' && x.startsWith(w))));
  check(!found.length, 'no banned word in the page' + (found.length ? ' (' + found.join(', ') + ')' : ''), R);
  check(!/[—–]/.test(text), 'and no em or en dash', R);
  const sentences = text.split(/[.!?:]\s+|\n+/).map(s => s.trim()).filter(Boolean);
  const longest = sentences.reduce((a, s) => Math.max(a, s.split(/\s+/).length), 0);
  check(longest <= 30, 'every sentence is short enough for Year 7 (longest ' + longest + ' words)', R);
  check(text.includes('never sell your information') && text.includes('Delete account'), 'it says information is never sold, and how to delete it', R);
  check(await d.p.evaluate(() => document.activeElement && document.activeElement.dataset.act === 'back'), 'focus is on Back', R);
  await d.p.keyboard.press('Escape'); await d.p.waitForTimeout(200);
  check(await d.p.locator('.page').count() === 0 && await d.p.evaluate(() => document.activeElement && document.activeElement.dataset.act === 'privacy'), 'Escape closes it, and focus goes back to the Privacy row', R);

  // ---------- the sign-in sheet ----------
  await d.p.locator('#v-you .row[data-act="signin"]').click(); await d.p.waitForTimeout(200);
  check((await d.p.locator('#privLine').textContent()) === LINE, 'the sign-in sheet has the one line about the privacy policy', R);
  await d.p.locator('#emailIn').fill('you@example.com');
  if (SHOTS) await shot(d.p, 'privacy-signin-light');
  await d.p.locator('#privLine [data-act="privacy"]').click(); await d.p.waitForTimeout(250);
  check(await d.p.locator('#sheet').isHidden() && (await d.p.locator('.page .p-bar h2').textContent()) === 'Privacy', 'its link closes the sheet and opens the policy', R);
  await d.p.locator('.page [data-act="back"]').click(); await d.p.waitForTimeout(200);
  check(await d.p.locator('#sheet').isVisible() && (await d.p.locator('#sheetTitle').textContent()) === 'Save your progress' && (await d.p.locator('#emailIn').inputValue()) === 'you@example.com',
    'Back opens the sheet again, with its title and the email typed', R);
  await d.p.locator('#sheetClose').click(); await d.p.waitForTimeout(150);
  check(await d.p.evaluate(() => document.activeElement && document.activeElement.dataset.act === 'signin'), 'closing the sheet then puts focus back on the row that opened it', R);
  check(asked.length === 0, 'nothing asked of Supabase', R);
  await close(d);
}

// ---------- the welcome screen's Create an account reaches the same line ----------
{
  const d = await open({welcome: true});
  await d.p.locator('#welcome .primary').click(); await d.p.waitForTimeout(200);
  check((await d.p.locator('#sheetTitle').textContent()) === 'Create an account' && (await d.p.locator('#privLine').textContent()) === LINE, 'Create an account on the welcome screen shows the line too', R);
  await d.p.locator('#privLine [data-act="privacy"]').click(); await d.p.waitForTimeout(250);
  await d.p.locator('.page [data-act="back"]').click(); await d.p.waitForTimeout(200);
  check((await d.p.locator('#sheetTitle').textContent()) === 'Create an account', 'and comes back to Create an account', R);
  await close(d);
}

// ---------- accounts off: the page is still there ----------
{
  const d = await open({accounts: false});
  await tab(d.p, 'you');
  check(await d.p.locator('#v-you .row[data-act="signin"], #v-you .row[data-act="account"]').count() === 0 && await d.p.locator('#v-you .row[data-act="privacy"]').count() === 1, 'with accounts off, You has no account row but keeps Privacy', R);
  await close(d);
}

// ---------- 360 px, light and dark ----------
for (const scheme of ['light', 'dark']) {
  const d = await open({w: 360, h: 760, scheme});
  await tab(d.p, 'you');
  await d.p.locator('#v-you .row[data-act="privacy"]').click(); await d.p.waitForTimeout(250);
  check(!(await sideways(d.p)), 'at 360 px in ' + scheme + ', the page does not scroll sideways', R);
  const ink = await d.p.evaluate(() => { const s = getComputedStyle(document.querySelector('.privacy p')), b = getComputedStyle(document.querySelector('.page')); return [s.color, b.backgroundColor]; });
  check(ink[0] !== ink[1], 'and its words are a different colour from the paper (' + ink.join(' on ') + ')', R);
  await close(d);
  if (SHOTS) {
    const s = await open({scheme});
    await tab(s.p, 'you');
    await s.p.locator('#v-you .row[data-act="privacy"]').click(); await s.p.waitForTimeout(300);
    await shot(s.p, 'privacy-top-' + scheme);
    await s.p.evaluate(() => { const b = document.querySelector('.page .p-body'); b.scrollTop = b.scrollHeight; });
    await s.p.waitForTimeout(100);
    await shot(s.p, 'privacy-end-' + scheme);
    if (scheme === 'dark') {
      await s.p.locator('.page [data-act="back"]').click(); await s.p.waitForTimeout(150);
      await s.p.locator('#v-you .row[data-act="signin"]').click(); await s.p.waitForTimeout(200);
      await shot(s.p, 'privacy-signin-dark');
    }
    await close(s);
  }
}

console.log(R.join('\n'));
console.log('errors: ' + JSON.stringify(errsAll));
if (errsAll.length) process.exitCode = 1;
