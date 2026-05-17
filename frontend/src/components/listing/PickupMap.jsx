import React from 'react';
import { MapPin } from 'lucide-react';
import './PickupMap.css';

const PickupMap = ({ location }) => {
  return (
    <div className="pickup-map-section">
      <h3 className="section-heading">Where you'll meet</h3>
      <p className="pickup-location"><MapPin size={16} /> {location}</p>
      
      <div className="map-embed-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14669.754407986795!2d79.7907572!3d23.1328905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981b1e626e27393%3A0xc0fb13a525f0e9e1!2sBhedaghat%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{border:0}} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Pickup Location Map"
        ></iframe>
      </div>
      
      <p className="map-instructions">
        Exact meeting point coordinates and contact details will be shared upon booking confirmation.
      </p>
    </div>
  );
};

export default PickupMap;
