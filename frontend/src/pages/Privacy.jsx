import React, { useEffect } from 'react';
import './About.css'; // Leverage our clean About/Info page styles

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page privacy-page">
      <section className="about-hero">
        <div className="container about-hero-container">
          <div className="about-hero-badge">DATA PRIVACY</div>
          <h1>Privacy Policy</h1>
          <p className="lead">Last Updated: May 17, 2026</p>
        </div>
      </section>

      <section className="about-story container" style={{ paddingBottom: '100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.75)', lineHeight: '1.8' }}>
          <h2>1. Collection of Personal Information</h2>
          <p>We collect essential personal information when you register, book a service, or apply to partner with us. This includes your name, email address, mobile number, role type, and booking coordinates.</p>

          <h2 style={{ marginTop: '40px' }}>2. Use of Information</h2>
          <p>Your information is used solely to facilitate successful direct bookings with the boaters union, process secure simulated payouts, coordinate safety alerts, and send confirmation notifications. We do not sell or lease user data to third-party marketing companies.</p>

          <h2 style={{ marginTop: '40px' }}>3. Secure Payouts & direct Transfer</h2>
          <p>Narmada Setu processes all transactions through secure API channels. Boater account credentials and tourist transaction details are encrypted during transit using SSL/TLS protocols.</p>

          <h2 style={{ marginTop: '40px' }}>4. Cookies and Analytical Tracking</h2>
          <p>We use essential cookies to maintain user authentication sessions (Tourist, Rider, Provider, Admin) on our MERN dashboard. Standard, anonymous telemetry may be gathered to optimize landing page speeds and coordinate weather alert pings.</p>

          <h2 style={{ marginTop: '40px' }}>5. Contact Our Privacy Officer</h2>
          <p>If you have any questions, suggestions, or concerns regarding your transaction history or personal data storage on Narmada Setu, you may contact our community data administrator at: <strong>privacy@narmadasetu.in</strong>.</p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
