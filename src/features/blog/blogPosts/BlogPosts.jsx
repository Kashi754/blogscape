import { useGetBlogByIdQuery } from '../blogSlice';
import { BlogPostCard } from '../../../components/BlogPostCard/BlogPostCard';
import { MainPostCard } from '../../../components/MainPostCard/MainPostCard';
import './BlogPosts.css';
import { useLoaderData } from 'react-router';
import { useGetPostsQuery } from '../../posts/postsSlice';

export function BlogPosts() {
  const { q, blogId } = useLoaderData();
  const { author } = useGetBlogByIdQuery(blogId).data || {};
  const [mostRecentPost, ...posts] = useGetPostsQuery(q).data || [];

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
