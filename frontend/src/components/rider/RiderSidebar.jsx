import React from 'react';
import { Home, Calendar, IndianRupee, ShieldAlert, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RiderSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'bookings', label: 'My Rides', icon: Calendar },
    { id: 'earnings', label: 'Earnings', icon: IndianRupee },
    { id: 'safety', label: 'Safety Alerts', icon: ShieldAlert }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
        <h2>Narmada Setu</h2>
        <span className="brand-badge" style={{ background: '#0ea5e9' }}>RIDER</span>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-btn">
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button className="nav-btn text-red" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default RiderSidebar;
