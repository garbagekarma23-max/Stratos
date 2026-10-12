/* ---------- the intro's path: where the rocket is at each moment ----------
   The rocket flies a ring round the word Stratos, like a ring round a planet seen from slightly above. This file is
   only the maths, with no screen code, so tests/intro.mjs can check it on its own. 35-intro.js draws it.
   Times are in ms from the start. Positions are in px, from the top left of the intro. */
const INTRO = {
  total: 1500,        /* the whole intro */
  orbit: 1110,        /* one lap round the word. Then 390 ms leaving */
  safety: 1800,       /* the intro is gone by here, whatever happens */
  wordIn: 180,        /* the word fades in */
  fadeOut: 150,       /* the intro fades into Home over its last 150 ms, and as fast after a tap */
  margin: 26,         /* the ring is this much wider than the word on each side */
  height: 0.2,        /* the ring's height, as a share of its width */
  tilt: 12,           /* degrees. The right side rises */
  front: 0.16,        /* in front of the word the rocket is drawn up to 16% larger */
  back: 0.08,         /* behind it, up to 8% smaller */
  dim: 0.45,          /* and faded by up to 45% */
  trail: 300,         /* the trail shows where the rocket was over the last 300 ms */
  calm: 0.45,         /* the speed at the start, as a share of the lap's average. It speeds up from there */
  rocket: 34,         /* the rocket's height in px, before it is made larger or smaller */
  outBy: 1400         /* the rocket has left the frame by here */
};
/* How far round the ring the rocket has gone, in radians. During the lap it speeds up steadily. After the lap it
   keeps the speed it ended at. */
function introTurn(ms) {
  const k = INTRO.calm, s = ms / INTRO.orbit;
  if (ms <= INTRO.orbit) return 2 * Math.PI * (k * s + (1 - k) * s * s);
  return 2 * Math.PI * (1 + (k + 2 * (1 - k)) * s - (k + 2 * (1 - k)));
}
/* How much wider the ring is than at the start. It stays the same through the lap, then widens, slowly at first, so
   the rocket spirals out on the same curve. grow is how fast; introGrow works it out for the screen. */
function introWiden(ms, grow) {
  const t = Math.max(0, ms - INTRO.orbit) / 1000;
  return 1 + grow * t * t;
}
/* Where the rocket is. ring is {cx, cy, a}: the ring's centre, and half its width.
   depth runs from 1 (nearest, the bottom of the ring) to -1 (furthest, the top). The rocket is in front of the word
   while depth is 0 or more. */
function introAt(ms, ring, grow) {
  const th = Math.PI / 2 - introTurn(ms), w = introWiden(ms, grow), a = ring.a * w, b = a * INTRO.height;
  const lx = a * Math.cos(th), ly = b * Math.sin(th), al = -INTRO.tilt * Math.PI / 180;
  const depth = Math.sin(th);
  return {
    x: ring.cx + lx * Math.cos(al) - ly * Math.sin(al),
    y: ring.cy + lx * Math.sin(al) + ly * Math.cos(al),
    depth: depth,
    front: depth >= 0,
    scale: depth >= 0 ? 1 + INTRO.front * depth : 1 + INTRO.back * depth,
    alpha: depth >= 0 ? 1 : 1 + INTRO.dim * depth
  };
}
/* Which way the rocket is heading, as an angle for drawing it: 0 is nose up, and it turns clockwise. The nose always
   points along the path, so this is worked out from where it is a moment before and a moment after. */
function introHeading(ms, ring, grow) {
  const p = introAt(ms - 0.5, ring, grow), q = introAt(ms + 0.5, ring, grow);
  return Math.atan2(q.y - p.y, q.x - p.x) + Math.PI / 2;
}
/* Is the rocket wholly outside the frame (w by h)? */
function introOutside(p, w, h) {
  const r = INTRO.rocket * 0.6 * p.scale;
  return p.x < -r || p.x > w + r || p.y < -r || p.y > h + r;
}
/* The first moment after the lap when the rocket is outside the frame, or Infinity if it never leaves. */
function introExit(ring, grow, w, h) {
  for (let ms = INTRO.orbit; ms <= INTRO.total; ms += 4) if (introOutside(introAt(ms, ring, grow), w, h)) return ms;
  return Infinity;
}
/* How fast the ring widens: the gentlest widening that still takes the rocket out of the frame by INTRO.outBy. */
function introGrow(ring, w, h) {
  let g = 1;
  while (g < 1e5 && introExit(ring, g, w, h) > INTRO.outBy) g *= 1.15;
  return g;
}
