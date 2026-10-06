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
  const STEPS = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
  const safe = fn => function () { try { fn.apply(null, arguments); } catch (e) {} };
  return {
    correct: safe((c, tier) => {
      const f = 523.25 * Math.pow(2, STEPS[Math.min(Math.max(c, 1) - 1, STEPS.length - 1)] / 12);
      tone(f, 0, 0.16, 'triangle', 0.3); tone(f * 1.5, 0.07, 0.22, 'triangle', 0.24);
      if (tier >= 1) blast(Math.min(tier, 4));
    }),
    wrong: safe(() => { tone(207.65, 0, 0.22, 'sine', 0.245); tone(155.56, 0.09, 0.3, 'sine', 0.218); }),
    /* Launch again: the rocket engine on its own, with no explosion. */
    liftoff: safe(() => { const a = ac(); if (a) rec('rocket', a.currentTime + 0.02, {rate: 1.1, vol: 0.78, fadeIn: 0.03, len: 0.9, fade: 0.5, wet: 0.2}); }),
    layer: safe(() => { [0, 4, 7, 12].forEach((s, i) => tone(659.25 * Math.pow(2, s / 12), 0.2 + i * 0.09, 0.25, 'sine', 0.19)); }),
    tap: safe(() => { tone(880, 0, 0.06, 'sine', 0.135); }),
    /* Phones only let sound start from inside a tap. Calling this in the tap gets the sound ready for what follows. */
    wake: safe(() => { ac(); })
  };
})();
function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
