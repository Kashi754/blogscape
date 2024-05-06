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
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Posts', id: arg }],
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
  useGetPostByIdQuery,
  useGetMyPostsQuery,
  useCreatePostMutation,
  useGetPostCommentsByIdQuery,
  useAddPostCommentByIdMutation,
} = postsSlice;
export const selectPostsResult = postsSlice.endpoints.getPosts.select();
export const selectPostByIdResult = postsSlice.endpoints.getPostById.select();
export const selectMyPostsResult = postsSlice.endpoints.getMyPosts.select();
export const selectPostCommentsByIdResult =
  postsSlice.endpoints.getPostCommentsById.select();
