import { MainPostCard } from '../../../components/MainPostCard/MainPostCard';
import { PostBody } from '../../../components/PostBody/PostBody';
import { PostComments } from '../comments/PostComments';
import { useLoaderData } from 'react-router';
import {
  useGetPostByIdQuery,
  useGetPostCommentsByIdQuery,
} from '../postsSlice';

export function BlogPost() {
  const { postId } = useLoaderData();
  const { data: post = {} } = useGetPostByIdQuery(postId);
  const { data: comments = [] } = useGetPostCommentsByIdQuery(postId);

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
