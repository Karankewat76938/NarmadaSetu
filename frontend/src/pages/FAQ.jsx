import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const FAQ_DATA = [
  {
    category: 'Booking & Payments',
    questions: [
      {
        q: 'How does Narmada Setu ensure fair prices for local Kewats?',
        a: 'Unlike traditional tourist agents who keep 30-50% commissions, Narmada Setu transfers 100% of the booking amount directly to the local Kewat union or individual boater accounts instantly upon booking. We operate a zero-commission model funded by voluntary public sponsorships.'
      },
      {
        q: 'Can I cancel or reschedule my boat ride?',
        a: 'Yes! Rescheduling is free up to 4 hours before your booking. Cancellations made 12 hours in advance receive a 100% refund. Inside 12 hours, a 50% payout is guaranteed to the boater to protect their daily livelihood, and the rest is refunded to you.'
      },
      {
        q: 'Is there support for UPI or local card payments?',
        a: 'Absolutely. We support all major UPI apps (GPay, PhonePe, Paytm), NetBanking, and credit/debit cards directly via our MERN-stack payment simulator portal.'
      }
    ]
  },
  {
    category: 'Safety & Regulations',
    questions: [
      {
        q: 'What safety measures are implemented during Bhedaghat boat rides?',
        a: 'Safety is our absolute priority. Every single passenger receives a tested high-visibility life jacket (mandatory to wear). Our boats are monitored via GPS, and we maintain an active "Rescue Rider" team on standby at Bhedaghat. In high-water conditions, bookings are automatically halted.'
      },
      {
        q: 'Are children and senior citizens allowed on boat rides?',
        a: 'Yes, boat rides are family-friendly. Senior citizens and children (above 2 years) are fully allowed, provided they wear the provided specialized fit safety vests at all times.'
      }
    ]
  },
  {
    category: 'Aarti & Spiritual Offerings',
    questions: [
      {
        q: 'What is included in the Evening Aarti booking?',
        a: 'The Aarti booking includes a dedicated boat-side seating facing the daily Maha Aarti, puja thali offerings (flowers, diyas, sweets), and an approved storytelling guide who explains the ancient holy histories of River Narmada.'
      },
      {
        q: 'Can we perform personal puja offerings during the ride?',
        a: 'Yes, our certified boaters are trained to guide you in performing standard, eco-friendly river offerings (pushpa-daan) using biodegradable flower baskets.'
      }
    ]
  }
];

const FAQ = () => {
  const [activeIndices, setActiveIndices] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (catIndex, qIndex) => {
    const key = `${catIndex}-${qIndex}`;
    setActiveIndices({
      ...activeIndices,
      [key]: !activeIndices[key]
    });
  };

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="container faq-hero-container">
          <div className="faq-badge">SUPPORT DESK</div>
          <h1>Frequently Asked Questions</h1>
          <p className="lead">Have questions? We have compiled standard answers about booking, safety gear, Aarti offerings, and community payouts.</p>
        </div>
      </div>

      <div className="container faq-content">
        <div className="faq-wrapper">
          {FAQ_DATA.map((cat, catIndex) => (
            <div key={catIndex} className="faq-category-section">
              <h2 className="category-title">{cat.category}</h2>

              <div className="accordion-list">
                {cat.questions.map((item, qIndex) => {
                  const key = `${catIndex}-${qIndex}`;
                  const isOpen = activeIndices[key];

                  return (
                    <div key={qIndex} className={`faq-card glass ${isOpen ? 'open' : ''}`}>
                      <button className="faq-question-btn" onClick={() => toggleAccordion(catIndex, qIndex)}>
                        <div className="question-text-wrapper">
                          <HelpCircle size={18} className="question-icon" />
                          <span>{item.q}</span>
                        </div>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>

                      {isOpen && (
                        <div className="faq-answer">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
