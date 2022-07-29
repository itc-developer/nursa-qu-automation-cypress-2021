Cypress.Commands.add('getToken', (email, password) => {
    cy.request({
        method: 'POST',
        url: '/api/v2/shop/authentication-token',
        body: {
            "email": email,
            "password": password
          }
        }).then((response) => {
            expect(response.status).to.equal(200)
            return response.body.token
        })
})

