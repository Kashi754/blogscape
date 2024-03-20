import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../features/user/userSlice';

const rootReducer = {
  // Add your reducer functions here
  user: userSliceReducer,
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
