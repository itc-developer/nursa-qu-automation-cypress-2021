# nursa-qa-automation-cypress-2021

e2e test
Step by step:
- Visit the website https://demo.sylius.com/en_US/login
- New user registration
- Adding product to cart
- Inclusion of Delivery Address
- Inclusion of payment method
- Purchase completed successfully

Functionalities: 
- fixtures > perfil
- support > page_objects > address.page
- support > commands
- Faker (emailfaker)

API test
Step by step:
Visit the website https://demo.sylius.com/
- Generate token
- Create an address - Method: POST
- Retrieves the collection of addresses - Method: GET
All tests passed

Functionalities: 
- fixtures > perfil
- support > commands







