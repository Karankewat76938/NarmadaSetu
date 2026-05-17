import React, { useEffect, useState } from 'react';
import { ShieldAlert, MapPin, Navigation, BadgeCheck, PhoneCall, AlertTriangle, LifeBuoy, Info } from 'lucide-react';
import './SafetyDashboard.css';

const SafetyDashboard = () => {
  const [sosActive, setSosActive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSosClick = () => {
    // In a real app, this would trigger an actual emergency flow
    setSosActive(true);
    setTimeout(() => {
      alert("EMERGENCY SIGNAL SENT. Local authorities and your trusted contacts have been notified with your live location.");
      setSosActive(false);
    }, 1000);
  };

  return (
    <div className="safety-page">
      <div className="safety-container">
        
        <div className="safety-header">
          <h1><ShieldAlert color="#0f172a" /> Safety Center</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>You are currently on an active trip.</p>
        </div>

        {/* SOS SECTION */}
        <div className="safety-card sos-section">
          <button 
            className="sos-button" 
            onClick={handleSosClick}
            style={{ transform: sosActive ? 'scale(0.95)' : 'scale(1)' }}
          >
            SOS
          </button>
          <p className="sos-instruction">Tap in case of emergency</p>
        </div>

        {/* LIVE TRACKING */}
        <div className="safety-card">
          <div className="tracking-header">
            <h2 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Navigation size={18} /> Live Tracking
            </h2>
            <div className="tracking-status">
              <span className="tracking-dot"></span> Active
            </div>
          </div>
          
          <div className="mock-map">
            <MapPin size={20} style={{ marginRight: '0.5rem' }} /> GPS Signal Acquired. Map View Active.
          </div>
          
          <div className="trip-details">
            <div>
              <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Destination</span>
              <strong>Bhedaghat Marble Rocks</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>ETA</span>
              <strong>14 Mins</strong>
            </div>
          </div>
        </div>

        {/* RIDER VERIFICATION */}
        <div className="safety-card">
          <h2 style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.5px' }}>
            Assigned Provider
          </h2>
          <div className="rider-verification">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80" alt="Rider" className="rider-avatar" />
            <div className="rider-info">
              <h3>Ramesh Kewat <BadgeCheck size={16} color="#10b981" /></h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>Boat: MP-20-NB-4592</p>
              <div style={{ marginTop: '0.35rem' }}><span className="badge-verified">Verified Partner</span></div>
            </div>
          </div>
        </div>

        {/* EMERGENCY CONTACTS */}
        <div className="contact-grid">
          <button className="btn-contact police">
            <AlertTriangle size={24} />
            Police (100)
          </button>
          <button className="btn-contact">
            <LifeBuoy size={24} color="#3b82f6" />
            River Rescue
          </button>
          <button className="btn-contact" style={{ gridColumn: 'span 2', flexDirection: 'row' }}>
            <PhoneCall size={18} /> Call Trusted Contact (Brother)
          </button>
        </div>

        {/* SAFETY TIPS */}
        <div className="safety-card safety-tips">
          <h2 style={{ fontSize: '1rem', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={18} color="#0f172a" /> Quick Safety Rules
          </h2>
          <ul>
            <li>
              <span className="tip-icon">•</span>
              Always keep your life jacket securely fastened while the boat is in motion.
            </li>
            <li>
              <span className="tip-icon">•</span>
              Remain seated. Do not stand up abruptly or lean heavily over the edges.
            </li>
            <li>
              <span className="tip-icon">•</span>
              Share your live trip status with family using the 'Share Trip' button in the main app.
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default SafetyDashboard;
