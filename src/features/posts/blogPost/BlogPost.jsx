import { MainPostCard } from '../../../components/MainPostCard/MainPostCard';
import { PostBody } from '../../../components/PostBody/PostBody';
import { UserInfoCard } from '../../../components/UserInfoCard/UserInfoCard';
import { PostComments } from '../comments/PostComments';
import {
  useGetPostByIdQuery,
  useGetPostCommentsByIdQuery,
} from '../postsSlice';

export function BlogPost({ postId }) {
  const { data: post = {} } = useGetPostByIdQuery(postId);
  const { data: comments = [] } = useGetPostCommentsByIdQuery(postId);

  if (!post) return null;

  console.log(post);

  return (
    <div>
      <MainPostCard
        post={post}
        author={post.author}
        isLink={false}
      />
      <UserInfoCard
        author={post.author}
        authorId={post.authorId}
        thumbnail={post.authorThumbnail}
        blogTitle={post.blogTitle}
        blogId={post.blogId}
      />
      <PostBody body={post.body} />
      <PostComments
        comments={comments}
        postId={postId}
      />
    </div>
  );
}
