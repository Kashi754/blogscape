import { useLayoutEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function useCookie(name) {
  const [cookieValue, setCookieValue] = useState(null);

  useLayoutEffect(() => {
    const cookie = Cookies.get(name);
    if (cookie) {
      const user = JSON.parse(cookie);
      setCookieValue(user);
    }
  }, [name]);

  const setCookie = (value, expirationDate) => {
    Cookies.set(name, JSON.stringify(value), {
      expires: expirationDate.toUTCString(),
      path: '/',
    });
  };

  const deleteCookie = () => {
    Cookies.remove(name);
    setCookieValue(null);
  };

  return [cookieValue, setCookie, deleteCookie];
}
