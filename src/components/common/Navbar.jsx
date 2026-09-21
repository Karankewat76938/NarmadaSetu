import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        padding: '14px 0'
      }}
    >
      <div
        style={{
          width: '92%',
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#ffd369',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}
        >
          <span>🌊 NarmadaSetu</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px'
          }}
          className="desktop-nav"
        >
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/explore" style={navLinkStyle}>Explore</Link>
          <a href="/#categories" style={navLinkStyle}>Categories</a>
          <a href="/#how-it-works" style={navLinkStyle}>How It Works</a>
          <a href="/#safety" style={navLinkStyle}>Safety & Trust</a>

          {/* Role specific quick link */}
          {user?.role === 'partner' && (
            <Link to="/partner/dashboard" style={{ ...navLinkStyle, color: '#38bdf8' }}>
              Partner Dashboard
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" style={{ ...navLinkStyle, color: '#f59e0b' }}>
              Admin Console
            </Link>
          )}
          {user?.role === 'tourist' && (
            <Link to="/tourist/bookings" style={{ ...navLinkStyle, color: '#38bdf8' }}>
              My Bookings
            </Link>
          )}
        </nav>

        {/* Right CTA Actions */}
        <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="desktop-actions">
          {!isAuthenticated ? (
            <>
              <Link
                to="/partner/apply"
                style={{
                  color: '#e2e8f0',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  marginRight: '6px'
                }}
              >
                Become a Partner
              </Link>
              <Link to="/login" className="btn btn-sm btn-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'partner' ? '/partner/dashboard' : '/tourist/dashboard'}
                className="btn btn-sm btn-secondary"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                👤 {user.name.split(' ')[0]} ({user.role})
              </Link>
              <button onClick={handleLogout} className="btn btn-sm btn-danger">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '1.6rem',
            cursor: 'pointer'
          }}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#0f172a',
            padding: '20px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Home</Link>
          <Link to="/explore" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Explore Experiences</Link>
          <a href="/#categories" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Categories</a>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>How It Works</a>
          <a href="/#safety" onClick={() => setMobileMenuOpen(false)} style={mobileNavLinkStyle}>Safety & Trust</a>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />

          {!isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/partner/apply" onClick={() => setMobileMenuOpen(false)} style={{ color: '#ffd369', textDecoration: 'none', fontWeight: 600 }}>
                Become a Partner
              </Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-secondary" style={{ width: '100%' }}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
                Register
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : user.role === 'partner' ? '/partner/dashboard' : '/tourist/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                Go to {user.role.toUpperCase()} Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%' }}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Responsive media query helper for Navbar */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-actions { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}

const navLinkStyle = {
  color: '#e2e8f0',
  textDecoration: 'none',
  fontSize: '0.92rem',
  fontWeight: 500,
  transition: 'color 0.2s ease'
};

const mobileNavLinkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: 500,
  padding: '6px 0'
};

export default Navbar;

