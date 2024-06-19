import { useGetUserByIdQuery } from '../../features/user/userSlice';
import { ProfileSection } from '../../components/ProfileSection/ProfileSection';

export default function UserProfile({ userId }) {
  const { data: user } = useGetUserByIdQuery(userId);
  if (!user) return null;

  return (
    <ProfileSection
      user={user}
      isLoggedInUser={false}
    />
  );
}
