# Nursa_webtest & API test - Cypress 2022

<a href="#description">Description  </a> 
<a href="#functionalities">Functionalities  </a>
<a href="#runtests">Run Tests  </a> 
<a href="#projectstatus">Projects Status  </a> 
<a href="#author">Author  </a> 

# Tests
The tests were written using JavaScript language

# Nursa_webtest
# Project description - Step by step:
- Visit the website https://demo.sylius.com/en_US/login
- New user registration
- Adding product to cart
- Inclusion of Delivery Address
- Inclusion of payment method
- Purchase completed successfully

# Functionalities: 
- fixtures > perfil
- support > page_objects > address.page
- support > commands
- Faker (emailfaker)

___________________________________________________________________________

# API_test
# Project description - Step by step:
- Visit the website https://demo.sylius.com/api/v2/shop/addresses
- Generate token
- Create an address - Method: POST
- Retrieves the collection of addresses - Method: GET
- Edit a previously registered address - Method: PUT
- Delete a previously registered address - Method: DELETE
All tests passed

# Functionalities: 
- fixtures > perfil
- support > commands

# Run Tests
Run one of the commands below to run the tests. Examples:
- To open cypress, execute npx cypress open
- To run the tests - after opening Cypress, just click on the test you want to run
- To run the tests on the terminal, execute npx cypress run
- To generate the report, execute npm run cy:report or visit https://dashboard.cypress.io/projects/tdz1x7/runs/2/overview

# Project status:
Done
# Author: 
Gabriela Mattesco






