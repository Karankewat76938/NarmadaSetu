import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from '../components/listing/ImageGallery';
import MainInfo from '../components/listing/MainInfo';
import RiderProfile from '../components/listing/RiderProfile';
import SafetySOSIndicator from '../components/listing/SafetySOSIndicator';
import BookingCard from '../components/listing/BookingCard';
import PickupMap from '../components/listing/PickupMap';
import ReviewsSection from '../components/listing/ReviewsSection';
import './ListingDetail.css';

// Mock detailed data
const MOCK_LISTING = {
  id: 1,
  title: 'Sunrise Private Boat Ride to Marble Rocks',
  location: 'Ghat No. 4, Bhedaghat, Jabalpur',
  rating: 4.9,
  reviewsCount: 124,
  price: 800,
  capacity: 'Up to 6 guests',
  duration: '1 Hour',
  boatType: 'Traditional Row Boat',
  images: [
    'https://images.unsplash.com/photo-1541823709867-1b206113eafd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1506869640319-fea1a2753c10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1de2d9d0cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ],
  rider: {
    name: 'Ramesh Kewat',
    experience: '15+ Years',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    languages: ['Hindi', 'Local Dialect', 'Basic English'],
    description: "I've been rowing these waters since I was a boy. I know every marble rock formation and their stories.",
    joined: '2010'
  }
};

const ListingDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="listing-detail-page container">
      <div className="listing-detail-header">
        <h1>{MOCK_LISTING.title}</h1>
      </div>

      <ImageGallery images={MOCK_LISTING.images} />

      <div className="listing-content-wrapper">
        <div className="listing-main-column">
          <MainInfo listing={MOCK_LISTING} />
          <div className="detail-divider"></div>
          
          <SafetySOSIndicator />
          <div className="detail-divider"></div>
          
          <RiderProfile rider={MOCK_LISTING.rider} />
          <div className="detail-divider"></div>
          
          <PickupMap location={MOCK_LISTING.location} />
          <div className="detail-divider"></div>
          
          <ReviewsSection rating={MOCK_LISTING.rating} count={MOCK_LISTING.reviewsCount} />
        </div>
        
        <div className="listing-sidebar-column">
          <BookingCard listing={MOCK_LISTING} />
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
