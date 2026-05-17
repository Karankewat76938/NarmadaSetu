import React from 'react';
import { Sparkles } from 'lucide-react';
import './AartiBanner.css';

const AartiBanner = () => {
  return (
    <section className="aarti-section">
      <div className="aarti-container">
        <div className="aarti-content animate-scale-in">
          <div className="aarti-icon"><Sparkles size={40} /></div>
          <h2>Experience the Divine Narmada Aarti</h2>
          <p>Book an exclusive private boat to witness the mesmerizing evening Maha Aarti from the middle of the holy river. Avoid the crowds and immerse yourself in the spiritual chantings.</p>
          <div className="aarti-actions">
            <button className="btn btn-primary">Book Aarti Ride</button>
            <button className="btn btn-secondary" style={{color: 'white', borderColor: 'white'}}>View Gallery</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AartiBanner;
