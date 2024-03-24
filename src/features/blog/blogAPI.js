import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadBlog = createAsyncThunk(
  'blog/loadBlog',
  async (userId, rejectWithValue) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;

      const response = await fetch(serverUrl);
      const posts = await response.json();

      posts.forEach((post) => {
        post.image = 'https://picsum.photos/200/300';
        post.createdAt = '1999-01-08 04:05:06';
        post.subtitle =
          'This is a very nice subtitle about a generic blog post.';
        post.categories = ['#tech', '#javascript', '#react'];
      });

      return {
        title: 'Blog Title',
        description: 'This is a description of the currently selected blog',
        image: 'https://picsum.photos/200/300',
        author: 'Blog Author',
        followers: 100,
        followed: false,
        posts,
      };
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);
