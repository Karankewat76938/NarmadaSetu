import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { createReviewApi } from '../services/reviews.api';

const ReviewForm = ({ bookingId, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createReviewApi({ bookingId, rating, comment });
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.25rem' }}>
      <h4 style={{ marginBottom: '0.75rem' }}>Leave a Review</h4>
      <div style={{ display: 'flex', gap: 6, marginBottom: '0.75rem' }}>
        {[1,2,3,4,5].map(s => (
          <Star
            key={s}
            size={28}
            style={{ cursor: 'pointer' }}
            fill={s <= (hovered || rating) ? '#f59e0b' : 'none'}
            color={s <= (hovered || rating) ? '#f59e0b' : '#cbd5e1'}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(s)}
          />
        ))}
      </div>
      <textarea
        required
        rows={3}
        placeholder="Share your experience..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '10px', fontSize: '0.9rem', resize: 'vertical' }}
      />
      {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        style={{ marginTop: '0.75rem', padding: '10px 24px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
