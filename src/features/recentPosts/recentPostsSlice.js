import { createSlice } from '@reduxjs/toolkit';
import { loadRecentPosts } from './recentPostsAPI';

const recentPostsSlice = createSlice({
  name: 'recentPosts',
  initialState: {
    recentPosts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRecentPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadRecentPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadRecentPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.recentPosts = action.payload;
      });
  },
});

export const selectRecentPosts = (state) => state.recentPosts.recentPosts;
export const selectIsLoading = (state) => state.recentPosts.isLoading;
export const selectError = (state) => state.recentPosts.error;
export default recentPostsSlice.reducer;
