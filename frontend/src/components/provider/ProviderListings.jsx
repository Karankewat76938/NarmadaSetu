import React, { useState } from 'react';
import { Plus, Image as ImageIcon, Edit2, Trash2 } from 'lucide-react';

const MOCK_SERVICES = [
  { id: 1, title: 'Sunrise Marble Rocks Tour', category: 'Boat Ride', price: '₹800/boat', image: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=200&q=80', active: true },
  { id: 2, title: 'VIP Maha Aarti Boat', category: 'Aarti', price: '₹500/seat', image: 'https://images.unsplash.com/photo-1587310574169-7c30a08e1fcd?w=200&q=80', active: true }
];

const ProviderListings = () => {
  const [showAddForm, setShowAddForm] = useState(false);

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_SERVICES.map(service => (
              <div key={service.id} style={{ display: 'flex', gap: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'rgba(0,0,0,0.2)' }}>
                <img src={service.image} alt={service.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{service.category} • {service.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="btn-icon" style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                  <button className="btn-icon" style={{ background: 'rgba(239,68,68,0.1)', border: 'none', color: 'var(--accent-danger)', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="dark-panel">
          <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Create New Listing</h2>
            <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }} onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>

          <form style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Service Title (English)</label>
                <input type="text" placeholder="e.g. Sunset Boat Ride" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Service Title (Hindi)</label>
                <input type="text" placeholder="e.g. सूर्यास्त नाव की सवारी" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Category</label>
                <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }}>
                  <option>Boat Ride</option>
                  <option>Home Stay</option>
                  <option>Local Guide</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Price (₹)</label>
                <input type="number" placeholder="800" style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pricing Unit</label>
                <select style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px' }}>
                  <option>per boat</option>
                  <option>per person</option>
                  <option>per hour</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Description</label>
              <textarea rows="4" placeholder="Describe your service..." style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '6px', resize: 'vertical' }}></textarea>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Upload Images</label>
              <div style={{ border: '2px dashed var(--border-color)', borderRadius: '8px', padding: '3rem', textAlign: 'center', background: 'rgba(0,0,0,0.1)', cursor: 'pointer' }}>
                <ImageIcon size={32} style={{ color: 'var(--text-secondary)', margin: '0 auto 1rem' }} />
                <p style={{ color: 'white', fontWeight: 500 }}>Click to upload or drag and drop</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" className="btn-dark-primary" onClick={() => setShowAddForm(false)}>Publish Listing</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProviderListings;
