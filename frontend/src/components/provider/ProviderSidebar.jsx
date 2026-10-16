import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MapPin, 
  TrendingUp, 
  Star,
  LogOut
} from 'lucide-react';

const ProviderSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'listings', label: 'My Listings', icon: MapPin },
    { id: 'analytics', label: 'Earnings', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <h2>Provider Hub</h2>
        <p>{user ? user.name : 'Ramesh Kewat'}</p>
      </div>
      
      <div className="admin-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="admin-nav-icon" />
              <span>{item.label}</span>
            </div>
          );
        })}

        <div className="admin-nav-item" onClick={handleLogout} style={{ color: 'var(--accent-danger)', marginTop: 'auto' }}>
          <LogOut className="admin-nav-icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProviderSidebar;
