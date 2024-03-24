import { BlogHeader } from '../../features/blog/blogHeader/BlogHeader';
import { BlogPosts } from '../../features/blog/blogPosts/BlogPosts';
import './Blog.css';

export default function Blog() {
  return (
    <main className='blog'>
      <BlogHeader />
      <BlogPosts />
    </main>
  );
}
