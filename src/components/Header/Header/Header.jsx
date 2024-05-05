import { Link } from 'react-router-dom';
import { LoggedInNav } from '../LoggedInNav';
import { LoggedOutNav } from '../LoggedOutNav';
import { BlogNav } from '../BlogNav';
import './header.css';

export function Header({ blogId }) {
  return (
    <header className='header'>
      <div className='header-left'>
        <Link to='/'>
          <h1 data-text='BlogScape'>BlogScape</h1>
        </Link>
        {!!blogId && <BlogNav blogId={blogId} />}
      </div>
      {!!blogId ? <LoggedInNav /> : <LoggedOutNav />}
    </header>
  );
}
