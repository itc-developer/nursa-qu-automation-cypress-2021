declare namespace Cypress {
    interface Chainable {
        getByHref(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>

    }

}