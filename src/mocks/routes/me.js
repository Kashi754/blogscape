import { rest } from 'msw';
import { api } from '../handlers';
import { USERS, BLOGS, SOCIAL_MEDIA, POSTS } from '../mockData';

export const meHandlers = [
  rest.get(api('/me/profile'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(USERS[0]));
  }),

  rest.put(api('/me/profile'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(USERS[0]));
  }),

  rest.put(
    api('/me/password', (req, res, ctx) => {
      const { oldPassword, newPassword } = req.body;
      if (oldPassword === 'fail_test') {
        return res(ctx.status(400), ctx.body('Incorrect Password'));
      }
      if (oldPassword === newPassword) {
        return res(
          ctx.status(400),
          ctx.body('New password must be different from old password')
        );
      }

      return res(ctx.status(200), ctx.body('Password Successfully Changed'));
    })
  ),

  rest.get('/me/blog', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(BLOGS[0]));
  }),

  rest.put('/me/blog', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(BLOGS[0]));
  }),

  rest.get('/me/following', (req, res, ctx) => {
    const followedBlogs = BLOGS.filter((blog) => blog.following);
    return res(ctx.status(200), ctx.json(followedBlogs));
  }),

  rest.put('/me/following', (req, res, ctx) => {
    const { blogIds, following } = req.body;
    BLOGS.forEach((blog) => {
      if (blogIds.includes(blog.id)) {
        blog.following = following;
      }
    });
    return res(
      ctx.status(200),
      ctx.json([
        BLOGS.map((blog) => ({
          id: blog.id,
        })),
      ])
    );
  }),

  rest.put('social-media', (req, res, ctx) => {
    if (req.body.github === 'fail_test') {
      return res(
        ctx.status(400),
        ctx.body('Please provide a valid url for Github')
      );
    }
    return res(ctx.status(200), ctx.json(SOCIAL_MEDIA));
  }),

  rest.get('/me/posts', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(POSTS.filter((post) => post.blogId === 1))
    );
  }),
];
