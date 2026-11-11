// school-game/school.html in a real browser, under the hub CSP (L1-37, L4-29): the first tab (Α') is open first
// and no tab has a star (no child's class on the page), and the page asks nothing from another host:
// no stylesheet or font from outside, the Comfortaa files come from school-game/fonts/ in this repo.
import { expect, test } from '@playwright/test';
import { watch } from './helpers';

test('school: the first tab (Α\') is open first, no star, fonts are local, 0 requests to another host', async ({ page, baseURL }) => {
  const problems = await watch(page);
  const origin = new URL(baseURL!).origin;
  const foreign: string[] = [];
  const fonts: { url: string; status: number }[] = [];
  page.on('request', (r) => {
    if (new URL(r.url()).origin !== origin && !r.url().startsWith('data:')) foreign.push(`${r.resourceType()} ${r.url()}`);
  });
  page.on('response', (r) => {
    if (r.request().resourceType() === 'font') fonts.push({ url: new URL(r.url()).pathname, status: r.status() });
  });

  await page.goto('/ariana/school-game/school.html');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');

  const tab = page.locator('.tab-btn.active');
  await expect(tab).toHaveCount(1);
  await expect(tab).toHaveText("Α'");
  await expect(tab).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#tab-content-alpha')).toBeVisible();
  await expect(page.locator('#tab-content-delta')).toBeHidden();
  await expect(page.locator('.tab-btn', { hasText: '⭐' })).toHaveCount(0);
  await expect(page.locator('.subtitle')).not.toContainText('Δημοτικού');
  // a click still switches the class: the picker stays
  await page.locator('.tab-btn[data-tab="delta"]').click();
  await expect(page.locator('#tab-content-delta')).toBeVisible();
  await expect(page.locator('.tab-btn[data-tab="delta"]')).toHaveAttribute('aria-pressed', 'true');

  expect(foreign).toEqual([]);
  expect(fonts.length).toBeGreaterThan(0);
  for (const f of fonts) {
    expect(f.url).toMatch(/^\/ariana\/school-game\/fonts\/comfortaa-[a-z]+-\d+-normal\.woff2$/);
    expect(f.status).toBe(200);
  }
  expect(await page.evaluate(() => document.fonts.check('700 16px Comfortaa', 'Αριάνα'))).toBe(true);
  expect(problems).toEqual([]);
});
