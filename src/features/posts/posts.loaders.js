import { BaseLoader } from '../../common/base.loader';
import { postsSlice } from './postsSlice';

export class PostsLoader extends BaseLoader {
  listPostsLoader = async ({ params, request }) => {
    const url = new URL(request.url);
    const query = url.searchParams?.toString() || '';
    const blogId = params?.blogId ? 'blogId=' + params?.blogId : '';
    const posts = await this._loader(
      postsSlice.endpoints.getPosts,
      request,
      query + blogId
    );
    return { posts, query };
  };

  postLoader = async ({ params, request }) => {
    // verify if logged in
    return await this._loader(
      postsSlice.endpoints.getPostById,
      request,
      params.postId
    );
  };

  myPostsLoader = async ({ request }) => {
    return await this._loader(postsSlice.endpoints.getMyPosts, request);
  };

  postCommentsLoader = async ({ params, request }) => {
    return await this._loader(
      postsSlice.endpoints.getPostCommentsById,
      request,
      params.postId
    );
  };
}
