import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

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

import PassmembershipPlans from "./Membership/pass-membership";
import FeastmembershipPlans from "./Membership/feast-membership";

import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("userToken");

  return (
    <Router>
      <Routes>
        {/* without navbar & footer */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password3" element={<ForgotPassword3 />} />
        <Route path="/forgot-password4" element={<ForgotPassword4 />} />

        {/* with navbar & footer */}
        <Route element={isAuthenticated ? <ProtectedLayout /> : <Navigate to="/login" replace />} >
          <Route path="/home" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/why-join" element={<WhyJoin />} />
          <Route path="/trainers-details" element={<TrainersDetails />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/our-blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/wellness" element={<Wellness />} />
        </Route>

        {/* with navbar, without footer */}
        <Route element={<MembershipLayout />}>
          <Route path="/pass-membership-plans" element={<PassmembershipPlans />} />
          <Route path="/feast-membership-plans" element={<FeastmembershipPlans />} />
        </Route>
      </Routes>
    </Router>
  );
}

// protected layout with navbar & footer
const ProtectedLayout = () => {
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

// membership layout with only navbar(no footer)
const MembershipLayout = () => {
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