class HomePage{
    VisitHome(){
        // We cant create an anonyums function here as we will need to call it later in the test spec files.
        cy.visit(Cypress.config('wduniURL')) // Usind '.env' file's variable here, whcih are setup in the Cypress config file.
    }
    click_on_desired_page(target){
        // setting up a param for this fun: as the custom command also accepts one
        /* So when we pass the param in this fun say param "a"
        then the same param "p" will be passes to the custom command
        and in turn CC will pass it to the cy.get method
        */
        cy.wduniDesiredPage(target) // Custom commands to remove the attribute of 'Child win - target' to keep the testing in single cypress window.
    }
}
export default HomePage;