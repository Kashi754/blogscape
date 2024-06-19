import { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { FileInput } from '../../../components/FileInput/FileInput';
import { useGetMyBlogQuery } from '../../blog/blogSlice';
import { sanitizeInput } from '../../../utils/sanitizeInput';
import { uploadImage } from '../../../API';

export function EditBlogTab({ onSubmit }) {
  const { data: blog = {} } = useGetMyBlogQuery();
  const [formObject, setFormObject] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (imageFile) => {
    setFormObject((prev) => ({ ...prev, image: imageFile }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (JSON.stringify(formObject) === JSON.stringify(blog)) {
      e.stopPropagation();
      return;
    }

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(false);
    const { image: imageFile, ...formToSend } = formObject;

    formToSend.title = formToSend.title
      ? sanitizeInput(formToSend.title)
      : blog.title;
    formToSend.description = formToSend.description
      ? sanitizeInput(formToSend.description)
      : blog.description;

    if (imageFile) {
      const { file_id, image, thumbnail } = await uploadImage(
        imageFile,
        'blogs'
      );
      formToSend.file_id = file_id;
      formToSend.image = image;
      formToSend.thumbnail = thumbnail;
    } else {
      formToSend.file_id = blog.fileId;
      formToSend.image = blog.image;
      formToSend.thumbnail = blog.thumbnail;
    }

    onSubmit({ key: 'blog', formData: formToSend });
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id='blog-form-tab'
      className='tab'
    >
      <FileInput
        key='blog'
        handleChange={handleImageChange}
        defaultPreview={blog.image}
        className='blog-image'
        targetSize={1000}
      />
      <Form.Group className='blog-info-group'>
        <Form.Group>
          <FloatingLabel
            controlId='title'
            label='Blog Title'
          >
            <Form.Control
              type='text'
              name='title'
              value={formObject.title || blog.title}
              onChange={handleChange}
              placeholder={blog.title}
              pattern={`^[a-zA-Z0-9 .,!?'"\\-]+$`}
              isInvalid={
                validated && !/^[a-zA-Z0-9 .,!?`'"\\-]+$/.test(formObject.title)
              }
              required
              autoFocus
            />
            <Form.Control.Feedback
              type='invalid'
              data-test='invalid-title'
            >
              Please use only letters, numbers, spaces, and common punctuation.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Form.Group className='description-group'>
          <FloatingLabel
            controlId='description'
            label='Blog Description'
            className='description-input'
          >
            <Form.Control
              as={'textarea'}
              name='description'
              className='blog-description-field'
              value={formObject.description || blog.description}
              onChange={handleChange}
              placeholder={blog.description}
              pattern={`^[a-zA-Z0-9 .,!?'"\\-]+$`}
              isInvalid={
                validated &&
                formObject.description !== '' &&
                !/^[a-zA-Z0-9 .,!?'"\\-]+$/.test(formObject.description)
              }
            />
            <Form.Control.Feedback type='invalid'>
              Please use only letters, numbers, spaces, and common punctuation.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      </Form.Group>
    </Form>
  );
}
