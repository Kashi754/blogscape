import { useState } from 'react';
import { convertDateToString } from '../../utils/dateConversions';
import './Comment.css';
import { useFetchReplies } from '../../hooks/useFetchReplies';
import { Link } from 'react-router-dom';

export function Comment({ comment, isReply = false, zIndex = 0 }) {
  const {
    id,
    userImage,
    userName,
    userId,
    createdAt,
    body,
    replies: replyCount,
  } = comment;
  const date = convertDateToString(createdAt);

  const [repliesVisible, setRepliesVisible] = useState(false);
  const { replies, fetchReplies } = useFetchReplies();

  const replyToComment = () => {
    console.log('Replying to comment');
  };

  const toggleReplies = (e) => {
    if (!repliesVisible && replyCount > 0 && !replies[id]) {
      e.preventDefault();
      fetchReplies(id);
    }
    setRepliesVisible(!repliesVisible);
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
          />
        )}
        <div className='comment-body'>
          <div className='comment-header'>
            <Link to={`/users/${userId}`}>{userName}</Link>
            <h5>{date}</h5>
          </div>
          <p>{body}</p>
          <div className='comment-buttons'>
            <button
              className='reply-button'
              onClick={replyToComment}
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
        </div>
      </div>
      {repliesVisible && replies[id] && (
        <div className='replies'>
          {replies[id].map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
