# CLAUDE.md

Joshua Job's personal site — one page, hand-written. The public description and image credits are
in [README.md](README.md). `safe-links.md` (gitignored, local only) lists the URLs that are safe to
link.

Run it with `python3 -m http.server 8000`, open <http://localhost:8000>, and hard-reload with
Ctrl+Shift+R — this site caches aggressively and a soft reload will lie to you.

## No build step. That is the point.

No framework, no bundler, no `package.json`, no npm. Editing a file and reloading the browser is
the whole development loop. **Do not "modernise" this** — a portfolio that needs a build step is a
portfolio you stop updating. Same rule for dependencies: none, and the fonts come straight from
Google Fonts in the `<head>`.

## Deploying

GitHub Pages serves `main` at <https://joshuajob-cs.github.io>. **A push is a deploy** — there is
no staging and no review step, so a mistake is live the moment it lands. `.nojekyll` (empty, at the
root) stops Pages running Jekyll over the files, which would otherwise ignore any path starting
with `_` and rewrite things nobody asked it to rewrite. Don't delete it.

## How the page is put together

`index.html` holds everything, including the geometric background SVG and the small scripts at the
bottom (brand tooltips, the flip-stack of role cards, tap-to-reveal on project images, the
Elephantelate accordion). Three stylesheets, loaded in that order:

- **`styles.css`** — the palette (`--clr-*` custom properties at the top; **always use the
  variables, never a raw hex**), plus buttons, typography, about, sections, cards, contact, footer.
- **`hero.css`** — the header only.
- **`carousel.css`** — the projects carousel only.

Two scripts: `about-colors.js` rotates the three about-callout colours; `carousel.js` drives the
projects rail (arrows, dots, keyboard, mobile swipe).

**Adding a project card touches three places.** Add the `<article class="card project-card">` to
`#projectsRing`, add one more `<span class="dot"></span>` to `#projectsDots` — the dots are static
markup, `carousel.js` only reads them — and drop the image in `assets/`. Assets are PascalCase and
project screenshots are roughly 1300×620, cropped by CSS to 16:9. Card order in the markup is the
order in the rail, and the first card is what a visitor sees first.

**Two things in `assets/` aren't ordinary screenshots.** `assets/unpublished/` is gitignored — it
holds full-resolution originals and spare art kept for other projects, and nothing on the page may
reference it. `OGCard.png` is the 1200×630 link-preview image named by the `og:image` tag in the
`<head>`; it was *generated* by screenshotting a throwaway HTML card, not drawn by hand, so
regenerate it the same way rather than editing the PNG. Keep new photos web-sized — the Chess
screenshot was once a 15 MB PNG and dominated the whole page.

## The positioning, so you don't "fix" it

The tagline rotates **The Builder / Witty Programmer / Calculating Comedian**, and a stand-up
comedy set sits in the same rail as the software **on purpose**. Plenty of people ship production
code; doing that *and* being funny on a stage is the entire strategy. Never quietly clean the
comedy out of this site — the voice is confident and a little funny, and copy edits should stay in
that register.

## Ask before you write

- **Roles, dates, and how any of them are described.** Joshua writes his own bio. Don't infer an
  employment history from a résumé, a repo, or anywhere else — ask, and use his wording.
- **Anything about a client**: names, prices, or private details of their business. Elephantelate's
  client work can be described; the client cannot be identified.
- Note that GitHub Pages hosting bars running a storefront here — this page pitches Elephantelate,
  it does not sell. No checkout, no pricing.
