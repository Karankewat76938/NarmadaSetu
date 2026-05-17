import React, { useEffect } from 'react';
import { Heart, Users, TrendingUp, Anchor } from 'lucide-react';
import './Community.css';

const Community = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="community-page">
      {/* Hero Section */}
      <section className="community-hero">
        <div className="community-hero-bg"></div>
        <div className="community-hero-overlay"></div>
        <div className="community-hero-content animate-fade-in-up">
          <h1 className="community-hero-title serif-heading">The Heartbeat of Narmada</h1>
          <p className="community-hero-subtitle">
            Narmada Setu is more than a booking platform. We are a digital bridge empowering the Kewat community, preserving centuries-old traditions, and ensuring tourism directly benefits the people who make it possible.
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="impact-section">
        <div className="container">
          <div className="impact-grid">
            <div className="impact-stat">
              <h3>500+</h3>
              <p>Kewat Families Supported</p>
            </div>
            <div className="impact-stat">
              <h3>₹5M+</h3>
              <p>Direct Earnings Generated</p>
            </div>
            <div className="impact-stat">
              <h3>100%</h3>
              <p>Transparency & Fair Pricing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kewat Stories */}
      <section className="stories-section">
        <div className="container">
          <div className="section-header">
            <span className="text-gold font-weight-bold text-uppercase" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>Voices of the Ghats</span>
            <h2 className="serif-heading">Meet the Community</h2>
            <p>Every boat ride and guided tour is a story. Read how your bookings directly impact local livelihoods.</p>
          </div>

          <div className="stories-grid">
            <div className="story-card">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80" alt="Ramesh" className="story-img" />
              <div className="story-content">
                <div className="story-quote">
                  <p>"Before this platform, we relied heavily on middlemen who took a large cut of our earnings. Now, tourists book us directly. I can finally afford to send my daughter to a better school."</p>
                </div>
                <div className="story-author">
                  <div>
                    <h4>Ramesh Kewat</h4>
                    <p>Boat Operator, Bhedaghat</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" alt="Anjali" className="story-img" />
              <div className="story-content">
                <div className="story-quote">
                  <p>"Opening our home to tourists has been a blessing. Not only do we share our local cuisine, but we also share our culture. Narmada Setu gave us the dignity of running our own small business."</p>
                </div>
                <div className="story-author">
                  <div>
                    <h4>Anjali Rajput</h4>
                    <p>Homestay Host, Maheshwar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="story-card">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" alt="Suresh" className="story-img" />
              <div className="story-content">
                <div className="story-quote">
                  <p>"I know every story carved into the marble rocks. This platform helps me connect with people who truly want to understand the spiritual history of the Narmada, not just take a quick photo."</p>
                </div>
                <div className="story-author">
                  <div>
                    <h4>Suresh Tiwari</h4>
                    <p>Local Guide, Omkareshwar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2 className="serif-heading">Life on the River</h2>
          </div>
          <div className="masonry-grid">
            <div className="gallery-item large">
              <img src="https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=800&q=80" alt="River" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1587310574169-7c30a08e1fcd?w=400&q=80" alt="Aarti" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80" alt="Homestay" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1506869640319-fea1a2753c10?w=400&q=80" alt="Boat" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80" alt="Food" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="support-section">
        <div className="container">
          <div className="support-content">
            <Heart size={48} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
            <h2 className="serif-heading">Support Local Livelihoods</h2>
            <p>
              When you book through Narmada Setu, you aren't just buying a service; you are directly investing in the local economy. We charge minimal platform fees to ensure that the maximum amount goes directly into the hands of the hardworking local community.
            </p>
            
            <div className="cta-box">
              <h3 className="serif-heading">Are you a local provider?</h3>
              <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
                Join the platform today to reach thousands of tourists directly, manage your bookings easily, and grow your business with dignity.
              </p>
              <button className="btn-cta-large">Become a Partner Today</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
