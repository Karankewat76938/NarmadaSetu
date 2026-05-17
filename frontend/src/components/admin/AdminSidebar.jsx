import React from 'react';
import { 
  BarChart3, 
  ShieldCheck, 
  AlertTriangle, 
  CreditCard, 
  Users, 
  FileText 
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'partners', label: 'Partner Verification', icon: ShieldCheck },
    { id: 'services', label: 'Service Moderation', icon: AlertTriangle },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="admin-sidebar">
      <div className="admin-brand">
        <h2>Setu Admin</h2>
        <p>Control Center</p>
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

export default AdminSidebar;
