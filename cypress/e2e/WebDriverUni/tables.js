/// <reference types='Cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO";

describe("Working with tables in a web page", () => {
  const home = new HomePage(); // Initializing the HomePage class as 'home' on suite level under the 'describe' block.
  /* Now after initialization of the HomePage() class we can use the all methods
  of the HomePage() using 'home' in this test spec file.
  */
  before(() => {
    cy.fixture("targets").then((testData) => {
      // Loading fixtures to use the WDUNI's home page locators.
      globalThis.testData = testData;
    });
  });

  beforeEach(() => {
    home.VisitHome(); // Accessing the 'visitHome' fun: from the POM of Homepage_PO.
    home.click_on_desired_page(testData.table); // Accessing the 'click_on_contact_us' fun: from the POM of Homepage_PO.
  });

  it("tables", () => {
    let firstName = "John";
    let lastName = "Smith";
    cy.get('.thumbnail table[id="t01"] tbody  :nth-child(1)').each(($fname) => {
      const thcolTxt = $fname.text();
      cy.log(thcolTxt);
      if (thcolTxt === firstName) {
        cy.get('.thumbnail table[id="t01"] tbody  tr :nth-child(2)').each(
          ($lname, index) => {
            const nameOfIndiv = $lname.text();
            if (nameOfIndiv === lastName) {
              cy.get('.thumbnail table[id="t01"] tbody  tr :nth-child(2)')
                .eq(index)
                .next()
                .should("contain", "45"); // next jumps to the immediate sibling of the current element is DOM.
              // here, 'index' gives us the index of the element shich satisfy our if condition, i.e., why we are using the same CSS selector as it is
              // used in the parent 'cy.get' of 'each' block.
            }
          }
        );
      }
    });
  });
});
