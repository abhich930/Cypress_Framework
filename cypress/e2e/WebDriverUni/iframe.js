/// <reference types='Cypress'/>
/// <reference types="cypress-iframe" />
import "cypress-iframe";
import HomePage from "../../support/pom/wduni/Homepage_PO";

describe("Working iframes", () => {
  const home = new HomePage();
  before(() => {
    cy.fixture("targets").then((testData) => {
      globalThis.testData = testData;
    });
  });

  beforeEach(() => {
    home.VisitHome();
    home.click_on_desired_page(testData.iframe);
  });

  it("handling iframe using the 'then()' method", () => {
    // Always fetch iframes using the id.
    cy.get("#frame").then(($iframeContents) => {
      const frameContents = $iframeContents.contents().find("body"); // here we are fetching the iframe's body contents uisng jQuery on $iframeContents elements
      // then we are finding the HTML tag <body> from the iframes's cotent and storing all of it in the frameContents variable.
      cy.wrap(frameContents).as("iframeBody"); // wrapping the variable frameContents to perform cypress actions on it. Also aliasing it to use it again and agian.
      cy.get("@iframeBody").find("#button-find-out-more").click();
      cy.get("@iframeBody").find(".modal-content").as("modalContent");
      cy.get("@modalContent")
        .find(".modal-body")
        .then(($text) => {
          const textOfBody = $text.text();
          expect(textOfBody).to.include("webdriveruniversity.com");
        });
      cy.get("@modalContent").contains("Close").click();
      cy.get("@modalContent").should("not.be.visible");
    }); // this is the then code block to perform actions of the iframe.
  });
  // Using the 'cypress-iframe' lib to automate the iframe
  it("via cypress-iframe", () => {
    cy.frameLoaded("#frame"); // Getting hold of the iframe
    cy.iframe().find("#button-find-out-more").click(); // now we are inside the iframe and we are able to use the '.find()' on the iframe body to interact with other elements
    cy.iframe()
      .find(".modal-content")
      .contains("p")
      .then(($text) => {
        const textOfBody = $text.text();
        expect(textOfBody).to.include("webdriveruniversity.com");
      });
    cy.iframe().find(".modal-content").contains("Close").click();
    cy.iframe().find(".modal-content").should("not.be.visible");
  });
});
