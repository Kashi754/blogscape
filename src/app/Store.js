import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../features/user/userSlice';
import postsSliceReducer from '../features/posts/postsSlice';

const rootReducer = {
  // Add your reducer functions here
  user: userSliceReducer,
  posts: postsSliceReducer,
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
