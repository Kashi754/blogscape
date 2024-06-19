import { useGetMyProfileQuery } from '../../features/user/userSlice';
import { ProfileSection } from '../../components/ProfileSection/ProfileSection';

export default function MyProfile() {
  const { data: user = {} } = useGetMyProfileQuery();
  if (!user) return null;

  return (
    <ProfileSection
      user={user}
      isLoggedInUser={true}
    />
  );
}
