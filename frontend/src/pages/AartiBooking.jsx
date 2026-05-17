import React, { useState, useEffect } from 'react';
import { Users, Clock, Flame, Heart, Info, CheckCircle2 } from 'lucide-react';
import './AartiBooking.css';

const MOCK_AARTIS = [
  { id: 1, title: 'Narmada Maha Aarti', type: 'Evening', time: '06:30 PM', spots: 12, price: 500, desc: 'Special VIP seating on the floating platform during the grand evening Aarti.' },
  { id: 2, title: 'Prabhat Aarti', type: 'Morning', time: '05:30 AM', spots: 45, price: 200, desc: 'A serene morning prayer experiencing the sunrise over the holy river.' },
  { id: 3, title: 'Private Group Aarti', type: 'Custom', time: 'Flexible', spots: 'Unlimited', price: 2500, desc: 'Exclusive Aarti organized for your family or group with personal priest guidance.' }
];

const AartiBooking = () => {
  const [selectedDonation, setSelectedDonation] = useState(501);
  const [customDonation, setCustomDonation] = useState('');
  const [groupSizes, setGroupSizes] = useState({ 1: 1, 2: 1, 3: 1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGroupSizeChange = (id, increment) => {
    setGroupSizes(prev => {
      const newSize = prev[id] + increment;
      return { ...prev, [id]: newSize > 0 ? newSize : 1 };
    });
  };

  const handleDonationClick = (amount) => {
    setSelectedDonation(amount);
    setCustomDonation('');
  };

  return (
    <div className="aarti-page">
      {/* Hero Section */}
      <div className="aarti-hero">
        <div className="aarti-hero-bg"></div>
        <div className="aarti-hero-overlay"></div>
        <div className="aarti-hero-content animate-fade-in-up">
          <Flame size={48} color="#fbbf24" style={{ marginBottom: '1rem' }} />
          <h1 className="aarti-title">Divine Narmada Aarti</h1>
          <p className="aarti-subtitle">Experience the spiritual heart of India. Reserve your sacred space for the daily devotion to Maa Narmada.</p>
        </div>
      </div>

      <div className="aarti-container">
        {/* Schedule & Booking Section */}
        <div className="schedule-section">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--maroon)' }}>Select Your Experience</h2>
            <p style={{ color: '#64748b' }}>Secure your placement for upcoming Aartis</p>
          </div>

          <div className="schedule-grid">
            {MOCK_AARTIS.map(aarti => (
              <div key={aarti.id} className="aarti-card">
                <div className="aarti-time-badge">{aarti.time}</div>
                <h3>{aarti.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem', minHeight: '40px' }}>{aarti.desc}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--saffron)', fontWeight: 600 }}>
                  <IndianRupee size={16} /> {aarti.price} <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 400 }}>/ person</span>
                </div>

                <div className={`seat-availability ${typeof aarti.spots === 'number' && aarti.spots < 20 ? 'seat-low' : 'seat-high'}`}>
                  <Users size={16} /> 
                  {typeof aarti.spots === 'number' ? `${aarti.spots} spots remaining` : 'Unlimited spots'}
                </div>

                <div className="booking-controls">
                  <div className="group-toggle">
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Group Size</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '0.25rem', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                      <button 
                        onClick={() => handleGroupSizeChange(aarti.id, -1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: '#f1f5f9', cursor: 'pointer', fontWeight: 'bold' }}
                      >-</button>
                      <span style={{ fontWeight: 600, width: '12px', textAlign: 'center' }}>{groupSizes[aarti.id]}</span>
                      <button 
                        onClick={() => handleGroupSizeChange(aarti.id, 1)}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'var(--saffron)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                      >+</button>
                    </div>
                  </div>
                  <button className="btn-aarti">
                    Book for ₹{aarti.price * groupSizes[aarti.id]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="spiritual-grid">
          {/* Priest Profile */}
          <div className="priest-profile">
            <div className="priest-header">
              <img src="https://images.unsplash.com/photo-1555696958-c5049b866f6f?w=200&q=80" alt="Head Priest" className="priest-img" />
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--maroon)' }}>Pt. Shivam Tiwari</h3>
                <p style={{ color: 'var(--saffron)', fontWeight: 500, fontSize: '0.9rem' }}>Head Organizer, Narmada Samiti</p>
              </div>
            </div>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
              "The Aarti is not just a ritual; it is a profound connection between the soul and the sacred river. Our Samiti has been organizing the Maha Aarti for over 3 generations, ensuring the traditions of the Narmada Valley are preserved and shared with devotees from around the world."
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.85rem', fontWeight: 500, background: '#ecfdf5', padding: '0.5rem 1rem', borderRadius: '8px' }}>
              <CheckCircle2 size={16} /> Verified Platform Partner
            </div>
          </div>

          {/* Donation Section */}
          <div className="donation-section">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Heart color="var(--maroon)" fill="var(--maroon)" size={24} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: 'var(--maroon)' }}>Offer Dakshina</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Your contributions support the daily maintenance of the ghats, welfare of the local Kewat community, and the continuation of the grand Aarti tradition.
            </p>

            <div className="donation-presets">
              {[101, 501, 1100].map(amount => (
                <button 
                  key={amount}
                  className={`btn-donate-preset ${selectedDonation === amount ? 'active' : ''}`}
                  onClick={() => handleDonationClick(amount)}
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            <div className="custom-donation">
              <span>₹</span>
              <input 
                type="number" 
                placeholder="Custom Amount" 
                value={customDonation}
                onChange={(e) => {
                  setCustomDonation(e.target.value);
                  setSelectedDonation(null);
                }}
              />
            </div>

            <button className="btn-aarti" style={{ background: 'var(--maroon)' }}>
              Proceed with Dakshina {selectedDonation || customDonation ? `(₹${selectedDonation || customDonation})` : ''}
            </button>
            
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center', marginTop: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
              <Info size={14} /> 100% of your donation goes directly to the Narmada Samiti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple IndianRupee icon workaround if not exported correctly from lucide-react in this version
const IndianRupee = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13h8.5l-1 4h-2"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/>
  </svg>
);

export default AartiBooking;
