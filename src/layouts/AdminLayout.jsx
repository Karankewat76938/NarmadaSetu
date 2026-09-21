import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function AdminLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div style={{ padding: '0 12px 16px', borderBottom: '1px solid var(--color-border)', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#b45309', fontWeight: 700 }}>
              🛡️ Administrator Hub
            </span>
          </div>
          <NavLink
            to="/admin/dashboard"
            end
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            📊 Platform Analytics
          </NavLink>
          <NavLink
            to="/admin/partners"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            🔍 Partner Verifications
          </NavLink>
          <NavLink
            to="/admin/services"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            ⚖️ Service Moderation
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => `dashboard-nav-item ${isActive ? 'active' : ''}`}
          >
            👥 User Management
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

export default AdminLayout;

