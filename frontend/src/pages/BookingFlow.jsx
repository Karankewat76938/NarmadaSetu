import React, { useState } from 'react';
import './BookingFlow.css';

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="booking-page container">
      <div className="booking-container glass">
        <div className="booking-header">
          <h2>Complete Your Booking</h2>
          <div className="step-indicator">Step {step} of 3</div>
        </div>

        <div className="booking-body">
          {step === 1 && (
            <div className="step-content animate-fade-in">
              <h3>Select Details</h3>
              <div className="form-group">
                <label className="form-label">Select Date</label>
                <input 
                  type="date" 
                  className="form-input" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Number of Guests</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  className="form-input"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleNext} disabled={!date}>
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-fade-in">
              <h3>Review Booking</h3>
              <div className="review-details">
                <p><strong>Service:</strong> Sunset Boat Ride</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Guests:</strong> {guests}</p>
                <p><strong>Total Amount:</strong> ₹{500 * guests}</p>
              </div>
              <div className="step-actions">
                <button className="btn btn-secondary" onClick={handleBack}>Back</button>
                <button className="btn btn-primary" onClick={handleNext}>Confirm & Pay</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content animate-fade-in text-center">
              <div className="success-icon">✅</div>
              <h3>Booking Confirmed!</h3>
              <p>Your reservation for {date} has been confirmed. You will receive an email shortly.</p>
              <button className="btn btn-primary" style={{marginTop: '24px'}} onClick={() => window.location.href = '/'}>
                Return Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
