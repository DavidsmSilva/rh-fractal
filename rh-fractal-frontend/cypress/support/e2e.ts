import './commands';

beforeEach(() => {
  cy.intercept('GET', '**/api/**', { fixture: 'mock-data.json' }).as('getData');
  cy.intercept('POST', '**/api/**', { statusCode: 200, body: { success: true } }).as('postData');
  cy.intercept('DELETE', '**/api/**', { statusCode: 200, body: { success: true } }).as('deleteData');
});
