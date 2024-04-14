import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className='not-found'>
      <h1>404</h1>
      <h2>Not Found</h2>
      <Link to='/'>Take Me Home</Link>
    </main>
  );
}
