import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ship, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar ${scrolled ? 'glass' : ''}`}>
        <div className="container navbar-container">
          <Link to="/" className="navbar-logo">
            <Ship className="logo-icon" size={28} />
            <span className="logo-text">Narmada<span style={{color: 'var(--primary)'}}>Setu</span></span>
          </Link>
          
          <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/explore" className="nav-link">Explore</Link>
            <Link to="/services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/community" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Community</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            
            <div className="nav-actions">
              <Link to="/login" className="nav-link login-link">Login</Link>
              <Link to="/partner" className="btn btn-primary btn-sm">Partner With Us</Link>
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
