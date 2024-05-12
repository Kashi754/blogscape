import './RecentPosts.css';
import { BlogPostCard } from '../../../components/BlogPostCard/BlogPostCard';
import { useGetPostsQuery } from '../postsSlice';
import { useEffect, useRef, useState } from 'react';
import { mirage } from 'ldrs';
import { Button } from 'react-bootstrap';

mirage.register();

export function RecentPosts() {
  const [page, setPage] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const postsRef = useRef(null);

  const { data: recentPosts = [], isFetching } = useGetPostsQuery(
    page ? new URLSearchParams(Object.entries(page)).toString() : ''
  );

  const [prevPage, setPrevPage] = useState({
    page: null,
    length: recentPosts.length,
  });

  if (
    loadingPage &&
    (recentPosts.length !== prevPage.length ||
      JSON.stringify(prevPage.page) === JSON.stringify(page))
  )
    setLoadingPage(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching && recentPosts.length > 0) {
        setLoadingPage(true);
        setPrevPage({ length: recentPosts.length, page: { ...page } });
        setPage({
          beforeId: recentPosts[recentPosts.length - 1].id,
          beforeDate: recentPosts[recentPosts.length - 1].createdAt,
        });
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [page, isFetching, recentPosts]);

  return (
    <section
      className='recent-posts'
      ref={postsRef}
    >
      <h2 className='recent-posts-heading'>Recent Posts</h2>
      <div className='recent-posts-list'>
        {recentPosts.map((post) => (
          <BlogPostCard
            key={post.id + 'recent'}
            post={post}
          />
        ))}
      </div>
      {loadingPage && (
        <div className='page-loader-container'>
          <l-mirage
            size='300'
            speed='2.5'
            color='var(--accent-color)'
          />
        </div>
      )}

      {window.innerHeight < postsRef.current?.offsetHeight && (
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
      )}
    </section>
  );
}
