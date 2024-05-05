import { useLoaderData } from 'react-router';
import { BlogHeader } from '../../features/blog/blogHeader/BlogHeader';
import { BlogPosts } from '../../features/blog/blogPosts/BlogPosts';
import './Blog.css';

export default function Blog() {
  const { blogId, query } = useLoaderData();

  return (
    <main className='blog'>
      <BlogHeader blogId={blogId} />
      <BlogPosts
        query={query}
        blogId={blogId}
      />
    </main>
  );
}
