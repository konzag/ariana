// axe-core on the 4 pages: serious/critical violations = 0, light + dark, 360 px (phone) and 1280 px (desktop).
// Report only: a violation in the kids' code is not fixed here (GAME-STANDARD §9) but marked
// test.fail('APP BUG ARIANA-T<n>: ...') and listed in D:\Git\.claude\FIX-ARIANA-TESTBUGS-2026-10-22.md.
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { PAGES } from './helpers';

// [page, scheme, width] -> known app bug (the test must fail until the fix run removes the entry).
const T1 =
  'APP BUG ARIANA-T1: geography .brand link aria-label «Passport Explorer αρχική» does not contain its visible text ' +
  '«Passport Explorer της Αριάνας» (axe label-content-name-mismatch, WCAG 2.5.3; at 360 px the <small> is hidden)';
const KNOWN: Record<string, string> = {
  'geography-game/geography.html light 1280': T1,
  'geography-game/geography.html dark 1280': T1,
};

for (const path of PAGES) {
  for (const scheme of ['light', 'dark'] as const) {
    for (const width of [360, 1280]) {
      const id = `${path} ${scheme} ${width}`;
      test(`axe serious/critical = 0: ${id}`, async ({ page }) => {
        if (KNOWN[id]) test.fail(true, KNOWN[id]);
        await page.setViewportSize({ width, height: 800 });
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' });
        await page.goto(`/ariana/${path}`);
        await page.waitForLoadState('networkidle');
        const { violations } = await new AxeBuilder({ page }).analyze();
        const bad = violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => `${v.impact} ${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`);
        expect(bad).toEqual([]);
      });
    }
  }
}
