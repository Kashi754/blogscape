import { setAuthenticated } from '../features/auth/authSlice';
import { getWithExpiry } from './LocalStorageWithExpiry';

export function verifyLoggedIn(store, dispatch) {
  const auth = store.getState().auth;
  if (auth.authenticated) {
    const now = new Date();
    const notExpired = now.getTime() < auth.expiry;
    if (notExpired) {
      return auth.userId;
    }
  }
  const { id, username, expiry } = getWithExpiry('auth');
  if (!id) {
    dispatch(setAuthenticated({ auth: false }));
    throw new Error('Please log in');
  }

  dispatch(setAuthenticated({ id, username, expiry }));
  return id;
}
