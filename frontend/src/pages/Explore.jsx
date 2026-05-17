import React, { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import CategoryTabs from '../components/explore/CategoryTabs';
import ListingCard from '../components/explore/ListingCard';
import MapArea from '../components/explore/MapArea';
import './Explore.css';

// Mock Data
const MOCK_LISTINGS = [
  {
    id: 1,
    type: 'boat_ride',
    title: 'Sunrise Private Boat Ride to Marble Rocks',
    location: 'Bhedaghat, Jabalpur',
    provider: 'Ramesh Kewat',
    rating: 4.9,
    price: 800,
    badge: 'Popular',
    images: [
      'https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1506869640319-fea1a2753c10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 2,
    type: 'home_stay',
    title: 'Riverside Heritage Homestay',
    location: 'Maheshwar Ghat',
    provider: 'Anjali Rajput',
    rating: 4.8,
    price: 2500,
    badge: 'Rare Find',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 3,
    type: 'aarti',
    title: 'Exclusive Evening Aarti Darshan',
    location: 'Omkareshwar',
    provider: 'Deepak Nishad',
    rating: 5.0,
    price: 500,
    images: [
      'https://images.unsplash.com/photo-1587310574169-7c30a08e1fcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 4,
    type: 'guide',
    title: 'Parikrama Storytelling Guide',
    location: 'Amarkantak',
    provider: 'Suresh Tiwari',
    rating: 4.7,
    price: 1500,
    badge: 'Certified',
    images: [
      'https://images.unsplash.com/photo-1555696958-c5049b866f6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 5,
    type: 'food',
    title: 'Authentic Local Thali Experience',
    location: 'Bhedaghat, Jabalpur',
    provider: 'Mama Kitchen',
    rating: 4.6,
    price: 300,
    images: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 6,
    type: 'boat_ride',
    title: 'Evening Sunset Shared Boat',
    location: 'Bhedaghat, Jabalpur',
    provider: 'Kewat Union',
    rating: 4.5,
    price: 100,
    images: [
      'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    ]
  }
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('boat_ride');
  const [showMapMobile, setShowMapMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredListings = MOCK_LISTINGS.filter(listing => listing.type === selectedCategory);

  return (
    <div className="explore-page">
      <CategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="explore-content">
        <div className={`explore-listings ${showMapMobile ? 'hide-on-mobile' : ''}`}>
          <div className="listings-header">
            <h2>{filteredListings.length} {filteredListings.length === 1 ? 'experience' : 'experiences'} found</h2>
          </div>

          <div className="listings-grid">
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        <div className={`explore-map-wrapper ${showMapMobile ? 'show-on-mobile' : ''}`}>
          <MapArea />
        </div>
      </div>

      <button
        className="mobile-map-toggle btn-dark"
        onClick={() => setShowMapMobile(!showMapMobile)}
      >
        {showMapMobile ? 'Show List' : <><Map size={16} /> Show Map</>}
      </button>
    </div>
  );
};

export default Explore;
