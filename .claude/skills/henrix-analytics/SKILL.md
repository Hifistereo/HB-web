---
name: henrix-analytics
description: Set up and work with web analytics for henrix.lv — choosing a tool, adding the tag under the site's strict CSP, tracking enquiry conversions, Search Console. Use when adding, changing or reading analytics for this site.
---

# henrix.lv analytics

## Constraints
- CSP is a `<meta http-equiv>` in `index.html` (and `404.html`). Every analytics origin must be added to `script-src` and `connect-src` (and `img-src` if it uses a pixel). Inline scripts are blocked (`script-src 'self'`) — load the tag from a file or the vendor URL, put config in `assets/main.js`.
- EU/Latvia (GDPR + ePrivacy): cookie-based tools (GA4, Meta Pixel) need a consent banner before loading. Cookieless tools do not.

## Recommended setup
1. **Cookieless analytics, no banner** — pick one and ask the user to create the account:
   - Plausible (`https://plausible.io`, paid, EU-hosted) or GoatCounter (free for non-commercial, `https://gc.zgo.at` + `https://<code>.goatcounter.com`) or Cloudflare Web Analytics (free, `https://static.cloudflareinsights.com` + `https://cloudflareinsights.com`).
   - Add `<script defer src="…">` before `</head>`, extend CSP, done.
2. **Google Search Console + Bing Webmaster Tools** — verify the domain by DNS TXT record, submit `https://henrix.lv/sitemap.xml`. Gives queries, impressions, CTR; no code change.
3. GA4 only if the user wants Google Ads remarketing; then also build a consent banner (Consent Mode v2) — larger job, confirm first.

## Conversions to track (events, from `assets/main.js`)
| Event | Trigger |
|---|---|
| `enquiry_submit` | FormSubmit AJAX success on `#enquiry` (the key conversion) |
| `cta_click` | any `a[href="#pieteikt"]`, prop `location` = header/hero/section |
| `contact_click` | `a[href^="tel:"]`, `a[href^="mailto:"]` |
| `video_play` | YouTube facade/iframe activated |
| `lineup_view` | `#sastavi` card in view / selected |
Fire events only after the analytics script loaded; never send form field contents (PII).

## Reporting
Monthly: visitors by source, enquiry conversion rate, top Search Console queries/pages, AI referrers (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai) as an AI-visibility signal.

After any change run `python3 tools/seo_check.py` (it fails if an external script origin is missing from the CSP).
