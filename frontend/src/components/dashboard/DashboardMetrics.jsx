import React from 'react';
import { Calendar, CheckCircle, Star } from 'lucide-react';
import './DashboardMetrics.css';

const DashboardMetrics = () => {
  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-icon-wrapper bg-blue">
          <Calendar size={20} color="#0284c7" />
        </div>
        <div className="metric-info">
          <h3>2</h3>
          <p>Upcoming Trips</p>
        </div>
      </div>
      
      <div className="metric-card">
        <div className="metric-icon-wrapper bg-green">
          <CheckCircle size={20} color="#047857" />
        </div>
        <div className="metric-info">
          <h3>14</h3>
          <p>Past Bookings</p>
        </div>
      </div>
      
      <div className="metric-card">
        <div className="metric-icon-wrapper bg-yellow">
          <Star size={20} color="#d97706" />
        </div>
        <div className="metric-info">
          <h3>8</h3>
          <p>Reviews Given</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
