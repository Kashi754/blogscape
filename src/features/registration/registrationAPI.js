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
