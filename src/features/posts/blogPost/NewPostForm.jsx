import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ReactMarkdownEditor } from '../../../components/ReactMarkdownEditor/ReactMarkdownEditor';
import { TagSelect } from '../../tags/TagSelect/TagSelect';
import { FileInput } from '../../../components/FileInput/FileInput';
import './NewPostForm.css';
import { useCreateTagMutation, useGetTagsQuery } from '../../tags/tagsSlice';

export function NewPostForm({ handleSubmit }) {
  const [formObject, setFormObject] = useState({
    title: '',
    subtitle: '',
    body: '',
    tags: [],
    image: null,
  });
  const { data: tagsData } = useGetTagsQuery();

  const [createTag] = useCreateTagMutation();

  const [validated, setValidated] = useState(false);

  const submitForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !formObject.body) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(false);
    handleSubmit(formObject);
  };

  const handleImageChange = (imageFile) => {
    setFormObject((prev) => ({ ...prev, image: imageFile }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormObject((prev) => ({ ...prev, [name]: value }));
  };

  const formStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    maxWidth: '1220px',
  };

  return (
    <Form
      className='new-post-form'
      noValidate
      validated={validated}
      onSubmit={submitForm}
      style={formStyle}
    >
      <Form.Group className='top-section'>
        <Form.Group className='title-section-wrapper'>
          <Form.Group className='title-section'>
            <FloatingLabel
              controlId='title'
              label='Post Title'
              className='mb-3'
            >
              <Form.Control
                className='title-input'
                data-test='title-input'
                name='title'
                type='text'
                placeholder='Post Title'
                required
                pattern={`^[a-zA-Z0-9 .,!?'"\\-]+$`}
                isInvalid={
                  validated &&
                  !/^[a-zA-Z0-9 .,!?'"\\-]+$/.test(formObject.title)
                }
                value={formObject.title}
                onChange={handleChange}
              />
              <Form.Control.Feedback
                type='invalid'
                data-test='title-feedback'
              >
                Please use only letters, numbers, spaces, and common punctuation
                for this field.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              controlId='subtitle'
              label='Post Subtitle'
              className='mb-3'
            >
              <Form.Control
                className='title-input'
                data-test='subtitle-input'
                name='subtitle'
                placeholder='Post Subtitle'
                type='text'
                required
                pattern={`^[a-zA-Z0-9 .,!?'"\\-]+$`}
                isInvalid={
                  validated &&
                  !/^[a-zA-Z0-9 .,!?'"\\-]+$/.test(formObject.subtitle)
                }
                value={formObject.subtitle}
                onChange={handleChange}
              />
              <Form.Control.Feedback
                type='invalid'
                data-test='subtitle-feedback'
              >
                Please use only letters, numbers, spaces, and common punctuation
                for this field.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <FileInput handleChange={handleImageChange} />
        </Form.Group>

        <Form.Group className='body-section'>
          <ReactMarkdownEditor
            formData={formObject}
            setFormData={setFormObject}
            isInvalid={validated && !formObject.body}
          />
        </Form.Group>
      </Form.Group>
      <Form.Group className='bottom-section'>
        <TagSelect
          data-test='tag-input'
          tagsData={tagsData}
          form={formObject}
          setForm={setFormObject}
          addTag={createTag}
        />
        <Button
          data-test='submit-button'
          className='post-submit-button'
          variant='primary'
          size='lg'
          type='submit'
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
