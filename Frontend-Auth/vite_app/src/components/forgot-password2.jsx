import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/for-pass.png';
import '../components/App.css';

function ForgotPassword2() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/forgot-password3');
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Password Reset</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="instructions">
            We sent a code to your E-mail
          </p>

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <div className="otp-container">
              <input type="text" className="otp-box" maxLength="1" />
              <input type="text" className="otp-box" maxLength="1" />
              <input type="text" className="otp-box" maxLength="1" />
              <input type="text" className="otp-box" maxLength="1" />
              <input type="text" className="otp-box" maxLength="1" />
              <input type="text" className="otp-box" maxLength="1" />
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <p className="auth-link">
          Didn't Receive the code? Click to <Link to="/resend">Resend</Link>
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

export default ForgotPassword2;