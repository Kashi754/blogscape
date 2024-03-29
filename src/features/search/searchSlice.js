import { createSlice } from '@reduxjs/toolkit';
import { loadSearchResults } from './searchAPI';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    blogs: [],
    posts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSearchResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.recentPosts = action.payload;
      });
  },
});

export const selectRecentPosts = (state) => state.recentPosts.recentPosts;
export const selectIsLoading = (state) => state.recentPosts.isLoading;
export const selectError = (state) => state.recentPosts.error;
export default searchSlice.reducer;
