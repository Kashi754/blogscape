import { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useGetMyProfileQuery } from '../userSlice';
import { CountrySelect } from '../../../components/CountrySelect/CountrySelect';
import { FileInput } from '../../../components/FileInput/FileInput';
import { isURL } from 'validator';
import { sanitizeInput } from '../../../utils/sanitizeInput';
import { uploadImage } from '../../../API';

export function EditProfileTab({ onSubmit }) {
  const { data: user } = useGetMyProfileQuery();
  const [formObject, setFormObject] = useState({
    email: user.email,
    website: user.website || null,
    location: user.location || null,
    image: null,
  });
  const [validated, setValidated] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  const handleChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      if (name === 'website') {
        setValidUrl(
          isURL(value, {
            require_protocol: true,
            allow_fragments: false,
            allow_query_components: false,
          }) || value === ''
        );
      }

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

    if (JSON.stringify(formObject) === JSON.stringify(user)) {
      e.stopPropagation();
      return;
    }

    if (form.checkValidity() === false || !validUrl) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(false);
    let { image, ...formToSend } = formObject;

    if (image) {
      const imageResponse = await uploadImage(image, 'users');
      formToSend = { ...formToSend, ...imageResponse };
    } else {
      formToSend.file_id = user.fileId;
      formToSend.image = user.image;
      formToSend.thumbnail = user.thumbnail;
    }

    onSubmit({ key: 'profile', formData: formToSend });
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id='profile-form-tab'
      className='tab'
    >
      <FileInput
        key='profile'
        handleChange={handleImageChange}
        defaultPreview={user.image}
      />
      <Form.Group className='profile-info-group'>
        <Form.Group>
          <FloatingLabel
            controlId='email'
            label='Email address'
          >
            <Form.Control
              type='email'
              name='email'
              value={formObject.email}
              onChange={handleChange}
              placeholder={user.email}
              isInvalid={
                validated &&
                !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                  formObject.email
                )
              }
              required
              autoFocus
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid email address.
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <FloatingLabel
            controlId='website'
            label='Website'
          >
            <Form.Control
              type='text'
              name='website'
              value={formObject.website}
              onChange={handleChange}
              placeholder={user.website}
              isInvalid={validated && !validUrl}
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid website! (Valid URL: http(s)://domain.ext)
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <CountrySelect
          defaultCountry={user.locationCode}
          formId='form-tab'
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
}
