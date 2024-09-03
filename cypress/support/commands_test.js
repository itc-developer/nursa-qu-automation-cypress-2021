// Cypress.Commands.add('login', (Username, Password) => {
//     cy.get('#_username').type(Username)
//     cy.get('#_password').type(Password, { log: false })
//     cy.get('.blue').click()
// });

Cypress.Commands.add('login', (namefaker, lastnamefaker, emailfaker, phonenumber, password, verification) => {
    cy.get('#sylius_customer_registration_firstName').type(namefaker)
    cy.get('#sylius_customer_registration_lastName').type(lastnamefaker)
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

