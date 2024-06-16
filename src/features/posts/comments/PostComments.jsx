import { Comment } from '../../../components/Comment/Comment';
import { useSubmit } from 'react-router-dom';
import { useState } from 'react';
import { AddCommentForm } from '../../../components/AddComment/AddCommentForm';
import { Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import './PostComments.css';

export function PostComments({ postId, comments }) {
  const submit = useSubmit();
  const [addComment, setAddComment] = useState(false);

  const submitComment = (body) => {
    setAddComment(false);
    const comment = { comment: body };

    submit(comment, {
      method: 'post',
      action: `/posts/${postId}`,
      encType: 'application/json',
    });
  };

  const submitReply = (reply, commentId) => {
    setAddComment(false);
    const comment = { comment: reply, comment_id: commentId };

    submit(comment, {
      method: 'post',
      action: `/posts/${postId}`,
      encType: 'application/json',
    });
  };

  const cancelComment = () => {
    setAddComment(false);
  };

  return (
    <section
      className='post-comments'
      data-test='post-comments'
    >
      <div className='comments-header'>
        <h3 data-test='comments-header'>Comments</h3>
        {!addComment && (
          <Button
            className='add-comment'
            data-test='add-comment-button'
            variant='secondary'
            size='md'
            onClick={() => setAddComment(true)}
          >
            <AddIcon fontSize='medium' /> Add Comment
          </Button>
        )}
        {addComment && (
          <AddCommentForm
            handleSubmit={submitComment}
            handleCancel={cancelComment}
          />
        )}
      </div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          handleSubmitReply={submitReply}
        />
      ))}
    </section>
  );
}
