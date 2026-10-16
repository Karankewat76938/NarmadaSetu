import React, { useEffect } from 'react';
import { ShieldCheck, Anchor, Heart, Award } from 'lucide-react';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container about-hero-container">
          <div className="about-hero-badge">OUR MISSION</div>
          <h1>Empowering the Kewat Boating Community</h1>
          <p className="lead">
            Narmada Setu bridges the gap between travelers seeking sacred, authentic river experiences and local boating communities preserving ancient traditions along the holy Narmada River.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story container">
        <div className="story-grid">
          <div className="story-text">
            <h2>The River, The Boaters, The Bridge</h2>
            <p>
              The Narmada River is one of India's most sacred water bodies, revered as a living deity. For generations, the <strong>Kewat (boating) community</strong> has served as the river's guardians, guiding pilgrims, singing historical local lore, and navigating Bhedaghat's majestic Marble Rocks.
            </p>
            <p>
              However, local boaters have faced unequal tourism commissions, lack of modern safety gear, and minimal digital visibility. We built <strong>Narmada Setu</strong> (The Narmada Bridge) to empower these local micro-entrepreneurs by providing direct tourist bookings, guaranteed fair payouts, and comprehensive safety training.
            </p>
          </div>
          <div className="story-stats-card glass">
            <h3>Narmada Setu Impact</h3>
            <div className="stat-item">
              <span className="stat-num">150+</span>
              <span className="stat-label">Verified Local Kewats</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">15K+</span>
              <span className="stat-label">Happy Pilgrims & Tourists</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">40%+</span>
              <span className="stat-label">Increase in Boater Incomes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Guiding Principles</h2>
          <div className="values-grid">
            <div className="value-card glass">
              <div className="value-icon"><Anchor size={24} /></div>
              <h3>Empowerment</h3>
              <p>Ensuring 100% direct payouts to boat riders and providers with zero middleman exploitation.</p>
            </div>
            <div className="value-card glass">
              <div className="value-icon"><ShieldCheck size={24} /></div>
              <h3>Sacred Safety</h3>
              <p>Providing state-of-the-art life jackets, realtime weather monitoring, and trained rescue riders.</p>
            </div>
            <div className="value-card glass">
              <div className="value-icon"><Heart size={24} /></div>
              <h3>Ecology & Faith</h3>
              <p>Preserving the holy Narmada River's ecosystem by promoting eco-friendly boating and clean ghat practices.</p>
            </div>
            <div className="value-card glass">
              <div className="value-icon"><Award size={24} /></div>
              <h3>Cultural Pride</h3>
              <p>Promoting local storytelling, Bhedaghat folk histories, and standardizing historical guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta container">
        <div className="cta-wrapper glass">
          <h2>Be Part of the Journey</h2>
          <p>Book a direct ride with local boaters, participate in a sunset Aarti, or join hands with us as a partner.</p>
          <div className="cta-buttons">
            <a href="/services" className="btn btn-primary">Book a Ride</a>
            <a href="/partner" className="btn btn-secondary">Partner With Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
