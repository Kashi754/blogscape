import { rest } from 'msw';
import { api } from '../handlers';
import { BLOGS } from '../mockData';

export const blogHandlers = [
  rest.get(api('/blogs'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(BLOGS));
  }),

  rest.get(api('/blogs/search'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(BLOGS));
  }),

  rest.get(api('/blogs/popular'), (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    if (query === 'fail_test') {
      return res(
        ctx.status(404),
        ctx.json([
          {
            word: 'fail',
            similarity: 0.5,
          },
          {
            word: 'test',
            similarity: 0.3,
          },
        ])
      );
    }
    return res(ctx.status(200), ctx.json(BLOGS.slice(0, 3)));
  }),

  rest.get(api('/blogs/random'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
      })
    );
  }),

  rest.get(api('/blogs/:id'), (req, res, ctx) => {
    const result = BLOGS.find((blog) => blog.id === Number(req.params.id));
    if (!result) {
      return res(
        ctx.status(404),
        ctx.body(`Blog with id ${req.params.id} not found`)
      );
    }

    return res(ctx.status(200), ctx.json(result));
  }),
];
