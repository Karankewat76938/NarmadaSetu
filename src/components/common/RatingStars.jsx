import React from 'react';

const RatingStars = ({ rating = 5, reviewCount, size = 'sm' }) => {
  const rounded = Math.round(Number(rating) * 10) / 10;
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded - fullStars >= 0.5;

  return (
    <div
      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: size === 'lg' ? '1.1rem' : '0.88rem' }}
      aria-label={`Rating: ${rounded} out of 5 stars`}
    >
      <div style={{ color: '#f59e0b', display: 'flex' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i}>
            {i < fullStars ? '★' : (i === fullStars && hasHalfStar ? '★' : '☆')}
          </span>
        ))}
      </div>
      <span style={{ fontWeight: 600, color: 'var(--color-text)', marginLeft: '4px' }}>
        {rounded.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default RatingStars;

