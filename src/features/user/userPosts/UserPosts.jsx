import './UserPosts.css';
import { HomePostCard } from '../../../components/HomePostCard/HomePostCard';
import { useGetMyPostsQuery } from '../../posts/postsSlice';
import { useEffect, useState } from 'react';
import { mirage } from 'ldrs';
import { Button } from 'react-bootstrap';

mirage.register();

export function UserPosts() {
  const [page, setPage] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);

  const { data: posts = [], isFetching } = useGetMyPostsQuery(
    page ? new URLSearchParams(Object.entries(page)).toString() : ''
  );

  const [prevPage, setPrevPage] = useState({
    page: null,
    length: posts.length,
  });

  if (
    loadingPage &&
    (posts.length !== prevPage.length ||
      JSON.stringify(prevPage.page) === JSON.stringify(page))
  )
    setLoadingPage(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (scrolledToBottom && !isFetching) {
        setLoadingPage(true);
        setPrevPage({ length: posts.length, page: { ...page } });
        setPage({
          beforeId: posts[posts.length - 1].id,
          beforeDate: posts[posts.length - 1].createdAt,
        });
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching, posts]);

  return (
    <>
      <ul className='home-posts'>
        {posts.map((post) => (
          <HomePostCard
            post={post}
            key={post.id + 'home'}
          />
        ))}
      </ul>
      {loadingPage && (
        <div className='page-loader-container'>
          <l-mirage
            size='300'
            speed='2.5'
            color='var(--accent-color)'
          />
        </div>
      )}

      <div className='back-to-top-container'>
        <Button
          type='button'
          variant='secondary'
          size='xl'
          className='back-to-top-button'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to Top
        </Button>
      </div>
    </>
  );
}
