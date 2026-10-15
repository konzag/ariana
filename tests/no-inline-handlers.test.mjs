// no-inline-handlers.test.mjs — CSP guard + the main buttons still work.
// Run: node --test tests/*.test.mjs
//   1. No served file has an inline event handler (onclick="…" etc.): the games hub can drop 'unsafe-hashes'.
//   2. Each page runs in a fake browser and each main button calls its game function.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadPage, spyOn, servedFiles, findInlineHandlers } from './helpers/fake-dom.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('no inline event-handler attributes in served files', () => {
  const files = servedFiles(root);
  for (const page of ['index.html', 'katseye-game/katseye.html', 'school-game/school.html', 'assets/app.js']) {
    assert.ok(files.includes(page), `${page} is checked`);
  }
  assert.deepEqual(findInlineHandlers(root), []);
});

// [page, button id, game function]
const BUTTONS = [
  ['index.html', 'startBtn', 'startGame'],
  ['index.html', 'nextBtn', 'nextQuestion'],
  ['index.html', 'playAgainBtn', 'resetGame'],
  ['index.html', 'resetRecordBtn', 'clearBestScore'],
  ['katseye-game/katseye.html', 'startBtn', 'startGame'],
  ['katseye-game/katseye.html', 'soundBtn', 'toggleSound'],
  ['katseye-game/katseye.html', 'playAgainBtn', 'resetGame'],
  ['katseye-game/katseye.html', 'otherMemberBtn', 'goSelect'],
];

test('main buttons call the game functions', () => {
  for (const [page, id, fn] of BUTTONS) {
    const p = loadPage(root, page);
    const calls = spyOn(p.window, fn);
    const btn = p.document.getElementById(id);
    btn.disabled = false; // the start button is enabled after a member is picked
    btn.click();
    assert.deepEqual(calls, [[]], `${page}: #${id} -> ${fn}()`);
  }
});

test('school tabs switch to the right class', () => {
  const p = loadPage(root, 'school-game/school.html');
  const calls = spyOn(p.window, 'showTab');
  const tabs = p.document.querySelectorAll('.tab-btn');
  assert.equal(tabs.length, 6);
  for (const t of tabs) t.click();
  assert.deepEqual(calls, [['alpha'], ['beta'], ['gamma'], ['delta'], ['epsilon'], ['st']]);
});

test('school tab really shows its content and marks the button', () => {
  const { document: d } = loadPage(root, 'school-game/school.html');
  const tabs = d.querySelectorAll('.tab-btn');
  tabs[0].click();
  assert.ok(d.getElementById('tab-content-alpha').classList.contains('active'));
  assert.ok(!d.getElementById('tab-content-beta').classList.contains('active'));
  assert.equal(tabs[0].getAttribute('aria-pressed'), 'true');
  assert.equal(tabs[1].getAttribute('aria-pressed'), 'false');
});

test('katseye sound button really toggles the sound icon', () => {
  const { document: d } = loadPage(root, 'katseye-game/katseye.html');
  const btn = d.getElementById('soundBtn');
  btn.click();
  assert.equal(btn.textContent, '🔇');
  btn.click();
  assert.equal(btn.textContent, '🔊');
});
