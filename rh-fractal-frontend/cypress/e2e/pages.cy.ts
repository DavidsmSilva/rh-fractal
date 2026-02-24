describe('Pruebas E2E - Página de Departamentos', () => {
  beforeEach(() => {
    cy.visit('/departamentos');
    cy.wait('@getData');
  });

  it('debería cargar la página de departamentos', () => {
    cy.contains('Departamentos').should('be.visible');
  });

  it('debería mostrar la lista de departamentos', () => {
    cy.get('.departamento-card, table, .grid').should('be.visible');
  });
});

describe('Pruebas E2E - Página de Vacaciones', () => {
  beforeEach(() => {
    cy.visit('/vacaciones');
    cy.wait('@getData');
  });

  it('debería cargar la página de vacaciones', () => {
    cy.contains('Vacaciones').should('be.visible');
  });

  it('debería mostrar las estadísticas de vacaciones', () => {
    cy.get('.stats-row, .vacaciones-stats').should('be.visible');
  });
});

describe('Pruebas E2E - Página de Beneficios', () => {
  beforeEach(() => {
    cy.visit('/beneficios');
    cy.wait('@getData');
  });

  it('debería cargar la página de beneficios', () => {
    cy.contains('Beneficios').should('be.visible');
  });
});

describe('Pruebas E2E - Página de Inventario', () => {
  beforeEach(() => {
    cy.visit('/inventario');
    cy.wait('@getData');
  });

  it('debería cargar la página de inventario', () => {
    cy.contains('Inventario').should('be.visible');
  });

  it('debería mostrar el inventario', () => {
    cy.get('.inventario-grid, table, .items-list').should('be.visible');
  });
});
