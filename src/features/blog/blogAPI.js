import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadBlog = createAsyncThunk(
  'blog/loadBlog',
  async (userId, { rejectWithValue }) => {
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
        thumbnail: 'https://picsum.photos/100',
        author: 'Blog Author',
        followers: 100,
        followed: false,
        fileId: null,
      };
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const loadBlogPosts = createAsyncThunk(
  'blog/loadBlogPosts',
  async ({ userId, page }, { rejectWithValue }) => {
    try {
      const limit = page ? 10 : 11;
      const offset = page ? limit * (page - 1) : 0;
      const serverUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts`;
      const response = await fetch(serverUrl);
      const posts = await response.json();

      posts.forEach((post) => {
        post.image = 'https://picsum.photos/200/300';
        post.createdAt = '1999-01-08 04:05:06';
        post.thumbnail = '';
        post.fileId = '';
        post.subtitle =
          'This is a very nice subtitle about a generic blog post.';
        post.categories = ['#tech', '#javascript', '#react'];
      });

      return posts;
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const followBlog = async (userId) => {
  // TODO: Add follow logic
  console.log(userId);
};

export const unFollowBlog = async (userId) => {
  // TODO: Add unFollow logic
  console.log(userId);
};
