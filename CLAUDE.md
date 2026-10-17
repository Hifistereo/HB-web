# henrix.lv

Static one-page site for Henrix Band (Latvian live cover band). See README.md for hosting and the enquiry form.

- Content language is Latvian; keep diacritics correct. `llms.txt` is English.
- Facts must match across visible copy, meta/OG tags, JSON-LD, and `llms.txt`.
- CSP is a `<meta>` tag in `index.html`/`404.html`; new third-party origins must be added there.
- Run `python3 tools/seo_check.py` after editing `index.html`, `robots.txt`, `sitemap.xml` or `llms.txt` (CI runs it too).
- Project skills: `henrix-seo` (search), `henrix-geo` (AI search / llms.txt), `henrix-analytics` (tracking).
