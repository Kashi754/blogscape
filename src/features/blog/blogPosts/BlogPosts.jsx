import { useGetBlogByIdQuery } from '../blogSlice';
import { BlogPostCard } from '../../../components/BlogPostCard/BlogPostCard';
import { MainPostCard } from '../../../components/MainPostCard/MainPostCard';
import './BlogPosts.css';
import { mirage } from 'ldrs';
import { useGetPostsQuery } from '../../posts/postsSlice';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

mirage.register();

export function BlogPosts({ query, blogId }) {
  const [page, setPage] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const pageRef = useRef(null);

  const { data: author = {}, isFetching } = useGetBlogByIdQuery(blogId);
  const [mostRecentPost, ...posts] =
    useGetPostsQuery(
      page
        ? query + '&' + new URLSearchParams(Object.entries(page)).toString()
        : query
    ).data || [];

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
      if (scrolledToBottom && !isFetching && posts.length > 0) {
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
    <section ref={pageRef}>
      <MainPostCard
        post={mostRecentPost}
        author={author}
        isLink={true}
      />
      <section className='blog-posts'>
        {posts.map((post) => (
          <BlogPostCard
            key={post.id + 'blog'}
            post={post}
          />
        ))}
      </section>
      {loadingPage && (
        <div className='page-loader-container'>
          <l-mirage
            size='300'
            speed='2.5'
            color='var(--accent-color)'
          />
        </div>
      )}

      {window.innerHeight < pageRef.current?.offsetHeight && (
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
