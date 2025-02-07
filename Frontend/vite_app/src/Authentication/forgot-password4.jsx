import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/for-pass.png';
import '../Authentication/App.css';

function ForgotPassword4() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title2">All done</h2>

        <form className="auth-form" onSubmit={handleLogin}>
          <p className="instructions2">
            Your password has been reset so now you can log in to your account.
          </p>

          <button type="submit" className="submit-btn2">Login</button>
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

export default ForgotPassword4;