import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import './FeaturedRiders.css';
import { lucky, balram, arvin } from '../../assets/Images';

const riders = [
  {
    id: 1,
    name: 'Arvin Kewat',
    experience: '15+ Years',
    rating: 4.9,
    reviews: 124,
    image: arvin,
    specialty: 'Sunrise Photography Rides'
  },
  {
    id: 2,
    name: 'Deepak Nishad',
    experience: '8+ Years',
    rating: 4.8,
    reviews: 89,
    image: lucky,
    specialty: 'Aarti Darshan Expert'
  },
  {
    id: 3,
    name: 'Manoj kewat',
    experience: '20+ Years',
    rating: 5.0,
    reviews: 210,
    image: balram,
    specialty: 'Parikrama Guide'
  }
];

const FeaturedRiders = () => {
  return (
    <section className="riders-section">
      <div className="container">
        <h2 className="section-title">Featured Local Heroes</h2>
        <p className="section-subtitle">Meet our top-rated, verified boat riders and guides who make your Narmada journey unforgettable.</p>

        <div className="riders-grid">
          {riders.map(rider => (
            <div key={rider.id} className="rider-card">
              <div className="rider-img-wrapper">
                <img src={rider.image} alt={rider.name} className="rider-img" />
                <div className="verified-badge">
                  <ShieldCheck size={16} /> Verified
                </div>
              </div>
              <div className="rider-info">
                <h3>{rider.name}</h3>
                <p className="rider-specialty">{rider.specialty}</p>

                <div className="rider-stats">
                  <div className="stat">
                    <span className="stat-value">{rider.experience}</span>
                    <span className="stat-label">Experience</span>
                  </div>
                  <div className="stat divider"></div>
                  <div className="stat">
                    <span className="stat-value rating"><Star size={16} fill="currentColor" /> {rider.rating}</span>
                    <span className="stat-label">{rider.reviews} Reviews</span>
                  </div>
                </div>

                <button className="btn btn-secondary w-100 mt-4">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRiders;
