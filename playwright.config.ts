import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/playwright',
  timeout: 30_000,
  use: {
    headless: true,
    baseURL: 'http://localhost:8000',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npx http-server -p 8000',
    port: 8000,
    reuseExistingServer: !process.env.CI,
  },
});
