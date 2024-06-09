describe('Blog Page', () => {
  beforeEach(() => {
    cy.login('kashi754', 'Password_123');
    cy.visit('/blog/2');
  });

  it('Loads the blog page and shows the correct elements', () => {
    cy.url().should('eq', 'http://localhost:3000/blog/2');
    cy.getByData('blog-header').find('h2').contains("testUser1's Blog");
    cy.getByData('blog-header').find('a').contains('— Test User 1');
    cy.getByData('blog-header')
      .find('p')
      .contains("This is testUser1's personal blog.");

    // Followers Section
    cy.getByData('blog-header').find('h3').contains('1 followers');
    cy.getByData('blog-header').find('button').contains('Following');
    cy.getByData('blog-header').find('button').contains('Unfollow');

    // Main Post Card
    cy.getByData('post-image-container')
      .find('img')
      .should(
        'have.attr',
        'src',
        'https://ik.imagekit.io/blogscape/posts/cGp8OiRznvusZ3ihxM091_QyT0HGx47.jpeg?updatedAt=1716551132084&tr=h-400%2Car-1-1'
      );
    cy.getByData('post-date').should('be.visible');
    cy.getByData('main-post-info')
      .find('h2')
      .contains("TestUser1's Second post!");
    cy.getByData('main-post-info')
      .find('h3')
      .contains("Thank you for reading TestUser1's second post!");
    cy.getByData('main-post-tag').should('have.length', 2);
    cy.getByData('main-post-footer')
      .find('a')
      .contains('Read More')
      .should('have.attr', 'href', '/posts/3');

    // Posts Section
    cy.getByData('post-card').should('have.length', 1);
    cy.getByData('author-info')
      .find('a')
      .contains('Test User 1')
      .should(
        'have.attr',
        'href',
        '/profile/e556cbbc-a847-42bc-b5c0-9f25453af768'
      );
    cy.getByData('author-info')
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
    cy.getByData('post-card').find('h2').contains("TestUser1's first post!");
    cy.get('.wmde-markdown').should('contain', 'Lorem ipsum');
    cy.getByData('post-card-footer')
      .find('a')
      .contains('Read More')
      .should('have.attr', 'href', '/posts/2');
    cy.getByData('post-card-footer').find('h4').should('have.length', 3);
  });

  it('Loads more posts on scroll', () => {
    cy.visit('/blog/1');
    cy.getByData('post-card').should('have.length', 9);
    cy.scrollTo('bottom');
    cy.getByData('post-card').should('have.length', 19);
  });

  it('Links work properly', () => {
    cy.getByData('blog-header').find('a').contains('— Test User 1').click();
    cy.url().should(
      'eq',
      'http://localhost:3000/profile/e556cbbc-a847-42bc-b5c0-9f25453af768'
    );
    cy.visit('/blog/2');

    cy.getByData('main-post-footer').find('a').contains('Read More').click();
    cy.url().should('eq', 'http://localhost:3000/posts/3');
    cy.visit('/blog/2');

    cy.getByData('author-info').find('a').contains('Test User 1').click();
    cy.url().should(
      'eq',
      'http://localhost:3000/profile/e556cbbc-a847-42bc-b5c0-9f25453af768'
    );
    cy.visit('/blog/2');

    cy.getByData('post-card-footer').find('a').contains('Read More').click();
    cy.url().should('eq', 'http://localhost:3000/posts/2');
  });

  it.only('Can follow and unfollow the blog', () => {
    cy.resetDatabase();
    cy.reload(true);
    cy.getByData('blog-header').find('h3').should('contain', '1 followers');
    cy.get('.follow-button')
      .contains('Following')
      .should('have.attr', 'disabled');
    cy.get('.unfollow-button').should('be.visible');

    cy.get('.unfollow-button').click();

    cy.getByData('blog-header').find('h3').should('contain', '0 followers');
    cy.get('.follow-button')
      .contains('Follow')
      .should('not.have.attr', 'disabled');
    cy.get('.unfollow-button').should('not.exist');

    cy.get('.follow-button').click();
    cy.getByData('blog-header').find('h3').should('contain', '1 followers');
    cy.get('.follow-button')
      .contains('Following')
      .should('have.attr', 'disabled');
    cy.get('.unfollow-button').should('be.visible');
  });
});
