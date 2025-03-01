Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Bruno',
    lastName: 'Ribeiro',
    email: 'brunosr099@outlook.com',
    text: 'Ajuda'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
})