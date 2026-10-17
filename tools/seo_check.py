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

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
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

    def handle_endtag(self, tag):
        if tag == "title" and self._in == "title":
            self.title, self._in = self._buf.strip(), None
        elif tag == "script" and self._in == "ld":
            self.jsonld.append(self._buf)
            self._in = None


def check_page(path):
    p = Page()
    p.feed(path.read_text(encoding="utf-8"))
    name = path.name

    if not p.html_lang:
        errors.append(f"{name}: <html> has no lang")
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
    if canon != [SITE]:
        errors.append(f"{name}: canonical should be exactly {SITE}, got {canon}")
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
        for want in ("WebSite", "MusicGroup"):
            if want not in types:
                warnings.append(f"{name}: JSON-LD has no {want}")
        if "FAQPage" not in types:
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
    for loc in tree.findall(".//i:loc", ns):
        rel = loc.text.replace(SITE, "")
        if not (ROOT / rel).exists():
            errors.append(f"sitemap.xml: image missing on disk: {rel}")
    try:
        changed = subprocess.run(
            ["git", "-C", str(ROOT), "log", "-1", "--format=%cs", "--", "index.html", "llms.txt"],
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


for f in ("index.html", "404.html"):
    if (ROOT / f).exists():
        check_page(ROOT / f)
check_files()

for w in warnings:
    print(f"WARN  {w}")
for e in errors:
    print(f"ERROR {e}")
print(f"\n{len(errors)} error(s), {len(warnings)} warning(s)")
sys.exit(1 if errors else 0)
