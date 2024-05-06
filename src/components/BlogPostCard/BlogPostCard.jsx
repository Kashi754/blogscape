import { Link } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeSanitize from 'rehype-sanitize';
import './BlogPostCard.css';

const rehypePlugins = [rehypeSanitize];

export function BlogPostCard({ post }) {
  return (
    <div className='post-item'>
      <h2>{post.title}</h2>
      <MarkdownPreview
        source={post.body}
        className='markdown-body'
        style={{ padding: 16 }}
        wrapperElement={{ 'data-color-mode': 'dark' }}
        rehypePlugins={rehypePlugins}
        rehypeRewrite={(node, index, parent) => {
          if (
            node.tagName === 'a' &&
            parent &&
            /^h(1|2|3|4|5|6)/.test(parent.tagName)
          ) {
            parent.children = parent.children.slice(1);
          }
        }}
      />
      <div className='post-item-footer'>
        <Link to={`/posts/${post.id}`}>Read More</Link>
        <div className='post-item-categories'>
          {post.tags.map((tag) => (
            <h4 key={tag}>{tag}</h4>
          ))}
        </div>
      </div>
    </div>
  );
}
