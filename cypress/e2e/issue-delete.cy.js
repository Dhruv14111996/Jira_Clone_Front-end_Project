describe('Issue delete', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    //Assignment 3 :- "Task-1"

    it('Should delete issue successfully', () => {
        //Assert detailed view of modal should be visible
        cy.get('[data-testid="list-issue"]').should('be.visible');
        //Delete issue and confirmation message not exist
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('button').contains('Delete issue').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        //Delete issue should not visible on Jira clone
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]').should('have.length', '3');

        });
    });

    //Assignment 3 :- "Task-2"

    it('Should cancel deletion process successfully', () => {
        //Assert detailed view of modal should be visible
        cy.get('[data-testid="list-issue"]').should('be.visible');
        //Cancel Deleteing issue and confirmation message not exist
        cy.get('[data-testid="icon:trash"]').click();
        cy.get('button').contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        //Assert that Issue detailed view shoud be close
        cy.get('button i[data-testid="icon:close"]').click();
        //Issue should visible on Jira clone
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]').should('have.length', '4');

        });
    });
});
