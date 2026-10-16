import React, { useState, useEffect } from 'react';
import { Check, X, CheckCheck } from 'lucide-react';
import { getBookingsApi, updateBookingStatusApi } from '../../services/bookings.api';

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'confirmed', 'completed'
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getBookingsApi({ limit: 50 });
      setBookings(res.data?.bookings || []);
    } catch (err) {
      console.error('Failed to fetch provider bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateBookingStatusApi(id, { status: newStatus });
      await fetchBookings();
    } catch (err) {
      alert(err.message || 'Failed to update booking');
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = bookings.filter(b => {
    if (filter === 'all') return true;
    return b.bookingStatus === filter;
  });

  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'btn-dark-primary' : ''}
          style={filter !== 'all' ? { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' } : { padding: '0.5rem 1rem' }}
        >
          All ({bookings.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={filter === 'pending' ? 'btn-dark-primary' : ''}
          style={filter !== 'pending' ? { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' } : { padding: '0.5rem 1rem' }}
        >
          Pending ({bookings.filter(b => b.bookingStatus === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('confirmed')}
          className={filter === 'confirmed' ? 'btn-dark-primary' : ''}
          style={filter !== 'confirmed' ? { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' } : { padding: '0.5rem 1rem' }}
        >
          Confirmed ({bookings.filter(b => b.bookingStatus === 'confirmed').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'btn-dark-primary' : ''}
          style={filter !== 'completed' ? { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' } : { padding: '0.5rem 1rem' }}
        >
          Completed ({bookings.filter(b => b.bookingStatus === 'completed').length})
        </button>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading bookings...</div>
      ) : (
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No bookings found.
                  </td>
                </tr>
              ) : (
                filtered.map(booking => (
                  <tr key={booking._id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{booking.tourist?.name || 'Guest Tourist'}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{booking.quantity} Guests • {booking.tourist?.phone || '—'}</div>
                    </td>
                    <td>{booking.service?.title || 'Custom Service'}</td>
                    <td>
                      <div>{new Date(booking.bookingDate).toLocaleDateString('en-IN')}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{booking.bookingTimeSlot}</div>
                    </td>
                    <td style={{ fontWeight: 600 }}>₹{booking.totalAmount}</td>
                    <td>
                      <span style={{ 
                        color: booking.bookingStatus === 'confirmed' ? 'var(--accent-primary)' : 
                               booking.bookingStatus === 'pending' ? 'var(--accent-warning)' : 
                               booking.bookingStatus === 'completed' ? '#38bdf8' : 'var(--accent-danger)',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        textTransform: 'capitalize'
                      }}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td>
                      {booking.bookingStatus === 'pending' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="btn-icon"
                            title="Accept"
                            disabled={updatingId === booking._id}
                            onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                            style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--accent-primary)', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            <Check size={16} />
                          </button>
                          <button
                            className="btn-icon"
                            title="Reject"
                            disabled={updatingId === booking._id}
                            onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                            style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--accent-danger)', border: 'none', padding: '0.4rem', borderRadius: '4px', cursor: 'pointer' }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                      {booking.bookingStatus === 'confirmed' && (
                        <button
                          disabled={updatingId === booking._id}
                          onClick={() => handleStatusUpdate(booking._id, 'completed')}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(16,185,129,0.15)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', padding: '0.35rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          <CheckCheck size={14} /> Mark Completed
                        </button>
                      )}
                      {['completed', 'rejected', 'cancelled'].includes(booking.bookingStatus) && (
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Closed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProviderBookings;
