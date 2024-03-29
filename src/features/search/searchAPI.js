import { createAsyncThunk } from '@reduxjs/toolkit';

async function loadBlogsSearch(searchTerms) {
  const serverUrl = `https://jsonplaceholder.typicode.com/users/`;

  const response = await fetch(serverUrl);
  const blogs = await response.json();

  blogs.forEach((blog) => {
    blog.image = 'https://picsum.photos/200/300';
    blog.title = 'Blog Title ' + blog.id;
    blog.author = blog.username;
    blog.followers = 100;
    blog.description =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed labore sequi voluptatem commodi soluta!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sed labore sequi voluptatem commodi soluta!';
  });

  return blogs;
}

async function loadPostsSearch(searchTerms) {
  const postsServerUrl = `https://jsonplaceholder.typicode.com/users/3/posts`;

  const response = await fetch(postsServerUrl);
  const posts = await response.json();

  posts.forEach((post) => {
    post.image = 'https://picsum.photos/200';
    post.author = {
      name: 'Blog Author',
      image: 'https://picsum.photos/200',
    };
    post.categories = ['#tech', '#javascript', '#react'];
  });

  return posts;
}

export const loadSearchResults = createAsyncThunk(
  'search/loadSearchResults',
  async (searchTerms, { rejectWithValue }) => {
    try {
      const [blogs, posts] = Promise.all([
        loadBlogsSearch(searchTerms),
        loadPostsSearch(searchTerms),
      ]);

      return {
        blogs,
        posts,
      };
    } catch (err) {
      console.error(err);
      return rejectWithValue({ message: err.message, status: 400 });
    }
  }
);
