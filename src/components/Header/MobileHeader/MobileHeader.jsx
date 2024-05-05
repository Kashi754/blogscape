import { Link } from 'react-router-dom';
import './mobileHeader.css';
import { DropdownNav } from '../DropdownNav';

export function MobileHeader({ blogId }) {
  return (
    <header className='mobile-header'>
      <Link to='/'>
        <h1 data-text='BlogScape'>BlogScape</h1>
      </Link>
      <DropdownNav blogId={blogId} />
    </header>
  );
}
