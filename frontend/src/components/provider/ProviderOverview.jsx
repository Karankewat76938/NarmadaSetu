import React, { useState } from 'react';
import { Power, Wallet, CalendarClock, TrendingUp } from 'lucide-react';

const ProviderOverview = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div>
      <div className="dark-panel" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isAvailable ? 'rgba(16, 185, 129, 0.05)' : 'rgba(239, 68, 68, 0.05)' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              width: '12px', height: '12px', borderRadius: '50%', 
              background: isAvailable ? 'var(--accent-primary)' : 'var(--accent-danger)' 
            }}></span>
            Current Status: {isAvailable ? 'Taking Bookings' : 'Unavailable'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isAvailable ? "You are visible to tourists on the marketplace." : "Your listings are temporarily hidden from tourists."}
          </p>
        </div>
        
        <button 
          onClick={() => setIsAvailable(!isAvailable)}
          style={{
            background: isAvailable ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            color: isAvailable ? 'var(--accent-danger)' : 'var(--accent-primary)',
            border: `1px solid ${isAvailable ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <Power size={20} />
          {isAvailable ? 'Go Offline' : 'Go Online'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div className="dark-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-warning)' }}>
            <Wallet size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Today's Earnings</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹2,400</p>
          </div>
        </div>

        <div className="dark-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)' }}>
            <CalendarClock size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Upcoming Today</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>4 Trips</p>
          </div>
        </div>

        <div className="dark-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Profile Views</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>142</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderOverview;
