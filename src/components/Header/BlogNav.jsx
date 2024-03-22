import { Link } from 'react-router-dom';

export function BlogNav() {
  // TODO: retrieve user's blogId from the store
  let blogId = 1;
  return (
    <nav>
      <ul className='header-links'>
        <li>
          <Link to='/'>Browse Blogs</Link>
        </li>
        <li>
          <Link to={`/blog/${blogId}`}>My Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
