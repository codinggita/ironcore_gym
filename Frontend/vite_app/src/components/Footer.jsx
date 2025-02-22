import React from 'react';
import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';
import './Footer.css';
import logo from '../assets/logo-without-bg.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img 
            src={logo} 
            alt="Ironcore Gym Logo" 
            className="footer-logo"
          />
          <div className="address-info">
            <p>4th Floor, Shyam Arcade,</p>
            <p>opp. Dominoz Pizza,</p>
            <p>Ar, Gangotri Cir Rd, Nikol,</p>
            <p>Ahmedabad, Gujarat 382350</p>
            <p className="contact">Phone: 58214 24154</p>
            <p className="contact">Email: ironcore@gmail.com</p>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="section-titletwo">SITEMAP</h3>
          <div className="sitemap-links">
            <a href="#" className="sitemap-item">Try Us</a>
            <a href="#" className="sitemap-item">Join Us</a>
            <a href="#" className="sitemap-item">Personal Training</a>
            <a href="#" className="sitemap-item">Classes</a>
            <a href="#" className="sitemap-item">Offers</a>
            <a href="#" className="sitemap-item">Careers</a>
            <a href="#" className="sitemap-item">Location</a>
            <a href="#" className="sitemap-item">About Us</a>
            <a href="#" className="sitemap-item">Terms & Conditions</a>
            <a href="#" className="sitemap-item">Membership Policy</a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="section-titletwo">CONNECT WITH US</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              <Instagram />
            </a>
            <a href="#" className="social-link">
              <Youtube />
            </a>
            <a href="#" className="social-link">
              <Facebook />
            </a>
            <a href="#" className="social-link">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;