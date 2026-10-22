// A fake Supabase for the tests, so they never reach the real one.
// The database is real: PGlite (Postgres running inside Node) with supabase/schema.sql, friends.sql, messages.sql and report-email.sql loaded
// into it, the same files that go into Supabase. Each request from the page runs as the student who sent it, so the tests check the real
// rules. Only the sign-in part is pretend: codes are kept here so a test can read them, and nothing is emailed.
// It answers only the requests the app makes. Anything else gets an error, so a new kind of request shows up in a test.
import { PGlite } from '@electric-sql/pglite';
import crypto from 'crypto';
import fs from 'fs';

export const URL_ = 'https://fake-stratos.supabase.co';
export const KEY = 'sb_publishable_fake_for_tests';
const SECRET = crypto.randomBytes(32);
const b64 = x => Buffer.from(typeof x === 'string' ? x : JSON.stringify(x)).toString('base64url');
const sign = s => crypto.createHmac('sha256', SECRET).update(s).digest('base64url');

export async function fakeSupabase() {
  const db = new PGlite();
  await db.exec(fs.readFileSync(new URL('./supabase-standin.sql', import.meta.url), 'utf8'));
  await db.exec(fs.readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8'));
  await db.exec(fs.readFileSync(new URL('../supabase/friends.sql', import.meta.url), 'utf8'));
  await db.exec(fs.readFileSync(new URL('../supabase/messages.sql', import.meta.url), 'utf8'));
  await db.exec(fs.readFileSync(new URL('../supabase/report-email.sql', import.meta.url), 'utf8'));
  const f = {url: URL_, key: KEY, db, codes: {}, refresh: {}, down: false, log: []};
  // One request at a time, the way one database connection works.
  let queue = Promise.resolve();
  const one = fn => (queue = queue.then(fn, fn));

  f.token = (user, secs = 3600) => {
    const now = Math.floor(Date.now() / 1000);
    const body = b64({alg: 'HS256', typ: 'JWT'}) + '.' + b64({sub: user.id, email: user.email, role: 'authenticated', aud: 'authenticated', iat: now, exp: now + secs});
    return body + '.' + sign(body);
  };
  const whoIs = auth => {
    const t = (auth || '').replace(/^Bearer /, ''), parts = t.split('.');
    if (parts.length !== 3 || sign(parts[0] + '.' + parts[1]) !== parts[2]) return null;
    const c = JSON.parse(Buffer.from(parts[1], 'base64url'));
    return c.role === 'authenticated' && c.exp > Date.now() / 1000 ? c : null;
  };
  const userJson = u => ({id: u.id, aud: 'authenticated', role: 'authenticated', email: u.email, email_confirmed_at: new Date().toISOString(),
    app_metadata: {provider: 'email', providers: ['email']}, user_metadata: {}, identities: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString()});
  f.session = u => {
    const r = crypto.randomBytes(12).toString('hex');
    f.refresh[r] = u;
    return {access_token: f.token(u), token_type: 'bearer', expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, refresh_token: r, user: userJson(u)};
  };
  f.user = async email => {
    const r = await db.query('insert into auth.users (email) values ($1) on conflict (email) do update set email = excluded.email returning id, email', [email]);
    return r.rows[0];
  };
  // Run SQL as a student (uid) or as someone not signed in (no uid), with the rules on.
  f.as = (uid, sql, params) => one(() => db.transaction(async tx => {
    await tx.query('set local role ' + (uid ? 'authenticated' : 'anon'));
    await tx.query("select set_config('request.jwt.claim.sub', $1, true)", [uid || '']);
    return tx.query(sql, params);
  }));
  // Run SQL as the database owner, past the rules. Only tests do this, to look at what is really stored.
  f.admin = (sql, params) => one(() => db.query(sql, params));

  const ID = /^[a-z_]+$/;
  const pgError = e => {
    const code = e.code || '';
    // P0001 is an error a function or check raises on purpose, such as banned_word. The real one answers 400.
    const status = code === '42501' ? 403 : code === '23505' ? 409 : code === '42883' || code === '42P01' ? 404 : code.startsWith('23') || code.startsWith('22') || code === 'P0001' ? 400 : 500;
    return {status, body: {code: code === '42883' ? 'PGRST202' : code, message: e.message, details: null, hint: null}};
  };

  async function rest(method, path, q, body, who, headers) {
    if (path.startsWith('rpc/')) {
      const fn = path.slice(4);
      if (!ID.test(fn) || method !== 'POST') return {status: 404, body: {code: 'PGRST202', message: 'not found'}};
      // Arguments are passed by name, the way the real one does it. A function that takes none cannot be given any.
      const args = body && typeof body === 'object' ? Object.keys(body) : [];
      if (!args.every(a => ID.test(a))) return {status: 400, body: {message: 'bad argument'}};
      const sql = 'select public.' + fn + '(' + args.map((a, i) => a + ' => $' + (i + 1)) .join(', ') + ') as v';
      // A function that returns nothing answers 204. One that returns something answers it as JSON, as the real one does.
      try {
        const r = await f.as(who && who.sub, sql, args.map(a => body[a]));
        const v = r.rows[0] ? r.rows[0].v : null;
        return v == null ? {status: 204} : {status: 200, body: v};
      } catch (e) { return pgError(e); }
    }
    const table = path;
    if (!ID.test(table)) return {status: 404, body: {message: 'no such table'}};
    const where = [], params = [];
    let cols = '*';
    for (const [k, v] of q) {
      if (k === 'select') { if (!v.split(',').every(c => ID.test(c) || c === '*')) return {status: 400, body: {}}; cols = v; continue; }
      if (k === 'columns') continue;
      const m = /^eq\.(.*)$/.exec(v);
      if (!ID.test(k) || !m) return {status: 400, body: {message: 'only eq filters are faked: ' + k + '=' + v}};
      params.push(m[1]); where.push(k + '::text = $' + params.length);
    }
    const w = where.length ? ' where ' + where.join(' and ') : '';
    const back = /return=representation/.test(headers.prefer || '');
    let sql;
    if (method === 'GET') sql = 'select ' + cols + ' from public.' + table + w;
    else if (method === 'POST') {
      const row = Array.isArray(body) ? body[0] : body, keys = Object.keys(row || {});
      if (!keys.length || !keys.every(k => ID.test(k))) return {status: 400, body: {}};
      const vals = keys.map(k => { params.push(typeof row[k] === 'object' && row[k] !== null ? JSON.stringify(row[k]) : row[k]); return '$' + params.length; });
      sql = 'insert into public.' + table + ' (' + keys.join(', ') + ') values (' + vals.join(', ') + ')' + (back ? ' returning ' + cols : '');
    } else if (method === 'PATCH') {
      const keys = Object.keys(body || {});
      if (!keys.length || !keys.every(k => ID.test(k))) return {status: 400, body: {}};
      const sets = keys.map(k => { params.push(typeof body[k] === 'object' && body[k] !== null ? JSON.stringify(body[k]) : body[k]); return k + ' = $' + params.length; });
      sql = 'update public.' + table + ' set ' + sets.join(', ') + w + (back ? ' returning ' + cols : '');
    } else if (method === 'DELETE') sql = 'delete from public.' + table + w;
    else return {status: 405, body: {}};
    try {
      const r = await f.as(who && who.sub, sql, params);
      if (method === 'GET' || back) {
        if (/vnd\.pgrst\.object/.test(headers.accept || '')) {
          if (r.rows.length !== 1) return {status: 406, body: {code: 'PGRST116', message: 'not one row'}};
          return {status: 200, body: r.rows[0]};
        }
        return {status: method === 'POST' ? 201 : 200, body: r.rows};
      }
      return {status: method === 'POST' ? 201 : 204};
    } catch (e) { return pgError(e); }
  }

  async function auth(method, path, q, body, who) {
    if (path === 'otp' && method === 'POST') {
      if (!body || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email || '')) return {status: 400, body: {code: 'validation_failed', msg: 'bad email'}};
      if (f.limit) return {status: 429, body: {code: 'over_email_send_rate_limit', error_code: 'over_email_send_rate_limit', msg: 'too many'}};
      f.codes[body.email.toLowerCase()] = String(crypto.randomInt(0, 1e6)).padStart(6, '0');
      return {status: 200, body: {}};
    }
    if (path === 'verify' && method === 'POST') {
      const email = (body.email || '').toLowerCase();
      if (!f.codes[email] || f.codes[email] !== body.token) return {status: 403, body: {code: 'otp_expired', error_code: 'otp_expired', msg: 'Token has expired or is invalid'}};
      delete f.codes[email];
      return {status: 200, body: f.session(await f.user(email))};
    }
    if (path === 'token' && method === 'POST' && q.get('grant_type') === 'refresh_token') {
      const u = f.refresh[body.refresh_token];
      if (!u) return {status: 400, body: {code: 'refresh_token_not_found', error_code: 'refresh_token_not_found', msg: 'Invalid Refresh Token'}};
      const still = await f.admin('select id from auth.users where id = $1', [u.id]);
      if (!still.rows.length) return {status: 403, body: {code: 'user_not_found', error_code: 'user_not_found', msg: 'User not found'}};
      delete f.refresh[body.refresh_token];
      return {status: 200, body: f.session(u)};
    }
    if (path === 'user' && method === 'GET') {
      if (!who) return {status: 401, body: {code: 'bad_jwt', msg: 'invalid JWT'}};
      const r = await f.admin('select id, email from auth.users where id = $1', [who.sub]);
      if (!r.rows.length) return {status: 403, body: {code: 'user_not_found', error_code: 'user_not_found', msg: 'User not found'}};
      return {status: 200, body: userJson(r.rows[0])};
    }
    if (path === 'logout' && method === 'POST') return {status: 204};
    return {status: 404, body: {msg: 'the fake does not answer ' + method + ' ' + path}};
  }

  // Send every request for the fake's address here, for one browser context (one device).
  f.route = ctx => ctx.route(URL_ + '/**', async route => {
    const req = route.request(), u = new URL(req.url()), headers = req.headers();
    if (f.down) { f.log.push('down ' + req.method() + ' ' + u.pathname); return route.abort('internetdisconnected'); }
    let body = null;
    try { body = req.postData() ? JSON.parse(req.postData()) : null; } catch (e) { body = null; }
    f.log.push(req.method() + ' ' + u.pathname + (u.search ? u.search : '') + (body && u.pathname.includes('/rpc/') ? ' ' + JSON.stringify(body) : ''));
    const cors = {'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*'};
    if (req.method() === 'OPTIONS') return route.fulfill({status: 204, headers: cors});
    let out;
    if (headers.apikey !== KEY) out = {status: 401, body: {message: 'Invalid API key'}};
    else {
      const who = whoIs(headers.authorization);
      const path = u.pathname;
      if (path.startsWith('/auth/v1/')) out = await auth(req.method(), path.slice(9), u.searchParams, body, who);
      else if (path.startsWith('/rest/v1/')) out = await rest(req.method(), path.slice(9), u.searchParams, body, who, headers);
      else out = {status: 404, body: {}};
    }
    return route.fulfill({status: out.status, headers: Object.assign({'content-type': 'application/json'}, cors), body: out.body === undefined ? '' : JSON.stringify(out.body)});
  });
  return f;
}
