import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async (userId, { rejectWithValue }) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;

      const response = await fetch(serverUrl);
      const user = await response.json();

      if (!user) {
        return rejectWithValue({ message: 'User not found', status: 404 });
      }

      user.image = 'https://picsum.photos/400';
      user.fileId = null;
      user.thumbnail = 'https://picsum.photos/100';
      user.location = 'France';
      user.locationCode = 'FR';
      user.socialMedia = [
        { name: 'facebook', url: 'https://facebook.com/arigorn_15' },
        { name: 'twitter', url: 'https://x.com/tj.petersen.7' },
        { name: 'tiktok', url: 'https://www.tiktok.com/@kashi754' },
        { name: 'instagram', url: 'https://www.instagram.com/tj_petersen/' },
        {
          name: 'youtube',
          url: 'https://www.youtube.com/channel/UCigqp32mhKab61Xjpbpjf9g',
        },
        { name: 'twitch', url: 'https://www.twitch.tv/kashi754' },
        { name: 'github', url: 'https://github.com/Kashi754' },
        { name: 'discord', url: null },
      ];
      return user;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: err.status });
    }
  }
);

export async function registerUser(formData) {
  try {
    const serverUrl = 'https://jsonplaceholder.typicode.com/users/';
    const response = await fetch(serverUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updateUser(formData) {
  try {
    const serverUrl = 'https://jsonplaceholder.typicode.com/users/1';
    const response = await fetch(serverUrl, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function updateUserSocialMedia(formData) {
  try {
    const serverUrl = 'https://jsonplaceholder.typicode.com/users/1';
    const response = await fetch(serverUrl, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function verifyPassword(password) {
  // TODO: Implement password verification

  return true;
}
