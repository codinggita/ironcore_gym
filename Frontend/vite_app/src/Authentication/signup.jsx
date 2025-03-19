import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import backgroundImage from "../assets/create-account.png";
import "../Authentication/App.css";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Log all environment variables and access the admin secret password
  console.log('All env vars:', import.meta.env);
  const ADMIN_SECRET_PASSWORD = import.meta.env.VITE_ADMIN_SECRET_PASSWORD;
  console.log('ADMIN_SECRET_PASSWORD:', ADMIN_SECRET_PASSWORD);
  console.log('ADMIN_SECRET_PASSWORD length:', ADMIN_SECRET_PASSWORD?.length);
  console.log('ADMIN_SECRET_PASSWORD type:', typeof ADMIN_SECRET_PASSWORD);

  useEffect(() => {
    const verified = searchParams.get("verified");
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (verified === "true" && token && email) {
      localStorage.setItem("userToken", token);
      setSuccess("Account successfully verified! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      console.log('Entered password:', e.target.value);
      console.log('Entered password length:', e.target.value.length);
      console.log('Entered password type:', typeof e.target.value);
      console.log('Comparison result:', e.target.value === ADMIN_SECRET_PASSWORD);
      console.log('Raw comparison:', JSON.stringify(e.target.value) === JSON.stringify(ADMIN_SECRET_PASSWORD));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.role === "admin") {
      if (!ADMIN_SECRET_PASSWORD) {
        setError("Admin secret password not configured. Contact system administrator.");
        setIsLoading(false);
        return;
      }
      if (formData.password !== ADMIN_SECRET_PASSWORD) {
        setError("Invalid admin password. Contact system administrator.");
        setIsLoading(false);
        console.log('Password mismatch - Entered:', formData.password, 'Expected:', ADMIN_SECRET_PASSWORD);
        console.log('Entered length:', formData.password.length, 'Expected length:', ADMIN_SECRET_PASSWORD.length);
        return;
      }
      console.log('Admin password matched successfully!');
    }

    try {
      const response = await fetch("https://authentication-backend-kbui.onrender.com/api/user/initiate-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setVerificationSent(true);
        setSuccess("Verification email sent! Please check your inbox.");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  const isAdminPasswordInvalid = 
    formData.role === "admin" && 
    formData.password && 
    ADMIN_SECRET_PASSWORD && 
    formData.password !== ADMIN_SECRET_PASSWORD;

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
              disabled={isLoading || verificationSent}
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
                disabled={isLoading || verificationSent}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading || verificationSent}>
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
                disabled={isLoading || verificationSent}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading || verificationSent}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isLoading || verificationSent}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {isAdminPasswordInvalid && (
            <p className="error-text">Invalid admin password. Contact system administrator.</p>
          )}
          {error && !isAdminPasswordInvalid && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <button type="submit" className="submit-btn" disabled={isLoading || verificationSent}>
            {isLoading ? "Sending..." : verificationSent ? "Verification Sent" : "Create Account"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;