import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';

const RiderBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = [
    { id: 'B-1029', tourist: 'Rahul Sharma', pax: 4, type: 'Marble Rocks Tour', time: '14:30 Today', location: 'Bhedaghat', status: 'confirmed', amount: 600 },
    { id: 'B-1034', tourist: 'Anita Desai', pax: 2, type: 'Sunset Ride', time: '17:45 Today', location: 'Bhedaghat', status: 'confirmed', amount: 400 },
    { id: 'B-1045', tourist: 'John Smith', pax: 1, type: 'Photography Tour', time: '06:00 Tomorrow', location: 'Bhedaghat', status: 'confirmed', amount: 800 }
  ];

  const pendingRequests = [
    { id: 'R-4011', tourist: 'Priya Patel', pax: 6, type: 'Group Ride', time: '16:00 Today', location: 'Bhedaghat', amount: 900 }
  ];

  return (
    <div className="bookings-container">
      <div className="tab-navigation" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={() => setActiveTab('upcoming')}
          style={{ 
            background: 'none', border: 'none', padding: '1rem 0', color: activeTab === 'upcoming' ? '#10b981' : '#94a3b8', 
            fontWeight: activeTab === 'upcoming' ? 'bold' : 'normal',
            borderBottom: activeTab === 'upcoming' ? '2px solid #10b981' : 'none',
            cursor: 'pointer'
          }}
        >
          Upcoming Rides
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          style={{ 
            background: 'none', border: 'none', padding: '1rem 0', color: activeTab === 'pending' ? '#10b981' : '#94a3b8', 
            fontWeight: activeTab === 'pending' ? 'bold' : 'normal',
            borderBottom: activeTab === 'pending' ? '2px solid #10b981' : 'none',
            cursor: 'pointer'
          }}
        >
          Pending Requests <span style={{ background: '#ef4444', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '50%', fontSize: '0.75rem', marginLeft: '0.5rem' }}>1</span>
        </button>
      </div>

      <div className="bookings-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {activeTab === 'upcoming' ? (
          upcomingBookings.map(booking => (
            <div key={booking.id} className="admin-list-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', color: '#10b981' }}>
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '0.25rem' }}>{booking.tourist} ({booking.pax} pax)</h4>
                  <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={14}/> {booking.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={14}/> {booking.location}</span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.25rem' }}>{booking.type}</p>
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>₹ {booking.amount}</span>
                <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                  Confirmed
                </span>
              </div>
            </div>
          ))
        ) : (
          pendingRequests.map(req => (
            <div key={req.id} className="admin-list-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#f8fafc', marginBottom: '0.25rem' }}>{req.tourist} ({req.pax} pax)</h4>
                  <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Clock size={14}/> {req.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={14}/> {req.location}</span>
                  </div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.25rem' }}>{req.type} • ₹ {req.amount}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#10b981', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                  <CheckCircle size={16} /> Accept
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
                  <XCircle size={16} /> Decline
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RiderBookings;
