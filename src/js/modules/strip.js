/**
 * Pinned 16mm film strip. It loops endlessly: frames that leave one side come
 * back on the other. Scrolling drives it, and a slow drift keeps it alive at rest.
 */
import { STRIP } from "../data/projects.js";
import { $, $$, clamp, pad2, imgTag, reduceMotion } from "../utils.js";

const COPIES = 3;   // enough film to always cover the screen while looping
const RATIO = 1.3;  // px sideways per px scrolled
const DRIFT = 28;   // px per second when idle

export function initStrip() {
  const section = $(".strip");
  const track = $(".strip-track");
  const progress = $(".strip-progress");

  const frame = (name, i, copy) =>
    `<figure class="frame"${copy ? ' aria-hidden="true"' : ""}><div class="frame-in">${imgTag(name, { sizes: "(max-width: 900px) 70vw, 45vw" })}</div><figcaption>KODAK ${pad2(i + 1)}A ▸ 16MM</figcaption></figure>`;
  track.innerHTML = Array.from({ length: COPIES }, (_, c) => STRIP.map((n, i) => frame(n, i, c > 0)).join("")).join("");
  const frames = $$(".frame", track);
  const images = $$("img", track);

  // Width of one full pass of the film.
  let setWidth = 1;
  const size = () => {
    setWidth = frames[STRIP.length].offsetLeft - frames[0].offsetLeft || 1;
    section.style.height = `${Math.max(innerHeight * 2.5, setWidth / RATIO)}px`;
  };
  size();
  addEventListener("resize", size);

  let drift = 0;
  let prev = 0;
  let running = false;

  function loop(now) {
    if (!running) return;
    const dt = prev ? Math.min((now - prev) / 1000, 0.05) : 0;
    prev = now;
    if (!reduceMotion) drift += DRIFT * dt;

    const r = section.getBoundingClientRect();
    const p = clamp((innerHeight - r.top) / r.height);
    const offset = (p * setWidth + drift) % setWidth;
    track.style.setProperty("--sx", `${(-offset).toFixed(1)}px`);
    progress.style.setProperty("--sp", p.toFixed(4));
    if (!reduceMotion) {
      images.forEach((img, i) => img.style.setProperty("--fx", `${((p * 2 - 1) * -6 + (i % 2) * 2).toFixed(2)}%`));
    }
    requestAnimationFrame(loop);
  }

  new IntersectionObserver(([entry]) => {
    const was = running;
    running = entry.isIntersecting;
    if (running && !was) { prev = 0; requestAnimationFrame(loop); }
  }).observe(section);
}
