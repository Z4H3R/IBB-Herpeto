import { test, expect } from '@playwright/test';

test('debug expertMap content and toggle', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => !!window.expertMap && Object.keys(window.expertMap).length > 0, {}, { timeout: 30000 });

  const firstKey = await page.evaluate(() => Object.keys(window.expertMap || {})[0]);
  console.log('firstKey', firstKey);
  const mapping = await page.evaluate((k) => window.expertMap[k] || {}, firstKey);
  console.log('mapping', JSON.stringify(mapping));

  // assert mapping has at least one species key
  const speciesKeys = Object.keys(mapping || {});
  expect(speciesKeys.length).toBeGreaterThan(0);

  // at least one species should have a non-empty expert value OR explicitly be empty string
  const hasNonEmpty = speciesKeys.some(s => (mapping[s] || '').trim().length > 0);
  console.log('hasNonEmpty', hasNonEmpty);
  expect(hasNonEmpty).toBe(true);

  // Wait for activeAllocationColumn to be set
  await page.waitForFunction(() => !!window.activeAllocationColumn, {}, { timeout: 10000 });

  // Check that allocation radio buttons exist and first one is checked
  const radio2026_1 = page.locator('#alloc-2026-1');
  await expect(radio2026_1).toBeVisible();
  
  // Verify activeAllocationColumn is set
  const activeColumn = await page.evaluate(() => window.activeAllocationColumn);
  console.log('activeColumn', activeColumn);
  expect(activeColumn).toBe('2026-1');

  // Toggle to a different allocation column
  const radio2026_2 = page.locator('#alloc-2026-2');
  await radio2026_2.check();
  
  // Verify column changed
  const newActiveColumn = await page.evaluate(() => window.activeAllocationColumn);
  console.log('newActiveColumn', newActiveColumn);
  expect(newActiveColumn).toBe('2026-2');

  // Verify radio is checked
  const isChecked = await radio2026_2.isChecked();
  expect(isChecked).toBe(true);
});
