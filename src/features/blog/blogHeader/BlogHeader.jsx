import { useSelector } from 'react-redux';
import { selectBlogHeader } from '../blogSlice';
import { Button } from 'react-bootstrap';
import './BlogHeader.css';
import { selectUserId } from '../../auth/authSlice';
import { useParams } from 'react-router';
import { useSubmit } from 'react-router-dom';

export function BlogHeader() {
  const { title, description, image, author, followers, followed } =
    useSelector(selectBlogHeader);

  const userId = useSelector(selectUserId);
  const userIdParam = parseInt(useParams().userId);
  const submit = useSubmit();

  function followBlog(e) {
    e.preventDefault();
    submit(null, { method: 'post', action: `/blog/${userIdParam}` });
  }

  return (
    <header
      className='blog-header'
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='blog-header-wrapper'>
        <section className='blog-header-info'>
          <div className='blog-title'>
            <h2>{title}</h2>
            <h3>{author}</h3>
          </div>
          <p>{description}</p>
        </section>

        <section className='follower-section'>
          <h3>{followers} followers</h3>
          {userId === userIdParam ? null : followed ? (
            <div>
              <Button
                id='follow-button'
                variant='secondary'
                disabled
                size='sm'
                className='follow-button'
              >
                Following
              </Button>
              <button
                className='unfollow-button'
                onClick={followBlog}
              >
                Unfollow
              </button>
            </div>
          ) : (
            <Button
              id='follow-button'
              variant='secondary'
              onClick={followBlog}
              size='sm'
              className='follow-button'
            >
              Follow
            </Button>
          )}
        </section>
      </div>
    </header>
  );
}
