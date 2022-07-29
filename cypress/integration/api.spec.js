/// <reference types="cypress" />
import data from "../fixtures/perfil.json";
import command from "../support/commands_api"


describe('API', () => {
    let token
    before(() => {
        cy.getToken(data.Username, data.Password).then(tkn => {token = tkn})
    });

    it('Should create an address resource', () => {
        cy.request({
            method: 'POST',
            url: '/api/v2/shop/addresses',
            headers: {Authorization: `Bearer ${token}`},  
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


    it('Should retrieves the collection of addresses', () => {
        cy.request({
            method: 'GET',
            url: '/api/v2/shop/addresses',
            headers: { Authorization: `Bearer ${token}`}
           
        }).then((response) => {
            expect(response.status).to.equal(200)
        });
        
        });
           
    })


    



    


  