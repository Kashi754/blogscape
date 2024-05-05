import {
  useGetMyProfileQuery,
  useGetUserByIdQuery,
} from '../../features/user/userSlice';
import { ProfileItem } from '../../components/ProfileItem/ProfileItem';
import { ProfileBlogCard } from '../../features/blog/profileBlogCard/ProfileBlogCard';
import { addDefaultImg } from '../../utils/addDefaultImage';
import { SocialIcon } from 'react-social-icons';
import { EditProfileModal } from '../../components/EditProfileModal/EditProfileModal';
import './Profile.css';
import { Link, useLoaderData } from 'react-router-dom';
import {
  useGetBlogByIdQuery,
  useGetMyBlogQuery,
} from '../../features/blog/blogSlice';

export default function Profile() {
  const { userId } = useLoaderData();
  const { data: otherUser = {} } = useGetUserByIdQuery(userId);
  const { data: myProfile = {} } = useGetMyProfileQuery();
  const user = userId ? otherUser : myProfile;
  const { data: otherBlog = {} } = useGetBlogByIdQuery(user?.blogId);
  const { data: myBlog = {} } = useGetMyBlogQuery();
  const blog = user?.blogId ? otherBlog : myBlog;

  if (!blog) return null;

  return (
    <main className='profile'>
      <h2>{user.displayName}</h2>
      <article className='profile-body'>
        <section className='profile-picture-section'>
          <img
            src={user.image}
            alt={user.displayName}
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
          {blog && (
            <Link
              className='profile-blog-link'
              to={`/blog/${blog.id}/`}
            >
              <ProfileBlogCard blog={blog} />
            </Link>
          )}
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
      {!userId && <EditProfileModal />}
    </main>
  );
}
