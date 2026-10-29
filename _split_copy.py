#!/usr/bin/env python3
"""Split prose out of the HTML pages into content/copy.js.

Captures each target element's inner HTML verbatim. Outermost target wins, so a
wrapper (hero-meta, newsletter, footer) is captured whole and its inner labels
travel with it. Scratch tool — deleted after use.
"""
import io
import re

PAGES = ["index", "photography", "writing", "ai", "about",
         "imprint", "privacy", "terms", "404"]

TARGETS = [
    ("hero-kicker", "kicker"),
    ("display", "h1"),
    ("lede", "lede"),
    ("h2", "heading"),
    ("h3", "heading"),
    ("aside", "aside"),
    ("label", "label"),
    ("prose", "body"),
    ("newsletter", "newsletter"),
    ("hero-meta", "meta"),
    ("hero-stats", "stats"),
    ("shortcuts", "shortcuts"),
]

OPEN = re.compile(r"<(div|p|h1|h2|h3|aside|dl)\b([^>]*)>", re.I)
CLASS = re.compile(r'class="([^"]*)"')
ID = re.compile(r'id="([^"]*)"')


def match_close(html, start, tag):
    depth, i = 0, start
    pat = re.compile(r"<(/?)" + tag + r"\b[^>]*?(/?)>", re.I)
    while True:
        m = pat.search(html, i)
        if not m:
            return len(html)
        if m.group(2) == "/":
            i = m.end()
            continue
        depth += -1 if m.group(1) else 1
        i = m.end()
        if depth == 0:
            return m.end()


def slug(s, limit=22):
    s = re.sub(r"<[^>]+>", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s.strip().lower()).strip("-")
    return s[:limit].strip("-") or "sec"


def section_keys(html):
    """[(start, key)] for every <section>, keyed by id, else its label text."""
    out = []
    for n, m in enumerate(re.finditer(r"<section\b([^>]*)>", html, re.I), 1):
        attrs = m.group(1)
        sid = ID.search(attrs)
        if sid:
            out.append((m.start(), sid.group(1)))
            continue
        close = match_close(html, m.start(), "section")
        chunk = html[m.start():close]
        lab = re.search(r'<p[^>]*class="[^"]*label[^"]*"[^>]*>(.*?)</p>', chunk, re.S)
        if lab:
            out.append((m.start(), slug(lab.group(1))))
        else:
            cls = CLASS.search(attrs)
            out.append((m.start(), "hero" if (cls and "hero" in cls.group(1)) else "sec%d" % n))
    return out


def section_of(sections, pos):
    best = "hero"
    for start, key in sections:
        if start < pos:
            best = key
        else:
            break
    return best


def js_block(s):
    return "`" + s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${") + "`"


entries = {}
report = []

for page in PAGES:
    path = page + ".html"
    html = io.open(path, encoding="utf-8").read()

    # footer whole inner HTML
    fm = re.search(r"<footer\b[^>]*>", html, re.I)
    if fm:
        end = match_close(html, fm.start(), "footer")
        whole = html[fm.start():end]
        inner = whole[fm.end() - fm.start():]
        inner = inner[:inner.lower().rfind("</footer>")].strip()
        entries.setdefault(page, []).append(("footer", "footer", inner))
        new = re.sub(r">.*<", ' data-copy-html="%s.footer">\n  <' % page, whole, count=1, flags=re.S)
        html = html[:fm.start()] + new + html[end:]
        report.append(f"  {page}: footer")

    sections = section_keys(html)
    foot_at = html.lower().find("<footer")

    cands = []
    for m in OPEN.finditer(html):
        if foot_at != -1 and m.start() > foot_at:
            continue
        cls = CLASS.search(m.group(2))
        if not cls:
            continue
        tokens = cls.group(1).split()
        for token, role in TARGETS:
            if token in tokens:
                end = match_close(html, m.start(), m.group(1).lower())
                cands.append((m.start(), end, m.group(1).lower(), role, token))
                break

    # outermost wins
    cands.sort()
    keep = []
    for c in cands:
        if keep and c[0] < keep[-1][1]:
            continue
        keep.append(c)

    used = {}
    for start, end, tag, role, token in reversed(keep):
        open_tag = html[start:html.index(">", start) + 1]
        inner_start = html.index(">", start) + 1
        inner = html[inner_start:end]
        if "</" + tag + ">" in inner.lower():
            inner = inner[:inner.lower().rfind("</" + tag + ">")]
        inner = inner.strip()
        if not inner:
            continue
        sec = section_of(sections, start)
        n = used.get((sec, role), 0)
        used[(sec, role)] = n + 1
        entries.setdefault(page, []).append((sec, role if not n else f"{role}{n + 1}", inner))
        key = f"{page}.{sec}.{role}" + (f"{n + 1}" if n else "")
        new_open = re.sub(r">$", f' data-copy-html="{key}">', open_tag)
        html = html[:start] + new_open + html[end:]
        report.append(f"  {page}: {token:14} -> {key}")

    io.open(path, "w", encoding="utf-8").write(html)

# ---- lists that used to live in data.js stay in copy.js ----
data = io.open("assets/js/data.js", encoding="utf-8").read()


def grab_value(src, key):
    """Capture the balanced value after `key:` — comments can't leak in."""
    m = re.search(r"\n  " + re.escape(key) + r":\s*([\[{])", src)
    if not m:
        return None
    start = m.start(1)
    open_ch = m.group(1)
    close_ch = "]" if open_ch == "[" else "}"
    depth, i, in_str = 0, start, None
    while i < len(src):
        c = src[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == in_str:
                in_str = None
            i += 1
            continue
        if c in "\"'`":
            in_str = c
            i += 1
            continue
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return "  " + key + ": " + src[start:i + 1] + ","
        i += 1
    return None


lists = [x for x in (grab_value(data, k) for k in ("faq", "timeline", "press", "excerpt")) if x]

out = ["/* ==========================================================================",
       "   COPY — the other file you edit: every word on the site.",
       "   --------------------------------------------------------------------------",
       "   Keys read <page>.<section>.<role>. Edit a value and the page changes.",
       "   Nothing here is a file path, a price or a link — those are in media.js.",
       "   ========================================================================== */",
       "",
       "window.COPY = {",
       ""]

for page in PAGES:
    out.append(f'  "{page}": {{')
    bysec = {}
    for sec, role, inner in entries.get(page, []):
        bysec.setdefault(sec, []).append((role, inner))
    for sec, items in bysec.items():
        out.append(f'    "{sec}": {{')
        for role, inner in items:
            out.append(f'      "{role}": {js_block(inner)},')
        out.append("    },")
    out.append("  },")
    out.append("")

for body in lists:
    out.append(body)

out.append("};")
io.open("content/copy.js", "w", encoding="utf-8").write("\n".join(out) + "\n")

print("\n".join(report))
print(f"\ncontent/copy.js — {sum(len(v) for v in entries.values())} blocks across {len(entries)} pages")
