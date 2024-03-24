/// <reference types='Cypress'/>

describe('Multiple orders and use of DDT and CCs', () => {
    before(() => {
        cy.fixture('ProtoCommereceTestData').then((testData) => {
            globalThis.testData = testData
        })
    })
    it('Adding Multiple orders', () => {
        cy.visit('https://automationteststore.com')
        cy.goToSpecificStore(testData.storeNmae1) // Custom Command to go to Hair care store
        cy.multiOrderC(testData.multiOrder) // Custom command to add multiple orders from store using a 'list' from fixture file.
        cy.get('span.label.label-orange.font14').eq(1).should('contain.text', '3')
    })
})