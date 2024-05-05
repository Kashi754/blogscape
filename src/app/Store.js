import { configureStore } from '@reduxjs/toolkit';
import { blogscapeApi } from '../API/apiSlice';
import authSliceReducer from '../features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = {
  // Add your reducer functions here
  [blogscapeApi.reducerPath]: blogscapeApi.reducer,
  auth: authSliceReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogscapeApi.middleware),
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

setupListeners(store.dispatch);
