import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X } from "lucide-react";
import "./Navbar.css";
import logo from "../assets/logo-without-bg.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userToken");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const isAdmin = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.role === "admin";
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      if (isAdmin()) {
        navigate("/admin-dashboard");
      } else {
        setShowDropdown(!showDropdown);
      }
    } else {
      setShowDropdown(!showDropdown);
    }
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/home");
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Ironcore Gym" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/home" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/service" onClick={() => setIsMenuOpen(false)}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/why-join" onClick={() => setIsMenuOpen(false)}>
            Why Join
          </NavLink>
        </li>
        <li>
          <NavLink to="/trainers-details" onClick={() => setIsMenuOpen(false)}>
            Trainers Details
          </NavLink>
        </li>
        <li>
          <NavLink to="/photos" onClick={() => setIsMenuOpen(false)}>
            Photos
          </NavLink>
        </li>
        <li>
          <NavLink to="/Diet" onClick={() => setIsMenuOpen(false)}>
            Diet Plan
          </NavLink>
        </li>

        {/* 🔓 Now Everyone Can See These */}
        <li>
          <NavLink to="/our-blog" onClick={() => setIsMenuOpen(false)}>
            Our Blog
          </NavLink>
        </li>

        <li>
          <NavLink to="/wellness" onClick={() => setIsMenuOpen(false)}>
            Wellness
          </NavLink>
        </li>

        <li className="user-menu">
          <button
            className="user-icon-btn"
            onClick={handleProfileClick}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          >
            <UserCircle size={32} />
          </button>

          {!isAdmin() && showDropdown && (
            <div className="dropdown-menu">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              ) : (
                <button onClick={handleLogin} className="dropdown-item">
                  Sign In
                </button>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
