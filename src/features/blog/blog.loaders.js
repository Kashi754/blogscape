import { BaseLoader } from '../../common/base.loader';
import { blogsSlice } from './blogSlice';

export class BlogLoader extends BaseLoader {
  listBlogsLoader = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.toString();
    const blogs = await this._loader(
      blogsSlice.endpoints.getBlogs,
      request,
      query
    );
    return { blogs };
  };

  listBlogsSearchLoader = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.toString();
    const blogs = await this._loader(
      blogsSlice.endpoints.getBlogsSearch,
      request,
      query
    );
    return { blogs };
  };

  listPopularBlogsLoader = async ({ request }) => {
    const blogs = await this._loader(
      blogsSlice.endpoints.getPopularBlogs,
      request
    );
    return { blogs };
  };

  listFollowedBlogsLoader = async ({ request }) => {
    const blogs = await this._loader(
      blogsSlice.endpoints.getFollowedBlogs,
      request
    );
    return { blogs };
  };

  blogLoader = async ({ params, request }) => {
    return await this._loader(
      blogsSlice.endpoints.getBlogById,
      request,
      params.blogId
    );
  };

  myBlogLoader = async ({ request }) => {
    return await this._loader(blogsSlice.endpoints.getMyBlog, request);
  };
}
