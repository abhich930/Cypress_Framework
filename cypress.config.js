const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  projectId: 'jwmdt7',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js, jsx, ts, tsx, feature}',
    defaultCommandTimeout: 6000,
    pageLoadTimeout: 10000,
    gkURL: `https://${process.env.APP_DOMAIN3}/seleniumPractise/#/`, // Defining the env varibles form '.env' file used lieral decalration `${}` to make it a URL by adding the "https://" and other neccesary parts of the URL
    // because no matter what if we save the URLs in the .env file upon being called in test scrips using 'cy.visit' they will not be recognised as valid URLs.
    // Otherwise we could just use the simple "process.env.APP_DOMAIN1".
    wduniURL: `https://${process.env.APP_DOMAIN2}/`,
    autoURL: `https://${process.env.APP_DOMAIN3}/`,
    screenshotOnRunFailure: false, // Setting to take ss during cypress run command test execution.
    trashAssetsBeforeRuns: true, // Making the Cypress to delete all the data of ss folder befoe executing the new tests via cypress run
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter'
});
