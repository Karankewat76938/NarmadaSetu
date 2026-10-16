import React, { useState, useEffect } from 'react';
import RiderSidebar from '../components/rider/RiderSidebar';
import RiderOverview from '../components/rider/RiderOverview';
import RiderBookings from '../components/rider/RiderBookings';
import RiderEarnings from '../components/rider/RiderEarnings';
import RiderSafety from '../components/rider/RiderSafety';
import './AdminDashboard.css'; 

const RiderDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <RiderOverview />;
      case 'bookings': return <RiderBookings />;
      case 'earnings': return <RiderEarnings />;
      case 'safety': return <RiderSafety />;
      default: return <RiderOverview />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return { title: 'Rider Dashboard', desc: 'Welcome back! Here is your daily summary on the river.' };
      case 'bookings': return { title: 'My Rides', desc: 'Manage your upcoming trips and pending boat requests.' };
      case 'earnings': return { title: 'Earnings', desc: 'Track your daily income and payouts.' };
      case 'safety': return { title: 'Safety Alerts', desc: 'River conditions, weather warnings, and safety guidelines.' };
      default: return { title: 'Dashboard', desc: '' };
    }
  };

  const headerInfo = getTitle();

  return (
    <div className="admin-dark-theme">
      <RiderSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="admin-content-area">
        <div className="admin-header">
          <div>
            <h1>{headerInfo.title}</h1>
            <p>{headerInfo.desc}</p>
          </div>
          {activeTab === 'overview' && (
            <div className="online-status-toggle">
              <span style={{color: '#94a3b8', marginRight: '1rem'}}>Status:</span>
              <button className="status-btn active" style={{
                background: '#059669', border: 'none', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontWeight: 'bold'
              }}>
                Available for Rides
              </button>
            </div>
          )}
        </div>

        <div className="admin-main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
