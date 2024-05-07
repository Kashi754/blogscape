import { BaseLoader } from '../../common/base.loader';
import { postsSlice } from './postsSlice';

export class PostsLoader extends BaseLoader {
  listPostsLoader = async ({ params, request }) => {
    const url = new URL(request.url);
    const query = url.searchParams?.toString() || '';
    let blogId = '';
    if (params) {
      blogId = `blogId=${params.blogId}`;
    }

    const q = query + blogId;
    const posts = await this._loader(postsSlice.endpoints.getPosts, request, q);

    return { posts, query: q };
  };

  listPostsSearchLoader = async ({ params, request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.toString();
    const posts = await this._loader(
      postsSlice.endpoints.getPostsSearch,
      request,
      query
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
