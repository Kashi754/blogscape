import { RecentPosts } from '../../features/posts/recentPosts/RecentPosts';
import { FollowedBlogs } from '../../features/blog/followedBlogs/FollowedBlogs';
import { PopularBlogs } from '../../features/blog/popularBlogs/PopularBlogs';
import { BlogSearch } from '../../features/search/BlogSearch';
import { SelectRandomButton } from '../../features/selectRandom/SelectRandomButton';
import './Browse.css';

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
