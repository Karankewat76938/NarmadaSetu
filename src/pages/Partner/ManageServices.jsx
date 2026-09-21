import React, { useState, useEffect } from 'react';
import { servicesAPI } from '../../services/services.api';
import { partnerAPI } from '../../services/partner.api';
import StatusBadge from '../../components/common/StatusBadge';
import RatingStars from '../../components/common/RatingStars';

function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [partnerVerified, setPartnerVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // New Service Form State
  const [category, setCategory] = useState('boat_ride');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(400);
  const [pricingUnit, setPricingUnit] = useState('per_person');
  const [locationName, setLocationName] = useState('Panchvati Ghat');
  const [city, setCity] = useState('Jabalpur');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80');

  // Boat specific
  const [boatName, setBoatName] = useState('Rewa Tarangini');
  const [capacity, setCapacity] = useState(6);
  const [durationMinutes, setDurationMinutes] = useState(45);

  useEffect(() => {
    fetchServicesAndPartnerStatus();
  }, []);

  const fetchServicesAndPartnerStatus = async () => {
    setLoading(true);
    try {
      const [servRes, partRes] = await Promise.all([
        servicesAPI.getServices({ limit: 50 }),
        partnerAPI.getMe()
      ]);

      if (servRes.success && servRes.data?.services) {
        setServices(servRes.data.services);
      }
      if (partRes.success && partRes.data?.application) {
        setPartnerVerified(partRes.data.application.applicationStatus === 'approved');
      }
    } catch (err) {
      console.error('Failed to load partner services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const payload = {
        category,
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        pricingUnit,
        location: {
          name: locationName.trim(),
          ghat: locationName.trim(),
          city: city.trim()
        },
        images: [imageUrl],
        categoryDetails: {
          boatName,
          capacity: Number(capacity),
          durationMinutes: Number(durationMinutes)
        }
      };

      const res = await servicesAPI.createService(payload);
      if (res.success) {
        setMessage('Service listing created successfully!');
        setShowCreateModal(false);
        // Reset form
        setTitle('');
        setDescription('');
        fetchServicesAndPartnerStatus();
      }
    } catch (err) {
      setError(err.message || 'Failed to create service listing.');
    }
  };

  const handleDeactivate = async (serviceId) => {
    if (!window.confirm('Are you sure you want to deactivate this service?')) return;
    try {
      const res = await servicesAPI.deleteService(serviceId);
      if (res.success) {
        setMessage('Service listing deactivated.');
        fetchServicesAndPartnerStatus();
      }
    } catch (err) {
      setError(err.message || 'Failed to deactivate service.');
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="dashboard-title">My Services & Tourism Listings</h1>
            <p className="dashboard-subtitle">
              Manage your experience offerings, availability, and category details.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
            disabled={!partnerVerified}
            title={!partnerVerified ? 'Partner verification required to publish new services' : ''}
          >
            + Create New Service Listing
          </button>
        </div>
      </div>

      {!partnerVerified && (
        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', padding: '14px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.9rem' }}>
          ⚠️ Only admin-verified partners can publish new listings to the marketplace. Check your application status under "Verification Status".
        </div>
      )}

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

      {/* Services Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)' }}>
          Loading your listings...
        </div>
      ) : services.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '50px 20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⛵</div>
          <h3>No services created yet</h3>
          <p style={{ color: 'var(--color-text-muted)', margin: '8px 0 20px' }}>
            List your boat rides, homestays, or local tours to start receiving booking requests.
          </p>
          {partnerVerified && (
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
              Create First Listing
            </button>
          )}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Service Title</th>
                <th>Category</th>
                <th>Destination</th>
                <th>Rate</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id}>
                  <td>
                    <strong style={{ color: 'var(--color-text)' }}>{s.title}</strong>
                  </td>
                  <td><StatusBadge status={s.category} type="category" /></td>
                  <td>{s.location?.city} ({s.location?.ghat || s.location?.name})</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    ₹{s.price} <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>/{s.pricingUnit?.replace('per_', '')}</span>
                  </td>
                  <td><RatingStars rating={s.rating} reviewCount={s.reviewCount} /></td>
                  <td><StatusBadge status={s.status} /></td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(s._id)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Service Modal */}
      {showCreateModal && (
        <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3>Create Service Listing</h3>
              <button className="modal-close-btn" onClick={() => setShowCreateModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateService}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Tourism Category *</label>
                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="boat_ride">Boat Ride (Marble Rocks / Ghats)</option>
                    <option value="homestay">Riverside Homestay</option>
                    <option value="food">Traditional Malwi / Regional Food</option>
                    <option value="local_guide">Accredited Local Guide</option>
                    <option value="narmada_aarti">Narmada Aarti Experience</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Service Title *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Bhedaghat Marble Rocks Sunset Boating"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    className="form-textarea"
                    rows="3"
                    placeholder="Describe the experience, safety precautions, scenic views..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Price (₹) *</label>
                    <input
                      type="number"
                      className="form-input"
                      min="1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pricing Model *</label>
                    <select className="form-select" value={pricingUnit} onChange={(e) => setPricingUnit(e.target.value)}>
                      <option value="per_person">Per Person</option>
                      <option value="per_ride">Per Boat Ride</option>
                      <option value="per_night">Per Night</option>
                      <option value="per_meal">Per Meal</option>
                      <option value="per_group">Per Group</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Ghat / Location Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Panchvati Ghat"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">City / Destination *</label>
                    <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                      <option value="Jabalpur">Jabalpur / Bhedaghat</option>
                      <option value="Maheshwar">Maheshwar</option>
                      <option value="Omkareshwar">Omkareshwar</option>
                      <option value="Amarkantak">Amarkantak</option>
                      <option value="Mandla">Mandla</option>
                    </select>
                  </div>
                </div>

                {/* Category specific inputs */}
                {category === 'boat_ride' && (
                  <div style={{ backgroundColor: '#f0f9ff', padding: '14px', borderRadius: '10px', marginTop: '10px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0369a1', marginBottom: '8px' }}>
                      Boat Specifications
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Boat Name</label>
                        <input type="text" className="form-input" value={boatName} onChange={(e) => setBoatName(e.target.value)} />
                      </div>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Max Capacity</label>
                        <input type="number" className="form-input" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                      </div>
                      <div>
                        <label className="form-label" style={{ fontSize: '0.78rem' }}>Duration (Mins)</label>
                        <input type="number" className="form-input" value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label className="form-label">Image URL (Optional)</label>
                  <input
                    type="url"
                    className="form-input"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageServices;
