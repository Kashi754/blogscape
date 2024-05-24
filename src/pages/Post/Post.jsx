import { useLoaderData } from 'react-router';
import { BlogPost } from '../../features/posts/blogPost/BlogPost';
import './Post.css';

export function Component() {
  const { postId } = useLoaderData();

  return (
    <main className='post'>
      <BlogPost postId={postId} />
    </main>
  );
}
