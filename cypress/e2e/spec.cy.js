describe('Root Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Hero section', () => {
    it('Loads the landing page and shows the correct elements', () => {
      cy.getByData('landing-title').contains('Create Your Space');
      cy.getByData('landing-description').contains(
        'BlockScape is a space to unlock your creativity, and share your thoughts with the world. You can write your own blog or just read what other people are saying.'
      );
      cy.get('button').eq(2).contains('Sign Up Today');
    });

    it.only('Sign Up button redirects to register page', () => {
      cy.get('button').eq(2).contains('Sign Up Today').click();
      cy.url().should('eq', 'http://localhost:3000/register');
    });
  });

  context('Header section', () => {
    it('Loads the header and shows the correct elements', () => {
      cy.get('h1').contains('BlogScape');
      cy.getByData('logged-out-nav').children().find('a').contains('API');
      cy.getByData('logged-out-nav').children().find('a').contains('Help');
      cy.getByData('logged-out-nav').children().find('a').contains('Login');
      cy.getByData('logged-out-nav')
        .children()
        .find('button')
        .contains('Sign Up');
    });

    it('Logo redirects back to landing page', () => {
      cy.getByData('header-link').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });

    it('API link redirects back to landing page', () => {
      cy.getByData('logged-out-nav')
        .children()
        .find('a')
        .contains('API')
        .click();
      cy.url().should('eq', 'http://localhost:3000/');
    });

    it('Help link redirects back to landing page', () => {
      cy.getByData('logged-out-nav')
        .children()
        .find('a')
        .contains('Help')
        .click();
      cy.url().should('eq', 'http://localhost:3000/');
    });

    it('Login link redirects to login page', () => {
      cy.getByData('logged-out-nav')
        .children()
        .find('a')
        .contains('Login')
        .click();
      cy.url().should('eq', 'http://localhost:3000/login');
    });

    it('Sign Up button redirects to register page', () => {
      cy.getByData('logged-out-nav')
        .children()
        .find('button')
        .contains('Sign Up')
        .click();
      cy.url().should('eq', 'http://localhost:3000/register');
    });
  });

  context('Footer section', () => {
    it('Loads the footer and shows the correct elements', () => {
      cy.getByData('footer-logo').contains('BlogScape');
      cy.getByData('footer-link')
        .find('a')
        .eq(0)
        .should('have.attr', 'href', 'https://x.com/arigorn_15');

      cy.getByData('footer-link')
        .find('a')
        .eq(1)
        .should('have.attr', 'href', 'https://facebook.com/tj.petersen.7');

      cy.getByData('footer-link')
        .find('a')
        .eq(2)
        .should('have.attr', 'href', 'https://kashi754.com');

      cy.getByData('footer-link')
        .find('a')
        .eq(3)
        .should('have.attr', 'href', 'https://github.com/Kashi754');

      cy.getByData('copyright').contains(
        '© 2024 BlogScape. All rights reserved.'
      );
    });
  });
});
