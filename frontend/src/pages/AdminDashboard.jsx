import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminAnalytics from '../components/admin/AdminAnalytics';
import AdminPartners from '../components/admin/AdminPartners';
import AdminServices from '../components/admin/AdminServices';
import AdminPayments from '../components/admin/AdminPayments';
import AdminUsers from '../components/admin/AdminUsers';
import AdminReports from '../components/admin/AdminReports';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics': return <AdminAnalytics />;
      case 'partners': return <AdminPartners />;
      case 'services': return <AdminServices />;
      case 'payments': return <AdminPayments />;
      case 'users': return <AdminUsers />;
      case 'reports': return <AdminReports />;
      default: return <AdminAnalytics />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'analytics': return { title: 'Platform Analytics', desc: 'Overview of Narmada Setu performance metrics.' };
      case 'partners': return { title: 'Partner Verification', desc: 'Approve riders and verify Kewat community partners.' };
      case 'services': return { title: 'Service Moderation', desc: 'Review listings and remove fake or inappropriate services.' };
      case 'payments': return { title: 'Payment Monitoring', desc: 'Track transactions, platform fees, and provider payouts.' };
      case 'users': return { title: 'User Management', desc: 'Manage tourists, providers, and their account statuses.' };
      case 'reports': return { title: 'Reports & Exports', desc: 'Generate and download detailed platform reports.' };
      default: return { title: 'Dashboard', desc: '' };
    }
  };

  const headerInfo = getTitle();

  return (
    <div className="admin-dark-theme">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
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

export default AdminDashboard;
