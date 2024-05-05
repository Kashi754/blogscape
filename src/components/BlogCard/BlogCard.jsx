import { Link } from 'react-router-dom';
import './BlogCard.css';
import { addBlogDefaultImg } from '../../utils/addDefaultImage';

export function BlogCard({ blog }) {
  return (
    <div className='blog-card'>
      <img
        className='blog-card-image'
        src={blog.image || '/images/blog-default-background.webp'}
        alt={blog.title}
        onError={addBlogDefaultImg}
      />
      <div className='blog-card-overlay' />
      <div className='blog-card-content'>
        <h3>{blog.title}</h3>
        <h4>{'— ' + blog.author}</h4>
        <p>{blog.description}</p>
        <div className='blog-card-footer'>
          <h5>{blog.followers} followers</h5>
          <Link
            className='visit-link'
            to={`/blog/${blog.id}`}
          >
            View Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
