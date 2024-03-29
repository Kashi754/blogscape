import { useSelector } from 'react-redux';
import { selectRecentPosts } from './recentPostsSlice';
import './RecentPosts.css';
import { BlogPostCard } from '../../components/BlogPostCard/BlogPostCard';

export function RecentPosts() {
  const recentPosts = useSelector(selectRecentPosts);

  return (
    <section className='recent-posts'>
      <h2>Recent Posts</h2>
      <div className='recent-posts-list'>
        {recentPosts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </section>
  );
}
