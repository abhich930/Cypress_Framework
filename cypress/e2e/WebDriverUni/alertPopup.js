/// <reference types='Cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Working with alerts and pop up', () => {
    const home = new HomePage()
    
    before(() => {
        cy.fixture('targets').then((testData) => {
            globalThis.testData = testData
        })
    })

    beforeEach(() => {
        home.VisitHome()
        home.click_on_desired_page(testData.pop_up_alerts)
    })

    it('JS Alerts', () => {
        cy.get('#button1').click()
        /* This is a JS alert having only one button which is positive in nature
        scuh as OK, CONFIRM, APPROVE etc. these types of alerts are auto handled by the Cypress
        and Cypress auto click on the only available button. 
        */
       cy.on('window:alert', (msg) => { // This way we can get the text of the JS alert box
        expect(msg).to.contain('I am') // this is how we can assert the message text.
       })
    })
    it('JS alert with two options', () => {
        cy.get('#button4').click()
        cy.on('window:confirm', () => true)
        cy.get('.section-title p[id="confirm-alert-text"]').then(($message) => {
            expect($message).to.contain('pressed OK')
        })
        /* This is a JS alert having two buttons
        as OK & Cancel. these types of alerts are auto handled by the Cypress
        and Cypress auto click on the positive button. 
        */
    })
    it('Pressing Cancel on JS alert', () => {
        cy.get('#button4').click()
        cy.on('window:confirm', () => false) // as we know that all JS alerts trigger the window:alert event in browsers, so passing flase into this we can click on the Cancel button.
        cy.get('.section-title p[id="confirm-alert-text"]').then(($message) => {
            expect($message).to.contain('Cancel!')
        })
    })
    it('modal pop ups', () => {
        cy.get('#button2').click()
        cy.get('.modal-content').as('modalframe')
        cy.get('.modal-content .modal-body p').then(($bodyTxt) => {
            expect($bodyTxt).to.contain('JavaScript')
        })
        cy.get('.modal-content .modal-footer button').click()
    })
    it('AJAX loader', () => {
        cy.get('#button3').click()
        cy.url().should('contain', 'Ajax')
        cy.get('#button1', {timeout: 10000}).should('be.visible').click() // Giving a timeout to wait for the visibility of the element as AJAX can disturb its loading.
        cy.get('.modal-content .modal-header h4').should('contain.text', 'Well')
        cy.get('.modal-content .modal-footer button').click()
    })
})