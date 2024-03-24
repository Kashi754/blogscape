import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeSanitize from 'rehype-sanitize';
import './PostBody.css';

const rehypePlugins = [rehypeSanitize];

export function PostBody({ body }) {
  return (
    <section className='post-body wmde-markdown-var'>
      <MarkdownPreview
        source={body}
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
    </section>
  );
}
