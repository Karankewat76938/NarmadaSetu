import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function TouristLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div style={{ padding: '0 12px 16px', borderBottom: '1px solid var(--color-border)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Tourist Portal
            </span>
          </div>
          <NavLink
            to="/tourist/dashboard"
            end
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            📊 Dashboard Overview
          </NavLink>
          <NavLink
            to="/tourist/bookings"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            🎫 My Bookings
          </NavLink>
          <NavLink
            to="/tourist/profile"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            ⚙️ Profile & Settings
          </NavLink>
        </aside>

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default TouristLayout;

