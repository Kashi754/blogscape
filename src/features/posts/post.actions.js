import { postsSlice } from './postsSlice';
import { redirect } from 'react-router-dom';

export const createPostAction =
  (dispatch) =>
  async ({ request }) => {
    let formData = await request.json();
    await dispatch(postsSlice.endpoints.createPost.initiate(formData));
    return redirect('/home');
  };

export const addCommentAction =
  (dispatch) =>
  async ({ request, params }) => {
    let formData = await request.json();
    const updates = {
      id: params.postId,
      body: formData,
    };
    if (formData.comment_id) {
      updates.commentId = formData.comment_id;
    }

    await dispatch(postsSlice.endpoints.addPostCommentById.initiate(updates));
    return null;
  };
