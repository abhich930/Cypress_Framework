/// <reference types='Cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO"

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Working with hidden elements', () => {
    const home = new HomePage()
    before(() => {
        cy.fixture('targets').then((testData) => {
            globalThis.testData = testData
        })
    })

    beforeEach(() => {
        home.VisitHome()
        home.click_on_desired_page(testData.hidden)
    })

    it('Ele which aer not displayed in the UI', () => {
        cy.get('.thumbnail div[id="not-displayed"]').click({force:true}).should('not.be.visible')
        /* The above lement is not displayed, but it is present there and actionable
        this usually happens when elements have CSS propeerty of display:none
        to over come this situation we can simply use the {force:true} to click in such elemets.
        */
    })
    it('Ele which aer not HIDDEN in the UI', () => {
        cy.get('.thumbnail div[id="visibility-hidden"]').invoke('attr', 'style', 'visibility:visible').click().should('be.visible') // Asserting to check if invoke method worked on the css part or not?
        /* The above lement is not displayed, but it is present there and actionable
        this usually happens when elements have CSS propeerty of display:none
        to over come this situation we can simply use the {force:true} to click in such elemets.

        2nd way to work with hidden button/elemnts is to use the
        .invoke('attr', 'style', 'visibility:visible')
        in above command we are invoking the css(style) attribute of the element
        which is 'visibility' to 'visible' and then clickig on it
        in the test runner log window (LHS) it wont be marked as hidden.
        */
    })
    it('Zero opacity button or elements', () => {
        // This is for the cases when elements are actionable but just not have the proper opacity (this is different from visiblity)
        cy.get('#button3').click().should('not.be.visible') // There is no need to use the force method here as the button is clickable from DOM.
    })
})