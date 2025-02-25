import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import backgroundImage from "../assets/create-account.png";
import "../Authentication/App.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // const response = await fetch("http://localhost:5000/api/user/initiate-signup", {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/initiate-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        // Store email for OTP verification
        sessionStorage.setItem('signupEmail', formData.email);
        sessionStorage.setItem('signupPassword', formData.password);
        navigate('/otp');
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Create Account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Phone number, username, or E-mail</label>
            <input 
              type="text" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                id="confirmPassword" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <p className="terms-text">
            When you click Create account, you agree with our <a href="/terms">Terms and Conditions</a>, and confirm that
            you've read our <a href="/privacy">Privacy Policy</a>.
          </p>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                Sending OTP...
                <span className="loading-spinner"></span>
              </>
            ) : (
              'Create Account'
            )}
          </button>
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