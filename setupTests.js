/* eslint-disable no-undef */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { server } from './src/mocks/server';

beforeAll(() => server.listen());

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => server.close());
