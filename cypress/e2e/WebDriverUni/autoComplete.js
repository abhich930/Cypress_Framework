/// <reference types='cypress'/>
import HomePage from "../../support/pom/wduni/Homepage_PO";

describe('Autocomplete suggestions', () => {
    const home = new HomePage()
    
    before(() => {
        cy.fixture('targets').then((testData) => {
            globalThis.testData = testData
        })
    })

    beforeEach(() => {
        home.VisitHome()
        home.click_on_desired_page(testData.auto_comp)
    })

    it('Working with Autocomplete', () => {
        let selectThis = 'Grapes';
        cy.get('#myInput').type('gr')
        cy.get('#myInputautocomplete-list > *').each(($item) => {
            const suggestionList = $item.text();
            cy.log(suggestionList)
            if (suggestionList === selectThis) {
                cy.wrap($item).click({force:true});
            }
        })
    })
})