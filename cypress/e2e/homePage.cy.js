describe('Home Page', () => {
  beforeEach(() => {
    cy.login('kashi754', 'Password_123');
    cy.visit('/home');
  });

  it('Loads the home page and shows the correct elements', () => {
    cy.url().should('eq', 'http://localhost:3000/home');
    // Header section
    cy.getByData('logged-in-nav').children().find('a').contains('API');
    cy.getByData('logged-in-nav').children().find('a').contains('Help');
    cy.getByData('logged-in-nav').children().find('a').contains('Logout');
    cy.getByData('logged-in-nav').children().find('button').contains('Profile');
    cy.getByData('blog-nav').children().find('a').contains('Browse');
    cy.getByData('blog-nav').children().find('a').contains('My Blog');

    cy.get('h2').contains('Your Blog Posts');
    cy.getByData('add-post-button').contains('New Blog Post');

    // User Posts
    cy.getByData('user-posts').children().should('have.length', 10);
    cy.getByData('home-post-card').first().as('homePostCard');
    cy.get('@homePostCard')
      .find('h3')
      .should('have.text', "Kashi754's 100d Post");
    cy.get('@homePostCard')
      .find('h4')
      .should('have.text', "Thank you for reading Kashi754's 100d post!");
    cy.get('@homePostCard').find('h5').should('have.text', '0 comments');
    cy.get('@homePostCard')
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
  });

  it('Loads more posts on scroll', () => {
    cy.getByData('user-posts').children().should('have.length', 10);
    cy.scrollTo('bottom');
    cy.getByData('user-posts').children().should('have.length', 20);
  });

  it('Links work properly', () => {
    cy.getByData('blog-nav').children().find('a').contains('Browse').click();
    cy.url().should('eq', 'http://localhost:3000/browse');
    cy.visit('/home');
    cy.getByData('blog-nav').children().find('a').contains('My Blog').click();
    cy.url().should('eq', 'http://localhost:3000/blog/1');
    cy.visit('/home');
    cy.getByData('logged-in-nav')
      .children()
      .find('button')
      .contains('Profile')
      .click();
    cy.url().should('eq', 'http://localhost:3000/profile');
    cy.visit('/home');
    cy.getByData('home-post-card').first().click();
    cy.url().should('eq', 'http://localhost:3000/posts/104');
    cy.visit('/home');
    cy.getByData('add-post-button').click();
    cy.url().should('eq', 'http://localhost:3000/new');
    cy.visit('/home');
    cy.getByData('logged-in-nav')
      .children()
      .find('a')
      .contains('Logout')
      .click();
    cy.url()
      .should('eq', 'http://localhost:3000/login')
      .then(() => {
        Cypress.session.clearAllSavedSessions();
      });
  });
});
