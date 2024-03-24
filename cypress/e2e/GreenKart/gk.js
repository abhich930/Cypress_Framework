/// <reference types='Cypress'/>

describe('Green Kart Automation', () => {
    it.only('Accessing the input field and typing in it', () => {
        cy.visit(Cypress.config('gkURL'));
        cy.get('.search-form input').type('cucumber');
    })
    it('getting a list of products', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.products-wrapper .products').should('have.length.gte', 1)
    // Assering the length of the products' div tag from DOM.
    })
    // Chaining of cypress commands.
    it('chaining different commands', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.products-wrapper').find('.products').children().eq(1).contains('button', 'ADD TO CART').click()
        .then(($el) => {
        expect($el.text()).to.contain('ADDED')
        })
    })
    // Dynamic selection of an elelment based on text
    it('for loop to select item based on the text', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.products-wrapper .products .product').each(($el) => {
            const veggieName = $el.find('h4.product-name').text();
            if(veggieName.includes('Cucu')) {
                cy.wrap($el).find('button').click();
            }
         })
    })
})