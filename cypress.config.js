const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '55str4',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
