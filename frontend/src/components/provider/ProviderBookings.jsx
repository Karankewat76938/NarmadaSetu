import React from 'react';
import { Check, X, MessageCircle } from 'lucide-react';

const MOCK_BOOKINGS = [
  { id: 'BKG-7829', user: 'Priya Sharma', service: 'Sunrise Marble Rocks Tour', date: 'Oct 24, 2026', time: '06:00 AM', guests: 2, status: 'Pending', price: '₹1600' },
  { id: 'BKG-7828', user: 'Rahul Dev', service: 'VIP Maha Aarti Boat', date: 'Oct 23, 2026', time: '06:30 PM', guests: 4, status: 'Confirmed', price: '₹2000' },
  { id: 'BKG-7825', user: 'Amit Patel', service: 'Standard Boat Ride', date: 'Oct 23, 2026', time: '10:00 AM', guests: 6, status: 'Completed', price: '₹2400' }
];

const ProviderBookings = () => {
  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        <button className="btn-dark-primary">Upcoming (2)</button>
        <button style={{ background: 'transparent', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}>Past Trips</button>
      </div>

      <div className="dark-table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>Tourist</th>
              <th>Service Details</th>
              <th>Schedule</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BOOKINGS.map(booking => (
              <tr key={booking.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{booking.user}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{booking.guests} Guests</div>
                </td>
                <td>{booking.service}</td>
                <td>
                  <div>{booking.date}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{booking.time}</div>
                </td>
                <td style={{ fontWeight: 600 }}>{booking.price}</td>
                <td>
                  <span style={{ 
                    color: booking.status === 'Confirmed' ? 'var(--accent-primary)' : 
                           booking.status === 'Pending' ? 'var(--accent-warning)' : 'var(--text-secondary)',
                    fontWeight: 500,
                    fontSize: '0.85rem'
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  {booking.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-icon" title="Accept" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent-primary)', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}>
                        <Check size={16} />
                      </button>
                      <button className="btn-icon" title="Decline" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-danger)', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'white', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}>
                      <MessageCircle size={14} /> Message
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderBookings;
