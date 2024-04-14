export function ProfileBlogCard({ blog }) {
  const { title, description, image } = blog;

  return (
    <header
      className='blog-header'
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='blog-header-wrapper'>
        <div className='blog-header-info'>
          <div className='blog-title'>
            <h2>{title}</h2>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </header>
  );
}
