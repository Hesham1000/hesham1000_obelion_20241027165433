import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.js.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const response = await axios.post('http://localhost:8000/api/register', { email, password }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMessage(response.data.message);
      } else {
        const response = await axios.post('http://localhost:8000/api/login', { email, password }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMessage(response.data.message);
        if (response.data.success) {
          // Redirect to dashboard or another page
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const toggleFormMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {message && <p>{message}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <button type="button" onClick={toggleFormMode} className="toggle-button">
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
