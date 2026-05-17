import React from 'react';
import { Bell, Info, CheckCircle2 } from 'lucide-react';
import './NotificationsPanel.css';

const NotificationsPanel = () => {
  return (
    <div className="dashboard-section notifications-panel">
      <div className="panel-header">
        <h3>Notifications</h3>
        <span className="badge">2 New</span>
      </div>
      
      <div className="notification-list">
        <div className="notification-item unread">
          <div className="notif-icon bg-blue-light">
            <Info size={16} color="#0284c7" />
          </div>
          <div className="notif-content">
            <p><strong>Ramesh Kewat</strong> sent you a message regarding your upcoming trip.</p>
            <span className="notif-time">2 hours ago</span>
          </div>
        </div>
        
        <div className="notification-item unread">
          <div className="notif-icon bg-green-light">
            <CheckCircle2 size={16} color="#10b981" />
          </div>
          <div className="notif-content">
            <p>Your booking <strong>#BKG-7829</strong> has been confirmed.</p>
            <span className="notif-time">Yesterday</span>
          </div>
        </div>
        
        <div className="notification-item">
          <div className="notif-icon bg-gray-light">
            <Bell size={16} color="#64748b" />
          </div>
          <div className="notif-content">
            <p>Please leave a review for your past Homestay experience.</p>
            <span className="notif-time">Oct 12</span>
          </div>
        </div>
      </div>
      
      <button className="btn-view-all">View all notifications</button>
    </div>
  );
};

export default NotificationsPanel;
