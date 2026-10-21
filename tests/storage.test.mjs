// storage.test.mjs — η πρόοδος της Αριάνας δεν πρέπει να χαθεί ποτέ.
// Run: node --test tests/*.test.mjs
//   1. Γεωγραφία: μια παλιά αποθήκευση (v2 με timeline) φορτώνει και κρατά τις χώρες που επισκέφτηκε.
//   2. Γεωγραφία: χαλασμένη / άδεια / κλειδωμένη αποθήκευση δίνει τις αρχικές ρυθμίσεις, χωρίς σφάλμα.
//   3. Τα κλειδιά του localStorage μένουν ίδια (αλλαγή ονόματος = σβήνεται η πρόοδος των παιδιών).
//   4. Το ρεκόρ του κουίζ μόνο ανεβαίνει, τα σκουπίδια διαβάζονται ως 0, ο μηδενισμός το σβήνει.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPage, evalIn, servedFiles } from './helpers/fake-dom.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEO = 'geography-game/geography.html';
const GEO_KEY = 'ariana_geography_v2';
const BEST_KEY = 'ariana_best_score';

// The page's objects live in another vm realm: compare them as plain JSON.
const plain = (win, expr) => JSON.parse(JSON.stringify(evalIn(win, expr)));

// A localStorage whose getItem and/or setItem throw (private mode, storage disabled, quota full).
function brokenStorage({ get = false, set = false } = {}) {
  const map = new Map();
  return {
    getItem(k) { if (get) throw new Error('SecurityError'); return map.has(k) ? map.get(k) : null; },
    setItem(k, v) { if (set) throw new Error('QuotaExceededError'); map.set(k, String(v)); },
    removeItem(k) { map.delete(k); },
    clear() { map.clear(); },
    key: (i) => [...map.keys()][i] ?? null,
    get length() { return map.size; },
  };
}

// The sound checkbox of the settings page: a real child action that saves the state.
function toggleGeographySound(p, on) {
  const box = p.document.getElementById('soundToggle');
  box.checked = on;
  box.dispatch('change');
}

test('geography: a v2 save with timeline and partial settings loads and keeps the visits', () => {
  const first = loadPage(root, GEO, { storage: {} });
  const firstId = evalIn(first.window, 'COUNTRIES[0].id');
  const defaults = plain(first.window, 'DEFAULT_STATE');

  const saved = JSON.stringify({ playerVisited: [[firstId], []], timeline: [1], settings: { sound: false } });
  const p = loadPage(root, GEO, { storage: { [GEO_KEY]: saved } });
  const state = plain(p.window, 'state');

  assert.deepEqual(state.playerVisited, [[firstId], []], 'the visit is kept');
  assert.ok(!('timeline' in state), 'the legacy timeline is dropped');
  assert.deepEqual(state.settings, { ...defaults.settings, sound: false }, 'settings = defaults + saved');
  assert.equal(evalIn(p.window, `isVisited(${JSON.stringify(firstId)})`), true);
  assert.equal(state.currentPlayer, defaults.currentPlayer, 'missing fields come from the defaults');
  assert.deepEqual(state.completedMissions, defaults.completedMissions);

  toggleGeographySound(p, true); // saves
  const stored = JSON.parse(p.window.localStorage.getItem(GEO_KEY));
  assert.deepEqual(stored.playerVisited, [[firstId], []], 'the saved JSON still holds the visit');
  assert.equal(stored.settings.sound, true);
  assert.ok(!('timeline' in stored));
});

test('geography: corrupt, null or throwing storage gives the defaults and never throws', () => {
  const cases = [
    ['corrupt JSON', { [GEO_KEY]: '{bad' }],
    ['the text null', { [GEO_KEY]: 'null' }],
    ['getItem throws', brokenStorage({ get: true })],
    ['setItem throws', brokenStorage({ set: true })],
  ];
  for (const [name, storage] of cases) {
    let p;
    assert.doesNotThrow(() => { p = loadPage(root, GEO, { storage }); }, `${name}: page loads`);
    assert.deepEqual(plain(p.window, 'state'), plain(p.window, 'DEFAULT_STATE'), `${name}: state = DEFAULT_STATE`);
    assert.doesNotThrow(() => evalIn(p.window, 'saveState()'), `${name}: saveState`);
    assert.doesNotThrow(() => toggleGeographySound(p, false), `${name}: a saving click`);
    assert.equal(evalIn(p.window, 'state.settings.sound'), false, `${name}: the game keeps going`);
  }
});

test('storage keys are frozen', () => {
  const files = servedFiles(root);
  const keys = new Set();
  const consts = {};
  for (const f of files) {
    const text = fs.readFileSync(path.join(root, f), 'utf8');
    // Every storage call must go through a named key constant, so no key hides in a literal.
    for (const m of text.matchAll(/localStorage\s*\.\s*(getItem|setItem|removeItem)\s*\(\s*([^,)]+)/g)) {
      const arg = m[2].trim();
      assert.match(arg, /^[A-Z_]*KEY$/, `${f}: localStorage.${m[1]}(${arg}) uses a key constant`);
    }
    assert.doesNotMatch(text, /localStorage\s*\[|localStorage\s*\.\s*(?!getItem|setItem|removeItem)\w+\s*=/, `${f}: no other storage access`);
    for (const m of text.matchAll(/(?:const|var|let)\s+([A-Z_]*KEY)\s*=\s*([^;\n]+)/g)) {
      consts[`${f}:${m[1]}`] = m[2].trim();
      const lit = m[2].trim().match(/^(['"])([^'"]+)\1$/);
      if (lit) keys.add(lit[2]);
    }
  }
  // hub-shell.js: KEY = 'game.' + <data-game of the page> + '.sound'
  assert.equal(consts['assets/hub-shell.js:KEY'], "'game.' + game + '.sound'");
  for (const page of files.filter((f) => f.endsWith('.html'))) {
    const games = [...fs.readFileSync(path.join(root, page), 'utf8').matchAll(/data-game="([^"]*)"/g)].map((m) => m[1]);
    assert.deepEqual(games, ['ariana'], `${page}: data-game="ariana"`);
    keys.add(`game.${games[0]}.sound`);
  }
  assert.deepEqual([...keys].sort(), ['ariana_best_score', 'ariana_geography_v2', 'game.ariana.sound']);
});

// Plays the whole KATSEYE quiz with `right` correct answers (10 stars each), up to the results screen.
function playQuiz(p, right) {
  const d = p.document;
  d.getElementById('member-0').onclick();
  d.getElementById('startBtn').click();
  const questions = evalIn(p.window, 'QUESTIONS');
  questions.forEach((q, i) => {
    const pick = i < right ? q.ans : (q.ans + 1) % q.opts.length;
    d.getElementById('optionsGrid').children[pick].onclick();
    d.getElementById('nextBtn').click();
  });
  assert.ok(d.getElementById('resultsSection').classList.contains('show'), 'results screen');
  assert.equal(Number(d.getElementById('scoreDisplay').textContent), right * 10);
}

test('best score only goes up, garbage reads as 0, reset clears it', () => {
  const p = loadPage(root, 'index.html', { storage: {} });
  const d = p.document;
  const best = () => p.window.localStorage.getItem(BEST_KEY);
  assert.equal(Number(d.getElementById('bestScoreDisplay').textContent), 0);

  playQuiz(p, 5);
  assert.equal(best(), '50', 'first game sets the record');
  assert.ok(d.getElementById('newRecordBanner').classList.contains('show'));
  d.getElementById('playAgainBtn').click();
  playQuiz(p, 3);
  assert.equal(best(), '50', 'a lower score does not overwrite the record');
  assert.ok(!d.getElementById('newRecordBanner').classList.contains('show'));
  assert.equal(Number(d.getElementById('bestScoreDisplay').textContent), 50);

  const again = loadPage(root, 'index.html', { storage: { [BEST_KEY]: '50' } });
  assert.equal(Number(again.document.getElementById('bestScoreDisplay').textContent), 50, 'record survives a reload');

  const garbage = loadPage(root, 'index.html', { storage: { [BEST_KEY]: 'abc' } });
  assert.equal(Number(garbage.document.getElementById('bestScoreDisplay').textContent), 0, "'abc' reads as 0");
  playQuiz(garbage, 3);
  assert.equal(garbage.window.localStorage.getItem(BEST_KEY), '30', 'any real score beats garbage');

  d.getElementById('resetRecordBtn').click();
  assert.equal(best(), null, 'reset removes the key');
  assert.equal(Number(d.getElementById('bestScoreDisplay').textContent), 0);
});
