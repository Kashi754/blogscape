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
          {post.categories.map((category) => (
            <h4 key={category}>{category}</h4>
          ))}
        </div>
      </div>
    </div>
  );
}
