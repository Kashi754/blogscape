import './App.css';
import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Landing } from '../pages/Landing/Landing';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register/Register';
import { Blog } from '../pages/Blog';
import { Post } from '../pages/Post';
import { Browse } from '../pages/Browse';
import { NewPost } from '../pages/NewPost';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { Root } from '../pages/Root';
import { userLoader } from '../API';

function App(dispatch, user) {
  const routes = createRoutesFromElements(
    <>
      <Route
        path='/'
        element={<Root />}
      >
        <Route
          index
          loader={async () => {
            let userId = user.id;
            if (!userId) userId = await userLoader(dispatch);
            if (!userId) throw redirect('/home');
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
        />
        <Route
          path='blog/:blogId'
          element={<Blog />}
        />
        <Route
          path='post/:post'
          element={<Post />}
        />
        <Route
          path='browse'
          element={<Browse />}
        />
        <Route
          path='new'
          element={<NewPost />}
        />
        <Route
          path='profile/:userId'
          element={<Profile />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Route>
    </>
  );

  return routes;
}

export default App;
