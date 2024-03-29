import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadPopularBlogs = createAsyncThunk(
  'popularBlogs/loadPopularBlogs',
  async (_params, { rejectWithValue }) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/users/`;

      const response = await fetch(serverUrl);
      const blogs = await response.json();

      blogs.forEach((blog) => {
        blog.image = 'https://picsum.photos/200/300';
        blog.title = 'Blog Title ' + blog.id + ' - Popular';
        blog.author = blog.username;
        blog.followers = 100;
        blog.description =
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed labore sequi voluptatem commodi soluta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed labore sequi voluptatem commodi soluta!';
      });

      return blogs;
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);
