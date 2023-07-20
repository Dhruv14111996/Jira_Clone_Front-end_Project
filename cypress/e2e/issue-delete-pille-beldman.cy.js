describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').should('be.visible');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

  it('Should create a test case for deleting issue', () => {

    getIssueDetailsModal()
      .find('[data-testid="icon:trash"]').click();
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.get('button').contains('Delete issue').click();
    cy.contains('Are you sure you want to delete this issue?').should('not.exist');
    cy.wait(1000);
    cy.contains('This is an issue of type: Task').should('not.exist')
    cy.wait(1000);
});
  

 it('Should update title, description successfully', () => {
      getIssueDetailsModal()
      .find('[data-testid="icon:trash"]').click();
    cy.contains('Are you sure you want to delete this issue?').should('be.visible');
    cy.get('button').contains('Cancel').click();
    cy.contains('Are you sure you want to delete this issue?').should('not.exist');
    cy.get('[data-testid="icon:close"]').first().click();
    cy.get('[data-testid="board-list:backlog"]').should('be.visible');


  });

  
 
  
});
