import IssueModal from "../../pages/IssueModal";

describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
        });
    });
    const issueDetails = {
        title: "My new Issue",
        type: "Bug",
        description: "My test",
        assignee: "Lord Gaben",
    };
    const EXPECTED_AMOUNT_OF_ISSUES = '5';
    it('Should create new issue and add, update and remove estimation', () => {
        IssueModal.createIssue(issueDetails);
        IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
        cy.contains(issueDetails.title).click();
    });
});





