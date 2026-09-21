import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingsAPI } from '../../services/bookings.api';
import StatusBadge from '../../components/common/StatusBadge';
import ReviewModal from '../../components/booking/ReviewModal';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [actionError, setActionError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingsAPI.getBookings();
      if (res.success && res.data?.bookings) {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    setActionError('');
    setActionSuccess('');

    try {
      const res = await bookingsAPI.cancelBooking(bookingId, { reason: cancelReason || 'Cancelled by tourist' });
      if (res.success) {
        setActionSuccess('Booking cancelled successfully.');
        setCancelReason('');
        fetchBookings();
      }
    } catch (err) {
      setActionError(err.message || 'Failed to cancel booking.');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.bookingStatus === activeTab;
  });

  const tabs = [
    { id: 'all', label: `All (${bookings.length})` },
    { id: 'pending', label: `Pending (${bookings.filter((b) => b.bookingStatus === 'pending').length})` },
    { id: 'confirmed', label: `Confirmed (${bookings.filter((b) => b.bookingStatus === 'confirmed').length})` },
    { id: 'completed', label: `Completed (${bookings.filter((b) => b.bookingStatus === 'completed').length})` },
    { id: 'cancelled', label: `Cancelled (${bookings.filter((b) => b.bookingStatus === 'cancelled').length})` }
  ];

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Bookings & Reservations</h1>
        <p className="dashboard-subtitle">
          Track reservation statuses, cancellation requests, and share verified reviews.
        </p>
      </div>

      {actionSuccess && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          ✓ {actionSuccess}
        </div>
      )}

      {actionError && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          ⚠️ {actionError}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border)', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '6px' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
          Loading your bookings...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎫</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>No bookings found</h3>
          <p style={{ color: 'var(--color-text-muted)', margin: '8px 0 20px' }}>
            {activeTab === 'all'
              ? "You haven't booked any experiences yet."
              : `No bookings currently in '${activeTab}' status.`}
          </p>
          <Link to="/explore" className="btn btn-primary">
            Explore Available Experiences
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredBookings.map((b) => (
            <div key={b._id} className="card" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    BOOKING ID: #{b._id.slice(-6).toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '4px 0 6px' }}>
                    {b.service?.title}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    📍 {b.service?.location?.name}, {b.service?.location?.city} • Provider: <strong>{b.provider?.name || 'Local Partner'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <StatusBadge status={b.bookingStatus} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Payment: <StatusBadge status={b.paymentStatus} />
                  </span>
                </div>
              </div>

              {/* Details grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px', fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>Date</span>
                  <strong>{new Date(b.bookingDate).toLocaleDateString()}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>Time Slot</span>
                  <strong>{b.bookingTimeSlot}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>Quantity / People</span>
                  <strong>{b.quantity}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.8rem' }}>Total Amount</span>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>₹{b.totalAmount}</strong>
                </div>
              </div>

              {b.notes && (
                <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                  <strong>Special Notes:</strong> {b.notes}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <Link to={`/service/${b.service?._id}`} className="btn btn-secondary btn-sm">
                  View Experience Details
                </Link>

                {/* Cancel option if pending or confirmed (PRD Section 4.1 & 11) */}
                {(b.bookingStatus === 'pending' || b.bookingStatus === 'confirmed') && (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Cancel Reservation
                  </button>
                )}

                {/* Review option if completed (PRD Section 17) */}
                {b.bookingStatus === 'completed' && (
                  <button
                    onClick={() => setSelectedBookingForReview(b)}
                    className="btn btn-primary btn-sm"
                  >
                    ★ Write Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {selectedBookingForReview && (
        <ReviewModal
          booking={selectedBookingForReview}
          onClose={() => setSelectedBookingForReview(null)}
          onSuccess={() => {
            setActionSuccess('Thank you! Your verified review has been published.');
            fetchBookings();
          }}
        />
      )}
    </div>
  );
}

export default MyBookings;
