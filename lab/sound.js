/* Stratos Maths Lab: sound and vibration.
   The volume chain, the ping and the rising notes are copied from src/20-sound.js, with the same levels
   (MASTER = 0.4, NOTES = 2). That file is not changed. The recordings and race music are left out.
   The key click is new. It goes through the same chain and is set well below the ping. */
const labSound = (() => {
  'use strict';
  let ctx = null, bus = null, noise = null, offline = false;
  let enabled = () => true;
  /* Loudness, as in the main app. MASTER turns everything down at the very end. NOTES lifts the pings. */
  const MASTER = 0.4, NOTES = 2;
  function ac() {
    if (offline) return ctx;
    if (!enabled()) return null;
    try {
      if (!ctx) {
        const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
        const a = new C();
        /* Everything goes through one volume, a compressor and a soft ceiling, so nothing clips harshly. */
        const comp = a.createDynamicsCompressor(), limit = a.createWaveShaper(), curve = new Float32Array(2048), b = a.createGain(), out = a.createGain();
        comp.threshold.value = -9; comp.knee.value = 8; comp.ratio.value = 5; comp.attack.value = 0.003; comp.release.value = 0.25;
        for (let i = 0; i < 2048; i++) curve[i] = Math.tanh(1.2 * (i / 1023.5 - 1)) / Math.tanh(1.2);
        limit.curve = curve; b.gain.value = 0.5; out.gain.value = MASTER;
        b.connect(comp); comp.connect(limit); limit.connect(out); out.connect(a.destination);
        ctx = a; bus = b;
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
  /* The key click: a very short tap of filtered noise, like a soft key on a calculator.
     It starts at once, with no lead-in, so it lands with the finger. */
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
  const safe = fn => function () { try { fn.apply(null, arguments); } catch (e) {} };
  return {
    /* The page passes in a function that says whether sound is switched on. */
    use: fn => { enabled = fn; },
    click: safe(() => click(1.6)),
    /* A softer click while the cursor moves along the strip. */
    step: safe(() => click(0.6)),
    /* The main app's ping for a correct answer, at its first step. */
    right: safe(() => { const f = 523.25; tone(f, 0, 0.16, 'triangle', 0.3); tone(f * 1.5, 0.07, 0.22, 'triangle', 0.24); }),
    /* A finished question: the ping, then the main app's four rising notes. */
    solved: safe(() => {
      const f = 523.25; tone(f, 0, 0.16, 'triangle', 0.3); tone(f * 1.5, 0.07, 0.22, 'triangle', 0.24);
      [0, 4, 7, 12].forEach((s, i) => tone(659.25 * Math.pow(2, s / 12), 0.2 + i * 0.09, 0.25, 'sine', 0.19));
    }),
    /* Phones only let sound start from inside a tap. Calling this in the first tap gets the sound ready. */
    wake: safe(() => { ac(); }),
    /* For the tests: the loudest point and the average loudness of a sound, worked out without playing it. */
    measure: (name, rate) => measure(name, rate)
  };
  async function measure(name, rate) {
    const sr = rate || 44100, OC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const real = {ctx: ctx, bus: bus, noise: noise, enabled: enabled};
    const oc = new OC(1, Math.floor(sr * 1.2), sr);
    const comp = oc.createDynamicsCompressor(), limit = oc.createWaveShaper(), curve = new Float32Array(2048), b = oc.createGain(), out = oc.createGain();
    comp.threshold.value = -9; comp.knee.value = 8; comp.ratio.value = 5; comp.attack.value = 0.003; comp.release.value = 0.25;
    for (let i = 0; i < 2048; i++) curve[i] = Math.tanh(1.2 * (i / 1023.5 - 1)) / Math.tanh(1.2);
    limit.curve = curve; b.gain.value = 0.5; out.gain.value = MASTER;
    b.connect(comp); comp.connect(limit); limit.connect(out); out.connect(oc.destination);
    ctx = oc; bus = b; noise = null; enabled = () => true; offline = true;
    try {
      if (name === 'click') click(1.6); else if (name === 'step') click(0.6);
      else { const f = 523.25; tone(f, 0, 0.16, 'triangle', 0.3); tone(f * 1.5, 0.07, 0.22, 'triangle', 0.24); }
    } finally { ctx = real.ctx; bus = real.bus; noise = real.noise; enabled = real.enabled; offline = false; }
    const buf = await oc.startRendering(), d = buf.getChannelData(0);
    let peak = 0, sum = 0, n = 0;
    for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > peak) peak = v; if (v > 1e-4) { sum += v * v; n++; } }
    return {peak: peak, rms: Math.sqrt(sum / Math.max(1, n)), energy: sum / sr};
  }
})();
function labBuzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) {} }
