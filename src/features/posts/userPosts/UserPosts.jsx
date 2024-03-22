import { useSelector } from 'react-redux';
import { selectUserPosts } from '../postsSlice';
import { addDefaultImg } from '../../../utils/addDefaultImage';
import './UserPosts.css';

export function UserPosts() {
  const posts = useSelector(selectUserPosts);

  if (posts.length < 1) return <h2>Loading...</h2>;
  console.log(posts);

  posts.forEach((element) => {
    console.log(element);
  });

  return (
    <ul className='home-posts'>
      {posts.map((post) => (
        <li
          className='home-post'
          key={post.id}
        >
          <div className='home-post-image-container'>
            <img
              className='home-post-image'
              src={post.image || '/images/default.jpg'}
              alt={post.title}
              onError={addDefaultImg}
            />
          </div>
          <div className='home-post-titles'>
            <h3>{post.title}</h3>
            {post.subtitle && <h4>{post.subtitle}</h4>}
          </div>
          <h5 className='home-post-comment-count'>
            {post.num_comments || 100} comments
          </h5>
        </li>
      ))}
    </ul>
  );
}
