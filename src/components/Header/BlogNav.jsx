import { Link } from 'react-router-dom';

export function BlogNav({ blogId }) {
  return (
    <nav>
      <ul
        className='header-links'
        data-test='blog-nav'
      >
        <li>
          <Link to='/browse'>Browse</Link>
        </li>
        <li>
          <Link to={`/blog/${blogId}`}>My Blog</Link>
        </li>
      </ul>
    </nav>
  );
}
