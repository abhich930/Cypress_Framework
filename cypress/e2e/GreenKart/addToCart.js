/// <reference types='Cypress'/>

describe('Cart E2E TC', () => {
    let veggieNmae = 'Beans - 1 Kg';
    it('select a product', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.products .product').each(($item) => {
            cy.wrap($item).find('h4.product-name').then(($result) => {
                let ourVeggie = $result.text()
                if(ourVeggie === veggieNmae) {
                    cy.wrap($item).find('.product-action button').click().then(($buttonName) => {
                        cy.wrap($buttonName).should('contain.text', 'ADDED')
                    })
                }
            })
        })
        cy.wait(1500)
        let rowVal = 0;
        cy.get('.cart .cart-info table tbody tr').each(($row) => {
            cy.wrap($row).find('td:nth-child(3) strong').then(($number) => {
                cy.wrap($number).should('not.have.text', rowVal)
            })
        })
        cy.wait(1000)
        cy.get('.cart .cart-icon img').click()
        cy.get('.cart-preview.active .action-block button').click()
        cy.wait(500)
        cy.get('div button').contains('Place Order').click()
        cy.wait(500)
        cy.get('.wrapperTwo label').should('contain.text', 'Choose Country')
    })
})