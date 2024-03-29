function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

export async function getRandomBlogId() {
  return await Promise.resolve(getRandomInt(10));
}

export async function getRandomPostId() {
  return await Promise.resolve(getRandomInt(100));
}
