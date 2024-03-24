import './App.css';
import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { Landing } from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Blog from '../pages/Blog/Blog';
import { Post } from '../pages/Post';
import { Browse } from '../pages/Browse';
import { NewPost } from '../pages/NewPost';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import Root from '../pages/Root/Root';
import { loadUserPosts } from '../features/userPosts/userPostsAPI';
import { verifyLoggedIn } from '../utils/verifyLoggedIn';
import { loadBlog } from '../features/blog/blogAPI';

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
        path='post/:postId'
        element={<Post />}
        loader={async ({ params }) => {
          try {
            await verifyLoggedIn(store, dispatch);
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
