import React from 'react';
import { MapPin, Users, Ship, Clock } from 'lucide-react';
import './MainInfo.css';

const MainInfo = ({ listing }) => {
  return (
    <div className="main-info-section">
      <div className="title-row">
        <h2>Hosted by {listing.rider.name}</h2>
        <img src={listing.rider.avatar} alt={listing.rider.name} className="host-avatar-small" />
      </div>
      
      <div className="features-list">
        <div className="feature-item">
          <Users className="feature-icon" size={24} />
          <div className="feature-text">
            <h4>Capacity</h4>
            <p>{listing.capacity}</p>
          </div>
        </div>
        <div className="feature-item">
          <Ship className="feature-icon" size={24} />
          <div className="feature-text">
            <h4>Boat Type</h4>
            <p>{listing.boatType}</p>
          </div>
        </div>
        <div className="feature-item">
          <Clock className="feature-icon" size={24} />
          <div className="feature-text">
            <h4>Duration</h4>
            <p>{listing.duration}</p>
          </div>
        </div>
      </div>
      
      <div className="description-section">
        <h3>About this experience</h3>
        <p className="description-text">
          Join me for a peaceful and spiritual journey along the holy Narmada river. 
          We will navigate through the stunning marble rocks of Bhedaghat, witnessing 
          nature's magnificent carvings that change color with the sunlight. 
          <br /><br />
          This is a private ride ensuring a serene atmosphere. Perfect for photography, 
          meditation, or simply soaking in the divine energy of the river. Life jackets 
          are provided for all guests.
        </p>
      </div>
    </div>
  );
};

export default MainInfo;
