import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import './ProfileOverview.css';
import { useAuth } from '../../context/AuthContext';

const ProfileOverview = ({ name = '', email = '', phone = '' }) => {
  const { logout } = useAuth();

  return (
    <div className="dashboard-section profile-overview">
      <div className="profile-header-actions">
        <button className="btn-icon-small"><Settings size={18} /></button>
      </div>
      
      <div className="profile-avatar-large">
        {(name || 'User').charAt(0).toUpperCase()}
      </div>
      
      <div className="profile-text-info">
        <h3>{name || 'User'}</h3>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      
      <button className="btn-edit-profile">Edit Profile</button>
      
      <div className="profile-logout">
        <button className="btn-logout" onClick={logout}><LogOut size={16} /> Logout</button>
      </div>
    </div>
  );
};

export default ProfileOverview;
