Cypress.Commands.add('login', (name, lastname, emailfaker, phonenumber, password, verification) => {
    cy.get('#sylius_customer_registration_firstName').type(name)
    cy.get('#sylius_customer_registration_lastName').type(lastname)
    cy.get('#sylius_customer_registration_email').type(emailfaker)
    cy.get('#sylius_customer_registration_phoneNumber').type(phonenumber)
    cy.get('#sylius_customer_registration_user_plainPassword_first').type(password, { log:false})
    cy.get('#sylius_customer_registration_user_plainPassword_second').type(verification, {log:false})
    cy.get('.loadable > .large').click()

})

Cypress.Commands.add('addproduct', (size, quantity) => {
    cy.get('header > .ui.menu > :nth-child(1)').click()
    cy.get('[href="/en_US/taxons/t-shirts/women"]').click()
    cy.get(':nth-child(2) > .blurring > .bordered').click()
    cy.get('#sylius_add_to_cart_cartItem_variant_t_shirt_size').select(size)
    cy.get('#sylius_add_to_cart_cartItem_quantity').clear().type(quantity)
    cy.get('#sylius-product-adding-to-cart > .huge').click()
})

// Cypress.Commands.add('preregistration', (emailfaker, firstname, lastname, company, street, country, city, postcode) => {
//     cy.get('#sylius_checkout_address_customer_email').type(emailfaker)
//     cy.get('#sylius_checkout_address_billingAddress_firstName').type(firstname)
//     cy.get('#sylius_checkout_address_billingAddress_lastName').type(lastname)
//     cy.get('#sylius_checkout_address_billingAddress_company').type(company)
//     cy.get('#sylius_checkout_address_billingAddress_street').type(street)
//     cy.get('#sylius_checkout_address_billingAddress_countryCode').select(country)
//     cy.get('#sylius_checkout_address_billingAddress_city').type(city)
//     cy.get('#sylius_checkout_address_billingAddress_postcode').type(postcode)
//     cy.get('#next-step').click()
// })