export function ProfileBlogCard({ blog }) {
  const { title, description, image } = blog;

  return (
    <header
      className='blog-header'
      style={{
        backgroundImage: `url(${
          image || '/images/blog-default-background.webp'
        })`,
      }}
    >
      <div className='blog-header-wrapper'>
        <div className='blog-header-info'>
          <div className='blog-title'>
            <h2 data-test='blog-title'>{title}</h2>
          </div>
          <p data-test='blog-description'>{description}</p>
        </div>
      </div>
    </header>
  );
}
