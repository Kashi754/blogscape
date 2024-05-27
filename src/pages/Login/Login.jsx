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
        <h2
          className='login-title'
          data-test='login-title'
        >
          Choose a Login Method
        </h2>
        <h2
          className='login-title-alt'
          data-test='login-title'
        >
          Login
        </h2>
        <div className='wrapper'>
          <div className='left'>
            <button
              className='loginButton google'
              onClick={google}
              data-test='google-login'
            >
              <img
                src='/images/google.png'
                alt=''
                className='icon'
              />
              Google
            </button>
          </div>
          <div
            className='center'
            data-test='login-divider'
          >
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
