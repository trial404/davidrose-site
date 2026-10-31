#!/usr/bin/env node
/* ==========================================================================
   STATUS — what is left to do, measured against your targets.
   --------------------------------------------------------------------------
   Run it from the site folder:

       node tools/status.js

   It never changes anything. Edit the targets below as your plan firms up.
   ========================================================================== */

global.window = {};
require("../content/links.js");
require("../content/media.js");
require("../content/photos.js");
require("../content/copy.js");

const L = window.LINKS || {};
const M = window.MEDIA || {};
const P = window.PHOTO_INFO || {};
const C = window.COPY || {};

const TARGET = {
  showcase: 12,          // favourites per series
  prints: 20,            // prints for sale
  collectionMin: 8,      // a collection is a story
  collectionMax: 12
};

const photos = M.photos || [];
const prints = M.prints || [];
const books = M.books || [];
const projects = M.projects || [];

const isPlaceholder = (v) => typeof v === "string" && /^\s*\[.*\]\s*$/.test(v);
const isLiveLink = (v) => typeof v === "string" && v && v !== "#";
const inSet = (set) => photos.filter((p) => (p.sets || []).includes(set));

const bar = (n, target) => {
  const width = 18;
  const filled = Math.min(width, Math.round((n / Math.max(target, 1)) * width));
  return "█".repeat(filled) + "·".repeat(width - filled);
};

const line = (label, n, target) => {
  const pct = target ? Math.round((n / target) * 100) : 0;
  const mark = target && n >= target ? "ok " : "   ";
  console.log(
    `  ${label.padEnd(22)} ${String(n).padStart(3)} / ${String(target || "—").padEnd(3)} ` +
    `${bar(n, target)} ${String(pct).padStart(4)}%  ${mark}`
  );
};

console.log("=".repeat(70));
console.log("CONTENT STATUS");
console.log("=".repeat(70));

/* ---------- photographs ---------- */
console.log("\n  photographs");
line("Landscape showcase", inSet("landscape").length, TARGET.showcase);
line("Artistic showcase", inSet("artistic").length, TARGET.showcase);
line("Print shop", prints.length, TARGET.prints);
console.log(`  ${"Total files".padEnd(22)} ${String(photos.length).padStart(3)}`);

/* ---------- collections ---------- */
console.log("\n  collections" + " ".repeat(11) + `target ${TARGET.collectionMin}–${TARGET.collectionMax} per story`);
const cols = M.collections || [];
if (!cols.length) {
  console.log("  (none yet)");
} else {
  cols.forEach((c) => {
    const n = (c.photos || []).length;
    let flag = "ok";
    if (n < TARGET.collectionMin) flag = `needs ${TARGET.collectionMin - n} more`;
    else if (n > TARGET.collectionMax) flag = `over by ${n - TARGET.collectionMax}`;
    console.log(`  ${String(c.name).padEnd(22)} ${String(n).padStart(3)}   ${flag}`);
  });
}

/* ---------- words ---------- */
console.log("\n  words still missing");
const wordFields = ["location", "date", "description", "title"];
wordFields.forEach((f) => {
  const missing = photos.filter((p) => {
    const info = P[p.id] || {};
    return !info[f] || isPlaceholder(info[f]);
  }).length;
  console.log(`  ${("photographs with no " + f).padEnd(40)} ${missing}`);
});
const printDesc = prints.filter((p) => isPlaceholder(p.description) || !p.description).length;
console.log(`  ${"prints with no description".padEnd(40)} ${printDesc}`);

/* ---------- selling ---------- */
console.log("\n  selling");
const printLive = prints.filter((p) => (p.sizes || []).some((s) => isLiveLink(s.link))).length;
const sizeTotal = prints.reduce((n, p) => n + (p.sizes || []).length, 0);
const sizeLive = prints.reduce((n, p) => n + (p.sizes || []).filter((s) => isLiveLink(s.link)).length, 0);
console.log(`  ${"prints with a payment link".padEnd(40)} ${printLive} / ${prints.length}`);
console.log(`  ${"sizes with a payment link".padEnd(40)} ${sizeLive} / ${sizeTotal}`);
const bookLive = books.filter((b) => isLiveLink(b.link)).length;
console.log(`  ${"ebooks with a Gumroad link".padEnd(40)} ${bookLive} / ${books.length}`);
const projLive = projects.filter((p) => isLiveLink(p.link)).length;
console.log(`  ${"projects with a repo link".padEnd(40)} ${projLive} / ${projects.length}`);

/* ---------- links ---------- */
console.log("\n  links");
console.log(`  ${"email".padEnd(40)} ${isPlaceholder(L.email) || !L.email ? "missing" : "set"}`);
(L.social || []).forEach((s) => {
  console.log(`  ${s.label.padEnd(40)} ${s.url ? "set" : "empty (hidden)"}`);
});

/* ---------- copy ---------- */
const flat = (o, prefix, out) => {
  Object.keys(o).forEach((k) => {
    const v = o[k];
    const key = prefix ? prefix + "." + k : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flat(v, key, out);
    else out[key] = v;
  });
  return out;
};
const copy = flat(C, "", {});
const copyKeys = Object.keys(copy).filter((k) => typeof copy[k] === "string");
const copyPlaceholder = copyKeys.filter((k) => copy[k].includes("["));
console.log("\n  copy");
console.log(`  ${"blocks of copy".padEnd(40)} ${copyKeys.length}`);
console.log(`  ${"blocks still containing [ ]".padEnd(40)} ${copyPlaceholder.length}`);
copyPlaceholder.slice(0, 8).forEach((k) => console.log(`      ${k}`));
if (copyPlaceholder.length > 8) console.log(`      … and ${copyPlaceholder.length - 8} more`);

/* ---------- verdict ---------- */
const gaps = [];
if (inSet("landscape").length < TARGET.showcase) gaps.push(`${TARGET.showcase - inSet("landscape").length} more landscape favourites`);
if (inSet("artistic").length < TARGET.showcase) gaps.push(`${TARGET.showcase - inSet("artistic").length} more artistic favourites`);
if (prints.length < TARGET.prints) gaps.push(`${TARGET.prints - prints.length} more prints`);
if (sizeLive < sizeTotal) gaps.push(`${sizeTotal - sizeLive} payment links`);
if (bookLive < books.length) gaps.push(`${books.length - bookLive} Gumroad links`);

console.log("\n" + "-".repeat(70));
console.log(gaps.length ? "  still to do: " + gaps.join(", ") : "  all targets met");
console.log("");
