import { Outlet } from 'react-router';
import { Header } from '../../components/Header/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { MobileHeader } from '../../components/Header/MobileHeader/MobileHeader';
import './Root.css';

export default function Root() {
  const user = useSelector(selectUser);

  return (
    <>
      <Header loggedIn={!!user} />
      <MobileHeader loggedIn={!!user} />
      <Outlet />
      <Footer />
    </>
  );
}
