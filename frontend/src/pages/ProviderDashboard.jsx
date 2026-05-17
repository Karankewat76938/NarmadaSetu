import React, { useState, useEffect } from 'react';
import ProviderSidebar from '../components/provider/ProviderSidebar';
import ProviderOverview from '../components/provider/ProviderOverview';
import ProviderBookings from '../components/provider/ProviderBookings';
import ProviderListings from '../components/provider/ProviderListings';
import ProviderAnalytics from '../components/provider/ProviderAnalytics';
import ProviderReviews from '../components/provider/ProviderReviews';
import './AdminDashboard.css'; // Reusing the dark admin layout styles

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <ProviderOverview />;
      case 'bookings': return <ProviderBookings />;
      case 'listings': return <ProviderListings />;
      case 'analytics': return <ProviderAnalytics />;
      case 'reviews': return <ProviderReviews />;
      default: return <ProviderOverview />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'overview': return { title: 'Dashboard Overview', desc: 'Welcome back! Here is what is happening today.' };
      case 'bookings': return { title: 'Booking Requests', desc: 'Manage your upcoming trips and pending requests.' };
      case 'listings': return { title: 'My Services', desc: 'Manage your active listings and add new services.' };
      case 'analytics': return { title: 'Earnings Analytics', desc: 'Track your income and business growth.' };
      case 'reviews': return { title: 'Customer Feedback', desc: 'See what tourists are saying about your services.' };
      default: return { title: 'Dashboard', desc: '' };
    }
  };

  const headerInfo = getTitle();

  return (
    <div className="admin-dark-theme">
      <ProviderSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="admin-content-area">
        <div className="admin-header">
          <div>
            <h1>{headerInfo.title}</h1>
            <p>{headerInfo.desc}</p>
          </div>
        </div>

        <div className="admin-main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
