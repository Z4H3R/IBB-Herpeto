import { test, expect } from '@playwright/test';

test('homepage loads and map exists', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/IBB Herpeto/);
  await expect(page.locator('#map')).toBeVisible();
});

