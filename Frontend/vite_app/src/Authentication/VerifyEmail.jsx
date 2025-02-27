import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import backgroundImage from "../assets/create-account.png";
import "../Authentication/App.css";

function VerifyEmail() {
  const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `https://authentication-backend-kbui.onrender.com/api/user/verify-email/${token}?email=${encodeURIComponent(email)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus("success");
          setMessage("Email verified successfully!");
          localStorage.setItem("userToken", data.token);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed. Please try again.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    if (token && email) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [token, email, navigate]);

  const renderIcon = () => {
    switch (status) {
      case "verifying":
        return <Loader2 className="h-16 w-16 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case "error":
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-content">
        <h1 className="logo">IRONCORE GYM</h1>
        <h2 className="title">Email Verification</h2>
        <div className="auth-form flex flex-col items-center justify-center">
          <div className="mb-6">{renderIcon()}</div>
          <p
            className={`instructions text-center ${
              status === "success"
                ? "text-green-600"
                : status === "error"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {message}
          </p>
          {status === "success" && (
            <p className="text-sm text-gray-500 mt-4">Redirecting to login page...</p>
          )}
          {status === "error" && (
            <button
              onClick={() => navigate("/signup")}
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to Sign Up
            </button>
          )}
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