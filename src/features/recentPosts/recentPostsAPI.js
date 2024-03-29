import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadRecentPosts = createAsyncThunk(
  'recentPosts/loadRecentPosts',
  async (_params, { rejectWithValue }) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/users/3/posts`;

      const response = await fetch(serverUrl);
      const posts = await response.json();

      posts.forEach((post) => {
        post.image = 'https://picsum.photos/200';
        post.title = 'Blog Title ' + post.id;
        post.author = {
          name: 'Blog Author',
          image: 'https://picsum.photos/200',
        };
        post.categories = ['#tech', '#javascript', '#react'];
      });

      return posts;
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);
