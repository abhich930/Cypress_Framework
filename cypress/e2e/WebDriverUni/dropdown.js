/// <reference types='Cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO"

describe('Working on dropdowns both static and dynamic', () => {
    const home = new HomePage()

    before(() => {
        cy.fixture('targets').then((testData) => {
            globalThis.testData = testData
        })
    })

    beforeEach(() => {
        home.VisitHome()
        home.click_on_desired_page(testData.drodpdown)
    })

    it('static dropdown', () => {
        // In Cypress we can select elements based on the 'value' attribute or text or the index of the
        // <option> html tag.
        cy.get('#dropdowm-menu-1').select('c#').should('have.value', 'c#') // based on value attribute.
        cy.get('#dropdowm-menu-1').select('SQL').should('have.value', 'sql') // based on text of option.
        cy.get('#dropdowm-menu-1').select(2).should('have.value', 'python') // based on index number of the option.
    })
    it('selecting option based on the user defined value', () => {
        let userDefinedValue = 3;
        // In Cypress we can select elements based on the 'value' attribute or text or the index of the
        // <option> html tag.
        cy.get('#dropdowm-menu-2').select(userDefinedValue) // based on value att
    })
    it('traversing in the dropdown then selecting desired value', () => {
        let traverseValue = 'CSS';
        // In Cypress we can select elements based on the 'value' attribute or text or the index of the
        // <option> html tag.
        cy.get('#dropdowm-menu-3 option').each(($option) => {
            if($option.text() === traverseValue) {
                cy.get('#dropdowm-menu-3').select(traverseValue).should('contain.text', traverseValue)
                return false;
            }
        })
    })
})