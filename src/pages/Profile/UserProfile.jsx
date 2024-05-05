import { Link } from 'react-router-dom';
import { ProfileItem } from '../../components/ProfileItem/ProfileItem';
import { useGetUserByIdQuery } from '../../features/user/userSlice';
import { addDefaultImg } from '../../utils/addDefaultImage';
import { ProfileBlogCard } from '../../features/blog/profileBlogCard/ProfileBlogCard';
import { SocialIcon } from 'react-social-icons';

export default function UserProfile({ userId }) {
  const { data: user } = useGetUserByIdQuery(userId);
  if (!user) return null;

  return (
    <main className='profile'>
      <h2>{user.displayName}</h2>
      <article className='profile-body'>
        <section className='profile-picture-section'>
          <img
            src={user.image || '/images/default.png'}
            alt={user.displayName}
            onError={addDefaultImg}
          />
          <h4>{user.blog.followers} Followers</h4>
        </section>
        <section className='profile-section'>
          <ProfileItem
            visible={!!user.email}
            data={{ title: 'Email', value: user.email }}
          />
          <ProfileItem
            visible={!!user.website}
            data={{ title: 'Website', value: user.website }}
          />
          <ProfileItem
            visible={!!user.location}
            data={{ title: 'Location', value: user.location }}
          />
          <Link
            className='profile-blog-link'
            to={`/blog/${user.blog.id}/`}
          >
            <ProfileBlogCard blog={user.blog} />
          </Link>
          {user.socialMedia &&
            Object.values(user.socialMedia)?.some((val) => val !== null) && (
              <div className='social-media'>
                {Object.keys(user.socialMedia).map(
                  (item) =>
                    user.socialMedia[item] && (
                      <SocialIcon
                        target='_blank'
                        url={user.socialMedia[item]}
                        key={item}
                      />
                    )
                )}
              </div>
            )}
        </section>
      </article>
    </main>
  );
}
