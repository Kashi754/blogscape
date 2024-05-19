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
      <div className='home-post-info'>
        <h5 className='home-post-comment-count'>
          {post.commentCount || 0} comments
        </h5>
        {post.tags?.length > 0 && (
          <ul className='home-post-tags'>
            {post.tags.map((tag) => (
              <li
                className='home-post-tag'
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}
