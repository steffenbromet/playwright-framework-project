import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html']],

  expect: {
    timeout: 5000,
  },

  use: {
    headless: true,
    baseURL: 'https://dummyjson.com',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
    },

    {
      name: 'chromium',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
