import React from 'react';
import { Ship, Tent, Utensils, Camera, Users, SlidersHorizontal } from 'lucide-react';
import './CategoryTabs.css';

const categories = [
  { id: 'boat_ride', label: 'Boat Rides', icon: <Ship size={24} /> },
  { id: 'home_stay', label: 'Home Stays', icon: <Tent size={24} /> },
  { id: 'food', label: 'Local Food', icon: <Utensils size={24} /> },
  { id: 'aarti', label: 'Aarti Darshan', icon: <Camera size={24} /> },
  { id: 'guide', label: 'Local Guide', icon: <Users size={24} /> },
];

const CategoryTabs = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-tabs-container">
      <div className="category-scroll">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>
      <div className="filter-actions">
        <button className="btn-filter">
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>
    </div>
  );
};

export default CategoryTabs;
