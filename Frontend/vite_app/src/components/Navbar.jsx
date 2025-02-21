import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X } from "lucide-react";
import "./Navbar.css";
import logo from "../assets/logo-without-bg.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userToken");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setShowDropdown(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Ironcore Gym" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setIsMenuOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/service" onClick={() => setIsMenuOpen(false)}>Services</NavLink></li>
        <li><NavLink to="/why-join" onClick={() => setIsMenuOpen(false)}>Why Join</NavLink></li>
        <li><NavLink to="/trainers-details" onClick={() => setIsMenuOpen(false)}>Trainers Details</NavLink></li>
        <li><NavLink to="/photos" onClick={() => setIsMenuOpen(false)}>Photos</NavLink></li>
        {isAuthenticated && (
          <li><NavLink to="/our-blog" onClick={() => setIsMenuOpen(false)}>Our Blog</NavLink></li>
        )}
        {isAuthenticated && (
          <li><NavLink to="/wellness" onClick={() => setIsMenuOpen(false)}>Wellness</NavLink></li>
        )}
        <li className="user-menu">
          <button 
            className="user-icon-btn"
            onClick={() => setShowDropdown(!showDropdown)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          >
            <UserCircle size={32} />
          </button>
          {showDropdown && (
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