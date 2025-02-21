import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import "./Navbar.css";
import logo from "../assets/logo-without-bg.png";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("userToken");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    setShowDropdown(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Ironcore Gym" />
      </div>
      <ul className="nav-links">
        <li><NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/service">Services</NavLink></li>
        <li><NavLink to="/why-join">Why Join</NavLink></li>
          <li><NavLink to="/trainers-details">Trainers Details</NavLink></li>
        <li><NavLink to="/photos">Photos</NavLink></li>
        {isAuthenticated && (
          <li><NavLink to="/our-blog">Our Blog</NavLink></li>
        )}
        {isAuthenticated && (
          <li><NavLink to="/wellness">Wellness</NavLink></li>
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