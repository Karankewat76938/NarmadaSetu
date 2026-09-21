import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../../services/bookings.api';
import StatusBadge from '../../components/common/StatusBadge';

function PartnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      console.error('Failed to load partner bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    setMessage('');
    setError('');
    try {
      const res = await bookingsAPI.updateBookingStatus(bookingId, { status: newStatus });
      if (res.success) {
        setMessage(`Booking status successfully updated to ${newStatus}.`);
        fetchBookings();
      }
    } catch (err) {
      setError(err.message || 'Failed to update booking status.');
    }
  };

  const filtered = bookings.filter((b) => {
    if (filterStatus === 'all') return true;
    return b.bookingStatus === filterStatus;
  });

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Incoming Booking Requests</h1>
        <p className="dashboard-subtitle">
          Review tourist reservations, accept arrivals, and mark completed rides/stays.
        </p>
      </div>

      {message && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          ✓ {message}
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto' }}>
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {st} ({st === 'all' ? bookings.length : bookings.filter((b) => b.bookingStatus === st).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
          Loading booking requests...
        </div>
      ) : filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
          <h3>No bookings in this view</h3>
          <p style={{ color: 'var(--color-text-muted)', margin: '8px 0' }}>
            There are currently no bookings with status '{filterStatus}'.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking ID & Experience</th>
                <th>Tourist Details</th>
                <th>Date & Slot</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.service?.title}</div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                      #{b._id.slice(-6).toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div><strong>{b.tourist?.name}</strong></div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      📞 {b.tourist?.phone || 'No phone'}
                    </div>
                  </td>
                  <td>
                    <div>{new Date(b.bookingDate).toLocaleDateString()}</div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      {b.bookingTimeSlot}
                    </span>
                  </td>
                  <td>{b.quantity}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>₹{b.totalAmount}</td>
                  <td><StatusBadge status={b.bookingStatus} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {b.bookingStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'confirmed')}
                            className="btn btn-sm btn-primary"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          >
                            ✓ Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'rejected')}
                            className="btn btn-sm btn-danger"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}

                      {b.bookingStatus === 'confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(b._id, 'completed')}
                          className="btn btn-sm"
                          style={{ backgroundColor: '#16a34a', color: '#fff', padding: '4px 10px', fontSize: '0.78rem' }}
                        >
                          ★ Mark Completed
                        </button>
                      )}

                      {(b.bookingStatus === 'completed' || b.bookingStatus === 'rejected' || b.bookingStatus === 'cancelled') && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          No actions
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PartnerBookings;

