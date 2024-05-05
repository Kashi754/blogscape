import { Navigate } from 'react-router';
import Cookies from 'js-cookie';

const requireAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const userCookie = Cookies.get('user');
    if (!userCookie) {
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
