import { Link } from 'react-router-dom';
import './HomePostCard.css';
import { ImageKitImage } from '../ImageKitImage/ImageKitImage.jsx';
import { addDefaultImg } from '../../utils/addDefaultImage.js';

export function HomePostCard({ post }) {
  return (
    <Link
      className='home-post'
      to={`/posts/${post.id}`}
      data-test='home-post-card'
    >
      <div className='home-post-image-container'>
        <ImageKitImage
          className='home-post-image'
          src={post.image}
          transformation={{ height: 130, aspectRatio: '1-1' }}
          alt={post.title}
          defaultImg={'/images/default.png'}
          onError={addDefaultImg}
        />
      </div>
      <div className='home-post-titles'>
        <h3>{post.title}</h3>
        {post.subtitle && <h4>{post.subtitle}</h4>}
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
