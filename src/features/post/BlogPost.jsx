import { useSelector } from 'react-redux';
import { MainPostCard } from '../../components/MainPostCard/MainPostCard';
import { PostBody } from '../../components/PostBody/PostBody';
import { PostComments } from '../comments/PostComments';
import { selectPost } from './postSlice';

export function BlogPost() {
  const post = useSelector(selectPost);

  return (
    <div>
      <MainPostCard
        post={post}
        author={post.author}
        isLink={false}
      />
      <PostBody body={post.body} />
      <PostComments />
    </div>
  );
}
