import Carousel from 'react-multi-carousel';
import './FollowedBlogs.css';
import 'react-multi-carousel/lib/styles.css';
import { BlogCard } from '../../../components/BlogCard/BlogCard';
import { useGetFollowedBlogsQuery } from '../blogSlice';
import { useEffect, useRef, useState } from 'react';

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

export function FollowedBlogs() {
  const [page, setPage] = useState(null);
  const { data: followedBlogs = [], isFetching } = useGetFollowedBlogsQuery(
    page ? new URLSearchParams(Object.entries(page)).toString() : ''
  );

  const handleCarouselChange = (previousSlide, _ref) => {
    const { currentSlide, slidesToShow, totalItems } = _ref;
    const endOfCarousel = currentSlide + slidesToShow === totalItems;

    if (endOfCarousel && !isFetching && followedBlogs.length > 0) {
      setPage({
        beforeId: followedBlogs[followedBlogs.length - 1].id,
        beforeFollowers: followedBlogs[followedBlogs.length - 1].followers,
      });
    }
  };

  return (
    <section className='followed-blogs'>
      <h2>Followed Blogs</h2>
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
        {followedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </Carousel>
    </section>
  );
}
