import { useGetBlogByIdQuery } from '../blogSlice';
import { Button } from 'react-bootstrap';
import './BlogHeader.css';
import { Link, useSubmit } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserAuth } from '../../auth/authSlice';

export function BlogHeader({ blogId }) {
  const { title, description, image, author, authorId, followers, following } =
    useGetBlogByIdQuery(blogId).data || {};

  const { displayName } = useSelector(selectUserAuth) || {};
  const submit = useSubmit();

  function toggleBlogFollowing(e) {
    e.preventDefault();
    submit(
      { following },
      { method: 'post', encType: 'application/json', action: `/blog/${blogId}` }
    );
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
            <Link to={'/profile/' + authorId}>{'— ' + author}</Link>
          </div>
          <p>{description}</p>
        </section>

        <section className='follower-section'>
          <h3>{followers} followers</h3>
          {displayName === author ? null : following ? (
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
                onClick={toggleBlogFollowing}
              >
                Unfollow
              </button>
            </div>
          ) : (
            <Button
              id='follow-button'
              variant='secondary'
              onClick={toggleBlogFollowing}
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
