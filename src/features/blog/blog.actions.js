import { blogsSlice } from './blogSlice';

export const toggleFollowedBlogAction =
  (store) =>
  async ({ request, params }) => {
    const blogId = params.blogId;
    const { following: previousFollowing } =
      blogsSlice.endpoints.getBlogById.select(params.blogId)(store.getState());

    const formData = {
      blogIds: [blogId],
      following: !previousFollowing,
    };

    return await store.dispatch(
      blogsSlice.endpoints.changeFollowedBlogs.initiate(formData)
    );
  };

export const editMyBlogAction = (dispatch) => async (formData) => {
  await dispatch(blogsSlice.endpoints.editMyBlog.initiate(formData));
};
