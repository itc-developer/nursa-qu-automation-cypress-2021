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
        let namefaker = faker.name.firstName()
        let lastnamefaker = faker.name.lastName()
        let emailfaker = faker.internet.email(namefaker)
        
        cy.get('.two > :nth-child(3) > .big').click()
        cy.login(namefaker, lastnamefaker, emailfaker, '3333333', 'mattesco87', 'mattesco87')
        cy.get(':nth-child(2) > .content > .header').should('contain', 'Success')

        cy.addproduct('M','3')
        cy.get('.five > .huge').click()

        addresspage.DeliveryAddress(emailfaker, namefaker, lastnamefaker, 'Nursa', 'Americas Avenue', 'US', 'Miami', '2222222' )
        cy.get('.item > .content').click()
        cy.get('#next-step').click()
        cy.get('.fluid > :nth-child(1) > .content').click()
        cy.get('#next-step').click()
        cy.get('.loadable > .huge').click()
        cy.get('#sylius-thank-you > .sub').should('contain', 'You have successfully placed an order.')
    
    });

    it('Should display an error message when entering invalid user', () => {
        cy.get('#_username').type('shop@xxx.com')
        cy.get('#_password').type('sylius')
        cy.get('.blue').click()

        cy.get('.negative > .content > p').should('contain', 'Invalid credentials.')

    });

    it('Should display an error message when entering invalid password', () => {
        cy.get('#_username').type('shop@example.com')
        cy.get('#_password').type('xxxxx')
        cy.get('.blue').click()

        cy.get('.negative > .content > p').should('contain', 'Invalid credentials.')

    });

    it('Should display a Reset message when you forget the password', () => {
        let emailfaker = faker.internet.email()

        cy.get('.loadable > .right').click()
        cy.get('.ui.header > .content'). should('contain', 'Reset password')
        cy.get('#sylius_user_request_password_reset_email').type(emailfaker)
        cy.get('.loadable > .ui').click()

        cy.get('.positive > .content > .header').should('contain', 'Success')
        cy.get('.positive > .content > p').should('contain', 'If the email you have specified exists in our system')
        
    });
});