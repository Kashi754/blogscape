describe('Post Page', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.reload(true);

    cy.login('kashi754', 'Password_123');
    cy.visit('/posts/1');
  });

  it('Loads the post page and shows the correct elements', () => {
    // Post Hero
    cy.get('.main-post').findByData('post-image-container').should('not.exist');
    cy.getByData('post-date').should('be.visible');
    cy.getByData('main-post-info')
      .find('h2')
      .contains("Kashi754's first post!");
    cy.getByData('main-post-info')
      .find('h3')
      .contains("Thank you for reading Kashi754's first post!");
    cy.getByData('main-post-tag').should('have.length', 4);
    cy.getByData('main-post-footer').find('a').should('not.exist');
    cy.get('.profile-link')
      .should('have.attr', 'href')
      .and(
        'match',
        /\/profile\/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/
      );
    cy.get('.profile-link')
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
    cy.get('.profile-link').find('h3').contains('Written by: kashi754');
    cy.getByData('blog-link')
      .contains("Kashi754's Blog")
      .should('have.attr', 'href', '/blog/1');

    // Post Body
    cy.getByData('post-body').find('.wmde-markdown').contains('Lorem ipsum');

    // Post Comments
    cy.getByData('comments-header').contains('Comments');
    cy.getByData('add-comment-button').contains('Add Comment');
    cy.getByData('post-comments')
      .findByData('add-comment-form')
      .should('not.exist');
    cy.getByData('comment').should('have.length', 2);
    cy.getByData('comment')
      .first()
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
    cy.getByData('comment-header').first().find('a').contains('Test User 2');
    cy.getByData('comment-date').first().should('be.visible');
    cy.getByData('comment-body').first().contains('I hate it!');
    cy.getByData('reply-button').contains('Reply');
    cy.getByData('show-replies-button').contains('View 1 Reply');
    cy.getByData('comment-container').find('replies').should('not.exist');
  });

  it('Links work properly', () => {
    cy.get('.profile-link').click();
    cy.url().should(
      'match',
      /http:\/\/localhost:3000\/profile\/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/
    );
    cy.visit('/posts/1');

    cy.getByData('blog-link').click();
    cy.url().should('eq', 'http://localhost:3000/blog/1');
    cy.visit('/posts/1');

    cy.getByData('comment-header').first().find('a').click();
    cy.url().should(
      'match',
      /http:\/\/localhost:3000\/profile\/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/
    );
  });

  it('Can add a new comment', () => {
    cy.getByData('post-comments')
      .findByData('add-comment-form')
      .should('not.exist');

    cy.getByData('add-comment-button').click();
    cy.getByData('post-comments')
      .findByData('add-comment-form')
      .should('be.visible');

    cy.getByData('comment-input').type('test comment');
    cy.getByData('cancel-comment-button').click();
    cy.getByData('post-comments')
      .findByData('add-comment-form')
      .should('not.exist');

    cy.getByData('add-comment-button').click();
    cy.getByData('post-comments')
      .findByData('add-comment-form')
      .should('be.visible');
    cy.getByData('comment-input').type('test comment 2');

    cy.getByData('submit-comment-button').click();
    cy.getByData('post-comments')
      .findByData('add-comment-form')
      .should('not.exist');

    cy.getByData('comment').should('have.length', 3);
    cy.getByData('comment')
      .first()
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
    cy.getByData('comment-header').first().find('a').contains('kashi754');
    cy.getByData('comment-date').first().should('be.visible');
    cy.getByData('comment-body').first().should('have.text', 'test comment 2');
    cy.getByData('reply-button').contains('Reply');
    cy.get('.comment-buttons')
      .first()
      .findByData('show-replies-button')
      .should('not.exist');
  });

  it('Shows and hides replies', () => {
    cy.getByData('comment-container')
      .first()
      .findByData('replies')
      .should('not.exist');
    cy.getByData('show-replies-button').first().click();

    cy.getByData('comment-container')
      .first()
      .getByData('replies')
      .should('be.visible');

    cy.getByData('reply').should('have.length', 1);
    cy.getByData('reply')
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
    cy.getByData('reply')
      .findByData('comment-header')
      .first()
      .find('a')
      .contains('kashi754');
    cy.getByData('reply')
      .findByData('comment-date')
      .first()
      .should('be.visible');
    cy.getByData('reply')
      .findByData('comment-body')
      .first()
      .should('have.text', 'Why do you hate me!');

    cy.getByData('reply').findByData('replies').should('not.exist');
    cy.getByData('reply').findByData('show-replies-button').click();
    cy.getByData('reply')
      .findByData('comment-container')
      .getByData('replies')
      .should('be.visible');

    cy.getByData('reply').should('have.length', 2);

    cy.getByData('show-replies-button').first().click();
    cy.getByData('comment-container').find('replies').should('not.exist');
  });

  it.only('Can add a reply', () => {
    cy.getByData('comment-container').first().as('firstComment');
    cy.get('@firstComment')
      .findByData('show-replies-button')
      .should('have.text', 'View 1 Reply');

    cy.get('@firstComment').findByData('reply-button').click();
    cy.getByData('comment-input').type('test reply');
    cy.getByData('submit-comment-button').click();
    cy.getByData('show-replies-button')
      .first()
      .should('have.text', 'View 2 Replies');

    cy.get('@firstComment').findByData('show-replies-button').click();
    cy.get('@firstComment').findByData('reply').should('have.length', 2);
    cy.get('@firstComment')
      .findByData('reply')
      .first()
      .findByData('comment-body')
      .should('have.text', 'test reply');
  });
});
