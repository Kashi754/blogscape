import './App.css';
import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { Landing } from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Blog from '../pages/Blog/Blog';
import Post from '../pages/Post/Post';
import Browse from '../pages/Browse/Browse';
import { NewPost } from '../pages/NewPost';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import Root from '../pages/Root/Root';
import {
  loadComments,
  loadFollowedBlogs,
  loadUserPosts,
  registerUser,
  loadPopularBlogs,
  loadRecentPosts,
} from '../API';
import { verifyLoggedIn } from '../utils/verifyLoggedIn';
import { loadBlog } from '../API';
import { loadPost } from '../API';

function App(dispatch, store) {
  const routes = createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
    >
      <Route
        index
        loader={async () => {
          try {
            await verifyLoggedIn(store, dispatch);
            return redirect('/home');
          } catch (err) {
            return null;
          }
        }}
        element={<Landing />}
      />
      <Route
        path='login'
        element={<Login />}
      />
      <Route
        path='register'
        element={<Register />}
        action={async ({ request }) => {
          let formData = await request.json();
          try {
            const res = await registerUser(formData);
            if (!res.ok) {
              throw new Response('Failed to register', { status: 500 });
            }
            return redirect('/login');
          } catch (err) {
            throw new Response(err.message, { status: err.status || 500 });
          }
        }}
      />
      <Route
        path='home'
        element={<Home />}
        loader={async () => {
          try {
            const userId = await verifyLoggedIn(store, dispatch);
            await dispatch(loadUserPosts(userId));
          } catch (err) {
            return redirect('/login');
          }
          return null;
        }}
      />
      <Route
        path='blog/:userId'
        element={<Blog />}
        loader={async ({ params }) => {
          try {
            await verifyLoggedIn(store, dispatch);
            await dispatch(loadBlog(params.userId));
          } catch (err) {
            console.error(err);
            return redirect('/login');
          }
          return null;
        }}
      />
      <Route
        path='posts/:postId'
        element={<Post />}
        loader={async ({ params }) => {
          try {
            await verifyLoggedIn(store, dispatch);
            await dispatch(loadPost(params.postId));
            await dispatch(loadComments(params.postId));
          } catch (err) {
            return redirect('/login');
          }
          return null;
        }}
      />
      <Route
        path='browse'
        element={<Browse />}
        loader={async () => {
          try {
            await verifyLoggedIn(store, dispatch);
            await Promise.all([
              dispatch(loadFollowedBlogs()),
              dispatch(loadPopularBlogs()),
              dispatch(loadRecentPosts()),
            ]);
          } catch (err) {
            return redirect('/login');
          }
          return null;
        }}
      />
      <Route
        path='new'
        element={<NewPost />}
        loader={async () => {
          try {
            await verifyLoggedIn(store, dispatch);
          } catch (err) {
            return redirect('/login');
          }
          return null;
        }}
      />
      <Route
        path='profile/:userId'
        element={<Profile />}
        loader={async () => {
          try {
            await verifyLoggedIn(store, dispatch);
          } catch (err) {
            return redirect('/login');
          }
          return null;
        }}
      />
      <Route
        path='*'
        element={<NotFound />}
      />
    </Route>
  );

  return routes;
}

export default App;
