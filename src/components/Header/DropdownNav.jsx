import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const DropdownButton = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant='primary'
    size='sm'
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className='dropdown-button'
  >
    {children}
  </Button>
));

const DropdownLink = React.forwardRef(({ children, onClick, to }, ref) => (
  <Link
    className='dropdown-link'
    ref={ref}
    to={to}
    onClick={(e) => {
      onClick(e);
    }}
  >
    {children}
  </Link>
));

export function DropdownNav({ loggedIn, blogId }) {
  const navigate = useNavigate();

  if (loggedIn) {
    return (
      <Dropdown autoClose='true'>
        <Dropdown.Toggle variant='primary'>
          <MenuIcon />
        </Dropdown.Toggle>
        <Dropdown.Menu className='modal-header-links'>
          <Dropdown.Item
            as={DropdownButton}
            onClick={() => navigate('/profile')}
          >
            Profile
          </Dropdown.Item>
          <Dropdown.Item
            as={DropdownLink}
            to={`/blog/${blogId}`}
          >
            My Blog
          </Dropdown.Item>
          <Dropdown.Item
            as={DropdownLink}
            to={'/browse'}
          >
            Browse Blogs
          </Dropdown.Item>
          <Dropdown.Item
            as={DropdownLink}
            to={'/'}
          >
            API
          </Dropdown.Item>
          <Dropdown.Item
            as={DropdownLink}
            to={'/'}
          >
            Help
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            as={DropdownLink}
            to={'/logout'}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return (
      <Dropdown>
        <Dropdown.Toggle variant='primary'>Open Menu</Dropdown.Toggle>
        <Dropdown.Menu className='header-links'>
          <Dropdown.Item
            as={DropdownButton}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </Dropdown.Item>
          <Dropdown.Item
            as={DropdownLink}
            to={'/login'}
          >
            Login
          </Dropdown.Item>
          <Dropdown.Item
            as={DropdownLink}
            to={'/'}
          >
            API
          </Dropdown.Item>
          <Dropdown.Item
            as={DropdownLink}
            to={'/'}
          >
            Help
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
