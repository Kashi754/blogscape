describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/auth/logout',
      failOnStatusCode: false,
    });
  });

  it('Loads the login page and shows the correct elements', () => {
    cy.get('h2').contains('Choose a Login Method');

    cy.get('input[name="username"]').should(
      'have.attr',
      'placeholder',
      'Username'
    );
    cy.get('input[name="username"]')
      .siblings('label')
      .should('contain', 'Username');

    cy.get('input[name="password"]').should(
      'have.attr',
      'placeholder',
      'Password'
    );

    cy.get('button[type="submit"]').should('contain', 'Login');
    cy.get('button').eq(2).contains('Google');
    cy.getByData('login-divider').find('div').contains('OR');
  });

  it('Displays alternate title when at mobile size', () => {
    cy.viewport('iphone-6+');
    cy.get('h2').contains('Login');
  });

  context('Login form', () => {
    it('Shows password when clicked', () => {
      cy.get('input[name="password"]').type('password');
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
      cy.getByData('show-password').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'text');
      cy.getByData('hide-password').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });

    it('Should login successfully', () => {
      cy.get('input[name="username"]').type('kashi754');
      cy.get('input[name="password"]').type('Password_123');
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/home');
      cy.get('h2').should('contain', 'Your Blog Posts');
      cy.getCookie('connect.sid').should('exist');
      cy.getCookie('user').should('exist');
    });

    it('Should fail login when credentials are incorrect', () => {
      cy.get('input[name="username"]').type('kashi754');
      cy.get('input[name="password"]').type('Password_321');
      cy.get('button[type="submit"]').click();
      cy.get('h2').contains('Login');
      cy.url().should('eq', 'http://localhost:3000/login');
      cy.getByData('login-error').contains('Invalid username or password');
    });

    it("Should fail when password does not match pattern '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'", () => {
      cy.get('input[name="username"]').type('kashi754');
      // Too short
      cy.get('input[name="password"]').type('Pass123');
      cy.get('button[type="submit"]').click();
      cy.getByData('login-error').contains('Invalid username or password');

      // No lowercase
      cy.get('input[name="password"]').clear();
      cy.get('input[name="password"]').type('PASSWORD123');
      cy.get('button[type="submit"]').click();
      cy.getByData('login-error').contains('Invalid username or password');

      // No uppercase
      cy.get('input[name="password"]').clear();
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.getByData('login-error').contains('Invalid username or password');

      // No number
      cy.get('input[name="password"]').clear();
      cy.get('input[name="password"]').type('Password');
      cy.get('button[type="submit"]').click();
      cy.getByData('login-error').contains('Invalid username or password');
    });

    it('Should fail when username does not match pattern "^[a-zA-Z0-9_\\-@!.+]+$"', () => {
      // No special characters
      cy.get('input[name="username"]').type('kashi*754');
      cy.get('input[name="password"]').type('Password_123');
      cy.get('button[type="submit"]').click();
      cy.getByData('login-error').contains('Invalid username or password');

      // Not blank
      cy.get('input[name="username"]').clear();
      cy.get('button[type="submit"]').click();
      cy.getByData('login-error').contains('Invalid username or password');
    });
  });

  context('Google Login', () => {
    it('Should login successfully', () => {
      // TODO: Implement Google login
      cy.getByData('google-login');
      expect(true).to.equal(false);
    });
  });
});
