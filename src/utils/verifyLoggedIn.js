import { setAuthenticated } from '../features/auth/authSlice';
import Cookies from 'js-cookie';

export function verifyLoggedIn(store) {
  const auth = store.getState().auth;
  const now = new Date();
  if (auth.authenticated) {
    const notExpired = now.getTime() < auth.expiry;
    console.log(now.getTime(), auth.expiry, notExpired);
    if (notExpired) {
      return auth.userId;
    } else {
      store.dispatch(setAuthenticated({ auth: false }));
      throw new Error('Please log in');
    }
  }

  console.log(auth);

  const userCookie = Cookies.get('user');

  if (userCookie) {
    const user = JSON.parse(userCookie);
    store.dispatch(setAuthenticated(user));
    return user.id;
  } else {
    throw new Error('Please log in');
  }
}
