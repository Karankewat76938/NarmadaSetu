import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ListingCard.css';

const ListingCard = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1));
  };

  const toggleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/listing/${listing.id}`} className="listing-card">
      <div className="listing-image-container">
        {listing.badge && (
          <div className="listing-badge">{listing.badge}</div>
        )}
        <button className="like-btn" onClick={toggleLike}>
          <Heart size={24} fill={isLiked ? "#ef4444" : "rgba(0,0,0,0.3)"} color={isLiked ? "#ef4444" : "white"} />
        </button>
        
        <img 
          src={listing.images[currentImageIndex]} 
          alt={listing.title} 
          className="listing-image" 
        />
        
        {listing.images.length > 1 && (
          <div className="slider-controls">
            <button className="slider-btn" onClick={prevImage}><ChevronLeft size={20} /></button>
            <button className="slider-btn" onClick={nextImage}><ChevronRight size={20} /></button>
          </div>
        )}
        
        <div className="slider-dots">
          {listing.images.map((_, idx) => (
            <span key={idx} className={`dot ${idx === currentImageIndex ? 'active' : ''}`}></span>
          ))}
        </div>
      </div>
      
      <div className="listing-info">
        <div className="listing-header">
          <h3 className="listing-title">{listing.title}</h3>
          <div className="listing-rating">
            <Star size={14} fill="currentColor" />
            <span>{listing.rating}</span>
          </div>
        </div>
        <p className="listing-location">{listing.location}</p>
        <p className="listing-provider">Hosted by {listing.provider}</p>
        <div className="listing-footer">
          <p className="listing-price">
            <span className="price-val">₹{listing.price}</span> / person
          </p>
          <button className="quick-book-btn">Quick Book</button>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
