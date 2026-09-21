import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function PartnerLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div style={{ padding: '0 12px 16px', borderBottom: '1px solid var(--color-border)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700 }}>
              Partner Console
            </span>
          </div>
          <NavLink
            to="/partner/dashboard"
            end
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            📊 Earnings & Overview
          </NavLink>
          <NavLink
            to="/partner/services"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            ⛵ My Services & Listings
          </NavLink>
          <NavLink
            to="/partner/bookings"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            📋 Booking Requests
          </NavLink>
          <NavLink
            to="/partner/apply"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            📑 Verification Status
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

export default PartnerLayout;

