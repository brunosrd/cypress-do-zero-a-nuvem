describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos e envia formulário', () => {
    const textoLongo = Cypress._.repeat('Preciso de ajuda, obrigado', 15)

    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Ribeiro')
    cy.get('#email').type('brunosr099@outlook.com')
    cy.get('#phone').type('55999373610')
    cy.get('#open-text-area').type(textoLongo, { delay: 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Ribeiro')
    cy.contains('button', 'Enviar').click()
    cy.get('span.error').should('be.visible')
  })

  it('campo de telefone continua vazio quando preenchido com um valor não numérico', ()=> {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Ribeiro')
    cy.get('#email').type('brunosr099@outlook.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Ajuda')
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible')
  })

  it('preenche e limpa o campo nome', () => {
    cy.get('#firstName')
    .type('Bruno')
    .should('have.value', 'Bruno')
    .clear()
    .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('span.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it.only('seleciona um produto (YouTube) por seu texto', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  })
})