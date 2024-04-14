// src/API/index.js

import axios from 'axios';
import { nanoid } from 'nanoid';

export {
  loadUser,
  registerUser,
  updateUser,
  verifyPassword,
  updateUserSocialMedia,
} from '../features/user/userAPI';
export { login, logout } from '../features/auth/authAPI';
export { loadUserPosts } from '../features/userPosts/userPostsAPI';
export { loadBlog } from '../features/blog/blogAPI';
export { loadPost, createPost } from '../features/post/postAPI';
export {
  loadComments,
  loadReplies,
  addComment,
} from '../features/comments/commentsAPI';
export { loadFollowedBlogs } from '../features/followedBlogs/followedBlogsAPI';
export { loadPopularBlogs } from '../features/popularBlogs/popularBlogsAPI';
export { loadRecentPosts } from '../features/recentPosts/recentPostsAPI';
export { loadSearchResults } from '../features/search/searchAPI';
export { loadTags, addTag } from '../features/tags/tagsAPI';
export {
  getRandomBlogId,
  getRandomPostId,
} from '../features/selectRandom/selectRandomAPI';

export async function uploadImage(file, folder) {
  const extension = file.type.split('/')[1];
  const newImageName = nanoid() + `.${extension}`;

  // TODO: get signature from server

  const response = await axios.get('http://localhost:5000/secret');

  const { token, expire, signature } = response.data;
  const { data } = await axios.post(
    'https://upload.imagekit.io/api/v1/files/upload',
    {
      file: file,
      publicKey: 'public_iILFPVBo5QbfK+36qOvA8VwUEzk=',
      signature: signature,
      expire: expire, // time until signature is valid
      token: token,
      fileName: newImageName,
      folder: '/' + folder,
      responseFields: 'fileId,url,thumbnailUrl',
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return {
    fileId: data.fileId,
    url: data.url,
    thumbnailUrl: data.thumbnailUrl,
  };
}
