import { blogsSlice } from './blogSlice';

export const toggleFollowedBlogAction =
  (store) =>
  async ({ request, params }) => {
    const blogId = params.blogId;
    const form = await request.json();
    const following = !form.following;

    const formData = {
      blogIds: [blogId],
      following,
    };

    return await store.dispatch(
      blogsSlice.endpoints.changeFollowedBlogs.initiate(formData)
    );
  };

export const editMyBlogAction = (dispatch) => async (formData) => {
  await dispatch(blogsSlice.endpoints.editMyBlog.initiate(formData));
};
