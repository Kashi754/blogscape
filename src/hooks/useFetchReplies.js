import { useState } from 'react';
import { convertTimestampToDate } from '../utils/dateConversions';

export function useFetchReplies() {
  const [replies, setReplies] = useState({});

  function fetchReplies(commentId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${commentId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          data.forEach((reply) => {
            reply.createdAt = convertTimestampToDate('1999-01-08 04:05:06');
            reply.userName = 'Jane Doe';
            reply.userImage = 'https://picsum.photos/200/300';
            reply.replies = 5;
          });

          setReplies((prev) => {
            return { ...prev, [commentId]: data };
          });
        }
      });
  }

  return { replies, fetchReplies };
}
