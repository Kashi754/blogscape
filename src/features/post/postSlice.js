import { createSlice } from '@reduxjs/toolkit';
import { loadPost } from './postAPI';
import { convertTimestampToDate } from '../../utils/dateConversions';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: {},
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
        state.post = action.payload;
      });
  },
});

export const selectPost = (state) => {
  return {
    ...state.post.post,
    createdAt: convertTimestampToDate(state.post.post.createdAt),
  };
};

export const selectIsLoading = (state) => state.post.isLoading;
export const selectError = (state) => state.post.error;
export default postSlice.reducer;
