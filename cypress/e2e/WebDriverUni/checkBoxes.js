/// <reference types='Cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO";

describe('Checkboxes Handling', () => {
    const home = new HomePage()
    
    before(() => {
        cy.fixture('targets').then((testData) => {
            globalThis.testData = testData
        })
    })

    beforeEach(() => {
        home.visit()
        home.click_on_desired_page(testData.drodpdown)
    })

    it('checking a desired checkbox', () => {
        let cbValue = "option-2";
        cy.wait(500)
        cy.get('#checkboxes label input').each(($checkBox) => {
            if($checkBox.attr('value') === cbValue) {
                cy.wrap($checkBox).check().should('be.checked')
            }
        })
    })
    it('unchecking an already checked checkbox', () => {
        cy.wait(500)
        cy.get('#checkboxes label input').each(($cbox) => {
            if ($cbox.is(':checked')) {
                cy.wrap($cbox).uncheck().should('not.be.checked')
            }
        })
    })
    // Radio buttons
    it('Working in radio buttons', () => {
        cy.get('form[id="radio-buttons"] input[value="blue"]').as('radioform').check().should('be.checked') // checking radio button based on text.
    })
})