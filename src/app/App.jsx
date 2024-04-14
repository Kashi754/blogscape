import './App.css';
import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { Landing } from '../pages/Landing/Landing';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Blog from '../pages/Blog/Blog';
import Post from '../pages/Post/Post';
import Browse from '../pages/Browse/Browse';
import NewPost from '../pages/NewPost/NewPost';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import Root from '../pages/Root/Root';
import {
  loadComments,
  loadFollowedBlogs,
  loadUserPosts,
  registerUser,
  loadPopularBlogs,
  loadRecentPosts,
  loadTags,
  addComment,
  createPost,
  login,
  logout,
  loadUser,
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
            verifyLoggedIn(store, dispatch);
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
        action={async ({ request }) => {
          let formData = await request.json();
          try {
            // Action to login user
            const res = await dispatch(login(formData));
            if (!res.type.includes('fulfilled')) {
              return null;
            }
            return redirect('/home');
          } catch (err) {
            throw new Response(err.message, { status: err.status || 500 });
          }
        }}
      />
      <Route
        path='logout'
        element={<Login />}
        loader={async () => {
          try {
            // Action to logout user
            await dispatch(logout());
            return 'You have been Logged Out!';
          } catch (err) {
            throw new Response(err.message, { status: err.status || 500 });
          }
        }}
      />
      <Route
        path='register'
        element={<Register />}
        action={async ({ request }) => {
          let formData = await request.json();
          try {
            // Action to register user
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
            await verifyLoggedIn(store, dispatch);
            await dispatch(loadUserPosts(1));
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
        action={async ({ params, request }) => {
          // Action to add a comment
          let comment = await request.json();
          console.log(comment);
          try {
            const res = await addComment(params, comment);
            if (!res.ok) {
              throw new Response('Failed to add comment', { status: 500 });
            }
          } catch (err) {
            throw new Response(err.message, { status: err.status || 500 });
          }
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
            await dispatch(loadTags());
          } catch (err) {
            return redirect('/login');
          }
          return null;
        }}
        action={async ({ request }) => {
          // Action to create a new post
          let formData = await request.formData();
          try {
            const res = await createPost(formData);
            if (!res.ok) {
              throw new Response('Failed to create post', { status: 500 });
            }
            return redirect('/home');
          } catch (err) {
            throw new Response(err.message, { status: err.status || 500 });
          }
        }}
      />
      <Route
        path='profile/:userId?'
        element={<Profile />}
        loader={async ({ params }) => {
          try {
            const userId = await verifyLoggedIn(store, dispatch);
            await dispatch(loadUser(params.userId || userId));
            await dispatch(loadBlog(params.userId || userId));
          } catch (err) {
            return redirect('/login');
          }
          return null;
        }}
        action={async ({ request }) => {
          const { key, formData } = await request.json();

          if (key === 'profile') {
            // TODO: Add edit profile logic
            console.log('profile', formData);
          }

          if (key === 'password') {
            // TODO: Add change password logic
            console.log('password', formData);
          }

          if (key === 'socialMedia') {
            // TODO: Add edit social media logic
            console.log('socialMedia', formData);
          }

          if (key === 'blog') {
            // TODO: Add edit blog logic
            console.log('blog', formData);
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
