import React from 'react';
import './Footer.css';
import instagramIcon from '../assets/instagram.png';
import youtubeIcon from '../assets/youtube.png';
import facebookIcon from '../assets/facebook.png';
import linkedinIcon from '../assets/linkedin.png';
import googlePlay from '../assets/playstore.png';
import appStore from '../assets/appstore.png';
import logo from '../assets/logo-without-bg.png';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="logo-address-section">
                    <img
                        src={logo}
                        alt="Ironcore Gym Logo"
                        className="footer-logo"
                    />
                    <div className="address-block">
                        <p className="address-line">
                            2nd and 4th Floor, Shyam Arcade, opp.Dominoz Pizza,
                        </p>
                        <p className="address-line">
                            Ar, Gangotri Cir Rd,Nikol, Ahmedabad, Gujarat 382350
                        </p>
                        <p className="contact-info">Phone: 58214 24154</p>
                        <p className="contact-info">Email: ironcore@gmail.com</p>
                    </div>
                </div>


                <div className="sitemap-section">
                    <h3 className="sitemap-heading">SITEMAP</h3>
                    <div className="sitemap-links">
                        <ul className="sitemap-column">
                            <li className="sitemap-item">Try Us</li>
                            <li className="sitemap-item">Join Us</li>
                            <li className="sitemap-item">Personal Training</li>
                            <li className="sitemap-item">Classes</li>
                            <li className="sitemap-item">Offers</li>
                            <li className="sitemap-item">Careers at Everyday Gym</li>
                            <li className="sitemap-item">Location</li>
                            <li className="sitemap-item">About Us</li>
                            <li className="sitemap-item">Terms & Conditions</li>
                            <li className="sitemap-item">Membership Policy</li>
                        </ul>
                    </div>
                </div>


                <div className="app-social-section">
                    <div className="app-stores">
                        <a href="/" className="app-link">
                            <img
                                src={googlePlay}
                                alt="Google Play"
                                className="store-icon"
                            />
                        </a>
                        <a href="/" className="app-link">
                            <img
                                src={appStore}
                                alt="App Store"
                                className="store-icon"
                            />
                        </a>
                    </div>
                    <div className="social-icons">
                        <a href="/" className="social-link">
                            <img src={instagramIcon} alt="Instagram" className="social-icon" />
                        </a>
                        <a href="/" className="social-link">
                            <img src={youtubeIcon} alt="YouTube" className="social-icon" />
                        </a>
                        <a href="/" className="social-link">
                            <img src={facebookIcon} alt="Facebook" className="social-icon" />
                        </a>
                        <a href="/" className="social-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;