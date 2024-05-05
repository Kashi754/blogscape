import { Outlet } from 'react-router';
import { Header } from '../../components/Header/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { MobileHeader } from '../../components/Header/MobileHeader/MobileHeader';
import './Root.css';
import { useSelector } from 'react-redux';
import { selectUserAuth } from '../../features/auth/authSlice';

export default function Root() {
  const user = useSelector(selectUserAuth) || {};
  const { blogId } = user;

  return (
    <>
      <Header blogId={blogId} />
      <MobileHeader blogId={blogId} />
      <Outlet />
      <Footer />
    </>
  );
}
