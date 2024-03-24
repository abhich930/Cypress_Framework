/// <reference types="Cypress"/>
import HomePage from "../../support/pom/wduni/Homepage_PO";

describe("Test Suite using mix of two demo sites", () => {
  const home = new HomePage();
  before(() => {
    cy.fixture("targets").then((testData) => {
      globalThis.testData = testData;
    });
  });

  it.only("visit the site webdriveruni", () => {
    home.VisitHome();
    cy.url().should("contain", "driver"); // Asserting if we hav we the correct URL?
  });

  it("verifying the href tag for multiple window case", () => {
    home.VisitHome();
    cy.get("#login-portal")
      .should("have.attr", "href")
      .and("contain", "Login-Portal");
    /* To handle the multiple or child windows
        in Cypress is just can simply verify the href tag of the HTML tag
        which causes the new window opening and then verify the URL itself.
        OR we can follow the below approach (new it block).
        */
  });

  it("clicking on text field and typig init", () => {
    home.VisitHome();
    home.click_on_desired_page(testData.login);
    // Using invoke method (saved in csutom command) to remove an HTML tag's attribute.
    // Earlier it was having a an attribute of target which was causing the two cypress window of test runner.
  });
});
