import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { FloatingLabel, InputGroup, Form, Button } from 'react-bootstrap';
import './LoginForm.css';

export function LoginForm({ handleSubmit, isError }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const isInvalid =
    validated &&
    !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password) &&
    !/^[a-zA-Z0-9]+$/.test(formData.username) &&
    isError;

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
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
    gap: '0.25rem',
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
          label='Username'
        >
          <Form.Control
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required
            pattern='^[a-zA-Z0-9]+$'
            isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(formData.username)}
            placeholder='Username'
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <InputGroup>
          <Form.Control
            type={passwordVisible ? 'text' : 'password'}
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          />
          <InputGroup.Text id='show-password'>
            {!passwordVisible ? (
              <Visibility
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            ) : (
              <VisibilityOff
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            )}
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>
      {!isInvalid && (
        <div className='invalid-feedback custom-feedback'>
          Incorrect Username or Password!
        </div>
      )}

      <Button
        className='submit-button'
        variant='secondary'
        type='submit'
        size='lg'
      >
        Login
      </Button>
    </Form>
  );
}
