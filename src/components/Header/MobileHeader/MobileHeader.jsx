import { Link } from 'react-router-dom';
import './mobileHeader.css';
import { DropdownNav } from '../DropdownNav';

export function MobileHeader({ loggedIn }) {
  // TODO: retrieve user's blogId from the store

  return (
    <header className='mobile-header'>
      <Link to='/'>
        <h1 data-text='BlogScape'>BlogScape</h1>
      </Link>
      <DropdownNav
        loggedIn={loggedIn}
        blogId={1}
      />
    </header>
  );
}
