/* ---------- the intro chords: D major, then A major, then B minor ----------
   Three sounds to choose from, all with the same chords and timing: Glass (soft bells with a shimmer), Haze (a warm,
   blurred pad with added ninths) and Halo (soft bells over a warm pad).
   The mood: high and light, hazy and spacious. Each chord swells in rather than being struck, melts into the next, and
   rings out at the end. A slow, faint pitch wobble, like old tape, runs under all of it.
   This file makes the sound only. It uses nothing else from the app, so a test can play it into a recording and
   measure how loud it is. 20-sound.js plays it through the app's own volume, and 35-intro.js starts it. */
const INTRO_SOUND = 'glass';   /* the one the app plays. intro-sounds.html lets you hear all three */
const CHORDS = {
  at: [0, 0.5, 1.0],             /* seconds from the start of the intro: as the rocket sets off, halfway round, near the end of the lap */
  end: 2.8,                      /* the last chord has rung out by here */
  overlap: 0.2,                  /* each chord keeps sounding this long after the next one starts, then melts away */
  /* A very soft low root under each chord, in all three. */
  root: ['D3', 'A2', 'B2'],
  glass: {
    bells: [['A4', 'D5', 'F#5'], ['A4', 'C#5', 'E5'], ['B4', 'D5', 'F#5']],
    shimmer: [['A5', 'D6', 'F#6'], ['A5', 'C#6', 'E6'], ['B5', 'D6', 'F#6']]          /* the bells, an octave up */
  },
  /* Haze adds the ninth to each chord (E in D, B in A, C sharp in B minor), so it never quite settles. */
  haze: {
    pad: [['F#4', 'A4', 'D5', 'E5'], ['E4', 'A4', 'B4', 'C#5'], ['F#4', 'B4', 'C#5', 'D5']]
  },
  halo: {
    pad: [['F#4', 'A4', 'D5'], ['E4', 'A4', 'C#5'], ['F#4', 'B4', 'D5']],
    bells: [['D5', 'F#5', 'A5'], ['C#5', 'E5', 'A5'], ['D5', 'F#5', 'B5']],
    shimmer: [['A6'], ['A6'], ['B6']]                                                  /* the top bell, an octave up */
  },
  /* How each one is shaped. top: the soft filter over everything (Hz). wobble: the tape wobble's depth, in cents.
     wet: how much reverb. level: how loud, measured against the correct-answer ping so each sits under it
     (tests/intro.mjs checks). */
  look: {
    glass: {top: 3600, wobble: 5, wet: 0.45, level: 0.11},
    haze: {top: 1700, wobble: 10, wet: 0.5, level: 0.237},
    halo: {top: 2800, wobble: 6, wet: 0.45, level: 0.164}
  }
};
/* The last chord's fade: it keeps ringing at first, then falls away to nothing. */
const FADE = new Float32Array(32).map((v, i) => Math.pow(Math.cos(i / 31 * Math.PI / 2), 2));
/* A note name such as F#4 to its pitch in Hz. A4 is 440 Hz and middle C is C4. */
function noteHz(n) {
  const m = /^([A-G])(#?)(\d)$/.exec(n), semis = {C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11}[m[1]] + (m[2] ? 1 : 0);
  return 440 * Math.pow(2, (semis + 12 * (+m[3] + 1) - 69) / 12);
}
/* A soft, wide room: noise that dies away over secs and gets duller as it goes. The left and right sides get
   different noise, which makes it sound wide. */
function chordRoom(a, secs) {
  const sr = a.sampleRate, len = Math.floor(sr * secs), ir = a.createBuffer(2, len, sr);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c); let y = 0;
    for (let i = Math.floor(sr * 0.018); i < len; i++) { const t = i / sr; y += (0.5 * Math.exp(-t * 3) + 0.06) * ((Math.random() * 2 - 1) - y); d[i] = y * Math.exp(-t * 6.9 / secs); }
  }
  const v = a.createConvolver(); v.buffer = ir; return v;
}
/* Play the three chords into out, starting at time t0 on the audio clock. kind is 'glass', 'haze' or 'halo'. */
function playChords(a, out, t0, kind) {
  const C = CHORDS, v = C[kind], look = C.look[kind], end = t0 + C.end;
  /* Everything goes through a soft filter (nothing sharp), then a slow swell, then out, with the reverb beside it. */
  const lvl = a.createGain(), top = a.createBiquadFilter(), swell = a.createGain(), sum = a.createGain();
  lvl.gain.value = look.level; lvl.connect(out);
  top.type = 'lowpass'; top.frequency.value = look.top; top.Q.value = 0.3;
  sum.connect(top); top.connect(swell); swell.connect(lvl);
  const room = chordRoom(a, 1.6), wet = a.createGain();
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
  C.at.forEach((at, i) => {
    /* Each chord has its own volume. It holds until a moment after the next chord starts, then melts away.
       The last one rings, then fades to nothing by the end. */
    const t = t0 + at, last = i === C.at.length - 1, stop = last ? end : t0 + C.at[i + 1] + C.overlap + 1.2;
    const chord = a.createGain(); chord.connect(sum);
    chord.gain.setValueAtTime(1, t);
    if (last) chord.gain.setValueCurveAtTime(FADE, t0 + 1.9, C.end - 1.95);
    else chord.gain.setTargetAtTime(0, t0 + C.at[i + 1] + C.overlap, 0.16);
    /* Every part of a chord swells in over attack seconds: nothing is struck. */
    const voice = (attack, peak) => {
      const g = a.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + attack); g.connect(chord); return g;
    };
    /* The very soft root. */
    osc('sine', noteHz(C.root[i]), 0, t, stop).connect(voice(0.15, 0.18));
    /* The pad: two slightly detuned saw waves per note, under their own soft filter so they stay warm. */
    if (v.pad) {
      const warm = a.createBiquadFilter(); warm.type = 'lowpass'; warm.frequency.value = kind === 'haze' ? 1300 : 1000; warm.Q.value = 0.3;
      warm.connect(voice(0.14, 1));
      v.pad[i].forEach(n => [-8, 8].forEach(c => { const g = a.createGain(); g.gain.value = 0.16; osc('sawtooth', noteHz(n), c, t, stop).connect(g); g.connect(warm); }));
    }
    /* The bells: a sine at the note, and quieter overtones a little off the whole-number steps, as a bell has.
       The higher ones fade sooner. A second copy of the note, 4 cents sharp, makes it shimmer slowly. */
    if (v.bells) {
      const bus = voice(0.11, kind === 'halo' ? 0.7 : 1);
      v.bells[i].forEach(n => {
        const f = noteHz(n);
        [[1, 0.42, 1.2, 0], [1, 0.3, 1.2, 4], [2.004, 0.14, 0.6, 0], [2.76, 0.05, 0.35, 0], [4.07, 0.02, 0.22, 0]].forEach(([r, amp, fade, c]) => {
          const g = a.createGain();
          g.gain.setValueAtTime(amp, t); g.gain.setTargetAtTime(amp * 0.15, t + 0.11, fade);
          osc('sine', f * r, c, t, stop).connect(g); g.connect(bus);
        });
      });
    }
    /* The shimmer: quiet sines an octave above, trembling a little, each at its own speed. */
    if (v.shimmer) {
      const bus = voice(0.3, 1);
      v.shimmer[i].forEach((n, k) => {
        const g = a.createGain(), tr = a.createOscillator(), tg = a.createGain();
        g.gain.value = 0.08; tr.frequency.value = 5.2 + k * 0.8; tg.gain.value = 0.03;
        tr.connect(tg); tg.connect(g.gain); tr.start(t); tr.stop(stop);
        osc('sine', noteHz(n), 0, t, stop).connect(g); g.connect(bus);
      });
    }
  });
}
