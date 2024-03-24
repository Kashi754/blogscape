import { createSlice } from '@reduxjs/toolkit';
import { loadPost } from './postAPI';
import { convertTimestampToDate } from '../../utils/dateConversions';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: {},
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.post = action.payload.post;
        state.comments = action.payload.comments;
      });
  },
});

export const selectPost = (state) => {
  return {
    ...state.post.post,
    createdAt: convertTimestampToDate(state.post.post.createdAt),
  };
};
export const selectComments = (state) => {
  return state.post.comments.map((comment) => {
    return {
      ...comment,
      createdAt: convertTimestampToDate(comment.createdAt),
    };
  });
};
export const selectIsLoading = (state) => state.post.isLoading;
export const selectError = (state) => state.post.error;
export default postSlice.reducer;
