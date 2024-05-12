import { blogscapeApi } from '../../API/apiSlice';

export const postsSlice = blogscapeApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (query) => ({
        url: `/posts?${query ? query : ''}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const blogId = new URLSearchParams(queryArgs).get('blogId');
        return blogId ? `${endpointName}_${blogId}` : endpointName;
      },
      merge: (currentCache, responseData, { arg }) => {
        if (new URLSearchParams(arg).get('beforeId')) {
          currentCache.push(...responseData);
          return currentCache;
        }
        return responseData;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
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
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const query = new URLSearchParams(queryArgs).get('q');
        return `${endpointName}_${query}`;
      },
      merge: (currentCache, responseData, { arg }) => {
        const beforeId = new URLSearchParams(arg).get('beforeId');
        if (beforeId) {
          currentCache.push(...responseData);
          return currentCache;
        }
        console.log(responseData);
        return responseData;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
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
      query: (query) => ({
        url: `/me/posts?${query ? query : ''}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, responseData, { arg }) => {
        if (new URLSearchParams(arg).get('beforeId')) {
          currentCache.push(...responseData);
          return currentCache;
        }
        return responseData;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      providesTags: [{ type: 'MyPosts', id: 'LIST' }],
    }),
    getPostCommentsById: builder.query({
      query: (id) => ({
        url: `/posts/${id}/comments`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        { type: 'Comments', id },
        { type: 'Comments', id: 'LIST' },
      ],
    }),
    getPostRepliesById: builder.query({
      query: ({ id, commentId }) => ({
        url: `/posts/${id}/comments?commentId=${commentId}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [
        { type: 'Comments', id },
        { type: 'Comments', id: 'LIST' },
      ],
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
      invalidatesTags: (result, error, arg) => [
        { type: 'Comments', id: arg.id },
        { type: 'Comments', id: 'LIST' },
      ],
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
