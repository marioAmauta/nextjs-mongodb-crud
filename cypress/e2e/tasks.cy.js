const { manyTasksMock, taskMock } = require('../fixtures/mockData');

describe('tasks api tests', () => {
  it('get all tasks', () => {
    cy.resetTasks();
    cy.addManyTasks(manyTasksMock);
    cy.request({
      url: '/api/tasks'
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  it('get one task by its title', () => {
    cy.request({
      url: `/api/tasks/${taskMock.title}`
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.contain(taskMock);
    });
  });
});
