import React from 'react';
import './PastBookingsSummary.css';

const PastBookingsSummary = ({ bookings = [] }) => {
  const past = bookings.filter(b => ['completed', 'cancelled', 'rejected'].includes(b.bookingStatus)).slice(0, 3);

  return (
    <div className="past-bookings-panel">
      <h3>Recent Activity</h3>
      {past.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '0.875rem' }}>No past bookings yet.</p>
      ) : (
        past.map(b => (
          <div key={b._id} className="past-booking-item">
            <div>
              <p className="past-title">{b.service?.title || 'Service'}</p>
              <p className="past-date">{new Date(b.bookingDate).toLocaleDateString('en-IN')} • ₹{b.totalAmount}</p>
            </div>
            <span className={`status-badge ${b.bookingStatus}`}>{b.bookingStatus}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default PastBookingsSummary;
