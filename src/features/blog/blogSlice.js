import { blogscapeApi } from '../../API/apiSlice';

export const blogsSlice = blogscapeApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: '/blogs',
        method: 'GET',
      }),
      providesTags: (result = [], error, arg) => [
        { type: 'Blog', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Blog', id })),
      ],
    }),
    getBlogsSearch: builder.query({
      query: (q) => ({
        url: `/blogs/search?${q}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, responseData, { arg }) => {
        const beforeId = new URLSearchParams(arg).get('beforeId');
        if (beforeId) {
          currentCache.push(...responseData);
          return currentCache;
        }
        return responseData;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg && !(!currentArg && !previousArg);
      },
      providesTags: (result = [], error, arg) => [
        { type: 'Blog', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Blog', id })),
      ],
    }),
    getPopularBlogs: builder.query({
      query: (query) => ({
        url: `/blogs/popular?${query ? query : ''}`,
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
        return responseData;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg && !(!currentArg && !previousArg);
      },
      providesTags: ['PopularBlogs'],
    }),
    getBlogById: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    getMyBlog: builder.query({
      query: () => ({
        url: '/me/blog',
        method: 'GET',
      }),
      providesTags: ['myBlog'],
    }),
    getRandomBlogId: builder.query({
      query: () => ({
        url: '/posts/random',
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Posts' }],
    }),
    editMyBlog: builder.mutation({
      query: (blog) => ({
        url: '/me/blog',
        method: 'PUT',
        data: blog,
      }),
      invalidatesTags: ['myBlog', 'myProfile'],
    }),
    getFollowedBlogs: builder.query({
      query: (query) => ({
        url: `/me/following?${query ? query : ''}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, responseData, { arg }) => {
        const beforeId = new URLSearchParams(arg).get('beforeId');
        if (beforeId) {
          currentCache.push(...responseData);
          return currentCache;
        }
        return responseData;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg && !(!currentArg && !previousArg);
      },
      providesTags: ['FollowedBlogs'],
    }),
    changeFollowedBlogs: builder.mutation({
      query: (blogs) => ({
        url: `/me/following`,
        method: 'PUT',
        data: blogs,
      }),
      invalidatesTags: (result, error, arg) => [
        'FollowedBlogs',
        { type: 'Blog', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogsSearchQuery,
  useGetPopularBlogsQuery,
  useGetBlogByIdQuery,
  useGetMyBlogQuery,
  useEditMyBlogMutation,
  useGetFollowedBlogsQuery,
  useChangeFollowedBlogsMutation,
} = blogsSlice;
export const selectBlogsResult = blogsSlice.endpoints.getBlogs.select();
export const selectPopularBlogsResult =
  blogsSlice.endpoints.getPopularBlogs.select();
export const selectBlogByIdResult = blogsSlice.endpoints.getBlogById.select();
export const selectMyBlogResult = blogsSlice.endpoints.getMyBlog.select();
export const selectFollowedBlogsResult =
  blogsSlice.endpoints.getFollowedBlogs.select();
