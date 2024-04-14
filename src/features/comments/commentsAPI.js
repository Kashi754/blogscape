import { createAsyncThunk } from '@reduxjs/toolkit';
import { convertTimestampToString } from '../../utils/dateConversions';

export const loadComments = createAsyncThunk(
  'comments/loadComments',
  async (postId, { rejectWithValue }) => {
    try {
      const serverUrl1 = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`; // Replace with your server URL

      const response1 = await fetch(serverUrl1);
      const comments = await response1.json();

      const serverUrl2 = `https://jsonplaceholder.typicode.com/comments?postId=${3}`; // Replace with your server URL

      const response2 = await fetch(serverUrl2);
      const replies = await response2.json();

      comments.forEach((comment) => {
        comment.createdAt = convertTimestampToString('1999-01-08 04:05:06');
        comment.userName = 'John Doe';
        comment.userImage = 'https://picsum.photos/200';
        comment.replies = replies.length;
      });

      return comments;
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const loadReplies = createAsyncThunk(
  'comments/loadReplies',
  async (commentId, { rejectWithValue }) => {
    try {
      const serverUrl = `https://jsonplaceholder.typicode.com/comments?postId=${commentId}`; // Replace with your server URL

      const response = await fetch(serverUrl);
      const replies = await response.json();

      if (replies.length > 0) {
        replies.forEach((reply) => {
          reply.createdAt = convertTimestampToString('1999-01-08 04:05:06');
          reply.userName = 'Jane Doe';
          reply.userImage = 'https://picsum.photos/200/300';
          reply.replies = 5;
        });
      }
      return { [commentId]: replies };
    } catch (err) {
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);

export const addComment = async (postId, comment) => {
  // TODO: Add logic to add comment
  console.log(postId, comment);
};

export const addReply = async (postId, reply) => {
  // TODO: Add logic to add reply
  console.log(postId, reply);
};
