import React from 'react';
import './CommunityImpact.css';
import { boatrider } from '../../assets/Images';

const CommunityImpact = () => {
  return (
    <section className="impact-section">
      <div className="container impact-grid">
        <div className="impact-image-wrapper">
          <img src={boatrider} alt="Community Impact" className="impact-img" />
          <div className="impact-stat-card glass">
            <h3>₹2M+</h3>
            <p>Income Generated</p>
          </div>
        </div>
        <div className="impact-content">
          <h2 className="section-title" style={{textAlign: 'left', marginBottom: '24px'}}>Empowering the Kewat Community</h2>
          <p className="impact-desc">
            Narmada Setu is more than a booking platform. We are a social initiative dedicated to uplifting the traditional boat-riding communities (Kewat/Nishad) living along the banks of the Narmada.
          </p>
          <ul className="impact-list">
            <li>
              <div className="impact-list-icon">100%</div>
              <div className="impact-list-text">
                <h4>Direct Earnings</h4>
                <p>Providers keep their full earnings with zero hidden commissions.</p>
              </div>
            </li>
            <li>
              <div className="impact-list-icon">500+</div>
              <div className="impact-list-text">
                <h4>Families Supported</h4>
                <p>Ensuring sustainable livelihoods and financial inclusion.</p>
              </div>
            </li>
            <li>
              <div className="impact-list-icon">24/7</div>
              <div className="impact-list-text">
                <h4>Safety Training</h4>
                <p>All partners undergo mandatory water safety & hospitality training.</p>
              </div>
            </li>
          </ul>
          <button className="btn btn-primary mt-4">Read Our Story</button>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;
