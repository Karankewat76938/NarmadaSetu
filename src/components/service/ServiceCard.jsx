import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../common/RatingStars';
import StatusBadge from '../common/StatusBadge';

const ServiceCard = ({ service }) => {
  const defaultImg = 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80';
  const imgUrl = (service.images && service.images.length > 0) ? service.images[0] : defaultImg;

  const formatCategory = (cat) => {
    switch (cat) {
      case 'boat_ride': return 'Boat Ride';
      case 'homestay': return 'Homestay';
      case 'food': return 'Local Food';
      case 'local_guide': return 'Guide';
      case 'narmada_aarti': return 'Narmada Aarti';
      default: return 'Experience';
    }
  };

  const formatUnit = (unit) => {
    switch (unit) {
      case 'per_person': return '/ person';
      case 'per_night': return '/ night';
      case 'per_meal': return '/ meal';
      case 'per_group': return '/ group';
      case 'per_ride': return '/ ride';
      default: return '';
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      className="service-card-item"
    >
      {/* Image container */}
      <div style={{ position: 'relative', height: '210px', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
        <img
          src={imgUrl}
          alt={service.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <StatusBadge status={formatCategory(service.category)} type="category" />
        </div>
        <div style={{ position: 'absolute', bottom: '10px', right: '12px', backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '3px 10px', borderRadius: '20px' }}>
          <span style={{ color: '#ffd369', fontSize: '0.82rem', fontWeight: 600 }}>
            📍 {service.location?.city || 'Narmada Basin'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, lineHeight: 1.4, color: 'var(--color-text)' }}>
            {service.title}
          </h3>
        </div>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.5, margin: '8px 0 16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {service.description}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <RatingStars rating={service.rating} reviewCount={service.reviewCount} />
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                ₹{service.price}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '2px' }}>
                {formatUnit(service.pricingUnit)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link
              to={`/service/${service._id}`}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '0.88rem', padding: '10px' }}
            >
              View Details & Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;

