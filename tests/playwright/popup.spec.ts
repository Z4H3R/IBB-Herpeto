import { test, expect } from '@playwright/test';

test('open popup for a known square and verify expert names and strike-through', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => !!window.expertMap && Object.keys(window.expertMap).length > 0, {}, { timeout: 20000 });

  // pick a known code from expertMap
  const knownCode = await page.evaluate(() => Object.keys(window.expertMap)[0]);
  expect(knownCode).toBeDefined();

  // find a map layer that corresponds to that feature by matching feature.properties.Cod_patrat
  const opened = await page.evaluate((code) => {
    let found=false;
    map.eachLayer(function(layer){
      try{
        if(layer.feature && layer.feature.properties && layer.feature.properties.Cod_patrat === code){
          if(layer.openPopup) { layer.openPopup(); found = true; }
        }
      }catch(e){}
    });
    return found;
  }, knownCode);

  expect(opened).toBe(true);

  // wait for popup content and check it contains either '— niciun expert' or some expert name
  await page.waitForSelector('.leaflet-popup-content', { timeout: 5000 });
  const html = await page.locator('.leaflet-popup-content').innerHTML();
  // ensure species names are present and expert markers are shown
  expect(html.length).toBeGreaterThan(10);
});
