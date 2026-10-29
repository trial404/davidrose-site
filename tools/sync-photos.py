#!/usr/bin/env python3
"""
Sync photographs from the source folders into the site.

    python3 tools/sync-photos.py            # do it
    python3 tools/sync-photos.py --dry-run  # just report

  1. reads   ../../landscape photos/  and  ../../artistic photos/
  2. writes web-optimised copies into assets/img/photos/ (1600px, JPEG q66)
  3. rewrites the `photos:` list in content/media.js to match exactly
  4. drops prints whose photograph no longer exists   (prints block only)
  5. removes dead ids from `collections:`             (collections block only)
  6. repoints `featuredPrintId` if it vanished
  7. deletes web copies whose source has gone

Titles, shop membership and collections you have set are preserved, matched by id.
Every edit is scoped to one top-level block, so nothing outside it is touched.
"""
import io
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = {
    "landscape": os.path.join(ROOT, "..", "landscape photos"),
    "artistic": os.path.join(ROOT, "..", "artistic photos"),
}
DEST = os.path.join(ROOT, "assets", "img", "photos")
MEDIA = os.path.join(ROOT, "content", "media.js")
MAX_EDGE, QUALITY = 1600, 66
DRY = "--dry-run" in sys.argv
warnings = []


def slug(s):
    s = os.path.splitext(s)[0]
    return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", s.lower()))


def dims(path):
    out = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path],
                         capture_output=True, text=True).stdout
    w = re.search(r"pixelWidth:\s*(\d+)", out)
    h = re.search(r"pixelHeight:\s*(\d+)", out)
    return (int(w.group(1)), int(h.group(1))) if w and h else (0, 0)


def convert(src, dst):
    r = subprocess.run(["sips", "-Z", str(MAX_EDGE), "-s", "format", "jpeg",
                        "-s", "formatOptions", str(QUALITY), src, "--out", dst],
                       capture_output=True, text=True)
    return r.returncode == 0 and os.path.exists(dst)


def block_span(text, key):
    """(start, end) of the balanced [...] array that follows `  key: [`."""
    m = re.search(r"\n  " + re.escape(key) + r":\s*\[", text)
    if not m:
        raise SystemExit(f"could not find '{key}:' block in media.js")
    i = text.index("[", m.start())
    depth, j, in_str = 0, i, None
    while j < len(text):
        c = text[j]
        if in_str:
            if c == "\\":
                j += 2
                continue
            if c == in_str:
                in_str = None
            j += 1
            continue
        if c in "\"'`":
            in_str = c
        elif c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                return m.start() + len(m.group(0)) - 1, j + 1
        j += 1
    raise SystemExit(f"unbalanced array for '{key}'")


def object_spans(text):
    """(start, end_including_trailing_comma) for each {...} at depth 1."""
    spans, depth, start, in_str = [], 0, None, None
    for i, c in enumerate(text):
        if in_str:
            if c == "\\":
                continue
            if c == in_str:
                in_str = None
            continue
        if c in "\"'`":
            in_str = c
        elif c == "{":
            if depth == 0:
                start = i
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                while end < len(text) and text[end] in " \t":
                    end += 1
                if end < len(text) and text[end] == ",":
                    end += 1
                spans.append((start, end))
    return spans


# ---------- read current state ----------
media = io.open(MEDIA, encoding="utf-8").read()
existing = {}
for m in re.finditer(r'\{ id: "([^"]+)", title: "([^"]+)", series: "([^"]+)", sets: \[([^\]]*)\]', media):
    existing[m.group(1)] = {
        "title": m.group(2),
        "sets": [x.strip().strip('"') for x in m.group(4).split(",") if x.strip()],
    }

# ---------- walk source folders ----------
wanted = []
for series, folder in SRC.items():
    if not os.path.isdir(folder):
        warnings.append(f"missing source folder: {folder}")
        continue
    for name in sorted(os.listdir(folder)):
        if name.startswith(".") or os.path.splitext(name)[1].lower() not in (
                ".jpg", ".jpeg", ".png", ".tif", ".tiff"):
            continue
        pid = f"{series}-{slug(name)}"
        wanted.append({"id": pid, "series": series.capitalize(),
                       "src": os.path.join(folder, name),
                       "out": os.path.join(DEST, pid + ".jpg")})

if not os.path.isdir(DEST) and not DRY:
    os.makedirs(DEST, exist_ok=True)

# ---------- convert ----------
for w in wanted:
    fresh = (not os.path.exists(w["out"]) or
             os.path.getmtime(w["src"]) > os.path.getmtime(w["out"]))
    w["fresh"] = fresh
    if fresh and not DRY and not convert(w["src"], w["out"]):
        warnings.append(f"conversion failed: {w['src']}")

# ---------- titles / sets / ratios ----------
next_num = {}
for p in existing.values():
    m = re.search(r"(\d+)\s*$", p["title"])
    if m:
        base = p["title"].rsplit(" ", 1)[0]
        next_num[base] = max(next_num.get(base, 0), int(m.group(1)))

photos = []
for w in wanted:
    old = existing.get(w["id"], {})
    title = old.get("title")
    if not title:
        base = w["series"]
        next_num[base] = next_num.get(base, 0) + 1
        title = f"{base} {next_num[base]:02d}"
    cw, ch = dims(w["out"] if os.path.exists(w["out"]) else w["src"])
    photos.append({"id": w["id"], "title": title, "series": w["series"],
                   "sets": old.get("sets") or [w["series"].lower()],
                   "ar": f"{cw} / {ch}", "fresh": w["fresh"]})

live = {p["id"] for p in photos}

# ---------- rewrite photos block ----------
rows = []
for p in photos:
    sets = ", ".join('"%s"' % s for s in p["sets"])
    rows.append('    { id: "%s", title: "%s", series: "%s", sets: [%s], ar: "%s", '
                'image: "assets/img/photos/%s.jpg" },' % (
                    p["id"], p["title"], p["series"], sets, p["ar"], p["id"]))
new_array = "[\n" + "\n".join(rows) + "\n  ]"

# replace only the [...] that follows `photos:`, never the key itself
s0, e0 = block_span(media, "photos")
old_listed = len(re.findall(r"\{ id:", media[s0:e0]))
media = media[:s0] + new_array + media[e0:]

# ---------- drop prints whose photograph is gone ----------
p0, p1 = block_span(media, "prints")
prints_block = media[p0:p1]
dropped = []
for a, b in reversed(object_spans(prints_block)):
    obj = prints_block[a:b]
    m = re.search(r'id: "([^"]+)"', obj)
    if not m or m.group(1) in live:
        continue
    dropped.append(m.group(1))
    prints_block = prints_block[:a] + prints_block[b:]
media = media[:p0] + prints_block + media[p1:]

# ---------- prune collections ----------
c0, c1 = block_span(media, "collections")
collections = media[c0:c1]

def prune(m):
    ids = [x.strip().strip('"') for x in m.group(1).split(",") if x.strip()]
    return "photos: [" + ", ".join('"%s"' % i for i in ids if i in live) + "]"

collections = re.sub(r"photos: \[([^\]]*)\]", prune, collections)
media = media[:c0] + collections + media[c1:]

# ---------- featured print ----------
q0, q1 = block_span(media, "prints")
remaining = re.findall(r'id: "([^"]+)"', media[q0:q1])
fm = re.search(r'featuredPrintId: "([^"]+)"', media)
featured_note = ""
if fm and fm.group(1) not in remaining and remaining:
    media = media.replace(fm.group(0), 'featuredPrintId: "%s"' % remaining[0])
    featured_note = f"featuredPrintId: {fm.group(1)} -> {remaining[0]}"

# ---------- orphaned files ----------
orphans = [n for n in sorted(os.listdir(DEST))
           if n.endswith(".jpg") and not n.startswith(".") and n[:-4] not in live]

if not DRY:
    io.open(MEDIA, "w", encoding="utf-8").write(media)
    for n in orphans:
        os.remove(os.path.join(DEST, n))

# ---------- report ----------
added = [p["id"] for p in photos if p["id"] not in existing]
removed = [i for i in existing if i not in live]
print("=" * 68)
print("SYNC PHOTOGRAPHS" + ("   (dry run — nothing written)" if DRY else ""))
print("=" * 68)
print(f"  source images      {len(photos)}")
print(f"  previously listed  {old_listed}")
print(f"  added              {len(added)}")
for i in added:
    print(f"      + {i}")
print(f"  removed            {len(removed)}")
for i in removed:
    print(f"      - {i}")
print(f"  re-encoded         {len([p for p in photos if p['fresh']])}")
if dropped:
    print(f"  prints dropped     {len(dropped)}  (their photograph is gone)")
    for i in dropped:
        print(f"      ! {i}")
if orphans:
    print(f"  orphan files gone  {len(orphans)}")
    for n in orphans:
        print(f"      x {n}")
if featured_note:
    print("  " + featured_note)
if warnings:
    print("  warnings:")
    for w in warnings:
        print(f"      ! {w}")
print()
for series in ("Landscape", "Artistic"):
    n = len([p for p in photos if p["series"] == series])
    s = len([p for p in photos if p["series"] == series and "shop" in p["sets"]])
    print(f"  {series:11} {n:3} photographs · {s} in the shop")
print(f"  prints listed for sale: {len(remaining)}")
