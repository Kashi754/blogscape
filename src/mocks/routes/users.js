import { rest } from 'msw';
import { api } from '../handlers';
import { USERS } from '../mockData';

export const usersHandlers = [
  rest.get(api('/users/:id'), (req, res, ctx) => {
    const userId = req.params.id;
    const result = USERS.find((user) => user.id === Number(userId));
    if (!result) {
      return res(ctx.status(404), ctx.body(`User with id ${userId} not found`));
    }
    return res(ctx.status(200), ctx.json(result));
  }),
];
