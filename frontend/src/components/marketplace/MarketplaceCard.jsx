import React, { useState } from 'react';
import { Heart, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MarketplaceCard.css';

const MarketplaceCard = ({ service }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleBook = (e) => {
    e.stopPropagation();
    navigate(`/listing/${service.id}`);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    navigate(`/listing/${service.id}`);
  };

  return (
    <div className="marketplace-card" onClick={handleCardClick}>
      <div className="mp-image-container">
        <img src={service.image} alt={service.title} className="mp-image" />
        <button className="mp-fav-btn" onClick={toggleLike}>
          <Heart size={20} fill={isLiked ? "#ef4444" : "rgba(0,0,0,0.4)"} color={isLiked ? "#ef4444" : "white"} />
        </button>
        {service.promoted && (
          <div className="mp-promoted-badge">Promoted</div>
        )}
      </div>

      <div className="mp-details">
        <div className="mp-header-row">
          <h3 className="mp-title">{service.title}</h3>
          <div className="mp-rating-badge">
            <span>{service.rating}</span>
            <Star size={12} fill="white" />
          </div>
        </div>

        <div className="mp-provider-row">
          <img src={service.providerAvatar} alt={service.provider} className="mp-provider-avatar" />
          <span className="mp-provider-name">{service.provider}</span>
          <span className="mp-location">• {service.location}</span>
        </div>

        <div className="mp-desc">{service.description}</div>

        <div className="mp-footer">
          <div className="mp-price-block">
            <span className="mp-price">₹{service.price}</span>
            <span className="mp-price-unit">{service.unit}</span>
          </div>
          <button className="btn-instant-book" onClick={handleBook}>
            <Zap size={16} fill="currentColor" /> Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCard;
