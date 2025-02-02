import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/for-pass.png';
import '../components/App.css';

function ForgotPassword3() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/forgot-password4');
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Set new password</h2>
    
        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="instructions">
            It must be at least 8 characters.
          </p>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" />
          </div>

          <button type="submit" className="submit-btn">Reset Password</button>
        </form>

        <div className="footer-links">
          <a href="/terms">Terms Of Use</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword3;