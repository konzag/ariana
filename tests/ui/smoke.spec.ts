// Playwright smoke (GAME-STANDARD §9: the old games get the hub shell only and are not rewritten).
// Every page opens at /ariana/... under the hub's CSP with 0 console errors and shows 🏠 + 🔊 of hub-shell.js;
// the KATSEYE quiz plays to the results with the keyboard only; a geography stamp survives a reload.
import { expect, test, type Page } from '@playwright/test';
import { PAGES, watch } from './helpers';

for (const path of PAGES) {
  test(`every page opens under the hub CSP with 0 console errors: ${path}`, async ({ page }) => {
    const problems = await watch(page);
    const res = await page.goto(`/ariana/${path}`);
    expect(res?.status()).toBe(200);
    expect(res?.headers()['content-security-policy']).toContain("default-src 'none'");
    await expect(page.locator('#hub-shell')).toBeVisible();
    const home = page.getByRole('link', { name: 'Πίσω στα παιχνίδια' });
    await expect(home).toBeVisible();
    await expect(home).toHaveText('🏠');
    await expect(home).toHaveAttribute('href', '/');
    const sound = page.locator('#hub-shell button[aria-label="Ήχος"]');
    await expect(sound).toBeVisible();
    await expect(sound).toHaveText('🔊');
    await page.waitForLoadState('networkidle');
    expect(problems).toEqual([]);
  });
}

/** Presses Tab until the focused element matches `selector` (keyboard only, like a child without a mouse). */
async function tabTo(page: Page, selector: string, max = 60) {
  for (let i = 0; i < max; i++) {
    if (await page.evaluate((s) => !!document.activeElement?.matches(s), selector)) return;
    await page.keyboard.press('Tab');
  }
  throw new Error(`Tab never reached ${selector}`);
}

test('quiz to the results screen by keyboard only', async ({ page }) => {
  const problems = await watch(page);
  await page.goto('/ariana/index.html');
  await tabTo(page, '#member-0');
  await page.keyboard.press('Enter');
  await expect(page.locator('#member-0')).toHaveAttribute('aria-pressed', 'true');
  await tabTo(page, '#startBtn');
  await page.keyboard.press('Enter');
  await expect(page.locator('#quizSection')).toBeVisible();

  for (let q = 1; q <= 7; q++) { // 7 questions (the page shows "N/7")
    await expect(page.locator('#qNumDisplay')).toHaveText(String(q));
    await tabTo(page, '#optionsGrid .option-btn');
    await page.keyboard.press('Enter');
    await expect(page.locator('#nextBtn')).toBeFocused(); // the game moves focus to "next"
    await page.keyboard.press('Enter');
  }
  await expect(page.locator('#resultsSection')).toBeVisible();
  await expect(page.locator('#resultsTitle')).toBeFocused();
  await expect(page.locator('#resultsTitle')).not.toHaveText('');
  expect(problems).toEqual([]);
});

test('geography: visit a country, reload, it is still stamped', async ({ page }) => {
  const problems = await watch(page);
  await page.goto('/ariana/geography-game/geography.html#map');
  const pin = page.locator('.map-pin[data-id="greece"]');
  await expect(pin).toBeVisible();
  await expect(pin.locator('text')).not.toHaveText('✓');
  await pin.click();
  await page.locator('#addStampBtn').click();
  await expect(page.locator('#addStampBtn')).toContainText('Στο διαβατήριο');
  await expect(pin.locator('text')).toHaveText('✓');

  await page.reload();
  await expect(page.locator('.map-pin[data-id="greece"] text')).toHaveText('✓');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('ariana_geography_v2') || 'null'));
  expect(saved.playerVisited[0]).toContain('greece');
  await page.locator('.map-pin[data-id="greece"]').click();
  await expect(page.locator('#addStampBtn')).toContainText('Στο διαβατήριο');
  expect(problems).toEqual([]);
});
