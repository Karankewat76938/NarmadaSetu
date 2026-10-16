import React from 'react';
import { LifeBuoy, ShieldAlert, PhoneCall } from 'lucide-react';
import './SafetySOSIndicator.css';

const SafetySOSIndicator = () => {
  return (
    <div className="safety-section">
      <div className="safety-header">
        <LifeBuoy className="safety-icon" size={28} />
        <h3>Narmada Safety Promise</h3>
      </div>
      
      <div className="safety-features">
        <div className="safety-feature">
          <h4>Life Jackets Provided</h4>
          <p>Every passenger is equipped with a certified life jacket before boarding.</p>
        </div>
        <div className="safety-feature">
          <h4>Trained Crew</h4>
          <p>Your host has completed advanced water rescue and CPR training.</p>
        </div>
      </div>

      <div className="sos-card glass-dark">
        <div className="sos-info">
          <ShieldAlert size={24} color="#ef4444" />
          <div>
            <h4>Emergency SOS Ready</h4>
            <p>Our boats are equipped with GPS tracking and direct SOS connection to local river police.</p>
          </div>
        </div>
        <button className="btn btn-primary btn-sos">
          <PhoneCall size={16} style={{marginRight: '8px'}} /> 
          Dial River Police
        </button>
      </div>
    </div>
  );
};

export default SafetySOSIndicator;
