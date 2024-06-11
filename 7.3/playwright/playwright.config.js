const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: false,
    slowMo: 50,
  },
  timeout: 60000,
  retries: 0,
  reporter: [['list']],
});