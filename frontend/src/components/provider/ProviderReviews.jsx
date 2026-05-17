import React from 'react';
import { Star, MessageCircleReply } from 'lucide-react';

const MOCK_REVIEWS = [
  { id: 1, user: 'Amit Patel', rating: 5, date: 'Oct 22, 2026', service: 'Sunrise Marble Rocks Tour', comment: 'Amazing experience! Ramesh was very polite and knew all the perfect spots for photos.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { id: 2, user: 'Sneha Rao', rating: 4, date: 'Oct 20, 2026', service: 'VIP Maha Aarti Boat', comment: 'Great view for the Aarti. The boat was clean. Deducted one star because we started 10 minutes late.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
];

const ProviderReviews = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
        <div className="dark-panel" style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>4.8</h2>
          <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--accent-warning)', margin: '0.5rem 0' }}>
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Based on 124 Reviews</p>
        </div>

        <div className="dark-panel" style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            Recent Feedback
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {MOCK_REVIEWS.map(review => (
              <div key={review.id} style={{ display: 'flex', gap: '1rem' }}>
                <img src={review.avatar} alt={review.user} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>{review.user}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>for {review.service} • {review.date}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--accent-warning)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "transparent"} />
                      ))}
                    </div>
                  </div>
                  <p style={{ marginTop: '0.5rem', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    "{review.comment}"
                  </p>
                  <button style={{ 
                    marginTop: '0.75rem', 
                    background: 'transparent', 
                    border: 'none', 
                    color: 'var(--accent-primary)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.25rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}>
                    <MessageCircleReply size={14} /> Reply to {review.user.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderReviews;
