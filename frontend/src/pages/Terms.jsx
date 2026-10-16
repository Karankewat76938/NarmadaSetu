import React, { useEffect } from 'react';
import './About.css'; // Leverage our clean About/Info page styles

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page terms-page">
      <section className="about-hero">
        <div className="container about-hero-container">
          <div className="about-hero-badge">LEGAL POLICY</div>
          <h1>Terms of Service</h1>
          <p className="lead">Last Updated: May 17, 2026</p>
        </div>
      </section>

      <section className="about-story container" style={{ paddingBottom: '100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.75)', lineHeight: '1.8' }}>
          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using the Narmada Setu website, booking platform, or mobile portal, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the services.</p>

          <h2 style={{ marginTop: '40px' }}>2. Booking & Livelihood Protection</h2>
          <p>Narmada Setu operates as a direct bridge connecting tourists with the local Kewat (boating) community. All bookings are final. Rescheduling is free of charge up to 4 hours in advance. Cancellations made inside 12 hours will incur a 50% reservation fee, which is transferred directly to the scheduled boater to compensate for lost daily livelihood.</p>

          <h2 style={{ marginTop: '40px' }}>3. Passenger Safety Vests Mandatory</h2>
          <p>For your own safety and in compliance with Madhya Pradesh Tourism and Local Boat Union guidelines, <strong>all passengers are strictly required to wear the provided life jackets/safety vests</strong> at all times during the boat ride. Refusal to wear safety gear will result in immediate cancellation of the ride with no refund.</p>

          <h2 style={{ marginTop: '40px' }}>4. Ecological Code of Conduct</h2>
          <p>Holy River Narmada is highly sacred and ecologically sensitive. Passengers are strictly prohibited from throwing plastic bags, bottles, cigarette butts, or non-biodegradable offerings into the river water. Violation of clean ghat policies will result in immediate termination of the ride and report to local authorities.</p>

          <h2 style={{ marginTop: '40px' }}>5. Limitation of Liability</h2>
          <p>While Narmada Setu performs rigorous safety checks, audits life jackets, and monitors weather patterns, boat rides, homestays, and tour bookings are undertaken at the traveler's own risk. Narmada Setu and its local union partners shall not be held liable for any loss, damage, or injury incurred during the services.</p>
        </div>
      </section>
    </div>
  );
};

export default Terms;
