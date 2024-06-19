describe('Profile Page', () => {
  beforeEach(() => {
    cy.resetDatabase();
    cy.reload(true);
    cy.login('kashi754', 'Password_123');
    cy.visit('/profile');
  });

  it('Loads the profile page and shows the correct elements', () => {
    cy.getByData('profile-heading').contains('kashi754');
    cy.getByData('profile-picture-section')
      .find('img')
      .should('have.attr', 'src', '/images/default.png');
    cy.getByData('followers').contains('2 Followers');
    cy.getByData('profile-item').should('have.length', 2);
    cy.getByData('profile-blog-link').should('have.attr', 'href', '/blog/1');
    cy.getByData('blog-title').contains("Kashi754's Blog");
    cy.getByData('blog-description').contains(
      "This is Kashi754's personal blog."
    );
    cy.getByData('social-media-icon').should('have.length', 7);
    cy.getByData('open-modal').contains('Edit Profile');
  });

  it('Links work properly', () => {
    cy.getByData('profile-blog-link').click();
    cy.url().should('eq', 'http://localhost:3000/blog/1');
    cy.visit('/profile');
    cy.getByData('social-media-icon')
      .first()
      .then(($a) => {
        expect($a).to.have.attr('href', 'https://facebook.com/arigorn_15');
        $a.attr('target', '_self');
      })
      .click();
    cy.url().should('not.match', /^http:\/\/localhost:3000\/.*/);
  });

  context('Edit Profile Modal', () => {
    it('Is not available when viewing another users profile', () => {
      cy.visit('/profile/3b588c33-182f-45ae-9cea-994f83020515');
      cy.getByData('open-modal').should('not.exist');
    });

    it('Is available when viewing your own profile', () => {
      cy.visit('/profile');
      cy.getByData('open-modal').should('exist');
    });

    it('Opens and closes the modal when clicked', () => {
      cy.getByData('close-modal').should('not.exist');
      cy.getByData('open-modal').click();
      cy.getByData('close-modal').should('exist');
      cy.getByData('close-modal').click();
      cy.getByData('close-modal').should('not.exist');
    });

    context('Edit Profile Form', () => {
      beforeEach(() => {
        cy.getByData('open-modal').click();
      });

      it('Displays when first opening the modal', () => {
        cy.getByData('image-input-button').contains('Image...');
        cy.getFormField('display_name').should(
          'have.attr',
          'placeholder',
          'kashi754'
        );
        cy.getFormField('display_name')
          .siblings('label')
          .should('contain', 'Display Name');
        cy.getFormField('email').should(
          'have.attr',
          'placeholder',
          'arigorn15@gmail.com'
        );
        cy.getFormField('email')
          .siblings('label')
          .should('contain', 'Email address');
        cy.getFormField('website').should('contain', '');
        cy.getFormField('website')
          .siblings('label')
          .should('contain', 'Website');
        cy.get('.select__single-value').contains('United States');
      });

      it('Changes profile information when submitted', () => {
        cy.getFormField('display_name').clear();
        cy.getFormField('display_name').type('Test Display Name');
        cy.getFormField('email').clear();
        cy.getFormField('email').type('test@test.com');
        cy.getFormField('website').type('http://www.test.com');
        cy.get('.async-select').click();
        cy.get('.select__menu')
          .children()
          .first()
          .find('div')
          .contains('France')
          .click();
        cy.get('.select__single-value').should('contain', 'France');
        cy.getByData('save-button').click();
        cy.getByData('close-modal').click();
        cy.getByData('profile-heading').contains('Test Display Name');
        cy.getByData('profile-item').should('have.length', 4);

        cy.getByData('profile-item').first().as('profileItem');
        cy.get('@profileItem').should('contain', 'test@test.com');
        cy.get('@profileItem').next().should('contain', 'kashi754');
        cy.get('@profileItem')
          .next()
          .next()
          .should('contain', 'http://www.test.com');
        cy.get('@profileItem').next().next().next().should('contain', 'France');
      });

      it('Fails with invalid display name', () => {
        cy.getFormField('display_name').clear();
        cy.getFormField('display_name').type('test*fail');
        cy.getByData('save-button').click();
        cy.getByData('invalid-display-name').should('be.visible');
        cy.getByData('invalid-display-name').should(
          'contain',
          'Please enter a valid display name.'
        );
      });

      it('Fails with invalid email', () => {
        cy.getFormField('email').clear();
        cy.getFormField('email').type('testfail.fail');
        cy.getByData('save-button').click();
        cy.getByData('invalid-email').should('be.visible');
        cy.getByData('invalid-email').should(
          'contain',
          'Please enter a valid email address.'
        );
      });

      it('Fails with invalid website', () => {
        cy.getFormField('website').clear();
        cy.getFormField('website').type('testfail.fail');
        cy.getByData('save-button').click();
        cy.getByData('invalid-website').should('be.visible');
        cy.getByData('invalid-website').should(
          'contain',
          'Please enter a valid website!'
        );
      });
    });

    context('Change Password Form', () => {
      beforeEach(() => {
        cy.getByData('open-modal').click();
        cy.get('#edit-profile-tabs-tab-password').click();
      });

      it('Displays form when opened', () => {
        cy.getFormField('oldPassword').should('have.attr', 'type', 'password');
        cy.getFormField('oldPassword')
          .parent()
          .parent()
          .children('label')
          .should('contain', 'Old Password:');
        cy.getFormField('newPassword').should('have.attr', 'type', 'password');
        cy.get('#show-password').should('be.visible');
        cy.getFormField('newPassword')
          .siblings('label')
          .should('contain', 'New Password:');
        cy.getFormField('confirmPassword').should(
          'have.attr',
          'type',
          'password'
        );
        cy.getFormField('confirmPassword')
          .siblings('label')
          .should('contain', 'Confirm New Password:');
      });

      it('Changes password when submitted', () => {
        cy.getFormField('oldPassword').type('Password_123');
        cy.getFormField('newPassword').type('Password_321');
        cy.getFormField('confirmPassword').type('Password_321');
        cy.getByData('save-button').click();
        cy.getByData('password-success').should(
          'contain',
          'Password Successfully Changed'
        );
        cy.getByData('close-modal').click();
        cy.getByData('logged-in-nav').find('a').contains('Logout').click();
        cy.visit('/login');
        cy.getFormField('username').type('kashi754');
        cy.getFormField('password').type('Password_321');
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/home');
        cy.get('h2').should('contain', 'Your Blog Posts');
        Cypress.session.clearAllSavedSessions();
      });

      it('Fails with invalid old password', () => {
        cy.getFormField('oldPassword').type('Password_321');
        cy.getFormField('newPassword').type('Password_456');
        cy.getFormField('confirmPassword').type('Password_456');
        cy.getByData('save-button').click();
        cy.getByData('invalid-old-password').should('be.visible');
        cy.getByData('invalid-old-password').should(
          'contain',
          'Incorrect Password'
        );
      });

      it('Fails when new password matches old password', () => {
        cy.getFormField('oldPassword').type('Password_123');
        cy.getFormField('newPassword').type('Password_123');
        cy.getFormField('confirmPassword').type('Password_123');
        cy.getByData('save-button').click();
        cy.getByData('invalid-old-password').should('be.visible');
        cy.getByData('invalid-old-password').should(
          'contain',
          'New password must be different from old password'
        );
      });

      it('Fails when new password does not match pattern (?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}', () => {
        cy.getFormField('oldPassword').type('Password_123');
        cy.getFormField('newPassword').type('Pass123');
        cy.getFormField('confirmPassword').type('Pass123');
        cy.getByData('save-button').click();
        cy.getByData('invalid-password').should('be.visible');
        cy.getByData('invalid-password').should(
          'contain',
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
        );
      });

      it('Fails when new passwords do not match', () => {
        cy.getFormField('oldPassword').type('Password_123');
        cy.getFormField('newPassword').type('Password_321');
        cy.getFormField('confirmPassword').type('Password_3214');
        cy.getByData('save-button').click();
        cy.getByData('invalid-confirm-password').should('be.visible');
        cy.getByData('invalid-confirm-password').should(
          'contain',
          'Passwords do not match'
        );
      });
    });

    context('Edit Social Media Form', () => {
      beforeEach(() => {
        cy.getByData('open-modal').click();
        cy.get('#edit-profile-tabs-tab-social-media').click();
      });

      it('Displays form when opened', () => {
        // Checkboxes
        cy.get('input[type="checkbox"]').should('have.length', 8);
        cy.get('input[type="checkbox"]').eq(0).should('be.checked');
        cy.get('input[type="checkbox"]').eq(1).should('be.checked');
        cy.get('input[type="checkbox"]').eq(2).should('be.checked');
        cy.get('input[type="checkbox"]').eq(3).should('be.checked');
        cy.get('input[type="checkbox"]').eq(4).should('be.checked');
        cy.get('input[type="checkbox"]').eq(5).should('be.checked');
        cy.get('input[type="checkbox"]').eq(6).should('be.checked');
        cy.get('input[type="checkbox"]').eq(7).should('not.be.checked');

        // Inputs
        cy.getFormField('Facebook').should('have.value', 'arigorn_15');
        cy.getFormField('Twitter').should('have.value', 'tj.petersen.7');
        cy.getFormField('Instagram').should('have.value', 'tj_petersen/');
        cy.getFormField('Tiktok').should('have.value', '@kashi754');
        cy.getFormField('Youtube').should(
          'have.value',
          'channel/UCigqp32mhKab61Xjpbpjf9g'
        );
        cy.getFormField('Github').should('have.value', 'Kashi754');
        cy.getFormField('Twitch').should('have.value', 'kashi754');
        cy.getFormField('Discord').should('not.be.visible');
      });

      it('Changes social media information when submitted', () => {
        cy.getFormField('Facebook').clear();
        cy.getFormField('Facebook').type('kashi754');
        cy.get('input[type="checkbox"]').eq(1).click();
        cy.get('input[type="checkbox"]').eq(2).click();
        cy.get('input[type="checkbox"]').eq(3).click();
        cy.get('input[type="checkbox"]').eq(4).click();
        cy.get('input[type="checkbox"]').eq(5).click();
        cy.get('input[type="checkbox"]').eq(6).click();
        cy.getByData('save-button').click();
        cy.getByData('close-modal').click();
        cy.getByData('social-media-icon').should('have.length', 1);
        cy.getByData('social-media-icon').should(
          'have.attr',
          'href',
          'https://www.facebook.com/kashi754'
        );
      });

      it('Fails when a blank value is submitted', () => {
        cy.getFormField('Facebook').clear();
        cy.getByData('save-button').click();
        cy.getByData('invalid-path').should('be.visible');
        cy.getByData('invalid-path').should(
          'contain',
          'Please enter a valid path!'
        );
      });
    });

    context.only('Edit Blog Form', () => {
      beforeEach(() => {
        cy.getByData('open-modal').click();
        cy.get('#edit-profile-tabs-tab-blog').click();
      });

      it('Displays form when opened', () => {
        cy.getByData('image-input-button').contains('Image...');
        cy.getFormField('title').should('have.value', "Kashi754's Blog");
        cy.getFormField('title')
          .siblings('label')
          .should('contain', 'Blog Title');
        cy.get('textarea[name="description"]').should(
          'have.value',
          "This is Kashi754's personal blog."
        );
        cy.get('textarea[name="description"]')
          .siblings('label')
          .should('contain', 'Blog Description');
      });

      it('Changes blog information when submitted', () => {
        cy.getFormField('title').invoke('val', '');
        cy.getFormField('title').type('Test Blog');
        cy.get('textarea[name="description"]').invoke('val', '');
        cy.get('textarea[name="description"]').type(
          'This is a test of changing the description.'
        );
        cy.getByData('save-button').click();
        cy.getByData('close-modal').click();
        cy.getByData('blog-title').should('contain', 'Test Blog');
        cy.getByData('blog-description').should(
          'contain',
          'This is a test of changing the description.'
        );
      });

      it('Fails when the blog title does not match pattern ^[a-zA-Z0-9 .,!?\'"\\-]+$', () => {
        cy.getFormField('title').invoke('val', '');
        cy.getFormField('title').type('test*fail');
        cy.getByData('save-button').click();
        cy.getByData('invalid-title').should('be.visible');
        cy.getByData('invalid-title').should(
          'contain',
          'Please use only letters, numbers, spaces, and common punctuation.'
        );
      });

      it('Properly sanitizes blog description', () => {
        cy.get('textarea[name="description"]').invoke('val', '');
        cy.get('textarea[name="description"]').type('test*fail');
        cy.getByData('save-button').click();
        cy.getByData('close-modal').click();
        cy.getByData('blog-description').should('contain', 'testfail');
      });
    });
  });
});
