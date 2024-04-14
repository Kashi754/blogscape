import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, InputGroup } from 'react-bootstrap';
import { verifyPassword } from '../../../API';

export function ChangePasswordTab({ onSubmit }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [validated, setValidated] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (event) => {
    setCorrectPassword(true);
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
    const validPassword = await verifyPassword(formData.oldPassword);
    if (!validPassword) {
      e.stopPropagation();
      setValidated(true);
      setCorrectPassword(false);
      return;
    }
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
      formData: { newPassword: formData.newPassword },
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
            isInvalid={!correctPassword}
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
          <Form.Control.Feedback type='invalid'>
            Incorrect Password!
          </Form.Control.Feedback>
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
          minLength={8}
          pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
          isInvalid={
            validated &&
            !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.newPassword)
          }
        />
        <Form.Control.Feedback type='invalid'>
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
          isInvalid={
            validated &&
            (formData.newPassword !== formData.confirmPassword ||
              !passwordsMatch)
          }
        />
        <Form.Control.Feedback type='invalid'>
          Passwords do not match.
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
