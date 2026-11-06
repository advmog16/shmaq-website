# SHMAQ STUDIO — Website

Portfolio website for **SHMAQ / Shmagh**, an independent Saudi creative studio.
Bilingual (English / العربية with full RTL), motion-led, and dependency-free.

> موقع بورتفوليو لاستديو شماغ الإبداعي — عربي/إنجليزي، أنميشن متعدد، وبدون أي مكتبات خارجية عشان يكون خفيف وما يعلق.

---

## Quick start

```bash
npm run dev       # serve src/ at http://localhost:8080 (no install needed)
npm run build     # produce the optimized site in dist/
npm run preview   # build, then serve dist/
```

Requires Node 18+. There are **no npm dependencies** — nothing to install.

## Project structure

```
shmaq-website/
├── src/                      ← the website (edit here)
│   ├── index.html            page markup; static text uses data-i18n="key"
│   ├── 404.html · robots.txt · sitemap.xml
│   ├── css/
│   │   ├── main.css          entry: @imports every partial below, in order
│   │   ├── tokens.css        colors, fonts, easing, spacing
│   │   ├── base.css          reset & element defaults
│   │   ├── utilities.css     logo mask, section heads, reveal classes, grain
│   │   ├── loader.css        preloader + custom cursor
│   │   ├── nav.css           header + mobile menu
│   │   ├── hero.css          shrinking slideshow + SHMAQ wordmark
│   │   ├── manifesto.css     word-by-word reveal + stats
│   │   ├── band.css          velocity marquee
│   │   ├── work.css          project grid & cards
│   │   ├── strip.css         pinned 16mm film strip
│   │   ├── approach.css      “How we work” + floating image
│   │   ├── clients.css       logo marquee
│   │   ├── contact.css       CTA + footer
│   │   ├── case.css          case-study overlay
│   │   ├── video.css         video modal
│   │   ├── rtl.css           Arabic / RTL overrides
│   │   └── responsive.css    breakpoints + reduced motion
│   ├── js/
│   │   ├── main.js           entry: wires every module together
│   │   ├── config.js         ✏️ contact email, default language, timings
│   │   ├── data/
│   │   │   ├── projects.js   ✏️ projects, hero slides, film strip, client logos
│   │   │   └── strings.js    ✏️ all UI copy in EN + AR
│   │   ├── i18n.js           language state, RTL switch, text binding
│   │   ├── scroll.js         single rAF scroll engine shared by all modules
│   │   ├── utils.js          DOM helpers, image markup, scroll lock
│   │   └── modules/          one file per section / behaviour
│   │       ├── loader.js  hero.js  nav.js  cursor.js  manifesto.js
│   │       ├── band.js  work.js  case.js  video.js  strip.js
│   │       └── approach.js  clients.js  reveal.js
│   └── assets/
│       ├── img/              photos as <name>-760.webp + <name>-1600.webp
│       ├── brand/            calligraphy logo mask, “60 years” mark, favicon
│       └── clients/          client logos (transparent PNG)
├── scripts/
│   ├── build.mjs             src → dist: flattens + minifies CSS, minifies JS
│   └── serve.mjs             tiny local static server
├── docs/CONTENT.md           how to add projects, images and translations
└── .github/workflows/deploy.yml   builds and publishes to GitHub Pages on push to main
```

## Editing content

Everything a non-developer needs is in three files — see **[docs/CONTENT.md](docs/CONTENT.md)**:

| What | File |
|---|---|
| Contact email, default language | `src/js/config.js` |
| Projects, hero slides, film strip, client logos | `src/js/data/projects.js` |
| Any UI text (EN + AR) | `src/js/data/strings.js` |

## Performance notes

- No frameworks or libraries; ~80 KB of HTML/CSS/JS before gzip.
- All images are WebP in two sizes with `srcset`, lazy-loaded below the fold.
- Only the first hero image loads before the preloader finishes; other slides hydrate afterwards.
- Vimeo players are injected only when a visitor presses play.
- One shared `requestAnimationFrame` drives every scroll effect; animations use only `transform`, `opacity` and `clip-path`.
- Marquees and the cursor stop animating when off-screen / idle.
- `prefers-reduced-motion` disables parallax, marquees and slideshow motion.

## Deployment

**Live:** https://advmog16.github.io/shmaq-website/

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds `dist/` and publishes it to GitHub Pages
(**Settings → Pages → Source: GitHub Actions**).

The public address lives in one place: `"homepage"` in `package.json`. The build writes it into the
canonical link, social-preview tags (`assets/brand/og.jpg`), `sitemap.xml`, `robots.txt` and `404.html`.

### Moving to a custom domain

1. Set `"homepage"` in `package.json` to the domain, e.g. `"https://shmaq.studio"`.
2. Add `src/CNAME` containing just the domain, e.g. `shmaq.studio`.
3. Point the domain's DNS at GitHub Pages and enter it in **Settings → Pages → Custom domain**.

## Credits

Content and imagery © SHMAQ STUDIO, taken from the official studio profile.
