import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
} from 'react-router-dom';
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
import Search from '../pages/Search/Search';
import { verifyLoggedIn } from '../utils/verifyLoggedIn';
import { PostsLoader } from '../features/posts/posts.loaders';
import { BlogLoader } from '../features/blog/blog.loaders';
import { TagsLoader } from '../features/tags/tags.loaders';
import { UserLoader } from '../features/user/user.loaders';
import {
  editMyBlogAction,
  toggleFollowedBlogAction,
} from '../features/blog/blog.actions';
import {
  addCommentAction,
  createPostAction,
} from '../features/posts/post.actions';
import {
  updateProfileAction,
  updateSocialMediaAction,
} from '../features/user/user.actions';
import { login, logout, register } from '../API';
import { setAuthenticated } from '../features/auth/authSlice';

export function getAppRouter(store) {
  const postsLoader = new PostsLoader(store);
  const blogLoader = new BlogLoader(store);
  const tagsLoader = new TagsLoader(store);
  const userLoader = new UserLoader(store);

  return createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<Root />}
      >
        <Route
          index
          loader={async () => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              return null;
            }
            // return redirect('/home');
            return redirect('/home');
          }}
          element={<Landing />}
        />
        <Route
          path='login'
          element={<Login />}
          action={async ({ request }) => {
            let formData = await request.json();
            // Action to login user
            const response = await store.dispatch(login(formData));
            if (response.type.includes('rejected')) {
              return null;
            } else {
              return redirect('/home');
            }
          }}
        />
        <Route
          path='logout'
          element={<Login />}
          loader={async () => {
            try {
              // Action to logout user
              await store.dispatch(logout());
              return redirect('/login');
            } catch (err) {
              throw new Response(err.message, { status: err.status || 500 });
            }
          }}
        />
        <Route
          path='register'
          element={<Register />}
          loader={async () => {
            try {
              const id = await verifyLoggedIn(store);
              if (id) {
                return redirect('/home');
              }
            } catch (err) {
              return null;
            }
          }}
          action={async ({ request }) => {
            let formData = await request.json();
            await store.dispatch(register(formData));
            return redirect('/login');
          }}
        />
        <Route
          path='home'
          element={<Home />}
          loader={async ({ request }) => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              console.log(err);
              return redirect('/login');
            }
            const posts = await postsLoader.myPostsLoader({ request });
            return posts;
          }}
        />
        <Route
          path='blog/:blogId'
          element={<Blog />}
          loader={async ({ request, params }) => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              return redirect('/login');
            }
            const blog = await blogLoader.blogLoader({ request, params });
            const { posts, query } = await postsLoader.listPostsLoader({
              request,
              params,
            });
            return { blog, posts, blogId: params.blogId, query };
          }}
          action={toggleFollowedBlogAction(store)}
        />
        <Route
          path='posts/:postId'
          element={<Post />}
          loader={async ({ params, request }) => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              return redirect('/login');
            }
            let post;
            let comments;
            try {
              post = await postsLoader.postLoader({ params, request });
              comments = await postsLoader.postCommentsLoader({
                params,
                request,
              });
            } catch (err) {
              console.log(err);
            }
            return { post, comments, postId: params.postId };
          }}
          action={addCommentAction(store.dispatch)}
        />
        <Route
          path='browse'
          element={<Browse />}
          loader={async ({ request }) => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              return redirect('/login');
            }
            const [followedBlogs, popularBlogs, posts] = await Promise.all([
              blogLoader.listFollowedBlogsLoader({ request }),
              blogLoader.listPopularBlogsLoader({ request }),
              postsLoader.listPostsLoader({ request }),
            ]);

            return { followedBlogs, popularBlogs, posts };
          }}
        />
        <Route
          path='new'
          element={<NewPost />}
          loader={async ({ request }) => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              return redirect('/login');
            }
            const tags = await tagsLoader.listTagsLoader({ request });
            return { tags };
          }}
          action={createPostAction(store.dispatch)}
        />
        <Route
          path='profile/:userId?'
          element={<Profile />}
          loader={async ({ params, request }) => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              return redirect('/login');
            }

            const user = params.userId
              ? await userLoader.userLoader({ params, request })
              : await userLoader.myProfileLoader({ request });

            return { user, userId: params.userId };
          }}
          action={async ({ request }) => {
            const { key, formData } = await request.json();
            request.body = JSON.stringify(formData);

            if (key === 'profile') {
              updateProfileAction(store.dispatch)(formData);
            }

            if (key === 'password') {
              // TODO: Add change password logic
              console.log('password', formData);
            }

            if (key === 'socialMedia') {
              updateSocialMediaAction(store.dispatch)(formData);
            }

            if (key === 'blog') {
              editMyBlogAction(store.dispatch)(formData);
            }
            return null;
          }}
        />
        <Route
          path='search'
          element={<Search />}
          loader={async ({ request }) => {
            try {
              await verifyLoggedIn(store);
            } catch (err) {
              return redirect('/login');
            }
            const [blogs, posts] = await Promise.all([
              blogLoader.listBlogsLoader({ request }),
              postsLoader.listPostsLoader({ request }),
            ]);
            const url = new URL(request.url);
            const q = url.searchParams.toString();

            return { blogs, posts, q };
          }}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Route>
    )
  );
}
