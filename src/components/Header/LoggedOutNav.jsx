import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function LoggedOutNav() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul
        className='header-links'
        data-test='logged-out-nav'
      >
        <li>
          <Link to='/'>API</Link>
        </li>
        <li>
          <Link to='/'>Help</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Button
            variant='primary'
            onClick={() => navigate('/register')}
            size='sm'
          >
            Sign Up
          </Button>
        </li>
      </ul>
    </nav>
  );
}
