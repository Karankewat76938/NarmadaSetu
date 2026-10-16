import React, { useState } from 'react';
import { Star, Calendar as CalendarIcon, Users, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './BookingCard.css';

const BookingCard = ({ listing }) => {
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleBook = () => {
    // Navigate to actual checkout/booking flow page
    navigate('/book', { state: { listing, date, guests } });
  };

  return (
    <div className="booking-card-wrapper glass">
      <div className="booking-card-header">
        <div className="booking-price">
          <span className="price-amount">₹{listing.price}</span>
          <span className="price-label">/ boat</span>
        </div>
        <div className="booking-rating">
          <Star size={16} fill="var(--dark)" color="var(--dark)" />
          <span className="rating-val">{listing.rating}</span>
          <span className="rating-count">({listing.reviewsCount} reviews)</span>
        </div>
      </div>

      <div className="booking-availability">
        <CheckCircle2 size={16} color="var(--primary)" />
        <span>Live Availability: High</span>
      </div>

      <div className="booking-form-box">
        <div className="form-input-group">
          <div className="input-cell half border-right border-bottom">
            <label>DATE</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="input-cell half border-bottom">
            <label>TIME</label>
            <select>
              <option>06:00 AM (Sunrise)</option>
              <option>09:00 AM</option>
              <option>04:00 PM</option>
              <option>06:30 PM (Aarti)</option>
            </select>
          </div>
          <div className="input-cell full">
            <label>GUESTS</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button 
          className="btn btn-primary btn-reserve" 
          onClick={handleBook}
          disabled={!date}
        >
          Reserve Now
        </button>
        <p className="no-charge-text">You won't be charged yet</p>
      </div>

      <div className="booking-pricing-breakdown">
        <div className="price-row">
          <span>₹{listing.price} x 1 boat</span>
          <span>₹{listing.price}</span>
        </div>
        <div className="price-row">
          <span>Narmada Setu service fee</span>
          <span>₹50</span>
        </div>
        <div className="price-row">
          <span>Local Community Fund</span>
          <span>₹20</span>
        </div>
        <div className="price-divider"></div>
        <div className="price-row total">
          <span>Total before taxes</span>
          <span>₹{listing.price + 70}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
