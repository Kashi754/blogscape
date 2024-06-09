import MarkdownEditor from '@uiw/react-markdown-editor';
import rehypeSanitize from 'rehype-sanitize';
import { Form } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '@uiw/react-markdown-editor/markdown-editor.css';
import './ReactMarkdownEditor.css';

export function ReactMarkdownEditor({ formData, setFormData, isInvalid }) {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fullscreen, setFullscreen] = useState('');
  const editorRef = useRef(null);

  const handleBodyChange = (value) => {
    setFormData((prev) => ({ ...prev, body: value }));
  };

  useEffect(() => {
    const handleFullscreenChange = (node) => {
      const styles = node.attributes.style.nodeValue.split('; ');
      const stylesObjectArray = styles.map((style) => {
        const styleArray = style.split(': ');
        return {
          [styleArray[0]]: styleArray[1],
        };
      });

      const stylesObject = stylesObjectArray.reduce((acc, curr) => ({
        ...acc,
        ...curr,
      }));

      const fullscreenStyle = stylesObject.position === 'fixed';
      setFullscreen(fullscreenStyle ? 'fullscreen' : '');
    };

    const editor = editorRef.current.childNodes[0];
    if (editor) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes') {
            handleFullscreenChange(mutation.target);
          }
        }
      });

      observer.observe(editor, { childList: true, attributes: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [editorRef]);

  const showPreview = {
    name: 'showPreview',
    keyCommand: 'showPreview',
    button: { 'aria-label': 'show preview' },
    icon: previewVisible ? (
      <VisibilityOffIcon data-test='hide-preview' />
    ) : (
      <VisibilityIcon data-test='show-preview' />
    ),
    execute: ({ state, view }) => {
      if (!state || !view) return;
      setPreviewVisible(!previewVisible);
    },
  };

  const className = (isInvalid, previewVisible) => {
    let name = 'wmde-markdown-container';
    if (isInvalid) {
      name += ' invalid';
    }
    if (previewVisible) {
      name += ' preview-visible';
    }
    return name;
  };

  return (
    <Form.Group className='body-section-group'>
      <Form.Group className={className(isInvalid, previewVisible)}>
        <div
          className='editor-wrapper'
          data-color-mode='light'
          style={{ width: previewVisible ? '50%' : '100%' }}
          ref={editorRef}
        >
          <MarkdownEditor
            name='body'
            className={
              `editor-component ${fullscreen}` +
              (previewVisible ? ' preview-visible' : '')
            }
            id='editor'
            value={formData.body}
            onChange={handleBodyChange}
            enablePreview={false}
            required
            toolbars={[
              'undo',
              'redo',
              'bold',
              'italic',
              'header',
              'strike',
              'underline',
              'quote',
              'olist',
              'ulist',
              'todo',
              'link',
              'image',
              'code',
              'codeBlock',
            ]}
            toolbarsMode={[showPreview, 'fullscreen']}
            previewProps={{
              rehypePlugins: [[rehypeSanitize]],
              wrapperElement: { 'data-color-mode': 'dark' },
              rehypeRewrite: (node, index, parent) => {
                if (
                  node.tagName === 'a' &&
                  parent &&
                  /^h(1|2|3|4|5|6)/.test(parent.tagName)
                ) {
                  parent.children = parent.children.slice(1);
                }
              },
            }}
          />
        </div>

        <MarkdownEditor.Markdown
          className={
            `markdown-body editor-body ${fullscreen}` +
            (!previewVisible ? ' hidden ' : '')
          }
          source={previewVisible ? formData.body : null}
          style={{ padding: 16 }}
          rehypePlugins={[[rehypeSanitize]]}
          wrapperElement={{ 'data-color-mode': 'dark' }}
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
      </Form.Group>
      {isInvalid && (
        <div
          className='invalid-feedback body-invalid'
          data-test='body-feedback'
        >
          Please add a body to your blog post.
        </div>
      )}
    </Form.Group>
  );
}
