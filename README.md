# henrix.lv

Static site for Henrix Band, served by GitHub Pages (Settings → Pages → Source: **GitHub Actions**; `.github/workflows/pages.yml` deploys every push to `main`) at https://henrix.lv (custom domain via `CNAME`).

- `index.html`, `assets/` — the site (no build step; interactions and motion port the original component logic 1:1).
- `_source/` — original Claude Design export, kept for reference. Jekyll skips `_` folders, so it is not published.

## Tests
`npm ci && npx playwright install chromium && npm test`: HTML validation, plus Playwright on mobile and desktop (privacy and consent, form lifecycle, interactions, accessibility, SEO and structured data, Core Web Vitals budget). CI runs the same suite, and deployment to Pages only happens from `main` after it passes.

## To finish
See `SETUP.md` (Web3Forms key, Search Console, Google Business Profile, Cloudflare Web Analytics, video loop, DNS). Audit findings are in `AUDIT.md`.
- Update `lastmod` in `sitemap.xml` when content changes.
