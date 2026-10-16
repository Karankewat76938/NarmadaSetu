import React from 'react';
import { Star } from 'lucide-react';

const ReviewList = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return <p style={{ color: '#64748b' }}>No reviews yet. Be the first to review!</p>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {reviews.map(review => (
        <div key={review._id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              {review.tourist?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p style={{ fontWeight: 600, margin: 0 }}>{review.tourist?.name}</p>
              <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} fill={s <= review.rating ? '#f59e0b' : 'none'} color={s <= review.rating ? '#f59e0b' : '#cbd5e1'} />
                ))}
              </div>
            </div>
          </div>
          <p style={{ color: '#475569', margin: 0, fontSize: '0.9rem' }}>{review.comment}</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem' }}>{new Date(review.createdAt).toLocaleDateString('en-IN')}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
