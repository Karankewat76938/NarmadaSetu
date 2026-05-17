import React from 'react';
import { CheckCircle2, XCircle, FileBadge } from 'lucide-react';

const MOCK_PARTNERS = [
  { id: 'P-1001', name: 'Ramesh Kewat', type: 'Boat Rider', status: 'Pending', doc: 'Aadhar & License' },
  { id: 'P-1002', name: 'Suresh Tiwari', type: 'Guide', status: 'Pending', doc: 'Guide Certification' },
  { id: 'P-1003', name: 'Mama Kitchen', type: 'Food Vendor', status: 'Verified', doc: 'FSSAI License' }
];

const AdminPartners = () => {
  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Partner Verification Queue</h2>
        <span style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--accent-warning)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem' }}>
          2 Pending
        </span>
      </div>

      <div className="dark-table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>Partner ID</th>
              <th>Name</th>
              <th>Service Type</th>
              <th>Documents</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PARTNERS.map(partner => (
              <tr key={partner.id}>
                <td style={{ color: 'var(--text-secondary)' }}>{partner.id}</td>
                <td style={{ fontWeight: 500 }}>{partner.name}</td>
                <td>{partner.type}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#3b82f6', cursor: 'pointer' }}>
                    <FileBadge size={16} /> View Docs
                  </div>
                </td>
                <td>
                  <span style={{ 
                    color: partner.status === 'Verified' ? 'var(--accent-primary)' : 'var(--accent-warning)',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {partner.status}
                  </span>
                </td>
                <td>
                  {partner.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-dark-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem' }}>
                        <CheckCircle2 size={16} /> Approve
                      </button>
                      <button className="btn-dark-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem' }}>
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>No actions required</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPartners;
