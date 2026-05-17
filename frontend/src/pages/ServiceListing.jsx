import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Globe } from 'lucide-react';
import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import './ServiceListing.css';


// Mock Data encompassing all categories
const MOCK_SERVICES = [
  {
    id: 1,
    category: 'boat_ride',
    title: 'Sunrise Marble Rocks Tour',
    titleHindi: 'सूर्योदय संगमरमर की चट्टानें यात्रा',
    description: 'A serene early morning boat ride through the majestic marble rocks of Bhedaghat.',
    price: 800,
    unit: 'per boat',
    rating: 4.9,
    provider: 'Arvin Kewat',
    providerAvatar: '/assets/images/arvin.jpg',
    location: 'Omkareshwar',
    image: '/assets/images/arvin.jpg',
    promoted: true
  },
  {
    id: 2,
    category: 'home_stay',
    title: 'Narmada View Heritage Stay',
    titleHindi: 'नर्मदा दर्शन हेरिटेज स्टे',
    description: 'Authentic local homestay with a direct view of the holy river and home-cooked meals.',
    price: 2500,
    unit: 'per night',
    rating: 4.8,
    provider: 'Anjali Rajput',
    providerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    location: 'Maheshwar',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'
  },
  {
    id: 3,
    category: 'food',
    title: 'Authentic MP Thali',
    titleHindi: 'प्रामाणिक मध्य प्रदेश थाली',
    description: 'Enjoy a purely vegetarian local thali prepared by local families near the ghat.',
    price: 350,
    unit: 'per person',
    rating: 4.5,
    provider: 'Mama Kitchen',
    providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    location: 'Omkareshwar',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80'
  },
  {
    id: 4,
    category: 'aarti',
    title: 'VIP Maha Aarti Boat',
    titleHindi: 'वीआईपी महा आरती नाव',
    description: 'Exclusive private boat placement for the evening Maha Aarti to avoid the shore crowds.',
    price: 500,
    unit: 'per seat',
    rating: 5.0,
    provider: 'Deepak Nishad',
    providerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    location: 'Ghat No. 4',
    image: 'https://images.unsplash.com/photo-1587310574169-7c30a08e1fcd?w=600&q=80',
    promoted: true
  },
  {
    id: 5,
    category: 'guide',
    title: 'Parikrama Story Guide',
    titleHindi: 'परिक्रमा कथा मार्गदर्शक',
    description: 'Walk the ghats with a certified historical and spiritual guide.',
    price: 1500,
    unit: 'per tour',
    rating: 4.7,
    provider: 'Suresh Tiwari',
    providerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    location: 'Amarkantak',
    image: 'https://images.unsplash.com/photo-1555696958-c5049b866f6f?w=600&q=80'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Services', nameHindi: 'सभी सेवाएँ', icon: '🌟', image: 'https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=200&q=80' },
  { id: 'boat_ride', name: 'Boat Rides', nameHindi: 'नाव की सवारी', icon: '🛶', image: 'https://images.unsplash.com/photo-1506869640319-fea1a2753c10?w=200&q=80' },
  { id: 'home_stay', name: 'Home Stays', nameHindi: 'होम स्टे', icon: '🏡', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&q=80' },
  { id: 'food', name: 'Local Food', nameHindi: 'स्थानीय भोजन', icon: '🍽️', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80' },
  { id: 'aarti', name: 'Aarti Darshan', nameHindi: 'आरती दर्शन', icon: '🪔', image: 'https://images.unsplash.com/photo-1587310574169-7c30a08e1fcd?w=200&q=80' },
  { id: 'guide', name: 'Local Guide', nameHindi: 'मार्गदर्शक', icon: '🚶', image: 'https://images.unsplash.com/photo-1555696958-c5049b866f6f?w=200&q=80' }
];

const ServiceListing = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHindi, setIsHindi] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredServices = MOCK_SERVICES.filter(service => {
    const matchCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="marketplace-page">
      {/* Top Bar Navigation */}
      <div className="marketplace-topbar container">
        <div className="mp-search-bar glass">
          <Search size={20} color="#64748b" />
          <input
            type="text"
            placeholder={isHindi ? "सेवा या स्थान खोजें..." : "Search for a service or location..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mp-topbar-actions">
          <button className="lang-toggle" onClick={() => setIsHindi(!isHindi)}>
            <Globe size={18} />
            {isHindi ? 'English' : 'हिंदी'}
          </button>
          <button className="btn-filter-mp">
            <SlidersHorizontal size={18} />
            <span className="hide-mobile">Filters</span>
          </button>
        </div>
      </div>

      {/* Circular Categories (Zomato Style) */}
      <div className="mp-categories-section">
        <div className="container">
          <div className="category-circles-scroll">
            {CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className={`category-circle-wrapper ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <div className="category-img-container">
                  <img src={cat.image} alt={cat.name} />
                  <div className="category-overlay"></div>
                </div>
                <span className="category-name">{isHindi ? cat.nameHindi : cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid (Airbnb Style Cards) */}
      <div className="container mp-main-content">
        <div className="mp-grid-header">
          <h2>
            {isHindi ? 'आपके लिए सर्वश्रेष्ठ सेवाएँ' : 'Top Services for You'}
          </h2>
          <span className="mp-count">{filteredServices.length} {isHindi ? 'परिणाम' : 'results'}</span>
        </div>

        {filteredServices.length > 0 ? (
          <div className="marketplace-grid">
            {filteredServices.map(service => (
              <MarketplaceCard
                key={service.id}
                service={{
                  ...service,
                  title: isHindi ? service.titleHindi : service.title
                }}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>{isHindi ? 'कोई सेवा नहीं मिली।' : 'No services found.'}</p>
            <button className="btn btn-secondary mt-4" onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceListing;
