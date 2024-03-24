import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadPost = createAsyncThunk(
  'posts/loadPost',
  async (postId, rejectWithValue) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

      const response = await fetch(serverUrl);
      const post = await response.json();

      post.image = 'https://picsum.photos/200/300';
      post.createdAt = '1999-01-08 04:05:06';
      post.subtitle = 'This is a very nice subtitle about a generic blog post.';
      post.categories = ['#tech', '#javascript', '#react'];
      post.author = 'Blog Author';

      const serverUrl2 = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;

      const response2 = await fetch(serverUrl2);
      const comments = await response2.json();

      const serverUrl3 = `https://jsonplaceholder.typicode.com/comments?postId=${3}`;

      const response3 = await fetch(serverUrl3);
      const replies = await response3.json();

      comments.forEach((comment) => {
        comment.createdAt = '1999-01-08 04:05:06';
        comment.userName = 'John Doe';
        comment.userImage = 'https://picsum.photos/200';
        comment.replies = replies.length;
      });

      return {
        post,
        comments,
      };
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);
