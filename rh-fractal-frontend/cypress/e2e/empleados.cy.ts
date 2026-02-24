describe('Pruebas E2E - Página de Empleados', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait('@getData');
  });

  it('debería cargar la página de empleados', () => {
    cy.contains('Gestión de Empleados').should('be.visible');
    cy.contains('Total Empleados').should('be.visible');
  });

  it('debería mostrar las estadísticas', () => {
    cy.get('.stats-row').should('be.visible');
    cy.contains('Total Empleados').should('be.visible');
    cy.contains('Activos').should('be.visible');
    cy.contains('Inactivos').should('be.visible');
    cy.contains('Departamentos').should('be.visible');
  });

  it('debería tener un campo de búsqueda', () => {
    cy.get('input[placeholder*="Buscar"]').should('be.visible');
  });

  it('debería abrir el modal de nuevo empleado', () => {
    cy.contains('button', 'Nuevo Empleado').click();
    cy.contains('Nuevo Empleado').should('be.visible');
    cy.get('.modal-content').should('be.visible');
  });

  it('debería cerrar el modal', () => {
    cy.contains('button', 'Nuevo Empleado').click();
    cy.get('.close-btn').click();
    cy.get('.modal-content').should('not.exist');
  });

  it('debería mostrar empleados en la grilla', () => {
    cy.get('.empleados-grid').should('be.visible');
    cy.get('.empleado-card').should('have.length.greaterThan', 0);
  });

  it('debería filtrar empleados al buscar', () => {
    cy.get('input[placeholder*="Buscar"]').type('Juan');
    cy.get('.empleado-card').should('contain.text', 'Juan');
  });

  it('debería navegar a Departamentos', () => {
    cy.get('a[href="/departamentos"]').click();
    cy.url().should('include', '/departamentos');
  });

  it('debería navegar a Vacaciones', () => {
    cy.get('a[href="/vacaciones"]').click();
    cy.url().should('include', '/vacaciones');
  });

  it('debería navegar a Beneficios', () => {
    cy.get('a[href="/beneficios"]').click();
    cy.url().should('include', '/beneficios');
  });

  it('debería navegar a Inventario', () => {
    cy.get('a[href="/inventario"]').click();
    cy.url().should('include', '/inventario');
  });
});
