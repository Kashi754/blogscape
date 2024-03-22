import { Outlet } from 'react-router';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';

export function Root() {
  const user = useSelector(selectUser);

  return (
    <>
      <Header loggedIn={!!user} />
      <Outlet />
      <Footer />
    </>
  );
}
