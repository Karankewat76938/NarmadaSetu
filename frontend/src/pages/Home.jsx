import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import ServiceCategories from '../components/home/ServiceCategories';
import FeaturedRiders from '../components/home/FeaturedRiders';
import AartiBanner from '../components/home/AartiBanner';
import CommunityImpact from '../components/home/CommunityImpact';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import PartnerCTA from '../components/home/PartnerCTA';

const Home = () => {
  // Simple scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <ServiceCategories />
      <FeaturedRiders />
      <AartiBanner />
      <CommunityImpact />
      <HowItWorks />
      <Testimonials />
      <PartnerCTA />
    </div>
  );
};

export default Home;
