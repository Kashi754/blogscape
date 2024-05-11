import { Link } from 'react-router-dom';
import { addDefaultImg } from '../../utils/addDefaultImage';
import './UserInfoCard.css';
import { Button } from 'react-bootstrap';

export function UserInfoCard({
  author,
  authorId,
  thumbnail,
  blogTitle,
  blogId,
}) {
  return (
    <section className='user-info-card'>
      <Link
        className='profile-link'
        to={`/profile/${authorId}`}
      >
        <img
          className='user-thumbnail'
          alt={author}
          src={thumbnail || '/images/default.png'}
          onError={addDefaultImg}
        />
        <h3>{'Written by: ' + author}</h3>
      </Link>

      <Button
        className='blog-link'
        variant='primary'
        size='sm'
        as={Link}
        to={`/blog/${blogId}`}
      >
        {blogTitle}
      </Button>
    </section>
  );
}
