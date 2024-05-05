import { useState } from 'react';
import './Comment.css';
import { Link } from 'react-router-dom';
import { AddCommentForm } from '../AddComment/AddCommentForm';
import { convertDateToString } from '../../utils/dateConversions';
import { addDefaultImg } from '../../utils/addDefaultImage';

// TODO: show replies

export function Comment({ comment, handleSubmitReply, isReply = false }) {
  const { id, createdAt, body, replyCount, user } = comment;

  const date = convertDateToString(createdAt);
  const { id: userId, display_name: userName, thumbnail: userImage } = user;

  const [repliesVisible, setRepliesVisible] = useState(false);
  const [replying, setReplying] = useState(false);

  const toggleReplies = (e) => {
    if (!repliesVisible && replyCount > 0) {
      e.preventDefault();
    }
    setRepliesVisible(!repliesVisible);
  };

  const handleReply = (reply) => {
    setReplying(false);
    handleSubmitReply(reply, comment.id);
  };

  return (
    <div
      className={
        isReply ? 'comment-container reply-container' : 'comment-container'
      }
    >
      <div className={isReply ? 'reply comment' : 'comment'}>
        {userImage && (
          <img
            className='comment-image'
            src={userImage}
            alt={userName}
            onError={addDefaultImg}
          />
        )}
        <div className='comment-body'>
          <div className='comment-header'>
            <Link to={`/profile/${userId}`}>{userName}</Link>
            <h5>{date}</h5>
          </div>

          <p>{body}</p>

          {!replying && (
            <div className='comment-buttons'>
              <button
                className='reply-button'
                type='button'
                onClick={() => setReplying(true)}
              >
                Reply
              </button>

              <button
                className={
                  repliesVisible
                    ? 'show-replies-button hide-replies-button'
                    : 'show-replies-button'
                }
                onClick={toggleReplies}
              >
                {repliesVisible && replyCount
                  ? 'Hide Replies'
                  : 'View ' + replyCount + ' Replies'}
              </button>
            </div>
          )}
        </div>
      </div>
      {/* {repliesVisible && replies[id] && (
        <div className='replies'>
          {replies[id].map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleSubmitReply={handleSubmitReply}
              isReply={true}
            />
          ))}
        </div>
      )} */}
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
