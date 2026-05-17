import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MapPin, 
  TrendingUp, 
  Star 
} from 'lucide-react';

const ProviderSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'listings', label: 'My Listings', icon: MapPin },
    { id: 'analytics', label: 'Earnings', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-brand">
        <h2>Provider Hub</h2>
        <p>Ramesh Kewat</p>
      </div>
      
      <div className="admin-nav">
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
      </div>
    </div>
  );
};

export default ProviderSidebar;
