import { rest } from 'msw';

function api(route) {
  return `${import.meta.env.VITE_APP_SERVER_URL}v1${route}`;
}

export const handlers = [
  //Home Page Request URL
  rest.post(api('/auth/logout'), (req, res, ctx) => {
    return res(ctx.status(204));
  }),

  rest.get(api('/me/profile'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        displayName: 'kashi754',
        username: 'kashi754',
        email: 'kashi754@me.com',
        website: 'http://www.kashi754.me',
        location: 'United States',
        locationCode: 'US',
        blog: {
          id: 1,
          title: 'My Blog',
          description: 'My Blog Description',
          author: 'kashi754',
          createdAt: '2021-11-05T16:40:01.000Z',
          followers: 2,
        },
        socialMedia: {
          facebook: 'https://facebook.com/kashi754',
          twitter: 'https://twitter.com/kashi754',
          instagram: 'https://instagram.com/kashi754',
          tiktok: 'https://tiktok.com/kashi754',
          youtube: 'https://youtube.com/kashi754',
        },
      })
    );
  }),

  rest.get(api('/me/posts'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          author: 'kashi754',
          authorId: 1,
          blogId: 1,
          blogTitle: 'My Blog',
          id: 1,
          title: 'My First Post',
          subTitle: 'How I learned to code',
          body: 'My First Post Body',
          createdAt: '2021-11-05T16:40:01.000Z',
          tags: ['#Vitest', '#testing'],
          commentCount: 5,
        },
      ])
    );
  }),

  rest.get(api('/tags'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: '#Vitest',
        },
        {
          id: 2,
          name: '#Testing',
        },
      ])
    );
  }),
];
