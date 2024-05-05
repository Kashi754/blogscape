import Carousel from 'react-multi-carousel';
import { BlogCard } from '../../components/BlogCard/BlogCard';
import { BlogSearch } from '../../features/search/BlogSearch';
import { SelectRandomButton } from '../../features/selectRandom/SelectRandomButton';
import { BlogPostCard } from '../../components/BlogPostCard/BlogPostCard';
import './Search.css';
import { useLoaderData } from 'react-router';
import { useGetBlogsQuery } from '../../features/blog/blogSlice';
import { useGetPostsQuery } from '../../features/posts/postsSlice';

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
  const { data: blogs } = useGetBlogsQuery(q);
  const { data: posts } = useGetPostsQuery(q);

  return (
    <main className='search'>
      <nav className='browse-nav'>
        <BlogSearch />
        <SelectRandomButton />
      </nav>
      <section className='followed-blogs'>
        <h2>Blogs</h2>
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
      </section>
      <section className='recent-posts'>
        <h2>Posts</h2>
        <div className='recent-posts-list'>
          {posts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
