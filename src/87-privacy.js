/* ---------- the privacy policy: a page that opens over the tabs ----------
   Opened from the Privacy row on You and from the line under the email box on the sign-in sheet (85-account.js).
   It is plain words for a Year 7 student, and it must say what the code and supabase/*.sql really do. If a change
   collects something new, keeps it longer or shows it to someone new, change this page in the same pull request.
   docs/privacy-review.md says where each line comes from. */
const PRIVACY_DATE = '24 November 2026';
const SUPPORT = 'support@stratosstudy.com';

PAGE.privacy = () => {
  const h = t => '<h3>' + t + '</h3>';
  const p = t => '<p>' + t + '</p>';
  const ul = items => '<ul>' + items.map(t => '<li>' + t + '</li>').join('') + '</ul>';
  const mail = '<a href="mailto:' + SUPPORT + '">' + SUPPORT + '</a>';
  return {title: 'Privacy', cls: 'privacy', html:
    '<p class="notice">Draft. Last changed ' + PRIVACY_DATE + '. This may change before Stratos launches.</p>' +

    h('The short version') +
    ul(['You can use Stratos without an account. Then your progress stays on this device.',
      'An account needs only an email address. We never ask for your real name, birthday, photo or address.',
      'Friends see your call sign, your username and only a few other things, listed below.',
      'Anything that shares more with other students starts switched off. You choose what to turn on.',
      'We never sell your information. Stratos has no ads.',
      'You can delete your account at any time. Almost everything goes straight away.']) +

    h('Without an account') +
    p('Your progress, settings and call sign are saved on this device only. Stratos gets nothing about you.') +
    p('Two things still leave your device:') +
    ul(['When the page loads, GitHub (which hosts the website) sees your device’s internet address and browser. Every website works this way. The lettering comes from the Stratos website too, so no other company sees it load.',
      'If you use Could we improve this?, we get the card or question, the problem you picked and any note you write. Nothing says who sent it. Only the person who runs Stratos reads your note, and it is never made public.']) +

    h('With an account') +
    p('This is what we keep, and why:') +
    ul(['Your email address, to send you sign-in codes.',
      'Your progress, so it is the same on every device.',
      'Your call sign and username, so friends can find you and know it’s you.',
      'Your friends, friend requests and blocks, so your friends list works.',
      'The messages you send friends, so they can read them.',
      'Challenge scores and times, so you and a friend can see who won.',
      'Each right answer you give, with the question and the time, for the weekly table.',
      'Whether you have the app open right now, for the green Online dot.',
      'Feedback you send. Your account is kept with it only to count the daily limit.']) +
    p('Supabase, which runs our database, also records when you sign in and the internet address you sign in from. This keeps accounts safe.') +

    h('What friends can see') +
    p('A friend sees your call sign (or your username if you have no call sign), and:') +
    ul(['the messages you send them',
      'your challenge scores and times',
      'your total right answers this week, if you turn that on',
      'that you are online, if you turn that on.']) +
    p('Friends never see your email, your progress or who your other friends are.') +
    p('If you turn on Let people find me by username, someone who isn’t your friend can find your username by searching. They see only your username and how many friends you share. With it off, only people you give your friend code to can add you.') +

    h('Who else can see it') +
    ul(['The person who runs Stratos can see what is stored, including messages. They read messages only when someone reports them, to fix a problem, or to keep someone safe.',
      'If you report a message, we keep a copy of it and up to 10 messages either side, so we can check what happened. The other student isn’t told who reported them.',
      'If we think someone is in danger, we may tell the police or another emergency service.',
      'We never sell your information or share it with advertisers.']) +

    h('Companies that help run Stratos') +
    ul(['Supabase stores account information. Our database is in Sydney, Australia.',
      'Resend sends the sign-in emails, so it gets your email address. It is in the United States.',
      'GitHub hosts the website, in the United States. It gets your internet address when the page loads.']) +
    p('Each one has its own privacy rules. Some of your information can be stored outside Australia.') +

    h('How long we keep it') +
    ul(['Your account, progress, call sign, username and friends: until you delete your account.',
      'Messages: 90 days.',
      'Challenges: 90 days.',
      'Right answers for the weekly table: 15 days.',
      'Online: about a minute after you leave the app.',
      'Feedback and reports: 12 months.',
      'An account nobody has signed in to or used for 2 years: deleted, with everything in it.']) +

    h('Your choices') +
    p('Open You, then Account. These three switches start off for a new account. You can turn each one on or off at any time:') +
    ul(['Let people find me by username: people who aren’t your friends can find you by searching.',
      'Show when I’m online: your friends see a green dot while you have Stratos open.',
      'Show me on friends’ weekly table: your friends see your total right answers this week.']) +
    p('Accounts made before 24 November 2026 kept the switches they had, and are shown a notice once that explains them.') +
    p('You can block anyone, and report any message a friend sends you.') +

    h('See, change or delete it') +
    ul(['Change your call sign on You, and your username on the Account sheet (once a day).',
      'Delete account, on the Account sheet, deletes your account, progress, friends, messages, challenges and answers straight away.',
      'Reports and feedback stay until they are 12 months old, with your account taken off them.',
      'Reset, on You, erases your progress and settings on this device.',
      'To get a copy of what we keep about you, or to fix something wrong, email ' + mail + '.']) +

    h('If you are under 15') +
    p('Ask a parent or carer to read this with you before you make an account. A parent or carer can email us to ask what we keep about their child, or to have the account deleted.') +

    h('Keeping it safe') +
    ul(['Rules in the database check every request, so each student can reach only their own information.',
      'Messages are checked before they are sent. Phone numbers, email addresses, links and some words are blocked.',
      'Messages with real friends are never saved on your device.']) +

    h('Questions or problems') +
    p('Email ' + mail + '. If you’re not happy with our answer, you can complain to the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au" target="_blank" rel="noopener">oaic.gov.au</a>.') +

    h('Changes') +
    p('If we change this policy, the date at the top changes. If a change means we keep something new, we’ll tell you in the app first.')};
};

/* From the sign-in sheet, the sheet closes for the page and opens again when the page closes, with the email typed so
   far and the same button to go back to. From anywhere else, the page just opens. */
ACT.privacy = () => {
  let then = null;
  if (!sheet.hidden) {
    const box = $('#emailIn');
    if (box) {
      const typed = box.value, title = signTitle, from = sheetFrom;
      /* The view under the page is drawn again as it closes, so the button that opened the sheet is found again by
         its data-act and data-title, on screen, for focus to go back to when the sheet closes. */
      const act = from && from.dataset ? from.dataset.act : '', btn = from && from.dataset ? from.dataset.title : undefined;
      then = () => {
        signInSheet(title);
        const i = $('#emailIn'); if (i) i.value = typed;
        sheetFrom = from && from.isConnected ? from : (act ? $$('[data-act="' + CSS.escape(act) + '"]').find(b => b.dataset.title === btn && b.getClientRects().length && getComputedStyle(b).visibility === 'visible') || null : null);
      };
    }
    closeSheet();
  }
  openPage('privacy');
  if (then) topPage().then = then;
};
