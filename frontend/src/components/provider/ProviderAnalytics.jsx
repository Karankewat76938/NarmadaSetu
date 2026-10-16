import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const ProviderAnalytics = () => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="dark-panel">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Earnings (Month)</p>
          <h3 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <IndianRupee size={22} /> 32,450
          </h3>
          <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <TrendingUp size={14} /> +12.5% from last month
          </p>
        </div>

        <div className="dark-panel">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Trips</p>
          <h3 style={{ fontSize: '1.75rem' }}>42</h3>
          <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <TrendingUp size={14} /> +4 this week
          </p>
        </div>

        <div className="dark-panel">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Cancellation Rate</p>
          <h3 style={{ fontSize: '1.75rem' }}>2.5%</h3>
          <p style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <TrendingDown size={14} /> -0.5% from last month
          </p>
        </div>

        <div className="dark-panel">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avg Booking Lead Time</p>
          <h3 style={{ fontSize: '1.75rem' }}>3.2 Days</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
            <Clock size={14} /> Steady
          </p>
        </div>
      </div>

      <div className="dark-panel">
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          Income Breakdown
        </h3>
        
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)' }}>
          [ Bar Chart: Daily Earnings for Current Month ]
        </div>
      </div>
    </div>
  );
};

export default ProviderAnalytics;
