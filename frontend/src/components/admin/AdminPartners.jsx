import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, FileBadge } from 'lucide-react';
import { getPartnerApplicationsApi, updatePartnerApplicationStatusApi } from '../../services/admin.api';

const AdminPartners = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await getPartnerApplicationsApi({ limit: 50 });
      setApplications(res.data?.applications || []);
    } catch (err) {
      console.error('Failed to fetch partner applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await updatePartnerApplicationStatusApi(id, { applicationStatus: status });
      await fetchApplications();
    } catch (err) {
      alert(err.message || 'Failed to update partner application');
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = applications.filter(a => a.applicationStatus === 'pending').length;

  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Partner Verification Queue</h2>
        <span style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--accent-warning)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
          {pendingCount} Pending
        </span>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading partner applications...</div>
      ) : (
        <div className="dark-table-container">
          <table className="dark-table">
            <thead>
              <tr>
                <th>Partner ID</th>
                <th>Name / Business</th>
                <th>Service Type</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No applications in the queue.
                  </td>
                </tr>
              ) : (
                applications.map(app => (
                  <tr key={app._id}>
                    <td style={{ color: 'var(--text-secondary)' }}>{app._id.slice(-6).toUpperCase()}</td>
                    <td style={{ fontWeight: 500 }}>
                      <div>{app.businessName || app.user?.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Host: {app.user?.name}</div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{app.serviceCategory?.replace('_', ' ')}</td>
                    <td>
                      <div>{app.contactDetails?.phone || app.user?.phone}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{app.contactDetails?.address}</div>
                    </td>
                    <td>
                      <span style={{ 
                        color: app.applicationStatus === 'approved' ? 'var(--accent-primary)' : 
                               app.applicationStatus === 'pending' ? 'var(--accent-warning)' : 'var(--accent-danger)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        textTransform: 'capitalize'
                      }}>
                        {app.applicationStatus}
                      </span>
                    </td>
                    <td>
                      {app.applicationStatus === 'pending' ? (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="btn-dark-primary"
                            disabled={updatingId === app._id}
                            onClick={() => handleUpdateStatus(app._id, 'approved')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem' }}
                          >
                            <CheckCircle2 size={16} /> Approve
                          </button>
                          <button
                            className="btn-dark-danger"
                            disabled={updatingId === app._id}
                            onClick={() => handleUpdateStatus(app._id, 'rejected')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem' }}
                          >
                            <XCircle size={16} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                          {app.applicationStatus === 'approved' ? 'Verified' : 'Rejected'}
                        </span>
                      )}
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

export default AdminPartners;
