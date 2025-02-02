import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/create-account.png';
import '../components/App.css';

function Signup() {
  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Create Account</h2>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Phone number, username, or E-mail</label>
            <input type="text" id="email" name="email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" />
          </div>

          <p className="terms-text">
            When you click Create account, you agree with our 
            <a href="/terms">Terms and Conditions</a>, and confirm that 
            you've read our <a href="/privacy">Privacy Policy</a>.
          </p>

          <button type="submit" className="submit-btn">Create Account</button>
        </form>

        <p className="auth-link">Already have an account? <Link to="/login">Log in</Link></p>

        <div className="footer-links">
          <a href="/terms">Terms Of Use</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
