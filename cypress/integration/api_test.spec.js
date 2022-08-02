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
                "street": "Americas Avenue",
                "city": "Rio de Janeiro",
                "postcode": "22793323"
            },
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body).to.have.property('city')
            expect(response.duration).to.be.lessThan(150)
    
        })
    });


    it('Should retrieves the collection of addresses', () => {
        cy.request({
            method: 'GET',
            url: '/api/v2/shop/addresses',
            headers: { Authorization: `Bearer ${token}`}
           
        }).then((response) => {
            expect(response.body["hydra:member"][1].firstName).to.equal('Gabriela')
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(150)
        });
        
    });

                    
    it('Should edit a previously registered address', () => {
        cy.registerproduct(token, "Rafaela", "Mattesco", "8888888", "Nursa", "55", "21", "Rio de Janeiro", "Americas Avenue", "Rio de Janeiro", "22793323")
        .then(response => {
            let id = response.body["@id"]

        cy.request({
            method: 'PUT',
            url: `/${id}`,
            headers: { Authorization: `Bearer ${token}`},
            body: {
                "firstName": "Rafaela",
                "lastName": "Gomes",
                "phoneNumber": "777777",
                "company": "Nursa",
                "countryCode": "55",
                "provinceCode": "21",
                "provinceName": "São Paulo",
                "street": "Americas Avenue",
                "city": "São Paulo",
                "postcode": "22793323"
                }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.city).to.equal('São Paulo')
            expect(response.duration).to.be.lessThan(150)
    
        })
    })                
    })            
    
    it('Should delete a previously registered address', () => {
        cy.registerproduct(token, "Paula", "Oliveira", "5555555", "Nursa", "55", "21", "Rio de Janeiro", "Americas Avenue", "Rio de Janeiro", "22793323")
        .then(response => {
            let id = response.body["@id"]

        cy.request({
        method: 'DELETE',
        url: `/${id}`,
        headers: { Authorization: `Bearer ${token}`},

        }).then((response) => {
           expect(response.status).to.equal(204)
           expect(response.duration).to.be.lessThan(150)
                   
        })
    })
})

})
           
    