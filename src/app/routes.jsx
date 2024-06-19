import { createRoutesFromElements, redirect, Route } from 'react-router-dom';
import { login, logout, register } from '../API';
import {
  editMyBlogAction,
  toggleFollowedBlogAction,
} from '../features/blog/blog.actions';
import {
  addCommentAction,
  createPostAction,
} from '../features/posts/post.actions';
import {
  updatePasswordAction,
  updateProfileAction,
  updateSocialMediaAction,
} from '../features/user/user.actions';
import ErrorBoundary from '../pages/ErrorBoundary/ErrorBoundary';
import NotFound from '../pages/NotFound/NotFound';
import Root from '../pages/Root/Root';
import { verifyLoggedIn } from '../utils/verifyLoggedIn';
import { BlogLoader } from '../features/blog/blog.loaders';
import { PostsLoader } from '../features/posts/posts.loaders';
import { TagsLoader } from '../features/tags/tags.loaders';
import { UserLoader } from '../features/user/user.loaders';

export default function routes(store) {
  const postsLoader = new PostsLoader(store);
  const blogLoader = new BlogLoader(store);
  const tagsLoader = new TagsLoader(store);
  const userLoader = new UserLoader(store);

  return createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
    >
      <Route
        index
        errorElement={<ErrorBoundary />}
        loader={async () => {
          try {
            await verifyLoggedIn(store);
          } catch (err) {
            return null;
          }
          // return redirect('/home');
          return redirect('/home');
        }}
        lazy={() => import('../pages/Landing/Landing')}
      />
      <Route
        path='login'
        errorElement={<ErrorBoundary />}
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
        lazy={() => import('../pages/Login/Login')}
      />
      <Route
        path='logout'
        errorElement={<ErrorBoundary />}
        loader={async () => {
          try {
            // Action to logout user
            await store.dispatch(logout());
            return redirect('/login');
          } catch (err) {
            throw new Response(err.message, { status: err.status || 500 });
          }
        }}
        lazy={() => import('../pages/Login/Login')}
      />
      <Route
        path='register'
        errorElement={<ErrorBoundary />}
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
          const result = await register(formData);

          if (!result.error) {
            return redirect('/login');
          }

          if (result.error && result.error.status === 500) {
            result.error.data = 'Something went wrong';
          }

          return { data: result.data, error: result.error };
        }}
        lazy={() => import('../pages/Register/Register')}
      />
      <Route
        path='home'
        errorElement={<ErrorBoundary />}
        loader={async ({ request }) => {
          try {
            await verifyLoggedIn(store);
          } catch (err) {
            return redirect('/login');
          }
          const posts = await postsLoader.myPostsLoader({ request });
          return posts;
        }}
        lazy={() => import('../pages/Home/Home')}
      />
      <Route
        path='blog/:blogId'
        errorElement={<ErrorBoundary />}
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
        lazy={() => import('../pages/Blog/Blog')}
      />
      <Route
        path='posts/:postId'
        errorElement={<ErrorBoundary />}
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
        lazy={() => import('../pages/Post/Post')}
      />
      <Route
        path='browse'
        errorElement={<ErrorBoundary />}
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
        lazy={() => import('../pages/Browse/Browse')}
      />
      <Route
        path='new'
        errorElement={<ErrorBoundary />}
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
        lazy={() => import('../pages/NewPost/NewPost')}
      />
      <Route
        path='profile/:userId?'
        errorElement={<ErrorBoundary />}
        loader={async ({ params, request }) => {
          try {
            await verifyLoggedIn(store);
          } catch (err) {
            return redirect('/login');
          }

          // const user = params.userId
          //   ? await userLoader.userLoader({ params, request })
          //   : await userLoader.myProfileLoader({ request });

          const user = await userLoader.userLoader({ params, request });

          return { user, userId: params.userId || null };
        }}
        action={async ({ request }) => {
          const { key, formData } = await request.json();
          request.body = JSON.stringify(formData);

          if (key === 'profile') {
            updateProfileAction(store.dispatch)(formData);
          }

          if (key === 'password') {
            // TODO: Add change password logic
            const result = await updatePasswordAction(store.dispatch)(formData);

            if (result.error && result.error.status === 500) {
              result.error.data = 'Something went wrong';
            }

            return { data: result.data, error: result.error };
          }

          if (key === 'socialMedia') {
            updateSocialMediaAction(store.dispatch)(formData);
          }

          if (key === 'blog') {
            editMyBlogAction(store.dispatch)(formData);
          }
          return null;
        }}
        lazy={() => import('../pages/Profile/Profile')}
      />
      <Route
        path='search'
        errorElement={<ErrorBoundary />}
        loader={async ({ request }) => {
          try {
            await verifyLoggedIn(store);
          } catch (err) {
            return redirect('/login');
          }
          const [blogs, posts] = await Promise.all([
            blogLoader.listBlogsSearchLoader({ request }),
            postsLoader.listPostsSearchLoader({ request }),
          ]);
          const url = new URL(request.url);
          const q = url.searchParams.toString();

          return { blogs, posts, q };
        }}
        lazy={() => import('../pages/Search/Search')}
      />
      <Route
        path='*'
        element={<NotFound />}
      />
    </Route>
  );
}
