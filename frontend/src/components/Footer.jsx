import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Ship className="logo-icon" size={28} />
            <span className="logo-text">Narmada<span style={{color: 'var(--primary-light)'}}>Setu</span></span>
          </Link>
          <p className="footer-desc">
            Empowering local Kewat communities while providing authentic, safe, and spiritual tourism experiences along the holy Narmada river.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">TW</a>
            <a href="#" className="social-icon">IG</a>
          </div>
        </div>

        <div className="footer-links-group">
          <h3>Quick Links</h3>
          <Link to="/explore">Explore Narmada</Link>
          <Link to="/services">Book a Ride</Link>
          <Link to="/community">Our Community</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-links-group">
          <h3>Support</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact Info</h3>
          <p><MapPin size={16} /> Ghat No. 4, Bhedaghat, Jabalpur, MP</p>
          <p><Phone size={16} /> +91 98765 43210</p>
          <p><Mail size={16} /> namaste@narmadasetu.in</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Narmada Setu. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
