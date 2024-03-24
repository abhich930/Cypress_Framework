/// <reference types='Cypress'/>
import atsPOM from "../../support/pom/testauto_store/atsPOM"

describe('Custom Commands for the repetitive tasks', () => {
    const ats = new atsPOM()
    before(() => {
        cy.fixture('ProtoCommereceTestData').then((data) => {
            globalThis.data = data
        })
    })
    beforeEach(() => {
        ats.visitHomePage()
    })
    it.only('Going to Hair store and adding a product', () => {   
        ats.visitSpecificStore(data.storeNmae1)
        cy.selectHairProduct(data.hairProductName) // Custom commands for reuse to execute same actions.
        ats.assertingSelectedProduct(data.hairProductName)
    })
    it('Going to Makeup store and adding a product', () => {
        ats.visitSpecificStore(data.storeNmae)
        cy.selectMakeupProduct(data.makeupProductName) // Custom commands for reuse to execute same actions.
        ats.assertingSelectedProduct(data.makeupProductName)
    })
})