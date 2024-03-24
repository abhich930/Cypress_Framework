/// <reference types='Cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO";

describe("Performing various mouse actions", () => {
  const home = new HomePage();
  before(() => {
    cy.fixture("targets").then((testData) => {
      globalThis.testData = testData;
    });
  });

  beforeEach(() => {
    home.VisitHome();
    home.click_on_desired_page(testData.action);
  });

  it("hover action", () => {
    cy.get(".dropbtn")
      .contains("Hover Over Me Second!")
      .next()
      .invoke("show")
      .click();
    cy.on("window:alert", ($msg) => {
      expect($msg).to.contain("click");
    });
  });
});
