import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/admin.api';
import StatusBadge from '../../components/common/StatusBadge';
import RatingStars from '../../components/common/RatingStars';

function ServiceModeration() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getServices({ limit: 50 });
      if (res.success && res.data?.services) {
        setServices(res.data.services);
      }
    } catch (err) {
      console.error('Failed to load services for moderation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (serviceId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      const res = await adminAPI.updateServiceStatus(serviceId, { status: newStatus });
      if (res.success) {
        setMessage(`Service status toggled to ${newStatus}.`);
        fetchServices();
      }
    } catch (err) {
      setError(err.message || 'Failed to update service moderation.');
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Marketplace Service Moderation</h1>
        <p className="dashboard-subtitle">
          Audit listings for safety compliance, verified pricing, and platform standards (PRD Section 16).
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
          Loading services for audit...
        </div>
      ) : services.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px' }}>
          <h3>No services in platform</h3>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Category</th>
                <th>Provider</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>
                    <strong>{s.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      📍 {s.location?.name}, {s.location?.city}
                    </div>
                  </td>
                  <td><StatusBadge status={s.category} type="category" /></td>
                  <td>{s.provider?.name || 'Local Partner'}</td>
                  <td style={{ fontWeight: 700 }}>₹{s.price}</td>
                  <td><RatingStars rating={s.rating} reviewCount={s.reviewCount} /></td>
                  <td><StatusBadge status={s.status} /></td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(s._id, s.status)}
                      className={`btn btn-sm ${s.status === 'active' ? 'btn-danger' : 'btn-primary'}`}
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      {s.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ServiceModeration;

