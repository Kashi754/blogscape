import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

export function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <h1 data-text='BlogScape'>BlogScape</h1>
      <nav>
        <ul className='header-links'>
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
    </header>
  );
}
