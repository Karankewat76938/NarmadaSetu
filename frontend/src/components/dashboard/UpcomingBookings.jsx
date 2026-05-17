import React from 'react';
import { MapPin, CalendarClock, MoreHorizontal } from 'lucide-react';
import './UpcomingBookings.css';
import { maheshwarghat } from '../../assets/Images';

const UPCOMING = [
  {
    id: 'BKG-7829',
    title: 'Sunrise Marble Rocks Tour',
    date: 'Oct 24, 2026',
    time: '06:00 AM',
    location: 'Ghat No. 4, Bhedaghat',
    host: 'Ramesh Kewat',
    image: maheshwarghat,
    status: 'Confirmed'
  }
];

const UpcomingBookings = () => {
  return (
    <div className="upcoming-section">
      <div className="section-header">
        <h2>Upcoming Trips</h2>
        <a href="#" className="view-all-link">View all</a>
      </div>

      <div className="upcoming-list">
        {UPCOMING.map(booking => (
          <div key={booking.id} className="booking-list-card">
            <img src={booking.image} alt={booking.title} className="booking-thumb" />
            
            <div className="booking-info-main">
              <div className="b-header">
                <h3>{booking.title}</h3>
                <span className="status-badge confirmed">{booking.status}</span>
              </div>
              
              <div className="b-details">
                <span className="detail-item"><CalendarClock size={14} /> {booking.date} at {booking.time}</span>
                <span className="detail-item"><MapPin size={14} /> {booking.location}</span>
              </div>
              
              <p className="b-host">Hosted by {booking.host} • ID: {booking.id}</p>
            </div>
            
            <div className="booking-actions">
              <button className="btn btn-primary btn-sm">View Ticket</button>
              <button className="btn-icon"><MoreHorizontal size={20} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
