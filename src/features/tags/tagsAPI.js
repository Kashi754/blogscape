import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadTags = createAsyncThunk(
  'tags/loadTags',
  async (_params, { rejectWithValue }) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/albums`;

      const response = await fetch(serverUrl);
      const tags = await response.json();

      return tags;
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const addTag = async (tag) => {
  try {
    const serverUrl = `https://jsonplaceholder.typicode.com/albums`;
    const response = await fetch(serverUrl, {
      method: 'POST',
      body: JSON.stringify(tag),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return { id: crypto.randomUUID(), name: tag };
  } catch (err) {
    console.error(err);
    return null;
  }
};
