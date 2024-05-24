import UserProfile from './UserProfile';
import MyProfile from './MyProfile';
import './Profile.css';
import { useLoaderData } from 'react-router-dom';

export function Component() {
  const { userId } = useLoaderData();

  return userId ? <UserProfile userId={userId} /> : <MyProfile />;
}
