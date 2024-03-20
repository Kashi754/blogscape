import { useNavigate } from 'react-router';
import { registerUser } from '../../API';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';
import './Register.css';

export function Register() {
  const navigate = useNavigate();
  const handleRegistration = async (formData) => {
    const user = await registerUser(formData);
    if (!user) return;
    // TODO: Add success message
    navigate('/login');
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
