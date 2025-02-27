describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos de validação', () => {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Ribeiro')
    cy.get('#email').type('brunosr099@outlook.com')
    cy.get('#phone').type('55999373610')
    cy.get('#open-text-area').type('ajuda')
    cy.get('.button').click()
    cy.get('.success').should('be.visible')
  })


})