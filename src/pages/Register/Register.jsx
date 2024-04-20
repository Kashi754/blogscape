import { RegistrationForm } from '../../features/auth/registration/RegistrationForm';
import './Register.css';
import { useSubmit } from 'react-router-dom';

export default function Register() {
  const submit = useSubmit();

  const handleRegistration = async (formData) => {
    const { confirmPassword, ...data } = formData;
    submit(data, {
      method: 'post',
      action: '/register',
      encType: 'application/json',
    });
  };

  return (
    <main>
      <section className='registration-container'>
        <h2>Create Your Account</h2>
        <RegistrationForm handleSubmit={handleRegistration} />
      </section>
    </main>
  );
}
