import { screen, within } from '@testing-library/react';
import { renderAppWithMemoryRouter } from '../../utils/testUtils';

describe('Root Page', () => {
  it('Should render without crashing', async () => {
    renderAppWithMemoryRouter();
    const header = await screen.findAllByRole('heading', { name: 'BlogScape' });
    expect(header).toHaveLength(3);
  });

  it('should render logged out nav when not logged in', async () => {
    renderAppWithMemoryRouter();
    const loginLink = await screen.findByRole('link', { name: 'Login' });
    expect(loginLink).toBeInTheDocument();
  });

  it('should render logged in nav when logged in', async () => {
    renderAppWithMemoryRouter(['/'], {
      loggedIn: true,
    });

    const logoutLink = await screen.findByRole('link', { name: 'Logout' });
    expect(logoutLink).toBeInTheDocument();
  });

  it('should render footer with links', async () => {
    renderAppWithMemoryRouter();
    // ensure footer element renders
    const footer = await screen.findByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // ensure links are rendered inside of the footer
    const footerLinks = within(footer).getAllByRole('link');
    expect(footerLinks).toHaveLength(4);

    // ensure links have correct href
    expect(footerLinks[0]).toHaveAttribute('href', 'https://x.com/arigorn_15');
    expect(footerLinks[1]).toHaveAttribute(
      'href',
      'https://facebook.com/tj.petersen.7'
    );
    expect(footerLinks[2]).toHaveAttribute('href', 'https://kashi754.com');
    expect(footerLinks[3]).toHaveAttribute(
      'href',
      'https://github.com/Kashi754'
    );
  });
});
