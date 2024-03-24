/// <reference types='cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO"

describe('Fixtures Usage', () => {
    const home = new HomePage()
    before(() => {
        cy.fixture('asAliases').as('testData') // Load the json file as an alias
        cy.fixture('targets').then((testData) => {
            globalThis.testData = testData
        })
    })

    beforeEach(() => {
        home.VisitHome()
        home.click_on_desired_page(testData.contact)
    })

    it('Working with fixtures as aliases', () => {
        cy.get('@testData').then((data) => {
            // Use the then block to reuse the elements from already set alias of json file.
            cy.formFill(data.name, data.lname, data.email, data.comments) // --> Custom Command
            // cy.get('input[name="first_name"]').type(data.name)
            // cy.get('input[name="last_name"]').type(data.lname)
            // cy.get('input[name="email"]').type(data.email)
            // cy.get('textarea[name="message"]').type(data.comments)
            // cy.get('[type=submit]').click()
        })
    })
})