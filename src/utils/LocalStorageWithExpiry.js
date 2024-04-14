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
  return { value: data.value, expiry: data.expiry };
}

export function setWithExpiry(key, value, ttl) {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
