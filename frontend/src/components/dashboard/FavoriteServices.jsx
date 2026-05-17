import React from 'react';
import { Heart, Star } from 'lucide-react';
import './FavoriteServices.css';

const FAVORITES = [
  {
    id: 1,
    title: 'VIP Maha Aarti Boat',
    rating: 5.0,
    price: 500,
    image: 'https://images.unsplash.com/photo-1587310574169-7c30a08e1fcd?w=300&q=80'
  },
  {
    id: 2,
    title: 'Narmada View Heritage Stay',
    rating: 4.8,
    price: 2500,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&q=80'
  }
];

const FavoriteServices = () => {
  return (
    <div className="favorites-section">
      <div className="section-header">
        <h2>Your Favorites</h2>
      </div>

      <div className="favorites-scroll">
        {FAVORITES.map(fav => (
          <div key={fav.id} className="favorite-card">
            <div className="fav-image-box">
              <img src={fav.image} alt={fav.title} />
              <button className="btn-unfav">
                <Heart size={16} fill="#ef4444" color="#ef4444" />
              </button>
            </div>
            <div className="fav-details">
              <h4>{fav.title}</h4>
              <div className="fav-meta">
                <span className="fav-rating"><Star size={12} fill="var(--dark)" /> {fav.rating}</span>
                <span className="fav-price">₹{fav.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteServices;
