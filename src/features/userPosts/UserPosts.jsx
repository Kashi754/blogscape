import { useSelector } from 'react-redux';
import { selectUserPosts } from './userPostsSlice';
import './UserPosts.css';
import { HomePostCard } from '../../components/HomePostCard/HomePostCard';

export function UserPosts() {
  const posts = useSelector(selectUserPosts);

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
