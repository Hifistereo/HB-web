// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// Local runs can point at a preinstalled Chromium (CHROMIUM_PATH); CI uses `playwright install`.
const launchOptions = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};

module.exports = defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: { baseURL: 'http://127.0.0.1:4173', launchOptions, serviceWorkers: 'block' },
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4173/index.html',
    reuseExistingServer: !process.env.CI
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'], launchOptions } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, launchOptions } }
  ]
});
