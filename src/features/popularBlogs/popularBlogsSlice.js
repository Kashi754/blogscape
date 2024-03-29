import { createSlice } from '@reduxjs/toolkit';
import { loadPopularBlogs } from './popularBlogsAPI';

const blogSlice = createSlice({
  name: 'popularBlogs',
  initialState: {
    popularBlogs: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPopularBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadPopularBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadPopularBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.popularBlogs = action.payload;
      });
  },
});

export const selectPopularBlogs = (state) => state.popularBlogs.popularBlogs;
export const selectIsLoading = (state) => state.popularBlogs.isLoading;
export const selectError = (state) => state.popularBlogs.error;
export default blogSlice.reducer;
