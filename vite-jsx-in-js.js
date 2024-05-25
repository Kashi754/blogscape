import fs from 'node:fs/promises';
import url from 'node:url';
import * as vite from 'vite';

// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// NOTE: Keep trailing slash to use resulting path in prefix matching.
const srcDir = url.fileURLToPath(new URL('./src/', import.meta.url));
// NOTE: Since ESBuild evaluates this regex using Go's engine, it is not
// clear whether the JS-specific regex escape logic is sound.
const srcJsRegex = new RegExp(`^${escapeRegExp(srcDir)}.*\\.js$`);

export const vitePlugin = (isProd) => ({
  name: 'js-in-jsx',
  enforce: 'pre',
  async transform(code, id) {
    // Ignore Rollup virtual modules.
    if (id.startsWith('\0')) {
      return;
    }
    // Strip off any "proxy id" component before testing against path.
    // See: https://github.com/vitejs/vite-plugin-react-swc/blob/a1bfc313612a8143a153ce87f52925059459aeb2/src/index.ts#L89
    // See: https://rollupjs.org/plugin-development/#inter-plugin-communication
    [id] = id.split('?');
    if (id.startsWith(srcDir) && id.endsWith('.js')) {
      return await vite.transformWithEsbuild(code, id, {
        loader: 'jsx',
        jsx: 'automatic',
        jsxDev: !isProd,
      });
    }
  },
});

export const esbuildPlugin = {
  name: 'jsx-loader',
  setup(build) {
    // See: https://github.com/vitejs/vite/discussions/3448#discussioncomment-749919
    build.onLoad({ filter: srcJsRegex }, async (args) => {
      return {
        contents: await fs.readFile(args.path),
        loader: 'jsx',
      };
    });
  },
};
