import { Button } from 'react-bootstrap';
import { UserPosts } from '../../features/posts/userPosts/UserPosts';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import './Home.css';
import useScreenSize from '../../hooks/useScreenSize';

export function Home() {
  const vw = useScreenSize().width;

  const navigate = useNavigate();

  return (
    <main className='home'>
      <div className='heading'>
        <h2>Your {vw <= 375 ? '' : 'Blog'} Posts</h2>
        <Button
          className='add-post-button'
          variant='secondary'
          size='sm'
          onClick={() => navigate('/new-post')}
        >
          <AddIcon fontSize={vw <= 500 ? 'small' : 'large'} />{' '}
          {vw >= 700 ? 'New Blog Post' : vw <= 525 ? '' : 'New Post'}
        </Button>
      </div>
      <UserPosts />
    </main>
  );
}
