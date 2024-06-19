// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('getFormField', (selector) => {
  return cy.get(`input[name=${selector}]`);
});

Cypress.Commands.add(
  'findByData',
  { prevSubject: true },
  (subject, selector) => {
    return subject.find(`[data-test=${selector}]`);
  }
);

Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', 'http://localhost:5000/api/v1/reset');
});

Cypress.Commands.add('login', (username, password) =>
  cy.session(
    username,
    () => {
      cy.request('POST', 'http://localhost:5000/api/v1/reset');
      cy.visit('/login');
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/home');
      cy.get('h2').should('contain', 'Your Blog Posts');
    },
    {
      validate: () => {
        cy.getCookie('connect.sid').should('exist');
        cy.getCookie('user').should('exist');
      },
    }
  )
);
