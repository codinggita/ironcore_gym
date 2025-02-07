import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/for-pass.png';
import '../Authentication/App.css';

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/forgot-password2');
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Forgot your password?</h2>
    
        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="instructions">
            Enter the email address associated with your account and<br />
            we'll send you a link to reset your password.
          </p>

          <div className="form-group">
            <label htmlFor="email">Phone number, E-mail</label>
            <input type="text" id="email" name="email" />
          </div>

          <div className='new'>
            If your email address exists in our database, and you haven't requested a password reset in the last 30 minutes, 
            you will receive a password recovery link at your email address in a few minutes.
          </div>

          <button type="submit" className="submit-btn">Send Code</button>
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