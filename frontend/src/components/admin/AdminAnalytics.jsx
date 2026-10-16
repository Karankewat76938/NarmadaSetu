import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, TrendingUp, Activity } from 'lucide-react';
import { getAdminDashboardApi } from '../../services/admin.api';
import './AdminAnalytics.css';

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboardApi()
      .then(res => setStats(res.data))
      .catch(err => console.error('Failed to load admin stats:', err))
      .finally(() => setLoading(false));
  }, []);

  const totalUsers = (stats?.totalUsers || 0) + (stats?.totalPartners || 0);
  const totalBookings = stats?.totalBookings || 0;
  const totalVolume = stats?.totalVolume || 0;
  const pendingApps = stats?.pendingApplications || 0;

  return (
    <div>
      <div className="admin-analytics-grid">
        <div className="dark-stat-card">
          <div className="dark-stat-icon emerald">
            <Users size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Total Users</h3>
            <p>{loading ? '...' : totalUsers.toLocaleString('en-IN')}</p>
          </div>
        </div>
        
        <div className="dark-stat-card">
          <div className="dark-stat-icon blue">
            <ShoppingBag size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Total Bookings</h3>
            <p>{loading ? '...' : totalBookings.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="dark-stat-card">
          <div className="dark-stat-icon amber">
            <TrendingUp size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Platform Volume</h3>
            <p>{loading ? '...' : `₹${totalVolume.toLocaleString('en-IN')}`}</p>
          </div>
        </div>

        <div className="dark-stat-card">
          <div className="dark-stat-icon purple">
            <Activity size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Pending Applications</h3>
            <p>{loading ? '...' : pendingApps}</p>
          </div>
        </div>
      </div>

      <div className="dark-panel">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Platform Breakdown</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Live breakdown across service listings, registered boaters, and booking fulfillment.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Active Services</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>{stats?.totalServices || 0}</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Partner Boaters</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem' }}>{stats?.totalPartners || 0}</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Completed Bookings</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem', color: 'var(--accent-primary)' }}>{stats?.completedBookings || 0}</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Pending Requests</span>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '0.25rem', color: 'var(--accent-warning)' }}>{stats?.pendingBookings || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
