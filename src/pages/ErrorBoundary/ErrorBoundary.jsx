import { useRouteError } from 'react-router';
import { Link } from 'react-router-dom';
import './ErrorBoundary.css';

export default function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  return (
    <main className='error-boundary'>
      <h1>Oops!</h1>
      <h2>Sorry, an unexpected error has occurred.</h2>
      <Link to='/'>Take Me Home</Link>
    </main>
  );
}
