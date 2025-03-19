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

  // Function to check if the user is an admin and if profile is complete
  const checkUserDetails = async (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const isAdmin = decoded.role === "admin";
      
      // If user is admin, skip profile check
      if (isAdmin) {
        return { isAdmin, redirectTo: "/admin-dashboard" };
      }

      // For non-admins, check if profile is complete (assuming API or token has this info)
      // Here, we'll simulate with a fetch to a profile endpoint
      const response = await fetch("http://localhost:5000/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profileData = await response.json();

      if (response.ok && profileData.isProfileComplete) {
        return { isAdmin: false, redirectTo: location.state?.from?.pathname || "/home" };
      } else {
        return { isAdmin: false, redirectTo: "/user-profile-form" };
      }
    } catch (error) {
      console.error("Error checking user details:", error);
      // Default to profile form if there's an error, unless admin
      const isAdmin = JSON.parse(atob(token.split(".")[1])).role === "admin";
      return { isAdmin, redirectTo: isAdmin ? "/admin-dashboard" : "/user-profile-form" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

//https://authentication-backend-kbui.onrender.com/api/user/signIn
//http://localhost:5000/api/user/signIn

    try {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, keepLoggedIn }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        localStorage.setItem("userToken", token);
        if (keepLoggedIn) {
          localStorage.setItem("keepLoggedIn", "true");
        }

        // Check user details and determine redirect
        const { isAdmin, redirectTo } = await checkUserDetails(token);
        navigate(redirectTo, { replace: true });
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
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password
            </Link>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            Login
            {isLoading && <span className="loading-spinner"></span>}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Register</Link>
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

export default Login;