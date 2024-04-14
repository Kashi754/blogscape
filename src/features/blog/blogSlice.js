import { createSlice } from '@reduxjs/toolkit';
import { loadBlog } from './blogAPI';
import { convertTimestampToDate } from '../../utils/dateConversions';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    title: '',
    description: '',
    image: '',
    author: '',
    followers: 0,
    followed: false,
    fileId: '',
    thumbnail: '',
    mostRecentPost: null,
    posts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const blog = action.payload;
        state.title = blog.title;
        state.description = blog.description;
        state.image = blog.image;
        state.author = blog.author;
        state.followers = blog.followers;
        state.followed = blog.followed;
        state.fileId = blog.fileId;
        state.thumbnail = blog.thumbnail;

        const [mostRecentPost, ...rest] = blog.posts;
        if (state.mostRecentPost) {
          const mostRecentCreatedAt = convertTimestampToDate(
            mostRecentPost.createdAt
          );
          const stateMostRecentCreatedAt = convertTimestampToDate(
            state.mostRecentPost.createdAt
          );

          if (mostRecentCreatedAt > stateMostRecentCreatedAt) {
            state.mostRecentPost = mostRecentPost;
            state.posts = rest;
          } else {
            state.posts = blog.posts;
          }
        } else {
          state.mostRecentPost = mostRecentPost;
          state.posts = rest;
        }
      });
  },
});

export const selectBlogHeader = (state) => {
  return {
    title: state.blog.title,
    description: state.blog.description,
    image: state.blog.image,
    author: state.blog.author,
    followers: state.blog.followers,
    followed: state.blog.followed,
    thumbnail: state.blog.thumbnail,
    fileId: state.blog.fileId,
  };
};

export const selectBlogPosts = (state) => {
  return {
    author: state.blog.author,
    mostRecentPost: {
      ...state.blog.mostRecentPost,
      createdAt: convertTimestampToDate(state.blog.mostRecentPost.createdAt),
    },
    posts: state.blog.posts.map((post) => {
      return {
        ...post,
        createdAt: convertTimestampToDate(post.createdAt),
      };
    }),
  };
};

export const selectIsLoading = (state) => state.userPosts.isLoading;
export const selectError = (state) => state.userPosts.error;
export default blogSlice.reducer;
