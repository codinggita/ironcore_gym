import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/login.png';

function Login() {
  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Log in</h2>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Phone number, username, or E-mail</label>
            <input type="text" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="form-group remember-me">
            <label>
              <input type="checkbox" /> Keep me logged in
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
          </div>

          <button type="submit" className="submit-btn">Login</button>
        </form>

        <p className="auth-link">Don't have an account? <Link to="/signup">Register</Link></p>

        <div className="footer-links">
          <a href="/terms">Terms Of Use</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
