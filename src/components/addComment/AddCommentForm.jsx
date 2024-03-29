import { useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import stripLow from 'validator/lib/stripLow';
import escape from 'validator/lib/escape';
import trim from 'validator/lib/trim';
import blacklist from 'validator/lib/blacklist';
import './AddCommentForm.css';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
const blacklistString = '!@#$%^&*()[]{}|/\\'.replace(
  /[.*+?^${}()|[\]\\]/g,
  '\\$&'
);

export function AddCommentForm({
  handleSubmit,
  handleCancel,
  isReply = false,
}) {
  const [comment, setComment] = useState('');
  const textAreaRef = useRef(null);

  useAutosizeTextArea(textAreaRef, comment);

  const submitComment = (event) => {
    event.preventDefault();
    const strippedLow = stripLow(comment, true);
    const escaped = escape(strippedLow);
    const trimmed = trim(escaped);
    const blacklisted = blacklist(trimmed, blacklistString);
    handleSubmit(blacklisted);
  };

  const formStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  };

  return (
    <Form
      className='add-comment-form'
      noValidate
      onSubmit={submitComment}
      style={formStyle}
    >
      <Form.Group>
        <FloatingLabel
          controlId='floatingTextarea'
          label='Comment'
          className='mb-3'
        >
          <Form.Control
            className='comment-input'
            as='textarea'
            ref={textAreaRef}
            name='comment'
            value={comment}
            rows={1}
            placeholder='Leave a comment here'
            required
            onChange={(e) => setComment(e.target.value)}
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className='button-group'>
        <Button
          className='submit-comment-button'
          type='submit'
          variant='primary'
          size='lg'
        >
          {isReply ? 'Reply' : 'Add Comment'}
        </Button>
        <Button
          className='cancel-comment-button'
          variant='secondary'
          size='lg'
          onClick={() => {
            setComment('');
            handleCancel();
          }}
        >
          Cancel
        </Button>
      </Form.Group>
    </Form>
  );
}
