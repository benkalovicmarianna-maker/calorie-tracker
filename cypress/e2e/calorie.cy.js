describe('Calorie Tracker E2E', () => {

  it('додає їжу', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Додати').click();
    cy.contains('Яблуко').click();

    cy.get('input').first().clear().type('100');
    cy.contains('Додати').click();

    cy.contains('Яблуко').should('exist');
  });


  it('відкриває форму додавання', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Додати').click();
    cy.get('input').should('exist');
  });

  it('відображає калорії після додавання', () => {
    cy.visit('http://localhost:5173');

    cy.contains('Додати').click();
    cy.contains('Яблуко').click();

    cy.get('input').first().clear().type('100');
    cy.contains('Додати').click();

    cy.contains('кал').should('exist');
  });

});