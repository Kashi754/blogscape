import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadPost = createAsyncThunk(
  'posts/loadPost',
  async (postId, { rejectWithValue }) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      const response = await fetch(serverUrl);
      const post = await response.json();

      post.image = 'https://picsum.photos/200/300';
      post.createdAt = '1999-01-08 04:05:06';
      post.subtitle = 'This is a very nice subtitle about a generic blog post.';
      post.categories = ['#tech', '#javascript', '#react'];
      post.author = 'Blog Author';

      return post;
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);
