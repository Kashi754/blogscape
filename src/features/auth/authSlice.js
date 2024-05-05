import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authAPI';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    authenticated: false,
    userId: null,
    blogId: null,
    displayName: '',
    expiry: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      const { displayName, blogId, userId, expiry } = action.payload;
      if (userId) {
        state.expiry = expiry;
        state.userId = userId;
        state.blogId = blogId;
        state.displayName = displayName;
        state.authenticated = true;
      } else {
        state.expiry = null;
        state.userId = null;
        state.blogId = null;
        state.displayName = '';
        state.authenticated = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.authenticated = false;
        state.error = false;
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.authenticated = false;
        state.error = action.payload;
        state.isLoading = false;
        state.displayName = '';
        state.blogId = null;
        state.userId = null;
        state.expiry = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { displayName, blogId, userId, expiry } = action.payload;
        console.log(action.payload);
        state.userId = userId;
        state.expiry = expiry;
        state.displayName = displayName;
        state.authenticated = true;
        state.blogId = blogId;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.authenticated = false;
        state.expiry = null;
        state.userId = null;
        state.blogId = null;
        state.displayName = '';
      });
  },
});

export const selectUserAuth = (state) => ({
  authenticated: state.auth.authenticated,
  userId: state.auth.userId,
  blogId: state.auth.blogId,
  displayName: state.auth.displayName,
  expiry: state.auth.expiry,
});
export const selectError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
