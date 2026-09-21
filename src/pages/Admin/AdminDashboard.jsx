import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/admin.api';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAPI.getDashboardStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Loading platform governance analytics...
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Platform Governance & Analytics</h1>
        <p className="dashboard-subtitle">
          Administrative control center for NarmadaSetu tourism marketplace (PRD Section 16).
        </p>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <div className="stat-card">
          <span className="stat-card-title">Registered Tourists</span>
          <span className="stat-card-value" style={{ color: 'var(--color-primary)' }}>
            {stats?.totalUsers || 0}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Service Partners</span>
          <span className="stat-card-value" style={{ color: 'var(--color-secondary)' }}>
            {stats?.totalPartners || 0}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Pending Partner Verifications</span>
          <span className="stat-card-value" style={{ color: 'var(--color-pending)' }}>
            {stats?.pendingApplications || 0}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Active Services</span>
          <span className="stat-card-value" style={{ color: 'var(--color-text)' }}>
            {stats?.totalServices || 0}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Total Platform Bookings</span>
          <span className="stat-card-value" style={{ color: 'var(--color-confirmed)' }}>
            {stats?.totalBookings || 0}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Completed Trips</span>
          <span className="stat-card-value" style={{ color: 'var(--color-completed)' }}>
            {stats?.completedBookings || 0}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Gross Platform Volume</span>
          <span className="stat-card-value" style={{ color: '#047857' }}>
            ₹{(stats?.totalVolume || 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Action shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            🔍 Partner Verification Queue
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Review new provider applications, check Aadhaar/permits, and grant service publishing permissions.
          </p>
          <Link to="/admin/partners" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Inspect Applications ({stats?.pendingApplications || 0} Pending) →
          </Link>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            ⚖️ Marketplace Moderation
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Audit active services, verify pricing accuracy, ensure safety guidelines, and disable fraudulent listings.
          </p>
          <Link to="/admin/services" className="btn btn-secondary" style={{ marginTop: '16px' }}>
            Audit Services →
          </Link>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
            👥 User & Role Administration
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            View tourist and partner directory, manage permissions, and suspend offending accounts.
          </p>
          <Link to="/admin/users" className="btn btn-secondary" style={{ marginTop: '16px' }}>
            Manage Users →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

