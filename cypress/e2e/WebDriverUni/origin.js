/// <reference types='Cypress'/>

describe("Handling the change in domain scenarios", () => {
  /* change in domain usually happens when we click on a web element whcih has a href attribute
    and this contains a redirection link to the another website (domain) then in this case we need
    to handle the testing of new domain in "cy.origin()" method and then we can go back to the previous app (domain)
    and keep continuing our work.
    */
  it("change in domain", () => {
    cy.visit("https://www.google.com"); // workin in google.com
    cy.url().should("contain", "google");
    cy.get('textarea[name="q"]').type("youtube"); // performing some action in the google.com
    cy.origin("https://www.bing.com", () => {
      // cy.origin accepts a callback fun: where we perform our tasks
      cy.visit("/");
      cy.url().should("contain", "bing");
      cy.get('textarea[name="q"]').type("this is bing"); // performing actions in the bing
    });
    cy.visit("https://www.google.com/"); // heading back to the original domain
    cy.url().should("contain", "google");
    cy.get('textarea[name="q"]').type("we are in google again"); // outside of the cy.origin's callback fun: cocdeblock so this will be performed on google.com only
  });
});
// This is useful in scenarios where we need to login (specially in OAuth scenarios) and then again we are redirected back to the original
// application. In case we are not redirected back to the original domain then we need to perfor 'cy.visit()' once again oustside the
// cy.origin's callback fun: code block.
