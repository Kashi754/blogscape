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
import { POSTS } from '../../src/mocks/mockData';

Cypress.Commands.add('getByData', (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add('login', (username, password) => {
  if (username === 'fail_test') {
    cy.intercept('POST', 'http://localhost:5000/api/v1/auth/login', {
      statusCode: 401,
      body: 'Invalid username or password',
    }).as('login-fail');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait('@login-fail').its('response.statusCode').should('eq', 401);
    cy.url().should('eq', 'http://localhost:3000/login');
    return;
  }
  cy.intercept('POST', 'http://localhost:5000/api/v1/auth/login', {
    statusCode: 200,
    body: {
      id: 1,
      display_name: username,
      blogId: 1,
      expiry: 100000000000000,
      maxAge: 100000000000000,
    },
  }).as('login-success');

  cy.intercept('GET', 'http://localhost:5000/api/v1/me/posts?', {
    statusCode: 200,
    body: POSTS.filter((post) => post.blogId === 1),
  }).as('get-my-posts');

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.wait('@login-success').then((interception) => {
    expect(interception.response.statusCode).to.equal(200);
    expect(interception.response.body).to.have.keys([
      'id',
      'display_name',
      'blogId',
      'expiry',
      'maxAge',
    ]);
  });
  cy.url().should('eq', 'http://localhost:3000/home');
  cy.wait('@get-my-posts').its('response.statusCode').should('eq', 200);
});
