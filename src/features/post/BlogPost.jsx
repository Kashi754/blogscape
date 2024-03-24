import { useSelector } from 'react-redux';
import { MainPostCard } from '../../components/MainPostCard/MainPostCard';
import { PostBody } from '../../components/PostBody/PostBody';
import { PostComments } from '../../components/PostComments/PostComments';
import { selectComments, selectPost } from './postSlice';

export function BlogPost() {
  const post = useSelector(selectPost);
  const comments = useSelector(selectComments);
  return (
    <div>
      <MainPostCard
        post={post}
        author={post.author}
        isLink={false}
      />
      <PostBody body={post.body} />
      <PostComments comments={comments} />
    </div>
  );
}
