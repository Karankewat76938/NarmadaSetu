import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBookingsApi } from '../services/bookings.api';
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
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const result = await getBookingsApi({ limit: 50 });
      setBookings(result.data?.bookings || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page container">
      <div className="dashboard-grid">
        <div className="dashboard-main-col">
          <WelcomeBanner name={user?.name || 'Explorer'} />
          <DashboardMetrics bookings={bookings} />
          <div className="dashboard-section">
            <UpcomingBookings bookings={bookings} loading={loading} />
          </div>
          <div className="dashboard-section">
            <FavoriteServices />
          </div>
        </div>
        <div className="dashboard-sidebar-col">
          <ProfileOverview name={user?.name || ''} email={user?.email || ''} phone={user?.phone || ''} />
          <div className="sidebar-spacer"></div>
          <NotificationsPanel />
          <div className="sidebar-spacer"></div>
          <PastBookingsSummary bookings={bookings} />
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;
