/** Pinned 16mm film strip that travels horizontally while you scroll down. */
import { STRIP } from "../data/projects.js";
import { $, $$, clamp, pad2, imgTag, reduceMotion } from "../utils.js";
import { onFrame } from "../scroll.js";

export function initStrip() {
  const section = $(".strip");
  const track = $(".strip-track");
  const progress = $(".strip-progress");

  track.innerHTML = STRIP.map((name, i) =>
    `<figure class="frame"><div class="frame-in">${imgTag(name, { sizes: "(max-width: 900px) 70vw, 45vw" })}</div><figcaption>KODAK ${pad2(i + 1)}A ▸ 16MM</figcaption></figure>`
  ).join("");
  const images = $$("img", track);

  // The section is as tall as the film is long, so the strip glides with the
  // scroll (about 1.3px sideways per 1px down) instead of racing past.
  const RATIO = 1.3;
  const distanceFor = (w) => Math.max(0, track.scrollWidth - w);
  const size = () => { section.style.height = `${Math.max(innerHeight * 2.5, distanceFor(innerWidth) / RATIO)}px`; };
  size();
  addEventListener("resize", size);

  onFrame((_y, vp) => {
    const r = section.getBoundingClientRect();
    if (r.top > vp.h || r.bottom < 0) return;
    // Starts moving as soon as the strip enters the screen and keeps going until it leaves.
    const p = clamp((vp.h - r.top) / r.height);
    const distance = distanceFor(vp.w);
    track.style.setProperty("--sx", `${(-p * distance).toFixed(1)}px`);
    progress.style.setProperty("--sp", p.toFixed(4));
    if (!reduceMotion) {
      images.forEach((img, i) => img.style.setProperty("--fx", `${((p * 2 - 1) * -6 + (i % 2) * 2).toFixed(2)}%`));
    }
  });
}
