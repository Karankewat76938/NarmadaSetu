import React from 'react';
import { Anchor, IndianRupee, MapPin, Users, Star } from 'lucide-react';

const RiderOverview = () => {
  return (
    <div className="overview-container">
      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}>
            <Anchor size={24} />
          </div>
          <div className="stat-info">
            <p>Today's Rides</p>
            <h3>4 / 8</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <p>Today's Earnings</p>
            <h3>₹ 1,850</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <Star size={24} />
          </div>
          <div className="stat-info">
            <p>Your Rating</p>
            <h3>4.9 <span style={{fontSize: '0.9rem', color: '#64748b'}}>(142 reviews)</span></h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <p>Tourists Guided</p>
            <h3>1,024</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Next Trip */}
        <div className="dashboard-card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3>Up Next</h3>
          </div>
          <div className="next-trip-card" style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.4), rgba(4, 120, 87, 0.2))',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginTop: '1rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#f8fafc' }}>Family Boat Ride (4 pax)</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={16} color="#10b981" /> Bhedaghat Marble Rocks
                  </span>
                  <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                    In 15 mins
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Earnings</p>
                <h3 style={{ color: '#10b981', fontSize: '1.4rem' }}>₹ 600</h3>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{ flex: 1, background: '#10b981', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Start Trip
              </button>
              <button style={{ flex: 1, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer' }}>
                Call Tourist
              </button>
            </div>
          </div>
        </div>

        {/* River Conditions Mini Widget */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>River Status</h3>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#94a3b8' }}>Water Level</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Normal</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ color: '#94a3b8' }}>Flow Speed</span>
              <span style={{ color: '#f8fafc' }}>Moderate</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}>
              <span style={{ color: '#94a3b8' }}>Weather</span>
              <span style={{ color: '#f8fafc' }}>Clear, 28°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderOverview;
