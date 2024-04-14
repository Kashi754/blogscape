import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../features/user/userSlice';
import userPostsSliceReducer from '../features/userPosts/userPostsSlice';
import blogSliceReducer from '../features/blog/blogSlice';
import postSliceReducer from '../features/post/postSlice';
import commentsSliceReducer from '../features/comments/commentsSlice';
import followedBlogsSliceReducer from '../features/followedBlogs/followedBlogsSlice';
import popularBlogsSliceReducer from '../features/popularBlogs/popularBlogsSlice';
import recentPostsSliceReducer from '../features/recentPosts/recentPostsSlice';
import searchSliceReducer from '../features/search/searchSlice';
import tagsSliceReducer from '../features/tags/tagsSlice';
import authSliceReducer from '../features/auth/authSlice';

const rootReducer = {
  // Add your reducer functions here
  user: userSliceReducer,
  userPosts: userPostsSliceReducer,
  blog: blogSliceReducer,
  post: postSliceReducer,
  comments: commentsSliceReducer,
  followedBlogs: followedBlogsSliceReducer,
  popularBlogs: popularBlogsSliceReducer,
  recentPosts: recentPostsSliceReducer,
  search: searchSliceReducer,
  tags: tagsSliceReducer,
  auth: authSliceReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
