import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import { getServiceByIdApi } from '../services/services.api';
import { getServiceReviewsApi } from '../services/reviews.api';
import { useAuth } from '../context/AuthContext';
import ReviewList from '../components/ReviewList';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      const [svcRes, revRes] = await Promise.all([
        getServiceByIdApi(id),
        getServiceReviewsApi(id)
      ]);
      setService(svcRes.data?.service);
      setReviews(revRes.data?.reviews || []);
    } catch (err) {
      setError('Service not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/book?serviceId=${id}`);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '80px' }}>Loading...</div>;
  if (error || !service) return <div style={{ textAlign: 'center', padding: '80px' }}>{error || 'Service not found'}</div>;

  const categoryLabels = {
    boat_ride: 'Boat Ride', homestay: 'Homestay', food: 'Local Food',
    local_guide: 'Local Guide', narmada_aarti: 'Narmada Aarti', other: 'Other'
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ background: '#f0fdf4', color: '#15803d', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
          {categoryLabels[service.category] || service.category}
        </span>
        <h1 style={{ marginTop: '0.75rem', fontSize: '2rem', fontWeight: 700 }}>{service.title}</h1>
        <div style={{ display: 'flex', gap: '1.5rem', color: '#64748b', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          <span><Star size={16} style={{ display: 'inline', verticalAlign: 'middle', color: '#f59e0b' }} /> {service.rating?.toFixed(1)} ({service.reviewCount} reviews)</span>
          <span><MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle' }} /> {service.location?.name}, {service.location?.city}</span>
        </div>
      </div>

      {/* Images */}
      {service.images?.length > 0 && (
        <img src={service.images[0]} alt={service.title}
          style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '16px', marginBottom: '2rem' }}
        />
      )}

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <h2 style={{ marginBottom: '0.75rem' }}>About this experience</h2>
          <p style={{ color: '#475569', lineHeight: 1.7 }}>{service.description}</p>

          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>Availability</h3>
          <p style={{ color: '#475569' }}>Days: {service.availability?.days?.join(', ')}</p>
          <p style={{ color: '#475569' }}>Slots: {service.availability?.timeSlots?.join(', ')}</p>

          {/* Provider */}
          <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>About the Host</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
              {service.provider?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p style={{ fontWeight: 600 }}>{service.provider?.name}</p>
              <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{service.provider?.email}</p>
            </div>
          </div>

          {/* Reviews */}
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Reviews ({reviews.length})</h3>
          <ReviewList reviews={reviews} />
        </div>

        {/* Booking Card */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', position: 'sticky', top: '80px' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a' }}>
            ₹{service.price} <span style={{ fontSize: '1rem', fontWeight: 400, color: '#64748b' }}>/{service.pricingUnit?.replace('per_', '')}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
            <span><Star size={14} style={{ display: 'inline', color: '#f59e0b' }} /> {service.rating?.toFixed(1)}</span>
            <span>•</span>
            <span>{service.reviewCount} reviews</span>
          </div>
          <button
            onClick={handleBook}
            style={{ width: '100%', marginTop: '1.5rem', padding: '14px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Book Now
          </button>
          {!isAuthenticated && <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Login required to book</p>}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
