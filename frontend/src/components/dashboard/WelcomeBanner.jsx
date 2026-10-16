import React from 'react';
import { Sun } from 'lucide-react';
import './WelcomeBanner.css';

const WelcomeBanner = ({ name }) => {
  // Simple greeting logic
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';

  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <div className="greeting-row">
          <Sun className="greeting-icon" size={24} />
          <span>{greeting}, {name}!</span>
        </div>
        <h2>Ready for your next spiritual journey?</h2>
        <p>You have 1 upcoming trip this week. Make sure to check your meeting point details.</p>
      </div>
      <div className="banner-decoration"></div>
    </div>
  );
};

export default WelcomeBanner;
