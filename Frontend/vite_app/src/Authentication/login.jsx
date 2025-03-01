import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import backgroundImage from "../assets/Login.png";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, keepLoggedIn }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("userToken", data.token);
        if (keepLoggedIn) {
          localStorage.setItem("keepLoggedIn", "true");
        }
        const from = location.state?.from?.pathname || "/home";
        navigate(from, { replace: true });
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Log in</h2>

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
              disabled={isLoading}
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
                disabled={isLoading}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group remember-me">
            <label>
              <input 
                type="checkbox" 
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                disabled={isLoading}
              /> Keep me logged in
            </label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            Login
            {isLoading && <span className="loading-spinner"></span>}
          </button>
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