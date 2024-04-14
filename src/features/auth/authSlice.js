import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authAPI';

const url = process.env.REACT_APP_SERVER_URL;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    authenticated: false,
    userId: null,
    expiry: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      const { auth, expiry } = action.payload;
      if (auth) {
        state.expiry = expiry;
        state.userId = auth;
        state.authenticated = true;
      } else {
        state.expiry = null;
        state.userId = null;
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
      })
      .addCase(login.fulfilled, (state, action) => {
        const { userId, expiry } = action.payload;
        state.userId = userId;
        state.expiry = expiry;
        state.authenticated = true;
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
        state.authenticated = false;
        state.expiry = null;
        state.userId = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.authenticated = false;
        state.expiry = null;
        state.userId = null;
      });
  },
});

export const selectAuthenticated = (state) => state.auth.authenticated;
export const selectUserId = (state) => state.auth.userId;
export const selectError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
