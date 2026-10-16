import React from 'react';
import { MapPin, CalendarClock } from 'lucide-react';
import './UpcomingBookings.css';

const STATUS_CLASS = {
  pending: 'pending',
  confirmed: 'confirmed',
  rejected: 'rejected',
  cancelled: 'cancelled',
  completed: 'completed'
};

const UpcomingBookings = ({ bookings = [], loading = false }) => {
  const upcoming = bookings.filter(b => ['pending', 'confirmed'].includes(b.bookingStatus));

  if (loading) return <div className="upcoming-section"><p>Loading bookings...</p></div>;

  return (
    <div className="upcoming-section">
      <div className="section-header">
        <h2>Upcoming Trips</h2>
      </div>

      <div className="upcoming-list">
        {upcoming.length === 0 && (
          <p style={{ color: '#64748b', padding: '16px 0' }}>No upcoming bookings. <a href="/services">Explore services</a></p>
        )}
        {upcoming.map(booking => (
          <div key={booking._id} className="booking-list-card">
            {booking.service?.images?.[0] && (
              <img src={booking.service.images[0]} alt={booking.service?.title} className="booking-thumb" />
            )}
            <div className="booking-info-main">
              <div className="b-header">
                <h3>{booking.service?.title || 'Service'}</h3>
                <span className={`status-badge ${STATUS_CLASS[booking.bookingStatus] || ''}`}>
                  {booking.bookingStatus}
                </span>
              </div>
              <div className="b-details">
                <span className="detail-item"><CalendarClock size={14} /> {new Date(booking.bookingDate).toLocaleDateString('en-IN')} at {booking.bookingTimeSlot}</span>
                <span className="detail-item"><MapPin size={14} /> {booking.service?.location?.name || '—'}</span>
              </div>
              <p className="b-host">Hosted by {booking.provider?.name || '—'} • ₹{booking.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
