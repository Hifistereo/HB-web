# henrix.lv

Static site for Henrix Band, served by GitHub Pages (Settings → Pages → Source: **GitHub Actions**; `.github/workflows/pages.yml` deploys every push to `main`) at https://henrix.lv (custom domain via `CNAME`).

- `index.html`, `assets/` — the site (no build step; interactions and motion port the original component logic 1:1).
- `_source/` — original Claude Design export, kept for reference. Jekyll skips `_` folders, so it is not published.

## Enquiry form
Submissions go through [FormSubmit](https://formsubmit.co) to henrixband@gmail.com (`action` on `<form id="enquiry">`; JS posts to the `/ajax/` endpoint, without JS the browser posts normally). The first submission triggers a one-time activation email — click "Activate Form" in it. `https://formsubmit.co` is allowed in the CSP `connect-src` / `form-action`.

## To finish
- **Analytics**: add the script and its origin to the CSP `script-src` / `connect-src`.
- Update `lastmod` in `sitemap.xml` when content changes.
