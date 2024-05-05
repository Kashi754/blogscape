import { Link } from 'react-router-dom';
import './BlogPostCard.css';

export function BlogPostCard({ post }) {
  return (
    <div className='post-item'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div className='post-item-footer'>
        <Link to={`/posts/${post.id}`}>Read More</Link>
        <div className='post-item-categories'>
          {post.tags.map((tag) => (
            <h4 key={tag}>{tag}</h4>
          ))}
        </div>
      </div>
    </div>
  );
}
