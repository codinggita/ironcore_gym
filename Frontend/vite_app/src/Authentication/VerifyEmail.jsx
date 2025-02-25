import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import backgroundImage from '../assets/create-account.png';
import '../Authentication/App.css';

function VerifyEmail() {
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const urlToken = searchParams.get('token');
        if (urlToken) {
          localStorage.setItem("userToken", urlToken);
          setMessage('Email verified successfully! Redirecting to login page...');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          return;
        }

        setError('Invalid verification link or token missing');
      } catch (error) {
        setError('Failed to connect to server or invalid verification');
      }
    };

    verifyEmail();
  }, [token, navigate, searchParams]);

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Email Verification</h2>

        <div className="auth-form">
          <p className="instructions">{message}</p>
          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="footer-links">
          <a href="/terms">Terms Of Use</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;