// ============================================================
//  Σχολικά Παιχνίδια (school-game/school.html), σχολική χρονιά 2026-27 (L1-37)
//  Τρέχει με:  node --test tests/
//   1. Η Αριάνα πάει στη Δ' Δημοτικού: αυτή η καρτέλα είναι ανοιχτή στην αρχή και έχει το ⭐,
//      και οι σύνδεσμοί της πάνε στο υλικό της Δ' (stintaxi.com και wordwall.net).
//   2. Οι γραμματοσειρές είναι μέσα στο repo (school-game/fonts/*.woff2 + OFL.txt):
//      η σελίδα δεν ζητά κανένα .css ή γραμματοσειρά από αλλού.
//  (Ότι κάθε σύνδεσμος απαντά το ελέγχει το tools/check-links.mjs, στο CI job «links».)
// ============================================================
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PAGE = "school-game/school.html";
const html = readFileSync(join(ROOT, PAGE), "utf8");

// Η τάξη της χρονιάς 2026-27 (επιβεβαίωση από τον μπαμπά, L5-05)
const CLASS = { tab: "delta", label: "Δ'" };
const LINKS = [
  "https://www.stintaxi.com/delta-tau940xieta.html",
  "https://wordwall.net/el-gr/community/%CE%B4-%CE%B4%CE%B7%CE%BC%CE%BF%CF%84%CE%B9%CE%BA%CE%BF%CF%85",
];

const tabButtons = [...html.matchAll(/<button\b[^>]*class="tab-btn[^"]*"[^>]*>[\s\S]*?<\/button>/g)].map((m) => m[0]);
const isActive = (tag) => /class="[^"]*\bactive\b/.test(tag);

test("2026-27: only the Δ' tab is active, pressed and starred", () => {
  assert.equal(tabButtons.length, 6, "six class tabs (Α' to ΣΤ')");
  const active = tabButtons.filter(isActive);
  assert.equal(active.length, 1, "exactly one active tab");
  assert.match(active[0], new RegExp(`data-tab="${CLASS.tab}"`));
  assert.match(active[0], /aria-pressed="true"/);
  assert.match(active[0], />\s*Δ' ⭐\s*</);
  for (const b of tabButtons.filter((t) => !isActive(t))) {
    assert.match(b, /aria-pressed="false"/, b);
    assert.doesNotMatch(b, /⭐/, `only the class of this year has the star: ${b}`);
  }
});

test("2026-27: the Δ' panel is the one shown first", () => {
  const panels = [...html.matchAll(/<div class="tab-content([^"]*)" id="tab-content-([a-z]+)"/g)];
  assert.equal(panels.length, 6);
  const shown = panels.filter((m) => /\bactive\b/.test(m[1])).map((m) => m[2]);
  assert.deepEqual(shown, [CLASS.tab]);
});

test("2026-27: the greeting names Δ' Δημοτικού and the school year", () => {
  const subtitle = html.match(/<p class="subtitle">([\s\S]*?)<\/p>/)[1];
  assert.match(subtitle, /Δ' Δημοτικού/);
  assert.match(subtitle, /2026-27/);
  assert.doesNotMatch(subtitle, /Β'/);
});

test("the Δ' panel links to the Δ' material on stintaxi and wordwall", () => {
  const panel = html.match(new RegExp(`id="tab-content-${CLASS.tab}"[\\s\\S]*?(?=<!-- ===== )`))[0];
  const hrefs = [...panel.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(hrefs, LINKS);
  assert.match(panel, /Δ' Τάξη/);
  assert.match(panel, /Παιχνίδια Δ' Δημοτικού/);
});

test("no external stylesheet or font: only the repo's own fonts/comfortaa.css", () => {
  assert.doesNotMatch(html, /fonts\.googleapis|fonts\.gstatic|\/\/[^"')\s]*\.(css|woff2?|ttf|otf)\b/i);
  for (const tag of html.match(/<link\b[^>]*>/g) || []) {
    assert.doesNotMatch(tag, /rel="?stylesheet/i, `no <link rel=stylesheet>: ${tag}`);
  }
  const imports = [...html.matchAll(/@import\s+url\(\s*['"]?([^'")]+)/g)].map((m) => m[1]);
  assert.deepEqual(imports, ["fonts/comfortaa.css"], "one relative @import, from this repo");
});

test("the font files sit next to the page, with their OFL licence", () => {
  const css = readFileSync(join(ROOT, "school-game/fonts/comfortaa.css"), "utf8");
  const urls = [...css.matchAll(/url\(\s*['"]?([^'")]+)/g)].map((m) => m[1]);
  assert.ok(urls.length >= 2, "at least the Greek and the Latin file");
  for (const u of urls) {
    assert.doesNotMatch(u, /^(https?:)?\/\//, `local file, not ${u}`);
    assert.match(u, /\.woff2$/);
    assert.ok(existsSync(join(ROOT, "school-game/fonts", u)), `school-game/fonts/${u} exists`);
  }
  assert.match(css, /unicode-range:\s*U\+0370/, "the Greek subset is there (the page is in Greek)");
  const ofl = readFileSync(join(ROOT, "school-game/fonts/OFL.txt"), "utf8");
  assert.match(ofl, /SIL OPEN FONT LICENSE Version 1\.1/i);
  assert.match(ofl, /Comfortaa/);
});
