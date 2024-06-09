import { Link } from 'react-router-dom';
import './MainPostCard.css';
import { addDefaultImg } from '../../utils/addDefaultImage';
import { convertDateToString } from '../../utils/dateConversions';
import { ImageKitImage } from '../ImageKitImage/ImageKitImage';
export function MainPostCard({ post, isLink }) {
  if (!post) return null;
  const date = convertDateToString(post.createdAt);

  return (
    <div className='main-post'>
      {post.image && (
        <div
          className='post-image-container'
          data-test='post-image-container'
        >
          <ImageKitImage
            className='post-image'
            src={post.image}
            transformation={{ height: 400, aspectRatio: '1-1' }}
            alt={post.title}
            defaultImg={'/images/blog-default-background.webp'}
            onError={addDefaultImg}
          />
        </div>
      )}
      <div className='main-post-info-container'>
        <div
          className='main-post-info'
          data-test='main-post-info'
        >
          <div className='post-header'>
            <h4 data-test='post-date'>{date}</h4>
          </div>
          <div className='post-title'>
            <h2>{post.title}</h2>
            <h3 className='post-subtitle'>{post.subtitle}</h3>
          </div>
        </div>
        <div
          className='main-post-footer'
          data-test='main-post-footer'
        >
          <div className='main-post-categories'>
            {post.tags.map((tag) => (
              <h4
                data-test='main-post-tag'
                key={tag}
              >
                {tag}
              </h4>
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
