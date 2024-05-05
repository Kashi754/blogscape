import { createSlice } from '@reduxjs/toolkit';
import { loadUserPosts } from './userPostsAPI';

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      });
  },
});

export const selectUserPosts = (state) => state.userPosts.posts;
export const selectIsLoading = (state) => state.userPosts.isLoading;
export const selectError = (state) => state.userPosts.error;
export default userPostsSlice.reducer;
