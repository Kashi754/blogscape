import { useSelector } from 'react-redux';
import { LoginForm } from '../../features/auth/login/LoginForm';
import './Login.css';
import { useSubmit } from 'react-router-dom';
import { selectError } from '../../features/auth/authSlice';

export function Component() {
  const url = import.meta.env.VITE_APP_SERVER_URL;
  const submit = useSubmit();
  const error = useSelector(selectError);

  const google = () => {
    window.open(`${url}/login/google`, '_self');
  };

  const handleLogin = async (formData) => {
    submit(formData, {
      method: 'post',
      action: '/login',
      encType: 'application/json',
    });
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
            <div className='divider-line' />
            <div className='or'>OR</div>
          </div>
          <LoginForm
            handleSubmit={handleLogin}
            // TODO: Add error handling
            error={error}
          />
        </div>
      </div>
    </main>
  );
}
