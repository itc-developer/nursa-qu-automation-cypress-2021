/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json');
import commands from '../support/commands';
var faker = require('faker');

context('Web Test Nursa', () => {

    beforeEach(() => {
        cy.visit('en_US/login/')
        cy.fixture('perfil').then((data) => {
        cy.login(data.Username, data.Password)
        });
        cy.get('#menu > .ui > div.item').should('contain', 'Hello')
    });

    it('Should add 1 item to cart successfully', () => {
        
        cy.addproducts('M', '3')
        cy.get('.five > .huge').click()

        cy.address('Gabriela', 'Mattesco', 'Nursa', 'Fifth Avenue', 'US', 'Miami', '2222222')
        
        cy.get('#next-step').click()
        cy.get(':nth-child(2) > .content > .header > .required').click()
        cy.get('#next-step').click()
        cy.get('.loadable > .huge').click()
        cy.get('#sylius-thank-you > .sub').should('contain', 'You have successfully placed an order.')

    });
})

