import './UserPosts.css';
import { HomePostCard } from '../../../components/HomePostCard/HomePostCard';
import { useGetMyPostsQuery } from '../../posts/postsSlice';

export function UserPosts() {
  const { data: posts } = useGetMyPostsQuery();
  if (posts.length < 1) return <h2>Loading...</h2>;

  return (
    <ul className='home-posts'>
      {posts.map((post) => (
        <HomePostCard
          post={post}
          key={post.id}
        />
      ))}
    </ul>
  );
}
