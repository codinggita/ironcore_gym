import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/for-pass.png';
import '../Authentication/App.css';

function ForgotPassword2() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem('resetEmail');
    if (!email) {
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = sessionStorage.getItem('resetEmail');
    if (!email) {
      navigate('/forgot-password');
      return;
    }

    setError('');
    setLoading(true);

//http://localhost:5000/api/user/verify-otp
//https://authentication-backend-kbui.onrender.com/api/user/verify-otp

    try {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/verify-otp", {
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
        navigate('/new-password');
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
        <h2 className="title">Password Reset</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="instructions">
            We sent a code to your email
          </p>

          {error && <p className="error-text">{error}</p>}

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <div className="otp-container">
              {otp.map((data, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    className="otp-box"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                    disabled={loading}
                  />
                );
              })}
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Submit'}
          </button>
        </form>

        <p className="auth-link">
          Didn't receive the code? <Link to="/forgot-password">Try Again</Link>
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