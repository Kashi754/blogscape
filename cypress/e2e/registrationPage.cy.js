describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('Loads the registration page and shows the correct elements', () => {
    cy.get('h2').contains('Create Your Account');
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
    cy.get('input[name="password"]').should(
      'have.attr',
      'placeholder',
      'Password'
    );
    cy.get('input[name="confirmPassword"]').should(
      'have.attr',
      'placeholder',
      'Confirm Password'
    );
    cy.get('input[name="blogTitle').should(
      'have.attr',
      'placeholder',
      'Blog Title'
    );
    cy.get('input[name="email"]').should(
      'have.attr',
      'placeholder',
      'name@example.com'
    );
    cy.get('input[name="email"]').siblings('label').should('contain', 'Email');
    cy.get('button[type="submit"]').should('contain', 'Submit');
  });

  it('Should show password when clicked', () => {
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('input[name="confirmPassword"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').should(
      'have.attr',
      'type',
      'password'
    );

    cy.getByData('show-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('input[name="confirmPassword"]').should('have.attr', 'type', 'text');

    cy.getByData('hide-password').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('input[name="confirmPassword"]').should(
      'have.attr',
      'type',
      'password'
    );
  });

  it('Should register successfully', () => {
    cy.resetDatabase();
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="username"]').type('registerTest');
    cy.get('input[name="blogTitle"]').type('Test Blog');
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').type('Password_123');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('Should fail when email is not valid', () => {
    cy.get('input[name="email"]').type('kashi754');
    cy.get('input[name="username"]').type('kashi754');
    cy.get('input[name="blogTitle"]').type('Test Blog');
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').type('Password_123');
    cy.get('button[type="submit"]').click();
    cy.getByData('invalid-email').contains(
      'Please enter a valid email address.'
    );
  });

  it('Should fail when username does not match pattern "^[a-zA-Z0-9_\\-@!.+]+$"', () => {
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="username"]').type('kashi*754');
    cy.get('input[name="blogTitle"]').type('Test Blog');
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').type('Password_123');
    cy.get('button[type="submit"]').click();
    cy.getByData('invalid-username').contains(
      'Please enter a valid username (letters and numbers only).'
    );
  });

  it('Should fail when username or email already exist', () => {
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="username"]').type('kashi754');
    cy.get('input[name="blogTitle"]').type('Test Blog');
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').type('Password_123');
    cy.get('button[type="submit"]').click();
    cy.getByData('invalid-username').contains(
      'User with that username or email already exists'
    );

    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type('arigorn15@gmail.com');
    cy.get('input[name="username"]').clear();
    cy.get('input[name="username"]').type('registerTest');
    cy.get('button[type="submit"]').click();
    cy.getByData('invalid-username').contains(
      'User with that username or email already exists'
    );
  });

  it('Should fail when blog title does not match pattern "^[a-zA-Z0-9 .,!?\'"\\-]+$"', () => {
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="username"]').type('kashi754');
    cy.get('input[name="blogTitle"]').type('kashi*754');
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').type('Password_123');
    cy.get('button[type="submit"]').click();
    cy.getByData('invalid-blog-title').contains(
      'Please use only letters, numbers, spaces, and common punctuation.'
    );
  });

  it('Should fail when password does not match pattern "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"', () => {
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="username"]').type('kashi754');
    cy.get('input[name="blogTitle"]').type('Test Blog');
    cy.get('input[name="password"]').type('Pass123');
    cy.get('input[name="confirmPassword"]').type('Pass123');
    cy.get('button[type="submit"]').click();
    cy.getByData('invalid-password').contains(
      'Password must contain at least 8 characters, including at least one number, one lowercase and one uppercase letter.'
    );
  });

  it('Should fail when passwords do not match', () => {
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="username"]').type('kashi754');
    cy.get('input[name="blogTitle"]').type('Test Blog');
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').type('Password_1234');
    cy.get('button[type="submit"]').click();
    cy.getByData('invalid-passwords').contains('Passwords do not match');
  });

  it('Should show error message on server error', () => {
    cy.intercept('POST', 'http://localhost:5000/api/v1/auth/register', {
      statusCode: 500,
    }).as('server-error');
    cy.get('input[name="email"]').type('user@test.com');
    cy.get('input[name="username"]').type('kashi754');
    cy.get('input[name="blogTitle"]').type('Test Blog');
    cy.get('input[name="password"]').type('Password_123');
    cy.get('input[name="confirmPassword"]').type('Password_123');
    cy.get('button[type="submit"]').click();
    cy.wait('@server-error').its('response.statusCode').should('eq', 500);
    cy.getByData('invalid-passwords').contains('Something went wrong');
  });
});
