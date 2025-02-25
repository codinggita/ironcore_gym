import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/for-pass.png';
import '../Authentication/App.css';

function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem('signupEmail');
    if (!email) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevSibling = e.target.previousSibling;
      if (prevSibling) {
        prevSibling.focus();
      }
    }
  };

  const handleResendOTP = async () => {
    const email = sessionStorage.getItem('signupEmail');
    const password = sessionStorage.getItem('signupPassword');
    
    if (!email || !password) {
      navigate('/signup');
      return;
    }

    setResending(true);
    setError('');

    try {
      // const response = await fetch("http://localhost:5000/api/user/initiate-signup", {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/initiate-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          password,
          confirmPassword: password
        }),
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        setOtp(['', '', '', '', '', '']);
        const firstInput = document.querySelector('.custom-otp-input');
        if (firstInput) firstInput.focus();
      } else {
        setError(data.message || 'Failed to send new OTP');
      }
    } catch (error) {
      setError('Failed to connect to server');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem('signupEmail');
    if (!email) {
      navigate('/signup');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // const response = await fetch("http://localhost:5000/api/user/verify-signup-otp", {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/verify-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: otp.join('')
        }),
        credentials: "include"
      });

      const data = await response.json();

      if (response.ok) {
        // Clear signup data
        sessionStorage.removeItem('signupEmail');
        sessionStorage.removeItem('signupPassword');
        navigate('/login');
      } else {
        setError(data.message || 'Invalid OTP');
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
        <h2 className="title">Verify Email</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="instructions">
            We sent a code to your email
          </p>

          {error && <p className="error-text">{error}</p>}

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <div className="custom-otp-container">
              {otp.map((data, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    className="custom-otp-input"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                    disabled={loading}
                  />
                );
              })}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                Verifying...
                <span className="custom-spinner"></span>
              </>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        <p className="auth-link">
          Didn't receive the code?{' '}
          <Link 
            to="#" 
            onClick={(e) => {
              e.preventDefault();
              if (!resending) handleResendOTP();
            }}
            style={{ cursor: resending ? 'not-allowed' : 'pointer' }}
          >
            {resending ? 'Sending...' : 'Send Again'}
          </Link>
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

export default Otp;