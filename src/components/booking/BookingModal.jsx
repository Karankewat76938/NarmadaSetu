import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingsAPI } from '../../services/bookings.api';
import { useAuth } from '../../context/AuthContext';

const BookingModal = ({ service, onClose, onSuccess }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(todayStr);
  const [bookingTimeSlot, setBookingTimeSlot] = useState(
    service.availability?.timeSlots?.[0] || 'Morning (7:00 AM - 10:00 AM)'
  );
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const maxCapacity = service.categoryDetails?.capacity || 20;
  const totalPrice = (service.price || 0) * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        serviceId: service._id,
        bookingDate,
        bookingTimeSlot,
        quantity: Number(quantity),
        notes
      };

      const res = await bookingsAPI.createBooking(payload);
      if (res.success) {
        if (onSuccess) onSuccess(res.data.booking);
        navigate('/tourist/bookings');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit booking request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Book Experience</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {service.title}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close booking modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '18px', fontSize: '0.9rem' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Provider and Location info */}
            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', marginBottom: '20px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span><strong>Provider:</strong> {service.provider?.name || 'Local Partner'}</span>
                <span><strong>Location:</strong> {service.location?.name}, {service.location?.city}</span>
              </div>
            </div>

            {/* Date selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="bookingDate">Select Date *</label>
              <input
                type="date"
                id="bookingDate"
                className="form-input"
                min={todayStr}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>

            {/* Time slot selection */}
            <div className="form-group">
              <label className="form-label" htmlFor="bookingTime">Preferred Time Slot *</label>
              <select
                id="bookingTime"
                className="form-select"
                value={bookingTimeSlot}
                onChange={(e) => setBookingTimeSlot(e.target.value)}
                required
              >
                {(service.availability?.timeSlots || [
                  'Morning (6:30 AM - 10:00 AM)',
                  'Afternoon (1:00 PM - 4:00 PM)',
                  'Sunset / Evening (4:30 PM - 7:30 PM)'
                ]).map((slot, idx) => (
                  <option key={idx} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label" htmlFor="quantity">
                {service.category === 'boat_ride' ? 'Passengers (Seats)' : service.category === 'homestay' ? 'Guests' : 'Quantity / Portions'} *
              </label>
              <input
                type="number"
                id="quantity"
                className="form-input"
                min="1"
                max={maxCapacity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                required
              />
              <span className="form-helper">
                Max permitted per reservation: {maxCapacity}
              </span>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label" htmlFor="notes">Special Requests / Notes (Optional)</label>
              <textarea
                id="notes"
                className="form-textarea"
                rows="2"
                placeholder="e.g. Life jackets for senior citizens, dietary preferences, arrival time..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Price calculation display */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <span>Rate per unit:</span>
                <span>₹{service.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <span>Quantity:</span>
                <span>× {quantity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                <span>Total Amount:</span>
                <span>₹{totalPrice}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                * Final verified pricing confirmed by server according to PRD rules.
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Confirm & Request Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
