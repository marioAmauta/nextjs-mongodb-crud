Cypress.Commands.add('resetTasks', () => {
  cy.request({
    url: '/api/tasks',
    method: 'POST',
    body: {
      action: 'resetTasks'
    }
  }).then(response => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('message', 'tasks successfully deleted');
  });
});

Cypress.Commands.add('addManyTasks', () => {
  cy.request({
    url: '/api/tasks',
    method: 'POST',
    body: {
      action: 'addManyTasks'
    }
  }).then(response => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('message', 'tasks successfully added');
  });
});
