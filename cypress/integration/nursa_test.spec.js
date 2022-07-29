///<reference types = "Cypress" />
const perfil = require('../fixtures/perfil.json')
import commands from '../support/commands_test'
import addresspage from '../support/page_objects.js/address.page';
var faker = require('faker')

context('Nursa Automation_test', () => {

    beforeEach(() => {
        cy.visit('/en_US/login')
    });

    // beforeEach(() => {
    //     cy.visit('en_US/login/')
    //     cy.fixture('perfil').then((data) => {
    //     cy.login(data.Username, data.Password)
    //     });
    //     cy.get('#menu > .ui > div.item').should('contain', 'Hello')
    // });

    
    it('Should add 1 item to cart successfully', () => {
        let emailfaker = faker.internet.email()

        cy.get('.two > :nth-child(3) > .big').click()
        cy.login('Gabriela', 'Mattesco', emailfaker, '3333333', 'mattesco87', 'mattesco87')
        cy.get(':nth-child(2) > .content > .header').should('contain', 'Success')

        cy.addproduct('M','3')
        cy.get('.five > .huge').click()

        addresspage.DeliveryAddress(emailfaker, 'Gabriela', 'Mattesco', 'Nursa', 'Americas Avenue', 'US', 'Miami', '2222222' )
        cy.get('.item > .content').click()
        cy.get('#next-step').click()
        cy.get('.fluid > :nth-child(1) > .content').click()
        cy.get('#next-step').click()
        cy.get('.loadable > .huge').click()
        cy.get('#sylius-thank-you > .sub').should('contain', 'You have successfully placed an order.')
    
         
   
    });
});