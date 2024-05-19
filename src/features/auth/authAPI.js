import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../API/axiosBaseQuery';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const { data: userResult } = await axiosInstance.post(
        'v1/auth/login',
        formData
      );

      const { maxAge, ...user } = userResult;

      const maxAgeInDays = maxAge / 1000 / 60 / 60 / 24;
      Cookies.set('user', JSON.stringify(user), {
        expires: maxAgeInDays,
        sameSite: 'strict',
      });

      return user;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data || err || err.message,
        status: err.response?.status,
      });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_params, { rejectWithValue }) => {
    try {
      await axiosInstance.post('v1/auth/logout');
      return true;
    } catch (err) {
      return rejectWithValue({
        message: err.response?.data || err || err.message,
        status: err.response?.status,
      });
    }
  }
);

export async function register(formData) {
  try {
    const result = await axiosInstance.post('v1/auth/register', formData);
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err || err.message,
      },
    };
  }
}
