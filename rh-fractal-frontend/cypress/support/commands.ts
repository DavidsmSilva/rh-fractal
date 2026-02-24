declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      navigateTo(page: string): Chainable<void>;
      openModal(): Chainable<void>;
      closeModal(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('navigateTo', (page: string) => {
  cy.get(`a[href="/${page}"]`).click();
});

Cypress.Commands.add('openModal', () => {
  cy.contains('button', 'Nuevo').click();
});

Cypress.Commands.add('closeModal', () => {
  cy.get('.close-btn').click();
});
