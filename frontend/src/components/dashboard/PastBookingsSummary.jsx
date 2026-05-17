import React from 'react';
import { Star } from 'lucide-react';
import './PastBookingsSummary.css';

const PAST = [
  { id: 1, title: 'Maheshwar Ghat Guided Walk', date: 'Oct 10, 2026', needsReview: true },
  { id: 2, title: 'Narmada View Heritage Stay', date: 'Sep 25, 2026', needsReview: false }
];

const PastBookingsSummary = () => {
  return (
    <div className="dashboard-section past-summary">
      <div className="panel-header">
        <h3>Recent Past Bookings</h3>
      </div>
      
      <div className="past-list">
        {PAST.map(booking => (
          <div key={booking.id} className="past-item">
            <div className="past-info">
              <h4>{booking.title}</h4>
              <span>{booking.date}</span>
            </div>
            {booking.needsReview ? (
              <button className="btn-review">
                <Star size={14} /> Review
              </button>
            ) : (
              <button className="btn-book-again">Book again</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastBookingsSummary;
