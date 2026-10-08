# henrix.lv

Static site for Henrix Band, served by GitHub Pages at https://henrix.lv (custom domain via `CNAME`).

- `index.html`, `assets/` — the site (no build step, no third-party requests until the visitor plays the video).
- `_source/` — original Claude Design export, kept for reference. Jekyll skips `_` folders, so it is not published.

## To finish
- **Enquiry form**: set `action` on `<form id="enquiry">` in `index.html` to a Formspree / Web3Forms endpoint and add that origin to `connect-src` in the CSP meta tag.
- **Analytics**: add the script and its origin to the CSP `script-src` / `connect-src`.
- Update `lastmod` in `sitemap.xml` when content changes.
