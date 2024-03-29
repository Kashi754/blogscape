import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadUserPosts = createAsyncThunk(
  'userPosts/loadUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

      const response = await fetch(serverUrl);
      const posts = await response.json();

      return posts;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);
