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
