import { createSlice } from '@reduxjs/toolkit';
import { loadFollowedBlogs } from './followedBlogsAPI';

const followedBlogsSlice = createSlice({
  name: 'followedBlogs',
  initialState: {
    followedBlogs: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFollowedBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFollowedBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadFollowedBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.followedBlogs = action.payload;
      });
  },
});

export const selectFollowedBlogs = (state) => state.followedBlogs.followedBlogs;
export const selectIsLoading = (state) => state.followedBlogs.isLoading;
export const selectError = (state) => state.followedBlogs.error;
export default followedBlogsSlice.reducer;
