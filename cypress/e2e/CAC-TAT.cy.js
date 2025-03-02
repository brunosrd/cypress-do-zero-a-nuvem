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
    cy.get('#phone-checkbox').check()
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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService =>{
        cy.wrap(typeOfService)
          .check()
      })
  })


  it('marca ambos checkboxes, depois desmarca o último', () =>{
    // cy.get('input#email-checkbox').check()
    // cy.get('input#phone-checkbox').check()

    // cy.get('input#phone-checkbox').uncheck()

    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
 
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',  { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('arquivoExemplo')
    cy.get('#file-upload')
    .selectFile('@arquivoExemplo') //usamos @ para chamar alias
    .then(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })


  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  
  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
    .invoke('val', 'Ajuda, por favor')
    .should('have.value', 'Ajuda, por favor')
  })

  it('faz uma requisição HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')  
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('encontra o gato escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
  })

});