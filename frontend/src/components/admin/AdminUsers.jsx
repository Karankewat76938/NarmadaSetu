import React, { useState, useEffect } from 'react';
import { UserX, UserCheck } from 'lucide-react';
import { getAdminUsersApi, updateUserStatusApi } from '../../services/admin.api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'tourist', 'partner'
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { limit: 50 };
      if (filter !== 'all') params.role = filter;
      if (searchTerm.trim()) params.search = searchTerm.trim();
      const res = await getAdminUsersApi(params);
      setUsers(res.data?.users || []);
    } catch (err) {
      console.error('Failed to fetch admin users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter, searchTerm]);

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'suspended' ? 'active' : 'suspended';
    setUpdatingId(id);
    try {
      await updateUserStatusApi(id, { accountStatus: nextStatus });
      await fetchUsers();
    } catch (err) {
      alert(err.message || 'Failed to update user status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'all', label: 'All Users' },
            { id: 'tourist', label: 'Tourists' },
            { id: 'partner', label: 'Partners' }
          ].map(f => (
            <button 
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                background: filter === f.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: '1px solid',
                borderColor: filter === f.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: filter === f.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        
        <div className="search-box" style={{ position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'rgba(0,0,0,0.2)',
              border: '1px solid var(--border-color)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              width: '260px'
            }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading users...</div>
      ) : (
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No users found matching query.
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} style={{ opacity: user.accountStatus === 'suspended' ? 0.6 : 1 }}>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{user._id.slice(-6).toUpperCase()}</td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{user.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                    </td>
                    <td>
                      <span style={{ 
                        background: user.role === 'partner' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(14, 165, 233, 0.1)',
                        color: user.role === 'partner' ? 'var(--accent-primary)' : '#38bdf8',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        textTransform: 'capitalize'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td>
                      <span style={{ 
                        color: user.accountStatus === 'active' ? 'var(--accent-primary)' : 'var(--accent-danger)',
                        fontWeight: 500,
                        fontSize: '0.85rem',
                        textTransform: 'capitalize'
                      }}>
                        {user.accountStatus || 'active'}
                      </span>
                    </td>
                    <td>
                      <button
                        disabled={updatingId === user._id}
                        onClick={() => handleToggleStatus(user._id, user.accountStatus)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: user.accountStatus === 'suspended' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          border: `1px solid ${user.accountStatus === 'suspended' ? 'var(--accent-primary)' : 'var(--accent-danger)'}`,
                          color: user.accountStatus === 'suspended' ? 'var(--accent-primary)' : 'var(--accent-danger)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        {user.accountStatus === 'suspended' ? (
                          <>
                            <UserCheck size={14} /> Activate
                          </>
                        ) : (
                          <>
                            <UserX size={14} /> Suspend
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
