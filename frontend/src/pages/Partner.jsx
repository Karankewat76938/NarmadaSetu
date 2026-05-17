import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Award, Users, CheckCircle, Handshake } from 'lucide-react';
import './Partner.css';

const Partner = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    roleType: 'boat_rider',
    location: 'Bhedaghat, Jabalpur',
    experienceYears: '3',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="partner-page">
      {/* Hero Header */}
      <section className="partner-hero">
        <div className="container partner-hero-container">
          <div className="partner-badge">GROW WITH US</div>
          <h1>Empower Your Boating & Tourism Business</h1>
          <p className="lead">Join India's most trusted community-driven marketplace for Bhedaghat boat riders, homestays, and guides. Get direct bookings with zero commissions.</p>
        </div>
      </section>

      {/* Values/Benefits Section */}
      <section className="partner-benefits container">
        <h2 className="section-title">Why Partner with Narmada Setu?</h2>
        <div className="benefits-grid">
          <div className="benefit-card glass">
            <div className="benefit-icon"><Sparkles size={24} /></div>
            <h3>Direct Boater Payments</h3>
            <p>No middlemen. Receive payments directly from tourists straight to your bank account or UPI immediately upon booking.</p>
          </div>

          <div className="benefit-card glass">
            <div className="benefit-icon"><Shield size={24} /></div>
            <h3>Free Life Jackets & Gear</h3>
            <p>We provide state-of-the-art safety gear and weather alerts to ensure the highest standards of safety for you and your passengers.</p>
          </div>

          <div className="benefit-card glass">
            <div className="benefit-icon"><Award size={24} /></div>
            <h3>Standardized Pricing</h3>
            <p>Say goodbye to price negotiations and customer bargaining. Earn standard high-value fair rates backed by our community guidelines.</p>
          </div>

          <div className="benefit-card glass">
            <div className="benefit-icon"><Users size={24} /></div>
            <h3>Free Training & Certification</h3>
            <p>Get listed as a "Certified Narmada Setu Partner" with free storytelling and emergency response training courses.</p>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="partner-reg-section container">
        <div className="partner-reg-grid">
          {/* Proposition Text */}
          <div className="proposition-side">
            <h2>Ready to Join?</h2>
            <p className="description">Provide your details and Bhedaghat credentials. Our local boat union representative will review your application and assist you in setting up your profile within 48 hours.</p>

            <div className="process-steps">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-text">
                  <h4>Fill Application</h4>
                  <p>Provide basic contact information and select your service category.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-text">
                  <h4>Credential Review</h4>
                  <p>Our team verifies your local boat license or property registry.</p>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-text">
                  <h4>Onboarding & Launch</h4>
                  <p>Get listed on our MERN dashboard and start receiving direct tourist bookings!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="partner-form-card glass">
            {submitted ? (
              <div className="success-state">
                <CheckCircle size={64} className="success-icon" />
                <h2>Application Submitted!</h2>
                <p>Har Har Gange! We have received your partnership application. Our Bhedaghat coordinator will contact you on your mobile number (+91 {formData.phone}) very soon.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Submit Another Application</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="partner-form">
                <h3>Partner Registration</h3>
                <p className="form-subtitle">Grow your local livelihood through secure digital bookings.</p>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Mobile Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="roleType">Service Category</label>
                    <select
                      id="roleType"
                      name="roleType"
                      value={formData.roleType}
                      onChange={handleChange}
                    >
                      <option value="boat_rider">Boat Rider (Kewat)</option>
                      <option value="home_stay">Homestay Host</option>
                      <option value="guide">Spiritual / Storyteller Guide</option>
                      <option value="aarti_host">Aarti Organiser</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="location">Operating Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      placeholder="e.g. Bhedaghat, Jabalpur"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="experienceYears">Years of Experience</label>
                    <input
                      type="number"
                      id="experienceYears"
                      name="experienceYears"
                      required
                      min="1"
                      placeholder="Years active"
                      value={formData.experienceYears}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="details">Tell Us About Your Services</label>
                  <textarea
                    id="details"
                    name="details"
                    rows="4"
                    placeholder="Describe your boat type, homestay capacity, or local storytelling highlights..."
                    value={formData.details}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  <span>Submit Application</span>
                  <Handshake size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partner;
