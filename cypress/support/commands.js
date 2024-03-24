// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('selectMakeupProduct', (makeupproductName) => {
    cy.get('.fixed a[href*="https://automationteststore.com/index.php?rt=product/product&path=36"]').each(($link) => {
        if($link.text().includes(makeupproductName)) {
            cy.wrap($link).click()
        }
    })
})

Cypress.Commands.add('selectHairProduct', (hairproductName) => {
    cy.get('.fixed a[href*="https://automationteststore.com/index.php?rt=product/product&path=52"]').each(($link) => {
        if($link.text().includes(hairproductName)) {
            cy.wrap($link).click()
        }
    })
})

Cypress.Commands.add('goToSpecificStore', (storeName) => {
    cy.get('a[href*="product/category&path="]').contains(storeName).click({force:true})
})

Cypress.Commands.add('formFill', (fname, lname, email, message) => {
    cy.get('input[name="first_name"]').type(fname)
    cy.get('input[name="last_name"]').type(lname)
    cy.get('input[name="email"]').type(email)
    cy.get('textarea[name="message"]').type(message)
    cy.get('[type=submit]').click()
})

Cypress.Commands.add('multiOrderC', (products) => {
    products.forEach((item) => {
        cy.get('.fixed_wrapper .prdocutname').each(($hairProduct, index) => {
            if($hairProduct.text() === item) {
                cy.get('.productcart').eq(index).click()
            }
        })
    })
/* This command accepts one param and that parma must be a list.
then we are iterating over the each element of that list using 'forEach loop (JS concept)'.
then sparsing items from iteration to the 'if' condition
*/
})

Cypress.Commands.add('wduniDesiredPage', (target) => {
    cy.get(target).invoke("removeAttr", "target").click();
})