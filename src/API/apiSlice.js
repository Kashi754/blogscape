import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const blogscapeApi = createApi({
  reducerPath: 'blogscapeApi',
  tagTypes: [
    'Blog',
    'FollowedBlogs',
    'PopularBlogs',
    'Posts',
    'Tags',
    'Users',
    'myProfile',
    'myBlog',
    'myPosts',
    'Comments',
  ],
  baseQuery: axiosBaseQuery({ baseUrl: '/v1' }),
  endpoints: () => ({}),
});
