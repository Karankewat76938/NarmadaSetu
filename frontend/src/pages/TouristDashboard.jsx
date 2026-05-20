import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import DashboardMetrics from '../components/dashboard/DashboardMetrics';
import UpcomingBookings from '../components/dashboard/UpcomingBookings';
import FavoriteServices from '../components/dashboard/FavoriteServices';
import ProfileOverview from '../components/dashboard/ProfileOverview';
import NotificationsPanel from '../components/dashboard/NotificationsPanel';
import PastBookingsSummary from '../components/dashboard/PastBookingsSummary';
import './TouristDashboard.css';

const TouristDashboard = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayName = user ? user.name : 'Karan';
  const displayEmail = user ? user.email : 'karan.kevat@example.com';

  return (
    <div className="dashboard-page container">
      <div className="dashboard-grid">

        {/* Main Content Column */}
        <div className="dashboard-main-col">
          <WelcomeBanner name={displayName} />
          <DashboardMetrics />

          <div className="dashboard-section">
            <UpcomingBookings />
          </div>

          <div className="dashboard-section">
            <FavoriteServices />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="dashboard-sidebar-col">
          <ProfileOverview name={displayName} email={displayEmail} phone="+91 98765 43210" />
          <div className="sidebar-spacer"></div>
          <NotificationsPanel />
          <div className="sidebar-spacer"></div>
          <PastBookingsSummary />
        </div>

      </div>
    </div>
  );
};

export default TouristDashboard;
