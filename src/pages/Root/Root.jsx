import { Outlet } from 'react-router';
import { Header } from '../../components/Header/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { MobileHeader } from '../../components/Header/MobileHeader/MobileHeader';
import './Root.css';
import { useSelector } from 'react-redux';
import { selectAuthenticated } from '../../features/auth/authSlice';

export default function Root() {
  const authenticated = useSelector(selectAuthenticated);

  return (
    <>
      <Header loggedIn={authenticated} />
      <MobileHeader loggedIn={authenticated} />
      <Outlet />
      <Footer />
    </>
  );
}
