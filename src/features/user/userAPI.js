import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (userId, rejectWithValue) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

      const response = await fetch(serverUrl);
      const user = await response.json();

      if (!user) {
        return rejectWithValue({ message: 'User not found', status: 404 });
      }

      return user;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  }
);
