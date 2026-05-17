import React, { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import CategoryTabs from '../components/explore/CategoryTabs';
import ListingCard from '../components/explore/ListingCard';
import MapArea from '../components/explore/MapArea';
import './Explore.css';
import { 
  sunsetview, boat, stay, home, eveningAarti, guide, food, boatrider
} from '../assets/Images';

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
      sunsetview,
      boat
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
      stay,
      home
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
      eveningAarti
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
      guide
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
      food
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
      boatrider
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
