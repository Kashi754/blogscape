describe('New Post Page', () => {
  beforeEach(() => {
    cy.login('kashi754', 'Password_123');
    cy.visit('/new');
  });

  it('Loads the new post page and shows the correct elements', () => {
    cy.url().should('eq', 'http://localhost:3000/new');
    cy.get('h2').contains('Create New Blog Post');
    cy.getByData('title-input').should(
      'have.attr',
      'placeholder',
      'Post Title'
    );
    cy.getByData('subtitle-input').should(
      'have.attr',
      'placeholder',
      'Post Subtitle'
    );
    cy.getByData('file-info').contains('No image selected for upload');
    cy.get('.wmde-markdown-container').should('be.visible');
    cy.get('.basic-multi-select').should('be.visible');
    cy.getByData('submit-button').contains('Submit');
  });

  context('Text Error Messages', () => {
    it('should fail when title is not valid', () => {
      cy.get('input[name="title"]').type('Test Title OR 1=1');
      cy.get('input[name="subtitle"]').type('Test Subtitle');
      cy.get('.cm-activeLine').type('Test Content');
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox').children().first().click();
      cy.getByData('submit-button').click();
      cy.getByData('title-feedback').should(
        'have.text',
        'Please use only letters, numbers, spaces, and common punctuation for this field.'
      );
    });

    it('should fail when subtitle is not valid', () => {
      cy.get('input[name="title"]').type('Test Title');
      cy.get('input[name="subtitle"]').type('Test Subtitle OR 1=1');
      cy.get('.cm-activeLine').type('Test Content');
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox').children().first().click();
      cy.getByData('submit-button').click();
      cy.getByData('subtitle-feedback').should(
        'have.text',
        'Please use only letters, numbers, spaces, and common punctuation for this field.'
      );
    });

    it('should fail when body is empty', () => {
      cy.get('input[name="title"]').type('Test Title');
      cy.get('input[name="subtitle"]').type('Test Subtitle');
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox').children().first().click();
      cy.getByData('submit-button').click();
      cy.getByData('body-feedback').should(
        'have.text',
        'Please add a body to your blog post.'
      );
    });
  });

  context('Image Upload', () => {
    it('Should show error when image is not correct size', () => {
      cy.getByData('image-input-button').selectFile(
        'cypress/fixtures/large.jpg'
      );
      cy.getByData('image-input-feedback').should(
        'have.text',
        'Please select a file 250KB or less'
      );
    });

    it('Should show error when file type is not correct', () => {
      cy.getByData('image-input-button').selectFile({
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'file.txt',
        mimeType: 'text/plain',
        lastModified: Date.now(),
      });
      cy.getByData('image-input-feedback').should(
        'have.text',
        'Please select an image file'
      );
    });

    it('Should upload image', () => {
      cy.getByData('image-input-button').selectFile(
        'cypress/fixtures/test.jpg'
      );
      cy.getByData('file-info').should('have.text', 'File: test.jpg (5.0 KB)');
      cy.getByData('preview-image').should('have.attr', 'src');
    });
  });

  context('Tag Select', () => {
    it('Should select tags', () => {
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox').children().first().click();
      cy.get('.select__multi-value').should('have.text', '#codecademy');
      cy.get('.basic-multi-select').type('html');
      cy.get('#react-select-3-listbox').children().first().click();
      cy.get('.select__multi-value').should('have.length', 2);
      cy.get('.select__multi-value').first().should('have.text', '#codecademy');
      cy.get('.select__multi-value')
        .first()
        .next()
        .should('have.text', '#html');
    });

    it('Should remove tags', () => {
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox').children().first().click();
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox').children().first().click();
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox').children().first().click();
      cy.get('.select__multi-value').should('have.length', 3);
      cy.get('.select__multi-value')
        .first()
        .find('.select__multi-value__remove')
        .click();
      cy.get('.select__multi-value').should('have.length', 2);
      cy.get('.basic-multi-select').type('{backspace}');
      cy.get('.select__multi-value').should('have.length', 1);
    });

    it('Should add new tags', () => {
      cy.resetDatabase();
      cy.reload(true);
      cy.get('.basic-multi-select').click();
      cy.get('#react-select-3-listbox')
        .children()
        .then(($selectDropdown) => {
          expect($selectDropdown).to.have.length(6);
          cy.get('.basic-multi-select').type('newtag{enter}');
          cy.get('.select__multi-value').first().should('have.text', '#newtag');
          cy.get('.basic-multi-select').type('{backspace}');
          cy.get('#react-select-3-listbox').children().should('have.length', 7);
        });
    });
  });

  it.only('Should show markdown preview', () => {
    cy.get('.cm-activeLine').type('# Test Content');
    cy.getByData('show-preview').click();
    cy.get('.wmde-markdown').should('be.visible');
    cy.get('#user-content-test-content').should('have.text', 'Test Content');
    cy.getByData('hide-preview').click();
    cy.get('.wmde-markdown').should('not.be.visible');
  });

  it('Should submit new post', () => {
    cy.resetDatabase();
    cy.reload(true);
    cy.get('input[name="title"]').type('Test Title');
    cy.get('input[name="subtitle"]').type('Test Subtitle');
    cy.get('.cm-activeLine').type('Test Content');
    cy.get('.basic-multi-select').click();
    cy.get('#react-select-3-listbox').children().first().click();
    cy.getByData('submit-button').click();
    cy.url().should('eq', 'http://localhost:3000/home');
    cy.getByData('home-post-card').first().as('homePostCard');
    cy.get('@homePostCard').find('h3').should('have.text', 'Test Title');
    cy.get('@homePostCard').find('h4').should('have.text', 'Test Subtitle');
    cy.get('@homePostCard').find('h5').should('have.text', '0 comments');
    cy.get('@homePostCard')
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
  });
});
