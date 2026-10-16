import React, { useState, useEffect } from 'react';
import { AlertTriangle, Power, ExternalLink } from 'lucide-react';
import { getAdminServicesApi, updateServiceStatusApi } from '../../services/admin.api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getAdminServicesApi({ limit: 50 });
      setServices(res.data?.services || []);
    } catch (err) {
      console.error('Failed to fetch admin services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'inactive' ? 'active' : 'inactive';
    setUpdatingId(id);
    try {
      await updateServiceStatusApi(id, { status: nextStatus });
      await fetchServices();
    } catch (err) {
      alert(err.message || 'Failed to update service status');
    } finally {
      setUpdatingId(null);
    }
  };

  const activeCount = services.filter(s => s.status === 'active').length;
  const inactiveCount = services.filter(s => s.status === 'inactive').length;

  return (
    <div className="dark-panel">
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Service Moderation Queue</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Total Active: {activeCount}
          </span>
          {inactiveCount > 0 && (
            <span style={{ color: 'var(--accent-warning)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <AlertTriangle size={14} /> {inactiveCount} Inactive
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading services...</div>
      ) : (
        <div className="dark-table-container">
          <table className="dark-table">
            <thead>
              <tr>
                <th>Service Title</th>
                <th>Provider</th>
                <th>Price</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    No services found in queue.
                  </td>
                </tr>
              ) : (
                services.map(service => (
                  <tr key={service._id} style={{ opacity: service.status === 'inactive' ? 0.6 : 1 }}>
                    <td style={{ fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <a href={`/services/${service._id}`} target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none' }}>
                          {service.title}
                        </a>
                        <ExternalLink size={14} style={{ color: 'var(--text-secondary)' }} />
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'capitalize' }}>
                        {service.category?.replace('_', ' ')} • {service.location?.name}
                      </div>
                    </td>
                    <td>{service.provider?.name || 'Local Provider'}</td>
                    <td>₹{service.price} {service.pricingUnit ? `/${service.pricingUnit.replace('per_', '')}` : ''}</td>
                    <td>
                      <span style={{ 
                        color: service.status === 'active' ? 'var(--accent-primary)' : 'var(--accent-danger)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        textTransform: 'capitalize'
                      }}>
                        {service.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ 
                        color: service.verificationStatus === 'approved' ? 'var(--accent-primary)' : 'var(--accent-warning)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        textTransform: 'capitalize'
                      }}>
                        {service.verificationStatus || 'pending'}
                      </span>
                    </td>
                    <td>
                      <button
                        disabled={updatingId === service._id}
                        onClick={() => handleToggleStatus(service._id, service.status)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: service.status === 'active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                          border: `1px solid ${service.status === 'active' ? 'var(--accent-danger)' : 'var(--accent-primary)'}`,
                          color: service.status === 'active' ? 'var(--accent-danger)' : 'var(--accent-primary)',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        <Power size={14} />
                        {service.status === 'active' ? 'Disable' : 'Enable'}
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

export default AdminServices;
