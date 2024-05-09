import { createSelector } from '@reduxjs/toolkit';
import { blogscapeApi } from '../../API/apiSlice';

export const postsSlice = blogscapeApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (q) => ({
        url: `/posts?${q ? q : ''}`,
        method: 'GET',
      }),
      providesTags: (result = [], error, arg) => [
        { type: 'Posts', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Posts', id })),
      ],
    }),
    getPostsSearch: builder.query({
      query: (q) => ({
        url: `/posts/search?${q}`,
        method: 'GET',
      }),
      providesTags: (result = [], error, arg) => [
        { type: 'Posts', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Posts', id })),
      ],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Posts', id: arg }],
    }),
    getRandomPostId: builder.query({
      query: () => ({
        url: '/posts/random',
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Posts' }],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        data: post,
      }),
      invalidatesTags: [
        { type: 'Posts', id: 'LIST' },
        { type: 'MyPosts', id: 'LIST' },
      ],
    }),
    getMyPosts: builder.query({
      query: () => ({
        url: '/me/posts',
        method: 'GET',
      }),
      providesTags: [{ type: 'MyPosts', id: 'LIST' }],
    }),
    getPostCommentsById: builder.query({
      query: (id) => ({
        url: `/posts/${id}/comments`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    getPostRepliesById: builder.query({
      query: ({ id, commentId }) => ({
        url: `/posts/${id}/comments?commentId=${commentId}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Comments', id }],
    }),
    addPostCommentById: builder.mutation({
      query: ({ id, body: comment, commentId }) => {
        return {
          url: `/posts/${id}/comments${
            commentId ? '?commentId=' + commentId : ''
          }`,
          method: 'POST',
          data: comment,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Comments', id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsSearchQuery,
  useGetPostByIdQuery,
  useGetMyPostsQuery,
  useCreatePostMutation,
  useGetPostCommentsByIdQuery,
  useLazyGetPostRepliesByIdQuery,
  useAddPostCommentByIdMutation,
} = postsSlice;
export const selectPostsResult = postsSlice.endpoints.getPosts.select();
export const selectPostByIdResult = postsSlice.endpoints.getPostById.select();
export const selectMyPostsResult = postsSlice.endpoints.getMyPosts.select();
export const selectRepliesById = postsSlice.endpoints.getPostRepliesById;

export const selectPostCommentsByIdResult =
  postsSlice.endpoints.getPostCommentsById.select();
