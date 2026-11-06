# henrix.lv

Static one-page site for Henrix Band (Latvian live cover band). See README.md for hosting and the enquiry form.

- Content language is Latvian (`index.html`); keep diacritics correct. `en/index.html` is the English mirror — edit both together (same ids, hooks, form names/values). Same for `alternative/index.html` ↔ `en/alternative/index.html`. `llms.txt` is English.
- Facts must match across visible copy, meta/OG tags, JSON-LD, and `llms.txt`.
- CSP is a `<meta>` tag in `index.html`/`404.html`; new third-party origins must be added there.
- Run `python3 tools/seo_check.py` after editing `index.html`, `robots.txt`, `sitemap.xml` or `llms.txt` (CI runs it too).
- Project skills: `henrix-seo` (search), `henrix-geo` (AI search / llms.txt), `henrix-analytics` (tracking).
- Henrix Alternative positioning: core is 90s/00s alternative rock, but not limited to it — anything energetic and rocky (newer and older), programme adapted from a wide repertoire to each party's mood. Example artists: Blur, Muse, Green Day, Placebo, Bon Jovi, Foo Fighters, Måneskin, The White Stripes, The Offspring, Nickelback (keep strip, setlist and `llms.txt` in sync).
