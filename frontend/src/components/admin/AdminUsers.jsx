import React, { useState } from 'react';
import { MoreVertical, ShieldAlert, UserX, UserCheck } from 'lucide-react';

const MOCK_USERS = [
  { id: 'U-001', name: 'Ramesh Kewat', email: 'ramesh@example.com', role: 'Provider', status: 'Active', joined: 'Sep 12, 2026' },
  { id: 'U-002', name: 'Priya Sharma', email: 'priya@example.com', role: 'Tourist', status: 'Active', joined: 'Oct 05, 2026' },
  { id: 'U-003', name: 'Scammer123', email: 'fake@scam.com', role: 'Provider', status: 'Banned', joined: 'Oct 20, 2026' },
  { id: 'U-004', name: 'Rahul Dev', email: 'rahul@example.com', role: 'Tourist', status: 'Suspended', joined: 'Oct 22, 2026' }
];

const AdminUsers = () => {
  const [filter, setFilter] = useState('All');

  const filteredUsers = MOCK_USERS.filter(u => filter === 'All' || u.role === filter);

  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['All', 'Tourist', 'Provider'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: filter === f ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: '1px solid',
                borderColor: filter === f ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: filter === f ? 'var(--text-primary)' : 'var(--text-secondary)',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="search-box" style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-color)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              width: '250px'
            }}
          />
        </div>
      </div>

      <div className="dark-table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Details</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} style={{ opacity: user.status === 'Banned' ? 0.6 : 1 }}>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{user.id}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{user.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                </td>
                <td>
                  <span style={{ 
                    background: user.role === 'Provider' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(14, 165, 233, 0.1)',
                    color: user.role === 'Provider' ? 'var(--accent-primary)' : '#38bdf8',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{user.joined}</td>
                <td>
                  <span style={{ 
                    color: user.status === 'Active' ? 'var(--accent-primary)' : 
                           user.status === 'Banned' ? 'var(--accent-danger)' : 'var(--accent-warning)',
                    fontWeight: 500,
                    fontSize: '0.85rem'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {user.status === 'Active' ? (
                      <>
                        <button className="btn-icon" title="Suspend" style={{ background: 'transparent', border: 'none', color: 'var(--accent-warning)', cursor: 'pointer' }}>
                          <ShieldAlert size={18} />
                        </button>
                        <button className="btn-icon" title="Ban" style={{ background: 'transparent', border: 'none', color: 'var(--accent-danger)', cursor: 'pointer' }}>
                          <UserX size={18} />
                        </button>
                      </>
                    ) : (
                      <button className="btn-icon" title="Restore" style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer' }}>
                        <UserCheck size={18} />
                      </button>
                    )}
                    <button className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginLeft: '0.5rem' }}>
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
