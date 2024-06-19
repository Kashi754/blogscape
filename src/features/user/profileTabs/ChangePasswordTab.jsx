import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, InputGroup } from 'react-bootstrap';
import { useGetMyProfileQuery } from '../userSlice';
import { useActionData } from 'react-router';

export function ChangePasswordTab({ onSubmit }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [validated, setValidated] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { data: user } = useGetMyProfileQuery();
  const username = user?.username;
  const actionData = useActionData();
  const { data, error } = actionData || {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswordsMatch(true);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (formData.newPassword !== formData.confirmPassword) {
      e.stopPropagation();
      setValidated(true);
      setPasswordsMatch(false);
      return;
    }
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(false);
    onSubmit({
      key: 'password',
      formData: {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      },
    });
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id='password-form-tab'
      className='tab'
    >
      <Form.Control
        required
        type='text'
        name='username'
        value={username}
        autoComplete='username'
        style={{ display: 'none' }}
        readOnly
      />
      <Form.Group
        className='password-group mb-3'
        controlId='formOldPassword'
      >
        <Form.Label>Old Password:</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            required
            type={passwordVisible ? 'text' : 'password'}
            name='oldPassword'
            placeholder='Old Password'
            onChange={handleChange}
            autoComplete='current-password'
            isInvalid={error}
            isValid={!!data}
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
          <Form.Control.Feedback
            type='invalid'
            data-test='invalid-old-password'
          >
            {error?.data}
          </Form.Control.Feedback>
          {data && (
            <Form.Control.Feedback
              type='valid'
              data-test='password-success'
            >
              {data}
            </Form.Control.Feedback>
          )}
        </InputGroup>
      </Form.Group>
      <Form.Group
        className='password-group mb-3'
        controlId='formNewPassword'
      >
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          required
          type={passwordVisible ? 'text' : 'password'}
          name='newPassword'
          placeholder='New Password'
          onChange={handleChange}
          autoComplete='new-password'
          minLength={8}
          pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          isInvalid={
            validated &&
            !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.newPassword)
          }
        />
        <Form.Control.Feedback
          type='invalid'
          data-test='invalid-password'
        >
          Password must be at least 8 characters long and contain at least one
          uppercase letter, one lowercase letter, and one number.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group
        className='password-group mb-3'
        controlId='formConfirmPassword'
      >
        <Form.Label>Confirm New Password:</Form.Label>
        <Form.Control
          required
          type={passwordVisible ? 'text' : 'password'}
          name='confirmPassword'
          placeholder='Confirm New Password'
          onChange={handleChange}
          autoComplete='new-password'
          isInvalid={
            validated &&
            (formData.newPassword !== formData.confirmPassword ||
              !passwordsMatch)
          }
        />
        <Form.Control.Feedback
          type='invalid'
          data-test='invalid-confirm-password'
        >
          Passwords do not match.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
