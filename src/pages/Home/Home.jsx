import { Button } from 'react-bootstrap';
import { UserPosts } from '../../features/posts/userPosts/UserPosts';
import { useNavigate } from 'react-router';

export function Home() {
  const navigate = useNavigate();

  return (
    <main className='home'>
      <div className='heading'>
        <h2>Previous Blog Posts</h2>
        <Button
          className='add-post-button'
          variant='secondary'
          size='sm'
          onClick={() => navigate('/new-post')}
        >
          New Blog Post +
        </Button>
      </div>
      <UserPosts />
    </main>
  );
}
