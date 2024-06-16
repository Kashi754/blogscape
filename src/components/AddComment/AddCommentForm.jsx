import { useRef, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import './AddCommentForm.css';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import { sanitizeInput } from '../../utils/sanitizeInput';

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

    const sanitized = sanitizeInput(comment);
    handleSubmit(sanitized);
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
      data-test='add-comment-form'
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
            data-test='comment-input'
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
          data-test='submit-comment-button'
          type='submit'
          variant='primary'
          size='lg'
          disabled={!comment}
        >
          {isReply ? 'Reply' : 'Add Comment'}
        </Button>
        <Button
          className='cancel-comment-button'
          data-test='cancel-comment-button'
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
