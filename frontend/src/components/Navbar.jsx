import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Ship, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

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

  const handleLogoutClick = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  // Get user dashboard route based on role
  const getDashboardRoute = () => {
    if (!user) return '/dashboard';
    if (user.role === 'rider') return '/rider';
    if (user.role === 'provider') return '/provider';
    if (user.role === 'admin') return '/admin';
    return '/dashboard';
  };

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
              {isAuthenticated ? (
                <>
                  <span className="nav-user-greeting" style={{ fontSize: '0.9rem', color: 'var(--dark-light)', fontWeight: 600 }}>
                    Hi, {user.name}
                  </span>
                  <Link to={getDashboardRoute()} className="btn btn-secondary btn-sm" style={{ padding: '8px 16px' }} onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogoutClick} 
                    className="nav-link login-link btn-logout-navbar" 
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer', 
                      fontFamily: 'inherit', 
                      fontWeight: '500', 
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#ef4444',
                      padding: 0
                    }}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link login-link">Login</Link>
                  <Link to="/partner" className="btn btn-primary btn-sm">Partner With Us</Link>
                </>
              )}
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

