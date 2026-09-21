import React, { useState } from 'react';
import { bookingsAPI } from '../../services/bookings.api';

const ReviewModal = ({ booking, onClose, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please provide a comment sharing your experience.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await bookingsAPI.createReview({
        bookingId: booking._id,
        rating: Number(rating),
        comment: comment.trim()
      });

      if (res.success) {
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Review Experience</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {booking.service?.title}
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close review modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '18px', fontSize: '0.9rem' }}>
                ⚠️ {error}
              </div>
            )}

            <div className="form-group" style={{ textAlign: 'center', margin: '20px 0' }}>
              <label className="form-label" style={{ textAlign: 'center', marginBottom: '10px' }}>
                Rate Your Experience *
              </label>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '2rem', cursor: 'pointer' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ color: star <= rating ? '#f59e0b' : '#cbd5e1', transition: 'color 0.15s' }}
                    title={`${star} Star`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary)', marginTop: '6px' }}>
                {rating} out of 5 Stars
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reviewComment">
                Your Feedback & Experience *
              </label>
              <textarea
                id="reviewComment"
                className="form-textarea"
                rows="4"
                placeholder="Tell other travelers about the safety, promptness, storyteller boatman, or hospitality..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Post Verified Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

