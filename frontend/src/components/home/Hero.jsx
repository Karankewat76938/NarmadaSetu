import React, { useState } from 'react';
import { Search, MapPin, Calendar, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('boat');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/services');
  };

  return (
    <section className="home-hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content-wrapper">
        <div className="hero-text-content animate-fade-in-up">
          <span className="hero-badge">Discover the Holy River</span>
          <h1 className="hero-title">
            Experience Narmada <br/>
            <span className="text-gradient">Like Never Before</span>
          </h1>
          <p className="hero-subtitle">
            Connect directly with verified local boat riders, expert guides, and authentic community experiences. Safe, secure, and spiritual.
          </p>
        </div>

        <div className="hero-search-box glass animate-fade-in-up animate-delay-2">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-field">
              <label><MapPin size={16}/> Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} required>
                <option value="" disabled>Select Ghat/City</option>
                <option value="bhedaghat">Bhedaghat, Jabalpur</option>
                <option value="omkareshwar">Omkareshwar</option>
                <option value="maheshwar">Maheshwar</option>
                <option value="amarkantak">Amarkantak</option>
              </select>
            </div>
            
            <div className="search-divider"></div>
            
            <div className="search-field">
              <label><Compass size={16}/> Service Type</label>
              <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="boat">Boat Ride</option>
                <option value="guide">Local Guide</option>
                <option value="aarti">Aarti Booking</option>
                <option value="stay">Homestay</option>
              </select>
            </div>

            <div className="search-divider"></div>

            <div className="search-field">
              <label><Calendar size={16}/> Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary search-btn">
              <Search size={20} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
