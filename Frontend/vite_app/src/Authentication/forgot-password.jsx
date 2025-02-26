import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/for-pass.png';
import '../Authentication/App.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/forgot-password", {
      // const response = await fetch("http://localhost:5000/api/user/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include"
      });

      const data = await response.json();
      
      if (response.ok) {
        sessionStorage.setItem('resetEmail', email);
        navigate('/one-time-password');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Forgot your password?</h2>
    
        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="instructions">
            Enter the email address associated with your account and<br />
            we'll send you an OTP to reset your password.
          </p>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required 
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className='new'>
            If your email address exists in our database, you will receive a password recovery OTP at your email address in a few minutes.
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <p className="auth-link">
          Remember your password? <Link to="/login">Log in</Link>
        </p>

        <div className="footer-links">
          <a href="/terms">Terms Of Use</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;