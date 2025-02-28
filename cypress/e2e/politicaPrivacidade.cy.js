describe('CAC TAT - Política de Privacidade', () => {
    beforeEach(() => {
      cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/privacy.html')
    })
    
    it('verifica o título da aplicação', () => {
        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })
    it('verifica o paragrafo da aplicação', () => {
        cy.contains('p', 'Talking About Testing').should('be.visible')
    })


});