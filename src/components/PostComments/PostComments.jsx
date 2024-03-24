import { Comment } from '../Comment/Comment';

export function PostComments({ comments }) {
  return (
    <section className='post-comments'>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </section>
  );
}
