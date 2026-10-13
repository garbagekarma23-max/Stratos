/* ---------- sound: a ping on every correct answer, with a recorded blast under it once the combo reaches 3 ---------- */
/* The recordings, stored here as small MP3 files: an explosion (tnt), a rocket engine (rocket) and a low launch rumble (takeoff). */
const REC = /*REC*/{}/*REC-END*/;
const sound = (() => {
  let ctx = null, bus = null, verbIn = null;
  const samples = {};
  /* Loudness. MASTER turns everything down at the very end, so the blasts keep their character and are only quieter.
     NOTES lifts the pings and the other notes back up, so they sit closer to the blasts. */
  const MASTER = 0.4, NOTES = 2;
  /* Decode the recordings as soon as the page loads, so the first blast is ready. This needs no tap. */
  try {
    const OC = window.OfflineAudioContext || window.webkitOfflineAudioContext, oc = OC ? new OC(1, 1, 44100) : null;
    if (oc) Object.keys(REC).forEach(k => {
      const bin = atob(REC[k].d), bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const ok = buf => {
        /* MP3 files start with a little silence. Find where the sound really begins. */
        const d = buf.getChannelData(0); let peak = 0, lead = 0;
        for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > peak) peak = a; }
        for (let i = 0; i < d.length; i++) if (Math.abs(d[i]) > peak * 0.02) { lead = Math.max(0, i / buf.sampleRate - 0.001); break; }
        samples[k] = {buf: buf, lead: lead, norm: REC[k].n};
      };
      const p = oc.decodeAudioData(bytes.buffer, ok, () => {}); if (p && p.catch) p.catch(() => {});
    });
  } catch (e) {}
  function ac() {
    if (saved.sound === false) return null;
    try {
      if (!ctx) {
        const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
        const a = new C();
        /* Everything goes through one volume, a compressor and a soft ceiling, so a big blast never clips harshly. */
        const comp = a.createDynamicsCompressor(), limit = a.createWaveShaper(), curve = new Float32Array(2048), b = a.createGain(), out = a.createGain();
        comp.threshold.value = -9; comp.knee.value = 8; comp.ratio.value = 5; comp.attack.value = 0.003; comp.release.value = 0.25;
        for (let i = 0; i < 2048; i++) curve[i] = Math.tanh(1.2 * (i / 1023.5 - 1)) / Math.tanh(1.2);
        limit.curve = curve; b.gain.value = 0.5; out.gain.value = MASTER;
        b.connect(comp); comp.connect(limit); limit.connect(out); out.connect(a.destination);
        ctx = a; bus = b;
        /* Reverb: the echo of a big open space. Noise that fades over 2.6 seconds and gets duller as it fades. */
        try {
          const sr = a.sampleRate, len = Math.floor(sr * 2.6), ir = a.createBuffer(2, len, sr), pre = Math.floor(sr * 0.012);
          for (let c = 0; c < 2; c++) {
            const d = ir.getChannelData(c); let y = 0;
            for (let i = pre; i < len; i++) { const t = i / sr, k = 0.85 * Math.exp(-t * 2.2) + 0.06; y += k * ((Math.random() * 2 - 1) - y); d[i] = y * Math.exp(-t * 2.6); }
          }
          const verb = a.createConvolver(), verbOut = a.createGain(), vin = a.createGain();
          verb.buffer = ir; verbOut.gain.value = 1.6;
          vin.connect(verb); verb.connect(verbOut); verbOut.connect(b);
          verbIn = vin;
        } catch (e) {}
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch (e) { return null; }
  }
  function tone(f, at, dur, type, vol) {
    const a = ac(); if (!a) return;
    const t = a.currentTime + 0.02 + at, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol * NOTES, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012 + dur);
    o.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + 0.07);
  }
  /* The maths keypad's click: a very short tap of filtered noise, like a soft key on a calculator.
     Copied from lab/sound.js with the level measured there, well below the ping. */
  let noise = null;
  function click(vol) {
    const a = ac(); if (!a) return;
    if (!noise) { noise = a.createBuffer(1, Math.floor(a.sampleRate * 0.03), a.sampleRate); const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    const t = a.currentTime, s = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
    s.buffer = noise; f.type = 'bandpass'; f.frequency.value = 2600; f.Q.value = 1.1;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);
    s.connect(f); f.connect(g); g.connect(bus); s.start(t); s.stop(t + 0.03);
  }
  /* Play one recording. A rate below 1 plays it slower, which makes it deeper and longer, so it sounds bigger. */
  function rec(name, t, o) {
    const a = ac(), s = samples[name]; if (!a || !s) return;
    const rate = o.rate || 1, len = Math.min(o.len || 99, (s.buf.duration - s.lead) / rate);
    const peak = o.vol * s.norm, fin = o.fadeIn || 0.002, fout = Math.min(o.fade || 0.03, len * 0.7);
    const n = a.createBufferSource(), g = a.createGain();
    n.buffer = s.buf; n.playbackRate.value = rate;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + fin);
    g.gain.setValueAtTime(peak, t + len - fout); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    n.connect(g); g.connect(bus);
    if (o.wet && verbIn) { const w = a.createGain(); w.gain.value = o.wet; g.connect(w); w.connect(verbIn); }
    n.start(t, s.lead); n.stop(t + len + 0.02);
  }
  /* The blast: an explosion as the engine lights, then the rocket roar. size is 1 to 4, one per combo tier. */
  const VOL = [0, 0.5, 0.66, 0.84, 1.05], RATE = [0, 1.25, 1.1, 0.97, 0.86];
  const ROAR = {rate: [0, 1.2, 1.1, 1, 0.88], len: [0, 0.6, 0.9, 1.35, 9], fade: [0, 0.35, 0.5, 0.6, 0.03]};
  function blast(size) {
    const a = ac(); if (!a) return;
    const t = a.currentTime + 0.02;
    rec('tnt', t, {rate: RATE[size], vol: 1.3 * VOL[size], wet: 0.08 + 0.06 * size});
    rec('rocket', t + 0.04, {rate: ROAR.rate[size], vol: 0.9 * VOL[size], fadeIn: 0.05, len: ROAR.len[size], fade: ROAR.fade[size], wet: 0.1});
    if (size >= 3) rec('takeoff', t, {vol: 0.3 * VOL[size], fadeIn: 0.05, len: size === 3 ? 1.6 : 2.4, fade: 0.7});
  }
  /* Race music: a ticking clock over a low pulse, made here in code so it needs no file.
     It builds in three steps: 0 at the start of a race, 1 from halfway, 2 when someone is one answer from winning.
     MUSIC sets how loud it is. It sits well under the pings, and dips for a moment each time one plays. */
  const MUSIC = 0.5, BPM = 116;
  let mGain = null, mTimer = 0, mLevel = -1, mStep = 0, mNext = 0, hiss = null;
  function mTone(f, t, dur, type, vol) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(mGain); o.start(t); o.stop(t + dur + 0.05);
  }
  function mThump(t) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.45, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(g); g.connect(mGain); o.start(t); o.stop(t + 0.32);
  }
  function mHiss(t) {
    if (!hiss) { hiss = ctx.createBuffer(1, ctx.sampleRate / 4, ctx.sampleRate); const d = hiss.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; }
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = hiss; f.type = 'highpass'; f.frequency.value = 6000;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.003); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    s.connect(f); f.connect(g); g.connect(mGain); s.start(t); s.stop(t + 0.1);
  }
  /* One sixteenth of a beat. q is the place in the bar (0 to 15). */
  function mBeat(s, t, L) {
    const q = s % 16, bar = Math.floor(s / 16);
    if (q % 2 === 0 || L >= 1) mTone(q % 4 === 0 ? 2093 : 1568, t, 0.03, 'sine', q % 4 === 0 ? 0.16 : 0.07);   /* the clock ticks, twice as often from halfway */
    if (q === 0) mTone(55, t, 0.5, 'sine', 0.35);                                                              /* a low pulse once a bar */
    if (L >= 1 && q % 4 === 0) mThump(t);                                                                       /* a kick on every beat from halfway */
    if (L >= 2 && q === 0) mTone(523.25 * Math.pow(2, (bar % 4) / 12), t, 1.9, 'triangle', 0.07);              /* a high note that climbs each bar */
    if (L >= 2 && q === 12) mHiss(t);
  }
  /* Every 25 ms, plan the notes for the next 0.12 seconds, so the beat stays steady even if the page is busy. */
  function mTick() {
    if (mLevel < 0 || saved.music === false || !ac()) { stopMusic(); return; }
    if (mNext < ctx.currentTime) mNext = ctx.currentTime + 0.05;   /* after a pause, carry on from now instead of playing the missed notes at once */
    while (mNext < ctx.currentTime + 0.12) { mBeat(mStep, mNext, mLevel); mStep++; mNext += 60 / BPM / 4; }
  }
  function stopMusic() {
    clearInterval(mTimer); mTimer = 0; mLevel = -1;
    if (!mGain) return;
    const g = mGain, t = ctx.currentTime;
    g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(0, t + 0.08);
    setTimeout(() => g.disconnect(), 300);
    mGain = null;
  }
  function duck() {
    if (!mGain) return;
    const g = mGain.gain, t = ctx.currentTime;
    g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(MUSIC * 0.35, t + 0.03); g.linearRampToValueAtTime(MUSIC, t + 0.6);
  }
  /* The intro: three short notes while the rocket circles the word, in the same family as the ping. The
     frequencies are exact, not the nearest standard notes: the second is four semitones below the first, and the
     third is an octave above the second. Each note is a soft triangle tone, like the ping, with a quiet shimmer an
     octave up (double the frequency). It pops in over 8 ms and fades over 0.25 s, ending before the next note
     starts. The last note fades over 0.5 s, with a faint sparkle two octaves up, so it ends lightly instead of
     cutting off. Only triangle and sine waves, so every overtone is a whole multiple of the note and the pitch
     stays exact. A gentle low-pass filter keeps the edges soft, and a very short, light room (about 0.3 s) is the
     only reverb. Everything is finished by about 1.6 s.
     Everything goes through iGain, so a tap that skips the intro can fade it all out at once. The levels keep it
     below one ping (a test measures this).
     The three timings being compared:
       steady  notes at 0, 0.5 and 1 s, in step with the rocket's laps
       quick   notes at 0, 0.3 and 0.6 s
       bouncy  notes at 0, 0.2 and 0.5 s, the last one a little louder */
  const INTRO = {
    notes: [355.1, 281.8, 563.7],
    timings: {steady: {at: [0, 0.5, 1]}, quick: {at: [0, 0.3, 0.6]}, bouncy: {at: [0, 0.2, 0.5], last: 1.25}},
    pick: 'steady', fade: 0.25, lastFade: 0.5
  };
  /* Each timing's overall level, measured so its loudest moment sits a little under one ping. */
  const LEVEL = {steady: 0.75, quick: 0.75, bouncy: 0.6};
  let iGain = null, iRoom = null;
  /* The room: a very short echo, made from noise that dies away in about 0.3 s. It uses the same numbers every
     time, so the intro sounds the same on every opening. Seed 268 was picked from 600 because it gives the three
     notes the same echo, within 1 dB, in both ears. Left and right use different numbers. */
  const ROOM_SEED = 268;
  function introRoom() {
    if (iRoom) return iRoom;
    const sr = ctx.sampleRate, len = Math.floor(sr * 0.35), ir = ctx.createBuffer(2, len, sr);
    for (let c = 0; c < 2; c++) {
      let n = (ROOM_SEED + c * 7919) >>> 0;
      const rnd = () => { n = (Math.imul(n, 1664525) + 1013904223) >>> 0; return n / 4294967296 * 2 - 1; };
      const d = ir.getChannelData(c); let y = 0;
      for (let i = 0; i < len; i++) { const t = i / sr; y += 0.7 * (rnd() - y); d[i] = y * Math.exp(-t * 23); }
    }
    iRoom = ir;
    return ir;
  }
  /* A volume that pops up over 8 ms on a smooth curve, then dies away like a plucked string, reaching silence at
     len seconds. */
  function pop(peak, len) {
    const n = Math.max(32, Math.round(len * 400)), c = new Float32Array(n), K = 5, rise = 0.008;
    for (let i = 0; i < n; i++) {
      const t = len * i / (n - 1);
      c[i] = t < rise ? peak * (0.5 - 0.5 * Math.cos(Math.PI * t / rise))
        : peak * (Math.exp(-K * (t - rise) / (len - rise)) - Math.exp(-K)) / (1 - Math.exp(-K));
    }
    c[n - 1] = 0;
    return c;
  }
  /* One wave at time t for len seconds, with the pop above, into dest. */
  function voice(f, type, t, len, peak, dest) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    g.gain.value = 0;                                  /* silent until the curve starts */
    g.gain.setValueCurveAtTime(pop(peak, len), t, len);
    o.connect(g); g.connect(dest); o.start(t); o.stop(t + len + 0.02);
  }
  function introNotes(kind) {
    const T = INTRO.timings[kind] || INTRO.timings[INTRO.pick], t0 = ctx.currentTime + 0.03;
    iGain = ctx.createGain(); iGain.gain.value = LEVEL[kind] || 1; iGain.connect(bus);
    const soft = ctx.createBiquadFilter(); soft.type = 'lowpass'; soft.frequency.value = 3200; soft.Q.value = 0.5; soft.connect(iGain);
    const room = ctx.createConvolver(), wet = ctx.createGain();
    room.buffer = introRoom(); wet.gain.value = 0.25;
    soft.connect(room); room.connect(wet); wet.connect(iGain);
    INTRO.notes.forEach((f, i) => {
      const last = i === INTRO.notes.length - 1, t = t0 + T.at[i], v = 0.3 * (last && T.last ? T.last : 1);
      /* A note fades over 0.25 s, or ends just before the next one if that comes sooner, so they never overlap. */
      const len = last ? INTRO.lastFade : Math.min(INTRO.fade, T.at[i + 1] - T.at[i] - 0.01);
      voice(f, 'triangle', t, len, v, soft);                         /* the note */
      voice(f * 2, 'sine', t, len * 0.8, v * 0.16, soft);             /* the shimmer, an octave up */
      if (last) voice(f * 4, 'sine', t + 0.03, len * 0.7, v * 0.06, soft);   /* the sparkle, two octaves up */
    });
  }
  function stopIntro() {
    if (!iGain) return;
    const g = iGain, t = ctx.currentTime;
    g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t); g.gain.linearRampToValueAtTime(0, t + 0.1);
    setTimeout(() => g.disconnect(), 300);
    iGain = null;
  }
  let introOn = false;
  const STEPS = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
  const safe = fn => function () { try { fn.apply(null, arguments); } catch (e) {} };
  return {
    /* Start the race music, or change how far it has built. A level below 0 stops it. */
    music: safe(level => {
      if (level < 0 || saved.music === false || !ac()) { stopMusic(); return; }
      if (!mTimer) {
        mGain = ctx.createGain(); mGain.gain.value = MUSIC; mGain.connect(bus);
        mStep = 0; mNext = ctx.currentTime + 0.05;
        mTimer = setInterval(mTick, 25);
      }
      mLevel = level;
    }),
    correct: safe((c, tier) => {
      duck();
      const f = 523.25 * Math.pow(2, STEPS[Math.min(Math.max(c, 1) - 1, STEPS.length - 1)] / 12);
      tone(f, 0, 0.16, 'triangle', 0.3); tone(f * 1.5, 0.07, 0.22, 'triangle', 0.24);
      if (tier >= 1) blast(Math.min(tier, 4));
    }),
    wrong: safe(() => { duck(); tone(207.65, 0, 0.22, 'sine', 0.245); tone(155.56, 0.09, 0.3, 'sine', 0.218); }),
    /* Launch again: the rocket engine on its own, with no explosion. */
    liftoff: safe(() => { const a = ac(); if (a) rec('rocket', a.currentTime + 0.02, {rate: 1.1, vol: 0.78, fadeIn: 0.03, len: 0.9, fade: 0.5, wet: 0.2}); }),
    layer: safe(() => { [0, 4, 7, 12].forEach((s, i) => tone(659.25 * Math.pow(2, s / 12), 0.2 + i * 0.09, 0.25, 'sine', 0.19)); }),
    tap: safe(() => { tone(880, 0, 0.06, 'sine', 0.135); }),
    /* The maths keypad: a click for each key, and a softer one as the cursor moves along the strip. */
    click: safe(() => click(1.6)),
    step: safe(() => click(0.6)),
    /* The intro notes. Browsers hold sound back until the first tap on a page, and most phones do every time.
       Then the intro is silent: the notes only start if the sound is allowed straight away, so they never turn up
       late, in the middle of something else. kind picks the timing (steady, quick or bouncy). */
    intro: safe(kind => {
      if (navigator.getAutoplayPolicy && navigator.getAutoplayPolicy('audiocontext') === 'disallowed') return;
      const a = ac(); if (!a) return;
      kind = kind || INTRO.pick;
      introOn = true;
      const asked = Date.now();
      if (a.state === 'running') { introNotes(kind); return; }
      const p = a.resume();
      if (p && p.then) p.then(() => { if (introOn && Date.now() - asked < 300 && a.state !== 'closed') introNotes(kind); }, () => {});
    }),
    /* At the end of the intro the last note rings on under Home. A tap that skips it fades the notes out (cut). */
    introStop: safe(cut => { introOn = false; if (cut) stopIntro(); }),
    /* Phones only let sound start from inside a tap. Calling this in the tap gets the sound ready for what follows. */
    wake: safe(() => { ac(); })
  };
})();
function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
