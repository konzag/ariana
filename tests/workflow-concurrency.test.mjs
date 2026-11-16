// workflow-concurrency.test.mjs — CI-NO-CONCURRENCY (owner 2026-11-15): the CI and Security workflows have no
// `concurrency` key (workflow- or job-level), so a run never waits «pending» behind a cancelled run's group
// (logvault 4e6fa59, 2026-11-14). Every job here runs on GitHub-hosted ubuntu-latest (own VM per job), so the
// Playwright port 4181 cannot clash between two runs. File check only.
// Run: node --test tests/*.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, '.github', 'workflows', name), 'utf8').replace(/\r\n/g, '\n');

for (const name of ['ci.yml', 'security.yml']) {
  test(`${name}: no concurrency key anywhere`, () => {
    assert.doesNotMatch(read(name), /^\s*concurrency\s*:/m);
  });

  test(`${name}: every job on GitHub-hosted ubuntu-latest (no shared runner without concurrency)`, () => {
    const runsOn = [...read(name).matchAll(/^\s*runs-on:\s*(\S+)/gm)].map(m => m[1]);
    assert.ok(runsOn.length > 0, 'no runs-on found');
    assert.deepEqual([...new Set(runsOn)], ['ubuntu-latest']);
  });
}
