import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import './SelectRandomButton.css';
import { getRandomBlogId, getRandomPostId } from '../../API';
import { useNavigate } from 'react-router';

export const SelectRandomButton = () => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  async function navigateRandomBlog() {
    const blogId = await getRandomBlogId();
    navigate(`/blog/${blogId}`);
  }

  async function navigateRandomPost() {
    const postId = await getRandomPostId();
    navigate(`/posts/${postId}`);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== 'find-random-button'
      ) {
        setButtonSelected(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, buttonSelected]);

  return !buttonSelected ? (
    <Button
      variant='primary'
      type='button'
      onClick={() => setButtonSelected(true)}
      aria-label='find something new'
      size='lg'
      className='find-random'
      id='find-random-button'
    >
      Find Something New!
    </Button>
  ) : (
    <ButtonGroup
      aria-label='find something new'
      size='lg'
      ref={ref}
      className='find-random'
    >
      <Button
        variant='secondary'
        type='button'
        onClick={navigateRandomBlog}
        aria-label='go to random blog'
        className='select-random'
        id='button-left'
      >
        Blog?
      </Button>
      <Button
        variant='secondary'
        type='button'
        onClick={navigateRandomPost}
        aria-label='go to random post'
        className='select-random'
        id='button-right'
      >
        Post?
      </Button>
    </ButtonGroup>
  );
};
