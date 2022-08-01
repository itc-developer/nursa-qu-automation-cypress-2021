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

Cypress.Commands.add('registerproduct', (token, firstname, lastname, phonenumber, company, countryCode, provinceCode, provinceName, street, city, postcode) => {
    cy.request({
        method: 'POST',
        url: '/api/v2/shop/addresses',
        headers: {Authorization: `Bearer ${token}`},  
        body: {
            "firstName": firstname,
            "lastName": lastname,
            "phoneNumber": phonenumber,
            "company": company,
            "countryCode": countryCode,
            "provinceCode": provinceCode,
            "provinceName": provinceName,
            "street": street,
            "city": city,
            "postcode": postcode
        },
    })

})


