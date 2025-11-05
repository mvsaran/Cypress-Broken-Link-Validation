const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Prevent automatic screenshot failures from causing a hard timeout
    // and give more time for screenshots if they are enabled manually.
    screenshotOnRunFailure: false,
    screenshotTimeout: 60000,
    pageLoadTimeout: 180000, // Increased page load timeout to 180 seconds
    defaultCommandTimeout: 30000,
    requestTimeout: 30000,
    responseTimeout: 30000,
  },
});
