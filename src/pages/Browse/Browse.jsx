import { RecentPosts } from '../../features/posts/recentPosts/RecentPosts';
import { FollowedBlogs } from '../../features/blog/followedBlogs/FollowedBlogs';
import { PopularBlogs } from '../../features/blog/popularBlogs/PopularBlogs';
import { SelectRandomButton } from '../../features/selectRandom/SelectRandomButton';
import './Browse.css';
import { TagSearch } from '../../features/TagSearch/TagSearch';

export default function Browse() {
  return (
    <main className='browse'>
      <nav className='browse-nav'>
        <TagSearch />
        <SelectRandomButton />
      </nav>
      <FollowedBlogs />
      <PopularBlogs />
      <RecentPosts />
    </main>
  );
}
