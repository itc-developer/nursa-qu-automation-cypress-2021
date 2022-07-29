// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (Username, Password) => {
    cy.get('#_username').type(Username)
    cy.get('#_password').type(Password, { log: false })
    cy.get('.blue').click()
});

Cypress.Commands.add('preregistration', (name, lastname, emailFaker, phone, password, verification) => {
    cy.get('.two > :nth-child(3) > .big').click()
    cy.get('#sylius_customer_registration_firstName').type(name)
    cy.get('#sylius_customer_registration_lastName').type(lastname)
    cy.get('#sylius_customer_registration_email').type(emailFaker)
    cy.get('#sylius_customer_registration_phoneNumber').type(phone)
    cy.get('.ui > label').click()
    cy.get('#sylius_customer_registration_user_plainPassword_first').type(password, { log: false })
    cy.get('#sylius_customer_registration_user_plainPassword_second').type(verification, { log: false })
    cy.get('.loadable > .large').click()
});

Cypress.Commands.add('addproducts', (size, quantity) =>{
    cy.get('header > .ui.menu > :nth-child(1)').click()
    cy.get('[href="/en_US/taxons/t-shirts/women"]').click()
    cy.get(':nth-child(2) > .blurring > .bordered').click()
    cy.get('#sylius_add_to_cart_cartItem_variant_t_shirt_size').select(size)
    cy.get('#sylius_add_to_cart_cartItem_quantity').clear().type(quantity)
    cy.get('#sylius-product-adding-to-cart > .huge').click()

});

Cypress.Commands.add('address', (firstname, surname, company, address, country, city, postcode) =>{
    cy.get('#sylius_checkout_address_billingAddress_firstName').type(firstname)
    cy.get('#sylius_checkout_address_billingAddress_lastName').type(surname)
    cy.get('#sylius_checkout_address_billingAddress_company').type(company)
    cy.get('#sylius_checkout_address_billingAddress_street').type(address)
    cy.get('#sylius_checkout_address_billingAddress_countryCode').select(country)
    cy.get('#sylius_checkout_address_billingAddress_city').type(city)
    cy.get('#sylius_checkout_address_billingAddress_postcode').type(postcode)
    cy.get('#next-step').click()

});

