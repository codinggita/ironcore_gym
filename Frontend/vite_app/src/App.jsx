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

import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("userToken");

  return (
    <Router>
      <Routes>
        {/* Authentication Pages (Without Navbar & Footer) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password3" element={<ForgotPassword3 />} />
        <Route path="/forgot-password4" element={<ForgotPassword4 />} />

        {/* Protected Pages (With Navbar & Footer) */}
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
      </Routes>
    </Router>
  );
}

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

export default App;