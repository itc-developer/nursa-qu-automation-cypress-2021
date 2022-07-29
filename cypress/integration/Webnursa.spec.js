///<reference types = "Cypress" />
const perfil = require('../fixtures/perfil.json')
import commands from '../support/commands_nursa'
import addresspage from '../support/page_objects.js/address.page';
var faker = require('faker')

context('Web test Nursa', () => {

    beforeEach(() => {
        cy.visit('/en_US/login')
    });
    
    it('Should add one product to the list', () => {
        let emailfaker = faker.internet.email()

        cy.get('.two > :nth-child(3) > .big').click()
        cy.login('Gabriela', 'Mattesco', emailfaker, '3333333', 'mattesco87', 'mattesco87')
        cy.get(':nth-child(2) > .content > .header').should('contain', 'Success')

        cy.addproduct('M','3')
        cy.get('.five > .huge').click()

        addresspage.DeliveryAddress(emailfaker, 'Gabriela', 'Mattesco', 'Nursa', 'Americas Avenue', 'US', 'Miami', '2222222' )
        cy.get('.item > .content').click()
        cy.get('#next-step').click()
        cy.get(':nth-child(2) > .content > .header > .required').click()
        cy.get('#next-step').click()
        cy.get('.loadable > .huge').click()
        cy.get('#sylius-thank-you > .sub').should('contain', 'You have successfully placed an order.')
    
          
   
    });
});