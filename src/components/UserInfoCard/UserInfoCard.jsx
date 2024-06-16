import { Link } from 'react-router-dom';
import { addDefaultImg } from '../../utils/addDefaultImage';
import './UserInfoCard.css';
import { Button } from 'react-bootstrap';
import { ImageKitImage } from '../ImageKitImage/ImageKitImage';

export function UserInfoCard({
  author,
  authorId,
  thumbnail,
  blogTitle,
  blogId,
}) {
  return (
    <section
      className='user-info-card'
      data-test='user-info-card'
    >
      <Link
        className='profile-link'
        to={`/profile/${authorId}`}
      >
        <ImageKitImage
          className='user-thumbnail'
          data-test='author-image'
          alt={author}
          src={thumbnail}
          defaultImg={'/images/default.png'}
          onError={addDefaultImg}
          transformation={{ height: 40, aspectRatio: '1-1' }}
        />
        <h3>{'Written by: ' + author}</h3>
      </Link>

      <Button
        className='blog-link'
        data-test='blog-link'
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
