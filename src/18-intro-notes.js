/* ---------- the intro notes: the first three events of the guitar opening of Across the Universe ----------
   From the guitar transcription, tuned down one semitone: G#3 and D#5 together, then C#3 on its own, which rings on
   under the next event, then F#4 and C#5 together. Three sounds to choose from, all with the same notes and timing:
   Glass (soft bells with a shimmer), Haze (a warm, blurred pad) and Halo (soft bells over a warm pad).
   The notes of an event start together. Each event swells in rather than being struck, keeps ringing as the next one
   starts so they blend, and the last one rings out at the end. A slow, faint pitch wobble, like old tape, runs under all of it. In Haze and Halo the notes
   float over a very soft, steady low E.
   This file makes the sound only. It uses nothing else from the app, so a test can play it into a recording and
   measure how loud it is. 20-sound.js plays it through the app's own volume, and 35-intro.js starts it. */
const INTRO_SOUND = 'glass';   /* the one the app plays. intro-sounds.html lets you hear all three */
const INTRO_NOTES = {
  events: [['G#3', 'D#5'], ['C#3'], ['F#4', 'C#5']],   /* in this order. The notes in one event start together */
  at: [0, 0.5, 1.0],             /* seconds from the start of the intro: as the rocket sets off, halfway round, near the end of the lap */
  ring: [0, 1.75, 0],            /* an event with a time here rings on under the next one until then, then melts away, as C#3 does */
  end: 2.8,                      /* the last event has rung out by here */
  overlap: 0.25,                 /* any other event keeps ringing this long after the next one starts, then melts away */
  under: 'E3',                   /* the very soft, steady low note under Haze and Halo, from the start to the end */
  /* What each sound is made of, the same for every note. bell: a soft bell on each note. shimmer: a quiet sine an octave above each note.
     pad: a warm pad on each note. under: the low E underneath. */
  glass: {bell: true, shimmer: true},
  haze: {pad: true, under: true},
  halo: {pad: true, bell: true, shimmer: true, under: true},
  /* How each one is shaped. top: the soft filter over everything (Hz). wobble: the tape wobble's depth, in cents.
     wet: how much reverb. level: how loud, measured against the correct-answer ping so each sits under it
     (tests/intro.mjs checks). */
  look: {
    glass: {top: 3600, wobble: 5, wet: 0.45, level: 0.15},
    haze: {top: 1700, wobble: 10, wet: 0.5, level: 0.38},
    halo: {top: 2800, wobble: 6, wet: 0.45, level: 0.17}
  }
};
/* The last event's fade: it keeps ringing at first, then falls away to nothing. */
const FADE = new Float32Array(32).map((v, i) => Math.pow(Math.cos(i / 31 * Math.PI / 2), 2));
/* A note name such as G#5 to its pitch in Hz. A4 is 440 Hz and middle C is C4. */
function noteHz(n) {
  const m = /^([A-G])(#?)(\d)$/.exec(n), semis = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11}[m[1]] + (m[2] ? 1 : 0);
  return 440 * Math.pow(2, (semis + 12 * (+m[3] + 1) - 69) / 12);
}
/* A note name one octave up: E5 to E6. */
const octaveUp = n => n.replace(/\d$/, d => +d + 1);
/* A soft, wide room: noise that dies away over secs and gets duller as it goes. The left and right sides get
   different noise, which makes it sound wide. */
function introRoom(a, secs) {
  const sr = a.sampleRate, len = Math.floor(sr * secs), ir = a.createBuffer(2, len, sr);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c); let y = 0;
    for (let i = Math.floor(sr * 0.018); i < len; i++) { const t = i / sr; y += (0.5 * Math.exp(-t * 3) + 0.06) * ((Math.random() * 2 - 1) - y); d[i] = y * Math.exp(-t * 6.9 / secs); }
  }
  const v = a.createConvolver(); v.buffer = ir; return v;
}
/* Play the three events into out, starting at time t0 on the audio clock. kind is 'glass', 'haze' or 'halo'. */
function playIntroNotes(a, out, t0, kind) {
  const N = INTRO_NOTES, v = N[kind], look = N.look[kind], end = t0 + N.end, fadeAt = t0 + 1.9;
  /* Everything goes through a soft filter (nothing sharp), then a slow swell, then out, with the reverb beside it. */
  const lvl = a.createGain(), top = a.createBiquadFilter(), swell = a.createGain(), sum = a.createGain();
  lvl.gain.value = look.level; lvl.connect(out);
  top.type = 'lowpass'; top.frequency.value = look.top; top.Q.value = 0.3;
  sum.connect(top); top.connect(swell); swell.connect(lvl);
  const room = introRoom(a, 1.6), wet = a.createGain();
  wet.gain.value = look.wet; swell.connect(room); room.connect(wet); wet.connect(lvl);
  /* The swell: brightness and volume rise and fall together, one cycle every two seconds. */
  const lfo = a.createOscillator(), toTop = a.createGain(), toVol = a.createGain();
  lfo.frequency.value = 0.5; toTop.gain.value = look.top * 0.22; toVol.gain.value = 0.1;
  lfo.connect(toTop); toTop.connect(top.frequency); lfo.connect(toVol); toVol.connect(swell.gain);
  /* The tape wobble: two very slow waves bend every note's pitch by a few cents. */
  const wob = a.createGain(), w1 = a.createOscillator(), w2 = a.createOscillator(), w2g = a.createGain();
  w1.frequency.value = 0.55; w2.frequency.value = 0.21; wob.gain.value = look.wobble; w2g.gain.value = 0.5;
  w1.connect(wob); w2.connect(w2g); w2g.connect(wob);
  [lfo, w1, w2].forEach(o => { o.start(t0); o.stop(end + 0.1); });
  /* An oscillator at f, held from t to stop, that follows the wobble. cents tunes it a little away from the others. */
  const osc = (type, f, cents, t, stop) => {
    const o = a.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = cents;
    wob.connect(o.detune); o.start(t); o.stop(stop); return o;
  };
  /* The pad: two slightly detuned saw waves on a note, under their own soft filter so they stay warm. */
  const pad = (n, into, t, stop, soft) => {
    const warm = a.createBiquadFilter(); warm.type = 'lowpass'; warm.frequency.value = soft || (kind === 'haze' ? 1300 : 1000); warm.Q.value = 0.3;
    warm.connect(into);
    [-8, 8].forEach(c => { const g = a.createGain(); g.gain.value = 0.16; osc('sawtooth', noteHz(n), c, t, stop).connect(g); g.connect(warm); });
  };
  /* The low E underneath: very soft and steady. It swells in from the start and fades with the last note. Its filter
     is set low, so it stays a plain low E without the brighter overtones a saw wave has. */
  if (v.under) {
    const g = a.createGain(), U = 0.3;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(U, t0 + 0.6);
    g.gain.setValueCurveAtTime(FADE.map(x => x * U), fadeAt, N.end - 1.95);
    g.connect(sum);
    pad(N.under, g, t0, end, 400);
  }
  N.events.forEach((notes, i) => {
    /* Each event has its own volume. It holds until a moment after the next event starts, then melts away.
       One marked to ring on holds under the next event until its time, then melts away the same way.
       The last one rings, then fades to nothing by the end. */
    const t = t0 + N.at[i], last = i === N.events.length - 1, melt = t0 + (N.ring[i] || N.at[i + 1] + N.overlap);
    const stop = last ? end : melt + 1.3;
    const note = a.createGain(); note.connect(sum);
    note.gain.setValueAtTime(1, t);
    if (last) note.gain.setValueCurveAtTime(FADE, fadeAt, N.end - 1.95);
    else note.gain.setTargetAtTime(0, melt, 0.2);
    /* Every part of a note swells in over attack seconds: nothing is struck. */
    const voice = (attack, peak) => {
      const g = a.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + attack); g.connect(note); return g;
    };
    /* Each note of the event goes through the same sound, all starting at once. */
    notes.forEach(n => {
      if (v.pad) pad(n, voice(0.14, 1), t, stop);
      /* The bell: a sine at the note, and quieter overtones a little off the whole-number steps, as a bell has.
         The higher ones fade sooner. A second copy of the note, 4 cents sharp, makes it shimmer slowly. */
      if (v.bell) {
        const bus = voice(0.11, kind === 'halo' ? 0.7 : 1), f = noteHz(n);
        [[1, 0.42, 1.2, 0], [1, 0.3, 1.2, 4], [2.004, 0.14, 0.6, 0], [2.76, 0.05, 0.35, 0], [4.07, 0.02, 0.22, 0]].forEach(([r, amp, fade, c]) => {
          const g = a.createGain();
          g.gain.setValueAtTime(amp, t); g.gain.setTargetAtTime(amp * 0.15, t + 0.11, fade);
          osc('sine', f * r, c, t, stop).connect(g); g.connect(bus);
        });
      }
      /* The shimmer: a quiet sine an octave above, trembling a little. */
      if (v.shimmer) {
        const g = a.createGain(), tr = a.createOscillator(), tg = a.createGain();
        g.gain.value = 0.08; tr.frequency.value = 5.6; tg.gain.value = 0.03;
        tr.connect(tg); tg.connect(g.gain); tr.start(t); tr.stop(stop);
        osc('sine', noteHz(octaveUp(n)), 0, t, stop).connect(g); g.connect(voice(0.3, 1));
      }
    });
  });
}
