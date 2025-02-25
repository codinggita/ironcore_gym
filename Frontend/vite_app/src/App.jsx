import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Service from "./pages/Service";
import WhyJoin from "./pages/WhyJoin";
import TrainersDetails from "./pages/TrainersDetails";
import Photos from "./pages/Photos";
import Blog from "./pages/Blog";
import Wellness from "./pages/Wellness";

import Signup from "./Authentication/signup";
import Login from "./Authentication/login";
import ForgotPassword from "./Authentication/forgot-password";
import ForgotPassword2 from "./Authentication/forgot-password2";
import ForgotPassword3 from "./Authentication/forgot-password3";
import ForgotPassword4 from "./Authentication/forgot-password4";
import VerifyEmail from "./Authentication/VerifyEmail";

import PassmembershipPlans from "./Membership/pass-membership";
import FeastmembershipPlans from "./Membership/feast-membership";

import "./App.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const isAuthenticated = !!localStorage.getItem("userToken");
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public routes with navbar & footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/service" element={<Service />} />
        <Route path="/why-join" element={<WhyJoin />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/our-blog" element={<Blog />} />
      </Route>

      {/* Auth routes without navbar & footer */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" replace /> : <Signup />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/one-time-password" element={<ForgotPassword2 />} />
      <Route path="/new-password" element={<ForgotPassword3 />} />
      <Route path="/all-done" element={<ForgotPassword4 />} />

      {/* Protected routes with navbar & footer */}
      <Route element={isAuthenticated ? <ProtectedLayout /> : <Navigate to="/login" state={{ from: location }} replace />}>
        <Route path="/trainers-details" element={<TrainersDetails />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/wellness" element={<Wellness />} />
      </Route>

      {/* Protected membership routes with navbar only */}
      <Route element={isAuthenticated ? <MembershipLayout /> : <Navigate to="/login" state={{ from: location }} replace />}>
        <Route path="/pass-membership-plans" element={<PassmembershipPlans />} />
        <Route path="/feast-membership-plans" element={<FeastmembershipPlans />} />
      </Route>

      {/* Catch all route for 404 */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

// Public layout with navbar & footer
const PublicLayout = () => {
  return (
    <div className="page-container">
      <Navbar />
      <main className="content-wrap">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Protected layout with navbar & footer
const ProtectedLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="page-container">
      <Navbar />
      <main className="content-wrap">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// Membership layout with only navbar
const MembershipLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="membership-page-container">
      <Navbar />
      <main className="content-wrap">
        <Outlet />
      </main>
    </div>
  );
};

export default App;