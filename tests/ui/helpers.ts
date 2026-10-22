// Shared by smoke.spec.ts and axe.spec.ts.
import type { Page } from '@playwright/test';

export const PAGES = [
  'index.html',
  'katseye-game/katseye.html',
  'school-game/school.html',
  'geography-game/geography.html',
];

/** Collects everything that must stay empty: console errors, page errors, CSP violations. */
export async function watch(page: Page) {
  const problems: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(`console: ${m.text()} ${m.location().url || ''}`.trim());
  });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) => {
      console.error(`CSP violation: ${e.violatedDirective} ${e.blockedURI}`);
    });
  });
  return problems;
}
