import { useSelector } from 'react-redux';
import { selectAuthenticated, selectToken } from './authSlice';
import { Navigate } from 'react-router';

const requireAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const isAuthenticated = useSelector(selectAuthenticated);
    if (!isAuthenticated) {
      return (
        <Navigate
          to='/login'
          replace
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default requireAuth;
