import React from 'react';
import { Star } from 'lucide-react';
import './ReviewsSection.css';

const MOCK_REVIEWS = [
  {
    id: 1,
    name: 'Ananya S.',
    date: 'October 2026',
    rating: 5,
    text: 'Ramesh was an incredible guide! He was very patient, ensured we all had life jackets properly secured, and took us to the best spots for sunrise photos. The marble rocks are breathtaking.'
  },
  {
    id: 2,
    name: 'Vikas T.',
    date: 'September 2026',
    rating: 5,
    text: 'Felt completely safe during the entire ride. The boat was clean, and Ramesh shared so many interesting local stories. A truly authentic experience.'
  },
  {
    id: 3,
    name: 'Priyanka D.',
    date: 'August 2026',
    rating: 4,
    text: 'Beautiful views and a very peaceful ride. Booking through Narmada Setu was seamless and we didn\'t have to haggle at the ghat.'
  },
  {
    id: 4,
    name: 'Rahul K.',
    date: 'July 2026',
    rating: 5,
    text: 'Highly recommend! The early morning slot is the best. The water was calm and our host was very welcoming.'
  }
];

const ReviewsSection = ({ rating, count }) => {
  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <Star size={24} fill="var(--dark)" />
        <h2>{rating} · {count} reviews</h2>
      </div>
      
      <div className="reviews-grid">
        {MOCK_REVIEWS.map(review => (
          <div key={review.id} className="review-card">
            <div className="reviewer-info">
              <div className="reviewer-avatar">
                {review.name.charAt(0)}
              </div>
              <div>
                <h4>{review.name}</h4>
                <span>{review.date}</span>
              </div>
            </div>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>
      
      <button className="btn btn-secondary mt-4">Show all {count} reviews</button>
    </div>
  );
};

export default ReviewsSection;
