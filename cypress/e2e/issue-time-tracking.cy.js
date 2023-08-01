describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            //System will already open issue creating modal in beforeEach block  
            cy.visit(url + '/board?modal-issue-create=true');
        });
    });

    it('Should create an new issue and validate it successfully', () => {
        //Create issue by filling mandatory field
        cy.get('[data-testid="modal:issue-create"]').within(() => {
            cy.get('.ql-editor').type('My bug description');
            cy.get('input[name="title"]').type('Bug');
            cy.get('button[type="submit"]').click();
        });
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('be.visible');
        cy.reload();
        cy.contains('Issue has been successfully created.').should('not.exist');
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains('Bug');
        });
        //Add estimation 
        cy.contains('Bug').click();
        cy.get('input[placeholder="Number"]').click().type("value=10");
        cy.contains('10h estimated').should('exist');
        cy.get('button i[data-testid="icon:close"]').click();
        cy.contains('Bug').click();
        cy.contains('10h estimated').should('exist');
        //Update estimation
        cy.get('input[placeholder="Number"]').click().clear().type("value=20");
        cy.contains('20h estimated').should('exist');
        cy.get('button i[data-testid="icon:close"]').click();
        cy.contains('Bug').click();
        cy.contains('20h estimated').should('exist');
        //Remove estimation
        cy.get('input[placeholder="Number"]').click().clear();
        cy.contains('20h estimated').should('not.exist');
        cy.get('button i[data-testid="icon:close"]').click();
        cy.contains('Bug').click();
        cy.contains('20h estimated').should('not.exist');
        //Time Logging 
        cy.get('i[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('input[placeholder="Number"]').eq(1).click().type('value=2');
        cy.get('input[placeholder="Number"]').eq(2).click().type('value=5');
        cy.get('[data-testid="modal:tracking"]').contains('button', 'Done').click();
        cy.contains('No time logged').should('not.exist');
        cy.get('[data-testid="icon:stopwatch"]').next().should('contain', '2h logged')
            .should('not.contain', 'No time logged').and('contain', '5h remaining');
        //Remove Logged time
        cy.get('i[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.get('input[placeholder="Number"]').eq(1).click().clear();
        cy.get('input[placeholder="Number"]').eq(2).click().clear();
        cy.get('[data-testid="modal:tracking"]').contains('button', 'Done').click();
        cy.get('[data-testid="icon:stopwatch"]').next().should('contain', 'No time logged');
    });
});