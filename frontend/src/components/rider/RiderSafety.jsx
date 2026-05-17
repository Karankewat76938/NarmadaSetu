import React from 'react';
import { ShieldAlert, AlertTriangle, CloudRain, Wind, Activity } from 'lucide-react';

const RiderSafety = () => {
  return (
    <div className="safety-container">
      {/* Current Alerts */}
      <div className="dashboard-card" style={{ marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(15, 23, 42, 0.6))' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ color: '#ef4444', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
            <AlertTriangle size={32} />
          </div>
          <div>
            <h3 style={{ color: '#f8fafc', marginBottom: '0.5rem', fontSize: '1.2rem' }}>High Current Warning - Omkareshwar</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1rem' }}>
              Water discharge from the Omkareshwar dam has increased. Boat operators in the downstream region are advised to maintain extreme caution and avoid the deep channel until further notice.
            </p>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Issued: 2 hours ago by Narmada River Authority</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Weather & Conditions */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Local Conditions</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Activity size={24} color="#0ea5e9" />
                <div>
                  <h4 style={{ color: '#f8fafc' }}>Water Level</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Bargi Dam Gauge</p>
                </div>
              </div>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Normal (418m)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <CloudRain size={24} color="#3b82f6" />
                <div>
                  <h4 style={{ color: '#f8fafc' }}>Precipitation</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Forecast</p>
                </div>
              </div>
              <span style={{ color: '#f8fafc' }}>10% Chance</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Wind size={24} color="#8b5cf6" />
                <div>
                  <h4 style={{ color: '#f8fafc' }}>Wind Speed</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Current</p>
                </div>
              </div>
              <span style={{ color: '#f8fafc' }}>12 km/h</span>
            </div>
          </div>
        </div>

        {/* Safety Checklist */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Pre-Ride Checklist</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {[
              "Life jackets for all passengers ready",
              "Boat engine & fuel checked",
              "Emergency oars & rope onboard",
              "First-aid kit available",
              "Weather update reviewed"
            ].map((item, idx) => (
              <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '20px', height: '20px', accentColor: '#10b981' }} />
                <span style={{ color: '#cbd5e1' }}>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <ShieldAlert size={24} />
          SOS / Emergency Assistance
        </button>
      </div>
    </div>
  );
};

export default RiderSafety;
