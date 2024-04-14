export function ProfileItem({ visible, data }) {
  if (!visible) return null;

  return (
    <div className='profile-item'>
      <h3>{data.title}: </h3>
      <h4>{data.value}</h4>
    </div>
  );
}
