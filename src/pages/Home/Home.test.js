import { screen, within } from '@testing-library/react';
import { renderAppWithMemoryRouter } from '../../utils/testUtils';
import userEvent from '@testing-library/user-event';

describe('Home Page', () => {
  it('Should render without crashing', async () => {
    renderAppWithMemoryRouter(['/home'], { loggedIn: true });
    const header = await screen.findByRole('heading', {
      name: 'Your Blog Posts',
    });
    expect(header).toBeInTheDocument();
  });

  it('should render a button to add a new post', async () => {
    renderAppWithMemoryRouter(['/home'], { loggedIn: true });
    const addPostButton = await screen.findByRole('button', {
      name: 'New Blog Post',
    });

    expect(addPostButton).toBeInTheDocument();
  });
});
