import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function LoggedInNav() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/profile');
  };

  return (
    <nav>
      <ul className='header-links'>
        <li>
          <Link to='/'>API</Link>
        </li>
        <li>
          <Link to='/'>Help</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>
        <li>
          <Button
            variant='primary'
            onClick={handleNavigate}
            size='sm'
          >
            Profile
          </Button>
        </li>
      </ul>
    </nav>
  );
}
