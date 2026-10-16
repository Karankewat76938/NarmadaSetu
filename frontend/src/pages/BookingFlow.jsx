import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServiceByIdApi } from '../services/services.api';
import { createBookingApi } from '../services/bookings.api';
import './BookingFlow.css';

const TIME_SLOTS = [
  'Morning (6:00 AM - 10:00 AM)',
  'Afternoon (11:00 AM - 3:00 PM)',
  'Evening (4:00 PM - 8:00 PM)'
];

const BookingFlow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const serviceId = searchParams.get('serviceId');

  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(!!serviceId);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [booking, setBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (serviceId) {
      getServiceByIdApi(serviceId)
        .then(res => setService(res.data?.service))
        .catch(() => setError('Service not found'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [serviceId]);

  const handleConfirm = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await createBookingApi({
        serviceId,
        bookingDate: date,
        bookingTimeSlot: timeSlot,
        quantity: parseInt(quantity, 10) || 1,
        notes
      });
      setBooking(res.data?.booking);
      setStep(3);
    } catch (err) {
      setError(err.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = service ? service.price * parseInt(quantity, 10) : 0;

  if (loading) return <div className="booking-page container" style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;

  return (
    <div className="booking-page container">
      <div className="booking-container glass">
        <div className="booking-header">
          <h2>Complete Your Booking{service ? ` — ${service.title}` : ''}</h2>
          <div className="step-indicator">Step {step} of 3</div>
        </div>

        <div className="booking-body">
          {step === 1 && (
            <div className="step-content animate-fade-in">
              <h3>Select Details</h3>
              {!serviceId && (
                <p style={{ color: '#ef4444', marginBottom: '1rem' }}>No service selected. <a href="/services">Browse services</a></p>
              )}
              <div className="form-group">
                <label className="form-label">Select Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time Slot</label>
                <select className="form-input" value={timeSlot} onChange={e => setTimeSlot(e.target.value)}>
                  {(service?.availability?.timeSlots || TIME_SLOTS).map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <input
                  type="number" min="1" max="20"
                  className="form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Special Requests (optional)</label>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Any special requirements..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!date || !serviceId}>
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-fade-in">
              <h3>Review Booking</h3>
              <div className="review-details">
                <p><strong>Service:</strong> {service?.title || 'Unknown Service'}</p>
                <p><strong>Category:</strong> {service?.category?.replace('_', ' ')}</p>
                <p><strong>Location:</strong> {service?.location?.name}, {service?.location?.city}</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Time Slot:</strong> {timeSlot}</p>
                <p><strong>Guests:</strong> {quantity}</p>
                <p><strong>Price per unit:</strong> ₹{service?.price} / {service?.pricingUnit?.replace('per_', '')}</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}><strong>Total Amount:</strong> ₹{totalAmount}</p>
                {notes && <p><strong>Notes:</strong> {notes}</p>}
              </div>
              {error && <p style={{ color: '#ef4444', marginTop: '0.75rem' }}>{error}</p>}
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" onClick={handleConfirm} disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && booking && (
            <div className="step-content animate-fade-in text-center">
              <div className="success-icon">✅</div>
              <h3>Booking Submitted!</h3>
              <p>Your booking request for <strong>{service?.title}</strong> on <strong>{date}</strong> has been submitted.</p>
              <p style={{ marginTop: '0.5rem', color: '#64748b' }}>Booking ID: <strong>{booking._id}</strong></p>
              <p style={{ color: '#64748b' }}>Status: <strong>{booking.bookingStatus}</strong> — The partner will confirm shortly.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '24px' }}>
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>View My Bookings</button>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Return Home</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
