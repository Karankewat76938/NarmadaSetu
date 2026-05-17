import React from 'react';
import { Users, ShoppingBag, TrendingUp, Activity } from 'lucide-react';
import './AdminAnalytics.css';

const AdminAnalytics = () => {
  return (
    <div>
      <div className="admin-analytics-grid">
        <div className="dark-stat-card">
          <div className="dark-stat-icon emerald">
            <Users size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Total Users</h3>
            <p>1,248</p>
          </div>
        </div>
        
        <div className="dark-stat-card">
          <div className="dark-stat-icon blue">
            <ShoppingBag size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Active Bookings</h3>
            <p>856</p>
          </div>
        </div>

        <div className="dark-stat-card">
          <div className="dark-stat-icon amber">
            <TrendingUp size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Platform Revenue</h3>
            <p>₹1.2L</p>
          </div>
        </div>

        <div className="dark-stat-card">
          <div className="dark-stat-icon purple">
            <Activity size={24} />
          </div>
          <div className="dark-stat-info">
            <h3>Server Load</h3>
            <p>24%</p>
          </div>
        </div>
      </div>

      <div className="dark-panel">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Revenue Over Time</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Monthly platform fee collection.</p>
        <div className="chart-placeholder">
          [ Interactive Line Chart Visualization Here ]
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
