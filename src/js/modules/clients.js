/** Client logos: two CSS marquee rows moving in opposite directions. */
import { CLIENTS } from "../data/projects.js";
import { CONFIG } from "../config.js";
import { $$ } from "../utils.js";

export function initClients() {
  $$(".logos").forEach((row) => {
    // Each set repeats the logos so it is always wider than the screen: no gap before the loop restarts.
    const base = CLIENTS[Number(row.dataset.row)] || [];
    const names = [...base, ...base];
    const logos = (decorative) => names
      .map((n) => `<img src="${CONFIG.clientDir}${n}.png" alt="${decorative ? "" : n.replace(/-/g, " ")}"${decorative ? ' aria-hidden="true"' : ""} height="96" decoding="async" />`)
      .join("");
    // The set is duplicated so the loop is seamless; the copy is hidden from screen readers.
    row.innerHTML = `<div class="logos-set">${logos(false)}</div><div class="logos-set">${logos(true)}</div>`;
  });
}
