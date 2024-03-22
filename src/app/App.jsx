import './App.css';
import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Landing } from '../pages/Landing/Landing';
import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Register/Register';
import { Blog } from '../pages/Blog';
import { Post } from '../pages/Post';
import { Browse } from '../pages/Browse';
import { NewPost } from '../pages/NewPost';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { Root } from '../pages/Root/Root';
import { userLoader } from '../API';
import { loadUserPosts } from '../features/posts/postsSlice';

function App(dispatch, user) {
  const routes = createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
    >
      <Route
        index
        loader={async () => {
          let userId = user.id;
          if (!userId) userId = await userLoader(dispatch);
          if (userId) throw redirect('/home');
          return null;
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
          let userId = user.id;
          if (!userId) userId = await userLoader(dispatch);
          if (!userId) throw redirect('/login');
          await dispatch(loadUserPosts(userId));
          return null;
        }}
      />
      <Route
        path='blog/:blogId'
        element={<Blog />}
        loader={async () => {
          let userId = user.id;
          if (!userId) userId = await userLoader(dispatch);
          if (!userId) throw redirect('/login');
          return null;
        }}
      />
      <Route
        path='post/:post'
        element={<Post />}
        loader={async () => {
          let userId = user.id;
          if (!userId) userId = await userLoader(dispatch);
          if (!userId) throw redirect('/login');
          return null;
        }}
      />
      <Route
        path='browse'
        element={<Browse />}
        loader={async () => {
          let userId = user.id;
          if (!userId) userId = await userLoader(dispatch);
          if (!userId) throw redirect('/login');
          return null;
        }}
      />
      <Route
        path='new'
        element={<NewPost />}
        loader={async () => {
          let userId = user.id;
          if (!userId) userId = await userLoader(dispatch);
          if (!userId) throw redirect('/login');
          return null;
        }}
      />
      <Route
        path='profile/:userId'
        element={<Profile />}
        loader={async () => {
          let userId = user.id;
          if (!userId) userId = await userLoader(dispatch);
          if (!userId) throw redirect('/login');
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
