import { useSelector } from 'react-redux';
import { selectBlogPosts } from '../blogSlice';
import { BlogPostCard } from '../../../components/BlogPostCard/BlogPostCard';
import { MainPostCard } from '../../../components/MainPostCard/MainPostCard';
import './BlogPosts.css';

export function BlogPosts() {
  const { mostRecentPost, posts, author } = useSelector(selectBlogPosts);

  return (
    <section>
      <MainPostCard
        post={mostRecentPost}
        author={author}
        isLink={true}
      />
      <section className='blog-posts'>
        {posts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
          />
        ))}
      </section>
    </section>
  );
}
