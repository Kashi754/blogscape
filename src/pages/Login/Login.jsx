import { useNavigate } from 'react-router';
import { loginUser } from '../../API';
import { LoginForm } from '../../features/login/LoginForm';
import './Login.css';
import { useState } from 'react';

export default function Login() {
  const url = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const google = () => {
    window.open(`${url}/login/google`, '_self');
  };

  const handleLogin = async (formData) => {
    const user = await loginUser(formData);
    if (!user) setIsError(true);
    setIsError(false);
    navigate('/home');
  };

  return (
    <main className='login'>
      <div className='login-field'>
        <h1 className='login-title'>Choose a Login Method</h1>
        <h1 className='login-title-alt'>Login</h1>
        <div className='wrapper'>
          <div className='left'>
            <div
              className='loginButton google'
              onClick={google}
            >
              <img
                src='/images/google.png'
                alt=''
                className='icon'
              />
              Google
            </div>
          </div>
          <div className='center'>
            <div className='line' />
            <div className='or'>OR</div>
          </div>
          <LoginForm
            handleSubmit={handleLogin}
            isError={isError}
          />
        </div>
      </div>
    </main>
  );
}
