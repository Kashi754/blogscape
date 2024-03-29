import { FollowedBlogs } from '../../features/followedBlogs/FollowedBlogs';
import { PopularBlogs } from '../../features/popularBlogs/PopularBlogs';
import { RecentPosts } from '../../features/recentPosts/RecentPosts';
import { BlogSearch } from '../../features/blogSearch/BlogSearch';
import { SelectRandomButton } from '../../features/selectRandom/SelectRandomButton';

export default function Browse() {
  return (
    <main className='browse'>
      <nav className='browse-nav'>
        <BlogSearch />
        <SelectRandomButton />
      </nav>
      <FollowedBlogs />
      <PopularBlogs />
      <RecentPosts />
    </main>
  );
}
