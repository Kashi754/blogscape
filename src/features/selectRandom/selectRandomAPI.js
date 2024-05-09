import { axiosInstance } from '../../API/axiosBaseQuery';

export async function getRandomBlogId() {
  try {
    const {
      data: { id: blogId },
    } = await axiosInstance.get('/v1/blogs/random');
    return blogId;
  } catch (axiosError) {
    return 1;
  }
}

export async function getRandomPostId() {
  try {
    const {
      data: { id: postId },
    } = await axiosInstance.get('/v1/posts/random');
    return postId;
  } catch (axiosError) {
    return 1;
  }
}
