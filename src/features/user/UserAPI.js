import { setUser } from './userSlice';

export async function userLoader(dispatch) {
  try {
    const serverUrl = 'http://jsonplaceholder.typicode.com/users/1/';

    const response = await fetch(serverUrl);
    const user = await response.json();

    if (user) {
      dispatch(setUser(user));
      return user.id;
    }

    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function registerUser(formData) {
  try {
    const serverUrl = 'http://jsonplaceholder.typicode.com/users/';
    const response = await fetch(serverUrl, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const user = await response.json();
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function loginUser(formData) {
  try {
    const serverUrl = 'http://jsonplaceholder.typicode.com/users/1';
    const response = await fetch(serverUrl, {
      method: 'GET',
    });
    const user = await response.json();
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}
