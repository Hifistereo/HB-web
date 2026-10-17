---
name: henrix-seo
description: Audit and optimise henrix.lv for classic search (Google, Bing) — titles, meta, headings, JSON-LD, sitemap, images, Core Web Vitals, local/Latvian keywords. Use for any SEO audit, keyword or on-page change to this site.
---

# henrix.lv SEO

Single-page static site (`index.html`, Latvian, `lang="lv"`), GitHub Pages, no build step. Sections are anchors: `#par-mums`, `#sastavi`, `#programma`, `#repertuars`, `#pieteikt`.

## Always
1. Run `python3 tools/seo_check.py` before and after changes. Errors block CI; warnings are the to-do list.
2. Keep facts identical in four places: visible copy, `<meta>`/OG tags, JSON-LD in `<head>`, `llms.txt`. Changing a line-up, phone, set length or song count means editing all four.
3. Bump `<lastmod>` in `sitemap.xml` to today when `index.html` or `llms.txt` content changes.
4. Write copy in natural Latvian with correct diacritics (ā, č, ē, ģ, ī, ķ, ļ, ņ, š, ū, ž). Never transliterate.

## Target queries (Latvian intent)
Primary: `dzīvā mūzika kāzām`, `grupa kāzām`, `muzikanti kāzām`, `dzīvā mūzika ballei`, `grupa uzņēmuma ballei`, `mūziķi Ziemassvētku ballei`, `coverband Latvija`, `dzīvā mūzika jubilejai`.
Modifiers: `Rīga`, `Latvija`, `cena`, `cik maksā`. Brand: `Henrix Band`, `Henrix`.
Map each query to the section that answers it; prefer extending an existing section over new thin pages.

## On-page rules
- One `<h1>`; `<h2>` per section with an `id`, sections use `aria-labelledby`.
- Title 30–65 chars, description 70–170 chars, both lead with the main query.
- Images: WebP, explicit `width`/`height`, descriptive Latvian `alt` (empty `alt=""` only for decoration), `loading="lazy"` below the fold, hero keeps `fetchpriority="high"` + preload.
- CSP lives in a `<meta>` tag: any new third-party origin must be added there or it silently breaks.

## Structured data (JSON-LD `@graph`)
Present: `WebSite`, `WebPage`, `MusicGroup` with `makesOffer` per line-up. Candidates: `FAQPage` (mirror a visible FAQ — never mark up hidden content), `VideoObject` for the YouTube promo, `sameAs` links to Facebook/Instagram/YouTube profiles, `aggregateRating`/`review` only with real, visible reviews.
Validate at https://validator.schema.org and https://search.google.com/test/rich-results.

## Off-page / local
- Google Business Profile (service-area business, category "Band" / "Wedding band"), same NAP as the site.
- Listings: kāzu portāli (e.g. kazas.lv-type directories), pasākumu katalogi, Facebook/Instagram bio link to https://henrix.lv/.
- Search Console + Bing Webmaster Tools: verify via DNS TXT (no file/meta needed), submit `sitemap.xml`.

## Output
Report findings as a prioritised list (quick wins first) with exact file:line edits; apply only what the user approves.
