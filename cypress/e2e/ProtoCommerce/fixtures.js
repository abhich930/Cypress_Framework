/// <reference types='Cypress'/>

describe('Testing E2E an Angular Based App', () => {
    before(() => {
        // All the data should be called using the before hook
        //so it gets loaded before execution of any test and can be utilized by all the child it(TCs) blocks.
        cy.fixture('ProtoCommereceTestData').then(function(testData) {
            globalThis.testData = testData;
        })
    })
    it('E2E', () => {
        cy.visit('https://rahulshettyacademy.com/angularpractice')
        cy.get('.form-group input[name="name"]').type(testData.name)
        cy.get('.form-group input[name="email"]').type(testData.email)
        cy.get('.form-group input[type="password"]').type(testData.pwd)
    })
})