import React from 'react';
import { ShieldCheck, Star, Award, GraduationCap } from 'lucide-react';
import './RiderProfile.css';

const RiderProfile = ({ rider }) => {
  return (
    <div className="rider-profile-section">
      <div className="rider-header">
        <img src={rider.avatar} alt={rider.name} className="rider-avatar-large" />
        <div className="rider-header-info">
          <h3>Meet your Host, {rider.name}</h3>
          <p className="rider-joined">Joined in {rider.joined}</p>
        </div>
      </div>
      
      <div className="rider-stats-grid">
        <div className="rider-stat">
          <Star className="stat-icon" size={20} />
          <span>256 Reviews</span>
        </div>
        <div className="rider-stat">
          <ShieldCheck className="stat-icon" size={20} />
          <span>Identity Verified</span>
        </div>
        <div className="rider-stat">
          <Award className="stat-icon" size={20} />
          <span>Superhost</span>
        </div>
        <div className="rider-stat">
          <GraduationCap className="stat-icon" size={20} />
          <span>{rider.experience}</span>
        </div>
      </div>

      <div className="rider-details">
        <div className="detail-block">
          <h4>About {rider.name.split(' ')[0]}</h4>
          <p>{rider.description}</p>
        </div>
        <div className="detail-block">
          <h4>Languages Spoken</h4>
          <p>{rider.languages.join(' • ')}</p>
        </div>
      </div>
      
      <button className="btn btn-secondary mt-4">Message Host</button>
    </div>
  );
};

export default RiderProfile;
