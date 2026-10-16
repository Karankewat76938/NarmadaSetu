import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { getServicesApi, createServiceApi, deleteServiceApi } from '../../services/services.api';
import { maheshwarghat, eveningAarti } from '../../assets/Images';

const ProviderListings = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [form, setForm] = useState({
    title: '',
    category: 'boat_ride',
    price: '',
    pricingUnit: 'per_boat',
    description: '',
    locationName: 'Ghat No. 1',
    city: 'Maheshwar'
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getServicesApi({ limit: 50 });
      setServices(res.data?.services || []);
    } catch (err) {
      console.error('Failed to fetch provider listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await deleteServiceApi(id);
      fetchServices();
    } catch (err) {
      alert(err.message || 'Failed to delete service');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await createServiceApi({
        title: form.title,
        category: form.category,
        price: Number(form.price),
        pricingUnit: form.pricingUnit,
        description: form.description,
        location: {
          name: form.locationName,
          city: form.city
        },
        images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800']
      });
      setShowAddForm(false);
      setForm({
        title: '',
        category: 'boat_ride',
        price: '',
        pricingUnit: 'per_boat',
        description: '',
        locationName: 'Ghat No. 1',
        city: 'Maheshwar'
      });
      fetchServices();
    } catch (err) {
      setError(err.message || 'Failed to create service');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {!showAddForm ? (
        <div className="dark-panel">
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>My Active Listings</h2>
            <button className="btn-dark-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowAddForm(true)}>
              <Plus size={18} /> Add New Service
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading listings...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {services.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                  No active listings yet. Click "Add New Service" to create one.
                </div>
              ) : (
                services.map(service => (
                  <div key={service._id} style={{ display: 'flex', gap: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'rgba(0,0,0,0.2)' }}>
                    <img
                      src={service.images?.[0] || maheshwarghat}
                      alt={service.title}
                      style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{service.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                        {service.category?.replace('_', ' ')} • ₹{service.price} ({service.pricingUnit?.replace('per_', '/')})
                      </p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                        Location: {service.location?.name}, {service.location?.city}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        className="btn-icon"
                        onClick={() => handleDelete(service._id)}
                        style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--accent-danger)', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}
                        title="Delete listing"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="dark-panel">
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Create New Listing</h2>
            <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreate} style={{ display: 'grid', gap: '1.5rem' }}>
            {error && (
              <p style={{ color: 'var(--accent-danger)', background: 'rgba(239,68,68,0.1)', padding: '0.75rem', borderRadius: '6px' }}>
                {error}
              </p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunset Boat Ride"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Location / Ghat</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ahilya Ghat"
                  value={form.locationName}
                  onChange={e => setForm({ ...form, locationName: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }}
                >
                  <option value="boat_ride">Boat Ride</option>
                  <option value="homestay">Homestay</option>
                  <option value="local_guide">Local Guide</option>
                  <option value="food">Local Food</option>
                  <option value="narmada_aarti">Narmada Aarti</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="800"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pricing Unit</label>
                <select
                  value={form.pricingUnit}
                  onChange={e => setForm({ ...form, pricingUnit: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }}
                >
                  <option value="per_boat">per boat</option>
                  <option value="per_person">per person</option>
                  <option value="per_hour">per hour</option>
                  <option value="per_night">per night</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Description</label>
              <textarea
                rows="4"
                required
                placeholder="Describe your service in detail..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" disabled={submitting} className="btn-dark-primary">
                {submitting ? 'Publishing...' : 'Publish Listing'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProviderListings;
