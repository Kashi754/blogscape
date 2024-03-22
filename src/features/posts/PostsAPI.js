import { setPostsForUser } from './postsSlice';

export async function fetchPostsForUser(dispatch, userId) {
  try {
    const serverUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

    const response = await fetch(serverUrl);
    const posts = await response.json();

    if (posts) {
      dispatch(setPostsForUser(posts));
      return !!posts;
    }

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}
