import { rest } from 'msw';
import { api } from '../handlers';
import { TAGS } from '../mockData';

export const tagsHandlers = [
  rest.get(api('/tags'), (req, res, ctx) => {
    const startsWith = req.url.searchParams.get('startsWith');
    // find tags that start with startsWith
    const result = TAGS.filter((tag) => tag.name.startsWith('#' + startsWith));
    return res(ctx.status(200), ctx.json(result));
  }),

  rest.post(api('/tags'), (req, res, ctx) => {
    const tagBody = { name: req.body.tag };

    if (!tagBody.name.startsWith('#')) {
      tagBody.name = `#${tagBody.name}`;
    }

    const lastTagId = TAGS[TAGS.length - 1].id;
    tagBody.id = lastTagId + 1;
    TAGS.push(tagBody);
    return res(ctx.status(200), ctx.json(tagBody));
  }),
];
