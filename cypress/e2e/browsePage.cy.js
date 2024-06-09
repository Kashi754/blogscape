describe('Browse Page', () => {
  beforeEach(() => {
    cy.login('kashi754', 'Password_123');
    cy.visit('/browse');
  });

  it('Loads the browse page and shows the correct elements', () => {
    cy.url().should('eq', 'http://localhost:3000/browse');

    // Header Section
    cy.getByData('search-input').should(
      'have.attr',
      'placeholder',
      'Search...'
    );
    cy.getByData('search-button').should('be.visible');
    cy.getByData('random-button').contains('Find Something New!');

    // Followed Blogs
    cy.getByData('followed-blogs').find('h2').contains('Followed Blogs');

    cy.getByData('followed-blogs')
      .find('.react-multiple-carousel__arrow--right')
      .should('not.exist');
    cy.getByData('followed-blogs')
      .find('.react-multiple-carousel__arrow--left')
      .should('not.exist');
    cy.getByData('followed-blogs')
      .children()
      .first()
      .next()
      .children()
      .children()
      .as('followedBlogs');

    cy.get('@followedBlogs').should('have.length', 2);
    cy.get('@followedBlogs')
      .first()
      .find('img')
      .should('have.attr', 'src', '/images/blog-default-background.webp');
    cy.get('@followedBlogs').first().find('h3').contains("testUser2's Blog");
    cy.get('@followedBlogs').first().find('h4').contains('— Test User 2');
    cy.get('@followedBlogs')
      .first()
      .find('p')
      .contains("This is testUser2's personal blog.");
    cy.get('@followedBlogs').first().find('h5').contains('2 followers');
    cy.get('@followedBlogs')
      .first()
      .find('a')
      .should('have.attr', 'href', '/blog/3');

    // Popular Blogs
    cy.getByData('popular-blogs').find('h2').contains('Popular Blogs');
    cy.getByData('popular-blogs')
      .find('.react-multiple-carousel__arrow--right')
      .should('be.visible');
    cy.getByData('popular-blogs')
      .find('.react-multiple-carousel__arrow--left')
      .should('not.exist');
    cy.getByData('popular-blogs')
      .children()
      .first()
      .next()
      .children()
      .children()
      .as('popularBlogs');

    cy.get('@popularBlogs').should('have.length', 10);
    cy.get('@popularBlogs')
      .first()
      .find('img')
      .should('have.attr', 'src', '/images/blog-default-background.webp');
    cy.get('@popularBlogs').first().find('h3').contains("testUser2's Blog");
    cy.get('@popularBlogs').first().find('h4').contains('— Test User 2');
    cy.get('@popularBlogs')
      .first()
      .find('p')
      .contains("This is testUser2's personal blog.");
    cy.get('@popularBlogs').first().find('h5').contains('2 followers');
    cy.get('@popularBlogs')
      .first()
      .find('a')
      .should('have.attr', 'href', '/blog/3');

    // Recent Posts
    cy.getByData('recent-posts').find('h2').contains('Recent Posts');
    cy.getByData('post-card').should('have.length', 10);
    cy.getByData('post-card').first().as('recentPostCard');
    cy.get('@recentPostCard')
      .findByData('author-info')
      .find('a')
      .should(
        'have.attr',
        'href',
        '/profile/a007ec9f-5f75-419f-8369-5ab37d7e99e6'
      );
    cy.get('@recentPostCard')
      .findByData('author-info')
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
    cy.get('@recentPostCard').find('h2').contains("Kashi754's 100d Post");
    cy.get('@recentPostCard')
      .find('.wmde-markdown')
      .should('contain', 'Lorem ipsum');
    cy.get('@recentPostCard')
      .findByData('post-card-footer')
      .find('a')
      .contains('Read More')
      .should('have.attr', 'href', '/posts/104');
    cy.get('@recentPostCard')
      .findByData('post-card-footer')
      .find('h4')
      .should('have.length', 0);
  });

  it('Links work properly', () => {
    cy.getByData('followed-blogs')
      .children()
      .first()
      .next()
      .children()
      .children()
      .first()
      .find('a')
      .click();
    cy.url().should('eq', 'http://localhost:3000/blog/3');
    cy.visit('/browse');
    cy.getByData('popular-blogs')
      .children()
      .first()
      .next()
      .children()
      .children()
      .first()
      .find('a')
      .click();
    cy.url().should('eq', 'http://localhost:3000/blog/3');
    cy.visit('/browse');

    cy.getByData('post-card').first().as('recentPostCard');

    cy.get('@recentPostCard').findByData('author-info').find('a').click();
    cy.url().should(
      'eq',
      'http://localhost:3000/profile/a007ec9f-5f75-419f-8369-5ab37d7e99e6'
    );
    cy.visit('/browse');

    cy.get('@recentPostCard')
      .findByData('post-card-footer')
      .find('a')
      .contains('Read More')
      .click();
    cy.url().should('eq', 'http://localhost:3000/posts/104');
    cy.visit('/browse');
  });

  context('Search', () => {
    it('Finds, adds, and removes tags', () => {
      cy.getByData('search-input').type('code');
      cy.getByData('tag-suggestions').children().as('tagSuggestions');
      cy.get('@tagSuggestions').should('have.length', 2);
      cy.get('@tagSuggestions').first().should('have.text', '#codecademy');
      cy.get('@tagSuggestions').last().should('have.text', '#coding');

      cy.getByData('search-input').type('{enter}');
      cy.getByData('tag-pill').should('contain', '#codecademy');

      cy.getByData('search-input').type('code');
      cy.get('@tagSuggestions').should('have.length', 1);
      cy.get('@tagSuggestions').first().should('have.text', '#coding');

      cy.getByData('search-input').type('{enter}');
      cy.getByData('tag-pill').should('have.length', 2);
      cy.getByData('tag-pill').first().should('contain', '#codecademy');
      cy.getByData('tag-pill').last().should('contain', '#coding');

      cy.getByData('search-input').type('{backspace}');
      cy.getByData('tag-pill').should('have.length', 1);
      cy.getByData('search-input').type('code');
      cy.get('@tagSuggestions').should('have.length', 1);
      cy.get('@tagSuggestions').first().should('have.text', '#coding');

      cy.getByData('search-input').clear();
      cy.getByData('tag-pill-remove').click();
      cy.getByData('tag-pill').should('have.length', 0);
      cy.getByData('search-input').type('code');
      cy.get('@tagSuggestions').should('have.length', 2);
      cy.get('@tagSuggestions').first().should('have.text', '#codecademy');
      cy.get('@tagSuggestions').last().should('have.text', '#coding');
    });

    it('Searches for posts', () => {
      cy.getByData('search-input').type('test');
      cy.getByData('search-button').click();
      cy.url().should('eq', 'http://localhost:3000/search?q=test');

      cy.visit('/browse');
      cy.getByData('search-input').type('test{enter}');
      cy.url().should('eq', 'http://localhost:3000/search?q=test');

      cy.visit('/browse');
      cy.getByData('search-input').type('code{enter}test{enter}');
      cy.url().should(
        'eq',
        'http://localhost:3000/search?q=%23codecademy+test'
      );
    });
  });

  context('Find Random Button', () => {
    it('Gives the option for a random blog or post', () => {
      cy.getByData('random-button').click();
      cy.getByData('random-blog-button').should('be.visible');
      cy.getByData('random-post-button').should('be.visible');
      cy.getByData('random-button').should('not.exist');
    });

    it('Selects a random blog', () => {
      cy.getByData('random-button').click();
      cy.getByData('random-blog-button').click();
      cy.url().should('match', /http:\/\/localhost:3000\/blog\/\d+/);
    });

    it('Selects a random post', () => {
      cy.getByData('random-button').click();
      cy.getByData('random-post-button').click();
      cy.url().should('match', /http:\/\/localhost:3000\/posts\/\d+/);
    });
  });

  context('Pagination', () => {
    it('Loads more blogs on carousel scroll', () => {
      cy.getByData('popular-blogs')
        .children()
        .first()
        .next()
        .children()
        .children()
        .as('popularBlogs');

      cy.get('@popularBlogs').should('have.length', 10);

      for (let i = 0; i < 7; i++) {
        cy.getByData('popular-blogs')
          .find('.react-multiple-carousel__arrow--right')
          .click({ force: true });
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(500);
      }

      cy.get('@popularBlogs').should('have.length', 20);
    });

    it('Loads more posts on scroll', () => {
      cy.getByData('post-card').should('have.length', 10);
      cy.scrollTo('bottom');
      cy.getByData('post-card').should('have.length', 20);
    });
  });
});
