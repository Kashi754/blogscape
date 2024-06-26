import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { FloatingLabel, InputGroup, Form, Button } from 'react-bootstrap';
import './RegistrationForm.css';
import { useActionData } from 'react-router';

export function RegistrationForm({ handleSubmit }) {
  const actionData = useActionData();
  const { error } = actionData || {};
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    blogTitle: '',
    password: '',
    confirmPassword: '',
  });

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      formData.password !== formData.confirmPassword
    ) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    console.log(form.checkValidity());
    console.log(formData);
    setValidated(false);
    handleSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formStyle = {
    width: 'clamp(300px, 50vw, 700px)',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={submitForm}
      style={formStyle}
    >
      <Form.Group>
        <FloatingLabel
          controlId='floatingInput'
          label='Email address'
        >
          <Form.Control
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            isInvalid={
              validated &&
              !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                formData.email
              )
            }
            placeholder='name@example.com'
          />
          <Form.Control.Feedback
            type='invalid'
            data-test='invalid-email'
          >
            Please enter a valid email address.
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel
          controlId='floatingInput'
          label='Username'
        >
          <Form.Control
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
            pattern='^[a-zA-Z0-9_\-@!.+]+$'
            isInvalid={
              (error && error.data.includes('username')) ||
              (validated && !/^[a-zA-Z0-9_\-@!.]+$/.test(formData.username))
            }
            placeholder='Username'
          />
          <Form.Control.Feedback
            type='invalid'
            data-test='invalid-username'
          >
            {error?.data && error.data.includes('username')
              ? error.data
              : 'Please enter a valid username (letters and numbers only).'}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel
          controlId='floatingInput'
          label='Blog Title'
        >
          <Form.Control
            type='text'
            name='blogTitle'
            value={formData.blogTitle}
            onChange={handleChange}
            required
            pattern={`^[a-zA-Z0-9 .,!?'"\\-]+$`}
            isInvalid={
              validated && !/^[a-zA-Z0-9 .,!?'"\\-]+$/.test(formData.blogTitle)
            }
            placeholder='Blog Title'
          />
          <Form.Control.Feedback
            type='invalid'
            data-test='invalid-blog-title'
          >
            Please use only letters, numbers, spaces, and common punctuation.
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <InputGroup hasValidation>
          <Form.Control
            type={passwordVisible ? 'text' : 'password'}
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            isInvalid={
              validated &&
              !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)
            }
          />
          <InputGroup.Text id='show-password'>
            {!passwordVisible ? (
              <Visibility
                data-test='show-password'
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            ) : (
              <VisibilityOff
                data-test='hide-password'
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            )}
          </InputGroup.Text>
          <Form.Control.Feedback
            type='invalid'
            data-test='invalid-password'
          >
            Password must contain at least 8 characters, including at least one
            number, one lowercase and one uppercase letter.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type={passwordVisible ? 'text' : 'password'}
          placeholder='Confirm Password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          valid={(formData.password === formData.confirmPassword).toString()}
          isInvalid={
            (validated && formData.password !== formData.confirmPassword) ||
            (error?.data && !error.data.includes('username'))
          }
        />
        <Form.Control.Feedback
          type='invalid'
          data-test='invalid-passwords'
        >
          {error?.data && !error.data.includes('username')
            ? error.data
            : 'Passwords do not match.'}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        className='submit-button'
        variant='secondary'
        type='submit'
        size='lg'
      >
        Submit
      </Button>
    </Form>
  );
}
