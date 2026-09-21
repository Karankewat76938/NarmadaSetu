import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesAPI } from '../services/services.api';
import RatingStars from '../components/common/RatingStars';
import StatusBadge from '../components/common/StatusBadge';
import BookingModal from '../components/booking/BookingModal';

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        const [servRes, revRes] = await Promise.all([
          servicesAPI.getServiceById(id),
          servicesAPI.getServiceReviews(id)
        ]);

        if (servRes.success && servRes.data?.service) {
          setService(servRes.data.service);
        }
        if (revRes.success && revRes.data?.reviews) {
          setReviews(revRes.data.reviews);
        }
      } catch (err) {
        setError(err.message || 'Failed to load service details.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        Loading experience details...
      </div>
    );
  }

  if (error || !service) {
    return (
      <div style={{ maxWidth: '600px', margin: '120px auto', textAlign: 'center', padding: '20px' }}>
        <h2>Experience Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '16px 0' }}>{error || 'This service could not be located.'}</p>
        <Link to="/explore" className="btn btn-primary">
          ← Back to All Experiences
        </Link>
      </div>
    );
  }

  const defaultImg = 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80';
  const mainImage = (service.images && service.images.length > 0) ? service.images[0] : defaultImg;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingTop: '90px', paddingBottom: '80px' }}>
      <div style={{ width: '92%', maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', gap: '8px', fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/explore" style={{ color: 'inherit', textDecoration: 'none' }}>Experiences</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{service.title}</span>
        </div>

        {/* Hero Gallery & Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
            <StatusBadge status={service.category} type="category" />
            <span style={{ color: '#059669', fontSize: '0.85rem', fontWeight: 600 }}>
              ✓ Verified River Partner
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: '12px' }}>
            {service.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', alignItems: 'center', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
            <span>📍 {service.location?.name}, {service.location?.ghat ? `${service.location.ghat}, ` : ''}{service.location?.city}</span>
            <RatingStars rating={service.rating} reviewCount={service.reviewCount} />
          </div>
        </div>

        {/* Main Image */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '420px', marginBottom: '40px', boxShadow: 'var(--shadow-md)' }}>
          <img
            src={mainImage}
            alt={service.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Two-Column Grid: Content & Booking Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(300px, 1fr)', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Left Column: Details */}
          <div>
            {/* Description */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '16px' }}>
                About this Experience
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {service.description}
              </p>
            </div>

            {/* Category-Specific Specifications (PRD Section 10) */}
            {service.category === 'boat_ride' && (
              <div className="card" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px' }}>
                  ⛵ Boat Ride Specifications & Safety
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div><strong>Boat Name:</strong> {service.categoryDetails?.boatName || 'Standard Passenger Boat'}</div>
                  <div><strong>Boat Type:</strong> {service.categoryDetails?.boatType || 'Motor Boat'}</div>
                  <div><strong>Max Capacity:</strong> {service.categoryDetails?.capacity || 6} Persons</div>
                  <div><strong>Ride Duration:</strong> ~{service.categoryDetails?.durationMinutes || 45} Minutes</div>
                  <div><strong>Boarding Point:</strong> {service.categoryDetails?.boardingPoint || service.location?.name}</div>
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <strong style={{ display: 'block', marginBottom: '10px', color: '#0284c7' }}>
                    🛡️ Onboard Safety Gear Included:
                  </strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(service.categoryDetails?.safetyEquipment || ['Life Jackets', 'First Aid Kit', 'Certified Swimmer Pilot']).map((gear, idx) => (
                      <span key={idx} style={{ backgroundColor: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 500 }}>
                        ✓ {gear}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {service.category === 'homestay' && (
              <div className="card" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px' }}>
                  🏡 Homestay Amenities & House Rules
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div><strong>Property Name:</strong> {service.categoryDetails?.propertyName || 'Riverside Stay'}</div>
                  <div><strong>Room Type:</strong> {service.categoryDetails?.roomType || 'Standard Room'}</div>
                  <div><strong>Guest Capacity:</strong> Up to {service.categoryDetails?.guestCapacity || 4} Guests</div>
                  <div><strong>Check-in / Check-out:</strong> {service.categoryDetails?.checkInTime || '12:00 PM'} / {service.categoryDetails?.checkOutTime || '11:00 AM'}</div>
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                  <strong style={{ display: 'block', marginBottom: '10px' }}>Amenities:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {(service.categoryDetails?.amenities || ['River View', 'Hot Geyser', 'Wi-Fi']).map((amenity, idx) => (
                      <span key={idx} style={{ backgroundColor: '#f1f5f9', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
                        ✦ {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {service.category === 'food' && (
              <div className="card" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px' }}>
                  🍲 Culinary Information
                </h3>
                <div><strong>Meal Type:</strong> {service.categoryDetails?.foodType || 'Traditional Meal'}</div>
                <div style={{ margin: '8px 0' }}><strong>Pure Vegetarian:</strong> {service.categoryDetails?.isPureVeg ? 'Yes (Strictly Pure Veg)' : 'Vegetarian'}</div>
                <div style={{ marginTop: '14px' }}>
                  <strong>Thali Inclusions:</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '8px', color: 'var(--color-text-muted)' }}>
                    {(service.categoryDetails?.menuItems || ['Dal Bafla', 'Churma Laddu', 'Kadhi', 'Nimari Thecha']).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {service.category === 'narmada_aarti' && (
              <div className="card" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '18px' }}>
                  🪔 Aarti Ceremony Details
                </h3>
                <div><strong>Ghat:</strong> {service.categoryDetails?.ghatLocation || service.location?.name}</div>
                <div style={{ margin: '8px 0' }}><strong>Timing:</strong> {service.categoryDetails?.aartiTiming || 'Sunset Aarti'}</div>
                <div><strong>Inclusions:</strong> Reserved Seating & Sacred Prasad Diya Offering</div>
              </div>
            )}

            {/* Provider Profile (PRD Section 10) */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '16px' }}>
                Local Service Partner
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                  👤
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                    {service.provider?.name || 'Local Narmada Operator'}
                  </h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: '4px 0 0' }}>
                    Accredited local partner • Verified identity & contact
                  </p>
                </div>
              </div>
            </div>

            {/* Verified Reviews Section (PRD Section 17) */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>
                  Verified Reviews ({reviews.length})
                </h3>
                <RatingStars rating={service.rating} />
              </div>

              {reviews.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                  No reviews submitted yet. Completed bookings will appear here.
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {reviews.map((rev) => (
                    <div key={rev._id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 600 }}>{rev.tourist?.name || 'Verified Traveler'}</span>
                        <RatingStars rating={rev.rating} />
                      </div>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, margin: '6px 0' }}>
                        "{rev.comment}"
                      </p>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>
                        Verified Experience • {new Date(rev.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div style={{ position: 'sticky', top: '110px' }}>
            <div className="card" style={{ border: '2px solid var(--color-primary-light)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                    ₹{service.price}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginLeft: '4px' }}>
                    / {service.pricingUnit?.replace('per_', '') || 'person'}
                  </span>
                </div>
                <StatusBadge status="Instant Request" type="category" />
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '10px', marginBottom: '20px', fontSize: '0.88rem' }}>
                <div style={{ marginBottom: '6px' }}><strong>Availability:</strong> All days of week</div>
                <div><strong>Standard Slots:</strong> Morning, Afternoon, Evening</div>
              </div>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginBottom: '12px' }}
              >
                Book This Experience
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                🔒 Safe booking with verified Narmada operators
              </div>
            </div>
          </div>

        </div>

        {/* Booking Modal */}
        {bookingModalOpen && (
          <BookingModal
            service={service}
            onClose={() => setBookingModalOpen(false)}
          />
        )}

      </div>
    </div>
  );
}

export default ServiceDetails;
