import { MainPostCard } from '../../../components/MainPostCard/MainPostCard';
import { PostBody } from '../../../components/PostBody/PostBody';
import { PostComments } from '../comments/PostComments';
import {
  useGetPostByIdQuery,
  useGetPostCommentsByIdQuery,
} from '../postsSlice';

export function BlogPost({ postId }) {
  const { data: post = {} } = useGetPostByIdQuery(postId);
  const { data: comments = [] } = useGetPostCommentsByIdQuery(postId);

  if (!post) return null;

  return (
    <div>
      <MainPostCard
        post={post}
        author={post.author}
        isLink={false}
      />
      <PostBody body={post.body} />
      <PostComments
        comments={comments}
        postId={postId}
      />
    </div>
  );
}
