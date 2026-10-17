---
name: henrix-geo
description: Optimise henrix.lv for AI search and answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini, Claude) — llms.txt, AI crawler access, quotable facts, FAQ content, entity consistency, brand-mention checks. Use for GEO/AEO/AI-visibility work on this site.
---

# henrix.lv AI-search (GEO / AEO)

## Assets
- `llms.txt` — English fact sheet for LLMs. Keep it in sync with the page (`tools/seo_check.py` checks the phone number). Facts only, no marketing adjectives.
- `robots.txt` — allows all crawlers, including GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended, Applebot-Extended. Do not add blocks unless the user asks.
- JSON-LD `MusicGroup` entity is the canonical "who/what/where" record.

## What makes the page quotable
1. Self-contained factual sentences: who (Henrix Band), what (live cover band), where (all of Latvia), formats (3/4/5 musicians, named line-ups), duration (3 × 50 min), languages, what is included, how to book.
2. A visible FAQ (`BUJ`) answering real questions in one or two sentences each, mirrored by `FAQPage` JSON-LD. Candidate questions: Cik maksā grupa kāzām? / Cik ilga ir programma? / Vai brauciet ārpus Rīgas? / Vai ir sava apskaņošana? / Vai var pasūtīt konkrētas dziesmas? / Cik laicīgi jārezervē? / Vai spēlējat angliski runājošiem viesiem?
3. Price signal: AI answers favour sources with a number. If the band agrees, add "no X €" per line-up; otherwise state what the price depends on.
4. Same name, phone, email, and description on every external profile (Facebook, Instagram, YouTube, directories) so engines merge them into one entity. Add those URLs as `sameAs` in JSON-LD.

## Visibility check (manual, monthly)
Ask each engine in Latvian and English, log whether Henrix Band is mentioned and which sources are cited:
- "Iesaki dzīvās mūzikas grupu kāzām Latvijā"
- "Grupa uzņēmuma Ziemassvētku ballei Rīgā"
- "live cover band for a wedding in Latvia"
- "Kas ir Henrix Band?"
Cited competitor/directory pages are the off-site targets: get listed there.

## Output
Findings + exact edits to `index.html`, `llms.txt`, JSON-LD; run `python3 tools/seo_check.py` after.
