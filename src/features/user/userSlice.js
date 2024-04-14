import { createSlice } from '@reduxjs/toolkit';
import { loadUser } from './userAPI';

const url = process.env.REACT_APP_SERVER_URL;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.user = {};
        state.error = false;
        state.isLoading = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.user = {};
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;
export default userSlice.reducer;
