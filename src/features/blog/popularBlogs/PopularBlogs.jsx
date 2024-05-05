import Carousel from 'react-multi-carousel';
import './PopularBlogs.css';
import 'react-multi-carousel/lib/styles.css';
import { BlogCard } from '../../../components/BlogCard/BlogCard';
import { useGetPopularBlogsQuery } from '../blogSlice';

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

export function PopularBlogs() {
  const { data: popularBlogs = [] } = useGetPopularBlogsQuery();

  return (
    <section className='popular-blogs'>
      <h2>Popular Blogs</h2>
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
        {popularBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </Carousel>
    </section>
  );
}
