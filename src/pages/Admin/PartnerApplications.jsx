import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/admin.api';
import StatusBadge from '../../components/common/StatusBadge';

function PartnerApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getPartnerApplications({ status: statusFilter });
      if (res.success && res.data?.applications) {
        setApplications(res.data.applications);
      }
    } catch (err) {
      console.error('Failed to load partner applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    setActionLoading(true);
    setMessage('');
    setError('');

    try {
      const payload = {
        applicationStatus: newStatus,
        rejectionReason: newStatus === 'rejected' ? rejectionReason : ''
      };

      const res = await adminAPI.updatePartnerApplicationStatus(appId, payload);
      if (res.success) {
        setMessage(`Partner application successfully marked as ${newStatus}.`);
        setSelectedApp(null);
        setRejectionReason('');
        fetchApplications();
      }
    } catch (err) {
      setError(err.message || 'Failed to update partner application status.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Partner Verification Queue</h1>
        <p className="dashboard-subtitle">
          Verify provider credentials, ID proofs, and river operating permits (PRD Section 13 & 16).
        </p>
      </div>

      {message && (
        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          ✓ {message}
        </div>
      )}

      {error && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {['all', 'pending', 'approved', 'rejected'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
            style={{ textTransform: 'capitalize' }}
          >
            {st}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
          Loading verification applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
          <h3>No applications found</h3>
          <p style={{ color: 'var(--color-text-muted)', margin: '8px 0' }}>
            No partner applications match the status '{statusFilter}'.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant / Business</th>
                <th>Category</th>
                <th>Ghat / Location</th>
                <th>Experience</th>
                <th>ID / License</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <strong>{app.businessName}</strong>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                      Contact: {app.user?.name} (📞 {app.contactDetails?.phone || app.user?.phone})
                    </div>
                  </td>
                  <td><StatusBadge status={app.serviceCategory} type="category" /></td>
                  <td>{app.contactDetails?.ghatOrCity}</td>
                  <td>{app.experienceYears} Years</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    <div>{app.documents?.idProofType}: {app.documents?.idProofNumber || 'N/A'}</div>
                    {app.documents?.licenseNumber && (
                      <div style={{ color: 'var(--color-primary)' }}>Permit: {app.documents.licenseNumber}</div>
                    )}
                  </td>
                  <td><StatusBadge status={app.applicationStatus} type="partner" /></td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {app.applicationStatus !== 'approved' && (
                        <button
                          onClick={() => handleUpdateStatus(app._id, 'approved')}
                          className="btn btn-sm"
                          style={{ backgroundColor: '#16a34a', color: '#fff', padding: '4px 10px', fontSize: '0.78rem' }}
                          disabled={actionLoading}
                        >
                          ✓ Approve
                        </button>
                      )}
                      {app.applicationStatus !== 'rejected' && (
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="btn btn-sm btn-danger"
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          disabled={actionLoading}
                        >
                          ✕ Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reject Dialog Modal */}
      {selectedApp && (
        <div className="modal-backdrop" onClick={() => setSelectedApp(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reject Partner Application</h3>
              <button className="modal-close-btn" onClick={() => setSelectedApp(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '14px' }}>
                Please provide a feedback reason for rejecting <strong>{selectedApp.businessName}</strong>:
              </p>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="e.g. Incomplete boat safety license, unreadable ID proof..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedApp(null)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleUpdateStatus(selectedApp._id, 'rejected')}
                disabled={actionLoading}
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartnerApplications;

