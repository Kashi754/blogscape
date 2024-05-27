import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { FloatingLabel, InputGroup, Form, Button } from 'react-bootstrap';
import './LoginForm.css';

const formStyle = {
  width: 'clamp(250px, 50vw, 400px)',
  padding: '20px',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

export function LoginForm({ error, handleSubmit }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const submitForm = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (
      form.checkValidity() === false ||
      !/^[a-zA-Z0-9_\-@!.+]+$/.test(formData.username)
    ) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(false);
    // TODO: Add login logic
    handleSubmit(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
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
            placeholder='Username'
          />
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
              (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password) ||
                !/^[a-zA-Z0-9_\-@!.+]+$/.test(formData.username))
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
            className='login-feedback'
            type='invalid'
            data-test='login-error'
          >
            Invalid username or password
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      {!!error && (
        <div
          className='invalid-feedback custom-feedback'
          data-test='login-error'
        >
          {error.message}
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
