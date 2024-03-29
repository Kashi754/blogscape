import { useEffect, useRef, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import './SelectRandomButton.css';

export const SelectRandomButton = () => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const ref = useRef();

  function navigateRandomBlog() {
    const blogId = 
  }

  function navigateRandomPost() {
    return null;
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
      >
        Blog?
      </Button>
      <Button
        variant='secondary'
        type='button'
        onClick={navigateRandomPost}
        aria-label='go to random post'
        className='select-random'
      >
        Post?
      </Button>
    </ButtonGroup>
  );
};
