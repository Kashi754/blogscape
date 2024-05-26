const SOCIAL_MEDIA = {
  facebook: 'https://facebook.com/kashi754',
  twitter: 'https://twitter.com/kashi754',
  instagram: 'https://instagram.com/kashi754',
  tiktok: 'https://tiktok.com/kashi754',
};

const BLOGS = [
  {
    id: 1,
    title: 'My Blog',
    description: 'My Blog Description',
    author: 'kashi754',
    authorId: 1,
    createdAt: '2021-11-05T16:40:01.000Z',
    followers: 2,
    following: false,
  },
];

for (let i = 2; i <= 10; i++) {
  const following = i % 3 === 0 ? true : false;
  BLOGS.push({
    id: i,
    title: `Test Blog ${i}`,
    description: `Test Blog Description ${i}`,
    author: `Test User ${i}`,
    authorId: i,
    createdAt: '2021-11-05T16:40:01.000Z',
    followers: 2,
    following: following,
  });
}

const USERS = [
  {
    id: 1,
    displayName: 'kashi754',
    username: 'kashi754',
    email: 'kashi754@me.com',
    website: 'http://www.kashi754.me',
    location: 'United States',
    locationCode: 'US',
    blog: {
      id: 1,
      title: 'My Blog',
      description: 'My Blog Description',
      author: 'kashi754',
      createdAt: '2021-11-05T16:40:01.000Z',
      followers: 2,
    },
    socialMedia: SOCIAL_MEDIA,
  },
];

for (let i = 2; i <= 10; i++) {
  USERS.push({
    id: i,
    displayName: `Test User ${i}`,
    username: `Test User ${i}`,
    email: `Test User ${i}@me.com`,
    website: `http://www.Test User ${i}.me`,
    location: 'United States',
    locationCode: 'US',
    blog: {
      id: i,
      title: `Test Blog ${i}`,
      description: `Test Blog Description ${i}`,
      author: `Test User ${i}`,
      createdAt: '2021-11-05T16:40:01.000Z',
      followers: 2,
    },
    socialMedia: {},
  });
}

const COMMENTS = [];

for (let i = 1; i < 10; i++) {
  for (let j = 0; j < 5; j++) {
    if (i % 3 !== 0) {
      COMMENTS.push({
        id: i,
        postId: j,
        body: `Test Comment ${j}`,
        user: {
          id: USERS[i].id,
          displayName: USERS[i].displayName,
        },
        createdAt: '2021-11-05T16:40:01.000Z',
      });
    } else {
      COMMENTS.push({
        id: i,
        postId: j,
        commentId: i - 1,
        body: `Test Comment ${j}`,
        user: {
          id: 1,
          displayName: 'kashi754',
        },
        createdAt: '2021-11-05T16:40:01.000Z',
      });
    }
    if (i % 3 === 2) {
      COMMENTS[i].replyCount = 1;
    }
  }
}

const POSTS = [];

for (const [i, user] of USERS.entries()) {
  for (let j = 0; j < 4; j++) {
    POSTS.push({
      author: user.displayName,
      authorId: user.id,
      blogId: user.blog.id,
      id: i + j,
      title: `Test Post ${j}`,
      subtitle: `Test Post Subtitle ${j}`,
      body: `Test Post Body ${j}`,
      createdAt: '2021-11-05T16:40:01.000Z',
      tags: ['#mock', '#tag', '#test'],
      commentCount: COMMENTS.reduce((acc, curr) => {
        if (curr.postId === j) {
          return acc + 1;
        } else {
          return acc;
        }
      }),
    });
  }
}

const TAGS = [
  { id: 1, name: '#mock' },
  { id: 2, name: '#tag' },
  { id: 3, name: '#test' },
];

export default {
  BLOGS,
  USERS,
  SOCIAL_MEDIA,
  COMMENTS,
  POSTS,
  TAGS,
};
