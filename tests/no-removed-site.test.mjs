// ============================================================
//  Ο ιστότοπος με τα παιχνίδια λέξεων («word» + «wall») βγήκε από το repo (owner 16/11, DECISIONS §4).
//  Τρέχει με:  node --test tests/
//  Κανένα αρχείο του repo (σελίδες, scripts, config, tests, docs) δεν τον αναφέρει πια: ούτε σύνδεσμος, ούτε κουμπί,
//  ούτε κλάση CSS. Η λέξη χτίζεται από δύο κομμάτια, για να μη βρίσκει το ίδιο το test.
// ============================================================
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const NEEDLE = ["word", "wall"].join("");
// Φάκελοι που δεν είναι του repo (εγκαταστάσεις, αποτελέσματα από τοπικά τρεξίματα)
const SKIP = new Set([".git", "node_modules", ".venv", "venv", "test-results", "playwright-report", "__pycache__"]);
const TEXT = /\.(html?|m?js|ts|css|json|md|ya?ml|py|txt|sh|svg)$|^[^.]+$|^\.[a-z-]+$/i;

function* files(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else if (TEXT.test(e.name)) yield p;
  }
}

test("no file in the repo names the removed word-game site", () => {
  const hits = [];
  let scanned = 0;
  for (const f of files(ROOT)) {
    scanned++;
    if (readFileSync(f, "utf8").toLowerCase().includes(NEEDLE)) hits.push(relative(ROOT, f));
  }
  assert.ok(scanned > 10, `the scan saw the repo (${scanned} files)`);
  assert.deepEqual(hits, [], `still named in: ${hits.join(", ")}`);
});
