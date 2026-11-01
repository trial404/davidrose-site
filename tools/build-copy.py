#!/usr/bin/env python3
"""
Build content/copy.js and content/photos.js from content/WRITING.txt.

WRITING.txt is the file you edit by hand. This script turns it into the two
JavaScript files the site loads. You should never need to open those.

    python3 tools/build-copy.py            rebuild the JS from the document
    python3 tools/build-copy.py --check    report drift, write nothing
    python3 tools/build-copy.py --init     regenerate the document from the JS
                                           (only for setting up, or after a
                                           structural change to the site)

The document is a flat list of blocks:

    ### photography.prints.lede
    WHERE: Photography — Prints section, the lede paragraph
    <blank line>
    The body. Anything you like, including HTML.

`### ` starts a block. The line after it may be a WHERE label — that is a note
to yourself and has no effect on the site. Everything else is the text.

Numeric path segments become array items, so faq.0.q / faq.0.a build the FAQ
list. Photo captions are the same thing under photo.<photo-id>.<field>.

Only stdlib python is needed. photos.js is read back through node, because
parsing JS with a regex is how you lose somebody's writing.
"""

import json
import os
import re
import subprocess
import sys
import textwrap

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")
DOC = os.path.join(CONTENT, "WRITING.txt")
COPY_JS = os.path.join(CONTENT, "copy.js")
PHOTOS_JS = os.path.join(CONTENT, "photos.js")

KEY_RE = re.compile(r"^###\s+(\S+)\s*$")
WHERE_RE = re.compile(r"^WHERE:\s*(.*)$")
BANNER_RE = re.compile(r"^[=-]{3,}\s*$")

PHOTO_FIELDS = ["title", "location", "date", "description"]


# --------------------------------------------------------------------------
# reading the document
# --------------------------------------------------------------------------

def parse_doc(text):
    """-> [(key, where, body)] in document order."""
    blocks = []
    key = where = None
    lines = []

    def flush():
        if key is None:
            return
        body = "\n".join(lines).strip("\n")
        blocks.append((key, where or "", dedent(body)))

    skipping = False

    for line in text.split("\n"):
        m = KEY_RE.match(line)
        if m:
            flush()
            key, where, lines, skipping = m.group(1), None, [], False
            continue
        if key is None:
            continue
        if skipping:
            continue
        # a banner of = or - ends the body: whatever follows it is the heading
        # of the next group, not text. Without this the last block of every
        # group swallows the heading that comes after it.
        if BANNER_RE.match(line):
            skipping = True
            continue
        if where is None and not lines and WHERE_RE.match(line):
            where = WHERE_RE.match(line).group(1).strip()
            continue
        lines.append(line)
    flush()
    return blocks


def dedent(body):
    lines = body.split("\n")
    indents = [len(l) - len(l.lstrip(" ")) for l in lines if l.strip()]
    if not indents:
        return ""
    cut = min(indents)
    out = []
    for l in lines:
        if not l.strip():
            out.append("")
        elif len(l) >= cut:
            out.append(l[cut:])
        else:
            out.append(l.lstrip())
    return "\n".join(out)


# --------------------------------------------------------------------------
# assembling
# --------------------------------------------------------------------------

def nest(pairs):
    root = {}
    for key, value in pairs:
        parts = key.split(".")
        cur = root
        for p in parts[:-1]:
            nxt = cur.get(p)
            if not isinstance(nxt, dict):
                nxt = {}
                cur[p] = nxt
            cur = nxt
        cur[parts[-1]] = value
    return to_lists(root)


def to_lists(node):
    if not isinstance(node, dict):
        return node
    conv = {k: to_lists(v) for k, v in node.items()}
    if conv and all(k.isdigit() for k in conv):
        return [conv[k] for k in sorted(conv, key=int)]
    return conv


def split_blocks(blocks):
    copy_pairs, photo_pairs = [], []
    for key, where, body in blocks:
        if key.startswith("photo."):
            photo_pairs.append((key[len("photo."):], body))
        else:
            copy_pairs.append((key, body))
    return nest(copy_pairs), nest(photo_pairs)


# --------------------------------------------------------------------------
# emitting js
# --------------------------------------------------------------------------

def js_string(s):
    """A template literal, with anything that could break it escaped."""
    s = s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
    return "`" + s + "`"


def emit(node, indent=1, key=None):
    pad = "  " * indent
    if isinstance(node, dict):
        if not node:
            return "{}"
        out = ["{"]
        for k, v in node.items():
            out.append('%s  "%s": %s,' % (pad, k, emit(v, indent + 1, k)))
        out.append(pad + "}")
        return "\n".join(out)
    if isinstance(node, list):
        out = ["["]
        for i, v in enumerate(node):
            out.append("%s  %s," % (pad, emit(v, indent + 1, str(i))))
        out.append(pad + "]")
        return "\n".join(out)
    return js_string(str(node))


COPY_HEADER = """/* ==========================================================================
   COPY — every word on the site.

   GENERATED FILE. Do not edit here — your changes will be overwritten.

   Edit content/WRITING.txt instead, then run:

       python3 tools/build-copy.py

   That document has the same blocks, in reading order, each labelled with
   where it appears on the page. To check whether this file is out of date:

       python3 tools/build-copy.py --check
   ========================================================================== */

window.COPY = """

PHOTOS_HEADER = """/* ==========================================================================
   PHOTOS — the words for each photograph.

   GENERATED FILE. Do not edit here — your changes will be overwritten.

   Edit the photograph captions at the end of content/WRITING.txt, then run:

       python3 tools/build-copy.py

   The id IS the filename: landscape-h39a0377 comes from
   landscape photos/H39A0377.jpg. Rename the file BEFORE you write anything,
   or what you wrote stays attached to an id nothing points at.

   tools/sync-photos.py appends a blank entry here for every new photograph.
   Run this build afterwards and those new ids will appear in WRITING.txt,
   waiting to be filled in.
   ========================================================================== */

window.PHOTO_INFO = """


def write_copy(tree):
    body = emit(tree, 0)
    return COPY_HEADER + body + ";\n"


def write_photos(existing, doc_tree):
    """Merge rather than replace: ids that sync-photos.py added and you have not
    captioned yet must survive."""
    merged = dict(existing or {})
    for pid, fields in (doc_tree or {}).items():
        # replace, not merge: deleting a field in the document must delete it
        # from the site. Ids with no caption block at all are left untouched,
        # so a photograph added by sync-photos.py survives until you write it.
        merged[pid] = {f: fields[f] for f in PHOTO_FIELDS
                       if isinstance(fields, dict) and f in fields}
    body = emit(merged, 0)
    return PHOTOS_HEADER + body + ";\n"


# --------------------------------------------------------------------------
# reading the current js back
# --------------------------------------------------------------------------

def read_js(path, var):
    if not os.path.exists(path):
        return {}
    script = (
        "global.window={};"
        'require(%s);'
        "process.stdout.write(JSON.stringify(window.%s||{}));"
        % (json.dumps(path), var)
    )
    try:
        out = subprocess.run(["node", "-e", script], capture_output=True, text=True)
    except FileNotFoundError:
        sys.exit("node is required to read the current files back")
    if out.returncode != 0:
        sys.exit("could not read %s:\n%s" % (path, out.stderr.strip()))
    return json.loads(out.stdout or "{}")


# --------------------------------------------------------------------------
# comparison — whitespace-insensitive, because the document is not the js
# --------------------------------------------------------------------------

def flat(node, prefix="", out=None):
    out = {} if out is None else out
    if isinstance(node, dict):
        for k, v in node.items():
            flat(v, (prefix + "." + k) if prefix else k, out)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            flat(v, "%s.%d" % (prefix, i), out)
    else:
        out[prefix] = norm(node)
    return out


def norm(v):
    return " ".join(str(v).split())


def drift(name, want, have):
    w, h = flat(want), flat(have)
    problems = []
    for k in sorted(set(w) | set(h)):
        if k not in h:
            problems.append("  + %s  (in the document, missing from %s)" % (k, name))
        elif k not in w:
            problems.append("  - %s  (in %s, gone from the document)" % (k, name))
        elif w[k] != h[k]:
            problems.append("  ~ %s  (text differs)" % k)
    return problems


# --------------------------------------------------------------------------
# --init: write the document from the current js
# --------------------------------------------------------------------------

PAGE_NAMES = {
    "index": "Home page",
    "photography": "Photography page",
    "writing": "Writing page",
    "ai": "AI builds page",
    "about": "About page",
    "imprint": "Imprint page",
    "privacy": "Privacy page",
    "terms": "Terms page",
    "404": "404 page",
    "faq": "FAQ items (used on the photography page)",
    "timeline": "Timeline items (used on the about page)",
    "press": "Press quotes (used on the about page)",
    "excerpt": "Book excerpt (used on the writing page)",
}

ROLE_NAMES = {
    "h1": "the headline",
    "lede": "the lede paragraph",
    "heading": "the section heading",
    "label": "the small label above the heading",
    "kicker": "the small kicker above the headline",
    "aside": "the note to the right of the heading",
    "cta": "the button text",
    "body": "the body paragraph",
    "meta": "the specification list",
    "stats": "the statistics row",
    "q": "the question",
    "a": "the answer",
    "year": "the year",
    "text": "the line beside the year",
    "quote": "the quote",
    "source": "who said it",
    "footer": "the whole footer block (three columns of links and text)",
    "note": "a short note",
    "title": "the title",
    "book": "the book",
    "chapter": "the chapter name",
    "shortcuts": "the keyboard shortcuts list",
    "newsletter": "the newsletter block",
}


def human_section(sec):
    s = sec.replace("-", " ").strip()
    if s.isdigit():
        return "item %s" % s
    if re.match(r"^sec\d", s):
        s = "section " + s[3:]
    fix = {"faq": "FAQ", "ai": "AI", "seo": "SEO", "eu": "EU"}
    if s.lower() in fix:
        return fix[s.lower()]
    m = re.match(r"^(\d+)\s+(.*)$", s)
    if m:                                   # "01 photography" -> "01 Photography"
        return m.group(1) + " " + m.group(2)[:1].upper() + m.group(2)[1:]
    return s[:1].upper() + s[1:]


def where_label(key):
    parts = key.split(".")
    page = parts[0]
    page_name = PAGE_NAMES.get(page, page)
    if page in ("faq", "timeline", "press"):
        idx = parts[1] if len(parts) > 1 else "?"
        role = ROLE_NAMES.get(parts[2], parts[2]) if len(parts) > 2 else ""
        return "%s — item %s, %s" % (page_name, str(int(idx) + 1), role)
    if len(parts) == 2:
        sec = parts[1]
        if sec == "footer":
            return "%s — %s" % (page_name, ROLE_NAMES["footer"])
        return "%s — the %s section" % (page_name, human_section(sec))
    sec = parts[1]
    role = parts[-1]
    return "%s — %s section, %s" % (page_name, human_section(sec), ROLE_NAMES.get(role, role))


DOC_HEAD_SECTIONS = {
    "index": "HOME PAGE",
    "photography": "PHOTOGRAPHY PAGE",
    "writing": "WRITING PAGE",
    "ai": "AI BUILDS PAGE",
    "about": "ABOUT PAGE",
    "faq": "FAQ ITEMS",
    "timeline": "TIMELINE ITEMS",
    "press": "PRESS QUOTES",
    "excerpt": "BOOK EXCERPT",
    "imprint": "IMPRINT PAGE",
    "privacy": "PRIVACY PAGE",
    "terms": "TERMS PAGE",
    "404": "404 PAGE",
}


def init_doc(copy_tree, photos):
    out = []
    out.append("""================================================================================
 WRITING
================================================================================

 Everything you write for the site lives in this one file. Edit any text
 between the block markers and leave the rest alone.

 HOW IT WORKS
 ------------
 Each block looks like this:

     ### photography.prints.lede
     WHERE: Photography page — Prints section, the lede paragraph
     <blank line>
     The text itself, which can run over several lines.

   `###`   the block's name. DO NOT CHANGE IT. The site looks text up by this
           name; rename it and the text disappears from the page.
   `WHERE` a note saying where this text appears. For you only — it never
           reaches the website. Edit or delete it freely, but keep it on one
           line.
   body    everything after that, until the next `###`. Blank lines are fine.
           Some blocks contain bits of HTML (a <div>, a <span>) — that is the
           layout of that block. Leave the tags, change the words inside them.

 HOW TO PUBLISH YOUR CHANGES
 ---------------------------
     python3 tools/build-copy.py

 That rewrites content/copy.js and content/photos.js, which is what the site
 actually loads. To check whether you have forgotten to run it:

     python3 tools/build-copy.py --check

 RULES OF THUMB
 --------------
   · Never edit content/copy.js or content/photos.js — they are generated and
     will be overwritten.
   · Placeholder text looks like [this]. Search for "[" to find what is left
     to write.
   · Photograph captions are at the very bottom of this file.

 CONTENTS
 --------
   PART ONE — page copy, in reading order
   PART TWO — photograph captions

================================================================================
 PART ONE — PAGE COPY
================================================================================
""")

    order = ["index", "photography", "writing", "ai", "about",
             "faq", "timeline", "press", "excerpt",
             "imprint", "privacy", "terms", "404"]
    seen = set()
    for page in order + [p for p in copy_tree if p not in order]:
        if page not in copy_tree or page in seen:
            continue
        seen.add(page)
        out.append("\n%s\n%s\n" % ("=" * 80, DOC_HEAD_SECTIONS.get(page, page.upper())))
        for key, value in flat_pairs(copy_tree[page], page):
            out.append("### %s\nWHERE: %s\n\n%s\n" % (key, where_label(key), value))

    out.append("""
================================================================================
 PART TWO — PHOTOGRAPH CAPTIONS
================================================================================

 These appear in the lightbox when someone opens a photograph. Four fields per
 picture. The id is the filename, so `landscape-h39a0377` is the picture in
 assets/img/photos/landscape-h39a0377.jpg.

 Delete a field and its row disappears from the lightbox. Leave the field as
 [location] and it shows as a placeholder — search for "[" to find them.
""")
    for pid, fields in photos.items():
        if not isinstance(fields, dict):
            continue
        out.append("\n" + "-" * 80)
        out.append("photo.%s" % pid)
        out.append("-" * 80 + "\n")
        for f in PHOTO_FIELDS:
            if f not in fields:
                continue
            out.append("### photo.%s.%s\nWHERE: Photograph %s — the %s\n\n%s\n"
                       % (pid, f, pid, f, fields[f]))
    return "\n".join(out)


def flat_pairs(node, prefix):
    if isinstance(node, dict):
        for k, v in node.items():
            for pair in flat_pairs(v, prefix + "." + k):
                yield pair
    elif isinstance(node, list):
        for i, v in enumerate(node):
            for pair in flat_pairs(v, "%s.%d" % (prefix, i)):
                yield pair
    else:
        yield prefix, str(node)


# --------------------------------------------------------------------------
# main
# --------------------------------------------------------------------------

def main(argv):
    mode = argv[1].lstrip("-") if len(argv) > 1 else "build"

    if mode not in ("build", "check", "init"):
        sys.exit(__doc__)

    if mode == "init":
        copy_tree = read_js(COPY_JS, "COPY")
        photos = read_js(PHOTOS_JS, "PHOTO_INFO")
        if not copy_tree:
            sys.exit("no copy.js to read")
        with open(DOC, "w", encoding="utf-8") as f:
            f.write(init_doc(copy_tree, photos))
        blocks = len(parse_doc(open(DOC, encoding="utf-8").read()))
        print("wrote %s — %d blocks (%d page + %d photograph fields)"
              % (os.path.relpath(DOC, ROOT), blocks,
                 sum(len(list(flat_pairs(copy_tree[p], p))) for p in copy_tree),
                 sum(len(f) for f in photos.values())))
        return 0

    if not os.path.exists(DOC):
        sys.exit("no %s — run: python3 tools/build-copy.py --init" % os.path.relpath(DOC, ROOT))

    blocks = parse_doc(open(DOC, encoding="utf-8").read())
    if not blocks:
        sys.exit("%s has no blocks — was it emptied?" % os.path.relpath(DOC, ROOT))

    copy_tree, photo_tree = split_blocks(blocks)

    if mode == "check":
        problems = []
        problems += drift("copy.js", copy_tree, read_js(COPY_JS, "COPY"))
        have_photos = read_js(PHOTOS_JS, "PHOTO_INFO")
        # only compare photographs that have a caption block; anything else in
        # photos.js is waiting to be written, not out of date
        captioned = {k: have_photos.get(k, {}) for k in photo_tree}
        problems += [p for p in drift("photos.js", photo_tree, captioned)
                     if not p.strip().startswith("-")]
        if problems:
            print("%d difference(s) between WRITING.txt and the generated files:"
                  % len(problems))
            print("\n".join(problems[:40]))
            if len(problems) > 40:
                print("  ... and %d more" % (len(problems) - 40))
            print("\nrun: python3 tools/build-copy.py")
            return 1
        print("in sync — %d blocks, copy.js and photos.js match the document"
              % len(blocks))
        return 0

    existing_photos = read_js(PHOTOS_JS, "PHOTO_INFO")
    with open(COPY_JS, "w", encoding="utf-8") as f:
        f.write(write_copy(copy_tree))
    with open(PHOTOS_JS, "w", encoding="utf-8") as f:
        f.write(write_photos(existing_photos, photo_tree))

    copy_n = len(flat(copy_tree))
    photo_n = len(flat(photo_tree))
    added = set(existing_photos) - set(photo_tree or {})
    print("wrote content/copy.js      %d blocks" % copy_n)
    print("wrote content/photos.js    %d captions (merged)" % photo_n)
    if added:
        print("  %d photograph(s) in photos.js had no caption in the document "
              "and were kept as they were: %s" % (len(added), ", ".join(sorted(added)[:6])))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
