import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Globe } from 'lucide-react';
import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import { getServicesApi } from '../services/services.api';
import './ServiceListing.css';
import { 
  arvin, niru, hitesh, lucky, guide, sunsetview, boat, stay, food, eveningAarti 
} from '../assets/Images';

// Mock Data encompassing all categories as fallback
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
    providerAvatar: arvin,
    location: 'Omkareshwar',
    image: boat,
    promoted: true
  },
  {
    id: 2,
    category: 'homestay',
    title: 'Narmada View Heritage Stay',
    titleHindi: 'नर्मदा दर्शन हेरिटेज स्टे',
    description: 'Authentic local homestay with a direct view of the holy river and home-cooked meals.',
    price: 2500,
    unit: 'per night',
    rating: 4.8,
    provider: 'Anjali Rajput',
    providerAvatar: niru,
    location: 'Maheshwar',
    image: stay
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
    providerAvatar: hitesh,
    location: 'Omkareshwar',
    image: food
  },
  {
    id: 4,
    category: 'narmada_aarti',
    title: 'VIP Maha Aarti Boat',
    titleHindi: 'वीआईपी महा आरती नाव',
    description: 'Exclusive private boat placement for the evening Maha Aarti to avoid the shore crowds.',
    price: 500,
    unit: 'per seat',
    rating: 5.0,
    provider: 'Deepak Nishad',
    providerAvatar: lucky,
    location: 'Ghat No. 4',
    image: eveningAarti,
    promoted: true
  },
  {
    id: 5,
    category: 'local_guide',
    title: 'Parikrama Story Guide',
    titleHindi: 'परिक्रमा कथा मार्गदर्शक',
    description: 'Walk the ghats with a certified historical and spiritual guide.',
    price: 1500,
    unit: 'per tour',
    rating: 4.7,
    provider: 'Suresh Tiwari',
    providerAvatar: guide,
    location: 'Amarkantak',
    image: guide
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Services', nameHindi: 'सभी सेवाएँ', icon: '🌟', image: sunsetview },
  { id: 'boat_ride', name: 'Boat Rides', nameHindi: 'नाव की सवारी', icon: '🛶', image: boat },
  { id: 'homestay', name: 'Home Stays', nameHindi: 'होम स्टे', icon: '🏡', image: stay },
  { id: 'food', name: 'Local Food', nameHindi: 'स्थानीय भोजन', icon: '🍽️', image: food },
  { id: 'narmada_aarti', name: 'Aarti Darshan', nameHindi: 'आरती दर्शन', icon: '🪔', image: eveningAarti },
  { id: 'local_guide', name: 'Local Guide', nameHindi: 'मार्गदर्शक', icon: '🚶', image: guide }
];

const categoryDefaultImages = {
  boat_ride: boat,
  homestay: stay,
  food: food,
  narmada_aarti: eveningAarti,
  local_guide: guide
};

const ServiceListing = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHindi, setIsHindi] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [apiServices, setApiServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [activeCategory, searchTerm]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = { limit: 24 };
      if (activeCategory !== 'all') params.category = activeCategory;
      if (searchTerm.trim()) params.search = searchTerm.trim();
      const res = await getServicesApi(params);
      if (res.data?.services?.length > 0) {
        setApiServices(res.data.services);
      } else {
        setApiServices([]);
      }
    } catch (err) {
      console.warn('Could not load services from API, falling back to mock services:', err);
      setApiServices([]);
    } finally {
      setLoading(false);
    }
  };

  // If API services exist, map them; otherwise filter MOCK_SERVICES
  const displayServices = apiServices.length > 0
    ? apiServices.map(s => ({
        _id: s._id,
        id: s._id,
        category: s.category,
        title: s.title,
        titleHindi: s.title,
        description: s.description,
        price: s.price,
        unit: s.pricingUnit?.replace('per_', '/') || '/person',
        rating: s.rating || 5.0,
        provider: s.provider?.name || 'Local Kewat Host',
        providerAvatar: s.provider?.profileImage || arvin,
        location: s.location?.name || s.location?.city || 'Bhedaghat',
        image: s.images?.[0] || categoryDefaultImages[s.category] || boat,
        promoted: s.rating >= 4.8
      }))
    : MOCK_SERVICES.filter(service => {
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
          <span className="mp-count">{displayServices.length} {isHindi ? 'परिणाम' : 'results'}</span>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
            Loading experiences...
          </div>
        ) : displayServices.length > 0 ? (
          <div className="marketplace-grid">
            {displayServices.map(service => (
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
