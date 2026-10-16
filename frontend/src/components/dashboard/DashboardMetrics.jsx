import React from 'react';
import { Calendar, CheckCircle, Star } from 'lucide-react';
import './DashboardMetrics.css';

const DashboardMetrics = ({ bookings = [] }) => {
  const upcoming = bookings.filter(b => ['pending', 'confirmed'].includes(b.bookingStatus)).length;
  const past = bookings.filter(b => b.bookingStatus === 'completed').length;
  const reviewed = bookings.filter(b => b.hasReview).length;

  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-icon-wrapper bg-blue">
          <Calendar size={20} color="#0284c7" />
        </div>
        <div className="metric-info">
          <h3>{upcoming}</h3>
          <p>Upcoming Trips</p>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon-wrapper bg-green">
          <CheckCircle size={20} color="#047857" />
        </div>
        <div className="metric-info">
          <h3>{past}</h3>
          <p>Past Bookings</p>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon-wrapper bg-yellow">
          <Star size={20} color="#d97706" />
        </div>
        <div className="metric-info">
          <h3>{reviewed}</h3>
          <p>Reviews Given</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
