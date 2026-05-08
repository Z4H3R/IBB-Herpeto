import { test, expect } from '@playwright/test';

test('CSV expertMap loads and statusLayer present', async ({ page }) => {
  await page.goto('/');

  // Wait for expertMap to be populated by the page script (timeout 30s)
  await page.waitForFunction(() => (typeof expertMap !== 'undefined') && Object.keys(expertMap).length > 0, {}, { timeout: 30000 });

  const expertMapSize = await page.evaluate(() => Object.keys(expertMap || {}).length);
  expect(expertMapSize).toBeGreaterThan(0);

  // Ensure statusOutlineLayer exists and has at least one feature (outlines)
  await page.waitForFunction(() => (typeof statusOutlineLayer !== 'undefined') && typeof statusOutlineLayer.getLayers === 'function' && statusOutlineLayer.getLayers().length > 0, {}, { timeout: 30000 });
  const layersCount = await page.evaluate(() => statusOutlineLayer.getLayers().length);
  expect(layersCount).toBeGreaterThan(0);

  // Ensure expertMap has at least one entry and that its values are objects mapping species -> expert
  const firstKey = await page.evaluate(() => Object.keys(expertMap || {})[0]);
  expect(firstKey).toBeDefined();
  const sampleValueType = await page.evaluate((k) => typeof (expertMap[k] || null), firstKey);
  expect(sampleValueType).toBe('object');
});
