Cypress.Commands.add("getByHref", (selector) => {
    return cy.get(`[href="${selector}"]`)

})