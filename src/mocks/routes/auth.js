import { rest } from 'msw';
import { api } from '../handlers';

export const authHandlers = [
  rest.post(api('/auth/login'), (req, res, ctx) => {
    const { password } = req.body;
    if (password === 'fail_test') {
      return res(ctx.status(401), ctx.body('Invalid username or password'));
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        display_name: 'kashi754',
        blogId: 1,
        expiry: 100000000000000,
        maxAge: 100000000000000,
      })
    );
  }),

  rest.post(api('/auth/logout'), (req, res, ctx) => {
    const { username } = req.body;
    if (username === 'fail_test') {
      return res(
        ctx.status(400),
        ctx.body('User with that username or email already exists')
      );
    }
    return res(ctx.status(204));
  }),

  rest.post(api('/auth/register'), (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];
