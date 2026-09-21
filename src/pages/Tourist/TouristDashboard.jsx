import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI } from '../../services/bookings.api';
import { useAuth } from '../../context/AuthContext';
import StatusBadge from '../../components/common/StatusBadge';

function TouristDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await bookingsAPI.getBookings();
        if (res.success && res.data?.bookings) {
          setBookings(res.data.bookings);
        }
      } catch (err) {
        console.error('Error fetching tourist bookings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const pendingCount = bookings.filter((b) => b.bookingStatus === 'pending').length;
  const confirmedCount = bookings.filter((b) => b.bookingStatus === 'confirmed').length;
  const completedCount = bookings.filter((b) => b.bookingStatus === 'completed').length;

  const upcomingBookings = bookings
    .filter((b) => b.bookingStatus === 'confirmed' || b.bookingStatus === 'pending')
    .slice(0, 3);

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user?.name || 'Traveler'} 👋</h1>
        <p className="dashboard-subtitle">
          Manage your sacred Narmada journeys, view reservations, and share your experiences.
        </p>
      </div>

      {/* Metrics Row (PRD Section 14) */}
      <div className="metrics-grid">
        <div className="stat-card">
          <span className="stat-card-title">Total Bookings</span>
          <span className="stat-card-value" style={{ color: 'var(--color-primary)' }}>
            {bookings.length}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Pending Requests</span>
          <span className="stat-card-value" style={{ color: 'var(--color-pending)' }}>
            {pendingCount}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Confirmed Trips</span>
          <span className="stat-card-value" style={{ color: 'var(--color-confirmed)' }}>
            {confirmedCount}
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-card-title">Completed Stays & Rides</span>
          <span className="stat-card-value" style={{ color: 'var(--color-completed)' }}>
            {completedCount}
          </span>
        </div>
      </div>

      {/* Upcoming / Active Bookings Preview */}
      <div className="card" style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Upcoming & Active Reservations
          </h3>
          <Link to="/tourist/bookings" style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>
            View All ({bookings.length}) →
          </Link>
        </div>

        {loading ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Loading reservations...</p>
        ) : upcomingBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--color-text-muted)' }}>
            <p>You have no upcoming reservations.</p>
            <Link to="/explore" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
              Discover Experiences
            </Link>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Experience</th>
                  <th>Date & Time</th>
                  <th>Operator</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {upcomingBookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{b.service?.title}</div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        📍 {b.service?.location?.name || 'Narmada Ghat'}
                      </span>
                    </td>
                    <td>
                      <div>{new Date(b.bookingDate).toLocaleDateString()}</div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        {b.bookingTimeSlot}
                      </span>
                    </td>
                    <td>{b.provider?.name || 'Local Partner'}</td>
                    <td style={{ fontWeight: 700 }}>₹{b.totalAmount}</td>
                    <td><StatusBadge status={b.bookingStatus} /></td>
                    <td>
                      <Link to="/tourist/bookings" className="btn btn-secondary btn-sm">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Action Discovery Banner */}
      <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '24px', borderRadius: '16px', border: '1px solid #bae6fd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary-hover)', margin: 0 }}>
            Planning your next Narmada darshan?
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', margin: '4px 0 0' }}>
            Explore verified boat rides, riverfront homestays, and special Aarti bookings across all destinations.
          </p>
        </div>
        <Link to="/explore" className="btn btn-primary">
          Explore Experiences
        </Link>
      </div>
    </div>
  );
}

export default TouristDashboard;

