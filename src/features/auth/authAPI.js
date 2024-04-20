import { createAsyncThunk } from '@reduxjs/toolkit';
import { setWithExpiry } from '../../utils/LocalStorageWithExpiry';

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const serverUrl = 'https://jsonplaceholder.typicode.com/users/1';
      const response = await fetch(serverUrl, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const auth = await response.json();
      setWithExpiry(
        'auth',
        auth.id,
        auth.username,
        auth.expiry || 1000 * 60 * 30
      );
      return {
        username: auth.username,
        userId: auth.id,
        expiry: auth.expiry || 1000 * 60 * 30,
      };
    } catch (err) {
      console.log(err);
      return rejectWithValue({ message: err.message, status: err.status });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_params, { rejectWithValue }) => {
    try {
      localStorage.removeItem('auth');
      return true;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  }
);

export async function register(formData) {
  try {
    const serverUrl = 'https://jsonplaceholder.typicode.com/users/';
    await fetch(serverUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  } catch (err) {
    console.log(err);
    return null;
  }
}
