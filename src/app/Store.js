import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../features/user/userSlice';
import userPostsSliceReducer from '../features/userPosts/userPostsSlice';
import blogSliceReducer from '../features/blog/blogSlice';
import postSliceReducer from '../features/post/postSlice';

const rootReducer = {
  // Add your reducer functions here
  user: userSliceReducer,
  userPosts: userPostsSliceReducer,
  blog: blogSliceReducer,
  post: postSliceReducer,
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
