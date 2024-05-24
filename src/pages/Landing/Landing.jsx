import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './landing.css';

export function Component() {
  const navigate = useNavigate();

  return (
    <main className='landing'>
      <h2>Create Your Space</h2>
      <p>
        BlockScape is a space to unlock your creativity, and share your thoughts
        with the world. You can write your own blog or just read what other
        people are saying.
      </p>
      <Button
        variant='secondary'
        size='xl'
        onClick={() => navigate('/register')}
      >
        Sign Up Today
      </Button>
    </main>
  );
}
