import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { useLoaderData } from 'react-router';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import { BlogPostCard } from '../../components/BlogPostCard/BlogPostCard';
import { TagSearch } from '../../features/TagSearch/TagSearch';
import { useGetBlogsSearchQuery } from '../../features/blog/blogSlice';
import { useGetPostsSearchQuery } from '../../features/posts/postsSlice';
import { SelectRandomButton } from '../../features/selectRandom/SelectRandomButton';
import './Search.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1800 },
    items: 5,
    partialVisibilityGutter: 0,
  },
  desktop: {
    breakpoint: { max: 1800, min: 1200 },
    items: 4,
    partialVisibilityGutter: 0,
  },
  smallDesktop: {
    breakpoint: { max: 1200, min: 800 },
    items: 3,
    partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
    partialVisibilityGutter: 0,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 5,
  },
};

export default function Search() {
  const { q } = useLoaderData();
  const [page, setPage] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const searchRef = useRef(null);

  const { data: blogs, error: blogsError } = useGetBlogsSearchQuery(q);
  const {
    data: posts,
    error: postsError,
    isFetching,
  } = useGetPostsSearchQuery(
    page ? q + '&' + new URLSearchParams(Object.entries(page)).toString() : q
  );

  const [prevPage, setPrevPage] = useState({
    page: null,
    length: posts?.length || 0,
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
          beforeRank: posts[posts.length - 1].rank,
        });
      }
    };

    document.addEventListener('scroll', onScroll);

    return function () {
      document.removeEventListener('scroll', onScroll);
    };
  }, [isFetching, page, posts]);

  return (
    <main
      className='search'
      ref={searchRef}
    >
      <nav className='browse-nav'>
        <TagSearch resetPage={() => setPage(null)} />
        <SelectRandomButton />
      </nav>
      <section className='followed-blogs'>
        <h2>Blogs</h2>
        {blogsError ? (
          <h3 className='search-error-message'>No blogs found.</h3>
        ) : (
          <Carousel
            additionalTransform={0}
            arrows
            className=''
            containerClass=''
            dotListClass=''
            draggable
            focusOnSelect={false}
            infinite
            itemClass=''
            keyBoardControl={false}
            minimumTouchDrag={80}
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=''
            slidesToSlide={1}
            swipeable
          >
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
              />
            ))}
          </Carousel>
        )}
      </section>
      <section className='recent-posts'>
        <h2>Posts</h2>
        {postsError && !page ? (
          <h3 className='search-error-message'>No posts found.</h3>
        ) : (
          <div className='recent-posts-list'>
            {posts.map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}
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

      {window.innerHeight < searchRef.current?.offsetHeight && (
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
    </main>
  );
}
