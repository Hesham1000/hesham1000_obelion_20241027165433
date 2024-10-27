import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.js.css';

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleToggle = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = isRegistering
        ? await axios.post('http://localhost:8000/api/register', { email, password })
        : await axios.post('http://localhost:8000/api/login', { email, password });
      if (response.data.success) {
        if (isRegistering) {
          await axios.post('http://localhost:8000/api/sendRegistrationEmail', { email });
        }
        // Redirect to dashboard or reset form
        setEmail('');
        setPassword('');
        alert(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button type="button" onClick={handleToggle} className="toggle-button">
          {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
