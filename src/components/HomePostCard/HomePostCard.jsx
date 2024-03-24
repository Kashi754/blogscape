import { addDefaultImg } from '../../utils/addDefaultImage.js';
import { Link } from 'react-router-dom';
import './HomePostCard.css';

export function HomePostCard({ post }) {
  return (
    <Link
      className='home-post'
      to={`/posts/${post.id}`}
    >
      <div className='home-post-image-container'>
        <img
          className='home-post-image'
          src={post.image || '/images/default.png'}
          alt={post.title}
          onError={addDefaultImg}
        />
      </div>
      <div className='home-post-titles'>
        <h3>{post.title}</h3>
        {post.subtitle && <h4>{post.subtitle}</h4>}
        <h4>Or how I learned to code</h4>
      </div>
      <h5 className='home-post-comment-count'>
        {post.num_comments || 100} comments
      </h5>
    </Link>
  );
}
