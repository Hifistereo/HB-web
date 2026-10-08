# Henrix Band — Design System

Henrix Band is a Latvian live cover band (3–5 musicians) selling live music for corporate events: company balls, year-end parties, jubilees, client evenings. The brand's one known surface is a **printed/PDF offer booklet** ("Piedāvājums — Korporatīvie pasākumi") that presents the band, three priced line-ups, the programme, repertoire, what's included, and a call to send event details.

## Sources
- `uploads/Henrix Band buklets.pdf` — 7-page US-Letter offer booklet (title "Music band offer proposal", author Elmārs Builis, printed via Microsoft Print to PDF from what appears to be an HTML page). All text is outlined/rasterised; no live text, fonts or vector logo inside.
- Page renders extracted to `source/page-1.jpg … page-7.jpg` (reference only).
- No codebase, Figma, website, or vector logo was provided.

## Products / surfaces
- **Offer booklet** (the only one) → `ui_kits/offer-booklet/`.

## Index
- `styles.css` — entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `fonts/` — Barlow + Barlow Condensed woff2 (latin + latin-ext)
- `assets/photos/` — `singer-live.png`, `band-stage.jpg`
- `assets/brand/` — `henrix-band-banner.jpg` (raster logo lock-up), `x-glyph-gradient.png`, `qr-promo-video.jpg`
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (below)
- `ui_kits/offer-booklet/` — 7-page click-through booklet
- `source/` — page renders of the PDF
- `SKILL.md` — Agent Skill entry point

## Components
Built strictly from elements seen in the booklet.
- `components/brand/` — **Wordmark**, **Eyebrow**, **SectionTitle** (+ **Accent**), **AccentRule**
- `components/offer/` — **TierCard**, **TierStrip**, **TierChoice**, **InfoTile**, **StatFigure**, **Price**
- `components/lists/` — **Chip**, **NumberedItem**, **SongColumn**
- `components/media/` — **PromoVideo**, **PhotoSection**

### Intentional additions
- `TierChoice` `selected` state and `Chip` `active` state — the booklet is static; these are for interactive reuse only.

---

## CONTENT FUNDAMENTALS
- **Language:** Latvian, full diacritics (ā, ē, ī, ū, ķ, ļ, ņ, ģ, š, ž). Tier names stay English: *Essential*, *Live+*, *Full Experience*. Always include latin-ext glyphs.
- **Voice:** first-person plural "mēs" (we) to formal plural "jūs" (you): "Izveidosim formātu tieši **jūsu** pasākumam", "parūpējamies **mēs**". Confident, warm, practical; no hype words, no exclamation marks.
- **Rhythm:** a headline statement, then 2–4 short plain paragraphs, then a **bold one-line verdict**: "Optimāla izvēle starp kompaktu sastāvu un pilnas grupas jaudu."
- **Signature move — the reversal with an em dash:** "Mēs necenšamies pasākumu pielāgot grupai — grupas programmu pielāgojam pasākumam." / "Labs uzņēmuma pasākums nav tikai programma — tā ir atmosfēra, cilvēki un vakars…"
- **Lead-ins:** bold label + colon: "**Piemērots:** …", "**5 mūziķi:** …".
- **Casing:** headings and eyebrows UPPERCASE (set via CSS); body sentence case; chip and list items all lowercase ("vakariņām", "grupas transports").
- **Numbers:** Latvian formatting — space thousands, euro after: "1 550 €", "+ PVN". Multiplication sign: "3 × 50 min". Meta separators: "·" in compact meta ("4 mūziķi · 1 550 €"), "•" in eyebrows ("Optimālais sastāvs • 4 mūziķi").
- **Tagline:** "Dzīvā mūzika. Īsta ballīte." Subtitle: "Dzīvā mūzika korporatīvajiem pasākumiem".
- **Emoji:** never.

## VISUAL FOUNDATIONS
- **Mood:** a dark ballroom at night. Every page is near-black navy `#0A0A14`; colour arrives only as stage light — cyan, violet, magenta.
- **Colour:** three accents map 1:1 to tiers — cyan `#3DC6D9` = Essential, violet `#6A4FF6` = Live+, magenta `#D941C8` = Full Experience. Cyan doubles as the general accent (eyebrows, numbers, highlighted words, links). Cards `#131429`, hairlines `#2F2E40`, body text `#B9B8C8`, headings `#F2F1F8`.
- **Gradients:** used sparingly and only as light — the wordmark X (sky `#46A6EC` → indigo `#6260F8`, vertical), a 70px magenta→cyan flourish under the cover title, and a 4-step cyan→violet→purple→magenta progression across the contact tiles. Never as backgrounds.
- **Type:** Barlow Condensed 600 uppercase for all headings, numbers and prices; Barlow 300 for body (line-height ~1.75), 700 white for emphasis. Eyebrows: Barlow 700, 10px, tracking .22em.
- **Imagery:** real live-performance photos — deep navy/black, blue LED columns, green spill, warm skin and sunburst guitars; shallow depth of field. Never b&w, no grain added. Photos run full-bleed and dissolve into the page through a **scrim** (bottom fade for cover/tiers; left-to-right darkening for text-over-photo on the repertoire block). No protection capsules.
- **Layout:** 816×1056 page, 56px side margins, ~64px top. Prose in 2 columns (40px gap); tiers, song lists and contact tiles 3- or 4-up. Generous vertical air; lots of empty dark space at page bottoms is normal.
- **Cards:** flat `#131429` fill, **0 radius**, no border, no shadow, a **3px tier-coloured top bar**. Comparison rows are the same fill with no bar.
- **Rules:** 1px `#2F2E40` hairlines separate list rows and frame statements; 2px tier rules under song-column headers.
- **Chips:** square, 1px `#3A3950` outline, transparent fill, 12px text.
- **Corners:** square everywhere. The one circle is the magenta play disc on the video thumbnail.
- **Shadows / blur / transparency:** none in print, except the soft magenta glow on the play button. Transparency only in photo scrims.
- **Motion (interactive reuse):** quiet — 120–220ms background/border fades, ease `cubic-bezier(.22,.61,.36,1)`. No bounces. Hover = card lifts to `#1C1D36`; selected = 3px inset tier line. No press shrink.

## ICONOGRAPHY
- The booklet uses **no icon set**. Structure comes from typography: 2-digit cyan numerals (01–08), tier-coloured bars, bullets "•" and "·", "×" and "—".
- The only pictogram is a white **play triangle** on a magenta disc (built in CSS in `PromoVideo`).
- A QR code links to the promo video (`assets/brand/qr-promo-video.jpg`, → youtube.com/watch?v=CZxHxjbiefg).
- No emoji, no icon font. If a future surface truly needs icons, Lucide (1.5px stroke) at text colour is the closest neutral fit — **this is a suggestion, not part of the source**.

## Logo
No vector logo was supplied. Two marks exist in the booklet:
1. **Typeset wordmark** — "HENRIX BAND" in Barlow Condensed 600 with the X gradient-filled (`Wordmark` component). Use this by default.
2. **Raster banner lock-up** — `assets/brand/henrix-band-banner.jpg`: wide-spaced stencil-style "HENRI X BAND" with a large outlined X over a pink/cyan crowd photo and band members. Only available as a low-res (851×315) photo; do not redraw.

## Fonts
Barlow and Barlow Condensed are **matched by eye** from the outlined PDF text and loaded from Google Fonts files in `fonts/`. Confirm with the original designer.
