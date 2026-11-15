/** Infinite marquee band that speeds up and skews with scroll velocity. */
import { $, clamp, lerp, escapeHTML, reduceMotion } from "../utils.js";
import { t, onLangChange } from "../i18n.js";

const band = $(".band");
const track = $(".band-track");

function render() {
  const items = t("band")
    .map((s) => (s.startsWith("*") ? `<span><em>${escapeHTML(s.replace(/\*/g, ""))}</em></span>` : `<span>${escapeHTML(s)}</span>`))
    .join('<span class="dot"></span>');
  const row = `<div class="band-row">${items}<span class="dot"></span></div>`;
  track.innerHTML = row + row + row;
}

export function initBand() {
  onLangChange(render);

  // Runs continuously (also with reduced motion, minus the scroll skew/boost).
  const SPEED = 1.21; // px per 60fps frame (+10%)
  let x = 0;
  let prev = 0;
  let velocity = 0;
  let last = scrollY;
  let running = false;

  function loop(now) {
    if (!running) return;
    const dt = prev ? Math.min((now - prev) / (1000 / 60), 3) : 1;
    prev = now;
    const y = scrollY;
    if (!reduceMotion) velocity = lerp(velocity, (y - last) * 0.6, 0.12);
    last = y;
    const rowWidth = track.firstElementChild?.offsetWidth || 1;
    x -= (SPEED + Math.abs(velocity)) * dt;
    while (x <= -rowWidth) x += rowWidth;
    track.style.transform = `translate3d(${x.toFixed(2)}px,0,0) skewX(${clamp(-velocity * 0.4, -10, 10).toFixed(2)}deg)`;
    requestAnimationFrame(loop);
  }

  // Only animate while on screen.
  new IntersectionObserver(([entry]) => {
    const was = running;
    running = entry.isIntersecting;
    if (running && !was) { last = scrollY; prev = 0; requestAnimationFrame(loop); }
  }).observe(band);
}
