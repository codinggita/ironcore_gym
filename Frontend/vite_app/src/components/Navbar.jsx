import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo-without-bg.png";

const Navbar = () => {
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
        <li><NavLink to="/our-blog">Our Blog</NavLink></li>
        <li><NavLink to="/wellness">Wellness</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;