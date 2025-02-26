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
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verified = searchParams.get("verified");
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (verified === "true" && token && email) {
      localStorage.setItem("userToken", token);
      setSuccess("Account successfully verified! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [searchParams, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        setVerificationSent(true);
        setSuccess("A verification email has been sent to your email address. Please check your inbox (and spam/junk folder) and click the link to verify your account.");
        setFormData({
          email: "",
          password: "",
          confirmPassword: ""
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
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || verificationSent}
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
                disabled={isLoading || verificationSent}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading || verificationSent}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <p className="terms-text">
            When you click Create account, you agree with our <a href="/terms">Terms and Conditions</a>, and confirm that
            you've read our <a href="/privacy">Privacy Policy</a>.
          </p>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading || verificationSent}
          >
            {isLoading ? (
              <>
                Sending Verification Email...
                <span className="loading-spinner"></span>
              </>
            ) : verificationSent ? (
              'Verification Email Sent'
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