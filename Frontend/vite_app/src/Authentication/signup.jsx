import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/create-account.png";
import "../Authentication/App.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Failed to connect to server.");
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
            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <p className="terms-text">
            When you click Create account, you agree with our <a href="/terms">Terms and Conditions</a>, and confirm that
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