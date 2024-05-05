import { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { FileInput } from '../../../components/FileInput/FileInput';
import { useGetMyBlogQuery } from '../../blog/blogSlice';
import { sanitizeInput } from '../../../utils/sanitizeInput';
import { uploadImage } from '../../../API';

export function EditBlogTab({ onSubmit }) {
  const { data: blog } = useGetMyBlogQuery();
  const [formObject, setFormObject] = useState({
    title: blog.title || null,
    description: blog.description || null,
    image: null,
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;

      setFormObject({
        ...formObject,
        [name]: value,
      });
    } else {
      setFormObject({
        location: event,
      });
    }
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
    const { image, ...formToSend } = formObject;

    formToSend.title = sanitizeInput(formToSend.title);
    formToSend.description = sanitizeInput(formToSend.description);

    if (image) {
      const { fileId, url, thumbnailUrl } = await uploadImage(image, 'blogs');
      formToSend.fileId = fileId;
      formToSend.image = url;
      formToSend.thumbnail = thumbnailUrl;
    } else {
      formToSend.fileId = blog.fileId;
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
              value={formObject.title}
              onChange={handleChange}
              placeholder={blog.title}
              pattern={`^[a-zA-Z0-9 .,!?'"\\-]+$`}
              isInvalid={
                validated &&
                !/`^[a-zA-Z0-9 .,!?'"\\-]+$`/.test(formObject.title)
              }
              required
              autoFocus
            />
            <Form.Control.Feedback type='invalid'>
              "Please use only letters, numbers, spaces, and common
              punctuation."
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
              value={formObject.description}
              onChange={handleChange}
              placeholder={blog.description}
              pattern={`^[a-zA-Z0-9 .,!?'"\\-]+$`}
              isInvalid={
                validated &&
                !/`^[a-zA-Z0-9 .,!?'"\\-]+$`/.test(formObject.title)
              }
            />
            <Form.Control.Feedback type='invalid'>
              "Please use only letters, numbers, spaces, and common
              punctuation."
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
      </Form.Group>
    </Form>
  );
}
