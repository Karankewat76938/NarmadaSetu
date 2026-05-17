import React from 'react';
import { AlertTriangle, Trash2, ExternalLink } from 'lucide-react';

const MOCK_SERVICES = [
  { id: 'S-201', title: 'Sunset Photography Tour', provider: 'Anil Kumar', status: 'Flagged', reports: 3, price: '₹1200' },
  { id: 'S-202', title: 'Luxury Private Boat Darshan', provider: 'Deepak Nishad', status: 'Active', reports: 0, price: '₹2500' },
  { id: 'S-203', title: 'Cheap Boat Ride (Scam)', provider: 'Unknown', status: 'Flagged', reports: 12, price: '₹50' },
];

const AdminServices = () => {
  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Service Moderation Queue</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Active: 142</span>
          <span style={{ color: 'var(--accent-danger)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <AlertTriangle size={14} /> 2 Flagged
          </span>
        </div>
      </div>

      <div className="dark-table-container">
        <table className="dark-table">
          <thead>
            <tr>
              <th>Service Title</th>
              <th>Provider</th>
              <th>Price</th>
              <th>Status</th>
              <th>User Reports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_SERVICES.map(service => (
              <tr key={service.id} style={{ backgroundColor: service.reports > 5 ? 'rgba(239, 68, 68, 0.05)' : 'transparent' }}>
                <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {service.title} 
                  <ExternalLink size={14} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
                </td>
                <td>{service.provider}</td>
                <td>{service.price}</td>
                <td>
                  <span style={{ 
                    color: service.status === 'Active' ? 'var(--accent-primary)' : 'var(--accent-danger)',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {service.status}
                  </span>
                </td>
                <td>
                  {service.reports > 0 ? (
                    <span style={{ color: service.reports > 5 ? 'var(--accent-danger)' : 'var(--accent-warning)', fontWeight: 600 }}>
                      {service.reports} Reports
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>Clean</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {service.status === 'Flagged' && (
                      <button className="btn-dark-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.75rem' }}>
                        <Trash2 size={16} /> Remove Listing
                      </button>
                    )}
                    {service.status === 'Active' && (
                      <button style={{ 
                        background: 'transparent', 
                        border: '1px solid var(--border-color)', 
                        color: 'var(--text-secondary)',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}>
                        Suspend
                      </button>
                    )}
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

export default AdminServices;
