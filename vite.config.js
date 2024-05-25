import react from '@vitejs/plugin-react';
import { vitePlugin, esbuildPlugin } from './vite-jsx-in-js';

export default function defineConfig({ mode }) {
  return {
    base: '/',
    plugins: [react(), vitePlugin(mode === 'production')],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildPlugin],
      },
    },
    server: {
      // ensure browser opens upon server start
      open: true,
      // default port
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      // run in browser
      setupFiles: './setupTests.js',
    },
  };
}
