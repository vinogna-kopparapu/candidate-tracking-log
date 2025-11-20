import { useState, useEffect } from 'react';
import LoginForm from './components/auth/Loginform';
import Dashboard from './components/dashboard/Dashboard';
import LoadingSpinner from './components/common/LoadingSpinner';
import { checkSession } from './services/auth.js';
import './styles/main.css';
import './styles/common.css';

function App() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession()
      .then(user => {
        setUsername(user.username);
      })
      .catch(() => {
        setUsername('');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onLogout = () => {
    setUsername('');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      {username ? (
        <Dashboard username={username} onLogout={onLogout} />
      ) : (
        <LoginForm onLogin={setUsername} error={error} setError={setError} />
      )}
    </div>
  );
}

export default App;