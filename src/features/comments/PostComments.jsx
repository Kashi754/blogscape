import { useSelector } from 'react-redux';
import { Comment } from '../../components/Comment/Comment';
import { selectComments } from './commentsSlice';
import { useSubmit } from 'react-router-dom';
import { useState } from 'react';
import { AddCommentForm } from '../../components/AddComment/AddCommentForm';
import { Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import './PostComments.css';

export function PostComments({ postId }) {
  const comments = useSelector(selectComments);
  const submit = useSubmit();
  const [addComment, setAddComment] = useState(false);

  const submitComment = (body, commentId) => {
    setAddComment(false);
    const comment = { body };

    if (commentId) {
      comment.commentId = commentId;
    }

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
    <section className='post-comments'>
      <div className='comments-header'>
        <h3>Comments</h3>
        {!addComment && (
          <Button
            className='add-comment'
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
          handleSubmitReply={submitComment}
        />
      ))}
    </section>
  );
}
