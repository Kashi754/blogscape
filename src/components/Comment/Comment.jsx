import { useState } from 'react';
import './Comment.css';
import { Link, useParams } from 'react-router-dom';
import { AddCommentForm } from '../AddComment/AddCommentForm';
import { convertDateToString } from '../../utils/dateConversions';
import { addDefaultImg } from '../../utils/addDefaultImage';
import { useLazyGetPostRepliesByIdQuery } from '../../features/posts/postsSlice';
import { ImageKitImage } from '../ImageKitImage/ImageKitImage';

// TODO: show replies

export function Comment({ comment, handleSubmitReply, isReply = false }) {
  const { postId } = useParams();
  const { id, createdAt, body, replyCount, user } = comment;
  const [triggerGetPostRepliesById, { data: replies, error: repliesError }] =
    useLazyGetPostRepliesByIdQuery();

  const date = convertDateToString(createdAt);
  const { id: userId, display_name: userName, thumbnail: userImage } = user;

  const [repliesVisible, setRepliesVisible] = useState(false);
  const [replying, setReplying] = useState(false);

  const toggleReplies = async (e) => {
    if (!repliesVisible && replyCount > 0) {
      e.preventDefault();
      triggerGetPostRepliesById({ id: postId, commentId: id });
    }
    setRepliesVisible(!repliesVisible);
  };

  const handleReply = (reply) => {
    setReplying(false);
    handleSubmitReply(reply, id);
  };

  return (
    <div
      className={
        isReply ? 'comment-container reply-container' : 'comment-container'
      }
      data-test='comment-container'
    >
      <div
        className={isReply ? 'reply comment' : 'comment'}
        data-test={isReply ? 'reply' : 'comment'}
      >
        <ImageKitImage
          className='comment-image'
          src={userImage}
          transformation={{ height: 70, aspectRatio: '1-1' }}
          alt={userName}
          defaultImg={'/images/default.png'}
          onError={addDefaultImg}
        />
        <div className='comment-body'>
          <div
            className='comment-header'
            data-test='comment-header'
          >
            <Link to={`/profile/${userId}`}>{userName}</Link>
            <h5 data-test='comment-date'>{date}</h5>
          </div>

          <p data-test='comment-body'>{body}</p>

          {!replying && (
            <div className='comment-buttons'>
              <button
                className='reply-button'
                data-test='reply-button'
                type='button'
                onClick={() => setReplying(true)}
              >
                Reply
              </button>
              {replyCount > 0 && (
                <button
                  className={
                    repliesVisible
                      ? 'show-replies-button hide-replies-button'
                      : 'show-replies-button'
                  }
                  data-test='show-replies-button'
                  onClick={toggleReplies}
                >
                  {repliesVisible && replyCount
                    ? 'Hide Replies'
                    : 'View ' +
                      replyCount +
                      (parseInt(replyCount) === 1 ? ' Reply' : ' Replies')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {repliesVisible && replies && (
        <div
          className='replies'
          data-test='replies'
        >
          {replies.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleSubmitReply={handleSubmitReply}
              isReply={true}
            />
          ))}
        </div>
      )}
      {repliesError && <h4>Failed to get replies</h4>}
      {replying && (
        <AddCommentForm
          handleSubmit={handleReply}
          handleCancel={() => setReplying(false)}
          isReply={true}
        />
      )}
    </div>
  );
}
