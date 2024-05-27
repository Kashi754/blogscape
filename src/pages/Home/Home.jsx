import { UserPosts } from '../../features/user/userPosts/UserPosts';
import { useNavigate } from 'react-router';
import AddIcon from '@mui/icons-material/Add';
import './Home.css';
import useScreenSize from '../../hooks/useScreenSize';
import { Button } from 'react-bootstrap';

export function Component() {
  const vw = useScreenSize().width;

  const navigate = useNavigate();

  return (
    <main className='home'>
      <div className='heading'>
        <h2 data-test='home-title'>Your {vw <= 375 ? '' : 'Blog'} Posts</h2>
        <Button
          className='add-post-button'
          variant='secondary'
          size='sm'
          onClick={() => navigate('/new')}
        >
          <AddIcon fontSize={vw <= 500 ? 'small' : 'large'} />{' '}
          {vw >= 700 ? 'New Blog Post' : vw <= 525 ? '' : 'New Post'}
        </Button>
      </div>
      <UserPosts />
    </main>
  );
}
