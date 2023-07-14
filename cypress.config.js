const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  watchForFileChanges:false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      this.screenshotOnRunFailure = true;
    },
    baseUrl: 'https://cake-la-pepe-exchange.vercel.app/'
    
  },
});
