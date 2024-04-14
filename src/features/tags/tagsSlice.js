import { createSlice } from '@reduxjs/toolkit';
import { loadTags } from './tagsAPI';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTags.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tags = action.payload;
      });
  },
});

export const selectTagsData = (state) => ({
  tags: state.tags.tags,
  isLoading: state.tags.isLoading,
  error: state.tags.error,
});
export default tagsSlice.reducer;
