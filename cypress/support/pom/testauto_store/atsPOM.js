class atsPOM {
    visitHomePage () {
        cy.visit('https://automationteststore.com/')
    }
    visitSpecificStore (store_name) {
        cy.goToSpecificStore(store_name) // --> Custom Command
    }
    assertingSelectedProduct(product_name){
        cy.get('h1.productname span').should('contain.text', product_name)
    }
}
export default atsPOM;