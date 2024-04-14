import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { ProfileItem } from '../../components/ProfileItem/ProfileItem';
import { ProfileBlogCard } from '../../features/blog/profileBlogCard/ProfileBlogCard';
import { addDefaultImg } from '../../utils/addDefaultImage';
import { selectBlogHeader } from '../../features/blog/blogSlice';
import { SocialIcon } from 'react-social-icons';
import { selectUserId } from '../../features/auth/authSlice';
import { EditProfileModal } from '../../components/EditProfileModal/EditProfileModal';
import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const blog = useSelector(selectBlogHeader);

  return (
    <main className='profile'>
      <h2>{user.username}</h2>
      <article className='profile-body'>
        <section className='profile-picture-section'>
          <img
            src={user.image}
            alt={user.username}
            onError={addDefaultImg}
          />
          <h4>{blog.followers} Followers</h4>
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
            to={`/blog/${userId}/`}
          >
            <ProfileBlogCard blog={blog} />
          </Link>
          {user.socialMedia?.length > 0 && (
            <div className='social-media'>
              {user.socialMedia.map(
                (item) =>
                  item.url && (
                    <SocialIcon
                      target='_blank'
                      url={item.url}
                      key={item.name}
                    />
                  )
              )}
            </div>
          )}
        </section>
      </article>
      {user.id === userId && <EditProfileModal />}
    </main>
  );
}
