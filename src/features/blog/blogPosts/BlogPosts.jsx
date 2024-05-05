import { useGetBlogByIdQuery } from '../blogSlice';
import { BlogPostCard } from '../../../components/BlogPostCard/BlogPostCard';
import { MainPostCard } from '../../../components/MainPostCard/MainPostCard';
import './BlogPosts.css';
import { useGetPostsQuery } from '../../posts/postsSlice';

export function BlogPosts({ query, blogId }) {
  const { author } = useGetBlogByIdQuery(blogId).data || {};
  const [mostRecentPost, ...posts] = useGetPostsQuery(query).data || [];

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
