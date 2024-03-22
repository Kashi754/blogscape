import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadUserPosts = createAsyncThunk(
  'posts/loadUserPosts',
  async (userId, rejectWithValue) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

      const response = await fetch(serverUrl);
      const posts = await response.json();

      return posts;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setPostsForUser(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPosts.pending, (state) => {
        state.posts = [];
        state.error = false;
        state.isLoading = true;
      })
      .addCase(loadUserPosts.rejected, (state, action) => {
        state.posts = [];
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const selectUserPosts = (state) => state.posts.posts;
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectError = (state) => state.posts.error;
export const { setPostsForUser } = postsSlice.actions;
export default postsSlice.reducer;
