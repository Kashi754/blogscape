import { Link } from 'react-router-dom';
import { ProfileItem } from '../../components/ProfileItem/ProfileItem';
import { useGetMyProfileQuery } from '../../features/user/userSlice';
import { addDefaultImg } from '../../utils/addDefaultImage';
import { ProfileBlogCard } from '../../features/blog/profileBlogCard/ProfileBlogCard';
import { SocialIcon } from 'react-social-icons';
import { EditProfileModal } from '../../components/EditProfileModal/EditProfileModal';
import { ImageKitImage } from '../../components/ImageKitImage/ImageKitImage';

export default function MyProfile() {
  const { data: user = {} } = useGetMyProfileQuery();
  if (!user) return null;

  return (
    <main className='profile'>
      <h2>{user.displayName}</h2>
      <article className='profile-body'>
        <section className='profile-picture-section'>
          <ImageKitImage
            className='profile-picture'
            alt={user.displayName}
            src={user.image}
            defaultImg={'/images/default.png'}
            onError={addDefaultImg}
            transformation={{ width: 400, aspectRatio: '1-1' }}
          />
          <h4>{user.blog.followers} Followers</h4>
        </section>
        <section className='profile-section'>
          <ProfileItem
            visible={!!user.email}
            data={{ title: 'Email', value: user.email }}
          />
          <ProfileItem
            visible={!!user.userName}
            data={{ title: 'Username', value: user.userName }}
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
      <EditProfileModal />
    </main>
  );
}
