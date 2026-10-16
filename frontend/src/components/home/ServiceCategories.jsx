import React from 'react';
import { Ship, Users, Camera, Tent } from 'lucide-react';
import './ServiceCategories.css';

const categories = [
  {
    id: 1,
    title: 'Boat Rides',
    icon: <Ship size={32} />,
    desc: 'Peaceful rides along the holy ghats.',
    bg: 'linear-gradient(135deg, #e0f2fe, #bae6fd)',
    color: '#0284c7'
  },
  {
    id: 2,
    title: 'Local Guides',
    icon: <Users size={32} />,
    desc: 'Expert storytelling of Narmada history.',
    bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
    color: '#059669'
  },
  {
    id: 3,
    title: 'Aarti Darshan',
    icon: <Camera size={32} />,
    desc: 'Exclusive boat views for evening Aarti.',
    bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    color: '#d97706'
  },
  {
    id: 4,
    title: 'Homestays',
    icon: <Tent size={32} />,
    desc: 'Authentic stays with local families.',
    bg: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)',
    color: '#7c3aed'
  }
];

const ServiceCategories = () => {
  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Explore Services</h2>
        <p className="section-subtitle">Discover a wide range of authentic experiences hosted by verified locals.</p>
        
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div 
              key={cat.id} 
              className={`category-card animate-fade-in-up animate-delay-${index + 1}`}
            >
              <div className="cat-icon-wrap" style={{ background: cat.bg, color: cat.color }}>
                {cat.icon}
              </div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
