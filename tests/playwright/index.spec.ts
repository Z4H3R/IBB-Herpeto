import { test, expect } from '@playwright/test';

test('homepage loads and map exists', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/IBB Herpeto/);
  await expect(page.locator('#map')).toBeVisible();
});

test('sidebar toggle and search works', async ({ page }) => {
  // ensure menu-toggle is visible by using a narrow viewport (mobile layout)
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');

  const toggle = page.locator('#menu-toggle');
  await expect(toggle).toBeVisible();
  await toggle.click();

  const sidebar = page.locator('#sidebar');
  await expect(sidebar).toBeVisible();

  const search = page.locator('#search');
  await expect(search).toBeVisible();
  await search.fill('1kmE5291N2471');
  await search.press('Enter');

  // expect map to center near the feature centroid for the searched code
  await page.waitForTimeout(500); // allow any pan animation
  const center = await page.evaluate(() => map.getCenter());
  await expect(center.lat).toBeGreaterThan(44.53);
  await expect(center.lat).toBeLessThan(44.74);
  await expect(center.lng).toBeGreaterThan(22.17);
  await expect(center.lng).toBeLessThan(22.38);
});
