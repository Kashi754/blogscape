import { createSlice } from '@reduxjs/toolkit';
import { loadComments } from './commentsAPI';
import { loadReplies } from './commentsAPI';

const postSlice = createSlice({
  name: 'comments',
  initialState: {
    postId: null,
    comments: [],
    replies: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(loadReplies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadReplies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadReplies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.replies = { ...state.replies, ...action.payload };
      });
  },
});

export const selectComments = (state) => state.comments.comments;
export const selectReplies = (state) => state.comments.replies;
export const selectPostId = (state) => state.comments.postId;
export const selectIsLoading = (state) => state.comments.isLoading;
export const selectError = (state) => state.comments.error;
export const { setPostId } = postSlice.actions;
export default postSlice.reducer;
