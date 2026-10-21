# Sign-in emails

Paste these into the Supabase dashboard: Authentication, then Emails, then Templates. Both are in now, sent through
Resend (README step 6). Use the same text for both
**Magic Link** and **Confirm signup**. A student's first sign-in gets Confirm signup, and every later one gets Magic Link.

`{{ .Token }}` is where Supabase puts the code. `{{ .ConfirmationURL }}` is the link. Leave both exactly as written.

## Subject

```
Your Stratos code: {{ .Token }}
```

## Message body

```html
<p>Your Stratos sign-in code is:</p>
<p style="font-size:28px;font-weight:600;letter-spacing:4px">{{ .Token }}</p>
<p>Type it into Stratos where you asked for it. It works for 15 minutes.</p>
<p>Or <a href="{{ .ConfirmationURL }}">sign in with this link</a> on the device where you are reading this email.</p>
<p>If you did not ask for this, you can ignore this email. Nobody can sign in without the code.</p>
```

The code is the main way in. A Stratos app added to an iPhone's Home Screen keeps its own storage, apart from Safari,
and an email link always opens in Safari. The code works there. School email systems often open links before the
student sees them. The link and the code are the same one-time token, so that most likely uses up the code too.
