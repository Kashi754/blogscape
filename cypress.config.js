const { default: axios } = require('axios');
const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const { pa11y } = require('@cypress-audit/pa11y');

module.exports = defineConfig({
  projectId: '55str4',
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      }),
        on('task', {
          lighthouse: lighthouse(),
          pa11y: pa11y(console.log.bind(console)),
        });
      on('after:run', async (results) => {
        if (results) {
          console.log(
            results.totalPassed,
            'out of',
            results.totalTests,
            'passed.'
          );
          results.totalFailed > 0 &&
            console.warn(
              results.totalFailed,
              'out of',
              results.totalTests,
              'failed.'
            );

          // reset db
          await axios.post('http://localhost:5000/api/v1/reset');
        }
      });
    },
  },
});
