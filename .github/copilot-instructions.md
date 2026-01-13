This repository is a small static site (Ar Academi) focused on a single-page UI using handcrafted HTML/CSS/JS and deployed via GitHub Pages (see `CNAME`). The goal of this file is to give an AI coding agent the precise, local knowledge needed to be productive quickly.

- **Big picture:** The site is static HTML — a single entry point at `index.html` that pulls styling from `css/styles.css` and interactivity from `js/*.js`. Media and assets live under `assets/`. The repo includes `404.html` and `CNAME` (production domain), which implies GitHub Pages-style deployment.

- **Primary files to inspect:**
  - **Project root:** [README.md](../README.md) — high-level project notes and intended UX.
  - **Entry:** [index.html](../index.html) — main page structure and where scripts/styles are linked.
  - **CSS:** [css/styles.css](../css/styles.css) — single consolidated stylesheet; most visual patterns live here (variables, glassmorphism, responsive rules).
  - **JS:** [js/candles.js](../js/candles.js), [js/sounds.js](../js/sounds.js) — interactive/background behavior and audio cues.
  - **Assets:** [assets/](../assets/) — icons, images and sounds used by the UI.

- **Architecture & rationale (what you need to know):**
  - This is intentionally a static, single-page site. Changes are typically DOM/CSS-first.
  - Visual system is driven by CSS variables in `:root` and a `data-theme="light"` override — prefer editing variables for broad theming changes.
  - The UI heavily uses glassmorphism (backdrop-filter / -webkit-backdrop-filter). Mirror edits across duplicated blocks carefully — `css/styles.css` contains multiple consolidated sections and repeated rules; pick the canonical consolidated block near the top when possible.
  - Accessibility hooks are present: `@media (prefers-reduced-motion: reduce)` and `prefers-reduced-transparency` are used — preserve these blocks when changing animations/blur.

- **Project-specific conventions & pitfalls:**
  - `css/styles.css` is the single source of truth for styles; avoid adding new style files unless necessary.
  - There are duplicate/merged sections in the stylesheet (intentional consolidation). When updating look for the most complete, documented block (the human-friendly, commented portion) and change there.
  - Some media-query syntax used in the file is non-standard (author used `@media (width <= 760px)` in places). Prefer maintaining existing style but validate edits with a linter or live browser, and convert to standard `@media (max-width: 760px)` if you also update other usages.
  - The animated background attaches to `#candles` (see `css/styles.css` and `js/candles.js`). Search for that id when modifying background scripts or layout.

- **Build / lint / local preview:**
  - There is no build step — the site is static. For local previews use any static server, for example:

    - `npx http-server . -c-1`  (quick static server)
    - `npx serve .` (alternative)

  - CSS linting is configured via devDependencies. To lint CSS:

    - Install deps: `npm install` (already includes `stylelint`).
    - Lint command: `npx stylelint "css/*.css"` or target the file directly: `npx stylelint css/styles.css`.

- **Testing & debugging notes:**
  - There are no automated tests in the repo. QA is manual: open `index.html` in a browser (or run the static server) and check interactive scripts and audio.
  - Use the browser devtools to inspect CSS cascade; because styles are duplicated in places, the cascade order matters.

- **Strict guidance for the AI agent:**
  - When changing visual tokens (colors, blur, spacing), modify the `:root` variable block in `css/styles.css` first.
  - When adding or editing glass/blur rules, preserve `-webkit-backdrop-filter` and the `prefers-reduced-transparency` blocks for accessibility.
  - For responsive fixes, update the canonical media-query block near the top of `css/styles.css` and search the file for other media-query variants to keep behavior consistent.
  - Do not remove `CNAME`, `404.html` or `robots.txt` — they indicate deployment expectations and SEO choices.

- **Where to look for examples:**
  - Glass rules and card styles: see the unified `.offer-card` and `.offers-row` sections in [css/styles.css](../css/styles.css).
  - Background/animation entry: `#candles` reference in [css/styles.css](../css/styles.css) and [js/candles.js](../js/candles.js).

If anything above is unclear or you'd like more detail about a particular workflow (local preview, deploying to GitHub Pages, or a style-editing checklist), tell me which area to expand. I can iterate quickly.
