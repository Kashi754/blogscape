import { Link } from 'react-router-dom';
import './MainPostCard.css';
import { addDefaultImg } from '../../utils/addDefaultImage';
import { convertDateToString } from '../../utils/dateConversions';
export function MainPostCard({ post, author, isLink }) {
  if (!post) return null;
  const date = convertDateToString(post.createdAt);

  return (
    <div className='main-post'>
      {post.image && (
        <div className='post-image-container'>
          <img
            src={post.image}
            alt={post.title}
            onError={addDefaultImg}
          />
        </div>
      )}
      <div className='main-post-info-container'>
        <div className='main-post-info'>
          <div className='post-header'>
            <h4>{date}</h4>
          </div>
          <div className='post-title'>
            <h2>{post.title}</h2>
            <h3 className='post-subtitle'>{post.subtitle}</h3>
          </div>
        </div>
        <div className='main-post-footer'>
          <div className='main-post-categories'>
            {post.tags.map((tag) => (
              <h4 key={tag}>{tag}</h4>
            ))}
          </div>
          {isLink && (
            <Link
              className='read-more-link'
              to={`/posts/${post.id}`}
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
