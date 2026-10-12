// The intro: the rocket flies a ring round the word Stratos as the app opens, then spirals out of the frame.
// The path maths is checked with no browser. The rest runs the page with its clock paused, moving it on by hand.
// The notes are played into a recording, measured against the correct-answer ping, and their pitches checked.
// Screenshots: intro-<when>-<width>-<scheme>.png in shots/.
import { open, check, SHOTS } from './lib.mjs';
import fs from 'fs';
const results = [], errors = [];
const read = f => fs.readFileSync(new URL('../src/' + f, import.meta.url), 'utf8');
const near = (a, b, d) => Math.abs(a - b) <= d;

// ---------- the path, no browser ----------
const I = new Function(read('34-intro-path.js') + '; return {INTRO, introAt, introTurn, introHeading, introGrow, introExit};')();
{
  const ring = {cx: 195, cy: 400, a: 126}, b = ring.a * 0.2, al = 12 * Math.PI / 180;
  // Undo the tilt to get each point in the ring's own terms: x along it, y across it.
  const local = p => { const dx = p.x - ring.cx, dy = p.y - ring.cy; return {x: dx * Math.cos(al) - dy * Math.sin(al), y: dx * Math.sin(al) + dy * Math.cos(al)}; };
  const lap = []; for (let t = 0; t <= I.INTRO.orbit; t += 2) lap.push(I.introAt(t, ring, 10));
  const xs = lap.map(p => local(p).x), ys = lap.map(p => local(p).y);
  check(near(Math.max(...xs), ring.a, 0.5) && near(Math.min(...xs), -ring.a, 0.5), 'the ring is as wide as the word plus 26 px each side', results);
  check(near(Math.max(...ys), b, 0.3) && near(Math.min(...ys), -b, 0.3), 'its height is 20% of its width', results);
  // The right end is where the local x is largest. It should sit above the centre, 12 degrees up.
  const right = lap[xs.indexOf(Math.max(...xs))], left = lap[xs.indexOf(Math.min(...xs))];
  const tilt = Math.atan2(left.y - right.y, right.x - left.x) * 180 / Math.PI;
  check(near(tilt, 12, 0.3), 'it is tilted 12 degrees with the right side up (' + tilt.toFixed(1) + ')', results);
  const p0 = I.introAt(0, ring, 10), l0 = local(p0);
  check(near(l0.x, 0, 0.01) && near(l0.y, b, 0.01) && p0.front, 'the rocket starts at the bottom, in front of the word', results);
  check(near(p0.scale, 1.16, 1e-6) && p0.alpha === 1, 'in front it is drawn 16% larger and not faded', results);
  check(local(I.introAt(20, ring, 10)).x > 0, 'it goes right first', results);
  const topP = lap.reduce((m, p) => p.depth < m.depth ? p : m);
  check(near(topP.scale, 0.92, 0.002) && near(topP.alpha, 0.55, 0.002) && !topP.front, 'behind the word it is smaller and faded', results);
  check(lap.every(p => p.front === (local(p).y >= -1e-9)), 'the lower half is in front of the word, the upper half behind', results);
  const end = I.introAt(I.INTRO.orbit, ring, 10);
  check(near(end.x, p0.x, 0.01) && near(end.y, p0.y, 0.01), 'one lap in 1.11 s, back where it started', results);
  const turnSpeed = (t, d = 1) => (I.introTurn(t + d) - I.introTurn(t - d)) / (2 * d);
  check(turnSpeed(100) < turnSpeed(500) && turnSpeed(500) < turnSpeed(1000), 'it speeds up round the lap', results);
  const atEnd = (I.introTurn(I.INTRO.orbit) - I.introTurn(I.INTRO.orbit - 1)), after = (I.introTurn(I.INTRO.orbit + 1) - I.introTurn(I.INTRO.orbit));
  check(near(atEnd, after, 1e-5) && near(turnSpeed(1200), turnSpeed(1400), 1e-9), 'after the lap it keeps the speed it ended at, without turning', results);
  // The nose points along the path: compare the heading with the way it moves over the next 2 ms.
  let worst = 0;
  for (let t = 5; t < 1450; t += 15) {
    const a = I.introAt(t, ring, 10), c = I.introAt(t + 2, ring, 10), h = I.introHeading(t + 1, ring, 10);
    const m = Math.atan2(c.y - a.y, c.x - a.x) + Math.PI / 2, d = Math.abs(Math.atan2(Math.sin(h - m), Math.cos(h - m)));
    worst = Math.max(worst, d);
  }
  check(worst < 0.05, 'the nose always points along the path', results);
  const sideH = Math.abs(Math.sin(I.introHeading(1, ring, 10)));
  check(sideH > 0.95, 'at the bottom of the ring it looks almost horizontal', results);
  // Leaving: the gentlest widening that still takes it out of the frame by 1.4 s, on every screen.
  for (const [w, h, a] of [[280, 653, 110], [360, 740, 126], [390, 844, 126], [440, 920, 126]]) {
    const r = {cx: w / 2, cy: h * 0.46, a: a}, g = I.introGrow(r, w, h), x = I.introExit(r, g, w, h);
    check(x <= 1400, 'at ' + w + ' px the rocket leaves the frame at ' + x + ' ms', results);
  }
}

// ---------- the notes, no app: played into a recording ----------
{
  // The ping is copied from sound.correct in 20-sound.js (first correct answer). Check the copy still matches.
  const s20 = read('20-sound.js');
  check(/MASTER = 0\.4, NOTES = 2/.test(s20) && s20.includes("tone(f, 0, 0.16, 'triangle', 0.3); tone(f * 1.5, 0.07, 0.22, 'triangle', 0.24);"),
    'the copy of the ping matches 20-sound.js', results);
  const {b, p, errs} = await open({file: 'tests/serve.mjs'});
  errors.push(...errs);
  await p.setContent('<p>notes</p>');
  await p.addScriptTag({content: read('18-intro-notes.js') + '\nwindow.T = {INTRO_NOTES, playIntroNotes, noteHz};'});
  const r = await p.evaluate(async () => {
    const stats = buf => {
      let peak = 0, rms = 0, tail = 0;
      for (let c = 0; c < buf.numberOfChannels; c++) {
        const d = buf.getChannelData(c), sr = buf.sampleRate, w = Math.floor(sr * 0.1); let s = 0;
        for (let i = 0; i < d.length; i++) {
          peak = Math.max(peak, Math.abs(d[i])); s += d[i] * d[i];
          if (i >= w) { s -= d[i - w] * d[i - w]; rms = Math.max(rms, Math.sqrt(Math.max(0, s) / w)); }
          if (i > 3.1 * sr) tail = Math.max(tail, Math.abs(d[i]));
        }
      }
      return {peak, rms, tail};
    };
    const out = {};
    {
      const a = new OfflineAudioContext(2, 48000, 48000);
      const tone = (f, at, dur, vol) => { const t = 0.02 + at, o = a.createOscillator(), g = a.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(f, t); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol * 2, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012 + dur); o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.07); };
      tone(523.25, 0, 0.16, 0.3); tone(523.25 * 1.5, 0.07, 0.22, 0.24);
      out.ping = stats(await a.startRendering());
    }
    // Every oscillator started, with its pitch and when it starts. Slow ones under 20 Hz are the wobble and swell.
    let started = [];
    const st = OscillatorNode.prototype.start;
    OscillatorNode.prototype.start = function (when) { if (this.frequency.value >= 20) started.push({f: this.frequency.value, at: when || 0}); return st.apply(this, arguments); };
    // The strongest pitch (by note name, any octave) in a stretch of the recording.
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const strongest = (buf, from, to) => {
      const d = buf.getChannelData(0), sr = buf.sampleRate, pcs = new Array(12).fill(0);
      for (let m = 40; m < 92; m++) {
        const w = 2 * Math.PI * 440 * Math.pow(2, (m - 69) / 12) / sr, c = 2 * Math.cos(w); let s1 = 0, s2 = 0;
        for (let i = Math.floor(from * sr); i < Math.floor(to * sr); i++) { const s0 = d[i] + c * s1 - s2; s2 = s1; s1 = s0; }
        pcs[m % 12] += s1 * s1 + s2 * s2 - c * s1 * s2;
      }
      return names[pcs.indexOf(Math.max(...pcs))];
    };
    for (const k of ['glass', 'haze', 'halo']) {
      const a = new OfflineAudioContext(2, 48000 * 3.6, 48000);
      started = [];
      T.playIntroNotes(a, a.destination, 0, k);
      const buf = await a.startRendering();
      out[k] = stats(buf);
      out[k].started = started;
      out[k].heard = [strongest(buf, 0.15, 0.5), strongest(buf, 0.8, 1.0), strongest(buf, 1.45, 1.9)];
    }
    out.hz = [T.noteHz('A4'), T.noteHz('E5'), T.noteHz('D#5'), T.noteHz('G#5'), T.noteHz('E3')];
    return out;
  });
  check(near(r.hz[0], 440, 1e-9) && near(r.hz[1], 659.26, 0.01) && near(r.hz[2], 622.25, 0.01) && near(r.hz[3], 830.61, 0.01) && near(r.hz[4], 164.81, 0.01), 'note names give the right pitches', results);
  for (const k of ['glass', 'haze', 'halo']) {
    const x = r[k], db = v => (20 * Math.log10(v)).toFixed(1);
    check(x.peak <= r.ping.peak, k + ': its loudest moment is under the ping\'s (' + db(x.peak) + ' dB, ping ' + db(r.ping.peak) + ')', results);
    check(x.rms <= r.ping.rms, k + ': its loudest tenth of a second is under the ping\'s (' + db(x.rms) + ' dB, ping ' + db(r.ping.rms) + ')', results);
    check(x.rms > r.ping.rms * 0.5, k + ': and still loud enough to hear next to it', results);
    check(x.tail < 0.003, k + ': it has rung out by 3.1 s (' + db(x.tail) + ' dB)', results);
  }
  // Exactly the notes asked for, at the times asked for. E5, D#5, G#5 land at 0, 0.5 and 1.0 s.
  // Bells add their own quieter overtones (2.004, 2.76 and 4.07 times the note). The shimmer is an octave up.
  // Only Haze and Halo have the low E3 underneath, from the start.
  const hz = {E5: 659.26, Ds5: 622.25, Gs5: 830.61, E3: 164.81};
  const notes = [[hz.E5, 0], [hz.Ds5, 0.5], [hz.Gs5, 1.0]];
  const parts = {glass: {bell: true, shimmer: true}, haze: {pad: true, under: true}, halo: {pad: true, bell: true, shimmer: true, under: true}};
  for (const k in parts) {
    const v = parts[k], allowed = [];
    for (const [f, at] of notes) {
      allowed.push([f, at]);
      if (v.bell) for (const r of [2.004, 2.76, 4.07]) allowed.push([f * r, at]);
      if (v.shimmer) allowed.push([f * 2, at]);
    }
    if (v.under) allowed.push([hz.E3, 0]);
    const st = r[k].started, has = (f, at) => st.some(o => Math.abs(o.f - f) < 0.05 && Math.abs(o.at - at) < 1e-6);
    const stray = st.filter(o => !allowed.some(([f, at]) => Math.abs(o.f - f) < 0.05 && Math.abs(o.at - at) < 1e-6));
    check(notes.every(([f, at]) => has(f, at)) && !stray.length,
      k + ': plays E5 at 0 s, D#5 at 0.5 s and G#5 at 1.0 s, and nothing else' + (stray.length ? ' (also ' + stray.map(o => o.f.toFixed(2) + ' Hz at ' + o.at + ' s').join(', ') + ')' : ''), results);
    check(has(hz.E3, 0) === !!v.under, k + (v.under ? ': a soft low E3 underneath, from the start' : ': nothing underneath'), results);
    check(has(hz.E5 * 2, 0) === !!v.shimmer, k + (v.shimmer ? ': a shimmer an octave up' : ': no shimmer'), results);
    check(r[k].heard.join() === 'E,D#,G#', k + ': the recording sounds E, then D#, then G# (' + r[k].heard.join(', ') + ')', results);
  }
  const N = await p.evaluate(() => T.INTRO_NOTES);
  check(N.at.join() === '0,0.5,1' && N.end === 2.8 && N.notes.join() === 'E5,D#5,G#5', 'the notes land at 0, 0.5 and 1.0 s, and ring out to 2.8 s', results);
  await b.close();
}

// ---------- the page ----------
// Spies on the sound: how many audio clocks were made, every oscillator started, and every fade.
const SPY = () => {
  window.SPY = {ctx: 0, osc: [], fades: 0};
  const A = window.AudioContext;
  window.AudioContext = class extends A { constructor(...a) { super(...a); window.SPY.ctx++; } };
  const st = OscillatorNode.prototype.start;
  OscillatorNode.prototype.start = function (when) { window.SPY.osc.push({when: when || 0, type: this.type, f: this.frequency.value}); return st.apply(this, arguments); };
  const cs = AudioParam.prototype.cancelScheduledValues;
  AudioParam.prototype.cancelScheduledValues = function () { window.SPY.fades++; return cs.apply(this, arguments); };
};
// Pixels of the rocket (its orange flame and fins) and of the trail (blue) on each canvas.
const pixels = p => p.evaluate(() => {
  const out = {};
  for (const id of ['introBack', 'introFront']) {
    const c = document.getElementById(id), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    let orange = 0, blue = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] > 60 && d[i] > d[i + 1] + 60 && d[i] > d[i + 2] + 100) orange++;
      if (d[i + 3] > 30 && d[i + 2] > d[i] + 60) blue++;
    }
    out[id === 'introBack' ? 'back' : 'front'] = {orange, blue};
  }
  return out;
});
const state = p => p.evaluate(() => { const e = document.getElementById('intro'); return {shown: !e.hidden, out: e.classList.contains('out'), word: +getComputedStyle(document.getElementById('introWord')).opacity, rocket: e.dataset.rocket}; });
const frame = async (p, ms) => { await p.clock.runFor(ms); await p.waitForTimeout(20); };

async function page(o = {}) {
  const r = await open(Object.assign({intro: true, motion: true, paused: true}, o, {init: [SPY].concat(o.init || [])}));
  errors.push(...r.errs);
  r.at = 0;
  r.to = async ms => { await frame(r.p, ms - r.at); r.at = ms; };
  return r;
}

{
  const {b, p, to} = await page({autoplay: true});
  let s = await state(p);
  check(s.shown && s.rocket === 'classic', 'the intro plays when the app opens, with the classic rocket by default', results);
  await to(1);
  check((await state(p)).word < 0.1, 'the word starts faded out', results);
  await to(90);
  s = await state(p);
  check(s.word > 0.35 && s.word < 0.65, 'and is half in at 0.09 s (' + s.word + ')', results);
  await to(200);
  check((await state(p)).word === 1, 'and fully in by 0.18 s (checked one frame later)', results);
  let px = await pixels(p);
  check(px.front.orange > 20 && px.back.orange === 0, 'at the start the rocket is in front of the word', results);
  await p.screenshot({path: SHOTS + 'intro-front-390-light.png'});
  await to(560);
  px = await pixels(p);
  check(px.back.orange > 10 && px.front.orange === 0, 'at the back of the ring it is behind the word', results);
  check(px.back.blue > 20 && px.front.blue > 20, 'its trail passes behind the word and in front of it', results);
  await p.screenshot({path: SHOTS + 'intro-back-390-light.png'});
  await to(1349); s = await state(p);
  check(s.shown && !s.out, 'at 1.35 s it is still showing', results);
  await to(1360);
  check((await state(p)).out, 'then it fades into Home', results);
  await to(1400);
  px = await pixels(p);
  check(px.front.orange + px.back.orange === 0, 'by 1.4 s the rocket has left the frame and is not drawn again', results);
  await to(1505);
  check(!(await state(p)).shown, 'and is gone at 1.5 s', results);
  // The notes: every part of each note starts at 0, 0.5 or 1.0 s after the first.
  const spy = await p.evaluate(() => window.SPY);
  const t0 = Math.min(...spy.osc.map(o => o.when)), lands = [...new Set(spy.osc.map(o => (o.when - t0).toFixed(2)))].sort();
  check(lands.join() === '0.00,0.50,1.00', 'the notes land at 0, 0.5 and 1.0 s (' + lands.join(', ') + ')', results);
  check(spy.osc.length > 0 && !spy.osc.some(o => o.type === 'sawtooth' || Math.abs(o.f - 164.81) < 0.05), 'the app plays Glass: bells, no pad and nothing underneath', results);
  // Changing tabs does not play it again. Opening the app again does.
  await p.click('.tab[data-tab="you"]'); await to(1600); await p.click('.tab[data-tab="home"]'); await to(1700);
  check(!(await state(p)).shown, 'switching tabs does not play it again', results);
  await p.reload(); await p.waitForTimeout(50);
  check((await state(p)).shown, 'opening the app again plays it again', results);
  await b.close();
}
{
  // A tap anywhere skips it and fades out the notes.
  const {b, p, to} = await page({autoplay: true});
  await to(300);
  const before = (await p.evaluate(() => window.SPY)).fades;
  await p.touchscreen.tap(60, 700);
  await to(310);
  const s = await state(p), after = (await p.evaluate(() => window.SPY)).fades;
  check(s.out, 'a tap anywhere skips it', results);
  check(before === 0 && after > 0, 'and fades out the notes', results);
  await to(470);
  check(!(await state(p)).shown, 'it is gone 0.15 s after the tap', results);
  check(await p.evaluate(() => document.querySelector('.tab[data-tab="home"]').getAttribute('aria-current') === 'page' && !document.querySelector('#sheet:not([hidden])')),
    'the tap does not press anything on Home', results);
  await b.close();
}
{
  // A key skips it too, and goes no further.
  const {b, p, to} = await page({w: 1280, h: 900});
  await to(200);
  await p.keyboard.press('Enter');
  await to(210);
  check((await state(p)).out, 'on a computer, any key skips it', results);
  await b.close();
}
{
  // The safety timer: the frames stop and the fade at the end breaks. It still goes at 1.8 s.
  const {b, p} = await page({init: () => {
    window.requestAnimationFrame = () => 0;
    const add = DOMTokenList.prototype.add;
    DOMTokenList.prototype.add = function (c) { if (c === 'out') throw new Error('broken on purpose'); return add.apply(this, arguments); };
  }});
  // The broken ending throws inside a timer, and the paused clock hands that error back here, so step past it.
  const start = await p.evaluate(() => performance.now());
  const until = async ms => {
    for (let i = 0; i < 500; i++) {
      const gone = await p.evaluate(s => performance.now() - s, start);
      if (gone >= ms) return;
      try { await p.clock.runFor(Math.min(10, ms - gone)); } catch (e) {}
    }
  };
  await until(1790);
  check((await state(p)).shown, 'with its frames frozen and its ending broken, the intro is still up at 1.79 s', results);
  await until(1805);
  check(!(await state(p)).shown, 'the safety timer takes it away at 1.8 s', results);
  await b.close();
}
{
  // Reduced motion: the word, and the rocket parked in front of it. Nothing moves. Then it fades into Home.
  for (const scheme of ['light', 'dark']) {
    const {b, p, to} = await page({motion: false, scheme});
    await to(5);
    const s = await state(p), a = await pixels(p);
    const snap = () => p.evaluate(() => document.getElementById('introFront').toDataURL());
    const first = await snap();
    await to(600);
    const later = await snap();
    if (scheme === 'light') {
      check(s.shown && s.word === 1, 'reduced motion: the word shows at once', results);
      check(a.front.orange > 20 && a.back.orange === 0 && a.front.blue + a.back.blue === 0, 'the rocket is parked in front, with no trail', results);
      check(first === later, 'and nothing moves', results);
    }
    await p.screenshot({path: SHOTS + 'intro-reduced-390-' + scheme + '.png'});
    await to(905);
    if (scheme === 'light') check((await state(p)).out && await p.evaluate(() => getComputedStyle(document.getElementById('intro')).transitionDuration) === '0.3s',
      'it fades into Home at 0.9 s, over 0.3 s', results);
    await to(1210);
    if (scheme === 'light') check(!(await state(p)).shown, 'and is gone by 1.2 s', results);
    await b.close();
  }
}
{
  // The picked rocket. A locked one falls back to the classic rocket, as everywhere else.
  for (const [pick, want] of [['needle', 'needle'], ['comet', 'classic']]) {
    const {b, p} = await page({seed: {rocket: pick}});
    check((await state(p)).rocket === want, 'with ' + pick + ' picked, the intro flies ' + want, results);
    await b.close();
  }
}
{
  // Sound switched off in You: no sound is made at all.
  const {b, p, to} = await page({seed: {sound: false}, autoplay: true});
  await to(400);
  const spy = await p.evaluate(() => window.SPY);
  check(spy.ctx === 0 && spy.osc.length === 0, 'with sound off, the intro makes no sound', results);
  await b.close();
}
{
  // A browser that has not allowed sound yet (as on a phone, before any tap): nothing plays, and nothing goes wrong.
  const {b, p, to} = await page();
  await to(1600);
  const spy = await p.evaluate(() => window.SPY);
  check(spy.osc.length === 0, 'when the browser has not allowed sound, the intro plays none and does not wait for it', results);
  check(!(await state(p)).shown, 'and the intro runs as normal', results);
  await b.close();
}
for (const [w, scheme] of [[360, 'light'], [360, 'dark'], [280, 'light']]) {
  const {b, p, to} = await page({w, scheme, h: w === 280 ? 653 : 740});
  await to(250);
  await p.screenshot({path: SHOTS + 'intro-front-' + w + '-' + scheme + '.png'});
  await to(800);
  await p.screenshot({path: SHOTS + 'intro-back-' + w + '-' + scheme + '.png'});
  const fits = await p.evaluate(() => { const r = document.getElementById('introWord').getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth; });
  check(fits, 'at ' + w + ' px ' + scheme + ' the word fits', results);
  await b.close();
}
{
  // The choosing page: three buttons, each replaying the intro with its sound.
  const {b, p, to} = await page({file: 'intro-sounds.html'});
  await to(1600);
  const labels = await p.locator('#pick button').allTextContents();
  check(labels.length === 3 && /Glass/.test(labels[0]) && /Haze/.test(labels[1]) && /Halo/.test(labels[2]), 'intro-sounds.html has Glass, Haze and Halo', results);
  const heard = {};
  for (const [i, k] of [[0, 'glass'], [1, 'haze'], [2, 'halo']]) {
    await p.evaluate(() => { window.SPY.osc = []; });
    await p.locator('#pick button').nth(i).click();
    await p.waitForTimeout(150);
    const s = await state(p), osc = await p.evaluate(() => window.SPY.osc);
    const at = f => osc.some(o => Math.abs(o.f - f) < 0.1);
    heard[k] = {shown: s.shown, saw: osc.some(o => o.type === 'sawtooth'), e5: at(659.26), under: at(164.81), bell: at(659.26 * 2.76), shimmer: at(659.26 * 2)};
    await to(1600 * (i + 2));
  }
  check(heard.glass.shown && heard.glass.e5 && heard.glass.bell && heard.glass.shimmer && !heard.glass.saw && !heard.glass.under, 'Glass replays the intro with bells and shimmer, nothing underneath', results);
  check(heard.haze.shown && heard.haze.e5 && heard.haze.saw && heard.haze.under && !heard.haze.bell && !heard.haze.shimmer, 'Haze plays a pad over the low E', results);
  check(heard.halo.shown && heard.halo.e5 && heard.halo.saw && heard.halo.bell && heard.halo.shimmer && heard.halo.under, 'Halo plays bells and shimmer over a pad and the low E', results);
  await b.close();
  const v2 = fs.readFileSync(new URL('../v2.html', import.meta.url), 'utf8');
  check(!v2.includes('Pick the intro sound'), 'v2.html itself has no choosing buttons', results);
}

console.log(results.join('\n'));
if (errors.length) { console.log('ERRORS after', errors); process.exitCode = 1; }
