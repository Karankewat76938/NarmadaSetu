import React from 'react';
import { ArrowRight } from 'lucide-react';
import './PartnerCTA.css';

const PartnerCTA = () => {
  return (
    <section className="partner-section">
      <div className="container">
        <div className="partner-banner glass-dark">
          <div className="partner-content">
            <h2>Are you a local boat rider or guide?</h2>
            <p>Join Narmada Setu today. Reach more tourists, manage your bookings easily, and grow your income with zero hidden fees.</p>
            <button className="btn btn-primary mt-4">
              Become a Partner <ArrowRight size={20} style={{ marginLeft: 8 }} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
