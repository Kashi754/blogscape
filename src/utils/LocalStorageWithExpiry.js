export function getWithExpiry(key) {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }
  const data = JSON.parse(item);
  const now = new Date();
  if (now.getTime() > data.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return { id: data.id, username: data.username, expiry: data.expiry };
}

export function setWithExpiry(key, value1, value2, ttl) {
  const now = new Date();
  const item = {
    id: value1,
    username: value2,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
