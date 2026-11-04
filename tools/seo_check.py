#!/usr/bin/env python3
"""Offline SEO / AI-search checks for henrix.lv. Exit 1 on errors, 0 otherwise (warnings allowed).

Usage: python3 tools/seo_check.py [repo_root]
"""
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent)
SITE = "https://henrix.lv/"
errors, warnings = [], []


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title, self.meta, self.links, self.imgs, self.h1 = "", {}, [], [], 0
        self.jsonld, self.scripts, self._in, self._buf = [], [], None, ""
        self.html_lang = None
        # for LV/EN parity: element ids, form fields (name=value), JS hooks, local asset refs, visible text
        self.ids, self.fields, self.hooks, self.refs, self.text = [], [], [], [], []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.append(a["id"])
        if tag in ("input", "select", "option", "textarea") and (a.get("name") or tag == "option"):
            # page-specific hidden values (language marker, subject) are compared by name only
            val = "" if a.get("name") in ("_subject", "Valoda") else a.get("value", "?")
            self.fields.append(f"{tag}:{a.get('name', '')}={val}")
        for k in ("data-tier", "data-col", "data-sets", "data-glow", "data-menu-item", "data-quote"):
            if k in a:
                self.hooks.append(f"{tag}[{k}={a[k]}]")
        for k in ("src", "href"):
            if a.get(k):
                self.refs.append(a[k])
        for k in ("srcset", "imagesrcset"):
            if a.get(k):
                self.refs += [c.strip().split(" ")[0] for c in a[k].split(",")]
        if tag in ("script", "style"):
            self._skip += 1
        for k in ("alt", "aria-label", "placeholder", "title"):
            if a.get(k):
                self.text.append(a[k])
        if tag == "html":
            self.html_lang = a.get("lang")
        elif tag == "meta":
            key = a.get("name") or a.get("property") or a.get("http-equiv")
            if key:
                self.meta[key.lower()] = a.get("content", "")
        elif tag == "link":
            self.links.append(a)
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "h1":
            self.h1 += 1
        elif tag == "title":
            self._in, self._buf = "title", ""
        elif tag == "script":
            if a.get("type") == "application/ld+json":
                self._in, self._buf = "ld", ""
            elif a.get("src"):
                self.scripts.append(a["src"])

    def handle_data(self, data):
        if self._in:
            self._buf += data
        elif not self._skip and data.strip():
            self.text.append(data.strip())

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self._skip:
            self._skip -= 1
        if tag == "title" and self._in == "title":
            self.title, self._in = self._buf.strip(), None
        elif tag == "script" and self._in == "ld":
            self.jsonld.append(self._buf)
            self._in = None


# indexable pages: path -> (canonical URL, <html lang>)
PAGES = {"index.html": (SITE, "lv"), "en/index.html": (SITE + "en/", "en"),
         "alternative/index.html": (SITE + "alternative/", "lv"), "en/alternative/index.html": (SITE + "en/alternative/", "en")}
# programme sub-pages: own JSON-LD types, no FAQPage
SINGLE = {"alternative/index.html": ("WebPage", "Service"), "en/alternative/index.html": ("WebPage", "Service")}
# LV/EN pairs: (LV page, EN page) -> expected hreflang alternates on both
PAIRS = {("index.html", "en/index.html"): {"lv": SITE, "en": SITE + "en/", "x-default": SITE},
         ("alternative/index.html", "en/alternative/index.html"):
             {"lv": SITE + "alternative/", "en": SITE + "en/alternative/", "x-default": SITE + "alternative/"}}
HREFLANG_OF = {page: alts for pair, alts in PAIRS.items() for page in pair}


def ld_urls(node):
    """every @id / url value in a JSON-LD tree"""
    if isinstance(node, dict):
        for k, v in node.items():
            if k in ("@id", "url") and isinstance(v, str):
                yield v
            else:
                yield from ld_urls(v)
    elif isinstance(node, list):
        for v in node:
            yield from ld_urls(v)


def check_page(path):
    p = Page()
    p.feed(path.read_text(encoding="utf-8"))
    name = path.relative_to(ROOT).as_posix()
    want_canon, want_lang = PAGES.get(name, (SITE, None))

    if not p.html_lang:
        errors.append(f"{name}: <html> has no lang")
    elif want_lang and p.html_lang != want_lang:
        errors.append(f"{name}: <html lang> should be {want_lang}, got {p.html_lang}")
    t = len(p.title)
    if not p.title:
        errors.append(f"{name}: missing <title>")
    elif not 30 <= t <= 65:
        warnings.append(f"{name}: title is {t} chars (aim 30–65)")
    if name == "404.html":
        if "noindex" not in p.meta.get("robots", ""):
            warnings.append("404.html: should have <meta name=robots content=noindex>")
        return p
    d = len(p.meta.get("description", ""))
    if not d:
        errors.append(f"{name}: missing meta description")
    elif not 70 <= d <= 170:
        warnings.append(f"{name}: meta description is {d} chars (aim 70–170)")

    canon = [l.get("href") for l in p.links if l.get("rel") == "canonical"]
    if canon != [want_canon]:
        errors.append(f"{name}: canonical should be exactly {want_canon}, got {canon}")
    alts = {l.get("hreflang"): l.get("href") for l in p.links if l.get("rel") == "alternate" and l.get("hreflang")}
    want_alts = HREFLANG_OF.get(name, {})
    if alts != want_alts:
        errors.append(f"{name}: hreflang alternates should be {want_alts}, got {alts}")
    if p.meta.get("og:url") != want_canon:
        errors.append(f"{name}: og:url should be {want_canon}")
    for ref in p.refs:
        if ref.startswith(("http", "#", "mailto:", "tel:", "data:", "//")):
            continue
        ref = ref.split("?")[0].split("#")[0]  # cache-busting ?v= and fragments are not part of the file path
        local = (ROOT / ref.lstrip("/")) if ref.startswith("/") else (path.parent / ref)
        if not local.resolve().exists():
            errors.append(f"{name}: local reference not found: {ref}")
    for k in ("og:title", "og:description", "og:image", "og:url", "twitter:card"):
        if not p.meta.get(k):
            errors.append(f"{name}: missing {k}")
    if p.h1 != 1:
        errors.append(f"{name}: expected exactly one <h1>, found {p.h1}")
    for img in p.imgs:
        if "alt" not in img:
            errors.append(f"{name}: <img src={img.get('src')}> has no alt attribute")
        if not (img.get("width") and img.get("height")):
            warnings.append(f"{name}: <img src={img.get('src')}> lacks width/height (CLS)")
        src = img.get("src", "")
        if src and not src.startswith(("http", "data:")) and not (ROOT / src.lstrip("/")).exists():
            errors.append(f"{name}: image not found: {src}")

    if not p.jsonld:
        errors.append(f"{name}: no JSON-LD structured data")
    for block in p.jsonld:
        try:
            data = json.loads(block)
        except json.JSONDecodeError as e:
            errors.append(f"{name}: JSON-LD does not parse: {e}")
            continue
        types = {n.get("@type") for n in data.get("@graph", [data])}
        if name in SINGLE:
            # page-level nodes must point at this page, not its LV/EN twin (shared #band / #website ids are fine)
            for u in ld_urls(data.get("@graph", [data])):
                if u.startswith(SITE + "alternative/") or u.startswith(SITE + "en/alternative/"):
                    if not u.startswith(want_canon):
                        errors.append(f"{name}: JSON-LD @id/url points at the other language: {u}")
        for want in SINGLE.get(name, ("WebSite", "MusicGroup")):
            if want not in types:
                warnings.append(f"{name}: JSON-LD has no {want}")
        if name not in SINGLE and "FAQPage" not in types:
            warnings.append(f"{name}: no FAQPage JSON-LD (helps AI answers / rich results)")

    csp = p.meta.get("content-security-policy", "")
    for src in p.scripts:
        m = re.match(r"https?://([^/]+)", src)
        if m and m.group(1) not in csp:
            errors.append(f"{name}: external script {m.group(1)} not allowed in CSP script-src")
    return p


def check_files():
    robots = (ROOT / "robots.txt").read_text()
    if "Sitemap: https://henrix.lv/sitemap.xml" not in robots:
        errors.append("robots.txt: missing Sitemap line")
    if re.search(r"^Disallow:\s*/\s*$", robots, re.M):
        errors.append("robots.txt: disallows the whole site")

    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9",
          "i": "http://www.google.com/schemas/sitemap-image/1.1"}
    tree = ET.parse(ROOT / "sitemap.xml")
    lastmod = tree.findtext(".//s:lastmod", namespaces=ns)
    locs = [l.text for l in tree.findall("s:url/s:loc", ns)]
    for url, _ in PAGES.values():
        if url not in locs:
            errors.append(f"sitemap.xml: missing <loc>{url}</loc>")
    # reciprocal hreflang: every page of a pair lists the same alternates as the page itself
    by_page = {PAGES[p][0]: alts for p, alts in HREFLANG_OF.items()}
    for u in tree.findall("s:url", ns):
        loc = u.findtext("s:loc", namespaces=ns)
        got = {l.get("hreflang"): l.get("href") for l in u.findall("{http://www.w3.org/1999/xhtml}link")}
        want = by_page.get(loc, {})
        if got != want:
            errors.append(f"sitemap.xml: hreflang for {loc} should be {want}, got {got}")
    for loc in tree.findall(".//i:loc", ns):
        rel = loc.text.replace(SITE, "")
        if not (ROOT / rel).exists():
            errors.append(f"sitemap.xml: image missing on disk: {rel}")
    try:
        changed = subprocess.run(
            ["git", "-C", str(ROOT), "log", "-1", "--format=%cs", "--", *PAGES, "llms.txt"],
            capture_output=True, text=True, check=True).stdout.strip()
        if changed and lastmod and lastmod < changed:
            warnings.append(f"sitemap.xml: lastmod {lastmod} is older than last content change {changed}")
    except (subprocess.CalledProcessError, FileNotFoundError):
        pass

    llms = ROOT / "llms.txt"
    if not llms.exists():
        errors.append("llms.txt missing")
    else:
        txt = llms.read_text()
        if not txt.startswith("# "):
            errors.append("llms.txt: must start with '# <name>'")
        html = (ROOT / "index.html").read_text()
        for phone in re.findall(r"\+371 ?\d{8}", txt):
            if phone.replace(" ", "") not in html.replace(" ", ""):
                errors.append(f"llms.txt: phone {phone} not on the page (facts out of sync)")


# Latvian letters allowed on the English page: song/artist names and the language switch
EN_ALLOWED_LV = {"Prāta Vētra", "Pa ceļam", "Kurtizāņu ugunskurs", "Kad Ēģiptē sniegs", "Vējā",
                 "Fēlikss Ķiģelis", "Zīlīte"}
LV_CHARS = re.compile(r"[āčēģīķļņšūžĀČĒĢĪĶĻŅŠŪŽ]")


def check_parity(lv, en, en_name):
    """the EN page mirrors its LV page: same ids, form fields/values and JS hooks; no untranslated text."""
    for what in ("ids", "fields", "hooks"):
        a, b = getattr(lv, what), getattr(en, what)
        if a != b:
            only_lv = [x for x in a if x not in b][:5]
            only_en = [x for x in b if x not in a][:5]
            errors.append(f"LV/EN parity ({en_name}): {what} differ (only LV: {only_lv}, only EN: {only_en})")
    for t in en.text:
        if LV_CHARS.search(t) and t not in EN_ALLOWED_LV:
            errors.append(f"{en_name}: untranslated Latvian text? {t[:70]!r}")


pages = {}
for f in (*PAGES, "404.html"):
    if (ROOT / f).exists():
        pages[f] = check_page(ROOT / f)
    elif f in PAGES:
        errors.append(f"{f} missing")
for lv_name, en_name in PAIRS:
    if lv_name in pages and en_name in pages:
        check_parity(pages[lv_name], pages[en_name], en_name)
check_files()

for w in warnings:
    print(f"WARN  {w}")
for e in errors:
    print(f"ERROR {e}")
print(f"\n{len(errors)} error(s), {len(warnings)} warning(s)")
sys.exit(1 if errors else 0)
