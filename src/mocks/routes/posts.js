import { rest } from 'msw';
import { POSTS, COMMENTS } from '../mockData';

export const postsHandlers = [
  rest.get('/posts', (req, res, ctx) => {
    const blogId = req.url.searchParams.get('blogId') || 1;
    const postResults = POSTS.filter((post) => post.blogId === Number(blogId));
    return res(ctx.status(200), ctx.json(postResults));
  }),

  rest.post('/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(POSTS[0]));
  }),

  rest.get('/posts/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(POSTS));
  }),

  rest.get('/posts/random', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 3,
      })
    );
  }),

  rest.get('/posts/:id', (req, res, ctx) => {
    const postId = req.params.id;
    const result = POSTS.find((post) => post.id === Number(postId));
    if (!result) {
      return res(ctx.status(404), ctx.body(`Post with id ${postId} not found`));
    }

    return res(ctx.status(200), ctx.json(result));
  }),

  rest.put('/posts/:id', (req, res, ctx) => {
    const postId = req.params.id;
    const result = POSTS.find((post) => post.id === Number(postId));
    return res(ctx.status(200), ctx.json(result));
  }),

  rest.get('/posts/:id/comments', (req, res, ctx) => {
    const postId = req.params.id;
    const commentId = req.url.searchParams.get('commentId');
    let results;
    if (!commentId) {
      results = COMMENTS.filter(
        (comment) => comment.postId === Number(postId) && !comment.commentId
      );
    } else {
      results = COMMENTS.filter(
        (comment) =>
          comment.postId === Number(postId) &&
          comment.commentId === Number(commentId)
      );
    }

    return res(ctx.status(200), ctx.json(results));
  }),

  rest.post('/posts/:id/comments', (req, res, ctx) => {
    const postId = req.params.id;
    const commentId = req.url.searchParams.get('commentId');
    const commentBody = req.body.comment;

    const commentToAdd = {
      body: commentBody,
      user_id: 1,
      post_id: Number(postId),
    };

    if (commentId) {
      commentToAdd.commentId = Number(commentId);
    }

    COMMENTS.push(commentToAdd);
    return res(ctx.status(200), ctx.json(commentToAdd));
  }),
];
