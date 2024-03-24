import { loadUser } from '../API';

export async function verifyLoggedIn(store, dispatch) {
  const userId = store.getState().user.user.id;
  if (userId) return userId;

  await dispatch(loadUser(1));

  const error = store.getState().user.error;
  if (error) throw new Error(error.message);
  return store.getState().user.user.id;
}
