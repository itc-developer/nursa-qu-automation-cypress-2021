/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json');
import commands from '../support/commands';
var faker = require('faker');

context('Web Test Nursa', () => {

    // beforeEach(() => {
    //     cy.visit('login/')
    //     cy.fixture('perfil').then((data) => {
    //     cy.login(data.Username, data.Password)
    //     });
    //     cy.get('#menu > .ui > div.item').should('contain', 'Hello')
    // });

    
    beforeEach(() => {
        cy.visit('login/')
      
    });
    
    it('Should add 1 item to cart successfully', () => {
        let emailFaker = faker.internet.email()

        cy.preregistration('Gabriela', 'Mattesco', emailFaker, '21967000597', 'mattesco87', 'mattesco87')
        cy.get(':nth-child(2) > .content > .header').should('contain','Success')
        cy.get('#_username').type(emailFaker)
        cy.get('#_password').type('mattesco87', { log: false })
        cy.get('.blue').click()

        cy.addproducts('M', '3')
        cy.get('.five > .huge').click()

        cy.address('Gabriela', 'Mattesco', 'Nursa', 'Fifth Avenue', 'CA', 'Montreal', '2222222')
        
        cy.get('.required').click()
        cy.get('#next-step').click()
        cy.get(':nth-child(2) > .content > .header > .required').click()
        cy.get('#next-step').click()
        cy.get('.loadable > .huge').click()
        cy.get('#sylius-thank-you > .sub').should('contain', 'You have successfully placed an order.')

    });
})

