import { useState } from 'react';
import { login } from '../../services/auth.js';
import { ERROR_MESSAGES } from '../../utils/constants.js';
import '../../styles/auth.css';
import '../../styles/main.css';
function LoginForm({ onLogin, error, setError }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    

    login(username)
      .then(user => {
        onLogin(user.username);
        setError('');
      })
      .catch(err => {
        if(err.error === 'auth-insufficient') {
          setError(ERROR_MESSAGES.DOG_USERNAME);
          setUsername(''); 
        } else if(err.error === 'auth-missing') {
          setError(ERROR_MESSAGES.AUTH_MISSING);
          setUsername(''); 
        } else if(err.error === 'required-username') {  
          setError(ERROR_MESSAGES.LOGIN_REQUIRED);
          setUsername('');
        } else if(err.error === 'invalid-username') {
          setError(ERROR_MESSAGES.INVALID_USERNAME);
          setUsername('');
        } else {
          setError(ERROR_MESSAGES.LOGIN_FAILED);
          setUsername(''); 
        }
      });
  };

return (
  <div className="login-container">
    <h1>TRACKIFY</h1>
    <p className="app-description">
      Streamline your job search journey with Trackify - your personal compass for tracking applications and interview progress in one organized space.
    </p>
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </label>
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
    </form>
  </div>
);
}

export default LoginForm;