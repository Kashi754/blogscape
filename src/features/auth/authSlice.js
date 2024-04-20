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
    username: null,
    expiry: null,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      const { username, id, expiry } = action.payload;
      if (id) {
        state.expiry = expiry;
        state.userId = id;
        state.username = username;
        state.authenticated = true;
      } else {
        state.expiry = null;
        state.userId = null;
        state.username = null;
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
        state.username = null;
        state.userId = null;
        state.expiry = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { username, userId, expiry } = action.payload;
        state.userId = userId;
        state.expiry = expiry;
        state.username = username;
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
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.authenticated = false;
        state.expiry = null;
        state.userId = null;
        state.username = null;
      });
  },
});

export const selectAuthenticated = (state) => state.auth.authenticated;
export const selectUserId = (state) => state.auth.userId;
export const selectUsername = (state) => state.auth.username;
export const selectError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
