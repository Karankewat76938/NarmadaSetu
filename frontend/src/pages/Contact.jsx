import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
    // Simulate API Submission
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container contact-hero-container">
          <div className="contact-badge">GET IN TOUCH</div>
          <h1>We'd Love to Hear From You</h1>
          <p className="lead">Have queries about Bhedaghat boat rides, bulk bookings, safety protocols, or partnering with Narmada Setu? Let us know!</p>
        </div>
      </div>

      <div className="container contact-content">
        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info-wrapper">
            <h2>Support & Offices</h2>
            <p>Our dedicated support desk is ready to help you plan your spiritual and tourism journeys.</p>

            <div className="info-cards-list">
              <div className="info-item-card glass">
                <div className="info-icon"><MapPin size={22} /></div>
                <div className="info-details">
                  <h3>Our Headquarters</h3>
                  <p>Ghat No. 4, Bhedaghat, Jabalpur, Madhya Pradesh - 482003</p>
                </div>
              </div>

              <div className="info-item-card glass">
                <div className="info-icon"><Phone size={22} /></div>
                <div className="info-details">
                  <h3>Contact Number</h3>
                  <p>+91 98765 43210</p>
                  <span className="availability">Daily, 6:00 AM - 9:00 PM</span>
                </div>
              </div>

              <div className="info-item-card glass">
                <div className="info-icon"><Mail size={22} /></div>
                <div className="info-details">
                  <h3>Email Address</h3>
                  <p>namaste@narmadasetu.in</p>
                  <p>support@narmadasetu.in</p>
                </div>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="map-placeholder-card glass">
              <div className="map-overlay">
                <MapPin size={32} className="pulsing-marker" />
                <span>Narmada Setu Ghat Office (Bhedaghat)</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-card glass">
            {submitted ? (
              <div className="success-state">
                <CheckCircle2 size={64} className="success-icon" />
                <h2>Message Sent Successfully!</h2>
                <p>Thank you for reaching out to Narmada Setu. Our community relationship representative will get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send Us a Message</h2>
                <p className="form-subtitle">Fill out the quick form below and our team will connect with you.</p>

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
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    placeholder="Describe your inquiry in detail..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  <span>Send Inquiry</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
