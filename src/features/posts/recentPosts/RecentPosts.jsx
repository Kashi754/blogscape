import './RecentPosts.css';
import { BlogPostCard } from '../../../components/BlogPostCard/BlogPostCard';
import { useGetPostsQuery } from '../postsSlice';

export function RecentPosts() {
  const { data: recentPosts = [] } = useGetPostsQuery();

  return (
    <section className='recent-posts'>
      <h2 className='recent-posts-heading'>Recent Posts</h2>
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
