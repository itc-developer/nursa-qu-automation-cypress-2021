/// <reference types="cypress" />
import commands from "../support/commands_api"

describe('API', () => {

    let token
    before(() => {
        cy.token('api@example.com','sylius-api').then(tkn => { token = tkn})
    });


    it('Should create a address resource', () => {
        cy.request({
            method: 'POST',
            url: 'https://demo.sylius.com/api/v2/shop/addresses',
            // headers: {authorization: token},
            body: {
                "firstName": "Gabriela",
                "lastName": "Mattesco",
                "phoneNumber": "9999999",
                "company": "Nursa",
                "countryCode": "55",
                "provinceCode": "21",
                "provinceName": "Rio de Janeiro",
                "street": "Avenida das Americas",
                "city": "Rio de Janeiro",
                "postcode": "22793323"
            },
        }).then((response) => {
            expect(response.status).to.equal(201)
            
        })
    });


    // it('Should retrieves a address', () => {
    //     cy.request({
    //         method: 'GET',
    //         url: 'https://demo.sylius.com/api/v2/admin/addresses/',
    //         headers: {authorization: token},
    //         body: {
    //             "@context": "string",
    //             "@id": "string",
    //             "@type": "string",
    //             "customer": "string",
    //             "id": 0,
    //             "firstName": "string",
    //             "lastName": "string",
    //             "phoneNumber": "string",
    //             "company": "string",
    //             "countryCode": "string",
    //             "provinceCode": "string",
    //             "provinceName": "string",
    //             "street": "string",
    //             "city": "string",
    //             "postcode": "string"
    //         }
           
    //     }).then((response) => {
    //         expect(response.status).to.equal(200)
        
    //     });
           
    // })
        
    
});


    


  