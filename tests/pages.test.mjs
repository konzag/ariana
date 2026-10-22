// ============================================================
//  Μικροί έλεγχοι για τις σελίδες (χωρίς τίποτα να εγκαταστήσεις!)
//  Τρέχει με:  node --test tests/
//  Χρησιμοποιεί μόνο ό,τι έχει ήδη μέσα του το Node.js.
// ============================================================
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const PAGES = [
  "index.html",
  "school-game/school.html",
  "katseye-game/katseye.html",
  "geography-game/geography.html",
];

// ---- Αντίθεση χρωμάτων (WCAG): πόσο καλά ξεχωρίζουν τα γράμματα από το φόντο ----
function luminance(hex) {
  const c = [0, 2, 4]
    .map((i) => parseInt(hex.replace("#", "").substr(i, 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

test("κάθε σελίδα έχει lang=el", () => {
  for (const p of PAGES) assert.match(read(p), /<html lang="el">/, p);
});

test("η μπάρα πλοήγησης κυλάει στο κινητό (δεν κόβονται σύνδεσμοι)", () => {
  for (const p of ["assets/styles.css", "school-game/school.html", "katseye-game/katseye.html"]) {
    const nav = read(p).match(/\.nav-bar\s*\{[^}]*\}/)[0];
    assert.match(nav, /overflow-x:\s*auto/, p);
  }
});

test("όλες οι σελίδες σέβονται το prefers-reduced-motion", () => {
  for (const p of ["assets/styles.css", "school-game/school.html", "katseye-game/katseye.html", "geography-game/css/geography.css"]) {
    assert.match(read(p), /prefers-reduced-motion:\s*reduce/, p);
  }
});

test("δεν μένει το σκούρο μοβ #6b21a8 για κείμενο (αντίθεση ~2:1)", () => {
  for (const p of [...PAGES, "assets/styles.css"]) assert.doesNotMatch(read(p), /#6b21a8/i, p);
});

test("τα χρώματα κειμένου που διορθώθηκαν περνούν AA 4.5:1", () => {
  const pairs = [
    ["#a78bfa", "#0f0a1e"], // υποσέλιδο
    ["#c4b5fd", "#1a1040"], // μήνυμα πρόκλησης
    ["#0f0a1e", "#ff4fa3"], // σκούρα γράμματα σε ροζ κουμπί
    ["#0f0a1e", "#a855f7"], // σκούρα γράμματα σε μοβ κουμπί
    ["#ffffff", "#a05f00"], // κουμπί/toast γεωγραφίας
    ["#ffffff", "#1e8449"], // πράσινο "Στο διαβατήριο"
    ["#ffffff", "#c0392b"], // κόκκινο κουμπί σφραγίδας
  ];
  for (const [fg, bg] of pairs) assert.ok(contrast(fg, bg) >= 4.5, `${fg} πάνω σε ${bg}`);
  // Τα σκούρα χρώματα ηπείρων (για κείμενο) πρέπει να διαβάζονται σε άσπρο φόντο
  const js = read("geography-game/js/geography.js");
  const block = js.match(/CONTINENT_TEXT_COLORS = \{([^}]*)\}/)[1];
  const colors = [...block.matchAll(/#[0-9a-f]{6}/gi)].map((m) => m[0]);
  assert.ok(colors.length >= 5);
  for (const c of colors) assert.ok(contrast("#ffffff", c) >= 4.5, c);
});

test("κάθε χρήση του localStorage είναι μέσα σε try", () => {
  for (const p of ["assets/app.js", "geography-game/js/geography.js"]) {
    const lines = read(p).split("\n");
    lines.forEach((line, i) => {
      // Αγνοούμε σχόλια — μας νοιάζει μόνο ο κώδικας που τρέχει
      if (!line.includes("localStorage") || line.trim().startsWith("//")) return;
      const before = lines.slice(Math.max(0, i - 3), i + 1).join("\n");
      assert.match(before, /try\s*\{/, `${p}:${i + 1}`);
    });
  }
});

test("κουμπιά μόνο με emoji έχουν όνομα για αναγνώστες οθόνης", () => {
  assert.match(read("index.html"), /id="soundToggle"[^>]*aria-label=/);
  const k = read("katseye-game/katseye.html");
  assert.match(k, /id="soundBtn"[^>]*aria-label=/);
  for (const id of ["mobUp", "mobDown", "mobLeft", "mobRight"]) {
    assert.match(k, new RegExp(`id="${id}"[^>]*aria-label=`), id);
  }
});

test("η απάντηση του κουίζ ανακοινώνεται (aria-live)", () => {
  assert.match(read("index.html"), /id="feedback"[^>]*aria-live="polite"/);
});

test("katseye: οι κάρτες μελών παίζουν με πληκτρολόγιο και το SPACE δεν μπλοκάρεται εκτός παιχνιδιού", () => {
  const k = read("katseye-game/katseye.html");
  assert.match(k, /card\.setAttribute\("tabindex", "0"\)/);
  assert.match(k, /card\.addEventListener\("keydown"/);
  assert.match(k, /keys\[e\.key\] = true;[\s\S]{0,200}if \(!gameRunning\) return;/);
});

test("katseye: το beat σταματάει και το κομφετί καθαρίζει στο τέλος", () => {
  const k = read("katseye-game/katseye.html");
  const fin = k.match(/function triggerFinalPerformance\(\) \{[\s\S]*?\n  \}/)[0];
  assert.match(fin, /stopBeat\(\)/);
  assert.match(fin, /drawConfetti\(\)/);
  assert.match(k, /if \(!soundEnabled\) stopBeat\(\)/);
});

test("γεωγραφία: οι καρφίτσες του χάρτη δεν κρύβονται από role=img", () => {
  assert.doesNotMatch(read("geography-game/geography.html"), /<svg[^>]*role="img"/);
});

test("γεωγραφία: οι καρτέλες άλμπουμ ενημερώνουν το aria-selected", () => {
  assert.match(read("geography-game/js/geography.js"), /setAttribute\('aria-selected'/);
});

// ---- ARIANA-T1: το όνομα του λογότυπου στη Γεωγραφία περιέχει ό,τι γράφει (WCAG 2.5.3) ----
// Όποιος χρησιμοποιεί φωνητικές εντολές λέει «Passport Explorer της Αριάνας», γιατί αυτό βλέπει.
// Αν το aria-label λέει κάτι άλλο, ο σύνδεσμος δεν βρίσκεται. (Ο ίδιος έλεγχος τρέχει και με axe
// στο tests/ui/axe.spec.ts· αυτός εδώ είναι ο γρήγορος, χωρίς browser.)
test("το λογότυπο της Γεωγραφίας: το aria-label ξεκινά με το κείμενο που φαίνεται", () => {
  const html = read("geography-game/geography.html");
  const brand = html.match(/<a class="brand"[^>]*>[\s\S]*?<\/a>/)[0];
  const label = brand.match(/aria-label="([^"]*)"/)[1];
  // Το ορατό κείμενο: ό,τι μένει αν βγάλουμε τα tags και το διακοσμητικό 🌍.
  const visible = brand
    .replace(/<span class="brand-icon"[^>]*>[\s\S]*?<\/span>/, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  assert.equal(visible, "Passport Explorer της Αριάνας");
  assert.ok(label.startsWith(visible), `aria-label «${label}» πρέπει να ξεκινά με «${visible}»`);
});
