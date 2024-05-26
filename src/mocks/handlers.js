import { authHandlers } from './routes/auth';
import { blogHandlers } from './routes/blogs';
import { meHandlers } from './routes/me';
import { postsHandlers } from './routes/posts';
import { tagsHandlers } from './routes/tags';

export function api(route) {
  return `http://localhost:5000/api/v1${route}`;
}

export const handlers = [
  ...authHandlers,
  ...meHandlers,
  ...tagsHandlers,
  ...blogHandlers,
  ...postsHandlers,
  ...tagsHandlers,
];
