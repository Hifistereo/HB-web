# henrix.lv — website audit (2026-10-08)

Scope: SEO, structured data, AI crawlability, security, privacy, accessibility, performance, testing and CI.
**Method:** source-level review of this repository plus automated browser tests run against a local server.
**Live site not verified:** `henrix.lv` did not resolve from the audit environment, so DNS, HTTPS, response headers and Google tooling are listed under *Manual* (see `SETUP.md`).

Status: **Fixed** = changed in this branch and covered by tests · **Manual** = needs account or DNS access · **Roadmap** = recommended, not built.

## Privacy / GDPR
| # | Severity | Finding | Status |
|---|---|---|---|
| P1 | High | The YouTube iframe auto-loaded (muted) when the video card scrolled into view, so it contacted Google without consent. | **Fixed.** YouTube loads only on click, with a visible notice. An optional self-hosted muted loop (`data-loop`) keeps the autoplay look with no third party. Tests: `privacy.spec.js`, `video.spec.js`. |
| P2 | High | No privacy notice, although the form collects name, email and phone. | **Fixed.** Added `privatums.html`, linked from the form and footer. *Manual:* the owner must review the text (legal entity name / registration no. if any, retention). |
| P3 | Medium | The form had no backend (mailto only). | **Fixed (code).** Web3Forms integration with honeypot, error and success states. *Manual:* add the access key. Tests: `form.spec.js`. |
| P4 | Info | No cookies or web storage are used; fonts are self-hosted (no Google Fonts). | OK. Covered by a test. |

## SEO, structured data, AI crawlability
| # | Severity | Finding | Status |
|---|---|---|---|
| S1 | Medium | No FAQ content (the questions buyers, AI answers and "People also ask" draw from). | **Fixed.** 7-question FAQ section (crawlable `<details>`, facts from the existing copy only), `FAQPage` JSON-LD identical to the visible text, mirrored in `llms.txt`. |
| S2 | Medium | Meta description was 205 characters (cut off in results at around 155–160). | **Fixed.** Now 159 characters. |
| S3 | Low | JSON-LD `logo` pointed to a 180 px icon. | **Fixed.** Now the 512 px icon. |
| S4 | Low | No `sameAs`, `VideoObject` or `hasMap`. | **Intentionally omitted** until real values exist (profile URLs, the video upload date). Placeholders would be invalid data. See `SETUP.md`. |
| S5 | Info | Title, canonical, OG/Twitter tags, `lang`, single H1, image alts, sitemap with images, robots.txt (all crawlers incl. AI allowed) and llms.txt are all present and correct. | OK. Covered by `seo.spec.js`. |
| S6 | Medium | A single URL serves every search intent (weddings, corporate, private). | **Roadmap:** dedicated landing pages `/kazas`, `/korporativie-pasakumi`, `/privatas-svinibas`, each with its own title, description, FAQ, canonical and internal links. |
| S7 | Medium | No reviews or testimonials (trust and local SEO). | **Roadmap:** add genuine client testimonials and GBP reviews. Never fabricate them. |

## Security
| # | Severity | Finding | Status |
|---|---|---|---|
| X1 | Info | A strict CSP via `<meta>` is in place (self-only scripts, no inline JS). | OK. Extended only for Web3Forms and the Cloudflare beacon. Tested for zero CSP violations. |
| X2 | Medium | GitHub Pages cannot send headers, so `frame-ancestors` / `X-Frame-Options`, HSTS preload, `Permissions-Policy` and `X-Content-Type-Options` aren't possible. | **Manual / optional:** Cloudflare proxy with a header rule (`SETUP.md`). |
| X3 | Low | Workflow actions were pinned by tag. | **Fixed.** Pinned to commit SHAs. |
| X4 | Low | The Gmail address is published, so it is exposed to spam harvesting. | Accepted (it is the business contact). Consider a domain address later. |
| X5 | — | Dev dependencies: 0 known vulnerabilities (`npm audit`). Lighthouse CI was rejected because it added 17–27 vulnerable transitive packages. | OK |

## Accessibility
| # | Severity | Finding | Status |
|---|---|---|---|
| A1 | Info | axe (WCAG 2.2 AA): no serious or critical issues on the home, privacy and 404 pages (mobile and desktop), apart from A2. Skip link, focus and reduced motion all behave correctly. | OK. Covered by `a11y.spec.js`. |
| A2 | Medium | The programme timeline numbers "02"/"03" use the brand violet `#6A4FF6` and purple `#9B4FE0` on `#131429`, which is below 4.5:1. | **Open (design decision).** Left unchanged to preserve the design; excluded from the axe test with a comment. Fix: use `--violet-400` / a lighter purple for `.s2 .n` and `.s3 .n`. |

## Performance (lab, Playwright)
| # | Finding | Status |
|---|---|---|
| F1 | Mobile (4× CPU, ~1.6 Mbps, 150 ms RTT): LCP ≈ 2.0 s, CLS 0.000, TBT ≈ 0.25 s, 453 KB. Desktop: LCP ≈ 0.25 s. | OK. Within budgets (LCP ≤ 2.5 s, CLS ≤ 0.1, ≤ 600 KB). Gated in CI. Confirm on the live URL with PageSpeed Insights. |

## Testing / CI
| # | Severity | Finding | Status |
|---|---|---|---|
| T1 | High | No tests; every push to `main` deployed untested. | **Fixed.** One workflow: `test` job (HTML validation, Playwright on mobile + desktop, isolated CWV budget), then `deploy` with `needs: test`, main only. Pull requests run tests and never deploy. |
