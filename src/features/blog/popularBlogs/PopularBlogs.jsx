import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BlogCard } from '../../../components/BlogCard/BlogCard';
import { useGetPopularBlogsQuery } from '../blogSlice';
import './PopularBlogs.css';

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
  const [page, setPage] = useState(null);
  const { data: popularBlogs = [], isFetching } = useGetPopularBlogsQuery(
    page ? new URLSearchParams(Object.entries(page)).toString() : ''
  );

  const handleCarouselChange = (previousSlide, _ref) => {
    const { currentSlide, slidesToShow, totalItems } = _ref;
    const endOfCarousel = currentSlide + slidesToShow === totalItems;

    if (endOfCarousel && !isFetching && popularBlogs.length > 0) {
      setPage({
        beforeId: popularBlogs[popularBlogs.length - 1].id,
        beforeFollowers: popularBlogs[popularBlogs.length - 1].followers,
      });
    }
  };

  return (
    <section
      className='popular-blogs'
      data-test='popular-blogs'
    >
      <h2>Popular Blogs</h2>
      <Carousel
        afterChange={handleCarouselChange}
        additionalTransform={0}
        arrows
        className=''
        containerClass=''
        dotListClass=''
        draggable
        focusOnSelect={false}
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
