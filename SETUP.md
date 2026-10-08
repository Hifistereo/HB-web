# henrix.lv — setup checklist (manual steps)

These steps need account or DNS access. Nothing here is live until it is done.
**Rule for DNS and email records:** always read the current records first (`dig`, or the registrar's panel) and **add** records. Never replace or delete existing ones until you know what uses them.

## 1. Enquiry form — Web3Forms
1. Go to https://web3forms.com, enter `henrixband@gmail.com` and confirm. You'll receive an access key by email.
2. In `index.html`, set `<input type="hidden" name="access_key" value="…">` to that key. The key is public by design.
3. Push to `main`. While the value is empty, the form opens the visitor's mail app instead.
4. Test once on the live site: send an enquiry and check that the email arrives.

## 2. Search Console
1. https://search.google.com/search-console → **Add property → Domain** → `henrix.lv`.
2. Check the existing TXT records first: `dig +short TXT henrix.lv`. **Add** the `google-site-verification=…` TXT record and keep any existing SPF or other TXT records.
3. Once verified: **Sitemaps** → submit `https://henrix.lv/sitemap.xml`. Then **URL Inspection** → `https://henrix.lv/` → *Request indexing*.
4. Watch **Page indexing** and **Core Web Vitals** over the following weeks.

## 3. Google Business Profile — check eligibility first
Google allows a profile only for businesses that serve customers in person. A band travelling to clients' venues fits a **service-area business with the address hidden**, if all of these hold:
- [ ] There is a real person or legal entity behind "Henrix Band" who can pass video verification (showing equipment, branded material and a link between the person and the band).
- [ ] The name is exactly "Henrix Band", with no keywords added. Phone `+371 25972689` and website `https://henrix.lv/` match the site.
- [ ] No virtual office or P.O. box as the address. The address stays hidden, and service areas are set instead (e.g. Latvia or specific regions).
- [ ] The band actually performs at customers' locations (it does, per the site).

If yes:
1. https://business.google.com → create a profile. Primary category: **Band**. Secondary category if relevant: **Wedding service** / **Entertainer**.
2. Add the service areas, hours as "by appointment", services (Henrix Essential / Live+ / Full Experience, price on request), a description from the site copy, real photos and the video.
3. After verification, copy the profile URL (`https://maps.app.goo.gl/…` or the `g.page` link) and add it to the `MusicGroup` JSON-LD as `"sameAs": ["<profile URL>"]` (and `"hasMap": "<maps URL>"`). Add the YouTube channel, Facebook and Instagram profile URLs to `sameAs` once they exist.
4. Ask satisfied clients for reviews. Never post reviews yourself.

## 4. Analytics — Cloudflare Web Analytics (cookieless, no consent banner needed)
1. Cloudflare dashboard → **Analytics & Logs → Web Analytics → Add a site** → `henrix.lv` → choose the JS snippet (no proxy needed).
2. Add before `</body>` in `index.html` and `privatums.html` (the CSP already allows it):
   `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "<your token>"}'></script>`
3. Add a sentence to the privacy page's "Sīkdatnes" section: *"Apmeklējumu statistikai izmantojam Cloudflare Web Analytics, kas neizmanto sīkdatnes un neidentificē apmeklētājus."*

## 5. Background video loop (when the clip is ready)
1. Make an 8–12 s clip without audio:
   ```
   ffmpeg -i source.mp4 -t 10 -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 assets/video/henrix-loop.webm
   ffmpeg -i source.mp4 -t 10 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart assets/video/henrix-loop.mp4
   ```
   Aim for under ~1.5 MB each.
2. In `index.html`, change `<div class="vid" id="vid">` to `<div class="vid" id="vid" data-loop="assets/video/henrix-loop">`.
3. The loop plays muted while the card is on screen and pauses off-screen. It is skipped under reduced motion or Save-Data. YouTube still loads only on click.

## 6. Video structured data (optional)
Once you know the YouTube upload date, add a `VideoObject` node (`name`, `description`, `thumbnailUrl`, `uploadDate`, `embedUrl` `https://www.youtube-nocookie.com/embed/CZxHxjbiefg`, `contentUrl` `https://www.youtube.com/watch?v=CZxHxjbiefg`) and point `MusicGroup.subjectOf` to it.

## 7. Hosting, HTTPS and DNS (verify, then change)
- GitHub → Settings → Pages: Source **GitHub Actions**, custom domain `henrix.lv`, **Enforce HTTPS** ticked.
- Read the current setup: `dig +short A henrix.lv`, `dig +short CNAME www.henrix.lv`, `dig +short CAA henrix.lv`, `dig +short TXT henrix.lv`, `dig +short TXT _dmarc.henrix.lv`.
- Expected for Pages: apex A records `185.199.108–111.153` and `www` as a CNAME to `hifistereo.github.io`. Pages then redirects www to the apex.
- Optional hardening, only after the above is confirmed: CAA `0 issue "letsencrypt.org"` (only if no other CA is used), DNSSEC at the registrar.
- Email: if the domain sends no mail, publish `v=spf1 -all` and `_dmarc` `v=DMARC1; p=reject`. If any service sends mail as `@henrix.lv`, configure SPF, DKIM and DMARC for that service instead. **Do not publish these without confirming who sends mail for the domain.**
- Optional: a Cloudflare proxy in front of Pages adds the security headers GitHub can't send (`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Permissions-Policy`, `Referrer-Policy`).

## 8. Validate on the live site
- https://search.google.com/test/rich-results?url=https://henrix.lv/
- https://validator.schema.org/#url=https://henrix.lv/
- https://pagespeed.web.dev/analysis?url=https://henrix.lv/ (field data appears after enough traffic)
- https://securityheaders.com/?q=henrix.lv
