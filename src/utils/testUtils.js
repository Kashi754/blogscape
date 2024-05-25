import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
// As a basic setup, import your same slice reducers
import { setupStore } from '../app/Store';
import routes from '../app/routes';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function appRoutes() {
  const store = setupStore({});
  return routes(store);
}

export function renderAppWithMemoryRouter(
  initialEntries = ['/'],
  { preloadedState = {}, loggedIn, ...renderOptions } = {}
) {
  if (loggedIn) {
    preloadedState.auth = {
      authenticated: true,
      expiry: 100000000000000,
      userId: 1,
      blogId: 1,
    };
  } else {
    preloadedState.auth = {
      authenticated: false,
      expiry: 0,
      userId: null,
      blogId: null,
    };
  }
  const store = setupStore(preloadedState || {});
  const AppRoutes = routes(store);
  function App(children) {
    return (
      <Provider store={store}>
        <RouterProvider
          router={createMemoryRouter(
            AppRoutes,
            (initialEntries = { initialEntries })
          )}
        />
      </Provider>
    );
  }

  return { store, ...render(<App />, renderOptions) };
}
