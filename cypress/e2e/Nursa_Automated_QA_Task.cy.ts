import { faker } from '@faker-js/faker';
const password = faker.internet.password(); 

describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('https://demo.sylius.com/en_US/')

      cy.fixture('users')
      .then(users => {
       this.users=users;

 
      })

    })

context("Task 1 - Successful log in", () => {
  it('Sign in with email and password', () => {
     cy.getByHref("/en_US/login").click()
     cy.get('#_username').type(this.users.validUserName)
     cy.get('#_password').type(this.users.validPassword)
     cy.get('.blue').click()
     cy.get('#menu > .ui > div.item').should("exist")
  })

context("Task 2 - Successfully Sign Up ", () => {
    it('Registering a new account with all details', () => {
      cy.getByHref("/en_US/register").click()
      cy.get('#sylius_customer_registration_firstName').type(faker.name.fullName())
      cy.get('#sylius_customer_registration_lastName').type(faker.name.fullName())
      cy.get('#sylius_customer_registration_email').type(faker.internet.email())
      cy.get('#sylius_customer_registration_phoneNumber').type(faker.phone.number())
      cy.get('#sylius_customer_registration_user_plainPassword_first').type(password)
      cy.get('#sylius_customer_registration_user_plainPassword_second').type(password)
      cy.get('.loadable > .large').click()
      cy.get(':nth-child(2) > .content > p').should("exist")
      
       
    })

    context("Task 3 - Forgot Password ", () => {
      it('Resetting an account password', () => {
        cy.getByHref("/en_US/login").click()
        cy.get('.loadable > .right').click()
        cy.get('#sylius_user_request_password_reset_email').type(this.users.validUserName)
        cy.get('.loadable > .fluid').click()        
        cy.get('.positive > .content > p').should("exist")
        
      })
      
      context("Task 4 - Subscribe to Newsletter", () => {
        it('Subscribing to the newsletter', () => {
          cy.getByHref("/en_US/login").click()
          cy.get('#_username').type(this.users.validUserName)
          cy.get('#_password').type(this.users.validPassword)
          cy.get('.blue').click()
          cy.get('#menu > .ui > [href="/en_US/account/dashboard"]').click()
          cy.get('.four > .ui > [href="/en_US/account/profile/edit"]').click()
          cy.get('.ui > label').click()
          cy.get('.loadable > .large').click()
          cy.get('.positive > .content > p').should("exist")
        })

        context("Task 5 -  Adding a simple product to the cart", () => {
          it('Adding a product to the cart as a logged in customer', () => {
            cy.getByHref("/en_US/login").click()
            cy.get('#_username').type(this.users.validUserName)
            cy.get('#_password').type(this.users.validPassword)
            cy.get('.blue').click()
            cy.get('.homepage').contains("Oathkeeper")
            cy.get('.homepage').contains("$99.99")
          })
        })
            
          it('Preventing adding to cart item with 0 quantity', () => { 
           cy.getByHref("/en_US/login").click()
            cy.get('#_username').type(this.users.validUserName)
            cy.get('#_password').type(this.users.validPassword)
            cy.get('.blue').click()
            cy.get('header > .ui.menu > :nth-child(1)').click()
            cy.get('.transition > [href="/en_US/taxons/t-shirts/men"]').click()
            cy.get(':nth-child(4) > .four > .ui > a.item').click()
            cy.get(':nth-child(2) > .content > .ui').click()
            cy.getByHref("/en_US/taxons/category/t-shirts?limit=27").click()
            cy.get('#products').contains("T-Shirt banana")
            cy.get('#products').contains("$12.54")
          })
 
 
 
    })
})
})
})
})
