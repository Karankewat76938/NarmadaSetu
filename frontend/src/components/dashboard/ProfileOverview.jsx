import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import './ProfileOverview.css';

const ProfileOverview = ({ name, email, phone }) => {
  return (
    <div className="dashboard-section profile-overview">
      <div className="profile-header-actions">
        <button className="btn-icon-small"><Settings size={18} /></button>
      </div>
      
      <div className="profile-avatar-large">
        {name.charAt(0)}
      </div>
      
      <div className="profile-text-info">
        <h3>{name}</h3>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      
      <button className="btn-edit-profile">Edit Profile</button>
      
      <div className="profile-logout">
        <button className="btn-logout"><LogOut size={16} /> Logout</button>
      </div>
    </div>
  );
};

export default ProfileOverview;
