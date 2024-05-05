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
    getPopularBlogs: builder.query({
      query: () => ({
        url: '/blogs/popular',
        method: 'GET',
      }),
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
    editMyBlog: builder.mutation({
      query: (blog) => ({
        url: '/me/blog',
        method: 'PUT',
        data: blog,
      }),
      invalidatesTags: ['myBlog', 'myProfile'],
    }),
    getFollowedBlogs: builder.query({
      query: () => ({
        url: '/me/following',
        method: 'GET',
      }),
      providesTags: ['FollowedBlogs'],
    }),
    changeFollowedBlogs: builder.mutation({
      query: (blogs) => ({
        url: `/me/following`,
        method: 'PUT',
        data: blogs,
      }),
      invalidatesTags: ['FollowedBlogs'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
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
