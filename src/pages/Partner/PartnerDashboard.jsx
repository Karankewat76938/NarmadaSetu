import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { partnerAPI } from '../../services/partner.api';
import StatusBadge from '../../components/common/StatusBadge';

function PartnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const res = await partnerAPI.getMe();
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load partner dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
        Loading partner metrics...
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalServices: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    totalEarnings: 0
  };

  const appStatus = data?.application?.applicationStatus || 'unregistered';

  return (
    <div>
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="dashboard-title">Partner Management Console</h1>
            <p className="dashboard-subtitle">
              Monitor your service requests, bookings, revenue, and river operational credentials.
            </p>
          </div>
          <div>
            <StatusBadge status={appStatus} type="partner" />
          </div>
        </div>
      </div>

      {/* Verification warning if pending */}
      {appStatus !== 'approved' && (
        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '16px', borderRadius: '12px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong>Provider Verification Required:</strong> Your application status is currently{' '}
            <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>{appStatus}</span>. Services can only be published publicly once verified by admin.
          </div>
          <Link to="/partner/apply" className="btn btn-secondary btn-sm" style={{ backgroundColor: '#ffffff' }}>
            Check Application →
          </Link>
        </div>
      )}

      {/* Metrics Row (PRD Section 15.1) */}
      <div className="metrics-grid">
        <div className="stat-card">
          <span className="stat-card-title">Total Active Services</span>
          <span className="stat-card-value" style={{ color: 'var(--color-primary)' }}>
            {metrics.totalServices}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Pending Booking Requests</span>
          <span className="stat-card-value" style={{ color: 'var(--color-pending)' }}>
            {metrics.pendingBookings}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Confirmed Trips</span>
          <span className="stat-card-value" style={{ color: 'var(--color-confirmed)' }}>
            {metrics.confirmedBookings}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Completed Trips</span>
          <span className="stat-card-value" style={{ color: 'var(--color-completed)' }}>
            {metrics.completedBookings}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Total Gross Earnings</span>
          <span className="stat-card-value" style={{ color: '#047857' }}>
            ₹{metrics.totalEarnings.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Fast Action Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
              ⛵ Manage Services & Listings
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Add new boat rides, homestays, or Aarti experiences. Update seasonal prices, slots, and safety descriptions.
            </p>
          </div>
          <Link to="/partner/services" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Manage Services →
          </Link>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
              📋 Incoming Booking Requests
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Accept or reject reservation requests submitted by tourists. Mark completed rides to update your earnings.
            </p>
          </div>
          <Link to="/partner/bookings" className="btn btn-secondary" style={{ marginTop: '16px' }}>
            Review Bookings ({metrics.pendingBookings} Pending) →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PartnerDashboard;

